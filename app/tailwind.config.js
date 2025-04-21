/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
  content: [
    "./api/templates/**/**/**/**/*.html",
    "./src/**/**/**/*.ts",
    "./src/**/**/**/*.js",
    "./node_modules/flowbite/**/*.js",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        themecolor: "#913fe2",
        // primary: {
        //   50: "#eff6ff",
        //   100: "#dbeafe",
        //   200: "#bfdbfe",
        //   300: "#93c5fd",
        //   400: "#60a5fa",
        //   500: "#3b82f6",
        //   600: "#2563eb",
        //   700: "#1d4ed8",
        //   800: "#1e40af",
        //   900: "#1e3a8a",
        //   950: "#172554",
        // },
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
    require("@tailwindcss/typography"),
    require("flowbite/plugin"),
    require("./plugin")({
      charts: true,
      forms: true,
      tooltips: true,
      datatables: true,
      wysiwyg: true,
    }),
    require("daisyui"),
  ],
  // daisyUI config (optional - here are the default values)
  daisyui: {
    // themes: {
    //   mytheme: {
    //     // You should define your custom theme here
    //     // If you want to extend from an existing DaisyUI theme, use extend instead of the spread operator
    //     extend: {
    //       theme: "retro",
    //       primary: "magenta",
    //     },
    //     // You should define your custom styles for .btn like this
    //     btn: {
    //       "border-radius": "1px",
    //       "border-width": "10px",
    //       color: "yellow",
    //     },
    //   },
    // },
    // darkTheme: "dark", // name of one of the included themes for dark mode
    // base: true, // applies background color and foreground color for root element by default
    // styled: true, // include daisyUI colors and design decisions for all components
    // utils: true, // adds responsive and modifier utility classes
    // prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    // logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    // themeRoot: ":root", // The element that receives theme color CSS variables
  },
};
