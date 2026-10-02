import SourcingDetail from "@/components/sourcing/SourcingDetail";
import { sourcingPages } from "@/content/data/sourcingPages";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Mat Slitters & Profile Cutters | Specification & Sourcing",
  description: "Specify mat slitters and cured-profile cutters. Review feed handling, dimensions, line synchronization, extraction and cut-quality acceptance.",
  path: "/sourcing/slitting-cutting-equipment",
});

export default function Page() {
  return <SourcingDetail page={sourcingPages.find(page => page.slug === "slitting-cutting-equipment")!} />;
}
