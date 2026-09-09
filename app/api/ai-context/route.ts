import { NextResponse } from "next/server";
import { buildPublicKnowledge } from "@/lib/publicKnowledge";

export const dynamic = "force-static";
export const revalidate = 3600;

export function GET() {
  return NextResponse.json(buildPublicKnowledge(), {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
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
