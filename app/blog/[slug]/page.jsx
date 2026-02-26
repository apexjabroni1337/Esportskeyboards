import Link from "next/link";
import { keyboards, allPlayers, proPlayers, BRAND_COLORS, KEYBOARD_IMAGE_URLS, amazonLink } from "@/data";

const slug = (n) => n.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");

const ARTICLES = {
  "how-to-choose-gaming-keyboard": {
    title: "How to Choose the Right Gaming Keyboard in 2026",
    date: "2026-02-23",
    tag: "Guide",
    color: "#b8956a",
    content: (topKeyboards) => [
      { type: "p", text: "Choosing a gaming keyboard can feel overwhelming with hundreds of options on the market. But professional esports players have already done the testing for you — and the data tells a clear story about what actually matters." },
      { type: "h2", text: "1. Shape Is Everything" },
      { type: "p", text: "The most important factor in choosing a keyboard is its switch type. No amount of switch technology or weight savings will compensate for a shape that doesn't fit your hand. There are three main categories: ergonomic (right-hand contoured), symmetrical (ambidextrous), and egg-shaped. Symmetrical shapes dominate the FPS scene in 2026, with the Razer Huntsman V3 Pro and Wooting 60HE leading the way." },
      { type: "h2", text: "2. Weight Matters — But Don't Obsess" },
      { type: "p", text: "The average weight of a professional keyboard in 2026 is around 55g, down from 80g just three years ago. Lighter keyboards allow faster flick shots and reduce fatigue during long sessions. However, some players — especially those in tactical shooters — still prefer keyboards in the 60-70g range for more control. The sweet spot for most players is 45-65g." },
      { type: "h2", text: "3. Wireless Is Now the Standard" },
      { type: "p", text: "Over 80% of professional FPS players now use wireless keyboards. Modern wireless technology from Razer (HyperPolling), Logitech (Lightspeed), and others has eliminated any latency difference from wired. If you're still using a wired keyboard because you think wireless has lag — that hasn't been true since 2020." },
      { type: "h2", text: "4. Switch Type: The Biggest Decision in 2026" },
      { type: "p", text: "Every major gaming keyboard released in 2025-2026 uses a switch that tracks flawlessly. The Focus Pro 35K, HERO 2, and PAW-3950 all deliver zero smoothing, zero acceleration, and sub-millimeter tracking. Switch type is now one of the most important factors — Hall Effect vs mechanical makes a real difference in competitive play." },
      { type: "h2", text: "5. What the Pros Actually Use" },
      { type: "keyboards", data: topKeyboards },
      { type: "p", text: "The data is clear: pros prioritize shape fit, low weight, and reliable wireless. Price is rarely a factor at the professional level, but the good news is that most top keyboards are available for $80-160." },
      { type: "cta", text: "Explore all keyboards →", href: "/keyboards" },
    ],
  },
  "hall-effect-vs-mechanical-switches": {
    title: "Hall Effect vs Mechanical Switches: Which Is Best for Competitive Gaming?",
    date: "2026-02-23",
    tag: "Analysis",
    color: "#6b8cad",
    content: () => [
      { type: "p", text: "Every FPS player has different priorities, but your choice of switch type and layout has a massive impact on which keyboard will feel best in your hand. Understanding your grip is the first step to finding the right keyboard." },
      { type: "h2", text: "Palm Grip" },
      { type: "p", text: "Your entire hand rests on the keyboard, with your palm making full contact. This is the most relaxed grip and provides the most stability for smooth tracking. Palm grippers benefit from larger, ergonomic keyboards like the larger keyboards like the Logitech G Pro X TKL or Corsair K70 Max. Many CS2 AWPers prefer palm grip for its smooth, controlled aim." },
      { type: "h2", text: "Claw Grip" },
      { type: "p", text: "Your palm touches the back of the keyboard while your fingers are arched. This hybrid approach offers both stability and quick flick potential. Claw grip is the most common style among Valorant professionals. Medium-sized symmetrical keyboards like the Razer Huntsman V3 Pro Mini work well here." },
      { type: "h2", text: "Fingertip Grip" },
      { type: "p", text: "Only your fingertips touch the keyboard — your palm doesn't make contact at all. This gives maximum agility for micro-adjustments but requires more finger strength. Small, lightweight keyboards under 50g are ideal. Many Korean FPS players prefer this style." },
      { type: "h2", text: "What the Data Shows" },
      { type: "p", text: "While we can't measure grip remotely, the keyboard size choices of pros tell us a lot. CS2 pros skew toward larger keyboards (suggesting more palm/relaxed claw), while Valorant and Fortnite pros lean smaller (more claw/fingertip). There's no 'best' grip — only the best grip for your hand size and playstyle." },
      { type: "cta", text: "Find keyboards by shape →", href: "/shapes" },
    ],
  },
  "keyboard-weight-trend-2024-2026": {
    title: "The Rapid Trigger Revolution: How Switch Tech Changed Competitive Gaming",
    date: "2026-02-23",
    tag: "Data",
    color: "#b8956a",
    content: () => [
      { type: "p", text: "In 2018, rapid trigger keyboards didn't exist. By 2026, every major manufacturer offers some version of instant actuation. This is the story of how a single innovation changed the entire competitive landscape." },
      { type: "h2", text: "The Wooting Effect" },
      { type: "p", text: "It started with Wooting. The 60HE in 2021 introduced rapid trigger to mainstream competitive gaming — a concept that let players actuate keys faster than any traditional mechanical switch could manage. By 2023, every major manufacturer was developing hall effect or rapid trigger keyboards." },
      { type: "h2", text: "The Race to Near-Zero Actuation" },
      { type: "p", text: "Once the barrier was broken, rapid trigger became the new standard. Razer released the Huntsman V3 Pro with optical analog switches. SteelSeries updated the Apex Pro line with adjustable actuation. Newcomers like DrunkDeer and Meletrix made rapid trigger accessible at budget prices." },
      { type: "h2", text: "Where Are We Now?" },
      { type: "p", text: "The average keyboard used by a professional player in February 2026 has some form of adjustable actuation or rapid trigger technology. The race has shifted from 'do you have it' to 'how many activation points can it support.' The current standard is 1.0-1.5mm adjustable actuation for competitive keyboards." },
      { type: "h2", text: "Does Rapid Trigger Actually Affect Performance?" },
      { type: "p", text: "Yes, significantly. Players using rapid trigger in games that support it (Valorant, Counter-Strike, Quake) report measurably faster reaction times. In games without rapid trigger support, having the technology doesn't help, but it doesn't hurt either. Most pros agree that having rapid trigger capability is now table stakes for competitive play." },
      { type: "cta", text: "View switch technology trends →", href: "/trends" },
    ],
  },
  "wireless-vs-wired-2026": {
    title: "Is Wireless Finally Better Than Wired? The 2026 Data Says Yes",
    date: "2026-02-23",
    tag: "Analysis",
    color: "#7048c4",
    content: () => [
      { type: "p", text: "For years, 'wireless has lag' was gospel in competitive gaming. In 2026, the opposite is true: wireless keyboards now outsell and outperform wired in professional play." },
      { type: "h2", text: "The Numbers Don't Lie" },
      { type: "p", text: "Over 80% of professional FPS players now use wireless keyboards, up from roughly 30% in 2020. In CS2 specifically, wireless adoption exceeds 85%. The Logitech G Pro Wireless in 2018 started the shift, and the Razer Huntsman V3 Pro in 2024 cemented it." },
      { type: "h2", text: "Latency: A Non-Issue" },
      { type: "p", text: "Modern wireless protocols like Razer HyperPolling Wireless (4KHz), Logitech Lightspeed, and Wooting's wireless tech all deliver sub-1ms latency — faster than most USB wired connections. At 4KHz wireless polling, the keyboard reports its input every 0.25ms. Human reaction time is around 150ms. The difference is unmeasurable in practice." },
      { type: "h2", text: "Why Pros Switched" },
      { type: "p", text: "No cable drag. That's it. Cable drag creates inconsistent friction that affects micro-adjustments. Bungees helped, but eliminating the cable entirely is objectively better for consistent aim. The weight penalty for wireless (usually 3-8g extra for the battery) is negligible with modern battery technology." },
      { type: "cta", text: "Browse wireless keyboards →", href: "/best/wireless" },
    ],
  },
  "rapid-trigger-actuation-explained": {
    title: "Rapid Trigger & Actuation Explained: A Complete Guide",
    date: "2026-02-23",
    tag: "Guide",
    color: "#c4444f",
    content: () => [
      { type: "p", text: "Rapid trigger and adjustable actuation are revolutionary keyboard technologies that have changed competitive gaming. Learn how they work and why pros prefer them." },
      { type: "h2", text: "What Is Rapid Trigger?" },
      { type: "p", text: "Rapid trigger allows a key to be registered as pressed and released multiple times within a single keystroke. This technology, pioneered by Wooting, lets players execute actions faster than traditional mechanical switches allow." },
      { type: "h2", text: "What Is Adjustable Actuation?" },
      { type: "p", text: "Adjustable actuation lets you customize how far a key needs to travel before it registers a press. Most modern Hall Effect switches support adjustable actuation from 0.1mm to 4.0mm, giving you precise control over responsiveness." },
      { type: "h2", text: "Which Games Support Rapid Trigger?" },
      { type: "p", text: "Valorant, Counter-Strike 2, and Quake Champions officially support rapid trigger, giving players a competitive advantage. Other games don't use the technology but won't penalize you for having it." },
      { type: "h2", text: "Do Professional Players Use Rapid Trigger?" },
      { type: "p", text: "Yes. Over 80% of professional esports players now use keyboards with rapid trigger or Hall Effect switches. The technology has become the standard for competitive gaming." },
      { type: "cta", text: "Browse rapid trigger keyboards →", href: "/keyboards" },
    ],
  },
};

