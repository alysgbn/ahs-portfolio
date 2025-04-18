/** @type {import('tailwindcss').Config} */
const { heroui } = require("@heroui/theme");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@heroui/theme/dist/components/card.js",
    "./node_modules/@heroui/theme/dist/components/navbar.js",
    "./node_modules/@heroui/theme/dist/components/button.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [heroui()],
};
