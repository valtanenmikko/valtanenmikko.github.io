"use client";
import { translations, type Lang, type Project, type Content } from "@/lib/i18n";
import Reveal from "./Reveal";

function Stack({ items }: { items: string[] }) {
  return (
    <ul className="stack">
      {items.map((s) => (
        <li key={s} className="tag">
          {s}
        </li>
      ))}
    </ul>
  );
}

function Points({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="points">
      {items.map((p) => (
        <li key={p}>{p}</li>
      ))}
    </ul>
  );
}

function ProjectCard({ p, newTab, compact = false }: { p: Project; newTab: string; compact?: boolean }) {
  return (
    <article className={compact ? "card card-compact" : "card"}>
      <p className="meta card-kind">{p.kind}</p>
      <h3 className="h3">{p.title}</h3>
      <p className="card-summary">{p.summary}</p>
      <Points items={p.points} />
      {p.facts && (
        <dl className="facts">
          {p.facts.map((f) => (
            <div key={f.label}>
              <dt className="meta">{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      )}
      <div className="card-foot">
        <Stack items={p.stack} />
        {p.link && (
          <a href={p.link.href} target="_blank" rel="noopener noreferrer" className="link-arrow">
            {p.link.label} ↗<span className="sr-only"> {newTab}</span>
          </a>
        )}
      </div>
    </article>
  );
}

function PipelineFigure({ d }: { d: Content["projects"]["pipeline"] }) {
  const stages = [
    { key: "src", name: "Sources", desc: d.sources, tone: "src" },
    { key: "bronze", name: "Bronze", desc: d.bronze, tone: "bronze" },
    { key: "silver", name: "Silver", desc: d.silver, tone: "silver" },
    { key: "llm", name: "LLM", desc: d.llm, tone: "llm" },
    { key: "gold", name: "Gold", desc: d.gold, tone: "gold" },
    { key: "out", name: "Output", desc: d.out, tone: "out" },
  ];
  return (
    <figure className="pipeline">
      <figcaption className="meta pipeline-cap">{d.caption}</figcaption>
      <ol>
        {stages.map((s) => (
          <li key={s.key} className={`stage stage-${s.tone}`}>
            <span className="stage-name">{s.name}</span>
            <span className="stage-desc">{s.desc}</span>
          </li>
        ))}
      </ol>
    </figure>
  );
}

export default function Projects({ lang }: { lang: Lang }) {
  const c = translations[lang];
  const t = c.projects;
  const f = t.featured;

  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">{t.label}</p>
          <div>
            <h2 id="projects-title" className="h2">{t.title}</h2>
            <p className="section-intro">{t.intro}</p>
          </div>
        </div>

        <Reveal>
          <article className="featured">
            <div>
              <p className="meta card-kind">
                {f.kind}
                {f.status && <span className="status-pill">{f.status}</span>}
              </p>
              <h3 className="h3 featured-title">{f.title}</h3>
              <p className="card-summary">{f.summary}</p>
              <Points items={f.points} />
              <Stack items={f.stack} />
            </div>
            <PipelineFigure d={t.pipeline} />
          </article>
        </Reveal>

        <div className="cards">
          {t.items.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06} style={{ display: "flex" }}>
              <ProjectCard p={p} newTab={c.contact.newTab} />
            </Reveal>
          ))}
        </div>

        <p className="eyebrow coursework-label">{t.courseworkLabel}</p>
        <div className="cards cards-2">
          {t.coursework.map((p) => (
            <Reveal key={p.id} style={{ display: "flex" }}>
              <ProjectCard p={p} newTab={c.contact.newTab} compact />
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        .section-intro { margin-top: 14px; color: var(--muted); font-size: 17px; }

        .featured {
          display: grid; grid-template-columns: 1.25fr 1fr; gap: 56px;
          background: var(--surface); border: 1px solid var(--rule); border-top: 3px solid var(--accent);
          padding: 44px; margin-bottom: 24px;
        }
        .featured-title { font-size: clamp(24px, 2.6vw, 30px); }
        .card-kind { display: flex; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 12px; }
        .status-pill {
          padding: 2px 10px; border: 1px solid var(--border-a); background: rgba(201,106,10,0.08);
          color: var(--accent-text); font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase;
        }
        .card-summary { margin: 14px 0 18px; color: var(--text); }
        .points { list-style: none; padding: 0; margin: 0 0 24px; }
        .points li { position: relative; padding: 8px 0 8px 22px; border-top: 1px solid var(--rule); font-size: 15.5px; line-height: 1.6; }
        .points li::before { content: ""; position: absolute; left: 2px; top: 19px; width: 8px; height: 2px; background: var(--accent); }
        .stack { list-style: none; padding: 0; margin: 0; display: flex; flex-wrap: wrap; gap: 6px; }

        .pipeline { margin: 0; align-self: center; }
        .pipeline-cap { margin-bottom: 14px; }
        .pipeline ol { list-style: none; padding: 0; margin: 0; }
        .stage {
          position: relative; display: grid; grid-template-columns: 82px 1fr; gap: 14px; align-items: center;
          padding: 12px 16px; border: 1px solid var(--rule); background: var(--bg); margin-bottom: 18px;
        }
        .stage:last-child { margin-bottom: 0; }
        .stage:not(:last-child)::after {
          content: ""; position: absolute; left: 56px; bottom: -19px; width: 1px; height: 18px; background: var(--rule-strong);
        }
        .stage-name { font-family: var(--font-mono), monospace; font-size: 12.5px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; }
        .stage-desc { font-size: 14.5px; line-height: 1.45; color: var(--text); }
        .stage-src { border-style: dashed; background: transparent; }
        .stage-src .stage-name { color: var(--muted); }
        .stage-bronze { border-left: 4px solid #a0612b; }
        .stage-bronze .stage-name { color: #7d4a1f; }
        .stage-silver { border-left: 4px solid #8c8f93; }
        .stage-silver .stage-name { color: #5b5e62; }
        .stage-llm { margin-left: 28px; border-style: dashed; border-color: var(--teal); }
        .stage-llm .stage-name { color: var(--teal-text); }
        .stage-gold { border-left: 4px solid #c99a1c; }
        .stage-gold .stage-name { color: #806010; }
        .stage-out { background: var(--dark); border-color: var(--dark); }
        .stage-out .stage-name, .stage-out .stage-desc { color: var(--bg); }

        .cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .cards-2 { grid-template-columns: repeat(2, 1fr); }
        .cards > *, .featured > * { min-width: 0; }
        .card {
          display: flex; flex-direction: column; width: 100%;
          background: var(--surface); border: 1px solid var(--rule); padding: 32px;
        }
        .card .points { flex: 1; }
        .card-compact { background: transparent; }
        .card-compact .card-summary { flex: 1; font-size: 15.5px; }
        .facts { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; margin: 0 0 24px; padding: 16px 0; border-top: 1px solid var(--rule); border-bottom: 1px solid var(--rule); }
        .facts dd { margin: 0; order: -1; font-family: var(--font-mono), monospace; font-weight: 500; font-size: 26px; line-height: 1.15; color: var(--dark); letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
        .facts div { display: flex; flex-direction: column; min-width: 0; }
        .facts dt { font-family: var(--font-sans), sans-serif; font-size: 13px; line-height: 1.35; letter-spacing: 0; margin-top: 4px; overflow-wrap: break-word; hyphens: auto; }
        .card-foot { display: flex; flex-direction: column; gap: 18px; }
        .coursework-label { margin: 64px 0 20px; }

        @media (max-width: 1000px) {
          .featured { grid-template-columns: 1fr; gap: 40px; padding: 32px; }
          .cards { grid-template-columns: 1fr; }
        }
        @media (max-width: 700px) {
          .cards-2 { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .featured, .card { padding: 24px 20px; }
          .stage { grid-template-columns: 1fr; gap: 4px; }
          .stage:not(:last-child)::after { left: 24px; }
          .stage-llm { margin-left: 16px; }
        }
        @media (max-width: 480px) {
          .facts { grid-template-columns: 1fr; gap: 8px; }
          .facts div { flex-direction: row; align-items: baseline; gap: 12px; }
          .facts dd { font-size: 24px; min-width: 56px; }
        }
      `}</style>
    </section>
  );
}
