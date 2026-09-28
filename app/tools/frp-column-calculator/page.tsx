import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import ToolSection from "@/components/layout/ToolSection";
import InnerCTA from "@/components/sections/InnerCTA";
import JsonLd from "@/components/seo/JsonLd";
import { FAQList } from "@/components/ui/FAQ";
import RelatedLinks from "@/components/sections/RelatedLinks";
import ColumnCalculator from "@/components/tools/ColumnCalculator";
import { COLUMN_PRODUCTS, END_CONDITIONS } from "@/lib/frpColumn";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";

const pagePath = "/tools/frp-column-calculator";
const pageDescription =
  "Screen pultruded FRP columns in axial compression: global buckling, flange, web and tube-wall local buckling and crushing, with the lightest catalog sizes.";

export const metadata: Metadata = buildPageMetadata({
  title: "FRP Column Buckling Calculator | Pultruded Sections",
  description: pageDescription,
  path: pagePath,
});

const faqs = [
  {
    question: "Why does an FRP column need more checks than a steel one?",
    answer:
      "Pultruded glass FRP is about a tenth as stiff as steel lengthwise, and its shear and crosswise stiffness are lower still. Columns therefore buckle long before the material crushes, and the thin flanges and webs of open sections can buckle locally at low stress. Wide-flange sections are the classic case: the flange outstands buckle before the column as a whole.",
  },
  {
    question: "Which equations does the calculator use?",
    answer:
      "Global buckling is the Euler load about each axis with the Engesser shear correction. Local buckling treats each wall as a long orthotropic plate: a flange outstand with one free edge buckles at G_LT (t/b)², and a web or tube wall held on both edges at (π²/6)(t/b)² [√(E_L E_T) + ν_LT E_T + 2G_LT]. The junctions are taken as simple supports, which ignores the restraint the flanges and webs give each other and so gives a lower bound. Crushing is the compressive strength times the area.",
  },
  {
    question: "Which resistance factors are applied?",
    answer:
      "Every mode takes the factor the FRP profile calculator uses for bending: φ = 0.65 with the time-effect factor λ on the ASCE/SEI 74-23 style screen, 1/1.5 on the CEN/TS 19101 style screen, or a factor of safety of 2.5. ASCE/SEI 74-23 is understood to allow higher factors for buckling, but they could not be confirmed against the published text for this tool, so the lower bending factor is used. That keeps the screen on the safe side; the project design applies the code factors.",
  },
  {
    question: "What is not covered?",
    answer:
      "Eccentric load and combined axial force and bending, flexural–torsional buckling of channels and angles, the interaction between local and global buckling where their loads are close, initial out-of-straightness, connections and bearing at the ends, and creep under sustained load. The result flags interaction and slenderness above 200. Channels and angles are left out because they twist as they buckle.",
  },
  {
    question: "Which material values should I use?",
    answer:
      "The presets use the EN 13706-3 minimums for E23 and E17 with an assumed shear modulus and compressive strength, because EN 13706 gives neither. Buckling scales with the moduli, so the supplier's certified E_L, E_T and G_LT matter more here than the strength. Ask for them with the quotation, and use the wet-service knockdown where the column stands in water.",
  },
];

