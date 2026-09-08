import Link from "next/link";

/** A short, product-specific purchasing clarification; rendered on the server. */
export default function MaterialTerminologyNote({ title, children }: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <aside aria-label={title} className="border-b border-border-default bg-bg2">
      <div className="mx-auto max-w-[1280px] px-[20px] py-[21px] sm:px-[34px]">
        <h2 className="text-f15 font-bold text-t1">{title}</h2>
        <p className="mt-[8px] max-w-[960px] text-f13 leading-golden text-t2">
          {children}{" "}
          <Link href="/what-is-frp#terminology" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">
            FRP, GRP and GFRP explained
          </Link>.
        </p>
      </div>
    </aside>
  );
}
