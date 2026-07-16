"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { SVGLoader } from "three/addons/loaders/SVGLoader.js";
import { BEATS, seg, pulse, easeOutCubic, easeInOutCubic } from "./timeline";
import { useIntroClock } from "./Scene";
import { fluidDye } from "./Fluid";
import { LOGO_LAYER, BOLT_LAYER } from "./CompositePass";
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
  const { pointer } = useThree();
  const group = useRef<THREE.Group>(null!);
  const boltMat = useRef<THREE.MeshStandardMaterial>(null!);
  const haloMat = useRef<THREE.MeshStandardMaterial>(null!);
  const boltLight = useRef<THREE.PointLight>(null!);
  const letterMats = useRef<(THREE.MeshPhysicalMaterial | null)[]>([]);
  const drift = useRef({ x: 0, y: 0, vx: 0, vy: 0 });
  // ENERGY STATE CHANGE (material, BRDF-correct). The fluid does not paint
  // the logo: it charges the metal. We modify ONLY the albedo (diffuseColor),
  // BEFORE lighting, through an energy GRADIENT MAP — white → cold white →
  // pale cyan → identity cyan → intense cyan — indexed by the fluid dye at
  // this pixel and weighted by fresnel so the charge climbs the relief.
  // metalness / roughness / normal / clearcoat / F0 are untouched, so the
  // BRDF keeps its WHITE speculars, fresnel and clearcoat over the new
  // albedo — the tell of energized metal, not paint. dye→0 returns to white.
  const energyUniforms = useMemo(
    () => ({ uDye: { value: null as THREE.Texture | null } }),
    [],
  );
  const injectEnergy = useMemo(
    () => (material: THREE.MeshPhysicalMaterial) => {
      if (material.userData.energy) return;
      material.userData.energy = true;
      material.onBeforeCompile = (shader) => {
        shader.uniforms.uDye = energyUniforms.uDye;
        shader.vertexShader = shader.vertexShader
          .replace("#include <common>", "#include <common>\nvarying vec4 vEClip;")
          .replace(
            "#include <project_vertex>",
            "#include <project_vertex>\nvEClip = gl_Position;",
          );
        shader.fragmentShader = shader.fragmentShader
          .replace(
            "#include <common>",
            `#include <common>
             uniform sampler2D uDye;
             varying vec4 vEClip;
             // Energy gradient map (a colour CURVE, not a white→cyan lerp).
             // Value stays high so the metal never darkens into a coat.
             vec3 energyRamp(float e) {
               vec3 c = vec3(1.0);                               // metal white
               c = mix(c, vec3(0.92, 0.99, 1.00), smoothstep(0.00, 0.25, e)); // cold white
               c = mix(c, vec3(0.62, 0.94, 0.97), smoothstep(0.25, 0.50, e)); // pale cyan
               c = mix(c, vec3(0.00, 0.83, 0.83), smoothstep(0.50, 0.78, e)); // identity #00d4d4
               c = mix(c, vec3(0.00, 0.93, 1.00), smoothstep(0.78, 1.00, e)); // intense cyan
               return c;
             }`,
          )
          .replace(
            "#include <normal_fragment_begin>",
            `#include <normal_fragment_begin>
             {
               vec2 suv = vEClip.xy / vEClip.w * 0.5 + 0.5;
               float dyeE = 0.0;
               if (suv.x > 0.0 && suv.x < 1.0 && suv.y > 0.0 && suv.y < 1.0)
                 dyeE = texture2D(uDye, suv).r;
               // Charge climbs the relief: a touch more where the light grazes.
               float fres = 1.0 - abs(dot(normalize(normal), normalize(vViewPosition)));
               float e = clamp(dyeE / 0.24 * (0.7 + 0.3 * fres), 0.0, 1.0);
               // Only the ALBEDO changes; the BRDF runs untouched on top.
               diffuseColor.rgb = energyRamp(e);
             }`,
          );
      };
    },
    [energyUniforms],
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

    // Feed the live dye field to the letters' energy gradient map.
    energyUniforms.uDye.value = fluidDye.tex;

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
    boltMat.current.emissiveIntensity = 2.0 * on + over * 1.1;
    haloMat.current.opacity = on;
    haloMat.current.emissiveIntensity = 0.42 * on;
    boltLight.current.intensity = 11 * on + 7 * over;

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
        <mesh
          key={l.name}
          geometry={letterGeos[i]}
          ref={(m) => {
            // Also on LOGO_LAYER so the composite's mask camera can render
            // the letters alone (still on layer 0 → main render unchanged).
            if (m) m.layers.enable(LOGO_LAYER);
          }}
        >
          <meshPhysicalMaterial
            ref={(m) => {
              letterMats.current[i] = m;
              if (m) injectEnergy(m);
            }}
            // Industrial ceramic (Apple / Nothing): pure dielectric white.
            // The energy gradient map recolours ONLY the albedo (injected
            // chunk); metalness/roughness/clearcoat/F0 stay as-is, so the
            // BRDF is byte-identical to this material at rest (dye = 0).
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

      {/* Bolt — dark until it becomes the scene's light source. Also on
          BOLT_LAYER so the composite can trace its outline in celeste where
          the fluid crosses it. */}
      <mesh
        geometry={boltGeo}
        position={[0, 0, -0.26]}
        ref={(m) => {
          if (m) m.layers.enable(BOLT_LAYER);
        }}
      >
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
