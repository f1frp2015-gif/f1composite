import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // 31-day TTL on the Vercel image optimizer cache. Our images use
    // descriptive content-based filenames, so a new image gets a new path
    // and there is no need to invalidate the optimizer cache between
    // deploys for the same path.
    minimumCacheTTL: 2_678_400,
    // Allowlist of <Image quality={...}> values. Required from Next 16.
    qualities: [60, 75, 85],
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
      // British → American slug normalization (commit 835a240) renamed these
      // posts. Preserve the indexed URLs so Google's links don't 404.
      {
        source: "/resources/blog/frp-window-profiles-powder-coating-aluminium-finish",
        destination: "/resources/blog/frp-window-profiles-powder-coating-aluminum-finish",
        permanent: true,
      },
      {
        source: "/resources/blog/frp-vs-aluminium-window-frames-comparison",
        destination: "/resources/blog/frp-vs-aluminum-window-frames-comparison",
        permanent: true,
      },
      // 2026-06-02: consolidated 5 thin "2026 signal" observation posts into a
      // single trends briefing. Preserve the indexed URLs.
      {
        source: "/resources/blog/what-leading-pultrusion-peers-are-signaling-2026",
        destination: "/resources/blog/pultrusion-industry-trends-2026",
        permanent: true,
      },
      {
        source: "/resources/blog/what-industry-associations-are-prioritizing-pultrusion-2026",
        destination: "/resources/blog/pultrusion-industry-trends-2026",
        permanent: true,
      },
      {
        source: "/resources/blog/what-jec-world-and-camx-reveal-about-pultrusion-2026",
        destination: "/resources/blog/pultrusion-industry-trends-2026",
        permanent: true,
      },
      {
        source: "/resources/blog/what-high-end-technical-forums-reveal-about-pultrusion-2026",
        destination: "/resources/blog/pultrusion-industry-trends-2026",
        permanent: true,
      },
      {
        source: "/resources/blog/recent-pultrusion-patents-and-new-technology-paths-2026",
        destination: "/resources/blog/pultrusion-industry-trends-2026",
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
