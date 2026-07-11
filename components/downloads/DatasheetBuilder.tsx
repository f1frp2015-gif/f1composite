"use client";

// Datasheet Builder: pick any combination of catalog products, then optionally
// tick one or more resin systems (formulations) — the PDF renders every
// selected cross-section once per selected resin system, so a customer can
// compare e.g. polyester vs vinyl ester vs polyurethane data for the same
// profile. No resin ticked = the standard formulation for each product.
// Data comes from /api/catalog (DB-driven); if the catalog is empty or
// unreachable the whole block hides itself so the downloads page never
// degrades.

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

interface CatalogFormulation {
  id: number;
  code: string;
  name: string;
  resinFamily: string | null;
  grade: string | null;
}

// More than this many PDF pages = a catalog extract → worth an email (lead
// gate). Single/small TDS pulls stay friction-free.
const LEAD_GATE_THRESHOLD = 3;
const LEAD_EMAIL_KEY = "f1_datasheet_lead_email";
// Server-side hard limit on pages per PDF (products × resin systems).
const MAX_PAGES = 120;

const RESIN_FAMILY_LABELS: Record<string, string> = {
  unsaturated_polyester: "Unsaturated polyester (UP)",
  vinyl_ester: "Vinyl ester (VE)",
  epoxy: "Epoxy (EP)",
  polyurethane: "Polyurethane (PU)",
  phenolic: "Phenolic (PH)",
};
const RESIN_FAMILY_ORDER = [
  "unsaturated_polyester",
  "vinyl_ester",
  "epoxy",
  "polyurethane",
  "phenolic",
];

