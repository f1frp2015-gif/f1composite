"use client";

// Datasheet Builder: pick any combination of catalog products and generate a
// live PDF — one page per product, plus a cover when more than one. Data comes
// from /api/catalog (DB-driven); if the catalog is empty or unreachable the
// whole block hides itself so the downloads page never degrades.

import { useEffect, useMemo, useState } from "react";

interface CatalogCategory {
  id: number;
  slug: string;
  name: string;
}

interface CatalogProduct {
  id: number;
  model: string;
  name: string | null;
  categoryId: number | null;
  designation: string | null;
  weightPerM: number | null;
}

export default function DatasheetBuilder() {
  const [categories, setCategories] = useState<CatalogCategory[]>([]);
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/catalog")
      .then((r) => r.json())
      .then((json) => {
        if (json?.ok && Array.isArray(json.products) && json.products.length > 0) {
          setCategories(json.categories);
          setProducts(json.products);
        }
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  const byCategory = useMemo(() => {
    const groups: { category: CatalogCategory | null; items: CatalogProduct[] }[] = [];
    for (const c of categories) {
      const items = products.filter((p) => p.categoryId === c.id);
      if (items.length) groups.push({ category: c, items });
    }
    const orphans = products.filter((p) => p.categoryId == null || !categories.some((c) => c.id === p.categoryId));
    if (orphans.length) groups.push({ category: null, items: orphans });
    return groups;
  }, [categories, products]);

  if (!loaded || products.length === 0) return null;

  const toggle = (id: number) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const toggleGroup = (items: CatalogProduct[]) => {
    const next = new Set(selected);
    const allIn = items.every((p) => next.has(p.id));
    for (const p of items) {
      if (allIn) next.delete(p.id);
      else next.add(p.id);
    }
    setSelected(next);
  };

  const href = `/api/datasheet?ids=${[...selected].join(",")}`;

  return (
    <section className="bg-white py-[55px]" id="datasheet-builder">
      <div className="mx-auto max-w-[1280px] px-[34px]">
        <div className="mb-[8px] text-f13 font-bold uppercase tracking-wide text-teal-text">
          Datasheet Builder
        </div>
        <h2 className="mb-[13px] text-f24 font-bold text-t1">
          Build your own datasheet or catalog PDF
        </h2>
        <p className="mb-[21px] max-w-[700px] text-f15 leading-golden text-t2">
          Select one profile for a single-page technical data sheet, a whole family, or any mix
          across families for a multi-page catalog extract — cross-section drawing, exact section
          properties, and E23 mechanical data on every page, generated live from our engineering
          database.
        </p>

        <div className="grid gap-[21px] md:grid-cols-2 lg:grid-cols-3">
          {byCategory.map(({ category, items }) => {
            const allIn = items.every((p) => selected.has(p.id));
            return (
              <div
                key={category?.id ?? "other"}
                className="rounded-[8px] border border-border-default bg-white p-[21px]"
              >
                <div className="mb-[13px] flex items-center justify-between">
                  <h3 className="text-f15 font-bold text-t1">{category?.name ?? "Other profiles"}</h3>
                  <button
                    onClick={() => toggleGroup(items)}
                    className="text-f12 font-semibold text-teal-text hover:underline"
                  >
                    {allIn ? "Clear all" : "Select all"}
                  </button>
                </div>
                <div className="max-h-[220px] space-y-[4px] overflow-y-auto pr-[8px]">
                  {items.map((p) => (
                    <label key={p.id} className="flex items-center gap-[8px] text-f13 text-t2">
                      <input
                        type="checkbox"
                        checked={selected.has(p.id)}
                        onChange={() => toggle(p.id)}
                      />
                      <span className="flex-1">{p.model}</span>
                      {p.weightPerM != null && (
                        <span className="text-f11 text-t3">{p.weightPerM} kg/m</span>
                      )}
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-[21px] flex items-center gap-[13px]">
          {selected.size > 0 ? (
            <a
              href={href}
              target="_blank"
              rel="noopener"
              className="rounded-[6px] bg-teal-text px-[21px] py-[13px] text-f15 font-semibold text-white hover:opacity-90"
            >
              Generate PDF ({selected.size} {selected.size === 1 ? "datasheet page" : "products"}) →
            </a>
          ) : (
            <span className="rounded-[6px] bg-bg2 px-[21px] py-[13px] text-f15 font-semibold text-t3">
              Select products to generate a PDF
            </span>
          )}
          {selected.size > 0 && (
            <button
              onClick={() => setSelected(new Set())}
              className="text-f13 text-t3 hover:underline"
            >
              Clear selection
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
