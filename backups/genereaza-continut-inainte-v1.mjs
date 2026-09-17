import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const ROOT = process.cwd();

const DIRECTOR_LECTII = path.join(
  ROOT,
  "data",
  "continut",
  "lectii"
);

const ARGUMENTE = process.argv.slice(2);

const validateOnly = ARGUMENTE.includes("--validate-only");
const fortare = ARGUMENTE.includes("--force");

const slugCerut =
  ARGUMENTE.find(
    (argument) => !argument.startsWith("--")
  ) ?? null;

/**
 * Creează directorul lecțiilor dacă nu există.
 */
function asiguraDirectorul() {
  if (!fs.existsSync(DIRECTOR_LECTII)) {
    fs.mkdirSync(DIRECTOR_LECTII, {
      recursive: true,
    });
  }
}

/**
 * Transformă:
 * numere-reale
 *
 * în:
 * continutNumereReale
 */
function numeExportDinSlug(slug) {
  const parti = slug
    .split("-")
    .filter(Boolean);

  return (
    "continut" +
    parti
      .map(
        (parte) =>
          parte.charAt(0).toUpperCase() +
          parte.slice(1)
      )
      .join("")
  );
}

/**
 * Returnează calea fișierului unei lecții.
 */
function fisierPentruSlug(slug) {
  return path.join(
    DIRECTOR_LECTII,
    `${slug}.ts`
  );
}

/**
 * Transformă obiectul lecției într-un fișier TypeScript
 * compatibil cu ContinutLectie.
 */
function textTsPentruLectie(lectie) {
  const numeExport =
    numeExportDinSlug(lectie.slug);

  const obiect = JSON.stringify(
    lectie,
    null,
    2
  );

  return `import type { ContinutLectie } from "../tipuri";

export const ${numeExport}: ContinutLectie = ${obiect};
`;
}

/**
 * Scrie lecția pe disc.
 *
 * Protecție:
 * - dacă fișierul există, generatorul se oprește;
 * - suprascrierea este permisă numai cu --force.
 */
function scrieLectia(lectie) {
  const destinatie =
    fisierPentruSlug(lectie.slug);

  if (
    fs.existsSync(destinatie) &&
    !fortare
  ) {
    console.log();
    console.log(
      "⛔ GENERARE OPRITĂ"
    );

    console.log(
      `Fișierul există deja: ${path.relative(
        ROOT,
        destinatie
      )}`
    );

    console.log();

    console.log(
      "Generatorul BAC MATE nu suprascrie automat conținut existent."
    );

    console.log(
      "Dacă vrei intenționat suprascrierea, comanda trebuie rulată cu --force."
    );

    process.exitCode = 1;

    return false;
  }

  const continut =
    textTsPentruLectie(lectie);

  fs.writeFileSync(
    destinatie,
    continut,
    "utf8"
  );

  console.log();

  console.log(
    `✓ Generat: ${path.relative(
      ROOT,
      destinatie
    )}`
  );

  return true;
}

/**
 * Rulează direct validatorul BAC MATE cu același
 * executabil Node care rulează generatorul.
 *
 * IMPORTANT:
 * Nu mai apelăm npm.cmd prin spawnSync.
 *
 * Motiv:
 * pe Windows combinația respectivă poate produce:
 *
 * spawnSync npm.cmd EINVAL
 *
 * process.execPath evită problema și este
 * independent de Windows / macOS / Linux.
 */
function ruleazaValidatorul() {
  console.log();

  console.log(
    "Rulez automat Content Validator..."
  );

  console.log();

  const validatorPath = path.join(
    ROOT,
    "scripts",
    "verifica-continut.mjs"
  );

  if (!fs.existsSync(validatorPath)) {
    console.error();

    console.error(
      "❌ Validatorul nu există:"
    );

    console.error(
      path.relative(
        ROOT,
        validatorPath
      )
    );

    process.exitCode = 1;

    return false;
  }

  const rezultat = spawnSync(
    process.execPath,
    [validatorPath],
    {
      cwd: ROOT,
      stdio: "inherit",
      windowsHide: true,
    }
  );

  if (rezultat.error) {
    console.error();

    console.error(
      "❌ Validatorul nu a putut fi pornit."
    );

    console.error(
      rezultat.error.message
    );

    process.exitCode = 1;

    return false;
  }

  if (rezultat.signal) {
    console.error();

    console.error(
      `❌ Validatorul a fost întrerupt de semnalul: ${rezultat.signal}`
    );

    process.exitCode = 1;

    return false;
  }

  if (rezultat.status !== 0) {
    console.error();

    console.error(
      `❌ Validatorul s-a încheiat cu codul ${rezultat.status}.`
    );

    console.error(
      "Au fost găsite erori care trebuie rezolvate."
    );

    process.exitCode = 1;

    return false;
  }

  console.log();

  console.log(
    "✅ Content Validator s-a încheiat cu succes."
  );

  return true;
}

/**
 * Verifică dacă generatorul încearcă să acorde
 * automat aprobări care trebuie făcute separat.
 */
