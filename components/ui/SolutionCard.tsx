import Image from "next/image";
import Link from "next/link";

interface SolutionCardProps {
  title: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
  image?: string;
  imageAlt?: string;
  imageScale?: number;
}

export default function SolutionCard({ title, description, href, icon, image, imageAlt, imageScale }: SolutionCardProps) {
  if (image) {
    const scale = imageScale ?? 1;
    return (
      <Link
        href={href}
        className="group relative block overflow-hidden rounded-[8px] border border-border-default bg-white transition-all duration-[0.34s] hover:-translate-y-[2px] hover:border-teal-border hover:shadow-[0_8px_30px_rgba(0,161,153,0.05)]"
      >
        <div className="card-topbar absolute inset-x-0 top-0 z-[1] rounded-t-[8px]" />
        <div className="relative aspect-square overflow-hidden bg-bg2">
          <Image
            src={image}
            alt={imageAlt ?? title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-[0.55s] scale-[var(--img-scale)] group-hover:scale-[calc(var(--img-scale)*1.05)]"
            style={{ ["--img-scale" as string]: scale }}
          />
        </div>
        <div className="p-[21px]">
          <h3 className="mb-[8px] text-[17px] font-bold text-t1">{title}</h3>
          <p className="text-f13 leading-golden text-t2">{description}</p>
          <span className="mt-[13px] block text-f13 font-semibold text-teal-text opacity-0 transition-opacity duration-[0.34s] group-hover:opacity-100">
            View profiles →
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="group relative block rounded-[8px] border border-border-default bg-white p-[34px] transition-all duration-[0.34s] hover:-translate-y-[2px] hover:border-teal-border hover:shadow-[0_8px_30px_rgba(0,161,153,0.05)]"
    >
      <div className="card-topbar absolute inset-x-0 top-0 rounded-t-[8px]" />
      <div className="mb-[13px] flex h-[36px] w-[36px] items-center justify-center rounded-[6px] bg-teal-bg">
        {icon}
      </div>
      <h3 className="mb-[8px] text-[17px] font-bold text-t1">{title}</h3>
      <p className="text-f13 leading-golden text-t2">{description}</p>
      <span className="mt-[13px] block text-f13 font-semibold text-teal-text opacity-0 transition-opacity duration-[0.34s] group-hover:opacity-100">
        View profiles →
      </span>
    </Link>
  );
}
