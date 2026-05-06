/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'anarchy-red': '#e11d48',
        'anarchy-dark': '#0a0a0c',
        'anarchy-gray': '#1a1a1e',
      },
    },
  },
  plugins: [],
}
