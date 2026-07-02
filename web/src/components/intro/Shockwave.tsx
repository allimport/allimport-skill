"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { BEATS, clamp01, easeOutCubic } from "./timeline";
import { useIntroClock } from "./Scene";

/**
 * Impact shockwave: a thin ring that expands and fades right after the
 * strike. Cheap: one ring geometry, scale + opacity only.
 */
export default function Shockwave() {
  const clock = useIntroClock();
  const mesh = useRef<THREE.Mesh>(null!);
  const mat = useRef<THREE.MeshBasicMaterial>(null!);

  useFrame(() => {
    const t = clock.t;
    const start = BEATS.ignition[0] + 0.22;
    const life = 1.1;
    const p = clamp01((t - start) / life);
    const active = t >= start && p < 1;

    mesh.current.visible = active;
    if (!active) return;

    const e = easeOutCubic(p);
    mesh.current.scale.setScalar(0.5 + e * 9);
    mat.current.opacity = (1 - p) * 0.65;
  });

  return (
    <mesh ref={mesh} position={[0, 0.4, 0.2]} visible={false}>
      <ringGeometry args={[0.94, 1.0, 64]} />
      <meshBasicMaterial
        ref={mat}
        color="#00d4d4"
        transparent
        opacity={0}
        side={THREE.DoubleSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}
