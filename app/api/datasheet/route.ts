// On-demand datasheet / catalog PDF: GET /api/datasheet?ids=1,2,3[&f=2,5]
//
// ids — catalog product ids (cross-sections).
// f   — optional formulation (resin system) ids. When present, every selected
//       product is rendered once per selected formulation (compare mode);
//       when absent, each product uses its default formulation as before.
//
// Single page → one-page TDS. Multiple pages → cover + one page each.

import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import {
  getProductsByIds,
  listCategories,
  listFormulations,
} from "@/lib/catalog/db";
import { DatasheetDocument, type DatasheetPage } from "@/lib/pdf/datasheet";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const MAX_PAGES = 120;

function parseIdList(raw: string | null): number[] {
  return [...new Set((raw ?? "").split(",").map((s) => Number(s.trim())))].filter(
    (n) => Number.isFinite(n) && n > 0,
  );
}

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const ids = parseIdList(params.get("ids")).slice(0, MAX_PAGES);
  const formulationIds = parseIdList(params.get("f"));
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

    const formulationById = new Map(formulations.map((f) => [f.id, f]));
    // Unknown formulation ids are dropped (never silently swapped for another
    // dataset); empty selection falls back to each product's own formulation.
    const selectedFormulations = formulationIds
      .map((id) => formulationById.get(id))
      .filter((f): f is NonNullable<typeof f> => f != null);

    const pages: DatasheetPage[] = products.flatMap((p) =>
      selectedFormulations.length > 0
        ? selectedFormulations.map((f) => ({ product: p, formulation: f }))
        : [
            {
              product: p,
              formulation:
                (p.formulation_id != null && formulationById.get(p.formulation_id)) || null,
            },
          ],
    );
    if (pages.length > MAX_PAGES) {
      return NextResponse.json(
        {
          ok: false,
          error: `${pages.length} pages requested (products × formulations) exceeds the ${MAX_PAGES}-page limit — narrow the selection`,
        },
        { status: 400 },
      );
    }

    // DatasheetDocument renders a <Document> root; the cast bridges react-pdf's
    // DocumentProps-typed API to a component whose props are our data payload.
    const element = React.createElement(DatasheetDocument, {
      data: {
        pages,
        categories: new Map(categories.map((c) => [c.id, c])),
      },
    }) as unknown as Parameters<typeof renderToBuffer>[0];
    const buffer = await renderToBuffer(element);

    const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const name =
      pages.length === 1
        ? `f1composite-tds-${slug(pages[0].product.model)}${pages[0].formulation ? `-${slug(pages[0].formulation.code)}` : ""}.pdf`
        : `f1composite-catalog-extract-${pages.length}-pages.pdf`;

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
