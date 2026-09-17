import type { Lectie } from "./tipuri";

export const lectiaFunctiaGradulIntai: Lectie = {
  id: "functia-gradul-intai",
  slug: "functia-gradul-intai",
  modul: 3,
  numarLectie: 1,
  totalLectiiModul: 9,
  clasa: "Clasa a IX-a",
  profil: "M_mate-info",

  titlu: "Funcția f(x) = ax + b",

  descriere:
    "Înveți forma funcției de gradul I, rolul coeficienților a și b și cum calculezi rapid valorile funcției.",

  obiective: [
    {
      icon: "🔎",
      titlu: "Să recunoști funcția",
      descriere:
        "Vei identifica funcțiile de forma f(x) = ax + b.",
    },
    {
      icon: "🧮",
      titlu: "Să calculezi valori",
      descriere:
        "Vei determina f(x) pentru diferite valori ale lui x.",
    },
    {
      icon: "🧠",
      titlu: "Să înțelegi coeficienții",
      descriere:
        "Vei înțelege rolul numerelor a și b.",
    },
  ],

  videoLectii: [
    {
      numar: 1,
      titlu: "Cum recunoști o funcție de gradul I",
      durata: "4 min",
      descriere:
        "Pornim de la forma generală f(x) = ax + b.",
      idei: [
        "Forma este f(x) = ax + b.",
        "a și b sunt numere reale.",
        "Pentru funcția de gradul I avem a ≠ 0.",
        "x este variabila independentă.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "f(x) = 2x + 3 este funcție de gradul I, cu a = 2 și b = 3.",
    },
    {
      numar: 2,
      titlu: "Cum calculezi f(x)",
      durata: "4 min",
      descriere:
        "Înlocuiești x cu valoarea cerută.",
      idei: [
        "Scriem formula funcției.",
        "Înlocuim x.",
        "Respectăm ordinea operațiilor.",
        "Calculăm rezultatul.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Pentru f(x) = 2x + 3 avem f(4) = 2 × 4 + 3 = 11.",
    },
    {
      numar: 3,
      titlu: "Rolul lui a",
      durata: "4 min",
      descriere:
        "Coeficientul a influențează direcția și înclinarea dreptei.",
      idei: [
        "a este coeficientul lui x.",
        "a > 0 conduce la o funcție crescătoare.",
        "a < 0 conduce la o funcție descrescătoare.",
        "Valoarea lui |a| influențează înclinarea graficului.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "În f(x) = -3x + 2 avem a = -3, deci funcția este descrescătoare.",
    },
    {
      numar: 4,
      titlu: "Rolul lui b",
      durata: "3–4 min",
      descriere:
        "Coeficientul b arată valoarea funcției pentru x = 0.",
      idei: [
        "f(0) = b.",
        "Graficul trece prin punctul (0,b).",
        "b reprezintă intersecția cu axa Oy.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Pentru f(x) = 5x - 2 avem f(0) = -2, deci graficul trece prin (0,-2).",
    },
  ],

  fisaRapida: {
    titlu: "Funcția de gradul I pe scurt",
    continut: [
      "f(x) = ax + b, cu a ≠ 0.",
      "a = coeficientul lui x.",
      "b = termenul liber.",
      "f(0) = b.",
      "Pentru a calcula f(x), înlocuiești x cu valoarea cerută.",
    ],
  },

  exercitii: [
    {
      intrebare:
        "Care dintre următoarele este o funcție de gradul I?",
      variante: [
        "f(x) = x² + 1",
        "f(x) = 3x - 5",
        "f(x) = 7",
        "f(x) = 1/x",
      ],
      corect: 1,
      explicatie:
        "3x - 5 are forma ax + b, cu a = 3 ≠ 0.",
    },
    {
      intrebare:
        "Pentru f(x) = 2x + 1, cât este f(3)?",
      variante: ["5", "6", "7", "8"],
      corect: 2,
      explicatie:
        "f(3) = 2 × 3 + 1 = 7.",
    },
    {
      intrebare:
        "În funcția f(x) = -4x + 7, coeficientul a este:",
      variante: ["7", "-4", "4", "-7"],
      corect: 1,
      explicatie:
        "Coeficientul lui x este -4.",
    },
    {
      intrebare:
        "În funcția f(x) = 5x - 3, cât este f(0)?",
      variante: ["5", "0", "-3", "3"],
      corect: 2,
      explicatie:
        "f(0) = 5 × 0 - 3 = -3.",
    },
    {
      intrebare:
        "Pentru f(x) = -2x + 4, cât este f(-1)?",
      variante: ["2", "4", "6", "-6"],
      corect: 2,
      explicatie:
        "f(-1) = -2 × (-1) + 4 = 6.",
    },
    {
      intrebare:
        "Dacă f(x) = ax + b și f(0) = 8, atunci:",
      variante: ["a = 8", "b = 8", "a + b = 8", "x = 8"],
      corect: 1,
      explicatie:
        "f(0) = a × 0 + b = b, deci b = 8.",
    },
  ],

  storageKeyFinalizata:
    "lectie-functia-gradul-intai-finalizata",
  storageKeyXp:
    "lectie-functia-gradul-intai-xp",

  urmatoareaLectie: {
    titlu: "Graficul funcției de gradul I",
    href: "/lectii/grafic-functie-gradul-intai",
  },
};

export const lectiaGraficFunctieGradulIntai: Lectie = {
  id: "grafic-functie-gradul-intai",
  slug: "grafic-functie-gradul-intai",
  modul: 3,
  numarLectie: 2,
  totalLectiiModul: 9,
  clasa: "Clasa a IX-a",
  profil: "M_mate-info",

  titlu: "Graficul funcției de gradul I",

  descriere:
    "Înveți să construiești graficul unei funcții de forma f(x) = ax + b folosind două puncte.",

  obiective: [
    {
      icon: "📈",
      titlu: "Să construiești graficul",
      descriere:
        "Vei reprezenta funcția printr-o dreaptă.",
    },
    {
      icon: "📍",
      titlu: "Să găsești două puncte",
      descriere:
        "Vei calcula coordonate suficiente pentru trasarea dreptei.",
    },
    {
      icon: "✂️",
      titlu: "Să găsești intersecțiile",
      descriere:
        "Vei determina punctele de intersecție cu axele.",
    },
  ],

  videoLectii: [
    {
      numar: 1,
      titlu: "De ce graficul este o dreaptă?",
      durata: "4 min",
      descriere:
        "Funcția de gradul I are ca reprezentare grafică o dreaptă.",
      idei: [
        "Graficul lui f(x) = ax + b este o dreaptă.",
        "Două puncte distincte determină o dreaptă.",
        "Este suficient să calculăm două puncte.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Pentru f(x) = x + 1 putem folosi punctele (0,1) și (1,2).",
    },
    {
      numar: 2,
      titlu: "Metoda tabelului",
      durata: "4–5 min",
      descriere:
        "Alegi două valori pentru x și calculezi valorile lui y.",
      idei: [
        "Alegem două valori simple pentru x.",
        "Calculăm f(x).",
        "Obținem două puncte.",
        "Unim punctele printr-o dreaptă.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Pentru f(x) = 2x + 1: x = 0 → y = 1 și x = 1 → y = 3.",
    },
    {
      numar: 3,
      titlu: "Intersecția cu Oy",
      durata: "3 min",
      descriere:
        "Pentru Oy punem x = 0.",
      idei: [
        "Pe Oy avem x = 0.",
        "f(0) = b.",
        "Intersecția este (0,b).",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "f(x) = 3x - 6 intersectează Oy în punctul (0,-6).",
    },
    {
      numar: 4,
      titlu: "Intersecția cu Ox",
      durata: "4 min",
      descriere:
        "Pentru Ox punem y = 0.",
      idei: [
        "Pe Ox avem f(x) = 0.",
        "Rezolvăm ax + b = 0.",
        "Pentru a ≠ 0 obținem x = -b/a.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "3x - 6 = 0 ⇒ x = 2, deci intersecția cu Ox este (2,0).",
    },
  ],

  fisaRapida: {
    titlu: "Cum desenezi dreapta",
    continut: [
      "Graficul funcției de gradul I este o dreaptă.",
      "Două puncte distincte sunt suficiente.",
      "Intersecția cu Oy: x = 0.",
      "Intersecția cu Ox: f(x) = 0.",
      "Pentru f(x) = ax + b, rădăcina este x = -b/a.",
    ],
  },

  exercitii: [
    {
      intrebare:
        "Graficul unei funcții de gradul I este:",
      variante: ["O parabolă", "O dreaptă", "Un cerc", "O hiperbolă"],
      corect: 1,
      explicatie:
        "Funcția f(x) = ax + b, a ≠ 0, are graficul o dreaptă.",
    },
    {
      intrebare:
        "Pentru f(x) = 2x + 3, intersecția cu Oy este:",
      variante: ["(3,0)", "(0,3)", "(2,3)", "(0,2)"],
      corect: 1,
      explicatie:
        "Punem x = 0 și obținem y = 3.",
    },
    {
      intrebare:
        "Pentru f(x) = x - 4, intersecția cu Ox este:",
      variante: ["(0,-4)", "(4,0)", "(-4,0)", "(0,4)"],
      corect: 1,
      explicatie:
        "x - 4 = 0 ⇒ x = 4.",
    },
    {
      intrebare:
        "Ce două puncte aparțin graficului lui f(x) = x + 2?",
      variante: [
        "(0,2) și (1,3)",
        "(0,1) și (2,2)",
        "(2,0) și (3,1)",
        "(0,-2) și (1,-3)",
      ],
      corect: 0,
      explicatie:
        "f(0) = 2 și f(1) = 3.",
    },
    {
      intrebare:
        "Câte puncte distincte sunt suficiente pentru a determina o dreaptă?",
      variante: ["1", "2", "3", "4"],
      corect: 1,
      explicatie:
        "Prin două puncte distincte trece o singură dreaptă.",
    },
    {
      intrebare:
        "Pentru f(x) = -2x + 6, rădăcina funcției este:",
      variante: ["-3", "2", "3", "6"],
      corect: 2,
      explicatie:
        "-2x + 6 = 0 ⇒ x = 3.",
    },
  ],

  storageKeyFinalizata:
    "lectie-grafic-functie-gradul-intai-finalizata",
  storageKeyXp:
    "lectie-grafic-functie-gradul-intai-xp",

  urmatoareaLectie: {
    titlu: "Monotonia funcției de gradul I",
    href: "/lectii/monotonia-functiei-gradul-intai",
  },
};

export const lectiaMonotoniaFunctieiGradulIntai: Lectie = {
  id: "monotonia-functiei-gradul-intai",
  slug: "monotonia-functiei-gradul-intai",
  modul: 3,
  numarLectie: 3,
  totalLectiiModul: 9,
  clasa: "Clasa a IX-a",
  profil: "M_mate-info",

  titlu: "Monotonia funcției de gradul I",

  descriere:
    "Înveți să stabilești imediat dacă o funcție de gradul I este crescătoare sau descrescătoare.",

  obiective: [
    {
      icon: "📈",
      titlu: "Să recunoști creșterea",
      descriere:
        "Vei identifica funcțiile crescătoare.",
    },
    {
      icon: "📉",
      titlu: "Să recunoști descreșterea",
      descriere:
        "Vei identifica funcțiile descrescătoare.",
    },
    {
      icon: "⚡",
      titlu: "Să folosești coeficientul a",
      descriere:
        "Vei decide monotonia fără a desena graficul.",
    },
  ],

  videoLectii: [
    {
      numar: 1,
      titlu: "Ce înseamnă funcție crescătoare?",
      durata: "4 min",
      descriere:
        "Pe măsură ce x crește, valorile funcției cresc.",
      idei: [
        "Pentru funcția de gradul I contează semnul lui a.",
        "Dacă a > 0, funcția este strict crescătoare.",
        "Graficul urcă de la stânga la dreapta.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "f(x) = 3x + 1 este crescătoare deoarece 3 > 0.",
    },
    {
      numar: 2,
      titlu: "Ce înseamnă funcție descrescătoare?",
      durata: "4 min",
      descriere:
        "Pe măsură ce x crește, valorile funcției scad.",
      idei: [
        "Dacă a < 0, funcția este strict descrescătoare.",
        "Graficul coboară de la stânga la dreapta.",
        "Termenul b nu schimbă monotonia.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "f(x) = -2x + 5 este descrescătoare deoarece -2 < 0.",
    },
    {
      numar: 3,
      titlu: "De ce b nu contează pentru monotonie",
      durata: "3–4 min",
      descriere:
        "b deplasează dreapta, dar nu schimbă sensul ei.",
      idei: [
        "Semnul lui a decide monotonia.",
        "b schimbă intersecția cu Oy.",
        "Două funcții cu același a au aceeași monotonie.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "2x + 1 și 2x - 100 sunt ambele crescătoare.",
    },
    {
      numar: 4,
      titlu: "Decizia rapidă la exerciții",
      durata: "3 min",
      descriere:
        "Te uiți doar la coeficientul lui x.",
      idei: [
        "Identifică a.",
        "a > 0 → crescătoare.",
        "a < 0 → descrescătoare.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Pentru f(x) = -7x + 20 nu este nevoie de grafic: a = -7 < 0.",
    },
  ],

  fisaRapida: {
    titlu: "Regula de memorat",
    continut: [
      "f(x) = ax + b.",
      "a > 0 → funcția este strict crescătoare.",
      "a < 0 → funcția este strict descrescătoare.",
      "b nu influențează monotonia.",
    ],
  },

  exercitii: [
    {
      intrebare:
        "Funcția f(x) = 4x - 7 este:",
      variante: ["Crescătoare", "Descrescătoare", "Constantă", "Periodicǎ"],
      corect: 0,
      explicatie:
        "a = 4 > 0, deci funcția este crescătoare.",
    },
    {
      intrebare:
        "Funcția f(x) = -3x + 2 este:",
      variante: ["Crescătoare", "Descrescătoare", "Constantă", "Pară"],
      corect: 1,
      explicatie:
        "a = -3 < 0, deci funcția este descrescătoare.",
    },
    {
      intrebare:
        "Ce coeficient determină monotonia lui f(x) = ax + b?",
      variante: ["Doar b", "a", "a + b", "x"],
      corect: 1,
      explicatie:
        "Semnul coeficientului a determină monotonia.",
    },
    {
      intrebare:
        "Care funcție este descrescătoare?",
      variante: [
        "f(x) = x + 1",
        "f(x) = 5x",
        "f(x) = -x + 7",
        "f(x) = 2x - 10",
      ],
      corect: 2,
      explicatie:
        "Coeficientul lui x este -1.",
    },
    {
      intrebare:
        "Funcțiile f(x) = 2x + 5 și g(x) = 2x - 9 sunt:",
      variante: [
        "Ambele crescătoare",
        "Ambele descrescătoare",
        "Una crescătoare și una descrescătoare",
        "Constante",
      ],
      corect: 0,
      explicatie:
        "Ambele au coeficientul a = 2 > 0.",
    },
    {
      intrebare:
        "Dacă a < 0 în f(x) = ax + b, graficul:",
      variante: [
        "Urcă de la stânga la dreapta",
        "Coboară de la stânga la dreapta",
        "Este orizontal",
        "Este o parabolă",
      ],
      corect: 1,
      explicatie:
        "a < 0 înseamnă funcție descrescătoare.",
    },
  ],

  storageKeyFinalizata:
    "lectie-monotonia-functiei-gradul-intai-finalizata",
  storageKeyXp:
    "lectie-monotonia-functiei-gradul-intai-xp",

  urmatoareaLectie: {
    titlu: "Semnul funcției de gradul I",
    href: "/lectii/semnul-functiei-gradul-intai",
  },
};

export const lectiaSemnulFunctieiGradulIntai: Lectie = {
  id: "semnul-functiei-gradul-intai",
  slug: "semnul-functiei-gradul-intai",
  modul: 3,
  numarLectie: 4,
  totalLectiiModul: 9,
  clasa: "Clasa a IX-a",
  profil: "M_mate-info",

  titlu: "Semnul funcției de gradul I",

  descriere:
    "Înveți să determini unde funcția este pozitivă, negativă sau egală cu zero.",

  obiective: [
    {
      icon: "0️⃣",
      titlu: "Să găsești rădăcina",
      descriere:
        "Vei rezolva f(x) = 0.",
    },
    {
      icon: "➕",
      titlu: "Să găsești zona pozitivă",
      descriere:
        "Vei determina unde f(x) > 0.",
    },
    {
      icon: "➖",
      titlu: "Să găsești zona negativă",
      descriere:
        "Vei determina unde f(x) < 0.",
    },
  ],

  videoLectii: [
    {
      numar: 1,
      titlu: "Rădăcina funcției",
      durata: "4 min",
      descriere:
        "Pornim prin rezolvarea ecuației f(x) = 0.",
      idei: [
        "ax + b = 0.",
        "x₀ = -b/a.",
        "În x₀ funcția își schimbă semnul.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Pentru f(x) = 2x - 6 avem x₀ = 3.",
    },
    {
      numar: 2,
      titlu: "Cazul a > 0",
      durata: "4 min",
      descriere:
        "Pentru coeficient pozitiv, semnul trece de la minus la plus.",
      idei: [
        "La stânga rădăcinii: f(x) < 0.",
        "În rădăcină: f(x) = 0.",
        "La dreapta rădăcinii: f(x) > 0.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Pentru 2x - 6: negativ pe ]-∞,3[, zero la 3, pozitiv pe ]3,+∞[.",
    },
    {
      numar: 3,
      titlu: "Cazul a < 0",
      durata: "4 min",
      descriere:
        "Pentru coeficient negativ, semnele se inversează.",
      idei: [
        "La stânga rădăcinii: f(x) > 0.",
        "În rădăcină: f(x) = 0.",
        "La dreapta rădăcinii: f(x) < 0.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Pentru -x + 4: pozitiv pe ]-∞,4[, zero la 4, negativ pe ]4,+∞[.",
    },
    {
      numar: 4,
      titlu: "Tabelul de semn",
      durata: "4 min",
      descriere:
        "Organizezi rezultatul într-o schemă simplă.",
      idei: [
        "Găsești rădăcina.",
        "Te uiți la semnul lui a.",
        "Completezi semnul pe cele două intervale.",
      ],
      exempluTitlu: "Regulă",
      exemplu:
        "Pentru a > 0: − | 0 | +. Pentru a < 0: + | 0 | −.",
    },
  ],

  fisaRapida: {
    titlu: "Tabelul de semn",
    continut: [
      "x₀ = -b/a.",
      "a > 0 → − | 0 | +.",
      "a < 0 → + | 0 | −.",
      "f(x₀) = 0.",
    ],
  },

  exercitii: [
    {
      intrebare:
        "Rădăcina funcției f(x) = 2x - 8 este:",
      variante: ["-4", "2", "4", "8"],
      corect: 2,
      explicatie:
        "2x - 8 = 0 ⇒ x = 4.",
    },
    {
      intrebare:
        "Pentru f(x) = 2x - 8, funcția este pozitivă pentru:",
      variante: ["x < 4", "x > 4", "x = 4", "x < 0"],
      corect: 1,
      explicatie:
        "a > 0 și rădăcina este 4, deci f(x) > 0 pentru x > 4.",
    },
    {
      intrebare:
        "Pentru f(x) = -x + 5, rădăcina este:",
      variante: ["-5", "0", "1", "5"],
      corect: 3,
      explicatie:
        "-x + 5 = 0 ⇒ x = 5.",
    },
    {
      intrebare:
        "Pentru f(x) = -x + 5, f(x) > 0 pentru:",
      variante: ["x < 5", "x > 5", "x = 5", "x > 0"],
      corect: 0,
      explicatie:
        "a < 0, deci funcția este pozitivă la stânga rădăcinii.",
    },
    {
      intrebare:
        "Dacă a > 0, semnul funcției în jurul rădăcinii este:",
      variante: ["+ | 0 | −", "− | 0 | +", "+ | + | +", "− | − | −"],
      corect: 1,
      explicatie:
        "Pentru a > 0 funcția trece de la valori negative la valori pozitive.",
    },
    {
      intrebare:
        "Pentru f(x) = 3x + 6, f(x) = 0 când:",
      variante: ["x = 2", "x = -2", "x = -3", "x = 3"],
      corect: 1,
      explicatie:
        "3x + 6 = 0 ⇒ x = -2.",
    },
  ],

  storageKeyFinalizata:
    "lectie-semnul-functiei-gradul-intai-finalizata",
  storageKeyXp:
    "lectie-semnul-functiei-gradul-intai-xp",

  urmatoareaLectie: {
    titlu: "Ecuații de gradul I",
    href: "/lectii/ecuatii-gradul-intai",
  },
};

export const lectiaEcuatiiGradulIntai: Lectie = {
  id: "ecuatii-gradul-intai",
  slug: "ecuatii-gradul-intai",
  modul: 3,
  numarLectie: 5,
  totalLectiiModul: 9,
  clasa: "Clasa a IX-a",
  profil: "M_mate-info",

  titlu: "Ecuații de gradul I",

  descriere:
    "Înveți să rezolvi ecuații liniare și să verifici corect soluția obținută.",

  obiective: [
    {
      icon: "🧮",
      titlu: "Să izolezi necunoscuta",
      descriere:
        "Vei transforma ecuația până obții valoarea lui x.",
    },
    {
      icon: "⚖️",
      titlu: "Să păstrezi egalitatea",
      descriere:
        "Vei efectua aceleași operații în ambii membri.",
    },
    {
      icon: "✅",
      titlu: "Să verifici soluția",
      descriere:
        "Vei înlocui soluția în ecuația inițială.",
    },
  ],

  videoLectii: [
    {
      numar: 1,
      titlu: "Forma ax + b = 0",
      durata: "4 min",
      descriere:
        "Ecuația de gradul I are o rezolvare directă când a ≠ 0.",
      idei: [
        "ax + b = 0.",
        "a ≠ 0.",
        "x = -b/a.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "2x - 6 = 0 ⇒ 2x = 6 ⇒ x = 3.",
    },
    {
      numar: 2,
      titlu: "Termeni în ambii membri",
      durata: "4–5 min",
      descriere:
        "Grupăm termenii cu x și termenii liberi.",
      idei: [
        "Eliminăm parantezele dacă există.",
        "Mutăm termenii cu x într-un membru.",
        "Mutăm numerele în celălalt membru.",
        "Reducem termenii asemenea.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "3x + 2 = x + 8 ⇒ 2x = 6 ⇒ x = 3.",
    },
    {
      numar: 3,
      titlu: "Ecuații cu paranteze",
      durata: "5 min",
      descriere:
        "Aplici distributivitatea înainte de a grupa termenii.",
      idei: [
        "a(b + c) = ab + ac.",
        "Ai grijă la semnul minus.",
        "Apoi rezolvi ecuația liniară obținută.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "2(x + 3) = 10 ⇒ 2x + 6 = 10 ⇒ x = 2.",
    },
    {
      numar: 4,
      titlu: "Verificarea soluției",
      durata: "3 min",
      descriere:
        "Înlocuiești valoarea lui x în ecuația inițială.",
      idei: [
        "Calculezi membrul stâng.",
        "Calculezi membrul drept.",
        "Dacă sunt egali, soluția este corectă.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Pentru 3x + 2 = 11 și x = 3: 3 × 3 + 2 = 11.",
    },
  ],

  fisaRapida: {
    titlu: "Schema de rezolvare",
    continut: [
      "Desfaci parantezele.",
      "Grupezi termenii cu x.",
      "Grupezi termenii liberi.",
      "Împarți la coeficientul lui x.",
      "Verifici soluția.",
    ],
  },

  exercitii: [
    {
      intrebare: "Rezolvați: 2x - 6 = 0",
      variante: ["x = -3", "x = 2", "x = 3", "x = 6"],
      corect: 2,
      explicatie:
        "2x = 6 ⇒ x = 3.",
    },
    {
      intrebare: "Rezolvați: 3x + 2 = 11",
      variante: ["x = 2", "x = 3", "x = 4", "x = 9"],
      corect: 1,
      explicatie:
        "3x = 9 ⇒ x = 3.",
    },
    {
      intrebare: "Rezolvați: 5x = 20",
      variante: ["x = 2", "x = 4", "x = 5", "x = 15"],
      corect: 1,
      explicatie:
        "Împărțim la 5 și obținem x = 4.",
    },
    {
      intrebare: "Rezolvați: 3x + 1 = x + 7",
      variante: ["x = 2", "x = 3", "x = 4", "x = 6"],
      corect: 1,
      explicatie:
        "2x = 6 ⇒ x = 3.",
    },
    {
      intrebare: "Rezolvați: 2(x + 3) = 10",
      variante: ["x = 1", "x = 2", "x = 3", "x = 5"],
      corect: 1,
      explicatie:
        "2x + 6 = 10 ⇒ 2x = 4 ⇒ x = 2.",
    },
    {
      intrebare: "Rezolvați: 7 - x = 2",
      variante: ["x = -5", "x = 5", "x = 7", "x = 9"],
      corect: 1,
      explicatie:
        "-x = -5 ⇒ x = 5.",
    },
  ],

  storageKeyFinalizata:
    "lectie-ecuatii-gradul-intai-finalizata",
  storageKeyXp:
    "lectie-ecuatii-gradul-intai-xp",

  urmatoareaLectie: {
    titlu: "Inecuații de gradul I",
    href: "/lectii/inecuatii-gradul-intai",
  },
};

export const lectiaInecuatiiGradulIntai: Lectie = {
  id: "inecuatii-gradul-intai",
  slug: "inecuatii-gradul-intai",
  modul: 3,
  numarLectie: 6,
  totalLectiiModul: 9,
  clasa: "Clasa a IX-a",
  profil: "M_mate-info",

  titlu: "Inecuații de gradul I",

  descriere:
    "Înveți să rezolvi inecuații liniare și regula esențială privind schimbarea sensului inegalității.",

  obiective: [
    {
      icon: "⚖️",
      titlu: "Să rezolvi inecuații",
      descriere:
        "Vei izola necunoscuta la fel ca într-o ecuație.",
    },
    {
      icon: "🔄",
      titlu: "Să schimbi corect sensul",
      descriere:
        "Vei recunoaște când semnul inegalității trebuie inversat.",
    },
    {
      icon: "↔️",
      titlu: "Să scrii soluția ca interval",
      descriere:
        "Vei transforma rezultatul în notație de interval.",
    },
  ],

  videoLectii: [
    {
      numar: 1,
      titlu: "Ecuație versus inecuație",
      durata: "4 min",
      descriere:
        "În loc de = folosim <, >, ≤ sau ≥.",
      idei: [
        "Procedăm asemănător ecuațiilor.",
        "Adunarea și scăderea nu schimbă sensul.",
        "Înmulțirea sau împărțirea cu număr negativ schimbă sensul.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "2x + 1 > 5 ⇒ 2x > 4 ⇒ x > 2.",
    },
    {
      numar: 2,
      titlu: "Regula numărului negativ",
      durata: "4 min",
      descriere:
        "Este regula care produce cele mai multe greșeli.",
      idei: [
        "Dacă împărțim la un număr negativ, inversăm sensul.",
        "< devine >.",
        "≤ devine ≥.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "-2x > 6 ⇒ x < -3.",
    },
    {
      numar: 3,
      titlu: "Soluția ca interval",
      durata: "4 min",
      descriere:
        "Scriem mulțimea soluțiilor folosind intervale.",
      idei: [
        "x > 2 → ]2,+∞[.",
        "x ≥ 2 → [2,+∞[.",
        "x < 2 → ]-∞,2[.",
        "x ≤ 2 → ]-∞,2].",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "x ≤ 4 înseamnă S = ]-∞,4].",
    },
    {
      numar: 4,
      titlu: "Inecuații cu paranteze",
      durata: "5 min",
      descriere:
        "Desfaci parantezele și reduci termenii.",
      idei: [
        "Aplici distributivitatea.",
        "Grupezi termenii.",
        "Verifici semnul coeficientului lui x înainte de împărțire.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "2(x - 1) ≤ 6 ⇒ 2x - 2 ≤ 6 ⇒ x ≤ 4.",
    },
  ],

  fisaRapida: {
    titlu: "Regula care nu trebuie uitată",
    continut: [
      "Adunare/scădere cu același număr → sensul rămâne.",
      "Înmulțire/împărțire cu număr pozitiv → sensul rămâne.",
      "Înmulțire/împărțire cu număr negativ → sensul se inversează.",
      "La final putem scrie soluția sub formă de interval.",
    ],
  },

  exercitii: [
    {
      intrebare: "Rezolvați: 2x > 6",
      variante: ["x > 3", "x < 3", "x ≥ 3", "x > 6"],
      corect: 0,
      explicatie:
        "Împărțim la 2 > 0, deci sensul rămâne: x > 3.",
    },
    {
      intrebare: "Rezolvați: -2x > 6",
      variante: ["x > -3", "x < -3", "x > 3", "x < 3"],
      corect: 1,
      explicatie:
        "Împărțim la -2, deci inversăm sensul: x < -3.",
    },
    {
      intrebare: "Rezolvați: x + 4 ≤ 9",
      variante: ["x ≤ 5", "x ≥ 5", "x < 13", "x ≤ 13"],
      corect: 0,
      explicatie:
        "Scădem 4: x ≤ 5.",
    },
    {
      intrebare:
        "Care interval corespunde soluției x > 2?",
      variante: [
        "[2,+∞[",
        "]2,+∞[",
        "]-∞,2[",
        "]-∞,2]",
      ],
      corect: 1,
      explicatie:
        "2 nu este inclus, deci ]2,+∞[.",
    },
    {
      intrebare:
        "Rezolvați: 2(x - 1) ≤ 6",
      variante: ["x ≤ 2", "x ≤ 4", "x ≥ 4", "x < 4"],
      corect: 1,
      explicatie:
        "2x - 2 ≤ 6 ⇒ 2x ≤ 8 ⇒ x ≤ 4.",
    },
    {
      intrebare:
        "Când trebuie schimbat sensul inegalității?",
      variante: [
        "Când adunăm un număr",
        "Când scădem un număr",
        "Când împărțim la un număr negativ",
        "Niciodată",
      ],
      corect: 2,
      explicatie:
        "La înmulțirea sau împărțirea cu un număr negativ, sensul se inversează.",
    },
  ],

  storageKeyFinalizata:
    "lectie-inecuatii-gradul-intai-finalizata",
  storageKeyXp:
    "lectie-inecuatii-gradul-intai-xp",

  urmatoareaLectie: {
    titlu: "Sisteme de ecuații liniare",
    href: "/lectii/sisteme-ecuatii-liniare",
  },
};

export const lectiaSistemeEcuatiiLiniare: Lectie = {
  id: "sisteme-ecuatii-liniare",
  slug: "sisteme-ecuatii-liniare",
  modul: 3,
  numarLectie: 7,
  totalLectiiModul: 9,
  clasa: "Clasa a IX-a",
  profil: "M_mate-info",

  titlu: "Sisteme de ecuații liniare",

  descriere:
    "Înveți să rezolvi sisteme cu două ecuații și două necunoscute prin substituție și reducere.",

  obiective: [
    {
      icon: "🔗",
      titlu: "Să înțelegi sistemul",
      descriere:
        "Vei căuta valori care satisfac simultan ambele ecuații.",
    },
    {
      icon: "🔁",
      titlu: "Metoda substituției",
      descriere:
        "Vei exprima o necunoscută și o vei înlocui.",
    },
    {
      icon: "➕",
      titlu: "Metoda reducerii",
      descriere:
        "Vei elimina una dintre necunoscute prin adunarea ecuațiilor.",
    },
  ],

  videoLectii: [
    {
      numar: 1,
      titlu: "Ce este un sistem?",
      durata: "4 min",
      descriere:
        "Soluția trebuie să verifice ambele ecuații.",
      idei: [
        "Avem două necunoscute.",
        "Avem două condiții simultane.",
        "Soluția se scrie ca pereche (x,y).",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "x + y = 5 și x - y = 1 au soluția x = 3, y = 2.",
    },
    {
      numar: 2,
      titlu: "Metoda substituției",
      durata: "5 min",
      descriere:
        "Izolezi una dintre necunoscute.",
      idei: [
        "Exprimi x sau y.",
        "Înlocuiești în cealaltă ecuație.",
        "Rezolvi ecuația cu o necunoscută.",
        "Revii pentru cealaltă necunoscută.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "x + y = 5 ⇒ y = 5 - x. Înlocuim în a doua ecuație.",
    },
    {
      numar: 3,
      titlu: "Metoda reducerii",
      durata: "5 min",
      descriere:
        "Faci coeficienții unei necunoscute opuși.",
      idei: [
        "Pregătim ecuațiile.",
        "Adunăm sau scădem.",
        "O necunoscută dispare.",
        "Calculăm apoi cealaltă necunoscută.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "x + y = 5 și x - y = 1. Adunând: 2x = 6 ⇒ x = 3.",
    },
    {
      numar: 4,
      titlu: "Verificarea perechii",
      durata: "3 min",
      descriere:
        "Înlocuiești x și y în ambele ecuații.",
      idei: [
        "Verificăm prima ecuație.",
        "Verificăm a doua ecuație.",
        "Ambele trebuie să fie adevărate.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Pentru (3,2): 3 + 2 = 5 și 3 - 2 = 1.",
    },
  ],

  fisaRapida: {
    titlu: "Două metode de bază",
    continut: [
      "Substituție: exprimi o necunoscută și o înlocuiești.",
      "Reducere: elimini o necunoscută prin adunare/scădere.",
      "Soluția este perechea (x,y).",
      "Perechea trebuie să verifice ambele ecuații.",
    ],
  },

  exercitii: [
    {
      intrebare:
        "Care este soluția sistemului x + y = 5, x - y = 1?",
      variante: ["(2,3)", "(3,2)", "(4,1)", "(1,4)"],
      corect: 1,
      explicatie:
        "Adunăm ecuațiile: 2x = 6 ⇒ x = 3, apoi y = 2.",
    },
    {
      intrebare:
        "Din ecuația x + y = 7 exprimăm y:",
      variante: ["y = x - 7", "y = 7 - x", "y = 7x", "y = x + 7"],
      corect: 1,
      explicatie:
        "Scădem x din ambii membri: y = 7 - x.",
    },
    {
      intrebare:
        "Metoda prin care înlocuim o necunoscută în cealaltă ecuație se numește:",
      variante: ["Reducere", "Substituție", "Factorizare", "Inducție"],
      corect: 1,
      explicatie:
        "Aceasta este metoda substituției.",
    },
    {
      intrebare:
        "Pentru sistemul x + y = 4, x - y = 2, cât este x?",
      variante: ["1", "2", "3", "4"],
      corect: 2,
      explicatie:
        "Adunăm: 2x = 6 ⇒ x = 3.",
    },
    {
      intrebare:
        "Pentru același sistem x + y = 4, x - y = 2, cât este y?",
      variante: ["1", "2", "3", "-1"],
      corect: 0,
      explicatie:
        "x = 3, deci 3 + y = 4 ⇒ y = 1.",
    },
    {
      intrebare:
        "O soluție a unui sistem trebuie:",
      variante: [
        "Să verifice doar prima ecuație",
        "Să verifice doar a doua ecuație",
        "Să verifice ambele ecuații",
        "Să aibă x = y",
      ],
      corect: 2,
      explicatie:
        "Sistemul impune simultan ambele ecuații.",
    },
  ],

  storageKeyFinalizata:
    "lectie-sisteme-ecuatii-liniare-finalizata",
  storageKeyXp:
    "lectie-sisteme-ecuatii-liniare-xp",

  urmatoareaLectie: {
    titlu: "Interpretarea geometrică a sistemelor",
    href: "/lectii/interpretarea-geometrica-sistemelor",
  },
};

export const lectiaInterpretareaGeometricaSistemelor: Lectie = {
  id: "interpretarea-geometrica-sistemelor",
  slug: "interpretarea-geometrica-sistemelor",
  modul: 3,
  numarLectie: 8,
  totalLectiiModul: 9,
  clasa: "Clasa a IX-a",
  profil: "M_mate-info",

  titlu: "Interpretarea geometrică a sistemelor",

  descriere:
    "Înțelegi legătura dintre un sistem de ecuații liniare și poziția a două drepte în plan.",

  obiective: [
    {
      icon: "📐",
      titlu: "Să vezi ecuațiile ca drepte",
      descriere:
        "Fiecare ecuație liniară poate reprezenta o dreaptă.",
    },
    {
      icon: "🎯",
      titlu: "Să interpretezi intersecția",
      descriere:
        "Punctul comun corespunde soluției sistemului.",
    },
    {
      icon: "🔍",
      titlu: "Să recunoști cele trei cazuri",
      descriere:
        "Vei distinge drepte secante, paralele și coincidente.",
    },
  ],

  videoLectii: [
    {
      numar: 1,
      titlu: "O ecuație liniară în plan",
      durata: "4 min",
      descriere:
        "Ecuațiile cu x și y pot reprezenta drepte.",
      idei: [
        "O ecuație liniară descrie o dreaptă.",
        "Un sistem reprezintă două drepte.",
        "Soluțiile comune sunt punctele comune.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "x + y = 5 reprezintă o dreaptă în plan.",
    },
    {
      numar: 2,
      titlu: "O singură soluție",
      durata: "4 min",
      descriere:
        "Două drepte secante au un singur punct comun.",
      idei: [
        "Dreptele se intersectează.",
        "Există un singur punct comun.",
        "Sistemul are o singură soluție.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Dacă dreptele se intersectează în (3,2), sistemul are soluția (3,2).",
    },
    {
      numar: 3,
      titlu: "Nicio soluție",
      durata: "4 min",
      descriere:
        "Dreptele paralele distincte nu au punct comun.",
      idei: [
        "Dreptele sunt paralele.",
        "Nu se intersectează.",
        "Sistemul nu are soluții.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Dreptele y = 2x + 1 și y = 2x - 3 sunt paralele distincte.",
    },
    {
      numar: 4,
      titlu: "Infinit de multe soluții",
      durata: "4 min",
      descriere:
        "Dacă ecuațiile reprezintă aceeași dreaptă, toate punctele ei sunt comune.",
      idei: [
        "Dreptele coincid.",
        "Au infinit de multe puncte comune.",
        "Sistemul are infinit de multe soluții.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "x + y = 2 și 2x + 2y = 4 reprezintă aceeași dreaptă.",
    },
  ],

  fisaRapida: {
    titlu: "Cele trei cazuri",
    continut: [
      "Drepte secante → o soluție.",
      "Drepte paralele distincte → nicio soluție.",
      "Drepte coincidente → infinit de multe soluții.",
      "Soluția este punctul de intersecție.",
    ],
  },

  exercitii: [
    {
      intrebare:
        "Dacă două drepte se intersectează într-un singur punct, sistemul are:",
      variante: [
        "Nicio soluție",
        "O soluție",
        "Două soluții",
        "Infinit de multe soluții",
      ],
      corect: 1,
      explicatie:
        "Punctul de intersecție este unica soluție.",
    },
    {
      intrebare:
        "Dacă două drepte sunt paralele distincte, sistemul are:",
      variante: [
        "O soluție",
        "Două soluții",
        "Nicio soluție",
        "Infinit de multe soluții",
      ],
      corect: 2,
      explicatie:
        "Dreptele paralele distincte nu au punct comun.",
    },
    {
      intrebare:
        "Dacă două drepte coincid, sistemul are:",
      variante: [
        "Nicio soluție",
        "O soluție",
        "Infinit de multe soluții",
        "Exact două soluții",
      ],
      corect: 2,
      explicatie:
        "Toate punctele dreptei comune sunt soluții.",
    },
    {
      intrebare:
        "Soluția geometrică a unui sistem compatibil determinat reprezintă:",
      variante: [
        "Originea",
        "Punctul de intersecție al dreptelor",
        "Axa Ox",
        "Panta unei drepte",
      ],
      corect: 1,
      explicatie:
        "Perechea (x,y) este punctul comun celor două drepte.",
    },
    {
      intrebare:
        "Dreptele y = 3x + 1 și y = 3x - 5 sunt:",
      variante: ["Secante", "Paralele distincte", "Coincidente", "Perpendiculare"],
      corect: 1,
      explicatie:
        "Au aceeași pantă și termeni liberi diferiți.",
    },
    {
      intrebare:
        "Ecuațiile x + y = 2 și 2x + 2y = 4 reprezintă:",
      variante: [
        "Drepte paralele distincte",
        "Drepte perpendiculare",
        "Aceeași dreaptă",
        "Drepte fără nicio legătură",
      ],
      corect: 2,
      explicatie:
        "A doua ecuație se obține înmulțind prima ecuație cu 2.",
    },
  ],

  storageKeyFinalizata:
    "lectie-interpretarea-geometrica-sistemelor-finalizata",
  storageKeyXp:
    "lectie-interpretarea-geometrica-sistemelor-xp",

  urmatoareaLectie: {
    titlu: "Probleme modelate prin funcții liniare",
    href: "/lectii/probleme-functii-liniare",
  },
};

export const lectiaProblemeFunctiiLiniare: Lectie = {
  id: "probleme-functii-liniare",
  slug: "probleme-functii-liniare",
  modul: 3,
  numarLectie: 9,
  totalLectiiModul: 9,
  clasa: "Clasa a IX-a",
  profil: "M_mate-info",

  titlu: "Probleme modelate prin funcții liniare",

  descriere:
    "Aplici funcțiile și ecuațiile liniare în probleme concrete cu prețuri, distanțe, tarife și alte situații reale.",

  obiective: [
    {
      icon: "📝",
      titlu: "Să traduci problema",
      descriere:
        "Vei transforma informațiile din text într-o formulă matematică.",
    },
    {
      icon: "📊",
      titlu: "Să construiești modelul",
      descriere:
        "Vei folosi expresii de forma ax + b.",
    },
    {
      icon: "✅",
      titlu: "Să interpretezi rezultatul",
      descriere:
        "Vei verifica dacă răspunsul are sens în context.",
    },
  ],

  videoLectii: [
    {
      numar: 1,
      titlu: "Cum transformăm textul în matematică",
      durata: "5 min",
      descriere:
        "Identificăm necunoscuta și relația dintre mărimi.",
      idei: [
        "Alegem necunoscuta x.",
        "Identificăm valoarea fixă.",
        "Identificăm valoarea care depinde de x.",
        "Construim formula.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Un taxi costă 10 lei pornirea și 3 lei/km. Costul este C(x) = 3x + 10.",
    },
    {
      numar: 2,
      titlu: "Tarif fix plus tarif variabil",
      durata: "4 min",
      descriere:
        "Una dintre cele mai comune situații produce exact forma ax + b.",
      idei: [
        "b = cost fix.",
        "a = cost pentru o unitate.",
        "x = numărul de unități.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Abonament 20 lei + 5 lei pentru fiecare utilizare: C(x) = 5x + 20.",
    },
    {
      numar: 3,
      titlu: "Când căutăm valoarea lui x",
      durata: "4–5 min",
      descriere:
        "Dacă știm rezultatul final, obținem o ecuație.",
      idei: [
        "Scriem funcția.",
        "Egalăm funcția cu valoarea cunoscută.",
        "Rezolvăm ecuația.",
        "Interpretăm x.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "3x + 10 = 40 ⇒ 3x = 30 ⇒ x = 10 km.",
    },
    {
      numar: 4,
      titlu: "Verificarea rezultatului",
      durata: "3–4 min",
      descriere:
        "Nu ne oprim la calcul: răspunsul trebuie să aibă sens.",
      idei: [
        "Verificăm unitatea de măsură.",
        "Verificăm dacă valoarea este posibilă.",
        "Scriem răspunsul în contextul problemei.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Dacă x reprezintă numărul de produse, o valoare negativă nu este acceptabilă în context.",
    },
  ],

  fisaRapida: {
    titlu: "Modelul liniar",
    continut: [
      "Identifică necunoscuta.",
      "Caută partea fixă → b.",
      "Caută valoarea pe unitate → a.",
      "Construiește f(x) = ax + b.",
      "Rezolvă ecuația dacă este necesar.",
      "Interpretează rezultatul în context.",
    ],
  },

  exercitii: [
    {
      intrebare:
        "Un taxi percepe 8 lei pornirea și 2 lei/km. Costul pentru x km este:",
      variante: [
        "C(x) = 8x + 2",
        "C(x) = 2x + 8",
        "C(x) = 10x",
        "C(x) = x + 10",
      ],
      corect: 1,
      explicatie:
        "8 lei este costul fix, iar 2 lei se plătesc pentru fiecare kilometru.",
    },
    {
      intrebare:
        "Pentru C(x) = 2x + 8, cât costă o cursă de 5 km?",
      variante: ["10 lei", "13 lei", "18 lei", "20 lei"],
      corect: 2,
      explicatie:
        "C(5) = 2 × 5 + 8 = 18 lei.",
    },
    {
      intrebare:
        "Un serviciu costă 15 lei fix și 4 lei pentru fiecare unitate. Formula este:",
      variante: [
        "4x + 15",
        "15x + 4",
        "19x",
        "4x - 15",
      ],
      corect: 0,
      explicatie:
        "15 este partea fixă, iar 4 este costul pe unitate.",
    },
    {
      intrebare:
        "Dacă C(x) = 3x + 10 și costul total este 40 lei, cât este x?",
      variante: ["5", "10", "15", "30"],
      corect: 1,
      explicatie:
        "3x + 10 = 40 ⇒ 3x = 30 ⇒ x = 10.",
    },
    {
      intrebare:
        "În modelul f(x) = 6x + 25, dacă 25 reprezintă abonamentul lunar, atunci 6 poate reprezenta:",
      variante: [
        "Numărul total de luni",
        "Costul pentru fiecare unitate consumată",
        "Costul fix",
        "Valoarea lui x",
      ],
      corect: 1,
      explicatie:
        "Coeficientul lui x reprezintă variația pentru fiecare unitate.",
    },
    {
      intrebare:
        "După rezolvarea unei probleme modelate matematic este important:",
      variante: [
        "Să ignorăm contextul",
        "Să verificăm dacă rezultatul are sens",
        "Să schimbăm formula",
        "Să alegem mereu un număr întreg",
      ],
      corect: 1,
      explicatie:
        "Rezultatul matematic trebuie interpretat în situația concretă.",
    },
  ],

  storageKeyFinalizata:
    "lectie-probleme-functii-liniare-finalizata",
  storageKeyXp:
    "lectie-probleme-functii-liniare-xp",

  urmatoareaLectie: {
    titlu: "Continuă cu Modulul 4",
    href: "/programa",
  },
};

export const lectiiModul3: Lectie[] = [
  lectiaFunctiaGradulIntai,
  lectiaGraficFunctieGradulIntai,
  lectiaMonotoniaFunctieiGradulIntai,
  lectiaSemnulFunctieiGradulIntai,
  lectiaEcuatiiGradulIntai,
  lectiaInecuatiiGradulIntai,
  lectiaSistemeEcuatiiLiniare,
  lectiaInterpretareaGeometricaSistemelor,
  lectiaProblemeFunctiiLiniare,
];