import EsportsKeyboards from "@/components/ClientApp";
import { SSRSection, SSRTitle, SSRSub, SSRGrid, SSRStat, SSRLink, SSRDivider } from "@/components/ssr";
import { keyboards, KEYBOARD_DESCRIPTIONS, BRAND_COLORS, KEYBOARD_IMAGE_URLS, allPlayers, amazonLink } from "@/data";

export function generateStaticParams() {
  return keyboards.map((kb) => ({
    slug: kb.name.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, ""),
  }));
}

export function generateMetadata({ params }) {
  const kb = keyboards.find(
    (m) => m.name.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "") === params.slug
  );
  if (!kb) {
    return { title: "Keyboard Not Found" };
  }
  const desc = KEYBOARD_DESCRIPTIONS[kb.name];
  const description = desc
    ? desc.text.slice(0, 155) + "..."
    : `${kb.name} by ${kb.brand} — ${kb?.weight}g, ${kb.switchType} switch, ${kb.pollingRate}Hz polling, $${kb?.price}. Used by ${kb?.proUsage}% of tracked pro esports players.`;

  return {
    title: `${kb.name} — Pro Esports Keyboard Review & Stats`,
    description,
    alternates: { canonical: `https://esportskeyboards.com/keyboards/${params.slug}` },
    openGraph: {
      title: `${kb.name} — Pro Esports Keyboard Review & Stats`,
      description,
      url: `https://esportskeyboards.com/keyboards/${params.slug}`,
      images: [{
        url: `https://esportskeyboards.com/og?title=${encodeURIComponent(kb.name)}&subtitle=${encodeURIComponent(`${kb.brand} · ${kb.switchType}`)}&badge=${encodeURIComponent(kb.brand)}&accent=${encodeURIComponent(BRAND_COLORS[kb.brand] || '#b8956a')}&stat1=${encodeURIComponent(kb?.weight + 'g')}&s1Label=Weight&stat2=${encodeURIComponent(kb?.proUsage + '%')}&s2Label=Pro+Usage&stat3=${encodeURIComponent('$' + kb?.price)}&s3Label=Price`,
        width: 1200, height: 630,
        alt: `${kb.name} by ${kb.brand} - esports gaming keyboard`,
      }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${kb.name} — Pro Esports Keyboard Review & Stats`,
      description,
      images: [`https://esportskeyboards.com/og?title=${encodeURIComponent(kb.name)}&subtitle=${encodeURIComponent(`${kb.brand} · ${kb.switchType}`)}&badge=${encodeURIComponent(kb.brand)}&accent=${encodeURIComponent(BRAND_COLORS[kb.brand] || '#b8956a')}&stat1=${encodeURIComponent(kb?.weight + 'g')}&s1Label=Weight&stat2=${encodeURIComponent(kb?.proUsage + '%')}&s2Label=Pro+Usage&stat3=${encodeURIComponent('$' + kb?.price)}&s3Label=Price`],
    },
  };
}

