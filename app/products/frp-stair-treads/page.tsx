import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import ProductRfq from "@/components/products/ProductRfq";
import RelatedLinks from "@/components/sections/RelatedLinks";
import JsonLd from "@/components/seo/JsonLd";
import Button from "@/components/ui/Button";
import { FAQList } from "@/components/ui/FAQ";
import Figure from "@/components/ui/Figure";
import {
  frpStairTreadImageAssets,
  stairTreadReferenceRows,
  stairTreadSelectionFamilies,
} from "@/content/data/frpStairTreadSpecs";
import { authorsBySlug, reviewerCredit } from "@/lib/authors";
import { buildPageMetadata, buildProductFamilyPageSchema } from "@/lib/seo";

const pageTitle = "FRP Stair Treads & Fiberglass Stair Tread Covers";
const pageDescription =
  "Compare FRP stair tread covers, molded grating treads and pultruded T-bar treads. See reference sizes, surfaces, measurement inputs and release checks.";
const pagePath = "/products/frp-stair-treads";
const publishedAt = "2026-04-04";
const updatedAt = "2026-08-30";
const author = authorsBySlug["yifan-liu"];
const reviewer = authorsBySlug["haifeng-gong"];

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  image: frpStairTreadImageAssets.coverHero,
});

const decisionChecks = [
  ["Existing structure", "Is the step still sound?", "Yes: shortlist a cover. No or uncertain: repair the substrate or replace the complete tread. A cover is not structural rehabilitation."],
  ["Drainage", "Must water or debris pass through?", "Choose molded or pultruded open grating. Use a solid cover only where it will not create a drainage or cleaning problem."],
  ["Span and load", "What clear width carries the load?", "A cover relies on the old step. A new tread needs support spacing, uniform and point loads, deflection limit and bearing detail."],
  ["Access rules", "Which opening and slip rules apply?", "State accessibility, heel-opening, slip, fire and color-contrast requirements. A grit label alone is not a compliance certificate."],
] as const;

const measurementInputs = [
  "Quantity by flight, including mixed sizes",
  "Finished tread width L and depth D",
  "Nosing return H and front-edge clearance",
  "Existing substrate and stringer photos",
  "For full treads: clear span, loads and deflection limit",
  "Chemical, temperature, UV, washdown and electrical exposure",
  "Surface, nosing color, resin and test-document requirements",
  "Delivery destination and required date",
] as const;

const installationSteps = [
  ["Survey and make safe", "Remove loose coatings and verify that every existing tread, connection and stringer remains structurally adequate. Repair corrosion, spalling or movement before covering."],
  ["Dry-fit and mark", "Set each cut cover in place, confirm nosing alignment and clearances, then mark the approved fixing pattern. Do not force a cover over protrusions."],
  ["Predrill and fasten", "Use the approved hole clearance, washer and corrosion-compatible hardware. The supplier reference starts about 152 mm from each end and adds fixings at roughly 610 mm intervals where required; the F1 drawing controls."],
  ["Inspect before reopening", "Check seating, fastener heads, nosing alignment, sealed cut edges where required, surface cleanliness and final security before returning the stair to service."],
] as const;

const faqItems = [
  {
    question: "Should I choose a tread cover or a complete FRP grating tread?",
    answer: "Use a cover when the existing steel, concrete, timber or masonry step is structurally sound and only needs a durable anti-slip surface and visible nosing. Use a complete molded or pultruded tread for new construction, drainage, or when the old tread cannot be relied on structurally.",
  },
  {
    question: "What reference sizes are available for FRP stair tread covers?",
    answer: "The supplied manufacturer reference lists 305 mm or 343 mm tread depth, both 3,658 mm long and 3.2 mm thick (12 or 13.5 in × 144 in × 1/8 in). These are selection references, not F1 inventory promises. The quotation confirms cut length, nose return, resin, color, tolerances and availability.",
  },
  {
    question: "Can a thin fiberglass cover repair a rusted or cracked stair?",
    answer: "No. A cover improves the walking surface but does not replace the capacity of a corroded steel tread, spalled concrete step, loose timber board or failed stringer. Assess and repair the substrate, or replace the complete tread, before installation.",
  },
  {
    question: "Which full tread is better: molded grating or pultruded T-bar?",
    answer: "Molded grating is bidirectional and suits wet corrosive duty, irregular cutouts and square- or mini-mesh layouts. Pultruded T-bar carries primarily in the bearing-bar direction and is the usual shortlist when longer one-way spans or directional stiffness govern. The load table and approved drawing decide the final series.",
  },
  {
    question: "How are covers fixed to existing steel stairs?",
    answer: "Clean and dry the surface, dry-fit and predrill the cover, then use the approved mechanical fixing and washer arrangement. The supplier reference places end fixings about 152 mm from each end and adds fixings at about 610 mm intervals as required. Substrate and exposure can change that layout, so the F1 detail controls.",
  },
  {
    question: "Are grit surfaces automatically slip compliant?",
    answer: "No. Coarse or fine grit describes construction, not a universal compliance result. State the required test method and acceptance value in the RFQ so the available surface and order-specific evidence can be confirmed before release.",
  },
  {
    question: "What resin and fire options are available?",
    answer: "Isophthalic polyester is a common baseline, with vinyl ester for more demanding chemical exposure and fire-retardant formulations where specified. Resin name alone does not establish compatibility or a fire class; provide the chemical, concentration, temperature and required report standard.",
  },
  {
    question: "What should I send for a fast quotation?",
    answer: "Send quantity, width, depth and nose return; substrate and stringer photos; load and clear support spacing for complete treads; exposure, surface, color, resin/fire documentation, hardware preference and destination. A marked photo or drawing prevents the most common sizing mistakes.",
  },
];

