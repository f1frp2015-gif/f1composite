import SourcingDetail from "@/components/sourcing/SourcingDetail";
import { sourcingPages } from "@/content/data/sourcingPages";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Gelcoat Resins | Specification & Sourcing",
  description: "Specify gelcoat by application, substrate, finish and exposure. Review the grade, processing documents, sample panels and delivery conditions.",
  path: "/sourcing/gelcoat-resins",
});

export default function Page() {
  return <SourcingDetail page={sourcingPages.find(page => page.slug === "gelcoat-resins")!} />;
}