function verificaSigurantaLectiei(lectie) {
  if (
    !lectie ||
    typeof lectie !== "object"
  ) {
    console.error(
      "❌ Lecția nu este un obiect valid."
    );

    return false;
  }

  if (!lectie.verificare) {
    console.error(
      "❌ Lecția nu conține metadata de verificare."
    );

    return false;
  }

  if (
    lectie.verificare.status ===
    "publicabil"
  ) {
    console.error();

    console.error(
      "❌ SIGURANȚĂ: generatorul nu are voie să genereze direct conținut cu status publicabil."
    );

    return false;
  }

  const verificariAutomate = [
    {
      nume: "verificatMatematic",
      valoare:
        lectie.verificare
          .verificatMatematic,
    },
    {
      nume: "verificatPrograma",
      valoare:
        lectie.verificare
          .verificatPrograma,
    },
    {
      nume: "verificatExercitii",
      valoare:
        lectie.verificare
          .verificatExercitii,
    },
    {
      nume: "verificatLimbaRomana",
      valoare:
        lectie.verificare
          .verificatLimbaRomana,
    },
  ];

  const verificareInterzisa =
    verificariAutomate.find(
      (verificare) =>
        verificare.valoare === true
    );

  if (verificareInterzisa) {
    console.error();

    console.error(
      `❌ SIGURANȚĂ: generatorul încearcă să seteze automat ${verificareInterzisa.nume}=true.`
    );

    console.error(
      "Generatorul BAC MATE nu poate acorda automat validări de calitate."
    );

    return false;
  }

  return true;
}

/**
 * Registru CONTROLAT.
 *
 * Nu generăm automat 219 de lecții.
 * Fiecare lecție intră aici controlat.
 */
