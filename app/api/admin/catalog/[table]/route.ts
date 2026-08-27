// Generic admin CRUD for the catalog tables. Every verb requires a valid
// admin session cookie. Table names are allow-listed in lib/catalog/db.ts —
// nothing from the URL ever reaches SQL unvalidated.

import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin/auth";
import {
  adminDelete,
  adminInsert,
  adminList,
  adminUpdate,
  isCatalogTable,
} from "@/lib/catalog/db";
import { validateGeometry } from "@/lib/catalog/shapes";

type Ctx = { params: Promise<{ table: string }> };

const TABLE_ALIAS: Record<string, string> = {
  categories: "catalog_categories",
  formulations: "catalog_formulations",
  products: "catalog_products",
  downloads: "catalog_downloads",
  projects: "tradeos_projects",
  project_sections: "tradeos_project_sections",
};

function isGeometryTable(table: string) {
  return table === "catalog_products" || table === "tradeos_project_sections";
}

async function resolveTable(ctx: Ctx) {
  const { table } = await ctx.params;
  const name = TABLE_ALIAS[table];
  return name && isCatalogTable(name) ? name : null;
}

function unauthorized() {
  return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
}

function badTable() {
  return NextResponse.json({ ok: false, error: "Unknown table" }, { status: 404 });
}

export async function GET(_request: Request, ctx: Ctx) {
  if (!(await isAdminRequest())) return unauthorized();
  const table = await resolveTable(ctx);
  if (!table) return badTable();
  const rows = await adminList(table);
  return NextResponse.json({ ok: true, rows });
}

export async function POST(request: Request, ctx: Ctx) {
  if (!(await isAdminRequest())) return unauthorized();
  const table = await resolveTable(ctx);
  if (!table) return badTable();
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Bad JSON" }, { status: 400 });
  }
  if (isGeometryTable(table) && body.geometry != null) {
    const err = validateGeometry(body.geometry);
    if (err) return NextResponse.json({ ok: false, error: `geometry: ${err}` }, { status: 400 });
  }
  const result = await adminInsert(table, body);
  return NextResponse.json(result, { status: result.ok ? 200 : 400 });
}

export async function PUT(request: Request, ctx: Ctx) {
  if (!(await isAdminRequest())) return unauthorized();
  const table = await resolveTable(ctx);
  if (!table) return badTable();
  let body: { id?: unknown; values?: Record<string, unknown> };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Bad JSON" }, { status: 400 });
  }
  const id = Number(body.id);
  if (!Number.isFinite(id) || !body.values) {
    return NextResponse.json({ ok: false, error: "id and values required" }, { status: 400 });
  }
  if (isGeometryTable(table) && body.values.geometry != null) {
    const err = validateGeometry(body.values.geometry);
    if (err) return NextResponse.json({ ok: false, error: `geometry: ${err}` }, { status: 400 });
  }
  const result = await adminUpdate(table, id, body.values);
  return NextResponse.json(result, { status: result.ok ? 200 : 400 });
}

export async function DELETE(request: Request, ctx: Ctx) {
  if (!(await isAdminRequest())) return unauthorized();
  const table = await resolveTable(ctx);
  if (!table) return badTable();
  const id = Number(new URL(request.url).searchParams.get("id"));
  if (!Number.isFinite(id)) {
    return NextResponse.json({ ok: false, error: "id required" }, { status: 400 });
  }
  const result = await adminDelete(table, id);
  return NextResponse.json(result, { status: result.ok ? 200 : 400 });
}
