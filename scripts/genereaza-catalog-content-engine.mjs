import fs from "node:fs";
import path from "node:path";

/* =========================================================
   BAC MATE
   CATALOG CANONIC CONTENT ENGINE V1

   Scop:
   - citește catalogul REAL din data/lectii
   - păstrează slug-urile canonice
   - validează exact 219 lecții
   - validează slug-uri unice
   - validează poziții modul/lecție unice
   - NU modifică lecțiile
   - NU modifică Content Engine
   - NU modifică Video Factory
========================================================= */

const ROOT = process.cwd();

const DIRECTOR_DATA =
  path.join(
    ROOT,
    "data"
  );

const DIRECTOR_LECTII =
  path.join(
    DIRECTOR_DATA,
    "lectii"
  );

const DIRECTOR_CONTINUT =
  path.join(
    DIRECTOR_DATA,
    "continut"
  );

const CALE_CATALOG =
  path.join(
    DIRECTOR_CONTINUT,
    "catalog-content-engine.json"
  );

const NUMAR_LECTII_ASTEPTAT =
  219;

/* =========================================================
   UTILITARE
========================================================= */

function exista(cale) {
  return fs.existsSync(cale);
}

function citeste(cale) {
  return fs.readFileSync(
    cale,
    "utf8"
  );
}

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

function asiguraDirector(
  director
) {
  fs.mkdirSync(
    director,
    {
      recursive: true,
    }
  );
}

/* =========================================================
   PARSER BLOCURI JS / TS

   Avem nevoie să extragem obiectele de lecție fără să
   executăm fișierele TypeScript.
========================================================= */

function extrageBloc(
  text,
  start,
  deschidere,
  inchidere
) {
  let adancime = 0;

  let inString = false;
  let delimitatorString = "";
  let escape = false;

  let inComentariuLinie =
    false;

  let inComentariuBloc =
    false;

  for (
    let i = start;
    i < text.length;
    i++
  ) {
    const caracter =
      text[i];

    const urmator =
      text[i + 1];

    if (
      inComentariuLinie
    ) {
      if (
        caracter === "\n"
      ) {
        inComentariuLinie =
          false;
      }

      continue;
    }

    if (
      inComentariuBloc
    ) {
      if (
        caracter === "*" &&
        urmator === "/"
      ) {
        inComentariuBloc =
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
        escape = false;
        continue;
      }

      if (
        caracter === "\\"
      ) {
        escape = true;
        continue;
      }

      if (
        caracter ===
        delimitatorString
      ) {
        inString = false;
        delimitatorString =
          "";
      }

      continue;
    }

    if (
      caracter === "/" &&
      urmator === "/"
    ) {
      inComentariuLinie =
        true;

      i++;

      continue;
    }

    if (
      caracter === "/" &&
      urmator === "*"
    ) {
      inComentariuBloc =
        true;

      i++;

      continue;
    }

    if (
      caracter === '"' ||
      caracter === "'" ||
      caracter === "`"
    ) {
      inString = true;

      delimitatorString =
        caracter;

      continue;
    }

    if (
      caracter ===
      deschidere
    ) {
      adancime++;
    }

    if (
      caracter ===
      inchidere
    ) {
      adancime--;

      if (
        adancime === 0
      ) {
        return {
          text:
            text.slice(
              start,
              i + 1
            ),

          start,

          end:
            i + 1,
        };
      }
    }
  }

  return null;
}

/* =========================================================
   EXTRAGERE CÂMPURI
========================================================= */

