import type { Metadata } from "next";
import IndustryPage from "@/components/industries/IndustryPage";
import { industryGuides } from "@/content/data/industryGuides";
import { industryPages } from "@/content/data/industryPages";
import { buildPageMetadata } from "@/lib/seo";

const industry = industryPages["industrial"];
const description =
  "FRP grating, platforms, handrails, cooling-tower profiles and cable supports for chemical plants. Match each assembly to process loads and exposure.";

export const metadata: Metadata = buildPageMetadata({
  title: "FRP for Chemical & Industrial Facilities",
  description,
  path: industry.path,
  image: "/industries/industrial/opengraph-image",
});

export default function IndustrialPage() {
  return <IndustryPage industry={industry} description={description} guide={industryGuides["industrial"]} />;
}
