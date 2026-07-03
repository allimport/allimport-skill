"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Intro → Hero experience. One living scene.
 *
 * The COMPLETE logo — every letter, the o, the bolt, the brackets — is 3D
 * geometry inside the canvas (no DOM/Three mix for the brand). A sr-only
 * <h1> carries the name for SEO and assistive tech. After the assembly
 * settles, the camera finds the Hero viewpoint and the DOM copy cascades
 * into the lower third: headline → subheadline → WhatsApp → Instagram.
 */

const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => <div className="intro-poster" aria-hidden />,
});

const WA_URL = "https://wa.me/5493517383945";
const IG_URL = "https://instagram.com/allimport.cba";

/** First-scroll transition length, in viewport heights. */
const SCROLL_RANGE_VH = 1.5;

export default function IntroExperience() {
  const [heroActive, setHeroActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mobile, setMobile] = useState(false);
  // Shared mutable scroll progress — read by the 3D scene at 60fps without
  // a single React re-render.
  const scrollProgress = useRef({ v: 0 }).current;

  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mb = window.matchMedia("(max-width: 768px), (pointer: coarse)");
    setReducedMotion(rm.matches);
    setMobile(mb.matches);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const p = Math.min(
        1,
        Math.max(0, window.scrollY / (window.innerHeight * SCROLL_RANGE_VH)),
      );
      scrollProgress.v = p;
      document.documentElement.style.setProperty("--sp", p.toFixed(4));
      setScrolled(p > 0.35);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollProgress]);

  const onHero = useCallback(() => setHeroActive(true), []);

  return (
    <div
      className={`intro-root${heroActive ? " hero-active" : ""}${scrolled ? " scrolled" : ""}`}
    >
      {/* The logo lives entirely in 3D; this carries the name for
          SEO and assistive tech. */}
      <h1 className="sr-only">All Import</h1>

      <Scene
        reducedMotion={reducedMotion}
        mobile={mobile}
        scrollProgress={scrollProgress}
        onHero={onHero}
      />

      {/* Hero — joins the living scene, left column over negative space.
          Four words of headline; the logo stays the protagonist. */}
      <section className="hero" aria-hidden={!heroActive}>
        <h2 className="hero-headline">
          <span className="hh-line">Importado.</span>
          <span className="hh-line">
            Verificado. <span className="hh-accent">En mano.</span>
          </span>
        </h2>

        <p className="hero-sub">Ves el producto antes de pagar. Córdoba.</p>

        <div className="hero-ctas">
          <a
            className="cta cta-primary"
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Hablemos por WhatsApp"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
              <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.1 8.1 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.6.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.4-3c-.3-.4 0-.6.1-.8l.4-.5c.1-.2.2-.3.3-.5v-.5c0-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5 0-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1 2.7a11 11 0 0 0 4.2 3.7c.6.3 1 .4 1.4.5.6.2 1.1.2 1.5.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.5-.2Z" />
            </svg>
            Hablemos
          </a>
          <a
            className="cta cta-ghost"
            href={IG_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
            </svg>
            @allimport.cba
          </a>
        </div>
      </section>
    </div>
  );
}
