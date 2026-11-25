import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import Figure from "@/components/ui/Figure";
import ProductRfq from "@/components/products/ProductRfq";
import JsonLd from "@/components/seo/JsonLd";
import { primaryImageObject } from "@/lib/imageSeo";
import { customProductUpdated, type CustomProductPage as ProductPage } from "@/content/data/customProductPages";
import { supplyTerms, weeks } from "@/content/data/company";
import { buildRfqHref } from "@/lib/rfq";
import { absoluteUrl } from "@/lib/seo";

export default function CustomProductPage({ page }: { page: ProductPage }) {
  const path = `/products/${page.slug}`;
  const quoteHref = buildRfqHref({ source: page.slug, product: page.name, productPath: path });
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebPage", name: page.title, description: page.description, url: absoluteUrl(path), primaryImageOfPage: primaryImageObject({ src: page.image, alt: page.imageAlt, caption: page.imageCaption, pagePath: path }), dateModified: customProductUpdated, publisher: { "@id": "https://www.f1composite.com/#organization" } }} />
      <PageHeader tag="Custom product inquiry" title={page.name} description={page.intro}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products", href: "/products/product-lines" }, { label: page.name }]}
        updated={customProductUpdated}
        facts={[{ label: "Made", value: "To your drawing" }, { label: "MOQ", value: `${supplyTerms.moqMeters.toLocaleString("en-US")} m per section` }, { label: "New die to delivery", value: weeks(supplyTerms.newDieLeadTimeWeeks) }]}
        actions={{ primary: { label: "Discuss your specification", href: quoteHref }, secondary: { label: "Selection details", href: "#configuration", variant: "secondary" }, stickyMobile: true }}
        figure={<Figure number={1} title={page.name} note="Concept diagram · not to scale" caption={page.imageCaption}><Image src={page.image} alt={page.imageAlt} width={900} height={600} className="h-auto w-full" preload /></Figure>}
      />
      <PageNav items={[{ id: "configuration", label: "Configuration" }, { id: "checks", label: "Selection checks" }, { id: "questions", label: "Questions" }, { id: "quote", label: "Quote" }]} />
      <PageSection id="configuration" title="Define the product for your assembly" intro={page.use}>
        <div className="grid gap-[16px] md:grid-cols-3">{page.options.map(([title, body]) => <article key={title} className="rounded-card border border-border-default bg-bg2 p-[24px]"><h3 className="text-f18 font-bold text-t1">{title}</h3><p className="mt-[10px] text-f16 leading-golden text-t2">{body}</p></article>)}</div>
        <p className="mt-[20px] max-w-[820px] text-f14 leading-golden text-t2">{`A new section needs its own die: ${weeks(supplyTerms.dieManufactureWeeks)} to make it and ${weeks(supplyTerms.newDieLeadTimeWeeks)} from an approved drawing to first delivery. The minimum order is ${supplyTerms.moqMeters.toLocaleString("en-US")} m per section. ${supplyTerms.samplePolicy}`}</p>
        {page.data ? (
          <div className="mt-[28px]">
            <h3 className="text-f20 font-bold text-t1">{page.data.title}</h3>
            <p className="mt-[8px] max-w-[820px] text-f14 leading-golden text-t2">{page.data.intro}</p>
            <div className="mt-[14px] overflow-x-auto rounded-card border border-border-default bg-white">
              <table className="w-full min-w-[720px] border-collapse text-left text-f14 leading-golden">
                <caption className="sr-only">{page.data.title}</caption>
                <thead><tr className="border-b border-border-default bg-bg2">{page.data.columns.map((column) => <th key={column} scope="col" className="px-[12px] py-[10px] align-top font-semibold text-t1">{column}</th>)}</tr></thead>
                <tbody>{page.data.rows.map((row) => <tr key={row[0]} className="border-b border-border-default last:border-b-0">{row.map((value, index) => index === 0 ? <th key={index} scope="row" className="px-[12px] py-[10px] align-top font-semibold text-t1">{value}</th> : <td key={index} className="px-[12px] py-[10px] align-top text-t2">{value}</td>)}</tr>)}</tbody>
              </table>
            </div>
            <p className="mt-[10px] max-w-[820px] text-f14 leading-golden text-t2">{page.data.note}{page.data.source ? <> Source: <a href={page.data.source.href} className="font-semibold text-teal-text underline underline-offset-4" rel="noopener">{page.data.source.label}</a>.</> : null}</p>
          </div>
        ) : null}
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
