import SourcingHub from "@/components/sourcing/SourcingHub";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Equipment & Tooling Support | Pultrusion Know-How",
  description: "Equipment and tooling support within F1 Know-How: line specifications, die interfaces, sourcing and acceptance for technology-transfer projects.",
  path: "/sourcing/equipment",
});

export default function Page() {
  return <SourcingHub group="equipment" />;
}
