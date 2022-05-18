module.exports = {
  content: ["./src/**/*.tsx"], // Modificado na aula 
  theme: {
    extend: {
      colors: {
        brand: {
          300:'#8257e6',
          500:'#8257e6'
        }
      },
      borderRadius:{
        md:'4px'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar')
  ],
}
