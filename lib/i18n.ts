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
    lede: "I build data pipelines end to end, from raw API data to tables that answer a real business question. Python, SQL, Databricks and Airflow.",
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
    title: "Selected work",
    intro: "Personal projects first, coursework at the end.",
    featured: {
      id: "infra",
      kind: "Personal project",
      status: "In progress",
      title: "Tender intelligence for infrastructure contractors",
      summary:
        "A bid team keeps asking three things: which open tenders are worth the effort, who are we up against, and where is competition thin. This pipeline answers them from public EU procurement data and the Finnish company register.",
      points: [
        "ELT pipeline on Databricks following the medallion architecture. Raw data lands unchanged in Bronze, Silver cleans and conforms it, Gold holds business-ready SQL tables.",
        "Companies are resolved by business ID through the PRH register, not by matching names. Data quality issues found on the way are handled in code and documented.",
        "An LLM extracts what exists only in free text, such as location and contract period. Its output is scored against structured fields that are withheld from the prompt.",
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
      out: "Go/no-go per open tender",
    },
    items: [
      {
        id: "turkumove",
        kind: "Personal project · Live",
        title: "TurkuMove",
        summary: "An interactive map of sports and exercise venues in Turku with real users. I built it alone and still run and maintain it.",
        points: [
          "Venue data kept as JSON with a geocoding step. A Node.js script generates static Finnish and English pages for every sport and venue, plus the sitemap.",
          "Filter by sport, search by name, opening hours, contact details and directions.",
          "Admin panel that updates featured listings through the GitHub API.",
        ],
        facts: [
          { value: "262", label: "venues" },
          { value: "27", label: "sport categories" },
          { value: "685", label: "visitors / week" },
        ],
        stack: ["JavaScript", "Leaflet.js", "Node.js", "Cloudflare", "SEO"],
        link: { href: "https://turkumove.fi", label: "turkumove.fi" },
      },
      {
        id: "jobs",
        kind: "Personal project",
        title: "Job market intelligence pipeline",
        summary: "Collects Finnish IT job listings and turns them into a filtered weekly shortlist, so nobody has to browse job boards by hand.",
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
        summary: "An MVP demo I built for an early-stage startup: a conversational learning assistant that works with both text and voice.",
        points: [
          "FastAPI backend on the Claude API, with speech input and output in the browser.",
          "System prompt with guardrails for safe, age-appropriate conversation.",
          "Lightweight topic tracking that the model tags on every reply.",
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
    title: "A career built twice",
    story: [
      "I worked as a construction sheet metal worker for about five years. Precise, physical work where a mistake costs time and material. In 2022 I changed careers on purpose, enrolled at Turku University of Applied Sciences and graduated in December 2025.",
      "Alongside the degree I took extra courses from other universities because the subjects interested me, such as Azure Fundamentals and PowerShell at Metropolia. I work well on my own, and when I'm stuck I say so and ask instead of losing a day.",
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
    title: "Toolkit",
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
    title: "Let's talk",
    text: "I'm looking for a junior role in data engineering or AI, in Turku or remote. Email is the fastest way to reach me.",
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
    lede: "Rakennan dataputkia alusta loppuun, rajapinnan raakadatasta tauluihin, jotka vastaavat oikeaan liiketoiminnan kysymykseen. Python, SQL, Databricks ja Airflow.",
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
    title: "Valittuja töitä",
    intro: "Omat projektit ensin, kurssityöt lopussa.",
    featured: {
      id: "infra",
      kind: "Oma projekti",
      status: "Työn alla",
      title: "Tarjouskilpailuanalytiikka infraurakoitsijoille",
      summary:
        "Tarjoustiimi kysyy jatkuvasti kolmea asiaa: mitkä avoimet kilpailut kannattaa tehdä, keitä vastaan kilpaillaan ja missä kilpailu on vähäistä. Tämä putki vastaa niihin EU:n julkisten hankintojen datasta ja PRH:n yritysrekisteristä.",
      points: [
        "ELT-putki Databricksissa medallion-arkkitehtuurilla. Raakadata tallennetaan muuttamattomana Bronzeen, Silver puhdistaa ja yhtenäistää sen, Goldissa on liiketoimintavalmiit SQL-taulut.",
        "Yritykset tunnistetaan Y-tunnuksella PRH:n rekisterin kautta, ei nimiä vertaamalla. Matkan varrella löytyneet datan laatuongelmat on käsitelty koodissa ja dokumentoitu.",
        "Kielimalli poimii tiedot, jotka löytyvät vain vapaasta tekstistä, kuten sijainnin ja sopimuskauden. Tulokset arvioidaan rakenteisia kenttiä vasten, joita mallille ei näytetä.",
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
      out: "Go/no-go jokaiselle avoimelle kilpailulle",
    },
    items: [
      {
        id: "turkumove",
        kind: "Oma projekti · Julkaistu",
        title: "TurkuMove",
        summary: "Interaktiivinen kartta Turun liikuntapaikoista, oikeilla käyttäjillä. Rakensin sen yksin ja ylläpidän sitä edelleen.",
        points: [
          "Paikkadata JSON-muodossa geokoodausvaiheen kanssa. Node.js-skripti generoi staattiset suomen- ja englanninkieliset sivut jokaiselle lajille ja paikalle sekä sivukartan.",
          "Suodatus lajin mukaan, haku nimellä, aukioloajat, yhteystiedot ja reittiohjeet.",
          "Hallintapaneeli, joka päivittää nostetut paikat GitHub API:n kautta.",
        ],
        facts: [
          { value: "262", label: "paikkaa" },
          { value: "27", label: "lajia" },
          { value: "685", label: "kävijää / vko" },
        ],
        stack: ["JavaScript", "Leaflet.js", "Node.js", "Cloudflare", "SEO"],
        link: { href: "https://turkumove.fi", label: "turkumove.fi" },
      },
      {
        id: "jobs",
        kind: "Oma projekti",
        title: "Työmarkkinadatan putki",
        summary: "Kerää suomalaiset IT-alan työpaikkailmoitukset ja tekee niistä suodatetun viikkolistan, jottei työpaikkasivustoja tarvitse selata käsin.",
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
        summary: "MVP-demo, jonka rakensin varhaisen vaiheen startupille: keskusteleva oppimisavustaja, joka toimii tekstillä ja puheella.",
        points: [
          "FastAPI-taustajärjestelmä Claude API:n päällä, puhe sisään ja ulos selaimessa.",
          "Järjestelmäkehote, jonka rajaukset pitävät keskustelun turvallisena ja ikätasolle sopivana.",
          "Kevyt aiheseuranta, jossa malli merkitsee aiheen jokaiseen vastaukseen.",
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
    title: "Kahdesti rakennettu ura",
    story: [
      "Tein noin viisi vuotta töitä rakennuspeltiseppänä. Tarkkaa, fyysistä työtä, jossa virhe maksaa aikaa ja materiaalia. Vuonna 2022 vaihdoin alaa tietoisesti, hakeuduin Turun ammattikorkeakouluun ja valmistuin joulukuussa 2025.",
      "Tutkinnon ohessa suoritin lisäkursseja muista korkeakouluista, koska aiheet kiinnostivat, esimerkiksi Azure Fundamentals ja PowerShell Metropoliassa. Työskentelen hyvin itsenäisesti, ja kun jumitun, sanon sen ja kysyn sen sijaan että hukkaisin päivän.",
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
    title: "Jutellaan",
    text: "Haen junior-roolia data engineeringin tai tekoälyn parissa, Turusta tai etänä. Sähköpostilla tavoitat nopeimmin.",
    statusLabel: "Tilanne nyt",
    status: "Vapaa",
    statusDetail: ["Data engineering- ja AI-roolit", "Turku · Etätyö", "Voin aloittaa heti"],
    newTab: "(avautuu uuteen välilehteen)",
  },
  footer: { left: "Mikko Valtanen · 2026", right: "Turku" },
};

export const translations: Record<Lang, Content> = { en, fi };
