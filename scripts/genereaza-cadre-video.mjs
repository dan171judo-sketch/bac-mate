import fs from "node:fs";
import path from "node:path";

/*
============================================================
BAC MATE — GENERATOR CADRE VIDEO V4
============================================================

Scop:
- citește automat conținutul fiecărei lecții;
- construiește scene video pentru fiecare mini-video;
- nu mai este hardcodat pentru m1-l01-v1;
- suportă:
    --id=m1-l01-v1
    --modul=1
    --limit=10
    --all
    --force
- produce cadre-video.json;
- produce raport-calitate-v4.json;
- păstrează publicarea blocată până la verificarea finală.

Structură intrare:
data/continut-video/modul-X/lectia-YY.json

Structură ieșire:
public/media/lectii/mX-lYY/mX-lYY-vZ/cadre-video.json
============================================================
*/

const ROOT = process.cwd();

const CONTINUT_ROOT = path.join(
  ROOT,
  "data",
  "continut-video"
);

const MEDIA_ROOT = path.join(
  ROOT,
  "public",
  "media",
  "lectii"
);

const RAPORT_GLOBAL = path.join(
  CONTINUT_ROOT,
  "raport-cadre-video-v4.json"
);

const args = process.argv.slice(2);

/*
============================================================
CONFIGURAȚIE STANDARD
============================================================
*/

const STANDARD = {
  nume: "BAC MATE Premium Video Standard",
  versiune: "4.0",

  rezolutie: {
    latime: 1280,
    inaltime: 720,
  },

  fps: 30,

  audio: {
    limba: "ro-RO",
    vocePreferata: "ro-RO-AlinaNeural",
    rate: "-2%",
    stil:
      "profesor calm, natural, clar și explicativ",
  },

  vizual: {
    safeMarginPx: 64,

    fontMinimTextPx: 22,
    fontMinimFormulaPx: 34,

    maxCaractereTitlu: 52,
    maxCaractereSubtitlu: 125,

    maxElementePerScena: 5,

    contrastRidicat: true,
    tranzitiiDiscrete: true,

    rezolutie: "1280x720",

    animatii: {
      progresive: true,
      decorative: false,
    },
  },

  pedagogie: {
    minScene: 5,
    maxScene: 9,

    necesitaIntro: true,
    necesitaExemplu: true,
    necesitaConcluzie: true,

    maxIdeiPrincipalePerScena: 1,
  },

  publicare: {
    necesitaVerificareMatematica: true,
    necesitaVerificarePrograma: true,
    necesitaVerificareLimba: true,
    necesitaVerificareAudio: true,
    necesitaVerificareSincronizare: true,
    necesitaVerificareVizuala: true,
    necesitaVerificareUmanaFinala: true,
  },
};

/*
============================================================
ARGUMENTE
============================================================
*/

function valoareArgument(prefix) {
  const gasit = args.find((arg) =>
    arg.startsWith(`${prefix}=`)
  );

  if (!gasit) {
    return null;
  }

  return gasit
    .slice(prefix.length + 1)
    .trim();
}

function areArgument(nume) {
  return args.includes(nume);
}

const ID_CERUT =
  valoareArgument("--id");

const MODUL_CERUT =
  valoareArgument("--modul");

const LIMITA_TEXT =
  valoareArgument("--limit");

const TOATE =
  areArgument("--all");

const FORCE =
  areArgument("--force");

const LIMITA =
  LIMITA_TEXT
    ? Number(LIMITA_TEXT)
    : null;

/*
============================================================
UTILITARE
============================================================
*/

function exista(cale) {
  return fs.existsSync(cale);
}

function asiguraFolder(folder) {
  fs.mkdirSync(folder, {
    recursive: true,
  });
}

function citesteJson(cale) {
  return JSON.parse(
    fs.readFileSync(
      cale,
      "utf8"
    )
  );
}

function salveazaJson(
  cale,
  continut
) {
  asiguraFolder(
    path.dirname(cale)
  );

  fs.writeFileSync(
    cale,
    JSON.stringify(
      continut,
      null,
      2
    ),
    "utf8"
  );
}

function textSigur(
  valoare,
  fallback = ""
) {
  if (
    typeof valoare !== "string"
  ) {
    return fallback;
  }

  return valoare.trim();
}

function arraySigur(valoare) {
  return Array.isArray(valoare)
    ? valoare
    : [];
}

function limitaText(
  text,
  maxim
) {
  const curat =
    textSigur(text);

  if (
    curat.length <= maxim
  ) {
    return curat;
  }

  return (
    curat
      .slice(
        0,
        Math.max(
          1,
          maxim - 1
        )
      )
      .trimEnd() + "…"
  );
}

function curataTextNaratiune(text) {
  return textSigur(text)
    .replace(/\s+/g, " ")
    .trim();
}

function numaraCuvinte(text) {
  const curat =
    curataTextNaratiune(text);

  if (!curat) {
    return 1;
  }

  return Math.max(
    1,
    curat.split(/\s+/).length
  );
}

function titluScurt(text) {
  return limitaText(
    text,
    STANDARD.vizual
      .maxCaractereTitlu
  );
}

function subtitluScurt(text) {
  return limitaText(
    text,
    STANDARD.vizual
      .maxCaractereSubtitlu
  );
}

function creeazaIdElement(
  prefix,
  numar
) {
  return `${prefix}-${String(
    numar
  ).padStart(2, "0")}`;
}

/*
============================================================
IDENTIFICARE VIDEO
============================================================
*/

