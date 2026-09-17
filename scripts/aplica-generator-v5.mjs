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
  "genereaza-lectii-ai.V4.3-backup-inainte-V5.mjs"
);

if (!fs.existsSync(tinta)) {
  throw new Error(
    `Nu exista: ${tinta}`
  );
}

let cod = fs
  .readFileSync(tinta, "utf8")
  .replace(/\r\n/g, "\n");

if (
  !cod.includes(
    "BAC MATE — GENERATOR LOCAL CONTENT ENGINE V4.3"
  ) &&
  !cod.includes(
    "BAC MATE — GENERATOR LOCAL CONTENT ENGINE V5.0"
  )
) {
  throw new Error(
    "Fisierul nu pare sa fie generatorul V4.3/V5.0 asteptat. Oprire fara modificari."
  );
}

if (
  cod.includes(
    "BAC MATE — GENERATOR LOCAL CONTENT ENGINE V5.0"
  ) &&
  cod.includes(
    "camp lipsa sau invalid: ${camp}"
  ) &&
  cod.includes(
    "raspunsCorect este OBLIGATORIU inclusiv"
  )
) {
  console.log(
    "Generatorul este deja V5.0. Nu am modificat nimic."
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
      `${eticheta}: asteptam exact 1 aparitie, gasite ${aparitii}. Backup-ul a fost creat, fisierul original nu a fost rescris.`
    );
  }

  cod = cod.replace(
    vechi,
    nou
  );
}

/* =========================================================
   1. VALIDATOR PEDAGOGIE
========================================================= */

inlocuiesteExact(
`    if (
      !esteText(greseala?.greseala) ||
      !esteText(greseala?.deCeEsteGresit) ||
      !esteText(greseala?.cumOEviti)
    ) {
      erori.push(
        \`gresealaFrecventa \${index + 1} invalida\`
      );
    }`,

`    for (const [camp, valoare] of [
      ["greseala", greseala?.greseala],
      ["deCeEsteGresit", greseala?.deCeEsteGresit],
      ["cumOEviti", greseala?.cumOEviti],
    ]) {
      if (!esteText(valoare)) {
        erori.push(
          \`gresealaFrecventa \${index + 1}: camp lipsa sau invalid: \${camp}\`
        );
      }
    }`,

  "validator pedagogie"
);

/* =========================================================
   2. VALIDATOR EXERCITII
========================================================= */

inlocuiesteExact(
`      if (
        !esteText(exercitiu.enunt) ||
        !esteText(
          exercitiu.raspunsCorect
        ) ||
        !esteText(
          exercitiu.explicatieFinala
        ) ||
        !esteText(exercitiu.competenta)
      ) {
        erori.push(
          \`exercitiu \${index + 1}: camp obligatoriu lipsa\`
        );
      }`,

`      const campuriTextObligatorii = [
        ["enunt", exercitiu.enunt],
        ["raspunsCorect", exercitiu.raspunsCorect],
        ["explicatieFinala", exercitiu.explicatieFinala],
        ["competenta", exercitiu.competenta],
      ];

      for (const [camp, valoare] of campuriTextObligatorii) {
        if (!esteText(valoare)) {
          erori.push(
            \`exercitiu \${index + 1}: camp lipsa sau invalid: \${camp}\`
          );
        }
      }`,

  "validator exercitii"
);

/* =========================================================
   3. PROMPT EXERCITII
========================================================= */

inlocuiesteExact(
`REGULI:
- exact 4 exercitii;
- minimum 2 pasi de rezolvare;`,

`REGULI:
- exact 4 exercitii;
- FIECARE exercitiu, indiferent de tip, trebuie sa contina explicit campurile: id, nivel, tip, enunt, raspunsCorect, rezolvare, explicatieFinala, punctaj, competenta;
- raspunsCorect este OBLIGATORIU inclusiv pentru raspuns-scurt si rezolvare-completa;
- minimum 2 pasi de rezolvare;`,

  "prompt exercitii"
);

/* =========================================================
   4. VALIDARE FINALA EXERCITII
========================================================= */

inlocuiesteExact(
`  } else {
    const iduri = new Set();

    for (
      const exercitiu of continut.exercitii
    ) {`,

`  } else {
    erori.push(
      ...valideazaLotExercitii({
        exercitii: continut.exercitii.slice(0, 4),
      }).map(
        (eroare) =>
          \`lot exercitii A: \${eroare}\`
      )
    );

    erori.push(
      ...valideazaLotExercitii({
        exercitii: continut.exercitii.slice(4, 8),
      }).map(
        (eroare) =>
          \`lot exercitii B: \${eroare}\`
      )
    );

    const iduri = new Set();

    for (
      const exercitiu of continut.exercitii
    ) {`,

  "validare finala exercitii"
);

/* =========================================================
   5. VERSIUNE
========================================================= */

cod = cod.replaceAll(
  "BAC MATE — GENERATOR LOCAL CONTENT ENGINE V4.3",
  "BAC MATE — GENERATOR LOCAL CONTENT ENGINE V5.0"
);

cod = cod.replaceAll(
  "BAC MATE — Generator Local Content Engine V4.3",
  "BAC MATE — Generator Local Content Engine V5.0"
);

cod = cod.replaceAll(
  "BAC-MATE-GENERATOR-LOCAL-V4.3",
  "BAC-MATE-GENERATOR-LOCAL-V5.0"
);

cod = cod.replaceAll(
  "Draft generat de BAC MATE Generator Local V4.3.",
  "Draft generat de BAC MATE Generator Local V5.0."
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
  "OK: Generatorul a fost actualizat la V5.0."
);

console.log(
  `Backup: ${path.relative(
    ROOT,
    backup
  )}`
);

console.log(
  "Checkpoint-urile V4.2/V4.3 nu au fost sterse sau modificate."
);