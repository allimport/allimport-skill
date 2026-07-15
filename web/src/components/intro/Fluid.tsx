"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { BEATS, seg } from "./timeline";
import { useIntroClock } from "./Scene";

/**
 * Fluid — a real Navier-Stokes ink simulation (reference: buttermax.net
 * cursor fluid, white instead of black, finer stroke).
 *
 * This is the classic GPU stable-fluids pipeline: velocity advection,
 * vorticity confinement, pressure projection (Jacobi), and a dye field
 * advected by the resulting flow. The pointer splats force + white dye;
 * the fluid then does what real fluid does — stretches with the gesture,
 * tears into droplets, merges back, curls on itself, and dissipates
 * slowly. Nothing is faked: no metaballs, no blur, no particles.
 *
 * The dye is displayed on a view-filling quad in FRONT of the logo, so
 * the ink can be drawn anywhere in the hero and passes over the letters.
 * Outside the stroke the dye is zero and the quad is invisible — no
 * rectangle, no limit, and it can never wash the whole screen (dye only
 * exists where the hand put it).
 *
 * Sim runs at 128px (velocity) / 512px (dye) in half-float ping-pong
 * targets: ~60 fps on integrated GPUs.
 */

const SIM_RES = 128;
/** Ink texture size: on large screens the dissolving outline of a 512px
 *  dye grid reads faintly stepped, so desktop gets 1024 (the sim grid
 *  stays at 128 — only the ink itself sharpens). */
const dyeRes = () =>
  typeof window !== "undefined" && window.innerWidth > 900 ? 1024 : 512;
const PRESSURE_ITERS = 20;
// Dissipation RATES (per second, frame-rate independent): the reference
// fluid is viscous — motion calms quickly after the gesture, and the ink
// carries only a SHORT history: what you drew in the last moment. Old ink
// dissolves continuously (injection and fade stay in equilibrium), so a
// long scribble is a living ribbon under the hand, never an accumulating
// coat of paint — stop moving and it is gone in about a second.
const VEL_DISS = 3.2;
// Dye fade is almost ALL erosion (constant subtraction), barely any
// proportional dimming: the ink holds its opaque value along the whole
// trail — so the stroke reads as a solid liquid RIBBON, not just the
// freshest splat — then drops off a cliff and is gone in ~1.2s. A high
// proportional term instead dims the trail exponentially, dropping it
// under the display threshold a few pixels behind the cursor and
// collapsing the ribbon into a dot.
const DYE_DISS = 0.06;
// Tuned so peak ink expansion holds around 3.5% of the hero (measured):
// higher erodes the trail faster (less expansion), lower lets it live
// longer (more). Ink is bounded by this wall-clock lifetime, fps-invariant.
const DYE_ERODE = 0.465;
const CURL_STRENGTH = 5;
const SPLAT_RADIUS = 0.0035; // fat rounded mass, like the reference
// Splat velocity = gesture SPEED (uv/s) × this gain — frame-rate
// independent (equals the classic force 5200 per-frame delta at 60 fps).
const SPLAT_FORCE = 42;
const SPLAT_MAX_V = 70;

const baseVert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const advectFrag = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uVelocity;
  uniform sampler2D uSource;
  uniform vec2 uTexel;
  uniform float uDt;
  uniform float uFadeDt;
  uniform float uDissipation;
  uniform float uErode;
  void main() {
    // Two clocks, on purpose. uDt is CLAMPED for CFL stability of the
    // semi-Lagrangian displacement. uFadeDt is REAL elapsed time: decay
    // is pointwise and unconditionally stable, and if it ran on the
    // clamped clock, any machine rendering below the clamp rate would
    // fade slower than real time while the hand keeps injecting at real
    // time — a structural accumulation leak, the ink slowly coating the
    // screen exactly on the devices that can least afford it.
    vec2 coord = vUv - uDt * texture2D(uVelocity, vUv).xy * uTexel;
    vec4 r = texture2D(uSource, coord) / (1.0 + uDissipation * uFadeDt);
    // Constant erosion (dye only; 0 for velocity): each semi-Lagrangian
    // resample smears the field by up to a texel — proportional decay
    // alone lets the thinned halo hang as fog. Subtracting a constant
    // eats the faint spread almost immediately while barely denting the
    // dense core: a LIQUID body with a hard physical limit, never mist.
    r = sign(r) * max(abs(r) - uErode * uFadeDt, 0.0);
    gl_FragColor = r;
  }
