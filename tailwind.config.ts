import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        text: "var(--text)",
        dark: "var(--dark)",
        sand: "var(--sand)",
        blue: "var(--blue)",
        muted: "var(--muted)",
        white: "var(--white)",
        background: "var(--bg)",
        foreground: "var(--text)",
      },
      fontFamily: {
        sans: [
          "var(--font-work-sans)",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
        slideUp: "slideUp 0.5s ease-out",
        fadeUp: "fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        kenBurns: "kenBurns 20s ease-out forwards",
        pulseGlow: "pulseGlow 2s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        kenBurns: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.05)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(91, 170, 231, 0)" },
          "50%": { boxShadow: "0 0 20px 0 rgba(91, 170, 231, 0.5)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

