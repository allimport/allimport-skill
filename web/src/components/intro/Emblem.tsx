"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { SVGLoader } from "three/addons/loaders/SVGLoader.js";
import { BEATS, seg, pulse, easeOutCubic, easeInOutCubic } from "./timeline";
import { useIntroClock } from "./Scene";
import { LETTERS, BOLT_D, HALO_D, O_CENTER } from "./logo-full-paths";

/**
 * The complete All Import logo — the only object in the void.
 *
 * Every letter, the bolt, and the halo are extruded geometry traced from
 * the official wordmark (logo-full-paths.ts). Letters are premium black
 * metal: they surface from darkness as a specular silhouette, then the
 * bolt ACTIVATES as the scene's only emission and lights the logo with
 * its own energy.
 *
 * Interaction (settle-gated): the mouse moves ONLY the logo — position
 * X/Y plus a subtle tilt, smoothly lerped. Nothing else is interactive.
 */

/** Logo band center height in world space. */
export const CENTER_Y = 0.15;

/** Parse a normalized `d` string into three Shapes (holes auto-resolved). */
export function shapesFromD(d: string): THREE.Shape[] {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg"><path d="${d}"/></svg>`;
  const { paths } = new SVGLoader().parse(svg);
  return paths.flatMap((p) => SVGLoader.createShapes(p));
}

const LETTER_EXTRUDE: THREE.ExtrudeGeometryOptions = {
  // Finer body, sharper lacquered edge: reads as a machined physical piece.
  depth: 0.26,
  bevelEnabled: true,
  bevelThickness: 0.055,
  bevelSize: 0.05,
  bevelSegments: 5,
  curveSegments: 32,
};

const CYAN_EXTRUDE: THREE.ExtrudeGeometryOptions = {
  depth: 0.14,
  bevelEnabled: true,
  bevelThickness: 0.02,
  bevelSize: 0.02,
  bevelSegments: 2,
  curveSegments: 24,
};

