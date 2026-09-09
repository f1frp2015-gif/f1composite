import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import EvidenceExplorer from "@/components/downloads/EvidenceExplorer";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
import { commercialFacts, engineeringEvidence, evidenceRevision } from "@/content/data/engineeringEvidence";

export const metadata: Metadata = buildPageMetadata({ title: "FRP Test Reports & Product Evidence", description: "Review FRP window certificates, test reports and engineering references with product scope, original documents and project applicability guidance.", path: "/resources/evidence" });

export default function EvidencePage() {
  return <>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "FRP product evidence", url: absoluteUrl("/resources/evidence"), dateModified: evidenceRevision, hasPart: engineeringEvidence.map((item) => ({ "@type": "DigitalDocument", name: item.title, url: absoluteUrl(item.file), description: item.scope })) }} />
    <PageHeader tag="Engineering evidence" title="Find the document that matches your product" description="Review the original document and its scope before applying a result to a different section, material or assembly." breadcrumbs={[{ label: "Home", href: "/" }, { label: "Resources", href: "/resources" }, { label: "Product evidence" }]} />
    <section className="bg-bg2 py-[40px]"><div className="mx-auto max-w-[1200px] px-[20px] sm:px-[28px]">
      <p className="mb-[12px] max-w-[950px] text-f15 text-t2">{commercialFacts.compliance}</p>
      <p className="mb-[26px] text-f13 text-t2">Document index updated {evidenceRevision}. The original document controls its holder, issue date, validity and scope. For material or batch-specific records, <Link href="/contact?source=evidence-request&inquiry_type=technical" className="text-teal-text underline">request the applicable evidence</Link>.</p>
      <EvidenceExplorer />
      <p className="mt-[28px] text-f13">Need drawings or catalogs? <Link className="text-teal-text underline" href="/resources/downloads">Browse Downloads & CAD</Link>. Read our <Link className="text-teal-text underline" href="/technology/quality-testing">quality and testing process</Link> or meet the <Link className="text-teal-text underline" href="/about/authors">technical authors</Link>.</p>
    </div></section>
  </>;
}
