import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import ffmpegPath from "ffmpeg-static";

/*
============================================================
BAC MATE — GENERARE VOCE V4
============================================================

Scop:
- citește voce-pregatita.txt;
- generează audio.mp3;
- folosește voce română Alina Neural;
- viteza aprobată: -2%;
- funcționează pentru orice mX-lYY-vZ;
- poate relua producția după oprire;
- nu suprascrie inutil fișierele bune;
- verifică tehnic MP3-ul rezultat.

IMPORTANT:
Trecerea verificării tehnice NU înseamnă automat
că pronunția matematică este perfectă sau că video-ul
este gata pentru publicare.
============================================================
*/

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
const RATE = "-2%";

const args = process.argv.slice(2);

/*
============================================================
ARGUMENTE
============================================================
*/

function areArgument(nume) {
  return args.includes(nume);
}

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

const idCerut =
  valoareArgument("--id");

const modulCerut =
  valoareArgument("--modul");

const limitaText =
  valoareArgument("--limit");

const proceseazaTot =
  areArgument("--all");

const forteaza =
  areArgument("--force") ||
  areArgument("--regenereaza");

const limita =
  limitaText !== null
    ? Number(limitaText)
    : null;

/*
============================================================
UTILITARE
============================================================
*/

function titlu(text) {
  console.log("");
  console.log(
    "=============================================="
  );
  console.log(text);
  console.log(
    "=============================================="
  );
  console.log("");
}

function exista(cale) {
  return fs.existsSync(cale);
}

function asiguraFolder(cale) {
  fs.mkdirSync(
    cale,
    {
      recursive: true,
    }
  );
}

function stergeDacaExista(cale) {
  if (exista(cale)) {
    fs.rmSync(
      cale,
      {
        force: true,
      }
    );
  }
}

function formatMB(bytes) {
  return (
    bytes /
    1024 /
    1024
  ).toFixed(2);
}

function citesteText(cale) {
  if (!exista(cale)) {
    return "";
  }

  return fs
    .readFileSync(
      cale,
      "utf8"
    )
    .replace(/^\uFEFF/, "")
    .trim();
}

function scrieJSON(
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

/*
============================================================
IDENTIFICARE VIDEO
============================================================
*/

function esteIdVideo(id) {
  return /^m\d+-l\d+-v[1-4]$/i.test(
    id
  );
}

function idLectieDinVideo(id) {
  const match = id.match(
    /^(m\d+-l\d+)-v[1-4]$/i
  );

  return match
    ? match[1]
    : null;
}

function modulDinVideo(id) {
  const match = id.match(
    /^m(\d+)-/i
  );

  return match
    ? Number(match[1])
    : null;
}

function gasesteVideoDupaId(id) {
  if (!esteIdVideo(id)) {
    return null;
  }

  const lectie =
    idLectieDinVideo(id);

  if (!lectie) {
    return null;
  }

  const folder = path.join(
    MEDIA_ROOT,
    lectie,
    id
  );

  if (!exista(folder)) {
    return null;
  }

  return {
    id,
    folder,
  };
}

function gasesteToateVideo() {
  if (!exista(MEDIA_ROOT)) {
    return [];
  }

  const rezultate = [];

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

    for (const entry of continut) {
      if (!entry.isDirectory()) {
        continue;
      }

      if (!esteIdVideo(entry.name)) {
        continue;
      }

      rezultate.push({
        id: entry.name,
        folder: path.join(
          folderLectie,
          entry.name
        ),
      });
    }
  }

  return rezultate.sort(
    (a, b) =>
      a.id.localeCompare(
        b.id,
        undefined,
        {
          numeric: true,
        }
      )
  );
}

/*
============================================================
RULARE PROCESE EXTERNE
============================================================
*/

