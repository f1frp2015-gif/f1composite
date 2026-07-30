import type { NextConfig } from "next";

// Content-Security-Policy. Allowlist is the full set of origins the site loads:
//   - 'self'                       app pages, /api/* (incl. AI streaming), images, self-hosted next/font
//   - googletagmanager / *-analytics / doubleclick   Google Analytics 4 (gtag)
//   - analytics.ahrefs.com         Ahrefs Web Analytics loader + beacon
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
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://*.googletagmanager.com https://www.google-analytics.com https://analytics.ahrefs.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.google-analytics.com https://*.googletagmanager.com https://*.g.doubleclick.net",
  "font-src 'self'",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://*.g.doubleclick.net https://analytics.ahrefs.com https://vitals.vercel-insights.com",
  "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com",
  "manifest-src 'self'",
  // Keep local HTTP previews usable while preserving automatic upgrades on the
  // production HTTPS deployment.
  process.env.NODE_ENV === "production" ? "upgrade-insecure-requests" : "",
]
  .filter(Boolean)
  .join("; ");

// Only the two purpose-built, noindex tool routes may be framed. Every normal
// page keeps frame-ancestors 'none' and X-Frame-Options: DENY.
const EMBED_CONTENT_SECURITY_POLICY = CONTENT_SECURITY_POLICY.replace(
  "frame-ancestors 'none'",
  "frame-ancestors *",
);

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
      // Normalize the canonical host before route-specific redirects. Vercel's
      // production domain must also use www as the primary domain so HTTP apex
      // requests do not receive an extra platform-level HTTPS hop.
      {
        source: "/:path*",
        has: [{ type: "host", value: "f1composite.com" }],
        destination: "https://www.f1composite.com/:path*",
        permanent: true,
      },
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
      // Consolidated into the deeper process owner to remove same-intent
      // keyword competition while preserving backlinks to the old article.
      {
        source: "/resources/blog/what-is-pultrusion",
        destination: "/technology/pultrusion-process",
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
      ...["/frp-profile-calculator/embed", "/frp-span-tables/embed"].map((source) => ({
        source,
        headers: [
          { key: "Content-Security-Policy", value: EMBED_CONTENT_SECURITY_POLICY },
          // Override the global DENY header. Modern browsers enforce the more
          // expressive CSP frame-ancestors directive above.
          { key: "X-Frame-Options", value: "ALLOWALL" },
          { key: "X-Robots-Tag", value: "noindex, follow" },
        ],
      })),
      {
        // Build assets are required for rendering, so keep them crawlable, but
        // they are not search-result documents. Vercel/Next deployment skew
        // protection gives these URLs a short-lived `?dpl=` version marker;
        // explicitly exclude the resources from the search index while they
        // are live so stale deployment URLs do not compete with real pages.
        source: "/_next/static/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
    ];
  },
};

export default nextConfig;
