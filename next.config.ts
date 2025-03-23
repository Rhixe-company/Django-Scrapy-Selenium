import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/media/**",
        search: "",
      },
    ],
  },
  reactStrictMode: false,
  devIndicators: {
    // buildActivity: false,
  },
  experimental: {
    turbo: {
      // ...
    },
  },
  webpack: function (config) {
    return config;
  },
  sassOptions: {
    api: "modern-compiler",
    sassOptions: {
      // Your sass options
    },
  },
};

module.exports = nextConfig;
