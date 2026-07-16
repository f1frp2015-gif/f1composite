// HTML datasheet — the citeable, crawlable twin of the PDF (GEO surface).
// One page per catalog product: cross-section drawing, exact section
// properties, formulation mechanical data, standards, PDF download link.
// Data comes live from the catalog DB; unknown slugs 404.

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import SectionTag from "@/components/ui/SectionTag";
import JsonLd from "@/components/seo/JsonLd";
import SectionSvg from "@/components/datasheets/SectionSvg";
import { buildPageMetadata, buildProductFamilyPageSchema, priceRangeFromWeights } from "@/lib/seo";
import { getAllDatasheetPages, getDatasheetPage } from "@/lib/catalog/public";
import { computeProperties, designation, dimensionRows } from "@/lib/catalog/shapes";
import { sig } from "@/lib/catalog/section";
import { CAD_SLUGS } from "@/lib/cadManifest";
import type { FormulationRow } from "@/lib/catalog/db";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  // Build-safe: empty DB → no prerendered params; pages render on demand.
  const all = await getAllDatasheetPages();
  return all.map((d) => ({ slug: d.slug }));
}

const num = (v: unknown): number | null => {
  if (v == null) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};

/** Deterministically bounded description (SEO guard: 120–160 chars). */
function buildDesc(model: string, grade: string | null): string {
  const g = grade ? `EN 13706 ${grade}` : "EN 13706";
  const long = `${model} pultruded FRP profile datasheet: exact section properties (A, Ix, Sx), ${g} mechanical data, dimensions, and free PDF download from F1 Composite.`;
  if (long.length <= 160 && long.length >= 120) return long;
  const short = `${model} pultruded FRP profile datasheet: section properties, ${g} mechanical data, dimensions, and free PDF download from F1 Composite.`;
  if (short.length >= 120 && short.length <= 160) return short;
  return `${short} Engineering data generated live.`.slice(0, 160);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getDatasheetPage(slug);
  if (!data) return { title: "Datasheet not found" };
  const grade = data.formulation?.en13706_grade ?? null;
  return buildPageMetadata({
    title: `${data.product.model} FRP Profile Datasheet & Section Properties`,
    description: buildDesc(data.product.model, grade),
    path: `/datasheets/${slug}`,
  });
}

const MECH_ROWS: { key: keyof FormulationRow; label: string; unit: string; method: string }[] = [
  { key: "e_l_gpa", label: "Tensile modulus E_L (longitudinal)", unit: "GPa", method: "EN ISO 527-4" },
  { key: "e_t_gpa", label: "Transverse tensile modulus E_T", unit: "GPa", method: "EN ISO 527-4" },
  { key: "tensile_l_mpa", label: "Tensile strength (longitudinal)", unit: "MPa", method: "EN ISO 527-4" },
  { key: "tensile_t_mpa", label: "Tensile strength (transverse)", unit: "MPa", method: "EN ISO 527-4" },
  { key: "flexural_l_mpa", label: "Flexural strength (longitudinal)", unit: "MPa", method: "EN ISO 14125" },
  { key: "flexural_t_mpa", label: "Flexural strength (transverse)", unit: "MPa", method: "EN ISO 14125" },
  { key: "shear_mpa", label: "Interlaminar shear strength (ILSS)", unit: "MPa", method: "EN ISO 14130" },
  { key: "pin_bearing_l_mpa", label: "Pin-bearing strength (longitudinal)", unit: "MPa", method: "EN 13706-2 Annex D" },
  { key: "pin_bearing_t_mpa", label: "Pin-bearing strength (transverse)", unit: "MPa", method: "EN 13706-2 Annex D" },
  { key: "compressive_l_mpa", label: "Compressive strength (longitudinal)", unit: "MPa", method: "EN ISO 604" },
  { key: "barcol", label: "Barcol hardness", unit: "", method: "ASTM D2583" },
  { key: "water_abs_pct", label: "Water absorption (24 h)", unit: "%", method: "EN ISO 62" },
];

