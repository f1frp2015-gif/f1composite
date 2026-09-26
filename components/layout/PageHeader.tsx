import { buildRfqHref } from "@/lib/rfq";
import SectionTag from "@/components/ui/SectionTag";
import Button from "@/components/ui/Button";
import Breadcrumbs, { BreadcrumbItem } from "@/components/layout/Breadcrumbs";
import MobileActionBar from "@/components/layout/MobileActionBar";
import WhatsAppButton from "@/components/contact/WhatsAppButton";
import { formatShortDate } from "@/lib/dates";

interface PageHeaderAction {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
}

interface PageHeaderActions {
  primary: PageHeaderAction;
  secondary?: PageHeaderAction;
  note?: string;
  stickyMobile?: boolean;
}

interface PageHeaderProps {
  tag: string;
  title: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
  actions?: PageHeaderActions;
  /** Date of the page's last content review, YYYY-MM-DD. Keep it equal to the page's JSON-LD dateModified. */
  updated?: string;
}

function productQuoteHref(title: string) {
  return buildRfqHref({ source: "product-header", product: title });
}

function productAdvisorHref(title: string) {
  const prompt = `I am evaluating ${title}. Help me identify the right product configuration, required standards, specification inputs, and the details F1 Composite needs for a qualified RFQ.`;
  return `/ask?prefill=${encodeURIComponent(prompt)}`;
}

export default function PageHeader({ tag, title, description, breadcrumbs, actions, updated }: PageHeaderProps) {
  const isProductPage = breadcrumbs.some(
    (item) => item.label === "Products" || item.href === "/pultruded-frp-profiles",
  );
  const resolvedActions: PageHeaderActions | undefined =
    actions ??
    (isProductPage
      ? {
          primary: { label: "Quote This Product", href: productQuoteHref(title) },
          secondary: { label: "Ask the AI Assistant", href: productAdvisorHref(title), variant: "secondary" },
          note: "Start with your name and email. Product details and drawings can follow.",
          stickyMobile: true,
        }
      : undefined);
  // Product titles read naturally in "I'm interested in …"; other pages send the page address only.
  const whatsappTopic = isProductPage ? title : undefined;

  return (
    <>
      <section className="border-b border-border-default bg-[linear-gradient(180deg,#ffffff_0%,#f7f9fa_100%)] py-[32px] md:py-[44px]">
        <div className="site-container">
          <Breadcrumbs items={breadcrumbs.map(item => item.label === "Products" && item.href ? { ...item, href: "/products/product-lines" } : item)} />
          <SectionTag>{tag}</SectionTag>
          <h1 className="mt-[16px] max-w-[920px] text-[clamp(34px,4.5vw,56px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-t1">
            {title}
          </h1>
          <p className="mt-[16px] max-w-[820px] text-f18 leading-relaxed text-t2">
            {description}
          </p>
          {updated ? (
            <p className="mt-[10px] text-f14 text-t3">
              Last updated <time dateTime={updated}>{formatShortDate(updated)}</time>
            </p>
          ) : null}

          {resolvedActions ? (
            <div id="page-header-actions" className="mt-[24px] flex flex-col items-start gap-[10px] sm:flex-row sm:flex-wrap sm:items-center">
              <Button href={resolvedActions.primary.href} variant={resolvedActions.primary.variant ?? "primary"}>
                {resolvedActions.primary.label}
              </Button>
              {resolvedActions.secondary ? (
                <Button href={resolvedActions.secondary.href} variant={resolvedActions.secondary.variant ?? "secondary"}>
                  {resolvedActions.secondary.label}
                </Button>
              ) : null}
              <WhatsAppButton topic={whatsappTopic} location="page-header" variant="outline" />
              {resolvedActions.note ? (
                <p className="max-w-[430px] text-f12 leading-relaxed text-t3 sm:ml-[4px]">
                  {resolvedActions.note}
                </p>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>

      {resolvedActions?.stickyMobile ? (
        <MobileActionBar
          targetId="page-header-actions"
          primary={resolvedActions.primary}
          secondary={resolvedActions.secondary}
          whatsappTopic={whatsappTopic}
        />
      ) : null}
    </>
  );
}
