import { buildRfqHref } from "@/lib/rfq";
import SectionTag from "@/components/ui/SectionTag";
import LineTag from "@/components/ui/LineTag";
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
  /** Product line shown in place of the tag, e.g. { name: "F1-STRUX", label: "Standard profile" }. */
  line?: { name: string; label?: string };
  /** Up to four key figures under the description: mono labels, values in DM Sans. */
  facts?: { label: string; value: string }[];
  /** A drawing or photo beside the title on wide screens, under the description on phones. */
  figure?: React.ReactNode;
}

const FACT_COLUMNS: Record<number, string> = { 1: "sm:grid-cols-1", 2: "sm:grid-cols-2", 3: "sm:grid-cols-3", 4: "sm:grid-cols-4" };

function productQuoteHref(title: string) {
  return buildRfqHref({ source: "product-header", product: title });
}

function productAdvisorHref(title: string) {
  const prompt = `I am evaluating ${title}. Help me identify the right product configuration, required standards, specification inputs, and the details F1 Composite needs for a qualified RFQ.`;
  return `/ask?prefill=${encodeURIComponent(prompt)}`;
}

export default function PageHeader({ tag, title, description, breadcrumbs, actions, updated, line, facts, figure }: PageHeaderProps) {
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
          {/* With a figure: text top-left, figure on the right across both rows,
              facts and actions under the text. Phones stack text, figure, rest. */}
          <div className={figure ? "grid gap-[24px] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:grid-rows-[auto_1fr] lg:gap-x-[56px] lg:[grid-template-areas:'text_figure'_'meta_figure']" : undefined}>
            <div className={figure ? "lg:[grid-area:text]" : undefined}>
              {line ? <LineTag line={line.name} label={line.label} /> : <SectionTag>{tag}</SectionTag>}
              <h1 className="mt-[16px] max-w-[920px] text-[clamp(34px,4.5vw,56px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-t1">
                {title}
              </h1>
              <p className="mt-[16px] max-w-[820px] text-f18 leading-relaxed text-t2">
                {description}
              </p>
            </div>
            {figure ? <div className="lg:[grid-area:figure]">{figure}</div> : null}
            <div className={figure ? "lg:[grid-area:meta]" : undefined}>
              {facts?.length ? (
                <dl className={`mt-[20px] grid max-w-[820px] grid-cols-2 gap-px overflow-hidden rounded-card border border-border-default bg-border-default ${FACT_COLUMNS[Math.min(facts.length, 4)]}`}>
                  {facts.slice(0, 4).map((fact, index, shown) => (
                    // Two columns on phones: an odd last fact spans both, or the
                    // hairline ground would show through the empty cell.
                    <div key={fact.label} className={`bg-white px-[14px] py-[10px] ${index === shown.length - 1 && shown.length % 2 === 1 ? "col-span-2 sm:col-span-1" : ""}`}>
                      <dt className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">{fact.label}</dt>
                      <dd className="mt-[2px] text-f16 font-semibold text-t1">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
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
          </div>
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
