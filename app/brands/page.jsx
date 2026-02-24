import EsportsKeyboards from "@/components/ClientApp";
import { SSRSection, SSRTitle, SSRSub, SSRGrid, SSRStat, SSRLink, SSRDivider } from "@/components/ssr";
import { keyboards, allPlayers, proPlayers, BRAND_COLORS, amazonLink } from "@/data";

const slug = (n) => n.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");

export const metadata = {
  title: "Brands — Esports Keyboard Manufacturers Compared",
  description: "Compare Razer, Logitech, Wooting, Cherry, Pulsar, Lamzu, SteelSeries, Corsair, and more. Pro share, keyboard lineups, average weight, pricing, and expert ratings for every esports keyboard brand.",
  alternates: { canonical: "https://esportskeyboards.com/brands" },
  openGraph: {
    title: "Brands — Esports Keyboard Manufacturers Compared",
    description: "Compare the top gaming keyboard brands used by professional esports players.",
    url: "https://esportskeyboards.com/brands",
    images: [{ url: "https://esportskeyboards.com/og?title=Brands&subtitle=Razer+%C2%B7+Logitech+%C2%B7+Zowie+%C2%B7+Finalmouse+%C2%B7+Pulsar+%C2%B7+Lamzu", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function BrandsPage() {
  const brandData = [...new Set(keyboards.map((m) => m.brand))].map((brand) => {
    const brandKeyboards = keyboards.filter((m) => m.brand === brand);
    const avgWeight = Math.round(brandKeyboards.reduce((a, m) => a + m.weight, 0) / brandKeyboards.length);
    const avgPrice = Math.round(brandKeyboards.reduce((a, m) => a + m.price, 0) / brandKeyboards.length);
    const avgRating = (brandKeyboards.reduce((a, m) => a + m.rating, 0) / brandKeyboards.length).toFixed(1);
    const totalProUsage = brandKeyboards.reduce((a, m) => a + m.proUsage, 0);
    const lightest = [...brandKeyboards].sort((a, b) => a.weight - b.weight)[0];
    const mostPopular = [...brandKeyboards].sort((a, b) => b.proUsage - a.proUsage)[0];
    const switches = [...new Set(brandKeyboards.map((m) => m.switchType))];
    const shapes = [...new Set(brandKeyboards.map((m) => m.layout))];
    const priceRange = `$${Math.min(...brandKeyboards.map((m) => m.price))}-$${Math.max(...brandKeyboards.map((m) => m.price))}`;
    const weightRange = `${Math.min(...brandKeyboards.map((m) => m.weight))}g-${Math.max(...brandKeyboards.map((m) => m.weight))}g`;
    const brandPros = proPlayers.filter((p) => {
      const pm = p.keyboard.toLowerCase();
      return brandKeyboards.some((m) => pm.includes(m.name.toLowerCase()) || m.name.toLowerCase().includes(pm));
    });
    return { brand, keyboards: brandKeyboards, avgWeight, avgPrice, avgRating, totalProUsage, lightest, mostPopular, switches, shapes, priceRange, weightRange, pros: brandPros };
  }).sort((a, b) => b.totalProUsage - a.totalProUsage);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "ItemList",
        name: "Esports Keyboard Brands Ranked by Pro Usage",
        numberOfItems: brandData.length,
        itemListElement: brandData.map((b, i) => ({
          "@type": "ListItem", position: i + 1,
          url: `https://esportskeyboards.com/brands/${slug(b.brand)}`,
          name: b.brand,
          item: { "@type": "Brand", name: b.brand },
        })),
      }) }} />
      <article
        className="absolute overflow-hidden"
        style={{ width: 1, height: 1, padding: 0, margin: -1, clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}
      >
        <h1>Esports Keyboard Brands — Complete Comparison and Analysis</h1>
        <p>
          Compare {brandData.length} gaming keyboard manufacturers used by professional esports players.
          See keyboard lineups, pro usage share, average specs, pricing, and featured pro players for each brand.
        </p>

        <h2>Brand Rankings Overview</h2>
        <table>
          <caption>All esports keyboard brands ranked by combined pro usage</caption>
          <thead><tr><th>Rank</th><th>Brand</th><th>Keyboards</th><th>Pro Usage</th><th>Avg Weight</th><th>Price Range</th><th>Avg Rating</th><th>Most Popular</th></tr></thead>
          <tbody>
            {brandData.map((b, i) => (
              <tr key={b.brand}>
                <td>{i + 1}</td>
                <td><a href={`/brands/${slug(b.brand)}`}>{b.brand}</a></td>
                <td>{b.keyboards.length}</td>
                <td>{b.totalProUsage}%</td>
                <td>{b.avgWeight}g</td>
                <td>{b.priceRange}</td>
                <td>{b.avgRating}/10</td>
                <td><a href={`/keyboards/${slug(b.mostPopular.name)}`}>{b.mostPopular.name}</a></td>
              </tr>
            ))}
          </tbody>
        </table>

        {brandData.map((b) => (
          <section key={b.brand}>
            <h2><a href={`/brands/${slug(b.brand)}`}>{b.brand} — Complete Esports Keyboard Lineup</a></h2>
            <p>
              {b.brand} has {b.keyboards.length} esports keyboards with a combined {b.totalProUsage}% pro usage.
              Weight range: {b.weightRange}. Price range: {b.priceRange}. Average rating: {b.avgRating}/10.
              Switches used: {b.switches.join(", ")}. Shapes offered: {b.shapes.join(", ")}.
              <a href={`/brands/${slug(b.brand)}`}> View full {b.brand} page →</a>
            </p>

            <h3>{b.brand} Keyboard Lineup</h3>
            <table>
              <thead><tr><th>Keyboard</th><th>Weight</th><th>Switch</th><th>Layout</th><th>Price</th><th>Pro Usage</th><th>Rating</th></tr></thead>
              <tbody>
                {b.keyboards.sort((a, c) => c.proUsage - a.proUsage).map((m) => (
                  <tr key={m.id}>
                    <td><a href={`/keyboards/${slug(m.name)}`}>{m.name}</a></td>
                    <td>{m.weight}g</td>
                    <td><a href="/switches">{m.switchType}</a></td>
                    <td>{m.layout}</td>
                    <td><a href={amazonLink(m.name)}>${m.price}</a></td>
                    <td>{m.proUsage}%</td>
                    <td>{m.rating}/10</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {b.pros.length > 0 && (
              <>
                <h3>Pro Players Using Keyboards</h3>
                <table>
                  <thead><tr><th>Player</th><th>Game</th><th>Team</th><th>Keyboard</th></tr></thead>
                  <tbody>
                    {b.pros.slice(0, 10).map((p, i) => (
                      <tr key={`${p.name}-${i}`}>
                        <td><a href={`/players/${slug(p.name)}`}>{p.name}</a></td>
                        <td>{p.game}</td>
                        <td>{p.team}</td>
                        <td>{p.keyboard}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </section>
        ))}

        <nav aria-label="Brand Pages">
          <h2>Individual Brand Pages</h2>
          <ul>
            {brandData.map((b) => (
              <li key={b.brand}><a href={`/brands/${slug(b.brand)}`}>{b.brand} Esports Keyboards — {b.keyboards.length} keyboards, {b.totalProUsage}% pro usage</a></li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Related">
          <h2>Related Pages</h2>
          <ul>
            <li><a href="/keyboards">All Esports Keyboards</a></li>
            <li><a href="/players">Pro Player Settings</a></li>
            <li><a href="/switches">Switch Comparison</a></li>
            <li><a href="/trends">Industry Trends</a></li>
            <li><a href="/compare">Compare Keyboards</a></li>
            <li><a href="/games">Keyboard Usage by Game</a></li>
            <li><a href="/">EsportsKeyboards Home</a></li>
          </ul>
        </nav>
      </article>

      <SSRSection>
        <SSRTitle accent="Keyboard">Brands</SSRTitle>
        <SSRSub>Compare {brandData.length} gaming keyboard manufacturers. Pro usage share, lineups, average specs, pricing, and featured players for each brand.</SSRSub>
        <SSRGrid>
          {brandData.slice(0, 4).map((b) => (
            <SSRStat key={b.brand} label={b.brand} value={`${b.totalProUsage}% pro`} color={BRAND_COLORS[b.brand]} />
          ))}
        </SSRGrid>
        <div className="flex flex-wrap gap-2">
          {brandData.map((b) => (
            <SSRLink key={b.brand} href={`/brands/${slug(b.brand)}`}>{b.brand}</SSRLink>
          ))}
        </div>
        <SSRDivider />
        <div className="flex flex-wrap gap-2">
          <SSRLink href="/keyboards">All Keyboards</SSRLink>
          <SSRLink href="/players">Pro Settings</SSRLink>
          <SSRLink href="/switches">Switches</SSRLink>
          <SSRLink href="/trends">Trends</SSRLink>
        </div>
      </SSRSection>

      <EsportsKeyboards initialTab="brands" />
    </>
  );
}
