import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);

const ROOT = process.cwd();
const SCRIPTS = path.join(ROOT, "scripts");

/*
 * ============================================================
 * ARGUMENTE
 * ============================================================
 */

const areArgument = (nume) => args.includes(nume);

const valoareArgument = (prefix) => {
  const gasit = args.find((arg) =>
    arg.startsWith(`${prefix}=`)
  );

  return gasit
    ? gasit.split("=").slice(1).join("=")
    : null;
};

const doarPregatire =
  areArgument("--doar-pregatire");

const sariGenerare =
  areArgument("--fara-generare");

const sariMedia =
  areArgument("--fara-media");

const sariVerificare =
  areArgument("--fara-verificare");

const doarVideo =
  areArgument("--doar-video");

const force =
  areArgument("--force") ||
  areArgument("--regenereaza");

const all =
  areArgument("--all");

const limit =
  valoareArgument("--limit");

const modul =
  valoareArgument("--modul");

const id =
  valoareArgument("--id");

/*
 * ============================================================
 * VALIDARE ARGUMENTE
 * ============================================================
 */

function valideazaArgumente() {
  const probleme = [];

  const selectii = [
    Boolean(id),
    Boolean(modul),
    Boolean(all),
  ].filter(Boolean).length;

  if (selectii > 1) {
    probleme.push(
      "Folosește o singură selecție: --id, --modul sau --all."
    );
  }

  if (limit !== null) {
    const valoare = Number(limit);

    if (
      !Number.isInteger(valoare) ||
      valoare <= 0
    ) {
      probleme.push(
        "--limit trebuie să fie un număr întreg mai mare decât 0."
      );
    }
  }

  if (modul !== null) {
    const valoare = Number(modul);

    if (
      !Number.isInteger(valoare) ||
      valoare < 1 ||
      valoare > 17
    ) {
      probleme.push(
        "--modul trebuie să fie între 1 și 17."
      );
    }
  }

  if (
    id &&
    !/^m\d+-l\d+-v[1-4]$/i.test(id)
  ) {
    probleme.push(
      `ID mini-video invalid: ${id}`
    );
  }

  /*
   * Protecție:
   * dacă nu s-a ales nimic explicit,
   * lucrăm doar pe etalon.
   *
   * Astfel o comandă tastată accidental
   * nu pornește toate cele 876 de video-uri.
   */
  return probleme;
}

/*
 * ============================================================
 * AFIȘARE
 * ============================================================
 */

function titlu(text) {
  console.log("");
  console.log(
    "============================================================"
  );
  console.log(text);
  console.log(
    "============================================================"
  );
  console.log("");
}

/*
 * ============================================================
 * RULARE SCRIPT
 * ============================================================
 */

function ruleazaScript(
  script,
  argumente = [],
  optional = false
) {
  return new Promise((resolve, reject) => {
    const caleScript =
      path.join(
        SCRIPTS,
        script
      );

    if (
      !fs.existsSync(
        caleScript
      )
    ) {
      if (optional) {
        console.log(
          `⏭️ Nu există încă: scripts\\${script}`
        );

        resolve(false);
        return;
      }

      reject(
        new Error(
          `Nu găsesc scriptul obligatoriu: scripts\\${script}`
        )
      );

      return;
    }

    console.log("");
    console.log(
      "------------------------------------------------------------"
    );

    console.log(
      `▶ ${script}`
    );

    if (
      argumente.length > 0
    ) {
      console.log(
        `   ${argumente.join(" ")}`
      );
    }

    console.log(
      "------------------------------------------------------------"
    );
    console.log("");

    const proces =
      spawn(
        process.execPath,
        [
          caleScript,
          ...argumente,
        ],
        {
          cwd: ROOT,
          stdio: "inherit",
          shell: false,
        }
      );

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
          console.log("");
          console.log(
            `✅ Finalizat: ${script}`
          );

          resolve(true);
          return;
        }

        reject(
          new Error(
            `Scriptul ${script} s-a oprit cu codul ${cod}.`
          )
        );
      }
    );
  });
}

/*
 * ============================================================
 * SELECȚIE
 * ============================================================
 */

function argumenteSelectie() {
  const rezultat = [];

  if (id) {
    rezultat.push(
      `--id=${id}`
    );
  } else if (modul) {
    rezultat.push(
      `--modul=${modul}`
    );
  } else if (all) {
    rezultat.push(
      "--all"
    );
  } else {
    /*
     * Fără selecție explicită:
     * mini-video-ul etalon.
     */
    rezultat.push(
      "--id=m1-l01-v1"
    );
  }

  if (limit) {
    rezultat.push(
      `--limit=${limit}`
    );
  }

  if (force) {
    rezultat.push(
      "--force"
    );
  }

  return rezultat;
}

function descriereSelectie() {
  if (id) {
    return id;
  }

  if (modul) {
    return `modulul ${modul}`;
  }

  if (all) {
    return "TOATE mini-video-urile";
  }

  return "m1-l01-v1 (etalon implicit)";
}

