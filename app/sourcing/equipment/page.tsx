import SourcingHub from "@/components/sourcing/SourcingHub";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Equipment & Tooling Support | Pultrusion Know-How",
  description: "Equipment and tooling support within F1 Know-How: line specifications, die interfaces, sourcing and acceptance for technology-transfer projects.",
  path: "/sourcing/equipment",
  image: "/images/sourcing/frpzs/hydraulic-profile-pultrusion-line.jpg",
  imageSize: { width: 1200, height: 533 },
});

export default function Page() {
  return <SourcingHub group="equipment" />;
}