export default function Emblem() {
  const clock = useIntroClock();
  const { pointer } = useThree();
  const group = useRef<THREE.Group>(null!);
  const boltMat = useRef<THREE.MeshStandardMaterial>(null!);
  const haloMat = useRef<THREE.MeshStandardMaterial>(null!);
  const boltLight = useRef<THREE.PointLight>(null!);
  const sweepLight = useRef<THREE.PointLight>(null!);
  const letterMats = useRef<(THREE.MeshPhysicalMaterial | null)[]>([]);
  const drift = useRef({ x: 0, y: 0, vx: 0, vy: 0 });

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

  useFrame((_, rawDt) => {
    const t = clock.t;
    const dt = Math.min(rawDt, 1 / 30);

    // --- Emerge: the logo surfaces from the void. Slight per-letter phase
    // keeps it organic without reading as a letter-by-letter effect.
    LETTERS.forEach((_, i) => {
      const mat = letterMats.current[i];
      if (!mat) return;
      const phase = (i / LETTERS.length) * 0.25;
      const p = seg(t, [BEATS.emerge[0] + phase, BEATS.emerge[1]], easeOutCubic);
      mat.opacity = p;
    });
    const emerged = seg(t, BEATS.emerge, easeOutCubic);
    group.current.visible = t >= BEATS.emerge[0];
    group.current.position.z = -1.4 * (1 - emerged);

    // --- Bolt activation: the only light in the void ignites. Soft ramp
    // with a restrained overshoot — activation, not explosion.
    const on = seg(t, BEATS.boltOn, easeInOutCubic);
    const over = pulse(t, BEATS.boltOn[1], 0.35) * 0.5;
    boltMat.current.opacity = Math.max(emerged, on);
    boltMat.current.emissiveIntensity = 1.0 * on + over * 0.6;
    haloMat.current.opacity = on;
    haloMat.current.emissiveIntensity = 0.3 * on;
    boltLight.current.intensity = 8 * on + 5 * over;

    // --- Stabilize: mass lands once the light is on.
    const dip = pulse(t, BEATS.stabilize[0], 0.3);
    const baseY = CENTER_Y - 0.025 * dip;

    // --- Interaction (settle-gated): heavy mass suspended in a medium.
    // Overdamped spring — real inertia, slow elegant return, zero bounce
    // (damping 4.0 > 2*sqrt(stiffness 2.0)). Movement is never immediate:
    // the mass starts late, drifts, and settles without oscillating.
    const inter = seg(t, BEATS.settle);
    const d = drift.current;
    // The logo TURNS toward the pointer but never leaves its place (owner
    // request): the spring drives rotation only. Real inertia, slow return
    // to face straight ahead, zero bounce.
    const tx = pointer.x * 0.16 * inter; // target yaw (rad)
    const ty = pointer.y * 0.1 * inter; // target pitch (rad)
    // Heavy mass: low stiffness, damping far over critical
    // (2*sqrt(0.9) = 1.9) — slow, elegant, never nervous, never trembling.
    const K = 0.9;
    const C = 3.2;
    d.vx += (K * (tx - d.x) - C * d.vx) * dt;
    d.vy += (K * (ty - d.y) - C * d.vy) * dt;
    d.x += d.vx * dt;
    d.y += d.vy * dt;

    // Colour sweep: a soft cyan reflection glides slowly across the
    // surface, edge to edge and back — a light passing over lacquer,
    // never a hue snap. Brand cyan only.
    const sweep = seg(t, BEATS.boltOn);
    sweepLight.current.position.x = Math.sin(t * 0.16) * 3.4;
    sweepLight.current.intensity = 5.5 * sweep;

    // Anchored in place: position is the resting pose, always.
    group.current.position.x = 0;
    group.current.position.y = baseY;
    group.current.rotation.y = d.x;
    group.current.rotation.x = -d.y;
  });

  return (
    <group ref={group} position={[0, CENTER_Y, 0]} visible={false}>
      {/* Letters: brand white. The bolt's point light tints the letters
          near the o with celeste — a real light gradient across the logo. */}
      {LETTERS.map((l, i) => (
        <mesh key={l.name} geometry={letterGeos[i]}>
          <meshPhysicalMaterial
            ref={(m) => {
              letterMats.current[i] = m;
            }}
            // Industrial ceramic (Apple / Nothing): pure dielectric white,
            // matte front, thin sharp lacquer so the beveled EDGES catch
            // light and the grazing side walls read a touch more reflective.
            color="#ffffff"
            metalness={0.06}
            roughness={0.3}
            clearcoat={1}
            clearcoatRoughness={0.06}
            reflectivity={0.9}
            envMapIntensity={0.85}
            transparent
            opacity={0}
          />
        </mesh>
      ))}

      {/* Halo — wakes with the bolt */}
      <mesh geometry={haloGeo} position={[0, 0, -0.24]}>
        <meshStandardMaterial
          ref={haloMat}
          color="#00d4d4"
          emissive="#00d4d4"
          emissiveIntensity={0}
          roughness={0.4}
          metalness={0}
          transparent
          opacity={0}
        />
      </mesh>

      {/* Bolt — dark until it becomes the scene's light source */}
      <mesh geometry={boltGeo} position={[0, 0, -0.26]}>
        <meshStandardMaterial
          ref={boltMat}
          color="#062a2a"
          emissive="#00d4d4"
          emissiveIntensity={0}
          roughness={0.3}
          metalness={0}
          transparent
          opacity={0}
        />
      </mesh>

      {/* Colour sweep: cyan reflection travelling across the surface */}
      <pointLight
        ref={sweepLight}
        position={[0, CENTER_Y + 0.9, 2.6]}
        color="#00d4d4"
        intensity={0}
        distance={7.5}
        decay={2.2}
      />

      {/* The bolt's own light: BEHIND the logo, at the bolt's position —
          a backlight. Nearby letters catch cyan on their edges and the
          glow spills around them from behind, not from the front. */}
      <pointLight
        ref={boltLight}
        position={[O_CENTER[0], O_CENTER[1] + 0.4, -1.6]}
        color="#33e4e4"
        intensity={0}
        distance={11}
        decay={1.8}
      />
    </group>
  );
}
