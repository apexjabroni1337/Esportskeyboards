import EsportsKeyboards from "@/components/ClientApp";
import { SSRSection, SSRTitle, SSRSub, SSRGrid, SSRStat, SSRLink, SSRDivider } from "@/components/ssr";
import { keyboards, allPlayers, proPlayers, BRAND_COLORS, KEYBOARD_DESCRIPTIONS, amazonLink } from "@/data";

const slug = (n) => n.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");

export const metadata = {
  title: "All Esports Keyboards — Complete Database & Rankings",
  description: "Browse every keyboard used by professional esports players. Filter by brand, weight, switch type, polling rate, and price. Compare 150+ gaming keyboards with full specs and pro usage statistics.",
  alternates: { canonical: "https://esportskeyboards.com/keyboards" },
  openGraph: {
    title: "All Esports Keyboards — Complete Database & Rankings",
    description: "Browse every keyboard used by professional esports players. 150+ gaming keyboards with full specs and pro usage statistics.",
    url: "https://esportskeyboards.com/keyboards",
    images: [{ url: "https://esportskeyboards.com/og?title=All+Esports+Keyboards&subtitle=Complete+Database+%C2%B7+150%2B+Keyboards+%C2%B7+Full+Specs+%C2%B7+Pro+Usage", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function KeyboardsPage() {
  const sorted = [...keyboards].sort((a, b) => b?.proUsage - a?.proUsage);
  const brands = [...new Set(keyboards.map((m) => m.brand))];
  const switches = [...new Set(keyboards.map((m) => m.switchType))];
  const avgWeight = Math.round(keyboards.reduce((a, m) => a + m?.weight, 0) / keyboards.length);
  const avgPrice = Math.round(keyboards.reduce((a, m) => a + m?.price, 0) / keyboards.length);
  const lightest = [...keyboards].sort((a, b) => a?.weight - b?.weight)[0];
  const heaviest = [...keyboards].sort((a, b) => b?.weight - a?.weight)[0];
  const cheapest = [...keyboards].sort((a, b) => a?.price - b?.price)[0];
  const mostExpensive = [...keyboards].sort((a, b) => b?.price - a?.price)[0];
  const highestRated = [...keyboards].sort((a, b) => b.rating - a.rating)[0];
  const wirelessCount = keyboards.filter((m) => m.connectivity === "Wireless").length;

  return (
    <>
      {/* ItemList schema for rich results */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "ItemList",
        name: "Best Esports Keyboards Ranked by Pro Usage",
        description: `Top ${keyboards.length} professional esports gaming keyboards ranked by pro player adoption`,
        numberOfItems: sorted.length,
        itemListElement: sorted.slice(0, 20).map((m, i) => ({
          "@type": "ListItem", position: i + 1,
          url: `https://esportskeyboards.com/keyboards/${slug(m.name)}`,
          name: m.name,
          item: { "@type": "Product", name: m.name, brand: { "@type": "Brand", name: m.brand }, description: `${m.name} by ${m.brand}. ${m?.weight}g ${m.layout.toLowerCase()} keyboard with ${m.switchType} switch. ${m.proUsage}% pro usage.` },
        })),
      }) }} />
      {/* FAQ schema for keyboards page */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "What is the best esports keyboard in 2025?", acceptedAnswer: { "@type": "Answer", text: `The ${sorted[0].name} is currently the most used keyboard among professional esports players with ${sorted[0].proUsage}% pro usage, followed by the ${sorted[1].name} (${sorted[1].proUsage}%) and ${sorted[2].name} (${sorted[2].proUsage}%). The best choice depends on your hand size, grip style, and game.` }},
          { "@type": "Question", name: "What is the lightest gaming keyboard for esports?", acceptedAnswer: { "@type": "Answer", text: `The ${lightest.name} is the lightest esports keyboard in our database at just ${lightest?.weight}g. Ultralight keyboards (under 50g) include ${keyboards.filter(m => m?.weight < 50).map(m => m.name).join(", ")}. Most pros prefer keyboards between 45-65g.` }},
          { "@type": "Question", name: "Are wireless keyboards good for esports?", acceptedAnswer: { "@type": "Answer", text: `Yes — ${wirelessCount} of ${keyboards.length} (${Math.round(wirelessCount/keyboards.length*100)}%) keyboards in our pro database are wireless. Modern wireless keyboards at 4KHz polling have eliminated the latency gap. The vast majority of top esports pros now use wireless keyboards.` }},
          { "@type": "Question", name: "How much does a pro esports keyboard cost?", acceptedAnswer: { "@type": "Answer", text: `The average price of a pro esports keyboard is $${avgPrice}. Prices range from $${cheapest?.price} (${cheapest.name}) to $${mostExpensive?.price} (${mostExpensive.name}). Most competitive keyboards fall between $100-$170.` }},
        ],
      }) }} />
      <article
        className="absolute overflow-hidden"
        style={{ width: 1, height: 1, padding: 0, margin: -1, clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}
      >
        <h1>All Esports Gaming Keyboards — Complete Database and Rankings</h1>
        <p>
          Browse our complete database of {keyboards.length} professional esports gaming keyboards used by
          {allPlayers.length.toLocaleString()}+ professional players. Every keyboard includes full specifications,
          pro usage statistics, expert ratings, and purchase links.
        </p>

        <h2>Quick Stats</h2>
        <ul>
          <li>Total keyboards in database: {keyboards.length}</li>
          <li>Average weight: {avgWeight}g</li>
          <li>Average price: ${avgPrice}</li>
          <li>Lightest: <a href={`/keyboards/${slug(lightest.name)}`}>{lightest.name}</a> ({lightest?.weight}g)</li>
          <li>Heaviest: <a href={`/keyboards/${slug(heaviest.name)}`}>{heaviest.name}</a> ({heaviest?.weight}g)</li>
          <li>Cheapest: <a href={`/keyboards/${slug(cheapest.name)}`}>{cheapest.name}</a> (${cheapest?.price})</li>
          <li>Most expensive: <a href={`/keyboards/${slug(mostExpensive.name)}`}>{mostExpensive.name}</a> (${mostExpensive?.price})</li>
          <li>Highest rated: <a href={`/keyboards/${slug(highestRated.name)}`}>{highestRated.name}</a> ({highestRated.rating}/10)</li>
          <li>Wireless: {wirelessCount} of {keyboards.length} ({Math.round(wirelessCount / keyboards.length * 100)}%)</li>
          <li>Brands represented: {brands.length}</li>
          <li>Switches represented: {switches.length}</li>
        </ul>

        <h2>Esports Keyboards Ranked by Pro Usage</h2>
        <table>
          <caption>All {keyboards.length} esports keyboards sorted by professional player usage</caption>
          <thead>
            <tr><th>Rank</th><th>Keyboard</th><th>Brand</th><th>Weight</th><th>Switch</th><th>Polling Rate</th><th>Layout</th><th>Price</th><th>Pro Usage</th><th>Rating</th></tr>
          </thead>
          <tbody>
            {sorted.map((m, i) => (
              <tr key={m.id}>
                <td>{i + 1}</td>
                <td><a href={`/keyboards/${slug(m.name)}`}>{m.name}</a></td>
                <td><a href="/brands">{m.brand}</a></td>
                <td>{m?.weight}g</td>
                <td><a href="/switches">{m.switchType}</a></td>
                <td>{m.pollingRate.toLocaleString()} Hz</td>
                <td>{m.layout}</td>
                <td>${m?.price}</td>
                <td>{m.proUsage}%</td>
                <td>{m.rating}/10</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Keyboards by Weight Category</h2>
        <h3>Ultralight (Under 50g)</h3>
        <ul>
          {keyboards.filter((m) => m?.weight < 50).sort((a, b) => a?.weight - b?.weight).map((m) => (
            <li key={m.id}><a href={`/keyboards/${slug(m.name)}`}>{m.name}</a> — {m?.weight}g ({m.brand}), ${m?.price}</li>
          ))}
        </ul>
        <h3>Lightweight (50-60g)</h3>
        <ul>
          {keyboards.filter((m) => m?.weight >= 50 && m?.weight <= 60).sort((a, b) => a?.weight - b?.weight).map((m) => (
            <li key={m.id}><a href={`/keyboards/${slug(m.name)}`}>{m.name}</a> — {m?.weight}g ({m.brand}), ${m?.price}</li>
          ))}
        </ul>
        <h3>Medium (61-70g)</h3>
        <ul>
          {keyboards.filter((m) => m?.weight > 60 && m?.weight <= 70).sort((a, b) => a?.weight - b?.weight).map((m) => (
            <li key={m.id}><a href={`/keyboards/${slug(m.name)}`}>{m.name}</a> — {m?.weight}g ({m.brand}), ${m?.price}</li>
          ))}
        </ul>
        <h3>Standard (Over 70g)</h3>
        <ul>
          {keyboards.filter((m) => m?.weight > 70).sort((a, b) => a?.weight - b?.weight).map((m) => (
            <li key={m.id}><a href={`/keyboards/${slug(m.name)}`}>{m.name}</a> — {m?.weight}g ({m.brand}), ${m?.price}</li>
          ))}
        </ul>

        <h2>Keyboards by Brand</h2>
        {brands.sort().map((brand) => {
          const brandKeyboards = keyboards.filter((m) => m.brand === brand).sort((a, b) => b?.proUsage - a?.proUsage);
          return (
            <section key={brand}>
              <h3><a href="/brands">{brand}</a> ({brandKeyboards.length} keyboards)</h3>
              <ul>
                {brandKeyboards.map((m) => (
                  <li key={m.id}><a href={`/keyboards/${slug(m.name)}`}>{m.name}</a> — {m?.weight}g, {m.switchType}, ${m?.price}, {m.proUsage}% pro usage</li>
                ))}
              </ul>
            </section>
          );
        })}

        <h2>Keyboards by Switch</h2>
        {switches.map((sw) => {
          const switchKbds = keyboards.filter((m) => m.switchType === sw);
          return (
            <section key={sw}>
              <h3><a href="/switches">{sw}</a> ({switchKbds.length} keyboards)</h3>
              <ul>
                {switchKbds.map((m) => (
                  <li key={m.id}><a href={`/keyboards/${slug(m.name)}`}>{m.name}</a> ({m.brand})</li>
                ))}
              </ul>
            </section>
          );
        })}

        <h2>Keyboards by Layout</h2>
        {[...new Set(keyboards.map((m) => m.layout))].map((shape) => {
          const shapeKeyboards = keyboards.filter((m) => m.layout === shape);
          return (
            <section key={shape}>
              <h3>{shape} Shape ({shapeKeyboards.length} keyboards)</h3>
              <ul>
                {shapeKeyboards.map((m) => (
                  <li key={m.id}><a href={`/keyboards/${slug(m.name)}`}>{m.name}</a> ({m.brand}, {m?.weight}g)</li>
                ))}
              </ul>
            </section>
          );
        })}

        <h2>Keyboards by Price Range</h2>
        <h3>Budget (Under $80)</h3>
        <ul>
          {keyboards.filter((m) => m?.price < 80).sort((a, b) => a?.price - b?.price).map((m) => (
            <li key={m.id}><a href={`/keyboards/${slug(m.name)}`}>{m.name}</a> — ${m?.price} ({m.brand})</li>
          ))}
        </ul>
        <h3>Mid-Range ($80-$150)</h3>
        <ul>
          {keyboards.filter((m) => m?.price >= 80 && m?.price <= 150).sort((a, b) => a?.price - b?.price).map((m) => (
            <li key={m.id}><a href={`/keyboards/${slug(m.name)}`}>{m.name}</a> — ${m?.price} ({m.brand})</li>
          ))}
        </ul>
        <h3>Premium (Over $150)</h3>
        <ul>
          {keyboards.filter((m) => m?.price > 150).sort((a, b) => a?.price - b?.price).map((m) => (
            <li key={m.id}><a href={`/keyboards/${slug(m.name)}`}>{m.name}</a> — ${m?.price} ({m.brand})</li>
          ))}
        </ul>

        <nav aria-label="Related"><ul>
          <li><a href="/players">Pro Player Settings and Gear</a></li>
          <li><a href="/brands">Brand Comparison and Analysis</a></li>
          <li><a href="/switches">Switch Analytics and Comparison</a></li>
          <li><a href="/compare">Compare Any Two Keyboards Side by Side</a></li>
          <li><a href="/shapes">Keyboard Layout Overlay Tool</a></li>
          <li><a href="/games">Keyboard Usage by Esports Game</a></li>
          <li><a href="/trends">Keyboard Industry Trends 2019-2025</a></li>
          <li><a href="/sensitivity">Sensitivity Converter</a></li>
          <li><a href="/lab">Keyboard Finder Quiz</a></li>
          <li><a href="/">EsportsKeyboards Home</a></li>
        </ul></nav>
      </article>

      <SSRSection>
        <SSRTitle accent="All">Esports Keyboards</SSRTitle>
        <SSRSub>Complete database of {keyboards.length} professional esports gaming keyboards with full specs, pro usage stats, and expert ratings.</SSRSub>
        <SSRGrid>
          <SSRStat label="Total Keyboards" value={keyboards.length} color="#b8956a" />
          <SSRStat label="Avg Weight" value={`${avgWeight}g`} color="#b8956a" />
          <SSRStat label="Avg Price" value={`$${avgPrice}`} color="#b8956a" />
          <SSRStat label="Wireless" value={`${Math.round(wirelessCount/keyboards.length*100)}%`} color="#b8956a" />
        </SSRGrid>
        <div className="flex flex-wrap gap-2">
          <SSRLink href="/players">Pro Settings</SSRLink>
          <SSRLink href="/compare">Compare</SSRLink>
          <SSRLink href="/brands">Brands</SSRLink>
          <SSRLink href="/switches">Switches</SSRLink>
          <SSRLink href="/shapes">Shapes</SSRLink>
        </div>
      </SSRSection>

      <EsportsKeyboards initialTab="keyboards" />
    </>
  );
}
