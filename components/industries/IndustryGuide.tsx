import Image from "next/image";
import Link from "next/link";
import Figure from "@/components/ui/Figure";
import type { IndustryGuide } from "@/content/data/industryGuides";

const mono = "font-mono text-f12 uppercase tracking-[0.06em] text-t3";
const textLink = "inline-flex min-h-[44px] items-center text-f14 font-semibold text-teal-text hover:text-teal";
const number = (index: number) => String(index + 1).padStart(2, "0");

/**
 * The application guide of an industry page: a card per application that
 * jumps to it, then one article each with its image, the components to
 * evaluate and the checks to bring to the specification. Figures number on
 * from the page header's Fig. 1.
 */
export function GuideApplications({ guide, firstFigure }: { guide: IndustryGuide; firstFigure: number }) {
  const items = guide.applications.items;
  const figures = items.map((item, index) => (item.image ? firstFigure + items.slice(0, index).filter((earlier) => earlier.image).length : null));
  return (
    <>
      <ul className="grid grid-cols-2 gap-[12px] lg:grid-cols-4 lg:gap-[16px]">
        {items.map((item, index) => {
          const thumbnail = item.image?.src ?? item.thumbnail;
          return (
            <li key={item.id}>
              <a href={`#${item.id}`} className="group flex h-full flex-col overflow-hidden rounded-card border border-border-default bg-white transition-[border-color,box-shadow] duration-200 hover:border-teal-border hover:shadow-card">
                {thumbnail ? (
                  <span className="relative block aspect-[16/10] overflow-hidden border-b border-border-default bg-bg2">
                    <Image src={thumbnail} alt="" fill sizes="(max-width: 1023px) 46vw, 290px" className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
                  </span>
                ) : null}
                <span className="flex flex-1 flex-col p-[12px] sm:p-[16px]">
                  <span className={mono}>{number(index)}</span>
                  <span className="mt-[4px] text-f16 font-bold leading-snug text-t1 transition-colors group-hover:text-teal-text">{item.label}</span>
                  <span className="mt-[4px] text-f14 leading-golden text-t2 max-sm:hidden">{item.summary}</span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
      <div className="mt-[24px] space-y-[16px]">
        {items.map((item, index) => (
          <article key={item.id} id={item.id} className="scroll-mt-[128px] rounded-card border border-border-default bg-white p-[20px] sm:p-[28px] lg:p-[36px]">
            <div className="grid grid-cols-1 gap-[24px] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.75fr)] lg:gap-[48px]">
              <div>
                <p className={mono}>
                  {number(index)} · {item.label}
                </p>
                <h3 className="mt-[8px] text-f24 font-bold leading-snug text-t1">{item.title}</h3>
                <p className="mt-[14px] text-f18 leading-golden text-t1">{item.lead}</p>
                <div className="mt-[14px] space-y-[14px] text-f16 leading-golden text-t2">
                  {item.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <ul className="mt-[12px] flex flex-wrap gap-x-[24px]">
                  {item.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className={textLink}>
                        {link.label} <span aria-hidden className="ml-[4px]">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-[16px] self-start">
                {item.image ? (
                  <Figure number={figures[index]!} title={item.label} bleed>
                    <div className="relative aspect-[3/2]">
                      <Image src={item.image.src} alt={item.image.alt} fill sizes="(max-width: 1023px) 94vw, 440px" className="object-cover" />
                    </div>
                  </Figure>
                ) : null}
                <div className="rounded-card border border-border-default bg-bg2 p-[20px]">
                  {item.components ? (
                    <>
                      <h4 className="text-f16 font-bold text-t1">Components to evaluate</h4>
                      <ul className="mt-[8px] list-disc space-y-[6px] pl-[18px] text-f14 leading-golden text-t2 marker:text-teal">
                        {item.components.map((component) => (
                          <li key={component}>{component}</li>
                        ))}
                      </ul>
                    </>
                  ) : null}
                  <h4 className={`text-f16 font-bold text-t1 ${item.components ? "mt-[16px] border-t border-border-default pt-[16px]" : ""}`}>{item.checksTitle}</h4>
                  <ul className="mt-[8px] list-disc space-y-[6px] pl-[18px] text-f14 leading-golden text-t2 marker:text-teal">
                    {item.checks.map((check) => (
                      <li key={check}>{check}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

/** Figures the application guide uses, so later figures can number on. */
export function guideFigureCount(guide: IndustryGuide) {
  return guide.applications.items.filter((item) => item.image).length;
}

/** Which product to evaluate for which job, with the checks that decide it. */
export function GuideSelection({ selection, cardTone }: { selection: IndustryGuide["selection"]; cardTone: "white" | "muted" }) {
  const th = "px-[14px] py-[8px] font-semibold text-t1";
  return (
    <>
      <div className="relative overflow-x-auto rounded-card border border-border-default bg-white" role="region" aria-label={selection.title} tabIndex={0}>
        <table className="w-full min-w-[720px] border-collapse text-left text-f14">
          <thead>
            <tr className="border-b border-border-default bg-bg2">
              {selection.head.map((heading) => (
                <th key={heading} scope="col" className={th}>
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {selection.rows.map((row) => (
              <tr key={row.need} className="border-b border-border-default align-top last:border-b-0">
                <th scope="row" className="px-[14px] py-[12px] font-semibold text-t1">{row.need}</th>
                <td className="px-[14px] py-[12px]">
                  {row.href ? (
                    <Link href={row.href} className="font-semibold text-teal-text underline-offset-4 hover:underline">
                      {row.product}
                    </Link>
                  ) : (
                    <span className="text-t1">{row.product}</span>
                  )}
                </td>
                <td className="px-[14px] py-[12px] leading-golden text-t2">{row.check}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selection.notes ? (
        <ul className={`mt-[16px] grid grid-cols-1 gap-[12px] ${selection.notes.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
          {selection.notes.map((note) => (
            <li key={note.title} className={`rounded-card border border-border-default p-[20px] sm:p-[24px] ${cardTone === "muted" ? "bg-white" : "bg-bg2"}`}>
              <h3 className="text-f16 font-bold text-t1">{note.title}</h3>
              <p className="mt-[6px] text-f14 leading-golden text-t2">{note.text}</p>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}

/** Neighboring settings the same selection method covers. */
export function GuideAdjacent({ adjacent, cardTone }: { adjacent: NonNullable<IndustryGuide["adjacent"]>; cardTone: "white" | "muted" }) {
  return (
    <>
      <ul className="grid grid-cols-1 gap-[12px] md:grid-cols-2">
        {adjacent.items.map((item) => (
          <li key={item.title} className={`flex flex-col rounded-card border border-border-default p-[20px] sm:p-[24px] ${cardTone === "muted" ? "bg-white" : "bg-bg2"}`}>
            <h3 className="text-f18 font-bold text-t1">{item.title}</h3>
            <p className="mt-[8px] text-f14 leading-golden text-t2">{item.text}</p>
            <Link href={item.link.href} className={`mt-auto pt-[8px] ${textLink}`}>
              {item.link.label} <span aria-hidden className="ml-[4px]">→</span>
            </Link>
          </li>
        ))}
      </ul>
      {adjacent.note ? (
        <p className="mt-[16px] text-f16 leading-golden text-t2">
          {adjacent.note.text}{" "}
          <Link href={adjacent.note.link.href} className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">
            {adjacent.note.link.label}
          </Link>
          .
        </p>
      ) : null}
    </>
  );
}

/** Standards and public references, each opening on its publisher's site. */
export function GuideReferences({ references }: { references: NonNullable<IndustryGuide["references"]> }) {
  return (
    <ul className="grid grid-cols-1 gap-[12px] md:grid-cols-2">
      {references.links.map((reference) => (
        <li key={reference.href}>
          <a href={reference.href} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col rounded-card border border-border-default bg-white p-[20px] transition-colors hover:border-teal-border">
            <span className={mono}>{reference.source}</span>
            <span className="mt-[4px] text-f16 font-bold leading-snug text-t1 transition-colors group-hover:text-teal-text">
              {reference.label} <span aria-hidden className="text-teal-text">↗</span>
            </span>
            {reference.text ? <span className="mt-[6px] text-f14 leading-golden text-t2">{reference.text}</span> : null}
          </a>
        </li>
      ))}
    </ul>
  );
}
