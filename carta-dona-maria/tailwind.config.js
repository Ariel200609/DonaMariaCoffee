/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Fuentes personalizadas
        script: ['"Dancing Script"', 'cursive'],
        sans: ['"Montserrat"', 'sans-serif'],
      },
      colors: {
        brand: {
          // Paleta exacta de Dona Maria
          red: '#950B36',      
          maroon: '#4A0D18',   
          cream: '#FFEBD8',    
          tan: '#A77B60',      
          brown: '#59382F',    
          pink: '#C41048',     
        }
      }
    },
  },
  plugins: [],
}