function parseazaIdVideo(id) {
  const match =
    String(id).match(
      /^m(\d+)-l(\d+)-v([1-4])$/i
    );

  if (!match) {
    return null;
  }

  return {
    id,
    modul: Number(match[1]),
    lectie: Number(match[2]),
    video: Number(match[3]),

    idLectie:
      `m${Number(
        match[1]
      )}-l${String(
        Number(match[2])
      ).padStart(2, "0")}`,
  };
}

function caleJsonLectie(
  modul,
  lectie
) {
  return path.join(
    CONTINUT_ROOT,
    `modul-${modul}`,
    `lectia-${String(
      lectie
    ).padStart(2, "0")}.json`
  );
}

function caleFolderVideo(id) {
  const info =
    parseazaIdVideo(id);

  if (!info) {
    return null;
  }

  return path.join(
    MEDIA_ROOT,
    info.idLectie,
    id
  );
}

/*
============================================================
DESCOPERIRE CONȚINUT
============================================================
*/

function gasesteToateLectiile() {
  if (!exista(CONTINUT_ROOT)) {
    return [];
  }

  const rezultate = [];

  const foldere =
    fs.readdirSync(
      CONTINUT_ROOT,
      {
        withFileTypes: true,
      }
    );

  for (const folder of foldere) {
    if (!folder.isDirectory()) {
      continue;
    }

    const match =
      folder.name.match(
        /^modul-(\d+)$/i
      );

    if (!match) {
      continue;
    }

    const modul =
      Number(match[1]);

    const folderModul =
      path.join(
        CONTINUT_ROOT,
        folder.name
      );

    const fisiere =
      fs.readdirSync(
        folderModul,
        {
          withFileTypes: true,
        }
      );

    for (const fisier of fisiere) {
      if (!fisier.isFile()) {
        continue;
      }

      const lectieMatch =
        fisier.name.match(
          /^lectia-(\d+)\.json$/i
        );

      if (!lectieMatch) {
        continue;
      }

      rezultate.push({
        modul,
        lectie:
          Number(
            lectieMatch[1]
          ),
        cale:
          path.join(
            folderModul,
            fisier.name
          ),
      });
    }
  }

  return rezultate.sort(
    (a, b) => {
      if (
        a.modul !== b.modul
      ) {
        return (
          a.modul - b.modul
        );
      }

      return (
        a.lectie -
        b.lectie
      );
    }
  );
}

function gasesteToateVideo() {
  const rezultate = [];

  for (
    const lectieInfo of
    gasesteToateLectiile()
  ) {
    let json;

    try {
      json = citesteJson(
        lectieInfo.cale
      );
    } catch {
      continue;
    }

    const videoLectii =
      arraySigur(
        json.videoLectii
      );

    for (
      const video of videoLectii
    ) {
      if (
        !parseazaIdVideo(
          video?.id
        )
      ) {
        continue;
      }

      rezultate.push({
        lectieJson: json,
        video,
        caleJson:
          lectieInfo.cale,
      });
    }
  }

  return rezultate.sort(
    (a, b) =>
      a.video.id.localeCompare(
        b.video.id,
        undefined,
        {
          numeric: true,
        }
      )
  );
}

/*
============================================================
CLASIFICARE ELEMENTE
============================================================
*/

function detecteazaFormula(text) {
  const valoare =
    textSigur(text);

  if (!valoare) {
    return false;
  }

  return (
    /[=<>≤≥∈⊂√^]/.test(
      valoare
    ) ||
    /\d+\s*\/\s*\d+/.test(
      valoare
    )
  );
}

function tipElementPentruText(
  text,
  fallback = "mesaj"
) {
  if (detecteazaFormula(text)) {
    return "formula";
  }

  return fallback;
}

function creeazaElementText({
  id,
  text,
  apareLa = 0.15,
  importanta = "normala",
  tip = null,
}) {
  const curat =
    curataTextNaratiune(text);

  return {
    id,

    tip:
      tip ||
      tipElementPentruText(
        curat
      ),

    text:
      limitaText(
        curat,
        135
      ),

    apareLa,

    importanta,
  };
}

/*
============================================================
SCENĂ INTRO
============================================================
*/

function construiesteIntro(
  lectie,
  video
) {
  const roluri = {
    "intuitie-si-concept":
      "Înțelegem ideea principală",

    "reguli-si-metoda":
      "Construim metoda pas cu pas",

    "exemplu-rezolvat":
      "Rezolvăm împreună",

    "bac-si-greseli":
      "Aplicăm la Bac și evităm greșelile",
  };

  const subtitlu =
    roluri[video.rol] ||
    "Înțelegem și aplicăm pas cu pas";

  const primulScenariu =
    arraySigur(
      video.scenariu
    )[0];

  const elemente = [
    creeazaElementText({
      id: "intro-tema",

      text:
        video.titlu ||
        lectie.titlu,

      apareLa: 0.1,

      importanta:
        "maxima",

      tip:
        "titlu-principal",
    }),
  ];

  if (primulScenariu) {
    elemente.push(
      creeazaElementText({
        id:
          "intro-obiectiv",

        text:
          primulScenariu,

        apareLa: 0.52,

        importanta:
          "ridicata",
      })
    );
  }

  return {
    id: "intro",
    ordine: 1,
    tip: "intro",

    titlu:
      titluScurt(
        video.titlu ||
        lectie.titlu
      ),

    subtitlu:
      subtitluScurt(
        subtitlu
      ),

    obiectiv:
      textSigur(
        lectie.obiectivGeneral,
        "Elevul înțelege obiectivul mini-lecției."
      ),

    accentPrincipal:
      textSigur(
        video.titlu,
        lectie.titlu
      ),

    naratiune:
      curataTextNaratiune(
        primulScenariu ||
        `În această lecție înțelegem ${video.titlu}.`
      ),

    vizual:
      `Titlul lecției și o reprezentare matematică simplă pentru tema „${
        video.titlu ||
        lectie.titlu
      }”.`,

    elemente,
  };
}

