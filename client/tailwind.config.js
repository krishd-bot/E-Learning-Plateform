/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6366f1",
          dark: "#4f46e5",
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        dudemy: {
          primary: "#6366f1",
          secondary: "#f59e0b",
          accent: "#10b981",
          neutral: "#1f2937",
          "base-100": "#ffffff",
          info: "#3abff8",
          success: "#22c55e",
          warning: "#f59e0b",
          error: "#ef4444",
        },
      },
      {
        dudemydark: {
          primary: "#818cf8",
          secondary: "#fbbf24",
          accent: "#34d399",
          neutral: "#e5e7eb",
          "base-100": "#111827",
          "base-200": "#1f2937",
          "base-300": "#374151",
          info: "#3abff8",
          success: "#22c55e",
          warning: "#f59e0b",
          error: "#ef4444",
        },
      },
    ],
  },
};
