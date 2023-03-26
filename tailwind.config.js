/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'special': ['Avenir', 'Helvetica', 'Arial', 'sans-serif']
      },
    },
  },
  plugins: [],
}
