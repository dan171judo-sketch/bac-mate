import LectieUniversala from "../../../components/LectieUniversala";
import type { Lectie } from "../../../data/lectii";

const lectie: Lectie = {
  id: "cresteri-reduceri",
  slug: "cresteri-reduceri",

  // Lecție de recuperare / consolidare, nu lecție numerotată
  // din Modulul 1 al programei oficiale.
  modul: 0,
  numarLectie: 2,
  totalLectiiModul: 2,

  clasa: "Recuperare",
  profil: "Toate profilurile",

  titlu: "Creșteri și reduceri procentuale",

  descriere:
    "În această lecție înveți să calculezi rapid cu cât crește sau scade o valoare și să rezolvi probleme cu majorări, reduceri și procente succesive.",

  obiective: [
    {
      icon: "📈",
      titlu: "Să calculezi o creștere",
      descriere:
        "Vei afla valoarea finală atunci când o mărime crește cu un anumit procent.",
    },
    {
      icon: "📉",
      titlu: "Să calculezi o reducere",
      descriere:
        "Vei afla rapid prețul sau valoarea rămasă după o reducere procentuală.",
    },
    {
      icon: "🧠",
      titlu: "Să eviți capcanele",
      descriere:
        "Vei înțelege de ce o creștere și o reducere cu același procent nu se anulează întotdeauna.",
    },
  ],

  videoLectii: [
    {
      numar: 1,
      titlu: "Cum calculăm o creștere procentuală?",
      durata: "4 min",

      descriere:
        "Înveți metoda de bază pentru a calcula noua valoare atunci când o mărime crește cu p%.",

      idei: [
        "Calculăm mai întâi procentul din valoarea inițială",
        "Adăugăm creșterea la valoarea inițială",
        "Putem folosi și formula Vfinal = Vinițial × (1 + p/100)",
        "O creștere de 20% înseamnă că noua valoare este 120% din cea inițială",
      ],

      exempluTitlu: "Exemplu rapid",

      exemplu:
        "Un produs costă 200 lei și prețul crește cu 15%. Creșterea este 15% din 200 = 30 lei. Noul preț este 200 + 30 = 230 lei.",
    },

    {
      numar: 2,
      titlu: "Cum calculăm o reducere procentuală?",
      durata: "4 min",

      descriere:
        "Înveți să calculezi valoarea rămasă după aplicarea unei reduceri.",

      idei: [
        "Calculăm procentul care se scade",
        "Scădem reducerea din valoarea inițială",
        "Putem folosi formula Vfinal = Vinițial × (1 - p/100)",
        "O reducere de 25% înseamnă că rămâne 75% din valoarea inițială",
      ],

      exempluTitlu: "Exemplu rapid",

      exemplu:
        "Un produs costă 400 lei și are o reducere de 25%. Reducerea este 100 lei, deci prețul final este 300 lei.",
    },

    {
      numar: 3,
      titlu: "Cu cât la sută s-a modificat o valoare?",
      durata: "4–5 min",

      descriere:
        "Înveți să găsești procentul de creștere sau de scădere atunci când cunoști valoarea inițială și valoarea finală.",

      idei: [
        "Calculăm diferența dintre valoarea finală și cea inițială",
        "Raportăm diferența la valoarea inițială",
        "Înmulțim rezultatul cu 100",
        "Baza de raportare este întotdeauna valoarea inițială",
      ],

      exempluTitlu: "Exemplu rapid",

      exemplu:
        "Un preț crește de la 80 lei la 100 lei. Creșterea este 20 lei. 20 / 80 × 100 = 25%, deci prețul a crescut cu 25%.",
    },

    {
      numar: 4,
      titlu: "Creșteri și reduceri succesive",
      durata: "5 min",

      descriere:
        "Înțelegi una dintre cele mai frecvente capcane ale problemelor cu procente.",

      idei: [
        "Procentele succesive se aplică pe valori diferite",
        "Nu adunăm și nu scădem automat procentele",
        "O creștere de 20% urmată de o reducere de 20% nu ne aduce la valoarea inițială",
        "Calculăm fiecare modificare pe rând",
      ],

      exempluTitlu: "Exemplu rapid",

      exemplu:
        "100 lei crește cu 20% și devine 120 lei. Apoi scade cu 20% din 120, adică 24 lei. Rezultatul este 96 lei, nu 100 lei.",
    },
  ],

  fisaRapida: {
    titlu: "Formulele pe care trebuie să le știi",

    continut: [
      "Creștere cu p%: Vfinal = Vinițial × (1 + p/100).",
      "Reducere cu p%: Vfinal = Vinițial × (1 - p/100).",
      "Procentul de modificare = (modificarea / valoarea inițială) × 100.",
      "Exemplu: creștere cu 20% → înmulțim cu 1,20.",
      "Exemplu: reducere cu 20% → înmulțim cu 0,80.",
      "Atenție: o creștere cu p% urmată de o reducere cu p% nu revine, în general, la valoarea inițială.",
    ],
  },

  exercitii: [
    {
      intrebare:
        "Un produs costă 200 lei. Prețul crește cu 10%. Care este noul preț?",

      variante: [
        "202 lei",
        "210 lei",
        "220 lei",
        "240 lei",
      ],

      corect: 2,

      explicatie:
        "10% din 200 este 20. Adăugăm creșterea: 200 + 20 = 220 lei.",
    },

    {
      intrebare:
        "Un produs costă 300 lei și are o reducere de 20%. Care este prețul final?",

      variante: [
        "220 lei",
        "240 lei",
        "260 lei",
        "280 lei",
      ],

      corect: 1,

      explicatie:
        "20% din 300 este 60. Scădem reducerea: 300 - 60 = 240 lei.",
    },

    {
      intrebare:
        "Un număr crește de la 50 la 60. Cu cât la sută a crescut?",

      variante: [
        "10%",
        "15%",
        "20%",
        "25%",
      ],

      corect: 2,

      explicatie:
        "Creșterea este 60 - 50 = 10. Raportăm la valoarea inițială: 10 / 50 × 100 = 20%.",
    },

    {
      intrebare:
        "Un preț scade de la 500 lei la 400 lei. Care este procentul de reducere?",

      variante: [
        "10%",
        "20%",
        "25%",
        "100%",
      ],

      corect: 1,

      explicatie:
        "Reducerea este 500 - 400 = 100 lei. Raportăm la valoarea inițială: 100 / 500 × 100 = 20%.",
    },

    {
      intrebare:
        "O valoare de 100 crește cu 20% și apoi scade cu 20%. Care este valoarea finală?",

      variante: [
        "80",
        "96",
        "100",
        "104",
      ],

      corect: 1,

      explicatie:
        "După creșterea de 20%, 100 devine 120. Reducerea de 20% se aplică acum lui 120: 20% din 120 = 24. Valoarea finală este 120 - 24 = 96.",
    },

    {
      intrebare:
        "Cu ce număr înmulțim direct o valoare pentru a o reduce cu 15%?",

      variante: [
        "0,15",
        "0,85",
        "1,15",
        "1,85",
      ],

      corect: 1,

      explicatie:
        "După o reducere de 15% rămâne 100% - 15% = 85% din valoarea inițială. 85% = 0,85.",
    },

    {
      intrebare:
        "Un salariu de 2500 lei crește cu 8%. Care este noua valoare?",

      variante: [
        "2580 lei",
        "2650 lei",
        "2700 lei",
        "2750 lei",
      ],

      corect: 2,

      explicatie:
        "8% din 2500 este 200. Noul salariu este 2500 + 200 = 2700 lei. Echivalent: 2500 × 1,08 = 2700.",
    },

    {
      intrebare:
        "Care afirmație este corectă?",

      variante: [
        "O creștere de 30% urmată de o reducere de 30% ne aduce întotdeauna la valoarea inițială",
        "La calculul procentului de modificare raportăm diferența la valoarea finală",
        "O reducere de 25% înseamnă că rămâne 75% din valoarea inițială",
        "Pentru o creștere de 10% înmulțim valoarea cu 0,10",
      ],

      corect: 2,

      explicatie:
        "Dacă reducem o valoare cu 25%, rămân 100% - 25% = 75% din valoarea inițială.",
    },
  ],

  storageKeyFinalizata:
    "lectie-cresteri-reduceri-finalizata",

  storageKeyXp:
    "lectie-cresteri-reduceri-xp",

  urmatoareaLectie: {
    titlu: "Continuă cu programa BAC MATE",
    href: "/programa",
  },
};

export default function LectieCresteriReduceri() {
  return <LectieUniversala lectie={lectie} />;
}