import EsportsKeyboards from "@/components/ClientApp";
import { SSRSection, SSRTitle, SSRSub, SSRGrid, SSRStat, SSRLink, SSRDivider } from "@/components/ssr";
import { keyboards, allPlayers, proPlayers } from "@/data";

const slug = (n) => n.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");

export const metadata = {
  title: "Switches — Keyboard Switch Analytics & Comparison",
  description: "Comprehensive breakdown of every switch powering pro esports keyboards. Compare PAW3395, Focus Pro 36K, HERO 2, PAW3950, and more. Pro usage stats, specifications, and keyboards using each switch.",
  alternates: { canonical: "https://esportskeyboards.com/sensors" },
  openGraph: {
    title: "Switches — Keyboard Switch Analytics & Comparison",
    description: "Comprehensive breakdown of every switch powering pro esports keyboards.",
    url: "https://esportskeyboards.com/sensors",
    images: [{ url: "https://esportskeyboards.com/og?title=Sensors&subtitle=PAW3395+%C2%B7+Focus+Pro+36K+%C2%B7+HERO+2+%C2%B7+Pro+Usage+Stats", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function SensorsPage() {
  const switchData = [...new Set(keyboards.map((m) => m.switchType))].map((switchName) => {
    const switchKbds = keyboards.filter((m) => m.switchType === switchName);
    const totalProUsage = switchKbds.reduce((a, m) => a + m.proUsage, 0);
    const avgWeight = Math.round(switchKbds.reduce((a, m) => a + m?.weight, 0) / switchKbds.length);
    const avgPrice = Math.round(switchKbds.reduce((a, m) => a + m?.price, 0) / switchKbds.length);
    const brands = [...new Set(switchKbds.map((m) => m.brand))];
    const maxPolling = Math.max(...switchKbds.map((m) => m.pollingRate));
    const switchPros = proPlayers.filter((p) =>
      switchKbds.some((m) => p.keyboard.includes(m.name) || m.name.includes(p.keyboard))
    );
    return { switchName, keyboards: switchKbds, totalProUsage, avgWeight, avgPrice, brands, maxPolling, pros: switchPros };
  }).sort((a, b) => b.totalProUsage - a.totalProUsage);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "ItemList",
        name: "Esports Keyboard Switchs Ranked by Pro Usage",
        numberOfItems: switchData.length,
        itemListElement: switchData.map((s, i) => ({
          "@type": "ListItem", position: i + 1,
          url: `https://esportskeyboards.com/sensors/${slug(s.switchName)}`,
          name: s.switchName,
        })),
      }) }} />
      <article
        className="absolute overflow-hidden"
        style={{ width: 1, height: 1, padding: 0, margin: -1, clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}
      >
        <h1>Keyboard Switch Analytics — Every Switch in Professional Esports</h1>
        <p>
          Comprehensive breakdown of {switchData.length} optical switchs powering professional esports keyboards.
          Compare specifications, pro usage data, and see which sensors dominate competitive gaming.
        </p>

        <h2>Switch Rankings</h2>
        <table>
          <caption>Keyboard switches ranked by professional player usage</caption>
          <thead><tr><th>Rank</th><th>Switch</th><th>Keyboards</th><th>Pro Usage</th><th>Max Hz</th><th>Brands</th></tr></thead>
          <tbody>
            {switchData.map((s, i) => (
              <tr key={s.switchName}>
                <td>{i + 1}</td>
                <td>{s.switchName}</td>
                <td>{s.keyboards.length}</td>
                <td>{s.totalProUsage}%</td>
                <td>{s.maxPolling.toLocaleString()}</td>
                <td>{s.brands.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {switchData.map((s) => (
          <section key={s.switchName}>
            <h2>{s.switchName} — Full Analysis</h2>
            <p>
              The {s.switchName} is found in {s.keyboards.length} esports keyboards with a combined {s.totalProUsage}% pro usage.
              It supports up to {s.maxPolling.toLocaleString()} Hz polling.
              Average keyboard weight with this switch: {s.avgWeight}g. Average price: ${s.avgPrice}.
              Used by: {s.brands.join(", ")}.
            </p>

            <h3>Keyboards Using the {s.switchName}</h3>
            <table>
              <thead><tr><th>Keyboard</th><th>Brand</th><th>Weight</th><th>Price</th><th>Pro Usage</th><th>Rating</th></tr></thead>
              <tbody>
                {s.keyboards.sort((a, b) => b?.proUsage - a?.proUsage).map((m) => (
                  <tr key={m.id}>
                    <td><a href={`/keyboards/${slug(m.name)}`}>{m.name}</a></td>
                    <td><a href="/brands">{m.brand}</a></td>
                    <td>{m?.weight}g</td>
                    <td>${m?.price}</td>
                    <td>{m.proUsage}%</td>
                    <td>{m.rating}/10</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {s.pros.length > 0 && (
              <>
                <h3>Pro Players Using Keyboards</h3>
                <ul>
                  {s.pros.slice(0, 8).map((p) => (
                    <li key={p.name}>
                      <a href={`/players/${slug(p.name)}`}>{p.name}</a> — {p.game} ({p.team}), {p.keyboard}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </section>
        ))}

        <nav aria-label="Related"><ul>
          <li><a href="/keyboards">All Esports Keyboards</a></li>
          <li><a href="/compare">Compare Keyboards Side by Side</a></li>
          <li><a href="/brands">Keyboard Brands</a></li>
          <li><a href="/players">Pro Player Settings</a></li>
          <li><a href="/trends">Industry Trends</a></li>
          <li><a href="/games">Keyboard Usage by Game</a></li>
          <li><a href="/">EsportsKeyboards Home</a></li>
        </ul></nav>
      </article>

      <SSRSection>
        <SSRTitle accent="Switch Type">Analytics</SSRTitle>
        <SSRSub>Comprehensive breakdown of {switchData.length} optical switchs powering professional esports keyboards. Compare specs, pro usage, and see which sensors dominate.</SSRSub>
        <SSRGrid>
          {switchData.slice(0, 4).map((s) => (
            <SSRStat key={s.switchName} label={s.switchName} value={`${s.totalProUsage}% pro`} />
          ))}
        </SSRGrid>
        <div className="flex flex-wrap gap-2">
          <SSRLink href="/keyboards">All Keyboards</SSRLink>
          <SSRLink href="/compare">Compare</SSRLink>
          <SSRLink href="/brands">Brands</SSRLink>
          <SSRLink href="/players">Pro Settings</SSRLink>
        </div>
      </SSRSection>

      <EsportsKeyboards initialTab="sensors" />
    </>
  );
}
