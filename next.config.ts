import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'notehub-api.goit.study', 
      },
    ],
  },
};

export default nextConfig;
