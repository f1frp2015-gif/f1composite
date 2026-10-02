import SourcingDetail from "@/components/sourcing/SourcingDetail";
import { sourcingPages } from "@/content/data/sourcingPages";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Fiberglass Direct Roving | Specification & Sourcing",
  description: "Specify fiberglass direct roving by glass type, sizing, linear density and resin compatibility. Prepare a qualification and delivery request for your process.",
  path: "/sourcing/fiberglass-direct-roving",
});

export default function Page() {
  return <SourcingDetail page={sourcingPages.find(page => page.slug === "fiberglass-direct-roving")!} />;
}
