import SourcingDetail from "@/components/sourcing/SourcingDetail";
import { sourcingPages } from "@/content/data/sourcingPages";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Resin Mixing & PU Injection | Specification & Sourcing",
  description: "Compare batch mixing and metered resin injection for composite production. Define material compatibility, dosing, cleaning and the connection to the line.",
  path: "/sourcing/resin-mixing-injection",
});

export default function Page() {
  return <SourcingDetail page={sourcingPages.find(page => page.slug === "resin-mixing-injection")!} />;
}
