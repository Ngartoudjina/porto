import type { NextConfig } from "next";

const nextConfig = {
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

     module.exports = {
    experimental: {
      swcMinify: true,
      // Activer le cache persistant
      swcFileReading: false,
      workerThreads: true,
    },
  }

    compiler: {
      experimental: {
        plugins: [['superjson', {}]]
      }
    }
   };
   


export default nextConfig;
