'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { emptyProject, gratingCatalog, panelArea, PROJECT_KEY, projectSummary, readProject, SUMMARY_KEY, type GratingProject, type PanelLine, type ProjectField } from '@/lib/gratingProject';
import { trackEvent } from '@/lib/analytics';

const input = 'mt-1 w-full rounded-control border border-border-default bg-white p-3 text-sm text-t1';
const button = 'inline-flex min-h-11 items-center justify-center rounded-control border border-teal-border px-4 py-2 text-sm font-bold text-teal-text disabled:opacity-40';
const photo = { molded: '/images/products/molded-frp-grating/molded-grating-grit-mesh-closeup.webp', pultruded: '/images/products/pultruded-frp-grating/pultruded-grating-t-bar-closeup.webp' };
const fieldLabels: Record<ProjectField, string> = { stage: 'Inquiry stage', application: 'Application', support: 'Clear span / support width / layout (with units)', environment: 'Chemicals, concentration, exposure and temperature', surface: 'Surface, wet/dry conditions and footwear', resin: 'Required resin or help selecting', color: 'Color requirement', destination: 'Country, port or postcode', date: 'Required on-site date', supply: 'Supply scope', clips: 'Fixing kit requirements', documents: 'Required drawings, tests or project standards', loads: 'Uniform / point / wheel load, footprint and deflection limit (with units)' };

