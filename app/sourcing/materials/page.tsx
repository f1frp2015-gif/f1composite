import SourcingHub from "@/components/sourcing/SourcingHub";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Composite Raw Material Sourcing",
  description: "Specify fiberglass direct roving, mat, surface veil, stitched fabrics and gelcoat. Review grade compatibility, qualification, lot documents and delivery.",
  path: "/sourcing/materials",
});

export default function Page() {
  return <SourcingHub group="materials" />;
}
