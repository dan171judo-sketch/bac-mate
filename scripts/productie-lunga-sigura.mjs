import fs from "fs";
import path from "path";
import { spawn } from "child_process";

const ROOT = process.cwd();

const CONTINUT_DIR = path.join(
  ROOT,
  "data",
  "continut-video"
);

const RAPORT_PATH = path.join(
  CONTINUT_DIR,
  "raport-productie-lunga-sigura.json"
);

const LOG_PATH = path.join(
  CONTINUT_DIR,
  "productie-lunga-sigura.log"
);

// ============================================================
// CONFIGURARE
// ============================================================

// Timp maxim permis unei singure lecții.
// Dacă se blochează, procesul este oprit și trecem mai departe.
const TIMEOUT_LECTIE_MINUTE = 15;

// Mică pauză între lecții ca Ollama să nu fie lovit continuu.
const PAUZA_INTRE_LECTII_MS = 5000;

// ============================================================
// ARGUMENTE
// ============================================================

const args = process.argv.slice(2);

function areArgument(nume) {
  return args.includes(nume);
}

function valoareArgument(prefix) {
  const gasit = args.find((arg) =>
    arg.startsWith(prefix)
  );

  if (!gasit) {
    return null;
  }

  return gasit.substring(prefix.length);
}

const modulCerut =
  Number(valoareArgument("--modul=")) || null;

const limitaCeruta =
  Number(valoareArgument("--limit=")) || null;

const idCerut =
  valoareArgument("--id=") || null;

const reincearcaErorile =
  areArgument("--retry-errors");

// ============================================================
// UTILITARE
// ============================================================

function timestamp() {
  return new Date().toISOString();
}

function log(text) {
  const linie =
    `[${timestamp()}] ${text}`;

  console.log(linie);

  fs.appendFileSync(
    LOG_PATH,
    linie + "\n",
    "utf8"
  );
}

function sleep(ms) {
  return new Promise((resolve) =>
    setTimeout(resolve, ms)
  );
}

function citesteJsonSafe(filePath) {
  try {
    return JSON.parse(
      fs.readFileSync(filePath, "utf8")
    );
  } catch {
    return null;
  }
}

function salveazaRaport(raport) {
  raport.actualizatLa = timestamp();

  fs.writeFileSync(
    RAPORT_PATH,
    JSON.stringify(raport, null, 2),
    "utf8"
  );
}

// ============================================================
// RAPORT
// ============================================================

function raportInitial() {
  return {
    versiune:
      "bac-mate-productie-lunga-sigura-v1",

    inceputLa:
      timestamp(),

    actualizatLa:
      timestamp(),

    timeoutLectieMinute:
      TIMEOUT_LECTIE_MINUTE,

    rezultate: {},
  };
}

let raport =
  citesteJsonSafe(RAPORT_PATH) ||
  raportInitial();

if (!raport.rezultate) {
  raport.rezultate = {};
}

// ============================================================
// GĂSIRE AUTOMATĂ LECȚII
// ============================================================

function extrageNumarModul(folderName) {
  const match =
    folderName.match(/^modul-(\d+)$/i);

  if (!match) {
    return null;
  }

  return Number(match[1]);
}

function extrageNumarLectie(fileName) {
  const match =
    fileName.match(/^lectia-(\d+)\.json$/i);

  if (!match) {
    return null;
  }

  return Number(match[1]);
}

function construiesteId(
  numarModul,
  numarLectie
) {
  return `m${numarModul}-l${String(
    numarLectie
  ).padStart(2, "0")}`;
}

