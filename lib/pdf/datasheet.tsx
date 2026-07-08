// Technical datasheet / catalog PDF built with @react-pdf/renderer.
//
// One A4 portrait page per product: F1 header, section drawing (SVG from the
// same geometry engine that computes the properties), dimensions, geometric
// section properties, formulation mechanical data, standards, footer.
// Multi-product requests get a cover page in front (catalog mode).
//
// ANTI-FABRICATION: geometric values (A/I/S/J, computed mass) are exact
// derivations and are labelled as calculated. Mechanical values come ONLY
// from the formulation row; missing (NULL) values render as an amber
// "— (verify before release)" and are never invented. Published weight is
// authoritative and shown as the catalog value.

import React from "react";
import {
  Document,
  Page,
  Path,
  StyleSheet,
  Svg,
  Text,
  View,
} from "@react-pdf/renderer";
import type { CategoryRow, FormulationRow, ProductRow } from "@/lib/catalog/db";
import type { SectionProperties } from "@/lib/catalog/section";
import { sig } from "@/lib/catalog/section";
import {
  buildSection,
  computeProperties,
  designation,
  dimensionRows,
} from "@/lib/catalog/shapes";

const BLUE = "#031697";
const TEAL = "#00a199";
const AMBER = "#b45309";
const INK = "#111827";
const MUTED = "#6b7280";
const LINE = "#d1d5db";
const BG = "#f3f4f6";

const styles = StyleSheet.create({
  page: {
    paddingTop: 24,
    paddingBottom: 46,
    paddingHorizontal: 32,
    fontSize: 8.5,
    fontFamily: "Helvetica",
    color: INK,
  },
  headerBar: {
    backgroundColor: BLUE,
    color: "#ffffff",
    padding: 12,
    borderRadius: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  brand: { fontSize: 13, fontFamily: "Helvetica-Bold", letterSpacing: 1 },
  docType: { fontSize: 7.5, color: "#c7d2fe", marginTop: 2 },
  model: { fontSize: 12, fontFamily: "Helvetica-Bold", textAlign: "right" },
  modelSub: { fontSize: 7.5, color: "#c7d2fe", textAlign: "right", marginTop: 2 },
  sectionTitle: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: BLUE,
    marginBottom: 4,
    marginTop: 12,
    textTransform: "uppercase",
  },
  row: { flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: LINE },
  headRow: { flexDirection: "row", backgroundColor: BG, borderBottomWidth: 0.75, borderBottomColor: BLUE },
  cellLabel: { flex: 3, padding: 3.5 },
  cellValue: { flex: 2, padding: 3.5, fontFamily: "Helvetica-Bold" },
  cellMethod: { flex: 2, padding: 3.5, color: MUTED },
  tbv: { flex: 2, padding: 3.5, color: AMBER },
  small: { fontSize: 7, color: MUTED },
  footer: {
    position: "absolute",
    bottom: 18,
    left: 32,
    right: 32,
    borderTopWidth: 0.75,
    borderTopColor: LINE,
    paddingTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 6.5,
    color: MUTED,
  },
  cover: { flex: 1, justifyContent: "center", alignItems: "center" },
});

const num = (v: unknown): number | null => {
  if (v == null) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};

// Built-in Helvetica is WinAnsi-only: ² ³ × Ø – are fine, but ⁴ ≤ ≥ ≈ − ⌀
// render as garbage. Sanitise every free-text string that reaches the PDF.
const pdfSafe = (s: string | null | undefined): string => {
  if (!s) return "";
  return s
    .replace(/⁴/g, "^4")
    .replace(/≤/g, "<=")
    .replace(/≥/g, ">=")
    .replace(/≈/g, "~")
    .replace(/⌀/g, "Ø")
    .replace(/−/g, "-");
};

// ── section drawing ─────────────────────────────────────────────────────────

