import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import ProductRfq from "@/components/products/ProductRfq";
import RelatedLinks from "@/components/sections/RelatedLinks";
import JsonLd from "@/components/seo/JsonLd";
import { FAQList } from "@/components/ui/FAQ";
import Figure from "@/components/ui/Figure";
import { getSeoQueryTarget } from "@/content/data/seoQueryTargets";
import { buildRfqHref } from "@/lib/rfq";
import { buildPageMetadata, buildProductFamilyPageSchema } from "@/lib/seo";

const pagePath = "/products/fiberglass-snow-markers";
const seoTarget = getSeoQueryTarget(pagePath);
const pageTitle = seoTarget.title;
const pageDescription = seoTarget.description;
const updatedAt = "2026-10-26";
const heroImage =
  "/images/products/fiberglass-snow-markers/fiberglass-snow-markers-reflective-stakes.webp";
const applicationImage =
  "/images/products/fiberglass-snow-markers/reflective-fiberglass-snow-markers-winter-road.webp";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  image: heroImage,
});

const quoteHref = buildRfqHref({
  source: "fiberglass-snow-markers",
  product: "Fiberglass driveway markers and snow stakes",
  productPath: pagePath,
  message: "Please quote fiberglass driveway markers and snow stakes.\nSite and expected snowbank height:\nOverall length, exposed height and ground conditions:\nSolid or hollow, diameter, tip and cap:\nRod color and reflective-band grade, width and position:\nPack count, total quantity and private label:\nDestination and required delivery date:",
});

const requestItems = [
  { title: "Marker and site", text: "Solid or hollow, diameter, overall and exposed length, snowbank height, ground condition, color, tip and cap." },
  { title: "Reflective bands", text: "Band count, width and position, and the tape grade or sheeting standard if one is required." },
  { title: "Packing", text: "Pack count, private label or barcode, carton and pallet limits." },
  { title: "Quantity and delivery", text: "Total quantity by size, destination and the date the markers must be on site or in store." },
];

const card = "rounded-card border border-border-default bg-white p-[20px] sm:p-[24px]";

const specificationRows = [
  {
    item: "Construction",
    standard: "Pultruded fiberglass solid rod or hollow tube",
    options: "Construction selected for stiffness, impact reserve, weight and target cost",
  },
  {
    item: "Outside diameter",
    standard: '6.35 mm (1/4 in) and 7.9 mm (5/16 in)',
    options: "Other diameters require tooling and commercial review",
  },
  {
    item: "Cut length",
    standard: "610, 914, 1,219, 1,524 and 1,829 mm",
    options: "Equivalent 2, 3, 4, 5 and 6 ft programs; custom cut lengths by MOQ",
  },
  {
    item: "Color",
    standard: "Safety orange, yellow, green, blue or red",
    options: "Pigment, surface finish and color tolerance approved against a sample",
  },
  {
    item: "Reflective treatment",
    standard: "One, two or three wraparound reflective bands",
    options: "Band width, position, color and sheeting grade stated on the purchase specification",
  },
  {
    item: "End treatment",
    standard: "Pointed insertion end with finished or capped top",
    options: "Tip geometry and tube-cap requirement matched to installation method",
  },
  {
    item: "Packing",
    standard: "Counted bundles or cartons for wholesale programs",
    options: "Pack count, label, barcode, pallet and retail-ready requirements by order",
  },
  {
    item: "Inspection",
    standard: "Diameter, length, color, tape position, quantity and appearance",
    options: "Golden sample, batch records and project-specific acceptance plan",
  },
];

const constructionOptions = [
  {
    name: "Solid fiberglass stakes",
    badge: "Contractor starting point",
    bestFor: "Repeated seasonal installation, commercial snow routes and firmer ground",
    body: "A solid pultruded rod provides more material through the section and is the conservative starting point where installation abuse, plow contact or repeated reuse is expected.",
  },
  {
    name: "Hollow fiberglass stakes",
    badge: "Weight and cost control",
    bestFor: "Residential packs, landscaped edges and high-count property programs",
    body: "A hollow tube reduces mass and material use. Wall thickness, cap design and impact acceptance should be confirmed instead of treating every tube with the same outside diameter as equivalent.",
  },
];

