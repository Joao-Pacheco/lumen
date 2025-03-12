/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/lumen",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
