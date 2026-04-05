import SectionTag from "@/components/ui/SectionTag";
import SolutionCard from "@/components/ui/SolutionCard";
import LinkArrow from "@/components/ui/LinkArrow";
import { productCategories } from "@/content/data/products";

function ProfilesIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-teal">
      <path d="M4 4h16v4H4zM4 12h8v8H4z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CustomIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-teal">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FenestrationIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-teal">
      <rect x="3" y="3" width="18" height="18" rx="1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 3v18M3 12h18" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GratingsIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-teal">
      <path d="M3 3h18v18H3zM3 9h18M3 15h18M9 3v18M15 3v18" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const icons: Record<string, React.ReactNode> = {
  profiles: <ProfilesIcon />,
  custom: <CustomIcon />,
  fenestration: <FenestrationIcon />,
  gratings: <GratingsIcon />,
};

export default function SolutionsSnapshot() {
  return (
    <section className="bg-white py-[89px]">
      <div className="mx-auto max-w-[1280px] px-[34px]">
        {/* Header row */}
        <div className="mb-[34px] flex items-end justify-between">
          <div>
            <SectionTag>Product Range</SectionTag>
            <h2 className="mt-[13px] text-f24 font-bold tracking-[-0.02em] text-t1 md:text-f31">
              Pultruded FRP Profiles
            </h2>
            <p className="mt-[8px] max-w-[480px] text-f15 leading-golden text-t2">
              Pultrusion technology unlocks new possibilities for advanced composite materials — stronger, lighter, and built to last.
            </p>
          </div>
          <LinkArrow href="/products" className="hidden sm:inline-flex">
            All products
          </LinkArrow>
        </div>

        {/* 4-column card grid */}
        <div className="grid gap-[21px] sm:grid-cols-2 lg:grid-cols-4">
          {productCategories.map((product) => (
            <SolutionCard
              key={product.slug}
              title={product.title}
              description={product.description}
              href={product.href}
              icon={icons[product.icon]}
            />
          ))}
        </div>

        <div className="mt-[21px] sm:hidden">
          <LinkArrow href="/products">All products</LinkArrow>
        </div>
      </div>
    </section>
  );
}
