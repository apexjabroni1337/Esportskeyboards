const BLOG_ARTICLES = [
  {
    slug: "how-to-choose-gaming-keyboard",
    title: "How to Choose the Right Gaming Keyboard in 2026",
    description: "Shape, weight, switch, wireless vs wired — the complete guide to finding your perfect keyboard based on what the pros actually use.",
    date: "2026-02-23",
  },
  {
    slug: "hall-effect-vs-mechanical-switches",
    title: "Hall Effect vs Mechanical Switches: Which Is Best for Competitive Gaming?",
    description: "We analyzed switch preferences across 2,000+ pro players to find which switch technology dominates each game — and why Hall Effect is taking over.",
    date: "2026-02-23",
  },
  {
    slug: "keyboard-switch-trend-2024-2026",
    title: "The Rapid Trigger Revolution: How Switch Tech Changed Competitive Gaming",
    description: "A data-driven look at how rapid trigger and Hall Effect switches went from niche to dominant in professional esports.",
    date: "2026-02-23",
  },
  {
    slug: "wireless-vs-wired-2026",
    title: "Is Wireless Finally Better Than Wired? The 2026 Data Says Yes",
    description: "Over 80% of CS2 and Valorant pros now use wireless keyboards. Here's the data behind the shift.",
    date: "2026-02-23",
  },
  {
    slug: "rapid-trigger-actuation-explained",
    title: "Rapid Trigger & Actuation Explained: A Complete Guide",
    description: "What is rapid trigger? What actuation distance should you use? We break down every keyboard tech concept with real pro player data.",
    date: "2026-02-23",
  },
];

export async function GET() {
  const baseUrl = "https://esportskeyboards.com";

  const items = BLOG_ARTICLES.map(
    (a) => `    <item>
      <title><![CDATA[${a.title}]]></title>
      <link>${baseUrl}/blog/${a.slug}</link>
      <description><![CDATA[${a.description}]]></description>
      <pubDate>${new Date(a.date).toUTCString()}</pubDate>
      <guid isPermaLink="true">${baseUrl}/blog/${a.slug}</guid>
    </item>`
  ).join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>EsportsKeyboards Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Esports keyboard guides, pro gear analysis, and data-driven insights from EsportsKeyboards.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
