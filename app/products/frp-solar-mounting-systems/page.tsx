import ProductNextSteps from "@/components/sections/ProductNextSteps";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import RelatedLinks from "@/components/sections/RelatedLinks";
import AskAICard from "@/components/ai/AskAICard";
import FAQ from "@/components/ui/FAQ";
import SectionTag from "@/components/ui/SectionTag";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, buildProductFamilyPageSchema } from "@/lib/seo";

const pageTitle = "FRP Solar Profiles: Module Frames, Rails & Supports";
const pageDescription =
  "FRP solar mounting systems for PV module frames, rails and supports: corrosion-resistant pultruded profiles engineered for rooftops, farms and coastal sites.";
const pagePath = "/products/frp-solar-mounting-systems";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
});

const profiles = [
  { model: "GTP-FCFG-3030-3", size: "30 × 30 mm", wall: "3.0 mm", area: "324 mm²", use: "Light bracing / secondary support" },
  { model: "GTP-FCFG-3060-3", size: "30 × 60 mm", wall: "3.0 mm", area: "504 mm²", use: "Module bearer / light rail" },
  { model: "GTP-FCFG-6060-3", size: "60 × 60 mm", wall: "3.0 mm", area: "684 mm²", use: "Posts and support framing" },
  { model: "GTP-FCFG-9090-5", size: "90 × 90 mm", wall: "5.0 mm", area: "1,713 mm²", use: "Primary posts / heavy support" },
  { model: "GTP-FCHB-8255-5", size: "55 × 82 mm", wall: "5.0 mm", area: "1,080 mm²", use: "H-section mounting rail" },
  { model: "GTP-FCCB-7550-4", size: "50 × 75 mm", wall: "4.0 mm", area: "782 mm²", use: "C-section purlin / rail" },
  { model: "GTP-FCCB-1005-4", size: "50 × 100 mm", wall: "4.0 mm", area: "896 mm²", use: "Deep C-section purlin" },
  { model: "GTP-FCHB-8080-5", size: "80 × 80 mm", wall: "5.0 mm", area: "1,374 mm²", use: "H-section primary rail" },
];

const faqItems = [
  {
    question: "Which photovoltaic products can F1 Composite supply?",
    answer:
      "The range covers three product families: custom pultruded profiles for solar-module perimeter frames; structural FRP profiles for ground-mount, floating, fishery-PV and agrivoltaic support frames; and lightweight rooftop rails supplied with mid clamps, end clamps, splice plates and roof-clamp interfaces. Profiles can be supplied as cut lineals or as a project-specific component kit.",
  },
  {
    question: "Can FRP solar mounting rails be used on existing industrial roofs?",
    answer:
      "Yes. Rooftop retrofit is a strong fit where the original roof has limited dead-load reserve. A typical pultruded GFRP rail weighs about 1.0–1.5 kg/m, compared with roughly 4–6 kg/m for a galvanized-steel rail. Final suitability still requires a project-specific roof survey and structural check for wind uplift, snow, seismic load and connection pull-out.",
  },
  {
    question: "How are panels and rails connected?",
    answer:
      "The standard assembly uses sliding nuts with M8×25 fasteners for module mid and end clamps, and M6×12 fasteners for rail splice plates. Standing-seam and trapezoidal-roof interfaces are selected for the roof sheet and can be configured as non-penetrating clamps where the roof geometry permits. Hardware schedules are confirmed with the module and roof drawings.",
  },
  {
    question: "Which resin system should be specified for PV supports?",
    answer:
      "UV-stabilized unsaturated polyester is the cost-effective baseline for normal outdoor service. Polyurethane provides the higher characteristic strength and modulus range for thin-wall, stiffness-sensitive sections. Vinyl ester is recommended for offshore, floating, high-salinity, fertilizer and aggressive industrial exposure. The laminate, veil and coating package is selected from the site's exposure class and design life.",
  },
  {
    question: "Do electrically insulating FRP rails eliminate every grounding requirement?",
    answer:
      "The FRP members do not create a conductive path and therefore do not need bonding as metallic rails do. The PV modules, inverter, cable system, metallic fasteners and lightning-protection system must still follow the electrical engineer's design and the applicable local code. Electrical isolation of the rail is a system advantage, not a waiver of project grounding and lightning-protection review.",
  },
];

