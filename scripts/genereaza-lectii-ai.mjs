import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import https from "node:https";

import {
  valideazaExercitiuPedagogic,
  valideazaSetExercitiiPedagogic,
} from "./exercise-qa.mjs";

import {
  valideazaExercitiuMatematic,
} from "./math-qa.mjs";

/* =========================================================
   BAC MATE — GENERATOR LOCAL CONTENT ENGINE V6.2

   PRINCIPII:
   - cost API 0
   - Ollama local + qwen3:8b
   - catalogul canonic stabileste identitatea lectiei
   - AI local = redactor, NU sursa de adevar matematic
   - continutul generat ramane DRAFT
   - checkpoint + resume
   - autoreparare inteligenta
   - Math QA + Exercise QA
   - protectie anti-duplicate
   - fara publicare automata
   - fara modificarea registrului
   - fara suprascriere nesigura
========================================================= */

const ROOT = process.cwd();

const DIRECTOR_CONTINUT = path.join(
  ROOT,
  "data",
  "continut"
);

const DIRECTOR_LECTII = path.join(
  DIRECTOR_CONTINUT,
  "lectii"
);

const CALE_CATALOG = path.join(
  DIRECTOR_CONTINUT,
  "catalog-content-engine.json"
);

/*
 * Pastram directorul vechi de checkpoint-uri.
 * Astfel nu pierdem checkpoint-urile valide deja generate.
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
  2: 425,
  3: 425,
  4: 425,
};

const VIDEO_MAX_CUVINTE = {
  1: 620,
  2: 720,
  3: 720,
  4: 720,
};

const VERSIUNE_GENERATOR = "6.2";

const NIVELURI_PERMISE = new Set([
  "fundament",
  "standard-bac",
  "avansat",
]);

const TIPURI_EXERCITII_PERMISE = new Set([
  "alegere-multipla",
  "raspuns-scurt",
  "rezolvare-completa",
]);

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
  return JSON.parse(
    citesteText(cale)
  );
}

function scrieJson(cale, valoare) {
  asiguraDirector(
    path.dirname(cale)
  );

  fs.writeFileSync(
    cale,
    JSON.stringify(
      valoare,
      null,
      2
    ) + "\n",
    "utf8"
  );
}

function acum() {
  return new Date().toISOString();
}

function relativ(cale) {
  return path.relative(
    ROOT,
    cale
  );
}

function asteapta(ms) {
  return new Promise(
    (resolve) =>
      setTimeout(resolve, ms)
  );
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
    .replace(
      /[\n\r\t]+/g,
      " "
    )
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
    replaceDraft: false,
    selfTest: false,
    validateCheckpoints: false,
    model: MODEL_IMPLICIT,
  };

  const argumente =
    process.argv.slice(2);

  for (const argument of argumente) {
    if (
      argument === "--dry-run"
    ) {
      rezultat.dryRun = true;
      continue;
    }

    if (
      argument === "--all"
    ) {
      rezultat.all = true;
      continue;
    }

    if (
      argument === "--restart"
    ) {
      rezultat.restart = true;
      continue;
    }

    if (
      argument === "--replace-draft"
    ) {
      rezultat.replaceDraft = true;
      continue;
    }

    if (
      argument === "--self-test"
    ) {
      rezultat.selfTest = true;
      continue;
    }

    if (
      argument ===
      "--validate-checkpoints"
    ) {
      rezultat.validateCheckpoints =
        true;
      continue;
    }

    if (
      argument.startsWith(
        "--limit="
      )
    ) {
      const valoare = Number(
        argument.slice(
          "--limit=".length
        )
      );

      if (
        !Number.isInteger(
          valoare
        ) ||
        valoare <= 0
      ) {
        throw new Error(
          "--limit trebuie sa fie numar intreg pozitiv."
        );
      }

      rezultat.limit = valoare;
      continue;
    }

    if (
      argument.startsWith(
        "--slug="
      )
    ) {
      const slug = argument
        .slice(
          "--slug=".length
        )
        .trim();

      if (!slug) {
        throw new Error(
          "--slug nu poate fi gol."
        );
      }

      rezultat.slug = slug;
      continue;
    }

    if (
      argument.startsWith(
        "--model="
      )
    ) {
      const model = argument
        .slice(
          "--model=".length
        )
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

  if (
    rezultat.all &&
    rezultat.limit
  ) {
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

  const document =
    citesteJson(CALE_CATALOG);

  if (
    !document ||
    !Array.isArray(
      document.lectii
    )
  ) {
    throw new Error(
      "catalog-content-engine.json nu contine array-ul lectii."
    );
  }

  const lectii =
    document.lectii;

  if (
    lectii.length !==
    NUMAR_LECTII_ASTEPTAT
  ) {
    throw new Error(
      `Catalog invalid: ${lectii.length}/${NUMAR_LECTII_ASTEPTAT}.`
    );
  }

  const slugs = new Set();
  const pozitii = new Set();

  for (const lectie of lectii) {
    if (
      !esteText(lectie.slug)
    ) {
      throw new Error(
        "Exista o lectie fara slug valid."
      );
    }

    if (
      !Number.isInteger(
        lectie.modul
      ) ||
      !Number.isInteger(
        lectie.numarLectie
      )
    ) {
      throw new Error(
        `Pozitie invalida: ${lectie.slug}`
      );
    }

    if (
      !esteText(lectie.titlu)
    ) {
      throw new Error(
        `Titlu invalid: ${lectie.slug}`
      );
    }

    if (
      slugs.has(lectie.slug)
    ) {
      throw new Error(
        `Slug duplicat: ${lectie.slug}`
      );
    }

    const pozitie =
      `${lectie.modul}:${lectie.numarLectie}`;

    if (
      pozitii.has(pozitie)
    ) {
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
  if (
    !exista(DIRECTOR_LECTII)
  ) {
    return new Set();
  }

  const fisiere =
    fs.readdirSync(
      DIRECTOR_LECTII
    );

  return new Set(
    fisiere
      .filter(
        (fisier) =>
          fisier.endsWith(".ts")
      )
      .map(
        (fisier) =>
          fisier.slice(0, -3)
      )
  );
}

/* =========================================================
   CAI CHECKPOINT / LECTIE
========================================================= */

function directorLectieGenerator(
  slug
) {
  return path.join(
    DIRECTOR_GENERATOR,
    slug
  );
}

function caleCheckpoint(
  slug,
  nume
) {
  return path.join(
    directorLectieGenerator(
      slug
    ),
    `${nume}.json`
  );
}

function caleFinalaLectie(slug) {
  return path.join(
    DIRECTOR_LECTII,
    `${slug}.ts`
  );
}

function stergeCheckpointuri(
  slug
) {
  const director =
    directorLectieGenerator(
      slug
    );

  if (exista(director)) {
    fs.rmSync(
      director,
      {
        recursive: true,
        force: true,
      }
    );
  }
}

/* =========================================================
   PROTECTIE DRAFT
========================================================= */

function esteDraftLocalInlocuibil(
  slug
) {
  const cale =
    caleFinalaLectie(slug);

  if (!exista(cale)) {
    return false;
  }

  const text =
    citesteText(cale);

  const areMarkerLocal =
    text.includes(
      "Draft generat de BAC MATE Generator Local"
    );

  const esteDraft =
    text.includes(
      '"status": "draft"'
    );

  const portiFalse = [
    '"verificatMatematic": false',
    '"verificatPrograma": false',
    '"verificatExercitii": false',
    '"verificatLimbaRomana": false',
  ].every(
    (fragment) =>
      text.includes(fragment)
  );

  return (
    areMarkerLocal &&
    esteDraft &&
    portiFalse
  );
}

/* =========================================================
   SELECTIE LECTII
========================================================= */

function selecteazaLectii(
  catalog,
  existente,
  argumente
) {
  if (argumente.slug) {
    const lectie =
      catalog.find(
        (element) =>
          element.slug ===
          argumente.slug
      );

    if (!lectie) {
      throw new Error(
        `Slug inexistent in catalog: ${argumente.slug}`
      );
    }

    if (
      existente.has(
        lectie.slug
      )
    ) {
      if (
        !argumente.replaceDraft
      ) {
        throw new Error(
          [
            `Lectia exista deja: ${lectie.slug}`,
            "Generatorul refuza suprascrierea implicita.",
            "Pentru un draft generat local, foloseste explicit --replace-draft.",
          ].join("\n")
        );
      }

      if (
        !esteDraftLocalInlocuibil(
          lectie.slug
        )
      ) {
        throw new Error(
          [
            `REFUZ INLOCUIRE: ${lectie.slug}`,
            "Fisierul existent nu este un draft local sigur de inlocuit.",
            "Nu sterge fisierul automat.",
          ].join("\n")
        );
      }
    }

    return [lectie];
  }

  const lipsa =
    catalog.filter(
      (lectie) =>
        !existente.has(
          lectie.slug
        )
    );

  if (argumente.all) {
    return lipsa;
  }

  if (argumente.limit) {
    return lipsa.slice(
      0,
      argumente.limit
    );
  }

  return lipsa.slice(0, 1);
}

/* =========================================================
   OLLAMA CHECK
========================================================= */

