import EsportsKeyboards from "@/components/ClientApp";
import { SSRSection, SSRTitle, SSRSub, SSRGrid, SSRStat, SSRLink, SSRDivider } from "@/components/ssr";
import { proPlayers, keyboards, allPlayers, KEYBOARD_DESCRIPTIONS, BRAND_COLORS, amazonLink, countryName } from "@/data";
import { PLAYER_BIOS } from "@/data/bios";

const slug = (n) => n.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");
const findKeyboard = (name) => name ? keyboards.find((m) => name.includes(m.name) || m.name.includes(name)) : undefined;
const mSlug = (name) => { const m = findKeyboard(name); return m ? slug(m.name) : null; };

// Only pre-build pages for proPlayers (have bios/profiles ~263 players).
// All other players still work via on-demand rendering (dynamicParams = true by default).
function getUniquePlayersBySlug() {
  const slugMap = new Map();
  proPlayers.forEach((p) => {
    const s = slug(p.name);
    if (!slugMap.has(s)) slugMap.set(s, p);
  });
  allPlayers.forEach((p) => {
    const s = slug(p.name);
    if (!slugMap.has(s)) slugMap.set(s, p);
  });
  return slugMap;
}

const playerSlugMap = getUniquePlayersBySlug();

export function generateStaticParams() {
  // CS2 & Valorant: top 150 each. All other games: top 50 each.
  // Remaining players still work via on-demand SSR.
  const CAPS = { CS2: 150, Valorant: 150 };
  const DEFAULT_CAP = 50;
  const gameCounts = {};
  const staticSlugs = new Set();
  const params = [];

  // proPlayers first (have bios, higher value)
  for (const p of proPlayers) {
    const s = slug(p.name);
    if (staticSlugs.has(s)) continue;
    const cap = CAPS[p.game] || DEFAULT_CAP;
    gameCounts[p.game] = (gameCounts[p.game] || 0) + 1;
    if (gameCounts[p.game] > cap) continue;
    staticSlugs.add(s);
    params.push({ slug: s });
  }

  // Then remaining allPlayers
  for (const p of allPlayers) {
    const s = slug(p.name);
    if (staticSlugs.has(s)) continue;
    const cap = CAPS[p.game] || DEFAULT_CAP;
    gameCounts[p.game] = (gameCounts[p.game] || 0) + 1;
    if (gameCounts[p.game] > cap) continue;
    staticSlugs.add(s);
    params.push({ slug: s });
  }

  return params;
}

