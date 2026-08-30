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

// Only purpose-built, noindex tool routes may be framed. Every normal
// page keeps frame-ancestors 'none' and X-Frame-Options: DENY.
const EMBED_CONTENT_SECURITY_POLICY = CONTENT_SECURITY_POLICY.replace(
  "frame-ancestors 'none'",
  "frame-ancestors *",
);

const CANONICAL_ORIGIN = "https://www.f1composite.com";
const APEX_HOST = "f1composite.com";

// 2026-07-30 keyword-path migration. Keep this mapping in one place so the
// apex-host shortcut and the canonical-host path redirect cannot drift apart.
const KEYWORD_PATH_REDIRECTS = [
  ["/products/gratings", "/products/frp-gratings"],
  ["/products/standard-profiles", "/products/fiberglass-structural-shapes"],
  [
    "/products/standard-profiles/i-beam",
    "/products/fiberglass-structural-shapes/frp-i-beam",
  ],
  [
    "/products/standard-profiles/angle",
    "/products/fiberglass-structural-shapes/frp-angle",
  ],
  [
    "/products/standard-profiles/channel",
    "/products/fiberglass-structural-shapes/frp-channel",
  ],
  [
    "/products/standard-profiles/square-tube",
    "/products/fiberglass-structural-shapes/frp-square-tube",
  ],
  [
    "/products/standard-profiles/tube",
    "/products/fiberglass-structural-shapes/frp-tube",
  ],
  [
    "/products/standard-profiles/flat-bar",
    "/products/fiberglass-structural-shapes/frp-flat-bar",
  ],
  [
    "/products/standard-profiles/rod",
    "/products/fiberglass-structural-shapes/frp-rod",
  ],
  ["/products/custom-pultrusions", "/products/custom-pultruded-profiles"],
  ["/products/solar-mounting-systems", "/products/frp-solar-mounting-systems"],
  ["/products/fenestration-systems", "/products/frp-window-frames"],
  ["/products/facade-sunshade-panels", "/products/frp-facade-panels"],
  ["/products/window-reinforcement-profiles", "/products/frp-window-reinforcement"],
  ["/products/stair-tread-covers", "/products/frp-stair-treads"],
  ["/products/handrail-systems", "/products/frp-handrail-systems"],
  ["/products/snow-markers", "/products/fiberglass-snow-markers"],
  ["/products/snow-stakes", "/products/fiberglass-snow-markers"],
  ["/technology/u-value-calculator", "/technology/frp-u-value-calculator"],
] as const;

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
      // Resolve migrated apex-host URLs directly to their final canonical URL.
      // These specific rules must precede the catch-all host normalization rule
      // below; otherwise an apex request first lands on the same legacy path at
      // www and needs a second application-level redirect.
      ...KEYWORD_PATH_REDIRECTS.map(([source, destination]) => ({
        source,
        has: [{ type: "host" as const, value: APEX_HOST }],
        destination: `${CANONICAL_ORIGIN}${destination}`,
        statusCode: 301 as const,
      })),
      // Normalize every other apex-host URL to www. Vercel's production domain
      // must also use www as primary so HTTP apex requests do not receive an
      // additional platform-level HTTPS hop in front of this rule.
      {
        source: "/:path*",
        has: [{ type: "host", value: APEX_HOST }],
        destination: `${CANONICAL_ORIGIN}/:path*`,
        permanent: true,
      },
      {
        source: "/products",
        destination: "/pultruded-frp-profiles",
        permanent: true,
      },
      // Consolidate common singular and FRP-name variants into the commercial
      // query owner. These are aliases only; the canonical plural keyword path
      // is the page advertised in navigation, metadata and sitemap.
      ...[
        "/products/frp-stake",
        "/products/frp-stakes",
        "/products/fiberglass-stake",
      ].map((source) => ({
        source,
        destination: "/products/fiberglass-stakes",
        permanent: true,
      })),
      // Preserve the legacy name used in older audits and external links. The
      // live, indexable estimator owns the more specific commercial query.
      {
        source: "/price-estimator",
        destination: "/fiberglass-pultruded-profile-price",
        permanent: true,
      },
      // 2026-07-30 keyword-path migration. Keep every previously published
      // product/tool URL as a permanent redirect while all internal signals
      // point directly at the new canonical route.
      ...KEYWORD_PATH_REDIRECTS.map(([source, destination]) => ({
        source,
        destination,
        statusCode: 301 as const,
      })),
      // Normalize the original short application slugs to the descriptive,
      // query-owned canonical routes generated from lib/applicationPages.ts.
      ...[
        "cable-tray-supports",
        "cooling-tower-profiles",
        "bridge-deck-panels",
        "solar-mounting-profiles",
        "chemical-plant-platforms",
        "pedestrian-bridge-superstructures",
      ].map((slug) => ({
        source: `/applications/${slug}`,
        destination: `/applications/frp-${slug}`,
        permanent: true,
      })),
      {
        source: "/technology/calculator",
        destination: "/frp-profile-calculator",
        permanent: true,
      },
      {
        source: "/frp-calculator",
        destination: "/frp-profile-calculator",
        statusCode: 301,
      },
      {
        source: "/resources/ddp-tariff-hs-code-guide",
        destination: "/resources/frp-pultrusion-fob-ddp-export-guide",
        statusCode: 301,
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
      ...[
        "/frp-profile-calculator/embed",
        "/frp-span-tables/embed",
        "/ai/passive-house/embed",
      ].map((source) => ({
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
