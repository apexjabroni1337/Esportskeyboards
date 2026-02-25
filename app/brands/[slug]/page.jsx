import EsportsKeyboards from "@/components/ClientApp";
import { SSRSection, SSRTitle, SSRSub, SSRGrid, SSRStat, SSRLink, SSRDivider } from "@/components/ssr";
import { keyboards, allPlayers, proPlayers, BRAND_COLORS, KEYBOARD_IMAGE_URLS, KEYBOARD_DESCRIPTIONS, amazonLink } from "@/data";

const slug = (n) => n.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");

const BRANDS = [...new Set(keyboards.map((m) => m.brand))].filter(Boolean);

const BRAND_DESCRIPTIONS = {
  Razer: "Razer is one of the world's largest gaming peripherals companies and a dominant force in esports keyboards. Founded in 2005, Razer has built its reputation on aggressive innovation and cutting-edge technology. The Viper V3 Pro currently leads the professional scene with its symmetrical low-profile shape and optical analog switches. Razer keyboards are known for their HyperPolling wireless technology, lightweight construction, and the distinctive green-and-black branding that is instantly recognizable in any gaming setup. The Huntsman series has become the company's flagship rapid trigger offering. Razer's extensive investment in professional esports sponsorships has made their keyboards the most commonly seen brand on tournament stages worldwide.",
  Logitech: "Logitech G has been the gold standard in esports keyboards for over a decade, with the G Pro Wireless and its successors becoming the default choice for professional players across nearly every competitive game. The G Pro X Superlight changed the industry in 2020 by proving that a mainstream keyboard could weigh under 63 grams without sacrificing build quality or battery life. Logitech's HERO and LIGHTSPEED technologies are considered the benchmark for switch accuracy and wireless latency respectively. Their dominance in the pro scene is unmatched — at any given tournament, a significant percentage of players will be using a Logitech keyboard. The brand's consistency, reliability, and the safe shape of the G Pro series have made it the peripheral equivalent of a reliable tool that just works.",
  Zowie: "Zowie, a division of BenQ, built its legendary reputation in esports by focusing entirely on what competitive players need: perfect shapes, reliable switches, and no unnecessary features. Zowie keyboards are known for their ergonomic contours and mechanical reliability. While Zowie has since been surpassed in market share by brands like Wooting and Razer in the rapid trigger era, their legacy remains strong among players who prefer traditional mechanical switches and proven designs.",
  Finalmouse: "Finalmouse was a gaming peripherals brand that focused on lightweight designs. While they are no longer actively producing keyboards for esports competition, their influence on the industry's pursuit of lighter weight peripherals helped inspire modern keyboard innovation. Contemporary rapid trigger keyboards from Wooting, Razer, and others continue this legacy of pushing engineering boundaries.",
  Lamzu: "Lamzu burst onto the enthusiast keyboard scene in 2023 and immediately disrupted the market with premium lightweight wireless keyboards at competitive prices. Founded by industry veterans who understood what the competitive community wanted, Lamzu delivered exceptional shape design, top-tier switches, and build quality that rivaled brands with decades of heritage. The Atlantis Mini became an instant hit among pro players looking for a small, lightweight option, while the Thorn and Maya expanded their lineup to cover different hand sizes and grip styles. Lamzu represents the new wave of boutique keyboard brands that are challenging the established giants by moving faster, listening more closely to the community, and delivering enthusiast-grade quality.",
  Pulsar: "Pulsar has rapidly established itself as a serious contender in the competitive keyboard market, earning significant pro adoption through excellent shape design and competitive pricing. The X2 series became a breakout hit, offering a symmetrical shape that many players found more comfortable than the Logitech G Pro X Superlight. Pulsar's collaboration with ZywOo on a signature keyboard demonstrates the brand's growing credibility in professional esports. Their Xlite series offers ergonomic options, while the X2V2 and specialized models like the CrazyLight show their commitment to pushing performance boundaries. Pulsar's approach of offering many size variants and colorways gives players unusual freedom to find their perfect fit.",
  SteelSeries: "SteelSeries is one of the original esports peripherals brands, with a heritage stretching back to the earliest days of competitive Counter-Strike. The original Rival, Sensei, and Kana keyboards were staples of professional CS for years, and the brand's early investment in esports sponsorships helped establish the modern pro gaming ecosystem. While SteelSeries has lost some market share to lighter wireless competitors, their keyboards remain popular among veteran players who value the proven shapes and the brand's legendary reliability. The Prime series and Aerox lightweight line represent SteelSeries' adaptation to modern demands, and their keyboards continue to be used by professional players across multiple titles.",
  Corsair: "Corsair is a major player in the broader PC gaming peripherals market, with their keyboard lineup offering solid options for both casual and competitive gamers. The M75 Air brought Corsair into the ultralight wireless conversation, while the Sabre Pro and M65 series have loyal followings among players who prefer Corsair's ergonomic designs. While not as dominant in pro esports as some competitors, Corsair's keyboards benefit from the company's massive scale, excellent build quality, and comprehensive iCUE software ecosystem. Their entry into the competitive lightweight segment shows Corsair taking the esports market more seriously.",
  Endgame: "Endgame Gear (also known as Endgame) has carved out a respected niche in the competitive keyboard market with the XM1 series, which became a cult favorite among CS players for its unique shape and exceptional build quality. The XM1r and its wireless successor brought German engineering sensibility to keyboard design — clean shapes, no-nonsense features, and a focus on competitive performance above all else. The OP1 series expanded their lineup with a versatile egg-shaped design. Endgame Gear keyboards are particularly popular among European CS players and represent the growing influence of boutique European brands in competitive gaming peripherals.",
  ASUS: "ASUS ROG (Republic of Gamers) brings its extensive hardware engineering experience to the gaming keyboard market with the Harpe Ace series. The ROG Harpe Ace and its successors feature cutting-edge specifications including some of the lowest wireless latency measurements in the industry. ASUS's expertise in switch tuning and wireless technology, developed through years of networking and component manufacturing, gives their keyboards a technical edge. While newer to the dedicated esports keyboard space, ASUS ROG's engineering resources and growing presence in professional gaming make them an increasingly important brand.",
  WLMouse: "WLMouse is a newer Chinese gaming peripherals brand that has gained attention with the Beast X, which offers aggressive specifications including extremely high polling rates and ultra-lightweight construction at competitive prices. The brand represents the growing influence of Chinese keyboard manufacturers who are pushing the boundaries of what's technically possible while keeping prices accessible. WLMouse keyboards have started appearing in professional players' setups, particularly those who prioritize cutting-edge polling rates for the lowest possible input delay.",
  Vaxee: "Vaxee was founded by former Zowie designers who brought their deep understanding of competitive keyboard layouts to a new brand. Their NP-01, Outset AX, and XE series are considered some of the best-shaped keyboards ever made for competitive FPS gaming, with ergonomic refinements that only years of professional-level shape research can produce. Vaxee keyboards have earned a devoted following among CS professionals, with many top players choosing Vaxee over mainstream alternatives for the superior shape comfort during long tournament sessions. The brand represents the pinnacle of shape-first keyboard design philosophy.",
  Ninjutso: "Ninjutso is a boutique gaming peripherals brand that has gained recognition in the competitive scene through thoughtful designs and collaborations. Their keyboards offer unique shape options that fill gaps left by larger brands, appealing to players with specific grip style requirements. The Sora series, including the Vaxee collaboration, shows Ninjutso's commitment to serving the competitive community with well-engineered alternatives.",
  HyperX: "HyperX, now owned by HP, has been a fixture in gaming peripherals for years. Their Pulsefire keyboard series offers competitive options at accessible price points, and the brand's extensive esports sponsorships have kept HyperX keyboards visible on tournament stages. The Pulsefire Haste was particularly well-received as an affordable lightweight option.",
  "G-Wolves": "G-Wolves is a Chinese gaming keyboard brand known for the Hati series, which offers lightweight keyboards with aggressive specifications at budget-friendly prices. The Hati-M and Hati-S variants provide different size options for competitive players, and the brand has developed a following among enthusiasts who appreciate the value proposition.",
  LGG: "Lethal Gaming Gear (LGG) entered the keyboard market as a natural extension of their popular gaming accessories business. Their keyboards leverage the brand's deep understanding of what competitive players want, informed by years of selling and reviewing enthusiast peripherals.",
};

