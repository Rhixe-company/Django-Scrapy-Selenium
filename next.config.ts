// /** @type {import('next').NextConfig} */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
   eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

// const nextConfig = {
//   experimental: {
//     // appDir: true,
//     serverActions: true,
//   },
//   images: {
//     remotePatterns: [
//       {
//         protocol: "http",
//         hostname: "127.0.0.1",
//         port: "8000",
//         pathname: "/media/**",
//       },
//       {
//         protocol: "https",
//         hostname: "gg.asuracomic.net",
//         port: "",
//         pathname: "/storage/media/**",
//       },
//     ],
//   },
// };
// module.exports = nextConfig;
