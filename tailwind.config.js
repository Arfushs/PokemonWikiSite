/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        pokeRed: "#CC0000",
        pokeYellow: "#FFCC00",
        pokeBlue: "#3B4CCA",
        pokeDark: "#1a1a2e",
      },
    },
  },
  plugins: [],
}

