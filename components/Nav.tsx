"use client";
import { useState, useEffect, useRef } from "react";
import { translations, type Lang } from "@/lib/i18n";

interface NavProps {
  lang: Lang;
  onLangChange: (l: Lang) => void;
}

export default function Nav({ lang, onLangChange }: NavProps) {
  const t = translations[lang].nav;
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const links = [
    { href: "#projects", label: t.projects },
    { href: "#background", label: t.background },
    { href: "#skills", label: t.skills },
    { href: "#contact", label: t.contact },
  ];

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const switchLang = () => onLangChange(lang === "en" ? "fi" : "en");

  return (
    <header className="site-nav">
      <nav className="container nav-inner" aria-label="Main">
        <a href="#main" className="nav-logo">
          Mikko Valtanen
        </a>

        <ul className="nav-links">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <button type="button" onClick={switchLang} className="lang-btn" aria-label={t.langLabel}>
            {t.langBtn}
          </button>
          <button
            ref={toggleRef}
            type="button"
            className="menu-btn"
            aria-label={menuOpen ? t.menuClose : t.menuOpen}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className={menuOpen ? "bar bar-open-1" : "bar"} />
            <span className={menuOpen ? "bar bar-open-2" : "bar"} />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div id="mobile-menu" className="mobile-menu">
          <ul>
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setMenuOpen(false)}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <style>{`
        .site-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          background: rgba(244,241,236,0.92);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--rule);
        }
        .nav-inner { height: var(--nav-h); display: flex; align-items: center; justify-content: space-between; gap: 24px; }
        .nav-logo {
          display: inline-flex; align-items: center; min-height: 44px;
          font-family: var(--font-sans), sans-serif; font-weight: 600; font-size: 18px;
          letter-spacing: -0.02em; color: var(--dark); text-decoration: none;
        }
        .nav-links { display: flex; gap: 32px; list-style: none; margin: 0 0 0 auto; padding: 0; }
        .nav-links a, .mobile-menu a {
          font-family: var(--font-mono), monospace; font-size: 14px; color: var(--muted);
          text-decoration: none; transition: color 0.2s;
        }
        .nav-links a:hover { color: var(--dark); }
        .nav-actions { display: flex; align-items: center; gap: 8px; }
        .lang-btn {
          min-width: 44px; height: 40px; padding: 0 12px; cursor: pointer;
          background: transparent; border: 1px solid var(--rule-strong); color: var(--dark);
          font-family: var(--font-mono), monospace; font-size: 13px; font-weight: 500; letter-spacing: 0.08em;
          transition: background 0.2s, color 0.2s;
        }
        .lang-btn:hover { background: var(--dark); color: var(--bg); }
        .menu-btn {
          display: none; width: 44px; height: 44px; cursor: pointer;
          background: none; border: none; position: relative;
        }
        .bar {
          position: absolute; left: 11px; width: 22px; height: 2px; background: var(--dark);
          transition: transform 0.25s;
        }
        .bar:first-child { top: 17px; }
        .bar:last-child { top: 25px; }
        .bar-open-1 { transform: translateY(4px) rotate(45deg); }
        .bar-open-2 { transform: translateY(-4px) rotate(-45deg); }
        .mobile-menu {
          position: fixed; top: var(--nav-h); left: 0; right: 0; bottom: 0;
          background: var(--bg); border-top: 1px solid var(--rule);
        }
        .mobile-menu ul { list-style: none; margin: 0; padding: 16px var(--gutter); }
        .mobile-menu li { border-bottom: 1px solid var(--rule); }
        .mobile-menu a { display: flex; align-items: center; min-height: 56px; font-size: 17px; color: var(--dark); }
        @media (max-width: 760px) {
          .nav-links { display: none; }
          .menu-btn { display: block; }
        }
        @media (min-width: 761px) {
          .mobile-menu { display: none; }
        }
      `}</style>
    </header>
  );
}
