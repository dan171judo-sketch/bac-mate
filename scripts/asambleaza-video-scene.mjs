import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
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
  "raport-productie-mp4.json"
);

const args = process.argv.slice(2);

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
    .split("=")
    .slice(1)
    .join("=")
    .trim();
}

const idCerut = valoareArgument("--id");
const modulCerut = valoareArgument("--modul");
const limitaText = valoareArgument("--limit");

const proceseazaTot = areArgument("--all");
const forteaza = areArgument("--force");

const limita = limitaText
  ? Number(limitaText)
  : null;

const LATIME = 1280;
const INALTIME = 720;
const FPS = 30;

function logTitlu(text) {
  console.log("");
  console.log("========================================");
  console.log(text);
  console.log("========================================");
  console.log("");
}

function formatMB(bytes) {
  return (bytes / 1024 / 1024).toFixed(2);
}

function asiguraFolder(folder) {
  fs.mkdirSync(folder, {
    recursive: true,
  });
}

function normalizeazaPathPentruFFmpeg(cale) {
  return cale
    .replaceAll("\\", "/")
    .replaceAll("'", "'\\''");
}

function ruleazaFFmpeg(
  argumente,
  {
    afiseaza = true,
    captureaza = false,
  } = {}
) {
  return new Promise((resolve, reject) => {
    if (!ffmpegPath) {
      reject(
        new Error(
          "Nu găsesc FFmpeg din pachetul ffmpeg-static."
        )
      );
      return;
    }

    let stdout = "";
    let stderr = "";

    const proces = spawn(
      ffmpegPath,
      argumente,
      {
        cwd: ROOT,
        shell: false,
        stdio: captureaza
          ? ["ignore", "pipe", "pipe"]
          : ["ignore", "inherit", "inherit"],
      }
    );

    if (captureaza) {
      proces.stdout.on("data", (data) => {
        stdout += data.toString();
      });

      proces.stderr.on("data", (data) => {
        stderr += data.toString();
      });
    }

    proces.on("error", reject);

    proces.on("close", (cod) => {
      if (cod === 0) {
        resolve({
          stdout,
          stderr,
        });
      } else {
        const mesaj =
          stderr ||
          stdout ||
          `FFmpeg s-a oprit cu codul ${cod}.`;

        reject(
          new Error(mesaj)
        );
      }
    });
  });
}

async function obtineInfoMedia(fisier) {
  if (!fs.existsSync(fisier)) {
    throw new Error(
      `Fișierul nu există: ${fisier}`
    );
  }

  /*
    FFmpeg afișează informațiile despre fișier
    chiar dacă nu îi oferim un output final.

    Codul de ieșire poate fi diferit de zero,
    de aceea citim direct stderr.
  */

  return new Promise((resolve, reject) => {
    if (!ffmpegPath) {
      reject(
        new Error(
          "FFmpeg nu este disponibil."
        )
      );
      return;
    }

    let text = "";

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
        stdio: [
          "ignore",
          "ignore",
          "pipe",
        ],
      }
    );

    proces.stderr.on("data", (data) => {
      text += data.toString();
    });

    proces.on("error", reject);

    proces.on("close", () => {
      const durataMatch = text.match(
        /Duration:\s*(\d+):(\d+):(\d+(?:\.\d+)?)/i
      );

      let durataSecunde = null;

      if (durataMatch) {
        const ore =
          Number(durataMatch[1]);

        const minute =
          Number(durataMatch[2]);

        const secunde =
          Number(durataMatch[3]);

        durataSecunde =
          ore * 3600 +
          minute * 60 +
          secunde;
      }

      resolve({
        durataSecunde,
        areVideo: /\bVideo:/i.test(text),
        areAudio: /\bAudio:/i.test(text),
        text,
      });
    });
  });
}

function gasesteAudio(folderVideo) {
  const variante = [
    "audio.mp3",
    "audio.wav",
  ];

  for (const nume of variante) {
    const cale = path.join(
      folderVideo,
      nume
    );

    if (fs.existsSync(cale)) {
      return cale;
    }
  }

  return null;
}

