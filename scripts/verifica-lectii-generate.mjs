import fs from "fs";
import path from "path";

/* =========================================================
   BAC MATE
   Verificator automat pentru lecțiile generate de AI

   IMPORTANT:
   - NU garantează corectitudinea matematică absolută.
   - Detectează:
       • erori aritmetice simple
       • contradicții răspuns / explicație
       • quiz-uri inconsistente
       • structură incompletă
       • unele probleme frecvente de limbă
   - Verificarea umană rămâne obligatorie înainte de publicare.
   ========================================================= */

const ROOT = process.cwd();

const CONTINUT_DIR = path.join(
  ROOT,
  "data",
  "continut-video"
);

const RAPORT_PATH = path.join(
  CONTINUT_DIR,
  "raport-verificare-lectii.json"
);

/* =========================================================
   Argumente terminal
   ========================================================= */

function citesteArgumente() {
  const args = process.argv.slice(2);

  let toate = false;
  let modul = null;
  let limita = null;
  let id = null;

  for (const arg of args) {
    if (arg === "--all") {
      toate = true;
    }

    if (arg.startsWith("--modul=")) {
      const valoare = Number(
        arg.replace("--modul=", "")
      );

      if (
        Number.isInteger(valoare) &&
        valoare > 0
      ) {
        modul = valoare;
      }
    }

    if (arg.startsWith("--limit=")) {
      const valoare = Number(
        arg.replace("--limit=", "")
      );

      if (
        Number.isInteger(valoare) &&
        valoare > 0
      ) {
        limita = valoare;
      }
    }

    if (arg.startsWith("--id=")) {
      const valoare = arg
        .replace("--id=", "")
        .trim();

      if (valoare) {
        id = valoare;
      }
    }
  }

  return {
    toate,
    modul,
    limita,
    id,
  };
}

/* =========================================================
   JSON
   ========================================================= */

function citesteJson(cale) {
  return JSON.parse(
    fs.readFileSync(cale, "utf8")
  );
}

function scrieJson(cale, continut) {
  fs.writeFileSync(
    cale,
    JSON.stringify(continut, null, 2) + "\n",
    "utf8"
  );
}

/* =========================================================
   Text
   ========================================================= */

