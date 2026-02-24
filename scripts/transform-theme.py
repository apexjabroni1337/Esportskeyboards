#!/usr/bin/env python3
"""
Step 4: Complete dark→light theme color transformation.
Processes ALL .jsx and .js files (except App.jsx) with ordered replacements.
"""
import os, re, glob

# ═══════════════════════════════════════════════════════════════
# COLOR MAPPING: Dark Gaming → Luxury White
# Order matters: longer/more specific patterns first
# ═══════════════════════════════════════════════════════════════

# Background replacements (inline styles)
BG_MAP = [
    # Transparent dark overlays → transparent light overlays
    ('"#050505ee"', '"#fafaf8f0"'),
    ('"#0a0a0aee"', '"#fffffff0"'),
    ('"#0a0a0af0"', '"#ffffffe8"'),
    # Solid backgrounds
    ('"#050505"', '"#fafaf8"'),
    ('"#0a0a0a"', '"#ffffff"'),
    ('"#0d0d0d"', '"#f8f6f3"'),
    ('"#0f0f0f"', '"#f8f6f3"'),
    ('"#111"', '"#f5f2ee"'),
    ('"#111111"', '"#f5f2ee"'),
    ('"#161616"', '"#f0ede8"'),
    ('"#1a1a1a"', '"#edeae5"'),
    # White-on-dark overlays → dark-on-light overlays
    ('"#ffffff03"', '"#0000000a"'),
    ('"#ffffff04"', '"#00000008"'),
    ('"#ffffff05"', '"#0000000a"'),
    ('"#ffffff06"', '"#0000000a"'),
    ('"#ffffff08"', '"#00000008"'),
    ('"#ffffff0a"', '"#0000000a"'),
    ('"#ffffff10"', '"#00000010"'),
    ('"#ffffff12"', '"#00000010"'),
    ('"#ffffff15"', '"#00000012"'),
    ('"#ffffff20"', '"#00000015"'),
    # Neon green accent backgrounds → champagne gold
    ('"#00ff6a15"', '"#b8956a18"'),
    ('"#00ff6a10"', '"#b8956a12"'),
    ('"#00ff6a"', '"#b8956a"'),
    ('"#00ff6a80"', '"#b8956a80"'),
    # Amber accent backgrounds → champagne gold
    ('"#f59e0b08"', '"#b8956a0a"'),
    ('"#f59e0b10"', '"#b8956a12"'),
    ('"#f59e0b12"', '"#b8956a14"'),
    ('"#f59e0b15"', '"#b8956a18"'),
    ('"#f59e0b20"', '"#b8956a20"'),
    ('"#f59e0b"', '"#b8956a"'),  # solid amber → gold
    # Red/error backgrounds
    ('"#ff4c4c10"', '"#c4737312"'),
    ('"#ff465508"', '"#c4737310"'),
    ('"#ff449920"', '"#c4737320"'),
    # Blue info backgrounds
    ('"#1da1f230"', '"#6b8cad25"'),
    ('"#3b82f615"', '"#6b8cad18"'),
    ('"#3b82f610"', '"#6b8cad12"'),
]

# Text color replacements
TEXT_MAP = [
    # White text → dark text (on light backgrounds)
    ('"#ffffffd0"', '"#1a1614"'),
    ('"#ffffffc0"', '"#2d2824"'),
    ('"#ffffffa0"', '"#3d3530"'),
    ('"#ffffff80"', '"#6b635b"'),
    ('"#ffffff70"', '"#6b635b"'),
    ('"#ffffff60"', '"#8a8078"'),
    ('"#ffffff50"', '"#8a8078"'),
    ('"#ffffff40"', '"#a09890"'),
    ('"#ffffff30"', '"#a09890"'),
    ('"#ffffff25"', '"#b8b0a8"'),
    ('"#ffffff20"', '"#b8b0a8"'),
    ('"#fff"', '"#1a1614"'),
    # Accent text colors
    ('"#00ff6a"', '"#b8956a"'),  # neon green → gold
    ('"#00b4ff"', '"#6b8cad"'),  # blue → slate
    ('"#f59e0b"', '"#b8956a"'),  # amber → gold
    ('"#d4af37"', '"#b8956a"'),  # dark gold → champagne
    # Keep brand colors but soften slightly for light bg
    ('"#ff4655"', '"#c4444f"'),  # Valorant red → softer
    ('"#ff3c3c"', '"#c44040"'),  # Zowie red → softer
    ('"#ef4444"', '"#c44040"'),  # Red → softer
    ('"#ff4444"', '"#c44040"'),
    ('"#10b981"', '"#2a8a62"'),  # Green → darker for light bg
    ('"#3b82f6"', '"#4a74c4"'),  # Blue → deeper
    ('"#8b5cf6"', '"#7048c4"'),  # Purple → deeper
    ('"#c084fc"', '"#9060d4"'),  # Light purple → deeper
    ('"#a78bfa"', '"#8060c4"'),
    ('"#f472b6"', '"#c4508a"'),  # Pink → deeper
    ('"#06b6d4"', '"#0890a8"'),  # Cyan → deeper
    ('"#ffd700"', '"#c4a020"'),  # Gold → deeper
    ('"#ff8c00"', '"#c47000"'),  # Orange → deeper
    ('"#ff4500"', '"#c43800"'),  # Red-orange → deeper
    # Special: #000 used as text-on-colored-bg stays dark
    # ('"#000"' is handled carefully below)
]

