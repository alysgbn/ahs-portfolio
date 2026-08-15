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
        "shiny-text": "shiny-text 8s infinite",
      },
      keyframes: {
        "shiny-text": {
          "0%, 90%, 100%": {
            "background-position": "calc(-100% - var(--shiny-width)) 0",
          },
          "30%, 60%": {
            "background-position": "calc(100% + var(--shiny-width)) 0",
          },
        },
      },
    },
  },
  plugins: [heroui()],
};
