"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { BEATS, seg } from "./timeline";
import { useIntroClock } from "./Scene";
import { CENTER_Y } from "./Emblem";

/**
 * Fluid — white mercury the hand plays with, ON TOP of the wordmark.
 *
 * A quad covering only the logo band (never the viewport) renders a
 * metaball field from the last N pointer samples. Ink exists ONLY while
 * the hand moves: each sample is born exactly under the pointer, eases in
 * over ~150 ms (no pop, no flash), fuses with its neighbours into one
 * viscous body, gets smeared along the motion direction (deformation),
 * and dissolves over ~2.2 s — long enough to draw with. At rest the field
 * empties and the quad draws nothing. Volume comes from a light-offset
 * second field sample: lit upper-left, self-shadowed lower-right.
 *
 * The DOM (promise, CTA, sections) lives above the canvas; the band never
 * reaches the text zone. Ring buffer in a uniform array: no FBOs, no
 * per-frame allocations.
 */

const N = 28;
/** Seconds a sample takes to dissolve — the "play window". */
const LIFE = 2.2;
/** Seconds a newborn sample takes to fade in (kills pops/flashes). */
const BIRTH = 0.15;
/** Band the ink lives in, world units (wordmark is ~7 wide, cap ~1.4 tall). */
const BAND_W = 7.8;
const BAND_H = 3.0;
const BAND_A = BAND_W / BAND_H;

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragment = /* glsl */ `
  #define N ${N}
  uniform vec3 uTrail[N];  // xy = band-local coords, z = strength 0..1
  uniform vec2 uVel;       // smoothed pointer velocity (deform direction)
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
    for(int i=0;i<3;i++){ v+=a*noise(p); p=p*2.03+vec2(1.7,9.2); a*=0.5; }
    return v;
  }

  void main(){
    // Band-local space: x in [-A, A], y in [-1, 1].
    vec2 p = (vUv - 0.5) * vec2(${BAND_A.toFixed(3)}, 1.0) * 2.0;

    // The coordinate field itself is dragged along the motion vector and
    // wobbled by fbm — the body visibly DEFORMS with the gesture and never
    // reads as stamped circles.
    vec2 warp = uVel * 0.22 + 0.09 * vec2(
      fbm(p * 2.2 + uTime * 0.35) - 0.5,
      fbm(p * 2.2 - uTime * 0.28 + 4.7) - 0.5
    );
    vec2 q = p + warp;

    float field = 0.0;
    float fOff = 0.0; // light-offset sample -> volume
    vec2 L = vec2(-0.055, 0.075);
    for (int i = 0; i < N; i++) {
      vec3 tp = uTrail[i];
      if (tp.z <= 0.001) continue;
      // Young ink is tight and dense; dying ink relaxes and widens.
      float r = 0.21 + 0.20 * (1.0 - tp.z);
      vec2 d = q - tp.xy;
      float g = tp.z * exp(-dot(d, d) / (r * r));
      field += g;
      vec2 d2 = q + L - tp.xy;
      fOff += tp.z * exp(-dot(d2, d2) / (r * r));
    }

    // Edge fade: the ink thins out well before the band rim — it can never
    // touch the text zone or read as a screen overlay.
    float rim = smoothstep(1.0, 0.8, abs(p.y)) *
                smoothstep(${BAND_A.toFixed(3)}, ${(BAND_A - 0.4).toFixed(3)}, abs(p.x));

    // Mercury body: dense core, thin translucent skirt. Soft thresholds —
    // nothing ever snaps in.
    float body = smoothstep(0.34, 1.05, field) * rim;
    float skirt = smoothstep(0.16, 0.5, field) * 0.14 * rim;
    float ink = min(body + skirt, 1.0);
    if (ink < 0.004) discard;

    // Volume: the offset sample shades the droplet — bright toward the key
    // light (upper-left), self-shadowed on the far side.
    float relief = clamp((fOff - field) * 2.2, -0.5, 0.55);
    float shade = 0.76 + relief;

    // Cold white core, faint cyan skirt. Capped alpha: never a flash.
    vec3 col = mix(vec3(0.42, 0.8, 0.85), vec3(0.93, 0.96, 1.0), body) * shade;
    float a = ink * 0.8 * uReveal;
    gl_FragColor = vec4(col * a, a);
  }
`;

export default function Fluid() {
  const clock = useIntroClock();
  const { pointer, camera, size } = useThree();
  const mat = useRef<THREE.ShaderMaterial>(null!);
  const prev = useRef({ x: 10, y: 10 });
  const vel = useRef(new THREE.Vector2());
  // Ring buffer: band-local x/y + age (age < 0 = empty slot).
  const trail = useRef(
    Array.from({ length: N }, () => ({ x: 0, y: 0, age: -1 })),
  );
  const head = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTrail: { value: Array.from({ length: N }, () => new THREE.Vector3()) },
      uVel: { value: new THREE.Vector2() },
      uTime: { value: 0 },
      uReveal: { value: 0 },
    }),
    [],
  );

  useFrame((_, dt) => {
    const t = clock.t;
    const inter = seg(t, BEATS.settle);

    // Pointer NDC -> world at the band's depth -> band-local coords. The
    // ink is born EXACTLY under the cursor / finger.
    const cam = camera as THREE.PerspectiveCamera;
    const dist = cam.position.z - 0.9;
    const halfH = dist * Math.tan((cam.fov * Math.PI) / 360);
    const halfW = halfH * (size.width / size.height);
    const bx = (pointer.x * halfW) / (BAND_H / 2);
    const by = (pointer.y * halfH - CENTER_Y) / (BAND_H / 2);

    const dx = bx - prev.current.x;
    const dy = by - prev.current.y;
    const step = Math.hypot(dx, dy);
    // Smoothed velocity drives the shader's directional smear.
    vel.current.x += (dx / Math.max(dt, 1e-4)) * 0.06 - vel.current.x * 0.12;
    vel.current.y += (dy / Math.max(dt, 1e-4)) * 0.06 - vel.current.y * 0.12;
    vel.current.clampLength(0, 1.2);

    // Samples are recorded ONLY while the hand actually moves inside the
    // band (rest = nothing; teleports — finger lift, cursor re-entry — are
    // not strokes and draw nothing).
    const inBand = Math.abs(bx) < BAND_A + 0.3 && Math.abs(by) < 1.3;
    if (inter > 0 && inBand && step > 0.006 && step < 1.4) {
      const s = trail.current[head.current];
      s.x = bx;
      s.y = by;
      s.age = 0;
      head.current = (head.current + 1) % N;
    }
    prev.current.x = bx;
    prev.current.y = by;

    // Age + upload. Birth ease-in kills pops; quadratic tail dissolves the
    // body slowly enough to keep playing with it.
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
    mat.current.uniforms.uTime.value = t;
    mat.current.uniforms.uReveal.value = seg(t, BEATS.boltOn);
  });

  return (
    // z = +0.9: in front of the letters (extrude reaches ±0.17) — the
    // mercury runs OVER the logo, never behind it.
    <mesh position={[0, CENTER_Y, 0.9]}>
      <planeGeometry args={[BAND_W, BAND_H]} />
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
