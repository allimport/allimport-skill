"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { BEATS, seg } from "./timeline";
import { useIntroClock } from "./Scene";

/**
 * Dense Void — stars for scale, nothing else.
 *
 * STATIC by direction: no drift, no rotation, no parallax. Very few
 * stars (power-law population) plus a barely-subliminal micro-dust
 * layer. They exist to give the void scale; if the eye notices them,
 * they are wrong. Only the intro fade-in and the scroll offset move.
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
  sprite,
}: {
  count: number;
  zRange: [number, number];
  spread: [number, number];
  size: number;
  maxOpacity: number;
  color: string;
  sprite: THREE.Texture;
}) {
  const clock = useIntroClock();
  const group = useRef<THREE.Group>(null!);
  const mat = useRef<THREE.PointsMaterial>(null!);

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
    // Static void: only the scroll transition displaces the field.
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
      {/* Micro-dust: barely subliminal depth */}
      <Layer
        count={Math.round(180 * m)}
        zRange={[-18, -8]}
        spread={[34, 20]}
        size={0.05}
        maxOpacity={0.07}
        color="#9aa6b6"
        sprite={sprite}
      />

      {/* Far plane: ~50 stars, power-law, static — scale only */}
      <Layer
        count={Math.round(34 * m)}
        zRange={[-30, -22]}
        spread={[60, 34]}
        size={0.14}
        maxOpacity={0.24}
        color="#cdd5df"
        sprite={sprite}
      />
      <Layer
        count={Math.round(12 * m)}
        zRange={[-28, -20]}
        spread={[58, 32]}
        size={0.3}
        maxOpacity={0.26}
        color="#e3e9f0"
        sprite={sprite}
      />
      <Layer
        count={Math.max(3, Math.round(5 * m))}
        zRange={[-26, -18]}
        spread={[54, 30]}
        size={0.55}
        maxOpacity={0.3}
        color="#f4f7fa"
        sprite={sprite}
      />
    </>
  );
}