/*
============================================================
SCENE DIN CADRELE AI
============================================================
*/

function construiesteSceneDinCadre(
  video
) {
  const cadre =
    arraySigur(
      video.cadre
    );

  return cadre
    .slice(0, 3)
    .map(
      (cadru, index) => {
        const naratiune =
          curataTextNaratiune(
            cadru.naratiune
          );

        const vizual =
          curataTextNaratiune(
            cadru.vizual
          );

        return {
          id:
            `concept-${index + 1}`,

          ordine: 0,

          tip:
            index === 0
              ? "concept"
              : "explicatie",

          titlu:
            titluScurt(
              extrageTitluCadru(
                naratiune,
                index
              )
            ),

          subtitlu:
            subtitluScurt(
              vizual
            ),

          obiectiv:
            `Elevul urmărește ideea ${index + 1} pas cu pas.`,

          accentPrincipal:
            extrageAccent(
              naratiune
            ),

          naratiune,

          vizual,

          elemente:
            construiesteElementeDinNaratiune(
              naratiune,
              `concept-${index + 1}`
            ),
        };
      }
    );
}

function extrageTitluCadru(
  naratiune,
  index
) {
  if (!naratiune) {
    return `Ideea ${index + 1}`;
  }

  const primaPropozitie =
    naratiune
      .split(/[.!?]/)[0]
      .trim();

  if (
    primaPropozitie.length >= 8
  ) {
    return primaPropozitie;
  }

  return `Ideea ${index + 1}`;
}

function extrageAccent(text) {
  const curat =
    textSigur(text);

  const expresie =
    curat.match(
      /(?:\d+\s*\/\s*\d+|[-+]?\d+(?:[,.]\d+)?\s*[=<>≤≥]\s*[-+]?\d+(?:[,.]\d+)?|[ℕℤℚℝNZQR]\s*[⊂∈]\s*[ℕℤℚℝNZQR])/u
    );

  if (expresie) {
    return expresie[0];
  }

  return limitaText(
    curat,
    60
  );
}

function construiesteElementeDinNaratiune(
  naratiune,
  prefix
) {
  const propozitii =
    naratiune
      .split(
        /(?<=[.!?])\s+/
      )
      .map((x) =>
        x.trim()
      )
      .filter(Boolean)
      .slice(0, 4);

  if (
    propozitii.length === 0
  ) {
    return [
      creeazaElementText({
        id:
          `${prefix}-mesaj`,

        text:
          "Urmărim ideea pas cu pas.",

        apareLa: 0.15,
      }),
    ];
  }

  return propozitii.map(
    (text, index) =>
      creeazaElementText({
        id:
          `${prefix}-e${index + 1}`,

        text,

        apareLa:
          Math.min(
            0.1 +
              index * 0.23,
            0.82
          ),

        importanta:
          index === 0
            ? "ridicata"
            : "normala",
      })
  );
}

/*
============================================================
SCENĂ DIN SCENARIU
============================================================
*/

function construiesteScenaScenariu(
  video
) {
  const puncte =
    arraySigur(
      video.scenariu
    )
      .filter(Boolean)
      .slice(0, 4);

  if (puncte.length === 0) {
    return null;
  }

  const elemente =
    puncte.map(
      (text, index) =>
        creeazaElementText({
          id:
            `idee-${index + 1}`,

          text,

          apareLa:
            Math.min(
              0.08 +
                index * 0.23,
              0.82
            ),

          importanta:
            index === 0
              ? "ridicata"
              : "normala",
        })
    );

  return {
    id:
      "idei-principale",

    ordine: 0,

    tip:
      video.rol ===
      "reguli-si-metoda"
        ? "metoda"
        : "concept",

    titlu:
      video.rol ===
      "reguli-si-metoda"
        ? "Metoda"
        : "Ideile principale",

    subtitlu:
      "Construim înțelegerea pas cu pas.",

    obiectiv:
      "Elevul vede ordinea logică a ideilor.",

    accentPrincipal:
      textSigur(
        puncte[0],
        video.titlu
      ),

    naratiune:
      puncte.join(" "),

    vizual:
      "Ideile apar progresiv, una câte una, fără a încărca ecranul.",

    elemente,
  };
}

/*
============================================================
SCENĂ EXEMPLU
============================================================
*/

