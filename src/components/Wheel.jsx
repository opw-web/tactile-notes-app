import { useState } from 'react';

export default function Wheel({ items, active: initialActive, w = 92, h = 140, onChange }) {
  const [active, setActive] = useState(initialActive);
  const itemH = 32;

  const handleClick = (i) => {
    setActive(i);
    onChange?.(i);
  };

  return (
    <div className="wheel" style={{ width: w, height: h }}>
      <div className="wheel-band"></div>
      <div className="wheel-list">
        {items.map((label, i) => {
          const dist = i - active;
          const opacity = Math.abs(dist) === 0 ? 1 : Math.abs(dist) === 1 ? 0.55 : 0.22;
          const size = Math.abs(dist) === 0 ? 16 : 13;
          const color = Math.abs(dist) === 0 ? "var(--color-text)" : "var(--color-muted)";
          return (
            <div
              key={i}
              className="wheel-item"
              onClick={() => handleClick(i)}
              style={{
                position: "absolute", left: 0, right: 0,
                top: `calc(50% - ${itemH/2}px + ${dist * itemH}px)`,
                opacity, fontSize: size, color,
                fontWeight: Math.abs(dist) === 0 ? 700 : 500,
              }}
            >
              {label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
