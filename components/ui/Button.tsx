import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "text";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: ButtonVariant;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
}

const base = "inline-flex items-center justify-center font-bold uppercase tracking-wide transition-all duration-[0.34s]";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-teal text-white text-f13 px-[34px] py-[13px] hover:bg-teal-text",
  secondary:
    "border-[1.5px] border-border-default text-t1 text-[12px] px-[29px] py-[12px] hover:border-teal-border hover:text-teal-text",
  text: "text-teal-text text-f13 font-semibold gap-[5px] hover:gap-[8px]",
};

export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
  type = "button",
  onClick,
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
    <button type={type} className={cls} onClick={onClick}>
      {children}
      {variant === "text" && <span aria-hidden>→</span>}
    </button>
  );
}
