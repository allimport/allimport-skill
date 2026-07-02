import type { Metadata, Viewport } from "next";
import { Montserrat_Alternates } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["700", "800"],
  style: ["italic", "normal"],
  variable: "--font-brand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "All Import — Importamos lo que todos quieren",
  description:
    "Importamos lo que todos quieren. Al precio que nadie ofrece. Tecnología e indumentaria en Córdoba, entrega en mano.",
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
