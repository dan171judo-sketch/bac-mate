import fs from "fs";
import path from "path";

/* =========================================================
   BAC MATE - REPARARE XP V2

   Scop:
   - același exercițiu nu mai acordă XP de două ori;
   - nu modificăm baza de date;
   - Supabase rămâne sursa principală pentru XP;
   - facem backup înainte de orice modificare.
   ========================================================= */

const ROOT = process.cwd();

const FISIER = path.join(
  ROOT,
  "components",
  "LectieUniversala.tsx"
);

const BACKUP = path.join(
  ROOT,
  "components",
  "LectieUniversala.tsx.backup-xp-v2"
);

console.log("");
console.log(
  "=============================================="
);
console.log(
  " BAC MATE - REPARARE XP V2"
);
console.log(
  "=============================================="
);
console.log("");

if (!fs.existsSync(FISIER)) {
  console.error(
    "❌ Nu găsesc components/LectieUniversala.tsx"
  );

  process.exit(1);
}

let cod =
  fs.readFileSync(
    FISIER,
    "utf8"
  );

/* =========================================================
   BACKUP
   ========================================================= */

fs.writeFileSync(
  BACKUP,
  cod,
  "utf8"
);

console.log(
  "✅ Backup creat:"
);

console.log(
  "   components/LectieUniversala.tsx.backup-xp-v2"
);

console.log("");

/* =========================================================
   PROTECȚIE
   Dacă scriptul a fost deja aplicat, nu îl aplicăm din nou.
   ========================================================= */

if (
  cod.includes(
    "xpAcordatLaUltimaVerificare"
  ) &&
  cod.includes(
    "xpTintaExercitiu"
  )
) {
  console.log(
    "ℹ️ Repararea XP V2 pare deja aplicată."
  );

  console.log(
    "Nu mai modific nimic."
  );

  process.exit(0);
}

/* =========================================================
   1. Adăugăm starea care spune dacă la ultima verificare
      chiar s-au acordat 10 XP.
   ========================================================= */

const regexXpState =
  /const\s*\[\s*xpLectie\s*,\s*setXpLectie\s*\]\s*=\s*useState\s*\(\s*0\s*\)\s*;/;

const xpStateGasit =
  cod.match(regexXpState);

if (!xpStateGasit) {
  console.error(
    "❌ Nu găsesc starea xpLectie."
  );

  console.error(
    "Nu modific fișierul."
  );

  process.exit(1);
}

cod = cod.replace(
  regexXpState,
  `${xpStateGasit[0]}

  const [
    xpAcordatLaUltimaVerificare,
    setXpAcordatLaUltimaVerificare,
  ] = useState(false);`
);

/* =========================================================
   2. Calculăm XP-ul maxim permis pentru exercițiul curent.

   Exemplu:
   exercițiul 1 -> maximum 10 XP
   exercițiul 2 -> maximum 20 XP
   exercițiul 3 -> maximum 30 XP
   ========================================================= */

const regexXpMaxim =
  /const\s+xpMaxim\s*=\s*lectie\.exercitii\.length\s*\*\s*10\s*;/;

const xpMaximGasit =
  cod.match(regexXpMaxim);

if (!xpMaximGasit) {
  console.error(
    "❌ Nu găsesc xpMaxim."
  );

  console.error(
    "Restabilesc backup-ul."
  );

  fs.writeFileSync(
    FISIER,
    fs.readFileSync(
      BACKUP,
      "utf8"
    ),
    "utf8"
  );

  process.exit(1);
}

cod = cod.replace(
  regexXpMaxim,
  `${xpMaximGasit[0]}

  /*
    XP determinist pe exercițiu.

    Exercițiul 0 -> țintă 10 XP
    Exercițiul 1 -> țintă 20 XP
    Exercițiul 2 -> țintă 30 XP

    Dacă elevul repetă un exercițiu deja creditat,
    XP-ul nu mai crește.
  */
  const xpTintaExercitiu =
    Math.min(
      (exercitiuCurent + 1) * 10,
      xpMaxim
    );`
);

/* =========================================================
   3. Modificăm NUMAI funcția verificaRaspunsul.
   ========================================================= */

const inceputVerificare =
  cod.indexOf(
    "async function verificaRaspunsul()"
  );

const sfarsitVerificare =
  cod.indexOf(
    "function urmatorulExercitiu()",
    inceputVerificare
  );

if (
  inceputVerificare === -1 ||
  sfarsitVerificare === -1
) {
  console.error(
    "❌ Nu găsesc funcția verificaRaspunsul."
  );

  console.error(
    "Restabilesc backup-ul."
  );

  fs.writeFileSync(
    FISIER,
    fs.readFileSync(
      BACKUP,
      "utf8"
    ),
    "utf8"
  );

  process.exit(1);
}

let blocVerificare =
  cod.slice(
    inceputVerificare,
    sfarsitVerificare
  );

/*
  La fiecare verificare pornim cu:
  nu s-a acordat XP nou.
*/

blocVerificare =
  blocVerificare.replace(
    /setVerificat\s*\(\s*true\s*\)\s*;/,
    `setVerificat(true);

    setXpAcordatLaUltimaVerificare(
      false
    );`
  );

/*
  Înlocuim vechiul:

  xpLectie + 10

  cu XP determinist.
*/

const regexCalculXp =
  /const\s+xpNou\s*=\s*Math\.min\s*\(\s*xpLectie\s*\+\s*10\s*,\s*xpMaxim\s*\)\s*;/;