function normalizeazaText(text) {
  return String(text ?? "")
    .replace(/\u2212/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

function textMic(text) {
  return normalizeazaText(text)
    .toLocaleLowerCase("ro-RO");
}

/* =========================================================
   Fracții exacte
   ========================================================= */

function cmmdc(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);

  while (b !== 0) {
    const rest = a % b;
    a = b;
    b = rest;
  }

  return a || 1;
}

class Fractie {
  constructor(numarator, numitor = 1) {
    if (!Number.isInteger(numarator)) {
      throw new Error(
        `Numărător invalid: ${numarator}`
      );
    }

    if (!Number.isInteger(numitor)) {
      throw new Error(
        `Numitor invalid: ${numitor}`
      );
    }

    if (numitor === 0) {
      throw new Error(
        "Împărțire la zero."
      );
    }

    if (numitor < 0) {
      numarator *= -1;
      numitor *= -1;
    }

    const d = cmmdc(
      numarator,
      numitor
    );

    this.n = numarator / d;
    this.d = numitor / d;
  }

  aduna(alta) {
    return new Fractie(
      this.n * alta.d +
        alta.n * this.d,
      this.d * alta.d
    );
  }

  scade(alta) {
    return new Fractie(
      this.n * alta.d -
        alta.n * this.d,
      this.d * alta.d
    );
  }

  inmulteste(alta) {
    return new Fractie(
      this.n * alta.n,
      this.d * alta.d
    );
  }

  imparte(alta) {
    if (alta.n === 0) {
      throw new Error(
        "Împărțire la zero."
      );
    }

    return new Fractie(
      this.n * alta.d,
      this.d * alta.n
    );
  }

  egal(alta) {
    return (
      this.n === alta.n &&
      this.d === alta.d
    );
  }

  toString() {
    if (this.d === 1) {
      return String(this.n);
    }

    return `${this.n}/${this.d}`;
  }
}

/* =========================================================
   Număr text -> fracție
   ========================================================= */

function numarTextLaFractie(text) {
  let valoare = String(text)
    .trim()
    .replace(",", ".");

  if (!valoare) {
    throw new Error(
      "Număr gol."
    );
  }

  let semn = 1;

  if (valoare.startsWith("-")) {
    semn = -1;
    valoare = valoare.slice(1);
  } else if (
    valoare.startsWith("+")
  ) {
    valoare = valoare.slice(1);
  }

  if (
    !/^\d+(?:\.\d+)?$/.test(
      valoare
    )
  ) {
    throw new Error(
      `Număr necunoscut: ${text}`
    );
  }

  if (!valoare.includes(".")) {
    return new Fractie(
      semn * Number(valoare),
      1
    );
  }

  const [
    parteIntreaga,
    parteZecimala,
  ] = valoare.split(".");

  const baza =
    10 ** parteZecimala.length;

  const numarator =
    Number(parteIntreaga) *
      baza +
    Number(parteZecimala);

  return new Fractie(
    semn * numarator,
    baza
  );
}

/* =========================================================
   Tokenizare expresii
   ========================================================= */

function tokenizeazaExpresie(expresie) {
  const text = String(expresie)
    .replace(/\u2212/g, "-")
    .replace(/×/g, "*")
    .replace(/·/g, "*")
    .replace(/÷/g, "/")
    .replace(/,/g, ".")
    .replace(/\s+/g, "");

  const tokenuri = [];

  let i = 0;

  while (i < text.length) {
    const caracter = text[i];

    if (
      "+-*/()".includes(caracter)
    ) {
      tokenuri.push({
        tip: caracter,
        valoare: caracter,
      });

      i++;
      continue;
    }

    if (/\d/.test(caracter)) {
      let numar = "";

      while (
        i < text.length &&
        /[\d.]/.test(text[i])
      ) {
        numar += text[i];
        i++;
      }

      if (
        (numar.match(/\./g) || [])
          .length > 1
      ) {
        throw new Error(
          "Număr zecimal invalid."
        );
      }

      tokenuri.push({
        tip: "numar",
        valoare: numar,
      });

      continue;
    }

    throw new Error(
      `Caracter matematic necunoscut: "${caracter}"`
    );
  }

  return tokenuri;
}

/* =========================================================
   Evaluare expresie
   ========================================================= */

function evalueazaExpresie(expresie) {
  const tokenuri =
    tokenizeazaExpresie(
      expresie
    );

  let pozitie = 0;

  function tokenCurent() {
    return tokenuri[pozitie];
  }

  function consuma(tip) {
    const token =
      tokenCurent();

    if (
      !token ||
      token.tip !== tip
    ) {
      throw new Error(
        `Așteptam "${tip}".`
      );
    }

    pozitie++;
    return token;
  }

  function parseFactor() {
    const token =
      tokenCurent();

    if (!token) {
      throw new Error(
        "Expresie incompletă."
      );
    }

    if (token.tip === "+") {
      consuma("+");
      return parseFactor();
    }

    if (token.tip === "-") {
      consuma("-");

      const rezultat =
        parseFactor();

      return new Fractie(
        -rezultat.n,
        rezultat.d
      );
    }

    if (token.tip === "numar") {
      consuma("numar");

      return numarTextLaFractie(
        token.valoare
      );
    }

    if (token.tip === "(") {
      consuma("(");

      const rezultat =
        parseExpresie();

      consuma(")");

      return rezultat;
    }

    throw new Error(
      "Factor matematic invalid."
    );
  }

  function parseTermen() {
    let rezultat =
      parseFactor();

    while (true) {
      const token =
        tokenCurent();

      if (!token) {
        break;
      }

      if (token.tip === "*") {
        consuma("*");

        rezultat =
          rezultat.inmulteste(
            parseFactor()
          );

        continue;
      }

      if (token.tip === "/") {
        consuma("/");

        rezultat =
          rezultat.imparte(
            parseFactor()
          );

        continue;
      }

      break;
    }

    return rezultat;
  }

  function parseExpresie() {
    let rezultat =
      parseTermen();

    while (true) {
      const token =
        tokenCurent();

      if (!token) {
        break;
      }

      if (token.tip === "+") {
        consuma("+");

        rezultat =
          rezultat.aduna(
            parseTermen()
          );

        continue;
      }

      if (token.tip === "-") {
        consuma("-");

        rezultat =
          rezultat.scade(
            parseTermen()
          );

        continue;
      }

      break;
    }

    return rezultat;
  }

  const rezultat =
    parseExpresie();

  if (
    pozitie !==
    tokenuri.length
  ) {
    throw new Error(
      "Expresie matematică neprocesată complet."
    );
  }

  return rezultat;
}

/* =========================================================
   Extrage expresii aritmetice
   ========================================================= */

function extrageExpresiiAritmetice(text) {
  const rezultat = [];

  const continut =
    normalizeazaText(text);

  if (!continut) {
    return rezultat;
  }

  const regex =
    /-?\d+(?:[.,]\d+)?(?:\s*\/\s*-?\d+(?:[.,]\d+)?)?(?:\s*[+\-*/×·÷]\s*-?\d+(?:[.,]\d+)?(?:\s*\/\s*-?\d+(?:[.,]\d+)?)?)+/g;

  const gasite =
    continut.match(regex) || [];

  for (const gasit of gasite) {
    try {
      rezultat.push({
        expresie:
          gasit.trim(),
        valoare:
          evalueazaExpresie(
            gasit.trim()
          ),
      });
    } catch {
      // Ignorăm expresiile pe care
      // verificatorul simplu nu le poate interpreta.
    }
  }

  return rezultat;
}

/* =========================================================
   Valoare numerică din răspuns
   ========================================================= */

function extrageValoareNumerica(text) {
  const continut =
    normalizeazaText(text);

  if (!continut) {
    return null;
  }

  const curatat =
    continut
      .replace(
        /^r[aă]spuns\s*[:\-]?\s*/i,
        ""
      )
      .replace(
        /^rezultat\s*[:\-]?\s*/i,
        ""
      )
      .replace(
        /^este\s+/i,
        ""
      )
      .replace(
        /^[ABC]\)\s*/i,
        ""
      )
      .replace(
        /^[ABC]\.\s*/i,
        ""
      )
      .trim();

  const fractie =
    curatat.match(
      /^(-?\d+)\s*\/\s*(-?\d+)$/
    );

  if (fractie) {
    return new Fractie(
      Number(fractie[1]),
      Number(fractie[2])
    );
  }

  const numar =
    curatat.match(
      /^-?\d+(?:[.,]\d+)?$/
    );

  if (numar) {
    return numarTextLaFractie(
      numar[0]
    );
  }

  return null;
}

