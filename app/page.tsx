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
    title: "Pultruded FRP Profiles Manufacturer — Fiberglass Structural Shapes | F1 Composite",
    description:
      "Leading pultruded FRP profiles manufacturer. Fiberglass I-beams, channels, angles, custom pultrusions, fenestration systems & gratings. ISO 9001 certified, 370 pultrusion lines, shipping to 30+ countries.",
    path: "/",
    image: "/opengraph-image",
  }),
  keywords: [
    "pultruded FRP profiles",
    "FRP profiles manufacturer",
    "fiberglass structural shapes",
    "pultruded fiberglass profiles",
    "FRP I beam",
    "FRP channel",
    "FRP angle",
    "composite profiles manufacturer",
    "custom pultrusion services",
    "fiberglass window frames",
    "FRP grating",
    "FRP vs steel",
    "corrosion resistant structural profiles",
    "fiberglass profiles supplier",
    "pultruded profiles EN 13706",
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
