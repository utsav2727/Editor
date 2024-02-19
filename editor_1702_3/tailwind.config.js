/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      
      colors:{
        primary:"rgb(59 130 246 )",
        colorPanel:"#f9f9f9",
        main:"#FFFFFF",
        secondary:"#151E3F",
        hover:"#030027",
        third:"#C16E70",
        hoverSecondary:"#A6808C"
      }
    },
  },
  plugins: [],
};