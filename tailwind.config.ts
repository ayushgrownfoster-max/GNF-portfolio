import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#FFFFFF",
        ink: "#111111",
        mist: "#F5F5F5",
        // Accent lives on a CSS variable so it can be swapped from a single
        // place (or eventually driven by a WordPress "Site Settings" field)
        // without touching component code.
        accent: "var(--accent)",
        "accent-dim": "var(--accent-dim)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      fontSize: {
        "hero": ["clamp(3rem, 8vw, 8.75rem)", { lineHeight: "0.94", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.5rem, 6vw, 6rem)", { lineHeight: "0.98", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(2rem, 4.2vw, 4rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        "display-sm": ["clamp(1.5rem, 2.6vw, 2.25rem)", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        "stat": ["clamp(2.75rem, 6vw, 5.5rem)", { lineHeight: "1", letterSpacing: "-0.02em" }],
      },
      transitionTimingFunction: {
        "grow": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      maxWidth: {
        "site": "1600px",
      },
    },
  },
  plugins: [],
};

export default config;
