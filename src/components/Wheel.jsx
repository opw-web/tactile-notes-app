import { useRef, useEffect, useCallback } from 'react';
import { useFeedback } from '../hooks/useFeedback';

export default function Wheel({ items, active, w = 92, h = 140, onChange, itemH = 32 }) {
  const containerRef = useRef(null);
  const offsetRef = useRef(-active * itemH);
  const velocityRef = useRef(0);
  const isDragging = useRef(false);
  const lastY = useRef(0);
  const lastTime = useRef(0);
  const animRef = useRef(null);
  const lastIndexRef = useRef(active);
  const wheelAccum = useRef(0);
  const { tick } = useFeedback();

  const centerOffset = h / 2 - itemH / 2;

  const clampOffset = useCallback((off) => {
    const min = -(items.length - 1) * itemH;
    return Math.max(min, Math.min(0, off));
  }, [items.length, itemH]);

  const getNearestIndex = useCallback((off) => {
    const idx = Math.round(-off / itemH);
    return Math.max(0, Math.min(items.length - 1, idx));
  }, [items.length, itemH]);

  const render = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const listEl = el.querySelector('.wheel-list');
    if (!listEl) return;
    listEl.style.transform = `translateY(${centerOffset + offsetRef.current}px)`;

    const children = listEl.children;
    for (let i = 0; i < children.length; i++) {
      const dist = Math.abs(i * itemH + offsetRef.current);
      const norm = dist / itemH;
      const child = children[i];
      if (norm < 0.5) {
        child.style.opacity = '1';
        child.style.fontSize = '16px';
        child.style.fontWeight = '700';
        child.style.color = 'var(--color-text)';
      } else if (norm < 1.5) {
        child.style.opacity = '0.55';
        child.style.fontSize = '13px';
        child.style.fontWeight = '500';
        child.style.color = 'var(--color-muted)';
      } else {
        child.style.opacity = '0.22';
        child.style.fontSize = '13px';
        child.style.fontWeight = '500';
        child.style.color = 'var(--color-muted)';
      }
    }
  }, [centerOffset, itemH]);

  const checkHaptic = useCallback(() => {
    const idx = getNearestIndex(offsetRef.current);
    if (idx !== lastIndexRef.current) {
      lastIndexRef.current = idx;
      tick();
    }
  }, [getNearestIndex, tick]);

  const animateTo = useCallback((targetOffset, onDone) => {
    cancelAnimationFrame(animRef.current);
    const start = offsetRef.current;
    const dist = targetOffset - start;
    const duration = 200;
    const startTime = performance.now();

    const step = (now) => {
      const t = Math.min(1, (now - startTime) / duration);
      const ease = 1 - Math.pow(1 - t, 3);
      offsetRef.current = start + dist * ease;
      render();
      checkHaptic();
      if (t < 1) {
        animRef.current = requestAnimationFrame(step);
      } else {
        onDone?.();
      }
    };
    animRef.current = requestAnimationFrame(step);
  }, [render, checkHaptic]);

  const snapToNearest = useCallback(() => {
    const idx = getNearestIndex(offsetRef.current);
    const target = -idx * itemH;
    animateTo(target, () => {
      if (idx !== active) onChange?.(idx);
    });
  }, [getNearestIndex, itemH, animateTo, onChange, active]);

  const startMomentum = useCallback(() => {
    cancelAnimationFrame(animRef.current);
    const step = () => {
      velocityRef.current *= 0.95;
      offsetRef.current = clampOffset(offsetRef.current + velocityRef.current);
      render();
      checkHaptic();
      if (Math.abs(velocityRef.current) > 0.5) {
        animRef.current = requestAnimationFrame(step);
      } else {
        snapToNearest();
      }
    };
    animRef.current = requestAnimationFrame(step);
  }, [clampOffset, render, checkHaptic, snapToNearest]);

  const handleTouchStart = (e) => {
    cancelAnimationFrame(animRef.current);
    isDragging.current = true;
    velocityRef.current = 0;
    lastY.current = e.touches[0].clientY;
    lastTime.current = performance.now();
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    const y = e.touches[0].clientY;
    const now = performance.now();
    const dy = y - lastY.current;
    const dt = now - lastTime.current;
    if (dt > 0) velocityRef.current = dy / dt * 16;
    offsetRef.current = clampOffset(offsetRef.current + dy);
    lastY.current = y;
    lastTime.current = now;
    render();
    checkHaptic();
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    if (Math.abs(velocityRef.current) > 2) {
      startMomentum();
    } else {
      snapToNearest();
    }
  };

  const handleWheel = (e) => {
    e.preventDefault();
    wheelAccum.current += e.deltaY;
    if (Math.abs(wheelAccum.current) >= 30) {
      const dir = wheelAccum.current > 0 ? 1 : -1;
      wheelAccum.current = 0;
      const newIdx = Math.max(0, Math.min(items.length - 1, getNearestIndex(offsetRef.current) + dir));
      const target = -newIdx * itemH;
      animateTo(target, () => {
        if (newIdx !== active) onChange?.(newIdx);
      });
    }
  };

  const handleClick = (i) => {
    const target = -i * itemH;
    animateTo(target, () => {
      if (i !== active) onChange?.(i);
    });
  };

  useEffect(() => {
    if (!isDragging.current) {
      const target = -active * itemH;
      if (Math.abs(offsetRef.current - target) > 1) {
        animateTo(target);
      } else {
        offsetRef.current = target;
        render();
      }
      lastIndexRef.current = active;
    }
  }, [active, itemH, animateTo, render]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const preventScroll = (e) => e.preventDefault();
    el.addEventListener('wheel', preventScroll, { passive: false });
    return () => el.removeEventListener('wheel', preventScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="wheel"
      style={{ width: w, height: h }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
    >
      <div className="wheel-band"></div>
      <div className="wheel-list">
        {items.map((label, i) => (
          <div
            key={i}
            className="wheel-item"
            onClick={() => handleClick(i)}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
