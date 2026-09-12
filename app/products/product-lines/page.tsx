import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import ProductFamilyCards from "@/components/sections/ProductFamilyCards";
import CollectionSchema from "@/components/seo/CollectionSchema";
import {
  productFamilies,
  applicationGroups,
} from "@/content/data/productTaxonomy";
import { buildPageMetadata } from "@/lib/seo";
import { getSeoQueryTarget } from "@/content/data/seoQueryTargets";

const path = "/products/product-lines";
const target = getSeoQueryTarget(path);
export const metadata: Metadata = buildPageMetadata({
  title: target.title,
  description: target.description,
  path,
});
export default function ProductsPage() {
  return (
    <>
      <CollectionSchema
        name="F1 Composite Products"
        description={target.description}
        path={path}
        links={productFamilies}
      />
      <PageHeader
        tag="Products"
        title="FRP profiles, windows, doors & grating"
        description="F1 Composite specializes in standard and custom pultruded profiles. Our complementary range includes window and door profiles, finished windows and doors, and molded and pultruded grating."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
      />
      <section className="bg-white py-[48px]">
        <div className="mx-auto max-w-[1320px] px-[20px] sm:px-[28px] lg:px-[36px]">
          <h2 className="mb-[22px] text-f31 font-bold text-t1">
            Choose your product family
          </h2>
          <ProductFamilyCards />
          <div className="mt-[28px] rounded-[10px] border border-border-default bg-bg2 p-[24px]">
            <h2 className="text-f24 font-bold text-t1">
              Standard section or custom development?
            </h2>
            <p className="mt-[10px] text-f15 leading-relaxed text-t2">
              Choose standard profiles when an established cross-section fits
              your design. Standard does not mean in stock: material, quantity,
              availability and delivery are confirmed at quotation. Choose
              custom profiles when a new geometry, interface or material
              requirement needs development. The same profile may serve several
              industries.
            </p>
            <p className="mt-[12px] text-f14 text-t2">
              The product-line names F1-STRUX, F1-FORM, F1-THERM and F1-GRID
              correspond respectively to standard profiles, custom profiles,
              windows and doors, and grating. Product specifications and supply
              scope are confirmed separately for each order.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-bg2 py-[48px]">
        <div className="mx-auto max-w-[1320px] px-[20px] sm:px-[28px] lg:px-[36px]">
          <h2 className="text-f31 font-bold text-t1">
            Panel profiles & application-specific components
          </h2>
          <p className="mt-[10px] max-w-[860px] text-f15 leading-relaxed text-t2">
            Browse existing commercial pages by use. Deck panels are profiles;
            molded grating uses a different manufacturing process. Concrete
            reinforcing bars have their own specification and are not
            interchangeable with ordinary solid rods.
          </p>
          <div className="mt-[20px] flex flex-wrap gap-[18px] text-f14 font-semibold text-teal-text">
            <Link href="/products/fiberglass-sheets">Solid sheets →</Link>
            <Link href="/products/fiberglass-plates">
              Hollow & multi-cell profiles →
            </Link>
            <Link href="/products/frp-deck-panels">
              Decking & interlocking profiles →
            </Link>
          </div>
          <div className="mt-[26px] grid gap-[18px] md:grid-cols-2 lg:grid-cols-3">
            {applicationGroups.map((group) => (
              <div
                key={group.label}
                className="rounded-[10px] border border-border-default bg-white p-[22px]"
              >
                <h3 className="text-f19 font-bold text-t1">{group.label}</h3>
                <ul className="mt-[12px] space-y-[10px]">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-f14 text-teal-text hover:underline"
                      >
                        {link.label} →
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-[26px] flex flex-wrap gap-[24px] text-f14 font-bold text-teal-text">
            <Link href="/industries">Find your industry →</Link>
            <Link href="/applications">Explore applications →</Link>
            <Link href="/pultruded-frp-profiles">
              Pultruded FRP & GRP overview →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
