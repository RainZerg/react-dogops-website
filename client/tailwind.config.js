/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  darkMode:"class",
  plugins: [
    nextui({
      prefix: "nextui",
      addCommonColors: false,
      defaultTheme: "dark",
      defaultExtendTheme: "dark",
      layout: {},
      themes: {
        dark: {
          layout: {},
          colors: {
            background: "#000000",
            foreground: "#FFFFFF",
            primary:{
              background: "#FFFFFF",
              foreground: "#000000",
              DEFAULT: "#BFFF00",
            },
          },
        },
      },
    })],
}

