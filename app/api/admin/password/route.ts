// POST /api/admin/password — change the admin password from the back office.
// Requires a valid session AND the current password (defence against a
// hijacked cookie being escalated into a permanent lockout of the owner).
// The new scrypt hash lives in admin_settings and overrides ADMIN_PASSWORD env.

import { NextResponse } from "next/server";
import { checkPassword, isAdminRequest, setPassword } from "@/lib/admin/auth";

export async function POST(request: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  let current = "";
  let next = "";
  try {
    const body = await request.json();
    current = typeof body?.current === "string" ? body.current : "";
    next = typeof body?.next === "string" ? body.next : "";
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
  }
  if (!(await checkPassword(current))) {
    return NextResponse.json({ ok: false, error: "Current password is wrong" }, { status: 403 });
  }
  if (next.length < 10) {
    return NextResponse.json(
      { ok: false, error: "New password must be at least 10 characters" },
      { status: 400 },
    );
  }
  const ok = await setPassword(next);
  if (!ok) {
    return NextResponse.json({ ok: false, error: "DB not configured" }, { status: 503 });
  }
  return NextResponse.json({ ok: true });
}