const applications = [
  {
    title: "Driveways and private roads",
    body: "Keep pavement edges, turning radii and culvert approaches visible after the surface is buried by snow.",
  },
  {
    title: "Snow-plow routes",
    body: "Mark curbs, islands, fire hydrants, drainage ditches and other damage-sensitive boundaries for operators.",
  },
  {
    title: "Parking and commercial sites",
    body: "Build a repeatable marker plan for entrances, walkways, loading areas and seasonal snow-storage zones.",
  },
  {
    title: "Landscape protection",
    body: "Identify lawn edges, sprinkler heads, garden beds and young plantings before winter maintenance begins.",
  },
  {
    title: "Resorts and winter facilities",
    body: "Use high-visibility color coding around service roads, paths and temporary operating boundaries.",
  },
  {
    title: "Temporary site marking",
    body: "Create removable visual references for construction, utility, survey and event layouts where permanent posts are unnecessary.",
  },
];

const selectionSteps = [
  {
    step: "01",
    title: "Map the hazards",
    body: "List every curb, drain, hydrant, edge, obstruction and route transition that must remain visible after snowfall.",
  },
  {
    step: "02",
    title: "Choose the profile",
    body: "Set solid or hollow construction, outside diameter and length from expected impact, ground condition and reuse cycle.",
  },
  {
    step: "03",
    title: "Define visibility",
    body: "Specify rod color plus the number, width, position and required grade of reflective bands. Do not accept “reflective” as the complete tape specification.",
  },
  {
    step: "04",
    title: "Approve the pack",
    body: "Lock the sample, bundle count, labels, barcodes, pallet limits and inspection plan before mass production.",
  },
];

const comparisonRows = [
  {
    topic: "Section",
    solid: "Full round fiberglass section",
    hollow: "Tubular section with controlled wall thickness",
  },
  {
    topic: "Impact reserve",
    solid: "Higher-material starting point for repeated handling",
    hollow: "Must be evaluated with wall thickness and cap detail",
  },
  {
    topic: "Shipping weight",
    solid: "Higher for the same outside diameter and length",
    hollow: "Lower, useful for high-count retail and property packs",
  },
  {
    topic: "Ground condition",
    solid: "Preferred starting point for firmer or frequently frozen ground",
    hollow: "Best where soil and installation method limit tip damage",
  },
  {
    topic: "Commercial fit",
    solid: "Contractor, municipal and reusable fleet programs",
    hollow: "Cost-sensitive wholesale and seasonal programs",
  },
];

