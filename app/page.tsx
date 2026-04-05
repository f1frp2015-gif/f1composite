import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import SolutionsSnapshot from "@/components/sections/SolutionsSnapshot";
import ValueProposition from "@/components/sections/ValueProposition";
import FactoryQuality from "@/components/sections/FactoryQuality";
import SocialProof from "@/components/sections/SocialProof";
import DownloadsSnapshot from "@/components/sections/DownloadsSnapshot";
import GlobalTrust from "@/components/sections/GlobalTrust";
import HomeFAQ from "@/components/sections/HomeFAQ";
import CTABand from "@/components/sections/CTABand";
import InnerCTA from "@/components/sections/InnerCTA";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "F1 Composite — Pultruded FRP Profiles Manufacturer",
    description:
      "Pultruded FRP profiles manufacturer. I-beams, channels, angles, custom pultrusions & fenestration. ISO 9001, 30+ countries. Get a quote.",
    path: "/",
    image: "/opengraph-image",
  }),
  keywords: [
    "pultruded FRP profiles",
    "FRP manufacturer",
    "fiberglass structural profiles",
    "pultruded fiberglass shapes",
    "FRP I-beam",
    "FRP channel",
    "composite profiles manufacturer",
    "FRP fenestration",
    "FRP gratings",
    "custom pultrusion",
  ],
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <SolutionsSnapshot />
      <ValueProposition />
      <FactoryQuality />
      <SocialProof />
      <InnerCTA title="Have a project requirement? Get a quote within one business day." />
      <DownloadsSnapshot />
      <GlobalTrust />
      <HomeFAQ />
      <CTABand />
    </>
  );
}
