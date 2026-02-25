"use client";
import React from "react";
import { BRAND_COLORS, KEYBOARD_IMAGE_URLS, keyboards, icon, I, amazonLink, flagUrl } from "@/data";

export const Flag = ({ country, size = 20, className = "" }) => {
  const url = flagUrl(country, size * 2);
  if (!url) return <span className={className}>{country}</span>;
  return <img loading="lazy" src={url} alt={country} width={size} height={Math.round(size * 0.75)} className={className} style={{ display: "inline-block", verticalAlign: "middle", borderRadius: 2, objectFit: "cover" }} />;
};

export const GlowText = ({ children, color = "#06b6d4", size = "text-5xl", className = "" }) => (
  <span
    className={`${size} font-black tracking-tight ${className}`}
    style={{
      color,
      textShadow: `0 0 20px ${color}30, 0 0 40px ${color}15`,
      fontFamily: "'Space Grotesk', system-ui, sans-serif",
    }}
  >
    {children}
  </span>
);

export const StatBox = ({ label, value, unit = "", color = "#06b6d4" }) => (
  <div
    className="glass-card flex flex-col items-center justify-center text-center p-3 sm:p-5"
    style={{
      background: `rgba(255,255,255,0.5)`,
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      border: `1px solid ${color}20`,
      boxShadow: `0 0 16px ${color}10, 0 2px 8px #00000006`,
    }}
  >
    <div className="text-2xl sm:text-3xl font-black" style={{ color, fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
      {value}<span className="text-sm sm:text-lg opacity-60">{unit}</span>
    </div>
    <div className="text-xs uppercase tracking-widest mt-1.5 font-semibold" style={{ color: "#a09890" }}>{label}</div>
  </div>
);

export const SectionTitle = ({ children, sub, color = "#06b6d4" }) => (
  <div className="mb-6 sm:mb-10 mt-10 sm:mt-20">
    <div className="flex items-center gap-3 sm:gap-4 mb-2">
      <div className="h-px flex-1" style={{ background: `linear-gradient(to right, #06b6d440, #8b5cf640, transparent)` }} />
      <h2
        className="text-lg sm:text-2xl lg:text-3xl tracking-tight text-center font-bold"
        style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", color: "#1a1614" }}
      >
        {children}
      </h2>
      <div className="h-px flex-1" style={{ background: `linear-gradient(to left, #06b6d440, #8b5cf640, transparent)` }} />
    </div>
    {sub && <p className="text-center text-sm tracking-wide px-2" style={{ color: "#a09890" }}>{sub}</p>}
  </div>
);

export const KeyboardCard = ({ keyboard, onClick, isSelected, rank }) => {
  const k = keyboard;
  const brandCol = BRAND_COLORS[k.brand] || "#a09890";
  const [isHovered, setIsHovered] = React.useState(false);
  return (
    <div
      onClick={() => onClick?.(k)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative cursor-pointer rounded-2xl p-4 transition-all duration-300 group flex flex-col w-full"
      style={{
        background: isSelected ? `rgba(255,255,255,0.65)` : "rgba(255,255,255,0.55)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: isSelected ? `2px solid ${brandCol}` : isHovered ? `1px solid ${brandCol}40` : `1px solid rgba(0,0,0,0.06)`,
        transform: isSelected ? "scale(1.02)" : isHovered ? "scale(1.02)" : "scale(1)",
        boxShadow: isSelected
          ? `0 0 20px ${brandCol}20, 0 8px 32px ${brandCol}10`
          : isHovered
          ? `0 0 20px #06b6d420, 0 8px 32px #00000008`
          : "0 1px 3px #00000006",
      }}
    >
      <div
        className="absolute top-3 right-3 text-xs font-bold px-2 py-0.5 keycap-badge"
        style={{ background: `${brandCol}15`, color: brandCol }}
      >
        #{rank || keyboards.indexOf(k) + 1}
      </div>
      <div className="mb-3 h-16 flex items-center justify-center">
        {KEYBOARD_IMAGE_URLS[k.name] && (
          <img loading="lazy" src={KEYBOARD_IMAGE_URLS[k.name]}
            alt={`${k.name} ${k.brand} esports gaming keyboard`} className="w-full h-full object-contain object-center" style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.08))" }} />
        )}
      </div>
      <div className="mb-0.5 overflow-hidden">
        <div className="text-sm font-bold leading-tight" style={{ color: "#1a1614", fontFamily: "'Space Grotesk', system-ui, sans-serif", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{k.name}</div>
      </div>
      <div className="text-xs mb-3 font-semibold" style={{ color: brandCol }}>{k.brand}</div>
      <div className="grid grid-cols-2 gap-1.5 text-xs mt-auto">
        <div className="flex justify-between"><span style={{ color: "#a09890" }}>Weight</span><span className="font-bold" style={{ color: "#2d2824" }}>{k.weight}g</span></div>
        <div className="flex justify-between"><span style={{ color: "#a09890" }}>Poll</span><span className="font-bold" style={{ color: "#2d2824" }}>{k.pollingRate >= 1000 ? `${k.pollingRate / 1000}K` : k.pollingRate}Hz</span></div>
        <div className="flex justify-between"><span style={{ color: "#a09890" }}>Price</span><span className="font-bold" style={{ color: "#2d2824" }}>{"$"}{k.price}</span></div>
        <div className="flex justify-between"><span style={{ color: "#a09890" }}>Pro %</span><span className="font-bold" style={{ color: brandCol }}>{k.proUsage}%</span></div>
      </div>
      <div className="mt-3 h-1 rounded-full overflow-hidden" style={{ background: "#f0ede8" }}>
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${k.rating * 10}%`, background: `linear-gradient(to right, #06b6d4, #8b5cf6)` }} />
      </div>
      <div className="text-right mt-0.5" style={{ fontSize: 11, color: "#a09890" }}>{k.rating}/10</div>
      <a href={amazonLink(k.name)} target="_blank" rel="noopener noreferrer"
        onClick={e => e.stopPropagation()}
        className="mt-2 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all opacity-70 group-hover:opacity-100 hover:!opacity-100 no-underline"
        style={{ background: `linear-gradient(135deg, #06b6d415, #8b5cf615)`, color: brandCol, border: `1px solid ${brandCol}20`, textDecoration: "none" }}
        onMouseEnter={e => { e.currentTarget.style.background = `linear-gradient(135deg, #06b6d4, #8b5cf6)`; e.currentTarget.style.color = "#fff"; }}
        onMouseLeave={e => { e.currentTarget.style.background = `linear-gradient(135deg, #06b6d415, #8b5cf615)`; e.currentTarget.style.color = brandCol; }}>
        {I.cart(12)} {"$"}{k.price} — Buy on Amazon
      </a>
    </div>
  );
};

export const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="glass-card rounded-xl p-3 text-sm"
      style={{
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid #06b6d420",
        boxShadow: "0 0 16px #06b6d410, 0 8px 32px #00000008",
      }}
    >
      <div className="font-bold mb-1" style={{ color: "#6b635b", fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} className="flex gap-2 items-center">
          <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span style={{ color: "#a09890" }}>{p.name}:</span>
          <span className="font-bold" style={{ color: p.color }}>{typeof p.value === 'number' && p.name?.toLowerCase().includes('usage') ? `${p.value}%` : p.value}</span>
        </div>
      ))}
    </div>
  );
};

export const GradientButton = ({ children, onClick, className = "", size = "md" }) => {
  const sizeClasses = size === "sm" ? "px-4 py-2 text-xs" : size === "lg" ? "px-8 py-3.5 text-base" : "px-6 py-2.5 text-sm";
  return (
    <button
      onClick={onClick}
      className={`${sizeClasses} font-bold rounded-xl transition-all duration-300 ${className}`}
      style={{
        background: "linear-gradient(135deg, #06b6d4, #8b5cf6)",
        color: "#fff",
        border: "none",
        boxShadow: "0 2px 12px #06b6d425",
        fontFamily: "'Space Grotesk', system-ui, sans-serif",
        cursor: "pointer",
      }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 24px #06b6d440, 0 0 20px #8b5cf620"; e.currentTarget.style.transform = "translateY(-1px)"; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 2px 12px #06b6d425"; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      {children}
    </button>
  );
};
