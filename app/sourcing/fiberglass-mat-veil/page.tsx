import SourcingDetail from "@/components/sourcing/SourcingDetail";
import { sourcingPages } from "@/content/data/sourcingPages";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Fiberglass Mat & Surface Veil | Specification & Sourcing",
  description: "Compare continuous filament mat, chopped strand mat and surface veil for your composite process. Define binder compatibility, handling and surface requirements.",
  path: "/sourcing/fiberglass-mat-veil",
});

export default function Page() {
  return <SourcingDetail page={sourcingPages.find(page => page.slug === "fiberglass-mat-veil")!} />;
}
