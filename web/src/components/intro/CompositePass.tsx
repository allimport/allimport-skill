"use client";

import { useEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { fluidDye } from "./Fluid";

/**
 * The final composite pass. It draws ONLY the liquid (white ink). The logo
 * colour STATE change does NOT live here — the metal energizes in its own
 * material (BRDF-safe albedo, see the brdf-material-state skill), so the 3D
 * shading is preserved. This pass reads that already-energized metal from
 * RT_LOGO and lets it show THROUGH the liquid:
 *
 *   scene (background + energized logo PBR, via the composer)   → canvas
 *   → CompositePass: white liquid, with the charged metal transmitting
 *     through it by the liquid's own thickness profile                → canvas
 *
 * Liquid model: the body is a DOME (spherical cap). Its thickness `t` comes
 * from the drop geometry, not the raw dye. Opacity follows `t` (transparent
 * rim → solid thick core), and the charged metal transmits through by (1 - t)
 * — an artistic, physically-INSPIRED read, not a literal Beer-Lambert
 * absorption. So: transparent exterior → transition → cyan felt from inside →
 * solid white core. RT_LOGO (A = mask, RGB = energized metal) is the only
 * thing sampled from the logo. One premultiplied-over draw, after the composer,
 * so nothing here touches lighting, bloom or the material.
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

  // The liquid FOOTPRINT in dye space: where the body starts (thin outer
  // edge) and where it reaches its peak thickness. These place the drop; they
  // are not a curve fit. This pass is ONLY the liquid — the logo colour STATE
  // lives in the material (BRDF-safe albedo). uMask = RT_LOGO (energized metal).
  const float L_EDGE = 0.16;   // outer edge of the liquid body (thickness 0)
  const float L_PEAK = 0.36;   // where the body reaches full thickness
  const float MAX_OPACITY = 0.96; // solidity of the thick core

  void main() {
    float dye  = texture2D(uDye,  vUv).r;   // ink density under this pixel
    vec4  logo = texture2D(uMask, vUv);     // RT_LOGO: rgb = charged metal, a = mask

    // LIQUID THICKNESS from a physical DOME profile, not the raw dye value.
    // u = how far inside the body we are (0 at the outline, 1 at the core).
    // A spherical-cap (drop) of insideness u has thickness sqrt(u(2-u)) — pure
    // geometry, no tunable exponent. So the whole read falls out of the drop's
    // own shape: thin transparent rim -> rising body -> solid thick core.
    float u = smoothstep(L_EDGE, L_PEAK, dye);
    float t = sqrt(u * (2.0 - u));           // dome thickness 0..1

    // The white body's OPACITY follows the thickness: the rim is transparent,
    // the core is solid white. This is the liquid's real profile (a drop), not
    // a flat cut or a lowered opacity.
    float iw = t * MAX_OPACITY * uReveal;

    // ENERGY TRANSMISSION — an ARTISTIC, physically-inspired term, NOT a
    // literal Beer-Lambert absorption (no exponential). It reads straight off
    // the dome geometry: transmit = 1 - t. Thin body (t->0) lets the charged
    // metal through; thick core (t->1) blocks it to white. Times the metal's
    // own charge (logo.rgb), so the cyan is felt from INSIDE the body and dies
    // where it is thick. No constant, no fitted curve. If a real optical
    // absorption is ever needed, that is a separate stage.
    float transmit = (1.0 - t) * logo.a;
    vec3  inkCol   = mix(uInk, logo.rgb, transmit);

    vec3 premult = inkCol * iw;  // premultiplied over the canvas
    float outA   = iw;
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
        // All Import cyan ink — cursor paints the background from dark to cyan.
        uInk: { value: new THREE.Color(0x00d4d4) },
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

    // --- 2) The single composite over the canvas: white ink + cyan halo ---
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
