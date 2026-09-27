import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import CoverCard from "@/components/ui/CoverCard";
import InnerCTA from "@/components/sections/InnerCTA";
import RelatedLinks from "@/components/sections/RelatedLinks";
import { FAQList } from "@/components/ui/FAQ";
import JsonLd from "@/components/seo/JsonLd";
import { productCovers } from "@/lib/covers";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
import { getSeoQueryTarget } from "@/content/data/seoQueryTargets";

const pagePath = "/technology/frp-vs-steel-gratings";
const seoTarget = getSeoQueryTarget(pagePath);
const pageTitle = seoTarget.title;
const pageDescription = seoTarget.description;
const publishedAt = "2026-04-15";
const updatedAt = "2026-09-25";
const referencedStandards = ["ASTM E2979", "ASTM F3125", "HSE UK Slip Resistance", "OSHA 1910.29", "IBC 1607.8"];

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  image: `${pagePath}/opengraph-image`,
});

interface CompRow {
  property: string;
  unit?: string;
  frp: string;
  steel: string;
  frpBetter?: boolean;
}

const comparisonData: CompRow[] = [
  { property: "Density (installed)", unit: "kg/m²", frp: "14 – 22 (38mm molded)", steel: "34 – 48 (25mm bar)", frpBetter: true },
  { property: "Load Capacity (30mm deep)", unit: "kN/m² UDL", frp: "≥ 500", steel: "≥ 500" },
  { property: "Concentrated Load (wheel)", unit: "kN", frp: "45 – 90 (pultruded)", steel: "90 – 180" },
  { property: "Corrosion Resistance", frp: "Resists acids, alkalis, chlorides and saltwater (resin-dependent)", steel: "Coating-dependent; HDG fails 10–15 yr in aggressive environments", frpBetter: true },
  { property: "Electrical Conductivity", frp: "Non-conductive (insulator)", steel: "Fully conductive (fault current path)", frpBetter: true },
  { property: "Slip Resistance (wet)", unit: "PTV", frp: "≥ 55 (grit top)", steel: "25 – 40 (serrated)", frpBetter: true },
  { property: "Fire Rating", frp: "Class 1 flame spread (FR resin)", steel: "Non-combustible" },
  { property: "Installation Tools", frp: "Standard hand tools, no hot work permit", steel: "Cutting torch, welding, grinding", frpBetter: true },
  { property: "Recoating (coastal / industrial)", frp: "None; life depends on resin and UV exposure", steel: "Typically every 10 – 15 years", frpBetter: true },
  { property: "Repaint / Re-galvanize Cost", frp: "None", steel: "$15 – $30 per m² every 10 yr", frpBetter: true },
  { property: "Spark Risk", frp: "No impact sparks; assess static risk in ATEX zones", steel: "Sparks on impact", frpBetter: true },
  { property: "Magnetic Interference", frp: "Non-magnetic", steel: "Ferromagnetic", frpBetter: true },
  { property: "Thermal Conductivity", unit: "W/m·K", frp: "0.3 – 0.5", steel: "50", frpBetter: true },
];

