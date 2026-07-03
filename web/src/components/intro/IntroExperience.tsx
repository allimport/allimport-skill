"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

/**
 * The All Import void experience.
 *
 * The brand communicates ONLY through the 3D logo and the scene — no DOM
 * overlays, no floating copy, no HUD. A sr-only <h1> carries the name for
 * SEO and assistive tech. Scroll (assembly-gated) lifts the logo to a
 * masthead and frees the stage below for future sections.
 */

const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => <div className="intro-poster" aria-hidden />,
});

/** First-scroll transition length, in viewport heights. */
const SCROLL_RANGE_VH = 1.5;

export default function IntroExperience() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mobile, setMobile] = useState(false);
  // Shared mutable scroll progress — read by the scene at 60fps without a
  // single React re-render.
  const scrollProgress = useRef({ v: 0 }).current;

  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mb = window.matchMedia("(max-width: 768px), (pointer: coarse)");
    setReducedMotion(rm.matches);
    setMobile(mb.matches);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      scrollProgress.v = Math.min(
        1,
        Math.max(0, window.scrollY / (window.innerHeight * SCROLL_RANGE_VH)),
      );
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollProgress]);

  return (
    <div className="intro-root">
      {/* The logo lives entirely in 3D; this carries the accessible name. */}
      <h1 className="sr-only">All Import</h1>

      <Scene
        reducedMotion={reducedMotion}
        mobile={mobile}
        scrollProgress={scrollProgress}
      />
    </div>
  );
}