# Border replacements
BORDER_MAP = [
    ('"1px solid #ffffff06"', '"1px solid #e8e4df"'),
    ('"1px solid #ffffff08"', '"1px solid #e8e4df"'),
    ('"1px solid #ffffff0a"', '"1px solid #e8e4df"'),
    ('"1px solid #ffffff10"', '"1px solid #d4cfc8"'),
    ('"1px solid #ffffff12"', '"1px solid #d4cfc8"'),
    ('"1px solid #ffffff15"', '"1px solid #d4cfc8"'),
    ('"1px solid #ffffff20"', '"1px solid #c8c0b8"'),
    # Accent borders
    ('"1px solid #f59e0b10"', '"1px solid #b8956a20"'),
    ('"1px solid #f59e0b15"', '"1px solid #b8956a25"'),
    ('"1px solid #f59e0b20"', '"1px solid #b8956a30"'),
    # Error/info borders
    ('"1px solid #ff4c4c25"', '"1px solid #c4737330"'),
    ('"1px solid #ff465512"', '"1px solid #c4737318"'),
    ('"1px solid #ff449930"', '"1px solid #c4737330"'),
    ('"1px solid #3b82f615"', '"1px solid #6b8cad20"'),
    ('"1px solid #3b82f610"', '"1px solid #6b8cad15"'),
    ('"1px solid #1da1f230"', '"1px solid #6b8cad30"'),
]

# Stroke/SVG replacements (used in data/index.js icon SVGs)
SVG_MAP = [
    ('stroke="#ffffff08"', 'stroke="#e8e4df"'),
    ('stroke="#ffffff10"', 'stroke="#d4cfc8"'),
    ('stroke="#ffffff40"', 'stroke="#a09890"'),
    ('stroke="#00ff6a"', 'stroke="#b8956a"'),
    ('stroke="#ef4444"', 'stroke="#c44040"'),
    ('stopColor="#00ff6a"', 'stopColor="#b8956a"'),
    ('stopColor="#00b4ff"', 'stopColor="#6b8cad"'),
    # SVG fill on dark overlays
    ('fill="#ffffff"', 'fill="#1a1614"'),
    # Gradient stops for icon SVGs  
    ('stopColor="#fde68a"', 'stopColor="#d4b896"'),
    ('stopColor="#fbbf24"', 'stopColor="#b8956a"'),
    ('stopColor="#f97316"', 'stopColor="#8a7460"'),
    ('stopColor="#fcd34d"', 'stopColor="#d4b896"'),
    ('stopColor="#f59e0b"', 'stopColor="#b8956a"'),
    ('stopColor="#f87171"', 'stopColor="#c47373"'),
    ('stopColor="#dc2626"', 'stopColor="#a04040"'),
    ('stopColor="#f472b6"', 'stopColor="#c4508a"'),
    ('stopColor="#a78bfa"', 'stopColor="#8060c4"'),
    ('stopColor="#06b6d4"', 'stopColor="#0890a8"'),
    ('stopColor="#ff3c3c"', 'stopColor="#c44040"'),
]

# BoxShadow replacements
SHADOW_MAP = [
    # Dark glows → light subtle shadows
    ('boxShadow: "0 0 20px #00ff6a20"', 'boxShadow: "0 4px 20px #b8956a15"'),
    ('boxShadow: "0 0 15px #00ff6a15"', 'boxShadow: "0 2px 12px #b8956a10"'),
    ('boxShadow: "0 0 30px #00ff6a10"', 'boxShadow: "0 8px 30px #00000008"'),
    ('boxShadow: "0 0 20px #f59e0b20"', 'boxShadow: "0 4px 20px #b8956a15"'),
    ('boxShadow: "0 0 15px #f59e0b15"', 'boxShadow: "0 2px 12px #b8956a10"'),
]

