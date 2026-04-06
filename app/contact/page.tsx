import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/layout/PageHeader";
import SectionTag from "@/components/ui/SectionTag";
import ContactForm from "@/components/ContactForm";
import JsonLd from "@/components/seo/JsonLd";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with F1 Composite for quotations, technical consultation, or partnership inquiries. Our engineering team responds within one business day.",
};

export default function ContactPage() {
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact F1 Composite",
    description:
      "Get in touch with F1 Composite for quotations, technical consultation, or partnership inquiries. Our engineering team responds within one business day.",
    url: absoluteUrl("/contact"),
    mainEntity: {
      "@type": "Organization",
      name: "F1 Composite Co., Ltd",
      url: absoluteUrl("/"),
      email: "Doris.li@f1composite.com",
      telephone: "+86-138-8333-3993",
      address: {
        "@type": "PostalAddress",
        streetAddress: "No. 153 Jinyu Avenue, Cuntan Street, Liangjiang New Area",
        addressLocality: "Chongqing",
        addressCountry: "CN",
      },
      contactPoint: {
        "@type": "ContactPoint",
        email: "Doris.li@f1composite.com",
        telephone: "+86-138-8333-3993",
        contactType: "sales",
        availableLanguage: ["English", "Chinese"],
      },
    },
  };

  return (
    <>
      <JsonLd data={contactPageSchema} />
      <PageHeader
        tag="Contact"
        title="Let's Talk About Your Project"
        description="Whether you need a quotation, technical guidance, or want to explore a partnership, our engineering team is ready to help."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
      />

      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="grid gap-[34px] lg:grid-cols-[61.8%_1fr]">
            {/* Form */}
            <div>
              <SectionTag>Send an Inquiry</SectionTag>
              <h2 className="mt-[21px] mb-[34px] text-f24 font-bold text-t1">
                Fill out the form and we will respond within one business day
              </h2>
              <ContactForm />
            </div>

            {/* Company Info */}
            <div>
              <SectionTag>Company Details</SectionTag>
              <h2 className="mt-[21px] mb-[34px] text-f24 font-bold text-t1">
                F1 Composite Co., Ltd
              </h2>

              <div className="space-y-[34px]">
                <div>
                  <h3 className="text-f13 font-bold uppercase tracking-[3px] text-t3">Contact</h3>
                  <p className="mt-[5px] text-f15 font-semibold text-t1">Doris Li</p>
                  <p className="text-f13 text-t3">Sales Director</p>
                </div>

                <div>
                  <h3 className="text-f13 font-bold uppercase tracking-[3px] text-t3">Email</h3>
                  <a
                    href="mailto:Doris.li@f1composite.com"
                    className="mt-[5px] block text-f15 font-semibold text-teal-text transition-colors duration-[0.34s] hover:text-teal"
                  >
                    Doris.li@f1composite.com
                  </a>
                </div>

                <div>
                  <h3 className="text-f13 font-bold uppercase tracking-[3px] text-t3">Phone / WhatsApp</h3>
                  <a
                    href="tel:+8613883333993"
                    className="mt-[5px] block text-f15 font-semibold text-teal-text transition-colors duration-[0.34s] hover:text-teal"
                  >
                    +86 138 8333 3993
                  </a>
                  <a
                    href="https://wa.me/8613883333993"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-[8px] inline-flex items-center gap-[6px] rounded-[6px] bg-[#25D366] px-[13px] py-[6px] text-f13 font-medium text-white transition-opacity hover:opacity-90"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Chat on WhatsApp
                  </a>
                  <div className="mt-[13px]">
                    <Image
                      src="/images/contact/whatsapp-qr-doris.jpg"
                      alt="Scan to add Doris Li on WhatsApp"
                      width={120}
                      height={120}
                      className="rounded-[6px]"
                    />
                    <p className="mt-[4px] text-[11px] text-t3">Scan to add on WhatsApp</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-f13 font-bold uppercase tracking-[3px] text-t3">Address</h3>
                  <p className="mt-[5px] text-f15 leading-golden text-t2">
                    F1 Composite Co., Ltd
                    <br />
                    No. 153 Jinyu Avenue, Cuntan Street
                    <br />
                    Liangjiang New Area, Chongqing, China
                  </p>
                </div>

                <div>
                  <h3 className="text-f13 font-bold uppercase tracking-[3px] text-t3">
                    Business Hours
                  </h3>
                  <p className="mt-[5px] text-f15 leading-golden text-t2">
                    Monday - Friday: 08:30 - 17:30 (GMT+8)
                    <br />
                    We respond to all inquiries within one business day.
                  </p>
                </div>

                <div className="rounded-[8px] border border-border-default bg-white p-[21px]">
                  <h3 className="text-f15 font-bold text-t1">Prefer a direct conversation?</h3>
                  <p className="mt-[8px] text-f13 leading-golden text-t2">
                    For urgent technical questions or large-volume RFQs, email Doris directly at{" "}
                    <a
                      href="mailto:Doris.li@f1composite.com"
                      className="font-semibold text-teal-text hover:text-teal"
                    >
                      Doris.li@f1composite.com
                    </a>{" "}
                    and reference your project timeline. We prioritize time-sensitive requests.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
