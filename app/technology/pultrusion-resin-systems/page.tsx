import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import RelatedLinks from "@/components/sections/RelatedLinks";
import InnerCTA from "@/components/sections/InnerCTA";
import AskAICard from "@/components/ai/AskAICard";
import { prefillForProduct } from "@/lib/aiPrefill";
import JsonLd from "@/components/seo/JsonLd";
import FAQ from "@/components/ui/FAQ";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
import ResinSelector from "./ResinSelector";
import LaminateMicrograph from "./LaminateMicrograph";
import { MatrixFormationFigure, LoadTransferFigure } from "./MatrixFigures";

// publishedAt = original launch of this guide. Bump updatedAt only with real
// content changes — it is a freshness signal tied to actual edits.
const publishedAt = "2026-07-08";
const updatedAt = "2026-07-08";

export const metadata: Metadata = buildPageMetadata({
  title: "Pultrusion Resin Systems: Polyester vs Vinyl Ester vs PU",
  description:
    "Compare polyester, vinyl ester, PU, epoxy & phenolic resin systems for pultruded FRP profiles — HDT, corrosion, fire, cost — interactive selection matrix.",
  path: "/technology/pultrusion-resin-systems",
});

const resinFaqs = [
  {
    question: "What resin is used in pultruded FRP profiles?",
    answer:
      "Five thermoset families cover almost all pultrusion: isophthalic polyester (the general-purpose default), vinyl ester (chemical and marine duty), polyurethane (high transverse strength for windows and thin-wall profiles), epoxy (highest mechanical and temperature performance), and phenolic (fire-critical applications). The reinforcement is usually E-glass or E-CR glass; the resin matrix is what differentiates corrosion, fire, and temperature behavior between two otherwise identical profiles.",
  },
  {
    question: "What is the difference between polyester and vinyl ester in pultrusion?",
    answer:
      "Vinyl ester chemistry combines an epoxy backbone with polyester-style processing. Compared with isophthalic polyester it delivers substantially better resistance to acids, chlorides, and caustics, higher heat-distortion temperature (typically 100–150 °C vs 80–110 °C), and better toughness — at roughly 1.5–2× the resin cost. The practical rule: polyester for general atmospheric service, vinyl ester the moment the environment involves chemical exposure, immersion, or marine splash zones.",
  },
  {
    question: "Does the resin matrix affect the strength of an FRP profile?",
    answer:
      "Axial stiffness and tensile strength are dominated by the glass fibers, so switching resin barely moves the datasheet modulus. But the matrix controls everything that happens off-axis and over time: transverse strength, interlaminar shear, impact toughness, fatigue behavior, temperature limit, and every durability property. Two profiles with identical EN 13706 E23 stiffness can have completely different service lives if one has the wrong matrix for the environment.",
  },
  {
    question: "Which resin system should I specify for corrosive environments?",
    answer:
      "Vinyl ester is the default for chemical plants, wastewater treatment, cooling towers, and marine splash zones. For a specific chemical, concentration, and temperature, check the resin supplier corrosion-resistance guide — resistance is chemistry-specific, not generic. A matrix-rich surface veil layer (typically a C-glass or synthetic veil) should always accompany the resin choice, because the corrosion barrier is the veil-plus-resin skin, not the structural core.",
  },
  {
    question: "Which resin is best for fire performance?",
    answer:
      "Phenolic resin is inherently fire-resistant with low smoke and toxicity, which is why it is specified for rail interiors (EN 45545-2), tunnels, and offshore platforms. For building applications, ATH-filled polyester and vinyl ester grades reach ASTM E84 Class A flame spread (25 or less) at lower cost. The specification mistake to avoid: fire performance belongs to the specific FR formulation, not the resin family — always require the test report for the actual formulation being quoted.",
  },
  {
    question: "Can I choose the resin system per order, or is it fixed per product?",
    answer:
      "Resin systems are selected per production run — the same die can run polyester one week and vinyl ester the next. FengDu pultrudes polyester, vinyl ester, and polyurethane systems in serial production and epoxy or phenolic for qualified projects; F1 Composite handles international specification and supply. State the service environment (chemicals, temperature, fire code, UV) in your RFQ and the resin system becomes part of the quoted specification, documented on the mill certificate.",
  },
];

