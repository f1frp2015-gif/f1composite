import SectionTag from "@/components/ui/SectionTag";
import Button from "@/components/ui/Button";
import Breadcrumbs, { BreadcrumbItem } from "@/components/layout/Breadcrumbs";
import MobileActionBar from "@/components/layout/MobileActionBar";

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
}

function productQuoteHref(title: string) {
  const params = new URLSearchParams({
    source: "product-header",
    inquiry_type: "rfq",
    message: `I am interested in ${title}. Please send me the available sizes or system options, technical data, minimum order quantity, lead time, and delivered pricing.`,
  });
  return `/contact?${params.toString()}`;
}

function productAdvisorHref(title: string) {
  const prompt = `I am evaluating ${title}. Help me identify the right product configuration, required standards, specification inputs, and the details F1 Composite needs for a qualified RFQ.`;
  return `/ask?prefill=${encodeURIComponent(prompt)}`;
}

export default function PageHeader({ tag, title, description, breadcrumbs, actions }: PageHeaderProps) {
  const isProductPage = breadcrumbs.some(
    (item) => item.label === "Products" || item.href === "/pultruded-frp-profiles",
  );
  const resolvedActions: PageHeaderActions | undefined =
    actions ??
    (isProductPage
      ? {
          primary: { label: "Quote This Product", href: productQuoteHref(title) },
          secondary: { label: "Ask an Engineer", href: productAdvisorHref(title), variant: "secondary" },
          note: "Send the dimensions, quantity, service environment, and destination for a scoped response.",
          stickyMobile: true,
        }
      : undefined);

  return (
    <>
      <section className="border-b border-border-default bg-[linear-gradient(180deg,#ffffff_0%,#f7f9fa_100%)] py-[52px] md:py-[72px]">
        <div className="mx-auto max-w-[1320px] px-[20px] sm:px-[28px] lg:px-[36px]">
          <Breadcrumbs items={breadcrumbs} />
          <SectionTag>{tag}</SectionTag>
          <h1 className="mt-[16px] max-w-[920px] text-[clamp(34px,4.5vw,56px)] font-extrabold leading-[1.08] tracking-[-0.035em] text-t1">
            {title}
          </h1>
          <p className="mt-[16px] max-w-[820px] text-f19 leading-relaxed text-t2">
            {description}
          </p>

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
        />
      ) : null}
    </>
  );
}
