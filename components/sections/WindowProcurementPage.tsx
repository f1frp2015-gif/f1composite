import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import DocumentCard, { libraryCard } from "@/components/downloads/DocumentCard";
import ProductRfq from "@/components/products/ProductRfq";
import RelatedLinks from "@/components/sections/RelatedLinks";
import JsonLd from "@/components/seo/JsonLd";
import Button from "@/components/ui/Button";
import { FAQList } from "@/components/ui/FAQ";
import Figure from "@/components/ui/Figure";
import WindowSystemExplorer from "@/components/sections/WindowSystemExplorer";
import WindowTypesGrid from "@/components/sections/WindowTypesGrid";
import { WindowBuyerPaths, WindowComponentMap, WindowEvidenceCards, WindowPackingGuide, WindowPurchaseFlow, WindowSampleGuide, WindowScopeTable } from "@/components/sections/WindowBuyingGuide";
import { windowRequestItems } from "@/content/data/windowBuying";
import { windowProcurement, windowSurfaceFinish } from "@/content/data/windowProcurement";
import systems from "@/content/data/windowSystems.json";
import { assembleDocuments } from "@/lib/documents";
import { buildProductFamilyPageSchema } from "@/lib/seo";
import { buildWindowRfqHref } from "@/lib/windowInquiry";

// Last content review of both routes; shown in the page header and used as dateModified.
const updatedAt = "2026-09-27";

const catalog = "/downloads/f1composite-frp-window-door-catalog.pdf";
const link = "inline-flex min-h-[44px] items-center text-f14 font-semibold text-teal-text hover:text-teal";

/**
 * The two window buying routes on one template: system profiles for local
 * fabrication (/products/window-door-profiles) and finished units built to a
 * window schedule (/products/fiberglass-windows-doors). Sections that only
 * one route needs (the component map and samples for profiles, the operation
 * diagrams and the glass/hardware/wall checklist for finished units) switch
 * on the mode; the section order and tones stay the same.
 */
