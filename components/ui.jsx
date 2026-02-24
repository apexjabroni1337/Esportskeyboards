"use client";
import React from "react";
import { BRAND_COLORS, KEYBOARD_IMAGE_URLS, keyboards, icon, I, amazonLink, flagUrl } from "@/data";

export const Flag = ({ country, size = 20, className = "" }) => {
  const url = flagUrl(country, size * 2);
  if (!url) return <span className={className}>{country}</span>;
  return <img loading="lazy" src={url} alt={country} width={size} height={Math.round(size * 0.75)} className={className} style={{ display: "inline-block", verticalAlign: "middle", borderRadius: 2, objectFit: "cover" }} />;
};

export const GlowText = ({ children, color = "#b8956a", size = "text-5xl", className = "" }) => (
  <span className={`${size} font-black tracking-tight ${className}`} style={{ color }}>{children}</span>
);

export const StatBox = ({ label, value, unit = "", color = "#b8956a" }) => (
  <div className="flex flex-col items-center justify-center text-center p-2 sm:p-4 rounded-xl" style={{ background: `${color}08`, border: `1px solid ${color}20` }}>
    <div className="text-xl sm:text-3xl font-black" style={{ color }}>{value}<span className="text-sm sm:text-lg opacity-70">{unit}</span></div>
    <div className="text-sm uppercase tracking-widest mt-1" style={{ color: "#a09890" }}>{label}</div>
  </div>
);

export const SectionTitle = ({ children, sub, color = "#b8956a" }) => (
  <div className="mb-6 sm:mb-10 mt-10 sm:mt-20">
    <div className="flex items-center gap-3 sm:gap-4 mb-2">
      <div className="h-px flex-1" style={{ background: `linear-gradient(to right, ${color}40, transparent)` }} />
      <h2 className="text-lg sm:text-2xl lg:text-3xl tracking-tight text-center" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, color: "#1a1614" }}>{children}</h2>
      <div className="h-px flex-1" style={{ background: `linear-gradient(to left, ${color}40, transparent)` }} />
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
        background: isSelected ? `${brandCol}08` : "#ffffff",
        border: isSelected ? `2px solid ${brandCol}` : isHovered ? `1px solid ${brandCol}30` : `1px solid #e8e4df`,
        transform: isSelected ? "scale(1.02)" : isHovered ? "scale(1.02)" : "scale(1)",
        boxShadow: isSelected
          ? `0 8px 32px ${brandCol}15`
          : isHovered
          ? `0 8px 32px #00000008`
          : "0 1px 3px #00000006",
      }}
    >
      <div className="absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: `${brandCol}12`, color: brandCol }}>
        #{rank || keyboards.indexOf(k) + 1}
      </div>
      <div className="mb-3 h-16 flex items-center justify-center">
        {KEYBOARD_IMAGE_URLS[k.name] && (
          <img loading="lazy" src={KEYBOARD_IMAGE_URLS[k.name]}
            alt={`${k.name} ${k.brand} esports gaming keyboard`} className="w-full h-full object-contain object-center" style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.08))" }} />
        )}
      </div>
      <div className="mb-0.5 overflow-hidden">
        <div className="text-sm font-bold leading-tight" style={{ color: "#1a1614", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{k.name}</div>
      </div>
      <div className="text-xs mb-3" style={{ color: brandCol }}>{k.brand}</div>
      <div className="grid grid-cols-2 gap-1.5 text-xs mt-auto">
        <div className="flex justify-between"><span style={{ color: "#a09890" }}>Weight</span><span className="font-bold" style={{ color: "#2d2824" }}>{k.weight}g</span></div>
        <div className="flex justify-between"><span style={{ color: "#a09890" }}>Poll</span><span className="font-bold" style={{ color: "#2d2824" }}>{k.pollingRate >= 1000 ? `${k.pollingRate / 1000}K` : k.pollingRate}Hz</span></div>
        <div className="flex justify-between"><span style={{ color: "#a09890" }}>Price</span><span className="font-bold" style={{ color: "#2d2824" }}>{"$"}{k.price}</span></div>
        <div className="flex justify-between"><span style={{ color: "#a09890" }}>Pro %</span><span className="font-bold" style={{ color: brandCol }}>{k.proUsage}%</span></div>
      </div>
      <div className="mt-3 h-1 rounded-full overflow-hidden" style={{ background: "#f0ede8" }}>
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${k.rating * 10}%`, background: `linear-gradient(to right, ${brandCol}80, ${brandCol})` }} />
      </div>
      <div className="text-right mt-0.5" style={{ fontSize: 11, color: "#a09890" }}>{k.rating}/10</div>
      <a href={amazonLink(k.name)} target="_blank" rel="noopener noreferrer"
        onClick={e => e.stopPropagation()}
        className="mt-2 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all opacity-70 group-hover:opacity-100 hover:!opacity-100 no-underline"
        style={{ background: `${brandCol}10`, color: brandCol, border: `1px solid ${brandCol}20`, textDecoration: "none" }}
        onMouseEnter={e => { e.currentTarget.style.background = brandCol; e.currentTarget.style.color = "#fff"; }}
        onMouseLeave={e => { e.currentTarget.style.background = `${brandCol}10`; e.currentTarget.style.color = brandCol; }}>
        {I.cart(12)} {"$"}{k.price} — Buy on Amazon
      </a>
    </div>
  );
};

export const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl p-3 text-sm" style={{ background: "#fffffff0", border: "1px solid #e8e4df", boxShadow: "0 8px 32px #00000008" }}>
      <div className="font-bold mb-1" style={{ color: "#a09890" }}>{label}</div>
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
