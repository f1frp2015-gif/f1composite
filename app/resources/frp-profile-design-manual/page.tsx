import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import InnerCTA from "@/components/sections/InnerCTA";
import RelatedLinks from "@/components/sections/RelatedLinks";
import JsonLd from "@/components/seo/JsonLd";
import { DESIGN_MANUAL, DESIGN_MANUAL_CONTENTS } from "@/content/data/designManual";
import { buildImageObject } from "@/lib/imageSeo";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";

// HTML landing page for the design manual PDF: what is in it, the contents
// with page numbers, and where each table lives on the website. The PDF and
// this page read the same identity (content/data/designManual.ts).

const pagePath = "/resources/frp-profile-design-manual";
const cover = "/images/covers/resources/frp-profile-design-manual-rev-b-cover.webp";
const coverAlt = "Cover of the F1 Composite FRP Profile Design Manual, Rev. B, October 2026, with the eight section families";
const description =
  "Free 46-page FRP profile design manual (PDF): EN 13706 E23 laminate data, ASCE/SEI 74-23 design basis, 114 section property rows and 1–6 m load tables.";

export const metadata: Metadata = buildPageMetadata({
  title: "FRP Profile Design Manual (PDF): Section & Load Tables",
  description,
  path: pagePath,
});

const link = "font-semibold text-teal-text hover:underline";

/** Where each manual chapter has a live counterpart on the site. */
const online: Record<string, { href: string; label: string }> = {
  "02": { href: "/resources/technical-data", label: "Technical data" },
  "03": { href: "/frp-profile-calculator/methodology", label: "Calculator methodology" },
  "04": { href: "/datasheets", label: "Datasheets" },
  "05": { href: "/frp-span-tables", label: "Span tables" },
  "06": { href: "/applications", label: "Applications" },
  "08": { href: "/technology/frp-profile-machining", label: "Machining guide" },
  "09": { href: "/resources/downloads", label: "Downloads" },
};

