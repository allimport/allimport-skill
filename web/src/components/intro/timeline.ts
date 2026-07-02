/**
 * Master timeline for the All Import intro.
 *
 * Deterministic: every visual property derives from a single clock value `t`
 * (seconds since intro start). This keeps the sequence scrubbable and lets the
 * future Hero drive the same timeline from scroll without re-architecting.
 *
 * Beats (seconds) — direction B "Premium Scanner":
 *   0.0 – 0.8  atmosphere    grid + particles fade in, camera far
 *   0.8 – 2.4  scan          beam sweeps bottom→top, clipping-reveals the O
 *   2.4 – 3.0  ignition      bolt strikes in, flash, shockwave — scan verified
 *   3.0 – 3.7  frameIn       camera dolly, HUD brackets snap in (staccato)
 *   3.4 – 4.4  wordmark      DOM overlay reveals (driven via onWordmark)
 *   4.4 – 5.2  settle        blend to idle loop (Hero-ready state)
 */

export const INTRO_DURATION = 5.2;

export const BEATS = {
  atmosphereIn: [0.0, 0.8],
  scan: [0.8, 2.4],
  ignition: [2.4, 3.0],
  frameIn: [3.0, 3.7],
  wordmark: [3.4, 4.4],
  settle: [4.4, 5.2],
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
