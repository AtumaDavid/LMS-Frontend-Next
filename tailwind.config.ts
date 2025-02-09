import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["var(--font-Poppins)"],
        Josefin: ["var(--font-Josefin)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "(from 180deg at 50% 50%,var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          DEFAULT: "#2526e3", // Main blue color used in buttons and links
          hover: "#1e1fb8", // Darker shade for hover states
          light: "hsla(239, 76%, 53%, 0.456)", // Used in gradients/animations
        },
        secondary: {
          DEFAULT: "#000000",
          hover: "#1f1f1f",
          transparent: "#000000ac", // Used for text
          "dark-transparent": "#000000bc", // Used for icons
        },
        background: {
          DEFAULT: "#ffffff",
          dark: "#0a0a0a",
        },
        border: {
          light: "#00000067", // Light mode border
          dark: "#ffffff57", // Dark mode border
          "dark-secondary": "#fff", // White border used in dark mode
        },
        text: {
          light: {
            primary: "#000000",
            secondary: "#000000ac",
            tertiary: "#000000bc",
          },
          dark: {
            primary: "#ffffff",
            secondary: "#ffffffac",
            tertiary: "#ffffffbc",
          },
        },
        form: {
          input: {
            border: "#00000067",
            "dark-border": "#ffffff57",
          },
        },
      },
      screens: {
        "1000px": "1000px",
        "1100px": "1100px",
        "1200px": "1200px",
        "1300px": "1300px",
        "1500px": "1500px",
        "800px": "800px",
        "400px": "400px",
      },
      // colors: {
      //   background: "var(--background)",
      //   foreground: "var(--foreground)",
      // },
    },
  },
  plugins: [],
} satisfies Config;
