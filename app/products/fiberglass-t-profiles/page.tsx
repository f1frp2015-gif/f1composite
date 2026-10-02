import CustomProductPage from "@/components/products/CustomProductPage";
import { customProductPages } from "@/content/data/customProductPages";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Fiberglass T Profiles | Custom Pultruded Tee Sections",
  description: "Custom pultruded fiberglass T profiles for panel supports, stiffeners and frames. Define flange, stem, resin, connections and qualification requirements.",
  path: "/products/fiberglass-t-profiles",
  image: "/images/products/custom-range/fiberglass-t-profiles.svg",
});

export default function Page() {
  return <CustomProductPage page={customProductPages.find(page => page.slug === "fiberglass-t-profiles")!} />;
}
