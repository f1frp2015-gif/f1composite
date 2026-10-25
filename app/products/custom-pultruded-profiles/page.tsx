import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import ProductRfq from "@/components/products/ProductRfq";
import RelatedLinks from "@/components/sections/RelatedLinks";
import JsonLd from "@/components/seo/JsonLd";
import CoverCard from "@/components/ui/CoverCard";
import { FAQList } from "@/components/ui/FAQ";
import Figure from "@/components/ui/Figure";
import { company, supplyTerms, usdRange, weeks } from "@/content/data/company";
import { getSeoQueryTarget } from "@/content/data/seoQueryTargets";
import { authorsBySlug, reviewerCredit } from "@/lib/authors";
import { productCovers } from "@/lib/covers";
import { buildRfqHref } from "@/lib/rfq";
import { buildPageMetadata, buildProductFamilyPageSchema, absoluteUrl } from "@/lib/seo";

const pagePath = "/products/custom-pultruded-profiles";
const seoTarget = getSeoQueryTarget(pagePath);
const pageTitle = seoTarget.title;
const pageDescription = seoTarget.description;
const publishedAt = "2026-04-04";
const updatedAt = "2026-10-11";
const author = authorsBySlug["haifeng-gong"];
const reviewer = authorsBySlug["yifan-liu"];
const { firstRun, repeat } = supplyTerms.customMoqMeters;

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  image: "/products/custom-pultruded-profiles/opengraph-image",
});

const quoteHref = buildRfqHref({
  source: "custom-pultruded-profiles",
  product: "Custom pultruded FRP profile",
  productPath: pagePath,
  message: "Please review my custom pultruded profile.\nSupply scope (profile lengths / machined parts): \nDrawing / revision and units: \nMaterial reference and required reports: \nCritical dimensions, tolerances and datums: \nCutting / holes / slots / notches: \nLoads and service environment: \nLength and quantity: \nFirst-article and inspection records required: ",
});

const processSteps = [
  {
    number: "01",
    title: "Inquiry and feasibility",
    duration: "1–3 days",
    brief: "Share your geometry, loads and environment. We assess whether the section can be pultruded and propose changes that help it run.",
  },
  {
    number: "02",
    title: "Drawing and material review",
    duration: "5–10 days",
    brief: "Agree the material, drawing revision, critical dimensions, datums and inspection plan. Confirm any calculation or qualification work needed.",
  },
  {
    number: "03",
    title: "Tooling manufacture",
    duration: weeks(supplyTerms.dieManufactureWeeks),
    brief: "Confirm the die, guide plates and preformers with the production team, including ownership, maintenance and modification terms.",
  },
  {
    number: "04",
    title: "Trial and validation",
    duration: "1–2 weeks",
    brief: "Review a first article against the approved drawing and inspection plan. Agree any material testing and resolve deviations before releasing the production run.",
  },
  {
    number: "05",
    title: "Production and delivery",
    duration: "Ongoing",
    brief: "Produce to the released revision and agreed checks. Confirm batch identification, document delivery and approval of changes for repeat orders.",
  },
];

const dimensions = [
  { label: "Maximum cross-section", value: "600 × 300 mm" },
  { label: "Minimum wall thickness", value: "1.5 mm" },
  { label: "Maximum wall thickness", value: "30 mm" },
  { label: "Maximum profile length", value: "14 m standard" },
  { label: "Dimensional tolerance", value: "Agreed by feature and drawing revision" },
];

