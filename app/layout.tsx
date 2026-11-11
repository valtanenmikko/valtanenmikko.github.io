import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const title = "Mikko Valtanen · Junior Data Engineer";
const description =
  "Junior data engineer in Turku, Finland. Data pipelines with Python, SQL, Databricks and Airflow. BBA in Data Engineering & AI, Turku UAS 2025. Looking for data engineering and AI roles in Turku (on-site or hybrid) or remote.";

export const metadata: Metadata = {
  title,
  description,
  authors: [{ name: "Mikko Valtanen" }],
  openGraph: { title, description, type: "website" },
  twitter: { card: "summary", title, description },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${ibmPlexSans.variable} ${ibmPlexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
