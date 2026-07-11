import type { Metadata, Viewport } from "next";
import { Montserrat_Alternates } from "next/font/google";
import { SITE_URL, absUrl } from "@/lib/site";
import "./globals.css";

const montserrat = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["700", "800"],
  style: ["italic", "normal"],
  variable: "--font-brand",
  display: "swap",
});

const TITLE = "All Import — Importamos lo que todos quieren";
const DESCRIPTION =
  "Importamos lo que todos quieren. Al precio que nadie ofrece. Tecnología e indumentaria en Córdoba, entrega en mano.";
// Absolute URL: WhatsApp/Telegram/Discord scrapers don't resolve relative
// og:image paths, and metadataBase would drop the GitHub Pages basePath.
const OG_IMAGE = absUrl("/og.jpg");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/`,
    siteName: "All Import",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "All Import — Importado, en tu mano. Antes de pagar.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0F1A",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={montserrat.variable}>{children}</body>
    </html>
  );
}
