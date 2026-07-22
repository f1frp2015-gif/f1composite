import SectionTag from "@/components/ui/SectionTag";
import Breadcrumbs, { BreadcrumbItem } from "@/components/layout/Breadcrumbs";

interface PageHeaderProps {
  tag: string;
  title: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
}

export default function PageHeader({ tag, title, description, breadcrumbs }: PageHeaderProps) {
  return (
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
      </div>
    </section>
  );
}
