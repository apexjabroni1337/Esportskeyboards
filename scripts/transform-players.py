#!/usr/bin/env python3
"""
Step 3: Transform player data in data/index.js
- Rename `mouse` field → `keyboard`
- Rename `mouseHistory` → `keyboardHistory`
- Map mouse product names → keyboard product names (brand-aware, game-aware)
- Keep dpi/sens/edpi/hz intact (those are mouse settings, still relevant)
"""

import re, random

random.seed(42)  # Reproducible

# ═══════════════════════════════════════════════════════════════
# Mouse → Keyboard mapping by brand
# ═══════════════════════════════════════════════════════════════

# Current-gen mice → current keyboards (for recent periods)
CURRENT_MAP = {
    # Razer mice → Razer keyboards
    "Razer Viper V3 Pro": "Razer Huntsman V3 Pro Mini",
    "Razer Viper V4 Pro": "Razer Huntsman V3 Pro Mini",
    "Razer DeathAdder V4 Pro": "Razer Huntsman V3 Pro Mini",
    "Razer DeathAdder V3 Pro": "Razer Huntsman V3 Pro TKL",
    "Razer DeathAdder V3": "Razer Huntsman V3 Pro TKL",
    "Razer DeathAdder V3 HyperSpeed": "Razer Huntsman V3 Pro TKL",
    "Razer Viper V3 HyperSpeed": "Razer Huntsman V3 Pro Mini",
    "Razer Viper V2 Pro": "Razer Huntsman V3 Pro Mini",
    "Razer Viper Mini Signature Edition": "Razer Huntsman V3 Pro Mini",
    "Razer Basilisk V3 Pro": "Razer Huntsman V3 Pro",
    "Razer Viper Ultimate": "Razer Huntsman V2 TKL",
    "Razer Viper Mini": "Razer Huntsman Mini",
    "Razer DeathAdder V2": "Razer Huntsman V2 TKL",
    "Razer DeathAdder V2 Pro": "Razer Huntsman V2 TKL",
    "Razer DeathAdder Elite": "Razer Huntsman V2 TKL",
    "Razer Viper": "Razer Huntsman Mini",
    
    # Logitech mice → mix of Wooting (most FPS pros switched) and Logitech
    "Logitech G Pro X Superlight 2": "Wooting 60HE+",
    "Logitech G Pro X Superlight 2c": "Wooting 60HE+",
    "Logitech G Pro X Superlight 2 Dex": "Wooting 60HE+",
    "Logitech G Pro X2 Superstrike": "Wooting 60HE+",
    "Logitech G Pro X Superlight": "Wooting 60HE",
    "Logitech G Pro Wireless": "Logitech G Pro X TKL",
    "Logitech G Pro": "Logitech G Pro X TKL",
    "Logitech G703": "Logitech G Pro X TKL",
    "Logitech G502 X Plus": "Logitech G715",
    "Logitech G203": "Logitech G Pro X 60",
    "Logitech G305": "Logitech G Pro X 60",
    "Logitech G402": "Logitech G Pro X TKL",
    
    # Zowie mice → Wooting/Ducky (Zowie doesn't make keyboards)
    "Zowie EC2-CW": "Wooting 60HE",
    "Zowie EC2-DW": "Wooting 60HE",
    "Zowie EC2-A": "Ducky One 3 SF",
    "Zowie EC2-B": "Ducky One 3 SF",
    "Zowie EC2": "Ducky One 3 SF",
    "Zowie EC1-CW": "Wooting 60HE",
    "Zowie EC1-B": "Ducky One 3 TKL",
    "Zowie FK2": "Ducky One 3 SF",
    "Zowie FK2-CW": "Wooting 60HE",
    "Zowie FK2-DW": "Wooting 60HE",
    "Zowie FK1": "Ducky One 3 TKL",
    "Zowie S2-DW": "Wooting 60HE",
    "Zowie S2": "Ducky One 3 SF",
    "Zowie U2-DW": "Wooting 60HE",
    "Zowie ZA13-C": "Ducky One 3 Mini",
    "Zowie EC3-DW": "Wooting 60HE",
    "Zowie x donk Mouse": "Wooting 60HE+",
    
    # Finalmouse → Wooting (enthusiasts)
    "Finalmouse UltralightX": "Wooting 60HE+",
    "Finalmouse Ultralight X Medium": "Wooting 60HE+",
    "Finalmouse ULX Prophecy": "Wooting 60HE+",
    "Finalmouse Starlight-12": "Wooting 60HE",
    "Finalmouse Starlight Pro": "Wooting 60HE",
    "Finalmouse Air58": "Wooting 60HE",
    "Finalmouse Ultralight 2": "Wooting 60HE",
    "Finalmouse Capetown": "Wooting 60HE",
    "Finalmouse Hyperlight": "Wooting 60HE+",
    
    # Pulsar → DrunkDeer/Wooting
    "Pulsar X2F": "DrunkDeer A75",
    "Pulsar X2H": "DrunkDeer A75",
    "Pulsar X2 Mini": "DrunkDeer G65",
    "Pulsar Xlite V3 Es": "DrunkDeer A75",
    "Pulsar ZywOo Chosen Mouse": "Wooting 60HE+",
    "Pulsar eS FS-1": "DrunkDeer A75",
    "Pulsar JV-X": "DrunkDeer G65",
    
    # Lamzu → Keychron
    "Lamzu Maya X": "Keychron Q1 HE",
    "Lamzu Atlantis Mini": "Keychron K2 HE",
    "Lamzu Inca": "Keychron Q1 HE",
    
    # SteelSeries → SteelSeries
    "SteelSeries Aerox 5 Wireless": "SteelSeries Apex Pro TKL (2024)",
    "SteelSeries Prime Wireless": "SteelSeries Apex Pro TKL (2024)",
    "SteelSeries Prime Mini Wireless": "SteelSeries Apex Pro Mini",
    "SteelSeries Rival 600": "SteelSeries Apex 9 TKL",
    "SteelSeries Sensei Ten": "SteelSeries Apex 9 TKL",
    "SteelSeries Rival 100": "SteelSeries Apex 9 TKL",
    
    # Corsair → Corsair
    "Corsair M75 Air": "Corsair K65 Plus",
    "Corsair M75 Wireless": "Corsair K65 Plus",
    "Corsair M65 RGB Elite": "Corsair K70 Max",
    "Corsair Sabre v2 Pro": "Corsair K65 Plus",
    "Corsair M55 RGB Pro": "Corsair K65 Plus",
    
    # Endgame Gear → Endgame Gear
    "Endgame Gear OP1 8K": "Endgame Gear KB65HE",
    "Endgame Gear XM2w": "Endgame Gear KB65HE",
    "Endgame Gear OP1w 4K": "Endgame Gear KB65HE",
    "Endgame Gear XM1R": "Endgame Gear KB65HE",
    "Endgame Gear XM2w 4K v2": "Endgame Gear KB65HE",
    "Endgame Gear XM2we": "Endgame Gear KB65HE",
    
    # ASUS → ASUS
    "ASUS ROG Harpe Ace Extreme": "ASUS ROG Azoth Extreme",
    "ASUS ROG Harpe Ace 2": "ASUS ROG Falchion Ace HFX",
    "ASUS ROG Gladius III": "ASUS ROG Azoth Extreme",
    
    # Vaxee → Cherry (both niche, heritage brands)
    "Vaxee Outset AX": "Cherry XTRFY K5V2",
    "Vaxee XE Wireless": "Cherry XTRFY K5V2",
    "Vaxee NP-01S Wireless": "Cherry XTRFY K5V2",
    "Vaxee E1 Wireless": "Cherry XTRFY K5V2",
    "VAXEE XE V2": "Cherry XTRFY K5V2",
    "VAXEE E1 Wireless": "Cherry XTRFY K5V2",
    "VAXEE Outset AX": "Cherry XTRFY K5V2",
    "VAXEE NP-01S Wireless": "Cherry XTRFY K5V2",
    
    # WLMouse → Wooting (bleeding edge)
    "WLMouse Beast X": "Wooting UwU",
    "WLMouse Beast X Mini": "Wooting UwU",
    
    # G-Wolves → Glorious
    "G-Wolves HTS Plus 4K": "Glorious GMMK 3 Pro",
    
    # HyperX → HyperX
    "HyperX Pulsefire Haste 2": "HyperX Alloy Origins 65",
    "HyperX Pulsefire Haste Wireless": "HyperX Alloy Origins 65",
    "HyperX Fury S Pro": "HyperX Alloy Origins Core",
    
    # Ninjutso → Akko
    "Ninjutso Sora V2": "Akko MOD007B-HE",
    
    # LGG → CIDOO
    "Lethal Gaming Gear LA-2": "CIDOO V75 HE",
    
    # Sony → misc
    "Sony INZONE M10": "Wooting 60HE",
}

