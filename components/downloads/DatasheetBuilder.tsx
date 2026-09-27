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
import Link from "next/link";
import PageSection from "@/components/layout/PageSection";

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

export default function DatasheetBuilder({ tone = "white" }: { tone?: "white" | "muted" }) {
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

  const mono = "font-mono text-f12 uppercase tracking-[0.06em] text-t3";
  const card = tone === "white" ? "bg-bg2" : "bg-white";
  const action = "inline-flex min-h-[46px] items-center justify-center rounded-control bg-teal-text px-[22px] text-f14 font-bold text-white transition-colors hover:bg-teal disabled:opacity-50";
  const idle = "inline-flex min-h-[46px] items-center rounded-control border border-border-default bg-bg2 px-[22px] text-f14 font-semibold text-t3";

  return (
    <PageSection
      id="datasheet-builder"
      title="Build your own datasheet or catalog PDF"
      tone={tone}
      intro="Pick one profile for a single-page datasheet, a whole family, or any mix for a multi-page catalog extract. Then tick one or more resin systems to get the same cross-section with each formulation's mechanical data: polyester, vinyl ester and polyurethane side by side. Every page carries the cross-section drawing and exact section properties, generated from our engineering database."
    >
      {!loaded ? (
        <p className="min-h-[120px] text-f14 text-t3" aria-live="polite">Loading the profile catalog…</p>
      ) : products.length === 0 ? (
        <p className={`max-w-[760px] rounded-card border-l-4 border-l-teal px-[16px] py-[12px] text-f14 leading-golden text-t2 ${card}`} aria-live="polite">
          The builder cannot reach the profile catalog right now. Every size still has its own
          datasheet and DXF in the <Link href="/datasheets" className="font-semibold text-teal-text underline underline-offset-4">datasheet library</Link>.
        </p>
      ) : (
        <>
        <p className={mono}>Step 1</p>
        <h3 className="mt-[4px] text-f18 font-bold text-t1">Select profiles</h3>
        <div className="mt-[12px] grid gap-[12px] md:grid-cols-2 lg:grid-cols-3">
          {byCategory.map(({ category, items }) => {
            const allIn = items.every((p) => selected.has(p.id));
            return (
              <div key={category?.id ?? "other"} className={`rounded-card border border-border-default p-[20px] ${card}`}>
                <div className="flex items-center justify-between gap-[12px]">
                  <h4 className="text-f16 font-bold text-t1">{category?.name ?? "Other profiles"}</h4>
                  <button type="button" onClick={() => toggleGroup(items)} className="min-h-[32px] text-f14 font-semibold text-teal-text hover:underline">
                    {allIn ? "Clear all" : "Select all"}
                  </button>
                </div>
                <div className="mt-[8px] max-h-[220px] space-y-[4px] overflow-y-auto pr-[8px]">
                  {items.map((p) => (
                    <label key={p.id} className="flex min-h-[28px] items-center gap-[8px] text-f14 text-t2">
                      <input type="checkbox" checked={selected.has(p.id)} onChange={() => toggle(p.id)} className="accent-teal-text" />
                      <span className="flex-1">{p.model}</span>
                      {p.weightPerM != null && <span className="text-f12 tabular-nums text-t3">{p.weightPerM} kg/m</span>}
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {formulationGroups.length > 0 && (
          <>
            <p className={`mt-[32px] ${mono}`}>Step 2 · Optional</p>
            <h3 className="mt-[4px] text-f18 font-bold text-t1">Resin system</h3>
            <p className="mt-[4px] max-w-[760px] text-f14 leading-golden text-t2">
              Leave everything unticked for each profile&apos;s standard formulation, or tick several
              to compare the same cross-section across resin systems, one page per profile per system.
            </p>
            <div className={`mt-[12px] grid gap-[12px] rounded-card border border-border-default p-[20px] md:grid-cols-2 lg:grid-cols-3 ${card}`}>
              {formulationGroups.map(({ label, items }) => (
                <div key={label}>
                  <p className={mono}>{label}</p>
                  <div className="mt-[8px] space-y-[4px]">
                    {items.map((f) => (
                      <label key={f.id} className="flex min-h-[28px] items-center gap-[8px] text-f14 text-t2">
                        <input type="checkbox" checked={selectedF.has(f.id)} onChange={() => toggleF(f.id)} className="accent-teal-text" />
                        <span className="flex-1">{f.name}</span>
                        {f.grade && (
                          <span className="rounded-tag border border-border-default bg-white px-[6px] py-[1px] text-f12 font-medium text-t1">{f.grade}</span>
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="mt-[24px] flex flex-wrap items-center gap-[12px]">
          {selected.size === 0 ? (
            <span className={idle}>Select profiles to generate a PDF</span>
          ) : overLimit ? (
            <span className={idle}>{pageCount} pages is over the {MAX_PAGES}-page limit: narrow the selection</span>
          ) : needsEmail ? (
            <>
              <label className="sr-only" htmlFor="datasheet-email">Work email</label>
              <input
                id="datasheet-email"
                type="email"
                autoComplete="email"
                placeholder="Work email for catalog updates"
                className="min-h-[46px] w-full max-w-[320px] rounded-control border border-border-default bg-white px-[14px] text-f16 text-t1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="button" onClick={submitLeadAndDownload} disabled={submitting} className={action}>
                {submitting ? "Preparing…" : `Get the catalog PDF (${pageCount} pages)`}
              </button>
              {gateError && <p className="w-full text-f14 text-fail">{gateError}</p>}
              <p className="w-full text-f14 text-t3">
                Multi-page catalog extracts ask for an email so we can send revised data when a
                specification changes. Single datasheets download freely.
              </p>
            </>
          ) : (
            <a href={href} target="_blank" rel="noopener" className={action}>
              Generate PDF ({pageCount} {pageCount === 1 ? "datasheet page" : "pages"})
            </a>
          )}
          {selected.size > 0 && (
            <button
              type="button"
              onClick={() => {
                setSelected(new Set());
                setSelectedF(new Set());
              }}
              className="min-h-[44px] text-f14 font-semibold text-t2 hover:text-teal-text"
            >
              Clear selection
            </button>
          )}
        </div>
        </>
      )}
    </PageSection>
  );
}
