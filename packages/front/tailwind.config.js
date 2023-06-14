/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#141414",
        primary: "#5B8FB9",
        secondary: "#301E67",
        text: "#94a3b8",
        title: "#e2e8f0",
      },
    },
  },
  plugins: [import("@tailwindcss/forms")],
};
