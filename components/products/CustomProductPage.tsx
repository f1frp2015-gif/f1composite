import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import Figure from "@/components/ui/Figure";
import ProductRfq from "@/components/products/ProductRfq";
import JsonLd from "@/components/seo/JsonLd";
import { customProductUpdated, type CustomProductPage as ProductPage } from "@/content/data/customProductPages";
import { buildRfqHref } from "@/lib/rfq";
import { absoluteUrl } from "@/lib/seo";

export default function CustomProductPage({ page }: { page: ProductPage }) {
  const path = `/products/${page.slug}`;
  const quoteHref = buildRfqHref({ source: page.slug, product: page.name, productPath: path });
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebPage", name: page.title, description: page.description, url: absoluteUrl(path), image: absoluteUrl(page.image), dateModified: customProductUpdated, publisher: { "@id": "https://www.f1composite.com/#organization" } }} />
      <PageHeader tag="Custom product inquiry" title={page.name} description={page.intro}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products", href: "/products/product-lines" }, { label: page.name }]}
        updated={customProductUpdated}
        facts={[{ label: "Supply route", value: "Project quotation" }, { label: "Configuration", value: "Drawing review" }, { label: "Production release", value: "After agreed qualification" }]}
        actions={{ primary: { label: "Discuss your specification", href: quoteHref }, secondary: { label: "Selection details", href: "#configuration", variant: "secondary" }, stickyMobile: true }}
        figure={<Figure number={1} title={page.name} note="Concept diagram · not to scale" caption={page.imageCaption}><Image src={page.image} alt={page.imageAlt} width={900} height={600} className="h-auto w-full" preload /></Figure>}
      />
      <PageNav items={[{ id: "configuration", label: "Configuration" }, { id: "checks", label: "Selection checks" }, { id: "questions", label: "Questions" }, { id: "quote", label: "Quote" }]} />
      <PageSection id="configuration" title="Define the product for your assembly" intro={page.use}>
        <div className="grid gap-[16px] md:grid-cols-3">{page.options.map(([title, body]) => <article key={title} className="rounded-card border border-border-default bg-bg2 p-[24px]"><h3 className="text-f18 font-bold text-t1">{title}</h3><p className="mt-[10px] text-f16 leading-golden text-t2">{body}</p></article>)}</div>
        <p className="mt-[20px] max-w-[820px] text-f14 leading-golden text-t2">Send the required configuration for review. The quotation confirms availability, production or sourcing scope, tooling, minimum order, documents and delivery. Performance values must come from the offered grade and assembly.</p>
      </PageSection>
      <PageSection id="checks" title="Resolve these checks before ordering" tone="muted">
        <ol className="grid gap-[16px] md:grid-cols-3">{page.checks.map(([title, body], index) => <li key={title} className="rounded-card border border-border-default bg-white p-[24px]"><p className="font-mono text-f12 text-teal-text">CHECK {index + 1}</p><h3 className="mt-[8px] text-f18 font-bold text-t1">{title}</h3><p className="mt-[10px] text-f16 leading-golden text-t2">{body}</p></li>)}</ol>
      </PageSection>
      <PageSection id="questions" title={`${page.name}: purchasing questions`}>
        <div className="max-w-[900px] divide-y divide-border-default">{page.faq.map(([question, answer]) => <div key={question} className="py-[20px]"><h3 className="text-f18 font-bold text-t1">{question}</h3><p className="mt-[8px] text-f16 leading-golden text-t2">{answer}</p></div>)}</div>
        <ul className="mt-[24px] grid gap-[12px] sm:grid-cols-3">{page.related.map(([label, href]) => <li key={href}><Link href={href} className="flex h-full min-h-[56px] items-center justify-between rounded-card border border-border-default px-[20px] py-[16px] text-f16 font-semibold text-teal-text hover:bg-bg2">{label}<span aria-hidden>→</span></Link></li>)}</ul>
        <p className="mt-[24px] flex flex-wrap gap-[24px] text-f14 font-semibold text-teal-text">{page.related.some(([, href]) => href === "/products/custom-pultruded-profiles") ? null : <Link href="/products/custom-pultruded-profiles">Custom profile development →</Link>}<Link href="/resources/evidence">Review available product evidence →</Link></p>
      </PageSection>
      <PageSection id="quote" title={`Request ${page.name}`} tone="deep">
        <ProductRfq product={page.name} productPath={path} quoteHref={quoteHref} items={page.rfq.map(title => ({ title }))} intro="Start with a drawing and the intended use. These details help define the proposed supply package and qualification plan." advisorPrompt={`Help me prepare a specification inquiry for ${page.name}.`} />
      </PageSection>
    </>
  );
}
