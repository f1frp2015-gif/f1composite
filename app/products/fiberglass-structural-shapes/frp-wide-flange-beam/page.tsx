import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import ProfileFigure from "@/components/datasheets/ProfileFigure";
import JsonLd from "@/components/seo/JsonLd";
import FAQDisclosure from "@/components/ui/FAQDisclosure";
import FamilySizeTable from "@/components/products/FamilySizeTable";
import KeyFacts from "@/components/sections/KeyFacts";
import LaminateProperties from "@/components/products/LaminateProperties";
import ProductDocuments from "@/components/products/ProductDocuments";
import ProductPageNav from "@/components/products/ProductPageNav";
import ProductRfq from "@/components/products/ProductRfq";
import ProductSection from "@/components/products/ProductSection";
import RelatedProfiles from "@/components/products/RelatedProfiles";
import { supplyTerms, weeks } from "@/content/data/company";
import { getSeoQueryTarget } from "@/content/data/seoQueryTargets";
import {
  MM_PER_INCH,
  WF_FLANGE_RATIO_MIN,
  comparisonIBeamModel,
  flangeOutstandRatio,
  nominalWideFlanges,
  wideFlangeCatalogModel,
} from "@/content/data/wideFlangeBeams";
import { loadFamilySizes } from "@/lib/catalog/familySizes";
import { sectionRow } from "@/lib/catalog/sectionRows";
import { buildRfqHref } from "@/lib/rfq";
import { buildPageMetadata, buildProductFamilyPageSchema } from "@/lib/seo";

// Catalog rows are DB-driven with the published seed catalog as fallback.
export const revalidate = 3600;

const pagePath = "/products/fiberglass-structural-shapes/frp-wide-flange-beam";
const seoTarget = getSeoQueryTarget(pagePath);
const LAST_UPDATED = "2026-11-24";
/** Density used for calculated mass, g/cm³: the E23 reference laminate density, which reproduces the catalog mass of the 305 × 305 WF. */
const DENSITY = 1.9;
const KG_PER_M_TO_LB_PER_FT = 0.671969;
const REVIEWER = { name: "Yifan Liu", title: "Application Engineer", href: "/about/authors/yifan-liu" };

export const metadata: Metadata = buildPageMetadata({
  title: seoTarget.title,
  description: seoTarget.description,
  path: pagePath,
  image: `${pagePath}/opengraph-image`,
});

const fmt = (value: number, digits = 0) => value.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits });
const link = "font-semibold text-teal-text underline underline-offset-4 hover:text-teal";
const cell = "px-[12px] py-[10px] align-top";

const nominalRows = nominalWideFlanges.flatMap((item) => {
  const H = item.depthIn * MM_PER_INCH;
  const B = item.widthIn * MM_PER_INCH;
  const t = item.thicknessIn * MM_PER_INCH;
  const row = sectionRow(`WF ${item.designation}`, "i_beam", { H, B, tf: t, tw: t }, null);
  return row ? [{ ...item, H, B, t, row }] : [];
});

const chooseWideFlange = [
  {
    title: "Columns and posts",
    body: "Flexural buckling is checked about the axis with the smaller radius of gyration. Equal flange width and depth raise the weak-axis radius, so a wide flange section is the usual open shape for platform columns, pipe-rack legs and equipment-frame posts.",
  },
  {
    title: "Beams without continuous bracing",
    body: "Lateral-torsional buckling resistance increases with the weak-axis second moment and the torsion constant. Where grating, decking or bracing does not restrain the compression flange, compare a WF section before adding bracing to a narrow-flange beam.",
  },
  {
    title: "Frames with biaxial bending",
    body: "Members that carry wind, equipment or handrail loads in two directions use the weak-axis section modulus as well as the strong-axis one. The calculated Wy of a WF section is several times that of an I-beam of similar depth.",
  },
  {
    title: "Connections that need flange width",
    body: "A wider flange leaves room for two bolt lines, clip angles and bearing plates. Edge distances, hole spacing and pin-bearing checks still follow the connection design for the selected laminate.",
  },
];

