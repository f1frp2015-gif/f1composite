import CustomProductPage from "@/components/products/CustomProductPage";
import { customProductPages } from "@/content/data/customProductPages";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Fiberglass Square Rods | Custom Solid GFRP Bars",
  description: "Specify solid fiberglass square rods for spacers, insulating supports and machined components. Review section size, tolerances, resin and cut lengths.",
  path: "/products/fiberglass-square-rods",
  image: "/images/products/custom-range/fiberglass-square-rods.svg",
});

export default function Page() {
  return <CustomProductPage page={customProductPages.find(page => page.slug === "fiberglass-square-rods")!} />;
}
