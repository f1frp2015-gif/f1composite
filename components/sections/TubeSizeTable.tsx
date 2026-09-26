import Link from "next/link";
import DatasheetModelLink from "@/components/datasheets/DatasheetModelLink";
import { commercialFacts } from "@/content/data/engineeringEvidence";
import { approximateInches, tubeInquiryHref } from "@/lib/productInquiry";

interface TubeSize {
  model: string;
  dimensions: number[];
  weight: string;
}

export default function TubeSizeTable({ sizes, columns, product, productPath }: {
  sizes: TubeSize[];
  columns: string[];
  product: string;
  productPath: string;
}) {
  return (
    <>
      <p id="tube-size-notes" className="mt-[13px] max-w-[850px] text-f14 leading-golden text-t2">
        Dimensions are nominal millimetres; approximate decimal inches appear below each value.
        Converted values are references, not separate inch-size tooling or tolerances. {commercialFacts.availability}
      </p>
      <div className="mt-[24px] overflow-x-auto rounded-[8px] border border-border-default bg-white" role="region" aria-label={`${product} sizes`} tabIndex={0}>
        <table className="w-full border-collapse text-left" aria-describedby="tube-size-notes">
          <caption className="sr-only">{product}: dimensions, published nominal weight and quotation selection</caption>
          <thead>
            <tr className="border-b-2 border-border-default bg-bg2">
              {["Model", ...columns, "Weight (kg/m)", "Select"].map((column) => (
                <th key={column} scope="col" className="whitespace-nowrap px-[16px] py-[13px] text-f14 font-bold text-t1">{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sizes.map((size) => {
              const specification = `${size.model}; ${columns.map((column, index) => `${column}: ${size.dimensions[index]}`).join(", ")}`;
              return (
                <tr key={size.model} className="border-b border-border-default last:border-b-0 hover:bg-bg2/60">
                  <th scope="row" className="whitespace-nowrap px-[16px] py-[13px] text-f14 font-semibold text-t1"><DatasheetModelLink model={size.model} /></th>
                  {size.dimensions.map((dimension, index) => (
                    <td key={columns[index]} className="px-[16px] py-[13px] text-f16 text-t1">
                      {dimension > 0 ? dimension : "—"}
                      <span className="mt-[3px] block whitespace-nowrap text-f12 text-t3">≈ {approximateInches(dimension)} in</span>
                    </td>
                  ))}
                  <td className="px-[16px] py-[13px] text-f14 font-medium text-teal-text">{size.weight}</td>
                  <td className="px-[16px] py-[8px]">
                    <Link
                      href={tubeInquiryHref(productPath, product, specification)}
                      prefetch={false}
                      aria-label={`Quote ${size.model}`}
                      className="inline-flex min-h-[44px] items-center whitespace-nowrap rounded-[6px] border border-teal-border px-[14px] text-f14 font-semibold text-teal-text hover:bg-teal-bg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
                    >Quote this size →</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-[13px] text-f14 text-t2">Need a different size or an exact inch dimension? <Link href="/products/custom-pultruded-profiles" className="font-semibold text-teal-text underline">Send a custom section drawing</Link>.</p>
    </>
  );
}
