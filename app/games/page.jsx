import EsportsKeyboards from "@/components/ClientApp";
import { SSRSection, SSRTitle, SSRSub, SSRGrid, SSRStat, SSRLink, SSRDivider } from "@/components/ssr";
import { allPlayers, keyboards, proPlayers, GAME_DESCRIPTIONS } from "@/data";

const slug = (n) => n.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");
const findKeyboard = (name) => name ? keyboards.find((m) => name.includes(m.name) || m.name.includes(name)) : undefined;
const mSlug = (name) => { const m = findKeyboard(name); return m ? slug(m.name) : null; };

export const metadata = {
  title: "Games — Keyboard DNA by Esports Title",
  description: "Discover which keyboards dominate each esports game. CS2, Valorant, League of Legends, Fortnite, Apex Legends, Dota 2, Call of Duty, R6 Siege and more — brand splits, top keyboards, and gear culture per game.",
  alternates: { canonical: "https://esportskeyboards.com/games" },
  openGraph: {
    title: "Games — Keyboard DNA by Esports Title",
    description: "Discover which keyboards dominate each esports game. Brand splits, top keyboards, and gear culture per game.",
    url: "https://esportskeyboards.com/games",
    images: [{ url: "https://esportskeyboards.com/og?title=Games&subtitle=Keyboard+DNA+%C2%B7+13+Esports+Titles+%C2%B7+Brand+Splits+%C2%B7+Pro+Gear", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function GamesPage() {
  const games = [...new Set(allPlayers.map((p) => p.game))].sort((a, b) =>
    allPlayers.filter((p) => p.game === b).length - allPlayers.filter((p) => p.game === a).length
  );
  const totalPlayers = allPlayers.length;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "ItemList",
        name: "Esports Games — Keyboard Usage by Title",
        description: `Keyboard preferences across ${games.length} major esports games`,
        numberOfItems: games.length,
        itemListElement: games.map((g, i) => ({
          "@type": "ListItem", position: i + 1,
          url: `https://esportskeyboards.com/games/${slug(g)}`,
          name: g,
        })),
      }) }} />
      <article
        className="absolute overflow-hidden"
        style={{ width: 1, height: 1, padding: 0, margin: -1, clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}
      >
        <h1>Esports Games — Keyboard DNA, Settings, and Gear Culture by Game</h1>
        <p>
          Every esports title has its own keyboard meta. Discover which keyboards, brands, and settings dominate
          across {games.length} major competitive games covering {totalPlayers.toLocaleString()} professional players.
        </p>

        <h2>All Games Overview</h2>
        <table>
          <caption>Summary of keyboard usage across {games.length} esports titles</caption>
          <thead><tr><th>Game</th><th>Players</th><th>Top Keyboard</th></tr></thead>
          <tbody>
            {games.map((game) => {
              const players = allPlayers.filter((p) => p.game === game);
              const counts = {};
              players.forEach((p) => { counts[p.keyboard] = (counts[p.keyboard] || 0) + 1; });
              const topMouse = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
              return (
                <tr key={game}>
                  <td><a href={`/games/${slug(game)}`}>{game}</a></td>
                  <td>{players.length}</td>
                  <td>{topMouse ? topMouse[0] : "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {games.map((game) => {
          const players = allPlayers.filter((p) => p.game === game);

          const keyboardCounts = {};
          players.forEach((p) => { if (p.keyboard) { keyboardCounts[p.keyboard] = (keyboardCounts[p.keyboard] || 0) + 1; } });
          const topKeyboards = Object.entries(keyboardCounts).sort((a, b) => b[1] - a[1]).slice(0, 8);

          const brandCounts = {};
          players.forEach((p) => {
            const m = findKeyboard(p.keyboard);
            if (m) brandCounts[m.brand] = (brandCounts[m.brand] || 0) + 1;
          });
          const topBrands = Object.entries(brandCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);

          const gamePros = proPlayers.filter((p) => p.game === game);
          const desc = GAME_DESCRIPTIONS[game];

          return (
            <section key={game}>
              <h2><a href={`/games/${slug(game)}`}>{game}</a> — Complete Keyboard Usage Analysis</h2>
              {desc && <p>{desc}</p>}
              <p>
                {players.length} professional {game} players tracked.
              </p>

              <h3>Most Popular Keyboards in {game}</h3>
              <ol>
                {topKeyboards.map(([kbdName, count]) => {
                  const ms = mSlug(kbdName);
                  return (
                    <li key={kbdName}>
                      {ms ? <a href={`/keyboards/${ms}`}>{kbdName}</a> : kbdName} — {count} players ({Math.round(count/players.length*100)}%)
                    </li>
                  );
                })}
              </ol>

              <h3>Brand Market Share in {game}</h3>
              <ul>
                {topBrands.map(([brand, count]) => (
                  <li key={brand}><a href="/brands">{brand}</a> — {count} players ({Math.round(count/players.length*100)}%)</li>
                ))}
              </ul>

              {gamePros.length > 0 && (
                <>
                  <h3>Top {game} Pro Players</h3>
                  <table>
                    <thead><tr><th>Player</th><th>Team</th><th>Role</th><th>Keyboard</th></tr></thead>
                    <tbody>
                      {gamePros.slice(0, 10).map((p) => {
                        const ms = mSlug(p.keyboard);
                        return (
                          <tr key={p.name}>
                            <td><a href={`/players/${slug(p.name)}`}>{p.name}</a></td>
                            <td>{p.team}</td>
                            <td>{p.role}</td>
                            <td>{ms ? <a href={`/keyboards/${ms}`}>{p.keyboard}</a> : p.keyboard}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </>
              )}
            </section>
          );
        })}

        <nav aria-label="Related"><ul>
          <li><a href="/keyboards">All Esports Keyboards</a></li>
          <li><a href="/players">Pro Player Settings</a></li>
          <li><a href="/sensitivity">Sensitivity Converter</a></li>
          <li><a href="/brands">Keyboard Brands</a></li>
          <li><a href="/switches">Switch Analytics</a></li>
          <li><a href="/trends">Industry Trends</a></li>
          <li><a href="/compare">Compare Keyboards</a></li>
          <li><a href="/">EsportsKeyboards Home</a></li>
        </ul></nav>
      </article>

      <SSRSection>
        <SSRTitle accent="Games">Keyboard DNA</SSRTitle>
        <SSRSub>Which keyboards and brands dominate across {games.length} major competitive esports titles covering {totalPlayers.toLocaleString()} professionals.</SSRSub>
        <SSRGrid>
          <SSRStat label="Games" value={games.length} color="#b8956a" />
          <SSRStat label="Total Players" value={totalPlayers.toLocaleString()} color="#b8956a" />
        </SSRGrid>
        <div style={{ marginTop: "20px", marginBottom: "20px" }}>
          <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#a09890" }}>
            Game Rankings by Player Count
          </p>
          <div style={{
            border: "1px solid #e8e4df",
            borderRadius: "8px",
            overflow: "hidden",
            fontSize: "14px"
          }}>
            {games.slice(0, 8).map((g, i) => {
              const gameCount = allPlayers.filter((p) => p.game === g).length;
              return (
                <div key={g} style={{
                  padding: "12px 16px",
                  background: i % 2 === 0 ? "#ffffff" : "#f5f2ee",
                  borderLeft: "4px solid " + (["#c02870", "#2a8a40", "#2874a6", "#c47000", "#b8960a", "#c43800", "#c4508a", "#b01040"][i % 8]),
                  borderBottom: i < 7 ? "1px solid #e8e4df" : "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px"
                }}>
                  <span style={{
                    fontWeight: "bold",
                    color: ["#c02870", "#2a8a40", "#2874a6", "#c47000", "#b8960a", "#c43800", "#c4508a", "#b01040"][i % 8]
                  }}>
                    {g}
                  </span>
                  <span style={{ color: "#6b635b", marginLeft: "auto" }}>{gameCount} {gameCount === 1 ? "player" : "players"}</span>
                </div>
              );
            })}
          </div>
        </div>
        <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#a09890" }}>Select a game</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {games.map((g) => (
            <SSRLink key={g} href={`/games/${slug(g)}`}>{g} ({allPlayers.filter((p) => p.game === g).length})</SSRLink>
          ))}
        </div>
        <SSRDivider />
        <div className="flex flex-wrap gap-2">
          <SSRLink href="/players">Pro Settings</SSRLink>
          <SSRLink href="/keyboards">All Keyboards</SSRLink>
          <SSRLink href="/sensitivity">Sensitivity</SSRLink>
          <SSRLink href="/brands">Brands</SSRLink>
        </div>
      </SSRSection>

      <EsportsKeyboards initialTab="games" />
    </>
  );
}
