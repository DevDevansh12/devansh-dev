import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow HMR WebSocket connections when accessing the dev server from a
  // LAN IP address (helps prevent DNS-rebinding protection from blocking it).
  allowedDevOrigins: [
    "192.168.29.164",
    "192.168.29.164:3001",
    "localhost",
    "localhost:3001",
  ],
};

export default nextConfig;
