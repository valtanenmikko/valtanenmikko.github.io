# Portfolio

Personal portfolio site, live at https://valtanenmikko.github.io.

Next.js (static export), React, TypeScript. Content in English and Finnish lives in `lib/i18n.ts`.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export to out/
```

`npm run build` first runs `scripts/turkumove-stats.mjs`, which refreshes the TurkuMove venue counts in
`lib/turkumove-stats.json`. Pushes to `main` deploy to GitHub Pages through `.github/workflows/deploy.yml`,
which also rebuilds daily.
