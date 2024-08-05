/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bleuFonce: '#21283B',
        orange: '#F96C25',
        grisFonce: '#868E9B',
        grisPale: '#B8BBC4',
        blanc: '#F5F5F5',
      },
      fontFamily: {
        titre: ['Exo', 'sans-serif'],
        soustitre: ['Droid Sans', 'sans-serif'],
        paragraphe: ['Hind Madurai', 'sans-serif'],
      },
      screens: {
        'md-lg': {'min': '1000px', 'max': '1279px'},
      },
    },
  },
  plugins: [],
}
