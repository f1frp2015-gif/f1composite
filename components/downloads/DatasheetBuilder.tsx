"use client";

// Uses the published catalog's stable keys. Alternative material datasets are
// explicitly reference comparisons, not proof that a tested product exists.

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import PageSection from "@/components/layout/PageSection";
import type { CatalogConfiguration } from "@/lib/catalog/identity";
import { getAcquisition } from "@/lib/acquisitionClient";

interface CatalogCategory {
  id: number;
  slug: string;
  name: string;
}

interface CatalogProduct {
  id: number | null;
  key: string;
  configuration: CatalogConfiguration;
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
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [selectedF, setSelectedF] = useState<Set<string>>(new Set());
  const [loaded, setLoaded] = useState(false);
  const [revision, setRevision] = useState("");
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
          setRevision(json.revision);
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

  const toggle = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const toggleGroup = (items: CatalogProduct[]) => {
    const next = new Set(selected);
    const allIn = items.every((p) => next.has(p.key));
    for (const p of items) {
      if (allIn) next.delete(p.key);
      else next.add(p.key);
    }
    setSelected(next);
  };

  const toggleF = (id: string) => {
    const next = new Set(selectedF);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedF(next);
  };

  // Every selected profile is rendered once per selected resin system.
  const pageCount = selected.size * Math.max(1, selectedF.size);
  const overLimit = pageCount > MAX_PAGES;
  const href =
    `/api/datasheet?profiles=${encodeURIComponent([...selected].join(","))}&revision=${encodeURIComponent(revision)}` +
    (selectedF.size > 0 ? `&materials=${encodeURIComponent([...selectedF].join(","))}&reference=1` : "");
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
      const chosen = products.filter((p) => selected.has(p.key));
      const chosenF = formulations.filter((f) => selectedF.has(f.code));
      await fetch("/api/datasheet-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmed,
          ids: chosen.flatMap((product) => product.id == null ? [] : [product.id]),
          catalogKeys: chosen.map((product) => product.key),
          catalogRevision: revision,
          acquisition: getAcquisition(),
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
      intro="Select published cross-sections and their default material data, or compare alternative material reference datasets. Each PDF identifies the section, material code, catalog revision and evidence scope. A generated comparison does not confirm supply, certification or tested performance of that combination."
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
            const allIn = items.every((p) => selected.has(p.key));
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
                    <label key={p.key} className="flex min-h-[28px] items-center gap-[8px] text-f14 text-t2">
                      <input type="checkbox" checked={selected.has(p.key)} onChange={() => toggle(p.key)} className="accent-teal-text" />
                      <span className="flex-1">{p.model}{p.configuration.sectionId ? <span className="block text-f12 text-t3">Internal ref: {p.configuration.sectionId} · {p.configuration.formulationCode ?? "Material to confirm"}</span> : null}</span>
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
              Leave everything unticked for each profile&apos;s default dataset. Selecting alternatives enables reference comparison mode, one page per section and dataset. A material code is not evidence that this cross-section has been manufactured or tested in that resin. Default catalog mass is not transferred to another formulation.
            </p>
            <div className={`mt-[12px] grid gap-[12px] rounded-card border border-border-default p-[20px] md:grid-cols-2 lg:grid-cols-3 ${card}`}>
              {formulationGroups.map(({ label, items }) => (
                <div key={label}>
                  <p className={mono}>{label}</p>
                  <div className="mt-[8px] space-y-[4px]">
                    {items.map((f) => (
                      <label key={f.code} className="flex min-h-[28px] items-center gap-[8px] text-f14 text-t2">
                        <input type="checkbox" checked={selectedF.has(f.code)} onChange={() => toggleF(f.code)} className="accent-teal-text" />
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

        <p className="mt-[20px] max-w-[840px] text-f14 leading-golden text-t2">{selectedF.size ? "Reference comparison selected. Confirm feasibility, finished-product mass and applicable test reports with engineering before specifying these combinations." : "Default catalog datasets are preliminary references. Consult the evidence scope on each datasheet before specifying a product."} <Link href="/resources/evidence" className="font-semibold text-teal-text underline">Review evidence scope</Link>.</p>
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
