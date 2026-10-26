import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import InnerCTA from "@/components/sections/InnerCTA";
import RelatedLinks from "@/components/sections/RelatedLinks";
import { FAQList } from "@/components/ui/FAQ";
import JsonLd from "@/components/seo/JsonLd";
import { ASTM_D7957_REQUIREMENTS, ASTM_D7957_SIZE_MINIMUMS, GFRP_STANDARDS_CROSSWALK, astmMinTensileStressMPa } from "@/lib/gfrpRebar";
import { buildRfqHref } from "@/lib/rfq";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";

// Crosswalk of the standards, codes and approvals that govern GFRP rebar in each market. The
// requirement values are the public minimums of each document, not properties of any F1 bar.
// Sources: docs/research/frp-rebar-market-2026-10.md.

const pagePath = "/resources/gfrp-rebar-standards";
const PAGE_UPDATED = "2026-10-25";
// The same contact form as the product page; no rebar-specific entry point (owner decision 2026-10-26).
const reviewHref = buildRfqHref({ source: "rebar-standards", product: "GFRP rebar", productPath: "/products/frp-rebar", message: "Please tell me which GFRP rebar documents apply to my project: the specification clause, the standard and edition named, and the submittal list. Please contact me to discuss the details and quotation." });
const pageTitle = "GFRP Rebar Standards: ASTM D7957, CSA S807, ISO 10406";
const pageDescription =
  "GFRP rebar standards by market: ASTM D7957 minimums, ACI 440.11, CSA S807 grades, ISO 10406-1, EN 1992 Annex R, AS 5204, GB/T 26743, and what to ask for.";

export const metadata: Metadata = buildPageMetadata({ title: pageTitle, description: pageDescription, path: pagePath });

const roles = ["Product", "Design", "Test methods", "Approval / listing", "Construction"] as const;

const faqs = [
  { question: "What is the difference between a standard and an approval?", answer: "A product standard such as ASTM D7957 or CSA S807 says what any qualifying bar must achieve and how to test it. A design code such as ACI CODE-440.11-22 says how to use the bar. An approval or listing, such as an ICC-ES report, a DOT producer list, a DIBt approval or a European ETA, names one producer's bar after an audit. Only the named producer may claim it." },
  { question: "Which edition of ASTM D7957 applies?", answer: "The one named in the project specification. ASTM D7957/D7957M-26 is the active edition; ACI CODE-440.11-22 was written around the 2022 edition and the Gulf standards body adopted the 2022 edition in 2025. Qualification reports should state the edition they were run against, and a newer ASTM edition does not update an older report by itself." },
  { question: "What are CSA S807 grades?", answer: "Modulus tiers: Grade I is at least 40 GPa, Grade II at least 50 GPa and Grade III at least 60 GPa, with durability classes D1 and D2 from alkali exposure testing. Ontario's OPSS 1640 requires Grade III, D1, E-CR glass and a vinyl ester or epoxy matrix. ASTM D7957 has a single 44.8 GPa minimum, and ASTM D8505 covers the 60 GPa class for glass and basalt bars." },
  { question: "Does EN 1992-1-1:2023 Annex R certify GFRP rebar?", answer: "No. Annex R is an informative design annex for embedded FRP reinforcement, used where a national annex allows it. CE marking of a bar runs through a European Technical Assessment under EAD 260023-00-0301 and a Declaration of Performance; Germany additionally uses DIBt general technical approvals for named products." },
  { question: "What does ISO 10406-1 give me?", answer: "Test methods for FRP bars and grids: tension, bond, creep, alkali resistance, transverse shear and more. It is the neutral test basis for projects outside North America and the methods behind European assessments. A report to ISO 10406-1 shows how values were measured; it does not by itself certify conformity to any product standard." },
  { question: "What should an export specification name?", answer: "Three layers with editions: the product standard (ASTM D7957/D7957M-26 or CSA S807:19), the design code the engineer used (ACI CODE-440.11-22, AASHTO GFRP-2, CSA S806 or S6, EN 1992-1-1:2023 Annex R, AS 5204 with the state agency clauses) and the submittals: a qualification report for each size, production-lot certificates and bent-bar data. The specification guide shows the wording." },
];

