import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import InnerCTA from "@/components/sections/InnerCTA";
import RelatedLinks from "@/components/sections/RelatedLinks";
import JsonLd from "@/components/seo/JsonLd";
import { buildProducts } from "@/lib/catalog/standardProfiles";
import { catalogIdentity } from "@/lib/catalog/identity";
import { CAD_SLUGS } from "@/lib/cadManifest";
import { datasheetFamily, familyInSentence } from "@/lib/datasheetContent";
import { gratingProducts } from "@/lib/gratingInquiry";
import { GRATING_CLIP_DXF_HREF, GRATING_CLIP_DXF_NAME } from "@/content/data/gratingClips";
import { SECTION_DRAWING_SIZE, sectionDrawingAlt, sectionDrawingPath, sectionDrawingSize } from "@/lib/sectionDrawings";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";

// Every DXF the site publishes in one place: the dimensioned cross-sections of
// the catalog sizes (public/cad, listed in lib/cadManifest.ts) grouped by
// family, and the grating clip drawings. Each row links the file and the
// size's datasheet.

const pagePath = "/resources/cad-library";

export const metadata: Metadata = buildPageMetadata({
  title: "FRP Profile CAD Library: Free DXF Cross-Sections",
  description:
    "Free DXF cross-section drawings of pultruded FRP I-beams, channels, angles, tubes, rods and flat bars, plus grating clips. No login; opens in AutoCAD, LibreCAD.",
  path: pagePath,
});

const rows = buildProducts()
  .map((product) => {
    const { slug } = catalogIdentity(product.model, product.cat, product.geometry.dims);
    return { product, slug, family: datasheetFamily(product.geometry.shape) };
  })
  .filter((row) => CAD_SLUGS.has(row.slug));