function construiesteScenaExemplu(
  video
) {
  const exemplu =
    video.exemplu;

  if (
    !exemplu ||
    typeof exemplu !== "object"
  ) {
    return null;
  }

  const enunt =
    textSigur(
      exemplu.enunt
    );

  const pasi =
    arraySigur(
      exemplu.rezolvare
    )
      .filter(Boolean)
      .slice(0, 4);

  const raspuns =
    textSigur(
      exemplu.raspuns
    );

  if (
    !enunt &&
    pasi.length === 0
  ) {
    return null;
  }

  const elemente = [];

  if (enunt) {
    elemente.push(
      creeazaElementText({
        id:
          "exemplu-enunt",

        text: enunt,

        apareLa: 0.05,

        importanta:
          "maxima",

        tip:
          "problema",
      })
    );
  }

  pasi.forEach(
    (pas, index) => {
      elemente.push(
        creeazaElementText({
          id:
            `exemplu-pas-${index + 1}`,

          text:
            `${index + 1}. ${pas}`,

          apareLa:
            Math.min(
              0.24 +
                index * 0.16,
              0.76
            ),

          importanta:
            "ridicata",

          tip: "pas",
        })
      );
    }
  );

  if (raspuns) {
    elemente.push(
      creeazaElementText({
        id:
          "exemplu-raspuns",

        text:
          `Răspuns: ${raspuns}`,

        apareLa: 0.88,

        importanta:
          "maxima",

        tip:
          "raspuns",
      })
    );
  }

  return {
    id: "exemplu",
    ordine: 0,
    tip: "exemplu",

    titlu:
      titluScurt(
        exemplu.titlu ||
        "Exemplu rezolvat"
      ),

    subtitlu:
      subtitluScurt(
        enunt
      ),

    obiectiv:
      "Elevul aplică metoda într-un exemplu concret.",

    accentPrincipal:
      raspuns ||
      enunt,

    naratiune:
      [
        enunt,
        ...pasi,
        raspuns
          ? `Răspunsul final este ${raspuns}.`
          : "",
      ]
        .filter(Boolean)
        .join(" "),

    vizual:
      "Enunțul rămâne vizibil, iar pașii soluției apar progresiv.",

    elemente:
      elemente.slice(
        0,
        STANDARD.vizual
          .maxElementePerScena
      ),
  };
}

/*
============================================================
SCENĂ VERIFICARE RAPIDĂ
============================================================
*/

function construiesteScenaVerificare(
  video
) {
  const verificare =
    video.verificareRapida;

  if (
    !verificare ||
    typeof verificare !== "object"
  ) {
    return null;
  }

  const intrebare =
    textSigur(
      verificare.intrebare
    );

  const variante =
    arraySigur(
      verificare.variante
    )
      .filter(Boolean)
      .slice(0, 3);

  if (!intrebare) {
    return null;
  }

  const elemente = [
    creeazaElementText({
      id:
        "verificare-intrebare",

      text:
        intrebare,

      apareLa: 0.05,

      importanta:
        "maxima",

      tip:
        "intrebare",
    }),
  ];

  variante.forEach(
    (varianta, index) => {
      elemente.push(
        creeazaElementText({
          id:
            `verificare-varianta-${index + 1}`,

          text:
            varianta,

          apareLa:
            0.32 +
            index * 0.14,

          importanta:
            "normala",

          tip:
            "varianta",
        })
      );
    }
  );

  const raspunsIndex =
    Number.isInteger(
      verificare.raspunsCorect
    )
      ? verificare.raspunsCorect
      : null;

  const raspuns =
    raspunsIndex !== null &&
    variante[raspunsIndex]
      ? variante[
          raspunsIndex
        ]
      : null;

  if (raspuns) {
    elemente.push(
      creeazaElementText({
        id:
          "verificare-raspuns",

        text:
          `Corect: ${raspuns}`,

        apareLa: 0.83,

        importanta:
          "maxima",

        tip:
          "raspuns-corect",
      })
    );
  }

  return {
    id:
      "verificare-rapida",

    ordine: 0,

    tip:
      "verificare",

    titlu:
      "Verifică dacă ai înțeles",

    subtitlu:
      subtitluScurt(
        intrebare
      ),

    obiectiv:
      "Elevul își verifică imediat înțelegerea.",

    accentPrincipal:
      raspuns ||
      "Alege răspunsul corect",

    naratiune:
      [
        intrebare,
        ...variante,
        textSigur(
          verificare.explicatie
        ),
      ]
        .filter(Boolean)
        .join(" "),

    vizual:
      "Întrebarea apare prima, apoi variantele, iar răspunsul corect este evidențiat la final.",

    elemente:
      elemente.slice(
        0,
        STANDARD.vizual
          .maxElementePerScena
      ),
  };
}

/*
============================================================
SCENĂ CONCLUZIE
============================================================
*/

function construiesteConcluzie(
  video
) {
  const idei =
    arraySigur(
      video.ideiDeRetinut
    )
      .filter(Boolean)
      .slice(0, 3);

  const elemente =
    idei.map(
      (text, index) =>
        creeazaElementText({
          id:
            `retine-${index + 1}`,

          text,

          apareLa:
            0.1 +
            index * 0.25,

          importanta:
            index === 0
              ? "maxima"
              : "ridicata",

          tip:
            detecteazaFormula(text)
              ? "formula-principala"
              : "mesaj-retine",
        })
    );

  if (
    elemente.length === 0
  ) {
    elemente.push(
      creeazaElementText({
        id:
          "retine-final",

        text:
          `Reține ideea principală din „${video.titlu}”.`,

        apareLa: 0.12,

        importanta:
          "maxima",
      })
    );
  }

  return {
    id: "concluzie",
    ordine: 0,
    tip: "concluzie",

    titlu:
      "Ce trebuie să reții",

    subtitlu:
      "Fixăm ideea principală înainte de următorul pas.",

    obiectiv:
      "Elevul fixează informațiile esențiale.",

    accentPrincipal:
      idei[0] ||
      video.titlu,

    naratiune:
      idei.length
        ? idei.join(" ")
        : `Reține ideea principală din ${video.titlu}.`,

    vizual:
      "Rezumat curat, cu ideile esențiale afișate progresiv.",

    elemente,
  };
}

/*
============================================================
CONSTRUIRE LISTĂ FINALĂ DE SCENE
============================================================
*/

