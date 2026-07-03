"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { BEATS, seg, easeInOutCubic } from "./timeline";
import { useIntroClock } from "./Scene";

/**
 * Camera: starts far, dollies in during frame-in, then hands control to a
 * subtle mouse parallax for the idle/Hero state. The dolly target IS the
 * future Hero framing — evolving to Hero is a camera move, not a rebuild.
 */

const START_Z = 15;
const END_Z = 8;

export default function CameraRig() {
  const clock = useIntroClock();
  const { camera, pointer } = useThree();
  const sway = useRef({ x: 0, y: 0 });

  useFrame(() => {
    const t = clock.t;
    // Dolly starts AT the strike — the impact is what pulls you in.
    const dolly = seg(t, [BEATS.ignition[0], BEATS.settle[0]], easeInOutCubic);
    const idle = seg(t, BEATS.settle);

    // Restrained mouse parallax once settled: presence, not toy.
    sway.current.x += (pointer.x * 0.25 * idle - sway.current.x) * 0.03;
    sway.current.y += (pointer.y * 0.15 * idle - sway.current.y) * 0.03;

    camera.position.set(
      sway.current.x,
      sway.current.y,
      START_Z + (END_Z - START_Z) * dolly,
    );
    camera.lookAt(0, 0.2, 0);
  });

  return null;
}
