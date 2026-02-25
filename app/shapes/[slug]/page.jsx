import EsportsKeyboards from "@/components/ClientApp";
import { keyboards, allPlayers, BRAND_COLORS, KEYBOARD_DIMS, amazonLink } from "@/data";

const sl = (n) => n.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");

const SHAPES = {
  symmetrical: {
    title: "Symmetrical",
    aka: "Ambidextrous",
    description: "Symmetrical (ambidextrous) keyboards have a mirror-image design that is identical on both sides. They are the dominant shape in professional esports, favored by claw and fingertip grip players for their versatility and precision. The symmetrical form allows rapid micro-adjustments and consistent tracking regardless of how you position your hand. Notable symmetrical designs include the Wooting 60HE, Razer Huntsman V3 Pro Mini, and Logitech G Pro X 60. Over 70% of professional FPS players use symmetrical keyboards.",
    gripAdvice: "Best for claw grip and fingertip grip. Palm grip users with smaller hands can also be comfortable with larger symmetrical keyboards. The flat sides provide consistent contact points for precise control during fast flick movements.",
    prosAdvice: "Symmetrical keyboards dominate competitive FPS because they allow the widest range of grip adjustments mid-game. Players can shift their hand position forward for aggressive play or back for passive angles without losing control. The consistent side profile also makes it easier to develop muscle memory for consistent aim.",
  },
  ergonomic: {
    title: "Ergonomic",
    aka: "Right-Handed",
    description: "Ergonomic (right-handed) keyboards feature an asymmetric design that curves to fit the natural resting position of the right hand. They provide superior comfort for long sessions by reducing wrist strain and encouraging a more relaxed grip. Classic ergonomic designs like the Razer Huntsman Elite, Corsair K70, and Vaxee Outset have been staples in professional gaming for over a decade. While less common than symmetrical keyboards in the pro scene, ergonomic keyboards are preferred by players who prioritize comfort and use a palm or relaxed claw grip.",
    gripAdvice: "Best for palm grip and relaxed claw grip. The contoured shape fills the hand naturally, reducing the need for grip pressure. Not recommended for fingertip grip due to the pronounced hump and curved sides.",
    prosAdvice: "Ergonomic keyboards are favored by players who play long sessions or who prioritize comfort over raw speed. Many Counter-Strike veterans who grew up on the traditional full-size keyboards continue to prefer ergonomic layouts even as the meta shifts toward symmetrical designs.",
  },
};

export function generateStaticParams() {
  return Object.keys(SHAPES).map(s => ({ slug: s }));
}

