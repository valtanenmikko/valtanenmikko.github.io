"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { translations, type Lang } from "@/lib/i18n";
import Reveal from "./Reveal";

const Tag = ({ label }: { label: string }) => (
  <span
    style={{
      padding: "3px 10px",
      background: "rgba(201,106,10,0.07)",
      border: "1px solid rgba(201,106,10,0.22)",
      fontSize: 10,
      letterSpacing: "0.04em",
      color: "var(--accent)",
    }}
  >
    {label}
  </span>
);

function Card({
  children,
  featured = false,
  delay = 0,
}: {
  children: React.ReactNode;
  featured?: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });

  const cardStyle: React.CSSProperties = {
    background: "var(--surface)",
    padding: 40,
    position: "relative",
    overflow: "hidden",
    ...(featured ? { gridColumn: "span 3", borderTop: "3px solid var(--accent)" } : {}),
  };

  const contentStyle: React.CSSProperties = featured
    ? { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, position: "relative", zIndex: 1 }
    : { position: "relative", zIndex: 1 };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
      whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.1)" }}
      style={cardStyle}
      className={featured ? "card-featured" : ""}
    >
      <div
        style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: 2,
          background: "var(--accent)",
          transformOrigin: "left",
          transform: "scaleX(0)",
          transition: "transform 0.4s ease",
        }}
        className="card-underline"
      />
      <div style={contentStyle}>{children}</div>
    </motion.div>
  );
}

export default function Projects({ lang }: { lang: Lang }) {
  const t = translations[lang];

  return (
    <section id="projects" style={{ padding: "128px 52px", maxWidth: 1240, margin: "0 auto" }}>
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
        <span style={{ color: "var(--muted)" }}>02 /</span> {t["projects-label"]}
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
          {t["projects-title-1"]}
          <br />
          {t["projects-title-2"]}
        </h2>
      </Reveal>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2 }}
        className="projects-grid"
      >
        {/* Featured */}
        <Card featured delay={0}>
          <div>
            <div
              style={{
                fontSize: 10,
                letterSpacing: "0.2em",
                color: "var(--accent)",
                marginBottom: 14,
                textTransform: "uppercase",
              }}
            >
              {t["p1-num"]}
            </div>
            <h3
              style={{
                fontFamily: "var(--font-syne), sans-serif",
                fontWeight: 700,
                fontSize: 19,
                color: "var(--dark)",
                marginBottom: 12,
                lineHeight: 1.15,
              }}
            >
              {t["p1-title"]}
            </h3>
            <p style={{ fontSize: 12.5, color: "var(--text)", lineHeight: 1.75, marginBottom: 20 }}>
              {t["p1-desc"]}
            </p>
            <p style={{ fontSize: 11, color: "var(--teal)", fontStyle: "italic", marginBottom: 24 }}>
              {t["p1-note"]}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {["Python", "Playwright", "DuckDB", "Claude API", "REST APIs", "Google Drive API"].map(
                (tag) => <Tag key={tag} label={tag} />
              )}
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: 10,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--muted)",
                marginBottom: 10,
              }}
            >
              {t["p1-meta-steps"]}
            </div>
            <ul style={{ listStyle: "none", padding: 0, marginBottom: 32 }}>
              {[
                t["p1-step1"],
                t["p1-step2"],
                t["p1-step3"],
                t["p1-step4"],
                t["p1-step5"],
                t["p1-step6"],
              ].map((s, i) => (
                <li
                  key={i}
                  style={{
                    padding: "7px 0",
                    borderBottom: i < 5 ? "1px solid var(--border-s)" : "none",
                    display: "flex",
                    gap: 12,
                    fontSize: 12,
                    color: "var(--text)",
                  }}
                >
                  <span style={{ color: "var(--accent)", flexShrink: 0 }}>0{i + 1}</span>
                  {s}
                </li>
              ))}
            </ul>
            <div
              style={{
                fontSize: 10,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--muted)",
                marginBottom: 10,
              }}
            >
              {t["p1-arch-title"]}
            </div>
            <p style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.7 }}>{t["p1-arch-desc"]}</p>
          </div>
        </Card>

        {[
          {
            num: t["p2-num"],
            title: t["p2-title"],
            desc: t["p2-desc"],
            tags: ["Python", "PostgreSQL", "Apache Airflow", "Docker", "SQL"],
          },
          {
            num: t["p3-num"],
            title: t["p3-title"],
            desc: t["p3-desc"],
            tags: ["Python", "FastAPI", "Machine Learning", "Data Visualization", "Geospatial"],
          },
          {
            num: t["p4-num"],
            title: t["p4-title"],
            desc: t["p4-desc"],
            tags: ["Python", "scikit-learn", "Pandas", "Logistic Regression", "Linear Regression"],
          },
          {
            num: t["p5-num"],
            title: t["p5-title"],
            desc: t["p5-desc"],
            tags: ["Python", "NLP", "Machine Learning", "Data Analysis"],
          },
          {
            num: t["p6-num"],
            title: t["p6-title"],
            desc: t["p6-desc"],
            note: t["p6-note"],
            tags: ["Research", "LLM Evaluation", "UX Analysis", "AI"],
          },
          {
            num: t["p7-num"],
            title: t["p7-title"],
            desc: t["p7-desc"],
            note: t["p7-note"],
            noteHref: "https://valtanenmikko.github.io/turkumove",
            tags: ["JavaScript", "Leaflet.js", "Geocoding API", "Node.js"],
          },
        ].map((p, i) => (
          <Card key={i} delay={i * 0.05}>
            <div>
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  color: "var(--accent)",
                  marginBottom: 14,
                  textTransform: "uppercase",
                }}
              >
                {p.num}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-syne), sans-serif",
                  fontWeight: 700,
                  fontSize: 19,
                  color: "var(--dark)",
                  marginBottom: 12,
                  lineHeight: 1.15,
                }}
              >
                {p.title}
              </h3>
              <p style={{ fontSize: 12.5, color: "var(--text)", lineHeight: 1.75, marginBottom: 20 }}>
                {p.desc}
              </p>
              {p.note &&
                (p.noteHref ? (
                  <a
                    href={p.noteHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: 11,
                      color: "var(--teal)",
                      fontStyle: "italic",
                      marginBottom: 24,
                      display: "block",
                      textDecoration: "none",
                    }}
                  >
                    {p.note}
                  </a>
                ) : (
                  <p style={{ fontSize: 11, color: "var(--teal)", fontStyle: "italic", marginBottom: 24 }}>
                    {p.note}
                  </p>
                ))}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {p.tags.map((tag) => (
                  <Tag key={tag} label={tag} />
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <style>{`
        .projects-grid { grid-template-columns: 1fr 1fr 1fr; }
        .card-featured { grid-column: span 3; }
        .card-featured > div { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; }
        @media (max-width: 1100px) {
          .projects-grid { grid-template-columns: 1fr 1fr !important; }
          .card-featured { grid-column: span 2 !important; }
          .card-featured > div { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
        @media (max-width: 600px) {
          .projects-grid { grid-template-columns: 1fr !important; }
          .card-featured { grid-column: span 1 !important; }
        }
        .card-underline { position: absolute; bottom: 0; left: 0; right: 0; }
        motion-div:hover .card-underline { transform: scaleX(1) !important; }
      `}</style>
    </section>
  );
}
