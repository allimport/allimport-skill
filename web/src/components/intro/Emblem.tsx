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

export default function Emblem() {
  const clock = useIntroClock();
  const { pointer, camera, size } = useThree();
  const group = useRef<THREE.Group>(null!);
  const boltMat = useRef<THREE.MeshStandardMaterial>(null!);
  const haloMat = useRef<THREE.MeshStandardMaterial>(null!);
  const boltLight = useRef<THREE.PointLight>(null!);
  const letterMats = useRef<(THREE.MeshPhysicalMaterial | null)[]>([]);
  const drift = useRef({ x: 0, y: 0, vx: 0, vy: 0 });
  // Colour trail: the fluid's contact point WAKES THE MATERIAL where it
  // touches and the glow FOLLOWS the cursor across the geometry, leaving a
  // trail that fades from tail to head — never a uniform flash, never a
  // wave from one fixed point. TRAIL_N recent contact beads, each with its
  // own decaying amplitude, evaluated per fragment in logo-local space so
  // the energy crosses every bevel and side wall (rim term catches edges).
  const trailState = useRef({ head: 0, lx: 1e9, ly: 1e9 });
  const waveUniforms = useMemo(
    () => ({
      uTrail: {
        value: Array.from({ length: 10 }, () => new THREE.Vector2(0, 0)),
      },
      uTrailAmp: { value: new Float32Array(10) },
    }),
    [],
  );
  const injectWave = useMemo(
    () => (material: THREE.MeshPhysicalMaterial) => {
      material.onBeforeCompile = (shader) => {
        shader.uniforms.uTrail = waveUniforms.uTrail;
        shader.uniforms.uTrailAmp = waveUniforms.uTrailAmp;
        shader.vertexShader = shader.vertexShader
          .replace(
            "#include <common>",
            "#include <common>\nvarying vec3 vLogoPos;",
          )
          .replace(
            "#include <begin_vertex>",
            "#include <begin_vertex>\nvLogoPos = position;",
          );
        shader.fragmentShader = shader.fragmentShader
          .replace(
            "#include <common>",
            `#include <common>
             varying vec3 vLogoPos;
             uniform vec2 uTrail[10];
             uniform float uTrailAmp[10];`,
          )
          .replace(
            "#include <emissivemap_fragment>",
            `#include <emissivemap_fragment>
             {
               float act = 0.0;
               for (int i = 0; i < 10; i++) {
                 float a = uTrailAmp[i];
                 if (a <= 0.0) continue;
                 float d = distance(vLogoPos.xy, uTrail[i]);
                 // Each contact bead is a pulse of energy INSIDE the
                 // material: a bright core at the impact point plus a
                 // front that expands outward across the surface as the
                 // bead ages, then everything fades back to the original.
                 float age = 1.0 - a;
                 // FAST front: the impact point itself sits under the
                 // opaque ink mass, so the wave must ESCAPE it quickly —
                 // it crosses the whole wordmark in about a second and is
                 // read on the letters around and beyond the fluid.
                 float front = age * 7.0;
                 float ring = exp(-pow(d - front, 2.0) / 0.4) * 1.15;
                 float core = exp(-d * d / 0.4) * 0.7;
                 act += (core + ring) * a;
               }
               act = min(act, 1.6);
               // The relief still matters (bevels and side walls catch a
               // touch more), but flat faces carry the change too — the
               // reaction must read on the letter FRONTS, not only edges.
               float rimW = 1.0 - abs(normalize(normal).z);
               totalEmissiveRadiance +=
                 vec3(0.0, 0.85, 0.85) * act * (0.6 + 0.7 * rimW);
             }`,
          );
      };
    },
    [waveUniforms],
  );

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
    const tx = pointer.x * 0.12 * inter;
    const ty = pointer.y * 0.075 * inter;
    // Solid aluminum on a magnetic field: lower stiffness so acceleration
    // starts even later and lazier (never a pursuit), damping well over
    // critical (2*sqrt(1.0) = 2.0) so it only ever finishes settling.
    const K = 1.0;
    const C = 3.4;
    d.vx += (K * (tx - d.x) - C * d.vx) * dt;
    d.vy += (K * (ty - d.y) - C * d.vy) * dt;
    d.x += d.vx * dt;
    d.y += d.vy * dt;

    // --- Colour trail (owner request): the fluid's energy WAKES THE
    // MATERIAL where it touches, and the glow FOLLOWS the cursor across
    // the geometry, laying a trail of contact beads that each fade slowly
    // back to the original material (evaluated per fragment in the injected
    // shader — bevels and side walls catch more via the rim term).
    const cam = camera as THREE.PerspectiveCamera;
    const vDist = cam.position.z;
    const vHalfH = vDist * Math.tan((cam.fov * Math.PI) / 360);
    const vHalfW = vHalfH * (size.width / size.height);
    const wx = pointer.x * vHalfW;
    const wy = pointer.y * vHalfH;
    const inside =
      Math.abs(wx) < 3.7 && wy > CENTER_Y - 0.9 && wy < CENTER_Y + 1.0;

    const amps = waveUniforms.uTrailAmp.value;
    const pts = waveUniforms.uTrail.value;
    // Pulse timing: each contact launches a wave that lives ~1.1s — the
    // front crosses the wordmark and everything returns to the original.
    const decay = dt / 1.1;
    for (let i = 0; i < amps.length; i++) {
      amps[i] = Math.max(0, amps[i] - decay);
    }
    if (inter > 0.5 && inside) {
      const st = trailState.current;
      // logo-local contact point (letters live in group-local space)
      const clx = Math.max(-3.6, Math.min(3.6, wx - group.current.position.x));
      const cly = wy - group.current.position.y;
      const moved = Math.hypot(clx - st.lx, cly - st.ly);
      // Freeze the current head as a fading trail bead and open a new one
      // once the cursor has travelled far enough; otherwise keep the head
      // glued to the cursor so the contact point tracks continuously.
      if (moved > 0.4 || st.lx > 1e8) {
        st.head = (st.head + 1) % amps.length;
        st.lx = clx;
        st.ly = cly;
      }
      pts[st.head].set(clx, cly);
      amps[st.head] = 1.0;
    }

    group.current.position.x = d.x;
    group.current.position.y = baseY + d.y;
    // Minimal momentum lean: driven by VELOCITY, not position — the logo
    // leans only while moving and always rests perfectly straight.
    group.current.rotation.y = d.vx * 0.03;
    group.current.rotation.x = -d.vy * 0.022;
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
              if (m) injectWave(m);
            }}
            // Industrial ceramic (Apple / Nothing): pure dielectric white,
            // matte front, thin sharp lacquer so the beveled EDGES catch
            // light and the grazing side walls read a touch more reflective.
            // The energy wave lives in an injected shader chunk; at rest the
            // material is byte-identical to the original.
            color="#ffffff"
            metalness={0}
            roughness={0.5}
            clearcoat={0.6}
            clearcoatRoughness={0.12}
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
