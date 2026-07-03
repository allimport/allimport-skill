"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SVGLoader } from "three/addons/loaders/SVGLoader.js";
import {
  BEATS,
  seg,
  pulse,
  easeOutQuint,
  easeInOutCubic,
  linear,
  clamp01,
} from "./timeline";
import { useIntroClock } from "./Scene";
import { LETTERS, BOLT_D, HALO_D, O_CENTER, O_HALF_H } from "./logo-full-paths";

/**
 * The COMPLETE All Import logo as one 3D object — every letter, the o, the
 * bolt, and the halo are real extruded geometry traced from the official
 * wordmark (see logo-full-paths.ts). No DOM text: one world, one light.
 *
 * Assembly sequence (see timeline.ts):
 *   brackets (Brackets.tsx) → bolt strike → the o forms under a short scan
 *   → remaining letters emerge from the darkness, staggered outward from
 *   the o → the whole logo gains physical depth → idle. Mouse interaction
 *   starts only once assembly is complete (settle-gated, in CameraRig).
 */

/** Logo band center height in world space. */
export const CENTER_Y = 0.3;

/** Parse a normalized `d` string into three Shapes (holes auto-resolved). */
export function shapesFromD(d: string): THREE.Shape[] {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg"><path d="${d}"/></svg>`;
  const { paths } = new SVGLoader().parse(svg);
  return paths.flatMap((p) => SVGLoader.createShapes(p));
}

const LETTER_EXTRUDE: THREE.ExtrudeGeometryOptions = {
  depth: 0.34,
  bevelEnabled: true,
  bevelThickness: 0.045,
  bevelSize: 0.045,
  bevelSegments: 3,
  curveSegments: 24,
};

const CYAN_EXTRUDE: THREE.ExtrudeGeometryOptions = {
  depth: 0.14,
  bevelEnabled: true,
  bevelThickness: 0.02,
  bevelSize: 0.02,
  bevelSegments: 2,
  curveSegments: 24,
};

const BG = new THREE.Color("#0a0f1a");
const WHITE = new THREE.Color("#ffffff");

/** Letter emergence order: distance from the o — outward ripple. */
const O_INDEX = LETTERS.findIndex((l) => l.name === "o");

