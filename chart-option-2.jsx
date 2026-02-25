// OPTION 2: Radial/Donut Chart with center stat
// A big donut chart showing market share with the top keyboard name in the center
// Surrounded by a legend with keycap-shaped badges

import React from "react";

const sampleData = [
  { name: "Wooting 60HE+", usage: 20.1, fill: "#e84393" },
  { name: "Huntsman V3 Pro TKL", usage: 19.8, fill: "#00c853" },
  { name: "Wooting 80HE", usage: 17.8, fill: "#8b5cf6" },
  { name: "G Pro X TKL", usage: 7.2, fill: "#00b4d8" },
  { name: "Huntsman V3 Pro Mini", usage: 6.1, fill: "#10b981" },
  { name: "Apex Pro TKL", usage: 6.0, fill: "#ff6600" },
  { name: "Other", usage: 23.0, fill: "#d4cfc8" },
];

export default function ChartOption2() {
  // Donut + legend side by side
  // Center shows "60HE+" with "20.1%" as the dominant keyboard
  return (
    <div style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(12px)", padding: 32, borderRadius: 20, border: "1px solid rgba(0,0,0,0.06)" }}>
      <h3 style={{ fontFamily: "'Space Grotesk'", fontSize: 20, fontWeight: 700, marginBottom: 24, color: "#1a1614" }}>
        Keyboard Market Share
      </h3>
      <div style={{ display: "flex", alignItems: "center", gap: 40, flexWrap: "wrap", justifyContent: "center" }}>
        {/* Donut placeholder (would use Recharts PieChart) */}
        <div style={{ width: 220, height: 220, borderRadius: "50%", background: `conic-gradient(#e84393 0% 20.1%, #00c853 20.1% 39.9%, #8b5cf6 39.9% 57.7%, #00b4d8 57.7% 64.9%, #10b981 64.9% 71%, #ff6600 71% 77%, #d4cfc8 77% 100%)`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
          <div style={{ width: 140, height: 140, borderRadius: "50%", background: "#f5f0e8", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 28, fontWeight: 800, color: "#e84393", fontFamily: "'Space Grotesk'" }}>20.1%</span>
            <span style={{ fontSize: 11, color: "#a09890", fontWeight: 600 }}>Wooting 60HE+</span>
          </div>
        </div>
        {/* Legend */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {sampleData.map((d, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 28, height: 22, borderRadius: 4, background: d.fill, clipPath: "polygon(3px 0, 100% 0, 100% calc(100% - 3px), calc(100% - 3px) 100%, 0 100%, 0 3px)" }} />
              <span style={{ fontSize: 13, color: "#1a1614", fontWeight: 600, fontFamily: "'Space Grotesk'", minWidth: 160 }}>{d.name}</span>
              <span style={{ fontSize: 13, fontWeight: 800, color: d.fill, fontFamily: "'Fira Code'" }}>{d.usage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
