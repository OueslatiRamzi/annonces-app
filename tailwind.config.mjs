/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3498db",
        secondary: "#BE123C",
      },
      fontFamily: {
        itim: ["Itim", "cursive"],
        montserrat: ["Montserrat", "sans-serif"],
        custom: ["Arial", "sans-serif"], // Change cette police si nécessaire
      },
    },
  },
  plugins: [],
};
