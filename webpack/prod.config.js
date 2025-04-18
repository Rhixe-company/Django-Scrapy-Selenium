const { merge } = require("webpack-merge");
const commonConfig = require("./common.config");
const path = require("path");
// This variable should mirror the one from config/settings/production.py
const staticUrl = "/static/";

module.exports = merge(commonConfig, {
  mode: "production",
  devtool: "source-map",
  bail: true,
  output: {
    publicPath: `${staticUrl}webpack_bundles/`,
  },
  performance: { hints: false },
});
