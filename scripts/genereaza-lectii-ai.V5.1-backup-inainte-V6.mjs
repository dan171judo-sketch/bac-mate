import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import https from "node:https";

/* =========================================================
   BAC MATE — GENERATOR LOCAL CONTENT ENGINE V5.1

   Scop:
   - cost API 0
   - Ollama local + qwen3:8b
   - catalog canonic = sursa identitatii lectiei
   - AI local = redactor, NU sursa de adevar matematic
   - tot continutul generat ramane DRAFT
   - checkpoint + resume
   - autoreparare pe baza erorilor validatorului
   - streaming Ollama prin http/https nativ
   - reutilizeaza checkpoint-urile V4.2
   - fara suprascriere
   - fara modificare automata a registrului
========================================================= */

const ROOT = process.cwd();
const DIRECTOR_CONTINUT = path.join(ROOT, "data", "continut");
const DIRECTOR_LECTII = path.join(DIRECTOR_CONTINUT, "lectii");
const CALE_CATALOG = path.join(
  DIRECTOR_CONTINUT,
  "catalog-content-engine.json"
);

/*
 * IMPORTANT:
 * Pastram exact directorul V4.2 pentru a reutiliza checkpoint-urile
 * 01-meta si 02-teorie deja generate si validate.
 */
const DIRECTOR_GENERATOR = path.join(
  DIRECTOR_CONTINUT,
  "generator-local-v4-2"
);

const CALE_RAPORT = path.join(
  DIRECTOR_GENERATOR,
  "raport-generare.json"
);

const NUMAR_LECTII_ASTEPTAT = 219;

const MODEL_IMPLICIT =
  process.env.BAC_MATE_OLLAMA_MODEL ||
  "qwen3:8b";

const OLLAMA_URL =
  process.env.BAC_MATE_OLLAMA_URL ||
  "http://127.0.0.1:11434";

const NUM_CTX = 4096;
const THINK = false;

const MAX_INCERCARI_HTTP = 3;
const MAX_INCERCARI_STRUCTURA = 3;
const PAUZA_RETRY_MS = 5000;
const TIMEOUT_APEL_MS = 20 * 60 * 1000;

const VIDEO_MIN_CUVINTE = {
  1: 340,
  2: 410,
  3: 410,
  4: 410,
};

const VIDEO_MAX_CUVINTE = {
  1: 620,
  2: 720,
  3: 720,
  4: 720,
};

/* =========================================================
   UTILITARE
========================================================= */

function titlu(text) {
  console.log("");
  console.log("=".repeat(72));
  console.log(text);
  console.log("=".repeat(72));
}

function exista(cale) {
  return fs.existsSync(cale);
}

function asiguraDirector(cale) {
  fs.mkdirSync(cale, {
    recursive: true,
  });
}

function citesteText(cale) {
  return fs.readFileSync(cale, "utf8");
}

function citesteJson(cale) {
  return JSON.parse(citesteText(cale));
}

function scrieJson(cale, valoare) {
  asiguraDirector(path.dirname(cale));

  fs.writeFileSync(
    cale,
    JSON.stringify(valoare, null, 2) + "\n",
    "utf8"
  );
}

function acum() {
  return new Date().toISOString();
}

function relativ(cale) {
  return path.relative(ROOT, cale);
}

