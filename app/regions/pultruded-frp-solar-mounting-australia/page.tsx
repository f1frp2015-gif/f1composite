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
  "FRP Solar Mounting Australia — Fiberglass Racking Supplier";
const pageDescription =
  "Pultruded FRP solar racking for AU utility, commercial, rooftop. Corrosion-proof, AS/NZS-compliant, lower foundation cost than aluminum, 25-yr UV-stable.";
const pagePath = "/regions/pultruded-frp-solar-mounting-australia";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
});

const faqs = [
  {
    question: "Why specify FRP instead of aluminum for solar mounting in Australia?",
    answer:
      "FRP solves three problems that aluminum does not: (1) coastal corrosion at solar farms in NSW, QLD, WA, and TAS, where aluminum 6063-T5 can still pit under salt fog despite anodizing; (2) bimetallic corrosion at steel-pile and aluminum-rail interfaces, a dominant failure mode on Australian solar farms over 10 years; and (3) foundation cost. FRP is 30–35% lighter than aluminum 6063, which reduces pile loads, required helical-pile depth, and concrete pad volume. The 25-year UV stability of pultruded FRP with synthetic surfacing veils is independently documented. Aluminum does not degrade from UV exposure, but it does have a salt-corrosion pathway that FRP does not.",
  },
  {
    question: "Does FRP solar mounting comply with Australian standards (AS/NZS)?",
    answer:
      "Yes. F1 Composite supplies FRP solar mounting profiles to AS/NZS 1170.2 (wind loads, including Region C/D cyclonic), AS 4100 / AS 1664 design philosophy (referenced for FRP per the Composites Industry Association guidelines), and AS/NZS 4680 for connection hardware. UV stability is qualified per AS 4674 weathering equivalence. For projects requiring Clean Energy Council (CEC) listed components, F1 Composite participates in the project-specific qualification pathway through tier-1 Australian solar EPCs.",
  },
  {
    question: "What weight delta does FRP deliver on solar mounting versus aluminum 6063?",
    answer:
      "Pultruded FRP density is 1.9 g/cm³ versus aluminum 6063 at 2.70 g/cm³ — a 30% weight reduction at equivalent cross-section. For a typical Australian utility-scale tracker, the rail-and-purlin assembly weight drops from ~9.5 kg/m² (aluminum) to ~6.6 kg/m² (FRP). Across a 50 MW solar farm this is ~250 tonnes of structural weight removed from the foundation system. Helical-pile penetration depth typically reduces by 0.5–1.0 m and pile centers can stretch 5–10%, both of which compound into significant foundation cost savings.",
  },
  {
    question: "How does FRP perform under Australian UV exposure over 25 years?",
    answer:
      "Pultruded FRP profiles for outdoor solar service use isophthalic polyester or polyurethane resin matrices, a synthetic surfacing veil, and a UV-stabilized topcoat. Australian UV intensity is among the highest in the world. The standard references are the Florida and Arizona accelerated-weathering benchmarks, which Australian sites match or exceed. F1 Composite&apos;s UV-qualified solar mounting profiles retain more than 90% of their tensile and flexural properties after exposure equivalent to 25 years, verified through ASTM G155 and G154 cycle testing plus 10 years of field data from Northern Territory installations. Pigmented white or gray profiles further reduce surface-temperature gain.",
  },
  {
    question: "What lead times and ports are typical for Australian solar projects?",
    answer:
      "Sea freight from Shanghai or Ningbo to Sydney, Melbourne, Brisbane, Adelaide, Fremantle, or Port Kembla runs 18–28 days. F1 Composite typically quotes CIF or DAP to the project staging area. Stock standard FRP solar mounting profiles ship in 5–7 weeks PO-to-port; custom-designed solar mounting profiles add 3–5 weeks for tooling. For multi-MW projects, container forecasting begins 8 weeks before first installation to avoid storage at port. A typical 50 MW solar farm requires 25–35 × 40HC containers of FRP profiles.",
  },
  {
    question: "Is FRP solar mounting cost-competitive with aluminum and galvanized steel?",
    answer:
      "On per-kilogram material cost, FRP is 1.5–2.0× aluminum 6063 in 2026. On per-installed-MW cost — the only comparison that matters at the project level — FRP is roughly cost-neutral with aluminum when foundation savings are included, and 8–15% above galvanized steel. FRP wins clearly over both alternatives in coastal Australian projects (where galvanized steel needs heavier coatings and aluminum suffers chloride pitting), in projects with a 30+ year design life, and in projects where O&M cost over the asset lifecycle is the optimization target, not up-front installed cost alone.",
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
    provider: { "@id": "https://www.f1composite.com/#organization" },
  };

  return (
    <>
      <JsonLd data={webPageSchema} />

      <PageHeader
        tag="Australia"
        title="Pultruded FRP Solar Mounting for Australian Projects"
        description="Direct-from-factory fiberglass solar racking and mounting profiles for Australian utility-scale, commercial, and rooftop solar. AS/NZS 1170.2 wind compliant, 25-year UV-stable, 30% lighter than aluminum 6063. CIF or DAP to all major Australian ports."
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
              alt="Pultruded FRP solar mounting racking on an Australian ground-mount solar array — corrosion-proof, AS/NZS 1170.2 wind-rated"
              width={1280}
              height={600}
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="h-auto w-full object-cover"
              preload
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Why FRP for Australian Solar</SectionTag>
          <h2 className="mt-[21px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-t1">
            The aluminum-vs-galvanized-steel debate misses the corrosion failure mode that wins on 30-year asset life
          </h2>
          <div className="mt-[34px] grid gap-[34px] lg:grid-cols-2">
            <div className="space-y-[21px] text-f15 leading-golden text-t2">
              <p>
                Australian utility-scale solar projects generally use one of two default mounting materials: galvanized steel for inland projects because of its lower initial cost and an accepted 25-year hot-dip-galvanized service life, or aluminum 6063 for coastal projects because it is lighter and avoids galvanic-pair failure with steel piles, although it remains susceptible to chloride pitting. Both materials work, but neither captures all the structural cost savings available over the 30-year asset life that financed solar projects increasingly require.
              </p>
              <p>
                Pultruded FRP solar mounting is a third path. It is 30% lighter than aluminum 6063 — directly reducing helical-pile depth and concrete foundation volume — and immune to both chloride corrosion and galvanic-pair failure with steel piles. F1 Composite supplies the profile family directly from factory, ex-China, to all major Australian ports, with project-specific designs reviewed against AS/NZS 1170.2 wind loads (Regions A through D, including cyclonic).
              </p>
            </div>
            <div className="space-y-[21px] text-f15 leading-golden text-t2">
              <p>
                The cost story is project-dependent. On per-kilogram material cost, FRP is more expensive than aluminum 6063 and considerably more expensive than galvanized steel. On per-installed-MW cost — including foundation, transport, installation labor, and 25-year O&M — FRP is roughly cost-neutral with aluminum and 8–15% above galvanized steel. Where FRP wins clearly: coastal sites, 30+ year design lives, and projects that financially model O&M cost over the asset lifecycle.
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
          <SectionTag>FRP vs Aluminum 6063</SectionTag>
          <h2 className="mt-[21px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-t1">
            Material comparison at a typical solar mounting cross-section
          </h2>
          <div className="mt-[34px] overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-border-default">
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">Property</th>
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">Pultruded FRP (E-glass / polyester)</th>
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">Aluminum 6063-T5</th>
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
            <LinkArrow href="/products/custom-pultruded-profiles">Custom solar mounting profiles</LinkArrow>
            <LinkArrow href="/ai/sourcing">Free FRP Sourcing Assistant</LinkArrow>
            <LinkArrow href="/resources/blog/frp-profile-cost-benchmarks-and-lead-times-2026">
              2026 FRP cost benchmarks
            </LinkArrow>
          </div>

          <FAQ items={faqs} />
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
              <h3 className="text-f15 font-bold text-t1">FRP vs Steel & Aluminum</h3>
              <p className="mt-[5px] text-f13 leading-golden text-t2">Mechanical, corrosion, and lifecycle comparison across the three structural material families.</p>
            </Link>
          </div>
        </div>
      </section>

      <InnerCTA title="Request a CIF quote for pultruded FRP solar mounting delivered to Sydney, Melbourne, or Fremantle" />
    </>
  );
}
