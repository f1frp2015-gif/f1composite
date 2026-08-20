import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import "./globals.css";

// Self-hosted DM Sans (variable, wght 400-800) — next/font/google fetched
// from fonts.googleapis.com at BUILD time, which made every build depend on
// that host being reachable; one blocked SNI = failed deploy. Same v17 files
// Google serves, now vendored in app/fonts/.
const dmSans = localFont({
  src: "./fonts/dm-sans-latin.woff2",
  weight: "400 800",
  style: "normal",
  display: "swap",
  variable: "--font-dm-sans",
});

// Keep one canonical GA4 destination and exclude Vercel previews from
// production analytics and tag diagnostics.
const GA4_MEASUREMENT_ID = "G-TQV5E2KGGK";
const shouldLoadGA4 =
  process.env.NODE_ENV === "production" &&
  process.env.VERCEL_ENV !== "preview";

export const metadata: Metadata = {
  title: {
    default: "F1 Composite — Pultruded FRP Profiles Manufacturer",
    template: "%s | F1 Composite",
  },
  description:
    "Leading pultruded FRP profiles and fiberglass structural shapes manufacturer. I-beams, channels, angles, custom pultrusions, FRP window frames & window profiles, gratings & deck panels. ISO 9001, EN 13706, 30+ countries.",
  metadataBase: new URL("https://www.f1composite.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "F1 Composite",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
  verification: {
    ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION && {
      google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
    }),
    ...(process.env.NEXT_PUBLIC_BING_VERIFICATION && {
      other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION },
    }),
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.f1composite.com/#website",
  url: "https://www.f1composite.com",
  name: "F1 Composite",
  alternateName: "Chongqing F1 Composites Co., Ltd.",
  description:
    "Pultruded FRP profiles manufacturer — fiberglass structural shapes, FRP window frames, gratings & decks, and custom pultrusions to EN 13706 and ASTM D3917.",
  inLanguage: "en",
  publisher: { "@id": "https://www.f1composite.com/#organization" },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://www.f1composite.com/ask?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="min-h-screen font-sans antialiased">
        {/* Skip-to-content link (WCAG 2.4.1) — visually hidden until focused. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-[16px] focus:top-[10px] focus:z-[100] focus:rounded-[6px] focus:bg-white focus:px-[16px] focus:py-[8px] focus:text-t1 focus:shadow-lg focus:outline focus:outline-2 focus:outline-teal"
        >
          Skip to content
        </a>
        <JsonLd data={websiteSchema} />
        <Navbar />
        <main id="main" className="pt-[72px]">{children}</main>
        <Footer />
        {/* Field RUM for Core Web Vitals (LCP/INP/CLS) — privacy-safe, no cookies.
            Requires Speed Insights enabled in the Vercel project dashboard. */}
        <SpeedInsights />
        {/* Must live INSIDE <body>. Previously a direct child of <html> before
            <body>, where Next dropped its inline init script (gtag config +
            dataLayer) — the loader downloaded but no page_view ever fired, so
            GA4 reported "data collection isn't active". */}
        {shouldLoadGA4 && <GoogleAnalytics gaId={GA4_MEASUREMENT_ID} />}
        {/* Ahrefs is secondary analytics. Load it during browser idle time so it
            cannot compete with the page's LCP image or primary content. */}
        <Script
          id="ahrefs-web-analytics"
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="CFDhVpS55aoWtGuYtrx1Cw"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
