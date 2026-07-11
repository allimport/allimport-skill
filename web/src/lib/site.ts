/**
 * Canonical site origin for absolute URLs (Open Graph, JSON-LD).
 *
 * Static export served on GitHub Pages under /allimport-skill; CI sets
 * BASE_PATH (see next.config.ts). Override the origin with
 * NEXT_PUBLIC_SITE_URL when the site moves to its own domain.
 */
const ORIGIN = process.env.NEXT_PUBLIC_SITE_URL ?? "https://allimport.github.io";
const BASE_PATH = process.env.BASE_PATH ?? "";

export const SITE_URL = `${ORIGIN}${BASE_PATH}`;

/** Absolute URL for a public asset or route ("/og.jpg" → full URL). */
export function absUrl(path: string): string {
  return `${SITE_URL}${path}`;
}