const faqs = [
  {
    question: "Can FRP gratings carry the same loads as steel bar gratings?",
    answer:
      "For uniform distributed loads up to 500 kN/m², FRP molded and pultruded gratings match standard steel bar gratings at comparable depths. For concentrated wheel loads above 90 kN, steel still leads: heavy forklifts and vehicle traffic may require either deeper FRP sections or hybrid FRP-over-steel panels. For pedestrian walkways, platforms, maintenance access, and light vehicle traffic (<45 kN wheel load), FRP is fully equivalent and often lighter-installed.",
  },
  {
    question: "Why do industrial facilities specify FRP over hot-dip galvanized steel?",
    answer:
      "Hot-dip galvanized steel typically survives 20–30 years in benign atmospheres but fails in 10–15 years under acid rain, coastal salt, chlorine, H₂S, or wash-down chemicals. Every recoating cycle costs $15–$30 per m² and disrupts operations. FRP is immune to the electrochemical corrosion that attacks steel, so there is no coating to fail and no recoating cycle. In water treatment, pulp and paper, chemical process and coastal offshore applications, FRP often costs less than galvanized steel over the life of the walkway once recoating and downtime are counted.",
  },
  {
    question: "Are FRP gratings safe around electrical equipment?",
    answer:
      "FRP gratings are electrical insulators. This is a safety advantage that steel gratings cannot offer. In substations, near transformers, or on electrified rail platforms, a metallic grating creates touch potential and step potential hazards during fault events. An FRP grating does not carry fault current, so it does not create these hazards itself. Metal supports, clips and fixings still need bonding as the grounding design requires.",
  },
  {
    question: "How does slip resistance compare in wet conditions?",
    answer:
      "FRP gratings with factory-applied grit top surface achieve Pendulum Test Values (PTV) above 55 per HSE UK guidance, well above the 36 threshold for low-slip risk on wet surfaces. Serrated steel bar gratings typically PTV 25–40 when wet; smooth-top steel plates fall below PTV 20. For offshore platforms, wastewater plants, and any walkway exposed to rain or process water, FRP offers materially safer footing.",
  },
  {
    question: "Is FRP cost-competitive with steel on initial installed cost?",
    answer:
      "Per square meter of grating material, hot-dip galvanized steel is typically 30–50% less expensive than pultruded FRP. However, installed cost (including supporting structure, lifting equipment, hot-work permits, and labor) is often comparable because FRP weighs 60% less. A two-person crew can install FRP gratings with hand tools where steel requires a crane, welding rig, and permit. Installed costs for chemical plant walkways are often close. Over the service life, FRP often costs less in corrosive areas once recoating and downtime are counted.",
  },
  {
    question: "What grating types does F1 Composite manufacture?",
    answer:
      "F1 Composite supplies both pultruded and molded FRP gratings. Pultruded gratings (38mm, 50mm depths) suit heavy-duty walkways and vehicle traffic. Molded gratings (25mm, 38mm, 50mm) with square-mesh 38×38mm or 50×50mm patterns suit platforms, mezzanines, stair treads, and trench covers. Solid-top, ventilated, and anti-slip grit surface finishes are all available. Standard resin is isophthalic polyester; vinyl ester is offered for aggressive chemical service.",
  },
];

