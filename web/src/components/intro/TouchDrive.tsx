"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

/**
 * TouchDrive — feeds R3F's shared pointer from window-level touches.
 *
 * On coarse-pointer devices the browser hands the drag gesture to page
 * scroll and fires pointercancel, so R3F's own pointermove stream dies
 * after the first frames — the logo and the fluid (which read
 * `state.pointer` every frame) never follow the finger. Passive window
 * touch listeners keep flowing DURING scroll, so this bridge restores
 * finger-follow without stealing the scroll gesture (never calls
 * preventDefault, never sets touch-action).
 *
 * On touchend the target eases back to center: the Emblem's overdamped
 * spring then returns the logo slowly to rest — same physics, same feel
 * as the mouse leaving the area on desktop.
 *
 * The intro canvas is viewport-sized (fixed inset 0), so window client
 * coordinates map 1:1 onto canvas NDC.
 */
export default function TouchDrive() {
  const pointer = useThree((s) => s.pointer);

  useEffect(() => {
    const write = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      pointer.set(
        (t.clientX / window.innerWidth) * 2 - 1,
        -(t.clientY / window.innerHeight) * 2 + 1,
      );
    };
    const release = () => {
      // Finger lifted: aim the spring back at the resting pose.
      pointer.set(0, 0);
    };
    window.addEventListener("touchstart", write, { passive: true });
    window.addEventListener("touchmove", write, { passive: true });
    window.addEventListener("touchend", release, { passive: true });
    window.addEventListener("touchcancel", release, { passive: true });
    return () => {
      window.removeEventListener("touchstart", write);
      window.removeEventListener("touchmove", write);
      window.removeEventListener("touchend", release);
      window.removeEventListener("touchcancel", release);
    };
  }, [pointer]);

  return null;
}
