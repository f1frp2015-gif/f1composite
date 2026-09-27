import type { Metadata } from "next";
import IndustryPage from "@/components/industries/IndustryPage";
import { industryGuides } from "@/content/data/industryGuides";
import { industryPages } from "@/content/data/industryPages";
import { buildPageMetadata } from "@/lib/seo";

const industry = industryPages["vehicle"];
const description =
  "FRP profiles for bus bodies, refrigerated trailer walls, railcar interiors and specialty vehicles. See component locations, design checks and product options.";

export const metadata: Metadata = buildPageMetadata({
  title: "FRP Profiles for Vehicle & Transport Components",
  description,
  path: industry.path,
  image: "/industries/vehicle/opengraph-image",
});

export default function VehiclePage() {
  return <IndustryPage industry={industry} description={description} guide={industryGuides["vehicle"]} />;
}
