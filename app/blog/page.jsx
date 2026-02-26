import Link from "next/link";

export const metadata = {
  title: "Blog — EsportsKeyboards",
  description: "Esports keyboard guides, pro gear analysis, and data-driven insights. Learn what the pros use and why.",
  alternates: { canonical: "https://esportskeyboards.com/blog" },
  openGraph: {
    title: "Blog — EsportsKeyboards",
    description: "Esports keyboard guides, pro gear analysis, and data-driven insights.",
    url: "https://esportskeyboards.com/blog",
  },
  twitter: { card: "summary_large_image" },
};

const ARTICLES = [
  {
    slug: "how-to-choose-gaming-keyboard",
    title: "How to Choose the Right Gaming Keyboard in 2026",
    excerpt: "Shape, weight, switch, wireless vs wired — the complete guide to finding your perfect keyboard based on what the pros actually use.",
    date: "2026-02-23",
    tag: "Guide",
    color: "#b8956a",
  },
  {
    slug: "hall-effect-vs-mechanical-switches",
    title: "Hall Effect vs Mechanical Switches: Which Is Best for Competitive Gaming?",
    excerpt: "We analyzed grip styles across 2,000+ pro players to find which grip dominates each game — and which keyboards match each style.",
    date: "2026-02-23",
    tag: "Analysis",
    color: "#6b8cad",
  },
  {
    slug: "keyboard-switch-trend-2024-2026",
    title: "The Rapid Trigger Revolution: How Switch Tech Changed Competitive Gaming",
    excerpt: "A data-driven look at how average keyboard weight in esports has dropped 40% in just three years, and what it means for your next purchase.",
    date: "2026-02-23",
    tag: "Data",
    color: "#b8956a",
  },
  {
    slug: "wireless-vs-wired-2026",
    title: "Is Wireless Finally Better Than Wired? The 2026 Data Says Yes",
    excerpt: "Over 80% of CS2 and Valorant pros now use wireless keyboards. Here's the data behind the shift and why wired is disappearing from the pro scene.",
    date: "2026-02-23",
    tag: "Analysis",
    color: "#7048c4",
  },
  {
    slug: "rapid-trigger-actuation-explained",
    title: "Rapid Trigger & Actuation Explained: A Complete Guide",
    excerpt: "What DPI should you use? What's eDPI? We break down every sensitivity concept with real pro player data and optimal ranges for each game.",
    date: "2026-02-23",
    tag: "Guide",
    color: "#c4444f",
  },
];

export default function BlogPage() {
  return (
    <div style={{ background: "#f5f0e8", minHeight: "100vh" }}>
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link href="/" className="text-sm opacity-40 hover:opacity-60 transition-all no-underline" style={{ color: "#1a1614", textDecoration: "none" }}>
          ← Back to EsportsKeyboards
        </Link>
        <div className="mt-6 mb-10">
          <div className="text-3xl sm:text-5xl font-black" style={{ color: "#1a1614", fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>The Keyboard <span style={{ background: "linear-gradient(135deg, #06b6d4, #a855f7)", backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Blog</span></div>
          <p className="text-base opacity-40 mt-2">Esports keyboard guides, pro gear analysis, and data-driven insights.</p>
        </div>

        <div className="space-y-6">
          {ARTICLES.map((a) => (
            <Link key={a.slug} href={`/blog/${a.slug}`} className="block rounded-2xl p-6 transition-all hover:scale-[1.01] border-l-4 no-underline" style={{ background: "#ffffff", borderColor: a.color, border: `1px solid #e8e4df`, borderLeftWidth: "4px", textDecoration: "none" }}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-bold px-3 py-1 rounded-lg" style={{ background: `${a.color}20`, color: a.color, border: `1px solid ${a.color}40` }}>{a.tag}</span>
                <span className="text-xs opacity-30" style={{ color: "#1a1614" }}>{a.date}</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black mb-2" style={{ color: "#1a1614" }}>{a.title}</h2>
              <p className="text-sm opacity-50" style={{ color: "#1a1614" }}>{a.excerpt}</p>
            </Link>
          ))}
        </div>

        <div className="mt-16 rounded-xl p-8 text-center" style={{ background: "#00000008", border: "1px solid #e8e4df" }}>
          <p className="text-sm opacity-30" style={{ color: "#1a1614" }}>More articles coming soon. Want to be notified?</p>
          <Link href="/contact" className="inline-block mt-3 px-5 py-2 rounded-lg text-sm font-bold no-underline transition-all hover:scale-105" style={{ background: "#b8956a", color: "#1a1614", textDecoration: "none" }}>Get in Touch</Link>
        </div>
      </div>
    </div>
  );
}
