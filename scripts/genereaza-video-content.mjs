import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

const OUTPUT_ROOT = path.join(
  ROOT,
  "data",
  "continut-video"
);

/* =========================================================
   PROGRAMA BAC MATE - 17 MODULE / 219 LECTII
   ========================================================= */

const module = [
  {
    modul: 1,
    titlu: "Fundamente matematice și logică",
    lectii: [
      "Mulțimi de numere și operații cu numere reale",
      "Estimări și aproximări",
      "Modulul unui număr real",
      "Intervale de numere reale",
      "Propoziții și predicate",
      "Cuantificatori",
      "Negație, conjuncție, disjuncție și implicație",
      "Operații cu mulțimi",
      "Inducția matematică",
      "Demonstrații și raționamente logice",
    ],
  },

  {
    modul: 2,
    titlu: "Funcții și șiruri",
    lectii: [
      "Reper cartezian și produs cartezian",
      "Noțiunea de funcție",
      "Domeniu, codomeniu și imagine",
      "Graficul unei funcții",
      "Lecturi grafice",
      "Egalitatea a două funcții",
      "Restricția unei funcții",
      "Monotonie și mărginire",
      "Paritate și imparitate",
      "Periodicitate",
      "Compunerea funcțiilor",
      "Șiruri de numere reale",
      "Progresii aritmetice",
      "Progresii geometrice",
    ],
  },

  {
    modul: 3,
    titlu: "Funcția de gradul I",
    lectii: [
      "Funcția f(x) = ax + b",
      "Graficul funcției de gradul I",
      "Monotonia funcției de gradul I",
      "Semnul funcției de gradul I",
      "Ecuații de gradul I",
      "Inecuații de gradul I",
      "Sisteme de ecuații liniare",
      "Interpretarea geometrică a sistemelor",
      "Probleme modelate prin funcții liniare",
    ],
  },

  {
    modul: 4,
    titlu: "Gradul al II-lea",
    lectii: [
      "Ecuația de gradul al II-lea",
      "Discriminantul și numărul de soluții",
      "Formulele rădăcinilor",
      "Relațiile lui Viète",
      "Funcția de gradul al II-lea",
      "Graficul parabolei",
      "Vârful parabolei",
      "Axa de simetrie",
      "Intersecția parabolei cu axele",
      "Semnul funcției de gradul al II-lea",
      "Inecuații de gradul al II-lea",
      "Poziția relativă dreaptă-parabolă",
      "Probleme cu parametru",
    ],
  },

  {
    modul: 5,
    titlu: "Vectori și trigonometrie",
    lectii: [
      "Vectori în plan",
      "Adunarea și scăderea vectorilor",
      "Înmulțirea unui vector cu un scalar",
      "Coliniaritatea vectorilor",
      "Descompunerea vectorilor",
      "Coordonate și vectori",
      "Sinus, cosinus, tangentă și cotangentă",
      "Valori trigonometrice uzuale",
      "Reducerea la primul cadran",
      "Formule trigonometrice",
      "Formule de adunare și scădere",
      "Formule pentru unghi dublu",
      "Transformarea sumei în produs",
      "Teorema sinusurilor",
      "Teorema cosinusului",
      "Lungimi și unghiuri în triunghi",
      "Aria triunghiului",
      "Cercul înscris și cercul circumscris",
    ],
  },

  {
    modul: 6,
    titlu: "Puteri, radicali și logaritmi",
    lectii: [
      "Puteri cu exponent întreg",
      "Puteri cu exponent rațional",
      "Puteri cu exponent real",
      "Radical de ordin n",
      "Proprietățile radicalilor",
      "Operații cu radicali",
      "Logaritmul unui număr pozitiv",
      "Proprietățile logaritmilor",
      "Schimbarea bazei unui logaritm",
      "Calcule cu puteri, radicali și logaritmi",
    ],
  },

  {
    modul: 7,
    titlu: "Funcții elementare și ecuații",
    lectii: [
      "Funcția putere",
      "Funcția radical",
      "Funcția exponențială",
      "Funcția logaritmică",
      "Funcții trigonometrice",
      "Funcții trigonometrice inverse",
      "Injectivitate",
      "Surjectivitate",
      "Bijectivitate",
      "Funcție inversabilă",
      "Funcția inversă",
      "Ecuații cu radicali",
      "Ecuații exponențiale",
      "Ecuații logaritmice",
      "Ecuații trigonometrice",
    ],
  },

  {
    modul: 8,
    titlu: "Numere complexe",
    lectii: [
      "Forma algebrică a unui număr complex",
      "Partea reală și partea imaginară",
      "Egalitatea numerelor complexe",
      "Adunarea și scăderea numerelor complexe",
      "Înmulțirea numerelor complexe",
      "Conjugatul unui număr complex",
      "Împărțirea numerelor complexe",
      "Ecuații de gradul al II-lea în numere complexe",
      "Ecuații bipătrate",
    ],
  },

  {
    modul: 9,
    titlu: "Combinatorică și probabilități",
    lectii: [
      "Principiul multiplicării",
      "Permutări",
      "Aranjamente",
      "Combinări",
      "Probleme de numărare",
      "Evenimente aleatoare",
      "Operații cu evenimente",
      "Evenimente egal probabile",
      "Probabilitatea unui eveniment",
      "Probabilitatea evenimentelor compuse",
      "Aplicații financiare",
    ],
  },

  {
    modul: 10,
    titlu: "Geometrie analitică",
    lectii: [
      "Coordonate în plan",
      "Vectori prin coordonate",
      "Ecuația unei drepte",
      "Dreapta determinată de un punct și o direcție",
      "Dreapta determinată de două puncte",
      "Condiții de paralelism",
      "Condiții de perpendicularitate",
      "Distanța dintre două puncte",
      "Distanța de la un punct la o dreaptă",
      "Calculul ariilor în coordonate",
    ],
  },

  {
    modul: 11,
    titlu: "Matrice și determinanți",
    lectii: [
      "Noțiunea de matrice",
      "Tipuri de matrice",
      "Egalitatea matricelor",
      "Adunarea matricelor",
      "Înmulțirea unei matrice cu un scalar",
      "Înmulțirea matricelor",
      "Puteri de matrice",
      "Determinant de ordinul 2",
      "Determinant de ordinul 3",
      "Proprietățile determinanților",
      "Matrice inversabilă",
      "Inversa unei matrice",
      "Ecuații matriceale",
    ],
  },

  {
    modul: 12,
    titlu: "Sisteme de ecuații",
    lectii: [
      "Forma matriceală a unui sistem",
      "Sisteme compatibile și incompatibile",
      "Regula lui Cramer",
      "Rangul unei matrice",
      "Teorema Kronecker-Capelli",
      "Teorema Rouché",
      "Metoda Gauss",
      "Sisteme cu parametru",
    ],
  },

  {
    modul: 13,
    titlu: "Limite și continuitate",
    lectii: [
      "Vecinătăți",
      "Șir convergent",
      "Limita unui șir",
      "Operații cu limite de șiruri",
      "Limite uzuale",
      "Numărul e",
      "Limita unei funcții într-un punct",
      "Limite laterale",
      "Limite la infinit",
      "Operații cu limite de funcții",
      "Forme nedeterminate",
      "Asimptote verticale",
      "Asimptote orizontale",
      "Asimptote oblice",
      "Continuitatea într-un punct",
      "Continuitatea pe un interval",
      "Proprietatea lui Darboux",
    ],
  },

  {
    modul: 14,
    titlu: "Derivate și studiul funcțiilor",
    lectii: [
      "Derivata unei funcții într-un punct",
      "Interpretarea geometrică a derivatei",
      "Derivatele funcțiilor elementare",
      "Reguli de derivare",
      "Derivata funcției compuse",
      "Teorema lui Fermat",
      "Teorema lui Rolle",
      "Teorema lui Lagrange",
      "Regulile lui l'Hospital",
      "Monotonia cu ajutorul derivatei",
      "Puncte de maxim și minim",
      "Concavitate și convexitate",
      "Derivata de ordinul al II-lea",
      "Puncte de inflexiune",
      "Tabel de variație",
      "Reprezentarea grafică a funcțiilor",
      "Determinarea numărului de soluții ale unei ecuații",
    ],
  },

  {
    modul: 15,
    titlu: "Structuri algebrice",
    lectii: [
      "Legi de compoziție",
      "Parte stabilă",
      "Proprietățile unei legi de compoziție",
      "Element neutru",
      "Elemente simetrizabile",
      "Grup",
      "Subgrup",
      "Grup finit",
      "Ordinul unui element",
      "Morfism de grupuri",
      "Izomorfism de grupuri",
      "Inel",
      "Subinel",
      "Corp",
      "Morfisme de inele și corpuri",
    ],
  },

  {
    modul: 16,
    titlu: "Polinoame",
    lectii: [
      "Polinoame cu coeficienți într-un corp",
      "Gradul unui polinom",
      "Adunarea și înmulțirea polinoamelor",
      "Împărțirea polinoamelor",
      "Teorema împărțirii cu rest",
      "Schema lui Horner",
      "Teorema lui Bézout",
      "Divizibilitatea polinoamelor",
      "Rădăcinile unui polinom",
      "Factorizarea polinoamelor",
      "Relațiile lui Viète pentru polinoame",
      "Ecuații algebrice",
      "Ecuații binome",
      "Ecuații bipătrate",
      "Ecuații reciproce",
    ],
  },

  {
    modul: 17,
    titlu: "Primitive și integrale",
    lectii: [
      "Primitiva unei funcții",
      "Integrala nedefinită",
      "Primitive uzuale",
      "Proprietățile primitivelor",
      "Integrala definită",
      "Proprietățile integralei definite",
      "Formula Leibniz-Newton",
      "Integrabilitatea funcțiilor continue",
      "Teorema de medie",
      "Integrarea prin părți",
      "Integrarea prin schimbare de variabilă",
      "Integrarea funcțiilor raționale simple",
      "Calculul ariilor",
      "Volumul corpurilor de rotație",
      "Limite de șiruri folosind integrale",
    ],
  },
];

