/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin')
module.exports = {
  content: [
    "./api/templates/**/**/**/*.html",
    "./src/**/**/**/*.{js,ts,jsx,tsx,mdx,scss}",
    "./node_modules/flowbite/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        themecolor: "#913fe2",
      },
      fontFamily: {
        sans: [
          "Fira Sans",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
        body: [
          "Fira Sans",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
      },
    },
  },
  variants: {},
  plugins: [
    require("@tailwindcss/forms"),
    require("flowbite"),
    require("@tailwindcss/typography"),
    plugin(function({ addUtilities, addComponents, e, config }) {
      // Add your custom styles here

    }),

//     require('./plugin')({
//       charts: false,
//       forms: true,
//       tooltips: true,
//       datatables: true,
//       wysiwyg: false,
//   }),
  ],
};
