import HomeJourneyAnalytics from "@/components/sections/HomeJourneyAnalytics";
import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import TrustStrip from "@/components/sections/TrustStrip";
import CustomProfilePreview from "@/components/sections/CustomProfilePreview";
import ApplicationsSnapshot from "@/components/sections/ApplicationsSnapshot";
import SolutionsSnapshot from "@/components/sections/SolutionsSnapshot";
import FactoryQuality from "@/components/sections/FactoryQuality";
import SocialProof from "@/components/sections/SocialProof";
import DownloadsSnapshot from "@/components/sections/DownloadsSnapshot";
import { buildPageMetadata } from "@/lib/seo";
import { getSeoQueryTarget } from "@/content/data/seoQueryTargets";

const seoTarget = getSeoQueryTarget("/");

export const metadata: Metadata = buildPageMetadata({
  title: seoTarget.title,
  description: seoTarget.description,
  path: "/",
  image: "/opengraph-image",
});

// What we make, where it is used, the projects that show it, how it is made,
// and the tools for choosing it; grounds alternate white and pale.
export default function HomePage() {
  return (
    <>
      <HomeJourneyAnalytics />
      <Hero />
      <TrustStrip />
      <SolutionsSnapshot />
      <CustomProfilePreview />
      <ApplicationsSnapshot />
      <SocialProof />
      <FactoryQuality />
      <DownloadsSnapshot />
    </>
  );
}
