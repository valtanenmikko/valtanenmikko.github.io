"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { translations, type Lang } from "@/lib/i18n";
import Reveal from "./Reveal";

function SkillGroup({ label, items, delay }: { label: string; items: string[]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
      whileHover={{ y: -3, boxShadow: "0 8px 28px rgba(0,0,0,0.08)" }}
      style={{ background: "var(--surface)", padding: 30 }}
    >
      <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 18, paddingBottom: 12, borderBottom: "1px solid var(--border-a)" }}>
        {label}
      </div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map(item => (
          <li key={item} style={{ fontSize: 12, color: "var(--text)", padding: "5px 0", display: "flex", alignItems: "center", gap: 9 }}>
            <span style={{ color: "var(--muted)", fontSize: 9 }}>—</span>{item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Skills({ lang }: { lang: Lang }) {
  const t = translations[lang];

  const groups = [
    { label: t["sg1-label"], items: ["Python", "SQL", "JavaScript", "TypeScript", "Java"] },
    { label: t["sg2-label"], items: ["PostgreSQL", "DuckDB", "MySQL", "MongoDB", "Pandas / NumPy"] },
    { label: t["sg3-label"], items: ["Apache Airflow", "Docker", "Git", "Node.js", "Playwright", "REST APIs"] },
    { label: t["sg4-label"], items: ["TensorFlow / Keras", "scikit-learn", "CNN / LSTM / RNN", "YOLO (v3, v8)", "Claude API", "Azure / AWS"] },
  ];

  return (
    <section id="skills" style={{ padding: "128px 52px", maxWidth: 1240, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 18 }}>
        <span style={{ color: "var(--muted)" }}>04 /</span> {t["skills-label"]}
      </div>

      <Reveal>
        <h2 style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 800, fontSize: "clamp(34px, 5.5vw, 60px)", lineHeight: 1, letterSpacing: "-0.035em", color: "var(--dark)", marginBottom: 56 }}>
          {t["skills-title-1"]}<br />{t["skills-title-2"]}
        </h2>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2 }} className="skills-grid">
        {groups.map((g, i) => <SkillGroup key={i} label={g.label} items={g.items} delay={i * 0.06} />)}
      </div>

      <style>{`
        @media (max-width: 900px) { .skills-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 600px) { .skills-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
