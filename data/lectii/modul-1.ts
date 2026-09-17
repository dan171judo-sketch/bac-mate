import {
  lectiaCuantificatori,
  lectiaOperatiiLogice,
  lectiaOperatiiMultimi,
  lectiaInductiaMatematica,
  lectiaDemonstratii,
} from "../lectii-vechi";

import type { Lectie } from "./tipuri";

export const lectiaNumereReale: Lectie = {
  id: "numere-reale",
  slug: "numere-reale",
  modul: 1,
  numarLectie: 1,
  totalLectiiModul: 10,
  clasa: "Clasa a IX-a",
  profil: "M_mate-info",

  titlu: "Mulțimi de numere și operații cu numere reale",

  descriere:
    "În această lecție înveți mulțimile N, Z, Q și R, cum clasifici numerele și cum efectuezi corect operații cu numere reale.",

  obiective: [
    {
      icon: "🔢",
      titlu: "Să recunoști mulțimile de numere",
      descriere:
        "Vei înțelege diferența dintre numere naturale, întregi, raționale și reale.",
    },
    {
      icon: "🧠",
      titlu: "Să clasifici corect un număr",
      descriere:
        "Vei folosi relația N ⊂ Z ⊂ Q ⊂ R.",
    },
    {
      icon: "➗",
      titlu: "Să calculezi corect",
      descriere:
        "Vei aplica ordinea operațiilor în calcule cu numere reale.",
    },
  ],

  videoLectii: [
    {
      numar: 1,
      titlu: "N, Z, Q și R explicate simplu",
      durata: "4–5 min",
      descriere:
        "Înțelegi ce reprezintă cele patru mulțimi importante.",
      idei: [
        "N = numere naturale",
        "Z = numere întregi",
        "Q = numere raționale",
        "R = numere reale",
      ],
      exempluTitlu: "Exemplu rapid",
      exemplu:
        "-7 este întreg, rațional și real: -7 ∈ Z, -7 ∈ Q și -7 ∈ R.",
    },
    {
      numar: 2,
      titlu: "Rațional sau irațional?",
      durata: "4 min",
      descriere:
        "Înveți cum recunoști rapid numerele raționale și iraționale.",
      idei: [
        "O fracție a/b, cu b ≠ 0, este rațională.",
        "O zecimală finită este rațională.",
        "O zecimală periodică este rațională.",
        "√2 și π sunt iraționale.",
      ],
      exempluTitlu: "Exemplu rapid",
      exemplu:
        "0,25 = 1/4 este rațional, în timp ce √2 este irațional.",
    },
    {
      numar: 3,
      titlu: "Cum clasifici corect un număr",
      durata: "3–4 min",
      descriere:
        "Folosești relațiile de incluziune dintre mulțimi.",
      idei: [
        "N ⊂ Z",
        "Z ⊂ Q",
        "Q ⊂ R",
        "Un număr poate aparține mai multor mulțimi.",
      ],
      exempluTitlu: "Regula de memorat",
      exemplu:
        "N ⊂ Z ⊂ Q ⊂ R. Numărul 3 aparține tuturor celor patru mulțimi.",
    },
    {
      numar: 4,
      titlu: "Calcule cu numere reale",
      durata: "5 min",
      descriere:
        "Recapitulăm ordinea operațiilor.",
      idei: [
        "Mai întâi parantezele.",
        "Apoi puterile și radicalii.",
        "Apoi înmulțirile și împărțirile.",
        "La final adunările și scăderile.",
      ],
      exempluTitlu: "Exemplu rapid",
      exemplu:
        "2 - 3 × (-4) + 5 = 2 + 12 + 5 = 19.",
    },
  ],

  fisaRapida: {
    titlu: "Ce trebuie să reții",
    continut: [
      "N = numere naturale.",
      "Z = numere întregi.",
      "Q = numere raționale.",
      "R = numere reale.",
      "N ⊂ Z ⊂ Q ⊂ R.",
      "Zecimalele finite și periodice sunt raționale.",
      "√2 și π sunt iraționale.",
      "√9 = 3, deci √9 este rațional.",
    ],
  },

  exercitii: [
    {
      intrebare: "Cărei mulțimi îi aparține numărul -7?",
      variante: [
        "Doar numerelor naturale",
        "Numerelor întregi, raționale și reale",
        "Doar numerelor iraționale",
        "Doar numerelor reale",
      ],
      corect: 1,
      explicatie:
        "-7 este întreg, rațional și real.",
    },
    {
      intrebare: "Care număr este irațional?",
      variante: ["0,25", "√2", "-3", "7/5"],
      corect: 1,
      explicatie: "√2 este irațional.",
    },
    {
      intrebare: "Care relație este corectă?",
      variante: [
        "R ⊂ Q ⊂ Z ⊂ N",
        "N ⊂ Z ⊂ Q ⊂ R",
        "Z ⊂ N ⊂ R ⊂ Q",
        "Q ⊂ N ⊂ Z ⊂ R",
      ],
      corect: 1,
      explicatie:
        "Relația corectă este N ⊂ Z ⊂ Q ⊂ R.",
    },
    {
      intrebare: "Calculați: 3/4 + 5/6",
      variante: ["8/10", "19/12", "8/24", "13/12"],
      corect: 1,
      explicatie:
        "3/4 = 9/12 și 5/6 = 10/12. Suma este 19/12.",
    },
    {
      intrebare: "Care afirmație este adevărată?",
      variante: [
        "√9 este irațional",
        "π este rațional",
        "0,333... este rațional",
        "Orice număr real este rațional",
      ],
      corect: 2,
      explicatie:
        "0,333... = 1/3, deci este rațional.",
    },
    {
      intrebare: "Calculați: 2 - 3 × (-4) + 5",
      variante: ["-5", "19", "15", "-9"],
      corect: 1,
      explicatie:
        "3 × (-4) = -12, deci 2 - (-12) + 5 = 19.",
    },
  ],

  storageKeyFinalizata:
    "lectie-numere-reale-finalizata",
  storageKeyXp: "lectie-numere-reale-xp",

  urmatoareaLectie: {
    titlu: "Estimări și aproximări",
    href: "/lectii/estimari-aproximari",
  },
};

