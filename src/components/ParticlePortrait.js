import React, { useEffect, useRef, useState } from "react";

const ParticlePortrait = ({ src = "/ash-bg.png" }) => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const linesRef = useRef([]);
  const imageLoadedRef = useRef(false);
  const startTimeRef = useRef(0);
  const [size, setSize] = useState(420);

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;

      if (width <= 480) {
        setSize(Math.min(240, width - 48));
      } else if (width <= 768) {
        setSize(Math.min(300, width - 64));
      } else {
        setSize(420);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const w = size;
    const h = size;

    canvas.width = w;
    canvas.height = h;

    let animationId = 0;

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = src;

    img.onload = () => {
      const offscreen = document.createElement("canvas");
      const offCtx = offscreen.getContext("2d");

      if (!offCtx) return;

      offscreen.width = w;
      offscreen.height = h;

      const scale = 0.94;
      const imgAspect = img.width / img.height;

      let drawHeight = h * scale;
      let drawWidth = drawHeight * imgAspect;

      if (drawWidth > w * scale) {
        drawWidth = w * scale;
        drawHeight = drawWidth / imgAspect;
      }

      offCtx.drawImage(
        img,
        (w - drawWidth) / 2,
        (h - drawHeight) / 2,
        drawWidth,
        drawHeight
      );

      const pixels = offCtx.getImageData(0, 0, w, h).data;

      const lines = [];
      const gap = 4;

      for (let y = 0; y < h; y += gap) {
        for (let x = 0; x < w; x += gap) {
          const i = (y * w + x) * 4;

          const r = pixels[i] ?? 0;
          const g = pixels[i + 1] ?? 0;
          const b = pixels[i + 2] ?? 0;
          const a = pixels[i + 3] ?? 0;

          if (a < 80) continue;

          const brightness =
            (0.299 * r + 0.587 * g + 0.114 * b) / 255;

          const contrast = Math.pow(brightness, 1.7);

          const lineLength = Math.max(
            1,
            Math.floor(1 + contrast * 4)
          );

          const scatter = size <= 300 ? 35 : 60;

          lines.push({
            x: x + (Math.random() - 0.5) * scatter,
            y: y + (Math.random() - 0.5) * scatter,
            targetX: x,
            targetY: y,
            vx: 0,
            vy: 0,
            length: lineLength,
            baseAlpha: 0.12 + contrast * 0.78,
            currentAlpha: 0,
            delay: Math.random() * 0.25,
          });
        }
      }

      linesRef.current = lines;
      imageLoadedRef.current = true;
      startTimeRef.current = performance.now();
    };

    const draw = () => {
      animationId = requestAnimationFrame(draw);

      ctx.clearRect(0, 0, w, h);

      if (!imageLoadedRef.current) return;

      const mouse = mouseRef.current;

      const elapsed =
        (performance.now() - startTimeRef.current) / 1000;

      for (const p of linesRef.current) {
        const t = elapsed - p.delay;

        if (t < 0) continue;

        const fade = Math.min(t / 1.5, 1);

        p.currentAlpha =
          p.baseAlpha * (1 - Math.pow(1 - fade, 2));

        const moveProgress = Math.min(t / 2.5, 1);

        const easedMove =
          1 - Math.pow(1 - moveProgress, 3);

        if (mouse.active) {
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;

          const dist = Math.sqrt(
            mdx * mdx + mdy * mdy
          );

          if (dist < 60 && dist > 0) {
            const force = (1 - dist / 60) * 2;

            p.vx += (mdx / dist) * force;
            p.vy += (mdy / dist) * force;
          }
        }

        const pull = 0.012 + easedMove * 0.045;

        p.vx += (p.targetX - p.x) * pull;
        p.vy += (p.targetY - p.y) * pull;

        p.vx *= 0.9;
        p.vy *= 0.9;

        p.x += p.vx;
        p.y += p.vy;

        ctx.strokeStyle = `rgba(100, 255, 218, ${p.currentAlpha})`;

        ctx.lineWidth = size <= 300 ? 1.2 : 1.5;

        ctx.beginPath();

        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.length, p.y);

        ctx.stroke();
      }
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();

      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleTouchMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];

      if (!touch) return;

      mouseRef.current = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
        active: true,
      };
    };

    const handleLeave = () => {
      mouseRef.current.active = false;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleLeave);
    canvas.addEventListener("touchmove", handleTouchMove);
    canvas.addEventListener("touchend", handleLeave);

    draw();

    return () => {
      cancelAnimationFrame(animationId);

      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleLeave);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleLeave);
    };
  }, [size, src]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        cursor: "crosshair",
      }}
    />
  );
};

export default ParticlePortrait;