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
  "genereaza-lectii-ai.V5.0-backup-inainte-V5.1.mjs"
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
    "BAC MATE — GENERATOR LOCAL CONTENT ENGINE V5.0"
  ) &&
  !cod.includes(
    "BAC MATE — GENERATOR LOCAL CONTENT ENGINE V5.1"
  )
) {
  throw new Error(
    "Fisierul nu este versiunea V5.0/V5.1 asteptata. Oprire fara modificari."
  );
}

if (
  cod.includes(
    "BAC MATE — GENERATOR LOCAL CONTENT ENGINE V5.1"
  ) &&
  cod.includes(
    "TINTA PRACTICA DE LUNGIME"
  )
) {
  console.log(
    "Generatorul este deja V5.1. Nu am modificat nimic."
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
   INTARIRE PROMPT VIDEO
========================================================= */

inlocuiesteExact(
`REGULI:
- scenariul are intre
  \${VIDEO_MIN_CUVINTE[numar]}
  si
  \${VIDEO_MAX_CUVINTE[numar]}
  cuvinte;
- minimum 8 paragrafe;
- limbaj natural pentru un elev;
- fara repetitii mecanice;
- verificareRapida are exact 4 variante;
- raspunsCorect = index 0, 1, 2 sau 3;
- nu inventa un subiect oficial Bac;
- nu afirma ca exercitiul a aparut la examen.`,

`REGULI:
- scenariul are OBLIGATORIU minimum
  \${VIDEO_MIN_CUVINTE[numar]}
  cuvinte si maximum
  \${VIDEO_MAX_CUVINTE[numar]}
  cuvinte;

TINTA PRACTICA DE LUNGIME:
- NU urmari minimul exact;
- scrie aproximativ
  \${Math.min(
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
- nu afirma ca exercitiul a aparut la examen.`,

  "prompt video"
);

/* =========================================================
   VERSIUNE
========================================================= */

cod = cod.replaceAll(
  "BAC MATE — GENERATOR LOCAL CONTENT ENGINE V5.0",
  "BAC MATE — GENERATOR LOCAL CONTENT ENGINE V5.1"
);

cod = cod.replaceAll(
  "BAC MATE — Generator Local Content Engine V5.0",
  "BAC MATE — Generator Local Content Engine V5.1"
);

cod = cod.replaceAll(
  "BAC-MATE-GENERATOR-LOCAL-V5.0",
  "BAC-MATE-GENERATOR-LOCAL-V5.1"
);

cod = cod.replaceAll(
  "Draft generat de BAC MATE Generator Local V5.0.",
  "Draft generat de BAC MATE Generator Local V5.1."
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
  "OK: Generatorul a fost actualizat la V5.1."
);

console.log(
  `Backup: ${path.relative(
    ROOT,
    backup
  )}`
);

console.log(
  "Checkpoint-urile existente au fost pastrate."
);