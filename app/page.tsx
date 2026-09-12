import HomeJourneyAnalytics from "@/components/sections/HomeJourneyAnalytics";
import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import CustomProfilePreview from "@/components/sections/CustomProfilePreview";
import ApplicationsSnapshot from "@/components/sections/ApplicationsSnapshot";
import SolutionsSnapshot from "@/components/sections/SolutionsSnapshot";
import FactoryQuality from "@/components/sections/FactoryQuality";
import SocialProof from "@/components/sections/SocialProof";
import DownloadsSnapshot from "@/components/sections/DownloadsSnapshot";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, organizationSchema } from "@/lib/seo";
import { getSeoQueryTarget } from "@/content/data/seoQueryTargets";

const seoTarget = getSeoQueryTarget("/");

export const metadata: Metadata = buildPageMetadata({
  title: seoTarget.title,
  description: seoTarget.description,
  path: "/",
  image: "/opengraph-image",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationSchema} />
      <HomeJourneyAnalytics />
      <Hero />
      <SolutionsSnapshot />
      <CustomProfilePreview />
      <FactoryQuality />
      <ApplicationsSnapshot />
      <SocialProof />
      <DownloadsSnapshot />
    </>
  );
}
