/*
 * BAC MATE — EXERCISE QA V1
 *
 * QA determinist pentru coerenta exercitiilor.
 *
 * NU verifica matematica.
 * NU modifica lectii.
 * NU publica.
 */

function faraDiacritice(text) {
  return String(text ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function normalizeazaText(text) {
  return faraDiacritice(text)
    .toLowerCase()
    .replace(/\bscrieti\b/g, "scrie")
    .replace(/\bdeterminati\b/g, "determina")
    .replace(/\b(?:dintr|intr)[ -]?un\b/g, "un")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeazaRaspuns(text) {
  return faraDiacritice(text)
    .toLowerCase()
    .replace(/\s+/g, "")
    .trim();
}

function similaritateJaccard(textA, textB) {
  const a = new Set(
    normalizeazaText(textA)
      .split(" ")
      .filter(Boolean)
  );

  const b = new Set(
    normalizeazaText(textB)
      .split(" ")
      .filter(Boolean)
  );

  if (a.size === 0 || b.size === 0) {
    return 0;
  }

  const intersectie = [
    ...a
  ].filter(
    (cuvant) => b.has(cuvant)
  ).length;

  const reuniune =
    new Set([...a, ...b]).size;

  return intersectie / reuniune;
}

/*
 * GATE 1
 * Referinta vizuala fara suport vizual.
 *
 * Schema V6 actuala este text-only.
 */

export function detecteazaReferintaVizualaFaraSuport(
  exercitiu
) {
  const enunt =
    normalizeazaText(
      exercitiu?.enunt
    );

  if (!enunt) {
    return null;
  }

  const referinteVizuale = [
    /\baxa numerelor\b/,
    /\baxa reala\b/,
    /\bgrafic(?:ul|ului)?\b/,
    /\bfigura\b/,
    /\bfigurii\b/,
    /\bdiagrama\b/,
    /\bdiagramei\b/,
    /\bimaginea\b/,
    /\bimaginii\b/,
    /\breprezentat(?:a)?\b.*\baxa\b/,
    /\breprezentarea\b.*\baxa\b/,
  ];

  const cereSuportVizual =
    referinteVizuale.some(
      (regex) =>
        regex.test(enunt)
    );

  if (!cereSuportVizual) {
    return null;
  }

  return (
    "Exercise QA: enuntul face referire la un suport vizual " +
    "(axa/grafic/figura/diagrama/imagine), dar exercitiul " +
    "nu furnizeaza acel suport."
  );
}

/*
 * GATE 2
 * Duplicate pedagogice foarte probabile.
 *
 * Regula este intentionat conservatoare:
 * - acelasi raspuns corect;
 * - minimum 6 cuvinte in fiecare enunt;
 * - similaritate Jaccard >= 0.85.
 */

export function detecteazaDuplicatePedagogice(
  exercitii
) {
  const erori = [];

  if (!Array.isArray(exercitii)) {
    return erori;
  }

  for (
    let i = 0;
    i < exercitii.length;
    i++
  ) {
    for (
      let j = i + 1;
      j < exercitii.length;
      j++
    ) {
      const a = exercitii[i];
      const b = exercitii[j];

      const enuntA =
        normalizeazaText(a?.enunt);

      const enuntB =
        normalizeazaText(b?.enunt);

      const raspunsA =
        normalizeazaRaspuns(
          a?.raspunsCorect
        );

      const raspunsB =
        normalizeazaRaspuns(
          b?.raspunsCorect
        );

      const cuvinteA =
        enuntA
          .split(" ")
          .filter(Boolean);

      const cuvinteB =
        enuntB
          .split(" ")
          .filter(Boolean);

      if (
        cuvinteA.length < 6 ||
        cuvinteB.length < 6 ||
        !raspunsA ||
        raspunsA !== raspunsB
      ) {
        continue;
      }

      const scor =
        similaritateJaccard(
          enuntA,
          enuntB
        );

      if (scor >= 0.85) {
        erori.push(
          "Exercise QA: exercitiile " +
          `${i + 1} si ${j + 1} sunt duplicate pedagogice ` +
          `(similaritate ${scor.toFixed(2)}, acelasi raspuns corect).`
        );
      }
    }
  }

  return erori;
}

export function valideazaExercitiuPedagogic(
  exercitiu
) {
  const erori = [];

  const eroareVizuala =
    detecteazaReferintaVizualaFaraSuport(
      exercitiu
    );

  if (eroareVizuala) {
    erori.push(
      eroareVizuala
    );
  }

  return erori;
}

export function valideazaSetExercitiiPedagogic(
  exercitii
) {
  const erori = [];

  if (!Array.isArray(exercitii)) {
    return [
      "Exercise QA: setul de exercitii este invalid."
    ];
  }

  exercitii.forEach(
    (exercitiu, index) => {
      for (
        const eroare
        of valideazaExercitiuPedagogic(
          exercitiu
        )
      ) {
        erori.push(
          `exercitiul ${index + 1}: ${eroare}`
        );
      }
    }
  );

  erori.push(
    ...detecteazaDuplicatePedagogice(
      exercitii
    )
  );

  return erori;
}