export default function GfrpRebarStandardsPage() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "TechArticle", headline: pageTitle, description: pageDescription, url: absoluteUrl(pagePath), mainEntityOfPage: absoluteUrl(pagePath), dateModified: PAGE_UPDATED, publisher: { "@id": "https://www.f1composite.com/#organization" }, about: { "@type": "Thing", name: "GFRP rebar standards" } }} />
      <PageHeader
        tag="Standards reference"
        updated={PAGE_UPDATED}
        title="GFRP rebar standards by market"
        description="What ASTM D7957, ACI 440.11, CSA S807, ISO 10406-1, EN 1992-1-1 Annex R, AS 5204 and GB/T 26743 each fix for a glass fiber reinforced polymer bar, who asks for them, and the document to request from a supplier against each one. The values on this page are the standards' own minimums, not the properties of any offered bar."
        facts={[
          { label: "Documents", value: `${GFRP_STANDARDS_CROSSWALK.length} across ${new Set(GFRP_STANDARDS_CROSSWALK.map((row) => row.market)).size} markets` },
          { label: "ASTM D7957 sizes", value: "No. 2–No. 10" },
          { label: "Minimum modulus", value: "44.8 GPa (ASTM) · 40/50/60 GPa (CSA)" },
        ]}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Resources", href: "/resources" }, { label: "GFRP rebar standards" }]}
        actions={{ primary: { label: "Ask which documents apply", href: reviewHref }, secondary: { label: "GFRP rebar supply", href: "/products/frp-rebar", variant: "secondary" } }}
      />
      <PageNav items={[{ id: "crosswalk", label: "Crosswalk" }, { id: "d7957-sizes", label: "D7957 forces" }, { id: "d7957-properties", label: "D7957 properties" }, { id: "approvals", label: "Approvals" }, { id: "faq", label: "FAQ" }]} />

      <PageSection id="crosswalk" title="Standards, codes and approvals by market" tone="white" intro="Read down a market to see the three layers a specification should name: the product standard, the design code and any approval or listing the owner requires. The last column is what to ask a supplier for against each document.">
        <div className="space-y-[20px]">
          {roles.map((role) => {
            const rows = GFRP_STANDARDS_CROSSWALK.filter((row) => row.role === role);
            if (!rows.length) return null;
            return (
              <div key={role} className="relative overflow-x-auto rounded-card border border-border-default bg-white">
                <table className="w-full min-w-[900px] border-collapse text-left text-f14">
                  <caption className="border-b border-border-default px-[14px] py-[10px] text-left text-f16 font-bold text-t1">{role}</caption>
                  <thead>
                    <tr className="border-b border-border-default bg-bg2">
                      <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Market</th>
                      <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Document</th>
                      <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">What it fixes</th>
                      <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Who asks for it</th>
                      <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Ask the supplier for</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => (
                      <tr key={`${row.market}-${row.document}`} className="border-b border-border-default align-top last:border-b-0">
                        <th scope="row" className="px-[14px] py-[10px] font-semibold text-t1">{row.market}</th>
                        <td className="px-[14px] py-[10px] leading-golden text-t1">{row.href ? <a href={row.href} target="_blank" rel="noreferrer" className="font-semibold text-teal-text underline decoration-teal/30 underline-offset-4 hover:decoration-teal">{row.document} ↗</a> : row.document}</td>
                        <td className="px-[14px] py-[10px] leading-golden text-t2">{row.scope}</td>
                        <td className="px-[14px] py-[10px] leading-golden text-t2">{row.usedBy}</td>
                        <td className="px-[14px] py-[10px] leading-golden text-t2">{row.ask}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
        <p className="mt-[16px] max-w-[860px] text-f14 leading-golden text-t3">Status notes, October 2026: ASTM D7957/D7957M-26 is active and ACI CODE-440.11-22 still cites the 2022 edition; CSA S6:25 superseded S6:19 in October 2025; the reaffirmation status of CSA S806 differs between catalogues; GOST 31938-2022 superseded the 2012 edition. Confirm the edition your project names.</p>
      </PageSection>

      <PageSection id="d7957-sizes" title="ASTM D7957/D7957M Table 3: minimum guaranteed tensile force" tone="muted" intro="The force a qualifying bar of each size must guarantee, defined as the sample mean minus three standard deviations. Dividing by the nominal area shows why strength per unit area falls with size while the modulus requirement stays at 44.8 GPa. Commercial structural bars exceed these minimums; Ohio and Texas DOT require higher forces and a 7,500 to 8,700 ksi modulus.">
        <div className="grid gap-[24px] lg:grid-cols-[1.1fr_1fr]">
          <div className="relative overflow-x-auto rounded-card border border-border-default bg-white">
            <table className="w-full min-w-[480px] border-collapse text-left text-f14">
              <thead>
                <tr className="border-b border-border-default bg-bg2">
                  <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Bar</th>
                  <th scope="col" className="px-[14px] py-[8px] text-right font-semibold text-t1">Ø mm</th>
                  <th scope="col" className="px-[14px] py-[8px] text-right font-semibold text-t1">Area mm²</th>
                  <th scope="col" className="px-[14px] py-[8px] text-right font-semibold text-t1">Min. force kN</th>
                  <th scope="col" className="px-[14px] py-[8px] text-right font-semibold text-t1">kip</th>
                  <th scope="col" className="px-[14px] py-[8px] text-right font-semibold text-t1">MPa (nominal area)</th>
                </tr>
              </thead>
              <tbody>
                {ASTM_D7957_SIZE_MINIMUMS.map((size) => (
                  <tr key={size.designation} className="border-b border-border-default last:border-b-0">
                    <th scope="row" className="px-[14px] py-[8px] font-semibold text-t1">{size.designation}</th>
                    <td className="px-[14px] py-[8px] text-right tabular-nums text-t2">{size.diameterMm}</td>
                    <td className="px-[14px] py-[8px] text-right tabular-nums text-t2">{size.areaMm2}</td>
                    <td className="px-[14px] py-[8px] text-right tabular-nums text-t2">{size.minTensileLoadKn}</td>
                    <td className="px-[14px] py-[8px] text-right tabular-nums text-t2">{size.minTensileLoadKip.toFixed(1)}</td>
                    <td className="px-[14px] py-[8px] text-right tabular-nums text-t2">{Math.round(astmMinTensileStressMPa(size))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="space-y-[14px] text-f14 leading-golden text-t2">
            <p><strong className="text-t1">How to read a datasheet against this table.</strong> A producer’s guaranteed force or strength for each size should sit above the row here, with the laboratory, test method and edition stated. Leading structural bars publish 800 to 1,100 MPa guaranteed strength and 46 to 60 GPa modulus; a bar that only quotes an ultimate or mean value has not been qualified to the standard’s definition.</p>
            <p><strong className="text-t1">Area is measured, not assumed.</strong> Table 3 also fixes a measured cross-sectional area range for each size, so a sand coating or helical wrap cannot inflate the nominal area. Compare offers per certified area or per guaranteed force, as the <Link href="/resources/blog/fiberglass-rebar-cost-per-foot" className="font-semibold text-teal-text hover:underline">cost-per-foot guide</Link> explains.</p>
            <p><strong className="text-t1">Bent bars are separate.</strong> The bent portion must reach 60% of the straight-bar force when tested to ASTM D7914; designers use the bent value for stirrups and hooks. Mesh is outside D7957 altogether.</p>
            <p>Our <Link href="/tools/gfrp-rebar-calculator" className="font-semibold text-teal-text hover:underline">GFRP rebar calculator</Link> applies the ACI 440.11 factors to a certificate’s values, and the <Link href="/resources/gfrp-rebar-size-chart" className="font-semibold text-teal-text hover:underline">size chart</Link> gives weights for every size.</p>
          </div>
        </div>
      </PageSection>

      <PageSection id="d7957-properties" title="ASTM D7957 property requirements and why each one matters" tone="white" intro="Beyond force by size, the standard sets limits that screen the resin, the glass and the cure. These are the tests behind a qualification report; a lot certificate repeats a subset on five specimens from each production lot.">
        <div className="relative overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[820px] border-collapse text-left text-f14">
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Property</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Requirement</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Test method</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Why it matters</th>
              </tr>
            </thead>
            <tbody>
              {ASTM_D7957_REQUIREMENTS.map((row) => (
                <tr key={row.property} className="border-b border-border-default align-top last:border-b-0">
                  <th scope="row" className="px-[14px] py-[10px] font-semibold text-t1">{row.property}</th>
                  <td className="px-[14px] py-[10px] leading-golden text-t2">{row.requirement}</td>
                  <td className="px-[14px] py-[10px] leading-golden text-t2">{row.method}</td>
                  <td className="px-[14px] py-[10px] leading-golden text-t3">{row.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-[16px] max-w-[860px] text-f14 leading-golden text-t2">CSA S807 adds the modulus grades and durability classes above, AS 5204:2023 maps similar tests for Australia, and the Chinese GB/T 26743 and JG/T 406 grade bars by tensile strength and modulus for domestic projects. ASTM D8505 covers glass and basalt bars in the 60 GPa class; basalt bars need their own data, as the <Link href="/resources/blog/basalt-rebar-vs-fiberglass-rebar" className="font-semibold text-teal-text hover:underline">basalt vs fiberglass comparison</Link> explains.</p>
      </PageSection>

      <PageSection id="approvals" title="Approvals and listings name one producer" tone="muted" intro="An approval is the result of an audit of a named plant and product. It cannot be transferred, borrowed or implied by a reference to the standard it is based on. This is the honest position of an export supplier, and it is what to check with any supplier.">
        <div className="grid gap-[16px] md:grid-cols-2">
          {[
            { title: "ICC-ES evaluation reports (United States)", body: "AC454 covers bars in structural concrete under ACI 440.11; AC521 covers shrinkage and temperature reinforcement in flatwork. An ESR lists the producer, the plant, the sizes evaluated and the guaranteed values, and it requires ongoing factory inspections. Bends are usually outside the report's scope." },
            { title: "State DOT producer lists (United States)", body: "Florida, Texas, Ohio, Maine and others qualify production facilities through AASHTO NTPEP or FRP Institute audits and list them for contractors; shipments may be sampled and tested at the contractor's expense. Buy America rules have applied to GFRP on federally funded work since October 2025." },
            { title: "CSA S807 grades and MTO designated sources (Canada)", body: "Grade and durability class come from CSA-protocol testing; Ontario additionally lists designated sources for its OPSS 1640 work, requiring Grade III, D1, E-CR glass and a vinyl ester or epoxy matrix." },
            { title: "ETA, CE and DIBt (Europe)", body: "CE marking follows a European Technical Assessment under EAD 260023-00-0301 and a Declaration of Performance; only a few GFRP bars hold one. Germany's DIBt issues general technical approvals for named systems, such as the one held by Schöck Combar." },
          ].map((card) => (
            <article key={card.title} className="rounded-card border border-border-default bg-white p-[20px]">
              <h3 className="text-f16 font-bold text-t1">{card.title}</h3>
              <p className="mt-[8px] text-f14 leading-golden text-t2">{card.body}</p>
            </article>
          ))}
        </div>
        <div className="mt-[20px] rounded-card border border-border-default bg-white p-[20px]">
          <h3 className="text-f16 font-bold text-t1">What F1 Composite provides against these documents</h3>
          <p className="mt-[8px] text-f14 leading-golden text-t2">Two modulus grades made by FengDu New Material, GFRP 45 (CSA S807 Grade I class) and GFRP 60 (Grade III class), with third-party test reports for the offered grade and sizes to ASTM D7205, D7617, D7913, D7705 and D7914 or the ISO 10406-1 equivalents, production-lot certificates traceable to the delivered bundles, bent-bar data for scheduled shapes, and a plain statement of which approvals are and are not held. We do not hold ICC-ES, DOT, CSA designated-source, ETA or DIBt listings, and we say so before a project relies on one. How the leading producers hold theirs is summarized in <Link href="/resources/blog/gfrp-rebar-manufacturers-how-to-qualify-a-supplier" className="font-semibold text-teal-text hover:underline">GFRP rebar manufacturers and how to qualify a supplier</Link>.</p>
        </div>
      </PageSection>

      <PageSection id="faq" title="GFRP rebar standards questions" tone="white">
        <FAQList items={faqs} />
      </PageSection>

      <RelatedLinks
        background="bg2"
        groups={[
          { title: "GFRP reinforcement", links: [
            { href: "/products/frp-rebar", label: "GFRP rebar: bars, stirrups and mesh" },
            { href: "/resources/gfrp-rebar-applications", label: "GFRP rebar applications" },
            { href: "/resources/gfrp-rebar-size-chart", label: "GFRP rebar size chart" },
          ] },
          { title: "Specification", links: [
            { href: "/resources/blog/gfrp-rebar-specification-guide-aci-440-astm-d7957", label: "GFRP rebar specification guide" },
            { href: "/resources/blog/gfrp-bent-bars-stirrups-mesh-ordering-guide", label: "GFRP stirrups and bent bars" },
            { href: "/tools/gfrp-rebar-calculator", label: "GFRP rebar calculator" },
          ] },
          { title: "Evidence", links: [
            { href: "/technology/fiberglass-rebar-vs-steel", label: "Fiberglass rebar vs steel: test data" },
            { href: "/resources/evidence", label: "Test reports and product evidence" },
            { href: "/technology/quality-testing", label: "Quality and testing" },
          ] },
        ]}
      />
      <InnerCTA
        title="Tell us the standard, edition and documents your project names"
        quoteHref={reviewHref}
        text="Send the specification clause and the submittal list. We confirm the evidence available for the offered grade and identify any further testing before supply."
      />
    </>
  );
}
