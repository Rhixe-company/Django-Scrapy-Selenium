const { merge } = require("webpack-merge");
const commonConfig = require("./common.config");
const path = require("path");
module.exports = merge(commonConfig, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    port: 3000,
    proxy: [
      {
        context: ["/"],
        target: "http://localhost:8000",
      },
    ],
    client: {
      progress: true,
      overlay: {
        errors: true,
        warnings: true,
        runtimeErrors: true,
      },
    },
    static: {
      directory: path.join(__dirname, "../", "api", "templates"),
    },
    // We need hot=false (Disable HMR) to set liveReload=true
    hot: false,
    liveReload: true,
    open: true,
    compress: true,
    historyApiFallback: true,
  },
});
