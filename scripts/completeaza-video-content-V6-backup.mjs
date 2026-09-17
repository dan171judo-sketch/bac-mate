import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import crypto from "node:crypto";
import { spawnSync } from "node:child_process";

/* =========================================================
   BAC MATE
   GENERATOR CONȚINUT VIDEO V6 — GROUNDED + AUTO DURATĂ

   PRINCIPIU:
   Conținutul lecției din platformă = sursa de adevăr.
   AI-ul NU decide materia.
   AI-ul transformă materia existentă într-un video clar.

   V6:
   - păstrează sistemul grounded din V5;
   - urmărește durata reală a narațiunii;
   - dacă scenariul este prea scurt, îl extinde automat;
   - dacă scenariul este prea lung, îl scurtează automat;
   - ajustarea folosește NUMAI sursa lecției;
   - nu regenerăm inutil un video deja corect;
   - publicarea automată rămâne blocată.

   FLUX:

   lecție platformă
        ↓
   sursă curățată + hash
        ↓
   generare mini-video
        ↓
   verificare structură
        ↓
   verificare număr cuvinte
        ↓
   prea scurt / prea lung?
        ↓ DA
   ajustare automată V6
        ↓
   renumărare
        ↓
   validare
        ↓
   verificator matematic
        ↓
   salvare
   ========================================================= */

const ROOT = process.cwd();

const CONTINUT_DIR = path.join(
  ROOT,
  "data",
  "continut-video"
);

const MANIFEST_PATH = path.join(
  CONTINUT_DIR,
  "manifest.json"
);

const RAPORT_GENERARE_PATH = path.join(
  CONTINUT_DIR,
  "raport-generare-ai.json"
);

const RAPORT_VERIFICARE_PATH = path.join(
  CONTINUT_DIR,
  "raport-verificare-lectii.json"
);

const VERIFICATOR_PATH = path.join(
  ROOT,
  "scripts",
  "verifica-lectii-generate.mjs"
);

const ENV_PATH = path.join(
  ROOT,
  ".env.local"
);

/* =========================================================
   CONFIG
   ========================================================= */

let OLLAMA_URL =
  "http://127.0.0.1:11434";

let MODEL_GENERARE =
  "qwen3:8b";

const VERSIUNE_GENERATOR =
  "bac-mate-video-grounded-v6";

const MAX_INCERCARI_VIDEO = 3;

const MAX_CICLURI_CORECTARE = 3;

const MAX_AJUSTARI_DURATA = 3;

/*
   Ritmul vocii noastre este aproximativ 115–130 cuvinte/minut.

   Nu cerem exact 4:00 sau 5:00 deoarece TTS-ul poate varia.

   VIDEO 1:
   țintă ~500 cuvinte
   acceptăm 440–570

   VIDEO 2–4:
   țintă ~620 cuvinte
   acceptăm 550–700
*/

const CONFIG_VIDEO = [
  {
    numar: 1,
    rol: "intuitie-si-concept",
    durata: 4,
    cuvinteMin: 440,
    cuvinteTinta: 500,
    cuvinteMax: 570,
    scop:
      "Elevul trebuie să înțeleagă intuitiv conceptul principal, pornind de la zero, folosind exclusiv informațiile din lecția platformei.",
  },
  {
    numar: 2,
    rol: "reguli-si-metoda",
    durata: 5,
    cuvinteMin: 550,
    cuvinteTinta: 620,
    cuvinteMax: 700,
    scop:
      "Elevul trebuie să înțeleagă regulile, proprietățile și metoda de rezolvare care există în lecția platformei.",
  },
  {
    numar: 3,
    rol: "exemplu-rezolvat",
    durata: 5,
    cuvinteMin: 550,
    cuvinteTinta: 620,
    cuvinteMax: 700,
    scop:
      "Elevul trebuie să urmărească un exemplu relevant rezolvat clar, pas cu pas, derivat exclusiv din conținutul lecției.",
  },
  {
    numar: 4,
    rol: "bac-si-greseli",
    durata: 5,
    cuvinteMin: 550,
    cuvinteTinta: 620,
    cuvinteMax: 700,
    scop:
      "Elevul trebuie să vadă aplicarea pentru Bac, greșelile frecvente și verificarea finală pe baza conținutului real al lecției.",
  },
];

/* =========================================================
   .ENV.LOCAL
   ========================================================= */

function incarcaEnvLocal() {
  if (!fs.existsSync(ENV_PATH)) {
    return;
  }

  const continut =
    fs.readFileSync(
      ENV_PATH,
      "utf8"
    );

  for (const linieBruta of continut.split(/\r?\n/)) {
    const linie =
      linieBruta.trim();

    if (
      !linie ||
      linie.startsWith("#")
    ) {
      continue;
    }

    const pozitieEgal =
      linie.indexOf("=");

    if (pozitieEgal === -1) {
      continue;
    }

    const cheie =
      linie
        .slice(0, pozitieEgal)
        .trim();

    let valoare =
      linie
        .slice(pozitieEgal + 1)
        .trim();

    if (
      (
        valoare.startsWith('"') &&
        valoare.endsWith('"')
      ) ||
      (
        valoare.startsWith("'") &&
        valoare.endsWith("'")
      )
    ) {
      valoare =
        valoare.slice(1, -1);
    }

    process.env[cheie] =
      valoare;
  }
}

incarcaEnvLocal();

OLLAMA_URL =
  process.env.OLLAMA_URL ||
  "http://127.0.0.1:11434";

MODEL_GENERARE =
  process.env.BAC_MATE_MODEL_GENERARE ||
  process.env.BAC_MATE_OLLAMA_MODEL ||
  "qwen3:8b";

/* =========================================================
   ARGUMENTE
   ========================================================= */

function citesteArgumente() {
  const args =
    process.argv.slice(2);

  let toate = false;
  let modul = null;
  let limita = null;
  let id = null;
  let regenereaza = false;

  for (const arg of args) {
    if (arg === "--all") {
      toate = true;
    }

    if (
      arg === "--regenereaza" ||
      arg === "--force"
    ) {
      regenereaza = true;
    }

    if (arg.startsWith("--modul=")) {
      const valoare =
        Number(
          arg.slice("--modul=".length)
        );

      if (
        Number.isInteger(valoare) &&
        valoare > 0
      ) {
        modul = valoare;
      }
    }

    if (arg.startsWith("--limit=")) {
      const valoare =
        Number(
          arg.slice("--limit=".length)
        );

      if (
        Number.isInteger(valoare) &&
        valoare > 0
      ) {
        limita = valoare;
      }
    }

    if (arg.startsWith("--id=")) {
      const valoare =
        arg
          .slice("--id=".length)
          .trim();

      if (valoare) {
        id = valoare;
      }
    }
  }

  return {
    toate,
    modul,
    limita,
    id,
    regenereaza,
  };
}

/* =========================================================
   UTILITARE
   ========================================================= */

function citesteJson(cale) {
  return JSON.parse(
    fs.readFileSync(
      cale,
      "utf8"
    )
  );
}

function scrieJson(
  cale,
  continut
) {
  fs.writeFileSync(
    cale,
    JSON.stringify(
      continut,
      null,
      2
    ) + "\n",
    "utf8"
  );
}

