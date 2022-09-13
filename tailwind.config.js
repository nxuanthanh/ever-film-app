/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "black-lighten": "#06121e",
        primary: "#5179ff",
        "gray-lighten": "#989898",
        // primary: "#bd0000",
        gray: "#989898",
        "gray-darken": "#3a3939",
        dark: "#1C1C1E",
        "dark-darken": "#19191b",
      },
      fontFamily: {
        montserrat: ["Montserrat", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
