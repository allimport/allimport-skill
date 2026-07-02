"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { BEATS, seg, pulse, easeOutBack, easeOutQuint } from "./timeline";
import { useIntroClock } from "./Scene";

/** Italic slant matching the wordmark (~ -12°). */
const SLANT = -0.21;

/** Ring "O": flat extruded disc with a hole — the logo's O, not a torus. */
function useRingGeometry() {
  return useMemo(() => {
    const shape = new THREE.Shape();
    shape.absarc(0, 0, 1.5, 0, Math.PI * 2, false);
    const hole = new THREE.Path();
    hole.absarc(0, 0, 0.85, 0, Math.PI * 2, true);
    shape.holes.push(hole);
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.42,
      bevelEnabled: true,
      bevelThickness: 0.06,
      bevelSize: 0.06,
      bevelSegments: 3,
      curveSegments: 48,
    });
    geo.center();
    return geo;
  }, []);
}

/** Lightning bolt: single-zag polygon extruded, pierces the O diagonally. */
function useBoltGeometry() {
  return useMemo(() => {
    const pts: [number, number][] = [
      [0.05, 3.1],
      [-0.95, 0.4],
      [-0.3, 0.42],
      [-1.05, -3.1],
      [0.95, -0.2],
      [0.28, -0.22],
    ];
    const shape = new THREE.Shape(pts.map(([x, y]) => new THREE.Vector2(x, y)));
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.22,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.03,
      bevelSegments: 2,
    });
    geo.center();
    return geo;
  }, []);
}

export default function Emblem() {
  const clock = useIntroClock();
  const group = useRef<THREE.Group>(null!);
  const ring = useRef<THREE.Mesh>(null!);
  const bolt = useRef<THREE.Mesh>(null!);
  const boltMat = useRef<THREE.MeshStandardMaterial>(null!);
  const flash = useRef<THREE.PointLight>(null!);

  const ringGeo = useRingGeometry();
  const boltGeo = useBoltGeometry();

  useFrame(() => {
    const t = clock.t;

    // Bolt streaks in along its own diagonal, then locks in place.
    const streak = seg(t, BEATS.boltStreak, easeOutQuint);
    bolt.current.position.set(3.5 * (1 - streak), 5 * (1 - streak), 0.35);
    bolt.current.scale.setScalar(0.4 + 0.6 * streak);
    bolt.current.visible = t >= BEATS.boltStreak[0];

    // Strike: bolt emissive spikes then settles to a live glow.
    const hit = pulse(t, BEATS.strike[0], 0.45);
    boltMat.current.emissiveIntensity = 1.4 + 6 * hit;
    flash.current.intensity = 90 * hit;

    // Ring materializes on impact with a back-ease pop.
    const born = seg(t, BEATS.strike, easeOutBack);
    ring.current.scale.setScalar(Math.max(0.001, born));
    ring.current.visible = t >= BEATS.strike[0];

    // Idle: slow breathing rotation once settled — the Hero-ready loop.
    const idle = seg(t, BEATS.settle);
    group.current.rotation.y = idle * Math.sin(t * 0.5) * 0.16;
    group.current.rotation.x = idle * Math.cos(t * 0.35) * 0.05;
  });

  return (
    <group ref={group} rotation={[0, 0, SLANT]} position={[0, 0.4, 0]}>
      <mesh ref={ring} geometry={ringGeo}>
        <meshPhysicalMaterial
          color="#ffffff"
          metalness={0.15}
          roughness={0.22}
          clearcoat={0.6}
          clearcoatRoughness={0.25}
          emissive="#ffffff"
          emissiveIntensity={0.04}
        />
      </mesh>

      <mesh ref={bolt} geometry={boltGeo} rotation={[0, 0, -0.32]}>
        <meshStandardMaterial
          ref={boltMat}
          color="#00d4d4"
          emissive="#00d4d4"
          emissiveIntensity={1.4}
          roughness={0.3}
          metalness={0}
        />
      </mesh>

      <pointLight
        ref={flash}
        position={[0.4, 0.6, 2.2]}
        color="#7ff4f4"
        intensity={0}
        distance={14}
        decay={2}
      />
    </group>
  );
}
