import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import JsonLd from "@/components/seo/JsonLd";
import Figure from "@/components/ui/Figure";
import FAQDisclosure from "@/components/ui/FAQDisclosure";
import SectionGlyph from "@/components/ui/SectionGlyph";
import ApplicationCards from "@/components/products/ApplicationCards";
import ProductDocuments from "@/components/products/ProductDocuments";
import ProductPageNav from "@/components/products/ProductPageNav";
import ProductRfq from "@/components/products/ProductRfq";
import ProductSection from "@/components/products/ProductSection";
import type { IndustryPageData } from "@/content/data/industryPages";
import { buildRfqHref } from "@/lib/rfq";
import { absoluteUrl } from "@/lib/seo";

/**
 * An industry page in the template from the redesign proposal: the scene,
 * where FRP is used area by area and what to check there, the products,
 * projects and applications, documents, questions and the quote block.
 */
export default function IndustryPage({ industry, description }: { industry: IndustryPageData; description: string }) {
  const quote = buildRfqHref({ source: `industry-${industry.slug}`, product: `FRP for ${industry.name.toLowerCase()}`, productPath: industry.path });
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(industry.path)}#webpage`,
    name: industry.h1,
    description,
    url: absoluteUrl(industry.path),
    dateModified: industry.updated,
    about: { "@type": "Thing", name: `FRP profiles for ${industry.name.toLowerCase()}` },
    isPartOf: { "@id": "https://www.f1composite.com/#website" },
    provider: { "@id": "https://www.f1composite.com/#organization" },
  };
  const sections = [
    { id: "areas", label: "Where FRP is used" },
    { id: "products", label: "Products", count: industry.products.length },
    ...(industry.projects.length ? [{ id: "projects", label: "Projects" }] : []),
    { id: "documents", label: "Documents" },
    { id: "faq", label: "FAQ" },
    { id: "quote", label: "Quote" },
  ];

  return (
    <>
      <JsonLd data={schema} />
      <PageHeader
        tag="Industries"
        line={{ name: "Industry", label: industry.name, mark: false }}
        updated={industry.updated}
        title={industry.h1}
        description={industry.intro}
        figure={
          <Figure number={1} title={industry.name} note={industry.image.note} caption={industry.image.caption}>
            <div className="relative -m-[16px] aspect-[16/10]">
              <Image src={industry.image.src} alt={industry.image.alt} fill sizes="(max-width: 1023px) 94vw, 44vw" className="object-cover" preload />
            </div>
          </Figure>
        }
        actions={{
          primary: { label: "Request a quote", href: quote },
          secondary: { label: "See the products", href: "#products", variant: "secondary" },
          stickyMobile: true,
        }}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Industries", href: "/industries" },
          { label: industry.name },
        ]}
      />
      <ProductPageNav items={sections} />

      <ProductSection id="areas" title="Where FRP is used, area by area" intro={industry.areasIntro}>
        <div className="relative overflow-x-auto rounded-card border border-border-default bg-white" role="region" aria-label={`Where FRP is used in ${industry.name.toLowerCase()}`} tabIndex={0}>
          <table className="w-full min-w-[760px] border-collapse text-left text-f14">
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                {["Area", "Conditions", "Typical FRP parts", "What to check"].map((heading) => (
                  <th key={heading} scope="col" className="px-[14px] py-[10px] font-semibold text-t1">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {industry.areas.map((row) => (
                <tr key={row.area} className="border-b border-border-default align-top last:border-b-0">
                  <th scope="row" className="px-[14px] py-[12px] font-bold text-t1">{row.area}</th>
                  <td className="px-[14px] py-[12px] text-t2">{row.exposure}</td>
                  <td className="px-[14px] py-[12px] text-t2">{row.parts}</td>
                  <td className="px-[14px] py-[12px] text-t2">{row.check}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ProductSection>

      <ProductSection id="products" title="Products" count={`${industry.products.length} product families`} tone="muted">
        <ul className="grid gap-[12px] sm:grid-cols-2 lg:grid-cols-3">
          {industry.products.map((product) => (
            <li key={product.href}>
              <Link href={product.href} className="flex h-full items-start gap-[14px] rounded-card border border-border-default bg-white p-[16px] transition-colors hover:border-teal-border">
                <SectionGlyph shape={product.glyph} size={40} />
                <span>
                  <span className="block text-f16 font-bold text-t1">{product.label}</span>
                  <span className="mt-[4px] block text-f14 leading-golden text-t2">{product.reason}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </ProductSection>

      {industry.projects.length ? (
        <ProductSection id="projects" title="Projects and applications">
          <ApplicationCards cards={industry.projects} />
          {industry.reading.length ? (
            <p className="mt-[16px] flex flex-wrap gap-x-[24px] gap-y-[8px] text-f14 font-semibold text-teal-text">
              {industry.reading.map((link) => (
                <Link key={link.href} href={link.href} className="underline underline-offset-4 hover:text-teal">
                  {link.label}
                </Link>
              ))}
            </p>
          ) : null}
        </ProductSection>
      ) : null}

      <ProductSection id="documents" title="Documents" tone={industry.projects.length ? "muted" : "white"}>
        <ProductDocuments productPaths={industry.documentPaths} />
      </ProductSection>

      <ProductSection id="faq" title="Questions buyers ask" tone={industry.projects.length ? "white" : "muted"}>
        <div className="grid items-start gap-[12px] md:grid-cols-2">
          {industry.faqs.map((item) => (
            <FAQDisclosure key={item.question} question={item.question} answer={item.answer} />
          ))}
        </div>
        {!industry.projects.length && industry.reading.length ? (
          <p className="mt-[18px] flex flex-wrap gap-x-[24px] gap-y-[8px] text-f14 font-semibold text-teal-text">
            {industry.reading.map((link) => (
              <Link key={link.href} href={link.href} className="underline underline-offset-4 hover:text-teal">
                {link.label}
              </Link>
            ))}
          </p>
        ) : null}
      </ProductSection>

      <ProductSection id="quote" title={`Quote FRP for ${industry.name.toLowerCase()}`} tone="deep">
        <ProductRfq product={`FRP for ${industry.name.toLowerCase()}`} productPath={industry.path} quoteHref={quote} items={industry.request} intro="Send what the parts do, the loads and exposure, the requirements that apply and the destination." />
      </ProductSection>
    </>
  );
}
