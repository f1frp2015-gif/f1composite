import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
import { company } from "@/content/data/company";

/**
 * Hub for the country / market landing pages.
 *
 * URL template for NEW region pages (existing URLs keep their slugs — a 301
 * is not worth the equity risk): /regions/frp-<product-or-usecase>-<country>
 * e.g. frp-passive-house-windows-canada, frp-grating-supplier-saudi-arabia.
 * Keep "frp" first, country last, and register the page here + in app/sitemap.ts.
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
    flag: "🇺🇸",
    title: "Pultruded FRP Profiles for US Projects, Delivered DDP",
    href: "/regions/frp-pultrusion-supplier-usa",
    focus:
      "ASTM test methods, AAMA 2604/2605 finishes, PHI-certified window frames, and DDP quotes with US duties itemized.",
    standards: ["ASTM", "AAMA 2605", "PHI 2491wi03"],
  },
  {
    region: "Canada",
    flag: "🇨🇦",
    title: "FRP Passive House Windows — Canada",
    href: "/regions/frp-passive-house-windows-canada",
    focus:
      "PHI-certified window frames for cold-climate and Passive House projects, with NAFS and CSA A440 reports on request.",
    standards: ["PHI 2491wi03", "NAFS", "CSA A440"],
  },
  {
    region: "Germany",
    flag: "🇩🇪",
    title: "FRP Passive House Windows — Germany",
    href: "/regions/frp-passive-house-windows-germany",
    focus:
      "PHI-certified 90-series frames (Uf 0.78 W/m²·K) for Passivhaus and GEG projects.",
    standards: ["PHI 2491wi03", "EN 14351-1"],
  },
  {
    region: "United Kingdom",
    flag: "🇬🇧",
    title: "GRP Windows UK — Pultruded Fiberglass Frames",
    href: "/regions/grp-windows-uk",
    focus:
      "GRP window profiles for UK fabricators, with help on the UKCA and CE marking documents.",
    standards: ["UKCA", "EN 14351-1"],
  },
  {
    region: "Saudi Arabia",
    flag: "🇸🇦",
    title: "FRP Grating Supplier — Saudi Arabia",
    href: "/regions/frp-grating-supplier-saudi-arabia",
    focus:
      "Grating and structural profiles for petrochemical, desalination and mining sites, with vinyl ester options and delivery to Jubail, Dammam or Riyadh.",
    standards: ["Vinyl ester", "EN 13706"],
  },
  {
    region: "United Arab Emirates",
    flag: "🇦🇪",
    title: "FRP Cable Tray — UAE Oil & Gas",
    href: "/regions/frp-cable-tray-uae-oil-gas",
    focus:
      "Cable tray and support systems for UAE oil and gas projects, with vinyl ester options and fire test reports on request.",
    standards: ["NEMA FG 1", "IEC 61537"],
  },
  {
    region: "Australia",
    flag: "🇦🇺",
    title: "FRP Solar Mounting — Australia",
    href: "/regions/pultruded-frp-solar-mounting-australia",
    focus:
      "Fiberglass racking and mounting profiles engineered for AS/NZS 1170 wind regions and coastal exposure.",
    standards: ["AS/NZS 1170.2"],
  },
];

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
        title="FRP Supply by Market"
        description="Standards, import duties and site conditions differ from one market to the next. Each page below covers the standards and documents a market asks for, how we ship there, and the FRP products we supply to it most often."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Markets" }]}
      />
      <section className="bg-white pb-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="grid gap-[21px] md:grid-cols-2 lg:grid-cols-3">
            {markets.map((m) => (
              <Link
                key={m.href}
                href={m.href}
                className="group flex flex-col rounded-[8px] border border-border-default bg-white p-[21px] transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
              >
                <p className="text-f13 font-semibold uppercase tracking-[0.08em] text-t3">
                  <span aria-hidden="true" className="mr-[8px]">{m.flag}</span>
                  {m.region}
                </p>
                <h2 className="mt-[8px] text-f19 font-bold text-t1 group-hover:text-teal-text">
                  {m.title}
                </h2>
                <p className="mt-[8px] flex-1 text-f13 leading-golden text-t2">{m.focus}</p>
                <p className="mt-[13px] text-f12 font-semibold text-teal-text">
                  {m.standards.join(" · ")}
                </p>
              </Link>
            ))}
          </div>
          <p className="mt-[34px] text-f13 leading-golden text-t2">
            Market not listed? We ship to {company.exportCountries} countries; these pages
            only cover the markets where we keep standards and shipping notes on file. Send
            your project location and specification through the RFQ form and we will tell
            you which standards and documents apply.
          </p>
        </div>
      </section>
      <InnerCTA title="Tell us where the project is, and we will quote with the right standards and duties." />
    </>
  );
}
