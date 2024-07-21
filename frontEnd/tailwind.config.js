/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        expand: {
          "0%": {
            transform: "null",
            with: "0",
            transitionTimingFunction: "cubic-bezier(0,0,0.2,1)",
          },
          "100%": {
            // transform: "translateX(100%)",
            with: "full",
            transitionTimingFunction: "cubic-bezier(0,0,0.2,1)",
          },
        },
      },
      animation: {
        expand: "expand 1s",
      },
    },
  },
  plugins: [],
};
