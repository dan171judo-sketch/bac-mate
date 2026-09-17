export type VideoLectie = {
  numar: number;
  titlu: string;
  durata: string;
  descriere: string;
  idei: string[];
  exempluTitlu: string;
  exemplu: string;
};

export type ExercitiuLectie = {
  intrebare: string;
  variante: string[];
  corect: number;
  explicatie: string;
};

export type Lectie = {
  id: string;
  slug: string;

  modul: number;
  numarLectie: number;
  totalLectiiModul: number;

  clasa: string;
  profil: string;

  titlu: string;
  descriere: string;

  obiective: {
    icon: string;
    titlu: string;
    descriere: string;
  }[];

  videoLectii: VideoLectie[];

  fisaRapida: {
    titlu: string;
    continut: string[];
  };

  exercitii: ExercitiuLectie[];

  storageKeyFinalizata: string;
  storageKeyXp: string;

  urmatoareaLectie?: {
    titlu: string;
    href?: string;
  };
};

/* =========================================================
   LECȚIA 6
   ========================================================= */

export const lectiaCuantificatori: Lectie = {
  id: "cuantificatori",
  slug: "cuantificatori",

  modul: 1,
  numarLectie: 6,
  totalLectiiModul: 10,

  clasa: "Clasa a IX-a",
  profil: "M_mate-info",

  titlu: "Cuantificatori",

  descriere:
    "În această lecție vei învăța ce înseamnă cuantificatorul universal și cuantificatorul existențial și cum îi folosim în propoziții matematice.",

  obiective: [
    {
      icon: "∀",
      titlu: "Să înțelegi „pentru orice”",
      descriere:
        "Vei recunoaște și interpreta cuantificatorul universal.",
    },
    {
      icon: "∃",
      titlu: "Să înțelegi „există”",
      descriere:
        "Vei recunoaște și interpreta cuantificatorul existențial.",
    },
    {
      icon: "🧠",
      titlu: "Să citești corect un enunț",
      descriere:
        "Vei transforma scrierea simbolică într-un enunț matematic exprimat în cuvinte.",
    },
  ],

  videoLectii: [
    {
      numar: 1,
      titlu: "Ce este un cuantificator?",
      durata: "3–4 min",
      descriere:
        "Pornim de la predicate și vedem cum le putem transforma în propoziții.",
      idei: [
        "Un predicat conține una sau mai multe variabile.",
        "Cuantificatorii precizează pentru câte valori trebuie să fie adevărat predicatul.",
        "Cei doi cuantificatori de bază sunt universal și existențial.",
        "Domeniul variabilei trebuie precizat.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Dacă P(x) este x² ≥ 0 și x este număr real, putem afirma că pentru orice x real, x² ≥ 0.",
    },
    {
      numar: 2,
      titlu: "Cuantificatorul universal ∀",
      durata: "4 min",
      descriere:
        "Înveți cum citim și verificăm o afirmație de forma «pentru orice».",
      idei: [
        "∀ se citește «pentru orice» sau «oricare ar fi».",
        "Proprietatea trebuie să fie adevărată pentru fiecare element.",
        "Un singur contraexemplu face falsă o afirmație universală.",
        "Mulțimea din care este ales x contează.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "∀x ∈ R, x² ≥ 0 se citește: pentru orice număr real x, x² este mai mare sau egal cu 0.",
    },
    {
      numar: 3,
      titlu: "Cuantificatorul existențial ∃",
      durata: "4 min",
      descriere:
        "Înveți ce înseamnă că există cel puțin un element cu o anumită proprietate.",
      idei: [
        "∃ se citește «există».",
        "Este suficientă cel puțin o valoare care verifică proprietatea.",
        "Nu este necesar ca proprietatea să fie adevărată pentru toate valorile.",
        "Un exemplu potrivit poate demonstra o afirmație existențială.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "∃x ∈ Z astfel încât x² = 4 este adevărat, deoarece x = 2 verifică relația.",
    },
    {
      numar: 4,
      titlu: "∀ sau ∃?",
      durata: "4 min",
      descriere:
        "Comparăm cele două tipuri de afirmații și înveți să le deosebești rapid.",
      idei: [
        "∀ înseamnă toate valorile.",
        "∃ înseamnă cel puțin o valoare.",
        "Pentru ∀ putem căuta un contraexemplu.",
        "Pentru ∃ putem căuta un exemplu.",
      ],
      exempluTitlu: "Comparație",
      exemplu:
        "∀x ∈ R, x² ≥ 0 este adevărat. ∃x ∈ R, x² = 9 este de asemenea adevărat.",
    },
  ],

  fisaRapida: {
    titlu: "Cele două simboluri esențiale",
    continut: [
      "∀ = pentru orice.",
      "∃ = există cel puțin un element.",
      "Un contraexemplu poate arăta că o afirmație universală este falsă.",
      "Un exemplu poate arăta că o afirmație existențială este adevărată.",
      "Verifică întotdeauna domeniul variabilei.",
    ],
  },

  exercitii: [
    {
      intrebare: "Cum se citește simbolul ∀?",
      variante: ["Există", "Pentru orice", "Nu există", "Este egal cu"],
      corect: 1,
      explicatie:
        "∀ reprezintă cuantificatorul universal și se citește «pentru orice».",
    },
    {
      intrebare: "Cum se citește simbolul ∃?",
      variante: ["Pentru orice", "Există", "Este inclus în", "Este diferit de"],
      corect: 1,
      explicatie:
        "∃ reprezintă cuantificatorul existențial și se citește «există».",
    },
    {
      intrebare: "Care afirmație este adevărată?",
      variante: [
        "∀x ∈ R, x > 0",
        "∀x ∈ R, x² ≥ 0",
        "∀x ∈ R, x² < 0",
        "∀x ∈ R, x = 1",
      ],
      corect: 1,
      explicatie:
        "Pătratul oricărui număr real este mai mare sau egal cu 0.",
    },
    {
      intrebare:
        "Cum scriem «există un număr întreg al cărui pătrat este 9»?",
      variante: [
        "∀x ∈ Z, x² = 9",
        "∃x ∈ Z, x² = 9",
        "∀x ∈ Z, x² ≠ 9",
        "x ∉ Z",
      ],
      corect: 1,
      explicatie:
        "Folosim ∃ deoarece este suficient să existe cel puțin o valoare potrivită.",
    },
    {
      intrebare:
        "Pentru a arăta că «∀x ∈ R, x > 0» este falsă, este suficient:",
      variante: [
        "Să verificăm toate numerele",
        "Să găsim un contraexemplu",
        "Să găsim un număr pozitiv",
        "Să calculăm un radical",
      ],
      corect: 1,
      explicatie:
        "De exemplu x = 0 este un contraexemplu, deoarece 0 > 0 este fals.",
    },
    {
      intrebare: "Care afirmație despre ∃ este corectă?",
      variante: [
        "Proprietatea trebuie să fie adevărată pentru toate valorile.",
        "Este suficientă cel puțin o valoare potrivită.",
        "Se notează cu ∀.",
        "Se folosește doar pentru numere naturale.",
      ],
      corect: 1,
      explicatie:
        "Cuantificatorul existențial cere existența a cel puțin unui element potrivit.",
    },
  ],

  storageKeyFinalizata: "lectie-cuantificatori-finalizata",
  storageKeyXp: "lectie-cuantificatori-xp",

  urmatoareaLectie: {
    titlu: "Negație, conjuncție, disjuncție și implicație",
    href: "/lectii/negatie-conjunctie-disjunctie-implicatie",
  },
};

/* =========================================================
   LECȚIA 7
   ========================================================= */

export const lectiaOperatiiLogice: Lectie = {
  id: "operatii-logice",
  slug: "negatie-conjunctie-disjunctie-implicatie",

  modul: 1,
  numarLectie: 7,
  totalLectiiModul: 10,

  clasa: "Clasa a IX-a",
  profil: "M_mate-info",

  titlu: "Negație, conjuncție, disjuncție și implicație",

  descriere:
    "Înveți operațiile logice elementare și cum se modifică valoarea de adevăr atunci când combinăm propoziții.",

  obiective: [
    {
      icon: "¬",
      titlu: "Să negi o propoziție",
      descriere:
        "Vei înțelege ce înseamnă «nu P».",
    },
    {
      icon: "∧ ∨",
      titlu: "Să combini propoziții",
      descriere:
        "Vei lucra cu «și» și «sau».",
    },
    {
      icon: "⇒",
      titlu: "Să înțelegi implicația",
      descriere:
        "Vei interpreta corect expresia «dacă P, atunci Q».",
    },
  ],

  videoLectii: [
    {
      numar: 1,
      titlu: "Negația unei propoziții",
      durata: "4 min",
      descriere:
        "Vedem ce se întâmplă cu valoarea de adevăr atunci când negăm un enunț.",
      idei: [
        "Negația lui P se notează ¬P.",
        "Dacă P este adevărată, ¬P este falsă.",
        "Dacă P este falsă, ¬P este adevărată.",
        "Negația trebuie să exprime exact contrariul logic.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Dacă P este «5 > 2», atunci ¬P este «5 ≤ 2».",
    },
    {
      numar: 2,
      titlu: "Conjuncția și disjuncția",
      durata: "5 min",
      descriere:
        "Înțelegi diferența dintre «P și Q» și «P sau Q».",
      idei: [
        "P ∧ Q înseamnă P și Q.",
        "Conjuncția este adevărată numai dacă ambele propoziții sunt adevărate.",
        "P ∨ Q înseamnă P sau Q.",
        "Disjuncția este adevărată dacă cel puțin una dintre propoziții este adevărată.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Dacă P este adevărată și Q este falsă, atunci P ∧ Q este falsă, iar P ∨ Q este adevărată.",
    },
    {
      numar: 3,
      titlu: "Implicația",
      durata: "5 min",
      descriere:
        "Înveți cum funcționează propoziția «dacă P, atunci Q».",
      idei: [
        "Implicația se notează P ⇒ Q.",
        "P se numește ipoteză, iar Q concluzie.",
        "Implicația este falsă atunci când P este adevărată și Q este falsă.",
        "În celelalte cazuri, implicația este adevărată.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Dacă x = 2, atunci x² = 4. Pentru x = 2, atât ipoteza cât și concluzia sunt adevărate.",
    },
    {
      numar: 4,
      titlu: "Echivalența",
      durata: "4 min",
      descriere:
        "Facem legătura și cu echivalența, operație logică prevăzută în aceeași zonă de programă.",
      idei: [
        "P ⇔ Q se citește «P dacă și numai dacă Q».",
        "Echivalența este adevărată când P și Q au aceeași valoare de adevăr.",
        "Poate fi privită ca două implicații: P ⇒ Q și Q ⇒ P.",
        "Este folosită frecvent la transformări echivalente.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Pentru x real, x = 0 ⇔ x² = 0.",
    },
  ],

  fisaRapida: {
    titlu: "Cele patru operații pe scurt",
    continut: [
      "¬P = negația lui P.",
      "P ∧ Q = P și Q.",
      "P ∨ Q = P sau Q.",
      "P ⇒ Q = dacă P, atunci Q.",
      "P ⇔ Q = P dacă și numai dacă Q.",
    ],
  },

  exercitii: [
    {
      intrebare: "Dacă P este adevărată, atunci ¬P este:",
      variante: ["Adevărată", "Falsă", "Uneori adevărată", "Nedefinită"],
      corect: 1,
      explicatie:
        "Negația schimbă valoarea de adevăr a propoziției.",
    },
    {
      intrebare:
        "Când este adevărată conjuncția P ∧ Q?",
      variante: [
        "Numai când ambele sunt adevărate",
        "Când cel puțin una este adevărată",
        "Numai când ambele sunt false",
        "Întotdeauna",
      ],
      corect: 0,
      explicatie:
        "Conjuncția «și» cere ca ambele propoziții să fie adevărate.",
    },
    {
      intrebare:
        "Dacă P este adevărată și Q este falsă, P ∨ Q este:",
      variante: ["Falsă", "Adevărată", "Nedefinită", "Echivalentă cu Q"],
      corect: 1,
      explicatie:
        "Disjuncția este adevărată dacă cel puțin una dintre propoziții este adevărată.",
    },
    {
      intrebare:
        "Implicația P ⇒ Q este falsă atunci când:",
      variante: [
        "P este adevărată și Q este falsă",
        "P și Q sunt adevărate",
        "P este falsă și Q adevărată",
        "P și Q sunt false",
      ],
      corect: 0,
      explicatie:
        "Acesta este singurul caz în care o implicație este falsă.",
    },
    {
      intrebare:
        "Care este negația propoziției «x > 3»?",
      variante: ["x > 3", "x < 3", "x ≤ 3", "x = 3"],
      corect: 2,
      explicatie:
        "Negația lui x > 3 este x ≤ 3.",
    },
    {
      intrebare:
        "Simbolul ⇔ se citește:",
      variante: [
        "Și",
        "Sau",
        "Dacă și numai dacă",
        "Nu",
      ],
      corect: 2,
      explicatie:
        "⇔ reprezintă echivalența logică.",
    },
  ],

  storageKeyFinalizata:
    "lectie-operatii-logice-finalizata",
  storageKeyXp:
    "lectie-operatii-logice-xp",

  urmatoareaLectie: {
    titlu: "Operații cu mulțimi",
    href: "/lectii/operatii-cu-multimi",
  },
};

/* =========================================================
   LECȚIA 8
   ========================================================= */

export const lectiaOperatiiMultimi: Lectie = {
  id: "operatii-cu-multimi",
  slug: "operatii-cu-multimi",

  modul: 1,
  numarLectie: 8,
  totalLectiiModul: 10,

  clasa: "Clasa a IX-a",
  profil: "M_mate-info",

  titlu: "Operații cu mulțimi",

  descriere:
    "Înveți reuniunea, intersecția, diferența, complementara și relațiile de incluziune și egalitate dintre mulțimi.",

  obiective: [
    {
      icon: "∪",
      titlu: "Să calculezi reuniunea",
      descriere:
        "Vei reuni elementele care apar în cel puțin una dintre două mulțimi.",
    },
    {
      icon: "∩",
      titlu: "Să calculezi intersecția",
      descriere:
        "Vei identifica elementele comune.",
    },
    {
      icon: "⊂",
      titlu: "Să înțelegi incluziunea",
      descriere:
        "Vei recunoaște când o mulțime este inclusă în alta.",
    },
  ],

  videoLectii: [
    {
      numar: 1,
      titlu: "Reuniunea și intersecția",
      durata: "5 min",
      descriere:
        "Cele două operații de bază cu mulțimi.",
      idei: [
        "A ∪ B conține elementele care sunt în A sau în B.",
        "A ∩ B conține elementele comune celor două mulțimi.",
        "Un element se scrie o singură dată într-o mulțime.",
        "Dacă nu există elemente comune, intersecția este mulțimea vidă.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Dacă A = {1, 2, 3} și B = {3, 4}, atunci A ∪ B = {1, 2, 3, 4}, iar A ∩ B = {3}.",
    },
    {
      numar: 2,
      titlu: "Diferența și complementara",
      durata: "5 min",
      descriere:
        "Vedem cum păstrăm elementele unei mulțimi care nu apar în alta.",
      idei: [
        "A \\ B conține elementele din A care nu aparțin lui B.",
        "Diferența nu este în general comutativă.",
        "Complementara unei mulțimi depinde de mulțimea universală.",
        "Trebuie să știm universul de referință.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Dacă A = {1, 2, 3} și B = {3, 4}, atunci A \\ B = {1, 2}.",
    },
    {
      numar: 3,
      titlu: "Incluziunea și egalitatea",
      durata: "4 min",
      descriere:
        "Înveți ce înseamnă că toate elementele unei mulțimi aparțin alteia.",
      idei: [
        "A ⊆ B înseamnă că orice element al lui A aparține și lui B.",
        "Două mulțimi sunt egale dacă au exact aceleași elemente.",
        "Ordinea elementelor nu contează.",
        "Repetarea unui element nu schimbă mulțimea.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Dacă A = {1, 2} și B = {1, 2, 3}, atunci A ⊆ B.",
    },
    {
      numar: 4,
      titlu: "Legătura dintre logică și mulțimi",
      durata: "4 min",
      descriere:
        "Conectăm operațiile logice studiate anterior cu operațiile asupra mulțimilor.",
      idei: [
        "Conjuncția este legată de intersecție.",
        "Disjuncția este legată de reuniune.",
        "Negația este legată de complementară.",
        "Aceste legături ajută la înțelegerea logicii matematice.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Condiția «x ∈ A și x ∈ B» înseamnă exact că x ∈ A ∩ B.",
    },
  ],

  fisaRapida: {
    titlu: "Operațiile esențiale",
    continut: [
      "A ∪ B = elementele care aparțin lui A sau lui B.",
      "A ∩ B = elementele comune.",
      "A \\ B = elementele din A care nu aparțin lui B.",
      "A ⊆ B = orice element al lui A aparține și lui B.",
      "A = B când cele două mulțimi au exact aceleași elemente.",
    ],
  },

  exercitii: [
    {
      intrebare:
        "Dacă A = {1, 2, 3} și B = {3, 4}, atunci A ∪ B este:",
      variante: [
        "{3}",
        "{1, 2, 3, 4}",
        "{1, 2}",
        "{4}",
      ],
      corect: 1,
      explicatie:
        "Reuniunea conține toate elementele care apar în cel puțin una dintre mulțimi.",
    },
    {
      intrebare:
        "Pentru aceleași mulțimi, A ∩ B este:",
      variante: ["{1, 2}", "{3}", "{4}", "∅"],
      corect: 1,
      explicatie:
        "Singurul element comun este 3.",
    },
    {
      intrebare:
        "Dacă A = {1, 2, 3} și B = {3, 4}, A \\ B este:",
      variante: ["{1, 2}", "{3}", "{4}", "{1, 2, 4}"],
      corect: 0,
      explicatie:
        "Păstrăm elementele din A care nu aparțin lui B.",
    },
    {
      intrebare:
        "Dacă A = {1, 2} și B = {1, 2, 3}, care relație este corectă?",
      variante: ["B ⊆ A", "A ⊆ B", "A ∩ B = ∅", "A = B"],
      corect: 1,
      explicatie:
        "Fiecare element al lui A aparține și lui B.",
    },
    {
      intrebare:
        "Dacă A ∩ B = ∅, atunci:",
      variante: [
        "A și B nu au elemente comune",
        "A = B",
        "A este vidă obligatoriu",
        "B este vidă obligatoriu",
      ],
      corect: 0,
      explicatie:
        "Intersecția vidă înseamnă că nu există elemente comune.",
    },
    {
      intrebare:
        "Condiția «x ∈ A și x ∈ B» este echivalentă cu:",
      variante: [
        "x ∈ A ∪ B",
        "x ∈ A ∩ B",
        "x ∉ A",
        "A = B",
      ],
      corect: 1,
      explicatie:
        "Conjuncția celor două condiții corespunde intersecției.",
    },
  ],

  storageKeyFinalizata:
    "lectie-operatii-cu-multimi-finalizata",
  storageKeyXp:
    "lectie-operatii-cu-multimi-xp",

  urmatoareaLectie: {
    titlu: "Inducția matematică",
    href: "/lectii/inductia-matematica",
  },
};

/* =========================================================
   LECȚIA 9
   ========================================================= */

export const lectiaInductiaMatematica: Lectie = {
  id: "inductia-matematica",
  slug: "inductia-matematica",

  modul: 1,
  numarLectie: 9,
  totalLectiiModul: 10,

  clasa: "Clasa a IX-a",
  profil: "M_mate-info",

  titlu: "Inducția matematică",

  descriere:
    "Înveți principiul inducției matematice și structura unei demonstrații pentru afirmații care depind de un număr natural.",

  obiective: [
    {
      icon: "1️⃣",
      titlu: "Să verifici cazul inițial",
      descriere:
        "Vei începe demonstrația de la prima valoare relevantă.",
    },
    {
      icon: "➡️",
      titlu: "Să formulezi ipoteza de inducție",
      descriere:
        "Vei presupune afirmația adevărată pentru un anumit rang.",
    },
    {
      icon: "✅",
      titlu: "Să faci pasul de inducție",
      descriere:
        "Vei demonstra că afirmația este adevărată și pentru rangul următor.",
    },
  ],

  videoLectii: [
    {
      numar: 1,
      titlu: "Ideea inducției matematice",
      durata: "5 min",
      descriere:
        "Înțelegi mecanismul de bază al unei demonstrații prin inducție.",
      idei: [
        "Inducția se folosește pentru afirmații dependente de n natural.",
        "Mai întâi verificăm cazul inițial.",
        "Apoi presupunem afirmația adevărată pentru n = k.",
        "Pe baza ipotezei, demonstrăm cazul n = k + 1.",
      ],
      exempluTitlu: "Imagine mentală",
      exemplu:
        "Este asemănător unui șir de piese de domino: prima cade, iar fiecare piesă o face să cadă pe următoarea.",
    },
    {
      numar: 2,
      titlu: "Cazul inițial și ipoteza de inducție",
      durata: "5 min",
      descriere:
        "Înveți să scrii primele două părți ale demonstrației.",
      idei: [
        "Cazul inițial trebuie verificat, nu doar afirmat.",
        "Ipoteza de inducție este o presupunere temporară.",
        "De obicei notăm rangul cu k.",
        "Nu demonstrăm din nou ipoteza în pasul de inducție.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Pentru formula 1 + 2 + ... + n = n(n+1)/2, verificăm mai întâi n = 1.",
    },
    {
      numar: 3,
      titlu: "Pasul de inducție",
      durata: "6 min",
      descriere:
        "Vedem cum trecem de la cazul k la cazul k + 1.",
      idei: [
        "Presupunem formula adevărată pentru k.",
        "Scriem expresia pentru k + 1.",
        "Folosim ipoteza de inducție.",
        "Transformăm până obținem formula dorită pentru k + 1.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Dacă 1 + ... + k = k(k+1)/2, atunci adăugăm k+1 și simplificăm pentru a obține formula corespunzătoare lui k+1.",
    },
    {
      numar: 4,
      titlu: "Cum recunoști o demonstrație corectă",
      durata: "4 min",
      descriere:
        "Evităm cele mai frecvente greșeli în inducție.",
      idei: [
        "Nu sări peste cazul inițial.",
        "Nu presupune direct cazul k + 1.",
        "Folosește explicit ipoteza de inducție.",
        "Încheie precizând concluzia pentru toate valorile din domeniul considerat.",
      ],
      exempluTitlu: "Regula de aur",
      exemplu:
        "Baza pornește lanțul, iar pasul de inducție îl continuă.",
    },
  ],

  fisaRapida: {
    titlu: "Schema unei demonstrații prin inducție",
    continut: [
      "1. Verifică afirmația pentru valoarea inițială.",
      "2. Presupune afirmația adevărată pentru n = k.",
      "3. Demonstrează afirmația pentru n = k + 1.",
      "4. Concluzionează că afirmația este adevărată pentru toate valorile considerate.",
    ],
  },

  exercitii: [
    {
      intrebare:
        "Care este primul pas într-o demonstrație prin inducție?",
      variante: [
        "Cazul inițial",
        "Concluzia",
        "Contraexemplul",
        "Derivarea",
      ],
      corect: 0,
      explicatie:
        "Trebuie mai întâi să verificăm că afirmația este adevărată pentru valoarea de pornire.",
    },
    {
      intrebare:
        "În ipoteza de inducție presupunem că afirmația este adevărată pentru:",
      variante: ["n = k", "n = 0 obligatoriu", "n = k + 2", "toate numerele reale"],
      corect: 0,
      explicatie:
        "În mod obișnuit presupunem afirmația adevărată pentru un rang generic n = k.",
    },
    {
      intrebare:
        "În pasul de inducție trebuie să demonstrăm afirmația pentru:",
      variante: ["k - 1", "k + 1", "2k", "0"],
      corect: 1,
      explicatie:
        "Pornind de la ipoteza pentru k, demonstrăm cazul următor k + 1.",
    },
    {
      intrebare:
        "Care afirmație despre ipoteza de inducție este corectă?",
      variante: [
        "Este o presupunere temporară folosită în demonstrație",
        "Este concluzia finală",
        "Trebuie demonstrată separat pentru orice k",
        "Nu este folosită în pasul următor",
      ],
      corect: 0,
      explicatie:
        "Ipoteza de inducție este presupusă pentru un rang generic și folosită pentru a demonstra rangul următor.",
    },
    {
      intrebare:
        "Pentru formula 1 + 2 + ... + n = n(n+1)/2, cazul inițial n = 1 dă:",
      variante: ["1 = 1", "1 = 2", "0 = 1", "2 = 1"],
      corect: 0,
      explicatie:
        "Membrul stâng este 1, iar membrul drept este 1·2/2 = 1.",
    },
    {
      intrebare:
        "De ce sunt necesare atât cazul inițial, cât și pasul de inducție?",
      variante: [
        "Cazul inițial pornește lanțul, iar pasul îl continuă",
        "Pentru că reprezintă aceeași verificare",
        "Pentru că inducția se aplică numai la două valori",
        "Nu sunt ambele necesare",
      ],
      corect: 0,
      explicatie:
        "Fără bază nu avem punct de pornire, iar fără pasul de inducție nu putem trece la valorile următoare.",
    },
  ],

  storageKeyFinalizata:
    "lectie-inductia-matematica-finalizata",
  storageKeyXp:
    "lectie-inductia-matematica-xp",

  urmatoareaLectie: {
    titlu: "Demonstrații și raționamente logice",
    href: "/lectii/demonstratii-rationamente-logice",
  },
};

/* =========================================================
   LECȚIA 10
   ========================================================= */

export const lectiaDemonstratii: Lectie = {
  id: "demonstratii-rationamente-logice",
  slug: "demonstratii-rationamente-logice",

  modul: 1,
  numarLectie: 10,
  totalLectiiModul: 10,

  clasa: "Clasa a IX-a",
  profil: "M_mate-info",

  titlu: "Demonstrații și raționamente logice",

  descriere:
    "Încheiem modulul prin folosirea logicii în demonstrații matematice, inclusiv demonstrația directă și demonstrația prin reducere la absurd.",

  obiective: [
    {
      icon: "🧩",
      titlu: "Să identifici ipoteza",
      descriere:
        "Vei separa datele problemei de ceea ce trebuie demonstrat.",
    },
    {
      icon: "➡️",
      titlu: "Să urmărești un raționament",
      descriere:
        "Vei construi o succesiune logică de pași.",
    },
    {
      icon: "⚡",
      titlu: "Să înțelegi reducerea la absurd",
      descriere:
        "Vei vedea cum o presupunere contrară poate conduce la contradicție.",
    },
  ],

  videoLectii: [
    {
      numar: 1,
      titlu: "Ipoteză și concluzie",
      durata: "4 min",
      descriere:
        "Învățăm structura de bază a unei demonstrații matematice.",
      idei: [
        "Ipoteza reprezintă ceea ce știm sau presupunem.",
        "Concluzia reprezintă ceea ce trebuie demonstrat.",
        "Fiecare pas trebuie justificat.",
        "Nu putem folosi concluzia ca argument pentru ea însăși.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Dacă n este număr par, atunci n = 2k pentru un anumit k întreg. De aici putem construi demonstrații despre n.",
    },
    {
      numar: 2,
      titlu: "Demonstrația directă",
      durata: "5 min",
      descriere:
        "Pornim de la ipoteză și ajungem prin pași corecți la concluzie.",
      idei: [
        "Pornim de la ceea ce este cunoscut.",
        "Aplicăm definiții și proprietăți corecte.",
        "Fiecare pas trebuie să rezulte din pasul anterior.",
        "Ajungem la concluzia cerută.",
      ],
      exempluTitlu: "Exemplu",
      exemplu:
        "Dacă n = 2k este par, atunci n² = 4k² = 2·(2k²), deci n² este par.",
    },
    {
      numar: 3,
      titlu: "Reducerea la absurd",
      durata: "5–6 min",
      descriere:
        "Presupunem contrariul concluziei și arătăm că această presupunere duce la o contradicție.",
      idei: [
        "Presupunem că afirmația pe care vrem să o demonstrăm este falsă.",
        "Folosim logic această presupunere împreună cu ipotezele.",
        "Ajungem la o contradicție.",
        "Concluzionăm că presupunerea contrară nu poate fi adevărată.",
      ],
      exempluTitlu: "Ideea metodei",
      exemplu:
        "Dacă presupunerea contrară conduce simultan la o afirmație și la negația ei, avem o contradicție.",
    },
    {
      numar: 4,
      titlu: "Cum verifici un raționament",
      durata: "4 min",
      descriere:
        "Înveți să depistezi salturile nejustificate și concluziile greșite.",
      idei: [
        "Verifică dacă fiecare pas are justificare.",
        "Nu confunda un exemplu cu o demonstrație universală.",
        "Nu confunda implicația cu reciproca ei.",
        "Un contraexemplu poate demonta o afirmație universală falsă.",
      ],
      exempluTitlu: "Atenție",
      exemplu:
        "Faptul că o proprietate este adevărată pentru câteva exemple nu demonstrează că este adevărată pentru toate valorile.",
    },
  ],

  fisaRapida: {
    titlu: "Cum construiești o demonstrație",
    continut: [
      "Identifică ipoteza și concluzia.",
      "Folosește numai definiții, proprietăți și rezultate justificate.",
      "În demonstrația directă mergi de la ipoteză spre concluzie.",
      "În reducerea la absurd presupui contrariul concluziei și cauți o contradicție.",
      "Un exemplu nu demonstrează o afirmație universală, dar un contraexemplu o poate infirma.",
    ],
  },

  exercitii: [
    {
      intrebare:
        "Într-o demonstrație, ipoteza reprezintă:",
      variante: [
        "Ceea ce știm sau presupunem",
        "Rezultatul final",
        "O greșeală",
        "Un contraexemplu obligatoriu",
      ],
      corect: 0,
      explicatie:
        "Ipoteza conține informațiile de la care pornește raționamentul.",
    },
    {
      intrebare:
        "Într-o demonstrație directă:",
      variante: [
        "Pornim de la ipoteză și ajungem la concluzie",
        "Presupunem întotdeauna concluzia falsă",
        "Verificăm doar un exemplu",
        "Nu avem nevoie de justificări",
      ],
      corect: 0,
      explicatie:
        "Demonstrația directă pornește de la ipoteze și deduce concluzia prin pași corecți.",
    },
    {
      intrebare:
        "În reducerea la absurd, presupunem inițial:",
      variante: [
        "Contrariul concluziei",
        "Că toate numerele sunt egale",
        "Că ipoteza este inutilă",
        "Că demonstrația este deja terminată",
      ],
      corect: 0,
      explicatie:
        "Presupunem contrariul concluziei și arătăm că această presupunere conduce la contradicție.",
    },
    {
      intrebare:
        "Dacă n este par, putem scrie:",
      variante: [
        "n = 2k, cu k întreg",
        "n = 2k + 1, cu k întreg",
        "n = k/2 obligatoriu",
        "n = 1",
      ],
      corect: 0,
      explicatie:
        "Aceasta este definiția unui număr întreg par.",
    },
    {
      intrebare:
        "Pentru a arăta că o afirmație universală este falsă, poate fi suficient:",
      variante: [
        "Un contraexemplu",
        "Un exemplu favorabil",
        "O presupunere",
        "O definiție fără legătură",
      ],
      corect: 0,
      explicatie:
        "Un singur contraexemplu este suficient pentru a infirma o afirmație de tip «pentru orice».",
    },
    {
      intrebare:
        "Care este o greșeală de raționament?",
      variante: [
        "Să justificăm fiecare pas",
        "Să folosim concluzia ca argument pentru ea însăși",
        "Să pornim de la ipoteză",
        "Să folosim o definiție corectă",
      ],
      corect: 1,
      explicatie:
        "Nu putem demonstra o concluzie presupunând chiar concluzia pe care vrem să o demonstrăm.",
    },
  ],

  storageKeyFinalizata:
    "lectie-demonstratii-rationamente-logice-finalizata",
  storageKeyXp:
    "lectie-demonstratii-rationamente-logice-xp",

  urmatoareaLectie: {
    titlu: "Reper cartezian și produs cartezian",
  },
};

/* =========================================================
   TOATE LECȚIILE CONSTRUITE CU MOTORUL UNIVERSAL
   ========================================================= */

export const lectii: Lectie[] = [
  lectiaCuantificatori,
  lectiaOperatiiLogice,
  lectiaOperatiiMultimi,
  lectiaInductiaMatematica,
  lectiaDemonstratii,
];