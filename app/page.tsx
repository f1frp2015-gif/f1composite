import type { Metadata } from "next";
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
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, organizationSchema } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "F1 Composite — Pultruded FRP Profiles, EN 13706 · DDP USA",
    description:
      "Pultruded FRP direct from F1 Composite's factory. I-beams, custom, PHIUS frames, gratings. ASTM E84 · EN 13706. DDP USA, Section 301 pre-quoted, 24h reply.",
    path: "/",
    image: "/opengraph-image",
  }),
  keywords: [
    "F1 pultruded profiles",
    "F1 Composite pultruded profiles",
    "F1 FRP profiles",
    "pultruded FRP profiles manufacturer",
    "FRP profiles supplier China",
    "FRP profiles manufacturer China",
    "China FRP factory",
    "fiberglass structural shapes manufacturer",
    "pultruded fiberglass China",
    "FRP I beam manufacturer",
    "FRP channel supplier",
    "FRP angle profiles wholesale",
    "composite profiles manufacturer China",
    "custom pultrusion services China",
    "FRP window frames supplier",
    "FRP window profiles manufacturer",
    "pultruded fiberglass window frames",
    "GRP window profiles supplier",
    "FRP fenestration systems China",
    "FRP grating wholesale",
    "FRP deck panels supplier",
    "FRP vs steel",
    "corrosion resistant structural profiles",
    "fiberglass profiles supplier China",
    "pultruded profiles EN 13706",
    "direct from factory FRP",
  ],
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationSchema} />
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
