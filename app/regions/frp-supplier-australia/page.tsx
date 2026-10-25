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
import { australiaContact as contact, australiaInquiryHref } from "@/content/data/australia";

const title = "FRP Supplier Australia | Gold Coast Contact | F1 Composite";
const description = "Source fibreglass FRP/GRP profiles, grating and window sections for Australian projects. Contact Mason Liu in Southport, Gold Coast, via our enquiry form.";
const baseMetadata = buildPageMetadata({ title, description, path: contact.path, image: `${contact.path}/opengraph-image` });
export const metadata: Metadata = {
  ...baseMetadata,
  openGraph: { ...baseMetadata.openGraph, locale: "en_AU" },
};

const products = [
  { href: "/products/fiberglass-structural-shapes", title: "Structural FRP profiles", text: "Explore I-beams, channels, angles and tubes for support frames and fabricated assemblies. Specify section dimensions, span, loads and connection details so material and geometry can be reviewed together." },
  { href: "/products/grating", title: "FRP / GRP grating", text: "Compare moulded and pultruded grating for platforms, walkways and access areas. Share panel dimensions, support spacing, load cases, openings and the required walking surface before selecting a panel." },
  { href: "/products/window-door-profiles", title: "Window and door profiles", text: "Review fibreglass sections for window and door fabrication. Identify the profile interface, glazing arrangement, finish and performance evidence needed for the completed assembly; a profile alone does not establish whole-window performance." },
  { href: "/products/custom-pultruded-profiles", title: "Custom pultruded sections", text: "Send a dimensioned section drawing for a custom profile review. Include tolerances, cut lengths, machining, resin preferences and expected order quantities. Tooling requirements and the production scope are confirmed during quotation." },
] as const;

const faqs = [
  { question: "Who is the Australian contact for F1 Composite?", answer: "Mason Liu is the Australian contact, with a contact address at 10 Gillian Lane, Southport, Queensland 4215, on the Gold Coast. Use the website enquiry form for product questions and quotations so drawings and project requirements can be routed to the appropriate team." },
  { question: "Are the FRP products manufactured in Australia?", answer: "F1 Composite supplies through its China production network. The Gold Coast details identify the Australian contact address. Product origin, production arrangements and delivery terms should be recorded in the quotation for your order." },
  { question: "Can I request delivery outside Queensland?", answer: "You can submit enquiries for projects across Australia. Include the delivery suburb, state and postcode, along with quantities and lengths. Freight scope, delivery feasibility, unloading requirements and estimated dates are confirmed for the specific order." },
  { question: "What evidence should I request for my project?", answer: "Provide your project specification and required test methods at enquiry stage. Ask for evidence that matches the proposed section, resin, finish and use. Your project designer should assess its applicability, including structural, fire, slip or window performance requirements where relevant." },
];

