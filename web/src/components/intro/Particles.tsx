"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { BEATS, seg } from "./timeline";
import { useIntroClock } from "./Scene";

/**
 * Ambient particle field. One static buffer, drift comes from rotating the
 * whole group — zero per-particle CPU work per frame.
 */
export default function Particles({ count = 1200 }: { count?: number }) {
  const clock = useIntroClock();
  const group = useRef<THREE.Group>(null!);
  const mat = useRef<THREE.PointsMaterial>(null!);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 26;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12 - 3;
    }
    return arr;
  }, [count]);

  useFrame((_, dt) => {
    const t = clock.t;
    group.current.rotation.y += dt * 0.02;
    group.current.rotation.x += dt * 0.005;
    mat.current.opacity = 0.32 * seg(t, BEATS.atmosphereIn);
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          ref={mat}
          color="#00d4d4"
          size={0.035}
          sizeAttenuation
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
