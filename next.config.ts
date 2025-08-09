import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dffo9wq7x/**",
      },
    ],
  },
  experimental: {
    swcMinify: true,
    swcFileReading: false,
    workerThreads: true,
  },
};

export default nextConfig;