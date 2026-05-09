export default function TopBar({ title, sub, left, right }) {
  return (
    <div className="t-topbar">
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {left && <div className="icon-btn">{left}</div>}
        <div>
          <div className="t-eyebrow" style={{ marginBottom: 4, whiteSpace: "nowrap" }}>{sub}</div>
          <div className="t-display" style={{ fontSize: 26, lineHeight: 1.05 }}>{title}</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        {right}
      </div>
    </div>
  );
}
