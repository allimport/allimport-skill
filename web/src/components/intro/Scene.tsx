"use client";

import { createContext, useContext, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import Emblem from "./Emblem";
import Particles from "./Particles";
import Atmosphere from "./Atmosphere";
import Fluid from "./Fluid";
import DepthField from "./DepthField";
import CameraRig from "./CameraRig";
import Effects from "./Effects";
import CompositePass, { LOGO_LAYER } from "./CompositePass";
import TouchDrive from "./TouchDrive";
import { BEATS, INTRO_DURATION, seg } from "./timeline";

/**
 * The void. One scene, one protagonist: the complete 3D logo.
 * No grid, no HUD, no frames — spatial black, a galaxy field, a dark
 * fluid veil, and the logo lit by its own bolt.
 */

export interface IntroClock {
  t: number;
  scroll: number;
}

const ClockContext = createContext<IntroClock | null>(null);

export function useIntroClock(): IntroClock {
  const clock = useContext(ClockContext);
  if (!clock) throw new Error("useIntroClock outside <Scene>");
  return clock;
}

function ClockDriver({
  clock,
  frozen,
  scrollProgress,
}: {
  clock: IntroClock;
  frozen: boolean;
  scrollProgress: { v: number };
}) {
  useFrame((_, dt) => {
    if (!frozen) clock.t += dt;
    // Scroll input, gated by assembly: 0 until the logo has settled, so
    // early scrolling cannot disturb the sequence — by construction.
    clock.scroll = scrollProgress.v * seg(clock.t, BEATS.settle);
  });

  return null;
}

export default function Scene({
  reducedMotion,
  mobile,
  scrollProgress,
}: {
  reducedMotion: boolean;
  mobile: boolean;
  scrollProgress: { v: number };
}) {
  const clock = useMemo<IntroClock>(
    () => ({ t: reducedMotion ? INTRO_DURATION + 10 : 0, scroll: 0 }),
    [reducedMotion],
  );

  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
      }}
      camera={{ fov: 28, near: 0.1, far: 120, position: [0, 0, 18] }}
      style={{ position: "absolute", inset: 0 }}
      aria-label="All Import"
      role="img"
    >
      {/* Deep spatial black — darker than the brand navy, a true void */}
      {/* Deep Field: near-absolute black. Fog is the EXACT background
          color so distance fades honestly — no artificial haze tint. */}
      <color attach="background" args={["#010508"]} />
      <fog attach="fog" args={["#010508", 28, 65]} />

      <ClockContext.Provider value={clock}>
        {/* Only addition over the original hero: feeds the shared pointer
            from window touches so the original interaction also answers
            the finger (pointercancel kills R3F's own stream on mobile). */}
        <TouchDrive />
        <ClockDriver
          clock={clock}
          frozen={reducedMotion}
          scrollProgress={scrollProgress}
        />

        {/* Minimal ambient bed: the black metal must live off speculars
            and, after activation, the bolt's own light. The scene lights
            also opt into LOGO_LAYER (2) so the composite's mask render of
            the logo is lit the same as the main view — main render (layer
            0) is unchanged since these lights keep layer 0. */}
        <ambientLight
          intensity={0.25}
          ref={(l) => l && l.layers.enable(LOGO_LAYER)}
        />
        <directionalLight
          position={[3, 5, 8]}
          intensity={1.5}
          color="#ffffff"
          ref={(l) => l && l.layers.enable(LOGO_LAYER)}
        />
        <directionalLight
          position={[-6, -2, 4]}
          intensity={0.22}
          color="#00d4d4"
          ref={(l) => l && l.layers.enable(LOGO_LAYER)}
        />

        <DepthField />
        <Particles mobile={mobile} />
        <Atmosphere />
        <Fluid />
        <Emblem />
        <CompositePass manualRender={reducedMotion} />
        <CameraRig />
        {!reducedMotion && <Effects mobile={mobile} />}
      </ClockContext.Provider>
    </Canvas>
  );
}
