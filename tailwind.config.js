/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Đặt Roboto lên đầu hệ thống font sans
        sans: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
