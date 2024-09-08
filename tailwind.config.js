/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      "dropShadow": {
        "card": "0px 2px 8px #000421"
      },
      "spacing": {
        "card": "-6.7rem"
      }
    },
    colors: {
      "light-purple": "#D48AE0",
      "medium-purple": "#7B4F82",
      "medium-dark-purple": "#4D3052",
      "dark-purple": "#000421",
    }
  },
  plugins: [],
};
