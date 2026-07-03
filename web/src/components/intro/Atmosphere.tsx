"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { BEATS, seg, easeInOutCubic } from "./timeline";
import { useIntroClock } from "./Scene";
import { CENTER_Y } from "./Emblem";
import { O_CENTER } from "./logo-full-paths";

/**
 * Atmospheric presence — the bolt's light occupying space.
 *
 * Not smoke, not fog, not particles: a single pre-rendered radial sprite
 * behind the logo, dark cyan, capped at 7% opacity, that wakes with the
 * bolt. It is the cue that suspends the logo INSIDE the void instead of
 * pasting it on top: the light now has volume. Nearly imperceptible —
 * its absence is what you'd notice.
 */

function useGlowSprite() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    g.addColorStop(0, "rgba(0, 212, 212, 0.9)");
    g.addColorStop(0.35, "rgba(0, 160, 170, 0.35)");
    g.addColorStop(0.7, "rgba(0, 90, 100, 0.08)");
    g.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 256);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
}

export default function Atmosphere() {
  const clock = useIntroClock();
  const mat = useRef<THREE.MeshBasicMaterial>(null!);
  const sprite = useGlowSprite();

  useFrame(() => {
    const t = clock.t;
    const on = seg(t, BEATS.boltOn, easeInOutCubic);
    mat.current.opacity = 0.07 * on;
  });

  return (
    <mesh position={[O_CENTER[0], CENTER_Y + O_CENTER[1] + 0.3, -5]}>
      <planeGeometry args={[12, 9]} />
      <meshBasicMaterial
        ref={mat}
        map={sprite}
        transparent
        opacity={0}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </mesh>
  );
}
