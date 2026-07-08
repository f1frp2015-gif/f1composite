// Public read-only catalog feed for the Datasheet Builder on the downloads
// page: categories + active products (model, designation, published weight)
// + formulations (resin systems) so customers can pick which mechanical
// dataset each selected cross-section is rendered with.

import { NextResponse } from "next/server";
import { listCategories, listFormulations, listProducts } from "@/lib/catalog/db";
import { designation } from "@/lib/catalog/shapes";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [categories, products, formulations] = await Promise.all([
      listCategories(),
      listProducts({ activeOnly: true }),
      listFormulations(),
    ]);
    return NextResponse.json({
      ok: true,
      categories: categories.map((c) => ({ id: c.id, slug: c.slug, name: c.name })),
      formulations: formulations.map((f) => ({
        id: f.id,
        code: f.code,
        name: f.name,
        resinFamily: f.resin_family,
        grade: f.en13706_grade,
      })),
      products: products.map((p) => ({
        id: p.id,
        model: p.model,
        name: p.name,
        categoryId: p.category_id,
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
