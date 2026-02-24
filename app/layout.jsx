import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://esportskeyboards.com"),
  title: {
    default: "EsportsKeyboards — The Definitive Guide to Pro Esports Keyboards",
    template: "%s | EsportsKeyboards",
  },
  description:
    "The #1 database of professional esports keyboards. Compare keyboards used by 2100+ pro players across CS2, Valorant, League of Legends, and 10+ major games. Specs, rankings, switch data, and pro settings.",
  keywords: [
    "esports keyboards",
    "pro gaming keyboard",
    "CS2 keyboard",
    "Valorant keyboard",
    "pro player settings",
    "gaming keyboard ranking",
    "esports keyboards",
    "keyboard ranking",
    "best gaming keyboard",
    "keyboard switch comparison",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "EsportsKeyboards",
    title: "EsportsKeyboards — The Definitive Guide to Pro Esports Keyboards",
    description:
      "The #1 database of professional esports keyboards. Compare keyboards used by 2100+ pro players across 13 major games.",
    url: "https://esportskeyboards.com",
    images: [
      {
        url: "https://esportskeyboards.com/og?title=The+Definitive+Guide+to+Pro+Esports+Keyboards&subtitle=2100%2B+Pro+Players+%C2%B7+150%2B+Keyboards+%C2%B7+13+Games",
        width: 1200,
        height: 630,
        alt: "EsportsKeyboards — The Definitive Guide to Pro Esports Keyboards",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EsportsKeyboards — The Definitive Guide to Pro Esports Keyboards",
    description:
      "The #1 database of professional esports keyboards. Compare keyboards used by 2100+ pro players across 13 major games.",
    images: ["https://esportskeyboards.com/og?title=The+Definitive+Guide+to+Pro+Esports+Keyboards&subtitle=2100%2B+Pro+Players+%C2%B7+150%2B+Keyboards+%C2%B7+13+Games"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "https://esportskeyboards.com",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#fafaf8" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <link rel="preconnect" href="https://flagcdn.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://flagcdn.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500&family=JetBrains+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="alternate" type="application/rss+xml" title="EsportsKeyboards Blog" href="/feed.xml" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "EsportsKeyboards",
                url: "https://esportskeyboards.com",
                description:
                  "The #1 database of professional esports keyboards. Compare keyboards used by 2100+ pro players across 13 major games.",
                potentialAction: {
                  "@type": "SearchAction",
                  target: "https://esportskeyboards.com/?q={search_term_string}",
                  "query-input": "required name=search_term_string",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "EsportsKeyboards",
                url: "https://esportskeyboards.com",
                logo: "https://esportskeyboards.com/icon.png",
                sameAs: [],
                description: "The definitive database for professional esports keyboards, pro player settings, and gaming peripheral data.",
              },
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "What keyboard do most pro esports players use?",
                    acceptedAnswer: { "@type": "Answer", text: "The Wooting 60HE is the most popular keyboard among professional esports players in 2025-2026, used across CS2, Valorant, Fortnite, and other titles. The Razer Huntsman V3 Pro is the second most popular choice." },
                  },
                  {
                    "@type": "Question",
                    name: "What keyboard settings do pro players use?",
                    acceptedAnswer: { "@type": "Answer", text: "Most professional esports players use between 400 and 800 DPI. 800 DPI is the most common setting, followed by 400 DPI. The actual aiming speed is determined by eDPI (DPI × in-game sensitivity), which varies significantly by game." },
                  },
                  {
                    "@type": "Question",
                    name: "What keyboard does s1mple use?",
                    acceptedAnswer: { "@type": "Answer", text: "s1mple, widely regarded as the greatest CS player of all time, has used various keyboards throughout his career. Check his full profile on EsportsKeyboards for his current keyboard, settings, and complete gear setup." },
                  },
                  {
                    "@type": "Question",
                    name: "Is a lighter keyboard better for gaming?",
                    acceptedAnswer: { "@type": "Answer", text: "Lighter keyboards with rapid trigger and low actuation points are preferred by most professional FPS players for faster input response. However, keyboard weight is less critical than switch type, actuation distance, and polling rate. The best keyboard depends on your game and playstyle." },
                  },
                  {
                    "@type": "Question",
                    name: "What polling rate do pros use for keyboards?",
                    acceptedAnswer: { "@type": "Answer", text: "In 2025, 4KHz (4000Hz) polling is the most common among pros, with 8KHz (8000Hz) gaining adoption. Higher polling rates reduce input delay and provide smoother cursor movement, which matters at the highest levels of competitive play." },
                  },
                ],
              },
            ]),
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
