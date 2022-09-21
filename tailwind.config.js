/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#dd003f',
        secondary: '#cf2122',
        gray: '#989898',
        dark: '#1C1C1E',
        error: '#bf1650',
        'black-lighten': '#06121e',
        'gray-lighten': '#989898',
        'gray-darken': '#3a3939',
        'dark-darken': '#19191b',
        'dark-lighten': '#333335',
      },
      fontFamily: {
        sans: ['BlinkMacSystemFont', '-apple-system', 'Segoe UI', 'Roboto', 'Oxygen', 'sans-serif'],
        segieui: ['Segieui', ...defaultTheme.fontFamily.sans],
        oswald: ['Oswald', ...defaultTheme.fontFamily.sans],
        roboto: ['Roboto', ...defaultTheme.fontFamily.sans],
        material: ['Material Icons', ...defaultTheme.fontFamily.sans],
        merriweather: ['Merriweather', ...defaultTheme.fontFamily.sans],
      },

      borderWidth: {
        DEFAULT: '1px',
        3: '3px',
      },
      listStyleType: {
        circle: 'circle',
      },
      boxShadow: {
        img: '0 0 0 2px #cc7b19',
      },
    },
  },
  plugins: [],
};