export default function WindowProcurementPage({ mode }: { mode: keyof typeof windowProcurement }) {
  const page = windowProcurement[mode];
  const profiles = mode === "profiles";
  const other = windowProcurement[profiles ? "finished" : "profiles"];
  const quote = buildWindowRfqHref({ mode, source: "window-procurement", productPath: page.path });
  const template = profiles ? "/downloads/f1-window-profile-bom-template.csv" : "/downloads/f1-window-schedule-template.csv";
  const documents = [catalog, template].flatMap((file) => assembleDocuments().filter((document) => document.file === file));
  const example = profiles
    ? [["Series", "70"], ["Section", "GF0301 · frame"], ["Cut length", "Length + unit"], ["Quantity", "Meters or pieces"], ["Finish", "Color and surface"], ["Scope", "Profiles + listed accessories"]]
    : [["Window ID", "W01"], ["Size", "Width × height + unit"], ["Basis", "Rough opening or frame"], ["Operation", "Type, handing, viewing side"], ["Configuration", "Glass, hardware, finish"], ["Delivery", "Quantity + phase"]];
  return <>
    <JsonLd data={buildProductFamilyPageSchema({ name: page.h1, description: page.description, path: page.path, image: page.image, category: "Windows & Doors", schemaType: "ItemPage", datePublished: "2026-09-12", dateModified: updatedAt, additionalProperty: [{ name: "Supply route", value: profiles ? "System profiles for local fabrication" : "Finished units to an agreed window schedule" }, { name: "Series", value: "50, 55, 60, 65, 70, 80, 90 casement, 90 sliding, 140 compression-seal sliding" }] })} />
    <PageHeader
      updated={updatedAt}
      tag={profiles ? "Windows & Doors · System Profiles" : "Windows & Doors · Finished Units"}
      line={{ name: "F1-THERM", label: profiles ? "System profiles" : "Finished units" }}
      title={page.h1}
      description={page.intro}
      facts={profiles
        ? [{ label: "Systems", value: "9 series" }, { label: "Frame depth", value: "50–140 mm" }, { label: "Supply", value: "Profile sets" }, { label: "RFQ template", value: "Profile BOM" }]
        : [{ label: "Systems", value: "9 series" }, { label: "Frame depth", value: "50–140 mm" }, { label: "Test reports", value: "AS 2047" }, { label: "RFQ template", value: "Window schedule" }]}
      figure={profiles
        ? <Figure number={1} title="70 series corner section" note="Rendering"><Image src="/images/products/window-door/frp-window-frame-70-series-corner-section.webp" alt="Corner section of a 70-series FRP window frame showing the profile chambers" width={800} height={800} sizes="(max-width: 1023px) 90vw, 300px" preload className="mx-auto h-auto w-full max-w-[300px] object-contain" /></Figure>
        : <Figure number={1} title="80 series tilt-and-turn" note="Rendering"><Image src="/images/products/window-door/frp-window-door-frame-80-series-tilt-turn.webp" alt="Corner section of an 80-series tilt-and-turn FRP window" width={600} height={600} sizes="(max-width: 1023px) 90vw, 300px" preload className="mx-auto h-auto w-full max-w-[300px] object-contain" /></Figure>}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products", href: "/products/product-lines" }, { label: "Windows & Doors", href: "/products/frp-window-frames" }, { label: profiles ? "Profiles for Fabricators" : "Finished Units" }]}
      actions={{ primary: { label: profiles ? "Request a profile quote" : "Request a finished-unit quote", href: quote }, secondary: { label: profiles ? "Download the BOM template" : "Download the schedule template", href: template, variant: "secondary" }, note: "Start with a sample, a budget estimate, a technical review or a formal quotation.", stickyMobile: true }}
    />
    <PageNav items={[{ id: "supply", label: "What you buy" }, { id: "series", label: "Systems" }, profiles ? { id: "components", label: "Components" } : { id: "operation", label: "Operation" }, { id: "buyers", label: "Buying paths" }, { id: "scope", label: "Scope" }, ...(profiles ? [{ id: "samples", label: "Samples" }] : []), { id: "procurement", label: "How to order" }, { id: "documents", label: "RFQ & evidence" }, { id: "packing", label: "Packing" }, { id: "faq", label: "FAQ" }, { id: "quote", label: "Quote" }]} />

    <PageSection id="supply" title={profiles ? "A profile set your factory can evaluate" : "A complete configuration you can approve"}>
      <div className="grid grid-cols-1 items-start gap-[28px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-[56px]">
        <div>
          <p className="text-f18 leading-golden text-t1">{page.decision}</p>
          <dl className="mt-[20px] divide-y divide-border-default border-y border-border-default text-f14">
            <div className="py-[12px]"><dt className="font-semibold text-t1">Who buys this</dt><dd className="mt-[4px] leading-golden text-t2">{page.buyer}</dd></div>
            <div className="py-[12px]"><dt className="font-semibold text-t1">Supply scope</dt><dd className="mt-[4px] leading-golden text-t2">{page.supply}</dd></div>
          </dl>
          <aside className="mt-[20px] rounded-card border border-teal-border bg-teal-bg p-[20px]">
            <h3 className="text-f16 font-bold text-t1">{windowSurfaceFinish.title}</h3>
            <p className="mt-[6px] text-f14 leading-golden text-t2">{windowSurfaceFinish.description}</p>
          </aside>
          <Link href={other.path} className={`mt-[8px] ${link}`}>{profiles ? "Need factory-assembled units? Finished windows & doors" : "Fabricating locally? Window and door profiles"} <span aria-hidden className="ml-[4px]">→</span></Link>
        </div>
        {profiles
          ? <Figure number={2} title="Profile samples" note="Product photo" bleed>
              <Image src={page.image} alt={page.imageAlt} width={1672} height={941} sizes="(max-width: 1023px) 94vw, 560px" className="h-auto w-full bg-white" />
            </Figure>
          : <Figure number={2} title="140 series sliding door" note="Rendering">
              <div className="relative aspect-[4/3]"><Image src="/images/products/window-door/frp-window-door-frame-140-series-sliding.webp" alt="Corner section of a 140-series FRP sliding door frame with triple glazing" fill sizes="(max-width: 1023px) 90vw, 560px" className="object-contain" /></div>
            </Figure>}
      </div>
    </PageSection>

    <PageSection id="series" title="Compare nine window & door systems" count="9 systems" tone="muted" intro="Start with the opening you need, then review the matching profile set. The 90 casement and 90 sliding systems are distinct; the 140 series uses compression-seal sliding operation.">
      <WindowSystemExplorer mode={mode} productPath={page.path} />
    </PageSection>

    {profiles
      ? <PageSection id="components" title="Specify the system, not single lineals" intro="Frame, sash and mullion sections only work with their beads, gaskets, connectors and hardware. Confirm the mating interfaces before choosing individual lineals.">
          <WindowComponentMap figure={3} />
        </PageSection>
      : <PageSection id="operation" title="Show us how each opening should work" intro="Use the operation diagrams to describe each opening. Mark left or right handing and whether drawings are viewed from inside or outside, then confirm the configurations available in the chosen series.">
          <WindowTypesGrid />
        </PageSection>}

    <PageSection id="buyers" title={profiles ? "From fabrication to repeat supply" : "From specification to project delivery"} tone="muted" intro="Open your situation to see what to share, what we review with you and what to settle before moving ahead.">
      <WindowBuyerPaths mode={mode} />
    </PageSection>

    <PageSection id="scope" title={profiles ? "Agree the complete supply boundary" : "Know what your finished-unit quote includes"} intro="Use the scope below when comparing quotations. Availability, quantities, lead time and support are confirmed for the selected specification.">
      <WindowScopeTable mode={mode} />
      {profiles
        ? <div className="mt-[24px] grid grid-cols-1 gap-[12px] md:grid-cols-2">
            <article className="flex flex-col rounded-card border border-border-default bg-bg2 p-[20px] sm:p-[24px]">
              <h3 className="text-f18 font-bold text-t1">Adopt an existing system</h3>
              <p className="mt-[8px] text-f14 leading-golden text-t2">Review the current sections, gasket grooves, joining method, glazing and hardware interfaces. Evaluate samples and your fabrication sequence before releasing a production order.</p>
              <Link href={buildWindowRfqHref({ mode, stage: "sample", source: "window-existing-system" })} className={`mt-auto pt-[8px] ${link}`}>Evaluate a system sample <span aria-hidden className="ml-[4px]">→</span></Link>
            </article>
            <article className="flex flex-col rounded-card border border-border-default bg-bg2 p-[20px] sm:p-[24px]">
              <h3 className="text-f18 font-bold text-t1">Develop a custom profile</h3>
              <p className="mt-[8px] text-f14 leading-golden text-t2">Provide a drawing or concept with critical dimensions, material and finish needs, tolerances and expected demand. Design, tooling, first articles and validation are agreed as separate stages.</p>
              <Link href={buildWindowRfqHref({ mode, role: "oem", stage: "technical", source: "window-custom-system" })} className={`mt-auto pt-[8px] ${link}`}>Request a drawing review <span aria-hidden className="ml-[4px]">→</span></Link>
            </article>
          </div>
        : <ul className="mt-[24px] grid grid-cols-1 gap-[12px] md:grid-cols-3">
            {[["Glass", "Specify build-up, safety requirements, coatings, spacer and gas-fill preferences. Whole-window Uw differs from glass-only Ug."], ["Hardware and finish", "Confirm handles, locks, restrictors, access requirements, and interior and exterior colors against the intended opening."], ["Wall interface", "Provide sill, jamb and head details, waterproofing and fixing requirements. Identify the local installer and who approves dimensions."]].map(([title, body], index) => <li key={title} className="rounded-card border border-border-default bg-bg2 p-[20px] sm:p-[24px]"><p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Check {index + 1}</p><h3 className="mt-[4px] text-f18 font-bold text-t1">{title}</h3><p className="mt-[8px] text-f14 leading-golden text-t2">{body}</p></li>)}
          </ul>}
    </PageSection>

    {profiles && <PageSection id="samples" title="Choose a sample for the decision you need to make" tone="muted" intro="Each sample answers a different question, from section geometry to production consistency.">
      <WindowSampleGuide />
      <div className="mt-[24px] grid grid-cols-1 items-center gap-[24px] rounded-card border border-border-default bg-white p-[20px] sm:p-[28px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-[40px]">
        <div>
          <h3 className="text-f20 font-bold text-t1">Subframes and installation profiles</h3>
          <p className="mt-[8px] text-f14 leading-golden text-t2">Review the connection between the main frame and the building opening. Confirm the cross-section, fixing and wall interface against current drawings.</p>
          <ul className="mt-[14px] flex flex-wrap gap-[6px]">{systems.subframes.map((frame) => <li key={frame.id} className="rounded-tag border border-border-default bg-bg2 px-[8px] py-[3px] text-f12 font-medium text-t1">{frame.label}</li>)}</ul>
          <p className="mt-[10px] text-f12 leading-golden text-t3">Catalog size designations. Confirm dimensions, units and tolerances on the approved drawing.</p>
          <Link href={buildWindowRfqHref({ mode, stage: "technical", source: "window-subframes" })} className={`mt-[4px] ${link}`}>Discuss an installation profile <span aria-hidden className="ml-[4px]">→</span></Link>
        </div>
        <Figure number={4} title="Subframe sections" note="Catalog drawing">
          <Image src="/images/products/window-systems/subframes.jpg" alt="Five subframe shapes from the source product catalog" width={980} height={240} sizes="(max-width: 1023px) 85vw, 520px" className="h-auto w-full" />
        </Figure>
      </div>
    </PageSection>}

    <PageSection id="procurement" title={profiles ? "How profile procurement works" : "How finished-unit procurement works"} tone={profiles ? "white" : "muted"} intro="At each stage, agree the information to supply, the next review and the confirmation needed to proceed.">
      <WindowPurchaseFlow mode={mode} />
    </PageSection>

    <PageSection id="documents" title={profiles ? "A section list starts the conversation" : "A window schedule makes the quote comparable"} tone={profiles ? "muted" : "white"}>
      <div className="grid grid-cols-1 items-start gap-[24px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-[48px]">
        <div>
          <p className="text-f16 leading-golden text-t2">{profiles ? "List each profile by series, section code and drawing revision. Add length, quantity and units, then describe accessories and fabrication work." : "Use a separate row for every opening configuration. Mark whether dimensions refer to the rough opening or the finished frame, and state the viewing side for handing."}</p>
          <div className="mt-[20px]"><Button href={template} variant="secondary">{profiles ? "Download the blank profile BOM (CSV)" : "Download the blank window schedule (CSV)"}</Button></div>
          <p className="mt-[12px] text-f14 leading-golden text-t3">Open the template in Excel or another spreadsheet app. Attach CSV, XLSX, drawings or one ZIP bundle to your RFQ; 4 MB maximum per submission.</p>
        </div>
        <div className="rounded-card border border-border-default bg-white p-[20px] sm:p-[24px]">
          <h3 className="text-f16 font-bold text-t1">{profiles ? "Example of a section request" : "Example of a schedule row"}</h3>
          <dl className="mt-[14px] grid grid-cols-2 gap-x-[16px] gap-y-[12px] text-f14">{example.map(([label, value]) => <div key={label}><dt className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">{label}</dt><dd className="mt-[2px] font-semibold text-t1">{value}</dd></div>)}</dl>
          <p className="mt-[16px] border-t border-border-default pt-[12px] text-f14 leading-golden text-t3">Illustrative format only; this is not a production schedule. Anything left blank is clarified during review.</p>
        </div>
      </div>
      <h3 className="mt-[40px] text-f20 font-bold text-t1">Evidence that matches your specification</h3>
      <p className="mt-[8px] max-w-[820px] text-f14 leading-golden text-t2">{page.evidence}</p>
      <div className="mt-[16px]"><WindowEvidenceCards /></div>
      <ul className="mt-[12px] grid grid-cols-1 gap-[12px] md:grid-cols-2">
        {documents.map((document) => <li key={document.file}><DocumentCard card={libraryCard(document)} compact /></li>)}
      </ul>
    </PageSection>

    <PageSection id="packing" title="Packing and delivery" tone={profiles ? "white" : "muted"}>
      <WindowPackingGuide mode={mode} figure={profiles ? 5 : 3} />
    </PageSection>

    <PageSection id="faq" title="Purchasing questions" tone={profiles ? "muted" : "white"}>
      <FAQList items={[...page.faq]} />
    </PageSection>

    <RelatedLinks
      background={profiles ? "white" : "bg2"}
      groups={[
        { title: "Window and door products", links: [{ href: "/products/frp-window-frames", label: "All FRP window and door systems" }, { href: other.path, label: profiles ? "Finished fiberglass windows and doors" : "Window and door profiles for fabricators" }, { href: "/products/frp-door-frames", label: "FRP door frame profiles" }, ...(profiles ? [{ href: "/products/custom-pultruded-profiles", label: "Custom pultruded profiles" }] : [{ href: "/products/fiberglass-door-thresholds", label: "Fiberglass door thresholds" }])] },
        { title: "Guides and tools", links: [{ href: "/resources/frp-windows-guide", label: "FRP windows: materials, fabrication and buying" }, profiles ? { href: "/technology/polyurethane-pultrusion-windows", label: "Polyurethane pultrusion for windows" } : { href: "/technology/frp-vs-aluminum-windows", label: "FRP vs aluminum windows" }, { href: "/technology/frp-u-value-calculator", label: "Whole-window U-value calculator" }] },
        { title: "Evidence and projects", links: [{ href: "/resources/evidence", label: "Test reports and their scope" }, { href: "/resources/downloads", label: "Data sheets and certificates" }, { href: "/case-studies", label: "Window project case studies" }] },
      ]}
    />

    <PageSection id="quote" title={profiles ? "Bring us your profile set or drawing" : "Bring us your window schedule"} tone="deep">
      <ProductRfq
        product={profiles ? "FRP window and door profiles" : "Finished fiberglass windows and doors"}
        productPath={page.path}
        quoteHref={quote}
        quoteLabel={profiles ? "Request a profile quote" : "Request a finished-unit quote"}
        items={[...windowRequestItems[mode]]}
        intro={profiles ? "Send the series or drawing, the section list and the destination. Not ready for a formal quote? Ask for samples, budget pricing or a technical review." : "Send the window schedule, the glass and hardware you want and the project city. Not ready for a formal quote? Ask for a sample unit, budget pricing or a technical review."}
        links={[{ label: "Compare the nine systems", href: "#series" }, profiles ? { label: "FRP door frame profiles", href: "/products/frp-door-frames" } : { label: "Estimate a whole-window U-value", href: "/technology/frp-u-value-calculator" }]}
        advisorPrompt={profiles ? "I fabricate windows and am evaluating FRP profiles. Series or drawing: [series / drawing]. Market: [country]. Opening types: [casement / tilt-and-turn / sliding / doors]. Expected volume: [meters or pieces per year]. Which series fits, which samples should I start with, and what does F1 Composite need for a profile quote?" : "I need finished fiberglass windows or doors for a project in [city, country]: about [number] openings, types [casement / tilt-and-turn / sliding / doors], targets [U-value, wind, water]. Which series fits, and what should the window schedule include for a quote?"}
      />
    </PageSection>
  </>;
}