export function generateMetadata({ params }) {
  const shape = SHAPES[params.slug];
  if (!shape) return { title: "Shape Not Found" };

  const shapeKeyboards = keyboards.filter(m => m.layout === shape.title);
  const description = `${shape.title} (${shape.aka}) gaming keyboards — ${shapeKeyboards.length} keyboards reviewed. Pro usage data, top picks, weight and price comparisons. Find the best ${shape.title.toLowerCase()} keyboard for your grip style.`;

  return {
    title: `Best ${shape.title} Gaming Keyboards — ${shapeKeyboards.length} Keyboards Compared`,
    description,
    alternates: { canonical: `https://esportskeyboards.com/shapes/${params.slug}` },
    openGraph: {
      title: `Best ${shape.title} Gaming Keyboards — ${shapeKeyboards.length} Keyboards Compared`,
      description,
      url: `https://esportskeyboards.com/shapes/${params.slug}`,
      images: [{ url: `https://esportskeyboards.com/og?title=Best+${shape.title}+Keyboards&subtitle=${shapeKeyboards.length}+Keyboards+Compared+%C2%B7+Pro+Usage+Data`, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default function ShapePage({ params }) {
  const shape = SHAPES[params.slug];
  if (!shape) {
    return (
      <>
        <div style={{ padding: 40, textAlign: "center", color: "#1a1614" }}><h1>Shape Not Found</h1></div>
        <EsportsKeyboards initialTab="shapes" />
      </>
    );
  }

  const shapeKeyboards = keyboards.filter(m => m.layout === shape.title).sort((a, b) => b?.proUsage - a?.proUsage);
  const totalProUsage = shapeKeyboards.reduce((a, m) => a + m.proUsage, 0);
  const avgWeight = Math.round(shapeKeyboards.reduce((a, m) => a + m?.weight, 0) / shapeKeyboards.length);
  const avgPrice = Math.round(shapeKeyboards.reduce((a, m) => a + m?.price, 0) / shapeKeyboards.length);
  const brands = [...new Set(shapeKeyboards.map(m => m.brand))].sort();
  const lightestKeyboard = [...shapeKeyboards].sort((a, b) => a?.weight - b?.weight)[0];
  const mostUsedKeyboard = shapeKeyboards[0];
  const budgetPick = [...shapeKeyboards].filter(m => m.proUsage > 0.5).sort((a, b) => a?.price - b?.price)[0];
  const wirelessCount = shapeKeyboards.filter(m => m.wireless).length;

  // Count pro players using this shape
  let playerCount = 0;
  allPlayers.forEach(p => {
    if (!p.keyboard) return;
    const matched = shapeKeyboards.find(m => {
      const mn = m.name.toLowerCase();
      const pm = p.keyboard.toLowerCase();
      return pm === mn || pm.includes(mn) || mn.includes(pm);
    });
    if (matched) playerCount++;
  });

  const otherShape = params.slug === "symmetrical" ? "ergonomic" : "symmetrical";
  const otherShapeData = SHAPES[otherShape];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: `Best ${shape.title} Gaming Keyboards`,
        description: shape.description,
        url: `https://esportskeyboards.com/shapes/${params.slug}`,
        numberOfItems: shapeKeyboards.length,
        itemListElement: shapeKeyboards.slice(0, 10).map((m, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Product",
            name: m.name,
            brand: { "@type": "Brand", name: m.brand },
            url: `https://esportskeyboards.com/keyboards/${sl(m.name)}`,
          },
        })),
      }) }} />

      <article
        className="absolute overflow-hidden"
        style={{ width: 1, height: 1, padding: 0, margin: -1, clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}
      >
        <h1>Best {shape.title} ({shape.aka}) Gaming Keyboards for Esports — {shapeKeyboards.length} Keyboards Compared</h1>

        <h2>What is a {shape.title} Keyboard?</h2>
        <p>{shape.description}</p>

        <h2>Grip Style Guide for Keyboards</h2>
        <p>{shape.gripAdvice}</p>

        <h2>Why Pros Choose Keyboards</h2>
        <p>{shape.prosAdvice}</p>

        <h2>{shape.title} Keyboard Statistics</h2>
        <table>
          <caption>Overview of {shape.title.toLowerCase()} keyboards in professional esports</caption>
          <tbody>
            <tr><th>Total {shape.title} Keyboards</th><td>{shapeKeyboards.length}</td></tr>
            <tr><th>Combined Pro Usage</th><td>{totalProUsage}%</td></tr>
            <tr><th>Pro Players Using</th><td>{playerCount}</td></tr>
            <tr><th>Average Weight</th><td>{avgWeight}g</td></tr>
            <tr><th>Average Price</th><td>${avgPrice}</td></tr>
            <tr><th>Wireless Options</th><td>{wirelessCount} of {shapeKeyboards.length}</td></tr>
            <tr><th>Brands</th><td>{brands.join(", ")}</td></tr>
            {mostUsedKeyboard && <tr><th>Most Used by Pros</th><td><a href={`/keyboards/${sl(mostUsedKeyboard.name)}`}>{mostUsedKeyboard.name}</a> ({mostUsedKeyboard.proUsage}%)</td></tr>}
            {lightestKeyboard && <tr><th>Lightest</th><td><a href={`/keyboards/${sl(lightestKeyboard.name)}`}>{lightestKeyboard.name}</a> ({lightestKeyboard?.weight}g)</td></tr>}
            {budgetPick && <tr><th>Best Budget Pick</th><td><a href={`/keyboards/${sl(budgetPick.name)}`}>{budgetPick.name}</a> (${budgetPick?.price})</td></tr>}
          </tbody>
        </table>

        <h2>All Keyboards Ranked by Pro Usage</h2>
        <table>
          <caption>{shapeKeyboards.length} {shape.title.toLowerCase()} gaming keyboards ranked by professional player usage</caption>
          <thead><tr><th>Rank</th><th>Keyboard</th><th>Brand</th><th>Weight</th><th>Price</th><th>Pro Usage</th><th>Switch</th><th>Connectivity</th></tr></thead>
          <tbody>
            {shapeKeyboards.map((m, i) => (
              <tr key={m.id}>
                <td>{i + 1}</td>
                <td><a href={`/keyboards/${sl(m.name)}`}>{m.name}</a></td>
                <td><a href={`/brands/${sl(m.brand)}`}>{m.brand}</a></td>
                <td>{m?.weight}g</td>
                <td>${m?.price}</td>
                <td>{m.proUsage}%</td>
                <td><a href={`/sensors/${sl(m.switchType)}`}>{m.switchType}</a></td>
                <td>{m.connectivity}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Related Pages</h2>
        <nav>
          <ul>
            <li><a href={`/shapes/${otherShape}`}>Best Keyboards</a></li>
            <li><a href="/shapes">Shape Overlay Comparison Tool</a></li>
            <li><a href="/keyboards">All Keyboards</a></li>
            <li><a href="/lab">Keyboard Finder Quiz</a></li>
            {shapeKeyboards.slice(0, 5).map(m => <li key={m.id}><a href={`/keyboards/${sl(m.name)}`}>{m.name} Review</a></li>)}
          </ul>
        </nav>
      </article>

      <EsportsKeyboards initialTab="shapes" />
    </>
  );
}
