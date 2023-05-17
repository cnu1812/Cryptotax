/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        paragraph: ['DM Sans', 'sans-serif'],
        title: ['Space Grotesk', 'sans-serif']
      }
    },
  },
  plugins: [],
}