export default function GratingProjectPlanner({ family }: { family?: 'molded' | 'pultruded' }) {
  const [project, setProject] = useState<GratingProject>(emptyProject);
  const [ready, setReady] = useState(false);
  const [mode, setMode] = useState('');
  const [step, setStep] = useState(1);
  const [construction, setConstruction] = useState(family || '');
  const [search, setSearch] = useState('');
  const [depth, setDepth] = useState('');
  const [opening, setOpening] = useState('');
  const [compare, setCompare] = useState<string[]>([]);
  const [notice, setNotice] = useState('');
  useEffect(() => {
    // Restore this tab's draft only after hydration; the server renders an empty draft.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    try { setProject(readProject(sessionStorage.getItem(PROJECT_KEY))); } catch { setNotice('Draft storage is unavailable. Download your summary before leaving this page.'); }
    setReady(true);
    const openEntry = (hash: string) => {
      if (hash === '#grating-quote') { setMode('drawing'); setStep(2); }
      if (hash === '#grating-help') { setMode('choose'); setStep(1); }
      if (hash === '#grating-budget') { setMode('drawing'); setStep(2); setProject(p => ({...p, fields: {...p.fields, stage: 'Budget estimate'}})); }
      if (hash === '#grating-review') { setMode('choose'); setStep(1); setProject(p => ({...p, fields: {...p.fields, stage: 'Specification review'}})); }
    };
    const entryFromHash = () => openEntry(window.location.hash);
    const entryFromLink = (event: MouseEvent) => {
      const href = event.target instanceof Element ? event.target.closest('a')?.getAttribute('href') : null;
      if (href?.startsWith('#grating-')) openEntry(href);
    };
    entryFromHash();
    window.addEventListener('hashchange', entryFromHash);
    document.addEventListener('click', entryFromLink, true);
    return () => { window.removeEventListener('hashchange', entryFromHash); document.removeEventListener('click', entryFromLink, true); };
  }, []);
  useEffect(() => { if (ready) try { sessionStorage.setItem(PROJECT_KEY, JSON.stringify(project)); } catch { /* In-memory editing and downloads remain available. */ } }, [project, ready]);
  const matches = gratingCatalog.filter(s => (!construction || s.family === construction) && (!depth || s.depth === depth) && (!opening || s.openArea === opening) && `${s.title} ${s.geometry}`.toLowerCase().includes(search.toLowerCase().trim()));
  const selected = compare.map(id => gratingCatalog.find(s => s.id === id)!);
  const summary = projectSummary(project);
  function goStep(value: number) {
    setStep(value);
    trackEvent('grating_step_view', { step: value, entry: mode });
    requestAnimationFrame(() => document.getElementById('grating-workflow-heading')?.focus());
  }
  function field(key: ProjectField, value: string) { setProject(p => ({ ...p, fields: { ...p.fields, [key]: value } })); }
  function add(spec = '') {
    if (project.lines.length >= 30) { setNotice('For more than 30 panel lines, attach your full schedule with the inquiry.'); return; }
    setProject(p => ({ ...p, lines: [...p.lines, { key: crypto.randomUUID(), spec, mark: `P${String(p.lines.length + 1).padStart(2, '0')}`, length: '', width: '', quantity: '', unit: 'mm', direction: '', notes: '' }] }));
    setNotice('Added. Continue to step 2 when you have selected your panels.');
    trackEvent('grating_panel_added', { specification_id: spec || 'drawing' });
  }
  function edit(key: string, name: keyof PanelLine, value: string) { setProject(p => ({ ...p, lines: p.lines.map(r => r.key === key ? { ...r, [name]: value } : r) })); }
  function download() {
    const url = URL.createObjectURL(new Blob([summary], { type: 'text/plain;charset=utf-8' }));
    const a = document.createElement('a'); a.href = url; a.download = 'f1-grating-rfq-summary.txt'; a.click(); URL.revokeObjectURL(url);
  }
  function next() {
    const invalid = project.lines.some(line => ['length', 'width', 'quantity'].some(k => { const value = line[k as 'length' | 'width' | 'quantity']; return value !== '' && (!Number.isFinite(Number(value)) || Number(value) <= 0 || (k === 'quantity' && !Number.isInteger(Number(value)))); }));
    if (invalid) { setNotice('Use positive dimensions and whole panel quantities, or leave unknown values blank.'); return; }
    try { sessionStorage.setItem(SUMMARY_KEY, summary); sessionStorage.setItem(PROJECT_KEY, JSON.stringify(project)); }
    catch { setNotice('Your browser could not transfer the draft. Download the summary, then paste it into the contact form.'); return; }
    trackEvent('grating_summary_continue', { panel_lines: project.lines.length });
    window.location.assign('/contact?source=grating-project&product=FRP+Grating&product_path=%2Fproducts%2Fgrating&inquiry_type=rfq&grating_project=1');
  }
  const renderField = (key: ProjectField) => <label key={key} className="block text-sm font-semibold">{fieldLabels[key]}{key === 'stage' || key === 'supply' || key === 'application' ? <select className={input} value={project.fields[key]} onChange={e => field(key, e.target.value)}>{(key === 'stage' ? ['Budget estimate', 'Formal quotation', 'Specification review'] : key === 'supply' ? ['', 'Whole panels', 'Cut-to-size panels', 'Cut panels with fixing kits', 'Not sure'] : ['', 'Walkway', 'Equipment platform', 'Trench cover', 'Other / not sure']).map(v => <option key={v} value={v}>{v || 'Not sure / to confirm'}</option>)}</select> : <input className={input} maxLength={1000} type={key === 'date' ? 'date' : 'text'} value={project.fields[key]} onChange={e => field(key, e.target.value)} placeholder="Not sure / to confirm" />}</label>;
  return <section id="grating-planner" className="scroll-mt-[40px] bg-bg2 py-10 pb-28 lg:pb-12">
    <div className="site-container space-y-6"><span id="grating-configurations" className="block scroll-mt-[40px]" /><span id="grating-quote" className="block scroll-mt-[40px]" /><span id="grating-help" className="block scroll-mt-[40px]" /><span id="grating-budget" className="block scroll-mt-[40px]" /><span id="grating-review" className="block scroll-mt-[40px]" />
      <div><p className="text-xs font-bold uppercase tracking-widest text-teal-text">Select • compare • prepare your inquiry</p><h2 id="grating-workflow-heading" tabIndex={-1} className="mt-3 scroll-mt-[40px] text-3xl font-bold outline-none">Build your grating requirement</h2><p className="mt-3 text-t2">Start with what you know. Keep unknown details for review; attach drawings on the contact form.</p></div>
      <details open={!mode}><summary className="mb-3 cursor-pointer py-2 text-sm font-semibold text-teal-text">{mode ? "Change starting point" : "Choose your starting point"}</summary><div className="grid gap-3 md:grid-cols-3">{[['choose', 'Help me choose', 'Describe the application and support conditions.'], ['spec', 'Find my specification', 'Search 62 configurations and compare up to three.'], ['drawing', 'Quote my drawing / BOQ', 'Skip selection and attach your existing schedule.']].map(([id, title, desc]) => <button key={id} type="button" aria-pressed={mode === id} disabled={!ready} onClick={() => { setMode(id); setStep(id === "drawing" ? 2 : 1); trackEvent('grating_entry_selected', { entry: id }); }} className={`rounded-card border p-5 text-left ${mode === id ? 'border-teal-text bg-teal-bg' : 'border-border-default bg-white'}`}><span className="block text-lg font-bold">{title} →</span><span className="mt-2 block text-sm text-t2">{desc}</span></button>)}</div></details>
      {mode && <>
        <nav aria-label="Grating inquiry steps" className="grid grid-cols-3 gap-2">{['Select panels', 'Sizes & supply', 'Review & send'].map((label, i) => <button key={label} type="button" aria-current={step === i + 1 ? 'step' : undefined} onClick={() => goStep(i + 1)} className={`min-h-14 rounded-card border px-2 py-3 text-sm font-semibold ${step === i + 1 ? 'border-teal-text bg-teal-text text-white' : 'border-border-default bg-white text-t2'}`}><span className="block text-xs opacity-80">STEP {i + 1}</span>{label}</button>)}</nav>
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0 space-y-6">
        <div hidden={step !== 1} className="space-y-6">
        {mode === 'choose' && <div className="rounded-card bg-white p-5"><h3 className="text-xl font-bold">1. Tell us about the project</h3><div className="mt-4 grid gap-4 md:grid-cols-2">{(['application', 'support', 'environment', 'surface'] as ProjectField[]).map(renderField)}</div><div className="mt-4 flex flex-wrap gap-3"><button className={button} onClick={() => { setConstruction("molded"); setSearch(""); setDepth(""); setOpening(""); }}>Compare molded mesh for cutout layouts</button><button className={button} onClick={() => { setConstruction("pultruded"); setSearch(""); setDepth(""); setOpening(""); }}>Compare directional bearing-bar panels</button></div><p className="mt-4 text-sm text-t2">For layouts with cutouts, compare molded mesh. For a defined bearing-bar direction, compare pultruded panels. Both need matching load and support data before approval.</p></div>}
        {<div id="grating-filter" className="rounded-card bg-white p-5">
          <h3 className="text-xl font-bold">{mode === 'choose' ? '2. ' : ''}Find candidate configurations</h3><p className="mt-2 text-sm text-t2">Filter geometry, then compare. Thickness alone does not establish load capacity; mesh pitch is not clear opening.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <label className="text-sm font-semibold">Construction<select className={input} value={construction} onChange={e => { setConstruction(e.target.value); setDepth(''); setOpening(''); }}><option value="">Both constructions</option><option value="molded">Molded</option><option value="pultruded">Pultruded</option></select></label>
            <label className="text-sm font-semibold">Model or mesh<input className={input} value={search} onChange={e => setSearch(e.target.value)} placeholder="e.g. T-1210 or 38.1" /></label>
            <label className="text-sm font-semibold">Depth (mm)<select className={input} value={depth} onChange={e => setDepth(e.target.value)}><option value="">All depths</option>{Array.from(new Set(gratingCatalog.filter(s => !construction || s.family === construction).map(s => s.depth))).sort((a,b) => parseFloat(a)-parseFloat(b)).map(v => <option key={v}>{v}</option>)}</select></label>
            <label className="text-sm font-semibold">Open area<select className={input} value={opening} onChange={e => setOpening(e.target.value)}><option value="">All open areas</option>{Array.from(new Set(gratingCatalog.filter(s => !construction || s.family === construction).map(s => s.openArea))).sort().map(v => <option key={v}>{v}</option>)}</select></label>
          </div>
          <div className="my-4 flex flex-wrap items-center justify-between gap-3"><p role="status">{matches.length} matching configurations · {compare.length}/3 in comparison</p><button className={button} onClick={() => { setConstruction(''); setSearch(''); setDepth(''); setOpening(''); }}>Reset filters</button></div>
          {matches.length === 0 && <p className="rounded-control bg-bg2 p-4">No configuration matches these filters. Reset a filter or use your drawing to request a review.</p>}
          <div className="grid max-h-[650px] gap-4 overflow-y-auto pr-1 md:grid-cols-2 xl:grid-cols-2" tabIndex={0} role="region" aria-label="Matching grating configurations">{matches.map(s => <article key={s.id} className="rounded-card border border-border-default p-4">
            <div className="flex items-center gap-3"><Image src={photo[s.family as keyof typeof photo]} alt={`${s.family} construction reference, not an exact model photograph`} width={80} height={64} className="h-16 w-20 rounded-tag object-cover" /><div><p className="text-xs uppercase text-teal-text">{s.family}</p><h4 className="font-bold">{s.title}</h4></div></div>
            <p className="mt-3 text-sm">{s.depth} mm deep · {s.openArea} open · {s.weight} kg/m²</p><details className="mt-2 text-xs text-t2"><summary className="cursor-pointer py-2">Full configuration</summary><p>{s.specification}</p></details><p className="mt-2 text-xs text-t2">Construction photo. Clear opening, resin and load suitability to confirm.</p>
            <div className="mt-4 flex flex-wrap items-center gap-3"><label className="flex min-h-11 items-center gap-2 text-sm"><input type="checkbox" checked={compare.includes(s.id)} disabled={!compare.includes(s.id) && compare.length >= 3} onChange={e => setCompare(p => e.target.checked ? [...p, s.id] : p.filter(id => id !== s.id))} />Compare <span className="sr-only">{s.title}</span></label><button className={button} disabled={!ready} onClick={() => add(s.id)}>Add to schedule<span className="sr-only"> {s.title}</span></button></div>
          </article>)}</div>
          {selected.length > 0 && <div className="mt-6"><h3 className="text-xl font-bold">Your comparison</h3><div className="mt-3 grid gap-3 md:grid-cols-3">{selected.map(s => <article key={s.id} className="min-w-0 rounded-card bg-bg2 p-4 text-sm"><h4 className="font-bold">{s.title}</h4><dl className="mt-3 space-y-3">{[['Construction', s.family], ['Depth', `${s.depth} mm`], ['Mesh / bar centers', s.geometry], ['Open area', s.openArea], ['Nominal weight', `${s.weight} kg/m²`], ['Listed panel options (mm)', s.panels], ['Full configuration', s.specification], ['Still to confirm', 'Clear opening, load / span, resin, surface and availability']].map(([k,v]) => <div key={k}><dt className="font-semibold">{k}</dt><dd>{v}</dd></div>)}</dl><button className={`${button} mt-4`} onClick={() => add(s.id)}>Add to schedule</button><button className="ml-3 py-3 underline" onClick={() => setCompare(p => p.filter(id => id !== s.id))}>Remove</button></article>)}</div></div>}
        </div>}
        <div className="flex flex-wrap items-center justify-between gap-3"><p className="text-sm text-t2">Not sure yet? Continue with your drawing or requirements.</p><button className={button} onClick={() => goStep(2)}>Next: sizes & supply →</button></div>
        </div>
        <div hidden={step !== 2} className="space-y-6">
        <div id="grating-project-schedule" className="scroll-mt-[40px] rounded-card bg-white p-5"><h3 className="text-xl font-bold">Your panel schedule ({project.lines.length})</h3><p className="mt-2 text-sm text-t2">Draft retained in this browser tab. Use separate lines for different sizes. Drawings can replace unknown dimensions.</p>
          <div className="mt-4 space-y-4">{project.lines.map(line => <fieldset key={line.key} className="min-w-0 rounded-card border border-border-default p-4"><legend className="px-2 font-bold">{line.mark || 'Panel'} · {gratingCatalog.find(s => s.id === line.spec)?.title || 'Per drawing / to confirm'}</legend><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{(['mark','length','width','quantity','unit','direction','notes'] as const).map(k => <label key={k} className="text-sm">{{ mark:'Panel mark', length:'Finished length', width:'Finished width', quantity:'Quantity (panels)', unit:'Dimension units', direction:'Bearing direction / drawing reference', notes:'Cutting, openings or other notes' }[k]}{k === 'unit' ? <select className={input} value={line.unit} onChange={e => edit(line.key,k,e.target.value)}><option>mm</option><option>in</option></select> : <input className={input} maxLength={1000} type={['length','width','quantity'].includes(k) ? 'number' : 'text'} min={k === 'quantity' ? 1 : 0.001} step={k === 'quantity' ? 1 : 'any'} value={line[k]} onChange={e => edit(line.key,k,e.target.value)} />}</label>)}</div><div className="mt-3 flex flex-wrap justify-between gap-3 text-sm"><p>{panelArea(line) === null ? 'Enter positive dimensions and a whole panel quantity for net area.' : `Net area: ${panelArea(line)!.toFixed(3)} m² · excludes nesting waste and packing`}</p><button className="min-h-11 underline" onClick={() => setProject(p => ({ ...p, lines: p.lines.filter(r => r.key !== line.key) }))}>Remove panel {line.mark}</button></div></fieldset>)}</div><button className={`${button} mt-4`} disabled={!ready || project.lines.length >= 30} onClick={() => add()}>Add a line from my drawing</button>
        </div>
        <div className="rounded-card bg-white p-5"><h3 className="text-xl font-bold">Complete the supply requirement</h3><div className="mt-4 grid gap-4 md:grid-cols-2">{(['stage','supply','destination','date'] as ProjectField[]).map(renderField)}</div><details className="mt-5"><summary className="cursor-pointer py-3 font-bold">Engineering, finish and document requirements (optional)</summary><div className="grid gap-4 md:grid-cols-2">{(['application','support','environment','surface','resin','color','clips','documents','loads'] as ProjectField[]).map(renderField)}</div></details><p className="mt-4 text-sm text-t2">For formal quotations, include the panel schedule or drawing, quantities and destination. We confirm cutting, fixing kits, packing, freight and Incoterm as separate parts of the supply scope.</p></div>
        <div className="flex justify-between gap-3"><button className={button} onClick={() => goStep(1)}>← Select more panels</button><button className={button} onClick={() => goStep(3)}>Next: review requirement →</button></div>
        </div>
        <div hidden={step !== 3} className="space-y-6">
        <div className="rounded-card bg-deep p-5 text-white"><h3 className="text-xl font-bold">Review your RFQ summary</h3><p className="mt-2 text-sm">Unknowns stay visible for review. Continue to add contact details and upload your drawing; nothing is sent yet.</p><div className="my-4 rounded-card bg-white p-4 text-t1"><p className="font-bold">{project.fields.stage} · {project.lines.length} panel {project.lines.length === 1 ? "line" : "lines"}</p><p className="mt-2 text-sm">Delivery: {project.fields.destination || 'To confirm'}</p><ul className="mt-3 space-y-3 text-sm">{project.lines.map(line => <li key={line.key}><strong>{line.mark} · {gratingCatalog.find(s => s.id === line.spec)?.title || 'Per drawing'}</strong><p>{line.length || '?'} × {line.width || '?'} {line.unit} · {line.quantity || '?'} panels</p></li>)}</ul><button className="mt-3 min-h-11 font-bold text-teal-text underline" onClick={() => goStep(2)}>Edit sizes and requirements</button></div>
          <details><summary className="cursor-pointer py-3 text-sm">View full specification and engineering notes</summary><pre id="grating-print-summary" className="my-4 max-h-80 overflow-auto whitespace-pre-wrap break-words rounded-tag bg-white p-4 font-sans text-sm text-t1">{summary}</pre></details><div className="flex flex-wrap gap-3"><button className="min-h-11 rounded-tag bg-white px-4 py-3 font-bold text-deep" disabled={!ready} onClick={next}>Continue to inquiry & upload drawing →</button><button className="min-h-11 rounded-tag border px-4" onClick={download}>Download summary</button><button className="min-h-11 rounded-tag border px-4" onClick={() => {
            const details = document.getElementById('grating-print-summary')?.closest('details');
            const wasOpen = details?.open;
            if (details) details.open = true;
            window.print();
            if (details) details.open = !!wasOpen;
          }}>Print summary</button></div><a className="mt-4 inline-block underline" href="/contact?source=grating-drawing&product=FRP+Grating&product_path=%2Fproducts%2Fgrating&inquiry_type=rfq">Open contact form without draft</a></div>
        </div>
        <p role="status" className="text-sm text-teal-text">{notice}</p>
        </div>
        <aside aria-label="Selected panel summary" className="sticky top-[136px] hidden rounded-card border border-border-default bg-white p-5 lg:block"><p className="text-xs font-bold uppercase tracking-widest text-teal-text">Your project</p><h3 className="mt-2 text-xl font-bold">{project.lines.length} panel {project.lines.length === 1 ? "line" : "lines"}</h3><ul className="my-4 max-h-64 space-y-3 overflow-auto text-sm">{project.lines.map(line => <li key={line.key}><strong>{line.mark}</strong> · {gratingCatalog.find(s => s.id === line.spec)?.title || 'Per drawing'}</li>)}</ul><p className="my-3 text-sm text-t2">{project.lines.length ? 'Saved in this tab. Add dimensions now or attach a drawing later.' : 'Add candidate panels, or continue with your drawing.'}</p><button className={`${button} w-full`} onClick={() => step < 3 ? goStep(step + 1) : next()}>{step < 3 ? 'Continue to next step →' : 'Contact & upload →'}</button><a className="mt-4 block text-xs text-teal-text underline" href="#grating-engineering">View supporting documents</a></aside>
        </div>
        <div data-page-bottom-bar className="fixed inset-x-0 bottom-0 z-[60] flex items-center justify-between gap-3 border-t border-border-default bg-white px-5 py-3 pb-[max(12px,env(safe-area-inset-bottom))] shadow-card lg:hidden"><span className="text-sm"><strong>{project.lines.length} panel {project.lines.length === 1 ? "line" : "lines"}</strong><br/>Step {step} of 3</span><button className={button} onClick={() => step < 3 ? goStep(step + 1) : next()}>{step < 3 ? 'Next step →' : 'Contact & upload →'}</button></div>
      </>}
      {!mode && <p role="status" className="text-sm text-teal-text">{notice}</p>}
      {project.lines.length > 0 && <a href="#grating-project-schedule" onClick={() => { if (!mode) setMode('spec'); goStep(2); }} className="inline-flex min-h-11 items-center rounded-full bg-deep px-5 text-sm font-bold text-white">Your panel schedule: {project.lines.length} lines ↓</a>}
    </div>
  </section>;
}