function gasesteLectii() {
  if (!fs.existsSync(CONTINUT_DIR)) {
    throw new Error(
      `Nu există folderul: ${CONTINUT_DIR}`
    );
  }

  const lectii = [];

  const moduleFolders =
    fs
      .readdirSync(
        CONTINUT_DIR,
        {
          withFileTypes: true,
        }
      )
      .filter(
        (entry) =>
          entry.isDirectory() &&
          /^modul-\d+$/i.test(entry.name)
      )
      .sort((a, b) => {
        return (
          extrageNumarModul(a.name) -
          extrageNumarModul(b.name)
        );
      });

  for (const folder of moduleFolders) {
    const numarModul =
      extrageNumarModul(folder.name);

    if (
      modulCerut &&
      numarModul !== modulCerut
    ) {
      continue;
    }

    const folderPath =
      path.join(
        CONTINUT_DIR,
        folder.name
      );

    const fisiere =
      fs
        .readdirSync(folderPath)
        .filter((file) =>
          /^lectia-\d+\.json$/i.test(file)
        )
        .sort((a, b) => {
          return (
            extrageNumarLectie(a) -
            extrageNumarLectie(b)
          );
        });

    for (const file of fisiere) {
      const numarLectie =
        extrageNumarLectie(file);

      const filePath =
        path.join(
          folderPath,
          file
        );

      const json =
        citesteJsonSafe(filePath);

      let id =
        json?.id ||
        json?.lessonId ||
        json?.lectieId ||
        construiesteId(
          numarModul,
          numarLectie
        );

      if (idCerut && id !== idCerut) {
        continue;
      }

      lectii.push({
        id,
        modul: numarModul,
        lectie: numarLectie,
        filePath,
      });
    }
  }

  if (limitaCeruta) {
    return lectii.slice(
      0,
      limitaCeruta
    );
  }

  return lectii;
}

// ============================================================
// EXECUTARE PROCES
// ============================================================

function ruleazaGenerator(lectie) {
  return new Promise((resolve) => {
    const start = Date.now();

    const script =
      path.join(
        ROOT,
        "scripts",
        "completeaza-video-content.mjs"
      );

    const child = spawn(
      process.execPath,
      [
        script,
        `--id=${lectie.id}`,
      ],
      {
        cwd: ROOT,
        stdio: [
          "ignore",
          "pipe",
          "pipe",
        ],
        windowsHide: true,
      }
    );

    let output = "";

    const timer = setTimeout(() => {
      output +=
        "\n[TIMEOUT SUPRAVEGHETOR]\n";

      try {
        child.kill();
      } catch {}

      setTimeout(() => {
        try {
          spawn(
            "taskkill",
            [
              "/pid",
              String(child.pid),
              "/T",
              "/F",
            ],
            {
              windowsHide: true,
            }
          );
        } catch {}
      }, 2000);
    },
    TIMEOUT_LECTIE_MINUTE *
      60 *
      1000);

    child.stdout.on(
      "data",
      (data) => {
        const text =
          data.toString();

        process.stdout.write(text);

        output += text;
      }
    );

    child.stderr.on(
      "data",
      (data) => {
        const text =
          data.toString();

        process.stderr.write(text);

        output += text;
      }
    );

    child.on(
      "error",
      (error) => {
        clearTimeout(timer);

        resolve({
          succes: false,
          timeout: false,
          durataSecunde:
            Math.round(
              (Date.now() - start) /
                1000
            ),
          output,
          eroare:
            error.message,
        });
      }
    );

    child.on(
      "close",
      (code) => {
        clearTimeout(timer);

        const durataSecunde =
          Math.round(
            (Date.now() - start) /
              1000
          );

        const timeout =
          output.includes(
            "[TIMEOUT SUPRAVEGHETOR]"
          );

        resolve({
          succes:
            code === 0 &&
            !timeout,

          timeout,

          code,

          durataSecunde,

          output,
        });
      }
    );
  });
}

// ============================================================
// DETECTARE REZULTAT
// ============================================================

function interpreteazaRezultat(
  rezultat
) {
  const text =
    rezultat.output || "";

  if (rezultat.timeout) {
    return "timeout";
  }

  if (
    /eroare-tehnica/i.test(text) ||
    /erori tehnice:\s*[1-9]/i.test(text)
  ) {
    return "eroare";
  }

  if (
    /erori tehnice:\s*0/i.test(text)
  ) {
    return "finalizat";
  }

  if (
    rezultat.succes
  ) {
    return "terminat-neconfirmat";
  }

  return "eroare";
}

// ============================================================
// MAIN
// ============================================================

