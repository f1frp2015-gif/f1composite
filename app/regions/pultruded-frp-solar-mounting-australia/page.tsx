import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import SectionTag from "@/components/ui/SectionTag";
import LinkArrow from "@/components/ui/LinkArrow";
import FAQ from "@/components/ui/FAQ";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

const pageTitle =
  "Pultruded FRP Solar Mounting in Australia — Fiberglass Solar Racking Supplier";
const pageDescription =
  "Pultruded FRP solar mounting structures for Australian utility-scale, commercial, and rooftop solar. Direct-from-China factory supplier — corrosion-proof fiberglass racking, AS/NZS-compliant, lower foundation cost than aluminium, 25-year UV-stable.";
const pagePath = "/regions/pultruded-frp-solar-mounting-australia";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
});

const faqs = [
  {
    question: "Why specify FRP instead of aluminium for solar mounting in Australia?",
    answer:
      "FRP solves three problems aluminium does not: (1) coastal corrosion in NSW, QLD, WA, and TAS coastal solar farms, where aluminium 6063-T5 still suffers pitting under salt fog despite anodising; (2) bimetallic corrosion at steel-pile / aluminium-rail interfaces, which is the dominant failure mode on Australian solar farms over 10 years; (3) foundation cost — FRP is 30-35% lighter than aluminium 6063, so pile loads, helical-pile depth, and concrete pad volume all reduce. The 25-year UV stability of pultruded FRP with synthetic surfacing veils is independently documented; aluminium does not have a UV-degradation pathway, but it does have a salt-corrosion pathway that FRP simply does not.",
  },
  {
    question: "Does FRP solar mounting comply with Australian standards (AS/NZS)?",
    answer:
      "Yes. F1 Composite supplies FRP solar mounting profiles to AS/NZS 1170.2 (wind loads, including Region C/D cyclonic), AS 4100 / AS 1664 design philosophy (referenced for FRP per the Composites Industry Association guidelines), and AS/NZS 4680 for connection hardware. UV stability is qualified per AS 4674 weathering equivalence. For projects requiring Clean Energy Council (CEC) listed components, F1 Composite participates in the project-specific qualification pathway through tier-1 Australian solar EPCs.",
  },
  {
    question: "What weight delta does FRP deliver on solar mounting versus aluminium 6063?",
    answer:
      "Pultruded FRP density is 1.9 g/cm³ versus aluminium 6063 at 2.70 g/cm³ — a 30% weight reduction at equivalent cross-section. For a typical Australian utility-scale tracker, the rail-and-purlin assembly weight drops from ~9.5 kg/m² (aluminium) to ~6.6 kg/m² (FRP). Across a 50 MW solar farm this is ~250 tonnes of structural weight removed from the foundation system. Helical-pile penetration depth typically reduces by 0.5–1.0 m and pile centres can stretch 5–10%, both of which compound into significant foundation cost savings.",
  },
  {
    question: "How does FRP perform under Australian UV exposure over 25 years?",
    answer:
      "Pultruded FRP profiles for outdoor solar service are formulated with isophthalic polyester or polyurethane resin matrices, plus a synthetic surfacing veil and UV-stabilised topcoat. Australian UV intensity is among the highest globally — the standard reference is the Florida and Arizona accelerated weathering benchmarks, both of which Australian sites match or exceed. F1 Composite&apos;s UV-qualified solar mounting profiles maintain &gt;90% retained tensile and flexural properties after 25-year equivalent UV exposure (verified per ASTM G155 / G154 cycle testing, plus 10-year field data from Northern Territory installations). Pigmented (white or grey) profiles further reduce surface temperature gain.",
  },
  {
    question: "What lead times and ports are typical for Australian solar projects?",
    answer:
      "Sea freight from Shanghai or Ningbo to Sydney, Melbourne, Brisbane, Adelaide, Fremantle, or Port Kembla runs 18–28 days. F1 Composite typically quotes CIF or DAP to the project staging area. Stock standard FRP solar mounting profiles ship in 5–7 weeks PO-to-port; custom-designed solar mounting profiles add 3–5 weeks for tooling. For multi-MW projects, container forecasting begins 8 weeks before first installation to avoid storage at port. A typical 50 MW solar farm requires 25–35 × 40HC containers of FRP profiles.",
  },
  {
    question: "Is FRP solar mounting cost-competitive with aluminium and galvanized steel?",
    answer:
      "On per-kilogram material cost, FRP is 1.5–2.0× aluminium 6063 in 2026. On per-installed-MW cost — the only comparison that matters at the project level — FRP is roughly cost-neutral with aluminium when foundation savings are included, and 8–15% above galvanized steel. FRP wins clearly over both alternatives in coastal Australian projects (where galvanized steel needs heavier coatings and aluminium suffers chloride pitting), in projects with a 30+ year design life, and in projects where O&M cost over the asset lifecycle is being optimised rather than just up-front installed cost.",
  },
];

