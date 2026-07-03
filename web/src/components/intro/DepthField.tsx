"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { BEATS, seg, clamp01 } from "./timeline";
import { useIntroClock } from "./Scene";

/**
 * The black with volume — one quad, two duties:
 *
 * LAYER 2 (static): ultra-low-frequency luminance variation, max +1.5%
 * over black. Two or three cold masses across the whole frame — the eye
 * feels volume without ever identifying a texture. Reveals with the
 * intro's first light and then holds perfectly still.
 *
 * INTERACTION: a gravitational swell that follows pointer SPEED with
 * inertia — fast attack, slow release. Move and the black gains density;
 * stop and the space settles back to stillness. Physical, never an
 * effect. Nothing else in the background ever moves.
 */

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragment = /* glsl */ `
  uniform vec2 uCenter;   // lagged pointer
  uniform float uAmp;     // speed-driven, inertial
  uniform float uReveal;  // intro fade-in for the static layer
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  void main() {
    vec2 p = vUv - 0.5;

    // --- Layer 2: static luminance masses. Two octaves, huge scale —
    // the frequency is so low the eye cannot name a texture.
    // Continuous power falloff — no threshold, so no nameable edges.
    float n = noise(vUv * 2.6) * 0.65 + noise(vUv * 5.2 + 7.3) * 0.35;
    float mass = pow(max(n - 0.35, 0.0) / 0.65, 2.4);
    vec3 base = vec3(0.012, 0.02, 0.032) * mass * uReveal;

    // --- Interaction: inertial gravitational swell.
    vec2 c = uCenter * vec2(0.5, 0.32);
    float d = length((p - c) * vec2(1.5, 1.0));
    float well = exp(-d * d * 9.0);
    vec3 swell = vec3(0.04, 0.065, 0.09) * well * uAmp * 0.3;

    vec3 col = base + swell;
    if (max(col.r, max(col.g, col.b)) < 0.002) discard;
    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function DepthField() {
  const clock = useIntroClock();
  const { pointer } = useThree();
  const mat = useRef<THREE.ShaderMaterial>(null!);
  const prev = useRef({ x: 0, y: 0 });
  const lag = useRef({ x: 0, y: 0, amp: 0 });

  const uniforms = useMemo(
    () => ({
      uCenter: { value: new THREE.Vector2(0, 0) },
      uAmp: { value: 0 },
      uReveal: { value: 0 },
    }),
    [],
  );

  useFrame((_, dt) => {
    const t = clock.t;
    const inter = seg(t, BEATS.settle);

    // Pointer speed → density. Fast attack, slow release: the swell has
    // inertia and dissolves gradually once the cursor stops.
    const dx = pointer.x - prev.current.x;
    const dy = pointer.y - prev.current.y;
    prev.current.x = pointer.x;
    prev.current.y = pointer.y;
    const speed = Math.hypot(dx, dy) / Math.max(dt, 1e-4);
    const target = clamp01(speed * 0.3) * inter;

    const l = lag.current;
    l.amp += (target - l.amp) * (target > l.amp ? 0.1 : 0.008);
    l.x += (pointer.x - l.x) * 0.015;
    l.y += (pointer.y - l.y) * 0.015;

    mat.current.uniforms.uCenter.value.set(l.x, l.y);
    mat.current.uniforms.uAmp.value = l.amp;
    mat.current.uniforms.uReveal.value = seg(t, BEATS.particles);
  });

  return (
    <mesh position={[0, 0, -32]}>
      <planeGeometry args={[110, 64]} />
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
