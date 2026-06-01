import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8B735B",
        background: "#FCF9F7",
        gold: {
          50: "#FFF9E6",
          100: "#FFF0C2",
          200: "#FFE499",
          300: "#FFD666",
          400: "#FFC933",
          500: "#D4AF37",
          600: "#B8960F",
          700: "#8B7300",
          800: "#5C4D00",
          900: "#2E2600",
        },
        rose: {
          gold: "#B76E79",
        },
        cream: {
          50: "#FFFDF8",
          100: "#FFF8ED",
          200: "#FFF0D9",
          300: "#FFE8C4",
        },
      },
      fontFamily: {
        serif: ["'Playfair Display'", "serif"],
        sans: ["'Inter'", "sans-serif"],
        cursive: ["'Great Vibes'", "cursive"],
        elegant: ["'Cormorant Garamond'", "serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gold-gradient": "linear-gradient(135deg, #D4AF37 0%, #F5E7A3 25%, #D4AF37 50%, #F5E7A3 75%, #D4AF37 100%)",
        "gold-gradient-subtle": "linear-gradient(135deg, #8B735B 0%, #D4AF37 50%, #8B735B 100%)",
        "damask-pattern": "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0C30 16.5685 16.5685 30 0 30C16.5685 30 30 43.4315 30 60C30 43.4315 43.4315 30 60 30C43.4315 30 30 16.5685 30 0Z' fill='%238B735B' fill-opacity='0.03'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        sparkle: {
          "0%, 100%": { opacity: "0", transform: "scale(0)" },
          "50%": { opacity: "1", transform: "scale(1)" },
        },
        "float-gentle": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-8px) rotate(1deg)" },
          "66%": { transform: "translateY(4px) rotate(-1deg)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 5px rgba(212,175,55,0.3)" },
          "50%": { boxShadow: "0 0 20px rgba(212,175,55,0.6), 0 0 40px rgba(212,175,55,0.3)" },
        },
        "petal-fall": {
          "0%": { transform: "translateY(-10vh) rotate(0deg) translateX(0)", opacity: "1" },
          "100%": { transform: "translateY(110vh) rotate(720deg) translateX(100px)", opacity: "0" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "draw-line": {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        "fade-in-scale": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        shimmer: "shimmer 3s ease-in-out infinite",
        sparkle: "sparkle 2s ease-in-out infinite",
        "float-gentle": "float-gentle 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "petal-fall": "petal-fall 10s linear infinite",
        "spin-slow": "spin-slow 20s linear infinite",
        "draw-line": "draw-line 1.5s ease-out forwards",
        "fade-in-scale": "fade-in-scale 0.8s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
