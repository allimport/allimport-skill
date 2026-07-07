"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Reveal from "@/components/site/Reveal";
import {
  PRODUCTS,
  type Product,
  STATE_LABEL,
  STATE_CTA,
  ASK_CARD_MESSAGE,
  formatPrice,
  productInquiry,
  waLink,
} from "@/components/site/data";

/**
 * Catálogo "La Vitrina" — spec: docs 10 + user brief.
 *
 * A horizontal deck (not a grid): one protagonist card, neighbours peeking,
 * native scroll-snap for real OS touch physics, weighted settle everywhere.
 * Tapping a card expands it in place (shared-element FLIP into a native
 * <dialog>) — no route change, no page. Single WhatsApp CTA, pre-built
 * message. Honest availability states only; no counters, no e-commerce
 * patterns. No new dependencies (doc 16).
 */

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const TOTAL = PRODUCTS.length + 1; // + the "a pedido" closing card

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function Bolt({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      width="34"
      height="34"
      fill="currentColor"
      aria-hidden
    >
      <path d="M13.2 2 4.8 13.4h5.5L9.1 22l8.9-11.9h-5.6L13.2 2Z" />
    </svg>
  );
}

/** Deterministic per-product pose for the ghost watermark: each card reads
 *  unique without breaking the system (abstract identity, no fourth color). */
const GHOST_POSE = [
  { x: 64, y: 20, s: 4.2, r: -12 },
  { x: 22, y: 66, s: 3.4, r: 9 },
  { x: 71, y: 58, s: 3.8, r: -6 },
  { x: 26, y: 24, s: 3.0, r: 15 },
  { x: 57, y: 72, s: 4.5, r: -18 },
  { x: 33, y: 42, s: 2.8, r: 5 },
  { x: 67, y: 33, s: 3.5, r: -9 },
];

/** Vitrina-Nocturna void until real photos land: gradient + grain + the
 *  brand bolt as a faint watermark. Never the product name (brief §1). */
function Ghost({ seed }: { seed: number }) {
  const pose = GHOST_POSE[seed % GHOST_POSE.length];
  return (
    <div className="pmedia pmedia--ghost" aria-hidden>
      <Bolt
        className="pmedia-bolt"
        style={{
          left: `${pose.x}%`,
          top: `${pose.y}%`,
          transform: `translate(-50%, -50%) scale(${pose.s}) rotate(${pose.r}deg)`,
        }}
      />
    </div>
  );
}

/** Card media: real photo when it exists, ghost until then.
 *  The 4:5 box is always reserved — zero CLS when photos land. */
function Media({ p, sizes, seed }: { p: Product; sizes: string; seed: number }) {
  if (p.images.length === 0) return <Ghost seed={seed} />;
  return (
    <div className="pmedia">
      <Image
        src={p.images[0]}
        alt={p.name}
        width={820}
        height={1025}
        sizes={sizes}
        loading="lazy"
      />
    </div>
  );
}

/** Expanded-view gallery. Same architecture regardless of how many photos
 *  exist today: snap track + thin segment indicators (shown only with 2+).
 *  Fully keyboard-operable: the track takes focus, arrows move one photo. */
function Gallery({ p, seed }: { p: Product; seed: number }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);

  const onScroll = useCallback(() => {
    const t = trackRef.current;
    if (!t) return;
    setIdx(Math.round(t.scrollLeft / t.clientWidth));
  }, []);

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const t = trackRef.current;
    if (!t) return;
    const next = Math.round(t.scrollLeft / t.clientWidth) + (e.key === "ArrowRight" ? 1 : -1);
    t.scrollTo({
      left: next * t.clientWidth,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }, []);

  if (p.images.length === 0) {
    return (
      <figure className="gal">
        <Ghost seed={seed} />
      </figure>
    );
  }

  return (
    <figure className="gal">
      <div
        className="gal-track"
        ref={trackRef}
        onScroll={onScroll}
        onKeyDown={onKeyDown}
        tabIndex={p.images.length > 1 ? 0 : -1}
        role="group"
        aria-roledescription="galería"
        aria-label={`Fotos de ${p.name}`}
      >
        {p.images.map((src) => (
          <div className="gal-slide" key={src}>
            <Image
              src={src}
              alt={p.name}
              width={820}
              height={1025}
              sizes="(max-width: 860px) 94vw, 560px"
            />
          </div>
        ))}
      </div>
      {p.images.length > 1 && (
        <div className="gal-seg" aria-hidden>
          {p.images.map((src, i) => (
            <span key={src} className={i === idx ? "on" : undefined} />
          ))}
        </div>
      )}
    </figure>
  );
}

