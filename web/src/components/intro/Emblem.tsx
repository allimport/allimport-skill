"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  BEATS,
  seg,
  pulse,
  easeOutQuint,
  easeInOutCubic,
  linear,
} from "./timeline";
import { useIntroClock } from "./Scene";

/**
 * Exact 3D reconstruction of the official All Import isotype.
 *
 * Geometry is traced from the brand asset (1:1 isotype), measured in pixels
 * and converted at 1px = 0.005 units (outer O radius 300px = 1.5 units).
 * Four parts, matching the original artwork's actual layers:
 *
 *   1. White O ring    — circular outside, ELLIPTICAL italic hole (0.72 x
 *                        0.55, rotated -30°). The italic lives in the hole;
 *                        the outer contour is a true circle.
 *   2. Cyan halo O     — duplicate ring offset down-left behind the white
 *                        one: the cyan rim visible in the original.
 *   3. Lightning bolt  — 8-vertex polygon with the original's DOUBLE tip
 *                        top-right and long tail exiting bottom-left. Sits
 *                        behind the ring; reads through the hole exactly as
 *                        in the flat logo.
 *   4. Corner brackets — see Brackets.tsx (frame ±3.55 x ±2.55).
 *
 * No stylization: extrusion, PBR materials, light and animation only.
 */

/** Emblem center height in world space. */
const CENTER_Y = 0.4;
/** Ring outer radius incl. bevel — scan travels just past both edges. */
const RING_R = 1.62;

/** Hole: italic ellipse traced from the asset (145 x 110 px, ~ -30°). */
const HOLE_RX = 0.72;
const HOLE_RY = 0.55;
const HOLE_ROT = -0.52;

function useRingGeometry() {
  return useMemo(() => {
    const shape = new THREE.Shape();
    shape.absarc(0, 0, 1.5, 0, Math.PI * 2, false);
    const hole = new THREE.Path();
    hole.absellipse(0, 0, HOLE_RX, HOLE_RY, 0, Math.PI * 2, true, HOLE_ROT);
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

/** Halo: same contour, thinner extrusion — the cyan offset rim. */
function useHaloGeometry() {
  return useMemo(() => {
    const shape = new THREE.Shape();
    shape.absarc(0, 0, 1.5, 0, Math.PI * 2, false);
    const hole = new THREE.Path();
    hole.absellipse(0, 0, HOLE_RX, HOLE_RY, 0, Math.PI * 2, true, HOLE_ROT);
    shape.holes.push(hole);
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.12,
      bevelEnabled: false,
      curveSegments: 48,
    });
    geo.center();
    return geo;
  }, []);
}

/**
 * Bolt: exact silhouette traced from the asset. Double tip top-right
 * (apexes at (1.63, 3.15) and (1.58, 1.58)), long tail to (-2.18, -3.08).
 * Vertex order A→H, counter-clockwise, no self-intersection.
 */
const BOLT_PTS: [number, number][] = [
  [1.63, 3.15], // A — main tip apex
  [0.05, 0.95], // B — main spike left edge at ring
  [-0.85, -1.15], // C — left edge descending
  [-2.18, -3.08], // D — tail apex
  [-0.6, -1.45], // E — tail right edge
  [0.55, 0.55], // F — right edge behind ring
  [1.58, 1.58], // G — second tip apex (the original's double tip)
  [0.62, 1.02], // H — notch between the two tips
];

function useBoltGeometry() {
  return useMemo(() => {
    const shape = new THREE.Shape(
      BOLT_PTS.map(([x, y]) => new THREE.Vector2(x, y)),
    );
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.22,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.03,
      bevelSegments: 2,
    });
    // Center only on z: x/y positions are true logo coordinates.
    geo.translate(0, 0, -0.11);
    return geo;
  }, []);
}

export default function Emblem() {
  const clock = useIntroClock();
  const group = useRef<THREE.Group>(null!);
  const ring = useRef<THREE.Mesh>(null!);
  const halo = useRef<THREE.Mesh>(null!);
  const bolt = useRef<THREE.Mesh>(null!);
  const boltMat = useRef<THREE.MeshStandardMaterial>(null!);
  const flash = useRef<THREE.PointLight>(null!);
  const beam = useRef<THREE.Mesh>(null!);
  const beamMat = useRef<THREE.MeshBasicMaterial>(null!);

  const ringGeo = useRingGeometry();
  const haloGeo = useHaloGeometry();
  const boltGeo = useBoltGeometry();

  /**
   * Scan reveal: world-space clipping plane, normal (0,-1,0) keeps
   * y <= constant visible. Applies to ring AND halo so the full logo
   * materializes together under the beam.
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
    const revealed = t >= BEATS.scan[0];
    ring.current.visible = revealed;
    halo.current.visible = revealed;
    beam.current.visible = scanning;
    if (scanning) {
      beam.current.position.y = beamY;
      const life = seg(t, BEATS.scan, linear);
      beamMat.current.opacity = 0.9 * Math.sin(Math.PI * life);
    }

    // --- Ignition: scan verified — bolt strikes in along its own diagonal.
    const strikeIn = seg(
      t,
      [BEATS.ignition[0], BEATS.ignition[0] + 0.25],
      easeOutQuint,
    );
    bolt.current.visible = t >= BEATS.ignition[0];
    // Entry vector = the bolt's own axis (tip→tail direction, reversed).
    bolt.current.position.set(
      2.2 * (1 - strikeIn),
      3.6 * (1 - strikeIn),
      -0.28,
    );
    bolt.current.scale.setScalar(0.6 + 0.4 * strikeIn);

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
      <group ref={group} position={[0, CENTER_Y, 0]}>
        {/* 1 — white O ring (front) */}
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

        {/* 2 — cyan halo O, offset down-left behind (the original's rim) */}
        <mesh
          ref={halo}
          geometry={haloGeo}
          position={[-0.09, -0.09, -0.24]}
          visible={false}
        >
          <meshStandardMaterial
            color="#00d4d4"
            emissive="#00d4d4"
            emissiveIntensity={1.2}
            roughness={0.4}
            metalness={0}
            clippingPlanes={clipPlanes}
          />
        </mesh>

        {/* 3 — bolt behind the ring, reads through the italic hole */}
        <mesh ref={bolt} geometry={boltGeo} visible={false}>
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

      {/* Scan beam: the scanner's practical light, rides the clip plane. */}
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
