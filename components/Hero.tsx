"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { translations, type Lang } from "@/lib/i18n";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
});

type Particle = {
  x: number; y: number;
  vx: number; vy: number;
  ovx: number; ovy: number;
  r: number;
};

export default function Hero({ lang }: { lang: Lang }) {
  const t = translations[lang];
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let rafId: number;
    let mouseX = -9999;
    let mouseY = -9999;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    const onMouseLeave = () => { mouseX = -9999; mouseY = -9999; };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      particles = Array.from(
        { length: Math.min(Math.floor((canvas.width * canvas.height) / 11000), 85) },
        () => {
          const vx = (Math.random() - 0.5) * 0.38;
          const vy = (Math.random() - 0.5) * 0.38;
          return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx, vy, ovx: vx, ovy: vy,
            r: Math.random() * 1.8 + 0.7,
          };
        }
      );
    };

    const REPEL_RADIUS = 115;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse repulsion
        const dxM = p.x - mouseX;
        const dyM = p.y - mouseY;
        const distM = Math.sqrt(dxM * dxM + dyM * dyM);
        if (distM < REPEL_RADIUS && distM > 0.5) {
          const force = (1 - distM / REPEL_RADIUS) * 0.52;
          p.vx += (dxM / distM) * force;
          p.vy += (dyM / distM) * force;
        }

        // Lerp back toward natural velocity (respects bounce-flipped ovx/ovy)
        p.vx += (p.ovx - p.vx) * 0.022;
        p.vy += (p.ovy - p.vy) * 0.022;

        // Hard clamp
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > 4.2) { p.vx = (p.vx / spd) * 4.2; p.vy = (p.vy / spd) * 4.2; }

        // Move & bounce
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  { p.vx *= -1; p.ovx *= -1; }
        if (p.y < 0 || p.y > canvas.height) { p.vy *= -1; p.ovy *= -1; }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(80,55,30,0.3)";
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(201,106,10,${0.18 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    resize();
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) animate();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "0 52px 88px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          pointerEvents: "none", zIndex: 0,
        }}
      />

      <motion.div
        {...fadeUp(0)}
        style={{
          position: "absolute",
          top: 108, right: 52,
          display: "flex",
          alignItems: "center",
          gap: 9,
          padding: "8px 16px",
          background: "var(--surface)",
          border: "1px solid var(--border-a)",
          fontSize: 11,
          color: "var(--text)",
          letterSpacing: "0.04em",
          zIndex: 1,
        }}
      >
        <span
          className="badge-dot"
          style={{ width: 6, height: 6, borderRadius: "50%", background: "#16a34a", flexShrink: 0 }}
        />
        {t.badge}
      </motion.div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          {...fadeUp(0.1)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: 22,
          }}
        >
          <span style={{ display: "block", width: 30, height: 1, background: "var(--accent)" }} />
          {t["hero-eyebrow"]}
        </motion.div>

        <motion.h1
          {...fadeUp(0.25)}
          style={{
            fontFamily: "var(--font-syne), sans-serif",
            fontWeight: 800,
            fontSize: "clamp(58px, 10.5vw, 124px)",
            lineHeight: 0.88,
            letterSpacing: "-0.045em",
            color: "var(--dark)",
            marginBottom: 36,
          }}
        >
          Mikko<br />
          <span
            style={{
              background: "linear-gradient(135deg, #c96a0a 0%, #e8921a 60%, #f5aa38 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Valtanen
          </span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.42)}
          style={{ maxWidth: 500, fontSize: 13, color: "var(--muted)", lineHeight: 1.8, marginBottom: 48 }}
        >
          {t["hero-sub-1"]}
          <strong style={{ color: "var(--text)" }}>{t["hero-sub-bold"]}</strong>
          {t["hero-sub-2"]}
          <br />
          {t["hero-sub-3"]}
        </motion.p>

        <motion.a
          {...fadeUp(0.58)}
          href="#projects"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "11px 24px",
            border: "1px solid var(--accent)",
            color: "var(--accent)",
            textDecoration: "none",
            fontFamily: "var(--font-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            transition: "background 0.2s, color 0.2s",
          }}
          whileHover={{ opacity: 0.85 }}
        >
          {t["hero-cta"]}
        </motion.a>
      </div>

      <motion.div
        {...fadeUp(1)}
        style={{
          position: "absolute",
          right: 52, bottom: 88,
          writingMode: "vertical-lr",
          fontSize: 10,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--muted)",
          display: "flex",
          alignItems: "center",
          gap: 10,
          zIndex: 1,
        }}
      >
        Scroll
        <span
          style={{
            display: "block", width: 1, height: 56,
            background: "linear-gradient(to bottom, var(--muted), transparent)",
          }}
        />
      </motion.div>
    </div>
  );
}
