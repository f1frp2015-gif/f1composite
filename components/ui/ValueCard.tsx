interface ValueCardProps {
  number: string;
  title: string;
  description: string;
}

export default function ValueCard({ number, title, description }: ValueCardProps) {
  return (
    <div className="group relative rounded-[8px] border border-border-default bg-white p-[34px] pl-[21px] transition-all duration-[0.34s] hover:border-teal-border">
      {/* Left accent bar */}
      <div className="absolute left-0 top-[34px] h-[21px] w-[2px] bg-teal transition-all duration-[0.55s] group-hover:h-[calc(100%-68px)]" />
      <span
        className="mb-[8px] block text-f32 font-extrabold text-teal/[0.06]"
        aria-hidden
      >
        {number}
      </span>
      <h4 className="mb-[8px] text-f16 font-bold text-t1">{title}</h4>
      <p className="text-f14 leading-golden text-t2">{description}</p>
    </div>
  );
}
