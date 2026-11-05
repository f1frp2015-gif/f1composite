import Image from "next/image";
import Link from "next/link";
import DocumentCard, { libraryCard } from "@/components/downloads/DocumentCard";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import ProductRfq from "@/components/products/ProductRfq";
import FinishedWindowExplorer from "@/components/sections/FinishedWindowExplorer";
import RelatedLinks from "@/components/sections/RelatedLinks";
import { WindowPackingGuide, WindowPurchaseFlow, WindowScopeTable } from "@/components/sections/WindowBuyingGuide";
import JsonLd from "@/components/seo/JsonLd";
import Button from "@/components/ui/Button";
import { FAQList } from "@/components/ui/FAQ";
import Figure from "@/components/ui/Figure";
import { finishedWindowCatalog, finishedWindowSystems } from "@/content/data/finishedWindowSystems";
import { windowRequestItems } from "@/content/data/windowBuying";
import { windowProcurement } from "@/content/data/windowProcurement";
import { assembleDocuments } from "@/lib/documents";
import { buildProductFamilyPageSchema } from "@/lib/seo";
import { buildWindowRfqHref } from "@/lib/windowInquiry";

const updatedAt = "2026-11-04";
const page = windowProcurement.finished;
const schedule = "/downloads/f1-window-schedule-template.csv";
const quote = buildWindowRfqHref({ mode: "finished", source: "finished-window-page", productPath: page.path });
const textLink = "inline-flex min-h-[44px] items-center text-f14 font-semibold text-teal-text underline underline-offset-4 hover:text-teal";

