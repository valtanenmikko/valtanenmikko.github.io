"use client";
import { motion } from "framer-motion";
import { translations, type Lang } from "@/lib/i18n";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
});

export default function Hero({ lang }: { lang: Lang }) {
  const t = translations[lang].hero;
  const statusIndex = t.spec.length - 1;

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div>
          <motion.p {...fadeUp(0)} className="eyebrow hero-role">
            {t.role}
          </motion.p>
          <motion.h1 {...fadeUp(0.08)} id="hero-title" className="hero-name">
            Mikko Valtanen
          </motion.h1>
          <motion.p {...fadeUp(0.16)} className="hero-lede">
            {t.lede}
          </motion.p>
          <motion.div {...fadeUp(0.24)} className="hero-ctas">
            <a href="#projects" className="btn btn-primary">
              {t.ctaPrimary} <span aria-hidden="true">↓</span>
            </a>
            <a href="#contact" className="btn btn-ghost">
              {t.ctaSecondary}
            </a>
          </motion.div>
        </div>

        <motion.dl {...fadeUp(0.3)} className="spec">
          {t.spec.map((row, i) => (
            <div key={row.label} className="spec-row">
              <dt className="meta">{row.label}</dt>
              <dd>
                {i === statusIndex && <span className="status-dot" aria-hidden="true" />}
                {row.value}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <style>{`
        .hero { padding: calc(var(--nav-h) + 112px) 0 104px; }
        .hero-grid { display: grid; grid-template-columns: 1.45fr 1fr; gap: 72px; align-items: end; }
        .hero-role { margin-bottom: 18px; }
        .hero-name {
          font-family: var(--font-sans), sans-serif; font-weight: 600;
          font-size: clamp(52px, 8.4vw, 104px); line-height: 0.95; letter-spacing: -0.04em;
          color: var(--dark); margin-bottom: 28px;
        }
        .hero-lede { max-width: 560px; font-size: 19px; line-height: 1.6; color: var(--text); margin-bottom: 36px; }
        .hero-ctas { display: flex; flex-wrap: wrap; gap: 12px; }
        .spec { background: var(--surface); border: 1px solid var(--rule); border-top: 3px solid var(--accent); margin: 0; }
        .spec-row { display: grid; grid-template-columns: 96px 1fr; gap: 16px; padding: 16px 22px; border-bottom: 1px solid var(--rule); }
        .spec-row:last-child { border-bottom: none; }
        .spec dt { padding-top: 2px; }
        .spec dd { margin: 0; font-size: 15.5px; color: var(--dark); display: flex; align-items: center; gap: 10px; }
        @media (max-width: 900px) {
          .hero { padding: calc(var(--nav-h) + 64px) 0 72px; }
          .hero-grid { grid-template-columns: 1fr; gap: 48px; }
          .hero-lede { font-size: 17.5px; }
        }
      `}</style>
    </section>
  );
}
