/** Loading state — no frozen blank screen while the route resolves. (doc #13 §2) */
export default function Loading() {
  return (
    <main
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        background: "#0a0f1a",
        color: "#fff",
      }}
    >
      <span
        aria-hidden
        style={{
          width: "2.25rem",
          height: "2.25rem",
          borderRadius: "50%",
          border: "3px solid rgba(0,212,212,0.25)",
          borderTopColor: "#00d4d4",
          animation: "ai-spin 0.8s linear infinite",
        }}
      />
      <p style={{ opacity: 0.7, fontWeight: 700 }}>Cargando…</p>
      <style>{`@keyframes ai-spin { to { transform: rotate(360deg); } }`}</style>
    </main>
  );
}
