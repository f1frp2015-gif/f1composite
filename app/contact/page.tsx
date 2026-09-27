import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/layout/PageHeader";
import WhatsAppButton from "@/components/contact/WhatsAppButton";
import JsonLd from "@/components/seo/JsonLd";
import { absoluteUrl } from "@/lib/seo";
import { company, supplyTerms } from "@/content/data/company";

export const metadata: Metadata = {
  title: "Request a Quote | F1 Composite",
  description:
    "Start your F1 Composite inquiry with just your name and email. Drawings and specifications are optional. Our team will help confirm the details.",
  alternates: { canonical: absoluteUrl("/contact") },
};

const nextSteps = [
  { title: "A reply within one business day", text: "We acknowledge the request and confirm the product, quantities and the next step." },
  { title: "Details and drawings when ready", text: "Send them with the inquiry or after our reply. Engineering checks a section against the existing dies." },
  { title: "A written quotation", text: "It follows the specification and delivery review, with price, lead time and the delivery term." },
];

const phoneHref = `tel:${company.contact.phone.replace(/-/g, "")}`;
const phoneLabel = company.contact.phone.replace(/^\+86-(\d{3})-(\d{4})-(\d{4})$/, "+86 $1 $2 $3");

export default function ContactPage() {
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Request a Quote from F1 Composite",
    description:
      "Start an inquiry with your name and email. Add product details or drawings whenever you are ready.",
    url: absoluteUrl("/contact"),
    mainEntity: { "@id": "https://www.f1composite.com/#organization" },
  };

  return (
    <>
      <JsonLd data={contactPageSchema} />
      <PageHeader
        tag="Contact"
        title="Request a quote"
        description="Send your name, email and a short note. The export team replies and works out the product, quantity and delivery details with you."
        facts={[
          { label: "Reply time", value: supplyTerms.responseTime.replace(/^./, (c) => c.toUpperCase()) },
          { label: "Languages", value: company.contact.languages.join(", ") },
          // Last, so a phone gives the longest value the full row.
          { label: "Office hours", value: "Mon–Fri, 08:30–17:30 GMT+8" },
        ]}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Request a quote" },
        ]}
      />

      {/* The form is this page's quote step, so the footer's quote band stays hidden. */}
      <section data-page-rfq className="border-b border-border-default bg-bg2 py-[32px] md:py-[48px]">
        <div className="site-container grid items-start gap-[24px] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-[32px]">
          <div>
            <h2 className="sr-only">Start your inquiry</h2>
            <Suspense fallback={<div className="text-f14 text-t3">Loading inquiry form…</div>}>
              <ContactForm />
            </Suspense>
          </div>

          <aside className="space-y-[12px]" aria-label="Contact and quotation guidance">
            <div className="rounded-card border border-border-default bg-white p-[20px] sm:p-[24px]">
              <h2 className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Direct contact</h2>
              <p className="mt-[8px] text-f18 font-bold text-t1">{company.contact.salesName} · Sales Director</p>
              <div className="mt-[12px] space-y-[4px] text-f16">
                <a href={`mailto:${company.contact.email}`} className="block font-semibold text-teal-text hover:underline">
                  {company.contact.email}
                </a>
                <a href={phoneHref} className="block font-semibold text-teal-text hover:underline">
                  {phoneLabel}
                </a>
              </div>
              <WhatsAppButton location="contact-page" label="Chat on WhatsApp" variant="outline" className="mt-[16px] w-full sm:w-auto" />
              <p className="mt-[16px] border-t border-border-default pt-[12px] text-f14 leading-relaxed text-t2">
                Chongqing, China · Mon–Fri, 08:30–17:30 GMT+8
              </p>
            </div>

            <div className="rounded-card border border-border-default bg-white p-[20px] sm:p-[24px]">
              <h2 className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">What happens next</h2>
              <ol className="mt-[12px] space-y-[12px]">
                {nextSteps.map((step, index) => (
                  <li key={step.title} className="grid grid-cols-[24px_minmax(0,1fr)] gap-x-[12px]">
                    <span aria-hidden className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-teal-bg2 font-mono text-f12 font-medium text-teal-text">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-f14 font-semibold text-t1">{step.title}</p>
                      <p className="mt-[2px] text-f14 leading-relaxed text-t2">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-card border border-border-default bg-white p-[20px] sm:p-[24px]">
              <h2 className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Contracting entity</h2>
              <p className="mt-[8px] text-f14 leading-relaxed text-t2">
                {company.legalName} is the export company of {company.parent.name}. FengDu runs the factories; F1 signs the
                contract and handles engineering support, documents and delivery.
              </p>
              <Link href="/about" className="mt-[8px] inline-block text-f14 font-semibold text-teal-text hover:underline">
                Company background →
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
