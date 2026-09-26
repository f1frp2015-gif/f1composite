import type { Metadata } from "next";
import IndustryPage from "@/components/industries/IndustryPage";
import { industryPages } from "@/content/data/industryPages";
import { buildPageMetadata } from "@/lib/seo";

const industry = industryPages["water-wastewater"];
const description =
  "FRP profiles and grating for water and wastewater facilities. Review cable supports, access frames, walkways, chemical exposure and component supply scope.";

export const metadata: Metadata = buildPageMetadata({
  title: "FRP for Water & Wastewater | Profiles & Grating",
  description,
  path: industry.path,
  image: industry.image.src,
});

export default function WaterIndustryPage() {
  return <IndustryPage industry={industry} description={description} />;
}