const SLUGS = Object.keys(ARTICLES);

export function generateStaticParams() {
  return SLUGS.map((s) => ({ slug: s }));
}

export function generateMetadata({ params }) {
  const article = ARTICLES[params.slug];
  if (!article) return { title: "Article Not Found" };
  return {
    title: `${article.title} — EsportsKeyboards Blog`,
    description: article.content([])[0]?.text?.slice(0, 155) + "...",
    alternates: { canonical: `https://esportskeyboards.com/blog/${params.slug}` },
    openGraph: {
      title: article.title,
      description: article.content([])[0]?.text?.slice(0, 155) + "...",
      url: `https://esportskeyboards.com/blog/${params.slug}`,
    },
    twitter: { card: "summary_large_image", title: article.title },
  };
}

export default function BlogArticlePage({ params }) {
  const article = ARTICLES[params.slug];
  if (!article) {
    return (
      <div style={{ background: "#f5f0e8", minHeight: "100vh" }} className="text-stone-900 text-center py-20">
        <h1 className="text-2xl font-bold mb-4">Article not found</h1>
        <Link href="/blog" className="text-sm underline" style={{ color: "#b8956a" }}>← Back to blog</Link>
      </div>
    );
  }

  // Get top keyboards for articles that need it
  const mc = {};
  allPlayers.forEach((p) => { mc[p.keyboard] = (mc[p.keyboard] || 0) + 1; });
  const topKeyboards = Object.entries(mc)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => {
      const m = keyboards.find((mm) => mm.name === name || name.includes(mm.name));
      return { name, count, pct: ((count / allPlayers.length) * 100).toFixed(1), kbd: m };
    });

  const blocks = article.content(topKeyboards);

  return (
    <div style={{ background: "#f5f0e8", minHeight: "100vh" }}>
      <div className="max-w-3xl mx-auto px-4 py-16">
        <Link href="/blog" className="text-sm opacity-40 hover:opacity-60 transition-all no-underline" style={{ color: "#1a1614", textDecoration: "none" }}>
          ← Back to blog
        </Link>

        <article className="mt-8">
          <div className="rounded-2xl p-8 sm:p-10 mb-8 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${article.color}15, ${article.color}05)`, border: `1px solid ${article.color}20` }}>
            <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, ${article.color}, transparent)` }} />
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold px-3 py-1 rounded-lg" style={{ background: `${article.color}20`, color: article.color, border: `1px solid ${article.color}40` }}>{article.tag}</span>
              <span className="text-xs opacity-30" style={{ color: "#1a1614" }}>{article.date}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black leading-tight" style={{ color: article.color }}>{article.title}</h1>
          </div>

          <div className="space-y-5">
            {blocks.map((block, i) => {
              if (block.type === "p") return <p key={i} className="text-base leading-relaxed opacity-70" style={{ color: "#1a1614" }}>{block.text}</p>;
              if (block.type === "h2") return <h2 key={i} className="text-xl font-black mt-8 mb-3" style={{ color: article.color }}>{block.text}</h2>;
              if (block.type === "cta") return (
                <div key={i} className="mt-8">
                  <Link href={block.href} className="inline-block px-6 py-3 rounded-lg text-sm font-bold no-underline transition-all hover:scale-105" style={{ background: `${article.color}20`, border: `1px solid ${article.color}30`, color: article.color, textDecoration: "none" }}>{block.text}</Link>
                </div>
              );
              if (block.type === "keyboards") return (
                <div key={i} className="grid gap-3 my-6">
                  {block.data.map((m, j) => (
                    <a key={j} href={m.keyboard ? `/keyboards/${slug(m.keyboard.name)}` : "#"} className="flex items-center gap-4 p-4 rounded-lg border-l-4 no-underline transition-all hover:scale-[1.01]" style={{ background: "#ffffff", border: "1px solid #e8e4df", borderLeftColor: m.keyboard ? BRAND_COLORS[m.keyboard.brand] || article.color : article.color, borderLeftWidth: "4px", textDecoration: "none" }}>
                      <span className="text-lg font-black opacity-20 w-6 text-center" style={{ color: "#1a1614" }}>#{j + 1}</span>
                      {m.keyboard && KEYBOARD_IMAGE_URLS[m.keyboard.name] && <img src={KEYBOARD_IMAGE_URLS[m.keyboard.name]} alt={m.name} className="h-10 w-16 object-contain" />}
                      <div className="flex-1">
                        <div className="font-bold text-sm" style={{ color: m.keyboard ? (BRAND_COLORS[m.keyboard.brand] || "#fff") : "#fff" }}>{m.name}</div>
                        <div className="text-xs opacity-40" style={{ color: "#1a1614" }}>{m.pct}% of pros · {m.count} players{m.keyboard ? ` · ${m.keyboard?.weight}g · $${m.keyboard?.price}` : ""}</div>
                      </div>
                      {m.keyboard && <a href={amazonLink(m.name)} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg text-xs font-bold no-underline transition-all hover:scale-105" style={{ background: "#b8956a", color: "#1a1614", textDecoration: "none" }}>Buy</a>}
                    </a>
                  ))}
                </div>
              );
              return null;
            })}
          </div>
        </article>

        {/* Related articles */}
        <div className="mt-16 pt-8" style={{ borderTop: "1px solid #e8e4df" }}>
          <h3 className="text-sm font-bold uppercase tracking-widest opacity-30 mb-4" style={{ color: "#1a1614" }}>More Articles</h3>
          <div className="grid gap-3">
            {SLUGS.filter((s) => s !== params.slug).slice(0, 3).map((s) => {
              const a = ARTICLES[s];
              return (
                <Link key={s} href={`/blog/${s}`} className="flex items-center gap-3 p-3 rounded-lg border-l-4 no-underline transition-all hover:scale-[1.01]" style={{ background: "#ffffff", border: "1px solid #e8e4df", borderLeftColor: a.color, borderLeftWidth: "4px", textDecoration: "none" }}>
                  <span className="text-xs font-bold px-3 py-1 rounded-lg flex-shrink-0" style={{ background: `${a.color}20`, color: a.color, border: `1px solid ${a.color}40` }}>{a.tag}</span>
                  <span className="text-sm font-bold truncate" style={{ color: "#1a1614" }}>{a.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