const faqItems = [
  {
    question: "Are fiberglass driveway markers the same as snow stakes?",
    answer: "The names often describe the same rod or tube used to show driveway edges and obstacles during snow removal. Specify the complete marker: overall and exposed length, diameter, solid or hollow construction, color, reflective treatment and ground installation. A plain fiberglass stake does not include a reflector unless the order says so.",
  },
  {
    question: "Should I choose 4 ft, 5 ft or 6 ft driveway markers?",
    answer: "Choose from the exposed height needed at the site, then add the embedment required by the soil and installation method. The reflective area must remain visible above the expected snowbank, including plowed snow. A 4 ft, 5 ft or 6 ft overall length is not the installed height; confirm the layout and clearance before ordering.",
  },
  {
    question: "Are orange fiberglass driveway markers reflective?",
    answer: "Orange identifies the rod color. Night visibility depends on the specified reflective bands or reflector and the approach direction. Order the tape color, grade, width and position separately, and evaluate a finished sample on the intended driveway layout.",
  },
  {
    question: "What is a fiberglass snow marker?",
    answer:
      "A fiberglass snow marker is a slender pultruded rod or tube installed before snowfall to keep driveways, curbs, hydrants, drains and other boundaries visible. It is also called a snow stake, driveway marker, snow pole or plow guide.",
  },
  {
    question: "Should I choose a solid or hollow snow stake?",
    answer:
      "Use solid rod as the conservative starting point for contractor fleets, repeated installation and higher handling abuse. Hollow tube can reduce weight and cost for high-count or residential programs, but wall thickness, cap detail and impact acceptance must be specified.",
  },
  {
    question: "Which diameters and lengths are available?",
    answer:
      "The reference program covers 6.35 mm (1/4 in) and 7.9 mm (5/16 in) outside diameters with 610 to 1,829 mm (2 to 6 ft) cut lengths. The released quotation confirms the exact construction, tolerance and available pack quantity for each size.",
  },
  {
    question: "Does reflective tape make a snow marker road-compliant?",
    answer:
      "Not by itself. Tape appearance does not prove a regulated retroreflective-sheeting class or approval for public-road traffic control. If an authority or project requires a specific sheeting standard, color, photometric value or marking, put it on the RFQ and require supporting evidence for the offered tape.",
  },
  {
    question: "How should fiberglass driveway markers be installed?",
    answer:
      "Use a suitable pilot hole or installation tool for hard, rocky or frozen ground and keep the rod supported during insertion. Do not strike an unsupported fiberglass tube or force it against buried utilities. Final embedment and spacing depend on soil, snow depth, visibility and the site hazard plan.",
  },
  {
    question: "What belongs in a wholesale snow-marker RFQ?",
    answer:
      "State solid or hollow construction, diameter, cut length, color, tip and cap detail, reflective-band count and position, tape grade, pack count, total quantity, private-label or barcode requirements, pallet limits, destination and required delivery date.",
  },
  {
    question: "Can a damaged fiberglass driveway marker be repaired?",
    answer: "Replace a split rod, cracked tube or marker with exposed fibers instead of relying on a taped structural repair. If only the reflective band is damaged, inspect the substrate and follow the replacement tape supplier's preparation and application instructions. Recheck visibility and attachment before returning the marker to use.",
  },
];

