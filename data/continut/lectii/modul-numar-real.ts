import type {
  ContinutLectie,
} from "../tipuri";

export const continutModulNumarReal: ContinutLectie = {
  id: "modul-numar-real",
  slug: "modul-numar-real",

  modul: 1,
  numarLectie: 3,

  clasa: "Clasa a IX-a",
  profil: "M_mate-info",

  titlu: "Modulul unui număr real",

  subtitlu:
    "Înțelege modulul ca distanță și folosește-l corect în calcule și ecuații simple.",

  descriere:
    "Lecția explică modulul unui număr real, definiția sa în funcție de semnul numărului, interpretarea geometrică drept distanță față de zero, ecuațiile simple de forma |x| = a și distanța dintre două numere reale.",

  nivelPrincipal: "fundament",

  durataEstimataMinute: 25,

  prerechizite: [
    "Numere reale",
    "Axa numerelor reale",
    "Compararea numerelor reale",
    "Numere opuse",
    "Ecuații elementare",
  ],

  obiective: [
    "Să interpretezi modulul unui număr real ca distanță față de zero.",
    "Să calculezi corect modulul numerelor pozitive, negative și al lui zero.",
    "Să folosești definiția modulului în funcție de semnul numărului.",
    "Să rezolvi ecuații simple de forma |x| = a.",
    "Să calculezi distanța dintre două numere reale folosind modulul.",
  ],

  termeniCheie: [
    "modul",
    "valoare absolută",
    "distanță",
    "axa numerelor reale",
    "numere opuse",
    "ecuație cu modul",
  ],

  videoLectii: [
    {
      id: "modul-numar-real-video-1",
      numar: 1,
      titlu: "Ce înseamnă modulul unui număr real?",
      durataMinute: 4,

      descriere:
        "Înțelegem modulul pornind de la distanța unui număr față de zero pe axa numerelor reale.",

      scenariu: [
        "Începem cu ideea principală a acestei lecții: modulul unui număr real reprezintă distanța dintre acel număr și zero pe axa numerelor reale.",
        "Pentru un număr x, modulul se notează |x|. Cele două bare verticale nu înseamnă paranteze și nici înmulțire. Ele arată că ne interesează valoarea absolută a numărului.",
        "Să luăm numărul 5. Pe axa numerelor reale, 5 se află la cinci unități de zero. De aceea |5| = 5.",
        "Acum luăm numărul -5. El se află în partea opusă a axei, dar distanța sa până la zero este tot cinci unități. Prin urmare |-5| = 5.",
        "Observăm astfel o proprietate foarte importantă: două numere opuse, cum sunt 5 și -5, au același modul.",
        "Această observație este firească dacă ne gândim la distanță. Distanța nu este negativă. Nu spunem că un punct se află la minus cinci metri de alt punct atunci când vorbim despre lungimea distanței dintre ele.",
        "Pentru numărul zero situația este și mai simplă. Zero se află chiar în origine, deci distanța de la zero la zero este zero. Astfel |0| = 0.",
        "Din aceste exemple obținem o regulă esențială: modulul oricărui număr real este mai mare sau egal cu zero.",
        "Cu alte cuvinte, pentru orice număr real x avem |x| ≥ 0.",
        "Dacă x este pozitiv, modulul său este chiar x. Dacă x este negativ, modulul devine numărul pozitiv opus lui x.",
        "De exemplu, |8| = 8, |-8| = 8, |2,5| = 2,5 și |-2,5| = 2,5.",
        "Este important să separăm numărul de semnul lui. Modulul nu înseamnă pur și simplu să ștergem un minus fără să gândim. Ideea corectă este că modulul reprezintă o distanță.",
        "Această interpretare ne ajută mai târziu când rezolvăm ecuații cu modul și când calculăm distanța dintre două numere reale.",
        "Reține pentru moment trei idei: |x| este o distanță, |x| nu poate fi negativ și două numere opuse au același modul.",
      ],

      ideiDeRetinut: [
        "|x| reprezintă distanța de la x la 0.",
        "|x| ≥ 0 pentru orice x real.",
        "|x| = |-x|.",
        "|0| = 0.",
      ],

      exemplu: {
        titlu: "Două numere opuse",
        enunt:
          "Calculați modulele numerelor -4 și 4.",
        rezolvareScurta: [
          "Numărul 4 se află la distanța 4 de zero.",
          "Numărul -4 se află tot la distanța 4 de zero.",
          "Prin urmare |-4| = 4 și |4| = 4.",
        ],
        raspuns:
          "|-4| = |4| = 4",
      },

      verificareRapida: {
        intrebare:
          "Care este valoarea lui |-7|?",
        variante: [
          "-7",
          "0",
          "7",
          "14",
        ],
        raspunsCorect: 2,
        explicatie:
          "Modulul reprezintă distanța față de zero, iar distanța dintre -7 și 0 este 7.",
      },
    },

    {
      id: "modul-numar-real-video-2",
      numar: 2,
      titlu: "Formula modulului și calculul corect",
      durataMinute: 5,

      descriere:
        "Trecem de la interpretarea geometrică la definiția modulului în funcție de semnul lui x.",

      scenariu: [
        "După ce am înțeles modulul ca distanță, putem scrie definiția sa matematică.",
        "Dacă x este mai mare sau egal cu zero, atunci |x| = x.",
        "Dacă x este mai mic decât zero, atunci |x| = -x.",
        "La prima vedere, expresia |x| = -x pentru x negativ poate părea ciudată. Dar trebuie să observăm că, dacă x este negativ, opusul său -x este pozitiv.",
        "De exemplu, pentru x = -7 folosim al doilea caz. Avem |-7| = -(-7) = 7.",
        "Pentru x = 7 folosim primul caz, deoarece 7 este pozitiv. Astfel |7| = 7.",
        "Pentru x = 0 folosim tot primul caz, deoarece zero este mai mare sau egal cu zero. Obținem |0| = 0.",
        "Așadar, primul pas atunci când calculăm un modul este să stabilim semnul expresiei din interiorul barelor.",
        "Dacă în interior se află un număr concret, semnul este imediat vizibil. Dacă avem o expresie, poate fi nevoie mai întâi să o calculăm.",
        "Să calculăm |3 - 8|. Mai întâi efectuăm operația din interior: 3 - 8 = -5. Apoi calculăm modulul: |-5| = 5.",
        "Ordinea aceasta este importantă. Nu tratăm separat fiecare termen din interior, ci calculăm valoarea expresiei aflate între bare și apoi îi determinăm modulul.",
        "De exemplu, |2 - 9| = |-7| = 7.",
        "Modulul nu schimbă un număr pozitiv. |12| = 12.",
        "Modulul transformă un număr negativ în opusul său pozitiv. |-12| = 12.",
        "Din nou, explicația nu este o regulă arbitrară. Totul vine din ideea de distanță față de zero.",
        "Pentru verificare, rezultatul unui modul trebuie să fie întotdeauna nenegativ. Dacă la final obținem un număr negativ, știm că am făcut o greșeală.",
        "Reține metoda: calculează expresia din interior, stabilește semnul rezultatului și apoi aplică definiția modulului.",
      ],

      ideiDeRetinut: [
        "Dacă x ≥ 0, atunci |x| = x.",
        "Dacă x < 0, atunci |x| = -x.",
        "Mai întâi calculăm expresia din interiorul modulului.",
        "Rezultatul final al unui modul nu poate fi negativ.",
      ],

      exemplu: {
        titlu: "Calcul cu modul",
        enunt:
          "Calculați |3 - 8|.",
        rezolvareScurta: [
          "Calculăm mai întâi expresia din interior.",
          "3 - 8 = -5.",
          "Apoi |-5| = 5.",
        ],
        raspuns:
          "5",
      },

      verificareRapida: {
        intrebare:
          "Cât este |2 - 9|?",
        variante: [
          "-7",
          "7",
          "11",
          "-11",
        ],
        raspunsCorect: 1,
        explicatie:
          "2 - 9 = -7, iar |-7| = 7.",
      },
    },

    {
      id: "modul-numar-real-video-3",
      numar: 3,
      titlu: "Ecuații simple de forma |x| = a",
      durataMinute: 5,

      descriere:
        "Folosim interpretarea modulului ca distanță pentru a rezolva ecuații elementare.",

      scenariu: [
        "Acum folosim ideea de distanță pentru a rezolva ecuații de forma |x| = a.",
        "Începem cu exemplul |x| = 4.",
        "Întrebarea este: ce numere se află la distanța 4 față de zero?",
        "Pe axa numerelor reale există două astfel de numere: 4 și -4.",
        "Prin urmare ecuația |x| = 4 are două soluții: x = 4 și x = -4.",
        "În general, dacă a este pozitiv, ecuația |x| = a are două soluții: x = a și x = -a.",
        "Să analizăm acum cazul |x| = 0.",
        "Singurul număr aflat la distanța zero față de zero este chiar zero. Așadar soluția este x = 0.",
        "Mai rămâne cazul în care în partea dreaptă avem un număr negativ, de exemplu |x| = -3.",
        "Știm că modulul oricărui număr real este mai mare sau egal cu zero.",
        "Prin urmare nu poate exista niciun număr real al cărui modul să fie -3.",
        "Ecuația |x| = -3 nu are soluții reale.",
        "Putem organiza aceste situații în trei cazuri.",
        "Dacă a > 0, ecuația |x| = a are două soluții: x = a sau x = -a.",
        "Dacă a = 0, ecuația are o singură soluție: x = 0.",
        "Dacă a < 0, ecuația nu are soluții reale.",
        "Să rezolvăm |x| = 6. Deoarece 6 este pozitiv, avem x = 6 sau x = -6.",
        "Verificarea este simplă: |6| = 6 și |-6| = 6.",
        "Această verificare ne arată din nou de ce apar două soluții atunci când valoarea din dreapta este pozitivă.",
        "Nu trebuie să memorăm mecanic cele două semne. Dacă ne gândim la distanță, rezultatul devine natural.",
      ],

      ideiDeRetinut: [
        "|x| = a, cu a > 0, are soluțiile x = a și x = -a.",
        "|x| = 0 are soluția x = 0.",
        "|x| = a, cu a < 0, nu are soluții reale.",
        "Interpretarea ca distanță explică numărul soluțiilor.",
      ],

      exemplu: {
        titlu: "Ecuație cu modul",
        enunt:
          "Rezolvați în R ecuația |x| = 6.",
        rezolvareScurta: [
          "Numărul 6 este pozitiv.",
          "Căutăm numerele aflate la distanța 6 față de zero.",
          "Acestea sunt 6 și -6.",
          "Verificare: |6| = 6 și |-6| = 6.",
        ],
        raspuns:
          "x ∈ {-6, 6}",
      },

      verificareRapida: {
        intrebare:
          "Câte soluții reale are ecuația |x| = -2?",
        variante: [
          "Niciuna",
          "Una",
          "Două",
          "Infinit de multe",
        ],
        raspunsCorect: 0,
        explicatie:
          "Modulul unui număr real nu poate fi negativ.",
      },
    },

    {
      id: "modul-numar-real-video-4",
      numar: 4,
      titlu: "Distanța dintre două numere și greșeli frecvente",
      durataMinute: 5,

      descriere:
        "Aplicăm modulul la distanța dintre două numere reale și recapitulăm erorile care apar cel mai des.",

      scenariu: [
        "Modulul ne permite să calculăm nu doar distanța unui număr față de zero, ci și distanța dintre două numere reale.",
        "Pentru două numere reale a și b, distanța dintre ele este |a - b|.",
        "Putem scrie și |b - a|, deoarece cele două valori sunt egale.",
        "Să calculăm distanța dintre -2 și 5.",
        "Aplicăm formula: |-2 - 5|.",
        "Calculăm expresia din interior: -2 - 5 = -7.",
        "Apoi calculăm modulul: |-7| = 7.",
        "Deci distanța dintre -2 și 5 este 7.",
        "Dacă inversăm ordinea, obținem |5 - (-2)| = |7| = 7.",
        "Rezultatul este același, așa cum trebuie să fie pentru o distanță.",
        "Una dintre cele mai frecvente greșeli este păstrarea semnului negativ după calcularea modulului.",
        "De exemplu, este greșit să spunem |-8| = -8. Valoarea corectă este 8.",
        "O altă greșeală este să credem că ecuația |x| = 4 are doar soluția x = 4. De fapt există și soluția x = -4.",
        "A treia greșeală este încercarea de a rezolva în numere reale o ecuație precum |x| = -3. Aceasta nu are soluții reale.",
        "La problemele cu distanțe trebuie să fim atenți la scădere. Formula este |a - b|, iar modulul se calculează după ce efectuăm diferența.",
        "De exemplu, distanța dintre 3 și 10 este |3 - 10| = |-7| = 7.",
        "Distanța dintre -4 și -1 este |-4 - (-1)| = |-3| = 3.",
        "Indiferent de poziția numerelor pe axă, rezultatul unei distanțe trebuie să fie nenegativ.",
        "Pentru Bac, modulul trebuie tratat cu atenție mai ales atunci când apare în calcule, ecuații sau interpretări geometrice pe axa numerelor reale.",
        "Recapitularea finală este simplă: modulul este o distanță, este întotdeauna nenegativ, iar distanța dintre a și b este |a - b|.",
      ],

      ideiDeRetinut: [
        "Distanța dintre a și b este |a - b|.",
        "|a - b| = |b - a|.",
        "O distanță nu poate fi negativă.",
        "La |x| = a trebuie analizat semnul lui a.",
      ],

      exemplu: {
        titlu: "Distanță pe axa numerelor",
        enunt:
          "Calculați distanța dintre numerele -2 și 5.",
        rezolvareScurta: [
          "Folosim formula |a - b|.",
          "|-2 - 5| = |-7|.",
          "|-7| = 7.",
        ],
        raspuns:
          "7",
      },

      verificareRapida: {
        intrebare:
          "Care este distanța dintre -4 și -1?",
        variante: [
          "-3",
          "3",
          "5",
          "-5",
        ],
        raspunsCorect: 1,
        explicatie:
          "|-4 - (-1)| = |-3| = 3.",
      },
    },
  ],

  definitii: [
    {
      termen:
        "Modulul unui număr real",
      definitie:
        "Modulul numărului real x, notat |x|, reprezintă distanța dintre punctul asociat lui x și originea 0 pe axa numerelor reale.",
      observatie:
        "Modulul este întotdeauna un număr nenegativ.",
    },
    {
      termen:
        "Distanța dintre două numere reale",
      definitie:
        "Distanța dintre numerele reale a și b este |a - b|.",
      observatie:
        "Avem |a - b| = |b - a|.",
    },
  ],

  teorie: [
    {
      id: "modul-teorie-1",
      titlu:
        "Interpretarea geometrică",
      explicatie:
        "Modulul unui număr real reprezintă distanța acelui număr față de zero pe axa numerelor reale. De aceea modulul nu poate avea valoare negativă.",
      ideiCheie: [
        "|x| ≥ 0",
        "|0| = 0",
        "Numerele opuse au același modul.",
      ],
    },
    {
      id: "modul-teorie-2",
      titlu:
        "Definiția în funcție de semn",
      explicatie:
        "Pentru un număr real nenegativ, modulul păstrează valoarea numărului. Pentru un număr negativ, modulul este opusul acelui număr.",
      ideiCheie: [
        "x ≥ 0 ⇒ |x| = x",
        "x < 0 ⇒ |x| = -x",
        "Rezultatul este nenegativ.",
      ],
    },
    {
      id: "modul-teorie-3",
      titlu:
        "Ecuații de forma |x| = a",
      explicatie:
        "Numărul soluțiilor depinde de semnul lui a. Pentru a pozitiv există două numere aflate la aceeași distanță de zero, pentru a egal cu zero există o singură soluție, iar pentru a negativ nu există soluții reale.",
      ideiCheie: [
        "a > 0 ⇒ x = ±a",
        "a = 0 ⇒ x = 0",
        "a < 0 ⇒ fără soluții reale",
      ],
    },
    {
      id: "modul-teorie-4",
      titlu:
        "Distanța dintre două numere",
      explicatie:
        "Diferența dintre două numere poate fi pozitivă sau negativă, dar distanța dintre ele trebuie să fie nenegativă. De aceea folosim modulul diferenței.",
      ideiCheie: [
        "d(a,b) = |a - b|",
        "|a - b| = |b - a|",
        "Distanța este nenegativă.",
      ],
    },
  ],

  formule: [
    {
      id: "modul-formula-1",
      nume:
        "Definiția modulului",
      formula:
        "|x| = x, dacă x ≥ 0; |x| = -x, dacă x < 0",
      explicatie:
        "Formula exprimă modulul în funcție de semnul numărului real x.",
      conditii: [
        "x ∈ R",
      ],
      exempluScurt:
        "|-7| = -(-7) = 7",
    },
    {
      id: "modul-formula-2",
      nume:
        "Ecuația elementară cu modul",
      formula:
        "|x| = a",
      explicatie:
        "Pentru a > 0 există două soluții, pentru a = 0 există o soluție, iar pentru a < 0 nu există soluții reale.",
      conditii: [
        "x ∈ R",
        "a ∈ R",
      ],
      exempluScurt:
        "|x| = 4 ⇒ x = -4 sau x = 4",
    },
    {
      id: "modul-formula-3",
      nume:
        "Distanța dintre două numere reale",
      formula:
        "d(a,b) = |a - b|",
      explicatie:
        "Modulul diferenței dintre două numere reale reprezintă distanța dintre punctele lor pe axa numerelor reale.",
      conditii: [
        "a, b ∈ R",
      ],
      exempluScurt:
        "d(-2,5) = |-2 - 5| = 7",
    },
  ],

  exempleRezolvate: [
    {
      id: "modul-exemplu-1",
      titlu:
        "Calcul direct",
      enunt:
        "Calculați |-12|.",
      nivel:
        "fundament",
      pasi: [
        {
          numar: 1,
          titlu:
            "Observăm semnul",
          continut:
            "-12 este un număr negativ.",
        },
        {
          numar: 2,
          titlu:
            "Aplicăm definiția",
          continut:
            "|-12| = -(-12) = 12.",
        },
      ],
      raspunsFinal:
        "12",
      verificare:
        "12 reprezintă distanța dintre -12 și 0.",
    },
    {
      id: "modul-exemplu-2",
      titlu:
        "Expresie în interiorul modulului",
      enunt:
        "Calculați |4 - 11|.",
      nivel:
        "fundament",
      pasi: [
        {
          numar: 1,
          titlu:
            "Calculăm diferența",
          continut:
            "4 - 11 = -7.",
        },
        {
          numar: 2,
          titlu:
            "Calculăm modulul",
          continut:
            "|-7| = 7.",
        },
      ],
      raspunsFinal:
        "7",
      verificare:
        "Rezultatul este nenegativ.",
    },
    {
      id: "modul-exemplu-3",
      titlu:
        "Ecuație cu modul",
      enunt:
        "Rezolvați în R ecuația |x| = 9.",
      nivel:
        "standard-bac",
      pasi: [
        {
          numar: 1,
          titlu:
            "Analizăm membrul drept",
          continut:
            "9 este pozitiv.",
        },
        {
          numar: 2,
          titlu:
            "Determinăm soluțiile",
          continut:
            "Numerele aflate la distanța 9 de zero sunt -9 și 9.",
        },
        {
          numar: 3,
          titlu:
            "Verificăm",
          continut:
            "|-9| = 9 și |9| = 9.",
        },
      ],
      raspunsFinal:
        "x ∈ {-9, 9}",
      verificare:
        "Ambele soluții verifică ecuația.",
    },
    {
      id: "modul-exemplu-4",
      titlu:
        "Distanța dintre două numere",
      enunt:
        "Calculați distanța dintre -3 și 5.",
      nivel:
        "standard-bac",
      pasi: [
        {
          numar: 1,
          titlu:
            "Aplicăm formula",
          continut:
            "d(-3,5) = |-3 - 5|.",
        },
        {
          numar: 2,
          titlu:
            "Calculăm diferența",
          continut:
            "-3 - 5 = -8.",
        },
        {
          numar: 3,
          titlu:
            "Calculăm modulul",
          continut:
            "|-8| = 8.",
        },
      ],
      raspunsFinal:
        "8",
      verificare:
        "Distanța dintre -3 și 5 pe axa numerelor reale este 8 unități.",
    },
  ],

  greseliFrecvente: [
    {
      greseala:
        "Se scrie |-5| = -5.",
      deCeEsteGresit:
        "Modulul reprezintă o distanță și nu poate fi negativ.",
      cumOEviti:
        "Verifică mereu dacă rezultatul final al modulului este nenegativ.",
    },
    {
      greseala:
        "Pentru |x| = 4 se păstrează doar soluția x = 4.",
      deCeEsteGresit:
        "Atât 4, cât și -4 sunt la distanța 4 față de zero.",
      cumOEviti:
        "Pentru |x| = a cu a > 0, scrie întotdeauna cele două posibilități x = a și x = -a.",
    },
    {
      greseala:
        "Se încearcă rezolvarea ecuației |x| = -2 ca și cum ar avea soluții reale.",
      deCeEsteGresit:
        "Modulul unui număr real nu poate fi negativ.",
      cumOEviti:
        "Analizează mai întâi semnul membrului drept.",
    },
    {
      greseala:
        "Se confundă |a - b| cu a - b.",
      deCeEsteGresit:
        "Diferența poate fi negativă, în timp ce distanța trebuie să fie nenegativă.",
      cumOEviti:
        "Pentru distanță păstrează modulul până după calcularea diferenței.",
    },
  ],

  exercitii: [
    {
      id: "modul-exercitiu-1",
      nivel:
        "fundament",
      tip:
        "alegere-multipla",
      enunt:
        "Cât este |-8|?",
      variante: [
        "-8",
        "8",
        "0",
        "16",
      ],
      raspunsCorect:
        "8",
      rezolvare: [
        {
          numar: 1,
          titlu:
            "Interpretăm modulul",
          continut:
            "Modulul reprezintă distanța față de zero.",
        },
        {
          numar: 2,
          titlu:
            "Calculăm",
          continut:
            "Distanța dintre -8 și 0 este 8.",
        },
      ],
      explicatieFinala:
        "|-8| = 8.",
      punctaj: 5,
      competenta:
        "Calculul modulului unui număr real",
    },
    {
      id: "modul-exercitiu-2",
      nivel:
        "fundament",
      tip:
        "alegere-multipla",
      enunt:
        "Cât este |0|?",
      variante: [
        "-1",
        "0",
        "1",
        "Nu există",
      ],
      raspunsCorect:
        "0",
      rezolvare: [
        {
          numar: 1,
          titlu:
            "Folosim definiția",
          continut:
            "Zero se află la distanța zero față de zero.",
        },
      ],
      explicatieFinala:
        "|0| = 0.",
      punctaj: 5,
      competenta:
        "Calculul modulului unui număr real",
    },
    {
      id: "modul-exercitiu-3",
      nivel:
        "fundament",
      tip:
        "raspuns-scurt",
      enunt:
        "Calculați |3 - 10|.",
      raspunsCorect:
        "7",
      rezolvare: [
        {
          numar: 1,
          titlu:
            "Calculăm expresia",
          continut:
            "3 - 10 = -7.",
        },
        {
          numar: 2,
          titlu:
            "Calculăm modulul",
          continut:
            "|-7| = 7.",
        },
      ],
      explicatieFinala:
        "Rezultatul este 7.",
      punctaj: 5,
      competenta:
        "Calcul cu expresii aflate în modul",
    },
    {
      id: "modul-exercitiu-4",
      nivel:
        "standard-bac",
      tip:
        "rezolvare-completa",
      enunt:
        "Rezolvați în R ecuația |x| = 5.",
      raspunsCorect:
        "x ∈ {-5, 5}",
      rezolvare: [
        {
          numar: 1,
          titlu:
            "Analizăm valoarea din dreapta",
          continut:
            "5 este pozitiv.",
        },
        {
          numar: 2,
          titlu:
            "Scriem cele două soluții",
          continut:
            "x = 5 sau x = -5.",
        },
        {
          numar: 3,
          titlu:
            "Verificăm",
          continut:
            "|5| = 5 și |-5| = 5.",
        },
      ],
      explicatieFinala:
        "Ecuația are două soluții reale.",
      punctaj: 10,
      competenta:
        "Rezolvarea ecuațiilor elementare cu modul",
    },
    {
      id: "modul-exercitiu-5",
      nivel:
        "standard-bac",
      tip:
        "alegere-multipla",
      enunt:
        "Ecuația |x| = -4 are:",
      variante: [
        "două soluții reale",
        "o soluție reală",
        "nicio soluție reală",
        "infinit de multe soluții",
      ],
      raspunsCorect:
        "nicio soluție reală",
      rezolvare: [
        {
          numar: 1,
          titlu:
            "Folosim proprietatea modulului",
          continut:
            "|x| ≥ 0 pentru orice x real.",
        },
        {
          numar: 2,
          titlu:
            "Comparăm",
          continut:
            "-4 este negativ.",
        },
      ],
      explicatieFinala:
        "Un modul nu poate avea valoare negativă.",
      punctaj: 5,
      competenta:
        "Analiza existenței soluțiilor unei ecuații cu modul",
    },
    {
      id: "modul-exercitiu-6",
      nivel:
        "standard-bac",
      tip:
        "raspuns-scurt",
      enunt:
        "Calculați distanța dintre -2 și 5.",
      raspunsCorect:
        "7",
      rezolvare: [
        {
          numar: 1,
          titlu:
            "Aplicăm formula",
          continut:
            "d(-2,5) = |-2 - 5|.",
        },
        {
          numar: 2,
          titlu:
            "Calculăm",
          continut:
            "|-7| = 7.",
        },
      ],
      explicatieFinala:
        "Distanța este 7.",
      punctaj: 5,
      competenta:
        "Calculul distanței dintre două numere reale",
    },
    {
      id: "modul-exercitiu-7",
      nivel:
        "standard-bac",
      tip:
        "raspuns-scurt",
      enunt:
        "Calculați distanța dintre -4 și -1.",
      raspunsCorect:
        "3",
      rezolvare: [
        {
          numar: 1,
          titlu:
            "Aplicăm formula",
          continut:
            "d(-4,-1) = |-4 - (-1)|.",
        },
        {
          numar: 2,
          titlu:
            "Calculăm diferența",
          continut:
            "-4 - (-1) = -3.",
        },
        {
          numar: 3,
          titlu:
            "Calculăm modulul",
          continut:
            "|-3| = 3.",
        },
      ],
      explicatieFinala:
        "Distanța dintre cele două numere este 3.",
      punctaj: 5,
      competenta:
        "Calculul distanței dintre două numere reale",
    },
    {
      id: "modul-exercitiu-8",
      nivel:
        "standard-bac",
      tip:
        "rezolvare-completa",
      enunt:
        "Rezolvați în R ecuația |x| = 0.",
      raspunsCorect:
        "x = 0",
      rezolvare: [
        {
          numar: 1,
          titlu:
            "Interpretăm modulul",
          continut:
            "|x| reprezintă distanța dintre x și zero.",
        },
        {
          numar: 2,
          titlu:
            "Determinăm numărul",
          continut:
            "Singurul număr aflat la distanța zero față de zero este 0.",
        },
      ],
      explicatieFinala:
        "Ecuația are soluția unică x = 0.",
      punctaj: 10,
      competenta:
        "Rezolvarea ecuațiilor elementare cu modul",
    },
  ],

  rezumat: {
    ideiDeRetinut: [
      "Modulul unui număr real este distanța lui față de zero.",
      "|x| ≥ 0 pentru orice x real.",
      "Dacă x ≥ 0, atunci |x| = x.",
      "Dacă x < 0, atunci |x| = -x.",
      "|x| = a are două, una sau zero soluții în funcție de semnul lui a.",
      "Distanța dintre a și b este |a - b|.",
    ],

    formuleDeRetinut: [
      "|x| = x, dacă x ≥ 0",
      "|x| = -x, dacă x < 0",
      "d(a,b) = |a - b|",
    ],

    checklistElev: [
      "Pot explica modulul ca distanță.",
      "Pot calcula modulul unui număr pozitiv, negativ sau zero.",
      "Pot aplica definiția în funcție de semnul lui x.",
      "Pot rezolva ecuații simple de forma |x| = a.",
      "Pot calcula distanța dintre două numere reale.",
    ],
  },

  legaturaCuBac: {
    importanta:
      "Modulul este o noțiune de bază folosită în calcule algebrice, ecuații și interpretări de distanță pe axa numerelor reale.",

    tipuriCerinte: [
      "Calcularea modulului unei expresii numerice.",
      "Rezolvarea unei ecuații elementare cu modul.",
      "Calcularea distanței dintre două numere reale.",
    ],

    strategie: [
      "Calculează mai întâi expresia din interiorul modulului.",
      "Verifică faptul că rezultatul modulului este nenegativ.",
      "La ecuația |x| = a analizează mai întâi semnul lui a.",
      "Pentru distanță folosește |a - b|.",
    ],
  },

  surse: [
    {
      tip:
        "verificare-interna",
      titlu:
        "BAC MATE — lecția legacy «Modulul unui număr real»",
      observatie:
        "Sursa internă existentă a fost folosită pentru conceptele, formulele și exemplele de bază ale draftului Content Engine.",
    },
  ],

  verificare: {
    status:
      "draft",

    verificatMatematic:
      false,

    verificatPrograma:
      false,

    verificatExercitii:
      false,

    verificatLimbaRomana:
      false,

    observatii: [
      "Draft Content Engine V1.",
      "Conținutul pornește din lecția legacy existentă.",
      "Nu este aprobat automat pentru publicare.",
      "Necesită validator structural și verificări separate înainte de schimbarea statusului.",
    ],
  },
};