import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import ToolSection from "@/components/layout/ToolSection";
import RelatedLinks from "@/components/sections/RelatedLinks";
import InnerCTA from "@/components/sections/InnerCTA";
import JsonLd from "@/components/seo/JsonLd";
import { FAQList } from "@/components/ui/FAQ";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";
import DensityCalculator from "./DensityCalculator";

const pagePath = "/frp-density-calculator";
const pageDescription =
  "Calculate FRP density from mat GSM, fabric layup, roving tex and section geometry. Estimate fiberglass profile weight and convert g/cm³, kg/m³ and lb/in³.";

export const metadata: Metadata = buildPageMetadata({
  title: "FRP Density Calculator | Fiberglass Profile Weight & kg/m³",
  description: pageDescription,
  path: pagePath,
});

const faqs = [
  {
    question: "What is FRP profile weight per meter?",
    answer:
      "Weight per meter, also called linear mass, is the mass of one meter of profile in kg/m. It equals net area in mm² multiplied by density in kg/m³ and divided by 1,000,000. This is different from material density. The interactive sliders recalculate both; one 2,400 tex roving end contributes 2.4 g/m before its feed factor.",
  },
  {
    question: "How do mat GSM, perimeter and layer count determine density?",
    answer:
      "GSM multiplied by retained developed width in meters, layer count and feed consumption factor gives dry reinforcement grams per axial meter. Divide that mass by constituent density in g/cm³ to get its equivalent occupied area in mm². Add roving area, subtract this and void area from the net section, then fill the remainder with the cured matrix. Total grams per meter divided by net area in mm² gives density in g/cm³.",
  },
  {
    question: "Which perimeter should I use for each ply?",
    answer:
      "Use the actual developed ply path. Outer and inner surface perimeters are only thin-layer references. Interior plies, corner radii, local strips, internal webs and multi-cell shapes need their own measured or CAD-developed widths. Layers with different paths should be separate rows. Add retained overlap once and exclude discarded trim.",
  },
  {
    question:
      "Can I calculate density from glass roving, mat and fabric content?",
    answer:
      "Yes. Enter each reinforcement’s percentage and constituent density together with cured resin and fillers. For weight fractions, theoretical density is 1 / Σ(wi / ρi). For non-void volume fractions, it is Σ(vi × ρi). This is a formulation-based prediction; the actual profile may differ due to voids and production variation.",
  },
  {
    question: "Do glass mat and fabric have a different density from roving?",
    answer:
      "The same glass chemistry has the same solid density regardless of reinforcement form. Architecture affects packing and resin uptake, so it can change the finished laminate’s glass fraction and voids. Include binders or stitching separately, or use an effective constituent density. Do not enter the apparent bulk density of a loose roll of mat.",
  },
  {
    question: "What is the density of FRP in kg/m³?",
    answer:
      "For preliminary estimates of pultruded glass-fiber profiles, this tool uses 1,900 kg/m³ (1.9 g/cm³). A practical estimating range is 1,700–2,100 kg/m³, but FRP is a material family: reinforcement, resin, fillers and voids change density. Confirm the selected laminate’s datasheet value.",
  },
  {
    question: "Are FRP, GRP and fiberglass density the same?",
    answer:
      "GRP and GFRP refer to glass-fiber-reinforced polymer, commonly called fiberglass. FRP is broader and also includes carbon- or aramid-reinforced polymers. This calculator’s default is for pultruded glass-fiber profiles; it is not a universal density for every FRP product or for loose glass-wool insulation.",
  },
  {
    question: "Does a hollow FRP tube have a lower density?",
    answer:
      "A hollow tube uses less material, so it weighs less than a solid bar with the same outside dimensions and laminate. Its material density is unchanged. Divide mass by the actual material volume, excluding the central opening, when estimating material density.",
  },
  {
    question: "How do I calculate FRP weight per meter?",
    answer:
      "Multiply net section area in mm² by density in kg/m³ and divide by 1,000,000. For a 50 × 50 × 5 mm square tube, net area is 900 mm². At 1,900 kg/m³, mass is 1.71 kg/m; one 6 m length is 10.26 kg.",
  },
  {
    question: "Can density tell me the strength or glass content of a profile?",
    answer:
      "Density alone cannot establish strength, stiffness, glass content or an EN 13706 grade. Different combinations of resin, glass, fillers and voids can produce similar densities. Use the relevant mechanical and composition test data for the specified laminate.",
  },
  {
    question: "Is sample mass divided by volume an ASTM density test?",
    answer:
      "No. This tool estimates density from ideal section geometry and a measured sample mass. Corner radii, dimensional tolerances, coatings and measurement errors affect the result. Laboratory density methods use their specified procedures; request a test report when acceptance depends on measured material density.",
  },
];
const formulas = [
  ["Rectangular tube", "BH − (B − 2t)(H − 2t)"],
  ["Round tube", "π × t × (D − t)"],
  ["Solid round rod", "πD² / 4"],
  ["Flat bar / plate", "B × H"],
  ["L-angle", "t × (B + H − t)"],
  ["C-channel / I-beam", "2B × tf + (H − 2tf) × tw"],
];

