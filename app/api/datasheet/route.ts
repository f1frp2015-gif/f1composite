// On-demand datasheet / catalog PDF: GET /api/datasheet?ids=1,2,3
// Single id → one-page TDS. Multiple ids → cover page + one page per product.

import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import {
  getProductsByIds,
  listCategories,
  listFormulations,
} from "@/lib/catalog/db";
import { DatasheetDocument } from "@/lib/pdf/datasheet";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const MAX_PRODUCTS = 120;

export async function GET(request: Request) {
  const idsParam = new URL(request.url).searchParams.get("ids") ?? "";
  const ids = [...new Set(idsParam.split(",").map((s) => Number(s.trim())))]
    .filter((n) => Number.isFinite(n) && n > 0)
    .slice(0, MAX_PRODUCTS);
  if (ids.length === 0) {
    return NextResponse.json({ ok: false, error: "ids required, e.g. ?ids=1,2,3" }, { status: 400 });
  }

  try {
    const [products, formulations, categories] = await Promise.all([
      getProductsByIds(ids),
      listFormulations(),
      listCategories(),
    ]);
    if (products.length === 0) {
      return NextResponse.json({ ok: false, error: "no matching products" }, { status: 404 });
    }

    // DatasheetDocument renders a <Document> root; the cast bridges react-pdf's
    // DocumentProps-typed API to a component whose props are our data payload.
    const element = React.createElement(DatasheetDocument, {
      data: {
        products,
        formulations: new Map(formulations.map((f) => [f.id, f])),
        categories: new Map(categories.map((c) => [c.id, c])),
      },
    }) as unknown as Parameters<typeof renderToBuffer>[0];
    const buffer = await renderToBuffer(element);

    const name =
      products.length === 1
        ? `f1composite-tds-${products[0].model.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.pdf`
        : `f1composite-catalog-extract-${products.length}-products.pdf`;

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${name}"`,
        "Cache-Control": "private, max-age=0, must-revalidate",
      },
    });
  } catch (e) {
    console.error("[datasheet] render failed:", e);
    return NextResponse.json({ ok: false, error: "datasheet generation failed" }, { status: 500 });
  }
}
