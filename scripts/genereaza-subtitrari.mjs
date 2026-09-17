import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import ffmpegPath from "ffmpeg-static";

const ROOT = process.cwd();

const MEDIA_ROOT = path.join(
  ROOT,
  "public",
  "media",
  "lectii"
);

const RAPORT_PATH = path.join(
  ROOT,
  "data",
  "continut-video",
  "raport-subtitrari-v4.json"
);

const CUVINTE_PE_SECUNDA = 2.3;
const DURATA_MINIMA_CADRU = 1.4;
const DURATA_MAXIMA_CADRU = 6.5;
const MAX_CARACTERE_CADRU = 88;
const TOLERANTA_AUDIO_SECUNDE = 1.5;

/*
  ============================================================
  ARGUMENTE CLI
  ============================================================

  Exemple:

  node .\scripts\genereaza-subtitrari.mjs --id=m1-l01-v1

  node .\scripts\genereaza-subtitrari.mjs --modul=1

  node .\scripts\genereaza-subtitrari.mjs --all

  node .\scripts\genereaza-subtitrari.mjs --all --limit=10

  node .\scripts\genereaza-subtitrari.mjs --id=m1-l01-v1 --force
*/

function citesteArgumente() {
  const args = process.argv.slice(2);

  let id = null;
  let modul = null;
  let all = false;
  let limit = null;
  let force = false;

  for (const arg of args) {
    if (arg.startsWith("--id=")) {
      id = arg.slice("--id=".length).trim();
    }

    if (arg.startsWith("--modul=")) {
      const valoare = Number(
        arg.slice("--modul=".length)
      );

      if (
        Number.isInteger(valoare) &&
        valoare > 0
      ) {
        modul = valoare;
      }
    }

    if (arg === "--all") {
      all = true;
    }

    if (arg.startsWith("--limit=")) {
      const valoare = Number(
        arg.slice("--limit=".length)
      );

      if (
        Number.isInteger(valoare) &&
        valoare > 0
      ) {
        limit = valoare;
      }
    }

    if (
      arg === "--force" ||
      arg === "--regenereaza"
    ) {
      force = true;
    }
  }

  /*
    Fără argumente testăm doar primul
    mini-video etalon.
  */
  if (
    !id &&
    !modul &&
    !all
  ) {
    id = "m1-l01-v1";
  }

  return {
    id,
    modul,
    all,
    limit,
    force,
  };
}

/*
  ============================================================
  UTILITARE
  ============================================================
*/

function exista(cale) {
  return fs.existsSync(cale);
}

function asiguraFolder(cale) {
  fs.mkdirSync(cale, {
    recursive: true,
  });
}

function citesteText(cale) {
  if (!exista(cale)) {
    return "";
  }

  return fs
    .readFileSync(cale, "utf8")
    .replace(/^\uFEFF/, "")
    .trim();
}

function marimeFisier(cale) {
  if (!exista(cale)) {
    return 0;
  }

  return fs.statSync(cale).size;
}

function dataModificare(cale) {
  if (!exista(cale)) {
    return 0;
  }

  return fs.statSync(cale).mtimeMs;
}

function rotunjeste(
  valoare,
  zecimale = 2
) {
  const factor =
    10 ** zecimale;

  return (
    Math.round(
      valoare * factor
    ) / factor
  );
}

