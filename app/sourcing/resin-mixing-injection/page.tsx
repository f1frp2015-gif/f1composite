import SourcingDetail from "@/components/sourcing/SourcingDetail";
import { sourcingPages } from "@/content/data/sourcingPages";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Resin Mixing & PU Injection | Specification & Sourcing",
  description: "Compare batch mixing and metered resin injection for composite production. Define material compatibility, dosing, cleaning and the connection to the line.",
  path: "/sourcing/resin-mixing-injection",
  image: "/images/sourcing/frpzs/two-component-resin-injection-unit.jpg",
  imageSize: { width: 450, height: 450 },
});

export default function Page() {
  return <SourcingDetail page={sourcingPages.find(page => page.slug === "resin-mixing-injection")!} />;
}
