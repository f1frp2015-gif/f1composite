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
import { pultrusionGuidePath, pultrusionGuideReviewed, type PultrusionGuide } from "@/content/data/pultrusionGuideTypes";
import { absoluteUrl } from "@/lib/seo";
import { buildRfqHref } from "@/lib/rfq";

const sourceLink = "font-semibold text-teal-text underline underline-offset-4 hover:text-teal";

function SourceRefs({ page, ids }: { page: PultrusionGuide; ids: string[] }) {
  if (!ids.length) return null;
  return (
    <p className="mt-[16px] flex flex-wrap gap-x-[16px] gap-y-[8px] text-f12 leading-relaxed">
      <span className="text-t3">References</span>
      {ids.map((id) => {
        const source = page.sources.find((item) => item.id === id);
        return source ? <a key={id} href={source.url} className={sourceLink}>{source.title}</a> : null;
      })}
    </p>
  );
}

export default function PultrusionGuidePage({ page }: { page: PultrusionGuide }) {
  const path = pultrusionGuidePath(page);
  const isApplication = page.kind === "application";
  const quoteHref = buildRfqHref({
    source: `pultrusion-guide-${page.slug}`,
    product: page.name,
    productPath: path,
    message: `Please review ${page.name.toLowerCase()} for my project. I will provide the drawings, operating conditions, governing specification and qualification requirements.`,
  });
  const nav = [
    { id: "scope", label: "Scope & material" },
    ...page.sections.map((section) => ({ id: section.id, label: section.id.replaceAll("-", " ").replace(/^./, (letter) => letter.toUpperCase()) })),
    { id: "standards", label: "Standards & regulations" },
    { id: "faq", label: "Questions" },
    { id: "sources", label: "Sources" },
    { id: "quote", label: "Project brief" },
  ];

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": isApplication ? "TechArticle" : "WebPage",
        headline: page.heading,
        name: page.name,
        description: page.description,
        url: absoluteUrl(path),
        mainEntityOfPage: absoluteUrl(path),
        dateModified: pultrusionGuideReviewed,
        image: absoluteUrl(page.image),
        publisher: { "@id": "https://www.f1composite.com/#organization" },
        citation: page.sources.map((source) => source.url),
      }} />
      <PageHeader
        tag={isApplication ? "Pultrusion application guide" : "Specialist component specification"}
        title={page.heading}
        description={page.summary}
        updated={pultrusionGuideReviewed}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: isApplication ? "Applications" : "Products", href: isApplication ? "/applications" : "/products/product-lines" },
          { label: page.name },
        ]}
        actions={{
          primary: { label: "Discuss your specification", href: quoteHref },
          secondary: { label: "Review requirements", href: "#standards", variant: "secondary" },
          stickyMobile: true,
        }}
        figure={
          <Figure number={1} title={page.name} note="Application schematic · not to scale" caption={page.imageCaption} bleed>
            <Image src={page.image} alt={page.imageAlt} width={1200} height={800} sizes="(max-width: 1023px) 94vw, 44vw" className="h-auto w-full" preload />
          </Figure>
        }
      />
      <PageNav items={nav} />
      <PageSection id="scope" title="Component scope and material selection">
        <div className="grid gap-[24px] lg:grid-cols-2 lg:gap-[48px]">
          <div>
            <p className="text-f16 leading-relaxed text-t2">{page.scope}</p>
            <div className="mt-[24px] border-l-2 border-teal pl-[20px]">
              <h3 className="text-f18 font-bold text-t1">Select the complete material system</h3>
              <p className="mt-[8px] text-f16 leading-relaxed text-t2">{page.material}</p>
            </div>
          </div>
          <div className="rounded-card border border-border-default bg-bg2 p-[24px]">
            <h3 className="text-f18 font-bold text-t1">Components to specify</h3>
            <ul className="mt-[12px] list-disc space-y-[10px] pl-[20px] text-f16 leading-relaxed text-t2">
              {page.profiles.map((profile) => <li key={profile}>{profile}</li>)}
            </ul>
            <ul className="mt-[20px] space-y-[10px] border-t border-border-default pt-[16px] text-f14">
              {page.related.filter((item) => item.href.startsWith(isApplication ? "/products/" : "/applications/")).map((item) => (
                <li key={item.href}><Link className={sourceLink} href={item.href}>{item.label} →</Link></li>
              ))}
            </ul>
          </div>
        </div>
      </PageSection>

      {page.sections.map((section, index) => (
        <PageSection key={section.id} id={section.id} title={section.title} tone={index % 2 === 0 ? "muted" : "white"}>
          <div className="max-w-[880px] space-y-[16px] text-f16 leading-relaxed text-t2">
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.points?.length ? <ul className="list-disc space-y-[10px] pl-[22px]">{section.points.map((point) => <li key={point}>{point}</li>)}</ul> : null}
          </div>
          {section.table ? (
            <div className="mt-[24px] overflow-x-auto rounded-card border border-border-default" role="region" aria-label={`${section.title} comparison`} tabIndex={0}>
              <table className="w-full min-w-[640px] border-collapse text-left text-f14 leading-relaxed">
                <caption className="sr-only">{section.title}</caption>
                <thead className="bg-deep text-white"><tr>{section.table.columns.map((column) => <th key={column} scope="col" className="px-[20px] py-[14px] font-semibold">{column}</th>)}</tr></thead>
                <tbody className="bg-white text-t2">{section.table.rows.map((row) => (
                  <tr key={row[0]} className="border-t border-border-default">{row.map((cell, i) => i === 0
                    ? <th key={i} scope="row" className="px-[20px] py-[16px] align-top font-semibold text-t1">{cell}</th>
                    : <td key={i} className="px-[20px] py-[16px] align-top">{cell}</td>)}</tr>
                ))}</tbody>
              </table>
            </div>
          ) : null}
          <SourceRefs page={page} ids={section.sourceIds} />
        </PageSection>
      ))}

      <PageSection id="standards" title="Standards, regulations and acceptance evidence" intro="The project authority determines the governing jurisdiction and adopted edition. The scope of each reference matters: a material test, an equipment requirement and a workplace rule answer different questions." tone="muted">
        <div className="grid gap-[16px] lg:grid-cols-2">
          {page.standards.map((standard) => (
            <article key={standard.name} className="rounded-card border border-border-default bg-white p-[24px]">
              <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">{standard.category} · {standard.jurisdiction}</p>
              <h3 className="mt-[8px] text-f20 font-bold text-t1">{standard.name}</h3>
              <p className="mt-[12px] text-f14 leading-relaxed text-t2">{standard.applies}</p>
              <p className="mt-[12px] border-t border-border-default pt-[12px] text-f14 leading-relaxed text-t2"><strong className="font-semibold text-t1">Application boundary: </strong>{standard.limits}</p>
              <SourceRefs page={page} ids={standard.sourceIds} />
            </article>
          ))}
        </div>
        <p className="mt-[20px] max-w-[880px] text-f14 leading-relaxed text-t3">Public source scopes were reviewed on {pultrusionGuideReviewed}. These references do not establish certification of an F1 product. Agree the offered grade, finished component, test specimen and acceptance criteria in the project specification.</p>
      </PageSection>

      <PageSection id="faq" title={`${page.name}: practical questions`}>
        <FAQList items={page.faqs} />
      </PageSection>

      <PageSection id="sources" title="Technical sources and further reading" tone="muted" intro="Industry sources establish where the application is used. Authority sources define the published scope of standards and regulations. The design and procurement checklists above are an original engineering synthesis for project review.">
        <ol className="grid gap-[12px] lg:grid-cols-2">
          {page.sources.map((source) => (
            <li id={`source-${source.id}`} key={source.id} className="min-w-0 rounded-card border border-border-default bg-white p-[20px]">
              <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">{source.kind === "authority" ? "Standard or public authority" : "Industry application evidence"}</p>
              <a href={source.url} className={`mt-[8px] inline-block text-f16 ${sourceLink}`}>{source.title}</a>
              <p className="mt-[8px] text-f14 leading-relaxed text-t2">{source.note}</p>
            </li>
          ))}
        </ol>
      </PageSection>

      <PageSection id="quote" title="Prepare a component qualification brief" tone="deep">
        <ProductRfq
          product={page.name}
          productPath={path}
          quoteHref={quoteHref}
          quoteLabel="Send your project brief"
          intro="Provide the application and acceptance requirements so we can assess material, geometry, sampling and the proposed supply scope."
          items={page.specification.map((item, index) => ({ title: `${String(index + 1).padStart(2, "0")} · ${item}` }))}
          links={page.related.filter((link) => link.href.startsWith(isApplication ? "/products/" : "/applications/")).slice(0, 3)}
        />
      </PageSection>
      <RelatedLinks title="Continue the specification" groups={[{ title: "Products and application guidance", links: page.related }]} />
    </>
  );
}