function gasesteImaginiScene(folderVideo) {
  const folderScene = path.join(
    folderVideo,
    "scene"
  );

  if (!fs.existsSync(folderScene)) {
    return [];
  }

  return fs
    .readdirSync(folderScene)
    .filter((nume) =>
      /^scena-\d+\.png$/i.test(nume)
    )
    .sort((a, b) =>
      a.localeCompare(
        b,
        undefined,
        {
          numeric: true,
          sensitivity: "base",
        }
      )
    )
    .map((nume) =>
      path.join(folderScene, nume)
    );
}

function citesteCadreVideo(folderVideo) {
  const cale = path.join(
    folderVideo,
    "cadre-video.json"
  );

  if (!fs.existsSync(cale)) {
    return null;
  }

  try {
    return JSON.parse(
      fs.readFileSync(
        cale,
        "utf8"
      )
    );
  } catch {
    return null;
  }
}

function extrageListaCadre(json) {
  if (!json) {
    return [];
  }

  if (Array.isArray(json)) {
    return json;
  }

  const cheiPosibile = [
    "scene",
    "scenes",
    "cadre",
    "cadreVideo",
    "frames",
  ];

  for (const cheie of cheiPosibile) {
    if (
      Array.isArray(
        json[cheie]
      )
    ) {
      return json[cheie];
    }
  }

  return [];
}

function extrageNumar(
  obiect,
  chei
) {
  if (
    !obiect ||
    typeof obiect !== "object"
  ) {
    return null;
  }

  for (const cheie of chei) {
    const valoare =
      obiect[cheie];

    if (
      typeof valoare ===
        "number" &&
      Number.isFinite(valoare) &&
      valoare > 0
    ) {
      return valoare;
    }

    if (
      typeof valoare ===
        "string"
    ) {
      const curatat =
        valoare
          .replace("%", "")
          .replace(",", ".")
          .trim();

      const numar =
        Number(curatat);

      if (
        Number.isFinite(numar) &&
        numar > 0
      ) {
        return numar;
      }
    }
  }

  return null;
}

function obtinePonderi(
  folderVideo,
  numarScene
) {
  const json =
    citesteCadreVideo(
      folderVideo
    );

  const cadre =
    extrageListaCadre(json);

  if (
    cadre.length !==
    numarScene
  ) {
    return Array(
      numarScene
    ).fill(1);
  }

  const cheiProcent = [
    "procent",
    "procentDurata",
    "durataProcent",
    "durataProcente",
    "pondere",
    "percentage",
    "durationPercent",
  ];

  const procente =
    cadre.map((cadru) =>
      extrageNumar(
        cadru,
        cheiProcent
      )
    );

  if (
    procente.every(
      (valoare) =>
        valoare !== null
    )
  ) {
    return procente;
  }

  const cheiDurata = [
    "durataSecunde",
    "durata",
    "duration",
    "seconds",
  ];

  const durate =
    cadre.map((cadru) =>
      extrageNumar(
        cadru,
        cheiDurata
      )
    );

  if (
    durate.every(
      (valoare) =>
        valoare !== null
    )
  ) {
    return durate;
  }

  return Array(
    numarScene
  ).fill(1);
}

function calculeazaDurateScene(
  durataAudio,
  ponderi
) {
  const total =
    ponderi.reduce(
      (suma, valoare) =>
        suma + valoare,
      0
    );

  if (
    !Number.isFinite(total) ||
    total <= 0
  ) {
    return ponderi.map(
      () =>
        durataAudio /
        ponderi.length
    );
  }

  return ponderi.map(
    (pondere) =>
      durataAudio *
      (pondere / total)
  );
}

function creeazaListaConcat(
  folderVideo,
  imagini,
  durate
) {
  const caleLista =
    path.join(
      folderVideo,
      "lista-scene-ffmpeg.txt"
    );

  const linii = [];

  for (
    let i = 0;
    i < imagini.length;
    i++
  ) {
    const cale =
      normalizeazaPathPentruFFmpeg(
        imagini[i]
      );

    /*
      Minimum mic pentru a evita
      scene cu durată zero.
    */
    const durata =
      Math.max(
        0.1,
        durate[i]
      );

    linii.push(
      `file '${cale}'`
    );

    linii.push(
      `duration ${durata.toFixed(
        6
      )}`
    );
  }

  /*
    FFmpeg concat are nevoie ca ultima
    imagine să fie repetată pentru ca
    ultima durată să fie respectată.
  */

  const ultima =
    normalizeazaPathPentruFFmpeg(
      imagini[
        imagini.length - 1
      ]
    );

  linii.push(
    `file '${ultima}'`
  );

  fs.writeFileSync(
    caleLista,
    linii.join("\n"),
    "utf8"
  );

  return caleLista;
}

