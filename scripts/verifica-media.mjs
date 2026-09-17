import fs from "fs";
import path from "path";

/* =========================================================
   BAC MATE - VERIFICATOR MEDIA

   Verifică pentru fiecare mini-video:
   - scenariu
   - subtitrare VTT
   - audio MP3
   - thumbnail PNG
   - video final MP4

   IMPORTANT:
   - NU modifică lecțiile;
   - NU generează media;
   - doar citește și raportează situația reală.
   ========================================================= */

const ROOT = process.cwd();

const CONTINUT_DIR = path.join(
  ROOT,
  "data",
  "continut-video"
);

const PUBLIC_VIDEO_DIR = path.join(
  ROOT,
  "public",
  "videos"
);

const RAPORT_PATH = path.join(
  CONTINUT_DIR,
  "raport-media.json"
);

/* =========================================================
   UTILITARE
   ========================================================= */

function citesteJson(cale) {
  return JSON.parse(
    fs.readFileSync(
      cale,
      "utf8"
    )
  );
}

function scrieJson(cale, continut) {
  fs.writeFileSync(
    cale,
    JSON.stringify(
      continut,
      null,
      2
    ) + "\n",
    "utf8"
  );
}

function fisierValid(cale) {
  if (!fs.existsSync(cale)) {
    return false;
  }

  try {
    return (
      fs.statSync(cale)
        .size > 0
    );
  } catch {
    return false;
  }
}

/* =========================================================
   GĂSIM JSON-URILE CELOR 219 LECȚII
   ========================================================= */

function gasesteFisiereLectii() {
  const rezultate = [];

  if (
    !fs.existsSync(
      CONTINUT_DIR
    )
  ) {
    return rezultate;
  }

  const foldere =
    fs.readdirSync(
      CONTINUT_DIR,
      {
        withFileTypes: true,
      }
    );

  for (const folder of foldere) {
    if (
      !folder.isDirectory() ||
      !/^modul-\d+$/.test(
        folder.name
      )
    ) {
      continue;
    }

    const caleFolder =
      path.join(
        CONTINUT_DIR,
        folder.name
      );

    const fisiere =
      fs.readdirSync(
        caleFolder
      );

    for (const fisier of fisiere) {
      if (
        /^lectia-\d+\.json$/.test(
          fisier
        )
      ) {
        rezultate.push(
          path.join(
            caleFolder,
            fisier
          )
        );
      }
    }
  }

  return rezultate.sort();
}

/* =========================================================
   SCENARIU VALID
   ========================================================= */

function areScenariu(video) {
  const scenariuValid =
    Array.isArray(
      video.scenariu
    ) &&
    video.scenariu.some(
      (text) =>
        typeof text ===
          "string" &&
        text.trim().length > 0
    );

  const naratiuneValida =
    Array.isArray(
      video.cadre
    ) &&
    video.cadre.some(
      (cadru) =>
        typeof cadru
          ?.naratiune ===
          "string" &&
        cadru.naratiune
          .trim().length > 0
    );

  return (
    scenariuValid ||
    naratiuneValida
  );
}

/* =========================================================
   MAIN
   ========================================================= */

