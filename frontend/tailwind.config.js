/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
  fontFamily: {
    display: ['"Playfair Display"', 'serif'],
    body: ['Inter', 'sans-serif']
  }
}
  },
  plugins: [],
}

