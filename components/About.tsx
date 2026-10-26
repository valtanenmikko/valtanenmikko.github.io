"use client";
import Image from "next/image";
import Reveal from "./Reveal";
import { translations, type Lang } from "@/lib/i18n";

export default function About({ lang }: { lang: Lang }) {
  const c = translations[lang];
  const t = c.background;

  return (
    <section id="background" className="section" aria-labelledby="background-title">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">{t.label}</p>
          <h2 id="background-title" className="h2">{t.title}</h2>
        </div>

        <div className="bg-grid">
          <Reveal>
            <Image src="/assets/face.jpg" alt="Mikko Valtanen" width={240} height={300} className="portrait" />
            {t.story.map((p) => (
              <p key={p} className="story">
                {p}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.08}>
            <ol className="timeline">
              {t.timeline.map((item) => (
                <li key={item.role}>
                  <p className="meta tl-period">{item.period}</p>
                  <div>
                    <h3 className="tl-role">{item.role}</h3>
                    <p className="tl-org">{item.org}</p>
                    <p className="tl-detail">{item.detail}</p>
                    {item.link && (
                      <a href={item.link.href} target="_blank" rel="noopener noreferrer" className="link-arrow">
                        {item.link.label} ↗<span className="sr-only"> {c.contact.newTab}</span>
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>

      <style>{`
        .bg-grid { display: grid; grid-template-columns: 1fr 1.35fr; gap: 72px; align-items: start; }
        .portrait {
          width: 100%; max-width: 240px; height: auto; aspect-ratio: 4 / 5; object-fit: cover; object-position: center 18%;
          border: 1px solid var(--rule); margin-bottom: 28px; display: block;
        }
        .story { margin-bottom: 18px; max-width: 520px; }
        .timeline { list-style: none; padding: 0; margin: 0; border-top: 1px solid var(--rule-strong); }
        .timeline li { display: grid; grid-template-columns: 140px 1fr; gap: 24px; padding: 26px 0; border-bottom: 1px solid var(--rule); }
        .tl-period { padding-top: 3px; }
        .tl-role { font-family: var(--font-sans), sans-serif; font-weight: 600; font-size: 19px; line-height: 1.3; color: var(--dark); }
        .tl-org { color: var(--muted); font-size: 15px; margin: 4px 0 10px; }
        .tl-detail { font-size: 15.5px; margin-bottom: 10px; }
        .tl-detail:last-child { margin-bottom: 0; }
        @media (max-width: 900px) {
          .bg-grid { grid-template-columns: 1fr; gap: 48px; }
        }
        @media (max-width: 600px) {
          .timeline li { grid-template-columns: 1fr; gap: 6px; }
          .portrait { max-width: 180px; }
        }
      `}</style>
    </section>
  );
}
