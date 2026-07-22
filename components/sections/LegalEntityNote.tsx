import Link from "next/link";

interface LegalEntityNoteProps {
  variant?: "card" | "inline" | "compact";
  className?: string;
}

const COMPANY = "Chongqing F1 Composites Co., Ltd.";

export default function LegalEntityNote({
  variant = "card",
  className = "",
}: LegalEntityNoteProps) {
  if (variant === "compact") {
    return (
      <p className={`text-f13 leading-golden text-t3 ${className}`}>
        <span className="font-medium text-t2">F1 Composite</span> is FengDu New
        Material&apos;s international export company for global FRP projects.
      </p>
    );
  }

  if (variant === "inline") {
    return (
      <p className={`text-f15 leading-golden text-t2 ${className}`}>
        <span className="font-bold text-t1">F1 Composite</span> is FengDu New
        Material&apos;s international export company. International contracts,
        engineering support, documentation, and delivery are handled by {COMPANY}
      </p>
    );
  }

  return (
    <aside
      className={`rounded-[8px] border border-border-default bg-bg2 p-[24px] ${className}`}
    >
      <h2 className="text-f19 font-bold text-t1">FengDu&apos;s international export company</h2>
      <p className="mt-[13px] text-f14 leading-golden text-t2">
        F1 Composite handles international contracts, engineering support,
        documentation, and delivery for FengDu New Material&apos;s pultruded FRP
        products under {COMPANY}.
      </p>
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
