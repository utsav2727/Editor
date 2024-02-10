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
        colorPanel:"#f9f9f9"
      }
    },
  },
  plugins: [],
};