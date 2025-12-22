/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        palette: {
          bronze: '#D17F12',
          camel: '#BE9D75',
          white: '#FEFEFE',
          pearlAqua: '#85C3C8',
          darkCyan: '#568E93',
        },
      },
      fontFamily: {
        display: ['Bebas Neue', 'ui-sans-serif', 'system-ui'],
        sans: ['ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'Apple Color Emoji', 'Segoe UI Emoji'],
      },
    },
  },
  plugins: [],
}
