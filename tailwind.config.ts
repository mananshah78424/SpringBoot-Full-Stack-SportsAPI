import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}", // If you have an 'app' directory within 'src'
    "./public/**/*.{html}", // If you use any HTML files in the public directory
  ],
  theme: {
    extend: {
      colors: {
        "grey-80": "rgb(56, 56, 63)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "pl-banner": "url('/images/Banners/Pl-Banner.webp')",
      },
      fontFamily: {
        archivo: ["ArchivoBlack", "sans-serif"],
        f1NavbarFont: ["FormulaNavbarFont", "sans-serif"],
        titillium: ["Titillium", "sans-serif"],
      },
      fontSize: {
        "fs-14px": ".875rem",
      },
    },
  },
  plugins: [],
};
export default config;