`;

const splatFrag = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uTarget;
  uniform vec2 uPoint;
  uniform vec3 uColor;
  uniform float uRadius;
  uniform float uAspect;
  uniform float uClampMax; // >0: cap the field (dye); 0: unbounded (velocity)
  void main() {
    vec2 d = vUv - uPoint;
    d.x *= uAspect;
    vec3 splat = exp(-dot(d, d) / uRadius) * uColor;
    vec3 v = texture2D(uTarget, vUv).xyz + splat;
    if (uClampMax > 0.0) v = min(v, vec3(uClampMax));
    gl_FragColor = vec4(v, 1.0);
  }
`;

const curlFrag = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uVelocity;
  uniform vec2 uTexel;
  void main() {
    float L = texture2D(uVelocity, vUv - vec2(uTexel.x, 0.0)).y;
    float R = texture2D(uVelocity, vUv + vec2(uTexel.x, 0.0)).y;
    float B = texture2D(uVelocity, vUv - vec2(0.0, uTexel.y)).x;
    float T = texture2D(uVelocity, vUv + vec2(0.0, uTexel.y)).x;
    gl_FragColor = vec4(0.5 * ((R - L) - (T - B)), 0.0, 0.0, 1.0);
  }
`;

const vorticityFrag = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uVelocity;
  uniform sampler2D uCurl;
  uniform vec2 uTexel;
  uniform float uCurlStrength;
  uniform float uDt;
  void main() {
    float L = texture2D(uCurl, vUv - vec2(uTexel.x, 0.0)).x;
    float R = texture2D(uCurl, vUv + vec2(uTexel.x, 0.0)).x;
    float B = texture2D(uCurl, vUv - vec2(0.0, uTexel.y)).x;
    float T = texture2D(uCurl, vUv + vec2(0.0, uTexel.y)).x;
    float C = texture2D(uCurl, vUv).x;
    vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
    force = force / (length(force) + 0.0001) * uCurlStrength * C;
    force.y *= -1.0;
    vec2 vel = texture2D(uVelocity, vUv).xy + force * uDt;
    gl_FragColor = vec4(clamp(vel, -1000.0, 1000.0), 0.0, 1.0);
  }
`;

const divergenceFrag = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uVelocity;
  uniform vec2 uTexel;
  void main() {
    float L = texture2D(uVelocity, vUv - vec2(uTexel.x, 0.0)).x;
    float R = texture2D(uVelocity, vUv + vec2(uTexel.x, 0.0)).x;
    float B = texture2D(uVelocity, vUv - vec2(0.0, uTexel.y)).y;
    float T = texture2D(uVelocity, vUv + vec2(0.0, uTexel.y)).y;
    gl_FragColor = vec4(0.5 * (R - L + T - B), 0.0, 0.0, 1.0);
  }
`;

const clearFrag = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform float uValue;
  void main() { gl_FragColor = uValue * texture2D(uTexture, vUv); }
`;

const pressureFrag = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uPressure;
  uniform sampler2D uDivergence;
  uniform vec2 uTexel;
  void main() {
    float L = texture2D(uPressure, vUv - vec2(uTexel.x, 0.0)).x;
    float R = texture2D(uPressure, vUv + vec2(uTexel.x, 0.0)).x;
    float B = texture2D(uPressure, vUv - vec2(0.0, uTexel.y)).x;
    float T = texture2D(uPressure, vUv + vec2(0.0, uTexel.y)).x;
    float div = texture2D(uDivergence, vUv).x;
    gl_FragColor = vec4((L + R + B + T - div) * 0.25, 0.0, 0.0, 1.0);
  }
