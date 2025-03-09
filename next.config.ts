/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/lumen",
  images: {
    unoptimized: true,
  },
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
};

module.exports = nextConfig;