/* =========================================================
   Problemă standard
   ========================================================= */

function problema({
  severitate,
  tip,
  mesaj,
  video = null,
}) {
  return {
    severitate,
    tip,
    video,
    mesaj,
  };
}

/* =========================================================
   Structură
   ========================================================= */

function verificaStructura(
  lectie
) {
  const probleme = [];

  if (
    !Array.isArray(
      lectie.videoLectii
    ) ||
    lectie.videoLectii.length !==
      4
  ) {
    probleme.push(
      problema({
        severitate:
          "eroare",
        tip:
          "structura",
        mesaj:
          "Lecția trebuie să conțină exact 4 mini-video.",
      })
    );

    return probleme;
  }

  const roluri = [
    "intuitie-si-concept",
    "reguli-si-metoda",
    "exemplu-rezolvat",
    "bac-si-greseli",
  ];

  lectie.videoLectii.forEach(
    (video, index) => {
      const nr =
        index + 1;

      if (
        video.numar !== nr
      ) {
        probleme.push(
          problema({
            severitate:
              "eroare",
            tip:
              "structura",
            video:
              nr,
            mesaj:
              `Numărul video este ${video.numar}, dar trebuia ${nr}.`,
          })
        );
      }

      if (
        video.rol !==
        roluri[index]
      ) {
        probleme.push(
          problema({
            severitate:
              "eroare",
            tip:
              "structura",
            video:
              nr,
            mesaj:
              `Rol invalid: "${video.rol}".`,
          })
        );
      }

      if (
        !Array.isArray(
          video.scenariu
        ) ||
        video.scenariu.length <
          4
      ) {
        probleme.push(
          problema({
            severitate:
              "eroare",
            tip:
              "structura",
            video:
              nr,
            mesaj:
              "Scenariul are mai puțin de 4 elemente.",
          })
        );
      }

      if (
        !Array.isArray(
          video.cadre
        ) ||
        video.cadre.length < 2
      ) {
        probleme.push(
          problema({
            severitate:
              "eroare",
            tip:
              "structura",
            video:
              nr,
            mesaj:
              "Sunt necesare minimum 2 cadre.",
          })
        );
      }

      if (
        !video.exemplu ||
        typeof video.exemplu !==
          "object"
      ) {
        probleme.push(
          problema({
            severitate:
              "eroare",
            tip:
              "structura",
            video:
              nr,
            mesaj:
              "Exemplul lipsește.",
          })
        );
      }

      if (
        !video.verificareRapida ||
        typeof video.verificareRapida !==
          "object"
      ) {
        probleme.push(
          problema({
            severitate:
              "eroare",
            tip:
              "structura",
            video:
              nr,
            mesaj:
              "Verificarea rapidă lipsește.",
          })
        );
      }
    }
  );

  return probleme;
}

