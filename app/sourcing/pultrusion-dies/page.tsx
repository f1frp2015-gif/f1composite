import SourcingDetail from "@/components/sourcing/SourcingDetail";
import { sourcingPages } from "@/content/data/sourcingPages";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Pultrusion Dies & Tooling | Specification & Sourcing",
  description: "Specify pultrusion dies, mandrels and preformers by section drawing, material and line interfaces. Review tooling ownership, trials and acceptance.",
  path: "/sourcing/pultrusion-dies",
});

export default function Page() {
  return <SourcingDetail page={sourcingPages.find(page => page.slug === "pultrusion-dies")!} />;
}
