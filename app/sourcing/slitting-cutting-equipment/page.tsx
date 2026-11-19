import SourcingDetail from "@/components/sourcing/SourcingDetail";
import { sourcingPages } from "@/content/data/sourcingPages";
import { buildPageMetadata } from "@/lib/seo";

// Keyword split of 2026-11-19 (WEBSITE.md): production-line and equipment keywords belong to the owner's systems site.
// No impressions in the 90 days to 2026-11-18, so the page stays online but out of the index.
export const metadata = {
  ...buildPageMetadata({
    title: "Mat Slitters & Profile Cutters | Specification & Sourcing",
    description: "Specify mat slitters and cured-profile cutters. Review feed handling, dimensions, line synchronization, extraction and cut-quality acceptance.",
    path: "/sourcing/slitting-cutting-equipment",
  }),
  robots: { index: false, follow: true },
};

export default function Page() {
  return <SourcingDetail page={sourcingPages.find(page => page.slug === "slitting-cutting-equipment")!} />;
}
