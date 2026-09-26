import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import CookieSettingsButton from "@/components/consent/CookieSettingsButton";
import { company } from "@/content/data/company";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How F1 Composite handles enquiry details, AI assistant conversations, cookies and site statistics on f1composite.com, and how to use your privacy rights.",
  alternates: { canonical: absoluteUrl("/privacy") },
  // Keep the legal page available to users and crawlable so search engines can
  // read the directive, but do not treat it as a search landing page.
  robots: { index: false, follow: true },
};

const h2 = "mb-[13px] text-f18 font-bold text-t1";
const h3 = "mb-[6px] mt-[18px] text-f16 font-bold text-t1";
const list = "list-disc space-y-[6px] pl-[20px]";

const cookies = [
  { name: "_ga, _ga_*", provider: "Google Analytics", purpose: "Tells visits apart so pages and visits can be counted", lasts: "Up to 2 years" },
  { name: "_gcl_au", provider: "Google Ads", purpose: "Links an ad click to a later enquiry", lasts: "90 days" },
  { name: "f1c_consent (local storage)", provider: "This site", purpose: "Remembers your cookie choice", lasts: "12 months" },
  { name: "f1_datasheet_lead_email (local storage)", provider: "This site", purpose: "Remembers that you already gave an email for datasheet downloads", lasts: "Until you clear it" },
  { name: "Drafts (session storage)", provider: "This site", purpose: "Keeps grating and rebar schedule drafts while you work", lasts: "Until you close the tab" },
];

