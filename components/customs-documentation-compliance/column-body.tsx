import { DARK, LIME } from "@/data/customs-documentation-compliance";
import type { Body } from "@/data/customs-documentation-compliance";

interface ColumnBodyProps {
  body: Body;
  textColor: string;
  mutedColor: string;
  dividerColor: string;
  bgColor: string;
  isDarkTone?: boolean;
}

export function ColumnBody({ body, textColor, mutedColor, dividerColor, bgColor, isDarkTone }: ColumnBodyProps) {
  if (body.kind === "paragraph") {
    return (
      <p className="font-normal leading-relaxed text-sm sm:text-[15px]" style={{ color: mutedColor }}>
        {body.text}
      </p>
    );
  }

  return (
    <ul className="space-y-3.5 w-full">
      {body.items.map((item, i) => (
        <li
          key={item}
          className="flex items-start gap-3 pb-3.5"
          style={{ borderBottom: i < body.items.length - 1 ? `1px solid ${dividerColor}` : undefined }}
        >
          <svg className="mt-1 shrink-0 w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="8" fill={isDarkTone ? LIME : textColor} />
            <path
              d="M4.8 8.2 L7 10.4 L11.2 5.8"
              stroke={isDarkTone ? DARK : bgColor}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-normal leading-snug text-xs sm:text-sm" style={{ color: mutedColor }}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}