function MeasurementDiagram() {
  return (
    <svg viewBox="0 0 760 390" role="img" aria-labelledby="stair-measure-title stair-measure-desc" className="h-auto w-full">
      <title id="stair-measure-title">FRP stair tread cover measurement diagram</title>
      <desc id="stair-measure-desc">Side section of a yellow L-shaped cover over an existing dark step, with tread depth D, nose return H and thickness t marked.</desc>
      <defs>
        <marker id="stair-arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto-start-reverse"><path d="M0 0L8 4L0 8Z" fill="#007a74" /></marker>
        <pattern id="stair-grit" width="10" height="10" patternUnits="userSpaceOnUse"><circle cx="2" cy="3" r="1.3" fill="#8a6a00" /><circle cx="7" cy="7" r="1.1" fill="#8a6a00" /></pattern>
      </defs>
      <rect x="55" y="38" width="650" height="310" rx="18" fill="#f4f7f8" />
      <path d="M165 190H610V292H240V245H165Z" fill="#4b566b" />
      <path d="M137 162H625V225H597V188H137Z" fill="#f4c400" />
      <path d="M137 162H625V175H137Z" fill="url(#stair-grit)" />
      <rect x="137" y="162" width="64" height="63" fill="#ffd600" opacity=".95" />
      <line x1="137" y1="124" x2="625" y2="124" stroke="#007a74" strokeWidth="3" markerStart="url(#stair-arrow)" markerEnd="url(#stair-arrow)" />
      <line x1="137" y1="134" x2="137" y2="158" stroke="#007a74" strokeWidth="2" /><line x1="625" y1="134" x2="625" y2="158" stroke="#007a74" strokeWidth="2" />
      <text x="381" y="107" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0b1730">Tread depth D</text>
      <line x1="102" y1="162" x2="102" y2="225" stroke="#007a74" strokeWidth="3" markerStart="url(#stair-arrow)" markerEnd="url(#stair-arrow)" />
      <text x="84" y="196" textAnchor="middle" fontSize="17" fontWeight="700" fill="#0b1730" transform="rotate(-90 84 196)">Nose H</text>
      <line x1="638" y1="162" x2="638" y2="188" stroke="#007a74" strokeWidth="3" markerStart="url(#stair-arrow)" markerEnd="url(#stair-arrow)" /><text x="653" y="181" fontSize="17" fontWeight="700" fill="#0b1730">t</text>
      <text x="405" y="240" textAnchor="middle" fontSize="17" fontWeight="700" fill="#fff">Existing structural tread</text>
      <text x="380" y="327" textAnchor="middle" fontSize="16" fill="#4b566b">Width L is measured left-to-right, perpendicular to this section</text>
    </svg>
  );
}

// The measurement inputs, grouped as the quote block's checklist.
const requestItems = [
  { title: "Tread schedule", text: "Quantity by flight with the finished width L, tread depth D and nose return H, including mixed sizes." },
  { title: "Existing stair", text: "Substrate and stringer photos. For complete treads, the clear span, loads and deflection limit." },
  { title: "Exposure and surface", text: "Chemicals, temperature, UV, washdown and electrical exposure; surface, nosing color, resin and test documents." },
  { title: "Destination and date", text: "Delivery destination, required date and any hardware preference." },
];

