/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost:3000",
        pathname: "/_next/image",
      },
      {
        protocol: "https",
        hostname: "**test.yoldi.agency",
        port: "localhost:3000",
        pathname: "/api/image/**",
      },
    ],
  },
};

module.exports = nextConfig;
