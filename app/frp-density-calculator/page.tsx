import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import FAQ from "@/components/ui/FAQ";
import JsonLd from "@/components/seo/JsonLd";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";
import DensityCalculator from "./DensityCalculator";

export const metadata: Metadata = buildPageMetadata({
  title: "FRP Density Calculator | Fiberglass Profile Weight & kg/m³",
  description:
    "Calculate FRP density from mat GSM, fabric layup, roving tex and section geometry. Estimate fiberglass profile weight and convert g/cm³, kg/m³ and lb/in³.",
  path: "/frp-density-calculator",
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
export default function DensityPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "FRP Density & Profile Weight Calculator",
          url: absoluteUrl("/frp-density-calculator"),
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Any",
          browserRequirements: "Requires JavaScript",
          isAccessibleForFree: true,
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          description:
            "Calculate pultruded fiberglass profile mass from material density and section dimensions, or infer density from a weighed sample.",
          provider: { "@id": absoluteUrl("/#organization") },
        }}
      />
      <PageHeader
        tag="Free material & weight tool"
        title="FRP Density Calculator"
        description="Calculate fiberglass density from mat and fabric layup, roving tex and your profile section, turn density into profile weight, or check a weighed sample. Calculate tubes, rods, angles, channels and beams in seconds."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "FRP Density Calculator" },
        ]}
        actions={{
          primary: { label: "Start calculating", href: "#calculator" },
          secondary: {
            label: "Browse FRP profiles",
            href: "/products/fiberglass-structural-shapes",
            variant: "secondary",
          },
        }}
      />
      <section className="bg-white py-8">
        <div className="mx-auto max-w-[1280px] px-5 md:px-[34px]">
          <div className="grid gap-6 md:grid-cols-[1.6fr_1fr]">
            <div>
              <h2 className="text-xl font-bold text-t1">
                What is FRP density?
              </h2>
              <p className="mt-3 leading-relaxed text-t2">
                FRP density is mass per unit of composite material volume. For
                pultruded fiberglass profiles,{" "}
                <strong>1.9 g/cm³ = 1,900 kg/m³ ≈ 0.0686 lb/in³</strong> is a
                useful starting assumption. Use the actual laminate value when
                available; resin, reinforcement and fillers affect the result.
              </p>
            </div>
            <div className="rounded-xl border border-border-default bg-bg2 p-5">
              <p className="text-sm font-semibold text-teal-text">
                Two quantities, two units
              </p>
              <p className="mt-2 text-t1">
                <strong>Density:</strong> kg/m³ — material property
              </p>
              <p className="mt-2 text-t1">
                <strong>Linear mass:</strong> kg/m — density × net area
              </p>
              <p className="mt-2 text-sm text-t2">
                An empty tube core contributes no material mass.
              </p>
            </div>
          </div>
        </div>
      </section>
      <DensityCalculator />
      <section className="bg-white py-14">
        <div className="mx-auto max-w-[1280px] px-5 md:px-[34px]">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-t1">
                How to calculate FRP density and weight
              </h2>
              <ol className="mt-5 list-decimal space-y-3 pl-5 leading-relaxed text-t2">
                <li>
                  Select the profile shape and enter outside dimensions and wall
                  thickness in millimeters.
                </li>
                <li>
                  In layup mode, drag the GSM, roving-end or void sliders to see
                  density and weight per meter change. Play the fill animation
                  to inspect the volume balance. For weight, enter material
                  density, piece length and quantity. For density, weigh one
                  bare sample and enter that sample’s length.
                </li>
                <li>
                  Read density in g/cm³, kg/m³ and lb/in³, plus net area and
                  profile mass. Send the results with your inquiry to confirm
                  the supply specification.
                </li>
              </ol>
              <div className="mt-6 rounded-xl bg-bg2 p-5 font-mono text-sm leading-loose text-t1">
                <p>Volume (m³) = area (mm²) × length (m) / 10⁶</p>
                <p>Density (kg/m³) = sample mass (kg) / volume (m³)</p>
                <p>Linear mass (kg/m) = area (mm²) × density (kg/m³) / 10⁶</p>
                <p>Total mass = linear mass × length × quantity</p>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-t1">
                Worked example: 50 × 50 × 5 mm tube
              </h2>
              <p className="mt-5 leading-relaxed text-t2">
                The outside area is 2,500 mm² and the hollow core is 40 × 40 =
                1,600 mm². Net material area is <strong>900 mm²</strong>. At
                1,900 kg/m³, the tube weighs <strong>1.71 kg/m</strong>.
              </p>
              <p className="mt-4 leading-relaxed text-t2">
                One 6 m piece weighs <strong>10.26 kg</strong>; ten pieces weigh{" "}
                <strong>102.6 kg</strong> before packing. Conversely, a bare
                sample weighing 10.26 kg over 6 m with that net area gives an
                inferred density of 1,900 kg/m³.
              </p>
              <p className="mt-4 leading-relaxed text-t2">
                These are ideal sharp-corner dimensions. For an actual extruded
                or pultruded section with radii, use the supplier’s CAD area or
                published mass per meter.
              </p>
              <Link
                className="mt-5 inline-block font-semibold text-teal-text underline"
                href="/products/fiberglass-structural-shapes/frp-square-tube"
              >
                Explore fiberglass square tubes →
              </Link>
            </div>
          </div>
          <div className="mt-14">
            <h2 className="text-2xl font-bold text-t1">
              From mat GSM and fabric layup to profile density
            </h2>
            <p className="mt-4 leading-relaxed text-t2">
              A section’s surface perimeter determines how much mat or fabric is
              needed to cover a path. Its net area determines how much material
              volume exists per meter. Their relationship lets the calculator
              connect the actual reinforcement schedule to laminate density.
            </p>
            <ol className="mt-4 list-decimal space-y-3 pl-5 text-t2">
              <li>
                Retained width = actual ply path × coverage fraction + total
                overlap allowance.
              </li>
              <li>
                Mat / fabric mass (g/m) = GSM × retained width (mm) / 1,000 ×
                layer count × feed factor.
              </li>
              <li>
                Roving mass (g/m) = tex × end count × feed factor / 1,000.
              </li>
              <li>
                Reinforcement occupied area (mm²) = Σ[mass (g/m) / constituent
                density (g/cm³)].
              </li>
              <li>
                Matrix area = net area × (1 − void fraction) − reinforcement
                area.
              </li>
              <li>
                Total mass (g/m) = reinforcement mass + matrix area × cured
                matrix density. Profile density (g/cm³) = total mass / net area.
              </li>
            </ol>
            <p className="mt-4 leading-relaxed text-t2">
              For a sharp-corner 50 × 50 × 5 mm tube, the outer perimeter is 200
              mm, inner perimeter 160 mm and net area 900 mm². One 450 g/m² mat
              on each surface contributes 90 + 72 g/m. An 80 mm-wide 600 g/m²
              local fabric strip adds 48 g/m; 400 ends of 2,400 tex roving add
              960 g/m. With all reinforcement at 2.54 g/cm³, a 1.20 g/cm³ cured
              matrix and zero voids, the result is <strong>1.6972 kg/m</strong>{" "}
              and <strong>1.8858 g/cm³</strong>. Surface paths are
              approximations in this example; actual ply centerlines refine the
              result.
            </p>
            <p className="mt-4 leading-relaxed text-t2">
              For axial feed, the consumption factor is 1. For a winding or
              draping process, use measured retained fabric area per axial
              meter; do not multiply a fabric’s GSM again merely because its
              fibers are oriented at ±45°. Enter different reinforcement paths
              as separate rows. This model balances volume; it does not predict
              compaction, wet-out or manufacturability.{" "}
              <a
                href="https://pultruders.com/pultrusion/4-raw-materials/"
                className="font-semibold text-teal-text underline"
              >
                EPTA’s raw-material guide
              </a>{" "}
              describes pultrusion rovings, mats and fabrics.
            </p>
          </div>
          <div className="mt-14">
            <h2 className="text-2xl font-bold text-t1">
              Calculate FRP density from the laminate formulation
            </h2>
            <p className="mt-4 leading-relaxed text-t2">
              Track roving, mat and fabric separately for your recipe, then add
              cured resin, fillers and any other retained constituent. Every
              percentage is relative to the whole cured, non-void mixture and
              must total 100%. A resin recipe expressed in parts per hundred
              resin (phr) must first be converted to whole-composite fractions.
            </p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl bg-bg2 p-5">
                <h3 className="font-bold text-t1">Weight fractions</h3>
                <p className="mt-3 font-mono text-t1">ρ₀ = 1 / Σ(wᵢ / ρᵢ)</p>
                <p className="mt-3 text-sm text-t2">
                  wᵢ is each constituent’s mass fraction (percentage ÷ 100). Do
                  not take an arithmetic average of densities weighted by mass.
                </p>
              </div>
              <div className="rounded-xl bg-bg2 p-5">
                <h3 className="font-bold text-t1">Solid volume fractions</h3>
                <p className="mt-3 font-mono text-t1">ρ₀ = Σ(vᵢ × ρᵢ)</p>
                <p className="mt-3 text-sm text-t2">
                  vᵢ is the fraction of non-void material volume. For void
                  fraction φ of final laminate volume, ρ = ρ₀ × (1 − φ),
                  neglecting gas mass.
                </p>
              </div>
            </div>
            <p className="mt-5 leading-relaxed text-t2">
              Example assumptions: 50 wt% roving + 10 wt% mat + 10 wt% fabric,
              all at 2.54 g/cm³, plus 30 wt% cured resin at 1.20 g/cm³. The
              void-free result is <strong>1.9026 g/cm³</strong>. At 2% void
              volume, it becomes <strong>1.8646 g/cm³</strong>. Rearranging the
              same glass mass among those three forms does not itself change the
              calculated density.
            </p>
            <p className="mt-4 leading-relaxed text-t2">
              Use supplier-specific constituent values for your glass chemistry
              and cured resin system. Formula accuracy is not measurement
              accuracy: resin cure, binders, filler loading, moisture and voids
              affect real production.{" "}
              <a
                className="font-semibold text-teal-text underline"
                href="https://compositeskn.org/KPC/A213"
              >
                CKN explains weight versus volume fractions
              </a>
              ; its{" "}
              <a
                className="font-semibold text-teal-text underline"
                href="https://compositeskn.org/KPC/M109"
              >
                reinforcement-content guide
              </a>{" "}
              describes composition and void measurement relationships.
            </p>
          </div>
          <h2 className="mt-14 text-2xl font-bold text-t1">
            Net cross-section area formulas
          </h2>
          <p className="mt-3 text-t2">
            All dimensions are in mm; area is in mm². B = width, H = height, D =
            outside diameter, t = uniform wall, tf = flange thickness, tw = web
            thickness. Angles, channels and beams use ideal square corners;
            channel and I-beam flanges have equal width and thickness.
          </p>
          <div className="mt-5 overflow-x-auto rounded-xl border border-border-default">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">
                Ideal FRP profile material area formulas
              </caption>
              <thead className="bg-bg2">
                <tr>
                  <th scope="col" className="p-4">
                    Section
                  </th>
                  <th scope="col" className="p-4">
                    Net area A
                  </th>
                </tr>
              </thead>
              <tbody>
                {formulas.map(([name, formula]) => (
                  <tr key={name} className="border-t border-border-default">
                    <th scope="row" className="p-4 font-medium text-t1">
                      {name}
                    </th>
                    <td className="p-4 font-mono text-t2">{formula}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-12 rounded-xl bg-bg2 p-6">
            <h2 className="text-xl font-bold text-t1">
              Density reference and limits
            </h2>
            <p className="mt-3 leading-relaxed text-t2">
              The calculator’s 1.9 g/cm³ default is an estimating assumption,
              not a certified F1 product value. As a published manufacturer
              example, Strongwell lists 1.72–1.94 g/cm³ for its Series 500/525
              and 625 structural shapes. Its plate ranges differ, illustrating
              why the exact product matters.{" "}
              <a
                className="font-semibold text-teal-text underline"
                href="https://www.strongwell.com/wp-content/uploads/2015/08/StrongwellSpecs-FRP-Structural-Shapes-and-Plate.pdf"
              >
                Read Strongwell’s material property table (PDF)
              </a>
              .
            </p>
            <p className="mt-3 leading-relaxed text-t2">
              This tool uses geometric volume, not a displacement test. It does
              not determine structural capacity, laminate grade or shipping
              gross weight. Use a supplier datasheet for final material density
              and include packaging separately.
            </p>
            <Link
              className="mt-4 inline-block font-semibold text-teal-text underline"
              href="/resources/blog/frp-density-fiberglass-profile-density-explained"
            >
              Read the full guide to fiberglass profile density →
            </Link>
          </div>
          <FAQ items={faqs} title="FRP density questions" />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              ["Compare profile specifications", "/resources/technical-data"],
              ["Screen beam deflection", "/frp-profile-calculator"],
              [
                "Estimate a profile price",
                "/fiberglass-pultruded-profile-price",
              ],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="rounded-xl border border-border-default p-5 font-semibold text-teal-text hover:bg-bg2"
              >
                {label} →
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
