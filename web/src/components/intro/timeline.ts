/**
 * Master timeline for the All Import intro.
 *
 * Deterministic: every visual property derives from a single clock value `t`
 * (seconds since intro start). This keeps the sequence scrubbable and lets the
 * future Hero drive the same timeline from scroll without re-architecting.
 *
 * Beats (seconds) — FULL LOGO ASSEMBLY, perception-tuned:
 *   0.00 – 0.90  atmosphere   near-dark holds; grid/particles rise slowly
 *   0.90 – 1.50  frameIn      brackets snap in first — the stage is set
 *   1.50 – 1.75  SILENCE      250ms of stillness before the signature
 *   1.75 – 2.05  ignition     bolt strikes in 120ms; flash
 *   2.05 – 2.65  oForm        the o materializes under a short scan sweep
 *   2.75 – 3.90  letters      remaining letters emerge from the darkness,
 *                             staggered outward from the o
 *   3.90 – 4.60  volume       the assembled logo gains physical depth
 *   4.60 – 5.30  settle       idle blend — mouse interaction begins ONLY
 *                             here, once the logo is fully assembled
 */

export const INTRO_DURATION = 5.3;

/**
 * Hero transition — ADDITIVE, intro v1.0 frozen. The clock keeps running
 * past the intro: pure idle holds 5.4–6.6s (the brand breathes untouched),
 * then the camera finds a new viewpoint inside the SAME scene over
 * 6.6–8.0s. Nothing restarts; heroP is 0 for the whole intro.
 */
export const HERO_START = 6.5;
export const HERO_END = 7.9;

export const BEATS = {
  atmosphereIn: [0.0, 0.9],
  frameIn: [0.9, 1.5],
  ignition: [1.75, 2.05],
  oForm: [2.05, 2.65],
  letters: [2.75, 3.9],
  volume: [3.9, 4.6],
  settle: [4.6, 5.3],
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