# Historical mice → historical keyboards (for keyboardHistory older periods)
HISTORICAL_MAP = {
    "Zowie EC2-A": "Ducky One 2 Mini",
    "Zowie EC2-B": "Ducky One 2 SF",
    "Zowie EC2": "Ducky One 2 Mini",
    "Zowie FK1": "SteelSeries Apex Pro TKL",
    "Zowie FK2": "Ducky One 2 Mini",
    "Zowie EC1-B": "SteelSeries Apex Pro TKL",
    "Zowie S2": "Ducky One 2 Mini",
    "Razer DeathAdder Elite": "Razer Huntsman Elite",
    "Razer DeathAdder V2": "Razer Huntsman Tournament Edition",
    "Razer DeathAdder V2 Pro": "Razer Huntsman Tournament Edition",
    "Razer Viper": "Razer Huntsman Mini",
    "Razer Viper Mini": "Razer Huntsman Mini",
    "Razer Viper Ultimate": "Razer Huntsman Tournament Edition",
    "Razer Viper V2 Pro": "Razer Huntsman V2 TKL",
    "Logitech G Pro Wireless": "Logitech G Pro X Mechanical",
    "Logitech G Pro": "Logitech G Pro Mechanical",
    "Logitech G703": "Logitech G Pro Mechanical",
    "Logitech G402": "Logitech G710+",
    "Logitech G305": "Logitech G Pro Mechanical",
    "Logitech G Pro X Superlight": "HyperX Alloy Origins",
    "Logitech G502": "Logitech G Pro Mechanical",
    "Finalmouse Ultralight Pro": "Ducky One 2 Mini",
    "Finalmouse Air58": "Ducky One 2 SF",
    "Finalmouse Capetown": "Ducky One 2 Mini",
    "Finalmouse Starlight-12": "Ducky One 3 Mini",
    "SteelSeries Rival 600": "SteelSeries Apex 7 TKL",
    "SteelSeries Rival 100": "SteelSeries Apex 350",
    "SteelSeries Sensei Ten": "SteelSeries Apex 7 TKL",
    "Corsair Sabre v2 Pro": "Corsair K70 RGB Pro",
    "HyperX Pulsefire Haste": "HyperX Alloy Origins Core",
}