function pauza(ms) {
  return new Promise(
    (resolve) =>
      setTimeout(resolve, ms)
  );
}

function numaraCuvinte(text) {
  if (
    typeof text !== "string" ||
    !text.trim()
  ) {
    return 0;
  }

  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .length;
}

function textScenariu(video) {
  if (
    !video ||
    !Array.isArray(video.scenariu)
  ) {
    return "";
  }

  return video.scenariu
    .filter(
      (linie) =>
        typeof linie === "string"
    )
    .join(" ")
    .trim();
}

function calculeazaDurataEstimata(
  numarCuvinte,
  ritm = 122
) {
  if (
    !Number.isFinite(numarCuvinte) ||
    numarCuvinte <= 0
  ) {
    return 0;
  }

  return numarCuvinte / ritm;
}

function hashText(text) {
  return crypto
    .createHash("sha256")
    .update(text, "utf8")
    .digest("hex");
}

/* =========================================================
   SURSA LECȚIEI

   Eliminăm numai conținutul generat anterior.

   Materia existentă în platformă rămâne sursa de adevăr.
   ========================================================= */

function construiesteSursaLectie(lectie) {
  const copie =
    JSON.parse(
      JSON.stringify(lectie)
    );

  delete copie.videoLectii;
  delete copie.generareAI;
  delete copie.controlCalitate;
  delete copie.status;

  delete copie.metadataGenerare;
  delete copie.raport;
  delete copie.publicare;

  return copie;
}

function serializareSursaLectie(
  lectie
) {
  return JSON.stringify(
    construiesteSursaLectie(lectie),
    null,
    2
  );
}

function calculeazaHashSursa(
  lectie
) {
  return hashText(
    serializareSursaLectie(
      lectie
    )
  );
}

/* =========================================================
   EXTRAGERE JSON
   ========================================================= */

function extrageJson(text) {
  if (
    !text ||
    typeof text !== "string"
  ) {
    throw new Error(
      "Ollama nu a returnat text."
    );
  }

  let curatat =
    text.trim();

  curatat =
    curatat
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

  try {
    return JSON.parse(curatat);
  } catch {
    const inceput =
      curatat.indexOf("{");

    const sfarsit =
      curatat.lastIndexOf("}");

    if (
      inceput !== -1 &&
      sfarsit !== -1 &&
      sfarsit > inceput
    ) {
      try {
        return JSON.parse(
          curatat.slice(
            inceput,
            sfarsit + 1
          )
        );
      } catch {
        // continuăm
      }
    }

    throw new Error(
      "Răspunsul Ollama nu conține JSON valid."
    );
  }
}

/* =========================================================
   VIDEO EXISTENT
   ========================================================= */

function videoAreDurataCorecta(
  video,
  config
) {
  const cuvinte =
    numaraCuvinte(
      textScenariu(video)
    );

  return (
    cuvinte >= config.cuvinteMin &&
    cuvinte <= config.cuvinteMax
  );
}

function videoEsteDinGeneratorulCurent(
  video
) {
  return (
    video?.metadata?.generatorVersion ===
    VERSIUNE_GENERATOR
  );
}

function videoAreSursaCurenta(
  video,
  hashSursa
) {
  return (
    typeof video?.metadata?.sourceHash === "string" &&
    video.metadata.sourceHash === hashSursa
  );
}

function videoEsteActual(
  video,
  config,
  hashSursa
) {
  if (!video) {
    return false;
  }

  if (
    !Array.isArray(video.scenariu) ||
    video.scenariu.length < 6
  ) {
    return false;
  }

  if (
    !videoAreDurataCorecta(
      video,
      config
    )
  ) {
    return false;
  }

  if (
    !videoEsteDinGeneratorulCurent(
      video
    )
  ) {
    return false;
  }

  if (
    !videoAreSursaCurenta(
      video,
      hashSursa
    )
  ) {
    return false;
  }

  return true;
}

function areContinutGenerat(
  lectie
) {
  if (
    !lectie ||
    !Array.isArray(lectie.videoLectii) ||
    lectie.videoLectii.length !== 4
  ) {
    return false;
  }

  return lectie.videoLectii.every(
    (video) =>
      video &&
      Array.isArray(video.scenariu) &&
      video.scenariu.length > 0
  );
}

function toateVideoActuale(
  lectie
) {
  if (
    !lectie ||
    !Array.isArray(lectie.videoLectii) ||
    lectie.videoLectii.length !== 4
  ) {
    return false;
  }

  const hashSursa =
    calculeazaHashSursa(
      lectie
    );

  return CONFIG_VIDEO.every(
    (config) =>
      videoEsteActual(
        lectie.videoLectii[
          config.numar - 1
        ],
        config,
        hashSursa
      )
  );
}

/* =========================================================
   HTTP OLLAMA
   ========================================================= */

function parseazaOllamaUrl() {
  const url =
    new URL(OLLAMA_URL);

  return {
    hostname: url.hostname,
    port:
      Number(
        url.port || 11434
      ),
  };
}

function cerereOllama({
  pathApi,
  method = "GET",
  body = null,
  timeoutMs = 20000,
}) {
  return new Promise(
    (resolve, reject) => {
      const {
        hostname,
        port,
      } =
        parseazaOllamaUrl();

      const payload =
        body === null
          ? null
          : JSON.stringify(body);

      const headers = {
        Accept:
          "application/json",
      };

      if (payload !== null) {
        headers["Content-Type"] =
          "application/json";

        headers["Content-Length"] =
          Buffer.byteLength(payload);
      }

      const request =
        http.request(
          {
            hostname,
            port,
            path: pathApi,
            method,
            headers,
          },
          (response) => {
            let continut = "";

            response.setEncoding(
              "utf8"
            );

            response.on(
              "data",
              (chunk) => {
                continut += chunk;
              }
            );

            response.on(
              "end",
              () => {
                const status =
                  response.statusCode || 0;

                if (
                  status < 200 ||
                  status >= 300
                ) {
                  reject(
                    new Error(
                      `Ollama HTTP ${status}: ${continut}`
                    )
                  );

                  return;
                }

                try {
                  resolve(
                    continut.trim()
                      ? JSON.parse(continut)
                      : null
                  );
                } catch {
                  reject(
                    new Error(
                      "Ollama a returnat JSON HTTP invalid."
                    )
                  );
                }
              }
            );
          }
        );

      request.on(
        "error",
        (error) => {
          reject(
            new Error(
              `Conexiune Ollama eșuată: ${error.message}`
            )
          );
        }
      );

      request.setTimeout(
        timeoutMs,
        () => {
          request.destroy(
            new Error(
              "Ollama a depășit timpul maxim de răspuns."
            )
          );
        }
      );

      if (payload !== null) {
        request.write(payload);
      }

      request.end();
    }
  );
}

/* =========================================================
   VERIFICARE OLLAMA
   ========================================================= */

