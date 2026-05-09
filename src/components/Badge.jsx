const colors = {
  primary: "var(--color-primary)",
  teal: "var(--color-teal)",
  brass: "var(--color-brass)",
  muted: "var(--color-muted)",
};

export default function Badge({ kind, label }) {
  return (
    <span className="badge">
      <span className="dot" style={{ background: colors[kind] || kind }}></span>
      {label}
    </span>
  );
}
