import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, "..");
const CONTINUT_DIR = path.join(ROOT, "data", "continut-video");
const PUBLIC_DIR = path.join(ROOT, "public");
const MEDIA_DIR = path.join(PUBLIC_DIR, "media", "lectii");

const RAPORT_PATH = path.join(
  CONTINUT_DIR,
  "raport-pregatire-media.json"
);

function exista(cale) {
  return fs.existsSync(cale);
}

function asiguraFolder(cale) {
  fs.mkdirSync(cale, { recursive: true });
}

function citesteJson(cale) {
  try {
    return JSON.parse(fs.readFileSync(cale, "utf8"));
  } catch {
    return null;
  }
}

function scrieJson(cale, continut) {
  fs.writeFileSync(
    cale,
    JSON.stringify(continut, null, 2),
    "utf8"
  );
}

function normalizeazaText(text) {
  return String(text ?? "")
    .replace(/\r/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function escapeXml(text) {
  return String(text ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function secundeInVtt(secunde) {
  const totalMs = Math.max(
    0,
    Math.round(Number(secunde || 0) * 1000)
  );

  const ore = Math.floor(totalMs / 3_600_000);
  const minute = Math.floor(
    (totalMs % 3_600_000) / 60_000
  );
  const sec = Math.floor(
    (totalMs % 60_000) / 1000
  );
  const ms = totalMs % 1000;

  return (
    String(ore).padStart(2, "0") +
    ":" +
    String(minute).padStart(2, "0") +
    ":" +
    String(sec).padStart(2, "0") +
    "." +
    String(ms).padStart(3, "0")
  );
}

function spargeTextPentruSubtitrare(text) {
  const curat = normalizeazaText(text);

  if (!curat) {
    return [];
  }

  const propozitii = curat
    .split(/(?<=[.!?])\s+/)
    .map((x) => x.trim())
    .filter(Boolean);

  const rezultate = [];

  for (const propozitie of propozitii) {
    if (propozitie.length <= 115) {
      rezultate.push(propozitie);
      continue;
    }

    const cuvinte = propozitie.split(/\s+/);
    let bucata = "";

    for (const cuvant of cuvinte) {
      const candidat = bucata
        ? `${bucata} ${cuvant}`
        : cuvant;

      if (candidat.length > 105 && bucata) {
        rezultate.push(bucata.trim());
        bucata = cuvant;
      } else {
        bucata = candidat;
      }
    }

    if (bucata.trim()) {
      rezultate.push(bucata.trim());
    }
  }

  return rezultate;
}

function construiesteVtt(text, durataMinute = 5) {
  const bucati = spargeTextPentruSubtitrare(text);

  if (bucati.length === 0) {
    return "WEBVTT\n\n";
  }

  const durataTotala = Math.max(
    30,
    Number(durataMinute || 5) * 60
  );

  const caractereTotale = bucati.reduce(
    (suma, bucata) => suma + Math.max(1, bucata.length),
    0
  );

  let cursor = 0;
  let rezultat = "WEBVTT\n\n";

  bucati.forEach((bucata, index) => {
    const proportie =
      Math.max(1, bucata.length) /
      caractereTotale;

    const durataBucata = Math.max(
      2.2,
      durataTotala * proportie
    );

    const start = cursor;
    const final = Math.min(
      durataTotala,
      cursor + durataBucata
    );

    rezultat += `${index + 1}\n`;
    rezultat += `${secundeInVtt(start)} --> ${secundeInVtt(
      final
    )}\n`;
    rezultat += `${bucata}\n\n`;

    cursor = final;
  });

  return rezultat;
}

function obtineScenariu(video) {
  if (!video) {
    return "";
  }

  if (Array.isArray(video.scenariu)) {
    return normalizeazaText(
      video.scenariu
        .map((linie) => {
          if (typeof linie === "string") {
            return linie;
          }

          if (
            linie &&
            typeof linie === "object"
          ) {
            return (
              linie.text ??
              linie.continut ??
              linie.replica ??
              linie.naratiune ??
              ""
            );
          }

          return "";
        })
        .filter(Boolean)
        .join("\n\n")
    );
  }

  if (typeof video.scenariu === "string") {
    return normalizeazaText(video.scenariu);
  }

  return "";
}

function slugSigur(text, fallback) {
  const rezultat = String(text ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return rezultat || fallback;
}

function creeazaThumbnailSvg({
  titluLectie,
  titluVideo,
  modul,
  numarLectie,
  numarVideo,
}) {
  const titlu1 = escapeXml(
    String(titluLectie ?? "BAC MATE")
  );

  const titlu2 = escapeXml(
    String(titluVideo ?? `Mini-video ${numarVideo}`)
  );

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="1280"
  height="720"
  viewBox="0 0 1280 720"
>
  <defs>
    <linearGradient
      id="fundal"
      x1="0"
      y1="0"
      x2="1"
      y2="1"
    >
      <stop offset="0%" stop-color="#111827"/>
      <stop offset="100%" stop-color="#1e3a8a"/>
    </linearGradient>
  </defs>

  <rect
    width="1280"
    height="720"
    fill="url(#fundal)"
  />

  <rect
    x="75"
    y="70"
    width="1130"
    height="580"
    rx="34"
    fill="#ffffff"
    fill-opacity="0.07"
    stroke="#ffffff"
    stroke-opacity="0.16"
  />

  <text
    x="110"
    y="145"
    fill="#93c5fd"
    font-size="36"
    font-family="Arial, sans-serif"
    font-weight="700"
  >
    BAC MATE
  </text>

  <text
    x="110"
    y="215"
    fill="#ffffff"
    font-size="32"
    font-family="Arial, sans-serif"
    font-weight="700"
  >
    Modulul ${escapeXml(modul)} • Lecția ${escapeXml(
      numarLectie
    )} • Video ${escapeXml(numarVideo)}
  </text>

  <foreignObject
    x="110"
    y="260"
    width="900"
    height="220"
  >
    <div
      xmlns="http://www.w3.org/1999/xhtml"
      style="
        color:white;
        font-family:Arial,sans-serif;
        font-size:54px;
        line-height:1.12;
        font-weight:800;
      "
    >
      ${titlu2}
    </div>
  </foreignObject>

  <foreignObject
    x="110"
    y="500"
    width="900"
    height="100"
  >
    <div
      xmlns="http://www.w3.org/1999/xhtml"
      style="
        color:#bfdbfe;
        font-family:Arial,sans-serif;
        font-size:28px;
        line-height:1.25;
        font-weight:500;
      "
    >
      ${titlu1}
    </div>
  </foreignObject>

  <circle
    cx="1090"
    cy="375"
    r="82"
    fill="#ffffff"
    fill-opacity="0.96"
  />

  <polygon
    points="1065,330 1065,420 1135,375"
    fill="#1d4ed8"
  />
</svg>`;
}

function gasesteFisiereLectii() {
  if (!exista(CONTINUT_DIR)) {
    return [];
  }

  const moduleFolders = fs
    .readdirSync(CONTINUT_DIR, {
      withFileTypes: true,
    })
    .filter(
      (intrare) =>
        intrare.isDirectory() &&
        /^modul-\d+$/.test(intrare.name)
    )
    .sort((a, b) => {
      const na = Number(
        a.name.replace("modul-", "")
      );
      const nb = Number(
        b.name.replace("modul-", "")
      );
      return na - nb;
    });

  const fisiere = [];

  for (const folder of moduleFolders) {
    const caleFolder = path.join(
      CONTINUT_DIR,
      folder.name
    );

    const jsonuri = fs
      .readdirSync(caleFolder)
      .filter((nume) =>
        /^lectia-\d+\.json$/i.test(nume)
      )
      .sort((a, b) =>
        a.localeCompare(b, "ro", {
          numeric: true,
        })
      );

    for (const nume of jsonuri) {
      fisiere.push(
        path.join(caleFolder, nume)
      );
    }
  }

  return fisiere;
}

function actualizeazaMediaInJson(
  lectie,
  video,
  {
    modul,
    numarLectie,
    numarVideo,
    idLectie,
    idVideo,
  }
) {
  if (!video.media || typeof video.media !== "object") {
    video.media = {};
  }

  const bazaUrl =
    `/media/lectii/${idLectie}/${idVideo}`;

  video.media.textVoceUrl =
    `${bazaUrl}/voce.txt`;

  video.media.subtitrareUrl =
    `${bazaUrl}/subtitrare.vtt`;

  video.media.thumbnailUrl =
    `${bazaUrl}/thumbnail.svg`;

  if (!video.media.audioUrl) {
    video.media.audioUrl =
      `${bazaUrl}/audio.mp3`;
  }

  if (!video.media.videoUrl) {
    video.media.videoUrl =
      `${bazaUrl}/video.mp4`;
  }

  video.media.pregatit = true;
  video.media.modul = modul;
  video.media.numarLectie = numarLectie;
  video.media.numarVideo = numarVideo;

  return lectie;
}

function pregatesteVideo({
  lectie,
  video,
  numarVideo,
}) {
  const modul = Number(lectie.modul);
  const numarLectie = Number(
    lectie.numarLectie
  );

  const idLectie = slugSigur(
    lectie.id,
    `m${modul}-l${String(
      numarLectie
    ).padStart(2, "0")}`
  );

  const idVideo = slugSigur(
    video.id,
    `v${numarVideo}`
  );

  const scenariu = obtineScenariu(video);

  if (!scenariu) {
    return {
      pregatit: false,
      motiv: "fara-scenariu",
    };
  }

  const folderVideo = path.join(
    MEDIA_DIR,
    idLectie,
    idVideo
  );

  asiguraFolder(folderVideo);

  const caleVoce = path.join(
    folderVideo,
    "voce.txt"
  );

  const caleVtt = path.join(
    folderVideo,
    "subtitrare.vtt"
  );

  const caleSvg = path.join(
    folderVideo,
    "thumbnail.svg"
  );

  const caleMeta = path.join(
    folderVideo,
    "metadate.json"
  );

  fs.writeFileSync(
    caleVoce,
    scenariu + "\n",
    "utf8"
  );

  const durataMinute =
    Number(
      video.durataTintaMinute ??
        video.durataMinute ??
        5
    ) || 5;

  const vtt = construiesteVtt(
    scenariu,
    durataMinute
  );

  fs.writeFileSync(
    caleVtt,
    vtt,
    "utf8"
  );

  const svg = creeazaThumbnailSvg({
    titluLectie:
      lectie.titlu ??
      `Lecția ${numarLectie}`,
    titluVideo:
      video.titlu ??
      `Mini-video ${numarVideo}`,
    modul,
    numarLectie,
    numarVideo,
  });

  fs.writeFileSync(
    caleSvg,
    svg,
    "utf8"
  );

  const metadate = {
    proiect: "BAC MATE",
    lectieId: idLectie,
    videoId: idVideo,
    modul,
    numarLectie,
    numarVideo,
    titluLectie:
      lectie.titlu ?? "",
    titluVideo:
      video.titlu ?? "",
    durataTintaMinute: durataMinute,
    fisiere: {
      voce: "voce.txt",
      subtitrare: "subtitrare.vtt",
      thumbnail: "thumbnail.svg",
      audio: "audio.mp3",
      video: "video.mp4",
    },
    stare: {
      scenariu: true,
      subtitrare: true,
      thumbnail: true,
      audio: exista(
        path.join(folderVideo, "audio.mp3")
      ),
      video: exista(
        path.join(folderVideo, "video.mp4")
      ),
    },
  };

  scrieJson(caleMeta, metadate);

  actualizeazaMediaInJson(
    lectie,
    video,
    {
      modul,
      numarLectie,
      numarVideo,
      idLectie,
      idVideo,
    }
  );

  return {
    pregatit: true,
    idLectie,
    idVideo,
    folderVideo,
  };
}

function main() {
  console.log("");
  console.log("🎬 BAC MATE — PREGĂTIRE MEDIA");
  console.log("");

  asiguraFolder(MEDIA_DIR);

  const fisiere = gasesteFisiereLectii();

  if (fisiere.length === 0) {
    console.log(
      "❌ Nu am găsit lecții în data\\continut-video."
    );
    process.exitCode = 1;
    return;
  }

  let totalLectii = 0;
  let lectiiCuScenariu = 0;
  let totalVideo = 0;
  let pregatite = 0;
  let faraScenariu = 0;
  let erori = 0;

  const detalii = [];

  for (const caleLectie of fisiere) {
    const lectie = citesteJson(caleLectie);

    if (!lectie) {
      erori++;
      detalii.push({
        fisier: caleLectie,
        status: "eroare-json",
      });
      continue;
    }

    totalLectii++;

    if (!Array.isArray(lectie.videoLectii)) {
      continue;
    }

    let modificat = false;
    let areScenariu = false;

    for (
      let index = 0;
      index < lectie.videoLectii.length;
      index++
    ) {
      const video =
        lectie.videoLectii[index];

      totalVideo++;

      try {
        const rezultat =
          pregatesteVideo({
            lectie,
            video,
            numarVideo: index + 1,
          });

        if (rezultat.pregatit) {
          pregatite++;
          areScenariu = true;
          modificat = true;

          detalii.push({
            lectie:
              lectie.id ??
              `m${lectie.modul}-l${lectie.numarLectie}`,
            video:
              video.id ??
              `v${index + 1}`,
            status: "pregatit",
          });
        } else {
          faraScenariu++;

          detalii.push({
            lectie:
              lectie.id ??
              `m${lectie.modul}-l${lectie.numarLectie}`,
            video:
              video.id ??
              `v${index + 1}`,
            status:
              rezultat.motiv ??
              "nepregatit",
          });
        }
      } catch (error) {
        erori++;

        detalii.push({
          lectie:
            lectie.id ??
            `m${lectie.modul}-l${lectie.numarLectie}`,
          video:
            video?.id ??
            `v${index + 1}`,
          status: "eroare",
          eroare:
            error instanceof Error
              ? error.message
              : String(error),
        });
      }
    }

    if (areScenariu) {
      lectiiCuScenariu++;
    }

    if (modificat) {
      scrieJson(caleLectie, lectie);
    }
  }

  const raport = {
    proiect: "BAC MATE",
    generatLa:
      new Date().toISOString(),
    totalLectii,
    lectiiCuScenariu,
    totalMiniVideoGasite: totalVideo,
    miniVideoPregatite: pregatite,
    miniVideoFaraScenariu: faraScenariu,
    erori,
    folderMedia:
      "public/media/lectii",
    detalii,
  };

  scrieJson(RAPORT_PATH, raport);

  const procent =
    totalVideo > 0
      ? (
          (pregatite / totalVideo) *
          100
        ).toFixed(1)
      : "0.0";

  console.log(
    `📚 Lecții găsite: ${totalLectii}`
  );

  console.log(
    `📝 Lecții cu scenariu: ${lectiiCuScenariu}`
  );

  console.log(
    `🎞️ Mini-video găsite: ${totalVideo}`
  );

  console.log("");
  console.log(
    `✅ Media pregătită: ${pregatite}/${totalVideo} (${procent}%)`
  );

  console.log(
    `⬜ Fără scenariu încă: ${faraScenariu}`
  );

  console.log(
    `❌ Erori tehnice: ${erori}`
  );

  console.log("");
  console.log(
    "Au fost create automat:"
  );
  console.log(
    "  • voce.txt"
  );
  console.log(
    "  • subtitrare.vtt"
  );
  console.log(
    "  • thumbnail.svg"
  );
  console.log(
    "  • metadate.json"
  );

  console.log("");
  console.log(
    "Raport:"
  );
  console.log(
    "data\\continut-video\\raport-pregatire-media.json"
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