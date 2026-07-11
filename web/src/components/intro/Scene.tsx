"use client";

import { createContext, useContext, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import Emblem from "./Emblem";
import Particles from "./Particles";
import Atmosphere from "./Atmosphere";
import Fluid from "./Fluid";
import DepthField from "./DepthField";
import CameraRig from "./CameraRig";
import Effects from "./Effects";
import TouchDrive from "./TouchDrive";
import { BEATS, INTRO_DURATION, seg } from "./timeline";

/**
 * The void. One scene, one protagonist: the complete 3D logo.
 * No grid, no HUD, no frames — spatial black, a galaxy field, a dark
 * fluid veil, and the logo lit by its own bolt.
 */

/**
 * Image-based lighting: a neutral studio environment (PMREM) gives the
 * lacquered letters real reflections — the surface reads as physical
 * material instead of flat shading. Intensity kept low so the void stays
 * a void.
 */
function StudioEnvironment() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const tex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = tex;
    scene.environmentIntensity = 0.5;
    return () => {
      scene.environment = null;
      tex.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);
  return null;
}

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
      {/* Deep Field: near-absolute black. Fog is the EXACT background
          color so distance fades honestly — no artificial haze tint. */}
      <color attach="background" args={["#030407"]} />
      <fog attach="fog" args={["#030407", 28, 65]} />

      <ClockContext.Provider value={clock}>
        <TouchDrive />
        <ClockDriver
          clock={clock}
          frozen={reducedMotion}
          scrollProgress={scrollProgress}
        />

        {/* Minimal ambient bed: the black metal must live off speculars
            and, after activation, the bolt's own light. */}
        <StudioEnvironment />
        <ambientLight intensity={0.18} />
        {/* Key: high and slightly right — long soft speculars on the lacquer */}
        <directionalLight position={[3, 5, 8]} intensity={1.7} color="#ffffff" />
        {/* Cool fill from the lower left */}
        <directionalLight position={[-6, -2, 4]} intensity={0.2} color="#00d4d4" />
        {/* Rim from behind-above: separates the piece from the void */}
        <directionalLight position={[-2, 4, -6]} intensity={0.9} color="#bfe9ee" />

        <DepthField />
        <Particles mobile={mobile} />
        <Atmosphere />
        <Fluid />
        <Emblem />
        <CameraRig />
        {!reducedMotion && <Effects mobile={mobile} />}
      </ClockContext.Provider>
    </Canvas>
  );
}
