"use client";
import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{
        position: "fixed",
        bottom: 32, right: 32,
        width: 42, height: 42,
        background: "var(--accent)",
        color: "#fff",
        border: "none",
        cursor: "pointer",
        fontSize: 18,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 0.3s, transform 0.3s, background 0.2s",
        pointerEvents: visible ? "auto" : "none",
        zIndex: 50,
      }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#a85508")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--accent)")}
    >
      ↑
    </button>
  );
}
