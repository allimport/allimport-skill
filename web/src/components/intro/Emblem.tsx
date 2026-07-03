"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SVGLoader } from "three/addons/loaders/SVGLoader.js";
import { BEATS, seg, pulse, easeOutQuint, linear } from "./timeline";
import { useIntroClock } from "./Scene";
import {
  RING_D,
  BOLT_TIP_D,
  BOLT_TAIL_D,
  BOLT_SLIVER_D,
  HALO_D,
} from "./logo-paths";

/**
 * Exact 3D build of the official All Import isotype.
 *
 * Geometry comes from logo-paths.ts — REAL vector paths (potrace output)
 * with MANUAL, developer-pinned semantics. Three meshes by meaning:
 *
 *   1. White O ring — outer contour + italic hole, extruded.
 *   2. Halo         — the cyan rim hugging the O. Belongs to the O's look,
 *                     so it reveals WITH the ring during the scan.
 *   3. Bolt         — tip + tail + sliver as one striking piece; it's the
 *                     element that arrives at ignition.
 *
 * Only extrusion, PBR materials, light and animation. No reinterpretation.
 */

/** Emblem center height in world space. */
export const CENTER_Y = 0.4;
/** Outer O radius (1.5 by normalization) + bevel margin — scan range. */
const RING_R = 1.62;

/** Parse a normalized `d` string into three Shapes (holes auto-resolved). */
export function shapesFromD(d: string): THREE.Shape[] {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg"><path d="${d}"/></svg>`;
  const { paths } = new SVGLoader().parse(svg);
  return paths.flatMap((p) => SVGLoader.createShapes(p));
}

function useRingGeometry() {
  return useMemo(() => {
    const geo = new THREE.ExtrudeGeometry(shapesFromD(RING_D), {
      depth: 0.42,
      bevelEnabled: true,
      bevelThickness: 0.06,
      bevelSize: 0.06,
      bevelSegments: 3,
      curveSegments: 24,
    });
    geo.translate(0, 0, -0.21); // center depth only — x/y are true logo coords
    return geo;
  }, []);
}

const CYAN_EXTRUDE: THREE.ExtrudeGeometryOptions = {
  depth: 0.16,
  bevelEnabled: true,
  bevelThickness: 0.02,
  bevelSize: 0.02,
  bevelSegments: 2,
  curveSegments: 24,
};

/** Bolt = tip + tail + sliver, one striking piece (manual semantics). */
function useBoltGeometry() {
  return useMemo(() => {
    const shapes = [
      ...shapesFromD(BOLT_TIP_D),
      ...shapesFromD(BOLT_TAIL_D),
      ...shapesFromD(BOLT_SLIVER_D),
    ];
    const geo = new THREE.ExtrudeGeometry(shapes, CYAN_EXTRUDE);
    geo.translate(0, 0, -0.08);
    return geo;
  }, []);
}

/** Halo = the O's cyan rim; reveals with the ring during the scan. */
function useHaloGeometry() {
  return useMemo(() => {
    const geo = new THREE.ExtrudeGeometry(shapesFromD(HALO_D), CYAN_EXTRUDE);
    geo.translate(0, 0, -0.08);
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
  const boltGeo = useBoltGeometry();
  const haloGeo = useHaloGeometry();

  /** Scan reveal: world-space clipping plane rides the beam (ring only). */
  const clipPlane = useMemo(
    () => new THREE.Plane(new THREE.Vector3(0, -1, 0), CENTER_Y - RING_R - 0.1),
    [],
  );
  const clipPlanes = useMemo(() => [clipPlane], [clipPlane]);

  useFrame(() => {
    const t = clock.t;

    // --- Scan: LINEAR sweep — constant speed reads as instrument precision.
    const scanP = seg(t, BEATS.scan, linear);
    const beamY = CENTER_Y - RING_R - 0.1 + scanP * (2 * RING_R + 0.2);
    clipPlane.constant = beamY;

    const scanning = t >= BEATS.scan[0] && scanP < 1;
    ring.current.visible = t >= BEATS.scan[0];
    halo.current.visible = t >= BEATS.scan[0];
    beam.current.visible = scanning;
    if (scanning) {
      beam.current.position.y = beamY;
      // Quiet mechanism, not protagonist: capped at 0.55.
      beamMat.current.opacity = 0.55 * Math.sin(Math.PI * scanP);
    }

    // --- Physical weight: the O micro-settles the instant the scan
    // completes — a 35mm drop with exponential recovery reads as mass.
    const settleDip = pulse(t, BEATS.scan[1], 0.3);
    group.current.position.y = CENTER_Y - 0.035 * settleDip;

    // --- Ignition (after 250ms of silence): the signature. 120ms strike —
    // lightning is instant; anything slower is "an animation of lightning".
    const strikeIn = seg(
      t,
      [BEATS.ignition[0], BEATS.ignition[0] + 0.12],
      easeOutQuint,
    );
    bolt.current.visible = t >= BEATS.ignition[0];
    bolt.current.position.set(
      2.2 * (1 - strikeIn),
      3.6 * (1 - strikeIn),
      -0.3,
    );

    // Hard, short flash: high peak, fast decay — no bloom smear.
    const hit = pulse(t, BEATS.ignition[0] + 0.1, 0.28);
    flash.current.intensity = 140 * hit;

    // --- Idle: controlled presence. ±10% slow emissive breath on the bolt;
    // rotation capped at ~3° — alive, but dominated. Base emissive kept low
    // so the bolt reads as a lit OBJECT, not a flat glow sticker.
    const idle = seg(t, BEATS.settle);
    boltMat.current.emissiveIntensity =
      0.85 + 6 * hit + idle * 0.1 * Math.sin(t * 1.2);
    group.current.rotation.y = idle * Math.sin(t * 0.3) * 0.05;
    group.current.rotation.x = idle * Math.cos(t * 0.22) * 0.02;
  });

  return (
    <>
      <group ref={group} position={[0, CENTER_Y, 0]}>
        {/* White O ring — traced outer contour + italic hole */}
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

        {/* Halo — the O's cyan rim, scan-revealed with the ring */}
        <mesh ref={halo} geometry={haloGeo} position={[0, 0, -0.3]} visible={false}>
          <meshStandardMaterial
            color="#00d4d4"
            emissive="#00d4d4"
            emissiveIntensity={0.55}
            roughness={0.4}
            metalness={0}
            clippingPlanes={clipPlanes}
          />
        </mesh>

        {/* Bolt — tip + tail + sliver, strikes in at ignition */}
        <mesh ref={bolt} geometry={boltGeo} visible={false}>
          <meshStandardMaterial
            ref={boltMat}
            color="#00d4d4"
            emissive="#00d4d4"
            emissiveIntensity={0.85}
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