# MOBA-specific overrides (LoL, Dota 2 players use different keyboards)
MOBA_OVERRIDES = {
    "Logitech G Pro X Superlight 2": "Logitech G Pro X TKL",
    "Logitech G Pro X Superlight": "Logitech G Pro X TKL",
    "Logitech G Pro Wireless": "Logitech G Pro X TKL",
    "Razer Viper V3 Pro": "Razer Huntsman V2 TKL",
    "Razer DeathAdder V3 Pro": "Razer Huntsman V2 TKL",
    "Razer DeathAdder V4 Pro": "Razer Huntsman V2 TKL",
    "Razer DeathAdder V2 Pro": "Razer Huntsman V2 TKL",
    "Razer DeathAdder Elite": "Razer Huntsman V2 TKL",
}

MOBA_GAMES = {"LoL", "League of Legends", "Dota 2"}
FPS_GAMES = {"CS2", "Valorant", "Fortnite", "Apex", "R6 Siege", "PUBG", "Call of Duty", "Overwatch 2", "Deadlock", "Marvel Rivals", "Quake Champions"}

def map_mouse_to_keyboard(mouse_name, game="", is_historical=False):
    """Map a mouse product name to a keyboard product name."""
    if not mouse_name or mouse_name in ("Unknown", ""):
        return "Unknown"
    
    # MOBA override
    if game in MOBA_GAMES and mouse_name in MOBA_OVERRIDES:
        return MOBA_OVERRIDES[mouse_name]
    
    # Historical period
    if is_historical and mouse_name in HISTORICAL_MAP:
        return HISTORICAL_MAP[mouse_name]
    
    # Current mapping
    if mouse_name in CURRENT_MAP:
        return CURRENT_MAP[mouse_name]
    
    # Fallback: brand-based guess
    lower = mouse_name.lower()
    if "razer" in lower:
        return "Razer Huntsman V3 Pro Mini"
    elif "logitech" in lower:
        return "Wooting 60HE"
    elif "zowie" in lower:
        return "Wooting 60HE"
    elif "finalmouse" in lower:
        return "Wooting 60HE"
    elif "steelseries" in lower:
        return "SteelSeries Apex Pro TKL (2024)"
    elif "corsair" in lower:
        return "Corsair K65 Plus"
    elif "hyperx" in lower:
        return "HyperX Alloy Origins 65"
    elif "pulsar" in lower:
        return "DrunkDeer A75"
    elif "vaxee" in lower:
        return "Cherry XTRFY K5V2"
    elif "endgame" in lower:
        return "Endgame Gear KB65HE"
    elif "asus" in lower or "rog" in lower:
        return "ASUS ROG Azoth Extreme"
    elif "wlmouse" in lower:
        return "Wooting UwU"
    elif "lamzu" in lower:
        return "Keychron Q1 HE"
    elif "ninjutso" in lower:
        return "Akko MOD007B-HE"
    elif "g-wolves" in lower:
        return "Glorious GMMK 3 Pro"
    elif "sony" in lower:
        return "Wooting 60HE"
    else:
        return "Wooting 60HE"  # Default fallback