async function verificaOllama() {
  const data =
    await cerereOllama({
      pathApi:
        "/api/tags",
      timeoutMs:
        15000,
    });

  const modele =
    Array.isArray(data?.models)
      ? data.models
      : [];

  const exista =
    modele.some(
      (model) => {
        const nume =
          model.name ||
          model.model ||
          "";

        return (
          nume === MODEL_GENERARE ||
          nume.startsWith(
            `${MODEL_GENERARE}:`
          )
        );
      }
    );

  if (!exista) {
    throw new Error(
      `Modelul ${MODEL_GENERARE} nu este instalat în Ollama.`
    );
  }
}

/* =========================================================
   PROMPT PRINCIPAL V6
   ========================================================= */

function construiestePromptVideo(
  lectie,
  config,
  problemeAnterioare = []
) {
  const sursa =
    serializareSursaLectie(
      lectie
    );

  const feedback =
    problemeAnterioare.length > 0
      ? `
VARIANTA ANTERIOARĂ A FOST RESPINSĂ.

PROBLEME DE CORECTAT:

${problemeAnterioare
  .map(
    (problema, index) =>
      `${index + 1}. ${
        problema?.mesaj ||
        problema?.eroare ||
        problema?.problema ||
        JSON.stringify(problema)
      }`
  )
  .join("\n")}

Corectează strict problemele de mai sus.
`
      : "";

  return `
Ești profesor de matematică pentru Bacalaureatul din România,
profil M_mate-info.

Lucrezi pentru platforma educațională BAC MATE.

SARCINĂ:
Transformă conținutul EXISTENT al lecției într-un singur mini-video educațional.

REGULA PRINCIPALĂ:
SURSA DE MAI JOS ESTE SINGURA SURSĂ DE ADEVĂR.

Nu adăuga noțiuni, formule, proprietăți, teoreme, exemple,
condiții sau rezultate care nu pot fi susținute de sursa lecției.

Dacă sursa nu oferă suficientă informație pentru o afirmație,
NU inventa informația.

============================================================
LECȚIE
============================================================

Modul: ${lectie.modul}
Număr lecție: ${lectie.numarLectie}
Titlu: ${lectie.titlu}

============================================================
MINI-VIDEO
============================================================

Număr: ${config.numar}
Rol: ${config.rol}
Durată țintă: aproximativ ${config.durata} minute
Număr minim de cuvinte în scenariu: ${config.cuvinteMin}
Țintă recomandată: aproximativ ${config.cuvinteTinta}
Număr maxim de cuvinte: ${config.cuvinteMax}

Scop:
${config.scop}

============================================================
SURSA LECȚIEI DIN PLATFORMA BAC MATE
============================================================

${sursa}

============================================================
SFÂRȘIT SURSA LECȚIEI
============================================================

${feedback}

REGULI OBLIGATORII:

1. Scrie exclusiv în limba română.
2. Vorbește ca un profesor calm și clar.
3. Scenariul este narațiunea efectivă pentru voce.
4. Scenariul trebuie să aibă între ${config.cuvinteMin} și ${config.cuvinteMax} cuvinte.
5. Țintește aproximativ ${config.cuvinteTinta} cuvinte.
6. Nu umple durata prin repetiții inutile.
7. Fiecare segment trebuie să aducă valoare educațională.
8. Folosește numai informațiile susținute de sursa lecției.
9. Nu schimba metoda din platformă.
10. Păstrează notația matematică exactă.
11. Recalculează orice calcul.
12. Răspunsul exemplului trebuie să coincidă cu rezolvarea.
13. Quizul trebuie să fie coerent cu explicația.
14. Nu inventa teoreme.
15. Nu inventa formule.
16. Nu inventa proprietăți.
17. Nu inventa surse.
18. Nu declara un exercițiu oficial Bac dacă sursa nu spune asta.
19. Poți spune "de tip Bac" numai dacă este justificat.
20. Nu folosi Markdown.
21. Nu folosi blocuri de cod.
22. Returnează exclusiv JSON valid.
23. Nu scrie nimic înainte de JSON.
24. Nu scrie nimic după JSON.
25. Folosește diacritice românești.
26. Evită frazele exagerat de lungi.
27. Construiește explicația progresiv.
28. Nu presupune informații care nu apar în sursă.
29. Verifică semnele, fracțiile și parantezele.
30. Nu sacrifica exactitatea matematică pentru atingerea duratei.

CERINȚE PENTRU ROL:

Video 1:
- pornește intuitiv;
- explică ideea centrală;
- explică simbolurile;
- construiește baza necesară elevului.

Video 2:
- explică regulile;
- prezintă metoda ordonat;
- spune când se aplică;
- arată atenționările importante.

Video 3:
- construiește exemplul pas cu pas;
- explică motivul fiecărui pas;
- nu sări etape;
- verifică rezultatul.

Video 4:
- explică aplicarea pentru Bac dacă sursa permite;
- prezintă greșelile frecvente;
- verifică elevul;
- încheie cu ideile esențiale.

Returnează EXACT structura:

{
  "numar": ${config.numar},
  "rol": "${config.rol}",
  "titlu": "Titlu scurt și clar",
  "scenariu": [
    "Segment narativ 1",
    "Segment narativ 2",
    "Segment narativ 3",
    "Segment narativ 4",
    "Segment narativ 5",
    "Segment narativ 6"
  ],
  "cadre": [
    {
      "numar": 1,
      "vizual": "Ce vede elevul",
      "naratiune": "Ce explică profesorul"
    },
    {
      "numar": 2,
      "vizual": "Ce vede elevul",
      "naratiune": "Ce explică profesorul"
    },
    {
      "numar": 3,
      "vizual": "Ce vede elevul",
      "naratiune": "Ce explică profesorul"
    },
    {
      "numar": 4,
      "vizual": "Ce vede elevul",
      "naratiune": "Ce explică profesorul"
    }
  ],
  "ideiDeRetinut": [
    "Ideea 1",
    "Ideea 2"
  ],
  "formule": [],
  "exemplu": {
    "titlu": "Titlul exemplului",
    "enunt": "Enunț complet",
    "rezolvare": [
      "Pasul 1",
      "Pasul 2"
    ],
    "raspuns": "Răspuns final"
  },
  "verificareRapida": {
    "intrebare": "Întrebarea",
    "variante": [
      "A) ...",
      "B) ...",
      "C) ..."
    ],
    "raspunsCorect": 0,
    "explicatie": "Explicația corectă"
  }
}

CERINȚE FINALE:

- minimum 6 segmente în scenariu;
- între ${config.cuvinteMin} și ${config.cuvinteMax} cuvinte;
- minimum 4 cadre;
- minimum 2 idei de reținut;
- minimum 2 pași la exemplu;
- exact 3 variante la quiz;
- raspunsCorect = 0, 1 sau 2;
- toate calculele trebuie verificate.

Returnează acum EXCLUSIV JSON.
`.trim();
}

/* =========================================================
   GENERARE VIDEO
   ========================================================= */

async function genereazaVideo(
  lectie,
  config,
  probleme = []
) {
  const prompt =
    construiestePromptVideo(
      lectie,
      config,
      probleme
    );

  const rezultat =
    await cerereOllama({
      pathApi:
        "/api/generate",

      method:
        "POST",

      timeoutMs:
        30 * 60 * 1000,

      body: {
        model:
          MODEL_GENERARE,

        prompt,

        stream:
          false,

        format:
          "json",

        keep_alive:
          "30m",

        options: {
          temperature:
            0.05,

          top_p:
            0.85,

          num_ctx:
  8192,

num_predict:
  1800,
        },
      },
    });

  if (
    !rezultat ||
    typeof rezultat.response !== "string"
  ) {
    throw new Error(
      "Ollama nu a returnat câmpul response."
    );
  }

  return extrageJson(
    rezultat.response
  );
}

