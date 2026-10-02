import SourcingDetail from "@/components/sourcing/SourcingDetail";
import { sourcingPages } from "@/content/data/sourcingPages";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Stitched Fiberglass Fabrics | Specification & Sourcing",
  description: "Specify stitched glass fabrics by fiber orientation, area weight, width and backing. Match the construction to your laminate and manufacturing process.",
  path: "/sourcing/stitched-fiberglass-fabrics",
});

export default function Page() {
  return <SourcingDetail page={sourcingPages.find(page => page.slug === "stitched-fiberglass-fabrics")!} />;
}
