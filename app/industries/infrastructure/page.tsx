import type { Metadata } from "next";
import IndustryPage from "@/components/industries/IndustryPage";
import { industryPages } from "@/content/data/industryPages";
import { buildPageMetadata } from "@/lib/seo";

const industry = industryPages["infrastructure"];
const description =
  "FRP profiles for infrastructure: pedestrian bridges, deck panels, handrails, noise barriers and GFRP rebar that do not rust and need no recoating.";

export const metadata: Metadata = buildPageMetadata({
  title: "FRP Profiles for Bridges & Infrastructure",
  description,
  path: industry.path,
  image: "/industries/infrastructure/opengraph-image",
});

export default function InfrastructurePage() {
  return <IndustryPage industry={industry} description={description} />;
}
