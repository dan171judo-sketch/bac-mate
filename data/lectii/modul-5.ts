import type { Lectie } from "./tipuri";

type ConfigModul = {
  modul: number;
  clasa: string;
  nume: string;
  lectii: string[];
};

function slugify(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function creeazaModul(config: ConfigModul): Lectie[] {
  const totalLectiiModul = config.lectii.length;

  return config.lectii.map((titlu, index) => {
    const numarLectie = index + 1;
    const slug = `m${config.modul}-${slugify(titlu)}`;
    const urmatoarea = config.lectii[index + 1];

    const lectie: Lectie = {
      id: slug,
      slug,
      modul: config.modul,
      numarLectie,
      totalLectiiModul,
      clasa: config.clasa,
      profil: "M_mate-info",

      titlu,

      descriere: `${config.nume} — Lecția ${numarLectie} din ${totalLectiiModul}.`,

      obiective: [
        {
          icon: "🧠",
          titlu: "Înțelege",
          descriere: `Înțelege noțiunile esențiale din „${titlu}”.`,
        },
        {
          icon: "✍️",
          titlu: "Aplică",
          descriere: "Urmărește metoda și aplic-o în exerciții.",
        },
        {
          icon: "🎯",
          titlu: "Pregătire BAC",
          descriere: "Leagă noțiunea de tipurile de cerințe întâlnite la Bac.",
        },
      ],

      videoLectii: [
        {
          numar: 1,
          titlu,
          durata: "5–8 min",
          descriere: `Introducere în lecția „${titlu}”.`,
          idei: [
            "Noțiunile principale",
            "Regulile și formulele importante",
            "Metoda de rezolvare",
            "Greșeli frecvente",
          ],
          exempluTitlu: "Exemplu ghidat",
          exemplu:
            "Conținutul matematic detaliat și verificat pentru această lecție va fi completat în etapa de dezvoltare a conținutului.",
        },
      ],

      fisaRapida: {
        titlu: "Fișa rapidă",
        continut: [
          `Tema lecției: ${titlu}`,
          "Identifică datele problemei.",
          "Alege regula sau formula potrivită.",
          "Rezolvă pas cu pas și verifică rezultatul.",
        ],
      },

      exercitii: [
        {
          intrebare: "Care este tema acestei lecții?",
          variante: [
            titlu,
            "Statistică descriptivă",
            "Geometrie în spațiu",
            "Numere naturale",
          ],
          corect: 0,
          explicatie: `Tema lecției este „${titlu}”.`,
        },
      ],

      storageKeyFinalizata: `bac-mate-${slug}-finalizata`,
      storageKeyXp: `bac-mate-${slug}-xp`,

      ...(urmatoarea
        ? {
            urmatoareaLectie: {
              titlu: urmatoarea,
              href: `/lectii/m${config.modul}-${slugify(urmatoarea)}`,
            },
          }
        : {}),
    };

    return lectie;
  });
}

/* =========================================================
   MODULUL 5
   Vectori, trigonometrie și geometrie
========================================================= */

export const lectiiModul5 = creeazaModul({
  modul: 5,
  clasa: "Clasa a IX-a",
  nume: "Vectori, trigonometrie și geometrie",
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
});

/* =========================================================
   MODULUL 6
   Puteri, radicali și logaritmi
========================================================= */

export const lectiiModul6 = creeazaModul({
  modul: 6,
  clasa: "Clasa a X-a",
  nume: "Puteri, radicali și logaritmi",
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
});

/* =========================================================
   MODULUL 7
========================================================= */

export const lectiiModul7 = creeazaModul({
  modul: 7,
  clasa: "Clasa a X-a",
  nume: "Funcții exponențiale, logaritmice și trigonometrice",
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
});

/* =========================================================
   MODULUL 8
========================================================= */

export const lectiiModul8 = creeazaModul({
  modul: 8,
  clasa: "Clasa a X-a",
  nume: "Numere complexe",
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
});

/* =========================================================
   MODULUL 9
========================================================= */

export const lectiiModul9 = creeazaModul({
  modul: 9,
  clasa: "Clasa a X-a",
  nume: "Combinatorică și probabilități",
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
});

/* =========================================================
   MODULUL 10
========================================================= */

export const lectiiModul10 = creeazaModul({
  modul: 10,
  clasa: "Clasa a X-a",
  nume: "Geometrie analitică",
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
});

/* =========================================================
   MODULUL 11
========================================================= */

export const lectiiModul11 = creeazaModul({
  modul: 11,
  clasa: "Clasa a XI-a",
  nume: "Matrice și determinanți",
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
});

/* =========================================================
   MODULUL 12
========================================================= */

export const lectiiModul12 = creeazaModul({
  modul: 12,
  clasa: "Clasa a XI-a",
  nume: "Sisteme de ecuații liniare",
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
});

/* =========================================================
   MODULUL 13
========================================================= */

export const lectiiModul13 = creeazaModul({
  modul: 13,
  clasa: "Clasa a XI-a",
  nume: "Șiruri, limite și continuitate",
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
});

/* =========================================================
   MODULUL 14
========================================================= */

export const lectiiModul14 = creeazaModul({
  modul: 14,
  clasa: "Clasa a XI-a",
  nume: "Derivate și studiul funcțiilor",
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
});

/* =========================================================
   MODULUL 15
========================================================= */

export const lectiiModul15 = creeazaModul({
  modul: 15,
  clasa: "Clasa a XII-a",
  nume: "Structuri algebrice",
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
});

/* =========================================================
   MODULUL 16
========================================================= */

export const lectiiModul16 = creeazaModul({
  modul: 16,
  clasa: "Clasa a XII-a",
  nume: "Polinoame",
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
});

/* =========================================================
   MODULUL 17
========================================================= */

export const lectiiModul17 = creeazaModul({
  modul: 17,
  clasa: "Clasa a XII-a",
  nume: "Primitive și integrale",
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
});

/* =========================================================
   TOATE MODULELE 5–17
========================================================= */

export const lectiiModule5La17: Lectie[] = [
  ...lectiiModul5,
  ...lectiiModul6,
  ...lectiiModul7,
  ...lectiiModul8,
  ...lectiiModul9,
  ...lectiiModul10,
  ...lectiiModul11,
  ...lectiiModul12,
  ...lectiiModul13,
  ...lectiiModul14,
  ...lectiiModul15,
  ...lectiiModul16,
  ...lectiiModul17,
];