// The four choices that define the laminate, from the fiber core out to the finish.
const layers = [
  {
    title: "Fiber",
    items: [
      { name: "E-glass", note: "The standard choice, with the best strength for the cost." },
      { name: "Carbon", note: "Much higher stiffness and strength." },
      { name: "Basalt", note: "Better heat and chemical resistance." },
      { name: "Carbon-glass hybrid", note: "Balances stiffness, weight and cost." },
    ],
  },
  {
    title: "Resin",
    items: [
      { name: "Unsaturated polyester", note: "Cost-effective for general service." },
      { name: "Vinyl ester", note: "For chemical exposure." },
      { name: "Epoxy", note: "Highest mechanical performance." },
      { name: "Polyurethane", note: "High toughness and transverse strength." },
    ],
  },
  {
    title: "Surface reinforcement",
    items: [
      { name: "Glass surface veil", note: "A smooth, resin-rich surface that shields the fibers from UV and corrosion." },
      { name: "Woven glass fabric", note: "Multi-axial strength and impact resistance." },
      { name: "Combination mat", note: "Roving and chopped strand mat in one ply for balanced properties." },
      { name: "Carbon fiber mat", note: "A conductive surface for EMI shielding." },
    ],
  },
  {
    title: "Coating and finish",
    items: [
      { name: "Fluorocarbon (PVDF)", note: "The most weather-resistant coating; performance follows the coating system's data." },
      { name: "Powder coating", note: "A durable color finish in RAL colors." },
      { name: "Film lamination", note: "Wood grain, marble or a custom pattern." },
      { name: "No coating", note: "UV-stabilized resin and surface veil, without a paint layer." },
    ],
  },
];

// Families that already run on F1 dies: a variant of one of these is faster
// than a new die. These are also the pages that send custom-pultrusion queries here.
const existingFamilies = [
  { href: "/products/fiberglass-structural-shapes/frp-tube", title: "Round tubes", text: "25–150 mm outside diameter in several wall thicknesses." },
  { href: "/products/fiberglass-structural-shapes/frp-square-tube", title: "Square and rectangular tubes", text: "Square and rectangular hollow sections with nominal walls and weights." },
  { href: "/products/fiberglass-sheets", title: "Flat sheets", text: "Solid sheet cut to size, with smooth, gritted or embossed surfaces." },
  { href: "/products/fiberglass-plates", title: "Hollow and multi-cell plates", text: "Plate profiles with enclosed cells, drawn from the section catalog." },
  { href: "/products/window-door-profiles", title: "Window and door profiles", text: "Frame, sash, mullion and sill sections for fabricators." },
  { href: "/products/wind-turbine-blade-panels", title: "Wind turbine blade panels", text: "GFRP, CFRP and hybrid panels cut to the project length." },
  { href: "/products/frp-sound-barrier-wall", title: "Sound barrier wall panels", text: "Panel systems for highways, railways and industrial sites." },
  { href: "/products/fiberglass-stakes", title: "Plant and tree stakes", text: "5–19 mm rods for vineyards, nurseries and plantations." },
] as const;

const faqItems = [
  {
    question: "How much does custom pultrusion tooling cost?",
    answer:
      `Tooling costs depend on the complexity and size of the cross-section. Simple single-cavity dies for small profiles start at approximately ${usdRange(supplyTerms.dieCostUsd.singleCavity)}, while large or complex multi-cavity dies can range from ${usdRange(supplyTerms.dieCostUsd.largeOrMultiCavity)}. These are planning ranges, not an offer. Divide the quoted tooling charge by the actual order length to calculate its share per meter. Tooling, profile production, trials, secondary processing and delivery are quoted separately; confirm ownership, maintenance and modification terms with the approved drawing.`,
  },
  {
    question: "What is the minimum order quantity for custom profiles?",
    answer:
      `Planning quantities are typically ${firstRun} linear meters for a first production run and ${repeat} linear meters for a repeat order. Confirm the minimum for the proposed section, material and tooling. For development quantities, ask for a separately scoped trial; sample quantity, inspection and material tests must be agreed rather than assumed to be included.`,
  },
  {
    question: "Can you match an existing steel or aluminum cross-section?",
    answer:
      "Yes. We routinely design pultruded FRP profiles as direct replacements for steel and aluminum sections. However, a direct dimensional copy is rarely the optimal approach. Because FRP has different mechanical properties than metals, particularly a lower elastic modulus, we typically recommend modifications to the cross-section geometry such as increased moment of inertia, thicker flanges, or additional internal stiffening ribs that optimize the profile for FRP-specific behavior while maintaining the same connection and envelope dimensions.",
  },
  {
    question: "What lead time should we expect from inquiry to first delivery?",
    answer:
      `For a new custom profile with no existing tooling, the typical lead time from approved design to first delivery is ${weeks(supplyTerms.newDieLeadTimeWeeks)}. This includes tooling manufacture (${weeks(supplyTerms.dieManufactureWeeks)}), trial run and validation (1–2 weeks), and production of the first order (1–2 weeks). We can compress this timeline for urgent projects by running parallel workstreams, though expedited fees may apply. Repeat orders with existing tooling typically ship within ${weeks(supplyTerms.catalogLeadTimeWeeks)}.`,
  },
  {
    question: "Can you guarantee the same tolerance on every feature?",
    answer: "Tolerances are confirmed against the drawing, material, section geometry and machining route. Separate the as-pultruded cross-section from cut lengths, holes and slots. Identify the critical fit dimensions and datums, then agree the measurement method and first-article requirements. A first-article result applies to that sample; any repeat-production capability claim needs relevant production evidence.",
  },
];

