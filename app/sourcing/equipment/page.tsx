import SourcingHub from "@/components/sourcing/SourcingHub";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Composite Equipment & Tooling Sourcing",
  description: "Specify pultrusion lines, dies, resin mixing, pullwinding, slitters, SMC equipment and BMC tooling. Review sourcing, interfaces and acceptance with F1.",
  path: "/sourcing/equipment",
});

export default function Page() {
  return <SourcingHub group="equipment" />;
}
