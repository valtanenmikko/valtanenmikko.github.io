"use client";

type Shape = "circle" | "square" | "diamond" | "ring" | "triangle" | "cross";

const TECHS: { color: string; shape: Shape; label: string }[] = [
  { color: "#3776ab", shape: "circle",   label: "Python" },
  { color: "#e97c00", shape: "square",   label: "SQL" },
  { color: "#ffc832", shape: "diamond",  label: "DuckDB" },
  { color: "#017cee", shape: "cross",    label: "Airflow" },
  { color: "#ff6f00", shape: "triangle", label: "TensorFlow" },
  { color: "#00adef", shape: "ring",     label: "YOLOv8" },
  { color: "#c96a0a", shape: "diamond",  label: "Claude AI" },
  { color: "#336791", shape: "circle",   label: "PostgreSQL" },
  { color: "#0db7ed", shape: "square",   label: "Docker" },
  { color: "#009688", shape: "cross",    label: "FastAPI" },
  { color: "#199900", shape: "triangle", label: "Leaflet" },
  { color: "#2ead33", shape: "ring",     label: "Playwright" },
  { color: "#f7931e", shape: "diamond",  label: "scikit-learn" },
  { color: "#7c3aed", shape: "circle",   label: "LSTM" },
  { color: "#150458", shape: "square",   label: "Pandas" },
  { color: "#4dabcf", shape: "cross",    label: "NumPy" },
  { color: "#0078d4", shape: "ring",     label: "Azure" },
  { color: "#ff9900", shape: "triangle", label: "AWS" },
];

function Icon({ color, shape }: { color: string; shape: Shape }) {
  return (
    <div
      style={{
        width: 48,
        height: 48,
        flexShrink: 0,
        background: `${color}12`,
        border: `1px solid ${color}28`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {shape === "circle" && (
        <div style={{ width: 22, height: 22, borderRadius: "50%", background: color }} />
      )}
      {shape === "square" && (
        <div style={{ width: 18, height: 18, background: color }} />
      )}
      {shape === "diamond" && (
        <div style={{ width: 16, height: 16, background: color, transform: "rotate(45deg)" }} />
      )}
      {shape === "ring" && (
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: "50%",
            border: `3px solid ${color}`,
          }}
        />
      )}
      {shape === "triangle" && (
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: "11px solid transparent",
            borderRight: "11px solid transparent",
            borderBottom: `18px solid ${color}`,
          }}
        />
      )}
      {shape === "cross" && (
        <div style={{ position: "relative", width: 20, height: 20 }}>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              right: 0,
              height: 4,
              background: color,
              transform: "translateY(-50%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: 4,
              background: color,
              transform: "translateX(-50%)",
            }}
          />
        </div>
      )}
    </div>
  );
}

export default function Ticker() {
  const items = [...TECHS, ...TECHS];
  return (
    <div
      style={{
        overflow: "hidden",
        padding: "12px 0",
        background: "var(--surface)",
        borderTop: "1px solid var(--border-s)",
        borderBottom: "1px solid var(--border-s)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 10,
          width: "max-content",
          animation: "ticker 26s linear infinite",
          willChange: "transform",
        }}
      >
        {items.map((item, i) => (
          <Icon key={i} color={item.color} shape={item.shape} />
        ))}
      </div>
      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
