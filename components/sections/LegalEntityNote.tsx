import Link from "next/link";

interface LegalEntityNoteProps {
  variant?: "card" | "inline" | "compact";
  className?: string;
}

const FACTS = {
  contracting: "F1 Composite Co., Ltd",
  factory: "Chongqing FengDu New Material Co., Ltd",
};

export default function LegalEntityNote({
  variant = "card",
  className = "",
}: LegalEntityNoteProps) {
  if (variant === "compact") {
    return (
      <p className={`text-f13 leading-golden text-t3 ${className}`}>
        Contracting entity: <span className="font-medium text-t2">{FACTS.contracting}</span>.
        Manufactured by our long-term manufacturing partner {FACTS.factory} — direct from the factory, no trading middleman.
      </p>
    );
  }

  if (variant === "inline") {
    return (
      <p className={`text-f15 leading-golden text-t2 ${className}`}>
        You contract with <span className="font-bold text-t1">{FACTS.contracting}</span>{" "}
        — our international contracting entity. Manufacturing happens at our long-term manufacturing partner{" "}
        <span className="font-bold text-t1">{FACTS.factory}</span>:
        the factory F1 Composite exports from directly. You contract with the export entity and receive material straight from the factory, never through a distributor or broker.
      </p>
    );
  }

  return (
    <aside
      className={`rounded-[8px] border border-border-default bg-bg2 p-[24px] ${className}`}
    >
      <h2 className="text-f19 font-bold text-t1">Who you contract with</h2>
      <dl className="mt-[13px] space-y-[10px] text-f14 leading-golden text-t2">
        <div className="flex flex-col gap-[2px]">
          <dt className="font-bold text-teal-text">Contracting entity</dt>
          <dd>{FACTS.contracting} — international orders, invoicing, export documents.</dd>
        </div>
        <div className="flex flex-col gap-[2px]">
          <dt className="font-bold text-teal-text">Manufacturing</dt>
          <dd>
            {FACTS.factory} — our long-term manufacturing partner; the factory F1 Composite exports from directly. Not outsourced to a job shop.
          </dd>
        </div>
        <div className="flex flex-col gap-[2px]">
          <dt className="font-bold text-teal-text">PHI certificate provenance</dt>
          <dd>
            Some historical PHI certificates and test reports were issued under a
            legacy production-base name used by the manufacturing partner,
            verifiable via PHI Component-ID 2491wi03 — one of the five production
            bases.
          </dd>
        </div>
      </dl>
      <div className="mt-[16px] flex flex-wrap gap-[10px]">
        <Link
          href="/about"
          className="text-f13 font-bold text-teal-text hover:text-teal"
        >
          Company background →
        </Link>
        <Link
          href="/ask"
          className="text-f13 font-bold text-teal-text hover:text-teal"
        >
          Ask the FRP advisor →
        </Link>
      </div>
    </aside>
  );
}
