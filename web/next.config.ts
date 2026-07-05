import type { NextConfig } from "next";

// Static export for GitHub Pages. Served under /allimport-skill on
// <org>.github.io, so basePath/assetPrefix are set in CI via BASE_PATH.
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
