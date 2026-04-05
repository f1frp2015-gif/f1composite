interface SectionTagProps {
  children: React.ReactNode;
}

export default function SectionTag({ children }: SectionTagProps) {
  return (
    <div className="flex items-center gap-[13px]">
      <span className="gradient-bar h-[2px] w-[21px] rounded-full" />
      <span className="text-f11 font-bold uppercase tracking-[3px] text-teal-text">
        {children}
      </span>
    </div>
  );
}
