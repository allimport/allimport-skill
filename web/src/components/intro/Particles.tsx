"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { BEATS, seg } from "./timeline";
import { useIntroClock } from "./Scene";

/**
 * Galaxy field: two instanced layers at different depths. One static
 * buffer each; drift comes from rotating the group and the mouse drives
 * an inverse parallax (opposite the logo) so depth reads physically.
 */

function Layer({
  count,
  zRange,
  size,
  maxOpacity,
  parallax,
  spin,
}: {
  count: number;
  zRange: [number, number];
  size: number;
  maxOpacity: number;
  parallax: number;
  spin: number;
}) {
  const clock = useIntroClock();
  const { pointer } = useThree();
  const group = useRef<THREE.Group>(null!);
  const mat = useRef<THREE.PointsMaterial>(null!);
  const sway = useRef({ x: 0, y: 0 });

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 2] = zRange[0] + Math.random() * (zRange[1] - zRange[0]);
    }
    return arr;
  }, [count, zRange]);

  useFrame((_, dt) => {
    const t = clock.t;
    group.current.rotation.y += dt * spin;

    // Deep parallax, only once interaction is enabled: the field moves
    // against the logo, so the void gains real depth.
    const inter = seg(t, BEATS.settle);
    sway.current.x += (-pointer.x * parallax * inter - sway.current.x) * 0.04;
    sway.current.y += (-pointer.y * parallax * 0.6 * inter - sway.current.y) * 0.04;
    group.current.position.x = sway.current.x;
    group.current.position.y = sway.current.y - 1.5 * clock.scroll;

    mat.current.opacity = maxOpacity * seg(t, BEATS.particles);
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          ref={mat}
          color="#8fcaca"
          size={size}
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

export default function Particles({ mobile }: { mobile: boolean }) {
  return (
    <>
      <Layer
        count={mobile ? 400 : 900}
        zRange={[-14, -6]}
        size={0.03}
        maxOpacity={0.22}
        parallax={0.3}
        spin={0.008}
      />
      <Layer
        count={mobile ? 150 : 350}
        zRange={[-5, -2]}
        size={0.05}
        maxOpacity={0.3}
        parallax={0.7}
        spin={0.014}
      />
    </>
  );
}
