import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export", // Removed to allow dynamic routes without generateStaticParams
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "img.icons8.com",
      },
      {
        protocol: "https",
        hostname: "icons8.com",
      },
    ],
  },
  eslint: {
    // ✅ Vercel won’t fail build because of ESLint
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