/* =========================================================
   Exemplu matematic
   ========================================================= */

function verificaExemplu(
  video,
  numarVideo
) {
  const probleme = [];

  const exemplu =
    video.exemplu;

  if (!exemplu) {
    return probleme;
  }

  const expresii =
    extrageExpresiiAritmetice(
      exemplu.enunt
    );

  const raspuns =
    extrageValoareNumerica(
      exemplu.raspuns
    );

  if (
    expresii.length === 1 &&
    raspuns
  ) {
    const calculat =
      expresii[0].valoare;

    if (
      !calculat.egal(
        raspuns
      )
    ) {
      probleme.push(
        problema({
          severitate:
            "eroare",
          tip:
            "matematica-exemplu",
          video:
            numarVideo,
          mesaj:
            `Exemplul declară răspunsul ${raspuns.toString()}, dar expresia "${expresii[0].expresie}" dă ${calculat.toString()}.`,
        })
      );
    }
  }

  return probleme;
}

/* =========================================================
   Quiz
   ========================================================= */

function verificaQuiz(
  video,
  numarVideo
) {
  const probleme = [];

  const quiz =
    video.verificareRapida;

  if (!quiz) {
    return probleme;
  }

  if (
    !Array.isArray(
      quiz.variante
    ) ||
    quiz.variante.length !==
      3
  ) {
    probleme.push(
      problema({
        severitate:
          "eroare",
        tip:
          "quiz",
        video:
          numarVideo,
        mesaj:
          "Quiz-ul trebuie să aibă exact 3 variante.",
      })
    );

    return probleme;
  }

  if (
    !Number.isInteger(
      quiz.raspunsCorect
    ) ||
    quiz.raspunsCorect < 0 ||
    quiz.raspunsCorect > 2
  ) {
    probleme.push(
      problema({
        severitate:
          "eroare",
        tip:
          "quiz",
        video:
          numarVideo,
        mesaj:
          "Indexul răspunsului corect trebuie să fie 0, 1 sau 2.",
      })
    );

    return probleme;
  }

  const expresii =
    extrageExpresiiAritmetice(
      quiz.intrebare
    );

  if (
    expresii.length === 1
  ) {
    const calculat =
      expresii[0].valoare;

    const varianta =
      extrageValoareNumerica(
        quiz.variante[
          quiz.raspunsCorect
        ]
      );

    if (
      varianta &&
      !varianta.egal(
        calculat
      )
    ) {
      probleme.push(
        problema({
          severitate:
            "eroare",
          tip:
            "matematica-quiz",
          video:
            numarVideo,
          mesaj:
            `Quiz-ul indică varianta ${quiz.raspunsCorect + 1} ca fiind corectă (${varianta.toString()}), dar calculul dă ${calculat.toString()}.`,
        })
      );
    }
  }

  const expresiiExplicatie =
    extrageExpresiiAritmetice(
      quiz.explicatie
    );

  if (
    expresiiExplicatie.length >
    0
  ) {
    const ultima =
      expresiiExplicatie[
        expresiiExplicatie.length - 1
      ].valoare;

    const varianta =
      extrageValoareNumerica(
        quiz.variante[
          quiz.raspunsCorect
        ]
      );

    if (
      varianta &&
      !ultima.egal(
        varianta
      )
    ) {
      probleme.push(
        problema({
          severitate:
            "eroare",
          tip:
            "contradictie-explicatie",
          video:
            numarVideo,
          mesaj:
            `Explicația ajunge numeric la ${ultima.toString()}, dar varianta marcată corectă este ${varianta.toString()}.`,
        })
      );
    }
  }

  return probleme;
}