function main() {
  console.log("");

  console.log(
    "=============================================="
  );

  console.log(
    " BAC MATE - VERIFICARE MEDIA"
  );

  console.log(
    "=============================================="
  );

  console.log("");

  const fisiereLectii =
    gasesteFisiereLectii();

  console.log(
    `Lecții găsite: ${fisiereLectii.length}`
  );

  console.log("");

  const raport = {
    proiect:
      "BAC MATE",

    data:
      new Date()
        .toISOString(),

    lectiiGasite:
      fisiereLectii.length,

    lectiiCitite:
      0,

    miniVideoGasite:
      0,

    scenarii:
      0,

    subtitrari:
      0,

    audio:
      0,

    thumbnails:
      0,

    videoFinal:
      0,

    miniVideoComplete:
      0,

    erori:
      0,

    probleme:
      [],
  };

  for (
    let index = 0;
    index <
    fisiereLectii.length;
    index++
  ) {
    const caleLectie =
      fisiereLectii[index];

    try {
      const lectie =
        citesteJson(
          caleLectie
        );

      raport.lectiiCitite++;

      console.log(
        `[${index + 1}/${fisiereLectii.length}] ${lectie.id} - ${lectie.titlu}`
      );

      if (
        !Array.isArray(
          lectie.videoLectii
        )
      ) {
        raport.erori++;

        raport.probleme.push({
          lectie:
            lectie.id,

          problema:
            "videoLectii lipsește sau nu este array.",
        });

        continue;
      }

      for (
        let indexVideo = 0;
        indexVideo <
        lectie.videoLectii.length;
        indexVideo++
      ) {
        const video =
          lectie.videoLectii[
            indexVideo
          ];

        const numarVideo =
          Number(
            video.numar
          ) ||
          indexVideo + 1;

        raport.miniVideoGasite++;

        const folder =
          path.join(
            PUBLIC_VIDEO_DIR,
            `modul-${lectie.modul}`,
            lectie.id
          );

        const caleVtt =
          path.join(
            folder,
            `video-${numarVideo}.vtt`
          );

        const caleAudio =
          path.join(
            folder,
            `audio-${numarVideo}.mp3`
          );

        const caleThumbnail =
          path.join(
            folder,
            `video-${numarVideo}.png`
          );

        const caleMp4 =
          path.join(
            folder,
            `video-${numarVideo}.mp4`
          );

        const scenariu =
          areScenariu(video);

        const subtitrare =
          fisierValid(
            caleVtt
          );

        const audio =
          fisierValid(
            caleAudio
          );

        const thumbnail =
          fisierValid(
            caleThumbnail
          );

        const mp4 =
          fisierValid(
            caleMp4
          );

        if (scenariu) {
          raport.scenarii++;
        }

        if (subtitrare) {
          raport.subtitrari++;
        }

        if (audio) {
          raport.audio++;
        }

        if (thumbnail) {
          raport.thumbnails++;
        }

        if (mp4) {
          raport.videoFinal++;
        }

        if (
          scenariu &&
          subtitrare &&
          audio &&
          thumbnail &&
          mp4
        ) {
          raport.miniVideoComplete++;
        }

        /*
          Salvăm doar problemele.
          Astfel raportul nu devine inutil de mare.
        */

        const lipsuri = [];

        if (!scenariu) {
          lipsuri.push(
            "scenariu"
          );
        }

        if (!subtitrare) {
          lipsuri.push(
            "subtitrare"
          );
        }

        if (!audio) {
          lipsuri.push(
            "audio"
          );
        }

        if (!thumbnail) {
          lipsuri.push(
            "thumbnail"
          );
        }

        if (!mp4) {
          lipsuri.push(
            "mp4"
          );
        }

        if (
          lipsuri.length > 0
        ) {
          raport.probleme.push({
            lectie:
              lectie.id,

            modul:
              lectie.modul,

            video:
              numarVideo,

            lipsesc:
              lipsuri,
          });
        }
      }
    } catch (error) {
      raport.erori++;

      raport.probleme.push({
        fisier:
          path.relative(
            ROOT,
            caleLectie
          ),

        problema:
          error instanceof Error
            ? error.message
            : String(error),
      });
    }
  }

  scrieJson(
    RAPORT_PATH,
    raport
  );

  const total =
    raport.miniVideoGasite;

  function procent(
    valoare
  ) {
    if (total === 0) {
      return "0.0";
    }

    return (
      (valoare / total) *
      100
    ).toFixed(1);
  }

  console.log("");

  console.log(
    "=============================================="
  );

  console.log(
    " REZULTAT MEDIA"
  );

  console.log(
    "=============================================="
  );

  console.log(
    `Lecții citite: ${raport.lectiiCitite}/${raport.lectiiGasite}`
  );

  console.log(
    `Mini-video: ${raport.miniVideoGasite}`
  );

  console.log("");

  console.log(
    `📝 Scenariu: ${raport.scenarii}/${total} (${procent(raport.scenarii)}%)`
  );

  console.log(
    `💬 Subtitrare: ${raport.subtitrari}/${total} (${procent(raport.subtitrari)}%)`
  );

  console.log(
    `🔊 Audio: ${raport.audio}/${total} (${procent(raport.audio)}%)`
  );

  console.log(
    `🖼️ Thumbnail: ${raport.thumbnails}/${total} (${procent(raport.thumbnails)}%)`
  );

  console.log(
    `🎬 MP4 final: ${raport.videoFinal}/${total} (${procent(raport.videoFinal)}%)`
  );

  console.log("");

  console.log(
    `🏁 Mini-video complet produse: ${raport.miniVideoComplete}/${total}`
  );

  console.log(
    `❌ Erori tehnice: ${raport.erori}`
  );

  console.log("");

  console.log(
    "Raport:"
  );

  console.log(
    "data\\continut-video\\raport-media.json"
  );

  console.log("");
}

try {
  main();
} catch (error) {
  console.error("");

  console.error(
    "❌ EROARE FATALĂ:"
  );

  console.error(
    error instanceof Error
      ? error.message
      : error
  );

  console.error("");

  process.exitCode = 1;
}