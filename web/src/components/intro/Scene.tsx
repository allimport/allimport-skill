"use client";

import { createContext, useContext, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import Emblem from "./Emblem";
import Particles from "./Particles";
import FluidVeil from "./FluidVeil";
import CameraRig from "./CameraRig";
import Effects from "./Effects";
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
        antialias: false,
        powerPreference: "high-performance",
      }}
      camera={{ fov: 42, near: 0.1, far: 80, position: [0, 0, 12] }}
      style={{ position: "absolute", inset: 0 }}
      aria-label="All Import"
      role="img"
    >
      {/* Deep spatial black — darker than the brand navy, a true void */}
      <color attach="background" args={["#04070c"]} />

      <ClockContext.Provider value={clock}>
        <ClockDriver
          clock={clock}
          frozen={reducedMotion}
          scrollProgress={scrollProgress}
        />

        {/* Minimal ambient bed: the black metal must live off speculars
            and, after activation, the bolt's own light. */}
        <ambientLight intensity={0.2} />
        <directionalLight position={[3, 5, 8]} intensity={1.25} color="#ffffff" />
        <directionalLight position={[-6, -2, 4]} intensity={0.45} color="#00d4d4" />

        <FluidVeil />
        <Particles mobile={mobile} />
        <Emblem />
        <CameraRig />
        {!reducedMotion && <Effects mobile={mobile} />}
      </ClockContext.Provider>
    </Canvas>
  );
}
