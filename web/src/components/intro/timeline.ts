/**
 * Master timeline for the All Import intro.
 *
 * Deterministic: every visual property derives from a single clock value `t`
 * (seconds since intro start). This keeps the sequence scrubbable and lets the
 * future Hero drive the same timeline from scroll without re-architecting.
 *
 * Beats (seconds):
 *   0.0 – 0.8  atmosphere    grid + particles fade in, camera far
 *   0.8 – 1.6  bolt streak   lightning scales in along its diagonal
 *   1.6 – 2.2  strike        flash, ring "O" materializes, shockwave
 *   2.2 – 3.2  frame-in      camera dolly, HUD brackets snap in (staccato)
 *   3.2 – 4.3  wordmark      DOM overlay reveals (driven via onPhase callback)
 *   4.3 – 5.0  settle        blend to idle loop (Hero-ready state)
 */

export const INTRO_DURATION = 5.0;

export const BEATS = {
  atmosphereIn: [0.0, 0.8],
  boltStreak: [0.8, 1.6],
  strike: [1.6, 2.2],
  frameIn: [2.2, 3.2],
  wordmark: [3.2, 4.3],
  settle: [4.3, 5.0],
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
