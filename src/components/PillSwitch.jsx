export default function PillSwitch({ items, active, onChange }) {
  return (
    <div className="pill-switch">
      {items.map((it, i) => (
        <button
          key={i}
          className={"seg" + (i === active ? " on primary" : "")}
          onClick={() => onChange?.(i)}
        >
          {it.icon && <span style={{ fontSize: 13 }}>{it.icon}</span>}
          <span>{it.label}</span>
        </button>
      ))}
    </div>
  );
}
