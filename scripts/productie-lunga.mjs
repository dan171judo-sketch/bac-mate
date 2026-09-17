import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, "..");

const DATA_DIR = path.join(
  ROOT,
  "data",
  "continut-video"
);

const LOG_FILE = path.join(
  DATA_DIR,
  "productie-lunga.log"
);

const STATE_FILE = path.join(
  DATA_DIR,
  "productie-lunga-state.json"
);

const NUMAR_MODULE = 17;

/*
  Numărul de treceri complete prin toate modulele.

  Prima trecere:
  - încearcă tot

  A doua și a treia:
  - lecțiile deja bune sunt sărite
  - sunt reluate cele care au eșuat
*/
const NUMAR_TRECERI = 3;

/*
  Pauză între module.
  Ajută Ollama și calculatorul să respire puțin.
*/
const PAUZA_INTRE_MODULE_MS = 15_000;

/*
  Pauză după o eroare.
*/
const PAUZA_DUPA_EROARE_MS = 30_000;

fs.mkdirSync(DATA_DIR, {
  recursive: true,
});

function dataOra() {
  return new Date().toLocaleString("ro-RO");
}

function log(mesaj = "") {
  const linie =
    `[${dataOra()}] ${mesaj}`;

  console.log(linie);

  fs.appendFileSync(
    LOG_FILE,
    linie + "\n",
    "utf8"
  );
}

function salveazaStare(stare) {
  fs.writeFileSync(
    STATE_FILE,
    JSON.stringify(
      {
        ...stare,
        actualizatLa:
          new Date().toISOString(),
      },
      null,
      2
    ),
    "utf8"
  );
}

function asteapta(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function ruleazaScript(
  script,
  argumente = []
) {
  return new Promise((resolve) => {
    const caleScript =
      path.join(
        ROOT,
        "scripts",
        script
      );

    log("");
    log(
      `Pornesc: node ${script} ${argumente.join(" ")}`
    );

    const copil = spawn(
      process.execPath,
      [
        caleScript,
        ...argumente,
      ],
      {
        cwd: ROOT,
        stdio: "inherit",
        windowsHide: false,
      }
    );

    copil.on(
      "error",
      (error) => {
        log(
          `EROARE la pornirea ${script}: ${error.message}`
        );

        resolve({
          ok: false,
          cod: -1,
          eroare:
            error.message,
        });
      }
    );

    copil.on(
      "close",
      (cod) => {
        const ok = cod === 0;

        if (ok) {
          log(
            `Terminat cu succes: ${script}`
          );
        } else {
          log(
            `Scriptul ${script} s-a închis cu cod ${cod}. Continuăm.`
          );
        }

        resolve({
          ok,
          cod,
        });
      }
    );
  });
}

let opritManual = false;

process.on(
  "SIGINT",
  () => {
    opritManual = true;

    log("");
    log(
      "Oprire manuală cerută. Starea este păstrată."
    );

    process.exit(0);
  }
);

async function proceseazaModul(
  modul,
  trecere
) {
  log("");
  log(
    "=================================================="
  );

  log(
    `TRECERE ${trecere}/${NUMAR_TRECERI} | MODUL ${modul}/${NUMAR_MODULE}`
  );

  log(
    "=================================================="
  );

  salveazaStare({
    status: "ruleaza",
    trecere,
    modul,
    etapa:
      "generare-continut",
  });

  /*
    ETAPA 1
    Generare / completare conținut AI.

    Scriptul existent trebuie să sară
    lecțiile deja acceptate.
  */
  const generare =
    await ruleazaScript(
      "completeaza-video-content.mjs",
      [
        `--modul=${modul}`,
      ]
    );

  if (!generare.ok) {
    log(
      `Modul ${modul}: generarea nu s-a terminat perfect.`
    );

    log(
      "Nu oprim fabrica. Continuăm cu materialele care există deja."
    );

    await asteapta(
      PAUZA_DUPA_EROARE_MS
    );
  }

  if (opritManual) {
    return;
  }

  salveazaStare({
    status: "ruleaza",
    trecere,
    modul,
    etapa:
      "productie-media",
  });

  /*
    ETAPA 2
    Voce + subtitrări + cadre + imagini + MP4.

    --fara-generare deoarece generarea AI
    tocmai a fost făcută separat mai sus.
  */
  const productie =
    await ruleazaScript(
      "ruleaza-productie-lectii.mjs",
      [
        `--modul=${modul}`,
        "--fara-generare",
      ]
    );

  if (!productie.ok) {
    log(
      `Modul ${modul}: producția media a avut probleme.`
    );

    log(
      "Continuăm cu următorul modul și revenim la următoarea trecere."
    );

    await asteapta(
      PAUZA_DUPA_EROARE_MS
    );
  }

  salveazaStare({
    status:
      "modul-terminat",
    trecere,
    modul,
    generareOk:
      generare.ok,
    productieOk:
      productie.ok,
  });

  log(
    `Modul ${modul} terminat pentru trecerea ${trecere}.`
  );

  if (
    modul < NUMAR_MODULE
  ) {
    log(
      `Pauză ${PAUZA_INTRE_MODULE_MS / 1000} secunde...`
    );

    await asteapta(
      PAUZA_INTRE_MODULE_MS
    );
  }
}

async function main() {
  log("");
  log(
    "##################################################"
  );

  log(
    "BAC MATE — FABRICĂ AUTOMATĂ PE TERMEN LUNG"
  );

  log(
    "##################################################"
  );

  log(
    `Module: ${NUMAR_MODULE}`
  );

  log(
    `Treceri automate: ${NUMAR_TRECERI}`
  );

  log(
    "Erorile unui modul NU vor opri întreaga producție."
  );

  log(
    "Conținutul deja finalizat va fi sărit de scripturile existente."
  );

  salveazaStare({
    status:
      "pornit",
    trecere: 1,
    modul: 1,
  });

  for (
    let trecere = 1;
    trecere <= NUMAR_TRECERI;
    trecere++
  ) {
    log("");
    log(
      `******** ÎNCEPE TRECEREA ${trecere}/${NUMAR_TRECERI} ********`
    );

    for (
      let modul = 1;
      modul <= NUMAR_MODULE;
      modul++
    ) {
      if (opritManual) {
        return;
      }

      await proceseazaModul(
        modul,
        trecere
      );
    }

    log("");
    log(
      `******** TRECEREA ${trecere} TERMINATĂ ********`
    );
  }

  salveazaStare({
    status:
      "terminat",
    trecere:
      NUMAR_TRECERI,
    modul:
      NUMAR_MODULE,
  });

  log("");
  log(
    "##################################################"
  );

  log(
    "TOATE TRECERILE AU FOST TERMINATE."
  );

  log(
    "Verifică rapoartele înainte de publicare."
  );

  log(
    "##################################################"
  );
}

main().catch(
  (error) => {
    log("");
    log(
      `EROARE FATALĂ: ${error?.stack || error}`
    );

    salveazaStare({
      status:
        "eroare-fatala",
      eroare:
        String(
          error?.stack ||
            error
        ),
    });

    process.exitCode = 1;
  }
);