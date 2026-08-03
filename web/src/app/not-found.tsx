import Link from "next/link";
import { waLink } from "@/components/site/data";

/** Custom 404 — on-brand, always offers a way back + WhatsApp. (doc #13 §4) */
export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.25rem",
        background: "#0a0f1a",
        color: "#fff",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <p style={{ fontSize: "clamp(3rem,12vw,5rem)", fontWeight: 800, color: "#00d4d4", lineHeight: 1 }}>
        404
      </p>
      <h1 style={{ fontSize: "1.4rem", fontWeight: 700 }}>Esta página no existe</h1>
      <p style={{ opacity: 0.7, maxWidth: "34ch" }}>
        El link que seguiste no lleva a ningún lado. Volvé al inicio o escribinos.
      </p>
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
        <Link
          href="/"
          style={{
            padding: "0.75rem 1.25rem",
            borderRadius: "999px",
            background: "#00d4d4",
            color: "#0a0f1a",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          Volver al inicio
        </Link>
        <a
          href={waLink("Hola! Vengo de la web de All Import")}
          style={{
            padding: "0.75rem 1.25rem",
            borderRadius: "999px",
            border: "1px solid #00d4d4",
            color: "#00d4d4",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          Escribir por WhatsApp
        </a>
      </div>
    </main>
  );
}
