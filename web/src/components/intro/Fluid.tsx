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
const DYE_RES = 512;
const PRESSURE_ITERS = 20;
// Dissipation RATES (per second, frame-rate independent): the reference
// fluid is viscous — motion calms quickly after the gesture, the ink
// itself lingers for seconds and thins slowly.
const VEL_DISS = 3.2;
const DYE_DISS = 0.3;
const CURL_STRENGTH = 5;
const SPLAT_RADIUS = 0.0016; // finer stroke than the reference
// Splat velocity = gesture SPEED (uv/s) × this gain — frame-rate
// independent (equals the classic force 5200 per-frame delta at 60 fps).
const SPLAT_FORCE = 86;
const SPLAT_MAX_V = 200;

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
  uniform float uDissipation;
  void main() {
    vec2 coord = vUv - uDt * texture2D(uVelocity, vUv).xy * uTexel;
    gl_FragColor = texture2D(uSource, coord) / (1.0 + uDissipation * uDt);
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

/** Display: white viscous ink with subtle volume from the dye gradient. */
const displayVert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const displayFrag = /* glsl */ `
  varying vec2 vUv;
  uniform sampler2D uDye;
  uniform vec2 uTexel;
  uniform float uReveal;
  void main() {
    float d = texture2D(uDye, vUv).r;
    if (d < 0.22) discard;
    // Dense liquid body with a SHARP paint edge (the reference ink is a
    // near-opaque blob with rounded, surface-tension outlines — the tight
    // threshold on the smooth dye field is what makes it tear into
    // rounded globules instead of fading like smoke).
    float body = smoothstep(0.26, 0.38, d);
    // Volume: shade by the dye gradient — lit upper-left like the scene key.
    float dx = texture2D(uDye, vUv + vec2(uTexel.x, 0.0)).r
             - texture2D(uDye, vUv - vec2(uTexel.x, 0.0)).r;
    float dy = texture2D(uDye, vUv + vec2(0.0, uTexel.y)).r
             - texture2D(uDye, vUv - vec2(0.0, uTexel.y)).r;
    float shade = clamp(0.86 - dx * 1.4 + dy * 1.9, 0.55, 1.15);
    vec3 col = vec3(0.93, 0.96, 1.0) * shade;
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

export default function Fluid() {
  const clock = useIntroClock();
  const { gl, pointer, size } = useThree();
  const displayMat = useRef<THREE.ShaderMaterial>(null!);
  const mesh = useRef<THREE.Mesh>(null!);
  const prev = useRef({ x: -10, y: -10, has: false });

  // --- Sim resources (created once; disposed on unmount) ---
  const sim = useMemo(() => {
    const quadGeo = new THREE.PlaneGeometry(2, 2);
    const scene = new THREE.Scene();
    const cam = new THREE.Camera();
    const mesh = new THREE.Mesh(quadGeo);
    mesh.frustumCulled = false;
    scene.add(mesh);

    const mk = (frag: string, uniforms: Record<string, THREE.IUniform>) =>
      new THREE.ShaderMaterial({
        vertexShader: baseVert,
        fragmentShader: frag,
        uniforms,
        depthTest: false,
        depthWrite: false,
      });

    const simTexel = new THREE.Vector2(1 / SIM_RES, 1 / SIM_RES);
    const dyeTexel = new THREE.Vector2(1 / DYE_RES, 1 / DYE_RES);

    const mats = {
      advect: mk(advectFrag, {
        uVelocity: { value: null },
        uSource: { value: null },
        uTexel: { value: simTexel },
        uDt: { value: 0 },
        uDissipation: { value: 1 },
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
    };

    const targets = {
      vel: [
        makeTarget(SIM_RES, SIM_RES, THREE.RGBAFormat),
        makeTarget(SIM_RES, SIM_RES, THREE.RGBAFormat),
      ],
      dye: [
        makeTarget(DYE_RES, DYE_RES, THREE.RGBAFormat),
        makeTarget(DYE_RES, DYE_RES, THREE.RGBAFormat),
      ],
      p: [
        makeTarget(SIM_RES, SIM_RES, THREE.RGBAFormat),
        makeTarget(SIM_RES, SIM_RES, THREE.RGBAFormat),
      ],
      div: makeTarget(SIM_RES, SIM_RES, THREE.RGBAFormat),
      curl: makeTarget(SIM_RES, SIM_RES, THREE.RGBAFormat),
    };

    return { scene, cam, mesh, mats, targets, dyeTexel, vi: 0, di: 0, pi: 0 };
  }, []);

  useEffect(() => {
    const { targets, mats, mesh } = sim;
    return () => {
      targets.vel.forEach((t) => t.dispose());
      targets.dye.forEach((t) => t.dispose());
      targets.p.forEach((t) => t.dispose());
      targets.div.dispose();
      targets.curl.dispose();
      Object.values(mats).forEach((m) => m.dispose());
      mesh.geometry.dispose();
    };
  }, [sim]);

  const displayUniforms = useMemo(
    () => ({
      uDye: { value: null as THREE.Texture | null },
      uTexel: { value: new THREE.Vector2(1 / DYE_RES, 1 / DYE_RES) },
      uReveal: { value: 0 },
    }),
    [],
  );

  useFrame(({ camera }, rawDt) => {
    const t = clock.t;
    const inter = seg(t, BEATS.settle);
    const reveal = seg(t, BEATS.boltOn);
    const dt = Math.min(rawDt, 1 / 30);
    const { scene, cam, mesh: quad, mats, targets } = sim;

    const run = (mat: THREE.ShaderMaterial, to: THREE.WebGLRenderTarget) => {
      quad.material = mat;
      gl.setRenderTarget(to);
      gl.render(scene, cam);
    };

    const velR = targets.vel[sim.vi];
    const velW = targets.vel[1 - sim.vi];
    const dyeR = targets.dye[sim.di];
    const dyeW = targets.dye[1 - sim.di];

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
          mats.splat.uniforms.uColor.value.set(0.8, 0.8, 0.8);
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
    mats.advect.uniforms.uDissipation.value = VEL_DISS;
    run(mats.advect, targets.vel[1 - sim.vi]);
    sim.vi = 1 - sim.vi;

    mats.advect.uniforms.uVelocity.value = targets.vel[sim.vi].texture;
    mats.advect.uniforms.uSource.value = targets.dye[sim.di].texture;
    mats.advect.uniforms.uDissipation.value = DYE_DISS;
    run(mats.advect, targets.dye[1 - sim.di]);
    sim.di = 1 - sim.di;

    gl.setRenderTarget(null);

    // --- Display --- (write through the material: R3F clones the uniforms
    // object passed as a JSX prop, so the original is not live)
    const du = displayMat.current?.uniforms;
    if (du) {
      du.uDye.value = targets.dye[sim.di].texture;
      du.uReveal.value = reveal;
    }

    const pc = camera as THREE.PerspectiveCamera;
    const dist = pc.position.z - mesh.current.position.z;
    const h = 2 * dist * Math.tan((pc.fov * Math.PI) / 360);
    mesh.current.scale.set(h * (size.width / size.height), h, 1);
  }, -1);

  return (
    <mesh ref={mesh} position={[0, 0, 0.9]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={displayMat}
        vertexShader={displayVert}
        fragmentShader={displayFrag}
        uniforms={displayUniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}