function afiseazaConfiguratia() {
  console.log(
    "CONFIGURAȚIE:"
  );

  console.log(
    `• selecție: ${descriereSelectie()}`
  );

  if (limit) {
    console.log(
      `• limită: ${limit}`
    );
  }

  console.log(
    `• generare conținut: ${
      sariGenerare ||
      doarVideo
        ? "NU"
        : "DA"
    }`
  );

  console.log(
    `• producție media: ${
      sariMedia ||
      doarPregatire
        ? "NU"
        : "DA"
    }`
  );

  console.log(
    `• verificări: ${
      sariVerificare
        ? "NU"
        : "DA"
    }`
  );

  console.log(
    `• regenerare forțată: ${
      force
        ? "DA"
        : "NU"
    }`
  );

  console.log("");
}

/*
 * ============================================================
 * RAPOARTE
 * ============================================================
 */

function afiseazaRapoarte() {
  console.log(
    "Rapoarte:"
  );

  const rapoarte = [
    "data\\continut-video\\raport-generare-ai.json",

    "data\\continut-video\\raport-pregatire-media.json",

    "data\\continut-video\\raport-verificare-lectii.json",

    "data\\continut-video\\raport-voce-v4.json",

    "data\\continut-video\\raport-subtitrari-v4.json",

    "data\\continut-video\\raport-cadre-video-v4.json",

    "data\\continut-video\\raport-imagini-scene-v4.json",

    "data\\continut-video\\raport-media.json",
  ];

  for (
    const raport
    of rapoarte
  ) {
    const cale =
      path.join(
        ROOT,
        raport
      );

    console.log(
      `${
        fs.existsSync(cale)
          ? "✓"
          : "○"
      } ${raport}`
    );
  }

  console.log("");
}

/*
 * ============================================================
 * PAS 1 — CONȚINUT
 * ============================================================
 */

async function pasContinut() {
  if (
    sariGenerare ||
    doarPregatire ||
    doarVideo
  ) {
    console.log(
      "⏭️ Generarea conținutului educațional este omisă."
    );

    return;
  }

  titlu(
    "PASUL 1 — CONȚINUT EDUCAȚIONAL"
  );

  /*
   * Pentru --id păstrăm momentan
   * conținutul existent.
   *
   * Generatorul principal lucrează
   * pe modul / lot / toate lecțiile.
   */
  if (id) {
    console.log(
      "ℹ️ Pentru --id păstrăm conținutul educațional existent."
    );

    return;
  }

  const argumenteGenerare =
    [];

  if (modul) {
    argumenteGenerare.push(
      `--modul=${modul}`
    );
  } else if (all) {
    argumenteGenerare.push(
      "--all"
    );
  } else {
    console.log(
      "ℹ️ Test etalon: nu regenerăm automat conținutul."
    );

    return;
  }

  if (limit) {
    argumenteGenerare.push(
      `--limit=${limit}`
    );
  }

  await ruleazaScript(
    "completeaza-video-content.mjs",
    argumenteGenerare
  );
}

/*
 * ============================================================
 * PAS 2 — PREGĂTIRE MEDIA
 * ============================================================
 */

async function pasPregatireMedia() {
  if (doarVideo) {
    console.log(
      "⏭️ Pregătirea media este omisă în modul --doar-video."
    );

    return;
  }

  titlu(
    "PASUL 2 — PREGĂTIRE MEDIA"
  );

  /*
   * pregateste-media.mjs poate
   * relua fișierele deja existente.
   */
  await ruleazaScript(
    "pregateste-media.mjs"
  );
}

/*
 * ============================================================
 * PAS 3 — CONTROL CONȚINUT
 * ============================================================
 */

async function pasControlContinut() {
  if (
    sariVerificare ||
    doarVideo
  ) {
    console.log(
      "⏭️ Controlul conținutului este omis."
    );

    return;
  }

  titlu(
    "PASUL 3 — CONTROL CONȚINUT"
  );

  /*
   * Nu permitem fabricii să continue
   * dacă verificatorul găsește
   * probleme.
   */
  await ruleazaScript(
    "verifica-lectii-generate.mjs"
  );
}

/*
 * ============================================================
 * PAS 4 — PRODUCȚIE VIDEO
 * ============================================================
 */

