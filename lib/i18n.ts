import turkumove from "./turkumove-stats.json";

export type Lang = "en" | "fi";

export interface Fact {
  value: string;
  label: string;
}

export interface Project {
  id: string;
  kind: string;
  title: string;
  summary: string;
  points: string[];
  facts?: Fact[];
  stack: string[];
  link?: { href: string; label: string };
  repo?: { href: string; label: string };
  status?: string;
}

export interface TimelineItem {
  period: string;
  role: string;
  org: string;
  detail: string;
  link?: { href: string; label: string };
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface Content {
  nav: { projects: string; background: string; skills: string; contact: string; langBtn: string; langLabel: string; skip: string; menuOpen: string; menuClose: string };
  hero: {
    role: string;
    lede: string;
    spec: Fact[];
    ctaPrimary: string;
    ctaSecondary: string;
  };
  projects: {
    label: string;
    title: string;
    intro: string;
    featured: Project;
    pipeline: { caption: string; sources: string; bronze: string; silver: string; llm: string; gold: string; out: string };
    items: Project[];
    courseworkLabel: string;
    coursework: Project[];
  };
  background: {
    label: string;
    title: string;
    story: string[];
    timeline: TimelineItem[];
  };
  skills: {
    label: string;
    title: string;
    groups: SkillGroup[];
    extra: SkillGroup[];
  };
  contact: {
    label: string;
    title: string;
    text: string;
    statusLabel: string;
    status: string;
    statusDetail: string[];
    newTab: string;
  };
  footer: { left: string; right: string };
}

const THESIS_URL = "https://www.theseus.fi/handle/10024/902146";

const en: Content = {
  nav: {
    projects: "Projects",
    background: "Background",
    skills: "Skills",
    contact: "Contact",
    langBtn: "FI",
    langLabel: "Vaihda kieli suomeksi",
    skip: "Skip to content",
    menuOpen: "Open menu",
    menuClose: "Close menu",
  },
  hero: {
    role: "Junior Data Engineer",
    lede: "I build data pipelines with Python and SQL, from API ingestion to analysis-ready tables. Tools include Databricks, Airflow and PostgreSQL.",
    spec: [
      { label: "Degree", value: "BBA, Data Engineering & AI · Turku UAS, 2025" },
      { label: "Based in", value: "Turku, Finland" },
      { label: "Looking for", value: "Data engineering & AI roles" },
      { label: "Open to", value: "Turku · Remote" },
      { label: "Status", value: "Available now" },
    ],
    ctaPrimary: "View projects",
    ctaSecondary: "Get in touch",
  },
  projects: {
    label: "Projects",
    title: "What I've built",
    intro: "Personal projects first, coursework at the end.",
    featured: {
      id: "infra",
      kind: "Personal project",
      status: "Live",
      link: { href: "https://valtanenmikko.github.io/infra-intelligence/", label: "Demo site" },
      repo: { href: "https://github.com/valtanenmikko/infra-intelligence", label: "Source on GitHub" },
      title: "Tender intelligence for infrastructure contractors",
      summary:
        "A bid team needs to know which open tenders are worth bidding on, who the competitors are and where competition is thin. This pipeline answers that from public EU procurement data and the Finnish company register.",
      points: [
        "ELT pipeline on Databricks using the medallion architecture, run daily. Bronze keeps raw data unchanged, Silver cleans it, Gold holds the SQL tables for analysis.",
        "Companies are matched by business ID through the PRH register, not by name. Data quality problems I found are fixed in code and documented.",
        "An LLM extracts location, contract period and risk factors from free text. Its output is checked against structured fields the model never sees.",
        "The go/no-go score is computed with fixed weights, and the history factors are backtested on past awards. A bid portfolio planner suggests how many tenders to bid on given limited capacity.",
      ],
      stack: ["Python", "Databricks", "Delta Lake", "Spark SQL", "Unity Catalog", "Gemini API", "REST APIs"],
    },
    pipeline: {
      caption: "Pipeline overview",
      sources: "EU TED API · PRH API",
      bronze: "Raw JSON, incremental MERGE",
      silver: "Typed, deduplicated, resolved by business ID",
      llm: "LLM extraction + evaluation",
      gold: "Market share, competition, open tenders",
      out: "Go/no-go + bid portfolio",
    },
    items: [
      {
        id: "turkumove",
        kind: "Personal project · Live",
        title: "TurkuMove",
        summary: "Interactive map of sports venues in Turku. I built it alone and still maintain it.",
        points: [
          "Venue data kept as JSON with a geocoding step. A Node.js script generates static Finnish and English pages for every sport and venue, plus the sitemap.",
          "Filter by sport, search by name, opening hours, contact details and directions.",
          "Admin panel that updates featured listings through the GitHub API.",
        ],
        facts: [
          { value: String(turkumove.venues), label: "venues" },
          { value: String(turkumove.categories), label: "sport categories" },
          { value: "685", label: "visitors / week" },
        ],
        stack: ["JavaScript", "Leaflet.js", "Node.js", "Cloudflare", "SEO"],
        link: { href: "https://turkumove.fi", label: "turkumove.fi" },
      },
      {
        id: "jobs",
        kind: "Personal project",
        title: "Job market intelligence pipeline",
        summary: "Collects Finnish IT job listings and produces a filtered weekly shortlist.",
        points: [
          "Scrapes Duunitori and TE-palvelut with Playwright.",
          "The Claude API turns each listing into structured fields: skills, seniority and remote status.",
          "Stores and deduplicates in DuckDB, filters by location and seniority, and exports an Excel report to Google Drive.",
        ],
        stack: ["Python", "Playwright", "DuckDB", "Claude API", "Google Drive API"],
      },
      {
        id: "edu-ai",
        kind: "Prototype · Startup collaboration",
        title: "AI learning assistant prototype",
        summary: "MVP demo for an early-stage startup. A conversational learning assistant with text and voice.",
        points: [
          "FastAPI backend on the Claude API, with speech input and output in the browser.",
          "System prompt with safety rules.",
          "Topic tracking, with the model tagging the topic on every reply.",
        ],
        stack: ["Python", "FastAPI", "Claude API", "JavaScript", "Speech API"],
      },
    ],
    courseworkLabel: "Coursework",
    coursework: [
      {
        id: "etl",
        kind: "Coursework",
        title: "Weather data ETL pipeline",
        summary: "Automated ETL for Turku weather data from the OpenWeatherMap API. Ingestion, cleaning, transformation and loading into PostgreSQL, scheduled with Airflow DAGs and run in Docker.",
        points: [],
        stack: ["Python", "SQL", "PostgreSQL", "Apache Airflow", "Docker"],
      },
      {
        id: "ais",
        kind: "Coursework",
        title: "AIS maritime tracking and route prediction",
        summary: "Collects AIS vessel signals and plots ships with their headings on an interactive map. A machine learning model predicts routes from past movement, and a FastAPI layer serves the collected data.",
        points: [],
        stack: ["Python", "FastAPI", "Machine learning", "Geospatial"],
      },
    ],
  },
  background: {
    label: "Background",
    title: "From sheet metal to data",
    story: [
      "I worked as a construction sheet metal worker for about five years. In 2022 I switched careers, enrolled at Turku University of Applied Sciences and graduated in December 2025.",
      "Alongside the degree I took extra courses at other universities out of interest, including Azure Fundamentals and PowerShell at Metropolia.",
      "Now I'm looking for my first permanent role in data engineering or AI.",
    ],
    timeline: [
      {
        period: "2022 – 2025",
        role: "BBA, Business Information Technology · Data Engineering & AI",
        org: "Turku University of Applied Sciences",
        detail: "Weighted GPA 4.3 / 5. Grade 5 / 5 in Data Engineering, Cloud Services and Software Development Operations.",
      },
      {
        period: "2025",
        role: "Thesis: AI as an assistant in UX evaluation",
        org: "Comparing large language models with human usability testers",
        detail: "The LLMs found 75 % of the same usability issues as the human testers, compared with Jaccard similarity and Cohen's kappa. Written in Finnish, grade 4 / 5.",
        link: { href: THESIS_URL, label: "Read on Theseus" },
      },
      {
        period: "05 – 08 / 2024",
        role: "Web Design & Development, internship",
        org: "theFIRMA, Turku",
        detail: "Figma mockups for an external client, frontend and backend work on internal projects, WordPress build for a citizen IT support service.",
      },
      {
        period: "2014 – 2020",
        role: "Construction sheet metal worker",
        org: "Turku region",
        detail: "Edge trims and roofing. Military service 2015–2016 in between. Left the trade in early 2020.",
      },
    ],
  },
  skills: {
    label: "Skills",
    title: "What I work with",
    groups: [
      { label: "Languages", items: ["Python", "SQL", "JavaScript / TypeScript", "Java"] },
      { label: "Data platforms", items: ["Databricks", "Delta Lake", "Spark SQL", "PostgreSQL", "DuckDB", "MySQL", "MongoDB"] },
      { label: "Pipelines & tooling", items: ["Apache Airflow", "Docker", "Git", "GitHub Actions", "Playwright", "REST APIs", "FastAPI"] },
      { label: "AI & analysis", items: ["Claude API", "Gemini API", "LLM evaluation", "Pandas / NumPy", "scikit-learn", "TensorFlow / Keras"] },
    ],
    extra: [
      { label: "Cloud", items: ["Azure", "AWS", "Cloudflare"] },
      { label: "Deep learning coursework", items: ["CNNs and EfficientNet fine-tuning", "YOLOv3 / v8 object detection", "LSTM and Seq2Seq models"] },
      { label: "Spoken languages", items: ["Finnish, native", "English, B2"] },
    ],
  },
  contact: {
    label: "Contact",
    title: "Open to work",
    text: "I'm looking for a junior role in data engineering or AI, in Turku or remote. Email reaches me fastest.",
    statusLabel: "Current status",
    status: "Available",
    statusDetail: ["Data engineering & AI roles", "Turku · Remote", "Can start immediately"],
    newTab: "(opens in a new tab)",
  },
  footer: { left: "Mikko Valtanen · 2026", right: "Turku, Finland" },
};

const fi: Content = {
  nav: {
    projects: "Projektit",
    background: "Tausta",
    skills: "Osaaminen",
    contact: "Yhteystiedot",
    langBtn: "EN",
    langLabel: "Switch language to English",
    skip: "Siirry sisältöön",
    menuOpen: "Avaa valikko",
    menuClose: "Sulje valikko",
  },
  hero: {
    role: "Junior Data Engineer",
    lede: "Rakennan dataputkia Pythonilla ja SQL:llä, rajapintahausta analyysivalmiisiin tauluihin. Työkaluihin kuuluvat Databricks, Airflow ja PostgreSQL.",
    spec: [
      { label: "Tutkinto", value: "Tradenomi (AMK), Data Engineering & AI · Turun AMK, 2025" },
      { label: "Sijainti", value: "Turku" },
      { label: "Etsin", value: "Data engineering- ja AI-rooleja" },
      { label: "Avoin", value: "Turku · Etätyö" },
      { label: "Tilanne", value: "Vapaa heti" },
    ],
    ctaPrimary: "Katso projektit",
    ctaSecondary: "Ota yhteyttä",
  },
  projects: {
    label: "Projektit",
    title: "Mitä olen rakentanut",
    intro: "Omat projektit ensin, kurssityöt lopussa.",
    featured: {
      id: "infra",
      kind: "Oma projekti",
      status: "Julkaistu",
      link: { href: "https://valtanenmikko.github.io/infra-intelligence/", label: "Demosivu" },
      repo: { href: "https://github.com/valtanenmikko/infra-intelligence", label: "Lähdekoodi GitHubissa" },
      title: "Tarjouskilpailuanalytiikka infraurakoitsijoille",
      summary:
        "Tarjoustiimin pitää tietää, mihin avoimiin kilpailuihin kannattaa tarjota, ketkä kilpailevat vastaan ja missä kilpailu on vähäistä. Putki vastaa näihin EU:n julkisten hankintojen datasta ja PRH:n yritysrekisteristä.",
      points: [
        "ELT-putki Databricksissa medallion-arkkitehtuurilla, ajetaan päivittäin. Bronze säilyttää raakadatan muuttumattomana, Silver puhdistaa sen ja Goldissa ovat analyysin SQL-taulut.",
        "Yritykset yhdistetään Y-tunnuksella PRH:n rekisterin kautta, ei nimen perusteella. Löytämäni datan laatuongelmat on korjattu koodissa ja dokumentoitu.",
        "Kielimalli poimii vapaasta tekstistä sijainnin, sopimuskauden ja riskitekijät. Tuloksia verrataan rakenteisiin kenttiin, joita malli ei näe.",
        "Go/no-go-pisteet lasketaan kiinteillä painoilla, ja historiatekijät on testattu aiempia hankintoja vastaan. Tarjousportfolion suunnittelija ehdottaa, montako kilpailua kannattaa tarjota rajallisella kapasiteetilla.",
      ],
      stack: ["Python", "Databricks", "Delta Lake", "Spark SQL", "Unity Catalog", "Gemini API", "REST APIs"],
    },
    pipeline: {
      caption: "Putken rakenne",
      sources: "EU TED API · PRH API",
      bronze: "Raaka-JSON, inkrementaalinen MERGE",
      silver: "Tyypitetty, deduplikoitu, Y-tunnuksella yhdistetty",
      llm: "LLM-poiminta + arviointi",
      gold: "Markkinaosuudet, kilpailu, avoimet kilpailut",
      out: "Go/no-go + tarjousportfolio",
    },
    items: [
      {
        id: "turkumove",
        kind: "Oma projekti · Julkaistu",
        title: "TurkuMove",
        summary: "Interaktiivinen kartta Turun liikuntapaikoista. Rakensin sen yksin ja ylläpidän sitä edelleen.",
        points: [
          "Paikkadata JSON-muodossa geokoodausvaiheen kanssa. Node.js-skripti generoi staattiset suomen- ja englanninkieliset sivut jokaiselle lajille ja paikalle sekä sivukartan.",
          "Suodatus lajin mukaan, haku nimellä, aukioloajat, yhteystiedot ja reittiohjeet.",
          "Hallintapaneeli, joka päivittää nostetut paikat GitHub API:n kautta.",
        ],
        facts: [
          { value: String(turkumove.venues), label: "paikkaa" },
          { value: String(turkumove.categories), label: "lajia" },
          { value: "685", label: "kävijää / vko" },
        ],
        stack: ["JavaScript", "Leaflet.js", "Node.js", "Cloudflare", "SEO"],
        link: { href: "https://turkumove.fi", label: "turkumove.fi" },
      },
      {
        id: "jobs",
        kind: "Oma projekti",
        title: "Työmarkkinadatan putki",
        summary: "Kerää suomalaiset IT-alan työpaikkailmoitukset ja tekee niistä suodatetun viikkolistan.",
        points: [
          "Kerää ilmoitukset Duunitorista ja TE-palveluista Playwrightilla.",
          "Claude API muuttaa jokaisen ilmoituksen rakenteiseksi dataksi: osaamisvaatimukset, senioriteetti ja etätyömahdollisuus.",
          "Tallentaa ja deduplikoi DuckDB:hen, suodattaa sijainnin ja senioriteetin mukaan ja vie Excel-raportin Google Driveen.",
        ],
        stack: ["Python", "Playwright", "DuckDB", "Claude API", "Google Drive API"],
      },
      {
        id: "edu-ai",
        kind: "Prototyyppi · Startup-yhteistyö",
        title: "Tekoälyavusteisen oppimissovelluksen prototyyppi",
        summary: "MVP-demo varhaisen vaiheen startupille. Keskusteleva oppimisavustaja tekstillä ja puheella.",
        points: [
          "FastAPI-taustajärjestelmä Claude API:n päällä, puhe sisään ja ulos selaimessa.",
          "Järjestelmäkehote ja turvallisuussäännöt.",
          "Aiheseuranta, jossa malli merkitsee aiheen jokaiseen vastaukseen.",
        ],
        stack: ["Python", "FastAPI", "Claude API", "JavaScript", "Speech API"],
      },
    ],
    courseworkLabel: "Kurssityöt",
    coursework: [
      {
        id: "etl",
        kind: "Kurssityö",
        title: "Säädatan ETL-putki",
        summary: "Automatisoitu ETL Turun säädatalle OpenWeatherMap-rajapinnasta. Haku, puhdistus, muunnos ja lataus PostgreSQL:ään, ajastettu Airflow-DAGeilla ja ajettu Dockerissa.",
        points: [],
        stack: ["Python", "SQL", "PostgreSQL", "Apache Airflow", "Docker"],
      },
      {
        id: "ais",
        kind: "Kurssityö",
        title: "AIS-meriliikenteen seuranta ja reittiennuste",
        summary: "Kerää alusten AIS-signaaleja ja piirtää alukset suuntineen interaktiiviselle kartalle. Koneoppimismalli ennustaa reittejä aiemman liikkeen perusteella, ja FastAPI-kerros tarjoaa kerätyn datan.",
        points: [],
        stack: ["Python", "FastAPI", "Koneoppiminen", "Paikkatieto"],
      },
    ],
  },
  background: {
    label: "Tausta",
    title: "Peltisepästä dataan",
    story: [
      "Tein noin viisi vuotta töitä rakennuspeltiseppänä. Vuonna 2022 vaihdoin alaa, hakeuduin Turun ammattikorkeakouluun ja valmistuin joulukuussa 2025.",
      "Tutkinnon ohessa kävin lisäkursseja muissa korkeakouluissa kiinnostuksesta, esimerkiksi Azure Fundamentalsin ja PowerShellin Metropoliassa.",
      "Nyt haen ensimmäistä vakituista roolia data engineeringin tai tekoälyn parissa.",
    ],
    timeline: [
      {
        period: "2022 – 2025",
        role: "Tradenomi (AMK), tietojenkäsittely · Data Engineering & AI",
        org: "Turun ammattikorkeakoulu",
        detail: "Painotettu keskiarvo 4,3 / 5. Arvosana 5 / 5 opintojaksoista Data Engineering, Cloud Services ja Software Development Operations.",
      },
      {
        period: "2025",
        role: "Opinnäytetyö: Tekoäly avustajana käyttäjäkokemuksen arvioinnissa",
        org: "LLM-mallien ja ihmistestaajien vertailu",
        detail: "Kielimallit löysivät 75 % samoista käytettävyysongelmista kuin ihmistestaajat. Vertailu Jaccard-samankaltaisuudella ja Cohenin kappalla. Arvosana 4 / 5.",
        link: { href: THESIS_URL, label: "Lue Theseuksessa" },
      },
      {
        period: "05 – 08 / 2024",
        role: "Web-suunnittelu ja -kehitys, harjoittelu",
        org: "theFIRMA, Turku",
        detail: "Figma-mockupit ulkoiselle asiakkaalle, frontend- ja backend-kehitystä sisäisissä projekteissa, WordPress-toteutus Kansalaisen IT-tuki -palveluun.",
      },
      {
        period: "2014 – 2020",
        role: "Rakennuspeltiseppä",
        org: "Turun seutu",
        detail: "Reunalistoituksia ja kattoasennuksia. Asepalvelus 2015–2016 välissä. Lopetin alalla vuoden 2020 alussa.",
      },
    ],
  },
  skills: {
    label: "Osaaminen",
    title: "Työkalut",
    groups: [
      { label: "Ohjelmointikielet", items: ["Python", "SQL", "JavaScript / TypeScript", "Java"] },
      { label: "Data-alustat", items: ["Databricks", "Delta Lake", "Spark SQL", "PostgreSQL", "DuckDB", "MySQL", "MongoDB"] },
      { label: "Putket ja työkalut", items: ["Apache Airflow", "Docker", "Git", "GitHub Actions", "Playwright", "REST APIs", "FastAPI"] },
      { label: "Tekoäly ja analyysi", items: ["Claude API", "Gemini API", "LLM-arviointi", "Pandas / NumPy", "scikit-learn", "TensorFlow / Keras"] },
    ],
    extra: [
      { label: "Pilvi", items: ["Azure", "AWS", "Cloudflare"] },
      { label: "Syväoppimisen kurssityöt", items: ["CNN:t ja EfficientNetin hienosäätö", "YOLOv3 / v8 -objektintunnistus", "LSTM- ja Seq2Seq-mallit"] },
      { label: "Kielitaito", items: ["Suomi, äidinkieli", "Englanti, B2"] },
    ],
  },
  contact: {
    label: "Yhteystiedot",
    title: "Avoin työtarjouksille",
    text: "Haen junior-roolia data engineeringin tai tekoälyn parissa, Turusta tai etänä. Sähköposti tavoittaa minut nopeimmin.",
    statusLabel: "Tilanne nyt",
    status: "Vapaa",
    statusDetail: ["Data engineering- ja AI-roolit", "Turku · Etätyö", "Voin aloittaa heti"],
    newTab: "(avautuu uuteen välilehteen)",
  },
  footer: { left: "Mikko Valtanen · 2026", right: "Turku" },
};

export const translations: Record<Lang, Content> = { en, fi };
