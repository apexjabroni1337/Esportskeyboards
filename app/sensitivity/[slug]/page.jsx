import EsportsKeyboards from "@/components/ClientApp";
import { keyboards, allPlayers } from "@/data";

const sl = (n) => n.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");

const GAME_SENS_INFO = {
  "CS2": { fullName: "Counter-Strike 2", sensMultiplier: 0.022, unit: "in-game sensitivity", example: "0.8-1.2 @ 800 Mouse DPI", notes: "CS2 uses the same sensitivity scale as CS:GO. The formula for cm/360 is: 360 / (Mouse DPI × sensitivity × 0.022). Most pros use 800 Mouse DPI with in-game sensitivity between 0.5 and 1.5." },
  "Valorant": { fullName: "Valorant", sensMultiplier: 0.07, unit: "in-game sensitivity", example: "0.25-0.45 @ 800 Mouse DPI", notes: "Valorant sensitivity is approximately 3.18× CS2 sensitivity. To convert CS2 sens to Valorant, divide by 3.18. Most Valorant pros use 800 Mouse DPI with sensitivity between 0.2 and 0.5." },
  "Fortnite": { fullName: "Fortnite", sensMultiplier: 0.5555, unit: "X/Y sensitivity %", example: "5-8% @ 800 Mouse DPI", notes: "Fortnite uses percentage-based sensitivity. Building and editing sensitivity are separate from aim sensitivity. Most competitive Fortnite players prefer different sensitivity settings for building vs. aiming." },
  "Apex": { fullName: "Apex Legends", sensMultiplier: 0.022, unit: "in-game sensitivity", example: "1.0-2.5 @ 800 Mouse DPI", notes: "Apex Legends uses the same sensitivity engine as Source games, making its scale identical to CS2. However, Apex pros tend to use higher sensitivity than CS2 pros due to the faster movement and 360-degree engagements." },
  "Overwatch 2": { fullName: "Overwatch 2", sensMultiplier: 0.0066, unit: "in-game sensitivity", example: "3.0-6.0 @ 800 Mouse DPI", notes: "Overwatch 2 sensitivity is roughly 3.33× CS2 sensitivity. Hero-specific sensitivity multipliers exist, so many players adjust per-hero. Hitscan DPS players tend to use lower sensitivity than support or tank players." },
  "R6 Siege": { fullName: "Rainbow Six Siege", sensMultiplier: 0.00572958, unit: "in-game sensitivity", example: "7-15 @ 800 Mouse DPI", notes: "R6 Siege has a unique sensitivity system with separate multipliers for different zoom levels. The base sensitivity scale is different from most other FPS games." },
  "Call of Duty": { fullName: "Call of Duty", sensMultiplier: 0.022, unit: "in-game sensitivity", example: "3.0-6.0 @ 800 Mouse DPI", notes: "Call of Duty PC sensitivity varies by title. Most competitive CoD players use relatively high sensitivity for the fast-paced gameplay and quick turning requirements." },
  "PUBG": { fullName: "PUBG: Battlegrounds", sensMultiplier: 0.002222, unit: "in-game sensitivity", example: "30-45 @ 800 Mouse DPI", notes: "PUBG uses a different sensitivity scale than most shooters. Separate sensitivity settings exist for different scopes and ADS levels. Most pros customize each zoom level independently." },
  "Quake Champions": { fullName: "Quake Champions", sensMultiplier: 0.022, unit: "in-game sensitivity", example: "1.5-3.5 @ 800 Mouse DPI", notes: "Quake Champions players typically use higher sensitivity than tactical shooter players due to the arena FPS gameplay requiring rapid 180-degree turns and vertical tracking." },
  "Marvel Rivals": { fullName: "Marvel Rivals", sensMultiplier: 0.07, unit: "in-game sensitivity", example: "3.0-6.0 @ 800 Mouse DPI", notes: "Marvel Rivals is a newer title with an evolving competitive scene. Sensitivity preferences are still being established as the meta develops." },
  "Deadlock": { fullName: "Deadlock", sensMultiplier: 0.022, unit: "in-game sensitivity", example: "1.0-2.5 @ 800 Mouse DPI", notes: "Deadlock uses Valve's Source 2 engine, so its sensitivity scale is very similar to CS2. As a MOBA-shooter hybrid, players tend to use slightly higher sensitivity than pure tactical shooters." },
  "LoL": { fullName: "League of Legends", sensMultiplier: null, unit: "Windows Mouse DPI", example: "800-1600 Mouse DPI", notes: "League of Legends does not have an in-game sensitivity slider in the same way FPS games do. Cursor speed is controlled primarily through Mouse DPI and Windows pointer speed. Most LoL pros use 800-1600 Mouse DPI." },
  "Dota 2": { fullName: "Dota 2", sensMultiplier: null, unit: "Windows Mouse DPI", example: "800-1200 Mouse DPI", notes: "Like League of Legends, Dota 2 cursor speed is primarily Mouse DPI-based. Most Dota 2 pros use 800-1200 Mouse DPI. Camera movement and precision clicking are more relevant than aiming sensitivity." },
  "Rocket League": { fullName: "Rocket League", sensMultiplier: null, unit: "camera/controller", example: "Controller dominant", notes: "Rocket League is played almost exclusively with controllers at the professional level. Sensitivity is not a primary concern, though some players use mouse for menus." },
};

