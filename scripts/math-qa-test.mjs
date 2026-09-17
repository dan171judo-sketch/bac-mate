/*
 * BAC MATE — Math QA Self-Test
 *
 * Teste deterministe pentru erorile matematice
 * reale descoperite in lectia pilot.
 */

import {
  parseazaInterval,
  intervaleEgale,
  intervalContine,
  intervalDinConditii,
  rezolvaInecuatieLiniara,
  verificaGrilaApartenenta,
 valideazaExercitiuMatematic,
} from "./math-qa.mjs";

let trecute = 0;
let esuate = 0;

function test(nume, conditie) {
  if (conditie) {
    console.log(`PASS — ${nume}`);
    trecute++;
  } else {
    console.error(`FAIL — ${nume}`);
    esuate++;
  }
}

/*
 * TEST 1
 * Parser interval.
 */

const interval1 =
  parseazaInterval("(2,5]");

test(
  "parseaza corect (2,5]",
  interval1 !== null &&
    interval1.stanga === 2 &&
    interval1.dreapta === 5 &&
    interval1.inchisStanga === false &&
    interval1.inchisDreapta === true
);

/*
 * TEST 2
 * Apartenenta la interval.
 */

test(
  "4 apartine intervalului [2,5]",
  intervalContine(
    parseazaInterval("[2,5]"),
    4
  ) === true
);

test(
  "2 NU apartine intervalului (2,5]",
  intervalContine(
    parseazaInterval("(2,5]"),
    2
  ) === false
);

/*
 * TEST 3
 * Eroarea reala:
 *
 * x > 2 si x <= 5
 *
 * Corect: (2,5]
 * Gresit: [2,5]
 */

const intervalConditii =
  intervalDinConditii(
    "x > 2 si x <= 5"
  );

test(
  "x > 2 si x <= 5 produce (2,5]",
  intervaleEgale(
    intervalConditii,
    parseazaInterval("(2,5]")
  )
);

test(
  "respinge raspunsul gresit [2,5]",
  !intervaleEgale(
    intervalConditii,
    parseazaInterval("[2,5]")
  )
);

/*
 * TEST 4
 * Eroarea reala:
 *
 * 2x - 5 < 3
 *
 * Corect: (-inf,4)
 * Gresit: (-4,inf)
 */

const intervalInecuatie =
  rezolvaInecuatieLiniara(
    "2x - 5 < 3"
  );

test(
  "2x - 5 < 3 produce (-inf,4)",
  intervaleEgale(
    intervalInecuatie,
    parseazaInterval("(-inf,4)")
  )
);

test(
  "respinge raspunsul gresit (-4,inf)",
  !intervaleEgale(
    intervalInecuatie,
    parseazaInterval("(-4,inf)")
  )
);

/*
 * TEST 5
 * Control pentru coeficient negativ.
 *
 * -2x + 4 <= 10
 * -2x <= 6
 * x >= -3
 *
 * Corect: [-3,inf)
 */

const intervalCoeficientNegativ =
  rezolvaInecuatieLiniara(
    "-2x + 4 <= 10"
  );

test(
  "inverseaza corect sensul la coeficient negativ",
  intervaleEgale(
    intervalCoeficientNegativ,
    parseazaInterval("[-3,inf)")
  )
);

/*
 * TEST 6
 * Eroarea reala din grila.
 *
 * Pentru numarul 4:
 * [2,5] este corect
 * [0,6] este tot corect
 *
 * Grila trebuie respinsa.
 */

const grilaAmbigua =
  verificaGrilaApartenenta(
    4,
    [
      "[2,5]",
      "[0,6]",
      "(-3,2)",
      "[7,9]",
    ],
    "[0,6]"
  );

test(
  "detecteaza grila cu doua variante corecte",
  grilaAmbigua !== null &&
    grilaAmbigua.valid === false &&
    grilaAmbigua.indiciCorecti.length === 2 &&
    grilaAmbigua.indiciCorecti[0] === 0 &&
    grilaAmbigua.indiciCorecti[1] === 1
);

/*
 * TEST 7
 * Control pozitiv:
 * grila cu exact o varianta corecta.
 */

const grilaCorecta =
  verificaGrilaApartenenta(
    4,
    [
      "(0,3]",
      "[4,6)",
      "(-5,0)",
      "[7,9]",
    ],
    "[4,6)"
  );

