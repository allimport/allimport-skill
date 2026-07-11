import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

// Note: on a GitHub Pages project site this file is served under the
// basePath, not the domain root — crawlers then fall back to "allow all",
// which matches our intent anyway. It becomes authoritative the moment the
// site moves to its own domain (NEXT_PUBLIC_SITE_URL).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
