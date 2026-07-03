/**
 * Master timeline for the All Import intro.
 *
 * Deterministic: every visual property derives from a single clock value `t`
 * (seconds since intro start). This keeps the sequence scrubbable and lets the
 * future Hero drive the same timeline from scroll without re-architecting.
 *
 * Beats (seconds) — direction B "Premium Scanner", perception-tuned:
 *   0.00 – 1.20  atmosphere   near-dark holds; grid/particles rise slowly
 *   1.00 – 2.30  scan         LINEAR beam sweep — instrument, not animation
 *   2.30 – 2.55  SILENCE      250ms of total stillness before the signature
 *   2.55 – 3.00  ignition     bolt strikes in 120ms; flash; O micro-settles
 *   3.15 – 3.75  frameIn      brackets snap in — precise, not bouncy
 *   3.55 – 4.55  wordmark     name arrives after the frame starts
 *   4.60 – 5.40  settle       blend to controlled idle (Hero-ready)
 *
 * The 2.30–2.55 gap is deliberate: tension → release makes the bolt read
 * as the brand's signature (the cause), not an effect.
 */

export const INTRO_DURATION = 5.4;

export const BEATS = {
  atmosphereIn: [0.0, 1.2],
  scan: [1.0, 2.3],
  ignition: [2.55, 3.0],
  frameIn: [3.15, 3.75],
  wordmark: [3.55, 4.55],
  settle: [4.6, 5.4],
} as const;

export type Ease = (x: number) => number;

export const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

export const easeOutCubic: Ease = (x) => 1 - Math.pow(1 - x, 3);
export const easeOutQuint: Ease = (x) => 1 - Math.pow(1 - x, 5);
export const easeInOutCubic: Ease = (x) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
export const easeOutBack: Ease = (x) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};
export const linear: Ease = (x) => x;

/** Normalized eased progress of `t` through the [a, b] window. */
export const seg = (
  t: number,
  [a, b]: readonly [number, number],
  ease: Ease = easeOutCubic,
): number => ease(clamp01((t - a) / (b - a)));

/** Short impulse: rises instantly at `at`, decays over `decay` seconds. */
export const pulse = (t: number, at: number, decay: number): number => {
  if (t < at) return 0;
  return Math.exp(-(t - at) / decay);
};

/** Staccato stepper: returns how many of `count` steps fired inside [a, b]. */
export const steps = (
  t: number,
  [a, b]: readonly [number, number],
  count: number,
): number => Math.floor(clamp01((t - a) / (b - a)) * count);
