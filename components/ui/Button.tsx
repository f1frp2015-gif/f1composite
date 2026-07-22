import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "text";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: ButtonVariant;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
}

const base = "inline-flex min-h-[46px] items-center justify-center rounded-[7px] font-bold transition-all duration-[0.24s] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-teal-text text-white text-f13 px-[22px] py-[11px] shadow-[0_6px_16px_rgba(0,122,116,0.16)] hover:bg-teal",
  secondary:
    "border border-border-default bg-white text-t1 text-f13 px-[21px] py-[10px] hover:border-teal-border hover:text-teal-text",
  text: "min-h-[36px] text-teal-text text-f13 font-semibold gap-[5px] hover:gap-[8px]",
};

export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
  type = "button",
  onClick,
  disabled = false,
}: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
        {variant === "text" && <span aria-hidden>→</span>}
      </Link>
    );
  }

  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled}>
      {children}
      {variant === "text" && <span aria-hidden>→</span>}
    </button>
  );
}
