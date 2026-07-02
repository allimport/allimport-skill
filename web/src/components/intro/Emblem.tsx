"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { BEATS, seg, pulse, easeOutQuint, easeInOutCubic, linear } from "./timeline";
import { useIntroClock } from "./Scene";

/** Italic slant matching the wordmark (~ -12°). */
const SLANT = -0.21;

/** Emblem center height in world space. */
const CENTER_Y = 0.4;
/** Ring outer radius incl. bevel — scan travels just past both edges. */
const RING_R = 1.62;

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
  const beam = useRef<THREE.Mesh>(null!);
  const beamMat = useRef<THREE.MeshBasicMaterial>(null!);

  const ringGeo = useRingGeometry();
  const boltGeo = useBoltGeometry();

  /**
   * Scan reveal: world-space clipping plane, normal (0,-1,0) keeps y <= constant
   * visible. Constant travels from below the ring to above it — the O
   * materializes under the beam. Near-zero GPU cost.
   */
  const clipPlane = useMemo(
    () => new THREE.Plane(new THREE.Vector3(0, -1, 0), CENTER_Y - RING_R - 0.1),
    [],
  );
  const clipPlanes = useMemo(() => [clipPlane], [clipPlane]);

  useFrame(() => {
    const t = clock.t;

    // --- Scan beat: beam sweeps bottom→top, clipping plane follows it.
    const scanP = seg(t, BEATS.scan, easeInOutCubic);
    const beamY = CENTER_Y - RING_R - 0.1 + scanP * (2 * RING_R + 0.2);
    clipPlane.constant = beamY;

    const scanning = t >= BEATS.scan[0] && scanP < 1;
    ring.current.visible = t >= BEATS.scan[0];
    beam.current.visible = scanning;
    if (scanning) {
      beam.current.position.y = beamY;
      // Beam breathes: bright while moving, fades at both ends of the sweep.
      const life = seg(t, BEATS.scan, linear);
      beamMat.current.opacity = 0.9 * Math.sin(Math.PI * life);
    }

    // --- Ignition: scan verified — bolt strikes in fast (0.25s), flash, glow.
    const strikeIn = seg(t, [BEATS.ignition[0], BEATS.ignition[0] + 0.25], easeOutQuint);
    bolt.current.visible = t >= BEATS.ignition[0];
    bolt.current.position.set(2.6 * (1 - strikeIn), 3.8 * (1 - strikeIn), 0.35);
    bolt.current.scale.setScalar(0.5 + 0.5 * strikeIn);

    const hit = pulse(t, BEATS.ignition[0] + 0.22, 0.45);
    boltMat.current.emissiveIntensity = 1.4 + 6 * hit;
    flash.current.intensity = 90 * hit;

    // --- Idle: slow breathing rotation once settled — the Hero-ready loop.
    const idle = seg(t, BEATS.settle);
    group.current.rotation.y = idle * Math.sin(t * 0.5) * 0.16;
    group.current.rotation.x = idle * Math.cos(t * 0.35) * 0.05;
  });

  return (
    <>
      <group ref={group} rotation={[0, 0, SLANT]} position={[0, CENTER_Y, 0]}>
        <mesh ref={ring} geometry={ringGeo} visible={false}>
          <meshPhysicalMaterial
            color="#ffffff"
            metalness={0.15}
            roughness={0.22}
            clearcoat={0.6}
            clearcoatRoughness={0.25}
            emissive="#ffffff"
            emissiveIntensity={0.04}
            clippingPlanes={clipPlanes}
          />
        </mesh>

        <mesh ref={bolt} geometry={boltGeo} rotation={[0, 0, -0.32]} visible={false}>
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

      {/* Scan beam: the practical light of the scanner, rides the clip plane.
          World-space (outside the slanted group) so the sweep reads level. */}
      <mesh ref={beam} position={[0, CENTER_Y - RING_R, 0.6]} visible={false}>
        <planeGeometry args={[5.4, 0.05]} />
        <meshBasicMaterial
          ref={beamMat}
          color="#00d4d4"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
    </>
  );
}