function asteapta(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function esteText(valoare) {
  return (
    typeof valoare === "string" &&
    valoare.trim().length > 0
  );
}

function esteArray(valoare) {
  return Array.isArray(valoare);
}

function numaraCuvinte(text) {
  return String(text ?? "")
    .replace(/[\n\r\t]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .length;
}

/* =========================================================
   ARGUMENTE CLI
========================================================= */

function citesteArgumente() {
  const rezultat = {
    dryRun: false,
    all: false,
    limit: null,
    slug: null,
    restart: false,
    model: MODEL_IMPLICIT,
  };

  const argumente = process.argv.slice(2);

  for (const argument of argumente) {
    if (argument === "--dry-run") {
      rezultat.dryRun = true;
      continue;
    }

    if (argument === "--all") {
      rezultat.all = true;
      continue;
    }

    if (argument === "--restart") {
      rezultat.restart = true;
      continue;
    }

    if (argument.startsWith("--limit=")) {
      const valoare = Number(
        argument.slice("--limit=".length)
      );

      if (
        !Number.isInteger(valoare) ||
        valoare <= 0
      ) {
        throw new Error(
          "--limit trebuie sa fie numar intreg pozitiv."
        );
      }

      rezultat.limit = valoare;
      continue;
    }

    if (argument.startsWith("--slug=")) {
      const slug = argument
        .slice("--slug=".length)
        .trim();

      if (!slug) {
        throw new Error(
          "--slug nu poate fi gol."
        );
      }

      rezultat.slug = slug;
      continue;
    }

    if (argument.startsWith("--model=")) {
      const model = argument
        .slice("--model=".length)
        .trim();

      if (!model) {
        throw new Error(
          "--model nu poate fi gol."
        );
      }

      rezultat.model = model;
      continue;
    }

    throw new Error(
      `Argument necunoscut: ${argument}`
    );
  }

  if (rezultat.all && rezultat.limit) {
    throw new Error(
      "Nu folosi --all si --limit simultan."
    );
  }

  return rezultat;
}

/* =========================================================
   CATALOG CANONIC
========================================================= */

function incarcaCatalogul() {
  if (!exista(CALE_CATALOG)) {
    throw new Error(
      [
        "Lipseste catalogul canonic:",
        relativ(CALE_CATALOG),
        "",
        "Ruleaza:",
        "npm.cmd run content:generate",
      ].join("\n")
    );
  }

  const document = citesteJson(CALE_CATALOG);

  if (
    !document ||
    !Array.isArray(document.lectii)
  ) {
    throw new Error(
      "catalog-content-engine.json nu contine array-ul lectii."
    );
  }

  const lectii = document.lectii;

  if (
    lectii.length !== NUMAR_LECTII_ASTEPTAT
  ) {
    throw new Error(
      `Catalog invalid: ${lectii.length}/${NUMAR_LECTII_ASTEPTAT}.`
    );
  }

  const slugs = new Set();
  const pozitii = new Set();

  for (const lectie of lectii) {
    if (!esteText(lectie.slug)) {
      throw new Error(
        "Exista o lectie fara slug valid."
      );
    }

    if (
      !Number.isInteger(lectie.modul) ||
      !Number.isInteger(lectie.numarLectie)
    ) {
      throw new Error(
        `Pozitie invalida: ${lectie.slug}`
      );
    }

    if (!esteText(lectie.titlu)) {
      throw new Error(
        `Titlu invalid: ${lectie.slug}`
      );
    }

    if (slugs.has(lectie.slug)) {
      throw new Error(
        `Slug duplicat: ${lectie.slug}`
      );
    }

    const pozitie =
      `${lectie.modul}:${lectie.numarLectie}`;

    if (pozitii.has(pozitie)) {
      throw new Error(
        `Pozitie duplicata: ${pozitie}`
      );
    }

    slugs.add(lectie.slug);
    pozitii.add(pozitie);
  }

  return lectii;
}

/* =========================================================
   LECTII EXISTENTE
========================================================= */

function obtineSluguriExistente() {
  if (!exista(DIRECTOR_LECTII)) {
    return new Set();
  }

  const fisiere = fs.readdirSync(
    DIRECTOR_LECTII
  );

  return new Set(
    fisiere
      .filter((fisier) =>
        fisier.endsWith(".ts")
      )
      .map((fisier) =>
        fisier.slice(0, -3)
      )
  );
}

/* =========================================================
   SELECTIE
========================================================= */

function selecteazaLectii(
  catalog,
  existente,
  argumente
) {
  if (argumente.slug) {
    const lectie = catalog.find(
      (element) =>
        element.slug === argumente.slug
    );

    if (!lectie) {
      throw new Error(
        `Slug inexistent in catalog: ${argumente.slug}`
      );
    }

    if (existente.has(lectie.slug)) {
      throw new Error(
        `Lectia exista deja. Generatorul refuza suprascrierea: ${lectie.slug}`
      );
    }

    return [lectie];
  }

  const lipsa = catalog.filter(
    (lectie) =>
      !existente.has(lectie.slug)
  );

  if (argumente.all) {
    return lipsa;
  }

  if (argumente.limit) {
    return lipsa.slice(0, argumente.limit);
  }

  return lipsa.slice(0, 1);
}

/* =========================================================
   CHECKPOINT PATHS
========================================================= */

function directorLectieGenerator(slug) {
  return path.join(
    DIRECTOR_GENERATOR,
    slug
  );
}

function caleCheckpoint(slug, nume) {
  return path.join(
    directorLectieGenerator(slug),
    `${nume}.json`
  );
}

function caleFinalaLectie(slug) {
  return path.join(
    DIRECTOR_LECTII,
    `${slug}.ts`
  );
}

function stergeCheckpointuri(slug) {
  const director =
    directorLectieGenerator(slug);

  if (exista(director)) {
    fs.rmSync(director, {
      recursive: true,
      force: true,
    });
  }
}

/* =========================================================
   OLLAMA CHECK
========================================================= */

async function verificaOllama(model) {
  let raspuns;

  try {
    raspuns = await fetch(
      `${OLLAMA_URL}/api/tags`,
      {
        signal: AbortSignal.timeout(10000),
      }
    );
  } catch (eroare) {
    throw new Error(
      `Nu ma pot conecta la Ollama. Detaliu: ${eroare.message}`
    );
  }

  if (!raspuns.ok) {
    throw new Error(
      `Ollama /api/tags -> HTTP ${raspuns.status}`
    );
  }

  const date = await raspuns.json();
  const modele = date.models ?? [];

  const instalat = modele.some(
    (element) =>
      element.name === model
  );

  if (!instalat) {
    throw new Error(
      `Modelul ${model} nu este instalat. Ruleaza: ollama pull ${model}`
    );
  }
}

/* =========================================================
   JSON MODEL
========================================================= */

function parseazaJsonModel(continut) {
  if (!esteText(continut)) {
    throw new Error(
      "Modelul a returnat content gol."
    );
  }

  let text = continut.trim();

  text = text.replace(
    /^```(?:json)?\s*/i,
    ""
  );

  text = text.replace(
    /\s*```$/,
    ""
  );

  try {
    return JSON.parse(text);
  } catch {
    const inceput = text.indexOf("{");
    const sfarsit = text.lastIndexOf("}");

    if (
      inceput === -1 ||
      sfarsit === -1 ||
      sfarsit <= inceput
    ) {
      throw new Error(
        "Nu am gasit un obiect JSON valid in raspuns."
      );
    }

    const candidat = text.slice(
      inceput,
      sfarsit + 1
    );

    return JSON.parse(candidat);
  }
}

/* =========================================================
   OLLAMA STREAMING NATIV
========================================================= */

function apeleazaOllamaStreaming(payload) {
  return new Promise((resolve, reject) => {
    let url;

    try {
      url = new URL("/api/chat", OLLAMA_URL);
    } catch (eroare) {
      reject(
        new Error(
          `BAC_MATE_OLLAMA_URL invalid: ${eroare.message}`
        )
      );
      return;
    }

    const transport =
      url.protocol === "https:"
        ? https
        : http;

    const corp = JSON.stringify(payload);

    const optiuni = {
      protocol: url.protocol,
      hostname: url.hostname,
      port:
        url.port ||
        (url.protocol === "https:"
          ? 443
          : 80),
      path: url.pathname + url.search,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(corp),
      },
    };

    let finalizat = false;

    const inchideCuEroare = (eroare) => {
      if (finalizat) {
        return;
      }

      finalizat = true;
      reject(eroare);
    };

    const req = transport.request(
      optiuni,
      (res) => {
        let buffer = "";
        let continut = "";
        let eroareApi = "";
        let chunkuri = 0;
        let ultimulProgres = Date.now();

        console.log(
          `  ↳ Ollama streaming conectat: HTTP ${res.statusCode}`
        );

        if (
          !res.statusCode ||
          res.statusCode < 200 ||
          res.statusCode >= 300
        ) {
          res.setEncoding("utf8");

          res.on("data", (chunk) => {
            eroareApi += chunk;
          });

          res.on("end", () => {
            inchideCuEroare(
              new Error(
                `Ollama HTTP ${res.statusCode}: ${eroareApi.slice(0, 1000)}`
              )
            );
          });

          return;
        }

        res.setEncoding("utf8");

        res.on("data", (chunk) => {
          buffer += chunk;

          let pozitieLinieNoua;

          while (
            (pozitieLinieNoua = buffer.indexOf("\n")) !== -1
          ) {
            const linie = buffer
              .slice(0, pozitieLinieNoua)
              .trim();

            buffer = buffer.slice(
              pozitieLinieNoua + 1
            );

            if (!linie) {
              continue;
            }

            let eveniment;

            try {
              eveniment = JSON.parse(linie);
            } catch (eroare) {
              req.destroy(
                new Error(
                  `Chunk Ollama invalid JSON: ${eroare.message}`
                )
              );
              return;
            }

            if (eveniment.error) {
              req.destroy(
                new Error(
                  `Ollama: ${eveniment.error}`
                )
              );
              return;
            }

            if (
              typeof eveniment?.message?.content ===
              "string"
            ) {
              continut +=
                eveniment.message.content;
            }

            /*
             * message.thinking este ignorat intentionat.
             */

            chunkuri++;

            const acumMs = Date.now();

            if (
              acumMs - ultimulProgres >= 10000
            ) {
              process.stdout.write(".");
              ultimulProgres = acumMs;
            }
          }
        });

        res.on("end", () => {
          if (finalizat) {
            return;
          }

          if (buffer.trim()) {
            try {
              const eveniment = JSON.parse(
                buffer.trim()
              );

              if (eveniment.error) {
                inchideCuEroare(
                  new Error(
                    `Ollama: ${eveniment.error}`
                  )
                );
                return;
              }

              if (
                typeof eveniment?.message?.content ===
                "string"
              ) {
                continut +=
                  eveniment.message.content;
              }
            } catch (eroare) {
              inchideCuEroare(
                new Error(
                  `Ultimul chunk Ollama este invalid JSON: ${eroare.message}`
                )
              );
              return;
            }
          }

          if (chunkuri > 0) {
            process.stdout.write("\n");
          }

          if (!esteText(continut)) {
            inchideCuEroare(
              new Error(
                "Ollama a terminat streaming-ul fara message.content."
              )
            );
            return;
          }

          finalizat = true;
          resolve(continut);
        });

        res.on("error", (eroare) => {
          inchideCuEroare(eroare);
        });
      }
    );

    req.setTimeout(
      TIMEOUT_APEL_MS,
      () => {
        req.destroy(
          new Error(
            `Timeout Ollama dupa ${Math.round(
              TIMEOUT_APEL_MS / 60000
            )} minute.`
          )
        );
      }
    );

    req.on("error", (eroare) => {
      inchideCuEroare(eroare);
    });

    req.write(corp);
    req.end();
  });
}

/* =========================================================
   APEL OLLAMA
========================================================= */

async function cereJsonDeLaOllama({
  model,
  sistem,
  prompt,
  numPredict,
  temperature = 0.12,
}) {
  let ultimaEroare = null;

  for (
    let incercare = 1;
    incercare <= MAX_INCERCARI_HTTP;
    incercare++
  ) {
    try {
      const continut =
        await apeleazaOllamaStreaming({
          model,
          stream: true,
          think: THINK,
          format: "json",
          keep_alive: "30m",
          options: {
            temperature,
            top_p: 0.9,
            repeat_penalty: 1.08,
            num_ctx: NUM_CTX,
            num_predict: numPredict,
          },
          messages: [
            {
              role: "system",
              content: sistem,
            },
            {
              role: "user",
              content: prompt,
            },
          ],
        });

      return parseazaJsonModel(continut);
    } catch (eroare) {
      ultimaEroare = eroare;

      console.log(
        `  ⚠ HTTP/stream ${incercare}/${MAX_INCERCARI_HTTP}: ${eroare.message}`
      );

      if (
        incercare < MAX_INCERCARI_HTTP
      ) {
        console.log(
          `  Astept ${PAUZA_RETRY_MS / 1000} secunde...`
        );

        await asteapta(PAUZA_RETRY_MS);
      }
    }
  }

  throw (
    ultimaEroare ??
    new Error(
      "Apelul Ollama a esuat."
    )
  );
}

/* =========================================================
   SYSTEM PROMPT
========================================================= */

function mesajSistem() {
  return [
    "Esti redactor educational pentru BAC MATE.",
    "Scrii pentru elevi romani care se pregatesc la matematica.",
    "Raspunzi exclusiv prin JSON valid.",
    "Nu utiliza Markdown.",
    "Nu inventa surse oficiale.",
    "Nu inventa subiecte oficiale de Bac.",
    "Nu inventa bareme sau ani de examen.",
    "Continutul este DRAFT si necesita verificare umana.",
    "Nu pretinde ca materialul a fost verificat oficial.",
    "Foloseste limba romana clara si corecta.",
    "Fii conservator cu afirmatiile matematice.",
  ].join(" ");
}

/* =========================================================
   CONTEXT CANONIC
========================================================= */

function contextCanonic(lectie) {
  return {
    slug: lectie.slug,
    modul: lectie.modul,
    numarLectie: lectie.numarLectie,
    titlu: lectie.titlu,
    profil: "M_mate-info",
    clasa: lectie.clasa ?? null,
    numeModul: lectie.numeModul ?? null,
  };
}

function blocCanonic(lectie) {
  return `
DATE CANONICE.

NU modifica slug-ul, modulul,
numarul lectiei sau titlul canonic.

${JSON.stringify(
  contextCanonic(lectie),
  null,
  2
)}

REGULI:
- profil = M_mate-info;
- continutul este DRAFT;
- raspunde numai JSON valid;
- fara Markdown;
- fara afirmatii ca materialul este verificat;
- fara surse inventate;
- fara subiecte Bac inventate.
`.trim();
}

/* =========================================================
   CHECKPOINT + AUTOREPARARE
========================================================= */

async function obtineCheckpoint({
  lectie,
  argumente,
  nume,
  prompt,
  validator,
  numPredict,
}) {
  const cale = caleCheckpoint(
    lectie.slug,
    nume
  );

  if (exista(cale)) {
    try {
      const existent = citesteJson(cale);
      const erori = validator(existent);

      if (erori.length === 0) {
        console.log(
          `  ↷ ${nume}: checkpoint valid reutilizat.`
        );

        return existent;
      }

      console.log(
        `  ⚠ ${nume}: checkpoint vechi invalid, il refacem.`
      );
    } catch {
      console.log(
        `  ⚠ ${nume}: checkpoint corupt, il refacem.`
      );
    }

    fs.rmSync(cale, {
      force: true,
    });
  }

  let ultimeErori = [];
  let promptCurent = prompt;

  for (
    let incercare = 1;
    incercare <= MAX_INCERCARI_STRUCTURA;
    incercare++
  ) {
    console.log(
      `  → ${nume}: ${argumente.model} (${incercare}/${MAX_INCERCARI_STRUCTURA})...`
    );

    const rezultat =
      await cereJsonDeLaOllama({
        model: argumente.model,
        sistem: mesajSistem(),
        prompt: promptCurent,
        numPredict,
      });

    const erori = validator(rezultat);

    if (erori.length === 0) {
      scrieJson(cale, rezultat);

      console.log(
        `  ✓ ${nume}: checkpoint salvat.`
      );

      return rezultat;
    }

    ultimeErori = erori;

    console.log(
      `  ⚠ ${nume}: structura respinsa.`
    );

    for (const eroare of erori) {
      console.log(
        `    - ${eroare}`
      );
    }

    const caleRespins = path.join(
      directorLectieGenerator(
        lectie.slug
      ),
      `${nume}-respins-${incercare}.json`
    );

    scrieJson(
      caleRespins,
      rezultat
    );

    if (
      incercare < MAX_INCERCARI_STRUCTURA
    ) {
      promptCurent = `
${prompt}

RASPUNSUL ANTERIOR A FOST RESPINS DE VALIDATOR.

ERORI EXACTE:

${erori
  .map((eroare) => `- ${eroare}`)
  .join("\n")}

CORECTEAZA TOATE ERORILE DE MAI SUS.

REGULI OBLIGATORII PENTRU REINCERCARE:
- returneaza din nou obiectul JSON COMPLET;
- nu returna doar sectiunea corectata;
- nu explica ce ai modificat;
- nu folosi Markdown;
- nu folosi blocuri de cod;
- pastreaza toate campurile cerute in schema initiala;
- fiecare camp obligatoriu trebuie completat;
- fiecare array trebuie sa respecte numarul minim sau exact cerut;
- raspunsul final trebuie sa poata fi parsata direct cu JSON.parse.
`.trim();

      console.log(
        "  ↻ Urmatoarea incercare primeste erorile validatorului pentru autoreparare."
      );
    }
  }

  throw new Error(
    [
      `Checkpoint invalid: ${nume}`,
      ...ultimeErori.map(
        (eroare) => `- ${eroare}`
      ),
    ].join("\n")
  );
}

/* =========================================================
   VALIDATOR META
========================================================= */

function valideazaMeta(x) {
  const erori = [];

  if (!x || typeof x !== "object") {
    return [
      "Rezultatul nu este obiect."
    ];
  }

  for (const camp of [
    "clasa",
    "subtitlu",
    "descriere",
  ]) {
    if (!esteText(x[camp])) {
      erori.push(`${camp} lipsa`);
    }
  }

  const niveluri = new Set([
    "fundament",
    "standard-bac",
    "avansat",
  ]);

  if (!niveluri.has(x.nivelPrincipal)) {
    erori.push(
      "nivelPrincipal invalid"
    );
  }

  if (
    !Number.isFinite(
      x.durataEstimataMinute
    ) ||
    x.durataEstimataMinute < 15 ||
    x.durataEstimataMinute > 120
  ) {
    erori.push(
      "durataEstimataMinute invalida"
    );
  }

  if (!esteArray(x.prerechizite)) {
    erori.push(
      "prerechizite invalid"
    );
  }

  if (
    !esteArray(x.obiective) ||
    x.obiective.length < 4
  ) {
    erori.push(
      "minimum 4 obiective"
    );
  }

  if (
    !esteArray(x.termeniCheie) ||
    x.termeniCheie.length < 4
  ) {
    erori.push(
      "minimum 4 termeniCheie"
    );
  }

  return erori;
}

/* =========================================================
   VALIDATOR TEORIE
========================================================= */

function valideazaTeorie(x) {
  const erori = [];

  if (!x || typeof x !== "object") {
    return [
      "Rezultatul nu este obiect."
    ];
  }

  if (
    !esteArray(x.definitii) ||
    x.definitii.length < 2
  ) {
    erori.push(
      "minimum 2 definitii"
    );
  }

  if (
    !esteArray(x.teorie) ||
    x.teorie.length < 3
  ) {
    erori.push(
      "minimum 3 sectiuni teorie"
    );
  }

  if (!esteArray(x.formule)) {
    erori.push(
      "formule trebuie array"
    );
  }

  for (
    const [index, definitie] of
      (x.definitii ?? []).entries()
  ) {
    if (
      !esteText(definitie?.termen) ||
      !esteText(definitie?.definitie)
    ) {
      erori.push(
        `definitia ${index + 1} invalida`
      );
    }
  }

  for (
    const [index, sectiune] of
      (x.teorie ?? []).entries()
  ) {
    if (
      !esteText(sectiune?.id) ||
      !esteText(sectiune?.titlu) ||
      !esteText(sectiune?.explicatie) ||
      !esteArray(sectiune?.ideiCheie) ||
      sectiune.ideiCheie.length < 2 ||
      sectiune.ideiCheie.some(
        (idee) => !esteText(idee)
      )
    ) {
      erori.push(
        `teorie ${index + 1} invalida`
      );
    }
  }

  return erori;
}

/* =========================================================
   VALIDATOR PEDAGOGIE
========================================================= */

function valideazaPedagogie(x) {
  const erori = [];

  if (!x || typeof x !== "object") {
    return [
      "Rezultatul nu este obiect."
    ];
  }

  if (
    !esteArray(x.greseliFrecvente) ||
    x.greseliFrecvente.length < 4
  ) {
    erori.push(
      "minimum 4 greseliFrecvente"
    );
  }

  for (
    const [index, greseala] of
      (x.greseliFrecvente ?? []).entries()
  ) {
    for (const [camp, valoare] of [
      ["greseala", greseala?.greseala],
      ["deCeEsteGresit", greseala?.deCeEsteGresit],
      ["cumOEviti", greseala?.cumOEviti],
    ]) {
      if (!esteText(valoare)) {
        erori.push(
          `gresealaFrecventa ${index + 1}: camp lipsa sau invalid: ${camp}`
        );
      }
    }
  }

  if (
    !x.rezumat ||
    !esteArray(
      x.rezumat.ideiDeRetinut
    ) ||
    x.rezumat.ideiDeRetinut.length < 4 ||
    !esteArray(
      x.rezumat.formuleDeRetinut
    ) ||
    !esteArray(
      x.rezumat.checklistElev
    ) ||
    x.rezumat.checklistElev.length < 4
  ) {
    erori.push(
      "rezumat invalid"
    );
  }

  if (
    !x.legaturaCuBac ||
    !esteText(
      x.legaturaCuBac.importanta
    ) ||
    !esteArray(
      x.legaturaCuBac.tipuriCerinte
    ) ||
    !esteArray(
      x.legaturaCuBac.strategie
    )
  ) {
    erori.push(
      "legaturaCuBac invalida"
    );
  }

  return erori;
}

/* =========================================================
   VALIDATOR EXEMPLE
========================================================= */

function valideazaExemple(x) {
  if (
    !x ||
    !Array.isArray(
      x.exempleRezolvate
    ) ||
    x.exempleRezolvate.length !== 4
  ) {
    return [
      "Trebuie exact 4 exempleRezolvate."
    ];
  }

  const erori = [];
  const niveluri = new Set([
    "fundament",
    "standard-bac",
    "avansat",
  ]);
  const iduri = new Set();

  x.exempleRezolvate.forEach(
    (exemplu, index) => {
      if (!esteText(exemplu.id)) {
        erori.push(
          `exemplu ${index + 1}: id lipsa`
        );
      } else if (iduri.has(exemplu.id)) {
        erori.push(
          `exemplu ${index + 1}: id duplicat`
        );
      } else {
        iduri.add(exemplu.id);
      }

      if (
        !esteText(exemplu.titlu) ||
        !esteText(exemplu.enunt) ||
        !esteText(exemplu.raspunsFinal) ||
        !esteText(exemplu.verificare)
      ) {
        erori.push(
          `exemplu ${index + 1}: camp text lipsa`
        );
      }

      if (!niveluri.has(exemplu.nivel)) {
        erori.push(
          `exemplu ${index + 1}: nivel invalid`
        );
      }

      if (
        !Array.isArray(exemplu.pasi) ||
        exemplu.pasi.length < 2
      ) {
        erori.push(
          `exemplu ${index + 1}: minimum 2 pasi`
        );
      }
    }
  );

  return erori;
}

/* =========================================================
   VALIDATOR EXERCITII
========================================================= */

function valideazaLotExercitii(x) {
  if (
    !x ||
    !Array.isArray(x.exercitii) ||
    x.exercitii.length !== 4
  ) {
    return [
      "Lotul trebuie sa contina exact 4 exercitii."
    ];
  }

  const erori = [];
  const niveluri = new Set([
    "fundament",
    "standard-bac",
    "avansat",
  ]);
  const tipuri = new Set([
    "alegere-multipla",
    "raspuns-scurt",
    "rezolvare-completa",
  ]);
  const iduri = new Set();

  x.exercitii.forEach(
    (exercitiu, index) => {
      if (!esteText(exercitiu.id)) {
        erori.push(
          `exercitiu ${index + 1}: id lipsa`
        );
      } else if (iduri.has(exercitiu.id)) {
        erori.push(
          `exercitiu ${index + 1}: id duplicat`
        );
      } else {
        iduri.add(exercitiu.id);
      }

      if (!niveluri.has(exercitiu.nivel)) {
        erori.push(
          `exercitiu ${index + 1}: nivel invalid`
        );
      }

      if (!tipuri.has(exercitiu.tip)) {
        erori.push(
          `exercitiu ${index + 1}: tip invalid`
        );
      }

      const campuriTextObligatorii = [
        ["enunt", exercitiu.enunt],
        ["raspunsCorect", exercitiu.raspunsCorect],
        ["explicatieFinala", exercitiu.explicatieFinala],
        ["competenta", exercitiu.competenta],
      ];

      for (const [camp, valoare] of campuriTextObligatorii) {
        if (!esteText(valoare)) {
          erori.push(
            `exercitiu ${index + 1}: camp lipsa sau invalid: ${camp}`
          );
        }
      }

      if (
        !Array.isArray(
          exercitiu.rezolvare
        ) ||
        exercitiu.rezolvare.length < 2
      ) {
        erori.push(
          `exercitiu ${index + 1}: rezolvare sub 2 pasi`
        );
      }

      if (
        !Number.isFinite(
          exercitiu.punctaj
        ) ||
        exercitiu.punctaj <= 0
      ) {
        erori.push(
          `exercitiu ${index + 1}: punctaj invalid`
        );
      }

      if (
        exercitiu.tip ===
        "alegere-multipla"
      ) {
        if (
          !Array.isArray(
            exercitiu.variante
          ) ||
          exercitiu.variante.length !== 4
        ) {
          erori.push(
            `exercitiu ${index + 1}: alegere-multipla necesita 4 variante`
          );
        } else if (
          !exercitiu.variante.includes(
            exercitiu.raspunsCorect
          )
        ) {
          erori.push(
            `exercitiu ${index + 1}: raspunsCorect nu apare in variante`
          );
        }
      }
    }
  );

  return erori;
}

/* =========================================================
   VALIDATOR VIDEO
========================================================= */

function valideazaVideo(x, numar) {
  const video = x?.video;

  if (
    !video ||
    typeof video !== "object"
  ) {
    return [
      "Lipseste obiectul video."
    ];
  }

  const erori = [];
  const durata = numar === 1 ? 4 : 5;

  if (video.numar !== numar) {
    erori.push(
      `numar trebuie sa fie ${numar}`
    );
  }

  if (video.durataMinute !== durata) {
    erori.push(
      `durataMinute trebuie ${durata}`
    );
  }

  if (
    !esteText(video.id) ||
    !esteText(video.titlu) ||
    !esteText(video.descriere)
  ) {
    erori.push(
      "id/titlu/descriere video invalid"
    );
  }

  if (
    !Array.isArray(video.scenariu) ||
    video.scenariu.length < 8
  ) {
    erori.push(
      "scenariu trebuie minimum 8 paragrafe"
    );
  }

  const totalCuvinte = numaraCuvinte(
    (video.scenariu ?? []).join(" ")
  );

  if (
    totalCuvinte <
    VIDEO_MIN_CUVINTE[numar]
  ) {
    erori.push(
      `scenariu prea scurt: ${totalCuvinte}/${VIDEO_MIN_CUVINTE[numar]} cuvinte`
    );
  }

  if (
    totalCuvinte >
    VIDEO_MAX_CUVINTE[numar]
  ) {
    erori.push(
      `scenariu prea lung: ${totalCuvinte}/${VIDEO_MAX_CUVINTE[numar]} cuvinte`
    );
  }

  if (
    !Array.isArray(
      video.ideiDeRetinut
    ) ||
    video.ideiDeRetinut.length < 3
  ) {
    erori.push(
      "minimum 3 ideiDeRetinut"
    );
  }

  if (
    !video.exemplu ||
    !esteText(video.exemplu.titlu) ||
    !esteText(video.exemplu.enunt) ||
    !Array.isArray(
      video.exemplu.rezolvareScurta
    ) ||
    !esteText(video.exemplu.raspuns)
  ) {
    erori.push(
      "exemplu video invalid"
    );
  }

  const verificare =
    video.verificareRapida;

  if (
    !verificare ||
    !esteText(verificare.intrebare) ||
    !Array.isArray(verificare.variante) ||
    verificare.variante.length !== 4 ||
    !Number.isInteger(
      verificare.raspunsCorect
    ) ||
    verificare.raspunsCorect < 0 ||
    verificare.raspunsCorect > 3 ||
    !esteText(verificare.explicatie)
  ) {
    erori.push(
      "verificareRapida invalida"
    );
  }

  return erori;
}

/* =========================================================
   PROMPT META
========================================================= */

function promptMeta(lectie) {
  return `
${blocCanonic(lectie)}

Genereaza numai metadatele pedagogice ale lectiei.

Returneaza EXACT structura:

{
  "clasa": "Clasa a IX-a",
  "subtitlu": "...",
  "descriere": "...",
  "nivelPrincipal": "fundament",
  "durataEstimataMinute": 25,
  "prerechizite": [
    "..."
  ],
  "obiective": [
    "...",
    "..."
  ],
  "termeniCheie": [
    "...",
    "..."
  ]
}

CERINTE:
- minimum 4 obiective;
- minimum 4 termeniCheie;
- prerechizite poate fi [];
- nivelPrincipal este exact unul dintre:
  fundament
  standard-bac
  avansat;
- descriere clara si scurta;
- nu genera teoria;
- nu genera exercitii;
- nu genera video.
`.trim();
}

/* =========================================================
   PROMPT TEORIE
========================================================= */

function promptTeorie(lectie, meta) {
  return `
${blocCanonic(lectie)}

OBIECTIVE:

${JSON.stringify(
  meta.obiective,
  null,
  2
)}

TERMENI CHEIE:

${JSON.stringify(
  meta.termeniCheie,
  null,
  2
)}

Genereaza partea teoretica.

Returneaza EXACT:

{
  "definitii": [
    {
      "termen": "...",
      "definitie": "...",
      "observatie": "..."
    }
  ],

  "teorie": [
    {
      "id": "...",
      "titlu": "...",
      "explicatie": "...",
      "ideiCheie": [
        "...",
        "..."
      ]
    }
  ],

  "formule": [
    {
      "id": "...",
      "nume": "...",
      "formula": "...",
      "explicatie": "...",
      "conditii": [
        "..."
      ],
      "exempluScurt": "..."
    }
  ]
}

CERINTE:
- minimum 2 definitii;
- minimum 3 sectiuni teorie;
- FIECARE sectiune teorie trebuie sa aiba:
  id,
  titlu,
  explicatie,
  minimum 2 ideiCheie NEGOALE;
- formule poate fi [] daca lectia nu necesita formule;
- nu inventa formule doar pentru a umple array-ul;
- foloseste notatie matematica simpla si lizibila;
- nu genera exemplele mari inca.
`.trim();
}

/* =========================================================
   PROMPT PEDAGOGIE
========================================================= */

function promptPedagogie(
  lectie,
  meta,
  teorie
) {
  const context = {
    obiective: meta.obiective,
    definitii: teorie.definitii,
    formule: teorie.formule,
  };

  return `
${blocCanonic(lectie)}

CONTEXT:

${JSON.stringify(
  context,
  null,
  2
)}

Genereaza partea pedagogica de consolidare.

Returneaza EXACT:

{
  "greseliFrecvente": [
    {
      "greseala": "...",
      "deCeEsteGresit": "...",
      "cumOEviti": "..."
    }
  ],

  "rezumat": {
    "ideiDeRetinut": [
      "..."
    ],
    "formuleDeRetinut": [
      "..."
    ],
    "checklistElev": [
      "..."
    ]
  },

  "legaturaCuBac": {
    "importanta": "...",
    "tipuriCerinte": [
      "..."
    ],
    "strategie": [
      "..."
    ]
  }
}

CERINTE:
- minimum 4 greseliFrecvente;
- minimum 4 ideiDeRetinut;
- minimum 4 elemente checklistElev;
- nu pretinde ca un anumit exercitiu a aparut oficial la Bac;
- descrie numai tipuri generale de cerinte relevante.
`.trim();
}

/* =========================================================
   PROMPT EXEMPLE
========================================================= */

function promptExemple(
  lectie,
  meta,
  teorie
) {
  const context = {
    obiective: meta.obiective,
    definitii: teorie.definitii,
    formule: teorie.formule,
    teorie: teorie.teorie.map(
      (sectiune) => ({
        titlu: sectiune.titlu,
        ideiCheie: sectiune.ideiCheie,
      })
    ),
  };

  return `
${blocCanonic(lectie)}

CONTEXT TEORETIC:

${JSON.stringify(
  context,
  null,
  2
)}

Genereaza EXACT 4 exemple rezolvate,
progresive si diferite.

Returneaza:

{
  "exempleRezolvate": [
    {
      "id": "...",
      "titlu": "...",
      "enunt": "...",
      "nivel": "fundament",
      "pasi": [
        {
          "numar": 1,
          "titlu": "...",
          "continut": "..."
        }
      ],
      "raspunsFinal": "...",
      "verificare": "..."
    }
  ]
}

REGULI:
- exact 4 exemple;
- minimum 2 pasi/exemplu;
- cel putin un exemplu fundament;
- cel putin doua exemple standard-bac;
- nivel permis:
  fundament
  standard-bac
  avansat;
- verificarea trebuie sa justifice rezultatul;
- evita calculele inutil de complicate.
`.trim();
}

/* =========================================================
   PROMPT EXERCITII
========================================================= */

function promptLotExercitii(
  lectie,
  meta,
  teorie,
  pedagogie,
  lot
) {
  const context = {
    obiective: meta.obiective,
    formule: teorie.formule,
    greseliFrecvente:
      pedagogie.greseliFrecvente,
  };

  const nivele =
    lot === 1
      ? [
          "fundament",
          "fundament",
          "standard-bac",
          "standard-bac",
        ]
      : [
          "standard-bac",
          "standard-bac",
          "avansat",
          "avansat",
        ];

  return `
${blocCanonic(lectie)}

CONTEXT:

${JSON.stringify(
  context,
  null,
  2
)}

Genereaza LOTUL ${lot}/2,
cu EXACT 4 exercitii.

Nivelurile dorite:

${JSON.stringify(
  nivele,
  null,
  2
)}

Returneaza:

{
  "exercitii": [
    {
      "id": "...",
      "nivel": "fundament",
      "tip": "alegere-multipla",
      "enunt": "...",
      "variante": [
        "...",
        "...",
        "...",
        "..."
      ],
      "raspunsCorect": "...",
      "rezolvare": [
        {
          "numar": 1,
          "titlu": "...",
          "continut": "..."
        }
      ],
      "explicatieFinala": "...",
      "punctaj": 1,
      "competenta": "..."
    }
  ]
}

TIPURI PERMISE:
- alegere-multipla
- raspuns-scurt
- rezolvare-completa

REGULI:
- exact 4 exercitii;
- FIECARE exercitiu, indiferent de tip, trebuie sa contina explicit campurile: id, nivel, tip, enunt, raspunsCorect, rezolvare, explicatieFinala, punctaj, competenta;
- raspunsCorect este OBLIGATORIU inclusiv pentru raspuns-scurt si rezolvare-completa;
- minimum 2 pasi de rezolvare;
- daca tip=alegere-multipla:
  exact 4 variante;
- la alegere-multipla,
  raspunsCorect trebuie sa fie IDENTIC
  cu una dintre variante;
- pentru alte tipuri,
  campul variante poate fi omis;
- id-urile lotului trebuie sa fie distincte;
- problemele trebuie sa poata fi verificate manual.
`.trim();
}

/* =========================================================
   VIDEO
========================================================= */

function rolVideo(numar) {
  if (numar === 1) {
    return (
      "Intuitie si concept. " +
      "Explica de ce apare notiunea si ce inseamna."
    );
  }

  if (numar === 2) {
    return (
      "Reguli si metoda. " +
      "Organizeaza pasii de lucru si conditiile importante."
    );
  }

  if (numar === 3) {
    return (
      "Exemplu complet. " +
      "Rezolva o problema pas cu pas si verifica rezultatul."
    );
  }

  return (
    "Aplicare tip Bac si greseli frecvente. " +
    "Consolideaza metoda si arata capcanele tipice."
  );
}

function promptVideo(
  lectie,
  meta,
  teorie,
  pedagogie,
  exemple,
  numar
) {
  const durata = numar === 1 ? 4 : 5;

  const context = {
    obiective: meta.obiective,
    termeniCheie: meta.termeniCheie,
    teorie: teorie.teorie.map(
      (sectiune) => ({
        titlu: sectiune.titlu,
        ideiCheie: sectiune.ideiCheie,
      })
    ),
    formule: teorie.formule,
    greseliFrecvente:
      pedagogie.greseliFrecvente,
    exempluModel:
      exemple.exempleRezolvate[
        Math.min(
          numar - 1,
          exemple.exempleRezolvate.length - 1
        )
      ],
  };

  return `
${blocCanonic(lectie)}

GENEREAZA VIDEO ${numar}/4.

ROL:
${rolVideo(numar)}

DURATA:
${durata} minute.

CONTEXT:

${JSON.stringify(
  context,
  null,
  2
)}

Returneaza EXACT:

{
  "video": {
    "id": "...",
    "numar": ${numar},
    "titlu": "...",
    "durataMinute": ${durata},
    "descriere": "...",

    "scenariu": [
      "paragraf 1",
      "paragraf 2"
    ],

    "ideiDeRetinut": [
      "...",
      "...",
      "..."
    ],

    "exemplu": {
      "titlu": "...",
      "enunt": "...",
      "rezolvareScurta": [
        "..."
      ],
      "raspuns": "..."
    },

    "verificareRapida": {
      "intrebare": "...",
      "variante": [
        "...",
        "...",
        "...",
        "..."
      ],
      "raspunsCorect": 0,
      "explicatie": "..."
    }
  }
}

REGULI:
- scenariul are OBLIGATORIU minimum
  ${VIDEO_MIN_CUVINTE[numar]}
  cuvinte si maximum
  ${VIDEO_MAX_CUVINTE[numar]}
  cuvinte;

TINTA PRACTICA DE LUNGIME:
- NU urmari minimul exact;
- scrie aproximativ
  ${Math.min(
    VIDEO_MIN_CUVINTE[numar] + 80,
    VIDEO_MAX_CUVINTE[numar] - 20
  )}
  cuvinte pentru scenariu;
- daca esti sub aceasta tinta, continua explicatia inainte de a inchide JSON-ul;
- scenariul este partea principala si trebuie sa fie substantial mai lung decat descrierea, exemplul si verificarea rapida;

STRUCTURA SCENARIULUI:
- minimum 10 paragrafe;
- fiecare paragraf trebuie sa dezvolte o idee reala, nu o singura propozitie scurta;
- explica pas cu pas;
- include tranzitii naturale intre idei;
- include cel putin un mini-exemplu explicat in interiorul scenariului;
- include o recapitulare la final;
- nu umple lungimea prin repetitii mecanice;

ALTE REGULI:
- limbaj natural pentru un elev;
- verificareRapida are exact 4 variante;
- raspunsCorect = index 0, 1, 2 sau 3;
- nu inventa un subiect oficial Bac;
- nu afirma ca exercitiul a aparut la examen.
`.trim();
}

/* =========================================================
   ASAMBLARE
========================================================= */

function asambleazaLectie({
  lectie,
  meta,
  teorie,
  pedagogie,
  exemple,
  exercitii1,
  exercitii2,
  videos,
}) {
  const clasaCanonica =
    esteText(lectie.clasa)
      ? lectie.clasa
      : meta.clasa;

  return {
    id: lectie.slug,
    slug: lectie.slug,
    modul: lectie.modul,
    numarLectie: lectie.numarLectie,
    clasa: clasaCanonica,
    profil: "M_mate-info",
    titlu: lectie.titlu,
    subtitlu: meta.subtitlu,
    descriere: meta.descriere,
    nivelPrincipal:
      meta.nivelPrincipal,
    durataEstimataMinute:
      meta.durataEstimataMinute,
    prerechizite:
      meta.prerechizite,
    obiective: meta.obiective,
    termeniCheie: meta.termeniCheie,
    videoLectii: videos.map(
      (element) => element.video
    ),
    definitii: teorie.definitii,
    teorie: teorie.teorie,
    formule: teorie.formule,
    exempleRezolvate:
      exemple.exempleRezolvate,
    greseliFrecvente:
      pedagogie.greseliFrecvente,
    exercitii: [
      ...exercitii1.exercitii,
      ...exercitii2.exercitii,
    ],
    rezumat: pedagogie.rezumat,
    legaturaCuBac:
      pedagogie.legaturaCuBac,
    surse: [
      {
        tip: "verificare-interna",
        titlu:
          "BAC MATE — draft generat local",
        observatie:
          "Continut generat local cu Ollama. Necesita verificare matematica, curriculara, lingvistica si a exercitiilor inainte de publicare.",
      },
    ],
    verificare: {
      status: "draft",
      verificatMatematic: false,
      verificatPrograma: false,
      verificatExercitii: false,
      verificatLimbaRomana: false,
      observatii: [
        "Draft generat de BAC MATE Generator Local V5.1.",
        "Modelul local este utilizat ca redactor pedagogic, nu ca sursa de adevar matematic.",
        "Publicarea este interzisa pana la trecerea verificarilor obligatorii.",
      ],
    },
  };
}

/* =========================================================
   VALIDARE FINALA
========================================================= */

function valideazaFinal(
  continut,
  lectie
) {
  const erori = [];

  if (continut.slug !== lectie.slug) {
    erori.push(
      "slug diferit de catalog"
    );
  }

  if (continut.id !== lectie.slug) {
    erori.push(
      "id diferit de slug-ul canonic"
    );
  }

  if (continut.modul !== lectie.modul) {
    erori.push(
      "modul diferit de catalog"
    );
  }

  if (
    continut.numarLectie !==
    lectie.numarLectie
  ) {
    erori.push(
      "numarLectie diferit de catalog"
    );
  }

  if (continut.titlu !== lectie.titlu) {
    erori.push(
      "titlu diferit de catalog"
    );
  }

  if (continut.profil !== "M_mate-info") {
    erori.push("profil invalid");
  }

  erori.push(
    ...valideazaMeta({
      clasa: continut.clasa,
      subtitlu: continut.subtitlu,
      descriere: continut.descriere,
      nivelPrincipal:
        continut.nivelPrincipal,
      durataEstimataMinute:
        continut.durataEstimataMinute,
      prerechizite:
        continut.prerechizite,
      obiective: continut.obiective,
      termeniCheie:
        continut.termeniCheie,
    })
  );

  erori.push(
    ...valideazaTeorie({
      definitii: continut.definitii,
      teorie: continut.teorie,
      formule: continut.formule,
    })
  );

  erori.push(
    ...valideazaPedagogie({
      greseliFrecvente:
        continut.greseliFrecvente,
      rezumat: continut.rezumat,
      legaturaCuBac:
        continut.legaturaCuBac,
    })
  );

  erori.push(
    ...valideazaExemple({
      exempleRezolvate:
        continut.exempleRezolvate,
    })
  );

  if (
    !Array.isArray(continut.exercitii) ||
    continut.exercitii.length !== 8
  ) {
    erori.push(
      "lectia trebuie sa aiba exact 8 exercitii"
    );
  } else {
    erori.push(
      ...valideazaLotExercitii({
        exercitii: continut.exercitii.slice(0, 4),
      }).map(
        (eroare) =>
          `lot exercitii A: ${eroare}`
      )
    );

    erori.push(
      ...valideazaLotExercitii({
        exercitii: continut.exercitii.slice(4, 8),
      }).map(
        (eroare) =>
          `lot exercitii B: ${eroare}`
      )
    );

    const iduri = new Set();

    for (
      const exercitiu of continut.exercitii
    ) {
      if (iduri.has(exercitiu.id)) {
        erori.push(
          `id exercitiu duplicat: ${exercitiu.id}`
        );
      }

      iduri.add(exercitiu.id);
    }
  }

  if (
    !Array.isArray(continut.videoLectii) ||
    continut.videoLectii.length !== 4
  ) {
    erori.push(
      "lectia trebuie sa aiba exact 4 videoLectii"
    );
  } else {
    continut.videoLectii.forEach(
      (video, index) => {
        erori.push(
          ...valideazaVideo(
            { video },
            index + 1
          )
        );
      }
    );
  }

  if (
    !Array.isArray(continut.surse) ||
    continut.surse.length < 1
  ) {
    erori.push("surse lipsa");
  }

  if (
    continut.surse?.some(
      (sursa) =>
        sursa.tip !== "verificare-interna"
    )
  ) {
    erori.push(
      "draft-ul local nu poate declara surse oficiale automat"
    );
  }

  const verificare = continut.verificare;

  if (!verificare) {
    erori.push(
      "verificare lipsa"
    );
  } else {
    if (verificare.status !== "draft") {
      erori.push(
        "status trebuie draft"
      );
    }

    if (
      verificare.verificatMatematic !== false
    ) {
      erori.push(
        "verificatMatematic trebuie false"
      );
    }

    if (
      verificare.verificatPrograma !== false
    ) {
      erori.push(
        "verificatPrograma trebuie false"
      );
    }

    if (
      verificare.verificatExercitii !== false
    ) {
      erori.push(
        "verificatExercitii trebuie false"
      );
    }

    if (
      verificare.verificatLimbaRomana !== false
    ) {
      erori.push(
        "verificatLimbaRomana trebuie false"
      );
    }
  }

  return erori;
}

/* =========================================================
   EXPORT NAME
========================================================= */

function numeExport(slug) {
  const parti = slug
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean);

  return (
    "continut" +
    parti
      .map(
        (parte) =>
          parte.charAt(0).toUpperCase() +
          parte.slice(1)
      )
      .join("")
  );
}

