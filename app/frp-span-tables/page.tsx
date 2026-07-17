// FRP span tables — the crawlable static twin of /frp-profile-calculator.
// Every allowable-load figure is precomputed by lib/spanTables.ts with the
// same formulas the calculator runs client-side; each row deep-links into the
// calculator with its section preset so "table row → verify → RFQ" is one path.

import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import ArticleSignals from "@/components/sections/ArticleSignals";
import InnerCTA from "@/components/sections/InnerCTA";
import JsonLd from "@/components/seo/JsonLd";
import FAQ from "@/components/ui/FAQ";
import SectionTag from "@/components/ui/SectionTag";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
import { buildSpanTables, DESIGN_BASIS, SPANS_MM } from "@/lib/spanTables";

const publishedAt = "2026-07-11";
const updatedAt = "2026-07-11";

export const metadata: Metadata = buildPageMetadata({
  title: "FRP Span Tables — Pultruded Fiberglass Load Charts",
  description:
    "Allowable uniform load span tables for pultruded FRP I-beams, channels, and tubes — EN 13706 E23, LRFD per ASCE/SEI 74-23, L/250 deflection. Free.",
  path: "/frp-span-tables",
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
      "Material EN 13706 Grade E23 (E_L 23 GPa, G_LT 3.5 GPa); strength checks per LRFD ASCE/SEI 74-23 with φ = 0.65 and γ_Q = 1.6 on a live-load-dominated case; outdoor environmental knockdown Ω_E = 0.85; simply supported uniform load; deflection limited to L/250 at service load including the Timoshenko shear correction. The governing check for each value is marked — d deflection, b bending, v shear.",
  },
  {
    question: "Do these span tables include shear deflection?",
    answer:
      "Yes. Pultruded FRP has G_LT of only ~3.5 GPa against E_L of 23 GPa, so shear deformation contributes 5–15% of total deflection at common span-to-depth ratios and more on short spans. Every deflection-governed value in these tables applies the load-case-matched Timoshenko correction — plain 5wL⁴/384EI tables overstate what short-span FRP beams can carry.",
  },
  {
    question: "Are these tables valid for FRP profiles from any manufacturer?",
    answer:
      "The mechanical basis is the EN 13706 E23 minimum-modulus grade, so any profile certified to E23 meets or exceeds the stiffness assumed here. Section dimensions and weights are the F1 Composite published catalog; another maker's nominally similar section can differ in wall thickness and flange width, which changes the numbers. Check the matching profile datasheet for exact section properties before final design.",
  },
  {
    question: "Can I use these span tables for FRP grating?",
    answer:
      "No — molded and pultruded gratings are plate-like panels with their own load-deflection tables per panel type and bearing-bar pitch. These tables cover single pultruded structural profiles in bending. For grating, see the FRP gratings product page or ask engineering for panel load tables against your support spacing.",
  },
];

function formatLoad(w: number): string {
  if (w < 0.05) return "—";
  if (w < 1) return w.toFixed(2);
  return w.toFixed(1);
}

const GOVERNS_MARK = { deflection: "d", bending: "b", shear: "v" } as const;

