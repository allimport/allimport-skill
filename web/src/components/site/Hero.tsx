"use client";

import { useEffect, useState } from "react";
import { waLink } from "@/components/site/data";

/**
 * Hero overlay — a sibling DOM layer OVER the frozen Intro, never part of
 * intro/*. It exists only during the idle state, before the first scroll:
 * a single promise and one WhatsApp CTA emerge from the void once the Intro
 * assembly settles, then cede with weight as the first scroll begins.
 *
 * Spec: web/docs/08_HERO.md. Continuity: 03 (Intro, frozen) and 04 (scroll).
 * It touches no intro/* file and adds no new effect — it reuses the existing
 * motion language (weight, no bounce) and the single accent colour (cyan).
 */

// The Intro assembly settles into idle at ~5.0s (deterministic clock, doc 03
// timeline: Settle → Idle 4.30–5.00s). The Hero content chains off that idle;
// it must never appear before the logo is home.
const IDLE_AT_MS = 5200;

// First-scroll fade range, as a fraction of viewport height. The Hero is fully
// gone well before the content stage rises (the runway is a full 100vh).
const FADE_RANGE_FACTOR = 0.55;

export default function Hero() {
  const [ready, setReady] = useState(false);

  // Emerge, chained to the Intro idle. Reduced motion: the Intro shows its
  // static final pose, so the Hero appears at once — no staged emerge.
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const t = window.setTimeout(() => setReady(true), reduced ? 0 : IDLE_AT_MS);
    return () => window.clearTimeout(t);
  }, []);

  // Own the first-scroll progress var (--sp). Written at 60fps via rAF, read
  // by CSS only — no React re-render. Drives the Hero's fade and, in globals,
  // hides the sticky WhatsApp button while the Hero owns the single CTA.
  useEffect(() => {
    const root = document.documentElement;
    let raf = 0;
    const update = () => {
      raf = 0;
      const range = window.innerHeight * FADE_RANGE_FACTOR;
      const sp = Math.min(1, Math.max(0, window.scrollY / range));
      root.style.setProperty("--sp", String(sp));
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={`hero${ready ? " hero--ready" : ""}`} aria-hidden={!ready}>
      <div className="hero-inner">
        <p className="hero-promise">
          Importado, en tu mano.
          <br />
          Antes de pagar.
        </p>
        <span className="hero-cta-wrap">
          <a
            className="hero-cta"
            href={waLink("Hola All Import! Quiero hacer una consulta.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            Hablemos
          </a>
        </span>
      </div>
    </div>
  );
}
