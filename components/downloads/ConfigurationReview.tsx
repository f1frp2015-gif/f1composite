import Link from "next/link";
import PageSection from "@/components/layout/PageSection";
import { catalogEvidenceProductPath, catalogEvidenceLabels } from "@/content/data/evidenceApplicability";
import { buildRfqHref } from "@/lib/rfq";
import { procurementRfqContext, type ProcurementSelection } from "@/lib/catalog/procurement";
import type { PublishedCatalog } from "@/lib/catalog/published";

export default function ConfigurationReview({ selection, catalog, category }: { selection: ProcurementSelection; catalog: PublishedCatalog; category: string }) {
  const profiles = catalog.profiles.filter((profile) => profile.category?.slug === category);
  const current = selection.status === "selected" ? selection : null;
  const pack = current?.pack;
  const configuration = current?.configuration;
  const quote = pack && current ? buildRfqHref({
    source: "configuration-evidence",
    product: current.profile.product.model,
    productPath: catalogEvidenceProductPath(category),
    context: procurementRfqContext(pack),
    message: `Please review the configuration and release documents for ${current.profile.product.model}.\nCatalog key: ${configuration?.catalogKey}\nFormulation dataset: ${configuration?.formulationCode}\nCatalog revision: ${catalog.revision}\nEvidence status: ${configuration?.evidence.status}\nApproved drawing number / revision: to confirm\nCut lengths / quantities:\nMachining features / datums / tolerances:\nService environment / loads:\nRequired reports and inspection records:\nPacking and delivery destination:\n\nThe linked CAD and material data are references; please confirm the offered configuration and applicable evidence.`,
  }) : null;
  const linkClass = "font-semibold text-teal-text underline underline-offset-4";
  return <PageSection id="configuration" title="Review a catalog configuration" tone="muted" intro="Keep the section, material dataset and catalog revision together when comparing documents or requesting a quote.">
    {(selection.status === "invalid" || selection.status === "stale") && <p role="alert" className="mb-[20px] rounded-card border border-border-default bg-white p-[16px] text-f16 text-t1">{selection.message}</p>}
    {profiles.length > 0 ? <form action="/resources/evidence" method="get" className="mb-[24px] flex flex-wrap items-end gap-[12px]">
      <input type="hidden" name="category" value={category} />
      <input type="hidden" name="revision" value={catalog.revision} />
      <label className="w-full min-w-0 text-f14 font-semibold text-t1 sm:min-w-[220px] sm:flex-1">Profile and default material dataset
        <select name="profile" defaultValue={current?.profile.catalogKey ?? ""} required className="mt-[6px] min-h-[44px] w-full rounded-control border border-border-default bg-white px-[12px] text-f16">
          <option value="" disabled>Select a current profile</option>
          {profiles.map((profile) => <option key={profile.catalogKey} value={profile.catalogKey}>{profile.product.model} · {profile.formulation?.code ?? "Material to confirm"}</option>)}
        </select>
      </label>
      <label className="w-full min-w-0 text-f14 font-semibold text-t1 sm:min-w-[220px] sm:flex-1">Material dataset
        <select name="formulation" defaultValue={configuration?.formulationCode ?? "default"} className="mt-[6px] min-h-[44px] w-full rounded-control border border-border-default bg-white px-[12px] text-f16">
          <option value="default">Use this profile&apos;s default dataset</option>
          {catalog.formulations.map((material) => <option key={material.code} value={material.code}>{material.code} · {material.name}</option>)}
        </select>
      </label>
      <button type="submit" className="min-h-[44px] w-full rounded-control bg-teal px-[18px] py-[10px] text-f14 font-semibold text-white hover:bg-teal-text sm:w-auto">Review documents</button>
    </form> : <p><Link href="/tools/profile-finder" className={linkClass}>Select a structural profile</Link></p>}
    {pack && configuration && current ? <>
      <dl className="grid gap-[16px] text-f14 sm:grid-cols-2 lg:grid-cols-4">
        {[["Profile", current.profile.product.model], ["Catalog reference", configuration.sectionId ?? configuration.catalogKey], ["Material dataset", configuration.formulationCode ?? "To confirm"], ["Catalog revision", catalog.revision]].map(([label, value]) => <div key={label}><dt className="font-semibold text-t1">{label}</dt><dd className="mt-[4px] break-words text-t2">{value}</dd></div>)}
      </dl>
      <p className="mt-[16px] font-bold text-t1">{catalogEvidenceLabels[configuration.evidence.status]}</p>
      <p className="mt-[6px] max-w-[900px] leading-golden text-t2">{configuration.evidence.summary}</p>
      <p className="mt-[6px] text-f14 text-t2">Catalog references identify website records, not manufacturer SKUs, stock or a tested specimen. All quoted dimensions are nominal millimetres; mass is in kg/m.</p>
      <div className="mt-[24px] grid gap-[16px] md:grid-cols-2">
        <section className="rounded-card border border-border-default bg-white p-[20px]"><h3 className="text-f18 font-bold text-t1">1. Dimensions and material</h3><p className="mt-[8px] text-f14 leading-golden text-t2">{pack.datasheet.scope} The PDF preserves this selected material and catalog revision. The HTML datasheet shows the profile&apos;s default material dataset.</p><p className="mt-[12px] flex flex-wrap gap-[18px] text-f14"><Link href={pack.datasheet.html} className={linkClass}>HTML datasheet</Link><a href={pack.datasheet.pdf} className={linkClass}>Selected reference PDF</a></p></section>
        <section className="rounded-card border border-border-default bg-white p-[20px]"><h3 className="text-f18 font-bold text-t1">2. Drawing and revision</h3><p className="mt-[8px] text-f14 leading-golden text-t2">{pack.drawing.scope}</p><p className="mt-[12px] text-f14">{pack.drawing.href ? <a href={pack.drawing.href} download className={linkClass}>Nominal section DXF</a> : "No matching public DXF is available for this geometry."}</p><p className="mt-[8px] text-f14 text-t2">Approved manufacturing drawing: to be agreed.</p></section>
        <section className="rounded-card border border-border-default bg-white p-[20px]"><h3 className="text-f18 font-bold text-t1">3. Reports and applicability</h3><p className="mt-[8px] text-f14 leading-golden text-t2">No public test report currently binds this exact section and formulation to its tested specimen. A report for another tube or resin cannot establish its performance.</p>{pack.technicalReferences.map((reference) => <p key={reference.id} className="mt-[12px] text-f14 leading-golden"><a href={reference.href} className={linkClass}>{reference.reference}</a><span className="mt-[4px] block text-t2">{reference.scope}</span></p>)}</section>
        <section className="rounded-card border border-border-default bg-white p-[20px]"><h3 className="text-f18 font-bold text-t1">4. Machining and inspection</h3><p className="mt-[8px] text-f14 leading-golden text-t2">{pack.firstArticle.scope}</p><p className="mt-[12px] flex flex-wrap gap-[18px] text-f14"><Link href="/technology/frp-profile-machining" className={linkClass}>Machining and datum guidance</Link><a href={pack.firstArticle.template} download className={linkClass}>Blank first-article record (CSV)</a></p></section>
      </div>
      <div className="mt-[24px] rounded-card border border-border-default bg-white p-[20px]"><h3 className="text-f18 font-bold text-t1">5. Confirm the release package</h3><ul className="mt-[12px] grid list-disc gap-[8px] pl-[20px] text-f14 text-t2 sm:grid-cols-2">{pack.requiredForRelease.map((item) => <li key={item}>{item}</li>)}</ul>{quote && <Link href={quote} prefetch={false} className="mt-[20px] inline-flex min-h-[44px] items-center rounded-control bg-teal px-[18px] py-[10px] text-f14 font-semibold text-white hover:bg-teal-text">Request a review with this configuration →</Link>}</div>
    </> : <p className="max-w-[900px] text-f14 leading-golden text-t2">Choose a profile to review its current nominal dimensions, reference drawing, material and evidence scope. A family name or resin grade alone does not identify a tested configuration.</p>}
    <p className="mt-[20px] text-f14"><Link href="/resources/evidence" className={linkClass}>View the full evidence library</Link></p>
  </PageSection>;
}