const lectiiPilot = {
  "numere-reale": {
    id: "numere-reale",

    slug: "numere-reale",

    modul: 1,

    numarLectie: 1,

    clasa: "Clasa a IX-a",

    profil: "M_mate-info",

    titlu:
      "Mulțimi de numere și operații cu numere reale",

    subtitlu:
      "Înțelege mulțimile N, Z, Q și R, clasifică numerele corect și recapitulează operațiile de bază cu numere reale.",

    descriere:
      "Lecția prezintă principalele mulțimi de numere folosite în liceu: numere naturale, întregi, raționale, iraționale și reale. Elevul învață relațiile de incluziune dintre aceste mulțimi, clasificarea numerelor și ordinea efectuării operațiilor.",

    nivelPrincipal: "fundament",

    durataEstimataMinute: 25,

    prerechizite: [
      "Operații aritmetice elementare",
      "Fracții",
      "Puteri și radicali elementari",
    ],

    obiective: [
      "Să recunoști mulțimile de numere naturale, întregi, raționale și reale.",
      "Să clasifici corect un număr în una sau mai multe mulțimi numerice.",
      "Să diferențiezi numerele raționale de numerele iraționale.",
      "Să folosești relația de incluziune N ⊂ Z ⊂ Q ⊂ R.",
      "Să efectuezi corect calcule elementare cu numere reale respectând ordinea operațiilor.",
    ],

    termeniCheie: [
      "număr natural",
      "număr întreg",
      "număr rațional",
      "număr irațional",
      "număr real",
      "mulțime",
      "incluziune",
      "fracție",
      "zecimală finită",
      "zecimală periodică",
    ],

    videoLectii: [
      {
        id: "m1-nr-video-1",

        numar: 1,

        titlu:
          "N, Z, Q și R explicate simplu",

        durataMinute: 4,

        descriere:
          "Pornim de la mulțimile numerice cunoscute și înțelegem relația dintre numere naturale, întregi, raționale și reale.",

        scenariu: [
          "În matematică întâlnim multe tipuri de numere, dar ele nu sunt organizate la întâmplare.",
          "Pentru început avem numerele naturale. În această mulțime găsim numerele folosite în mod obișnuit pentru numărare.",
          "În funcție de convenția folosită, mulțimea numerelor naturale poate fi scrisă cu sau fără zero. În această lecție trebuie să urmărim convenția utilizată în materialele BAC MATE.",
          "Următoarea mulțime este mulțimea numerelor întregi, notată cu Z.",
          "Numerele întregi includ numerele naturale, numerele negative corespunzătoare și numărul zero.",
          "De exemplu, minus șapte este număr întreg, zero este număr întreg, iar cinci este număr întreg.",
          "Orice număr natural este și număr întreg.",
          "De aceea putem spune că mulțimea N este inclusă în mulțimea Z.",
          "Mergem mai departe la numerele raționale, notate cu Q.",
          "Un număr rațional este un număr care poate fi scris sub forma unei fracții a supra b, unde a și b sunt numere întregi și b este diferit de zero.",
          "De exemplu, trei pătrimi este număr rațional.",
          "Dar și numărul cinci este rațional, deoarece poate fi scris cinci supra unu.",
          "La fel, minus șapte este rațional, deoarece poate fi scris minus șapte supra unu.",
          "Asta înseamnă că orice număr întreg este și număr rațional.",
          "Prin urmare, Z este inclusă în Q.",
          "Există însă și numere care nu sunt raționale.",
          "Acestea se numesc numere iraționale.",
          "Exemple cunoscute sunt radical din doi și numărul pi.",
          "Ele nu pot fi scrise sub forma unei fracții dintre două numere întregi cu numitor nenul.",
          "Toate numerele raționale și toate numerele iraționale fac parte din mulțimea numerelor reale.",
          "Mulțimea numerelor reale se notează cu R.",
          "Astfel obținem relația foarte importantă N inclus în Z, Z inclus în Q și Q inclus în R.",
          "Putem scrie pe scurt N inclus în Z inclus în Q inclus în R.",
          "Această relație ne ajută să clasificăm rapid numerele.",
          "De exemplu, numărul trei este natural.",
          "Fiind natural, el este automat și întreg.",
          "Fiind întreg, este automat și rațional.",
          "Fiind rațional, este și real.",
          "Numărul minus șapte nu este natural, dar este întreg, rațional și real.",
          "Numărul trei pătrimi nu este întreg, dar este rațional și real.",
          "Radical din doi este irațional, dar este tot număr real.",
          "Atunci când clasifici un număr, încearcă să găsești cea mai mică mulțime importantă din care face parte.",
          "Apoi poți folosi relațiile de incluziune pentru a stabili automat apartenența la mulțimile mai mari.",
          "Reține lanțul N, Z, Q, R. Îl vom folosi pe tot parcursul acestei lecții.",
        ],

        ideiDeRetinut: [
          "N ⊂ Z ⊂ Q ⊂ R.",
          "Orice număr întreg este și rațional.",
          "Numerele iraționale sunt reale, dar nu sunt raționale.",
        ],

        exemplu: {
          titlu: "Exemplu rapid",

          enunt:
            "Clasifică numărul −7.",

          rezolvareScurta: [
            "−7 este număr întreg.",
            "Orice număr întreg este rațional deoarece −7 = −7/1.",
            "Orice număr rațional este real.",
          ],

          raspuns:
            "−7 ∈ Z, −7 ∈ Q și −7 ∈ R.",
        },

        verificareRapida: {
          intrebare:
            "Care relație de incluziune este corectă?",

          variante: [
            "R ⊂ Q ⊂ Z ⊂ N",
            "N ⊂ Z ⊂ Q ⊂ R",
            "Z ⊂ N ⊂ Q ⊂ R",
            "Q ⊂ Z ⊂ N ⊂ R",
          ],

          raspunsCorect: 1,

          explicatie:
            "Numerele naturale sunt incluse în întregi, întregii în raționale, iar raționalele în reale.",
        },
      },

      {
        id: "m1-nr-video-2",

        numar: 2,

        titlu:
          "Rațional sau irațional?",

        durataMinute: 4,

        descriere:
          "Învățăm criteriile simple prin care putem decide dacă un număr este rațional sau irațional.",

        scenariu: [
          "Una dintre cele mai importante clasificări este diferența dintre numere raționale și numere iraționale.",
          "Începem cu definiția numărului rațional.",
          "Un număr este rațional dacă poate fi scris ca o fracție a supra b, unde a și b sunt numere întregi, iar b este diferit de zero.",
          "De exemplu, trei supra patru este rațional chiar din forma în care este scris.",
          "Numărul minus doi este și el rațional, pentru că îl putem scrie minus doi supra unu.",
          "Numărul zero este rațional, deoarece poate fi scris zero supra unu.",
          "Și numerele zecimale finite sunt raționale.",
          "De exemplu, zero virgulă douăzeci și cinci este egal cu douăzeci și cinci supra o sută, adică unu supra patru.",
          "Prin urmare, zero virgulă douăzeci și cinci este rațional.",
          "Zecimalele periodice sunt de asemenea raționale.",
          "De exemplu, zero virgulă trei periodic reprezintă fracția unu supra trei.",
          "Așadar, faptul că o dezvoltare zecimală are foarte multe cifre nu înseamnă automat că numărul este irațional.",
          "Trebuie să observăm dacă dezvoltarea este periodică.",
          "Un număr irațional nu poate fi scris ca raport al două numere întregi cu numitor nenul.",
          "Exemple clasice sunt radical din doi și pi.",
          "Dezvoltările lor zecimale sunt infinite și neperiodice.",
          "Trebuie însă să fim atenți când vedem un radical.",
          "Nu orice număr care conține un radical este irațional.",
          "De exemplu, radical din nouă este egal cu trei.",
          "Iar trei este număr natural, întreg, rațional și real.",
          "La fel, radical din șaisprezece este patru, deci este rațional.",
          "În schimb, radical din doi este irațional.",
          "O strategie bună este să simplifici mai întâi expresia înainte să o clasifici.",
          "Dacă ai o fracție obișnuită dintre două numere întregi și numitorul este nenul, numărul este rațional.",
          "Dacă ai o zecimală finită, numărul este rațional.",
          "Dacă ai o zecimală periodică, numărul este rațional.",
          "Dacă întâlnești un radical, verifică mai întâi dacă valoarea de sub radical este pătrat perfect atunci când lucrezi cu rădăcina pătrată.",
          "Dacă radicalul se simplifică la un număr întreg sau la un număr rațional, rezultatul este rațional.",
          "Dacă nu, în exemplele elementare ale acestei lecții poți ajunge la un număr irațional.",
          "Pi este un alt exemplu important de număr irațional.",
          "Toate numerele iraționale sunt însă numere reale.",
          "Mulțimea numerelor reale conține atât numerele raționale, cât și numerele iraționale.",
          "Când primești un exercițiu de clasificare, nu te grăbi să judeci doar după aspectul numărului.",
          "Simplifică mai întâi și apoi aplică definiția.",
        ],

        ideiDeRetinut: [
          "Fracțiile dintre întregi cu numitor nenul sunt raționale.",
          "Zecimalele finite și zecimalele periodice sunt raționale.",
          "Un radical nu este automat irațional; trebuie mai întâi simplificat.",
        ],

        exemplu: {
          titlu: "Exemplu rapid",

          enunt:
            "Numerele 0,25 și √2 sunt raționale sau iraționale?",

          rezolvareScurta: [
            "0,25 = 25/100 = 1/4, deci este rațional.",
            "√2 nu poate fi scris ca raport al două numere întregi.",
          ],

          raspuns:
            "0,25 este rațional, iar √2 este irațional.",
        },

        verificareRapida: {
          intrebare:
            "Care dintre următoarele numere este irațional?",

          variante: [
            "0,25",
            "−3",
            "7/5",
            "√2",
          ],

          raspunsCorect: 3,

          explicatie:
            "0,25, −3 și 7/5 sunt raționale. √2 este irațional.",
        },
      },

      {
        id: "m1-nr-video-3",

        numar: 3,

        titlu:
          "Cum clasifici corect un număr",

        durataMinute: 4,

        descriere:
          "Aplicăm sistematic relațiile dintre N, Z, Q și R pentru a clasifica diferite tipuri de numere.",

        scenariu: [
          "Acum vom transforma teoria într-o metodă rapidă de clasificare.",
          "Atunci când vezi un număr, primul pas este să îl simplifici dacă este posibil.",
          "După aceea încerci să găsești cea mai mică mulțime numerică importantă din care face parte.",
          "Să luăm numărul cinci.",
          "Cinci este număr natural.",
          "Cum N este inclusă în Z, cinci este și întreg.",
          "Cum Z este inclusă în Q, cinci este și rațional.",
          "Cum Q este inclusă în R, cinci este și real.",
          "Așadar, un singur număr poate aparține simultan mai multor mulțimi.",
          "Acum luăm numărul minus cinci.",
          "El nu este număr natural în convenția obișnuită folosită pentru numerele negative.",
          "Este însă număr întreg.",
          "Prin incluziune, este și rațional și real.",
          "Să analizăm fracția două supra trei.",
          "Ea este rațională prin definiție.",
          "Nu este număr întreg.",
          "Fiind rațională, este automat și număr real.",
          "Acum luăm radical din nouă.",
          "Nu îl clasificăm imediat după faptul că vedem simbolul radical.",
          "Mai întâi calculăm radical din nouă și obținem trei.",
          "Trei este natural, întreg, rațional și real.",
          "Acesta este un exemplu foarte important: forma inițială a expresiei poate induce în eroare.",
          "Să analizăm radical din doi.",
          "Acesta nu se simplifică la un număr rațional.",
          "Este un număr irațional.",
          "Dar este în continuare număr real.",
          "O altă situație este o zecimală finită, de exemplu unu virgulă cinci.",
          "Putem scrie unu virgulă cinci ca cincisprezece supra zece, apoi simplificăm la trei supra doi.",
          "Este deci rațional și real.",
          "Pentru o zecimală periodică, de exemplu zero virgulă trei periodic, rezultatul este tot rațional.",
          "O greșeală frecventă este să alegi o singură mulțime și să consideri că numărul nu mai aparține celorlalte.",
          "Dacă întrebarea cere toate mulțimile din care face parte numărul, trebuie să folosești incluziunile.",
          "Dacă întrebarea cere cea mai mică mulțime dintre N, Z, Q și R, atunci alegi prima mulțime din lanț în care poate fi încadrat.",
          "Pentru minus șapte, cea mai mică dintre aceste patru este Z.",
          "Pentru trei supra patru, cea mai mică este Q.",
          "Pentru radical din doi, dintre aceste mulțimi enumerate, este R, cu precizarea că numărul este irațional.",
          "Metoda poate fi rezumată astfel: simplifică, identifică tipul numărului și apoi folosește incluziunile.",
        ],

        ideiDeRetinut: [
          "Simplifică expresia înainte de clasificare.",
          "Caută mai întâi cea mai mică mulțime potrivită.",
          "Folosește N ⊂ Z ⊂ Q ⊂ R pentru apartenențele suplimentare.",
        ],

        exemplu: {
          titlu: "Exemplu rapid",

          enunt:
            "Clasifică numărul √9.",

          rezolvareScurta: [
            "√9 = 3.",
            "3 este număr natural.",
            "Prin incluziune, 3 este și întreg, rațional și real.",
          ],

          raspuns:
            "√9 = 3 ∈ N, Z, Q și R.",
        },

        verificareRapida: {
          intrebare:
            "Care este cea mai mică mulțime dintre N, Z, Q și R care conține numărul −8?",

          variante: [
            "N",
            "Z",
            "Q",
            "R",
          ],

          raspunsCorect: 1,

          explicatie:
            "−8 este număr întreg. Este și rațional și real, dar dintre mulțimile date, Z este cea mai mică.",
        },
      },

      {
        id: "m1-nr-video-4",

        numar: 4,

        titlu:
          "Calcule cu numere reale și greșeli frecvente",

        durataMinute: 5,

        descriere:
          "Recapitulăm ordinea operațiilor și eliminăm câteva dintre cele mai frecvente greșeli din calculele elementare.",

        scenariu: [
          "Ultima parte a lecției este despre calculele cu numere reale.",
          "Când avem mai multe operații într-o expresie, nu le efectuăm pur și simplu de la stânga la dreapta.",
          "Trebuie să respectăm ordinea operațiilor.",
          "În primul rând rezolvăm ceea ce se află în paranteze.",
          "Apoi calculăm puterile și radicalii care pot fi calculați.",
          "După aceea efectuăm înmulțirile și împărțirile.",
          "La final efectuăm adunările și scăderile.",
          "Operațiile de același rang se efectuează în ordinea în care apar, de la stânga la dreapta.",
          "Să analizăm expresia doi minus trei ori minus patru plus cinci.",
          "Înmulțirea are prioritate față de adunare și scădere.",
          "Calculăm mai întâi trei ori minus patru și obținem minus doisprezece.",
          "Expresia devine doi minus minus doisprezece plus cinci.",
          "Scăderea unui număr negativ devine adunare.",
          "Obținem doi plus doisprezece plus cinci.",
          "Rezultatul final este nouăsprezece.",
          "O greșeală frecventă ar fi să calculăm mai întâi doi minus trei.",
          "Asta ar încălca ordinea operațiilor.",
          "O altă zonă în care apar erori este lucrul cu fracțiile.",
          "La adunarea fracțiilor, numitorii trebuie aduși la un numitor comun.",
          "De exemplu, trei pătrimi plus cinci șesimi.",
          "Cel mai mic multiplu comun al lui patru și șase este doisprezece.",
          "Trei pătrimi devine nouă doisprezecimi.",
          "Cinci șesimi devine zece doisprezecimi.",
          "Suma este nouăsprezece doisprezecimi.",
          "Nu adunăm direct numărătorii și numitorii.",
          "Trei pătrimi plus cinci șesimi nu este opt zecimi.",
          "Și semnele trebuie tratate cu atenție.",
          "Produsul a două numere cu același semn este pozitiv.",
          "Produsul a două numere cu semne diferite este negativ.",
          "La scădere, este util să transformăm scăderea într-o adunare cu opusul atunci când apar multe semne.",
          "De exemplu, cinci minus minus doi devine cinci plus doi.",
          "Un alt lucru important este să simplificăm rezultatul când este posibil.",
          "Dacă obținem o fracție, verificăm dacă numărătorul și numitorul au un divizor comun.",
          "Dacă avem radicali simpli, verificăm dacă putem extrage factori pătrați perfecți.",
          "În exercițiile de bază, precizia vine din respectarea pașilor, nu din viteză.",
          "O strategie sigură este să scrii câte o transformare pe fiecare rând.",
          "Astfel poți verifica mai ușor unde apare o eventuală eroare.",
          "Pentru BAC, calculele elementare greșite pot compromite un exercițiu care, conceptual, este simplu.",
          "De aceea ordinea operațiilor și semnele trebuie automatizate prin exercițiu.",
          "Reține: paranteze, puteri și radicali, înmulțiri și împărțiri, apoi adunări și scăderi.",
        ],

        ideiDeRetinut: [
          "Respectă ordinea operațiilor.",
          "La fracții, folosește numitor comun pentru adunare și scădere.",
          "Fii atent la semnele numerelor negative.",
        ],

        exemplu: {
          titlu: "Exemplu rapid",

          enunt:
            "Calculează 2 − 3 × (−4) + 5.",

          rezolvareScurta: [
            "Calculăm mai întâi înmulțirea: 3 × (−4) = −12.",
            "Obținem 2 − (−12) + 5.",
            "Scăderea unui număr negativ devine adunare.",
            "2 + 12 + 5 = 19.",
          ],

          raspuns: "19",
        },

        verificareRapida: {
          intrebare:
            "Care este primul calcul care trebuie efectuat în expresia 2 + 3 × 4?",

          variante: [
            "2 + 3",
            "3 × 4",
            "2 + 4",
            "Nu contează ordinea",
          ],

          raspunsCorect: 1,

          explicatie:
            "Înmulțirea are prioritate față de adunare.",
        },
      },
    ],

    definitii: [
      {
        termen:
          "Număr natural",

        definitie:
          "Număr care aparține mulțimii N, conform convenției de lucru adoptate pentru mulțimea numerelor naturale.",

        observatie:
          "Convenția privind includerea lui 0 în N trebuie păstrată consecvent în materialele cursului.",
      },

      {
        termen:
          "Număr întreg",

        definitie:
          "Număr care aparține mulțimii Z; această mulțime conține numerele naturale, numerele întregi negative și zero.",
      },

      {
        termen:
          "Număr rațional",

        definitie:
          "Număr care poate fi scris sub forma a/b, unde a și b sunt numere întregi și b ≠ 0.",
      },

      {
        termen:
          "Număr irațional",

        definitie:
          "Număr real care nu este rațional.",
      },

      {
        termen:
          "Număr real",

        definitie:
          "Număr care aparține mulțimii R. Numerele reale includ numerele raționale și numerele iraționale.",
      },
    ],

    teorie: [
      {
        id: "m1-nr-teorie-1",

        titlu:
          "Relația dintre mulțimile numerice",

        explicatie:
          "Mulțimile numerice fundamentale sunt legate prin incluziuni. Orice număr natural este întreg, orice număr întreg este rațional, iar orice număr rațional este real.",

        ideiCheie: [
          "N ⊂ Z",
          "Z ⊂ Q",
          "Q ⊂ R",
          "Prin urmare N ⊂ Z ⊂ Q ⊂ R.",
        ],
      },

      {
        id: "m1-nr-teorie-2",

        titlu:
          "Numere raționale și iraționale",

        explicatie:
          "Numerele raționale se pot scrie sub forma unei fracții de numere întregi cu numitor nenul. Numerele reale care nu au această proprietate sunt iraționale.",

        ideiCheie: [
          "Zecimalele finite sunt raționale.",
          "Zecimalele periodice sunt raționale.",
          "√2 și π sunt exemple de numere iraționale.",
          "Un radical trebuie simplificat înainte de clasificare.",
        ],
      },

      {
        id: "m1-nr-teorie-3",

        titlu:
          "Ordinea operațiilor",

        explicatie:
          "În expresiile numerice, operațiile se efectuează respectând prioritățile matematice.",

        ideiCheie: [
          "Mai întâi parantezele.",
          "Apoi puterile și radicalii.",
          "Apoi înmulțirile și împărțirile.",
          "La final adunările și scăderile.",
        ],
      },
    ],

    formule: [
      {
        id: "m1-nr-formula-1",

        nume:
          "Incluziunea mulțimilor numerice",

        formula:
          "N ⊂ Z ⊂ Q ⊂ R",

        explicatie:
          "Orice număr natural este întreg, orice întreg este rațional, iar orice rațional este real.",
      },

      {
        id: "m1-nr-formula-2",

        nume:
          "Forma unui număr rațional",

        formula:
          "x = a/b, a ∈ Z, b ∈ Z, b ≠ 0",

        explicatie:
          "Un număr este rațional dacă poate fi exprimat ca raport al două numere întregi cu numitor nenul.",
      },
    ],

    exempleRezolvate: [
      {
        id: "m1-nr-exemplu-1",

        titlu:
          "Clasificarea unui număr întreg negativ",

        enunt:
          "Clasifică numărul −7 în mulțimile N, Z, Q și R.",

        nivel:
          "fundament",

        pasi: [
          {
            numar: 1,

            titlu:
              "Verificăm dacă este natural",

            continut:
              "−7 este negativ, deci nu este număr natural.",
          },

          {
            numar: 2,

            titlu:
              "Verificăm dacă este întreg",

            continut:
              "−7 este număr întreg, deci −7 ∈ Z.",
          },

          {
            numar: 3,

            titlu:
              "Folosim incluziunile",

            continut:
              "Din Z ⊂ Q ⊂ R rezultă că −7 este și rațional și real.",
          },
        ],

        raspunsFinal:
          "−7 ∈ Z, Q și R.",

        verificare:
          "−7 = −7/1, deci este rațional.",
      },

      {
        id: "m1-nr-exemplu-2",

        titlu:
          "Clasificarea unui radical",

        enunt:
          "Stabilește dacă √9 este rațional sau irațional.",

        nivel:
          "fundament",

        pasi: [
          {
            numar: 1,

            titlu:
              "Simplificăm radicalul",

            continut:
              "√9 = 3.",
          },

          {
            numar: 2,

            titlu:
              "Clasificăm rezultatul",

            continut:
              "3 este număr natural și, implicit, întreg, rațional și real.",
          },
        ],

        raspunsFinal:
          "√9 este număr rațional.",

        verificare:
          "√9 = 3 = 3/1.",
      },

      {
        id: "m1-nr-exemplu-3",

        titlu:
          "Adunarea a două fracții",

        enunt:
          "Calculează 3/4 + 5/6.",

        nivel:
          "standard-bac",

        pasi: [
          {
            numar: 1,

            titlu:
              "Alegem numitorul comun",

            continut:
              "Cel mai mic multiplu comun al lui 4 și 6 este 12.",
          },

          {
            numar: 2,

            titlu:
              "Aducem fracțiile la același numitor",

            continut:
              "3/4 = 9/12 și 5/6 = 10/12.",
          },

          {
            numar: 3,

            titlu:
              "Adunăm",

            continut:
              "9/12 + 10/12 = 19/12.",
          },
        ],

        raspunsFinal:
          "19/12.",

        verificare:
          "19 și 12 nu au divizor comun mai mare decât 1.",
      },
    ],

    greseliFrecvente: [
      {
        greseala:
          "Elevul consideră că un număr poate aparține unei singure mulțimi numerice.",

        deCeEsteGresit:
          "Mulțimile N, Z, Q și R sunt legate prin incluziuni, deci un număr poate aparține simultan mai multor mulțimi.",

        cumOEviti:
          "Folosește lanțul N ⊂ Z ⊂ Q ⊂ R.",
      },

      {
        greseala:
          "Elevul consideră orice radical drept număr irațional.",

        deCeEsteGresit:
          "Unii radicali se simplifică la numere întregi sau raționale, de exemplu √9 = 3.",

        cumOEviti:
          "Simplifică radicalul înainte să clasifici numărul.",
      },

      {
        greseala:
          "Elevul efectuează operațiile strict de la stânga la dreapta.",

        deCeEsteGresit:
          "Înmulțirea și împărțirea au prioritate față de adunare și scădere.",

        cumOEviti:
          "Respectă ordinea operațiilor la fiecare calcul.",
      },

      {
        greseala:
          "Elevul adună direct numărătorii și numitorii fracțiilor.",

        deCeEsteGresit:
          "La adunarea fracțiilor cu numitori diferiți trebuie folosit un numitor comun.",

        cumOEviti:
          "Adu fracțiile la același numitor înainte de adunare.",
      },
    ],

    exercitii: [
      {
        id: "m1-nr-ex-1",

        nivel:
          "fundament",

        tip:
          "alegere-multipla",

        enunt:
          "Cărei mulțimi îi aparține sigur numărul −7?",

        variante: [
          "N",
          "Z",
          "N, dar nu Z",
          "Niciunei mulțimi numerice",
        ],

        raspunsCorect:
          "Z",

        rezolvare: [
          {
            numar: 1,

            titlu:
              "Observăm semnul",

            continut:
              "−7 este un număr întreg negativ.",
          },

          {
            numar: 2,

            titlu:
              "Alegem mulțimea",

            continut:
              "Numerele întregi aparțin mulțimii Z.",
          },
        ],

        explicatieFinala:
          "−7 ∈ Z. Prin incluziune, este și rațional și real.",

        punctaj: 1,

        competenta:
          "Clasificarea numerelor întregi.",
      },

      {
        id: "m1-nr-ex-2",

        nivel:
          "fundament",

        tip:
          "alegere-multipla",

        enunt:
          "Care dintre următoarele numere este irațional?",

        variante: [
          "0,25",
          "√2",
          "−3",
          "7/5",
        ],

        raspunsCorect:
          "√2",

        rezolvare: [
          {
            numar: 1,

            titlu:
              "Analizăm variantele raționale",

            continut:
              "0,25 = 1/4, −3 = −3/1, iar 7/5 este deja fracție.",
          },

          {
            numar: 2,

            titlu:
              "Identificăm numărul irațional",

            continut:
              "√2 este irațional.",
          },
        ],

        explicatieFinala:
          "√2 este singurul număr irațional dintre variante.",

        punctaj: 1,

        competenta:
          "Diferențierea numerelor raționale și iraționale.",
      },

      {
        id: "m1-nr-ex-3",

        nivel:
          "standard-bac",

        tip:
          "alegere-multipla",

        enunt:
          "Care relație este corectă?",

        variante: [
          "R ⊂ Q ⊂ Z ⊂ N",
          "N ⊂ Z ⊂ Q ⊂ R",
          "Z ⊂ N ⊂ R ⊂ Q",
          "Q ⊂ N ⊂ Z ⊂ R",
        ],

        raspunsCorect:
          "N ⊂ Z ⊂ Q ⊂ R",

        rezolvare: [
          {
            numar: 1,

            titlu:
              "Pornim de la numerele naturale",

            continut:
              "Orice număr natural este întreg.",
          },

          {
            numar: 2,

            titlu:
              "Continuăm incluziunile",

            continut:
              "Orice întreg este rațional, iar orice rațional este real.",
          },
        ],

        explicatieFinala:
          "Relația corectă este N ⊂ Z ⊂ Q ⊂ R.",

        punctaj: 1,

        competenta:
          "Folosirea relațiilor de incluziune.",
      },

      {
        id: "m1-nr-ex-4",

        nivel:
          "standard-bac",

        tip:
          "raspuns-scurt",

        enunt:
          "Calculează 3/4 + 5/6.",

        raspunsCorect:
          "19/12",

        rezolvare: [
          {
            numar: 1,

            titlu:
              "Aducem la numitor comun",

            continut:
              "3/4 = 9/12 și 5/6 = 10/12.",
          },

          {
            numar: 2,

            titlu:
              "Adunăm",

            continut:
              "9/12 + 10/12 = 19/12.",
          },
        ],

        explicatieFinala:
          "Rezultatul este 19/12.",

        punctaj: 1,

        competenta:
          "Calcul cu numere raționale.",
      },

      {
        id: "m1-nr-ex-5",

        nivel:
          "standard-bac",

        tip:
          "raspuns-scurt",

        enunt:
          "Calculează 2 − 3 × (−4) + 5.",

        raspunsCorect:
          "19",

        rezolvare: [
          {
            numar: 1,

            titlu:
              "Calculăm înmulțirea",

            continut:
              "3 × (−4) = −12.",
          },

          {
            numar: 2,

            titlu:
              "Înlocuim în expresie",

            continut:
              "2 − (−12) + 5 = 2 + 12 + 5.",
          },

          {
            numar: 3,

            titlu:
              "Finalizăm calculul",

            continut:
              "2 + 12 + 5 = 19.",
          },
        ],

        explicatieFinala:
          "Respectând ordinea operațiilor obținem 19.",

        punctaj: 1,

        competenta:
          "Respectarea ordinii operațiilor.",
      },

      {
        id: "m1-nr-ex-6",

        nivel:
          "avansat",

        tip:
          "rezolvare-completa",

        enunt:
          "Explică de ce numărul √9 este rațional, deși este scris folosind un radical.",

        raspunsCorect:
          "√9 = 3, iar 3 = 3/1, deci este rațional.",

        rezolvare: [
          {
            numar: 1,

            titlu:
              "Calculăm radicalul",

            continut:
              "√9 = 3.",
          },

          {
            numar: 2,

            titlu:
              "Aplicăm definiția",

            continut:
              "3 poate fi scris 3/1, raport al două numere întregi cu numitor nenul.",
          },

          {
            numar: 3,

            titlu:
              "Concluzionăm",

            continut:
              "Prin urmare √9 este număr rațional.",
          },
        ],

        explicatieFinala:
          "Prezența simbolului radical nu înseamnă automat că numărul este irațional.",

        punctaj: 2,

        competenta:
          "Argumentarea clasificării unui număr.",
      },
    ],

    rezumat: {
      ideiDeRetinut: [
        "N ⊂ Z ⊂ Q ⊂ R.",
        "Un număr rațional se poate scrie sub forma a/b, cu a și b întregi și b ≠ 0.",
        "Zecimalele finite și periodice sunt raționale.",
        "Numerele iraționale sunt reale, dar nu sunt raționale.",
        "Un radical trebuie simplificat înainte de clasificare.",
        "În calcule trebuie respectată ordinea operațiilor.",
      ],

      formuleDeRetinut: [
        "N ⊂ Z ⊂ Q ⊂ R",
        "x = a/b, a,b ∈ Z, b ≠ 0",
      ],

      checklistElev: [
        "Pot diferenția N, Z, Q și R.",
        "Pot clasifica un număr în mulțimile numerice potrivite.",
        "Pot diferenția un număr rațional de unul irațional.",
        "Pot recunoaște o zecimală finită sau periodică drept număr rațional.",
        "Pot simplifica un radical simplu înainte de clasificare.",
        "Pot respecta ordinea operațiilor într-un calcul.",
      ],
    },

    legaturaCuBac: {
      importanta:
        "Mulțimile numerice și calculele cu numere reale reprezintă baza pentru aproape toate capitolele ulterioare de algebră și analiză. Clasificarea corectă, lucrul cu fracții, radicali și semne sunt competențe necesare în numeroase exerciții de Bacalaureat.",

      tipuriCerinte: [
        "Clasificarea unui număr.",
        "Simplificarea expresiilor numerice.",
        "Calcule cu fracții și radicali.",
        "Folosirea proprietăților numerelor reale.",
        "Respectarea ordinii operațiilor.",
      ],

      strategie: [
        "Simplifică expresia înainte să clasifici numărul.",
        "Identifică cea mai mică mulțime numerică potrivită.",
        "Folosește relațiile de incluziune.",
        "Respectă ordinea operațiilor.",
        "Verifică semnele și simplifică rezultatul final.",
      ],
    },

    surse: [
      {
        tip:
          "programa-oficiala",

        titlu:
          "Programa de examen pentru disciplina Matematică — Bacalaureat, profil M_mate-info",

        observatie:
          "Încadrarea exactă și formulările trebuie confirmate în etapa dedicată verificării programei.",
      },

      {
        tip:
          "verificare-interna",

        titlu:
          "BAC MATE — Content Engine V1",

        observatie:
          "Conținut pilot generat controlat și menținut în verificare până la validarea matematică, curriculară, lingvistică și a exercițiilor.",
      },
    ],

    verificare: {
      status:
        "verificare",

      verificatMatematic:
        false,

      verificatPrograma:
        false,

      verificatExercitii:
        false,

      verificatLimbaRomana:
        false,

      observatii: [
        "Lecție pilot pentru BAC MATE Content Generator V1.",
        "Generarea nu reprezintă aprobare matematică sau curriculară.",
        "Validatorul structural este rulat automat după generare.",
        "Lecția nu poate fi considerată publicabilă până când toate cele patru verificări nu sunt confirmate.",
      ],
    },
  },
};

