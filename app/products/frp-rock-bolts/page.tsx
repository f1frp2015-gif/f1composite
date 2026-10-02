import CustomProductPage from "@/components/products/CustomProductPage";
import { customProductPages } from "@/content/data/customProductPages";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "FRP Rock Bolts | GFRP Ground Support Inquiry",
  description: "Specify GFRP rock bolts for tunnel, mine and ground-support projects. Review bar geometry, plates, nuts, grout interfaces and system qualification.",
  path: "/products/frp-rock-bolts",
  image: "/images/products/custom-range/frp-rock-bolts.svg",
});

export default function Page() {
  return <CustomProductPage page={customProductPages.find(page => page.slug === "frp-rock-bolts")!} />;
}
