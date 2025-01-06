/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./client/index.html",
    "./client/src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  darkMode:"class",
  plugins: [nextui({
    themes: {
      dark: {
        colors: {
          background: "#000000",
          foreground: "#FFFFFF",
          primary: "BFFF00",
        }
      }
    }
  })],
}