function getGameData(gameName) {
  const players = allPlayers.filter(p => p.game === gameName);
  const dpis = players.map(p => p.dpi).filter(d => d && d > 0).sort((a, b) => a - b);
  const edpis = players.map(p => p.edpi).filter(e => e && e > 0).sort((a, b) => a - b);
  const avgDpi = dpis.length ? Math.round(dpis.reduce((a, b) => a + b, 0) / dpis.length) : 0;
  const avgEdpi = edpis.length ? Math.round(edpis.reduce((a, b) => a + b, 0) / edpis.length) : 0;
  const medianEdpi = edpis.length ? edpis[Math.floor(edpis.length / 2)] : 0;
  const minEdpi = edpis.length ? edpis[0] : 0;
  const maxEdpi = edpis.length ? edpis[edpis.length - 1] : 0;

  const keyboardCounts = {};
  players.forEach(p => { if (p.keyboard) keyboardCounts[p.keyboard] = (keyboardCounts[p.keyboard] || 0) + 1; });
  const topKeyboards = Object.entries(keyboardCounts).sort((a, b) => b[1] - a[1]).slice(0, 10);

  const dpiDist = { "400": 0, "800": 0, "1600": 0, "other": 0 };
  dpis.forEach(d => {
    if (d === 400) dpiDist["400"]++;
    else if (d >= 800 && d <= 800) dpiDist["800"]++;
    else if (d === 1600) dpiDist["1600"]++;
    else dpiDist["other"]++;
  });

  return { players, dpis, edpis, avgDpi, avgEdpi, medianEdpi, minEdpi, maxEdpi, topKeyboards, dpiDist };
}

const ALL_GAMES = Object.keys(GAME_SENS_INFO);

export function generateStaticParams() {
  return ALL_GAMES.map(g => ({ slug: sl(g) }));
}

