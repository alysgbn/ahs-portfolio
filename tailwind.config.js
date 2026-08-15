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
    extend: {
      animation: {
        gradient: "gradient 8s linear infinite",
      },
      keyframes: {
        gradient: {
          to: { backgroundPosition: "300% 0" },
        },
      },
    },
  },
  plugins: [heroui()],
};
