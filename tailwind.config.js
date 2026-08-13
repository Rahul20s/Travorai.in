/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        sand: '#F5EDE2',
        accent: '#FF6F3C',
        night: {
          DEFAULT: '#24324B', // Deep navy
          accent: '#FF6F3C', // Retain sunset orange accent in dark mode
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
