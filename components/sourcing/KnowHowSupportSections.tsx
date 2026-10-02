import SupplierImageFigure from "@/components/sourcing/SupplierImageFigure";
import { frpzsImages } from "@/content/data/sourcingImages";
import Image from "next/image";
import PageSection from "@/components/layout/PageSection";
import Figure from "@/components/ui/Figure";
import type { KnowHowSection } from "@/content/data/knowhowSupport";

export default function KnowHowSupportSections({ sections }: { sections: KnowHowSection[] }) {
  return sections.map((section, index) => (
    <PageSection key={section.id} id={section.id} title={section.title} intro={section.intro} tone={index % 2 ? "muted" : "white"}>
      {section.id === "preforming" ? (
        <div className="mb-[24px] grid items-start gap-[16px] lg:grid-cols-2">
          <SupplierImageFigure photo={frpzsImages.dieGuides} number={2} />
          <Figure number={3} title="Reinforcement route and progressive forming" caption="The preformer sequence and injection location depend on the selected process; final geometry follows the approved tooling design.">
            <Image src="/images/sourcing/preforming-tooling-interfaces.svg" alt="Roving, mat and veil pass through numbered guide plates around a supported mandrel before the die" width={1200} height={520} className="h-auto w-full" />
          </Figure>
        </div>
      ) : null}
      {section.id === "line-configurations" ? <div className="mb-[24px] max-w-[640px]"><SupplierImageFigure photo={frpzsImages.crawlerLine} number={2} /></div> : null}
      {section.id === "injection-package" ? <div className="mb-[24px] max-w-[640px]"><SupplierImageFigure photo={frpzsImages.injectionTanks} number={2} /></div> : null}
      <div className="overflow-x-auto rounded-card border border-border-default bg-white" role="region" aria-label={`${section.title} specification table`} tabIndex={0}>
        <table className="w-full min-w-[680px] text-left text-f14 leading-golden">
          <caption className="sr-only">{section.title}: scope, inputs and delivery records</caption>
          <thead className="bg-deep text-white"><tr>{["Module / stage", "Define before procurement", "Required output / record"].map(label => <th key={label} scope="col" className="p-[16px]">{label}</th>)}</tr></thead>
          <tbody className="divide-y divide-border-default">{section.rows.map(([name, input, output]) => <tr key={name}><th scope="row" className="p-[16px] align-top font-semibold text-t1">{name}</th><td className="p-[16px] align-top text-t2">{input}</td><td className="p-[16px] align-top text-t2">{output}</td></tr>)}</tbody>
        </table>
      </div>
    </PageSection>
  ));
}
