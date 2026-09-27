import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import DocumentCard, { libraryCard } from "@/components/downloads/DocumentCard";
import ProductRfq from "@/components/products/ProductRfq";
import RelatedLinks from "@/components/sections/RelatedLinks";
import WindowSystemExplorer from "@/components/sections/WindowSystemExplorer";
import { WindowBuyerPaths, WindowComponentMap, WindowEvidenceCards, WindowPurchaseFlow, WindowScopeTable, WindowSupplyRoutes } from "@/components/sections/WindowBuyingGuide";
import JsonLd from "@/components/seo/JsonLd";
import WindowProjects from "@/components/sections/WindowProjects";
import { FAQList } from "@/components/ui/FAQ";
import Figure from "@/components/ui/Figure";
import { windowRequestItems } from "@/content/data/windowBuying";
import { assembleDocuments } from "@/lib/documents";
import { buildPageMetadata, buildProductFamilyPageSchema } from "@/lib/seo";
import { buildWindowRfqHref } from "@/lib/windowInquiry";

// Last content review; shown in the page header and used as dateModified.
const updatedAt = "2026-09-27";

const pagePath = "/products/frp-window-frames";
const description = "Compare nine FRP window and door systems. Source fiberglass profiles for local fabrication or finished units, with separate procurement guides and RFQs.";
export const metadata: Metadata = buildPageMetadata({ title: "FRP Window Frames & System Profiles | F1 Composite", description, path: pagePath, image: "/products/frp-window-frames/opengraph-image" });

const profileQuote = buildWindowRfqHref({ mode: "profiles", source: "window-hub", productPath: pagePath });
const finishedQuote = buildWindowRfqHref({ mode: "finished", source: "window-hub", productPath: pagePath });

const faq = [
  { question: "Do you sell FRP profiles or finished windows and doors?", answer: "Both, through separate supply routes. Choose system profiles when you will fabricate locally. Choose finished units when you need an agreed assembly built to a window schedule. Glass, hardware, accessories, machining, packing and delivery are defined in the quotation." },
  { question: "What are fiberglass window lineals?", answer: "Lineals are the pultruded profile lengths used to make the window frame, sash, mullion and other constant-section components. A compatible set of lineals and accessories is cut, joined, glazed and fitted with hardware to form a finished window." },
  { question: "Which window and door systems are available for review?", answer: "The catalog covers 50, 55, 60, 65, 70, 80 and 90 casement systems, a distinct 90 sliding system, and the 140 compression-seal sliding door. Review the current section drawings, opening configuration and supply availability before ordering." },
  { question: "Is the 140 series a lift-and-slide door?", answer: "The current 140 range is a compression-seal (side-pressure) sliding door system, with section references CP006–CP011. The historical Intertek lift-sliding report retains its original specimen name. Its results do not automatically apply to the current compression-seal configuration." },
  { question: "Can the same U-value be used for every size and series?", answer: "No. Uf describes the frame, Ug the glazing and Uw the whole window. Window size, frame, glass, spacer and assembly affect the result. The 90-series PHI certificate covers its stated configuration, not every unit assembled from FRP profiles." },
  { question: "What should I send if I do not have complete drawings?", answer: "Start with your role, destination, intended opening or application and expected quantity if known. Choose technical selection, budget pricing or sample evaluation. We can clarify the section list or window schedule before a formal quote." },
  { question: "What determines price, minimum quantity and delivery timing?", answer: "For profiles, review the section, lengths, material, finish, quantity, tooling and machining. For finished units, review each opening, glass and hardware configuration. Packing, transport, testing, sample fees, production quantity and lead time are confirmed for the order; a catalog listing is not a stock promise." },
  { question: "Who handles local installation and warranty?", answer: "Agree installation information, local labor, unloading, spare parts and after-sales responsibilities in the supply scope. Warranty terms depend on the contracted product and configuration. Shipping complete units does not by itself include on-site installation." },
];

const windowFiles = ["/downloads/f1composite-frp-window-door-catalog.pdf", "/downloads/f1-window-profile-bom-template.csv", "/downloads/f1-window-schedule-template.csv"];

