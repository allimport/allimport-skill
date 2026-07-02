"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";

/**
 * Intro entry point.
 *
 * - 3D scene loads client-only (three crashes SSR) behind a poster frame.
 * - The wordmark is a DOM overlay (crisp type at any DPR, zero GPU cost),
 *   revealed by the scene's timeline via onWordmark.
 * - This component persists as the base layer when the Hero arrives: the
 *   Hero mounts DOM around/over it and re-frames the same camera.
 */

const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => <div className="intro-poster" aria-hidden />,
});

export default function IntroExperience() {
  const [wordmarkVisible, setWordmarkVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mb = window.matchMedia("(max-width: 768px), (pointer: coarse)");
    setReducedMotion(rm.matches);
    setMobile(mb.matches);
  }, []);

  const onWordmark = useCallback(() => setWordmarkVisible(true), []);

  return (
    <div className={`intro-root${wordmarkVisible ? " intro-done" : ""}`}>
      <Scene
        reducedMotion={reducedMotion}
        mobile={mobile}
        onWordmark={onWordmark}
      />

      <div className="intro-overlay">
        <h1 className="wordmark" aria-label="All Import">
          <span className="word" aria-hidden>
            <span>All</span>
          </span>
          <span className="word" aria-hidden>
            <span>Import</span>
          </span>
        </h1>
        <p className="tagline">
          Importamos lo que todos quieren
        </p>
      </div>
    </div>
  );
}