const fullTreadChecks = [
  ["Molded tread", "Mesh, depth, cut, nosing, bearing and clip/end-plate detail."],
  ["Pultruded T-bar", "Bearing direction, series, span, loads, deflection and end plates."],
  ["Handrail interface", "Stair slope, rail height, returns, posts and load basis."],
  ["Release documents", "Schedule, drawing, load table, resin/surface spec and hardware BOM."],
] as const;

export default function StairTreadCoversPage() {
  const quoteHref = "/contact?source=frp-stair-treads&inquiry_type=rfq";
  return (
    <>
      <JsonLd data={buildProductFamilyPageSchema({
        name: "FRP Stair Treads and Fiberglass Stair Tread Covers",
        description: pageDescription,
        path: pagePath,
        image: frpStairTreadImageAssets.coverHero,
        category: "Fiberglass stair treads and anti-slip tread covers",
        productLine: "F1-GRID Access Systems",
        schemaType: "CollectionPage",
        datePublished: publishedAt,
        dateModified: updatedAt,
        author: { name: author.fullName, jobTitle: author.jobTitle, path: `/about/authors/${author.slug}` },
        reviewedBy: { name: reviewer.fullName, jobTitle: reviewer.jobTitle, path: `/about/authors/${reviewer.slug}` },
        material: ["Fiberglass reinforced polymer", "Isophthalic polyester resin", "Vinyl ester resin"],
        additionalProperty: [
          { name: "Product families", value: "Retrofit covers, molded grating treads, pultruded T-bar treads" },
          { name: "Cover references", value: "305 or 343 mm depth × 3,658 mm length × 3.2 mm thickness" },
          { name: "Release basis", value: "F1 quotation, load table where applicable, approved tread and fixing drawing" },
        ],
      })} />

      <PageHeader
        updated={updatedAt}
        reviewer={reviewerCredit(reviewer)}
        tag="Stair treads"
        line={{ name: "F1-GRID", label: "Stair treads" }}
        title="FRP Stair Treads & Fiberglass Stair Tread Covers"
        description="Choose a thin anti-slip cover for a sound existing stair, a molded grating tread for drainage and bidirectional layouts, or a pultruded T-bar tread for longer one-way spans. Reference sizes, decision gates and RFQ inputs are organized below."
        facts={[
          { label: "Tread families", value: "Cover, molded, T-bar" },
          { label: "Cover reference", value: "305 or 343 mm deep" },
          { label: "Cover thickness", value: "3.2 mm" },
          { label: "Release", value: "Approved drawing" },
        ]}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products", href: "/pultruded-frp-profiles" }, { label: "FRP Stair Treads" }]}
        actions={{
          primary: { label: "Quote my tread schedule", href: quoteHref },
          secondary: { label: "Compare 3 options", href: "#choose-your-tread", variant: "secondary" },
          stickyMobile: true,
        }}
        figure={
          <Figure number={1} title="Retrofit tread covers" note="Supplier photo" caption="Supplier-reference retrofit photography. It demonstrates cover geometry and visibility, not an F1 project case study or order-specific fixing detail." bleed>
            <div className="relative aspect-[16/9]">
              <Image src={frpStairTreadImageAssets.coverHero} alt="Black coarse-grit fiberglass stair tread covers with high-visibility yellow nosings" fill sizes="(max-width: 1023px) 94vw, 44vw" className="object-cover" quality={85} preload />
            </div>
          </Figure>
        }
      />

      <PageNav
        items={[
          { id: "choose-your-tread", label: "Options" },
          { id: "gates", label: "Decision gates" },
          { id: "stair-tread-specifications", label: "Sizes" },
          { id: "measure", label: "Measure" },
          { id: "full-treads", label: "Full treads" },
          { id: "installation", label: "Installation" },
          { id: "faq", label: "FAQ" },
          { id: "quote", label: "Quote" },
        ]}
      />

      <PageSection id="choose-your-tread" title="Three tread families, three different jobs" intro="Start with the existing stair and required load path. Product depth comes after that decision—not before it.">
        <div className="grid grid-cols-1 gap-[16px] lg:grid-cols-3">
          {stairTreadSelectionFamilies.map((family, index) => (
            <article key={family.name} className="flex flex-col overflow-hidden rounded-card border border-border-default bg-white">
              <div className="relative aspect-[16/9] bg-bg2"><Image src={family.image} alt={family.imageAlt} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover" /></div>
              <div className="flex flex-1 flex-col p-[20px] sm:p-[24px]">
                <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Option {index + 1} · {family.decision}</p>
                <h3 className="mt-[6px] text-f20 font-bold text-t1">{family.name}</h3>
                <p className="mt-[12px] text-f14 leading-golden text-t2"><strong className="text-t1">Best for:</strong> {family.bestFor}</p>
                <p className="mt-[8px] text-f14 leading-golden text-t2"><strong className="text-t1">Shortlist:</strong> {family.shortlist}</p>
                <p className="mt-[8px] border-l-2 border-warn-border pl-[12px] text-f14 leading-golden text-t2">{family.avoidWhen}</p>
                <Link href={family.href} className="mt-auto pt-[16px] text-f14 font-semibold text-teal-text underline underline-offset-4 hover:text-teal">Review this option</Link>
              </div>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection id="gates" title="Four decision gates" tone="muted" intro="Resolve these before comparing prices.">
        <div className="grid grid-cols-1 gap-[12px] md:grid-cols-2">
          {decisionChecks.map(([label, title, body], index) => (
            <article key={label} className="rounded-card border border-border-default bg-white p-[20px] sm:p-[24px]">
              <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Gate {index + 1} · {label}</p>
              <h3 className="mt-[6px] text-f18 font-bold text-t1">{title}</h3>
              <p className="mt-[8px] text-f14 leading-golden text-t2">{body}</p>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection
        id="stair-tread-specifications"
        title="Cover sizes and full-tread shortlists"
        intro="The two cover rows are metric conversions of the supplied manufacturer reference. Molded and pultruded rows are selection families tied to F1's dedicated grating data. None is an order code, guaranteed stock position or certified load value."
      >
        <p className="rounded-card border border-warn-border bg-warn-bg px-[16px] py-[12px] text-f14 leading-golden text-t2"><strong className="text-t1">Release boundary:</strong> covers rely on the existing step. Complete grating treads require an approved load/span check, support detail and fabrication drawing.</p>
        <div id="cover-reference-sizes" className="relative mt-[16px] scroll-mt-[128px] overflow-x-auto rounded-card border border-border-default bg-white" role="region" aria-label="FRP stair tread selection reference matrix" tabIndex={0}>
          <table className="w-full min-w-[1120px] border-collapse text-left text-f14">
            <thead><tr className="border-b border-border-default bg-bg2">{["Family", "Best for", "Tread depth", "Length / width", "Structural depth", "Surface & nosing", "Release basis"].map((head) => <th key={head} scope="col" className="px-[14px] py-[10px] font-semibold text-t1">{head}</th>)}</tr></thead>
            <tbody>{stairTreadReferenceRows.map((row) => <tr key={row.family} className="border-b border-border-default align-top last:border-b-0"><th scope="row" className="px-[14px] py-[12px] font-semibold text-t1">{row.family}</th><td className="px-[14px] py-[12px] leading-golden text-t2">{row.bestFor}</td><td className="px-[14px] py-[12px] font-semibold text-t1">{row.treadDepth}</td><td className="px-[14px] py-[12px] leading-golden text-t2">{row.lengthOrWidth}</td><td className="px-[14px] py-[12px] text-t2">{row.structuralDepth}</td><td className="px-[14px] py-[12px] leading-golden text-t2">{row.surfaceAndNosing}</td><td className="px-[14px] py-[12px] leading-golden text-t2">{row.releaseBasis}</td></tr>)}</tbody>
          </table>
        </div>
      </PageSection>

      <PageSection id="measure" title="Dimension the finished walking surface" tone="muted" intro="Record every flight as quantity × width L × tread depth D × nose return H. Note rear obstructions, side clearances and whether the existing nosing projects beyond the riser.">
        <div className="grid grid-cols-1 items-start gap-[24px] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-[48px]">
          <Figure number={2} title="Cover measurement">
            <MeasurementDiagram />
          </Figure>
          <aside className="rounded-card border border-border-default bg-white p-[20px] sm:p-[28px]">
            <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">RFQ checklist</p>
            <h3 className="mt-[6px] text-f20 font-bold text-t1">Eight inputs for a qualified quote</h3>
            <ol className="mt-[16px] divide-y divide-border-default border-y border-border-default">
              {measurementInputs.map((input, index) => (
                <li key={input} className="flex gap-[12px] py-[9px] text-f14 leading-golden text-t2">
                  <span className="w-[20px] shrink-0 font-mono text-f12 leading-[1.9] text-t3">{index + 1}</span>
                  <span>{input}</span>
                </li>
              ))}
            </ol>
            <Button href="/contact?source=stair-tread-checklist&inquiry_type=rfq" className="mt-[20px] w-full">Send tread schedule</Button>
          </aside>
        </div>
      </PageSection>

      <PageSection id="full-treads" title="When a cover is not enough" intro="Replace the tread—or coordinate the complete stair. If the tread has lost section, the connection is unreliable, drainage is essential or the stair is new, move to a complete grating tread.">
        <div className="grid grid-cols-1 items-start gap-[24px] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-[48px]">
          <Figure number={3} title="Complete access stair" note="Supplier photo" caption="Treads, stringers, platform, handrail and connections are coordinated as one system." bleed>
            <div className="relative aspect-[4/5]"><Image src={frpStairTreadImageAssets.fullStaircase} alt="Complete industrial access stair using FRP treads and yellow handrails" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" /></div>
          </Figure>
          <div>
            <div className="grid grid-cols-1 gap-[12px] sm:grid-cols-2">
              {fullTreadChecks.map(([title, body]) => (
                <article key={title} className="rounded-card border border-border-default bg-white p-[18px]">
                  <h3 className="text-f16 font-bold text-t1">{title}</h3>
                  <p className="mt-[6px] text-f14 leading-golden text-t2">{body}</p>
                </article>
              ))}
            </div>
            <div className="mt-[20px] flex flex-wrap gap-[10px]">
              <Button href="/products/molded-frp-grating" variant="secondary">Molded grating data</Button>
              <Button href="/products/frp-gratings" variant="secondary">Pultruded T-bar data</Button>
            </div>
          </div>
        </div>
      </PageSection>

      <PageSection id="installation" title="Survey, dry-fit, fasten, inspect" tone="muted" intro="This is a selection-stage overview. The order drawing controls fastener material, holes, spacing, adhesive if used and cut-edge sealing.">
        <ol className="grid grid-cols-1 gap-[12px] md:grid-cols-2 lg:grid-cols-4">
          {installationSteps.map(([title, body], index) => (
            <li key={title} className="rounded-card border border-border-default bg-white p-[20px]">
              <span className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Step {index + 1}</span>
              <h3 className="mt-[4px] text-f16 font-bold text-t1">{title}</h3>
              <p className="mt-[8px] text-f14 leading-golden text-t2">{body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-[16px] grid grid-cols-1 gap-[16px] lg:grid-cols-2">
          <Figure number={4} title="Before retrofit" note="Supplier photo" caption="Inspect the tread, stringers and connections. Surface wear can be covered; structural loss cannot." bleed>
            <div className="relative aspect-[4/3]"><Image src={frpStairTreadImageAssets.retrofitBefore} alt="Existing metal grating stair before fiberglass tread covers" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /></div>
          </Figure>
          <Figure number={5} title="Mechanical fixing" note="Supplier photo" caption="Washer bearing, bolt type, underside access and spacing must match the approved detail." bleed>
            <div className="relative aspect-[4/3]"><Image src={frpStairTreadImageAssets.fastenerDetail} alt="Large washer and fastener securing an FRP tread cover to metal grating" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /></div>
          </Figure>
        </div>
      </PageSection>

      <PageSection id="faq" title="Questions buyers ask">
        <FAQList items={faqItems} />
      </PageSection>

      <RelatedLinks groups={[
        { title: "Complete the access system", links: [{ href: "/products/frp-handrail-systems", label: "Fiberglass handrail systems" }, { href: "/products/frp-ladders", label: "FRP fixed access ladders" }, { href: "/products/grating", label: "Fiberglass grating: molded and pultruded" }, { href: "/products/molded-frp-grating", label: "Molded grating panels & clips" }, { href: "/products/frp-gratings", label: "Pultruded T-bar & I-bar grating" }, { href: "/case-studies/factory-access-staircase", label: "Factory access staircase case study" }] },
        { title: "Specify & approve", links: [{ href: "/technology/quality-testing", label: "Quality & testing" }, { href: "/resources/technical-data", label: "Technical data & load tables" }, { href: "/resources/frp-pultrusion-fob-ddp-export-guide", label: "FOB, DDP & export guide" }, { href: "/tools/access-geometry-checker", label: "Stair geometry checker (OSHA, ISO 14122-3, IBC)" }] },
      ]} />

      <PageSection id="quote" title="Quote stair treads" tone="deep">
        <ProductRfq
          product="FRP stair treads"
          productPath={pagePath}
          quoteHref={quoteHref}
          items={requestItems}
          intro="Send the tread schedule, photos of the existing stair, the exposure and the destination."
          advisorPrompt="I need FRP stair treads. Existing stair and substrate [details], option [cover / molded / pultruded / unsure], quantity and dimensions [width × depth × nose], span and loads for full treads [details], environment and surface/fire/accessibility requirements [details], destination [city/country]. Please recommend the family and list missing RFQ inputs."
        />
      </PageSection>
    </>
  );
}
