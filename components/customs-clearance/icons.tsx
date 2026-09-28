import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const baseProps: IconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
};

export function ImportIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M12 3V15" stroke="#36B936" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M7 10.5 12 15.5 17 10.5" stroke="#36B936" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 19H20" stroke="#36B936" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

export function ExportIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M12 15.5V3.5" stroke="#36B936" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M7 8 12 3 17 8" stroke="#36B936" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 19H20" stroke="#36B936" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

export function TransitIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M3 8H15.5C17.4 8 19 9.6 19 11.5C19 13.4 17.4 15 15.5 15H6" stroke="#36B936" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M9 11.5 5.5 15 9 18.5" stroke="#36B936" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 4.5 21 8 18 11.5" stroke="#36B936" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
