#!/usr/bin/env python3
"""
Step 2: Rebuild data/index.js — replace mouse-specific data with keyboard data.
Performs surgical replacement of specific line ranges.
"""

import re

DATA_FILE = "data/index.js"

with open(DATA_FILE, "r") as f:
    lines = f.readlines()

# ═══════════════════════════════════════════════════════════════
# 1. BRAND_COLORS — keyboard-relevant brands
# ═══════════════════════════════════════════════════════════════
BRAND_COLORS = """export const BRAND_COLORS = {
  Wooting: "#e84393",
  Razer: "#00ff6a",
  Logitech: "#00b4ff",
  SteelSeries: "#ff8c00",
  Corsair: "#ffd700",
  HyperX: "#ff4500",
  Ducky: "#f472b6",
  Cherry: "#e11d48",
  "Endgame Gear": "#8b5cf6",
  ASUS: "#e11d48",
  Keychron: "#10b981",
  Glorious: "#c084fc",
  DrunkDeer: "#06b6d4",
  Akko: "#f59e0b",
  NuPhy: "#3b82f6",
  Meletrix: "#a78bfa",
  CIDOO: "#14b8a6",
};
"""

# ═══════════════════════════════════════════════════════════════
# 2. KEYBOARD_DIMS — [width_mm, depth_mm, height_mm, layout_factor 0-1 (0=60%, 1=full)]
# ═══════════════════════════════════════════════════════════════
KEYBOARD_DIMS = """// Keyboard dimensions in mm: [width, depth, height_front, layout_factor 0-1 (0=60%,0.35=65%,0.5=75%,0.7=TKL,1=Full)]
export const KEYBOARD_DIMS = {
  "Wooting 60HE": [302, 110, 38, 0.0],
  "Wooting 60HE+": [302, 110, 38, 0.0],
  "Wooting 80HE": [335, 140, 40, 0.5],
  "Wooting UwU": [302, 110, 38, 0.0],
  "Razer Huntsman V3 Pro": [365, 140, 37, 0.7],
  "Razer Huntsman V3 Pro Mini": [302, 110, 37, 0.0],
  "Razer Huntsman V3 Pro TKL": [365, 140, 37, 0.7],
  "Razer Huntsman V2 TKL": [360, 136, 36, 0.7],
  "Razer Huntsman Mini": [294, 103, 36, 0.0],
  "SteelSeries Apex Pro TKL (2024)": [356, 139, 40, 0.7],
  "SteelSeries Apex Pro Mini": [293, 103, 40, 0.0],
  "SteelSeries Apex Pro (2024)": [436, 139, 40, 1.0],
  "SteelSeries Apex 9 TKL": [356, 139, 37, 0.7],
  "Logitech G Pro X TKL": [361, 153, 34, 0.7],
  "Logitech G Pro X 60": [294, 108, 34, 0.0],
  "Logitech G915 TKL": [368, 150, 22, 0.7],
  "Corsair K65 Plus": [332, 120, 37, 0.35],
  "Corsair K70 Max": [440, 163, 38, 1.0],
  "Corsair K70 Pro Mini": [295, 110, 37, 0.0],
  "Corsair K100 Air": [443, 157, 22, 1.0],
  "HyperX Alloy Origins 65": [314, 108, 36, 0.35],
  "HyperX Alloy Origins Core": [360, 133, 36, 0.7],
  "HyperX Alloy Rise 75": [332, 140, 38, 0.5],
  "Ducky One 3 SF": [320, 108, 38, 0.35],
  "Ducky One 3 TKL": [360, 133, 38, 0.7],
  "Ducky One 3 Mini": [302, 108, 38, 0.0],
  "Cherry MX Board 8.0 TKL": [358, 130, 30, 0.7],
  "Cherry XTRFY K5V2": [327, 120, 36, 0.35],
  "Endgame Gear KB65HE": [318, 108, 37, 0.35],
  "ASUS ROG Azoth Extreme": [332, 140, 40, 0.5],
  "ASUS ROG Falchion Ace HFX": [305, 110, 38, 0.35],
  "Keychron Q1 HE": [332, 145, 33, 0.5],
  "Keychron K2 HE": [316, 123, 31, 0.5],
  "Keychron Q0 HE": [293, 108, 33, 0.0],
  "Glorious GMMK 3 Pro": [332, 140, 37, 0.5],
  "Glorious GMMK 3": [436, 140, 37, 1.0],
  "DrunkDeer A75": [332, 120, 36, 0.5],
  "DrunkDeer G65": [318, 108, 36, 0.35],
  "Akko MOD007B-HE": [332, 140, 38, 0.5],
  "NuPhy Halo75 V2": [322, 135, 30, 0.5],
  "Meletrix Boog75 HE": [332, 140, 37, 0.5],
  "CIDOO V75 HE": [332, 120, 36, 0.5],
  "Wooting 80HE Frost": [335, 140, 40, 0.5],
};
"""

# ═══════════════════════════════════════════════════════════════
# 3. KEYBOARD_IMAGE_URLS
# ═══════════════════════════════════════════════════════════════
KEYBOARD_IMAGE_URLS = """export const KEYBOARD_IMAGE_URLS = {
  "Wooting 60HE": "/images/keyboards/wooting-60he.png",
  "Wooting 60HE+": "/images/keyboards/wooting-60he-plus.png",
  "Wooting 80HE": "/images/keyboards/wooting-80he.png",
  "Wooting UwU": "/images/keyboards/wooting-uwu.png",
  "Razer Huntsman V3 Pro": "/images/keyboards/razer-huntsman-v3-pro.png",
  "Razer Huntsman V3 Pro Mini": "/images/keyboards/razer-huntsman-v3-pro-mini.png",
  "Razer Huntsman V3 Pro TKL": "/images/keyboards/razer-huntsman-v3-pro-tkl.png",
  "Razer Huntsman V2 TKL": "/images/keyboards/razer-huntsman-v2-tkl.png",
  "Razer Huntsman Mini": "/images/keyboards/razer-huntsman-mini.png",
  "Razer BlackWidow V4 75%": "/images/keyboards/razer-blackwidow-v4-75.png",
  "SteelSeries Apex Pro TKL (2024)": "/images/keyboards/steelseries-apex-pro-tkl-2024.png",
  "SteelSeries Apex Pro Mini": "/images/keyboards/steelseries-apex-pro-mini.png",
  "SteelSeries Apex Pro (2024)": "/images/keyboards/steelseries-apex-pro-2024.png",
  "SteelSeries Apex 9 TKL": "/images/keyboards/steelseries-apex-9-tkl.png",
  "Logitech G Pro X TKL": "/images/keyboards/logitech-g-pro-x-tkl.png",
  "Logitech G Pro X 60": "/images/keyboards/logitech-g-pro-x-60.png",
  "Logitech G915 TKL": "/images/keyboards/logitech-g915-tkl.png",
  "Logitech G715": "/images/keyboards/logitech-g715.png",
  "Corsair K65 Plus": "/images/keyboards/corsair-k65-plus.png",
  "Corsair K70 Max": "/images/keyboards/corsair-k70-max.png",
  "Corsair K70 Pro Mini": "/images/keyboards/corsair-k70-pro-mini.png",
  "Corsair K100 Air": "/images/keyboards/corsair-k100-air.png",
  "HyperX Alloy Origins 65": "/images/keyboards/hyperx-alloy-origins-65.png",
  "HyperX Alloy Origins Core": "/images/keyboards/hyperx-alloy-origins-core.png",
  "HyperX Alloy Rise 75": "/images/keyboards/hyperx-alloy-rise-75.png",
  "Ducky One 3 SF": "/images/keyboards/ducky-one-3-sf.png",
  "Ducky One 3 TKL": "/images/keyboards/ducky-one-3-tkl.png",
  "Ducky One 3 Mini": "/images/keyboards/ducky-one-3-mini.png",
  "Cherry MX Board 8.0 TKL": "/images/keyboards/cherry-mx-board-8-tkl.png",
  "Cherry XTRFY K5V2": "/images/keyboards/cherry-xtrfy-k5v2.png",
  "Endgame Gear KB65HE": "/images/keyboards/endgame-gear-kb65he.png",
  "ASUS ROG Azoth Extreme": "/images/keyboards/asus-rog-azoth-extreme.png",
  "ASUS ROG Falchion Ace HFX": "/images/keyboards/asus-rog-falchion-ace-hfx.png",
  "ASUS ROG Strix Scope II 96": "/images/keyboards/asus-rog-strix-scope-ii.png",
  "Keychron Q1 HE": "/images/keyboards/keychron-q1-he.png",
  "Keychron K2 HE": "/images/keyboards/keychron-k2-he.png",
  "Keychron Q0 HE": "/images/keyboards/keychron-q0-he.png",
  "Glorious GMMK 3 Pro": "/images/keyboards/glorious-gmmk-3-pro.png",
  "Glorious GMMK 3": "/images/keyboards/glorious-gmmk-3.png",
  "DrunkDeer A75": "/images/keyboards/drunkdeer-a75.png",
  "DrunkDeer G65": "/images/keyboards/drunkdeer-g65.png",
  "Akko MOD007B-HE": "/images/keyboards/akko-mod007b-he.png",
  "Akko 5075B Plus HE": "/images/keyboards/akko-5075b-plus-he.png",
  "NuPhy Halo75 V2": "/images/keyboards/nuphy-halo75-v2.png",
  "Meletrix Boog75 HE": "/images/keyboards/meletrix-boog75-he.png",
  "CIDOO V75 HE": "/images/keyboards/cidoo-v75-he.png",
  "Wooting 80HE Frost": "/images/keyboards/wooting-80he-frost.png"
};
"""

