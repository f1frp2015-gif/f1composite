'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { gratingCatalog, readProject, PROJECT_KEY, type GratingProject } from '@/lib/gratingProject';

export default function GratingInquiryReview() {
  const [draft, setDraft] = useState<GratingProject | null>(null);
  useEffect(() => {
    // Session-scoped input can only be read after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    try { const raw = sessionStorage.getItem(PROJECT_KEY); if (raw) setDraft(readProject(raw)); } catch { /* The editable message retains the transfer fallback. */ }
  }, []);
  if (!draft) return <p className="text-f14 text-t2">Review the requirement below or attach your drawing. Unknown specifications can be confirmed with our team.</p>;
  return <section aria-label="Imported grating requirement" className="rounded-card border border-teal-border bg-teal-bg p-5">
    <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Your selection is included</p>
    <h3 className="mt-2 text-f18 font-bold">{draft.fields.stage} · {draft.lines.length} panel {draft.lines.length === 1 ? "line" : "lines"}</h3>
    <p className="mt-2 text-f14">Delivery: {draft.fields.destination || 'To confirm'}</p>
    <ul className="mt-4 space-y-3">{draft.lines.map(line => <li key={line.key} className="rounded-card bg-white p-3 text-f14"><strong>{line.mark} · {gratingCatalog.find(s => s.id === line.spec)?.title || 'Per drawing'}</strong><p className="mt-1">{line.length || '?'} × {line.width || '?'} {line.unit} · {line.quantity || '?'} panels</p></li>)}</ul>
    <p className="mt-3 text-f12 text-t2">Imported selection. Any corrections in the message below take precedence.</p>
    <Link href="/products/grating#grating-quote" className="mt-2 inline-flex min-h-11 items-center text-f14 font-bold text-teal-text underline">Return to edit the panel schedule</Link>
  </section>;
}