function construiesteScene(
  lectie,
  video
) {
  const scene = [];

  scene.push(
    construiesteIntro(
      lectie,
      video
    )
  );

  const cadreAI =
    construiesteSceneDinCadre(
      video
    );

  /*
    Păstrăm maxim 2 cadre AI brute.
    Restul structurii este construit
    pedagogic din datele verificate.
  */

  scene.push(
    ...cadreAI.slice(0, 2)
  );

  const idei =
    construiesteScenaScenariu(
      video
    );

  if (idei) {
    scene.push(idei);
  }

  const exemplu =
    construiesteScenaExemplu(
      video
    );

  if (exemplu) {
    scene.push(exemplu);
  }

  const verificare =
    construiesteScenaVerificare(
      video
    );

  if (verificare) {
    scene.push(verificare);
  }

  scene.push(
    construiesteConcluzie(
      video
    )
  );

  /*
    Dacă avem prea multe scene,
    păstrăm:
    intro + conținut important +
    exemplu + verificare + concluzie.
  */

  while (
    scene.length >
    STANDARD.pedagogie.maxScene
  ) {
    const index =
      scene.findIndex(
        (scena, i) =>
          i > 1 &&
          scena.tip ===
            "explicatie"
      );

    if (index === -1) {
      break;
    }

    scene.splice(
      index,
      1
    );
  }

  /*
    Dacă sunt mai puțin de 5,
    adăugăm scene din ideile de reținut.
  */

  const ideiRetinut =
    arraySigur(
      video.ideiDeRetinut
    );

  let indexIdee = 0;

  while (
    scene.length <
      STANDARD.pedagogie.minScene &&
    indexIdee <
      ideiRetinut.length
  ) {
    const text =
      ideiRetinut[
        indexIdee
      ];

    scene.splice(
      Math.max(
        1,
        scene.length - 1
      ),
      0,
      {
        id:
          `fixare-${indexIdee + 1}`,

        ordine: 0,

        tip: "fixare",

        titlu:
          "Fixăm ideea",

        subtitlu:
          subtitluScurt(text),

        obiectiv:
          "Elevul fixează o idee esențială.",

        accentPrincipal:
          text,

        naratiune:
          text,

        vizual:
          "Ideea este afișată clar, în centrul ecranului, cu evidențiere discretă.",

        elemente: [
          creeazaElementText({
            id:
              `fixare-element-${indexIdee + 1}`,

            text,

            apareLa: 0.12,

            importanta:
              "maxima",
          }),
        ],
      }
    );

    indexIdee++;
  }

  /*
    Ultima soluție dacă încă avem
    mai puțin de 5 scene.
  */

  while (
    scene.length <
    STANDARD.pedagogie.minScene
  ) {
    const numar =
      scene.length;

    scene.splice(
      scene.length - 1,
      0,
      {
        id:
          `explicatie-${numar}`,

        ordine: 0,

        tip:
          "explicatie",

        titlu:
          "Înțelegem pasul",

        subtitlu:
          subtitluScurt(
            video.titlu
          ),

        obiectiv:
          "Elevul urmărește explicația gradual.",

        accentPrincipal:
          video.titlu,

        naratiune:
          arraySigur(
            video.scenariu
          )[
            numar %
            Math.max(
              1,
              arraySigur(
                video.scenariu
              ).length
            )
          ] ||
          video.titlu,

        vizual:
          "Reprezentare matematică simplă și clară.",

        elemente: [
          creeazaElementText({
            id:
              `explicatie-element-${numar}`,

            text:
              video.titlu,

            apareLa: 0.15,

            importanta:
              "ridicata",
          }),
        ],
      }
    );
  }

  /*
    Ordine + sincronizare.
  */

  scene.forEach(
    (scena, index) => {
      scena.ordine =
        index + 1;
    }
  );

  calculeazaTimpiScene(
    scene
  );

  return scene;
}

/*
============================================================
SINCRONIZARE AUTOMATĂ
============================================================

Durata scenelor nu mai este împărțită
doar arbitrar.

Folosim cantitatea de narațiune din
fiecare scenă ca pondere.

Asta oferă o bază mai bună pentru
sincronizarea cu vocea.
============================================================
*/

function calculeazaTimpiScene(
  scene
) {
  const ponderi =
    scene.map((scena) => {
      let cuvinte =
        numaraCuvinte(
          scena.naratiune
        );

      /*
        Intro și concluzie nu trebuie
        să dispară prea repede.
      */

      if (
        scena.tip === "intro"
      ) {
        cuvinte =
          Math.max(
            cuvinte,
            18
          );
      }

      if (
        scena.tip ===
        "concluzie"
      ) {
        cuvinte =
          Math.max(
            cuvinte,
            18
          );
      }

      if (
        scena.tip ===
        "exemplu"
      ) {
        cuvinte *= 1.15;
      }

      return cuvinte;
    });

  const total =
    ponderi.reduce(
      (suma, valoare) =>
        suma + valoare,
      0
    );

  let cursor = 0;

  scene.forEach(
    (scena, index) => {
      const pondere =
        total > 0
          ? ponderi[index] /
            total
          : 1 /
            scene.length;

      const start =
        cursor;

      let end =
        index ===
        scene.length - 1
          ? 1
          : cursor +
            pondere;

      end =
        Math.min(
          1,
          end
        );

      scena.startProcent =
        Number(
          start.toFixed(6)
        );

      scena.endProcent =
        Number(
          end.toFixed(6)
        );

      scena.procentDurata =
        Number(
          (
            (end - start) *
            100
          ).toFixed(4)
        );

      cursor = end;
    }
  );

  /*
    Corecție numerică finală.
  */

  if (scene.length) {
    scene[0].startProcent =
      0;

    scene[
      scene.length - 1
    ].endProcent = 1;

    scene[
      scene.length - 1
    ].procentDurata =
      Number(
        (
          (1 -
            scene[
              scene.length - 1
            ].startProcent) *
          100
        ).toFixed(4)
      );
  }
}