/* =========================================================
   V6 — AJUSTARE AUTOMATĂ A DURATEI

   Asta rezolvă problema:
   281 cuvinte → regenerare → iar prea scurt.

   Acum nu aruncăm pur și simplu rezultatul.
   Cerem AI-ului să EXTINDĂ sau să SCURTEZE
   scenariul existent folosind aceeași sursă.
   ========================================================= */

function construiestePromptAjustareDurata(
  lectie,
  video,
  config,
  tipAjustare
) {
  const sursa =
    serializareSursaLectie(
      lectie
    );

  const cuvinteActuale =
    numaraCuvinte(
      textScenariu(video)
    );

  const actiune =
    tipAjustare === "extinde"
      ? `
EXTINDE scenariul.

Scenariul actual are ${cuvinteActuale} cuvinte și este prea scurt.

Trebuie să ajungă aproximativ la ${config.cuvinteTinta} cuvinte.

Adaugă explicații pedagogice utile:
- clarifică ideile deja prezente;
- explică mai bine pașii;
- explică sensul notațiilor;
- dezvoltă exemplul numai dacă sursa permite;
- explică greșelile relevante numai dacă sursa le susține.

NU repeta aceleași propoziții doar pentru a crește numărul de cuvinte.
`
      : `
SCURTEAZĂ scenariul.

Scenariul actual are ${cuvinteActuale} cuvinte și este prea lung.

Trebuie să ajungă aproximativ la ${config.cuvinteTinta} cuvinte.

Elimină:
- repetițiile;
- formulările redundante;
- explicațiile care spun aceeași idee de mai multe ori.

NU elimina:
- formule importante;
- condiții;
- pași matematici;
- explicațiile necesare;
- rezultatul exemplului.
`;

  return `
Ești editorul pedagogic al platformei BAC MATE.

Ai primit un mini-video deja generat.

Sarcina ta este EXCLUSIV să îi corectezi lungimea.

${actiune}

REGULA ABSOLUTĂ:

Nu ai voie să introduci materie nouă.

Poți utiliza EXCLUSIV informațiile din sursa lecției de mai jos.

============================================================
SURSA LECȚIEI
============================================================

${sursa}

============================================================
VIDEO ACTUAL
============================================================

${JSON.stringify(
  video,
  null,
  2
)}

============================================================
CERINȚĂ
============================================================

Video: ${config.numar}
Rol: ${config.rol}
Durată țintă: ${config.durata} minute.

Interval obligatoriu:
minimum ${config.cuvinteMin} cuvinte
țintă ${config.cuvinteTinta} cuvinte
maximum ${config.cuvinteMax} cuvinte.

Păstrează:
- numărul video;
- rolul;
- exemplul corect;
- quizul corect;
- formulele;
- ideile importante;
- sensul matematic.

Poți modifica:
- scenariu;
- cadre;
- formulările explicative.

Scenariul final trebuie să aibă minimum 6 segmente.

Cadrele trebuie să aibă minimum 4 elemente și să urmărească scenariul.

Returnează EXCLUSIV JSON valid cu aceeași structură a video-ului.

Nu folosi Markdown.
Nu scrie nimic înainte sau după JSON.
`.trim();
}

async function ajusteazaDurataVideo(
  lectie,
  videoInitial,
  config
) {
  let video =
    videoInitial;

  for (
    let ajustare = 1;
    ajustare <= MAX_AJUSTARI_DURATA;
    ajustare++
  ) {
    const cuvinte =
      numaraCuvinte(
        textScenariu(video)
      );

    if (
      cuvinte >= config.cuvinteMin &&
      cuvinte <= config.cuvinteMax
    ) {
      console.log(
        `      ✅ Durată V6 corectă: ${cuvinte} cuvinte.`
      );

      return video;
    }

    const tipAjustare =
      cuvinte < config.cuvinteMin
        ? "extinde"
        : "scurteaza";

    console.log(
      `      🧭 Durată V6: ${cuvinte} cuvinte. Trebuie să ${tipAjustare} scenariul spre ~${config.cuvinteTinta}.`
    );

    console.log(
      `      🔧 Ajustare automată ${ajustare}/${MAX_AJUSTARI_DURATA}...`
    );

    const prompt =
      construiestePromptAjustareDurata(
        lectie,
        video,
        config,
        tipAjustare
      );

    const rezultat =
      await cerereOllama({
        pathApi:
          "/api/generate",

        method:
          "POST",

        timeoutMs:
          30 * 60 * 1000,

        body: {
          model:
            MODEL_GENERARE,

          prompt,

          stream:
            false,

          format:
            "json",

          keep_alive:
            "30m",

          options: {
            temperature:
              0.03,

            top_p:
              0.8,
num_ctx:
  8192,

num_predict:
  1800,
          },
        },
      });

    if (
      !rezultat ||
      typeof rezultat.response !== "string"
    ) {
      throw new Error(
        "Ollama nu a returnat răspuns la ajustarea duratei."
      );
    }

    video =
      extrageJson(
        rezultat.response
      );

    if (
      Number(video.numar) !== config.numar
    ) {
      throw new Error(
        `Ajustarea V6 a schimbat numărul Video ${config.numar}.`
      );
    }

    if (
      video.rol !== config.rol
    ) {
      throw new Error(
        `Ajustarea V6 a schimbat rolul Video ${config.numar}.`
      );
    }
  }

  const finalCuvinte =
    numaraCuvinte(
      textScenariu(video)
    );

  if (
    finalCuvinte < config.cuvinteMin ||
    finalCuvinte > config.cuvinteMax
  ) {
    throw new Error(
      `Video ${config.numar}: V6 nu a reușit să aducă scenariul în interval după ${MAX_AJUSTARI_DURATA} ajustări. Are ${finalCuvinte} cuvinte; interval ${config.cuvinteMin}-${config.cuvinteMax}.`
    );
  }

  return video;
}
/* =========================================================
   VALIDARE STRUCTURALĂ + DURATĂ
   ========================================================= */