test(
  "accepta grila cu exact o varianta corecta",
  grilaCorecta !== null &&
    grilaCorecta.valid === true &&
    grilaCorecta.indiciCorecti.length === 1 &&
    grilaCorecta.indiciCorecti[0] === 1
);

/*
 * TEST 8
 * Fail-safe:
 * daca expresia nu este suportata,
 * Math QA nu trebuie sa ghiceasca.
 */

test(
  "expresia nesuportata returneaza null",
  rezolvaInecuatieLiniara(
    "x^2 - 5x + 6 < 0"
  ) === null
);


/*
 * TEST 9
 * Exercitiu complet:
 * conditii explicite.
 *
 * Eroare reala:
 * x > 2 si x <= 5
 * raspuns gresit: [2,5]
 */

const exercitiuConditiiGresit =
  valideazaExercitiuMatematic({
    tip: "raspuns-scurt",
    enunt:
      "Determina intervalul numerelor reale x pentru care x > 2 si x <= 5.",
    raspunsCorect: "[2,5]",
  });

test(
  "exercitiu complet: respinge [2,5] pentru x > 2 si x <= 5",
  exercitiuConditiiGresit.some(
    (eroare) =>
      eroare.includes(
        "raspunsul interval nu corespunde conditiilor"
      )
  )
);

/*
 * TEST 10
 * Exercitiu complet:
 * inecuatie liniara in text.
 *
 * Eroare reala:
 * 2x - 5 < 3
 * raspuns gresit: (-4,inf)
 */

const exercitiuInecuatieTextGresit =
  valideazaExercitiuMatematic({
    tip: "raspuns-scurt",
    enunt:
      "Rezolva inecuatia 2x - 5 < 3.",
    raspunsCorect:
      "Intervalul (-4, ∞).",
  });

test(
  "exercitiu complet: respinge raspuns textual gresit pentru 2x - 5 < 3",
  exercitiuInecuatieTextGresit.some(
    (eroare) =>
      eroare.includes(
        "raspunsul interval nu corespunde inecuatiei liniare"
      )
  )
);
const exercitiuInecuatieGresit =
  valideazaExercitiuMatematic({
    tip: "raspuns-scurt",
    enunt:
      "Rezolva inecuatia 2x - 5 < 3.",
    raspunsCorect: "(-4,inf)",
  });

test(
  "exercitiu complet: respinge (-4,inf) pentru 2x - 5 < 3",
  exercitiuInecuatieGresit.some(
    (eroare) =>
      eroare.includes(
        "raspunsul interval nu corespunde inecuatiei liniare"
      )
  )
);

/*
 * TEST 11
 * Exercitiu complet:
 * grila ambigua de apartenenta.
 *
 * Atat [2,5], cat si [0,6]
 * contin numarul 4.
 */

const exercitiuGrilaAmbigua =
  valideazaExercitiuMatematic({
    tip: "alegere-multipla",
    enunt:
      "Care dintre urmatoarele intervale contine numarul 4?",
    variante: [
      "[2,5]",
      "[0,6]",
      "(-3,2)",
      "[7,9]",
    ],
    raspunsCorect: "[0,6]",
  });

test(
  "exercitiu complet: respinge grila cu doua variante corecte",
  exercitiuGrilaAmbigua.some(
    (eroare) =>
      eroare.includes(
        "Grila are 2 variante matematic corecte"
      )
  )
);
/*
 * TEST REGRESIE
 * Caz real BAC MATE:
 * formularea "include numarul 3"
 * trebuie sa activeze Gate 3.
 * Toate cele 4 intervale contin numarul 3.
 */

const exercitiuGrilaIncludeAmbigua =
  valideazaExercitiuMatematic({
    tip: "alegere-multipla",
    enunt:
      "Care dintre urmatoarele intervale include numarul 3?",
    variante: [
      "(-inf, 3]",
      "[2, inf)",
      "(1, 5)",
      "(-inf, 4)",
    ],
    raspunsCorect: "[2, inf)",
  });

test(
  "exercitiu complet: respinge grila cu include si patru variante corecte",
  exercitiuGrilaIncludeAmbigua.some(
    (eroare) =>
      eroare.includes(
        "Grila are 4 variante matematic corecte"
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
