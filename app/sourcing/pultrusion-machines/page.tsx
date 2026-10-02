import SourcingDetail from "@/components/sourcing/SourcingDetail";
import { sourcingPages } from "@/content/data/sourcingPages";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Pultrusion Machines | Specification & Sourcing",
  description: "Compare profile, rebar, rock-bolt and mesh pultrusion lines. Coordinate tooling, resin delivery, preforming, pulling, take-up and acceptance.",
  path: "/sourcing/pultrusion-machines",
  image: "/images/sourcing/supplier-equipment/hydraulic-profile-pultrusion-line.jpg",
  imageSize: { width: 450, height: 450 },
});

export default function Page() {
  return <SourcingDetail page={sourcingPages.find(page => page.slug === "pultrusion-machines")!} />;
}
