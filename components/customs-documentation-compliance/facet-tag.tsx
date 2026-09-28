interface FacetTagProps {
  label: string;
  borderColor: string;
  textColor: string;
}

export function FacetTag({ label, borderColor, textColor }: FacetTagProps) {
  return (
    <span
      className="inline-flex items-center px-5 py-2.5 border text-xs sm:text-[13px] font-normal shrink-0 whitespace-nowrap"
      style={{
        borderColor,
        color: textColor,
        clipPath: "polygon(14px 0, calc(100% - 14px) 0, 100% 50%, calc(100% - 14px) 100%, 14px 100%, 0 50%)",
      }}
    >
      {label}
    </span>
  );
}
