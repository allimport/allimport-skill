import type { MetadataRoute } from "next";
import { absUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "All Import",
    short_name: "All Import",
    description:
      "Importamos lo que todos quieren. Al precio que nadie ofrece. Tecnología e indumentaria en Córdoba, entrega en mano.",
    start_url: "./",
    display: "browser",
    background_color: "#0a0f1a",
    theme_color: "#0a0f1a",
    icons: [
      { src: absUrl("/icon.png"), sizes: "512x512", type: "image/png" },
      { src: absUrl("/apple-icon.png"), sizes: "180x180", type: "image/png" },
    ],
  };
}
