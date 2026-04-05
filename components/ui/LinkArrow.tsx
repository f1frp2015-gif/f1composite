import Link from "next/link";

interface LinkArrowProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function LinkArrow({ href, children, className = "" }: LinkArrowProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-[5px] text-f13 font-semibold text-teal-text transition-all duration-[0.34s] hover:gap-[8px] ${className}`}
    >
      {children}
      <span aria-hidden>→</span>
    </Link>
  );
}
