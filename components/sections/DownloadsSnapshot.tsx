import Link from "next/link";
import LinkArrow from "@/components/ui/LinkArrow";
import SectionTag from "@/components/ui/SectionTag";

const resources = [
  {
    index: "01",
    title: "Technical Data",
    description: "Mechanical properties, resin options, standards, and engineering reference values.",
    href: "/resources/technical-data",
    action: "Review data",
  },
  {
    index: "02",
    title: "Calculators & Span Tables",
    description: "Shortlist a profile, check section properties, and review preliminary span guidance.",
    href: "/frp-profile-calculator",
    action: "Open tools",
  },
  {
    index: "03",
    title: "Downloads & CAD",
    description: "Catalogs, product datasheets, certificates, design guides, and available CAD files.",
    href: "/resources/downloads",
    action: "Browse downloads",
  },
  {
    index: "04",
    title: "Engineering Assistant",
    description: "Ask a product, specification, comparison, or sourcing question against the F1 knowledge base.",
    href: "/ask",
    action: "Ask a question",
  },
];

const secondaryLinks = [
  { label: "Design Guides", href: "/resources/design-guides" },
  { label: "Engineering Blog", href: "/resources/blog" },
  { label: "Price Estimator", href: "/fiberglass-pultruded-profile-price" },
  { label: "DDP, Tariffs & HS Codes", href: "/resources/ddp-tariff-hs-code-guide" },
];

export default function DownloadsSnapshot() {
  return (
    <section className="bg-bg2 py-[58px] md:py-[78px]">
      <div className="mx-auto max-w-[1320px] px-[20px] sm:px-[28px] lg:px-[36px]">
        <div className="flex flex-col gap-[16px] sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionTag>Engineering center</SectionTag>
            <h2 className="mt-[12px] max-w-[760px] text-[clamp(28px,3.2vw,42px)] font-bold leading-[1.12] tracking-[-0.035em] text-t1">
              Find the data before you send the RFQ
            </h2>
            <p className="mt-[10px] max-w-[720px] text-f15 leading-relaxed text-t2">
              Four focused entry points replace separate technology, resource, calculator, and AI menus.
            </p>
          </div>
          <LinkArrow href="/resources" className="shrink-0">Visit engineering center</LinkArrow>
        </div>

        <div className="mt-[28px] grid overflow-hidden rounded-[11px] border border-border-default bg-white md:grid-cols-2 xl:grid-cols-4">
          {resources.map((resource, index) => (
            <Link
              key={resource.href}
              href={resource.href}
              className={`group flex min-h-[235px] flex-col p-[22px] transition-colors hover:bg-teal-bg focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal ${
                index > 0 ? "xl:border-l xl:border-border-default" : ""
              } ${index > 1 ? "md:border-t xl:border-t-0" : ""} ${index % 2 === 1 ? "md:border-l md:border-border-default" : ""}`}
            >
              <span className="text-f11 font-extrabold text-teal-text">{resource.index}</span>
              <h3 className="mt-auto text-f19 font-bold tracking-[-0.015em] text-t1 group-hover:text-teal-text">
                {resource.title}
              </h3>
              <p className="mt-[7px] text-f13 leading-relaxed text-t2">{resource.description}</p>
              <span className="mt-[14px] text-f13 font-bold text-teal-text">{resource.action} →</span>
            </Link>
          ))}
        </div>

        <div className="mt-[17px] flex flex-wrap gap-x-[22px] gap-y-[6px]">
          {secondaryLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-f13 font-semibold text-t2 hover:text-teal-text">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
