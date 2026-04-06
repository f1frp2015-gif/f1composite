import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import SolutionCard from "@/components/ui/SolutionCard";
import SectionTag from "@/components/ui/SectionTag";
import LinkArrow from "@/components/ui/LinkArrow";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/seo/JsonLd";
import { productCategories } from "@/content/data/products";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Pultruded FRP Profiles & Fiberglass Structural Shapes",
  description:
    "Browse pultruded FRP profiles: fiberglass I-beams, channels, angles, tubes, custom pultrusion shapes, fenestration window frames, and FRP gratings. Corrosion-free, 75% lighter than steel, EN 13706 certified.",
  path: "/products",
  image: "/products/opengraph-image",
});

const iconMap: Record<string, React.ReactNode> = {
  profiles: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect x="2" y="3" width="4" height="14" rx="1" fill="#00A199" />
      <rect x="8" y="3" width="10" height="3" rx="1" fill="#00A199" />
      <rect x="8" y="11" width="10" height="3" rx="1" fill="#00A199" />
    </svg>
  ),
  custom: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M10 2L18 10L10 18L2 10L10 2Z" stroke="#00A199" strokeWidth="2" fill="none" />
      <circle cx="10" cy="10" r="3" fill="#00A199" />
    </svg>
  ),
  fenestration: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect x="2" y="2" width="16" height="16" rx="2" stroke="#00A199" strokeWidth="2" />
      <line x1="10" y1="2" x2="10" y2="18" stroke="#00A199" strokeWidth="2" />
      <line x1="2" y1="10" x2="18" y2="10" stroke="#00A199" strokeWidth="2" />
    </svg>
  ),
  gratings: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <line x1="2" y1="5" x2="18" y2="5" stroke="#00A199" strokeWidth="2" />
      <line x1="2" y1="10" x2="18" y2="10" stroke="#00A199" strokeWidth="2" />
      <line x1="2" y1="15" x2="18" y2="15" stroke="#00A199" strokeWidth="2" />
      <line x1="6" y1="2" x2="6" y2="18" stroke="#00A199" strokeWidth="1.5" />
      <line x1="14" y1="2" x2="14" y2="18" stroke="#00A199" strokeWidth="1.5" />
    </svg>
  ),
};

export default function ProductsPage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "F1 Composite Products",
    description:
      "Pultruded FRP profiles, custom pultrusions, fenestration systems, and gratings engineered for industrial and infrastructure projects.",
    url: absoluteUrl("/products"),
    hasPart: productCategories.map((cat) => ({
      "@type": "WebPage",
      name: cat.title,
      url: absoluteUrl(cat.href),
      description: cat.description,
    })),
  };

  return (
    <>
      <JsonLd data={collectionSchema} />
      <PageHeader
        tag="Products"
        title="Engineered FRP Solutions for Every Application"
        description="From stock structural profiles to fully custom pultrusions, we deliver fiber-reinforced polymer (FRP) products that outperform steel and aluminum in corrosive, high-load, and thermally demanding environments."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products" },
        ]}
      />

      {/* Product Categories */}
      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Product Range</SectionTag>
          <h2 className="mt-[8px] max-w-[800px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Pultruded FRP Profiles
          </h2>
          <p className="mt-[8px] max-w-[800px] text-f15 leading-golden text-t2">
            Pultrusion technology unlocks new possibilities for advanced composite materials — stronger, lighter, and built to last.
          </p>

          <div className="mt-[34px] grid gap-[21px] sm:grid-cols-2 lg:grid-cols-4">
            {productCategories.map((cat) => (
              <SolutionCard
                key={cat.slug}
                title={cat.title}
                description={cat.description}
                href={cat.href}
                icon={iconMap[cat.icon]}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Pultruded FRP */}
      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Why FRP</SectionTag>
          <h2 className="mt-[21px] max-w-[800px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            The material advantage
          </h2>
          <div className="mt-[34px] grid gap-[34px] md:grid-cols-3">
            <div>
              <h3 className="mb-[8px] text-[17px] font-bold text-t1">75% lighter than steel</h3>
              <p className="text-f15 leading-golden text-t2">
                FRP profiles deliver comparable structural performance at a
                fraction of the weight, reducing transport costs, simplifying
                installation, and eliminating the need for heavy lifting
                equipment on site.
              </p>
            </div>
            <div>
              <h3 className="mb-[8px] text-[17px] font-bold text-t1">Zero corrosion</h3>
              <p className="text-f15 leading-golden text-t2">
                Unlike steel or aluminum, pultruded FRP profiles are inherently
                resistant to moisture, salt spray, chemical exposure, and UV
                degradation. No coatings, no maintenance cycles, no replacement.
              </p>
            </div>
            <div>
              <h3 className="mb-[8px] text-[17px] font-bold text-t1">Thermal insulation built in</h3>
              <p className="text-f15 leading-golden text-t2">
                Glass-fiber-reinforced polymers conduct heat at 1/170th the rate
                of aluminum. That thermal break is structural, not added, making
                FRP ideal for fenestration and building envelope applications.
              </p>
            </div>
          </div>
          <div className="mt-[34px]">
            <LinkArrow href="/technology/frp-vs-traditional-materials">
              Compare FRP to steel and aluminum
            </LinkArrow>
          </div>
        </div>
      </section>

      {/* Can't Find Section */}
      <section className="bg-bg2 py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px] text-center">
          <h2 className="text-f24 font-bold text-t1">
            Can&apos;t find what you need?
          </h2>
          <p className="mx-auto mt-[13px] max-w-[640px] text-f15 leading-golden text-t2">
            If your application demands a unique cross-section, specific resin
            chemistry, or non-standard fiber architecture, our custom pultrusion
            line can deliver it. We also welcome technical inquiries at any
            stage of your project.
          </p>
          <div className="mt-[21px] flex flex-wrap justify-center gap-[13px]">
            <Button href="/products/custom-pultrusions">Custom Pultrusions</Button>
            <Button href="/contact" variant="secondary">
              Contact Engineering
            </Button>
          </div>
        </div>
      </section>

      {/* Process Cross-link */}
      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="flex flex-col items-start gap-[13px] md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-f19 font-bold text-t1">
                Understand how we manufacture
              </h2>
              <p className="mt-[5px] max-w-[640px] text-f15 leading-golden text-t2">
                Learn about pultrusion, our primary manufacturing process, and
                the quality controls that guarantee repeatable mechanical
                performance.
              </p>
            </div>
            <LinkArrow href="/technology/pultrusion-process">
              Pultrusion process explained
            </LinkArrow>
          </div>
        </div>
      </section>

      <InnerCTA title="Ready to specify FRP for your next project?" />
    </>
  );
}
