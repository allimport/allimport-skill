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
  uniform vec2 uDyeTexel;    // 1 / dye texture resolution
  uniform float uTime;       // drives the liquid's living surface

  // Small value-noise pair (fluid-cursor reference): animates the liquid's
  // internal surface so the body reads alive, never a static decal.
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(random(i), random(i + vec2(1.0, 0.0)), u.x),
               mix(random(i + vec2(0.0, 1.0)), random(i + vec2(1.0, 1.0)), u.x),
               u.y);
  }

  // The liquid FOOTPRINT in dye space: where the body starts (thin outer
  // edge) and where it reaches its peak thickness. These place the drop; they
  // are not a curve fit. This pass is ONLY the liquid — the logo colour STATE
  // lives in the material (BRDF-safe albedo). uMask = RT_LOGO (energized metal).
  const float L_EDGE = 0.20;   // outer edge of the liquid body (thickness 0)
  const float L_PEAK = 0.30;   // tight transition → hard liquid edges, no fog zone
  const float MAX_OPACITY = 0.92; // solidity of the thick core

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
    // a flat cut or a lowered opacity. A bright specular RIM rides the outer
    // edge of the body — the highlight a glossy liquid catches on its
    // meniscus — so the fluid reads bright and wet, like the bolt.
    float rim = smoothstep(L_EDGE, L_EDGE + 0.04, dye)
              * (1.0 - smoothstep(L_EDGE + 0.04, L_PEAK, dye));
    float iw = (t * MAX_OPACITY + rim * 0.30) * uReveal;

    // SURFACE RELIEF (adapted from the fluid-cursor 3D reference, in OUR
    // identity — no amber; body stays brand white). The real dye field is
    // the height map: central differences give a surface normal, a fixed
    // key light produces a WET specular highlight that travels over the
    // moving body, and animated noise boils the surface subtly — 3D
    // volumetric liquid, not flat paint.
    float hL = texture2D(uDye, vUv - vec2(uDyeTexel.x, 0.0)).r;
    float hR = texture2D(uDye, vUv + vec2(uDyeTexel.x, 0.0)).r;
    float hB = texture2D(uDye, vUv - vec2(0.0, uDyeTexel.y)).r;
    float hT = texture2D(uDye, vUv + vec2(0.0, uDyeTexel.y)).r;
    float boil = noise(vUv * 26.0 + uTime * 0.45) - 0.5;
    vec3 N = normalize(vec3(hL - hR, hB - hT, 0.55 + boil * 0.25));
    vec3 Ld = normalize(vec3(0.35, 0.55, 0.75));
    float spec = pow(max(dot(N, Ld), 0.0), 22.0);

    // ENERGY TRANSMISSION — an ARTISTIC, physically-inspired term, NOT a
    // literal Beer-Lambert absorption (no exponential). It reads straight off
    // the dome geometry: transmit = 1 - t. Thin body (t->0) lets the charged
    // metal through; thick core (t->1) blocks it to white. Times the metal's
    // own charge (logo.rgb), so the cyan is felt from INSIDE the body and dies
    // where it is thick. No constant, no fitted curve. If a real optical
    // absorption is ever needed, that is a separate stage.
    float transmit = (1.0 - t) * logo.a;
    vec3  inkCol   = mix(uInk, logo.rgb, transmit);

    // Wet highlight: pure white, riding the body only (scaled by the dome
    // thickness so the rim never sparkles on its own), shimmering slowly.
    float shimmer = 0.55 + 0.45 * noise(vUv * 14.0 - uTime * 0.3);
    inkCol += vec3(1.0) * spec * t * shimmer;

    // Letters always cut through the fluid: ink is attenuated where the logo
    // mask is present so the wordmark stays legible at any fluid density.
    float logoMask = logo.a;
    iw *= (1.0 - logoMask * 0.72);

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
        // Ink bright cool white — slightly over 1 in blue so the liquid
        // reads luminous against the void, matching the bolt's brilliance.
        uInk: { value: new THREE.Color(1.0, 1.0, 1.04) },
        uReveal: { value: 0 },
        uDyeTexel: { value: new THREE.Vector2(1 / 512, 1 / 512) },
        uTime: { value: 0 },
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

  useFrame((_, delta) => {
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
    comp.mat.uniforms.uTime.value += Math.min(delta, 0.1);
    const dyeImg = fluidDye.tex?.image as
      | { width?: number; height?: number }
      | undefined;
    if (dyeImg?.width && dyeImg?.height)
      comp.mat.uniforms.uDyeTexel.value.set(
        1 / dyeImg.width,
        1 / dyeImg.height,
      );

    gl.setRenderTarget(null);
    const prevAutoClear = gl.autoClear;
    gl.autoClear = false;
    gl.render(comp.scn, comp.cam);
    gl.autoClear = prevAutoClear;
  }, 4);

  return null;
}
