// POST /api/admin/seed — run the idempotent catalog seed on Vercel, where the
// self-hosted PostgreSQL integration's sensitive env vars are available (they cannot be pulled
// to a local machine). Admin session required.

import { NextResponse } from "next/server";
import postgres from "postgres";
import { isAdminRequest } from "@/lib/admin/auth";
import { runCatalogSeed } from "@/lib/catalog/seed";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

export async function POST() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!url) {
    return NextResponse.json({ ok: false, error: "DB not configured" }, { status: 503 });
  }
  try {
    const result = await runCatalogSeed(postgres(url));
    return NextResponse.json({ ok: true, ...result });
  } catch (e) {
    console.error("[seed] failed:", e);
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "seed failed" },
      { status: 500 },
    );
  }
}
