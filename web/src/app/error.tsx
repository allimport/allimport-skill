"use client";

import { waLink } from "@/components/site/data";

/** Error boundary — no blank screen when something breaks; retry + WhatsApp. (doc #13 §1) */
export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
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
      <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Algo salió mal</h1>
      <p style={{ opacity: 0.7, maxWidth: "34ch" }}>
        Tuvimos un problema al cargar esta parte. Probá de nuevo o escribinos y lo resolvemos.
      </p>
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
        <button
          onClick={() => reset()}
          style={{
            padding: "0.75rem 1.25rem",
            borderRadius: "999px",
            background: "#00d4d4",
            color: "#0a0f1a",
            fontWeight: 700,
            border: "none",
            cursor: "pointer",
          }}
        >
          Reintentar
        </button>
        <a
          href={waLink("Hola! Tuve un error en la web de All Import")}
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