# ═══════════════════════════════════════════════════════════════
# 4. KEYBOARD_DESCRIPTIONS — detailed write-ups for each keyboard
# ═══════════════════════════════════════════════════════════════
KEYBOARD_DESCRIPTIONS = r"""export const KEYBOARD_DESCRIPTIONS = {
  "Wooting 60HE": {
    text: "The Wooting 60HE is the single most transformative keyboard in esports history. When it launched in 2023, it introduced rapid trigger technology to the mainstream competitive scene and within months became the default choice for professional Counter-Strike and Valorant players. Rapid trigger eliminates the fixed reset point of traditional mechanical switches, allowing keys to re-actuate the instant they begin moving downward again — enabling movement techniques like counter-strafing at speeds physically impossible on conventional keyboards. At an estimated 45-50% pro usage in CS2 and climbing, the 60HE holds a dominance in its category that rivals the Logitech G Pro X Superlight's peak in mice. The Lekker magnetic hall-effect switches allow per-key actuation point adjustment from 0.1mm to 4.0mm, and the analog input capability opens up movement precision previously exclusive to controllers. Wooting's small-team, community-driven development means firmware updates are frequent and directly responsive to pro feedback.",
    highlights: ["most transformative keyboard in esports history", "45-50% pro usage in CS2", "movement techniques physically impossible on conventional keyboards"]
  },
  "Wooting 60HE+": {
    text: "The Wooting 60HE+ is the refined successor to the keyboard that changed competitive gaming forever. Building on the original 60HE's revolutionary rapid trigger foundation, the Plus model adds improved stabilizers, enhanced firmware, and the refined Lekker V2 switches with smoother key travel and better consistency across the actuation range. Every improvement is subtle but meaningful — the kind of iteration that only matters when you're competing at the highest level. The 60HE+ maintains the 60% compact layout that FPS pros overwhelmingly prefer for maximum mouse space, and the community-driven Wootility software remains the gold standard for keyboard configuration. Many tournament organizers now specifically stock Wooting keyboards for BYOC events.",
    highlights: ["refined successor to the keyboard that changed competitive gaming", "Lekker V2 switches with smoother key travel", "tournament organizers now stock Wooting keyboards"]
  },
  "Wooting 80HE": {
    text: "The Wooting 80HE extends the legendary 60HE platform into a 75% layout, adding function row and navigation keys for players who need the extra keys without sacrificing rapid trigger and analog input. The additional real estate makes it popular with content creators and players who frequently alt-tab or use function keys for game binds. It uses the same Lekker magnetic hall-effect switches with 0.1-4.0mm adjustable actuation and full rapid trigger support. While the 60% layout dominates pure FPS competition, the 80HE has found a strong following among MOBA players, streamers, and FPS pros who simply prefer having a function row available.",
    highlights: ["extends the legendary 60HE platform into 75% layout", "same Lekker magnetic hall-effect switches", "strong following among MOBA players and streamers"]
  },
  "Wooting UwU": {
    text: "The Wooting UwU is Wooting's premium flagship 60% keyboard, featuring an aluminum CNC case, silicone dampening layers, pre-lubed stabilizers, and the latest Lekker V2 switches out of the box. Designed as the enthusiast tier of the Wooting lineup, the UwU delivers the same competitive rapid trigger performance as the 60HE in a package that sounds and feels dramatically more refined. The acoustic profile is deeper and more muted — a stark contrast to the somewhat hollow stock 60HE. For pros who want both competitive advantage and a premium typing experience, the UwU represents the pinnacle of what a competitive 60% can be.",
    highlights: ["premium flagship 60% keyboard", "aluminum CNC case with silicone dampening", "pinnacle of what a competitive 60% can be"]
  },
  "Razer Huntsman V3 Pro": {
    text: "The Razer Huntsman V3 Pro is Razer's flagship analog optical keyboard and their answer to Wooting's dominance in competitive FPS. Featuring second-generation Razer Analog Optical switches with rapid trigger, adjustable actuation from 0.1mm to 4.0mm, and 8000Hz polling rate, it brings the full force of Razer's engineering and massive sponsorship ecosystem to the rapid trigger wars. The build quality is premium with a magnetic wrist rest, media controls, and Razer's polished Synapse software suite. Razer-sponsored pros across CS2, Valorant, and Fortnite have been transitioning to the V3 Pro, and its tournament presence is growing rapidly. The TKL layout is unconventional for FPS but suits Razer's broader gaming audience.",
    highlights: ["Razer's answer to Wooting's dominance", "second-generation Analog Optical switches", "8000Hz polling rate"]
  },
  "Razer Huntsman V3 Pro Mini": {
    text: "The Razer Huntsman V3 Pro Mini is the 60% compact variant of Razer's flagship, specifically designed for competitive FPS where desk space is sacred. Same second-gen Razer Analog Optical switches, same 0.1-4.0mm actuation, same rapid trigger — in the compact layout that FPS pros demand. With Razer's enormous sponsorship portfolio across CS2, Valorant, Fortnite, and Call of Duty, the V3 Pro Mini has a built-in adoption pathway that Wooting's grassroots approach can't match. For Razer loyalists or sponsored players, this is the keyboard that lets them compete with Wooting users on equal technological footing.",
    highlights: ["60% compact variant for competitive FPS", "same rapid trigger as flagship", "Razer's enormous sponsorship portfolio"]
  },
  "Razer Huntsman V3 Pro TKL": {
    text: "The Razer Huntsman V3 Pro TKL splits the difference between the full-size V3 Pro and the Mini, offering a tenkeyless layout with rapid trigger and Razer's full analog optical switch technology. The TKL form factor gives players navigation keys and arrow keys while still freeing up significant desk space compared to full-size. It's become a popular choice for players who want the Razer ecosystem experience with competitive rapid trigger features but find 60% too restrictive for their workflow.",
    highlights: ["tenkeyless layout with full rapid trigger", "navigation keys while saving desk space", "popular for players who find 60% too restrictive"]
  },
  "Razer Huntsman V2 TKL": {
    text: "The Razer Huntsman V2 TKL was Razer's premier esports keyboard before the V3 Pro line introduced rapid trigger. Using Razer's first-gen optical switches with a fixed actuation point, it was the go-to keyboard for countless CS:GO and early Valorant professionals. It lacks rapid trigger and adjustable actuation — meaning it's now a generation behind for competitive FPS — but many veteran pros still use it out of familiarity. The optical switches still deliver sub-millisecond actuation speed, and the build quality remains excellent. Think of it as the keyboard equivalent of the original Logitech G Pro X Superlight: iconic, widely used, but being overtaken by newer technology.",
    highlights: ["premier esports keyboard before rapid trigger era", "first-gen optical switches", "many veteran pros still use it"]
  },
  "SteelSeries Apex Pro TKL (2024)": {
    text: "The SteelSeries Apex Pro TKL (2024) is the latest iteration of SteelSeries' flagship adjustable-actuation keyboard, now featuring OmniPoint 3.0 magnetic switches with rapid trigger support. The Apex Pro was actually the first major keyboard to offer adjustable actuation points when it debuted in 2019, predating Wooting's mainstream breakthrough by several years — but SteelSeries was slow to add rapid trigger, which is what actually mattered for competitive play. The 2024 refresh finally brings rapid trigger alongside 0.1-4.0mm actuation and 8KHz polling support. The OLED display on the keyboard is a unique feature, and the build quality is signature SteelSeries premium. Adoption among pros is growing but trails both Wooting and Razer.",
    highlights: ["first major keyboard to offer adjustable actuation", "OmniPoint 3.0 with rapid trigger", "OLED display and premium build"]
  },
  "SteelSeries Apex Pro Mini": {
    text: "The SteelSeries Apex Pro Mini brings the OmniPoint adjustable switch technology into a 60% form factor. With rapid trigger support in the latest firmware and adjustable actuation from 0.2mm to 3.8mm, it competes directly with the Wooting 60HE for the compact competitive keyboard crown. The aluminum top plate and detachable USB-C cable give it a premium feel. SteelSeries' heritage in esports means solid tournament support, though the Apex Pro Mini hasn't matched the Wooting's cultural dominance among pro players.",
    highlights: ["OmniPoint in 60% form factor", "competes directly with Wooting 60HE", "aluminum top plate and premium build"]
  },
  "SteelSeries Apex Pro (2024)": {
    text: "The full-size SteelSeries Apex Pro (2024) brings OmniPoint 3.0 switches with rapid trigger to the complete layout, including numpad. While full-size keyboards are rare in FPS esports, the Apex Pro finds its audience among content creators, MOBA players, and those who need the full key complement. The integrated OLED display, USB passthrough, and magnetic wrist rest make it a premium desktop centerpiece.",
    highlights: ["full-size with OmniPoint 3.0 rapid trigger", "integrated OLED display", "premium desktop centerpiece"]
  },
  "SteelSeries Apex 9 TKL": {
    text: "The SteelSeries Apex 9 TKL uses optical switches rather than the magnetic OmniPoint found in the Apex Pro line. It delivers fast actuation at a lower price point but lacks adjustable actuation and rapid trigger. Positioned as a mid-range esports keyboard, it's a solid choice for players who want optical speed without the premium price of the Apex Pro. Some FPS pros who haven't adopted rapid trigger still use the Apex 9 for its proven optical switch performance.",
    highlights: ["optical switches at lower price point", "mid-range esports keyboard", "fast actuation without rapid trigger"]
  },
  "Logitech G Pro X TKL": {
    text: "The Logitech G Pro X TKL is Logitech's tenkeyless esports keyboard featuring hot-swappable GX mechanical switches, Lightspeed wireless capability, and the clean aesthetic that defined the G Pro peripheral line. While it lacks the rapid trigger and adjustable actuation that now dominate competitive FPS, it remains popular among LoL, Dota 2, and other non-FPS pros where rapid trigger offers no advantage. Logitech's software ecosystem and build quality are excellent, and the wireless capability makes it uniquely portable for LAN events.",
    highlights: ["Logitech's tenkeyless esports keyboard", "hot-swappable GX mechanical switches", "popular among MOBA pros"]
  },
  "Logitech G Pro X 60": {
    text: "The Logitech G Pro X 60 is Logitech's compact 60% wireless keyboard built for competitive FPS. Featuring Lightspeed wireless, GX2 optical-mechanical switches, and a remarkably slim profile, it targets the same compact FPS market as the Wooting 60HE. However, the lack of rapid trigger and adjustable actuation puts it at a significant competitive disadvantage in the current meta. It remains a good option for players who prioritize Logitech's wireless ecosystem and build quality over cutting-edge switch technology.",
    highlights: ["Logitech's compact 60% wireless keyboard", "GX2 optical-mechanical switches", "lacks rapid trigger — competitive disadvantage"]
  },
  "Logitech G915 TKL": {
    text: "The Logitech G915 TKL is a low-profile wireless TKL keyboard that pioneered the premium wireless keyboard category. Its ultra-slim design with GL switches is unlike any other esports keyboard — some players love the laptop-like key feel while others find it too flat for gaming. The Lightspeed wireless is excellent and battery life is phenomenal. It's found a niche among LoL and Dota 2 pros who value the low profile and wireless freedom, though it sees virtually zero usage in competitive FPS.",
    highlights: ["pioneered premium wireless keyboard category", "ultra-slim design with GL switches", "niche among MOBA pros"]
  },
  "Corsair K65 Plus": {
    text: "The Corsair K65 Plus is a 75% keyboard featuring Corsair's MLX Red V2 switches and their polished iCUE software ecosystem. The hot-swappable PCB, pre-lubed stabilizers, and sound-dampening foam show Corsair taking the enthusiast keyboard market seriously. While it lacks rapid trigger and hall-effect switches, the build quality and software integration make it attractive to players who already live in the Corsair ecosystem. The K65 Plus represents Corsair's bridge between mainstream gaming and enthusiast keyboard culture.",
    highlights: ["75% with hot-swappable MLX Red V2 switches", "iCUE ecosystem integration", "bridge between gaming and enthusiast culture"]
  },
  "Corsair K70 Max": {
    text: "The Corsair K70 Max is Corsair's entry into the magnetic hall-effect keyboard market, featuring MGX switches with adjustable actuation from 0.4mm to 3.6mm and rapid trigger support. The full-size layout with media controls, USB passthrough, and premium aluminum frame positions it as a complete desktop solution rather than a stripped-down competition tool. Corsair's deep iCUE integration means the K70 Max works seamlessly with their broader peripheral ecosystem. For players who want rapid trigger in a full-featured package, it's one of the best-built options available.",
    highlights: ["Corsair's entry into magnetic hall-effect", "MGX switches with rapid trigger", "premium full-size with iCUE integration"]
  },
  "HyperX Alloy Origins 65": {
    text: "The HyperX Alloy Origins 65 is a compact 65% keyboard with a full aluminum body and HyperX's mechanical switches. The 65% layout adds arrow keys and a few navigation keys to the 60% form factor, which many players find to be the ideal compromise. While it doesn't have rapid trigger or adjustable actuation, the solid build quality, competitive price, and HyperX's extensive esports presence make it a common sight among professional gamers, particularly those sponsored by HyperX.",
    highlights: ["compact 65% with full aluminum body", "ideal compromise between 60% and TKL", "common among HyperX-sponsored pros"]
  },
  "HyperX Alloy Origins Core": {
    text: "The HyperX Alloy Origins Core is a TKL keyboard with an aircraft-grade aluminum body and HyperX's Red mechanical switches. Simple, reliable, and well-built — it represents the traditional mechanical keyboard approach to esports before the rapid trigger revolution. Many veteran FPS pros still use it, and its presence at tournaments remains steady among players who haven't transitioned to hall-effect technology.",
    highlights: ["TKL with aircraft-grade aluminum", "traditional mechanical approach", "steady tournament presence"]
  },
  "Ducky One 3 SF": {
    text: "The Ducky One 3 SF (sixty-five percent) is the latest iteration of Ducky's iconic compact keyboard line. Known for exceptional build quality, hot-swappable Cherry MX switches, and distinctive keycap designs, Ducky keyboards have been a staple of the competitive scene since the CS:GO era. The One 3 SF doesn't have rapid trigger, but its Cherry MX switches are the industry standard for reliability. Many CS2 and Valorant pros who started competing before the rapid trigger era still swear by their Ducky boards.",
    highlights: ["iconic compact keyboard line", "hot-swappable Cherry MX switches", "staple of competitive scene since CS:GO era"]
  },
  "Ducky One 3 Mini": {
    text: "The Ducky One 3 Mini is the 60% variant in Ducky's One 3 lineup, featuring the same hot-swappable Cherry MX support, triple-mode connectivity, and the renowned Ducky build quality. Its compact form factor maximizes desk space for low-sensitivity FPS players. The charming aesthetic with custom keycaps has made Ducky a cultural icon in the keyboard community.",
    highlights: ["60% with hot-swappable Cherry MX", "triple-mode connectivity", "cultural icon in keyboard community"]
  },
  "Cherry XTRFY K5V2": {
    text: "The Cherry XTRFY K5V2 is the product of Cherry's acquisition of Xtrfy, combining Cherry's legendary switch heritage with Xtrfy's esports design DNA. Featuring Cherry MX2A switches — Cherry's newest and most refined mechanical switch design — in a 65% hot-swappable layout, it represents German engineering meets Swedish esports culture. The K5V2 has gained traction among European CS2 players who trust the Cherry name.",
    highlights: ["Cherry's newest MX2A switches", "German engineering meets Swedish esports", "traction among European CS2 players"]
  },
  "Endgame Gear KB65HE": {
    text: "The Endgame Gear KB65HE brings the German precision engineering brand's no-nonsense philosophy to the hall-effect keyboard market. Featuring magnetic hall-effect switches with rapid trigger and adjustable actuation in a compact 65% layout, it directly targets competitive FPS players who want rapid trigger without paying Wooting or Razer prices. The KB65HE was developed with direct input from professional players, and its clean design philosophy — no RGB excess, just performance fundamentals — mirrors Endgame Gear's approach to mice.",
    highlights: ["German precision in hall-effect keyboard", "rapid trigger at competitive price", "developed with pro player input"]
  },
  "ASUS ROG Azoth Extreme": {
    text: "The ASUS ROG Azoth Extreme is the most feature-rich 75% keyboard on the market, combining NX Snow magnetic switches with rapid trigger, a built-in OLED display, three-way connectivity (USB/2.4GHz/Bluetooth), gasket mounting, and ASUS's signature ROG design language. It's an engineering showcase that demonstrates ASUS's semiconductor expertise applied to keyboards. The carbon fiber top plate and CNC aluminum case make it one of the best-built keyboards available at any price.",
    highlights: ["most feature-rich 75% keyboard", "NX Snow magnetic switches with rapid trigger", "carbon fiber and CNC aluminum construction"]
  },
  "ASUS ROG Falchion Ace HFX": {
    text: "The ASUS ROG Falchion Ace HFX is ASUS's compact 65% hall-effect keyboard targeting competitive esports. With ROG NX HFX magnetic switches, rapid trigger support, and a minimalist design that prioritizes performance over features, it's ASUS's most focused competitive keyboard. The dual USB-C connectivity and compact layout make it tournament-ready.",
    highlights: ["compact 65% hall-effect for esports", "ROG NX HFX magnetic switches", "minimalist tournament-ready design"]
  },
  "Keychron Q1 HE": {
    text: "The Keychron Q1 HE brings hall-effect magnetic switches to Keychron's acclaimed Q series, combining the Q1's proven gasket-mount CNC aluminum design with Gateron Double-Rail magnetic switches featuring rapid trigger and adjustable actuation. Keychron's reputation for exceptional value means the Q1 HE delivers premium build quality and competitive features at a price that undercuts Wooting and Razer. It's become a popular choice among budget-conscious competitive players.",
    highlights: ["hall-effect in acclaimed Q series design", "Gateron Double-Rail magnetic switches", "premium build at value price"]
  },
  "Keychron K2 HE": {
    text: "The Keychron K2 HE is a wireless 75% keyboard with Gateron magnetic switches and rapid trigger support. The triple-mode connectivity (USB-C, 2.4GHz, Bluetooth) and excellent battery life make it versatile for both competition and daily use. Keychron's software enables per-key actuation adjustment and rapid trigger configuration. It's one of the most affordable rapid trigger keyboards available.",
    highlights: ["wireless 75% with rapid trigger", "triple-mode connectivity", "most affordable rapid trigger keyboards"]
  },
  "Glorious GMMK 3 Pro": {
    text: "The Glorious GMMK 3 Pro is a 75% keyboard featuring Glorious's Fox magnetic switches with rapid trigger support and adjustable actuation. The gasket-mounted design with sound-dampening foam delivers a premium acoustic experience, and the hot-swappable PCB means you can experiment with different switch types. Glorious has built a loyal community through transparent pricing and community engagement, and the GMMK 3 Pro represents their most competitive offering yet.",
    highlights: ["Fox magnetic switches with rapid trigger", "gasket-mount with premium acoustics", "community-driven development"]
  },
  "DrunkDeer A75": {
    text: "The DrunkDeer A75 disrupted the hall-effect keyboard market by delivering rapid trigger and adjustable actuation at under $100 — roughly half the price of a Wooting 60HE. The 75% layout with magnetic switches and per-key actuation adjustment from 0.4mm to 3.6mm made competitive keyboard technology accessible to a much wider audience. Build quality has steadily improved through revisions, and the A75 has become the go-to recommendation for players who want rapid trigger on a budget. It proved that rapid trigger doesn't have to be a premium feature.",
    highlights: ["rapid trigger under $100", "made competitive tech accessible", "go-to budget rapid trigger recommendation"]
  },
  "DrunkDeer G65": {
    text: "The DrunkDeer G65 takes the brand's value-oriented approach to the compact 65% form factor, delivering hall-effect switches with rapid trigger in the layout preferred by competitive FPS players. At its aggressive price point, the G65 competes directly with keyboards costing two to three times as much on pure competitive features. It's particularly popular among aspiring competitive players who can't justify Wooting or Razer pricing.",
    highlights: ["value-oriented 65% hall-effect", "competes with keyboards 2-3x its price", "popular among aspiring competitive players"]
  },
  "Akko MOD007B-HE": {
    text: "The Akko MOD007B-HE brings Akko's renowned value proposition to the hall-effect keyboard segment. Featuring Akko's Cream Yellow magnetic switches in a 75% gasket-mounted layout with adjustable actuation and rapid trigger, it offers an impressive feature set at an aggressive price. Akko's colorful keycap designs and multiple colorway options give it a visual identity distinct from the more austere gaming brands.",
    highlights: ["Akko's value proposition in hall-effect", "Cream Yellow magnetic switches", "distinctive colorful design identity"]
  },
  "CIDOO V75 HE": {
    text: "The CIDOO V75 HE may be the most remarkable value in the rapid trigger keyboard market, delivering hall-effect magnetic switches with adjustable actuation and rapid trigger in a 75% gasket-mounted layout for a price that seems almost impossible. Originally popular in the Chinese domestic market, the V75 HE gained international attention when budget-focused content creators discovered it offered 90% of the Wooting experience at a fraction of the cost. Build quality is acceptable rather than premium, but for pure competitive feature parity, the value proposition is unmatched.",
    highlights: ["most remarkable value in rapid trigger market", "90% of Wooting experience at fraction of cost", "gasket-mount hall-effect at budget price"]
  },
  "Meletrix Boog75 HE": {
    text: "The Meletrix Boog75 HE is a boutique 75% hall-effect keyboard from the enthusiast-focused Meletrix brand. Featuring Gateron magnetic switches in a premium aluminum case with gasket mounting, it targets the intersection of keyboard enthusiasts and competitive gamers. The refined acoustics, quality stabilizers, and attention to build detail set it apart from mass-market rapid trigger options.",
    highlights: ["boutique 75% hall-effect keyboard", "premium aluminum gasket-mount", "targets enthusiasts and competitive gamers"]
  },
  "NuPhy Halo75 V2": {
    text: "The NuPhy Halo75 V2 is a 75% wireless mechanical keyboard known for its distinctive low-profile design and excellent Bluetooth connectivity. While it uses traditional mechanical switches without rapid trigger, NuPhy's focus on aesthetics, portability, and typing experience has earned it a following among content creators and casual competitive players. The Halo75 V2 represents the premium mechanical keyboard alternative for those who prioritize feel over bleeding-edge competitive features.",
    highlights: ["distinctive low-profile 75% design", "excellent wireless connectivity", "premium mechanical alternative"]
  },
  "Corsair K70 Pro Mini": {
    text: "The Corsair K70 Pro Mini is a 60% keyboard with Cherry MX Speed switches and Corsair's Axon processing for 8KHz polling rate. While it lacks hall-effect switches and rapid trigger, the Cherry MX Speed's low actuation point (1.0mm) makes it one of the fastest traditional mechanical keyboards available. The iCUE integration and premium build quality maintain Corsair's reputation for polished products.",
    highlights: ["60% with Cherry MX Speed switches", "8KHz polling rate via Axon processing", "fastest traditional mechanical option"]
  },
  "Corsair K100 Air": {
    text: "The Corsair K100 Air is a full-size ultra-low-profile wireless keyboard with Cherry MX Ultra Low Profile switches. At just 11mm in height, it's the thinnest full-size mechanical keyboard available. While not targeting competitive FPS, its unique form factor and Corsair's comprehensive software suite make it interesting for players who prefer low-profile key travel.",
    highlights: ["ultra-low-profile at 11mm height", "Cherry MX Ultra Low Profile switches", "thinnest full-size mechanical keyboard"]
  },
  "Logitech G715": {
    text: "The Logitech G715 is a wireless 75% keyboard with GX mechanical switches, Lightspeed wireless, and a distinctive cloud-shaped palm rest. It targets a more casual gaming audience with its playful design language, but the wireless performance is top-tier thanks to Logitech's Lightspeed technology. Some MOBA pros use it for its wireless reliability and comfortable typing experience.",
    highlights: ["wireless 75% with Lightspeed", "distinctive cloud palm rest design", "top-tier wireless performance"]
  },
  "Razer Huntsman Mini": {
    text: "The Razer Huntsman Mini is a 60% keyboard with Razer's first-generation optical switches. Compact, clean, and reliable — it was many FPS pros' first optical keyboard before rapid trigger became the competitive standard. The linear optical switches deliver fast actuation but lack the adjustable actuation and rapid trigger of the V3 Pro generation. Still seen at tournaments among players who haven't upgraded.",
    highlights: ["60% with first-gen Razer optical", "many pros' first optical keyboard", "still seen at tournaments"]
  },
  "Razer BlackWidow V4 75%": {
    text: "The Razer BlackWidow V4 75% brings the legendary BlackWidow name to a compact layout with Razer's Orange Tactile mechanical switches, hot-swappable PCB, and an integrated command dial. While it uses traditional mechanical rather than optical or hall-effect switches, the BlackWidow heritage carries weight. It's positioned more for general gaming and productivity than pure competitive FPS.",
    highlights: ["legendary BlackWidow in 75% layout", "Razer Orange Tactile mechanical switches", "general gaming and productivity focus"]
  },
  "Ducky One 3 TKL": {
    text: "The Ducky One 3 TKL is the tenkeyless variant in Ducky's acclaimed One 3 series, featuring hot-swappable Cherry MX switches, PBT double-shot keycaps, and Ducky's signature build quality. The TKL layout has long been the esports standard before 60% gained popularity, and many veteran players still prefer it. Ducky's cult following in the keyboard community ensures continued relevance even in the hall-effect era.",
    highlights: ["hot-swappable Cherry MX TKL", "PBT double-shot keycaps", "cult following in keyboard community"]
  },
  "Cherry MX Board 8.0 TKL": {
    text: "The Cherry MX Board 8.0 TKL is Cherry's own showcase TKL keyboard featuring their MX Low Profile switches. Cherry may have invented the modern mechanical switch, but their own keyboards have often been overshadowed by third-party manufacturers using Cherry switches. The 8.0 TKL represents Cherry's attempt to reclaim keyboard design with a slim, elegant profile and the reliability that only the original switch manufacturer can guarantee.",
    highlights: ["Cherry's own showcase keyboard", "MX Low Profile switches", "the original switch manufacturer's design"]
  },
  "HyperX Alloy Rise 75": {
    text: "The HyperX Alloy Rise 75 is a gasket-mounted 75% keyboard with hot-swappable mechanical switches. It represents HyperX's response to the enthusiast keyboard movement, featuring sound-dampening foam, premium PBT keycaps, and a rotary knob. While it lacks hall-effect switches, the build quality and acoustic tuning are impressive for a major gaming brand keyboard.",
    highlights: ["gasket-mounted 75% with hot-swap", "sound-dampening foam and PBT keycaps", "HyperX's enthusiast keyboard response"]
  },
  "ASUS ROG Strix Scope II 96": {
    text: "The ASUS ROG Strix Scope II 96 is a 96% layout keyboard that offers near-full-size functionality in a more compact footprint. Featuring ROG NX mechanical switches, pre-lubed stabilizers, and sound-dampening foam, it targets gamers who need the full key complement in less space. The unique 96% layout is rare in esports but practical for versatile gaming setups.",
    highlights: ["96% layout for compact full-size", "ROG NX mechanical switches", "practical for versatile gaming setups"]
  },
  "Keychron Q0 HE": {
    text: "The Keychron Q0 HE is a 60% hall-effect keyboard in Keychron's premium Q series, featuring a CNC aluminum case, gasket mounting, and Gateron Double-Rail magnetic switches with rapid trigger. The compact layout targets competitive FPS players, and Keychron's proven build quality makes it a strong value proposition in the 60% hall-effect segment.",
    highlights: ["60% hall-effect in premium Q series", "CNC aluminum with gasket mount", "strong value in 60% hall-effect segment"]
  },
  "Glorious GMMK 3": {
    text: "The Glorious GMMK 3 is the full-size version of Glorious's GMMK 3 platform, featuring Fox magnetic switches with rapid trigger in a 100% layout. It's one of the few full-size keyboards with hall-effect rapid trigger support, making it unique in a market dominated by compact layouts. For players who need a numpad with rapid trigger, options are limited, and the GMMK 3 fills that niche.",
    highlights: ["full-size with Fox magnetic rapid trigger", "one of few full-size hall-effect options", "fills the numpad rapid trigger niche"]
  },
  "Akko 5075B Plus HE": {
    text: "The Akko 5075B Plus HE is a wireless 75% hall-effect keyboard offering triple-mode connectivity, Akko magnetic switches, and rapid trigger at an ultra-competitive price point. The gasket-mounted design with sound dampening delivers solid acoustics, and Akko's extensive colorway options make it one of the most visually customizable hall-effect boards available.",
    highlights: ["wireless 75% hall-effect at ultra-competitive price", "triple-mode connectivity", "extensive colorway options"]
  },
  "Wooting 80HE Frost": {
    text: "The Wooting 80HE Frost is a special translucent colorway variant of the Wooting 80HE, featuring a frosted semi-transparent case that showcases the internal PCB and RGB lighting. Functionally identical to the standard 80HE with the same Lekker switches, rapid trigger, and analog input, the Frost edition adds collector appeal and visual distinction. Limited-edition Wooting drops have become cultural events in the keyboard community.",
    highlights: ["translucent special edition of 80HE", "frosted case showcases internals", "limited-edition drops are cultural events"]
  },
};
"""