const link = "inline-flex min-h-[44px] items-center text-f14 font-semibold text-teal-text hover:text-teal";

export default function FenestrationSystemsPage() {
  const documents = windowFiles.flatMap((file) => assembleDocuments().filter((document) => document.file === file));
  return <>
    <JsonLd data={buildProductFamilyPageSchema({ name: "FRP Window Frames & Door System Profiles", description, path: pagePath, image: "/images/products/window-systems/70.jpg", category: "Windows & Doors", productLine: "F1-THERM", schemaType: "CollectionPage", datePublished: "2026-04-04", dateModified: updatedAt, additionalProperty: [{ name: "Supply routes", value: "System profiles for local fabrication; finished windows and doors" }, { name: "Systems", value: "50, 55, 60, 65, 70, 80, 90 casement, 90 sliding, 140 compression-seal sliding" }, { name: "Current sliding profile references", value: "90 sliding CP001–CP005; 140 compression-seal CP006–CP011" }] })} />
    <PageHeader
      updated={updatedAt}
      tag="Windows & Doors · F1-THERM"
      line={{ name: "F1-THERM", label: "Windows & doors" }}
      title="FRP window & door systems"
      description="Pultruded fiberglass system profiles for local fabrication, with finished windows and doors available for project supply. Find your series, define the scope and start the right conversation."
      facts={[{ label: "Systems", value: "9 series" }, { label: "Frame depth", value: "50–140 mm" }, { label: "PHI certificate", value: "90 series" }, { label: "Test reports", value: "AS 2047" }]}
      figure={<Figure number={1} title="90 series corner section" note="Rendering"><Image src="/images/products/window-door/frp-window-frame-90-series-corner-section.webp" alt="Corner section of a 90-series FRP window frame with triple glazing" width={800} height={800} sizes="(max-width: 1023px) 90vw, 360px" preload className="mx-auto h-auto w-full max-w-[320px] object-contain" /></Figure>}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products", href: "/products/product-lines" }, { label: "Windows & Doors" }]}
      actions={{ primary: { label: "Request a profile quote", href: buildWindowRfqHref({ mode: "profiles", source: "window-hub-hero", productPath: pagePath }) }, secondary: { label: "Request a finished-unit quote", href: buildWindowRfqHref({ mode: "finished", source: "window-hub-hero", productPath: pagePath }), variant: "secondary" }, note: "Start with your name and email · Technical details can follow", stickyMobile: true }}
    />
    <PageNav items={[{ id: "supply", label: "Supply routes" }, { id: "series", label: "Systems" }, { id: "components", label: "Components" }, { id: "buyers", label: "Buying paths" }, { id: "procurement", label: "Procurement" }, { id: "evidence", label: "Evidence" }, { id: "projects", label: "Projects" }, { id: "faq", label: "FAQ" }, { id: "quote", label: "Quote" }]} />

    <PageSection id="supply" title="Two ways to buy: profiles or finished units" intro="Fabricators buy the profile set and build locally; project buyers specify complete units against a window schedule. Each route has its own guide and its own quotation.">
      <WindowSupplyRoutes />
    </PageSection>

    <PageSection id="series" title="Find your starting system" count="9 systems" tone="muted" intro="Compare casement, tilt-and-turn, sliding and compression-seal systems, then review the matching sections before you ask for samples or a quotation." aside={<Link href="/products/fiberglass-windows-doors#series" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">Compare for finished units</Link>}>
      <WindowSystemExplorer productPath={pagePath} />
    </PageSection>

    <PageSection id="components" title="Specify the system, not single lineals" intro="Frame, sash and mullion sections only work with their beads, gaskets, connectors and hardware. The table shows what each supply route quotes.">
      <WindowComponentMap figure={2} />
      <h3 className="mt-[40px] text-f20 font-bold text-t1">What each route quotes</h3>
      <div className="mt-[16px]"><WindowScopeTable /></div>
    </PageSection>

    <PageSection id="buyers" title="Find the path that fits your work" count="6 situations" tone="muted" intro="Open your situation to see what to share, what we review with you and what to settle before moving ahead.">
      <WindowBuyerPaths />
    </PageSection>

    <PageSection id="procurement" title="Know the steps before you order" intro="Both routes pass agreed confirmation points; each route guide lists the inputs and outputs of every step.">
      <div className="flex flex-wrap items-baseline justify-between gap-x-[24px]">
        <h3 className="text-f20 font-bold text-t1">Profiles for local fabrication</h3>
        <Link href="/products/window-door-profiles#procurement" className={link}>Inputs and confirmation points <span aria-hidden className="ml-[4px]">→</span></Link>
      </div>
      <div className="mt-[12px]"><WindowPurchaseFlow mode="profiles" compact /></div>
      <div className="mt-[32px] flex flex-wrap items-baseline justify-between gap-x-[24px] border-t border-border-default pt-[32px]">
        <h3 className="text-f20 font-bold text-t1">Finished windows &amp; doors</h3>
        <Link href="/products/fiberglass-windows-doors#procurement" className={link}>The project procurement guide <span aria-hidden className="ml-[4px]">→</span></Link>
      </div>
      <div className="mt-[12px]"><WindowPurchaseFlow mode="finished" compact /></div>
    </PageSection>

    <PageSection id="evidence" title="Match the evidence to the proposed assembly" tone="muted" intro="A certificate or report covers the configuration that was tested. Check each document against the series, size, glass and hardware you are buying.">
      <WindowEvidenceCards />
      <h3 className="mt-[40px] text-f20 font-bold text-t1">Catalog and RFQ templates</h3>
      <ul className="mt-[16px] grid grid-cols-1 gap-[12px] md:grid-cols-3">
        {documents.map((document) => <li key={document.file}><DocumentCard card={libraryCard(document)} compact /></li>)}
      </ul>
    </PageSection>

    <WindowProjects />

    <PageSection id="faq" title="Before you request a quote" tone="muted">
      <FAQList items={faq} />
    </PageSection>

    <RelatedLinks
      background="white"
      groups={[
        { title: "Window and door products", links: [{ href: "/products/window-door-profiles", label: "Window and door profiles for fabricators" }, { href: "/products/fiberglass-windows-doors", label: "Finished fiberglass windows and doors" }, { href: "/products/frp-door-frames", label: "FRP door frame profiles" }, { href: "/products/frp-window-reinforcement", label: "Fiberglass reinforcement for uPVC windows" }] },
        { title: "Guides and tools", links: [{ href: "/resources/frp-windows-guide", label: "FRP windows: materials, fabrication and buying" }, { href: "/technology/polyurethane-pultrusion-windows", label: "Polyurethane pultrusion for windows" }, { href: "/technology/frp-u-value-calculator", label: "Whole-window U-value calculator" }, { href: "/ai/passive-house", label: "Passive House window selector" }] },
        { title: "Evidence and markets", links: [{ href: "/resources/evidence", label: "Test reports and their scope" }, { href: "/industries/construction", label: "FRP in construction" }, { href: "/resources/downloads", label: "Data sheets and certificates" }] },
      ]}
    />

    <PageSection id="quote" title="Choose your supply route" tone="deep">
      <ProductRfq
        product="FRP windows and doors"
        productPath={pagePath}
        quoteHref={profileQuote}
        quoteLabel="Request a profile quote"
        secondaryQuote={{ label: "Request a finished-unit quote", href: finishedQuote }}
        items={[...windowRequestItems.hub]}
        intro="Send a drawing, a section list or a window schedule, and the destination. Early technical and sample inquiries are welcome."
        links={[{ label: "Compare the nine systems", href: "#series" }]}
        advisorPrompt="I am sourcing FRP windows or doors: [profiles to fabricate locally / finished units]. Market or project: [city, country]. Opening types: [casement / tilt-and-turn / sliding / doors], quantity [approximate]. Which series fits, and what does F1 Composite need for a quote?"
      />
    </PageSection>
  </>;
}
