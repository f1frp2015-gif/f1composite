import SourcingDetail from "@/components/sourcing/SourcingDetail";
import { sourcingPages } from "@/content/data/sourcingPages";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Pultrusion Machines | Specification & Sourcing",
  description: "Specify a pultrusion line around the profiles you plan to make. Review hydraulic or caterpillar pulling, resin handling, tooling and acceptance trials with F1.",
  path: "/sourcing/pultrusion-machines",
});

export default function Page() {
  return <SourcingDetail page={sourcingPages.find(page => page.slug === "pultrusion-machines")!} />;
}
