import SourcingHub from "@/components/sourcing/SourcingHub";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Equipment & Tooling Support | Pultrusion Know-How",
  description: "Equipment and tooling support within F1 Know-How: line specifications, die interfaces, sourcing and acceptance for technology-transfer projects.",
  path: "/sourcing/equipment",
  image: "/images/sourcing/supplier-equipment/hydraulic-profile-pultrusion-line.jpg",
  imageSize: { width: 450, height: 450 },
});

export default function Page() {
  return <SourcingHub group="equipment" />;
}
