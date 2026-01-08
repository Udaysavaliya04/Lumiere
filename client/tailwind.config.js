/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          400: "#E6C25B",
          500: "#D4AF37",
          600: "#B59325",
        },
        midnight: {
          800: "#1A1A2E",
          900: "#0F0F1A",
          950: "#050510",
        },
        cream: {
          50: "#FDFBF7",
          100: "#F7F4E9",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Montserrat", "sans-serif"],
      },
      backgroundImage: {
        "luxury-gradient": "linear-gradient(to right, #0F0F1A, #1A1A2E)",
      },
    },
  },
  plugins: [],
};
