import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/layout/PageHeader";
import ArticleSignals from "@/components/sections/ArticleSignals";
import InnerCTA from "@/components/sections/InnerCTA";
import SectionTag from "@/components/ui/SectionTag";
import LinkArrow from "@/components/ui/LinkArrow";
import FAQ from "@/components/ui/FAQ";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

/* ═══════════════════════════════════════════════════════
   Page metadata
   ═══════════════════════════════════════════════════════ */

const pageTitle = "Quality & Testing — Certifications & Standards";
const pageDescription =
  "ISO 9001 certified, EN 13706 and ASTM compliant. Global FRP pultrusion standards comparison across EU, USA, China, Canada, UK, Japan, Korea, and Middle East. Full mechanical testing on every production run.";
const pagePath = "/technology/quality-testing";
const publishedAt = "2024-04-05";
const updatedAt = "2026-04-02";
const authorName = "F1 Composite Quality Engineering Team";
const authorRole = "QC systems, laboratory testing, and certification specialists";
const reviewedBy = "Compliance and Testing Review Group";
const referencedStandards = ["ISO 9001:2015", "EN 13706", "ASTM D3917", "ASTM D4385", "GB/T 31539", "CSA S807", "CNR-DT 205/2007", "ASCE Pre-Standard for LRFD"];

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  image: "/technology/quality-testing/opengraph-image",
});

/* ═══════════════════════════════════════════════════════
   §1  Certifications — data
   ═══════════════════════════════════════════════════════ */

const certifications = [
  {
    title: "ISO 9001:2015",
    body: "Our quality management system (QMS) is certified to ISO 9001:2015, the international standard for quality management. The certification scope covers the design, manufacture, testing, and supply of pultruded fiber-reinforced polymer profiles and secondary fabricated assemblies. The QMS is audited annually by an accredited third-party certification body and undergoes a full recertification audit every three years. The system drives continuous improvement through documented corrective action processes, management reviews, internal audits, and customer feedback analysis.",
  },
  {
    title: "CE Marking (EU CPR)",
    body: "Our structural pultruded profiles carry CE marking under the European Construction Products Regulation (EU) No 305/2011, based on factory production control (FPC) and initial type testing (ITT) in accordance with EN 13706-1, EN 13706-2, and EN 13706-3. CE marking declares that the profiles conform to the declared performance characteristics — including mechanical strength, stiffness, fire reaction class, and durability — and can be placed on the European market for their intended use in construction works.",
  },
  {
    title: "EN 13706",
    body: "EN 13706 is the European harmonized standard specifically for pultruded FRP profiles. It defines two performance grades — E17 (standard) and E23 (high performance) — with minimum requirements for tensile strength, flexural strength, flexural modulus, pin-bearing strength, and interlaminar shear strength. Our standard structural profiles meet or exceed EN 13706 Grade E23 requirements. The standard also specifies dimensional tolerances, surface quality requirements, and fire reaction class testing protocols, all of which are incorporated into our production specifications.",
  },
  {
    title: "ASTM D3917 & D4385",
    body: "For North American and global markets that reference ASTM standards, we manufacture to ASTM D3917 (Standard Specification for Dimensional Tolerance of Thermosetting Glass-Reinforced Plastic Pultruded Shapes) and classify visual quality per ASTM D4385 (Standard Practice for Classifying Visual Defects in Thermosetting Reinforced Plastic Pultruded Products). ASTM D3917 defines tolerance classes for width, height, wall thickness, straightness, twist, and angularity. ASTM D4385 categorizes surface defects (voids, cracks, dry spots, discoloration) by severity and establishes accept/reject criteria.",
  },
];

/* ═══════════════════════════════════════════════════════
   §2  International Standards by Region — data
   ═══════════════════════════════════════════════════════ */

interface RegionalStandard {
  code: string;
  scope: string;
  requirements: string;
}

