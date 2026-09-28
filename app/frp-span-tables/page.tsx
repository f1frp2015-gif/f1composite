// FRP span tables — the crawlable static twin of /frp-profile-calculator.
// Every allowable-load figure is precomputed by lib/spanTables.ts with the
// same formulas the calculator runs client-side; each row deep-links into the
// calculator with its section preset so "table row → verify → RFQ" is one path.

import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import InnerCTA from "@/components/sections/InnerCTA";
import JsonLd from "@/components/seo/JsonLd";
import { FAQList } from "@/components/ui/FAQ";
import EmbedCode from "@/components/tools/EmbedCode";
import ToolCitationBlock from "@/components/tools/ToolCitationBlock";
import SpanTablesContent from "@/components/tools/SpanTablesContent";
import RelatedLinks from "@/components/sections/RelatedLinks";
import { getSeoQueryTarget } from "@/content/data/seoQueryTargets";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
import { buildSpanTables, DESIGN_BASIS } from "@/lib/spanTables";
import { datasheetHrefForModel } from "@/lib/datasheetContent";

const pagePath = "/frp-span-tables";
const seoTarget = getSeoQueryTarget(pagePath);

export const metadata: Metadata = buildPageMetadata({
  title: seoTarget.title,
  description: seoTarget.description,
  path: pagePath,
});

const spanTableFaqs = [
  {
    question: "How far can a pultruded fiberglass beam span?",
    answer:
      "It depends on section depth and the deflection limit, because FRP spans are almost always deflection-governed. As reference points from these tables (EN 13706 E23, L/250, outdoor): an FRP I-beam 200×100×10 carries about 5.5 kN/m over a 3 m simple span; an I-beam 240×120×12 carries about 11 kN/m at 3 m; a 100×100×6 square tube carries about 1.5 kN/m at 2.5 m. For a different limit (L/180 walkway economy, L/360 pedestrian comfort) or a point load, run the same section through the FRP profile calculator.",
  },
  {
    question: "What design basis do these FRP span tables use?",
    answer:
      "Material EN 13706 Grade E23 minimums (E_L 23 GPa, shear strength 25 MPa) with an assumed G_LT of 3.5 GPa; strength checks per LRFD ASCE/SEI 74-23 with φ = 0.65, the time-effect factor λ = 0.8 for occupancy live load and γ_Q = 1.6 (ASCE 7-22); an outdoor knockdown of 0.85 on strengths; simply supported uniform load; deflection limited to L/250 at service load including the Timoshenko shear correction. The governing check for each value is marked: d deflection, b bending, v shear.",
  },
  {
    question: "Do these span tables include shear deflection?",
    answer:
      "Yes. Pultruded FRP has G_LT of only ~3.5 GPa against E_L of 23 GPa, so shear deformation contributes 5–15% of total deflection at common span-to-depth ratios and more on short spans. Every deflection-governed value in these tables applies the load-case-matched Timoshenko correction; plain 5wL⁴/384EI tables overstate what short-span FRP beams can carry.",
  },
  {
    question: "Are these tables valid for FRP profiles from any manufacturer?",
    answer:
      "The mechanical basis is the EN 13706 E23 minimum-modulus grade, so any profile certified to E23 meets or exceeds the stiffness assumed here. Section dimensions and weights are the F1 Composite published catalog; another maker's nominally similar section can differ in wall thickness and flange width, which changes the numbers. Check the matching profile datasheet for exact section properties before final design.",
  },
  {
    question: "Can I use these span tables for FRP grating?",
    answer:
      "No. Molded and pultruded gratings are plate-like panels with their own load-deflection tables per panel type and bearing-bar pitch. These tables cover single pultruded structural profiles in bending. For grating, see the FRP gratings product page or ask engineering for panel load tables against your support spacing.",
  },
];

