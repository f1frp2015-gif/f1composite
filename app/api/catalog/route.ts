// Public read-only catalog feed for the Datasheet Builder on the downloads
// page: categories + active products (model, designation, published weight).

import { NextResponse } from "next/server";
import { listCategories, listProducts } from "@/lib/catalog/db";
import { designation } from "@/lib/catalog/shapes";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [categories, products] = await Promise.all([
      listCategories(),
      listProducts({ activeOnly: true }),
    ]);
    return NextResponse.json({
      ok: true,
      categories: categories.map((c) => ({ id: c.id, slug: c.slug, name: c.name })),
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
    return NextResponse.json({ ok: false, categories: [], products: [] }, { status: 200 });
  }
}
