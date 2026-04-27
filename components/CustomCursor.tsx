"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let x = 0, y = 0, rx = 0, ry = 0;
    let ringScale = 1;
    let rafId: number;
    let hovering = false;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      dot.style.opacity = "1";
      ring.style.opacity = "0.55";
    };

    const onLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const onOver = (e: MouseEvent) => {
      hovering = !!(e.target as HTMLElement).closest("a, button");
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("mouseover", onOver);

    const tick = () => {
      dot.style.transform = `translate(${x - 4}px, ${y - 4}px)`;

      rx += (x - rx) * 0.12;
      ry += (y - ry) * 0.12;
      const targetScale = hovering ? 1.65 : 1;
      ringScale += (targetScale - ringScale) * 0.12;

      ring.style.transform = `translate(${rx - 17}px, ${ry - 17}px) scale(${ringScale.toFixed(3)})`;
      rafId = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: "fixed", top: 0, left: 0,
          width: 8, height: 8, borderRadius: "50%",
          background: "var(--accent)",
          pointerEvents: "none", zIndex: 99999, opacity: 0,
          transition: "opacity 0.18s",
          willChange: "transform",
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: "fixed", top: 0, left: 0,
          width: 34, height: 34, borderRadius: "50%",
          border: "1px solid rgba(201,106,10,0.6)",
          pointerEvents: "none", zIndex: 99998, opacity: 0,
          transformOrigin: "17px 17px",
          transition: "opacity 0.18s",
          willChange: "transform",
        }}
      />
    </>
  );
}
