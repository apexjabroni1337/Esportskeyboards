import EsportsKeyboards from "@/components/ClientApp";
import { SSRSection, SSRTitle, SSRSub, SSRGrid, SSRStat, SSRLink, SSRDivider } from "@/components/ssr";
import { keyboards, allPlayers, proPlayers, BRAND_COLORS, KEYBOARD_IMAGE_URLS, amazonLink } from "@/data";

const sl = (n) => n.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");

const BEST_PAGES = {
  "cs2": { game: "CS2", full: "Counter-Strike 2", tab: "cs2", intro: "Counter-Strike 2 demands precision aiming, pixel-perfect crosshair placement, and consistent flick shots. Pro CS2 players overwhelmingly prefer lightweight wireless keyboards with flawless switches and low latency. The ideal CS2 keyboard combines a safe shape for long tournament sessions with sub-60g weight for fast target acquisition.", tips: "CS2 pros typically use 400-800 DPI with low in-game sensitivity (1.0-2.0 at 800 DPI). A large mousepad and low eDPI give maximum precision for headshot-heavy gameplay. Most top players prefer symmetrical shapes for consistent aim." },
  "valorant": { game: "Valorant", full: "Valorant", tab: "valorant", intro: "Valorant's tactical gameplay combines precise gunplay with ability usage, requiring a keyboard that excels at both micro-adjustments and fast flicks. The best Valorant keyboards are lightweight, wireless, and feature top-tier switches. Pro Valorant players tend to use similar setups to CS2 pros, with a slight preference for even lower DPI settings.", tips: "Valorant pros favor 800 DPI with 0.2-0.5 in-game sensitivity. The game's precise hit registration rewards consistent, controlled inputs. Wireless has become the standard — virtually no top Valorant pros use wired keyboards in 2025." },
  "fortnite": { game: "Fortnite", full: "Fortnite Battle Royale", tab: "fortnite", intro: "Fortnite's unique building mechanics demand a keyboard that handles both rapid 180° turns during build fights and precise aim for shotgun flicks. Pro Fortnite players tend to use higher sensitivities than CS2/Valorant pros to accommodate quick building, making lightweight keyboards with excellent tracking essential.", tips: "Fortnite pros use higher DPI (800-1600) with moderate sensitivity. Fast edit and build sequences require quick inputs, so ultralight keyboards under 55g are popular. The side buttons need to be accessible for build keybinds." },
  "apex": { game: "Apex", full: "Apex Legends", tab: "apex", intro: "Apex Legends' fast-paced movement system, including sliding, climbing, and character abilities, demands a keyboard that can track fast-moving targets while maintaining accuracy during chaotic gunfights. Pros need excellent tracking aim for weapons like the R-301 and R-99.", tips: "Apex pros use moderate sensitivity — higher than CS2 but lower than Fortnite. Tracking aim is more important than flick aim, so consistent switch performance matters. Many top players prefer ergonomic layouts for comfort during long play sessions." },
  "overwatch-2": { game: "Overwatch 2", full: "Overwatch 2", tab: "overwatch-2", intro: "Overwatch 2's hero-based gameplay means keyboard requirements vary by role. Hitscan DPS players need precise flick aim, while tank and support players benefit from comfortable shapes for extended sessions. The game's fast movement speeds and vertical gameplay demand responsive tracking.", tips: "OW2 DPS pros typically use 800 DPI with 3-6 in-game sensitivity. The game rewards both flick and tracking aim depending on hero. Most pros prefer lightweight keyboards for the fast-paced DPS role." },
  "r6-siege": { game: "R6 Siege", full: "Rainbow Six Siege", tab: "r6-siege", intro: "Rainbow Six Siege is a precision-focused tactical shooter where holding angles and pixel-peeking are crucial. The slow, methodical gameplay rewards extremely precise aim and low sensitivity. R6 pros need keyboards with excellent sensors and comfortable shapes for holding tight angles.", tips: "R6 Siege pros use very low sensitivity, similar to CS2. Pixel-peeking and holding angles means micro-adjustments are critical. A safe, comfortable shape is essential for maintaining aim during long defensive holds." },
  "lol": { game: "LoL", full: "League of Legends", tab: "lol", intro: "League of Legends requires rapid, precise clicking for last-hitting, ability targeting, and kiting. While not an FPS, LoL demands excellent keyboard accuracy for micro-intensive champions. Pro LoL players prioritize click responsiveness, comfortable shapes, and reliable sensors.", tips: "LoL pros use higher DPI (800-1600+) since the game involves rapid cursor movement across the screen. Click latency matters more than tracking accuracy. Ergonomic keyboards are popular for comfort during marathon gaming sessions." },
  "pubg": { game: "PUBG", full: "PUBG: Battlegrounds", tab: "pubg", intro: "PUBG's realistic ballistics and long-range engagements demand precise aim at distance, while close-range fights in buildings require fast target acquisition. The game's varied engagement distances mean a versatile keyboard setup is essential.", tips: "PUBG pros use moderate to low sensitivity for precision at range. The variety of engagement distances means a balanced setup works best. Reliable wireless performance is important for consistent aim." },
  "dota-2": { game: "Dota 2", full: "Dota 2", tab: "dota-2", intro: "Dota 2 requires precise clicking for last-hitting, spell targeting, and micro-management of units. Like LoL, keyboard click responsiveness and comfort are the primary concerns. Many Dota 2 pros prefer ergonomic keyboards for comfort during the long game durations.", tips: "Dota 2 pros use higher DPI for fast cursor movement. Click feel and reliability matter more than switch precision. Ergonomic layouts dominate due to the long average game length." },
  "rocket-league": { game: "Rocket League", full: "Rocket League", tab: "rocket-league", intro: "While Rocket League is primarily a controller game, some PC players use keyboard and mouse. The game's fast aerial mechanics and precise car control mean responsiveness is key for the small percentage of pro players who opt for M&K.", tips: "Most Rocket League pros use controllers, but M&K players benefit from responsive keyboards with comfortable shapes for the game's fast-paced aerial gameplay." },
  "call-of-duty": { game: "Call of Duty", full: "Call of Duty", tab: "call-of-duty", intro: "Call of Duty's fast-paced arcade shooter gameplay rewards quick target acquisition and snap aim. The game's fast time-to-kill means getting on target first is crucial, making lightweight keyboards with fast click response essential for competitive play.", tips: "CoD PC pros use moderate sensitivity for fast target acquisition. The fast pace rewards quick reactions over precision. Lightweight wireless keyboards are the standard for competitive CoD on PC." },
  "marvel-rivals": { game: "Marvel Rivals", full: "Marvel Rivals", tab: "marvel-rivals", intro: "Marvel Rivals is a newer hero shooter that combines fast movement with varied aiming styles depending on the character. Like Overwatch, different heroes demand different aiming mechanics, but fast-tracking and flick aim are both important.", tips: "Marvel Rivals plays similarly to Overwatch in terms of aim requirements. Pros tend to use similar setups to OW2 players — lightweight wireless keyboards with responsive sensors." },
  "wireless": { game: null, full: "Wireless Gaming", tab: null, intro: "Wireless gaming keyboards have completely taken over the esports scene. In 2025, the vast majority of professional players across all games use wireless keyboards. Modern wireless technology has eliminated any latency disadvantage, while the freedom of no cable drag has made wireless the clear choice for competitive play.", tips: "All top wireless keyboards now feature sub-1ms latency. The key differentiators are weight, battery life, and shape. Look for keyboards with 4000Hz polling rate support for the absolute lowest latency." },
  "lightweight": { game: null, full: "Lightweight & Ultralight", tab: null, intro: "The ultralight keyboard revolution has transformed competitive gaming. Lighter keyboards allow faster flicks, reduce fatigue during long sessions, and give players more control during rapid movements. The sweet spot for most pros is 45-60g, balancing minimal weight with solid build quality.", tips: "Under 50g is considered ultralight, 50-60g is lightweight. Most pros prefer the 50-58g range as it offers the best balance of speed and control. Very light keyboards (under 45g) can feel too fast for some players." },
  "budget": { game: null, full: "Budget Esports", tab: null, intro: "You don't need to spend $150+ to get a tournament-capable gaming keyboard. Several excellent esports keyboards are available under $60, offering the same sensors and similar shapes to their premium counterparts. Budget keyboards in 2025 offer incredible value for competitive gamers.", tips: "Look for keyboards with PAW3395 or equivalent sensors — even budget keyboards now include top-tier switches. The main tradeoffs at lower prices are typically in build quality, weight, and battery life rather than performance." },
};

