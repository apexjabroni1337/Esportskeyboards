import EsportsKeyboards from "@/components/ClientApp";
import { SSRSection, SSRTitle, SSRSub, SSRGrid, SSRStat, SSRLink, SSRDivider } from "@/components/ssr";
import { keyboards, allPlayers, proPlayers, amazonLink, BRAND_COLORS } from "@/data";

const sl = (n) => n.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");

const SENSOR_DESCS = {
  "Lekker (Hall Effect)": "Wooting's proprietary Hall Effect switches that started the rapid trigger revolution. Using magnetic field detection instead of physical contact, Lekker switches offer adjustable actuation from 0.1mm to 4.0mm with instant reset. They powered the Wooting 60HE that became the most popular competitive keyboard in professional esports.",
  "Lekker V2 (Hall Effect)": "The second generation of Wooting's Hall Effect switches, featuring improved magnetic field consistency and reduced stem wobble. Found in the Wooting 80HE and updated 60HE models, delivering even more precise actuation detection.",
  "Razer Analog Optical Gen-2": "Razer's second-generation optical analog switches used in the Huntsman V3 Pro. These combine optical actuation with analog input, supporting rapid trigger with 0.1mm resolution. Razer's implementation is among the fastest in competitive gaming.",
  "Razer Optical (Gen-1)": "Razer's first-generation optical switches using light-based actuation. Faster than traditional mechanical switches with no debounce delay, these powered the original Huntsman line.",
  "Razer Orange Tactile": "Razer's tactile mechanical switch offering a noticeable bump at the actuation point. Popular among players who prefer tactile feedback over linear feel.",
  "OmniPoint 3.0 (Hall Effect)": "SteelSeries' latest Hall Effect magnetic switches with adjustable actuation from 0.2mm to 3.8mm. Featured in the Apex Pro TKL (2025), these offer per-key customization and rapid trigger support.",
  "OmniPoint 2.0 (Hall Effect)": "SteelSeries' second-generation adjustable switches found in the Apex Pro TKL (2023). Adjustable actuation from 0.2mm to 3.8mm with magnetic sensing technology.",
  "Cherry MX Red": "The classic linear mechanical switch from Cherry, the originator of modern mechanical keyboards. Known for smooth, consistent keystrokes with 2.0mm actuation and 45g force. A tournament standard for decades.",
  "Cherry MX Speed": "Cherry's fastest mechanical switch with a reduced 1.2mm actuation point. Designed for gaming with a lighter 45g actuation force, popular among competitive players who prefer mechanical feel.",
  "Cherry MX2A Red": "Cherry's updated Red switch with improved smoothness and factory lubrication. A modernized version of the classic that aims to compete with custom switch boutiques.",
  "Cherry MX Low Profile": "Cherry's low-profile mechanical switch for slim keyboard designs. Offers the MX feel in a shorter travel package, used in Cherry's own compact boards.",
  "Cherry MX ULP": "Cherry's Ultra Low Profile switch, the thinnest mechanical switch Cherry produces. Designed for laptop-style keyboards that still want mechanical feel.",
  "Gateron Magnetic (Hall Effect)": "Gateron's Hall Effect magnetic switches offering adjustable actuation and rapid trigger. Used by several mid-range and enthusiast keyboard brands competing with Wooting.",
  "Gateron Double-Rail (Hall Effect)": "Gateron's premium Hall Effect switch with a dual-rail stem design for improved stability. Reduces wobble during fast keypresses for competitive gaming.",
  "Corsair MGX (Hall Effect)": "Corsair's proprietary magnetic Hall Effect switches developed for the K70 MAX. Features rapid trigger and adjustable actuation from 0.4mm to 3.6mm.",
  "Corsair MLX Red V2": "Corsair's linear mechanical switch, a Cherry MX Red competitor optimized for their keyboard ecosystem. Paired with iCUE software for customization.",
  "Hall Effect Magnetic": "Generic Hall Effect magnetic switches using magnetic field detection for actuation. Multiple manufacturers produce these, offering rapid trigger and adjustable actuation at various price points.",
  "Magnetic (Hall Effect)": "Magnetic Hall Effect switches from various manufacturers. These use magnetic sensing for precise, adjustable actuation detection with rapid trigger capability.",
  "Fox Magnetic (Hall Effect)": "Fox's Hall Effect magnetic switches found in select enthusiast keyboards. Offering rapid trigger and adjustable actuation in the growing magnetic switch ecosystem.",
  "Akko Cream Yellow (Hall Effect)": "Akko's Hall Effect variant of their popular Cream Yellow switch. Combines Akko's smooth linear feel with magnetic actuation sensing and rapid trigger support.",
  "Akko Magnetic (Hall Effect)": "Akko's standard magnetic Hall Effect switch offering adjustable actuation and rapid trigger at budget-friendly price points.",
  "ROG NX HFX (Hall Effect)": "ASUS ROG's Hall Effect magnetic switch with per-key adjustable actuation. Found in the ROG Falchion Ace HFX, leveraging ASUS's chip fabrication expertise.",
  "ROG NX Snow (Hall Effect)": "ASUS ROG's white-themed Hall Effect switch variant, functionally similar to the NX HFX with aesthetic customization for white keyboard builds.",
  "ROG NX Mechanical": "ASUS ROG's traditional mechanical switch used in their standard keyboard lineup. A solid performer without Hall Effect features.",
  "SteelSeries Optical": "SteelSeries' optical switch using light-based actuation for zero debounce delay. Found in earlier Apex Pro models before the OmniPoint Hall Effect transition.",
  "GL Low Profile": "Logitech's low-profile mechanical switches used in their G-series slim keyboards. Available in tactile and linear variants.",
  "GX Mechanical": "Logitech's standard mechanical switch platform used across their mainstream keyboard lineup.",
  "GX2 Optical-Mechanical": "Logitech's hybrid optical-mechanical switch combining optical actuation speed with mechanical feel. Found in newer Logitech gaming keyboards.",
  "HyperX Red Mechanical": "HyperX's linear mechanical switch optimized for gaming. A reliable, smooth switch at accessible price points.",
  "NuPhy Mechanical": "NuPhy's proprietary mechanical switches designed for their enthusiast keyboard lineup. Known for smooth feel and custom tuning.",
  "Custom": "A proprietary switch developed in-house by the manufacturer, often with unique characteristics tailored to specific keyboard designs.",
};