function extrageString(
  text,
  camp
) {
  const expresie =
    new RegExp(
      `${camp}\\s*:\\s*(["'\`])([\\s\\S]*?)\\1`
    );

  const rezultat =
    expresie.exec(
      text
    );

  if (
    !rezultat
  ) {
    return null;
  }

  return rezultat[2]
    .replace(
      /\\(["'`\\])/g,
      "$1"
    )
    .trim();
}

function extrageNumar(
  text,
  camp
) {
  const expresie =
    new RegExp(
      `${camp}\\s*:\\s*(\\d+)`
    );

  const rezultat =
    expresie.exec(
      text
    );

  if (
    !rezultat
  ) {
    return null;
  }

  const valoare =
    Number(
      rezultat[1]
    );

  return Number.isFinite(
    valoare
  )
    ? valoare
    : null;
}

/* =========================================================
   GĂSIRE OBIECTE LECȚIE
========================================================= */

function gasesteObiecteLectie(
  text,
  fisier
) {
  const rezultate = [];

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

    const pozitieObiect =
      text.indexOf(
        "{",
        match.index
      );

    if (
      pozitieObiect === -1
    ) {
      continue;
    }

    const bloc =
      extrageBloc(
        text,
        pozitieObiect,
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
   FIȘIERE SURSĂ
========================================================= */

function fisiereSursaLectii() {
  const rezultat = [];

  if (
    !exista(
      DIRECTOR_LECTII
    )
  ) {
    throw new Error(
      `Lipsește directorul ${path.relative(
        ROOT,
        DIRECTOR_LECTII
      )}`
    );
  }

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

/* =========================================================
   REGISTRU OBIECTE
========================================================= */

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
   ARRAY-URI lectiiModul1 ... lectiiModul4
========================================================= */

function extrageReferinteArray(
  text,
  numeArray
) {
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

/* =========================================================
   MODULE 1–4
========================================================= */

function extrageModule1La4(
  registru
) {
  const rezultat = [];

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
      throw new Error(
        `Lipsește data/lectii/modul-${modul}.ts`
      );
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
        throw new Error(
          `Nu pot rezolva ${nume} din ${numeArray}.`
        );
      }

      rezultat.push({
        slug:
          lectie.slug,

        modul,

        numarLectie:
          index + 1,

        titlu:
          lectie.titlu,

        fisier:
          lectie.fisier,

        sursa:
          lectie.sursa,
      });
    }
  }

  return rezultat;
}

/* =========================================================
   MODULE 5–17

   În proiect aceste module sunt create prin creeazaModul().
   Extragem obiectele { slug, titlu } din apelurile respective.
========================================================= */

function extrageStringuriDinArray(
  text
) {
  const rezultat = [];

  let i = 0;

  while (
    i < text.length
  ) {
    const c =
      text[i];

    if (
      c !== '"' &&
      c !== "'" &&
      c !== "`"
    ) {
      i++;
      continue;
    }

    const delimitator = c;

    let valoare = "";
    let escape = false;

    i++;

    while (
      i < text.length
    ) {
      const caracter =
        text[i];

      if (
        escape
      ) {
        valoare +=
          caracter;

        escape = false;
        i++;
        continue;
      }

      if (
        caracter === "\\"
      ) {
        escape = true;
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

function extrageModule5La17() {
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
    throw new Error(
      "Lipsește data/lectii/modul-5.ts"
    );
  }

  const text =
    citeste(
      cale
    );

  const rezultat = [];

  /*
   * Căutăm:
   *
   * creeazaModul(
   *   5,
   *   "...",
   *   [
   *      ...
   *   ]
   * )
   *
   * Nu executăm TypeScript-ul.
   */

  const regex =
    /creeazaModul\s*\(\s*(\d+)\s*,/g;

  let match;

  while (
    (
      match =
        regex.exec(
          text
        )
    ) !== null
  ) {
    const modul =
      Number(
        match[1]
      );

    if (
      modul < 5 ||
      modul > 17
    ) {
      continue;
    }

    /*
     * Găsim primul "[" după începutul apelului.
     */
    const pozitieArray =
      text.indexOf(
        "[",
        regex.lastIndex
      );

    if (
      pozitieArray === -1
    ) {
      throw new Error(
        `Nu găsesc lista de lecții pentru modulul ${modul}.`
      );
    }

    const blocArray =
      extrageBloc(
        text,
        pozitieArray,
        "[",
        "]"
      );

    if (
      !blocArray
    ) {
      throw new Error(
        `Lista modulului ${modul} nu poate fi citită.`
      );
    }

    /*
     * În versiunile proiectului, lecțiile pot apărea fie
     * ca perechi slug/titlu, fie ca obiecte.
     *
     * Mai întâi încercăm obiectele.
     */

    const interior =
      blocArray.text.slice(
        1,
        -1
      );

    const lectiiObiect =
      [];

    const regexObiect =
      /\{/g;

    let obiectMatch;

    while (
      (
        obiectMatch =
          regexObiect.exec(
            interior
          )
      ) !== null
    ) {
      const bloc =
        extrageBloc(
          interior,
          obiectMatch.index,
          "{",
          "}"
        );

      if (
        !bloc
      ) {
        continue;
      }

      const slug =
        extrageString(
          bloc.text,
          "slug"
        );

      const titlu =
        extrageString(
          bloc.text,
          "titlu"
        );

      if (
        slug &&
        titlu
      ) {
        lectiiObiect.push({
          slug,
          titlu,
        });
      }

      regexObiect.lastIndex =
        bloc.end;
    }

    if (
      lectiiObiect.length > 0
    ) {
      for (
        let index = 0;
        index <
        lectiiObiect.length;
        index++
      ) {
        const lectie =
          lectiiObiect[index];

        rezultat.push({
          slug:
            lectie.slug,

          modul,

          numarLectie:
            index + 1,

          titlu:
            lectie.titlu,

          fisier:
            path.relative(
              ROOT,
              cale
            ),

          sursa:
            "creeazaModul",
        });
      }

      console.log(
        `✓ Modul ${modul}: ${lectiiObiect.length} lecții`
      );

      continue;
    }

    /*
     * Fallback pentru formatul cu string-uri.
     *
     * Așteptăm perechi:
     * slug, titlu, slug, titlu...
     */

    const stringuri =
      extrageStringuriDinArray(
        interior
      );

    if (
      stringuri.length === 0 ||
      stringuri.length % 2 !==
        0
    ) {
      throw new Error(
        `Format necunoscut pentru modulul ${modul}. Am găsit ${stringuri.length} string-uri.`
      );
    }

    const lectii = [];

    for (
      let i = 0;
      i <
      stringuri.length;
      i += 2
    ) {
      lectii.push({
        slug:
          stringuri[i],

        titlu:
          stringuri[
            i + 1
          ],
      });
    }

    for (
      let index = 0;
      index <
      lectii.length;
      index++
    ) {
      const lectie =
        lectii[index];

      rezultat.push({
        slug:
          lectie.slug,

        modul,

        numarLectie:
          index + 1,

        titlu:
          lectie.titlu,

        fisier:
          path.relative(
            ROOT,
            cale
          ),

        sursa:
          "creeazaModul",
      });
    }

    console.log(
      `✓ Modul ${modul}: ${lectii.length} lecții`
    );
  }

  return rezultat;
}

/* =========================================================
   VALIDARE CATALOG
========================================================= */

function valideazaCatalog(
  catalog
) {
  const erori = [];

  if (
    catalog.length !==
      NUMAR_LECTII_ASTEPTAT
  ) {
    erori.push(
      `Total invalid: ${catalog.length}, așteptat ${NUMAR_LECTII_ASTEPTAT}.`
    );
  }

  const sluguri =
    new Map();

  const pozitii =
    new Map();

  for (
    const lectie of
    catalog
  ) {
    if (
      !lectie.slug ||
      typeof lectie.slug !==
        "string"
    ) {
      erori.push(
        `Slug lipsă la modul ${lectie.modul}, lecția ${lectie.numarLectie}.`
      );

      continue;
    }

    if (
      sluguri.has(
        lectie.slug
      )
    ) {
      erori.push(
        `Slug duplicat: ${lectie.slug}.`
      );
    } else {
      sluguri.set(
        lectie.slug,
        true
      );
    }

    const pozitie =
      `${lectie.modul}:${lectie.numarLectie}`;

    if (
      pozitii.has(
        pozitie
      )
    ) {
      erori.push(
        `Poziție duplicată: ${pozitie}.`
      );
    } else {
      pozitii.set(
        pozitie,
        true
      );
    }

    if (
      !lectie.titlu ||
      typeof lectie.titlu !==
        "string"
    ) {
      erori.push(
        `Titlu lipsă pentru ${lectie.slug}.`
      );
    }

    if (
      !Number.isInteger(
        lectie.modul
      ) ||
      lectie.modul < 1 ||
      lectie.modul > 17
    ) {
      erori.push(
        `Modul invalid pentru ${lectie.slug}: ${lectie.modul}.`
      );
    }

    if (
      !Number.isInteger(
        lectie.numarLectie
      ) ||
      lectie.numarLectie < 1
    ) {
      erori.push(
        `Număr lecție invalid pentru ${lectie.slug}.`
      );
    }
  }

  return {
    erori,

    total:
      catalog.length,

    sluguriUnice:
      sluguri.size,

    pozitiiUnice:
      pozitii.size,
  };
}

/* =========================================================
   SCRIERE
========================================================= */

function scrieCatalog(
  catalog
) {
  asiguraDirector(
    DIRECTOR_CONTINUT
  );

  const rezultat = {
    versiune:
      "BAC-MATE-CATALOG-CONTENT-ENGINE-V1",

    generatLa:
      new Date().toISOString(),

    total:
      catalog.length,

    lectii:
      catalog,
  };

  fs.writeFileSync(
    CALE_CATALOG,
    JSON.stringify(
      rezultat,
      null,
      2
    ) + "\n",
    "utf8"
  );
}

/* =========================================================
   MAIN
========================================================= */

function main() {
  titlu(
    "BAC MATE — Catalog Content Engine V1"
  );

  console.log(
    "Citesc catalogul real din data/lectii..."
  );

  const registru =
    construiesteRegistruObiecte();

  console.log(
    `✓ Obiecte de lecție găsite: ${registru.size}`
  );

  titlu(
    "Modulele 1–4"
  );

  const module1La4 =
    extrageModule1La4(
      registru
    );

  console.log(
    `✓ Total module 1–4: ${module1La4.length}`
  );

  titlu(
    "Modulele 5–17"
  );

  const module5La17 =
    extrageModule5La17();

  console.log(
    `✓ Total module 5–17: ${module5La17.length}`
  );

  const catalog = [
    ...module1La4,
    ...module5La17,
  ].sort(
    (a, b) =>
      a.modul -
        b.modul ||
      a.numarLectie -
        b.numarLectie
  );

  titlu(
    "Validare"
  );

  const verificare =
    valideazaCatalog(
      catalog
    );

  console.log(
    `Total: ${verificare.total}`
  );

  console.log(
    `Slug-uri unice: ${verificare.sluguriUnice}`
  );

  console.log(
    `Poziții unice: ${verificare.pozitiiUnice}`
  );

  if (
    verificare.erori.length >
      0
  ) {
    console.error("");
    console.error(
      "✗ CATALOG INVALID"
    );

    for (
      const eroare of
      verificare.erori
    ) {
      console.error(
        `  - ${eroare}`
      );
    }

    /*
     * Nu scriem catalogul dacă gate-ul nu trece.
     */
    process.exitCode = 1;

    return;
  }

  console.log("");
  console.log(
    "✓ Gate catalog 219/219"
  );

  console.log(
    "✓ Toate slug-urile sunt unice."
  );

  console.log(
    "✓ Toate pozițiile modul/lecție sunt unice."
  );

  scrieCatalog(
    catalog
  );

  titlu(
    "FINAL"
  );

  console.log(
    `✓ Catalog scris: ${path.relative(
      ROOT,
      CALE_CATALOG
    )}`
  );

  console.log("");
  console.log(
    "Nu s-a modificat nicio lecție."
  );

  console.log(
    "Nu s-a modificat registrul Content Engine."
  );

  console.log(
    "Nu s-a pornit Video Factory."
  );

  console.log(
    "Nu s-a apelat niciun AI."
  );
}

try {
  main();
} catch (
  eroare
) {
  console.error("");
  console.error(
    "✗ GENERATOR CATALOG OPRIT"
  );

  console.error(
    eroare instanceof Error
      ? eroare.stack
      : String(
          eroare
        )
  );

  process.exitCode = 1;
}