export default function FiberglassSnowMarkersPage() {
  return (
    <>
      <JsonLd
        data={buildProductFamilyPageSchema({
          name: "Fiberglass Driveway Markers and Snow Stakes",
          description: pageDescription,
          path: pagePath,
          image: heroImage,
          category: "Fiberglass Snow Markers",
          material: [
            "Pultruded fiberglass reinforced polymer",
            "Glass fiber reinforced polymer",
            "Reflective sheeting",
          ],
          schemaType: "ItemPage",
          datePublished: "2026-08-30",
          dateModified: updatedAt,
        })}
      />

      <PageHeader
        tag="Driveway markers & snow stakes"
        line={{ name: "Winter visibility", label: "Snow markers", mark: false }}
        title="Fiberglass driveway markers and snow stakes"
        description="Fiberglass driveway markers help identify pavement edges, curbs and obstacles during snow removal. Configure solid or hollow stakes by height, color, reflective bands and pack count for contractor, property and wholesale programs."
        updated={updatedAt}
        facts={[
          { label: "Diameter", value: "1/4 or 5/16 in" },
          { label: "Length", value: "2–6 ft" },
          { label: "Construction", value: "Solid or hollow" },
          { label: "Reflective bands", value: "1–3" },
        ]}
        actions={{
          primary: { label: "Request a marker quote", href: quoteHref },
          secondary: { label: "Review reference sizes", href: "#reference-sizes", variant: "secondary" },
          stickyMobile: true,
        }}
        figure={
          <Figure number={1} title="Marker configurations" caption="Solid and hollow marker configurations. Final color, diameter, tape layout and end treatment follow the approved sample." bleed>
            <div className="relative aspect-[5/4]">
              <Image
                src={heroImage}
                alt="Orange, yellow, green, blue and red fiberglass snow markers with wraparound reflective bands and pointed tips"
                fill
                preload
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover"
              />
            </div>
          </Figure>
        }
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/pultruded-frp-profiles" },
          { label: "Fiberglass Snow Markers" },
        ]}
      />
      <PageNav
        items={[
          { id: "overview", label: "Overview" },
          { id: "reference-sizes", label: "Reference sizes" },
          { id: "driveway-markers", label: "Height & visibility" },
          { id: "installation", label: "Installation" },
          { id: "construction", label: "Solid or hollow" },
          { id: "applications", label: "Applications" },
          { id: "release", label: "Specification" },
          { id: "faq", label: "FAQ" },
          { id: "quote", label: "Quote" },
        ]}
      />

      <PageSection id="overview" title="Specify the marker as a complete visibility system">
        <div className="grid grid-cols-1 items-start gap-[28px] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-[48px]">
          <div className="space-y-[14px] text-f16 leading-golden text-t2">
            <p className="text-f18 text-t1">
              F1 Composite supplies fiberglass driveway markers and snow stakes as pultruded solid rods or hollow tubes for wholesale packs and project quantities. A useful order defines the section, cut length, color, insertion tip, reflective-band layout and packaging together.
            </p>
            <p>
              Send the target sample or specification before pricing. We return a size-by-size offer with construction, tolerances, tape details, pack count, inspection points and delivery basis clearly separated.
            </p>
          </div>
          <aside className="rounded-card border border-border-default bg-bg2 p-[20px] sm:p-[28px]">
            <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Also called</p>
            <p className="mt-[8px] text-f16 leading-golden text-t1">Snow stakes, driveway markers, snow poles and plow guides.</p>
            <p className="mt-[10px] text-f14 leading-golden text-t2">
              For horticulture, the same pultruded rod construction is supplied as{" "}
              <Link href="/products/fiberglass-stakes#tree-stakes" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">fiberglass tree stakes and plant supports</Link>.
            </p>
          </aside>
        </div>
      </PageSection>

      <PageSection
        id="reference-sizes"
        title="Lock every visible and hidden detail before production"
        tone="muted"
        intro="Two markers can look identical in a listing while using different wall thicknesses, fiberglass content, tape grades or packaging. Use the matrix below as the minimum RFQ structure."
      >
        <div className="relative overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[720px] border-collapse text-left text-f14">
            <caption className="sr-only">Snow marker reference specification</caption>
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Specification item</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Reference starting point</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Order controls</th>
              </tr>
            </thead>
            <tbody>
              {specificationRows.map((row) => (
                <tr key={row.item} className="border-b border-border-default align-top last:border-b-0">
                  <th scope="row" className="whitespace-nowrap px-[14px] py-[10px] font-semibold text-t1">{row.item}</th>
                  <td className="px-[14px] py-[10px] leading-golden text-t1">{row.standard}</td>
                  <td className="px-[14px] py-[10px] leading-golden text-t2">{row.options}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-[16px] max-w-[900px] text-f14 leading-golden text-t3">
          These dimensions and configurations are sourcing references, not an automatic stock commitment. The quotation and approved sample control the order-specific product.
        </p>
      </PageSection>

      <PageSection id="driveway-markers" title="Choose driveway marker height and reflective bands" intro="Start with what the driver needs to see after snow has been plowed. Overall rod length, exposed height and reflective-band position are separate dimensions.">
        <div className="grid gap-[16px] md:grid-cols-3">
          <article className={card}>
            <h3 className="text-f20 font-bold text-t1">4 ft, 5 ft or 6 ft?</h3>
            <p className="mt-[10px] text-f16 leading-golden text-t2">Compare the available lengths against the planned embedment and expected snowbank height. Include piled snow at turns and entrances. A longer marker also needs a suitable diameter, construction and ground support.</p>
            <p className="mt-[12px] text-f14 font-semibold text-t1">Exposed height = overall length − embedment.</p>
          </article>
          <article className={card}>
            <h3 className="text-f20 font-bold text-t1">Orange color and night visibility</h3>
            <p className="mt-[10px] text-f16 leading-golden text-t2">Orange fiberglass driveway markers provide a recognizable daytime reference. For reflective driveway markers, also specify band color, grade, width and height above ground. Color alone does not define the reflective treatment.</p>
          </article>
          <article className={card}>
            <h3 className="text-f20 font-bold text-t1">A finished sample to approve</h3>
            <p className="mt-[10px] text-f16 leading-golden text-t2">Check tape adhesion on the curved rod, cap and tip details, and visibility from the vehicle approach. A wraparound tape marker and a pole with a separate reflector head require different drawings and acceptance checks.</p>
          </article>
        </div>
        <p className="mt-[18px] max-w-[960px] text-f14 leading-golden text-t2">Specify any required sheeting standard separately. <a href="https://store.astm.org/standards/d4956" className="font-semibold text-teal-text underline underline-offset-4">ASTM D4956 covers retroreflective sheeting</a>; its scope excludes minimum performance requirements for devices already in service. Approval of the complete marker and its placement remains a project decision.</p>
      </PageSection>

      <PageSection id="installation" title="How to install fiberglass driveway markers" tone="muted" intro="Use the site layout and the supplied marker's installation instructions. Spacing and embedment depend on soil, approach direction, snow accumulation and the hazards being marked.">
        <ol className="grid gap-[16px] md:grid-cols-2">
          {[
            { title: "Plan the edge before snowfall", body: "Walk the driveway with the property or snow-removal team. Identify bends, culverts, curbs and obstacles, check buried-service locations, and choose positions clear of the planned vehicle and plow path." },
            { title: "Match the tool to the ground", body: "For hard or rocky ground, use the installation method approved for the marker, such as a pilot hole or suitable tool. Support the rod during insertion and avoid striking an unsupported hollow tube." },
            { title: "Check the installed sightline", body: "Confirm that the marker is secure and the reflective area is above the expected snowbank. Review visibility from each approach, including bends and changes in grade, before finalizing the layout." },
            { title: "Inspect through the season", body: "After plowing or impact, check for loose rods, cracks, exposed fibers, missing caps and lifting tape. Replace damaged structural parts and inspect reusable markers before storage and the next installation." },
          ].map((item, index) => (
            <li key={item.title} className={card}>
              <p className="font-mono text-f12 text-t3">Step {index + 1}</p>
              <h3 className="mt-[8px] text-f20 font-bold text-t1">{item.title}</h3>
              <p className="mt-[10px] text-f16 leading-golden text-t2">{item.body}</p>
            </li>
          ))}
        </ol>
      </PageSection>

      <PageSection id="construction" title="Solid rod and hollow tube solve different buying priorities">
        <div className="grid grid-cols-1 gap-[16px] lg:grid-cols-2">
          {constructionOptions.map((option) => (
            <article key={option.name} className="rounded-card border border-border-default bg-white p-[20px] sm:p-[28px]">
              <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">{option.badge}</p>
              <h3 className="mt-[6px] text-f20 font-bold text-t1">{option.name}</h3>
              <p className="mt-[10px] text-f14 font-semibold leading-golden text-t1">{option.bestFor}</p>
              <p className="mt-[8px] text-f14 leading-golden text-t2">{option.body}</p>
            </article>
          ))}
        </div>
        <div className="relative mt-[24px] overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[640px] border-collapse text-left text-f14">
            <caption className="sr-only">Solid and hollow snow stakes compared</caption>
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Decision</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Solid stake</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Hollow stake</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.topic} className="border-b border-border-default align-top last:border-b-0">
                  <th scope="row" className="whitespace-nowrap px-[14px] py-[10px] font-semibold text-t1">{row.topic}</th>
                  <td className="px-[14px] py-[10px] leading-golden text-t2">{row.solid}</td>
                  <td className="px-[14px] py-[10px] leading-golden text-t2">{row.hollow}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>

      <PageSection
        id="applications"
        title="Visibility before the first snowfall"
        tone="muted"
        intro="The best marker plan is installed before boundaries disappear. Color can separate route types, while reflective bands help an operator find the same reference under vehicle lighting and low-contrast weather."
      >
        <div className="grid grid-cols-1 items-start gap-[24px] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-[40px]">
          <Figure number={2} title="Road-edge markers after plowing" note="Illustrative photo" caption="High-visibility fiberglass stakes preserve the road-edge reference after plowing, even when the shoulder and drainage line are buried." bleed>
            <div className="relative aspect-[3/2]">
              <Image
                src={applicationImage}
                alt="Orange fiberglass snow markers lining a plowed mountain road after heavy snowfall"
                fill
                loading="lazy"
                quality={75}
                sizes="(max-width: 1024px) calc(100vw - 68px), 40vw"
                className="object-cover"
              />
            </div>
          </Figure>
          <div className="grid grid-cols-1 gap-[12px] sm:grid-cols-2">
            {applications.map((application) => (
              <article key={application.title} className={card}>
                <h3 className="text-f16 font-bold text-t1">{application.title}</h3>
                <p className="mt-[6px] text-f14 leading-golden text-t2">{application.body}</p>
              </article>
            ))}
          </div>
        </div>
      </PageSection>

      <PageSection id="release" title="Turn a generic snow pole into an order-ready specification">
        <ol className="grid grid-cols-1 gap-[12px] md:grid-cols-2 xl:grid-cols-4">
          {selectionSteps.map((item, index) => (
            <li key={item.step} className={card}>
              <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Step {index + 1}</p>
              <h3 className="mt-[6px] text-f18 font-bold text-t1">{item.title}</h3>
              <p className="mt-[8px] text-f14 leading-golden text-t2">{item.body}</p>
            </li>
          ))}
        </ol>
        <aside className="mt-[16px] rounded-card border border-warn-border bg-warn-bg p-[20px] sm:p-[24px]">
          <h3 className="text-f16 font-bold text-t1">Public-road use needs a separate compliance decision</h3>
          <p className="mt-[6px] max-w-[900px] text-f14 leading-golden text-t2">
            A colored fiberglass stake with reflective tape is not automatically a traffic-control device. Public authorities may control geometry, color, retroreflective performance, placement and approvals. State those requirements explicitly rather than relying on a marketplace description.
          </p>
        </aside>
      </PageSection>

      <PageSection id="faq" title="Fiberglass driveway marker and snow stake questions" tone="muted">
        <FAQList items={faqItems} />
      </PageSection>

      <RelatedLinks
        background="white"
        groups={[
          {
            title: "Related profiles",
            links: [
              { href: "/products/fiberglass-structural-shapes/frp-rod", label: "Pultruded fiberglass round rod" },
              { href: "/products/fiberglass-structural-shapes/frp-tube", label: "Pultruded fiberglass round tube" },
              { href: "/products/custom-pultruded-profiles", label: "Custom pultruded profiles" },
              { href: "/products/fiberglass-stakes#tree-stakes", label: "Fiberglass tree stakes and plant supports" },
              { href: "/products/frp-rebar", label: "FRP rebar" },
              { href: "/pultruded-frp-profiles", label: "All FRP products" },
            ],
          },
          {
            title: "Application markets",
            links: [
              { href: "/industries/infrastructure", label: "Infrastructure" },
              { href: "/industries/construction", label: "Construction" },
              { href: "/industries/industrial", label: "Industrial facilities" },
              { href: "/regions/frp-pultrusion-supplier-usa", label: "North America supply" },
            ],
          },
          {
            title: "Buyer resources",
            links: [
              { href: "/technology/pultrusion-process", label: "Pultrusion process" },
              { href: "/technology/pultrusion-resin-systems", label: "Resin-system selection" },
              { href: "/technology/quality-testing", label: "Quality testing" },
              { href: "/resources/how-to-choose-frp-pultrusion-supplier", label: "Supplier selection guide" },
            ],
          },
        ]}
      />

      <PageSection id="quote" title="Request bulk fiberglass driveway markers" tone="deep">
        <ProductRfq
          product="Fiberglass driveway markers and snow stakes"
          productPath={pagePath}
          quoteHref={quoteHref}
          items={requestItems}
          intro="Send the target sample or specification. We return a size-by-size offer with construction, tolerances, tape details, pack count and delivery basis."
          advisorPrompt="I need fiberglass driveway markers and snow stakes: site and snowbank height [ ], overall and exposed length [ ], ground condition [ ], solid/hollow [ ], diameter [ ], color [ ], reflective-band grade, width and position [ ], pack count [ ], quantity [ ], destination and delivery date [ ]. Build the RFQ checklist and flag anything I have not specified."
        />
      </PageSection>
    </>
  );
}