const families = [...new Set(rows.map((row) => row.family.plural))].map((plural) => {
  const members = rows.filter((row) => row.family.plural === plural);
  return { plural, id: plural.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-"), href: members[0].family.href, members };
});

const clips = [
  { name: GRATING_CLIP_DXF_NAME, file: GRATING_CLIP_DXF_HREF, page: "/products/grating" },
  ...(["molded", "pultruded"] as const).map((family) => ({ name: `${gratingProducts[family].name} hold-down clips (${gratingProducts[family].clips}, 316 stainless)`, file: gratingProducts[family].cad, page: gratingProducts[family].path })),
];

const link = "font-semibold text-teal-text hover:underline";
const th = "px-[14px] py-[8px] font-semibold text-t1";

export default function CadLibraryPage() {
  const files = [
    ...rows.map((row) => ({ name: `${row.family.label} ${sectionDrawingSize(row.product.model)} DXF`, file: `/cad/${row.slug}.dxf` })),
    ...clips.map((clip) => ({ name: `${clip.name} DXF`, file: clip.file })),
  ];
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": `${absoluteUrl(pagePath)}#collection`,
          url: absoluteUrl(pagePath),
          name: "FRP profile CAD library",
          description: "Dimensioned DXF cross-sections of F1 Composite catalog pultruded FRP profiles and grating clips.",
          isPartOf: { "@id": "https://www.f1composite.com/#website" },
          publisher: { "@id": "https://www.f1composite.com/#organization" },
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: files.length,
            itemListElement: files.map((item, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: { "@type": "DigitalDocument", name: item.name, encodingFormat: "image/vnd.dxf", url: absoluteUrl(item.file), isAccessibleForFree: true },
            })),
          },
        }}
      />
      <PageHeader
        tag="CAD downloads"
        title="FRP profile CAD library"
        description="Dimensioned DXF cross-sections of every catalog size that has one, drawn in millimeters at 1:1 from the nominal section, and the grating hold-down clips. Free to download, no login; the files open in AutoCAD, DraftSight, LibreCAD and other CAD packages."
        facts={[
          { label: "Profile sections", value: String(rows.length) },
          { label: "Families", value: String(families.length) },
          { label: "Grating clips", value: String(clips.length) },
          { label: "Format", value: "DXF, mm" },
        ]}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "Downloads", href: "/resources/downloads" },
          { label: "CAD library" },
        ]}
      />

      <PageNav items={[...families.map((family) => ({ id: family.id, label: family.plural })), { id: "grating-clips", label: "Grating clips" }]} />

      {families.map((family, i) => {
        const sample = family.members[0];
        return (
          <PageSection
            key={family.id}
            id={family.id}
            title={`${family.plural}: DXF drawings`}
            count={`${family.members.length} sizes`}
            tone={i % 2 === 0 ? "white" : "muted"}
          >
            <div className="grid gap-[24px] lg:grid-cols-[minmax(0,1fr)_320px]">
              <div className="relative overflow-x-auto rounded-card border border-border-default bg-white">
                <table className="w-full min-w-[520px] border-collapse text-left text-f14">
                  <caption className="sr-only">{`DXF drawings of ${familyInSentence(family.members[0].family)}`}</caption>
                  <thead>
                    <tr className="border-b border-border-default bg-bg2">
                      <th scope="col" className={th}>Size (mm)</th>
                      <th scope="col" className={`${th} text-right`}>Mass (kg/m)</th>
                      <th scope="col" className={th}>Drawing</th>
                      <th scope="col" className={th}>Datasheet</th>
                    </tr>
                  </thead>
                  <tbody>
                    {family.members.map((row) => (
                      <tr key={row.slug} className="border-b border-border-default last:border-b-0">
                        <th scope="row" className="px-[14px] py-[8px] font-semibold tabular-nums text-t1">{row.product.model}</th>
                        <td className="px-[14px] py-[8px] text-right tabular-nums text-t1">{row.product.weight}</td>
                        <td className="px-[14px] py-[8px]"><a href={`/cad/${row.slug}.dxf`} download className={link}>DXF ↓</a></td>
                        <td className="px-[14px] py-[8px]"><Link href={`/datasheets/${row.slug}`} className={link}>Specs and loads</Link></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div>
                <Image
                  src={sectionDrawingPath(sample.product.model, sample.product.geometry.shape)}
                  alt={sectionDrawingAlt(sample.product.model, sample.product.geometry.shape)}
                  width={SECTION_DRAWING_SIZE.width}
                  height={SECTION_DRAWING_SIZE.height}
                  sizes="(min-width: 1024px) 320px, 100vw"
                  className="h-auto w-full rounded-card border border-border-default bg-white"
                />
                <p className="mt-[8px] text-f14 text-t3">
                  {sample.product.model}, one size of the family. All sizes: <Link href={family.href} className={link}>{familyInSentence(sample.family)}</Link>.
                </p>
              </div>
            </div>
          </PageSection>
        );
      })}

      <PageSection id="grating-clips" title="Grating clips: DXF drawings" tone={families.length % 2 === 0 ? "white" : "muted"}>
        <ul className="max-w-[820px] space-y-[10px] text-f16">
          {clips.map((clip) => (
            <li key={clip.file}>
              <a href={clip.file} download className={link}>{clip.name} ↓</a>{" "}
              <span className="text-t3">· <Link href={clip.page} className={link}>product page</Link></span>
            </li>
          ))}
        </ul>
        <p className="mt-[16px] max-w-[820px] text-f14 leading-golden text-t2">
          Drawings show the nominal section without corner radii or tolerances. Confirm the order drawing, tolerances and any machining with F1 before fabrication; STEP models and
          project-specific sections are available on request.
        </p>
      </PageSection>

      <RelatedLinks
        groups={[
          { title: "Design data", links: [
            { href: "/resources/frp-profile-design-manual", label: "FRP profile design manual (PDF)" },
            { href: "/frp-span-tables", label: "FRP span tables" },
            { href: "/tools/profile-finder", label: "Profile finder" },
          ] },
          { title: "Documents", links: [
            { href: "/resources/downloads", label: "Downloads and catalogs" },
            { href: "/resources/design-guides", label: "FRP design guides" },
            { href: "/technology/frp-profile-machining", label: "FRP profile machining" },
          ] },
        ]}
      />

      <InnerCTA />
    </>
  );
}