function valideazaVideo(
  video,
  config
) {
  if (
    !video ||
    typeof video !== "object"
  ) {
    throw new Error(
      `Video ${config.numar}: răspuns invalid.`
    );
  }

  if (
    Number(video.numar) !==
    config.numar
  ) {
    throw new Error(
      `Video ${config.numar}: număr invalid.`
    );
  }

  if (
    video.rol !==
    config.rol
  ) {
    throw new Error(
      `Video ${config.numar}: rol invalid "${video.rol}".`
    );
  }

  if (
    typeof video.titlu !==
      "string" ||
    video.titlu.trim().length < 3
  ) {
    throw new Error(
      `Video ${config.numar}: titlu lipsă.`
    );
  }

  if (
    !Array.isArray(
      video.scenariu
    ) ||
    video.scenariu.length < 6
  ) {
    throw new Error(
      `Video ${config.numar}: scenariul trebuie să aibă minimum 6 segmente.`
    );
  }

  for (
    let i = 0;
    i < video.scenariu.length;
    i++
  ) {
    if (
      typeof video.scenariu[i] !==
        "string" ||
      video.scenariu[i]
        .trim()
        .length < 10
    ) {
      throw new Error(
        `Video ${config.numar}: segmentul ${i + 1} din scenariu este prea scurt sau invalid.`
      );
    }
  }

  const cuvinte =
    numaraCuvinte(
      textScenariu(video)
    );

  if (
    cuvinte <
    config.cuvinteMin
  ) {
    throw new Error(
      `Video ${config.numar}: scenariul este prea scurt. Are ${cuvinte} cuvinte, minimul este ${config.cuvinteMin}.`
    );
  }

  if (
    cuvinte >
    config.cuvinteMax
  ) {
    throw new Error(
      `Video ${config.numar}: scenariul este prea lung. Are ${cuvinte} cuvinte, maximul este ${config.cuvinteMax}.`
    );
  }

  if (
    !Array.isArray(
      video.cadre
    ) ||
    video.cadre.length < 4
  ) {
    throw new Error(
      `Video ${config.numar}: sunt necesare minimum 4 cadre.`
    );
  }

  for (
    let i = 0;
    i < video.cadre.length;
    i++
  ) {
    const cadru =
      video.cadre[i];

    if (
      !cadru ||
      typeof cadru.vizual !==
        "string" ||
      cadru.vizual
        .trim()
        .length < 3 ||
      typeof cadru.naratiune !==
        "string" ||
      cadru.naratiune
        .trim()
        .length < 3
    ) {
      throw new Error(
        `Video ${config.numar}: cadrul ${i + 1} este incomplet.`
      );
    }

    cadru.numar =
      i + 1;
  }

  if (
    !Array.isArray(
      video.ideiDeRetinut
    ) ||
    video.ideiDeRetinut.length < 2
  ) {
    throw new Error(
      `Video ${config.numar}: sunt necesare minimum 2 idei de reținut.`
    );
  }

  if (
    !Array.isArray(
      video.formule
    )
  ) {
    video.formule = [];
  }

  if (
    !video.exemplu ||
    typeof video.exemplu !==
      "object"
  ) {
    throw new Error(
      `Video ${config.numar}: exemplul lipsește.`
    );
  }

  if (
    typeof video.exemplu.titlu !==
      "string" ||
    typeof video.exemplu.enunt !==
      "string" ||
    !Array.isArray(
      video.exemplu.rezolvare
    ) ||
    video.exemplu.rezolvare.length < 2 ||
    typeof video.exemplu.raspuns !==
      "string"
  ) {
    throw new Error(
      `Video ${config.numar}: exemplul este incomplet.`
    );
  }

  const quiz =
    video.verificareRapida;

  if (
    !quiz ||
    typeof quiz !==
      "object" ||
    typeof quiz.intrebare !==
      "string" ||
    !Array.isArray(
      quiz.variante
    ) ||
    quiz.variante.length !== 3 ||
    !Number.isInteger(
      quiz.raspunsCorect
    ) ||
    quiz.raspunsCorect < 0 ||
    quiz.raspunsCorect > 2 ||
    typeof quiz.explicatie !==
      "string"
  ) {
    throw new Error(
      `Video ${config.numar}: verificarea rapidă este invalidă.`
    );
  }

  video.metrici = {
    cuvinteScenariu:
      cuvinte,

    durataEstimataMinute:
      Number(
        calculeazaDurataEstimata(
          cuvinte
        ).toFixed(2)
      ),

    durataTintaMinute:
      config.durata,

    cuvinteMin:
      config.cuvinteMin,

    cuvinteTinta:
      config.cuvinteTinta,

    cuvinteMax:
      config.cuvinteMax,

    verificatDurataV6:
      true,
  };

  return video;
}

/* =========================================================
   INTRODUCERE VIDEO ÎN LECȚIE
   ========================================================= */

function introduceVideoInLectie(
  lectie,
  videoGenerat,
  config,
  hashSursa
) {
  if (
    !Array.isArray(
      lectie.videoLectii
    ) ||
    lectie.videoLectii.length !== 4
  ) {
    throw new Error(
      "Fișierul lecției nu conține structura celor 4 video."
    );
  }

  const index =
    config.numar - 1;

  const existent =
    lectie.videoLectii[index];

  lectie.videoLectii[index] = {
    ...existent,

    numar:
      config.numar,

    rol:
      config.rol,

    titlu:
      videoGenerat.titlu,

    durataTintaMinute:
      config.durata,

    status:
      "generat-neverificat",

    scenariu:
      videoGenerat.scenariu,

    cadre:
      videoGenerat.cadre,

    ideiDeRetinut:
      videoGenerat.ideiDeRetinut,

    formule:
      videoGenerat.formule || [],

    exemplu:
      videoGenerat.exemplu,

    verificareRapida:
      videoGenerat.verificareRapida,

    metrici:
      videoGenerat.metrici,

    verificare: {
      matematic:
        false,

      programa:
        false,

      limbaRomana:
        false,

      exemplu:
        false,

      audio:
        false,

      video:
        false,
    },

    metadata: {
      ...(existent?.metadata || {}),

      modul:
        lectie.modul,

      lectie:
        lectie.numarLectie,

      titluLectie:
        lectie.titlu,

      generator:
        "Ollama local",

      generatorVersion:
        VERSIUNE_GENERATOR,

      model:
        MODEL_GENERARE,

      sourceHash:
        hashSursa,

      grounded:
        true,

      autoDurata:
        true,

      generatLa:
        new Date().toISOString(),
    },
  };

  lectie.status =
    "generat-neverificat";

  lectie.controlCalitate = {
    ...(lectie.controlCalitate || {}),

    continutGenerat:
      lectie.videoLectii.every(
        (video) =>
          Array.isArray(
            video?.scenariu
          ) &&
          video.scenariu.length > 0
      ),

    verificatAutomat:
      false,

    verificatMatematic:
      false,

    verificatPrograma:
      false,

    verificatManual:
      false,

    gataPentruRandare:
      false,

    gataPentruPublicare:
      false,
  };

  lectie.generareAI = {
    provider:
      "Ollama local",

    model:
      MODEL_GENERARE,

    versiuneGenerator:
      VERSIUNE_GENERATOR,

    grounded:
      true,

    autoDurata:
      true,

    sourceHash:
      hashSursa,

    dataGenerare:
      new Date().toISOString(),

    necesitaVerificareUmana:
      true,
  };

  return lectie;
}

/* =========================================================
   MANIFEST
   ========================================================= */

