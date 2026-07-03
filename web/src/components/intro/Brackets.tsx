"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { BEATS, steps, pulse, easeInOutCubic } from "./timeline";
import { useIntroClock } from "./Scene";
import { BRACKETS } from "./logo-full-paths";
import { CENTER_Y, shapesFromD } from "./Emblem";

/**
 * The wordmark's four corner brackets — REAL traced vector contours from
 * logo-full-paths.ts, extruded. Staccato snap-in during the frame-in beat
 * (they open the assembly). Each geometry is re-centered on its own bbox
 * center so the snap pulse scales around the bracket itself.
 */

function Bracket({
  d,
  cx,
  cy,
  index,
}: {
  d: string;
  cx: number;
  cy: number;
  index: number;
}) {
  const clock = useIntroClock();
  const group = useRef<THREE.Group>(null!);
  const mat = useRef<THREE.MeshStandardMaterial>(null!);

  const geo = useMemo(() => {
    const g = new THREE.ExtrudeGeometry(shapesFromD(d), {
      depth: 0.1,
      bevelEnabled: false,
      curveSegments: 12,
    });
    g.translate(-cx, -cy, -0.05);
    return g;
  }, [d, cx, cy]);

  useFrame(() => {
    const t = clock.t;
    const fired = steps(t, BEATS.frameIn, 4) > index;
    group.current.visible = fired;
    if (!fired) return;

    const [a, b] = BEATS.frameIn;
    const landAt = a + ((index + 1) / 4) * (b - a);
    // Precision snap, not bounce: small scale kick, fast decay.
    const snap = pulse(t, landAt, 0.15);
    group.current.scale.setScalar(1 + snap * 0.12);

    // First scroll: the brackets change function — they spread toward the
    // viewport edges and advance in z, framing the incoming content instead
    // of the emblem. Chrome now, not event: emissive settles lower.
    const s = easeInOutCubic(clock.scroll);
    // Spread tuned so all four corners stay inside the frame at stage end.
    group.current.position.set(cx * (1 + 0.5 * s), cy * (1 + 0.5 * s), 1.6 * s);
    mat.current.emissiveIntensity = 0.9 + snap * 1.5 - 0.3 * s;
  });

  return (
    <group ref={group} position={[cx, cy, 0]} visible={false}>
      <mesh geometry={geo}>
        <meshStandardMaterial
          ref={mat}
          color="#00d4d4"
          emissive="#00d4d4"
          emissiveIntensity={0.9}
        />
      </mesh>
    </group>
  );
}

export default function Brackets() {
  return (
    <group position={[0, CENTER_Y, -1]}>
      {BRACKETS.map((b, i) => (
        <Bracket key={i} d={b.d} cx={b.cx} cy={b.cy} index={i} />
      ))}
    </group>
  );
}