const steps = [
  {
    title: "Describe the section",
    text: "Select the profile shape and enter the outside dimensions and wall thickness in millimeters, or the net area from CAD for a complex section.",
  },
  {
    title: "Enter the material",
    text: "In layup mode, drag the GSM, roving-end or void sliders and play the fill animation to inspect the volume balance. For weight, enter the material density, piece length and quantity. For density, weigh one bare sample and enter its length.",
  },
  {
    title: "Read density and weight",
    text: "Read density in g/cm³, kg/m³ and lb/in³, with the net area and profile mass. Send the results with your inquiry to confirm the supply specification.",
  },
];

const link = "font-semibold text-teal-text hover:underline";
const external = { target: "_blank", rel: "noopener noreferrer" } as const;

export default function DensityPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "FRP Density & Profile Weight Calculator",
          url: absoluteUrl(pagePath),
          description: pageDescription,
          applicationCategory: "EngineeringApplication",
          operatingSystem: "Any",
          isAccessibleForFree: true,
          publisher: { "@id": "https://www.f1composite.com/#organization" },
        }}
      />
      <PageHeader
        tag="Tools"
        title="FRP density calculator"
        description="FRP density is the mass per unit volume of the composite. For pultruded fiberglass profiles, 1.9 g/cm³ (1,900 kg/m³, about 0.0686 lb/in³) is a useful starting assumption. Work density out from the mat, fabric and roving layup or the formulation, turn it into profile weight, or check a weighed sample."
        facts={[
          { label: "Estimating density", value: "1.9 g/cm³" },
          { label: "Section types", value: "8" },
          { label: "Calculation modes", value: "4" },
        ]}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Tools", href: "/tools" }, { label: "Density and weight" }]}
      />

      <PageNav
        items={[
          { id: "tool", label: "Calculator" },
          { id: "method", label: "Method" },
          { id: "layup", label: "From the layup" },
          { id: "formulation", label: "From the formulation" },
          { id: "formulas", label: "Area formulas" },
          { id: "reference", label: "Reference values" },
          { id: "faq", label: "FAQ" },
        ]}
      />

      <ToolSection label="FRP density and weight calculator">
        <DensityCalculator />
      </ToolSection>

      <PageSection id="method" title="How to calculate FRP density and weight" tone="muted">
        <div className="max-w-[820px] rounded-card border-l-4 border-l-teal bg-white p-[20px]">
          <p className="text-f16 font-bold text-t1">Two quantities, two units</p>
          <p className="mt-[4px] text-f14 leading-golden text-t2">
            <strong className="text-t1">Density</strong> (kg/m³) is a property of the material.{" "}
            <strong className="text-t1">Linear mass</strong> (kg/m) is density multiplied by the net area of the section,
            so the empty core of a tube contributes no mass.
          </p>
        </div>
        <ol className="mt-[24px] grid gap-[12px] md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-card border border-border-default bg-white p-[20px]">
              <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Step {index + 1}</p>
              <h3 className="mt-[4px] text-f18 font-bold text-t1">{step.title}</h3>
              <p className="mt-[8px] text-f14 leading-golden text-t2">{step.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-[24px] grid gap-[24px] lg:grid-cols-2">
          <div className="rounded-card border border-border-default bg-white p-[20px]">
            <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Formulas</p>
            <div className="mt-[8px] space-y-[4px] font-mono text-f14 leading-golden text-t1">
              <p>Volume (m³) = area (mm²) × length (m) / 10⁶</p>
              <p>Density (kg/m³) = sample mass (kg) / volume (m³)</p>
              <p>Linear mass (kg/m) = area (mm²) × density (kg/m³) / 10⁶</p>
              <p>Total mass = linear mass × length × quantity</p>
            </div>
          </div>
          <div className="rounded-card border border-border-default bg-white p-[20px]">
            <h3 className="text-f18 font-bold text-t1">Worked example: 50 × 50 × 5 mm tube</h3>
            <p className="mt-[8px] text-f14 leading-golden text-t2">
              The outside area is 2,500 mm² and the hollow core is 40 × 40 = 1,600 mm², so the net material area is{" "}
              <strong className="text-t1">900 mm²</strong>. At 1,900 kg/m³ the tube weighs <strong className="text-t1">1.71 kg/m</strong>.
              One 6 m piece weighs <strong className="text-t1">10.26 kg</strong>, and ten pieces weigh{" "}
              <strong className="text-t1">102.6 kg</strong> before packing. Working backwards, a bare sample weighing 10.26 kg over 6 m
              with that net area gives an inferred density of 1,900 kg/m³.
            </p>
            <p className="mt-[8px] text-f14 leading-golden text-t2">
              These are ideal sharp-corner dimensions. For a pultruded section with radii, use the supplier&rsquo;s CAD area or
              published mass per meter.{" "}
              <Link href="/products/fiberglass-structural-shapes/frp-square-tube" className={link}>
                FRP square tubes
              </Link>
            </p>
          </div>
        </div>
      </PageSection>

      <PageSection
        id="layup"
        title="From mat GSM and fabric layup to profile density"
        intro="A section's surface perimeter sets how much mat or fabric covers a path, and its net area sets how much material there is per meter. Together they connect the reinforcement schedule to the laminate density."
        tone="white"
      >
        <ol className="max-w-[820px] list-decimal space-y-[8px] pl-[20px] text-f16 leading-golden text-t2">
          <li>Retained width = actual ply path × coverage fraction + total overlap allowance.</li>
          <li>Mat or fabric mass (g/m) = GSM × retained width (mm) / 1,000 × layer count × feed factor.</li>
          <li>Roving mass (g/m) = tex × end count × feed factor / 1,000.</li>
          <li>Reinforcement occupied area (mm²) = Σ[mass (g/m) / constituent density (g/cm³)].</li>
          <li>Matrix area = net area × (1 − void fraction) − reinforcement area.</li>
          <li>
            Total mass (g/m) = reinforcement mass + matrix area × cured matrix density. Profile density (g/cm³) = total mass / net
            area.
          </li>
        </ol>
        <p className="mt-[16px] max-w-[820px] text-f16 leading-golden text-t2">
          For a sharp-corner 50 × 50 × 5 mm tube, the outer perimeter is 200 mm, the inner perimeter 160 mm and the net area
          900 mm². One 450 g/m² mat on each surface contributes 90 + 72 g/m. An 80 mm-wide 600 g/m² local fabric strip adds
          48 g/m, and 400 ends of 2,400 tex roving add 960 g/m. With all reinforcement at 2.54 g/cm³, a 1.20 g/cm³ cured matrix
          and no voids, the result is <strong className="text-t1">1.6972 kg/m</strong> and{" "}
          <strong className="text-t1">1.8858 g/cm³</strong>. Surface paths are approximations here; actual ply centerlines refine
          the result.
        </p>
        <p className="mt-[16px] max-w-[820px] text-f16 leading-golden text-t2">
          For axial feed the consumption factor is 1. For a winding or draping process, use the measured retained fabric area per
          axial meter; do not multiply a fabric&rsquo;s GSM again because its fibers run at ±45°. Enter different reinforcement
          paths as separate rows. The model balances volume; it does not predict compaction, wet-out or manufacturability.{" "}
          <a href="https://pultruders.com/pultrusion/4-raw-materials/" className={link} {...external}>
            EPTA&rsquo;s raw-material guide
          </a>{" "}
          describes pultrusion rovings, mats and fabrics.
        </p>
      </PageSection>

      <PageSection
        id="formulation"
        title="Calculate FRP density from the laminate formulation"
        intro="Track roving, mat and fabric separately, then add the cured resin, fillers and any other retained constituent. Every percentage is of the whole cured, non-void mixture and must total 100%; a resin recipe in parts per hundred resin (phr) has to be converted to whole-composite fractions first."
        tone="muted"
      >
        <div className="grid gap-[12px] md:grid-cols-2">
          <div className="rounded-card border border-border-default bg-white p-[20px]">
            <h3 className="text-f18 font-bold text-t1">Weight fractions</h3>
            <p className="mt-[8px] font-mono text-f16 text-t1">ρ₀ = 1 / Σ(wᵢ / ρᵢ)</p>
            <p className="mt-[8px] text-f14 leading-golden text-t2">
              wᵢ is each constituent&rsquo;s mass fraction (percentage ÷ 100). Do not take an average of densities weighted by
              mass.
            </p>
          </div>
          <div className="rounded-card border border-border-default bg-white p-[20px]">
            <h3 className="text-f18 font-bold text-t1">Solid volume fractions</h3>
            <p className="mt-[8px] font-mono text-f16 text-t1">ρ₀ = Σ(vᵢ × ρᵢ)</p>
            <p className="mt-[8px] text-f14 leading-golden text-t2">
              vᵢ is the fraction of non-void material volume. For a void fraction φ of the final laminate volume,
              ρ = ρ₀ × (1 − φ), neglecting the mass of the gas.
            </p>
          </div>
        </div>
        <p className="mt-[20px] max-w-[820px] text-f16 leading-golden text-t2">
          Example: 50 wt% roving, 10 wt% mat and 10 wt% fabric, all at 2.54 g/cm³, plus 30 wt% cured resin at 1.20 g/cm³. The
          void-free result is <strong className="text-t1">1.9026 g/cm³</strong>; at 2% void volume it becomes{" "}
          <strong className="text-t1">1.8646 g/cm³</strong>. Moving the same glass mass between the three forms does not change
          the calculated density.
        </p>
        <p className="mt-[16px] max-w-[820px] text-f16 leading-golden text-t2">
          Use supplier values for your glass chemistry and cured resin system. Formula accuracy is not measurement accuracy:
          resin cure, binders, filler loading, moisture and voids all affect real production.{" "}
          <a href="https://compositeskn.org/KPC/A213" className={link} {...external}>
            CKN explains weight versus volume fractions
          </a>
          , and its{" "}
          <a href="https://compositeskn.org/KPC/M109" className={link} {...external}>
            reinforcement-content guide
          </a>{" "}
          describes how composition and voids are measured.
        </p>
      </PageSection>

      <PageSection
        id="formulas"
        title="Net cross-section area formulas"
        intro="Dimensions in mm, area in mm². B = width, H = height, D = outside diameter, t = uniform wall, tf = flange thickness, tw = web thickness. Angles, channels and beams use ideal square corners; channel and I-beam flanges have equal width and thickness."
        tone="white"
      >
        <div className="relative max-w-[820px] overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full border-collapse text-left text-f14">
            <caption className="sr-only">Ideal FRP profile net area formulas</caption>
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Section</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Net area A</th>
              </tr>
            </thead>
            <tbody>
              {formulas.map(([name, formula]) => (
                <tr key={name} className="border-b border-border-default align-top last:border-b-0">
                  <th scope="row" className="px-[14px] py-[10px] font-semibold text-t1">{name}</th>
                  <td className="px-[14px] py-[10px] font-mono text-t2">{formula}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>

      <PageSection id="reference" title="Density reference and limits" tone="muted">
        <div className="max-w-[820px] space-y-[16px] text-f16 leading-golden text-t2">
          <p>
            The calculator&rsquo;s 1.9 g/cm³ default is an estimating assumption, not a certified F1 product value. As a published
            manufacturer example, Strongwell lists 1.72–1.94 g/cm³ for its Series 500/525 and 625 structural shapes, and its plate
            ranges differ, which is why the exact product matters.{" "}
            <a
              href="https://www.strongwell.com/wp-content/uploads/2015/08/StrongwellSpecs-FRP-Structural-Shapes-and-Plate.pdf"
              className={link}
              {...external}
            >
              Strongwell&rsquo;s material property table (PDF)
            </a>
          </p>
          <p>
            The tool uses geometric volume, not a displacement test. It does not determine structural capacity, laminate grade or
            shipping weight. Use the supplier&rsquo;s datasheet for the final material density and add packaging separately.
          </p>
          <p>
            <Link href="/resources/blog/frp-density-fiberglass-profile-density-explained" className={link}>
              Read the full guide to fiberglass profile density
            </Link>
          </p>
        </div>
      </PageSection>

      <PageSection id="faq" title="Frequently asked questions" tone="white">
        <FAQList items={faqs} />
      </PageSection>

      <RelatedLinks
        background="bg2"
        groups={[
          { title: "Other tools", links: [
            { href: "/tools", label: "All engineering tools" },
            { href: "/frp-profile-calculator", label: "FRP profile calculator" },
            { href: "/fiberglass-pultruded-profile-price", label: "Profile price estimator" },
          ] },
          { title: "Profiles", links: [
            { href: "/products/fiberglass-structural-shapes", label: "Standard FRP structural profiles" },
            { href: "/products/fiberglass-structural-shapes/frp-square-tube", label: "FRP square tubes" },
            { href: "/datasheets", label: "Profile datasheets" },
          ] },
          { title: "Material data", links: [
            { href: "/resources/technical-data", label: "FRP technical data" },
            { href: "/resources/blog/frp-density-fiberglass-profile-density-explained", label: "FRP density explained" },
            { href: "/technology/pultruded-profile-performance", label: "Pultruded profile performance" },
          ] },
        ]}
      />
      <InnerCTA
        title="Send the section and density with your RFQ"
        quoteHref="/contact?source=tool-density&inquiry_type=rfq"
        text="Send the section drawing or dimensions, the laminate or resin requirement, lengths and quantities."
      />
    </>
  );
}