# ═══════════════════════════════════════════════════════════════
# 5. BRAND_IMAGE_URLS — keyboard brands
# ═══════════════════════════════════════════════════════════════
BRAND_IMAGE_URLS = """export const BRAND_IMAGE_URLS = {
  "Wooting": "/images/brands/wooting.png",
  "Razer": "/images/brands/razer.png",
  "Logitech": "/images/brands/logitech.png",
  "SteelSeries": "/images/brands/steelseries.png",
  "Corsair": "/images/brands/corsair.png",
  "HyperX": "/images/brands/hyperx.png",
  "Ducky": "/images/brands/ducky.png",
  "Cherry": "/images/brands/cherry.png",
  "Endgame Gear": "/images/brands/endgame.png",
  "ASUS": "/images/brands/asus.png",
  "Keychron": "/images/brands/keychron.png",
  "Glorious": "/images/brands/glorious.png",
  "DrunkDeer": "/images/brands/drunkdeer.png",
  "Akko": "/images/brands/akko.png",
  "NuPhy": "/images/brands/nuphy.png",
  "Meletrix": "/images/brands/meletrix.png",
  "CIDOO": "/images/brands/cidoo.png",
};
"""

# ═══════════════════════════════════════════════════════════════
# 6. GAME_DESCRIPTIONS — rewritten for keyboard context
# ═══════════════════════════════════════════════════════════════
GAME_DESCRIPTIONS = r"""export const GAME_DESCRIPTIONS = {
  "CS2": "Counter-Strike 2 has been completely transformed by the rapid trigger revolution. The Wooting 60HE dominates with an estimated 50% usage among professional CS2 players, as its rapid trigger technology enables counter-strafing techniques that are physically impossible on traditional mechanical keyboards. The ability to set actuation points as low as 0.1mm means players can register key presses and releases with unprecedented speed, directly translating to faster movement stops and first-shot accuracy. Razer's Huntsman V3 Pro Mini has emerged as the main challenger at roughly 20%, driven by Razer's extensive sponsorship portfolio in CS2. SteelSeries Apex Pro variants account for about 10%, while legacy mechanical keyboards — primarily Logitech G Pro X, HyperX Alloy Origins, and Ducky One 3 — still make up the remaining 20% among players who haven't yet switched to hall-effect technology. The competitive advantage of rapid trigger in CS2 is so significant that tournament organizers have debated whether to standardize keyboard technology.",
  "Valorant": "Valorant's keyboard landscape closely mirrors CS2, with rapid trigger keyboards dominating for the same fundamental reason: faster counter-strafing and movement precision. The Wooting 60HE leads at approximately 45% pro usage, slightly below CS2 because Valorant's agent abilities create scenarios where raw movement mechanics are somewhat less dominant than in pure Counter-Strike gunplay. Razer's Huntsman V3 Pro Mini sits at roughly 22%, benefiting from Razer's massive Valorant sponsorship presence through teams like Sentinels and LOUD. The 60% layout is overwhelmingly preferred — with tight desk setups at LAN events, compact keyboards are essential for the low-sensitivity aim styles most Valorant pros employ. Legacy mechanical keyboards still appear at about 18% usage, but the transition to rapid trigger has been faster in Valorant than almost any other title.",
  "League of Legends": "League of Legends presents a fundamentally different keyboard picture than FPS titles because rapid trigger technology offers minimal competitive advantage in a MOBA. Key presses in League are deliberate ability activations, not the rapid tap-release-tap movement patterns that make rapid trigger transformative in FPS games. As a result, the keyboard market is far more fragmented: Logitech G Pro X TKL leads at about 18%, followed by Razer Huntsman V2 TKL at 15%, HyperX Alloy Origins at 12%, and SteelSeries Apex Pro at 10%. The remaining 45% is scattered across dozens of brands including Ducky, Cherry, Corsair, and various Korean domestic brands. Comfort, reliability, and key feel matter far more than actuation speed. Many Korean LCK pros use team-issued keyboards, which skews brand representation. TKL and 75% layouts are more common than in FPS, as League players don't need the extreme desk space that low-sensitivity FPS aiming demands.",
  "Fortnite": "Fortnite's unique building mechanics make it one of the most keyboard-intensive esports titles, and rapid trigger has had an enormous impact on competitive building speed. The ability to rapidly re-actuate keys for building and editing sequences — where a single wall-edit-reset combo might involve 6-8 keystrokes in under a second — means rapid trigger keyboards provide a measurable competitive edge. The Wooting 60HE leads at roughly 40%, with the Razer Huntsman V3 Pro Mini at 25%. Fortnite's younger player demographic has made the DrunkDeer A75 surprisingly popular at about 8%, as budget-conscious competitive players seek rapid trigger at accessible prices. Full-size keyboards are virtually nonexistent in competitive Fortnite — the extreme mouse movement required for building demands maximum desk space.",
  "Dota 2": "Dota 2's keyboard preferences are the most diverse and least technology-driven of any major esports title. Like League of Legends, rapid trigger provides negligible competitive advantage in a MOBA, so keyboard choice is driven almost entirely by personal comfort, brand loyalty, and sponsor deals. The market is extremely fragmented with no single keyboard exceeding 10% usage. Razer, Logitech, SteelSeries, and HyperX each command roughly 15-20% brand share, with the remaining 30% spread across Ducky, Cherry, Corsair, and regional brands popular in CIS and Chinese pro scenes. Many Dota 2 professionals use keyboards that would be considered 'outdated' by FPS standards — some veterans still compete on membrane keyboards, and mechanical switch preferences vary wildly from player to player. Full-size keyboards are more common in Dota 2 than any other esport, as numpad hotkeys are used by some players for item activation and control group management.",
  "R6 Siege": "Rainbow Six Siege occupies an interesting middle ground in the keyboard landscape. The game's deliberate, angle-holding gameplay means rapid trigger is less transformative than in CS2 or Valorant, but the lean-strafe mechanics do benefit from faster key response. The Wooting 60HE has reached about 30% usage among R6 pros — significant but below FPS titles where movement is more central. Razer Huntsman variants account for about 25%, and traditional mechanical keyboards still make up roughly 40% of the pro scene. R6's smaller pro scene and less aggressive sponsor pressure means players have more freedom to use their preferred keyboards.",
  "Overwatch 2": "Overwatch 2's hero-based gameplay creates varied keyboard demands across roles. DPS players benefit most from rapid trigger for strafing and aim duels, while tank and support players prioritize ability key feel and comfort over actuation speed. The Wooting 60HE leads at about 35%, followed by Razer Huntsman variants at 25% and Logitech G Pro X at 15%. The former OWL sponsorship ecosystem left a strong Logitech legacy presence. The diverse hero roster means keyboard preferences can vary significantly even within a single team.",
  "Apex": "Apex Legends' movement-heavy gameplay makes rapid trigger valuable for techniques like tap-strafing, bunny-hopping, and superglide inputs that require precise key timing. The Wooting 60HE leads at roughly 35% among tracked Apex pros, with Razer Huntsman at 20% and SteelSeries Apex Pro at 10%. The game's controller-versus-keyboard debate means the keyboard pro scene is smaller than pure FPS titles, but among keyboard players, the shift toward rapid trigger has been swift. Apex's advanced movement tech community has been particularly enthusiastic about the possibilities that analog input and rapid trigger enable.",
  "Call of Duty": "Call of Duty's competitive keyboard landscape is heavily influenced by the fact that most professional CoD is played on controller, with mouse-and-keyboard being the exception rather than the rule. Among the keyboard players who do compete, Razer dominates through sponsorship deals, with Huntsman variants accounting for about 60% of usage. The faster pace of CoD means rapid trigger keyboards are beneficial, but the controller-dominant meta means the keyboard segment is too small for meaningful brand competition.",
  "PUBG": "PUBG's keyboard market reflects a player base that largely settled on their gear during the game's 2017-2019 golden era. Traditional mechanical keyboards — particularly Logitech G Pro X and older Razer Huntsman models — still make up over 60% of professional usage, the highest legacy keyboard percentage of any FPS title. Rapid trigger adoption has been slower in PUBG than in any other competitive shooter, partly because the game's positioning-focused gameplay rewards patience over rapid movement, and partly because the established pro scene has been resistant to peripheral changes.",
  "Rocket League": "Rocket League's keyboard data is limited because the overwhelming majority of professional players use controllers. Among the rare keyboard-and-mouse Rocket League competitors, standard mechanical keyboards are the norm since rapid trigger offers no meaningful advantage for car-based gameplay. The game remains one of the few major esports where keyboard choice is essentially irrelevant to competitive performance.",
  "Marvel Rivals": "As a newer hero shooter, Marvel Rivals' keyboard landscape is still forming but already shows strong rapid trigger adoption. The Wooting 60HE leads at about 30%, with Razer and Logitech splitting most of the remainder. Early competitive players are largely migrating from Overwatch 2 and Valorant, bringing their existing rapid trigger setups with them. The game's fast-paced ability usage and movement mechanics suggest rapid trigger will remain important as the competitive scene matures.",
  "Deadlock": "Valve's Deadlock shows an early-adopter keyboard landscape dominated by rapid trigger, with the Wooting 60HE at approximately 45% and Razer Huntsman V3 Pro at 30%. As a competitive Valve title attracting CS2 and Dota 2 veterans, the keyboard preferences reflect the CS2 rapid trigger meta. The hybrid MOBA-shooter gameplay means both movement precision and ability activation matter, making rapid trigger keyboards a natural fit.",
  "Quake Champions": "Quake Champions has one of the most traditional keyboard landscapes in esports, with many veteran players using mechanical keyboards they've owned for years. Cherry MX and older mechanical switches dominate, and rapid trigger adoption is minimal. The game's small but dedicated pro scene includes players who have been competing since the 1990s, and changing peripherals after 20+ years of muscle memory is a non-trivial proposition.",
};
"""

