import Link from "next/link";
import DocumentCard, { libraryCard, type DocumentCardData } from "@/components/downloads/DocumentCard";
import { assembleDocuments } from "@/lib/documents";

/**
 * A product page's documents in the library's card format: the family's
 * datasheets and DXF drawings, then the library documents filed under this
 * product or its range, then the company certificates and catalog on request.
 */
export default function ProductDocuments({
  productPaths,
  family,
  sizes,
}: {
  /** Library documents filed under any of these pages are shown. */
  productPaths: string[];
  family?: {
    /** e.g. "I-beam" */
    label: string;
    /** The family's group on /datasheets. */
    datasheetsHref: string;
  };
  sizes?: { datasheet: string | null; dxf: boolean }[];
}) {
  const library = assembleDocuments();
  const withDatasheet = sizes?.filter((size) => size.datasheet).length ?? 0;
  const withDxf = sizes?.filter((size) => size.dxf).length ?? 0;
  const own: DocumentCardData[] = [];
  if (family && withDatasheet) {
    own.push({
      type: "Data sheet",
      title: `${family.label} datasheets`,
      meta: `${withDatasheet} sizes · web page`,
      issuer: "F1 Composite",
      description: "One page per size: dimensions, calculated section properties, E23 laminate data and, where published, allowable load by span.",
      action: { label: "Open the datasheets", href: family.datasheetsHref },
    });
  }
  if (family && withDxf) {
    own.push({
      type: "CAD",
      title: `${family.label} section drawings`,
      meta: `DXF · ${withDxf} sizes`,
      issuer: "F1 Composite",
      description: "Dimensioned cross-sections that open in AutoCAD, DraftSight or LibreCAD. Download one from its row in the size table; no login or email.",
      action: { label: "Go to the size table", href: "#sizes" },
    });
  }
  const filed = library.filter((document) => document.productHref && productPaths.includes(document.productHref) && !(withDxf && document.type === "CAD"));
  const general = library.filter((document) => document.product === "All products" && (document.type === "Certificate" || document.type === "Catalog"));
  const cards = [...own, ...[...filed, ...general].map((document) => libraryCard(document, "product-document-request"))];

  return (
    <>
      <ul className="grid gap-[16px] md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <li key={card.title}>
            <DocumentCard card={card} compact />
          </li>
        ))}
      </ul>
      <p className="mt-[18px] flex flex-wrap gap-x-[24px] gap-y-[8px] text-f14 font-semibold text-teal-text">
        <Link href="/resources/downloads" className="underline underline-offset-4 hover:text-teal">
          All downloads and CAD
        </Link>
        <Link href="/resources/evidence" className="underline underline-offset-4 hover:text-teal">
          Test reports and their scope
        </Link>
      </p>
    </>
  );
}
