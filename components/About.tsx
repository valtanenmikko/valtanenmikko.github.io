"use client";
import Image from "next/image";
import { useRef, useEffect } from "react";
import { useInView } from "framer-motion";
import Reveal from "./Reveal";
import { translations, type Lang } from "@/lib/i18n";

function AnimCount({ value, suffix = "" }: { value: number; suffix?: string }) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(wrapRef, { once: true });

  useEffect(() => {
    if (!inView || !numRef.current) return;
    let curr = 0;
    const steps = 50;
    const inc = value / steps;
    const timer = setInterval(() => {
      curr = Math.min(curr + inc, value);
      if (numRef.current) numRef.current.textContent = Math.round(curr).toString();
      if (curr >= value) clearInterval(timer);
    }, 1400 / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={wrapRef}>
      <span ref={numRef}>0</span>
      {suffix}
    </span>
  );
}

export default function About({ lang }: { lang: Lang }) {
  const t = translations[lang];

  const tlItems = [
    {
      color: "#c96a0a",
      role: t["tl1-role"],
      org: t["tl1-org"],
      detail: t["tl1-detail"],
      stat: { num: 75, suffix: "%", unit: t["tl1-unit"] },
    },
    { color: "#0d9e85", role: t["tl2-role"], org: t["tl2-org"], detail: t["tl2-detail"] },
    { color: "#7a7068", role: t["tl3-role"], org: t["tl3-org"], detail: t["tl3-detail"] },
  ];

  return (
    <section id="about" style={{ padding: "128px 52px", maxWidth: 1240, margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          fontSize: 10,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--accent)",
          marginBottom: 18,
        }}
      >
        <span style={{ color: "var(--muted)" }}>01 /</span> {t["about-label"]}
      </div>

      <Reveal>
        <h2
          style={{
            fontFamily: "var(--font-syne), sans-serif",
            fontWeight: 800,
            fontSize: "clamp(34px, 5.5vw, 60px)",
            lineHeight: 1,
            letterSpacing: "-0.035em",
            color: "var(--dark)",
            marginBottom: 56,
          }}
        >
          {t["about-title-1"]}
          <br />
          {t["about-title-2"]}
        </h2>
      </Reveal>

      <div
        style={{ display: "grid", gridTemplateColumns: "55fr 45fr", gap: 88, alignItems: "start" }}
        className="about-grid"
      >
        <Reveal delay={0.08}>
          <Image
            src="/assets/face.jpg"
            alt="Mikko Valtanen"
            width={280}
            height={373}
            style={{
              width: "100%",
              maxWidth: 280,
              borderRadius: 4,
              objectFit: "cover",
              objectPosition: "center 18%",
              border: "1px solid var(--border-a)",
              marginBottom: 28,
              display: "block",
            }}
          />
          {[
            { text: t["about-p1"] },
            { text: t["about-p2"] },
            { text: t["about-p3"] },
          ].map((p, i) => (
            <p key={i} style={{ color: "var(--text)", marginBottom: 20, lineHeight: 1.9, fontSize: 13 }}>
              {p.text}
            </p>
          ))}
        </Reveal>

        <Reveal delay={0.16}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {tlItems.map((item, i) => (
              <div
                key={i}
                style={{
                  position: "relative",
                  padding: "22px 24px 22px 27px",
                  background: "var(--surface)",
                  border: "1px solid var(--border-s)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: 0, top: 0, bottom: 0,
                    width: 3,
                    background: item.color,
                  }}
                />
                <div
                  style={{
                    fontFamily: "var(--font-syne), sans-serif",
                    fontWeight: 700,
                    fontSize: 13,
                    color: "var(--dark)",
                    marginBottom: 3,
                  }}
                >
                  {item.role}
                </div>
                <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 9 }}>{item.org}</div>
                <div style={{ fontSize: 12, color: "var(--text)", fontStyle: "italic", lineHeight: 1.6 }}>
                  {item.detail}
                </div>
                {item.stat && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 6,
                      marginTop: 10,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-syne), sans-serif",
                        fontWeight: 800,
                        fontSize: 32,
                        color: "var(--accent)",
                        lineHeight: 1,
                      }}
                    >
                      <AnimCount value={item.stat.num} suffix={item.stat.suffix} />
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        color: "var(--muted)",
                        maxWidth: 160,
                        lineHeight: 1.4,
                      }}
                    >
                      {item.stat.unit}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
