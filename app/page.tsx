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
import { getSeoQueryTarget } from "@/content/data/seoQueryTargets";

const seoTarget = getSeoQueryTarget("/");

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: seoTarget.title,
    description: seoTarget.description,
    path: "/",
    image: "/opengraph-image",
  }),
  keywords: [
    "F1 Composite",
    "F1 Composite manufacturer",
    "F1 Composite China",
    "F1-STRUX",
    "F1-GRID",
    "F1-THERM",
    "F1-FORM",
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
