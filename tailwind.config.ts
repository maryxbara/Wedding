import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        text: "var(--text)",
        muted: "var(--muted)",
        olive: "var(--olive)",
        sage: "var(--sage)",
        gold: "var(--gold)",
        border: "var(--border)",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "serif"],
        script: ["var(--font-cormorant)", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      spacing: {
        section: "clamp(4rem, 8vw, 8rem)",
      },
    },
  },
  plugins: [],
} satisfies Config;


