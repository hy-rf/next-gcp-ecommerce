/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{js,ts,jsx,tsx,mdx}"];
export const theme = {
  extend: {
    spacing: {
      "header-height": "70px",
    },
    lineHeight: {
      "header-line": "70px", // For custom line-height
    },
    boxShadow: {
      "product-card": "0px 1px 2px 0px rgba(0, 0, 0, 0.2)",
      "category-card": "0px 1px 2px 0px rgba(0, 0, 0, 0.2)",
    },
  },
};
export const plugins = [];