export default function Catalog() {
  const deckRef = useRef<HTMLUListElement>(null);
  const dlgRef = useRef<HTMLDialogElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const originRect = useRef<DOMRect | null>(null);
  const dragState = useRef({ down: false, moved: false, startX: 0, startLeft: 0 });

  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<Product | null>(null);
  const [size, setSize] = useState<string | undefined>();
  const [variant, setVariant] = useState<string | undefined>();
  // Keyboard nav target: survives rapid presses while smooth-scroll is in
  // flight (state `active` lags the animation).
  const keyTarget = useRef<number | null>(null);

  /* ---- active card tracking (nearest to deck centre) ---- */
  useEffect(() => {
    const deck = deckRef.current;
    if (!deck) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const centre = deck.scrollLeft + deck.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      Array.from(deck.children).forEach((li, i) => {
        const el = li as HTMLElement;
        const c = el.offsetLeft + el.offsetWidth / 2;
        const d = Math.abs(c - centre);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
        // Micro-parallax: the object drifts inside its card as the deck
        // moves — the photo has its own mass (doc 02). Consumed in CSS.
        const par = Math.max(-1, Math.min(1, (c - centre) / deck.clientWidth));
        el.style.setProperty("--par", par.toFixed(3));
      });
      setActive(best);
      if (keyTarget.current === best) keyTarget.current = null;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    deck.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      deck.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const scrollToCard = useCallback((i: number) => {
    const deck = deckRef.current;
    if (!deck) return;
    const li = deck.children[Math.max(0, Math.min(i, TOTAL - 1))] as
      | HTMLElement
      | undefined;
    if (!li) return;
    deck.scrollTo({
      left: li.offsetLeft - (deck.clientWidth - li.offsetWidth) / 2,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }, []);

  /* ---- keyboard: arrows move the deck ---- */
  const onDeckKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      const base = keyTarget.current ?? active;
      const next = Math.max(
        0,
        Math.min(base + (e.key === "ArrowRight" ? 1 : -1), TOTAL - 1),
      );
      keyTarget.current = next;
      scrollToCard(next);
    },
    [active, scrollToCard],
  );

  /* ---- desktop mouse drag (touch already native) ---- */
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const deck = deckRef.current;
    if (!deck) return;
    dragState.current = {
      down: true,
      moved: false,
      startX: e.clientX,
      startLeft: deck.scrollLeft,
    };
    deck.style.scrollSnapType = "none";
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const st = dragState.current;
    const deck = deckRef.current;
    if (!st.down || !deck) return;
    const dx = e.clientX - st.startX;
    if (Math.abs(dx) > 6) st.moved = true;
    deck.scrollLeft = st.startLeft - dx;
  }, []);

  const endDrag = useCallback(() => {
    const st = dragState.current;
    const deck = deckRef.current;
    if (!st.down || !deck) return;
    st.down = false;
    // settle to the nearest card with weight, then restore snap
    const centre = deck.scrollLeft + deck.clientWidth / 2;
    let best: HTMLElement | null = null;
    let bestDist = Infinity;
    Array.from(deck.children).forEach((li) => {
      const el = li as HTMLElement;
      const d = Math.abs(el.offsetLeft + el.offsetWidth / 2 - centre);
      if (d < bestDist) {
        bestDist = d;
        best = el;
      }
    });
    if (best) {
      const el = best as HTMLElement;
      deck.scrollTo({
        left: el.offsetLeft - (deck.clientWidth - el.offsetWidth) / 2,
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
    }
    window.setTimeout(() => {
      deck.style.scrollSnapType = "";
    }, 420);
  }, []);

  const suppressDragClick = useCallback((e: React.MouseEvent) => {
    if (dragState.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      dragState.current.moved = false;
    }
  }, []);

  /* ---- expand / close ---- */
  const openProduct = useCallback((p: Product, el: HTMLElement) => {
    originRect.current = el.getBoundingClientRect();
    setSize(undefined);
    setVariant(undefined);
    setOpen(p);
  }, []);

  // Weighted close: the vitrina settles shut (same easing as everything),
  // never vanishes in a frame. Reduced motion closes immediately.
  const closing = useRef(false);
  const close = useCallback(() => {
    const dlg = dlgRef.current;
    const panel = panelRef.current;
    if (!dlg || !dlg.open || closing.current) return;
    if (!panel || prefersReducedMotion()) {
      dlg.close();
      return;
    }
    closing.current = true;
    const anim = panel.animate(
      [
        { transform: "none", opacity: 1 },
        { transform: "scale(0.97) translateY(8px)", opacity: 0 },
      ],
      { duration: 260, easing: EASE },
    );
    anim.onfinish = () => {
      closing.current = false;
      dlg.close();
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const dlg = dlgRef.current;
    if (!dlg) return;
    if (!dlg.open) dlg.showModal();
    document.body.style.overflow = "hidden";

    // Shared-element FLIP: the panel grows out of the tapped card.
    const panel = panelRef.current;
    const from = originRect.current;
    if (panel && from && !prefersReducedMotion()) {
      const to = panel.getBoundingClientRect();
      const dx = from.left + from.width / 2 - (to.left + to.width / 2);
      const dy = from.top + from.height / 2 - (to.top + to.height / 2);
      const s = Math.max(0.25, from.width / to.width);
      panel.animate(
        [
          { transform: `translate(${dx}px, ${dy}px) scale(${s})`, opacity: 0.35 },
          { transform: "none", opacity: 1 },
        ],
        { duration: 420, easing: EASE },
      );
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* ---- drag-down to close (mobile), on the grab zone ---- */
  const grabY = useRef<number | null>(null);
  const onGrabDown = useCallback((e: React.PointerEvent) => {
    grabY.current = e.clientY;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);
  const onGrabMove = useCallback((e: React.PointerEvent) => {
    if (grabY.current === null) return;
    const dy = Math.max(0, e.clientY - grabY.current);
    if (panelRef.current)
      panelRef.current.style.transform = `translateY(${dy * 0.6}px)`;
  }, []);
  const onGrabUp = useCallback(
    (e: React.PointerEvent) => {
      if (grabY.current === null) return;
      const dy = Math.max(0, e.clientY - grabY.current);
      grabY.current = null;
      const panel = panelRef.current;
      if (!panel) return;
      if (dy * 0.6 > 90) {
        close();
        panel.style.transform = "";
      } else {
        panel.style.transform = "";
        if (!prefersReducedMotion())
          panel.animate(
            [{ transform: `translateY(${dy * 0.6}px)` }, { transform: "none" }],
            { duration: 320, easing: EASE },
          );
      }
    },
    [close],
  );

  const inquiryHref = open
    ? waLink(productInquiry(open, { size, variant }))
    : "#";

  return (
    <section id="productos" className="cat">
      <div className="sec cat-head">
        <Reveal as="p" className="eyebrow">
          Catálogo
        </Reveal>
        <Reveal as="h2" className="h2" delay={80}>
          Lo que tenemos ahora.
        </Reveal>
        <Reveal as="p" className="cat-sub" delay={140}>
          Pocas cosas, elegidas una por una.
        </Reveal>
      </div>

      <Reveal className="deck-wrap">
        <ul
          className="deck"
          role="list"
          aria-label="Catálogo de productos"
          aria-roledescription="carrusel"
          tabIndex={0}
          ref={deckRef}
          onKeyDown={onDeckKeyDown}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onClickCapture={suppressDragClick}
        >
          {PRODUCTS.map((p, i) => (
            <li key={p.id} className={active === i ? "is-active" : undefined}>
              <button
                type="button"
                className="pcard"
                onClick={(e) =>
                  // Look vs open are different gestures: a side card first
                  // comes to the centre; only the protagonist opens.
                  active === i
                    ? openProduct(p, e.currentTarget)
                    : scrollToCard(i)
                }
                aria-haspopup="dialog"
                aria-label={
                  active === i
                    ? `${p.name}, ${formatPrice(p.price)}. Ver de cerca`
                    : `${p.name}. Traer al centro`
                }
              >
                <Media p={p} sizes="(max-width: 860px) 78vw, 420px" seed={i} />
                <span className="pcard-body">
                  <span className="pcard-tag">{p.tag}</span>
                  <span className="pcard-name">{p.name}</span>
                  <span className="pcard-blurb">{p.blurb}</span>
                  <span className="pcard-price">{formatPrice(p.price)}</span>
                  {p.state !== "disponible" && (
                    <span className="pcard-state">{STATE_LABEL[p.state]}</span>
                  )}
                </span>
              </button>
            </li>
          ))}

          {/* Closing card: catalogue-as-service — we source on request. */}
          <li className={active === PRODUCTS.length ? "is-active" : undefined}>
            <div className="pcard pcard--ask">
              <Bolt className="ask-bolt" />
              <h3 className="ask-title">¿Buscás algo que no ves acá?</h3>
              <p className="ask-text">
                Lo conseguimos. Decinos qué querés y te decimos cuándo lo tenés
                en la mano.
              </p>
              <a
                className="btn btn-primary"
                href={waLink(ASK_CARD_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Pedilo por WhatsApp
              </a>
            </div>
          </li>
        </ul>

        <div className="deck-progress" aria-hidden>
          <span style={{ transform: `scaleX(${(active + 1) / TOTAL})` }} />
        </div>
      </Reveal>

      {/* Expanded view — same page, native dialog, single CTA. */}
      <dialog
        className="pd"
        ref={dlgRef}
        onClose={() => setOpen(null)}
        onCancel={(e) => {
          // Escape also closes with weight, never in a single frame.
          e.preventDefault();
          close();
        }}
        onClick={(e) => {
          if (e.target === dlgRef.current) close();
        }}
        aria-labelledby="pd-name"
      >
        {open && (
          <div className="pd-panel" ref={panelRef}>
            <div
              className="pd-grab"
              onPointerDown={onGrabDown}
              onPointerMove={onGrabMove}
              onPointerUp={onGrabUp}
              aria-hidden
            />
            <button
              type="button"
              className="pd-close"
              onClick={close}
              aria-label="Cerrar"
            >
              ×
            </button>

            <Gallery p={open} seed={PRODUCTS.indexOf(open)} />

            <div className="pd-body">
              <p className="pcard-tag">{open.tag}</p>
              <h3 className="pd-name" id="pd-name">
                {open.name}
              </h3>
              <p className="pd-blurb">{open.blurb}</p>

              <ul className="pd-facts">
                {open.facts.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>

              <p
                className={`pd-state${open.state !== "disponible" ? " pd-state--off" : ""}`}
              >
                <span className="pd-state-dot" aria-hidden />
                {STATE_LABEL[open.state]}
                {open.scarcity ? ` · ${open.scarcity}` : ""}
              </p>

              {open.sizes && (
                <div className="pd-chips" role="group" aria-label="Talle">
                  {open.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={`chip${size === s ? " chip--on" : ""}`}
                      aria-pressed={size === s}
                      onClick={() => setSize(size === s ? undefined : s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {open.variants && (
                <div
                  className="pd-chips"
                  role="group"
                  aria-label={open.variants.label}
                >
                  {open.variants.options.map((v) => (
                    <button
                      key={v}
                      type="button"
                      className={`chip${variant === v ? " chip--on" : ""}`}
                      aria-pressed={variant === v}
                      onClick={() => setVariant(variant === v ? undefined : v)}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              )}

              <div className="pd-buy">
                <span className="pd-price">{formatPrice(open.price)}</span>
                <a
                  className="btn btn-primary pd-cta"
                  href={inquiryHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {STATE_CTA[open.state]}
                </a>
                <p className="pd-reassure">La ves en mano. Recién ahí pagás.</p>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
