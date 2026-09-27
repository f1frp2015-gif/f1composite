import { buildRfqHref } from "@/lib/rfq";
// Customer-facing HTML twin of the PDF. The route segment is noindex (see
// layout.tsx) because all database records share this template; the pilot
// sizes in lib/datasheetContent.ts override that with size-specific content.
// One page per catalog product: cross-section drawing, exact section
// properties, span loads, formulation mechanical data, standards, PDF link.
// Database rows are preferred. The authoritative catalog seed fills missing
// rows so published internal links do not become 404s during a DB outage or a
// partial catalog import; truly unknown slugs still 404.

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import Figure from "@/components/ui/Figure";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/seo/JsonLd";
import SectionSvg from "@/components/datasheets/SectionSvg";
import { FAQList } from "@/components/ui/FAQ";
import {
  approximateInchSize,
  datasheetFamily,
  datasheetFaq,
  familyInSentence,
  datasheetSeoDescription,
  datasheetSeoTitle,
  dimensionLabel,
  formatLoad,
  isIndexedDatasheet,
  relatedSizes,
  spanLoads,
  spanRowForModel,
} from "@/lib/datasheetContent";
import { DESIGN_BASIS } from "@/lib/spanTables";
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
  if (isIndexedDatasheet(slug)) {
    const shape = data.product.geometry?.kind === "parametric" ? data.product.geometry.shape : undefined;
    const weight = num(data.product.weight_per_m);
    // Page robots replace the layout's noindex for the pilot sizes only.
    return {
      ...buildPageMetadata({
        title: datasheetSeoTitle(data.product.model, shape),
        description: datasheetSeoDescription(data.product.model, shape, weight, CAD_SLUGS.has(slug)),
        path: `/datasheets/${slug}`,
      }),
      robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    };
  }
  return buildPageMetadata({
    title: `${data.product.model} FRP Profile Datasheet & Section Properties`,
    description: buildDesc(data.product.model, grade),
    path: `/datasheets/${slug}`,
  });
}

