import EsportsKeyboards from "@/components/ClientApp";
import { SSRSection, SSRTitle, SSRSub, SSRGrid, SSRStat, SSRLink, SSRDivider } from "@/components/ssr";
import { keyboards, allPlayers, BRAND_COLORS, KEYBOARD_IMAGE_URLS, amazonLink } from "@/data";

const slug = (n) => n.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");

// Generate top 15 keyboards pairs = 105 comparison pages
const TOP_N = 15;
const topKeyboards = [...keyboards].sort((a, b) => b.proUsage - a.proUsage).slice(0, TOP_N);

function getPair(pairSlug) {
  // Try all combinations to find the matching pair
  for (let i = 0; i < keyboards.length; i++) {
    for (let j = i + 1; j < keyboards.length; j++) {
      const combo = slug(keyboards[i].name) + "-vs-" + slug(keyboards[j].name);
      const comboRev = slug(keyboards[j].name) + "-vs-" + slug(keyboards[i].name);
      if (pairSlug === combo || pairSlug === comboRev) {
        return [keyboards[i], keyboards[j]];
      }
    }
  }
  return null;
}

export function generateStaticParams() {
  const params = [];
  for (let i = 0; i < topKeyboards.length; i++) {
    for (let j = i + 1; j < topKeyboards.length; j++) {
      params.push({ slug: slug(topKeyboards[i].name) + "-vs-" + slug(topKeyboards[j].name) });
    }
  }
  return params;
}

