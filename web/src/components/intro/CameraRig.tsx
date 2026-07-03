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
const END_Z = 9.4;

/** Hero framing: emblem right-third, slightly smaller. */
const HERO_Z = 10.6;
const HERO_LOOK_X = -1.25;
const HERO_LOOK_Y = 0.3;

/** First-scroll framing: the universe widens, the emblem rises to masthead. */
const SCROLL_Z = 12.8;
const SCROLL_LOOK_X = 0;
const SCROLL_LOOK_Y = 1.15;

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

    // First-scroll blend: 0 while the frozen sequence plays (gated upstream).
    const s = easeInOutCubic(clock.scroll);

    const introZ = START_Z + (END_Z - START_Z) * dolly;
    const heroZ = introZ + (HERO_Z - introZ) * hero;
    camera.position.set(
      sway.current.x,
      sway.current.y,
      heroZ + (SCROLL_Z - heroZ) * s,
    );

    // Narrow viewports get a reduced lateral shift so the emblem never
    // leaves the frame or collides with the text column on mobile.
    const aspect =
      "aspect" in camera ? (camera as { aspect: number }).aspect : 1.78;
    const lateral = Math.min(1, Math.max(0.35, (aspect - 0.5) / 1.1));

    const heroLX = HERO_LOOK_X * lateral * hero;
    const heroLY = 0.2 + (HERO_LOOK_Y - 0.2) * hero;
    camera.lookAt(
      heroLX + (SCROLL_LOOK_X - heroLX) * s,
      heroLY + (SCROLL_LOOK_Y - heroLY) * s,
      0,
    );
  });

  return null;
}
