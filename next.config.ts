import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: false, // Google SDK (accounts.id.initialize) tidak kompatibel dengan Strict Mode double-invoke
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "duniakedol.online",
      },
    ],
  },
};

export default nextConfig;
