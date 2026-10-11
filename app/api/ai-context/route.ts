import { NextResponse } from "next/server";
import { buildPublicKnowledge } from "@/lib/publicKnowledge";
import { getPublishedCatalog } from "@/lib/catalog/published";
import { rateLimit, tooManyRequests } from "@/lib/rateLimit";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const limited = rateLimit(req, "ai-context", { limit: 30, windowMs: 10 * 60_000 });
  if (!limited.ok) return tooManyRequests(limited, "Too many context requests. Try again in a few minutes.");
  return NextResponse.json(buildPublicKnowledge(await getPublishedCatalog()), {
    headers: {
      "Cache-Control": "public, max-age=60, s-maxage=300",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
    },
  });
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  } });
}
