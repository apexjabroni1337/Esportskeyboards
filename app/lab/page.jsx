import EsportsKeyboards from "@/components/ClientApp";
import { SSRSection, SSRTitle, SSRSub, SSRGrid, SSRStat, SSRLink, SSRDivider } from "@/components/ssr";
import { keyboards } from "@/data";

const slug = (n) => n.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export const metadata = {
  title: "Lab — Keyboard Finder Quiz & Analysis Tools",
  description: "Find your perfect esports keyboard with our interactive quiz. Answer questions about hand size, grip style, game, and preferences to get personalized keyboard recommendations.",
  alternates: { canonical: "https://esportskeyboards.com/lab" },
  openGraph: {
    title: "Lab — Keyboard Finder Quiz & Analysis Tools",
    description: "Find your perfect esports keyboard with our interactive quiz.",
    url: "https://esportskeyboards.com/lab",
    images: [{ url: "https://esportskeyboards.com/og?title=Lab&subtitle=Keyboard+Finder+Quiz+%C2%B7+Personalized+Recommendations", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function LabPage() {
  const symm = keyboards.filter((m) => m.layout === "Symmetrical");
  const ergo = keyboards.filter((m) => m.layout === "Ergonomic");
  const light = keyboards.filter((m) => m.weight < 55).sort((a, b) => a.weight - b.weight);
  const medium = keyboards.filter((m) => m.weight >= 55 && m.weight <= 70);
  const budget = keyboards.filter((m) => m.price < 90).sort((a, b) => a.price - b.price);

  return (
    <>
      <article
        className="absolute overflow-hidden"
        style={{ width: 1, height: 1, padding: 0, margin: -1, clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}
      >
        <h1>Keyboard Finder Lab — Find Your Perfect Esports Gaming Keyboard</h1>
        <p>
          Not sure which gaming keyboard is right for you? Our interactive Keyboard Finder Quiz analyzes your
          hand size, grip style, preferred games, weight preference, budget, and connectivity needs to
          recommend the best esports keyboards from our database of {keyboards.length} models.
        </p>

        <h2>Grip Style Guide</h2>
        <h3>Palm Grip</h3>
        <p>
          Full hand contact with the keyboard. Your entire palm rests on the back of the keyboard, with fingers
          flat on the buttons. Palm grip favors larger, ergonomic layouts that fill the hand. Best for
          players who prioritize comfort during long sessions and use arm-based aiming.
        </p>
        <p>Recommended palm grip keyboards:</p>
        <ul>
          {ergo.sort((a, b) => b.proUsage - a.proUsage).slice(0, 5).map((m) => (
            <li key={m.id}><a href={`/keyboards/${slug(m.name)}`}>{m.name}</a> — {m.weight}g, {m.brand}, ${m.price}</li>
          ))}
        </ul>

        <h3>Claw Grip</h3>
        <p>
          Fingertips and palm base contact the keyboard, with fingers arched over the buttons. Claw grip
          allows faster clicks and quick micro-adjustments. Works well with medium-sized symmetrical or
          ergonomic keyboards that have a pronounced hump toward the back.
        </p>
        <p>Recommended claw grip keyboards:</p>
        <ul>
          {symm.sort((a, b) => b.proUsage - a.proUsage).slice(0, 5).map((m) => (
            <li key={m.id}><a href={`/keyboards/${slug(m.name)}`}>{m.name}</a> — {m.weight}g, {m.brand}, ${m.price}</li>
          ))}
        </ul>

        <h3>Fingertip Grip</h3>
        <p>
          Only fingertips touch the keyboard — no palm contact at all. Fingertip grip gives maximum control
          for micro-flicks and is preferred by high-sensitivity players. Requires small, lightweight keyboards.
        </p>
        <p>Recommended fingertip grip keyboards:</p>
        <ul>
          {light.slice(0, 5).map((m) => (
            <li key={m.id}><a href={`/keyboards/${slug(m.name)}`}>{m.name}</a> — {m.weight}g, {m.brand}, ${m.price}</li>
          ))}
        </ul>

        <h2>How to Measure Your Hand</h2>
        <p>
          Accurate hand measurements help determine the best keyboard size. Measure from the tip of your
          middle finger to the base of your palm (hand length), and across the widest point of your palm
          excluding the thumb (hand width). Both measurements in centimeters.
        </p>
        <ul>
          <li>Small hands: Under 17cm length / under 8.5cm width — small keyboards recommended</li>
          <li>Medium hands: 17-19.5cm length / 8.5-10cm width — medium keyboards recommended</li>
          <li>Large hands: Over 19.5cm length / over 10cm width — large keyboards recommended</li>
        </ul>

        <h2>Keyboards by Weight Category</h2>
        <h3>Ultralight (Under 55g) — Best for speed and agility</h3>
        <ul>
          {light.map((m) => (
            <li key={m.id}><a href={`/keyboards/${slug(m.name)}`}>{m.name}</a> — {m.weight}g ({m.brand}), ${m.price}</li>
          ))}
        </ul>
        <h3>Medium Weight (55-70g) — Balanced control and comfort</h3>
        <ul>
          {medium.sort((a, b) => a.weight - b.weight).slice(0, 10).map((m) => (
            <li key={m.id}><a href={`/keyboards/${slug(m.name)}`}>{m.name}</a> — {m.weight}g ({m.brand}), ${m.price}</li>
          ))}
        </ul>

        <h2>Best Budget Esports Keyboards (Under $90)</h2>
        <ul>
          {budget.map((m) => (
            <li key={m.id}><a href={`/keyboards/${slug(m.name)}`}>{m.name}</a> — ${m.price} ({m.brand}, {m.weight}g, {m.switchType})</li>
          ))}
        </ul>

        <h2>FAQ</h2>
        <dl>
          <dt>What is the best keyboard for FPS games?</dt>
          <dd>The most used FPS keyboards among pros are the <a href={`/keyboards/${slug(keyboards.sort((a, b) => b.proUsage - a.proUsage)[0].name)}`}>{keyboards.sort((a, b) => b.proUsage - a.proUsage)[0].name}</a> and <a href={`/keyboards/${slug(keyboards.sort((a, b) => b.proUsage - a.proUsage)[1].name)}`}>{keyboards.sort((a, b) => b.proUsage - a.proUsage)[1].name}</a>. Light weight and accurate sensors are most important for FPS.</dd>
          <dt>Does keyboard weight matter?</dt>
          <dd>Yes. Lighter keyboards allow faster movements and reduce fatigue. Most pros now use keyboards under 60g. However, some players prefer slightly heavier keyboards for stability.</dd>
          <dt>Wireless or wired?</dt>
          <dd>Modern wireless gaming keyboards have no perceptible latency disadvantage. {keyboards.filter((m) => m.connectivity === "Wireless").length} of {keyboards.length} keyboards in our database are wireless, and virtually all top pros have switched to wireless.</dd>
        </dl>

        <nav aria-label="Related"><ul>
          <li><a href="/keyboards">All Esports Keyboards — Full Database</a></li>
          <li><a href="/compare">Compare Keyboards Side by Side</a></li>
          <li><a href="/shapes">Shape Overlay Tool</a></li>
          <li><a href="/players">Pro Player Settings</a></li>
          <li><a href="/sensitivity">Sensitivity Converter</a></li>
          <li><a href="/brands">Keyboard Brands</a></li>
          <li><a href="/switches">Switch Comparison</a></li>
          <li><a href="/">EsportsKeyboards Home</a></li>
        </ul></nav>
      </article>

      <SSRSection>
        <SSRTitle accent="Keyboard">Finder Lab</SSRTitle>
        <SSRSub>Find your perfect esports keyboard. Our quiz analyzes hand size, grip style, game, weight preference, and budget to recommend from {keyboards.length} keyboards.</SSRSub>
        <SSRGrid>
          <SSRStat label="Keyboards" value={keyboards.length} color="#b8956a" />
          <SSRStat label="Symmetrical" value={symm.length} color="#b8956a" />
          <SSRStat label="Ergonomic" value={ergo.length} color="#b8956a" />
          <SSRStat label="Under $90" value={budget.length} color="#b8956a" />
        </SSRGrid>
        <div className="flex flex-wrap gap-2">
          <SSRLink href="/keyboards" color="#b8956a">All Keyboards</SSRLink>
          <SSRLink href="/compare" color="#b8956a">Compare</SSRLink>
          <SSRLink href="/shapes" color="#b8956a">Shapes</SSRLink>
        </div>
      </SSRSection>

      <EsportsKeyboards initialTab="lab" />
    </>
  );
}