export default function FinishedWindowPage() {
  const documents = assembleDocuments().filter((document) => document.file === finishedWindowCatalog || document.file === schedule);
  return <>
    <JsonLd data={buildProductFamilyPageSchema({
      name: page.h1, description: page.description, path: page.path,
      image: page.image, imageAlt: page.imageAlt,
      category: "Finished windows and doors", material: "Glass-fiber-reinforced polyurethane",
      productLine: "F1-THERM", schemaType: "CollectionPage",
      datePublished: "2026-09-12", dateModified: updatedAt,
      additionalProperty: [
        { name: "Supply scope", value: "Finished units to an agreed opening schedule" },
        { name: "Product families", value: "8 window systems and 3 door systems" },
        { name: "Systems", value: finishedWindowSystems.map((system) => system.name).join("; ") },
      ],
    })} />
    <PageHeader
      updated={updatedAt}
      tag="Windows & Doors · Finished Units"
      line={{ name: "F1-THERM", label: "Finished windows & doors" }}
      title={page.h1}
      description={page.intro}
      facts={[{ label: "Product families", value: "11 systems" }, { label: "Windows", value: "8 formats" }, { label: "Doors", value: "3 formats" }, { label: "Frame material", value: "Glass-fiber / PU" }]}
      figure={<Figure number={1} title="114 curtain-wall window" caption="Illustrative configuration with a broad central light and side opening sections.">
        <Image src={page.image} alt={page.imageAlt} width={1200} height={522} sizes="(max-width: 1023px) 90vw, 540px" preload className="my-[24px] h-auto w-full object-contain" />
      </Figure>}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products", href: "/products/product-lines" }, { label: "Windows & Doors", href: "/products/frp-window-frames" }, { label: "Finished Units" }]}
      actions={{ primary: { label: "Explore the 11 systems", href: "#series" }, secondary: { label: "Download the catalog (PDF)", href: finishedWindowCatalog, variant: "secondary" }, note: "Have a project schedule? Choose a system below or request a configuration review.", stickyMobile: true }}
    />
    <PageNav items={[{ id: "series", label: "Products" }, { id: "construction", label: "Construction" }, { id: "glazing", label: "Glazing & performance" }, { id: "scope", label: "Supply scope" }, { id: "documents", label: "Catalog & schedule" }, { id: "procurement", label: "How to order" }, { id: "packing", label: "Delivery" }, { id: "faq", label: "FAQ" }, { id: "quote", label: "Quote" }]} />

    <PageSection id="series" title="Choose your window or door" count="11 product families" intro="Compare complete window and door formats for your openings. Open each product for its glazing configurations and catalogue-stated performance, or compare up to three systems." tone="muted">
      <FinishedWindowExplorer productPath={page.path} />
    </PageSection>

    <PageSection id="construction" title="Composite profiles, configured as a complete unit" intro="Glass reinforcement and a thermoset polyurethane matrix form the pultruded frame profiles. Glazing, seals and hardware are selected with the complete assembly.">
      <div className="grid items-center gap-[32px] lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-[56px]">
        <Figure number={2} title="Composite profile section" caption="Illustrative section detail. Geometry and components vary by system.">
          <Image src="/images/products/finished-windows/pu-profile-section.webp" alt="Cutaway of a glass-fiber-reinforced polyurethane window frame, showing chambers and glazing interfaces" width={810} height={1135} sizes="(max-width: 1023px) 80vw, 380px" className="mx-auto max-h-[380px] w-auto max-w-full object-contain" />
        </Figure>
        <div>
          <div className="space-y-[20px]">
            {[
              ["Frame and glazing together", "Match the chosen series to the opening size, insulating glass build-up, spacer and target whole-window U-value."],
              ["Opening, seals and hardware", "Specify how each sash or door leaf operates, its handing, locks, handles and perimeter seals. Review the proposed size and glass weight together."],
              ["Finish and installation interface", "Confirm interior and exterior colors on physical samples. Provide sill, jamb and head details, fixing requirements and drainage interfaces."],
            ].map(([title, body]) => <div key={title} className="border-l-2 border-teal pl-[20px]"><h3 className="text-f18 font-bold text-t1">{title}</h3><p className="mt-[6px] text-f16 leading-relaxed text-t2">{body}</p></div>)}
          </div>
          <Link href="/products/window-door-profiles" className={`mt-[20px] ${textLink}`}>Fabricating locally? Explore window and door profiles →</Link>
        </div>
      </div>
    </PageSection>

    <PageSection id="glazing" title="Specify the performance of the complete assembly" tone="muted" intro="The product tables reproduce the catalogue configurations. Select the glass, frame, size and operating hardware before confirming performance for your project.">
      <div className="grid gap-[16px] md:grid-cols-2">
        {[
          ["Whole-window U-value", "Uw describes the complete window; Ug describes the glass and Uf the frame. The window and door tables use W/(m²·K). Material conductivity is a different property."],
          ["Glazing build-up and warm edge", "Low-e identifies a coated glass layer. A/Ar notation and warm-edge options are retained as listed. Confirm cavity fill, spacer, coating surfaces and safety-glass requirements."],
          ["Paired values need configuration confirmation", "A pair such as 0.8 / 0.7 is reproduced as listed. Its individual conditions are not defined in the reference data; it is not assigned to air/argon fill or treated as a performance range."],
          ["Classes and acoustic values", "Wind, water and air entries are catalogue classes with no stated test standard. Acoustic values retain the stated > symbol; no Rw, STC, OITC or international class conversion is implied."],
        ].map(([title, body]) => <article key={title} className="rounded-card border border-border-default bg-white p-[24px]"><h3 className="text-f18 font-bold text-t1">{title}</h3><p className="mt-[10px] text-f14 leading-relaxed text-t2">{body}</p></article>)}
      </div>
      <aside className="mt-[20px] rounded-card border border-teal-border bg-teal-bg p-[24px]">
        <h3 className="text-f18 font-bold text-t1">Request evidence for your selected configuration</h3>
        <p className="mt-[8px] max-w-[900px] text-f14 leading-relaxed text-t2">{page.evidence}</p>
        <div className="mt-[12px] flex flex-wrap gap-x-[24px]">
          <Link href={buildWindowRfqHref({ mode: "finished", stage: "technical", source: "finished-window-evidence", productPath: page.path })} className={textLink}>Request a technical review →</Link>
          <Link href="/resources/evidence" className={textLink}>Review the document library and report scope →</Link>
        </div>
      </aside>
    </PageSection>

    <PageSection id="scope" title="Agree what your finished-unit quote includes" intro="A quotation identifies the frame, glass, hardware, seals and accessories for each opening. Confirm installation materials, site labor, spare parts and delivery terms as part of the agreed scope.">
      <WindowScopeTable mode="finished" />
    </PageSection>

    <PageSection id="documents" title="From product selection to an opening schedule" tone="muted">
      <div className="grid items-start gap-[28px] lg:grid-cols-2 lg:gap-[48px]">
        <div>
          <p className="text-f16 leading-relaxed text-t2">Download the 16-page English catalog for the complete product range. Use one schedule row per opening configuration, with dimensions, quantity, operation, glazing, hardware and finish.</p>
          <dl className="mt-[20px] grid grid-cols-2 gap-[16px] rounded-card border border-border-default bg-white p-[24px]">
            {[["Opening ID", "W01 / D01"], ["Dimensions", "Width × height + unit"], ["Dimension basis", "Rough opening or frame"], ["Operation", "Handing + viewing side"], ["Configuration", "Series, glass, hardware"], ["Quantity", "Units + delivery phase"]].map(([label, value]) => <div key={label}><dt className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">{label}</dt><dd className="mt-[4px] text-f14 font-semibold text-t1">{value}</dd></div>)}
          </dl>
          <p className="mt-[12px] text-f14 leading-relaxed text-t3">Open the CSV in Excel or another spreadsheet app. Attach your schedule and drawings to the enquiry; up to 4 MB per submission. Missing details can be clarified during review.</p>
          <div className="mt-[20px]"><Button href={quote}>Discuss your opening schedule</Button></div>
        </div>
        <ul className="grid gap-[16px]">{documents.map((document) => <li key={document.file}><DocumentCard card={libraryCard(document)} /></li>)}</ul>
      </div>
    </PageSection>

    <PageSection id="procurement" title="From specification to project delivery" intro="Start with a sample evaluation, budget estimate, technical discussion or formal quotation. Agree the configuration and supporting documentation before releasing an order.">
      <WindowPurchaseFlow mode="finished" compact />
    </PageSection>

    <PageSection id="packing" title="Plan delivery around your openings" tone="muted">
      <WindowPackingGuide mode="finished" figure={3} />
    </PageSection>

    <PageSection id="faq" title="Finished window and door questions"><FAQList items={[...page.faq]} /></PageSection>
    <RelatedLinks background="bg2" groups={[
      { title: "Window and door products", links: [{ href: "/products/frp-window-frames", label: "Window and door supply routes" }, { href: "/products/window-door-profiles", label: "Profiles for local fabrication" }, { href: "/products/fiberglass-door-thresholds", label: "Fiberglass door thresholds" }] },
      { title: "Specification and documents", links: [{ href: "/resources/frp-windows-guide", label: "FRP window buying guide" }, { href: "/technology/frp-u-value-calculator", label: "Whole-window U-value calculator" }, { href: "/resources/downloads", label: "Catalogs and RFQ templates" }] },
    ]} />
    <PageSection id="quote" title="Bring us your window and door schedule" tone="deep">
      <ProductRfq product="Finished fiberglass windows and doors" productPath={page.path} quoteHref={quote} quoteLabel="Request a finished-unit quote" items={[...windowRequestItems.finished]}
        intro="Share the selected series, opening schedule, glazing and hardware preferences, and project destination. We will clarify any undecided configuration details."
        links={[{ label: "Compare the 11 product families", href: "#series" }, { label: "Download the opening schedule", href: schedule }]}
        advisorPrompt="I need finished fiberglass windows or doors. Project: [city, country]. Series: [65 / 72 / 83 / 85 / 95 / 103 tilt-and-turn / 103 micro-vent / 114 / entrance / 132 / 145]. Openings and quantity: [details]. Glazing and performance targets: [requirements]. Help me prepare an opening schedule and identify the configuration details to confirm."
      />
    </PageSection>
  </>;
}