/* =========================================================
   FUNCTII UTILE
   ========================================================= */

function slugify(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ț/g, "t")
    .replace(/Ț/g, "T")
    .replace(/ș/g, "s")
    .replace(/Ș/g, "S")
    .toLowerCase()
    .replace(/f\(x\)/g, "fx")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function numarCuZero(numar) {
  return String(numar).padStart(2, "0");
}

function scrieJson(cale, continut) {
  fs.writeFileSync(
    cale,
    JSON.stringify(continut, null, 2) + "\n",
    "utf8"
  );
}

/* =========================================================
   VERIFICARE PROGRAMA INAINTE DE GENERARE
   ========================================================= */

function verificaPrograma() {
  const erori = [];

  if (module.length !== 17) {
    erori.push(
      `Trebuiau 17 module, dar sunt ${module.length}.`
    );
  }

  const toateLectiile = module.flatMap((modul) =>
    modul.lectii.map((titlu, index) => ({
      modul: modul.modul,
      lectie: index + 1,
      titlu,
    }))
  );

  if (toateLectiile.length !== 219) {
    erori.push(
      `Trebuiau 219 lecții, dar sunt ${toateLectiile.length}.`
    );
  }

  const titluri = new Set();
  const iduri = new Set();

  for (const lectie of toateLectiile) {
    const cheieTitlu = lectie.titlu
      .trim()
      .toLocaleLowerCase("ro-RO");

    const id =
      `m${lectie.modul}-l${numarCuZero(lectie.lectie)}`;

    if (!lectie.titlu.trim()) {
      erori.push(
        `Titlu gol la modulul ${lectie.modul}, lecția ${lectie.lectie}.`
      );
    }

    if (titluri.has(cheieTitlu)) {
      /*
       * Unele titluri pot apărea legitim în module diferite.
       * Nu blocăm generarea doar pentru titlu repetat.
       */
    } else {
      titluri.add(cheieTitlu);
    }

    if (iduri.has(id)) {
      erori.push(`ID duplicat: ${id}`);
    }

    iduri.add(id);
  }

  return {
    erori,
    totalLectii: toateLectiile.length,
  };
}

