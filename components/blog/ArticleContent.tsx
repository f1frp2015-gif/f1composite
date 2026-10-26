import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { parseArticleInline, type ArticleBlock } from "@/lib/blogContent";

export function renderInlineMarkdown(text: string, keyPrefix: string): ReactNode[] {
  return parseArticleInline(text).map((node, index) => {
    const key = `${keyPrefix}-${index}`;
    if (node.type === "text") return node.text;
    if (node.type === "strong") return <strong key={key} className="text-t1">{node.text}</strong>;
    if (node.type !== "link") return null;
    const className = "font-semibold text-teal-text hover:underline";
    return node.external ? (
      <a key={key} href={node.href} target="_blank" rel="noopener noreferrer" className={className}>{node.text}</a>
    ) : (
      <Link key={key} href={node.href} className={className}>{node.text}</Link>
    );
  });
}

export default function ArticleContent({ blocks }: { blocks: ArticleBlock[] }) {
  return blocks.map((block, index) => {
    if (block.type === "heading") {
      const Heading = block.level === 2 ? "h2" : "h3";
      return (
        <Heading key={block.id} id={block.id} className={block.level === 2
          ? "mb-[12px] mt-[40px] scroll-mt-[112px] text-f24 font-bold leading-[1.25] text-t1 first:mt-0"
          : "mb-[8px] mt-[24px] scroll-mt-[112px] text-f18 font-bold text-t1"}>
          {renderInlineMarkdown(block.content, `heading-${index}`)}
        </Heading>
      );
    }

    if (block.type === "list") {
      const List = block.ordered ? "ol" : "ul";
      return (
        <List key={index} start={block.ordered ? block.start : undefined} className={`mb-[20px] space-y-[8px] pl-[24px] text-f16 leading-golden text-t2 ${block.ordered ? "list-decimal" : "list-disc"}`}>
          {block.items.map((item, itemIndex) => <li key={itemIndex} className="pl-[4px]">{renderInlineMarkdown(item, `list-${index}-${itemIndex}`)}</li>)}
        </List>
      );
    }

    if (block.type === "table") {
      return (
        <div key={index} className="relative my-[24px] overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[520px] border-collapse text-left text-f14">
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                {block.headers.map((cell, ci) => <th key={ci} scope="col" className="px-[14px] py-[8px] font-semibold text-t1">{renderInlineMarkdown(cell, `table-head-${index}-${ci}`)}</th>)}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className="border-b border-border-default align-top last:border-b-0">
                  {row.map((cell, ci) => ci === 0 ? (
                    <th key={ci} scope="row" className="px-[14px] py-[10px] font-semibold text-t1">{renderInlineMarkdown(cell, `table-cell-${index}-${ri}-${ci}`)}</th>
                  ) : (
                    <td key={ci} className="px-[14px] py-[10px] leading-golden text-t2">{renderInlineMarkdown(cell, `table-cell-${index}-${ri}-${ci}`)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (block.type === "link") {
      const className = "inline-flex min-h-[46px] items-center gap-[8px] rounded-control border border-teal-border bg-teal-bg px-[16px] text-f14 font-semibold text-teal-text transition-colors hover:bg-teal-bg2";
      const label = <><span aria-hidden="true">↗</span>{block.label}</>;
      return <p key={index} className="my-[24px]">{block.external
        ? <a href={block.href} target="_blank" rel="noopener noreferrer" className={className}>{label}</a>
        : <Link href={block.href} className={className}>{label}</Link>}</p>;
    }

    if (block.type === "image") {
      return (
        <figure key={index} className="my-[24px] overflow-hidden rounded-card border border-border-default bg-bg2">
          <div className="relative aspect-[1.618]">
            <Image src={block.src} alt={block.alt} fill sizes="(max-width: 1023px) 100vw, 800px" loading="lazy" className="object-contain" />
          </div>
          {block.caption ? <figcaption className="border-t border-border-default bg-white px-[14px] py-[10px] text-f14 leading-golden text-t2">{renderInlineMarkdown(block.caption, `image-caption-${index}`)}</figcaption> : null}
        </figure>
      );
    }

    if (block.type === "video") {
      return (
        <figure key={index} className="my-[24px] overflow-hidden rounded-card border border-border-default bg-black">
          <video src={block.src} controls playsInline preload="metadata" className="w-full" />
          {block.caption ? <figcaption className="border-t border-border-default bg-white px-[14px] py-[10px] text-f14 leading-golden text-t2">{block.caption}</figcaption> : null}
        </figure>
      );
    }

    return <p key={index} className="mb-[16px] text-f16 leading-golden text-t2">{renderInlineMarkdown(block.content, `paragraph-${index}`)}</p>;
  });
}
