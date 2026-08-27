// Catalog data layer: categories / formulations / products / downloads.
//
// Same lazy, build-safe pattern as lib/db.ts — getSql() returns null when no
// DATABASE_URL is present so `next build` never crashes, and every public
// reader falls back gracefully (the downloads page keeps its static list).
//
// DATA-INTEGRITY RULES (mirrors the datasheet anti-fabrication policy):
//  - products.weight_per_m is the VENDOR-PUBLISHED mass per meter and is
//    authoritative for display. Engine-computed mass is only a cross-check.
//  - formulation mechanical values are REAL tested data; NULL means "not yet
//    verified" and renders as "— (verify before release)" on datasheets.

import postgres from "postgres";
import type { Geometry } from "./shapes";
import { SEP0043_PROJECT, SEP0043_SECTIONS } from "@/lib/tradeos/sep0043";

function getSql() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!url) return null;
  return postgres(url);
}

export function catalogDbConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL || process.env.POSTGRES_URL);
}

let ready = false;
export async function ensureCatalogTables(sqlIn?: NonNullable<ReturnType<typeof getSql>>) {
  const sql = sqlIn ?? getSql();
  if (!sql || ready) return;
  await sql`
    CREATE TABLE IF NOT EXISTS catalog_categories (
      id          BIGSERIAL PRIMARY KEY,
      slug        TEXT NOT NULL UNIQUE,
      name        TEXT NOT NULL,
      description TEXT,
      sort        INT NOT NULL DEFAULT 0
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS catalog_formulations (
      id                BIGSERIAL PRIMARY KEY,
      code              TEXT NOT NULL UNIQUE,
      name              TEXT NOT NULL,
      resin             TEXT,
      glass_content     TEXT,
      density_g_cm3     NUMERIC,
      en13706_grade     TEXT,
      fire_rating       TEXT,
      e_l_gpa           NUMERIC,
      e_t_gpa           NUMERIC,
      tensile_l_mpa     NUMERIC,
      tensile_t_mpa     NUMERIC,
      flexural_l_mpa    NUMERIC,
      flexural_t_mpa    NUMERIC,
      shear_mpa         NUMERIC,
      compressive_l_mpa NUMERIC,
      barcol            NUMERIC,
      water_abs_pct     NUMERIC,
      notes             TEXT,
      created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS catalog_products (
      id             BIGSERIAL PRIMARY KEY,
      model          TEXT NOT NULL UNIQUE,
      name           TEXT,
      category_id    BIGINT REFERENCES catalog_categories(id) ON DELETE SET NULL,
      formulation_id BIGINT REFERENCES catalog_formulations(id) ON DELETE SET NULL,
      geometry       JSONB,
      weight_per_m   NUMERIC,
      standards      TEXT,
      applications   TEXT,
      tolerances     TEXT,
      status         TEXT NOT NULL DEFAULT 'active',
      sort           INT NOT NULL DEFAULT 0,
      created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS catalog_downloads (
      id          BIGSERIAL PRIMARY KEY,
      title       TEXT NOT NULL,
      format      TEXT NOT NULL DEFAULT 'PDF',
      size        TEXT,
      description TEXT,
      file_url    TEXT,
      category    TEXT,
      sort        INT NOT NULL DEFAULT 0,
      published   BOOLEAN NOT NULL DEFAULT true,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  // additive migrations (idempotent)
  await sql`ALTER TABLE catalog_formulations ADD COLUMN IF NOT EXISTS resin_family      TEXT`;
  await sql`ALTER TABLE catalog_formulations ADD COLUMN IF NOT EXISTS pin_bearing_l_mpa NUMERIC`;
  await sql`ALTER TABLE catalog_formulations ADD COLUMN IF NOT EXISTS pin_bearing_t_mpa NUMERIC`;
  await sql`ALTER TABLE catalog_products ADD COLUMN IF NOT EXISTS base_section_code  TEXT`;
  await sql`ALTER TABLE catalog_products ADD COLUMN IF NOT EXISTS global_designation TEXT`;
  await sql`ALTER TABLE catalog_products ADD COLUMN IF NOT EXISTS en_shape_code       TEXT`;
  await sql`
    CREATE TABLE IF NOT EXISTS tradeos_projects (
      id                        BIGSERIAL PRIMARY KEY,
      project_ref               TEXT NOT NULL UNIQUE,
      customer                  TEXT NOT NULL,
      title                     TEXT NOT NULL,
      annual_volume_m           NUMERIC,
      cut_length_min_mm         NUMERIC,
      cut_length_max_mm         NUMERIC,
      quote_currency            TEXT,
      source_document           TEXT,
      price_scope               TEXT,
      finishing_requirement     TEXT,
      environmental_requirement TEXT,
      fst_requirement           TEXT,
      grade_requirement         TEXT,
      status                    TEXT NOT NULL DEFAULT 'scoping',
      notes                     TEXT,
      created_at                TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at                TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS tradeos_project_sections (
      id                         BIGSERIAL PRIMARY KEY,
      project_ref                TEXT NOT NULL REFERENCES tradeos_projects(project_ref) ON UPDATE CASCADE ON DELETE RESTRICT,
      line_no                    INT NOT NULL,
      project_item_ref           TEXT NOT NULL UNIQUE,
      source_designation         TEXT NOT NULL,
      global_designation         TEXT NOT NULL,
      base_section_code          TEXT NOT NULL,
      shape_code                 TEXT NOT NULL,
      en_shape_code              TEXT NOT NULL,
      section_family             TEXT,
      geometry                   JSONB,
      geometry_status            TEXT NOT NULL DEFAULT 'drawing_required',
      catalog_match              TEXT,
      pricing_requested          BOOLEAN NOT NULL DEFAULT false,
      grade_options              TEXT,
      resin_type_options         TEXT,
      resin_property_options     TEXT,
      additional_process_options TEXT,
      measured_weight_kg_m       NUMERIC,
      tooling_route              TEXT NOT NULL DEFAULT 'to_assess',
      tooling_cost_gbp           NUMERIC,
      tooling_lead_weeks         NUMERIC,
      indicative_price_gbp_m     NUMERIC,
      machining                  TEXT,
      status                     TEXT NOT NULL DEFAULT 'candidate',
      notes                      TEXT,
      created_at                 TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at                 TIMESTAMPTZ NOT NULL DEFAULT now(),
      UNIQUE(project_ref, line_no)
    )
  `;
  // single-operator back-office settings (admin password hash, etc.)
  await sql`
    CREATE TABLE IF NOT EXISTS admin_settings (
      key        TEXT PRIMARY KEY,
      value      TEXT NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  await seedSep0043Project(sql);
  ready = true;
}

async function seedSep0043Project(sql: NonNullable<ReturnType<typeof getSql>>) {
  const p = SEP0043_PROJECT;
  await sql`
    INSERT INTO tradeos_projects
      (project_ref, customer, title, annual_volume_m, cut_length_min_mm, cut_length_max_mm,
       quote_currency, source_document, price_scope, finishing_requirement,
       environmental_requirement, fst_requirement, grade_requirement, status, notes)
    VALUES
      (${p.project_ref}, ${p.customer}, ${p.title}, ${p.annual_volume_m}, ${p.cut_length_min_mm},
       ${p.cut_length_max_mm}, ${p.quote_currency}, ${p.source_document}, ${p.price_scope},
       ${p.finishing_requirement}, ${p.environmental_requirement}, ${p.fst_requirement},
       ${p.grade_requirement}, ${p.status}, ${p.notes})
    ON CONFLICT (project_ref) DO UPDATE SET
      customer = EXCLUDED.customer,
      title = EXCLUDED.title,
      annual_volume_m = EXCLUDED.annual_volume_m,
      cut_length_min_mm = EXCLUDED.cut_length_min_mm,
      cut_length_max_mm = EXCLUDED.cut_length_max_mm,
      quote_currency = EXCLUDED.quote_currency,
      source_document = EXCLUDED.source_document,
      price_scope = EXCLUDED.price_scope,
      finishing_requirement = EXCLUDED.finishing_requirement,
      environmental_requirement = EXCLUDED.environmental_requirement,
      fst_requirement = EXCLUDED.fst_requirement,
      grade_requirement = EXCLUDED.grade_requirement,
      updated_at = now()
  `;

  for (const s of SEP0043_SECTIONS) {
    await sql`
      INSERT INTO tradeos_project_sections
        (project_ref, line_no, project_item_ref, source_designation, global_designation,
         base_section_code, shape_code, en_shape_code, section_family, geometry,
         geometry_status, catalog_match, pricing_requested, grade_options,
         resin_type_options, resin_property_options, additional_process_options,
         tooling_route, status, notes)
      VALUES
        (${s.project_ref}, ${s.line_no}, ${s.project_item_ref}, ${s.source_designation},
         ${s.global_designation}, ${s.base_section_code}, ${s.shape_code}, ${s.en_shape_code},
         ${s.section_family}, ${s.geometry == null ? null : JSON.stringify(s.geometry)}::jsonb,
         ${s.geometry_status}, ${s.catalog_match}, ${s.pricing_requested}, ${s.grade_options},
         ${s.resin_type_options}, ${s.resin_property_options}, ${s.additional_process_options},
         ${s.tooling_route}, ${s.status}, ${s.notes})
      ON CONFLICT (project_ref, line_no) DO UPDATE SET
        project_item_ref = EXCLUDED.project_item_ref,
        source_designation = EXCLUDED.source_designation,
        global_designation = EXCLUDED.global_designation,
        base_section_code = EXCLUDED.base_section_code,
        shape_code = EXCLUDED.shape_code,
        en_shape_code = EXCLUDED.en_shape_code,
        section_family = EXCLUDED.section_family,
        geometry = EXCLUDED.geometry,
        geometry_status = EXCLUDED.geometry_status,
        catalog_match = EXCLUDED.catalog_match,
        pricing_requested = EXCLUDED.pricing_requested,
        grade_options = EXCLUDED.grade_options,
        resin_type_options = EXCLUDED.resin_type_options,
        resin_property_options = EXCLUDED.resin_property_options,
        additional_process_options = EXCLUDED.additional_process_options,
        updated_at = now()
    `;
  }
}

// ── admin settings (key/value) ──────────────────────────────────────────────

export async function getAdminSetting(key: string): Promise<string | null> {
  const sql = getSql();
  if (!sql) return null;
  await ensureCatalogTables(sql);
  const rows = (await sql`SELECT value FROM admin_settings WHERE key = ${key}`) as {
    value: string;
  }[];
  return rows[0]?.value ?? null;
}

export async function setAdminSetting(key: string, value: string): Promise<boolean> {
  const sql = getSql();
  if (!sql) return false;
  await ensureCatalogTables(sql);
  await sql`
    INSERT INTO admin_settings (key, value) VALUES (${key}, ${value})
    ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()
  `;
  return true;
}

// ── row types ───────────────────────────────────────────────────────────────

export interface CategoryRow {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  sort: number;
}

export interface FormulationRow {
  id: number;
  code: string;
  name: string;
  resin: string | null;
  /** unsaturated_polyester | vinyl_ester | epoxy | polyurethane | phenolic */
  resin_family: string | null;
  glass_content: string | null;
  density_g_cm3: number | null;
  en13706_grade: string | null;
  fire_rating: string | null;
  e_l_gpa: number | null;
  e_t_gpa: number | null;
  tensile_l_mpa: number | null;
  tensile_t_mpa: number | null;
  flexural_l_mpa: number | null;
  flexural_t_mpa: number | null;
  shear_mpa: number | null;
  compressive_l_mpa: number | null;
  pin_bearing_l_mpa: number | null;
  pin_bearing_t_mpa: number | null;
  barcol: number | null;
  water_abs_pct: number | null;
  notes: string | null;
}

export interface ProductRow {
  id: number;
  model: string;
  name: string | null;
  category_id: number | null;
  formulation_id: number | null;
  geometry: Geometry | null;
  base_section_code?: string | null;
  global_designation?: string | null;
  en_shape_code?: string | null;
  weight_per_m: number | null;
  standards: string | null;
  applications: string | null;
  tolerances: string | null;
  status: string;
  sort: number;
  created_at?: string;
  updated_at?: string;
}

export interface DownloadRow {
  id: number;
  title: string;
  format: string;
  size: string | null;
  description: string | null;
  file_url: string | null;
  category: string | null;
  sort: number;
  published: boolean;
}

export interface TradeOsProjectRow {
  id: number;
  project_ref: string;
  customer: string;
  title: string;
  annual_volume_m: number | null;
  cut_length_min_mm: number | null;
  cut_length_max_mm: number | null;
  quote_currency: string | null;
  source_document: string | null;
  price_scope: string | null;
  finishing_requirement: string | null;
  environmental_requirement: string | null;
  fst_requirement: string | null;
  grade_requirement: string | null;
  status: string;
  notes: string | null;
}

export interface TradeOsProjectSectionRow {
  id: number;
  project_ref: string;
  line_no: number;
  project_item_ref: string;
  source_designation: string;
  global_designation: string;
  base_section_code: string;
  shape_code: string;
  en_shape_code: string;
  section_family: string | null;
  geometry: Geometry | null;
  geometry_status: string;
  catalog_match: string | null;
  pricing_requested: boolean;
  grade_options: string | null;
  resin_type_options: string | null;
  resin_property_options: string | null;
  additional_process_options: string | null;
  measured_weight_kg_m: number | null;
  tooling_route: string;
  tooling_cost_gbp: number | null;
  tooling_lead_weeks: number | null;
  indicative_price_gbp_m: number | null;
  machining: string | null;
  status: string;
  notes: string | null;
}

// ── readers (public + admin) ───────────────────────────────────────────────

export async function listCategories(): Promise<CategoryRow[]> {
  const sql = getSql();
  if (!sql) return [];
  await ensureCatalogTables(sql);
  return (await sql`SELECT * FROM catalog_categories ORDER BY sort, id`) as unknown as CategoryRow[];
}

export async function listFormulations(): Promise<FormulationRow[]> {
  const sql = getSql();
  if (!sql) return [];
  await ensureCatalogTables(sql);
  return (await sql`SELECT * FROM catalog_formulations ORDER BY id`) as unknown as FormulationRow[];
}

export async function listProducts(opts: { activeOnly?: boolean } = {}): Promise<ProductRow[]> {
  const sql = getSql();
  if (!sql) return [];
  await ensureCatalogTables(sql);
  const rows = opts.activeOnly
    ? await sql`SELECT * FROM catalog_products WHERE status = 'active' ORDER BY category_id, sort, id`
    : await sql`SELECT * FROM catalog_products ORDER BY category_id, sort, id`;
  return rows as unknown as ProductRow[];
}

export async function getProductsByIds(ids: number[]): Promise<ProductRow[]> {
  const sql = getSql();
  if (!sql || ids.length === 0) return [];
  await ensureCatalogTables(sql);
  const rows = await sql`
    SELECT * FROM catalog_products
    WHERE id = ANY(${ids}) AND status = 'active'
    ORDER BY category_id, sort, id
  `;
  return rows as unknown as ProductRow[];
}

export async function listDownloads(opts: { publishedOnly?: boolean } = {}): Promise<DownloadRow[]> {
  const sql = getSql();
  if (!sql) return [];
  await ensureCatalogTables(sql);
  const rows = opts.publishedOnly
    ? await sql`SELECT * FROM catalog_downloads WHERE published ORDER BY sort, id`
    : await sql`SELECT * FROM catalog_downloads ORDER BY sort, id`;
  return rows as unknown as DownloadRow[];
}

// ── generic admin CRUD ──────────────────────────────────────────────────────
//
// Each table gets an allow-listed column set; values arrive as a plain object
// from the admin API. Unknown keys are rejected (never interpolated into SQL —
// column names are matched against the allow-list and only then inlined).

const TABLE_COLUMNS: Record<string, string[]> = {
  catalog_categories: ["slug", "name", "description", "sort"],
  catalog_formulations: [
    "code", "name", "resin", "resin_family", "glass_content", "density_g_cm3",
    "en13706_grade", "fire_rating", "e_l_gpa", "e_t_gpa", "tensile_l_mpa",
    "tensile_t_mpa", "flexural_l_mpa", "flexural_t_mpa", "shear_mpa",
    "compressive_l_mpa", "pin_bearing_l_mpa", "pin_bearing_t_mpa",
    "barcol", "water_abs_pct", "notes",
  ],
  catalog_products: [
    "model", "name", "category_id", "formulation_id", "geometry", "weight_per_m",
    "base_section_code", "global_designation", "en_shape_code",
    "standards", "applications", "tolerances", "status", "sort",
  ],
  catalog_downloads: [
    "title", "format", "size", "description", "file_url", "category", "sort", "published",
  ],
  tradeos_projects: [
    "project_ref", "customer", "title", "annual_volume_m", "cut_length_min_mm",
    "cut_length_max_mm", "quote_currency", "source_document", "price_scope",
    "finishing_requirement", "environmental_requirement", "fst_requirement",
    "grade_requirement", "status", "notes",
  ],
  tradeos_project_sections: [
    "project_ref", "line_no", "project_item_ref", "source_designation",
    "global_designation", "base_section_code", "shape_code", "en_shape_code",
    "section_family", "geometry", "geometry_status", "catalog_match",
    "pricing_requested", "grade_options", "resin_type_options",
    "resin_property_options", "additional_process_options", "measured_weight_kg_m",
    "tooling_route", "tooling_cost_gbp", "tooling_lead_weeks",
    "indicative_price_gbp_m", "machining", "status", "notes",
  ],
};

export type CatalogTable = keyof typeof TABLE_COLUMNS;

export function isCatalogTable(t: string): t is CatalogTable {
  return t in TABLE_COLUMNS;
}

const JSONB_COLUMNS = new Set(["geometry"]);

function pickColumns(table: CatalogTable, values: Record<string, unknown>) {
  const allowed = TABLE_COLUMNS[table];
  const cols: string[] = [];
  const vals: postgres.SerializableParameter[] = [];
  for (const key of allowed) {
    if (!(key in values)) continue;
    let v = values[key];
    if (v === "" || v === undefined) v = null;
    if (JSONB_COLUMNS.has(key) && v != null) v = JSON.stringify(v);
    cols.push(key);
    vals.push(v as postgres.SerializableParameter);
  }
  return { cols, vals };
}

export async function adminInsert(
  table: CatalogTable,
  values: Record<string, unknown>,
): Promise<{ ok: boolean; id?: number; error?: string }> {
  const sql = getSql();
  if (!sql) return { ok: false, error: "DB not configured" };
  await ensureCatalogTables(sql);
  const { cols, vals } = pickColumns(table, values);
  if (cols.length === 0) return { ok: false, error: "no valid columns" };
  const colSql = cols.map((c) => `"${c}"`).join(", ");
  const placeholders = cols
    .map((c, i) => (JSONB_COLUMNS.has(c) ? `$${i + 1}::jsonb` : `$${i + 1}`))
    .join(", ");
  try {
    const rows = await sql.unsafe<{ id: number }[]>(
      `INSERT INTO ${table} (${colSql}) VALUES (${placeholders}) RETURNING id`,
      vals,
    );
    return { ok: true, id: rows[0].id };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

export async function adminUpdate(
  table: CatalogTable,
  id: number,
  values: Record<string, unknown>,
): Promise<{ ok: boolean; error?: string }> {
  const sql = getSql();
  if (!sql) return { ok: false, error: "DB not configured" };
  await ensureCatalogTables(sql);
  const { cols, vals } = pickColumns(table, values);
  if (cols.length === 0) return { ok: false, error: "no valid columns" };
  const hasUpdatedAt = table !== "catalog_categories";
  const sets = cols
    .map((c, i) => (JSONB_COLUMNS.has(c) ? `"${c}" = $${i + 1}::jsonb` : `"${c}" = $${i + 1}`))
    .concat(hasUpdatedAt ? ["updated_at = now()"] : [])
    .join(", ");
  try {
    const rows = await sql.unsafe<{ id: number }[]>(
      `UPDATE ${table} SET ${sets} WHERE id = $${cols.length + 1} RETURNING id`,
      [...vals, id],
    );
    return rows.length ? { ok: true } : { ok: false, error: "row not found" };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

export async function adminDelete(
  table: CatalogTable,
  id: number,
): Promise<{ ok: boolean; error?: string }> {
  const sql = getSql();
  if (!sql) return { ok: false, error: "DB not configured" };
  await ensureCatalogTables(sql);
  try {
    const rows = await sql.unsafe<{ id: number }[]>(
      `DELETE FROM ${table} WHERE id = $1 RETURNING id`,
      [id],
    );
    return rows.length ? { ok: true } : { ok: false, error: "row not found" };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

export async function adminList(table: CatalogTable): Promise<Record<string, unknown>[]> {
  const sql = getSql();
  if (!sql) return [];
  await ensureCatalogTables(sql);
  const order = table === "catalog_products" || table === "catalog_downloads"
    ? "sort, id"
    : table === "tradeos_projects"
      ? "project_ref, id"
      : table === "tradeos_project_sections"
        ? "project_ref, line_no, id"
        : "id";
  return sql.unsafe<Record<string, unknown>[]>(`SELECT * FROM ${table} ORDER BY ${order}`, []);
}
