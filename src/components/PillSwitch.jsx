import { useRef, useLayoutEffect, useState } from 'react';
import { useFeedback } from '../hooks/useFeedback';

export default function PillSwitch({ items, active, onChange }) {
  const containerRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const { tick } = useFeedback();
  const isDragging = useRef(false);
  const lastIndex = useRef(active);

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

  const indexFromX = (clientX) => {
    const container = containerRef.current;
    if (!container) return active;
    const rect = container.getBoundingClientRect();
    const segs = container.querySelectorAll('.seg');
    for (let i = 0; i < segs.length; i++) {
      const r = segs[i].getBoundingClientRect();
      if (clientX >= r.left && clientX <= r.right) return i;
    }
    if (clientX < rect.left) return 0;
    return items.length - 1;
  };

  const handleClick = (i) => {
    if (i !== active) {
      tick();
      onChange?.(i);
    }
  };

  const handleTouchStart = (e) => {
    isDragging.current = true;
    lastIndex.current = active;
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    const idx = indexFromX(e.touches[0].clientX);
    if (idx !== lastIndex.current) {
      lastIndex.current = idx;
      tick();
      onChange?.(idx);
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  return (
    <div
      className="pill-switch"
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
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
