import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "The Definitive Guide to Pro Esports Keyboards";
  const subtitle = searchParams.get("subtitle") || "2100+ Pro Players · 150+ Keyboards · 14 Games";
  const accent = searchParams.get("accent") || "#b8956a";
  const stat1 = searchParams.get("stat1") || "";
  const stat2 = searchParams.get("stat2") || "";
  const stat3 = searchParams.get("stat3") || "";
  const s1Label = searchParams.get("s1Label") || "";
  const s2Label = searchParams.get("s2Label") || "";
  const s3Label = searchParams.get("s3Label") || "";
  const badge = searchParams.get("badge") || "";
  const titleSize = title.length > 30 ? 44 : 54;

  return new ImageResponse(
    (
      <div style={{ background: "#f5f0e8", width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "system-ui, sans-serif", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-120px", right: "-80px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, " + accent + "20, transparent 70%)", display: "flex" }} />
        <div style={{ position: "absolute", bottom: "-120px", left: "-80px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, " + accent + "12, transparent 70%)", display: "flex" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: "linear-gradient(to right, transparent, " + accent + ", transparent)", display: "flex" }} />
        <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "24px", display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ color: "#b8956a" }}>ESPORTS</span>
          <span style={{ color: "#1a1614" }}>KEYBOARDS</span>
          <span style={{ color: "#a09890", fontSize: 16 }}>.com</span>
        </div>
        {badge ? (
          <div style={{ fontSize: 14, fontWeight: 700, color: accent, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "12px", padding: "4px 16px", borderRadius: "6px", background: accent + "15", border: "1px solid " + accent + "30", display: "flex" }}>{badge}</div>
        ) : null}
        <div style={{ fontSize: titleSize, fontWeight: 900, color: "#1a1614", textAlign: "center", maxWidth: "1000px", lineHeight: 1.15, padding: "0 60px", display: "flex" }}>{title}</div>
        {subtitle ? (
          <div style={{ fontSize: 20, color: "#6b635b", marginTop: "20px", letterSpacing: "0.08em", textAlign: "center", maxWidth: "900px", padding: "0 40px", display: "flex" }}>{subtitle}</div>
        ) : null}
        {(stat1 || stat2 || stat3) ? (
          <div style={{ display: "flex", gap: "40px", marginTop: "36px" }}>
            {stat1 ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "12px 24px", borderRadius: "12px", background: accent + "10", border: "1px solid " + accent + "25" }}>
                <div style={{ fontSize: 32, fontWeight: 900, color: accent, display: "flex" }}>{stat1}</div>
                <div style={{ fontSize: 13, color: "#8a8078", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "4px", display: "flex" }}>{s1Label}</div>
              </div>
            ) : null}
            {stat2 ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "12px 24px", borderRadius: "12px", background: accent + "10", border: "1px solid " + accent + "25" }}>
                <div style={{ fontSize: 32, fontWeight: 900, color: accent, display: "flex" }}>{stat2}</div>
                <div style={{ fontSize: 13, color: "#8a8078", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "4px", display: "flex" }}>{s2Label}</div>
              </div>
            ) : null}
            {stat3 ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "12px 24px", borderRadius: "12px", background: accent + "10", border: "1px solid " + accent + "25" }}>
                <div style={{ fontSize: 32, fontWeight: 900, color: accent, display: "flex" }}>{stat3}</div>
                <div style={{ fontSize: 13, color: "#8a8078", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "4px", display: "flex" }}>{s3Label}</div>
              </div>
            ) : null}
          </div>
        ) : null}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "4px", background: "linear-gradient(to right, transparent, " + accent + ", transparent)", display: "flex" }} />
        <div style={{ position: "absolute", bottom: "24px", fontSize: 16, color: accent + "60", letterSpacing: "0.15em", display: "flex" }}>esportskeyboards.com</div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
