"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  BEATS,
  HERO_START,
  HERO_END,
  seg,
  easeInOutCubic,
} from "./timeline";
import { useIntroClock } from "./Scene";

/**
 * Camera for the full-wordmark logo (7.3 units wide incl. brackets).
 *
 * Framing is aspect-aware: the end distance is computed so the whole logo
 * always fits with margin, on any viewport. Dolly starts at the strike;
 * mouse parallax activates ONLY once assembly settles; the Hero and the
 * first-scroll transition re-frame the same living scene (logo rises to a
 * masthead as the DOM copy takes the lower third).
 */

const START_MULT = 1.6; // start distance = fit distance x this
const HALF_FOV_TAN = Math.tan((42 / 2) * (Math.PI / 180));
/** Half-width the frame must contain (logo 3.67 + breathing margin). */
const FIT_HALF_W = 4.15;

export default function CameraRig() {
  const clock = useIntroClock();
  const { camera, pointer } = useThree();
  const sway = useRef({ x: 0, y: 0 });

  useFrame(() => {
    const t = clock.t;
    const aspect =
      "aspect" in camera ? (camera as { aspect: number }).aspect : 1.78;

    // Distance at which the full logo fits this viewport, never closer
    // than 9 so desktop keeps its cinematic scale.
    const fitZ = Math.max(9, FIT_HALF_W / (HALF_FOV_TAN * aspect));
    const heroZ = fitZ * 1.1;
    const scrollZ = fitZ * 1.32;

    const dolly = seg(t, [BEATS.ignition[0], BEATS.settle[0]], easeInOutCubic);
    const idle = seg(t, BEATS.settle);
    const hero = seg(t, [HERO_START, HERO_END], easeInOutCubic);
    const s = easeInOutCubic(clock.scroll);

    // Mouse parallax only once the logo is fully assembled.
    sway.current.x += (pointer.x * 0.25 * idle - sway.current.x) * 0.03;
    sway.current.y += (pointer.y * 0.15 * idle - sway.current.y) * 0.03;

    const introZ = fitZ * START_MULT + (fitZ - fitZ * START_MULT) * dolly;
    const zHero = introZ + (heroZ - introZ) * hero;
    camera.position.set(
      sway.current.x,
      sway.current.y,
      zHero + (scrollZ - zHero) * s,
    );

    // Hero: logo rises toward masthead (look target sinks); scroll: further.
    const lookY = 0 + -1.35 * hero + (-2.4 - -1.35) * hero * s;
    camera.lookAt(0, lookY, 0);
  });

  return null;
}