export function generateMetadata({ params }) {
  const player = playerSlugMap.get(params.slug);
  if (!player) return { title: "Player Not Found" };
  const bio = PLAYER_BIOS[player.name] || null;
  const description = bio
    ? bio.slice(0, 155) + "..."
    : `${player.name} (${player.fullName || player.name}) — ${player.game} pro for ${player.team}. Uses ${player.keyboard} at ${player.dpi} DPI, ${player.sens} sensitivity (${player.edpi} eDPI).`;
  const GAME_OG_COLORS = { CS2: "%23ff8c00", Valorant: "%23ff4655", Fortnite: "%234c7bd9", LoL: "%23c89b3c", "Dota 2": "%23e74c3c", "R6 Siege": "%234a86c8", "Overwatch 2": "%23f99e1a", Apex: "%23dc2626", "Call of Duty": "%235cb85c", PUBG: "%23f2a900", Deadlock: "%238b5cf6", "Quake Champions": "%23ce4a00", "Marvel Rivals": "%23ed1d24", "Rocket League": "%231a9fff" };
  const ogAccent = GAME_OG_COLORS[player.game] || "%2300ff6a";
  const ogUrl = `https://esportskeyboards.com/og?title=${encodeURIComponent(player.name)}&subtitle=${encodeURIComponent(`${player.game} · ${player.team}`)}&badge=${encodeURIComponent(player.game + ' Pro')}&accent=${ogAccent}&stat1=${encodeURIComponent(player.dpi + ' DPI')}&s1Label=DPI&stat2=${encodeURIComponent(String(player.edpi))}&s2Label=eDPI&stat3=${encodeURIComponent(player.keyboard.replace(/(Logitech |Razer |Finalmouse )/, ''))}&s3Label=Keyboard`;
  return {
    title: `${player.name} — ${player.game} Pro Player Settings & Gear`,
    description,
    alternates: { canonical: `https://esportskeyboards.com/players/${params.slug}` },
    openGraph: {
      title: `${player.name} — ${player.game} Pro Player Settings & Gear`,
      description,
      url: `https://esportskeyboards.com/players/${params.slug}`,
      images: [{ url: ogUrl, width: 1200, height: 630, alt: `${player.name} - ${player.game} pro player settings` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${player.name} — ${player.game} Pro Player Settings & Gear`,
      description,
      images: [ogUrl],
    },
  };
}

export default function PlayerProfilePage({ params }) {
  const player = playerSlugMap.get(params.slug);
  if (!player) return <EsportsKeyboards initialTab="players" />;
  const bio = PLAYER_BIOS[player.name] || null;

  const keyboardData = findKeyboard(player.keyboard);
  const keyboardSlugVal = keyboardData ? slug(keyboardData.name) : null;
  const mouseDesc = keyboardData ? KEYBOARD_DESCRIPTIONS[keyboardData.name] : null;

  // Sensitivity analysis
  const allGamePlayers = allPlayers.filter((p) => p.game === player.game);
  const avgEdpi = Math.round(allGamePlayers.reduce((a, p) => a + p.edpi, 0) / allGamePlayers.length);
  const avgDpi = Math.round(allGamePlayers.reduce((a, p) => a + p.dpi, 0) / allGamePlayers.length);
  const edpiPercentile = Math.round(allGamePlayers.filter((p) => p.edpi <= player.edpi).length / allGamePlayers.length * 100);
  const sensCategory = player.edpi < avgEdpi * 0.7 ? "low" : player.edpi > avgEdpi * 1.3 ? "high" : "medium";
  const cm360 = keyboardData ? Math.round(360 / (player.edpi * 0.022) * 10) / 10 : null;

  return (
    <>
      {/* JSON-LD Person structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: player.fullName || player.name,
        alternateName: player.name,
        jobTitle: `Professional ${player.game} Player`,
        description: bio ? bio.slice(0, 300) : `${player.name} is a professional ${player.game} player for ${player.team}. Uses the ${player.keyboard} at ${player.dpi} DPI.`,
        memberOf: { "@type": "SportsTeam", name: player.team },
        url: `https://esportskeyboards.com/players/${params.slug}`,
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://esportskeyboards.com" },
          { "@type": "ListItem", position: 2, name: "Players", item: "https://esportskeyboards.com/players" },
          { "@type": "ListItem", position: 3, name: player.name, item: `https://esportskeyboards.com/players/${params.slug}` },
        ],
      }) }} />
      <article
        className="absolute overflow-hidden"
        style={{ width: 1, height: 1, padding: 0, margin: -1, clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}
        itemScope itemType="https://schema.org/Person"
      >
        <h1 itemProp="name">{player.name} ({player.fullName || player.name}) — {player.game} Professional Player Settings and Gear</h1>
        <meta itemProp="alternateName" content={player.fullName || player.name} />
        <meta itemProp="jobTitle" content={`Professional ${player.game} Player`} />

        <h2>About {player.name}</h2>
        {bio && <p itemProp="description">{bio}</p>}
        {!bio && (
          <p>
            {player.name} ({player.fullName || player.name}) is a professional <a href={`/games/${player.game.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}`}>{player.game}</a> player
            for <a href={`/teams/${player.team?.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}`}>{player.team}</a>. They play the {player.role} role and are {player.age} years old.
            {player.name} uses the {keyboardSlugVal ? <a href={`/keyboards/${keyboardSlugVal}`}>{player.keyboard}</a> : player.keyboard} at {player.dpi} DPI with {player.sens} in-game
            sensitivity for an effective DPI of {player.edpi}.
          </p>
        )}

        <h2>{player.name} Complete Keyboard Settings</h2>
        <table>
          <caption>Full keyboard and sensitivity settings for {player.name} in {player.game}</caption>
          <tbody>
            <tr><th>Keyboard</th><td>{keyboardSlugVal ? <a href={`/keyboards/${keyboardSlugVal}`}>{player.keyboard}</a> : player.keyboard}</td></tr>
            <tr><th>DPI</th><td>{player.dpi}</td></tr>
            <tr><th>In-Game Sensitivity</th><td>{player.sens}</td></tr>
            <tr><th>eDPI (DPI × Sensitivity)</th><td>{player.edpi}</td></tr>
            <tr><th>Polling Rate</th><td>{player.hz} Hz</td></tr>
            {cm360 && <tr><th>cm/360°</th><td>{cm360} cm</td></tr>}
          </tbody>
        </table>

        <h2>{player.name} Player Profile</h2>
        <table>
          <caption>Personal and career information for {player.name}</caption>
          <tbody>
            <tr><th>In-Game Name</th><td>{player.name}</td></tr>
            <tr><th>Full Name</th><td>{player.fullName || player.name}</td></tr>
            <tr><th>Game</th><td><a href={`/games/${player.game.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}`}>{player.game}</a></td></tr>
            <tr><th>Team</th><td><a href={`/teams/${player.team?.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}`}>{player.team}</a></td></tr>
            <tr><th>Role</th><td>{player.role}</td></tr>
            <tr><th>Age</th><td>{player.age}</td></tr>
            <tr><th>Country</th><td>{countryName(player.country)}</td></tr>
          </tbody>
        </table>

        <h2>{player.name} Sensitivity Analysis</h2>
        <p>
          {player.name} plays at {player.edpi} eDPI ({player.dpi} DPI × {player.sens} sensitivity), which is
          {sensCategory === "low" ? " lower than" : sensCategory === "high" ? " higher than" : " close to"} the
          average {player.game} professional eDPI of {avgEdpi}. This places {player.name} in the {edpiPercentile}th
          percentile among {allGamePlayers.length} tracked {player.game} players — meaning {edpiPercentile}% of
          {player.game} pros play at a sensitivity equal to or lower than {player.name}.
        </p>
        <p>
          {sensCategory === "low"
            ? `As a ${sensCategory}-sensitivity player, ${player.name} likely uses large arm movements for aiming, requiring a large mousepad. This style favors precision tracking and is common among ${player.role === "AWPer" || player.role === "Sniper" ? "snipers and" : ""} players who prioritize crosshair placement.`
            : sensCategory === "high"
            ? `As a ${sensCategory}-sensitivity player, ${player.name} relies more on wrist movements, enabling faster flicks and quick 180-degree turns. This style is common among ${player.role === "Entry Fragger" || player.role === "Duelist" ? "entry fraggers and aggressive players" : "players who prioritize reaction speed"}.`
            : `${player.name}'s medium sensitivity is the most common choice among professionals, offering a balance between precision and speed of movement.`
          }
        </p>
        {cm360 && <p>{player.name} needs to move approximately {cm360} centimeters to perform a full 360-degree turn in-game.</p>}
        <p><a href={`/sensitivity/${player.game.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}`}>Use our {player.game} Sensitivity Converter to convert {player.name}&apos;s settings to other games</a>.</p>

        {keyboardData && (
          <>
            <h2>{player.name}&apos;s Keyboard — {keyboardData.name} Details</h2>
            <p>
              {player.name} currently uses the <a href={`/keyboards/${keyboardSlugVal}`}>{keyboardData.name}</a> by <a href={`/brands/${keyboardData.brand?.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-")}`}>{keyboardData.brand}</a>.
              {mouseDesc ? ` ${mouseDesc.text.slice(0, 300)}...` : ` It weighs ${keyboardData?.weight}g, uses the ${keyboardData.switchType} switch, and costs $${keyboardData?.price}.`}
            </p>
            <table>
              <caption>{keyboardData.name} specifications — {player.name}&apos;s current keyboard</caption>
              <tbody>
                <tr><th>Keyboard</th><td><a href={`/keyboards/${keyboardSlugVal}`}>{keyboardData.name}</a></td></tr>
                <tr><th>Brand</th><td><a href={`/brands/${keyboardData.brand?.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-")}`}>{keyboardData.brand}</a></td></tr>
                <tr><th>Weight</th><td>{keyboardData?.weight}g</td></tr>
                <tr><th>Switch</th><td><a href={`/sensors/${keyboardData.switchType?.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}`}>{keyboardData.switchType}</a></td></tr>
                <tr><th>Actuation</th><td>{keyboardData.actuationPoint}mm</td></tr>
                <tr><th>Polling Rate</th><td>{keyboardData.pollingRate.toLocaleString()} Hz</td></tr>
                <tr><th>Layout</th><td><a href={`/shapes/${keyboardData.layout?.toLowerCase()}`}>{keyboardData.layout}</a></td></tr>
                <tr><th>Connectivity</th><td>{keyboardData.connectivity}</td></tr>
                <tr><th>Price</th><td>${keyboardData?.price}</td></tr>
                <tr><th>Switches</th><td>{keyboardData.switches}</td></tr>
                <tr><th>Pro Usage</th><td>{keyboardData?.proUsage}% of all tracked pros</td></tr>
                <tr><th>Rating</th><td>{keyboardData.rating}/10</td></tr>
              </tbody>
            </table>
            <p><a href={amazonLink(keyboardData.name)}>Buy the {keyboardData.name} on Amazon for ${keyboardData?.price}</a></p>
          </>
        )}

        {player.achievements && player.achievements.length > 0 && (
          <>
            <h2>{player.name} Career Achievements and Awards</h2>
            <p>{player.name} has accumulated {player.achievements.length} major achievements and awards throughout their career:</p>
            <ul>
              {player.achievements.map((a, i) => <li key={i}>{a}</li>)}
            </ul>
          </>
        )}

        {player.keyboardHistory && player.keyboardHistory.length > 0 && (
          <>
            <h2>{player.name} Keyboard History Timeline</h2>
            <p>
              {player.name} has used {player.keyboardHistory.length} different keyboards throughout their professional career.
              Here is the complete timeline:
            </p>
            <table>
              <caption>Complete keyboard history for {player.name}</caption>
              <thead><tr><th>Keyboard</th><th>Period</th><th>Brand</th></tr></thead>
              <tbody>
                {player.keyboardHistory.map((mh, i) => {
                  const histMouse = findKeyboard(mh.keyboard);
                  const histSlug = histMouse ? slug(histMouse.name) : null;
                  return (
                    <tr key={i}>
                      <td>{histSlug ? <a href={`/keyboards/${histSlug}`}>{mh.keyboard}</a> : mh.keyboard}</td>
                      <td>{mh.period}</td>
                      <td>{histMouse ? histMouse.brand : "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}

        {/* Teammates */}
        {(() => {
          const teammates = proPlayers.filter((p) => p.team === player.team && p.name !== player.name);
          if (!teammates.length) return null;
          return (
            <>
              <h2>{player.team} Roster — {player.name}&apos;s Teammates</h2>
              <p>Current {player.team} players and their keyboard setups:</p>
              <table>
                <thead><tr><th>Player</th><th>Role</th><th>Keyboard</th><th>DPI</th><th>eDPI</th></tr></thead>
                <tbody>
                  {teammates.map((p) => {
                    const ms = mSlug(p.keyboard);
                    return (
                      <tr key={p.name}>
                        <td><a href={`/players/${slug(p.name)}`}>{p.name}</a></td>
                        <td>{p.role}</td>
                        <td>{ms ? <a href={`/keyboards/${ms}`}>{p.keyboard}</a> : p.keyboard}</td>
                        <td>{p.dpi}</td>
                        <td>{p.edpi}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          );
        })()}

        {/* Same keyboard players */}
        {(() => {
          const sameMousePlayers = proPlayers.filter((p) => {
            if (p.name === player.name) return false;
            const pm = p.keyboard.toLowerCase(), cm = player.keyboard.toLowerCase();
            return pm === cm || pm.includes(cm) || cm.includes(pm);
          }).slice(0, 20);
          if (!sameMousePlayers.length) return null;
          const gameBreakdown = {};
          sameMousePlayers.forEach((p) => { gameBreakdown[p.game] = (gameBreakdown[p.game] || 0) + 1; });
          return (
            <>
              <h2>Other Pro Players Using the {player.keyboard}</h2>
              <p>
                {sameMousePlayers.length} other featured pros also use the {player.keyboard} across{" "}
                {Object.entries(gameBreakdown).map(([g, c]) => `${g} (${c})`).join(", ")}.
              </p>
              <table>
                <thead><tr><th>Player</th><th>Game</th><th>Team</th><th>DPI</th><th>eDPI</th></tr></thead>
                <tbody>
                  {sameMousePlayers.map((p) => (
                    <tr key={`${p.name}-${p.game}`}>
                      <td><a href={`/players/${slug(p.name)}`}>{p.name}</a></td>
                      <td>{p.game}</td>
                      <td>{p.team}</td>
                      <td>{p.dpi}</td>
                      <td>{p.edpi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          );
        })()}

        {/* Same game players */}
        {(() => {
          const sameGame = proPlayers.filter((p) => p.game === player.game && p.name !== player.name);
          if (!sameGame.length) return null;
          return (
            <>
              <h2>All {player.game} Pro Players</h2>
              <p>{sameGame.length} other {player.game} pro players with detailed profiles:</p>
              <table>
                <thead><tr><th>Player</th><th>Team</th><th>Role</th><th>Keyboard</th><th>eDPI</th></tr></thead>
                <tbody>
                  {sameGame.map((p) => {
                    const ms = mSlug(p.keyboard);
                    return (
                      <tr key={p.name}>
                        <td><a href={`/players/${slug(p.name)}`}>{p.name}</a></td>
                        <td>{p.team}</td>
                        <td>{p.role}</td>
                        <td>{ms ? <a href={`/keyboards/${ms}`}>{p.keyboard}</a> : p.keyboard}</td>
                        <td>{p.edpi}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          );
        })()}

        {/* Similar sensitivity */}
        {(() => {
          const similar = proPlayers
            .filter((p) => p.name !== player.name && p.game === player.game && Math.abs(p.edpi - player.edpi) <= 150)
            .sort((a, b) => Math.abs(a.edpi - player.edpi) - Math.abs(b.edpi - player.edpi))
            .slice(0, 12);
          if (!similar.length) return null;
          return (
            <>
              <h2>{player.game} Players with Similar Sensitivity to {player.name}</h2>
              <p>{player.name} plays at {player.edpi} eDPI. These {player.game} pros use a sensitivity within ±150 eDPI:</p>
              <table>
                <thead><tr><th>Player</th><th>Team</th><th>eDPI</th><th>DPI</th><th>Sensitivity</th><th>Keyboard</th></tr></thead>
                <tbody>
                  {similar.map((p) => {
                    const ms = mSlug(p.keyboard);
                    return (
                      <tr key={p.name}>
                        <td><a href={`/players/${slug(p.name)}`}>{p.name}</a></td>
                        <td>{p.team}</td>
                        <td>{p.edpi}</td>
                        <td>{p.dpi}</td>
                        <td>{p.sens}</td>
                        <td>{ms ? <a href={`/keyboards/${ms}`}>{p.keyboard}</a> : p.keyboard}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          );
        })()}

        {/* Same role players */}
        {(() => {
          const sameRole = allPlayers
            .filter((p) => p.name !== player.name && p.game === player.game && p.role === player.role)
            .slice(0, 10);
          if (!sameRole.length) return null;
          return (
            <>
              <h2>Other {player.game} {player.role}s</h2>
              <p>Other professional {player.game} players who also play the {player.role} role:</p>
              <ul>
                {sameRole.map((p) => {
                  const ms = mSlug(p.keyboard);
                  return (
                    <li key={p.name}>
                      <a href={`/players/${slug(p.name)}`}>{p.name}</a> ({p.team})
                      — uses {ms ? <a href={`/keyboards/${ms}`}>{p.keyboard}</a> : p.keyboard}, {p.edpi} eDPI
                    </li>
                  );
                })}
              </ul>
            </>
          );
        })()}

        {/* FAQ section */}
        <h2>Frequently Asked Questions About {player.name}</h2>
        <dl>
          <dt>What keyboard does {player.name} use?</dt>
          <dd>{player.name} uses the {keyboardSlugVal ? <a href={`/keyboards/${keyboardSlugVal}`}>{player.keyboard}</a> : player.keyboard}. {keyboardData ? `It weighs ${keyboardData?.weight}g, costs $${keyboardData?.price}, and uses the ${keyboardData.switchType} switch.` : ""}</dd>

          <dt>What DPI does {player.name} use?</dt>
          <dd>{player.name} plays at {player.dpi} DPI with an in-game sensitivity of {player.sens}, giving an effective DPI (eDPI) of {player.edpi}.</dd>

          <dt>What team does {player.name} play for?</dt>
          <dd>{player.name} ({player.fullName || player.name}) currently plays for {player.team} as a {player.role} in {player.game}.</dd>

          {cm360 && (
            <>
              <dt>What is {player.name}&apos;s cm/360?</dt>
              <dd>{player.name}&apos;s sensitivity requires approximately {cm360} cm of mouse movement to complete a full 360-degree turn.</dd>
            </>
          )}

          <dt>What polling rate does {player.name} use?</dt>
          <dd>{player.name} uses a polling rate of {player.hz} Hz on their {player.keyboard}.</dd>

          {player.keyboardHistory && player.keyboardHistory.length > 1 && (
            <>
              <dt>What keyboards has {player.name} used in the past?</dt>
              <dd>{player.name} has used {player.keyboardHistory.length} keyboards throughout their career: {player.keyboardHistory.map((mh) => `${mh.keyboard} (${mh.period})`).join(", ")}.</dd>
            </>
          )}

          <dt>Is {player.name}&apos;s sensitivity high or low?</dt>
          <dd>{player.name}&apos;s eDPI of {player.edpi} is {sensCategory === "low" ? "below" : sensCategory === "high" ? "above" : "near"} the average of {avgEdpi} for {player.game} professionals, placing them in the {edpiPercentile}th percentile.</dd>
        </dl>

        <nav aria-label="Related pages">
          <h2>Related Pages</h2>
          <ul>
            <li><a href="/players">All Pro Players — Complete Database</a></li>
            <li><a href="/keyboards">All Esports Keyboards — Specs and Rankings</a></li>
            {keyboardSlugVal && <li><a href={`/keyboards/${keyboardSlugVal}`}>{player.keyboard} — Full Review and Specs</a></li>}
            <li><a href={`/games/${player.game.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}`}>{player.game} Keyboard Meta and Usage Data</a></li>
            <li><a href="/sensitivity">Sensitivity Converter — Convert {player.name}&apos;s Settings</a></li>
            <li><a href="/brands">Keyboard Brand Comparison</a></li>
            <li><a href="/switches">Keyboard Switch Comparison</a></li>
            <li><a href="/compare">Compare Keyboards Side by Side</a></li>
            <li><a href="/trends">Esports Keyboard Industry Trends</a></li>
            <li><a href="/shapes">Keyboard Layout Overlay Tool</a></li>
            <li><a href="/lab">Keyboard Finder Quiz</a></li>
            <li><a href="/">EsportsKeyboards Home</a></li>
          </ul>
        </nav>
      </article>

      {/* Visible server-rendered content */}
      <SSRSection>
        <SSRTitle accent={player.game}>{player.name}</SSRTitle>
        <SSRSub>
          {bio
            ? bio.slice(0, 280) + "..."
            : `${player.name} (${player.fullName || player.name}) is a professional ${player.game} ${player.role} for ${player.team}. Uses the ${player.keyboard} at ${player.dpi} DPI with ${player.sens} sensitivity (${player.edpi} eDPI).`
          }
        </SSRSub>
        <SSRGrid>
          <SSRStat label="Keyboard" value={player.keyboard.replace(/(Wooting |Razer |Logitech |SteelSeries |Corsair |Cherry |Ducky |DrunkDeer |Endgame Gear |ASUS |Keychron |Glorious )/, "")} />
          <SSRStat label="DPI" value={player.dpi} />
          <SSRStat label="Sensitivity" value={player.sens} />
          <SSRStat label="eDPI" value={player.edpi} />
          <SSRStat label="Polling Rate" value={`${player.hz} Hz`} />
          {cm360 && <SSRStat label="cm/360" value={`${cm360} cm`} />}
          <SSRStat label="Team" value={player.team} />
          <SSRStat label="Role" value={player.role} />
        </SSRGrid>
        <p className="text-xs mb-3" style={{ color: "#8a8078" }}>
          {player.name}&apos;s eDPI of {player.edpi} is {sensCategory === "low" ? "below" : sensCategory === "high" ? "above" : "near"} the
          {" "}{player.game} average of {avgEdpi} ({edpiPercentile}th percentile among {allGamePlayers.length} pros).
        </p>
        <SSRDivider />
        <div className="flex flex-wrap gap-2">
          {keyboardSlugVal && <SSRLink href={`/keyboards/${keyboardSlugVal}`}>{player.keyboard.replace(/(Wooting |Razer |Logitech |SteelSeries |Corsair |Cherry |Ducky |DrunkDeer |Endgame Gear |ASUS |Keychron |Glorious )/, "")} →</SSRLink>}
          <SSRLink href="/players">All Players</SSRLink>
          <SSRLink href="/sensitivity">Convert Sensitivity</SSRLink>
          <SSRLink href={`/games/${player.game.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}`}>{player.game}</SSRLink>
        </div>
      </SSRSection>

      <EsportsKeyboards initialTab="players" initialPlayerSlug={params.slug} />
    </>
  );
}
