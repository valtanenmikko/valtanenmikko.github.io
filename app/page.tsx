"use client";
import { useEffect, useSyncExternalStore } from "react";
import { MotionConfig } from "framer-motion";
import { translations, type Lang } from "@/lib/i18n";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// The chosen language lives in localStorage; the static HTML is rendered in English.
const langListeners = new Set<() => void>();

function subscribeLang(cb: () => void) {
  langListeners.add(cb);
  return () => langListeners.delete(cb);
}

function readLang(): Lang {
  try {
    return localStorage.getItem("lang") === "fi" ? "fi" : "en";
  } catch {
    return "en";
  }
}

export default function Home() {
  const lang = useSyncExternalStore(subscribeLang, readLang, () => "en" as Lang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const handleLangChange = (l: Lang) => {
    try {
      localStorage.setItem("lang", l);
    } catch {}
    langListeners.forEach((cb) => cb());
  };

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">
        {translations[lang].nav.skip}
      </a>
      <Nav lang={lang} onLangChange={handleLangChange} />
      <main id="main">
        <Hero lang={lang} />
        <Projects lang={lang} />
        <About lang={lang} />
        <Skills lang={lang} />
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} />
    </MotionConfig>
  );
}
