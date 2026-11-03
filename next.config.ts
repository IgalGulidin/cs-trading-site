import type { NextConfig } from "next";

// Security headers sent with every response.
// We'll add a strict Content-Security-Policy later, once we know which
// external sources (Steam images, etc.) the site needs.
const securityHeaders = [
  // Stops other sites from embedding us in an <iframe> (clickjacking protection)
  { key: "X-Frame-Options", value: "DENY" },
  // Stops browsers from guessing file types (MIME sniffing attacks)
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Don't leak full URLs to other sites when users click external links
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // We don't need camera/mic/location, so disable them entirely
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false, // don't advertise that we run Next.js
  images: {
    // Only allow <Image> to load from hosts we trust
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co" }, // mock images (temporary)
      { protocol: "https", hostname: "community.akamai.steamstatic.com" }, // Steam item images
      { protocol: "https", hostname: "community.fastly.steamstatic.com" },
      { protocol: "https", hostname: "avatars.steamstatic.com" }, // Steam avatars
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