/* =========================================================
   TYPESCRIPT
========================================================= */

function serializeazaTypescript(
  continut,
  slug
) {
  return `import type { ContinutLectie } from "../tipuri";

export const ${numeExport(
    slug
  )}: ContinutLectie = ${JSON.stringify(
    continut,
    null,
    2
  )};
`;
}

/* =========================================================
   SCRIERE ATOMICA
========================================================= */

function scrieLectiaFinala(
  continut,
  lectie
) {
  asiguraDirector(DIRECTOR_LECTII);

  const destinatie = caleFinalaLectie(
    lectie.slug
  );

  if (exista(destinatie)) {
    throw new Error(
      `REFUZ SUPRASCRIERE: ${relativ(destinatie)}`
    );
  }

  const temporar = `${destinatie}.tmp`;

  const cod = serializeazaTypescript(
    continut,
    lectie.slug
  );

  fs.writeFileSync(
    temporar,
    cod,
    "utf8"
  );

  const verificareFisier =
    citesteText(temporar);

  const exportCorect =
    `export const ${numeExport(
      lectie.slug
    )}: ContinutLectie`;

  if (
    !verificareFisier.includes(
      exportCorect
    )
  ) {
    fs.rmSync(temporar, {
      force: true,
    });

    throw new Error(
      "Export TypeScript invalid."
    );
  }

  if (
    !verificareFisier.includes(
      `"slug": "${lectie.slug}"`
    )
  ) {
    fs.rmSync(temporar, {
      force: true,
    });

    throw new Error(
      "Slug-ul final nu este canonic."
    );
  }

  if (
    !verificareFisier.includes(
      `"status": "draft"`
    )
  ) {
    fs.rmSync(temporar, {
      force: true,
    });

    throw new Error(
      "Gate-ul draft lipseste."
    );
  }

  fs.renameSync(
    temporar,
    destinatie
  );

  return destinatie;
}