export default function AustraliaRegionPage() {
  const serviceId = `${absoluteUrl(contact.path)}#service`;
  return <div lang="en-AU">
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${absoluteUrl(contact.path)}#webpage`,
        name: title,
        description,
        url: absoluteUrl(contact.path),
        inLanguage: "en-AU",
        mainEntity: { "@id": serviceId },
      }}
    />
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": serviceId,
        name: "FRP supply enquiries for Australian projects",
        serviceType: "Fibreglass FRP/GRP product supply",
        provider: { "@id": "https://www.f1composite.com/#organization" },
        areaServed: { "@type": "Country", name: "Australia" },
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: absoluteUrl(australiaInquiryHref),
          serviceLocation: {
            "@type": "Place",
            name: "F1 Composite Australian contact address",
            address: {
              "@type": "PostalAddress",
              streetAddress: contact.streetAddress,
              addressLocality: contact.addressLocality,
              addressRegion: contact.addressRegion,
              postalCode: contact.postalCode,
              addressCountry: contact.addressCountry,
            },
          },
        },
      }}
    />
    <PageHeader
      tag="Australia · Queensland · Gold Coast"
      title="FRP supplier for Australian projects"
      description="Fibreglass FRP/GRP structural profiles, grating, window and door sections, and custom pultrusions. Discuss your Australian project with F1 Composite through our website enquiry form."
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Markets", href: "/regions" }, { label: "Australia" }]}
      actions={{
        primary: { label: "Request an Australian project quote", href: australiaInquiryHref },
        secondary: { label: "Explore products", href: "#products", variant: "secondary" },
        stickyMobile: true,
      }}
      figure={<aside className="rounded-card border border-border-default bg-white p-[28px] shadow-card">
        <p className="font-mono text-f12 uppercase tracking-wide text-t3">Australian contact</p>
        <h2 className="mt-[12px] text-f24 font-bold text-t1">{contact.name}</h2>
        <address className="mt-[16px] text-f18 not-italic leading-golden text-t2">{contact.streetAddress}<br />{contact.addressLocality}, {contact.addressRegion} {contact.postalCode}<br />{contact.city}, Australia</address>
        <p className="mt-[20px] text-f14 leading-golden text-t2">
          For product selection, drawings and quotation requests, send your details through the F1
          Composite enquiry form.
        </p>
        <Link className="mt-[16px] inline-block font-semibold text-teal-text underline" href={australiaInquiryHref}>Send a project enquiry →</Link>
      </aside>} />
    <PageSection id="products" title="Choose a product family" intro="Product images below show the relevant product ranges. Select a family to review configurations and technical information." tone="white">
      <div className="grid gap-[20px] md:grid-cols-2">
        {products.map(product => (
          <CoverCard
            key={product.href}
            {...product}
            cover={productCovers[product.href]}
            label="Product range"
            action="View product range"
          />
        ))}
      </div>
      <p className="mt-[24px] text-f16 leading-golden text-t2">For photovoltaic structures, see our <Link href="/regions/pultruded-frp-solar-mounting-australia" className="font-semibold underline">Australian FRP solar mounting guide</Link>. Provide the mounting arrangement, site exposure and project load requirements for review.</p>
      <p className="mt-[16px] text-f16 leading-golden text-t2">Comparing retail flooring with project grating? Read our <Link href="/products/frp-grating-bunnings" className="font-semibold text-teal-text underline">FRP grating Bunnings buying guide</Link> for material differences, panel selection and quotation requirements.</p>
    </PageSection>
    <PageSection id="specification" title="Specify for the actual exposure and installation" tone="muted">
      <div className="space-y-[20px] text-f16 leading-golden text-t2">
        <p>
          Coastal Queensland projects and other exposed Australian sites need a clear service
          environment specification. State whether the component faces salt spray, immersion,
          chemicals, sustained sunlight or elevated temperatures. Resin selection, surface
          protection, cut edges and connection materials should be considered as part of the
          assembly.
        </p>
        <p>
          For structural work, provide design loads, support conditions and deflection limits. For
          access surfaces, identify wet conditions, footwear, drainage and slip requirements. For
          window and door systems, specify the required performance of the finished assembly. Agree
          on applicable evidence before placing an order, rather than treating a generic material
          description as proof of suitability.
        </p>
      </div>
    </PageSection>
    <PageSection id="enquiry" title="What to include in your Australian RFQ" tone="white">
      <ul className="list-disc space-y-[12px] pl-[24px] text-f16 leading-golden text-t2">
        <li>Product family, drawings or section dimensions, tolerances and cut lengths.</li>
        <li>Quantities, project use, loads, support spacing and connection details.</li>
        <li>Exposure conditions, resin or finish preferences and required specifications.</li>
        <li>Delivery suburb, state and postcode; site access and unloading constraints.</li>
        <li>Requested delivery date, documentation needs and preferred freight scope.</li>
      </ul>
      <p className="mt-[20px] text-f16 leading-golden text-t2">
        These details help separate product cost, tooling and delivery assumptions. Confirm the
        final scope, technical evidence and delivery terms in the written quotation.
      </p>
      <Button href={australiaInquiryHref} className="mt-[24px]">Send your project requirements</Button>
    </PageSection>
    <PageSection id="faq" title="Australian supply enquiries" tone="muted">
      <FAQList items={faqs} />
    </PageSection>
  </div>;
}
