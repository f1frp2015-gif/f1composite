import Link from "next/link";
import ProductSection from "@/components/products/ProductSection";
import ProductFamilyCards from "@/components/sections/ProductFamilyCards";

export default function SolutionsSnapshot() {
  return (
    <ProductSection
      id="products"
      title="Find the right FRP product"
      intro="Start with a standard section or a custom profile. Explore window and door products, fiberglass grating and concrete reinforcement below."
      aside={
        <Link href="/products/product-lines" className="font-bold text-teal-text">
          View all products →
        </Link>
      }
      tone="muted"
    >
      <ProductFamilyCards />
    </ProductSection>
  );
}
