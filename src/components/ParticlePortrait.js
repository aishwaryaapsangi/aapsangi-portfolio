import React, { useRef, useEffect, useState } from "react";

const ParticlePortrait = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const linesRef = useRef([]);
  const imageLoadedRef = useRef(false);
  const startTimeRef = useRef(null);
  const [size, setSize] = useState(500);

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;

      if (width <= 480) {
        setSize(Math.min(220, width - 40));
      } else if (width <= 768) {
        setSize(Math.min(280, width - 60));
      } else {
        setSize(400);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const canvasWidth = size;
    const canvasHeight = size;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    let animationId;

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = "/ash-bg.png";

    img.onload = () => {
      const offscreen = document.createElement("canvas");
      const offCtx = offscreen.getContext("2d");
      offscreen.width = canvasWidth;
      offscreen.height = canvasHeight;

      const scale = 0.92;
      const imgAspect = img.width / img.height;

      let drawHeight = canvasHeight * scale;
      let drawWidth = drawHeight * imgAspect;

      if (drawWidth > canvasWidth * scale) {
        drawWidth = canvasWidth * scale;
        drawHeight = drawWidth / imgAspect;
      }

      const offsetX = (canvasWidth - drawWidth) / 2;
      const offsetY = (canvasHeight - drawHeight) / 2;

      offCtx.drawImage(
        img,
        offsetX,
        offsetY,
        drawWidth,
        drawHeight
      );

      const imageData = offCtx.getImageData(
        0,
        0,
        canvasWidth,
        canvasHeight
      );

      const pixels = imageData.data;

     const lines = [];

const rowGap = size <= 280 ? 4 : 4;
const columnGap = size <= 280 ? 4 : 4;

for (let y = 0; y < canvasHeight; y += rowGap) {
  for (let x = 0; x < canvasWidth; x += columnGap) {
    const i = (y * canvasWidth + x) * 4;

    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    const a = pixels[i + 3];

    // Ignore transparent background
    if (a < 80) continue;

    // Perceived brightness
    const brightness =
      (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Increase contrast between dark and light areas
    const contrast = Math.pow(brightness, 0.65);

    // Bright areas get longer dashes
    // Dark areas get shorter dashes
    const lineLength = Math.max(
      2,
      Math.floor(2 + contrast * 9)
    );

    // Keep the initial movement subtle
    const scatterAmount = size <= 280 ? 35 : 55;

    const scatterX =
      (Math.random() - 0.5) * scatterAmount;

    const scatterY =
      (Math.random() - 0.5) * scatterAmount;

    lines.push({
      x: x + scatterX,
      y: y + scatterY,

      targetX: x,
      targetY: y,

      vx: 0,
      vy: 0,

      length: lineLength,

      // More visible overall
      baseAlpha: 0.45 + contrast * 0.55,

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

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      if (!imageLoadedRef.current) return;

      const lines = linesRef.current;
      const mouse = mouseRef.current;
      const elapsed = (performance.now() - startTimeRef.current) / 1000;

      lines.forEach((p) => {
        const particleTime = elapsed - p.delay;

        if (particleTime < 0) return;

        const fadeProgress = Math.min(particleTime / 1.5, 1);
        const easedFade = 1 - Math.pow(1 - fadeProgress, 2);
        p.currentAlpha = p.baseAlpha * easedFade;

        const moveProgress = Math.min(particleTime / 2.5, 1);
        const easedMove = 1 - Math.pow(1 - moveProgress, 3);

        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 60;

          if (dist < maxDist && dist > 0) {
            const force = (1 - dist / maxDist) * 2;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        const dx = p.targetX - p.x;
        const dy = p.targetY - p.y;

        const pullStrength = 0.012 + easedMove * 0.045;
        p.vx += dx * pullStrength;
        p.vy += dy * pullStrength;

        p.vx *= 0.90;
        p.vy *= 0.90;

        p.x += p.vx;
        p.y += p.vy;

        ctx.strokeStyle = `rgba(100, 255, 218, ${p.currentAlpha})`;
        ctx.lineWidth = size <= 280 ? 1.2 : 1.5;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.length, p.y);
        ctx.stroke();
      });
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleTouchMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      mouseRef.current.x = touch.clientX - rect.left;
      mouseRef.current.y = touch.clientY - rect.top;
      mouseRef.current.active = true;
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
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      className="simulation-container"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        cursor: "crosshair",
      }}
    />
  );
};

export default ParticlePortrait;