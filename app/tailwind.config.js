/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
  content: ["./api/templates/**/*.html", "./src/**/*.ts", "./src/**/*.js"],
  darkMode: "class",
  theme: {
    extend: {
      // sidebar mobile fix
      maxWidth: {
        "2xs": "16rem",
        "8xl": "90rem",
      },
      fontFamily: {
        sans: [
          "Fira",
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
          "Fira",
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
      fontSize: {
        "2xs": "0.625rem",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
    },
  },
  plugins: [
    require("./plugin")({
      charts: true,
      forms: true,
      tooltips: true,
      datatables: true,
      wysiwyg: true,
    }),
    require("flowbite-typography"),
  ],
};
