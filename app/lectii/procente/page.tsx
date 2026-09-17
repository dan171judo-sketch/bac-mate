import LectieUniversala from "../../../components/LectieUniversala";
import type { Lectie } from "../../../data/lectii";

const lectie: Lectie = {
  id: "procente",
  slug: "procente",

  // Lecție de recuperare, înainte de programa propriu-zisă.
  modul: 0,
  numarLectie: 1,
  totalLectiiModul: 2,

  clasa: "Recuperare",
  profil: "Toate profilurile",

  titlu: "Procente",

  descriere:
    "În această lecție vei înțelege ce este un procent, cum calculezi un procent dintr-un număr și cum rezolvi probleme simple cu procente.",

  obiective: [
    {
      icon: "💯",
      titlu: "Să înțelegi procentul",
      descriere:
        "Vei înțelege că procent înseamnă o parte raportată la 100.",
    },
    {
      icon: "🧮",
      titlu: "Să calculezi",
      descriere:
        "Vei calcula rapid p% dintr-un număr folosind formula de bază.",
    },
    {
      icon: "💰",
      titlu: "Să aplici",
      descriere:
        "Vei folosi procentele în probleme cu prețuri, reduceri și creșteri.",
    },
  ],

  videoLectii: [
    {
      numar: 1,
      titlu: "Ce înseamnă un procent?",
      durata: "3–4 min",

      descriere:
        "Înțelegi ideea de procent pornind de la expresia «din 100».",

      idei: [
        "Procent înseamnă «din 100».",
        "20% înseamnă 20 din 100.",
        "20% = 20/100 = 0,2.",
        "100% dintr-o valoare reprezintă întreaga valoare.",
      ],

      exempluTitlu: "Exemplu rapid",

      exemplu:
        "Dacă avem 100 lei, 20% din această sumă înseamnă 20 lei.",
    },

    {
      numar: 2,
      titlu: "Cum calculăm p% dintr-un număr?",
      durata: "4 min",

      descriere:
        "Înveți formula de bază pentru calcularea procentelor.",

      idei: [
        "Formula este p% din N = (p/100) × N.",
        "Transformăm procentul într-o fracție cu numitorul 100.",
        "Putem transforma procentul și în număr zecimal.",
        "Apoi înmulțim cu valoarea dată.",
      ],

      exempluTitlu: "Exemplu rezolvat",

      exemplu:
        "20% din 150 = (20/100) × 150 = 0,2 × 150 = 30.",
    },

    {
      numar: 3,
      titlu: "Procente în probleme",
      durata: "4–5 min",

      descriere:
        "Aplici procentele în situații concrete precum prețuri și reduceri.",

      idei: [
        "Calculăm mai întâi procentul cerut.",
        "La reducere, scădem valoarea reducerii din prețul inițial.",
        "La creștere, adăugăm valoarea creșterii.",
        "Trebuie să identificăm corect valoarea la care se raportează procentul.",
      ],

      exempluTitlu: "Exemplu rapid",

      exemplu:
        "Un produs costă 250 lei și are reducere 20%. 20% din 250 = 50 lei, deci prețul final este 250 - 50 = 200 lei.",
    },

    {
      numar: 4,
      titlu: "Cum aflăm procentul unei modificări?",
      durata: "4–5 min",

      descriere:
        "Înveți să determini cu cât la sută a crescut sau a scăzut o valoare.",

      idei: [
        "Calculăm mai întâi diferența dintre cele două valori.",
        "Raportăm diferența la valoarea inițială.",
        "Înmulțim rezultatul cu 100.",
        "Valoarea inițială este baza de raportare.",
      ],

      exempluTitlu: "Exemplu rapid",

      exemplu:
        "Un număr crește de la 80 la 100. Creșterea este 20, iar 20/80 × 100 = 25%.",
    },
  ],

  fisaRapida: {
    titlu: "Formulele de bază",

    continut: [
      "p% = p/100.",
      "p% din N = (p/100) × N.",
      "20% = 0,20 = 0,2.",
      "50% dintr-un număr înseamnă jumătate din acel număr.",
      "25% dintr-un număr înseamnă un sfert din acel număr.",
      "Procentul unei modificări = (modificarea / valoarea inițială) × 100.",
    ],
  },

  exercitii: [
    {
      intrebare:
        "Cât este 30% din 200?",

      variante: [
        "40",
        "50",
        "60",
        "70",
      ],

      corect: 2,

      explicatie:
        "30% = 30/100 = 0,3, iar 0,3 × 200 = 60.",
    },

    {
      intrebare:
        "Un produs costă 250 lei și are reducere 20%. Cât costă după reducere?",

      variante: [
        "180 lei",
        "190 lei",
        "200 lei",
        "210 lei",
      ],

      corect: 2,

      explicatie:
        "20% din 250 = 50 lei. Prețul final este 250 - 50 = 200 lei.",
    },

    {
      intrebare:
        "Un număr crește de la 80 la 100. Cu cât la sută a crescut?",

      variante: [
        "20%",
        "25%",
        "30%",
        "40%",
      ],

      corect: 1,

      explicatie:
        "Creșterea este 20. Raportăm la valoarea inițială: 20/80 = 0,25 = 25%.",
    },

    {
      intrebare:
        "Cât este 50% din 360?",

      variante: [
        "90",
        "120",
        "180",
        "200",
      ],

      corect: 2,

      explicatie:
        "50% înseamnă jumătate. Jumătate din 360 este 180.",
    },

    {
      intrebare:
        "Cât este 25% din 400?",

      variante: [
        "25",
        "50",
        "100",
        "125",
      ],

      corect: 2,

      explicatie:
        "25% = 1/4. Un sfert din 400 este 100.",
    },

    {
      intrebare:
        "Un produs costă 500 lei. O reducere de 10% valorează:",

      variante: [
        "10 lei",
        "25 lei",
        "50 lei",
        "100 lei",
      ],

      corect: 2,

      explicatie:
        "10% din 500 = 0,10 × 500 = 50 lei.",
    },
  ],

  storageKeyFinalizata:
    "lectie-procente-finalizata",

  storageKeyXp:
    "lectie-procente-xp",

  urmatoareaLectie: {
    titlu: "Creșteri și reduceri procentuale",
    href: "/lectii/cresteri-reduceri",
  },
};

export default function LectieProcente() {
  return <LectieUniversala lectie={lectie} />;
}