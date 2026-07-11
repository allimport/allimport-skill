"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { BEATS, seg } from "./timeline";
import { useIntroClock } from "./Scene";
import { CENTER_Y } from "./Emblem";

/**
 * Fluid — white ink the hand can play with, living ON the logo band.
 *
 * A fixed quad covering just the wordmark band (never the viewport)
 * renders a metaball field from the last N pointer samples: moving the
 * mouse / finger over the logo draws a soft-edged white ink body that
 * smears along the stroke, shows volume (lit upper-left, self-shadowed
 * lower-right), and dissolves in about a second. Outside the band the
 * pointer simply draws nothing — the effect stays localized, the logo
 * stays the protagonist.
 *
 * Ring buffer in a uniform array: no FBOs, no per-frame allocations.
 */

const N = 24;
/** Seconds for a trail sample to dissolve completely. */
const LIFE = 1.05;
/** Band the ink lives in, world units (logo is ~7 wide). */
const BAND_W = 8.4;
const BAND_H = 4.2;

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
    // Band-local space: x ∈ [-A, A] (A = band aspect), y ∈ [-1, 1].
    vec2 p = (vUv - 0.5) * vec2(${(BAND_W / BAND_H).toFixed(3)}, 1.0) * 2.0;

    float field = 0.0;
    float fOff = 0.0; // light-offset sample → volume
    vec2 L = vec2(-0.05, 0.07);
    for (int i = 0; i < N; i++) {
      vec3 tp = uTrail[i];
      if (tp.z <= 0.001) continue;
      float r = 0.20 + 0.16 * (1.0 - tp.z);
      vec2 d = p - tp.xy;
      field += tp.z * exp(-dot(d, d) / (r * r));
      vec2 d2 = p + L - tp.xy;
      fOff += tp.z * exp(-dot(d2, d2) / (r * r));
    }

    // Organic edge wobble.
    field *= 0.82 + 0.36 * fbm(p * 2.6 + uTime * 0.3);

    // Soft body + faint halo; edge fade so ink never touches the band rim.
    float rim = smoothstep(1.0, 0.82, abs(p.y)) *
                smoothstep(${(BAND_W / BAND_H).toFixed(3)}, ${(BAND_W / BAND_H - 0.35).toFixed(3)}, abs(p.x));
    float body = smoothstep(0.36, 1.1, field) * rim;
    float halo = smoothstep(0.14, 0.6, field) * 0.16 * rim;
    float ink = min(body + halo, 1.0);
    if (ink < 0.004) discard;

    // Volume shading from the offset sample.
    float relief = clamp((fOff - field) * 1.8, -0.35, 0.45);
    float shade = 0.8 + relief;

    vec3 col = mix(vec3(0.4, 0.82, 0.86), vec3(0.9, 0.94, 0.99), body) * shade;
    float a = ink * 0.85 * uReveal;
    gl_FragColor = vec4(col * a, a);
  }
`;

export default function Fluid() {
  const clock = useIntroClock();
  const { pointer, camera, size } = useThree();
  const mat = useRef<THREE.ShaderMaterial>(null!);
  const prev = useRef({ x: 10, y: 10 });
  // Ring buffer: [x, y, age] per sample (band-local coords); age<0 = empty.
  const trail = useRef(
    Array.from({ length: N }, () => ({ x: 0, y: 0, age: -1 })),
  );
  const head = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTrail: { value: Array.from({ length: N }, () => new THREE.Vector3()) },
      uTime: { value: 0 },
      uReveal: { value: 0 },
    }),
    [],
  );

  useFrame((_, dt) => {
    const t = clock.t;
    const inter = seg(t, BEATS.settle);

    // Pointer NDC → world at the band's depth → band-local coords.
    const cam = camera as THREE.PerspectiveCamera;
    const dist = cam.position.z - 0.9;
    const halfH = dist * Math.tan((cam.fov * Math.PI) / 360);
    const halfW = halfH * (size.width / size.height);
    const bx = (pointer.x * halfW) / (BAND_H / 2); // scaled like shader space
    const by = (pointer.y * halfH - CENTER_Y) / (BAND_H / 2);

    const dx = bx - prev.current.x;
    const dy = by - prev.current.y;
    const step = Math.hypot(dx, dy);
    const inBand =
      Math.abs(bx) < BAND_W / BAND_H + 0.3 && Math.abs(by) < 1.3;
    if (inter > 0 && inBand && step > 0.012 && step < 1.4) {
      const s = trail.current[head.current];
      s.x = bx;
      s.y = by;
      s.age = 0;
      head.current = (head.current + 1) % N;
    }
    prev.current.x = bx;
    prev.current.y = by;

    const arr = uniforms.uTrail.value as THREE.Vector3[];
    for (let i = 0; i < N; i++) {
      const s = trail.current[i];
      if (s.age >= 0) s.age += dt;
      const k = s.age < 0 ? 0 : Math.max(0, 1 - s.age / LIFE);
      arr[i].set(s.x, s.y, k * k * inter);
    }

    mat.current.uniforms.uTime.value = t;
    mat.current.uniforms.uReveal.value = seg(t, BEATS.boltOn);
  });

  return (
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