export default function SpanTablesPage() {
  const families = buildSpanTables();
  const totalRows = families.reduce((n, f) => n + f.rows.length, 0);
  const datasheetHrefs = Object.fromEntries(
    families.flatMap((family) => family.rows.flatMap((row) => {
      const href = datasheetHrefForModel(row.model);
      return href ? [[row.model, href]] : [];
    })),
  );

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Dataset",
          name: "FRP Profile Span Tables — Allowable Uniform Load (EN 13706 E23)",
          description:
            `Precomputed allowable uniform load for ${totalRows} pultruded FRP profiles (I-beam, channel, square/rectangular tube, round tube) across spans of 1–6 m. Basis: EN 13706 E23, LRFD ASCE/SEI 74-23 (φ 0.65, λ 0.8, γ_Q 1.6), outdoor knockdown 0.85, simply supported UDL, deflection L/250 with Timoshenko shear correction.`,
          url: absoluteUrl("/frp-span-tables"),
          creator: { "@id": "https://www.f1composite.com/#organization" },
          license: absoluteUrl("/terms"),
          isAccessibleForFree: true,
          keywords: [
            "FRP span table",
            "fiberglass beam span chart",
            "pultruded profile load table",
            "FRP I-beam span table",
            "FRP channel load capacity",
            "fiberglass tube span chart",
            "EN 13706 E23 design data",
            "ASCE/SEI 74-23 LRFD FRP",
          ],
        }}
      />
      <PageHeader
        tag="Tools"
        title="FRP span tables and load charts"
        description="Allowable uniform load for every published F1 pultruded profile (I-beams, channels, square and round tubes) over 1 to 6 m simple spans. EN 13706 E23 material, LRFD strength checks to ASCE/SEI 74-23, and L/250 deflection with the Timoshenko shear correction FRP needs. Every row opens pre-loaded in the calculator."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Span tables" },
        ]}
        actions={{
          primary: { label: "Open the I-beam table", href: "#i-beam" },
          secondary: { label: "Check a section", href: "/frp-profile-calculator", variant: "secondary" },
        }}
      />
      <PageNav
        items={[
          { id: "basis", label: "Design basis" },
          ...families.map((family) => ({ id: family.id, label: family.title.replace(/^FRP /, "").replace(/ span table$/, "").replace(/^./, (c) => c.toUpperCase()) })),
          { id: "how-to-read", label: "How to read" },
          { id: "embed", label: "Embed and cite" },
          { id: "faq", label: "FAQ" },
        ]}
      />

      <PageSection id="basis" title="Design basis" tone="white">
        <dl className="grid gap-[12px] rounded-card border border-border-default bg-bg2 p-[20px] text-f14 leading-golden text-t2 md:grid-cols-2">
          <div><dt className="inline font-semibold text-t1">Material: </dt><dd className="inline">{DESIGN_BASIS.material}: E_L {DESIGN_BASIS.E_L_GPa} GPa and shear strength {DESIGN_BASIS.shearStrengthMPa} MPa (EN 13706 minimums), G_LT {DESIGN_BASIS.G_LT_GPa} GPa (assumed)</dd></div>
          <div><dt className="inline font-semibold text-t1">Strength: </dt><dd className="inline">{DESIGN_BASIS.method}; design bending strength {DESIGN_BASIS.bendingAllowableMPa} MPa, shear {DESIGN_BASIS.shearAllowableMPa} MPa after λ and the knockdown</dd></div>
          <div><dt className="inline font-semibold text-t1">Environment: </dt><dd className="inline">{DESIGN_BASIS.environment}</dd></div>
          <div><dt className="inline font-semibold text-t1">Load case: </dt><dd className="inline">{DESIGN_BASIS.loadCase}</dd></div>
          <div className="md:col-span-2"><dt className="inline font-semibold text-t1">Deflection: </dt><dd className="inline">{DESIGN_BASIS.deflectionLimit}</dd></div>
        </dl>
        <p className="mt-[12px] max-w-[980px] text-f14 leading-golden text-t3">
          Values are the maximum service UDL in kN/m (1 kN/m ≈ 68.5 lb/ft). The superscript marks the governing check:{" "}
          <sup>d</sup> deflection, <sup>b</sup> bending, <sup>v</sup> shear; a dash means below practical loading.
          Local buckling, lateral-torsional buckling, connections and long-term creep are not covered; review them to
          ASCE/SEI 74-23 or CEN/TS 19101. For a different deflection limit, point loads, cantilevers or another code, use the{" "}
          <Link href="/frp-profile-calculator" className="font-semibold text-teal-text hover:underline">FRP profile calculator</Link>.
        </p>
      </PageSection>

      <SpanTablesContent families={families} datasheetHrefs={datasheetHrefs} variant="page" />

      <PageSection id="how-to-read" title="How to read an FRP span chart" tone="muted">
        <div className="grid gap-[32px] lg:grid-cols-2">
          <div className="space-y-[12px] text-f16 leading-golden text-t2">
            <p>
              Find the profile row and read across to your span: the value is the maximum uniformly distributed
              service load the section carries with every check passing. Nearly every value in these tables is
              deflection-governed (<sup>d</sup>), the defining feature of fiberglass structural design. With E_L
              around a tenth of steel, an FRP member sized for strength alone would deflect far past any serviceability
              limit, so span tables for pultruded profiles are effectively stiffness tables.
            </p>
            <p>
              Shear (<sup>v</sup>) only governs on short, deep sections, and bending (<sup>b</sup>) rarely governs at
              all under L/250. If your project uses L/180 (industrial economy) or L/360 (pedestrian comfort, IBC
              1604.3), the ranking of sections stays the same but every value scales, so use the{" "}
              <Link href="/frp-profile-calculator" className="font-semibold text-teal-text hover:underline">calculator</Link> with
              your exact limit.
            </p>
          </div>
          <div className="space-y-[12px] text-f16 leading-golden text-t2">
            <p>
              Exact section properties (A, Ix, Iy, Sx, torsion and EN 13706 mechanical data) for every row are in
              the <Link href="/datasheets" className="font-semibold text-teal-text hover:underline">profile datasheets</Link>, and
              dimensioned drawings are on the{" "}
              <Link href="/products/fiberglass-structural-shapes" className="font-semibold text-teal-text hover:underline">fiberglass structural shapes size chart</Link>.
              For members these tables cannot represent (angles in single-leg bending, continuous spans, frames),
              ask the <Link href="/ask" className="font-semibold text-teal-text hover:underline">engineering assistant</Link> or
              send the case to engineering.
            </p>
          </div>
        </div>
      </PageSection>

      <PageSection id="embed" title="Embed and cite the tables" tone="white">
        <EmbedCode
          toolName="FRP Span Tables"
          embedPath="/frp-span-tables/embed"
          canonicalPath="/frp-span-tables"
          height={920}
          attribution="F1 Composite — Pultruded FRP Profiles Manufacturer"
        />
        <div className="mt-[16px]">
          <ToolCitationBlock
            toolTitle="FRP Span Tables & Load Charts"
            canonicalPath="/frp-span-tables"
            bibtexKey="f1composite_frp_span_tables_2026"
            medium="Data set"
          />
        </div>
      </PageSection>

      <PageSection id="faq" title="Frequently asked questions" tone="muted">
        <FAQList items={spanTableFaqs} />
      </PageSection>

      <RelatedLinks
        background="white"
        groups={[
          {
            title: "Calculation record",
            links: [
              { href: "/frp-profile-calculator/methodology", label: "Calculator methodology and equations" },
              { href: "/frp-profile-calculator/validation", label: "Reproducible validation benchmarks" },
              { href: "/frp-profile-calculator", label: "Run a custom section check" },
            ],
          },
          {
            title: "Use the selected section",
            links: [
              { href: "/products/fiberglass-structural-shapes", label: "Fiberglass structural shapes" },
              { href: "/products/fiberglass-structural-shapes/frp-square-tube", label: "Fiberglass square tube sizes" },
              { href: "/products/fiberglass-structural-shapes/frp-tube", label: "Fiberglass round tube sizes" },
              { href: "/datasheets", label: "Profile datasheets and drawings" },
              { href: "/fiberglass-pultruded-profile-price", label: "Estimate profile price" },
            ],
          },
          {
            title: "Other tools",
            links: [
              { href: "/tools/profile-finder", label: "Profile finder" },
              { href: "/tools/frp-cut-list-optimizer", label: "Cut list optimizer" },
              { href: "/frp-density-calculator", label: "Density and weight calculator" },
              { href: "/tools", label: "All engineering tools" },
            ],
          },
        ]}
      />

      <InnerCTA
        title="Need a section these tables don't cover?"
        quoteHref="/contact?source=tool-span-tables&inquiry_type=rfq"
        text="Send the member, span, support conditions, loads and deflection limit, with the service environment."
      />
    </>
  );
}
