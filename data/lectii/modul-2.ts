import type { Lectie } from "./tipuri";

/* =========================================================
   MODULUL 2 — ȘIRURI ȘI FUNCȚII
   CLASA A IX-A — M_mate-info
   ========================================================= */

export const lectiaReperCartezian: Lectie = {
  id: "reper-cartezian-produs-cartezian",
  slug: "reper-cartezian-produs-cartezian",

  modul: 2,
  numarLectie: 1,
  totalLectiiModul: 14,

  clasa: "Clasa a IX-a",
  profil: "M_mate-info",

  titlu: "Reper cartezian și produs cartezian",

  descriere:
    "Înveți cum localizăm puncte în plan, cum identificăm cadranele și cum reprezentăm produsul cartezian al două mulțimi numerice.",

  obiective: [
    {
      icon: "📍",
      titlu: "Să citești coordonate",
      descriere:
        "Vei identifica abscisa și ordonata unui punct.",
    },
    {
      icon: "🧭",
      titlu: "Să recunoști cadranele",
      descriere:
        "Vei determina cadranul unui punct după semnele coordonatelor.",
    },
    {
      icon: "×",
      titlu: "Să înțelegi produsul cartezian",
      descriere:
        "Vei construi perechi ordonate din două mulțimi.",
    },
  ],

  videoLectii: [
    {
      numar: 1,
      titlu: "Reperul cartezian",
      durata: "4 min",
      descriere:
        "Planul cartezian este format din două axe perpendiculare.",
      idei: [
        "Axa Ox este axa absciselor.",
        "Axa Oy este axa ordonatelor.",
        "Originea este punctul O(0, 0).",
        "Un punct se scrie A(x, y).",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Punctul A(3, 2) are abscisa 3 și ordonata 2.",
    },
    {
      numar: 2,
      titlu: "Cele patru cadrane",
      durata: "4 min",
      descriere:
        "Semnele coordonatelor ne arată în ce cadran se află un punct.",
      idei: [
        "Cadranul I: x > 0 și y > 0.",
        "Cadranul II: x < 0 și y > 0.",
        "Cadranul III: x < 0 și y < 0.",
        "Cadranul IV: x > 0 și y < 0.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Punctul B(-2, 5) se află în cadranul al II-lea.",
    },
    {
      numar: 3,
      titlu: "Produsul cartezian",
      durata: "5 min",
      descriere:
        "Construim mulțimea tuturor perechilor ordonate posibile.",
      idei: [
        "A × B este mulțimea perechilor (a, b).",
        "Primul element aparține lui A.",
        "Al doilea element aparține lui B.",
        "Ordinea elementelor din pereche contează.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Dacă A={1,2} și B={3,4}, atunci A×B={(1,3),(1,4),(2,3),(2,4)}.",
    },
  ],

  fisaRapida: {
    titlu: "Ce trebuie să reții",
    continut: [
      "Punctul A(x, y): x este abscisa, y este ordonata.",
      "Originea este O(0,0).",
      "Semnele lui x și y determină cadranul.",
      "A × B conține toate perechile (a,b), cu a∈A și b∈B.",
      "În general, A × B nu este același lucru cu B × A.",
    ],
  },

  exercitii: [
    {
      intrebare: "Care este abscisa punctului A(-3, 5)?",
      variante: ["5", "-3", "3", "-5"],
      corect: 1,
      explicatie:
        "Prima coordonată este abscisa, deci abscisa este -3.",
    },
    {
      intrebare: "În ce cadran se află punctul B(-2, 4)?",
      variante: ["I", "II", "III", "IV"],
      corect: 1,
      explicatie:
        "x este negativ, iar y pozitiv, deci punctul este în cadranul II.",
    },
    {
      intrebare: "Punctul C(4, -1) se află în cadranul:",
      variante: ["I", "II", "III", "IV"],
      corect: 3,
      explicatie:
        "x > 0 și y < 0 corespund cadranului IV.",
    },
    {
      intrebare:
        "Dacă A={1,2} și B={3}, atunci A×B este:",
      variante: [
        "{(1,3),(2,3)}",
        "{(3,1),(3,2)}",
        "{1,2,3}",
        "{(1,2,3)}",
      ],
      corect: 0,
      explicatie:
        "Primul element al perechii vine din A, al doilea din B.",
    },
    {
      intrebare: "Ce punct reprezintă originea reperului?",
      variante: ["(1,1)", "(0,1)", "(1,0)", "(0,0)"],
      corect: 3,
      explicatie:
        "Originea axelor are ambele coordonate egale cu zero.",
    },
  ],

  storageKeyFinalizata:
    "lectie-reper-cartezian-produs-cartezian-finalizata",
  storageKeyXp:
    "lectie-reper-cartezian-produs-cartezian-xp",

  urmatoareaLectie: {
    titlu: "Noțiunea de funcție",
    href: "/lectii/notiunea-de-functie",
  },
};

/* =========================================================
   LECȚIA 2
   ========================================================= */

export const lectiaNotiuneaDeFunctie: Lectie = {
  id: "notiunea-de-functie",
  slug: "notiunea-de-functie",

  modul: 2,
  numarLectie: 2,
  totalLectiiModul: 14,

  clasa: "Clasa a IX-a",
  profil: "M_mate-info",

  titlu: "Noțiunea de funcție",

  descriere:
    "Înveți ce este o funcție și cum deosebim o funcție de o corespondență care nu este funcție.",

  obiective: [
    {
      icon: "f",
      titlu: "Să recunoști o funcție",
      descriere:
        "Vei înțelege regula fundamentală a unei funcții.",
    },
    {
      icon: "→",
      titlu: "Să citești notația",
      descriere:
        "Vei interpreta corect scrierea f: A → B.",
    },
    {
      icon: "🧠",
      titlu: "Să identifici cazurile greșite",
      descriere:
        "Vei recunoaște corespondențele care nu sunt funcții.",
    },
  ],

  videoLectii: [
    {
      numar: 1,
      titlu: "Ce este o funcție?",
      durata: "4 min",
      descriere:
        "O funcție asociază fiecărui element din domeniu exact o valoare.",
      idei: [
        "Fiecărui x din domeniu îi corespunde o singură valoare.",
        "Notația uzuală este f: A → B.",
        "Scriem y=f(x).",
        "Aceeași valoare y poate corespunde mai multor valori x.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "f(x)=2x+1 este o funcție: pentru fiecare x obținem exact o valoare.",
    },
    {
      numar: 2,
      titlu: "Ce NU este o funcție?",
      durata: "4 min",
      descriere:
        "Vedem situațiile în care regula funcției nu este respectată.",
      idei: [
        "Un x nu poate avea două imagini diferite.",
        "Fiecare element din domeniu trebuie să aibă imagine.",
        "Mai multe valori x pot avea aceeași imagine.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Dacă lui x=1 îi asociem simultan 2 și 3, corespondența nu este funcție.",
    },
    {
      numar: 3,
      titlu: "Calcularea valorilor unei funcții",
      durata: "5 min",
      descriere:
        "Înlocuim x cu valoarea cerută în formula funcției.",
      idei: [
        "Pentru f(2), înlocuim x cu 2.",
        "Respectăm ordinea operațiilor.",
        "Rezultatul este imaginea lui 2 prin funcția f.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Dacă f(x)=3x-1, atunci f(2)=3·2-1=5.",
    },
  ],

  fisaRapida: {
    titlu: "Definiția practică",
    continut: [
      "O funcție atribuie fiecărui element din domeniu exact o imagine.",
      "f: A → B înseamnă funcție de la A la B.",
      "f(x) este imaginea lui x.",
      "Un x nu poate avea două imagini diferite.",
    ],
  },

  exercitii: [
    {
      intrebare:
        "Dacă f(x)=2x+3, atunci f(1) este:",
      variante: ["2", "3", "5", "6"],
      corect: 2,
      explicatie:
        "f(1)=2·1+3=5.",
    },
    {
      intrebare:
        "Într-o funcție, unui element din domeniu îi pot corespunde:",
      variante: [
        "Exact două imagini",
        "Exact o imagine",
        "Oricâte imagini",
        "Nicio imagine",
      ],
      corect: 1,
      explicatie:
        "Aceasta este condiția fundamentală pentru a avea o funcție.",
    },
    {
      intrebare:
        "Dacă f(x)=x², atunci f(-3)=",
      variante: ["-9", "9", "-6", "6"],
      corect: 1,
      explicatie:
        "(-3)²=9.",
    },
    {
      intrebare: "Ce reprezintă f(x)?",
      variante: [
        "Imaginea lui x",
        "Domeniul",
        "Codomeniul",
        "Axa Ox",
      ],
      corect: 0,
      explicatie:
        "f(x) este valoarea asociată lui x prin funcția f.",
    },
    {
      intrebare:
        "O corespondență în care același x are două valori diferite este:",
      variante: [
        "Întotdeauna funcție",
        "Nu este funcție",
        "Funcție constantă",
        "Funcție periodică",
      ],
      corect: 1,
      explicatie:
        "Un element din domeniu trebuie să aibă o singură imagine.",
    },
  ],

  storageKeyFinalizata:
    "lectie-notiunea-de-functie-finalizata",
  storageKeyXp:
    "lectie-notiunea-de-functie-xp",

  urmatoareaLectie: {
    titlu: "Domeniu, codomeniu și imagine",
    href: "/lectii/domeniu-codomeniu-imagine",
  },
};

/* =========================================================
   LECȚIA 3
   ========================================================= */

export const lectiaDomeniuCodomeniuImagine: Lectie = {
  id: "domeniu-codomeniu-imagine",
  slug: "domeniu-codomeniu-imagine",

  modul: 2,
  numarLectie: 3,
  totalLectiiModul: 14,

  clasa: "Clasa a IX-a",
  profil: "M_mate-info",

  titlu: "Domeniu, codomeniu și imagine",

  descriere:
    "Înveți să identifici domeniul, codomeniul și imaginile elementelor printr-o funcție.",

  obiective: [
    {
      icon: "D",
      titlu: "Să identifici domeniul",
      descriere:
        "Vei vedea de unde pot fi alese valorile lui x.",
    },
    {
      icon: "B",
      titlu: "Să recunoști codomeniul",
      descriere:
        "Vei identifica mulțimea în care ajung valorile.",
    },
    {
      icon: "f(x)",
      titlu: "Să calculezi imagini",
      descriere:
        "Vei determina imaginea unui element sau a unei mulțimi.",
    },
  ],

  videoLectii: [
    {
      numar: 1,
      titlu: "Domeniul",
      durata: "4 min",
      descriere:
        "Domeniul este mulțimea valorilor pentru care funcția este definită.",
      idei: [
        "În f:A→B, A este domeniul.",
        "Valorile lui x sunt alese din domeniu.",
        "Unele formule impun restricții asupra domeniului.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Pentru f(x)=1/x, x=0 nu este permis deoarece nu putem împărți la zero.",
    },
    {
      numar: 2,
      titlu: "Codomeniul",
      durata: "4 min",
      descriere:
        "Codomeniul este mulțimea în care sunt declarate valorile funcției.",
      idei: [
        "În f:A→B, B este codomeniul.",
        "Codomeniul face parte din definiția funcției.",
        "Nu trebuie confundat automat cu mulțimea valorilor efectiv obținute.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Dacă f:R→R, f(x)=x², codomeniul este R, chiar dacă valorile funcției sunt nenegative.",
    },
    {
      numar: 3,
      titlu: "Imaginea",
      durata: "5 min",
      descriere:
        "Imaginea unui element este valoarea obținută prin aplicarea funcției.",
      idei: [
        "Imaginea lui x este f(x).",
        "Imaginea unei mulțimi se obține aplicând funcția elementelor ei.",
        "Valoarea obținută trebuie să aparțină codomeniului.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Pentru f(x)=x+2, imaginea lui 3 este f(3)=5.",
    },
  ],

  fisaRapida: {
    titlu: "A → B",
    continut: [
      "A = domeniul.",
      "B = codomeniul.",
      "x ∈ A.",
      "f(x) ∈ B.",
      "Imaginea lui x este f(x).",
    ],
  },

  exercitii: [
    {
      intrebare:
        "În notația f:A→B, domeniul este:",
      variante: ["A", "B", "f", "x"],
      corect: 0,
      explicatie:
        "Mulțimea A este domeniul funcției.",
    },
    {
      intrebare:
        "În notația f:A→B, codomeniul este:",
      variante: ["A", "B", "x", "f(x)"],
      corect: 1,
      explicatie:
        "Mulțimea B este codomeniul.",
    },
    {
      intrebare:
        "Pentru f(x)=x+4, imaginea lui 2 este:",
      variante: ["2", "4", "6", "8"],
      corect: 2,
      explicatie:
        "f(2)=2+4=6.",
    },
    {
      intrebare:
        "Pentru f(x)=1/x, care valoare trebuie exclusă?",
      variante: ["1", "-1", "0", "2"],
      corect: 2,
      explicatie:
        "Împărțirea la zero nu este definită.",
    },
    {
      intrebare:
        "Pentru f(x)=x², imaginea lui -2 este:",
      variante: ["-4", "4", "-2", "2"],
      corect: 1,
      explicatie:
        "(-2)²=4.",
    },
  ],

  storageKeyFinalizata:
    "lectie-domeniu-codomeniu-imagine-finalizata",
  storageKeyXp:
    "lectie-domeniu-codomeniu-imagine-xp",

  urmatoareaLectie: {
    titlu: "Graficul unei funcții",
    href: "/lectii/graficul-unei-functii",
  },
};

/* =========================================================
   LECȚIA 4
   ========================================================= */

export const lectiaGraficulUneiFunctii: Lectie = {
  id: "graficul-unei-functii",
  slug: "graficul-unei-functii",

  modul: 2,
  numarLectie: 4,
  totalLectiiModul: 14,

  clasa: "Clasa a IX-a",
  profil: "M_mate-info",

  titlu: "Graficul unei funcții",

  descriere:
    "Înveți ce reprezintă graficul unei funcții și cum verificăm dacă un punct aparține acestuia.",

  obiective: [
    {
      icon: "📈",
      titlu: "Să înțelegi graficul",
      descriere:
        "Vei conecta formula unei funcții cu punctele din plan.",
    },
    {
      icon: "•",
      titlu: "Să verifici puncte",
      descriere:
        "Vei verifica dacă un punct aparține graficului.",
    },
    {
      icon: "🧮",
      titlu: "Să construiești puncte",
      descriere:
        "Vei calcula valori și le vei transforma în coordonate.",
    },
  ],

  videoLectii: [
    {
      numar: 1,
      titlu: "Ce este graficul?",
      durata: "4 min",
      descriere:
        "Graficul este format din punctele ale căror coordonate respectă relația y=f(x).",
      idei: [
        "Un punct de pe grafic are forma (x,f(x)).",
        "Coordonata y este calculată cu formula funcției.",
        "Graficul reprezintă vizual comportamentul funcției.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Pentru f(x)=2x, punctul (3,6) aparține graficului.",
    },
    {
      numar: 2,
      titlu: "Tabel de valori",
      durata: "5 min",
      descriere:
        "Alegem valori pentru x și calculăm valorile corespunzătoare y.",
      idei: [
        "Alegem câteva valori x.",
        "Calculăm f(x).",
        "Obținem puncte (x,f(x)).",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Pentru f(x)=x+1: x=0 dă (0,1), iar x=2 dă (2,3).",
    },
    {
      numar: 3,
      titlu: "Verificarea apartenenței",
      durata: "4 min",
      descriere:
        "Înlocuim coordonata x în formula funcției și comparăm rezultatul cu y.",
      idei: [
        "Calculăm f(x₀).",
        "Comparăm cu y₀.",
        "Dacă y₀=f(x₀), punctul aparține graficului.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "P(2,5) aparține graficului lui f(x)=2x+1 deoarece f(2)=5.",
    },
  ],

  fisaRapida: {
    titlu: "Testul unui punct",
    continut: [
      "P(x₀,y₀) aparține graficului dacă y₀=f(x₀).",
      "Graficul este format din puncte (x,f(x)).",
      "Un tabel de valori ne ajută să construim graficul.",
    ],
  },

  exercitii: [
    {
      intrebare:
        "Pentru f(x)=x+2, care punct aparține graficului?",
      variante: ["(1,1)", "(1,2)", "(1,3)", "(2,1)"],
      corect: 2,
      explicatie:
        "f(1)=3, deci (1,3) aparține graficului.",
    },
    {
      intrebare:
        "Pentru f(x)=2x, punctul (4,8):",
      variante: [
        "Aparține graficului",
        "Nu aparține",
        "Este originea",
        "Nu poate fi verificat",
      ],
      corect: 0,
      explicatie:
        "2·4=8.",
    },
    {
      intrebare:
        "Graficul unei funcții este format din puncte de forma:",
      variante: [
        "(f(x),x)",
        "(x,f(x))",
        "(x,x)",
        "(0,f(x))",
      ],
      corect: 1,
      explicatie:
        "Prima coordonată este x, iar a doua este valoarea funcției.",
    },
    {
      intrebare:
        "Dacă f(3)=7, ce punct aparține graficului?",
      variante: ["(7,3)", "(3,7)", "(3,3)", "(7,7)"],
      corect: 1,
      explicatie:
        "Punctul este (x,f(x))=(3,7).",
    },
    {
      intrebare:
        "Pentru f(x)=x², punctul (-2,4):",
      variante: [
        "Aparține",
        "Nu aparține",
        "Nu are sens",
        "Este pe Oy",
      ],
      corect: 0,
      explicatie:
        "f(-2)=4.",
    },
  ],

  storageKeyFinalizata:
    "lectie-graficul-unei-functii-finalizata",
  storageKeyXp:
    "lectie-graficul-unei-functii-xp",

  urmatoareaLectie: {
    titlu: "Lecturi grafice",
    href: "/lectii/lecturi-grafice",
  },
};

/* =========================================================
   LECȚIA 5
   ========================================================= */

export const lectiaLecturiGrafice: Lectie = {
  id: "lecturi-grafice",
  slug: "lecturi-grafice",

  modul: 2,
  numarLectie: 5,
  totalLectiiModul: 14,

  clasa: "Clasa a IX-a",
  profil: "M_mate-info",

  titlu: "Lecturi grafice",

  descriere:
    "Înveți să extragi informații matematice direct din reprezentarea grafică a unei funcții.",

  obiective: [
    {
      icon: "🔍",
      titlu: "Să citești valori",
      descriere:
        "Vei determina f(x) direct dintr-un grafic.",
    },
    {
      icon: "0",
      titlu: "Să găsești zerouri",
      descriere:
        "Vei identifica intersecțiile graficului cu axa Ox.",
    },
    {
      icon: "📊",
      titlu: "Să interpretezi graficul",
      descriere:
        "Vei extrage informații despre funcție din forma graficului.",
    },
  ],

  videoLectii: [
    {
      numar: 1,
      titlu: "Cum citim f(a)",
      durata: "4 min",
      descriere:
        "Pornim de la valoarea a pe Ox și ajungem la grafic.",
      idei: [
        "Fixăm x=a.",
        "Identificăm punctul corespunzător de pe grafic.",
        "Coordonata verticală este f(a).",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Dacă graficul conține punctul (2,5), atunci f(2)=5.",
    },
    {
      numar: 2,
      titlu: "Zerourile funcției",
      durata: "4 min",
      descriere:
        "Zerourile sunt valorile x pentru care f(x)=0.",
      idei: [
        "Pe grafic, căutăm intersecțiile cu Ox.",
        "În acele puncte y=0.",
        "Abscisele lor sunt soluțiile ecuației f(x)=0.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Dacă graficul intersectează Ox în (3,0), atunci x=3 este un zero al funcției.",
    },
    {
      numar: 3,
      titlu: "Intersecția cu Oy",
      durata: "4 min",
      descriere:
        "Intersecția cu axa Oy apare pentru x=0.",
      idei: [
        "Pe Oy avem x=0.",
        "Punctul de intersecție este (0,f(0)).",
        "Graficul poate oferi rapid această valoare.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Dacă graficul trece prin (0,-2), atunci f(0)=-2.",
    },
  ],

  fisaRapida: {
    titlu: "Citirea graficului",
    continut: [
      "Punctul (a,b) de pe grafic înseamnă f(a)=b.",
      "Intersecțiile cu Ox dau soluțiile ecuației f(x)=0.",
      "Intersecția cu Oy se obține pentru x=0.",
      "Graficul poate arăta creșteri, descreșteri și extreme.",
    ],
  },

  exercitii: [
    {
      intrebare:
        "Dacă punctul (4,7) este pe grafic, atunci:",
      variante: [
        "f(7)=4",
        "f(4)=7",
        "f(4)=4",
        "f(7)=7",
      ],
      corect: 1,
      explicatie:
        "Punctul (x,y) de pe grafic înseamnă y=f(x).",
    },
    {
      intrebare:
        "Un zero al funcției este o valoare x pentru care:",
      variante: [
        "f(x)=1",
        "f(x)=x",
        "f(x)=0",
        "x=0 obligatoriu",
      ],
      corect: 2,
      explicatie:
        "Prin definiție, un zero verifică f(x)=0.",
    },
    {
      intrebare:
        "Zerourile funcției se citesc grafic la intersecția cu:",
      variante: ["Oy", "Ox", "Originea obligatoriu", "Nicio axă"],
      corect: 1,
      explicatie:
        "Pe Ox coordonata y este zero.",
    },
    {
      intrebare:
        "Intersecția cu Oy corespunde valorii:",
      variante: ["x=0", "y=0", "x=1", "y=1"],
      corect: 0,
      explicatie:
        "Toate punctele de pe axa Oy au abscisa zero.",
    },
    {
      intrebare:
        "Dacă graficul trece prin (0,3), atunci:",
      variante: ["f(3)=0", "f(0)=3", "f(3)=3", "f(0)=0"],
      corect: 1,
      explicatie:
        "Coordonata verticală este f(0)=3.",
    },
  ],

  storageKeyFinalizata:
    "lectie-lecturi-grafice-finalizata",
  storageKeyXp:
    "lectie-lecturi-grafice-xp",

  urmatoareaLectie: {
    titlu: "Egalitatea a două funcții",
    href: "/lectii/egalitatea-a-doua-functii",
  },
};

/* =========================================================
   LECȚIA 6
   ========================================================= */

export const lectiaEgalitateaFunctiilor: Lectie = {
  id: "egalitatea-a-doua-functii",
  slug: "egalitatea-a-doua-functii",

  modul: 2,
  numarLectie: 6,
  totalLectiiModul: 14,

  clasa: "Clasa a IX-a",
  profil: "M_mate-info",

  titlu: "Egalitatea a două funcții",

  descriere:
    "Înveți condițiile necesare pentru ca două funcții să fie egale.",

  obiective: [
    {
      icon: "=",
      titlu: "Să verifici egalitatea",
      descriere:
        "Vei verifica domeniul, codomeniul și valorile funcțiilor.",
    },
    {
      icon: "D",
      titlu: "Să compari domeniile",
      descriere:
        "Vei înțelege de ce formula singură nu este suficientă.",
    },
    {
      icon: "f=g",
      titlu: "Să compari valorile",
      descriere:
        "Vei verifica dacă f(x)=g(x) pentru toate valorile din domeniu.",
    },
  ],

  videoLectii: [
    {
      numar: 1,
      titlu: "Când sunt două funcții egale?",
      durata: "5 min",
      descriere:
        "Egalitatea funcțiilor presupune mai mult decât formule asemănătoare.",
      idei: [
        "Funcțiile trebuie să aibă același domeniu.",
        "În definiția completă se ține cont și de codomeniu.",
        "Valorile trebuie să coincidă pentru fiecare x.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "f(x)=x+x și g(x)=2x pe același domeniu au aceleași valori.",
    },
    {
      numar: 2,
      titlu: "Aceeași formulă, domenii diferite",
      durata: "4 min",
      descriere:
        "Două expresii identice pot defini funcții diferite dacă domeniile diferă.",
      idei: [
        "Domeniul face parte din definiția funcției.",
        "Trebuie verificat înainte de compararea formulelor.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "f:R→R, f(x)=x² și g:[0,∞)→R, g(x)=x² nu au același domeniu.",
    },
    {
      numar: 3,
      titlu: "Simplificarea formulelor",
      durata: "4 min",
      descriere:
        "Uneori expresiile arată diferit, dar sunt algebric egale.",
      idei: [
        "Simplificăm ambele formule.",
        "Comparăm rezultatele pe întregul domeniu.",
        "Verificăm și eventualele restricții.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "f(x)=(x+1)² și g(x)=x²+2x+1 au aceeași expresie după dezvoltare.",
    },
  ],

  fisaRapida: {
    titlu: "Checklist pentru egalitate",
    continut: [
      "Compară domeniile.",
      "Ține cont de codomenii.",
      "Verifică f(x)=g(x) pentru fiecare x din domeniu.",
      "Nu te baza doar pe aspectul formulelor.",
    ],
  },

  exercitii: [
    {
      intrebare:
        "f(x)=2x și g(x)=x+x pe același domeniu sunt:",
      variante: ["Egale", "Diferite", "Constante", "Nedefinite"],
      corect: 0,
      explicatie:
        "x+x=2x pentru fiecare x.",
    },
    {
      intrebare:
        "Două funcții cu aceeași formulă, dar domenii diferite sunt:",
      variante: [
        "Obligatoriu egale",
        "Nu sunt aceeași funcție",
        "Întotdeauna constante",
        "Întotdeauna periodice",
      ],
      corect: 1,
      explicatie:
        "Domeniul face parte din definiția funcției.",
    },
    {
      intrebare:
        "Care relație este adevărată pentru orice x real?",
      variante: [
        "(x+1)²=x²+2x+1",
        "(x+1)²=x²+1",
        "2x=x+2",
        "x²=x",
      ],
      corect: 0,
      explicatie:
        "Dezvoltarea corectă este x²+2x+1.",
    },
    {
      intrebare:
        "Pentru funcții egale trebuie ca valorile lor:",
      variante: [
        "Să coincidă pentru toate valorile domeniului",
        "Să coincidă doar pentru x=0",
        "Să fie pozitive",
        "Să fie întregi",
      ],
      corect: 0,
      explicatie:
        "Egalitatea trebuie să fie valabilă pentru fiecare x din domeniu.",
    },
    {
      intrebare:
        "Care element trebuie verificat înainte de compararea formulelor?",
      variante: [
        "Culoarea graficului",
        "Domeniul",
        "Fontul",
        "Unitatea XP",
      ],
      corect: 1,
      explicatie:
        "Domeniul este o componentă esențială a funcției.",
    },
  ],

  storageKeyFinalizata:
    "lectie-egalitatea-a-doua-functii-finalizata",
  storageKeyXp:
    "lectie-egalitatea-a-doua-functii-xp",

  urmatoareaLectie: {
    titlu: "Restricția unei funcții",
    href: "/lectii/restrictia-unei-functii",
  },
};

/* =========================================================
   LECȚIA 7
   ========================================================= */

export const lectiaRestrictiaFunctiei: Lectie = {
  id: "restrictia-unei-functii",
  slug: "restrictia-unei-functii",

  modul: 2,
  numarLectie: 7,
  totalLectiiModul: 14,

  clasa: "Clasa a IX-a",
  profil: "M_mate-info",

  titlu: "Restricția unei funcții",

  descriere:
    "Înveți ce înseamnă să păstrăm aceeași regulă a funcției, dar să lucrăm pe o parte mai mică a domeniului.",

  obiective: [
    {
      icon: "⊂",
      titlu: "Să înțelegi restricția",
      descriere:
        "Vei lucra cu un subdomeniu al funcției inițiale.",
    },
    {
      icon: "f",
      titlu: "Să păstrezi regula",
      descriere:
        "Formula funcției rămâne aceeași pe noul domeniu.",
    },
    {
      icon: "📈",
      titlu: "Să interpretezi grafic",
      descriere:
        "Vei vedea restricția ca pe o parte a graficului inițial.",
    },
  ],

  videoLectii: [
    {
      numar: 1,
      titlu: "Ce este o restricție?",
      durata: "4 min",
      descriere:
        "Limităm domeniul fără să schimbăm valorile funcției pe acel domeniu.",
      idei: [
        "Alegem un subdomeniu.",
        "Formula rămâne aceeași.",
        "Păstrăm doar valorile corespunzătoare noului domeniu.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Dacă f:R→R, f(x)=x², o restricție poate fi aceeași formulă pentru x≥0.",
    },
    {
      numar: 2,
      titlu: "Restricția pe grafic",
      durata: "4 min",
      descriere:
        "Din graficul complet păstrăm numai punctele cu abscise din noul domeniu.",
      idei: [
        "Nu desenăm punctele din afara subdomeniului.",
        "Forma locală a graficului nu se schimbă.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Pentru x² restricționată la [0,∞), păstrăm jumătatea din dreapta a parabolei.",
    },
    {
      numar: 3,
      titlu: "De ce folosim restricții?",
      durata: "4 min",
      descriere:
        "Restricțiile permit studierea funcției pe zone de interes.",
      idei: [
        "Putem analiza separat un interval.",
        "Unele proprietăți devin mai ușor de observat.",
        "Restricția va fi importantă și pentru funcții inversabile.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Funcția x² nu este strict crescătoare pe R, dar este crescătoare pe [0,∞).",
    },
  ],

  fisaRapida: {
    titlu: "Restricția",
    continut: [
      "Alegem un domeniu mai mic.",
      "Formula funcției rămâne aceeași.",
      "Graficul restricției este partea corespunzătoare din graficul inițial.",
    ],
  },

  exercitii: [
    {
      intrebare:
        "Prin restricționarea unei funcții se modifică în primul rând:",
      variante: [
        "Domeniul",
        "Formula obligatoriu",
        "Numele axelor",
        "Originea",
      ],
      corect: 0,
      explicatie:
        "Restricția presupune alegerea unui subdomeniu.",
    },
    {
      intrebare:
        "Pentru f(x)=x² restricționată la x≥0, f(3)=",
      variante: ["-9", "9", "3", "0"],
      corect: 1,
      explicatie:
        "Formula rămâne x², deci f(3)=9.",
    },
    {
      intrebare:
        "Într-o restricție, regula funcției:",
      variante: [
        "Se păstrează",
        "Se schimbă obligatoriu",
        "Dispare",
        "Devine mereu constantă",
      ],
      corect: 0,
      explicatie:
        "Restricția păstrează regula funcției pe un domeniu mai mic.",
    },
    {
      intrebare:
        "Graficul unei restricții este:",
      variante: [
        "O parte din graficul inițial",
        "Întotdeauna o dreaptă",
        "Întotdeauna o parabolă",
        "Graficul invers",
      ],
      corect: 0,
      explicatie:
        "Păstrăm punctele corespunzătoare noului domeniu.",
    },
    {
      intrebare:
        "Dacă domeniul inițial este R, care poate fi un subdomeniu?",
      variante: [
        "[0,∞)",
        "Doar R obligatoriu",
        "Niciunul",
        "Numai mulțimea vidă",
      ],
      corect: 0,
      explicatie:
        "[0,∞) este o submulțime a lui R.",
    },
  ],

  storageKeyFinalizata:
    "lectie-restrictia-unei-functii-finalizata",
  storageKeyXp:
    "lectie-restrictia-unei-functii-xp",

  urmatoareaLectie: {
    titlu: "Monotonie și mărginire",
    href: "/lectii/monotonie-si-marginire",
  },
};

/* =========================================================
   LECȚIA 8
   ========================================================= */

export const lectiaMonotonieMarginire: Lectie = {
  id: "monotonie-si-marginire",
  slug: "monotonie-si-marginire",

  modul: 2,
  numarLectie: 8,
  totalLectiiModul: 14,

  clasa: "Clasa a IX-a",
  profil: "M_mate-info",

  titlu: "Monotonie și mărginire",

  descriere:
    "Înveți să recunoști din formule și grafice când o funcție crește, descrește sau este mărginită.",

  obiective: [
    {
      icon: "↗",
      titlu: "Să recunoști creșterea",
      descriere:
        "Vei identifica funcții crescătoare.",
    },
    {
      icon: "↘",
      titlu: "Să recunoști descreșterea",
      descriere:
        "Vei identifica funcții descrescătoare.",
    },
    {
      icon: "↕",
      titlu: "Să înțelegi mărginirea",
      descriere:
        "Vei recunoaște existența limitelor superioare și inferioare.",
    },
  ],

  videoLectii: [
    {
      numar: 1,
      titlu: "Funcții crescătoare",
      durata: "5 min",
      descriere:
        "Când x crește, valorile funcției evoluează în aceeași direcție.",
      idei: [
        "Comparăm x₁<x₂.",
        "Pentru o funcție crescătoare, f(x₁)≤f(x₂).",
        "Graficul tinde să urce de la stânga la dreapta.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "f(x)=2x este strict crescătoare pe R.",
    },
    {
      numar: 2,
      titlu: "Funcții descrescătoare",
      durata: "5 min",
      descriere:
        "Pe măsură ce x crește, valorile funcției scad.",
      idei: [
        "Pentru x₁<x₂, valorile merg în sens opus.",
        "Graficul coboară de la stânga la dreapta.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "f(x)=-x este strict descrescătoare pe R.",
    },
    {
      numar: 3,
      titlu: "Funcții mărginite",
      durata: "5 min",
      descriere:
        "Valorile unei funcții pot rămâne sub sau peste anumite limite.",
      idei: [
        "Mărginită superior înseamnă f(x)≤M.",
        "Mărginită inferior înseamnă f(x)≥m.",
        "Mărginită înseamnă ambele condiții.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "f(x)=x² este mărginită inferior de 0.",
    },
  ],

  fisaRapida: {
    titlu: "Monotonie și mărginire",
    continut: [
      "Crescătoare: valori mai mari ale lui x nu produc valori mai mici ale funcției.",
      "Descrescătoare: valorile funcției evoluează în sens opus lui x.",
      "Mărginită superior: există M cu f(x)≤M.",
      "Mărginită inferior: există m cu f(x)≥m.",
    ],
  },

  exercitii: [
    {
      intrebare:
        "Funcția f(x)=x este:",
      variante: [
        "Crescătoare",
        "Descrescătoare",
        "Constantă",
        "Nedefinită",
      ],
      corect: 0,
      explicatie:
        "Când x crește, și f(x)=x crește.",
    },
    {
      intrebare:
        "Funcția f(x)=-x este:",
      variante: [
        "Crescătoare",
        "Descrescătoare",
        "Pară",
        "Constantă",
      ],
      corect: 1,
      explicatie:
        "Valorile scad când x crește.",
    },
    {
      intrebare:
        "Funcția f(x)=x² este mărginită inferior de:",
      variante: ["0", "-1", "-∞ ca număr real", "10"],
      corect: 0,
      explicatie:
        "x²≥0 pentru orice x real.",
    },
    {
      intrebare:
        "Mărginită superior înseamnă că există M astfel încât:",
      variante: [
        "f(x)≤M",
        "f(x)≥M",
        "f(x)=M pentru orice x",
        "x≤M",
      ],
      corect: 0,
      explicatie:
        "M este o limită superioară pentru valorile funcției.",
    },
    {
      intrebare:
        "Graficul unei funcții crescătoare, citit de la stânga la dreapta:",
      variante: [
        "Tinde să urce",
        "Tinde să coboare",
        "Dispare",
        "Este mereu orizontal",
      ],
      corect: 0,
      explicatie:
        "Aceasta este interpretarea geometrică intuitivă a creșterii.",
    },
  ],

  storageKeyFinalizata:
    "lectie-monotonie-si-marginire-finalizata",
  storageKeyXp:
    "lectie-monotonie-si-marginire-xp",

  urmatoareaLectie: {
    titlu: "Paritate și imparitate",
    href: "/lectii/paritate-si-imparitate",
  },
};

/* =========================================================
   LECȚIA 9
   ========================================================= */

export const lectiaParitateImparitate: Lectie = {
  id: "paritate-si-imparitate",
  slug: "paritate-si-imparitate",

  modul: 2,
  numarLectie: 9,
  totalLectiiModul: 14,

  clasa: "Clasa a IX-a",
  profil: "M_mate-info",

  titlu: "Paritate și imparitate",

  descriere:
    "Înveți să recunoști funcțiile pare și impare și simetriile graficelor lor.",

  obiective: [
    {
      icon: "±",
      titlu: "Să verifici f(-x)",
      descriere:
        "Vei folosi formula funcției pentru a testa paritatea.",
    },
    {
      icon: "↔",
      titlu: "Să recunoști funcții pare",
      descriere:
        "Vei identifica simetria față de axa Oy.",
    },
    {
      icon: "⤢",
      titlu: "Să recunoști funcții impare",
      descriere:
        "Vei identifica simetria față de origine.",
    },
  ],

  videoLectii: [
    {
      numar: 1,
      titlu: "Funcția pară",
      durata: "4 min",
      descriere:
        "O funcție pară verifică relația f(-x)=f(x).",
      idei: [
        "Domeniul trebuie să permită compararea lui x cu -x.",
        "Graficul este simetric față de Oy.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Pentru f(x)=x², f(-x)=(-x)²=x²=f(x).",
    },
    {
      numar: 2,
      titlu: "Funcția impară",
      durata: "4 min",
      descriere:
        "O funcție impară verifică f(-x)=-f(x).",
      idei: [
        "Graficul are simetrie față de origine.",
        "Schimbarea semnului lui x schimbă semnul valorii.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Pentru f(x)=x³, f(-x)=-x³=-f(x).",
    },
    {
      numar: 3,
      titlu: "Nici pară, nici impară",
      durata: "4 min",
      descriere:
        "Nu orice funcție trebuie să aparțină uneia dintre cele două categorii.",
      idei: [
        "Calculăm f(-x).",
        "Comparăm cu f(x) și -f(x).",
        "Dacă nu coincide cu niciuna, funcția nu este nici pară, nici impară.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "f(x)=x+1 nu este nici pară, nici impară.",
    },
  ],

  fisaRapida: {
    titlu: "Testul parității",
    continut: [
      "Pară: f(-x)=f(x).",
      "Impară: f(-x)=-f(x).",
      "Pară → simetrie față de Oy.",
      "Impară → simetrie față de origine.",
    ],
  },

  exercitii: [
    {
      intrebare:
        "Funcția f(x)=x² este:",
      variante: [
        "Pară",
        "Impară",
        "Niciuna",
        "Periodică obligatoriu",
      ],
      corect: 0,
      explicatie:
        "f(-x)=(-x)²=x²=f(x).",
    },
    {
      intrebare:
        "Funcția f(x)=x³ este:",
      variante: [
        "Pară",
        "Impară",
        "Constantă",
        "Niciuna",
      ],
      corect: 1,
      explicatie:
        "f(-x)=-x³=-f(x).",
    },
    {
      intrebare:
        "Graficul unei funcții pare este simetric față de:",
      variante: ["Ox", "Oy", "Origine", "Dreapta y=x"],
      corect: 1,
      explicatie:
        "Funcțiile pare au simetrie față de axa Oy.",
    },
    {
      intrebare:
        "Pentru o funcție impară avem:",
      variante: [
        "f(-x)=f(x)",
        "f(-x)=-f(x)",
        "f(x)=0 mereu",
        "f(-x)=x",
      ],
      corect: 1,
      explicatie:
        "Aceasta este relația caracteristică funcțiilor impare.",
    },
    {
      intrebare:
        "Funcția f(x)=x+1 este:",
      variante: [
        "Pară",
        "Impară",
        "Nici pară, nici impară",
        "Zero",
      ],
      corect: 2,
      explicatie:
        "f(-x)=-x+1 nu este nici f(x), nici -f(x).",
    },
  ],

  storageKeyFinalizata:
    "lectie-paritate-si-imparitate-finalizata",
  storageKeyXp:
    "lectie-paritate-si-imparitate-xp",

  urmatoareaLectie: {
    titlu: "Periodicitate",
    href: "/lectii/periodicitate",
  },
};

/* =========================================================
   LECȚIA 10
   ========================================================= */

export const lectiaPeriodicitate: Lectie = {
  id: "periodicitate",
  slug: "periodicitate",

  modul: 2,
  numarLectie: 10,
  totalLectiiModul: 14,

  clasa: "Clasa a IX-a",
  profil: "M_mate-info",

  titlu: "Periodicitate",

  descriere:
    "Înveți ce înseamnă ca valorile unei funcții să se repete după un anumit interval.",

  obiective: [
    {
      icon: "🔁",
      titlu: "Să înțelegi perioada",
      descriere:
        "Vei interpreta relația f(x+T)=f(x).",
    },
    {
      icon: "T",
      titlu: "Să verifici o perioadă",
      descriere:
        "Vei testa algebric dacă o valoare este perioadă.",
    },
    {
      icon: "📈",
      titlu: "Să recunoști repetarea grafică",
      descriere:
        "Vei identifica modele care se repetă.",
    },
  ],

  videoLectii: [
    {
      numar: 1,
      titlu: "Ce este o funcție periodică?",
      durata: "4 min",
      descriere:
        "Valorile unei funcții periodice se repetă după o distanță fixă.",
      idei: [
        "Există T>0 cu f(x+T)=f(x).",
        "T se numește perioadă.",
        "Graficul repetă aceeași formă.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Funcțiile trigonometrice oferă exemple clasice de funcții periodice.",
    },
    {
      numar: 2,
      titlu: "Verificarea unei perioade",
      durata: "4 min",
      descriere:
        "Înlocuim x cu x+T și comparăm rezultatul cu f(x).",
      idei: [
        "Calculăm f(x+T).",
        "Simplificăm.",
        "Dacă obținem f(x) pentru toate valorile admise, T este perioadă.",
      ],
      exempluTitlu: "Exemplu conceptual",
      exemplu:
        "Dacă valorile unei funcții se repetă la fiecare 4 unități, atunci 4 este o perioadă.",
    },
    {
      numar: 3,
      titlu: "Citirea periodicității din grafic",
      durata: "4 min",
      descriere:
        "Observăm distanța orizontală după care modelul grafic se repetă.",
      idei: [
        "Căutăm două porțiuni identice consecutive.",
        "Măsurăm distanța pe axa Ox.",
        "Repetarea trebuie să continue pe domeniul funcției.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Dacă același model reapare la x, x+3, x+6, atunci 3 poate fi o perioadă.",
    },
  ],

  fisaRapida: {
    titlu: "Periodicitate",
    continut: [
      "T>0 este perioadă dacă f(x+T)=f(x).",
      "Graficul unei funcții periodice se repetă.",
      "Periodicitatea poate fi verificată algebric sau grafic.",
    ],
  },

  exercitii: [
    {
      intrebare:
        "Relația caracteristică unei perioade T este:",
      variante: [
        "f(x+T)=f(x)",
        "f(x+T)=x",
        "f(T)=0",
        "f(x)=T",
      ],
      corect: 0,
      explicatie:
        "Aceasta exprimă repetarea valorilor după T unități.",
    },
    {
      intrebare:
        "O perioadă T trebuie să fie:",
      variante: [
        "Pozitivă",
        "Obligatoriu zero",
        "Negativă obligatoriu",
        "Irațională",
      ],
      corect: 0,
      explicatie:
        "În definiție se consideră T>0.",
    },
    {
      intrebare:
        "Graficul unei funcții periodice:",
      variante: [
        "Repetă un model",
        "Este mereu o dreaptă",
        "Este mereu o parabolă",
        "Nu poate intersecta Ox",
      ],
      corect: 0,
      explicatie:
        "Caracteristica vizuală este repetarea formei.",
    },
    {
      intrebare:
        "Dacă o funcție repetă aceeași valoare la fiecare 5 unități, 5 poate fi:",
      variante: [
        "O perioadă",
        "Domeniul",
        "Codomeniul",
        "Un zero obligatoriu",
      ],
      corect: 0,
      explicatie:
        "Repetarea după 5 unități indică o posibilă perioadă.",
    },
    {
      intrebare:
        "Pentru a verifica algebric T calculăm:",
      variante: ["f(x+T)", "f(0) numai", "T²", "x/T numai"],
      corect: 0,
      explicatie:
        "Apoi comparăm f(x+T) cu f(x).",
    },
  ],

  storageKeyFinalizata:
    "lectie-periodicitate-finalizata",
  storageKeyXp:
    "lectie-periodicitate-xp",

  urmatoareaLectie: {
    titlu: "Compunerea funcțiilor",
    href: "/lectii/compunerea-functiilor",
  },
};

/* =========================================================
   LECȚIA 11
   ========================================================= */

export const lectiaCompunereaFunctiilor: Lectie = {
  id: "compunerea-functiilor",
  slug: "compunerea-functiilor",

  modul: 2,
  numarLectie: 11,
  totalLectiiModul: 14,

  clasa: "Clasa a IX-a",
  profil: "M_mate-info",

  titlu: "Compunerea funcțiilor",

  descriere:
    "Înveți să aplici două funcții succesiv și să calculezi expresii de forma (f∘g)(x).",

  obiective: [
    {
      icon: "∘",
      titlu: "Să înțelegi compunerea",
      descriere:
        "Vei aplica mai întâi o funcție și apoi cealaltă.",
    },
    {
      icon: "f(g(x))",
      titlu: "Să calculezi formule",
      descriere:
        "Vei determina formule pentru funcții compuse.",
    },
    {
      icon: "↔",
      titlu: "Să respecți ordinea",
      descriere:
        "Vei vedea că f∘g și g∘f nu sunt în general egale.",
    },
  ],

  videoLectii: [
    {
      numar: 1,
      titlu: "Ce este compunerea?",
      durata: "5 min",
      descriere:
        "Rezultatul primei funcții devine intrarea celei de-a doua.",
      idei: [
        "(f∘g)(x)=f(g(x)).",
        "Mai întâi calculăm g(x).",
        "Apoi aplicăm f rezultatului.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Dacă f(x)=x+1 și g(x)=2x, atunci (f∘g)(x)=2x+1.",
    },
    {
      numar: 2,
      titlu: "Ordinea contează",
      durata: "5 min",
      descriere:
        "Schimbarea ordinii funcțiilor poate produce alt rezultat.",
      idei: [
        "f∘g înseamnă f după g.",
        "g∘f înseamnă g după f.",
        "În general, cele două rezultate sunt diferite.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Cu f(x)=x+1 și g(x)=2x, (g∘f)(x)=2x+2.",
    },
    {
      numar: 3,
      titlu: "Domeniul compunerii",
      durata: "5 min",
      descriere:
        "Trebuie ca valoarea produsă de prima funcție să poată fi introdusă în următoarea.",
      idei: [
        "x trebuie să fie admis de g.",
        "g(x) trebuie să fie admis de f.",
        "Restricțiile de domeniu trebuie verificate.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Dacă f(t)=1/t, atunci pentru f(g(x)) trebuie să avem g(x)≠0.",
    },
  ],

  fisaRapida: {
    titlu: "Compunerea",
    continut: [
      "(f∘g)(x)=f(g(x)).",
      "Începem cu funcția din interior.",
      "Ordinea funcțiilor contează.",
      "Trebuie verificat domeniul.",
    ],
  },

  exercitii: [
    {
      intrebare:
        "Dacă f(x)=x+1 și g(x)=2x, atunci (f∘g)(x)=",
      variante: ["2x+1", "2x+2", "x+3", "2x"],
      corect: 0,
      explicatie:
        "f(g(x))=f(2x)=2x+1.",
    },
    {
      intrebare:
        "Cu aceleași funcții, (g∘f)(x)=",
      variante: ["2x+1", "2x+2", "x+1", "2x"],
      corect: 1,
      explicatie:
        "g(f(x))=g(x+1)=2(x+1)=2x+2.",
    },
    {
      intrebare:
        "În (f∘g)(x), care funcție se aplică prima?",
      variante: ["g", "f", "Ambele simultan", "Niciuna"],
      corect: 0,
      explicatie:
        "Întâi calculăm g(x), apoi aplicăm f.",
    },
    {
      intrebare:
        "În general, f∘g și g∘f sunt:",
      variante: [
        "Mereu egale",
        "Nu neapărat egale",
        "Mereu zero",
        "Mereu constante",
      ],
      corect: 1,
      explicatie:
        "Compunerea nu este în general comutativă.",
    },
    {
      intrebare:
        "Dacă f(x)=x² și g(x)=x+1, atunci (f∘g)(x)=",
      variante: ["x²+1", "(x+1)²", "x²+x", "2x+1"],
      corect: 1,
      explicatie:
        "f(g(x))=(x+1)².",
    },
  ],

  storageKeyFinalizata:
    "lectie-compunerea-functiilor-finalizata",
  storageKeyXp:
    "lectie-compunerea-functiilor-xp",

  urmatoareaLectie: {
    titlu: "Șiruri de numere reale",
    href: "/lectii/siruri-de-numere-reale",
  },
};

/* =========================================================
   LECȚIA 12
   ========================================================= */

export const lectiaSiruriNumereReale: Lectie = {
  id: "siruri-de-numere-reale",
  slug: "siruri-de-numere-reale",

  modul: 2,
  numarLectie: 12,
  totalLectiiModul: 14,

  clasa: "Clasa a IX-a",
  profil: "M_mate-info",

  titlu: "Șiruri de numere reale",

  descriere:
    "Înveți ce este un șir, cum poate fi definit și cum studiem termenii, monotonia și mărginirea sa.",

  obiective: [
    {
      icon: "aₙ",
      titlu: "Să înțelegi un șir",
      descriere:
        "Vei interpreta un șir ca pe o funcție definită pe numere naturale.",
    },
    {
      icon: "🔢",
      titlu: "Să calculezi termeni",
      descriere:
        "Vei folosi formula termenului general.",
    },
    {
      icon: "↗",
      titlu: "Să observi proprietăți",
      descriere:
        "Vei recunoaște șiruri monotone și mărginite.",
    },
  ],

  videoLectii: [
    {
      numar: 1,
      titlu: "Ce este un șir?",
      durata: "4 min",
      descriere:
        "Un șir este o succesiune ordonată de numere.",
      idei: [
        "Termenii se notează a₁,a₂,a₃,...",
        "aₙ reprezintă termenul de rang n.",
        "Ordinea termenilor contează.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Pentru aₙ=2n, termenii sunt 2,4,6,8,...",
    },
    {
      numar: 2,
      titlu: "Modalități de definire",
      durata: "5 min",
      descriere:
        "Un șir poate fi dat prin formula termenului general sau printr-o regulă de recurență.",
      idei: [
        "Formula explicită ne permite calcularea directă a lui aₙ.",
        "O recurență folosește termeni anteriori.",
        "Trebuie cunoscut termenul inițial când folosim recurențe.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "a₁=1 și aₙ₊₁=aₙ+2 produce șirul 1,3,5,7,...",
    },
    {
      numar: 3,
      titlu: "Monotonie și mărginire",
      durata: "5 min",
      descriere:
        "Aceleași idei întâlnite la funcții apar și la șiruri.",
      idei: [
        "Un șir poate fi crescător sau descrescător.",
        "Poate fi mărginit superior sau inferior.",
        "Comparăm termeni consecutivi sau folosim formula.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Șirul aₙ=n este crescător și mărginit inferior.",
    },
  ],

  fisaRapida: {
    titlu: "Șiruri",
    continut: [
      "aₙ = termenul de rang n.",
      "Un șir poate fi definit explicit sau recurent.",
      "Ordinea termenilor contează.",
      "Șirurile pot fi monotone și/sau mărginite.",
    ],
  },

  exercitii: [
    {
      intrebare:
        "Pentru aₙ=3n, cât este a₄?",
      variante: ["7", "12", "9", "4"],
      corect: 1,
      explicatie:
        "a₄=3·4=12.",
    },
    {
      intrebare:
        "Simbolul aₙ reprezintă:",
      variante: [
        "Termenul de rang n",
        "Suma tuturor termenilor",
        "O funcție constantă obligatoriu",
        "Un număr negativ",
      ],
      corect: 0,
      explicatie:
        "aₙ este termenul corespunzător indicelui n.",
    },
    {
      intrebare:
        "Șirul 2,4,6,8,... poate avea formula:",
      variante: [
        "aₙ=2n",
        "aₙ=n+1",
        "aₙ=n²",
        "aₙ=2",
      ],
      corect: 0,
      explicatie:
        "Pentru n=1,2,3,... obținem 2,4,6,...",
    },
    {
      intrebare:
        "Într-o definiție recurentă folosim de obicei:",
      variante: [
        "Termeni anteriori",
        "Doar graficul",
        "Numai codomeniul",
        "Niciun termen inițial",
      ],
      corect: 0,
      explicatie:
        "Recurența exprimă un termen prin unul sau mai mulți termeni anteriori.",
    },
    {
      intrebare:
        "Șirul aₙ=n este:",
      variante: [
        "Crescător",
        "Descrescător",
        "Constant",
        "Periodic",
      ],
      corect: 0,
      explicatie:
        "Valorile 1,2,3,... cresc.",
    },
  ],

  storageKeyFinalizata:
    "lectie-siruri-de-numere-reale-finalizata",
  storageKeyXp:
    "lectie-siruri-de-numere-reale-xp",

  urmatoareaLectie: {
    titlu: "Progresii aritmetice",
    href: "/lectii/progresii-aritmetice",
  },
};

/* =========================================================
   LECȚIA 13
   ========================================================= */

export const lectiaProgresiiAritmetice: Lectie = {
  id: "progresii-aritmetice",
  slug: "progresii-aritmetice",

  modul: 2,
  numarLectie: 13,
  totalLectiiModul: 14,

  clasa: "Clasa a IX-a",
  profil: "M_mate-info",

  titlu: "Progresii aritmetice",

  descriere:
    "Înveți să recunoști o progresie aritmetică și să calculezi termenul general și suma primilor termeni.",

  obiective: [
    {
      icon: "+r",
      titlu: "Să identifici rația",
      descriere:
        "Vei determina diferența constantă dintre termeni consecutivi.",
    },
    {
      icon: "aₙ",
      titlu: "Să calculezi termenul general",
      descriere:
        "Vei folosi formula progresiei aritmetice.",
    },
    {
      icon: "Σ",
      titlu: "Să calculezi sume",
      descriere:
        "Vei determina suma primilor n termeni.",
    },
  ],

  videoLectii: [
    {
      numar: 1,
      titlu: "Ce este o progresie aritmetică?",
      durata: "5 min",
      descriere:
        "Diferența dintre doi termeni consecutivi este constantă.",
      idei: [
        "aₙ₊₁=aₙ+r.",
        "r se numește rația progresiei aritmetice.",
        "r poate fi pozitivă, negativă sau zero.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "2,5,8,11,... este progresie aritmetică de rație r=3.",
    },
    {
      numar: 2,
      titlu: "Termenul general",
      durata: "5 min",
      descriere:
        "Putem calcula direct orice termen fără să scriem toți termenii anteriori.",
      idei: [
        "aₙ=a₁+(n-1)r.",
        "Putem porni și de la un alt termen cunoscut.",
        "Formula permite găsirea rapidă a unui rang sau termen.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Pentru a₁=2 și r=3, a₅=2+4·3=14.",
    },
    {
      numar: 3,
      titlu: "Suma primilor n termeni",
      durata: "5 min",
      descriere:
        "Calculăm eficient suma unei progresii aritmetice.",
      idei: [
        "Sₙ=n(a₁+aₙ)/2.",
        "Putem înlocui aₙ prin formula termenului general.",
        "Formula evită adunarea manuală a tuturor termenilor.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Pentru 1+2+3+4+5, S₅=5(1+5)/2=15.",
    },
  ],

  fisaRapida: {
    titlu: "Progresia aritmetică",
    continut: [
      "aₙ₊₁=aₙ+r.",
      "aₙ=a₁+(n-1)r.",
      "Sₙ=n(a₁+aₙ)/2.",
      "Trei termeni consecutivi a,b,c sunt în progresie aritmetică dacă 2b=a+c.",
    ],
  },

  exercitii: [
    {
      intrebare:
        "Șirul 3,7,11,15,... are rația:",
      variante: ["3", "4", "7", "11"],
      corect: 1,
      explicatie:
        "Diferența dintre termeni consecutivi este 4.",
    },
    {
      intrebare:
        "Dacă a₁=5 și r=2, atunci a₄=",
      variante: ["9", "11", "13", "7"],
      corect: 1,
      explicatie:
        "a₄=5+(4-1)·2=11.",
    },
    {
      intrebare:
        "Formula termenului general este:",
      variante: [
        "aₙ=a₁+(n-1)r",
        "aₙ=a₁·rⁿ",
        "aₙ=n+r",
        "aₙ=a₁+r",
      ],
      corect: 0,
      explicatie:
        "Aceasta este formula standard pentru progresia aritmetică.",
    },
    {
      intrebare:
        "Dacă 2, x, 8 sunt în progresie aritmetică, x=",
      variante: ["4", "5", "6", "3"],
      corect: 1,
      explicatie:
        "2x=2+8=10, deci x=5.",
    },
    {
      intrebare:
        "Suma 1+2+3+4+5 este:",
      variante: ["10", "15", "20", "25"],
      corect: 1,
      explicatie:
        "S₅=5(1+5)/2=15.",
    },
  ],

  storageKeyFinalizata:
    "lectie-progresii-aritmetice-finalizata",
  storageKeyXp:
    "lectie-progresii-aritmetice-xp",

  urmatoareaLectie: {
    titlu: "Progresii geometrice",
    href: "/lectii/progresii-geometrice",
  },
};

/* =========================================================
   LECȚIA 14
   ========================================================= */

export const lectiaProgresiiGeometrice: Lectie = {
  id: "progresii-geometrice",
  slug: "progresii-geometrice",

  modul: 2,
  numarLectie: 14,
  totalLectiiModul: 14,

  clasa: "Clasa a IX-a",
  profil: "M_mate-info",

  titlu: "Progresii geometrice",

  descriere:
    "Înveți să recunoști o progresie geometrică și să calculezi termenul general și suma primilor termeni.",

  obiective: [
    {
      icon: "×q",
      titlu: "Să identifici rația",
      descriere:
        "Vei determina raportul constant dintre termeni consecutivi.",
    },
    {
      icon: "aₙ",
      titlu: "Să calculezi termenul general",
      descriere:
        "Vei folosi formula progresiei geometrice.",
    },
    {
      icon: "Σ",
      titlu: "Să calculezi suma",
      descriere:
        "Vei folosi formula sumei primilor n termeni.",
    },
  ],

  videoLectii: [
    {
      numar: 1,
      titlu: "Ce este o progresie geometrică?",
      durata: "5 min",
      descriere:
        "Fiecare termen se obține înmulțind termenul anterior cu aceeași valoare.",
      idei: [
        "aₙ₊₁=aₙ·q.",
        "q se numește rația progresiei geometrice.",
        "Raportul termenilor consecutivi este constant când este definit.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "2,6,18,54,... este progresie geometrică de rație q=3.",
    },
    {
      numar: 2,
      titlu: "Termenul general",
      durata: "5 min",
      descriere:
        "Calculăm direct termenul de rang n.",
      idei: [
        "aₙ=a₁·q^(n-1).",
        "Putem porni și de la un termen cunoscut.",
        "Puterile lui q determină evoluția termenilor.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Dacă a₁=2 și q=3, atunci a₄=2·3³=54.",
    },
    {
      numar: 3,
      titlu: "Suma primilor n termeni",
      durata: "6 min",
      descriere:
        "Folosim formula sumei când q este diferit de 1.",
      idei: [
        "Pentru q≠1: Sₙ=a₁(qⁿ-1)/(q-1).",
        "O formă echivalentă este a₁(1-qⁿ)/(1-q).",
        "Pentru q=1, toți termenii sunt egali și Sₙ=n·a₁.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "1+2+4+8=15, corespunzător unei progresii cu a₁=1 și q=2.",
    },
  ],

  fisaRapida: {
    titlu: "Progresia geometrică",
    continut: [
      "aₙ₊₁=aₙ·q.",
      "aₙ=a₁·q^(n-1).",
      "Pentru q≠1: Sₙ=a₁(qⁿ-1)/(q-1).",
      "Pentru trei termeni consecutivi a,b,c ai unei progresii geometrice: b²=ac.",
    ],
  },

  exercitii: [
    {
      intrebare:
        "Șirul 2,6,18,54,... are rația:",
      variante: ["2", "3", "6", "9"],
      corect: 1,
      explicatie:
        "Fiecare termen se obține înmulțind termenul anterior cu 3.",
    },
    {
      intrebare:
        "Dacă a₁=2 și q=2, atunci a₄=",
      variante: ["8", "12", "16", "32"],
      corect: 2,
      explicatie:
        "a₄=2·2³=16.",
    },
    {
      intrebare:
        "Formula termenului general este:",
      variante: [
        "aₙ=a₁q^(n-1)",
        "aₙ=a₁+(n-1)q",
        "aₙ=nq",
        "aₙ=q+n",
      ],
      corect: 0,
      explicatie:
        "Aceasta este formula standard a progresiei geometrice.",
    },
    {
      intrebare:
        "Dacă 2, x, 8 sunt termeni consecutivi ai unei progresii geometrice și x>0, atunci x=",
      variante: ["2", "4", "6", "8"],
      corect: 1,
      explicatie:
        "x²=2·8=16, iar x>0, deci x=4.",
    },
    {
      intrebare:
        "Suma 1+2+4+8 este:",
      variante: ["12", "14", "15", "16"],
      corect: 2,
      explicatie:
        "1+2+4+8=15.",
    },
  ],

  storageKeyFinalizata:
    "lectie-progresii-geometrice-finalizata",
  storageKeyXp:
    "lectie-progresii-geometrice-xp",

  urmatoareaLectie: {
    titlu: "Funcția f(x) = ax + b",
  },
};

/* =========================================================
   TOATE LECȚIILE MODULULUI 2
   ========================================================= */

export const lectiiModul2: Lectie[] = [
  lectiaReperCartezian,
  lectiaNotiuneaDeFunctie,
  lectiaDomeniuCodomeniuImagine,
  lectiaGraficulUneiFunctii,
  lectiaLecturiGrafice,
  lectiaEgalitateaFunctiilor,
  lectiaRestrictiaFunctiei,
  lectiaMonotonieMarginire,
  lectiaParitateImparitate,
  lectiaPeriodicitate,
  lectiaCompunereaFunctiilor,
  lectiaSiruriNumereReale,
  lectiaProgresiiAritmetice,
  lectiaProgresiiGeometrice,
];