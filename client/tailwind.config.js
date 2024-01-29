/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // my colors
        // dark theme
        "dark-problem-page": "#0f0f0f",
        "dark-problem-page-2": "#262626",
        "dark-problem-page-alternate": "#303030",
        "offwhite": "#eceff1",
        "orange-main": "#3f2c10",

        // light theme
        "light-primary": "#FF7043",
        "light-primary-200": "#dc5329",
        "light-primary-300": "#8e0000",
        "light-background": "F5F5F5",
        "light-200": "#ebebeb",
        "light-300": "#c2c2c2",
        "light-text": "333333",

        // for git
        "dark-alternate": "#282828",
        "dark-primary": "#1a1a1a",
        "dark-layer-1": "rgb(40,40,40)",
        "dark-layer-2": "rgb(26,26,26)",
        "dark-label-2": "rgba(239, 241, 246, 0.75)",
        "dark-divider-border-2": "rgb(61, 61, 61)",
        "dark-fill-2": "hsla(0,0%,100%,.14)",
        "dark-fill-3": "hsla(0,0%,100%,.1)",
        "dark-gray-6": "rgb(138, 138, 138)",
        "dark-gray-7": "rgb(179, 179, 179)",
        "gray-8": "rgb(38, 38, 38)",
        "dark-gray-8": "rgb(219, 219, 219)",
        "brand-orange": "rgb(255 161 22)",
        "brand-orange-s": "rgb(193, 122, 15)",
        "dark-yellow": "rgb(255 192 30)",
        "dark-pink": "rgb(255 55 95)",
        "olive": "rgb(0, 184, 163)",
        "dark-green-s": "rgb(44 187 93)",
        "dark-blue-s": "rgb(10 132 255)",
      },

    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}