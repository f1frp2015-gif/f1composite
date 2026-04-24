import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
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
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "Manufacturer"],
  "@id": "https://www.f1composite.com/#organization",
  name: "F1 Composite",
  alternateName: [
    "F1 Composites",
    "FengDu New Material",
    "Chongqing FengDu New Material",
    "风渡新材料",
  ],
  legalName: "Chongqing FengDu New Material Co., Ltd",
  url: "https://www.f1composite.com",
  logo: {
    "@type": "ImageObject",
    url: "https://www.f1composite.com/brand/f1-logo.png",
    width: 512,
    height: 512,
  },
  image: "https://www.f1composite.com/opengraph-image",
  description:
    "Global pultruded FRP profiles manufacturer. 5 production bases, 370 pultrusion lines, 150,000 t/year capacity. ISO 9001 certified; products to EN 13706 and ASTM D3917. Serving 30+ countries with structural profiles, fenestration systems, gratings, and custom pultrusions.",
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
      email: "Doris.li@f1composite.com",
      telephone: "+86-138-8333-3993",
      availableLanguage: ["English", "Chinese"],
      areaServed: ["Worldwide"],
    },
    {
      "@type": "ContactPoint",
      contactType: "technical support",
      email: "f1frp2015@gmail.com",
      availableLanguage: ["English", "Chinese"],
    },
  ],
  areaServed: [
    { "@type": "Continent", name: "Europe" },
    { "@type": "Continent", name: "North America" },
    { "@type": "Continent", name: "Asia" },
    { "@type": "Continent", name: "Oceania" },
    { "@type": "Country", name: "United States" },
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
  ],
  makesOffer: {
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: "Custom pultrusion tooling and manufacturing",
    },
  },
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmSans.variable}>
      {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      )}
      <body className="min-h-screen font-sans antialiased">
        <JsonLd data={orgSchema} />
        <Navbar />
        <main className="pt-[55px]">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
