/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Poppins', 'cursive']
    },
    extend: {
      screens: {
        base: '0px'
      }
    }
  },
  plugins: []
}
