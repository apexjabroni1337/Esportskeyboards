"use client";

export default function GlobalError({ error, reset }) {
  return (
    <html lang="en">
      <body style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, padding: 40, fontFamily: "'Outfit', system-ui, sans-serif", color: "#1a1614", background: "#fafaf8" }}>
        <div style={{ fontSize: 48 }}>⚠️</div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#b8956a" }}>Something went wrong</h2>
        <p style={{ fontSize: 14, opacity: 0.5 }}>A critical error occurred.</p>
        <button
          onClick={() => reset()}
          style={{ padding: "10px 24px", borderRadius: 8, background: "#b8956a", color: "#fff", fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer" }}
        >
          Try Again
        </button>
      </body>
    </html>
  );
}
