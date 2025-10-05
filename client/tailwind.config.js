/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // ✅ เปิด dark mode
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#a78bfa", // ม่วงอ่อน
          DEFAULT: "#7c3aed", // ม่วงเข้ม
          dark: "#5b21b6", // ม่วงเข้มสุด
        },
      },
    },
  },
  plugins: [],
};
