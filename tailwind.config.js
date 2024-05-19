/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", " ./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#161630",
        secondary: {
          DEFAULT: "#FF9C01",
          100: "#FF9001",
          200: "#FF8E01",
        },
        black: {
          DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#232533",
        },
        white: {
          DEFAULT: "#FFF",
          100: "#F5F5F5",
          200: "#F9F9F9",
        },
        gray: {
          100: "#CDCDE0",
        },
        pastelblue:{
          DEFAULT: "#A7C7E7",
        }
      },
    },
  },
  plugins: [],
}

