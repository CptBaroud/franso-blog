/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app.vue"], // you forget content
  darkMode: "class", //you should define darkMode here
  theme: {
    extend: {
      dropShadow: {
        base: "(0px 4px 4px rgba(0, 0, 0, 0.25))",
      },
      fontFamily: {
        Inconsolata: ["Inconsolata", "monospace"],
        Inter: ["Inter", "sans-serif"],
      },
      colors: {
        succes: "#22C55E",
        error: "#EF4444",
        warning: "#F97316",
        info: "#3B82F6",
        dark: "#1a1a1a",
        light: "#f1f1f1",
      },
      backgroundImage: (theme) => ({
        "light-start": "linear-gradient(180deg, #ffffff 0%, #f1f1f1 100%)",
        "light-end": "linear-gradient(180deg, #f1f1f1 0%, #ffffff 100%)",
        "dark-start": "linear-gradient(180deg, #000000 0%, #1a1a1a 100%)",
        "dark-end": "linear-gradient(180deg, #1a1a1a 0%, #000000 100%)",
      }),
    },
    fontSize: {
      xs: "0.4rem",
      sm: "0.8rem",
      base: "1rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
      "6xl": "4rem",
    },
    fontFamily: {
      sans: ["Inter"],
    },
  },
  plugins: [],
};