export default function AustraliaSolarPage() {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageTitle,
    description: pageDescription,
    url: absoluteUrl(pagePath),
    about: {
      "@type": "Thing",
      name: "Pultruded FRP solar mounting structures for Australian solar projects",
    },
    provider: {
      "@id": "https://www.f1composite.com/#organization",
      "@type": "Organization",
      name: "F1 Composite",
      url: absoluteUrl("/"),
    },
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Pultruded FRP Solar Mounting Profiles for Australia",
    description: pageDescription,
    url: absoluteUrl(pagePath),
    image: [absoluteUrl("/images/industries/frp-energy-solar-power-installation.jpg")],
    brand: { "@type": "Brand", name: "F1 Composite" },
    manufacturer: {
      "@id": "https://www.f1composite.com/#organization",
      "@type": "Organization",
      name: "F1 Composite",
    },
    category: "Pultruded FRP Solar Mounting",
    offers: {
      "@type": "AggregateOffer",
      url: absoluteUrl("/contact"),
      priceCurrency: "USD",
      lowPrice: "8",
      highPrice: "45",
      offerCount: "30",
      availability: "https://schema.org/InStock",
      eligibleRegion: { "@type": "Country", name: "Australia" },
      seller: {
        "@id": "https://www.f1composite.com/#organization",
        "@type": "Organization",
        name: "F1 Composite",
      },
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <JsonLd data={webPageSchema} />
      <JsonLd data={productSchema} />
      <JsonLd data={faqSchema} />

      <PageHeader
        tag="Australia"
        title="Pultruded FRP Solar Mounting for Australian Projects"
        description="Direct-from-factory fiberglass solar racking and mounting profiles for Australian utility-scale, commercial, and rooftop solar. AS/NZS 1170.2 wind compliant, 25-year UV-stable, 30% lighter than aluminium 6063. CIF or DAP to all major Australian ports."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Regions", href: "/regions/pultruded-frp-solar-mounting-australia" },
          { label: "Australia — FRP Solar Mounting" },
        ]}
      />

      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="overflow-hidden rounded-[8px]">
            <Image
              src="/images/industries/frp-energy-solar-power-installation.jpg"
              alt="Pultruded FRP solar mounting structures for Australian solar farm"
              width={1280}
              height={600}
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Why FRP for Australian Solar</SectionTag>
          <h2 className="mt-[21px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-t1">
            The aluminium-vs-galvanized-steel debate misses the corrosion failure mode that wins on 30-year asset life
          </h2>
          <div className="mt-[34px] grid gap-[34px] lg:grid-cols-2">
            <div className="space-y-[21px] text-f15 leading-golden text-t2">
              <p>
                Australian utility-scale solar has converged on two mounting material defaults: galvanized steel for inland projects (lower up-front cost, accept 25-year hot-dip galv life) and aluminium 6063 for coastal projects (lighter, no galvanic-pair failure with steel piles, but susceptible to chloride pitting). Both work — and both leave structural-cost optimisations on the table at the 30-year asset life that financed solar increasingly demands.
              </p>
              <p>
                Pultruded FRP solar mounting is a third path. It is 30% lighter than aluminium 6063 — directly reducing helical-pile depth and concrete foundation volume — and immune to both chloride corrosion and galvanic-pair failure with steel piles. F1 Composite supplies the profile family directly from factory, ex-China, to all major Australian ports, with project-specific designs reviewed against AS/NZS 1170.2 wind loads (Regions A through D, including cyclonic).
              </p>
            </div>
            <div className="space-y-[21px] text-f15 leading-golden text-t2">
              <p>
                The cost story is project-dependent. On per-kilogram material cost, FRP is more expensive than aluminium 6063 and considerably more expensive than galvanized steel. On per-installed-MW cost — including foundation, transport, installation labour, and 25-year O&M — FRP is roughly cost-neutral with aluminium and 8–15% above galvanized steel. Where FRP wins clearly: coastal sites, 30+ year design lives, and projects that financially model O&M cost over the asset lifecycle.
              </p>
              <p>
                The supply path matters too. Direct from F1 Composite&apos;s 5 production bases in China, FOB Shanghai or Ningbo with sea freight 18–28 days to Sydney, Melbourne, Brisbane, Adelaide, Fremantle, or Port Kembla. Project-spec FRP profiles ship in 11–16 weeks total (tooling + production + freight) for new cross-sections; existing tooled cross-sections cut this to 5–8 weeks.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>FRP vs Aluminium 6063</SectionTag>
          <h2 className="mt-[21px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-t1">
            Material comparison at a typical solar mounting cross-section
          </h2>
          <div className="mt-[34px] overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-border-default">
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">Property</th>
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">Pultruded FRP (E-glass / polyester)</th>
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">Aluminium 6063-T5</th>
                  <th className="py-[13px] text-f13 font-bold uppercase tracking-wide text-t1">Galvanized Steel</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { p: "Density (g/cm³)", frp: "1.9", al: "2.70", st: "7.85" },
                  { p: "Tensile strength (MPa)", frp: "240–400", al: "186 (T5)", st: "400 (A36)" },
                  { p: "Elastic modulus (GPa)", frp: "23–28", al: "69", st: "200" },
                  { p: "Thermal expansion (×10⁻⁶/°C)", frp: "8–12", al: "23.4", st: "11.7" },
                  { p: "Coastal salt-fog resistance", frp: "Immune", al: "Pits over 15+ yrs", st: "Sacrificial Zn, 15–25 yr" },
                  { p: "Galvanic pair w/ steel pile", frp: "None", al: "Yes (insulator req'd)", st: "None" },
                  { p: "UV stability (25-yr)", frp: ">90% retained", al: "100% (no UV failure)", st: "Coating-dependent" },
                ].map((row) => (
                  <tr key={row.p} className="border-b border-border-default">
                    <td className="py-[13px] pr-[21px] text-f15 font-medium text-t1">{row.p}</td>
                    <td className="py-[13px] pr-[21px] text-f15 text-t2">{row.frp}</td>
                    <td className="py-[13px] pr-[21px] text-f15 text-t2">{row.al}</td>
                    <td className="py-[13px] text-f15 text-t2">{row.st}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Common Solar Mounting Profiles</SectionTag>
          <div className="mt-[21px] grid gap-[21px] sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Solar Rail (purlin)", size: "80×40 / 100×50 mm hollow", note: "Module-row support, 4–6 m span" },
              { name: "Cross-Beam", size: "120×60 / 140×70 mm I-section", note: "Span between piles, 3–5 m" },
              { name: "Tilt Strut", size: "60×60 angle / 80×80 angle", note: "Tilt angle bracing" },
              { name: "Rooftop Adapter", size: "50×50 / 65×65 hollow", note: "Commercial rooftop attachment to seam clamps" },
            ].map((p) => (
              <div key={p.name} className="rounded-[8px] border border-border-default bg-white p-[21px]">
                <h3 className="text-f15 font-bold text-t1">{p.name}</h3>
                <p className="mt-[5px] text-f13 font-medium text-teal-text">{p.size}</p>
                <p className="mt-[5px] text-f13 leading-golden text-t2">{p.note}</p>
              </div>
            ))}
          </div>

          <div className="mt-[34px] flex flex-wrap gap-[13px]">
            <LinkArrow href="/products/custom-pultrusions">Custom solar mounting profiles</LinkArrow>
            <LinkArrow href="/ai/sourcing">Free FRP Sourcing Assistant</LinkArrow>
            <LinkArrow href="/resources/blog/frp-profile-cost-benchmarks-and-lead-times-2026">
              2026 FRP cost benchmarks
            </LinkArrow>
          </div>

          <FAQ items={faqs} suppressSchema />
        </div>
      </section>

      <section className="bg-bg2 py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Related Resources</SectionTag>
          <div className="mt-[21px] grid gap-[21px] sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/industries/energy"
              className="group rounded-[8px] border border-border-default bg-white p-[21px] transition-all hover:-translate-y-[2px] hover:border-teal-border"
            >
              <h3 className="text-f15 font-bold text-t1">Energy Industry — FRP for Solar & Wind</h3>
              <p className="mt-[5px] text-f13 leading-golden text-t2">FRP profiles in solar mounting, wind turbine secondary structures, and substation hardware.</p>
            </Link>
            <Link
              href="/case-studies/solar-farm-mounting"
              className="group rounded-[8px] border border-border-default bg-white p-[21px] transition-all hover:-translate-y-[2px] hover:border-teal-border"
            >
              <h3 className="text-f15 font-bold text-t1">Case Study: Solar Farm Mounting</h3>
              <p className="mt-[5px] text-f13 leading-golden text-t2">Project-scale FRP solar racking — installed weight, foundation savings, and 10-year UV inspection report.</p>
            </Link>
            <Link
              href="/technology/frp-vs-traditional-materials"
              className="group rounded-[8px] border border-border-default bg-white p-[21px] transition-all hover:-translate-y-[2px] hover:border-teal-border"
            >
              <h3 className="text-f15 font-bold text-t1">FRP vs Steel & Aluminium</h3>
              <p className="mt-[5px] text-f13 leading-golden text-t2">Mechanical, corrosion, and lifecycle comparison across the three structural material families.</p>
            </Link>
          </div>
        </div>
      </section>

      <InnerCTA title="Need pultruded FRP solar mounting quoted CIF Sydney, Melbourne, or Fremantle?" />
    </>
  );
}
