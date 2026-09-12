import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import FAQ from "@/components/ui/FAQ";
import JsonLd from "@/components/seo/JsonLd";
import { windowProcurement } from "@/content/data/windowProcurement";
import { buildProductFamilyPageSchema } from "@/lib/seo";
import { buildRfqHref } from "@/lib/rfq";

export default function WindowProcurementPage({
  mode,
}: {
  mode: keyof typeof windowProcurement;
}) {
  const page = windowProcurement[mode];
  const other =
    windowProcurement[mode === "profiles" ? "finished" : "profiles"];
  const quote = buildRfqHref({
    source: "window-procurement",
    product: page.h1,
    productPath: page.path,
    message: page.message,
  });
  const wrap = "mx-auto max-w-[1320px] px-[20px] sm:px-[28px] lg:px-[36px]";
  return (
    <>
      <JsonLd
        data={buildProductFamilyPageSchema({
          name: page.h1,
          description: page.description,
          path: page.path,
          image: page.image,
          category: "Windows & Doors",
          schemaType: "ItemPage",
        })}
      />
      <PageHeader
        tag="Windows & Doors"
        title={page.h1}
        description={page.intro}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products/product-lines" },
          { label: "Windows & Doors", href: "/products/frp-window-frames" },
          {
            label:
              mode === "profiles"
                ? "Profiles for Fabricators"
                : "Finished Units",
          },
        ]}
        actions={{
          primary: { label: page.action, href: quote },
          secondary: {
            label:
              mode === "profiles"
                ? "Need Finished Units?"
                : "Need Profiles Only?",
            href: other.path,
          },
        }}
      />
      <section className="bg-white py-[48px]">
        <div className={`${wrap} grid items-center gap-[32px] lg:grid-cols-2`}>
          <div>
            <h2 className="text-f24 font-bold text-t1">
              Define the purchasing scope
            </h2>
            <dl className="mt-[20px] space-y-[16px]">
              <div>
                <dt className="text-f13 font-bold text-teal-text">
                  Who this is for
                </dt>
                <dd className="mt-[6px] text-f15 text-t2">{page.buyer}</dd>
              </div>
              <div>
                <dt className="text-f13 font-bold text-teal-text">
                  What is supplied
                </dt>
                <dd className="mt-[6px] text-f15 text-t2">{page.supply}</dd>
              </div>
            </dl>
            <p className="mt-[20px] text-f15 leading-relaxed text-t2">
              {page.decision}
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[12px] bg-bg2">
            <Image
              src={page.image}
              alt={page.imageAlt}
              fill
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-contain p-[18px]"
            />
          </div>
        </div>
      </section>
      <section className="bg-bg2 py-[48px]">
        <div className={wrap}>
          <h2 className="text-f31 font-bold text-t1">
            {mode === "profiles"
              ? "Specify the profile set"
              : "Choose the opening type"}
          </h2>
          <div className="mt-[24px] grid gap-[20px] md:grid-cols-2">
            {page.sections.map(([title, body]) => (
              <article
                key={title}
                className="rounded-[10px] border border-border-default bg-white p-[24px]"
              >
                <h3 className="text-f19 font-bold text-t1">{title}</h3>
                <p className="mt-[10px] text-f15 leading-relaxed text-t2">
                  {body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white py-[48px]">
        <div className={`${wrap} grid gap-[32px] lg:grid-cols-2`}>
          <div>
            <h2 className="text-f24 font-bold text-t1">
              Information for your quotation
            </h2>
            <ul className="mt-[16px] list-disc space-y-[10px] pl-[20px] text-f15 text-t2">
              {page.checklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Link
              href={quote}
              className="mt-[24px] inline-flex min-h-[46px] items-center rounded-[7px] bg-teal-text px-[22px] text-f14 font-bold text-white"
            >
              {page.action}
            </Link>
          </div>
          <div>
            <h2 className="text-f24 font-bold text-t1">
              Data and assembly performance
            </h2>
            <p className="mt-[16px] text-f15 leading-relaxed text-t2">
              {page.evidence}
            </p>
            <ul className="mt-[18px] space-y-[12px] text-f14 font-semibold text-teal-text">
              <li>
                <Link href="/downloads/f1composite-frp-window-door-catalog.pdf">
                  Window and door catalog (PDF) →
                </Link>
              </li>
              <li>
                <Link href="/resources/evidence">
                  Original reports and their scope →
                </Link>
              </li>
              <li>
                <Link
                  href={
                    mode === "profiles"
                      ? "/products/frp-window-reinforcement"
                      : "/technology/frp-u-value-calculator"
                  }
                >
                  {mode === "profiles"
                    ? "Window reinforcement profiles"
                    : "Window U-value calculator"}{" "}
                  →
                </Link>
              </li>
              <li>
                <Link href="/industries/construction">
                  Building applications →
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="bg-bg2 py-[48px]">
        <div className={wrap}>
          <h2 className="text-f24 font-bold text-t1">Purchasing questions</h2>
          <FAQ items={[...page.faq]} />
          <Link
            href={other.path}
            className="mt-[20px] inline-block text-f15 font-bold text-teal-text"
          >
            {other.h1} →
          </Link>
        </div>
      </section>
    </>
  );
}