function ruleazaProces(
  executabil,
  argumente,
  {
    silent = false,
  } = {}
) {
  return new Promise(
    (resolve, reject) => {
      let stdout = "";
      let stderr = "";

      const proces = spawn(
        executabil,
        argumente,
        {
          cwd: ROOT,
          shell: false,
          windowsHide: true,
          stdio: silent
            ? [
                "ignore",
                "pipe",
                "pipe",
              ]
            : [
                "ignore",
                "inherit",
                "inherit",
              ],
        }
      );

      if (silent) {
        proces.stdout.on(
          "data",
          (data) => {
            stdout +=
              data.toString();
          }
        );

        proces.stderr.on(
          "data",
          (data) => {
            stderr +=
              data.toString();
          }
        );
      }

      proces.on(
        "error",
        (error) => {
          reject(error);
        }
      );

      proces.on(
        "close",
        (cod) => {
          if (cod === 0) {
            resolve({
              stdout,
              stderr,
            });
          } else {
            reject(
              new Error(
                stderr ||
                  stdout ||
                  `${executabil} s-a oprit cu codul ${cod}.`
              )
            );
          }
        }
      );
    }
  );
}

/*
============================================================
DETECTARE EDGE-TTS
============================================================

Încercăm automat mai multe variante.

1. edge-tts instalat direct
2. python -m edge_tts
3. py -m edge_tts

Asta ne ajută pe Windows fără să depindem
de o singură configurare PATH.
============================================================
*/

async function detecteazaEdgeTTS() {
  const candidati = [
    {
      nume:
        "edge-tts",
      executabil:
        "edge-tts",
      prefix:
        [],
    },

    {
      nume:
        "python -m edge_tts",
      executabil:
        "python",
      prefix:
        [
          "-m",
          "edge_tts",
        ],
    },

    {
      nume:
        "py -m edge_tts",
      executabil:
        "py",
      prefix:
        [
          "-m",
          "edge_tts",
        ],
    },
  ];

  for (const candidat of candidati) {
    try {
      await ruleazaProces(
        candidat.executabil,
        [
          ...candidat.prefix,
          "--version",
        ],
        {
          silent: true,
        }
      );

      return candidat;
    } catch {
      /*
        Încercăm următoarea variantă.
      */
    }
  }

  /*
    Unele versiuni edge-tts nu răspund
    corect la --version, dar răspund la --help.
  */

  for (const candidat of candidati) {
    try {
      await ruleazaProces(
        candidat.executabil,
        [
          ...candidat.prefix,
          "--help",
        ],
        {
          silent: true,
        }
      );

      return candidat;
    } catch {
      /*
        Încercăm următoarea variantă.
      */
    }
  }

  return null;
}

/*
============================================================
VALIDARE AUDIO
============================================================
*/

function obtineInfoAudio(
  fisier
) {
  return new Promise(
    (resolve, reject) => {
      if (!ffmpegPath) {
        reject(
          new Error(
            "ffmpeg-static nu este disponibil pentru verificarea audio."
          )
        );

        return;
      }

      if (!exista(fisier)) {
        reject(
          new Error(
            `Fișierul nu există: ${fisier}`
          )
        );

        return;
      }

      let stderr = "";

      const proces = spawn(
        ffmpegPath,
        [
          "-hide_banner",
          "-i",
          fisier,
        ],
        {
          cwd: ROOT,
          shell: false,
          windowsHide: true,
          stdio: [
            "ignore",
            "ignore",
            "pipe",
          ],
        }
      );

      proces.stderr.on(
        "data",
        (data) => {
          stderr +=
            data.toString();
        }
      );

      proces.on(
        "error",
        reject
      );

      proces.on(
        "close",
        () => {
          const match =
            stderr.match(
              /Duration:\s*(\d+):(\d+):(\d+(?:\.\d+)?)/i
            );

          let durataSecunde =
            null;

          if (match) {
            const ore =
              Number(match[1]);

            const minute =
              Number(match[2]);

            const secunde =
              Number(match[3]);

            durataSecunde =
              ore * 3600 +
              minute * 60 +
              secunde;
          }

          resolve({
            areAudio:
              /\bAudio:/i.test(
                stderr
              ),

            durataSecunde,

            text:
              stderr,
          });
        }
      );
    }
  );
}

