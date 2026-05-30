import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        // ব্রাউজার এই রুটে রিকোয়েস্ট পাঠাবে
        source: '/server/:path*',
        // আপনার .env ফাইলের NEXT_PUBLIC_BASE_URL ডাইনামিকালি এখানে বসে যাবে
        destination: `${process.env.NEXT_PUBLIC_BASE_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;