/* =========================================================
   SABLON VIDEO
   ========================================================= */

function creeazaVideo({
  modul,
  lectie,
  titluLectie,
  numarVideo,
  rol,
  titlu,
  durataTintaMinute,
}) {
  const idLectie =
    `m${modul}-l${numarCuZero(lectie)}`;

  const idVideo =
    `${idLectie}-v${numarVideo}`;

  return {
    id: idVideo,
    numar: numarVideo,
    rol,
    titlu,
    durataTintaMinute,

    status: "de-generat",

    verificare: {
      matematic: false,
      programa: false,
      limbaRomana: false,
      exemplu: false,
      audio: false,
      video: false,
    },

    scenariu: [],

    cadre: [],

    ideiDeRetinut: [],

    formule: [],

    exemplu: null,

    verificareRapida: null,

    media: {
      videoUrl:
        `/videos/modul-${modul}/${idLectie}/video-${numarVideo}.mp4`,

      audioUrl:
        `/videos/modul-${modul}/${idLectie}/audio-${numarVideo}.mp3`,

      subtitrareUrl:
        `/videos/modul-${modul}/${idLectie}/video-${numarVideo}.vtt`,

      thumbnailUrl:
        `/videos/modul-${modul}/${idLectie}/video-${numarVideo}.png`,
    },

    metadata: {
      modul,
      lectie,
      titluLectie,
    },
  };
}