export function generateMetadata({ params }) {
  const gameName = ALL_GAMES.find(g => sl(g) === params.slug);
  if (!gameName) return { title: "Game Not Found" };

  const info = GAME_SENS_INFO[gameName];
  const { players, avgDpi, avgEdpi, medianEdpi } = getGameData(gameName);
  const description = `${info.fullName} pro player keyboard settings — ${players.length} players tracked. Find pros using the same keyboards and gear.`;

  return {
    title: `${info.fullName} Pro Sensitivity Settings`,
    description,
    alternates: { canonical: `https://esportskeyboards.com/sensitivity/${params.slug}` },
    openGraph: {
      title: `${info.fullName} Pro Sensitivity Settings`,
      description,
      url: `https://esportskeyboards.com/sensitivity/${params.slug}`,
      images: [{ url: `https://esportskeyboards.com/og?title=${encodeURIComponent(info.fullName + ' Sensitivity')}&subtitle=${encodeURIComponent(`${players.length} Pro Players · Keyboard & Settings Guide`)}`, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default function SensitivityGamePage({ params }) {
  const gameName = ALL_GAMES.find(g => sl(g) === params.slug);
  if (!gameName) {
    return (
      <>
        <div style={{ padding: 40, textAlign: "center", color: "#1a1614" }}><h1>Game Not Found</h1></div>
        <EsportsKeyboards initialTab="sensitivity" />
      </>
    );
  }

  const info = GAME_SENS_INFO[gameName];
  const { players, avgDpi, avgEdpi, medianEdpi, minEdpi, maxEdpi, topKeyboards } = getGameData(gameName);

  // Get top players by name recognition (those with full profiles)
  const topPlayers = players.filter(p => p.hasProfile).slice(0, 20);
  if (topPlayers.length < 20) {
    players.filter(p => !p.hasProfile).slice(0, 20 - topPlayers.length).forEach(p => topPlayers.push(p));
  }

  const otherGames = ALL_GAMES.filter(g => g !== gameName);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: `${info.fullName} Pro Player Keyboard and Sensitivity Guide`,
        description: `Complete guide to ${info.fullName} keyboard settings and sensitivity. ${players.length} pro players tracked with detailed keyboard preferences.`,
        url: `https://esportskeyboards.com/sensitivity/${params.slug}`,
        about: { "@type": "VideoGame", name: info.fullName },
      }) }} />

      <article
        className="absolute overflow-hidden"
        style={{ width: 1, height: 1, padding: 0, margin: -1, clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}
      >
        <h1>{info.fullName} Pro Player Keyboard Settings and Gear</h1>

        <h2>About {info.fullName}</h2>
        <p>{info.notes}</p>
        <p>
          We track {players.length} professional {info.fullName} players and their complete keyboard setups.
        </p>

        <h2>Top {info.fullName} Pro Players</h2>
        <table>
          <caption>Professional {info.fullName} player keyboard settings</caption>
          <thead><tr><th>Player</th><th>Team</th><th>Keyboard</th></tr></thead>
          <tbody>
            {topPlayers.map((p, i) => (
              <tr key={i}>
                <td><a href={`/players/${sl(p.name)}`}>{p.name}</a></td>
                <td>{p.team}</td>
                <td><a href={`/keyboards/${sl(p.keyboard)}`}>{p.keyboard}</a></td>
              </tr>
            ))}
          </tbody>
        </table>

        {topKeyboards.length > 0 && (
          <>
            <h2>Most Popular Keyboards in {info.fullName}</h2>
            <table>
              <caption>Most used gaming keyboards among professional {info.fullName} players</caption>
              <thead><tr><th>Keyboard</th><th>Players</th></tr></thead>
              <tbody>
                {topKeyboards.map(([m, count]) => (
                  <tr key={m}><td><a href={`/keyboards/${sl(m)}`}>{m}</a></td><td>{count}</td></tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        <h2>Other Game Sensitivity Guides</h2>
        <nav>
          <ul>
            {otherGames.map(g => <li key={g}><a href={`/sensitivity/${sl(g)}`}>{GAME_SENS_INFO[g].fullName} Sensitivity Settings</a></li>)}
            <li><a href="/sensitivity">Sensitivity Converter Tool</a></li>
            <li><a href={`/games/${sl(gameName)}`}>{info.fullName} Pro Players</a></li>
          </ul>
        </nav>
      </article>

      <EsportsKeyboards initialTab="sensitivity" />
    </>
  );
}