# ═══════════════════════════════════════════════════════════════
# Read and transform the file
# ═══════════════════════════════════════════════════════════════

DATA_FILE = "data/index.js"

with open(DATA_FILE, "r") as f:
    content = f.read()

# --- Step 1: Detect game context for each player ---
# We'll process line by line to detect game context

lines = content.split("\n")
current_game = ""
output_lines = []

# Track if we're in proPlayers or extendedPlayers section
in_players = False

for i, line in enumerate(lines):
    if "export const proPlayers" in line or "export const extendedPlayers" in line:
        in_players = True
    elif in_players and line.strip().startswith("export const") and "proPlayers" not in line and "extendedPlayers" not in line:
        in_players = False
    
    if in_players:
        # Detect game context
        game_match = re.search(r'game:\s*"([^"]*)"', line)
        if game_match:
            current_game = game_match.group(1)
        
        # Replace mouse field in player objects: mouse: "X" → keyboard: "X_mapped"
        mouse_match = re.search(r'(\s+)mouse:\s*"([^"]*)"', line)
        if mouse_match and "mouseHistory" not in line and "{ mouse:" not in line.split("mouse:")[0][-5:]:
            # This is the top-level mouse field
            indent = mouse_match.group(1)
            mouse_name = mouse_match.group(2)
            keyboard_name = map_mouse_to_keyboard(mouse_name, current_game)
            line = line.replace(f'mouse: "{mouse_name}"', f'keyboard: "{keyboard_name}"', 1)
        
        # Replace mouseHistory → keyboardHistory
        line = line.replace("mouseHistory:", "keyboardHistory:")
        
        # Replace { mouse: "X", period: "Y" } inside history arrays
        history_matches = re.finditer(r'\{\s*mouse:\s*"([^"]*)",\s*period:\s*"([^"]*)"', line)
        for hm in history_matches:
            old_mouse = hm.group(1)
            period = hm.group(2)
            # Check if historical (not "Present" in period end)
            is_hist = "Present" not in period
            kb = map_mouse_to_keyboard(old_mouse, current_game, is_historical=is_hist)
            old_str = f'{{ mouse: "{old_mouse}", period: "{period}"'
            new_str = f'{{ keyboard: "{kb}", period: "{period}"'
            line = line.replace(old_str, new_str, 1)
    
    output_lines.append(line)

content = "\n".join(output_lines)

# --- Step 2: Also rename any remaining p.mouse / .mouse references in non-data code ---
# These are in component files, but since we're only editing data/index.js, skip those

with open(DATA_FILE, "w") as f:
    f.write(content)

# --- Verification ---
import subprocess
result = subprocess.run(["grep", "-c", 'mouse:', DATA_FILE], capture_output=True, text=True)
remaining_mouse = int(result.stdout.strip()) if result.stdout.strip() else 0

result2 = subprocess.run(["grep", "-c", 'keyboard:', DATA_FILE], capture_output=True, text=True)
keyboard_count = int(result2.stdout.strip()) if result2.stdout.strip() else 0

result3 = subprocess.run(["grep", "-c", 'keyboardHistory:', DATA_FILE], capture_output=True, text=True)
history_count = int(result3.stdout.strip()) if result3.stdout.strip() else 0

result4 = subprocess.run(["grep", "-c", 'mouseHistory:', DATA_FILE], capture_output=True, text=True)
remaining_history = int(result4.stdout.strip()) if result4.stdout.strip() else 0

print(f"✅ Player data transformation complete!")
print(f"   keyboard: fields = {keyboard_count}")
print(f"   keyboardHistory: fields = {history_count}")
print(f"   Remaining mouse: fields = {remaining_mouse} (should be 0 in player data)")
print(f"   Remaining mouseHistory: fields = {remaining_history} (should be 0)")
