"use client";

import { HUB, LIGHT_GREEN, ROUTES } from "@/data/global";

function PlaneIcon({ color }: { color: string }) {
  return (
    <path
      d="M9 0C9.4 0 9.7 0.3 9.9 0.9L12.2 8.4L18.5 12.6C19 13 19.2 13.4 19.2 13.9L19.2 15.4C19.2 16 18.7 16.3 18.1 16.1L12.2 14L12.2 19.6L15.4 22.3C15.8 22.6 16 23 16 23.4L16 24.6C16 25.1 15.6 25.3 15.1 25.1L10 23.2L4.9 25.1C4.4 25.3 4 25.1 4 24.6L4 23.4C4 23 4.2 22.6 4.6 22.3L7.8 19.6L7.8 14L1.9 16.1C1.3 16.3 0.8 16 0.8 15.4L0.8 13.9C0.8 13.4 1 13 1.5 12.6L7.8 8.4L10.1 0.9C10 0.3 9.6 0 9 0Z"
      fill={color}
      transform="translate(-10,-12.5) rotate(90 10 12.5)"
    />
  );
}

export default function FlightPaths() {
  return (
    <svg
      className="absolute inset-0 h-full w-full pointer-events-none"
      viewBox="0 0 1000 500"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        {ROUTES.map((route) => (
          <path
            key={route.id}
            id={route.id}
            d={`M${HUB.x},${HUB.y} Q${route.control.x},${route.control.y} ${route.x},${route.y}`}
            fill="none"
          />
        ))}
      </defs>

      {ROUTES.map((route) => (
        <use
          key={`line-${route.id}`}
          href={`#${route.id}`}
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="1.2"
          strokeDasharray="5 6"
          strokeLinecap="round"
        />
      ))}

      {/* Hub pulse — Dubai */}
      <circle cx={HUB.x} cy={HUB.y} r="4" fill={LIGHT_GREEN} />
      <circle cx={HUB.x} cy={HUB.y} r="4" fill="none" stroke={LIGHT_GREEN} strokeWidth="1.4">
        <animate attributeName="r" values="4;18;4" dur="2.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.55;0;0.55" dur="2.8s" repeatCount="indefinite" />
      </circle>

      {/* Destination pulses + traveling planes */}
      {ROUTES.map((route) => (
        <g key={route.id}>
          <circle cx={route.x} cy={route.y} r="3" fill="rgba(255,255,255,0.85)" />
          <circle cx={route.x} cy={route.y} r="3" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2">
            <animate attributeName="r" values="3;10;3" dur="2.4s" begin={`${route.delay}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0;0.5" dur="2.4s" begin={`${route.delay}s`} repeatCount="indefinite" />
          </circle>

          <PlaneIcon color={LIGHT_GREEN} />
          <animateMotion dur={`${route.duration}s`} begin={`${route.delay}s`} repeatCount="indefinite" rotate="auto">
            <mpath href={`#${route.id}`} />
          </animateMotion>
        </g>
      ))}
    </svg>
  );
}