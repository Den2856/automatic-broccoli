/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "rgb(var(--c-obsidian) / <alpha-value>)",
        paper: "rgb(var(--c-paper) / <alpha-value>)",
        graphite: "rgb(var(--c-graphite) / <alpha-value>)",
        "amber-drive": "rgb(var(--c-amber-drive) / <alpha-value>)",
        cloud: "rgb(var(--c-cloud) / <alpha-value>)",
        frost: "rgb(var(--c-frost) / <alpha-value>)",
        charcoal: "rgb(var(--c-charcoal) / <alpha-value>)",
        success: "rgb(var(--c-success) / <alpha-value>)",
        danger: "rgb(var(--c-danger) / <alpha-value>)",
        stone: "rgb(var(--c-stone) / <alpha-value>)",
        "border-soft": "rgb(var(--c-border-soft) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["Space Grotesk", "Segoe UI", "sans-serif"],
      },
    },
  },
  plugins: [],
}
