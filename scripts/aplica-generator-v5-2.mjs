import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

const tinta = path.join(
  ROOT,
  "scripts",
  "genereaza-lectii-ai.mjs"
);

const backup = path.join(
  ROOT,
  "scripts",
  "genereaza-lectii-ai.V5.1-backup-inainte-V5.2.mjs"
);

if (!fs.existsSync(tinta)) {
  throw new Error(
    `Nu exista fisierul: ${tinta}`
  );
}

let cod = fs
  .readFileSync(tinta, "utf8")
  .replace(/\r\n/g, "\n");

if (
  !cod.includes(
    "BAC MATE — GENERATOR LOCAL CONTENT ENGINE V5.1"
  ) &&
  !cod.includes(
    "BAC MATE — GENERATOR LOCAL CONTENT ENGINE V5.2"
  )
) {
  throw new Error(
    "Fisierul nu este versiunea V5.1/V5.2 asteptata. Oprire fara modificari."
  );
}

if (
  cod.includes(
    "BAC MATE — GENERATOR LOCAL CONTENT ENGINE V5.2"
  ) &&
  cod.includes(
    "normalizeazaIduriLectie"
  ) &&
  cod.includes(
    "variante duplicate"
  )
) {
  console.log(
    "Generatorul este deja V5.2. Nu am modificat nimic."
  );

  process.exit(0);
}

fs.copyFileSync(
  tinta,
  backup
);

function inlocuiesteExact(
  vechi,
  nou,
  eticheta
) {
  const aparitii =
    cod.split(vechi).length - 1;

  if (aparitii !== 1) {
    throw new Error(
      `${eticheta}: asteptam exact 1 aparitie, gasite ${aparitii}.`
    );
  }

  cod = cod.replace(
    vechi,
    nou
  );
}

/* =========================================================
   1. ALINIERE PRAGURI VIDEO
========================================================= */

inlocuiesteExact(
`const VIDEO_MIN_CUVINTE = {
  1: 340,
  2: 410,
  3: 410,
  4: 410,
};`,

`const VIDEO_MIN_CUVINTE = {
  1: 340,
  2: 425,
  3: 425,
  4: 425,
};`,

  "praguri video"
);

/* =========================================================
   2. VARIANTE QUIZ UNICE
========================================================= */

inlocuiesteExact(
`  if (
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

  return erori;`,

`  if (
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
  } else {
    const varianteNormalizate =
      verificare.variante.map(
        (varianta) =>
          String(varianta)
            .trim()
            .toLowerCase()
      );

    const varianteUnice =
      new Set(varianteNormalizate);

    if (
      varianteUnice.size !==
      varianteNormalizate.length
    ) {
      erori.push(
        "verificareRapida: variante duplicate"
      );
    }
  }

  return erori;`,

  "validator variante quiz"
);

/* =========================================================
   3. FUNCTIE ID-URI DETERMINISTE
========================================================= */

const markerAsamblare =
`/* =========================================================
   ASAMBLARE
========================================================= */

function asambleazaLectie({`;

const functieIduri =
`/* =========================================================
   ID-URI DETERMINISTE
========================================================= */

function normalizeazaIduriLectie(
  continut
) {
  const slug = continut.slug;

  continut.videoLectii =
    (continut.videoLectii ?? []).map(
      (video, index) => ({
        ...video,
        id: \`\${slug}-video-\${index + 1}\`,
      })
    );

  continut.teorie =
    (continut.teorie ?? []).map(
      (sectiune, index) => ({
        ...sectiune,
        id: \`\${slug}-teorie-\${index + 1}\`,
      })
    );

  continut.formule =
    (continut.formule ?? []).map(
      (formula, index) => ({
        ...formula,
        id: \`\${slug}-formula-\${index + 1}\`,
      })
    );

  continut.exempleRezolvate =
    (
      continut.exempleRezolvate ??
      []
    ).map(
      (exemplu, index) => ({
        ...exemplu,
        id: \`\${slug}-exemplu-\${index + 1}\`,
      })
    );

  continut.exercitii =
    (continut.exercitii ?? []).map(
      (exercitiu, index) => ({
        ...exercitiu,
        id: \`\${slug}-exercitiu-\${index + 1}\`,
      })
    );

  return continut;
}

/* =========================================================
   ASAMBLARE
========================================================= */

function asambleazaLectie({`;

inlocuiesteExact(
  markerAsamblare,
  functieIduri,
  "functie normalizare ID-uri"
);

/* =========================================================
   4. APLICARE NORMALIZARE LA LECTIA ASAMBLATA
========================================================= */

inlocuiesteExact(
`  return {
    id: lectie.slug,`,

`  const continut = {
    id: lectie.slug,`,

  "inceput asamblare"
);

inlocuiesteExact(
`    },
  };
}

/* =========================================================
   VALIDARE FINALA`,

`    },
  };

  return normalizeazaIduriLectie(
    continut
  );
}

/* =========================================================
   VALIDARE FINALA`,

  "final asamblare"
);

/* =========================================================
   5. VERSIUNE
========================================================= */

cod = cod.replaceAll(
  "BAC MATE — GENERATOR LOCAL CONTENT ENGINE V5.1",
  "BAC MATE — GENERATOR LOCAL CONTENT ENGINE V5.2"
);

cod = cod.replaceAll(
  "BAC MATE — Generator Local Content Engine V5.1",
  "BAC MATE — Generator Local Content Engine V5.2"
);

cod = cod.replaceAll(
  "BAC-MATE-GENERATOR-LOCAL-V5.1",
  "BAC-MATE-GENERATOR-LOCAL-V5.2"
);

cod = cod.replaceAll(
  "Draft generat de BAC MATE Generator Local V5.1.",
  "Draft generat de BAC MATE Generator Local V5.2."
);

/* =========================================================
   SALVARE
========================================================= */

fs.writeFileSync(
  tinta,
  cod,
  "utf8"
);

console.log("");
console.log(
  "OK: Generatorul a fost actualizat la V5.2."
);

console.log(
  `Backup: ${path.relative(
    ROOT,
    backup
  )}`
);

console.log(
  "V5.2: ID-uri deterministe, praguri video aliniate si quiz fara variante duplicate."
);