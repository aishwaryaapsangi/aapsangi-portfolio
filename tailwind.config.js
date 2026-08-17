/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "oklch(0.89 0.14 172)",
        foreground: "oklch(0.95 0.008 300)",
        "muted-foreground": "oklch(0.7 0.022 300)",
        border: "oklch(0.3 0.03 305)",
        background: "oklch(0.185 0.03 305)",
      },
    },
  },
  plugins: [],
};