import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

/**
 * Hub for the country / market landing pages.
 *
 * URL template for NEW region pages (existing URLs keep their slugs — a 301
 * is not worth the equity risk): /regions/frp-<product-or-usecase>-<country>
 * e.g. frp-passive-house-windows-canada, frp-grating-supplier-saudi-arabia.
 * Keep "frp" first, country last, and register the page here + in
 * footerNav.markets + app/sitemap.ts.
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
    title: "ASTM-Compliant FRP Pultrusions — Direct to US Projects",
    href: "/regions/frp-pultrusion-supplier-usa",
    focus:
      "ASTM E84 Class A, AAMA 2604/2605 finishes, PHIUS-aligned frames, DDP with Section 301 duty pre-itemized.",
    standards: ["ASTM E84", "AAMA 2605", "PHIUS"],
  },
  {
    region: "Canada",
    flag: "🇨🇦",
    title: "FRP Passive House Windows — Canada",
    href: "/regions/frp-passive-house-windows-canada",
    focus:
      "NRCan ENERGY STAR and PHI-certified fenestration for cold-climate and passive house projects.",
    standards: ["PHI", "NRCan ENERGY STAR", "NAFS"],
  },
  {
    region: "Germany",
    flag: "🇩🇪",
    title: "FRP Passive House Windows — Germany",
    href: "/regions/frp-passive-house-windows-germany",
    focus:
      "PHI component-certified frames (U_f 0.85 W/m²·K class) for Passivhaus and EnEV/GEG projects.",
    standards: ["PHI 2491wi03", "EN 14351-1"],
  },
  {
    region: "United Kingdom",
    flag: "🇬🇧",
    title: "GRP Windows UK — Pultruded Fibreglass Frames",
    href: "/regions/grp-windows-uk",
    focus:
      "GRP fenestration and profiles for UK fabricators — UKCA/CE pathways and document support.",
    standards: ["UKCA", "EN 14351-1"],
  },
  {
    region: "Saudi Arabia",
    flag: "🇸🇦",
    title: "FRP Grating Supplier — Saudi Arabia",
    href: "/regions/frp-grating-supplier-saudi-arabia",
    focus:
      "Gratings and structural profiles for Aramco, SABIC and Maaden environments — vinyl ester duty, Jubail/Dammam/Riyadh logistics.",
    standards: ["Aramco specs", "ISO 9001"],
  },
  {
    region: "United Arab Emirates",
    flag: "🇦🇪",
    title: "FRP Cable Tray — UAE Oil & Gas",
    href: "/regions/frp-cable-tray-uae-oil-gas",
    focus:
      "Cable tray and support systems for ADNOC / DUSUP oil and gas infrastructure.",
    standards: ["NEMA FG-1", "IEC 61537"],
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
        description="Every export market has its own standards stack, duty regime, and failure modes. These market pages cover what actually changes by geography — certifications, compliance documents, logistics, and the FRP product families each market buys most."
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
            Shipping to a market not listed here? We export worldwide — the market pages
            above are simply where we maintain dedicated standards and logistics
            documentation. Send your project location and spec via the RFQ form and we
            will map the compliance path for your jurisdiction.
          </p>
        </div>
      </section>
      <InnerCTA title="Tell us your project location — we will quote with the right standards and duty treatment." />
    </>
  );
}
