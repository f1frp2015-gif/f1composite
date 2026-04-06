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
    "Leading pultruded FRP profiles and fiberglass structural shapes manufacturer. I-beams, channels, angles, custom pultrusions, fenestration window frames & gratings. ISO 9001, EN 13706, 30+ countries.",
  metadataBase: new URL("https://f1composite.com"),
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
  "@type": "Organization",
  name: "F1 Composite",
  url: "https://f1composite.com",
  logo: "https://f1composite.com/brand/f1-logo.png",
  description:
    "Global pultruded FRP composite profile manufacturer. ISO 9001 certified, serving 30+ countries with structural profiles, fenestration systems, and custom pultrusions.",
  foundingLocation: {
    "@type": "Place",
    name: "Chongqing, China",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "No. 153 Jinyu Avenue, Cuntan Street",
    addressLocality: "Chongqing",
    addressRegion: "Liangjiang New Area",
    addressCountry: "CN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "Doris.li@f1composite.com",
    telephone: "+86-138-8333-3993",
    availableLanguage: ["English", "Chinese"],
  },
  areaServed: [
    { "@type": "Continent", name: "Europe" },
    { "@type": "Continent", name: "North America" },
    { "@type": "Continent", name: "Asia" },
    { "@type": "Continent", name: "Oceania" },
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "Australia" },
    { "@type": "Country", name: "Germany" },
  ],
  knowsAbout: [
    "Pultrusion",
    "FRP Composite Profiles",
    "Fiberglass Reinforced Plastic",
    "Structural Composite Materials",
    "FRP Fenestration Systems",
    "FRP Gratings",
  ],
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
