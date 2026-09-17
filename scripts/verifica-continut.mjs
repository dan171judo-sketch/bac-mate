import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import ts from "typescript";

const ROOT = process.cwd();

const DIRECTOR_LECTII = path.join(
  ROOT,
  "data",
  "continut",
  "lectii"
);

const STATUSURI_PERMISE = new Set([
  "draft",
  "verificare",
  "verificat",
  "publicabil",
]);

const NIVELURI_PERMISE = new Set([
  "fundament",
  "standard-bac",
  "avansat",
]);

const TIPURI_EXERCITII_PERMISE = new Set([
  "alegere-multipla",
  "raspuns-scurt",
  "rezolvare-completa",
]);

const REZULTATE = {
  lectiiAnalizate: 0,
  lectiiFaraErori: 0,
  lectiiCuErori: 0,
  totalErori: 0,
  totalAvertismente: 0,
  totalVideo: 0,
  totalExercitii: 0,
};

function textValid(valoare) {
  return (
    typeof valoare === "string" &&
    valoare.trim().length > 0
  );
}

function arrayValid(valoare) {
  return Array.isArray(valoare);
}

function arrayCuText(valoare, minim = 1) {
  return (
    Array.isArray(valoare) &&
    valoare.length >= minim &&
    valoare.every((item) => textValid(item))
  );
}

function numarValid(valoare) {
  return (
    typeof valoare === "number" &&
    Number.isFinite(valoare)
  );
}

