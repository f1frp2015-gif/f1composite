import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import SectionTag from "@/components/ui/SectionTag";
import LinkArrow from "@/components/ui/LinkArrow";
import FAQ from "@/components/ui/FAQ";
import JsonLd from "@/components/seo/JsonLd";
import CalculatorCTA from "@/components/calculators/CalculatorCTA";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

const pageTitle = "GRP Windows UK — Pultruded Fibreglass Frames Supplier";
const pageDescription =
  "Pultruded GRP (fibreglass) windows for UK projects — PHI Cert 2491wi03 (U_w 0.78), Part L-ready, Passivhaus pipeline. UK duty + 20% VAT quoted inline DDP.";
const pagePath = "/regions/grp-windows-uk";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
});

const faqs = [
  {
    question: "What are GRP windows, and are they the same as fiberglass or FRP windows?",
    answer:
      "Yes — GRP (glass reinforced plastic / glass reinforced polymer) is the standard British term for what North America calls fiberglass or FRP. A GRP window frame is a pultruded profile of continuous glass fibre in a thermoset resin matrix: thermal conductivity ≈ 0.3 W/m·K (aluminium is 160), an expansion coefficient close to glass, no steel reinforcement required, and no corrosion or repainting cycle. F1 Composite supplies the complete GRP window profile set — frame, sash, mullion, transom, glazing bead — in 65/70/80/90/140 mm frame depths, and supplies either the profiles or complete factory-glazed, leak-tested window units.",
  },
  {
    question: "Do GRP windows meet Approved Document Part L and the Future Homes Standard?",
    answer:
      "With margin. Part L in England sets a maximum U-value of 1.4 W/m²·K for replacement windows and points new dwellings toward 1.2, and the Future Homes Standard is tightening the envelope further. F1's 70-series GRP frames deliver whole-window U_w of 1.1–1.3 with standard triple glazing, and the 90-series is PHI-certified at U_w 0.78 W/m²·K (Component Certificate 2491wi03) — below the Passivhaus 0.80 criterion, which no Part L tier approaches. Because the entire frame is intrinsically insulating, these values need no thermal-break inserts and no steel stiffeners that bridge heat.",
  },
  {
    question: "Are GRP windows suitable for UK Passivhaus and EnerPHit projects?",
    answer:
      "Yes — this is the segment where GRP frames are strongest. The UK Passivhaus pipeline is growing, led by the social-housing and education sectors, and Scotland has moved to legislate a Passivhaus-equivalent standard for new homes. F1's 90-series GFRP-PU frame carries PHI Component Certificate 2491wi03 at U_w 0.78 W/m²·K, and the same system is installed at Qinling Station in Antarctica against a −60°C design low — the certification and the field evidence both sit below the 0.80 W/m²·K component criterion UK Passivhaus designers specify to.",
  },
  {
    question: "What about CE marking, UKCA, and import duties for GRP windows into the UK?",
    answer:
      "Windows are construction products: EN 14351-1 type testing (air permeability, watertightness, wind resistance) backs the Declaration of Performance, and CE marking remains recognised for construction products in Great Britain while the UKCA regime evolves — we support the documentation per project. On the cost side, GRP is a glass-fibre composite classified under HS 3925.20 / 7019, so it sits outside the metal-focused trade-remedy landscape that affects aluminium extrusions, and outside the scope of the UK CBAM announced for 2027, which covers iron, steel, and aluminium. Standard UK customs duty and 20% import VAT apply and are itemized inline in our DDP quote.",
  },
  {
    question: "What are lead times and shipping options to UK sites?",
    answer:
      "Standard schedule from PO: 4–6 weeks production plus 30–38 days sea freight to Felixstowe, Southampton, or London Gateway. Total PO-to-site is typically 10–14 weeks DDP, with inland delivery to London, the Midlands, the North, and Scotland from the port of entry. Urgent samples ship air freight to any major UK hub in 4–6 days at premium cost.",
  },
  {
    question: "Does F1 supply GRP profiles to UK window fabricators, or only finished windows?",
    answer:
      "Both models. For Passivhaus and performance-led projects that want factory-guaranteed airtightness, we ship complete GRP window units — assembled, glazed, gasketed, and leak-tested, including tilt-and-turn configurations. For UK fabricators, we supply the pultruded profile set with co-extruded EPDM gasketing, corner kits, and fabrication drawings for local assembly. Finishes are architectural AAMA 2604/2605 powder coating in any RAL colour — including the anthracite and dark tones UK architects specify, which GRP holds without the warping risk dark uPVC carries on south-facing elevations.",
  },
];

