import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import { buildAggregateRating } from "@/lib/seo";
import dynamic from "next/dynamic";

const ChatWidget = dynamic(() => import("@/components/chat/ChatWidget"));
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: {
    default: "F1 Composite — Pultruded FRP Profiles & Fiberglass Structural Shapes Manufacturer",
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

const orgSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "Manufacturer"],
  "@id": "https://www.f1composite.com/#organization",
  name: "F1 Composite",
  alternateName: [
    "F1 Composites",
    "F1 Composite Co., Ltd",
  ],
  legalName: "F1 Composite Co., Ltd",
  url: "https://www.f1composite.com",
  logo: {
    "@type": "ImageObject",
    url: "https://www.f1composite.com/brand/f1-logo.png",
    width: 512,
    height: 512,
  },
  image: "https://www.f1composite.com/opengraph-image",
  description:
    "F1 Composite Co., Ltd — pultruded FRP profiles manufacturer based in Chongqing, China. Direct factory export to 30+ countries with 5 production bases, 370 pultrusion lines, and 150,000 t/year capacity. ISO 9001 certified; products to EN 13706 and ASTM D3917. Full range: structural shapes, fenestration systems, gratings, and custom pultrusions.",
  disambiguatingDescription:
    "F1 Composite is an industrial pultruded fiberglass (FRP / GRP) composite profiles manufacturer. It is not affiliated with Formula 1 / Formula One motorsport. Its branded product lines are F1-STRUX (structural profiles), F1-GRID (gratings & decks), F1-THERM (fenestration), and F1-FORM (custom pultrusions).",
  foundingDate: "2015",
  foundingLocation: {
    "@type": "Place",
    name: "Chongqing, China",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "No. 153 Jinyu Avenue, Cuntan Street",
    addressLocality: "Chongqing",
    addressRegion: "Liangjiang New Area",
    postalCode: "401121",
    addressCountry: "CN",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "inquiry@f1composite.com",
      telephone: "+86-138-8333-3993",
      availableLanguage: ["English", "Chinese"],
      areaServed: ["Worldwide"],
    },
    {
      "@type": "ContactPoint",
      contactType: "technical support",
      email: "inquiry@f1composite.com",
      availableLanguage: ["English", "Chinese"],
    },
  ],
  areaServed: [
    { "@type": "Continent", name: "Europe" },
    { "@type": "Continent", name: "North America" },
    { "@type": "Continent", name: "Asia" },
    { "@type": "Continent", name: "Oceania" },
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "Canada" },
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "Australia" },
    { "@type": "Country", name: "Germany" },
    { "@type": "Country", name: "Netherlands" },
    { "@type": "Country", name: "Saudi Arabia" },
    { "@type": "Country", name: "United Arab Emirates" },
  ],
  knowsAbout: [
    "Pultrusion",
    "FRP Composite Profiles",
    "Pultruded FRP Profiles",
    "Fiberglass Reinforced Polymer",
    "Fiberglass Reinforced Plastic",
    "Glass Reinforced Polymer (GRP)",
    "Structural Composite Materials",
    "FRP Window Frames",
    "FRP Window Profiles",
    "Pultruded Fiberglass Window Frames",
    "FRP Fenestration Systems",
    "FRP Gratings",
    "FRP Deck Panels",
    "EN 13706 Pultruded Profiles",
    "ASTM D3917 Pultruded Shapes",
    "ASCE/SEI 74-23 LRFD",
    "Passive House Fenestration",
    "PHIUS Passive House Fenestration",
    "NAFS / CSA A440 Fenestration",
    "NFRC 100 Window U-factor",
  ],
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Custom pultrusion tooling and manufacturing",
      },
    },
    {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "5",
      highPrice: "300",
      offerCount: "200",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        priceCurrency: "USD",
        unitText: "linear meter",
      },
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      businessFunction: "http://purl.org/goodrelations/v1#Sell",
      itemOffered: {
        "@type": "Product",
        "@id": "https://www.f1composite.com/pultruded-frp-profiles#product",
        name: "Pultruded FRP Profiles — direct from China factory",
        category: "Pultruded FRP Profiles",
        url: "https://www.f1composite.com/pultruded-frp-profiles",
        brand: { "@type": "Brand", name: "F1 Composite" },
        offers: {
          "@type": "AggregateOffer",
          url: "https://www.f1composite.com/contact",
          priceCurrency: "USD",
          lowPrice: "5",
          highPrice: "300",
          offerCount: "200",
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition",
          businessFunction: "http://purl.org/goodrelations/v1#Sell",
          seller: { "@id": "https://www.f1composite.com/#organization" },
        },
      },
      eligibleRegion: [
        { "@type": "Country", name: "United States" },
        { "@type": "Country", name: "Canada" },
        { "@type": "Country", name: "United Kingdom" },
        { "@type": "Country", name: "Germany" },
        { "@type": "Country", name: "Netherlands" },
        { "@type": "Country", name: "Australia" },
        { "@type": "Country", name: "Saudi Arabia" },
        { "@type": "Country", name: "United Arab Emirates" },
      ],
    },
  ],
  brand: {
    "@type": "Brand",
    name: "F1 Composite",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "F1 Composite — branded pultruded FRP product lines",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "F1-STRUX — Pultruded FRP Structural Profiles",
          model: "F1-STRUX",
          category: "Pultruded FRP Structural Profiles (I-beam, channel, angle, tube, flat bar, rod)",
          url: "https://www.f1composite.com/products/standard-profiles",
          brand: { "@type": "Brand", name: "F1 Composite" },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "F1-GRID — Pultruded & Molded FRP Gratings and Deck Panels",
          model: "F1-GRID",
          category: "FRP Gratings, Solid-Top Cover Plates, Structural Deck Panels",
          url: "https://www.f1composite.com/products/gratings",
          brand: { "@type": "Brand", name: "F1 Composite" },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "F1-THERM — Pultruded Fiberglass Window Frames & Fenestration Profiles",
          model: "F1-THERM",
          category: "FRP / GFRP Fenestration Systems (65/70/80/90/140-series)",
          url: "https://www.f1composite.com/products/fenestration-systems",
          brand: { "@type": "Brand", name: "F1 Composite" },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "F1-FORM — Custom Pultruded FRP Profiles",
          model: "F1-FORM",
          category: "Custom Pultrusions up to 600×300 mm cross-section",
          url: "https://www.f1composite.com/products/custom-pultrusions",
          brand: { "@type": "Brand", name: "F1 Composite" },
        },
      },
    ],
  },
  naics: "326199",
  keywords:
    "pultruded FRP profiles manufacturer, FRP profiles supplier China, fiberglass structural shapes factory, FRP I beam manufacturer, FRP window frames supplier, FRP grating wholesale, custom pultrusion services, pultruded fiberglass China export",
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      name: "ISO 9001:2015 — Quality Management System",
      credentialCategory: "certification",
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "EN 13706 — Reinforced plastics composites — Specifications for pultruded profiles",
      credentialCategory: "product standard",
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "PHI (Passive House Institute) certified — 90-series fenestration",
      credentialCategory: "product certification",
    },
  ],
  slogan:
    "Pultruded FRP profiles manufacturer — structural shapes, fenestration, gratings, and custom pultrusions to EN 13706 and ASTM D3917",
  sameAs: [
    "https://www.youtube.com/@F1Composites",
  ],
  // Surfaces star ratings in SERP once real reviews exist in
  // content/data/reviews.ts. Emits nothing while that array is empty — we never
  // fabricate ratings.
  ...(buildAggregateRating() ?? {}),
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.f1composite.com/#website",
  url: "https://www.f1composite.com",
  name: "F1 Composite",
  alternateName: "F1 Composite Co., Ltd",
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
        <JsonLd data={orgSchema} />
        <JsonLd data={websiteSchema} />
        <Navbar />
        <main className="pt-[55px]">{children}</main>
        <Footer />
        <ChatWidget />
        {/* Must live INSIDE <body>. Previously a direct child of <html> before
            <body>, where Next dropped its inline init script (gtag config +
            dataLayer) — the loader downloaded but no page_view ever fired, so
            GA4 reported "data collection isn't active". */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
      </body>
    </html>
  );
}