interface RegionEntry {
  region: string;
  standards: RegionalStandard[];
}

const regionalStandards: RegionEntry[] = [
  {
    region: "Europe (EU/EEA)",
    standards: [
      { code: "EN 13706-1/2/3", scope: "Material specification & classification for pultruded FRP profiles", requirements: "Two performance grades (E17 & E23); minimum tensile, flexural, pin-bearing & interlaminar shear strength; dimensional tolerances; fire reaction class; CE marking under CPR (EU) No 305/2011" },
      { code: "Eurocomp Design Code", scope: "Structural design of FRP composite structures", requirements: "Partial safety factor approach; design guidance for beams, columns, connections; serviceability (deflection L/250); fire design; durability factors" },
    ],
  },
  {
    region: "United States",
    standards: [
      { code: "ASTM D3917", scope: "Dimensional tolerances for pultruded shapes", requirements: "Tolerance classes for width, height, wall thickness, straightness, twist, and angularity of thermosetting glass-reinforced pultruded shapes" },
      { code: "ASTM D4385", scope: "Visual defect classification for pultruded products", requirements: "Categorizes surface defects (voids, cracks, dry spots, discoloration) by severity; establishes accept/reject criteria" },
      { code: "ASCE Pre-Standard for LRFD", scope: "Structural design of pultruded FRP structures", requirements: "Load and Resistance Factor Design (LRFD) for pultruded FRP; member design (tension, compression, flexure, shear); connection design; stability; serviceability limits (L/400 typical)" },
    ],
  },
  {
    region: "United Kingdom",
    standards: [
      { code: "BS EN 13706", scope: "UK-adopted EN 13706 (post-Brexit retained)", requirements: "Identical technical content to EN 13706; accepted for UKCA and CE marking; widely referenced by Highways England and Network Rail specifications" },
      { code: "BD 90/05 / CD 368", scope: "FRP bridge design guidance", requirements: "Design guidance for FRP bridges and highway structures; deflection limits, partial factors, fatigue; referenced by UK Highways authorities" },
    ],
  },
  {
    region: "Canada",
    standards: [
      { code: "CSA S807", scope: "Specification for fibre-reinforced polymers", requirements: "Material grades and classifications; mechanical property requirements; test methods for FRP bars, grids, and profiles; quality assurance provisions" },
      { code: "CSA S806", scope: "Design and construction of building structures with FRP", requirements: "Design provisions for FRP in building structures; limit states design; flexural and shear design; connections; fire resistance requirements" },
    ],
  },
  {
    region: "China",
    standards: [
      { code: "GB/T 31539", scope: "Pultruded glass fibre reinforced plastics profiles (拉挤玻璃纤维增强塑料型材)", requirements: "Classification, technical requirements, test methods, inspection rules; mechanical properties (tensile, flexural, compression, shear); dimensional tolerances; appearance quality" },
      { code: "GB/T 31550", scope: "Structural pultruded FRP profiles for engineering (结构用拉挤玻璃纤维增强塑料型材)", requirements: "Structural-grade requirements; I-beam, channel, angle, tube specifications; design values for structural applications; higher performance thresholds than GB/T 31539" },
      { code: "JG/T 564", scope: "FRP profiles for building fenestration (建筑门窗用纤维增强塑料型材)", requirements: "Requirements for FRP window and door frame profiles; thermal performance, weathering resistance, corner joint strength; specific to building envelope applications" },
    ],
  },
  {
    region: "Japan",
    standards: [
      { code: "JSCE Guidelines for FRP", scope: "Design and construction of FRP structures", requirements: "Japan Society of Civil Engineers guidelines; design principles for FRP in civil infrastructure; partial safety factors; seismic considerations; durability in humid/coastal environments" },
      { code: "JIS K 7017", scope: "Flexural properties of fibre-reinforced plastics", requirements: "Test method for flexural strength and modulus; three-point and four-point bending configurations; referenced for FRP profile qualification in Japanese infrastructure projects" },
    ],
  },
  {
    region: "South Korea",
    standards: [
      { code: "KS M 3015", scope: "Glass fibre reinforced plastics pultruded profiles", requirements: "Korean Industrial Standard for pultruded GFRP profiles; mechanical property requirements; dimensional tolerances; test methods aligned with ISO equivalents; required for Korean government infrastructure procurement" },
    ],
  },
  {
    region: "Italy",
    standards: [
      { code: "CNR-DT 205/2007", scope: "Design and construction of pultruded FRP structures", requirements: "Italian National Research Council design guide; limit state design approach; member verification (axial, bending, shear, buckling); connection design; one of the most comprehensive FRP structural design codes in Europe" },
    ],
  },
  {
    region: "Australia & New Zealand",
    standards: [
      { code: "ACMA / AS 4586 (referenced)", scope: "FRP in infrastructure (slip resistance testing per AS 4586)", requirements: "No dedicated pultrusion standard; projects reference EN 13706 or ASTM D3917 for material specification; AS 4586 specifically required for slip resistance classification of FRP gratings in walkway applications; state road authorities (e.g., VicRoads, TMR Queensland) maintain project-specific FRP acceptance criteria" },
    ],
  },
  {
    region: "Gulf States (GCC)",
    standards: [
      { code: "GSO / EN 13706 referenced", scope: "FRP in construction and oil & gas infrastructure", requirements: "No indigenous pultrusion standard; projects in UAE, Saudi Arabia, Qatar typically specify EN 13706 or ASTM D3917 in tender documents; ADNOC, Saudi Aramco, and QAPCO maintain internal material specifications that reference these international standards; additional requirements for UV resistance and high-temperature performance (60°C+ service)" },
    ],
  },
];

