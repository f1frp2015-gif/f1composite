import type { NextConfig } from "next";

// Content-Security-Policy. Allowlist is the full set of origins the site loads:
//   - 'self'                       app pages, /api/* (incl. AI streaming), images, self-hosted next/font
//   - googletagmanager / *-analytics / doubleclick   Google Analytics 4 (gtag)
//   - vitals.vercel-insights.com   Vercel Speed Insights beacon
// script-src/style-src keep 'unsafe-inline' because Next injects inline bootstrap
// scripts and the GA component an inline gtag-config block; removing it requires a
// per-request nonce via middleware (future hardening). Even so, object-src 'none',
// base-uri/form-action 'self' and frame-ancestors 'none' close large attack classes.
const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://*.googletagmanager.com https://www.google-analytics.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.google-analytics.com https://*.googletagmanager.com https://*.g.doubleclick.net",
  "font-src 'self'",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://*.g.doubleclick.net https://vitals.vercel-insights.com",
  "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com",
  "manifest-src 'self'",
  "upgrade-insecure-requests",
].join("; ");

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
        // Word-order typo seen in shared links and audit notes.
        source: "/frp-pultruded-profiles",
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
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: CONTENT_SECURITY_POLICY },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
