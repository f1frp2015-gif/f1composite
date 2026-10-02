import SourcingHub from "@/components/sourcing/SourcingHub";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Material Qualification & Sourcing | Pultrusion Know-How",
  description: "Qualify resins, cure systems, glass reinforcement, release agents and additives with F1 Know-How. Connect the material BOM to tooling and trials.",
  path: "/sourcing/materials",
});

export default function Page() {
  return <SourcingHub group="materials" />;
}
