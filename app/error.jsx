"use client";

export default function Error({ error, reset }) {
  return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, padding: 40, fontFamily: "'Outfit', system-ui, sans-serif", color: "#1a1614", background: "#fafaf8" }}>
      <div style={{ fontSize: 48 }}>⚠️</div>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: "#b8956a" }}>Something went wrong</h2>
      <p style={{ fontSize: 14, opacity: 0.5, maxWidth: 400, textAlign: "center" }}>
        An unexpected error occurred. Try refreshing the page.
      </p>
      <button
        onClick={() => reset()}
        style={{ padding: "10px 24px", borderRadius: 8, background: "#b8956a", color: "#fff", fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer" }}
      >
        Try Again
      </button>
      <a href="/" style={{ fontSize: 12, color: "#b8956a", opacity: 0.6, textDecoration: "none" }}>← Back to Home</a>
    </div>
  );
}
