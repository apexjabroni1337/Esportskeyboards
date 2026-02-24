// Server-rendered content for SEO crawlers.
// Visually hidden but present in HTML source for search engines.

export function SSRSection({ children }) {
  return (
    <div className="absolute overflow-hidden" style={{ width: 1, height: 1, padding: 0, margin: -1, clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}>
      {children}
    </div>
  );
}

export function SSRTitle({ children, accent }) {
  return (
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight mb-4" style={{ color: "#1a1614" }}>
      {accent && <span style={{ color: "#b8956a" }}>{accent} </span>}
      {children}
    </h1>
  );
}

export function SSRSub({ children }) {
  return <p className="text-sm sm:text-base leading-relaxed mb-6" style={{ color: "#6b635b" }}>{children}</p>;
}

export function SSRGrid({ children }) {
  return <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">{children}</div>;
}

export function SSRStat({ label, value, color }) {
  return (
    <div className="rounded-lg px-3 py-2" style={{ background: "#0000000a", border: "1px solid #e8e4df" }}>
      <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: color || "#a09890" }}>{label}</div>
      <div className="text-sm sm:text-base font-black" style={{ color: "#1a1614" }}>{value}</div>
    </div>
  );
}

export function SSRLink({ href, children, color }) {
  return (
    <a href={href} className="inline-block text-xs sm:text-sm font-bold px-3 py-1.5 rounded-full transition-opacity hover:opacity-80 no-underline"
      style={{ background: `${color || "#b8956a"}15`, color: color || "#b8956a", border: `1px solid ${color || "#b8956a"}25` }}>
      {children}
    </a>
  );
}

export function SSRDivider() {
  return <div className="my-6" style={{ height: 1, background: "linear-gradient(to right, transparent, #00000010, transparent)" }} />;
}
