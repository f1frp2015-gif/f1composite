import SourcingDetail from "@/components/sourcing/SourcingDetail";
import { sourcingPages } from "@/content/data/sourcingPages";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "SMC Production Lines | Specification & Sourcing",
  description: "Specify SMC sheet-compounding equipment. Review resin paste, chopped reinforcement, carrier film, compaction and the downstream molding interface.",
  path: "/sourcing/smc-production-lines",
});

export default function Page() {
  return <SourcingDetail page={sourcingPages.find(page => page.slug === "smc-production-lines")!} />;
}
