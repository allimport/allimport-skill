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
 *   → CompositePass: white ink + FULL cyan recolour of the letters → canvas
 *
 * Colour mechanism (etapa 7): the logo really CHANGES COLOUR. Wherever the
 * ink covers a letter past a threshold, the WHOLE letter surface there flips
 * from white to cyan — a hard rule, not a rim/halo/gradient:
 *
 *   if (mask * dye > T)  letter = cyan   else  letter = original white
 *
 * The cyan fills the affected area and is drawn ON TOP, so on the logo it
 * dominates: the user reads a clear white → cyan → white as the fluid passes
 * and leaves. The white ink still exists as the liquid effect (it reads as
 * white off the logo, where there is nothing to recolour). The logo is
 * rendered to its own target (RT_LOGO, A = mask) so the recolour is contained
 * in the letters. It draws AFTER the composer, so nothing here enters
 * lighting, bloom or the material. One premultiplied-over draw.
 *
 * The ink edges are SOFT / diffuse (wide density ramps), so the liquid reads
 * with a feathered, blurry contour like the reference — not a hard outline.
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

  // Dye density thresholds (peaks ~0.44 at this scale). The edges are now
  // SOFT / diffuse on purpose — wide smoothstep ramps, not a crisp near-step
  // — so the liquid reads with a feathered, blurry contour like the
  // reference, not a hard outline. T_CYAN still flips the letter to cyan.
  const float CYAN_LO = 0.10;  // cyan starts ramping in (soft)
  const float CYAN_HI = 0.30;  // fully cyan above this
  const float INK_LO  = 0.14;  // white ink body: wide, feathered edge...
  const float INK_HI  = 0.44;  // ...fully dense only at the dye peak
  const float CYAN_OPACITY = 1.0;  // full flip white -> cyan, unmistakable
  const float CORE_OPACITY = 0.94; // white ink: near-opaque core, soft rim

  void main() {
    float mask = texture2D(uMask, vUv).a;   // 1 on the logo, 0 elsewhere
    float dye  = texture2D(uDye,  vUv).r;   // ink density under this pixel

    // FULL-AREA cyan recolour with a SOFT edge (diffuse, not a rim).
    float fill = smoothstep(CYAN_LO, CYAN_HI, dye);
    float cw   = mask * fill * CYAN_OPACITY * uReveal;   // cyan on the letter

    // White ink body (the liquid). Wide ramp => diffuse, blurry contour.
    // Off the logo it reads as white; on the logo the cyan draws OVER it.
    float core = smoothstep(INK_LO, INK_HI, dye);
    float iw   = core * CORE_OPACITY * uReveal;

    // Premultiplied over, in order: background -> white ink -> cyan letter.
    //   F = mix( mix(D, white, iw), cyan, cw )
    //   premult = cyan*cw + white*iw*(1-cw) ;  outA = 1-(1-cw)(1-iw)
    vec3 premult = uCyan * cw + uInk * (iw * (1.0 - cw));
    float outA   = 1.0 - (1.0 - cw) * (1.0 - iw);
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
