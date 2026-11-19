import SourcingHub from "@/components/sourcing/SourcingHub";
import { buildPageMetadata } from "@/lib/seo";

// Keyword split of 2026-11-19 (WEBSITE.md): production-line and equipment keywords belong to the owner's systems site.
// No impressions in the 90 days to 2026-11-18, so the page stays online but out of the index.
export const metadata = {
  ...buildPageMetadata({
    title: "Equipment & Tooling Support | Pultrusion Know-How",
    description: "Equipment and tooling support within F1 Know-How: line specifications, die interfaces, sourcing and acceptance for technology-transfer projects.",
    path: "/sourcing/equipment",
    image: "/images/sourcing/supplier-equipment/hydraulic-profile-pultrusion-line.jpg",
    imageSize: { width: 450, height: 450 },
  }),
  robots: { index: false, follow: true },
};

export default function Page() {
  return <SourcingHub group="equipment" />;
}
