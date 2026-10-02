import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import { company } from "@/content/data/company";
import { photoRights } from "@/content/data/ownedPhotos";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "F1 Composite terms of service. Terms and conditions governing your use of f1composite.com and our pultruded FRP products and services.",
  alternates: { canonical: absoluteUrl("/terms") },
  // Keep the legal page available to users and crawlable so search engines can
  // read the directive, but do not treat it as a search landing page.
  robots: { index: false, follow: true },
};

const h2 = "mb-[12px] text-f20 font-bold text-t1";

export default function TermsPage() {
  const { address } = company;
  return (
    <>
      <PageHeader
        tag="Legal"
        title="Terms of service"
        description="The terms that apply to using f1composite.com and to quotations requested through it. Last updated October 2026."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Terms of service" },
        ]}
      />

      <section className="bg-white py-[48px] md:py-[64px]">
        <div className="site-container">
          <div className="max-w-[760px] space-y-[32px] text-f16 leading-golden text-t2">
            <div>
              <h2 className={h2}>1. Acceptance of terms</h2>
              <p>By accessing and using f1composite.com, you agree to be bound by these Terms of Service. If you do not agree, please do not use our website.</p>
            </div>

            <div>
              <h2 className={h2}>2. Product information</h2>
              <p>All product specifications, dimensions, and mechanical property data on this website are provided for reference purposes. Actual values may vary depending on resin system, fiber architecture, and manufacturing conditions. Contact our engineering team for project-specific data.</p>
            </div>

            <div>
              <h2 className={h2}>3. Intellectual property</h2>
              <p>The content of this website, including text, images, graphics, CAD drawings and technical data, belongs to {company.legalName} or is used under licence, and is protected by copyright. You may not reproduce, distribute or republish it without our written permission.</p>
            </div>

            <div id="image-use" className="scroll-mt-[100px]">
              <h2 className={h2}>4. Image use</h2>
              <p>
                Photos of FengDu&apos;s production halls, of our products in production and of our own installations carry the mark &quot;© f1composite.com&quot; and copyright information in the file. They are {photoRights.notice.replace(" All rights reserved.", "")}. You may not use them to present another company&apos;s plant, products or projects, or to advertise products we did not make. Distributors and customers selling our products may use them with our written permission and the credit &quot;Photo: {photoRights.credit}&quot;.{" "}
                <Link className="font-semibold text-teal-text underline underline-offset-4" href="/contact?source=image-license&inquiry_type=general">Ask us for permission</Link>.
              </p>
              <p className="mt-[12px]">Images labelled &quot;Illustrative photo&quot; are stock images licensed from third parties; we cannot license them to you.</p>
            </div>

            <div>
              <h2 className={h2}>5. Quotations and orders</h2>
              <p>Quotations provided through this website or via email are valid for 30 days unless otherwise stated. All orders are subject to our standard sales terms and conditions, which will be provided with the formal quotation.</p>
            </div>

            <div>
              <h2 className={h2}>6. Limitation of liability</h2>
              <p>F1 Composite provides this website and its content on an &quot;as is&quot; basis. We make no warranties regarding the accuracy or completeness of technical data published online. Engineering decisions must be based on project-specific data sheets issued by our technical team.</p>
            </div>

            <div>
              <h2 className={h2}>7. Governing law</h2>
              <p>These terms are governed by the laws of the People&apos;s Republic of China. Any disputes shall be resolved through negotiation, and if necessary, by the competent courts in Chongqing, China.</p>
            </div>

            <div>
              <h2 className={h2}>8. Contact</h2>
              <p>
                For questions about these terms, contact {company.legalName},{" "}
                {address.streetAddress}, {address.addressRegion}, {address.addressLocality}, China, at{" "}
                <a className="font-semibold text-teal-text underline underline-offset-4" href={`mailto:${company.contact.email}`}>
                  {company.contact.email}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
