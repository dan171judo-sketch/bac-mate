import type { Lectie } from "./tipuri";

export const lectiaEcuatiaGradulDoi: Lectie = {
  id: "ecuatia-gradul-doi",
  slug: "ecuatia-gradul-doi",
  modul: 4,
  numarLectie: 1,
  totalLectiiModul: 13,
  clasa: "Clasa a IX-a",
  profil: "M_mate-info",
  titlu: "Ecuația de gradul al II-lea",
  descriere:
    "Înveți să recunoști o ecuație de gradul al II-lea și să identifici corect coeficienții a, b și c.",

  obiective: [
    {
      icon: "🔎",
      titlu: "Recunoaște forma",
      descriere: "Identifici ecuațiile de forma ax² + bx + c = 0.",
    },
    {
      icon: "🧮",
      titlu: "Identifică a, b și c",
      descriere: "Extragi corect coeficienții, inclusiv semnele lor.",
    },
    {
      icon: "⚠️",
      titlu: "Evită capcanele",
      descriere: "Nu confunzi o ecuație de gradul II cu una de gradul I.",
    },
  ],

  videoLectii: [
    {
      numar: 1,
      titlu: "Forma generală",
      durata: "4 min",
      descriere: "Pornim de la forma standard a ecuației.",
      idei: [
        "Forma generală este ax² + bx + c = 0.",
        "a, b și c sunt numere reale.",
        "Este obligatoriu ca a ≠ 0.",
      ],
      exempluTitlu: "Exemplu",
      exemplu: "2x² - 5x + 3 = 0 are a = 2, b = -5 și c = 3.",
    },
    {
      numar: 2,
      titlu: "Coeficienți lipsă",
      durata: "4 min",
      descriere: "Uneori b sau c pot fi egale cu zero.",
      idei: [
        "x² - 9 = 0 are b = 0.",
        "x² + 4x = 0 are c = 0.",
        "a nu poate fi zero.",
      ],
      exempluTitlu: "Exemplu",
      exemplu: "3x² - 12 = 0 are a = 3, b = 0, c = -12.",
    },
    {
      numar: 3,
      titlu: "Aducerea la forma standard",
      durata: "5 min",
      descriere: "Mutăm toți termenii într-un singur membru.",
      idei: [
        "Desfacem parantezele.",
        "Mutăm totul în membrul stâng.",
        "Reducem termenii asemenea.",
      ],
      exempluTitlu: "Exemplu",
      exemplu: "x² + 5 = 3x devine x² - 3x + 5 = 0.",
    },
  ],

  fisaRapida: {
    titlu: "De memorat",
    continut: [
      "ax² + bx + c = 0",
      "a ≠ 0",
      "a = coeficientul lui x²",
      "b = coeficientul lui x",
      "c = termenul liber",
    ],
  },

  exercitii: [
    {
      intrebare: "În ecuația 3x² - 7x + 2 = 0, cât este a?",
      variante: ["3", "-7", "2", "0"],
      corect: 0,
      explicatie: "Coeficientul lui x² este a = 3.",
    },
    {
      intrebare: "În ecuația x² + 5x - 6 = 0, cât este b?",
      variante: ["1", "5", "-6", "0"],
      corect: 1,
      explicatie: "Coeficientul lui x este b = 5.",
    },
    {
      intrebare: "În ecuația 2x² - 8 = 0, cât este b?",
      variante: ["2", "-8", "0", "8"],
      corect: 2,
      explicatie: "Termenul cu x lipsește, deci b = 0.",
    },
    {
      intrebare: "Care este ecuație de gradul al II-lea?",
      variante: [
        "2x + 1 = 0",
        "x² - 4x + 1 = 0",
        "x³ = 8",
        "5 = 0",
      ],
      corect: 1,
      explicatie:
        "Puterea maximă a lui x este 2, iar coeficientul lui x² este nenul.",
    },
    {
      intrebare: "x² + 3 = 2x se scrie în forma standard:",
      variante: [
        "x² + 2x + 3 = 0",
        "x² - 2x + 3 = 0",
        "x² - 3x + 2 = 0",
        "2x² - x + 3 = 0",
      ],
      corect: 1,
      explicatie: "Mutăm 2x în stânga: x² - 2x + 3 = 0.",
    },
  ],

  storageKeyFinalizata: "lectie-ecuatia-gradul-doi-finalizata",
  storageKeyXp: "lectie-ecuatia-gradul-doi-xp",

  urmatoareaLectie: {
    titlu: "Discriminantul și numărul de soluții",
    href: "/lectii/discriminantul-numarul-solutiilor",
  },
};

export const lectiaDiscriminantul: Lectie = {
  id: "discriminantul-numarul-solutiilor",
  slug: "discriminantul-numarul-solutiilor",
  modul: 4,
  numarLectie: 2,
  totalLectiiModul: 13,
  clasa: "Clasa a IX-a",
  profil: "M_mate-info",
  titlu: "Discriminantul și numărul de soluții",
  descriere:
    "Înveți să calculezi discriminantul și să stabilești câte soluții reale are ecuația.",

  obiective: [
    {
      icon: "Δ",
      titlu: "Calculează discriminantul",
      descriere: "Folosești formula Δ = b² - 4ac.",
    },
    {
      icon: "2️⃣",
      titlu: "Stabilește numărul de soluții",
      descriere: "Interpretezi semnul discriminantului.",
    },
    {
      icon: "✅",
      titlu: "Calculează fără erori",
      descriere: "Ai grijă la semne și la b².",
    },
  ],

  videoLectii: [
    {
      numar: 1,
      titlu: "Formula discriminantului",
      durata: "4 min",
      descriere: "Δ ne spune ce se întâmplă cu rădăcinile.",
      idei: [
        "Δ = b² - 4ac.",
        "Calculăm mai întâi b².",
        "Respectăm semnele lui a și c.",
      ],
      exempluTitlu: "Exemplu",
      exemplu: "Pentru x² - 5x + 6 = 0: Δ = 25 - 24 = 1.",
    },
    {
      numar: 2,
      titlu: "Cele trei cazuri",
      durata: "4 min",
      descriere: "Semnul lui Δ determină numărul soluțiilor reale.",
      idei: [
        "Δ > 0 → două soluții reale distincte.",
        "Δ = 0 → o soluție reală dublă.",
        "Δ < 0 → nicio soluție reală.",
      ],
      exempluTitlu: "Regulă",
      exemplu: "Δ = 9 înseamnă două soluții reale distincte.",
    },
    {
      numar: 3,
      titlu: "Capcana semnelor",
      durata: "4 min",
      descriere: "Un coeficient negativ trebuie introdus cu semnul său.",
      idei: [
        "Dacă b = -3, atunci b² = 9.",
        "Dacă c < 0, produsul 4ac poate fi negativ.",
        "Scrie coeficienții înainte de calcul.",
      ],
      exempluTitlu: "Exemplu",
      exemplu: "x² - 3x - 4 = 0: Δ = 9 + 16 = 25.",
    },
  ],

  fisaRapida: {
    titlu: "Discriminant",
    continut: [
      "Δ = b² - 4ac",
      "Δ > 0 → 2 soluții reale distincte",
      "Δ = 0 → 1 soluție reală dublă",
      "Δ < 0 → 0 soluții reale",
    ],
  },

  exercitii: [
    {
      intrebare: "Pentru x² - 5x + 6 = 0, Δ este:",
      variante: ["1", "5", "25", "-1"],
      corect: 0,
      explicatie: "Δ = (-5)² - 4·1·6 = 25 - 24 = 1.",
    },
    {
      intrebare: "Dacă Δ > 0, ecuația are:",
      variante: [
        "0 soluții reale",
        "1 soluție dublă",
        "2 soluții reale distincte",
        "Infinit de soluții",
      ],
      corect: 2,
      explicatie: "Acesta este cazul Δ > 0.",
    },
    {
      intrebare: "Dacă Δ = 0, ecuația are:",
      variante: [
        "O rădăcină dublă",
        "Două rădăcini distincte",
        "Nicio rădăcină reală",
        "Trei rădăcini",
      ],
      corect: 0,
      explicatie: "Cele două formule ale rădăcinilor dau aceeași valoare.",
    },
    {
      intrebare: "Pentru x² + x + 1 = 0, Δ este:",
      variante: ["3", "-3", "5", "0"],
      corect: 1,
      explicatie: "Δ = 1 - 4 = -3.",
    },
    {
      intrebare: "O ecuație cu Δ < 0 are în ℝ:",
      variante: [
        "Două soluții",
        "O soluție",
        "Nicio soluție",
        "Infinit de soluții",
      ],
      corect: 2,
      explicatie:
        "Nu există rădăcină pătrată reală dintr-un număr negativ.",
    },
  ],

  storageKeyFinalizata:
    "lectie-discriminantul-numarul-solutiilor-finalizata",
  storageKeyXp: "lectie-discriminantul-numarul-solutiilor-xp",

  urmatoareaLectie: {
    titlu: "Formulele rădăcinilor",
    href: "/lectii/formulele-radacinilor",
  },
};

