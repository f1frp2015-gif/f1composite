import SourcingDetail from "@/components/sourcing/SourcingDetail";
import { sourcingPages } from "@/content/data/sourcingPages";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Pullwinding Equipment | Specification & Sourcing",
  description: "Specify pullwinding equipment for composite tubes. Coordinate the mandrel, winding heads, resin system, pulling controls and acceptance trials.",
  path: "/sourcing/pullwinding-equipment",
});

export default function Page() {
  return <SourcingDetail page={sourcingPages.find(page => page.slug === "pullwinding-equipment")!} />;
}
