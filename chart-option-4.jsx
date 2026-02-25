// OPTION 4: Treemap / Proportional Grid
// Each keyboard gets a proportionally-sized rectangle (bigger = more used)
// Creates a visual "mosaic" effect — completely different from a bar chart

import React from "react";

const sampleData = [
  { name: "Wooting 60HE+", usage: 20.1, fill: "#e84393" },
  { name: "Huntsman V3 Pro TKL", usage: 19.8, fill: "#00c853" },
  { name: "Wooting 80HE", usage: 17.8, fill: "#8b5cf6" },
  { name: "G Pro X TKL", usage: 7.2, fill: "#00b4d8" },
  { name: "Huntsman V3 Pro Mini", usage: 6.1, fill: "#10b981" },
  { name: "Apex Pro TKL (2024)", usage: 6.0, fill: "#ff6600" },
  { name: "Huntsman V3 Pro", usage: 2.9, fill: "#00c853" },
  { name: "Apex Pro Mini", usage: 2.1, fill: "#ff6600" },
  { name: "G715", usage: 1.9, fill: "#00b4d8" },
  { name: "Falchion Ace HFX", usage: 1.6, fill: "#c00" },
];

export default function ChartOption4() {
  // CSS Grid treemap approximation
  // Top 3 get 2-column spans, rest get 1 each
  return (
    <div style={{ padding: 32 }}>
      <h3 style={{ fontFamily: "'Space Grotesk'", fontSize: 20, fontWeight: 700, marginBottom: 24, color: "#1a1614" }}>
        Pro Keyboard Landscape
      </h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gridAutoRows: "80px", gap: 8, borderRadius: 16, overflow: "hidden" }}>
        {sampleData.map((d, i) => {
          // Top 3 are large, rest are small
          const span = i < 3 ? 2 : 1;
          const rowSpan = i < 3 ? 2 : 1;
          return (
            <div key={i} style={{
              gridColumn: `span ${span}`,
              gridRow: `span ${rowSpan}`,
              background: `${d.fill}15`,
              border: `1px solid ${d.fill}25`,
              borderRadius: 12,
              padding: 16,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}>
              <div style={{ fontSize: i < 3 ? 24 : 16, fontWeight: 800, color: d.fill, fontFamily: "'Space Grotesk'" }}>{d.usage}%</div>
              <div style={{ fontSize: i < 3 ? 13 : 11, fontWeight: 600, color: "#1a1614", marginTop: 2 }}>{d.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