export default function Emblem() {
  const clock = useIntroClock();
  const group = useRef<THREE.Group>(null!);
  const boltRef = useRef<THREE.Mesh>(null!);
  const boltMat = useRef<THREE.MeshStandardMaterial>(null!);
  const haloRef = useRef<THREE.Mesh>(null!);
  const flash = useRef<THREE.PointLight>(null!);
  const beam = useRef<THREE.Mesh>(null!);
  const beamMat = useRef<THREE.MeshBasicMaterial>(null!);
  const letterRefs = useRef<(THREE.Mesh | null)[]>([]);
  const letterMats = useRef<(THREE.MeshPhysicalMaterial | null)[]>([]);

  const letterGeos = useMemo(
    () =>
      LETTERS.map((l) => {
        const geo = new THREE.ExtrudeGeometry(shapesFromD(l.d), LETTER_EXTRUDE);
        geo.translate(0, 0, -LETTER_EXTRUDE.depth! / 2);
        return geo;
      }),
    [],
  );

  const boltGeo = useMemo(() => {
    const geo = new THREE.ExtrudeGeometry(shapesFromD(BOLT_D), CYAN_EXTRUDE);
    geo.translate(0, 0, -CYAN_EXTRUDE.depth! / 2);
    return geo;
  }, []);

  const haloGeo = useMemo(() => {
    const geo = new THREE.ExtrudeGeometry(shapesFromD(HALO_D), CYAN_EXTRUDE);
    geo.translate(0, 0, -CYAN_EXTRUDE.depth! / 2);
    return geo;
  }, []);

  /** Emergence stagger: letters ripple OUTWARD from the o (index distance,
      nearest first; ties resolve right-then-left for reading momentum). */
  const staggerOrder = useMemo(() => {
    return LETTERS.map((_, i) => i)
      .filter((i) => i !== O_INDEX)
      .sort((a, b) => {
        const da = Math.abs(a - O_INDEX);
        const db = Math.abs(b - O_INDEX);
        return da !== db ? da - db : b - a;
      })
      .reduce<Record<number, number>>((acc, letterIdx, rank) => {
        acc[letterIdx] = rank;
        return acc;
      }, {});
  }, []);

  /** Scan reveal clip plane for the o (and halo): short local sweep. */
  const clipPlane = useMemo(
    () =>
      new THREE.Plane(
        new THREE.Vector3(0, -1, 0),
        CENTER_Y + O_CENTER[1] - O_HALF_H - 0.08,
      ),
    [],
  );
  const clipPlanes = useMemo(() => [clipPlane], [clipPlane]);

  useFrame(() => {
    const t = clock.t;
    const letterCount = LETTERS.length - 1; // all but the o

    // --- Ignition: the bolt strikes to its exact place in the logo.
    const strikeIn = seg(
      t,
      [BEATS.ignition[0], BEATS.ignition[0] + 0.12],
      easeOutQuint,
    );
    boltRef.current.visible = t >= BEATS.ignition[0];
    boltRef.current.position.set(
      1.8 * (1 - strikeIn),
      3.0 * (1 - strikeIn),
      -0.26,
    );
    const hit = pulse(t, BEATS.ignition[0] + 0.1, 0.28);
    boltMat.current.emissiveIntensity = 0.85 + 6 * hit;
    flash.current.intensity = 130 * hit;

    // --- oForm: the o (and its halo) materialize under a short scan sweep.
    const oP = seg(t, BEATS.oForm, easeInOutCubic);
    const oBottom = CENTER_Y + O_CENTER[1] - O_HALF_H - 0.08;
    const beamY = oBottom + oP * (2 * O_HALF_H + 0.16);
    clipPlane.constant = beamY;
    const oMesh = letterRefs.current[O_INDEX];
    if (oMesh) oMesh.visible = t >= BEATS.oForm[0];
    haloRef.current.visible = t >= BEATS.oForm[0];
    const scanning = t >= BEATS.oForm[0] && oP < 1;
    beam.current.visible = scanning;
    if (scanning) {
      beam.current.position.y = beamY;
      beamMat.current.opacity = 0.55 * Math.sin(Math.PI * seg(t, BEATS.oForm, linear));
    }

    // --- Letters: emerge from the darkness, staggered outward from the o.
    const [la, lb] = BEATS.letters;
    const span = lb - la;
    const per = 0.5; // each letter's emergence duration
    LETTERS.forEach((l, i) => {
      if (i === O_INDEX) return;
      const mesh = letterRefs.current[i];
      const mat = letterMats.current[i];
      if (!mesh || !mat) return;
      const rank = staggerOrder[i] ?? 0;
      const start = la + (rank / Math.max(1, letterCount - 1)) * (span - per);
      const p = easeOutQuint(clamp01((t - start) / per));
      mesh.visible = p > 0;
      mesh.position.z = -2.4 * (1 - p);
      mat.color.lerpColors(BG, WHITE, p);
      mat.emissiveIntensity = 0.04 * p;
    });

    // --- Volume: the assembled logo gains physical depth.
    const vol = seg(t, BEATS.volume, easeInOutCubic);
    group.current.scale.z = 0.35 + 0.65 * vol;

    // --- Micro-settle when the o completes: mass lands.
    const settleDip = pulse(t, BEATS.oForm[1], 0.3);
    group.current.position.y = CENTER_Y - 0.03 * settleDip;

    // --- Idle: controlled breath, only once assembled.
    const idle = seg(t, BEATS.settle);
    boltMat.current.emissiveIntensity += idle * 0.1 * Math.sin(t * 1.2);
    group.current.rotation.y = idle * Math.sin(t * 0.3) * 0.04;
    group.current.rotation.x = idle * Math.cos(t * 0.22) * 0.015;
  });

  return (
    <>
      <group ref={group} position={[0, CENTER_Y, 0]}>
        {/* Every letter of "All Import" — real extruded typography */}
        {LETTERS.map((l, i) => (
          <mesh
            key={l.name}
            ref={(m) => {
              letterRefs.current[i] = m;
            }}
            geometry={letterGeos[i]}
            visible={false}
          >
            <meshPhysicalMaterial
              ref={(m) => {
                letterMats.current[i] = m;
              }}
              color={i === O_INDEX ? "#ffffff" : "#0a0f1a"}
              metalness={0.15}
              roughness={0.22}
              clearcoat={0.6}
              clearcoatRoughness={0.25}
              emissive="#ffffff"
              emissiveIntensity={i === O_INDEX ? 0.04 : 0}
              clippingPlanes={i === O_INDEX ? clipPlanes : null}
            />
          </mesh>
        ))}

        {/* Halo — the o's cyan rim, scan-revealed with it */}
        <mesh ref={haloRef} geometry={haloGeo} position={[0, 0, -0.24]} visible={false}>
          <meshStandardMaterial
            color="#00d4d4"
            emissive="#00d4d4"
            emissiveIntensity={0.55}
            roughness={0.4}
            metalness={0}
            clippingPlanes={clipPlanes}
          />
        </mesh>

        {/* Bolt — tip + tail + sliver, the signature strike */}
        <mesh ref={boltRef} geometry={boltGeo} visible={false}>
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
          position={[O_CENTER[0], O_CENTER[1] + 0.3, 2]}
          color="#7ff4f4"
          intensity={0}
          distance={12}
          decay={2}
        />
      </group>

      {/* Scan beam for the o — narrow, local, quiet */}
      <mesh
        ref={beam}
        position={[O_CENTER[0], CENTER_Y + O_CENTER[1] - O_HALF_H, 0.5]}
        visible={false}
      >
        <planeGeometry args={[1.6, 0.04]} />
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
