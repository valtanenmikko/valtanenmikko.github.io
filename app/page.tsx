"use client";
import { useState, useEffect } from "react";
import type { Lang } from "@/lib/i18n";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import AISection from "@/components/AISection";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import StatsStrip from "@/components/StatsStrip";

const Divider = () => (
  <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 52px" }}>
    <hr style={{ border: "none", borderTop: "1px solid var(--border-s)" }} />
  </div>
);

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved === "fi") setLang("fi");
  }, []);

  const handleLangChange = (l: Lang) => {
    setLang(l);
    localStorage.setItem("lang", l);
    document.documentElement.lang = l;
  };

  return (
    <>
      <ScrollProgress />
      <BackToTop />
      <Nav lang={lang} onLangChange={handleLangChange} />
      <Hero lang={lang} />
      <main>
        <About lang={lang} />
        <Divider />
        <Projects lang={lang} />
        <StatsStrip />
        <Divider />
        <AISection lang={lang} />
        <Divider />
        <Skills lang={lang} />
        <Divider />
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  );
}