function normalizeazaText(text) {
  return text
    .replace(/\r/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function numaraCuvinte(text) {
  if (!text.trim()) {
    return 0;
  }

  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .length;
}

/*
  ============================================================
  DETECTARE MINI-VIDEO-URI
  ============================================================
*/

function esteIdMiniVideo(nume) {
  return /^m\d+-l\d+-v[1-4]$/i.test(
    nume
  );
}

function parseazaId(id) {
  const match = id.match(
    /^m(\d+)-l(\d+)-v([1-4])$/i
  );

  if (!match) {
    return null;
  }

  return {
    modul: Number(match[1]),
    lectie: Number(match[2]),
    video: Number(match[3]),
  };
}

function gasesteMiniVideouri() {
  const rezultate = [];

  if (!exista(MEDIA_ROOT)) {
    return rezultate;
  }

  const lectii =
    fs.readdirSync(
      MEDIA_ROOT,
      {
        withFileTypes: true,
      }
    );

  for (const lectie of lectii) {
    if (!lectie.isDirectory()) {
      continue;
    }

    const folderLectie =
      path.join(
        MEDIA_ROOT,
        lectie.name
      );

    const continut =
      fs.readdirSync(
        folderLectie,
        {
          withFileTypes: true,
        }
      );

    for (const intrare of continut) {
      if (!intrare.isDirectory()) {
        continue;
      }

      if (
        !esteIdMiniVideo(
          intrare.name
        )
      ) {
        continue;
      }

      const info =
        parseazaId(
          intrare.name
        );

      if (!info) {
        continue;
      }

      rezultate.push({
        id: intrare.name,
        modul: info.modul,
        lectie: info.lectie,
        video: info.video,
        folder: path.join(
          folderLectie,
          intrare.name
        ),
      });
    }
  }

  rezultate.sort(
    (a, b) =>
      a.modul - b.modul ||
      a.lectie - b.lectie ||
      a.video - b.video
  );

  return rezultate;
}

function selecteazaMiniVideouri(
  toate,
  optiuni
) {
  let rezultate = toate;

  if (optiuni.id) {
    rezultate =
      rezultate.filter(
        (x) =>
          x.id.toLowerCase() ===
          optiuni.id.toLowerCase()
      );
  } else if (optiuni.modul) {
    rezultate =
      rezultate.filter(
        (x) =>
          x.modul ===
          optiuni.modul
      );
  } else if (!optiuni.all) {
    rezultate = [];
  }

  if (
    optiuni.limit &&
    rezultate.length >
      optiuni.limit
  ) {
    rezultate =
      rezultate.slice(
        0,
        optiuni.limit
      );
  }

  return rezultate;
}

/*
  ============================================================
  SURSA TEXT
  ============================================================
*/

function gasesteSursaText(folder) {
  const preferat =
    path.join(
      folder,
      "voce-pregatita.txt"
    );

  const fallback =
    path.join(
      folder,
      "voce.txt"
    );

  if (
    exista(preferat) &&
    citesteText(preferat)
  ) {
    return preferat;
  }

  if (
    exista(fallback) &&
    citesteText(fallback)
  ) {
    return fallback;
  }

  return null;
}

/*
  ============================================================
  DURATA AUDIO
  ============================================================
*/

function obtineDurataAudio(
  caleAudio
) {
  if (
    !ffmpegPath ||
    !exista(ffmpegPath) ||
    !exista(caleAudio)
  ) {
    return null;
  }

  const rezultat =
    spawnSync(
      ffmpegPath,
      [
        "-hide_banner",
        "-i",
        caleAudio,
      ],
      {
        encoding: "utf8",
        shell: false,
      }
    );

  const iesire =
    `${rezultat.stdout || ""}\n${rezultat.stderr || ""}`;

  const match =
    iesire.match(
      /Duration:\s*(\d+):(\d+):([\d.]+)/
    );

  if (!match) {
    return null;
  }

  const ore =
    Number(match[1]);

  const minute =
    Number(match[2]);

  const secunde =
    Number(match[3]);

  const total =
    ore * 3600 +
    minute * 60 +
    secunde;

  if (
    !Number.isFinite(total) ||
    total <= 0
  ) {
    return null;
  }

  return total;
}

/*
  ============================================================
  ÎMPĂRȚIRE TEXT ÎN SUBTITRĂRI
  ============================================================
*/

function spargePropozitieLunga(
  text
) {
  const curat =
    text.trim();

  if (
    curat.length <=
    MAX_CARACTERE_CADRU
  ) {
    return [curat];
  }

  /*
    Încercăm mai întâi să rupem
    natural după virgulă, punct și
    virgulă, două puncte sau liniuță.
  */
  const parti =
    curat
      .split(
        /(?<=[,;:])\s+|\s+[–—-]\s+/
      )
      .map((x) => x.trim())
      .filter(Boolean);

  if (
    parti.length > 1 &&
    parti.every(
      (x) =>
        x.length <=
        MAX_CARACTERE_CADRU * 1.3
    )
  ) {
    const rezultate = [];
    let curent = "";

    for (const parte of parti) {
      const candidat =
        curent
          ? `${curent} ${parte}`
          : parte;

      if (
        candidat.length <=
        MAX_CARACTERE_CADRU
      ) {
        curent = candidat;
      } else {
        if (curent) {
          rezultate.push(
            curent
          );
        }

        curent = parte;
      }
    }

    if (curent) {
      rezultate.push(curent);
    }

    return rezultate;
  }

  /*
    Dacă încă este prea lung,
    împărțim după număr de cuvinte.
  */
  const cuvinte =
    curat.split(/\s+/);

  const rezultate = [];
  let curent = "";

  for (const cuvant of cuvinte) {
    const candidat =
      curent
        ? `${curent} ${cuvant}`
        : cuvant;

    if (
      candidat.length <=
      MAX_CARACTERE_CADRU
    ) {
      curent = candidat;
    } else {
      if (curent) {
        rezultate.push(curent);
      }

      curent = cuvant;
    }
  }

  if (curent) {
    rezultate.push(curent);
  }

  return rezultate;
}

function construiesteCadreText(
  text
) {
  const normalizat =
    normalizeazaText(text);

  /*
    Păstrăm propozițiile cât mai
    naturale pentru elev.
  */
  const propozitii =
    normalizat
      .split(
        /(?<=[.!?])\s+|\n+/
      )
      .map((x) => x.trim())
      .filter(Boolean);

  const cadre = [];

  for (
    const propozitie
    of propozitii
  ) {
    const parti =
      spargePropozitieLunga(
        propozitie
      );

    for (const parte of parti) {
      if (parte.trim()) {
        cadre.push(
          parte.trim()
        );
      }
    }
  }

  /*
    Dacă textul nu conține
    punctuație suficientă.
  */
  if (
    cadre.length === 0 &&
    normalizat
  ) {
    return [
      ...spargePropozitieLunga(
        normalizat
      ),
    ];
  }

  return cadre;
}

/*
  ============================================================
  TIMPI VTT
  ============================================================
*/

function timpVtt(secunde) {
  const sigur =
    Math.max(
      0,
      Number(secunde) || 0
    );

  const totalMs =
    Math.round(
      sigur * 1000
    );

  const ms =
    totalMs % 1000;

  const totalSec =
    Math.floor(
      totalMs / 1000
    );

  const s =
    totalSec % 60;

  const m =
    Math.floor(
      totalSec / 60
    ) % 60;

  const h =
    Math.floor(
      totalSec / 3600
    );

  return (
    String(h).padStart(
      2,
      "0"
    ) +
    ":" +
    String(m).padStart(
      2,
      "0"
    ) +
    ":" +
    String(s).padStart(
      2,
      "0"
    ) +
    "." +
    String(ms).padStart(
      3,
      "0"
    )
  );
}

function calculeazaDurateEstimate(
  cadre
) {
  return cadre.map(
    (text) => {
      const cuvinte =
        numaraCuvinte(text);

      let durata =
        cuvinte /
        CUVINTE_PE_SECUNDA;

      durata =
        Math.max(
          DURATA_MINIMA_CADRU,
          durata
        );

      durata =
        Math.min(
          DURATA_MAXIMA_CADRU,
          durata
        );

      return durata;
    }
  );
}

function ajusteazaDurateLaAudio(
  durate,
  durataAudio
) {
  if (
    !durataAudio ||
    durataAudio <= 0
  ) {
    return durate;
  }

  const totalInitial =
    durate.reduce(
      (suma, x) =>
        suma + x,
      0
    );

  if (
    totalInitial <= 0
  ) {
    return durate;
  }

  const factor =
    durataAudio /
    totalInitial;

  return durate.map(
    (durata) =>
      Math.max(
        0.4,
        durata * factor
      )
  );
}

function construiesteVtt({
  text,
  durataAudio,
}) {
  const cadre =
    construiesteCadreText(
      text
    );

  if (
    cadre.length === 0
  ) {
    throw new Error(
      "Textul pentru subtitrare este gol."
    );
  }

  const durateEstimate =
    calculeazaDurateEstimate(
      cadre
    );

  const durateFinale =
    ajusteazaDurateLaAudio(
      durateEstimate,
      durataAudio
    );

  const blocuri = [
    "WEBVTT",
    "",
  ];

  const cues = [];

  let timpCurent = 0;

  for (
    let i = 0;
    i < cadre.length;
    i++
  ) {
    const start =
      timpCurent;

    let stop =
      start +
      durateFinale[i];

    /*
      La ultimul cadru fixăm exact
      finalul audio, dacă îl avem.
    */
    if (
      durataAudio &&
      i ===
        cadre.length - 1
    ) {
      stop =
        durataAudio;
    }

    /*
      Protecție contra valorilor
      invalide după scalare.
    */
    if (stop <= start) {
      stop =
        start + 0.4;
    }

    const cue = {
      index: i + 1,
      start,
      stop,
      text: cadre[i],
    };

    cues.push(cue);

    blocuri.push(
      String(i + 1)
    );

    blocuri.push(
      `${timpVtt(start)} --> ${timpVtt(stop)}`
    );

    blocuri.push(
      cadre[i]
    );

    blocuri.push("");

    timpCurent = stop;
  }

  return {
    continut:
      blocuri.join("\n"),
    cues,
    durataTotala:
      timpCurent,
  };
}

/*
  ============================================================
  VERIFICARE VTT
  ============================================================
*/

function parseazaTimpVtt(
  valoare
) {
  const match =
    valoare.match(
      /^(\d+):(\d{2}):(\d{2})\.(\d{3})$/
    );

  if (!match) {
    return null;
  }

  return (
    Number(match[1]) *
      3600 +
    Number(match[2]) *
      60 +
    Number(match[3]) +
    Number(match[4]) /
      1000
  );
}

function verificaVtt({
  cale,
  durataAudio,
}) {
  const probleme = [];

  if (!exista(cale)) {
    probleme.push(
      "Fișierul VTT nu există."
    );

    return {
      valid: false,
      probleme,
      numarCadre: 0,
      durataFinala: 0,
    };
  }

  const continut =
    citesteText(cale);

  if (
    !continut.startsWith(
      "WEBVTT"
    )
  ) {
    probleme.push(
      "Fișierul nu începe cu WEBVTT."
    );
  }

  const regex =
    /(\d+)\s*\n(\d+:\d{2}:\d{2}\.\d{3})\s+-->\s+(\d+:\d{2}:\d{2}\.\d{3})\s*\n([\s\S]*?)(?=\n\s*\n\d+\s*\n|\s*$)/g;

  const cadre = [];

  let match;

  while (
    (match =
      regex.exec(continut)) !==
    null
  ) {
    const start =
      parseazaTimpVtt(
        match[2]
      );

    const stop =
      parseazaTimpVtt(
        match[3]
      );

    const text =
      match[4].trim();

    cadre.push({
      index:
        Number(match[1]),
      start,
      stop,
      text,
    });
  }

  if (
    cadre.length === 0
  ) {
    probleme.push(
      "Nu există cadre de subtitrare valide."
    );
  }

  let finalAnterior = 0;

  for (
    let i = 0;
    i < cadre.length;
    i++
  ) {
    const cadru =
      cadre[i];

    if (
      cadru.start === null ||
      cadru.stop === null
    ) {
      probleme.push(
        `Cadru ${i + 1}: timp invalid.`
      );

      continue;
    }

    if (
      cadru.stop <=
      cadru.start
    ) {
      probleme.push(
        `Cadru ${i + 1}: stop <= start.`
      );
    }

    if (
      i > 0 &&
      cadru.start <
        finalAnterior -
          0.001
    ) {
      probleme.push(
        `Cadru ${i + 1}: se suprapune cu cadrul anterior.`
      );
    }

    if (!cadru.text) {
      probleme.push(
        `Cadru ${i + 1}: text gol.`
      );
    }

    finalAnterior =
      cadru.stop;
  }

  const durataFinala =
    cadre.length > 0
      ? cadre[
          cadre.length - 1
        ].stop
      : 0;

  if (
    durataAudio &&
    durataFinala
  ) {
    const diferenta =
      Math.abs(
        durataAudio -
          durataFinala
      );

    if (
      diferenta >
      TOLERANTA_AUDIO_SECUNDE
    ) {
      probleme.push(
        `Finalul subtitrării diferă de audio cu ${rotunjeste(
          diferenta,
          2
        )} secunde.`
      );
    }
  }

  return {
    valid:
      probleme.length === 0,
    probleme,
    numarCadre:
      cadre.length,
    durataFinala,
  };
}

/*
  ============================================================
  RAPORT
  ============================================================
*/

function salveazaRaport(
  raport
) {
  asiguraFolder(
    path.dirname(
      RAPORT_PATH
    )
  );

  fs.writeFileSync(
    RAPORT_PATH,
    JSON.stringify(
      raport,
      null,
      2
    ),
    "utf8"
  );
}

/*
  ============================================================
  PROCESARE UN MINI-VIDEO
  ============================================================
*/

function proceseazaMiniVideo(
  miniVideo,
  optiuni
) {
  const folder =
    miniVideo.folder;

  const sursa =
    gasesteSursaText(
      folder
    );

  if (!sursa) {
    return {
      id: miniVideo.id,
      status: "eroare",
      problema:
        "Nu există voce-pregatita.txt sau voce.txt valid.",
    };
  }

  const text =
    citesteText(
      sursa
    );

  if (!text) {
    return {
      id: miniVideo.id,
      status: "eroare",
      problema:
        "Fișierul sursă pentru voce este gol.",
    };
  }

  const caleAudio =
    path.join(
      folder,
      "audio.mp3"
    );

  const caleVtt =
    path.join(
      folder,
      "subtitrare.vtt"
    );

  let durataAudio = null;

  if (
    exista(caleAudio) &&
    marimeFisier(
      caleAudio
    ) > 0
  ) {
    durataAudio =
      obtineDurataAudio(
        caleAudio
      );
  }

  /*
    RESUME:
    Dacă VTT există, este mai nou
    decât textul și audio-ul și trece
    verificarea, nu îl refacem.
  */
  if (
    !optiuni.force &&
    exista(caleVtt)
  ) {
    const dataVtt =
      dataModificare(
        caleVtt
      );

    const dataSursa =
      dataModificare(
        sursa
      );

    const dataAudio =
      exista(caleAudio)
        ? dataModificare(
            caleAudio
          )
        : 0;

    const esteActual =
      dataVtt >=
        dataSursa &&
      dataVtt >=
        dataAudio;

    if (esteActual) {
      const verificare =
        verificaVtt({
          cale: caleVtt,
          durataAudio,
        });

      if (
        verificare.valid
      ) {
        return {
          id: miniVideo.id,
          status: "existent",
          sursa:
            path.basename(
              sursa
            ),
          audio:
            exista(caleAudio),
          durataAudio:
            durataAudio
              ? rotunjeste(
                  durataAudio,
                  2
                )
              : null,
          cadre:
            verificare.numarCadre,
          durataSubtitrare:
            rotunjeste(
              verificare.durataFinala,
              2
            ),
        };
      }
    }
  }

  const rezultat =
    construiesteVtt({
      text,
      durataAudio,
    });

  fs.writeFileSync(
    caleVtt,
    rezultat.continut,
    "utf8"
  );

  const verificare =
    verificaVtt({
      cale: caleVtt,
      durataAudio,
    });

  if (
    !verificare.valid
  ) {
    return {
      id: miniVideo.id,
      status: "eroare",
      problema:
        verificare.probleme.join(
          " | "
        ),
    };
  }

  const cuvinte =
    numaraCuvinte(text);

  let cuvintePeMinut = null;

  if (
    durataAudio &&
    durataAudio > 0
  ) {
    cuvintePeMinut =
      cuvinte /
      (durataAudio / 60);
  }

  const avertismente = [];

  if (!durataAudio) {
    avertismente.push(
      "Nu există audio.mp3 valid; timpii au fost estimați din text."
    );
  }

  if (
    cuvintePeMinut &&
    cuvintePeMinut >
      220
  ) {
    avertismente.push(
      `Ritm foarte rapid: ${Math.round(
        cuvintePeMinut
      )} cuvinte/minut.`
    );
  }

  return {
    id: miniVideo.id,
    status: "creat",
    sursa:
      path.basename(
        sursa
      ),
    audio:
      exista(caleAudio),
    durataAudio:
      durataAudio
        ? rotunjeste(
            durataAudio,
            2
          )
        : null,
    cuvinte,
    cuvintePeMinut:
      cuvintePeMinut
        ? Math.round(
            cuvintePeMinut
          )
        : null,
    cadre:
      verificare.numarCadre,
    durataSubtitrare:
      rotunjeste(
        verificare.durataFinala,
        2
      ),
    fisier:
      path.relative(
        ROOT,
        caleVtt
      ),
    avertismente,
  };
}

/*
  ============================================================
  MAIN
  ============================================================
*/

function main() {
  const optiuni =
    citesteArgumente();

  console.log("");
  console.log(
    "=============================================="
  );
  console.log(
    "🎬 BAC MATE - GENERARE SUBTITRĂRI V4"
  );
  console.log(
    "=============================================="
  );
  console.log("");

  if (
    ffmpegPath &&
    exista(ffmpegPath)
  ) {
    console.log(
      "✅ FFmpeg static: disponibil"
    );
  } else {
    console.log(
      "⚠️ FFmpeg static nu este disponibil."
    );
    console.log(
      "   Subtitrările pot fi create, dar durata audio nu poate fi citită."
    );
  }

  console.log("");

  const toate =
    gasesteMiniVideouri();

  if (
    toate.length === 0
  ) {
    console.error(
      "❌ Nu am găsit niciun folder de mini-video."
    );
    console.error(
      `Căutare în: ${MEDIA_ROOT}`
    );

    process.exitCode = 1;
    return;
  }

  const selectate =
    selecteazaMiniVideouri(
      toate,
      optiuni
    );

  if (
    selectate.length === 0
  ) {
    console.error(
      "❌ Nu am găsit mini-video-uri pentru selecția cerută."
    );

    if (optiuni.id) {
      console.error(
        `ID cerut: ${optiuni.id}`
      );
    }

    if (optiuni.modul) {
      console.error(
        `Modul cerut: ${optiuni.modul}`
      );
    }

    process.exitCode = 1;
    return;
  }

  console.log(
    `Mini-video-uri selectate: ${selectate.length}`
  );

  if (optiuni.force) {
    console.log(
      "♻️ Mod regenerare forțată: ACTIV"
    );
  }

  console.log("");

  const raport = {
    versiune: 4,
    proiect:
      "BAC MATE",
    tip:
      "subtitrari",
    generatLa:
      new Date().toISOString(),
    optiuni,
    totalSelectate:
      selectate.length,
    createAcum: 0,
    dejaExistente: 0,
    cuProbleme: 0,
    rezultate: [],
    publicarePermisa: false,
    nota:
      "Validarea tehnică a subtitrării nu înseamnă verificare matematică sau pedagogică.",
  };

  for (
    let i = 0;
    i <
    selectate.length;
    i++
  ) {
    const miniVideo =
      selectate[i];

    console.log(
      `[${i + 1}/${selectate.length}] ${miniVideo.id}`
    );

    try {
      const rezultat =
        proceseazaMiniVideo(
          miniVideo,
          optiuni
        );

      raport.rezultate.push(
        rezultat
      );

      if (
        rezultat.status ===
        "creat"
      ) {
        raport.createAcum++;

        console.log(
          "✅ subtitrare.vtt creată și verificată."
        );

        console.log(
          `   Cadre: ${rezultat.cadre}`
        );

        if (
          rezultat.durataAudio
        ) {
          console.log(
            `   Audio: ${rezultat.durataAudio}s`
          );

          console.log(
            `   Subtitrare: ${rezultat.durataSubtitrare}s`
          );
        }

        if (
          rezultat.cuvintePeMinut
        ) {
          console.log(
            `   Ritm voce: ${rezultat.cuvintePeMinut} cuvinte/min`
          );
        }

        if (
          rezultat.avertismente &&
          rezultat.avertismente.length >
            0
        ) {
          for (
            const avertisment
            of rezultat.avertismente
          ) {
            console.log(
              `   ⚠️ ${avertisment}`
            );
          }
        }
      } else if (
        rezultat.status ===
        "existent"
      ) {
        raport.dejaExistente++;

        console.log(
          "⏭️ subtitrare.vtt există deja și este validă."
        );

        console.log(
          `   Cadre: ${rezultat.cadre}`
        );

        if (
          rezultat.durataAudio
        ) {
          console.log(
            `   Durată: ${rezultat.durataAudio}s`
          );
        }
      } else {
        raport.cuProbleme++;

        console.log(
          `❌ ${rezultat.problema}`
        );
      }
    } catch (error) {
      raport.cuProbleme++;

      const mesaj =
        error instanceof Error
          ? error.message
          : String(error);

      raport.rezultate.push({
        id: miniVideo.id,
        status: "eroare",
        problema: mesaj,
      });

      console.log(
        `❌ ${mesaj}`
      );

      /*
        La testul unui singur ID
        oprim imediat.
      */
      if (optiuni.id) {
        salveazaRaport(
          raport
        );

        process.exitCode = 1;
        return;
      }
    }

    /*
      Salvăm după fiecare mini-video.
      Important dacă se oprește
      calculatorul sau curentul.
    */
    salveazaRaport(
      raport
    );

    console.log("");
  }

  raport.finalizatLa =
    new Date().toISOString();

  raport.totalProcesate =
    raport.createAcum +
    raport.dejaExistente +
    raport.cuProbleme;

  salveazaRaport(
    raport
  );

  console.log(
    "=============================================="
  );
  console.log(
    "✅ GENERARE SUBTITRĂRI TERMINATĂ"
  );
  console.log(
    "=============================================="
  );
  console.log("");

  console.log(
    `Create acum:      ${raport.createAcum}`
  );

  console.log(
    `Deja existente:   ${raport.dejaExistente}`
  );

  console.log(
    `Cu probleme:      ${raport.cuProbleme}`
  );

  console.log(
    `Total procesate:  ${raport.totalProcesate}`
  );

  console.log("");

  console.log(
    "Raport:"
  );

  console.log(
    path.relative(
      ROOT,
      RAPORT_PATH
    )
  );

  console.log("");
  console.log(
    "🔒 Publicarea rămâne BLOCATĂ automat."
  );
  console.log(
    "   Subtitrarea tehnic validă nu înseamnă conținut matematic verificat."
  );
  console.log("");

  if (
    raport.cuProbleme > 0
  ) {
    process.exitCode = 1;
  }
}

try {
  main();
} catch (error) {
  console.error("");
  console.error(
    "❌ EROARE GENERALĂ:"
  );

  console.error(
    error instanceof Error
      ? error.message
      : error
  );

  console.error("");

  process.exitCode = 1;
}