/* ═══════════════════════════════════════════════════════
   §3  Standards Comparison Matrix — data
   ═══════════════════════════════════════════════════════ */

const comparisonHeaders = ["Aspect", "EN 13706 (EU)", "ASTM (USA)", "GB/T 31539 (China)", "CSA S807 (Canada)"] as const;

const comparisonRows = [
  ["Performance Grades", "E17, E23", "No formal grades; project-specific", "Grade I, II, III", "Grade I, II, III"],
  ["Min. Tensile Strength", "E23: 240 MPa (longitudinal)", "Per ASTM D638; no fixed minimum", "Grade I: 250 MPa", "Grade-dependent; aligned with EN"],
  ["Min. Flexural Strength", "E23: 240 MPa", "Per ASTM D790; no fixed minimum", "Grade I: 250 MPa", "Grade-dependent"],
  ["Dimensional Tolerance", "EN 13706-2 Annex A", "ASTM D3917 tolerance classes", "GB/T 31539 Section 5", "CSA S807 Clause 7"],
  ["Fire Testing", "EN 13501-1 reaction to fire class", "ASTM E84 flame spread index", "GB 8624 building material combustion", "CAN/ULC-S102 flame spread"],
  ["Design Code", "Eurocomp + CNR-DT 205", "ASCE Pre-Standard (LRFD)", "GB 50608 (FRP in construction)", "CSA S806"],
  ["CE / Conformity Mark", "CE marking required (CPR)", "No mandatory mark; ICC-ES reports common", "CCC not required for FRP profiles", "No mandatory mark; CSA certification available"],
];

/* ═══════════════════════════════════════════════════════
   §4  Testing Procedures — data
   ═══════════════════════════════════════════════════════ */