const designChecks = [
  {
    title: "Deflection with shear",
    body: "FRP has a low modulus relative to steel, and shear deformation of the web adds to bending deflection. Check both against the project limit with the moduli accepted for the laminate.",
  },
  {
    title: "Local flange buckling",
    body: "Wide flanges have larger outstands. The table lists b/2t for each size so the compression flange can be checked for local buckling under the selected design basis.",
  },
  {
    title: "Global stability",
    body: "Check column buckling about both axes and lateral-torsional buckling for the actual unbraced length. Use the effective lengths and restraint conditions of the real frame.",
  },
  {
    title: "Sustained load and temperature",
    body: "Creep, service temperature and moisture reduce long-term stiffness and strength. Apply the factors of the project's design standard instead of short-term catalog values.",
  },
];

const faqItems = [
  {
    question: "What is a WF beam?",
    answer:
      "WF stands for wide flange. A WF beam is an I-shaped section whose flange width equals, or is close to, its depth, such as 12 × 12 × ½ in. The wide flanges give a much larger weak-axis stiffness than a narrow-flange I-beam of similar depth, which matters for columns and unbraced beams.",
  },
  {
    question: "What is the difference between a WF beam and an I-beam?",
    answer:
      "In FRP catalogs an I-beam usually has a flange width of about half its depth (for example 300 × 150 mm), while a WF beam has a flange width about equal to its depth (305 × 305 mm). The narrow-flange I-beam is lighter for its depth and suits beams braced by grating or decking; the WF section adds weak-axis stiffness, buckling resistance and connection width.",
  },
  {
    question: "Does an FRP WF designation mean the same as a steel W-shape such as W12×26?",
    answer:
      "No. A steel W-shape designation gives the nominal depth and the weight in pounds per foot. FRP wide flange sizes are written as depth × flange width × thickness, for example 12 × 12 × ½ in. Compare the actual dimensions and section properties, not the designation.",
  },
  {
    question: "Can a fiberglass WF beam replace a steel wide flange of the same size?",
    answer:
      "Not size for size. Glass FRP has a much lower modulus than steel, so an FRP member selected for the same span and deflection limit is usually deeper or more closely supported. Select the FRP section from the project loads, deflection limit, restraints and design basis, then compare the complete assemblies.",
  },
  {
    question: "Which fiberglass wide flange sizes does F1 Composite list?",
    answer: `The catalog lists ${wideFlangeCatalogModel} (about 12 × 12 × ½ in) at 21.5 kg/m with a DXF drawing. The standard imperial sizes 4 × 4 × ¼, 6 × 6 × ¼, 6 × 6 × ⅜, 8 × 8 × ⅜, 8 × 8 × ½ and 10 × 10 × ½ in are made to order; plan ${weeks(supplyTerms.existingDieVariantLeadTimeWeeks)} for an existing-die variant or ${weeks(supplyTerms.newDieLeadTimeWeeks)} with a new die, confirmed in the quotation.`,
  },
  {
    question: "Which standards apply to a pultruded FRP wide flange beam?",
    answer:
      "ASCE/SEI 74-23 gives LRFD design rules for pultruded FRP structures in North America, and CEN/TS 19101 covers FRP structures in Europe. EN 13706 and ASTM D3917 deal with profile grades and dimensional tolerances. State which documents the project uses; a standard reference alone does not rate a member.",
  },
];

