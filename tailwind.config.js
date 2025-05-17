/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"], // Scan all React files
  darkMode: "class", // Enable dark mode using 'class' strategy
  theme: {
    extend: {
      colors: {
        primary: "#7C3AED",        // Tailwind purple-600 for buttons
        background: "#1e1e2f",     // Dark mode background
        panel: "#1f1f2e",          // Slightly lighter for panels/cards
        field: "#2a2a3d",          // Input fields and similar elements
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Global font style
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      boxShadow: {
        glass: "0 10px 40px rgba(0,0,0,0.2)", // Soft depth for UI panels
      },
    },
  },
  plugins: [],
};
