"use client";
import { translations, type Lang } from "@/lib/i18n";

export default function Footer({ lang }: { lang: Lang }) {
  const t = translations[lang];
  return (
    <footer
      style={{
        position: "relative",
        zIndex: 1,
        padding: "28px 52px",
        borderTop: "1px solid var(--border-s)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: 11,
        color: "var(--muted)",
      }}
    >
      <span>{t["footer-left"]}</span>
      <span>{t["footer-right"]}</span>
    </footer>
  );
}