export default function SolarMountingSystemsPage() {
  return (
    <>
      <JsonLd
        data={buildProductFamilyPageSchema({
          name: "FRP Solar Mounting Systems — Panel Frames, Rails and Supports",
          description: pageDescription,
          path: pagePath,
          image: "/images/case-studies/frp-chongqing-rooftop-solar-mounting-colored-steel-tile.webp",
          category: "Photovoltaic mounting systems and module frame profiles",
          productLine: "F1-FORM / F1-STRUX",
          material: ["Pultruded GFRP", "Polyurethane composite", "UV-stabilized polyester", "Vinyl ester composite"],
          additionalProperty: [
            { name: "Product families", value: "Module frame profiles; structural PV supports; rooftop mounting rails" },
            { name: "Catalog section range", value: "30×30×3 mm to 100×50×4 mm" },
            { name: "Temperature range", value: "−40°C to +80°C" },
            { name: "Applications", value: "Rooftop, ground-mount, floating, coastal, fishery-PV and agrivoltaics" },
          ],
        })}
      />
      <PageHeader
        tag="Solar Profile Catalog"
        title="FRP solar profiles — module frames, rails and supports"
        description="Choose module-frame sections, support profiles and rooftop rails from the catalog below. F1 supplies specified pultruded components; connection hardware, fabrication and any assembly scope are confirmed on the quotation."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/pultruded-frp-profiles" },
          { label: "Solar Frames & Mounting" },
        ]}
      />

      <div className="mx-auto max-w-[1280px] px-[24px] py-[24px] text-f15 text-t2">This page covers component selection and supply. For wind, span and connection considerations, <Link href="/applications/frp-solar-mounting-profiles" className="font-bold text-teal-text">read the PV support design guide →</Link></div>
      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="grid items-center gap-[34px] lg:grid-cols-[1.05fr_.95fr]">
            <div>
              <SectionTag>Three component roles</SectionTag>
              <h2 className="mt-[8px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
                Profile supply from module edge to support structure
              </h2>
              <div className="mt-[21px] grid gap-[13px]">
                {[
                  ["01", "Solar module frame profiles", "Custom perimeter, corner-key and clamp-interface profiles for framed PV modules. Geometry is developed around the laminate, glass stack, sealant channel, drainage and module load test."],
                  ["02", "Composite PV support profiles", "Square, C and H sections for fixed ground arrays, agrivoltaics, fishery-PV, floating arrays and coastal structures. Standard connectors remain mechanically fastened and field-serviceable."],
                  ["03", "Rooftop rails and hardware", "Low-line-mass roof rails for BAPV, BIPV and distributed generation, with matched mid clamps, end clamps, splice plates, sliding nuts and roof interfaces."],
                ].map(([number, title, body]) => (
                  <div key={number} className="rounded-[8px] border border-border-default bg-bg2 p-[18px]">
                    <div className="flex gap-[13px]">
                      <span className="text-f13 font-extrabold text-teal-text">{number}</span>
                      <div>
                        <h3 className="text-f15 font-bold text-t1">{title}</h3>
                        <p className="mt-[5px] text-f13 leading-golden text-t2">{body}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="overflow-hidden rounded-[10px] border border-border-default bg-bg2">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/case-studies/frp-chongqing-rooftop-solar-mounting-colored-steel-tile.webp"
                  alt="Pultruded FRP rooftop rails supporting photovoltaic modules on an industrial roof"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 45vw, 100vw"
                />
              </div>
              <p className="p-[13px] text-f13 leading-golden text-t3">
                Rooftop retrofit system: pultruded H-rail with module clamps and roof-sheet interface.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bg2 py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Catalog sections</SectionTag>
          <h2 className="mt-[8px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Standard FRP solar support and rail profiles
          </h2>
          <p className="mt-[13px] max-w-[900px] text-f15 leading-golden text-t2">
            These starting sections cover light rooftop rails through primary ground-mount support. Final section selection is governed by span, module layout, wind uplift, snow, seismic load, connection capacity and the project deflection limit.
          </p>
          <div className="mt-[26px] overflow-x-auto rounded-[8px] border border-border-default bg-white">
            <table className="w-full min-w-[780px] border-collapse text-left text-f13">
              <thead className="bg-navy text-white">
                <tr>
                  {["Model", "Overall size", "Wall", "Section area", "Typical role"].map((heading) => (
                    <th key={heading} className="px-[16px] py-[13px] font-bold">{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {profiles.map((profile) => (
                  <tr key={profile.model} className="border-t border-border-default">
                    <td className="px-[16px] py-[12px] font-semibold text-t1">{profile.model}</td>
                    <td className="px-[16px] py-[12px] text-t2">{profile.size}</td>
                    <td className="px-[16px] py-[12px] text-t2">{profile.wall}</td>
                    <td className="px-[16px] py-[12px] text-t2">{profile.area}</td>
                    <td className="px-[16px] py-[12px] text-t2">{profile.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-[13px] text-f13 leading-golden text-t3">
            Model geometry and availability are confirmed at quotation. Custom solar-module frame and roof-interface profiles are produced from customer drawings or developed as a paid first-article program.
          </p>
        </div>
      </section>

      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Material options</SectionTag>
          <h2 className="mt-[8px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            PU for thin-wall performance; polyester or vinyl ester for exposure-led design
          </h2>
          <div className="mt-[26px] grid gap-[21px] lg:grid-cols-2">
            <div className="rounded-[8px] border border-border-default p-[21px]">
              <h3 className="text-f19 font-extrabold text-t1">Polyurethane (PU) pultrusion</h3>
              <dl className="mt-[16px] grid grid-cols-2 gap-x-[16px] gap-y-[10px] text-f13">
                <dt className="text-t3">Density</dt><dd className="font-semibold text-t1">2.0–2.2 g/cm³</dd>
                <dt className="text-t3">Axial tensile strength</dt><dd className="font-semibold text-t1">1,000–1,200 MPa</dd>
                <dt className="text-t3">Axial tensile modulus</dt><dd className="font-semibold text-t1">40–60 GPa</dd>
                <dt className="text-t3">Thermal conductivity</dt><dd className="font-semibold text-t1">0.1–0.3 W/m·K</dd>
              </dl>
            </div>
            <div className="rounded-[8px] border border-border-default p-[21px]">
              <h3 className="text-f19 font-extrabold text-t1">Unsaturated polyester (UP)</h3>
              <dl className="mt-[16px] grid grid-cols-2 gap-x-[16px] gap-y-[10px] text-f13">
                <dt className="text-t3">Density</dt><dd className="font-semibold text-t1">2.0–2.2 g/cm³</dd>
                <dt className="text-t3">Axial tensile strength</dt><dd className="font-semibold text-t1">580–750 MPa</dd>
                <dt className="text-t3">Axial tensile modulus</dt><dd className="font-semibold text-t1">30–40 GPa</dd>
                <dt className="text-t3">Thermal conductivity</dt><dd className="font-semibold text-t1">0.2–0.4 W/m·K</dd>
              </dl>
            </div>
          </div>
          <p className="mt-[13px] text-f13 leading-golden text-t3">
            Values are characteristic laminate ranges from the solar-profile program, not design allowables. Project calculations use batch-qualified properties with environmental, duration, temperature, buckling and safety factors applied.
          </p>
        </div>
      </section>

      <section id="material-test-reports" className="bg-bg2 py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Laboratory evidence</SectionTag>
          <h2 className="mt-[8px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            FRP photovoltaic module frame material test reports
          </h2>
          <p className="mt-[13px] max-w-[960px] text-f15 leading-golden text-t2">
            Review the tested material, coating and specimen dimensions before applying a result to your module design.
            These reports concern the identified samples; they do not certify every F1 Composite profile or a complete PV module.
            Chinese reports include English notes beside each original page. Untouched originals are also available for signature verification.
          </p>
          <div className="mt-[26px] grid gap-[21px] lg:grid-cols-2">
            {[
              {
                title: "PV frame mechanical, electrical and ageing properties",
                report: "Wuxi / CPVT · 2025DACS20319 · issued 15 June 2026",
                detail: "Chongqing Xianju composite PV frame, identified as all-weather modified resin. Initial mean tensile strength: 1,310 MPa; flexural strength: 1,060 MPa; flexural modulus: 48.0 GPa; volume resistivity: 1.0 × 10¹³ Ω·m. Reported HDT: >290°C; flammability: V-1.",
                scope: "Includes UV, combined UV/damp-heat, UV/humidity-freeze, UV/thermal-cycle, salt-mist and ammonia exposure results. The report gives measurements without an overall pass/fail conclusion. Its salt-mist cycle count and total duration are inconsistent; consult the issuer for clarification.",
                file: "frp-pv-module-frame-material-performance-test-report-2025dacs20319-en.pdf",
                original: "frp-pv-module-frame-material-performance-test-report-2025dacs20319-original-zh.pdf",
                label: "PV frame performance report with English notes",
              },
              {
                title: "Jotun Jota Solar CL coating variant",
                report: "TÜV Rheinland · CN24KZ3A 002 · issued 14 March 2025",
                detail: "Chongqing Fengdu GFF-series polymer composite PV frames with Jota Solar CL water-based polyurethane coating. Initial mean tensile strength: 1,410.22 MPa; flexural strength: 1,570.95 MPa. Tested against 2 PfG 2923/11.22 with a reported Pass result.",
                scope: "Coating-change report covering clauses 5.2, 5.4, 5.5, 5.6, 5.9, 5.13, 5.16, 5.20, 5.21 and 5.22. Other tests refer to CN24KZ3A 001. Includes 2,000 h weathering, TC200, 1,000 h damp heat and TC50 plus humidity-freeze results.",
                file: "frp-pv-module-frame-jotun-coating-tuv-test-report-cn24kz3a-002.pdf",
                label: "Jotun coating test report in English",
              },
              {
                title: "B9986S polyester coating variant",
                report: "TÜV Rheinland · CN24KZ3A 003 · issued 10 October 2025",
                detail: "Chongqing Fengdu GFF-series polymer composite PV frames with B9986S polyester coating. Initial mean tensile strength: 1,353.25 MPa; flexural strength: 1,755.71 MPa. Tested against 2 PfG 2923/11.22 with a reported Pass result.",
                scope: "Covers the same coating-change clauses as report 002 and refers to CN24KZ3A 001 for other tests. Tensile strength retention is reported as 92.08% after TC200, 87.54% after damp heat and 97.17% after weathering.",
                file: "frp-pv-module-frame-b9986s-coating-tuv-test-report-cn24kz3a-003.pdf",
                label: "B9986S coating test report in English",
              },
              {
                title: "E-TS-AB composite material flammability",
                report: "SGS · GZMR260702529004 · issued 30 July 2026",
                detail: "Chongqing Xianju glass-fibre-reinforced composite profile E-TS-AB, tested as longitudinal A1 sheet specimens at 10.1 mm thickness. UL 94-2023 Rev.2-2024, Section 8: V-0, Pass.",
                scope: "This result applies to the specified material and tested thickness. It does not establish V-0 for thin-wall PV frames or replace the V-1 result in the separate Wuxi frame report. SGS states that this report is for internal reference.",
                file: "frp-composite-profile-sgs-ul94-v0-test-report-gzmr260702529004-en.pdf",
                original: "frp-composite-profile-sgs-ul94-v0-test-report-gzmr260702529004-original-zh.pdf",
                label: "SGS material flammability report with English notes",
              },
            ].map((item) => (
              <article key={item.file} className="rounded-[8px] border border-border-default bg-white p-[21px]">
                <h3 className="text-f19 font-extrabold text-t1">{item.title}</h3>
                <p className="mt-[8px] text-f13 font-semibold text-teal-text">{item.report}</p>
                <p className="mt-[13px] text-f13 leading-golden text-t2">{item.detail}</p>
                <p className="mt-[13px] text-f13 leading-golden text-t3">{item.scope}</p>
                <a href={`/downloads/${item.file}`} className="mt-[16px] inline-block text-f13 font-bold text-teal-text underline underline-offset-4">
                  {item.label} (PDF)
                </a>
                {item.original && (
                  <p className="mt-[8px]">
                    <a href={`/downloads/${item.original}`} className="text-f13 text-teal-text underline underline-offset-4">Untouched Chinese original (PDF)</a>
                  </p>
                )}
              </article>
            ))}
          </div>
          <p className="mt-[16px] text-f13 leading-golden text-t3">
            English notes are supplied by F1 Composite and are not laboratory-certified translations.
            The complete reports retain their original conditions of use. TÜV Rheinland reports require prior written approval for advertising reproduction and do not authorize use of a test mark.
            Reported sample strengths are not structural design allowables; confirm the material, coating and production specification for your order.
          </p>
        </div>
      </section>

      <section className="bg-navy py-[55px] text-white">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Project fit</SectionTag>
          <h2 className="mt-[8px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15]">
            Where composite PV profiles change the project equation
          </h2>
          <div className="mt-[26px] grid gap-[16px] md:grid-cols-2 lg:grid-cols-4">
            {[
              ["Rooftop retrofit", "Lower rail dead load helps preserve the structural reserve of existing industrial roofs."],
              ["Coastal & offshore", "No zinc loss, anodic pitting or galvanic couple along the main composite members."],
              ["Floating & fishery-PV", "Low weight and resistance to humidity, salt spray and water-side corrosion."],
              ["Ground & agrivoltaic", "Mechanically fastened posts, purlins and braces for corrosive soil and fertilizer exposure."],
            ].map(([title, body]) => (
              <div key={title} className="rounded-[8px] border border-white/20 bg-white/5 p-[18px]">
                <h3 className="text-f15 font-bold">{title}</h3>
                <p className="mt-[8px] text-f13 leading-golden text-white/75">{body}</p>
              </div>
            ))}
          </div>
          <div className="mt-[26px] flex flex-wrap gap-[12px]">
            <Link href="/marketing/brochure/f1composite-solar-mounting-module-frames-2026-06.pdf" className="rounded-[6px] bg-teal px-[18px] py-[11px] text-f13 font-bold text-white hover:opacity-90">
              Module frames brochure (PDF)
            </Link>
            <Link href="/marketing/brochure/f1composite-solar-mounting-manual-2026-06.pdf" className="rounded-[6px] border border-white/35 px-[18px] py-[11px] text-f13 font-bold text-white hover:bg-white/10">
              Mounting manual (PDF)
            </Link>
            <Link href="/marketing/brochure/f1composite-solar-mounting-rooftop-retrofit-2026-06.pdf" className="rounded-[6px] border border-white/35 px-[18px] py-[11px] text-f13 font-bold text-white hover:bg-white/10">
              Rooftop retrofit guide (PDF)
            </Link>
          </div>
        </div>
      </section>

      <RelatedLinks
        groups={[
          {
            title: "Engineering & applications",
            links: [
              { href: "/applications/frp-solar-mounting-profiles", label: "FRP solar mounting application guide" },
              { href: "/industries/energy", label: "FRP for energy and power" },
              { href: "/frp-profile-calculator", label: "FRP profile calculator" },
            ],
          },
          {
            title: "Proof & project detail",
            links: [
              { href: "/case-studies/solar-farm-mounting", label: "Chongqing rooftop PV retrofit" },
              { href: "/regions/pultruded-frp-solar-mounting-australia", label: "Solar mounting for Australia" },
              { href: "/products/custom-pultruded-profiles", label: "Custom pultruded profiles" },
            ],
          },
        ]}
      />

      <section className="bg-bg2 py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <FAQ items={faqItems} />
        </div>
      </section>

      <AskAICard prefill="I need FRP photovoltaic profiles for [module frame / rooftop rail / ground-mount / floating PV]. Module size and layout: [...]. Site: [...]. Wind/snow/seismic loads: [...]. Roof or foundation interface: [...]. Recommend a profile family, resin system, hardware concept, and RFQ inputs." />
      <ProductNextSteps path="/products/frp-solar-mounting-systems" />
      <InnerCTA title="Send the module, array and load drawings — get a solar-profile proposal." />
    </>
  );
}