/*
============================================================
VALIDARE
============================================================
*/

function valideazaScene(
  scene
) {
  const erori = [];
  const avertismente = [];

  if (
    scene.length <
      STANDARD.pedagogie.minScene ||
    scene.length >
      STANDARD.pedagogie.maxScene
  ) {
    erori.push(
      `Număr scene invalid: ${scene.length}. Trebuie între ${STANDARD.pedagogie.minScene} și ${STANDARD.pedagogie.maxScene}.`
    );
  }

  if (
    !scene.some(
      (scena) =>
        scena.tip === "intro"
    )
  ) {
    erori.push(
      "Lipsește scena intro."
    );
  }

  if (
    !scene.some(
      (scena) =>
        scena.tip ===
        "exemplu"
    )
  ) {
    erori.push(
      "Lipsește scena exemplu."
    );
  }

  if (
    !scene.some(
      (scena) =>
        scena.tip ===
        "concluzie"
    )
  ) {
    erori.push(
      "Lipsește scena concluzie."
    );
  }

  const iduri =
    new Set();

  for (
    let index = 0;
    index < scene.length;
    index++
  ) {
    const scena =
      scene[index];

    if (!scena.id) {
      erori.push(
        `Scena ${index + 1} nu are ID.`
      );
    }

    if (
      iduri.has(scena.id)
    ) {
      erori.push(
        `ID scenă duplicat: ${scena.id}.`
      );
    }

    iduri.add(
      scena.id
    );

    if (
      !textSigur(
        scena.titlu
      )
    ) {
      erori.push(
        `${scena.id}: lipsește titlul.`
      );
    }

    if (
      scena.titlu?.length >
      STANDARD.vizual
        .maxCaractereTitlu
    ) {
      avertismente.push(
        `${scena.id}: titlu lung.`
      );
    }

    if (
      !textSigur(
        scena.obiectiv
      )
    ) {
      erori.push(
        `${scena.id}: lipsește obiectivul.`
      );
    }

    if (
      typeof scena.startProcent !==
        "number" ||
      typeof scena.endProcent !==
        "number"
    ) {
      erori.push(
        `${scena.id}: sincronizare invalidă.`
      );

      continue;
    }

    if (
      scena.startProcent < 0 ||
      scena.endProcent > 1 ||
      scena.startProcent >=
        scena.endProcent
    ) {
      erori.push(
        `${scena.id}: interval temporal invalid.`
      );
    }

    if (index > 0) {
      const precedenta =
        scene[index - 1];

      if (
        Math.abs(
          precedenta.endProcent -
            scena.startProcent
        ) >
        0.001
      ) {
        erori.push(
          `Gol/suprapunere între ${precedenta.id} și ${scena.id}.`
        );
      }
    }

    if (
      !Array.isArray(
        scena.elemente
      ) ||
      scena.elemente.length ===
        0
    ) {
      erori.push(
        `${scena.id}: nu are elemente vizuale.`
      );
    }

    if (
      scena.elemente?.length >
      STANDARD.vizual
        .maxElementePerScena
    ) {
      avertismente.push(
        `${scena.id}: prea multe elemente vizuale.`
      );
    }

    let aparitie =
      -1;

    for (
      const element of
      arraySigur(
        scena.elemente
      )
    ) {
      if (
        typeof element.apareLa !==
          "number" ||
        element.apareLa < 0 ||
        element.apareLa > 1
      ) {
        erori.push(
          `${scena.id}/${element.id}: apareLa invalid.`
        );
      }

      if (
        element.apareLa <
        aparitie
      ) {
        erori.push(
          `${scena.id}: elementele nu apar progresiv.`
        );
      }

      aparitie =
        element.apareLa;
    }
  }

  if (scene.length) {
    if (
      scene[0]
        .startProcent !== 0
    ) {
      erori.push(
        "Prima scenă trebuie să înceapă la 0."
      );
    }

    if (
      Math.abs(
        scene[
          scene.length - 1
        ].endProcent - 1
      ) >
      0.0001
    ) {
      erori.push(
        "Ultima scenă trebuie să se termine la 100%."
      );
    }
  }

  return {
    erori,
    avertismente,
  };
}

/*
============================================================
CONSTRUIRE VIDEO
============================================================
*/