/* =========================================================
   GENERARE LECTIE
========================================================= */

async function genereazaLectie(
  lectie,
  argumente
) {
  if (argumente.restart) {
    console.log(
      "  ↻ --restart: checkpoint-urile lectiei sunt sterse."
    );

    stergeCheckpointuri(
      lectie.slug
    );
  }

  asiguraDirector(
    directorLectieGenerator(
      lectie.slug
    )
  );

  const meta = await obtineCheckpoint({
    lectie,
    argumente,
    nume: "01-meta",
    prompt: promptMeta(lectie),
    validator: valideazaMeta,
    numPredict: 1200,
  });

  const teorie = await obtineCheckpoint({
    lectie,
    argumente,
    nume: "02-teorie",
    prompt: promptTeorie(
      lectie,
      meta
    ),
    validator: valideazaTeorie,
    numPredict: 2200,
  });

  const pedagogie =
    await obtineCheckpoint({
      lectie,
      argumente,
      nume: "03-pedagogie",
      prompt: promptPedagogie(
        lectie,
        meta,
        teorie
      ),
      validator: valideazaPedagogie,
      numPredict: 1800,
    });

  const exemple =
    await obtineCheckpoint({
      lectie,
      argumente,
      nume: "04-exemple",
      prompt: promptExemple(
        lectie,
        meta,
        teorie
      ),
      validator: valideazaExemple,
      numPredict: 2300,
    });

  const exercitii1 =
    await obtineCheckpoint({
      lectie,
      argumente,
      nume: "05-exercitii-a",
      prompt: promptLotExercitii(
        lectie,
        meta,
        teorie,
        pedagogie,
        1
      ),
      validator: valideazaLotExercitii,
      numPredict: 2300,
    });

  const exercitii2 =
    await obtineCheckpoint({
      lectie,
      argumente,
      nume: "06-exercitii-b",
      prompt: promptLotExercitii(
        lectie,
        meta,
        teorie,
        pedagogie,
        2
      ),
      validator: valideazaLotExercitii,
      numPredict: 2300,
    });

  const videos = [];

  for (
    let numar = 1;
    numar <= 4;
    numar++
  ) {
    const video = await obtineCheckpoint({
      lectie,
      argumente,
      nume:
        `${String(numar + 6).padStart(
          2,
          "0"
        )}-video-${numar}`,
      prompt: promptVideo(
        lectie,
        meta,
        teorie,
        pedagogie,
        exemple,
        numar
      ),
      validator: (valoare) =>
        valideazaVideo(
          valoare,
          numar
        ),
      numPredict: 2500,
    });

    videos.push(video);
  }

  const continut = asambleazaLectie({
    lectie,
    meta,
    teorie,
    pedagogie,
    exemple,
    exercitii1,
    exercitii2,
    videos,
  });

  const eroriFinale = valideazaFinal(
    continut,
    lectie
  );

  if (eroriFinale.length > 0) {
    throw new Error(
      [
        "Validarea finala interna a esuat:",
        ...eroriFinale.map(
          (eroare) => `- ${eroare}`
        ),
      ].join("\n")
    );
  }

  scrieJson(
    path.join(
      directorLectieGenerator(
        lectie.slug
      ),
      "11-final-draft.json"
    ),
    continut
  );

  return scrieLectiaFinala(
    continut,
    lectie
  );
}

