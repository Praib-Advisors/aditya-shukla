import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  turbopack: { root: __dirname },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1600, 1920],
    imageSizes: [32, 64, 96, 128, 256, 384],
    qualities: [75, 85],
  },
};

export default nextConfig;
