export default function Badge({ type }: { type: string }) {
    const styles: Record<string, { bg: string; color: string }> = {
      new: { bg: "#e6f7e9", color: "#177845" },
      moved: { bg: "#fdf0e0", color: "#b5641b" },
      renamed: { bg: "#eef0fd", color: "#4c4ec7" },
    };
    const s = styles[type] || styles.new;
    return (
      <span
        style={{
          fontSize: 9.5,
          fontWeight: 800,
          padding: "2px 6px",
          borderRadius: 6,
          background: s.bg,
          color: s.color,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          whiteSpace: "nowrap",
        }}
      >
        {type}
      </span>
    );
  }