# ═══════════════════════════════════════════════════════════════
# 7. keyboards array — the core product data
# ═══════════════════════════════════════════════════════════════
KEYBOARDS = """export const keyboards = [
  { id: 1, name: "Wooting 60HE", brand: "Wooting", weight: 600, switchType: "Lekker (Hall Effect)", layout: "60%", actuationPoint: 0.1, rapidTrigger: true, pollingRate: 1000, connectivity: "Wired", price: 175, proUsage: 32, rating: 9.8, image: "bolt", color: "#e84393", keycaps: "PBT", hotSwap: true, cable: "USB-C", releaseYear: 2023, adjustableActuation: true, magneticSwitches: true },
  { id: 2, name: "Wooting 60HE+", brand: "Wooting", weight: 620, switchType: "Lekker V2 (Hall Effect)", layout: "60%", actuationPoint: 0.1, rapidTrigger: true, pollingRate: 1000, connectivity: "Wired", price: 195, proUsage: 12, rating: 9.9, image: "bolt", color: "#e84393", keycaps: "PBT", hotSwap: true, cable: "USB-C", releaseYear: 2024, adjustableActuation: true, magneticSwitches: true },
  { id: 3, name: "Wooting 80HE", brand: "Wooting", weight: 850, switchType: "Lekker (Hall Effect)", layout: "75%", actuationPoint: 0.1, rapidTrigger: true, pollingRate: 1000, connectivity: "Wired", price: 200, proUsage: 5, rating: 9.6, image: "bolt", color: "#e84393", keycaps: "PBT", hotSwap: true, cable: "USB-C", releaseYear: 2024, adjustableActuation: true, magneticSwitches: true },
  { id: 4, name: "Wooting UwU", brand: "Wooting", weight: 780, switchType: "Lekker V2 (Hall Effect)", layout: "60%", actuationPoint: 0.1, rapidTrigger: true, pollingRate: 1000, connectivity: "Wired", price: 250, proUsage: 3, rating: 9.7, image: "bolt", color: "#e84393", keycaps: "PBT", hotSwap: true, cable: "USB-C", releaseYear: 2024, adjustableActuation: true, magneticSwitches: true },
  { id: 5, name: "Razer Huntsman V3 Pro", brand: "Razer", weight: 845, switchType: "Razer Analog Optical Gen-2", layout: "TKL", actuationPoint: 0.1, rapidTrigger: true, pollingRate: 8000, connectivity: "Wired", price: 250, proUsage: 5, rating: 9.5, image: "viper", color: "#00ff6a", keycaps: "Doubleshot PBT", hotSwap: false, cable: "USB-C", releaseYear: 2024, adjustableActuation: true, magneticSwitches: false },
  { id: 6, name: "Razer Huntsman V3 Pro Mini", brand: "Razer", weight: 590, switchType: "Razer Analog Optical Gen-2", layout: "60%", actuationPoint: 0.1, rapidTrigger: true, pollingRate: 8000, connectivity: "Wired", price: 230, proUsage: 10, rating: 9.5, image: "viper", color: "#00ff6a", keycaps: "Doubleshot PBT", hotSwap: false, cable: "USB-C", releaseYear: 2024, adjustableActuation: true, magneticSwitches: false },
  { id: 7, name: "Razer Huntsman V3 Pro TKL", brand: "Razer", weight: 840, switchType: "Razer Analog Optical Gen-2", layout: "TKL", actuationPoint: 0.1, rapidTrigger: true, pollingRate: 8000, connectivity: "Wired", price: 250, proUsage: 3, rating: 9.4, image: "viper", color: "#00ff6a", keycaps: "Doubleshot PBT", hotSwap: false, cable: "USB-C", releaseYear: 2024, adjustableActuation: true, magneticSwitches: false },
  { id: 8, name: "Razer Huntsman V2 TKL", brand: "Razer", weight: 745, switchType: "Razer Optical (Gen-1)", layout: "TKL", actuationPoint: 1.2, rapidTrigger: false, pollingRate: 1000, connectivity: "Wired", price: 160, proUsage: 4, rating: 8.8, image: "viper", color: "#00ff6a", keycaps: "Doubleshot PBT", hotSwap: false, cable: "USB-C", releaseYear: 2021, adjustableActuation: false, magneticSwitches: false },
  { id: 9, name: "Razer Huntsman Mini", brand: "Razer", weight: 520, switchType: "Razer Optical (Gen-1)", layout: "60%", actuationPoint: 1.0, rapidTrigger: false, pollingRate: 1000, connectivity: "Wired", price: 120, proUsage: 2, rating: 8.5, image: "viper", color: "#00ff6a", keycaps: "Doubleshot PBT", hotSwap: false, cable: "USB-C", releaseYear: 2020, adjustableActuation: false, magneticSwitches: false },
  { id: 10, name: "Razer BlackWidow V4 75%", brand: "Razer", weight: 870, switchType: "Razer Orange Tactile", layout: "75%", actuationPoint: 1.9, rapidTrigger: false, pollingRate: 1000, connectivity: "Wired", price: 190, proUsage: 1, rating: 8.6, image: "viper", color: "#00ff6a", keycaps: "Doubleshot ABS", hotSwap: true, cable: "USB-C", releaseYear: 2024, adjustableActuation: false, magneticSwitches: false },
  { id: 11, name: "SteelSeries Apex Pro TKL (2024)", brand: "SteelSeries", weight: 780, switchType: "OmniPoint 3.0 (Hall Effect)", layout: "TKL", actuationPoint: 0.1, rapidTrigger: true, pollingRate: 8000, connectivity: "Wired", price: 190, proUsage: 4, rating: 9.3, image: "wing", color: "#ff8c00", keycaps: "PBT", hotSwap: false, cable: "USB-C", releaseYear: 2024, adjustableActuation: true, magneticSwitches: true },
  { id: 12, name: "SteelSeries Apex Pro Mini", brand: "SteelSeries", weight: 540, switchType: "OmniPoint 2.0 (Hall Effect)", layout: "60%", actuationPoint: 0.2, rapidTrigger: true, pollingRate: 1000, connectivity: "Wired", price: 180, proUsage: 3, rating: 9.1, image: "wing", color: "#ff8c00", keycaps: "PBT", hotSwap: false, cable: "USB-C", releaseYear: 2023, adjustableActuation: true, magneticSwitches: true },
  { id: 13, name: "SteelSeries Apex Pro (2024)", brand: "SteelSeries", weight: 1040, switchType: "OmniPoint 3.0 (Hall Effect)", layout: "Full", actuationPoint: 0.1, rapidTrigger: true, pollingRate: 8000, connectivity: "Wired", price: 200, proUsage: 1, rating: 9.2, image: "wing", color: "#ff8c00", keycaps: "PBT", hotSwap: false, cable: "USB-C", releaseYear: 2024, adjustableActuation: true, magneticSwitches: true },
  { id: 14, name: "SteelSeries Apex 9 TKL", brand: "SteelSeries", weight: 730, switchType: "SteelSeries Optical", layout: "TKL", actuationPoint: 1.0, rapidTrigger: false, pollingRate: 1000, connectivity: "Wired", price: 120, proUsage: 1, rating: 8.4, image: "wing", color: "#ff8c00", keycaps: "ABS", hotSwap: true, cable: "USB-C", releaseYear: 2023, adjustableActuation: false, magneticSwitches: false },
  { id: 15, name: "Logitech G Pro X TKL", brand: "Logitech", weight: 810, switchType: "GX Mechanical", layout: "TKL", actuationPoint: 1.5, rapidTrigger: false, pollingRate: 1000, connectivity: "Wireless", price: 200, proUsage: 3, rating: 8.9, image: "crosshair", color: "#00b4ff", keycaps: "PBT", hotSwap: true, cable: "USB-C", releaseYear: 2024, adjustableActuation: false, magneticSwitches: false },
  { id: 16, name: "Logitech G Pro X 60", brand: "Logitech", weight: 620, switchType: "GX2 Optical-Mechanical", layout: "60%", actuationPoint: 1.3, rapidTrigger: false, pollingRate: 1000, connectivity: "Wireless", price: 180, proUsage: 2, rating: 8.7, image: "crosshair", color: "#00b4ff", keycaps: "PBT", hotSwap: false, cable: "USB-C", releaseYear: 2024, adjustableActuation: false, magneticSwitches: false },
  { id: 17, name: "Logitech G915 TKL", brand: "Logitech", weight: 710, switchType: "GL Low Profile", layout: "TKL", actuationPoint: 1.5, rapidTrigger: false, pollingRate: 1000, connectivity: "Wireless", price: 230, proUsage: 1, rating: 8.6, image: "crosshair", color: "#00b4ff", keycaps: "ABS", hotSwap: false, cable: "USB-C", releaseYear: 2020, adjustableActuation: false, magneticSwitches: false },
  { id: 18, name: "Logitech G715", brand: "Logitech", weight: 975, switchType: "GX Mechanical", layout: "75%", actuationPoint: 1.5, rapidTrigger: false, pollingRate: 1000, connectivity: "Wireless", price: 200, proUsage: 1, rating: 8.5, image: "crosshair", color: "#00b4ff", keycaps: "PBT", hotSwap: true, cable: "USB-C", releaseYear: 2023, adjustableActuation: false, magneticSwitches: false },
  { id: 19, name: "Corsair K65 Plus", brand: "Corsair", weight: 830, switchType: "Corsair MLX Red V2", layout: "75%", actuationPoint: 1.2, rapidTrigger: false, pollingRate: 8000, connectivity: "Wired", price: 160, proUsage: 1, rating: 8.7, image: "anchor", color: "#ffd700", keycaps: "PBT", hotSwap: true, cable: "USB-C", releaseYear: 2024, adjustableActuation: false, magneticSwitches: false },
  { id: 20, name: "Corsair K70 Max", brand: "Corsair", weight: 1150, switchType: "Corsair MGX (Hall Effect)", layout: "Full", actuationPoint: 0.4, rapidTrigger: true, pollingRate: 8000, connectivity: "Wired", price: 230, proUsage: 1, rating: 9.0, image: "anchor", color: "#ffd700", keycaps: "PBT", hotSwap: false, cable: "USB-C", releaseYear: 2024, adjustableActuation: true, magneticSwitches: true },
  { id: 21, name: "Corsair K70 Pro Mini", brand: "Corsair", weight: 620, switchType: "Cherry MX Speed", layout: "60%", actuationPoint: 1.0, rapidTrigger: false, pollingRate: 8000, connectivity: "Wired", price: 180, proUsage: 1, rating: 8.5, image: "anchor", color: "#ffd700", keycaps: "PBT", hotSwap: true, cable: "USB-C", releaseYear: 2023, adjustableActuation: false, magneticSwitches: false },
  { id: 22, name: "Corsair K100 Air", brand: "Corsair", weight: 630, switchType: "Cherry MX ULP", layout: "Full", actuationPoint: 1.2, rapidTrigger: false, pollingRate: 1000, connectivity: "Wireless", price: 280, proUsage: 0, rating: 8.3, image: "anchor", color: "#ffd700", keycaps: "ABS", hotSwap: false, cable: "USB-C", releaseYear: 2023, adjustableActuation: false, magneticSwitches: false },
  { id: 23, name: "HyperX Alloy Origins 65", brand: "HyperX", weight: 750, switchType: "HyperX Red Mechanical", layout: "65%", actuationPoint: 1.8, rapidTrigger: false, pollingRate: 1000, connectivity: "Wired", price: 90, proUsage: 2, rating: 8.5, image: "bolt", color: "#ff4500", keycaps: "PBT", hotSwap: false, cable: "USB-C", releaseYear: 2023, adjustableActuation: false, magneticSwitches: false },
  { id: 24, name: "HyperX Alloy Origins Core", brand: "HyperX", weight: 900, switchType: "HyperX Red Mechanical", layout: "TKL", actuationPoint: 1.8, rapidTrigger: false, pollingRate: 1000, connectivity: "Wired", price: 90, proUsage: 2, rating: 8.4, image: "bolt", color: "#ff4500", keycaps: "ABS", hotSwap: false, cable: "USB-C", releaseYear: 2020, adjustableActuation: false, magneticSwitches: false },
  { id: 25, name: "HyperX Alloy Rise 75", brand: "HyperX", weight: 890, switchType: "HyperX Red Mechanical", layout: "75%", actuationPoint: 1.8, rapidTrigger: false, pollingRate: 1000, connectivity: "Wired", price: 130, proUsage: 1, rating: 8.6, image: "bolt", color: "#ff4500", keycaps: "PBT", hotSwap: true, cable: "USB-C", releaseYear: 2024, adjustableActuation: false, magneticSwitches: false },
  { id: 26, name: "Ducky One 3 SF", brand: "Ducky", weight: 670, switchType: "Cherry MX Red", layout: "65%", actuationPoint: 2.0, rapidTrigger: false, pollingRate: 1000, connectivity: "Wired", price: 120, proUsage: 2, rating: 8.8, image: "star", color: "#f472b6", keycaps: "PBT Doubleshot", hotSwap: true, cable: "USB-C", releaseYear: 2023, adjustableActuation: false, magneticSwitches: false },
  { id: 27, name: "Ducky One 3 TKL", brand: "Ducky", weight: 830, switchType: "Cherry MX Red", layout: "TKL", actuationPoint: 2.0, rapidTrigger: false, pollingRate: 1000, connectivity: "Wired", price: 130, proUsage: 1, rating: 8.7, image: "star", color: "#f472b6", keycaps: "PBT Doubleshot", hotSwap: true, cable: "USB-C", releaseYear: 2023, adjustableActuation: false, magneticSwitches: false },
  { id: 28, name: "Ducky One 3 Mini", brand: "Ducky", weight: 590, switchType: "Cherry MX Red", layout: "60%", actuationPoint: 2.0, rapidTrigger: false, pollingRate: 1000, connectivity: "Wired", price: 110, proUsage: 1, rating: 8.6, image: "star", color: "#f472b6", keycaps: "PBT Doubleshot", hotSwap: true, cable: "USB-C", releaseYear: 2023, adjustableActuation: false, magneticSwitches: false },
  { id: 29, name: "Cherry XTRFY K5V2", brand: "Cherry", weight: 720, switchType: "Cherry MX2A Red", layout: "65%", actuationPoint: 2.0, rapidTrigger: false, pollingRate: 1000, connectivity: "Wired", price: 140, proUsage: 1, rating: 8.5, image: "shield", color: "#e11d48", keycaps: "PBT", hotSwap: true, cable: "USB-C", releaseYear: 2024, adjustableActuation: false, magneticSwitches: false },
  { id: 30, name: "Cherry MX Board 8.0 TKL", brand: "Cherry", weight: 680, switchType: "Cherry MX Low Profile", layout: "TKL", actuationPoint: 1.2, rapidTrigger: false, pollingRate: 1000, connectivity: "Wired", price: 170, proUsage: 0, rating: 8.2, image: "shield", color: "#e11d48", keycaps: "PBT", hotSwap: false, cable: "USB-C", releaseYear: 2022, adjustableActuation: false, magneticSwitches: false },
  { id: 31, name: "Endgame Gear KB65HE", brand: "Endgame Gear", weight: 700, switchType: "Hall Effect Magnetic", layout: "65%", actuationPoint: 0.1, rapidTrigger: true, pollingRate: 1000, connectivity: "Wired", price: 140, proUsage: 2, rating: 9.1, image: "crosshair", color: "#8b5cf6", keycaps: "PBT", hotSwap: true, cable: "USB-C", releaseYear: 2024, adjustableActuation: true, magneticSwitches: true },
  { id: 32, name: "ASUS ROG Azoth Extreme", brand: "ASUS", weight: 1100, switchType: "ROG NX Snow (Hall Effect)", layout: "75%", actuationPoint: 0.1, rapidTrigger: true, pollingRate: 8000, connectivity: "Wireless", price: 350, proUsage: 1, rating: 9.4, image: "shield", color: "#e11d48", keycaps: "PBT Doubleshot", hotSwap: true, cable: "USB-C", releaseYear: 2024, adjustableActuation: true, magneticSwitches: true },
  { id: 33, name: "ASUS ROG Falchion Ace HFX", brand: "ASUS", weight: 680, switchType: "ROG NX HFX (Hall Effect)", layout: "65%", actuationPoint: 0.1, rapidTrigger: true, pollingRate: 1000, connectivity: "Wired", price: 160, proUsage: 1, rating: 9.0, image: "shield", color: "#e11d48", keycaps: "PBT", hotSwap: true, cable: "USB-C", releaseYear: 2024, adjustableActuation: true, magneticSwitches: true },
  { id: 34, name: "ASUS ROG Strix Scope II 96", brand: "ASUS", weight: 1050, switchType: "ROG NX Mechanical", layout: "96%", actuationPoint: 1.8, rapidTrigger: false, pollingRate: 1000, connectivity: "Wired", price: 130, proUsage: 0, rating: 8.4, image: "shield", color: "#e11d48", keycaps: "PBT", hotSwap: true, cable: "USB-C", releaseYear: 2024, adjustableActuation: false, magneticSwitches: false },
  { id: 35, name: "Keychron Q1 HE", brand: "Keychron", weight: 1650, switchType: "Gateron Double-Rail (Hall Effect)", layout: "75%", actuationPoint: 0.2, rapidTrigger: true, pollingRate: 1000, connectivity: "Wired", price: 200, proUsage: 1, rating: 9.2, image: "gear", color: "#10b981", keycaps: "PBT Doubleshot", hotSwap: true, cable: "USB-C", releaseYear: 2024, adjustableActuation: true, magneticSwitches: true },
  { id: 36, name: "Keychron K2 HE", brand: "Keychron", weight: 750, switchType: "Gateron Magnetic (Hall Effect)", layout: "75%", actuationPoint: 0.2, rapidTrigger: true, pollingRate: 1000, connectivity: "Wireless", price: 110, proUsage: 1, rating: 8.9, image: "gear", color: "#10b981", keycaps: "PBT", hotSwap: true, cable: "USB-C", releaseYear: 2024, adjustableActuation: true, magneticSwitches: true },
  { id: 37, name: "Keychron Q0 HE", brand: "Keychron", weight: 1200, switchType: "Gateron Double-Rail (Hall Effect)", layout: "60%", actuationPoint: 0.2, rapidTrigger: true, pollingRate: 1000, connectivity: "Wired", price: 170, proUsage: 0, rating: 9.0, image: "gear", color: "#10b981", keycaps: "PBT Doubleshot", hotSwap: true, cable: "USB-C", releaseYear: 2025, adjustableActuation: true, magneticSwitches: true },
  { id: 38, name: "Glorious GMMK 3 Pro", brand: "Glorious", weight: 920, switchType: "Fox Magnetic (Hall Effect)", layout: "75%", actuationPoint: 0.1, rapidTrigger: true, pollingRate: 1000, connectivity: "Wired", price: 170, proUsage: 1, rating: 9.0, image: "star", color: "#c084fc", keycaps: "PBT", hotSwap: true, cable: "USB-C", releaseYear: 2024, adjustableActuation: true, magneticSwitches: true },
  { id: 39, name: "Glorious GMMK 3", brand: "Glorious", weight: 1200, switchType: "Fox Magnetic (Hall Effect)", layout: "Full", actuationPoint: 0.1, rapidTrigger: true, pollingRate: 1000, connectivity: "Wired", price: 200, proUsage: 0, rating: 8.8, image: "star", color: "#c084fc", keycaps: "PBT", hotSwap: true, cable: "USB-C", releaseYear: 2024, adjustableActuation: true, magneticSwitches: true },
  { id: 40, name: "DrunkDeer A75", brand: "DrunkDeer", weight: 800, switchType: "Magnetic (Hall Effect)", layout: "75%", actuationPoint: 0.4, rapidTrigger: true, pollingRate: 1000, connectivity: "Wired", price: 90, proUsage: 2, rating: 8.8, image: "bolt", color: "#06b6d4", keycaps: "PBT", hotSwap: true, cable: "USB-C", releaseYear: 2023, adjustableActuation: true, magneticSwitches: true },
  { id: 41, name: "DrunkDeer G65", brand: "DrunkDeer", weight: 680, switchType: "Magnetic (Hall Effect)", layout: "65%", actuationPoint: 0.4, rapidTrigger: true, pollingRate: 1000, connectivity: "Wired", price: 80, proUsage: 1, rating: 8.6, image: "bolt", color: "#06b6d4", keycaps: "PBT", hotSwap: true, cable: "USB-C", releaseYear: 2024, adjustableActuation: true, magneticSwitches: true },
  { id: 42, name: "Akko MOD007B-HE", brand: "Akko", weight: 1050, switchType: "Akko Cream Yellow (Hall Effect)", layout: "75%", actuationPoint: 0.3, rapidTrigger: true, pollingRate: 1000, connectivity: "Wireless", price: 130, proUsage: 0, rating: 8.7, image: "star", color: "#f59e0b", keycaps: "PBT Doubleshot", hotSwap: true, cable: "USB-C", releaseYear: 2024, adjustableActuation: true, magneticSwitches: true },
  { id: 43, name: "Akko 5075B Plus HE", brand: "Akko", weight: 900, switchType: "Akko Magnetic (Hall Effect)", layout: "75%", actuationPoint: 0.3, rapidTrigger: true, pollingRate: 1000, connectivity: "Wireless", price: 100, proUsage: 0, rating: 8.5, image: "star", color: "#f59e0b", keycaps: "PBT", hotSwap: true, cable: "USB-C", releaseYear: 2024, adjustableActuation: true, magneticSwitches: true },
  { id: 44, name: "NuPhy Halo75 V2", brand: "NuPhy", weight: 860, switchType: "NuPhy Mechanical", layout: "75%", actuationPoint: 1.5, rapidTrigger: false, pollingRate: 1000, connectivity: "Wireless", price: 130, proUsage: 0, rating: 8.6, image: "moon", color: "#3b82f6", keycaps: "PBT", hotSwap: true, cable: "USB-C", releaseYear: 2024, adjustableActuation: false, magneticSwitches: false },
  { id: 45, name: "Meletrix Boog75 HE", brand: "Meletrix", weight: 1050, switchType: "Gateron Magnetic (Hall Effect)", layout: "75%", actuationPoint: 0.2, rapidTrigger: true, pollingRate: 1000, connectivity: "Wired", price: 200, proUsage: 0, rating: 9.0, image: "star", color: "#a78bfa", keycaps: "PBT Doubleshot", hotSwap: true, cable: "USB-C", releaseYear: 2024, adjustableActuation: true, magneticSwitches: true },
  { id: 46, name: "CIDOO V75 HE", brand: "CIDOO", weight: 820, switchType: "Magnetic (Hall Effect)", layout: "75%", actuationPoint: 0.3, rapidTrigger: true, pollingRate: 1000, connectivity: "Wired", price: 60, proUsage: 0, rating: 8.3, image: "bolt", color: "#14b8a6", keycaps: "PBT", hotSwap: true, cable: "USB-C", releaseYear: 2024, adjustableActuation: true, magneticSwitches: true },
  { id: 47, name: "Wooting 80HE Frost", brand: "Wooting", weight: 860, switchType: "Lekker (Hall Effect)", layout: "75%", actuationPoint: 0.1, rapidTrigger: true, pollingRate: 1000, connectivity: "Wired", price: 210, proUsage: 1, rating: 9.6, image: "bolt", color: "#e84393", keycaps: "PBT", hotSwap: true, cable: "USB-C", releaseYear: 2024, adjustableActuation: true, magneticSwitches: true },
];
"""

