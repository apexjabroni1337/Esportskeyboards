// OPTION 3: Podium/Tier Cards — Top 3 as large "podium" cards, rest as compact list
// The top 3 keyboards get hero-sized glassmorphism cards with glow effects
// Remaining keyboards in a clean compact grid below

import React from "react";

const sampleData = [
  { name: "Wooting 60HE+", usage: 20.1, fill: "#e84393", brand: "Wooting" },
  { name: "Huntsman V3 Pro TKL", usage: 19.8, fill: "#00c853", brand: "Razer" },
  { name: "Wooting 80HE", usage: 17.8, fill: "#8b5cf6", brand: "Wooting" },
  { name: "G Pro X TKL", usage: 7.2, fill: "#00b4d8", brand: "Logitech" },
  { name: "Huntsman V3 Pro Mini", usage: 6.1, fill: "#10b981", brand: "Razer" },
  { name: "Apex Pro TKL (2024)", usage: 6.0, fill: "#ff6600", brand: "SteelSeries" },
  { name: "Huntsman V3 Pro", usage: 2.9, fill: "#00c853", brand: "Razer" },
  { name: "Apex Pro Mini", usage: 2.1, fill: "#ff6600", brand: "SteelSeries" },
  { name: "G715", usage: 1.9, fill: "#00b4d8", brand: "Logitech" },
  { name: "Falchion Ace HFX", usage: 1.6, fill: "#c00", brand: "ASUS" },
];

export default function ChartOption3() {
  const top3 = sampleData.slice(0, 3);
  const rest = sampleData.slice(3);
  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div style={{ padding: 32 }}>
      <h3 style={{ fontFamily: "'Space Grotesk'", fontSize: 20, fontWeight: 700, marginBottom: 24, color: "#1a1614" }}>
        Most Used Pro Keyboards
      </h3>
      {/* Top 3 podium */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 24 }}>
        {top3.map((d, i) => (
          <div key={i} style={{
            background: "rgba(255,255,255,0.55)",
            backdropFilter: "blur(12px)",
            borderRadius: 16,
            padding: 24,
            border: `1px solid ${d.fill}20`,
            boxShadow: `0 0 24px ${d.fill}15`,
            textAlign: "center",
          }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>{medals[i]}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: d.fill, fontFamily: "'Space Grotesk'" }}>{d.usage}%</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1614", marginTop: 4, fontFamily: "'Space Grotesk'" }}>{d.name}</div>
            <div style={{ fontSize: 11, color: "#a09890", marginTop: 2 }}>{d.brand}</div>
            {/* Usage bar */}
            <div style={{ height: 4, borderRadius: 2, background: "#f0ede8", marginTop: 12, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${d.usage * 4}%`, background: `linear-gradient(90deg, #06b6d4, #8b5cf6)`, borderRadius: 2 }} />
            </div>
          </div>
        ))}
      </div>
      {/* Rest as compact rows */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {rest.map((d, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 10, background: "rgba(255,255,255,0.4)", border: "1px solid rgba(0,0,0,0.04)" }}>
            <span style={{ fontSize: 12, fontWeight: 800, color: "#a09890", width: 20 }}>#{i + 4}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#1a1614", flex: 1, fontFamily: "'Space Grotesk'" }}>{d.name}</span>
            <span style={{ fontSize: 13, fontWeight: 800, color: d.fill, fontFamily: "'Fira Code'" }}>{d.usage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
