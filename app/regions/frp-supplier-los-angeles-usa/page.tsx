import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageSection from "@/components/layout/PageSection";
import Button from "@/components/ui/Button";
import CoverCard from "@/components/ui/CoverCard";
import { FAQList } from "@/components/ui/FAQ";
import JsonLd from "@/components/seo/JsonLd";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";
import { productCovers } from "@/lib/covers";
import { losAngelesContact as contact, losAngelesInquiryHref } from "@/content/data/losAngeles";

const title = "FRP Supplier Los Angeles | Chino Contact | F1 Composite";
const description = "Source fiberglass profiles, grating and custom FRP for Los Angeles and Southern California projects. Contact Kevin Tang in Chino through our inquiry form.";
const baseMetadata = buildPageMetadata({
  title,
  description,
  path: contact.path,
  image: `${contact.path}/opengraph-image`,
});
export const metadata: Metadata = {
  ...baseMetadata,
  openGraph: { ...baseMetadata.openGraph, locale: "en_US" },
};

const products = [
  {
    href: "/products/fiberglass-structural-shapes",
    title: "Standard structural profiles",
    text: "Start with fiberglass angles, channels, beams and tubes for frames and fabricated assemblies. Provide section dimensions, spans and connection drawings so the proposed profile can be assessed against the actual load path.",
  },
  {
    href: "/products/grating",
    title: "FRP grating",
    text: "Explore molded and pultruded panels for walkways and access platforms. Identify support spacing, openings, loading and wet or dry use. Walking surface, drainage and edge details belong in the specification alongside panel dimensions.",
  },
  {
    href: "/products/window-door-profiles",
    title: "Window and door profiles",
    text: "Review fiberglass sections for window and door fabrication. Share the glazing interface, hardware, finish and assembly drawings. Required performance evidence should cover the finished system; a profile datasheet alone does not establish whole-window performance.",
  },
  {
    href: "/products/custom-pultruded-profiles",
    title: "Custom pultruded profiles",
    text: "Submit a dimensioned cross-section with tolerances, cut lengths, machining and estimated quantities. A custom profile review can clarify geometry, resin options and tooling scope before the quotation is finalized.",
  },
] as const;

const faqs = [
  {
    question: "Who handles Los Angeles project inquiries?",
    answer: "Kevin Tang is the contact for Los Angeles and Southern California inquiries. His contact city is Chino, California, in San Bernardino County. Submit product requirements through the F1 Composite website inquiry form so the team can review the scope with you.",
  },
  {
    question: "How are production and delivery arranged?",
    answer: "F1 Composite supplies through its China production network, with Kevin Tang as the Southern California contact in Chino. Product origin, availability, packing, shipment arrangements and delivery terms are confirmed in the quotation for your specific order.",
  },
  {
    question: "What should I send before requesting a quote?",
    answer: "Include drawings, quantities, intended use and a delivery ZIP code. Add required test documentation and the requested schedule. If drawings are still preliminary, identify unresolved dimensions or loads so quotation assumptions can be recorded clearly.",
  },
];

export default function LosAngelesRegionPage() {
  const serviceId = `${absoluteUrl(contact.path)}#service`;
  return (
    <div lang="en-US">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${absoluteUrl(contact.path)}#webpage`,
        name: title,
        description,
        url: absoluteUrl(contact.path),
        inLanguage: "en-US",
        mainEntity: { "@id": serviceId },
        mentions: {
          "@type": "Person",
          name: contact.name,
          address: {
            "@type": "PostalAddress",
            addressLocality: contact.addressLocality,
            addressRegion: contact.addressRegion,
            addressCountry: contact.addressCountry,
          },
        },
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": serviceId,
        name: "FRP supply inquiries for Los Angeles and Southern California",
        serviceType: "Fiberglass FRP product supply",
        provider: { "@id": "https://www.f1composite.com/#organization" },
        areaServed: [
          { "@type": "City", name: "Los Angeles" },
          { "@type": "City", name: "Chino" },
        ],
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: absoluteUrl(losAngelesInquiryHref),
        },
      }} />
      <PageHeader
        tag="Los Angeles & Southern California"
        title="FRP supplier for Los Angeles projects"
        description="Fiberglass structural profiles, grating, window and door sections, and custom pultrusions for Southern California projects. Connect with Kevin Tang through our official inquiry form."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Markets", href: "/regions" }, { label: "Los Angeles" }]}
        actions={{
          primary: { label: "Request a project quote", href: losAngelesInquiryHref },
          secondary: { label: "Explore products", href: "#products", variant: "secondary" },
          stickyMobile: true,
        }}
        figure={
          <aside className="rounded-card border border-border-default bg-white p-[28px] shadow-card">
            <p className="font-mono text-f12 uppercase tracking-wide text-t3">Southern California contact</p>
            <h2 className="mt-[12px] text-f24 font-bold text-t1">{contact.name}</h2>
            <address className="mt-[16px] text-f18 not-italic leading-golden text-t2">
              {contact.addressLocality}, {contact.addressRegion}<br />{contact.countryName}
            </address>
            <p className="mt-[20px] text-f14 leading-golden text-t2">
              Send drawings and project requirements through the F1 Composite inquiry form for product selection and quotation review.
            </p>
            <Button href={losAngelesInquiryHref} className="mt-[20px]">Contact Kevin Tang</Button>
          </aside>
        }
      />
      <PageSection id="products" title="Choose a product family" intro="Review the range that fits your application, then share the dimensions and performance requirements for your project." tone="white">
        <div className="grid gap-[20px] md:grid-cols-2">
          {products.map(product => (
            <CoverCard key={product.href} {...product} cover={productCovers[product.href]} label="Product range" action="View product range" />
          ))}
        </div>
      </PageSection>
      <PageSection id="specification" title="Coastal and inland projects need different inputs" tone="muted">
        <div className="space-y-[20px] text-f16 leading-golden text-t2">
          <p>For coastal Los Angeles applications, describe salt spray, splash, immersion and any cleaning chemicals separately. For inland sites around Chino and the wider region, identify sunlight exposure, operating temperatures and the surrounding process environment. These details help frame the resin, surface protection and connection review.</p>
          <p>Provide design loads, support conditions and deflection limits for structural components. State fire, slip or assembly performance requirements where applicable. Use our <Link href="/resources/technical-data" className="font-semibold text-teal-text underline">technical data</Link> and <Link href="/resources/downloads" className="font-semibold text-teal-text underline">document downloads</Link> to identify available evidence, then confirm its relevance to the proposed product with your project designer.</p>
          <p>For broader procurement and specification context, see the <Link href="/regions/frp-pultrusion-supplier-usa" className="font-semibold text-teal-text underline">USA FRP supply guide</Link>.</p>
        </div>
      </PageSection>
      <PageSection id="delivery" title="Plan delivery around the receiving site" tone="white">
        <p className="text-f16 leading-golden text-t2">Include the destination city and ZIP code, requested delivery date and receiving contact in your RFQ. For long profiles, describe vehicle access, turning space, unloading equipment and available storage. Identify any cutting or packaging requirements before freight assumptions are agreed.</p>
        <p className="mt-[20px] text-f16 leading-golden text-t2">The quotation should distinguish product scope, tooling, packing and delivery arrangements. Confirm the shipment schedule and responsibility for unloading against the actual order and destination.</p>
        <Button href={losAngelesInquiryHref} className="mt-[24px]">Send your project requirements</Button>
      </PageSection>
      <PageSection id="faq" title="Los Angeles supply inquiries" tone="muted">
        <FAQList items={faqs} />
      </PageSection>
    </div>
  );
}