export default function PrivacyPage() {
  const { address } = company;
  return (
    <>
      <PageHeader
        tag="Legal"
        title="Privacy Policy"
        description="Last updated: 24 September 2026"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy" },
        ]}
      />

      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[780px] px-[34px]">
          <div className="prose-custom space-y-[34px] text-f16 leading-golden text-t2">
            <div>
              <h2 className={h2}>1. Who we are</h2>
              <p>
                This website is run by {company.legalName} (&ldquo;F1 Composite&rdquo;, &ldquo;we&rdquo;), the export
                company of FengDu New Material, {address.streetAddress}, {address.addressRegion}, {address.addressLocality},
                China. For anything in this policy, write to{" "}
                <a className="font-semibold text-teal-text underline underline-offset-4" href={`mailto:${company.contact.email}`}>
                  {company.contact.email}
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className={h2}>2. What we collect and why</h2>
              <h3 className={h3}>Enquiries and quotation requests</h3>
              <p>
                When you send a contact, quotation or sample form, we receive what you enter: name, email, phone,
                company, country, the message and any file you attach. We also record the browser type and the page
                you came from. The enquiry is stored in our database and emailed to our sales team. We use it to reply,
                prepare a quotation and follow up on the project. When a quotation or order needs production input, the
                details may be shared within our group (FengDu New Material and its production companies).
              </p>
              <h3 className={h3}>Datasheet downloads</h3>
              <p>
                Some downloads ask for an email address. We store it with the download request so our sales team can
                follow up, and your browser remembers it so you are not asked again.
              </p>
              <h3 className={h3}>AI assistant and sourcing tool</h3>
              <ul className={list}>
                <li>
                  Questions you type into the AI assistant, the sourcing tool or the article summaries are sent to an AI
                  model provider (currently OpenAI) through the Vercel AI Gateway to generate the answer.
                </li>
                <li>
                  If you give an email address in an assistant chat, the recent conversation is emailed to our sales team
                  and saved as an enquiry.
                </li>
                <li>
                  Project descriptions sent to the sourcing tool are emailed to our sales team. If the description
                  includes an email address, it is also saved as an enquiry.
                </li>
              </ul>
              <p className="mt-[10px]">Please do not enter information you would not put in an email to us.</p>
              <h3 className={h3}>Site statistics and advertising</h3>
              <ul className={list}>
                <li>
                  Vercel Web Analytics, Vercel Speed Insights and Ahrefs Web Analytics count page views and measure page
                  speed without cookies.
                </li>
                <li>
                  Google Analytics and Google Ads use cookies. In the EEA, the UK and Switzerland they stay off until you
                  allow them. Elsewhere they are on unless you switch them off. Either way, you can change this under
                  &ldquo;Cookie settings&rdquo;.
                </li>
              </ul>
              <h3 className={h3}>Security and hosting logs</h3>
              <p>
                Our hosting provider, Vercel, processes IP addresses to deliver the site. To limit abuse of the forms and
                AI tools, we keep a short-lived count of requests per IP address in server memory. It is not stored.
              </p>
            </div>

            <div id="cookies" className="scroll-mt-[100px]">
              <h2 className={h2}>3. Cookies and browser storage</h2>
              <p>
                Google cookies are only set when analytics or advertising is allowed. If you withdraw consent, the site
                deletes the Google cookies it can reach.
              </p>
              <div className="mt-[14px] overflow-x-auto">
                <table className="w-full min-w-[560px] border-collapse text-left text-f14">
                  <thead>
                    <tr className="border-b border-border-default text-t1">
                      <th scope="col" className="py-[8px] pr-[12px] font-bold">Name</th>
                      <th scope="col" className="py-[8px] pr-[12px] font-bold">Set by</th>
                      <th scope="col" className="py-[8px] pr-[12px] font-bold">Purpose</th>
                      <th scope="col" className="py-[8px] font-bold">Kept for</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cookies.map((cookie) => (
                      <tr key={cookie.name} className="border-b border-border-default align-top">
                        <td className="py-[8px] pr-[12px] font-mono text-f12 text-t1">{cookie.name}</td>
                        <td className="py-[8px] pr-[12px]">{cookie.provider}</td>
                        <td className="py-[8px] pr-[12px]">{cookie.purpose}</td>
                        <td className="py-[8px]">{cookie.lasts}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-[14px]">
                The factory video on the home page loads from YouTube only when you press play, in YouTube&rsquo;s
                privacy-enhanced mode.
              </p>
              <p className="mt-[14px]">
                <CookieSettingsButton className="font-semibold text-teal-text underline underline-offset-4" />
              </p>
            </div>

            <div>
              <h2 className={h2}>4. Service providers</h2>
              <ul className={list}>
                <li>Vercel: hosting, cookieless statistics and the AI Gateway</li>
                <li>OpenAI: AI models that answer the assistant and sourcing tool</li>
                <li>Google: Analytics and Ads, when allowed</li>
                <li>Ahrefs: cookieless statistics</li>
                <li>Resend: delivers enquiry emails to our sales team</li>
                <li>YouTube (Google): the factory video, when you play it</li>
              </ul>
              <p className="mt-[10px]">
                We do not sell personal information. If you allow advertising cookies, Google may use them to show our
                ads to you on other sites.
              </p>
            </div>

            <div>
              <h2 className={h2}>5. Where your data is processed</h2>
              <p>
                We are based in China, and most of our service providers are in the United States. Your data is
                therefore processed outside your own country, including outside the EEA and the UK.
              </p>
            </div>

            <div>
              <h2 className={h2}>6. How long we keep it</h2>
              <p>
                We keep enquiries, and conversations saved as enquiries, while we are in contact about a project, and
                afterwards for as long as commercial and tax records must be kept. Google Analytics data is kept for the
                period set in our Google Analytics account, at most 14 months.
              </p>
            </div>

            <div>
              <h2 className={h2}>7. Legal basis (EEA, UK and Switzerland)</h2>
              <ul className={list}>
                <li>Answering an enquiry or preparing a quotation: steps you asked for before a contract, and our legitimate interest in replying to business enquiries</li>
                <li>Google Analytics and Google Ads cookies: your consent</li>
                <li>Cookieless statistics, security and abuse limits: our legitimate interest in running a secure, working website</li>
              </ul>
            </div>

            <div>
              <h2 className={h2}>8. Your rights</h2>
              <p>
                You can ask for a copy of your data, have it corrected or deleted, object to its use, and withdraw
                consent at any time. Write to {company.contact.email}. If you are in the EEA, the UK or Switzerland, you
                can also complain to your data protection authority.
              </p>
            </div>

            <div>
              <h2 className={h2}>9. Contact</h2>
              <p>
                {company.legalName}
                <br />
                Email: {company.contact.email}
                <br />
                {address.streetAddress}, {address.addressRegion}, {address.addressLocality} {address.postalCode}, China
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