/* =========================================================
   MAIN
========================================================= */

async function main() {
  const argumente = citesteArgumente();

  titlu(
    "BAC MATE — Generator Local Content Engine V5.1"
  );

  console.log(
    `Model: ${argumente.model}`
  );

  console.log(
    `Ollama: ${OLLAMA_URL}`
  );

  console.log(
    `Thinking: ${THINK}`
  );

  console.log(
    `Context: ${NUM_CTX}`
  );

  console.log(
    "Transport: streaming nativ http/https"
  );

  console.log(
    "Checkpoint-uri: compatibile cu V4.2"
  );

  console.log(
    `Mod: ${
      argumente.dryRun
        ? "DRY RUN"
        : "GENERARE LOCALA"
    }`
  );

  const catalog = incarcaCatalogul();

  console.log(
    `Catalog canonic: ${catalog.length}`
  );

  console.log(
    "✓ Gate catalog 219/219"
  );

  const existente =
    obtineSluguriExistente();

  console.log(
    `Content Engine existent: ${existente.size}`
  );

  const selectate = selecteazaLectii(
    catalog,
    existente,
    argumente
  );

  titlu("Selectie");

  console.log(
    `Lectii selectate: ${selectate.length}`
  );

  for (const lectie of selectate) {
    console.log(
      `- Modul ${lectie.modul}, Lectia ${lectie.numarLectie}: ${lectie.slug}`
    );

    console.log(
      `  ${lectie.titlu}`
    );
  }

  if (argumente.dryRun) {
    console.log("");

    console.log(
      "DRY RUN: Ollama nu a fost apelat si nu s-a scris nicio lectie."
    );

    return;
  }

  if (selectate.length === 0) {
    console.log("");
    console.log(
      "Nu exista lectii selectate pentru generare."
    );
    return;
  }

  await verificaOllama(argumente.model);

  console.log(
    `✓ Ollama disponibil; model instalat: ${argumente.model}`
  );

  titlu("Generare");

  const rezultate = [];

  for (
    let index = 0;
    index < selectate.length;
    index++
  ) {
    const lectie = selectate[index];

    console.log("");

    console.log(
      `[${index + 1}/${selectate.length}] ${lectie.slug}`
    );

    try {
      const destinatie =
        await genereazaLectie(
          lectie,
          argumente
        );

      console.log("");

      console.log(
        `  ✓ DRAFT scris: ${relativ(destinatie)}`
      );

      console.log(
        "  ✓ status = draft"
      );

      console.log(
        "  ✓ verificatMatematic = false"
      );

      console.log(
        "  ✓ verificatPrograma = false"
      );

      console.log(
        "  ✓ verificatExercitii = false"
      );

      console.log(
        "  ✓ verificatLimbaRomana = false"
      );

      rezultate.push({
        slug: lectie.slug,
        status: "generat-draft",
        fisier: relativ(destinatie),
        generatLa: acum(),
      });
    } catch (eroare) {
      console.log("");

      console.error(
        `  ✗ EROARE: ${eroare.message}`
      );

      console.log("");

      console.log(
        "  Checkpoint-urile valide raman pe disc."
      );

      console.log(
        "  La urmatoarea rulare, generatorul continua de la primul checkpoint lipsa."
      );

      rezultate.push({
        slug: lectie.slug,
        status: "eroare",
        eroare: eroare.message,
        generatLa: acum(),
      });

      if (argumente.slug) {
        break;
      }
    }
  }

  scrieJson(
    CALE_RAPORT,
    {
      versiune:
        "BAC-MATE-GENERATOR-LOCAL-V5.1",
      generatLa: acum(),
      model: argumente.model,
      ollama: OLLAMA_URL,
      thinking: THINK,
      numCtx: NUM_CTX,
      transport:
        "streaming-nativ-http-https",
      checkpointCompatibil:
        "generator-local-v4-2",
      rezultate,
    }
  );

  titlu("Rezultat");

  const generate = rezultate.filter(
    (element) =>
      element.status === "generat-draft"
  ).length;

  const erori = rezultate.filter(
    (element) =>
      element.status === "eroare"
  ).length;

  console.log(
    `Generate draft: ${generate}`
  );

  console.log(
    `Erori: ${erori}`
  );

  console.log(
    `Raport: ${relativ(CALE_RAPORT)}`
  );

  console.log("");
  console.log("IMPORTANT:");
  console.log(
    "Continutul produs de Ollama este DRAFT."
  );
  console.log(
    "Nu este verificat matematic."
  );
  console.log(
    "Nu este verificat fata de programa."
  );
  console.log(
    "Nu este verificat integral la exercitii."
  );
  console.log(
    "Nu este verificat lingvistic."
  );
  console.log(
    "Nu este publicabil."
  );

  if (generate > 0) {
    console.log("");
    console.log(
      "Urmatorul gate obligatoriu:"
    );
    console.log(
      "npm.cmd run content:check"
    );
  }
}

/* =========================================================
   START
========================================================= */

main().catch((eroare) => {
  console.log("");
  console.error("✗ GENERATOR OPRIT");
  console.error(
    eroare?.stack ?? String(eroare)
  );
  process.exitCode = 1;
});