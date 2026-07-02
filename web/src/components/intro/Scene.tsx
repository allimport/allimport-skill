"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import Emblem from "./Emblem";
import Brackets from "./Brackets";
import Particles from "./Particles";
import GridScan from "./GridScan";
import Shockwave from "./Shockwave";
import CameraRig from "./CameraRig";
import Effects from "./Effects";
import { BEATS, INTRO_DURATION } from "./timeline";

/**
 * Shared intro clock. A mutable ref object (not state) so 60fps reads never
 * re-render React. `reducedMotion` pins t past the end: the scene renders in
 * its settled Hero-ready pose with no sequence.
 */
export interface IntroClock {
  t: number;
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
  onWordmark,
}: {
  clock: IntroClock;
  frozen: boolean;
  onWordmark: () => void;
}) {
  const fired = useRef(false);

  useFrame((_, dt) => {
    if (!frozen) clock.t += dt;
    if (!fired.current && clock.t >= BEATS.wordmark[0]) {
      fired.current = true;
      onWordmark();
    }
  });

  return null;
}

export default function Scene({
  reducedMotion,
  mobile,
  onWordmark,
}: {
  reducedMotion: boolean;
  mobile: boolean;
  onWordmark: () => void;
}) {
  const clock = useMemo<IntroClock>(
    () => ({ t: reducedMotion ? INTRO_DURATION + 10 : 0 }),
    [reducedMotion],
  );

  // Reduced motion: wordmark shows immediately.
  useEffect(() => {
    if (reducedMotion) onWordmark();
  }, [reducedMotion, onWordmark]);

  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      camera={{ fov: 42, near: 0.1, far: 60, position: [0, 0, 15] }}
      style={{ position: "absolute", inset: 0 }}
    >
      <color attach="background" args={["#0a0f1a"]} />
      <fog attach="fog" args={["#0a0f1a", 18, 34]} />

      <ClockContext.Provider value={clock}>
        <ClockDriver
          clock={clock}
          frozen={reducedMotion}
          onWordmark={onWordmark}
        />

        {/* Lighting: white key + cyan rim (brand contamination on the O's edge) */}
        <ambientLight intensity={0.25} />
        <directionalLight position={[4, 6, 8]} intensity={1.6} color="#ffffff" />
        <directionalLight position={[-7, -2, 3]} intensity={2.2} color="#00d4d4" />

        <GridScan />
        <Particles count={mobile ? 500 : 1200} />
        <Emblem />
        <Shockwave />
        <Brackets />
        <CameraRig />
        {!reducedMotion && <Effects mobile={mobile} />}
      </ClockContext.Provider>
    </Canvas>
  );
}