function proceseazaVideo(
  lectie,
  video
) {
  const info =
    parseazaIdVideo(
      video.id
    );

  if (!info) {
    throw new Error(
      `ID video invalid: ${video.id}`
    );
  }

  const folderVideo =
    caleFolderVideo(
      video.id
    );

  asiguraFolder(
    folderVideo
  );

  const caleCadre =
    path.join(
      folderVideo,
      "cadre-video.json"
    );

  const caleRaport =
    path.join(
      folderVideo,
      "raport-calitate-v4.json"
    );

  /*
    Dacă există deja și nu forțăm,
    îl păstrăm.
  */

  if (
    exista(caleCadre) &&
    !FORCE
  ) {
    try {
      const existent =
        citesteJson(
          caleCadre
        );

      if (
        existent?.standard
          ?.versiune ===
          STANDARD.versiune &&
        Array.isArray(
          existent.scene
        ) &&
        existent.scene.length >=
          STANDARD.pedagogie.minScene
      ) {
        return {
          id:
            video.id,

          status:
            "existent",

          scene:
            existent.scene.length,

          cale:
            path.relative(
              ROOT,
              caleCadre
            ),
        };
      }
    } catch {
      /*
        Dacă fișierul e corupt,
        îl reconstruim.
      */
    }
  }

  const scene =
    construiesteScene(
      lectie,
      video
    );

  const {
    erori,
    avertismente,
  } =
    valideazaScene(
      scene
    );

  const audioMp3 =
    path.join(
      folderVideo,
      "audio.mp3"
    );

  const audioWav =
    path.join(
      folderVideo,
      "audio.wav"
    );

  const vocePregatita =
    path.join(
      folderVideo,
      "voce-pregatita.txt"
    );

  const voce =
    path.join(
      folderVideo,
      "voce.txt"
    );

  const subtitrare =
    path.join(
      folderVideo,
      "subtitrare.vtt"
    );

  const controlCalitate = {
    structuraTehnica:
      erori.length === 0,

    scenariuDisponibil:
      exista(
        vocePregatita
      ) ||
      exista(voce),

    audioDisponibil:
      exista(audioMp3) ||
      exista(audioWav),

    subtitrareDisponibila:
      exista(
        subtitrare
      ),

    exempluInclus:
      scene.some(
        (scena) =>
          scena.tip ===
          "exemplu"
      ),

    concluzieInclusa:
      scene.some(
        (scena) =>
          scena.tip ===
          "concluzie"
      ),

    /*
    Acestea NU sunt aprobate automat.
    */

    matematicaVerificata:
      Boolean(
        video.verificare
          ?.matematic
      ),

    programaVerificata:
      Boolean(
        video.verificare
          ?.programa
      ),

    limbaRomanaVerificata:
      Boolean(
        video.verificare
          ?.limbaRomana
      ),

    audioVerificat:
      Boolean(
        video.verificare
          ?.audio
      ),

    videoVerificat:
      Boolean(
        video.verificare
          ?.video
      ),

    sincronizareVerificata:
      false,

    pronuntieVerificata:
      false,

    vizualVerificat:
      false,

    subtitrareVerificata:
      false,

    videoFinalVerificatUman:
      false,

    poateFiPublicat:
      false,
  };

  const rezultat = {
    proiect:
      "BAC MATE",

    standard:
      STANDARD,

    lectie: {
      id:
        lectie.id,

      modul:
        lectie.modul,

      numarLectie:
        lectie.numarLectie,

      titlu:
        lectie.titlu,

      profil:
        video.metadata
          ?.profil ||
        "M_mate-info",
    },

    video: {
      id:
        video.id,

      numar:
        video.numar,

      rol:
        video.rol,

      titlu:
        video.titlu,

      durataTintaMinute:
        video.durataTintaMinute,
    },

    obiectivGeneral:
      lectie.obiectivGeneral,

    voce: {
      limba:
        STANDARD.audio
          .limba,

      vocePreferata:
        STANDARD.audio
          .vocePreferata,

      rate:
        STANDARD.audio
          .rate,

      text:
        exista(
          vocePregatita
        )
          ? "voce-pregatita.txt"
          : exista(voce)
          ? "voce.txt"
          : null,

      audio:
        exista(audioMp3)
          ? "audio.mp3"
          : exista(audioWav)
          ? "audio.wav"
          : null,
    },

    subtitrare: {
      fisier:
        exista(
          subtitrare
        )
          ? "subtitrare.vtt"
          : null,
    },

    /*
    IMPORTANT:
    assembler-ul nostru citește
    și "scene", iar generatorul
    vechi putea folosi "cadre".

    Salvăm ambele pentru
    compatibilitate.
    */

    scene,

    cadre: scene,

    verificareAutomata: {
      erori,
      avertismente,

      trecut:
        erori.length === 0,
    },

    controlCalitate,

    sursa: {
      fisierLectie:
        path.relative(
          ROOT,
          caleJsonLectie(
            info.modul,
            info.lectie
          )
        ),

      generatorContinut:
        video.metadata
          ?.generator ||
        lectie.generareAI
          ?.provider ||
        null,

      model:
        video.metadata
          ?.model ||
        lectie.generareAI
          ?.model ||
        null,

      generatCadreLa:
        new Date()
          .toISOString(),
    },
  };

  const raport = {
    proiect:
      "BAC MATE",

    versiuneStandard:
      STANDARD.versiune,

    videoId:
      video.id,

    scene:
      scene.length,

    erori,

    avertismente,

    controlCalitate,

    verdict:
      erori.length === 0
        ? "STRUCTURA_ACCEPTATA"
        : "BLOCAT",

    publicare:
      "BLOCATA",
  };

  salveazaJson(
    caleRaport,
    raport
  );

  if (
    erori.length > 0
  ) {
    return {
      id:
        video.id,

      status:
        "eroare",

      erori,

      caleRaport:
        path.relative(
          ROOT,
          caleRaport
        ),
    };
  }

  salveazaJson(
    caleCadre,
    rezultat
  );

  return {
    id:
      video.id,

    status:
      "creat",

    scene:
      scene.length,

    avertismente:
      avertismente.length,

    cale:
      path.relative(
        ROOT,
        caleCadre
      ),
  };
}

/*
============================================================
SELECTARE
============================================================
*/

