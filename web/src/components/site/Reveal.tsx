"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reveal-on-scroll. One IntersectionObserver per element, fires once.
 * Motion with weight, per the design system: content settles in, never
 * snaps. Respects prefers-reduced-motion (shows immediately).
 */
export default function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  as?: React.ElementType;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag2 = Tag as any;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag2
      ref={ref}
      className={`reveal${shown ? " reveal-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag2>
  );
}