# ═══════════════════════════════════════════════════════════════
# 8-13. Market share and trend data
# ═══════════════════════════════════════════════════════════════
BRAND_MARKET_SHARE = """export const brandMarketShare = [
  { name: "Wooting", share: 38, keyboards: 5, founded: 2015, hq: "Eindhoven, Netherlands" },
  { name: "Razer", share: 22, keyboards: 6, founded: 2005, hq: "San Francisco, USA" },
  { name: "SteelSeries", share: 10, keyboards: 4, founded: 2001, hq: "Copenhagen, Denmark" },
  { name: "Logitech", share: 8, keyboards: 4, founded: 1981, hq: "Lausanne, Switzerland" },
  { name: "HyperX", share: 5, keyboards: 3, founded: 2014, hq: "Fountain Valley, USA" },
  { name: "Ducky", share: 4, keyboards: 3, founded: 2008, hq: "Taipei, Taiwan" },
  { name: "Corsair", share: 3, keyboards: 4, founded: 1994, hq: "Milpitas, USA" },
  { name: "DrunkDeer", share: 3, keyboards: 2, founded: 2022, hq: "Shenzhen, China" },
  { name: "Endgame Gear", share: 2, keyboards: 1, founded: 2019, hq: "Hamburg, Germany" },
  { name: "ASUS", share: 2, keyboards: 3, founded: 1989, hq: "Taipei, Taiwan" },
  { name: "Keychron", share: 1, keyboards: 3, founded: 2017, hq: "Shenzhen, China" },
  { name: "Other", share: 2, keyboards: 10, founded: null, hq: null }
];
"""

