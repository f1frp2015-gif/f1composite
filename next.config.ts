import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/products",
        destination: "/pultruded-frp-profiles",
        permanent: true,
      },
      // Legacy URL → current URL (resolves GSC "Redirect error" / "Discovered-not-indexed" backlog)
      { source: "/products/i-beam", destination: "/products/standard-profiles/i-beam", permanent: true },
      { source: "/products/grating", destination: "/products/gratings", permanent: true },
      { source: "/i-beam", destination: "/products/standard-profiles/i-beam", permanent: true },
      { source: "/grating", destination: "/products/gratings", permanent: true },
      { source: "/window", destination: "/products/fenestration-systems", permanent: true },
      { source: "/calculator", destination: "/technology/calculator", permanent: true },
      { source: "/u-value", destination: "/technology/u-value-calculator", permanent: true },
      { source: "/saudi-arabia", destination: "/regions/frp-grating-supplier-saudi-arabia", permanent: true },
      { source: "/australia", destination: "/regions/pultruded-frp-solar-mounting-australia", permanent: true },
      { source: "/uae", destination: "/regions/frp-cable-tray-uae-oil-gas", permanent: true },
      { source: "/regions", destination: "/", permanent: true },
      { source: "/blog", destination: "/resources/blog", permanent: true },
      { source: "/blog/:slug", destination: "/resources/blog/:slug", permanent: true },
      { source: "/case-study", destination: "/case-studies", permanent: true },
      { source: "/case-study/:slug", destination: "/case-studies/:slug", permanent: true },
      { source: "/passive-house", destination: "/ai/passive-house", permanent: true },
      { source: "/sourcing", destination: "/ai/sourcing", permanent: true },
      {
        source: "/:path*",
        has: [{ type: "host", value: "f1composite.com" }],
        destination: "https://www.f1composite.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "f1frp.com" }],
        destination: "https://www.f1composite.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.f1frp.com" }],
        destination: "https://www.f1composite.com/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
