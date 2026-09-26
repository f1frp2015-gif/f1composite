import Image from "next/image";

/** Two small photos under a product page's header figure, on wide screens only. */
export default function HeroPhotos({ photos }: { photos: { src: string; alt: string; caption: string; fit?: "cover" | "contain" }[] }) {
  return (
    <ul className="mt-[12px] hidden grid-cols-2 gap-[12px] lg:grid">
      {photos.map((photo) => (
        <li key={photo.src}>
          <figure className="overflow-hidden rounded-card border border-border-default bg-white">
            <span className="relative block aspect-[16/10] bg-bg2">
              <Image src={photo.src} alt={photo.alt} fill sizes="260px" className={photo.fit === "contain" ? "bg-white object-contain" : "object-cover"} />
            </span>
            <figcaption className="border-t border-border-default px-[10px] py-[6px] font-mono text-f12 uppercase tracking-[0.06em] text-t3">{photo.caption}</figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
