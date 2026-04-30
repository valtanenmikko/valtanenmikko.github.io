"use client";
import { useRef, useEffect } from "react";
import { useInView } from "framer-motion";

function StatItem({
  value,
  suffix = "",
  label,
  sub,
  delay,
  borderRight,
}: {
  value: number;
  suffix?: string;
  label: string;
  sub: string;
  delay: number;
  borderRight?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || !numRef.current) return;
    let curr = 0;
    const steps = 48;
    const inc = value / steps;
    const timer = setInterval(() => {
      curr = Math.min(curr + inc, value);
      if (numRef.current) numRef.current.textContent = Math.round(curr).toString();
      if (curr >= value) clearInterval(timer);
    }, 1300 / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        padding: "52px 0",
        borderRight: borderRight ? "1px solid var(--border-s)" : "none",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-syne), sans-serif",
          fontWeight: 800,
          fontSize: "clamp(44px, 6vw, 70px)",
          lineHeight: 1,
          color: "var(--dark)",
          letterSpacing: "-0.04em",
        }}
      >
        <span ref={numRef}>0</span>
        <span style={{ color: "var(--accent)" }}>{suffix}</span>
      </div>
      <div
        style={{
          fontSize: 10,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--dark)",
          fontWeight: 600,
          marginTop: 8,
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.04em" }}>{sub}</div>
    </div>
  );
}

export default function StatsStrip() {
  const stats = [
    { value: 7,   suffix: "",  label: "Projects",       sub: "Built & shipped",        delay: 0    },
    { value: 75,  suffix: "%", label: "Thesis accuracy", sub: "vs. human experts",     delay: 0.1  },
    { value: 130, suffix: "+", label: "Venues mapped",   sub: "TurkuMove project",     delay: 0.2  },
    { value: 3,   suffix: "",  label: "Years studying",  sub: "Data Engineering & AI", delay: 0.3  },
  ];

  return (
    <div
      style={{
        background: "var(--surface)",
        borderTop: "1px solid var(--border-s)",
        borderBottom: "1px solid var(--border-s)",
      }}
    >
      <div
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: "0 52px",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
        }}
        className="stats-grid"
      >
        {stats.map((s, i) => (
          <StatItem key={i} {...s} borderRight={i < 3} />
        ))}
      </div>
      <style>{`
        @media (max-width: 700px) { .stats-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 400px) { .stats-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
