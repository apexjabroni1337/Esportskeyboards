# EsportsKeyboards.com — Full Visual Redesign Plan

## Design Direction
**Moderate Keyboard Theme**: Professional, modern site with unmistakable keyboard visual language throughout — keycap shapes, switch color coding, layout grids, mechanical switch aesthetics. Not over-the-top RGB gamer, but clearly a keyboard-first experience.

## Workflow
**Phase by phase**: Create 7 HTML mockup files per element in batches of 5-6 elements. User picks favorites from each batch, I implement, then move to the next phase.

---

## PHASE 1: Keyboard Gallery & Cards (START HERE)
**Elements (6) → 42 mockup files**

1. **KeyboardCard Component** — The individual keyboard product card shown in the gallery grid. Currently a generic product card with image, name, brand, stats. → Redesign with keycap-shaped badges, switch type visual indicators, keyboard layout miniature, mechanical feel.

2. **All Keyboards Gallery Layout** — The grid layout, filter bar, sort dropdown, and filter panel for browsing all keyboards. Currently generic e-commerce style. → Redesign filters as switch selectors, grid as keycap-inspired layout, brand filters as colored keycaps.

3. **Featured Keyboard Spotlight** — The 3-column showcase on the Overview tab (image + radar chart + pro users). Currently partially keyboard-focused. → Enhance with keyboard dossier styling, switch selector buttons, spec visualization.

4. **Keyboard Detail Page** (SSR /keyboards/[slug]) — Individual keyboard pages with specs, pro users, description. Currently generic product page. → Redesign as keyboard spec sheet with switch type prominence, layout diagram, pro endorsements.

5. **Compare Detail Page** (SSR /compare/[slug]) — Side-by-side keyboard comparison. Currently basic table comparison. → Redesign as keyboard showdown with visual spec bars, switch-by-switch breakdown, winner indicators.

6. **Best/Guide Pages** (SSR /best/[slug]) — "Best keyboard for CS2" etc. recommendation pages. Currently generic listicle. → Redesign as curated keyboard lineup with game-specific theming, switch recommendations.

---

## PHASE 2: Homepage & Core Stats
**Elements (5) → 35 mockup files**

7. **Hero Section** — Overview tab landing with keycap grid visualization, title, stats strip. → More keyboard-forward hero with mechanical switch motifs, animated keyboard layout.

8. **Quick Insights Bubbles** — 5 stat cards (Most Used, Brands, Lightest, Avg Weight, Rapid Trigger). → Keycap-shaped stat cards with switch-colored accents.

9. **SSRStat Component** — Base stat card used on ALL detail pages. → Keyboard-themed stat display with switch indicators.

10. **StatBox Component** (ui.jsx) — Glass card stat box used in spotlights. → Enhanced with mechanical keyboard aesthetics.

11. **SSRLink Component** — Pill-shaped nav buttons across all pages. → Keycap-styled navigation pills.

---

## PHASE 3: Navigation & Chrome
**Elements (4) → 28 mockup files**

12. **Sidebar Navigation** — Tab icons, labels, collapse/expand behavior. → Keyboard-themed icons, keycap-style active indicators, switch-colored highlights.

13. **Header & Search Bar** — Global search with command palette. → Keyboard search metaphor, keystroke-styled input, switch-colored results.

14. **Mobile Bottom Nav** — Bottom tab bar for mobile. → Keycap-row style mobile navigation.

15. **SSRDivider & GlowText** — Section dividers and highlighted text. → Switch-stem dividers, RGB-glow text effects.

---

## PHASE 4: Charts & Data Visualization
**Elements (5) → 35 mockup files**

16. **Bar/Column Charts** — Usage rankings, brand dominance, sensor usage. → Bars as keyboard switches/keycaps, brand-colored with mechanical feel.

17. **Line & Area Charts** — Trend data (wireless, price, weight, polling). → Evolution timeline with keyboard generation markers, switch-colored lines.

18. **Radar Chart** — Featured keyboard 6-point performance radar. → Switch performance hexagon with keycap data points.

19. **Pie/Donut Charts** — Brand market share. → Keyboard switch color distribution wheel.

20. **CustomTooltip** — Chart hover tooltips. → Keycap-shaped tooltip with switch-spec styling.

---

## PHASE 5: Player & Team Pages
**Elements (5) → 35 mockup files**

21. **Player Profile View** (ClientApp) — Header, achievements, setup, history. → Player keyboard config card with switch preference, typing stats.

22. **Player Detail Page** (SSR /players/[slug]) — Server-rendered player page. → Keyboard-focused player profile.

23. **Keyboard History Timeline** — Vertical timeline of keyboard changes. → Keyboard evolution path with switch transitions.

24. **Team Card Grid** — Team cards with logo, members, games. → Team cards as keyboard layout thumbnails.

25. **Team Detail Page** (SSR /teams/[slug]) — Team roster with keyboard analysis. → Team keyboard arsenal showcase.

---

## PHASE 6: Game, Brand & Sensor Pages
**Elements (5) → 35 mockup files**

26. **Game Analysis Tabs** — Bar charts, brand dominance, gear deep dive, rosters. → Game-specific keyboard meta analysis with switch recommendations.

27. **Game Detail Page** (SSR /games/[slug]) — Game keyboard usage analysis. → Input requirements card, keycap grid of popular keyboards.

28. **Brand Detail Page** (SSR /brands/[slug]) — Brand showcase with lineup. → Brand keycap color palette, keyboard lineup as product shelf.

29. **Sensors/Switch Tab** — Switch analytics tables and charts. → Switch type visual showcase with Cherry MX-style color coding.

30. **Sensor Detail Page** (SSR /sensors/[slug]) — Individual switch analysis. → Switch dossier with mechanical spec visualization.

---

## PHASE 7: Specialty & Blog Pages
**Elements (5) → 35 mockup files**

31. **Lab/Quiz Wizard** — Multi-step keyboard finder quiz. → Steps as "building your keyboard", switch selection UI.

32. **Quiz Results Display** — Matched keyboard recommendations. → "Your perfect keyboard profile" keycap card.

33. **Sensitivity/Calculator Pages** — DPI conversion tools. → Keyboard input converter with keystroke metaphors.

34. **Shapes/Layout Pages** — Keyboard dimension analysis. → Actual keyboard layout diagrams (60%, TKL, Full).

35. **Blog Article Cards & Layout** — Article cards and full posts. → Keyboard-themed article design.

---

## TOTAL SCOPE
- **35 elements** to redesign
- **245 HTML mockup files** (35 × 7 options each)
- **7 phases**, tackled one at a time
- **Phase 1 starts immediately** with Keyboard Gallery & Cards

## MOCKUP FORMAT
Each mockup is a standalone HTML file with all CSS inline, viewable in any browser. Shows the element in context with realistic data. Light theme matching the current warm neutral palette enhanced with keyboard aesthetics.
