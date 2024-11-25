/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(68, 114, 196)', 
        secondary: 'rgb(142, 169, 219)',
      },
      maxWidth: {
        '1/2': '50%',
      },
      screen: {
        'mobile': '450px'
      }
    },
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
    },
  },
  plugins: [],
}