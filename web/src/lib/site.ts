/**
 * Canonical site origin + asset prefixing for absolute URLs (Open Graph,
 * JSON-LD) and basePath-aware public assets.
 *
 * Static export served on GitHub Pages under /allimport-skill; CI sets
 * BASE_PATH and next.config.ts re-exposes it as NEXT_PUBLIC_BASE_PATH so it
 * is inlined into BOTH server and client bundles (plain BASE_PATH only
 * reaches server code). Override the origin with NEXT_PUBLIC_SITE_URL when
 * the site moves to its own domain.
 */
const ORIGIN = process.env.NEXT_PUBLIC_SITE_URL ?? "https://allimport.github.io";
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const SITE_URL = `${ORIGIN}${BASE_PATH}`;

/** Absolute URL for a public asset or route ("/og.jpg" → full URL). */
export function absUrl(path: string): string {
  return `${SITE_URL}${path}`;
}

/**
 * basePath-aware path for a public asset rendered at runtime
 * ("/products/x.webp" → "/allimport-skill/products/x.webp" on Pages).
 * next/link and metadata routes get this for free; next/image src and any
 * hand-written <img>/url() do NOT — always route them through here.
 */
export function assetPath(path: string): string {
  return `${BASE_PATH}${path}`;
}
