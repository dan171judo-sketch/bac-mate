import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import ffmpegPath from "ffmpeg-static";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, "..");

const DATA_VIDEO = path.join(
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

const RAPORT_JSON = path.join(
  DATA_VIDEO,
  "raport-audit-master.json"
);

const RAPORT_TXT = path.join(
  DATA_VIDEO,
  "raport-audit-master.txt"
);

const MINI_VIDEO_PER_LECTIE = 4;

function exista(cale) {
  try {
    return fs.existsSync(cale);
  } catch {
    return false;
  }
}

function marimeFisier(cale) {
  try {
    return fs.statSync(cale).size;
  } catch {
    return 0;
  }
}

function citesteText(cale) {
  try {
    return fs.readFileSync(
      cale,
      "utf8"
    );
  } catch {
    return "";
  }
}

function numarDinNumeLectie(nume) {
  const match =
    nume.match(
      /lectia-(\d+)\.json$/i
    );

  if (!match) {
    return null;
  }

  return Number(match[1]);
}

function extrageDurataSiStreamuri(
  caleVideo
) {
  if (
    !ffmpegPath ||
    !exista(caleVideo)
  ) {
    return {
      valid: false,
      durataSecunde: null,
      areVideo: false,
      areAudio: false,
      eroare:
        "FFmpeg indisponibil sau fișier lipsă.",
    };
  }

  /*
    ffmpeg scrie informațiile despre fișier
    în stderr când folosim -i.
  */
  const info = spawnSync(
    ffmpegPath,
    [
      "-hide_banner",
      "-i",
      caleVideo,
    ],
    {
      encoding: "utf8",
      windowsHide: true,
    }
  );

  const text =
    `${info.stdout || ""}\n${info.stderr || ""}`;

  const areVideo =
    /Video:/i.test(text);

  const areAudio =
    /Audio:/i.test(text);

  let durataSecunde = null;

  const durataMatch =
    text.match(
      /Duration:\s*(\d+):(\d+):(\d+(?:\.\d+)?)/i
    );

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

  /*
    Facem și un test real de decodare.
    Nu doar verificăm dacă header-ul există.
  */
  const verificare =
    spawnSync(
      ffmpegPath,
      [
        "-v",
        "error",
        "-i",
        caleVideo,
        "-f",
        "null",
        "-",
      ],
      {
        encoding: "utf8",
        windowsHide: true,
      }
    );

  const eroareDecodare =
    (
      verificare.stderr || ""
    ).trim();

  const valid =
    areVideo &&
    areAudio &&
    durataSecunde !== null &&
    durataSecunde > 0 &&
    verificare.status === 0;

  return {
    valid,
    durataSecunde,
    areVideo,
    areAudio,
    eroare:
      valid
        ? null
        : eroareDecodare ||
          "Video incomplet sau fără audio/video.",
  };
}

function gasesteLectiile() {
  const lectii = [];

  if (!exista(DATA_VIDEO)) {
    return lectii;
  }

  const module =
    fs.readdirSync(
      DATA_VIDEO,
      {
        withFileTypes: true,
      }
    )
    .filter(
      (item) =>
        item.isDirectory() &&
        /^modul-\d+$/i.test(
          item.name
        )
    )
    .sort(
      (a, b) => {
        const na =
          Number(
            a.name.match(
              /\d+/
            )?.[0] || 0
          );

        const nb =
          Number(
            b.name.match(
              /\d+/
            )?.[0] || 0
          );

        return na - nb;
      }
    );

  for (
    const folderModul of module
  ) {
    const nrModul =
      Number(
        folderModul.name.match(
          /\d+/
        )?.[0] || 0
      );

    const caleModul =
      path.join(
        DATA_VIDEO,
        folderModul.name
      );

    const fisiere =
      fs.readdirSync(
        caleModul,
        {
          withFileTypes: true,
        }
      )
      .filter(
        (item) =>
          item.isFile() &&
          /^lectia-\d+\.json$/i.test(
            item.name
          )
      )
      .sort(
        (a, b) =>
          (
            numarDinNumeLectie(
              a.name
            ) || 0
          ) -
          (
            numarDinNumeLectie(
              b.name
            ) || 0
          )
      );

    for (
      const fisier of fisiere
    ) {
      const nrLectie =
        numarDinNumeLectie(
          fisier.name
        );

      if (!nrLectie) {
        continue;
      }

      const idLectie =
        `m${nrModul}-l${String(
          nrLectie
        ).padStart(2, "0")}`;

      lectii.push({
        modul: nrModul,
        lectie: nrLectie,
        idLectie,
        fisierJson:
          path.join(
            caleModul,
            fisier.name
          ),
      });
    }
  }

  return lectii;
}

function verificaMiniVideo(
  lectie,
  nrVideo
) {
  const idVideo =
    `${lectie.idLectie}-v${nrVideo}`;

  const folderVideo =
    path.join(
      MEDIA_ROOT,
      lectie.idLectie,
      idVideo
    );

  const caleAudio =
    path.join(
      folderVideo,
      "audio.mp3"
    );

  const caleSubtitrare =
    path.join(
      folderVideo,
      "subtitrare.vtt"
    );

  const caleThumbnail =
    path.join(
      folderVideo,
      "thumbnail.svg"
    );

  const caleVideo =
    path.join(
      folderVideo,
      "video-scene.mp4"
    );

  const caleVoce =
    path.join(
      folderVideo,
      "voce.txt"
    );

  const caleVocePregatita =
    path.join(
      folderVideo,
      "voce-pregatita.txt"
    );

  const caleCadre =
    path.join(
      folderVideo,
      "cadre-video.json"
    );

  const folderScene =
    path.join(
      folderVideo,
      "scene"
    );

  const areFolder =
    exista(folderVideo);

  const areAudio =
    exista(caleAudio) &&
    marimeFisier(caleAudio) > 1000;

  const areSubtitrare =
    exista(caleSubtitrare) &&
    citesteText(
      caleSubtitrare
    ).includes("WEBVTT");

  const areThumbnail =
    exista(caleThumbnail) &&
    marimeFisier(
      caleThumbnail
    ) > 100;

  const areMP4 =
    exista(caleVideo) &&
    marimeFisier(
      caleVideo
    ) > 10000;

  const areVoce =
    (
      exista(caleVoce) &&
      citesteText(
        caleVoce
      ).trim().length > 20
    ) ||
    (
      exista(
        caleVocePregatita
      ) &&
      citesteText(
        caleVocePregatita
      ).trim().length > 20
    );

  const areCadre =
    exista(caleCadre) &&
    marimeFisier(
      caleCadre
    ) > 50;

  let numarScene = 0;

  if (
    exista(folderScene)
  ) {
    try {
      numarScene =
        fs.readdirSync(
          folderScene
        )
        .filter(
          (nume) =>
            /\.png$/i.test(
              nume
            )
        )
        .length;
    } catch {
      numarScene = 0;
    }
  }

  let analizaMP4 = {
    valid: false,
    durataSecunde: null,
    areVideo: false,
    areAudio: false,
    eroare: null,
  };

  if (areMP4) {
    analizaMP4 =
      extrageDurataSiStreamuri(
        caleVideo
      );
  }

  const completFisiere =
    areAudio &&
    areSubtitrare &&
    areThumbnail &&
    areMP4;

  const completTehnic =
    completFisiere &&
    analizaMP4.valid;

  let status = "LIPSA";

  if (completTehnic) {
    status =
      "COMPLET_TEHNIC";
  } else if (
    areFolder ||
    areAudio ||
    areSubtitrare ||
    areThumbnail ||
    areMP4 ||
    areVoce ||
    areCadre ||
    numarScene > 0
  ) {
    status =
      "INCOMPLET";
  }

  return {
    idVideo,
    idLectie:
      lectie.idLectie,
    modul:
      lectie.modul,
    lectie:
      lectie.lectie,
    video:
      nrVideo,

    status,

    areFolder,
    areVoce,
    areAudio,
    areSubtitrare,
    areThumbnail,
    areCadre,
    numarScene,
    areMP4,

    marimeMP4:
      marimeFisier(
        caleVideo
      ),

    mp4Valid:
      analizaMP4.valid,

    mp4AreVideo:
      analizaMP4.areVideo,

    mp4AreAudio:
      analizaMP4.areAudio,

    durataSecunde:
      analizaMP4.durataSecunde,

    eroareMP4:
      analizaMP4.eroare,

    cale:
      folderVideo,
  };
}

function procent(
  numar,
  total
) {
  if (!total) {
    return "0.0";
  }

  return (
    (
      numar /
      total
    ) *
    100
  ).toFixed(1);
}

function main() {
  console.log("");
  console.log(
    "=============================================="
  );

  console.log(
    "BAC MATE — AUDIT MASTER"
  );

  console.log(
    "=============================================="
  );

  console.log(
    "Mod: DOAR CITIRE"
  );

  console.log(
    "Nu se generează și nu se șterge nimic."
  );

  console.log("");

  const lectii =
    gasesteLectiile();

  console.log(
    `Lecții găsite în data/continut-video: ${lectii.length}`
  );

  const rezultate = [];

  for (
    let i = 0;
    i < lectii.length;
    i++
  ) {
    const lectie =
      lectii[i];

    process.stdout.write(
      `\rVerific lecția ${i + 1}/${lectii.length}: ${lectie.idLectie}   `
    );

    for (
      let video = 1;
      video <=
      MINI_VIDEO_PER_LECTIE;
      video++
    ) {
      rezultate.push(
        verificaMiniVideo(
          lectie,
          video
        )
      );
    }
  }

  console.log("");
  console.log("");

  const total =
    rezultate.length;

  const complet =
    rezultate.filter(
      (x) =>
        x.status ===
        "COMPLET_TEHNIC"
    ).length;

  const incomplet =
    rezultate.filter(
      (x) =>
        x.status ===
        "INCOMPLET"
    ).length;

  const lipsa =
    rezultate.filter(
      (x) =>
        x.status ===
        "LIPSA"
    ).length;

  const cuVoce =
    rezultate.filter(
      (x) =>
        x.areVoce
    ).length;

  const cuAudio =
    rezultate.filter(
      (x) =>
        x.areAudio
    ).length;

  const cuSubtitrare =
    rezultate.filter(
      (x) =>
        x.areSubtitrare
    ).length;

  const cuThumbnail =
    rezultate.filter(
      (x) =>
        x.areThumbnail
    ).length;

  const cuCadre =
    rezultate.filter(
      (x) =>
        x.areCadre
    ).length;

  const cuScene =
    rezultate.filter(
      (x) =>
        x.numarScene > 0
    ).length;

  const cuMP4 =
    rezultate.filter(
      (x) =>
        x.areMP4
    ).length;

  const mp4Valide =
    rezultate.filter(
      (x) =>
        x.mp4Valid
    ).length;

  const mp4FaraAudio =
    rezultate.filter(
      (x) =>
        x.areMP4 &&
        !x.mp4AreAudio
    ).length;

  const mp4FaraVideo =
    rezultate.filter(
      (x) =>
        x.areMP4 &&
        !x.mp4AreVideo
    ).length;

  const mp4Corupte =
    rezultate.filter(
      (x) =>
        x.areMP4 &&
        !x.mp4Valid
    ).length;

  const durate =
    rezultate
      .map(
        (x) =>
          x.durataSecunde
      )
      .filter(
        (x) =>
          typeof x ===
            "number" &&
          Number.isFinite(x)
      );

  const durataMin =
    durate.length
      ? Math.min(
          ...durate
        )
      : null;

  const durataMax =
    durate.length
      ? Math.max(
          ...durate
        )
      : null;

  const durataMedie =
    durate.length
      ? durate.reduce(
          (a, b) =>
            a + b,
          0
        ) /
        durate.length
      : null;

  const lectiiRezumat =
    lectii.map(
      (lectie) => {
        const videos =
          rezultate.filter(
            (x) =>
              x.idLectie ===
              lectie.idLectie
          );

        return {
          idLectie:
            lectie.idLectie,

          modul:
            lectie.modul,

          lectie:
            lectie.lectie,

          completTehnic:
            videos.filter(
              (x) =>
                x.status ===
                "COMPLET_TEHNIC"
            ).length,

          incomplete:
            videos.filter(
              (x) =>
                x.status ===
                "INCOMPLET"
            ).length,

          lipsa:
            videos.filter(
              (x) =>
                x.status ===
                "LIPSA"
            ).length,

          toate4Complete:
            videos.every(
              (x) =>
                x.status ===
                "COMPLET_TEHNIC"
            ),
        };
      }
    );

  const lectiiComplete =
    lectiiRezumat.filter(
      (x) =>
        x.toate4Complete
    ).length;

  const lectiiPartial =
    lectiiRezumat.filter(
      (x) =>
        !x.toate4Complete &&
        x.completTehnic > 0
    ).length;

  const lectiiFaraVideoComplet =
    lectiiRezumat.filter(
      (x) =>
        x.completTehnic === 0
    ).length;

  const raport = {
    generatLa:
      new Date().toISOString(),

    mod:
      "DOAR_CITIRE",

    sumar: {
      lectiiGasite:
        lectii.length,

      miniVideoAsteptate:
        total,

      completTehnic:
        complet,

      incomplet,

      lipsa,

      cuVoce,

      cuAudio,

      cuSubtitrare,

      cuThumbnail,

      cuCadre,

      cuScene,

      cuMP4,

      mp4Valide,

      mp4FaraAudio,

      mp4FaraVideo,

      mp4Corupte,

      lectiiComplete4din4:
        lectiiComplete,

      lectiiPartial:
        lectiiPartial,

      lectiiFaraVideoComplet:
        lectiiFaraVideoComplet,

      durataMinSecunde:
        durataMin,

      durataMaxSecunde:
        durataMax,

      durataMedieSecunde:
        durataMedie,
    },

    lectii:
      lectiiRezumat,

    miniVideo:
      rezultate,
  };

  fs.writeFileSync(
    RAPORT_JSON,
    JSON.stringify(
      raport,
      null,
      2
    ),
    "utf8"
  );

  const linii = [];

  linii.push(
    "BAC MATE — AUDIT MASTER"
  );

  linii.push(
    "========================"
  );

  linii.push("");

  linii.push(
    `Lecții găsite: ${lectii.length}`
  );

  linii.push(
    `Mini-video așteptate: ${total}`
  );

  linii.push("");

  linii.push(
    `COMPLET TEHNIC: ${complet}/${total} (${procent(complet, total)}%)`
  );

  linii.push(
    `INCOMPLETE: ${incomplet}/${total}`
  );

  linii.push(
    `LIPSĂ: ${lipsa}/${total}`
  );

  linii.push("");

  linii.push(
    `Voce/text: ${cuVoce}`
  );

  linii.push(
    `Audio: ${cuAudio}`
  );

  linii.push(
    `Subtitrări: ${cuSubtitrare}`
  );

  linii.push(
    `Thumbnail: ${cuThumbnail}`
  );

  linii.push(
    `Cadre JSON: ${cuCadre}`
  );

  linii.push(
    `Scene PNG: ${cuScene}`
  );

  linii.push(
    `MP4 existente: ${cuMP4}`
  );

  linii.push(
    `MP4 valide: ${mp4Valide}`
  );

  linii.push(
    `MP4 corupte/invalide: ${mp4Corupte}`
  );

  linii.push(
    `MP4 fără audio: ${mp4FaraAudio}`
  );

  linii.push(
    `MP4 fără video: ${mp4FaraVideo}`
  );

  linii.push("");

  linii.push(
    `Lecții 4/4 complete tehnic: ${lectiiComplete}/${lectii.length}`
  );

  linii.push(
    `Lecții parțiale: ${lectiiPartial}`
  );

  linii.push(
    `Lecții fără niciun mini-video complet: ${lectiiFaraVideoComplet}`
  );

  linii.push("");

  if (
    durataMin !== null
  ) {
    linii.push(
      `Durată MP4 minimă: ${durataMin.toFixed(2)} sec`
    );

    linii.push(
      `Durată MP4 medie: ${durataMedie.toFixed(2)} sec`
    );

    linii.push(
      `Durată MP4 maximă: ${durataMax.toFixed(2)} sec`
    );
  }

  linii.push("");
  linii.push(
    "LECȚII INCOMPLETE / PARȚIALE"
  );

  linii.push(
    "---------------------------"
  );

  for (
    const lectie of
    lectiiRezumat
  ) {
    if (
      !lectie.toate4Complete
    ) {
      linii.push(
        `${lectie.idLectie}: ${lectie.completTehnic}/4 complete | ${lectie.incomplete} incomplete | ${lectie.lipsa} lipsă`
      );
    }
  }

  fs.writeFileSync(
    RAPORT_TXT,
    linii.join("\n"),
    "utf8"
  );

  console.log(
    "=============================================="
  );

  console.log(
    "REZULTAT AUDIT"
  );

  console.log(
    "=============================================="
  );

  console.log(
    `Lecții găsite: ${lectii.length}`
  );

  console.log(
    `Mini-video așteptate: ${total}`
  );

  console.log("");

  console.log(
    `✅ Complete tehnic: ${complet}/${total} (${procent(complet, total)}%)`
  );

  console.log(
    `🟡 Incomplete: ${incomplet}/${total}`
  );

  console.log(
    `⚪ Lipsă: ${lipsa}/${total}`
  );

  console.log("");

  console.log(
    `🔊 Audio: ${cuAudio}`
  );

  console.log(
    `💬 Subtitrări: ${cuSubtitrare}`
  );

  console.log(
    `🖼 Thumbnail: ${cuThumbnail}`
  );

  console.log(
    `🎬 MP4 existente: ${cuMP4}`
  );

  console.log(
    `✅ MP4 valide: ${mp4Valide}`
  );

  console.log(
    `❌ MP4 invalide/corupte: ${mp4Corupte}`
  );

  console.log("");

  console.log(
    `📚 Lecții 4/4 complete tehnic: ${lectiiComplete}/${lectii.length}`
  );

  console.log(
    `📚 Lecții parțiale: ${lectiiPartial}`
  );

  console.log("");

  if (
    durataMin !== null
  ) {
    console.log(
      `⏱ Durată minimă: ${durataMin.toFixed(2)} sec`
    );

    console.log(
      `⏱ Durată medie: ${durataMedie.toFixed(2)} sec`
    );

    console.log(
      `⏱ Durată maximă: ${durataMax.toFixed(2)} sec`
    );
  }

  console.log("");
  console.log(
    "Rapoarte:"
  );

  console.log(
    path.relative(
      ROOT,
      RAPORT_JSON
    )
  );

  console.log(
    path.relative(
      ROOT,
      RAPORT_TXT
    )
  );

  console.log("");
  console.log(
    "IMPORTANT:"
  );

  console.log(
    "COMPLET TEHNIC nu înseamnă încă APROBAT MATEMATIC."
  );

  console.log(
    "Acesta este doar auditul tehnic al producției existente."
  );

  console.log("");
}

main();