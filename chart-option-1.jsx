// OPTION 1: Horizontal Race Bars — Gradient glass bars ranked left-to-right
// Looks like a "race leaderboard" with glassmorphism cards

import React from "react";

const sampleData = [
  { name: "60HE+", usage: 20.1, fill: "#e84393" },
  { name: "Huntsman V3 Pro TKL", usage: 19.8, fill: "#00c853" },
  { name: "80HE", usage: 17.8, fill: "#e84393" },
  { name: "G Pro X TKL", usage: 7.2, fill: "#00b4d8" },
  { name: "Huntsman V3 Pro Mini", usage: 6.1, fill: "#00c853" },
  { name: "Apex Pro TKL (2024)", usage: 6.0, fill: "#ff6600" },
  { name: "Huntsman V3 Pro", usage: 2.9, fill: "#00c853" },
  { name: "Apex Pro Mini", usage: 2.1, fill: "#ff6600" },
  { name: "G715", usage: 1.9, fill: "#00b4d8" },
  { name: "Falchion Ace HFX", usage: 1.6, fill: "#c00" },
];

export default function ChartOption1() {
  const max = Math.max(...sampleData.map(d => d.usage));
  return (
    <div style={{ background: "#f5f0e8", padding: 32, borderRadius: 20 }}>
      <h3 style={{ fontFamily: "'Space Grotesk'", fontSize: 20, fontWeight: 700, marginBottom: 24, color: "#1a1614" }}>
        Keyboard Usage by Professional Players
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {sampleData.map((d, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 24, fontSize: 13, fontWeight: 800, color: "#a09890", textAlign: "right", fontFamily: "'Fira Code'" }}>
              {i + 1}
            </span>
            <div style={{ flex: 1, position: "relative", height: 36, borderRadius: 10, background: "rgba(255,255,255,0.5)", backdropFilter: "blur(8px)", border: "1px solid rgba(0,0,0,0.04)", overflow: "hidden" }}>
              <div style={{
                height: "100%",
                width: `${(d.usage / max) * 100}%`,
                background: `linear-gradient(90deg, ${d.fill}30, ${d.fill}80)`,
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                paddingLeft: 12,
                transition: "width 1s ease",
              }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#1a1614", fontFamily: "'Space Grotesk'", whiteSpace: "nowrap" }}>
                  {d.name}
                </span>
              </div>
              <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", fontSize: 13, fontWeight: 800, color: d.fill, fontFamily: "'Fira Code'" }}>
                {d.usage}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