GAME_BREAKDOWN = """export const gameBreakdown = [
  { game: "CS2", icon: "crosshair", players: 817, topKeyboards: [
    { name: "Wooting 60HE", pct: 35 }, { name: "Wooting 60HE+", pct: 15 }, { name: "Razer Huntsman V3 Pro Mini", pct: 12 }, { name: "SteelSeries Apex Pro TKL (2024)", pct: 6 }, { name: "Razer Huntsman V2 TKL", pct: 4 }],
    topBrands: [{ name: "Wooting", pct: 52 }, { name: "Razer", pct: 20 }, { name: "SteelSeries", pct: 10 }, { name: "Logitech", pct: 6 }],
    avgWeight: 650, avgEdpi: 859, wirelessPct: 5, avgDpi: 656, avgPollRate: 1715 },
  { game: "Valorant", icon: "crosshair", players: 566, topKeyboards: [
    { name: "Wooting 60HE", pct: 30 }, { name: "Razer Huntsman V3 Pro Mini", pct: 15 }, { name: "Wooting 60HE+", pct: 12 }, { name: "SteelSeries Apex Pro Mini", pct: 5 }, { name: "HyperX Alloy Origins 65", pct: 4 }],
    topBrands: [{ name: "Wooting", pct: 45 }, { name: "Razer", pct: 25 }, { name: "SteelSeries", pct: 10 }, { name: "HyperX", pct: 6 }],
    avgWeight: 640, avgEdpi: 252, wirelessPct: 3, avgDpi: 977, avgPollRate: 2011 },
  { game: "Fortnite", icon: "bolt", players: 262, topKeyboards: [
    { name: "Wooting 60HE", pct: 28 }, { name: "Razer Huntsman V3 Pro Mini", pct: 18 }, { name: "Wooting 60HE+", pct: 10 }, { name: "DrunkDeer A75", pct: 6 }, { name: "SteelSeries Apex Pro Mini", pct: 4 }],
    topBrands: [{ name: "Wooting", pct: 40 }, { name: "Razer", pct: 25 }, { name: "DrunkDeer", pct: 8 }, { name: "SteelSeries", pct: 7 }],
    avgWeight: 630, avgEdpi: null, wirelessPct: 2, avgDpi: 993, avgPollRate: 1000 },
  { game: "LoL", icon: "crown", players: 93, topKeyboards: [
    { name: "Logitech G Pro X TKL", pct: 18 }, { name: "Razer Huntsman V2 TKL", pct: 15 }, { name: "HyperX Alloy Origins Core", pct: 12 }, { name: "SteelSeries Apex Pro TKL (2024)", pct: 10 }, { name: "Ducky One 3 SF", pct: 6 }],
    topBrands: [{ name: "Logitech", pct: 22 }, { name: "Razer", pct: 20 }, { name: "HyperX", pct: 18 }, { name: "SteelSeries", pct: 15 }],
    avgWeight: 800, avgEdpi: null, wirelessPct: 15, avgDpi: 1443, avgPollRate: 1000 },
  { game: "R6 Siege", icon: "shield", players: 89, topKeyboards: [
    { name: "Wooting 60HE", pct: 20 }, { name: "Razer Huntsman V3 Pro Mini", pct: 15 }, { name: "SteelSeries Apex Pro TKL (2024)", pct: 8 }, { name: "Logitech G Pro X TKL", pct: 7 }, { name: "HyperX Alloy Origins 65", pct: 6 }],
    topBrands: [{ name: "Wooting", pct: 25 }, { name: "Razer", pct: 22 }, { name: "SteelSeries", pct: 15 }, { name: "Logitech", pct: 12 }],
    avgWeight: 680, avgEdpi: 163, wirelessPct: 5, avgDpi: 600, avgPollRate: 1500 },
  { game: "PUBG", icon: "crosshair", players: 61, topKeyboards: [
    { name: "Logitech G Pro X TKL", pct: 20 }, { name: "Razer Huntsman V2 TKL", pct: 15 }, { name: "Wooting 60HE", pct: 10 }, { name: "SteelSeries Apex Pro TKL (2024)", pct: 8 }, { name: "HyperX Alloy Origins Core", pct: 8 }],
    topBrands: [{ name: "Logitech", pct: 28 }, { name: "Razer", pct: 22 }, { name: "SteelSeries", pct: 15 }, { name: "HyperX", pct: 12 }],
    avgWeight: 780, avgEdpi: null, wirelessPct: 8, avgDpi: 720, avgPollRate: 1000 },
  { game: "Apex", icon: "fire", players: 56, topKeyboards: [
    { name: "Wooting 60HE", pct: 25 }, { name: "Razer Huntsman V3 Pro Mini", pct: 14 }, { name: "SteelSeries Apex Pro Mini", pct: 8 }, { name: "Logitech G Pro X TKL", pct: 6 }, { name: "Wooting 60HE+", pct: 5 }],
    topBrands: [{ name: "Wooting", pct: 33 }, { name: "Razer", pct: 22 }, { name: "SteelSeries", pct: 15 }, { name: "Logitech", pct: 10 }],
    avgWeight: 660, avgEdpi: 1274, wirelessPct: 4, avgDpi: 1010, avgPollRate: 1438 },
  { game: "Dota 2", icon: "dragon", players: 43, topKeyboards: [
    { name: "Razer Huntsman V2 TKL", pct: 12 }, { name: "Logitech G Pro X TKL", pct: 10 }, { name: "SteelSeries Apex Pro TKL (2024)", pct: 8 }, { name: "HyperX Alloy Origins Core", pct: 8 }, { name: "Ducky One 3 TKL", pct: 6 }],
    topBrands: [{ name: "Razer", pct: 22 }, { name: "Logitech", pct: 18 }, { name: "HyperX", pct: 15 }, { name: "SteelSeries", pct: 14 }],
    avgWeight: 820, avgEdpi: null, wirelessPct: 10, avgDpi: 800, avgPollRate: 1000 },
  { game: "Marvel Rivals", icon: "star", players: 21, topKeyboards: [
    { name: "Wooting 60HE", pct: 22 }, { name: "Razer Huntsman V3 Pro Mini", pct: 14 }, { name: "Logitech G Pro X TKL", pct: 10 }, { name: "SteelSeries Apex Pro TKL (2024)", pct: 8 }, { name: "HyperX Alloy Origins 65", pct: 5 }],
    topBrands: [{ name: "Wooting", pct: 28 }, { name: "Razer", pct: 22 }, { name: "Logitech", pct: 15 }, { name: "SteelSeries", pct: 12 }],
    avgWeight: 700, avgEdpi: 1767, wirelessPct: 5, avgDpi: 1180, avgPollRate: 1000 },
  { game: "Overwatch 2", icon: "shield", players: 16, topKeyboards: [
    { name: "Wooting 60HE", pct: 30 }, { name: "Razer Huntsman V3 Pro Mini", pct: 20 }, { name: "Logitech G Pro X TKL", pct: 15 }, { name: "SteelSeries Apex Pro TKL (2024)", pct: 10 }],
    topBrands: [{ name: "Wooting", pct: 35 }, { name: "Razer", pct: 25 }, { name: "Logitech", pct: 20 }, { name: "SteelSeries", pct: 15 }],
    avgWeight: 660, avgEdpi: 3275, wirelessPct: 5, avgDpi: 800, avgPollRate: 4000 },
  { game: "Deadlock", icon: "gear", players: 15, topKeyboards: [
    { name: "Wooting 60HE", pct: 35 }, { name: "Razer Huntsman V3 Pro Mini", pct: 20 }, { name: "Wooting 60HE+", pct: 15 }, { name: "SteelSeries Apex Pro Mini", pct: 10 }],
    topBrands: [{ name: "Wooting", pct: 50 }, { name: "Razer", pct: 25 }, { name: "SteelSeries", pct: 15 }, { name: "Logitech", pct: 10 }],
    avgWeight: 620, avgEdpi: 853, wirelessPct: 3, avgDpi: 667, avgPollRate: 3800 },
  { game: "Call of Duty", icon: "crosshair", players: 8, topKeyboards: [
    { name: "Razer Huntsman V3 Pro Mini", pct: 38 }, { name: "Wooting 60HE", pct: 25 }, { name: "SteelSeries Apex Pro Mini", pct: 25 }],
    topBrands: [{ name: "Razer", pct: 50 }, { name: "Wooting", pct: 25 }, { name: "SteelSeries", pct: 25 }],
    avgWeight: 600, avgEdpi: 4430, wirelessPct: 0, avgDpi: 800, avgPollRate: 4000 },
  { game: "Quake Champions", icon: "fire", players: 20, topKeyboards: [
    { name: "Ducky One 3 SF", pct: 15 }, { name: "Logitech G Pro X TKL", pct: 15 }, { name: "Cherry XTRFY K5V2", pct: 10 }, { name: "Razer Huntsman V2 TKL", pct: 10 }, { name: "SteelSeries Apex Pro TKL (2024)", pct: 8 }],
    topBrands: [{ name: "Ducky", pct: 20 }, { name: "Logitech", pct: 20 }, { name: "Cherry", pct: 15 }, { name: "Razer", pct: 15 }],
    avgWeight: 780, avgEdpi: 1466, wirelessPct: 5, avgDpi: 640, avgPollRate: 1000 },
  { game: "Rocket League", icon: "bolt", players: 1, topKeyboards: [
    { name: "Logitech G Pro X TKL", pct: 100 }],
    topBrands: [{ name: "Logitech", pct: 100 }],
    avgWeight: 810, avgEdpi: null, wirelessPct: 0, avgDpi: 800, avgPollRate: 1000 },
];
"""

