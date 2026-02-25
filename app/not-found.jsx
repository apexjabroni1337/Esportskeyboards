import Link from "next/link";

export const metadata = {
  title: "Page Not Found — EsportsKeyboards",
  description: "The page you're looking for doesn't exist. Browse our database of pro esports keyboards, player settings, and gear comparisons.",
};

export default function NotFound() {
  const links = [
    { href: "/", label: "Home", desc: "Back to the homepage" },
    { href: "/keyboards", label: "All Keyboards", desc: "Browse 150+ esports keyboards" },
    { href: "/players", label: "Pro Players", desc: "2100+ player settings" },
    { href: "/games", label: "Games", desc: "Keyboard DNA by game" },
    { href: "/compare", label: "Compare", desc: "Side-by-side comparison" },
    { href: "/sensitivity", label: "Sensitivity Converter", desc: "Convert between games" },
    { href: "/brands", label: "Brands", desc: "Wooting, Razer, Cherry & more" },
    { href: "/switches", label: "Switches", desc: "Hall Effect, Cherry MX & more" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#f5f0e8" }}>
      <div className="text-center max-w-lg">
        <h1 className="text-7xl font-black mb-2" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", color: "#b8956a" }}>404</h1>
        <p className="text-xl opacity-60 mb-2">Page not found</p>
        <p className="text-sm opacity-40 mb-8">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>

        <div className="grid grid-cols-2 gap-3 mb-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-left p-3 rounded-xl transition-all hover:scale-[1.02]"
              style={{ background: "#f5f2ee", border: "1px solid #e8e4df" }}
            >
              <div className="text-sm font-bold" style={{ color: "#b8956a" }}>{l.label}</div>
              <div className="text-xs opacity-40 mt-0.5">{l.desc}</div>
            </Link>
          ))}
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105"
          style={{ background: "#b8956a20", color: "#b8956a", border: "1px solid #b8956a35" }}
        >
          ← Back to EsportsKeyboards
        </Link>
      </div>
    </div>
  );
}
