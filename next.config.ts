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
      {
        source: "/technology/calculator",
        destination: "/frp-profile-calculator",
        permanent: true,
      },
      {
        source: "/resources/blog/pultruded-spar-cap-laminates-wind-blades-gfrp-cfrp",
        destination: "/resources/blog/gfrp-pultruded-spar-cap-fatigue-wind-blade",
        permanent: true,
      },
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
