import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import DocumentCard from "@/components/downloads/DocumentCard";
import ProductRfq from "@/components/products/ProductRfq";
import RelatedLinks from "@/components/sections/RelatedLinks";
import JsonLd from "@/components/seo/JsonLd";
import { FAQList } from "@/components/ui/FAQ";
import Figure from "@/components/ui/Figure";
import { pvFrameReports } from "@/content/data/pvFrameEvidence";
import { formatLongDate } from "@/lib/dates";
import { buildRfqHref } from "@/lib/rfq";
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

const quoteHref = buildRfqHref({
  source: "frp-solar-mounting-systems",
  product: "FRP solar profiles",
  productPath: pagePath,
  message: "Please review FRP profiles for my PV project. I will send the module size and layout, site loads and the roof or foundation interface.",
});

const roles = [
  ["Solar module frame profiles", "Custom perimeter, corner-key and clamp-interface profiles for framed PV modules. Geometry is developed around the laminate, glass stack, sealant channel, drainage and module load test."],
  ["Composite PV support profiles", "Square, C and H sections for fixed ground arrays, agrivoltaics, fishery-PV, floating arrays and coastal structures. Standard connectors remain mechanically fastened and field-serviceable."],
  ["Rooftop rails and hardware", "Low-line-mass roof rails for BAPV, BIPV and distributed generation, with matched mid clamps, end clamps, splice plates, sliding nuts and roof interfaces."],
] as const;

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

// Characteristic laminate ranges from the solar-profile program, PU against UP.
const materials = [
  ["Density", "2.0–2.2 g/cm³", "2.0–2.2 g/cm³"],
  ["Axial tensile strength", "1,000–1,200 MPa", "580–750 MPa"],
  ["Axial tensile modulus", "40–60 GPa", "30–40 GPa"],
  ["Thermal conductivity", "0.1–0.3 W/m·K", "0.2–0.4 W/m·K"],
] as const;

const projectFit = [
  ["Rooftop retrofit", "Lower rail dead load helps preserve the structural reserve of existing industrial roofs."],
  ["Coastal and offshore", "No zinc loss, anodic pitting or galvanic couple along the main composite members."],
  ["Floating and fishery-PV", "Low weight and resistance to humidity, salt spray and water-side corrosion."],
  ["Ground and agrivoltaic", "Mechanically fastened posts, purlins and braces for corrosive soil and fertilizer exposure."],
] as const;