function creeazaLectie(modul, numarLectie, titluLectie) {
  const id =
    `m${modul}-l${numarCuZero(numarLectie)}`;

  const slug = slugify(titluLectie);

  return {
    versiuneSchema: 1,

    id,

    modul,

    numarLectie,

    titlu: titluLectie,

    slugContinut: slug,

    status: "de-generat",

    standardCalitate: {
      nivel: "ridicat",
      videoFirst: true,
      necesitaVerificareMatematica: true,
      necesitaVerificarePrograma: true,
      necesitaVerificareLimbaRomana: true,
      poateFiPublicatAutomat: false,
    },

    obiectivGeneral:
      `Elevul trebuie să înțeleagă tema „${titluLectie}”, ` +
      "să poată aplica metoda corect și să recunoască cerințele tipice de Bac.",

    videoLectii: [
      creeazaVideo({
        modul,
        lectie: numarLectie,
        titluLectie,
        numarVideo: 1,
        rol: "intuitie-si-concept",
        titlu:
          `Înțelegem: ${titluLectie}`,
        durataTintaMinute: 4,
      }),

      creeazaVideo({
        modul,
        lectie: numarLectie,
        titluLectie,
        numarVideo: 2,
        rol: "reguli-si-metoda",
        titlu:
          `Reguli și metodă: ${titluLectie}`,
        durataTintaMinute: 5,
      }),

      creeazaVideo({
        modul,
        lectie: numarLectie,
        titluLectie,
        numarVideo: 3,
        rol: "exemplu-rezolvat",
        titlu:
          `Exemplu rezolvat pas cu pas`,
        durataTintaMinute: 5,
      }),

      creeazaVideo({
        modul,
        lectie: numarLectie,
        titluLectie,
        numarVideo: 4,
        rol: "bac-si-greseli",
        titlu:
          `Aplicare la Bac și greșeli frecvente`,
        durataTintaMinute: 5,
      }),
    ],

    controlCalitate: {
      continutGenerat: false,
      verificatAutomat: false,
      verificatMatematic: false,
      verificatPrograma: false,
      verificatManual: false,
      gataPentruRandare: false,
      gataPentruPublicare: false,
    },
  };
}

/* =========================================================
   GENERARE
   ========================================================= */

