// Fetches live venue and category counts from turkumove.fi and writes them to
// lib/turkumove-stats.json before each build. On any failure the existing file
// is kept, so a TurkuMove outage never breaks the portfolio deploy.
import { readFile, writeFile } from "node:fs/promises";

const SOURCE = "https://turkumove.fi/venues.json";
const TARGET = new URL("../lib/turkumove-stats.json", import.meta.url);

async function main() {
  const res = await fetch(SOURCE, { signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const venues = await res.json();
  if (!Array.isArray(venues) || venues.length === 0) throw new Error("unexpected venues.json shape");

  const stats = {
    venues: venues.length,
    categories: new Set(venues.map((v) => v.category).filter(Boolean)).size,
  };

  const previous = await readFile(TARGET, "utf8").catch(() => "");
  const next = JSON.stringify(stats, null, 2) + "\n";
  if (previous !== next) await writeFile(TARGET, next);
  console.log(`turkumove-stats: ${stats.venues} venues, ${stats.categories} categories`);
}

main().catch((err) => {
  console.warn(`turkumove-stats: keeping previous values (${err.message})`);
});
