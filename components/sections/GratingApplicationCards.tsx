import Image from "next/image";
import PageSection from "@/components/layout/PageSection";

const items = [
  { image: "/images/products/molded-frp-grating/molded-grating-coastal-walkway.webp", title: "Wet & coastal access", body: "Begin with drainage, top opening and the walking surface. Include exposure and cleaning requirements.", points: ["Surface and footwear", "Clear opening", "Support layout"], href: "#grating-help", action: "Explore selection requirements" },
  { image: "/images/products/pultruded-frp-grating/pultruded-grating-rooftop-walkway.webp", title: "Platforms & maintenance walkways", body: "Start with the support arrangement and bearing direction. Mark access openings and finished panel sizes.", points: ["Clear span and loads", "Bearing-bar direction", "Cutting and fixing scope"], href: "#grating-review", action: "Prepare an engineering review" },
];

/** Two starting jobs on the grating hub; each opens the planner in the matching mode. */
export default function GratingApplicationCards() {
  return (
    <PageSection id="grating-jobs" title="What does your walking surface need to do?">
      <div className="grid grid-cols-1 gap-[16px] md:grid-cols-2">
        {items.map((item) => (
          <article key={item.title} className="flex flex-col overflow-hidden rounded-card border border-border-default bg-white">
            <div className="relative aspect-[16/7] border-b border-border-default bg-bg2">
              <Image src={item.image} alt={`${item.title} — application reference`} fill sizes="(max-width: 767px) 94vw, 46vw" className="object-cover" />
              <span className="absolute right-[8px] top-[8px] rounded-tag bg-white/90 px-[6px] py-[2px] font-mono text-f12 uppercase tracking-[0.06em] text-t2">Catalog photo</span>
            </div>
            <div className="flex flex-1 flex-col p-[20px] sm:p-[24px]">
              <h3 className="text-f20 font-bold text-t1">{item.title}</h3>
              <p className="mt-[8px] text-f14 leading-golden text-t2">{item.body}</p>
              <ul className="mt-[14px] flex flex-wrap gap-[6px]">
                {item.points.map((point) => (
                  <li key={point} className="rounded-tag border border-border-default bg-bg2 px-[8px] py-[3px] text-f12 font-medium text-t1">{point}</li>
                ))}
              </ul>
              <a className="mt-auto inline-flex min-h-[44px] items-center pt-[14px] text-f14 font-semibold text-teal-text hover:text-teal" href={item.href}>
                {item.action} <span aria-hidden className="ml-[4px]">→</span>
              </a>
            </div>
          </article>
        ))}
      </div>
      <p className="mt-[12px] text-f14 text-t3">Application references; project specifications vary.</p>
    </PageSection>
  );
}
