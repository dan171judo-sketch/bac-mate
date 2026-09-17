import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

const DIRECTOR_DATA = path.join(
  ROOT,
  "data"
);

const DIRECTOR_LECTII = path.join(
  DIRECTOR_DATA,
  "lectii"
);

const DIRECTOR_CONTINUT = path.join(
  DIRECTOR_DATA,
  "continut",
  "lectii"
);

const DIRECTOR_PLANURI = path.join(
  DIRECTOR_DATA,
  "continut",
  "pilot-v1"
);

const BENCHMARK_SLUG =
  "m5-vectori-in-plan";

const NUMAR_LECTII_ASTEPTAT =
  219;

const NUMAR_LECTII_PILOT =
  5;

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

function citeste(cale) {
  return fs.readFileSync(
    cale,
    "utf8"
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

function slugify(text) {
  return String(
    text ?? ""
  )
    .normalize("NFD")
    .replace(
      /[\u0300-\u036f]/g,
      ""
    )
    .replace(
      /['’]/g,
      ""
    )
    .toLowerCase()
    .replace(
      /[^a-z0-9]+/g,
      "-"
    )
    .replace(
      /^-+|-+$/g,
      ""
    );
}

/* =========================================================
   PARSER BALANSAT
========================================================= */

function gasesteFinalBalansat(
  text,
  start,
  deschidere,
  inchidere
) {
  let adancime = 0;

  let inString = false;
  let delimitator = "";
  let escape = false;

  let comentariuLinie =
    false;

  let comentariuBloc =
    false;

  for (
    let i = start;
    i < text.length;
    i++
  ) {
    const c =
      text[i];

    const urmator =
      text[i + 1];

    if (
      comentariuLinie
    ) {
      if (
        c === "\n"
      ) {
        comentariuLinie =
          false;
      }

      continue;
    }

    if (
      comentariuBloc
    ) {
      if (
        c === "*" &&
        urmator === "/"
      ) {
        comentariuBloc =
          false;

        i++;
      }

      continue;
    }

    if (
      inString
    ) {
      if (
        escape
      ) {
        escape =
          false;
        continue;
      }

      if (
        c === "\\"
      ) {
        escape =
          true;
        continue;
      }

      if (
        c ===
        delimitator
      ) {
        inString =
          false;

        delimitator =
          "";
      }

      continue;
    }

    if (
      c === "/" &&
      urmator === "/"
    ) {
      comentariuLinie =
        true;

      i++;

      continue;
    }

    if (
      c === "/" &&
      urmator === "*"
    ) {
      comentariuBloc =
        true;

      i++;

      continue;
    }

    if (
      c === '"' ||
      c === "'" ||
      c === "`"
    ) {
      inString =
        true;

      delimitator =
        c;

      continue;
    }

    if (
      c ===
      deschidere
    ) {
      adancime++;
      continue;
    }

    if (
      c ===
      inchidere
    ) {
      adancime--;

      if (
        adancime === 0
      ) {
        return i;
      }
    }
  }

  return -1;
}

function extrageBloc(
  text,
  pozitie,
  deschidere,
  inchidere
) {
  const start =
    text.indexOf(
      deschidere,
      pozitie
    );

  if (
    start === -1
  ) {
    return null;
  }

  const final =
    gasesteFinalBalansat(
      text,
      start,
      deschidere,
      inchidere
    );

  if (
    final === -1
  ) {
    return null;
  }

  return {
    start,
    final,
    text:
      text.slice(
        start,
        final + 1
      ),
  };
}

/* =========================================================
   EXTRAGERE CÂMPURI SIMPLE
========================================================= */

function extrageString(
  bloc,
  camp
) {
  const expresie =
    new RegExp(
      `${camp}\\s*:\\s*["'\`]([^"'\\\`]+)["'\`]`
    );

  const gasit =
    bloc.match(
      expresie
    );

  return gasit
    ? gasit[1].trim()
    : null;
}

function extrageNumar(
  bloc,
  camp
) {
  const expresie =
    new RegExp(
      `${camp}\\s*:\\s*(\\d+)`
    );

  const gasit =
    bloc.match(
      expresie
    );

  if (
    !gasit
  ) {
    return null;
  }

  return Number(
    gasit[1]
  );
}

/* =========================================================
   CITIRE ARRAY STRINGURI
========================================================= */

function extrageListaStringuri(
  bloc,
  camp
) {
  const expresie =
    new RegExp(
      `${camp}\\s*:\\s*\\[`
    );

  const gasit =
    expresie.exec(
      bloc
    );

  if (
    !gasit
  ) {
    return [];
  }

  /*
   * Regex-ul se termină chiar la "[" al array-ului.
   * Folosim ultimul "[" din match, nu primul "[" găsit
   * arbitrar în text.
   */
  const pozitieInMatch =
    gasit[0].lastIndexOf(
      "["
    );

  if (
    pozitieInMatch === -1
  ) {
    return [];
  }

  const start =
    gasit.index +
    pozitieInMatch;

  const rezultatBloc =
    extrageBloc(
      bloc,
      start,
      "[",
      "]"
    );

  if (
    !rezultatBloc
  ) {
    return [];
  }

  const interior =
    rezultatBloc.text.slice(
      1,
      -1
    );

  const rezultat =
    [];

  let i = 0;

  while (
    i <
    interior.length
  ) {
    const c =
      interior[i];

    if (
      c !== '"' &&
      c !== "'" &&
      c !== "`"
    ) {
      i++;
      continue;
    }

    const delimitator =
      c;

    let valoare =
      "";

    let escape =
      false;

    i++;

    while (
      i <
      interior.length
    ) {
      const caracter =
        interior[i];

      if (
        escape
      ) {
        valoare +=
          caracter;

        escape =
          false;

        i++;

        continue;
      }

      if (
        caracter === "\\"
      ) {
        escape =
          true;

        i++;

        continue;
      }

      if (
        caracter ===
        delimitator
      ) {
        break;
      }

      valoare +=
        caracter;

      i++;
    }

    if (
      valoare.trim()
    ) {
      rezultat.push(
        valoare.trim()
      );
    }

    i++;
  }

  return rezultat;
}

/* =========================================================
   EXTRAGERE OBIECTE DE LECȚIE
========================================================= */

function gasesteObiecteLectie(
  text,
  fisier
) {
  const rezultate =
    [];

  const expresie =
    /(?:export\s+)?const\s+([A-Za-z0-9_]+)\s*(?::[^=]+)?=\s*\{/g;

  let match;

  while (
    (
      match =
        expresie.exec(
          text
        )
    ) !== null
  ) {
    const nume =
      match[1];

    if (
      nume.startsWith(
        "lectiiModul"
      )
    ) {
      continue;
    }

    const bloc =
      extrageBloc(
        text,
        match.index,
        "{",
        "}"
      );

    if (
      !bloc
    ) {
      continue;
    }

    const titluLectie =
      extrageString(
        bloc.text,
        "titlu"
      );

    const slug =
      extrageString(
        bloc.text,
        "slug"
      );

    const modul =
      extrageNumar(
        bloc.text,
        "modul"
      );

    const numarLectie =
      extrageNumar(
        bloc.text,
        "numarLectie"
      );

    if (
      !titluLectie ||
      !slug
    ) {
      continue;
    }

    rezultate.push({
      numeVariabila:
        nume,

      titlu:
        titluLectie,

      slug,

      modul,

      numarLectie,

      fisier,

      sursa:
        "obiect-lectie",
    });
  }

  return rezultate;
}

/* =========================================================
   FIȘIERE SURSĂ PENTRU LECȚII
========================================================= */

function fisiereSursaLectii() {
  const rezultat =
    [];

  if (
    exista(
      DIRECTOR_LECTII
    )
  ) {
    for (
      const nume of
      fs.readdirSync(
        DIRECTOR_LECTII
      )
    ) {
      if (
        nume.endsWith(
          ".ts"
        )
      ) {
        rezultat.push(
          path.join(
            DIRECTOR_LECTII,
            nume
          )
        );
      }
    }
  }

  const candidatiLegacy = [
    path.join(
      DIRECTOR_DATA,
      "lectii-vechi.ts"
    ),

    path.join(
      DIRECTOR_DATA,
      "lectii-vechi",
      "index.ts"
    ),
  ];

  for (
    const candidat of
      candidatiLegacy
  ) {
    if (
      exista(
        candidat
      )
    ) {
      rezultat.push(
        candidat
      );
    }
  }

  return rezultat;
}

function construiesteRegistruObiecte() {
  const registru =
    new Map();

  const fisiere =
    fisiereSursaLectii();

  for (
    const fisier of
      fisiere
  ) {
    const text =
      citeste(
        fisier
      );

    const obiecte =
      gasesteObiecteLectie(
        text,
        path.relative(
          ROOT,
          fisier
        )
      );

    for (
      const obiect of
        obiecte
    ) {
      if (
        !registru.has(
          obiect.numeVariabila
        )
      ) {
        registru.set(
          obiect.numeVariabila,
          obiect
        );
      }
    }
  }

  return registru;
}

/* =========================================================
   MODULELE 1–4
   Citim ordinea REALĂ din lectiiModulX
========================================================= */

function extrageReferinteArray(
  text,
  numeArray
) {
  /*
   * Exemple valide:
   *
   * export const lectiiModul1 = [
   *
   * export const lectiiModul1: Lectie[] = [
   *
   * Problema versiunii vechi:
   * în "Lectie[]" putea fi luat primul "[" greșit.
   *
   * Soluția:
   * regex-ul include până la "[" de după "=",
   * apoi folosim ultimul "[" din match.
   */
  const expresie =
    new RegExp(
      `export\\s+const\\s+${numeArray}\\s*(?::[^=]+)?=\\s*\\[`
    );

  const gasit =
    expresie.exec(
      text
    );

  if (
    !gasit
  ) {
    return [];
  }

  const pozitieInMatch =
    gasit[0].lastIndexOf(
      "["
    );

  if (
    pozitieInMatch === -1
  ) {
    return [];
  }

  const start =
    gasit.index +
    pozitieInMatch;

  const bloc =
    extrageBloc(
      text,
      start,
      "[",
      "]"
    );

  if (
    !bloc
  ) {
    return [];
  }

  const interior =
    bloc.text.slice(
      1,
      -1
    );

  /*
   * Eliminăm comentariile înainte să separăm referințele.
   */
  const faraComentariiBloc =
    interior.replace(
      /\/\*[\s\S]*?\*\//g,
      ""
    );

  const faraComentarii =
    faraComentariiBloc.replace(
      /\/\/.*$/gm,
      ""
    );

  return faraComentarii
    .split(",")
    .map(
      (item) =>
        item.trim()
    )
    .filter(
      (item) =>
        /^[A-Za-z_][A-Za-z0-9_]*$/.test(
          item
        )
    );
}

function extrageModule1La4(
  registru
) {
  const rezultat =
    [];

  for (
    let modul = 1;
    modul <= 4;
    modul++
  ) {
    const cale =
      path.join(
        DIRECTOR_LECTII,
        `modul-${modul}.ts`
      );

    if (
      !exista(
        cale
      )
    ) {
      console.warn(
        `⚠ Lipsește modul-${modul}.ts`
      );

      continue;
    }

    const text =
      citeste(
        cale
      );

    const numeArray =
      `lectiiModul${modul}`;

    const referinte =
      extrageReferinteArray(
        text,
        numeArray
      );

    console.log(
      `✓ ${numeArray}: ${referinte.length} referințe`
    );

    for (
      let index = 0;
      index <
      referinte.length;
      index++
    ) {
      const nume =
        referinte[index];

      const lectie =
        registru.get(
          nume
        );

      if (
        !lectie
      ) {
        console.warn(
          `  ⚠ Nu pot rezolva ${nume}`
        );

        continue;
      }

      rezultat.push({
        ...lectie,

        modul:
          lectie.modul ??
          modul,

        numarLectie:
          lectie.numarLectie ??
          index + 1,

        sursa:
          "catalog-clasic",
      });
    }
  }

  return rezultat;
}

/* =========================================================
   MODULELE 5–17
   creeazaModul(...)
========================================================= */

function extrageModuleGenerate() {
  const cale =
    path.join(
      DIRECTOR_LECTII,
      "modul-5.ts"
    );

  if (
    !exista(
      cale
    )
  ) {
    return [];
  }

  const text =
    citeste(
      cale
    );

  const rezultat =
    [];

  const expresie =
    /export\s+const\s+(lectiiModul\d+)\s*=\s*creeazaModul\s*\(\s*\{/g;

  let match;

  while (
    (
      match =
        expresie.exec(
          text
        )
    ) !== null
  ) {
    const numeExport =
      match[1];

    const bloc =
      extrageBloc(
        text,
        match.index,
        "{",
        "}"
      );

    if (
      !bloc
    ) {
      continue;
    }

    const modul =
      extrageNumar(
        bloc.text,
        "modul"
      );

    const clasa =
      extrageString(
        bloc.text,
        "clasa"
      );

    const numeModul =
      extrageString(
        bloc.text,
        "nume"
      );

    const lista =
      extrageListaStringuri(
        bloc.text,
        "lectii"
      );

    console.log(
      `✓ ${numeExport}: ${lista.length} lecții`
    );

    if (
      !modul
    ) {
      console.warn(
        `  ⚠ ${numeExport} nu are modul valid`
      );

      continue;
    }

    lista.forEach(
      (
        titluLectie,
        index
      ) => {
        rezultat.push({
          numeVariabila:
            null,

          slug:
            `m${modul}-${slugify(
              titluLectie
            )}`,

          modul,

          numarLectie:
            index + 1,

          titlu:
            titluLectie,

          clasa:
            clasa ??
            null,

          numeModul:
            numeModul ??
            null,

          fisier:
            "data/lectii/modul-5.ts",

          sursa:
            "creeazaModul",
        });
      }
    );
  }

  return rezultat;
}

/* =========================================================
   CATALOG COMPLET
========================================================= */

function construiesteCatalog() {
  const registru =
    construiesteRegistruObiecte();

  console.log(
    `✓ Obiecte de lecție găsite în surse: ${registru.size}`
  );

  const primeleModule =
    extrageModule1La4(
      registru
    );

  const moduleGenerate =
    extrageModuleGenerate();

  console.log("");

  console.log(
    `✓ Modulele 1–4 rezolvate: ${primeleModule.length} lecții`
  );

  console.log(
    `✓ Modulele 5–17 rezolvate: ${moduleGenerate.length} lecții`
  );

  const toate = [
    ...primeleModule,
    ...moduleGenerate,
  ];

  const unice =
    new Map();

  const duplicate =
    [];

  for (
    const lectie of
      toate
  ) {
    if (
      !lectie.slug
    ) {
      console.warn(
        "⚠ Lecție fără slug ignorată."
      );

      continue;
    }

    if (
      unice.has(
        lectie.slug
      )
    ) {
      duplicate.push(
        lectie.slug
      );

      continue;
    }

    unice.set(
      lectie.slug,
      lectie
    );
  }

  if (
    duplicate.length >
    0
  ) {
    console.warn("");
    console.warn(
      `⚠ Slug-uri duplicate: ${duplicate.length}`
    );

    for (
      const slug of
        duplicate
    ) {
      console.warn(
        `  - ${slug}`
      );
    }
  }

  return Array.from(
    unice.values()
  );
}

/* =========================================================
   CONTENT ENGINE EXISTENT
========================================================= */

function continutExistent() {
  if (
    !exista(
      DIRECTOR_CONTINUT
    )
  ) {
    return [];
  }

  return fs
    .readdirSync(
      DIRECTOR_CONTINUT
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
    );
}

/* =========================================================
   PILOT
========================================================= */

function alegePilot(
  catalog,
  existente
) {
  const setExistente =
    new Set(
      existente
    );

  const candidati =
    catalog.filter(
      (lectie) =>
        lectie.slug !==
          BENCHMARK_SLUG &&
        !setExistente.has(
          lectie.slug
        )
    );

  const peModule =
    new Map();

  for (
    const lectie of
      candidati
  ) {
    if (
      !peModule.has(
        lectie.modul
      )
    ) {
      peModule.set(
        lectie.modul,
        []
      );
    }

    peModule
      .get(
        lectie.modul
      )
      .push(
        lectie
      );
  }

  for (
    const grup of
      peModule.values()
  ) {
    grup.sort(
      (a, b) =>
        (
          a.numarLectie ??
          999
        ) -
        (
          b.numarLectie ??
          999
        )
    );
  }

  const modulePreferate = [
    1,
    5,
    9,
    13,
    17,
  ];

  const rezultat =
    [];

  for (
    const modul of
      modulePreferate
  ) {
    const grup =
      peModule.get(
        modul
      );

    if (
      grup &&
      grup.length > 0
    ) {
      rezultat.push(
        grup[0]
      );
    }
  }

  if (
    rezultat.length <
    NUMAR_LECTII_PILOT
  ) {
    const deja =
      new Set(
        rezultat.map(
          (lectie) =>
            lectie.slug
        )
      );

    for (
      const lectie of
        candidati
    ) {
      if (
        rezultat.length >=
        NUMAR_LECTII_PILOT
      ) {
        break;
      }

      if (
        deja.has(
          lectie.slug
        )
      ) {
        continue;
      }

      rezultat.push(
        lectie
      );

      deja.add(
        lectie.slug
      );
    }
  }

  return rezultat.slice(
    0,
    NUMAR_LECTII_PILOT
  );
}

/* =========================================================
   PLAN
========================================================= */

function construiestePlan(
  lectie
) {
  return {
    versiune:
      "BAC-MATE-CONTENT-ENGINE-V1",

    stare:
      "plan-generare",

    slug:
      lectie.slug,

    modul:
      lectie.modul,

    numarLectie:
      lectie.numarLectie,

    titlu:
      lectie.titlu,

    clasa:
      lectie.clasa ??
      null,

    numeModul:
      lectie.numeModul ??
      null,

    sursaCatalog:
      lectie.fisier,

    tipSursaCatalog:
      lectie.sursa,

    benchmark:
      BENCHMARK_SLUG,

    reguliObligatorii: {
      profil:
        "M_mate-info",

      statusInitial:
        "draft",

      publicabilAutomat:
        false,

      verificatMatematicAutomat:
        false,

      verificatProgramaAutomat:
        false,

      verificatExercitiiAutomat:
        false,

      verificatLimbaRomanaAutomat:
        false,

      numarVideo:
        4,

      durataVideoMinute: [
        4,
        5,
        5,
        5,
      ],

      minimExercitii:
        5,

      sursaDeAdevar:
        "programa oficială + conținut verificat",

      interzis: [
        "inventarea formulelor",
        "inventarea cerințelor de Bac",
        "marcarea automată drept verificat",
        "marcarea automată drept publicabil",
        "suprascrierea unei lecții existente",
      ],
    },

    structuraCeruta: {
      metadata:
        true,

      obiective:
        true,

      termeniCheie:
        true,

      videoLectii: [
        {
          numar: 1,
          rol:
            "intuiție și concept",
          durataMinute:
            4,
        },
        {
          numar: 2,
          rol:
            "reguli și metodă",
          durataMinute:
            5,
        },
        {
          numar: 3,
          rol:
            "exemplu complet rezolvat",
          durataMinute:
            5,
        },
        {
          numar: 4,
          rol:
            "tip Bac, recapitulare și greșeli frecvente",
          durataMinute:
            5,
        },
      ],

      definitii:
        true,

      teorie:
        true,

      formule:
        true,

      exempleRezolvate:
        true,

      greseliFrecvente:
        true,

      exercitii:
        true,

      rezumat:
        true,

      legaturaCuBac:
        true,

      surse:
        true,

      verificare:
        true,
    },

    portiCalitate: [
      "validare structurală",
      "verificare matematică",
      "verificare programă",
      "verificare exerciții și răspunsuri",
      "verificare limba română",
      "verificare scenarii video",
      "verificare durată video",
      "build Next.js",
      "test funcțional",
      "gate separat de publicare",
    ],
  };
}

function stergePlanuriPilot() {
  if (
    !exista(
      DIRECTOR_PLANURI
    )
  ) {
    return;
  }

  const fisiere =
    fs
      .readdirSync(
        DIRECTOR_PLANURI
      )
      .filter(
        (nume) =>
          nume.endsWith(
            ".json"
        )
      );

  for (
    const fisier of
      fisiere
  ) {
    fs.unlinkSync(
      path.join(
        DIRECTOR_PLANURI,
        fisier
      )
    );
  }

  console.log(
    `✓ Planuri pilot vechi eliminate: ${fisiere.length}`
  );
}

function scriePlan(
  plan
) {
  asiguraDirector(
    DIRECTOR_PLANURI
  );

  const cale =
    path.join(
      DIRECTOR_PLANURI,
      `${plan.slug}.json`
    );

  fs.writeFileSync(
    cale,
    `${JSON.stringify(
      plan,
      null,
      2
    )}\n`,
    "utf8"
  );

  console.log(
    `  ✓ ${path.relative(
      ROOT,
      cale
    )}`
  );
}

/* =========================================================
   AUDIT
========================================================= */

function verificaDistributie(
  catalog
) {
  const distributie =
    new Map();

  for (
    const lectie of
      catalog
  ) {
    distributie.set(
      lectie.modul,
      (
        distributie.get(
          lectie.modul
        ) ?? 0
      ) + 1
    );
  }

  let total =
    0;

  for (
    let modul = 1;
    modul <= 17;
    modul++
  ) {
    const numar =
      distributie.get(
        modul
      ) ?? 0;

    total +=
      numar;

    console.log(
      `Modul ${String(
        modul
      ).padStart(
        2,
        "0"
      )}: ${numar} lecții`
    );
  }

  return total;
}

/* =========================================================
   MAIN
========================================================= */

function main() {
  titlu(
    "BAC MATE — Content Engine V1 — Catalog sigur"
  );

  console.log(
    "Mod: PILOT / PLANIFICARE"
  );

  console.log(
    "Nu se execută importurile legacy."
  );

  console.log(
    "Nu se generează lecții .ts."
  );

  console.log(
    "Nu se modifică benchmark-ul."
  );

  console.log(
    "Nu se modifică registrul Content Engine."
  );

  console.log("");

  const benchmark =
    path.join(
      DIRECTOR_CONTINUT,
      `${BENCHMARK_SLUG}.ts`
    );

  if (
    !exista(
      benchmark
    )
  ) {
    console.error(
      `✗ Benchmark lipsă: ${BENCHMARK_SLUG}`
    );

    process.exitCode =
      1;

    return;
  }

  console.log(
    `✓ Benchmark protejat: ${BENCHMARK_SLUG}`
  );

  let catalog;

  try {
    catalog =
      construiesteCatalog();
  } catch (
    eroare
  ) {
    console.error(
      "✗ Eroare la construirea catalogului."
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

    return;
  }

  titlu(
    "Audit catalog"
  );

  const totalAudit =
    verificaDistributie(
      catalog
    );

  console.log("");

  console.log(
    `TOTAL: ${catalog.length} lecții`
  );

  /*
   * Gate suplimentar:
   * suma pe module trebuie să fie aceeași
   * cu numărul de slug-uri unice.
   */
  if (
    totalAudit !==
    catalog.length
  ) {
    console.error("");
    console.error(
      `✗ GATE OPRIT: distribuția pe module (${totalAudit}) nu corespunde catalogului (${catalog.length}).`
    );

    process.exitCode =
      1;

    return;
  }

  /*
   * GATE CRITIC:
   * proiectul BAC MATE trebuie să aibă
   * exact 219 lecții în catalog.
   */
  if (
    catalog.length !==
    NUMAR_LECTII_ASTEPTAT
  ) {
    console.error("");
    console.error(
      `✗ GATE OPRIT: catalogul are ${catalog.length}, nu ${NUMAR_LECTII_ASTEPTAT} lecții.`
    );

    console.error(
      "Nu ștergem și nu regenerăm pilotul."
    );

    console.error(
      "Nu generăm conținut până nu avem catalogul complet."
    );

    process.exitCode =
      1;

    return;
  }

  console.log(
    "✓ Catalog complet: 219/219."
  );

  const existente =
    continutExistent();

  console.log(
    `✓ Content Engine existent: ${existente.length} fișiere`
  );

  const candidati =
    catalog.filter(
      (lectie) =>
        !existente.includes(
          lectie.slug
        )
    );

  console.log(
    `✓ Fără Content Engine: ${candidati.length}`
  );

  /*
   * Abia după ce 219/219 este confirmat
   * avem voie să înlocuim planurile pilot.
   */
  stergePlanuriPilot();

  const pilot =
    alegePilot(
      catalog,
      existente
    );

  if (
    pilot.length !==
    NUMAR_LECTII_PILOT
  ) {
    console.error(
      `✗ Pilot incomplet: ${pilot.length}/${NUMAR_LECTII_PILOT}`
    );

    process.exitCode =
      1;

    return;
  }

  titlu(
    "Pilot Content Engine V1"
  );

  for (
    let i = 0;
    i <
    pilot.length;
    i++
  ) {
    const lectie =
      pilot[i];

    console.log(
      `${i + 1}. ${lectie.slug}`
    );

    console.log(
      `   Modul ${lectie.modul} — Lecția ${lectie.numarLectie}`
    );

    console.log(
      `   ${lectie.titlu}`
    );
  }

  titlu(
    "Planuri pilot"
  );

  for (
    const lectie of
      pilot
  ) {
    scriePlan(
      construiestePlan(
        lectie
      )
    );
  }

  titlu(
    "Rezultat"
  );

  console.log(
    "✓ Catalog: 219/219"
  );

  console.log(
    `✓ Pilot: ${pilot.length}/5`
  );

  console.log(
    `✓ Benchmark: ${BENCHMARK_SLUG}`
  );

  console.log("");

  console.log(
    "Nu s-a generat nicio lecție .ts."
  );

  console.log(
    "Nu s-a modificat data/continut/index.ts."
  );

  console.log(
    "Nu s-a pornit Video Factory."
  );

  console.log(
    "Nu s-a acordat status verificat/publicabil."
  );

  console.log("");

  console.log(
    "Următorul pas: generarea controlată a PRIMEI lecții pilot."
  );
}

try {
  main();
} catch (
  eroare
) {
  console.error("");
  console.error(
    "✗ Eroare neașteptată."
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