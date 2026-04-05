import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "F1 Composite terms of service. Terms and conditions governing the use of f1composite.com and our products and services.",
};

export default function TermsPage() {
  return (
    <>
      <PageHeader
        tag="Legal"
        title="Terms of Service"
        description="Last updated: March 2026"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Terms of Service" },
        ]}
      />

      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[780px] px-[34px]">
          <div className="prose-custom space-y-[34px] text-f15 leading-golden text-t2">
            <div>
              <h2 className="mb-[13px] text-f19 font-bold text-t1">1. Acceptance of Terms</h2>
              <p>By accessing and using f1composite.com, you agree to be bound by these Terms of Service. If you do not agree, please do not use our website.</p>
            </div>

            <div>
              <h2 className="mb-[13px] text-f19 font-bold text-t1">2. Product Information</h2>
              <p>All product specifications, dimensions, and mechanical property data on this website are provided for reference purposes. Actual values may vary depending on resin system, fiber architecture, and manufacturing conditions. Contact our engineering team for project-specific data.</p>
            </div>

            <div>
              <h2 className="mb-[13px] text-f19 font-bold text-t1">3. Intellectual Property</h2>
              <p>All content on this website, including text, images, graphics, CAD drawings, and technical data, is the property of F1 Composite Co., Ltd and is protected by applicable copyright laws. You may not reproduce, distribute, or republish any content without our written permission.</p>
            </div>

            <div>
              <h2 className="mb-[13px] text-f19 font-bold text-t1">4. Quotations and Orders</h2>
              <p>Quotations provided through this website or via email are valid for 30 days unless otherwise stated. All orders are subject to our standard sales terms and conditions, which will be provided with the formal quotation.</p>
            </div>

            <div>
              <h2 className="mb-[13px] text-f19 font-bold text-t1">5. Limitation of Liability</h2>
              <p>F1 Composite provides this website and its content on an &quot;as is&quot; basis. We make no warranties regarding the accuracy or completeness of technical data published online. Engineering decisions must be based on project-specific data sheets issued by our technical team.</p>
            </div>

            <div>
              <h2 className="mb-[13px] text-f19 font-bold text-t1">6. Governing Law</h2>
              <p>These terms are governed by the laws of the People&apos;s Republic of China. Any disputes shall be resolved through negotiation, and if necessary, by the competent courts in Chongqing, China.</p>
            </div>

            <div>
              <h2 className="mb-[13px] text-f19 font-bold text-t1">7. Contact</h2>
              <p>For questions about these terms, contact:<br />F1 Composite Co., Ltd<br />Email: Doris.li@f1composite.com<br />No. 153 Jinyu Avenue, Cuntan Street, Liangjiang New Area, Chongqing, China</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
