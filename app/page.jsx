import EsportsKeyboards from "@/components/ClientApp";
import { SSRSection, SSRTitle, SSRSub, SSRGrid, SSRStat, SSRLink, SSRDivider } from "@/components/ssr";
import { keyboards, allPlayers, proPlayers, BRAND_COLORS } from "@/data";

export const metadata = {
  title: "EsportsKeyboards — The Definitive Guide to Pro Esports Keyboards",
  description: "The #1 database of professional esports keyboards. Compare keyboards used by 2100+ pro players across CS2, Valorant, League of Legends, Fortnite, and 10+ major competitive titles. Full specs, rankings, and pro settings.",
  alternates: { canonical: "https://esportskeyboards.com" },
  openGraph: {
    title: "EsportsKeyboards — The Definitive Guide to Pro Esports Keyboards",
    description: "The #1 database of professional esports keyboards. Compare keyboards used by 2100+ pro players across 13 major games.",
    url: "https://esportskeyboards.com",
    images: [{ url: "https://esportskeyboards.com/og?title=The+Definitive+Guide+to+Pro+Esports+Keyboards&subtitle=2100%2B+Pro+Players+%C2%B7+150%2B+Keyboards+%C2%B7+13+Games", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "EsportsKeyboards — The Definitive Guide to Pro Esports Keyboards",
    description: "The #1 database of professional esports keyboards. Compare keyboards used by 2100+ pro players across 13 major games.",
  },
};

export default function HomePage() {
  const totalPlayers = allPlayers.length;
  const totalKeyboards = keyboards.length;
  const totalGames = new Set(allPlayers.map((p) => p.game)).size;
  const topKeyboards = [...keyboards].sort((a, b) => b?.proUsage - a?.proUsage).slice(0, 10);
  const topBrands = Object.entries(
    keyboards.reduce((acc, m) => { acc[m.brand] = (acc[m.brand] || 0) + m.proUsage; return acc; }, {})
  ).sort((a, b) => b[1] - a[1]).slice(0, 7);

  return (
    <>
      <article
        className="absolute overflow-hidden"
        style={{ width: 1, height: 1, padding: 0, margin: -1, clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}
      >
        <h1>EsportsKeyboards — The Definitive Guide to Pro Esports Gaming Keyboards</h1>
        <p>
          EsportsKeyboards is the most comprehensive database of professional esports gaming keyboards, tracking
          the gear and settings of {totalPlayers.toLocaleString()}+ professional players across {totalGames} major
          competitive titles including Counter-Strike 2, Valorant, League of Legends, Fortnite, Dota 2,
          Apex Legends, Call of Duty, Overwatch 2, Rainbow Six Siege, and more.
        </p>
        <p>
          Our database covers {totalKeyboards} gaming keyboards from brands including Razer, Logitech, Wooting, Cherry,
          Pulsar, Lamzu, SteelSeries, Corsair, and more. Every keyboard includes full specifications, pro usage
          statistics, expert ratings, and direct purchase links.
        </p>

        <h2>Most Popular Esports Keyboards in {new Date().getFullYear()}</h2>
        <ol>
          {topKeyboards.map((m) => (
            <li key={m.id}>
              <a href={`/keyboards/${m.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>{m.name}</a>
              {" "}— {m.brand}, {m?.weight}g, {m.proUsage}% pro usage, ${m?.price}
            </li>
          ))}
        </ol>

        <h2>Top Keyboard Brands in Professional Esports</h2>
        <ul>
          {topBrands.map(([brand, usage]) => (
            <li key={brand}><a href="/brands">{brand}</a> — {usage}% combined pro usage</li>
          ))}
        </ul>

        <h2>Featured Pro Players</h2>
        <ul>
          {proPlayers.slice(0, 20).map((p) => {
            const pm = keyboards.find((m) => p.keyboard.includes(m.name) || m.name.includes(p.keyboard));
            const mSlug = pm ? pm.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") : null;
            return (
              <li key={`${p.name}-${p.game}`}>
                <a href={`/players/${p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>{p.name}</a>
                {" "}— {p.game} ({p.team}) — Uses{" "}
                {mSlug ? <a href={`/keyboards/${mSlug}`}>{p.keyboard}</a> : p.keyboard}
                {" "}at {p.dpi} DPI, {p.edpi} eDPI
              </li>
            );
          })}
        </ul>

        <h2>Esports Games Covered</h2>
        <ul>
          {[...new Set(allPlayers.map((p) => p.game))].sort((a, b) => {
            const ca = allPlayers.filter((p) => p.game === a).length;
            const cb = allPlayers.filter((p) => p.game === b).length;
            return cb - ca;
          }).map((game) => (
            <li key={game}><a href={`/games/${game.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}`}>{game}</a> — {allPlayers.filter((p) => p.game === game).length} pro players tracked</li>
          ))}
        </ul>

        <h2>Keyboard Switches</h2>
        <ul>
          {[...new Set(keyboards.map((m) => m.switchType))].slice(0, 8).map((switchName) => (
            <li key={switchName}><a href="/switches">{switchName}</a> — used in {keyboards.filter((m) => m.switchType === switchName).length} keyboards</li>
          ))}
        </ul>

        <nav aria-label="Site sections">
          <h2>Explore EsportsKeyboards</h2>
          <ul>
            <li><a href="/keyboards">All Esports Keyboards — Complete database with specs and rankings</a></li>
            <li><a href="/players">Pro Player Settings — DPI, sensitivity, and gear for {totalPlayers.toLocaleString()}+ players</a></li>
            <li><a href="/games">Games — Keyboard DNA by esports title</a></li>
            <li><a href="/brands">Brands — Compare Wooting, Razer, Logitech, and more</a></li>
            <li><a href="/switches">Switches — Hall Effect, Cherry MX, Razer Optical comparison</a></li>
            <li><a href="/trends">Trends — Weight, polling rate, wireless adoption data</a></li>
            <li><a href="/compare">Compare — Side-by-side keyboard comparison tool</a></li>
            <li><a href="/sensitivity">Sensitivity Converter — Convert settings between games</a></li>
            <li><a href="/lab">Lab — Find your perfect keyboard with our quiz</a></li>
            <li><a href="/shapes">Shape Overlay — Compare keyboard dimensions visually</a></li>
          </ul>
        </nav>
      </article>

      <SSRSection>
        <SSRTitle accent="ESPORTS">KEYBOARDS</SSRTitle>
        <SSRSub>
          The most comprehensive database of professional esports gaming keyboards, tracking the gear and settings
          of {totalPlayers.toLocaleString()}+ professional players across {totalGames} major competitive titles.
        </SSRSub>
        <SSRGrid>
          <SSRStat label="Pro Players" value={totalPlayers.toLocaleString() + "+"} color="#b8956a" />
          <SSRStat label="Keyboards" value={totalKeyboards} color="#b8956a" />
          <SSRStat label="Games" value={totalGames} color="#b8956a" />
          <SSRStat label="Profiles" value={proPlayers.length} color="#b8956a" />
        </SSRGrid>
        <div className="flex flex-wrap gap-2">
          <SSRLink href="/keyboards">All Keyboards</SSRLink>
          <SSRLink href="/players">Pro Settings</SSRLink>
          <SSRLink href="/games">Games</SSRLink>
          <SSRLink href="/brands">Brands</SSRLink>
          <SSRLink href="/switches">Switches</SSRLink>
          <SSRLink href="/trends">Trends</SSRLink>
          <SSRLink href="/compare">Compare</SSRLink>
          <SSRLink href="/sensitivity">Sensitivity</SSRLink>
          <SSRLink href="/lab">Lab</SSRLink>
          <SSRLink href="/shapes">Shapes</SSRLink>
        </div>
      </SSRSection>

      <EsportsKeyboards initialTab="overview" />
    </>
  );
}