function idFolderEsteVideo(nume) {
  return /^m\d+-l\d+-v[1-4]$/i.test(
    nume
  );
}

function idLectieDinVideo(idVideo) {
  const match =
    idVideo.match(
      /^(m\d+-l\d+)-v[1-4]$/i
    );

  return match
    ? match[1]
    : null;
}

function modulDinVideo(idVideo) {
  const match =
    idVideo.match(
      /^m(\d+)-/i
    );

  return match
    ? Number(match[1])
    : null;
}

function gasesteToateVideo() {
  if (
    !fs.existsSync(
      MEDIA_ROOT
    )
  ) {
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
    if (
      !lectie.isDirectory()
    ) {
      continue;
    }

    const folderLectie =
      path.join(
        MEDIA_ROOT,
        lectie.name
      );

    const miniVideo =
      fs.readdirSync(
        folderLectie,
        {
          withFileTypes: true,
        }
      );

    for (
      const video of miniVideo
    ) {
      if (
        !video.isDirectory()
      ) {
        continue;
      }

      if (
        !idFolderEsteVideo(
          video.name
        )
      ) {
        continue;
      }

      rezultate.push({
        id: video.name,
        folder: path.join(
          folderLectie,
          video.name
        ),
      });
    }
  }

  rezultate.sort(
    (a, b) =>
      a.id.localeCompare(
        b.id,
        undefined,
        {
          numeric: true,
        }
      )
  );

  return rezultate;
}

function gasesteVideoDupaId(
  id
) {
  const lectie =
    idLectieDinVideo(id);

  if (!lectie) {
    return null;
  }

  const folder =
    path.join(
      MEDIA_ROOT,
      lectie,
      id
    );

  if (
    !fs.existsSync(folder)
  ) {
    return null;
  }

  return {
    id,
    folder,
  };
}

function trebuieRefacut(
  videoFinal,
  fisiereIntrare
) {
  if (forteaza) {
    return true;
  }

  if (
    !fs.existsSync(
      videoFinal
    )
  ) {
    return true;
  }

  const timpVideo =
    fs.statSync(
      videoFinal
    ).mtimeMs;

  for (
    const fisier of fisiereIntrare
  ) {
    if (
      !fisier ||
      !fs.existsSync(
        fisier
      )
    ) {
      continue;
    }

    if (
      fs.statSync(
        fisier
      ).mtimeMs >
      timpVideo
    ) {
      return true;
    }
  }

  return false;
}

