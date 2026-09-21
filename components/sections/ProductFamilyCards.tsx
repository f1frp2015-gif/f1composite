import Image from "next/image";
import Link from "next/link";
import { productFamilies } from "@/content/data/productTaxonomy";

export default function ProductFamilyCards() {
  return (
    <div className="grid gap-[20px] md:grid-cols-2">
      {productFamilies.map((family, index) => (
        <article
          key={family.id}
          id={family.id}
          className={`overflow-hidden rounded-[12px] border border-border-default ${index < 2 ? "bg-white" : "bg-bg2"}`}
        >
          <div
            className={`grid ${index < 2 ? "sm:grid-cols-[0.85fr_1.15fr]" : "grid-cols-[100px_1fr] sm:grid-cols-[150px_1fr]"}`}
          >
            <Link
              href={family.href}
              className={`relative block bg-[#f1f4f5] ${index < 2 ? "min-h-[190px]" : "min-h-[150px]"}`}
              aria-label={`Explore ${family.label}`}
            >
              <Image
                src={family.image}
                alt={family.imageAlt}
                fill
                sizes="(max-width: 640px) 90vw, 25vw"
                className="object-contain p-[12px]"
              />
            </Link>
            <div className="p-[20px] sm:p-[24px]">
              <p className="text-f11 font-bold uppercase tracking-[0.1em] text-teal-text">
                {index < 2 ? "Pultruded profiles" : "Product range"}
              </p>
              <h3 className="mt-[8px] text-f24 font-bold leading-tight text-t1">
                <Link href={family.href} className="hover:text-teal-text">
                  {family.label}
                </Link>
              </h3>
              <p className="mt-[10px] text-f14 leading-relaxed text-t2">
                {family.description}
              </p>
              <Link
                href={family.href}
                className="mt-[14px] inline-flex min-h-[36px] items-center text-f13 font-bold text-teal-text"
              >
                Explore range →
              </Link>
            </div>
          </div>
          <ul className="flex flex-wrap gap-x-[18px] gap-y-[4px] border-t border-border-default px-[20px] py-[12px]">
            {family.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-[36px] items-center text-f13 font-semibold text-t2 underline decoration-border-default underline-offset-4 hover:text-teal-text"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
