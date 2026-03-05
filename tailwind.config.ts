import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      screens: {
        "2xl": "1440px",
      },
      padding: {
        DEFAULT: "1rem",
        md: "1.5rem",
      },
    },
    screens: {
      sm: "375px",
      md: "640px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        "ink-black": "#0A0A0A",
        "indigo-night": "#1A1A2E",
        saffron: "#FF6B1A",
        "turmeric-gold": "#F5A623",
        "peacock-teal": "#0B6E6E",
        "off-white": "#F9F9F7",
        "warm-paper": "#F4F3EF",
        "muted-ash": "#888880",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        pill: "var(--radius-pill)",
      },
      fontFamily: {
        display: ["var(--font-display)", "var(--font-devanagari)", "sans-serif"],
        body: ["var(--font-body)", "var(--font-devanagari)", "sans-serif"],
      },
      keyframes: {
        "pulse-dot": {
          "0%, 80%, 100%": { opacity: "0.35", transform: "translateY(0)" },
          "40%": { opacity: "1", transform: "translateY(-2px)" },
        },
      },
      animation: {
        "pulse-dot": "pulse-dot 800ms var(--ease-standard) infinite",
      },
    },
  },
  plugins: [],
};

export default config;

