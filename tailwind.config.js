/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            primary: "#3b82f6", // Blue
            primaryHover: "#2563eb", // Darker blue
            danger: "#ef4444", // Red
            dangerHover: "#dc2626", // Darker red
            disabled: "#9ca3af", // Gray
            grayBase: "#6b7280", 
            grayHover: "#4b5563",
          },
    },
  },
  plugins: [],
}