WEIGHT_TREND = """export const weightTrend = [
  { year: "2018", avgWeight: 950, lightest: 700, heaviest: 1300 },
  { year: "2019", avgWeight: 920, lightest: 650, heaviest: 1250 },
  { year: "2020", avgWeight: 880, lightest: 520, heaviest: 1200 },
  { year: "2021", avgWeight: 850, lightest: 500, heaviest: 1150 },
  { year: "2022", avgWeight: 820, lightest: 480, heaviest: 1100 },
  { year: "2023", avgWeight: 780, lightest: 540, heaviest: 1050 },
  { year: "2024", avgWeight: 740, lightest: 520, heaviest: 1100 },
  { year: "2025", avgWeight: 720, lightest: 500, heaviest: 1050 },
];
"""

POLLING_TREND = """export const pollingTrend = [
  { year: "2018", avg: 500, max: 1000 },
  { year: "2019", avg: 750, max: 1000 },
  { year: "2020", avg: 1000, max: 1000 },
  { year: "2021", avg: 1000, max: 1000 },
  { year: "2022", avg: 1000, max: 4000 },
  { year: "2023", avg: 1000, max: 8000 },
  { year: "2024", avg: 2000, max: 8000 },
  { year: "2025", avg: 4000, max: 8000 },
];
"""

