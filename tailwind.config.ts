import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "#121213",
        card: "#292D35",
        border: "#9E9D9B",
        text: "#FFFFFF",
        primary: "#E6B420",
      },
      backgroundColor: {
        background: "#121213",
        card: "#292D35",
      },
      textColor: {
        default: "#FFFFFF",
        primary: "#E6B420",
      },
      borderColor: {
        default: "#9E9D9B",
      },
    },
  },
  plugins: [],
};

export default config; 