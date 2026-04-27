"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { translations, type Lang } from "@/lib/i18n";
import Reveal from "./Reveal";

const Tag = ({ label }: { label: string }) => (
  <span style={{ padding: "3px 10px", background: "rgba(201,106,10,0.07)", border: "1px solid rgba(201,106,10,0.22)", fontSize: 10, letterSpacing: "0.04em", color: "var(--accent)" }}>
    {label}
  </span>
);

function AICard({ icon, title, desc, tags, delay }: { icon: string; title: string; desc: string; tags: string[]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
      whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.1)" }}
      style={{ background: "var(--surface)", padding: 36, position: "relative", overflow: "hidden" }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, var(--accent), transparent)" }} />
      <div style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 800, fontSize: 11, letterSpacing: "0.15em", color: "var(--accent)", marginBottom: 14, padding: "4px 10px", border: "1px solid var(--border-a)", display: "inline-block" }}>
        {icon}
      </div>
      <h3 style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 700, fontSize: 18, color: "var(--dark)", marginBottom: 12 }}>{title}</h3>
      <p style={{ fontSize: 12.5, color: "var(--text)", lineHeight: 1.75, marginBottom: 16 }}>{desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {tags.map(tag => <Tag key={tag} label={tag} />)}
      </div>
    </motion.div>
  );
}

export default function AISection({ lang }: { lang: Lang }) {
  const t = translations[lang];

  return (
    <section id="ai" style={{ padding: "128px 52px", maxWidth: 1240, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 18 }}>
        <span style={{ color: "var(--muted)" }}>03 /</span> {t["ai-label"]}
      </div>

      <Reveal>
        <h2 style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 800, fontSize: "clamp(34px, 5.5vw, 60px)", lineHeight: 1, letterSpacing: "-0.035em", color: "var(--dark)", marginBottom: 56 }}>
          {t["ai-title-1"]}<br />{t["ai-title-2"]}
        </h2>
      </Reveal>

      <Reveal>
        <p style={{ maxWidth: 600, marginBottom: 56, color: "var(--text)", lineHeight: 1.9, fontSize: 13 }}>{t["ai-intro"]}</p>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }} className="ai-grid">
        <AICard icon="CV" title={t["ai1-title"]} desc={t["ai1-desc"]} tags={["CNN","EfficientNet","Image Segmentation","TensorFlow / Keras"]} delay={0} />
        <AICard icon="OD" title={t["ai2-title"]} desc={t["ai2-desc"]} tags={["YOLOv3","YOLOv8","TensorFlow","Video Processing"]} delay={0.08} />
        <AICard icon="NLP" title={t["ai3-title"]} desc={t["ai3-desc"]} tags={["LSTM","Bidirectional RNN","Text Classification","Embeddings"]} delay={0.16} />
      </div>

      <style>{`@media (max-width: 900px) { .ai-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}