/* =========================================================
   Limbă română
   ========================================================= */

function verificaLimba(
  video,
  numarVideo
) {
  const probleme = [];

  const texte = [
    video.titlu,
    ...(video.scenariu || []),
    ...(video.ideiDeRetinut || []),
    ...(video.cadre || []).flatMap(
      (cadru) => [
        cadru.vizual,
        cadru.naratiune,
      ]
    ),
    video.exemplu?.titlu,
    video.exemplu?.enunt,
    ...(video.exemplu?.rezolvare || []),
    video.exemplu?.raspuns,
    video.verificareRapida?.intrebare,
    ...(video.verificareRapida?.variante || []),
    video.verificareRapida?.explicatie,
  ]
    .filter(Boolean)
    .map(normalizeazaText);

  const textComplet =
    texte.join(" ");

  const reguli = [
    {
      regex:
        /\bnumerele naturale sunt inclusă\b/i,
      mesaj:
        'Acord greșit detectat: "numerele naturale sunt inclusă".',
    },
    {
      regex:
        /\bnumerele .* este\b/i,
      mesaj:
        "Posibil acord greșit între subiect plural și verb singular.",
    },
    {
      regex:
        /\bmulțimea .* sunt\b/i,
      mesaj:
        "Posibil acord greșit între „mulțimea” și verb la plural.",
    },
  ];

  for (const regula of reguli) {
    if (
      regula.regex.test(
        textComplet
      )
    ) {
      probleme.push(
        problema({
          severitate:
            "avertisment",
          tip:
            "limba-romana",
          video:
            numarVideo,
          mesaj:
            regula.mesaj,
        })
      );
    }
  }

  const formulariAbsolute = [
    "este esențială",
    "este obligatorie",
    "întotdeauna trebuie",
    "trebuie întotdeauna",
  ];

  for (
    const formulare of
    formulariAbsolute
  ) {
    if (
      textMic(
        textComplet
      ).includes(
        textMic(formulare)
      )
    ) {
      probleme.push(
        problema({
          severitate:
            "avertisment",
          tip:
            "formulare-absoluta",
          video:
            numarVideo,
          mesaj:
            `Verifică manual formularea absolută "${formulare}". Poate fi prea generală.`,
        })
      );
    }
  }

  return probleme;
}

/* =========================================================
   Contradicții text
   ========================================================= */

function verificaContradictiiText(
  video,
  numarVideo
) {
  const probleme = [];

  const explicatie =
    textMic(
      video.verificareRapida
        ?.explicatie
    );

  if (!explicatie) {
    return probleme;
  }

  if (
    explicatie.includes(
      "așteptam"
    ) ||
    explicatie.includes(
      "asteptam"
    )
  ) {
    probleme.push(
      problema({
        severitate:
          "eroare",
        tip:
          "contradictie-text",
        video:
          numarVideo,
        mesaj:
          'Explicația conține formularea "așteptam...", posibil semn că modelul a detectat o contradicție dar a păstrat răspunsul greșit.',
      })
    );
  }

  return probleme;
}

/* =========================================================
   Verificare lecție
   ========================================================= */

