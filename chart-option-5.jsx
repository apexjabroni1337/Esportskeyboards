// OPTION 5: Radial Burst / Circular Progress Rings
// Each keyboard is a circular progress ring arranged in a cluster
// Top 3 are large rings, the rest are smaller
// Very modern, dashboard-like aesthetic

import React from "react";

const sampleData = [
  { name: "Wooting 60HE+", usage: 20.1, fill: "#e84393" },
  { name: "Huntsman V3 Pro TKL", usage: 19.8, fill: "#00c853" },
  { name: "Wooting 80HE", usage: 17.8, fill: "#8b5cf6" },
  { name: "G Pro X TKL", usage: 7.2, fill: "#00b4d8" },
  { name: "Huntsman V3 Pro Mini", usage: 6.1, fill: "#10b981" },
  { name: "Apex Pro TKL", usage: 6.0, fill: "#ff6600" },
  { name: "Huntsman V3 Pro", usage: 2.9, fill: "#00c853" },
  { name: "Apex Pro Mini", usage: 2.1, fill: "#ff6600" },
];

function ProgressRing({ size, stroke, pct, color, label, value }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <div style={{ textAlign: "center" }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#f0ede8" strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1.5s ease", filter: `drop-shadow(0 0 6px ${color}40)` }} />
        <text x={size/2} y={size/2} textAnchor="middle" dy="0.35em" fill={color}
          style={{ fontSize: size > 100 ? 20 : 14, fontWeight: 800, fontFamily: "'Space Grotesk'", transform: "rotate(90deg)", transformOrigin: "center" }}>
          {value}%
        </text>
      </svg>
      <div style={{ fontSize: size > 100 ? 12 : 10, fontWeight: 600, color: "#1a1614", marginTop: 4, fontFamily: "'Space Grotesk'" }}>{label}</div>
    </div>
  );
}

export default function ChartOption5() {
  const max = Math.max(...sampleData.map(d => d.usage));
  return (
    <div style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(12px)", padding: 32, borderRadius: 20, border: "1px solid rgba(0,0,0,0.06)" }}>
      <h3 style={{ fontFamily: "'Space Grotesk'", fontSize: 20, fontWeight: 700, marginBottom: 24, color: "#1a1614" }}>
        Keyboard Usage Rings
      </h3>
      {/* Top 3: Large rings */}
      <div style={{ display: "flex", justifyContent: "center", gap: 32, marginBottom: 24, flexWrap: "wrap" }}>
        {sampleData.slice(0, 3).map((d, i) => (
          <ProgressRing key={i} size={140} stroke={10} pct={(d.usage / max) * 100} color={d.fill} label={d.name} value={d.usage} />
        ))}
      </div>
      {/* Rest: Smaller rings in a row */}
      <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
        {sampleData.slice(3).map((d, i) => (
          <ProgressRing key={i} size={90} stroke={6} pct={(d.usage / max) * 100} color={d.fill} label={d.name} value={d.usage} />
        ))}
      </div>
    </div>
  );
}