async function produceVideo(
  video
) {
  const {
    id,
    folder,
  } = video;

  console.log("");
  console.log(
    "----------------------------------------"
  );
  console.log(
    `🎬 ${id}`
  );
  console.log(
    "----------------------------------------"
  );

  const audio =
    gasesteAudio(folder);

  if (!audio) {
    throw new Error(
      "Nu găsesc audio.mp3 sau audio.wav."
    );
  }

  const imagini =
    gasesteImaginiScene(
      folder
    );

  if (
    imagini.length === 0
  ) {
    throw new Error(
      "Nu există scene PNG în folderul scene."
    );
  }

  const infoAudio =
    await obtineInfoMedia(
      audio
    );

  if (
    !infoAudio.areAudio
  ) {
    throw new Error(
      "Fișierul audio nu conține o pistă audio validă."
    );
  }

  if (
    !infoAudio.durataSecunde ||
    infoAudio.durataSecunde <= 0
  ) {
    throw new Error(
      "Nu pot determina durata audio."
    );
  }

  console.log(
    `✅ Audio: ${path.basename(
      audio
    )}`
  );

  console.log(
    `✅ Durată voce: ${infoAudio.durataSecunde.toFixed(
      2
    )} secunde`
  );

  console.log(
    `✅ Scene PNG: ${imagini.length}`
  );

  const ponderi =
    obtinePonderi(
      folder,
      imagini.length
    );

  const durate =
    calculeazaDurateScene(
      infoAudio.durataSecunde,
      ponderi
    );

  const listaConcat =
    creeazaListaConcat(
      folder,
      imagini,
      durate
    );

  const videoFinal =
    path.join(
      folder,
      "video-scene.mp4"
    );

  const videoTemporar =
    path.join(
      folder,
      "__video-fara-audio.mp4"
    );

  const cadreJson =
    path.join(
      folder,
      "cadre-video.json"
    );

  const fisiereIntrare = [
    audio,
    cadreJson,
    ...imagini,
  ];

  if (
    !trebuieRefacut(
      videoFinal,
      fisiereIntrare
    )
  ) {
    const infoExistent =
      await obtineInfoMedia(
        videoFinal
      );

    if (
      infoExistent.areVideo &&
      infoExistent.areAudio
    ) {
      console.log(
        "⏭️ MP4 deja existent și actualizat. Sar peste."
      );

      return {
        status: "sar",
        id,
        videoFinal,
        durata:
          infoExistent.durataSecunde,
      };
    }
  }

  /*
    ETAPA 1
    Construim pista video din imaginile PNG.
  */

  console.log("");
  console.log(
    "1/3 Construiesc imaginile în video..."
  );

  if (
    fs.existsSync(
      videoTemporar
    )
  ) {
    fs.rmSync(
      videoTemporar,
      {
        force: true,
      }
    );
  }

  await ruleazaFFmpeg([
    "-y",

    "-hide_banner",

    "-f",
    "concat",

    "-safe",
    "0",

    "-i",
    listaConcat,

    "-vf",
    `scale=${LATIME}:${INALTIME}:force_original_aspect_ratio=decrease,pad=${LATIME}:${INALTIME}:(ow-iw)/2:(oh-ih)/2,fps=${FPS}`,

    "-c:v",
    "libx264",

    "-preset",
    "medium",

    "-crf",
    "18",

    "-pix_fmt",
    "yuv420p",

    "-an",

    videoTemporar,
  ]);

  if (
    !fs.existsSync(
      videoTemporar
    )
  ) {
    throw new Error(
      "Video-ul temporar nu a fost creat."
    );
  }

  /*
    ETAPA 2
    Adăugăm explicit vocea.
  */

  console.log("");
  console.log(
    "2/3 Adaug vocea românească..."
  );

  await ruleazaFFmpeg([
    "-y",

    "-hide_banner",

    "-i",
    videoTemporar,

    "-i",
    audio,

    "-map",
    "0:v:0",

    "-map",
    "1:a:0",

    "-c:v",
    "copy",

    "-c:a",
    "aac",

    "-b:a",
    "160k",

    "-ar",
    "48000",

    "-ac",
    "2",

    "-shortest",

    "-movflags",
    "+faststart",

    videoFinal,
  ]);

  /*
    ETAPA 3
    Verificăm fișierul rezultat.
  */

  console.log("");
  console.log(
    "3/3 Verific MP4-ul final..."
  );

  if (
    !fs.existsSync(
      videoFinal
    )
  ) {
    throw new Error(
      "video-scene.mp4 nu a fost creat."
    );
  }

  const infoFinal =
    await obtineInfoMedia(
      videoFinal
    );

  if (
    !infoFinal.areVideo
  ) {
    throw new Error(
      "MP4-ul final nu conține pistă video."
    );
  }

  if (
    !infoFinal.areAudio
  ) {
    throw new Error(
      "MP4-ul final nu conține pistă audio."
    );
  }

  const statistici =
    fs.statSync(
      videoFinal
    );

  /*
    Curățăm doar temporarul.
    Scenele, audio și lista rămân pentru verificare.
  */

  if (
    fs.existsSync(
      videoTemporar
    )
  ) {
    fs.rmSync(
      videoTemporar,
      {
        force: true,
      }
    );
  }

  console.log("");
  console.log(
    "✅ MP4 FINAL VALID"
  );

  console.log(
    "   Pistă video: DA"
  );

  console.log(
    "   Pistă audio: DA"
  );

  console.log(
    `   Durată: ${
      infoFinal.durataSecunde
        ? infoFinal.durataSecunde.toFixed(
            2
          )
        : "?"
    } secunde`
  );

  console.log(
    `   Dimensiune: ${formatMB(
      statistici.size
    )} MB`
  );

  console.log(
    `   ${path.relative(
      ROOT,
      videoFinal
    )}`
  );

  return {
    status: "creat",
    id,
    videoFinal,
    durata:
      infoFinal.durataSecunde,
    dimensiuneBytes:
      statistici.size,
  };
}

