const tailwindScrollbar = require('tailwind-scrollbar');
module.exports = {
  purge: ['./src/**/*/.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [tailwindScrollbar],
};
