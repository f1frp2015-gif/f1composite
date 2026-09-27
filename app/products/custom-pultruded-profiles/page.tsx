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
const updatedAt = "2026-09-27";
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
  message: "Please review my custom pultruded profile. I will send the section drawing, loads, service environment, length and annual quantity.",
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
    title: "Engineering and simulation",
    duration: "5–10 days",
    brief: "Fiber architecture, FEA checks, resin selection and the quality plan for the section.",
  },
  {
    number: "03",
    title: "Tooling manufacture",
    duration: weeks(supplyTerms.dieManufactureWeeks),
    brief: "CNC-machined steel dies, guide plates and preformers, designed and built in-house.",
  },
  {
    number: "04",
    title: "Trial and validation",
    duration: "1–2 weeks",
    brief: "A production-grade trial run with mechanical testing. You approve the profile before production starts.",
  },
  {
    number: "05",
    title: "Production and delivery",
    duration: "Ongoing",
    brief: "Series production with batch testing and certificates on request. The die is stored for repeat orders.",
  },
];

const dimensions = [
  { label: "Maximum cross-section", value: "600 × 300 mm" },
  { label: "Minimum wall thickness", value: "1.5 mm" },
  { label: "Maximum wall thickness", value: "30 mm" },
  { label: "Maximum profile length", value: "14 m standard" },
  { label: "Dimensional tolerance", value: "±0.25 mm typical" },
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
      `Tooling costs depend on the complexity and size of the cross-section. Simple single-cavity dies for small profiles start at approximately ${usdRange(supplyTerms.dieCostUsd.singleCavity)}, while large or complex multi-cavity dies can range from ${usdRange(supplyTerms.dieCostUsd.largeOrMultiCavity)}. Tooling is a one-time investment that we maintain and store at our facility for the life of the product. For high-volume programs, the tooling cost per linear meter becomes negligible within the first production run.`,
  },
  {
    question: "What is the minimum order quantity for custom profiles?",
    answer:
      `The minimum order quantity for a first production run is typically ${firstRun} linear meters, which is the minimum length required to validate process parameters and ensure consistent quality across the batch. Repeat orders can be as low as ${repeat} linear meters. For prototype or development quantities below these thresholds, we offer trial run packages that include a limited quantity of validated profile along with full mechanical test data.`,
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
];

const requestItems = [
  { title: "Section drawing", text: "A DWG, DXF, STEP or PDF of the cross-section, or a sketch with the critical dimensions and tolerances." },
  { title: "Loads and service", text: "Spans and loads, the environment (chemicals, UV, temperature) and any fire or electrical requirement." },
  { title: "Material and finish", text: "Preferred fiber, resin, surface and color, or the performance you need so we can propose them." },
  { title: "Quantities and delivery", text: `Cut length, first-run and annual quantity (first runs from ${firstRun} m), destination and target date.` },
];

