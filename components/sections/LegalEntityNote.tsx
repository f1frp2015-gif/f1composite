import Link from "next/link";

interface LegalEntityNoteProps {
  variant?: "card" | "inline" | "compact";
  className?: string;
}

const FACTS = {
  contracting: "F1 Composite Co., Ltd",
  factory: "Chongqing FengDu New Material Co., Ltd",
  factoryCN: "风渡新材料",
  legacyName: "Chongqing Xianju New Material Co., Ltd",
};

export default function LegalEntityNote({
  variant = "card",
  className = "",
}: LegalEntityNoteProps) {
  if (variant === "compact") {
    return (
      <p className={`text-f13 leading-golden text-t3 ${className}`}>
        Contracting entity: <span className="font-medium text-t2">{FACTS.contracting}</span>.
        Manufactured at our own {FACTS.factory} factory ({FACTS.factoryCN}).
      </p>
    );
  }

  if (variant === "inline") {
    return (
      <p className={`text-f15 leading-golden text-t2 ${className}`}>
        You contract with <span className="font-bold text-t1">{FACTS.contracting}</span>{" "}
        — our international contracting entity. Manufacturing happens at our own{" "}
        <span className="font-bold text-t1">{FACTS.factory}</span> ({FACTS.factoryCN}) factory:
        same group, same engineering team, same production lines. You are working
        directly with the manufacturer, never through a distributor or broker.
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
            {FACTS.factory} ({FACTS.factoryCN}) — same group, same engineering team,
            same production lines. Not outsourced.
          </dd>
        </div>
        <div className="flex flex-col gap-[2px]">
          <dt className="font-bold text-teal-text">PHI certificate legacy name</dt>
          <dd>
            Some historical PHI certificates and test reports are issued under{" "}
            {FACTS.legacyName} — this is one of the five production bases in the
            same group.
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
