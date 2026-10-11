import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import InnerCTA from "@/components/sections/InnerCTA";
import RelatedLinks from "@/components/sections/RelatedLinks";
import EvidenceExplorer from "@/components/downloads/EvidenceExplorer";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
import { formatLongDate } from "@/lib/dates";
import { commercialFacts, engineeringEvidence, evidenceRevision, reportedResults } from "@/content/data/engineeringEvidence";
import { e40Reports } from "@/content/data/e40Evidence";
import { applicabilityRevision, assessCatalogEvidence, catalogEvidenceLabels, catalogEvidenceProductPath, parseCatalogEvidenceTarget } from "@/content/data/evidenceApplicability";
import { buildRfqHref } from "@/lib/rfq";

type EvidencePageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };
const baseMetadata = buildPageMetadata({ title: "FRP Test Reports & Product Evidence", description: "Original FRP test reports and certificates with scope notes: SGS modulus and UL 94 tests, a PHI window certificate, Intertek AS 2047 and TÜV PV frame reports.", path: "/resources/evidence" });

export async function generateMetadata({ searchParams }: EvidencePageProps): Promise<Metadata> {
  const params = await searchParams;
  return { ...baseMetadata, ...(Object.keys(params).some((key) => ["category", "section", "formulation"].includes(key)) ? { robots: { index: false, follow: true } } : {}) };
}

const summary = `F1 Composite publishes ${engineeringEvidence.length} documents: SGS full-section modulus tests of ${e40Reports.map((report) => report.average).join(" and ")} GPa, a Passive House Institute window certificate at Uw 0.78 W/(m²·K), Intertek AS 2047 window and door reports, TÜV Rheinland and CPVT PV frame reports and an SGS UL 94 V-0 material test. Each result applies only to the item named in the document.`;

export default async function EvidencePage({ searchParams }: EvidencePageProps) {
  const target = parseCatalogEvidenceTarget(await searchParams);
  const assessment = target ? assessCatalogEvidence(target) : null;
  const asOf = new Date().toISOString().slice(0, 10);
  return <>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "FRP product evidence", url: absoluteUrl("/resources/evidence"), dateModified: evidenceRevision, hasPart: engineeringEvidence.map((item) => ({ "@type": "DigitalDocument", name: item.title, url: absoluteUrl(item.file), description: item.scope })) }} />
    <PageHeader tag="Engineering evidence" title="Find the document that matches your product" description={summary} breadcrumbs={[{ label: "Home", href: "/" }, { label: "Resources", href: "/resources" }, { label: "Product evidence" }]} updated={evidenceRevision} />
    <PageNav items={[{ id: "reported-results", label: "Reported results" }, { id: "documents", label: "All documents" }]} />
    {target && assessment && <PageSection id="configuration" title="Evidence for your selected profile" tone="muted">
      <dl className="grid gap-[8px] text-f16 sm:grid-cols-3">
        <div><dt className="font-semibold">Profile family</dt><dd>{target.categorySlug}</dd></div>
        <div><dt className="font-semibold">Catalog section</dt><dd>{target.sectionId ?? "To be confirmed"}</dd></div>
        <div><dt className="font-semibold">Formulation</dt><dd>{target.formulationCode ?? "To be confirmed"}</dd></div>
      </dl>
      <p className="mt-[16px] font-bold">{catalogEvidenceLabels[assessment.status]}</p>
      <p className="mt-[6px] max-w-[900px] leading-golden text-t2">{assessment.summary}</p>
      <p className="mt-[6px] text-f14 text-t2">The document notes below compare published scope with your selection. Internal catalog references do not establish a tested specimen identity.</p>
      <div className="mt-[16px] flex flex-wrap gap-[20px] text-f14 font-semibold text-teal-text">
        <Link className="min-h-[44px] underline underline-offset-4" href={buildRfqHref({ source: "configuration-evidence", product: `${target.categorySlug} configuration`, productPath: catalogEvidenceProductPath(target.categorySlug), context: { evidenceRequest: { ...target, ...assessment, scopeRevision: applicabilityRevision } }, message: `Please review the evidence and availability for catalog section ${target.sectionId ?? "to confirm"}, formulation ${target.formulationCode ?? "to confirm"}.\n\nIntended use / loads:\nService environment and temperature:\nQuantity / length:\nRequired tests and acceptance criteria:\nDestination:` })}>Request a configuration review</Link>
        <Link className="min-h-[44px] underline underline-offset-4" href="/resources/evidence">View the full evidence library</Link>
      </div>
    </PageSection>}
    <PageSection id="reported-results" title="Reported results at a glance" count={`${reportedResults.length} reports`} tone="white" intro="One row per test report or certificate, as printed in the original. A result covers the tested specimen or stated configuration only. It is not a design allowable or a certification of other products.">
      <div className="relative overflow-x-auto rounded-card border border-border-default bg-white">
        <table className="w-full min-w-[860px] border-collapse text-left text-f14">
          <caption className="sr-only">Results reported in F1 Composite&apos;s published test reports and certificates</caption>
          <thead><tr className="border-b border-border-default bg-bg2">{["Document", "Tested item", "Method", "Reported result", "Date"].map((heading) => <th key={heading} scope="col" className="px-[14px] py-[8px] font-semibold text-t1">{heading}</th>)}</tr></thead>
          <tbody>{reportedResults.map((row) => <tr key={row.id} className="border-b border-border-default align-top last:border-b-0">
            <th scope="row" className="px-[14px] py-[12px] font-semibold"><a href={`#${row.id}`} className="text-teal-text underline underline-offset-4 hover:text-teal">{row.issuer} {row.reference}</a></th>
            <td className="px-[14px] py-[12px] leading-golden text-t2">{row.tested}</td>
            <td className="px-[14px] py-[12px] leading-golden text-t2">{row.method}</td>
            <td className="px-[14px] py-[12px] font-medium leading-golden text-t1">{row.result}</td>
            <td className="px-[14px] py-[12px] leading-golden text-t2">{row.dateLabel} <time dateTime={row.date}>{formatLongDate(row.date)}</time></td>
          </tr>)}</tbody>
        </table>
      </div>
      <p className="mt-[12px] max-w-[860px] text-f14 leading-golden text-t3">Intertek and TÜV Rheinland rows give the conclusion printed in each report, because both laboratories restrict partial reproduction. Open the complete report for the measured values. Data sheets and the window catalog are listed below but not tabulated.</p>
    </PageSection>
    <PageSection id="documents" title="All documents" count={`${engineeringEvidence.length} documents`} tone="muted" intro={<>{commercialFacts.compliance} The original document controls its holder, issue date, validity and scope. Each test report and certificate has a verification page naming its holder, the issuer&apos;s own check and the SHA-256 of the published file. For material or batch-specific records, <Link href="/contact?source=evidence-request&inquiry_type=technical" className="font-semibold text-teal-text underline underline-offset-4">request the applicable evidence</Link>.</>}>
      <EvidenceExplorer target={target} asOf={asOf} />
    </PageSection>
    <RelatedLinks
      background="white"
      groups={[
        { title: "Documents", links: [{ href: "/resources/downloads", label: "Downloads and CAD" }, { href: "/resources/technical-data", label: "Technical data" }] },
        { title: "How we test", links: [{ href: "/technology/quality-testing", label: "Quality and testing process" }, { href: "/resources/technical-data#e40-test-reports", label: "E40 full-section test reports" }] },
        { title: "People", links: [{ href: "/about/authors", label: "Technical authors" }] },
      ]}
    />
    <InnerCTA title="Need evidence for a specific product?" text="Send the product, configuration and the document your project requires." />
  </>;
}
