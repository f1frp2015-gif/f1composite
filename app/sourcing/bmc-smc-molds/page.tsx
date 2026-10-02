import SourcingDetail from "@/components/sourcing/SourcingDetail";
import { sourcingPages } from "@/content/data/sourcingPages";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "BMC & SMC Molds | Specification & Sourcing",
  description: "Define matched tooling for BMC or SMC components. Review part geometry, compound, molding-machine interfaces, trial parts and the tooling handover package.",
  path: "/sourcing/bmc-smc-molds",
});

export default function Page() {
  return <SourcingDetail page={sourcingPages.find(page => page.slug === "bmc-smc-molds")!} />;
}
