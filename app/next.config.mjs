/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/media/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "gg.asuracomic.net",
        port: "",
        pathname: "/storage/media/**",
        search: "",
      },
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