const testingProcedures = [
  {
    title: "Tensile Testing",
    standard: "ISO 527 / ASTM D638",
    body: "Tensile tests determine the ultimate tensile strength (UTS), tensile modulus of elasticity, and elongation at break of the pultruded profile in the longitudinal direction. Specimens are gripped in serrated or bonded-tab jaws and loaded at a constant crosshead speed until failure. The test yields the complete stress-strain curve, from which we extract both strength and stiffness values. For structural profiles, we also test transverse tensile strength to verify the contribution of continuous filament mat and off-axis fabric reinforcements. Minimum acceptance values are defined per EN 13706 grade or per the customer-specific specification.",
  },
  {
    title: "Flexural Testing",
    standard: "ISO 14125 / ASTM D790",
    body: "Three-point bending tests measure flexural strength and flexural modulus — the properties most directly relevant to profiles used as beams, planks, and load-bearing members. The specimen is supported on two lower rollers and loaded via a central roller at a controlled rate. We test at a span-to-depth ratio of 16:1 (standard) and 32:1 (for modulus-dominant characterization). Flexural testing is particularly sensitive to the degree of cure and the quality of fiber-resin bonding, making it an excellent indicator of overall process quality. Results are reported alongside the EN 13706 E17/E23 minimum thresholds for direct comparison.",
  },
  {
    title: "Impact Testing",
    standard: "ISO 179 / ASTM D256",
    body: "Charpy or Izod impact tests measure the energy absorbed by a notched specimen during fracture under a single pendulum strike. Impact resistance is critical for profiles used in handrail systems, walkway gratings, vehicle barriers, and any application subject to sudden dynamic loads. FRP profiles reinforced with continuous filament mat exhibit significantly higher impact resistance than those reinforced with unidirectional roving alone, because the random fiber orientation in CFM arrests crack propagation across the profile wall. We specify minimum impact energy values based on the intended application and verify compliance on every production batch.",
  },
  {
    title: "Barcol Hardness",
    standard: "ASTM D2583",
    body: "Barcol hardness is a quick, non-destructive test that measures the surface hardness of the cured resin by pressing a sharp steel indenter into the profile surface under a calibrated spring load. The hardness reading correlates directly with the degree of cure — under-cured profiles read lower, fully cured profiles read higher. Because it requires no specimen preparation and takes only seconds, Barcol hardness is the primary in-process quality check used by our operators at the pultrusion line. We take readings at the start of every production run, at every spool change, and at minimum one-hour intervals during continuous production. Typical acceptance ranges are 40–55 for polyester systems and 35–50 for vinyl ester systems.",
  },
  {
    title: "Glass Fiber Content",
    standard: "ISO 1172 / ASTM D2584",
    body: "The glass fiber content (by weight) is determined by the burn-off method: a weighed specimen is placed in a muffle furnace at 625 °C until the resin matrix is completely combusted, and the remaining glass fiber residue is reweighed. The glass content directly governs the mechanical strength and stiffness of the profile — higher glass content generally means higher strength, up to the practical limit of fiber packing. We verify that glass content falls within the ±2 % tolerance band specified in the product datasheet, ensuring consistent mechanical performance across production batches. Typical values range from 55 % to 72 % by weight depending on the profile design and application.",
  },
  {
    title: "UV Aging",
    standard: "ASTM G154 / ISO 4892",
    body: "Accelerated UV aging tests simulate years of outdoor weathering in a compressed time frame. Specimens are exposed to UV-A or UV-B fluorescent lamps in a cyclic condensation cabinet, alternating UV irradiation with moisture condensation. We test to 2,000 hours of exposure (equivalent to approximately 10–15 years of Central European outdoor exposure or 7–10 years of subtropical exposure). After aging, we measure residual flexural strength, surface color change (Delta E per ASTM D2244), and gloss retention. Our UV-stabilized resin formulations typically retain greater than 90 % of original flexural strength and less than 3 Delta E color shift after 2,000 hours, confirming long-term durability for outdoor structural applications.",
  },
];

/* ═══════════════════════════════════════════════════════
   §5  QC Workflow Steps — data
   ═══════════════════════════════════════════════════════ */

