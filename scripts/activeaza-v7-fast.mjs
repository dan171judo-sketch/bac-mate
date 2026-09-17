import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, "..");

const TARGET = path.join(
  ROOT,
  "scripts",
  "completeaza-video-content.mjs"
);

const BACKUP = path.join(
  ROOT,
  "scripts",
  "completeaza-video-content-v6-backup.mjs"
);

function stop(mesaj) {
  console.error("");
  console.error("❌ " + mesaj);
  console.error("");
  process.exit(1);
}

if (!fs.existsSync(TARGET)) {
  stop(
    "Nu găsesc scripts\\completeaza-video-content.mjs"
  );
}

let cod = fs.readFileSync(
  TARGET,
  "utf8"
);

console.log("");
console.log(
  "=============================================="
);
console.log(
  "BAC MATE — ACTIVARE V7 FAST"
);
console.log(
  "=============================================="
);
console.log("");

if (!fs.existsSync(BACKUP)) {
  fs.copyFileSync(
    TARGET,
    BACKUP
  );

  console.log(
    "✅ Backup V6 creat:"
  );
  console.log(
    "   scripts\\completeaza-video-content-v6-backup.mjs"
  );
} else {
  console.log(
    "ℹ️ Backup-ul V6 există deja. Nu îl suprascriu."
  );
}

/*
 * 1. MODEL
 *
 * Dacă fișierul are qwen3:8b scris direct,
 * îl schimbăm în qwen3:4b.
 *
 * Dacă modelul vine din .env.local,
 * rămâne qwen3:4b setat acolo de noi.
 */

cod = cod.replace(
  /qwen3:8b/g,
  "qwen3:4b"
);

/*
 * 2. CONTEXT
 *
 * 16384 / 8192 sunt prea grele pentru
 * producția locală pe sute de videoclipuri.
 */

cod = cod.replace(
  /num_ctx\s*:\s*16384/g,
  "num_ctx: 4096"
);

cod = cod.replace(
  /num_ctx\s*:\s*8192/g,
  "num_ctx: 4096"
);

/*
 * 3. LIMITĂ GENERARE
 *
 * Reducem răspunsurile exagerat de lungi.
 *
 * 1400 tokeni este suficient pentru un
 * scenariu compact, iar procesarea este
 * mai ușoară decât la 1800+.
 */

cod = cod.replace(
  /num_predict\s*:\s*1800/g,
  "num_predict: 1400"
);

cod = cod.replace(
  /num_predict\s*:\s*2400/g,
  "num_predict: 1400"
);

cod = cod.replace(
  /num_predict\s*:\s*3000/g,
  "num_predict: 1400"
);

/*
 * Dacă există options Ollama fără
 * num_predict, nu încercăm să reconstruim
 * obiectul automat. Este mai sigur să
 * păstrăm structura existentă.
 */

/*
 * 4. KEEP ALIVE
 *
 * Modelul rămâne încărcat în memorie,
 * astfel încât să nu fie reîncărcat
 * pentru fiecare video.
 */

cod = cod.replace(
  /keep_alive\s*:\s*["'][^"']+["']/g,
  'keep_alive: "60m"'
);

/*
 * 5. MAXIMUM 1 AJUSTARE DE DURATĂ
 *
 * V6 avea bucle de forma:
 *
 * for (... < 3 ...)
 * for (... <= 3 ...)
 *
 * Nu atingem toate buclele din program.
 * Modificăm doar aparițiile apropiate de
 * logica ajustării duratei.
 */

const linii = cod.split(/\r?\n/);

let inZonaAjustare = false;
let nivelAcolade = 0;
let modificariAjustare = 0;

