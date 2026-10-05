export default function Chevron({ open }: { open: boolean }) {
    return (
      <svg
        width="10"
        height="6"
        viewBox="0 0 10 6"
        fill="none"
        style={{
          transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
          transform: open ? "rotate(180deg)" : "rotate(0deg)",
          flexShrink: 0,
        }}
      >
        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }