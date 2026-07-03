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
import { BEATS, HERO_START, HERO_END, seg } from "./timeline";

/**
 * Shared intro clock. A mutable ref object (not state) so 60fps reads never
 * re-render React. `reducedMotion` pins t past the end: the scene renders in
 * its settled Hero-ready pose with no sequence.
 *
 * `scroll` is the system's second input (0..1, first-scroll transition).
 * It is GATED by the hero blend in ClockDriver, so during the frozen
 * intro/Hero sequence scrolling cannot alter a single frame.
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
  onWordmark,
  onHero,
}: {
  clock: IntroClock;
  frozen: boolean;
  scrollProgress: { v: number };
  onWordmark: () => void;
  onHero: () => void;
}) {
  const firedWordmark = useRef(false);
  const firedHero = useRef(false);

  useFrame((_, dt) => {
    if (!frozen) clock.t += dt;
    // Scroll input, gated by the hero blend: 0 for the entire intro, so
    // early scrolling cannot disturb the frozen sequence — by construction.
    clock.scroll = scrollProgress.v * seg(clock.t, [HERO_START, HERO_END]);
    if (!firedWordmark.current && clock.t >= BEATS.wordmark[0]) {
      firedWordmark.current = true;
      onWordmark();
    }
    if (!firedHero.current && clock.t >= HERO_START) {
      firedHero.current = true;
      onHero();
    }
  });

  return null;
}

export default function Scene({
  reducedMotion,
  mobile,
  scrollProgress,
  onWordmark,
  onHero,
}: {
  reducedMotion: boolean;
  mobile: boolean;
  scrollProgress: { v: number };
  onWordmark: () => void;
  onHero: () => void;
}) {
  const clock = useMemo<IntroClock>(
    () => ({ t: reducedMotion ? HERO_END + 10 : 0, scroll: 0 }),
    [reducedMotion],
  );

  // Reduced motion: wordmark and hero show immediately, final framing.
  useEffect(() => {
    if (reducedMotion) {
      onWordmark();
      onHero();
    }
  }, [reducedMotion, onWordmark, onHero]);

  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{
        antialias: false,
        powerPreference: "high-performance",
        localClippingEnabled: true,
      }}
      camera={{ fov: 42, near: 0.1, far: 60, position: [0, 0, 15] }}
      style={{ position: "absolute", inset: 0 }}
    >
      <color attach="background" args={["#0a0f1a"]} />
      <fog attach="fog" args={["#0a0f1a", 18, 34]} />

      <ClockContext.Provider value={clock}>
        <ClockDriver
          clock={clock}
          frozen={reducedMotion}
          scrollProgress={scrollProgress}
          onWordmark={onWordmark}
          onHero={onHero}
        />

        {/* Lighting: white key + cyan rim (brand contamination on the O's edge) */}
        {/* Strong white key so the O reads WHITE (the brand color); the cyan
            rim only kisses the edge — it must never tint the face. */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[4, 6, 8]} intensity={2.0} color="#ffffff" />
        <directionalLight position={[-7, -2, 3]} intensity={1.1} color="#00d4d4" />

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
