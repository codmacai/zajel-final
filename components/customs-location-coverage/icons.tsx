import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function SeaPortIcon(props: IconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M4 18C5 16.5 7 16.5 8 18C9 19.5 11 19.5 12 18C13 16.5 15 16.5 16 18C17 19.5 19 19.5 20 18" stroke="#36B936" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M6 15 6.8 6.5C6.85 6 7.25 5.6 7.8 5.6H16.2C16.75 5.6 17.15 6 17.2 6.5L18 15" stroke="#36B936" strokeWidth="1.75" strokeLinejoin="round" />
      <path d="M12 5.6V2.5" stroke="#36B936" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

export function AirportIcon(props: IconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M17.8 19.2 16 11l3.5-3.5c.7-.7.7-1.8 0-2.5s-1.8-.7-2.5 0L13.5 8.5 5.3 6.7c-.4-.1-.9 0-1.2.3l-.5.5c-.4.4-.3 1 .2 1.3l6 3.6-3 3-2.3-.5c-.3-.1-.6 0-.8.2l-.3.3c-.3.3-.3.8.1 1l3 1.8 1.8 3c.2.4.7.4 1 .1l.3-.3c.2-.2.3-.5.2-.8l-.5-2.3 3-3 3.6 6c.3.5.9.6 1.3.2l.5-.5c.3-.3.4-.8.3-1.2Z"
        stroke="#36B936"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FreeZoneIcon(props: IconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="4" y="9.5" width="7" height="10.5" stroke="#36B936" strokeWidth="1.75" strokeLinejoin="round" />
      <rect x="13" y="4" width="7" height="16" stroke="#36B936" strokeWidth="1.75" strokeLinejoin="round" />
      <path d="M16.5 8H16.51M16.5 11H16.51M16.5 14H16.51" stroke="#36B936" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M7 13H7.01M7 16H7.01" stroke="#36B936" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

export function LandBorderIcon(props: IconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 21C12 21 18 15.2 18 10.2C18 6.8 15.3 4 12 4C8.7 4 6 6.8 6 10.2C6 15.2 12 21 12 21Z" stroke="#36B936" strokeWidth="1.75" strokeLinejoin="round" />
      <circle cx="12" cy="10.2" r="2.2" stroke="#36B936" strokeWidth="1.75" />
    </svg>
  );
}

export function InfoIcon(props: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="12" cy="12" r="9" stroke="#36B936" strokeWidth="1.75" />
      <path d="M12 11V16.5" stroke="#36B936" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M12 8H12.01" stroke="#36B936" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}