export default function DesignManualPage() {
  const fileUrl = absoluteUrl(DESIGN_MANUAL.file);
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "DigitalDocument",
          "@id": `${absoluteUrl(pagePath)}#manual`,
          name: `${DESIGN_MANUAL.title} — ${DESIGN_MANUAL.code} Rev. ${DESIGN_MANUAL.revision}`,
          alternateName: DESIGN_MANUAL.subtitle,
          description,
          url: absoluteUrl(pagePath),
          version: `Rev. ${DESIGN_MANUAL.revision}`,
          datePublished: DESIGN_MANUAL.issued,
          inLanguage: "en",
          isAccessibleForFree: true,
          author: { "@id": "https://www.f1composite.com/#organization" },
          publisher: { "@id": "https://www.f1composite.com/#organization" },
          image: buildImageObject({ src: cover, alt: coverAlt, pagePath }),
          encoding: { "@type": "MediaObject", contentUrl: fileUrl, encodingFormat: "application/pdf", contentSize: DESIGN_MANUAL.fileSize },
          hasPart: DESIGN_MANUAL_CONTENTS.map((chapter) => ({ "@type": "CreativeWork", position: Number(chapter.number), name: chapter.title, description: chapter.summary })),
          about: ["Pultruded FRP profiles", "EN 13706", "ASCE/SEI 74-23", "FRP span tables", "FRP section properties"],
        }}
      />
      <PageHeader
        tag="Technical manual"
        title="FRP profile design manual"
        description="A printable engineering reference for F1 pultruded structural profiles, generated from the same data as the website: laminate values, design basis, section properties of every catalog size and allowable-load tables. Free PDF, no login."
        facts={[
          { label: "Pages", value: String(DESIGN_MANUAL.pages) },
          { label: "Document", value: `${DESIGN_MANUAL.code} Rev. ${DESIGN_MANUAL.revision}` },
          { label: "Issued", value: DESIGN_MANUAL.issuedLabel },
          { label: "File", value: `PDF, ${DESIGN_MANUAL.fileSize}` },
        ]}
        actions={{
          primary: { label: "Download the PDF", href: DESIGN_MANUAL.file },
          secondary: { label: "Open the span tables", href: "/frp-span-tables", variant: "secondary" },
        }}
        figure={
          <a href={DESIGN_MANUAL.file} className="mx-auto block max-w-[300px] overflow-hidden rounded-card border border-border-default bg-white shadow-card">
            <Image src={cover} alt={coverAlt} width={900} height={1274} sizes="300px" priority className="h-auto w-full" />
          </a>
        }
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "Design guides", href: "/resources/design-guides" },
          { label: "Design manual" },
        ]}
      />

      <PageNav items={[{ id: "contents", label: "Contents" }, { id: "same-data", label: "Same data as the site" }, { id: "revision", label: "Revision B" }]} />

      <PageSection id="contents" title="Contents" count={`${DESIGN_MANUAL_CONTENTS.length} sections`} tone="white">
        <div className="relative overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[640px] border-collapse text-left text-f14">
            <caption className="sr-only">Sections of the FRP profile design manual with start page</caption>
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">No.</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Section</th>
                <th scope="col" className="px-[14px] py-[8px] text-right font-semibold text-t1">Page</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Online</th>
              </tr>
            </thead>
            <tbody>
              {DESIGN_MANUAL_CONTENTS.map((chapter) => (
                <tr key={chapter.number} className="border-b border-border-default align-top last:border-b-0">
                  <td className="px-[14px] py-[10px] font-mono text-teal-text">{chapter.number}</td>
                  <th scope="row" className="px-[14px] py-[10px] font-normal">
                    <span className="block font-semibold text-t1">{chapter.title}</span>
                    <span className="mt-[2px] block leading-golden text-t2">{chapter.summary}</span>
                  </th>
                  <td className="px-[14px] py-[10px] text-right tabular-nums text-t1">{chapter.page}</td>
                  <td className="px-[14px] py-[10px]">
                    {online[chapter.number] ? <Link href={online[chapter.number].href} className={link}>{online[chapter.number].label}</Link> : <span className="text-t3">PDF only</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>

      <PageSection id="same-data" title="Same data as the website" tone="muted">
        <div className="max-w-[820px] space-y-[12px] text-f16 leading-golden text-t2">
          <p>
            The manual is built from the data files the website renders, so a value in the PDF is the value on the matching page: the section properties are the{" "}
            <Link href="/datasheets" className={link}>per-size datasheets</Link>, the load tables are the{" "}
            <Link href="/frp-span-tables" className={link}>span tables</Link> (also available as a CSV), and the laminate values are on the{" "}
            <Link href="/resources/technical-data" className={link}>technical data page</Link>.
          </p>
          <p>
            Use the PDF for a submittal or an offline reference; use the <Link href="/frp-profile-calculator" className={link}>profile calculator</Link> when the span, load case,
            design code or environment differs from the tables. Dimensioned DXF drawings of the catalog sections are in the{" "}
            <Link href="/resources/cad-library" className={link}>CAD library</Link>.
          </p>
        </div>
      </PageSection>

      <PageSection id="revision" title={`Revision ${DESIGN_MANUAL.revision}`} tone="white">
        <div className="max-w-[820px] space-y-[12px] text-f16 leading-golden text-t2">
          <p>
            {DESIGN_MANUAL.code} Rev. {DESIGN_MANUAL.revision}, {DESIGN_MANUAL.issuedLabel}, replaces {DESIGN_MANUAL.supersedes}. Rev. A described a laminate, a service life and fire and
            chemical data that F1 Composite does not publish; links to the old file redirect to this edition.
          </p>
          <p>
            Rev. B prints the isophthalic polyester E23 laminate of every F1 datasheet, all 114 catalog sizes with published masses, allowable loads to the published design basis
            (ASCE/SEI 74-23 resistance factors, L/250 with shear deflection), and fire and chemical performance stated by resin formulation with its evidence status.
          </p>
        </div>
      </PageSection>

      <RelatedLinks
        groups={[
          { title: "Design data", links: [
            { href: "/frp-span-tables", label: "FRP span tables" },
            { href: "/resources/technical-data", label: "FRP technical data" },
            { href: "/resources/cad-library", label: "FRP profile CAD library (DXF)" },
          ] },
          { title: "Documents", links: [
            { href: "/resources/design-guides", label: "FRP design guides" },
            { href: "/resources/downloads", label: "Downloads and catalogs" },
            { href: "/resources/evidence", label: "Published test reports" },
          ] },
        ]}
      />

      <InnerCTA />
    </>
  );
}