async function verificaOllama(
  model
) {
  let raspuns;

  try {
    raspuns = await fetch(
      `${OLLAMA_URL}/api/tags`,
      {
        signal:
          AbortSignal.timeout(
            10000
          ),
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

  const date =
    await raspuns.json();

  const modele =
    date.models ?? [];

  const instalat =
    modele.some(
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
   PARSARE JSON MODEL
========================================================= */

function parseazaJsonModel(
  continut
) {
  if (!esteText(continut)) {
    throw new Error(
      "Modelul a returnat content gol."
    );
  }

  let text =
    continut.trim();

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
    const inceput =
      text.indexOf("{");

    const sfarsit =
      text.lastIndexOf("}");

    if (
      inceput === -1 ||
      sfarsit === -1 ||
      sfarsit <= inceput
    ) {
      throw new Error(
        "Nu am gasit un obiect JSON valid in raspuns."
      );
    }

    const candidat =
      text.slice(
        inceput,
        sfarsit + 1
      );

    return JSON.parse(
      candidat
    );
  }
}

/* =========================================================
   OLLAMA STREAMING NATIV
========================================================= */

function apeleazaOllamaStreaming(
  payload
) {
  return new Promise(
    (resolve, reject) => {
      let url;

      try {
        url = new URL(
          "/api/chat",
          OLLAMA_URL
        );
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

      const corp =
        JSON.stringify(payload);

      const optiuni = {
        protocol: url.protocol,
        hostname: url.hostname,
        port:
          url.port ||
          (
            url.protocol ===
            "https:"
              ? 443
              : 80
          ),
        path:
          url.pathname +
          url.search,
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
          "Content-Length":
            Buffer.byteLength(
              corp
            ),
        },
      };

      let finalizat = false;

      const inchideCuEroare =
        (eroare) => {
          if (finalizat) {
            return;
          }

          finalizat = true;
          reject(eroare);
        };

      const req =
        transport.request(
          optiuni,
          (res) => {
            let buffer = "";
            let continut = "";
            let eroareApi = "";
            let chunkuri = 0;
            let ultimulProgres =
              Date.now();

            console.log(
              `  ↳ Ollama streaming conectat: HTTP ${res.statusCode}`
            );

            if (
              !res.statusCode ||
              res.statusCode < 200 ||
              res.statusCode >= 300
            ) {
              res.setEncoding(
                "utf8"
              );

              res.on(
                "data",
                (chunk) => {
                  eroareApi +=
                    chunk;
                }
              );

              res.on(
                "end",
                () => {
                  inchideCuEroare(
                    new Error(
                      `Ollama HTTP ${res.statusCode}: ${eroareApi.slice(0, 1000)}`
                    )
                  );
                }
              );

              return;
            }

            res.setEncoding(
              "utf8"
            );

            res.on(
              "data",
              (chunk) => {
                buffer += chunk;

                let pozitieLinieNoua;

                while (
                  (
                    pozitieLinieNoua =
                      buffer.indexOf(
                        "\n"
                      )
                  ) !== -1
                ) {
                  const linie =
                    buffer
                      .slice(
                        0,
                        pozitieLinieNoua
                      )
                      .trim();

                  buffer =
                    buffer.slice(
                      pozitieLinieNoua +
                        1
                    );

                  if (!linie) {
                    continue;
                  }

                  let eveniment;

                  try {
                    eveniment =
                      JSON.parse(
                        linie
                      );
                  } catch (
                    eroare
                  ) {
                    req.destroy(
                      new Error(
                        `Chunk Ollama invalid JSON: ${eroare.message}`
                      )
                    );
                    return;
                  }

                  if (
                    eveniment.error
                  ) {
                    req.destroy(
                      new Error(
                        `Ollama: ${eveniment.error}`
                      )
                    );
                    return;
                  }

                  if (
                    typeof eveniment
                      ?.message
                      ?.content ===
                    "string"
                  ) {
                    continut +=
                      eveniment
                        .message
                        .content;
                  }

                  chunkuri++;

                  const acumMs =
                    Date.now();

                  if (
                    acumMs -
                      ultimulProgres >=
                    10000
                  ) {
                    process.stdout.write(
                      "."
                    );
                    ultimulProgres =
                      acumMs;
                  }
                }
              }
            );

            res.on(
              "end",
              () => {
                if (finalizat) {
                  return;
                }

                if (
                  buffer.trim()
                ) {
                  try {
                    const eveniment =
                      JSON.parse(
                        buffer.trim()
                      );

                    if (
                      eveniment.error
                    ) {
                      inchideCuEroare(
                        new Error(
                          `Ollama: ${eveniment.error}`
                        )
                      );
                      return;
                    }

                    if (
                      typeof eveniment
                        ?.message
                        ?.content ===
                      "string"
                    ) {
                      continut +=
                        eveniment
                          .message
                          .content;
                    }
                  } catch (
                    eroare
                  ) {
                    inchideCuEroare(
                      new Error(
                        `Ultimul chunk Ollama este invalid JSON: ${eroare.message}`
                      )
                    );
                    return;
                  }
                }

                if (
                  chunkuri > 0
                ) {
                  process.stdout.write(
                    "\n"
                  );
                }

                if (
                  !esteText(
                    continut
                  )
                ) {
                  inchideCuEroare(
                    new Error(
                      "Ollama a terminat streaming-ul fara message.content."
                    )
                  );
                  return;
                }

                finalizat = true;
                resolve(continut);
              }
            );

            res.on(
              "error",
              (eroare) => {
                inchideCuEroare(
                  eroare
                );
              }
            );
          }
        );

      req.setTimeout(
        TIMEOUT_APEL_MS,
        () => {
          req.destroy(
            new Error(
              `Timeout Ollama dupa ${Math.round(
                TIMEOUT_APEL_MS /
                  60000
              )} minute.`
            )
          );
        }
      );

      req.on(
        "error",
        (eroare) => {
          inchideCuEroare(
            eroare
          );
        }
      );

      req.write(corp);
      req.end();
    }
  );
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
    incercare <=
    MAX_INCERCARI_HTTP;
    incercare++
  ) {
    try {
      const continut =
        await apeleazaOllamaStreaming(
          {
            model,
            stream: true,
            think: THINK,
            format: "json",
            keep_alive: "30m",
            options: {
              temperature,
              top_p: 0.9,
              repeat_penalty:
                1.08,
              num_ctx: NUM_CTX,
              num_predict:
                numPredict,
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
          }
        );

      return parseazaJsonModel(
        continut
      );
    } catch (eroare) {
      ultimaEroare = eroare;

      console.log(
        `  ⚠ HTTP/stream ${incercare}/${MAX_INCERCARI_HTTP}: ${eroare.message}`
      );

      if (
        incercare <
        MAX_INCERCARI_HTTP
      ) {
        console.log(
          `  Astept ${PAUZA_RETRY_MS / 1000} secunde...`
        );

        await asteapta(
          PAUZA_RETRY_MS
        );
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
    "Inainte de raspuns verifica intern calculele simple.",
    "La grile trebuie sa existe o singura varianta matematic corecta.",
  ].join(" ");
}

/* =========================================================
   CONTEXT CANONIC
========================================================= */

function contextCanonic(
  lectie
) {
  return {
    slug: lectie.slug,
    modul: lectie.modul,
    numarLectie:
      lectie.numarLectie,
    titlu: lectie.titlu,
    profil: "M_mate-info",
    clasa:
      lectie.clasa ?? null,
    numeModul:
      lectie.numeModul ??
      null,
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
   AUTOREPARARE V6.2
========================================================= */

function instructiuniAutoreparare(
  nume,
  erori
) {
  const esteLotExercitii =
    nume === "05-exercitii-a" ||
    nume === "06-exercitii-b";

  const reguli = [
    "Raspunsul anterior a fost respins de validator.",
    "Returneaza din nou obiectul JSON COMPLET, nu doar partea modificata.",
    "Nu explica modificarile.",
    "Nu folosi Markdown.",
    "Nu folosi blocuri de cod.",
    "Nu adauga text inainte sau dupa JSON.",
    "Trateaza TOATE erorile validatorului ca obligatorii.",
    "Nu elimina campuri pentru a evita o eroare.",
    "Nu redenumi campurile.",
    "Nu schimba tipurile valorilor cerute de schema.",
    "Raspunsul trebuie sa poata fi parsata direct cu JSON.parse.",
  ];

  /*
   * =======================================================
   * AUTOREPARARE EXERCITII
   * =======================================================
   */

  if (esteLotExercitii) {
    reguli.push(
      "",
      "SCHEMA OBLIGATORIE PENTRU ACEASTA REPARARE:",
      "Obiectul radacina trebuie sa aiba EXACT forma:",
      '{ "exercitii": [ ...exact 4 exercitii... ] }',
      "",
      "FIECARE dintre cele 4 exercitii trebuie sa contina OBLIGATORIU toate campurile:",
      "- id: string nevid",
      "- nivel: exact unul dintre \"fundament\", \"standard-bac\", \"avansat\"",
      "- tip: exact unul dintre \"alegere-multipla\", \"raspuns-scurt\", \"rezolvare-completa\"",
      "- enunt: string nevid si complet",
      "- variante: array",
      "- raspunsCorect: string nevid",
      "- rezolvare: array cu minimum 2 obiecte",
      "- explicatieFinala: string nevid",
      "- competenta: string nevid",
      "- punctaj: numar pozitiv",
      "",
      "FIECARE pas din rezolvare trebuie sa aiba EXACT aceste campuri obligatorii:",
      "- numar: numar intreg pozitiv, de exemplu 1, 2, 3",
      "- titlu: string nevid",
      "- continut: string nevid",
      "",
      "MODEL DE STRUCTURA. COPIAZA STRUCTURA, NU CONTINUTUL MATEMATIC:",
      "{",
      '  "exercitii": [',
      "    {",
      '      "id": "exercitiu-1",',
      '      "nivel": "fundament",',
      '      "tip": "raspuns-scurt",',
      '      "enunt": "ENUNT COMPLET AICI",',
      '      "variante": [],',
      '      "raspunsCorect": "RASPUNS AICI",',
      '      "rezolvare": [',
      "        {",
      '          "numar": 1,',
      '          "titlu": "Primul pas",',
      '          "continut": "Explicatia primului pas."',
      "        },",
      "        {",
      '          "numar": 2,',
      '          "titlu": "Al doilea pas",',
      '          "continut": "Explicatia celui de-al doilea pas."',
      "        }",
      "      ],",
      '      "explicatieFinala": "Explicatie finala completa.",',
      '      "competenta": "Competenta matematica verificata.",',
      '      "punctaj": 5',
      "    }",
      "  ]",
      "}",
      "",
      "ATENTIE: modelul de mai sus arata doar structura unui exercitiu.",
      "Raspunsul real trebuie sa contina EXACT 4 exercitii complete.",
      "",
      "REGULI PENTRU CELE 4 EXERCITII:",
      "- Pastreaza EXACT 4 exercitii.",
      "- Toate cele 4 trebuie sa respecte schema completa de mai sus.",
      "- Nu omite id.",
      "- Nu omite nivel.",
      "- Nu omite tip.",
      "- Nu omite enunt.",
      "- Nu omite variante.",
      "- Nu omite raspunsCorect.",
      "- Nu omite rezolvare.",
      "- Nu omite explicatieFinala.",
      "- Nu omite competenta.",
      "- Nu omite punctaj.",
      "- Fiecare rezolvare trebuie sa aiba minimum 2 pasi reali.",
      "- Fiecare pas trebuie sa contina numar, titlu si continut.",
      "- punctaj trebuie sa fie NUMAR, nu text.",
      "- raspunsCorect trebuie sa fie STRING nevid.",
      "",
      "REGULI PENTRU ALEGERE MULTIPLA:",
      "- Daca tip este \"alegere-multipla\", variante trebuie sa contina EXACT 4 stringuri.",
      "- Cele 4 variante trebuie sa fie distincte textual si matematic.",
      "- Trebuie sa existe EXACT O SINGURA varianta matematic corecta.",
      "- raspunsCorect trebuie sa fie IDENTIC cu una dintre cele 4 variante.",
      "- Verifica matematic toate cele 4 variante.",
      "",
      "REGULI PENTRU CELELALTE TIPURI:",
      "- Daca tip NU este \"alegere-multipla\", variante trebuie sa fie [].",
      "- Chiar si pentru raspuns-scurt, rezolvare trebuie sa contina minimum 2 pasi reali.",
      "",
      "REGULI DE AUTOSUFICIENTA:",
      "- Exercitiul trebuie rezolvat complet numai din enunt.",
      "- Nu presupune existenta unei imagini.",
      "- Nu presupune existenta unei axe desenate.",
      "- Nu presupune existenta unui grafic.",
      "- Nu presupune existenta unei figuri.",
      "- Nu presupune existenta unei diagrame.",
      "- Nu presupune existenta unui tabel absent.",
      "- Daca exercitiul anterior depindea de suport vizual absent, abandoneaza acea constructie si creeaza un exercitiu complet textual.",
      "",
      "REGULI DE DIVERSITATE:",
      "- Cele 4 exercitii trebuie sa testeze sarcini matematice distincte.",
      "- Nu duplica semantic un exercitiu schimband doar numerele.",
      "- Nu duplica semantic un exercitiu schimband doar formularea.",
      "- Nu transforma aceeasi problema in alt tip de raspuns pentru a o prezenta drept exercitiu nou.",
      "",
      "REGULA DE SIGURANTA:",
      "- Daca o constructie matematica este incerta, inlocuieste-o cu una mai simpla si verificabila.",
      "- Nu incerca sa salvezi o constructie respinsa daca exista riscul sa repeti eroarea."
    );
  }

  const textErori =
    erori
      .map(
        (eroare) =>
          String(eroare)
            .toLowerCase()
      )
      .join("\n");

  /*
   * =======================================================
   * CORECTII SPECIFICE EXERCITII
   * =======================================================
   */

  if (
    textErori.includes(
      "variante duplicate"
    )
  ) {
    reguli.push(
      "",
      "CORECTIE OBLIGATORIE — VARIANTE DUPLICATE:",
      "- Nu reutiliza variantele respinse.",
      "- Genereaza 4 variante noi.",
      "- Dupa trim si lowercase, toate cele 4 trebuie sa ramana diferite.",
      "- Verifica si ca nu sunt matematic echivalente.",
      "- Exact una trebuie sa fie corecta.",
      "- raspunsCorect trebuie copiat IDENTIC din varianta corecta."
    );
  }

  if (
    textErori.includes(
      "minimum 2 pasi"
    )
  ) {
    reguli.push(
      "",
      "CORECTIE OBLIGATORIE — REZOLVARE:",
      "- Exercitiul afectat trebuie sa primeasca minimum doi pasi matematici distincti.",
      "- Nu imparti artificial aceeasi propozitie in doi pasi.",
      "- Fiecare pas trebuie sa aiba numar numeric, titlu si continut.",
      "- Primul pas trebuie sa aiba numar 1, al doilea numar 2."
    );
  }

  if (
    textErori.includes(
      "suport vizual"
    ) ||
    textErori.includes(
      "imagine"
    ) ||
    textErori.includes(
      "grafic"
    ) ||
    textErori.includes(
      "figura"
    ) ||
    textErori.includes(
      "diagrama"
    )
  ) {
    reguli.push(
      "",
      "CORECTIE OBLIGATORIE — SUPORT VIZUAL ABSENT:",
      "- Nu incerca sa reformulezi superficial exercitiul respins.",
      "- Inlocuieste complet exercitiul cu unul textual.",
      "- Toate intervalele, numerele si conditiile necesare trebuie scrise explicit in enunt.",
      "- Elevul trebuie sa poata rezolva exercitiul fara sa vada nicio imagine."
    );
  }

  if (
    textErori.includes(
      ".id:"
    )
  ) {
    reguli.push(
      "",
      "CORECTIE OBLIGATORIE — ID:",
      "- Fiecare exercitiu trebuie sa aiba id string nevid.",
      "- Nu omite campul id."
    );
  }

  if (
    textErori.includes(
      ".nivel:"
    )
  ) {
    reguli.push(
      "",
      "CORECTIE OBLIGATORIE — NIVEL:",
      "- nivel trebuie sa fie exact \"fundament\", \"standard-bac\" sau \"avansat\".",
      "- Nu folosi alte valori."
    );
  }

  if (
    textErori.includes(
      "raspunscorect"
    )
  ) {
    reguli.push(
      "",
      "CORECTIE OBLIGATORIE — RASPUNS CORECT:",
      "- raspunsCorect trebuie sa fie string nevid.",
      "- Verifica raspunsul matematic.",
      "- Pentru alegere-multipla, raspunsCorect trebuie sa fie IDENTIC cu una dintre variante."
    );
  }

  if (
    textErori.includes(
      "explicatiefinala"
    )
  ) {
    reguli.push(
      "",
      "CORECTIE OBLIGATORIE — EXPLICATIE FINALA:",
      "- Fiecare exercitiu trebuie sa contina explicatieFinala ca string nevid."
    );
  }

  if (
    textErori.includes(
      "competenta"
    )
  ) {
    reguli.push(
      "",
      "CORECTIE OBLIGATORIE — COMPETENTA:",
      "- Fiecare exercitiu trebuie sa contina competenta ca string nevid."
    );
  }

  if (
    textErori.includes(
      "punctaj"
    )
  ) {
    reguli.push(
      "",
      "CORECTIE OBLIGATORIE — PUNCTAJ:",
      "- Fiecare exercitiu trebuie sa contina punctaj ca NUMAR pozitiv.",
      "- Foloseste 5 daca nu exista un motiv pedagogic pentru alta valoare."
    );
  }

  if (
    textErori.includes(
      ".numar:"
    )
  ) {
    reguli.push(
      "",
      "CORECTIE OBLIGATORIE — NUMAR PAS:",
      "- Fiecare obiect din rezolvare trebuie sa contina campul numar.",
      "- numar trebuie sa fie numeric, nu string.",
      "- Numeroteaza pasii 1, 2, 3 etc."
    );
  }

  /*
   * =======================================================
   * CORECTIE SPECIFICA VIDEO PREA SCURT — V6.2
   * =======================================================
   */

  const areScenariuPreaScurt =
    erori.some(
      (eroare) =>
        String(eroare)
          .toLowerCase()
          .includes(
            "scenariu: prea scurt"
          )
    );

  if (areScenariuPreaScurt) {
    reguli.push(
      "",
      "CORECTIE OBLIGATORIE — SCENARIU VIDEO PREA SCURT:",
      "- Validatorul a respins scenariul deoarece are prea putine cuvinte.",
      "- Pastreaza schema JSON completa a video-ului.",
      "- Nu returna doar scenariul.",
      "- Nu elimina niciun camp obligatoriu al video-ului.",
      "- Rescrie si EXTINDE scenariul substantial.",
      "- Tinteste intentionat aproximativ 500 de cuvinte pentru scenariu, astfel incat sa existe marja peste pragul minim.",
      "- Nu te opri imediat ce crezi ca ai atins limita minima.",
      "- scenariu trebuie sa ramana array de paragrafe string.",
      "- Foloseste minimum 10 paragrafe.",
      "- Adauga explicatii pedagogice utile, nu repetitii artificiale.",
      "- Extinde explicarea regulilor, rationamentul pas cu pas, verificarea rezultatului, intuitia si greselile frecvente atunci cand sunt relevante.",
      "- Nu modifica adevarul matematic doar pentru a lungi textul.",
      "- Nu inventa formule, reguli sau rezultate.",
      "- Nu elimina exemplul.",
      "- Nu elimina verificareRapida.",
      "- Nu elimina ideiDeRetinut.",
      "- Pastreaza numarul video corect.",
      "- Pastreaza durataMinute ceruta de schema initiala.",
      "- Returneaza obiectul JSON COMPLET al video-ului."
    );
  }

  /*
   * =======================================================
   * ERORI EXACTE + CONTROL FINAL
   * =======================================================
   */

  reguli.push(
    "",
    "ERORILE EXACTE RAPORTATE DE VALIDATOR:",
    ...erori.map(
      (eroare) =>
        `- ${eroare}`
    ),
    "",
    "INAINTE SA RASPUNZI:",
    "- Verifica faptul ca obiectul radacina respecta schema.",
    "- Verifica faptul ca toate campurile obligatorii exista.",
    "- Verifica tipurile campurilor.",
    "- Verifica matematica.",
    "- Verifica rezolvarile.",
    "- Verifica variantele.",
    "- Daca este video, verifica lungimea scenariului si toate campurile video.",
    "- Verifica faptul ca raspunsul este JSON valid.",
    "- Returneaza numai obiectul JSON complet."
  );

  return reguli.join("\n");
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
  const cale =
    caleCheckpoint(
      lectie.slug,
      nume
    );

  if (exista(cale)) {
    try {
      const existent =
        citesteJson(cale);

      const erori =
        validator(existent);

      if (
        erori.length === 0
      ) {
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

    fs.rmSync(
      cale,
      {
        force: true,
      }
    );
  }

  let ultimeErori = [];
  let promptCurent = prompt;

  for (
    let incercare = 1;
    incercare <=
    MAX_INCERCARI_STRUCTURA;
    incercare++
  ) {
    console.log(
      `  → ${nume}: ${argumente.model} (${incercare}/${MAX_INCERCARI_STRUCTURA})...`
    );

    const rezultat =
      await cereJsonDeLaOllama({
        model:
          argumente.model,
        sistem:
          mesajSistem(),
        prompt:
          promptCurent,
        numPredict,
      });

    const erori =
      validator(rezultat);

    if (
      erori.length === 0
    ) {
      scrieJson(
        cale,
        rezultat
      );

      console.log(
        `  ✓ ${nume}: checkpoint salvat.`
      );

      return rezultat;
    }

    ultimeErori = erori;

    console.log(
      `  ⚠ ${nume}: structura respinsa.`
    );

    for (
      const eroare of erori
    ) {
      console.log(
        `    - ${eroare}`
      );
    }

    const caleRespins =
      path.join(
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
      incercare <
      MAX_INCERCARI_STRUCTURA
    ) {
      promptCurent = `
${prompt}

RASPUNSUL ANTERIOR A FOST RESPINS DE VALIDATOR.

ERORI EXACTE:

${erori
  .map(
    (eroare) =>
      `- ${eroare}`
  )
  .join("\n")}

CORECTEAZA TOATE ERORILE.

REGULI OBLIGATORII PENTRU REINCERCARE:

${instructiuniAutoreparare(
  nume,
  erori
)}
`.trim();

      console.log(
        "  ↻ V6.2 reconstruieste continutul afectat folosind erorile validatorului."
      );
    }
  }

  throw new Error(
    [
      `Checkpoint invalid: ${nume}`,
      ...ultimeErori.map(
        (eroare) =>
          `- ${eroare}`
      ),
    ].join("\n")
  );
}
/* =========================================================
   CONTRACT STRUCTURAL COMUN
========================================================= */

function valideazaPasi(pasi, eticheta, minim = 1) {
  const erori = [];

  if (
    !Array.isArray(pasi) ||
    pasi.length < minim
  ) {
    return [
      `${eticheta}: minimum ${minim} pasi`,
    ];
  }

  const numere = new Set();

  pasi.forEach((pas, index) => {
    if (!pas || typeof pas !== "object") {
      erori.push(
        `${eticheta}.pasi[${index}]: obiect invalid`
      );
      return;
    }

    if (!Number.isInteger(pas.numar)) {
      erori.push(
        `${eticheta}.pasi[${index}].numar: lipsa sau invalid`
      );
    } else {
      if (numere.has(pas.numar)) {
        erori.push(
          `${eticheta}.pasi[${index}].numar: duplicat (${pas.numar})`
        );
      }

      numere.add(pas.numar);
    }

    if (!esteText(pas.titlu)) {
      erori.push(
        `${eticheta}.pasi[${index}].titlu: lipsa sau invalid`
      );
    }

    if (!esteText(pas.continut)) {
      erori.push(
        `${eticheta}.pasi[${index}].continut: lipsa sau invalid`
      );
    }
  });

  return erori;
}

function varianteNormalizateUnice(variante) {
  if (!Array.isArray(variante)) {
    return false;
  }

  const normalizate = variante.map(
    (varianta) =>
      String(varianta)
        .trim()
        .toLowerCase()
  );

  return (
    new Set(normalizate).size ===
    normalizate.length
  );
}

function continePlaceholder(valoare) {
  const expresii = [
    "todo",
    "tbd",
    "placeholder",
    "de completat",
    "urmează completarea",
    "urmeaza completarea",
    "lorem ipsum",
  ];

  const texte = [];

  function parcurge(x) {
    if (typeof x === "string") {
      texte.push(x.toLowerCase());
      return;
    }

    if (Array.isArray(x)) {
      x.forEach(parcurge);
      return;
    }

    if (x && typeof x === "object") {
      Object.values(x).forEach(parcurge);
    }
  }

  parcurge(valoare);

  return texte.some((text) =>
    expresii.some((expresie) =>
      text.includes(expresie)
    )
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
    !Array.isArray(x.definitii) ||
    x.definitii.length < 2
  ) {
    erori.push(
      "definitii: minimum 2"
    );
  }

  if (
    !Array.isArray(x.teorie) ||
    x.teorie.length < 3
  ) {
    erori.push(
      "teorie: minimum 3 sectiuni"
    );
  }

  if (!Array.isArray(x.formule)) {
    erori.push(
      "formule: trebuie array"
    );
  }

  (x.definitii ?? []).forEach(
    (definitie, index) => {
      if (!esteText(definitie?.termen)) {
        erori.push(
          `definitii[${index}].termen: lipsa sau invalid`
        );
      }

      if (!esteText(definitie?.definitie)) {
        erori.push(
          `definitii[${index}].definitie: lipsa sau invalid`
        );
      }

      if (
        definitie?.observatie !== undefined &&
        !esteText(definitie.observatie)
      ) {
        erori.push(
          `definitii[${index}].observatie: invalid`
        );
      }
    }
  );

  const iduriTeorie = new Set();

  (x.teorie ?? []).forEach(
    (sectiune, index) => {
      const baza = `teorie[${index}]`;

      if (!esteText(sectiune?.id)) {
        erori.push(
          `${baza}.id: lipsa sau invalid`
        );
      } else if (
        iduriTeorie.has(sectiune.id)
      ) {
        erori.push(
          `${baza}.id: duplicat (${sectiune.id})`
        );
      } else {
        iduriTeorie.add(sectiune.id);
      }

      if (!esteText(sectiune?.titlu)) {
        erori.push(
          `${baza}.titlu: lipsa sau invalid`
        );
      }

      if (!esteText(sectiune?.explicatie)) {
        erori.push(
          `${baza}.explicatie: lipsa sau invalid`
        );
      }

      if (
        !Array.isArray(
          sectiune?.ideiCheie
        ) ||
        sectiune.ideiCheie.length < 2 ||
        sectiune.ideiCheie.some(
          (idee) => !esteText(idee)
        )
      ) {
        erori.push(
          `${baza}.ideiCheie: minimum 2 texte valide`
        );
      }
    }
  );

  const iduriFormule = new Set();

  (x.formule ?? []).forEach(
    (formula, index) => {
      const baza = `formule[${index}]`;

      if (!esteText(formula?.id)) {
        erori.push(
          `${baza}.id: lipsa sau invalid`
        );
      } else if (
        iduriFormule.has(formula.id)
      ) {
        erori.push(
          `${baza}.id: duplicat (${formula.id})`
        );
      } else {
        iduriFormule.add(formula.id);
      }

      for (const [camp, valoare] of [
        ["nume", formula?.nume],
        ["formula", formula?.formula],
        ["explicatie", formula?.explicatie],
      ]) {
        if (!esteText(valoare)) {
          erori.push(
            `${baza}.${camp}: lipsa sau invalid`
          );
        }
      }

      if (
        formula?.conditii !== undefined &&
        (
          !Array.isArray(formula.conditii) ||
          formula.conditii.some(
            (item) => !esteText(item)
          )
        )
      ) {
        erori.push(
          `${baza}.conditii: invalid`
        );
      }

      if (
        formula?.exempluScurt !== undefined &&
        !esteText(formula.exempluScurt)
      ) {
        erori.push(
          `${baza}.exempluScurt: invalid`
        );
      }
    }
  );

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
    !Array.isArray(x.greseliFrecvente) ||
    x.greseliFrecvente.length < 4
  ) {
    erori.push(
      "greseliFrecvente: minimum 4 elemente"
    );
  }

  (x.greseliFrecvente ?? []).forEach(
    (greseala, index) => {
      for (const [camp, valoare] of [
        ["greseala", greseala?.greseala],
        ["deCeEsteGresit", greseala?.deCeEsteGresit],
        ["cumOEviti", greseala?.cumOEviti],
      ]) {
        if (!esteText(valoare)) {
          erori.push(
            `greseliFrecvente[${index}].${camp}: lipsa sau invalid`
          );
        }
      }
    }
  );

  const rezumat = x.rezumat;

  if (!rezumat || typeof rezumat !== "object") {
    erori.push(
      "rezumat: obiect lipsa"
    );
  } else {
    if (
      !Array.isArray(
        rezumat.ideiDeRetinut
      ) ||
      rezumat.ideiDeRetinut.length < 4 ||
      rezumat.ideiDeRetinut.some(
        (idee) => !esteText(idee)
      )
    ) {
      erori.push(
        "rezumat.ideiDeRetinut: minimum 4 texte valide"
      );
    }

    if (
      !Array.isArray(
        rezumat.formuleDeRetinut
      ) ||
      rezumat.formuleDeRetinut.some(
        (formula) => !esteText(formula)
      )
    ) {
      erori.push(
        "rezumat.formuleDeRetinut: array de texte invalid"
      );
    }

    if (
      !Array.isArray(
        rezumat.checklistElev
      ) ||
      rezumat.checklistElev.length < 4 ||
      rezumat.checklistElev.some(
        (item) => !esteText(item)
      )
    ) {
      erori.push(
        "rezumat.checklistElev: minimum 4 texte valide"
      );
    }
  }

  const legatura = x.legaturaCuBac;

  if (
    !legatura ||
    typeof legatura !== "object"
  ) {
    erori.push(
      "legaturaCuBac: obiect lipsa"
    );
  } else {
    if (
      !esteText(
        legatura.importanta
      )
    ) {
      erori.push(
        "legaturaCuBac.importanta: lipsa sau invalid"
      );
    }

    if (
      !Array.isArray(
        legatura.tipuriCerinte
      ) ||
      legatura.tipuriCerinte.length < 1 ||
      legatura.tipuriCerinte.some(
        (item) => !esteText(item)
      )
    ) {
      erori.push(
        "legaturaCuBac.tipuriCerinte: minimum 1 text valid"
      );
    }

    if (
      !Array.isArray(
        legatura.strategie
      ) ||
      legatura.strategie.length < 1 ||
      legatura.strategie.some(
        (item) => !esteText(item)
      )
    ) {
      erori.push(
        "legaturaCuBac.strategie: minimum 1 text valid"
      );
    }
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
      "exempleRezolvate: trebuie exact 4"
    ];
  }

  const erori = [];
  const iduri = new Set();

  x.exempleRezolvate.forEach(
    (exemplu, index) => {
      const baza =
        `exempleRezolvate[${index}]`;

      if (!esteText(exemplu?.id)) {
        erori.push(
          `${baza}.id: lipsa sau invalid`
        );
      } else if (
        iduri.has(exemplu.id)
      ) {
        erori.push(
          `${baza}.id: duplicat (${exemplu.id})`
        );
      } else {
        iduri.add(exemplu.id);
      }

      for (const [camp, valoare] of [
        ["titlu", exemplu?.titlu],
        ["enunt", exemplu?.enunt],
        ["raspunsFinal", exemplu?.raspunsFinal],
      ]) {
        if (!esteText(valoare)) {
          erori.push(
            `${baza}.${camp}: lipsa sau invalid`
          );
        }
      }

      if (
        exemplu?.verificare !== undefined &&
        !esteText(
          exemplu.verificare
        )
      ) {
        erori.push(
          `${baza}.verificare: invalid`
        );
      }

      if (
        !NIVELURI_PERMISE.has(
          exemplu?.nivel
        )
      ) {
        erori.push(
          `${baza}.nivel: invalid`
        );
      }

      erori.push(
        ...valideazaPasi(
          exemplu?.pasi,
          baza,
          2
        )
      );
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
      "exercitii: lotul trebuie sa contina exact 4"
    ];
  }

  const erori = [];
  const iduri = new Set();

  x.exercitii.forEach(
    (exercitiu, index) => {
      const baza =
        `exercitii[${index}]`;

      if (
        !esteText(
          exercitiu?.id
        )
      ) {
        erori.push(
          `${baza}.id: lipsa sau invalid`
        );
      } else if (
        iduri.has(
          exercitiu.id
        )
      ) {
        erori.push(
          `${baza}.id: duplicat (${exercitiu.id})`
        );
      } else {
        iduri.add(
          exercitiu.id
        );
      }

      if (
        !NIVELURI_PERMISE.has(
          exercitiu?.nivel
        )
      ) {
        erori.push(
          `${baza}.nivel: invalid`
        );
      }

      if (
        !TIPURI_EXERCITII_PERMISE.has(
          exercitiu?.tip
        )
      ) {
        erori.push(
          `${baza}.tip: invalid`
        );
      }

      for (
        const [
          camp,
          valoare,
        ] of [
          [
            "enunt",
            exercitiu?.enunt,
          ],
          [
            "raspunsCorect",
            exercitiu?.raspunsCorect,
          ],
          [
            "explicatieFinala",
            exercitiu?.explicatieFinala,
          ],
          [
            "competenta",
            exercitiu?.competenta,
          ],
        ]
      ) {
        if (!esteText(valoare)) {
          erori.push(
            `${baza}.${camp}: lipsa sau invalid`
          );
        }
      }

      erori.push(
        ...valideazaPasi(
          exercitiu?.rezolvare,
          `${baza}.rezolvare`,
          2
        )
      );

      if (
        !Number.isFinite(
          exercitiu?.punctaj
        ) ||
        exercitiu.punctaj <= 0
      ) {
        erori.push(
          `${baza}.punctaj: invalid`
        );
      }

      if (
        exercitiu?.tip ===
        "alegere-multipla"
      ) {
        if (
          !Array.isArray(
            exercitiu.variante
          ) ||
          exercitiu.variante.length !== 4 ||
          exercitiu.variante.some(
            (varianta) =>
              !esteText(varianta)
          )
        ) {
          erori.push(
            `${baza}.variante: alegere-multipla necesita exact 4 texte valide`
          );
        } else {
          if (
            !varianteNormalizateUnice(
              exercitiu.variante
            )
          ) {
            erori.push(
              `${baza}.variante: variante duplicate`
            );
          }

          const raspuns =
            String(
              exercitiu.raspunsCorect ??
                ""
            )
              .trim()
              .toLowerCase();

          const raspunsExista =
            exercitiu.variante.some(
              (varianta) =>
                varianta
                  .trim()
                  .toLowerCase() ===
                raspuns
            );

          if (!raspunsExista) {
            erori.push(
              `${baza}.raspunsCorect: nu apare in variante`
            );
          }
        }
      }

      /*
       * Math QA este poarta matematica determinista.
       * AI-ul local nu decide singur daca exercitiul este corect.
       */
      const eroriMathQa =
        valideazaExercitiuMatematic(
          exercitiu
        );

      for (
        const eroareMathQa
        of eroriMathQa
      ) {
        erori.push(
          `${baza}: ${eroareMathQa}`
        );
      }

      /*
       * Exercise QA verifica probleme pedagogice:
       * suport vizual absent, formulari problematice etc.
       */
      const eroriExerciseQa =
        valideazaExercitiuPedagogic(
          exercitiu
        );

      for (
        const eroareExerciseQa
        of eroriExerciseQa
      ) {
        erori.push(
          `${baza}: ${eroareExerciseQa}`
        );
      }
    }
  );

  /*
   * V6.2:
   * verificam si lotul ca ansamblu.
   * Astfel putem prinde duplicate semantice intre cele 4 exercitii.
   */
  const eroriSet =
    valideazaSetExercitiiPedagogic(
      x.exercitii
    );

  for (
    const eroareSet
    of eroriSet
  ) {
    erori.push(
      `set-exercitii: ${eroareSet}`
    );
  }

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
      "video: obiect lipsa"
    ];
  }

  const erori = [];
  const durata =
    numar === 1 ? 4 : 5;

  const baza =
    `video${numar}`;

  if (
    video.numar !== numar
  ) {
    erori.push(
      `${baza}.numar: trebuie ${numar}`
    );
  }

  if (
    video.durataMinute !== durata
  ) {
    erori.push(
      `${baza}.durataMinute: trebuie ${durata}`
    );
  }

  for (
    const [camp, valoare]
    of [
      ["id", video.id],
      ["titlu", video.titlu],
      ["descriere", video.descriere],
    ]
  ) {
    if (!esteText(valoare)) {
      erori.push(
        `${baza}.${camp}: lipsa sau invalid`
      );
    }
  }

  if (
    !Array.isArray(
      video.scenariu
    ) ||
    video.scenariu.length < 10 ||
    video.scenariu.some(
      (paragraf) =>
        !esteText(paragraf)
    )
  ) {
    erori.push(
      `${baza}.scenariu: minimum 10 paragrafe text valide`
    );
  }

  const totalCuvinte =
    numaraCuvinte(
      (
        video.scenariu ?? []
      ).join(" ")
    );

  if (
    totalCuvinte <
    VIDEO_MIN_CUVINTE[numar]
  ) {
    erori.push(
      `${baza}.scenariu: prea scurt ${totalCuvinte}/${VIDEO_MIN_CUVINTE[numar]} cuvinte`
    );
  }

  if (
    totalCuvinte >
    VIDEO_MAX_CUVINTE[numar]
  ) {
    erori.push(
      `${baza}.scenariu: prea lung ${totalCuvinte}/${VIDEO_MAX_CUVINTE[numar]} cuvinte`
    );
  }

  if (
    !Array.isArray(
      video.ideiDeRetinut
    ) ||
    video.ideiDeRetinut.length < 3 ||
    video.ideiDeRetinut.some(
      (idee) =>
        !esteText(idee)
    )
  ) {
    erori.push(
      `${baza}.ideiDeRetinut: minimum 3 texte valide`
    );
  }

  const exemplu =
    video.exemplu;

  if (
    !exemplu ||
    typeof exemplu !==
      "object"
  ) {
    erori.push(
      `${baza}.exemplu: obiect lipsa`
    );
  } else {
    for (
      const [camp, valoare]
      of [
        [
          "titlu",
          exemplu.titlu,
        ],
        [
          "enunt",
          exemplu.enunt,
        ],
        [
          "raspuns",
          exemplu.raspuns,
        ],
      ]
    ) {
      if (!esteText(valoare)) {
        erori.push(
          `${baza}.exemplu.${camp}: lipsa sau invalid`
        );
      }
    }

    if (
      !Array.isArray(
        exemplu.rezolvareScurta
      ) ||
      exemplu.rezolvareScurta.length < 1 ||
      exemplu.rezolvareScurta.some(
        (pas) =>
          !esteText(pas)
      )
    ) {
      erori.push(
        `${baza}.exemplu.rezolvareScurta: minimum 1 text valid`
      );
    }
  }

  const verificare =
    video.verificareRapida;

  if (
    !verificare ||
    typeof verificare !==
      "object"
  ) {
    erori.push(
      `${baza}.verificareRapida: obiect lipsa`
    );
  } else {
    if (
      !esteText(
        verificare.intrebare
      )
    ) {
      erori.push(
        `${baza}.verificareRapida.intrebare: lipsa sau invalid`
      );
    }

    if (
      !Array.isArray(
        verificare.variante
      ) ||
      verificare.variante.length !==
        4 ||
      verificare.variante.some(
        (varianta) =>
          !esteText(varianta)
      )
    ) {
      erori.push(
        `${baza}.verificareRapida.variante: exact 4 texte valide`
      );
    } else if (
      !varianteNormalizateUnice(
        verificare.variante
      )
    ) {
      erori.push(
        `${baza}.verificareRapida.variante: variante duplicate`
      );
    }

    if (
      !Number.isInteger(
        verificare.raspunsCorect
      ) ||
      verificare.raspunsCorect < 0 ||
      verificare.raspunsCorect > 3
    ) {
      erori.push(
        `${baza}.verificareRapida.raspunsCorect: trebuie index 0..3`
      );
    }

    if (
      !esteText(
        verificare.explicatie
      )
    ) {
      erori.push(
        `${baza}.verificareRapida.explicatie: lipsa sau invalid`
      );
    }
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

function promptTeorie(
  lectie,
  meta
) {
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
    obiective:
      meta.obiective,
    definitii:
      teorie.definitii,
    formule:
      teorie.formule,
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
- minimum 4 elemente in checklistElev;
- formuleDeRetinut poate fi [] daca nu exista formule relevante;
- explica greselile concret;
- nu inventa subiecte oficiale de Bac;
- nu inventa ani, bareme sau surse oficiale;
- legaturaCuBac trebuie formulata generic si pedagogic;
- nu genera exercitiile inca.
`.trim();
}

/* =========================================================
   PROMPT EXEMPLE
========================================================= */

function promptExemple(
  lectie,
  meta,
  teorie,
  pedagogie
) {
  const context = {
    obiective:
      meta.obiective,
    nivelPrincipal:
      meta.nivelPrincipal,
    definitii:
      teorie.definitii,
    formule:
      teorie.formule,
    greseliFrecvente:
      pedagogie.greseliFrecvente,
  };

  return `
${blocCanonic(lectie)}

CONTEXT:

${JSON.stringify(
  context,
  null,
  2
)}

Genereaza EXACT 4 exemple rezolvate.

Returneaza EXACT:

{
  "exempleRezolvate": [
    {
      "id": "exemplu-1",
      "titlu": "...",
      "nivel": "fundament",
      "enunt": "...",
      "pasi": [
        {
          "numar": 1,
          "titlu": "...",
          "continut": "..."
        },
        {
          "numar": 2,
          "titlu": "...",
          "continut": "..."
        }
      ],
      "raspunsFinal": "...",
      "verificare": "..."
    }
  ]
}

CERINTE:
- EXACT 4 exemple;
- id-urile trebuie sa fie distincte;
- fiecare exemplu are minimum 2 pasi reali;
- nivel este exact:
  fundament,
  standard-bac
  sau avansat;
- exemplele trebuie sa creasca gradual ca dificultate;
- enuntul fiecarui exemplu trebuie sa fie complet;
- nu presupune existenta unei imagini, axe, figuri, diagrame, grafic sau tabel care nu apare in enunt;
- toate datele necesare rezolvarii trebuie sa fie scrise explicit;
- calculele trebuie sa poata fi verificate manual;
- raspunsFinal trebuie sa fie consecvent cu rezolvarea;
- nu inventa subiecte oficiale de Bac;
- nu spune ca exemplul provine dintr-un examen real daca acest lucru nu este furnizat in context.
`.trim();
}

/* =========================================================
   PROMPT EXERCITII V6.2
========================================================= */

function promptLotExercitii(
  lectie,
  meta,
  teorie,
  pedagogie,
  exemple,
  lot,
  exercitiiAnterioare = []
) {
  const inceput =
    lot === 1 ? 1 : 5;

  const sfarsit =
    lot === 1 ? 4 : 8;

  const context = {
    obiective:
      meta.obiective,

    nivelPrincipal:
      meta.nivelPrincipal,

    definitii:
      teorie.definitii,

    formule:
      teorie.formule,

    greseliFrecvente:
      pedagogie.greseliFrecvente,

    exempleRezolvate:
      exemple.exempleRezolvate,

    exercitiiDeEvitAt:
      exercitiiAnterioare,
  };

  return `
${blocCanonic(lectie)}

CONTEXT:

${JSON.stringify(
  context,
  null,
  2
)}

Genereaza LOTUL ${lot} de exercitii.

Acest lot trebuie sa contina EXACT 4 exercitii.

Ele vor deveni exercitiile
${inceput}-${sfarsit}
ale lectiei finale.

Returneaza EXACT:

{
  "exercitii": [
    {
      "id": "exercitiu-${inceput}",
      "nivel": "fundament",
      "tip": "raspuns-scurt",
      "enunt": "...",
      "variante": [],
      "raspunsCorect": "...",
      "rezolvare": [
        {
          "numar": 1,
          "titlu": "...",
          "continut": "..."
        },
        {
          "numar": 2,
          "titlu": "...",
          "continut": "..."
        }
      ],
      "explicatieFinala": "...",
      "competenta": "...",
      "punctaj": 5
    }
  ]
}

REGULI DE STRUCTURA:
- returneaza EXACT 4 exercitii;
- fiecare exercitiu trebuie sa aiba id distinct;
- foloseste id-uri corespunzatoare lotului ${lot};
- fiecare exercitiu trebuie sa aiba minimum 2 pasi in rezolvare;
- fiecare pas trebuie sa aiba:
  numar,
  titlu,
  continut;
- numerele pasilor trebuie sa fie distincte;
- punctaj trebuie sa fie numar pozitiv;
- nivel trebuie sa fie exact unul dintre:
  fundament,
  standard-bac,
  avansat;
- tip trebuie sa fie exact unul dintre:
  alegere-multipla,
  raspuns-scurt,
  rezolvare-completa.

REGULI MATEMATICE:
- fiecare exercitiu trebuie verificat matematic inainte de raspuns;
- raspunsCorect trebuie sa fie consecvent cu enuntul si rezolvarea;
- rezolvarea trebuie sa conduca efectiv la raspunsCorect;
- nu inventa date care lipsesc din enunt;
- nu crea exercitii ambigue;
- prefera exercitii matematice simple si verificabile in locul unor exercitii sofisticate dar nesigure;
- fiecare exercitiu trebuie sa poata fi verificat manual;
- daca nu esti sigur de corectitudinea unei constructii, abandoneaz-o si genereaza una mai simpla.

REGULI PENTRU ALEGERE MULTIPLA:
- daca tip = "alegere-multipla", variante trebuie sa contina EXACT 4 texte;
- cele 4 variante trebuie sa fie DISTINCTE;
- nu repeta aceeasi varianta cu spatii diferite sau diferente cosmetice;
- raspunsCorect trebuie sa fie IDENTIC cu exact una dintre variante;
- trebuie sa existe EXACT O SINGURA varianta matematic corecta;
- verifica matematic TOATE cele 4 variante inainte de a returna raspunsul;
- cele 3 variante gresite trebuie sa fie plauzibile, dar matematic gresite;
- nu crea variante care sunt forme echivalente ale aceluiasi raspuns;
- nu crea doua intervale diferit scrise care reprezinta aceeasi multime;
- nu crea doua expresii echivalente matematic daca ambele ar putea fi considerate corecte.

REGULI PENTRU CELELALTE TIPURI:
- daca tip NU este "alegere-multipla", variante trebuie sa fie [];
- raspuns-scurt trebuie sa aiba totusi minimum 2 pasi reali in rezolvare;
- rezolvare-completa trebuie sa prezinte rationamentul clar, nu doar rezultatul.

REGULI DE AUTOSUFICIENTA:
- fiecare exercitiu trebuie sa poata fi rezolvat COMPLET numai din informatiile scrise explicit in enunt;
- NU cere elevului sa citeasca, observe sau interpreteze o imagine care nu este inclusa;
- NU folosi cerinte de forma:
  "conform graficului",
  "din figura",
  "din imagine",
  "din diagrama",
  "din tabelul de mai jos",
  "intervalul reprezentat pe axa",
  daca suportul respectiv nu este furnizat;
- daca ideea de exercitiu necesita un suport vizual absent, ABANDONEAZA acea idee si genereaza un exercitiu textual;
- este permis sa explici teoretic notiunea de axa numerelor;
- simpla mentionare a axei numerelor este permisa numai daca exercitiul poate fi rezolvat fara a vedea efectiv o reprezentare grafica;
- toate numerele, conditiile, intervalele, ecuatiile si informatiile necesare trebuie sa apara explicit in text.

REGULI DE DIVERSITATE:
- cele 4 exercitii trebuie sa fie semantic diferite;
- nu genera aceeasi problema de doua ori schimband doar numerele;
- nu genera aceeasi problema schimband doar ordinea cuvintelor;
- nu transforma artificial acelasi exercitiu din raspuns-scurt in alegere-multipla si sa il consideri exercitiu diferit;
- fiecare exercitiu trebuie sa testeze o sarcina matematica distincta;
- distribuie dificultatea gradual;
- evita repetarea inutila a exemplelor deja rezolvate.

REGULI SPECIALE PENTRU LOTUL 2:
- daca in CONTEXT exista exercitiiDeEvitAt, acestea sunt exercitii deja generate si validate in lotul anterior;
- NU repeta si NU reformula exercitiile din exercitiiDeEvitAt;
- nu crea un exercitiu care testeaza practic aceeasi cerinta ca unul din exercitiiDeEvitAt, chiar daca schimbi numerele, ordinea cuvintelor sau tipul raspunsului;
- cele 4 exercitii noi trebuie sa aduca sarcini matematice distincte fata de exercitiiDeEvitAt;
- compara mental fiecare exercitiu nou cu exercitiiDeEvitAt inainte de raspuns.

VERIFICARE FINALA OBLIGATORIE INAINTE DE JSON:
1. Sunt exact 4 exercitii?
2. Toate enunturile sunt complete?
3. Toate se pot rezolva fara suport vizual absent?
4. Fiecare rezolvare are minimum 2 pasi reali?
5. Toate raspunsurile sunt corecte matematic?
6. La fiecare grila exista exact 4 variante distincte?
7. La fiecare grila exista exact o singura varianta matematic corecta?
8. Niciun exercitiu nu este duplicat semantic?
9. Pentru lotul 2, niciun exercitiu nu repeta lotul anterior?
10. JSON-ul respecta exact schema ceruta?

Nu descrie aceasta verificare in raspuns.
Returneaza numai JSON-ul final.
`.trim();
}

/* =========================================================
   PROMPT VIDEO
========================================================= */

function promptVideo(
  lectie,
  meta,
  teorie,
  pedagogie,
  exemple,
  exercitii,
  numar
) {
  const roluri = {
    1: {
      durata: 4,
      rol:
        "intuitie si intelegerea conceptului",
      minim:
        VIDEO_MIN_CUVINTE[1],
      maxim:
        VIDEO_MAX_CUVINTE[1],
    },

    2: {
      durata: 5,
      rol:
        "reguli, proprietati si metoda de lucru",
      minim:
        VIDEO_MIN_CUVINTE[2],
      maxim:
        VIDEO_MAX_CUVINTE[2],
    },

    3: {
      durata: 5,
      rol:
        "exemplu complet rezolvat pas cu pas",
      minim:
        VIDEO_MIN_CUVINTE[3],
      maxim:
        VIDEO_MAX_CUVINTE[3],
    },

    4: {
      durata: 5,
      rol:
        "cerinta de tip Bac, strategie si greseli frecvente",
      minim:
        VIDEO_MIN_CUVINTE[4],
      maxim:
        VIDEO_MAX_CUVINTE[4],
    },
  };

  const configuratie =
    roluri[numar];

  /*
   * Modelul local tinde sa genereze mai putine cuvinte
   * decat i se cer.
   *
   * De aceea nu ii cerem sa tinteasca direct pragul minim.
   * Ii dam o tinta intentionat mai mare, dar pastram
   * validatorul real neschimbat.
   */
  const tintaScenariu =
    Math.min(
      configuratie.maxim - 20,
      Math.max(
        configuratie.minim + 150,
        600
      )
    );

  const context = {
    titlu:
      lectie.titlu,

    obiective:
      meta.obiective,

    definitii:
      teorie.definitii,

    teorie:
      teorie.teorie,

    formule:
      teorie.formule,

    greseliFrecvente:
      pedagogie.greseliFrecvente,

    exempleRezolvate:
      exemple.exempleRezolvate,

    exercitii:
      exercitii.slice(0, 8),
  };

  return `
${blocCanonic(lectie)}

CONTEXT PEDAGOGIC VERIFICABIL:

${JSON.stringify(
  context,
  null,
  2
)}

Genereaza VIDEO ${numar} din cele 4 mini-video-uri ale lectiei.

ROL VIDEO:
${configuratie.rol}

DURATA TINTA:
${configuratie.durata} minute.

CERINTA CRITICA PENTRU LUNGIMEA SCENARIULUI:

Pragul tehnic acceptat de validator este intre
${configuratie.minim}
si
${configuratie.maxim}
cuvinte.

NU tinti pragul minim.

TINTA TA DE GENERARE ESTE:
aproximativ ${tintaScenariu} de cuvinte NUMAI in campul "scenariu".

IMPORTANT:
- scrie intentionat mai mult decat minimul;
- nu te opri la 300 sau 350 de cuvinte;
- continua explicatia pana ajungi aproximativ la ${tintaScenariu} de cuvinte;
- scenariul sub ${configuratie.minim} de cuvinte va fi RESPINS automat;
- lungimea se refera numai la textele din array-ul "scenariu";
- titlul, descrierea, exemplul, ideile de retinut si verificarea rapida NU compenseaza un scenariu prea scurt.

Returneaza EXACT:

{
  "video": {
    "numar": ${numar},
    "id": "video-${numar}",
    "titlu": "...",
    "durataMinute": ${configuratie.durata},
    "descriere": "...",

    "scenariu": [
      "...",
      "...",
      "...",
      "...",
      "...",
      "...",
      "...",
      "...",
      "...",
      "...",
      "...",
      "..."
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
        "...",
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

REGULI GENERALE:
- video.numar trebuie sa fie exact ${numar};
- video.durataMinute trebuie sa fie exact ${configuratie.durata};

- scenariu trebuie sa contina minimum 12 paragrafe substantiale;

- fiecare paragraf din scenariu trebuie sa dezvolte o idee pedagogica reala;

- evita paragrafe de numai cateva cuvinte;

- scenariul trebuie sa aiba minimum ${configuratie.minim} cuvinte;

- tinta recomandata este aproximativ ${tintaScenariu} de cuvinte;

- nu depasi ${configuratie.maxim} cuvinte;

- NU incheia scenariul imediat dupa prezentarea regulii;

- dupa prezentarea regulii, continua cu explicatie, rationament, exemplificare, verificare si greseli frecvente, dupa caz;

- nu lungi artificial scenariul prin repetarea aceleiasi idei;

- fiecare paragraf nou trebuie sa adauge informatie pedagogica utila;

- scenariul trebuie scris natural pentru voce TTS in limba romana;

- explica pe intelesul unui elev;

- evita frazele inutil de lungi;

- foloseste notatie matematica simpla;

- nu inventa surse;

- nu inventa subiecte oficiale;

- nu inventa ani de Bac;

- nu spune ca un exercitiu este oficial daca nu exista aceasta informatie in context;

- foloseste numai matematica pe care o poti sustine din context;

- daca ai dubii asupra unui exemplu, foloseste unul mai simplu;

- exemplul din video trebuie sa fie complet si verificabil;

- verificareRapida trebuie sa aiba exact 4 variante distincte;

- raspunsCorect din verificareRapida este INDEX numeric 0, 1, 2 sau 3;

- indexul trebuie sa indice varianta corecta;

- verifica matematic intrebarea si toate variantele inainte de raspuns.

STRUCTURA PEDAGOGICA A SCENARIULUI:

Scenariul trebuie sa curga natural, dar sa acopere suficient de amplu:

1. introducerea ideii video-ului;

2. legatura cu ceea ce elevul trebuie sa inteleaga;

3. explicarea conceptului sau regulii;

4. motivul pentru care regula functioneaza;

5. metoda de lucru;

6. aplicarea metodei;

7. un exemplu explicat verbal;

8. verificarea rezultatului;

9. o confuzie sau greseala frecventa;

10. cum poate elevul evita acea greseala;

11. recapitularea ideii centrale;

12. concluzia practica.

Nu transforma aceasta structura intr-o enumerare rigida.
Scenariul final trebuie sa sune ca un profesor care explica natural.

REGULI PEDAGOGICE VIDEO ${numar}:
${numar === 1
    ? `
- porneste de la intuitie;
- explica de ce este util conceptul;
- introdu notatia gradual;
- nu transforma video-ul intr-o lista seaca de formule;
- elevul trebuie sa inteleaga ideea inaintea regulii;
- foloseste exemple simple pentru construirea intuitiei;
- explica legatura dintre reprezentarea matematica si sensul ei.
`
    : ""}

${numar === 2
    ? `
- concentreaza-te pe reguli si metoda;
- explica ordinea pasilor;
- arata cand se aplica fiecare regula;
- explica de ce se aplica regula;
- ofera cel putin un exemplu concret in interiorul scenariului;
- explica exemplul pas cu pas;
- verifica rezultatul exemplului;
- include avertismente despre confuziile frecvente;
- compara, atunci cand este util, o abordare corecta cu una gresita;
- incheie printr-o recapitulare clara a metodei.
`
    : ""}

${numar === 3
    ? `
- construieste un exemplu complet;
- rezolva-l logic, pas cu pas;
- explica motivul fiecarui pas;
- nu sari peste transformarile intermediare importante;
- rezultatul trebuie verificat;
- explica si verificarea;
- mentioneaza cel putin o greseala pe care elevul ar putea sa o faca;
- arata cum poate fi detectata acea greseala;
- nu sari direct la raspuns.
`
    : ""}

${numar === 4
    ? `
- foloseste o cerinta relevanta pentru pregatirea de Bac, dar NU pretinde ca este un subiect oficial;
- explica strategia de abordare;
- arata cum elevul identifica informatia importanta din cerinta;
- explica ordinea pasilor;
- include greseli frecvente;
- explica de ce sunt gresite;
- arata cum poate elevul verifica raspunsul;
- include o recomandare practica pentru rezolvarea sub presiunea timpului;
- incheie cu o recapitulare practica.
`
    : ""}

REGULI DE AUTOSUFICIENTA:
- nu presupune imagini, grafice, axe, figuri sau tabele absente;
- tot ce este necesar trebuie explicat verbal sau textual;
- nu spune "dupa cum vezi in imagine" daca imaginea nu exista;
- nu spune "pe graficul de mai sus";
- nu spune "pe axa din imagine";
- scenariul trebuie sa poata fi inteles si doar ascultat.

CONTROL OBLIGATORIU AL LUNGIMII:

Inainte sa returnezi JSON-ul:

1. Estimeaza numarul de cuvinte din toate paragrafele campului "scenariu".

2. Daca scenariul pare mai scurt de ${configuratie.minim} de cuvinte, NU returna raspunsul.

3. Continua sa dezvolti pedagogic scenariul.

4. Tinteste aproximativ ${tintaScenariu} de cuvinte.

5. Nu folosi repetitii artificiale doar pentru a creste numarul de cuvinte.

6. Nu elimina campurile JSON pentru a face loc scenariului.

VERIFICARE INTERNA:
- verifica numarul video;
- verifica durataMinute;
- verifica faptul ca scenariul are minimum ${configuratie.minim} cuvinte;
- verifica faptul ca scenariul nu depaseste ${configuratie.maxim} cuvinte;
- verifica faptul ca exista minimum 12 paragrafe substantiale;
- verifica exemplul matematic;
- verifica cele 4 variante ale intrebarii rapide;
- verifica indexul raspunsului corect;
- verifica faptul ca obiectul JSON este complet.

Returneaza numai JSON valid.
`.trim();
}
/* =========================================================
   VALIDARE FINALA A CELOR 8 EXERCITII
========================================================= */

function valideazaToateExercitiile(
  exercitii
) {
  const erori = [];

  if (
    !Array.isArray(exercitii) ||
    exercitii.length !== 8
  ) {
    return [
      "Lectia finala trebuie sa contina exact 8 exercitii."
    ];
  }

  const iduri = new Set();

  exercitii.forEach(
    (exercitiu, index) => {
      const baza =
        `exercitiiFinale[${index}]`;

      if (
        !exercitiu ||
        typeof exercitiu !== "object"
      ) {
        erori.push(
          `${baza}: obiect invalid`
        );
        return;
      }

      if (!esteText(exercitiu.id)) {
        erori.push(
          `${baza}.id: lipsa`
        );
      } else if (
        iduri.has(exercitiu.id)
      ) {
        erori.push(
          `${baza}.id: duplicat (${exercitiu.id})`
        );
      } else {
        iduri.add(exercitiu.id);
      }

      const eroriLot =
        valideazaLotExercitii({
          exercitii: [
            exercitiu,
            exercitiu,
            exercitiu,
            exercitiu,
          ],
        });

      /*
       * Nu folosim eroriLot aici deoarece validatorul
       * de lot cere exact 4 exercitii distincte.
       * Validarea individuala este facuta explicit mai jos.
       */

      void eroriLot;

      const eroriMath =
        valideazaExercitiuMatematic(
          exercitiu
        );

      for (
        const eroare
        of eroriMath
      ) {
        erori.push(
          `${baza}: ${eroare}`
        );
      }

      const eroriPedagogice =
        valideazaExercitiuPedagogic(
          exercitiu
        );

      for (
        const eroare
        of eroriPedagogice
      ) {
        erori.push(
          `${baza}: ${eroare}`
        );
      }

      if (
        !Array.isArray(
          exercitiu.rezolvare
        ) ||
        exercitiu.rezolvare.length < 2
      ) {
        erori.push(
          `${baza}.rezolvare: minimum 2 pasi`
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
          exercitiu.variante.length !==
            4
        ) {
          erori.push(
            `${baza}.variante: trebuie exact 4`
          );
        } else if (
          !varianteNormalizateUnice(
            exercitiu.variante
          )
        ) {
          erori.push(
            `${baza}.variante: variante duplicate`
          );
        }
      }
    }
  );

  /*
   * Poarta importanta V6.2:
   * Exercise QA vede toate cele 8 exercitii simultan.
   * Aici detectam duplicate intre lotul 1 si lotul 2.
   */
  const eroriSet =
    valideazaSetExercitiiPedagogic(
      exercitii
    );

  for (
    const eroare
    of eroriSet
  ) {
    erori.push(
      `set-8-exercitii: ${eroare}`
    );
  }

  return [
    ...new Set(erori),
  ];
}

/* =========================================================
   NORMALIZARE ID-URI EXERCITII
========================================================= */

function normalizeazaIduriExercitii(
  exercitii
) {
  return exercitii.map(
    (exercitiu, index) => ({
      ...exercitiu,
      id:
        `exercitiu-${index + 1}`,

      rezolvare:
        (
          exercitiu.rezolvare ??
          []
        ).map(
          (pas, indexPas) => ({
            ...pas,
            numar:
              indexPas + 1,
          })
        ),
    })
  );
}

/* =========================================================
   NORMALIZARE ID-URI EXEMPLE
========================================================= */

function normalizeazaIduriExemple(
  exemple
) {
  return exemple.map(
    (exemplu, index) => ({
      ...exemplu,
      id:
        `exemplu-${index + 1}`,

      pasi:
        (
          exemplu.pasi ??
          []
        ).map(
          (pas, indexPas) => ({
            ...pas,
            numar:
              indexPas + 1,
          })
        ),
    })
  );
}

/* =========================================================
   NORMALIZARE VIDEO
========================================================= */

function normalizeazaVideo(
  video,
  numar
) {
  return {
    ...video,
    numar,
    id: `video-${numar}`,
    durataMinute:
      numar === 1 ? 4 : 5,
  };
}

/* =========================================================
   ASAMBLARE LECTIE
========================================================= */

function asambleazaLectie({
  lectie,
  meta,
  teorie,
  pedagogie,
  exemple,
  exercitii1,
  exercitii2,
  video1,
  video2,
  video3,
  video4,
}) {
  const toateExercitiile =
    normalizeazaIduriExercitii([
      ...(exercitii1.exercitii ?? []),
      ...(exercitii2.exercitii ?? []),
    ]);

  const exempleNormalizate =
    normalizeazaIduriExemple(
      exemple.exempleRezolvate ??
        []
    );

  return {
    meta: {
      slug: lectie.slug,
      modul: lectie.modul,
      numarLectie:
        lectie.numarLectie,
      titlu: lectie.titlu,

      subtitlu:
        meta.subtitlu,

      descriere:
        meta.descriere,

      profil:
        "M_mate-info",

      clasa:
        meta.clasa,

      nivelPrincipal:
        meta.nivelPrincipal,

      durataEstimataMinute:
        meta.durataEstimataMinute,

      prerechizite:
        meta.prerechizite,

      obiective:
        meta.obiective,

      termeniCheie:
        meta.termeniCheie,

      status: "draft",

      verificatMatematic:
        false,

      verificatPrograma:
        false,

      verificatExercitii:
        false,

      verificatLimbaRomana:
        false,

      sursa:
        "Draft generat de BAC MATE Generator Local",

      generator:
        `BAC MATE Generator Local V${VERSIUNE_GENERATOR}`,
    },

    definitii:
      teorie.definitii,

    teorie:
      teorie.teorie,

    formule:
      teorie.formule,

    exempleRezolvate:
      exempleNormalizate,

    exercitii:
      toateExercitiile,

    greseliFrecvente:
      pedagogie.greseliFrecvente,

    rezumat:
      pedagogie.rezumat,

    legaturaCuBac:
      pedagogie.legaturaCuBac,

    video: [
      normalizeazaVideo(
        video1.video,
        1
      ),
      normalizeazaVideo(
        video2.video,
        2
      ),
      normalizeazaVideo(
        video3.video,
        3
      ),
      normalizeazaVideo(
        video4.video,
        4
      ),
    ],
  };
}

/* =========================================================
   VALIDARE LECTIE ASAMBLATA
========================================================= */

function valideazaLectieAsamblata(
  document,
  lectie
) {
  const erori = [];

  if (
    !document ||
    typeof document !== "object"
  ) {
    return [
      "Lectia asamblata nu este obiect."
    ];
  }

  const meta =
    document.meta;

  if (
    !meta ||
    typeof meta !== "object"
  ) {
    erori.push(
      "meta final lipsa"
    );

    return erori;
  }

  if (
    meta.slug !== lectie.slug
  ) {
    erori.push(
      "slug final diferit de catalog"
    );
  }

  if (
    meta.modul !== lectie.modul
  ) {
    erori.push(
      "modul final diferit de catalog"
    );
  }

  if (
    meta.numarLectie !==
    lectie.numarLectie
  ) {
    erori.push(
      "numarLectie final diferit de catalog"
    );
  }

  if (
    meta.titlu !== lectie.titlu
  ) {
    erori.push(
      "titlu final diferit de catalog"
    );
  }

  if (
    meta.profil !==
    "M_mate-info"
  ) {
    erori.push(
      "profil final invalid"
    );
  }

  if (
    meta.status !== "draft"
  ) {
    erori.push(
      "status final trebuie sa fie draft"
    );
  }

  for (
    const poarta
    of [
      "verificatMatematic",
      "verificatPrograma",
      "verificatExercitii",
      "verificatLimbaRomana",
    ]
  ) {
    if (
      meta[poarta] !== false
    ) {
      erori.push(
        `${poarta} trebuie sa fie false`
      );
    }
  }

  if (
    !Array.isArray(
      document.definitii
    ) ||
    document.definitii.length < 2
  ) {
    erori.push(
      "definitii finale invalide"
    );
  }

  if (
    !Array.isArray(
      document.teorie
    ) ||
    document.teorie.length < 3
  ) {
    erori.push(
      "teorie finala invalida"
    );
  }

  if (
    !Array.isArray(
      document.formule
    )
  ) {
    erori.push(
      "formule finale invalide"
    );
  }

  if (
    !Array.isArray(
      document.exempleRezolvate
    ) ||
    document.exempleRezolvate.length !==
      4
  ) {
    erori.push(
      "exempleRezolvate finale: trebuie exact 4"
    );
  }

  erori.push(
    ...valideazaToateExercitiile(
      document.exercitii
    )
  );

  if (
    !Array.isArray(
      document.greseliFrecvente
    ) ||
    document.greseliFrecvente.length < 4
  ) {
    erori.push(
      "greseliFrecvente finale invalide"
    );
  }

  if (
    !document.rezumat ||
    typeof document.rezumat !==
      "object"
  ) {
    erori.push(
      "rezumat final invalid"
    );
  }

  if (
    !document.legaturaCuBac ||
    typeof document.legaturaCuBac !==
      "object"
  ) {
    erori.push(
      "legaturaCuBac finala invalida"
    );
  }

  if (
    !Array.isArray(
      document.video
    ) ||
    document.video.length !== 4
  ) {
    erori.push(
      "video final: trebuie exact 4"
    );
  } else {
    document.video.forEach(
      (video, index) => {
        erori.push(
          ...valideazaVideo(
            {
              video,
            },
            index + 1
          )
        );
      }
    );
  }

  if (
    continePlaceholder(
      document
    )
  ) {
    erori.push(
      "Lectia finala contine placeholder."
    );
  }

  return [
    ...new Set(erori),
  ];
}

/* =========================================================
   SERIALIZARE TYPESCRIPT
========================================================= */

function serializareTs(
  valoare
) {
  return JSON.stringify(
    valoare,
    null,
    2
  );
}

function creeazaFisierLectie(
  document
) {
  const numeExport =
    "lectie";

  return `/*
 * Draft generat de BAC MATE Generator Local V${VERSIUNE_GENERATOR}.
 *
 * IMPORTANT:
 * - continutul NU este publicat automat;
 * - verificarile raman false;
 * - continutul necesita verificare matematica,
 *   de programa, exercitii si limba romana.
 */

export const ${numeExport} = ${serializareTs(
    document
  )} as const;

export default ${numeExport};
`;
}

/* =========================================================
   SCRIERE SIGURA LECTIE
========================================================= */

function scrieLectieFinala(
  lectie,
  document,
  argumente
) {
  const cale =
    caleFinalaLectie(
      lectie.slug
    );

  asiguraDirector(
    path.dirname(cale)
  );

  if (exista(cale)) {
    if (
      !argumente.replaceDraft
    ) {
      throw new Error(
        `Refuz suprascriere: ${relativ(cale)}`
      );
    }

    if (
      !esteDraftLocalInlocuibil(
        lectie.slug
      )
    ) {
      throw new Error(
        [
          `REFUZ INLOCUIRE: ${lectie.slug}`,
          "Fisierul existent nu mai este un draft local sigur.",
        ].join("\n")
      );
    }
  }

  const continut =
    creeazaFisierLectie(
      document
    );

  fs.writeFileSync(
    cale,
    continut,
    "utf8"
  );

  return cale;
}

/* =========================================================
   VALIDATOR LOT 2 CU MEMORIA LOTULUI 1
========================================================= */

function validatorLotDoi(
  rezultat,
  exercitii1
) {
  const erori = [
    ...valideazaLotExercitii(
      rezultat
    ),
  ];

  if (
    !Array.isArray(
      rezultat?.exercitii
    )
  ) {
    return erori;
  }

  const toate =
    [
      ...(
        exercitii1?.exercitii ??
        []
      ),
      ...rezultat.exercitii,
    ];

  if (
    toate.length === 8
  ) {
    const eroriSet =
      valideazaSetExercitiiPedagogic(
        toate
      );

    for (
      const eroare
      of eroriSet
    ) {
      erori.push(
        `set-8-exercitii: ${eroare}`
      );
    }
  } else {
    erori.push(
      `set-8-exercitii: sunt ${toate.length}/8 exercitii`
    );
  }

  return [
    ...new Set(erori),
  ];
}

/* =========================================================
   GENERARE UNEI LECTII
========================================================= */

async function genereazaLectie(
  lectie,
  argumente
) {
  titlu(
    `LECTIE: ${lectie.slug}`
  );

  if (argumente.restart) {
    console.log(
      "  ↻ --restart: sterg checkpoint-urile acestei lectii."
    );

    stergeCheckpointuri(
      lectie.slug
    );
  }

  /*
   * 01 — META
   */
  const meta =
    await obtineCheckpoint({
      lectie,
      argumente,
      nume: "01-meta",
      prompt:
        promptMeta(
          lectie
        ),
      validator:
        valideazaMeta,
      numPredict: 1400,
    });

  /*
   * 02 — TEORIE
   */
  const teorie =
    await obtineCheckpoint({
      lectie,
      argumente,
      nume: "02-teorie",
      prompt:
        promptTeorie(
          lectie,
          meta
        ),
      validator:
        valideazaTeorie,
      numPredict: 3200,
    });

  /*
   * 03 — PEDAGOGIE
   */
  const pedagogie =
    await obtineCheckpoint({
      lectie,
      argumente,
      nume:
        "03-pedagogie",
      prompt:
        promptPedagogie(
          lectie,
          meta,
          teorie
        ),
      validator:
        valideazaPedagogie,
      numPredict: 2800,
    });

  /*
   * 04 — EXEMPLE
   */
  const exemple =
    await obtineCheckpoint({
      lectie,
      argumente,
      nume: "04-exemple",
      prompt:
        promptExemple(
          lectie,
          meta,
          teorie,
          pedagogie
        ),
      validator:
        valideazaExemple,
      numPredict: 3600,
    });

  /*
   * 05 — EXERCITII 1-4
   */
  const exercitii1 =
    await obtineCheckpoint({
      lectie,
      argumente,
      nume:
        "05-exercitii-a",
      prompt:
        promptLotExercitii(
          lectie,
          meta,
          teorie,
          pedagogie,
          exemple,
          1,
          []
        ),
      validator:
        valideazaLotExercitii,
      numPredict: 4200,
    });

  /*
   * 06 — EXERCITII 5-8
   *
   * V6.2 trimite explicit lotul 1
   * catre promptul lotului 2.
   */
  const exercitii2 =
    await obtineCheckpoint({
      lectie,
      argumente,
      nume:
        "06-exercitii-b",
      prompt:
        promptLotExercitii(
          lectie,
          meta,
          teorie,
          pedagogie,
          exemple,
          2,
          exercitii1.exercitii ??
            []
        ),

      /*
       * V6.2 verifica simultan
       * exercitiile 1-8.
       */
      validator: (rezultat) =>
        validatorLotDoi(
          rezultat,
          exercitii1
        ),

      numPredict: 4200,
    });

  const toateExercitiile =
    normalizeazaIduriExercitii([
      ...(
        exercitii1.exercitii ??
        []
      ),
      ...(
        exercitii2.exercitii ??
        []
      ),
    ]);

  /*
   * Gate intermediar:
   * nu generam video daca cele 8 exercitii
   * nu trec verificarea comuna.
   */
  const eroriExercitiiFinale =
    valideazaToateExercitiile(
      toateExercitiile
    );

  if (
    eroriExercitiiFinale.length >
    0
  ) {
    throw new Error(
      [
        "Gate exercitii 8/8 esuat:",
        ...eroriExercitiiFinale.map(
          (eroare) =>
            `- ${eroare}`
        ),
      ].join("\n")
    );
  }

  console.log(
    "  ✓ Gate exercitii 8/8 trecut."
  );

  /*
   * 07 — VIDEO 1
   */
  const video1 =
    await obtineCheckpoint({
      lectie,
      argumente,
      nume: "07-video-1",
      prompt:
        promptVideo(
          lectie,
          meta,
          teorie,
          pedagogie,
          exemple,
          toateExercitiile,
          1
        ),
      validator: (x) =>
        valideazaVideo(
          x,
          1
        ),
      numPredict: 5000,
    });

  /*
   * 08 — VIDEO 2
   */
  const video2 =
    await obtineCheckpoint({
      lectie,
      argumente,
      nume: "08-video-2",
      prompt:
        promptVideo(
          lectie,
          meta,
          teorie,
          pedagogie,
          exemple,
          toateExercitiile,
          2
        ),
      validator: (x) =>
        valideazaVideo(
          x,
          2
        ),
      numPredict: 5600,
    });

  /*
   * 09 — VIDEO 3
   */
  const video3 =
    await obtineCheckpoint({
      lectie,
      argumente,
      nume: "09-video-3",
      prompt:
        promptVideo(
          lectie,
          meta,
          teorie,
          pedagogie,
          exemple,
          toateExercitiile,
          3
        ),
      validator: (x) =>
        valideazaVideo(
          x,
          3
        ),
      numPredict: 5600,
    });

  /*
   * 10 — VIDEO 4
   */
  const video4 =
    await obtineCheckpoint({
      lectie,
      argumente,
      nume: "10-video-4",
      prompt:
        promptVideo(
          lectie,
          meta,
          teorie,
          pedagogie,
          exemple,
          toateExercitiile,
          4
        ),
      validator: (x) =>
        valideazaVideo(
          x,
          4
        ),
      numPredict: 5600,
    });

  /*
   * ASAMBLARE
   */
  const document =
    asambleazaLectie({
      lectie,
      meta,
      teorie,
      pedagogie,
      exemple,
      exercitii1,
      exercitii2,
      video1,
      video2,
      video3,
      video4,
    });

  /*
   * GATE FINAL
   */
  const eroriFinale =
    valideazaLectieAsamblata(
      document,
      lectie
    );

  if (
    eroriFinale.length > 0
  ) {
    throw new Error(
      [
        "Gate final lectie esuat:",
        ...eroriFinale.map(
          (eroare) =>
            `- ${eroare}`
        ),
      ].join("\n")
    );
  }

  console.log(
    "  ✓ Gate final lectie trecut."
  );

  if (argumente.dryRun) {
    console.log(
      "  ✓ --dry-run: lectia este valida, dar fisierul final nu este scris."
    );

    return {
      slug: lectie.slug,
      status: "dry-run-valid",
      cale: null,
    };
  }

  const cale =
    scrieLectieFinala(
      lectie,
      document,
      argumente
    );

  console.log(
    `  ✓ Draft generat: ${relativ(cale)}`
  );

  return {
    slug: lectie.slug,
    status: "draft-generat",
    cale:
      relativ(cale),
  };
}
/* =========================================================
   SELF-TEST V6.2
========================================================= */

function ruleazaSelfTest() {
  titlu(
    `SELF-TEST GENERATOR V${VERSIUNE_GENERATOR}`
  );

  const teste = [];

  function test(
    nume,
    functie
  ) {
    try {
      functie();

      teste.push({
        nume,
        ok: true,
      });

      console.log(
        `✓ ${nume}`
      );
    } catch (eroare) {
      teste.push({
        nume,
        ok: false,
        eroare:
          eroare.message,
      });

      console.log(
        `✗ ${nume}`
      );

      console.log(
        `  ${eroare.message}`
      );
    }
  }

  function cere(
    conditie,
    mesaj
  ) {
    if (!conditie) {
      throw new Error(mesaj);
    }
  }

  test(
    "parseaza JSON simplu",
    () => {
      const rezultat =
        parseazaJsonModel(
          '{"ok":true}'
        );

      cere(
        rezultat.ok === true,
        "JSON simplu invalid"
      );
    }
  );

  test(
    "parseaza JSON din bloc code fence",
    () => {
      const rezultat =
        parseazaJsonModel(
          '```json\n{"ok":true}\n```'
        );

      cere(
        rezultat.ok === true,
        "Code fence invalid"
      );
    }
  );

  test(
    "detecteaza variante duplicate",
    () => {
      const rezultat =
        varianteNormalizateUnice([
          "A",
          "B",
          "A",
          "C",
        ]);

      cere(
        rezultat === false,
        "Duplicatele nu au fost detectate"
      );
    }
  );

  test(
    "accepta variante distincte",
    () => {
      const rezultat =
        varianteNormalizateUnice([
          "A",
          "B",
          "C",
          "D",
        ]);

      cere(
        rezultat === true,
        "Variante distincte respinse"
      );
    }
  );

  test(
    "detecteaza placeholder",
    () => {
      cere(
        continePlaceholder({
          text:
            "TODO de completat",
        }) === true,
        "Placeholder nedetectat"
      );
    }
  );

  test(
    "nu inventeaza placeholder",
    () => {
      cere(
        continePlaceholder({
          text:
            "Lectie completa.",
        }) === false,
        "Fals pozitiv placeholder"
      );
    }
  );

  test(
    "autorepair V6.2 pentru variante duplicate",
    () => {
      const text =
        instructiuniAutoreparare(
          "05-exercitii-a",
          [
            "exercitii[0].variante: variante duplicate",
          ]
        );

      cere(
        text.includes(
          "patru raspunsuri noi"
        ),
        "Lipsesc instructiunile speciale pentru variante duplicate"
      );

      cere(
        text.includes(
          "EXACT O SINGURA varianta matematic corecta"
        ),
        "Lipseste regula unei singure variante corecte"
      );
    }
  );

  test(
    "autorepair V6.2 pentru rezolvare scurta",
    () => {
      const text =
        instructiuniAutoreparare(
          "05-exercitii-a",
          [
            "exercitii[1].rezolvare: minimum 2 pasi",
          ]
        );

      cere(
        text.includes(
          "minimum doi pasi matematici distincti"
        ),
        "Lipseste repararea rezolvarii"
      );
    }
  );

  test(
    "normalizare determinista ID exercitii",
    () => {
      const rezultat =
        normalizeazaIduriExercitii([
          {
            id: "orice",
            rezolvare: [
              {
                numar: 99,
              },
              {
                numar: 50,
              },
            ],
          },
          {
            id: "altul",
            rezolvare: [],
          },
        ]);

      cere(
        rezultat[0].id ===
          "exercitiu-1",
        "ID exercitiu 1 invalid"
      );

      cere(
        rezultat[1].id ===
          "exercitiu-2",
        "ID exercitiu 2 invalid"
      );

      cere(
        rezultat[0]
          .rezolvare[0]
          .numar === 1,
        "Numar pas 1 invalid"
      );

      cere(
        rezultat[0]
          .rezolvare[1]
          .numar === 2,
        "Numar pas 2 invalid"
      );
    }
  );

  console.log("");

  const trecute =
    teste.filter(
      (element) =>
        element.ok
    ).length;

  const esuate =
    teste.length -
    trecute;

  console.log(
    `Rezultat self-test: ${trecute}/${teste.length} PASS`
  );

  if (esuate > 0) {
    throw new Error(
      `Self-test esuat: ${esuate} teste.`
    );
  }

  console.log(
    `✓ Generator V${VERSIUNE_GENERATOR}: self-test trecut.`
  );

  return true;
}

/* =========================================================
   VALIDARE CHECKPOINT-URI
========================================================= */

function validatorPentruCheckpoint(
  nume
) {
  if (
    nume === "01-meta"
  ) {
    return valideazaMeta;
  }

  if (
    nume === "02-teorie"
  ) {
    return valideazaTeorie;
  }

  if (
    nume ===
    "03-pedagogie"
  ) {
    return valideazaPedagogie;
  }

  if (
    nume === "04-exemple"
  ) {
    return valideazaExemple;
  }

  if (
    nume ===
      "05-exercitii-a" ||
    nume ===
      "06-exercitii-b"
  ) {
    return valideazaLotExercitii;
  }

  if (
    nume === "07-video-1"
  ) {
    return (x) =>
      valideazaVideo(
        x,
        1
      );
  }

  if (
    nume === "08-video-2"
  ) {
    return (x) =>
      valideazaVideo(
        x,
        2
      );
  }

  if (
    nume === "09-video-3"
  ) {
    return (x) =>
      valideazaVideo(
        x,
        3
      );
  }

  if (
    nume === "10-video-4"
  ) {
    return (x) =>
      valideazaVideo(
        x,
        4
      );
  }

  return null;
}

function valideazaCheckpointurile(
  lectii
) {
  titlu(
    "VALIDARE CHECKPOINT-URI"
  );

  const numeCheckpointuri = [
    "01-meta",
    "02-teorie",
    "03-pedagogie",
    "04-exemple",
    "05-exercitii-a",
    "06-exercitii-b",
    "07-video-1",
    "08-video-2",
    "09-video-3",
    "10-video-4",
  ];

  let total = 0;
  let valide = 0;
  let invalide = 0;
  let lipsa = 0;

  for (
    const lectie
    of lectii
  ) {
    console.log("");
    console.log(
      `Lectie: ${lectie.slug}`
    );

    let exercitiiLot1 =
      null;

    for (
      const nume
      of numeCheckpointuri
    ) {
      total++;

      const cale =
        caleCheckpoint(
          lectie.slug,
          nume
        );

      if (!exista(cale)) {
        lipsa++;

        console.log(
          `  - ${nume}: lipsa`
        );

        continue;
      }

      try {
        const continut =
          citesteJson(cale);

        let erori = [];

        /*
         * Pentru checkpoint-ul 06,
         * daca avem lotul 1 disponibil,
         * verificam si duplicatele intre 1-8.
         */
        if (
          nume ===
            "06-exercitii-b" &&
          exercitiiLot1
        ) {
          erori =
            validatorLotDoi(
              continut,
              exercitiiLot1
            );
        } else {
          const validator =
            validatorPentruCheckpoint(
              nume
            );

          if (!validator) {
            throw new Error(
              `Validator lipsa pentru ${nume}`
            );
          }

          erori =
            validator(
              continut
            );
        }

        if (
          nume ===
          "05-exercitii-a"
        ) {
          exercitiiLot1 =
            continut;
        }

        if (
          erori.length === 0
        ) {
          valide++;

          console.log(
            `  ✓ ${nume}: valid`
          );
        } else {
          invalide++;

          console.log(
            `  ✗ ${nume}: invalid`
          );

          for (
            const eroare
            of erori
          ) {
            console.log(
              `      - ${eroare}`
            );
          }
        }
      } catch (eroare) {
        invalide++;

        console.log(
          `  ✗ ${nume}: corupt`
        );

        console.log(
          `      - ${eroare.message}`
        );
      }
    }
  }

  console.log("");

  console.log(
    `Total checkpoint-uri analizate: ${total}`
  );

  console.log(
    `Valide: ${valide}`
  );

  console.log(
    `Invalide: ${invalide}`
  );

  console.log(
    `Lipsa: ${lipsa}`
  );

  return {
    total,
    valide,
    invalide,
    lipsa,
  };
}

/* =========================================================
   RAPORT GENERARE
========================================================= */

function incarcaRaport() {
  if (
    !exista(CALE_RAPORT)
  ) {
    return {
      versiuneGenerator:
        VERSIUNE_GENERATOR,

      actualizatLa:
        acum(),

      rulari: [],
    };
  }

  try {
    const raport =
      citesteJson(
        CALE_RAPORT
      );

    if (
      !raport ||
      typeof raport !==
        "object"
    ) {
      throw new Error(
        "Raport invalid"
      );
    }

    if (
      !Array.isArray(
        raport.rulari
      )
    ) {
      raport.rulari = [];
    }

    return raport;
  } catch {
    return {
      versiuneGenerator:
        VERSIUNE_GENERATOR,

      actualizatLa:
        acum(),

      rulari: [],
    };
  }
}

function salveazaRaport(
  raport
) {
  raport.versiuneGenerator =
    VERSIUNE_GENERATOR;

  raport.actualizatLa =
    acum();

  scrieJson(
    CALE_RAPORT,
    raport
  );
}

function adaugaRulareRaport(
  raport,
  date
) {
  raport.rulari.push({
    la: acum(),
    generator:
      VERSIUNE_GENERATOR,
    ...date,
  });

  /*
   * Nu lasam raportul sa creasca la infinit.
   */
  if (
    raport.rulari.length >
    500
  ) {
    raport.rulari =
      raport.rulari.slice(
        -500
      );
  }
}

/* =========================================================
   AFISARE SELECTIE
========================================================= */

function afiseazaLectiiSelectate(
  lectii
) {
  console.log(
    `Lectii selectate: ${lectii.length}`
  );

  for (
    const lectie
    of lectii
  ) {
    console.log(
      `- Modul ${lectie.modul}, Lectia ${lectie.numarLectie}: ${lectie.slug}`
    );
  }
}

/* =========================================================
   MAIN
========================================================= */

async function main() {
  const argumente =
    citesteArgumente();

  titlu(
    `BAC MATE — Generator Local Content Engine V${VERSIUNE_GENERATOR}`
  );

  console.log(
    `Model: ${argumente.model}`
  );

  console.log(
    `Ollama: ${OLLAMA_URL}`
  );

  console.log(
    `Generator: V${VERSIUNE_GENERATOR}`
  );

  /*
   * SELF-TEST nu necesita Ollama.
   */
  if (
    argumente.selfTest
  ) {
    ruleazaSelfTest();
    return;
  }

  const catalog =
    incarcaCatalogul();

  console.log("");
  console.log(
    `Catalog canonic: ${catalog.length}`
  );

  console.log(
    `✓ Gate catalog ${catalog.length}/${NUMAR_LECTII_ASTEPTAT}`
  );

  const existente =
    obtineSluguriExistente();

  console.log(
    `Content Engine existent: ${existente.size}`
  );

  /*
   * Modul separat pentru verificarea
   * checkpoint-urilor existente.
   */
  if (
    argumente.validateCheckpoints
  ) {
    let lectiiDeVerificat =
      catalog;

    if (
      argumente.slug
    ) {
      const lectie =
        catalog.find(
          (element) =>
            element.slug ===
            argumente.slug
        );

      if (!lectie) {
        throw new Error(
          `Slug inexistent in catalog: ${argumente.slug}`
        );
      }

      lectiiDeVerificat = [
        lectie,
      ];
    } else if (
      argumente.limit
    ) {
      lectiiDeVerificat =
        catalog.slice(
          0,
          argumente.limit
        );
    }

    valideazaCheckpointurile(
      lectiiDeVerificat
    );

    return;
  }

  const lectii =
    selecteazaLectii(
      catalog,
      existente,
      argumente
    );

  console.log("");

  afiseazaLectiiSelectate(
    lectii
  );

  if (
    lectii.length === 0
  ) {
    console.log("");
    console.log(
      "Nu exista lectii de generat pentru selectia curenta."
    );
    return;
  }

  /*
   * De aici inainte avem nevoie de Ollama.
   */
  await verificaOllama(
    argumente.model
  );

  console.log("");
  console.log(
    "✓ Ollama disponibil."
  );

  const raport =
    incarcaRaport();

  const rezultate = [];
  const erori = [];

  for (
    const lectie
    of lectii
  ) {
    try {
      const rezultat =
        await genereazaLectie(
          lectie,
          argumente
        );

      rezultate.push(
        rezultat
      );

      adaugaRulareRaport(
        raport,
        {
          slug:
            lectie.slug,

          status:
            rezultat.status,

          cale:
            rezultat.cale,

          model:
            argumente.model,

          dryRun:
            argumente.dryRun,
        }
      );

      salveazaRaport(
        raport
      );
    } catch (eroare) {
      const detaliu =
        eroare instanceof Error
          ? eroare.message
          : String(eroare);

      erori.push({
        slug:
          lectie.slug,
        eroare:
          detaliu,
      });

      console.log("");
      console.log(
        `✗ EROARE ${lectie.slug}`
      );

      console.log(
        detaliu
      );

      adaugaRulareRaport(
        raport,
        {
          slug:
            lectie.slug,

          status:
            "eroare",

          eroare:
            detaliu,

          model:
            argumente.model,

          dryRun:
            argumente.dryRun,
        }
      );

      salveazaRaport(
        raport
      );

      /*
       * Pentru un singur slug,
       * nu are sens sa continuam.
       */
      if (
        argumente.slug
      ) {
        break;
      }
    }
  }

  titlu(
    "REZUMAT"
  );

  const generate =
    rezultate.filter(
      (rezultat) =>
        rezultat.status ===
        "draft-generat"
    ).length;

  const dryRunValide =
    rezultate.filter(
      (rezultat) =>
        rezultat.status ===
        "dry-run-valid"
    ).length;

  console.log(
    `Generate draft: ${generate}`
  );

  if (
    argumente.dryRun
  ) {
    console.log(
      `Dry-run valide: ${dryRunValide}`
    );
  }

  console.log(
    `Erori: ${erori.length}`
  );

  if (
    erori.length > 0
  ) {
    console.log("");

    console.log(
      "Lectii cu erori:"
    );

    for (
      const element
      of erori
    ) {
      console.log(
        `- ${element.slug}`
      );
    }
  }

  console.log("");
  console.log(
    "IMPORTANT:"
  );

  console.log(
    "- Generatorul NU modifica registrul data/continut/index.ts."
  );

  console.log(
    "- Generatorul NU publica automat."
  );

  console.log(
    "- Toate cele 4 verificari raman false."
  );

  console.log(
    "- Continutul matematic trebuie verificat separat."
  );

  if (
    erori.length > 0
  ) {
    process.exitCode = 1;
  }
}

/* =========================================================
   PORNIRE
========================================================= */

main().catch(
  (eroare) => {
    console.error("");
    console.error(
      "EROARE FATALA:"
    );

    console.error(
      eroare instanceof Error
        ? eroare.stack ??
            eroare.message
        : String(eroare)
    );

    process.exitCode = 1;
  }
);