export default function FrpVsSteelGratingsPage() {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: pageTitle,
    datePublished: publishedAt,
    dateModified: updatedAt,
    author: { "@id": "https://www.f1composite.com/#organization" },
    publisher: { "@id": "https://www.f1composite.com/#organization" },
    description: pageDescription,
    mainEntityOfPage: absoluteUrl(pagePath),
    about: [
      { "@type": "Thing", name: "Pultruded FRP gratings" },
      { "@type": "Thing", name: "Molded FRP gratings" },
      { "@type": "Thing", name: "Hot-dip galvanized steel bar gratings" },
      { "@type": "Thing", name: "Industrial walkway and platform design" },
    ],
    citation: referencedStandards,
  };

  return (
    <>
      <JsonLd data={webPageSchema} />
      <PageHeader
        updated={updatedAt}
        tag="Material Comparison"
        title="FRP Grating vs Steel Grating"
        description="FRP grating weighs about half as much as galvanized steel bar grating (14–22 kg/m² for 38 mm molded FRP against 34–48 kg/m² for 25 mm steel bar), does not rust and does not conduct electricity. Galvanized steel costs less per square meter and carries higher concentrated wheel loads (90–180 kN against 45–90 kN for pultruded FRP). FRP pays off where corrosion, wet footing or electrical safety drive the choice; steel remains the usual choice for dry areas with heavy vehicles."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Technology", href: "/technology" },
          { label: "FRP vs Steel Gratings" },
        ]}
      />
      <PageNav items={[{ id: "short-answer", label: "Short answer" }, { id: "property-comparison", label: "Comparison" }, { id: "where-frp-replaces-steel", label: "Where FRP wins" }, { id: "where-steel-still-wins", label: "Where steel wins" }, { id: "faq", label: "FAQ" }, { id: "products", label: "Products" }]} />

      <PageSection id="short-answer" title="In corrosive, electrical or wet areas, FRP gratings avoid the recoating cycle that limits galvanized steel" tone="white">
        <p className="text-f16 leading-golden text-t2">
          Steel bar gratings dominate industrial walkways for one reason: low material cost. In dry, non-corrosive, non-electrical environments with heavy vehicle traffic, that cost advantage wins. Everywhere else (chemical plants, wastewater, offshore platforms, coastal marinas, substations, food processing with wash-down) galvanized steel enters a 10–15 year recoating cycle that erases its initial savings. Pultruded and molded FRP gratings eliminate the cycle entirely while delivering better slip resistance, lower installed weight, and inherent electrical insulation.
        </p>
        <p className="mt-[12px] text-f16 leading-golden text-t2">
          This page compares the two across 13 properties that matter to grating specifiers: uniform and concentrated load capacity, corrosion mechanisms, slip resistance on wet surfaces, fire rating, electrical conductivity, and 30-year lifecycle cost.
        </p>
      </PageSection>

      <PageSection id="property-comparison" title="Side-by-side: FRP vs hot-dip galvanized steel gratings" tone="muted">
        <p className="text-f16 leading-golden text-t2">
          FRP values reflect pultruded and molded E-glass/polyester gratings typical of F1 Composite product range. Steel values reflect standard bar grating, 25mm × 5mm bearing bars, hot-dip galvanized per ASTM A123. Bold marks the properties where FRP materially outperforms steel.
        </p>
        <div className="relative mt-[20px] overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full border-collapse text-f14">
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                <th scope="col" className="px-[14px] py-[8px] text-left font-semibold text-t1">Property</th>
                <th scope="col" className="px-[14px] py-[8px] text-left font-semibold text-t1">Unit</th>
                <th scope="col" className="bg-teal-bg2 px-[14px] py-[8px] text-left font-semibold text-teal-text">Pultruded / Molded FRP</th>
                <th scope="col" className="px-[14px] py-[8px] text-left font-semibold text-t1">Hot-Dip Galvanized Steel</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row) => (
                <tr
                  key={row.property}
                  className="border-b border-border-default align-top last:border-b-0"
                >
                  <th scope="row" className="px-[14px] py-[10px] text-left font-semibold text-t1">{row.property}</th>
                  <td className="px-[14px] py-[10px] text-t3">{row.unit ?? "—"}</td>
                  <td className={`bg-teal-bg px-[14px] py-[10px] ${row.frpBetter ? "font-semibold text-t1" : "text-t2"}`}>
                    {row.frp}
                  </td>
                  <td className="px-[14px] py-[10px] text-t2">{row.steel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>

      <PageSection id="where-frp-replaces-steel" title="Five environments where FRP is now the default specification" tone="white">
        <ul className="space-y-[20px] text-f16 leading-golden text-t2">
          <li>
            <strong className="text-t1">Wastewater treatment plants.</strong> H₂S, chlorine, and constant humidity corrode galvanized steel gratings in 8–12 years. Vinyl ester FRP grating does not rust and needs no recoating in the same service, which is why many water utilities now specify it for treatment works.
          </li>
          <li>
            <strong className="text-t1">Offshore platforms and coastal marinas.</strong> Saltwater and salt spray pit galvanized coatings within 5–10 years. Stainless steel grating costs 3–4× FRP. Every major offshore operator now specifies FRP gratings for secondary walkways, helideck surrounds, and engine-room access platforms.
          </li>
          <li>
            <strong className="text-t1">Electrical substations and power plants.</strong> Non-conductive FRP eliminates fault current paths, reduces grounding infrastructure cost by $200,000–$500,000 on a typical 220 kV substation, and removes arc-flash risk in cable management areas.
          </li>
          <li>
            <strong className="text-t1">Chemical and pulp & paper plants.</strong> Sulfuric acid, sodium hydroxide, hypochlorite, and solvent exposure attack any steel coating. FRP vinyl ester gratings resist the full range of process chemicals per the chemical resistance chart, which is why process plants routinely replace steel mezzanines and walkways with FRP during turnarounds.
          </li>
          <li>
            <strong className="text-t1">Food and pharmaceutical facilities.</strong> FDA-compliant polyester resins, non-porous sealed surfaces, and cleanability with caustic CIP solutions make FRP the right choice for environments where steel corrosion particulates could contaminate product.
          </li>
        </ul>
      </PageSection>

      <PageSection id="where-steel-still-wins" title="Heavy vehicle traffic in dry, non-corrosive environments" tone="muted">
        <p className="text-f16 leading-golden text-t2">
          Steel bar gratings remain the right specification in three scenarios. <strong className="text-t1">Heavy wheel loads:</strong> forklifts above 45 kN per wheel and truck traffic on loading docks still benefit from steel&apos;s higher concentrated-load capacity. <strong className="text-t1">Dry industrial buildings:</strong> indoor steel mills, dry warehouses, and foundries with low humidity and no chemical exposure see galvanized steel last 40+ years without recoating, eliminating FRP&apos;s lifecycle advantage. <strong className="text-t1">Fire-critical primary structures:</strong> where code requires non-combustible structural elements, steel is the direct choice; FRP with FR resin achieves Class 1 flame spread but is not non-combustible.
        </p>
      </PageSection>

      <PageSection id="faq" title="Frequently asked questions" tone="white">
        <FAQList items={faqs} />
      </PageSection>

      <PageSection id="products" title="FRP grating from F1 Composite" tone="muted" intro="Molded and pultruded, solid-top and ventilated, grit and smooth, in polyester and vinyl ester resin systems.">
        <ul className="grid grid-cols-1 gap-[16px] md:grid-cols-2">
            <li>
              <CoverCard href="/products/molded-frp-grating" cover={productCovers["/products/molded-frp-grating"]} title="Molded FRP grating" text="Square and mini mesh panels that carry load both ways; the usual choice for platforms with cutouts." action="View molded grating" sizes="(max-width: 767px) 94vw, 46vw" />
            </li>
            <li>
              <CoverCard href="/products/frp-gratings" cover={productCovers["/products/frp-gratings"]} title="Pultruded FRP grating" text="Bearing-bar panels for defined one-way spans, heavier loads and longer clear spans." action="View pultruded grating" sizes="(max-width: 767px) 94vw, 46vw" />
            </li>
        </ul>
      </PageSection>

      <RelatedLinks background="white"
        groups={[
          {
            title: "FRP grating products",
            links: [
              { href: "/products/molded-frp-grating", label: "Molded FRP grating — square & mini mesh" },
              { href: "/products/frp-gratings", label: "Pultruded FRP grating" },
              { href: "/products/fiberglass-structural-shapes/frp-i-beam", label: "FRP I-beam supports" },
              { href: "/products/fiberglass-structural-shapes/frp-channel", label: "FRP channel stringers" },
              { href: "/products/custom-pultruded-profiles", label: "Custom grating bearing bars" },
              { href: "/technology/frp-vs-traditional-materials", label: "FRP vs steel, aluminum, concrete" },
            ],
          },
          {
            title: "Industries & projects",
            links: [
              { href: "/industries/marine", label: "Marine & offshore platforms" },
              { href: "/industries/industrial", label: "Chemical plant & processing platforms" },
              { href: "/industries/infrastructure", label: "Water treatment & infrastructure" },
              { href: "/case-studies/coastal-marina-walkway", label: "Case: UK coastal marina walkway" },
                            { href: "/case-studies/water-treatment-cable-tray", label: "Case: Thailand water treatment plant" },
              { href: "/case-studies/factory-access-staircase", label: "Case: FRP access staircase" },
            ],
          },
          {
            title: "Standards & resources",
            links: [
              { href: "/technology/quality-testing", label: "Quality testing (BS 476 / AS 4586 R11)" },
              { href: "/frp-profile-calculator", label: "FRP load & deflection calculator" },
              { href: "/resources/blog/frp-grating-vs-steel-grating-cost-comparison", label: "Blog: FRP grating lifecycle cost, worked example" },
              { href: "/resources/blog/frp-fire-resistance-ratings-guide", label: "Blog: FRP fire resistance ratings" },
              { href: "/resources/technical-data", label: "Load tables & data sheets" },
              { href: "/resources/design-guides", label: "Grating design guides" },
            ],
          },
        ]}
      />

      <InnerCTA title="Specifying gratings for a corrosive, electrical, or wet environment?" />
    </>
  );
}
