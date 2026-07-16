import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import SectionTag from "@/components/ui/SectionTag";
import FAQ from "@/components/ui/FAQ";
import JsonLd from "@/components/seo/JsonLd";
import CalculatorCTA from "@/components/calculators/CalculatorCTA";
import RelatedLinks from "@/components/sections/RelatedLinks";
import { buildPageMetadata, buildProductFamilyPageSchema, absoluteUrl, priceRangeFromWeights } from "@/lib/seo";
import { getCategorySizes } from "@/lib/catalog/public";

// Size table is DB-driven (catalog admin) with the historical hardcoded list
// as build-safe fallback; refreshed hourly.
export const revalidate = 3600;

const pageTitle = "Fiberglass I-Beam — Pultruded FRP Wide Flange Beams & Sizes";
const pageDescription =
  "Pultruded fiberglass I-beams (FRP) 76×38–305×305 mm, 1.2–16 kg/m, ~75% lighter than steel, EN 13706 E23, ASTM E84 Class A. Size + steel-weight table. DDP USA.";
const pagePath = "/products/standard-profiles/i-beam";

const LAST_UPDATED = "2026-06-30";
const REVIEWER = { name: "Yifan Liu", title: "Application Engineer", slug: "yifan-liu" };

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  image: "/products/standard-profiles/i-beam/opengraph-image",
});

// Size + mass are F1 published values. Steel comparison uses standard European
// section masses (IPE / UC) at the SAME nominal depth — accurate, citable, and
// the per-size weight delta no competitor publishes inline.
// Historical hardcoded list — now the build-safe fallback when the catalog DB
// is empty/unreachable, and the source of the editorial steel-comparison
// columns (steel masses are reference content, not catalog data).
const fallbackSizes = [
  { model: "I 76×38×6.4", h: 76, b: 38, t: 6.4, weight: "1.2", steel: "IPE 80", steelW: "6.0", saving: "80%" },
  { model: "I 100×50×6", h: 100, b: 50, t: 6, weight: "1.6", steel: "IPE 100", steelW: "8.1", saving: "80%" },
  { model: "I 120×60×6", h: 120, b: 60, t: 6, weight: "2.0", steel: "IPE 120", steelW: "10.4", saving: "81%" },
  { model: "I 152×76×6.4", h: 152, b: 76, t: 6.4, weight: "2.9", steel: "UB 152×89", steelW: "16.0", saving: "82%" },
  { model: "I 160×80×8", h: 160, b: 80, t: 8, weight: "3.6", steel: "IPE 160", steelW: "15.8", saving: "77%" },
  { model: "I 200×100×10", h: 200, b: 100, t: 10, weight: "5.8", steel: "IPE 200", steelW: "22.4", saving: "74%" },
  { model: "I 240×120×12", h: 240, b: 120, t: 12, weight: "8.4", steel: "IPE 240", steelW: "30.7", saving: "73%" },
  { model: "I 300×150×15", h: 300, b: 150, t: 15, weight: "13.5", steel: "IPE 300", steelW: "42.2", saving: "68%" },
  { model: "I 305×305×12.7", h: 305, b: 305, t: 12.7, weight: "16.0", steel: "UC 305×305", steelW: "96.9", saving: "83%" },
];

const steelByModel = new Map(fallbackSizes.map((s) => [s.model, s]));

async function loadSizes(): Promise<typeof fallbackSizes> {
  const rows = await getCategorySizes("i-beam");
  if (rows.length === 0) return fallbackSizes;
  return rows.map((r) => {
    const steel = steelByModel.get(r.model);
    return {
      model: r.model,
      h: r.dims.H ?? 0,
      b: r.dims.B ?? 0,
      t: r.dims.tw ?? 0,
      weight: r.weight == null ? "—" : String(r.weight),
      steel: steel?.steel ?? "—",
      steelW: steel?.steelW ?? "—",
      saving: steel?.saving ?? "—",
    };
  });
}