# Gradient string replacements (in template literals and strings)
GRADIENT_MAP = [
    # Common gradient backgrounds
    ('linear-gradient(135deg, #00ff6a15 0%, #00b4ff08 100%)', 'linear-gradient(135deg, #b8956a10 0%, #6b8cad08 100%)'),
    ('linear-gradient(135deg, #0a0a0a, #111)', 'linear-gradient(135deg, #ffffff, #f8f6f3)'),
    ('linear-gradient(to right, #00ff6a, #00b4ff)', 'linear-gradient(to right, #b8956a, #8a7460)'),
    ('linear-gradient(90deg, #00ff6a, #00b4ff)', 'linear-gradient(90deg, #b8956a, #8a7460)'),
    ('#00ff6a20 0%, #00b4ff10 100%', '#b8956a15 0%, #6b8cad10 100%'),
    ('#00ff6a10 0%, #00b4ff05 100%', '#b8956a0a 0%, #6b8cad05 100%'),
    ('#00ff6a 0%, #00b4ff 100%', '#b8956a 0%, #8a7460 100%'),
]

# Font family replacements
FONT_MAP = [
    ("'Orbitron'", "'Playfair Display'"),
    ("fontFamily: \"Orbitron", "fontFamily: \"'Playfair Display'"),
    ("fontFamily: 'Orbitron", "fontFamily: \"'Playfair Display'"),
    ('font-family: Orbitron', "font-family: 'Playfair Display'"),
    ("'Inter'", "'Outfit'"),
    ("fontFamily: \"Inter", "fontFamily: \"'Outfit'"),
    ('font-family: Inter', "font-family: 'Outfit'"),
]

# ═══════════════════════════════════════════════════════════════
# Process all files
# ═══════════════════════════════════════════════════════════════

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    original = content
    
    # Apply all replacement maps
    for old, new in BORDER_MAP:
        content = content.replace(old, new)
    
    for old, new in BG_MAP:
        content = content.replace(old, new)
    
    for old, new in SHADOW_MAP:
        content = content.replace(old, new)
    
    for old, new in GRADIENT_MAP:
        content = content.replace(old, new)
    
    for old, new in SVG_MAP:
        content = content.replace(old, new)
    
    for old, new in FONT_MAP:
        content = content.replace(old, new)
    
    # Text colors — need special handling for color: vs background:
    # We apply these last and carefully
    for old, new in TEXT_MAP:
        # For "color:" context
        content = content.replace(f'color: {old}', f'color: {new}')
        # For "fill:" context 
        content = content.replace(f'fill: {old}', f'fill: {new}')
        # For "stroke:" context
        content = content.replace(f'stroke: {old}', f'stroke: {new}')
        # For "borderColor:" context
        content = content.replace(f'borderColor: {old}', f'borderColor: {new}')
        # For "borderBottom:" etc
        content = content.replace(f'borderBottom: "2px solid {old[1:-1]}"', f'borderBottom: "2px solid {new[1:-1]}"')
        content = content.replace(f'borderBottom: "3px solid {old[1:-1]}"', f'borderBottom: "3px solid {new[1:-1]}"')
        content = content.replace(f'borderLeft: "3px solid {old[1:-1]}"', f'borderLeft: "3px solid {new[1:-1]}"')
        content = content.replace(f'borderLeft: "2px solid {old[1:-1]}"', f'borderLeft: "2px solid {new[1:-1]}"')
    
    # Special: background with text color values (when used as bg)
    # Handle remaining background: "#00ff6a" etc that weren't caught
    content = content.replace('background: "#00ff6a"', 'background: "#b8956a"')
    content = content.replace('background: "#f59e0b"', 'background: "#b8956a"')
    content = content.replace('background: "#000"', 'background: "#fafaf8"')
    
    # Handle the tricky #000 text-on-color (should stay dark)
    # "#000" as color means text on colored bg — keep it as "#1a1614"
    content = content.replace('color: "#000"', 'color: "#1a1614"')
    
    if content != original:
        with open(filepath, 'w') as f:
            f.write(content)
        return True
    return False

# Find all relevant files
files = []
for pattern in ['./app/**/*.jsx', './app/**/*.js', './components/**/*.jsx', './data/index.js']:
    files.extend(glob.glob(pattern, recursive=True))

# Exclude App.jsx (old standalone file)
files = [f for f in files if 'App.jsx' not in os.path.basename(f) or 'Client' in f]
files = [f for f in files if 'node_modules' not in f]

changed = 0
for f in files:
    if process_file(f):
        changed += 1
        print(f"  ✓ {f}")

print(f"\n✅ Theme transformation complete: {changed} files modified")
