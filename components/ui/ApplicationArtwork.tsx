import Image from "next/image";

/** Preserve the whole drawing, including edge labels, at every viewport. */
export default function ApplicationArtwork({ src, alt, width = 1200, height = 800 }: {
  src: string; alt: string; width?: number; height?: number;
}) {
  return <>
    <Image src={src} alt={alt} width={width} height={height}
      sizes="(max-width: 1023px) 94vw, 44vw" className="h-auto w-full" preload />
    {src.endsWith(".svg") ? <a href={src} target="_blank" rel="noopener noreferrer"
      className="block border-t border-border-default px-[14px] py-[10px] text-f14 font-semibold text-teal-text underline underline-offset-4">
      Open diagram at full size <span className="sr-only">(opens in a new tab)</span>
    </a> : null}
  </>;
}
