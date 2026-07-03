"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { BEATS, seg } from "./timeline";
import { useIntroClock } from "./Scene";

/**
 * Gravitational density — the void responds to the pointer.
 *
 * No particles, no waves, no moving stars: a luminance field 3–4% above
 * black that swells toward the pointer with heavy lag, as if the space
 * itself had mass and bent. Settle-gated and slow to follow, so it is
 * DISCOVERED after a few seconds, never announced. Elegant, not an
 * effect: at rest it is invisible.
 */

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragment = /* glsl */ `
  uniform vec2 uCenter;   // lagged pointer, NDC-ish
  uniform float uAmp;     // 0..1, settle-gated
  varying vec2 vUv;

  void main() {
    vec2 p = vUv - 0.5;
    vec2 c = uCenter * vec2(0.5, 0.32);
    float d = length((p - c) * vec2(1.5, 1.0));

    // A soft gravitational swell: cold luminance lift, densest at core.
    float well = exp(-d * d * 9.0);
    vec3 col = vec3(0.04, 0.065, 0.09) * well;

    float a = well * uAmp * 0.3;
    if (a < 0.003) discard;
    gl_FragColor = vec4(col, a);
  }
`;

export default function GravityField() {
  const clock = useIntroClock();
  const { pointer } = useThree();
  const mat = useRef<THREE.ShaderMaterial>(null!);
  const lag = useRef({ x: 0, y: 0, amp: 0 });

  const uniforms = useMemo(
    () => ({
      uCenter: { value: new THREE.Vector2(0, 0) },
      uAmp: { value: 0 },
    }),
    [],
  );

  useFrame(() => {
    const t = clock.t;
    const inter = seg(t, BEATS.settle);

    // Heavy lag: the field arrives late, like mass responding to pull.
    const l = lag.current;
    l.x += (pointer.x - l.x) * 0.015;
    l.y += (pointer.y - l.y) * 0.015;
    // Amplitude eases in only while the pointer is away from rest —
    // discovered through movement, invisible in stillness.
    const away = Math.min(1, Math.hypot(pointer.x, pointer.y) * 1.4);
    l.amp += (away * inter - l.amp) * 0.02;

    mat.current.uniforms.uCenter.value.set(l.x, l.y);
    mat.current.uniforms.uAmp.value = l.amp;
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
      />
    </mesh>
  );
}
