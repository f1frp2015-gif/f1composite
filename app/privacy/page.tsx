import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "F1 Composite privacy policy. How we collect, use, and protect your personal information when you visit f1composite.com.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        tag="Legal"
        title="Privacy Policy"
        description="Last updated: March 2026"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy" },
        ]}
      />

      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[780px] px-[34px]">
          <div className="prose-custom space-y-[34px] text-f15 leading-golden text-t2">
            <div>
              <h2 className="mb-[13px] text-f19 font-bold text-t1">1. Information We Collect</h2>
              <p>When you use our website or submit an inquiry, we may collect your name, email address, phone number, company name, and project details. We also collect standard web analytics data such as IP address, browser type, and pages visited.</p>
            </div>

            <div>
              <h2 className="mb-[13px] text-f19 font-bold text-t1">2. How We Use Your Information</h2>
              <p>We use your information to respond to inquiries, provide quotations, deliver technical support, and improve our website. We do not sell or share your personal information with third parties for marketing purposes.</p>
            </div>

            <div>
              <h2 className="mb-[13px] text-f19 font-bold text-t1">3. Data Storage and Security</h2>
              <p>Your data is stored on secure servers and protected using industry-standard encryption. We retain inquiry data for the duration of our business relationship and as required by applicable law.</p>
            </div>

            <div>
              <h2 className="mb-[13px] text-f19 font-bold text-t1">4. Cookies</h2>
              <p>Our website uses essential cookies to ensure proper functionality and analytics cookies to understand how visitors use our site. You can disable cookies in your browser settings at any time.</p>
            </div>

            <div>
              <h2 className="mb-[13px] text-f19 font-bold text-t1">5. Your Rights</h2>
              <p>You have the right to access, correct, or delete your personal data. To exercise these rights, contact us at Doris.li@f1composite.com.</p>
            </div>

            <div>
              <h2 className="mb-[13px] text-f19 font-bold text-t1">6. Contact</h2>
              <p>For privacy-related questions, contact:<br />F1 Composite Co., Ltd<br />Email: Doris.li@f1composite.com<br />No. 153 Jinyu Avenue, Cuntan Street, Liangjiang New Area, Chongqing, China</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
