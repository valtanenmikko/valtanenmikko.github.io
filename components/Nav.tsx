"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { translations, type Lang } from "@/lib/i18n";

interface NavProps {
  lang: Lang;
  onLangChange: (l: Lang) => void;
}

export default function Nav({ lang, onLangChange }: NavProps) {
  const t = translations[lang];
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setMenuOpen(false);
  const links = [
    { href: "#about", label: t["nav-about"] },
    { href: "#projects", label: t["nav-projects"] },
    { href: "#ai", label: t["nav-ai"] },
    { href: "#skills", label: t["nav-skills"] },
    { href: "#contact", label: t["nav-contact"] },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        padding: "18px 52px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 100,
        backdropFilter: "blur(16px) saturate(1.4)",
        background: scrolled ? "rgba(244,241,236,0.95)" : "rgba(244,241,236,0.88)",
        borderBottom: `1px solid var(--border-s)`,
        transition: "background 0.3s",
      }}
    >
      <a
        href="#"
        style={{
          fontFamily: "var(--font-syne), sans-serif",
          fontWeight: 800,
          fontSize: 17,
          letterSpacing: "-0.03em",
          color: "var(--dark)",
          textDecoration: "none",
        }}
      >
        MV<span style={{ color: "var(--accent)" }}>.</span>
      </a>

      {/* Desktop */}
      <div style={{ display: "flex", alignItems: "center", gap: 36 }} className="desktop-nav">
        <ul style={{ display: "flex", gap: 36, listStyle: "none", margin: 0, padding: 0 }}>
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                style={{
                  color: "var(--muted)",
                  textDecoration: "none",
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--accent)")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--muted)")}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          onClick={() => onLangChange(lang === "en" ? "fi" : "en")}
          style={{
            background: "transparent",
            border: "1px solid var(--border-a)",
            color: "var(--accent)",
            fontFamily: "var(--font-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.12em",
            padding: "8px 16px",
            cursor: "pointer",
            transition: "background 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "var(--accent)";
            (e.currentTarget as HTMLElement).style.color = "var(--bg)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "transparent";
            (e.currentTarget as HTMLElement).style.color = "var(--accent)";
          }}
        >
          {t["lang-btn"]}
        </button>
      </div>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(244,241,236,0.97)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 40,
            zIndex: 99,
          }}
        >
          <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 32, textAlign: "center" }}>
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={close}
                  style={{ color: "var(--dark)", textDecoration: "none", fontSize: 14, letterSpacing: "0.18em", textTransform: "uppercase" }}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            onClick={() => { onLangChange(lang === "en" ? "fi" : "en"); close(); }}
            style={{ background: "transparent", border: "1px solid var(--border-a)", color: "var(--accent)", fontFamily: "var(--font-mono), monospace", fontSize: 13, padding: "8px 20px", cursor: "pointer" }}
          >
            {t["lang-btn"]}
          </button>
        </div>
      )}

      {/* Hamburger */}
      <button
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        onClick={() => setMenuOpen((v) => !v)}
        style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "none", flexDirection: "column", gap: 5, position: "relative", zIndex: 101 }}
        className="hamburger-btn"
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              display: "block",
              width: 22,
              height: 2,
              background: "var(--dark)",
              transition: "transform 0.3s, opacity 0.3s",
              transform: menuOpen
                ? i === 0 ? "translateY(7px) rotate(45deg)"
                : i === 2 ? "translateY(-7px) rotate(-45deg)"
                : "none"
                : "none",
              opacity: menuOpen && i === 1 ? 0 : 1,
            }}
          />
        ))}
      </button>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
        @media (min-width: 901px) {
          nav > *:last-child { display: none !important; }
        }
      `}</style>
    </motion.nav>
  );
}
