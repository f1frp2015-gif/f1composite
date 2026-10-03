import type { Metadata } from "next";
import IndustryPage from "@/components/industries/IndustryPage";
import VehicleEngineering from "@/components/industries/VehicleEngineering";
import { industryGuides } from "@/content/data/industryGuides";
import { industryPages } from "@/content/data/industryPages";
import { buildPageMetadata } from "@/lib/seo";

const industry = industryPages["vehicle"];
const description =
  "Pultruded FRP profiles for buses, passenger cars, EV battery enclosures, truck bodies and rail. Explore candidate parts, design checks and qualification.";

export const metadata: Metadata = buildPageMetadata({
  title: "FRP Profiles for Automotive, Bus & Rail Components",
  description,
  path: industry.path,
  image: "/industries/vehicle/opengraph-image",
});

export default function VehiclePage() {
  return (
    <IndustryPage
      industry={industry}
      description={description}
      guide={industryGuides["vehicle"]}
      supplement={{
        id: "engineering",
        label: "Engineering route",
        title: "From profile concept to an approved vehicle part",
        intro: "The useful comparison is between a defined component and its proposed replacement. Geometry, laminate, joints and the qualification route must be reviewed as one design.",
        content: <VehicleEngineering />,
      }}
    />
  );
}
