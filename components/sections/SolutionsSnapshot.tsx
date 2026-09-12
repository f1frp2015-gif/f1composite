import Link from "next/link";
import SectionTag from "@/components/ui/SectionTag";
import ProductFamilyCards from "@/components/sections/ProductFamilyCards";

export default function SolutionsSnapshot() {
  return (
    <section
      className="bg-white py-[54px] md:py-[72px]"
      aria-labelledby="home-products"
    >
      <div className="mx-auto max-w-[1320px] px-[20px] sm:px-[28px] lg:px-[36px]">
        <div className="mb-[28px] flex flex-wrap items-end justify-between gap-[16px]">
          <div>
            <SectionTag>Products</SectionTag>
            <h2
              id="home-products"
              className="mt-[12px] text-[clamp(28px,3.2vw,42px)] font-bold leading-tight text-t1"
            >
              Find the right FRP product
            </h2>
            <p className="mt-[12px] max-w-[740px] text-f15 leading-relaxed text-t2">
              Start with a standard section or a custom profile. Explore window
              and door products and both types of fiberglass grating below.
            </p>
          </div>
          <Link
            href="/products/product-lines"
            className="text-f14 font-bold text-teal-text"
          >
            View all products →
          </Link>
        </div>
        <ProductFamilyCards />
      </div>
    </section>
  );
}
