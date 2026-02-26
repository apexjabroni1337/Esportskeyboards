export const dynamic = "force-dynamic";
import EsportsKeyboards from "@/components/ClientApp";
import { SSRSection, SSRTitle, SSRSub, SSRGrid, SSRStat, SSRLink, SSRDivider } from "@/components/ssr";
import { allPlayers, proPlayers, keyboards, GAME_DESCRIPTIONS, GAME_IMAGE_URLS, BRAND_COLORS } from "@/data";

const slug = (n) => n.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");
const GREEN = "#b8956a";
const findKeyboard = (name) => name ? keyboards.find((m) => name.includes(m.name) || m.name.includes(name)) : undefined;
const mSlug = (name) => { const m = findKeyboard(name); return m ? slug(m.name) : null; };

const ALL_GAMES = [...new Set(allPlayers.map((p) => p.game))].filter(Boolean).sort((a, b) =>
  allPlayers.filter((p) => p.game === b).length - allPlayers.filter((p) => p.game === a).length
);

export function generateStaticParams() {
  return ALL_GAMES.map((game) => ({ slug: slug(game) }));
}

export function generateMetadata({ params }) {
  const game = ALL_GAMES.find((g) => slug(g) === params.slug);
  if (!game) return { title: "Game Not Found" };
  const players = allPlayers.filter((p) => p.game === game);
  const counts = {};
  players.forEach((p) => { counts[p.keyboard] = (counts[p.keyboard] || 0) + 1; });
  const topMouse = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || "";

  const description = `${game} keyboard settings for ${players.length}+ pro players. Top keyboard: ${topMouse}. Complete keyboard usage data, brand splits, and player profiles.`;
  return {
    title: `${game} — Pro Player Keyboard Settings & Gear`,
    description,
    alternates: { canonical: `https://esportskeyboards.com/games/${params.slug}` },
    openGraph: {
      title: `${game} — Pro Player Keyboard Settings & Gear`,
      description,
      url: `https://esportskeyboards.com/games/${params.slug}`,
      images: [{
        url: `https://esportskeyboards.com/og?title=${encodeURIComponent(game)}&subtitle=${encodeURIComponent(`${players.length}+ Players · Top Keyboard: ${topMouse}`)}`,
        width: 1200, height: 630, alt: `${game} keyboard ranking settings`,
      }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${game} — Pro Player Keyboard Settings & Gear`,
      description,
      images: [`https://esportskeyboards.com/og?title=${encodeURIComponent(game)}&subtitle=${encodeURIComponent(`${players.length}+ Players · Top Keyboard: ${topMouse}`)}`],
    },
  };
}

export default function GameDetailPage({ params }) {
  const game = ALL_GAMES.find((g) => slug(g) === params.slug);
  if (!game) return <EsportsKeyboards initialTab="games" />;

  const players = allPlayers.filter((p) => p.game === game);
  const gamePros = proPlayers.filter((p) => p.game === game);
  const desc = GAME_DESCRIPTIONS[game];


  // Keyboard popularity
  const keyboardCounts = {};
  players.forEach((p) => { if (p.keyboard) { keyboardCounts[p.keyboard] = (keyboardCounts[p.keyboard] || 0) + 1; } });
  const topKeyboards = Object.entries(keyboardCounts).sort((a, b) => b[1] - a[1]);

  // Brand market share
  const brandCounts = {};
  players.forEach((p) => {
    const m = findKeyboard(p.keyboard);
    if (m) brandCounts[m.brand] = (brandCounts[m.brand] || 0) + 1;
  });
  const topBrands = Object.entries(brandCounts).sort((a, b) => b[1] - a[1]);


  // Teams
  const teamCounts = {};
  players.forEach((p) => {
    if (p.team && p.team !== "Free Agent" && p.team !== "Retired" && p.team !== "Content") {
      teamCounts[p.team] = (teamCounts[p.team] || 0) + 1;
    }
  });
  const topTeams = Object.entries(teamCounts).sort((a, b) => b[1] - a[1]).slice(0, 15);

  // Weight preference
  const miceUsed = topKeyboards.slice(0, 15).map(([name]) => findKeyboard(name)).filter(Boolean);
  const avgWeight = miceUsed.length > 0 ? Math.round(miceUsed.reduce((a, m) => a + m?.weight, 0) / miceUsed.length) : 0;

  const otherGames = ALL_GAMES.filter((g) => g !== game);

  return (
    <>
      {/* JSON-LD VideoGame structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "VideoGame",
        name: game,
        description: desc || `Professional ${game} keyboard settings and gear database. ${players.length} tracked pro players.`,
        url: `https://esportskeyboards.com/games/${params.slug}`,
        numberOfPlayers: String(players.length),
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://esportskeyboards.com" },
          { "@type": "ListItem", position: 2, name: "Games", item: "https://esportskeyboards.com/games" },
          { "@type": "ListItem", position: 3, name: game, item: `https://esportskeyboards.com/games/${params.slug}` },
        ],
      }) }} />
      {/* Hidden deep SEO content */}
      <article
        className="absolute overflow-hidden"
        style={{ width: 1, height: 1, padding: 0, margin: -1, clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}
        itemScope itemType="https://schema.org/VideoGame"
      >
        <h1 itemProp="name">{game} — Professional Player Keyboard Settings and Gear</h1>
        <meta itemProp="numberOfPlayers" content={String(players.length)} />
        <meta itemProp="url" content={`https://esportskeyboards.com/games/${params.slug}`} />

        <h2>About {game} Keyboard Meta</h2>
        {desc && <p itemProp="description">{desc}</p>}
        <p>
          We track {players.length} professional {game} players and their complete keyboard setups.
          The most popular keyboard is {topKeyboards[0]?.[0]} with {topKeyboards[0]?.[1]} players ({Math.round((topKeyboards[0]?.[1] || 0) / players.length * 100)}%).
          The dominant brand is {topBrands[0]?.[0]} with {Math.round((topBrands[0]?.[1] || 0) / players.length * 100)}% market share.
          The average weight of keyboards used by {game} pros is {avgWeight}g.
        </p>

        <h2>{game} Keyboard Usage Rankings</h2>
        <table>
          <caption>Most popular keyboards among {game} professional players</caption>
          <thead><tr><th>Rank</th><th>Keyboard</th><th>Players</th><th>Usage %</th><th>Brand</th><th>Weight</th><th>Price</th></tr></thead>
          <tbody>
            {topKeyboards.slice(0, 20).map(([kbdName, count], i) => {
              const ms = mSlug(kbdName);
              const md = findKeyboard(kbdName);
              return (
                <tr key={kbdName}>
                  <td>{i + 1}</td>
                  <td>{ms ? <a href={`/keyboards/${ms}`}>{kbdName}</a> : kbdName}</td>
                  <td>{count}</td>
                  <td>{Math.round(count / players.length * 100)}%</td>
                  <td>{md ? <a href={`/brands/${md?.brand?.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-")}`}>{md?.brand}</a> : "—"}</td>
                  <td>{md ? `${md?.weight || "?"}g` : "—"}</td>
                  <td>{md ? `$${md?.price || "?"}` : "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <h2>{game} Brand Market Share</h2>
        <table>
          <caption>Keyboard brand popularity among {game} pros</caption>
          <thead><tr><th>Rank</th><th>Brand</th><th>Players</th><th>Market Share</th></tr></thead>
          <tbody>
            {topBrands.map(([brand, count], i) => (
              <tr key={brand}>
                <td>{i + 1}</td>
                <td><a href={`/brands/${brand.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-")}`}>{brand}</a></td>
                <td>{count}</td>
                <td>{Math.round(count / players.length * 100)}%</td>
              </tr>
            ))}
          </tbody>
        </table>


        {gamePros.length > 0 && (
          <>
            <h2>All {game} Pro Players with Detailed Profiles</h2>
            <p>{gamePros.length} {game} professionals with full bios, achievements, keyboard history, and settings:</p>
            <table>
              <caption>{game} pro player profiles</caption>
              <thead><tr><th>Player</th><th>Team</th><th>Role</th><th>Keyboard</th><th>Country</th></tr></thead>
              <tbody>
                {gamePros.map((p) => {
                  const ms = mSlug(p.keyboard);
                  return (
                    <tr key={p.name}>
                      <td><a href={`/players/${slug(p.name)}`}>{p.name}</a></td>
                      <td>{p.team}</td>
                      <td>{p.role}</td>
                      <td>{ms ? <a href={`/keyboards/${ms}`}>{p.keyboard}</a> : p.keyboard}</td>
                      <td>{p.country}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}

        {topTeams.length > 0 && (
          <>
            <h2>Top {game} Teams</h2>
            <ul>
              {topTeams.map(([team, count]) => {
                const teamPros = gamePros.filter((p) => p.team === team);
                return (
                  <li key={team}>
                    {team} — {count} players tracked
                    {teamPros.length > 0 && (
                      <> ({teamPros.map((p, i) => (
                        <span key={p.name}>{i > 0 && ", "}<a href={`/players/${slug(p.name)}`}>{p.name}</a></span>
                      ))})</>
                    )}
                  </li>
                );
              })}
            </ul>
          </>
        )}

        <h2>Frequently Asked Questions About {game} Keyboard Settings</h2>
        <dl>
          <dt>What is the most popular keyboard in {game}?</dt>
          <dd>The {topKeyboards[0]?.[0]} is used by {topKeyboards[0]?.[1]} {game} pros ({Math.round((topKeyboards[0]?.[1] || 0) / players.length * 100)}%). {topKeyboards[1] && `Second is the ${topKeyboards[1][0]} with ${topKeyboards[1][1]} players.`}</dd>


          <dt>What brand is most popular in {game}?</dt>
          <dd>{topBrands[0]?.[0]} dominates {game} with {Math.round((topBrands[0]?.[1] || 0) / players.length * 100)}% market share, followed by {topBrands[1]?.[0]} at {Math.round((topBrands[1]?.[1] || 0) / players.length * 100)}%.</dd>

          <dt>What keyboards do {game} pros use?</dt>
          <dd>The {topKeyboards[0]?.[0]} is the most popular choice, used by {topKeyboards[0]?.[1]} {game} pros. Keyboard choice matters more than specific sensitivity settings—focus on a keyboard that feels comfortable for your hand size and playstyle.</dd>
        </dl>

        <nav aria-label="Other esports games">
          <h2>Other Esports Games</h2>
          <ul>
            {otherGames.map((g) => (
              <li key={g}>
                <a href={`/games/${slug(g)}`}>{g} Keyboard Settings</a>
                {" "}— {allPlayers.filter((p) => p.game === g).length} players
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Related pages">
          <h2>Related Pages</h2>
          <ul>
            <li><a href="/games">All Games Overview</a></li>
            <li><a href="/players">All Pro Players</a></li>
            <li><a href="/keyboards">All Esports Keyboards</a></li>
            <li><a href={`/sensitivity/${game.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}`}>Sensitivity Converter — Convert {game} Settings</a></li>
            <li><a href="/brands">Keyboard Brand Comparison</a></li>
            <li><a href="/switches">Switch Comparison</a></li>
            <li><a href="/compare">Compare Keyboards Side by Side</a></li>
            <li><a href="/trends">Industry Trends</a></li>
            <li><a href="/shapes">Keyboard Layout Overlay</a></li>
            <li><a href="/lab">Keyboard Finder Quiz</a></li>
            <li><a href="/">EsportsKeyboards Home</a></li>
          </ul>
        </nav>
      </article>

      {/* Visible SSR content */}
      <SSRSection>
        <div style={{
          height: 3,
          width: "100%",
          background: game,
          borderRadius: "1px",
          marginBottom: "16px"
        }} />
        <SSRTitle accent={game}>Keyboard Settings</SSRTitle>
        <SSRSub>
          {desc || `Complete keyboard usage data for ${players.length} professional ${game} players. Top keyboard: ${topKeyboards[0]?.[0]}.`}
        </SSRSub>
        <SSRGrid>
          <SSRStat label="Players" value={players.length} color={GREEN} />
          <SSRStat label="Top Keyboard" value={topKeyboards[0]?.[0]?.replace(/(Wooting |Razer |Logitech |SteelSeries |Corsair |Cherry |Ducky |DrunkDeer |Endgame Gear |ASUS |Keychron |Glorious )/, "") || "—"} color={GREEN} />
        </SSRGrid>
        <div style={{ marginTop: "20px", marginBottom: "20px" }}>
          <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#a09890" }}>
            Keyboard Usage Rankings
          </p>
          <div style={{
            border: "1px solid #e8e4df",
            borderRadius: "8px",
            overflow: "hidden",
            fontSize: "14px"
          }}>
            {topKeyboards.slice(0, 5).map(([kbdName, count], i) => {
              const ms = mSlug(kbdName);
              const md = findKeyboard(kbdName);
              return (
                <div key={kbdName} style={{
                  padding: "12px 16px",
                  background: i % 2 === 0 ? "#ffffff" : "#f5f2ee",
                  borderBottom: i < 4 ? "1px solid #e8e4df" : "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px"
                }}>
                  <span style={{
                    fontWeight: "bold",
                    color: GREEN,
                    minWidth: "24px"
                  }}>#{i + 1}</span>
                  <span style={{
                    fontWeight: "bold",
                    color: GREEN,
                    flex: 1
                  }}>
                    {ms ? <a href={`/keyboards/${ms}`} style={{ color: GREEN, textDecoration: "none" }}>{kbdName}</a> : kbdName}
                  </span>
                  <span style={{ color: "#6b635b" }}>{count} {count === 1 ? "player" : "players"}</span>
                </div>
              );
            })}
          </div>
        </div>
        {gamePros.length > 0 && (
          <>
            <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#a09890" }}>
              Featured {game} pros
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {gamePros.slice(0, 8).map((p) => (
                <SSRLink key={p.name} href={`/players/${slug(p.name)}`} style={{
                  borderRadius: "20px",
                  padding: "6px 14px",
                  fontSize: "12px"
                }}>{p.name}</SSRLink>
              ))}
            </div>
          </>
        )}
        <SSRDivider />
        <div className="flex flex-wrap gap-2">
          <SSRLink href="/games">All Games</SSRLink>
          <SSRLink href="/players">All Players</SSRLink>
          <SSRLink href="/keyboards">All Keyboards</SSRLink>
          <SSRLink href="/sensitivity">Sensitivity</SSRLink>
          {otherGames.slice(0, 4).map((g) => (
            <SSRLink key={g} href={`/games/${slug(g)}`}>{g}</SSRLink>
          ))}
        </div>
      </SSRSection>

      <EsportsKeyboards initialTab="games" initialGameSlug={params.slug} />
    </>
  );
}
