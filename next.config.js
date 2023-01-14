/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**test.yoldi.agency",
        port: "",
        pathname: "/api/image/**",
      },
    ],
  },
};

module.exports = nextConfig;
