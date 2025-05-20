// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class', // Important for class-based toggling
    content: [
      './app/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
      './pages/**/*.{js,ts,jsx,tsx}', // add this if you're using /pages
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  