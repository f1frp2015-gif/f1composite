import { buildRebarRfqHref } from "@/lib/rebarInquiry";
import { productFamilies } from "@/content/data/productTaxonomy";
import { buildRfqHref } from "@/lib/rfq";
import Image from "next/image";
import Link from "next/link";
import CookieSettingsButton from "@/components/consent/CookieSettingsButton";
import { whatsappHref, whatsappMessage } from "@/lib/contact";
import { footerNav, type NavLink } from "@/content/data/navigation";

// One column per main menu, in the same order.
const columns = [
  { title: "Products", links: footerNav.products },
  { title: "Industries", links: footerNav.industries },
  { title: "Tools", links: footerNav.tools },
  { title: "Resources", links: footerNav.resources },
  { title: "Company", links: footerNav.company },
] as const;

function FooterLinks({ links }: { links: readonly NavLink[] }) {
  return (
    <ul className="mt-[11px] space-y-[5px]">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            prefetch={false}
            className="inline-flex min-h-[32px] items-center text-f14 text-t2 transition-colors hover:text-teal-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Footer() {
  return (
    <footer className="bg-bg2 pb-[72px] md:pb-0">
      <div className="bg-deep">
        <div className="site-container flex flex-col gap-[18px] py-[28px] md:flex-row md:items-center md:justify-between md:py-[32px]">
          <div>
            <p className="text-f12 font-bold uppercase tracking-[0.14em] text-teal">Engineering &amp; RFQ support</p>
            <p className="mt-[5px] text-[clamp(21px,2.1vw,28px)] font-bold leading-tight tracking-[-0.02em] text-white">
              Tell us what you need
            </p>
            <p className="mt-[5px] text-f14 text-white/70">Start with your name and email. We can confirm product details together.</p>
            <div className="mt-[12px] flex flex-wrap gap-x-[18px] gap-y-[8px]">{productFamilies.map(family => <Link key={family.id} href={family.id === "rebar" ? buildRebarRfqHref() : buildRfqHref({ source: "footer-family", product: family.label, productPath: family.href })} className="inline-flex min-h-[32px] items-center text-f14 font-semibold text-white underline underline-offset-4 hover:text-teal">{family.label}</Link>)}</div>
          </div>
          <div className="flex flex-wrap items-center gap-x-[18px] gap-y-[10px]">
            <Link
              href="/contact?source=footer-cta&inquiry_type=rfq"
              className="inline-flex min-h-[46px] items-center justify-center rounded-control bg-teal-text px-[20px] text-f14 font-bold text-white transition-colors hover:bg-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Get a Quote
            </Link>
            <a
              href={whatsappHref(whatsappMessage())}
              target="_blank"
              rel="noopener noreferrer"
              data-contact-location="footer-cta"
              data-whatsapp-topic=""
              className="text-f14 font-bold text-white underline decoration-white/35 underline-offset-4 transition-colors hover:text-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              WhatsApp sales
            </a>
          </div>
        </div>
      </div>

      <div className="site-container py-[28px] md:py-[32px]">
        <div className="grid grid-cols-2 gap-x-[24px] gap-y-[26px] sm:grid-cols-3 lg:grid-cols-[1.4fr_repeat(5,minmax(0,1fr))]">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Link
              href="/"
              aria-label="F1 Composite home"
              className="inline-block rounded-control focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
            >
              <Image
                src="/brand/f1-logo.png"
                alt="F1 Composite"
                width={57}
                height={39}
              />
            </Link>
            <p className="mt-[11px] max-w-[300px] text-f14 leading-relaxed text-t2">
              Standard and custom pultruded FRP profiles, grating, window and door profiles, finished windows and doors, and GFRP concrete reinforcement.
            </p>
            <div className="mt-[12px] flex flex-col items-start gap-[6px]">
              <a href="mailto:inquiry@f1composite.com" className="text-f14 font-semibold text-teal-text hover:text-teal">
                inquiry@f1composite.com
              </a>
            </div>
          </div>

          {columns.map((column) => (
            <section key={column.title} aria-labelledby={`footer-${column.title.toLowerCase()}`}>
              <h2 id={`footer-${column.title.toLowerCase()}`} className="text-f14 font-bold text-t1">
                {column.title}
              </h2>
              <FooterLinks links={column.links} />
            </section>
          ))}
        </div>

        <div className="mt-[22px] flex flex-col gap-[10px] border-t border-border-default pt-[17px] text-f12 text-t3 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Chongqing F1 Composites Co., Ltd.</span>
          <div className="flex flex-wrap items-center gap-x-[16px] gap-y-[6px]">
            <Link href="/privacy" className="hover:text-teal-text">Privacy</Link>
            <Link href="/terms" className="hover:text-teal-text">Terms</Link>
            <CookieSettingsButton className="hover:text-teal-text" />
            <a
              href="https://tradeos.f1composite.com/login"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-text"
            >
              Customer login
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
