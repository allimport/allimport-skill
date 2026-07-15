"use client";

import { useEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { fluidDye } from "./Fluid";

/**
 * The SINGLE final composite. One pass, one shader — the only thing that
 * draws the logo colour reaction AND the fluid ink to the screen. There is
 * no separate fluid overlay any more:
 *
 *   scene (background + logo PBR, via the composer)   → canvas
 *   → CompositePass: recolour (mask × dye → cyan), then white ink → canvas
 *
 * The logo is rendered to its own target (RT_LOGO, RGB = colour, A = mask)
 * on a dedicated layer, so this pass can recolour ONLY the logo pixels the
 * dye covers, and lay the white ink over everything, in this exact order:
 *
 *   final = mix( mix(logoColor, cyan, mask*dye), inkWhite, inkA )
 *
 * It draws AFTER the composer, so nothing here enters lighting, bloom or
 * the material, and the background (mask = 0, dye = 0) is untouched. The
 * whole thing is one premultiplied-over draw; the ink term reproduces the
 * old display pass's blend verbatim so the look does not change.
 */

/** Objects on this layer are the ones the mask render captures. The logo
 *  letters enable it (in addition to layer 0) so the main render is
 *  unaffected. */
export const LOGO_LAYER = 2;

const quadVert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const compositeFrag = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uMask;   // RT_LOGO: alpha = logo mask
  uniform sampler2D uDye;    // RT_DYE: red channel = ink density
  uniform vec3 uCyan;        // All Import identity cyan, flat
  uniform vec3 uInk;         // paint white of the ink, flat
  uniform float uReveal;     // bolt-activation ramp, gates the ink
  void main() {
    float mask = texture2D(uMask, vUv).a;   // 1 on the logo, 0 elsewhere
    float dye  = texture2D(uDye,  vUv).r;   // ink density under this pixel

    // (1) recolour: logo pixels the ink covers mix toward cyan. md is the
    // mix weight (canvas is 8-bit, so md is effectively clamped anyway).
    float md = clamp(mask * dye, 0.0, 1.0);

    // (2) white ink on top: near-binary body cut into the diffusion halo,
    // identical to the old display pass — the mass stays opaque and
    // dissolves by RETRACTING its outline, never trailing into grey haze.
    float body = smoothstep(0.435, 0.465, dye);
    float a = body * uReveal;               // ink alpha

    // One premultiplied-over draw of, in this order,
    //   logo -> mix(logoColor, cyan, md) -> over white ink(alpha a)
    // where logoColor is the destination the composer already drew. The
    // old ink pass output vec4(col*a, a) under NormalBlend, contributing
    // col*a^2; kept verbatim (uInk * a*a) so the ink is pixel-identical.
    vec3 premult = uCyan * md * (1.0 - a) + uInk * (a * a);
    float outA   = 1.0 - (1.0 - md) * (1.0 - a);
    gl_FragColor = vec4(premult, outA);
  }
`;

export default function CompositePass({
  manualRender = false,
}: {
  manualRender?: boolean;
}) {
  const { gl, scene, camera } = useThree();

  const rtLogo = useMemo(
    () =>
      new THREE.WebGLRenderTarget(2, 2, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        depthBuffer: true,
        samples: 4, // MSAA → clean antialiased mask edges (WebGL2)
      }),
    [],
  );

  // Fullscreen composite quad, its own scene + ortho-less camera.
  const comp = useMemo(() => {
    const mat = new THREE.ShaderMaterial({
      vertexShader: quadVert,
      fragmentShader: compositeFrag,
      uniforms: {
        uMask: { value: null as THREE.Texture | null },
        uDye: { value: null as THREE.Texture | null },
        // All Import identity cyan (--cyan: #00d4d4). Flat, no gradient.
        uCyan: { value: new THREE.Color(0x00d4d4) },
        // Ink paint-white (matches the old display pass exactly).
        uInk: { value: new THREE.Color(0.965, 0.975, 1.0) },
        uReveal: { value: 0 },
      },
      transparent: true,
      depthTest: false,
      depthWrite: false,
      // gl_FragColor is PREMULTIPLIED: src * 1 + dst * (1 - srcAlpha).
      blending: THREE.CustomBlending,
      blendEquation: THREE.AddEquation,
      blendSrc: THREE.OneFactor,
      blendDst: THREE.OneMinusSrcAlphaFactor,
      blendSrcAlpha: THREE.OneFactor,
      blendDstAlpha: THREE.OneMinusSrcAlphaFactor,
    });
    const scn = new THREE.Scene();
    const cam = new THREE.Camera();
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat);
    mesh.frustumCulled = false;
    scn.add(mesh);
    return { scn, cam, mat };
  }, []);

  useEffect(
    () => () => {
      rtLogo.dispose();
      comp.mat.dispose();
      (comp.scn.children[0] as THREE.Mesh).geometry.dispose();
    },
    [rtLogo, comp],
  );

  useFrame(() => {
    const ctx = gl.getContext();
    const w = ctx.drawingBufferWidth;
    const h = ctx.drawingBufferHeight;
    if (rtLogo.width !== w || rtLogo.height !== h) rtLogo.setSize(w, h);

    // --- 0) Reduced motion: no composer is mounted, and this positive-
    // priority subscriber disabled R3F's auto-render, so draw the scene to
    // the canvas here (full layers) BEFORE the composite goes over it. ---
    if (manualRender) {
      gl.setRenderTarget(null);
      gl.render(scene, camera);
    }

    // --- 1) Render ONLY the logo layer to RT_LOGO (A = mask) ---
    const prevLayerMask = camera.layers.mask;
    const prevClearAlpha = gl.getClearAlpha();
    const prevClearColor = new THREE.Color();
    gl.getClearColor(prevClearColor);
    const prevBg = scene.background;
    const prevFog = scene.fog;
    scene.background = null;
    scene.fog = null;

    camera.layers.set(LOGO_LAYER);
    gl.setRenderTarget(rtLogo);
    gl.setClearColor(0x000000, 0);
    gl.clear(true, true, false);
    gl.render(scene, camera);

    scene.background = prevBg;
    scene.fog = prevFog;
    gl.setClearColor(prevClearColor, prevClearAlpha);
    camera.layers.mask = prevLayerMask;

    // --- 2) The single composite over the canvas: recolour + white ink ---
    comp.mat.uniforms.uMask.value = rtLogo.texture;
    comp.mat.uniforms.uDye.value = fluidDye.tex;
    comp.mat.uniforms.uReveal.value = fluidDye.reveal;

    gl.setRenderTarget(null);
    const prevAutoClear = gl.autoClear;
    gl.autoClear = false;
    gl.render(comp.scn, comp.cam);
    gl.autoClear = prevAutoClear;
  }, 4);

  return null;
}
