// POST /api/admin/password-reset — break-glass recovery: remove the DB-stored
// scrypt hash so ADMIN_PASSWORD env becomes the active credential again.
//
// Guarded by BOTH a valid admin session AND knowledge of the env password
// itself. This grants nothing beyond what deployment-env control already
// grants (whoever can read/set ADMIN_PASSWORD could redeploy anyway); it just
// turns "locked out after a mistyped change" into a recoverable state.

import { NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "node:crypto";
import { isAdminRequest } from "@/lib/admin/auth";
import { setAdminSetting } from "@/lib/catalog/db";

export async function POST(request: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const env = process.env.ADMIN_PASSWORD;
  if (!env) {
    return NextResponse.json({ ok: false, error: "Admin not configured" }, { status: 503 });
  }
  let supplied = "";
  try {
    const body = await request.json();
    supplied = typeof body?.envPassword === "string" ? body.envPassword : "";
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
  }
  const a = createHash("sha256").update(supplied).digest();
  const b = createHash("sha256").update(env).digest();
  if (!supplied || !timingSafeEqual(a, b)) {
    return NextResponse.json({ ok: false, error: "env password mismatch" }, { status: 403 });
  }
  // Overwrite with a value that can never verify (no ":" separator parses to
  // salt+hash, and checkPassword falls through to env only when the stored
  // value is absent) — so instead store an explicit tombstone the auth layer
  // treats as "not set".
  const ok = await setAdminSetting("admin_password_scrypt", "");
  if (!ok) {
    return NextResponse.json({ ok: false, error: "DB not configured" }, { status: 503 });
  }
  return NextResponse.json({ ok: true, note: "DB password cleared; env ADMIN_PASSWORD active again" });
}