async function verificaAudio(
  fisier
) {
  if (!exista(fisier)) {
    throw new Error(
      "audio.mp3 nu a fost creat."
    );
  }

  const stat =
    fs.statSync(fisier);

  if (
    stat.size <
    4 * 1024
  ) {
    throw new Error(
      "audio.mp3 este prea mic și pare invalid."
    );
  }

  const info =
    await obtineInfoAudio(
      fisier
    );

  if (!info.areAudio) {
    throw new Error(
      "audio.mp3 nu conține pistă audio validă."
    );
  }

  if (
    !info.durataSecunde ||
    info.durataSecunde <= 1
  ) {
    throw new Error(
      "Durata audio este invalidă sau prea scurtă."
    );
  }

  return {
    ...info,
    dimensiuneBytes:
      stat.size,
  };
}

/*
============================================================
RELUARE AUTOMATĂ
============================================================
*/

async function audioEsteActualizat(
  textPath,
  audioPath
) {
  if (forteaza) {
    return false;
  }

  if (
    !exista(textPath) ||
    !exista(audioPath)
  ) {
    return false;
  }

  const timpText =
    fs.statSync(
      textPath
    ).mtimeMs;

  const timpAudio =
    fs.statSync(
      audioPath
    ).mtimeMs;

  if (
    timpAudio <
    timpText
  ) {
    return false;
  }

  try {
    await verificaAudio(
      audioPath
    );

    return true;
  } catch {
    return false;
  }
}

/*
============================================================
GENERARE VOCE
============================================================
*/

async function genereazaVocePentruVideo(
  video,
  motorTTS
) {
  const {
    id,
    folder,
  } = video;

  console.log("");
  console.log(
    "----------------------------------------------"
  );
  console.log(
    `🎙️ ${id}`
  );
  console.log(
    "----------------------------------------------"
  );

  const textPath =
    path.join(
      folder,
      "voce-pregatita.txt"
    );

  const textFallbackPath =
    path.join(
      folder,
      "voce.txt"
    );

  let sursaText =
    null;

  if (
    exista(textPath) &&
    citesteText(textPath)
  ) {
    sursaText =
      textPath;
  } else if (
    exista(textFallbackPath) &&
    citesteText(
      textFallbackPath
    )
  ) {
    sursaText =
      textFallbackPath;
  }

  if (!sursaText) {
    throw new Error(
      "Lipsește voce-pregatita.txt sau voce.txt."
    );
  }

  const text =
    citesteText(
      sursaText
    );

  if (
    text.length < 15
  ) {
    throw new Error(
      "Textul pentru voce este prea scurt."
    );
  }

  const audioPath =
    path.join(
      folder,
      "audio.mp3"
    );

  if (
    await audioEsteActualizat(
      sursaText,
      audioPath
    )
  ) {
    const info =
      await verificaAudio(
        audioPath
      );

    console.log(
      "⏭️ audio.mp3 există deja și este valid."
    );

    console.log(
      `   Durată: ${info.durataSecunde.toFixed(
        2
      )} sec`
    );

    return {
      id,
      status:
        "existent",

      voce:
        VOCE,

      rate:
        RATE,

      durataSecunde:
        info.durataSecunde,

      fisier:
        path.relative(
          ROOT,
          audioPath
        ),
    };
  }

  /*
    Generăm întâi într-un fișier temporar.

    Astfel, dacă se întrerupe internetul sau
    calculatorul, nu rămâne audio.mp3 corupt.
  */

  const audioTemporar =
    path.join(
      folder,
      "__audio-generare.mp3"
    );

  stergeDacaExista(
    audioTemporar
  );

  console.log(
    `✅ Text: ${path.basename(
      sursaText
    )}`
  );

  console.log(
    `✅ Caractere: ${text.length}`
  );

  console.log(
    `✅ Voce: ${VOCE}`
  );

  console.log(
    `✅ Viteză: ${RATE}`
  );

  console.log(
    `✅ Motor: ${motorTTS.nume}`
  );

  console.log("");
  console.log(
    "Generez vocea..."
  );

  const argumente = [
    ...motorTTS.prefix,

    "--voice",
    VOCE,

    `--rate=${RATE}`,

    "--file",
    sursaText,

    "--write-media",
    audioTemporar,
  ];

  await ruleazaProces(
    motorTTS.executabil,
    argumente
  );

  if (
    !exista(
      audioTemporar
    )
  ) {
    throw new Error(
      "Motorul TTS s-a terminat, dar nu a creat fișierul audio."
    );
  }

  const infoTemporar =
    await verificaAudio(
      audioTemporar
    );

  /*
    Fișierul temporar a trecut verificarea.
    Acum îl promovăm ca audio.mp3 final.
  */

  stergeDacaExista(
    audioPath
  );

  fs.renameSync(
    audioTemporar,
    audioPath
  );

  const infoFinal =
    await verificaAudio(
      audioPath
    );

  console.log("");
  console.log(
    "✅ VOCE GENERATĂ"
  );

  console.log(
    `   Durată: ${infoFinal.durataSecunde.toFixed(
      2
    )} sec`
  );

  console.log(
    `   Dimensiune: ${formatMB(
      infoFinal.dimensiuneBytes
    )} MB`
  );

  console.log(
    `   ${path.relative(
      ROOT,
      audioPath
    )}`
  );

  /*
    Verificare orientativă.

    Nu blocăm automat după numărul de cuvinte,
    dar marcăm duratele suspect de mici.
  */

  const numarCuvinte =
    text
      .split(/\s+/)
      .filter(Boolean)
      .length;

  const cuvintePeMinut =
    infoFinal.durataSecunde > 0
      ? (
          numarCuvinte /
          (
            infoFinal.durataSecunde /
            60
          )
        )
      : null;

  const avertismente =
    [];

  if (
    cuvintePeMinut !== null &&
    cuvintePeMinut >
      220
  ) {
    avertismente.push(
      "Ritmul calculat pare foarte rapid. Verifică textul și pronunția."
    );
  }

  if (
    infoFinal.durataSecunde <
      15
  ) {
    avertismente.push(
      "Mini-video-ul are o voce foarte scurtă."
    );
  }

  for (
    const mesaj of avertismente
  ) {
    console.log(
      `⚠️ ${mesaj}`
    );
  }

  return {
    id,

    status:
      "creat",

    voce:
      VOCE,

    rate:
      RATE,

    motor:
      motorTTS.nume,

    caractere:
      text.length,

    cuvinte:
      numarCuvinte,

    durataSecunde:
      infoFinal.durataSecunde,

    cuvintePeMinut:
      cuvintePeMinut
        ? Number(
            cuvintePeMinut.toFixed(
              1
            )
          )
        : null,

    dimensiuneBytes:
      infoFinal.dimensiuneBytes,

    avertismente,

    fisier:
      path.relative(
        ROOT,
        audioPath
      ),
  };
}

