import Link from "next/link";
import ProductSection from "@/components/products/ProductSection";

const resources = [
  {
    title: "Technical Data",
    description: "Mechanical properties, resin options, standards, and engineering reference values.",
    href: "/resources/technical-data",
    action: "Review data",
  },
  {
    title: "Profile & Span Tools",
    description: "Shortlist a profile, check section properties, and review preliminary span guidance.",
    href: "/frp-profile-calculator",
    action: "Open tools",
  },
  {
    title: "Downloads & CAD",
    description: "Catalogs, product datasheets, published test reports, design guides and available CAD files.",
    href: "/resources/downloads",
    action: "Browse downloads",
  },
  {
    title: "Density & Weight Calculator",
    description: "Estimate FRP density and weight per metre from composition, layup and section geometry.",
    href: "/frp-density-calculator",
    action: "Calculate density & weight",
  },
];

const secondaryLinks = [
  { label: "Design Guides", href: "/resources/design-guides" },
  { label: "Engineering Blog", href: "/resources/blog" },
  { label: "Price Estimator", href: "/fiberglass-pultruded-profile-price" },
  { label: "DDP, Tariffs & HS Codes", href: "/resources/frp-pultrusion-fob-ddp-export-guide" },
];

export default function DownloadsSnapshot() {
  return (
    <ProductSection
      id="resources"
      title="Engineering resources for profile selection"
      intro="Find section data, drawings, test evidence and preliminary tools for your FRP project."
      aside={
        <Link href="/resources" className="font-bold text-teal-text">
          Browse resources →
        </Link>
      }
    >
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-card border border-border-default bg-border-default md:grid-cols-2 xl:grid-cols-4">
        {resources.map((resource) => (
          <Link
            key={resource.href}
            href={resource.href}
            className="group flex flex-col bg-white p-[22px] transition-colors hover:bg-bg2 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
          >
            <h3 className="text-f18 font-bold tracking-[-0.015em] text-t1 group-hover:text-teal-text">{resource.title}</h3>
            <p className="mt-[7px] text-f14 leading-relaxed text-t2">{resource.description}</p>
            <span className="mt-auto pt-[14px] text-f14 font-bold text-teal-text">{resource.action} →</span>
          </Link>
        ))}
      </div>

      <div className="mt-[17px] flex flex-wrap gap-x-[22px] gap-y-[6px]">
        {secondaryLinks.map((link) => (
          <Link key={link.href} href={link.href} className="text-f14 font-semibold text-t2 hover:text-teal-text">
            {link.label}
          </Link>
        ))}
      </div>
    </ProductSection>
  );
}