export default function CustomPultrusionsPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Custom fiberglass pultrusion services",
    name: "Custom Pultrusion Services",
    description:
      `End-to-end custom pultruded FRP profile design, tooling, and production — cross-sections up to 600×300 mm, tolerances per EN 13706 / ASTM D3917, MOQ ${firstRun} m first run / ${repeat} m repeat.`,
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
      "F1 Composite's five-stage process for engineering, tooling, validating, and producing a bespoke pultruded FRP profile to EN 13706 / ASTM D3917 specifications.",
    totalTime: `P${supplyTerms.newDieLeadTimeWeeks[1]}W`,
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: "5000-40000",
    },
    supply: [
      { "@type": "HowToSupply", name: "Application drawing or geometry brief (loads, environment, length, finish)" },
      { "@type": "HowToSupply", name: "Reinforcement (E-glass, S-glass, carbon, basalt, or aramid roving + mat)" },
      { "@type": "HowToSupply", name: "Resin system (polyester, vinyl ester, epoxy, polyurethane, or phenolic)" },
    ],
    tool: [
      { "@type": "HowToTool", name: "CNC-machined chrome-plated steel pultrusion die" },
      { "@type": "HowToTool", name: "FEA simulation for fiber architecture and section optimization" },
      { "@type": "HowToTool", name: "Pultrusion line with EN 13706 / ASTM D3917 process control" },
      { "@type": "HowToTool", name: "In-house mechanical test lab (ASTM D638, D790, D695, D2344)" },
    ],
    step: processSteps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.brief,
      url: `${absoluteUrl(pagePath)}#step-${s.number}`,
      timeRequired: s.duration,
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
          image: "/images/products/custom-frp-profile-drawing-render.webp",
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
        description="Cross-sections up to 600 × 300 mm and walls from 1.5 mm, in E-glass, carbon, basalt or aramid fiber with polyester, vinyl ester, epoxy or polyurethane resin. Each profile gets its own die, a trial run and test data before series production."
        facts={[
          { label: "Max section", value: "600 × 300 mm" },
          { label: "Wall", value: "1.5–30 mm" },
          { label: "First run", value: `${firstRun} m` },
          { label: "New die", value: weeks(supplyTerms.newDieLeadTimeWeeks) },
        ]}
        actions={{
          primary: { label: "Request a quote", href: quoteHref },
          secondary: { label: "See the process", href: "#process", variant: "secondary" },
          stickyMobile: true,
        }}
        figure={
          <Figure number={1} title="From section drawing to profile" note="Drawing and rendering" caption="A customer section as drawn and toleranced, and as rendered from the drawing. Every custom profile starts from a drawing like this." bleed>
            <Image
              src="/images/products/custom-frp-profile-drawing-render.webp"
              alt="Toleranced drawing of a two-cell custom pultruded profile, 111.9 mm wide and 33.5 mm deep, beside a rendering of the finished profile"
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
          { id: "capabilities", label: "Capabilities" },
          { id: "existing-dies", label: "Existing dies" },
          { id: "process", label: "Process" },
          { id: "cost", label: "Cost" },
          { id: "faq", label: "FAQ" },
          { id: "quote", label: "Quote" },
        ]}
      />

      <PageSection id="capabilities" title="What we can pultrude" intro="The dimensional range of the production lines, then the four material choices that define a profile, from the fiber core out to the finish.">
        <div className="grid grid-cols-1 items-start gap-[24px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-[48px]">
          <div>
            <h3 className="text-f20 font-bold text-t1">Dimensional range</h3>
            <p className="mt-[10px] text-f16 leading-golden text-t2">
              Limits of the current lines; other lengths on request. A section near a limit is still worth sending: the feasibility review says what would have to change.
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

      <PageSection
        id="existing-dies"
        title="Check the existing dies first"
        tone="muted"
        intro={`FengDu's production network holds ${company.production.dieSets.toLocaleString("en-US")}+ die sets. A variant on an existing die (another resin, color or length) takes ${weeks(supplyTerms.existingDieVariantLeadTimeWeeks)}; a new die takes ${weeks(supplyTerms.newDieLeadTimeWeeks)} from approved drawing to first delivery. These families already run:`}
      >
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

      <PageSection id="process" title="From inquiry to series production" intro={`About ${weeks(supplyTerms.newDieLeadTimeWeeks)} from an approved drawing to the first delivery. The die is the longest step.`}>
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
              The die stays at our plant, maintained at our cost, for the life of your product. On a typical production run the amortized tooling share of the per-meter price becomes negligible within the first order.
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
              { href: "/industries/vehicle", label: "Rail and transport profiles" },
              { href: "/regions/frp-pultrusion-supplier-usa", label: "FRP pultrusion supplier for US projects" },
              { href: "/regions/pultruded-frp-solar-mounting-australia", label: "Solar mounting profiles, Australia" },
              { href: "/case-studies", label: "Project case studies" },
            ],
          },
          {
            title: "Technical resources",
            links: [
              { href: "/technology/pultrusion-process", label: "Pultrusion process explained" },
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
