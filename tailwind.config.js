/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', "system-ui", "sans-serif"],
        body: ["Outfit", "system-ui", "sans-serif"],
        mono: ['"Fira Code"', '"JetBrains Mono"', "monospace"],
      },
      colors: {
        ek: {
          bg: "#f5f0e8",
          surface: "#ffffff",
          surface2: "#f5f2ee",
          surface3: "#f0ede8",
          border: "#e8e4df",
          border2: "#d4cfc8",
          text: "#1a1614",
          text2: "#2d2824",
          muted: "#6b635b",
          faint: "#a09890",
          gold: "#b8956a",
          bronze: "#8a7460",
          sage: "#7c9a6e",
          slate: "#6b8cad",
          cyan: "#06b6d4",
          violet: "#8b5cf6",
          copper: "#c45a3c",
          parchment: "#f5f0e8",
        }
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(12px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'stagger-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'gradient-shift': 'gradient-shift 6s ease infinite',
        'pulse-glow': 'pulse-glow 2s ease infinite',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
        'stagger-in': 'stagger-in 0.4s ease-out both',
      },
    },
  },
  plugins: [],
};
