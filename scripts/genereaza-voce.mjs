import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { spawnSync } from "node:child_process";
import ffmpegPath from "ffmpeg-static";

const require = createRequire(import.meta.url);
const { EdgeTTS } = require("node-edge-tts");

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
  "raport-voce-v4.json"
);

const VOCE = "ro-RO-AlinaNeural";
const LIMBA = "ro-RO";
const RATE = "-2%";

const OUTPUT_FORMAT =
  "audio-24khz-96kbitrate-mono-mp3";

/*
  ============================================================
  ARGUMENTE
  ============================================================
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
      id = arg
        .slice("--id=".length)
        .trim();
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
    Fără argumente lucrăm doar
    pe mini-video-ul etalon.
  */
  if (!id && !modul && !all) {
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
  MINI-VIDEO-URI
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

    const intrari =
      fs.readdirSync(
        folderLectie,
        {
          withFileTypes: true,
        }
      );

    for (const intrare of intrari) {
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
  TEXTUL PENTRU VOCE
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
  VERIFICARE AUDIO CU FFMPEG
  ============================================================
*/

function verificaAudio(cale) {
  const probleme = [];

  if (!exista(cale)) {
    probleme.push(
      "Fișierul audio nu există."
    );

    return {
      valid: false,
      probleme,
      durata: null,
    };
  }

  const marime =
    marimeFisier(cale);

  if (marime < 4096) {
    probleme.push(
      "Fișierul audio este prea mic."
    );
  }

  if (
    !ffmpegPath ||
    !exista(ffmpegPath)
  ) {
    probleme.push(
      "FFmpeg static nu este disponibil."
    );

    return {
      valid: false,
      probleme,
      durata: null,
    };
  }

  const rezultat =
    spawnSync(
      ffmpegPath,
      [
        "-hide_banner",
        "-i",
        cale,
      ],
      {
        encoding: "utf8",
        shell: false,
        windowsHide: true,
      }
    );

  const iesire =
    `${rezultat.stdout || ""}\n${rezultat.stderr || ""}`;

  if (!/Audio:/i.test(iesire)) {
    probleme.push(
      "FFmpeg nu detectează flux audio."
    );
  }

  const match =
    iesire.match(
      /Duration:\s*(\d+):(\d+):([\d.]+)/
    );

  let durata = null;

  if (match) {
    durata =
      Number(match[1]) *
        3600 +
      Number(match[2]) *
        60 +
      Number(match[3]);
  }

  if (
    durata === null ||
    !Number.isFinite(durata) ||
    durata <= 1
  ) {
    probleme.push(
      "Durata audio este invalidă."
    );
  }

  return {
    valid:
      probleme.length === 0,
    probleme,
    durata,
  };
}

/*
  ============================================================
  GENERARE TTS DIRECT DIN NODE
  ============================================================
*/

async function genereazaAudioNode({
  text,
  destinatie,
}) {
  const tts =
    new EdgeTTS({
      voice: VOCE,
      lang: LIMBA,
      outputFormat:
        OUTPUT_FORMAT,
      pitch: "default",
      rate: RATE,
      volume: "default",
      saveSubtitles: false,
      timeout: 30000,
    });

  await tts.ttsPromise(
    text,
    destinatie
  );
}

/*
  ============================================================
  RAPORT
  ============================================================
*/

function salveazaRaport(raport) {
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
  PROCESARE MINI-VIDEO
  ============================================================
*/

async function proceseazaMiniVideo(
  miniVideo,
  optiuni
) {
  const sursa =
    gasesteSursaText(
      miniVideo.folder
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
    citesteText(sursa);

  if (!text) {
    return {
      id: miniVideo.id,
      status: "eroare",
      problema:
        "Textul pentru voce este gol.",
    };
  }

  const audioFinal =
    path.join(
      miniVideo.folder,
      "audio.mp3"
    );

  const audioTemporar =
    path.join(
      miniVideo.folder,
      "__audio-generare.mp3"
    );

  /*
    RESUME.

    Dacă audio există, este mai nou
    decât textul și este valid,
    nu îl regenerăm.
  */
  if (
    !optiuni.force &&
    exista(audioFinal) &&
    dataModificare(audioFinal) >=
      dataModificare(sursa)
  ) {
    const verificare =
      verificaAudio(
        audioFinal
      );

    if (verificare.valid) {
      return {
        id: miniVideo.id,
        status: "existent",
        durata:
          rotunjeste(
            verificare.durata,
            2
          ),
        marimeMB:
          rotunjeste(
            marimeFisier(
              audioFinal
            ) /
              1024 /
              1024,
            2
          ),
      };
    }
  }

  /*
    Fișier temporar.

    Dacă se întrerupe internetul sau
    curentul, audio.mp3 bun nu este
    suprascris cu unul incomplet.
  */
  if (exista(audioTemporar)) {
    fs.rmSync(
      audioTemporar,
      {
        force: true,
      }
    );
  }

  await genereazaAudioNode({
    text,
    destinatie:
      audioTemporar,
  });

  const verificare =
    verificaAudio(
      audioTemporar
    );

  if (!verificare.valid) {
    if (exista(audioTemporar)) {
      fs.rmSync(
        audioTemporar,
        {
          force: true,
        }
      );
    }

    return {
      id: miniVideo.id,
      status: "eroare",
      problema:
        verificare.probleme.join(
          " | "
        ),
    };
  }

  /*
    Abia după verificare înlocuim
    fișierul final.
  */
  if (exista(audioFinal)) {
    fs.rmSync(
      audioFinal,
      {
        force: true,
      }
    );
  }

  fs.renameSync(
    audioTemporar,
    audioFinal
  );

  const durata =
    verificare.durata;

  const cuvinte =
    numaraCuvinte(text);

  const cuvintePeMinut =
    durata > 0
      ? Math.round(
          cuvinte /
            (durata / 60)
        )
      : null;

  const avertismente = [];

  if (
    cuvintePeMinut &&
    cuvintePeMinut > 220
  ) {
    avertismente.push(
      `Ritm foarte rapid: ${cuvintePeMinut} cuvinte/minut.`
    );
  }

  if (
    durata &&
    durata < 15
  ) {
    avertismente.push(
      `Audio foarte scurt: ${rotunjeste(
        durata,
        2
      )} secunde.`
    );
  }

  return {
    id: miniVideo.id,
    status: "creat",
    voce: VOCE,
    limba: LIMBA,
    rate: RATE,
    durata:
      rotunjeste(
        durata,
        2
      ),
    marimeMB:
      rotunjeste(
        marimeFisier(
          audioFinal
        ) /
          1024 /
          1024,
        2
      ),
    cuvinte,
    cuvintePeMinut,
    avertismente,
  };
}

/*
  ============================================================
  MAIN
  ============================================================
*/

async function main() {
  const optiuni =
    citesteArgumente();

  console.log("");
  console.log(
    "=============================================="
  );
  console.log(
    "🎙️ BAC MATE - GENERARE VOCE V4 NODE"
  );
  console.log(
    "=============================================="
  );
  console.log("");

  console.log(
    "✅ Motor TTS: node-edge-tts"
  );

  console.log(
    `✅ Voce: ${VOCE}`
  );

  console.log(
    `✅ Limbă: ${LIMBA}`
  );

  console.log(
    `✅ Viteză: ${RATE}`
  );

  if (
    ffmpegPath &&
    exista(ffmpegPath)
  ) {
    console.log(
      "✅ FFmpeg static: disponibil"
    );
  } else {
    console.error(
      "❌ FFmpeg static nu este disponibil."
    );

    process.exitCode = 1;
    return;
  }

  console.log("");

  const toate =
    gasesteMiniVideouri();

  if (toate.length === 0) {
    console.error(
      "❌ Nu am găsit niciun mini-video."
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
        `ID: ${optiuni.id}`
      );
    }

    if (optiuni.modul) {
      console.error(
        `Modul: ${optiuni.modul}`
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
      "♻️ Regenerare forțată: ACTIVĂ"
    );
  }

  console.log("");

  const raport = {
    versiune: 4,
    motor: "node-edge-tts",
    proiect: "BAC MATE",
    tip: "voce",
    voce: VOCE,
    limba: LIMBA,
    rate: RATE,
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
      "Validarea tehnică a audio nu înseamnă verificare matematică sau pedagogică.",
  };

  for (
    let i = 0;
    i < selectate.length;
    i++
  ) {
    const miniVideo =
      selectate[i];

    console.log(
      `[${i + 1}/${selectate.length}] ${miniVideo.id}`
    );

    try {
      const rezultat =
        await proceseazaMiniVideo(
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
          "✅ audio.mp3 creat și verificat."
        );

        console.log(
          `   Durată: ${rezultat.durata}s`
        );

        console.log(
          `   Mărime: ${rezultat.marimeMB} MB`
        );

        if (
          rezultat.cuvintePeMinut
        ) {
          console.log(
            `   Ritm: ${rezultat.cuvintePeMinut} cuvinte/min`
          );
        }

        for (
          const avertisment
          of rezultat.avertismente ||
          []
        ) {
          console.log(
            `   ⚠️ ${avertisment}`
          );
        }
      } else if (
        rezultat.status ===
        "existent"
      ) {
        raport.dejaExistente++;

        console.log(
          "⏭️ audio.mp3 există deja și este valid."
        );

        console.log(
          `   Durată: ${rezultat.durata}s`
        );
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
        Dacă testăm un singur ID,
        ne oprim imediat.
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
      Salvăm progresul după fiecare
      mini-video pentru pene de curent.
    */
    salveazaRaport(
      raport
    );

    console.log("");
  }

  raport.totalProcesate =
    raport.createAcum +
    raport.dejaExistente +
    raport.cuProbleme;

  raport.finalizatLa =
    new Date().toISOString();

  salveazaRaport(
    raport
  );

  console.log(
    "=============================================="
  );

  console.log(
    "✅ GENERARE VOCE TERMINATĂ"
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

  console.log("Raport:");

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
    "   Audio valid tehnic ≠ conținut matematic verificat."
  );

  console.log("");

  if (
    raport.cuProbleme > 0
  ) {
    process.exitCode = 1;
  }
}

main().catch(
  (error) => {
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
);