"use client";
import { translations, type Lang } from "@/lib/i18n";
import Reveal from "./Reveal";

export default function Contact({ lang }: { lang: Lang }) {
  const t = translations[lang];

  const links = [
    { href: "mailto:valtanenmikko@gmail.com", icon: "@", label: "valtanenmikko@gmail.com", ariaLabel: "Email" },
    { href: "https://github.com/valtanenmikko", icon: "gh", label: "github.com/valtanenmikko", ariaLabel: "GitHub profile (opens in new tab)", external: true },
    { href: "https://www.linkedin.com/in/valtanenmikko/", icon: "in", label: "linkedin.com/in/valtanenmikko", ariaLabel: "LinkedIn profile (opens in new tab)", external: true },
  ];

  return (
    <section id="contact" style={{ padding: "128px 52px", maxWidth: 1240, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 18 }}>
        <span style={{ color: "var(--muted)" }}>05 /</span> {t["contact-label"]}
      </div>

      <Reveal>
        <h2 style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 800, fontSize: "clamp(34px, 5.5vw, 60px)", lineHeight: 1, letterSpacing: "-0.035em", color: "var(--dark)", marginBottom: 56 }}>
          {t["contact-title-1"]}<br />{t["contact-title-2"]}
        </h2>
      </Reveal>

      <Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 100, alignItems: "start" }} className="contact-layout">
          <div>
            <p style={{ fontSize: 13, color: "var(--text)", lineHeight: 1.85, marginBottom: 40, maxWidth: 420 }}>{t["contact-text"]}</p>
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noopener noreferrer" : undefined}
                aria-label={l.ariaLabel}
                style={{ display: "flex", alignItems: "center", gap: 14, color: "var(--dark)", textDecoration: "none", fontSize: 13, marginBottom: 14, transition: "color 0.2s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--dark)")}
              >
                <div style={{ width: 36, height: 36, border: "1px solid var(--border-a)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "var(--accent)", flexShrink: 0 }}>
                  {l.icon}
                </div>
                {l.label}
              </a>
            ))}
          </div>

          <div style={{ padding: 32, background: "var(--surface)", border: "1px solid var(--border-a)", minWidth: 270 }}>
            <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 14 }}>{t["avail-label"]}</div>
            <div style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 800, fontSize: 28, color: "#16a34a", marginBottom: 10, letterSpacing: "-0.02em" }}>{t["avail-status"]}</div>
            <div style={{ fontSize: 12, color: "var(--text)", lineHeight: 1.8 }}>
              {t["avail-detail-1"]}<br />{t["avail-detail-2"]}<br />{t["avail-detail-3"]}
            </div>
          </div>
        </div>
      </Reveal>

      <style>{`@media (max-width: 900px) { .contact-layout { grid-template-columns: 1fr !important; gap: 40px !important; } }`}</style>
    </section>
  );
}
