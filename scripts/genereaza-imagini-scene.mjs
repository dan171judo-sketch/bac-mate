import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

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
  "raport-imagini-scene-v4.json"
);

const LATIME = 1280;
const INALTIME = 720;

const args = process.argv.slice(2);

function areArgument(nume) {
  return args.includes(nume);
}

function valoareArgument(prefix) {
  const arg = args.find((item) =>
    item.startsWith(`${prefix}=`)
  );

  if (!arg) {
    return null;
  }

  return arg
    .slice(prefix.length + 1)
    .trim();
}

const idCerut = valoareArgument("--id");
const modulCerut = valoareArgument("--modul");
const limitaText = valoareArgument("--limit");

const toate = areArgument("--all");
const force = areArgument("--force");

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
  fs.mkdirSync(cale, {
    recursive: true,
  });
}

function citesteJSON(cale) {
  return JSON.parse(
    fs.readFileSync(
      cale,
      "utf8"
    )
  );
}

function scrieJSON(cale, valoare) {
  asiguraFolder(
    path.dirname(cale)
  );

  fs.writeFileSync(
    cale,
    JSON.stringify(
      valoare,
      null,
      2
    ),
    "utf8"
  );
}

function escapeXML(text) {
  return String(text ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function normalizeazaText(text) {
  return String(text ?? "")
    .replace(/\s+/g, " ")
    .trim();
}

function taieText(
  text,
  max = 150
) {
  const t = normalizeazaText(text);

  if (t.length <= max) {
    return t;
  }

  return (
    t.slice(0, max - 1).trim() +
    "…"
  );
}

function imparteRanduri(
  text,
  maxCaractere = 44,
  maxRanduri = 4
) {
  const cuvinte =
    normalizeazaText(text)
      .split(" ")
      .filter(Boolean);

  const randuri = [];

  let rand = "";

  for (const cuvant of cuvinte) {
    const candidat =
      rand.length === 0
        ? cuvant
        : `${rand} ${cuvant}`;

    if (
      candidat.length <=
      maxCaractere
    ) {
      rand = candidat;
    } else {
      if (rand) {
        randuri.push(rand);
      }

      rand = cuvant;

      if (
        randuri.length >=
        maxRanduri
      ) {
        break;
      }
    }
  }

  if (
    rand &&
    randuri.length <
      maxRanduri
  ) {
    randuri.push(rand);
  }

  if (
    randuri.length ===
      maxRanduri &&
    cuvinte.join(" ").length >
      randuri.join(" ").length
  ) {
    randuri[
      randuri.length - 1
    ] =
      randuri[
        randuri.length - 1
      ]
        .replace(/[.,;:!?-]*$/, "")
        .trim() + "…";
  }

  return randuri;
}

function textSVG({
  text,
  x,
  y,
  marime = 30,
  greutate = 500,
  ancora = "start",
  opacitate = 1,
}) {
  return `
    <text
      x="${x}"
      y="${y}"
      font-family="Arial, Helvetica, sans-serif"
      font-size="${marime}"
      font-weight="${greutate}"
      text-anchor="${ancora}"
      fill="#F8FAFC"
      opacity="${opacitate}"
    >${escapeXML(text)}</text>
  `;
}

function randuriSVG({
  text,
  x,
  y,
  marime = 30,
  greutate = 500,
  maxCaractere = 44,
  maxRanduri = 4,
  distanta = 42,
}) {
  const randuri =
    imparteRanduri(
      text,
      maxCaractere,
      maxRanduri
    );

  return randuri
    .map(
      (rand, index) =>
        textSVG({
          text: rand,
          x,
          y:
            y +
            index *
              distanta,
          marime,
          greutate,
        })
    )
    .join("\n");
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

  const folder =
    path.join(
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
      if (
        !entry.isDirectory()
      ) {
        continue;
      }

      if (
        !esteIdVideo(
          entry.name
        )
      ) {
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
CITIRE CADRE VIDEO V4
============================================================
*/

function extrageScene(json) {
  if (!json) {
    return [];
  }

  if (Array.isArray(json)) {
    return json;
  }

  const variante = [
    json.scene,
    json.scenes,
    json.cadre,
    json.cadreVideo,
    json.frames,
    json.video?.scene,
    json.video?.cadre,
    json.rezultat?.scene,
  ];

  for (const valoare of variante) {
    if (Array.isArray(valoare)) {
      return valoare;
    }
  }

  return [];
}

function extrageTitluVideo(
  json,
  fallback
) {
  return (
    normalizeazaText(
      json?.video?.titlu
    ) ||
    normalizeazaText(
      json?.titlu
    ) ||
    normalizeazaText(
      json?.lectie?.titlu
    ) ||
    fallback
  );
}

function extrageTitluScena(
  scena,
  index
) {
  return (
    normalizeazaText(
      scena?.titlu
    ) ||
    normalizeazaText(
      scena?.title
    ) ||
    `Pasul ${index + 1}`
  );
}

function extrageSubtitlu(scena) {
  return (
    normalizeazaText(
      scena?.subtitlu
    ) ||
    normalizeazaText(
      scena?.subtitle
    ) ||
    normalizeazaText(
      scena?.descriere
    ) ||
    ""
  );
}

function extrageAccent(scena) {
  return (
    normalizeazaText(
      scena?.accentPrincipal
    ) ||
    normalizeazaText(
      scena?.accent
    ) ||
    normalizeazaText(
      scena?.formula
    ) ||
    ""
  );
}

function extrageElemente(scena) {
  const valoare =
    scena?.elemente ??
    scena?.elements ??
    scena?.continut ??
    [];

  return Array.isArray(valoare)
    ? valoare
    : [];
}

function textElement(element) {
  if (!element) {
    return "";
  }

  const variante = [
    element.text,
    element.formula,
    element.exemplu,
    element.mesaj,
    element.nume,
    element.simbol,
    element.raspuns,
    element.valoare,
  ];

  const texte = variante
    .map(normalizeazaText)
    .filter(Boolean);

  if (
    element.simbol &&
    element.nume &&
    !texte.includes(
      `${element.simbol} — ${element.nume}`
    )
  ) {
    return `${element.simbol} — ${element.nume}${
      element.exemplu
        ? `: ${element.exemplu}`
        : ""
    }`;
  }

  return texte[0] ?? "";
}

function tipElement(element) {
  return normalizeazaText(
    element?.tip
  ).toLowerCase();
}

function esteFormula(element) {
  const tip =
    tipElement(element);

  return (
    tip.includes("formula") ||
    tip.includes("relatie") ||
    tip.includes("răspuns") ||
    tip.includes("raspuns") ||
    tip.includes("problema")
  );
}

/*
============================================================
DESIGN BAC MATE
============================================================
*/

function bazaSVG({
  videoId,
  numarScena,
  totalScene,
  titluVideo,
}) {
  const progres =
    Math.max(
      0,
      Math.min(
        1,
        numarScena /
          totalScene
      )
    );

  const latimeProgres =
    Math.round(
      1110 * progres
    );

  return `
    <rect
      width="${LATIME}"
      height="${INALTIME}"
      fill="#081529"
    />

    <circle
      cx="1110"
      cy="100"
      r="260"
      fill="#0D274A"
      opacity="0.55"
    />

    <circle
      cx="1150"
      cy="660"
      r="330"
      fill="#0A213D"
      opacity="0.38"
    />

    <rect
      x="64"
      y="38"
      width="180"
      height="48"
      rx="24"
      fill="#11355F"
    />

    ${textSVG({
      text: "BAC MATE",
      x: 154,
      y: 70,
      marime: 23,
      greutate: 700,
      ancora: "middle",
    })}

    ${textSVG({
      text:
        taieText(
          titluVideo,
          55
        ),
      x: 270,
      y: 70,
      marime: 20,
      greutate: 500,
      opacitate: 0.72,
    })}

    ${textSVG({
      text: `${numarScena}/${totalScene}`,
      x: 1216,
      y: 70,
      marime: 18,
      greutate: 600,
      ancora: "end",
      opacitate: 0.7,
    })}

    <rect
      x="64"
      y="674"
      width="1110"
      height="6"
      rx="3"
      fill="#20344E"
    />

    <rect
      x="64"
      y="674"
      width="${latimeProgres}"
      height="6"
      rx="3"
      fill="#5EA7FF"
    />

    ${textSVG({
      text: videoId,
      x: 1174,
      y: 704,
      marime: 13,
      greutate: 500,
      ancora: "end",
      opacitate: 0.35,
    })}
  `;
}

function cardSVG({
  x,
  y,
  latime,
  inaltime,
  accent = false,
}) {
  return `
    <rect
      x="${x}"
      y="${y}"
      width="${latime}"
      height="${inaltime}"
      rx="24"
      fill="${
        accent
          ? "#123C68"
          : "#0E223C"
      }"
      stroke="${
        accent
          ? "#4C92D9"
          : "#28425F"
      }"
      stroke-width="${
        accent ? 2 : 1
      }"
    />
  `;
}

function renderElemente(
  elemente
) {
  if (
    !Array.isArray(elemente) ||
    elemente.length === 0
  ) {
    return "";
  }

  const maxime = 4;

  const selectate =
    elemente.slice(
      0,
      maxime
    );

  let rezultat = "";

  let y = 390;

  for (
    let index = 0;
    index < selectate.length;
    index++
  ) {
    const element =
      selectate[index];

    const text =
      taieText(
        textElement(element),
        115
      );

    if (!text) {
      continue;
    }

    const formula =
      esteFormula(element);

    if (formula) {
      rezultat +=
        cardSVG({
          x: 124,
          y: y - 34,
          latime: 1032,
          inaltime: 72,
          accent: true,
        });

      rezultat +=
        textSVG({
          text,
          x: 640,
          y: y + 10,
          marime:
            text.length > 45
              ? 28
              : 35,
          greutate: 700,
          ancora: "middle",
        });

      y += 92;
    } else {
      rezultat += `
        <circle
          cx="145"
          cy="${y - 5}"
          r="7"
          fill="#66AFFF"
        />
      `;

      rezultat +=
        randuriSVG({
          text,
          x: 170,
          y,
          marime: 25,
          greutate: 500,
          maxCaractere: 65,
          maxRanduri: 2,
          distanta: 31,
        });

      y += 72;
    }

    if (y > 625) {
      break;
    }
  }

  return rezultat;
}

function construiesteSVG({
  videoId,
  titluVideo,
  scena,
  index,
  totalScene,
}) {
  const titlu =
    extrageTitluScena(
      scena,
      index
    );

  const subtitlu =
    extrageSubtitlu(scena);

  const accent =
    extrageAccent(scena);

  const elemente =
    extrageElemente(scena);

  const tip =
    normalizeazaText(
      scena?.tip
    ).toUpperCase();

  let continut = "";

  continut += bazaSVG({
    videoId,
    numarScena:
      index + 1,
    totalScene,
    titluVideo,
  });

  if (tip) {
    continut += `
      <rect
        x="64"
        y="118"
        width="${
          Math.min(
            220,
            80 +
              tip.length *
                11
          )
        }"
        height="36"
        rx="18"
        fill="#153B65"
      />

      ${textSVG({
        text: tip,
        x: 84,
        y: 143,
        marime: 15,
        greutate: 700,
      })}
    `;
  }

  continut +=
    randuriSVG({
      text: titlu,
      x: 64,
      y: 218,
      marime:
        titlu.length > 40
          ? 39
          : 46,
      greutate: 750,
      maxCaractere: 44,
      maxRanduri: 2,
      distanta: 52,
    });

  if (subtitlu) {
    continut +=
      randuriSVG({
        text: subtitlu,
        x: 67,
        y: 310,
        marime: 24,
        greutate: 450,
        maxCaractere: 74,
        maxRanduri: 2,
        distanta: 34,
      });
  }

  if (
    accent &&
    elemente.length === 0
  ) {
    continut +=
      cardSVG({
        x: 130,
        y: 405,
        latime: 1020,
        inaltime: 105,
        accent: true,
      });

    continut +=
      textSVG({
        text:
          taieText(
            accent,
            75
          ),
        x: 640,
        y: 470,
        marime:
          accent.length > 45
            ? 31
            : 40,
        greutate: 700,
        ancora: "middle",
      });
  } else {
    continut +=
      renderElemente(
        elemente
      );
  }

  return `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="${LATIME}"
      height="${INALTIME}"
      viewBox="0 0 ${LATIME} ${INALTIME}"
    >
      ${continut}
    </svg>
  `;
}

/*
============================================================
GENERARE
============================================================
*/

function esteActualizat(
  iesire,
  intrare
) {
  if (force) {
    return false;
  }

  if (!exista(iesire)) {
    return false;
  }

  const timpIesire =
    fs.statSync(
      iesire
    ).mtimeMs;

  const timpIntrare =
    fs.statSync(
      intrare
    ).mtimeMs;

  return (
    timpIesire >=
    timpIntrare
  );
}

async function genereazaPentruVideo(
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
  console.log(`🖼️ ${id}`);
  console.log(
    "----------------------------------------"
  );

  const cadrePath =
    path.join(
      folder,
      "cadre-video.json"
    );

  if (!exista(cadrePath)) {
    throw new Error(
      "Lipsește cadre-video.json."
    );
  }

  let json;

  try {
    json =
      citesteJSON(
        cadrePath
      );
  } catch {
    throw new Error(
      "cadre-video.json nu este JSON valid."
    );
  }

  const scene =
    extrageScene(json);

  if (
    !Array.isArray(scene) ||
    scene.length === 0
  ) {
    throw new Error(
      "cadre-video.json nu conține scene."
    );
  }

  if (
    scene.length < 3 ||
    scene.length > 12
  ) {
    throw new Error(
      `Număr suspect de scene: ${scene.length}.`
    );
  }

  const titluVideo =
    extrageTitluVideo(
      json,
      id
    );

  const folderScene =
    path.join(
      folder,
      "scene"
    );

  asiguraFolder(
    folderScene
  );

  let create = 0;
  let existente = 0;

  const fisiere = [];

  for (
    let index = 0;
    index < scene.length;
    index++
  ) {
    const numar =
      String(
        index + 1
      ).padStart(
        2,
        "0"
      );

    const svgPath =
      path.join(
        folderScene,
        `scena-${numar}.svg`
      );

    const pngPath =
      path.join(
        folderScene,
        `scena-${numar}.png`
      );

    if (
      esteActualizat(
        pngPath,
        cadrePath
      ) &&
      esteActualizat(
        svgPath,
        cadrePath
      )
    ) {
      console.log(
        `⏭️ scena-${numar} există`
      );

      existente++;

      fisiere.push({
        scena:
          index + 1,
        svg:
          path.relative(
            ROOT,
            svgPath
          ),
        png:
          path.relative(
            ROOT,
            pngPath
          ),
      });

      continue;
    }

    const svg =
      construiesteSVG({
        videoId: id,
        titluVideo,
        scena:
          scene[index],
        index,
        totalScene:
          scene.length,
      });

    fs.writeFileSync(
      svgPath,
      svg,
      "utf8"
    );

    await sharp(
      Buffer.from(svg)
    )
      .resize(
        LATIME,
        INALTIME,
        {
          fit: "fill",
        }
      )
      .png({
        compressionLevel: 9,
      })
      .toFile(
        pngPath
      );

    if (!exista(pngPath)) {
      throw new Error(
        `Nu s-a creat scena-${numar}.png.`
      );
    }

    const info =
      await sharp(
        pngPath
      ).metadata();

    if (
      info.width !==
        LATIME ||
      info.height !==
        INALTIME
    ) {
      throw new Error(
        `scena-${numar}.png nu are rezoluția 1280x720.`
      );
    }

    console.log(
      `✅ scena-${numar}.png`
    );

    create++;

    fisiere.push({
      scena:
        index + 1,
      svg:
        path.relative(
          ROOT,
          svgPath
        ),
      png:
        path.relative(
          ROOT,
          pngPath
        ),
    });
  }

  /*
    Ștergem imaginile vechi dacă un video
    avea înainte mai multe scene.
  */

  const existenteFolder =
    fs.readdirSync(
      folderScene
    );

  for (const nume of existenteFolder) {
    const match =
      nume.match(
        /^scena-(\d+)\.(png|svg)$/i
      );

    if (!match) {
      continue;
    }

    const numar =
      Number(match[1]);

    if (
      numar >
      scene.length
    ) {
      fs.rmSync(
        path.join(
          folderScene,
          nume
        ),
        {
          force: true,
        }
      );
    }
  }

  const manifest = {
    proiect: "BAC MATE",
    versiune: "4.0",

    videoId: id,

    rezolutie: {
      latime:
        LATIME,
      inaltime:
        INALTIME,
    },

    totalScene:
      scene.length,

    create,
    existente,

    fisiere,

    verificare: {
      pngGenerate:
        fisiere.length ===
        scene.length,

      rezolutie:
        "1280x720",

      gataPentruAsamblare:
        fisiere.length ===
        scene.length,

      matematicaVerificata:
        false,

      publicareAutomata:
        false,
    },

    generatLa:
      new Date().toISOString(),
  };

  scrieJSON(
    path.join(
      folderScene,
      "manifest.json"
    ),
    manifest
  );

  console.log("");
  console.log(
    `✅ Scene totale: ${scene.length}`
  );
  console.log(
    `✅ Create acum: ${create}`
  );
  console.log(
    `⏭️ Deja existente: ${existente}`
  );

  return {
    id,
    status:
      create > 0
        ? "creat"
        : "existent",
    totalScene:
      scene.length,
    create,
    existente,
  };
}

/*
============================================================
SELECTARE
============================================================
*/

function obtineSelectia() {
  let selectie = [];

  if (idCerut) {
    const video =
      gasesteVideoDupaId(
        idCerut
      );

    if (!video) {
      throw new Error(
        `Nu găsesc ${idCerut}.`
      );
    }

    selectie = [video];
  } else if (modulCerut) {
    const modul =
      Number(modulCerut);

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
  } else if (toate) {
    selectie =
      gasesteToateVideo();
  } else {
    const etalon =
      gasesteVideoDupaId(
        "m1-l01-v1"
      );

    if (!etalon) {
      throw new Error(
        "Nu ai dat --id, --modul sau --all și nu găsesc m1-l01-v1."
      );
    }

    selectie = [etalon];
  }

  if (limita !== null) {
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
MAIN
============================================================
*/

async function main() {
  titlu(
    "🖼️ BAC MATE — GENERARE IMAGINI SCENE V4"
  );

  if (!exista(MEDIA_ROOT)) {
    throw new Error(
      `Nu găsesc folderul:\n${MEDIA_ROOT}`
    );
  }

  const selectie =
    obtineSelectia();

  console.log(
    `Mini-video-uri selectate: ${selectie.length}`
  );

  console.log(
    `Mod: ${
      force
        ? "FORȚAT"
        : "RELUARE AUTOMATĂ"
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
        await genereazaPentruVideo(
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

      console.error(
        `❌ ${video.id}: ${mesaj}`
      );

      rezultate.push({
        id:
          video.id,
        status:
          "eroare",
        mesaj,
      });

      /*
        La --id vrem să vedem imediat eroarea.
        La batch continuăm cu următorul.
      */

      if (idCerut) {
        scrieJSON(
          RAPORT_PATH,
          {
            proiect:
              "BAC MATE",
            tip:
              "imagini-scene-v4",
            rezultate,
            generatLa:
              new Date().toISOString(),
          }
        );

        throw error;
      }
    }

    /*
      Salvăm progresul după fiecare video.
      Dacă se oprește calculatorul, raportul
      rămâne pe disc.
    */

    scrieJSON(
      RAPORT_PATH,
      {
        proiect:
          "BAC MATE",
        tip:
          "imagini-scene-v4",
        rezultate,
        generatLa:
          new Date().toISOString(),
      }
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

  scrieJSON(
    RAPORT_PATH,
    {
      proiect:
        "BAC MATE",

      tip:
        "imagini-scene-v4",

      total:
        rezultate.length,

      create,

      existente,

      erori,

      rezultate,

      publicare: {
        automata:
          false,

        motiv:
          "Generarea vizuală nu înlocuiește verificarea matematică și umană.",
      },

      generatLa:
        new Date().toISOString(),
    }
  );

  titlu(
    "✅ GENERARE IMAGINI TERMINATĂ"
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
    "Imaginile sunt pregătite tehnic, dar conținutul nu este declarat automat verificat matematic."
  );

  console.log("");
}

main().catch((error) => {
  console.error("");
  console.error(
    "=============================================="
  );
  console.error(
    "❌ GENERAREA IMAGINILOR A EȘUAT"
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