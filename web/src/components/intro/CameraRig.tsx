"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { BEATS, seg, easeInOutCubic } from "./timeline";
import { useIntroClock } from "./Scene";

/**
 * Camera for the void: near-static, aspect-aware framing that always fits
 * the full wordmark. The LOGO is the interactive object (Emblem.tsx) — the
 * camera only answers with a whisper of sway, settle-gated. Scroll lifts
 * the viewpoint so the logo rises to a masthead and frees the stage below.
 */

const HALF_FOV_TAN = Math.tan((42 / 2) * (Math.PI / 180));
/** Half-width the frame must contain (logo 3.5 + breathing margin). */
const FIT_HALF_W = 4.15;

export default function CameraRig() {
  const clock = useIntroClock();
  const { camera, pointer } = useThree();
  const sway = useRef({ x: 0, y: 0 });

  useFrame(() => {
    const t = clock.t;
    const aspect =
      "aspect" in camera ? (camera as { aspect: number }).aspect : 1.78;

    const fitZ = Math.max(9, FIT_HALF_W / (HALF_FOV_TAN * aspect));
    const inter = seg(t, BEATS.settle);
    const s = easeInOutCubic(clock.scroll);

    // A whisper of response — the logo does the moving, not the camera.
    sway.current.x += (pointer.x * 0.025 * inter - sway.current.x) * 0.018;
    sway.current.y += (pointer.y * 0.016 * inter - sway.current.y) * 0.018;

    camera.position.set(
      sway.current.x,
      sway.current.y,
      fitZ * (1 + 0.3 * s),
    );
    camera.lookAt(0, -2.1 * s, 0);
  });

  return null;
}
