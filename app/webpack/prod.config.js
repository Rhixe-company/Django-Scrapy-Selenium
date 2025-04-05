const { merge } = require("webpack-merge");
const commonConfig = require("./common.config");

// This variable should mirror the one from config/settings/production.py
const staticProdUrl = `https://storage.googleapis.com/${process.env.DJANGO_GCP_STORAGE_BUCKET_NAME}/static/`;
const staticDevUrl = "/static/";

module.exports = merge(commonConfig, {
  mode: "production",
  devtool: "source-map",
  bail: true,
  output: {
    publicPath: `${staticDevUrl}webpack_bundles/`,
  },
});
