import type { Metadata } from "next";
import IndustryPage from "@/components/industries/IndustryPage";
import { industryPages } from "@/content/data/industryPages";
import { buildPageMetadata } from "@/lib/seo";

const industry = industryPages["industrial"];
const description =
  "Pultruded FRP profiles, grating, ladders and handrails for chemical, process and manufacturing plants, with chemical-resistant and fire-retardant resins.";

export const metadata: Metadata = buildPageMetadata({
  title: "FRP for Industrial Plants — Chemical-Resistant Pultruded",
  description,
  path: industry.path,
  image: "/industries/industrial/opengraph-image",
});

export default function IndustrialPage() {
  return <IndustryPage industry={industry} description={description} />;
}