export default function ColumnCalculatorPage() {
  const sizes = COLUMN_PRODUCTS.length;
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "FRP Column Buckling Calculator",
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
        title="FRP column buckling calculator"
        description="Check a pultruded I-beam, square or rectangular tube or round tube as a column: global buckling, local buckling of the flanges, web or walls, and crushing, with the lightest catalog sizes that pass."
        facts={[
          { label: "Catalog sections", value: String(sizes) },
          { label: "Limit states", value: "Global · local · crushing" },
          { label: "Screens", value: "ASCE · CEN/TS · ASD" },
        ]}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Tools", href: "/tools" }, { label: "Column buckling" }]}
      />

      <PageNav items={[{ id: "tool", label: "Calculator" }, { id: "method", label: "Method" }, { id: "faq", label: "FAQ" }]} />

      <ToolSection label="FRP column buckling calculator">
        <ColumnCalculator />
      </ToolSection>

      <PageSection
        id="method"
        title="How the screen works"
        intro="The load is concentric and the section uniform. Each limit state gives a nominal capacity; the lowest design capacity is compared with the factored load."
        tone="muted"
      >
        <div className="grid gap-[16px] md:grid-cols-3">
          <div className="rounded-card border border-border-default bg-white p-[20px]">
            <h3 className="text-f18 font-bold text-t1">Global buckling</h3>
            <p className="mt-[8px] text-f14 leading-golden text-t2">
              P<sub>E</sub> = π²E<sub>L</sub>I / (KL)² about each axis, reduced for shear: P = P<sub>E</sub> / (1 + P<sub>E</sub> / G<sub>LT</sub>A<sub>v</sub>).
              Weak-axis bracing shortens only the weak-axis length.
            </p>
          </div>
          <div className="rounded-card border border-border-default bg-white p-[20px]">
            <h3 className="text-f18 font-bold text-t1">Local buckling</h3>
            <p className="mt-[8px] text-f14 leading-golden text-t2">
              Flange outstand b = b<sub>f</sub>/2: σ = G<sub>LT</sub>(t/b)². Web or tube wall at its centerline width:
              σ = (π²/6)(t/b)²[√(E<sub>L</sub>E<sub>T</sub>) + ν<sub>LT</sub>E<sub>T</sub> + 2G<sub>LT</sub>], with ν<sub>LT</sub> = 0.3.
            </p>
          </div>
          <div className="rounded-card border border-border-default bg-white p-[20px]">
            <h3 className="text-f18 font-bold text-t1">Crushing and factors</h3>
            <p className="mt-[8px] text-f14 leading-golden text-t2">
              Compressive strength × area, with the environment knockdown. All modes take the bending resistance factor of
              the chosen screen, and the ASCE-style screen adds λ.
            </p>
          </div>
        </div>
        <div className="relative mt-[24px] overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[520px] border-collapse text-left text-f14">
            <caption className="px-[14px] pt-[12px] text-left text-f14 font-semibold text-t1">Effective length factors used</caption>
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">End conditions</th>
                <th scope="col" className="px-[14px] py-[8px] text-right font-semibold text-t1">K</th>
              </tr>
            </thead>
            <tbody>
              {END_CONDITIONS.map((item) => (
                <tr key={item.id} className="border-b border-border-default last:border-b-0">
                  <th scope="row" className="px-[14px] py-[8px] font-normal text-t2">{item.label}</th>
                  <td className="px-[14px] py-[8px] text-right tabular-nums text-t2">{item.K}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-[16px] max-w-[820px] text-f14 leading-golden text-t2">
          These are the recommended design values for ideal end conditions in the AISC 360 commentary, widely used for other
          materials too. Beams are checked in the{" "}
          <Link href="/frp-profile-calculator" className="font-semibold text-teal-text hover:underline">FRP profile calculator</Link>, whose{" "}
          <Link href="/frp-profile-calculator/methodology" className="font-semibold text-teal-text hover:underline">methodology page</Link>{" "}
          lists the design codes by market.
        </p>
      </PageSection>

      <PageSection id="faq" title="Frequently asked questions" tone="white">
        <FAQList items={faqs} />
      </PageSection>

      <RelatedLinks
        background="bg2"
        groups={[
          { title: "Other tools", links: [
            { href: "/tools", label: "All engineering tools" },
            { href: "/frp-profile-calculator", label: "FRP profile calculator (beams)" },
            { href: "/frp-span-tables", label: "FRP span tables" },
          ] },
          { title: "Sections", links: [
            { href: "/products/fiberglass-structural-shapes/frp-i-beam", label: "FRP I-beams" },
            { href: "/products/fiberglass-structural-shapes/frp-square-tube", label: "FRP square tubes" },
            { href: "/products/fiberglass-structural-shapes/frp-tube", label: "FRP round tubes" },
          ] },
          { title: "Design data", links: [
            { href: "/resources/technical-data", label: "FRP technical data" },
            { href: "/technology/pultruded-profile-performance", label: "Pultruded profile performance" },
            { href: "/frp-profile-calculator/methodology", label: "Calculator methodology and codes" },
          ] },
        ]}
      />
      <InnerCTA
        title="Send the column check with your RFQ"
        quoteHref="/contact?source=tool-column&inquiry_type=rfq"
        text="Send the section, length, end conditions and loads; engineering confirms the design values for the supplied profile."
      />
    </>
  );
}