// EN 13706 E23 characteristic values (longitudinal). Modulus rows are the grade
// definition; the rest are F1 characteristic values per the cited test method.
const e23Props = [
  { property: "Tensile modulus E_L (longitudinal)", value: "≥ 23 GPa", method: "EN ISO 527-4" },
  { property: "Full-section flexural modulus", value: "≥ 23 GPa", method: "EN ISO 14125" },
  { property: "Tensile strength (longitudinal)", value: "240 MPa", method: "EN ISO 527-4" },
  { property: "Flexural strength", value: "240 MPa", method: "EN ISO 14125" },
  { property: "In-plane shear strength", value: "30 MPa", method: "EN ISO 14130" },
  { property: "Transverse tensile modulus E_T", value: "~ 7 GPa", method: "EN ISO 527-4" },
  { property: "Density", value: "1.9 g/cm³", method: "EN ISO 1183" },
  { property: "Glass content (by weight)", value: "65–70%", method: "ISO 1172" },
  { property: "Surface flame spread", value: "Class A · FSI ≤ 25", method: "ASTM E84" },
];

const crosswalk = [
  { topic: "Structural design code", eu: "CEN/TS 19101", na: "ASCE/SEI 74-23 (LRFD)", cn: "GB 50608 / CECS 692" },
  { topic: "Profile grade / tolerance", eu: "EN 13706 E17 / E23", na: "ASTM D3917", cn: "GB/T 31539" },
  { topic: "Tensile test", eu: "EN ISO 527-4", na: "ASTM D638", cn: "GB/T 1447" },
  { topic: "Flexural test", eu: "EN ISO 14125", na: "ASTM D790", cn: "GB/T 1449" },
  { topic: "Fire — surface flame spread", eu: "EN 13501-1", na: "ASTM E84", cn: "GB 8624" },
];

const pitfalls = [
  {
    title: "Deflection governs, not strength",
    body: "FRP modulus is 17–28 GPa — roughly 1/10 of steel. A section sized for steel-equivalent strength deflects about 10× more, so check the L/240 or L/360 serviceability limit first. If deflection passes, bending and shear usually pass with large margin.",
  },
  {
    title: "Shear deflection is real",
    body: "In-plane shear modulus G_LT is only ~3 GPa, so shear deformation adds 15–25% on top of bending deflection on short spans. Use the Timoshenko-corrected deflection (the calculator applies it automatically); pure Δ = 5wL⁴/384EI under-predicts.",
  },
  {
    title: "Check local buckling of the flange",
    body: "Thin-walled FRP flanges can buckle before reaching calculated bending capacity. Keep the outstanding-flange slenderness b/t ≤ ~18 for E-glass pultruded, and run the full check per ASCE/SEI 74-23 Ch.3 or CEN/TS 19101 §6 for compression-governed members.",
  },
  {
    title: "Detail connections for the transverse direction",
    body: "Pultruded FRP is strongly orthotropic — transverse strength is ~1/4 of longitudinal. Bolted joints need edge distance ≥ 4× bolt diameter, spacing ≥ 4d, oversized washers, and snug-tight (never crushed) A4-316 stainless fasteners.",
  },
];

const keyFacts = [
  { label: "Depth range", value: "76 – 305 mm" },
  { label: "Mass", value: "1.2 – 16 kg/m" },
  { label: "vs steel (same depth)", value: "~68–83% lighter" },
  { label: "Grade", value: "EN 13706 E23" },
  { label: "Resins", value: "Polyester · vinyl ester · PU · phenolic" },
  { label: "Fire", value: "ASTM E84 Class A" },
  { label: "Tolerance", value: "ASTM D3917 · ±0.25 mm" },
  { label: "Lead time", value: "Stock 2–4 wk · custom 4–8 wk" },
];

