import { useState, useRef, useEffect, useCallback } from 'react';
import { useFeedback } from '../hooks/useFeedback';

export default function Sheet({ open, onClose, height = 700, children }) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const sheetRef = useRef(null);
  const dragY = useRef(0);
  const startY = useRef(0);
  const isDragging = useRef(false);
  const closingRef = useRef(false);
  const { tick } = useFeedback();

  useEffect(() => {
    if (open) {
      closingRef.current = false;
      setMounted(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setVisible(true);
        });
      });
    } else if (mounted && !closingRef.current) {
      closingRef.current = true;
      setVisible(false);
    }
  }, [open, mounted]);

  const handleTransitionEnd = useCallback((e) => {
    if (e.propertyName === 'transform' && !visible) {
      setMounted(false);
      closingRef.current = false;
      onClose?.();
    }
  }, [visible, onClose]);

  useEffect(() => {
    if (mounted && !visible && closingRef.current) {
      const timeout = setTimeout(() => {
        setMounted(false);
        closingRef.current = false;
        onClose?.();
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [mounted, visible, onClose]);

  const handleClose = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    setVisible(false);
  }, []);

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    startY.current = touch.clientY;
    dragY.current = 0;
    isDragging.current = true;
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    const dy = e.touches[0].clientY - startY.current;
    dragY.current = Math.max(0, dy);
    if (sheetRef.current) {
      sheetRef.current.style.transform = `translateY(${dragY.current}px)`;
      sheetRef.current.style.transition = 'none';
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const rendered = sheetRef.current?.offsetHeight || 600;
    if (sheetRef.current) {
      sheetRef.current.style.transition = '';
    }
    if (dragY.current > rendered * 0.3) {
      tick();
      handleClose();
    } else {
      if (sheetRef.current) {
        sheetRef.current.style.transform = '';
      }
    }
  };

  if (!mounted) return null;

  return (
    <>
      <div
        className={"frost" + (visible ? " frost-in" : "")}
        onClick={handleClose}
      />
      <div
        ref={sheetRef}
        className={"sheet" + (visible ? " sheet-in" : "")}
        style={{ maxHeight: height, zIndex: 11, display: 'flex', flexDirection: 'column' }}
        onTransitionEnd={handleTransitionEnd}
      >
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            display: 'flex', justifyContent: 'center',
            padding: '6px 0 10px', cursor: 'grab', flex: '0 0 auto',
            touchAction: 'none',
          }}
        >
          <div className="sheet-handle" style={{ margin: 0 }} />
        </div>
        <div style={{ flex: '1 1 auto', overflowY: 'auto', minHeight: 0 }}>
          {children}
        </div>
      </div>
    </>
  );
}
