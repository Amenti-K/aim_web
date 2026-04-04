import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export", // Removed to allow dynamic routes without generateStaticParams
  images: {
    unoptimized: true,
    remotePatterns: [],
  },
  eslint: {
    // ✅ Vercel won’t fail build because of ESLint
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
