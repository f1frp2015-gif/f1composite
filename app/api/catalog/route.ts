// Public read-only catalog feed for the Datasheet Builder on the downloads
// page: categories + active products (model, designation, published weight)
// + formulations (resin systems) so customers can pick which mechanical
// dataset each selected cross-section is rendered with. The builder fetches
// it once per visit; the limit only stops repeated bulk copies of the list.

import { NextResponse } from "next/server";
import { getPublishedCatalog } from "@/lib/catalog/published";
import { catalogPublicPayload } from "@/lib/catalog/publicPayload";
import { rateLimit, tooManyRequests } from "@/lib/rateLimit";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const limited = rateLimit(req, "catalog", { limit: 30, windowMs: 10 * 60_000 });
  if (!limited.ok) return tooManyRequests(limited, "Too many catalog requests. Try again in a few minutes.");
  try {
    return NextResponse.json(catalogPublicPayload(await getPublishedCatalog()));
  } catch {
    // DB unreachable — the builder simply hides itself.
    return NextResponse.json(
      { ok: false, categories: [], products: [], formulations: [] },
      { status: 200 },
    );
  }
}