function cuvinteDinText(text) {
  if (!textValid(text)) {
    return 0;
  }

  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function numaraCuvinteScenariu(scenariu) {
  if (!Array.isArray(scenariu)) {
    return 0;
  }

  return scenariu.reduce(
    (total, fragment) =>
      total + cuvinteDinText(fragment),
    0
  );
}

function continePlaceholder(text) {
  if (!textValid(text)) {
    return false;
  }

  const normalizat = text.toLowerCase();

  const expresii = [
    "todo",
    "tbd",
    "placeholder",
    "de completat",
    "urmează completarea",
    "urmeaza completarea",
    "lorem ipsum",
  ];

  return expresii.some((expresie) =>
    normalizat.includes(expresie)
  );
}

function toateTexteleDinObiect(
  valoare,
  rezultate = []
) {
  if (typeof valoare === "string") {
    rezultate.push(valoare);
    return rezultate;
  }

  if (Array.isArray(valoare)) {
    for (const element of valoare) {
      toateTexteleDinObiect(
        element,
        rezultate
      );
    }

    return rezultate;
  }

  if (
    valoare &&
    typeof valoare === "object"
  ) {
    for (const element of Object.values(
      valoare
    )) {
      toateTexteleDinObiect(
        element,
        rezultate
      );
    }
  }

  return rezultate;
}

function creeazaRaportLectie(
  lectie,
  fisier
) {
  const erori = [];
  const avertismente = [];
  const confirmari = [];

  function eroare(mesaj) {
    erori.push(mesaj);
  }

  function avertisment(mesaj) {
    avertismente.push(mesaj);
  }

  function confirmare(mesaj) {
    confirmari.push(mesaj);
  }

  if (!lectie || typeof lectie !== "object") {
    eroare(
      "Exportul lecției nu este un obiect valid."
    );

    return {
      lectie,
      fisier,
      erori,
      avertismente,
      confirmari,
    };
  }

  verificaIdentitate();
  verificaStructuraGenerala();
  verificaVideo();
  verificaDefinitii();
  verificaTeorie();
  verificaFormule();
  verificaExemple();
  verificaGreseli();
  verificaExercitii();
  verificaRezumat();
  verificaLegaturaCuBac();
  verificaSurse();
  verificaIduri();
  verificaPlaceholdere();
  verificaPublicarea();

  return {
    lectie,
    fisier,
    erori,
    avertismente,
    confirmari,
  };

  function verificaIdentitate() {
    if (!textValid(lectie.id)) {
      eroare("Lipsește id-ul lecției.");
    }

    if (!textValid(lectie.slug)) {
      eroare("Lipsește slug-ul lecției.");
    }

    if (
      textValid(lectie.id) &&
      textValid(lectie.slug) &&
      lectie.id !== lectie.slug
    ) {
      avertisment(
        `id-ul "${lectie.id}" este diferit de slug-ul "${lectie.slug}".`
      );
    }

    if (
      !Number.isInteger(lectie.modul) ||
      lectie.modul <= 0
    ) {
      eroare(
        "Câmpul modul trebuie să fie un număr întreg pozitiv."
      );
    }

    if (
      !Number.isInteger(
        lectie.numarLectie
      ) ||
      lectie.numarLectie <= 0
    ) {
      eroare(
        "Câmpul numarLectie trebuie să fie un număr întreg pozitiv."
      );
    }

    if (!textValid(lectie.clasa)) {
      eroare("Lipsește clasa.");
    }

    if (lectie.profil !== "M_mate-info") {
      eroare(
        'Profilul trebuie să fie "M_mate-info".'
      );
    }

    if (!textValid(lectie.titlu)) {
      eroare("Lipsește titlul lecției.");
    }

    if (!textValid(lectie.subtitlu)) {
      eroare("Lipsește subtitlul lecției.");
    }

    if (!textValid(lectie.descriere)) {
      eroare("Lipsește descrierea lecției.");
    }

    if (
      !NIVELURI_PERMISE.has(
        lectie.nivelPrincipal
      )
    ) {
      eroare(
        `Nivel principal invalid: "${lectie.nivelPrincipal}".`
      );
    }

    if (
      !numarValid(
        lectie.durataEstimataMinute
      ) ||
      lectie.durataEstimataMinute <= 0
    ) {
      eroare(
        "durataEstimataMinute trebuie să fie un număr pozitiv."
      );
    }

    confirmare("identitate lecție");
  }

  function verificaStructuraGenerala() {
    if (
      !arrayCuText(
        lectie.prerechizite,
        1
      )
    ) {
      avertisment(
        "Prerechizitele lipsesc sau sunt incomplete."
      );
    }

    if (
      !arrayCuText(
        lectie.obiective,
        3
      )
    ) {
      eroare(
        "Sunt necesare minimum 3 obiective clare."
      );
    }

    if (
      !arrayCuText(
        lectie.termeniCheie,
        3
      )
    ) {
      eroare(
        "Sunt necesari minimum 3 termeni-cheie."
      );
    }

    confirmare(
      "structură pedagogică de bază"
    );
  }

  function verificaVideo() {
    if (!arrayValid(lectie.videoLectii)) {
      eroare(
        "Secțiunea videoLectii lipsește."
      );
      return;
    }

    REZULTATE.totalVideo +=
      lectie.videoLectii.length;

    if (lectie.videoLectii.length !== 4) {
      eroare(
        `Lecția trebuie să aibă exact 4 video-uri. Găsite: ${lectie.videoLectii.length}.`
      );
    } else {
      confirmare("4 video-uri");
    }

    const numereVideo = new Set();

    lectie.videoLectii.forEach(
      (video, index) => {
        const pozitie = index + 1;

        if (!textValid(video.id)) {
          eroare(
            `Video ${pozitie}: lipsește id-ul.`
          );
        }

        if (
          !Number.isInteger(video.numar)
        ) {
          eroare(
            `Video ${pozitie}: numărul video este invalid.`
          );
        } else {
          if (
            numereVideo.has(video.numar)
          ) {
            eroare(
              `Număr video duplicat: ${video.numar}.`
            );
          }

          numereVideo.add(video.numar);
        }

        if (!textValid(video.titlu)) {
          eroare(
            `Video ${pozitie}: lipsește titlul.`
          );
        }

        if (!textValid(video.descriere)) {
          eroare(
            `Video ${pozitie}: lipsește descrierea.`
          );
        }

        if (
          !numarValid(
            video.durataMinute
          ) ||
          video.durataMinute <= 0
        ) {
          eroare(
            `Video ${pozitie}: durataMinute este invalidă.`
          );
        }

        if (
          !arrayCuText(
            video.scenariu,
            5
          )
        ) {
          eroare(
            `Video ${pozitie}: scenariul trebuie să conțină minimum 5 fragmente de text.`
          );
        }

        if (
          !arrayCuText(
            video.ideiDeRetinut,
            2
          )
        ) {
          eroare(
            `Video ${pozitie}: sunt necesare minimum 2 idei de reținut.`
          );
        }

        verificaDurataVideo(
          video,
          pozitie
        );

        verificaExempluVideo(
          video,
          pozitie
        );

        verificaQuizVideo(
          video,
          pozitie
        );
      }
    );

    if (lectie.videoLectii.length === 4) {
      const numereSortate = [
        ...numereVideo,
      ].sort((a, b) => a - b);

      if (
        JSON.stringify(numereSortate) !==
        JSON.stringify([1, 2, 3, 4])
      ) {
        eroare(
          "Cele 4 video-uri trebuie numerotate 1, 2, 3 și 4."
        );
      }
    }
  }

  function verificaDurataVideo(
    video,
    pozitie
  ) {
    if (
      !Array.isArray(video.scenariu) ||
      !numarValid(video.durataMinute) ||
      video.durataMinute <= 0
    ) {
      return;
    }

    const numarCuvinte =
      numaraCuvinteScenariu(
        video.scenariu
      );

    const minimOrientativ = Math.round(
      video.durataMinute * 85
    );

    const maximOrientativ = Math.round(
      video.durataMinute * 170
    );

    const ritmEstimat =
      numarCuvinte /
      video.durataMinute;

    if (
      numarCuvinte <
      minimOrientativ
    ) {
      avertisment(
        `Video ${pozitie}: scenariul pare prea scurt pentru ${video.durataMinute} minute (${numarCuvinte} cuvinte; minim orientativ ${minimOrientativ}).`
      );
    }

    if (
      numarCuvinte >
      maximOrientativ
    ) {
      avertisment(
        `Video ${pozitie}: scenariul pare prea lung pentru ${video.durataMinute} minute (${numarCuvinte} cuvinte; maxim orientativ ${maximOrientativ}).`
      );
    }

    if (
      ritmEstimat >= 85 &&
      ritmEstimat <= 170
    ) {
      confirmare(
        `video ${pozitie} — durată plauzibilă (${numarCuvinte} cuvinte)`
      );
    }
  }

  function verificaExempluVideo(
    video,
    pozitie
  ) {
    const exemplu = video.exemplu;

    if (
      !exemplu ||
      typeof exemplu !== "object"
    ) {
      eroare(
        `Video ${pozitie}: lipsește exemplul.`
      );
      return;
    }

    if (!textValid(exemplu.titlu)) {
      eroare(
        `Video ${pozitie}: exemplul nu are titlu.`
      );
    }

    if (!textValid(exemplu.enunt)) {
      eroare(
        `Video ${pozitie}: exemplul nu are enunț.`
      );
    }

    if (
      !arrayCuText(
        exemplu.rezolvareScurta,
        1
      )
    ) {
      eroare(
        `Video ${pozitie}: exemplul nu are rezolvare.`
      );
    }

    if (!textValid(exemplu.raspuns)) {
      eroare(
        `Video ${pozitie}: exemplul nu are răspuns.`
      );
    }
  }

  function verificaQuizVideo(
    video,
    pozitie
  ) {
    const quiz =
      video.verificareRapida;

    if (!quiz) {
      avertisment(
        `Video ${pozitie}: lipsește verificarea rapidă.`
      );
      return;
    }

    if (!textValid(quiz.intrebare)) {
      eroare(
        `Video ${pozitie}: verificarea rapidă nu are întrebare.`
      );
    }

    if (
      !arrayCuText(
        quiz.variante,
        2
      )
    ) {
      eroare(
        `Video ${pozitie}: verificarea rapidă trebuie să aibă minimum 2 variante.`
      );
      return;
    }

    if (
      !Number.isInteger(
        quiz.raspunsCorect
      ) ||
      quiz.raspunsCorect < 0 ||
      quiz.raspunsCorect >=
        quiz.variante.length
    ) {
      eroare(
        `Video ${pozitie}: indicele raspunsCorect este în afara variantelor.`
      );
    }

    if (!textValid(quiz.explicatie)) {
      eroare(
        `Video ${pozitie}: lipsește explicația răspunsului corect.`
      );
    }

    const varianteUnice = new Set(
      quiz.variante.map((varianta) =>
        varianta.trim().toLowerCase()
      )
    );

    if (
      varianteUnice.size !==
      quiz.variante.length
    ) {
      avertisment(
        `Video ${pozitie}: există variante de răspuns duplicate.`
      );
    }
  }

  function verificaDefinitii() {
    if (
      !Array.isArray(lectie.definitii) ||
      lectie.definitii.length === 0
    ) {
      eroare(
        "Lecția trebuie să conțină cel puțin o definiție."
      );
      return;
    }

    lectie.definitii.forEach(
      (definitie, index) => {
        if (!textValid(definitie.termen)) {
          eroare(
            `Definiția ${index + 1}: lipsește termenul.`
          );
        }

        if (
          !textValid(
            definitie.definitie
          )
        ) {
          eroare(
            `Definiția ${index + 1}: lipsește explicația.`
          );
        }
      }
    );

    confirmare("definiții");
  }

  function verificaTeorie() {
    if (
      !Array.isArray(lectie.teorie) ||
      lectie.teorie.length === 0
    ) {
      eroare(
        "Lecția trebuie să conțină cel puțin o secțiune de teorie."
      );
      return;
    }

    lectie.teorie.forEach(
      (sectiune, index) => {
        if (!textValid(sectiune.id)) {
          eroare(
            `Teorie ${index + 1}: lipsește id-ul.`
          );
        }

        if (!textValid(sectiune.titlu)) {
          eroare(
            `Teorie ${index + 1}: lipsește titlul.`
          );
        }

        if (
          !textValid(
            sectiune.explicatie
          )
        ) {
          eroare(
            `Teorie ${index + 1}: lipsește explicația.`
          );
        }

        if (
          !arrayCuText(
            sectiune.ideiCheie,
            1
          )
        ) {
          eroare(
            `Teorie ${index + 1}: lipsesc ideile-cheie.`
          );
        }
      }
    );

    confirmare("teorie");
  }

  function verificaFormule() {
    if (!Array.isArray(lectie.formule)) {
      eroare(
        "Câmpul formule trebuie să fie un array."
      );
      return;
    }

    if (lectie.formule.length === 0) {
      avertisment(
        "Lecția nu conține formule. Acest lucru poate fi corect pentru anumite lecții, dar trebuie verificat."
      );

      return;
    }

    lectie.formule.forEach(
      (formula, index) => {
        if (!textValid(formula.id)) {
          eroare(
            `Formula ${index + 1}: lipsește id-ul.`
          );
        }

        if (!textValid(formula.nume)) {
          eroare(
            `Formula ${index + 1}: lipsește numele.`
          );
        }

        if (!textValid(formula.formula)) {
          eroare(
            `Formula ${index + 1}: lipsește formula.`
          );
        }

        if (
          !textValid(
            formula.explicatie
          )
        ) {
          eroare(
            `Formula ${index + 1}: lipsește explicația.`
          );
        }
      }
    );

    confirmare("formule");
  }

  function verificaExemple() {
    if (
      !Array.isArray(
        lectie.exempleRezolvate
      ) ||
      lectie.exempleRezolvate.length <
        2
    ) {
      eroare(
        "Sunt necesare minimum 2 exemple rezolvate."
      );
      return;
    }

    lectie.exempleRezolvate.forEach(
      (exemplu, index) => {
        const numar = index + 1;

        if (!textValid(exemplu.id)) {
          eroare(
            `Exemplul ${numar}: lipsește id-ul.`
          );
        }

        if (!textValid(exemplu.titlu)) {
          eroare(
            `Exemplul ${numar}: lipsește titlul.`
          );
        }

        if (!textValid(exemplu.enunt)) {
          eroare(
            `Exemplul ${numar}: lipsește enunțul.`
          );
        }

        if (
          !NIVELURI_PERMISE.has(
            exemplu.nivel
          )
        ) {
          eroare(
            `Exemplul ${numar}: nivel invalid.`
          );
        }

        if (
          !Array.isArray(exemplu.pasi) ||
          exemplu.pasi.length === 0
        ) {
          eroare(
            `Exemplul ${numar}: lipsește rezolvarea pas cu pas.`
          );
        } else {
          verificaPasi(
            exemplu.pasi,
            `Exemplul ${numar}`
          );
        }

        if (
          !textValid(
            exemplu.raspunsFinal
          )
        ) {
          eroare(
            `Exemplul ${numar}: lipsește răspunsul final.`
          );
        }
      }
    );

    confirmare("exemple rezolvate");
  }

  function verificaGreseli() {
    if (
      !Array.isArray(
        lectie.greseliFrecvente
      ) ||
      lectie.greseliFrecvente.length <
        2
    ) {
      eroare(
        "Sunt necesare minimum 2 greșeli frecvente."
      );
      return;
    }

    lectie.greseliFrecvente.forEach(
      (greseala, index) => {
        const numar = index + 1;

        if (
          !textValid(
            greseala.greseala
          )
        ) {
          eroare(
            `Greșeala ${numar}: lipsește descrierea.`
          );
        }

        if (
          !textValid(
            greseala.deCeEsteGresit
          )
        ) {
          eroare(
            `Greșeala ${numar}: lipsește explicația.`
          );
        }

        if (
          !textValid(
            greseala.cumOEviti
          )
        ) {
          eroare(
            `Greșeala ${numar}: lipsește metoda de evitare.`
          );
        }
      }
    );

    confirmare("greșeli frecvente");
  }

  function verificaExercitii() {
    if (
      !Array.isArray(lectie.exercitii)
    ) {
      eroare(
        "Secțiunea exercitii lipsește."
      );
      return;
    }

    REZULTATE.totalExercitii +=
      lectie.exercitii.length;

    if (lectie.exercitii.length < 5) {
      eroare(
        `Sunt necesare minimum 5 exerciții. Găsite: ${lectie.exercitii.length}.`
      );
    }

    const niveluriGasite = new Set();

    lectie.exercitii.forEach(
      (exercitiu, index) => {
        const numar = index + 1;

        if (!textValid(exercitiu.id)) {
          eroare(
            `Exercițiul ${numar}: lipsește id-ul.`
          );
        }

        if (
          !NIVELURI_PERMISE.has(
            exercitiu.nivel
          )
        ) {
          eroare(
            `Exercițiul ${numar}: nivel invalid.`
          );
        } else {
          niveluriGasite.add(
            exercitiu.nivel
          );
        }

        if (
          !TIPURI_EXERCITII_PERMISE.has(
            exercitiu.tip
          )
        ) {
          eroare(
            `Exercițiul ${numar}: tip invalid "${exercitiu.tip}".`
          );
        }

        if (
          !textValid(
            exercitiu.enunt
          )
        ) {
          eroare(
            `Exercițiul ${numar}: lipsește enunțul.`
          );
        }

        if (
          !textValid(
            exercitiu.raspunsCorect
          )
        ) {
          eroare(
            `Exercițiul ${numar}: lipsește răspunsul corect.`
          );
        }

        if (
          !Array.isArray(
            exercitiu.rezolvare
          ) ||
          exercitiu.rezolvare.length ===
            0
        ) {
          eroare(
            `Exercițiul ${numar}: lipsește rezolvarea pas cu pas.`
          );
        } else {
          verificaPasi(
            exercitiu.rezolvare,
            `Exercițiul ${numar}`
          );
        }

        if (
          !textValid(
            exercitiu.explicatieFinala
          )
        ) {
          eroare(
            `Exercițiul ${numar}: lipsește explicația finală.`
          );
        }

        if (
          exercitiu.punctaj !==
            undefined &&
          (!numarValid(
            exercitiu.punctaj
          ) ||
            exercitiu.punctaj <= 0)
        ) {
          eroare(
            `Exercițiul ${numar}: punctaj invalid.`
          );
        }

        verificaAlegereMultipla(
          exercitiu,
          numar
        );
      }
    );

    if (
      lectie.exercitii.length >= 5
    ) {
      confirmare(
        `${lectie.exercitii.length} exerciții`
      );
    }

    if (
      !niveluriGasite.has(
        "fundament"
      )
    ) {
      avertisment(
        "Lipsește cel puțin un exercițiu de nivel fundament."
      );
    }

    if (
      !niveluriGasite.has(
        "standard-bac"
      )
    ) {
      avertisment(
        "Lipsește cel puțin un exercițiu de nivel standard-bac."
      );
    }

    if (
      !niveluriGasite.has(
        "avansat"
      )
    ) {
      avertisment(
        "Lipsește cel puțin un exercițiu de nivel avansat."
      );
    }
  }

  function verificaAlegereMultipla(
    exercitiu,
    numar
  ) {
    if (
      exercitiu.tip !==
      "alegere-multipla"
    ) {
      return;
    }

    if (
      !arrayCuText(
        exercitiu.variante,
        2
      )
    ) {
      eroare(
        `Exercițiul ${numar}: alegerea multiplă trebuie să aibă minimum 2 variante.`
      );
      return;
    }

    const raspunsNormalizat =
      exercitiu.raspunsCorect
        ?.trim()
        .toLowerCase();

    const existaRaspuns =
      exercitiu.variante.some(
        (varianta) =>
          varianta
            .trim()
            .toLowerCase() ===
          raspunsNormalizat
      );

    if (!existaRaspuns) {
      eroare(
        `Exercițiul ${numar}: raspunsCorect nu apare în lista de variante.`
      );
    }

    const varianteUnice = new Set(
      exercitiu.variante.map(
        (varianta) =>
          varianta
            .trim()
            .toLowerCase()
      )
    );

    if (
      varianteUnice.size !==
      exercitiu.variante.length
    ) {
      avertisment(
        `Exercițiul ${numar}: există variante duplicate.`
      );
    }
  }

  function verificaPasi(
    pasi,
    eticheta
  ) {
    const numere = new Set();

    pasi.forEach((pas, index) => {
      if (
        !Number.isInteger(pas.numar)
      ) {
        eroare(
          `${eticheta}, pas ${index + 1}: număr invalid.`
        );
      } else {
        if (
          numere.has(pas.numar)
        ) {
          eroare(
            `${eticheta}: există numere de pași duplicate.`
          );
        }

        numere.add(pas.numar);
      }

      if (!textValid(pas.titlu)) {
        eroare(
          `${eticheta}, pas ${index + 1}: lipsește titlul.`
        );
      }

      if (
        !textValid(pas.continut)
      ) {
        eroare(
          `${eticheta}, pas ${index + 1}: lipsește conținutul.`
        );
      }
    });
  }

  function verificaRezumat() {
    const rezumat = lectie.rezumat;

    if (
      !rezumat ||
      typeof rezumat !== "object"
    ) {
      eroare(
        "Secțiunea rezumat lipsește."
      );
      return;
    }

    if (
      !arrayCuText(
        rezumat.ideiDeRetinut,
        3
      )
    ) {
      eroare(
        "Rezumatul trebuie să conțină minimum 3 idei de reținut."
      );
    }

    if (
      !Array.isArray(
        rezumat.formuleDeRetinut
      )
    ) {
      eroare(
        "formuleDeRetinut trebuie să fie un array."
      );
    }

    if (
      !arrayCuText(
        rezumat.checklistElev,
        3
      )
    ) {
      eroare(
        "Checklist-ul elevului trebuie să conțină minimum 3 puncte."
      );
    }

    confirmare("rezumat");
  }

  function verificaLegaturaCuBac() {
    const legatura =
      lectie.legaturaCuBac;

    if (
      !legatura ||
      typeof legatura !== "object"
    ) {
      eroare(
        "Secțiunea legaturaCuBac lipsește."
      );
      return;
    }

    if (
      !textValid(
        legatura.importanta
      )
    ) {
      eroare(
        "legaturaCuBac.importanta lipsește."
      );
    }

    if (
      !arrayCuText(
        legatura.tipuriCerinte,
        1
      )
    ) {
      eroare(
        "legaturaCuBac.tipuriCerinte lipsește."
      );
    }

    if (
      !arrayCuText(
        legatura.strategie,
        1
      )
    ) {
      eroare(
        "legaturaCuBac.strategie lipsește."
      );
    }

    confirmare("legătura cu BAC");
  }

  function verificaSurse() {
    if (
      !Array.isArray(lectie.surse) ||
      lectie.surse.length === 0
    ) {
      eroare(
        "Lecția trebuie să aibă cel puțin o sursă."
      );
      return;
    }

    lectie.surse.forEach(
      (sursa, index) => {
        if (!textValid(sursa.tip)) {
          eroare(
            `Sursa ${index + 1}: lipsește tipul.`
          );
        }

        if (!textValid(sursa.titlu)) {
          eroare(
            `Sursa ${index + 1}: lipsește titlul.`
          );
        }
      }
    );

    const areProgramaOficiala =
      lectie.surse.some(
        (sursa) =>
          sursa.tip ===
          "programa-oficiala"
      );

    if (!areProgramaOficiala) {
      avertisment(
        "Nu există nicio sursă de tip programa-oficiala."
      );
    }

    confirmare("surse");
  }

  function verificaIduri() {
    const colectie = [];

    if (textValid(lectie.id)) {
      colectie.push({
        id: lectie.id,
        loc: "lecție",
      });
    }

    for (const video of
      lectie.videoLectii ?? []) {
      if (textValid(video.id)) {
        colectie.push({
          id: video.id,
          loc: "video",
        });
      }
    }

    for (const sectiune of
      lectie.teorie ?? []) {
      if (textValid(sectiune.id)) {
        colectie.push({
          id: sectiune.id,
          loc: "teorie",
        });
      }
    }

    for (const formula of
      lectie.formule ?? []) {
      if (textValid(formula.id)) {
        colectie.push({
          id: formula.id,
          loc: "formulă",
        });
      }
    }

    for (const exemplu of
      lectie.exempleRezolvate ?? []) {
      if (textValid(exemplu.id)) {
        colectie.push({
          id: exemplu.id,
          loc: "exemplu",
        });
      }
    }

    for (const exercitiu of
      lectie.exercitii ?? []) {
      if (textValid(exercitiu.id)) {
        colectie.push({
          id: exercitiu.id,
          loc: "exercițiu",
        });
      }
    }

    const aparitii = new Map();

    for (const element of colectie) {
      const lista =
        aparitii.get(element.id) ?? [];

      lista.push(element.loc);

      aparitii.set(
        element.id,
        lista
      );
    }

    for (const [
      id,
      locuri,
    ] of aparitii.entries()) {
      if (locuri.length > 1) {
        eroare(
          `ID duplicat "${id}" în: ${locuri.join(", ")}.`
        );
      }
    }

    confirmare("ID-uri unice");
  }

  function verificaPlaceholdere() {
    const texte =
      toateTexteleDinObiect(
        lectie
      );

    const gasite = texte.filter(
      (text) =>
        continePlaceholder(text)
    );

    if (gasite.length > 0) {
      avertisment(
        `Au fost detectate ${gasite.length} texte care pot conține placeholder-e/TODO.`
      );
    }
  }

  function verificaPublicarea() {
    const verificare =
      lectie.verificare;

    if (
      !verificare ||
      typeof verificare !== "object"
    ) {
      eroare(
        "Metadata de verificare lipsește."
      );
      return;
    }

    if (
      !STATUSURI_PERMISE.has(
        verificare.status
      )
    ) {
      eroare(
        `Status de verificare invalid: "${verificare.status}".`
      );
    }

    const campuri = [
      "verificatMatematic",
      "verificatPrograma",
      "verificatExercitii",
      "verificatLimbaRomana",
    ];

    for (const camp of campuri) {
      if (
        typeof verificare[camp] !==
        "boolean"
      ) {
        eroare(
          `${camp} trebuie să fie boolean.`
        );
      }
    }

    const toateVerificarile =
      verificare.verificatMatematic ===
        true &&
      verificare.verificatPrograma ===
        true &&
      verificare.verificatExercitii ===
        true &&
      verificare.verificatLimbaRomana ===
        true;

    if (
      verificare.status ===
        "publicabil" &&
      !toateVerificarile
    ) {
      eroare(
        "BLOCARE PUBLICARE: statusul este publicabil, dar nu toate verificările sunt true."
      );
    }

    if (
      verificare.status !==
        "publicabil" &&
      toateVerificarile
    ) {
      avertisment(
        "Toate verificările sunt true, dar statusul nu este publicabil."
      );
    }

    if (
      verificare.status ===
      "publicabil"
    ) {
      confirmare(
        "PUBLICABIL — toate porțile trebuie validate"
      );
    } else {
      avertisment(
        `PUBLICABIL: NU — status curent "${verificare.status}".`
      );
    }
  }
}

async function incarcaFisierTs(
  caleFisier
) {
  const codTs = fs.readFileSync(
    caleFisier,
    "utf8"
  );

  const rezultat =
    ts.transpileModule(codTs, {
      compilerOptions: {
        target: ts.ScriptTarget.ES2022,
        module: ts.ModuleKind.ESNext,
        moduleResolution:
          ts.ModuleResolutionKind.Bundler,
        esModuleInterop: true,
        skipLibCheck: true,
        sourceMap: false,
      },

      fileName: caleFisier,

      reportDiagnostics: true,
    });

  const diagnostice =
    rezultat.diagnostics ?? [];

  const eroriCompilare =
    diagnostice.filter(
      (diagnostic) =>
        diagnostic.category ===
        ts.DiagnosticCategory.Error
    );

  if (eroriCompilare.length > 0) {
    const mesaje =
      eroriCompilare.map(
        (diagnostic) => {
          const mesaj =
            ts.flattenDiagnosticMessageText(
              diagnostic.messageText,
              "\n"
            );

          return mesaj;
        }
      );

    throw new Error(
      mesaje.join("\n")
    );
  }

  const codBase64 = Buffer.from(
    rezultat.outputText,
    "utf8"
  ).toString("base64");

  const url =
    `data:text/javascript;base64,${codBase64}`;

  return import(url);
}

function gasesteFisiereLectii() {
  if (
    !fs.existsSync(
      DIRECTOR_LECTII
    )
  ) {
    throw new Error(
      `Directorul nu există: ${DIRECTOR_LECTII}`
    );
  }

  return fs
    .readdirSync(
      DIRECTOR_LECTII,
      {
        withFileTypes: true,
      }
    )
    .filter(
      (intrare) =>
        intrare.isFile() &&
        intrare.name.endsWith(".ts") &&
        !intrare.name.endsWith(
          ".d.ts"
        )
    )
    .map((intrare) =>
      path.join(
        DIRECTOR_LECTII,
        intrare.name
      )
    )
    .sort((a, b) =>
      a.localeCompare(b, "ro")
    );
}

function extrageLectiiDinModul(
  modul,
  fisier
) {
  const rezultate = [];
  const obiecteVazute = new Set();

  for (const [
    numeExport,
    valoare,
  ] of Object.entries(modul)) {
    if (
      valoare &&
      typeof valoare === "object" &&
      textValid(valoare.slug) &&
      textValid(valoare.titlu)
    ) {
      // Același obiect poate fi exportat atât named, cât și default.
      // Îl analizăm o singură dată.
      if (obiecteVazute.has(valoare)) {
        continue;
      }

      obiecteVazute.add(valoare);

      rezultate.push({
        numeExport,
        lectie: valoare,
        fisier,
      });
    }
  }

  return rezultate;
}

function scrieLinie(
  caracter = "─",
  lungime = 64
) {
  console.log(
    caracter.repeat(lungime)
  );
}

function afiseazaRaportLectie(
  raport
) {
  const {
    lectie,
    fisier,
    erori,
    avertismente,
    confirmari,
  } = raport;

  const nume =
    lectie?.slug ||
    path.basename(fisier);

  console.log();
  scrieLinie();
  console.log(`📘 ${nume}`);
  scrieLinie();

  if (textValid(lectie?.titlu)) {
    console.log(
      `Titlu: ${lectie.titlu}`
    );
  }

  console.log(
    `Fișier: ${path.relative(
      ROOT,
      fisier
    )}`
  );

  if (confirmari.length > 0) {
    console.log();
    console.log("VERIFICĂRI TRECUTE:");

    for (const mesaj of confirmari) {
      console.log(`  ✓ ${mesaj}`);
    }
  }

  if (avertismente.length > 0) {
    console.log();
    console.log("AVERTISMENTE:");

    for (const mesaj of avertismente) {
      console.log(`  ⚠ ${mesaj}`);
    }
  }

  if (erori.length > 0) {
    console.log();
    console.log("ERORI:");

    for (const mesaj of erori) {
      console.log(`  ✗ ${mesaj}`);
    }
  }

  console.log();

  if (erori.length === 0) {
    console.log(
      "STRUCTURĂ: ✓ VALIDĂ"
    );
  } else {
    console.log(
      "STRUCTURĂ: ✗ INVALIDĂ"
    );
  }

  const estePublicabil =
    lectie?.verificare?.status ===
      "publicabil" &&
    lectie?.verificare
      ?.verificatMatematic ===
      true &&
    lectie?.verificare
      ?.verificatPrograma ===
      true &&
    lectie?.verificare
      ?.verificatExercitii ===
      true &&
    lectie?.verificare
      ?.verificatLimbaRomana ===
      true &&
    erori.length === 0;

  console.log(
    `PUBLICABIL: ${
      estePublicabil
        ? "✓ DA"
        : "✗ NU"
    }`
  );
}

async function main() {
  console.log();
  console.log(
    "BAC MATE — CONTENT VALIDATOR V1"
  );
  scrieLinie("═");

  console.log(
    "Verific structura lecțiilor..."
  );

  const fisiere =
    gasesteFisiereLectii();

  if (fisiere.length === 0) {
    console.error();
    console.error(
      "Nu am găsit fișiere .ts în data/continut/lectii."
    );

    process.exitCode = 1;
    return;
  }

  const rapoarte = [];
  const slugs = new Map();
  const iduriLectii = new Map();

  for (const fisier of fisiere) {
    let modul;

    try {
      modul =
        await incarcaFisierTs(
          fisier
        );
    } catch (error) {
      REZULTATE.totalErori += 1;

      rapoarte.push({
        lectie: {
          slug: path.basename(
            fisier,
            ".ts"
          ),
          titlu:
            "Fișier imposibil de încărcat",
        },
        fisier,
        confirmari: [],
        avertismente: [],
        erori: [
          `Fișierul nu poate fi procesat: ${
            error instanceof Error
              ? error.message
              : String(error)
          }`,
        ],
      });

      continue;
    }

    const lectii =
      extrageLectiiDinModul(
        modul,
        fisier
      );

    if (lectii.length === 0) {
      rapoarte.push({
        lectie: {
          slug: path.basename(
            fisier,
            ".ts"
          ),
          titlu:
            "Export de lecție nedetectat",
        },
        fisier,
        confirmari: [],
        avertismente: [],
        erori: [
          "Fișierul nu exportă niciun obiect care să arate ca o lecție BAC MATE.",
        ],
      });

      continue;
    }

    for (const element of lectii) {
      const raport =
        creeazaRaportLectie(
          element.lectie,
          fisier
        );

      rapoarte.push(raport);

      const slug =
        element.lectie.slug;

      const id =
        element.lectie.id;

      if (textValid(slug)) {
        const aparitii =
          slugs.get(slug) ?? [];

        aparitii.push(fisier);

        slugs.set(
          slug,
          aparitii
        );
      }

      if (textValid(id)) {
        const aparitii =
          iduriLectii.get(id) ?? [];

        aparitii.push(fisier);

        iduriLectii.set(
          id,
          aparitii
        );
      }
    }
  }

  for (const [
    slug,
    aparitii,
  ] of slugs.entries()) {
    if (aparitii.length <= 1) {
      continue;
    }

    for (const raport of rapoarte) {
      if (
        raport.lectie?.slug ===
        slug
      ) {
        raport.erori.push(
          `Slug duplicat global "${slug}" în ${aparitii.length} fișiere.`
        );
      }
    }
  }

  for (const [
    id,
    aparitii,
  ] of iduriLectii.entries()) {
    if (aparitii.length <= 1) {
      continue;
    }

    for (const raport of rapoarte) {
      if (
        raport.lectie?.id === id
      ) {
        raport.erori.push(
          `ID de lecție duplicat global "${id}" în ${aparitii.length} fișiere.`
        );
      }
    }
  }

  for (const raport of rapoarte) {
    REZULTATE.lectiiAnalizate += 1;

    REZULTATE.totalErori +=
      raport.erori.length;

    REZULTATE.totalAvertismente +=
      raport.avertismente.length;

    if (raport.erori.length === 0) {
      REZULTATE.lectiiFaraErori += 1;
    } else {
      REZULTATE.lectiiCuErori += 1;
    }

    afiseazaRaportLectie(
      raport
    );
  }

  console.log();
  scrieLinie("═");
  console.log(
    "BAC MATE — RAPORT FINAL"
  );
  scrieLinie("═");

  console.log(
    `Lecții analizate:       ${REZULTATE.lectiiAnalizate}`
  );

  console.log(
    `Structură validă:       ${REZULTATE.lectiiFaraErori}`
  );

  console.log(
    `Lecții cu erori:        ${REZULTATE.lectiiCuErori}`
  );

  console.log(
    `Erori critice:          ${REZULTATE.totalErori}`
  );

  console.log(
    `Avertismente:           ${REZULTATE.totalAvertismente}`
  );

  console.log(
    `Video-uri analizate:    ${REZULTATE.totalVideo}`
  );

  console.log(
    `Exerciții analizate:    ${REZULTATE.totalExercitii}`
  );

  scrieLinie("═");

  if (REZULTATE.totalErori > 0) {
    console.log();
    console.log(
      "❌ VALIDARE EȘUATĂ"
    );

    console.log(
      "Există erori structurale care trebuie reparate."
    );

    process.exitCode = 1;
    return;
  }

  console.log();
  console.log(
    "✅ VALIDARE STRUCTURALĂ REUȘITĂ"
  );

  console.log(
    "Nu au fost găsite erori structurale critice."
  );

  console.log();
  console.log(
    "IMPORTANT: validarea structurală NU înlocuiește verificarea matematică, verificarea programei, verificarea exercițiilor sau verificarea limbii române."
  );
}

main().catch((error) => {
  console.error();
  console.error(
    "❌ CONTENT VALIDATOR s-a oprit neașteptat."
  );

  console.error(
    error instanceof Error
      ? error.stack ?? error.message
      : String(error)
  );

  process.exitCode = 1;
});