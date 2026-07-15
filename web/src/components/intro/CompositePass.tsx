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
 * where a source (a test circle, or the fluid dye) covers them. It draws
 * over the canvas AFTER the composer, so the recolour never enters the
 * lighting, the bloom or the material, and the background — where the mask
 * is 0 — is mathematically untouched.
 *
 * ETAPA 3: proof of architecture. The recolour is a flat TEST RED (no
 * cyan, no smoothing, no effects) driven by `uMode`:
 *   0 = fixed circle (does the composite touch only the logo?)
 *   1 = mask * dye  (does the fluid drive it, background intact?)
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
  uniform sampler2D uDye;    // RT_DYE
  uniform float uMode;       // 0 = circle, 1 = dye
  uniform vec2 uCircle;      // circle centre, screen uv
  uniform float uCircleR;    // circle radius, uv
  uniform float uAspect;
  uniform vec3 uColor;       // flat test colour (red for etapa 3)
  void main() {
    float mask = texture2D(uMask, vUv).a;
    float src;
    if (uMode < 0.5) {
      vec2 d = vUv - uCircle;
      d.x *= uAspect;
      src = length(d) < uCircleR ? 1.0 : 0.0;   // hard, no smoothing
    } else {
      src = texture2D(uDye, vUv).r > 0.35 ? 1.0 : 0.0; // hard threshold
    }
    float m = mask * src;
    gl_FragColor = vec4(uColor, m);            // normal blend over canvas
  }
`;

export default function CompositePass() {
  const { gl, scene, camera, size } = useThree();

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
        uMode: { value: 1 },
        uCircle: { value: new THREE.Vector2(0.5, 0.5) },
        uCircleR: { value: 0.12 },
        uAspect: { value: 1 },
        uColor: { value: new THREE.Color(1, 0, 0) }, // ETAPA 3 test red
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
    const prevTarget = gl.getRenderTarget();
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
    comp.mat.uniforms.uAspect.value = size.width / size.height;

    gl.setRenderTarget(null);
    const prevAutoClear = gl.autoClear;
    gl.autoClear = false;
    gl.render(comp.scn, comp.cam);
    gl.autoClear = prevAutoClear;
  }, 4);

  return null;
}