async function main() {
  console.log("");
  console.log(
    "========================================"
  );
  console.log(
    " BAC MATE - PRODUCȚIE LUNGĂ SIGURĂ"
  );
  console.log(
    "========================================"
  );
  console.log("");

  const lectii =
    gasesteLectii();

  if (!lectii.length) {
    console.log(
      "Nu am găsit lecții pentru criteriile cerute."
    );
    return;
  }

  log(
    `Lecții selectate: ${lectii.length}`
  );

  log(
    `Timeout maxim / lecție: ${TIMEOUT_LECTIE_MINUTE} minute`
  );

  let procesateAcum = 0;
  let sarite = 0;
  let finalizate = 0;
  let erori = 0;
  let timeouturi = 0;

  for (
    let index = 0;
    index < lectii.length;
    index++
  ) {
    const lectie =
      lectii[index];

    const anterior =
      raport.rezultate[
        lectie.id
      ];

    const esteDejaBuna =
      anterior?.status ===
        "finalizat";

    const esteEroareVeche =
      anterior?.status ===
        "eroare" ||
      anterior?.status ===
        "timeout";

    if (esteDejaBuna) {
      sarite++;

      log(
        `[${index + 1}/${lectii.length}] ${lectie.id} - deja finalizată, sar peste.`
      );

      continue;
    }

    if (
      esteEroareVeche &&
      !reincearcaErorile
    ) {
      sarite++;

      log(
        `[${index + 1}/${lectii.length}] ${lectie.id} - are eroare veche; sar peste. Folosește --retry-errors pentru reluare.`
      );

      continue;
    }

    procesateAcum++;

    log(
      `[${index + 1}/${lectii.length}] PORNESC ${lectie.id}`
    );

    raport.rezultate[
      lectie.id
    ] = {
      status:
        "in-lucru",

      inceputLa:
        timestamp(),

      modul:
        lectie.modul,

      lectie:
        lectie.lectie,
    };

    salveazaRaport(
      raport
    );

    const rezultat =
      await ruleazaGenerator(
        lectie
      );

    const status =
      interpreteazaRezultat(
        rezultat
      );

    raport.rezultate[
      lectie.id
    ] = {
      status,

      terminatLa:
        timestamp(),

      durataSecunde:
        rezultat.durataSecunde,

      exitCode:
        rezultat.code ??
        null,

      modul:
        lectie.modul,

      lectie:
        lectie.lectie,
    };

    salveazaRaport(
      raport
    );

    if (
      status === "finalizat"
    ) {
      finalizate++;

      log(
        `${lectie.id} - FINALIZAT în ${rezultat.durataSecunde}s`
      );
    } else if (
      status === "timeout"
    ) {
      timeouturi++;

      log(
        `${lectie.id} - TIMEOUT. Continui cu următoarea lecție.`
      );
    } else {
      erori++;

      log(
        `${lectie.id} - ${status}. Continui cu următoarea lecție.`
      );
    }

    if (
      index <
      lectii.length - 1
    ) {
      await sleep(
        PAUZA_INTRE_LECTII_MS
      );
    }
  }

  raport.ultimaRulare = {
    terminatLa:
      timestamp(),

    lectiiSelectate:
      lectii.length,

    procesateAcum,

    sarite,

    finalizate,

    erori,

    timeouturi,
  };

  salveazaRaport(
    raport
  );

  console.log("");
  console.log(
    "========================================"
  );
  console.log(
    " LOT TERMINAT"
  );
  console.log(
    "========================================"
  );

  console.log(
    `Procesate acum: ${procesateAcum}`
  );

  console.log(
    `Finalizate: ${finalizate}`
  );

  console.log(
    `Erori: ${erori}`
  );

  console.log(
    `Timeout: ${timeouturi}`
  );

  console.log(
    `Sărite: ${sarite}`
  );

  console.log("");
  console.log(
    `Raport: ${RAPORT_PATH}`
  );

  console.log(
    `Log: ${LOG_PATH}`
  );

  console.log("");
}

main().catch((error) => {
  console.error("");
  console.error(
    "EROARE FATALĂ:"
  );

  console.error(
    error
  );

  process.exitCode = 1;
});