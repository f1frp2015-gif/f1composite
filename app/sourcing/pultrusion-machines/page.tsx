import SourcingDetail from "@/components/sourcing/SourcingDetail";
import { sourcingPages } from "@/content/data/sourcingPages";
import { buildPageMetadata } from "@/lib/seo";

// Keyword split of 2026-11-19 (WEBSITE.md): production-line and equipment keywords belong to the owner's systems site.
// No impressions in the 90 days to 2026-11-18, so the page stays online but out of the index.
export const metadata = {
  ...buildPageMetadata({
    title: "Pultrusion Machines | Specification & Sourcing",
    description: "Compare profile, rebar, rock-bolt and mesh pultrusion lines. Coordinate tooling, resin delivery, preforming, pulling, take-up and acceptance.",
    path: "/sourcing/pultrusion-machines",
    image: "/images/sourcing/supplier-equipment/hydraulic-profile-pultrusion-line.jpg",
    imageSize: { width: 450, height: 450 },
  }),
  robots: { index: false, follow: true },
};

export default function Page() {
  return <SourcingDetail page={sourcingPages.find(page => page.slug === "pultrusion-machines")!} />;
}
