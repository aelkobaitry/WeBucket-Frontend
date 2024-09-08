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
      midnight: "#000421",
      mainPurple: "#D48AE0",
      darkerPurple: "#A778AF",
      hoverPurple: "#866193",
      transparent: "transparent",
      white: "white",
      black: "black",
    },
    boxShadow: {
      custom: "-2px 5px 10px rgba(0, 0, 0, 0.25)",
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
        righteous: ["Righteous"]
    },
    keyframes: {
      fall: {
        "0%": { transform: "translateY(-25%)", opacity: 1 },
        "100%": { transform: "translateY(100vh)", opacity: 0 },
      },
    },
    animation: {
      move: "fall 30s linear infinite",
    },
  },
  plugins: [],
};
