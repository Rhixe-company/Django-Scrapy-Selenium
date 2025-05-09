/* eslint-disable @typescript-eslint/no-var-requires */

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    "postcss-import": {},
    "postcss-calc": {},
    "postcss-simple-vars": {},
    "postcss-nested": {},
    "postcss-preset-env": {},
    cssnano:
      process.env.NPM_ENV === "production" ? { preset: "default" } : false,
  },
};
