import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import EvidenceExplorer from "@/components/downloads/EvidenceExplorer";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
import { formatLongDate } from "@/lib/dates";
import { commercialFacts, engineeringEvidence, evidenceRevision, reportedResults } from "@/content/data/engineeringEvidence";
import { e40Reports } from "@/content/data/e40Evidence";

export const metadata: Metadata = buildPageMetadata({ title: "FRP Test Reports & Product Evidence", description: "Original FRP test reports and certificates with scope notes: SGS modulus and UL 94 tests, a PHI window certificate, Intertek AS 2047 and TÜV PV frame reports.", path: "/resources/evidence" });

const summary = `F1 Composite publishes ${engineeringEvidence.length} original documents: SGS full-section modulus tests of ${e40Reports.map((report) => report.average).join(" and ")} GPa, a Passive House Institute window certificate at Uw 0.78 W/(m²·K), Intertek AS 2047 window and door reports, TÜV Rheinland and CPVT PV frame reports and an SGS UL 94 V-0 material test. Each result applies only to the item named in the document.`;

export default function EvidencePage() {
  return <>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "FRP product evidence", url: absoluteUrl("/resources/evidence"), dateModified: evidenceRevision, hasPart: engineeringEvidence.map((item) => ({ "@type": "DigitalDocument", name: item.title, url: absoluteUrl(item.file), description: item.scope })) }} />
    <PageHeader tag="Engineering evidence" title="Find the document that matches your product" description={summary} breadcrumbs={[{ label: "Home", href: "/" }, { label: "Resources", href: "/resources" }, { label: "Product evidence" }]} updated={evidenceRevision} />
    <section className="bg-white py-[40px]"><div className="mx-auto max-w-[1200px] px-[20px] sm:px-[28px]">
      <h2 id="reported-results" className="text-f24 font-bold text-t1">Reported results at a glance</h2>
      <p className="mt-[10px] max-w-[950px] text-f15 text-t2">One row per test report or certificate, as printed in the original. A result covers the tested specimen or stated configuration only. It is not a design allowable or a certification of other products.</p>
      <div className="mt-[20px] overflow-x-auto rounded-[8px] border border-border-default">
        <table className="w-full min-w-[860px] border-collapse text-left text-f13">
          <caption className="sr-only">Results reported in F1 Composite&apos;s published test reports and certificates</caption>
          <thead className="bg-deep text-white"><tr>{["Document", "Tested item", "Method", "Reported result", "Date"].map((heading) => <th key={heading} scope="col" className="px-[14px] py-[12px] font-bold">{heading}</th>)}</tr></thead>
          <tbody>{reportedResults.map((row) => <tr key={row.id} className="border-t border-border-default align-top">
            <th scope="row" className="px-[14px] py-[12px] font-semibold"><a href={`#${row.id}`} className="text-teal-text underline underline-offset-4">{row.issuer} {row.reference}</a></th>
            <td className="px-[14px] py-[12px] text-t2">{row.tested}</td>
            <td className="px-[14px] py-[12px] text-t2">{row.method}</td>
            <td className="px-[14px] py-[12px] text-t1">{row.result}</td>
            <td className="px-[14px] py-[12px] text-t2">{row.dateLabel} <time dateTime={row.date}>{formatLongDate(row.date)}</time></td>
          </tr>)}</tbody>
        </table>
      </div>
      <p className="mt-[12px] max-w-[950px] text-f13 text-t3">Intertek and TÜV Rheinland rows give the conclusion printed in each report, because both laboratories restrict partial reproduction. Open the complete report for the measured values. Data sheets and the window catalog are listed below but not tabulated.</p>
    </div></section>
    <section className="bg-bg2 py-[40px]"><div className="mx-auto max-w-[1200px] px-[20px] sm:px-[28px]">
      <p className="mb-[12px] max-w-[950px] text-f15 text-t2">{commercialFacts.compliance}</p>
      <p className="mb-[26px] text-f13 text-t2">The original document controls its holder, issue date, validity and scope. For material or batch-specific records, <Link href="/contact?source=evidence-request&inquiry_type=technical" className="text-teal-text underline">request the applicable evidence</Link>.</p>
      <EvidenceExplorer />
      <p className="mt-[28px] text-f13">Need drawings or catalogs? <Link className="text-teal-text underline" href="/resources/downloads">Browse Downloads & CAD</Link>. Read our <Link className="text-teal-text underline" href="/technology/quality-testing">quality and testing process</Link> or meet the <Link className="text-teal-text underline" href="/about/authors">technical authors</Link>.</p>
    </div></section>
  </>;
}