export default async function DatasheetPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getDatasheetPage(slug);
  if (!data) notFound();
  const { product, formulation, category } = data;

  const density = formulation ? num(formulation.density_g_cm3) : null;
  const props = product.geometry
    ? computeProperties(product.geometry, density ? density * 1000 : undefined)
    : null;
  const dims = product.geometry ? dimensionRows(product.geometry) : [];
  const desig = product.geometry ? designation(product.geometry) : null;
  const publishedW = num(product.weight_per_m);
  // For the Offer price band only, fall back to the geometry-derived mass per
  // metre when no published weight exists. This is an INDICATIVE band basis,
  // not a published spec (published weight stays authoritative for measurements
  // below), so a profile without a published weight still satisfies Google's
  // "offers/review/aggregateRating required" rule instead of erroring.
  const computedW = props?.massPerMetre != null ? Math.round(props.massPerMetre * 100) / 100 : null;
  const weightForOffer = publishedW ?? computedW;

  const schema = buildProductFamilyPageSchema({
    name: `${product.model} pultruded FRP profile`,
    description: buildDesc(product.model, formulation?.en13706_grade ?? null),
    path: `/datasheets/${slug}`,
    image: "/opengraph-image",
    category: category?.name ?? "Pultruded FRP profile",
    material: "Glass fiber reinforced polymer (GFRP)",
    // Same-SKU weight fed through both ends of the standard-profile USD/kg
    // quoting tier — a real per-model band, not a flat catalog-wide number.
    priceRange: weightForOffer != null ? (priceRangeFromWeights([weightForOffer], 2.2, 4.5) ?? undefined) : undefined,
    ...(publishedW != null && {
      measurements: [{ propertyID: "massPerMetre", value: String(publishedW), unitText: "kg/m" }],
    }),
    additionalProperty: [
      ...(formulation?.en13706_grade
        ? [{ name: "EN 13706 grade", value: formulation.en13706_grade }]
        : []),
      ...(desig ? [{ name: "Designation", value: desig }] : []),
    ],
  });

  const sectionRows = props
    ? [
        ["Cross-section area A", `${sig(props.A)} mm²`],
        ["Moment of inertia Ix", `${sig(props.Ix / 1e4)} cm⁴`],
        ["Moment of inertia Iy", `${sig(props.Iy / 1e4)} cm⁴`],
        ["Section modulus Sx", `${sig(props.Sx / 1e3)} cm³`],
        ["Section modulus Sy", `${sig(props.Sy / 1e3)} cm³`],
        ["Radius of gyration rx", `${sig(props.rx)} mm`],
        ["Radius of gyration ry", `${sig(props.ry)} mm`],
        ["Torsion constant J", props.J == null ? "—" : `${sig(props.J / 1e4)} cm⁴`],
        ...(props.massPerMetre != null
          ? [["Mass per metre (calculated)", `${sig(props.massPerMetre, 3)} kg/m`]]
          : []),
      ]
    : [];

  return (
    <>
      <JsonLd data={schema} />
      <PageHeader
        tag="Technical Datasheet"
        title={`${product.model} — Pultruded FRP Profile`}
        description={`${category?.name ?? "Pultruded FRP profile"} · ${formulation?.en13706_grade ? `EN 13706 ${formulation.en13706_grade}` : "engineering datasheet"}${publishedW != null ? ` · ${publishedW} kg/m` : ""}`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Datasheets", href: "/datasheets" },
          { label: product.model },
        ]}
      />

      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1100px] px-[34px]">
          <div className="grid gap-[34px] md:grid-cols-2">
            <div>
              <SectionTag>Cross-Section</SectionTag>
              <div className="mt-[21px] rounded-[8px] border border-border-default p-[21px] text-center">
                {product.geometry ? (
                  <SectionSvg geometry={product.geometry} size={280} className="mx-auto" />
                ) : (
                  <p className="text-f13 text-t3">Geometry pending — contact engineering.</p>
                )}
                {desig && <p className="mt-[8px] text-f15 font-bold text-t1">{desig}</p>}
              </div>
              {dims.length > 0 && (
                <table className="mt-[21px] w-full text-left text-f15">
                  <tbody>
                    {dims.map((d) => (
                      <tr key={d.symbol} className="border-b border-border-default">
                        <td className="py-[8px] pr-[21px] text-t2">
                          {d.label} ({d.symbol})
                        </td>
                        <td className="py-[8px] font-medium text-t1">{d.value} mm</td>
                      </tr>
                    ))}
                    {publishedW != null && (
                      <tr className="border-b border-border-default">
                        <td className="py-[8px] pr-[21px] text-t2">Mass per metre (published)</td>
                        <td className="py-[8px] font-medium text-teal-text">{publishedW} kg/m</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
              <div className="mt-[21px] flex flex-wrap gap-[13px]">
                <a
                  href={`/api/datasheet?ids=${product.id}`}
                  target="_blank"
                  rel="noopener"
                  className="inline-block rounded-[6px] bg-teal-text px-[21px] py-[13px] text-f15 font-semibold text-white hover:opacity-90"
                >
                  Download PDF datasheet →
                </a>
                {CAD_SLUGS.has(slug) && (
                  <a
                    href={`/cad/${slug}.dxf`}
                    download
                    className="inline-block rounded-[6px] border border-teal-text px-[21px] py-[13px] text-f15 font-semibold text-teal-text hover:bg-teal-bg"
                  >
                    Download CAD (DXF, free) →
                  </a>
                )}
              </div>
              {CAD_SLUGS.has(slug) && (
                <p className="mt-[8px] text-f13 text-t3">
                  Dimensioned cross-section drawing in DXF — no login, no email. Opens in AutoCAD,
                  DraftSight, LibreCAD, and every major CAD package.
                </p>
              )}
            </div>

            <div>
              <SectionTag>Section Properties (calculated)</SectionTag>
              <table className="mt-[21px] w-full text-left text-f15">
                <tbody>
                  {sectionRows.map(([label, value]) => (
                    <tr key={label} className="border-b border-border-default">
                      <td className="py-[8px] pr-[21px] text-t2">{label}</td>
                      <td className="py-[8px] font-medium text-t1">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-[13px] text-f13 leading-golden text-t3">
                Derived exactly from the cross-section geometry by polygon integration. The
                published mass per metre is the authoritative catalog value; the calculated figure
                is a geometric cross-check. Because FRP modulus is ~1/10 of steel, deflection
                usually governs design — use the{" "}
                <Link href="/frp-profile-calculator" className="text-teal-text hover:underline">
                  deflection calculator
                </Link>{" "}
                for span checks.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bg2 py-[55px]">
        <div className="mx-auto max-w-[1100px] px-[34px]">
          <SectionTag>
            {`Mechanical & Physical Properties${formulation ? ` — ${formulation.name}` : ""}`}
          </SectionTag>
          <div className="mt-[21px] overflow-x-auto rounded-[8px] border border-border-default bg-white">
            <table className="w-full text-left text-f15">
              <thead>
                <tr className="border-b border-border-default bg-bg2">
                  <th className="px-[21px] py-[13px] text-f13 font-bold uppercase tracking-wide text-t1">Property</th>
                  <th className="px-[21px] py-[13px] text-f13 font-bold uppercase tracking-wide text-teal-text">Value</th>
                  <th className="px-[21px] py-[13px] text-f13 font-bold uppercase tracking-wide text-t1">Test method</th>
                </tr>
              </thead>
              <tbody>
                {MECH_ROWS.map((r) => {
                  const v = formulation ? num(formulation[r.key]) : null;
                  return (
                    <tr key={r.key} className="border-b border-border-default last:border-0">
                      <td className="px-[21px] py-[10px] text-t2">{r.label}</td>
                      {v == null ? (
                        <td className="px-[21px] py-[10px] font-medium text-amber-700">
                          — (verify before release)
                        </td>
                      ) : (
                        <td className="px-[21px] py-[10px] font-medium text-t1">
                          {v}
                          {r.unit ? ` ${r.unit}` : ""}
                        </td>
                      )}
                      <td className="px-[21px] py-[10px] text-t3">{r.method}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {formulation && (
            <div className="mt-[13px] flex flex-wrap gap-x-[34px] gap-y-[4px] text-f13 text-t3">
              <span>Resin: {formulation.resin ?? "—"}</span>
              <span>Glass content: {formulation.glass_content ?? "—"}</span>
              <span>
                Density: {num(formulation.density_g_cm3) != null ? `${num(formulation.density_g_cm3)} g/cm³` : "—"}
              </span>
              <span>Grade: {formulation.en13706_grade ?? "—"}</span>
              <span>Fire: {formulation.fire_rating ?? "—"}</span>
            </div>
          )}
          {formulation?.notes && (
            <p className="mt-[8px] text-f13 leading-golden text-t3">
              Data basis: {formulation.notes}
            </p>
          )}
          {(product.standards || product.applications) && (
            <p className="mt-[13px] text-f15 text-t2">
              {product.standards ? `Standards: ${product.standards}. ` : ""}
              {product.applications ? `Typical applications: ${product.applications}.` : ""}
            </p>
          )}
          <p className="mt-[13px] text-f13 leading-golden text-t3">
            Values marked &quot;verify before release&quot; are pending certified test data and are
            never estimated. Request batch-traceable certified data via the quote form before final
            design.
          </p>
        </div>
      </section>

      <InnerCTA title={`Need a quote for ${product.model}?`} />
    </>
  );
}
