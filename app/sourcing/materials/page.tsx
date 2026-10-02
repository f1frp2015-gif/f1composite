import SourcingHub from "@/components/sourcing/SourcingHub";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Material Qualification & Sourcing | Pultrusion Know-How",
  description: "Material qualification and sourcing support within F1 Know-How: glass reinforcement, mats, fabrics and gelcoat matched to your production process.",
  path: "/sourcing/materials",
});

export default function Page() {
  return <SourcingHub group="materials" />;
}
