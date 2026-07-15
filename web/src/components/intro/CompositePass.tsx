"use client";

import { useEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { fluidDye } from "./Fluid";

/**
 * Screen-space composite for the logo colour reaction.
 *
 * The effect is a COMPOSITION, not a material/lighting change: the logo is
 * rendered to its own target (RT_LOGO, RGB = colour, A = mask) via a
 * dedicated layer, and this fullscreen pass recolours ONLY the logo pixels
 * the fluid dye covers. It draws over the canvas AFTER the composer, so the
 * recolour never enters the lighting, the bloom or the material, and the
 * background — where the mask is 0 — is mathematically untouched.
 *
 * Definitive mechanism (etapa 4):
 *
 *   colorFinal = mix(logoColor, cyanBase, mask * dye)
 *
 * implemented as a single NormalBlend draw of `vec4(cyan, mask*dye)` over
 * the canvas — the destination pixel IS logoColor (the composer already
 * drew it), so blending reproduces that mix exactly. Chosen precisely so
 * that where `mask*dye == 0` the pass draws NOTHING: the composer's exact
 * white is preserved byte-for-byte, no glow/bloom/emissive/pulse.
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
  void main() {
    float mask = texture2D(uMask, vUv).a;   // 1 on the logo, 0 elsewhere
    float dye  = texture2D(uDye,  vUv).r;   // ink density under this pixel
    float m = mask * dye;                   // only logo pixels the ink covers
    // NormalBlend over canvas == mix(logoColor, cyan, m). No threshold,
    // no smoothstep, no glow: m==0 -> nothing drawn -> exact white kept.
    gl_FragColor = vec4(uCyan, m);
  }
`;

export default function CompositePass() {
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
      },
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: THREE.NormalBlending,
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

    // --- 2) Composite over the canvas (after the composer, under the ink) ---
    comp.mat.uniforms.uMask.value = rtLogo.texture;
    comp.mat.uniforms.uDye.value = fluidDye.tex;

    gl.setRenderTarget(null);
    const prevAutoClear = gl.autoClear;
    gl.autoClear = false;
    gl.render(comp.scn, comp.cam);
    gl.autoClear = prevAutoClear;
  }, 4);

  return null;
}