function salveazaRaport(
  rezultate
) {
  asiguraFolder(
    path.dirname(
      RAPORT_PATH
    )
  );

  const create =
    rezultate.filter(
      (x) =>
        x.status === "creat"
    );

  const sarite =
    rezultate.filter(
      (x) =>
        x.status === "sar"
    );

  const erori =
    rezultate.filter(
      (x) =>
        x.status === "eroare"
    );

  const raport = {
    proiect: "BAC MATE",
    tip: "productie-mp4",
    generatLa:
      new Date().toISOString(),

    totalSelectate:
      rezultate.length,

    create:
      create.length,

    dejaExistente:
      sarite.length,

    erori:
      erori.length,

    rezultate,
  };

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

async function main() {
  logTitlu(
    "🎬 BAC MATE — ASAMBLARE VIDEO AUTOMATĂ"
  );

  if (
    !fs.existsSync(
      MEDIA_ROOT
    )
  ) {
    throw new Error(
      `Nu găsesc folderul media:\n${MEDIA_ROOT}`
    );
  }

  let selectie = [];

  /*
    Exemplu:
    --id=m1-l01-v1
  */

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

    selectie = [video];
  }

  /*
    Exemplu:
    --modul=1
  */

  else if (modulCerut) {
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
  }

  /*
    Exemplu:
    --all
  */

  else if (proceseazaTot) {
    selectie =
      gasesteToateVideo();
  }

  /*
    Fără argument:
    păstrăm testul nostru etalon.
  */

  else {
    const videoEtalon =
      gasesteVideoDupaId(
        "m1-l01-v1"
      );

    if (!videoEtalon) {
      throw new Error(
        "Nu ai specificat --id, --modul sau --all și nu găsesc m1-l01-v1."
      );
    }

    selectie = [
      videoEtalon,
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
        "--limit trebuie să fie un număr întreg mai mare decât 0."
      );
    }

    selectie =
      selectie.slice(
        0,
        limita
      );
  }

  console.log(
    `Mini-video-uri selectate: ${selectie.length}`
  );

  console.log(
    `Mod reluare: ${
      forteaza
        ? "FORȚAT — refac toate"
        : "DA — păstrez MP4-urile actualizate"
    }`
  );

  const rezultate = [];

  for (
    let index = 0;
    index < selectie.length;
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
        await produceVideo(
          video
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
        `❌ ${video.id}: ${mesaj}`
      );

      /*
        Pentru un singur ID vrem eroare imediată.
        Pentru --all / --modul nu blocăm toată fabrica.
        Trecem la următorul video.
      */

      rezultate.push({
        status: "eroare",
        id: video.id,
        mesaj,
      });

      if (idCerut) {
        salveazaRaport(
          rezultate
        );

        throw error;
      }
    }
  }

  salveazaRaport(
    rezultate
  );

  const create =
    rezultate.filter(
      (x) =>
        x.status === "creat"
    ).length;

  const sarite =
    rezultate.filter(
      (x) =>
        x.status === "sar"
    ).length;

  const erori =
    rezultate.filter(
      (x) =>
        x.status === "eroare"
    ).length;

  logTitlu(
    "✅ ASAMBLARE TERMINATĂ"
  );

  console.log(
    `Create acum:       ${create}`
  );

  console.log(
    `Deja existente:    ${sarite}`
  );

  console.log(
    `Cu probleme:       ${erori}`
  );

  console.log(
    `Total procesate:   ${rezultate.length}`
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

  if (erori > 0) {
    console.log(
      "⚠️ Videoclipurile cu probleme au fost blocate, dar producția celorlalte a continuat."
    );
  } else {
    console.log(
      "✅ Toate videoclipurile selectate au trecut verificarea tehnică MP4."
    );
  }

  console.log("");
}

main().catch((error) => {
  console.error("");
  console.error(
    "========================================"
  );

  console.error(
    "❌ ASAMBLAREA VIDEO A EȘUAT"
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

  console.error(
    "Fișierele deja produse rămân salvate."
  );

  console.error("");

  process.exitCode = 1;
});