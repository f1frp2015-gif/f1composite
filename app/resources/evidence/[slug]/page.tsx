import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import InnerCTA from "@/components/sections/InnerCTA";
import RelatedLinks from "@/components/sections/RelatedLinks";
import JsonLd from "@/components/seo/JsonLd";
import { engineeringEvidence, reportedResults } from "@/content/data/engineeringEvidence";
import {
  holderGroupNote,
  reportVerifications,
  verificationDescription,
  verificationPath,
  verificationTitle,
} from "@/content/data/reportVerification";
import { formatLongDate } from "@/lib/dates";
import { formatBytes, publishedFileFacts } from "@/lib/publishedFile";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return reportVerifications.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = reportVerifications.find((entry) => entry.slug === slug);
  if (!item) return {};
  return buildPageMetadata({ title: verificationTitle(item), description: verificationDescription(item), path: verificationPath(item.slug) });
}

const link = "font-semibold text-teal-text underline underline-offset-4 hover:text-teal";
const cell = "px-[14px] py-[10px] leading-golden";

export default async function ReportVerificationPage({ params }: PageProps) {
  const { slug } = await params;
  const item = reportVerifications.find((entry) => entry.slug === slug);
  if (!item) notFound();

  const evidence = engineeringEvidence.find((record) => record.id === item.evidenceId);
  const result = reportedResults.find((row) => row.id === item.evidenceId);
  const files = item.files.map((file) => ({ ...file, ...publishedFileFacts(file.path) }));
  const word = item.documentType === "Component certificate" ? "certificate" : "report";
  const name = `${item.issuerShort} ${word} ${item.reference}`;
  const dated = item.issued ? `issued ${formatLongDate(item.issued)}` : `valid until ${formatLongDate(item.validUntil ?? "")}`;
  const path = verificationPath(item.slug);
  const verificationHref = `/contact?${new URLSearchParams({
    source: "evidence-verification",
    inquiry_type: "technical",
    evidence_id: item.evidenceId,
    message: `Please confirm ${name}. I received it with an offer and want to know whether the product offered is yours and whether the document applies to it.`,
  })}`;

  const details: { label: string; value: string }[] = [
    { label: item.documentType === "Component certificate" ? "Component ID" : "Report number", value: item.reference },
    ...item.otherReferences,
    { label: "Issued by", value: item.issuer },
    { label: item.holderRole, value: item.holder },
    { label: "Tested or certified item", value: item.item },
    ...(result ? [{ label: "Reported result", value: result.result }] : []),
    ...(item.issued ? [{ label: "Issued", value: formatLongDate(item.issued) }] : []),
    ...(item.validUntil ? [{ label: "Valid until", value: formatLongDate(item.validUntil) }] : []),
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: verificationTitle(item),
          url: absoluteUrl(path),
          description: verificationDescription(item),
          publisher: { "@id": "https://www.f1composite.com/#organization" },
          about: {
            "@type": "DigitalDocument",
            name,
            identifier: item.reference,
            author: { "@type": "Organization", name: item.issuer },
            ...(item.issued && { dateCreated: item.issued }),
            ...(item.validUntil && { expires: item.validUntil }),
            associatedMedia: files.map((file) => ({
              "@type": "MediaObject",
              name: file.role,
              contentUrl: absoluteUrl(file.path),
              encodingFormat: "application/pdf",
              contentSize: formatBytes(file.bytes),
              sha256: file.sha256,
            })),
          },
        }}
      />
      <PageHeader
        tag={item.documentType === "Component certificate" ? "Certificate verification" : "Report verification"}
        title={`How to verify ${name}`}
        description={`${item.documentType} by ${item.issuer}, ${dated}, naming ${item.holder} as ${item.holderRole.toLowerCase()}. Check it with the issuer before relying on it, and compare your copy with the file published here.`}
        facts={[
          { label: item.holderRole, value: item.holder },
          { label: item.issued ? "Issued" : "Valid until", value: formatLongDate(item.issued ?? item.validUntil ?? "") },
          { label: "Issuer", value: item.issuerShort },
        ]}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "Product evidence", href: "/resources/evidence" },
          { label: item.reference },
        ]}
        actions={{
          primary: { label: `Open the ${word} (PDF)`, href: files[0].path },
          secondary: { label: "Ask us to confirm a document", href: verificationHref, variant: "secondary" },
        }}
      />

      <PageNav items={[{ id: "details", label: "Details" }, { id: "covers", label: "Who it covers" }, { id: "check", label: "Check with the issuer" }, { id: "files", label: "Published files" }]} />

      <PageSection id="details" title={`What the ${word} says`} intro={`As printed in the ${word}. The original document controls; this page only helps you find and check it.`} tone="white">
        <div className="overflow-hidden rounded-card border border-border-default bg-white">
          <table className="w-full border-collapse text-left text-f14">
            <caption className="sr-only">Identification details printed in {name}</caption>
            <tbody>
              {details.map((row) => (
                <tr key={row.label} className="border-b border-border-default align-top last:border-b-0">
                  <th scope="row" className={`${cell} w-[34%] bg-bg2 font-semibold text-t1`}>{row.label}</th>
                  <td className={`${cell} text-t2`}>{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {evidence && <p className="mt-[16px] max-w-[860px] text-f14 leading-golden text-t2"><span className="font-semibold text-t1">Scope note.</span> {evidence.scope}</p>}
      </PageSection>

      <PageSection id="covers" title={`Who this ${word} covers`} tone="muted">
        <div className="max-w-[860px] space-y-[14px] text-f16 leading-golden text-t2">
          <p>
            The {word} names <strong className="text-t1">{item.holder}</strong> as {item.holderRole.toLowerCase()}. {item.holder} {holderGroupNote}
          </p>
          <p>
            {`It covers the ${item.documentType === "Component certificate" ? "product and configuration" : "samples"} named in it. It does not cover products made by any other company, even when the same document is attached to another supplier's offer.`}
          </p>
          <p>
            If another supplier sends you this {word}, ask for the holder&apos;s written permission to use it and check it with the issuer as described below. You can also{" "}
            <Link href={verificationHref} className={link}>send it to us</Link>, and we will tell you whether the product offered is ours.
          </p>
          <p className="text-f14 text-t3">What {item.issuerShort} says about using it: {item.restrictions}</p>
        </div>
      </PageSection>

      <PageSection id="check" title={`Check it with ${item.issuerShort}`} intro={`The route the ${word} itself gives. Use it on the copy you received, whoever sent it.`} tone="white">
        <ol className="max-w-[860px] list-decimal space-y-[12px] pl-[22px] text-f16 leading-golden text-t2 marker:font-semibold marker:text-teal-text">
          {item.steps.map((step) => <li key={step}>{step}</li>)}
        </ol>
      </PageSection>

      <PageSection id="files" title="Files published here" count={`${files.length} ${files.length === 1 ? "file" : "files"}`} intro="Laboratory and certificate files are published exactly as issued. The SHA-256 value identifies each file: any change to it, however small, gives a different value." tone="muted">
        <div className="relative overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[720px] border-collapse text-left text-f14">
            <caption className="sr-only">Files published for {name}, with size, digital signature and SHA-256</caption>
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                {["File", "Size", "Digital signature", "SHA-256"].map((heading) => <th key={heading} scope="col" className="px-[14px] py-[8px] font-semibold text-t1">{heading}</th>)}
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file.path} className="border-b border-border-default align-top last:border-b-0">
                  <th scope="row" className={`${cell} font-semibold`}>
                    <a href={file.path} className={link}>{file.role}</a>
                  </th>
                  <td className={`${cell} whitespace-nowrap tabular-nums text-t2`}>{formatBytes(file.bytes)}</td>
                  <td className={`${cell} text-t2`}>{file.digitallySigned ? "Yes. Check it in Acrobat Reader" : "None"}</td>
                  <td className={`${cell} break-all font-mono text-f12 text-t2`}>{file.sha256}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-[16px] max-w-[860px] space-y-[10px] text-f14 leading-golden text-t2">
          <p>
            To compare a copy you hold, run <code className="rounded-tag bg-white px-[6px] py-[2px] font-mono text-f12 text-t1">certutil -hashfile file.pdf SHA256</code> on Windows or{" "}
            <code className="rounded-tag bg-white px-[6px] py-[2px] font-mono text-f12 text-t1">shasum -a 256 file.pdf</code> on macOS and Linux.
          </p>
          <p>
            A different value means your copy is not the file published here. That alone does not make it invalid, because an issuer may supply another signed copy, so check it with the issuer.
            {files.some((file) => file.role === "F1 copy with English notes") && " F1's English copy keeps every original page at full size and adds F1's notes beside it; the notes are not issued or certified by the laboratory."}
          </p>
        </div>
      </PageSection>

      <RelatedLinks
        background="white"
        groups={[
          { title: "Evidence", links: [
            { href: `/resources/evidence#${item.evidenceId}`, label: "All test reports and certificates" },
            { href: "/technology/quality-testing", label: "Quality and testing process" },
          ] },
          ...(evidence ? [{ title: "Product", links: [
            { href: evidence.product, label: evidence.productLabel },
            ...(evidence.contextHref ? [{ href: evidence.contextHref, label: "Test results and scope notes" }] : []),
          ] }] : []),
          { title: "Company", links: [{ href: "/about", label: "About F1 Composite and FengDu" }] },
        ]}
      />
      <InnerCTA
        title="Received this document from another supplier?"
        quoteHref={verificationHref}
        text="Send it to us with the offer. We will confirm whether the product offered comes from FengDu's plants and whether the document applies to it."
      />
    </>
  );
}
