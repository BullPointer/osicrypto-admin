/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "slide-in": {
          "0%": {
            width: "0px",
          },
          "100%": {
            width: "330px",
          },
        },
      },
      animation: {
        "slide-in": "slide-in 0.5s ease-out",
      },
    },
  },
  // plugins: [],
  plugins: [
    require('@tailwindcss/typography'),
    // ...
  ],
};
