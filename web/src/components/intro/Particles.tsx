"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { BEATS, seg } from "./timeline";
import { useIntroClock } from "./Scene";

/**
 * Deep Field — the cinematic background system.
 *
 * Four principles: black dominates; microparticles give depth without
 * drawing attention; the far plane holds VERY FEW stars in a power-law
 * population (many faint, few bright) with photographic soft sprites;
 * ambient motion is a sinusoidal drift so slow the space feels alive
 * without ever reading as "an animation". No additive glow, no field
 * rotation, no cyan — nothing that remembers a tech demo.
 */

/** Soft round sprite (pre-rendered canvas texture — kills square points). */
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
  parallax,
  driftAmp,
  driftFreq,
  sprite,
}: {
  count: number;
  zRange: [number, number];
  spread: [number, number];
  size: number;
  maxOpacity: number;
  color: string;
  parallax: number;
  driftAmp: number;
  driftFreq: number;
  sprite: THREE.Texture;
}) {
  const clock = useIntroClock();
  const { pointer } = useThree();
  const group = useRef<THREE.Group>(null!);
  const mat = useRef<THREE.PointsMaterial>(null!);
  const sway = useRef({ x: 0, y: 0 });

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * spread[0];
      arr[i * 3 + 1] = (Math.random() - 0.5) * spread[1];
      arr[i * 3 + 2] = zRange[0] + Math.random() * (zRange[1] - zRange[0]);
    }
    return arr;
  }, [count, spread, zRange]);

  useFrame(() => {
    const t = clock.t;

    // Existing depth parallax (assembly-gated), unchanged behavior.
    const inter = seg(t, BEATS.settle);
    sway.current.x += (-pointer.x * parallax * inter - sway.current.x) * 0.04;
    sway.current.y +=
      (-pointer.y * parallax * 0.6 * inter - sway.current.y) * 0.04;

    // Ambient life: imperceptible sinusoidal drift (~60s period).
    const dx = Math.sin(t * driftFreq) * driftAmp;
    const dy = Math.cos(t * driftFreq * 0.7) * driftAmp * 0.6;

    group.current.position.x = sway.current.x + dx;
    group.current.position.y = sway.current.y + dy - 1.5 * clock.scroll;

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
  const m = mobile ? 0.5 : 1;

  return (
    <>
      {/* Layer 2 — microparticles: depth, never attention */}
      <Layer
        count={Math.round(600 * m)}
        zRange={[-18, -8]}
        spread={[34, 20]}
        size={0.05}
        maxOpacity={0.12}
        color="#9aa6b6"
        parallax={0.35}
        driftAmp={0.05}
        driftFreq={0.1}
        sprite={sprite}
      />

      {/* Layer 3 — far plane, power-law star population */}
      <Layer
        count={Math.round(60 * m)}
        zRange={[-30, -22]}
        spread={[60, 34]}
        size={0.14}
        maxOpacity={0.3}
        color="#cdd5df"
        parallax={0.12}
        driftAmp={0.04}
        driftFreq={0.07}
        sprite={sprite}
      />
      <Layer
        count={Math.round(22 * m)}
        zRange={[-28, -20]}
        spread={[58, 32]}
        size={0.3}
        maxOpacity={0.32}
        color="#e3e9f0"
        parallax={0.12}
        driftAmp={0.04}
        driftFreq={0.06}
        sprite={sprite}
      />
      <Layer
        count={Math.max(4, Math.round(7 * m))}
        zRange={[-26, -18]}
        spread={[54, 30]}
        size={0.55}
        maxOpacity={0.38}
        color="#f4f7fa"
        parallax={0.12}
        driftAmp={0.03}
        driftFreq={0.05}
        sprite={sprite}
      />
    </>
  );
}
