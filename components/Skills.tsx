"use client";
import Reveal from "./Reveal";
import { translations, type Lang, type SkillGroup } from "@/lib/i18n";

function Row({ g }: { g: SkillGroup }) {
  return (
    <div className="skill-row">
      <h3 className="meta skill-label">{g.label}</h3>
      <ul className="skill-items">
        {g.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default function Skills({ lang }: { lang: Lang }) {
  const t = translations[lang].skills;

  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">{t.label}</p>
          <h2 id="skills-title" className="h2">{t.title}</h2>
        </div>

        <Reveal>
          <div className="skills-table">
            {t.groups.map((g) => (
              <Row key={g.label} g={g} />
            ))}
          </div>
          <div className="skills-table skills-extra">
            {t.extra.map((g) => (
              <Row key={g.label} g={g} />
            ))}
          </div>
        </Reveal>
      </div>

      <style>{`
        .skills-table { border-top: 1px solid var(--rule-strong); }
        .skills-extra { margin-top: 40px; }
        .skill-row { display: grid; grid-template-columns: 220px 1fr; gap: 32px; padding: 20px 0; border-bottom: 1px solid var(--rule); }
        .skill-label { padding-top: 3px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.08em; }
        .skill-items { list-style: none; padding: 0; margin: 0; display: flex; flex-wrap: wrap; gap: 6px 28px; }
        .skill-items li { color: var(--dark); font-size: 16.5px; }
        .skills-extra .skill-items li { color: var(--text); font-size: 15.5px; }
        @media (max-width: 700px) {
          .skill-row { grid-template-columns: 1fr; gap: 8px; }
        }
      `}</style>
    </section>
  );
}
