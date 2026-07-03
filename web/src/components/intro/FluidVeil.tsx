"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { BEATS, seg, clamp01 } from "./timeline";
import { useIntroClock } from "./Scene";

/**
 * Black fluid veil — the energy-contrast layer behind the logo.
 *
 * One quad, fbm plume DARKER than the void with a faint cyan filament at
 * the noise ridge. Deliberately restrained (max alpha ~0.18): it reads as
 * dark energy stirring, never as a wide overlay. Strength follows mouse
 * SPEED (reaction, not decoration) and only wakes after assembly.
 */

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragment = /* glsl */ `
  uniform float uTime;
  uniform float uStrength;
  uniform vec2 uMouse;
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

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p = p * 2.03 + vec2(1.7, 9.2);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;

    // Plume drifts slowly and leans toward the pointer.
    vec2 p = (uv - 0.5) * vec2(3.2, 2.0) - uMouse * 0.35;
    float n = fbm(p * 1.6 + vec2(uTime * 0.05, -uTime * 0.03));
    float plume = smoothstep(0.42, 0.72, n);

    // Radial confinement: never a wide overlay.
    float d = distance(uv, vec2(0.5 + uMouse.x * 0.08, 0.5 + uMouse.y * 0.05));
    float confine = smoothstep(0.45, 0.16, d);

    // Dark body + faint cyan filament at the ridge.
    float ridge = smoothstep(0.02, 0.0, abs(n - 0.6)) * 0.35;
    vec3 col = mix(vec3(0.0), vec3(0.0, 0.35, 0.35), ridge);

    float a = plume * confine * uStrength;
    if (a < 0.004) discard;
    gl_FragColor = vec4(col, a);
  }
`;

export default function FluidVeil() {
  const clock = useIntroClock();
  const { pointer } = useThree();
  const mat = useRef<THREE.ShaderMaterial>(null!);
  const prev = useRef({ x: 0, y: 0 });
  const strength = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uStrength: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    [],
  );

  useFrame((_, dt) => {
    const t = clock.t;
    const inter = seg(t, BEATS.settle);

    // Mouse speed → veil strength: a reaction, capped and 50% subtle.
    const dx = pointer.x - prev.current.x;
    const dy = pointer.y - prev.current.y;
    prev.current.x = pointer.x;
    prev.current.y = pointer.y;
    const speed = Math.sqrt(dx * dx + dy * dy) / Math.max(dt, 1e-4);
    const target = clamp01(speed * 0.35) * 0.18 * inter + 0.03 * inter;
    strength.current += (target - strength.current) * 0.05;

    mat.current.uniforms.uTime.value = t;
    mat.current.uniforms.uStrength.value = strength.current;
    mat.current.uniforms.uMouse.value.set(pointer.x, pointer.y);
  });

  return (
    <mesh position={[0, 0, -3.2]}>
      <planeGeometry args={[26, 15]} />
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