function getSensorData(sensorName) {
  const switchKbds = keyboards.filter(m => m.switchType === sensorName);
  const totalProUsage = switchKbds.reduce((a, m) => a + m.proUsage, 0);
  const avgWeight = switchKbds.length ? Math.round(switchKbds.reduce((a, m) => a + m?.weight, 0) / switchKbds.length) : 0;
  const avgPrice = switchKbds.length ? Math.round(switchKbds.reduce((a, m) => a + m?.price, 0) / switchKbds.length) : 0;
  const brands = [...new Set(switchKbds.map(m => m.brand))];
  const maxDpi = switchKbds.length ? Math.max(...switchKbds.map(m => m.actuationPoint)) : 0;
  const maxPolling = switchKbds.length ? Math.max(...switchKbds.map(m => m.pollingRate)) : 0;

  // Count actual pro players using this switch
  let playerCount = 0;
  const playerList = [];
  allPlayers.forEach(p => {
    if (!p.keyboard) return;
    const matched = switchKbds.find(m => {
      const mn = m.name.toLowerCase();
      const pm = p.keyboard.toLowerCase();
      return pm === mn || pm.includes(mn) || mn.includes(pm);
    });
    if (matched) {
      playerCount++;
      if (playerList.length < 30) playerList.push(p);
    }
  });

  return { switchKbds, totalProUsage, avgWeight, avgPrice, brands, maxDpi, maxPolling, playerCount, playerList };
}

