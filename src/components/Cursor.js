import React, { useEffect, useRef } from "react";

function lerp(a, b, n) {
  return (1 - n) * a + n * b;
}

export default function Cursor() {
  const el = useRef(null);

  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (el.current) {
        el.current.style.display = "none";
      }
      return;
    }

    const onMove = (e) => {
      target.current.x = e.clientX - 16;
      target.current.y = e.clientY - 16;
    };

    window.addEventListener("mousemove", onMove);

    let raf;

    const lerpFactor = 0.35;
    const snapThreshold = 120;

    const tick = () => {
      const dx = target.current.x - pos.current.x;
      const dy = target.current.y - pos.current.y;
      const dist = Math.hypot(dx, dy);

      if (dist > snapThreshold) {
        pos.current.x = target.current.x;
        pos.current.y = target.current.y;
      } else {
        pos.current.x = lerp(
          pos.current.x,
          target.current.x,
          lerpFactor
        );

        pos.current.y = lerp(
          pos.current.y,
          target.current.y,
          lerpFactor
        );
      }

      if (el.current) {
        el.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <div ref={el} className="cursor" />;
}