const qcSteps = [
  {
    title: "Incoming Material Inspection",
    body: "Every batch of fiber roving, resin, filler, and release agent is inspected against supplier certificates of analysis. Resin gel time and viscosity are verified in our lab. Non-conforming materials are quarantined and returned.",
  },
  {
    title: "Pre-Production Setup Verification",
    body: "Before every production run, the line supervisor verifies creel configuration, guide plate alignment, die temperature set points, pull speed, and resin mix ratio against the validated recipe. Setup is signed off before the puller is started.",
  },
  {
    title: "In-Process Monitoring",
    body: "Real-time SPC monitors die temperatures, pull speed, and pull force. Operators check Barcol hardness and dimensional compliance at prescribed intervals. Deviations trigger immediate investigation and corrective action.",
  },
  {
    title: "End-of-Run Testing",
    body: "Samples from the start, middle, and end of each run are sent to the lab for full mechanical testing: tensile, flexural, Barcol, and glass content. Results must fall within specification before the batch is released.",
  },
  {
    title: "Final Inspection and Shipment",
    body: "Every profile is visually inspected per ASTM D4385, dimensionally measured, labeled with batch traceability codes, and packaged for shipment. Material test certificates (EN 10204 Type 3.1) accompany every delivery.",
  },
];

/* ═══════════════════════════════════════════════════════
   §6  FAQ — data
   ═══════════════════════════════════════════════════════ */

const faqItems = [
  {
    question: "What quality certifications does F1 Composite hold?",
    answer: "F1 Composite operates under an ISO 9001:2015 certified quality management system that covers the entire production chain from raw material receiving through pultrusion, secondary fabrication, testing, and shipment. Our profiles carry CE marking in compliance with the European Construction Products Regulation (CPR), and our standard structural shapes are manufactured to EN 13706 (the European harmonized standard for pultruded FRP profiles). For customers in North American markets, we test to ASTM D3917 (Standard Specification for Dimensional Tolerance of Thermosetting Glass-Reinforced Plastic Pultruded Shapes) and ASTM D4385 (Standard Practice for Classifying Visual Defects in Thermosetting Reinforced Plastic Pultruded Products).",
  },
  {
    question: "What mechanical tests are performed on pultruded FRP profiles?",
    answer: "Every production run undergoes a standard battery of mechanical tests: tensile strength and modulus (ISO 527 / ASTM D638), flexural strength and modulus (ISO 14125 / ASTM D790), Barcol hardness (ASTM D2583) to verify degree of cure, and glass fiber content by burn-off (ISO 1172 / ASTM D2584). For structural profiles, we additionally perform short-beam shear testing (ASTM D2344) and pin-bearing strength testing (ASTM D953). Impact resistance testing (Charpy or Izod per ISO 179 / ASTM D256) is conducted when specified by the customer or required by the application standard.",
  },
  {
    question: "How does F1 Composite ensure batch-to-batch consistency?",
    answer: "Consistency is guaranteed through three interlocking systems: (1) Validated process recipes that lock all critical parameters — pull speed, die temperatures, injection pressure, resin mix ratios — within proven control limits; (2) Real-time statistical process control (SPC) that monitors every parameter at one-second intervals and alerts operators if any value drifts outside its control band; (3) End-of-run mechanical testing on samples cut from the start, middle, and end of each production campaign, with results compared against historical control charts.",
  },
  {
    question: "Can F1 Composite provide material test certificates for each order?",
    answer: "Yes. We provide EN 10204 Type 3.1 inspection certificates as standard with every shipment. Each certificate reports the actual measured values for tensile strength, flexural strength, Barcol hardness, glass content, and dimensional compliance for the specific production batch from which the shipped profiles were drawn. For critical structural applications, we can provide Type 3.2 certificates with independent third-party witness testing. Full traceability from finished profile back to raw material batch numbers (fiber, resin, filler, release agent) is maintained in our ERP system and available upon request.",
  },
];

/* ═══════════════════════════════════════════════════════
   Page Component
   ═══════════════════════════════════════════════════════ */