export default async function WideFlangeBeamPage() {
  const iBeams = await loadFamilySizes("i-beam");
  const wideFlanges = iBeams.filter((size) => size.b != null && size.b / size.d >= WF_FLANGE_RATIO_MIN);
  const wf = iBeams.find((size) => size.model === wideFlangeCatalogModel) ?? wideFlanges[0];
  const narrow = iBeams.find((size) => size.model === comparisonIBeamModel);
  const ratio = wf && narrow ? wf.Iy / narrow.Iy : null;

  const comparison = wf && narrow
    ? [
        { label: "Depth × flange width", wf: `${fmt(wf.d)} × ${fmt(wf.b ?? 0)} mm`, ib: `${fmt(narrow.d)} × ${fmt(narrow.b ?? 0)} mm` },
        { label: "Flange / web thickness", wf: `${fmt(wf.t ?? 0, 1)} mm`, ib: `${fmt(narrow.t ?? 0, 1)} mm` },
        { label: "Catalog mass", wf: wf.mass == null ? "—" : `${fmt(wf.mass, 1)} kg/m`, ib: narrow.mass == null ? "—" : `${fmt(narrow.mass, 1)} kg/m` },
        { label: "Strong axis Ix", wf: `${fmt(wf.Ix)} cm⁴`, ib: `${fmt(narrow.Ix)} cm⁴` },
        { label: "Weak axis Iy", wf: `${fmt(wf.Iy)} cm⁴`, ib: `${fmt(narrow.Iy)} cm⁴` },
        { label: "Weak axis Wy", wf: `${fmt(wf.Wy)} cm³`, ib: `${fmt(narrow.Wy)} cm³` },
        { label: "Radius of gyration rx / ry", wf: `${fmt(wf.rx)} / ${fmt(wf.ry)} mm`, ib: `${fmt(narrow.rx)} / ${fmt(narrow.ry)} mm` },
        { label: "Flange outstand b/2t", wf: fmt(flangeOutstandRatio(wf.b ?? 0, wf.t ?? 1), 1), ib: fmt(flangeOutstandRatio(narrow.b ?? 0, narrow.t ?? 1), 1) },
      ]
    : [];

  const keyFacts = [
    { label: "Definition", value: "A wide flange (WF) beam is an I-shaped section whose flange width is about equal to its depth; a narrow-flange I-beam has flanges about half its depth." },
    ...(ratio && wf && narrow
      ? [{ label: "Weak-axis stiffness", value: `The catalog WF ${fmt(wf.d)} × ${fmt(wf.b ?? 0)} mm has a calculated weak-axis Iy of ${fmt(wf.Iy)} cm⁴, about ${fmt(ratio)} times that of the ${narrow.model} I-beam (${fmt(narrow.Iy)} cm⁴).` }]
      : []),
    { label: "Catalog size", value: `${wideFlangeCatalogModel} mm (about 12 × 12 × ½ in), ${wf?.mass == null ? "mass on request" : `${fmt(wf.mass, 1)} kg/m published catalog mass`}, ${supplyTerms.standardLengthM} m standard length or cut to size.` },
    { label: "Imperial WF sizes", value: `Standard 4 × 4 × ¼ in to 12 × 12 × ½ in WF sizes are made to order, from about ${fmt((nominalRows[0]?.row.A ?? 0) / 100 * DENSITY / 10, 1)} to ${fmt((nominalRows.at(-1)?.row.A ?? 0) / 100 * DENSITY / 10, 1)} kg/m calculated; a first custom run starts at ${supplyTerms.customMoqMeters.firstRun} m.` },
    { label: "Typical uses", value: "Platform and stair columns, pipe-rack legs, equipment frames, cooling-tower structures and beams without continuous lateral bracing." },
    { label: "Design basis", value: "Members are checked under the project's standard, for example ASCE/SEI 74-23 or CEN/TS 19101, including local flange buckling, global stability and deflection with shear." },
  ];

  return (
    <>
      <JsonLd
        data={buildProductFamilyPageSchema({
          name: "Fiberglass wide flange (WF) beams",
          description: seoTarget.description,
          path: pagePath,
          image: "/images/products/i-beam/frp-i-beam-profile-200x100x10mm.webp",
          category: "Pultruded FRP Structural Profiles",
          material: ["Glass-fiber-reinforced thermoset"],
          productLine: "F1-STRUX",
          datePublished: LAST_UPDATED,
          dateModified: LAST_UPDATED,
          reviewedBy: { name: REVIEWER.name, jobTitle: REVIEWER.title, path: REVIEWER.href },
        })}
      />
      <PageHeader
        tag="WF Beam"
        line={{ name: "F1-STRUX", label: "Wide flange beam" }}
        updated={LAST_UPDATED}
        reviewer={REVIEWER}
        title="Fiberglass wide flange beams (FRP WF beams)"
        description="Pultruded fiberglass WF beams with flange width equal to depth. Compare the catalog wide flange with narrow-flange I-beams, check the standard 4 × 4 to 12 × 12 in sizes with mass and section properties, and define the columns, frames or unbraced beams you need quoted."
        facts={[
          { label: "Catalog WF", value: wideFlangeCatalogModel.replace("I ", "") + " mm" },
          { label: "Nominal range", value: "4 × 4 to 12 × 12 in" },
          { label: "Flange ratio", value: "B ≈ H" },
          { label: "Length", value: `${supplyTerms.standardLengthM} m or cut` },
        ]}
        actions={{
          primary: { label: "Request a quote", href: buildRfqHref({ source: "product-header", product: "FRP wide flange beams", productPath: pagePath }) },
          secondary: { label: "See sizes", href: "#sizes", variant: "secondary" },
          stickyMobile: true,
        }}
        figure={<ProfileFigure model={wideFlangeCatalogModel} />}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/pultruded-frp-profiles" },
          { label: "Standard Profiles", href: "/products/fiberglass-structural-shapes" },
          { label: "Wide Flange Beam" },
        ]}
      />

      <ProductPageNav
        items={[
          { id: "key-facts", label: "Key facts" },
          { id: "wf-vs-i-beam", label: "WF vs I-beam" },
          { id: "sizes", label: "Sizes" },
          { id: "when-to-use", label: "When to use" },
          { id: "design", label: "Design checks" },
          { id: "faq", label: "FAQ" },
          { id: "quote", label: "Quote" },
        ]}
      />

      <KeyFacts
        title="Fiberglass wide flange beams: key facts"
        summary="A fiberglass wide flange beam is a pultruded FRP I-section with flanges as wide as the section is deep. F1 Composite lists a 305 × 305 mm catalog WF and quotes other nominal WF sizes for columns, frames and beams that need weak-axis stiffness."
        facts={keyFacts}
      />

      <ProductSection
        id="wf-vs-i-beam"
        title="WF beam vs I-beam: what the wider flange changes"
        tone="muted"
        intro="Both rows come from the published catalog. Section properties are calculated from the nominal, sharp-cornered geometry for preliminary comparison."
      >
        {comparison.length > 0 ? (
          <div className="overflow-x-auto rounded-card border border-border-default bg-white">
            <table className="w-full min-w-[620px] border-collapse text-left text-f14 leading-golden">
              <caption className="sr-only">Catalog wide flange beam compared with a narrow-flange FRP I-beam of similar depth</caption>
              <thead>
                <tr className="border-b border-border-default bg-bg2">
                  <th scope="col" className={`${cell} font-semibold text-t1`}>Property</th>
                  <th scope="col" className={`${cell} bg-teal-bg2 font-semibold text-teal-text`}>WF {wf?.model.replace("I ", "")}</th>
                  <th scope="col" className={`${cell} font-semibold text-t1`}>I-beam {narrow?.model.replace("I ", "")}</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.label} className="border-b border-border-default last:border-b-0">
                    <th scope="row" className={`${cell} font-semibold text-t1`}>{row.label}</th>
                    <td className={`${cell} bg-teal-bg text-t1`}>{row.wf}</td>
                    <td className={`${cell} text-t2`}>{row.ib}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
        <div className="mt-[20px] grid max-w-[980px] gap-[14px] text-f16 leading-golden text-t2">
          <p>
            In this pair the wide flange is heavier per metre and also stiffer about the strong axis, but its largest gain is about the weak axis: Iy, Wy and ry rise several times. Those properties govern column buckling, lateral-torsional buckling and bending about the minor axis. Where grating, decking or cross-members brace the compression flange and the load acts in one plane, the lighter narrow-flange I-beam is often sufficient.
          </p>
          <p>
            The wider flange also has a larger outstand. Its b/2t ratio is higher, so local buckling of the compression flange needs its own check. See the <Link href="/products/fiberglass-structural-shapes/frp-i-beam" className={link}>fiberglass I-beam sizes</Link> for the narrow-flange range.
          </p>
        </div>
      </ProductSection>

      <ProductSection
        id="sizes"
        title="Fiberglass WF beam sizes"
        intro="Catalog rows carry the published mass, a datasheet and a DXF drawing. Dimensions in mm; Ix, Iy, Wx and Wy are calculated from the nominal section."
      >
        <FamilySizeTable
          rows={wideFlanges}
          caption="FRP wide flange catalog sizes, published mass and nominal section properties"
          product="FRP wide flange beam"
          productPath={pagePath}
          columns={[
            { key: "d", label: "H", unit: "mm", inches: true },
            { key: "b", label: "B", unit: "mm", inches: true },
            { key: "t", label: "t", unit: "mm" },
            { key: "mass", label: "Catalog mass", unit: "kg/m" },
            { key: "Ix", label: "Ix", unit: "cm⁴" },
            { key: "Iy", label: "Iy", unit: "cm⁴" },
            { key: "Wy", label: "Wy", unit: "cm³" },
          ]}
        />

        <h3 className="mt-[36px] text-f18 font-bold text-t1">Standard imperial WF sizes, 4 × 4 × ¼ in to 12 × 12 × ½ in</h3>
        <p className="mt-[8px] max-w-[900px] text-f14 leading-golden text-t2">
          The equal-flange depth × width × thickness series commonly listed for fiberglass WF beams in North America. Section properties are calculated from the nominal section; mass is calculated at {DENSITY} g/cm³, the E23 reference laminate density, which gives the published 21.5 kg/m of the catalog 305 × 305 mm WF. Confirm finished mass, tolerances and tooling in the quotation.
        </p>
        <div className="mt-[14px] overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[1000px] border-collapse text-left text-f14 leading-golden">
            <caption className="sr-only">Standard imperial fiberglass wide flange beam designations with calculated section properties</caption>
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                {["Designation (in)", "H × B × t (mm)", "Mass (kg/m)", "Mass (lb/ft)", "Area (cm²)", "Ix (cm⁴)", "Iy (cm⁴)", "Wx (cm³)", "rx / ry (mm)", "b/2t", "Supply route"].map((heading) => (
                  <th key={heading} scope="col" className={`${cell} whitespace-nowrap font-semibold text-t1`}>{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {nominalRows.map(({ designation, H, B, t, row, depthIn }) => (
                <tr key={designation} className="border-b border-border-default last:border-b-0">
                  <th scope="row" className={`${cell} whitespace-nowrap font-semibold text-t1`}>WF {designation}</th>
                  <td className={`${cell} whitespace-nowrap text-t2`}>{fmt(H, 1)} × {fmt(B, 1)} × {fmt(t, 2)}</td>
                  <td className={`${cell} text-t2`}>{fmt((row.A / 100) * DENSITY / 10, 1)}</td>
                  <td className={`${cell} text-t2`}>{fmt((row.A / 100) * DENSITY / 10 * KG_PER_M_TO_LB_PER_FT, 2)}</td>
                  <td className={`${cell} text-t2`}>{fmt(row.A / 100, 1)}</td>
                  <td className={`${cell} text-t2`}>{fmt(row.Ix)}</td>
                  <td className={`${cell} text-t2`}>{fmt(row.Iy)}</td>
                  <td className={`${cell} text-t2`}>{fmt(row.Wx)}</td>
                  <td className={`${cell} whitespace-nowrap text-t2`}>{fmt(row.rx)} / {fmt(row.ry)}</td>
                  <td className={`${cell} text-t2`}>{fmt(flangeOutstandRatio(B, t), 1)}</td>
                  <td className={`${cell} text-t2`}>{depthIn === 12 ? `Catalog ${wideFlangeCatalogModel.replace("I ", "")} mm` : "Made to order"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-[12px] max-w-[900px] text-f14 leading-golden text-t3">
          Planning lead times: {weeks(supplyTerms.catalogLeadTimeWeeks)} for catalog sections, {weeks(supplyTerms.existingDieVariantLeadTimeWeeks)} for an existing-die variant and {weeks(supplyTerms.newDieLeadTimeWeeks)} with a new die. Custom runs start at {supplyTerms.customMoqMeters.firstRun} m, then {supplyTerms.customMoqMeters.repeat} m for repeats.
        </p>
        <p className="mt-[10px] flex flex-wrap gap-x-[24px] gap-y-[8px] text-f14 font-semibold text-teal-text">
          <Link href="/tools/profile-finder?shape=i_beam" className="underline underline-offset-4 hover:text-teal">Compare in the profile finder</Link>
          <Link href="/tools/frp-unit-converter" className="underline underline-offset-4 hover:text-teal">Convert inch and metric sizes</Link>
          <Link href="/products/custom-pultruded-profiles" className="underline underline-offset-4 hover:text-teal">A section not listed: custom pultrusion</Link>
        </p>
      </ProductSection>

      <ProductSection id="when-to-use" title="When to specify a wide flange instead of an I-beam" tone="muted">
        <ul className="grid gap-[12px] md:grid-cols-2">
          {chooseWideFlange.map((item) => (
            <li key={item.title} className="rounded-card border border-border-default bg-white p-[20px]">
              <h3 className="text-f16 font-bold text-t1">{item.title}</h3>
              <p className="mt-[8px] text-f14 leading-golden text-t2">{item.body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-[18px] max-w-[900px] text-f16 leading-golden text-t2">
          Typical projects are <Link href="/applications/frp-chemical-plant-platforms" className={link}>chemical plant platforms</Link>, <Link href="/applications/frp-cooling-tower-profiles" className={link}>cooling tower structures</Link>, cable-tray and pipe supports, and stair towers where the WF column carries <Link href="/products/frp-gratings" className={link}>pultruded grating</Link> and <Link href="/products/frp-handrail-systems" className={link}>industrial handrail systems</Link>.
        </p>
      </ProductSection>

      <ProductSection id="design" title="Design checks for a pultruded WF member">
        <ol className="grid gap-[12px] sm:grid-cols-2 lg:grid-cols-4">
          {designChecks.map((step, index) => (
            <li key={step.title} className="rounded-card border border-border-default bg-bg2 p-[16px]">
              <span className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Check {index + 1}</span>
              <h3 className="mt-[4px] text-f16 font-bold text-t1">{step.title}</h3>
              <p className="mt-[6px] text-f14 leading-golden text-t2">{step.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-[18px] flex flex-wrap gap-x-[24px] gap-y-[8px] text-f14 font-semibold text-teal-text">
          <Link href="/tools/frp-column-calculator" className="underline underline-offset-4 hover:text-teal">FRP column buckling calculator</Link>
          <Link href="/frp-profile-calculator#shape=i-beam" className="underline underline-offset-4 hover:text-teal">Beam deflection calculator</Link>
          <Link href="/frp-span-tables#i-beam" className="underline underline-offset-4 hover:text-teal">Allowable loads by span</Link>
          <Link href="/products/frp-fasteners-fittings" className="underline underline-offset-4 hover:text-teal">FRP bolts for connections</Link>
        </p>
        <div className="mt-[36px]">
          <LaminateProperties note="Reference laminate values for preliminary work. Use the properties accepted for the proposed WF laminate and the project's design basis." />
        </div>
      </ProductSection>

      <ProductSection id="documents" title="Documents" tone="muted">
        <ProductDocuments productPaths={[pagePath, "/products/fiberglass-structural-shapes"]} family={{ label: "I-beam and wide flange", datasheetsHref: "/datasheets#i-beam" }} sizes={wideFlanges} />
      </ProductSection>

      <ProductSection id="faq" title="Wide flange beam questions">
        <div className="grid items-start gap-[12px] md:grid-cols-2">
          {faqItems.map((item) => (
            <FAQDisclosure key={item.question} question={item.question} answer={item.answer} />
          ))}
        </div>
      </ProductSection>

      <ProductSection id="related" title="Other standard profiles" tone="muted">
        <RelatedProfiles current={pagePath} />
      </ProductSection>

      <ProductSection id="quote" title="Quote fiberglass WF beams" tone="deep">
        <ProductRfq
          product="FRP wide flange beams"
          productPath={pagePath}
          intro="Send the WF size or the steel section it replaces, member lengths, loads, unbraced lengths and service conditions, with quantities and the delivery destination."
          items={[
            { title: "Section and quantity", text: "Catalog WF, nominal designation or required envelope, cut lengths and quantities." },
            { title: "Member role", text: "Column, beam or frame member, effective lengths, bracing points and deflection limit." },
            { title: "Connections", text: "Base plates, splices, hole patterns, bearing details and hardware material." },
            { title: "Material and acceptance", text: "Exposure, temperature, fire requirement, design standard and required test records." },
          ]}
          links={[{ label: "Estimate a price first", href: "/fiberglass-pultruded-profile-price" }]}
        />
      </ProductSection>
    </>
  );
}
