import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  turbopack: {
    root: process.cwd(),
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        // The Vercel address serves the same pages as the real domain. Keep it
        // out of search results so the two never compete with each other.
        source: "/:path*",
        has: [{ type: "host", value: "im-website-rose.vercel.app" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }],
      },
    ];
  },
};

export default nextConfig;
