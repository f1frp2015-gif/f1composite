import type { Metadata } from "next";
import { Suspense } from "react";
import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/layout/PageHeader";
import JsonLd from "@/components/seo/JsonLd";
import LegalEntityNote from "@/components/sections/LegalEntityNote";
import SectionTag from "@/components/ui/SectionTag";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Request a Quote or Engineering Review",
  description:
    "Send F1 Composite your drawing, dimensions, quantity, and project requirements. Our engineering and sales team responds within one business day.",
  alternates: { canonical: absoluteUrl("/contact") },
};

const quoteChecklist = [
  "Profile drawing or target dimensions",
  "Estimated quantity or project scale",
  "Load case and service environment",
  "Required resin, standard, or test",
  "Destination and target delivery date",
];

export default function ContactPage() {
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Request a Quote from F1 Composite",
    description:
      "Send F1 Composite your drawing, dimensions, quantity, and project requirements for engineering review and quotation.",
    url: absoluteUrl("/contact"),
    mainEntity: { "@id": "https://www.f1composite.com/#organization" },
  };

  return (
    <>
      <JsonLd data={contactPageSchema} />
      <PageHeader
        tag="Engineering & RFQ support"
        title="Send your project requirements"
        description="Upload a drawing or describe the application. We will review the profile, material, documentation, quantity, and delivery requirements before responding."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Request a Quote" },
        ]}
      />

      <section className="bg-bg2 py-[56px] md:py-[72px]">
        <div className="mx-auto grid max-w-[1320px] gap-[34px] px-[20px] sm:px-[28px] lg:grid-cols-[1.15fr_0.85fr] lg:px-[36px]">
          <div>
            <SectionTag>Project inquiry</SectionTag>
            <h2 className="mb-[22px] mt-[12px] text-f24 font-bold tracking-[-0.02em] text-t1">
              Engineering review within one business day
            </h2>
            <Suspense fallback={<div className="text-f13 text-t3">Loading inquiry form…</div>}>
              <ContactForm />
            </Suspense>
          </div>

          <aside className="space-y-[18px] lg:pt-[37px]" aria-label="Contact and quotation guidance">
            <div className="rounded-[11px] border border-border-default bg-white p-[22px]">
              <p className="text-f11 font-bold uppercase tracking-[0.1em] text-teal-text">Direct contact</p>
              <h2 className="mt-[7px] text-f19 font-bold text-t1">Doris Li · Sales Director</h2>
              <div className="mt-[14px] space-y-[8px] text-f13">
                <a href="mailto:inquiry@f1composite.com" className="block font-semibold text-teal-text hover:text-teal">
                  inquiry@f1composite.com
                </a>
                <a href="tel:+8613883338993" className="block font-semibold text-teal-text hover:text-teal">
                  +86 138 8333 8993
                </a>
                <a
                  href="https://wa.me/8613883338993"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[42px] items-center rounded-[7px] bg-[#128c53] px-[14px] font-bold text-white hover:bg-[#0d7c48]"
                >
                  Chat on WhatsApp
                </a>
              </div>
              <p className="mt-[15px] border-t border-border-default pt-[13px] text-f13 leading-relaxed text-t2">
                Monday–Friday · 08:30–17:30 GMT+8<br />
                Chongqing, China
              </p>
            </div>

            <div className="rounded-[11px] border border-border-default bg-deep p-[22px] text-white">
              <p className="text-f11 font-bold uppercase tracking-[0.1em] text-teal">For a faster quote</p>
              <h2 className="mt-[7px] text-f19 font-bold">Include these five project details</h2>
              <ul className="mt-[14px] space-y-[9px]">
                {quoteChecklist.map((item) => (
                  <li key={item} className="flex gap-[9px] text-f13 text-white/78">
                    <span className="mt-[7px] h-[6px] w-[6px] shrink-0 rounded-full bg-teal" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[11px] border border-border-default bg-white p-[22px]">
              <p className="text-f11 font-bold uppercase tracking-[0.1em] text-teal-text">Contracting entity</p>
              <p className="mt-[8px] text-f13 leading-relaxed text-t2">
                F1 Composite is FengDu New Material&apos;s international export company. FengDu operates the manufacturing bases; F1 handles international engineering support, contracts, documentation, and delivery.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-white py-[34px]">
        <div className="mx-auto max-w-[900px] px-[20px] sm:px-[28px] lg:px-[36px]">
          <LegalEntityNote />
        </div>
      </section>
    </>
  );
}