if (
  !regexCalculXp.test(
    blocVerificare
  )
) {
  console.error(
    "❌ Nu găsesc formula veche xpLectie + 10."
  );

  console.error(
    "Restabilesc backup-ul."
  );

  fs.writeFileSync(
    FISIER,
    fs.readFileSync(
      BACKUP,
      "utf8"
    ),
    "utf8"
  );

  process.exit(1);
}

blocVerificare =
  blocVerificare.replace(
    regexCalculXp,
    `const acordaXpNou =
        xpLectie <
        xpTintaExercitiu;

      const xpNou =
        Math.max(
          xpLectie,
          xpTintaExercitiu
        );

      setXpAcordatLaUltimaVerificare(
        acordaXpNou
      );`
  );

cod =
  cod.slice(
    0,
    inceputVerificare
  ) +
  blocVerificare +
  cod.slice(
    sfarsitVerificare
  );

/* =========================================================
   4. Resetăm mesajul XP când trecem la alt exercițiu
      sau încercăm din nou.
   ========================================================= */

const inceputUrmator =
  cod.indexOf(
    "function urmatorulExercitiu()"
  );

const inceputIncearca =
  cod.indexOf(
    "function incearcaDinNou()",
    inceputUrmator
  );

const sfarsitIncearca =
  cod.indexOf(
    "function comutaVideo(",
    inceputIncearca
  );

if (
  inceputUrmator !== -1 &&
  inceputIncearca !== -1 &&
  sfarsitIncearca !== -1
) {
  let blocNavigare =
    cod.slice(
      inceputUrmator,
      sfarsitIncearca
    );

  /*
    Adăugăm reset după fiecare
    setVerificat(false).
  */

  blocNavigare =
    blocNavigare.replace(
      /setVerificat\s*\(\s*false\s*\)\s*;/g,
      `setVerificat(false);

    setXpAcordatLaUltimaVerificare(
      false
    );`
    );

  cod =
    cod.slice(
      0,
      inceputUrmator
    ) +
    blocNavigare +
    cod.slice(
      sfarsitIncearca
    );
}

/* =========================================================
   5. Corectăm mesajul afișat elevului.

   Prima dată:
   ✓ Corect! Ai câștigat 10 XP.

   Dacă repetă:
   ✓ Corect! Exercițiul era deja creditat.
   ========================================================= */

const mesajVechi =
  `? "✓ Corect! Ai câștigat 10 XP."`;

if (
  !cod.includes(
    mesajVechi
  )
) {
  console.error(
    "❌ Nu găsesc mesajul vizual pentru XP."
  );

  console.error(
    "Restabilesc backup-ul."
  );

  fs.writeFileSync(
    FISIER,
    fs.readFileSync(
      BACKUP,
      "utf8"
    ),
    "utf8"
  );

  process.exit(1);
}

cod = cod.replace(
  mesajVechi,
  `? xpAcordatLaUltimaVerificare
                      ? "✓ Corect! Ai câștigat 10 XP."
                      : "✓ Corect! Exercițiul era deja creditat."`
);

/* =========================================================
   6. Salvăm fișierul final.
   ========================================================= */

fs.writeFileSync(
  FISIER,
  cod,
  "utf8"
);

/* =========================================================
   7. VERIFICARE FINALĂ
   ========================================================= */

const final =
  fs.readFileSync(
    FISIER,
    "utf8"
  );

const verificari = [
  {
    nume:
      "stare XP ultimă verificare",
    ok:
      final.includes(
        "xpAcordatLaUltimaVerificare"
      ),
  },
  {
    nume:
      "țintă XP exercițiu",
    ok:
      final.includes(
        "xpTintaExercitiu"
      ),
  },
  {
    nume:
      "formula veche eliminată",
    ok:
      !/xpLectie\s*\+\s*10/.test(
        final
      ),
  },
  {
    nume:
      "mesaj exercițiu deja creditat",
    ok:
      final.includes(
        "Exercițiul era deja creditat."
      ),
  },
];

const toateBune =
  verificari.every(
    (item) =>
      item.ok
  );

console.log(
  "=============================================="
);

if (!toateBune) {
  console.error(
    "❌ Verificarea finală nu a trecut."
  );

  for (
    const verificare of
    verificari
  ) {
    console.log(
      `${
        verificare.ok
          ? "✅"
          : "❌"
      } ${verificare.nume}`
    );
  }

  console.log("");
  console.log(
    "Restabilesc automat backup-ul."
  );

  fs.writeFileSync(
    FISIER,
    fs.readFileSync(
      BACKUP,
      "utf8"
    ),
    "utf8"
  );

  process.exit(1);
}

console.log(
  "✅ LectieUniversala.tsx a fost actualizat."
);

console.log(
  "✅ Același exercițiu nu mai poate crește XP-ul repetat."
);

console.log(
  "✅ XP-ul este determinat de poziția exercițiului."
);

console.log(
  "✅ Supabase continuă să salveze XP-ul lecției."
);

console.log(
  "✅ Mesajul elevului diferențiază XP nou de exercițiu repetat."
);

console.log("");

console.log(
  "Backup:"
);

console.log(
  "components/LectieUniversala.tsx.backup-xp-v2"
);

console.log("");

console.log(
  "Următorul pas: testăm aplicația."
);

console.log("");