async function pasProductieVideo(
  selectie
) {
  if (
    sariMedia ||
    doarPregatire
  ) {
    console.log(
      "⏭️ Producția video este omisă."
    );

    return;
  }

  titlu(
    "PASUL 4 — PRODUCȚIE VIDEO"
  );

  console.log(
    `🎬 Selecție producție: ${descriereSelectie()}`
  );

  if (limit) {
    console.log(
      `🎯 Limită: ${limit} mini-video-uri`
    );
  }

  console.log("");

  /*
   * ========================================================
   * 4.1 VOCE
   * ========================================================
   */

  console.log(
    "🎙️ ETAPA 4.1/5 — VOCE"
  );

  await ruleazaScript(
    "genereaza-voce.mjs",
    selectie
  );

  /*
   * ========================================================
   * 4.2 SUBTITRĂRI
   * ========================================================
   */

  console.log("");
  console.log(
    "💬 ETAPA 4.2/5 — SUBTITRĂRI"
  );

  await ruleazaScript(
    "genereaza-subtitrari.mjs",
    selectie
  );

  /*
   * ========================================================
   * 4.3 CADRE
   * ========================================================
   */

  console.log("");
  console.log(
    "🧠 ETAPA 4.3/5 — CADRE VIDEO"
  );

  await ruleazaScript(
    "genereaza-cadre-video.mjs",
    selectie
  );

  /*
   * ========================================================
   * 4.4 IMAGINI
   * ========================================================
   */

  console.log("");
  console.log(
    "🖼️ ETAPA 4.4/5 — IMAGINI SCENE"
  );

  await ruleazaScript(
    "genereaza-imagini-scene.mjs",
    selectie
  );

  /*
   * ========================================================
   * 4.5 MP4
   * ========================================================
   */

  console.log("");
  console.log(
    "🎞️ ETAPA 4.5/5 — ASAMBLARE MP4"
  );

  await ruleazaScript(
    "asambleaza-video-scene.mjs",
    selectie
  );

  console.log("");
  console.log(
    "✅ Lanțul de producție video a fost parcurs."
  );
}

/*
 * ============================================================
 * PAS 5 — CONTROL MEDIA
 * ============================================================
 */

async function pasControlMedia() {
  if (sariVerificare) {
    console.log(
      "⏭️ Controlul media este omis."
    );

    return;
  }

  titlu(
    "PASUL 5 — CONTROL MEDIA"
  );

  await ruleazaScript(
    "verifica-media.mjs"
  );
}

/*
 * ============================================================
 * MAIN
 * ============================================================
 */

async function main() {
  titlu(
    "🎓 BAC MATE — FABRICA AUTOMATĂ V2"
  );

  const problemeArgumente =
    valideazaArgumente();

  if (
    problemeArgumente.length > 0
  ) {
    console.error(
      "❌ Argumente invalide:"
    );

    for (
      const problema
      of problemeArgumente
    ) {
      console.error(
        `• ${problema}`
      );
    }

    console.log("");

    process.exitCode = 1;
    return;
  }

  afiseazaConfiguratia();

  const selectie =
    argumenteSelectie();

  /*
   * Avertisment vizibil înainte
   * de producția tuturor materialelor.
   *
   * Nu blocăm --all dacă utilizatorul
   * l-a cerut explicit.
   */
  if (
    all &&
    !sariMedia &&
    !doarPregatire
  ) {
    console.log(
      "⚠️ MOD PRODUCȚIE COMPLETĂ ACTIVAT"
    );

    console.log(
      "   Se pot procesa până la 876 de mini-video-uri."
    );

    console.log(
      "   Fișierele valide existente vor fi reutilizate."
    );

    console.log("");
  }

  try {
    /*
     * PASUL 1
     */
    await pasContinut();

    /*
     * PASUL 2
     */
    await pasPregatireMedia();

    /*
     * PASUL 3
     */
    await pasControlContinut();

    /*
     * PASUL 4
     */
    await pasProductieVideo(
      selectie
    );

    /*
     * PASUL 5
     */
    await pasControlMedia();

    /*
     * FINAL
     */
    titlu(
      "✅ PRODUCȚIE TERMINATĂ"
    );

    console.log(
      "Fișierele și rapoartele rămân salvate."
    );

    console.log(
      "Dacă producția este întreruptă, aceeași comandă poate fi reluată."
    );

    console.log("");

    afiseazaRapoarte();

    if (
      id ||
      (!modul &&
        !all)
    ) {
      console.log(
        "✅ Testul pe mini-video a fost terminat."
      );
    } else if (modul) {
      console.log(
        `✅ Lotul pentru modulul ${modul} a fost terminat.`
      );
    } else if (all) {
      console.log(
        "✅ Lotul general a fost terminat."
      );
    }

    console.log("");

    console.log(
      "🔒 Publicarea rămâne separată de producția tehnică."
    );

    console.log(
      "   Un MP4 creat corect nu înseamnă automat conținut matematic aprobat."
    );

    console.log("");
  } catch (error) {
    console.error("");
    console.error(
      "============================================================"
    );

    console.error(
      "❌ PRODUCȚIA S-A OPRIT"
    );

    console.error(
      "============================================================"
    );

    console.error("");

    console.error(
      error instanceof Error
        ? error.message
        : error
    );

    console.error("");

    console.error(
      "IMPORTANT: fișierele deja create rămân salvate."
    );

    console.error(
      "După rezolvarea problemei, aceeași comandă poate fi reluată."
    );

    console.error("");

    process.exitCode = 1;
  }
}

main();