export function generateMetadata({ params }) {
  const pair = getPair(params.slug);
  if (!pair) return { title: "Keyboard Comparison" };
  const [a, b] = pair;

  const title = `${a.name} vs ${b.name} — Side-by-Side Comparison`;
  const description = `Compare the ${a.name} (${a.weight}g, $${a.price}, ${a.proUsage}% pro usage) vs ${b.name} (${b.weight}g, $${b.price}, ${b.proUsage}% pro usage). Full specs, switch, shape, polling rate, and pro player data head-to-head.`;

  return {
    title,
    description,
    alternates: { canonical: `https://esportskeyboards.com/compare/${params.slug}` },
    openGraph: {
      title,
      description,
      url: `https://esportskeyboards.com/compare/${params.slug}`,
      images: [{
        url: `https://esportskeyboards.com/og?title=${encodeURIComponent(a.name + " vs " + b.name)}&subtitle=${encodeURIComponent("Head-to-Head Comparison")}&stat1=${encodeURIComponent(a.weight + "g vs " + b.weight + "g")}&s1Label=Weight&stat2=${encodeURIComponent(a.proUsage + "% vs " + b.proUsage + "%")}&s2Label=Pro+Usage&stat3=${encodeURIComponent("$" + a.price + " vs $" + b.price)}&s3Label=Price`,
        width: 1200, height: 630,
      }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

function winner(a, b, key, lower = false) {
  if (a[key] === b[key]) return "tie";
  if (lower) return a[key] < b[key] ? "a" : "b";
  return a[key] > b[key] ? "a" : "b";
}

export default function ComparisonPage({ params }) {
  const pair = getPair(params.slug);
  if (!pair) return <EsportsKeyboards initialTab="compare" />;
  const [a, b] = pair;

  const aPlayers = allPlayers.filter(p => {
    const pm = p.keyboard.toLowerCase();
    const mn = a.name.toLowerCase();
    return pm === mn || pm.includes(mn) || mn.includes(pm);
  }).slice(0, 10);
  const bPlayers = allPlayers.filter(p => {
    const pm = p.keyboard.toLowerCase();
    const mn = b.name.toLowerCase();
    return pm === mn || pm.includes(mn) || mn.includes(pm);
  }).slice(0, 10);

  const specs = [
    { label: "Weight", aVal: `${a.weight}g`, bVal: `${b.weight}g`, winner: winner(a, b, "weight", true), detail: "Lighter keyboards allow faster flicks with less fatigue" },
    { label: "Switch Type", aVal: a.switch, bVal: b.switch, winner: "tie", detail: "Both sensors are top-tier for competitive play" },
    { label: "Polling Rate", aVal: `${a.pollingRate >= 1000 ? a.pollingRate/1000 + "K" : a.pollingRate}Hz`, bVal: `${b.pollingRate >= 1000 ? b.pollingRate/1000 + "K" : b.pollingRate}Hz`, winner: winner(a, b, "pollingRate"), detail: "Higher polling = less input delay" },
    { label: "Shape", aVal: a.shape, bVal: b.shape, winner: "tie", detail: "Shape preference is subjective" },
    { label: "Connectivity", aVal: a.connectivity, bVal: b.connectivity, winner: "tie" },
    { label: "Price", aVal: `$${a.price}`, bVal: `$${b.price}`, winner: winner(a, b, "price", true), detail: "Lower price = better value" },
    { label: "Pro Usage", aVal: `${a.proUsage}%`, bVal: `${b.proUsage}%`, winner: winner(a, b, "proUsage"), detail: "Higher adoption among professional players" },
    { label: "Rating", aVal: `${a.rating}/10`, bVal: `${b.rating}/10`, winner: winner(a, b, "rating"), detail: "Expert review score" },
  ];

  const aWins = specs.filter(s => s.winner === "a").length;
  const bWins = specs.filter(s => s.winner === "b").length;

  // Other popular comparisons
  const otherComparisons = [];
  for (let i = 0; i < topKeyboards.length && otherComparisons.length < 8; i++) {
    for (let j = i + 1; j < topKeyboards.length && otherComparisons.length < 8; j++) {
      const s = slug(topKeyboards[i].name) + "-vs-" + slug(topKeyboards[j].name);
      if (s !== params.slug) {
        otherComparisons.push({ slug: s, a: topKeyboards[i].name, b: topKeyboards[j].name });
      }
    }
  }

  return (
    <>
      {/* Comparison JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: `Is the ${a.name} or ${b.name} better for esports?`, acceptedAnswer: { "@type": "Answer", text: `The ${a.name} has ${a.proUsage}% pro usage vs ${b.proUsage}% for the ${b.name}. The ${a.name} weighs ${a.weight}g and costs $${a.price}, while the ${b.name} weighs ${b.weight}g at $${b.price}. ${aWins > bWins ? `The ${a.name} wins in ${aWins} categories` : bWins > aWins ? `The ${b.name} wins in ${bWins} categories` : "They tie overall"} in our head-to-head comparison. The best choice depends on hand size, grip style, and personal preference.` }},
          { "@type": "Question", name: `${a.name} vs ${b.name} — which is lighter?`, acceptedAnswer: { "@type": "Answer", text: `The ${a.weight < b.weight ? a.name + " is lighter at " + a.weight + "g vs " + b.weight + "g" : b.weight < a.weight ? b.name + " is lighter at " + b.weight + "g vs " + a.weight + "g" : "both weigh the same at " + a.weight + "g"}. ${a.weight < b.weight ? "That's " + (b.weight - a.weight) + "g lighter" : b.weight < a.weight ? "That's " + (a.weight - b.weight) + "g lighter" : ""}.` }},
          { "@type": "Question", name: `Which keyboard do more pros use — ${a.name} or ${b.name}?`, acceptedAnswer: { "@type": "Answer", text: `The ${a.proUsage > b.proUsage ? a.name + " is more popular among pros with " + a.proUsage + "% usage vs " + b.proUsage + "%" : b.name + " is more popular among pros with " + b.proUsage + "% usage vs " + a.proUsage + "%"}. Pro usage is tracked across ${allPlayers.length}+ players in our database.` }},
        ],
      }) }} />
      {/* Breadcrumb */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "EsportsKeyboards", item: "https://esportskeyboards.com" },
          { "@type": "ListItem", position: 2, name: "Compare", item: "https://esportskeyboards.com/compare" },
          { "@type": "ListItem", position: 3, name: `${a.name} vs ${b.name}`, item: `https://esportskeyboards.com/compare/${params.slug}` },
        ],
      }) }} />

      <article
        className="absolute overflow-hidden"
        style={{ width: 1, height: 1, padding: 0, margin: -1, clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}
      >
        <h1>{a.name} vs {b.name} — Head-to-Head Esports Keyboard Comparison</h1>
        <p>Detailed side-by-side comparison of the {a.name} and {b.name}. Compare weight, switch type, polling rate, shape, price, pro usage, and rating.</p>

        <h2>Specification Comparison</h2>
        <table>
          <caption>{a.name} vs {b.name} — Full Specs</caption>
          <thead><tr><th>Spec</th><th>{a.name}</th><th>{b.name}</th><th>Winner</th></tr></thead>
          <tbody>
            {specs.map(s => (
              <tr key={s.label}>
                <td>{s.label}</td>
                <td>{s.aVal}</td>
                <td>{s.bVal}</td>
                <td>{s.winner === "a" ? a.name : s.winner === "b" ? b.name : "Tie"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Verdict</h2>
        <p>
          {aWins > bWins
            ? `The ${a.name} wins ${aWins} out of ${specs.length} categories. It is the better choice for players who prioritize ${specs.filter(s => s.winner === "a").map(s => s.label.toLowerCase()).join(", ")}.`
            : bWins > aWins
            ? `The ${b.name} wins ${bWins} out of ${specs.length} categories. It is the better choice for players who prioritize ${specs.filter(s => s.winner === "b").map(s => s.label.toLowerCase()).join(", ")}.`
            : `Both keyboards are evenly matched with ${aWins} wins each. The best choice comes down to personal shape preference and grip style.`}
        </p>

        <h2>Pro Players Using {a.name}</h2>
        <ul>
          {aPlayers.map(p => (
            <li key={p.name}><a href={`/players/${slug(p.name)}`}>{p.name}</a> ({p.game}, {p.team}) — {p.dpi} DPI, {p.edpi} eDPI</li>
          ))}
        </ul>

        <h2>Pro Players Using {b.name}</h2>
        <ul>
          {bPlayers.map(p => (
            <li key={p.name}><a href={`/players/${slug(p.name)}`}>{p.name}</a> ({p.game}, {p.team}) — {p.dpi} DPI, {p.edpi} eDPI</li>
          ))}
        </ul>

        <h2>Buy</h2>
        <ul>
          <li><a href={amazonLink(a.name)}>Buy {a.name} on Amazon</a> — ${a.price}</li>
          <li><a href={amazonLink(b.name)}>Buy {b.name} on Amazon</a> — ${b.price}</li>
        </ul>

        <h2>More Comparisons</h2>
        <ul>
          {otherComparisons.map(c => (
            <li key={c.slug}><a href={`/compare/${c.slug}`}>{c.a} vs {c.b}</a></li>
          ))}
        </ul>

        <nav aria-label="Related"><ul>
          <li><a href={`/keyboards/${slug(a.name)}`}>{a.name} Full Review</a></li>
          <li><a href={`/keyboards/${slug(b.name)}`}>{b.name} Full Review</a></li>
          <li><a href="/keyboards">All Esports Keyboards</a></li>
          <li><a href="/compare">Compare Tool</a></li>
          <li><a href="/players">Pro Player Settings</a></li>
        </ul></nav>
      </article>

      <SSRSection>
        <SSRTitle accent={a.name}>{`vs ${b.name}`}</SSRTitle>
        <SSRSub>Head-to-head comparison of two popular esports keyboards. {aWins > bWins ? `${a.name} wins ${aWins}/${specs.length} categories.` : bWins > aWins ? `${b.name} wins ${bWins}/${specs.length} categories.` : "Evenly matched."}</SSRSub>
        <SSRGrid>
          <SSRStat label={a.name} value={`${a.weight}g · $${a.price}`} color={BRAND_COLORS[a.brand] || "#b8956a"} />
          <SSRStat label={b.name} value={`${b.weight}g · $${b.price}`} color={BRAND_COLORS[b.brand] || "#6b8cad"} />
          <SSRStat label="Pro Usage" value={`${a.proUsage}% vs ${b.proUsage}%`} color="#b8956a" />
          <SSRStat label="Verdict" value={aWins > bWins ? `${a.name.split(" ")[0]} wins` : bWins > aWins ? `${b.name.split(" ")[0]} wins` : "Tied"} color="#b8956a" />
        </SSRGrid>
        <div className="flex flex-wrap gap-2">
          <SSRLink href={`/keyboards/${slug(a.name)}`}>{a.name}</SSRLink>
          <SSRLink href={`/keyboards/${slug(b.name)}`}>{b.name}</SSRLink>
          <SSRLink href="/compare">Compare Tool</SSRLink>
          <SSRLink href="/keyboards">All Keyboards</SSRLink>
        </div>
      </SSRSection>

      <EsportsKeyboards initialTab="compare" />
    </>
  );
}
