"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hero overlay — a sibling DOM layer OVER the frozen Intro, never part of
 * intro/*. The logo owns the first screen ALONE: on load nothing else is
 * shown. The promise and the CTA are revealed by the user's own first
 * scroll (scrubbed fade + rise), then hand over to the content stage.
 *
 * Spec: web/docs/08_HERO.md + owner direction (hero-first choreography).
 * It touches no intro/* file; motion is scroll-scrubbed in CSS via --sp.
 */

// The Intro assembly settles into idle at ~5.0s (deterministic clock, doc 03
// timeline: Settle → Idle 4.30–5.00s). Reveal is scroll-driven, but never
// before the logo is home — the ready gate holds until then.
const IDLE_AT_MS = 5200;

// First-scroll progress range: --sp spans the full runway (one viewport),
// so the reveal window and the hand-off to content share one variable.
const FADE_RANGE_FACTOR = 1.0;

/** Reveal window (in --sp): promise fades in from IN_START, everything is
 *  gone again by OUT_END as the content stage arrives. */
const IN_START = 0.05;
const OUT_END = 0.96;

export default function Hero() {
  const [ready, setReady] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Ready gate, chained to the Intro idle. Reduced motion: the Intro shows
  // its static final pose, so the gate opens at once.
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const t = window.setTimeout(() => setReady(true), reduced ? 0 : IDLE_AT_MS);
    return () => window.clearTimeout(t);
  }, []);

  // Own the first-scroll progress var (--sp). Written at 60fps via rAF, read
  // by CSS only — no React re-render. Also gates the CTA's pointer-events
  // (class, not state) so the invisible button never intercepts the canvas.
  useEffect(() => {
    const root = document.documentElement;
    let raf = 0;
    const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
    const update = () => {
      raf = 0;
      const range = window.innerHeight * FADE_RANGE_FACTOR;
      const sp = Math.min(1, Math.max(0, window.scrollY / range));
      root.style.setProperty("--sp", String(sp));
      // Reveal values computed HERE (plain 0..1 numbers): CSS math over
      // unregistered custom properties is flaky across engines — inline
      // numbers are not. Promise first, CTA a beat later, both cede
      // before the content stage arrives.
      const out = clamp01((OUT_END - sp) * 6);
      root.style.setProperty("--hIn", String(clamp01((sp - IN_START) * 4.5)));
      root.style.setProperty("--hCta", String(clamp01((sp - 0.12) * 4.5)));
      root.style.setProperty("--hOut", String(out));
      rootRef.current?.classList.toggle(
        "hero--live",
        sp > IN_START && sp < OUT_END,
      );
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
    <div
      className={`hero${ready ? " hero--ready" : ""}`}
      ref={rootRef}
      aria-hidden={!ready}
    >
      <div className="hero-inner">
        <p className="hero-promise">
          Importado de verdad.
          <br />
          En tu mano antes de pagar.
        </p>
        <span className="hero-cta-wrap">
          {/* Conversion-first: the Hero's single CTA sends the visitor to the
              catalog (the products sell the visit); WhatsApp stays one tap
              away via the sticky button that fades in on first scroll. */}
          <a className="hero-cta" href="#productos">
            Ver productos
          </a>
        </span>
      </div>
    </div>
  );
}
