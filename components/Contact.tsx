"use client";
import { translations, type Lang } from "@/lib/i18n";
import Reveal from "./Reveal";

export default function Contact({ lang }: { lang: Lang }) {
  const t = translations[lang].contact;

  const links = [
    { href: "mailto:valtanenmikko@gmail.com", kind: "Email", label: "valtanenmikko@gmail.com" },
    { href: "https://www.linkedin.com/in/valtanenmikko/", kind: "LinkedIn", label: "linkedin.com/in/valtanenmikko", external: true },
  ];

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">{t.label}</p>
          <h2 id="contact-title" className="h2">{t.title}</h2>
        </div>

        <Reveal>
          <div className="contact-grid">
            <div>
              <p className="contact-text">{t.text}</p>
              <ul className="contact-links">
                {links.map((l) => (
                  <li key={l.href}>
                    <span className="meta">{l.kind}</span>
                    <a
                      href={l.href}
                      target={l.external ? "_blank" : undefined}
                      rel={l.external ? "noopener noreferrer" : undefined}
                    >
                      {l.label}
                      {l.external && <span className="sr-only"> {t.newTab}</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="status-card">
              <p className="meta">{t.statusLabel}</p>
              <p className="status-value">
                <span className="status-dot" aria-hidden="true" /> {t.status}
              </p>
              <ul>
                {t.statusDetail.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        .contact-grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 72px; align-items: start; }
        .contact-text { font-size: 19px; line-height: 1.6; max-width: 540px; margin-bottom: 36px; }
        .contact-links { list-style: none; padding: 0; margin: 0; border-top: 1px solid var(--rule-strong); }
        .contact-links li { display: grid; grid-template-columns: 110px 1fr; gap: 16px; align-items: center; min-height: 56px; border-bottom: 1px solid var(--rule); }
        .contact-links a {
          color: var(--dark); font-size: 17px; text-decoration: underline; text-decoration-color: var(--rule-strong);
          text-underline-offset: 5px; overflow-wrap: anywhere; padding: 12px 0; transition: color 0.2s, text-decoration-color 0.2s;
        }
        .contact-links a:hover { color: var(--accent-text); text-decoration-color: currentColor; }
        .status-card { background: var(--surface); border: 1px solid var(--rule); border-top: 3px solid #16a34a; padding: 28px; }
        .status-value {
          display: flex; align-items: center; gap: 12px; margin: 8px 0 14px;
          font-family: var(--font-sans), sans-serif; font-weight: 600; font-size: 28px; color: #15803d; letter-spacing: -0.02em;
        }
        .status-card ul { list-style: none; padding: 0; margin: 0; }
        .status-card li { padding: 6px 0; border-top: 1px solid var(--rule); font-size: 15.5px; }
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr; gap: 40px; }
        }
        @media (max-width: 480px) {
          .contact-links li { grid-template-columns: 1fr; gap: 0; padding-top: 10px; }
          .contact-links a { padding-top: 2px; }
        }
      `}</style>
    </section>
  );
}
