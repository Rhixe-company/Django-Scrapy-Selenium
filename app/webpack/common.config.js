const path = require("path");
const BundleTracker = require("webpack-bundle-tracker");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const postcssCascadeLayers = require("@csstools/postcss-cascade-layers");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { SourceMapDevToolPlugin } = require("webpack");

module.exports = {
  target: ["web", "es5"],
  context: path.join(__dirname, "../"),
  entry: {
    project: path.resolve(__dirname, "../", "src", "project"),
    vendors: path.resolve(__dirname, "../", "src", "vendors"),
  },
  output: {
    path: path.resolve(__dirname, "../", "dist", "webpack_bundles"),
    publicPath: "/static/webpack_bundles/",
    filename: "js/[name]-[fullhash].js",
    chunkFilename: "js/[name]-[hash].js",
    clean: true,
  },
  plugins: [
    new BundleTracker({
      path: path.resolve(path.join(__dirname, "../", "dist")),
      filename: "webpack-stats.json",
    }),
    new MiniCssExtractPlugin({ filename: "css/[name].[contenthash].css" }),
    new SourceMapDevToolPlugin({
      filename: "source/[file].map",
    }),
  ],
  module: {
    rules: [
      // we pass the output from babel loader to react-hot loader
      {
        test: /\.js?x$/i,
        enforce: "pre",
        use: ["source-map-loader"],
      },
      {
        test: /\.js?x$/i,
        loader: "babel-loader",
      },
      {
        test: /\.ts?x$/i,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.s?css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  postcssCascadeLayers,
                  "postcss-preset-env",
                  "autoprefixer",
                  "pixrem",
                ],
              },
            },
          },
          // // Compiles Sass to CSS
          // "resolve-url-loader",
          {
            loader: "sass-loader",
            options: {
              api: "modern-compiler",
              sassOptions: {
                // Your sass options
              },
              implementation: require("sass"),
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "/assets/[name].[ext]",
              publicPath: "/assets",
            },
          },
        ],
      },
      {
        test: /\.(ttf|eot|svg|gif|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "/assets/[name].[ext]",
              publicPath: "/assets",
            },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".jsx", ".ts", ".tsx", "..."],
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        include: /\.min\.(css|js)$/,
        extractComments: false,
        terserOptions: {
          format: {
            comments: false,
          },
        },
      }),
    ],
  },
};