export default function QualityTestingPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: pageTitle,
    description: pageDescription,
    url: absoluteUrl(pagePath),
    image: absoluteUrl("/technology/quality-testing/opengraph-image"),
    datePublished: publishedAt,
    dateModified: updatedAt,
    author: { "@type": "Organization", name: authorName },
    editor: { "@type": "Organization", name: reviewedBy },
    publisher: {
      "@type": "Organization",
      name: "F1 Composite",
      url: absoluteUrl("/"),
    },
    citation: referencedStandards,
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <PageHeader
        tag="Quality & Testing"
        title="Certified Quality from Raw Material to Finished Profile"
        description="Every pultruded FRP profile we produce is backed by a rigorous quality management system, comprehensive mechanical testing, and full batch traceability. We do not ship profiles that have not been tested and verified against specification."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Technology", href: "/technology" },
          { label: "Quality & Testing" },
        ]}
      />
      <ArticleSignals
        publishedAt={publishedAt}
        updatedAt={updatedAt}
        authorName={authorName}
        authorRole={authorRole}
        reviewedBy={reviewedBy}
        standards={referencedStandards}
      />

      {/* Hero image */}
      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="overflow-hidden rounded-[8px]">
            <Image
              src="/images/technology/quality-control-inspection-testing.jpg"
              alt="Quality control inspection and testing in composites manufacturing"
              width={1280}
              height={600}
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── §1 Certifications ── */}
      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Certifications</SectionTag>
          <h2 className="mt-[21px] text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.15] tracking-[-0.02em] text-t1">
            Standards and Certifications
          </h2>
          <p className="mt-[13px] max-w-[640px] text-f15 leading-golden text-t2">
            Our quality management system is certified to internationally recognized
            standards, and our products comply with the technical specifications required
            by the construction, infrastructure, and industrial markets we serve.
          </p>

          <div className="mt-[55px] grid gap-[21px] sm:grid-cols-2">
            {certifications.map((cert) => (
              <div key={cert.title} className="rounded-[8px] border border-border-default bg-bg2 p-[34px]">
                <h3 className="text-f19 font-bold text-t1">{cert.title}</h3>
                <p className="mt-[13px] text-f15 leading-golden text-t2">{cert.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── §2 International Standards by Region ── */}
      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>International Standards</SectionTag>
          <h2 className="mt-[21px] text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.15] tracking-[-0.02em] text-t1">
            Global FRP Pultrusion Standards by Country &amp; Region
          </h2>
          <p className="mt-[13px] max-w-[640px] text-f15 leading-golden text-t2">
            Different markets require compliance with different technical standards for
            pultruded FRP profiles. Below is a reference of the principal standards in each
            region — covering material specification, dimensional tolerances, mechanical
            testing, and structural design.
          </p>

          <div className="mt-[55px] overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-f13 leading-golden">
              <thead>
                <tr className="border-b-2 border-teal-border bg-teal-bg text-left">
                  <th className="px-[13px] py-[13px] font-bold text-t1">Region / Country</th>
                  <th className="px-[13px] py-[13px] font-bold text-t1">Standard</th>
                  <th className="px-[13px] py-[13px] font-bold text-t1">Scope</th>
                  <th className="px-[13px] py-[13px] font-bold text-t1">Key Requirements</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-default">
                {regionalStandards.map((entry, regionIdx) =>
                  entry.standards.map((std, stdIdx) => (
                    <tr
                      key={`${entry.region}-${std.code}`}
                      className={`${regionIdx % 2 === 0 ? "bg-white" : "bg-bg2"} align-top`}
                    >
                      {stdIdx === 0 && (
                        <td
                          className="px-[13px] py-[13px] font-bold text-t1"
                          rowSpan={entry.standards.length}
                        >
                          {entry.region}
                        </td>
                      )}
                      <td className="px-[13px] py-[13px] text-t1">{std.code}</td>
                      <td className="px-[13px] py-[13px] text-t2">{std.scope}</td>
                      <td className="px-[13px] py-[13px] text-t2">{std.requirements}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* §3 Comparison Matrix */}
          <div className="mt-[55px]">
            <h3 className="text-f19 font-bold text-t1">Key Differences Across Standards</h3>
            <div className="mt-[21px] overflow-x-auto">
              <table className="w-full min-w-[700px] border-collapse text-f13 leading-golden">
                <thead>
                  <tr className="border-b-2 border-teal-border bg-teal-bg text-left">
                    {comparisonHeaders.map((h) => (
                      <th key={h} className="px-[13px] py-[13px] font-bold text-t1">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-default">
                  {comparisonRows.map((row, i) => (
                    <tr key={row[0]} className={`${i % 2 === 0 ? "bg-white" : "bg-bg2"} align-top`}>
                      {row.map((cell, j) => (
                        <td
                          key={j}
                          className={`px-[13px] py-[13px] ${j === 0 ? "font-bold text-t1" : "text-t2"}`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-[34px] max-w-[640px] text-f15 leading-golden text-t2">
            F1 Composite manufactures and tests to all major international standards listed
            above. Contact us with your project location and application for a standards
            compliance review.
          </p>
        </div>
      </section>

      {/* ── §4 Testing Procedures ── */}
      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Testing Procedures</SectionTag>
          <h2 className="mt-[21px] text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.15] tracking-[-0.02em] text-t1">
            Mechanical and Physical Testing
          </h2>
          <p className="mt-[13px] max-w-[640px] text-f15 leading-golden text-t2">
            Our in-house testing laboratory is equipped to perform the full range of
            mechanical and physical tests required to characterize pultruded FRP profiles.
            All testing equipment is calibrated annually to traceable national standards.
          </p>

          <div className="mt-[55px] space-y-[34px]">
            {testingProcedures.map((test) => (
              <div key={test.title} className="rounded-[8px] border border-border-default bg-white p-[34px]">
                <h3 className="text-f19 font-bold text-t1">
                  {test.title} ({test.standard})
                </h3>
                <p className="mt-[13px] text-f15 leading-golden text-t2">{test.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── §5 QC Workflow ── */}
      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>QC Workflow</SectionTag>
          <h2 className="mt-[21px] text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.15] tracking-[-0.02em] text-t1">
            Quality Control From Receiving to Shipment
          </h2>
          <p className="mt-[13px] max-w-[640px] text-f15 leading-golden text-t2">
            Quality is not a final inspection — it is a continuous process that begins when
            raw materials arrive and ends only when the customer confirms receipt of
            conforming product.
          </p>

          <div className="mt-[34px] space-y-[21px] max-w-[640px]">
            {qcSteps.map((step, i) => (
              <div key={step.title} className="flex gap-[13px]">
                <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-teal-bg text-f13 font-bold text-teal-text">
                  {i + 1}
                </span>
                <div>
                  <h4 className="font-bold text-t1">{step.title}</h4>
                  <p className="mt-[5px] text-f15 leading-golden text-t2">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── §6 Cross-links and FAQ ── */}
      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Related Resources</SectionTag>
          <h2 className="mt-[21px] text-f24 font-bold text-t1">Explore Further</h2>
          <div className="mt-[21px] flex flex-wrap gap-[21px]">
            <LinkArrow href="/products">View Our Product Range</LinkArrow>
            <LinkArrow href="/about">About F1 Composite</LinkArrow>
            <LinkArrow href="/technology/pultrusion-process">Pultrusion Process Details</LinkArrow>
            <LinkArrow href="/technology/frp-vs-traditional-materials">FRP vs Traditional Materials</LinkArrow>
          </div>
          <FAQ items={faqItems} />
        </div>
      </section>

      <InnerCTA title="Need material test certificates or custom testing?" />
    </>
  );
}