export default function DatasheetBuilder() {
  const [categories, setCategories] = useState<CatalogCategory[]>([]);
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [formulations, setFormulations] = useState<CatalogFormulation[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [selectedF, setSelectedF] = useState<Set<number>>(new Set());
  const [loaded, setLoaded] = useState(false);
  const [email, setEmail] = useState("");
  const [emailKnown, setEmailKnown] = useState(false);
  const [gateError, setGateError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(LEAD_EMAIL_KEY)) setEmailKnown(true);
    } catch {
      /* storage unavailable — gate will just ask */
    }
    fetch("/api/catalog")
      .then((r) => r.json())
      .then((json) => {
        if (json?.ok && Array.isArray(json.products) && json.products.length > 0) {
          setCategories(json.categories);
          setProducts(json.products);
          if (Array.isArray(json.formulations)) setFormulations(json.formulations);
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

  const formulationGroups = useMemo(() => {
    const groups: { label: string; items: CatalogFormulation[] }[] = [];
    for (const family of RESIN_FAMILY_ORDER) {
      const items = formulations.filter((f) => f.resinFamily === family);
      if (items.length) groups.push({ label: RESIN_FAMILY_LABELS[family], items });
    }
    const other = formulations.filter(
      (f) => f.resinFamily == null || !RESIN_FAMILY_ORDER.includes(f.resinFamily),
    );
    if (other.length) groups.push({ label: "High-modulus tiers", items: other });
    return groups;
  }, [formulations]);

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

  const toggleF = (id: number) => {
    const next = new Set(selectedF);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedF(next);
  };

  // Every selected profile is rendered once per selected resin system.
  const pageCount = selected.size * Math.max(1, selectedF.size);
  const overLimit = pageCount > MAX_PAGES;
  const href =
    `/api/datasheet?ids=${[...selected].join(",")}` +
    (selectedF.size > 0 ? `&f=${[...selectedF].join(",")}` : "");
  const needsEmail = pageCount > LEAD_GATE_THRESHOLD && !emailKnown;

  async function submitLeadAndDownload() {
    setGateError("");
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) {
      setGateError("Please enter a valid work email.");
      return;
    }
    setSubmitting(true);
    try {
      const chosen = products.filter((p) => selected.has(p.id));
      const chosenF = formulations.filter((f) => selectedF.has(f.id));
      await fetch("/api/datasheet-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmed,
          ids: [...selected],
          models: chosen.map((p) => p.model),
          formulations: chosenF.map((f) => f.code),
        }),
      });
      try {
        window.localStorage.setItem(LEAD_EMAIL_KEY, trimmed);
      } catch {
        /* fine */
      }
      setEmailKnown(true);
      window.open(href, "_blank", "noopener");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="bg-white py-[55px]" id="datasheet-builder">
      <div className="mx-auto max-w-[1280px] px-[34px]">
        <div className="mb-[8px] text-f13 font-bold uppercase tracking-wide text-teal-text">
          Datasheet Builder
        </div>
        <h2 className="mb-[13px] text-f24 font-bold text-t1">
          Build your own datasheet or catalog PDF
        </h2>
        <p className="mb-[21px] text-f15 leading-golden text-t2">
          Pick one profile for a single-page technical data sheet, a whole family, or any mix for a
          multi-page catalog extract. Then optionally tick one or more resin systems to get the same
          cross-section rendered with each formulation&apos;s mechanical data — polyester vs vinyl
          ester vs polyurethane, side by side. Cross-section drawing and exact section properties on
          every page, generated live from our engineering database.
        </p>

        <h3 className="mb-[13px] text-f15 font-bold text-t1">
          1 · Select profiles
        </h3>
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

        {formulationGroups.length > 0 && (
          <>
            <h3 className="mb-[8px] mt-[34px] text-f15 font-bold text-t1">
              2 · Resin system <span className="font-normal text-t3">(optional — one page per profile per system)</span>
            </h3>
            <p className="mb-[13px] text-f13 text-t3">
              Leave everything unticked to get each profile&apos;s standard formulation. Tick
              several to compare mechanical data for the same cross-section across resin systems.
            </p>
            <div className="grid gap-[13px] rounded-[8px] border border-border-default bg-bg2 p-[21px] md:grid-cols-2 lg:grid-cols-3">
              {formulationGroups.map(({ label, items }) => (
                <div key={label}>
                  <div className="mb-[8px] text-f12 font-bold uppercase tracking-wide text-t3">
                    {label}
                  </div>
                  <div className="space-y-[4px]">
                    {items.map((f) => (
                      <label key={f.id} className="flex items-center gap-[8px] text-f13 text-t2">
                        <input
                          type="checkbox"
                          checked={selectedF.has(f.id)}
                          onChange={() => toggleF(f.id)}
                        />
                        <span className="flex-1">{f.name}</span>
                        {f.grade && (
                          <span className="rounded-[4px] bg-white px-[6px] py-[1px] text-f11 font-semibold text-teal-text">
                            {f.grade}
                          </span>
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="mt-[21px] flex flex-wrap items-center gap-[13px]">
          {selected.size === 0 ? (
            <span className="rounded-[6px] bg-bg2 px-[21px] py-[13px] text-f15 font-semibold text-t3">
              Select products to generate a PDF
            </span>
          ) : overLimit ? (
            <span className="rounded-[6px] bg-bg2 px-[21px] py-[13px] text-f15 font-semibold text-t3">
              {pageCount} pages exceeds the {MAX_PAGES}-page limit — narrow the selection
            </span>
          ) : needsEmail ? (
            <>
              <input
                type="email"
                placeholder="Work email to receive catalog updates"
                className="w-[280px] rounded-[6px] border border-border-default px-[13px] py-[13px] text-f15"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                onClick={submitLeadAndDownload}
                disabled={submitting}
                className="rounded-[6px] bg-teal-text px-[21px] py-[13px] text-f15 font-semibold text-white hover:opacity-90 disabled:opacity-50"
              >
                {submitting ? "Preparing…" : `Get catalog PDF (${pageCount} pages) →`}
              </button>
              {gateError && <p className="w-full text-f13 text-red-600">{gateError}</p>}
              <p className="w-full text-f12 text-t3">
                Multi-page catalog extracts ask for an email so we can send revised data when a
                spec updates. Single datasheets download freely.
              </p>
            </>
          ) : (
            <a
              href={href}
              target="_blank"
              rel="noopener"
              className="rounded-[6px] bg-teal-text px-[21px] py-[13px] text-f15 font-semibold text-white hover:opacity-90"
            >
              Generate PDF ({pageCount} {pageCount === 1 ? "datasheet page" : "pages"}) →
            </a>
          )}
          {selected.size > 0 && (
            <button
              onClick={() => {
                setSelected(new Set());
                setSelectedF(new Set());
              }}
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
