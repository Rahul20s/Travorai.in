/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#FAECE7', // --color-primary-light
          100: '#F4D8CF',
          200: '#EAB09E',
          300: '#E0886D',
          400: '#D85A30', // --color-primary (coral)
          500: '#D85A30', 
          600: '#D85A30', // Used for CTAs
          700: '#C24E28', // --color-primary-hover
          800: '#943A1B',
          900: '#4A1B0C', // --color-primary-dark
        },
        slate: {
          50: '#FAF8F3', // --bg-page
          100: '#F5F2EA', // --bg-card-alt
          200: '#E5E1D6', // --border
          300: '#D4CFC0',
          400: '#A39E93',
          500: '#888780', // --text-muted
          600: '#5F5E5A', // --text-secondary
          700: '#4A4946',
          800: '#2C2C2A', // --text-primary
          900: '#1A1A18',
          950: '#0F0F0E',
        },
        teal: {
          50: '#E1F5EE', // --color-secondary-light
          100: '#C3EBE0',
          500: '#0F6E56', // --color-secondary
          600: '#0F6E56', 
          700: '#0C5A46', // --color-secondary-hover
          900: '#04342C', // --color-secondary-dark
        },
        sand: '#F5EDE2',
        accent: '#FF6F3C',
        night: {
          DEFAULT: '#24324B',
          accent: '#FF6F3C',
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
