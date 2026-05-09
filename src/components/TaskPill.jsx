export default function TaskPill({ title, prio, mini, onClick, draggable, onDragStart, onDragEnd }) {
  return (
    <div
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
      style={{
        background: "var(--color-surface)",
        boxShadow: "var(--shadow-out-sm)",
        borderRadius: 6,
        padding: mini ? "6px 8px" : "8px 10px",
        display: "flex", alignItems: "center", gap: 6,
        minHeight: mini ? 28 : 36,
        cursor: "pointer",
      }}
    >
      <span style={{
        width: 3, height: mini ? 16 : 20, borderRadius: 2,
        background: prio || "var(--color-muted)",
        flex: "0 0 auto",
      }}></span>
      <span style={{
        fontFamily: "var(--font-body)", fontWeight: 600,
        fontSize: mini ? 10 : 12,
        color: "var(--color-text)",
        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        flex: 1, minWidth: 0,
      }}>{title}</span>
      <span style={{
        display: "inline-flex", flexDirection: "column", gap: 2, opacity: 0.4,
      }}>
        <span style={{ width: 10, height: 1.5, background: "currentColor" }}></span>
        <span style={{ width: 10, height: 1.5, background: "currentColor" }}></span>
      </span>
    </div>
  );
}
