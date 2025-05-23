import type { NextConfig } from "next";
// const withImages = require("next-images");
const nextConfig: NextConfig = {
  /* config options here */
  // output: "standalone",
  // output: "export",
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

export default nextConfig;
// module.exports = withImages(nextConfig);
