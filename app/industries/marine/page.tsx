import type { Metadata } from "next";
import IndustryPage from "@/components/industries/IndustryPage";
import { industryPages } from "@/content/data/industryPages";
import { buildPageMetadata } from "@/lib/seo";

const industry = industryPages["marine"];
const description =
  "Pultruded FRP profiles and grating for docks, offshore platforms, walkways and tie-rods: no rust in saltwater, vinyl ester options, EN 13706 profiles.";

export const metadata: Metadata = buildPageMetadata({
  title: "FRP for Marine — Saltwater Structures & Docks",
  description,
  path: industry.path,
  image: "/industries/marine/opengraph-image",
});

export default function MarinePage() {
  return <IndustryPage industry={industry} description={description} />;
}
