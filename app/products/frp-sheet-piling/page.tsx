import CustomProductPage from "@/components/products/CustomProductPage";
import { customProductPages } from "@/content/data/customProductPages";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "FRP Sheet Piling | Custom Composite Waterfront Profiles",
  description: "Review custom FRP sheet piling for waterfront walls and retaining structures. Specify interlocks, site conditions, structural evidence and installation scope.",
  path: "/products/frp-sheet-piling",
  image: "/images/products/custom-range/frp-sheet-piling.svg",
});

export default function Page() {
  return <CustomProductPage page={customProductPages.find(page => page.slug === "frp-sheet-piling")!} />;
}