`;

const gradientFrag = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uPressure;
  uniform sampler2D uVelocity;
  uniform vec2 uTexel;
  void main() {
    float L = texture2D(uPressure, vUv - vec2(uTexel.x, 0.0)).x;
    float R = texture2D(uPressure, vUv + vec2(uTexel.x, 0.0)).x;
    float B = texture2D(uPressure, vUv - vec2(0.0, uTexel.y)).x;
    float T = texture2D(uPressure, vUv + vec2(0.0, uTexel.y)).x;
    vec2 vel = texture2D(uVelocity, vUv).xy - 0.5 * vec2(R - L, T - B);
    gl_FragColor = vec4(vel, 0.0, 1.0);
  }
`;

/** Logo tint feedback field, in dye-uv (== screen-uv) space. Where the
 *  solid ink body covers a pixel the value ramps up fast (~300ms) and
 *  releases slowly (~700ms) once the ink leaves — the "liquid stains the
 *  metal" response. The letter material samples this by screen position,
 *  so the colour follows the fluid's exact shape and is strictly local:
 *  a corner touched tints only that corner. No wave, no travel, no timer. */
const tintFrag = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uDye;
  uniform sampler2D uPrev;
  uniform float uAttack;
  uniform float uRelease;
  void main() {
    // Widen past the opaque core into the ink's soft edge, so the stain
    // reads as a cyan halo AROUND the white blob (the core itself is
    // hidden under the opaque ink) and in the wake it leaves behind.
    float d = clamp(texture2D(uDye, vUv).r, 0.0, 1.0);
    float target = smoothstep(0.12, 0.45, d);
    float prev = texture2D(uPrev, vUv).r;
    float rate = target > prev ? uAttack : uRelease;
    float v = prev + (target - prev) * clamp(rate, 0.0, 1.0);
    gl_FragColor = vec4(v, 0.0, 0.0, 1.0);
  }
`;

/** Live logo tint texture, published by Fluid, sampled by Emblem's
 *  letter material in screen space. */
export const logoTint: { tex: THREE.Texture | null } = { tex: null };

/** Display: rendered as its own fullscreen pass AFTER the composer —
 *  outside bloom (no halo) and outside tone mapping (exact paint-white).
 *  The reference ink is a FLAT solid silhouette with a sharp, rounded
 *  outline; everything liquid about it lives in that outline. */
const displayFrag = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uDye;
  uniform float uReveal;
  void main() {
    float d = texture2D(uDye, vUv).r;
    if (d < 0.4) discard;
    // Near-binary edge cut deep into the diffusion halo: the mass stays
    // fully opaque and dissolves by RETRACTING its outline, never by
    // trailing off into a grey haze. Tears become rounded globules.
    float body = smoothstep(0.435, 0.465, d);
    vec3 col = vec3(0.965, 0.975, 1.0);
    float a = body * uReveal;
    gl_FragColor = vec4(col * a, a);
  }
`;

function makeTarget(w: number, h: number, fmt: THREE.AnyPixelFormat) {
  return new THREE.WebGLRenderTarget(w, h, {
    type: THREE.HalfFloatType,
    format: fmt as THREE.PixelFormat,
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    wrapS: THREE.ClampToEdgeWrapping,
    wrapT: THREE.ClampToEdgeWrapping,
    depthBuffer: false,
  });
}

