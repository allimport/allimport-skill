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
 *   → CompositePass: white ink + cyan logo halo → canvas
 *
 * Art direction (etapa 6): the ink reads as WHITE with a cyan halo that
 * runs ONLY along the letters. From the dye density we cut two bands:
 *   - core: the dense centre → near-opaque WHITE (everywhere the ink is).
 *   - rim : the ink's edge   → CYAN, but masked to the logo, so the cyan
 *           traces the letters and nothing bleeds onto the background.
 *   - outside both → fully transparent.
 * The logo is rendered to its own target (RT_LOGO, A = mask) on a dedicated
 * layer so the cyan can be contained inside the letters. It draws AFTER the
 * composer, so nothing here enters lighting, bloom or the material, and the
 * background (dye = 0) is untouched. One premultiplied-over draw.
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

  // Viscous-ribbon profile — NOT a long gradient. The dye field is cut with
  // NEAR-STEP edges whose transition half-width is the dye's own screen-space
  // derivative (fwidth), i.e. a constant ~1px antialias no matter how fast
  // the density falls off. So the ink reads as a solid liquid body with a
  // crisp, well-defined outline, never smoke. Three hard zones:
  //   dye <  EDGE          -> transparent
  //   EDGE <= dye < CORE   -> thin CYAN rim (hugs the outline)
  //   dye >= CORE          -> compact, near-opaque WHITE core
  // The rim's dye span (CORE-EDGE) is deliberately small so the cyan band is
  // thin; on a steep ink edge that maps to just a couple of pixels.
  const float EDGE = 0.30;   // outer outline; below it, nothing is drawn
  const float CORE = 0.33;   // core boundary (rim thickness = CORE - EDGE)
  const float CORE_OPACITY = 0.96; // white core: almost fully opaque

  void main() {
    float mask = texture2D(uMask, vUv).a;   // 1 on the logo, 0 elsewhere
    float dye  = texture2D(uDye,  vUv).r;   // ink density under this pixel

    // Constant ~1px antialias from the density's screen gradient. Floor it
    // so a flat (plateau) region can't collapse the edge to a hard alias.
    float aa = max(fwidth(dye), 0.0016);

    // Near-step cuts (transition = 2*aa ~= 1px), not a wide smoothstep:
    float body = smoothstep(EDGE - aa, EDGE + aa, dye); // full ink outline
    float core = smoothstep(CORE - aa, CORE + aa, dye); // dense white centre
    float rim  = clamp(body - core, 0.0, 1.0);          // thin outline ring

    // Compact near-opaque white core (on or off the logo); exterior (dye <
    // EDGE) stays fully transparent.
    float iw = core * CORE_OPACITY * uReveal;
    // Thin cyan edge, CONTAINED in the logo so it traces the letters only.
    float cw = rim * mask * uReveal;

    // One premultiplied-over draw: background -> cyan rim -> white core.
    //   final = mix( mix(D, cyan, cw), white, iw )
    //   premult = (1-iw)*cw*cyan + iw*white ;  outA = 1-(1-iw)(1-cw)
    vec3 premult = uCyan * (cw * (1.0 - iw)) + uInk * iw;
    float outA   = 1.0 - (1.0 - iw) * (1.0 - cw);
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