const requestItems = [
  { title: "Drawing and interfaces", text: "DWG, DXF, STEP or PDF with revision, units, critical dimensions, tolerances and datums. Identify mating parts and include any hole, slot or notch schedule." },
  { title: "Loads and service", text: "Spans and loads, the environment (chemicals, UV, temperature) and any fire or electrical requirement." },
  { title: "Material and finish", text: "Preferred fiber, resin, surface and color, or the performance you need so we can propose them." },
  { title: "Quantities and release", text: `Cut lengths, first-run and annual quantities, destination and target date. Include first-article, sampling and inspection record requirements; ${firstRun} m is a first-run planning quantity.` },
];

export default function CustomPultrusionsPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Custom fiberglass pultrusion services",
    name: "Custom Pultrusion Services",
    description:
      "Custom pultruded FRP profile development, tooling and production with material, drawing tolerances, secondary machining and inspection scope confirmed for the order.",
    url: absoluteUrl(pagePath),
    provider: {
      "@id": `https://www.f1composite.com/#organization`,
    },
    areaServed: [
      { "@type": "Continent", name: "Europe" },
      { "@type": "Continent", name: "North America" },
      { "@type": "Continent", name: "Asia" },
      { "@type": "Continent", name: "Oceania" },
    ],
    termsOfService: absoluteUrl("/terms"),
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to develop a custom pultruded FRP profile — from inquiry to series production",
    description:
      "A five-stage development process covering feasibility, drawing review, tooling, first-article approval and production to an agreed specification.",
    supply: [
      { "@type": "HowToSupply", name: "Application drawing or geometry brief (loads, environment, length, finish)" },
      { "@type": "HowToSupply", name: "Reinforcement (E-glass, S-glass, carbon, basalt, or aramid roving + mat)" },
      { "@type": "HowToSupply", name: "Resin system (polyester, vinyl ester, epoxy, polyurethane, or phenolic)" },
    ],
    step: processSteps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.brief,
      url: `${absoluteUrl(pagePath)}#step-${s.number}`,
    })),
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={howToSchema} />
      <JsonLd
        data={buildProductFamilyPageSchema({
          name: "Custom Pultruded FRP Profiles",
          description: pageDescription,
          path: pagePath,
          image: "/images/products/custom-frp-profile-drawing-3d-view.webp",
          category: "Custom Pultruded FRP Profiles",
          productLine: "F1-FORM",
          schemaType: "CollectionPage",
          datePublished: publishedAt,
          dateModified: updatedAt,
          author: {
            name: author.fullName,
            jobTitle: author.jobTitle,
            path: `/about/authors/${author.slug}`,
          },
          reviewedBy: {
            name: reviewer.fullName,
            jobTitle: reviewer.jobTitle,
            path: `/about/authors/${reviewer.slug}`,
          },
          // Custom pultrusion spans the full catalog range; indicative per-meter
          // band to /contact (final price is tooling- and volume-dependent).
          priceRange: { lowPrice: "5", highPrice: "300", offerCount: "1", unitText: "linear meter" },
          material: [
            "E-glass fiber",
            "S-glass fiber",
            "Carbon fiber",
            "Basalt fiber",
            "Aramid fiber",
            "Polyester resin",
            "Vinyl ester resin",
            "Epoxy resin",
            "Phenolic resin",
          ],
          additionalProperty: [
            { name: "Maximum cross-section", value: "600 × 300 mm" },
            { name: "Minimum wall thickness", value: "1.5 mm" },
            { name: "Minimum order quantity", value: `${firstRun} m first run / ${repeat} m repeat` },
            { name: "Typical tooling lead time", value: weeks(supplyTerms.dieManufactureWeeks) },
          ],
        })}
      />
      <PageHeader
        updated={updatedAt}
        reviewer={reviewerCredit(reviewer)}
        tag="Custom profiles"
        line={{ name: "F1-FORM", label: "Custom profiles" }}
        title="Custom pultruded profiles, engineered to your specification"
        description="Develop the section, material and delivery scope around your application. Confirm tooling, critical dimensions, secondary machining and first-article requirements before series production."
        facts={[
          { label: "Max section", value: "600 × 300 mm" },
          { label: "Wall", value: "1.5–30 mm" },
          { label: "First run", value: `${firstRun} m` },
          { label: "New die", value: weeks(supplyTerms.newDieLeadTimeWeeks) },
        ]}
        actions={{
          primary: { label: "Request a quote", href: quoteHref },
          secondary: { label: "Define the supply", href: "#existing-dies", variant: "secondary" },
          stickyMobile: true,
        }}
        figure={
          <Figure number={1} title="From section drawing to profile" caption="A customer section as drawn and toleranced, and the profile it describes. Every custom profile starts from a drawing like this." bleed>
            <Image
              src="/images/products/custom-frp-profile-drawing-3d-view.webp"
              alt="Toleranced drawing of a two-cell custom pultruded profile, 111.9 mm wide and 33.5 mm deep, beside a 3D view of the finished profile"
              width={800}
              height={517}
              sizes="(max-width: 1023px) 94vw, 44vw"
              className="h-auto w-full"
              preload
            />
          </Figure>
        }
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products/product-lines" },
          { label: "Pultruded FRP Profiles", href: "/pultruded-frp-profiles" },
          { label: "Custom Pultrusions" },
        ]}
      />
      <PageNav
        items={[
          { id: "existing-dies", label: "Supply scope" },
          { id: "capabilities", label: "Dimensions & material" },
          { id: "documents", label: "Drawings & evidence" },
          { id: "tolerances", label: "Machining & inspection" },
          { id: "process", label: "Production process" },
          { id: "cost", label: "Cost" },
          { id: "faq", label: "FAQ" },
          { id: "quote", label: "Quote" },
        ]}
      />

      <PageSection
        id="existing-dies"
        title="Define the supply, then check the existing dies"
        tone="muted"
        intro={`FengDu's production network holds ${company.production.dieSets.toLocaleString("en-US")}+ die sets. A variant on an existing die (another resin, color or length) takes ${weeks(supplyTerms.existingDieVariantLeadTimeWeeks)}; a new die takes ${weeks(supplyTerms.newDieLeadTimeWeeks)} from approved drawing to first delivery. These families already run:`}
      >
        <p className="mb-[24px] max-w-[900px] text-f16 leading-golden text-t2">Choose the delivery object: profile lengths from an agreed section, or machined parts identified by their finished-part drawings. A new cross-section may need new tooling; cutting or drilling an existing section is a separate processing scope. Include units, length and quantity for each item.</p>
        <ul className="grid grid-cols-2 gap-[10px] sm:gap-[12px] lg:grid-cols-4">
          {existingFamilies.map((family) => (
            <li key={family.href}>
              <CoverCard href={family.href} cover={productCovers[family.href]} title={family.title} text={family.text} compact sizes="(max-width: 1024px) 50vw, 300px" />
            </li>
          ))}
        </ul>
        <p className="mt-[20px] text-f14 leading-golden text-t2">
          I-beams, channels, angles, rods and flat bars are in the{" "}
          <Link href="/products/fiberglass-structural-shapes" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">standard structural shapes</Link>
          ; every family is listed under{" "}
          <Link href="/products/product-lines" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">product lines</Link>.
        </p>
      </PageSection>

      <PageSection id="capabilities" title="What we can pultrude" intro="The dimensional range of the production lines, then the four material choices that define a profile, from the fiber core out to the finish.">
        <div className="grid grid-cols-1 items-start gap-[24px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-[48px]">
          <div>
            <h3 className="text-f20 font-bold text-t1">Dimensional range</h3>
            <p className="mt-[10px] text-f16 leading-golden text-t2">
              These are separate capability ranges, not a guarantee that all limits can be combined. Feasibility and tolerances depend on section geometry, wall thickness, reinforcement, resin and length. Send the drawing and critical interfaces for review; we confirm the achievable dimensions and inspection method before tooling.
            </p>
          </div>
          <div className="relative overflow-x-auto rounded-card border border-border-default bg-white">
            <table className="spec-table w-full border-collapse text-left text-f14">
              <caption className="sr-only">Dimensional range for custom pultruded profiles</caption>
              <thead>
                <tr className="border-b border-border-default bg-bg2">
                  <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Dimension</th>
                  <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Range</th>
                </tr>
              </thead>
              <tbody>
                {dimensions.map((item) => (
                  <tr key={item.label} className="border-b border-border-default last:border-b-0">
                    <th scope="row" className="px-[14px] py-[10px] font-semibold text-t1">{item.label}</th>
                    <td className="px-[14px] py-[10px] text-t2">{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <h3 className="mt-[40px] text-f20 font-bold text-t1">Material matrix</h3>
        <ol className="mt-[16px] grid grid-cols-1 gap-[12px] sm:grid-cols-2 lg:grid-cols-4">
          {layers.map((layer, index) => (
            <li key={layer.title} className="rounded-card border border-border-default bg-white p-[20px]">
              <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Layer {index + 1}</p>
              <h4 className="mt-[6px] text-f18 font-bold text-t1">{layer.title}</h4>
              <dl className="mt-[12px] divide-y divide-border-default border-t border-border-default">
                {layer.items.map((item) => (
                  <div key={item.name} className="py-[10px]">
                    <dt className="text-f14 font-semibold text-t1">{item.name}</dt>
                    <dd className="mt-[2px] text-f14 leading-golden text-t2">{item.note}</dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ol>
      </PageSection>

      <PageSection id="documents" title="Put the drawing and material evidence in one review package" intro="A requirement, a reference document and an accepted result have different roles. Identify each file before approving tooling or a production sample.">
        <dl className="grid gap-[20px] md:grid-cols-3">
          {[
            ["Drawing identity", "Send the actual section and finished-part drawings with revision, units, length convention and critical interfaces. List any missing files or dimensions to resolve before release."],
            ["Material and reports", "Identify the resin / reinforcement reference and service conditions. State which mechanical, fire, electrical or exposure evidence the project needs; a similar profile or resin name does not establish applicability."],
            ["Order deliverables", "List the drawings, first-article measurements, batch records and packing identification required with the order. Confirm what is available, what needs review and what requires new work."],
          ].map(([title, text]) => <div key={title} className="border-t border-border-default pt-[14px]"><dt className="text-f18 font-bold text-t1">{title}</dt><dd className="mt-[8px] text-f16 leading-golden text-t2">{text}</dd></div>)}
        </dl>
        <p className="mt-[20px] max-w-[900px] text-f14 leading-golden text-t2">Use the <Link href="/resources/evidence" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">public evidence library</Link> to identify references for review. It does not approve an unreviewed custom section or formulation.</p>
      </PageSection>

      <PageSection id="tolerances" title="Define fit before committing to tooling" tone="muted" intro="A profile drawing sets the requirement. An inspection record shows what was measured. Repeat-production capability needs evidence for the relevant material, feature and process.">
        <ol className="grid gap-[12px] md:grid-cols-2">
          {[
            { title: "Separate profile and machining dimensions", text: "Specify section geometry, wall thickness, straightness and twist separately from cut length, end angle, finished hole diameter, hole pattern and slot dimensions. Flag the features that control fit." },
            { title: "Agree datums and inspection", text: "Identify the reference faces or axes, support condition for long profiles, measurement method, sampling and acceptance limits. Define whether dimensions are checked before or after edge treatment." },
            { title: "Approve the first article", text: "Match the sample and inspection record to the drawing revision and material. Record deviations and their disposition before releasing production; do not treat one measured sample as proof of every future part." },
            { title: "Control later changes", text: "A changed drawing, resin, reinforcement, die or machining setup may affect fit or performance. Agree which changes need customer approval, another sample, repeat inspection or additional qualification." },
          ].map((item, index) => (
            <li key={item.title} className="rounded-card border border-border-default bg-white p-[20px]">
              <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Review {index + 1}</p>
              <h3 className="mt-[6px] text-f18 font-bold text-t1">{item.title}</h3>
              <p className="mt-[8px] text-f14 leading-golden text-t2">{item.text}</p>
            </li>
          ))}
        </ol>
        <p className="mt-[20px] text-f16 leading-golden text-t2">
          For drawing inputs and illustrated feature types, read the{" "}
          <Link href="/technology/frp-profile-machining" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">FRP cutting, drilling and machining guide</Link>. Agree the record package using the{" "}
          <Link href="/technology/quality-testing#machining-records" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">inspection record checklist</Link>.
        </p>
        <p className="mt-[12px] text-f14 leading-golden text-t2"><a href="/downloads/frp-first-article-inspection-template.csv" download className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">Download the blank first-article inspection template (CSV)</a>. Use it to agree the fields before sampling; it contains no measured results or acceptance approval.</p>
      </PageSection>

      <PageSection id="process" title="From inquiry to series production" intro={`Allow ${weeks(supplyTerms.newDieLeadTimeWeeks)} as a planning range from an approved drawing to first delivery. Confirm the schedule, trials and required testing in the quotation.`}>
        <ol className="grid grid-cols-1 gap-[12px] sm:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((step, index) => (
            <li key={step.number} id={`step-${step.number}`} className="scroll-mt-[128px] rounded-card border border-border-default bg-white p-[20px]">
              <p className="flex items-baseline justify-between gap-[8px] font-mono text-f12 uppercase tracking-[0.06em] text-t3">
                <span>Step {index + 1}</span>
                <span className="text-teal-text">{step.duration}</span>
              </p>
              <h3 className="mt-[8px] text-f16 font-bold text-t1">{step.title}</h3>
              <p className="mt-[6px] text-f14 leading-golden text-t2">{step.brief}</p>
            </li>
          ))}
        </ol>
        <p className="mt-[20px] text-f14 leading-golden text-t2">
          How the line itself works (creel, resin bath, heated die and puller) is explained in the{" "}
          <Link href="/technology/pultrusion-process" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">pultrusion process guide</Link>.
        </p>
      </PageSection>

      <PageSection id="cost" title="What custom pultrusions cost" tone="muted" intro="Every program has two cost components: a one-time die and a price per meter.">
        <div className="grid grid-cols-1 gap-[12px] md:grid-cols-2">
          <article className="rounded-card border border-border-default bg-white p-[20px] sm:p-[28px]">
            <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">One-time</p>
            <h3 className="mt-[6px] text-f20 font-bold text-t1">Tooling</h3>
            <dl className="mt-[14px] divide-y divide-border-default border-y border-border-default">
              <div className="flex flex-wrap items-baseline justify-between gap-x-[16px] gap-y-[2px] py-[10px]">
                <dt className="text-f14 text-t2">Single-cavity die, small open profile</dt>
                <dd className="text-f16 font-semibold text-t1">{usdRange(supplyTerms.dieCostUsd.singleCavity)}</dd>
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-[16px] gap-y-[2px] py-[10px]">
                <dt className="text-f14 text-t2">Large or multi-cavity die</dt>
                <dd className="text-f16 font-semibold text-t1">{usdRange(supplyTerms.dieCostUsd.largeOrMultiCavity)}</dd>
              </div>
            </dl>
            <p className="mt-[14px] text-f14 leading-golden text-t2">
              Tooling share per meter is the quoted die charge divided by the order length. For example, a USD 5,000 die over a 500 m order adds USD 10/m before profile production, trials and delivery. This is an arithmetic example, not a quotation. Confirm ownership, storage, maintenance and modification terms in the tooling agreement.
            </p>
          </article>
          <article className="rounded-card border border-border-default bg-white p-[20px] sm:p-[28px]">
            <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Per meter</p>
            <h3 className="mt-[6px] text-f20 font-bold text-t1">Profile price</h3>
            <p className="mt-[14px] text-f14 leading-golden text-t2">
              Driven by the same factors as any pultruded shape: cross-section area (glass and resin mass per meter), resin system, fiber architecture, surface veil and order volume. First production runs start at {firstRun} linear meters; repeat orders from {repeat} meters.
            </p>
            <p className="mt-[10px] text-f14 leading-golden text-t2">
              For a directional number before you commit to tooling, run the closest standard shape through the{" "}
              <Link href="/fiberglass-pultruded-profile-price" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">
                pultruded profile price estimator
              </Link>
              , then add the tooling line from the ranges beside it.
            </p>
          </article>
        </div>
      </PageSection>

      <PageSection id="faq" title="Custom pultrusion questions">
        <FAQList items={faqItems} />
      </PageSection>

      <RelatedLinks
        groups={[
          {
            title: "Products",
            links: [
              { href: "/pultruded-frp-profiles", label: "All pultruded FRP profiles" },
              { href: "/products/fiberglass-structural-shapes", label: "Standard structural shapes" },
              { href: "/products/fiberglass-structural-shapes/frp-rod/carbon-fiber-rod", label: "Pultruded carbon fiber rods" },
              { href: "/products/frp-window-frames", label: "FRP window and door systems" },
              { href: "/products/frp-gratings", label: "Pultruded FRP grating" },
              { href: "/products/product-lines", label: "F1 Composite product lines" },
            ],
          },
          {
            title: "Applications",
            links: [
              { href: "/industries/construction", label: "Construction systems" },
              { href: "/industries/energy", label: "EV battery trays and solar" },
              { href: "/applications/frp-utility-crossarms", label: "Utility crossarm assemblies" },
              { href: "/industries/vehicle", label: "Rail and transport profiles" },
              { href: "/applications/cfrp-concrete-strengthening", label: "CFRP strengthening system qualification" },
              { href: "/applications/carbon-fiber-industrial-rollers", label: "Industrial roller component specification" },
              { href: "/regions/frp-pultrusion-supplier-usa", label: "FRP pultrusion supplier for US projects" },
              { href: "/regions/pultruded-frp-solar-mounting-australia", label: "Solar mounting profiles, Australia" },
              { href: "/case-studies", label: "Project case studies" },
            ],
          },
          {
            title: "Technical resources",
            links: [
              { href: "/technology/pultrusion-process", label: "Pultrusion process explained" },
              { href: "/technology/frp-profile-machining", label: "Cutting, drilling and machining requirements" },
              { href: "/technology/knowhow-services", label: "KNOWHOW transfer services" },
              { href: "/technology/quality-testing", label: "Quality testing (EN 13706)" },
              { href: "/resources/design-guides", label: "Design guides" },
              { href: "/what-is-frp", label: "What is FRP? Complete guide" },
            ],
          },
        ]}
      />

      <PageSection id="quote" title="Send your custom profile requirements" tone="deep">
        <ProductRfq
          product="Custom pultruded FRP profile"
          productPath={pagePath}
          quoteHref={quoteHref}
          items={requestItems}
          intro="Start with a drawing or a sketch. We review feasibility and propose changes that help the section run, then quote the die and the per-meter price together."
          advisorPrompt="I need a custom pultruded FRP cross-section. Dimensions roughly [HxW mm], wall thickness [t mm], environment is [chemical/UV/load], target quantity [meters]. Is this feasible, and what's the tooling cost + lead time?"
        />
      </PageSection>
    </>
  );
}
