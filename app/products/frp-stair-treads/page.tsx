import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AskAICard from "@/components/ai/AskAICard";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import RelatedLinks from "@/components/sections/RelatedLinks";
import JsonLd from "@/components/seo/JsonLd";
import Button from "@/components/ui/Button";
import FAQ from "@/components/ui/FAQ";
import SectionTag from "@/components/ui/SectionTag";
import {
  frpStairTreadImageAssets,
  stairTreadReferenceRows,
  stairTreadSelectionFamilies,
} from "@/content/data/frpStairTreadSpecs";
import { authorsBySlug } from "@/lib/authors";
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

export default function StairTreadCoversPage() {
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
        tag="Stair Access · F1-GRID"
        title="FRP Stair Treads & Fiberglass Stair Tread Covers"
        description="Choose a thin anti-slip cover for a sound existing stair, a molded grating tread for drainage and bidirectional layouts, or a pultruded T-bar tread for longer one-way spans. Reference sizes, decision gates and RFQ inputs are organized below."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products", href: "/pultruded-frp-profiles" }, { label: "FRP Stair Treads" }]}
        actions={{
          primary: { label: "Quote My Tread Schedule", href: "/contact?source=frp-stair-treads&inquiry_type=rfq" },
          secondary: { label: "Compare 3 Options", href: "#choose-your-tread", variant: "secondary" },
          note: "Send quantity × width × depth, substrate photos, environment and destination.",
          stickyMobile: true,
        }}
      />

      <section className="bg-white py-[34px] md:py-[55px]">
        <div className="mx-auto grid max-w-[1280px] gap-[21px] px-[20px] sm:px-[28px] lg:grid-cols-[1.45fr_0.55fr] lg:px-[34px]">
          <figure>
            <div className="relative aspect-[16/9] overflow-hidden rounded-[8px] bg-bg2">
              <Image src={frpStairTreadImageAssets.coverHero} alt="Black coarse-grit fiberglass stair tread covers with high-visibility yellow nosings" fill sizes="(max-width: 1024px) 100vw, 70vw" className="object-cover" quality={85} preload />
            </div>
            <figcaption className="mt-[8px] text-f12 leading-golden text-t3">Supplier-reference retrofit photography. It demonstrates cover geometry and visibility, not an F1 project case study or order-specific fixing detail.</figcaption>
          </figure>
          <aside className="rounded-[8px] border border-teal-border bg-teal-bg p-[21px] sm:p-[34px]">
            <p className="text-f11 font-bold uppercase tracking-[.12em] text-teal-text">Decision in one line</p>
            <h2 className="mt-[8px] text-f24 font-bold text-t1">Keep, replace or span?</h2>
            <dl className="mt-[21px] space-y-[16px]">
              <div><dt className="text-f14 font-bold text-t1">Sound existing step</dt><dd className="mt-[3px] text-f13 text-t2">Use a retrofit cover.</dd></div>
              <div><dt className="text-f14 font-bold text-t1">Drainage or new construction</dt><dd className="mt-[3px] text-f13 text-t2">Use a molded grating tread.</dd></div>
              <div><dt className="text-f14 font-bold text-t1">Longer one-way clear width</dt><dd className="mt-[3px] text-f13 leading-golden text-t2">Shortlist pultruded T-bar, then verify the load table.</dd></div>
            </dl>
            <Button href="#stair-tread-specifications" variant="secondary" className="mt-[24px] w-full">View Specification Matrix</Button>
          </aside>
        </div>
      </section>

      <section id="choose-your-tread" className="scroll-mt-[88px] bg-bg2 py-[55px] md:py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
          <SectionTag>Choose in 60 Seconds</SectionTag>
          <h2 className="mt-[13px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">Three tread families, three different jobs</h2>
          <p className="mt-[13px] max-w-[920px] text-f15 leading-golden text-t2">Start with the existing stair and required load path. Product depth comes after that decision—not before it.</p>
          <div className="mt-[34px] grid gap-[21px] lg:grid-cols-3">
            {stairTreadSelectionFamilies.map((family, index) => (
              <article key={family.name} className="overflow-hidden rounded-[8px] border border-border-default bg-white">
                <div className="relative aspect-[16/9] bg-bg2"><Image src={family.image} alt={family.imageAlt} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover" /></div>
                <div className="p-[21px] sm:p-[24px]">
                  <div className="flex items-center gap-[10px]"><span className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-teal text-f12 font-bold text-white">{index + 1}</span><p className="text-f11 font-bold uppercase tracking-[.1em] text-teal-text">{family.decision}</p></div>
                  <h3 className="mt-[13px] text-f21 font-bold text-t1">{family.name}</h3>
                  <p className="mt-[13px] text-f14 leading-golden text-t2"><strong className="text-t1">Best for:</strong> {family.bestFor}</p>
                  <p className="mt-[10px] text-f14 leading-golden text-t2"><strong className="text-t1">Shortlist:</strong> {family.shortlist}</p>
                  <p className="mt-[10px] border-l-2 border-amber-400 pl-[12px] text-f13 leading-golden text-t2">{family.avoidWhen}</p>
                  <Link href={family.href} className="mt-[18px] inline-flex min-h-[40px] items-center font-semibold text-teal-text hover:underline">Review this option <span aria-hidden className="ml-[5px]">→</span></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-[55px] md:py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
          <SectionTag>Four Decision Gates</SectionTag>
          <h2 className="mt-[13px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">Resolve these before comparing prices</h2>
          <div className="mt-[34px] grid gap-[13px] md:grid-cols-2">
            {decisionChecks.map(([label, title, body], index) => <article key={label} className="rounded-[8px] border border-border-default bg-bg2 p-[21px] sm:p-[24px]"><p className="text-f11 font-bold uppercase tracking-[.1em] text-teal-text">{index + 1} · {label}</p><h3 className="mt-[8px] text-f19 font-bold text-t1">{title}</h3><p className="mt-[10px] text-f14 leading-golden text-t2">{body}</p></article>)}
          </div>
        </div>
      </section>

      <section id="stair-tread-specifications" className="scroll-mt-[88px] bg-bg2 py-[55px] md:py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
          <SectionTag>Selection Reference Matrix</SectionTag>
          <h2 className="mt-[13px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">Cover sizes and full-tread shortlists</h2>
          <p className="mt-[13px] max-w-[980px] text-f15 leading-golden text-t2">The two cover rows are metric conversions of the supplied manufacturer reference. Molded and pultruded rows are selection families tied to F1&apos;s dedicated grating data. None is an order code, guaranteed stock position or certified load value.</p>
          <p className="mt-[21px] rounded-[8px] border border-amber-200 bg-amber-50 px-[18px] py-[15px] text-f13 leading-golden text-t2"><strong className="text-t1">Release boundary:</strong> covers rely on the existing step. Complete grating treads require an approved load/span check, support detail and fabrication drawing.</p>
          <div id="cover-reference-sizes" className="mt-[34px] scroll-mt-[88px] overflow-x-auto rounded-[8px] border border-border-default bg-white">
            <table className="w-full min-w-[1120px] border-collapse text-left" aria-label="FRP stair tread selection reference matrix">
              <thead className="bg-deep text-white"><tr>{["Family", "Best for", "Tread depth", "Length / width", "Structural depth", "Surface & nosing", "Release basis"].map((head) => <th key={head} className="px-[16px] py-[14px] text-f11 font-bold uppercase tracking-wide">{head}</th>)}</tr></thead>
              <tbody>{stairTreadReferenceRows.map((row) => <tr key={row.family} className="border-t border-border-default align-top"><th className="px-[16px] py-[14px] text-f13 font-bold text-t1">{row.family}</th><td className="px-[16px] py-[14px] text-f13 leading-golden text-t2">{row.bestFor}</td><td className="px-[16px] py-[14px] text-f13 font-semibold text-teal-text">{row.treadDepth}</td><td className="px-[16px] py-[14px] text-f13 leading-golden text-t2">{row.lengthOrWidth}</td><td className="px-[16px] py-[14px] text-f13 text-t2">{row.structuralDepth}</td><td className="px-[16px] py-[14px] text-f13 leading-golden text-t2">{row.surfaceAndNosing}</td><td className="px-[16px] py-[14px] text-f13 leading-golden text-t2">{row.releaseBasis}</td></tr>)}</tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-white py-[55px] md:py-[89px]">
        <div className="mx-auto grid max-w-[1280px] gap-[34px] px-[20px] sm:px-[28px] lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-[34px]">
          <div><SectionTag>Measure Once</SectionTag><h2 className="mt-[13px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">Dimension the finished walking surface</h2><p className="mt-[13px] text-f15 leading-golden text-t2">Record every flight as quantity × width L × tread depth D × nose return H. Note rear obstructions, side clearances and whether the existing nosing projects beyond the riser.</p><div className="mt-[21px] rounded-[8px] border border-border-default bg-bg2 p-[13px] sm:p-[21px]"><MeasurementDiagram /></div></div>
          <aside className="rounded-[8px] border border-border-default bg-bg2 p-[21px] sm:p-[34px]"><p className="text-f11 font-bold uppercase tracking-[.1em] text-teal-text">RFQ checklist</p><h3 className="mt-[8px] text-f24 font-bold text-t1">Eight inputs for a qualified quote</h3><ol className="mt-[21px] space-y-[11px]">{measurementInputs.map((input, index) => <li key={input} className="flex gap-[11px] text-f14 leading-golden text-t2"><span className="flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full bg-white text-f11 font-bold text-teal-text">{index + 1}</span><span>{input}</span></li>)}</ol><Button href="/contact?source=stair-tread-checklist&inquiry_type=rfq" className="mt-[24px] w-full">Send Tread Schedule</Button></aside>
        </div>
      </section>

      <section className="bg-bg2 py-[55px] md:py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
          <div className="grid gap-[21px] lg:grid-cols-2">
            <figure className="overflow-hidden rounded-[8px] border border-border-default bg-white"><div className="relative aspect-[4/3]"><Image src={frpStairTreadImageAssets.retrofitBefore} alt="Existing metal grating stair before fiberglass tread covers" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /></div><figcaption className="p-[16px] text-f13 leading-golden text-t2"><strong className="text-t1">Before retrofit:</strong> inspect the tread, stringers and connections. Surface wear can be covered; structural loss cannot.</figcaption></figure>
            <figure className="overflow-hidden rounded-[8px] border border-border-default bg-white"><div className="relative aspect-[4/3]"><Image src={frpStairTreadImageAssets.fastenerDetail} alt="Large washer and fastener securing an FRP tread cover to metal grating" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /></div><figcaption className="p-[16px] text-f13 leading-golden text-t2"><strong className="text-t1">Mechanical fixing reference:</strong> washer bearing, bolt type, underside access and spacing must match the approved detail.</figcaption></figure>
          </div>
          <p className="mt-[10px] text-f12 leading-golden text-t3">Supplier-reference application photography; shown for selection context, not as an F1 project case study.</p>
        </div>
      </section>

      <section className="bg-white py-[55px] md:py-[89px]">
        <div className="mx-auto grid max-w-[1280px] gap-[34px] px-[20px] sm:px-[28px] lg:grid-cols-[.92fr_1.08fr] lg:items-start lg:px-[34px]">
          <figure><div className="relative aspect-[4/5] overflow-hidden rounded-[8px]"><Image src={frpStairTreadImageAssets.fullStaircase} alt="Complete industrial access stair using FRP treads and yellow handrails" fill sizes="(max-width: 1024px) 100vw, 44vw" className="object-cover" /></div><figcaption className="mt-[8px] text-f12 leading-golden text-t3">Complete-stair context: treads, stringers, platform, handrail and connections are coordinated as one system.</figcaption></figure>
          <div><SectionTag>When a Cover Is Not Enough</SectionTag><h2 className="mt-[13px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">Replace the tread—or coordinate the complete stair</h2><p className="mt-[13px] text-f17 leading-golden text-t2">If the tread has lost section, the connection is unreliable, drainage is essential or the stair is new, move to a complete grating tread.</p><div className="mt-[24px] grid gap-[13px] sm:grid-cols-2">{[["Molded tread", "Mesh, depth, cut, nosing, bearing and clip/end-plate detail."], ["Pultruded T-bar", "Bearing direction, series, span, loads, deflection and end plates."], ["Handrail interface", "Stair slope, rail height, returns, posts and load basis."], ["Release documents", "Schedule, drawing, load table, resin/surface spec and hardware BOM."]].map(([title, body]) => <article key={title} className="rounded-[8px] border border-border-default bg-bg2 p-[18px]"><h3 className="text-f16 font-bold text-t1">{title}</h3><p className="mt-[7px] text-f13 leading-golden text-t2">{body}</p></article>)}</div><div className="mt-[24px] flex flex-wrap gap-[10px]"><Button href="/products/molded-frp-grating" variant="secondary">Molded Grating Data</Button><Button href="/products/frp-gratings" variant="secondary">Pultruded T-Bar Data</Button></div></div>
        </div>
      </section>

      <section className="bg-bg2 py-[55px] md:py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]"><SectionTag>Cover Installation Sequence</SectionTag><h2 className="mt-[13px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">Survey, dry-fit, fasten, inspect</h2><p className="mt-[13px] max-w-[930px] text-f15 leading-golden text-t2">This is a selection-stage overview. The order drawing controls fastener material, holes, spacing, adhesive if used and cut-edge sealing.</p><ol className="mt-[34px] grid gap-[13px] md:grid-cols-2 lg:grid-cols-4">{installationSteps.map(([title, body], index) => <li key={title} className="rounded-[8px] border border-border-default bg-white p-[21px]"><span className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-deep text-f12 font-bold text-white">{index + 1}</span><h3 className="mt-[13px] text-f17 font-bold text-t1">{title}</h3><p className="mt-[9px] text-f13 leading-golden text-t2">{body}</p></li>)}</ol></div>
      </section>

      <RelatedLinks groups={[
        { title: "Complete the access system", links: [{ href: "/products/frp-handrail-systems", label: "Fiberglass handrail systems" }, { href: "/products/frp-ladders", label: "FRP fixed access ladders" }, { href: "/products/molded-frp-grating", label: "Molded grating panels & clips" }, { href: "/products/frp-gratings", label: "Pultruded T-bar & I-bar grating" }, { href: "/case-studies/factory-access-staircase", label: "Factory access staircase case study" }] },
        { title: "Specify & approve", links: [{ href: "#stair-tread-specifications", label: "Stair-tread selection matrix" }, { href: "/technology/quality-testing", label: "Quality & testing" }, { href: "/resources/technical-data", label: "Technical data & load tables" }, { href: "/resources/frp-pultrusion-fob-ddp-export-guide", label: "FOB, DDP & export guide" }] },
      ]} />

      <section className="bg-bg2 py-[55px] md:py-[89px]"><div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]"><FAQ items={faqItems} /></div></section>
      <AskAICard prefill="I need FRP stair treads. Existing stair and substrate [details], option [cover / molded / pultruded / unsure], quantity and dimensions [width × depth × nose], span and loads for full treads [details], environment and surface/fire/accessibility requirements [details], destination [city/country]. Please recommend the family and list missing RFQ inputs." />
      <InnerCTA title="Send your tread schedule—get a qualified shortlist before pricing." />
    </>
  );
}
