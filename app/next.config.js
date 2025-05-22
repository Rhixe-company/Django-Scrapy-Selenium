/** @type {import('next').NextConfig} */
// const withImages = require("next-images");
const nextConfig = {
  // output: "standalone",
  output: "export",
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "gg.asuracomic.net",
        port: "",
        pathname: "/storage/media/**",
      },
    ],
  },
  reactStrictMode: true,
  // inlineImageLimit: false,
  // experimental: {
  //   serverActions: true,
  // },
};
module.exports = nextConfig;
// module.exports = withImages(nextConfig);