const faqItems = [
  {
    question: "How much lighter are FRP I-beams compared to steel?",
    answer:
      "At the same nominal depth, a pultruded FRP I-beam weighs about 68–83% less than the steel section. An FRP I 200×100×10 is 5.8 kg/m versus 22.4 kg/m for a steel IPE 200 — a 74% reduction in lifting weight and dead load. Note that, because FRP modulus is ~1/10 of steel, a deflection-equal FRP member is usually one or two depths larger than the steel it replaces; installed weight still drops roughly 70%.",
  },
  {
    question: "Where do I get the section properties (Ix, Sx) for design?",
    answer:
      "Verified section properties for the exact section you order are on the stamped production datasheet, and you can compute them live — with your wall thicknesses — in the FRP profile calculator. We deliberately do not publish back-calculated Ix/Sx on this page: pultruded I-beam wall geometry varies by size, so design-critical section properties must come from the datasheet for the ordered profile.",
  },
  {
    question: "Can FRP I-beams be used as primary structural members?",
    answer:
      "Yes — for walkways, pedestrian bridges, platforms, cooling towers, and building frames. Because the elastic modulus is ~1/10 of steel, deflection usually governs the design rather than strength. F1 Composite supplies full E23 mechanical data, span/load calculation support, and connection detailing.",
  },
  {
    question: "What resin systems are available for I-beams?",
    answer:
      "Isophthalic polyester for general structural use, vinyl ester for aggressive chemical, chlorine, or marine service, polyurethane for high toughness and fast cure, and phenolic for fire-critical or rail (EN 45545-2) applications. Resin choice drives chemical resistance and fire performance, not stiffness.",
  },
  {
    question: "Which standards do F1 Composite I-beams meet?",
    answer:
      "Profiles are produced to EN 13706 grade E23 (≥23 GPa full-section flexural modulus) and ASTM D3917 (±0.25 mm tolerance), with ISO 9001:2015 quality management and ASTM E84 Class A flame spread. Design references: ASCE/SEI 74-23 (US LRFD), CEN/TS 19101 (EU), GB 50608 / CECS 692 (China).",
  },
  {
    question: "What is the lead time and minimum order for FRP I-beams?",
    answer:
      "Standard sizes ship in 2–4 weeks; a custom section with new tooling is 4–8 weeks. Stock profiles have no minimum; custom runs are typically from 500 linear meters. Standard packaging is 6 m or 12 m lengths, cut to size on request.",
  },
];

