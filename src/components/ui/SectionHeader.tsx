interface SectionHeaderProps {
  tag: string;
  title: string;
  subtitle: string;
}

export function SectionHeader({ tag, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="reveal mb-14">
      <span className="text-[#00ff88] text-xs tracking-widest">{tag}</span>
      <h2 className="text-3xl sm:text-4xl font-bold text-[#f5f5f5] mt-2 mb-3">
        {title}
      </h2>
      <p className="text-[#a1a1aa] text-sm max-w-lg">{subtitle}</p>
    </div>
  );
}