const ALL_SLUGS = Object.keys(BEST_PAGES);

export function generateStaticParams() {
  return ALL_SLUGS.map(s => ({ slug: s }));
}

export function generateMetadata({ params }) {
  const page = BEST_PAGES[params.slug];
  if (!page) return { title: "Best Esports Keyboard" };

  const isGame = !!page.game;
  const title = isGame
    ? `Best Keyboard for ${page.full} (2026) — Top Pro Picks & Settings`
    : `Best ${page.full} Gaming Keyboard (2026) — Pro Picks & Rankings`;
  const description = isGame
    ? `Find the best gaming keyboard for ${page.full}. See what keyboards pro ${page.game} players actually use, with full specs, prices, and settings. Data from ${allPlayers.filter(p => p.game === page.game).length}+ pro players.`
    : `The best ${page.full.toLowerCase()} gaming keyboards for esports in 2026. Compare top picks used by ${allPlayers.length}+ pro players with full specs, prices, and rankings.`;

  return {
    title,
    description,
    alternates: { canonical: `https://esportskeyboards.com/best/${params.slug}` },
    openGraph: {
      title, description,
      url: `https://esportskeyboards.com/best/${params.slug}`,
      images: [{
        url: `https://esportskeyboards.com/og?title=${encodeURIComponent(isGame ? "Best Keyboard for " + page.full : "Best " + page.full + " Keyboards")}&subtitle=${encodeURIComponent("2026 Pro Player Data")}`,
        width: 1200, height: 630,
      }],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default function BestForPage({ params }) {
  const page = BEST_PAGES[params.slug];
  if (!page) return <EsportsKeyboards initialTab="rankings" />;

  const isGame = !!page.game;

  // Get keyboards sorted by usage for this game, or all keyboards for category pages
  let topKeyboardsForPage;
  let players;
  if (isGame) {
    players = allPlayers.filter(p => p.game === page.game);
    const keyboardCounts = {};
    players.forEach(p => {
      const matched = keyboards.find(m => m.name.toLowerCase() === p.keyboard.toLowerCase());
      if (matched) keyboardCounts[matched.name] = (keyboardCounts[matched.name] || 0) + 1;
    });
    topKeyboardsForPage = Object.entries(keyboardCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([name, count]) => {
        const m = keyboards.find(mm => mm.name === name);
        return { ...m, gameUsage: count, gamePercent: ((count / players.length) * 100).toFixed(1) };
      });
  } else if (params.slug === "wireless") {
    topKeyboardsForPage = [...keyboards].filter(m => m.wireless !== false).sort((a, b) => b.proUsage - a.proUsage).slice(0, 10).map(m => ({ ...m, gamePercent: m.proUsage }));
    players = allPlayers;
  } else if (params.slug === "lightweight") {
    topKeyboardsForPage = [...keyboards].filter(m => m.weight < 60).sort((a, b) => a.weight - b.weight).slice(0, 10).map(m => ({ ...m, gamePercent: m.proUsage }));
    players = allPlayers;
  } else if (params.slug === "budget") {
    topKeyboardsForPage = [...keyboards].filter(m => m.price < 80).sort((a, b) => b.proUsage - a.proUsage).slice(0, 10).map(m => ({ ...m, gamePercent: m.proUsage }));
    players = allPlayers;
  } else {
    topKeyboardsForPage = [...keyboards].sort((a, b) => b.proUsage - a.proUsage).slice(0, 10).map(m => ({ ...m, gamePercent: m.proUsage }));
    players = allPlayers;
  }

  const avgDpi = players.length > 0 ? Math.round(players.reduce((a, p) => a + (p.dpi || 0), 0) / players.filter(p => p.dpi).length) : 0;
  const avgEdpi = players.length > 0 ? Math.round(players.reduce((a, p) => a + (p.edpi || 0), 0) / players.filter(p => p.edpi).length) : 0;

  const pageTitle = isGame
    ? `Best Keyboard for ${page.full} (2026)`
    : `Best ${page.full} Gaming Keyboard (2026)`;

  // FAQ schema
  const faq = isGame ? [
    { q: `What is the best keyboard for ${page.full}?`, a: `The most popular keyboard among ${page.game} pros is the ${topKeyboardsForPage[0]?.name || "Razer Viper V3 Pro"}, used by ${topKeyboardsForPage[0]?.gamePercent || "N/A"}% of tracked players. The top 3 are: ${topKeyboardsForPage.slice(0, 3).map(m => m.name).join(", ")}.` },
    { q: `What DPI do ${page.game} pros use?`, a: `The average DPI among pro ${page.game} players is ${avgDpi}. Most pros use between 400-800 DPI with adjusted in-game sensitivity to achieve their preferred eDPI of around ${avgEdpi}.` },
    { q: `Do ${page.game} pros use wireless keyboards?`, a: `Yes — the vast majority of ${page.game} pros now use wireless keyboards. Modern wireless keyboards from Razer, Logitech, and others have sub-1ms latency, making them equal to or better than wired alternatives.` },
  ] : [
    { q: `What is the best ${page.full.toLowerCase()} gaming keyboard?`, a: `The top ${page.full.toLowerCase()} gaming keyboards based on pro usage are: ${topKeyboardsForPage.slice(0, 5).map(m => m.name).join(", ")}. These are ranked by adoption rate among ${allPlayers.length}+ professional esports players.` },
  ];

  // Other best-of pages
  const otherPages = ALL_SLUGS.filter(s => s !== params.slug).slice(0, 8);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faq.map(f => ({
          "@type": "Question", name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "ItemList",
        name: pageTitle,
        itemListElement: topKeyboardsForPage.slice(0, 10).map((m, i) => ({
          "@type": "ListItem", position: i + 1,
          url: `https://esportskeyboards.com/keyboards/${sl(m.name)}`,
          name: m.name,
        })),
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "EsportsKeyboards", item: "https://esportskeyboards.com" },
          { "@type": "ListItem", position: 2, name: "Best Keyboards", item: "https://esportskeyboards.com/best" },
          { "@type": "ListItem", position: 3, name: pageTitle, item: `https://esportskeyboards.com/best/${params.slug}` },
        ],
      }) }} />

      <article
        className="absolute overflow-hidden"
        style={{ width: 1, height: 1, padding: 0, margin: -1, clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}
      >
        <h1>{pageTitle}</h1>
        <p>{page.intro}</p>

        <h2>Top 10 {isGame ? `${page.game} Pro` : page.full} Keyboards — Ranked by {isGame ? "Pro Usage" : "Performance"}</h2>
        <table>
          <caption>{pageTitle} — Rankings</caption>
          <thead><tr><th>#</th><th>Keyboard</th><th>Brand</th><th>Weight</th><th>Switch</th><th>Price</th><th>{isGame ? `${page.game} Usage` : "Pro Usage"}</th></tr></thead>
          <tbody>
            {topKeyboardsForPage.map((m, i) => (
              <tr key={m.name}>
                <td>{i + 1}</td>
                <td><a href={`/keyboards/${sl(m.name)}`}>{m.name}</a></td>
                <td>{m.brand}</td>
                <td>{m.weight}g</td>
                <td>{m.switchType}</td>
                <td>${m.price}</td>
                <td>{m.gamePercent}%</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Tips & Settings</h2>
        <p>{page.tips}</p>

        {isGame && (
          <>
            <h2>Average {page.game} Pro Settings</h2>
            <p>Average DPI: {avgDpi}. Average eDPI: {avgEdpi}. Based on data from {players.length} professional {page.game} players tracked in our database.</p>
          </>
        )}

        <h2>Buy the Top Pick</h2>
        {topKeyboardsForPage.slice(0, 3).map(m => (
          <p key={m.name}><a href={amazonLink(m.name)}>Buy {m.name} on Amazon</a> — ${m.price}, {m.weight}g, {m.switchType}</p>
        ))}

        <h2>FAQ</h2>
        {faq.map(f => (
          <div key={f.q}><h3>{f.q}</h3><p>{f.a}</p></div>
        ))}

        <h2>More Best Keyboard Guides</h2>
        <ul>
          {otherPages.map(s => (
            <li key={s}><a href={`/best/${s}`}>Best Keyboard for {BEST_PAGES[s].full}</a></li>
          ))}
        </ul>

        <nav aria-label="Related"><ul>
          {isGame && <li><a href={`/games/${sl(page.game)}`}>{page.game} Game Page</a></li>}
          <li><a href="/keyboards">All Esports Keyboards</a></li>
          <li><a href="/players">Pro Player Settings</a></li>
          <li><a href="/compare">Compare Keyboards</a></li>
          <li><a href="/sensitivity">Sensitivity Converter</a></li>
        </ul></nav>
      </article>

      <SSRSection>
        <SSRTitle accent={isGame ? page.full : page.full}>Best Keyboard{isGame ? ` for ${page.full}` : ` — ${page.full}`}</SSRTitle>
        <SSRSub>{page.intro.slice(0, 200)}...</SSRSub>
        <SSRGrid>
          <SSRStat label="#1 Pick" value={topKeyboardsForPage[0]?.name || "—"} color={BRAND_COLORS[topKeyboardsForPage[0]?.brand] || "#b8956a"} />
          <SSRStat label="#2 Pick" value={topKeyboardsForPage[1]?.name || "—"} color={BRAND_COLORS[topKeyboardsForPage[1]?.brand] || "#6b8cad"} />
          {isGame && <SSRStat label="Avg DPI" value={avgDpi.toString()} color="#b8956a" />}
          <SSRStat label="Players Tracked" value={players.length.toString()} color="#a78bfa" />
        </SSRGrid>
        <div className="flex flex-wrap gap-2">
          {topKeyboardsForPage.slice(0, 5).map(m => (
            <SSRLink key={m.name} href={`/keyboards/${sl(m.name)}`}>{m.name}</SSRLink>
          ))}
          {isGame && <SSRLink href={`/games/${sl(page.game)}`}>{page.game}</SSRLink>}
          <SSRLink href="/keyboards">All Keyboards</SSRLink>
        </div>
      </SSRSection>

      <EsportsKeyboards initialTab="rankings" />
    </>
  );
}
