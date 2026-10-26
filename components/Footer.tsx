"use client";
import { translations, type Lang } from "@/lib/i18n";

export default function Footer({ lang }: { lang: Lang }) {
  const t = translations[lang].footer;
  return (
    <footer style={{ borderTop: "1px solid var(--rule)" }}>
      <div
        className="container meta"
        style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", padding: "28px var(--gutter)" }}
      >
        <span>{t.left}</span>
        <span>{t.right}</span>
      </div>
    </footer>
  );
}
