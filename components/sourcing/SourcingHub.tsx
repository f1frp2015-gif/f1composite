import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageSection from "@/components/layout/PageSection";
import Figure from "@/components/ui/Figure";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/seo/JsonLd";
import { sourcingPages, type SourcingGroup } from "@/content/data/sourcingPages";
import { absoluteUrl } from "@/lib/seo";
import { buildRfqHref } from "@/lib/rfq";

export default function SourcingHub({ group }: { group: SourcingGroup }) {
  const equipment = group === "equipment";
  const title = equipment ? "Equipment & tooling sourcing" : "Composite material sourcing";
  const intro = equipment
    ? "Plan a new composite production line, a tooling package or an equipment upgrade. Start with the product you need to make, then define the modules, interfaces and acceptance tests."
    : "Match reinforcement and surface materials to the intended resin and manufacturing process. Define the grade, trial requirements and delivery specification before requesting a supply proposal.";
  const pages = sourcingPages.filter(page => page.group === group);
  const path = `/sourcing/${group}`;
  const quoteHref = buildRfqHref({ source: `sourcing-${group}`, product: title, productPath: path });
  const steps = equipment ? [
    ["Product brief", "Drawings, materials and output target establish what the line or tooling must produce."],
    ["Scope & interfaces", "Identify the proposed manufacturer, supplied modules, buyer utilities, commissioning and support."],
    ["Acceptance & handover", "Agree factory trials, site acceptance, documentation, spares and warranty responsibility."],
  ] : [
    ["Grade & construction", "Define fiber architecture, sizing or binder, resin compatibility and packaging."],
    ["Representative trial", "Approve the proposed grade in the actual process and retain the acceptance record."],
    ["Lot & delivery control", "Confirm lot documents, storage conditions, transport and how changes to an approved grade are handled."],
  ];
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: title, description: intro, url: absoluteUrl(path), mainEntity: { "@type": "ItemList", itemListElement: pages.map((page, index) => ({ "@type": "ListItem", position: index + 1, name: page.name, url: absoluteUrl(`/sourcing/${page.slug}`) })) } }} />
      <PageHeader tag="Supply-chain inquiry" title={title} description={intro} breadcrumbs={[{ label: "Home", href: "/" }, { label: title }]} updated="2026-10-02"
        actions={{ primary: { label: "Discuss your requirements", href: quoteHref }, secondary: { label: "Browse specifications", href: "#specifications", variant: "secondary" }, stickyMobile: true }}
        figure={<Figure number={1} title={equipment ? "A coordinated production package" : "A qualified material package"} caption="Confirm the proposed supplier and scope in the project quotation."><Image src={`/images/sourcing/${group}.svg`} alt={equipment ? "Diagram connecting product requirements, equipment interfaces and acceptance trials" : "Diagram connecting material grade selection, process trials and lot documentation"} width={900} height={600} className="h-auto w-full" preload /></Figure>}
      />
      <PageSection id="specifications" title={equipment ? "Equipment and tooling specifications" : "Material specifications"} count={`${pages.length} guides`} intro="Each guide sets out the information needed for a sourcing inquiry. The quotation confirms availability, the proposed supplier, qualification and delivery responsibilities.">
        <ul className="grid gap-[20px] md:grid-cols-2 lg:grid-cols-3">{pages.map(page => <li key={page.slug}><Link href={`/sourcing/${page.slug}`} className="group flex h-full flex-col overflow-hidden rounded-card border border-border-default bg-white hover:border-teal-border"><Image src={page.image} alt={page.imageAlt} width={900} height={600} sizes="(max-width: 767px) 94vw, (max-width: 1023px) 46vw, 30vw" className="h-auto w-full border-b border-border-default" /><div className="flex flex-1 flex-col p-[22px]"><h3 className="text-f20 font-bold text-t1">{page.name}</h3><p className="mt-[10px] text-f14 leading-golden text-t2">{page.intro}</p><span className="mt-auto pt-[18px] text-f14 font-semibold text-teal-text">Prepare a specification →</span></div></Link></li>)}</ul>
      </PageSection>
      <PageSection id="procurement" title="From requirements to an agreed package" tone="muted">
        <ol className="grid gap-[16px] md:grid-cols-3">{steps.map(([heading, body], index) => <li key={heading} className="rounded-card border border-border-default bg-white p-[24px]"><p className="font-mono text-f12 text-teal-text">STEP {index + 1}</p><h3 className="mt-[8px] text-f18 font-bold text-t1">{heading}</h3><p className="mt-[12px] text-f16 leading-golden text-t2">{body}</p></li>)}</ol>
        <p className="mt-[24px] flex flex-wrap gap-[24px] text-f14 font-semibold text-teal-text"><Link href={equipment ? "/sourcing/materials" : "/sourcing/equipment"}>{equipment ? "Source composite materials" : "Source equipment & tooling"} →</Link><Link href="/technology/knowhow-services">Technology transfer & consulting →</Link><Link href="/products/product-lines">Buy finished FRP products →</Link></p>
      </PageSection>
      <PageSection id="inquiry" title="Send your project brief" tone="deep"><p className="max-w-[820px] text-f18 leading-relaxed text-white/85">Share the {equipment ? "product drawings, planned output, factory location and existing equipment" : "material specification, resin and process, trial quantity and destination"}. F1 will review the inquiry and define the next qualification and sourcing steps.</p><div className="mt-[24px]"><Button href={quoteHref}>Discuss sourcing requirements</Button></div></PageSection>
    </>
  );
}
