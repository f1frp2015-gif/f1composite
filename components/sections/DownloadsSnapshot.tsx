import Link from "next/link";
import ProductSection from "@/components/products/ProductSection";
import CoverCard from "@/components/ui/CoverCard";
import { coverFor } from "@/lib/covers";

const resources = [
  {
    title: "Technical data",
    description: "Mechanical properties, resin options, standards and engineering reference values.",
    href: "/resources/technical-data",
    action: "Review data",
  },
  {
    title: "Profile and span tools",
    description: "Shortlist a profile, check section properties and review preliminary span guidance.",
    href: "/frp-profile-calculator",
    action: "Open tools",
  },
  {
    title: "Downloads and CAD",
    description: "Catalogs, product datasheets, published test reports, design guides and available CAD files.",
    href: "/resources/downloads",
    action: "Browse downloads",
  },
  {
    title: "Density and weight calculator",
    description: "Estimate FRP density and weight per meter from composition, layup and section geometry.",
    href: "/frp-density-calculator",
    action: "Calculate density and weight",
  },
];

const secondaryLinks = [
  { label: "Design guides", href: "/resources/design-guides" },
  { label: "Engineering blog", href: "/resources/blog" },
  { label: "Price estimator", href: "/fiberglass-pultruded-profile-price" },
  { label: "DDP, tariffs and HS codes", href: "/resources/frp-pultrusion-fob-ddp-export-guide" },
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
      <ul className="grid grid-cols-2 gap-[12px] xl:grid-cols-4 lg:gap-[16px]">
        {resources.map((resource) => {
          const cover = coverFor(resource.href);
          if (!cover) throw new Error(`No cover registered for ${resource.href}`);
          return (
            <li key={resource.href}>
              <CoverCard
                href={resource.href}
                cover={cover}
                title={resource.title}
                text={resource.description}
                action={resource.action}
                compact
                sizes="(max-width: 1279px) 46vw, 290px"
              />
            </li>
          );
        })}
      </ul>

      <div className="mt-[16px] flex flex-wrap gap-x-[20px] gap-y-[6px]">
        {secondaryLinks.map((link) => (
          <Link key={link.href} href={link.href} className="text-f14 font-semibold text-t2 hover:text-teal-text">
            {link.label}
          </Link>
        ))}
      </div>
    </ProductSection>
  );
}