function obtineSelectie() {
  let toate =
    gasesteToateVideo();

  if (ID_CERUT) {
    toate =
      toate.filter(
        (item) =>
          item.video.id ===
          ID_CERUT
      );

    if (
      toate.length === 0
    ) {
      throw new Error(
        `Nu găsesc video-ul ${ID_CERUT}.`
      );
    }
  } else if (
    MODUL_CERUT
  ) {
    const modul =
      Number(
        MODUL_CERUT
      );

    if (
      !Number.isInteger(
        modul
      ) ||
      modul < 1
    ) {
      throw new Error(
        "--modul trebuie să fie un număr valid."
      );
    }

    toate =
      toate.filter(
        (item) =>
          parseazaIdVideo(
            item.video.id
          )?.modul ===
          modul
      );
  } else if (!TOATE) {
    toate =
      toate.filter(
        (item) =>
          item.video.id ===
          "m1-l01-v1"
      );
  }

  if (
    LIMITA !== null
  ) {
    if (
      !Number.isInteger(
        LIMITA
      ) ||
      LIMITA < 1
    ) {
      throw new Error(
        "--limit trebuie să fie un număr întreg mai mare decât 0."
      );
    }

    toate =
      toate.slice(
        0,
        LIMITA
      );
  }

  return toate;
}

/*
============================================================
RAPORT GLOBAL
============================================================
*/

function salveazaRaportGlobal(
  rezultate
) {
  const raport = {
    proiect:
      "BAC MATE",

    generator:
      "genereaza-cadre-video.mjs",

    versiune:
      STANDARD.versiune,

    generatLa:
      new Date()
        .toISOString(),

    total:
      rezultate.length,

    create:
      rezultate.filter(
        (x) =>
          x.status ===
          "creat"
      ).length,

    existente:
      rezultate.filter(
        (x) =>
          x.status ===
          "existent"
      ).length,

    erori:
      rezultate.filter(
        (x) =>
          x.status ===
          "eroare"
      ).length,

    rezultate,
  };

  salveazaJson(
    RAPORT_GLOBAL,
    raport
  );
}

/*
============================================================
MAIN
============================================================
*/

function main() {
  console.log("");
  console.log(
    "========================================"
  );

  console.log(
    "🎓 BAC MATE — CADRE VIDEO V4"
  );

  console.log(
    "========================================"
  );

  console.log("");

  if (
    !exista(
      CONTINUT_ROOT
    )
  ) {
    throw new Error(
      `Nu găsesc folderul:\n${CONTINUT_ROOT}`
    );
  }

  const selectie =
    obtineSelectie();

  console.log(
    `Mini-video-uri selectate: ${selectie.length}`
  );

  console.log(
    `Standard: ${STANDARD.versiune}`
  );

  console.log(
    `Voce standard: ${STANDARD.audio.vocePreferata}`
  );

  console.log(
    `Viteză voce: ${STANDARD.audio.rate}`
  );

  console.log(
    `Mod: ${
      FORCE
        ? "REFACERE FORȚATĂ"
        : "RELUARE AUTOMATĂ"
    }`
  );

  console.log("");

  const rezultate = [];

  for (
    let index = 0;
    index <
    selectie.length;
    index++
  ) {
    const item =
      selectie[index];

    console.log(
      `[${index + 1}/${selectie.length}] ${item.video.id}`
    );

    try {
      const rezultat =
        proceseazaVideo(
          item.lectieJson,
          item.video
        );

      rezultate.push(
        rezultat
      );

      if (
        rezultat.status ===
        "creat"
      ) {
        console.log(
          `   ✅ ${rezultat.scene} scene generate`
        );
      } else if (
        rezultat.status ===
        "existent"
      ) {
        console.log(
          "   ⏭️ Cadre V4 deja existente"
        );
      } else {
        console.log(
          "   ❌ Structură blocată"
        );
      }
    } catch (error) {
      const mesaj =
        error instanceof Error
          ? error.message
          : String(error);

      console.error(
        `   ❌ ${mesaj}`
      );

      rezultate.push({
        id:
          item.video.id,

        status:
          "eroare",

        erori: [
          mesaj,
        ],
      });

      if (ID_CERUT) {
        salveazaRaportGlobal(
          rezultate
        );

        throw error;
      }
    }

    salveazaRaportGlobal(
      rezultate
    );
  }

  const create =
    rezultate.filter(
      (x) =>
        x.status ===
        "creat"
    ).length;

  const existente =
    rezultate.filter(
      (x) =>
        x.status ===
        "existent"
    ).length;

  const erori =
    rezultate.filter(
      (x) =>
        x.status ===
        "eroare"
    ).length;

  console.log("");
  console.log(
    "========================================"
  );

  console.log(
    "✅ GENERARE CADRE TERMINATĂ"
  );

  console.log(
    "========================================"
  );

  console.log("");

  console.log(
    `Create acum:       ${create}`
  );

  console.log(
    `Deja existente:    ${existente}`
  );

  console.log(
    `Cu probleme:       ${erori}`
  );

  console.log(
    `Total procesate:   ${rezultate.length}`
  );

  console.log("");

  console.log(
    `Raport: ${path.relative(
      ROOT,
      RAPORT_GLOBAL
    )}`
  );

  console.log("");

  console.log(
    "🔒 PUBLICARE: BLOCATĂ"
  );

  console.log(
    "Cadrele generate automat nu sunt declarate automat corecte matematic sau gata de publicare."
  );

  console.log("");
}

/*
============================================================
START
============================================================
*/

try {
  main();
} catch (error) {
  console.error("");
  console.error(
    "========================================"
  );

  console.error(
    "❌ GENERAREA CADRELOR A EȘUAT"
  );

  console.error(
    "========================================"
  );

  console.error("");

  console.error(
    error instanceof Error
      ? error.message
      : error
  );

  console.error("");

  process.exitCode = 1;
}