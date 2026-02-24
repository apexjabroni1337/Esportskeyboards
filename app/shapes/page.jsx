import EsportsKeyboards from "@/components/ClientApp";
import { SSRSection, SSRTitle, SSRSub, SSRGrid, SSRStat, SSRLink, SSRDivider } from "@/components/ssr";
import { KEYBOARD_DIMS, keyboards } from "@/data";

const slug = (n) => n.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");

export const metadata = {
  title: "Shape Overlay — Compare Keyboard Layouts Side by Side",
  description: "Compare the shapes and dimensions of esports keyboards using our interactive overlay tool. Overlay any two keyboards at true scale to compare length, width, height, and hump position.",
  alternates: { canonical: "https://esportskeyboards.com/shapes" },
  openGraph: {
    title: "Shape Overlay — Compare Keyboard Layouts Side by Side",
    description: "Compare the shapes and dimensions of esports keyboards using our interactive overlay tool.",
    url: "https://esportskeyboards.com/shapes",
    images: [{ url: "https://esportskeyboards.com/og?title=Shape+Overlay&subtitle=Compare+Keyboard+Layouts+%C2%B7+Interactive+Overlay+Tool", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function ShapesPage() {
  const keyboardNames = Object.keys(KEYBOARD_DIMS);
  const dimData = keyboardNames.map((name) => {
    const [l, w, h] = KEYBOARD_DIMS[name];
    const m = keyboards.find((mm) => mm.name === name);
    return { name, length: l, width: w, height: h, kbd: m };
  });
  const avgLength = Math.round(dimData.reduce((a, d) => a + d.length, 0) / dimData.length * 10) / 10;
  const avgWidth = Math.round(dimData.reduce((a, d) => a + d.width, 0) / dimData.length * 10) / 10;
  const avgHeight = Math.round(dimData.reduce((a, d) => a + d.height, 0) / dimData.length * 10) / 10;
  const longest = [...dimData].sort((a, b) => b.length - a.length)[0];
  const shortest = [...dimData].sort((a, b) => a.length - b.length)[0];
  const widest = [...dimData].sort((a, b) => b.width - a.width)[0];
  const narrowest = [...dimData].sort((a, b) => a.width - b.width)[0];
  const tallest = [...dimData].sort((a, b) => b.height - a.height)[0];
  const flattest = [...dimData].sort((a, b) => a.height - b.height)[0];

  return (
    <>
      <article
        className="absolute overflow-hidden"
        style={{ width: 1, height: 1, padding: 0, margin: -1, clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}
      >
        <h1>Keyboard Layout Overlay — Compare Gaming Keyboard Dimensions</h1>
        <p>
          Compare the physical dimensions and shapes of {keyboardNames.length} esports gaming keyboards using our
          interactive overlay tool. Select any two keyboards to see them overlaid at true scale, comparing
          length, width, height, and overall footprint.
        </p>

        <h2>Average Keyboard Dimensions</h2>
        <ul>
          <li>Average length: {avgLength}mm</li>
          <li>Average width: {avgWidth}mm</li>
          <li>Average height: {avgHeight}mm</li>
          <li>Longest: <a href={`/keyboards/${slug(longest.name)}`}>{longest.name}</a> ({longest.length}mm)</li>
          <li>Shortest: <a href={`/keyboards/${slug(shortest.name)}`}>{shortest.name}</a> ({shortest.length}mm)</li>
          <li>Widest: <a href={`/keyboards/${slug(widest.name)}`}>{widest.name}</a> ({widest.width}mm)</li>
          <li>Narrowest: <a href={`/keyboards/${slug(narrowest.name)}`}>{narrowest.name}</a> ({narrowest.width}mm)</li>
          <li>Tallest hump: <a href={`/keyboards/${slug(tallest.name)}`}>{tallest.name}</a> ({tallest.height}mm)</li>
          <li>Flattest: <a href={`/keyboards/${slug(flattest.name)}`}>{flattest.name}</a> ({flattest.height}mm)</li>
        </ul>

        <h2>Complete Keyboard Dimensions Database</h2>
        <table>
          <caption>Physical dimensions of {keyboardNames.length} esports gaming keyboards (millimeters)</caption>
          <thead><tr><th>Keyboard</th><th>Length</th><th>Width</th><th>Height</th><th>Brand</th><th>Weight</th><th>Layout</th></tr></thead>
          <tbody>
            {dimData.sort((a, b) => a.length - b.length).map((d) => (
              <tr key={d.name}>
                <td><a href={`/keyboards/${slug(d.name)}`}>{d.name}</a></td>
                <td>{d.length}mm</td>
                <td>{d.width}mm</td>
                <td>{d.height}mm</td>
                <td>{d.keyboard ? <a href="/brands">{d.keyboard.brand}</a> : "—"}</td>
                <td>{d.keyboard ? `${d.keyboard.weight}g` : "—"}</td>
                <td>{d.keyboard?.shape || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Keyboards by Size Category</h2>
        <h3>Small Keyboards (Under 120mm length)</h3>
        <ul>
          {dimData.filter((d) => d.length < 120).sort((a, b) => a.length - b.length).map((d) => (
            <li key={d.name}><a href={`/keyboards/${slug(d.name)}`}>{d.name}</a> — {d.length}×{d.width}×{d.height}mm{d.keyboard ? `, ${d.keyboard.weight}g` : ""}</li>
          ))}
        </ul>
        <h3>Medium Keyboards (120-126mm)</h3>
        <ul>
          {dimData.filter((d) => d.length >= 120 && d.length <= 126).sort((a, b) => a.length - b.length).map((d) => (
            <li key={d.name}><a href={`/keyboards/${slug(d.name)}`}>{d.name}</a> — {d.length}×{d.width}×{d.height}mm{d.keyboard ? `, ${d.keyboard.weight}g` : ""}</li>
          ))}
        </ul>
        <h3>Large Keyboards (Over 126mm)</h3>
        <ul>
          {dimData.filter((d) => d.length > 126).sort((a, b) => a.length - b.length).map((d) => (
            <li key={d.name}><a href={`/keyboards/${slug(d.name)}`}>{d.name}</a> — {d.length}×{d.width}×{d.height}mm{d.keyboard ? `, ${d.keyboard.weight}g` : ""}</li>
          ))}
        </ul>

        <h2>Shape Guide</h2>
        <h3>Symmetrical Keyboards</h3>
        <p>Symmetrical (ambidextrous) shapes work for both hands and are generally preferred for claw and fingertip grips.</p>
        <ul>
          {dimData.filter((d) => d.keyboard?.shape === "Symmetrical").map((d) => (
            <li key={d.name}><a href={`/keyboards/${slug(d.name)}`}>{d.name}</a> — {d.length}×{d.width}×{d.height}mm ({d.keyboard.brand})</li>
          ))}
        </ul>
        <h3>Ergonomic Keyboards</h3>
        <p>Ergonomic (right-handed) shapes are contoured for palm grip and offer better comfort for extended sessions.</p>
        <ul>
          {dimData.filter((d) => d.keyboard?.shape === "Ergonomic").map((d) => (
            <li key={d.name}><a href={`/keyboards/${slug(d.name)}`}>{d.name}</a> — {d.length}×{d.width}×{d.height}mm ({d.keyboard.brand})</li>
          ))}
        </ul>

        <nav aria-label="Related"><ul>
          <li><a href="/keyboards">All Esports Keyboards</a></li>
          <li><a href="/compare">Compare Keyboards Specs</a></li>
          <li><a href="/lab">Keyboard Finder Quiz</a></li>
          <li><a href="/players">Pro Player Settings</a></li>
          <li><a href="/brands">Keyboard Brands</a></li>
          <li><a href="/switches">Switch Comparison</a></li>
          <li><a href="/">EsportsKeyboards Home</a></li>
        </ul></nav>
      </article>

      <SSRSection>
        <SSRTitle accent="Shape">Overlay Tool</SSRTitle>
        <SSRSub>Compare the dimensions of {keyboardNames.length} esports keyboards at true scale. Overlay any two keyboards to compare length, width, height, and footprint.</SSRSub>
        <SSRGrid>
          <SSRStat label="Keyboards" value={keyboardNames.length} color="#b8956a" />
          <SSRStat label="Avg Length" value={`${avgLength}mm`} color="#b8956a" />
          <SSRStat label="Avg Width" value={`${avgWidth}mm`} color="#b8956a" />
          <SSRStat label="Avg Height" value={`${avgHeight}mm`} color="#b8956a" />
        </SSRGrid>
        <div className="flex flex-wrap gap-2">
          <SSRLink href="/keyboards">All Keyboards</SSRLink>
          <SSRLink href="/compare">Compare Specs</SSRLink>
          <SSRLink href="/lab">Finder Quiz</SSRLink>
        </div>
      </SSRSection>

      <EsportsKeyboards initialTab="shapes" />
    </>
  );
}