const MECH_ROWS: { key: keyof FormulationRow; label: string; unit: string; method: string }[] = [
  { key: "e_l_gpa", label: "Tensile modulus (longitudinal)", unit: "GPa", method: "EN ISO 527-4" },
  { key: "e_t_gpa", label: "Tensile modulus (transverse)", unit: "GPa", method: "EN ISO 527-4" },
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
  const { product, formulation, category, source } = data;
  const shape = product.geometry?.kind === "parametric" ? product.geometry.shape : undefined;
  const family = datasheetFamily(shape);
  // Shapes the price estimator accepts (lib/pricing profile types).
  const priceEstimate = shape != null && ["i_beam", "channel", "angle", "shs", "rhs", "tube"].includes(shape);
  const sizeLabel = `${dimensionLabel(product.model)} mm`;
  const inchSize = approximateInchSize(product.model);
  const hasCad = CAD_SLUGS.has(slug);
  const spanRow = spanRowForModel(product.model);
  const loads = spanRow ? spanLoads(spanRow) : [];
  const siblings = relatedSizes(shape);
  const hubHref = "/products/fiberglass-structural-shapes";

  const density = formulation ? num(formulation.density_g_cm3) : null;
  const props = product.geometry
    ? computeProperties(product.geometry, density ? density * 1000 : undefined)
    : null;
  const dims = product.geometry ? dimensionRows(product.geometry) : [];
  const desig = product.geometry ? designation(product.geometry) : null;
  const publishedW = num(product.weight_per_m);
  // For the Offer price band only, fall back to the geometry-derived mass per
  // meter when no published weight exists. This is an INDICATIVE band basis,
  // not a published spec (published weight stays authoritative for measurements
  // below), so a profile without a published weight still satisfies Google's
  // "offers/review/aggregateRating required" rule instead of erroring.
  const computedW = props?.massPerMetre != null ? Math.round(props.massPerMetre * 100) / 100 : null;
  const weightForOffer = publishedW ?? computedW;
  const faq = datasheetFaq({ model: product.model, shape, weightKgPerM: publishedW, hasCad, row: spanRow });

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
          ? [["Mass per meter (calculated)", `${sig(props.massPerMetre, 3)} kg/m`]]
          : []),
      ]
    : [];

  const grade = formulation?.en13706_grade ?? null;
  // "FRP I-Beam" → "Fiberglass I-beam": the product noun in sentence case.
  const titleNoun = family.label
    .replace(/^FRP /, "")
    .split(" ")
    .map((word) => (/^[A-Z]-/.test(word) ? word[0] + word.slice(1).toLowerCase() : word.toLowerCase()))
    .join(" ");
  const quoteHref = buildRfqHref({ source: "datasheet", product: product.model, productPath: `/datasheets/${slug}`, specification: desig ?? product.model });
  const hasLoads = spanRow != null && loads.length > 0;
  const link = "font-semibold text-teal-text hover:underline";
  const th = "px-[14px] py-[8px] font-semibold text-t1";
  const td = "px-[14px] py-[8px]";
  const buttonBase = "inline-flex min-h-[46px] items-center justify-center rounded-control px-[22px] text-f14 font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2";
  // Sections alternate white and muted from the white one under the header.
  const sectionOrder = ["section", hasLoads && "span-loads", "properties", siblings.length > 1 && "sizes", faq.length > 0 && "faq"].filter(Boolean);
  const toneOf = (id: string) => (sectionOrder.indexOf(id) % 2 === 0 ? "white" : "muted");

  return (
    <>
      <JsonLd data={schema} />
      {/* A "Products" breadcrumb gives the header the product quote, advisor and WhatsApp actions. */}
      <PageHeader
        tag="Datasheet"
        title={`Fiberglass ${titleNoun} ${sizeLabel}`}
        description={`Dimensions, section properties computed from the geometry${hasLoads ? ", allowable loads by span" : ""} and ${grade ? `EN 13706 ${grade}` : "laminate"} mechanical data for the ${product.model} pultruded profile.`}
        facts={[
          { label: "Model", value: product.model },
          ...(grade ? [{ label: "EN 13706 grade", value: grade }] : []),
          ...(publishedW != null ? [{ label: "Published mass", value: `${publishedW} kg/m` }] : []),
          ...(props ? [{ label: "Section area", value: `${sig(props.A)} mm²` }] : []),
        ]}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products/product-lines" },
          { label: "Structural Shapes", href: hubHref },
          ...(family.href === hubHref ? [] : [{ label: family.plural, href: family.href }]),
          { label: product.model },
        ]}
      />

      <PageNav
        items={[
          { id: "section", label: "Section" },
          ...(hasLoads ? [{ id: "span-loads", label: "Loads by span" }] : []),
          { id: "properties", label: "Mechanical data" },
          ...(siblings.length > 1 ? [{ id: "sizes", label: "Other sizes" }] : []),
          ...(faq.length > 0 ? [{ id: "faq", label: "FAQ" }] : []),
        ]}
      />

      <PageSection id="section" title="Cross-section and section properties" tone={toneOf("section")}>
        <div className="grid gap-[32px] lg:grid-cols-2">
          <div>
            <Figure number={1} title={desig ?? product.model} note="Drawn to scale">
              {product.geometry ? (
                <SectionSvg geometry={product.geometry} size={260} className="mx-auto h-auto max-w-full" />
              ) : (
                <p className="py-[40px] text-center text-f14 text-t3">Geometry pending. Contact engineering for the drawing.</p>
              )}
            </Figure>
            {inchSize && (
              <p className="mt-[8px] text-f14 text-t3">≈ {inchSize} in, for reference only; the metric dimensions govern.</p>
            )}
            {dims.length > 0 && (
              <div className="relative mt-[20px] overflow-x-auto rounded-card border border-border-default bg-white">
                <table className="w-full text-left text-f14">
                  <caption className="sr-only">Dimensions of {product.model}</caption>
                  <tbody>
                    {dims.map((d) => (
                      <tr key={d.symbol} className="border-b border-border-default last:border-b-0">
                        <th scope="row" className={`${td} font-normal text-t2`}>
                          {d.label} ({d.symbol})
                        </th>
                        <td className={`${td} text-right font-medium text-t1 tabular-nums`}>{d.value} mm</td>
                      </tr>
                    ))}
                    {publishedW != null && (
                      <tr className="border-b border-border-default last:border-b-0">
                        <th scope="row" className={`${td} font-normal text-t2`}>Mass per meter (published)</th>
                        <td className={`${td} text-right font-semibold text-t1 tabular-nums`}>{publishedW} kg/m</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div>
            <div className="relative overflow-x-auto rounded-card border border-border-default bg-white">
              <table className="w-full text-left text-f14">
                <caption className="sr-only">Section properties of {product.model}, calculated from the geometry</caption>
                <thead>
                  <tr className="border-b border-border-default bg-bg2">
                    <th scope="col" className={th}>Section property (calculated)</th>
                    <th scope="col" className={`${th} text-right`}>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {sectionRows.map(([label, value]) => (
                    <tr key={label} className="border-b border-border-default last:border-b-0">
                      <th scope="row" className={`${td} font-normal text-t2`}>{label}</th>
                      <td className={`${td} text-right font-medium text-t1 tabular-nums`}>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-[12px] text-f14 leading-golden text-t2">
              Derived from the cross-section geometry by polygon integration. The published mass per meter is the catalog
              value; the calculated figure is a geometric cross-check. Because the modulus of FRP is about a tenth of
              steel&apos;s, deflection usually governs, so check spans in the{" "}
              <Link href="/frp-profile-calculator" className={link}>profile calculator</Link>.
              {priceEstimate ? (
                <>
                  {" "}For a planning budget per meter, enter these dimensions in the{" "}
                  <Link href="/fiberglass-pultruded-profile-price" className={link}>price estimator</Link>.
                </>
              ) : null}
            </p>
            <div className="mt-[20px] flex flex-wrap gap-[12px]">
              {source === "database" ? (
                <a href={`/api/datasheet?ids=${product.id}`} target="_blank" rel="noopener" className={`${buttonBase} bg-teal-text text-white hover:bg-teal`}>
                  Download the PDF datasheet
                </a>
              ) : (
                <Button
                  href={buildRfqHref({ source: "datasheet", product: product.model, productPath: `/datasheets/${slug}`, specification: desig ?? product.model, message: `Please confirm the applicable product data and inspection evidence for ${product.model}.` })}
                >
                  Request product data
                </Button>
              )}
              {hasCad && (
                <a
                  href={`/cad/${slug}.dxf`}
                  download
                  className={`${buttonBase} border border-border-default bg-white text-t1 hover:border-teal-border hover:text-teal-text`}
                >
                  Download CAD (DXF)
                </a>
              )}
            </div>
            {hasCad && (
              <p className="mt-[8px] text-f14 text-t3">
                A dimensioned cross-section in DXF, free and without a login. It opens in AutoCAD, DraftSight, LibreCAD and
                other CAD packages.
              </p>
            )}
          </div>
        </div>
      </PageSection>

      {hasLoads && spanRow && (
        <PageSection
          id="span-loads"
          title={`What a ${sizeLabel} ${family.noun} carries`}
          intro={`Allowable service uniform load for ${product.model} as a simply supported beam, from the published FRP span tables. Design basis: ${DESIGN_BASIS.material}; ${DESIGN_BASIS.method}; ${DESIGN_BASIS.environment}; deflection limit ${DESIGN_BASIS.deflectionLimit}.${family.uses ? ` Typical uses for this family: ${family.uses}.` : ""}`}
          tone={toneOf("span-loads")}
        >
          <div className="relative max-w-[820px] overflow-x-auto rounded-card border border-border-default bg-white">
            <table className="w-full text-left text-f14">
              <caption className="sr-only">Allowable uniform load for {product.model} by simply supported span</caption>
              <thead>
                <tr className="border-b border-border-default bg-bg2">
                  <th scope="col" className={th}>Span (m)</th>
                  <th scope="col" className={`${th} text-right`}>Allowable UDL (kN/m)</th>
                  <th scope="col" className={`${th} text-right`}>≈ lb/ft</th>
                  <th scope="col" className={th}>Governing check</th>
                </tr>
              </thead>
              <tbody>
                {loads.map((load) => (
                  <tr key={load.spanM} className="border-b border-border-default last:border-b-0">
                    <th scope="row" className={`${td} font-medium text-t1 tabular-nums`}>{load.spanM}</th>
                    <td className={`${td} text-right font-semibold text-t1 tabular-nums`}>{formatLoad(load.kNPerM)}</td>
                    <td className={`${td} text-right text-t2 tabular-nums`}>{formatLoad(load.lbPerFt)}</td>
                    <td className={`${td} text-t2 first-letter:uppercase`}>{load.governs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-[12px] max-w-[820px] text-f14 leading-golden text-t2">
            Spans where the allowable load falls below 0.05 kN/m are omitted. Point loads, connections, lateral restraint and
            other exposures need their own check:{" "}
            <Link href={spanRow.calculatorHref} className={link}>open this section in the calculator</Link> or{" "}
            <Link href={`/frp-span-tables#${family.spanTableId ?? ""}`} className={link}>compare every size in the span tables</Link>.
          </p>
        </PageSection>
      )}

      <PageSection
        id="properties"
        title="Mechanical and physical properties"
        intro={formulation ? `Laminate ${formulation.name}. Test methods are those of EN 13706 and the ISO and ASTM methods it cites.` : undefined}
        tone={toneOf("properties")}
      >
        <div className="relative max-w-[960px] overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full text-left text-f14">
            <caption className="sr-only">Mechanical and physical properties of the {product.model} laminate</caption>
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                <th scope="col" className={th}>Property</th>
                <th scope="col" className={`${th} text-right`}>Value</th>
                <th scope="col" className={th}>Test method</th>
              </tr>
            </thead>
            <tbody>
              {MECH_ROWS.map((r) => {
                const v = formulation ? num(formulation[r.key]) : null;
                return (
                  <tr key={r.key} className="border-b border-border-default last:border-b-0">
                    <th scope="row" className={`${td} font-normal text-t2`}>{r.label}</th>
                    {v == null ? (
                      <td className={`${td} text-right font-medium text-warn`}>Verify before release</td>
                    ) : (
                      <td className={`${td} text-right font-medium text-t1 tabular-nums`}>
                        {v}
                        {r.unit ? ` ${r.unit}` : ""}
                      </td>
                    )}
                    <td className={`${td} text-t3`}>{r.method}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {formulation && (
          <dl className="mt-[12px] flex max-w-[960px] flex-wrap gap-[6px] text-f12">
            {[
              ["Resin", formulation.resin],
              ["Glass content", formulation.glass_content],
              ["Density", num(formulation.density_g_cm3) != null ? `${num(formulation.density_g_cm3)} g/cm³` : null],
              ["Grade", formulation.en13706_grade],
              ["Fire", formulation.fire_rating],
            ].map(([label, value]) => (
              <div key={label} className="rounded-tag border border-border-default bg-bg2 px-[8px] py-[3px]">
                <dt className="inline text-t3">{label}: </dt>
                <dd className="inline font-medium text-t1">{value ?? "—"}</dd>
              </div>
            ))}
          </dl>
        )}
        <div className="mt-[12px] max-w-[820px] space-y-[8px] text-f14 leading-golden text-t2">
          {formulation?.notes && <p>Data basis: {formulation.notes}</p>}
          {(product.standards || product.applications) && (
            <p>
              {product.standards ? `Standards: ${product.standards}. ` : ""}
              {product.applications ? `Typical applications: ${product.applications}.` : ""}
            </p>
          )}
          <p>
            Values marked &ldquo;Verify before release&rdquo; are pending certified test data and are never estimated. Request
            batch-traceable certified data through the <Link href={quoteHref} className={link}>quote form</Link> before final
            design.
          </p>
        </div>
      </PageSection>

      {siblings.length > 1 && (
        <PageSection
          id="sizes"
          title={`Other ${familyInSentence(family)} in the catalog`}
          count={`${siblings.length} sizes`}
          tone={toneOf("sizes")}
        >
          <ul className="flex flex-wrap gap-[8px]">
            {siblings.map((size) => (
              <li key={size.slug}>
                {size.slug === slug ? (
                  <span aria-current="page" className="inline-flex min-h-[36px] items-center rounded-control border border-teal bg-teal-bg2 px-[10px] text-f14 font-semibold text-teal-text">
                    {size.model} · {size.weight} kg/m
                  </span>
                ) : (
                  <Link href={`/datasheets/${size.slug}`} className="inline-flex min-h-[36px] items-center rounded-control border border-border-default bg-white px-[10px] text-f14 text-t1 transition-colors hover:border-teal-border hover:text-teal-text">
                    {size.model} · {size.weight} kg/m
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-[12px] text-f14 text-t2">
            Applications, resin options and quotation details are on the{" "}
            <Link href={family.href} className={link}>{family.noun} product page</Link>.
          </p>
        </PageSection>
      )}

      {faq.length > 0 && (
        <PageSection id="faq" title={`${product.model}: common questions`} tone={toneOf("faq")}>
          <FAQList items={faq} />
        </PageSection>
      )}

      <InnerCTA title={`Need a quote for ${product.model}?`} quoteHref={quoteHref} />
    </>
  );
}
