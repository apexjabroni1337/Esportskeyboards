/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],
        body: ["Outfit", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      colors: {
        ek: {
          bg: "#fafaf8",
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
        }
      }
    },
  },
  plugins: [],
};
