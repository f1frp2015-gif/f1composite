import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageSection from "@/components/layout/PageSection";
import InnerCTA from "@/components/sections/InnerCTA";
import CoverCard from "@/components/ui/CoverCard";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
import { company } from "@/content/data/company";
import { regionCovers } from "@/lib/covers";

/**
 * Hub for the country / market landing pages.
 *
 * URL template for NEW region pages (existing URLs keep their slugs — a 301
 * is not worth the equity risk): /regions/frp-<product-or-usecase>-<country>
 * e.g. frp-passive-house-windows-canada, frp-grating-supplier-saudi-arabia.
 * Keep "frp" first, country last, and register the page here, in
 * regionCovers (lib/covers.ts) and in app/sitemap.ts.
 * Global navigation links to this hub rather than duplicating every market page.
 */

export const metadata: Metadata = buildPageMetadata({
  title: "FRP Supplier by Market — USA, Canada, EU, UK, GCC, AU",
  description:
    "Market-specific FRP pultrusion supply: standards, certifications, duties and logistics for the USA, Canada, Germany, UK, Saudi Arabia, UAE and Australia.",
  path: "/regions",
});

const markets = [
  {
    region: "United States",
    title: "FRP pultrusion supplier for USA projects",
    href: "/regions/frp-pultrusion-supplier-usa",
    focus:
      "ASTM test methods, AAMA 2604 / 2605 finishes, PHI-certified window frames, and DDP quotes with US duties itemized.",
    standards: ["ASTM", "AAMA 2605", "PHI 2491wi03"],
  },
  {
    region: "Canada",
    title: "FRP passive house windows for Canada",
    href: "/regions/frp-passive-house-windows-canada",
    focus:
      "PHI-certified window frames for cold-climate and Passive House projects, with NAFS and CSA A440 reports on request.",
    standards: ["PHI 2491wi03", "NAFS", "CSA A440"],
  },
  {
    region: "Germany",
    title: "FRP passive house windows for Germany",
    href: "/regions/frp-passive-house-windows-germany",
    focus:
      "PHI-certified 90-series windows (Uw 0.78 W/m²·K) for Passivhaus and GEG projects, outside the EU aluminum duties and CBAM.",
    standards: ["PHI 2491wi03", "EN 14351-1"],
  },
  {
    region: "United Kingdom",
    title: "GRP windows for the UK",
    href: "/regions/grp-windows-uk",
    focus:
      "GRP window profiles for UK fabricators and complete units for Part L and Passivhaus projects, with CE or UKCA documents on request.",
    standards: ["Part L", "UKCA", "EN 14351-1"],
  },
  {
    region: "Saudi Arabia",
    title: "FRP grating for Saudi Arabia",
    href: "/regions/frp-grating-supplier-saudi-arabia",
    focus:
      "Grating and structural profiles for petrochemical, desalination and mining sites, with vinyl ester options and delivery to Jubail, Dammam or Riyadh.",
    standards: ["Vinyl ester", "ASTM E84"],
  },
  {
    region: "United Arab Emirates",
    title: "FRP cable tray for UAE oil and gas",
    href: "/regions/frp-cable-tray-uae-oil-gas",
    focus:
      "Cable tray and support systems for UAE oil and gas projects, with vinyl ester options and fire test reports on request.",
    standards: ["NEMA FG 1", "IEC 61537"],
  },
  {
    region: "Australia",
    title: "FRP solar mounting for Australia",
    href: "/regions/pultruded-frp-solar-mounting-australia",
    focus:
      "Fiberglass rails and mounting profiles for coastal and cyclonic sites, checked against AS/NZS 1170.2 wind loads for each project.",
    standards: ["AS/NZS 1170.2", "AS/NZS 5033"],
  },
] as const;

export default function RegionsHubPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "FRP Supplier by Market",
          url: absoluteUrl("/regions"),
          hasPart: markets.map((m) => ({
            "@type": "WebPage",
            name: m.title,
            url: absoluteUrl(m.href),
          })),
        }}
      />
      <PageHeader
        tag="Markets"
        title="FRP supply by market"
        description="Standards, import duties and site conditions differ from one market to the next. Each page below covers the standards and documents a market asks for, how we ship there, and the FRP products we supply to it most often."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Markets" }]}
      />

      <PageSection id="markets" title="Market pages" count={`${markets.length} markets`} tone="white">
        <ul className="grid gap-[12px] md:grid-cols-2 lg:grid-cols-3 lg:gap-[16px]">
          {markets.map((m, index) => (
            <li key={m.href}>
              <CoverCard
                href={m.href}
                cover={regionCovers[m.href]}
                label={<span className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">{m.region}</span>}
                title={m.title}
                text={m.focus}
                facts={[...m.standards]}
                action="Open the market page"
                priority={index < 3}
                sizes="(max-width: 767px) 94vw, (max-width: 1023px) 46vw, 400px"
              />
            </li>
          ))}
          <li className="lg:col-span-2">
            <div className="flex h-full flex-col justify-center rounded-card border border-border-default bg-bg2 p-[20px] sm:p-[24px]">
              <h3 className="text-f18 font-bold text-t1">Market not listed?</h3>
              <p className="mt-[8px] max-w-[560px] text-f14 leading-golden text-t2">
                We ship to {company.exportCountries} countries; these pages only cover the markets where we keep
                standards and shipping notes on file. Send your project location and specification, and we will tell
                you which standards and documents apply.
              </p>
              <Link href="/contact?source=regions-hub&inquiry_type=rfq" className="mt-[12px] inline-flex min-h-[44px] items-center text-f14 font-semibold text-teal-text hover:underline">
                Send your project location <span aria-hidden="true" className="ml-[6px]">→</span>
              </Link>
            </div>
          </li>
        </ul>
      </PageSection>

      <InnerCTA
        title="Tell us where the project is, and we will quote with the right standards and duties."
        quoteHref="/contact?source=regions-hub&inquiry_type=rfq"
      />
    </>
  );
}
