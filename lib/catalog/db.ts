// Catalog data layer: categories / formulations / products / downloads.
//
// Same lazy, build-safe pattern as lib/db.ts — getSql() returns null when no
// DATABASE_URL is present so `next build` never crashes, and every public
// reader falls back gracefully (the downloads page keeps its static list).
//
// DATA-INTEGRITY RULES (mirrors the datasheet anti-fabrication policy):
//  - products.weight_per_m is the VENDOR-PUBLISHED mass per metre and is
//    authoritative for display. Engine-computed mass is only a cross-check.
//  - formulation mechanical values are REAL tested data; NULL means "not yet
//    verified" and renders as "— (verify before release)" on datasheets.

import { neon } from "@neondatabase/serverless";
import type { Geometry } from "./shapes";

function getSql() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!url) return null;
  return neon(url);
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
  // single-operator back-office settings (admin password hash, etc.)
  await sql`
    CREATE TABLE IF NOT EXISTS admin_settings (
      key        TEXT PRIMARY KEY,
      value      TEXT NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  ready = true;
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

// ── readers (public + admin) ───────────────────────────────────────────────

export async function listCategories(): Promise<CategoryRow[]> {
  const sql = getSql();
  if (!sql) return [];
  await ensureCatalogTables(sql);
  return (await sql`SELECT * FROM catalog_categories ORDER BY sort, id`) as CategoryRow[];
}

export async function listFormulations(): Promise<FormulationRow[]> {
  const sql = getSql();
  if (!sql) return [];
  await ensureCatalogTables(sql);
  return (await sql`SELECT * FROM catalog_formulations ORDER BY id`) as FormulationRow[];
}

export async function listProducts(opts: { activeOnly?: boolean } = {}): Promise<ProductRow[]> {
  const sql = getSql();
  if (!sql) return [];
  await ensureCatalogTables(sql);
  const rows = opts.activeOnly
    ? await sql`SELECT * FROM catalog_products WHERE status = 'active' ORDER BY category_id, sort, id`
    : await sql`SELECT * FROM catalog_products ORDER BY category_id, sort, id`;
  return rows as ProductRow[];
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
  return rows as ProductRow[];
}

export async function listDownloads(opts: { publishedOnly?: boolean } = {}): Promise<DownloadRow[]> {
  const sql = getSql();
  if (!sql) return [];
  await ensureCatalogTables(sql);
  const rows = opts.publishedOnly
    ? await sql`SELECT * FROM catalog_downloads WHERE published ORDER BY sort, id`
    : await sql`SELECT * FROM catalog_downloads ORDER BY sort, id`;
  return rows as DownloadRow[];
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
    "standards", "applications", "tolerances", "status", "sort",
  ],
  catalog_downloads: [
    "title", "format", "size", "description", "file_url", "category", "sort", "published",
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
  const vals: unknown[] = [];
  for (const key of allowed) {
    if (!(key in values)) continue;
    let v = values[key];
    if (v === "" || v === undefined) v = null;
    if (JSONB_COLUMNS.has(key) && v != null) v = JSON.stringify(v);
    cols.push(key);
    vals.push(v);
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
    const rows = (await sql.query(
      `INSERT INTO ${table} (${colSql}) VALUES (${placeholders}) RETURNING id`,
      vals,
    )) as { id: number }[];
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
    const rows = (await sql.query(
      `UPDATE ${table} SET ${sets} WHERE id = $${cols.length + 1} RETURNING id`,
      [...vals, id],
    )) as { id: number }[];
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
    const rows = (await sql.query(`DELETE FROM ${table} WHERE id = $1 RETURNING id`, [id])) as {
      id: number;
    }[];
    return rows.length ? { ok: true } : { ok: false, error: "row not found" };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

export async function adminList(table: CatalogTable): Promise<Record<string, unknown>[]> {
  const sql = getSql();
  if (!sql) return [];
  await ensureCatalogTables(sql);
  const order = table === "catalog_products" || table === "catalog_downloads" ? "sort, id" : "id";
  return (await sql.query(`SELECT * FROM ${table} ORDER BY ${order}`, [])) as Record<
    string,
    unknown
  >[];
}
