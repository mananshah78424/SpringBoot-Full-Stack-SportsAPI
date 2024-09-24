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
      spacing: {
        "30px": "30px",
      },
      colors: {
        "grey-80": "rgb(56, 56, 63)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "pl-banner": "url('/images/Banners/Staidum-Banner.jpg')",
        "f1-main-banner": "url('/images/f1/ferrari-630145_1280.jpg')",
      },
      fontFamily: {
        archivo: ["ArchivoBlack", "sans-serif"],
        f1NavbarFont: ["FormulaNavbarFont", "sans-serif"],
        titillium: ["Titillium", "sans-serif"],
        F1Black: ["F1Black"],
      },
      fontSize: {
        "fs-14px": ".875rem",
        "32": "2rem",
      },
      backgroundColor: {
        carbonBlack: "rgb(21, 21, 30)", // Correctly defining the color
        soccerMainBanner: "#37003c",
      },
      borderColor: {
        "brand-primary": "rgba(224, 4, 0)",
      },
      borderWidth: {
        thick: "0.625rem",
      },
    },
  },
  plugins: [],
};
export default config;
