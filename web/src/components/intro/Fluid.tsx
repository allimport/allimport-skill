"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { BEATS, seg } from "./timeline";
import { useIntroClock } from "./Scene";

/**
 * Fluid — a thin ribbon of liquid white ink that follows the hand
 * (reference: statue.mp4 — a slender, sinuous ink stroke, never a blob).
 *
 * The quad fills the camera view at its depth, so ink can be born under
 * the pointer ANYWHERE in the hero — but the field itself is strictly
 * local metaballs around the last N samples, so nothing is ever drawn
 * beyond the immediate stroke: no rectangle, no clipping edge, no
 * screen-wide wash, by construction.
 *
 * The look: a fine, elegant ribbon. Small radii fuse consecutive samples
 * into a continuous thread; the tail thins as it dissolves (~2 s). The
 * body is NOT flat paint: a high-frequency fbm field modulates the
 * interior (internal currents), a light-offset second field sample gives
 * volume (lit upper-left, self-shadowed), and the whole coordinate space
 * is dragged by the smoothed velocity so the ribbon stretches with the
 * gesture. Samples ease in over ~120 ms — no pops, no flashes.
 *
 * Ring buffer in a uniform array: no FBOs, no allocations per frame.
 */

const N = 32;
/** Seconds a sample takes to dissolve. */
const LIFE = 2.0;
/** Birth ease-in (kills pops). */
const BIRTH = 0.12;

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragment = /* glsl */ `
  #define N ${N}
  uniform vec3 uTrail[N];  // xy = view coords (aspect-corrected), z = strength
  uniform vec2 uVel;
  uniform float uAspect;
  uniform float uTime;
  uniform float uReveal;
  varying vec2 vUv;

  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
  float noise(vec2 p){
    vec2 i=floor(p), f=fract(p);
    vec2 u=f*f*(3.0-2.0*f);
    return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),
               mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);
  }
  float fbm(vec2 p){
    float v=0.0, a=0.5;
    for(int i=0;i<4;i++){ v+=a*noise(p); p=p*2.03+vec2(1.7,9.2); a*=0.5; }
    return v;
  }

  void main(){
    // View space: x in [-aspect, aspect], y in [-1, 1].
    vec2 p = (vUv - 0.5) * vec2(uAspect, 1.0) * 2.0;

    // The coordinate field is dragged along the gesture and rippled by a
    // slow noise — the ribbon bends and breathes, never stamped dots.
    vec2 warp = uVel * 0.10 + 0.028 * vec2(
      fbm(p * 3.1 + uTime * 0.5) - 0.5,
      fbm(p * 3.1 - uTime * 0.42 + 4.7) - 0.5
    );
    vec2 q = p + warp;

    float field = 0.0;
    float fOff = 0.0;
    vec2 L = vec2(-0.02, 0.028);
    for (int i = 0; i < N; i++) {
      vec3 tp = uTrail[i];
      if (tp.z <= 0.001) continue;
      // Thin thread: young ink is a fine line, the dying tail relaxes
      // slightly wider and fainter.
      float r = 0.04 + 0.042 * (1.0 - tp.z);
      vec2 d = q - tp.xy;
      field += tp.z * exp(-dot(d, d) / (r * r));
      vec2 d2 = q + L - tp.xy;
      fOff += tp.z * exp(-dot(d2, d2) / (r * r));
    }

    // Ribbon body: tight core, whisper skirt. Everything soft.
    float body = smoothstep(0.42, 1.15, field);
    float skirt = smoothstep(0.2, 0.55, field) * 0.1;
    float ink = min(body + skirt, 1.0);
    if (ink < 0.004) discard;

    // Internal currents: high-frequency liquid texture flowing through
    // the body — energy, not flat paint.
    float cur = fbm(q * 11.0 + uTime * 0.9 + uVel * 2.0);
    float fine = noise(q * 26.0 - uTime * 1.3);
    float inner = 0.68 + 0.5 * cur + 0.16 * (fine - 0.5);

    // Volume from the light-offset sample.
    float relief = clamp((fOff - field) * 2.6, -0.5, 0.5);
    float shade = 0.8 + relief;

    vec3 col = mix(vec3(0.45, 0.8, 0.85), vec3(0.94, 0.97, 1.0), body)
             * shade * inner;
    float a = ink * 0.78 * uReveal;
    gl_FragColor = vec4(col * a, a);
  }
`;