WIRELESS_TREND = """export const wirelessTrend = [
  { year: "2017", wireless: 2, wired: 98 },
  { year: "2018", wireless: 3, wired: 97 },
  { year: "2019", wireless: 5, wired: 95 },
  { year: "2020", wireless: 8, wired: 92 },
  { year: "2021", wireless: 10, wired: 90 },
  { year: "2022", wireless: 12, wired: 88 },
  { year: "2023", wireless: 15, wired: 85 },
  { year: "2024", wireless: 18, wired: 82 },
  { year: "2025", wireless: 22, wired: 78 },
];
"""

PRICE_TREND = """export const priceTrend = [
  { year: "2017", avg: 100, flagship: 150, budget: 50 },
  { year: "2018", avg: 110, flagship: 160, budget: 55 },
  { year: "2019", avg: 120, flagship: 170, budget: 60 },
  { year: "2020", avg: 130, flagship: 180, budget: 65 },
  { year: "2021", avg: 140, flagship: 200, budget: 70 },
  { year: "2022", avg: 150, flagship: 220, budget: 60 },
  { year: "2023", avg: 160, flagship: 250, budget: 65 },
  { year: "2024", avg: 170, flagship: 280, budget: 60 },
  { year: "2025", avg: 175, flagship: 350, budget: 55 },
];
"""

# ═══════════════════════════════════════════════════════════════
# Now perform all replacements
# ═══════════════════════════════════════════════════════════════

def replace_range(lines, start_line, end_line, new_content):
    """Replace lines[start_line-1:end_line] with new_content (1-indexed lines)."""
    return lines[:start_line-1] + [new_content + "\n"] + lines[end_line:]

# Work backwards so line numbers don't shift
# 13. priceTrend (9242-9252)
lines = replace_range(lines, 9242, 9252, PRICE_TREND)
# 12. wirelessTrend (9229-9239)
lines = replace_range(lines, 9229, 9239, WIRELESS_TREND)
# 11. pollingTrend (9217-9226)
lines = replace_range(lines, 9217, 9226, POLLING_TREND)
# 10. weightTrend (9205-9214)
lines = replace_range(lines, 9205, 9214, WEIGHT_TREND)
# 9. gameBreakdown (9145-9202)
lines = replace_range(lines, 9145, 9202, GAME_BREAKDOWN)
# 8. brandMarketShare (9129-9142)
lines = replace_range(lines, 9129, 9142, BRAND_MARKET_SHARE)

# Now re-read to find the mice array end (may have shifted)
# Actually, mice array hasn't shifted yet since we worked bottom-up
# 7. mice → keyboards (4668-4833)
lines = replace_range(lines, 4668, 4833, KEYBOARDS)

# 6. GAME_DESCRIPTIONS (4608-4623)
lines = replace_range(lines, 4608, 4623, GAME_DESCRIPTIONS)

# 5. BRAND_IMAGE_URLS (4562-4580)
lines = replace_range(lines, 4562, 4580, BRAND_IMAGE_URLS)

# 4. MOUSE_DESCRIPTIONS → KEYBOARD_DESCRIPTIONS (423-1032)
lines = replace_range(lines, 423, 1032, KEYBOARD_DESCRIPTIONS)

# 3. MOUSE_IMAGE_URLS → KEYBOARD_IMAGE_URLS (196-421)
lines = replace_range(lines, 196, 421, KEYBOARD_IMAGE_URLS)

# 2. MOUSE_DIMS → KEYBOARD_DIMS (41-194)
lines = replace_range(lines, 41, 194, KEYBOARD_DIMS)

# 1. BRAND_COLORS (19-38)
lines = replace_range(lines, 19, 38, BRAND_COLORS)

with open(DATA_FILE, "w") as f:
    f.writelines(lines)

print("✅ Data replacement complete!")
print(f"   Total lines: {len(lines)}")
