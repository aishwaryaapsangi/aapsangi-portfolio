
import React, { useEffect, useRef } from "react";

/**
 * Interactive pixel-grid background.
 * Cells light up near the cursor and slowly decay,
 * with a few autonomous "walkers" wandering the grid.
 */
const PixelField = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cell = 18;

    let cols = 0;
    let rows = 0;
    let heat = new Float32Array(0);
    let raf = 0;

    const mouse = {
      x: -999,
      y: -999,
    };

    const walkers = Array.from({ length: 5 }, () => ({
      c: 0,
      r: 0,
      t: 0,
    }));

    const resize = () => {
      const parent = canvas.parentElement;

      const w = parent?.clientWidth ?? window.innerWidth;
      const h = parent?.clientHeight ?? window.innerHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = w * dpr;
      canvas.height = h * dpr;

      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(w / cell);
      rows = Math.ceil(h / cell);

      heat = new Float32Array(cols * rows);

      for (const walker of walkers) {
        walker.c = Math.floor(Math.random() * cols);
        walker.r = Math.floor(Math.random() * rows);
      }
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();

      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const draw = () => {
      raf = requestAnimationFrame(draw);

      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      ctx.clearRect(0, 0, w, h);

      const mouseColumn = Math.floor(mouse.x / cell);
      const mouseRow = Math.floor(mouse.y / cell);

      // Autonomous walkers
      for (const walker of walkers) {
        walker.t += 1;

        if (walker.t % 6 === 0) {
          walker.c =
            (walker.c +
              (Math.random() < 0.5 ? 1 : -1) +
              cols) %
            cols;

          walker.r =
            (walker.r +
              (Math.random() < 0.5 ? 1 : -1) +
              rows) %
            rows;
        }

        const walkerIndex = walker.r * cols + walker.c;

        if (
          walkerIndex >= 0 &&
          walkerIndex < heat.length
        ) {
          heat[walkerIndex] = 0.55;
        }
      }

      // Draw grid
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const index = r * cols + c;

          // Distance from cursor
          const distance = Math.hypot(
            c - mouseColumn,
            r - mouseRow
          );

          if (distance < 4.5) {
            heat[index] = Math.max(
              heat[index] || 0,
              1 - distance / 4.5
            );
          }

          // Slowly fade the heat
          const value = (heat[index] || 0) * 0.94;

          heat[index] = value < 0.002 ? 0 : value;

          // Base visibility
          const base = 0.05;

          const alpha = base + value * 0.7;

          // Your mint/green color
          ctx.fillStyle = `rgba(100, 255, 218, ${alpha})`;

          const size = 2 + value * 5;

          ctx.fillRect(
            c * cell + (cell - size) / 2,
            r * cell + (cell - size) / 2,
            size,
            size
          );
        }
      }
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);

    return () => {
      cancelAnimationFrame(raf);

      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
    />
  );
};

export default PixelField;