function extrageToateLectiile(
  manifest
) {
  const rezultate = [];

  function parcurge(
    valoare,
    modulCurent = null
  ) {
    if (
      Array.isArray(valoare)
    ) {
      for (
        const element
        of valoare
      ) {
        parcurge(
          element,
          modulCurent
        );
      }

      return;
    }

    if (
      !valoare ||
      typeof valoare !==
        "object"
    ) {
      return;
    }

    let modulNou =
      modulCurent;

    if (
      Number.isInteger(
        valoare.numarModul
      )
    ) {
      modulNou =
        valoare.numarModul;
    } else if (
      Number.isInteger(
        valoare.modul
      )
    ) {
      modulNou =
        valoare.modul;
    } else if (
      Number.isInteger(
        valoare.numar
      ) &&
      Array.isArray(
        valoare.lectii
      )
    ) {
      modulNou =
        valoare.numar;
    }

    const pareLectie =
      typeof valoare.id ===
        "string" &&
      typeof valoare.titlu ===
        "string" &&
      typeof valoare.fisier ===
        "string";

    if (pareLectie) {
      rezultate.push({
        ...valoare,

        modul:
          valoare.modul ??
          modulNou,
      });

      return;
    }

    for (
      const copil
      of Object.values(
        valoare
      )
    ) {
      parcurge(
        copil,
        modulNou
      );
    }
  }

  parcurge(
    manifest
  );

  const unice =
    new Map();

  for (
    const lectie
    of rezultate
  ) {
    unice.set(
      lectie.id,
      lectie
    );
  }

  return [
    ...unice.values(),
  ];
}

/* =========================================================
   VERIFICATOR EXTERN
   ========================================================= */

function ruleazaVerificator(
  idLectie
) {
  const rezultat =
    spawnSync(
      process.execPath,
      [
        VERIFICATOR_PATH,
        `--id=${idLectie}`,
      ],
      {
        cwd:
          ROOT,

        encoding:
          "utf8",

        windowsHide:
          true,
      }
    );

  if (rezultat.error) {
    throw new Error(
      `Nu am putut porni verificatorul: ${rezultat.error.message}`
    );
  }

  let raport = null;

  if (
    fs.existsSync(
      RAPORT_VERIFICARE_PATH
    )
  ) {
    try {
      raport =
        citesteJson(
          RAPORT_VERIFICARE_PATH
        );
    } catch {
      raport =
        null;
    }
  }

  let rezultatLectie =
    null;

  if (
    Array.isArray(
      raport?.rezultate
    )
  ) {
    rezultatLectie =
      raport.rezultate.find(
        (item) =>
          item?.id ===
          idLectie
      ) || null;
  }

  if (
    rezultatLectie
  ) {
    const probleme =
      Array.isArray(
        rezultatLectie.probleme
      )
        ? rezultatLectie.probleme
        : [];

    const areEroriBlocante =
      probleme.some(
        (problema) =>
          problema?.severitate ===
            "eroare"
      );

    const statusText =
      String(
        rezultatLectie.status ||
        ""
      ).toLowerCase();

    const statusBlocat =
      statusText.includes(
        "blocat"
      ) ||
      statusText.includes(
        "respins"
      ) ||
      statusText.includes(
        "eroare"
      );

    return {
      acceptata:
        !areEroriBlocante &&
        !statusBlocat,

      probleme,

      statusProces:
        rezultat.status,

      rezultatLectie,
    };
  }

  if (
    rezultat.status === 0
  ) {
    return {
      acceptata:
        true,

      probleme:
        [],

      statusProces:
        0,
    };
  }

  if (
    rezultat.status === 2
  ) {
    return {
      acceptata:
        false,

      probleme:
        [],

      statusProces:
        2,
    };
  }

  const iesire =
    [
      rezultat.stdout,
      rezultat.stderr,
    ]
      .filter(Boolean)
      .join("\n")
      .trim();

  throw new Error(
    `Verificatorul nu a putut verifica lecția ${idLectie}. Cod: ${rezultat.status}. ${iesire}`
  );
}

/* =========================================================
   CE VIDEO CORECTĂM
   ========================================================= */

function determinaVideoDeCorectat(
  probleme
) {
  const set =
    new Set();

  for (
    const problema
    of probleme
  ) {
    if (
      problema?.severitate ===
        "eroare" &&
      Number.isInteger(
        problema.video
      ) &&
      problema.video >= 1 &&
      problema.video <= 4
    ) {
      set.add(
        problema.video
      );
    }
  }

  const eroareGenerala =
    probleme.some(
      (problema) =>
        problema?.severitate ===
          "eroare" &&
        !Number.isInteger(
          problema.video
        )
    );

  if (
    eroareGenerala
  ) {
    return [
      1,
      2,
      3,
      4,
    ];
  }

  return [
    ...set,
  ].sort(
    (a, b) =>
      a - b
  );
}

/* =========================================================
   V6 — GENERARE + AJUSTARE + SALVARE

   AICI folosim noul sistem de ajustare.

   Nu mai facem:
   generează → prea scurt → aruncă → generează iar.

   Facem:
   generează
       ↓
   verifică număr cuvinte
       ↓
   ajustează același video
       ↓
   validează
       ↓
   salvează
   ========================================================= */

async function genereazaSiSalveazaVideo({
  caleLectie,
  config,
  probleme = [],
}) {
  let ultimaEroare =
    null;

  for (
    let incercare = 1;
    incercare <=
    MAX_INCERCARI_VIDEO;
    incercare++
  ) {
    try {
      console.log(
        `      Încercarea ${incercare}/${MAX_INCERCARI_VIDEO}...`
      );

      const lectie =
        citesteJson(
          caleLectie
        );

      const hashSursa =
        calculeazaHashSursa(
          lectie
        );

      /*
        PAS A
        Generare inițială.
      */

      let generat =
        await genereazaVideo(
          lectie,
          config,
          probleme
        );

      const cuvinteInitiale =
        numaraCuvinte(
          textScenariu(
            generat
          )
        );

      console.log(
        `      📝 Scenariu inițial: ${cuvinteInitiale} cuvinte.`
      );

      /*
        PAS B
        Ajustarea automată V6.
      */

      generat =
        await ajusteazaDurataVideo(
          lectie,
          generat,
          config
        );

      /*
        PAS C
        Validarea completă.
      */

      const valid =
        valideazaVideo(
          generat,
          config
        );

      /*
        PAS D
        Recitim lecția înainte de salvare.
      */

      const lectieCurenta =
        citesteJson(
          caleLectie
        );

      const hashSursaCurenta =
        calculeazaHashSursa(
          lectieCurenta
        );

      if (
        hashSursaCurenta !==
        hashSursa
      ) {
        throw new Error(
          "Sursa lecției s-a modificat în timpul generării. Reluăm pentru siguranță."
        );
      }

      /*
        PAS E
        Salvare.
      */

      const actualizata =
        introduceVideoInLectie(
          lectieCurenta,
          valid,
          config,
          hashSursa
        );

      scrieJson(
        caleLectie,
        actualizata
      );

      console.log(
        `      ✅ Video ${config.numar} salvat V6.`
      );

      console.log(
        `         ${valid.metrici.cuvinteScenariu} cuvinte`
      );

      console.log(
        `         ~${valid.metrici.durataEstimataMinute} minute estimate`
      );

      console.log(
        `         țintă: ${config.durata} minute`
      );

      return;
    } catch (error) {
      ultimaEroare =
        error instanceof Error
          ? error.message
          : String(error);

      console.log(
        `      ⚠️ ${ultimaEroare}`
      );

      if (
        incercare <
        MAX_INCERCARI_VIDEO
      ) {
        console.log(
          "      🔄 Reluăm generarea completă pentru acest video..."
        );

        await pauza(
          2000
        );
      }
    }
  }

  throw new Error(
    `Video ${config.numar} nu a putut fi generat cu V6. Ultima eroare: ${ultimaEroare}`
  );
}

