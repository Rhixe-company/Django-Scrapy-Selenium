const path = require("path");
const BundleTracker = require("webpack-bundle-tracker");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { SourceMapDevToolPlugin } = require("webpack");

module.exports = {
    context: path.join(__dirname, "../"),
    entry: {
        project: path.resolve(__dirname, "../", "api", "src", "project"),
        carousel: path.resolve(__dirname, "../", "api", "src", "carousel"),
        // alerts: path.resolve(__dirname, "../", "api", "src", "alerts"),
    },
    output: {
        path: path.resolve(__dirname, "../", "dist", "webpack_bundles"),
        publicPath: "/static/webpack_bundles/",
        filename: "js/[name]-[fullhash].js",
        chunkFilename: "js/[name]-[hash].js",
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            transpileOnly: true,
                        },
                    },
                ],
            },
            // {
            //     test: /\.jsx?$/,
            //     enforce: "pre",
            //     use: ["source-map-loader"],
            // },
            // we pass the output from babel loader to react-hot loader
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },

            {
                test: /\.s?css$/i,

                use: [
                    // fallback to style-loader in development
                    process.env.NODE_ENV !== "production"
                        ? "style-loader"
                        : MiniCssExtractPlugin.loader,
                    // Translates CSS into CommonJS
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                        },
                    },

                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                            postcssOptions: {
                                plugins: [
                                    "postcss-preset-env",
                                    "autoprefixer",
                                    "pixrem",
                                ],
                            },
                        },
                    },
                    // // Compiles Sass to CSS

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
                test: /\.(ttf|eot|svg|gif|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: "file-loader",
                    },
                ],
            },
            {
                test: /\.(jpe?g|png|gif|svg|webp)$/i,
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
        extensions: [".tsx", ".ts", ".cjs", ".js", ".jsx", "..."],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash].css",
            chunkFilename: "css/[id].css",
        }),
        new BundleTracker({
            path: path.resolve(
                path.join(__dirname, "../", "dist", "webpack_bundles"),
            ),
            filename: "webpack-stats.json",
        }),
        new SourceMapDevToolPlugin({
            filename: "[file].map",
        }),
    ],
    optimization: {
        minimize: true,
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
    target: ["web", "es6"],
};
