import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve modern formats — avif first (smallest), webp as fallback
    formats: ["image/avif", "image/webp"],
  },
  // Allow HMR WebSocket connections when accessing the dev server from a LAN IP
  allowedDevOrigins: [
    "192.168.29.164",
    "192.168.29.164:3001",
    "localhost",
    "localhost:3001",
  ],
};

export default nextConfig;
