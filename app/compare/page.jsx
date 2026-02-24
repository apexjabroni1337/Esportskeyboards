import EsportsKeyboards from "@/components/ClientApp";
import { SSRSection, SSRTitle, SSRSub, SSRGrid, SSRStat, SSRLink, SSRDivider } from "@/components/ssr";
import { keyboards, proPlayers } from "@/data";

const slug = (n) => n.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export const metadata = {
  title: "Compare Keyboards — Side-by-Side Esports Keyboard Comparison",
  description: "Compare any two esports gaming keyboards side by side. Weight, switch type, polling rate, price, pro usage, shape, and rating — head-to-head breakdowns for all 47+ competitive keyboards.",
  alternates: { canonical: "https://esportskeyboards.com/compare" },
  openGraph: {
    title: "Compare Keyboards — Side-by-Side Esports Keyboard Comparison",
    description: "Compare any two esports gaming keyboards side by side with full specs.",
    url: "https://esportskeyboards.com/compare",
    images: [{ url: "https://esportskeyboards.com/og?title=Compare+Keyboards&subtitle=Side-by-Side+Specs+%C2%B7+Head-to-Head+Breakdowns", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function ComparePage() {
  const top10 = [...keyboards].sort((a, b) => b.proUsage - a.proUsage).slice(0, 10);
  // Generate popular comparison pairs from top keyboards
  const pairs = [];
  for (let i = 0; i < top10.length; i++) {
    for (let j = i + 1; j < top10.length && pairs.length < 15; j++) {
      pairs.push([top10[i], top10[j]]);
    }
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: `What is the best keyboard for esports — ${top10[0].name} or ${top10[1].name}?`, acceptedAnswer: { "@type": "Answer", text: `The ${top10[0].name} has ${top10[0].proUsage}% pro usage vs ${top10[1].proUsage}% for the ${top10[1].name}. The ${top10[0].name} weighs ${top10[0].weight}g ($${top10[0].price}) while the ${top10[1].name} weighs ${top10[1].weight}g ($${top10[1].price}). Both are excellent choices — compare them side by side using our comparison tool to see which matches your preferences.` }},
          { "@type": "Question", name: "How do I choose between two gaming keyboards?", acceptedAnswer: { "@type": "Answer", text: `Compare weight (lighter = faster flicks), shape (symmetrical vs ergonomic), switch quality, polling rate (higher = less input lag), price, and pro player adoption. Our comparison tool lets you compare any two keyboards from our ${keyboards.length}-keyboard database side by side across all these metrics.` }},
          { "@type": "Question", name: "Does keyboard weight matter for esports?", acceptedAnswer: { "@type": "Answer", text: "Yes — keyboard weight significantly impacts aiming feel. Sub-50g ultralight keyboards allow faster flicks with less fatigue, which most FPS pros prefer. However, some players prefer 60-80g for more controlled, stable tracking. The best weight is personal preference based on your grip style and game." }},
        ],
      }) }} />
      <article
        className="absolute overflow-hidden"
        style={{ width: 1, height: 1, padding: 0, margin: -1, clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}
      >
        <h1>Compare Esports Keyboards — Side-by-Side Specification Comparison</h1>
        <p>
          Compare any two professional esports gaming keyboards head to head. Our comparison tool shows weight,
          switch type, polling rate, price, pro usage, shape, connectivity, switches, battery life, and expert
          rating side by side across all {keyboards.length} keyboards in our database.
        </p>

        <h2>Popular Keyboard Comparisons</h2>
        <ul>
          {pairs.map(([a, b], i) => (
            <li key={i}>
              <a href={`/keyboards/${slug(a.name)}`}>{a.name}</a> vs <a href={`/keyboards/${slug(b.name)}`}>{b.name}</a>
              {" "}— {a.weight}g vs {b.weight}g, ${a.price} vs ${b.price}, {a.proUsage}% vs {b.proUsage}% pro usage
            </li>
          ))}
        </ul>

        <h2>All Keyboards Available for Comparison</h2>
        <table>
          <caption>Full specification table for all {keyboards.length} esports keyboards</caption>
          <thead><tr><th>Keyboard</th><th>Brand</th><th>Weight</th><th>Switch</th><th>Hz</th><th>Layout</th><th>Price</th><th>Pro %</th><th>Rating</th></tr></thead>
          <tbody>
            {[...keyboards].sort((a, b) => b.proUsage - a.proUsage).map((m) => (
              <tr key={m.id}>
                <td><a href={`/keyboards/${slug(m.name)}`}>{m.name}</a></td>
                <td><a href="/brands">{m.brand}</a></td>
                <td>{m.weight}g</td>
                <td><a href="/switches">{m.switchType}</a></td>
                <td>{m.pollingRate.toLocaleString()}</td>
                <td>{m.layout}</td>
                <td>${m.price}</td>
                <td>{m.proUsage}%</td>
                <td>{m.rating}/10</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Comparison Categories</h2>
        <h3>Lightest vs Heaviest</h3>
        {(() => {
          const lightest = [...keyboards].sort((a, b) => a.weight - b.weight)[0];
          const heaviest = [...keyboards].sort((a, b) => b.weight - a.weight)[0];
          return <p><a href={`/keyboards/${slug(lightest.name)}`}>{lightest.name}</a> ({lightest.weight}g) vs <a href={`/keyboards/${slug(heaviest.name)}`}>{heaviest.name}</a> ({heaviest.weight}g) — a {heaviest.weight - lightest.weight}g difference.</p>;
        })()}
        <h3>Cheapest vs Most Expensive</h3>
        {(() => {
          const cheapest = [...keyboards].sort((a, b) => a.price - b.price)[0];
          const priciest = [...keyboards].sort((a, b) => b.price - a.price)[0];
          return <p><a href={`/keyboards/${slug(cheapest.name)}`}>{cheapest.name}</a> (${cheapest.price}) vs <a href={`/keyboards/${slug(priciest.name)}`}>{priciest.name}</a> (${priciest.price})</p>;
        })()}
        <h3>Most Used vs Least Used by Pros</h3>
        {(() => {
          const most = [...keyboards].sort((a, b) => b.proUsage - a.proUsage)[0];
          const least = [...keyboards].sort((a, b) => a.proUsage - b.proUsage)[0];
          return <p><a href={`/keyboards/${slug(most.name)}`}>{most.name}</a> ({most.proUsage}%) vs <a href={`/keyboards/${slug(least.name)}`}>{least.name}</a> ({least.proUsage}%)</p>;
        })()}

        <nav aria-label="Related"><ul>
          <li><a href="/keyboards">All Esports Keyboards — Full Database</a></li>
          <li><a href="/switches">Switch Comparison</a></li>
          <li><a href="/shapes">Shape Overlay Tool</a></li>
          <li><a href="/players">Pro Player Settings</a></li>
          <li><a href="/brands">Keyboard Brands</a></li>
          <li><a href="/trends">Industry Trends</a></li>
          <li><a href="/lab">Keyboard Finder Quiz</a></li>
          <li><a href="/">EsportsKeyboards Home</a></li>
        </ul></nav>
      </article>

      <SSRSection>
        <SSRTitle accent="Compare">Keyboards</SSRTitle>
        <SSRSub>Select any two esports keyboards to compare head-to-head. Full specs, pro usage, pricing, and ratings side by side across {keyboards.length} keyboards.</SSRSub>
        <SSRGrid>
          <SSRStat label="Total Keyboards" value={keyboards.length} color="#b8956a" />
          <SSRStat label="Comparisons" value={`${keyboards.length * (keyboards.length - 1) / 2}+`} color="#b8956a" />
        </SSRGrid>
        <div className="flex flex-wrap gap-2">
          <SSRLink href="/keyboards">All Keyboards</SSRLink>
          <SSRLink href="/shapes">Shape Overlay</SSRLink>
          <SSRLink href="/switches">Switches</SSRLink>
          <SSRLink href="/brands">Brands</SSRLink>
        </div>
      </SSRSection>

      <EsportsKeyboards initialTab="compare" />
    </>
  );
}
