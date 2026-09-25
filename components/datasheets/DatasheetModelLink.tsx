import Link from "next/link";
import { datasheetHrefForModel } from "@/lib/datasheetContent";

/** Catalog model linked to its datasheet; plain text when no datasheet is published. */
export default function DatasheetModelLink({ model }: { model: string }) {
  const href = datasheetHrefForModel(model);
  if (!href) return <>{model}</>;
  return (
    <Link
      href={href}
      prefetch={false}
      className="text-teal-text underline decoration-teal-border underline-offset-4 hover:text-teal"
    >
      {model}
    </Link>
  );
}