export default function PultrusionResinSystemsPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: "Pultrusion Resin Systems: Choosing the Right Matrix",
          description:
            "Engineering guide to the five thermoset resin systems used in FRP pultrusion — polyester, vinyl ester, polyurethane, epoxy, phenolic — with typical property ranges and a selection matrix.",
          url: absoluteUrl("/technology/pultrusion-resin-systems"),
          datePublished: publishedAt,
          dateModified: updatedAt,
          author: {
            "@type": "Person",
            name: "Haifeng Gong",
            url: absoluteUrl("/about/authors/haifeng-gong"),
            jobTitle: "R&D Lead — composite materials and pultrusion process development",
          },
          publisher: { "@id": "https://www.f1composite.com/#organization" },
          about: [
            { "@type": "Thing", name: "Resin matrix" },
            { "@type": "Thing", name: "Pultrusion" },
            { "@type": "Thing", name: "Fiber-reinforced polymer" },
          ],
          mentions: ["EN 13706", "ASTM E84", "EN 45545-2", "vinyl ester", "polyurethane pultrusion"],
        }}
      />
      <PageHeader
        tag="Materials Science"
        title="Pultrusion Resin Systems: Choosing the Right Matrix"
        description="The glass fiber gives a pultruded FRP profile its stiffness — the resin matrix decides whether it survives the chemicals, the heat, the fire code, and the decades. This guide compares the five thermoset systems we pultrude and shows how to match a matrix to your project."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Technology", href: "/technology" },
          { label: "Resin Systems" },
        ]}
      />

      {/* GEO answer box — direct definition before anything interactive */}
      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <h2 className="text-f24 font-bold text-t1 md:text-f31">
            What is the resin matrix in pultruded FRP?
          </h2>
          <p className="mt-[21px] text-f15 leading-golden text-t2">
            The resin matrix is the cured thermoset polymer that surrounds every glass
            fiber in a pultruded profile — typically 30–45 % of the composite by volume.
            The fibers carry the axial load; the matrix binds them, transfers load
            between them in shear, stops fiber buckling under compression, and forms
            the barrier between the reinforcement and the environment. In practice this
            means the matrix — not the glass — determines a profile&apos;s corrosion
            resistance, temperature limit, fire behavior, and service life.
          </p>
          <div className="mt-[34px] grid gap-[13px] sm:grid-cols-3">
            <div className="rounded-[8px] border border-border-default bg-bg2 p-[21px]">
              <p className="text-f13 font-bold uppercase tracking-wide text-teal-text">
                Fiber decides
              </p>
              <p className="mt-[8px] text-f15 leading-golden text-t2">
                Axial stiffness and tensile strength — the numbers on the datasheet
                that barely change when you switch resin.
              </p>
            </div>
            <div className="rounded-[8px] border border-border-default bg-bg2 p-[21px]">
              <p className="text-f13 font-bold uppercase tracking-wide text-teal-text">
                Matrix decides
              </p>
              <p className="mt-[8px] text-f15 leading-golden text-t2">
                Corrosion, fire, temperature limit, transverse strength, impact
                toughness, fatigue — everything that determines service life.
              </p>
            </div>
            <div className="rounded-[8px] border border-border-default bg-bg2 p-[21px]">
              <p className="text-f13 font-bold uppercase tracking-wide text-teal-text">
                You decide
              </p>
              <p className="mt-[8px] text-f15 leading-golden text-t2">
                The resin system is selected per production run — so it belongs in
                your RFQ, not in the fine print of the quote you accept.
              </p>
            </div>
          </div>

          <div className="mt-[55px] grid gap-[21px] lg:grid-cols-2">
            <MatrixFormationFigure />
            <LoadTransferFigure />
          </div>
        </div>
      </section>

      {/* Inside the laminate — interactive micrograph */}
      <section className="bg-bg2 py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <h2 className="text-f24 font-bold text-t1 md:text-f31">
            Inside the laminate: fiber, mat, and matrix
          </h2>
          <p className="mt-[13px] text-f15 leading-golden text-t2">
            A pultruded section is not a uniform material — it is an engineered stack.
            Unidirectional rovings in the core carry axial load, continuous filament
            mat (CFM) layers add transverse strength, and a matrix-rich surface veil
            forms the corrosion and UV barrier. Drag the slider to see how fiber
            volume fraction trades stiffness against the matrix content that binds
            and protects the laminate.
          </p>
          <div className="mt-[21px]">
            <LaminateMicrograph />
          </div>
        </div>
      </section>

      <ResinSelector />

      {/* Published-range comparison table — the crawlable data layer */}
      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <h2 className="text-f24 font-bold text-t1 md:text-f31">
            The five resin systems, side by side
          </h2>
          <p className="mt-[13px] text-f15 leading-golden text-t2">
            Typical published ranges for pultrusion-grade formulations. Individual
            formulations vary — the values on a project datasheet and resin TDS govern;
            use this table to shortlist, not to certify.
          </p>
          <div className="mt-[21px] overflow-x-auto">
            <table className="w-full min-w-[880px] border-collapse text-f13">
              <thead>
                <tr className="border-b-2 border-t1 text-left">
                  <th className="py-[13px] pr-[13px] font-bold text-t1">Resin system</th>
                  <th className="py-[13px] pr-[13px] font-bold text-t1">HDT / Tg (typical)</th>
                  <th className="py-[13px] pr-[13px] font-bold text-t1">Signature property</th>
                  <th className="py-[13px] pr-[13px] font-bold text-t1">Chemical duty</th>
                  <th className="py-[13px] pr-[13px] font-bold text-t1">Fire route</th>
                  <th className="py-[13px] font-bold text-t1">Relative cost</th>
                </tr>
              </thead>
              <tbody className="text-t2">
                <tr className="border-b border-border-default align-top">
                  <td className="py-[13px] pr-[13px] font-semibold text-t1">
                    Isophthalic polyester
                  </td>
                  <td className="py-[13px] pr-[13px]">HDT 80–110 °C</td>
                  <td className="py-[13px] pr-[13px]">
                    Fastest line speeds, most economical
                  </td>
                  <td className="py-[13px] pr-[13px]">
                    General atmospheric, mild chemical
                  </td>
                  <td className="py-[13px] pr-[13px]">
                    ATH-filled grades → ASTM E84 Class A
                  </td>
                  <td className="py-[13px]">$ (baseline)</td>
                </tr>
                <tr className="border-b border-border-default align-top">
                  <td className="py-[13px] pr-[13px] font-semibold text-t1">Vinyl ester</td>
                  <td className="py-[13px] pr-[13px]">HDT 100–150 °C</td>
                  <td className="py-[13px] pr-[13px]">
                    Chemical resistance, toughness, hydrolysis resistance
                  </td>
                  <td className="py-[13px] pr-[13px]">
                    Acids, chlorides, caustics, immersion, marine
                  </td>
                  <td className="py-[13px] pr-[13px]">
                    Brominated / ATH grades, Class A available
                  </td>
                  <td className="py-[13px]">$$ (~1.5–2×)</td>
                </tr>
                <tr className="border-b border-border-default align-top">
                  <td className="py-[13px] pr-[13px] font-semibold text-t1">
                    Polyurethane (PU)
                  </td>
                  <td className="py-[13px] pr-[13px]">HDT 80–110 °C</td>
                  <td className="py-[13px] pr-[13px]">
                    Transverse strength and impact toughness — allows thinner walls,
                    better screw retention
                  </td>
                  <td className="py-[13px] pr-[13px]">General duty</td>
                  <td className="py-[13px] pr-[13px]">FR grades emerging — verify per project</td>
                  <td className="py-[13px]">$$ (closed injection)</td>
                </tr>
                <tr className="border-b border-border-default align-top">
                  <td className="py-[13px] pr-[13px] font-semibold text-t1">Epoxy</td>
                  <td className="py-[13px] pr-[13px]">Tg 120–180 °C</td>
                  <td className="py-[13px] pr-[13px]">
                    Highest mechanicals, fatigue life, low cure shrinkage
                  </td>
                  <td className="py-[13px] pr-[13px]">Very good, solvent-resistant</td>
                  <td className="py-[13px] pr-[13px]">Add-on FR systems only</td>
                  <td className="py-[13px]">$$$ (slow line speed)</td>
                </tr>
                <tr className="border-b border-border-default align-top">
                  <td className="py-[13px] pr-[13px] font-semibold text-t1">Phenolic</td>
                  <td className="py-[13px] pr-[13px]">Highest service temperature</td>
                  <td className="py-[13px] pr-[13px]">
                    Inherent fire resistance, low smoke and toxicity
                  </td>
                  <td className="py-[13px] pr-[13px]">Good general duty</td>
                  <td className="py-[13px] pr-[13px]">
                    Inherent — specified for EN 45545-2 rail, tunnels, offshore
                  </td>
                  <td className="py-[13px]">$$ (wetter, slower process)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-[13px] text-f12 leading-golden text-t2">
            Ranges compiled from resin supplier technical datasheets and industry
            references for pultrusion-grade systems. Formulation-specific values
            (including all fire test results) must come from the test report of the
            actual formulation quoted.
          </p>
        </div>
      </section>

      {/* Decision guide */}
      <section className="bg-bg2 py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <h2 className="text-f24 font-bold text-t1 md:text-f31">
            How to choose: let the environment pick the resin
          </h2>
          <p className="mt-[13px] text-f15 leading-golden text-t2">
            Resin selection is environment-first, not price-first. Work through the
            service conditions in this order — the first condition that applies
            usually decides the matrix.
          </p>
          <div className="mt-[34px] grid gap-[21px] lg:grid-cols-2">
            <ol className="space-y-[13px] text-f15 leading-golden text-t2">
              <li className="rounded-[8px] border border-border-default bg-white p-[21px]">
                <strong className="text-t1">1. Fire code governs?</strong> Rail
                interiors, tunnels, offshore: phenolic. Buildings needing ASTM E84
                Class A: FR-grade polyester or vinyl ester — and require the test
                report for the exact formulation.
              </li>
              <li className="rounded-[8px] border border-border-default bg-white p-[21px]">
                <strong className="text-t1">2. Chemical or marine exposure?</strong>{" "}
                Vinyl ester, checked against the resin supplier corrosion guide for
                your specific chemical, concentration, and temperature. Pair it with
                a surface veil — the barrier is the veil-plus-resin skin.
              </li>
              <li className="rounded-[8px] border border-border-default bg-white p-[21px]">
                <strong className="text-t1">3. Sustained heat or high-cycle fatigue?</strong>{" "}
                Epoxy (Tg 120–180 °C) or high-HDT vinyl ester. Check the load-bearing
                temperature, not just the exposure temperature — modulus drops as the
                matrix approaches its Tg.
              </li>
              <li className="rounded-[8px] border border-border-default bg-white p-[21px]">
                <strong className="text-t1">4. Thin walls, fasteners, or impact?</strong>{" "}
                Polyurethane. Its transverse strength allows wall reductions that
                polyester cannot match — the reason modern fiberglass window lineals
                are moving to PU pultrusion.
              </li>
              <li className="rounded-[8px] border border-border-default bg-white p-[21px]">
                <strong className="text-t1">5. None of the above?</strong>{" "}
                Isophthalic polyester — the cost-efficient default for general
                structural service, and the baseline every alternative should be
                justified against.
              </li>
            </ol>
            <div>
              <h3 className="text-f19 font-bold text-t1">
                Specification mistakes we see in RFQs
              </h3>
              <ul className="mt-[13px] space-y-[13px] text-f15 leading-golden text-t2">
                <li>
                  <strong className="text-t1">Specifying &quot;fiberglass&quot; with no resin system.</strong>{" "}
                  Two quotes for the same drawing can differ 30 % because one prices
                  orthophthalic polyester and the other vinyl ester. Name the resin
                  family in the RFQ and quotes become comparable.
                </li>
                <li>
                  <strong className="text-t1">Assuming fire performance is inherent.</strong>{" "}
                  A standard polyester profile is combustible. Class A flame spread
                  comes from a specific FR formulation — specify the test standard
                  and require the report.
                </li>
                <li>
                  <strong className="text-t1">Confusing UV weathering with corrosion.</strong>{" "}
                  Surface fiber bloom under UV is managed by veil, pigmentation, and
                  coating — not primarily by resin family. Chemical attack is the
                  resin question.
                </li>
                <li>
                  <strong className="text-t1">Over-specifying epoxy.</strong> If the
                  duty is chemical resistance below 100 °C, vinyl ester typically
                  delivers the service life at lower cost and faster production.
                </li>
                <li>
                  <strong className="text-t1">Ignoring the temperature-modulus link.</strong>{" "}
                  Datasheet properties are room-temperature values. For service above
                  60 °C, ask for retained-property data at temperature.
                </li>
              </ul>
            </div>
          </div>

          <FAQ items={resinFaqs} />
        </div>
      </section>

      <RelatedLinks
        groups={[
          {
            title: "Process & quality",
            links: [
              { href: "/technology/pultrusion-process", label: "The pultrusion process, stage by stage" },
              { href: "/technology/quality-testing", label: "Quality testing and mill certificates" },
              { href: "/technology/polyurethane-pultrusion-windows", label: "Polyurethane pultrusion for windows" },
            ],
          },
          {
            title: "Material comparisons",
            links: [
              { href: "/technology/frp-vs-traditional-materials", label: "FRP vs steel and aluminum" },
              { href: "/technology/pultrusion-vs-extrusion-filament-winding", label: "Pultrusion vs extrusion vs filament winding" },
              { href: "/what-is-frp", label: "What is FRP? The complete guide" },
            ],
          },
          {
            title: "Products by resin duty",
            links: [
              { href: "/products/fiberglass-structural-shapes", label: "Standard structural profiles" },
              { href: "/products/molded-frp-grating", label: "Molded grating (vinyl ester duty)" },
              { href: "/products/frp-gratings", label: "Pultruded FRP grating" },
              { href: "/products/frp-deck-panels", label: "Structural FRP deck panels" },
              { href: "/products/frp-window-frames", label: "Fenestration systems (PU / polyester)" },
            ],
          },
        ]}
        background="white"
      />

      <AskAICard
        title="Not sure which resin system your project needs?"
        description="Open the FRP Engineering Advisor with your service environment — chemicals, temperature, fire code, UV — and it will recommend a resin system, profile family, and the data to put in your RFQ."
        prefill={prefillForProduct({
          name: "Pultrusion Resin Systems guide",
          path: "/technology/pultrusion-resin-systems",
          question:
            "help me choose a resin system — ask me about my service environment (chemicals, temperature, fire code, UV) and recommend polyester, vinyl ester, PU, epoxy, or phenolic with the reasoning",
        })}
      />

      <InnerCTA title="Send us the service environment — we will quote the right resin system, documented on the mill certificate." />
    </>
  );
}
