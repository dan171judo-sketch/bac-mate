import fs from "node:fs";
import path from "node:path";
import OpenAI from "openai";

/* =========================================================
   BAC MATE
   GENERATOR AI CONTENT ENGINE V3

   REGULI CRITICE:

   - catalogul canonic vine EXCLUSIV din:
     data/continut/catalog-content-engine.json

   - AI-ul NU decide slug-ul
   - AI-ul NU decide modulul
   - AI-ul NU decide numărul lecției
   - AI-ul NU marchează lecția verificată
   - AI-ul NU marchează lecția publicabilă
   - NU suprascriem fișiere existente
   - rezultatul inițial este întotdeauna DRAFT

   Flux:
   catalog canonic
   -> selecție
   -> AI draft
   -> validare structurală locală
   -> fișier .ts
   -> content:check
   -> verificări umane / separate ulterior
========================================================= */

/* =========================================================
   CĂI
========================================================= */

const ROOT =
  process.cwd();

const DIRECTOR_DATA =
  path.join(
    ROOT,
    "data"
  );

const DIRECTOR_CONTINUT =
  path.join(
    DIRECTOR_DATA,
    "continut"
  );

const DIRECTOR_LECTII_CONTINUT =
  path.join(
    DIRECTOR_CONTINUT,
    "lectii"
  );

const DIRECTOR_PILOT =
  path.join(
    DIRECTOR_CONTINUT,
    "pilot-v1"
  );

const CALE_CATALOG =
  path.join(
    DIRECTOR_CONTINUT,
    "catalog-content-engine.json"
  );

const DIRECTOR_STARE =
  path.join(
    DIRECTOR_CONTINUT,
    "generator-ai"
  );

const CALE_STARE =
  path.join(
    DIRECTOR_STARE,
    "stare-generare.json"
  );

const CALE_RAPORT =
  path.join(
    DIRECTOR_STARE,
    "raport-generare.json"
  );

const CALE_ENV =
  path.join(
    ROOT,
    ".env.local"
  );

/* =========================================================
   CONSTANTE
========================================================= */

const NUMAR_LECTII_ASTEPTAT =
  219;

const NUMAR_VIDEO =
  4;

const MINIM_EXERCITII =
  5;

const MODEL_IMPLICIT =
  "gpt-5.6-terra";

const MAX_INCERCARI =
  3;

const PAUZA_RETRY_MS =
  5000;

/* =========================================================
   UTILITARE
========================================================= */

function titlu(text) {
  console.log("");
  console.log(
    "=".repeat(72)
  );
  console.log(text);
  console.log(
    "=".repeat(72)
  );
}

function exista(cale) {
  return fs.existsSync(
    cale
  );
}

function asiguraDirector(
  cale
) {
  fs.mkdirSync(
    cale,
    {
      recursive: true,
    }
  );
}

function citesteText(
  cale
) {
  return fs.readFileSync(
    cale,
    "utf8"
  );
}

function citesteJson(
  cale
) {
  return JSON.parse(
    citesteText(
      cale
    )
  );
}

function scrieJson(
  cale,
  obiect
) {
  asiguraDirector(
    path.dirname(
      cale
    )
  );

  fs.writeFileSync(
    cale,
    JSON.stringify(
      obiect,
      null,
      2
    ) + "\n",
    "utf8"
  );
}

function asteapta(ms) {
  return new Promise(
    (resolve) =>
      setTimeout(
        resolve,
        ms
      )
  );
}

function dataIso() {
  return new Date()
    .toISOString();
}

/* =========================================================
   .ENV.LOCAL

   Nu afișăm niciodată cheia API.
========================================================= */

function incarcaEnvLocal() {
  if (
    !exista(
      CALE_ENV
    )
  ) {
    return;
  }

  const text =
    citesteText(
      CALE_ENV
    );

  const linii =
    text.split(
      /\r?\n/
    );

  for (
    const linieBruta of
    linii
  ) {
    const linie =
      linieBruta.trim();

    if (
      !linie ||
      linie.startsWith(
        "#"
      )
    ) {
      continue;
    }

    const pozitie =
      linie.indexOf(
        "="
      );

    if (
      pozitie <= 0
    ) {
      continue;
    }

    const cheie =
      linie
        .slice(
          0,
          pozitie
        )
        .trim();

    let valoare =
      linie
        .slice(
          pozitie + 1
        )
        .trim();

    if (
      (
        valoare.startsWith(
          '"'
        ) &&
        valoare.endsWith(
          '"'
        )
      ) ||
      (
        valoare.startsWith(
          "'"
        ) &&
        valoare.endsWith(
          "'"
        )
      )
    ) {
      valoare =
        valoare.slice(
          1,
          -1
        );
    }

    if (
      !process.env[
        cheie
      ]
    ) {
      process.env[
        cheie
      ] =
        valoare;
    }
  }
}

incarcaEnvLocal();

/* =========================================================
   ARGUMENTE CLI
========================================================= */

function citesteArgumente() {
  const argumente =
    process.argv.slice(
      2
    );

  const rezultat = {
    dryRun:
      false,

    all:
      false,

    limit:
      null,

    slug:
      null,
  };

  for (
    const argument of
    argumente
  ) {
    if (
      argument ===
      "--dry-run"
    ) {
      rezultat.dryRun =
        true;

      continue;
    }

    if (
      argument ===
      "--all"
    ) {
      rezultat.all =
        true;

      continue;
    }

    if (
      argument.startsWith(
        "--limit="
      )
    ) {
      const valoare =
        Number(
          argument.slice(
            "--limit=".length
          )
        );

      if (
        Number.isInteger(
          valoare
        ) &&
        valoare > 0
      ) {
        rezultat.limit =
          valoare;
      }

      continue;
    }

    if (
      argument.startsWith(
        "--slug="
      )
    ) {
      const valoare =
        argument
          .slice(
            "--slug=".length
          )
          .trim();

      if (
        valoare
      ) {
        rezultat.slug =
          valoare;
      }
    }
  }

  return rezultat;
}

