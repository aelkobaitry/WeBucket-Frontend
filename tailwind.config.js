/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      "dropShadow": {
        "card": "0px 2px 8px #000421",
        "card-title": "-4px 4px 10px rgba(0, 0, 0, 0.25)",
        "btn": "0px 4px 4px rgba(0, 0, 0, 0.25)"
      },
      "spacing": {
        "card": "-6.7rem"
      },
      "boxShadow": {
        "input": "inset 0 0 3px #000421"
      },
      "fontFamily": {
        "title": ["righteous", "sans-serif"]
      },
      "borderWidth": {
        "3": "3px"
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