for (
  let i = 0;
  i < linii.length;
  i++
) {
  const linie = linii[i];

  if (
    linie.includes(
      "async function ajusteazaDurataVideo"
    ) ||
    linie.includes(
      "function ajusteazaDurataVideo"
    )
  ) {
    inZonaAjustare = true;
    nivelAcolade = 0;
  }

  if (inZonaAjustare) {
    const deschise =
      (linie.match(/{/g) || []).length;

    const inchise =
      (linie.match(/}/g) || []).length;

    nivelAcolade +=
      deschise - inchise;

    /*
     * Reducem doar buclele de retry din
     * funcția de ajustare.
     */

    if (
      /\b(?:incercare|attempt|retry)\b/i.test(
        linie
      ) &&
      /<\s*3|<=\s*3/.test(
        linie
      )
    ) {
      linii[i] = linie
        .replace(
          /<\s*3/g,
          "< 1"
        )
        .replace(
          /<=\s*3/g,
          "<= 1"
        );

      modificariAjustare++;
    }

    /*
     * Unele versiuni folosesc:
     * for (let i = 0; i < 3; i++)
     * fără numele "incercare".
     *
     * În funcția ajusteazaDurataVideo putem
     * reduce în siguranță bucla de 3 la 1.
     */

    if (
      /\bfor\s*\(/.test(linie) &&
      /<\s*3/.test(linie)
    ) {
      linii[i] =
        linii[i].replace(
          /<\s*3/g,
          "< 1"
        );

      modificariAjustare++;
    }

    if (
      nivelAcolade <= 0 &&
      i > 0
    ) {
      inZonaAjustare = false;
    }
  }
}

cod = linii.join("\n");

/*
 * 6. MAXIMUM 2 ÎNCERCĂRI GENERARE
 *
 * Nu vrem 3 regenerări complete.
 *
 * Înlocuim numai textele/buclele care
 * indică explicit 3 încercări.
 */

cod = cod.replace(
  /incercare\s*<=\s*3/gi,
  "incercare <= 2"
);

cod = cod.replace(
  /incercare\s*<\s*3/gi,
  "incercare < 2"
);

cod = cod.replace(
  /attempt\s*<=\s*3/gi,
  "attempt <= 2"
);

cod = cod.replace(
  /attempt\s*<\s*3/gi,
  "attempt < 2"
);

/*
 * 7. Marcaj versiune
 */

cod = cod.replace(
  /bac-mate-video-grounded-v6/g,
  "bac-mate-video-grounded-v7-fast"
);

cod = cod.replace(
  /BAC MATE VIDEO V6/g,
  "BAC MATE VIDEO V7 FAST"
);

/*
 * 8. Comentariu identificare
 */

if (
  !cod.includes(
    "BAC_MATE_V7_FAST_ACTIVE"
  )
) {
  cod =
`/*
 * BAC_MATE_V7_FAST_ACTIVE
 *
 * Mod rapid pentru producție locală:
 * - qwen3:4b
 * - context redus
 * - output limitat
 * - mai puține retry-uri
 * - backup automat V6
 */
` + cod;
}

/*
 * 9. Verificări de siguranță
 */

if (
  cod.includes(
    "num_ctx: 16384"
  )
) {
  stop(
    "A rămas cel puțin un num_ctx: 16384. Nu modific fișierul."
  );
}

if (
  cod.includes(
    "num_ctx: 8192"
  )
) {
  stop(
    "A rămas cel puțin un num_ctx: 8192. Nu modific fișierul."
  );
}

/*
 * 10. Scriere V7 FAST
 */

fs.writeFileSync(
  TARGET,
  cod,
  "utf8"
);

console.log("");
console.log(
  "✅ V7 FAST a fost activat."
);

console.log("");
console.log(
  "Setări:"
);
console.log(
  "   Model: qwen3:4b"
);
console.log(
  "   Context Ollama: 4096"
);
console.log(
  "   num_predict: max. 1400 unde era configurat"
);
console.log(
  "   Ajustări durată: reduse"
);
console.log(
  "   Retry-uri: reduse"
);
console.log(
  "   V6 original: păstrat în backup"
);

console.log("");

if (
  modificariAjustare === 0
) {
  console.log(
    "⚠️ Nu am detectat o buclă explicită de 3 în ajusteazaDurataVideo."
  );
  console.log(
    "   Nu este fatal; restul optimizărilor au fost aplicate."
  );
} else {
  console.log(
    `✅ Optimizări ajustare durată: ${modificariAjustare}`
  );
}

console.log("");
console.log(
  "=============================================="
);
console.log(
  "URMĂTORUL PAS:"
);
console.log(
  "node .\\scripts\\completeaza-video-content.mjs --id=m1-l08"
);
console.log(
  "=============================================="
);
console.log("");