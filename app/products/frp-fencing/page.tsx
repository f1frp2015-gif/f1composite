import CustomProductPage from "@/components/products/CustomProductPage";
import { customProductPages } from "@/content/data/customProductPages";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "FRP Fencing | Fiberglass Posts, Panels & Gates",
  description: "Plan FRP fencing with fiberglass posts, pickets or grating infill. Specify panel layout, gates, connections, exposure and project acceptance requirements.",
  path: "/products/frp-fencing",
  image: "/images/products/custom-range/frp-fencing.svg",
});

export default function Page() {
  return <CustomProductPage page={customProductPages.find(page => page.slug === "frp-fencing")!} />;
}
