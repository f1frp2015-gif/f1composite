// Public read-only catalog feed for the Datasheet Builder on the downloads
// page: categories + active products (model, designation, published weight)
// + formulations (resin systems) so customers can pick which mechanical
// dataset each selected cross-section is rendered with. The builder fetches
// it once per visit; the limit only stops repeated bulk copies of the list.

import { NextResponse } from "next/server";
import { getPublishedCatalog } from "@/lib/catalog/published";
import { designation } from "@/lib/catalog/shapes";
import { rateLimit, tooManyRequests } from "@/lib/rateLimit";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const limited = rateLimit(req, "catalog", { limit: 30, windowMs: 10 * 60_000 });
  if (!limited.ok) return tooManyRequests(limited, "Too many catalog requests. Try again in a few minutes.");
  try {
    const { categories, profiles, formulations, revision } = await getPublishedCatalog();
    return NextResponse.json({
      ok: true,
      revision,
      // Category/formulation IDs are transport keys only. Profile key and
      // formulation code identify new selections; seed IDs are never DB IDs.
      categories: categories.map((c) => ({ id: Number(c.id), slug: c.slug, name: c.name })),
      formulations: formulations.map((f) => ({
        id: Number(f.id),
        code: f.code,
        name: f.name,
        resinFamily: f.resin_family,
        grade: f.en13706_grade,
      })),
      products: profiles.map((profile) => ({
        key: profile.catalogKey,
        id: profile.source === "database" ? Number(profile.product.id) : null,
        model: profile.product.model,
        name: profile.product.name,
        categoryId: profile.category?.id ?? null,
        designation: profile.product.geometry ? designation(profile.product.geometry) : null,
        weightPerM: profile.product.weight_per_m,
        configuration: profile.configuration,
      })),
    });
  } catch {
    // DB unreachable — the builder simply hides itself.
    return NextResponse.json(
      { ok: false, categories: [], products: [], formulations: [] },
      { status: 200 },
    );
  }
}
