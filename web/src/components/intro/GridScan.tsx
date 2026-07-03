"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { BEATS, seg } from "./timeline";
import { useIntroClock } from "./Scene";

/**
 * Background plane: cyan grid + traveling scanline, radial falloff so it
 * vignettes into the brand navy. Single quad, alpha discarded early —
 * the one custom shader of the scene.
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
  uniform float uOpacity;
  uniform float uEvolve;
  varying vec2 vUv;

  float gridLine(float coord, float density) {
    float g = abs(fract(coord * density) - 0.5);
    return smoothstep(0.48, 0.5, g);
  }

  void main() {
    vec2 uv = vUv;

    // First scroll: the field activates — denser grid, slightly brighter,
    // wider falloff. The territory wakes up as you enter it.
    float dx = mix(24.0, 44.0, uEvolve);
    float dy = mix(14.0, 26.0, uEvolve);
    float grid = max(gridLine(uv.x, dx), gridLine(uv.y, dy)) * mix(0.09, 0.13, uEvolve);

    // traveling scanline band — ambient, barely there
    float scanPos = fract(uTime * 0.05);
    float scan = smoothstep(0.06, 0.0, abs(uv.y - scanPos)) * 0.06;

    // radial falloff — vignette into the navy background
    float d = distance(uv, vec2(0.5, 0.52));
    float falloff = smoothstep(mix(0.75, 0.95, uEvolve), 0.15, d);

    float a = (grid + scan) * falloff * uOpacity;
    if (a < 0.004) discard;

    gl_FragColor = vec4(vec3(0.0, 0.83, 0.83), a);
  }
`;

export default function GridScan() {
  const clock = useIntroClock();
  const mat = useRef<THREE.ShaderMaterial>(null!);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uOpacity: { value: 0 },
      uEvolve: { value: 0 },
    }),
    [],
  );

  useFrame(() => {
    const t = clock.t;
    mat.current.uniforms.uTime.value = t;
    mat.current.uniforms.uOpacity.value = seg(t, BEATS.atmosphereIn);
    mat.current.uniforms.uEvolve.value = clock.scroll;
  });

  return (
    <mesh position={[0, 0, -7]}>
      <planeGeometry args={[42, 24]} />
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
