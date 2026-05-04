import type { Metadata } from "next";
import HeroPreload from "@/components/HeroPreload";
import Hero from "@/components/sections/Hero";
import SolutionsSnapshot from "@/components/sections/SolutionsSnapshot";
import IndustriesSnapshot from "@/components/sections/IndustriesSnapshot";
import ValueProposition from "@/components/sections/ValueProposition";
import FactoryQuality from "@/components/sections/FactoryQuality";
import SocialProof from "@/components/sections/SocialProof";
import DownloadsSnapshot from "@/components/sections/DownloadsSnapshot";
import ExploreSection from "@/components/sections/ExploreSection";
import GlobalTrust from "@/components/sections/GlobalTrust";
import HomeFAQ from "@/components/sections/HomeFAQ";
import CTABand from "@/components/sections/CTABand";
import InnerCTA from "@/components/sections/InnerCTA";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Pultruded FRP Profiles Manufacturer — Fiberglass Structural Shapes | F1 Composite",
    description:
      "Pultruded FRP profiles manufacturer for structural shapes, custom pultrusions, FRP windows and gratings. EN 13706, ASTM D3917, ISO 9001, global export.",
    path: "/",
    image: "/opengraph-image",
  }),
  keywords: [
    "pultruded FRP profiles",
    "FRP profiles manufacturer",
    "fiberglass structural shapes",
    "FRP I beam",
    "FRP channel",
    "FRP angle",
    "composite profiles manufacturer",
    "custom pultrusion services",
    "FRP window frames",
    "FRP window profiles",
    "pultruded fiberglass window frames",
    "GRP window profiles",
    "FRP fenestration systems",
    "FRP grating",
    "FRP deck panels",
    "FRP vs steel",
    "corrosion resistant structural profiles",
    "fiberglass profiles supplier",
    "pultruded profiles EN 13706",
  ],
};

export default function HomePage() {
  return (
    <>
      <HeroPreload />
      <Hero />
      <SolutionsSnapshot />
      <IndustriesSnapshot />
      <ValueProposition />
      <FactoryQuality />
      <SocialProof />
      <InnerCTA title="Have a project requirement? Get a quote within one business day." />
      <DownloadsSnapshot />
      <ExploreSection />
      <GlobalTrust />
      <HomeFAQ />
      <CTABand />
    </>
  );
}