/* =========================================================
   VIDEO-URI CARE TREBUIE REGENERATE
   ========================================================= */

function determinaVideoNecesare(
  lectie,
  forteaza
) {
  if (
    forteaza
  ) {
    return [
      ...CONFIG_VIDEO,
    ];
  }

  const hashSursa =
    calculeazaHashSursa(
      lectie
    );

  return CONFIG_VIDEO.filter(
    (config) => {
      const video =
        lectie.videoLectii?.[
          config.numar - 1
        ];

      return !videoEsteActual(
        video,
        config,
        hashSursa
      );
    }
  );
}

/* =========================================================
   MAIN
   ========================================================= */

async function main() {
  console.log("");

  console.log(
    "============================================================"
  );

  console.log(
    "🎓 BAC MATE — GENERATOR VIDEO GROUNDED V6"
  );

  console.log(
    "============================================================"
  );

  console.log("");

  console.log(
    "Provider: Ollama local"
  );

  console.log(
    `Model: ${MODEL_GENERARE}`
  );

  console.log(
    `Adresă: ${OLLAMA_URL}`
  );

  console.log(
    `Versiune generator: ${VERSIUNE_GENERATOR}`
  );

  console.log("");

  console.log(
    "🔒 Lecția din platformă este sursa de adevăr."
  );

  console.log(
    "⏱️ Durata scenariilor este controlată automat."
  );

  console.log(
    "🔧 Scenariile prea scurte/lungi sunt ajustate automat."
  );

  console.log("");

  if (
    !fs.existsSync(
      MANIFEST_PATH
    )
  ) {
    throw new Error(
      "Nu găsesc manifest.json."
    );
  }

  if (
    !fs.existsSync(
      VERIFICATOR_PATH
    )
  ) {
    throw new Error(
      "Nu găsesc verifica-lectii-generate.mjs."
    );
  }

  await verificaOllama();

  console.log(
    "✅ Ollama este disponibil."
  );

  console.log(
    "✅ Modelul este instalat."
  );

  console.log("");

  const manifest =
    citesteJson(
      MANIFEST_PATH
    );

  const argumente =
    citesteArgumente();

  let lectii =
    extrageToateLectiile(
      manifest
    );

  if (
    argumente.id
  ) {
    lectii =
      lectii.filter(
        (lectie) =>
          lectie.id ===
          argumente.id
      );
  }

  if (
    argumente.modul
  ) {
    lectii =
      lectii.filter(
        (lectie) =>
          Number(
            lectie.modul
          ) ===
          argumente.modul
      );
  }

  if (
    !argumente.toate &&
    !argumente.modul &&
    !argumente.id &&
    !argumente.limita
  ) {
    lectii =
      lectii.slice(
        0,
        1
      );
  }

  if (
    argumente.limita
  ) {
    lectii =
      lectii.slice(
        0,
        argumente.limita
      );
  }

  console.log(
    `Lecții selectate: ${lectii.length}`
  );

  console.log("");

  if (
    lectii.length === 0
  ) {
    throw new Error(
      "Nu am găsit nicio lecție pentru criteriile selectate."
    );
  }

  const raport = {
    provider:
      "Ollama local",

    model:
      MODEL_GENERARE,

    generatorVersion:
      VERSIUNE_GENERATOR,

    strategie:
      "grounded-platforma-auto-durata-v6",

    inceput:
      new Date().toISOString(),

    lectiiSelectate:
      lectii.length,

    acceptate:
      0,

    dejaAcceptate:
      0,

    regenerate:
      0,

    blocate:
      0,

    eroriTehnice:
      0,

    rezultate:
      [],
  };

  for (
    let indexLectie = 0;
    indexLectie < lectii.length;
    indexLectie++
  ) {
    const intrare =
      lectii[indexLectie];

    console.log(
      `[${indexLectie + 1}/${lectii.length}] 📘 ${intrare.id} - ${intrare.titlu}`
    );

    const caleLectie =
      path.join(
        CONTINUT_DIR,
        intrare.fisier
      );

    if (
      !fs.existsSync(
        caleLectie
      )
    ) {
      raport.eroriTehnice++;

      raport.rezultate.push({
        id:
          intrare.id,

        status:
          "eroare-tehnica",

        eroare:
          "Fișierul lecției nu există.",
      });

      console.log(
        "   ❌ Fișierul lecției nu există."
      );

      console.log("");

      continue;
    }

    try {
      const lectieInitiala =
        citesteJson(
          caleLectie
        );

      const continutExistent =
        areContinutGenerat(
          lectieInitiala
        );

      const videoNecesare =
        determinaVideoNecesare(
          lectieInitiala,
          argumente.regenereaza
        );

      /*
        Dacă avem deja V6 complet,
        aceeași sursă și durată corectă,
        nu regenerăm inutil.
      */

      if (
        continutExistent &&
        videoNecesare.length === 0 &&
        !argumente.regenereaza
      ) {
        console.log(
          "   🔎 Cele 4 video-uri sunt deja V6 și au durata/sursa corectă."
        );

        const verificareInitiala =
          ruleazaVerificator(
            intrare.id
          );

        if (
          verificareInitiala.acceptata
        ) {
          raport.dejaAcceptate++;

          raport.rezultate.push({
            id:
              intrare.id,

            status:
              "deja-acceptata-v6",
          });

          console.log(
            "   ⏭️ Lecția este deja acceptată automat V6. O sărim."
          );

          console.log("");

          continue;
        }

        console.log(
          "   ⚠️ Lecția V6 există, dar verificatorul a găsit probleme."
        );
      }

      if (
        videoNecesare.length > 0
      ) {
        console.log(
          `   🔄 Trebuie generate/regenerate: ${videoNecesare
            .map(
              (config) =>
                `Video ${config.numar}`
            )
            .join(", ")}`
        );

        console.log(
          "   Motiv: V5/vechi, sursă schimbată, lipsă sau durată incorectă."
        );
      }

      /*
        PASUL 1
        Generăm video-urile necesare.
      */

      for (
        const config
        of videoNecesare
      ) {
        console.log("");

        console.log(
          `   ▶️ Video ${config.numar}/4 - ${config.rol}`
        );

        await genereazaSiSalveazaVideo({
          caleLectie,
          config,
          probleme:
            [],
        });

        raport.regenerate++;
      }

      /*
        PASUL 2
        Verificarea automată existentă.
      */

      let acceptata =
        false;

      let ultimaVerificare =
        null;

      for (
        let ciclu = 1;
        ciclu <=
        MAX_CICLURI_CORECTARE;
        ciclu++
      ) {
        console.log("");

        console.log(
          `   🔍 Verificare automată - ciclul ${ciclu}/${MAX_CICLURI_CORECTARE}...`
        );

        ultimaVerificare =
          ruleazaVerificator(
            intrare.id
          );

        if (
          ultimaVerificare.acceptata
        ) {
          const lectieVerificata =
            citesteJson(
              caleLectie
            );

          /*
            Control final suplimentar V6.
          */

          if (
            !toateVideoActuale(
              lectieVerificata
            )
          ) {
            console.log(
              "   ⚠️ Verificatorul matematic a trecut, dar controlul V6 de sursă/durată nu a trecut."
            );

            const necesare =
              determinaVideoNecesare(
                lectieVerificata,
                false
              );

            if (
              necesare.length === 0
            ) {
              break;
            }

            for (
              const config
              of necesare
            ) {
              console.log(
                `   🔄 Reparăm Video ${config.numar} pentru standardul V6.`
              );

              await genereazaSiSalveazaVideo({
                caleLectie,
                config,
                probleme: [
                  {
                    severitate:
                      "eroare",

                    video:
                      config.numar,

                    mesaj:
                      "Video-ul nu respectă standardul V6 de sursă sau durată.",
                  },
                ],
              });
            }

            continue;
          }

          acceptata =
            true;

          console.log(
            "   ✅ Fără erori automate blocante."
          );

          console.log(
            "   ✅ Toate scenariile au durată corectă."
          );

          console.log(
            "   ✅ Toate video-urile sunt legate de sursa lecției."
          );

          break;
        }

        const probleme =
          ultimaVerificare.probleme ||
          [];

        const videoDeCorectat =
          determinaVideoDeCorectat(
            probleme
          );

        console.log(
          "   ❌ Probleme blocante detectate."
        );

        if (
          ciclu ===
          MAX_CICLURI_CORECTARE
        ) {
          break;
        }

        if (
          videoDeCorectat.length === 0
        ) {
          console.log(
            "   ⚠️ Nu putem identifica automat mini-video-ul responsabil."
          );

          break;
        }

        console.log(
          `   🔄 Corectăm doar: ${videoDeCorectat
            .map(
              (nr) =>
                `Video ${nr}`
            )
            .join(", ")}`
        );

        for (
          const nrVideo
          of videoDeCorectat
        ) {
          const config =
            CONFIG_VIDEO.find(
              (item) =>
                item.numar ===
                nrVideo
            );

          if (
            !config
          ) {
            continue;
          }

          const problemeVideo =
            probleme.filter(
              (problema) =>
                problema.video ===
                  nrVideo ||
                !Number.isInteger(
                  problema.video
                )
            );

          console.log(
            `   ▶️ Corectare Video ${nrVideo}...`
          );

          await genereazaSiSalveazaVideo({
            caleLectie,
            config,
            probleme:
              problemeVideo,
          });
        }
      }

      /*
        PASUL 3
        Acceptare sau blocare.
      */

      if (
        acceptata
      ) {
        raport.acceptate++;

        raport.rezultate.push({
          id:
            intrare.id,

          status:
            "acceptata-automat-v6",

          observatie:
            "Video-urile sunt grounded pe lecție, au durată controlată V6 și au trecut verificările automate disponibile. Nu reprezintă verificare umană.",
        });

        const lectieFinala =
          citesteJson(
            caleLectie
          );

        lectieFinala.controlCalitate = {
          ...(lectieFinala.controlCalitate || {}),

          continutGenerat:
            true,

          groundedPeLectie:
            true,

          durataVideoControlata:
            true,

          ajustareAutomataDurata:
            true,

          verificatAutomat:
            true,

          verificatMatematic:
            false,

          verificatPrograma:
            false,

          verificatManual:
            false,

          gataPentruRandare:
            true,

          gataPentruPublicare:
            false,
        };

        lectieFinala.status =
          "generat-verificat-automat-v6";

        scrieJson(
          caleLectie,
          lectieFinala
        );

        console.log(
          "   ✅ Lecția a trecut filtrul automat V6."
        );
      } else {
        raport.blocate++;

        raport.rezultate.push({
          id:
            intrare.id,

          status:
            "blocata",

          probleme:
            ultimaVerificare?.probleme ||
            [],
        });

        const lectieBlocata =
          citesteJson(
            caleLectie
          );

        lectieBlocata.status =
          "generat-neverificat";

        lectieBlocata.controlCalitate = {
          ...(lectieBlocata.controlCalitate || {}),

          continutGenerat:
            areContinutGenerat(
              lectieBlocata
            ),

          groundedPeLectie:
            false,

          durataVideoControlata:
            false,

          ajustareAutomataDurata:
            false,

          verificatAutomat:
            false,

          verificatMatematic:
            false,

          verificatPrograma:
            false,

          verificatManual:
            false,

          gataPentruRandare:
            false,

          gataPentruPublicare:
            false,
        };

        scrieJson(
          caleLectie,
          lectieBlocata
        );

        console.log(
          "   🚫 Lecția rămâne blocată."
        );
      }
    } catch (error) {
      const mesaj =
        error instanceof Error
          ? error.message
          : String(error);

      raport.eroriTehnice++;

      raport.rezultate.push({
        id:
          intrare.id,

        status:
          "eroare-tehnica",

        eroare:
          mesaj,
      });

      console.log(
        `   ❌ Eroare tehnică: ${mesaj}`
      );
    }

    /*
      Salvăm după fiecare lecție.
      Important în cazul unei pene de curent.
    */

    raport.actualizatLa =
      new Date().toISOString();

    scrieJson(
      RAPORT_GENERARE_PATH,
      raport
    );

    console.log("");

    if (
      indexLectie <
      lectii.length - 1
    ) {
      await pauza(
        1000
      );
    }
  }

  /*
    RAPORT FINAL
  */

  raport.sfarsit =
    new Date().toISOString();

  scrieJson(
    RAPORT_GENERARE_PATH,
    raport
  );

  console.log(
    "============================================================"
  );

  console.log(
    "✅ REZULTAT FINAL V6"
  );

  console.log(
    "============================================================"
  );

  console.log(
    `✅ Acceptate automat: ${raport.acceptate}`
  );

  console.log(
    `⏭️ Deja acceptate V6: ${raport.dejaAcceptate}`
  );

  console.log(
    `🔄 Video generate/regenerate: ${raport.regenerate}`
  );

  console.log(
    `🚫 Blocate: ${raport.blocate}`
  );

  console.log(
    `❌ Erori tehnice: ${raport.eroriTehnice}`
  );

  console.log("");

  console.log(
    `Raport: ${path.relative(
      ROOT,
      RAPORT_GENERARE_PATH
    )}`
  );

  console.log("");

  console.log(
    "🔒 Publicarea automată rămâne dezactivată."
  );

  console.log(
    "✅ Lecția platformei rămâne sursa de adevăr."
  );

  console.log(
    "✅ Durata este controlată și ajustată automat."
  );

  console.log(
    "✅ Un scenariu prea scurt nu mai este abandonat direct."
  );

  console.log(
    "⚠️ Verificarea automată nu înlocuiește verificarea matematică și curriculară umană."
  );

  console.log("");
}

/* =========================================================
   PORNIRE
   ========================================================= */

main().catch(
  (error) => {
    console.error("");

    console.error(
      "❌ EROARE FATALĂ:"
    );

    console.error(
      error instanceof Error
        ? error.message
        : error
    );

    console.error("");

    process.exitCode =
      1;
  }
);