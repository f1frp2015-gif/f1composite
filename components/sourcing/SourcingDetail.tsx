import SupplierImageFigure from "@/components/sourcing/SupplierImageFigure";
import { sourcingHeroImages } from "@/content/data/sourcingImages";
import KnowHowSupportSections from "@/components/sourcing/KnowHowSupportSections";
import { sourcingSupportSections } from "@/content/data/knowhowSupport";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import Figure from "@/components/ui/Figure";
import { FAQList } from "@/components/ui/FAQ";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/seo/JsonLd";
import { sourcingPages, type SourcingPage } from "@/content/data/sourcingPages";
import { buildRfqHref } from "@/lib/rfq";
import { absoluteUrl } from "@/lib/seo";

export default function SourcingDetail({ page }: { page: SourcingPage }) {
  const supplierImage = sourcingHeroImages[page.slug];
  const supportSections = sourcingSupportSections[page.slug] ?? [];
  const briefModule = ({ "pultrusion-dies": "tooling", "pultrusion-machines": "line", "resin-mixing-injection": "injection", "slitting-cutting-equipment": "finishing" } as Record<string, string>)[page.slug] ?? (page.group === "materials" ? "materials" : "line");
  const briefHref = `/technology/knowhow-services?module=${briefModule}#project-brief`;
  const path = `/sourcing/${page.slug}`;
  const hub = `/sourcing/${page.group}`;
  const hubName = page.group === "equipment" ? "Equipment & tooling" : "Composite materials";
  const quoteHref = buildRfqHref({
    source: `sourcing-${page.slug}`,
    product: page.name,
    productPath: path,
    message: `Please review ${page.name} as part of my Know-How and production-support requirements. Please confirm the proposed supplier, specification, qualification, delivery and support scope.`,
  });
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebPage", name: page.title, description: page.description, url: absoluteUrl(path), isPartOf: { "@type": "CollectionPage", url: absoluteUrl(hub) }, dateModified: "2026-10-02", image: absoluteUrl(supplierImage?.src ?? page.image), publisher: { "@id": "https://www.f1composite.com/#organization" } }} />
      <PageHeader
        tag="Know-How support"
        title={page.name}
        description={page.intro}
        updated="2026-10-02"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Know-How & Services", href: "/technology/knowhow-services" }, { label: hubName, href: hub }, { label: page.name }]}
        actions={{ primary: { label: "Discuss sourcing requirements", href: quoteHref }, secondary: { label: "Prepare a specification", href: "#specification", variant: "secondary" }, stickyMobile: true }}
        figure={supplierImage ? <SupplierImageFigure photo={supplierImage} number={1} preload sizes="(max-width: 1023px) 94vw, 44vw" /> : <Figure number={1} title="Specification interfaces" caption="A scope diagram; the proposed supplier confirms the final configuration."><Image src={page.image} alt={page.imageAlt} width={900} height={600} className="h-auto w-full" preload /></Figure>}
      />
      <PageNav items={[{ id: "scope", label: "Supply scope" }, { id: "specification", label: "Specification" }, ...supportSections.map(section => ({ id: section.id, label: section.title })), { id: "acceptance", label: "Acceptance" }, { id: "questions", label: "Questions" }, { id: "inquiry", label: "Inquiry" }]} />
      <PageSection id="scope" title="Define the proposed supply package">
        <div className="grid gap-[24px] lg:grid-cols-2">
          <p className="text-f18 leading-relaxed text-t1">Equipment, tooling and material sourcing support forms part of F1 Know-How & Services. We review requirements within a technology-transfer, production-setup or improvement engagement.</p>
          <p className="text-f16 leading-golden text-t2">Agree the exact equipment configuration or material grade, qualification documents, delivery and support responsibilities before ordering. Availability, pricing, lead time and warranty are confirmed for the proposed package.</p>
        </div>
      </PageSection>
      <PageSection id="specification" title="What to specify and what to request" tone="muted">
        <div className="overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[640px] text-left text-f14 leading-golden">
            <caption className="sr-only">Specification inputs and supplier deliverables for {page.name}</caption>
            <thead className="bg-deep text-white"><tr>{["Scope", "Your specification", "Requested supplier response"].map(label => <th key={label} scope="col" className="p-[16px] font-semibold">{label}</th>)}</tr></thead>
            <tbody className="divide-y divide-border-default">{page.rows.map(([scope, input, response]) => <tr key={scope}><th scope="row" className="p-[16px] align-top font-semibold text-t1">{scope}</th><td className="p-[16px] align-top text-t2">{input}</td><td className="p-[16px] align-top text-t2">{response}</td></tr>)}</tbody>
          </table>
        </div>
      </PageSection>
      <KnowHowSupportSections sections={supportSections} />
      <PageSection id="acceptance" title="Resolve acceptance before placing an order">
        <ol className="grid gap-[16px] md:grid-cols-3">{page.checks.map((item, index) => <li key={item.title} className="rounded-card border border-border-default bg-bg2 p-[24px]"><p className="font-mono text-f12 text-teal-text">CHECK {index + 1}</p><h3 className="mt-[8px] text-f18 font-bold text-t1">{item.title}</h3><p className="mt-[12px] text-f16 leading-golden text-t2">{item.body}</p></li>)}</ol>
      </PageSection>
      <PageSection id="questions" title="Purchasing questions" tone="muted">
        <FAQList items={page.faq} />
        <h3 className="mt-[28px] text-f18 font-bold text-t1">Related sourcing specifications</h3>
        <ul className="mt-[12px] grid gap-[12px] md:grid-cols-3">{page.related.map(slug => {
          const related = sourcingPages.find(item => item.slug === slug)!;
          return <li key={slug}><Link href={`/sourcing/${slug}`} className="flex h-full min-h-[56px] items-center justify-between gap-[12px] rounded-card border border-border-default bg-white p-[20px] text-f16 font-semibold text-teal-text">{related.name}<span aria-hidden>→</span></Link></li>;
        })}</ul>
        <p className="mt-[24px] flex flex-wrap gap-[24px] text-f14 font-semibold text-teal-text"><Link href={hub}>Browse {hubName.toLowerCase()} →</Link><Link href="/technology/knowhow-services">Technology transfer & consulting →</Link><Link href="/technology/pultrusion-resin-systems">Profile resin selection →</Link></p>
      </PageSection>
      <PageSection id="inquiry" title={`Discuss ${page.name}`} tone="deep">
        <div className="grid gap-[24px] lg:grid-cols-2">
          <div><p className="max-w-[600px] text-f18 leading-relaxed text-white/85">Share the specification and destination. The next step is to define the equipment or material support needed within your Know-How engagement.</p><div className="mt-[24px]"><Button href={quoteHref}>Send a sourcing inquiry</Button><Link href={briefHref} className="mt-[14px] block text-f14 font-semibold text-white underline underline-offset-4">Include this in a Know-How project brief →</Link></div><p className="mt-[16px] text-f14 text-white/75">Drawings and technical documents can follow after the initial contact.</p></div>
          <ul className="divide-y divide-white/15">{page.inputs.map((input, index) => <li key={input} className="flex gap-[12px] py-[12px] text-f16 leading-golden text-white"><span className="font-mono text-lime">{index + 1}</span>{input}</li>)}</ul>
        </div>
      </PageSection>
    </>
  );
}
