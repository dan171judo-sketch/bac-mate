import fs from "node:fs";

const path =
  "./scripts/genereaza-lectii-ai.mjs";

const backup =
  "./scripts/genereaza-lectii-ai.PRE-EXERCISE-QA.backup";

const original =
  fs.readFileSync(path, "utf8");

// =========================================================
// PROTECTIE 1 — NU INTEGRAM DE DOUA ORI
// =========================================================

if (
  original.includes(
    'from "./exercise-qa.mjs"'
  ) ||
  original.includes(
    "valideazaExercitiuPedagogic"
  ) ||
  original.includes(
    "valideazaSetExercitiiPedagogic"
  )
) {
  console.log(
    "STOP: Exercise QA pare deja integrat."
  );
  process.exit(1);
}

let c = original;

// =========================================================
// 1. IMPORT
// =========================================================

const importRegex =
  /import https from "node:https";/;

const importMatches =
  c.match(
    /import https from "node:https";/g
  ) ?? [];

if (importMatches.length !== 1) {
  console.log(
    `STOP: import https gasit de ${importMatches.length} ori.`
  );
  process.exit(1);
}

c = c.replace(
  importRegex,
  `import https from "node:https";

import {
  valideazaExercitiuPedagogic,
  valideazaSetExercitiiPedagogic,
} from "./exercise-qa.mjs";`
);

// =========================================================
// 2. EXERCISE QA DUPA MATH QA
// =========================================================

const mathRegex =
  /(\s+const eroriMathQa\s*=\s*\r?\n\s*valideazaExercitiuMatematic\(\s*\r?\n\s*exercitiu\s*\r?\n\s*\);\s*\r?\n\s*\r?\n\s*for\s*\(\s*\r?\n\s*const eroareMathQa\s*\r?\n\s*of eroriMathQa\s*\r?\n\s*\)\s*\{\s*\r?\n\s*erori\.push\(\s*\r?\n\s*`\$\{baza\}: \$\{eroareMathQa\}`\s*\r?\n\s*\);\s*\r?\n\s*\})/g;

const mathMatches = [
  ...c.matchAll(mathRegex),
];

if (mathMatches.length !== 1) {
  console.log(
    `STOP: blocul Math QA gasit de ${mathMatches.length} ori.`
  );
  process.exit(1);
}

c = c.replace(
  mathRegex,
  `$1

      const eroriExerciseQa =
        valideazaExercitiuPedagogic(
          exercitiu
        );

      for (
        const eroareExerciseQa
        of eroriExerciseQa
      ) {
        erori.push(
          \`\${baza}: \${eroareExerciseQa}\`
        );
      }`
);

// =========================================================
// 3. QA PE SETUL COMPLET DE 8 EXERCITII
// =========================================================

const lot2Regex =
  /(\s+erori\.push\(\s*\r?\n\s*\.\.\.valideazaLotExercitii\(\s*\r?\n\s*lot2\s*\r?\n\s*\)\.map\(\s*\r?\n\s*\(eroare\)\s*=>\s*\r?\n\s*`exercitii\[4\.\.7\]: \$\{eroare\}`\s*\r?\n\s*\)\s*\r?\n\s*\);)(\s*\r?\n\s*const niveluri\s*=)/g;

const lot2Matches = [
  ...c.matchAll(lot2Regex),
];

if (lot2Matches.length !== 1) {
  console.log(
    `STOP: blocul final lot2 gasit de ${lot2Matches.length} ori.`
  );
  process.exit(1);
}

c = c.replace(
  lot2Regex,
  `$1

    erori.push(
      ...valideazaSetExercitiiPedagogic(
        exercitii
      )
    );$2`
);

// =========================================================
// 4. VERIFICARI INAINTE DE SCRIERE
// =========================================================

const verificari = [
  {
    nume: "import Exercise QA",
    text:
      'from "./exercise-qa.mjs"',
  },
  {
    nume:
      "validator exercitiu individual",
    text:
      "valideazaExercitiuPedagogic(",
  },
  {
    nume:
      "validator set complet",
    text:
      "valideazaSetExercitiiPedagogic(",
  },
];

for (const verificare of verificari) {
  if (!c.includes(verificare.text)) {
    console.log(
      `STOP: verificarea "${verificare.nume}" a esuat.`
    );
    process.exit(1);
  }
}

// Trebuie sa existe o modificare reala.
if (c === original) {
  console.log(
    "STOP: nu s-a produs nicio modificare."
  );
  process.exit(1);
}

// =========================================================
// 5. BACKUP + SCRIERE
// =========================================================

// Backup-ul exista deja din pasul anterior.
// Daca nu exista din orice motiv, il cream acum.
// NU suprascriem backup-ul existent.
if (!fs.existsSync(backup)) {
  fs.copyFileSync(
    path,
    backup
  );
}

fs.writeFileSync(
  path,
  c,
  "utf8"
);

// =========================================================
// 6. CONFIRMARE
// =========================================================

console.log(
  "OK: Exercise QA conectat la generator."
);

console.log(
  "OK: import = 1"
);

console.log(
  "OK: QA exercitiu individual = 1"
);

console.log(
  "OK: QA set complet = 1"
);

console.log(
  "Backup:",
  backup
);