export const lectiaEstimariAproximari: Lectie = {
  id: "estimari-aproximari",
  slug: "estimari-aproximari",
  modul: 1,
  numarLectie: 2,
  totalLectiiModul: 10,
  clasa: "Clasa a IX-a",
  profil: "M_mate-info",

  titlu: "Estimări și aproximări",

  descriere:
    "Înveți să aproximezi numere reale prin lipsă și prin adaos și să alegi precizia potrivită.",

  obiective: [
    {
      icon: "🎯",
      titlu: "Să aproximezi",
      descriere:
        "Vei aproxima numere la unități, zecimi, sutimi și alte ordine.",
    },
    {
      icon: "⬇️",
      titlu: "Prin lipsă și prin adaos",
      descriere:
        "Vei înțelege diferența dintre cele două tipuri de aproximare.",
    },
    {
      icon: "📏",
      titlu: "Să alegi precizia",
      descriere:
        "Vei interpreta corect precizia unui rezultat.",
    },
  ],

  videoLectii: [
    {
      numar: 1,
      titlu: "Ce înseamnă aproximarea?",
      durata: "4 min",
      descriere:
        "Înțelegi de ce înlocuim uneori un număr cu unul apropiat.",
      idei: [
        "O aproximare este o valoare apropiată.",
        "Numărul aproximat este mai simplu de folosit.",
        "Precizia ne spune cât de fină este aproximarea.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "3,14159 poate fi aproximat la sutimi prin 3,14.",
    },
    {
      numar: 2,
      titlu: "Aproximarea prin lipsă",
      durata: "4 min",
      descriere:
        "Alegi o valoare apropiată care nu depășește numărul.",
      idei: [
        "Prin lipsă obținem o valoare mai mică sau egală.",
        "Respectăm ordinul de precizie cerut.",
        "Nu rotunjim automat.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Aproximarea prin lipsă la zecimi a lui 4,78 este 4,7.",
    },
    {
      numar: 3,
      titlu: "Aproximarea prin adaos",
      durata: "4 min",
      descriere:
        "Alegi o valoare apropiată mai mare sau egală cu numărul.",
      idei: [
        "Prin adaos obținem o valoare mai mare sau egală.",
        "Respectăm precizia indicată.",
        "Este diferită de aproximarea prin lipsă.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Aproximarea prin adaos la zecimi a lui 4,72 este 4,8.",
    },
    {
      numar: 4,
      titlu: "Rotunjirea",
      durata: "4–5 min",
      descriere:
        "Folosești cifra următoare pentru a decide rotunjirea.",
      idei: [
        "Dacă cifra următoare este 0–4, păstrăm cifra.",
        "Dacă este 5–9, mărim cifra cu 1.",
        "Rotunjirea nu este același lucru cu aproximarea prin lipsă.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "3,47 rotunjit la zecimi este 3,5.",
    },
  ],

  fisaRapida: {
    titlu: "Reguli rapide",
    continut: [
      "Prin lipsă: valoare mai mică sau egală.",
      "Prin adaos: valoare mai mare sau egală.",
      "La rotunjire ne uităm la cifra imediat următoare.",
      "0–4 → păstrăm cifra.",
      "5–9 → mărim cifra cu 1.",
    ],
  },

  exercitii: [
    {
      intrebare:
        "Care este aproximarea prin lipsă la zecimi a lui 5,78?",
      variante: ["5,7", "5,8", "5,78", "6"],
      corect: 0,
      explicatie:
        "Prin lipsă la zecimi obținem 5,7.",
    },
    {
      intrebare:
        "Care este aproximarea prin adaos la zecimi a lui 5,72?",
      variante: ["5,7", "5,8", "5,72", "6"],
      corect: 1,
      explicatie:
        "Prin adaos la zecimi obținem 5,8.",
    },
    {
      intrebare: "Rotunjiți 8,46 la zecimi.",
      variante: ["8,4", "8,5", "8,46", "9"],
      corect: 1,
      explicatie:
        "Cifra sutimilor este 6, deci 8,4 devine 8,5.",
    },
    {
      intrebare: "Rotunjiți 12,342 la sutimi.",
      variante: ["12,34", "12,35", "12,3", "12,342"],
      corect: 0,
      explicatie:
        "Cifra miimilor este 2, deci păstrăm sutimea: 12,34.",
    },
    {
      intrebare:
        "Care afirmație despre aproximarea prin lipsă este corectă?",
      variante: [
        "Este întotdeauna mai mare decât numărul.",
        "Este mai mică sau egală cu numărul.",
        "Este întotdeauna egală cu rotunjirea.",
        "Nu depinde de precizie.",
      ],
      corect: 1,
      explicatie:
        "Aproximarea prin lipsă nu depășește numărul inițial.",
    },
    {
      intrebare:
        "Rotunjiți 2,995 la sutimi.",
      variante: ["2,99", "3,00", "2,90", "2,95"],
      corect: 1,
      explicatie:
        "Cifra miimilor este 5, deci rotunjim în sus: 3,00.",
    },
  ],

  storageKeyFinalizata:
    "lectie-estimari-aproximari-finalizata",
  storageKeyXp:
    "lectie-estimari-aproximari-xp",

  urmatoareaLectie: {
    titlu: "Modulul unui număr real",
    href: "/lectii/modul-numar-real",
  },
};

export const lectiaModulNumarReal: Lectie = {
  id: "modul-numar-real",
  slug: "modul-numar-real",
  modul: 1,
  numarLectie: 3,
  totalLectiiModul: 10,
  clasa: "Clasa a IX-a",
  profil: "M_mate-info",

  titlu: "Modulul unui număr real",

  descriere:
    "În această lecție vei înțelege ce înseamnă |x|, cum se calculează modulul și de ce poate fi interpretat ca o distanță.",

  obiective: [
    {
      icon: "📍",
      titlu: "Să înțelegi modulul",
      descriere:
        "Vei interpreta |x| ca distanța de la x la 0.",
    },
    {
      icon: "🧮",
      titlu: "Să calculezi",
      descriere:
        "Vei calcula modulul numerelor pozitive, negative și al lui 0.",
    },
    {
      icon: "📏",
      titlu: "Să folosești distanța",
      descriere:
        "Vei folosi modulul pentru distanțe și ecuații simple.",
    },
  ],

  videoLectii: [
    {
      numar: 1,
      titlu: "Ce este modulul?",
      durata: "4 min",
      descriere:
        "Modulul reprezintă distanța față de zero.",
      idei: [
        "|x| ≥ 0 pentru orice număr real x.",
        "|5| = 5.",
        "|-5| = 5.",
        "|0| = 0.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Numerele -4 și 4 sunt ambele la distanța 4 față de 0.",
    },
    {
      numar: 2,
      titlu: "Formula modulului",
      durata: "4 min",
      descriere:
        "Înțelegi definiția în funcție de semnul lui x.",
      idei: [
        "Dacă x ≥ 0, atunci |x| = x.",
        "Dacă x < 0, atunci |x| = -x.",
        "Rezultatul modulului nu este negativ.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Pentru x = -7 avem |-7| = -(-7) = 7.",
    },
    {
      numar: 3,
      titlu: "Ecuații simple cu modul",
      durata: "4–5 min",
      descriere:
        "Rezolvi ecuații de forma |x| = a.",
      idei: [
        "Dacă a > 0, avem două soluții: x = a și x = -a.",
        "Dacă a = 0, avem soluția x = 0.",
        "Dacă a < 0, ecuația nu are soluții reale.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "|x| = 4 are soluțiile x = 4 și x = -4.",
    },
    {
      numar: 4,
      titlu: "Distanța dintre două numere",
      durata: "4 min",
      descriere:
        "Aplici formula distanței pe axa numerelor.",
      idei: [
        "Distanța dintre a și b este |a - b|.",
        "Distanța este întotdeauna nenegativă.",
        "|a - b| = |b - a|.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Distanța dintre -2 și 5 este |-2 - 5| = |-7| = 7.",
    },
  ],

  fisaRapida: {
    titlu: "Modul în 30 de secunde",
    continut: [
      "|x| reprezintă distanța de la x la 0.",
      "|x| ≥ 0.",
      "Dacă x ≥ 0, |x| = x.",
      "Dacă x < 0, |x| = -x.",
      "|x| = a, a > 0 → x = ±a.",
      "Distanța dintre a și b este |a - b|.",
    ],
  },

  exercitii: [
    {
      intrebare: "Cât este |-8|?",
      variante: ["-8", "8", "0", "Nu există"],
      corect: 1,
      explicatie:
        "Modulul reprezintă distanța față de zero. |-8| = 8.",
    },
    {
      intrebare: "Cât este |5|?",
      variante: ["-5", "0", "5", "10"],
      corect: 2,
      explicatie:
        "5 este pozitiv, deci |5| = 5.",
    },
    {
      intrebare: "Cât este |0|?",
      variante: ["0", "1", "-1", "Nu există"],
      corect: 0,
      explicatie:
        "Numărul 0 se află la distanța 0 față de el însuși.",
    },
    {
      intrebare: "Care sunt soluțiile ecuației |x| = 4?",
      variante: [
        "Doar x = 4",
        "Doar x = -4",
        "x = 4 sau x = -4",
        "Ecuația nu are soluții",
      ],
      corect: 2,
      explicatie:
        "Atât 4, cât și -4 au modulul egal cu 4.",
    },
    {
      intrebare: "Ecuația |x| = -3 are:",
      variante: [
        "O soluție",
        "Două soluții",
        "Infinit de multe soluții",
        "Nicio soluție",
      ],
      corect: 3,
      explicatie:
        "Modulul unui număr real nu poate fi negativ.",
    },
    {
      intrebare:
        "Care este distanța dintre numerele -2 și 5?",
      variante: ["3", "5", "7", "-7"],
      corect: 2,
      explicatie:
        "|-2 - 5| = |-7| = 7.",
    },
  ],

  storageKeyFinalizata:
    "lectie-modul-numar-real-finalizata",
  storageKeyXp:
    "lectie-modul-numar-real-xp",

  urmatoareaLectie: {
    titlu: "Intervale de numere reale",
    href: "/lectii/intervale-numere-reale",
  },
};

export const lectiaIntervaleNumereReale: Lectie = {
  id: "intervale-numere-reale",
  slug: "intervale-numere-reale",
  modul: 1,
  numarLectie: 4,
  totalLectiiModul: 10,
  clasa: "Clasa a IX-a",
  profil: "M_mate-info",

  titlu: "Intervale de numere reale",

  descriere:
    "Înveți să citești și să scrii intervale, să verifici apartenența unui număr și să transformi inecuații simple în intervale.",

  obiective: [
    {
      icon: "↔️",
      titlu: "Să citești intervale",
      descriere:
        "Vei înțelege capetele incluse și neincluse.",
    },
    {
      icon: "✍️",
      titlu: "Să scrii intervale",
      descriere:
        "Vei transforma condiții cu inegalități în notație de interval.",
    },
    {
      icon: "✅",
      titlu: "Să verifici apartenența",
      descriere:
        "Vei stabili dacă un număr aparține unui interval.",
    },
  ],

  videoLectii: [
    {
      numar: 1,
      titlu: "Ce este un interval?",
      durata: "4 min",
      descriere:
        "Înțelegi intervalele ca mulțimi de numere reale.",
      idei: [
        "[a,b] include ambele capete.",
        "]a,b[ nu include capetele.",
        "[a,b[ include a, dar nu b.",
        "]a,b] nu include a, dar include b.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "[2,5] conține toate numerele reale dintre 2 și 5, inclusiv 2 și 5.",
    },
    {
      numar: 2,
      titlu: "Paranteze și inegalități",
      durata: "4–5 min",
      descriere:
        "Legi simbolurile <, ≤, > și ≥ de notația intervalelor.",
      idei: [
        "≤ sau ≥ înseamnă că valoarea este inclusă.",
        "< sau > înseamnă că valoarea nu este inclusă.",
        "În notația folosită uzual în România: ]a,b[ pentru interval deschis.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "-3 ≤ x < 6 se scrie x ∈ [-3,6[.",
    },
    {
      numar: 3,
      titlu: "Intervale nemărginite",
      durata: "4 min",
      descriere:
        "Înveți intervalele care conțin ±∞.",
      idei: [
        "∞ și -∞ nu sunt numere reale.",
        "Infinitul nu este inclus niciodată.",
        "x ≤ 4 înseamnă x ∈ ]-∞,4].",
        "x ≥ 2 înseamnă x ∈ [2,+∞[.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "x > -1 se scrie x ∈ ]-1,+∞[.",
    },
    {
      numar: 4,
      titlu: "Apartenența la interval",
      durata: "4 min",
      descriere:
        "Verifici rapid dacă un număr aparține intervalului.",
      idei: [
        "Comparăm numărul cu limitele intervalului.",
        "Verificăm dacă extremitățile sunt incluse.",
        "Citirea atentă a parantezelor este esențială.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "3 ∈ [1,5], iar 5 ∉ [1,5[.",
    },
  ],

  fisaRapida: {
    titlu: "Intervale pe scurt",
    continut: [
      "[a,b] → a și b sunt incluse.",
      "]a,b[ → a și b nu sunt incluse.",
      "[a,b[ → a inclus, b exclus.",
      "]a,b] → a exclus, b inclus.",
      "Lângă -∞ și +∞ capătul este întotdeauna deschis.",
      "Notația internațională (a,b) este echivalentă cu ]a,b[.",
    ],
  },

  exercitii: [
    {
      intrebare:
        "Ce interval corespunde condiției 2 ≤ x ≤ 5?",
      variante: ["[2,5]", "]2,5[", "[2,5[", "]2,5]"],
      corect: 0,
      explicatie:
        "Ambele capete sunt incluse, deci intervalul este [2,5].",
    },
    {
      intrebare:
        "Ce interval corespunde condiției 2 < x < 5?",
      variante: ["[2,5]", "]2,5[", "[2,5[", "]2,5]"],
      corect: 1,
      explicatie:
        "Niciun capăt nu este inclus: ]2,5[.",
    },
    {
      intrebare:
        "Care interval reprezintă x ≥ 2?",
      variante: [
        "[2,+∞[",
        "]2,+∞[",
        "]-∞,2]",
        "]-∞,2[",
      ],
      corect: 0,
      explicatie:
        "2 este inclus, iar +∞ nu poate fi inclus: [2,+∞[.",
    },
    {
      intrebare:
        "Care interval reprezintă x < -1?",
      variante: [
        "[-1,+∞[",
        "]-1,+∞[",
        "]-∞,-1[",
        "]-∞,-1]",
      ],
      corect: 2,
      explicatie:
        "-1 nu este inclus, deci ]-∞,-1[.",
    },
    {
      intrebare:
        "Care este forma pentru -3 ≤ x < 6?",
      variante: [
        "[-3,6[",
        "]-3,6]",
        "[-3,6]",
        "]-3,6[",
      ],
      corect: 0,
      explicatie:
        "-3 este inclus, iar 6 este exclus: [-3,6[.",
    },
    {
      intrebare: "Care afirmație este corectă?",
      variante: [
        "Infinitul poate fi inclus.",
        "[1,+∞] este corect.",
        "Infinitul nu este niciodată inclus.",
        "+∞ este cel mai mare număr real.",
      ],
      corect: 2,
      explicatie:
        "+∞ și -∞ nu sunt numere reale și nu sunt incluse în interval.",
    },
  ],

  storageKeyFinalizata:
    "lectie-intervale-numere-reale-finalizata",
  storageKeyXp:
    "lectie-intervale-numere-reale-xp",

  urmatoareaLectie: {
    titlu: "Propoziții și predicate",
    href: "/lectii/propozitii-predicate",
  },
};

export const lectiaPropozitiiPredicate: Lectie = {
  id: "propozitii-predicate",
  slug: "propozitii-predicate",
  modul: 1,
  numarLectie: 5,
  totalLectiiModul: 10,
  clasa: "Clasa a IX-a",
  profil: "M_mate-info",

  titlu: "Propoziții și predicate",

  descriere:
    "În această lecție vei înțelege diferența dintre o propoziție matematică și un predicat și vei învăța să găsești mulțimea de adevăr.",

  obiective: [
    {
      icon: "✅",
      titlu: "Să recunoști propoziții",
      descriere:
        "Vei identifica enunțurile adevărate sau false.",
    },
    {
      icon: "🔤",
      titlu: "Să recunoști predicate",
      descriere:
        "Vei observa când adevărul depinde de o variabilă.",
    },
    {
      icon: "🎯",
      titlu: "Să găsești mulțimea de adevăr",
      descriere:
        "Vei determina valorile pentru care predicatul este adevărat.",
    },
  ],

  videoLectii: [
    {
      numar: 1,
      titlu: "Ce este o propoziție matematică?",
      durata: "3–4 min",
      descriere:
        "Înveți ce înseamnă valoare de adevăr.",
      idei: [
        "O propoziție are o valoare de adevăr.",
        "Poate fi adevărată sau falsă.",
        "O întrebare nu este propoziție matematică.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "2 + 3 = 5 este propoziție adevărată.",
    },
    {
      numar: 2,
      titlu: "Ce este un predicat?",
      durata: "4 min",
      descriere:
        "Înțelegi enunțurile care depind de o variabilă.",
      idei: [
        "Predicatul conține una sau mai multe variabile.",
        "Adevărul depinde de valorile variabilelor.",
        "Prin înlocuire obținem o propoziție.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "P(x): x + 2 = 5 este adevărat pentru x = 3.",
    },
    {
      numar: 3,
      titlu: "Propoziție sau predicat?",
      durata: "4–5 min",
      descriere:
        "Înveți să faci rapid diferența.",
      idei: [
        "Valoare de adevăr deja stabilită → propoziție.",
        "Adevăr dependent de variabilă → predicat.",
        "Întrebările și comenzile nu sunt propoziții matematice.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "5 > 2 este propoziție, iar x > 2 este predicat.",
    },
    {
      numar: 4,
      titlu: "Mulțimea de adevăr",
      durata: "4–5 min",
      descriere:
        "Determini valorile care fac predicatul adevărat.",
      idei: [
        "Pornim de la domeniul variabilei.",
        "Rezolvăm condiția.",
        "Păstrăm valorile admise.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "P(x): x > 2, x ∈ {1,2,3,4} are mulțimea de adevăr {3,4}.",
    },
  ],

  fisaRapida: {
    titlu: "Diferența esențială",
    continut: [
      "Propoziție = enunț adevărat sau fals.",
      "Predicat = enunț al cărui adevăr depinde de variabilă.",
      "Prin atribuirea unei valori, predicatul devine propoziție.",
      "Mulțimea de adevăr conține valorile care fac predicatul adevărat.",
    ],
  },

  exercitii: [
    {
      intrebare: "Care enunț este propoziție matematică?",
      variante: [
        "x + 2 = 7",
        "Cât este 2 + 2?",
        "3 + 4 = 7",
        "Calculează suma",
      ],
      corect: 2,
      explicatie:
        "3 + 4 = 7 are o valoare de adevăr clară.",
    },
    {
      intrebare: "„9 este număr par” este:",
      variante: [
        "Predicat",
        "Propoziție adevărată",
        "Propoziție falsă",
        "Nu este enunț matematic",
      ],
      corect: 2,
      explicatie:
        "Este o propoziție falsă.",
    },
    {
      intrebare: "Care este un predicat?",
      variante: [
        "5 < 8",
        "x + 1 = 4",
        "10 este număr natural",
        "2 + 2 = 4",
      ],
      corect: 1,
      explicatie:
        "Adevărul lui x + 1 = 4 depinde de x.",
    },
    {
      intrebare:
        "Pentru P(x): x + 1 = 4, ce valoare îl face adevărat?",
      variante: ["1", "2", "3", "4"],
      corect: 2,
      explicatie: "x + 1 = 4 ⇒ x = 3.",
    },
    {
      intrebare:
        "P(x): x > 2, cu x ∈ {1,2,3,4}. Care este mulțimea de adevăr?",
      variante: [
        "{1,2}",
        "{2,3}",
        "{3,4}",
        "{1,4}",
      ],
      corect: 2,
      explicatie:
        "Valorile mai mari decât 2 sunt 3 și 4.",
    },
    {
      intrebare: "Care afirmație este corectă?",
      variante: [
        "Orice întrebare este propoziție.",
        "Un predicat are mereu aceeași valoare de adevăr.",
        "O propoziție poate fi adevărată sau falsă.",
        "O propoziție trebuie să conțină o variabilă.",
      ],
      corect: 2,
      explicatie:
        "O propoziție matematică poate fi adevărată sau falsă.",
    },
  ],

  storageKeyFinalizata:
    "lectie-propozitii-predicate-finalizata",
  storageKeyXp:
    "lectie-propozitii-predicate-xp",

  urmatoareaLectie: {
    titlu: "Cuantificatori",
    href: "/lectii/cuantificatori",
  },
};

export {
  lectiaCuantificatori,
  lectiaOperatiiLogice,
  lectiaOperatiiMultimi,
  lectiaInductiaMatematica,
  lectiaDemonstratii,
};

export const lectiiModul1: Lectie[] = [
  lectiaNumereReale,
  lectiaEstimariAproximari,
  lectiaModulNumarReal,
  lectiaIntervaleNumereReale,
  lectiaPropozitiiPredicate,
  lectiaCuantificatori,
  lectiaOperatiiLogice,
  lectiaOperatiiMultimi,
  lectiaInductiaMatematica,
  lectiaDemonstratii,
];