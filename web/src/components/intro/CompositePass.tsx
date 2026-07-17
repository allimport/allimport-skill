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

/** The bolt renders to its own mask on this layer, so the composite can
 *  trace its silhouette in celeste where the fluid crosses it. */
export const BOLT_LAYER = 3;

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
  uniform sampler2D uBolt;   // RT_BOLT: alpha = bolt mask
  uniform sampler2D uDye;    // RT_DYE: red channel = ink density
  uniform vec3 uCyan;        // All Import identity cyan, flat
  uniform vec3 uInk;         // paint white of the ink, flat
  uniform float uReveal;     // bolt-activation ramp, gates the ink
  uniform vec2 uTexel;       // 1 / drawingBuffer, for the bolt outline

  // Dye density thresholds (peaks ~0.44 at this scale), soft/diffuse ramps.
  // NOTE: the logo colour reaction no longer lives here — the metal energizes
  // in its OWN material (BRDF-correct, albedo gradient map). This pass is now
  // only the LIQUID (white ink) + its shadow + the bolt outline. RT_LOGO /
  // uMask stay wired as infra but are currently unused by this shader.
  const float INK_LO  = 0.14;  // white ink body: wide, feathered edge...
  const float INK_HI  = 0.44;  // ...fully dense only at the dye peak
  const float CORE_OPACITY = 0.94; // solid, viscous liquid body (weight + depth)

  void main() {
    float dye  = texture2D(uDye,  vUv).r;   // ink density under this pixel

    // White ink body (the liquid). Wide ramp => diffuse, blurry contour.
    float core = smoothstep(INK_LO, INK_HI, dye);
    float iw   = core * CORE_OPACITY * uReveal;

    // Soft dark shadow hugging the OUTSIDE of the liquid — a diffuse
    // border/shadow that grounds the ink on the surface (not a hard line).
    float shadow = smoothstep(0.05, 0.15, dye) * (1.0 - smoothstep(0.15, 0.32, dye));
    float aS = shadow * 0.5 * uReveal;

    // --- B) MENISCUS: the surface-tension lip. A thin band INSIDE the
    // liquid edge (from the dye gradient) where the raised, curved surface
    // is a touch DENSER and catches a cool reflection. Not a stroke/outline
    // — it lives within the liquid and is born/dies with it. ---
    float men = clamp(smoothstep(0.18, 0.26, dye) - smoothstep(0.30, 0.42, dye),
                      0.0, 1.0) * uReveal;
    vec3  inkCol = uInk + vec3(0.03, 0.08, 0.13) * men;  // faint cool lip highlight
    float iwL    = clamp(iw + 0.18 * men, 0.0, 1.0);     // lip slightly denser

    // --- C) REFRACTION: the thick lip bends the metal underneath. Sample the
    // logo (RT_LOGO, already the energized metal) displaced along the dye
    // gradient, blend a hair of it ONLY in the lip band. Optical, not glass. ---
    vec2 grad = vec2(
      texture2D(uDye, vUv + vec2(uTexel.x, 0.0)).r - texture2D(uDye, vUv - vec2(uTexel.x, 0.0)).r,
      texture2D(uDye, vUv + vec2(0.0, uTexel.y)).r - texture2D(uDye, vUv - vec2(0.0, uTexel.y)).r);
    vec2  disp = grad * uTexel * 18.0 * men;             // a few px, only at the lip
    vec4  refr = texture2D(uMask, vUv + disp);           // displaced metal
    float rW   = men * refr.a * 0.16;                    // extremely subtle

    // Premultiplied over: background -> refraction ghost -> shadow -> ink lip.
    float base = (1.0 - iwL) * (1.0 - aS);
    vec3 premult = inkCol * iwL + base * rW * refr.rgb;
    float outA   = 1.0 - base * (1.0 - rW);

    // BOLT OUTLINE: where the fluid crosses the bolt, trace its silhouette
    // in celeste ON TOP of the ink, so the bolt reads as a contour instead
    // of vanishing under the white liquid. dilate(mask) - mask = edge ring.
    float b0 = texture2D(uBolt, vUv).a;
    float t = 1.6;
    float bd = texture2D(uBolt, vUv + vec2(uTexel.x, 0.0) * t).a;
    bd = max(bd, texture2D(uBolt, vUv - vec2(uTexel.x, 0.0) * t).a);
    bd = max(bd, texture2D(uBolt, vUv + vec2(0.0, uTexel.y) * t).a);
    bd = max(bd, texture2D(uBolt, vUv - vec2(0.0, uTexel.y) * t).a);
    bd = max(bd, texture2D(uBolt, vUv + uTexel * t).a);
    bd = max(bd, texture2D(uBolt, vUv - uTexel * t).a);
    bd = max(bd, texture2D(uBolt, vUv + vec2(uTexel.x, -uTexel.y) * t).a);
    bd = max(bd, texture2D(uBolt, vUv + vec2(-uTexel.x, uTexel.y) * t).a);
    float outline = clamp(bd - b0, 0.0, 1.0);          // ring at the silhouette
    float dyeP    = smoothstep(0.08, 0.20, dye);        // only where fluid is
    float bw      = outline * dyeP * uReveal;
    premult = uCyan * bw + premult * (1.0 - bw);
    outA    = 1.0 - (1.0 - bw) * (1.0 - outA);

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

  // Bolt silhouette mask, for the celeste outline under the fluid.
  const rtBolt = useMemo(
    () =>
      new THREE.WebGLRenderTarget(2, 2, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        depthBuffer: true,
        samples: 4,
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
        uBolt: { value: null as THREE.Texture | null },
        uDye: { value: null as THREE.Texture | null },
        // All Import identity cyan (--cyan: #00d4d4). Flat, no gradient.
        uCyan: { value: new THREE.Color(0x00d4d4) },
        // Ink paint-white (matches the old display pass exactly).
        uInk: { value: new THREE.Color(0.965, 0.975, 1.0) },
        uReveal: { value: 0 },
        uTexel: { value: new THREE.Vector2(1 / 2, 1 / 2) },
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
      rtBolt.dispose();
      comp.mat.dispose();
      (comp.scn.children[0] as THREE.Mesh).geometry.dispose();
    },
    [rtLogo, rtBolt, comp],
  );

  useFrame(() => {
    const ctx = gl.getContext();
    const w = ctx.drawingBufferWidth;
    const h = ctx.drawingBufferHeight;
    if (rtLogo.width !== w || rtLogo.height !== h) rtLogo.setSize(w, h);
    if (rtBolt.width !== w || rtBolt.height !== h) rtBolt.setSize(w, h);

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

    // --- 1b) Render ONLY the bolt layer to RT_BOLT (A = bolt mask) ---
    camera.layers.set(BOLT_LAYER);
    gl.setRenderTarget(rtBolt);
    gl.setClearColor(0x000000, 0);
    gl.clear(true, true, false);
    gl.render(scene, camera);

    scene.background = prevBg;
    scene.fog = prevFog;
    gl.setClearColor(prevClearColor, prevClearAlpha);
    camera.layers.mask = prevLayerMask;

    // --- 2) The single composite over the canvas: white ink + cyan halo ---
    comp.mat.uniforms.uMask.value = rtLogo.texture;
    comp.mat.uniforms.uBolt.value = rtBolt.texture;
    comp.mat.uniforms.uDye.value = fluidDye.tex;
    comp.mat.uniforms.uReveal.value = fluidDye.reveal;
    (comp.mat.uniforms.uTexel.value as THREE.Vector2).set(1 / w, 1 / h);

    gl.setRenderTarget(null);
    const prevAutoClear = gl.autoClear;
    gl.autoClear = false;
    gl.render(comp.scn, comp.cam);
    gl.autoClear = prevAutoClear;
  }, 4);

  return null;
}
