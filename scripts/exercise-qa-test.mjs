import {
  valideazaExercitiuPedagogic,
  valideazaSetExercitiiPedagogic,
} from "./exercise-qa.mjs";

let trecute = 0;
let esuate = 0;

function test(nume, conditie) {
  if (conditie) {
    console.log(`PASS — ${nume}`);
    trecute++;
  } else {
    console.log(`FAIL — ${nume}`);
    esuate++;
  }
}

const exercitiuAxaFaraSuport = {
  tip: "alegere-multipla",
  enunt:
    "Care dintre urmatoarele intervale este reprezentat corect pe axa numerelor?",
  variante: [
    "[1, 3]",
    "(-inf, 2)",
    "(0, inf)",
    "[-2, 4)",
  ],
  raspunsCorect: "[-2, 4)",
};

test(
  "respinge axa numerelor fara suport vizual",
  valideazaExercitiuPedagogic(
    exercitiuAxaFaraSuport
  ).some(
    (eroare) =>
      eroare.includes(
        "nu furnizeaza acel suport"
      )
  )
);

const exercitiuTextValid = {
  tip: "raspuns-scurt",
  enunt:
    "Scrie intervalul inchis cu extremitatile -3 si 4.",
  raspunsCorect: "[-3, 4]",
};

test(
  "accepta exercitiu text normal",
  valideazaExercitiuPedagogic(
    exercitiuTextValid
  ).length === 0
);

const duplicateReale = [
  {
    enunt:
      "Scrie simbolul care indica excluderea unui capat dintr-un interval.",
    raspunsCorect: "(",
  },
  {
    enunt:
      "Scrieti simbolul care indica excluderea unui capat intr-un interval.",
    raspunsCorect: "(",
  },
];

test(
  "detecteaza duplicatele reale 4 si 6",
  valideazaSetExercitiiPedagogic(
    duplicateReale
  ).some(
    (eroare) =>
      eroare.includes(
        "duplicate pedagogice"
      )
  )
);

const diferiteLegitime = [
  {
    enunt:
      "Scrie intervalul inchis cu extremitatile -3 si 4.",
    raspunsCorect: "[-3, 4]",
  },
  {
    enunt:
      "Determina intersectia intervalelor [-3, 7] si [-5, 4].",
    raspunsCorect: "[-3, 4]",
  },
];

test(
  "nu confunda doua exercitii diferite cu acelasi raspuns",
  !valideazaSetExercitiiPedagogic(
    diferiteLegitime
  ).some(
    (eroare) =>
      eroare.includes(
        "duplicate pedagogice"
      )
  )
);

const setCuAxa = [
  exercitiuTextValid,
  exercitiuAxaFaraSuport,
];

test(
  "setul complet mosteneste Gate-ul vizual",
  valideazaSetExercitiiPedagogic(
    setCuAxa
  ).some(
    (eroare) =>
      eroare.includes(
        "nu furnizeaza acel suport"
      )
  )
);

console.log("");
console.log(
  `REZULTAT: ${trecute} PASS / ${esuate} FAIL`
);

if (esuate > 0) {
  process.exitCode = 1;
}