function getAllSensors() {
  return [...new Set(keyboards.map(m => m.switchType))].sort();
}

export function generateStaticParams() {
  return getAllSensors().map(s => ({ slug: sl(s) }));
}

export function generateMetadata({ params }) {
  const allSensors = getAllSensors();
  const sensorName = allSensors.find(s => sl(s) === params.slug);
  if (!sensorName) return { title: "Switch Not Found" };

  const { switchKbds, totalProUsage, playerCount, brands } = getSensorData(sensorName);
  const desc = SENSOR_DESCS[sensorName];
  const description = desc
    ? desc.slice(0, 155) + "..."
    : `${sensorName} switch — used in ${switchKbds.length} keyboards by ${brands.join(", ")}. ${totalProUsage}% total pro usage across ${playerCount} tracked professional esports players.`;

  return {
    title: `${sensorName} — Switch Specs, Pro Usage & Keyboards`,
    description,
    alternates: { canonical: `https://esportskeyboards.com/sensors/${params.slug}` },
    openGraph: {
      title: `${sensorName} — Switch Specs, Pro Usage & Keyboards`,
      description,
      url: `https://esportskeyboards.com/sensors/${params.slug}`,
      images: [{ url: `https://esportskeyboards.com/og?title=${encodeURIComponent(sensorName)}&subtitle=${encodeURIComponent(`${switchKbds.length} Keyboards · ${totalProUsage}% Pro Usage · ${playerCount} Players`)}`, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default function SensorPage({ params }) {
  const allSensors = getAllSensors();
  const sensorName = allSensors.find(s => sl(s) === params.slug);

  if (!sensorName) {
    return (
      <>
        <div style={{ padding: 40, textAlign: "center", color: "#1a1614" }}>
          <h1>Switch Not Found</h1>
          <p>This switch doesn&apos;t exist in our database.</p>
        </div>
        <EsportsKeyboards initialTab="sensors" />
      </>
    );
  }

  const { switchKbds, totalProUsage, avgWeight, avgPrice, brands, maxDpi, maxPolling, playerCount, playerList } = getSensorData(sensorName);
  const desc = SENSOR_DESCS[sensorName];

  // Related sensors (same manufacturer or similar DPI range)
  const isPixArt = sensorName.startsWith("PAW") || sensorName.startsWith("PMW");
  const isRazer = sensorName.startsWith("Focus");
  const isLogitech = sensorName.startsWith("HERO");
  const relatedSensors = allSensors.filter(s => {
    if (s === sensorName) return false;
    if (isPixArt && (s.startsWith("PAW") || s.startsWith("PMW"))) return true;
    if (isRazer && s.startsWith("Focus")) return true;
    if (isLogitech && s.startsWith("HERO")) return true;
    return false;
  }).slice(0, 5);

  return (
    <>
      {/* JSON-LD structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        name: sensorName,
        category: "Gaming Keyboard Switch",
        description: desc || `${sensorName} gaming keyboard switch used in ${switchKbds.length} keyboards. ${totalProUsage}% total pro usage.`,
        url: `https://esportskeyboards.com/sensors/${params.slug}`,
        additionalProperty: [
          { "@type": "PropertyValue", name: "Max DPI", value: maxDpi.toLocaleString() },
          { "@type": "PropertyValue", name: "Max Polling Rate", value: `${maxPolling}Hz` },
          { "@type": "PropertyValue", name: "Keyboards Using This Switch", value: switchKbds.length },
          { "@type": "PropertyValue", name: "Pro Player Usage", value: `${totalProUsage}%` },
          { "@type": "PropertyValue", name: "Brands", value: brands.join(", ") },
        ],
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://esportskeyboards.com" },
          { "@type": "ListItem", position: 2, name: "Sensors", item: "https://esportskeyboards.com/sensors" },
          { "@type": "ListItem", position: 3, name: sensorName, item: `https://esportskeyboards.com/sensors/${params.slug}` },
        ],
      }) }} />

      {/* Server-rendered SEO content */}
      <article
        className="absolute overflow-hidden"
        style={{ width: 1, height: 1, padding: 0, margin: -1, clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}
      >
        <h1>{sensorName} — Gaming Keyboard Switch Specifications, Pro Usage and Keyboards</h1>

        <h2>About the {sensorName}</h2>
        {desc ? <p>{desc}</p> : (
          <p>
            The {sensorName} is a gaming keyboard switch used in {switchKbds.length} keyboards
            from {brands.join(", ")}. It supports up to {maxDpi.toLocaleString()} DPI
            and {maxPolling >= 1000 ? `${maxPolling / 1000}K` : maxPolling}Hz polling rate.
            {totalProUsage}% of tracked professional esports players use a keyboard with this switch.
          </p>
        )}

        <h2>{sensorName} Specifications</h2>
        <table>
          <caption>Technical specifications for the {sensorName}</caption>
          <tbody>
            <tr><th>Max DPI</th><td>{maxDpi.toLocaleString()}</td></tr>
            <tr><th>Max Polling Rate</th><td>{maxPolling >= 1000 ? `${maxPolling / 1000}K` : maxPolling}Hz</td></tr>
            <tr><th>Keyboards Using This Switch</th><td>{switchKbds.length}</td></tr>
            <tr><th>Total Pro Usage</th><td>{totalProUsage}%</td></tr>
            <tr><th>Pro Players Tracked</th><td>{playerCount}</td></tr>
            <tr><th>Brands</th><td>{brands.join(", ")}</td></tr>
            <tr><th>Avg Keyboard Weight</th><td>{avgWeight}g</td></tr>
            <tr><th>Avg Keyboard Price</th><td>${avgPrice}</td></tr>
          </tbody>
        </table>

        <h2>Keyboards Using the {sensorName}</h2>
        <table>
          <caption>All gaming keyboards powered by the {sensorName} switch</caption>
          <thead><tr><th>Keyboard</th><th>Brand</th><th>Weight</th><th>Price</th><th>Pro Usage</th><th>Layout</th></tr></thead>
          <tbody>
            {switchKbds.sort((a, b) => b?.proUsage - a?.proUsage).map(m => (
              <tr key={m.id}>
                <td><a href={`/keyboards/${sl(m.name)}`}>{m.name}</a></td>
                <td><a href={`/brands/${sl(m.brand)}`}>{m.brand}</a></td>
                <td>{m?.weight}g</td>
                <td>${m?.price}</td>
                <td>{m.proUsage}%</td>
                <td>{m.layout}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {playerList.length > 0 && (
          <>
            <h2>Pro Players Using the {sensorName}</h2>
            <p>{playerCount} professional players use a keyboard with the {sensorName} switch.</p>
            <table>
              <caption>Professional players using {sensorName}-powered keyboards</caption>
              <thead><tr><th>Player</th><th>Game</th><th>Team</th><th>Keyboard</th><th>DPI</th></tr></thead>
              <tbody>
                {playerList.map((p, i) => (
                  <tr key={i}>
                    <td><a href={`/players/${sl(p.name)}`}>{p.name}</a></td>
                    <td><a href={`/games/${sl(p.game)}`}>{p.game}</a></td>
                    <td>{p.team}</td>
                    <td><a href={`/keyboards/${sl(p.keyboard)}`}>{p.keyboard}</a></td>
                    <td>{p.dpi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        <h2>Related Sensors</h2>
        <nav>
          <ul>
            {relatedSensors.map(s => <li key={s}><a href={`/sensors/${sl(s)}`}>{s} Switch</a></li>)}
            <li><a href="/switches">All Sensors</a></li>
            <li><a href="/keyboards">All Keyboards</a></li>
          </ul>
        </nav>
      </article>

      <EsportsKeyboards initialTab="sensors" />
    </>
  );
}