export default function UkRegionPage() {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageTitle,
    description: pageDescription,
    url: absoluteUrl(pagePath),
    about: {
      "@type": "Thing",
      name: "Pultruded GRP (glass reinforced plastic) window frames for UK Part L, Passivhaus, and EnerPHit projects",
    },
    provider: { "@id": "https://www.f1composite.com/#organization" },
  };

  return (
    <>
      <JsonLd data={webPageSchema} />

      <PageHeader
        tag="United Kingdom"
        title="GRP windows for UK projects"
        description="Pultruded GRP (fibreglass) window frames and complete window units for UK Part L, Passivhaus, and EnerPHit work — PHI Component Certificate 2491wi03 (U_w 0.78 W/m²·K), no metallic thermal bridge, no steel stiffeners, quoted DDP with UK duty and VAT itemized."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Regions", href: "/regions/grp-windows-uk" },
          { label: "UK — GRP Windows" },
        ]}
      />

      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="overflow-hidden rounded-[8px]">
            <Image
              src="/images/regions/grp-windows-uk.jpg"
              alt="Modern facade with dark anthracite window frames in a repeating grid — the dark-colour aesthetic GRP frames hold without the warping risk of dark uPVC"
              width={1920}
              height={1280}
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Why UK Specifiers Source from F1</SectionTag>
          <h2 className="mt-[21px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-t1">
            The frame material Part L is quietly pointing at
          </h2>
          <div className="mt-[34px] grid gap-[34px] lg:grid-cols-2">
            <div className="space-y-[21px] text-f15 leading-golden text-t2">
              <p>
                UK window specification is being squeezed from two directions. Part L
                caps replacement windows at U-value 1.4 W/m²·K and points new
                dwellings toward 1.2, with the Future Homes Standard tightening the
                envelope further — while the UK Passivhaus pipeline, strongest in
                social housing and education, specifies to the PHI component
                criterion of 0.80. Aluminium reaches those numbers only with
                elaborate thermal-break assemblies; uPVC gets there with steel
                stiffeners that bridge heat and cap sash sizes — and its dark-colour
                options carry warping risk on south-facing elevations.
              </p>
              <p>
                GRP — glass reinforced plastic, the British term for pultruded
                fibreglass — solves the problem in the material. The whole frame
                conducts heat at ≈ 0.3 W/m·K against aluminium&rsquo;s 160, needs no
                steel reinforcement at any practical sash size, and holds anthracite
                and other dark RAL colours without thermal distortion. F1&rsquo;s
                90-series is PHI-certified at U<sub>w</sub> 0.78 W/m²·K
                (<strong>Component Certificate 2491wi03</strong>), with the same
                system installed at Qinling Station, Antarctica.
              </p>
            </div>
            <div className="space-y-[21px] text-f15 leading-golden text-t2">
              <p>
                The import arithmetic also reads differently for GRP. It is a
                glass-fibre composite (HS 3925.20 / 7019), outside the metal-focused
                trade-remedy landscape around aluminium extrusions and outside the
                scope of the UK CBAM announced for 2027, which covers iron, steel,
                and aluminium. What applies — standard UK customs duty and 20%
                import VAT — is itemized inline in our DDP quote, so the QS sees the
                full landed cost before ordering.
              </p>
              <p>
                UK projects choose the supply model: complete factory-glazed,
                leak-tested GRP window units for Passivhaus and EnerPHit work where
                airtightness must be guaranteed before shipment, or the pultruded
                profile set — frame, sash, mullion, transom, glazing bead with
                co-extruded EPDM gasketing — supplied to UK fabricators for local
                assembly. EN 14351-1 type testing backs the Declaration of
                Performance, with CE recognised for construction products in Great
                Britain and UKCA documentation supported as the regime evolves.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>UK Standards Stack</SectionTag>
          <h2 className="mt-[21px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-t1">
            Part L, Passivhaus, EN 14351-1 — the paperwork your spec calls for
          </h2>
          <div className="mt-[34px] overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-border-default">
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">Requirement</th>
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">UK Standard / Threshold</th>
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">F1 Performance</th>
                  <th className="py-[13px] text-f13 font-bold uppercase tracking-wide text-t1">Documentation</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { app: "Replacement windows", std: "Part L — max U_w 1.4 W/m²·K", perf: "70-series: U_w 1.1–1.3 (triple glazed)", doc: "U-value calculation pack" },
                  { app: "New dwellings", std: "Part L notional — U_w 1.2", perf: "70/80-series clear with margin", doc: "EN ISO 10077 calculation" },
                  { app: "Passivhaus / EnerPHit", std: "PHI component — U_w ≤ 0.80", perf: "90-series: 0.78, Cert 2491wi03", doc: "PHI certificate" },
                  { app: "Type testing / DoP", std: "EN 14351-1 (air / water / wind)", perf: "Per-project type testing", doc: "Declaration of Performance" },
                  { app: "Marking regime", std: "CE recognised · UKCA evolving", perf: "Documentation supported per project", doc: "CE / UKCA pack" },
                  { app: "Trade-cost exposure", std: "UK CBAM (2027): iron, steel, aluminium", perf: "GRP composite outside scope", doc: "HS 3925.20 / 7019 classification" },
                  { app: "Architectural finish", std: "Any RAL, incl. anthracite", perf: "AAMA 2604/2605, 10-yr exposure", doc: "AAMA-listed coater report" },
                ].map((row) => (
                  <tr key={row.app} className="border-b border-border-default">
                    <td className="py-[13px] pr-[21px] text-f15 font-medium text-t1">{row.app}</td>
                    <td className="py-[13px] pr-[21px] text-f15 text-t2">{row.std}</td>
                    <td className="py-[13px] pr-[21px] text-f15 text-t2">{row.perf}</td>
                    <td className="py-[13px] text-f15 text-t2">{row.doc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Logistics & Landed Cost</SectionTag>
          <h2 className="mt-[21px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-t1">
            China factory → UK site, duty and VAT pre-quoted
          </h2>
          <div className="mt-[34px] grid gap-[21px] lg:grid-cols-3">
            {[
              {
                step: "1",
                title: "RFQ → DDP UK quote in 24h",
                body: "Send drawing or section sketch + target quantity + delivery region. F1 returns full DDP pricing (GBP or USD) with UK duty + 20% import VAT itemized, HS classification, and ETA to site.",
              },
              {
                step: "2",
                title: "Production 4–6 weeks · cert pack",
                body: "Pultruded on F1's own lines. PHI Component Certificate 2491wi03, EN ISO 10077 thermal calculations, AAMA-listed coater report, and EN 14351-1 type-testing documentation supplied with the shipment.",
              },
              {
                step: "3",
                title: "Sea freight + DDP delivery",
                body: "30–38 days to Felixstowe / Southampton / London Gateway. Total PO-to-site 10–14 weeks. Inland delivery to London, the Midlands, the North, and Scotland from the port of entry.",
              },
            ].map((s) => (
              <div key={s.step} className="rounded-[8px] border border-border-default bg-white p-[34px]">
                <div className="text-f11 font-bold uppercase tracking-[2px] text-teal-text">Step {s.step}</div>
                <h3 className="mt-[8px] text-f17 font-bold text-t1">{s.title}</h3>
                <p className="mt-[8px] text-f13 leading-golden text-t2">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-[34px] flex flex-wrap gap-[13px]">
            <LinkArrow href="/products/fenestration-systems">Fibreglass windows &amp; doors (65–140)</LinkArrow>
            <LinkArrow href="/technology/polyurethane-pultrusion-windows">Polyurethane pultrusion windows (GFRP-PU)</LinkArrow>
            <LinkArrow href="/ai/passive-house">Free passive house window selector</LinkArrow>
            <LinkArrow href="/technology/u-value-calculator">Window U-value calculator</LinkArrow>
            <LinkArrow href="/regions/frp-passive-house-windows-germany">FRP passive house windows — Germany</LinkArrow>
          </div>

          <FAQ items={faqs} />
        </div>
      </section>

      <section className="bg-bg2 py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Related Resources</SectionTag>
          <div className="mt-[21px] grid gap-[21px] sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/resources/blog/frp-fenestration-passivhaus-certification"
              className="group rounded-[8px] border border-border-default bg-white p-[21px] transition-all hover:-translate-y-[2px] hover:border-teal-border"
            >
              <h3 className="text-f15 font-bold text-t1">PHI-certified GRP frames (U_w 0.78)</h3>
              <p className="mt-[5px] text-f13 leading-golden text-t2">PHI Component Certificate 2491wi03 — what the certification covers and how to specify it.</p>
            </Link>
            <Link
              href="/technology/frp-vs-pvc-windows"
              className="group rounded-[8px] border border-border-default bg-white p-[21px] transition-all hover:-translate-y-[2px] hover:border-teal-border"
            >
              <h3 className="text-f15 font-bold text-t1">GRP vs uPVC — stiffness &amp; U-value</h3>
              <p className="mt-[5px] text-f13 leading-golden text-t2">Why GRP frames need no steel reinforcement — larger sashes, dark colours without warping, no hidden thermal bridge.</p>
            </Link>
            <Link
              href="/case-studies/qinling-station-antarctic-passive-windows"
              className="group rounded-[8px] border border-border-default bg-white p-[21px] transition-all hover:-translate-y-[2px] hover:border-teal-border"
            >
              <h3 className="text-f15 font-bold text-t1">Antarctic passive windows case study</h3>
              <p className="mt-[5px] text-f13 leading-golden text-t2">The same PHI-certified 90-series system, installed against a −60°C design low at Qinling Station.</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-bg2 pb-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <CalculatorCTA
            href="/technology/u-value-calculator?frame=frp-90&glass=tg-kr&spacer=warm-premium&type=casement&w=1200&h=1400"
            eyebrow="Free tool · Passivhaus preset"
            title="Check a GRP window U-value against Part L and PHI targets"
            sub="Opens the U-value calculator pre-loaded with an F1 90-Series build-up — verify the whole-window Uw against Part L 1.4/1.2 and the Passivhaus 0.80 component criterion, then quote DDP UK."
          />
        </div>
      </section>

      <InnerCTA title="Need GRP windows quoted DDP to a UK site?" />
    </>
  );
}
