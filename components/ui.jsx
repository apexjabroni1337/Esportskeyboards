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
  const pollDisplay = k.pollingRate >= 1000 ? `${k.pollingRate / 1000}K` : k.pollingRate;
  return (
    <div
      onClick={() => onClick?.(k)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative cursor-pointer rounded-xl overflow-hidden transition-all duration-300 group flex flex-col w-full"
      style={{
        background: "#fff",
        border: isSelected ? `2px solid ${brandCol}` : "none",
        transform: isHovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: isSelected
          ? `0 12px 28px ${brandCol}20, 0 4px 12px #00000008`
          : isHovered
          ? "0 12px 24px rgba(0,0,0,0.12)"
          : "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      {/* ── Top Panel: Image Area ── */}
      <div className="relative flex items-center justify-center overflow-hidden" style={{ height: 160, background: "linear-gradient(135deg, #f5f0e8, #ede8df)" }}>
        {KEYBOARD_IMAGE_URLS[k.name] ? (
          <img loading="lazy" src={KEYBOARD_IMAGE_URLS[k.name]}
            alt={`${k.name} ${k.brand} esports gaming keyboard`}
            className="w-full h-full object-contain object-center p-4"
            style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.08))" }} />
        ) : (
          <span className="text-sm italic" style={{ color: "#a09890" }}>{k.name}</span>
        )}
        {/* Brand accent bar at bottom of image panel */}
        <div className="absolute bottom-0 left-0 right-0" style={{ height: 4, background: brandCol }} />
        {/* Rank badge */}
        <div className="absolute top-3 right-3 flex items-center justify-center rounded-full font-bold text-sm"
          style={{ width: 34, height: 34, background: "#fff", color: brandCol, border: `2px solid ${brandCol}`, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
          #{rank || keyboards.indexOf(k) + 1}
        </div>
      </div>
      {/* ── Switch Type Divider Badge ── */}
      <div className="absolute flex justify-center w-full" style={{ top: 144, zIndex: 10 }}>
        <span className="px-3 py-1 rounded-md text-white font-bold uppercase tracking-wide"
          style={{ fontSize: 10, background: brandCol, boxShadow: "0 2px 8px rgba(0,0,0,0.15)", letterSpacing: "0.3px" }}>
          {k.switchType ? (k.switchType.length > 22 ? k.switchType.slice(0, 20) + "…" : k.switchType) : k.layout}
        </span>
      </div>
      {/* ── Bottom Panel: Data Area ── */}
      <div className="flex flex-col flex-grow px-4 pt-5 pb-4" style={{ background: "#faf8f5", marginTop: 0 }}>
        {/* Name & Brand */}
        <div className="mb-3">
          <div className="text-sm font-bold leading-tight mb-1" style={{ color: "#1a1614", fontFamily: "'Space Grotesk', system-ui, sans-serif", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{k.name}</div>
          <div className="text-xs font-bold uppercase tracking-wider" style={{ color: brandCol, letterSpacing: "0.4px" }}>{k.brand}</div>
        </div>
        {/* Compact Stats Row */}
        <div className="flex justify-between gap-2 mb-3">
          {[
            { label: "Weight", value: `${k.weight}g` },
            { label: "Rate", value: `${pollDisplay}Hz` },
            { label: "Price", value: `$${k.price}` },
            { label: "Pro %", value: `${k.proUsage}%` },
          ].map((s, i) => (
            <div key={i} className="flex-1 text-center">
              <div className="font-bold uppercase tracking-wider mb-0.5" style={{ fontSize: 9, color: "#a09890", letterSpacing: "0.3px" }}>{s.label}</div>
              <div className="font-bold" style={{ fontSize: 12, color: i === 3 ? brandCol : "#1a1614" }}>{s.value}</div>
            </div>
          ))}
        </div>
        {/* Rating Display */}
        <div className="flex justify-between items-center px-3 py-2.5 rounded-md mb-3" style={{ background: "#fff", border: "1px solid #ede8df" }}>
          <span className="font-bold uppercase tracking-wider" style={{ fontSize: 10, color: "#a09890", letterSpacing: "0.3px" }}>Rating</span>
          <span className="font-bold" style={{ fontSize: 14, color: brandCol }}>{k.rating}/10</span>
        </div>
        {/* Buy Button */}
        <a href={amazonLink(k.name)} target="_blank" rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          className="mt-auto flex items-center justify-center gap-1.5 py-2.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all no-underline"
          style={{ background: "#1a1614", color: "#f5f0e8", textDecoration: "none", letterSpacing: "0.5px" }}
          onMouseEnter={e => { e.currentTarget.style.background = "#2d2520"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(26,22,20,0.3)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#1a1614"; e.currentTarget.style.boxShadow = "none"; }}>
          {I.cart(12)} ${k.price} — Buy Now
        </a>
      </div>
    </div>
  );
};

export const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="glass-card rounded-xl p-4 text-sm"
      style={{
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid #06b6d420",
        borderLeft: "3px solid #06b6d4",
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