function verificaLectie(
  lectie,
  cale
) {
  const probleme = [];

  probleme.push(
    ...verificaStructura(
      lectie
    )
  );

  if (
    Array.isArray(
      lectie.videoLectii
    )
  ) {
    lectie.videoLectii.forEach(
      (video, index) => {
        const nr =
          index + 1;

        probleme.push(
          ...verificaExemplu(
            video,
            nr
          )
        );

        probleme.push(
          ...verificaQuiz(
            video,
            nr
          )
        );

        probleme.push(
          ...verificaLimba(
            video,
            nr
          )
        );

        probleme.push(
          ...verificaContradictiiText(
            video,
            nr
          )
        );
      }
    );
  }

  const erori =
    probleme.filter(
      (p) =>
        p.severitate ===
        "eroare"
    );

  const avertismente =
    probleme.filter(
      (p) =>
        p.severitate ===
        "avertisment"
    );

  return {
    id:
      lectie.id,
    modul:
      lectie.modul,
    numarLectie:
      lectie.numarLectie,
    titlu:
      lectie.titlu,
    fisier:
      path.relative(
        ROOT,
        cale
      ),
    aprobatAutomat:
      erori.length === 0,
    totalErori:
      erori.length,
    totalAvertismente:
      avertismente.length,
    probleme,
  };
}

/* =========================================================
   Găsire lecții generate
   ========================================================= */

function gasesteLectiiGenerate() {
  const rezultate = [];

  if (
    !fs.existsSync(
      CONTINUT_DIR
    )
  ) {
    return rezultate;
  }

  const module =
    fs
      .readdirSync(
        CONTINUT_DIR,
        {
          withFileTypes:
            true,
        }
      )
      .filter(
        (intrare) =>
          intrare.isDirectory() &&
          /^modul-\d+$/.test(
            intrare.name
          )
      )
      .sort(
        (a, b) =>
          Number(
            a.name.replace(
              "modul-",
              ""
            )
          ) -
          Number(
            b.name.replace(
              "modul-",
              ""
            )
          )
      );

  for (const modul of module) {
    const caleModul =
      path.join(
        CONTINUT_DIR,
        modul.name
      );

    const fisiere =
      fs
        .readdirSync(
          caleModul
        )
        .filter(
          (fisier) =>
            /^lectia-\d+\.json$/.test(
              fisier
            )
        )
        .sort();

    for (const fisier of fisiere) {
      const cale =
        path.join(
          caleModul,
          fisier
        );

      try {
        const lectie =
          citesteJson(
            cale
          );

        if (
          lectie.status ===
            "generat-neverificat" ||
          lectie.controlCalitate
            ?.continutGenerat ===
            true
        ) {
          rezultate.push({
            cale,
            lectie,
          });
        }
      } catch {
        // Nu blocăm scanarea tuturor lecțiilor.
      }
    }
  }

  return rezultate;
}

/* =========================================================
   Terminal
   ========================================================= */

function afiseazaRezultat(
  rezultat
) {
  console.log("");
  console.log(
    `🔍 ${rezultat.id} - ${rezultat.titlu}`
  );

  if (
    rezultat.probleme.length ===
    0
  ) {
    console.log(
      "   ✅ Nu au fost detectate probleme automate."
    );
    return;
  }

  for (const p of rezultat.probleme) {
    const icon =
      p.severitate ===
      "eroare"
        ? "❌"
        : "⚠️";

    const prefix =
      p.video
        ? `Video ${p.video}: `
        : "";

    console.log(
      `   ${icon} ${prefix}${p.mesaj}`
    );
  }

  if (
    rezultat.aprobatAutomat
  ) {
    console.log(
      "   ⚠️ Lecția nu are erori blocante, dar are avertismente."
    );
  } else {
    console.log(
      "   ❌ Lecția NU trece verificarea automată."
    );
  }
}

/* =========================================================
   MAIN
   ========================================================= */

