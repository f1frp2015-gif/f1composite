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
    <section className="bg-white py-[89px]">
      <div className="mx-auto max-w-[1280px] px-[34px]">
        <Breadcrumbs items={breadcrumbs} />
        <SectionTag>{tag}</SectionTag>
        <h1 className="mt-[21px] max-w-[640px] text-[clamp(34px,4vw,50px)] font-extrabold leading-[1.1] tracking-[-0.03em] text-t1">
          {title}
        </h1>
        <p className="mt-[21px] max-w-[560px] text-f19 leading-golden text-t2">
          {description}
        </p>
      </div>
    </section>
  );
}