export default function SpanTablesPage() {
  const families = buildSpanTables();
  const totalRows = families.reduce((n, f) => n + f.rows.length, 0);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Dataset",
          name: "FRP Profile Span Tables — Allowable Uniform Load (EN 13706 E23)",
          description:
            `Precomputed allowable uniform load for ${totalRows} pultruded FRP profiles (I-beam, channel, square/rectangular tube, round tube) across spans of 1–6 m. Basis: EN 13706 E23, LRFD ASCE/SEI 74-23 (φ 0.65, γ_Q 1.6), outdoor knockdown 0.85, simply supported UDL, deflection L/250 with Timoshenko shear correction.`,
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
        tag="Free Engineering Data"
        title="FRP Span Tables & Load Charts"
        description="Allowable uniform load for every published F1 pultruded profile — I-beams, channels, square and round tubes — over 1 to 6 m simple spans. EN 13706 E23 material, LRFD strength checks per ASCE/SEI 74-23, and L/250 deflection with the Timoshenko shear correction FRP needs. Every row opens pre-loaded in the calculator."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Technology", href: "/technology" },
          { label: "FRP Span Tables" },
        ]}
      />
      <ArticleSignals
        publishedAt={publishedAt}
        updatedAt={updatedAt}
        authorName="Yifan Liu"
        authorRole="Senior Application Engineer — pultruded FRP structural design"
        authorHref="/about/authors/yifan-liu"
        reviewedBy="Yifan Liu, Application Engineer"
        standards={["ASCE/SEI 74-23", "EN 13706-3", "CEN/TS 19101:2022", "GB 50608-2020"]}
      />

      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Design Basis</SectionTag>
          <div className="mt-[21px] grid gap-[13px] rounded-[8px] border border-border-default bg-slate-50 p-[21px] text-f14 leading-golden text-t2 md:grid-cols-2">
            <div><strong className="text-t1">Material:</strong> {DESIGN_BASIS.material} — E_L {DESIGN_BASIS.E_L_GPa} GPa, G_LT {DESIGN_BASIS.G_LT_GPa} GPa</div>
            <div><strong className="text-t1">Strength:</strong> {DESIGN_BASIS.method} — allowable bending {DESIGN_BASIS.bendingAllowableMPa} MPa, shear {DESIGN_BASIS.shearAllowableMPa} MPa after knockdown</div>
            <div><strong className="text-t1">Environment:</strong> {DESIGN_BASIS.environment}</div>
            <div><strong className="text-t1">Load case:</strong> {DESIGN_BASIS.loadCase}</div>
            <div className="md:col-span-2"><strong className="text-t1">Deflection:</strong> {DESIGN_BASIS.deflectionLimit}</div>
          </div>
          <p className="mt-[13px] text-f13 text-t3">
            Values are the maximum service UDL in kN/m (1 kN/m ≈ 68.5 lb/ft). Superscript marks the governing check:{" "}
            <sup>d</sup> deflection, <sup>b</sup> bending, <sup>v</sup> shear. “—” = below practical loading.
            Local buckling, lateral-torsional buckling, connections, and long-term creep are not covered — review per
            ASCE/SEI 74-23 / CEN/TS 19101. For a different deflection limit, point loads, cantilevers, or another code, use the{" "}
            <Link href="/frp-profile-calculator" className="text-teal-text hover:underline">FRP profile calculator</Link>.
          </p>
        </div>
      </section>

      {families.map((family) => (
        <section key={family.id} id={family.id} className="bg-white py-[34px]">
          <div className="mx-auto max-w-[1280px] px-[34px]">
            <h2 className="text-f24 font-bold text-t1">{family.title}</h2>
            <p className="mt-[8px] max-w-[800px] text-f15 leading-golden text-t2">{family.intro}</p>
            <div className="mt-[21px] overflow-x-auto rounded-[8px] border border-border-default">
              <table className="w-full min-w-[880px] border-collapse text-f13">
                <thead>
                  <tr className="bg-slate-50 text-left text-t1">
                    <th className="whitespace-nowrap px-[13px] py-[10px] font-semibold">Section (mm)</th>
                    <th className="whitespace-nowrap px-[13px] py-[10px] font-semibold">kg/m</th>
                    <th className="whitespace-nowrap px-[13px] py-[10px] font-semibold">Ix ×10⁶ mm⁴</th>
                    {SPANS_MM.map((L) => (
                      <th key={L} className="whitespace-nowrap px-[13px] py-[10px] text-right font-semibold">
                        {(L / 1000).toFixed(1).replace(/\.0$/, "")} m
                      </th>
                    ))}
                    <th className="px-[13px] py-[10px]" />
                  </tr>
                </thead>
                <tbody>
                  {family.rows.map((row) => (
                    <tr key={row.model} className="border-t border-border-default/70 text-t2">
                      <td className="whitespace-nowrap px-[13px] py-[8px] font-medium text-t1">{row.model}</td>
                      <td className="whitespace-nowrap px-[13px] py-[8px]">{row.weightKgPerM}</td>
                      <td className="whitespace-nowrap px-[13px] py-[8px]">{(row.IxMm4 / 1e6).toFixed(2)}</td>
                      {row.cells.map((cell, i) => (
                        <td key={i} className="whitespace-nowrap px-[13px] py-[8px] text-right tabular-nums">
                          {formatLoad(cell.w)}
                          {cell.w >= 0.05 && <sup className="text-t3">{GOVERNS_MARK[cell.governs]}</sup>}
                        </td>
                      ))}
                      <td className="whitespace-nowrap px-[13px] py-[8px] text-right">
                        <Link href={row.calculatorHref} className="text-teal-text hover:underline">
                          Check →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ))}

      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <h2 className="text-f24 font-bold text-t1">How to read an FRP span chart</h2>
          <div className="mt-[21px] grid gap-[34px] lg:grid-cols-2">
            <div className="space-y-[13px] text-f15 leading-golden text-t2">
              <p>
                Find the profile row and read across to your span: the value is the maximum uniformly distributed
                service load the section carries with every check passing. Nearly every value in these tables is
                deflection-governed (<sup>d</sup>) — the defining feature of fiberglass structural design. With E_L
                around 1/10 of steel, an FRP member sized for strength alone would deflect far past any serviceability
                limit, so span tables for pultruded profiles are effectively stiffness tables.
              </p>
              <p>
                Shear (<sup>v</sup>) only governs on short, deep sections, and bending (<sup>b</sup>) rarely governs at
                all under L/250. If your project uses L/180 (industrial economy) or L/360 (pedestrian comfort, IBC
                1604.3), the ranking of sections stays the same but every value scales — use the{" "}
                <Link href="/frp-profile-calculator" className="text-teal-text hover:underline">calculator</Link> with
                your exact limit.
              </p>
            </div>
            <div className="space-y-[13px] text-f15 leading-golden text-t2">
              <p>
                Exact section properties (A, Ix, Iy, Sx, torsion, and EN 13706 mechanical data) for every row live in
                the <Link href="/datasheets" className="text-teal-text hover:underline">profile datasheets</Link>, and
                dimensioned drawings are on the{" "}
                <Link href="/products/standard-profiles" className="text-teal-text hover:underline">standard profiles size chart</Link>.
                For members these tables can’t represent — angles in single-leg bending, continuous spans, frames —
                ask <Link href="/ask" className="text-teal-text hover:underline">the FRP Engineering Advisor</Link> or
                send the case to engineering.
              </p>
            </div>
          </div>
          <FAQ items={spanTableFaqs} />
        </div>
      </section>

      <InnerCTA title="Need a section these tables don't cover?" />
    </>
  );
}