/**
 * Ajutor în terminal.
 */
function afiseazaAjutor() {
  console.log();

  console.log(
    "BAC MATE — CONTENT GENERATOR V1"
  );

  console.log();

  console.log(
    "GENERARE LECȚIE:"
  );

  console.log(
    "  npm.cmd run content:generate -- numere-reale"
  );

  console.log();

  console.log(
    "DOAR VALIDATOR:"
  );

  console.log(
    "  npm.cmd run content:generate -- --validate-only"
  );

  console.log();

  console.log(
    "SUPRASCRIERE INTENȚIONATĂ:"
  );

  console.log(
    "  npm.cmd run content:generate -- numere-reale --force"
  );

  console.log();

  console.log(
    "ATENȚIE:"
  );

  console.log(
    "  --force nu trebuie folosit în mod normal."
  );

  console.log();

  console.log(
    "Lecții disponibile momentan:"
  );

  for (
    const slug of Object.keys(
      lectiiPilot
    )
  ) {
    console.log(
      `  - ${slug}`
    );
  }
}

/**
 * Program principal.
 */
function main() {
  console.log();

  console.log(
    "BAC MATE — CONTENT GENERATOR V1"
  );

  console.log(
    "────────────────────────────────────────────────"
  );

  /**
   * Mod sigur de testare:
   *
   * Nu scrie absolut niciun fișier.
   * Rulează doar validatorul.
   */
  if (validateOnly) {
    console.log();

    console.log(
      "MOD: VALIDARE FĂRĂ GENERARE"
    );

    console.log();

    console.log(
      "Nu va fi creat sau suprascris niciun fișier."
    );

    const valid =
      ruleazaValidatorul();

    if (!valid) {
      return;
    }

    console.log();

    console.log(
      "────────────────────────────────────────────────"
    );

    console.log(
      "✅ TEST AUTOMAT REUȘIT"
    );

    console.log();

    console.log(
      "Generatorul poate porni automat Content Validator pe acest sistem."
    );

    return;
  }

  if (!slugCerut) {
    afiseazaAjutor();

    process.exitCode = 1;

    return;
  }

  const lectie =
    lectiiPilot[slugCerut];

  if (!lectie) {
    console.log();

    console.error(
      `❌ Lecția "${slugCerut}" nu există în registrul controlat al generatorului.`
    );

    afiseazaAjutor();

    process.exitCode = 1;

    return;
  }

  const sigur =
    verificaSigurantaLectiei(
      lectie
    );

  if (!sigur) {
    process.exitCode = 1;

    return;
  }

  asiguraDirectorul();

  console.log();

  console.log(
    `Țintă: ${lectie.slug}`
  );

  console.log(
    `Titlu: ${lectie.titlu}`
  );

  console.log(
    `Status inițial: ${lectie.verificare.status}`
  );

  console.log(
    "Verificări automate de calitate acordate: 0"
  );

  const scris =
    scrieLectia(lectie);

  if (!scris) {
    return;
  }

  const valid =
    ruleazaValidatorul();

  if (!valid) {
    return;
  }

  console.log();

  console.log(
    "────────────────────────────────────────────────"
  );

  console.log(
    "✅ GENERARE FINALIZATĂ"
  );

  console.log();

  console.log(
    `Lecția ${lectie.slug} a fost generată și a trecut validatorul structural.`
  );

  console.log();

  console.log(
    "IMPORTANT:"
  );

  console.log(
    "Aceasta NU înseamnă că lecția este verificată matematic sau publicabilă."
  );

  console.log(
    "Următorul pas este auditul conținutului."
  );
}

main();