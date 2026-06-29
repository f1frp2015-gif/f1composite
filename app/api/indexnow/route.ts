import { NextRequest, NextResponse } from "next/server";
import sitemap from "@/app/sitemap";

// IndexNow: push URL changes to participating engines (Bing, Yandex, Naver,
// Seznam, Yep). Google does NOT participate in IndexNow — for Google we rely on
// the sitemap + internal links only. The key below is also served as a static
// ownership-proof file at /<key>.txt (public/<key>.txt).
const INDEXNOW_KEY = "79eeba46f40c47acc7ed14dad5cd5942";
const HOST = "www.f1composite.com";
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

export const dynamic = "force-dynamic";

function allUrls(entries: { url: string }[]): string[] {
  return entries.map((e) => e.url).filter((u) => u.startsWith(`https://${HOST}`));
}

export async function GET() {
  const entries = await sitemap();
  return NextResponse.json({
    service: "IndexNow submitter",
    note: "Pushes sitemap URLs to Bing/Yandex/Naver/Seznam/Yep. Google does not support IndexNow. POST with Authorization: Bearer <INDEXNOW_SECRET> to submit.",
    host: HOST,
    keyLocation: KEY_LOCATION,
    submittableUrls: allUrls(entries).length,
  });
}

export async function POST(req: NextRequest) {
  const secret = process.env.INDEXNOW_SECRET;
  if (!secret) {
    return NextResponse.json(
      { ok: false, error: "INDEXNOW_SECRET not configured on the server." },
      { status: 503 },
    );
  }
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  // Optional body { urlList?: string[] }; default to all sitemap URLs.
  let urlList: string[] = [];
  try {
    const body = (await req.json()) as { urlList?: unknown };
    if (Array.isArray(body?.urlList)) {
      urlList = body.urlList.filter(
        (u): u is string => typeof u === "string" && u.startsWith(`https://${HOST}`),
      );
    }
  } catch {
    // no/invalid body → fall back to full sitemap
  }
  if (urlList.length === 0) {
    urlList = allUrls(await sitemap());
  }

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: INDEXNOW_KEY, keyLocation: KEY_LOCATION, urlList }),
  });

  return NextResponse.json(
    { ok: res.ok, submitted: urlList.length, indexNowStatus: res.status },
    { status: res.ok ? 200 : 502 },
  );
}