export default function MouseDetailPage({ params }) {
  const kb = keyboards.find(
    (m) => m.name.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "") === params.slug
  );
  if (!kb) return <EsportsKeyboards initialTab="overview" />;

  const desc = KEYBOARD_DESCRIPTIONS[kb.name];
  const usedBy = allPlayers.filter((p) => {
    const mn = kb.name.toLowerCase();
    const pm = p.keyboard.toLowerCase();
    return pm === mn || pm.includes(mn) || mn.includes(pm);
  }).slice(0, 30);
  const imgUrl = KEYBOARD_IMAGE_URLS[kb.name];

  return (
    <>
      {/* JSON-LD Product structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        name: kb.name,
        brand: { "@type": "Brand", name: kb.brand },
        description: desc ? desc.text.slice(0, 300) : `${kb.name} by ${kb.brand}. ${kb?.weight}g ${kb.layout.toLowerCase()} gaming keyboard with ${kb.switchType} switch, ${kb.pollingRate >= 1000 ? `${kb.pollingRate / 1000}K` : kb.pollingRate}Hz polling. Used by ${kb?.proUsage}% of pro esports players.`,
        ...(imgUrl ? { image: `https://esportskeyboards.com${imgUrl}` } : {}),
        offers: {
          "@type": "Offer",
          price: String(kb?.price),
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: amazonLink(kb.name),
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: String(kb.rating),
          bestRating: "10",
          ratingCount: String(Math.max(usedBy.length, 1)),
        },
        additionalProperty: [
          { "@type": "PropertyValue", name: "Weight", value: `${kb?.weight}g` },
          { "@type": "PropertyValue", name: "Switch Type", value: kb.switchType },
          { "@type": "PropertyValue", name: "Polling Rate", value: `${kb.pollingRate}Hz` },
          { "@type": "PropertyValue", name: "Shape", value: kb.layout },
          { "@type": "PropertyValue", name: "Connectivity", value: kb.connectivity },
          { "@type": "PropertyValue", name: "Pro Usage", value: `${kb?.proUsage}%` },
        ],
      }) }} />
      {/* Breadcrumb JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://esportskeyboards.com" },
          { "@type": "ListItem", position: 2, name: "Keyboards", item: "https://esportskeyboards.com/keyboards" },
          { "@type": "ListItem", position: 3, name: kb.name, item: `https://esportskeyboards.com/keyboards/${params.slug}` },
        ],
      }) }} />
      {/* Server-rendered SEO content — in the HTML for crawlers, visually hidden */}
      <article
        className="absolute overflow-hidden"
        style={{ width: 1, height: 1, padding: 0, margin: -1, clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}
        itemScope itemType="https://schema.org/Product"
      >
        <h1 itemProp="name">{kb.name} — Professional Esports Gaming Keyboard Review and Stats</h1>
        <div itemProp="brand" itemScope itemType="https://schema.org/Brand">
          <meta itemProp="name" content={kb.brand} />
        </div>
        {imgUrl && <meta itemProp="image" content={`https://esportskeyboards.com${imgUrl}`} />}
        <meta itemProp="description" content={desc ? desc.text : `${kb.name} by ${kb.brand}. ${kb?.weight}g, ${kb.switchType} switch, ${kb.pollingRate}Hz polling rate.`} />
        <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
          <meta itemProp="price" content={String(kb?.price)} />
          <meta itemProp="priceCurrency" content="USD" />
          <meta itemProp="availability" content="https://schema.org/InStock" />
          <meta itemProp="url" content={amazonLink(kb.name)} />
        </div>
        <div itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
          <meta itemProp="ratingValue" content={String(kb.rating)} />
          <meta itemProp="bestRating" content="10" />
          <meta itemProp="ratingCount" content="1" />
        </div>

        <h2>About the {kb.name}</h2>
        {desc ? <p>{desc.text}</p> : (
          <p>
            The {kb.name} is a {kb.connectivity.toLowerCase()} {kb.layout.toLowerCase()} gaming keyboard
            made by {kb.brand}. It weighs {kb?.weight} grams and uses the {kb.switchType} switch
            with {kb.pollingRate >= 1000 ? `${kb.pollingRate / 1000}K` : kb.pollingRate}Hz
            polling rate. It is priced at ${kb?.price} USD and rated {kb.rating}/10.
          </p>
        )}

        <h2>{kb.name} Full Specifications</h2>
        <table>
          <caption>Complete specifications for the {kb.name} by {kb.brand}</caption>
          <tbody>
            <tr><th>Brand</th><td><a href={`/brands/${kb.brand.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-")}`}>{kb.brand}</a></td></tr>
            <tr><th>Weight</th><td>{kb?.weight} grams</td></tr>
            <tr><th>Switch</th><td><a href={`/sensors/${kb.switchType.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}`}>{kb.switchType}</a></td></tr>
            <tr><th>Polling Rate</th><td>{kb.pollingRate.toLocaleString()} Hz</td></tr>
            <tr><th>Layout</th><td><a href={`/shapes/${kb.layout.toLowerCase()}`}>{kb.layout}</a></td></tr>
            <tr><th>Connectivity</th><td>{kb.connectivity}</td></tr>
            <tr><th>Price</th><td>${kb?.price} USD</td></tr>
            <tr><th>Switches</th><td>{kb.switchType}</td></tr>
            <tr><th>Battery Life</th><td>{kb.batteryLife} hours</td></tr>
            <tr><th>Release Year</th><td>{kb.releaseYear}</td></tr>
            <tr><th>Pro Usage</th><td>{kb?.proUsage}% of tracked professional players</td></tr>
            <tr><th>Rating</th><td>{kb.rating} out of 10</td></tr>
          </tbody>
        </table>

        {usedBy.length > 0 && (
          <>
            <h2>Professional Players Using the {kb.name}</h2>
            <p>The {kb.name} is used by {usedBy.length}+ professional esports players across {[...new Set(usedBy.map((p) => p.game))].map((g, i, arr) => (
              <span key={g}>{i > 0 && (i === arr.length - 1 ? " and " : ", ")}<a href={`/games/${g.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}`}>{g}</a></span>
            ))}.</p>
            <ul>
              {usedBy.map((p, i) => (
                <li key={i}>
                  <a href={`/players/${p.name.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-")}`}>{p.name}</a>
                  {" "}— <a href={`/games/${p.game.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}`}>{p.game}</a> (<a href={`/teams/${p.team.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}`}>{p.team}</a>)
                </li>
              ))}
            </ul>
          </>
        )}

        {desc?.highlights && (
          <><h2>Key Highlights</h2><ul>{desc.highlights.map((h, i) => <li key={i}>{h}</li>)}</ul></>
        )}

        <p><a href={amazonLink(kb.name)}>Buy the {kb.name} on Amazon for ${kb?.price}</a></p>

        {/* Other keyboards by the same brand */}
        {(() => {
          const sameBrand = keyboards.filter((m) => m.brand === kb.brand && m.id !== kb.id);
          if (!sameBrand.length) return null;
          return (
            <>
              <h2>Other {kb.brand} Esports Keyboards</h2>
              <ul>
                {sameBrand.map((m) => (
                  <li key={m.id}>
                    <a href={`/keyboards/${m.name.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-")}`}>{m.name}</a>
                    {" "}— {m?.weight}g, {m.proUsage}% pro usage, ${m?.price}
                  </li>
                ))}
              </ul>
            </>
          );
        })()}

        {/* Keyboards with the same switch */}
        {(() => {
          const sameSensor = keyboards.filter((m) => m.switchType === kb.switchType && m.id !== kb.id);
          if (!sameSensor.length) return null;
          return (
            <>
              <h2>Other Keyboards with {kb.switchType} switches</h2>
              <ul>
                {sameSensor.map((m) => (
                  <li key={m.id}>
                    <a href={`/keyboards/${m.name.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-")}`}>{m.name}</a>
                    {" "}({m.brand}) — {m?.weight}g, ${m?.price}
                  </li>
                ))}
              </ul>
            </>
          );
        })()}

        {/* Similar keyboards by weight */}
        {(() => {
          const similar = keyboards
            .filter((m) => m.id !== kb.id && Math.abs(m?.weight - kb?.weight) <= 10)
            .sort((a, b) => Math.abs(a?.weight - kb?.weight) - Math.abs(b?.weight - kb?.weight))
            .slice(0, 8);
          if (!similar.length) return null;
          return (
            <>
              <h2>Similar Weight Esports Keyboards (±10g of {kb?.weight}g)</h2>
              <ul>
                {similar.map((m) => (
                  <li key={m.id}>
                    <a href={`/keyboards/${m.name.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-")}`}>{m.name}</a>
                    {" "}({m.brand}) — {m?.weight}g, {m.proUsage}% pro usage
                  </li>
                ))}
              </ul>
            </>
          );
        })()}

        {/* Same shape keyboards */}
        {(() => {
          const sameShape = keyboards.filter((m) => m.layout === kb.layout && m.id !== kb.id).slice(0, 8);
          if (!sameShape.length) return null;
          return (
            <>
              <h2>Other {kb.layout} Shape Esports Keyboards</h2>
              <ul>
                {sameShape.map((m) => (
                  <li key={m.id}>
                    <a href={`/keyboards/${m.name.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-")}`}>{m.name}</a>
                    {" "}({m.brand}) — {m?.weight}g, ${m?.price}
                  </li>
                ))}
              </ul>
            </>
          );
        })()}

        <nav aria-label="Related pages">
          <h2>Related Pages</h2>
          <ul>
            <li><a href="/keyboards">All Esports Keyboards</a></li>
            <li><a href="/players">Pro Player Settings</a></li>
            <li><a href="/brands">{kb.brand} and Other Brands</a></li>
            <li><a href="/switches">{kb.switchType} and Other Sensors</a></li>
            <li><a href="/compare">Compare {kb.name} vs Other Keyboards</a></li>
            <li><a href="/games">Keyboard Usage by Game</a></li>
            <li><a href="/trends">Keyboard Industry Trends</a></li>
            <li><a href="/shapes">{kb.name} Shape Dimensions</a></li>
            <li><a href="/sensitivity">Sensitivity Converter</a></li>
            <li><a href="/lab">Keyboard Finder Quiz</a></li>
            <li><a href="/">EsportsKeyboards Home</a></li>
          </ul>
        </nav>
      </article>

      {/* Visible server-rendered content */}
      <SSRSection>
        <SSRTitle accent={kb.brand}>{kb.name}</SSRTitle>

        {/* Review Card Score Badge */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "2rem", marginTop: "1rem" }}>
          <div style={{
            width: "140px",
            height: "140px",
            borderRadius: "50%",
            backgroundColor: BRAND_COLORS[kb.brand] || "#b8956a",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
          }}>
            <div style={{ fontSize: "48px", fontWeight: "700", color: "#f5f0e8", lineHeight: "1" }}>
              {kb.rating}
            </div>
            <div style={{ fontSize: "11px", fontWeight: "700", color: "#f5f0e8", marginTop: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Editor's
            </div>
            <div style={{ fontSize: "11px", fontWeight: "700", color: "#f5f0e8", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Rating
            </div>
          </div>
        </div>

        <SSRSub>
          {desc
            ? desc.text.slice(0, 280) + "..."
            : `The ${kb.name} is a ${kb?.weight}g ${kb.connectivity.toLowerCase()} ${kb.layout.toLowerCase()} gaming keyboard by ${kb.brand}, featuring the ${kb.switchType} switch with ${kb.pollingRate >= 1000 ? `${kb.pollingRate / 1000}K` : kb.pollingRate}Hz polling. Used by ${kb?.proUsage}% of tracked professional esports players.`
          }
        </SSRSub>

        {/* Key Specs Section */}
        <div style={{ marginBottom: "2rem", marginTop: "2rem" }}>
          <div style={{ fontSize: "12px", fontWeight: "700", color: "#1a1614", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "1rem" }}>
            Key Specs
          </div>
          <SSRGrid>
            <SSRStat label="Weight" value={`${kb?.weight}g`} color={BRAND_COLORS[kb.brand]} />
            <SSRStat label="Switch Type" value={kb.switchType} color={BRAND_COLORS[kb.brand]} />
            <SSRStat label="Polling Rate" value={`${kb.pollingRate >= 1000 ? `${kb.pollingRate / 1000}K` : kb.pollingRate}Hz`} color={BRAND_COLORS[kb.brand]} />
            <SSRStat label="Layout" value={kb.layout} color={BRAND_COLORS[kb.brand]} />
          </SSRGrid>
        </div>

        {/* Value & Adoption Section */}
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ fontSize: "12px", fontWeight: "700", color: "#1a1614", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "1rem" }}>
            Value & Adoption
          </div>
          <SSRGrid>
            <SSRStat label="Price" value={`$${kb?.price}`} color={BRAND_COLORS[kb.brand]} />
            <SSRStat label="Pro Usage" value={`${kb?.proUsage}%`} color={BRAND_COLORS[kb.brand]} />
            <SSRStat label="Rating" value={`${kb.rating}/10`} color={BRAND_COLORS[kb.brand]} />
            <SSRStat label="Connectivity" value={kb.connectivity} color={BRAND_COLORS[kb.brand]} />
          </SSRGrid>
        </div>

        {/* Verdict Section */}
        <div style={{
          padding: "1.5rem",
          backgroundColor: "#f5f0e8",
          borderLeft: `4px solid ${BRAND_COLORS[kb.brand] || "#b8956a"}`,
          marginBottom: "2rem",
          fontStyle: "italic",
          color: "#1a1614",
          fontSize: "14px",
          lineHeight: "1.6"
        }}>
          The {kb.name} is a {kb.layout} keyboard from {kb.brand} with {kb.switchType} switches — used by {kb?.proUsage}% of tracked pros.
        </div>

        {usedBy.length > 0 && (
          <>
            <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#a09890" }}>
              Used by {usedBy.length}+ pros including
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {usedBy.slice(0, 8).map((p) => (
                <SSRLink key={p.name} href={`/players/${p.name.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-")}`} color={BRAND_COLORS[kb.brand]}>
                  {p.name} · {p.game}
                </SSRLink>
              ))}
            </div>
          </>
        )}
        <SSRDivider />
        <div className="flex flex-wrap gap-2">
          <SSRLink href="/keyboards">All Keyboards</SSRLink>
          <SSRLink href="/players">Pro Settings</SSRLink>
          <SSRLink href="/compare">Compare</SSRLink>
          <SSRLink href="/switches">Switches</SSRLink>
          <SSRLink href="/brands">{kb.brand}</SSRLink>
        </div>
      </SSRSection>

      <EsportsKeyboards initialTab="keyboardDetail" initialKeyboardSlug={params.slug} />
    </>
  );
}