/* =========================================================
   CATALOG CANONIC
========================================================= */

function incarcaCatalog() {
  if (
    !exista(
      CALE_CATALOG
    )
  ) {
    throw new Error(
      [
        "Lipsește catalog-content-engine.json.",
        "Rulează mai întâi:",
        "npm.cmd run content:generate",
      ].join(
        "\n"
      )
    );
  }

  const document =
    citesteJson(
      CALE_CATALOG
    );

  if (
    !document ||
    !Array.isArray(
      document.lectii
    )
  ) {
    throw new Error(
      "Format invalid pentru catalog-content-engine.json."
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

  const sluguri =
    new Set();

  const pozitii =
    new Set();

  for (
    const lectie of
    lectii
  ) {
    if (
      typeof lectie.slug !==
        "string" ||
      !lectie.slug.trim()
    ) {
      throw new Error(
        "Catalogul conține o lecție fără slug valid."
      );
    }

    if (
      sluguri.has(
        lectie.slug
      )
    ) {
      throw new Error(
        `Slug duplicat în catalog: ${lectie.slug}`
      );
    }

    sluguri.add(
      lectie.slug
    );

    const pozitie =
      `${lectie.modul}:${lectie.numarLectie}`;

    if (
      pozitii.has(
        pozitie
      )
    ) {
      throw new Error(
        `Poziție duplicată în catalog: ${pozitie}`
      );
    }

    pozitii.add(
      pozitie
    );
  }

  if (
    sluguri.size !==
      NUMAR_LECTII_ASTEPTAT ||
    pozitii.size !==
      NUMAR_LECTII_ASTEPTAT
  ) {
    throw new Error(
      "Gate catalog invalid: slug-uri sau poziții ne-unice."
    );
  }

  return lectii;
}

/* =========================================================
   CONTENT ENGINE EXISTENT
========================================================= */

function lectiiExistente() {
  if (
    !exista(
      DIRECTOR_LECTII_CONTINUT
    )
  ) {
    return new Set();
  }

  return new Set(
    fs
      .readdirSync(
        DIRECTOR_LECTII_CONTINUT
      )
      .filter(
        (nume) =>
          nume.endsWith(
            ".ts"
          )
      )
      .map(
        (nume) =>
          nume.replace(
            /\.ts$/,
            ""
          )
      )
  );
}

/* =========================================================
   PLAN PILOT OPȚIONAL

   Îl folosim ca metadată internă, nu ca sursă matematică.
========================================================= */

function citestePlanPilot(
  slug
) {
  const cale =
    path.join(
      DIRECTOR_PILOT,
      `${slug}.json`
    );

  if (
    !exista(
      cale
    )
  ) {
    return null;
  }

  try {
    return citesteJson(
      cale
    );
  } catch {
    return null;
  }
}

/* =========================================================
   SELECȚIE
========================================================= */

function selecteazaLectii(
  catalog,
  existente,
  argumente
) {
  if (
    argumente.slug
  ) {
    const gasita =
      catalog.find(
        (lectie) =>
          lectie.slug ===
          argumente.slug
      );

    if (
      !gasita
    ) {
      throw new Error(
        `Slug inexistent în catalog: ${argumente.slug}`
      );
    }

    if (
      existente.has(
        gasita.slug
      )
    ) {
      throw new Error(
        `Lecția există deja și nu va fi suprascrisă: ${gasita.slug}`
      );
    }

    return [
      gasita,
    ];
  }

  const lipsa =
    catalog.filter(
      (lectie) =>
        !existente.has(
          lectie.slug
        )
    );

  if (
    argumente.all
  ) {
    return lipsa;
  }

  if (
    argumente.limit
  ) {
    return lipsa.slice(
      0,
      argumente.limit
    );
  }

  /*
   * Fără argument explicit generăm maximum o lecție.
   * Este intenționat.
   */
  return lipsa.slice(
    0,
    1
  );
}

/* =========================================================
   STARE / RESUME
========================================================= */

function stareInitiala() {
  return {
    versiune:
      "BAC-MATE-GENERATOR-AI-V3",

    actualizatLa:
      dataIso(),

    finalizate:
      [],

    esuate:
      [],
  };
}

function incarcaStare() {
  if (
    !exista(
      CALE_STARE
    )
  ) {
    return stareInitiala();
  }

  try {
    const stare =
      citesteJson(
        CALE_STARE
      );

    if (
      !Array.isArray(
        stare.finalizate
      )
    ) {
      stare.finalizate =
        [];
    }

    if (
      !Array.isArray(
        stare.esuate
      )
    ) {
      stare.esuate =
        [];
    }

    return stare;
  } catch {
    return stareInitiala();
  }
}

function salveazaStare(
  stare
) {
  stare.actualizatLa =
    dataIso();

  scrieJson(
    CALE_STARE,
    stare
  );
}

/* =========================================================
   IDENTIFICATOR TYPESCRIPT
========================================================= */

function faraDiacritice(
  text
) {
  return String(
    text ?? ""
  )
    .normalize(
      "NFD"
    )
    .replace(
      /[\u0300-\u036f]/g,
      ""
    );
}

function slugLaPascalCase(
  slug
) {
  return faraDiacritice(
    slug
  )
    .split(
      /[^a-zA-Z0-9]+/
    )
    .filter(
      Boolean
    )
    .map(
      (parte) =>
        parte.charAt(
          0
        ).toUpperCase() +
        parte.slice(
          1
        )
    )
    .join(
      ""
    );
}

function numeExportPentruSlug(
  slug
) {
  return `continut${slugLaPascalCase(
    slug
  )}`;
}

/* =========================================================
   PROMPT
========================================================= */

function construiestePrompt(
  lectie
) {
  const plan =
    citestePlanPilot(
      lectie.slug
    );

  const contextPlan =
    plan
      ? JSON.stringify(
          {
            slug:
              plan.slug,

            modul:
              plan.modul,

            numarLectie:
              plan.numarLectie,

            titlu:
              plan.titlu,

            clasa:
              plan.clasa,

            numeModul:
              plan.numeModul,
          },
          null,
          2
        )
      : "Nu există plan pilot suplimentar.";

  return `
Ești motorul de redactare DRAFT pentru BAC MATE, platformă educațională de matematică pentru Bacalaureat, profil M_mate-info.

IMPORTANT:
Rezultatul tău NU reprezintă verificare matematică oficială, NU reprezintă verificarea programei și NU poate fi publicat automat.

DATE CANONICE ALE LECȚIEI — NU LE MODIFICA:

slug: ${lectie.slug}
modul: ${lectie.modul}
numarLectie: ${lectie.numarLectie}
titlu: ${lectie.titlu}
clasa catalog: ${lectie.clasa ?? "necunoscută"}
nume modul: ${lectie.numeModul ?? "necunoscut"}

Context intern disponibil:
${contextPlan}

Trebuie să construiești un obiect JSON complet pentru tipul ContinutLectie.

REGULI ABSOLUTE:

1. slug trebuie să fie EXACT:
"${lectie.slug}"

2. modul trebuie să fie EXACT:
${lectie.modul}

3. numarLectie trebuie să fie EXACT:
${lectie.numarLectie}

4. profil trebuie să fie EXACT:
"M_mate-info"

5. verificare.status trebuie să fie EXACT:
"draft"

6. Toate acestea trebuie să fie false:
verificatMatematic
verificatPrograma
verificatExercitii
verificatLimbaRomana

7. Nu afirma că materialul a fost verificat oficial.

8. Nu inventa numere de subiecte oficiale, ani, bareme sau citate oficiale.

9. La "surse", pentru acest draft folosește doar:
{
  "tip": "verificare-interna",
  "titlu": "Draft pedagogic BAC MATE",
  "observatie": "Conținut generat ca draft; necesită verificare matematică, curriculară, a exercițiilor și a limbii române înainte de publicare."
}

10. Construiește EXACT 4 videoLectii:

Video 1:
- numar 1
- rol: intuiție și concept
- durataMinute 4

Video 2:
- numar 2
- rol: reguli și metodă
- durataMinute 5

Video 3:
- numar 3
- rol: exemplu complet rezolvat
- durataMinute 5

Video 4:
- numar 4
- rol: tip Bac / aplicații / greșeli frecvente
- durataMinute 5

11. Scenariile video trebuie să fie suficient de dezvoltate pentru durata indicată.
Scrie natural în limba română.
Nu transforma scenariul într-o listă de propoziții foarte scurte.

12. Fiecare video trebuie să conțină:
- id
- numar
- titlu
- durataMinute
- descriere
- scenariu: array de paragrafe
- ideiDeRetinut
- exemplu cu titlu, enunt, rezolvareScurta, raspuns
- verificareRapida cu întrebare, 4 variante, index răspuns corect 0-3, explicație

13. Include minimum:
- 3 obiective
- 4 termeniCheie
- definițiile necesare
- minimum 3 secțiuni de teorie
- formule relevante, dacă lecția are formule
- minimum 3 exempleRezolvate
- minimum 4 greseliFrecvente
- minimum 8 exercitii
- rezumat
- legaturaCuBac

14. Exercițiile trebuie să aibă rezolvare reală, pas cu pas, nu doar răspuns.

15. Pentru alegere-multipla:
- variante trebuie să existe
- răspunsul corect trebuie să coincidă cu una dintre variante.

16. Pentru raspuns-scurt și rezolvare-completa:
- variante poate lipsi.

17. Folosește nivelurile permise:
"fundament"
"standard-bac"
"avansat"

18. Folosește tipurile de exerciții permise:
"alegere-multipla"
"raspuns-scurt"
"rezolvare-completa"

19. Nu include proprietăți care nu fac parte din structura cerută.

20. Nu utiliza Markdown în răspuns.
Nu pune \`\`\`json.
Răspunde EXCLUSIV cu obiectul JSON valid.

STRUCTURA OBLIGATORIE:

{
  "id": "string",
  "slug": "${lectie.slug}",
  "modul": ${lectie.modul},
  "numarLectie": ${lectie.numarLectie},
  "clasa": "string",
  "profil": "M_mate-info",
  "titlu": "string",
  "subtitlu": "string",
  "descriere": "string",
  "nivelPrincipal": "fundament | standard-bac | avansat",
  "durataEstimataMinute": number,
  "prerechizite": ["string"],
  "obiective": ["string"],
  "termeniCheie": ["string"],

  "videoLectii": [
    {
      "id": "string",
      "numar": 1,
      "titlu": "string",
      "durataMinute": 4,
      "descriere": "string",
      "scenariu": ["string"],
      "ideiDeRetinut": ["string"],
      "exemplu": {
        "titlu": "string",
        "enunt": "string",
        "rezolvareScurta": ["string"],
        "raspuns": "string"
      },
      "verificareRapida": {
        "intrebare": "string",
        "variante": ["string", "string", "string", "string"],
        "raspunsCorect": 0,
        "explicatie": "string"
      }
    }
  ],

  "definitii": [
    {
      "termen": "string",
      "definitie": "string",
      "observatie": "string"
    }
  ],

  "teorie": [
    {
      "id": "string",
      "titlu": "string",
      "explicatie": "string",
      "ideiCheie": ["string"]
    }
  ],

  "formule": [
    {
      "id": "string",
      "nume": "string",
      "formula": "string",
      "explicatie": "string",
      "conditii": ["string"],
      "exempluScurt": "string"
    }
  ],

  "exempleRezolvate": [
    {
      "id": "string",
      "titlu": "string",
      "enunt": "string",
      "nivel": "fundament | standard-bac | avansat",
      "pasi": [
        {
          "numar": 1,
          "titlu": "string",
          "continut": "string"
        }
      ],
      "raspunsFinal": "string",
      "verificare": "string"
    }
  ],

  "greseliFrecvente": [
    {
      "greseala": "string",
      "deCeEsteGresit": "string",
      "cumOEviti": "string"
    }
  ],

  "exercitii": [
    {
      "id": "string",
      "nivel": "fundament | standard-bac | avansat",
      "tip": "alegere-multipla | raspuns-scurt | rezolvare-completa",
      "enunt": "string",
      "variante": ["string"],
      "raspunsCorect": "string",
      "rezolvare": [
        {
          "numar": 1,
          "titlu": "string",
          "continut": "string"
        }
      ],
      "explicatieFinala": "string",
      "punctaj": 1,
      "competenta": "string",
      "gresealaFrecventa": "string"
    }
  ],

  "rezumat": {
    "ideiDeRetinut": ["string"],
    "formuleDeRetinut": ["string"],
    "checklistElev": ["string"]
  },

  "legaturaCuBac": {
    "importanta": "string",
    "tipuriCerinte": ["string"],
    "strategie": ["string"]
  },

  "surse": [
    {
      "tip": "verificare-interna",
      "titlu": "Draft pedagogic BAC MATE",
      "observatie": "Conținut generat ca draft; necesită verificare matematică, curriculară, a exercițiilor și a limbii române înainte de publicare."
    }
  ],

  "verificare": {
    "status": "draft",
    "verificatMatematic": false,
    "verificatPrograma": false,
    "verificatExercitii": false,
    "verificatLimbaRomana": false,
    "observatii": [
      "Draft generat automat. Nu este publicabil înainte de verificările obligatorii."
    ]
  }
}
`.trim();
}

/* =========================================================
   EXTRAGERE JSON DIN RĂSPUNS
========================================================= */

function extrageJson(
  text
) {
  let curat =
    String(
      text ?? ""
    ).trim();

  curat =
    curat
      .replace(
        /^```json\s*/i,
        ""
      )
      .replace(
        /^```\s*/i,
        ""
      )
      .replace(
        /\s*```$/,
        ""
      )
      .trim();

  const primul =
    curat.indexOf(
      "{"
    );

  const ultimul =
    curat.lastIndexOf(
      "}"
    );

  if (
    primul === -1 ||
    ultimul === -1 ||
    ultimul <= primul
  ) {
    throw new Error(
      "Răspunsul AI nu conține un obiect JSON."
    );
  }

  const fragment =
    curat.slice(
      primul,
      ultimul + 1
    );

  try {
    return JSON.parse(
      fragment
    );
  } catch (
    eroare
  ) {
    throw new Error(
      `JSON invalid primit de la AI: ${
        eroare instanceof Error
          ? eroare.message
          : String(
              eroare
            )
      }`
    );
  }
}

/* =========================================================
   VALIDATOARE
========================================================= */

function esteString(
  valoare
) {
  return (
    typeof valoare ===
      "string" &&
    valoare.trim().length >
      0
  );
}

function esteArrayNevid(
  valoare
) {
  return (
    Array.isArray(
      valoare
    ) &&
    valoare.length >
      0
  );
}

function valideazaPasi(
  pasi,
  context
) {
  const erori =
    [];

  if (
    !esteArrayNevid(
      pasi
    )
  ) {
    erori.push(
      `${context}: lipsesc pașii.`
    );

    return erori;
  }

  pasi.forEach(
    (
      pas,
      index
    ) => {
      if (
        !Number.isInteger(
          pas?.numar
        )
      ) {
        erori.push(
          `${context}: pasul ${index + 1} nu are număr valid.`
        );
      }

      if (
        !esteString(
          pas?.titlu
        )
      ) {
        erori.push(
          `${context}: pasul ${index + 1} nu are titlu.`
        );
      }

      if (
        !esteString(
          pas?.continut
        )
      ) {
        erori.push(
          `${context}: pasul ${index + 1} nu are conținut.`
        );
      }
    }
  );

  return erori;
}

function valideazaContinut(
  continut,
  lectieCanonica
) {
  const erori =
    [];

  if (
    !continut ||
    typeof continut !==
      "object"
  ) {
    return [
      "Conținutul nu este obiect.",
    ];
  }

  if (
    continut.slug !==
    lectieCanonica.slug
  ) {
    erori.push(
      `Slug modificat de AI: "${continut.slug}" în loc de "${lectieCanonica.slug}".`
    );
  }

  if (
    continut.modul !==
    lectieCanonica.modul
  ) {
    erori.push(
      `Modul invalid: ${continut.modul}.`
    );
  }

  if (
    continut.numarLectie !==
    lectieCanonica.numarLectie
  ) {
    erori.push(
      `Număr lecție invalid: ${continut.numarLectie}.`
    );
  }

  if (
    continut.profil !==
    "M_mate-info"
  ) {
    erori.push(
      "Profilul trebuie să fie M_mate-info."
    );
  }

  if (
    !esteString(
      continut.id
    )
  ) {
    erori.push(
      "id lipsă."
    );
  }

  if (
    !esteString(
      continut.titlu
    )
  ) {
    erori.push(
      "titlu lipsă."
    );
  }

  if (
    !esteString(
      continut.subtitlu
    )
  ) {
    erori.push(
      "subtitlu lipsă."
    );
  }

  if (
    !esteString(
      continut.descriere
    )
  ) {
    erori.push(
      "descriere lipsă."
    );
  }

  const niveluri =
    new Set([
      "fundament",
      "standard-bac",
      "avansat",
    ]);

  if (
    !niveluri.has(
      continut.nivelPrincipal
    )
  ) {
    erori.push(
      "nivelPrincipal invalid."
    );
  }

  if (
    !esteArrayNevid(
      continut.obiective
    ) ||
    continut.obiective.length <
      3
  ) {
    erori.push(
      "Sunt necesare minimum 3 obiective."
    );
  }

  if (
    !esteArrayNevid(
      continut.termeniCheie
    ) ||
    continut.termeniCheie.length <
      4
  ) {
    erori.push(
      "Sunt necesari minimum 4 termeni-cheie."
    );
  }

  /* =======================================================
     VIDEO
  ======================================================= */

  if (
    !Array.isArray(
      continut.videoLectii
    ) ||
    continut.videoLectii.length !==
      NUMAR_VIDEO
  ) {
    erori.push(
      "Trebuie să existe exact 4 videoLectii."
    );
  } else {
    const durate = [
      4,
      5,
      5,
      5,
    ];

    continut.videoLectii.forEach(
      (
        video,
        index
      ) => {
        const numar =
          index + 1;

        if (
          video?.numar !==
          numar
        ) {
          erori.push(
            `Video ${numar}: număr invalid.`
          );
        }

        if (
          video?.durataMinute !==
          durate[index]
        ) {
          erori.push(
            `Video ${numar}: durata trebuie să fie ${durate[index]} minute.`
          );
        }

        if (
          !esteString(
            video?.id
          )
        ) {
          erori.push(
            `Video ${numar}: id lipsă.`
          );
        }

        if (
          !esteString(
            video?.titlu
          )
        ) {
          erori.push(
            `Video ${numar}: titlu lipsă.`
          );
        }

        if (
          !esteString(
            video?.descriere
          )
        ) {
          erori.push(
            `Video ${numar}: descriere lipsă.`
          );
        }

        if (
          !esteArrayNevid(
            video?.scenariu
          )
        ) {
          erori.push(
            `Video ${numar}: scenariu lipsă.`
          );
        }

        if (
          !esteArrayNevid(
            video?.ideiDeRetinut
          )
        ) {
          erori.push(
            `Video ${numar}: ideiDeRetinut lipsă.`
          );
        }

        if (
          !video?.exemplu ||
          !esteString(
            video.exemplu.titlu
          ) ||
          !esteString(
            video.exemplu.enunt
          ) ||
          !esteArrayNevid(
            video.exemplu
              .rezolvareScurta
          ) ||
          !esteString(
            video.exemplu.raspuns
          )
        ) {
          erori.push(
            `Video ${numar}: exemplu incomplet.`
          );
        }

        const rapid =
          video
            ?.verificareRapida;

        if (
          !rapid ||
          !esteString(
            rapid.intrebare
          ) ||
          !Array.isArray(
            rapid.variante
          ) ||
          rapid.variante.length !==
            4 ||
          !Number.isInteger(
            rapid.raspunsCorect
          ) ||
          rapid.raspunsCorect <
            0 ||
          rapid.raspunsCorect >
            3 ||
          !esteString(
            rapid.explicatie
          )
        ) {
          erori.push(
            `Video ${numar}: verificareRapida invalidă.`
          );
        }
      }
    );
  }

  /* =======================================================
     TEORIE
  ======================================================= */

  if (
    !Array.isArray(
      continut.teorie
    ) ||
    continut.teorie.length <
      3
  ) {
    erori.push(
      "Sunt necesare minimum 3 secțiuni de teorie."
    );
  }

  if (
    !Array.isArray(
      continut.definitii
    )
  ) {
    erori.push(
      "definitii trebuie să fie array."
    );
  }

  if (
    !Array.isArray(
      continut.formule
    )
  ) {
    erori.push(
      "formule trebuie să fie array."
    );
  }

  /* =======================================================
     EXEMPLE
  ======================================================= */

  if (
    !Array.isArray(
      continut.exempleRezolvate
    ) ||
    continut.exempleRezolvate.length <
      3
  ) {
    erori.push(
      "Sunt necesare minimum 3 exemple rezolvate."
    );
  } else {
    continut.exempleRezolvate.forEach(
      (
        exemplu,
        index
      ) => {
        erori.push(
          ...valideazaPasi(
            exemplu?.pasi,
            `Exemplul ${index + 1}`
          )
        );

        if (
          !niveluri.has(
            exemplu?.nivel
          )
        ) {
          erori.push(
            `Exemplul ${index + 1}: nivel invalid.`
          );
        }

        if (
          !esteString(
            exemplu?.raspunsFinal
          )
        ) {
          erori.push(
            `Exemplul ${index + 1}: răspuns final lipsă.`
          );
        }
      }
    );
  }

  /* =======================================================
     GREȘELI
  ======================================================= */

  if (
    !Array.isArray(
      continut.greseliFrecvente
    ) ||
    continut.greseliFrecvente.length <
      4
  ) {
    erori.push(
      "Sunt necesare minimum 4 greșeli frecvente."
    );
  }

  /* =======================================================
     EXERCIȚII
  ======================================================= */

  const tipuriExercitii =
    new Set([
      "alegere-multipla",
      "raspuns-scurt",
      "rezolvare-completa",
    ]);

  if (
    !Array.isArray(
      continut.exercitii
    ) ||
    continut.exercitii.length <
      MINIM_EXERCITII
  ) {
    erori.push(
      `Sunt necesare minimum ${MINIM_EXERCITII} exerciții.`
    );
  } else {
    const iduri =
      new Set();

    continut.exercitii.forEach(
      (
        exercitiu,
        index
      ) => {
        const context =
          `Exercițiul ${index + 1}`;

        if (
          !esteString(
            exercitiu?.id
          )
        ) {
          erori.push(
            `${context}: id lipsă.`
          );
        } else if (
          iduri.has(
            exercitiu.id
          )
        ) {
          erori.push(
            `${context}: id duplicat ${exercitiu.id}.`
          );
        } else {
          iduri.add(
            exercitiu.id
          );
        }

        if (
          !niveluri.has(
            exercitiu?.nivel
          )
        ) {
          erori.push(
            `${context}: nivel invalid.`
          );
        }

        if (
          !tipuriExercitii.has(
            exercitiu?.tip
          )
        ) {
          erori.push(
            `${context}: tip invalid.`
          );
        }

        if (
          !esteString(
            exercitiu?.enunt
          )
        ) {
          erori.push(
            `${context}: enunț lipsă.`
          );
        }

        if (
          !esteString(
            exercitiu?.raspunsCorect
          )
        ) {
          erori.push(
            `${context}: răspunsCorect lipsă.`
          );
        }

        erori.push(
          ...valideazaPasi(
            exercitiu?.rezolvare,
            context
          )
        );

        if (
          exercitiu?.tip ===
          "alegere-multipla"
        ) {
          if (
            !Array.isArray(
              exercitiu.variante
            ) ||
            exercitiu.variante.length <
              2
          ) {
            erori.push(
              `${context}: variante lipsă pentru alegere multiplă.`
            );
          } else if (
            !exercitiu.variante.includes(
              exercitiu.raspunsCorect
            )
          ) {
            erori.push(
              `${context}: răspunsul corect nu apare în variante.`
            );
          }
        }
      }
    );
  }

  /* =======================================================
     REZUMAT
  ======================================================= */

  if (
    !continut.rezumat ||
    !esteArrayNevid(
      continut.rezumat
        .ideiDeRetinut
    ) ||
    !Array.isArray(
      continut.rezumat
        .formuleDeRetinut
    ) ||
    !esteArrayNevid(
      continut.rezumat
        .checklistElev
    )
  ) {
    erori.push(
      "Rezumat incomplet."
    );
  }

  /* =======================================================
     BAC
  ======================================================= */

  if (
    !continut.legaturaCuBac ||
    !esteString(
      continut.legaturaCuBac
        .importanta
    ) ||
    !esteArrayNevid(
      continut.legaturaCuBac
        .tipuriCerinte
    ) ||
    !esteArrayNevid(
      continut.legaturaCuBac
        .strategie
    )
  ) {
    erori.push(
      "legaturaCuBac incompletă."
    );
  }

  /* =======================================================
     SURSE
  ======================================================= */

  if (
    !Array.isArray(
      continut.surse
    ) ||
    continut.surse.length <
      1
  ) {
    erori.push(
      "surse lipsă."
    );
  } else {
    for (
      const sursa of
      continut.surse
    ) {
      if (
        sursa?.tip !==
        "verificare-interna"
      ) {
        erori.push(
          "Generatorul AI draft nu are voie să declare surse oficiale automat."
        );
      }
    }
  }

  /* =======================================================
     VERIFICARE — GATE DE SIGURANȚĂ
  ======================================================= */

  const verificare =
    continut.verificare;

  if (
    !verificare
  ) {
    erori.push(
      "verificare lipsește."
    );
  } else {
    if (
      verificare.status !==
      "draft"
    ) {
      erori.push(
        "status trebuie să fie draft."
      );
    }

    if (
      verificare.verificatMatematic !==
      false
    ) {
      erori.push(
        "verificatMatematic trebuie să fie false."
      );
    }

    if (
      verificare.verificatPrograma !==
      false
    ) {
      erori.push(
        "verificatPrograma trebuie să fie false."
      );
    }

    if (
      verificare.verificatExercitii !==
      false
    ) {
      erori.push(
        "verificatExercitii trebuie să fie false."
      );
    }

    if (
      verificare.verificatLimbaRomana !==
      false
    ) {
      erori.push(
        "verificatLimbaRomana trebuie să fie false."
      );
    }
  }

  return erori;
}

/* =========================================================
   FORȚARE METADATE DE SIGURANȚĂ

   Chiar dacă modelul răspunde altfel,
   aceste câmpuri sunt suprascrise local.
========================================================= */

function forteazaMetadate(
  continut,
  lectie
) {
  continut.slug =
    lectie.slug;

  continut.modul =
    lectie.modul;

  continut.numarLectie =
    lectie.numarLectie;

  continut.profil =
    "M_mate-info";

  continut.surse = [
    {
      tip:
        "verificare-interna",

      titlu:
        "Draft pedagogic BAC MATE",

      observatie:
        "Conținut generat ca draft; necesită verificare matematică, curriculară, a exercițiilor și a limbii române înainte de publicare.",
    },
  ];

  continut.verificare = {
    status:
      "draft",

    verificatMatematic:
      false,

    verificatPrograma:
      false,

    verificatExercitii:
      false,

    verificatLimbaRomana:
      false,

    observatii: [
      "Draft generat automat. Nu este publicabil înainte de verificările obligatorii.",
    ],
  };

  /*
   * Duratele sunt canonice pentru V1.
   */
  if (
    Array.isArray(
      continut.videoLectii
    ) &&
    continut.videoLectii.length ===
      4
  ) {
    const durate = [
      4,
      5,
      5,
      5,
    ];

    continut.videoLectii.forEach(
      (
        video,
        index
      ) => {
        video.numar =
          index + 1;

        video.durataMinute =
          durate[index];
      }
    );
  }

  return continut;
}

/* =========================================================
   OPENAI
========================================================= */

function creeazaClientOpenAI() {
  const apiKey =
    process.env
      .OPENAI_API_KEY;

  if (
    !apiKey
  ) {
    throw new Error(
      [
        "OPENAI_API_KEY lipsește.",
        "",
        "Adaug-o local în .env.local:",
        "OPENAI_API_KEY=cheia_ta",
        "",
        "Nu trimite cheia în chat.",
      ].join(
        "\n"
      )
    );
  }

  return new OpenAI({
    apiKey,
  });
}

function modelAles() {
  return (
    process.env
      .BAC_MATE_MODEL ||
    process.env
      .OPENAI_MODEL ||
    MODEL_IMPLICIT
  );
}

async function genereazaCuAI(
  client,
  lectie
) {
  const prompt =
    construiestePrompt(
      lectie
    );

  let ultimaEroare =
    null;

  for (
    let incercare = 1;
    incercare <=
    MAX_INCERCARI;
    incercare++
  ) {
    try {
      console.log(
        `  AI: încercarea ${incercare}/${MAX_INCERCARI}...`
      );

      const raspuns =
        await client
          .responses
          .create({
            model:
              modelAles(),

            reasoning: {
              effort:
                "high",
            },

            max_output_tokens:
              30000,

            input: [
              {
                role:
                  "system",

                content:
                  "Generezi exclusiv JSON valid pentru un draft educațional de matematică. Nu acorda niciodată statut de verificat sau publicabil.",
              },
              {
                role:
                  "user",

                content:
                  prompt,
              },
            ],
          });

      const text =
        raspuns.output_text;

      if (
        !text ||
        !text.trim()
      ) {
        throw new Error(
          "OpenAI a returnat text gol."
        );
      }

      return extrageJson(
        text
      );
    } catch (
      eroare
    ) {
      ultimaEroare =
        eroare;

      console.error(
        `  ⚠ Încercarea ${incercare} a eșuat: ${
          eroare instanceof Error
            ? eroare.message
            : String(
                eroare
              )
        }`
      );

      if (
        incercare <
        MAX_INCERCARI
      ) {
        console.log(
          `  Aștept ${PAUZA_RETRY_MS / 1000} secunde și reîncerc...`
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
      "Generarea AI a eșuat."
    )
  );
}

/* =========================================================
   SERIALIZARE TYPESCRIPT
========================================================= */

function serializeazaTs(
  continut,
  numeExport
) {
  const json =
    JSON.stringify(
      continut,
      null,
      2
    );

  return `import type { ContinutLectie } from "../tipuri";

export const ${numeExport}: ContinutLectie = ${json};
`;
}

/* =========================================================
   SCRIERE SIGURĂ
========================================================= */

function scrieLectie(
  lectie,
  continut
) {
  asiguraDirector(
    DIRECTOR_LECTII_CONTINUT
  );

  const caleFinala =
    path.join(
      DIRECTOR_LECTII_CONTINUT,
      `${lectie.slug}.ts`
    );

  if (
    exista(
      caleFinala
    )
  ) {
    throw new Error(
      `REFUZ SUPRASCRIERE: ${path.relative(
        ROOT,
        caleFinala
      )}`
    );
  }

  const numeExport =
    numeExportPentruSlug(
      lectie.slug
    );

  const cod =
    serializeazaTs(
      continut,
      numeExport
    );

  const caleTemporara =
    `${caleFinala}.tmp`;

  fs.writeFileSync(
    caleTemporara,
    cod,
    "utf8"
  );

  /*
   * Verificare minimă înainte de rename.
   */
  const scris =
    citesteText(
      caleTemporara
    );

  if (
    !scris.includes(
      `export const ${numeExport}: ContinutLectie`
    ) ||
    !scris.includes(
      `"slug": "${lectie.slug}"`
    ) ||
    !scris.includes(
      `"status": "draft"`
    )
  ) {
    fs.unlinkSync(
      caleTemporara
    );

    throw new Error(
      "Fișierul temporar nu a trecut verificarea de siguranță."
    );
  }

  fs.renameSync(
    caleTemporara,
    caleFinala
  );

  return {
    cale:
      caleFinala,

    numeExport,
  };
}

/* =========================================================
   RAPORT
========================================================= */

function construiesteRaport(
  rezultate
) {
  return {
    versiune:
      "BAC-MATE-GENERATOR-AI-V3",

    generatLa:
      dataIso(),

    model:
      modelAles(),

    rezultate,
  };
}

/* =========================================================
   MAIN
========================================================= */

async function main() {
  const argumente =
    citesteArgumente();

  titlu(
    "BAC MATE — Generator AI Content Engine V3"
  );

  console.log(
    `Model: ${modelAles()}`
  );

  console.log(
    `Mod: ${
      argumente.dryRun
        ? "DRY RUN"
        : "GENERARE"
    }`
  );

  const catalog =
    incarcaCatalog();

  console.log(
    `Catalog canonic: ${catalog.length}`
  );

  console.log(
    "✓ Gate catalog 219/219"
  );

  const existente =
    lectiiExistente();

  console.log(
    `Content Engine existent: ${existente.size}`
  );

  const selectate =
    selecteazaLectii(
      catalog,
      existente,
      argumente
    );

  titlu(
    "Selecție"
  );

  console.log(
    `Lecții selectate: ${selectate.length}`
  );

  if (
    selectate.length ===
    0
  ) {
    console.log(
      "Nu există lecții de generat."
    );

    return;
  }

  for (
    const lectie of
    selectate
  ) {
    console.log(
      `- Modul ${lectie.modul}, Lecția ${lectie.numarLectie}: ${lectie.slug}`
    );

    console.log(
      `  ${lectie.titlu}`
    );
  }

  if (
    argumente.dryRun
  ) {
    console.log("");
    console.log(
      "DRY RUN: nu s-a apelat AI și nu s-a scris niciun fișier."
    );

    return;
  }

  if (
    !argumente.slug &&
    argumente.all
  ) {
    console.log("");
    console.log(
      "ATENȚIE: --all va genera toate lecțiile lipsă."
    );

    console.log(
      "Pentru BAC MATE nu folosim --all înainte ca pilotul să treacă toate verificările."
    );
  }

  const client =
    creeazaClientOpenAI();

  const stare =
    incarcaStare();

  const rezultate =
    [];

  titlu(
    "Generare"
  );

  for (
    let index = 0;
    index <
    selectate.length;
    index++
  ) {
    const lectie =
      selectate[index];

    console.log("");
    console.log(
      `[${index + 1}/${selectate.length}] ${lectie.slug}`
    );

    const caleFinala =
      path.join(
        DIRECTOR_LECTII_CONTINUT,
        `${lectie.slug}.ts`
      );

    /*
     * Re-verificare chiar înainte de generare,
     * pentru siguranță.
     */
    if (
      exista(
        caleFinala
      )
    ) {
      console.log(
        "  ↷ SKIP: fișierul există deja."
      );

      rezultate.push({
        slug:
          lectie.slug,

        status:
          "skip-existent",
      });

      continue;
    }

    try {
      const continutBrut =
        await genereazaCuAI(
          client,
          lectie
        );

      const continut =
        forteazaMetadate(
          continutBrut,
          lectie
        );

      const erori =
        valideazaContinut(
          continut,
          lectie
        );

      if (
        erori.length >
        0
      ) {
        console.error(
          `  ✗ Draft respins: ${erori.length} probleme structurale.`
        );

        for (
          const eroare of
          erori
        ) {
          console.error(
            `    - ${eroare}`
          );
        }

        stare.esuate =
          stare.esuate.filter(
            (item) =>
              item.slug !==
              lectie.slug
          );

        stare.esuate.push({
          slug:
            lectie.slug,

          la:
            dataIso(),

          motiv:
            "validare-structurala",

          erori,
        });

        salveazaStare(
          stare
        );

        rezultate.push({
          slug:
            lectie.slug,

          status:
            "respins",

          erori,
        });

        continue;
      }

      const scris =
        scrieLectie(
          lectie,
          continut
        );

      stare.finalizate =
        stare.finalizate.filter(
          (item) =>
            item.slug !==
            lectie.slug
        );

      stare.finalizate.push({
        slug:
          lectie.slug,

        la:
          dataIso(),

        fisier:
          path.relative(
            ROOT,
            scris.cale
          ),

        export:
          scris.numeExport,
      });

      stare.esuate =
        stare.esuate.filter(
          (item) =>
            item.slug !==
            lectie.slug
        );

      salveazaStare(
        stare
      );

      console.log(
        `  ✓ Draft scris: ${path.relative(
          ROOT,
          scris.cale
        )}`
      );

      console.log(
        "  ✓ status: draft"
      );

      console.log(
        "  ✓ verificări automate forțate pe false"
      );

      rezultate.push({
        slug:
          lectie.slug,

        status:
          "generat-draft",

        fisier:
          path.relative(
            ROOT,
            scris.cale
          ),
      });
    } catch (
      eroare
    ) {
      const mesaj =
        eroare instanceof Error
          ? eroare.message
          : String(
              eroare
            );

      console.error(
        `  ✗ EROARE: ${mesaj}`
      );

      stare.esuate =
        stare.esuate.filter(
          (item) =>
            item.slug !==
            lectie.slug
        );

      stare.esuate.push({
        slug:
          lectie.slug,

        la:
          dataIso(),

        motiv:
          mesaj,
      });

      salveazaStare(
        stare
      );

      rezultate.push({
        slug:
          lectie.slug,

        status:
          "eroare",

        eroare:
          mesaj,
      });
    }
  }

  const raport =
    construiesteRaport(
      rezultate
    );

  scrieJson(
    CALE_RAPORT,
    raport
  );

  titlu(
    "Rezultat"
  );

  const generate =
    rezultate.filter(
      (item) =>
        item.status ===
        "generat-draft"
    ).length;

  const respinse =
    rezultate.filter(
      (item) =>
        item.status ===
        "respins"
    ).length;

  const erori =
    rezultate.filter(
      (item) =>
        item.status ===
        "eroare"
    ).length;

  const skip =
    rezultate.filter(
      (item) =>
        item.status ===
        "skip-existent"
    ).length;

  console.log(
    `Generate draft: ${generate}`
  );

  console.log(
    `Respinse structural: ${respinse}`
  );

  console.log(
    `Erori: ${erori}`
  );

  console.log(
    `Skip existente: ${skip}`
  );

  console.log("");
  console.log(
    `Raport: ${path.relative(
      ROOT,
      CALE_RAPORT
    )}`
  );

  console.log("");
  console.log(
    "IMPORTANT:"
  );

  console.log(
    "Un fișier generat este doar DRAFT."
  );

  console.log(
    "Nu este verificat matematic."
  );

  console.log(
    "Nu este verificat față de programă."
  );

  console.log(
    "Nu este verificat integral la exerciții."
  );

  console.log(
    "Nu este publicabil."
  );

  console.log("");
  console.log(
    "Următorul gate: npm.cmd run content:check"
  );
}

/* =========================================================
   START
========================================================= */

main().catch(
  (eroare) => {
    console.error("");
    console.error(
      "✗ GENERATOR OPRIT"
    );

    console.error(
      eroare instanceof Error
        ? eroare.stack
        : String(
            eroare
          )
    );

    process.exitCode =
      1;
  }
);