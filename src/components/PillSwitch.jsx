import { useRef, useLayoutEffect, useState } from 'react';
import { useFeedback } from '../hooks/useFeedback';

export default function PillSwitch({ items, active, onChange }) {
  const containerRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const { tick } = useFeedback();

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const segs = container.querySelectorAll('.seg');
    const seg = segs[active];
    if (!seg) return;
    requestAnimationFrame(() => {
      setIndicatorStyle({
        transform: `translateX(${seg.offsetLeft - 5}px)`,
        width: seg.offsetWidth,
      });
    });
  }, [active, items.length]);

  const handleClick = (i) => {
    if (i !== active) {
      tick();
      onChange?.(i);
    }
  };

  return (
    <div className="pill-switch" ref={containerRef}>
      <div className="pill-indicator" style={indicatorStyle} />
      {items.map((it, i) => (
        <button
          key={i}
          className={"seg" + (i === active ? " on primary" : "")}
          onClick={() => handleClick(i)}
        >
          {it.icon && <span style={{ fontSize: 13 }}>{it.icon}</span>}
          <span>{it.label}</span>
        </button>
      ))}
    </div>
  );
}
