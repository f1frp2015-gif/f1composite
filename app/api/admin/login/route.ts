import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  SESSION_MAX_AGE_S,
  adminConfigured,
  checkPassword,
  createSessionValue,
} from "@/lib/admin/auth";

export async function POST(request: Request) {
  if (!adminConfigured()) {
    return NextResponse.json({ ok: false, error: "Admin not configured" }, { status: 503 });
  }
  let password = "";
  try {
    const body = await request.json();
    password = typeof body?.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
  }
  if (!password || !(await checkPassword(password))) {
    return NextResponse.json({ ok: false, error: "Wrong password" }, { status: 401 });
  }
  const value = createSessionValue();
  if (!value) {
    return NextResponse.json({ ok: false, error: "Admin not configured" }, { status: 503 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_S,
  });
  return res;
}
