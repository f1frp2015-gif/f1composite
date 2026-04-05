import type { Metadata } from "next";
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
                  <h3 className="text-f13 font-bold uppercase tracking-[3px] text-t3">Phone</h3>
                  <a
                    href="tel:+8613883333993"
                    className="mt-[5px] block text-f15 font-semibold text-teal-text transition-colors duration-[0.34s] hover:text-teal"
                  >
                    +86 138 8333 3993
                  </a>
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
