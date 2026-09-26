import type { Metadata } from "next";
import IndustryPage from "@/components/industries/IndustryPage";
import { industryPages } from "@/content/data/industryPages";
import { buildPageMetadata } from "@/lib/seo";

const industry = industryPages["energy"];
const description =
  "FRP profiles for substations, cable supports, solar mounting and wind energy: non-conductive frames and supports that do not rust, specified per project.";

export const metadata: Metadata = buildPageMetadata({
  title: "FRP Profiles for Energy, Power & Solar Projects",
  description,
  path: industry.path,
  image: "/industries/energy/opengraph-image",
});

export default function EnergyPage() {
  return <IndustryPage industry={industry} description={description} />;
}
