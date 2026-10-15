import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  images: { formats: ["image/avif", "image/webp"] },
  redirects: () => [
    { source: "/travel", destination: "/community", permanent: true },
    { source: "/music", destination: "/hobby", permanent: true },
  ],
};

export default nextConfig;
