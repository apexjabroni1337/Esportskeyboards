import EsportsKeyboards from "@/components/ClientApp";
import { SSRSection, SSRTitle, SSRSub, SSRGrid, SSRStat, SSRLink, SSRDivider } from "@/components/ssr";
import { allPlayers } from "@/data";

export const metadata = {
  title: "Best Gaming Keyboard Guides (2026) — By Game, Weight, Budget & More",
  description: `Find the best esports gaming keyboard for your game and playstyle. Pro-data-driven guides for CS2, Valorant, Fortnite, Apex Legends, and more. Based on data from ${2100}+ professional players.`,
  alternates: { canonical: "https://esportskeyboards.com/best" },
  openGraph: {
    title: "Best Gaming Keyboard Guides (2026) — By Game, Weight, Budget & More",
    description: "Find the best esports gaming keyboard for your game and playstyle.",
    url: "https://esportskeyboards.com/best",
    images: [{ url: "https://esportskeyboards.com/og?title=Best+Esports+Keyboards&subtitle=Guides+by+Game+%C2%B7+Weight+%C2%B7+Budget+%C2%B7+2026", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

const GUIDES = [
  { slug: "cs2", label: "Best Keyboard for CS2", sub: "Counter-Strike 2 pro picks" },
  { slug: "valorant", label: "Best Keyboard for Valorant", sub: "Tactical FPS pro picks" },
  { slug: "fortnite", label: "Best Keyboard for Fortnite", sub: "Build & aim pro picks" },
  { slug: "apex", label: "Best Keyboard for Apex Legends", sub: "Battle royale pro picks" },
  { slug: "overwatch-2", label: "Best Keyboard for Overwatch 2", sub: "Hero shooter pro picks" },
  { slug: "r6-siege", label: "Best Keyboard for R6 Siege", sub: "Tactical shooter pro picks" },
  { slug: "lol", label: "Best Keyboard for League of Legends", sub: "MOBA pro picks" },
  { slug: "pubg", label: "Best Keyboard for PUBG", sub: "Battle royale pro picks" },
  { slug: "call-of-duty", label: "Best Keyboard for Call of Duty", sub: "Arena FPS pro picks" },
  { slug: "dota-2", label: "Best Keyboard for Dota 2", sub: "MOBA pro picks" },
  { slug: "marvel-rivals", label: "Best Keyboard for Marvel Rivals", sub: "Hero shooter pro picks" },
  { slug: "rocket-league", label: "Best Keyboard for Rocket League", sub: "Vehicular soccer picks" },
  { slug: "wireless", label: "Best Wireless Gaming Keyboard", sub: "Top wireless picks" },
  { slug: "lightweight", label: "Best Lightweight Gaming Keyboard", sub: "Ultralight under 60g" },
  { slug: "budget", label: "Best Budget Gaming Keyboard", sub: "Top picks under $80" },
];

export default function BestIndexPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "ItemList",
        name: "Best Gaming Keyboard Guides",
        itemListElement: GUIDES.map((g, i) => ({
          "@type": "ListItem", position: i + 1,
          url: `https://esportskeyboards.com/best/${g.slug}`,
          name: g.label,
        })),
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "EsportsKeyboards", item: "https://esportskeyboards.com" },
          { "@type": "ListItem", position: 2, name: "Best Keyboards Guides", item: "https://esportskeyboards.com/best" },
        ],
      }) }} />

      <article
        className="absolute overflow-hidden"
        style={{ width: 1, height: 1, padding: 0, margin: -1, clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}
      >
        <h1>Best Gaming Keyboard Guides (2026)</h1>
        <p>Data-driven guides to the best esports gaming keyboards, broken down by game, weight class, and budget. Every recommendation is backed by real pro player usage data from {allPlayers.length}+ tracked professionals.</p>

        <h2>Best Keyboard by Game</h2>
        <ul>
          {GUIDES.filter(g => !["wireless", "lightweight", "budget"].includes(g.slug)).map(g => (
            <li key={g.slug}><a href={`/best/${g.slug}`}>{g.label}</a> — {g.sub}</li>
          ))}
        </ul>

        <h2>Best Keyboard by Category</h2>
        <ul>
          {GUIDES.filter(g => ["wireless", "lightweight", "budget"].includes(g.slug)).map(g => (
            <li key={g.slug}><a href={`/best/${g.slug}`}>{g.label}</a> — {g.sub}</li>
          ))}
        </ul>

        <nav aria-label="Related"><ul>
          <li><a href="/keyboards">All Esports Keyboards</a></li>
          <li><a href="/compare">Compare Keyboards</a></li>
          <li><a href="/players">Pro Player Settings</a></li>
        </ul></nav>
      </article>

      <SSRSection>
        <SSRTitle accent="Best Keyboards">Guides by Game & Category</SSRTitle>
        <SSRSub>Data-driven recommendations backed by {allPlayers.length}+ pro player setups. Find the perfect keyboard for your game.</SSRSub>
        <SSRGrid>
          {GUIDES.map(g => (
            <SSRLink key={g.slug} href={`/best/${g.slug}`}>{g.label}</SSRLink>
          ))}
        </SSRGrid>
      </SSRSection>

      <EsportsKeyboards initialTab="rankings" />
    </>
  );
}