const brochures = [
  { title: "Module frames brochure", file: "/marketing/brochure/f1composite-solar-mounting-module-frames-2026-06.pdf", size: "66 KB" },
  { title: "Mounting manual", file: "/marketing/brochure/f1composite-solar-mounting-manual-2026-06.pdf", size: "162 KB" },
  { title: "Rooftop retrofit guide", file: "/marketing/brochure/f1composite-solar-mounting-rooftop-retrofit-2026-06.pdf", size: "55 KB" },
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

const requestItems = [
  { title: "Module and array", text: "Module size and weight, layout, tilt and row spacing, or the frame drawing for a module-frame profile." },
  { title: "Site and loads", text: "Location and exposure (coastal, floating, fertilizer), wind, snow and seismic loads, and the design life." },
  { title: "Roof or foundation", text: "Roof sheet type and survey, or the ground, pile or float interface the supports connect to." },
  { title: "Quantities and delivery", text: "Meters per section or the number of kits, hardware scope, destination and target date." },
];

const card = "rounded-card border border-border-default bg-white p-[20px] sm:p-[24px]";

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
        tag="Solar profiles"
        line={{ name: "Solar PV", label: "Profile catalog", mark: false }}
        title="FRP solar profiles — module frames, rails and supports"
        description="Choose module-frame sections, support profiles and rooftop rails from the catalog below. F1 supplies specified pultruded components; connection hardware, fabrication and any assembly scope are confirmed on the quotation."
        facts={[
          { label: "Catalog sections", value: String(profiles.length) },
          { label: "Walls", value: "3–5 mm" },
          { label: "Service temperature", value: "−40 to +80 °C" },
          { label: "Test reports", value: `${pvFrameReports.length} published` },
        ]}
        actions={{
          primary: { label: "Request a quote", href: quoteHref },
          secondary: { label: "See the catalog", href: "#catalog", variant: "secondary" },
          stickyMobile: true,
        }}
        figure={
          <Figure
            number={1}
            title="Rooftop retrofit, Chongqing"
            note="Project photo"
            caption={
              <>
                Pultruded H-rail with module clamps and a roof-sheet interface.{" "}
                <Link href="/case-studies/chongqing-rooftop-pv-frp-rail" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">
                  Read the project
                </Link>
              </>
            }
            bleed
          >
            <div className="relative aspect-[4/3]">
              <Image
                src="/images/case-studies/frp-chongqing-rooftop-solar-mounting-colored-steel-tile.webp"
                alt="Pultruded FRP rooftop rails supporting photovoltaic modules on an industrial roof"
                fill
                sizes="(max-width: 1023px) 94vw, 44vw"
                className="object-cover"
                preload
              />
            </div>
          </Figure>
        }
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/pultruded-frp-profiles" },
          { label: "Solar Frames & Mounting" },
        ]}
      />
      <PageNav
        items={[
          { id: "roles", label: "Components" },
          { id: "catalog", label: "Catalog" },
          { id: "materials", label: "Materials" },
          { id: "material-test-reports", label: "Test reports" },
          { id: "project-fit", label: "Project fit" },
          { id: "faq", label: "FAQ" },
          { id: "quote", label: "Quote" },
        ]}
      />

      <PageSection
        id="roles"
        title="Profile supply from module edge to support structure"
        intro={
          <>
            This page covers component selection and supply. Wind, span and connection design are in the{" "}
            <Link href="/applications/frp-solar-mounting-profiles" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">
              PV support design guide
            </Link>
            .
          </>
        }
      >
        <ol className="grid grid-cols-1 gap-[12px] md:grid-cols-3">
          {roles.map(([title, body], index) => (
            <li key={title} className={card}>
              <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Component {index + 1}</p>
              <h3 className="mt-[6px] text-f18 font-bold text-t1">{title}</h3>
              <p className="mt-[8px] text-f14 leading-golden text-t2">{body}</p>
            </li>
          ))}
        </ol>
      </PageSection>

      <PageSection
        id="catalog"
        title="Standard FRP solar support and rail profiles"
        count={`${profiles.length} sections`}
        tone="muted"
        intro="These starting sections cover light rooftop rails through primary ground-mount support. Final section selection is governed by span, module layout, wind uplift, snow, seismic load, connection capacity and the project deflection limit."
      >
        <div className="relative overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[720px] border-collapse text-left text-f14 tabular-nums">
            <caption className="sr-only">Standard FRP solar support and rail profiles</caption>
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                {["Model", "Overall size", "Wall", "Section area", "Typical role"].map((heading) => (
                  <th key={heading} scope="col" className="px-[14px] py-[8px] font-semibold text-t1">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {profiles.map((profile) => (
                <tr key={profile.model} className="border-b border-border-default last:border-b-0">
                  <th scope="row" className="whitespace-nowrap px-[14px] py-[10px] font-semibold text-t1">{profile.model}</th>
                  <td className="whitespace-nowrap px-[14px] py-[10px] text-t2">{profile.size}</td>
                  <td className="whitespace-nowrap px-[14px] py-[10px] text-t2">{profile.wall}</td>
                  <td className="whitespace-nowrap px-[14px] py-[10px] text-t2">{profile.area}</td>
                  <td className="px-[14px] py-[10px] text-t2">{profile.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-[16px] max-w-[900px] text-f14 leading-golden text-t2">
          Model geometry and availability are confirmed at quotation. Custom solar-module frame and roof-interface profiles are produced from customer drawings or developed as a paid first-article program; see{" "}
          <Link href="/products/custom-pultruded-profiles" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">custom pultruded profiles</Link>.
        </p>
      </PageSection>

      <PageSection id="materials" title="PU for thin-wall performance; polyester or vinyl ester for exposure-led design">
        <div className="grid grid-cols-1 items-start gap-[24px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-[48px]">
          <div className="space-y-[12px] text-f16 leading-golden text-t2">
            <p>Polyurethane pultrusion gives the higher strength and stiffness that thin-wall, stiffness-sensitive rails and frames need. Unsaturated polyester is the cost-effective baseline for normal outdoor service.</p>
            <p>For offshore, floating, high-salinity and fertilizer exposure, vinyl ester is specified; the laminate, veil and coating package follows the site&apos;s exposure class and design life.</p>
          </div>
          <div>
            <div className="relative overflow-x-auto rounded-card border border-border-default bg-white">
              <table className="spec-table w-full border-collapse text-left text-f14">
                <caption className="sr-only">Characteristic laminate ranges, polyurethane against unsaturated polyester</caption>
                <thead>
                  <tr className="border-b border-border-default bg-bg2">
                    <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Property</th>
                    <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Polyurethane (PU)</th>
                    <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Polyester (UP)</th>
                  </tr>
                </thead>
                <tbody>
                  {materials.map(([property, pu, up]) => (
                    <tr key={property} className="border-b border-border-default last:border-b-0">
                      <th scope="row" className="px-[14px] py-[10px] font-semibold text-t1">{property}</th>
                      <td className="px-[14px] py-[10px] text-t1">{pu}</td>
                      <td className="px-[14px] py-[10px] text-t2">{up}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-[12px] text-f14 leading-golden text-t3">
              Values are characteristic laminate ranges from the solar-profile program, not design allowables. Project calculations use batch-qualified properties with environmental, duration, temperature, buckling and safety factors applied.
            </p>
          </div>
        </div>
      </PageSection>

      <PageSection
        id="material-test-reports"
        title="FRP photovoltaic module frame material test reports"
        count={`${pvFrameReports.length} reports`}
        tone="muted"
        intro="Review the tested material, coating and specimen dimensions before applying a result to your module design. These reports concern the identified samples; they do not certify every F1 Composite profile or a complete PV module. Chinese reports include English notes beside each original page. Untouched originals are also available for signature verification."
      >
        <ul className="grid grid-cols-1 gap-[16px] lg:grid-cols-2">
          {pvFrameReports.map((item) => (
            <li key={item.file}>
              <article className="flex h-full flex-col rounded-card border border-border-default bg-white p-[20px] sm:p-[24px]">
                <div className="flex items-center justify-between gap-[8px]">
                  <span className="rounded-tag bg-deep px-[8px] py-[3px] font-mono text-f12 uppercase tracking-[0.06em] text-white">Test report</span>
                  <span className="text-f12 text-t3">PDF</span>
                </div>
                <h3 className="mt-[12px] text-f18 font-bold text-t1">{item.title}</h3>
                <dl className="mt-[10px] grid grid-cols-[auto_minmax(0,1fr)] gap-x-[12px] gap-y-[3px] text-f14">
                  <dt className="font-mono text-f12 leading-[1.6] text-t3">Issued by</dt>
                  <dd className="text-t1">{item.issuer}</dd>
                  <dt className="font-mono text-f12 leading-[1.6] text-t3">Reference</dt>
                  <dd className="text-t1">{item.reference}</dd>
                  <dt className="font-mono text-f12 leading-[1.6] text-t3">Issued</dt>
                  <dd className="text-t1"><time dateTime={item.issued}>{formatLongDate(item.issued)}</time></dd>
                </dl>
                <p className="mt-[12px] text-f14 leading-golden text-t2">{item.detail}</p>
                <p className="mt-[8px] text-f14 leading-golden text-t3">{item.scope}</p>
                <div className="mt-auto flex flex-wrap gap-x-[20px] gap-y-[6px] pt-[14px] text-f14 font-semibold">
                  <a href={`/downloads/${item.file}`} target="_blank" rel="noopener" className="text-teal-text hover:underline">
                    {item.label} (PDF) <span aria-hidden>→</span>
                  </a>
                  {item.original ? (
                    <a href={`/downloads/${item.original}`} target="_blank" rel="noopener" className="text-teal-text hover:underline">
                      Untouched Chinese original (PDF) <span aria-hidden>→</span>
                    </a>
                  ) : null}
                </div>
              </article>
            </li>
          ))}
        </ul>
        <p className="mt-[16px] max-w-[960px] text-f14 leading-golden text-t3">
          English notes are supplied by F1 Composite and are not laboratory-certified translations. The complete reports retain their original conditions of use. TÜV Rheinland reports require prior written approval for advertising reproduction and do not authorize use of a test mark. Reported sample strengths are not structural design allowables; confirm the material, coating and production specification for your order.
        </p>
      </PageSection>

      <PageSection id="project-fit" title="Where composite PV profiles change the project equation">
        <div className="grid grid-cols-1 gap-x-[32px] gap-y-[20px] md:grid-cols-2 lg:grid-cols-4">
          {projectFit.map(([title, body]) => (
            <div key={title} className="border-t border-border-default pt-[14px]">
              <h3 className="text-f16 font-bold text-t1">{title}</h3>
              <p className="mt-[6px] text-f14 leading-golden text-t2">{body}</p>
            </div>
          ))}
        </div>
        <h3 className="mt-[40px] text-f20 font-bold text-t1">Brochures and manuals</h3>
        <ul className="mt-[16px] grid grid-cols-1 gap-[12px] md:grid-cols-3">
          {brochures.map((item) => (
            <li key={item.file}>
              <DocumentCard
                card={{ type: "Brochure", title: item.title, meta: `PDF · ${item.size}`, issuer: "F1 Composite", action: { label: "Download PDF", href: item.file, file: true } }}
                compact
              />
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection id="faq" title="FRP solar profile questions" tone="muted">
        <FAQList items={faqItems} />
      </PageSection>

      <RelatedLinks
        background="white"
        groups={[
          {
            title: "Engineering and applications",
            links: [
              { href: "/applications/frp-solar-mounting-profiles", label: "FRP solar mounting application guide" },
              { href: "/industries/energy", label: "FRP for energy and power" },
              { href: "/frp-profile-calculator", label: "FRP profile calculator" },
            ],
          },
          {
            title: "Proof and project detail",
            links: [
              { href: "/case-studies/chongqing-rooftop-pv-frp-rail", label: "Chongqing rooftop PV retrofit" },
              { href: "/regions/pultruded-frp-solar-mounting-australia", label: "Solar mounting for Australia" },
              { href: "/products/custom-pultruded-profiles", label: "Custom pultruded profiles" },
            ],
          },
        ]}
      />

      <PageSection id="quote" title="Send the module, array and load drawings" tone="deep">
        <ProductRfq
          product="FRP solar profiles"
          productPath={pagePath}
          quoteHref={quoteHref}
          items={requestItems}
          intro="Start with the module and array layout. We propose the profile family, resin system and hardware concept, then quote the sections or a project kit."
          advisorPrompt="I need FRP photovoltaic profiles for [module frame / rooftop rail / ground-mount / floating PV]. Module size and layout: [...]. Site: [...]. Wind/snow/seismic loads: [...]. Roof or foundation interface: [...]. Recommend a profile family, resin system, hardware concept, and RFQ inputs."
        />
      </PageSection>
    </>
  );
}