function ringToPath(ring: readonly (readonly [number, number])[]): string {
  return (
    ring.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`).join(" ") +
    " Z"
  );
}

function SectionSvg({ product, size }: { product: ProductRow; size: number }) {
  if (!product.geometry) return null;
  const section = buildSection(product.geometry);
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const [x, y] of section.outer) {
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  }
  const w = maxX - minX;
  const h = maxY - minY;
  const pad = Math.max(w, h) * 0.08;
  const scale = size / (Math.max(w, h) + 2 * pad);
  // map drawing coords (y-up) → pdf svg coords (y-down), centred in the box
  const tx = (x: number) => (x - (minX + maxX) / 2) * scale + size / 2;
  const ty = (y: number) => size / 2 - (y - (minY + maxY) / 2) * scale;
  const mapRing = (ring: readonly (readonly [number, number])[]) =>
    ring.map(([x, y]) => [tx(x), ty(y)] as const);

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Path
        d={ringToPath(mapRing(section.outer))}
        fill="#e0e7ff"
        stroke={BLUE}
        strokeWidth={1}
      />
      {(section.holes ?? []).map((hole, i) => (
        <Path
          key={i}
          d={ringToPath(mapRing(hole))}
          fill="#ffffff"
          stroke={BLUE}
          strokeWidth={0.8}
        />
      ))}
    </Svg>
  );
}

// ── datasheet page ──────────────────────────────────────────────────────────

interface MechRow {
  label: string;
  value: number | null;
  unit: string;
  method: string;
  format?: (v: number) => string;
}

function mechRows(f: FormulationRow | null): MechRow[] {
  const g = (k: keyof FormulationRow) => (f ? num(f[k]) : null);
  return [
    { label: "Tensile modulus E_L (longitudinal)", value: g("e_l_gpa"), unit: "GPa", method: "EN ISO 527-4" },
    { label: "Transverse tensile modulus E_T", value: g("e_t_gpa"), unit: "GPa", method: "EN ISO 527-4" },
    { label: "Tensile strength (longitudinal)", value: g("tensile_l_mpa"), unit: "MPa", method: "EN ISO 527-4" },
    { label: "Tensile strength (transverse)", value: g("tensile_t_mpa"), unit: "MPa", method: "EN ISO 527-4" },
    { label: "Flexural strength (longitudinal)", value: g("flexural_l_mpa"), unit: "MPa", method: "EN ISO 14125" },
    { label: "Flexural strength (transverse)", value: g("flexural_t_mpa"), unit: "MPa", method: "EN ISO 14125" },
    { label: "Interlaminar shear strength (ILSS)", value: g("shear_mpa"), unit: "MPa", method: "EN ISO 14130" },
    { label: "Pin-bearing strength (longitudinal)", value: g("pin_bearing_l_mpa"), unit: "MPa", method: "EN 13706-2 Annex D" },
    { label: "Pin-bearing strength (transverse)", value: g("pin_bearing_t_mpa"), unit: "MPa", method: "EN 13706-2 Annex D" },
    { label: "Compressive strength (longitudinal)", value: g("compressive_l_mpa"), unit: "MPa", method: "EN ISO 604" },
    { label: "Barcol hardness", value: g("barcol"), unit: "", method: "ASTM D2583" },
    { label: "Water absorption (24 h)", value: g("water_abs_pct"), unit: "%", method: "EN ISO 62" },
  ];
}

function propRows(p: SectionProperties) {
  // "cm^4" not "cm⁴": built-in Helvetica has ² and ³ glyphs but not ⁴.
  return [
    { label: "Cross-section area A", value: `${sig(p.A)} mm²` },
    { label: "Moment of inertia Ix", value: `${sig(p.Ix / 1e4)} cm^4` },
    { label: "Moment of inertia Iy", value: `${sig(p.Iy / 1e4)} cm^4` },
    { label: "Section modulus Sx", value: `${sig(p.Sx / 1e3)} cm³` },
    { label: "Section modulus Sy", value: `${sig(p.Sy / 1e3)} cm³` },
    { label: "Radius of gyration rx", value: `${sig(p.rx)} mm` },
    { label: "Radius of gyration ry", value: `${sig(p.ry)} mm` },
    { label: "Torsion constant J", value: p.J == null ? "—" : `${sig(p.J / 1e4)} cm^4` },
  ];
}

function Footer({ docId }: { docId: string }) {
  return (
    <View style={styles.footer} fixed>
      <Text>F1 Composite · Chongqing F1 Composites Co., Ltd. · www.f1composite.com · inquiry@f1composite.com</Text>
      <Text
        render={({ pageNumber, totalPages }) => `${docId} · Page ${pageNumber} / ${totalPages}`}
      />
    </View>
  );
}

function ProductPage({
  product,
  formulation,
  category,
  docId,
  generated,
}: {
  product: ProductRow;
  formulation: FormulationRow | null;
  category: CategoryRow | null;
  docId: string;
  generated: string;
}) {
  const density = formulation ? num(formulation.density_g_cm3) : null;
  const props = product.geometry
    ? computeProperties(product.geometry, density ? density * 1000 : undefined)
    : null;
  const desig = product.geometry ? designation(product.geometry) : null;
  const dims = product.geometry ? dimensionRows(product.geometry) : [];
  const publishedW = num(product.weight_per_m);
  const mech = mechRows(formulation);
  // product.standards is written for the product's default formulation (e.g.
  // "EN 13706 Grade E23") — hide it on compare pages rendered with a different
  // resin system so the page never carries two conflicting grade claims; the
  // formulation's own grade is printed under the mechanical table.
  const isDefaultFormulation =
    !formulation || product.formulation_id == null || formulation.id === product.formulation_id;

  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.headerBar}>
        <View>
          <Text style={styles.brand}>F1 COMPOSITE</Text>
          <Text style={styles.docType}>TECHNICAL DATA SHEET · PULTRUDED FRP PROFILE</Text>
        </View>
        <View>
          <Text style={styles.model}>{pdfSafe(product.model)}</Text>
          <Text style={styles.modelSub}>
            {pdfSafe(
              [product.name, category?.name, formulation?.code].filter(Boolean).join(" · "),
            ) || "Pultruded FRP profile"}
          </Text>
        </View>
      </View>

      {/* drawing + dimensions + section properties */}
      <View style={{ flexDirection: "row", marginTop: 12, gap: 14 }}>
        <View style={{ width: 170 }}>
          <Text style={styles.sectionTitle}>Cross-Section</Text>
          <View style={{ borderWidth: 0.75, borderColor: LINE, borderRadius: 3, padding: 6, alignItems: "center" }}>
            {props ? (
              <SectionSvg product={product} size={150} />
            ) : (
              <Text style={styles.small}>No geometry on record</Text>
            )}
            {desig ? <Text style={{ marginTop: 4, fontFamily: "Helvetica-Bold" }}>{pdfSafe(desig)}</Text> : null}
          </View>
          {dims.length > 0 && (
            <View style={{ marginTop: 6 }}>
              {dims.map((d) => (
                <View key={d.symbol} style={styles.row}>
                  <Text style={styles.cellLabel}>{d.label} ({d.symbol})</Text>
                  <Text style={styles.cellValue}>{d.value} mm</Text>
                </View>
              ))}
              {publishedW != null && (
                <View style={styles.row}>
                  <Text style={styles.cellLabel}>Published weight</Text>
                  <Text style={[styles.cellValue, { color: TEAL }]}>{publishedW} kg/m</Text>
                </View>
              )}
            </View>
          )}
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.sectionTitle}>Section Properties (calculated)</Text>
          {props ? (
            <View>
              {propRows(props).map((r) => (
                <View key={r.label} style={styles.row}>
                  <Text style={styles.cellLabel}>{r.label}</Text>
                  <Text style={styles.cellValue}>{r.value}</Text>
                </View>
              ))}
              {props.massPerMetre != null && (
                <View style={styles.row}>
                  <Text style={styles.cellLabel}>Mass per metre (calculated)</Text>
                  <Text style={styles.cellValue}>{sig(props.massPerMetre, 3)} kg/m</Text>
                </View>
              )}
              <Text style={[styles.small, { marginTop: 4 }]}>
                Derived exactly from the cross-section geometry. Published mass per metre is the
                authoritative catalog value; the calculated figure is a geometric cross-check.
              </Text>
            </View>
          ) : (
            <Text style={styles.small}>Geometry pending — contact engineering.</Text>
          )}
        </View>
      </View>

      {/* mechanical properties */}
      <Text style={styles.sectionTitle}>
        Mechanical & Physical Properties{formulation ? pdfSafe(` — ${formulation.name} (${formulation.code})`) : ""}
      </Text>
      <View style={styles.headRow}>
        <Text style={[styles.cellLabel, { fontFamily: "Helvetica-Bold" }]}>Property</Text>
        <Text style={[styles.cellValue]}>Value</Text>
        <Text style={[styles.cellMethod, { fontFamily: "Helvetica-Bold" }]}>Test method</Text>
      </View>
      {mech.map((r) => (
        <View key={r.label} style={styles.row}>
          <Text style={styles.cellLabel}>{r.label}</Text>
          {r.value == null ? (
            <Text style={styles.tbv}>— (verify before release)</Text>
          ) : (
            <Text style={styles.cellValue}>
              {r.value}
              {r.unit ? ` ${r.unit}` : ""}
            </Text>
          )}
          <Text style={styles.cellMethod}>{r.method}</Text>
        </View>
      ))}
      {formulation && (
        <View style={{ flexDirection: "row", marginTop: 6, gap: 14 }}>
          <Text style={styles.small}>Resin: {pdfSafe(formulation.resin) || "—"}</Text>
          <Text style={styles.small}>Glass content: {pdfSafe(formulation.glass_content) || "—"}</Text>
          <Text style={styles.small}>
            Density: {num(formulation.density_g_cm3) != null ? `${num(formulation.density_g_cm3)} g/cm³` : "—"}
          </Text>
          <Text style={styles.small}>Grade: {pdfSafe(formulation.en13706_grade) || "—"}</Text>
          <Text style={styles.small}>Fire: {pdfSafe(formulation.fire_rating) || "—"}</Text>
        </View>
      )}

      {/* standards & applications */}
      {((product.standards && isDefaultFormulation) || product.applications || product.tolerances) && (
        <View>
          <Text style={styles.sectionTitle}>Standards, Tolerances & Applications</Text>
          {product.standards && isDefaultFormulation ? (
            <Text style={{ marginBottom: 3 }}>Standards: {pdfSafe(product.standards)}</Text>
          ) : null}
          {product.tolerances ? (
            <Text style={{ marginBottom: 3 }}>Tolerances: {pdfSafe(product.tolerances)}</Text>
          ) : null}
          {product.applications ? (
            <Text>Typical applications: {pdfSafe(product.applications)}</Text>
          ) : null}
        </View>
      )}

      <Text style={[styles.small, { marginTop: 10 }]}>
        Generated {generated}. Values marked &quot;verify before release&quot; are pending test verification —
        request certified data before final design. This datasheet does not replace project-specific
        engineering; deflection usually governs FRP design (E ~ 1/10 of steel).
      </Text>

      <Footer docId={docId} />
    </Page>
  );
}

// ── document ────────────────────────────────────────────────────────────────

/** One rendered page: a cross-section paired with the resin system whose
 *  mechanical dataset it is presented with. The same product may appear on
 *  several pages when the customer compares formulations. */
export interface DatasheetPage {
  product: ProductRow;
  formulation: FormulationRow | null;
}

export interface DatasheetData {
  pages: DatasheetPage[];
  categories: Map<number, CategoryRow>;
}

export function DatasheetDocument({ data }: { data: DatasheetData }) {
  const now = new Date();
  const generated = now.toISOString().slice(0, 10);
  const docId = `F1-TDS-${generated.replace(/-/g, "")}`;
  const multi = data.pages.length > 1;

  // cover summaries: pages per category + distinct resin systems compared
  const byCat = new Map<string, number>();
  const productIds = new Set<number>();
  const formulationNames = new Map<string, string>();
  for (const { product: p, formulation: f } of data.pages) {
    const name = (p.category_id != null && data.categories.get(p.category_id)?.name) || "Uncategorised";
    byCat.set(name, (byCat.get(name) ?? 0) + 1);
    productIds.add(p.id);
    if (f) formulationNames.set(f.code, f.name);
  }
  const first = data.pages[0];

  return (
    <Document
      title={
        multi
          ? "F1 Composite — Product Catalog Extract"
          : `F1 Composite — ${first?.product.model ?? "Datasheet"}${first?.formulation ? ` (${first.formulation.code})` : ""}`
      }
      author="F1 Composite"
    >
      {multi && (
        <Page size="A4" style={styles.page}>
          <View style={styles.cover}>
            <Text style={{ fontSize: 24, fontFamily: "Helvetica-Bold", color: BLUE }}>
              F1 COMPOSITE
            </Text>
            <Text style={{ fontSize: 12, color: MUTED, marginTop: 6 }}>
              Pultruded FRP Profiles — Technical Catalog Extract
            </Text>
            <View style={{ marginTop: 28, width: 300 }}>
              {[...byCat.entries()].map(([name, count]) => (
                <View key={name} style={styles.row}>
                  <Text style={styles.cellLabel}>{name}</Text>
                  <Text style={styles.cellValue}>
                    {count} page{count > 1 ? "s" : ""}
                  </Text>
                </View>
              ))}
              <View style={styles.row}>
                <Text style={[styles.cellLabel, { fontFamily: "Helvetica-Bold" }]}>Total</Text>
                <Text style={[styles.cellValue, { color: TEAL }]}>
                  {productIds.size} product{productIds.size > 1 ? "s" : ""} · {data.pages.length} page{data.pages.length > 1 ? "s" : ""}
                </Text>
              </View>
            </View>
            {formulationNames.size > 1 && (
              <View style={{ marginTop: 18, width: 300 }}>
                <Text style={[styles.small, { fontFamily: "Helvetica-Bold", marginBottom: 3 }]}>
                  Resin systems compared
                </Text>
                {[...formulationNames.entries()].map(([code, name]) => (
                  <Text key={code} style={styles.small}>
                    {pdfSafe(code)} — {pdfSafe(name)}
                  </Text>
                ))}
              </View>
            )}
            <Text style={[styles.small, { marginTop: 28 }]}>
              Generated {generated} · {docId} · www.f1composite.com
            </Text>
          </View>
          <Footer docId={docId} />
        </Page>
      )}
      {data.pages.map(({ product: p, formulation: f }) => (
        <ProductPage
          key={`${p.id}-${f?.id ?? "default"}`}
          product={p}
          formulation={f}
          category={(p.category_id != null && data.categories.get(p.category_id)) || null}
          docId={docId}
          generated={generated}
        />
      ))}
    </Document>
  );
}
