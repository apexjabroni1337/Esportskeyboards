import EsportsKeyboards from "@/components/ClientApp";
import { SSRSection, SSRTitle, SSRSub, SSRGrid, SSRStat, SSRLink } from "@/components/ssr";
import { allPlayers, keyboards } from "@/data";

export const metadata = {
  title: "About Our Data — EsportsKeyboards Methodology",
  description: "How EsportsKeyboards collects and verifies keyboard ranking settings and gear data. Sources, methodology, accuracy, and update frequency explained.",
  alternates: { canonical: "https://esportskeyboards.com/about" },
  openGraph: {
    title: "About Our Data — EsportsKeyboards Methodology",
    description: "How EsportsKeyboards collects and verifies keyboard ranking settings and gear data.",
    url: "https://esportskeyboards.com/about",
    images: [{ url: "https://esportskeyboards.com/og?title=About+Our+Data&subtitle=Methodology+%C2%B7+Sources+%C2%B7+Accuracy", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function AboutPage() {
  const totalPlayers = allPlayers.length;
  const totalKeyboards = keyboards.length;
  const totalGames = new Set(allPlayers.map(p => p.game)).size;
  const totalTeams = new Set(allPlayers.map(p => p.team)).size;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "EsportsKeyboards", item: "https://esportskeyboards.com" },
          { "@type": "ListItem", position: 2, name: "About Our Data", item: "https://esportskeyboards.com/about" },
        ],
      }) }} />

      <article
        className="absolute overflow-hidden"
        style={{ width: 1, height: 1, padding: 0, margin: -1, clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}
      >
        <h1>About Our Data — EsportsKeyboards Methodology</h1>

        <h2>Database Overview</h2>
        <p>EsportsKeyboards tracks keyboard and settings data for {totalPlayers} professional esports players across {totalGames} competitive games and {totalTeams} teams. Our database includes {totalKeyboards} gaming keyboards with full specifications, pricing, and pro usage statistics.</p>

        <h2>Data Sources</h2>
        <p>Player settings data is aggregated from multiple sources including official team websites, player social media accounts, tournament broadcasts where gear is visible, player interviews and streams, community-maintained databases like prosettings.net and liquipedia, and direct submissions from professional players and team managers.</p>

        <h2>Keyboard Specifications</h2>
        <p>Keyboard specifications (weight, switch type, polling rate, dimensions, price) are sourced from official manufacturer product pages and verified against hands-on reviews. Prices reflect current retail pricing at time of last update. Pro usage percentages are calculated from our tracked player database.</p>

        <h2>Update Frequency</h2>
        <p>The database is updated regularly as professional players change their equipment. Major updates typically coincide with tournament seasons when new gear setups are visible on broadcast. The data was last comprehensively updated in February 2026.</p>

        <h2>Accuracy</h2>
        <p>We strive for the highest accuracy possible but acknowledge that player settings can change frequently, sometimes mid-tournament. Where conflicting data exists, we prioritize the most recent verified source. Some players use custom configurations not publicly disclosed. If you notice inaccurate data, please contact us with corrections.</p>

        <h2>Limitations</h2>
        <p>Our database focuses primarily on professional competitive players and may not include all semi-professional or content creator setups. Sensitivity data relies on publicly available information and may not reflect private practice settings. Weight specifications are manufacturer-stated weights which may vary slightly from unit to unit.</p>

        <h2>Contact</h2>
        <p>Found incorrect data? Have additional information? We welcome corrections and contributions from the community. Visit our contact page to submit updates.</p>
      </article>

      <SSRSection>
        <SSRTitle accent="About">Our Data & Methodology</SSRTitle>
        <SSRSub>How we collect, verify, and maintain the most comprehensive pro esports keyboard database on the web.</SSRSub>
        <SSRGrid>
          <SSRStat label="Pro Players" value={totalPlayers.toString()} color="#b8956a" />
          <SSRStat label="Gaming Keyboards" value={totalKeyboards.toString()} color="#6b8cad" />
          <SSRStat label="Esports Titles" value={totalGames.toString()} color="#b8956a" />
          <SSRStat label="Pro Teams" value={totalTeams.toString()} color="#a78bfa" />
        </SSRGrid>
        <div className="flex flex-wrap gap-2">
          <SSRLink href="/contact">Submit a Correction</SSRLink>
          <SSRLink href="/keyboards">All Keyboards</SSRLink>
          <SSRLink href="/players">Pro Players</SSRLink>
        </div>
      </SSRSection>

      <EsportsKeyboards initialTab="overview" />
    </>
  );
}
