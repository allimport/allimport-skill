"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { SVGLoader } from "three/addons/loaders/SVGLoader.js";
import { BEATS, seg, pulse, easeOutCubic, easeInOutCubic } from "./timeline";
import { useIntroClock } from "./Scene";
import { fluidDye } from "./Fluid";
import { LOGO_LAYER } from "./CompositePass";
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
  depth: 0.2,
  bevelEnabled: true,
  bevelThickness: 0.03,
  bevelSize: 0.03,
  bevelSegments: 3,
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
  const boltOutlineMat = useRef<THREE.MeshBasicMaterial>(null!);

  // MATERIAL STATE CHANGE (brdf-material-state skill). The fluid does not
  // paint the logo: it charges the metal. We modify ONLY the albedo
  // (diffuseColor), BEFORE lighting, through a value-preserving colour
  // gradient map — white -> cold white -> identity cyan (#00d4d4) — gated
  // hard by the fluid dye (no fresnel, so no ring/sticker outline). Every
  // other material input (metalness/roughness/normal/clearcoat/F0) is
  // untouched, so the BRDF keeps its WHITE speculars/fresnel/clearcoat over
  // the new albedo — energized metal, not paint. dye=0 => exact white.
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
             // Energy gradient map: a colour CURVE (not a base->target lerp).
             // Ends at the exact identity cyan; value stays high so the metal
             // gains pigment instead of being coated.
             vec3 stateRamp(float e) {
               vec3 c = vec3(1.0);                                    // metal white
               c = mix(c, vec3(0.92, 0.99, 1.00), smoothstep(0.00, 0.30, e)); // cold white
               c = mix(c, vec3(0.55, 0.90, 0.93), smoothstep(0.30, 0.62, e)); // pale cyan
               c = mix(c, vec3(0.00, 0.831, 0.831), smoothstep(0.62, 1.00, e)); // #00d4d4
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
               // Hard-ish gate: the charge exists ONLY where the fluid sits,
               // born and dies with it — no halo/ring. No fresnel weighting.
               float e = smoothstep(0.20, 0.42, dyeE);
               diffuseColor.rgb = stateRamp(e);   // ALBEDO only; BRDF untouched
             }`,
          );
      };
    },
    [energyUniforms],
  );

  // CONTOUR MODE, triggered by the LIQUID itself. Both bolt materials
  // sample the live dye field at their own screen position — the very same
  // gate (smoothstep 0.20→0.42) that charges the letters cyan — so the
  // fill yields and the contour lights EXACTLY where and while the ink
  // passes over the bolt. Per-pixel, in perfect sync with the colour
  // change; cursor proximity alone does nothing.
  const DYE_GATE_GLSL = /* glsl */ `
    uniform sampler2D uDye;
    varying vec4 vEClip;
    float dyeGate() {
      vec2 suv = vEClip.xy / vEClip.w * 0.5 + 0.5;
      float d = 0.0;
      if (suv.x > 0.0 && suv.x < 1.0 && suv.y > 0.0 && suv.y < 1.0)
        d = texture2D(uDye, suv).r;
      return smoothstep(0.20, 0.42, d);
    }`;
  const injectClipUv = useMemo(
    () => (shader: THREE.WebGLProgramParametersWithUniforms) => {
      shader.uniforms.uDye = energyUniforms.uDye;
      shader.vertexShader = shader.vertexShader
        .replace("#include <common>", "#include <common>\nvarying vec4 vEClip;")
        .replace(
          "#include <project_vertex>",
          "#include <project_vertex>\nvEClip = gl_Position;",
        );
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <common>",
        `#include <common>\n${DYE_GATE_GLSL}`,
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [energyUniforms],
  );
  // Fill: goes out under the ink — opacity AND emissive together (opacity
  // alone would be cancelled by any emissive boost).
  const injectBoltFade = useMemo(
    () => (material: THREE.MeshStandardMaterial) => {
      if (material.userData.boltFade) return;
      material.userData.boltFade = true;
      material.onBeforeCompile = (shader) => {
        injectClipUv(shader);
        shader.fragmentShader = shader.fragmentShader
          .replace(
            "#include <color_fragment>",
            `#include <color_fragment>
             float boltGate = dyeGate();
             diffuseColor.a *= 1.0 - boltGate * 0.92;`,
          )
          .replace(
            "#include <emissivemap_fragment>",
            `#include <emissivemap_fragment>
             // Fresnel RIM: grazing faces (bevel, side wall) glow brighter
             // than the flat front. A glowing solid reads as 3D volume when
             // its silhouette is hotter than its face — this is what makes
             // the bolt look dimensional instead of a flat cyan sticker.
             float boltRim = pow(
               1.0 - clamp(abs(dot(normalize(normal), normalize(vViewPosition))), 0.0, 1.0),
               2.0);
             totalEmissiveRadiance += totalEmissiveRadiance * boltRim * 1.4;
             // Under the ink: fill goes dark/flat so only the contour shell
             // survives — the liquid reveals just the bolt's outline.
             totalEmissiveRadiance *= 1.0 - boltGate * 0.85;`,
          );
      };
    },
    [injectClipUv],
  );
  // Shell: exists ONLY under the ink.
  const injectShellGate = useMemo(
    () => (material: THREE.MeshBasicMaterial) => {
      if (material.userData.shellGate) return;
      material.userData.shellGate = true;
      material.onBeforeCompile = (shader) => {
        injectClipUv(shader);
        shader.fragmentShader = shader.fragmentShader.replace(
          "#include <color_fragment>",
          `#include <color_fragment>
           diffuseColor.a *= dyeGate();`,
        );
      };
    },
    [injectClipUv],
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

  // Centroid of the bolt in geometry space — the outline shell scales
  // around IT (not the group origin), so the rim grows evenly on all sides.
  const boltCenter = useMemo(() => {
    boltGeo.computeBoundingBox();
    const c = new THREE.Vector3();
    boltGeo.boundingBox!.getCenter(c);
    return c;
  }, [boltGeo]);

  const haloGeo = useMemo(() => {
    const geo = new THREE.ExtrudeGeometry(shapesFromD(HALO_D), CYAN_EXTRUDE);
    geo.translate(0, 0, -CYAN_EXTRUDE.depth! / 2);
    return geo;
  }, []);

  useFrame((_, rawDt) => {
    const t = clock.t;
    const dt = Math.min(rawDt, 1 / 30);

    // Feed the live dye to the letters' albedo state ramp.
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
    // CONTOUR MODE lives in the shaders (dye-gated, per-pixel): the fill
    // fades out and the shell's contour lights up exactly where the liquid
    // covers the bolt. Here we only drive the activation ramps. The fill
    // keeps WRITING DEPTH even at low alpha, which clips the interior of
    // the inverted-hull shell — what survives is exactly the rim.
    boltMat.current.opacity = Math.max(emerged, on);
    // Bolt brightness UNCHANGED at rest (still the protagonist). Only its
    // SPILL is contained: backlight and halo washed cyan onto the O's
    // metal, so they stay pulled down — the bolt's own glow stays the same.
    boltMat.current.emissiveIntensity = 1.0 * on + over * 0.6;
    boltOutlineMat.current.opacity = on;
    haloMat.current.opacity = on;
    haloMat.current.emissiveIntensity = 0.16 * on;
    boltLight.current.intensity = 4.5 * on + 3 * over;

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
            // The energy state ramp recolours ONLY the albedo (injected
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
          LOGO_LAYER: being in RT_LOGO's mask means the composite ATTENUATES
          the ink over the bolt exactly as it does over the letters — so the
          bolt (and its dye-gated contour) always shows through the liquid
          instead of being buried under opaque white. */}
      <mesh
        geometry={boltGeo}
        position={[0, 0, -0.26]}
        ref={(m) => {
          if (m) m.layers.enable(LOGO_LAYER);
        }}
      >
        <meshPhysicalMaterial
          ref={(m) => {
            if (m) {
              boltMat.current = m;
              injectBoltFade(m);
            }
          }}
          color="#062a2a"
          emissive="#00d4d4"
          emissiveIntensity={0}
          // Glossy clearcoat like the letters: sharp speculars from the
          // scene lights ride the bevel and side wall, so the piece reads
          // as 3D volume instead of a flat glowing shape.
          roughness={0.22}
          metalness={0}
          clearcoat={0.8}
          clearcoatRoughness={0.14}
          transparent
          opacity={0}
        />
      </mesh>

      {/* Bolt CONTOUR — inverted-hull shell: the same geometry scaled 6%
          around its own centroid, back faces only, drawn after the fill.
          The fill keeps writing depth, so the shell survives only where it
          peeks past the silhouette: a clean glowing outline. Its alpha is
          dye-gated in-shader, so it exists only under the passing liquid. */}
      <mesh
        geometry={boltGeo}
        position={[
          boltCenter.x * -0.06,
          boltCenter.y * -0.06,
          -0.26 + boltCenter.z * -0.06,
        ]}
        scale={1.06}
        renderOrder={10}
        ref={(m) => {
          if (m) m.layers.enable(LOGO_LAYER);
        }}
      >
        <meshBasicMaterial
          ref={(m) => {
            if (m) {
              boltOutlineMat.current = m;
              injectShellGate(m);
            }
          }}
          color="#00eaea"
          side={THREE.BackSide}
          transparent
          opacity={0}
          depthWrite={false}
          toneMapped={false}
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
        distance={7.5}
        decay={1.8}
      />
    </group>
  );
}
