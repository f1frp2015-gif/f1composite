import { customProductPages } from "@/content/data/customProductPages";
import PageNav from "@/components/layout/PageNav";
import { specialistProductCategories } from "@/content/data/applicationNavigation";
import { specialistProductIndex } from "@/content/data/pultrusionGuideIndex";
import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageSection from "@/components/layout/PageSection";
import InnerCTA from "@/components/sections/InnerCTA";
import ProductFamilyCards from "@/components/sections/ProductFamilyCards";
import CollectionSchema from "@/components/seo/CollectionSchema";
import CoverCard from "@/components/ui/CoverCard";
import CoverLink from "@/components/ui/CoverLink";
import {
  productFamilies,
  applicationGroups,
} from "@/content/data/productTaxonomy";
import { coverFor } from "@/lib/covers";
import { buildPageMetadata } from "@/lib/seo";
import { getSeoQueryTarget } from "@/content/data/seoQueryTargets";

const path = "/products/product-lines";
const target = getSeoQueryTarget(path);
export const metadata: Metadata = buildPageMetadata({
  title: target.title,
  description: target.description,
  path,
});

// Panel-type profiles that sit between the structural shapes and the systems.
const panelProfiles = [
  { href: "/products/fiberglass-sheets", title: "Solid sheets", text: "Flat stock cut to size, smooth, gritted or embossed." },
  { href: "/products/fiberglass-plates", title: "Hollow and multi-cell profiles", text: "Plate profiles with enclosed cells, from source drawings." },
  { href: "/products/frp-deck-panels", title: "Decking and interlocking profiles", text: "Closed deck sections with interlocking edges." },
];

const link = "font-semibold text-teal-text underline underline-offset-4 hover:text-teal";

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
        title="FRP profiles, systems & connection components"
        description="F1 Composite specializes in standard and custom pultruded profiles. Explore windows and doors, molded and pultruded grating, GFRP concrete reinforcement, and fiberglass fasteners and fittings for complete project supply."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
      />

      <PageNav items={[{ id: "families", label: "Product families" }, { id: "specialist-components", label: "Specialist components" }, { id: "applications", label: "Panel & application profiles" }, { id: "custom-components", label: "Custom shapes" }]} />
      <PageSection id="families" title="Choose your product family" count={`${productFamilies.length} families`}>
        <ProductFamilyCards />
        <aside className="mt-[24px] grid grid-cols-1 gap-[16px] rounded-card border border-border-default bg-bg2 p-[20px] sm:p-[28px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-[40px]">
          <div>
            <h3 className="text-f20 font-bold text-t1">Standard section or custom development?</h3>
            <p className="mt-[8px] text-f16 leading-golden text-t2">
              Choose standard profiles when an established cross-section fits your design. Standard does not mean in stock: material, quantity, availability and delivery are confirmed at quotation. Choose custom profiles when a new geometry, interface or material requirement needs development. The same profile may serve several industries.
            </p>
          </div>
          <p className="text-f14 leading-golden text-t2 lg:pt-[36px]">
            The product-line names F1-STRUX, F1-FORM, F1-THERM and F1-GRID correspond respectively to standard profiles, custom profiles, windows and doors, and grating. Product specifications and supply scope are confirmed separately for each order.
          </p>
        </aside>
      </PageSection>

      <PageSection id="specialist-components" title="Specialist component selection" count={`${specialistProductIndex.length} guides`} intro="Compare the drawing inputs, material choices, interfaces and qualification required for dedicated FRP and CFRP components. Supply feasibility and the evidence for each configuration are confirmed during technical review.">
        <div className="grid gap-[36px]">
          {specialistProductCategories.map((category) => (
            <section key={category.id} id={category.id} aria-labelledby={`${category.id}-heading`} className="scroll-mt-[48px]">
              <h3 id={`${category.id}-heading`} className="mb-[16px] text-f20 font-bold text-t1">{category.label}</h3>
              <ul className="grid gap-[16px] md:grid-cols-2 lg:grid-cols-3">
                {category.slugs.map((slug) => {
                  const page = specialistProductIndex.find((page) => page.slug === slug);
                  return page ? <li key={slug}><CoverCard href={`/products/${slug}`} cover={coverFor(`/products/${slug}`)!} title={page.name} text={page.description} /></li> : null;
                })}
              </ul>
            </section>
          ))}
        </div>
      </PageSection>

      <PageSection
        id="applications"
        title="Panel profiles & application-specific components"
        tone="muted"
        intro="Browse product pages by use. Deck panels are profiles; molded grating uses a different manufacturing process. Concrete reinforcing bars have their own specification and are not interchangeable with ordinary solid rods."
      >
        <ul className="grid grid-cols-1 gap-[10px] md:grid-cols-3">
          {panelProfiles.map((item) => (
            <li key={item.href}>
              <CoverLink href={item.href} cover={coverFor(item.href)!} title={item.title} text={item.text} />
            </li>
          ))}
        </ul>
        <ul className="mt-[24px] grid grid-cols-1 gap-[16px] md:grid-cols-2 lg:grid-cols-3">
          {applicationGroups.map((group) => {
            const cover = coverFor(group.href);
            return (
              <li key={group.label}>
                {cover ? (
                  <CoverCard
                    href={group.href}
                    cover={cover}
                    title={group.label}
                    text={group.description}
                    footer={
                      <ul className="flex flex-col border-t border-border-default px-[18px] py-[6px] sm:px-[20px]">
                        {group.links.map((item) => (
                          <li key={item.href}>
                            <Link href={item.href} className="flex min-h-[36px] items-center justify-between gap-[12px] text-f14 font-semibold text-t2 hover:text-teal-text">
                              {item.label}
                              <span aria-hidden className="text-teal-text">→</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    }
                  />
                ) : null}
              </li>
            );
          })}
        </ul>
        <p className="mt-[24px] flex flex-wrap gap-x-[24px] gap-y-[8px] text-f14">
          <Link href="/industries" className={link}>Find your industry</Link>
          <Link href="/applications" className={link}>Explore applications</Link>
          <Link href="/pultruded-frp-profiles" className={link}>Pultruded FRP & GRP overview</Link>
        </p>
      </PageSection>

      <PageSection id="custom-components" title="Custom shapes & project components" intro="Review the configuration, interfaces and qualification needed for a project quotation.">
        <ul className="grid gap-[16px] md:grid-cols-2 lg:grid-cols-3">
          {customProductPages.map((page) => <li key={page.slug}><CoverCard href={`/products/${page.slug}`} cover={coverFor(`/products/${page.slug}`)!} title={page.name} text={page.description} /></li>)}
        </ul>
      </PageSection>

      <InnerCTA title="Not sure which product family fits your project?" />
    </>
  );
}
