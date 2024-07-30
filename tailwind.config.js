/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(180deg, #0E1118 0%, #1D2330 100%)',
        'card-gradient' : 'linear-gradient(135deg, rgba(0, 110, 110, 0.45) 1.83%, rgba(9, 255, 255, 0.45) 98.17%); ',
        'slot-gradient': 'linear-gradient(90deg, white 0%, rgba(0, 255, 255, 0.45) 100%)',
      },
    },
  },
  plugins: [],
}
