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
 * Camera: starts far, dollies in during frame-in, hands control to a subtle
 * mouse parallax for idle — then, for the Hero, finds a NEW VIEWPOINT inside
 * the same scene (additive reframe, intro v1.0 untouched): the lookAt drifts
 * so the emblem migrates to the right third, and z eases back slightly so
 * the emblem reads ~13% smaller. Parallax and every running animation
 * continue through the move; nothing restarts.
 */

const START_Z = 15;
const END_Z = 8;

/** Hero framing: emblem right-third, slightly smaller. */
const HERO_Z = 9.2;
const HERO_LOOK_X = -1.25;
const HERO_LOOK_Y = 0.3;

export default function CameraRig() {
  const clock = useIntroClock();
  const { camera, pointer } = useThree();
  const sway = useRef({ x: 0, y: 0 });

  useFrame(() => {
    const t = clock.t;
    // Dolly starts AT the strike — the impact is what pulls you in.
    const dolly = seg(t, [BEATS.ignition[0], BEATS.settle[0]], easeInOutCubic);
    const idle = seg(t, BEATS.settle);
    // Hero reframe: 0 for the entire intro, eases in after the idle hold.
    const hero = seg(t, [HERO_START, HERO_END], easeInOutCubic);

    // Restrained mouse parallax once settled: presence, not toy.
    sway.current.x += (pointer.x * 0.25 * idle - sway.current.x) * 0.03;
    sway.current.y += (pointer.y * 0.15 * idle - sway.current.y) * 0.03;

    const introZ = START_Z + (END_Z - START_Z) * dolly;
    camera.position.set(
      sway.current.x,
      sway.current.y,
      introZ + (HERO_Z - introZ) * hero,
    );
    camera.lookAt(HERO_LOOK_X * hero, 0.2 + (HERO_LOOK_Y - 0.2) * hero, 0);
  });

  return null;
}
