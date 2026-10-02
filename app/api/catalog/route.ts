// Public read-only catalog feed for the Datasheet Builder on the downloads
// page: categories + active products (model, designation, published weight)
// + formulations (resin systems) so customers can pick which mechanical
// dataset each selected cross-section is rendered with. The builder fetches
// it once per visit; the limit only stops repeated bulk copies of the list.

import { NextResponse } from "next/server";
import { listCategories, listFormulations, listProducts } from "@/lib/catalog/db";
import { designation } from "@/lib/catalog/shapes";
import { rateLimit, tooManyRequests } from "@/lib/rateLimit";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const limited = rateLimit(req, "catalog", { limit: 30, windowMs: 10 * 60_000 });
  if (!limited.ok) return tooManyRequests(limited, "Too many catalog requests. Try again in a few minutes.");
  try {
    const [categories, products, formulations] = await Promise.all([
      listCategories(),
      listProducts({ activeOnly: true }),
      listFormulations(),
    ]);
    return NextResponse.json({
      ok: true,
      // ids are BIGSERIAL — the Neon driver returns them as strings, so coerce
      // to numbers here so the client and ?ids=/&f= round-trips stay numeric.
      categories: categories.map((c) => ({ id: Number(c.id), slug: c.slug, name: c.name })),
      formulations: formulations.map((f) => ({
        id: Number(f.id),
        code: f.code,
        name: f.name,
        resinFamily: f.resin_family,
        grade: f.en13706_grade,
      })),
      products: products.map((p) => ({
        id: Number(p.id),
        model: p.model,
        name: p.name,
        categoryId: p.category_id == null ? null : Number(p.category_id),
        designation: p.geometry ? designation(p.geometry) : null,
        weightPerM: p.weight_per_m == null ? null : Number(p.weight_per_m),
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
