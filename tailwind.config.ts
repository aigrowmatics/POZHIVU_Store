import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        forest: "#233b16",
        cream: "#f6f3ee",
        gold: "#d9a441",
        charcoal: "#1c1c1c",
        beige: "#ebe7df",
        sage: "#7d8f69",
        clay: "#b76f4b"
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "Arial", "sans-serif"]
      },
      boxShadow: {
        luxury: "0 24px 80px rgba(28, 28, 28, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