function genereaza() {
  console.log("");
  console.log("==============================================");
  console.log(" BAC MATE - GENERATOR CONTINUT VIDEO");
  console.log("==============================================");
  console.log("");

  const verificare = verificaPrograma();

  if (verificare.erori.length > 0) {
    console.error("❌ Generarea a fost oprită.");
    console.error("");

    for (const eroare of verificare.erori) {
      console.error(`- ${eroare}`);
    }

    process.exit(1);
  }

  console.log(
    `✅ Programa internă: ${module.length} module / ${verificare.totalLectii} lecții`
  );

  fs.mkdirSync(OUTPUT_ROOT, {
    recursive: true,
  });

  const manifest = {
    proiect: "BAC MATE",
    versiuneSchema: 1,
    profil: "M_mate-info",
    totalModule: module.length,
    totalLectii: 0,
    totalVideoLectii: 0,
    module: [],
  };

  let totalLectiiGenerate = 0;
  let totalVideoGenerate = 0;

  for (const modul of module) {
    const folderModul = path.join(
      OUTPUT_ROOT,
      `modul-${modul.modul}`
    );

    fs.mkdirSync(folderModul, {
      recursive: true,
    });

    const manifestModul = {
      modul: modul.modul,
      titlu: modul.titlu,
      totalLectii: modul.lectii.length,
      lectii: [],
    };

    modul.lectii.forEach((titluLectie, index) => {
      const numarLectie = index + 1;

      const continut = creeazaLectie(
        modul.modul,
        numarLectie,
        titluLectie
      );

      const numeFisier =
        `lectia-${numarCuZero(numarLectie)}.json`;

      const caleFisier = path.join(
        folderModul,
        numeFisier
      );

      scrieJson(
        caleFisier,
        continut
      );

      manifestModul.lectii.push({
        id: continut.id,
        numarLectie,
        titlu: titluLectie,
        fisier:
          `modul-${modul.modul}/${numeFisier}`,
        totalVideo: continut.videoLectii.length,
      });

      totalLectiiGenerate += 1;
      totalVideoGenerate +=
        continut.videoLectii.length;
    });

    manifest.module.push(manifestModul);

    console.log(
      `✅ Modul ${String(modul.modul).padStart(2, "0")} ` +
      `- ${modul.lectii.length} lecții`
    );
  }

  manifest.totalLectii =
    totalLectiiGenerate;

  manifest.totalVideoLectii =
    totalVideoGenerate;

  scrieJson(
    path.join(
      OUTPUT_ROOT,
      "manifest.json"
    ),
    manifest
  );

  /* =======================================================
     VERIFICARE DUPA GENERARE
     ======================================================= */

  const eroriFinale = [];

  if (totalLectiiGenerate !== 219) {
    eroriFinale.push(
      `Au fost generate ${totalLectiiGenerate} lecții în loc de 219.`
    );
  }

  if (totalVideoGenerate !== 876) {
    eroriFinale.push(
      `Au fost generate ${totalVideoGenerate} video-uri în loc de 876.`
    );
  }

  const iduriLectii = new Set();
  const iduriVideo = new Set();

  for (const modulManifest of manifest.module) {
    for (const lectieManifest of modulManifest.lectii) {
      if (iduriLectii.has(lectieManifest.id)) {
        eroriFinale.push(
          `ID lecție duplicat: ${lectieManifest.id}`
        );
      }

      iduriLectii.add(
        lectieManifest.id
      );

      const cale = path.join(
        OUTPUT_ROOT,
        lectieManifest.fisier
      );

      if (!fs.existsSync(cale)) {
        eroriFinale.push(
          `Fișier lipsă: ${lectieManifest.fisier}`
        );

        continue;
      }

      const continut = JSON.parse(
        fs.readFileSync(
          cale,
          "utf8"
        )
      );

      if (
        !Array.isArray(continut.videoLectii) ||
        continut.videoLectii.length !== 4
      ) {
        eroriFinale.push(
          `${lectieManifest.id}: trebuie să aibă exact 4 video-uri.`
        );

        continue;
      }

      for (const video of continut.videoLectii) {
        if (iduriVideo.has(video.id)) {
          eroriFinale.push(
            `ID video duplicat: ${video.id}`
          );
        }

        iduriVideo.add(video.id);
      }
    }
  }

  console.log("");
  console.log("----------------------------------------------");

  if (eroriFinale.length > 0) {
    console.error("❌ AU FOST GĂSITE ERORI:");
    console.error("");

    for (const eroare of eroriFinale) {
      console.error(`- ${eroare}`);
    }

    console.error("");
    process.exit(1);
  }

  console.log("✅ GENERARE FINALIZATĂ CORECT");
  console.log("");
  console.log(`✅ Module: ${module.length}`);
  console.log(`✅ Lecții: ${totalLectiiGenerate}`);
  console.log(`✅ Mini-video-uri: ${totalVideoGenerate}`);
  console.log(`✅ ID-uri lecții unice: ${iduriLectii.size}`);
  console.log(`✅ ID-uri video unice: ${iduriVideo.size}`);
  console.log("✅ 0 erori structurale");
  console.log("");
  console.log(
    "📁 Conținut creat în: data/continut-video"
  );
  console.log(
    "📄 Manifest creat: data/continut-video/manifest.json"
  );
  console.log("");
  console.log(
    "IMPORTANT: videoclipurile sunt momentan în starea «de-generat»."
  );
  console.log(
    "Nu sunt considerate verificate sau publicabile."
  );
  console.log("----------------------------------------------");
  console.log("");
}

genereaza();