// Handle aliases (e.g. "Endgame Gear" in UI → "Endgame" in data)
const BRAND_ALIASES = { "endgame-gear": "Endgame" };
const findBrand = (s) => BRANDS.find((b) => slug(b) === s) || BRAND_ALIASES[s] || null;

export function generateStaticParams() {
  const params = BRANDS.map((brand) => ({ slug: slug(brand) }));
  Object.keys(BRAND_ALIASES).forEach((alias) => {
    if (!params.find((p) => p.slug === alias)) params.push({ slug: alias });
  });
  return params;
}

export function generateMetadata({ params }) {
  const brand = findBrand(params.slug);
  if (!brand) return { title: "Brand Not Found" };

  const brandKeyboards = keyboards.filter((m) => m.brand === brand);
  const totalProUsage = brandKeyboards.reduce((a, m) => a + m.proUsage, 0);

  const description = `${brand} esports keyboards — ${brandKeyboards.length} keyboards, ${totalProUsage}% combined pro usage. Compare specs, weights, sensors, prices, and see which pros use ${brand} keyboards across CS2, Valorant, and more.`;

  return {
    title: `${brand} Esports Keyboards — All Models, Pro Usage & Reviews`,
    description,
    alternates: { canonical: `https://esportskeyboards.com/brands/${params.slug}` },
    openGraph: {
      title: `${brand} Esports Keyboards — All Models, Pro Usage & Reviews`,
      description,
      url: `https://esportskeyboards.com/brands/${params.slug}`,
      images: [{
        url: `https://esportskeyboards.com/og?title=${encodeURIComponent(brand + " Esports Keyboards")}&subtitle=${encodeURIComponent(`${brandKeyboards.length} Keyboards · ${totalProUsage}% Pro Share · Complete Lineup`)}`,
        width: 1200, height: 630,
        alt: `${brand} esports gaming keyboards lineup`,
      }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${brand} Esports Keyboards — All Models, Pro Usage & Reviews`,
      description,
      images: [`https://esportskeyboards.com/og?title=${encodeURIComponent(brand + " Esports Keyboards")}&subtitle=${encodeURIComponent(`${brandKeyboards.length} Keyboards · ${totalProUsage}% Pro Share · Complete Lineup`)}`],
    },
  };
}

export default function BrandDetailPage({ params }) {
  const brand = findBrand(params.slug);
  if (!brand) return <EsportsKeyboards initialTab="brands" />;

  const brandKeyboards = keyboards.filter((m) => m.brand === brand);
  const avgWeight = Math.round(brandKeyboards.reduce((a, m) => a + m?.weight, 0) / brandKeyboards.length);
  const avgPrice = Math.round(brandKeyboards.reduce((a, m) => a + m?.price, 0) / brandKeyboards.length);
  const avgRating = (brandKeyboards.reduce((a, m) => a + m.rating, 0) / brandKeyboards.length).toFixed(1);
  const totalProUsage = brandKeyboards.reduce((a, m) => a + m.proUsage, 0);
  const lightest = [...brandKeyboards].sort((a, b) => a?.weight - b?.weight)[0];
  const mostPopular = [...brandKeyboards].sort((a, b) => b?.proUsage - a?.proUsage)[0];
  const switches = [...new Set(brandKeyboards.map((m) => m.switchType))];
  const shapes = [...new Set(brandKeyboards.map((m) => m.layout))];
  const priceRange = `$${Math.min(...brandKeyboards.map((m) => m?.price))}-$${Math.max(...brandKeyboards.map((m) => m?.price))}`;
  const weightRange = `${Math.min(...brandKeyboards.map((m) => m?.weight))}g-${Math.max(...brandKeyboards.map((m) => m?.weight))}g`;

  const brandPros = proPlayers.filter((p) => {
    const pm = p.keyboard.toLowerCase();
    return brandKeyboards.some((m) => pm.includes(m.name.toLowerCase()) || m.name.toLowerCase().includes(pm));
  });

  const brandGames = [...new Set(brandPros.map((p) => p.game))].sort();
  const brandDesc = BRAND_DESCRIPTIONS[brand] || `${brand} is a gaming keyboard manufacturer with ${brandKeyboards.length} keyboards in the esports database.`;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://esportskeyboards.com" },
          { "@type": "ListItem", position: 2, name: "Brands", item: "https://esportskeyboards.com/brands" },
          { "@type": "ListItem", position: 3, name: brand, item: `https://esportskeyboards.com/brands/${params.slug}` },
        ],
      }) }} />
      {/* Server-rendered SEO content — hidden visually, present in HTML for crawlers */}
      <article
        className="absolute overflow-hidden"
        style={{ width: 1, height: 1, padding: 0, margin: -1, clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}
        itemScope itemType="https://schema.org/Brand"
      >
        <h1 itemProp="name">{brand} Esports Keyboards — Complete Lineup, Pro Usage, and Reviews</h1>
        <meta itemProp="url" content={`https://esportskeyboards.com/brands/${params.slug}`} />

        <h2>About {brand}</h2>
        <p>{brandDesc}</p>

        <h2>{brand} at a Glance</h2>
        <ul>
          <li>Total keyboards in database: {brandKeyboards.length}</li>
          <li>Combined pro usage: {totalProUsage}%</li>
          <li>Average weight: {avgWeight}g</li>
          <li>Weight range: {weightRange}</li>
          <li>Average price: ${avgPrice}</li>
          <li>Price range: {priceRange}</li>
          <li>Average rating: {avgRating}/10</li>
          <li>Lightest keyboard: {lightest.name} ({lightest?.weight}g)</li>
          <li>Most popular: {mostPopular.name} ({mostPopular.proUsage}% pro usage)</li>
          <li>Sensors used: {switches.join(", ")}</li>
          <li>Shape types: {shapes.join(", ")}</li>
        </ul>

        <h2>Complete {brand} Keyboard Lineup</h2>
        <table>
          <caption>All {brand} esports keyboards — specifications, pricing, and pro usage</caption>
          <thead>
            <tr><th>Keyboard</th><th>Weight</th><th>Switch</th><th>Layout</th><th>Connectivity</th><th>Price</th><th>Pro Usage</th><th>Rating</th></tr>
          </thead>
          <tbody>
            {[...brandKeyboards].sort((a, b) => b?.proUsage - a?.proUsage).map((m) => (
              <tr key={m.id}>
                <td><a href={`/keyboards/${slug(m.name)}`}>{m.name}</a></td>
                <td>{m?.weight}g</td>
                <td><a href={`/sensors/${m.switchType.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}`}>{m.switchType}</a></td>
                <td><a href={`/shapes/${m.layout.toLowerCase()}`}>{m.layout}</a></td>
                <td>{m.connectivity}</td>
                <td>${m?.price}</td>
                <td>{m.proUsage}%</td>
                <td>{m.rating}/10</td>
              </tr>
            ))}
          </tbody>
        </table>

        {brandPros.length > 0 && (
          <>
            <h2>Professional Players Using Keyboards</h2>
            <p>{brandPros.length} professional players use {brand} keyboards across {brandGames.length} games: {brandGames.join(", ")}.</p>
            <table>
              <caption>Pro players using {brand} keyboards</caption>
              <thead>
                <tr><th>Player</th><th>Game</th><th>Team</th><th>Keyboard</th></tr>
              </thead>
              <tbody>
                {brandPros.slice(0, 50).map((p, i) => (
                  <tr key={`${p.name}-${p.game}-${i}`}>
                    <td><a href={`/players/${slug(p.name)}`}>{p.name}</a></td>
                    <td><a href={`/games/${slug(p.game)}`}>{p.game}</a></td>
                    <td><a href={`/teams/${slug(p.team)}`}>{p.team}</a></td>
                    <td>{p.keyboard}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        <h2>{brand} Keyboard Comparison</h2>
        <p>
          The {brand} esports keyboard lineup ranges from {weightRange} in weight and {priceRange} in price.
          {lightest.name !== mostPopular.name
            ? ` The lightest option is the ${lightest.name} at ${lightest?.weight}g, while the most popular among pros is the ${mostPopular.name} at ${mostPopular.proUsage}% usage.`
            : ` The ${mostPopular.name} is both the lightest at ${lightest?.weight}g and the most popular at ${mostPopular.proUsage}% pro usage.`
          }
          {" "}All {brand} keyboards use {switches.length === 1 ? `the ${switches[0]} switch` : `switches including ${switches.join(", ")}`}.
        </p>

        <nav>
          <h2>Explore More</h2>
          <ul>
            <li><a href="/brands">All Brands</a></li>
            <li><a href="/keyboards">All Esports Keyboards</a></li>
            <li><a href="/players">Pro Player Settings</a></li>
            <li><a href="/switches">Switch Comparison</a></li>
            <li><a href="/compare">Compare Keyboards</a></li>
            {brandGames.map((g) => (
              <li key={g}><a href={`/games/${slug(g)}`}>{g} Keyboard Usage</a></li>
            ))}
          </ul>
        </nav>
      </article>

      {/* Visible SSR summary for initial load */}
      <SSRSection>
        <SSRTitle accent="Keyboards">{brand}</SSRTitle>
        <SSRSub>
          {brandKeyboards.length} esports keyboards · {totalProUsage}% combined pro usage · {weightRange} · {priceRange} · {avgRating}/10 avg rating
        </SSRSub>
        <SSRGrid>
          <SSRStat label="Pro Usage" value={`${totalProUsage}%`} color={BRAND_COLORS[brand]} />
          <SSRStat label="Keyboards" value={brandKeyboards.length} />
          <SSRStat label="Avg Weight" value={`${avgWeight}g`} />
          <SSRStat label="Most Popular" value={mostPopular.name} />
        </SSRGrid>
        <div className="flex flex-wrap gap-2">
          <SSRLink href="/brands">← All Brands</SSRLink>
          <SSRLink href="/keyboards">All Keyboards</SSRLink>
          <SSRLink href="/players">Pro Settings</SSRLink>
          {brandKeyboards.slice(0, 3).map((m) => (
            <SSRLink key={m.id} href={`/keyboards/${slug(m.name)}`}>{m.name}</SSRLink>
          ))}
        </div>
      </SSRSection>

      <EsportsKeyboards initialTab="brands" />
    </>
  );
}
