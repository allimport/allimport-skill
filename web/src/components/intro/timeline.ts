/**
 * Master timeline for the All Import "Void" intro.
 *
 * Deterministic: every visual property derives from a single clock value `t`
 * (seconds since intro start), plus a scroll input gated by assembly.
 *
 * Beats (seconds):
 *   0.00 – 0.50  void        absolute black — nothing exists yet
 *   0.50 – 1.80  particles   the galaxy field fades in, spatial depth
 *   1.60 – 3.00  emerge      the black-metal logo surfaces from darkness
 *                            (opacity + z drift; barely a silhouette)
 *   3.00 – 3.60  boltOn      the bolt ACTIVATES as the scene's only light
 *                            source — the logo is lit by its own energy
 *   3.60 – 4.30  stabilize   materials settle to final reflectance,
 *                            micro-settle of mass
 *   4.30 – 5.00  settle      interaction enables ONLY here: mouse moves
 *                            the logo, particles parallax, fluid reacts
 */

export const INTRO_DURATION = 5.0;

export const BEATS = {
  particles: [0.5, 1.8],
  emerge: [1.6, 3.0],
  boltOn: [3.0, 3.6],
  stabilize: [3.6, 4.3],
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