function main() {
  console.log("");
  console.log(
    "=========================================="
  );
  console.log(
    " BAC MATE - VERIFICARE LECȚII GENERATE"
  );
  console.log(
    "=========================================="
  );
  console.log("");

  const argumente =
    citesteArgumente();

  let lectii =
    gasesteLectiiGenerate();

  /* -----------------------------------------
     Filtru după ID exact
     ----------------------------------------- */

  if (argumente.id) {
    lectii =
      lectii.filter(
        ({ lectie }) =>
          lectie.id ===
          argumente.id
      );
  }

  /* -----------------------------------------
     Filtru după modul
     ----------------------------------------- */

  if (
    argumente.modul
  ) {
    lectii =
      lectii.filter(
        ({ lectie }) =>
          Number(
            lectie.modul
          ) ===
          argumente.modul
      );
  }

  /* -----------------------------------------
     Implicit verificăm prima lecție
     doar dacă nu s-a cerut nimic.
     ----------------------------------------- */

  if (
    !argumente.toate &&
    !argumente.modul &&
    !argumente.limita &&
    !argumente.id
  ) {
    lectii =
      lectii.slice(
        0,
        1
      );
  }

  if (
    argumente.limita
  ) {
    lectii =
      lectii.slice(
        0,
        argumente.limita
      );
  }

  console.log(
    `Lecții selectate: ${lectii.length}`
  );

  if (
    argumente.id
  ) {
    console.log(
      `ID solicitat: ${argumente.id}`
    );
  }

  if (
    lectii.length === 0
  ) {
    console.log("");
    console.log(
      "❌ Nu am găsit lecția solicitată pentru verificare."
    );

    if (
      argumente.id
    ) {
      console.log(
        `ID căutat: ${argumente.id}`
      );
    }

    console.log("");
    process.exitCode = 1;
    return;
  }

  const rezultate = [];

  for (const {
    cale,
    lectie,
  } of lectii) {
    const rezultat =
      verificaLectie(
        lectie,
        cale
      );

    rezultate.push(
      rezultat
    );

    afiseazaRezultat(
      rezultat
    );
  }

  const totalErori =
    rezultate.reduce(
      (suma, rezultat) =>
        suma +
        rezultat.totalErori,
      0
    );

  const totalAvertismente =
    rezultate.reduce(
      (suma, rezultat) =>
        suma +
        rezultat.totalAvertismente,
      0
    );

  const lectiiBlocate =
    rezultate.filter(
      (rezultat) =>
        !rezultat.aprobatAutomat
    ).length;

  const raport = {
    generatLa:
      new Date().toISOString(),

    criterii: {
      id:
        argumente.id,
      modul:
        argumente.modul,
      limita:
        argumente.limita,
      toate:
        argumente.toate,
    },

    lectiiVerificate:
      rezultate.length,

    lectiiFaraEroriBlocante:
      rezultate.length -
      lectiiBlocate,

    lectiiBlocate,

    totalErori,

    totalAvertismente,

    important:
      "Acest verificator detectează doar o parte dintre probleme. Nu reprezintă verificare matematică sau curriculară completă.",

    rezultate,
  };

  scrieJson(
    RAPORT_PATH,
    raport
  );

  console.log("");
  console.log(
    "=========================================="
  );
  console.log(
    " REZULTAT FINAL"
  );
  console.log(
    "=========================================="
  );

  console.log(
    `📚 Lecții verificate: ${rezultate.length}`
  );

  console.log(
    `❌ Erori detectate: ${totalErori}`
  );

  console.log(
    `⚠️ Avertismente: ${totalAvertismente}`
  );

  console.log(
    `🚫 Lecții blocate: ${lectiiBlocate}`
  );

  console.log("");

  console.log(
    `Raport: ${path.relative(
      ROOT,
      RAPORT_PATH
    )}`
  );

  console.log("");

  if (
    lectiiBlocate > 0
  ) {
    console.log(
      "❌ Lecția NU este acceptată automat."
    );

    console.log(
      "➡️ Generatorul va putea folosi aceste erori pentru regenerare."
    );

    process.exitCode = 2;
  } else {
    console.log(
      "✅ Nu au fost găsite erori automate blocante."
    );

    console.log(
      "⚠️ Verificarea matematică și curriculară umană rămâne necesară."
    );
  }

  console.log("");
}

main();