export default function Fluid() {
  const clock = useIntroClock();
  const { pointer, camera, size } = useThree();
  const mat = useRef<THREE.ShaderMaterial>(null!);
  const mesh = useRef<THREE.Mesh>(null!);
  const prev = useRef({ x: 10, y: 10 });
  const smooth = useRef({ x: 10, y: 10 });
  const vel = useRef(new THREE.Vector2());
  const trail = useRef(
    Array.from({ length: N }, () => ({ x: 0, y: 0, age: -1 })),
  );
  const head = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTrail: { value: Array.from({ length: N }, () => new THREE.Vector3()) },
      uVel: { value: new THREE.Vector2() },
      uAspect: { value: 1 },
      uTime: { value: 0 },
      uReveal: { value: 0 },
    }),
    [],
  );

  useFrame((_, dt) => {
    const t = clock.t;
    const inter = seg(t, BEATS.settle);
    const aspect = size.width / size.height;

    // Pointer NDC -> aspect-corrected view coords: born EXACTLY under the
    // hand, anywhere in the hero.
    const px = pointer.x * aspect;
    const py = pointer.y;

    const dx = px - prev.current.x;
    const dy = py - prev.current.y;
    const step = Math.hypot(dx, dy);
    vel.current.x += (dx / Math.max(dt, 1e-4)) * 0.06 - vel.current.x * 0.12;
    vel.current.y += (dy / Math.max(dt, 1e-4)) * 0.06 - vel.current.y * 0.12;
    vel.current.clampLength(0, 1.2);

    // Record only real movement; teleports (finger lift resets to center,
    // cursor re-entering the window) draw nothing. Multiple consecutive
    // touches each start a fresh stroke.
    if (inter > 0 && step > 0.004 && step < 0.6) {
      // Inertia: the recorded head chases the hand with weight (lagged
      // follower) — the ribbon flows behind the gesture instead of
      // snapping to it. Teleports reset the follower.
      if (Math.hypot(px - smooth.current.x, py - smooth.current.y) > 0.6) {
        smooth.current.x = px;
        smooth.current.y = py;
      } else {
        smooth.current.x += (px - smooth.current.x) * 0.42;
        smooth.current.y += (py - smooth.current.y) * 0.42;
      }
      const s = trail.current[head.current];
      s.x = smooth.current.x;
      s.y = smooth.current.y;
      s.age = 0;
      head.current = (head.current + 1) % N;
    }
    prev.current.x = px;
    prev.current.y = py;

    const arr = uniforms.uTrail.value as THREE.Vector3[];
    for (let i = 0; i < N; i++) {
      const s = trail.current[i];
      if (s.age >= 0) s.age += dt;
      let k = 0;
      if (s.age >= 0) {
        const birth = Math.min(s.age / BIRTH, 1);
        const decay = Math.max(0, 1 - s.age / LIFE);
        k = birth * birth * decay * decay;
      }
      arr[i].set(s.x, s.y, k * inter);
    }

    (uniforms.uVel.value as THREE.Vector2).copy(vel.current);
    mat.current.uniforms.uAspect.value = aspect;
    mat.current.uniforms.uTime.value = t;
    mat.current.uniforms.uReveal.value = seg(t, BEATS.boltOn);

    // Fill the camera view at this depth: the ink can appear anywhere the
    // hand goes; the quad itself is invisible outside the stroke.
    const cam = camera as THREE.PerspectiveCamera;
    const dist = cam.position.z - mesh.current.position.z;
    const h = 2 * dist * Math.tan((cam.fov * Math.PI) / 360);
    mesh.current.scale.set(h * aspect, h, 1);
  });

  return (
    // In front of the letters — the ink runs over the logo when the
    // stroke crosses it, and over the void everywhere else.
    <mesh ref={mesh} position={[0, 0, 0.9]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={mat}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}
