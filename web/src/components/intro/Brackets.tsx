"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { BEATS, steps, pulse } from "./timeline";
import { useIntroClock } from "./Scene";

/**
 * Four HUD corner brackets, snapping in one by one (staccato) during the
 * frame-in beat — the logo's viewfinder frame, rebuilt in depth.
 */

/**
 * Frame traced from the official isotype: ±3.55 x ±2.55 around the emblem
 * center, arm 0.75, thickness 0.09 (150px / 18px at 1px = 0.005 units).
 * Positioned relative to the emblem's world center (y = 0.4).
 */
const CORNERS: Array<{ pos: [number, number, number]; flip: [number, number] }> = [
  { pos: [-3.55, 2.95, -1], flip: [1, 1] },
  { pos: [3.55, 2.95, -1], flip: [-1, 1] },
  { pos: [-3.55, -2.15, -1], flip: [1, -1] },
  { pos: [3.55, -2.15, -1], flip: [-1, -1] },
];

const ARM = 0.75;
const THICK = 0.09;

function Bracket({
  pos,
  flip,
  index,
}: {
  pos: [number, number, number];
  flip: [number, number];
  index: number;
}) {
  const clock = useIntroClock();
  const group = useRef<THREE.Group>(null!);
  const mat = useRef<THREE.MeshStandardMaterial>(null!);

  useFrame(() => {
    const t = clock.t;
    const fired = steps(t, BEATS.frameIn, 4) > index;
    group.current.visible = fired;
    if (!fired) return;

    // Snap pulse right when this bracket lands.
    const [a, b] = BEATS.frameIn;
    const landAt = a + ((index + 1) / 4) * (b - a);
    const snap = pulse(t, landAt, 0.25);
    group.current.scale.setScalar(1 + snap * 0.28);
    mat.current.emissiveIntensity = 1.1 + snap * 3;
  });

  return (
    <group ref={group} position={pos} visible={false}>
      {/* horizontal arm */}
      <mesh position={[(flip[0] * ARM) / 2, 0, 0]}>
        <boxGeometry args={[ARM, THICK, THICK]} />
        <meshStandardMaterial
          ref={mat}
          color="#00d4d4"
          emissive="#00d4d4"
          emissiveIntensity={1.1}
        />
      </mesh>
      {/* vertical arm (shares material via second mesh, cheap) */}
      <mesh position={[0, (-flip[1] * ARM) / 2, 0]}>
        <boxGeometry args={[THICK, ARM, THICK]} />
        <meshStandardMaterial
          color="#00d4d4"
          emissive="#00d4d4"
          emissiveIntensity={1.1}
        />
      </mesh>
    </group>
  );
}

export default function Brackets() {
  return (
    <group>
      {CORNERS.map((c, i) => (
        <Bracket key={i} pos={c.pos} flip={c.flip} index={i} />
      ))}
    </group>
  );
}
