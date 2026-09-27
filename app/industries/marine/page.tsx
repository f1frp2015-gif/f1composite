import type { Metadata } from "next";
import IndustryPage from "@/components/industries/IndustryPage";
import { industryGuides } from "@/content/data/industryGuides";
import { industryPages } from "@/content/data/industryPages";
import { buildPageMetadata } from "@/lib/seo";

const industry = industryPages["marine"];
const description =
  "Explore FRP grating, decking, structural profiles and access systems for marinas, coastal boardwalks, offshore platforms and seawater facilities.";

export const metadata: Metadata = buildPageMetadata({
  title: "FRP for Marine Docks, Walkways & Access Platforms",
  description,
  path: industry.path,
  image: "/industries/marine/opengraph-image",
});

export default function MarinePage() {
  return <IndustryPage industry={industry} description={description} guide={industryGuides["marine"]} />;
}
