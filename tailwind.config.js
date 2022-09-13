/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'black-lighten': '#06121e',
        primary: '#5179ff',
        secondary: '#cf2122',
        'gray-lighten': '#989898',
        // primary: "#bd0000",
        gray: '#989898',
        'gray-darken': '#3a3939',
        dark: '#1C1C1E',
        'dark-darken': '#19191b',
      },
      fontFamily: {
        sans: [
          'BlinkMacSystemFont',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Fira Sans',
          'Droid Sans',
          'Helvetica Neue',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
        segieui: ['Segieui', ...defaultTheme.fontFamily.sans],
        oswald: ['Oswald', ...defaultTheme.fontFamily.sans],
        roboto: ['Roboto', ...defaultTheme.fontFamily.sans],
        material: ['Material Icons', ...defaultTheme.fontFamily.sans],
        merriweather: ['Merriweather', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
