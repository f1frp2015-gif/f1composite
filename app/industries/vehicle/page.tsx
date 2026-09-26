import type { Metadata } from "next";
import IndustryPage from "@/components/industries/IndustryPage";
import { industryPages } from "@/content/data/industryPages";
import { buildPageMetadata } from "@/lib/seo";

const industry = industryPages["vehicle"];
const description =
  "Lightweight pultruded FRP profiles for commercial vehicles, buses, rail cars and specialty transport: about 75% lighter than steel, and they do not rust.";

export const metadata: Metadata = buildPageMetadata({
  title: "FRP Profiles for Transport & Vehicle Structures",
  description,
  path: industry.path,
  image: "/industries/vehicle/opengraph-image",
});

export default function VehiclePage() {
  return <IndustryPage industry={industry} description={description} />;
}
