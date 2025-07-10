/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins"],
      },

      colors: {
        "primary-blue": "#3366FF",
        "primary-gray": " #8F9BB3",
        "soft-gray": "#F7F9FC",
        "primary-red": "#E40202",
        "light-blue": "#E9EFFF",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