export const lectiaFormuleleRadacinilor: Lectie = {
  id: "formulele-radacinilor",
  slug: "formulele-radacinilor",
  modul: 4,
  numarLectie: 3,
  totalLectiiModul: 13,
  clasa: "Clasa a IX-a",
  profil: "M_mate-info",
  titlu: "Formulele rădăcinilor",
  descriere:
    "Înveți formulele pentru x₁ și x₂ și le aplici corect în ecuațiile de gradul al II-lea.",

  obiective: [
    {
      icon: "x₁",
      titlu: "Calculează prima rădăcină",
      descriere: "Aplici formula cu minus.",
    },
    {
      icon: "x₂",
      titlu: "Calculează a doua rădăcină",
      descriere: "Aplici formula cu plus.",
    },
    {
      icon: "✅",
      titlu: "Verifică rezultatele",
      descriere: "Înlocuiești rădăcinile în ecuație.",
    },
  ],

  videoLectii: [
    {
      numar: 1,
      titlu: "Formula generală",
      durata: "5 min",
      descriere: "După calculul lui Δ putem determina rădăcinile.",
      idei: [
        "x₁ = (-b - √Δ)/(2a).",
        "x₂ = (-b + √Δ)/(2a).",
        "Formulele se folosesc când Δ ≥ 0.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "x² - 5x + 6 = 0 are Δ = 1, deci rădăcinile sunt 2 și 3.",
    },
    {
      numar: 2,
      titlu: "Cazul Δ = 0",
      durata: "4 min",
      descriere: "Cele două rădăcini coincid.",
      idei: [
        "x₁ = x₂.",
        "x₀ = -b/(2a).",
        "Se numește rădăcină dublă.",
      ],
      exempluTitlu: "Exemplu",
      exemplu: "x² - 4x + 4 = 0 are x₀ = 2.",
    },
    {
      numar: 3,
      titlu: "Verificarea",
      durata: "3 min",
      descriere: "O verificare rapidă elimină multe greșeli.",
      idei: [
        "Înlocuiești rădăcina în expresie.",
        "Rezultatul trebuie să fie zero.",
        "Poți verifica și cu relațiile lui Viète.",
      ],
      exempluTitlu: "Exemplu",
      exemplu: "Pentru x = 2: 2² - 5·2 + 6 = 0.",
    },
  ],

  fisaRapida: {
    titlu: "Formule",
    continut: [
      "x₁ = (-b - √Δ)/(2a)",
      "x₂ = (-b + √Δ)/(2a)",
      "Dacă Δ = 0: x₀ = -b/(2a)",
    ],
  },

  exercitii: [
    {
      intrebare: "Rădăcinile ecuației x² - 5x + 6 = 0 sunt:",
      variante: ["1 și 6", "2 și 3", "-2 și -3", "0 și 5"],
      corect: 1,
      explicatie: "(x - 2)(x - 3) = 0.",
    },
    {
      intrebare: "Pentru x² - 4x + 4 = 0, rădăcina dublă este:",
      variante: ["-2", "0", "2", "4"],
      corect: 2,
      explicatie: "x₀ = -(-4)/(2·1) = 2.",
    },
    {
      intrebare: "Numitorul formulei rădăcinilor este:",
      variante: ["a", "2a", "b", "2b"],
      corect: 1,
      explicatie: "Formula conține 2a la numitor.",
    },
    {
      intrebare: "Ecuația x² - 9 = 0 are soluțiile:",
      variante: ["3", "-3", "-3 și 3", "0 și 9"],
      corect: 2,
      explicatie: "x² = 9, deci x = ±3.",
    },
    {
      intrebare: "Pentru Δ = 0, x₁ și x₂ sunt:",
      variante: ["Opuse", "Egale", "Întotdeauna zero", "Imaginare"],
      corect: 1,
      explicatie: "√Δ = 0, deci formulele coincid.",
    },
  ],

  storageKeyFinalizata: "lectie-formulele-radacinilor-finalizata",
  storageKeyXp: "lectie-formulele-radacinilor-xp",

  urmatoareaLectie: {
    titlu: "Relațiile lui Viète",
    href: "/lectii/relatiile-lui-viete",
  },
};

export const lectiaRelatiileViete: Lectie = {
  id: "relatiile-lui-viete",
  slug: "relatiile-lui-viete",
  modul: 4,
  numarLectie: 4,
  totalLectiiModul: 13,
  clasa: "Clasa a IX-a",
  profil: "M_mate-info",
  titlu: "Relațiile lui Viète",
  descriere:
    "Folosești suma și produsul rădăcinilor fără să calculezi de fiecare dată rădăcinile separat.",

  obiective: [
    {
      icon: "Σ",
      titlu: "Suma rădăcinilor",
      descriere: "Folosești x₁ + x₂ = -b/a.",
    },
    {
      icon: "×",
      titlu: "Produsul rădăcinilor",
      descriere: "Folosești x₁x₂ = c/a.",
    },
    {
      icon: "⚡",
      titlu: "Rezolvă rapid",
      descriere: "Aplici Viète în exerciții.",
    },
  ],

  videoLectii: [
    {
      numar: 1,
      titlu: "Relațiile fundamentale",
      durata: "4 min",
      descriere: "Rădăcinile sunt legate direct de coeficienți.",
      idei: [
        "x₁ + x₂ = -b/a.",
        "x₁x₂ = c/a.",
        "Sunt valabile pentru rădăcinile ecuației.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Pentru x² - 5x + 6 = 0: suma = 5, produsul = 6.",
    },
    {
      numar: 2,
      titlu: "Ecuația din rădăcini",
      durata: "5 min",
      descriere: "Construim ecuația când știm suma și produsul.",
      idei: [
        "Pentru ecuație monică: x² - Sx + P = 0.",
        "S este suma rădăcinilor.",
        "P este produsul rădăcinilor.",
      ],
      exempluTitlu: "Exemplu",
      exemplu: "Rădăcini 2 și 5 → x² - 7x + 10 = 0.",
    },
    {
      numar: 3,
      titlu: "Expresii simetrice",
      durata: "5 min",
      descriere: "Transformăm expresii folosind suma și produsul.",
      idei: [
        "x₁² + x₂² = (x₁ + x₂)² - 2x₁x₂.",
        "Nu calculăm separat rădăcinile dacă nu este necesar.",
        "Viète poate scurta mult rezolvarea.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Dacă S = 5 și P = 6, atunci x₁² + x₂² = 25 - 12 = 13.",
    },
  ],

  fisaRapida: {
    titlu: "Viète",
    continut: [
      "x₁ + x₂ = -b/a",
      "x₁x₂ = c/a",
      "x² - Sx + P = 0 pentru ecuația monică",
      "x₁² + x₂² = S² - 2P",
    ],
  },

  exercitii: [
    {
      intrebare: "Pentru x² - 7x + 10 = 0, x₁ + x₂ este:",
      variante: ["-7", "7", "10", "-10"],
      corect: 1,
      explicatie: "-b/a = 7.",
    },
    {
      intrebare: "Pentru x² - 7x + 10 = 0, x₁x₂ este:",
      variante: ["7", "-7", "10", "-10"],
      corect: 2,
      explicatie: "c/a = 10.",
    },
    {
      intrebare: "Ecuația cu rădăcinile 2 și 3 este:",
      variante: [
        "x² - 5x + 6 = 0",
        "x² + 5x + 6 = 0",
        "x² - 6x + 5 = 0",
        "x² + x - 6 = 0",
      ],
      corect: 0,
      explicatie: "S = 5, P = 6.",
    },
    {
      intrebare: "Dacă S = 4 și P = 3, atunci x₁² + x₂² este:",
      variante: ["7", "10", "13", "16"],
      corect: 1,
      explicatie: "S² - 2P = 16 - 6 = 10.",
    },
    {
      intrebare:
        "Pentru 2x² - 6x + 4 = 0, suma rădăcinilor este:",
      variante: ["-3", "3", "2", "-2"],
      corect: 1,
      explicatie: "-b/a = 6/2 = 3.",
    },
  ],

  storageKeyFinalizata: "lectie-relatiile-lui-viete-finalizata",
  storageKeyXp: "lectie-relatiile-lui-viete-xp",

  urmatoareaLectie: {
    titlu: "Funcția de gradul al II-lea",
    href: "/lectii/functia-gradul-doi",
  },
};

export const lectiaFunctiaGradulDoi: Lectie = {
  id: "functia-gradul-doi",
  slug: "functia-gradul-doi",
  modul: 4,
  numarLectie: 5,
  totalLectiiModul: 13,
  clasa: "Clasa a IX-a",
  profil: "M_mate-info",
  titlu: "Funcția de gradul al II-lea",
  descriere:
    "Treci de la ecuație la funcția f(x) = ax² + bx + c și înțelegi rolul coeficienților.",

  obiective: [
    {
      icon: "f",
      titlu: "Recunoaște funcția",
      descriere: "Identifici forma f(x) = ax² + bx + c.",
    },
    {
      icon: "🧮",
      titlu: "Calculează valori",
      descriere: "Determini f(x) pentru valori date.",
    },
    {
      icon: "〽️",
      titlu: "Pregătește graficul",
      descriere: "Înțelegi că graficul este o parabolă.",
    },
  ],

  videoLectii: [
    {
      numar: 1,
      titlu: "Forma funcției",
      durata: "4 min",
      descriere: "Funcția de gradul II are coeficientul lui x² nenul.",
      idei: [
        "f(x) = ax² + bx + c.",
        "a ≠ 0.",
        "Domeniul uzual este ℝ.",
      ],
      exempluTitlu: "Exemplu",
      exemplu: "f(x) = 2x² - 3x + 1.",
    },
    {
      numar: 2,
      titlu: "Calculul valorilor",
      durata: "4 min",
      descriere: "Înlocuiești x și calculezi.",
      idei: [
        "Înlocuiești x.",
        "Calculezi mai întâi puterea.",
        "Apoi înmulțirile și adunările.",
      ],
      exempluTitlu: "Exemplu",
      exemplu: "f(x)=x²-2x+1 → f(3)=9-6+1=4.",
    },
    {
      numar: 3,
      titlu: "Rolul lui a",
      durata: "4 min",
      descriere: "Semnul lui a stabilește orientarea parabolei.",
      idei: [
        "a > 0 → deschidere în sus.",
        "a < 0 → deschidere în jos.",
        "a nu poate fi zero.",
      ],
      exempluTitlu: "Exemplu",
      exemplu: "f(x) = -x² + 4 are parabola orientată în jos.",
    },
  ],

  fisaRapida: {
    titlu: "Funcția de gradul II",
    continut: [
      "f(x) = ax² + bx + c",
      "a ≠ 0",
      "Graficul este o parabolă",
      "a > 0 → deschidere în sus",
      "a < 0 → deschidere în jos",
    ],
  },

  exercitii: [
    {
      intrebare: "Care este funcție de gradul al II-lea?",
      variante: [
        "f(x)=2x+1",
        "f(x)=x²-3x+2",
        "f(x)=x³",
        "f(x)=5",
      ],
      corect: 1,
      explicatie: "Are forma ax²+bx+c cu a≠0.",
    },
    {
      intrebare: "Pentru f(x)=x²+2x+1, f(1) este:",
      variante: ["1", "2", "4", "5"],
      corect: 2,
      explicatie: "1 + 2 + 1 = 4.",
    },
    {
      intrebare: "Pentru f(x)=2x²-3, f(0) este:",
      variante: ["0", "2", "-3", "3"],
      corect: 2,
      explicatie: "f(0) = -3.",
    },
    {
      intrebare: "Dacă a < 0, parabola este orientată:",
      variante: ["În sus", "În jos", "La dreapta", "La stânga"],
      corect: 1,
      explicatie: "Semnul negativ al lui a înseamnă deschidere în jos.",
    },
    {
      intrebare: "În f(x)=3x²-5x+7, c este:",
      variante: ["3", "-5", "5", "7"],
      corect: 3,
      explicatie: "Termenul liber este 7.",
    },
  ],

  storageKeyFinalizata: "lectie-functia-gradul-doi-finalizata",
  storageKeyXp: "lectie-functia-gradul-doi-xp",

  urmatoareaLectie: {
    titlu: "Graficul parabolei",
    href: "/lectii/graficul-parabolei",
  },
};

export const lectiaGraficulParabolei: Lectie = {
  id: "graficul-parabolei",
  slug: "graficul-parabolei",
  modul: 4,
  numarLectie: 6,
  totalLectiiModul: 13,
  clasa: "Clasa a IX-a",
  profil: "M_mate-info",
  titlu: "Graficul parabolei",
  descriere:
    "Înveți elementele principale necesare pentru reprezentarea grafică a unei funcții de gradul al II-lea.",

  obiective: [
    {
      icon: "〽️",
      titlu: "Recunoaște parabola",
      descriere: "Înțelegi forma graficului.",
    },
    {
      icon: "⬆️",
      titlu: "Stabilește orientarea",
      descriere: "Folosești semnul lui a.",
    },
    {
      icon: "📍",
      titlu: "Folosește puncte importante",
      descriere: "Rădăcini, Oy și vârf.",
    },
  ],

  videoLectii: [
    {
      numar: 1,
      titlu: "Forma parabolei",
      durata: "4 min",
      descriere: "Graficul funcției de gradul II este o parabolă.",
      idei: [
        "Parabola are o axă de simetrie.",
        "Are un vârf.",
        "Poate fi orientată în sus sau în jos.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Graficul lui f(x)=x² este parabola de bază, cu vârful în origine.",
    },
    {
      numar: 2,
      titlu: "Orientarea",
      durata: "3 min",
      descriere: "Semnul lui a este primul lucru pe care îl verificăm.",
      idei: [
        "a > 0 → sus.",
        "a < 0 → jos.",
        "Cu cât |a| este mai mare, parabola este mai îngustă.",
      ],
      exempluTitlu: "Exemplu",
      exemplu: "y = -2x² este orientată în jos.",
    },
    {
      numar: 3,
      titlu: "Punctele importante",
      durata: "5 min",
      descriere: "Folosim vârful și intersecțiile cu axele.",
      idei: [
        "Intersecția cu Oy se obține la x=0.",
        "Intersecțiile cu Ox sunt rădăcinile.",
        "Vârful controlează forma graficului.",
      ],
      exempluTitlu: "Exemplu",
      exemplu: "Pentru x²-4, parabola intersectează Ox în -2 și 2.",
    },
  ],

  fisaRapida: {
    titlu: "Parabola",
    continut: [
      "Graficul funcției de gradul II este o parabolă.",
      "a > 0 → sus",
      "a < 0 → jos",
      "Folosește vârful și intersecțiile cu axele.",
    ],
  },

  exercitii: [
    {
      intrebare: "Graficul funcției de gradul al II-lea este:",
      variante: ["Dreaptă", "Parabolă", "Cerc", "Hiperbolă"],
      corect: 1,
      explicatie: "Funcția de gradul II are ca grafic o parabolă.",
    },
    {
      intrebare: "Pentru f(x)=3x²+1, parabola este orientată:",
      variante: ["În jos", "În sus", "La stânga", "La dreapta"],
      corect: 1,
      explicatie: "a=3>0.",
    },
    {
      intrebare: "Pentru f(x)=-x²+2, parabola este orientată:",
      variante: ["În sus", "În jos", "Orizontal", "Nu are grafic"],
      corect: 1,
      explicatie: "a=-1<0.",
    },
    {
      intrebare: "Intersecția cu Oy se determină punând:",
      variante: ["x=0", "y=0", "Δ=0", "a=0"],
      corect: 0,
      explicatie: "Pe axa Oy coordonata x este zero.",
    },
    {
      intrebare: "Intersecțiile cu Ox corespund:",
      variante: [
        "Coeficientului a",
        "Rădăcinilor funcției",
        "Vârfului",
        "Termenului b",
      ],
      corect: 1,
      explicatie: "Pe Ox avem f(x)=0.",
    },
  ],

  storageKeyFinalizata: "lectie-graficul-parabolei-finalizata",
  storageKeyXp: "lectie-graficul-parabolei-xp",

  urmatoareaLectie: {
    titlu: "Vârful parabolei",
    href: "/lectii/varful-parabolei",
  },
};

export const lectiaVarfulParabolei: Lectie = {
  id: "varful-parabolei",
  slug: "varful-parabolei",
  modul: 4,
  numarLectie: 7,
  totalLectiiModul: 13,
  clasa: "Clasa a IX-a",
  profil: "M_mate-info",
  titlu: "Vârful parabolei",
  descriere:
    "Înveți să calculezi coordonatele vârfului și să interpretezi maximul sau minimul funcției.",

  obiective: [
    {
      icon: "📍",
      titlu: "Calculează xV",
      descriere: "Folosești xV = -b/(2a).",
    },
    {
      icon: "📌",
      titlu: "Calculează yV",
      descriere: "Folosești f(xV) sau -Δ/(4a).",
    },
    {
      icon: "🏔️",
      titlu: "Interpretează extremul",
      descriere: "Decizi dacă este maxim sau minim.",
    },
  ],

  videoLectii: [
    {
      numar: 1,
      titlu: "Coordonata x a vârfului",
      durata: "4 min",
      descriere: "Vârful se află pe axa de simetrie.",
      idei: [
        "xV = -b/(2a).",
        "Formula folosește a și b.",
        "Semnele trebuie păstrate.",
      ],
      exempluTitlu: "Exemplu",
      exemplu: "Pentru x²-4x+3: xV = 4/2 = 2.",
    },
    {
      numar: 2,
      titlu: "Coordonata y",
      durata: "4 min",
      descriere: "După xV calculăm valoarea funcției.",
      idei: [
        "yV = f(xV).",
        "Alternativ yV = -Δ/(4a).",
        "Ambele metode dau același rezultat.",
      ],
      exempluTitlu: "Exemplu",
      exemplu: "f(2)=4-8+3=-1, deci V(2,-1).",
    },
    {
      numar: 3,
      titlu: "Minim sau maxim",
      durata: "4 min",
      descriere: "Orientarea parabolei stabilește tipul extremului.",
      idei: [
        "a>0 → vârful este minim.",
        "a<0 → vârful este maxim.",
        "Valoarea extremă este yV.",
      ],
      exempluTitlu: "Exemplu",
      exemplu: "Pentru a>0 și V(2,-1), valoarea minimă este -1.",
    },
  ],

  fisaRapida: {
    titlu: "Vârful",
    continut: [
      "xV = -b/(2a)",
      "yV = f(xV)",
      "sau yV = -Δ/(4a)",
      "a > 0 → minim",
      "a < 0 → maxim",
    ],
  },

  exercitii: [
    {
      intrebare: "Pentru f(x)=x²-4x+3, xV este:",
      variante: ["-2", "2", "4", "-4"],
      corect: 1,
      explicatie: "xV=4/2=2.",
    },
    {
      intrebare: "Pentru aceeași funcție, yV este:",
      variante: ["-1", "0", "1", "3"],
      corect: 0,
      explicatie: "f(2)=4-8+3=-1.",
    },
    {
      intrebare: "Vârful este:",
      variante: ["(2,-1)", "(-2,1)", "(1,2)", "(0,3)"],
      corect: 0,
      explicatie: "V(2,-1).",
    },
    {
      intrebare: "Dacă a>0, vârful reprezintă:",
      variante: ["Maxim", "Minim", "Rădăcină", "Intersecția cu Oy"],
      corect: 1,
      explicatie: "Parabola este orientată în sus.",
    },
    {
      intrebare: "Formula alternativă pentru yV este:",
      variante: ["Δ/(2a)", "-Δ/(4a)", "-b/a", "c/a"],
      corect: 1,
      explicatie: "yV = -Δ/(4a).",
    },
  ],

  storageKeyFinalizata: "lectie-varful-parabolei-finalizata",
  storageKeyXp: "lectie-varful-parabolei-xp",

  urmatoareaLectie: {
    titlu: "Axa de simetrie",
    href: "/lectii/axa-de-simetrie",
  },
};

export const lectiaAxaSimetrie: Lectie = {
  id: "axa-de-simetrie",
  slug: "axa-de-simetrie",
  modul: 4,
  numarLectie: 8,
  totalLectiiModul: 13,
  clasa: "Clasa a IX-a",
  profil: "M_mate-info",
  titlu: "Axa de simetrie",
  descriere:
    "Înveți să găsești axa de simetrie a parabolei și legătura ei cu vârful și rădăcinile.",

  obiective: [
    {
      icon: "↕️",
      titlu: "Găsește axa",
      descriere: "Folosești ecuația x = -b/(2a).",
    },
    {
      icon: "📍",
      titlu: "Leagă axa de vârf",
      descriere: "Vârful aparține axei.",
    },
    {
      icon: "⚖️",
      titlu: "Folosește simetria",
      descriere: "Înțelegi poziția punctelor simetrice.",
    },
  ],

  videoLectii: [
    {
      numar: 1,
      titlu: "Ecuația axei",
      durata: "4 min",
      descriere: "Axa trece vertical prin vârful parabolei.",
      idei: [
        "x = -b/(2a).",
        "Este aceeași valoare ca xV.",
        "Este o dreaptă verticală.",
      ],
      exempluTitlu: "Exemplu",
      exemplu: "Pentru x²-6x+5, axa este x=3.",
    },
    {
      numar: 2,
      titlu: "Simetria rădăcinilor",
      durata: "4 min",
      descriere: "Când există două rădăcini, axa este la mijlocul lor.",
      idei: [
        "xV=(x₁+x₂)/2.",
        "Rădăcinile sunt simetrice față de axă.",
        "Distanțele până la axă sunt egale.",
      ],
      exempluTitlu: "Exemplu",
      exemplu: "Rădăcini 1 și 5 → axa este x=3.",
    },
    {
      numar: 3,
      titlu: "Puncte simetrice",
      durata: "3 min",
      descriere: "Valori egal depărtate de axă au aceeași imagine.",
      idei: [
        "f(xV-d)=f(xV+d).",
        "Parabola este simetrică.",
        "Este util la desenarea graficului.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Dacă axa este x=2, punctele cu x=1 și x=3 au aceeași valoare y.",
    },
  ],

  fisaRapida: {
    titlu: "Axa de simetrie",
    continut: [
      "x = -b/(2a)",
      "Axa trece prin vârf.",
      "xV = (x₁+x₂)/2 când există două rădăcini.",
      "Parabola este simetrică față de această dreaptă.",
    ],
  },

  exercitii: [
    {
      intrebare: "Axa parabolei f(x)=x²-6x+5 este:",
      variante: ["x=-3", "x=3", "y=3", "x=6"],
      corect: 1,
      explicatie: "x=-(-6)/(2)=3.",
    },
    {
      intrebare: "Axa de simetrie trece prin:",
      variante: [
        "Origine mereu",
        "Vârful parabolei",
        "Orice rădăcină",
        "Oy mereu",
      ],
      corect: 1,
      explicatie: "Coordonata x a vârfului definește axa.",
    },
    {
      intrebare: "Dacă rădăcinile sunt 2 și 8, axa este:",
      variante: ["x=3", "x=4", "x=5", "x=10"],
      corect: 2,
      explicatie: "(2+8)/2=5.",
    },
    {
      intrebare: "Ecuația axei este de forma:",
      variante: ["y=k", "x=k", "y=ax+b", "x²=k"],
      corect: 1,
      explicatie: "Axa este o dreaptă verticală.",
    },
    {
      intrebare: "Dacă axa este x=4, valorile x=3 și x=5 sunt:",
      variante: [
        "Rădăcini obligatoriu",
        "Simetrice față de axă",
        "Egale",
        "Imposibile",
      ],
      corect: 1,
      explicatie: "Ambele sunt la distanța 1 de axă.",
    },
  ],

  storageKeyFinalizata: "lectie-axa-de-simetrie-finalizata",
  storageKeyXp: "lectie-axa-de-simetrie-xp",

  urmatoareaLectie: {
    titlu: "Intersecția parabolei cu axele",
    href: "/lectii/intersectia-parabolei-cu-axele",
  },
};

export const lectiaIntersectiiParabola: Lectie = {
  id: "intersectia-parabolei-cu-axele",
  slug: "intersectia-parabolei-cu-axele",
  modul: 4,
  numarLectie: 9,
  totalLectiiModul: 13,
  clasa: "Clasa a IX-a",
  profil: "M_mate-info",
  titlu: "Intersecția parabolei cu axele",
  descriere:
    "Determini punctele în care parabola intersectează axele Ox și Oy.",

  obiective: [
    {
      icon: "X",
      titlu: "Intersecția cu Ox",
      descriere: "Rezolvi f(x)=0.",
    },
    {
      icon: "Y",
      titlu: "Intersecția cu Oy",
      descriere: "Calculezi f(0)=c.",
    },
    {
      icon: "📊",
      titlu: "Interpretează Δ",
      descriere: "Legi numărul rădăcinilor de grafic.",
    },
  ],

  videoLectii: [
    {
      numar: 1,
      titlu: "Intersecția cu Oy",
      durata: "3 min",
      descriere: "Pe Oy avem x=0.",
      idei: [
        "f(0)=c.",
        "Punctul este (0,c).",
        "Există întotdeauna pentru funcția definită pe ℝ.",
      ],
      exempluTitlu: "Exemplu",
      exemplu: "f(x)=x²-3x+2 intersectează Oy în (0,2).",
    },
    {
      numar: 2,
      titlu: "Intersecția cu Ox",
      durata: "4 min",
      descriere: "Pe Ox avem y=0.",
      idei: [
        "Rezolvăm ax²+bx+c=0.",
        "Rădăcinile sunt abscisele punctelor.",
        "Δ stabilește numărul intersecțiilor.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "x²-3x+2=0 → x=1 și x=2 → punctele (1,0) și (2,0).",
    },
    {
      numar: 3,
      titlu: "Cele trei situații",
      durata: "4 min",
      descriere: "Δ are interpretare geometrică.",
      idei: [
        "Δ>0 → două intersecții cu Ox.",
        "Δ=0 → parabola atinge Ox.",
        "Δ<0 → nu intersectează Ox.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Pentru Δ=0, parabola are un singur punct comun cu Ox.",
    },
  ],

  fisaRapida: {
    titlu: "Intersecții",
    continut: [
      "Oy: x=0 → (0,c)",
      "Ox: f(x)=0",
      "Δ>0 → 2 puncte cu Ox",
      "Δ=0 → 1 punct cu Ox",
      "Δ<0 → 0 puncte cu Ox",
    ],
  },

  exercitii: [
    {
      intrebare: "Pentru f(x)=x²-5x+6, intersecția cu Oy este:",
      variante: ["(0,6)", "(6,0)", "(0,-5)", "(1,0)"],
      corect: 0,
      explicatie: "f(0)=6.",
    },
    {
      intrebare: "Pentru aceeași funcție, intersecțiile cu Ox sunt:",
      variante: [
        "(2,0) și (3,0)",
        "(0,2) și (0,3)",
        "(1,0) și (6,0)",
        "Nu există",
      ],
      corect: 0,
      explicatie: "Rădăcinile sunt 2 și 3.",
    },
    {
      intrebare: "Dacă Δ<0, parabola are cu Ox:",
      variante: [
        "Două puncte comune",
        "Un punct comun",
        "Niciun punct comun",
        "Infinit de puncte",
      ],
      corect: 2,
      explicatie: "Ecuația f(x)=0 nu are soluții reale.",
    },
    {
      intrebare: "Dacă Δ=0, parabola:",
      variante: [
        "Taie Ox în două puncte",
        "Are un singur punct comun cu Ox",
        "Nu are grafic",
        "Coincide cu Ox",
      ],
      corect: 1,
      explicatie: "Există o rădăcină dublă.",
    },
    {
      intrebare: "Punctele de pe Ox au coordonata:",
      variante: ["x=0", "y=0", "x=y", "y=1"],
      corect: 1,
      explicatie: "Pe axa Ox ordonata este zero.",
    },
  ],

  storageKeyFinalizata:
    "lectie-intersectia-parabolei-cu-axele-finalizata",
  storageKeyXp: "lectie-intersectia-parabolei-cu-axele-xp",

  urmatoareaLectie: {
    titlu: "Semnul funcției de gradul al II-lea",
    href: "/lectii/semnul-functiei-gradul-doi",
  },
};

export const lectiaSemnulGradulDoi: Lectie = {
  id: "semnul-functiei-gradul-doi",
  slug: "semnul-functiei-gradul-doi",
  modul: 4,
  numarLectie: 10,
  totalLectiiModul: 13,
  clasa: "Clasa a IX-a",
  profil: "M_mate-info",
  titlu: "Semnul funcției de gradul al II-lea",
  descriere:
    "Înveți regula semnului trinomului de gradul al II-lea în funcție de a, Δ și rădăcini.",

  obiective: [
    {
      icon: "➕",
      titlu: "Stabilește semnul",
      descriere: "Identifici intervalele pozitive.",
    },
    {
      icon: "➖",
      titlu: "Identifică intervalele negative",
      descriere: "Folosești rădăcinile și semnul lui a.",
    },
    {
      icon: "📋",
      titlu: "Construiește tabelul",
      descriere: "Organizezi semnul corect.",
    },
  ],

  videoLectii: [
    {
      numar: 1,
      titlu: "Cazul Δ > 0",
      durata: "5 min",
      descriere: "Există două rădăcini x₁<x₂.",
      idei: [
        "În exteriorul rădăcinilor semnul este semnul lui a.",
        "Între rădăcini semnul este opus lui a.",
        "În rădăcini valoarea este zero.",
      ],
      exempluTitlu: "Regulă",
      exemplu: "Pentru a>0: + | 0 | − | 0 | +.",
    },
    {
      numar: 2,
      titlu: "Cazul Δ = 0",
      durata: "4 min",
      descriere: "Există o rădăcină dublă.",
      idei: [
        "Funcția are semnul lui a în afara rădăcinii.",
        "Este zero în rădăcina dublă.",
        "Semnul nu se schimbă.",
      ],
      exempluTitlu: "Exemplu",
      exemplu: "(x-2)² ≥ 0 pentru orice x și este zero doar la x=2.",
    },
    {
      numar: 3,
      titlu: "Cazul Δ < 0",
      durata: "4 min",
      descriere: "Nu există rădăcini reale.",
      idei: [
        "Funcția nu se anulează.",
        "Are mereu semnul lui a.",
        "a>0 → mereu pozitivă; a<0 → mereu negativă.",
      ],
      exempluTitlu: "Exemplu",
      exemplu: "x²+1 > 0 pentru orice x real.",
    },
  ],

  fisaRapida: {
    titlu: "Semnul trinomului",
    continut: [
      "Δ>0: semnul lui a în exterior, opus între rădăcini",
      "Δ=0: semnul lui a, zero la rădăcina dublă",
      "Δ<0: mereu semnul lui a",
    ],
  },

  exercitii: [
    {
      intrebare:
        "Pentru a>0 și Δ>0, între rădăcini funcția este:",
      variante: ["Pozitivă", "Negativă", "Mereu zero", "Nedefinită"],
      corect: 1,
      explicatie: "Între rădăcini semnul este opus lui a.",
    },
    {
      intrebare:
        "Pentru a<0 și Δ>0, în exteriorul rădăcinilor funcția este:",
      variante: ["Pozitivă", "Negativă", "Zero", "Nu se poate ști"],
      corect: 1,
      explicatie: "În exterior are semnul lui a.",
    },
    {
      intrebare: "Dacă Δ<0 și a>0, funcția este:",
      variante: [
        "Mereu pozitivă",
        "Mereu negativă",
        "Uneori zero",
        "Nedefinită",
      ],
      corect: 0,
      explicatie: "Nu are rădăcini și are semnul lui a.",
    },
    {
      intrebare: "Pentru (x-3)², semnul este:",
      variante: [
        "Negativ mereu",
        "Nenegativ",
        "Pozitiv mereu fără excepție",
        "Nedefinit",
      ],
      corect: 1,
      explicatie: "Este ≥0 și egal cu zero la x=3.",
    },
    {
      intrebare: "În rădăcinile funcției, valoarea este:",
      variante: ["1", "-1", "0", "a"],
      corect: 2,
      explicatie: "Prin definiție rădăcinile satisfac f(x)=0.",
    },
  ],

  storageKeyFinalizata:
    "lectie-semnul-functiei-gradul-doi-finalizata",
  storageKeyXp: "lectie-semnul-functiei-gradul-doi-xp",

  urmatoareaLectie: {
    titlu: "Inecuații de gradul al II-lea",
    href: "/lectii/inecuatii-gradul-doi",
  },
};

export const lectiaInecuatiiGradulDoi: Lectie = {
  id: "inecuatii-gradul-doi",
  slug: "inecuatii-gradul-doi",
  modul: 4,
  numarLectie: 11,
  totalLectiiModul: 13,
  clasa: "Clasa a IX-a",
  profil: "M_mate-info",
  titlu: "Inecuații de gradul al II-lea",
  descriere:
    "Rezolvi inecuații de gradul al II-lea folosind rădăcinile și tabelul de semn.",

  obiective: [
    {
      icon: "Δ",
      titlu: "Găsește rădăcinile",
      descriere: "Rezolvi ecuația asociată.",
    },
    {
      icon: "📋",
      titlu: "Construiește semnul",
      descriere: "Aplici regula trinomului.",
    },
    {
      icon: "↔️",
      titlu: "Scrie soluția",
      descriere: "Exprimi rezultatul cu intervale.",
    },
  ],

  videoLectii: [
    {
      numar: 1,
      titlu: "Schema de rezolvare",
      durata: "5 min",
      descriere: "Inecuația se reduce la studiul semnului.",
      idei: [
        "Aducem expresia la zero.",
        "Calculăm rădăcinile.",
        "Facem tabelul de semn.",
        "Selectăm intervalele cerute.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "x²-5x+6>0 → rădăcini 2 și 3 → x∈]-∞,2[∪]3,+∞[.",
    },
    {
      numar: 2,
      titlu: "Inegalități stricte și nestricte",
      durata: "4 min",
      descriere: "Rădăcinile se includ doar pentru ≤ sau ≥.",
      idei: [
        "> și < nu includ rădăcinile.",
        "≥ și ≤ includ rădăcinile.",
        "Parantezele intervalelor sunt importante.",
      ],
      exempluTitlu: "Exemplu",
      exemplu: "x²-5x+6≥0 → ]-∞,2] ∪ [3,+∞[.",
    },
    {
      numar: 3,
      titlu: "Caz fără rădăcini",
      durata: "4 min",
      descriere: "Când Δ<0, soluția poate fi foarte simplă.",
      idei: [
        "Semnul este semnul lui a.",
        "Verificăm ce semn cere inecuația.",
        "Soluția poate fi ℝ sau ∅.",
      ],
      exempluTitlu: "Exemplu",
      exemplu: "x²+1>0 → soluția este ℝ.",
    },
  ],

  fisaRapida: {
    titlu: "Pași",
    continut: [
      "1. Aduci totul într-un membru.",
      "2. Calculezi rădăcinile.",
      "3. Faci tabelul de semn.",
      "4. Alegi intervalele cerute.",
      "5. Incluzi rădăcinile pentru ≤ sau ≥.",
    ],
  },

  exercitii: [
    {
      intrebare: "Soluția lui x²-5x+6<0 este:",
      variante: ["]2,3[", "]-∞,2[∪]3,+∞[", "[2,3]", "ℝ"],
      corect: 0,
      explicatie:
        "Pentru a>0, expresia este negativă între rădăcini.",
    },
    {
      intrebare: "Soluția lui x²-5x+6≤0 este:",
      variante: ["]2,3[", "[2,3]", "]-∞,2]∪[3,+∞[", "∅"],
      corect: 1,
      explicatie: "Inegalitatea include și rădăcinile.",
    },
    {
      intrebare: "Soluția lui x²+1>0 este:",
      variante: ["ℝ", "∅", "{0}", "]0,+∞["],
      corect: 0,
      explicatie: "x²+1 este strict pozitiv pentru orice x real.",
    },
    {
      intrebare: "Pentru semnul ≥0, rădăcinile:",
      variante: ["Se exclud", "Se includ", "Nu contează", "Se schimbă"],
      corect: 1,
      explicatie: "În rădăcini expresia este egală cu zero.",
    },
    {
      intrebare: "Prima etapă este:",
      variante: [
        "Desenăm aleator",
        "Aducem inecuația la forma cu zero într-un membru",
        "Alegem răspunsul",
        "Punem x=0 mereu",
      ],
      corect: 1,
      explicatie:
        "Trebuie să studiem semnul unei expresii de gradul II.",
    },
  ],

  storageKeyFinalizata: "lectie-inecuatii-gradul-doi-finalizata",
  storageKeyXp: "lectie-inecuatii-gradul-doi-xp",

  urmatoareaLectie: {
    titlu: "Poziția relativă dreaptă-parabolă",
    href: "/lectii/pozitia-relativa-dreapta-parabola",
  },
};

export const lectiaDreaptaParabola: Lectie = {
  id: "pozitia-relativa-dreapta-parabola",
  slug: "pozitia-relativa-dreapta-parabola",
  modul: 4,
  numarLectie: 12,
  totalLectiiModul: 13,
  clasa: "Clasa a IX-a",
  profil: "M_mate-info",
  titlu: "Poziția relativă dreaptă-parabolă",
  descriere:
    "Determini numărul punctelor comune dintre o dreaptă și o parabolă prin rezolvarea unei ecuații de gradul al II-lea.",

  obiective: [
    {
      icon: "📏",
      titlu: "Egalează ecuațiile",
      descriere: "Rezolvi f(x)=g(x).",
    },
    {
      icon: "Δ",
      titlu: "Folosește discriminantul",
      descriere:
        "Numărul soluțiilor devine numărul intersecțiilor.",
    },
    {
      icon: "🎯",
      titlu: "Recunoaște tangenta",
      descriere: "Δ=0 înseamnă un singur punct comun.",
    },
  ],

  videoLectii: [
    {
      numar: 1,
      titlu: "Punctele comune",
      durata: "5 min",
      descriere:
        "Într-un punct comun, cele două grafice au aceeași valoare y.",
      idei: [
        "Egalăm expresiile.",
        "Obținem o ecuație de gradul II.",
        "Soluțiile x dau punctele comune.",
      ],
      exempluTitlu: "Exemplu",
      exemplu: "y=x² și y=x+2 → x²=x+2 → x²-x-2=0.",
    },
    {
      numar: 2,
      titlu: "Interpretarea discriminantului",
      durata: "4 min",
      descriere: "Δ are o interpretare geometrică directă.",
      idei: [
        "Δ>0 → două puncte comune.",
        "Δ=0 → un punct comun.",
        "Δ<0 → niciun punct comun.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Dacă ecuația obținută are Δ=0, dreapta este tangentă la parabolă.",
    },
    {
      numar: 3,
      titlu: "Calculul coordonatelor",
      durata: "4 min",
      descriere: "După x calculăm y într-una dintre ecuații.",
      idei: [
        "Calculăm x.",
        "Înlocuim în ecuația dreptei sau parabolei.",
        "Scriem punctul (x,y).",
      ],
      exempluTitlu: "Exemplu",
      exemplu: "x=2 și y=x+1 → punctul este (2,3).",
    },
  ],

  fisaRapida: {
    titlu: "Dreaptă și parabolă",
    continut: [
      "Egalăm ecuațiile.",
      "Δ>0 → 2 puncte comune.",
      "Δ=0 → tangentă, 1 punct comun.",
      "Δ<0 → niciun punct comun.",
    ],
  },

  exercitii: [
    {
      intrebare: "Pentru a găsi punctele comune, trebuie:",
      variante: [
        "Să adunăm graficele",
        "Să egalăm expresiile",
        "Să punem mereu x=0",
        "Să folosim doar b",
      ],
      corect: 1,
      explicatie: "În punctele comune valorile lui y sunt egale.",
    },
    {
      intrebare:
        "Dacă ecuația obținută are Δ>0, dreapta și parabola au:",
      variante: [
        "0 puncte",
        "1 punct",
        "2 puncte",
        "Infinit de puncte",
      ],
      corect: 2,
      explicatie:
        "Două soluții distincte înseamnă două abscise distincte.",
    },
    {
      intrebare: "Δ=0 înseamnă că dreapta este:",
      variante: [
        "Paralelă cu Ox obligatoriu",
        "Tangentă la parabolă",
        "Coincidentă cu parabola",
        "Verticală",
      ],
      corect: 1,
      explicatie: "Există un singur punct comun.",
    },
    {
      intrebare: "Δ<0 înseamnă:",
      variante: [
        "Două puncte comune",
        "Un punct comun",
        "Niciun punct comun real",
        "Aceeași curbă",
      ],
      corect: 2,
      explicatie: "Ecuația de intersecție nu are soluții reale.",
    },
    {
      intrebare: "După ce găsim x-ul unui punct comun:",
      variante: [
        "Nu mai calculăm nimic",
        "Calculăm y prin înlocuire",
        "Punem y=0 obligatoriu",
        "Schimbăm semnul lui a",
      ],
      corect: 1,
      explicatie:
        "Coordonata y se obține înlocuind x într-una dintre ecuații.",
    },
  ],

  storageKeyFinalizata:
    "lectie-pozitia-relativa-dreapta-parabola-finalizata",
  storageKeyXp: "lectie-pozitia-relativa-dreapta-parabola-xp",

  urmatoareaLectie: {
    titlu: "Probleme cu parametru",
    href: "/lectii/probleme-cu-parametru-gradul-doi",
  },
};

export const lectiaProblemeParametruGradulDoi: Lectie = {
  id: "probleme-cu-parametru-gradul-doi",
  slug: "probleme-cu-parametru-gradul-doi",
  modul: 4,
  numarLectie: 13,
  totalLectiiModul: 13,
  clasa: "Clasa a IX-a",
  profil: "M_mate-info",
  titlu: "Probleme cu parametru",
  descriere:
    "Folosești discriminantul și relațiile lui Viète pentru a determina valorile unui parametru.",

  obiective: [
    {
      icon: "m",
      titlu: "Identifică parametrul",
      descriere:
        "Separi necunoscuta x de parametrul problemei.",
    },
    {
      icon: "Δ",
      titlu: "Transformă condiția",
      descriere: "Folosești Δ>0, Δ=0 sau Δ≥0.",
    },
    {
      icon: "🧠",
      titlu: "Aplică Viète",
      descriere:
        "Transformi condițiile despre rădăcini în relații algebrice.",
    },
  ],

  videoLectii: [
    {
      numar: 1,
      titlu: "Ce este parametrul?",
      durata: "4 min",
      descriere:
        "Parametrul este tratat ca un număr fix a cărui valoare trebuie determinată.",
      idei: [
        "x este necunoscuta ecuației.",
        "m este parametrul.",
        "Coeficienții pot depinde de m.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "x² - 2x + m = 0 este o familie de ecuații, în funcție de m.",
    },
    {
      numar: 2,
      titlu: "Condiții asupra numărului de rădăcini",
      durata: "5 min",
      descriere:
        "Traducem textul problemei într-o condiție pe Δ.",
      idei: [
        "Două rădăcini reale distincte → Δ>0.",
        "Rădăcină dublă → Δ=0.",
        "Cel puțin o rădăcină reală → Δ≥0.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "x²-2x+m=0 are Δ=4-4m. Pentru două rădăcini distincte: m<1.",
    },
    {
      numar: 3,
      titlu: "Condiții prin Viète",
      durata: "5 min",
      descriere:
        "Când problema vorbește despre suma sau produsul rădăcinilor, Viète este de obicei cea mai rapidă cale.",
      idei: [
        "S=-b/a.",
        "P=c/a.",
        "Transformăm condiția cerută într-o ecuație sau inecuație în parametru.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Dacă produsul rădăcinilor trebuie să fie 3, impunem c/a=3.",
    },
  ],

  fisaRapida: {
    titlu: "Probleme cu parametru",
    continut: [
      "2 rădăcini reale distincte → Δ>0",
      "1 rădăcină dublă → Δ=0",
      "Rădăcini reale → Δ≥0",
      "Suma rădăcinilor → -b/a",
      "Produsul rădăcinilor → c/a",
    ],
  },

  exercitii: [
    {
      intrebare:
        "Pentru ca o ecuație să aibă două rădăcini reale distincte trebuie:",
      variante: ["Δ<0", "Δ=0", "Δ>0", "a=0"],
      corect: 2,
      explicatie:
        "Aceasta este condiția pentru două rădăcini reale distincte.",
    },
    {
      intrebare: "Pentru x²-2x+m=0, discriminantul este:",
      variante: ["4+4m", "4-4m", "2-m", "m²-4"],
      corect: 1,
      explicatie: "Δ=(-2)²-4·1·m=4-4m.",
    },
    {
      intrebare: "Aceeași ecuație are două rădăcini distincte dacă:",
      variante: ["m<1", "m=1", "m>1", "m=0 doar"],
      corect: 0,
      explicatie: "4-4m>0 ⇒ m<1.",
    },
    {
      intrebare: "Pentru rădăcină dublă impunem:",
      variante: ["Δ>0", "Δ<0", "Δ=0", "c=0 obligatoriu"],
      corect: 2,
      explicatie:
        "Rădăcina dublă apare exact când discriminantul este zero.",
    },
    {
      intrebare:
        "Dacă problema cere produsul rădăcinilor, folosim rapid:",
      variante: ["-b/a", "c/a", "-Δ/(4a)", "2a"],
      corect: 1,
      explicatie:
        "Relația lui Viète pentru produs este x₁x₂=c/a.",
    },
  ],

  storageKeyFinalizata:
    "lectie-probleme-cu-parametru-gradul-doi-finalizata",
  storageKeyXp: "lectie-probleme-cu-parametru-gradul-doi-xp",

  urmatoareaLectie: {
    titlu: "Continuă cu Modulul 5",
    href: "/programa",
  },
};

export const lectiiModul4: Lectie[] = [
  lectiaEcuatiaGradulDoi,
  lectiaDiscriminantul,
  lectiaFormuleleRadacinilor,
  lectiaRelatiileViete,
  lectiaFunctiaGradulDoi,
  lectiaGraficulParabolei,
  lectiaVarfulParabolei,
  lectiaAxaSimetrie,
  lectiaIntersectiiParabola,
  lectiaSemnulGradulDoi,
  lectiaInecuatiiGradulDoi,
  lectiaDreaptaParabola,
  lectiaProblemeParametruGradulDoi,
];