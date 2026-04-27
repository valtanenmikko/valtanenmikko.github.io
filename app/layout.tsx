import type { Metadata } from "next";
import { Syne, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mikko Valtanen — Data Engineer",
  description:
    "Mikko Valtanen — Data Engineer & AI Practitioner based in Turku, Finland. Building data pipelines, ML systems, and intelligent tools. Open to junior DE and analyst roles.",
  authors: [{ name: "Mikko Valtanen" }],
  openGraph: {
    title: "Mikko Valtanen — Data Engineer",
    description:
      "From sheet metal to data pipelines — a deliberate career change, built from scratch.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Mikko Valtanen — Data Engineer",
    description: "From sheet metal to data pipelines — a deliberate career change, built from scratch.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${ibmPlexMono.variable}`}>
      <body style={{ fontFamily: "var(--font-mono), monospace" }}>
        {children}
      </body>
    </html>
  );
}