export default function Fluid({ manualRender = false }: { manualRender?: boolean }) {
  const clock = useIntroClock();
  const { gl, pointer, size } = useThree();
  const prev = useRef({ x: -10, y: -10, has: false });

  // --- Sim resources (created once; disposed on unmount) ---
  const sim = useMemo(() => {
    const quadGeo = new THREE.PlaneGeometry(2, 2);
    const scene = new THREE.Scene();
    const cam = new THREE.Camera();
    const mesh = new THREE.Mesh(quadGeo);
    mesh.frustumCulled = false;
    scene.add(mesh);

    // Display overlay: its own fullscreen scene, drawn straight to the
    // canvas after the main render / composer.
    const dispMat = new THREE.ShaderMaterial({
      vertexShader: baseVert,
      fragmentShader: displayFrag,
      uniforms: {
        uDye: { value: null as THREE.Texture | null },
        uReveal: { value: 0 },
      },
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });
    const dispScene = new THREE.Scene();
    const dispQuad = new THREE.Mesh(quadGeo, dispMat);
    dispQuad.frustumCulled = false;
    dispScene.add(dispQuad);

    // Logo tint feedback field (ping-pong), dye-uv space, half float.
    const tint = [
      makeTarget(256, 256, THREE.RGBAFormat),
      makeTarget(256, 256, THREE.RGBAFormat),
    ];

    const mk = (frag: string, uniforms: Record<string, THREE.IUniform>) =>
      new THREE.ShaderMaterial({
        vertexShader: baseVert,
        fragmentShader: frag,
        uniforms,
        depthTest: false,
        depthWrite: false,
      });

    const simTexel = new THREE.Vector2(1 / SIM_RES, 1 / SIM_RES);
    const DYE = dyeRes();

    const mats = {
      advect: mk(advectFrag, {
        uVelocity: { value: null },
        uSource: { value: null },
        uTexel: { value: simTexel },
        uDt: { value: 0 },
        uFadeDt: { value: 0 },
        uDissipation: { value: 1 },
        uErode: { value: 0 },
      }),
      splat: mk(splatFrag, {
        uTarget: { value: null },
        uPoint: { value: new THREE.Vector2() },
        uColor: { value: new THREE.Vector3() },
        uRadius: { value: SPLAT_RADIUS },
        uAspect: { value: 1 },
        uClampMax: { value: 0 },
      }),
      curl: mk(curlFrag, {
        uVelocity: { value: null },
        uTexel: { value: simTexel },
      }),
      vorticity: mk(vorticityFrag, {
        uVelocity: { value: null },
        uCurl: { value: null },
        uTexel: { value: simTexel },
        uCurlStrength: { value: CURL_STRENGTH },
        uDt: { value: 0 },
      }),
      divergence: mk(divergenceFrag, {
        uVelocity: { value: null },
        uTexel: { value: simTexel },
      }),
      clear: mk(clearFrag, {
        uTexture: { value: null },
        uValue: { value: 0.8 },
      }),
      pressure: mk(pressureFrag, {
        uPressure: { value: null },
        uDivergence: { value: null },
        uTexel: { value: simTexel },
      }),
      gradient: mk(gradientFrag, {
        uPressure: { value: null },
        uVelocity: { value: null },
        uTexel: { value: simTexel },
      }),
      tint: mk(tintFrag, {
        uDye: { value: null },
        uPrev: { value: null },
        uAttack: { value: 0.1 },
        uRelease: { value: 0.04 },
      }),
    };

    const targets = {
      vel: [
        makeTarget(SIM_RES, SIM_RES, THREE.RGBAFormat),
        makeTarget(SIM_RES, SIM_RES, THREE.RGBAFormat),
      ],
      dye: [
        makeTarget(DYE, DYE, THREE.RGBAFormat),
        makeTarget(DYE, DYE, THREE.RGBAFormat),
      ],
      p: [
        makeTarget(SIM_RES, SIM_RES, THREE.RGBAFormat),
        makeTarget(SIM_RES, SIM_RES, THREE.RGBAFormat),
      ],
      div: makeTarget(SIM_RES, SIM_RES, THREE.RGBAFormat),
      curl: makeTarget(SIM_RES, SIM_RES, THREE.RGBAFormat),
    };

    return {
      scene, cam, mesh, mats, targets,
      dispScene, dispQuad, dispMat,
      tint, ti: 0,
      vi: 0, di: 0, pi: 0, frame: 0,
    };
  }, []);

  useEffect(() => {
    const { targets, mats, mesh, dispMat, tint } = sim;
    return () => {
      targets.vel.forEach((t) => t.dispose());
      targets.dye.forEach((t) => t.dispose());
      targets.p.forEach((t) => t.dispose());
      targets.div.dispose();
      targets.curl.dispose();
      tint.forEach((t) => t.dispose());
      Object.values(mats).forEach((m) => m.dispose());
      dispMat.dispose();
      logoTint.tex = null;
      mesh.geometry.dispose();
    };
  }, [sim]);

  useFrame((_, rawDt) => {
    const t = clock.t;
    const inter = seg(t, BEATS.settle);
    const reveal = seg(t, BEATS.boltOn);
    const dt = Math.min(rawDt, 1 / 30);
    // Real elapsed time for all fading (capped only against tab-switch
    // jumps) — decay must run on the wall clock at ANY frame rate.
    const fadeDt = Math.min(rawDt, 0.25);
    const { scene, cam, mesh: quad, mats, targets } = sim;

    const run = (mat: THREE.ShaderMaterial, to: THREE.WebGLRenderTarget) => {
      quad.material = mat;
      gl.setRenderTarget(to);
      gl.render(scene, cam);
    };

    // --- Splat pointer motion: force into velocity, white into dye ---
    const px = pointer.x * 0.5 + 0.5;
    const py = pointer.y * 0.5 + 0.5;
    if (inter > 0 && prev.current.has) {
      const dx = px - prev.current.x;
      const dy = py - prev.current.y;
      const step = Math.hypot(dx, dy);
      if (step > 0.0008 && step < 0.25) {
        const aspect = size.width / size.height;
        mats.splat.uniforms.uAspect.value = aspect;
        // gesture speed in uv/s (frame-rate independent), capped so a
        // teleport-fast flick never detonates the field
        const invDt = 1 / Math.max(rawDt, 1 / 240);
        const speed = Math.min(step * invDt * SPLAT_FORCE, SPLAT_MAX_V);
        const vx = (dx / step) * speed;
        const vy = (dy / step) * speed;
        // interpolate along fast gestures so the stroke is continuous
        const n = Math.min(4, Math.ceil(step / 0.02));
        for (let i = 1; i <= n; i++) {
          const ix = prev.current.x + (dx * i) / n;
          const iy = prev.current.y + (dy * i) / n;
          mats.splat.uniforms.uPoint.value.set(ix, iy);
          // velocity splat
          mats.splat.uniforms.uTarget.value = targets.vel[sim.vi].texture;
          mats.splat.uniforms.uColor.value.set(vx, vy, 0);
          mats.splat.uniforms.uRadius.value = SPLAT_RADIUS * 3.2;
          mats.splat.uniforms.uClampMax.value = 0;
          run(mats.splat, targets.vel[1 - sim.vi]);
          sim.vi = 1 - sim.vi;
          // dye splat (thin white, capped so the core cannot oversaturate
          // and outlive the intended slow fade)
          mats.splat.uniforms.uTarget.value = targets.dye[sim.di].texture;
          mats.splat.uniforms.uColor.value.set(1.1, 1.1, 1.1);
          mats.splat.uniforms.uRadius.value = SPLAT_RADIUS;
          mats.splat.uniforms.uClampMax.value = 1.1;
          run(mats.splat, targets.dye[1 - sim.di]);
          sim.di = 1 - sim.di;
        }
      }
    }
    prev.current.x = px;
    prev.current.y = py;
    prev.current.has = true;

    // --- Vorticity confinement (the viscous curls of the reference) ---
    mats.curl.uniforms.uVelocity.value = targets.vel[sim.vi].texture;
    run(mats.curl, targets.curl);
    mats.vorticity.uniforms.uVelocity.value = targets.vel[sim.vi].texture;
    mats.vorticity.uniforms.uCurl.value = targets.curl.texture;
    mats.vorticity.uniforms.uDt.value = dt;
    run(mats.vorticity, targets.vel[1 - sim.vi]);
    sim.vi = 1 - sim.vi;

    // --- Pressure projection (incompressibility → stretch/tear/merge) ---
    mats.divergence.uniforms.uVelocity.value = targets.vel[sim.vi].texture;
    run(mats.divergence, targets.div);
    mats.clear.uniforms.uTexture.value = targets.p[sim.pi].texture;
    run(mats.clear, targets.p[1 - sim.pi]);
    sim.pi = 1 - sim.pi;
    for (let i = 0; i < PRESSURE_ITERS; i++) {
      mats.pressure.uniforms.uPressure.value = targets.p[sim.pi].texture;
      mats.pressure.uniforms.uDivergence.value = targets.div.texture;
      run(mats.pressure, targets.p[1 - sim.pi]);
      sim.pi = 1 - sim.pi;
    }
    mats.gradient.uniforms.uPressure.value = targets.p[sim.pi].texture;
    mats.gradient.uniforms.uVelocity.value = targets.vel[sim.vi].texture;
    run(mats.gradient, targets.vel[1 - sim.vi]);
    sim.vi = 1 - sim.vi;

    // --- Advect velocity, then dye ---
    mats.advect.uniforms.uVelocity.value = targets.vel[sim.vi].texture;
    mats.advect.uniforms.uSource.value = targets.vel[sim.vi].texture;
    mats.advect.uniforms.uDt.value = dt;
    mats.advect.uniforms.uFadeDt.value = fadeDt;
    mats.advect.uniforms.uDissipation.value = VEL_DISS;
    mats.advect.uniforms.uErode.value = 0;
    run(mats.advect, targets.vel[1 - sim.vi]);
    sim.vi = 1 - sim.vi;

    mats.advect.uniforms.uVelocity.value = targets.vel[sim.vi].texture;
    mats.advect.uniforms.uSource.value = targets.dye[sim.di].texture;
    // Dye is a passive scalar: semi-Lagrangian advection is
    // unconditionally stable, so it displaces on the REAL clock (fadeDt),
    // not the CFL clamp used for the velocity feedback loop. Otherwise,
    // below 30fps the dye would fade at real time but only advect at the
    // clamped rate — dying before it can stretch, collapsing the ribbon
    // into a dot exactly on slower devices.
    mats.advect.uniforms.uDt.value = fadeDt;
    mats.advect.uniforms.uDissipation.value = DYE_DISS;
    mats.advect.uniforms.uErode.value = DYE_ERODE;
    run(mats.advect, targets.dye[1 - sim.di]);
    sim.di = 1 - sim.di;

    // --- Logo tint feedback: where the solid ink covers a pixel the tint
    // ramps up in ~300ms and releases in ~700ms, all on the wall clock.
    // Emblem samples this field in screen space, so the colour follows
    // the fluid's exact shape and stays local to the contact. ---
    mats.tint.uniforms.uDye.value = targets.dye[sim.di].texture;
    mats.tint.uniforms.uPrev.value = sim.tint[sim.ti].texture;
    mats.tint.uniforms.uAttack.value = Math.min(1, fadeDt / 0.3);
    mats.tint.uniforms.uRelease.value = Math.min(1, fadeDt / 0.7);
    run(mats.tint, sim.tint[1 - sim.ti]);
    sim.ti = 1 - sim.ti;
    logoTint.tex = sim.tint[sim.ti].texture;

    gl.setRenderTarget(null);

    sim.dispMat.uniforms.uDye.value = targets.dye[sim.di].texture;
    sim.dispMat.uniforms.uReveal.value = reveal;
  }, -1);

  // Overlay pass: draw the ink straight to the canvas AFTER the main
  // render / EffectComposer, so bloom never wraps it in a halo and tone
  // mapping never greys the paint. Registering any positive-priority
  // subscriber disables R3F's automatic render, so when the composer is
  // not mounted (reduced motion) this pass renders the scene itself.
  useFrame((state) => {
    if (manualRender) {
      state.gl.setRenderTarget(null);
      state.gl.render(state.scene, state.camera);
    }
    const prevAutoClear = state.gl.autoClear;
    state.gl.autoClear = false;
    state.gl.render(sim.dispScene, sim.cam);
    state.gl.autoClear = prevAutoClear;
  }, 10);

  return null;
}