/*
============================================================
SELECTARE
============================================================
*/

function obtineSelectia() {
  let selectie =
    [];

  if (idCerut) {
    const video =
      gasesteVideoDupaId(
        idCerut
      );

    if (!video) {
      throw new Error(
        `Nu găsesc mini-video-ul ${idCerut}.`
      );
    }

    selectie = [
      video,
    ];
  } else if (
    modulCerut
  ) {
    const modul =
      Number(
        modulCerut
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

    selectie =
      gasesteToateVideo().filter(
        (video) =>
          modulDinVideo(
            video.id
          ) === modul
      );
  } else if (
    proceseazaTot
  ) {
    selectie =
      gasesteToateVideo();
  } else {
    /*
      Fără parametri testăm doar etalonul.
    */

    const etalon =
      gasesteVideoDupaId(
        "m1-l01-v1"
      );

    if (!etalon) {
      throw new Error(
        "Nu ai dat --id, --modul sau --all și nu găsesc m1-l01-v1."
      );
    }

    selectie = [
      etalon,
    ];
  }

  if (
    limita !== null
  ) {
    if (
      !Number.isInteger(
        limita
      ) ||
      limita < 1
    ) {
      throw new Error(
        "--limit trebuie să fie un număr întreg pozitiv."
      );
    }

    selectie =
      selectie.slice(
        0,
        limita
      );
  }

  return selectie;
}

/*
============================================================
RAPORT
============================================================
*/

function salveazaRaport(
  rezultate,
  motorTTS
) {
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

  scrieJSON(
    RAPORT_PATH,
    {
      proiect:
        "BAC MATE",

      versiune:
        "4.0",

      tip:
        "generare-voce",

      configuratie: {
        limba:
          "ro-RO",

        voce:
          VOCE,

        rate:
          RATE,

        motor:
          motorTTS?.nume ??
          null,
      },

      total:
        rezultate.length,

      create,

      existente,

      erori,

      rezultate,

      verificare: {
        tehnica:
          erori === 0,

        pronuntieMatematicaVerificata:
          false,

        verificareUmana:
          false,

        publicareAutomata:
          false,
      },

      generatLa:
        new Date().toISOString(),
    }
  );
}

/*
============================================================
MAIN
============================================================
*/

async function main() {
  titlu(
    "🎙️ BAC MATE — GENERARE VOCE V4"
  );

  if (!exista(MEDIA_ROOT)) {
    throw new Error(
      `Nu găsesc folderul media:\n${MEDIA_ROOT}`
    );
  }

  if (!ffmpegPath) {
    throw new Error(
      "ffmpeg-static nu este disponibil."
    );
  }

  console.log(
    "Caut motorul Edge TTS..."
  );

  const motorTTS =
    await detecteazaEdgeTTS();

  if (!motorTTS) {
    throw new Error(
      [
        "Nu găsesc Edge TTS pe calculator.",
        "",
        "Trebuie instalat o singură dată.",
        "Nu instala încă nimic la întâmplare — trimite-mi această eroare și îți dau comanda exactă.",
      ].join("\n")
    );
  }

  console.log(
    `✅ Edge TTS: ${motorTTS.nume}`
  );

  console.log(
    `✅ Voce: ${VOCE}`
  );

  console.log(
    `✅ Viteză: ${RATE}`
  );

  const selectie =
    obtineSelectia();

  console.log("");
  console.log(
    `Mini-video-uri selectate: ${selectie.length}`
  );

  console.log(
    `Mod: ${
      forteaza
        ? "REGENERARE FORȚATĂ"
        : "RELUARE AUTOMATĂ"
    }`
  );

  const rezultate =
    [];

  for (
    let index = 0;
    index <
    selectie.length;
    index++
  ) {
    const video =
      selectie[index];

    console.log("");
    console.log(
      `[${index + 1}/${selectie.length}] ${video.id}`
    );

    try {
      const rezultat =
        await genereazaVocePentruVideo(
          video,
          motorTTS
        );

      rezultate.push(
        rezultat
      );
    } catch (error) {
      const mesaj =
        error instanceof Error
          ? error.message
          : String(error);

      console.error("");
      console.error(
        `❌ ${video.id}`
      );

      console.error(
        mesaj
      );

      rezultate.push({
        id:
          video.id,

        status:
          "eroare",

        mesaj,
      });

      salveazaRaport(
        rezultate,
        motorTTS
      );

      /*
        Pentru un singur ID oprim imediat,
        ca testarea să fie clară.

        Pentru modul/all continuăm cu următorul.
      */

      if (idCerut) {
        throw error;
      }
    }

    /*
      Salvăm progresul după fiecare mini-video.
      Dacă se oprește calculatorul, știm unde am rămas.
    */

    salveazaRaport(
      rezultate,
      motorTTS
    );
  }

  salveazaRaport(
    rezultate,
    motorTTS
  );

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

  titlu(
    "✅ GENERARE VOCE TERMINATĂ"
  );

  console.log(
    `Create acum:     ${create}`
  );

  console.log(
    `Deja existente:  ${existente}`
  );

  console.log(
    `Cu probleme:     ${erori}`
  );

  console.log(
    `Total procesate: ${rezultate.length}`
  );

  console.log("");

  console.log(
    `Raport: ${path.relative(
      ROOT,
      RAPORT_PATH
    )}`
  );

  console.log("");

  console.log(
    "🔒 PUBLICARE: BLOCATĂ"
  );

  console.log(
    "Audio-ul este verificat tehnic, dar pronunția matematică nu este declarată automat verificată."
  );

  console.log("");
}

/*
============================================================
START
============================================================
*/

main().catch((error) => {
  console.error("");
  console.error(
    "=============================================="
  );

  console.error(
    "❌ GENERAREA VOCII A EȘUAT"
  );

  console.error(
    "=============================================="
  );

  console.error("");

  console.error(
    error instanceof Error
      ? error.message
      : error
  );

  console.error("");

  console.error(
    "Fișierele deja generate rămân salvate."
  );

  console.error("");

  process.exitCode = 1;
});