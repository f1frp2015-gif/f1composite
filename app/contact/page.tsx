import type { Metadata } from "next";
import { Suspense } from "react";
import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/layout/PageHeader";
import WhatsAppButton from "@/components/contact/WhatsAppButton";
import JsonLd from "@/components/seo/JsonLd";
import LegalEntityNote from "@/components/sections/LegalEntityNote";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Request a Quote | F1 Composite",
  description:
    "Start your F1 Composite inquiry with just your name and email. Drawings and specifications are optional. Our team will help confirm the details.",
  alternates: { canonical: absoluteUrl("/contact") },
};

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
        tag="Request a quote"
        title="Request a quote"
        description="Tell us how to reach you. No drawings or complete specifications needed to get started."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Request a Quote" },
        ]}
      />

      <section className="bg-bg2 py-6 md:py-8">
        <div className="site-container grid gap-[34px] lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <h2 className="sr-only">Start your inquiry</h2>
            <Suspense fallback={<div className="text-f14 text-t3">Loading inquiry form…</div>}>
              <ContactForm />
            </Suspense>
          </div>

          <aside className="space-y-[18px] lg:pt-[37px]" aria-label="Contact and quotation guidance">
            <div className="rounded-[11px] border border-border-default bg-white p-[22px]">
              <p className="text-f12 font-bold uppercase tracking-[0.1em] text-teal-text">Direct contact</p>
              <h2 className="mt-[7px] text-f18 font-bold text-t1">Doris Li · Sales Director</h2>
              <div className="mt-[14px] space-y-[8px] text-f14">
                <a href="mailto:inquiry@f1composite.com" className="block font-semibold text-teal-text hover:text-teal">
                  inquiry@f1composite.com
                </a>
                <a href="tel:+8613883338993" className="block font-semibold text-teal-text hover:text-teal">
                  +86 138 8333 8993
                </a>
                <WhatsAppButton location="contact-page" label="Chat on WhatsApp" />
              </div>
              <p className="mt-[15px] border-t border-border-default pt-[13px] text-f14 leading-relaxed text-t2">
                Monday–Friday · 08:30–17:30 GMT+8<br />
                Chongqing, China
              </p>
            </div>

            <div className="rounded-[11px] bg-deep p-[22px] text-white">
              <h2 className="text-f18 font-bold">Still working out the details?</h2>
              <p className="mt-3 text-sm text-white/80">Send your inquiry now. We can help confirm the right product, quantity and delivery requirements together.</p>
              <p className="mt-3 text-sm text-white/80">Already have a drawing or specification? You can attach it as an optional extra or send it after we reply.</p>
            </div>

            <div className="rounded-[11px] border border-border-default bg-white p-[22px]">
              <p className="text-f12 font-bold uppercase tracking-[0.1em] text-teal-text">Contracting entity</p>
              <p className="mt-[8px] text-f14 leading-relaxed text-t2">
                Chongqing F1 Composites Co., Ltd. is the export company of FengDu New Material. FengDu runs the factories; F1 signs the contract and handles engineering support, documents and delivery.
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
