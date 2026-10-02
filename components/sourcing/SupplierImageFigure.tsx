import Image from "next/image";
import Figure from "@/components/ui/Figure";
import { supplierImageNote, type SupplierImage } from "@/content/data/sourcingImages";

export default function SupplierImageFigure({ photo, number, preload = false, sizes = "(max-width: 767px) 94vw, 46vw" }: {
  photo: SupplierImage;
  number: number | string;
  preload?: boolean;
  sizes?: string;
}) {
  return (
    <Figure number={number} title={photo.title} note={supplierImageNote} caption={photo.caption} bleed>
      <div className="relative aspect-[3/2] bg-white">
        <Image src={photo.src} alt={photo.alt} fill sizes={sizes} className="object-contain" preload={preload} />
      </div>
    </Figure>
  );
}