export default async function IBeamPage() {
  const sizes = await loadSizes();
  const weights = sizes.map((s) => Number(s.weight)).filter((w) => Number.isFinite(w));
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageTitle,
    url: absoluteUrl(pagePath),
    dateModified: LAST_UPDATED,
    lastReviewed: LAST_UPDATED,
    reviewedBy: {
      "@type": "Person",
      name: REVIEWER.name,
      jobTitle: REVIEWER.title,
      url: absoluteUrl(`/about/authors/${REVIEWER.slug}`),
    },
    isPartOf: { "@type": "WebSite", name: "F1 Composite", url: "https://www.f1composite.com" },
    about: { "@type": "Thing", name: "Pultruded FRP I-beam", sameAs: "https://en.wikipedia.org/wiki/Pultrusion" },
  };

  return (
    <>
      <PageHeader
        tag="I-Beam"
        title="Fiberglass I-Beam (FRP) Profiles"
        description="Wide-flange pultruded fiberglass I-beams from 76×38 mm to 305×305 mm. About 70–80% lighter than steel beams at the same depth, fully corrosion-free, EN 13706 E23."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/pultruded-frp-profiles" },
          { label: "Standard Profiles", href: "/products/standard-profiles" },
          { label: "I-Beam" },
        ]}
      />

      <JsonLd
        data={buildProductFamilyPageSchema({
          name: "FRP I-Beam Profiles",
          description: pageDescription,
          path: pagePath,
          image: "/images/products/i-beam/frp-i-beam-profile-200x100x10mm.png",
          category: "Pultruded FRP Structural Profiles",
          material: ["E-glass fiber", "Polyester resin", "Vinyl ester resin", "Phenolic resin"],
          priceRange: priceRangeFromWeights(weights, 2.2, 4.5) ?? undefined,
          additionalProperty: [
            { name: "Size Range", value: "76×38 mm to 305×305 mm" },
            { name: "Mass", value: "1.2–16 kg/m" },
            { name: "Grade", value: "EN 13706 E23" },
            { name: "Benefit", value: "~70–80% lighter than steel at the same depth" },
          ],
          measurements: [
            { propertyID: "tensileStrength", value: "240-400", unitText: "MPa" },
            { propertyID: "flexuralStrength", value: "200-350", unitText: "MPa" },
            { propertyID: "flexuralModulus", value: "23", unitText: "GPa" },
            { propertyID: "density", value: "1.9", unitText: "g/cm³" },
          ],
        })}
      />
      <JsonLd data={pageSchema} />

      {/* Key facts (TL;DR) + review byline */}
      <section className="bg-white pt-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <p className="text-f17 leading-golden text-t1">
            A pultruded FRP I-beam is a constant-section fiberglass wide-flange beam
            made by pulling E-glass roving and mat through a resin bath and heated
            die. It carries bending load like a steel I-beam but weighs ~70–80% less,
            never corrodes, and does not conduct electricity — so deflection, not
            strength or rust, governs how you size it.
          </p>
          <div className="mt-[24px] rounded-[8px] border border-border-default bg-bg2 p-[24px]">
            <div className="flex flex-wrap items-baseline justify-between gap-[8px]">
              <h2 className="text-f13 font-bold uppercase tracking-[2px] text-teal-text">Key facts</h2>
              <p className="text-f12 text-t3">
                Reviewed by{" "}
                <Link href={`/about/authors/${REVIEWER.slug}`} className="font-semibold text-teal-text hover:text-teal">
                  {REVIEWER.name}
                </Link>
                , {REVIEWER.title} · Last updated {LAST_UPDATED}
              </p>
            </div>
            <dl className="mt-[16px] grid gap-x-[34px] gap-y-[13px] sm:grid-cols-2 lg:grid-cols-4">
              {keyFacts.map((f) => (
                <div key={f.label}>
                  <dt className="text-f11 font-bold uppercase tracking-[1px] text-t3">{f.label}</dt>
                  <dd className="mt-[3px] text-f15 font-semibold text-t1">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Hero Image + Intro */}
      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="grid gap-[34px] lg:grid-cols-2 lg:items-center">
            <div>
              <SectionTag>Wide-flange profiles</SectionTag>
              <h2 className="mt-[8px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
                Structural I-beams engineered for performance
              </h2>
              <p className="mt-[13px] text-f15 leading-golden text-t2">
                F1 Composite pultruded FRP I-beams replicate standard steel
                wide-flange geometry while delivering ~70–80% weight reduction.
                Unidirectional E-glass roving in the flanges provides flexural
                stiffness; continuous strand mat in the web carries shear; a
                surfacing veil gives a resin-rich, UV- and corrosion-resistant
                outer layer. Available in polyester, vinyl ester, polyurethane,
                and phenolic resin systems.
              </p>
              <div className="mt-[16px] flex flex-wrap gap-[13px]">
                <span className="rounded-[4px] bg-bg2 px-[13px] py-[5px] text-f13 font-medium text-t2">EN 13706 E23</span>
                <span className="rounded-[4px] bg-bg2 px-[13px] py-[5px] text-f13 font-medium text-t2">Corrosion-free</span>
                <span className="rounded-[4px] bg-bg2 px-[13px] py-[5px] text-f13 font-medium text-t2">Non-conductive</span>
                <span className="rounded-[4px] bg-bg2 px-[13px] py-[5px] text-f13 font-medium text-t2">ISO 9001:2015</span>
              </div>
            </div>
            <div className="relative aspect-square overflow-hidden rounded-[8px] bg-neutral-50">
              <Image
                src="/images/products/i-beam/frp-i-beam-cover.jpg"
                alt="Pultruded FRP I-beam wide flange structural profile by F1 Composite"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* How to size */}
      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>How to size an FRP I-beam</SectionTag>
          <h2 className="mt-[8px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Deflection first, then strength
          </h2>
          <p className="mt-[13px] text-f15 leading-golden text-t2">
            Sizing an FRP I-beam follows a different order than steel. Because the
            modulus is roughly a tenth of steel, the section that satisfies the
            deflection limit almost always satisfies bending and shear with margin.
            Work the four checks below in order — or run them instantly in the
            calculator, pre-loaded for an I-beam.
          </p>
          <div className="mt-[34px] grid gap-[21px] md:grid-cols-2">
            {pitfalls.map((p) => (
              <div key={p.title} className="rounded-[8px] border border-border-default bg-white p-[24px]">
                <h3 className="text-f17 font-bold text-t1">{p.title}</h3>
                <p className="mt-[8px] text-f15 leading-golden text-t2">{p.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-[34px]">
            <CalculatorCTA
              href="/frp-profile-calculator?shape=i-beam&span=3000&load=5&env=outdoor&material=frp-e23&load_type=udl&defl=360"
              eyebrow="Worked example · 3 m walkway beam"
              title="Size a 3 m walkway I-beam at 5 kN/m, L/360, outdoor"
              sub="Opens the calculator pre-loaded with this load case on an EN 13706 E23 I-beam — see which check governs, the steel-equivalent section, and the deflection with the Timoshenko shear correction included."
            />
          </div>
        </div>
      </section>

      {/* Size + steel weight table */}
      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Sizes &amp; weight vs steel</SectionTag>
          <h2 className="mt-[8px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Standard I-beam sizes — and what they replace in steel
          </h2>
          <p className="mt-[13px] text-f15 leading-golden text-t2">
            All dimensions in millimeters; mass in kg/m. The steel column is the
            standard section at the same nominal depth, for a direct weight
            comparison. Custom sizes available via{" "}
            <Link href="/products/custom-pultrusions" className="font-semibold text-teal-text hover:text-teal">custom pultrusion</Link>.
          </p>

          <div className="mt-[34px] overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-border-default">
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">Model (H×B×t)</th>
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">H (mm)</th>
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">B (mm)</th>
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-teal-text">FRP (kg/m)</th>
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">Steel (same depth)</th>
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">Steel (kg/m)</th>
                  <th className="py-[13px] text-f13 font-bold uppercase tracking-wide text-teal-text">Weight saving</th>
                </tr>
              </thead>
              <tbody>
                {sizes.map((s) => (
                  <tr key={s.model} className="border-b border-border-default">
                    <td className="py-[13px] pr-[21px] text-f15 font-medium text-t1">{s.model}</td>
                    <td className="py-[13px] pr-[21px] text-f15 text-t2">{s.h}</td>
                    <td className="py-[13px] pr-[21px] text-f15 text-t2">{s.b}</td>
                    <td className="py-[13px] pr-[21px] text-f15 font-medium text-teal-text">{s.weight}</td>
                    <td className="py-[13px] pr-[21px] text-f15 text-t2">{s.steel}</td>
                    <td className="py-[13px] pr-[21px] text-f15 text-t2">{s.steelW}</td>
                    <td className="py-[13px] text-f15 font-medium text-teal-text">{s.saving}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-[16px] text-f13 text-t3">
            Compared at the same nominal depth. Because FRP modulus is ~1/10 of
            steel, a deflection-equal FRP section is typically one or two depths
            larger than the steel it replaces — installed weight still drops ~70%.
            Steel masses are standard IPE / UC / UB sections (reference only, not
            supplied by F1 Composite).
          </p>

          {/* Section properties — honest routing, not back-calculated */}
          <div className="mt-[34px] rounded-[8px] border border-teal/30 bg-bg2 p-[24px]">
            <h3 className="text-f15 font-bold uppercase tracking-[2px] text-teal-text">Section properties (A, I<sub>x</sub>, S<sub>x</sub>)</h3>
            <p className="mt-[8px] text-f15 leading-golden text-t2">
              Verified section properties — area, second moment of area, section
              modulus, radius of gyration — for the exact section you order are on
              the stamped production datasheet, and you can compute them live, with
              your wall thicknesses, in the{" "}
              <Link href="/frp-profile-calculator?shape=i-beam" className="font-semibold text-teal-text hover:text-teal">FRP profile calculator</Link>.
              We deliberately do not publish back-calculated section properties on
              this page: pultruded I-beam wall geometry varies by size, so
              design-critical I<sub>x</sub>/S<sub>x</sub> must come from the datasheet for the
              profile you specify.
            </p>
          </div>
        </div>
      </section>

      {/* EN 13706 E23 properties */}
      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Mechanical data — EN 13706 E23</SectionTag>
          <h2 className="mt-[8px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            E23 characteristic properties (longitudinal)
          </h2>
          <p className="mt-[13px] text-f15 leading-golden text-t2">
            F1 Composite standard I-beams are produced to EN 13706 grade E23 — a
            minimum full-section flexural modulus of 23 GPa. Each property is paired
            with the test method that produces it.
          </p>
          <div className="mt-[34px] overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-border-default">
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">Property</th>
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-teal-text">E23 value</th>
                  <th className="py-[13px] text-f13 font-bold uppercase tracking-wide text-t1">Test method</th>
                </tr>
              </thead>
              <tbody>
                {e23Props.map((p) => (
                  <tr key={p.property} className="border-b border-border-default">
                    <td className="py-[13px] pr-[21px] text-f15 font-medium text-t1">{p.property}</td>
                    <td className="py-[13px] pr-[21px] text-f15 font-medium text-teal-text">{p.value}</td>
                    <td className="py-[13px] text-f13 text-t3">{p.method}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-[16px] text-f13 text-t3">
            Modulus rows are the EN 13706 grade definition; strength, density, glass
            content, and flame spread are F1 characteristic values per the cited
            method. Transverse strength is ~1/4 of longitudinal — design
            connections accordingly.
          </p>
        </div>
      </section>

      {/* FRP vs steel — when to use */}
      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>FRP vs steel I-beam</SectionTag>
          <h2 className="mt-[8px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            When an FRP I-beam wins — and when steel still makes sense
          </h2>
          <div className="mt-[34px] grid gap-[21px] lg:grid-cols-2">
            <div className="rounded-[8px] border border-teal/30 bg-bg2 p-[24px]">
              <h3 className="text-f17 font-bold text-teal-text">Specify FRP when</h3>
              <ul className="mt-[13px] space-y-[10px] text-f15 leading-golden text-t2">
                <li>Coastal, chemical, wastewater, or de-icing-salt exposure where steel needs recoating cycles.</li>
                <li>Electrical non-conductivity or non-magnetic behaviour is required (substations, rail, MRI rooms).</li>
                <li>Manual handling matters — crews lift FRP sections without cranes or hot-work permits.</li>
                <li>A 25–50+ year maintenance-free design life changes the lifecycle cost in FRP&rsquo;s favour.</li>
              </ul>
            </div>
            <div className="rounded-[8px] border border-border-default bg-bg2 p-[24px]">
              <h3 className="text-f17 font-bold text-t1">Stay with steel when</h3>
              <ul className="mt-[13px] space-y-[10px] text-f15 leading-golden text-t2">
                <li>Dry, inland, non-corrosive service with a short asset horizon (&lt; 15 years).</li>
                <li>Long spans where deflection forces an impractically deep FRP section.</li>
                <li>Continuous service temperature above ~60 °C (approaching the resin&rsquo;s glass transition).</li>
                <li>The certifying authority does not yet accept FRP for the element.</li>
              </ul>
            </div>
          </div>
          <p className="mt-[21px] text-f13 text-t3">
            Full cost and lifecycle comparison:{" "}
            <Link href="/technology/frp-vs-traditional-materials" className="font-semibold text-teal-text hover:text-teal">FRP vs steel, aluminum &amp; timber</Link>.
          </p>
        </div>
      </section>

      {/* Standards crosswalk */}
      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Standards crosswalk</SectionTag>
          <h2 className="mt-[8px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            The same I-beam, across EU / US / China specs
          </h2>
          <p className="mt-[13px] text-f15 leading-golden text-t2">
            Specifiers in different regions cite different standard numbers for the
            same property. This maps the equivalents F1 Composite I-beams are tested
            and documented against.
          </p>
          <div className="mt-[34px] overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-border-default">
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">Topic</th>
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">Europe</th>
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">North America</th>
                  <th className="py-[13px] text-f13 font-bold uppercase tracking-wide text-t1">China</th>
                </tr>
              </thead>
              <tbody>
                {crosswalk.map((r) => (
                  <tr key={r.topic} className="border-b border-border-default">
                    <td className="py-[13px] pr-[21px] text-f15 font-medium text-t1">{r.topic}</td>
                    <td className="py-[13px] pr-[21px] text-f15 text-t2">{r.eu}</td>
                    <td className="py-[13px] pr-[21px] text-f15 text-t2">{r.na}</td>
                    <td className="py-[13px] text-f15 text-t2">{r.cn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <RelatedLinks
        groups={[
          {
            title: "Related FRP profiles",
            links: [
              { href: "/products/standard-profiles/channel", label: "FRP channel profiles" },
              { href: "/products/standard-profiles/angle", label: "FRP angle profiles" },
              { href: "/products/standard-profiles/square-tube", label: "FRP square tube" },
              { href: "/products/standard-profiles/flat-bar", label: "FRP flat bar" },
              { href: "/pultruded-frp-profiles", label: "All pultruded FRP profiles" },
              { href: "/products/custom-pultrusions", label: "Custom pultrusion services" },
            ],
          },
          {
            title: "Applications & case studies",
            links: [
              { href: "/applications/frp-bridge-deck-panels", label: "FRP bridge deck panels" },
              { href: "/applications/frp-chemical-plant-platforms", label: "Chemical plant platforms" },
              { href: "/case-studies/european-bridge-deck", label: "Bridge deck case study" },
              { href: "/case-studies/factory-access-staircase", label: "Factory access staircase case study" },
              { href: "/industries/infrastructure", label: "Infrastructure & bridges" },
            ],
          },
          {
            title: "Technical resources",
            links: [
              { href: "/frp-span-tables#i-beam", label: "FRP I-beam span table — allowable loads" },
              { href: "/frp-profile-calculator?shape=i-beam", label: "FRP I-beam calculator" },
              { href: "/technology/frp-vs-traditional-materials", label: "FRP vs steel comparison" },
              { href: "/resources/technical-data", label: "Data sheets & test certificates" },
              { href: "/resources/design-guides", label: "Design guides (ASCE / EN 13706)" },
              { href: "/resources/glossary", label: "FRP & pultrusion glossary" },
            ],
          },
        ]}
      />

      {/* FAQ */}
      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <FAQ items={faqItems} />
        </div>
      </section>

      <section className="bg-white pb-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <CalculatorCTA
            href="/frp-profile-calculator?shape=i-beam"
            eyebrow="Free tool · I-beam preset"
            title="Size an FRP I-beam — bending, shear &amp; deflection"
            sub="Opens the FRP profile calculator on an I-beam: check bending, shear, and Timoshenko-corrected deflection against your span and load, find the steel-equivalent section, then quote against your spec."
          />
        </div>
      </section>

      <InnerCTA title="Need engineering data or a quotation for I-beam profiles?" />
    </>
  );
}
