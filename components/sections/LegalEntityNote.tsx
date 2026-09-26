import Link from "next/link";
import { company } from "@/content/data/company";

interface LegalEntityNoteProps {
  variant?: "card" | "inline" | "compact";
  className?: string;
}

const COMPANY = company.legalName;

export default function LegalEntityNote({
  variant = "card",
  className = "",
}: LegalEntityNoteProps) {
  if (variant === "compact") {
    return (
      <p className={`text-f14 leading-golden text-t3 ${className}`}>
        <span className="font-medium text-t2">F1 Composite</span> is the export
        company of FengDu New Material.
      </p>
    );
  }

  if (variant === "inline") {
    return (
      <p className={`text-f16 leading-golden text-t2 ${className}`}>
        <span className="font-bold text-t1">F1 Composite</span> is the export
        company of FengDu New Material. Contracts, engineering support, documents
        and delivery are handled by {COMPANY}.
      </p>
    );
  }

  return (
    <aside
      className={`rounded-card border border-border-default bg-bg2 p-[24px] ${className}`}
    >
      <h2 className="text-f18 font-bold text-t1">FengDu&apos;s export company</h2>
      <p className="mt-[13px] text-f14 leading-golden text-t2">
        {COMPANY} handles international contracts, engineering support,
        documents and delivery for FengDu New Material, the parent company of{" "}
        {company.manufacturer.name}.
      </p>
      <div className="mt-[16px] flex flex-wrap gap-[10px]">
        <Link
          href="/about"
          className="text-f14 font-bold text-teal-text hover:text-teal"
        >
          Company background →
        </Link>
        <Link
          href="/ask"
          className="text-f14 font-bold text-teal-text hover:text-teal"
        >
          Ask the FRP advisor →
        </Link>
      </div>
    </aside>
  );
}
