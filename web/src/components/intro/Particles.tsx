"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { BEATS, seg } from "./timeline";
import { useIntroClock } from "./Scene";

/**
 * Stars — scale only. Very few, completely still.
 *
 * Distribution is NATURAL, not statistical: positions are rejection-
 * sampled against a low-frequency noise mask, producing organic clusters
 * and large, fully empty regions — composition instead of fill. No
 * micro-dust, no drift, no rotation, no parallax. Only the intro fade-in
 * and the scroll transition displace anything.
 */

function hash2(x: number, y: number) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

/** Low-frequency value noise for the void mask. */
function vnoise(x: number, y: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const a = hash2(xi, yi);
  const b = hash2(xi + 1, yi);
  const c = hash2(xi, yi + 1);
  const d = hash2(xi + 1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

/** Sample star positions inside noise clusters; big zones stay empty. */
function sampleClustered(
  count: number,
  spread: [number, number],
  zRange: [number, number],
  seed: number,
) {
  const arr = new Float32Array(count * 3);
  let placed = 0;
  let guard = 0;
  while (placed < count && guard < count * 60) {
    guard++;
    const x = (Math.random() - 0.5) * spread[0];
    const y = (Math.random() - 0.5) * spread[1];
    const m = vnoise(x * 0.14 + seed, y * 0.14 + seed * 1.7);
    if (m < 0.56) continue; // inside a void — reject
    arr[placed * 3] = x;
    arr[placed * 3 + 1] = y;
    arr[placed * 3 + 2] = zRange[0] + Math.random() * (zRange[1] - zRange[0]);
    placed++;
  }
  return arr.slice(0, placed * 3);
}

function useSoftSprite() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.4, "rgba(255,255,255,0.55)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
}

function Layer({
  count,
  zRange,
  spread,
  size,
  maxOpacity,
  color,
  seed,
  sprite,
}: {
  count: number;
  zRange: [number, number];
  spread: [number, number];
  size: number;
  maxOpacity: number;
  color: string;
  seed: number;
  sprite: THREE.Texture;
}) {
  const clock = useIntroClock();
  const group = useRef<THREE.Group>(null!);
  const mat = useRef<THREE.PointsMaterial>(null!);

  const positions = useMemo(
    () => sampleClustered(count, spread, zRange, seed),
    [count, spread, zRange, seed],
  );

  useFrame(() => {
    const t = clock.t;
    group.current.position.y = -1.5 * clock.scroll;
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
          color={color}
          size={size}
          sizeAttenuation
          map={sprite}
          transparent
          opacity={0}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export default function Particles({ mobile }: { mobile: boolean }) {
  const sprite = useSoftSprite();
  const m = mobile ? 0.6 : 1;

  return (
    <>
      <Layer
        count={Math.round(34 * m)}
        zRange={[-30, -22]}
        spread={[60, 34]}
        size={0.14}
        maxOpacity={0.24}
        color="#cdd5df"
        seed={3.1}
        sprite={sprite}
      />
      <Layer
        count={Math.round(12 * m)}
        zRange={[-28, -20]}
        spread={[58, 32]}
        size={0.3}
        maxOpacity={0.26}
        color="#e3e9f0"
        seed={11.7}
        sprite={sprite}
      />
      <Layer
        count={Math.max(3, Math.round(5 * m))}
        zRange={[-26, -18]}
        spread={[54, 30]}
        size={0.42}
        maxOpacity={0.28}
        color="#f4f7fa"
        seed={27.3}
        sprite={sprite}
      />
    </>
  );
}
