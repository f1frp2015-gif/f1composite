import { whatsappHref, whatsappMessage } from "@/lib/contact";

type Variant = "solid" | "outline";

const variants: Record<Variant, string> = {
  solid: "rounded-[7px] bg-[#0d7c48] text-white hover:bg-[#0a6a3d]",
  outline: "rounded-[7px] border border-[#128c53] bg-white text-[#0d6b3f] hover:bg-[#f1faf5]",
};

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 2.9 2.9 0 0 0-.9 2.2 5 5 0 0 0 1 2.7 11.5 11.5 0 0 0 4.4 3.9c1.6.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.7-.3Z" />
    </svg>
  );
}

/**
 * WhatsApp link to sales. The pre-filled message names the topic; the click
 * tracker adds the page address when the button is used. iconOnly keeps the
 * label for screen readers only, for tight spaces such as the product bar.
 */
export default function WhatsAppButton({
  topic,
  location,
  variant = "solid",
  label = "WhatsApp",
  iconOnly = false,
  className = "",
}: {
  topic?: string;
  location: string;
  variant?: Variant;
  label?: string;
  iconOnly?: boolean;
  className?: string;
}) {
  // Padding is set here, not through className: Tailwind emits px-[18px] after smaller padding rules, so an override would not apply.
  const padding = iconOnly ? "" : "px-[18px]";
  return (
    <a
      href={whatsappHref(whatsappMessage(topic))}
      target="_blank"
      rel="noopener noreferrer"
      data-contact-location={location}
      data-whatsapp-topic={topic ?? ""}
      className={`inline-flex min-h-[46px] items-center justify-center gap-[7px] text-f14 font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#128c53] focus-visible:ring-offset-2 ${padding} ${variants[variant]} ${className}`}
    >
      <WhatsAppIcon size={iconOnly ? 22 : 18} />
      {iconOnly ? <span className="sr-only">{label}</span> : label}
    </a>
  );
}
