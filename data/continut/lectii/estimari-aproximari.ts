import type {
  ContinutLectie,
} from "../tipuri";

export const continutEstimariAproximari: ContinutLectie = {
  id: "estimari-aproximari",

  slug: "estimari-aproximari",

  modul: 1,

  numarLectie: 2,

  clasa: "IX",

  profil: "M_mate-info",

  titlu: "Estimări și aproximări",

  subtitlu:
    "Cum înlocuiești un număr cu o valoare apropiată și cum controlezi eroarea făcută",

  descriere:
    "În această lecție înveți să deosebești estimarea de aproximare, să construiești aproximări prin lipsă și prin adaos, să rotunjești corect numere reale și să verifici dacă o valoare aproximativă este potrivită pentru problema dată.",

  nivelPrincipal: "fundament",

  durataEstimataMinute: 45,

  prerechizite: [
    "Compararea și ordonarea numerelor reale",
    "Scrierea zecimală a numerelor reale",
    "Poziția cifrelor într-un număr zecimal",
    "Operații elementare cu numere reale",
  ],

  obiective: [
    "Să explici diferența dintre o estimare și o aproximare.",
    "Să determini aproximarea prin lipsă a unui număr real la unități, zecimi sau sutimi.",
    "Să determini aproximarea prin adaos a unui număr real la unități, zecimi sau sutimi.",
    "Să rotunjești corect un număr real la ordinul cerut.",
    "Să compari o valoare exactă cu o valoare aproximativă.",
    "Să folosești estimarea pentru verificarea rapidă a plauzibilității unui rezultat.",
    "Să eviți erorile frecvente produse de numerele negative și de confundarea rotunjirii cu aproximarea prin lipsă sau adaos.",
  ],

  termeniCheie: [
    "valoare exactă",
    "valoare aproximativă",
    "estimare",
    "aproximare",
    "aproximare prin lipsă",
    "aproximare prin adaos",
    "rotunjire",
    "ordin de aproximare",
    "unitate",
    "zecime",
    "sutime",
    "eroare absolută",
  ],

  videoLectii: [
    {
      id: "estimari-aproximari-video-1",

      numar: 1,

      titlu:
        "De ce avem nevoie de estimări și aproximări?",

      durataMinute: 4,

      descriere:
        "Construim intuitiv ideea de estimare și de aproximare și vedem de ce nu folosim întotdeauna valoarea exactă.",

      scenariu: [
        `Imaginează-ți că intri într-un magazin cu 100 de lei și vrei să cumperi trei produse care costă 29,80 lei, 18,40 lei și 47,30 lei. Ai putea face imediat calculul exact. Dar înainte de asta poți observa că prețurile sunt aproximativ 30, 18 și 47 de lei. Suma este undeva în jur de 95 de lei. Dintr-o privire îți dai seama că banii ar trebui să ajungă. Acesta este rolul unei estimări: obții rapid o valoare apropiată de rezultatul real, suficient de bună pentru scopul problemei.`,

        `Estimarea nu înseamnă că ai calculat greșit și nici că alegi un număr la întâmplare. O estimare trebuie să fie justificată. Alegem valori mai simple, dar apropiate de cele reale, pentru a putea evalua rapid ordinul de mărime al unui rezultat. Dacă ți-ar ieși în exemplul nostru 950 de lei, estimarea de aproximativ 95 de lei ți-ar arăta imediat că ai făcut o eroare de calcul.`,

        `Aproximarea este o idee foarte apropiată, dar de obicei este mai precisă. Pornim de la un număr și îl înlocuim cu un alt număr apropiat, în funcție de precizia cerută. De exemplu, numărul 3,14159 poate fi aproximat la sutimi prin 3,14. Nu mai păstrăm toate cifrele, dar păstrăm suficientă informație pentru situația în care lucrăm.`,

        `Este important să deosebim valoarea exactă de valoarea aproximativă. Dacă lungimea unui segment este exact radical din 2, atunci radical din 2 este valoarea exactă. Numărul 1,41 este doar o aproximare la sutimi. Nu trebuie să scriem radical din 2 egal cu 1,41, deoarece ele nu sunt egale. Putem scrie radical din 2 aproximativ egal cu 1,41.`,

        `În matematică folosim simbolul aproximativ egal atunci când două valori sunt apropiate, dar nu identice. În scriere simplă îl putem citi „aproximativ egal cu”. Ideea principală este să nu transformăm o aproximație într-o egalitate falsă.`,

        `Precizia depinde de problemă. Dacă spui că distanța dintre două orașe este aproximativ 80 de kilometri, precizia la kilometru poate fi suficientă. Dacă măsori o piesă tehnică, o diferență de câteva sutimi poate conta. Așadar, nu există o singură aproximare potrivită în orice situație. Trebuie să știm ordinul la care aproximăm: unități, zecimi, sutimi, miimi și așa mai departe.`,

        `Reține pentru început trei idei. Estimarea ne ajută să anticipăm și să verificăm un rezultat. Aproximarea înlocuiește o valoare cu una apropiată, la o precizie stabilită. Iar valoarea aproximativă nu trebuie confundată cu valoarea exactă. În următorul video vedem cele trei procedee pe care trebuie să le stăpânești: aproximarea prin lipsă, aproximarea prin adaos și rotunjirea.`,
      ],

      ideiDeRetinut: [
        "O estimare oferă rapid ordinul de mărime al unui rezultat.",
        "O aproximare înlocuiește o valoare cu una apropiată, la o precizie cerută.",
        "Valoarea aproximativă nu este, în general, egală cu valoarea exactă.",
        "Precizia trebuie adaptată situației.",
      ],

      exemplu: {
        titlu:
          "Estimarea unei sume",

        enunt:
          "Estimează suma 49,7 + 20,3 + 31,2 înainte de calculul exact.",

        rezolvareScurta: [
          "Înlocuim valorile cu numere apropiate și ușor de calculat.",
          "49,7 ≈ 50, 20,3 ≈ 20, 31,2 ≈ 31.",
          "Estimarea sumei este 50 + 20 + 31 = 101.",
          "Calculul exact este 101,2, deci estimarea este foarte apropiată.",
        ],

        raspuns:
          "Suma este estimată la aproximativ 101.",
      },

      verificareRapida: {
        intrebare:
          "Care afirmație este corectă?",

        variante: [
          "O estimare trebuie să fie întotdeauna identică rezultatului exact.",
          "O aproximare este o valoare apropiată de valoarea exactă.",
          "Aproximarea se poate face doar la unități.",
          "Estimarea înseamnă alegerea unui număr la întâmplare.",
        ],

        raspunsCorect: 1,

        explicatie:
          "O aproximare nu este în general egală cu valoarea exactă, ci este aleasă suficient de aproape de aceasta pentru precizia cerută.",
      },
    },

    {
      id: "estimari-aproximari-video-2",

      numar: 2,

      titlu:
        "Prin lipsă, prin adaos și prin rotunjire",

      durataMinute: 5,

      descriere:
        "Învățăm algoritmul pentru cele trei tipuri uzuale de aproximare și tratăm corect inclusiv numerele negative.",

      scenariu: [
        `Luăm numărul 7,386 și vrem să lucrăm la sutimi. Asta înseamnă că valorile noastre aproximative vor avea două cifre după virgulă. Două numere consecutive de acest tip între care se află 7,386 sunt 7,38 și 7,39. Avem deci inegalitatea 7,38 mai mic decât 7,386, iar 7,386 mai mic decât 7,39.`,

        `Aproximarea prin lipsă este cea mai mare valoare de precizia cerută care este mai mică sau egală cu numărul. În exemplul nostru, aproximarea prin lipsă la sutimi este 7,38. Aproximarea prin adaos este cea mai mică valoare de precizia cerută care este mai mare sau egală cu numărul. Aici este 7,39.`,

        `Putem exprima aceeași idee la zecimi. Numărul 7,386 se află între 7,3 și 7,4. Așadar, la zecimi, aproximarea prin lipsă este 7,3, iar aproximarea prin adaos este 7,4. La unități, numărul este între 7 și 8. Prin lipsă obținem 7, iar prin adaos obținem 8.`,

        `Acum discutăm rotunjirea. La rotunjire alegem dintre valorile apropiate pe cea corespunzătoare regulii cifrei următoare. Dacă vrem să rotunjim 7,386 la sutimi, păstrăm 7,38 și privim cifra miimilor, care este 6. Pentru că este cel puțin 5, mărim cifra sutimilor cu o unitate. Rezultatul este 7,39.`,

        `Dacă rotunjim 7,382 la sutimi, cifra miimilor este 2. Pentru că este mai mică decât 5, păstrăm cifra sutimilor. Obținem 7,38. În problemele școlare aceasta este regula practică pe care o vei folosi cel mai des: privim prima cifră eliminată. Dacă este 0, 1, 2, 3 sau 4, păstrăm ultima cifră reținută. Dacă este 5, 6, 7, 8 sau 9, o mărim cu o unitate.`,

        `Aici apare o diferență esențială. Aproximarea prin lipsă, aproximarea prin adaos și rotunjirea nu sunt același lucru. Pentru 7,382 la sutimi, prin lipsă avem 7,38, prin adaos avem 7,39, iar rotunjirea este 7,38. Pentru 7,386, prin lipsă rămâne 7,38, prin adaos este 7,39, dar rotunjirea devine 7,39.`,

        `Trebuie să fim atenți la numere negative. Luăm minus 2,73 și aproximăm la zecimi. Pe axa numerelor avem minus 2,8 mai mic decât minus 2,73, care este mai mic decât minus 2,7. Prin lipsă trebuie să alegem valoarea mai mică, deci minus 2,8. Prin adaos alegem valoarea mai mare, deci minus 2,7. Este o greșeală foarte frecventă să ștergi pur și simplu cifrele și să spui că minus 2,7 este aproximarea prin lipsă. Nu este: minus 2,7 este mai mare decât minus 2,73.`,

        `Cel mai sigur procedeu, mai ales pentru numere negative, este să scrii întâi încadrarea dintre două valori consecutive de precizia cerută. După aceea, valoarea din stânga este aproximarea prin lipsă, iar valoarea din dreapta este aproximarea prin adaos. În acest fel nu depinzi de memorarea unei reguli mecanice care poate fi aplicată greșit.`,
      ],

      ideiDeRetinut: [
        "Prin lipsă alegem cea mai mare valoare de precizia cerută care este mai mică sau egală cu numărul.",
        "Prin adaos alegem cea mai mică valoare de precizia cerută care este mai mare sau egală cu numărul.",
        "Rotunjirea folosește prima cifră eliminată pentru a decide valoarea păstrată.",
        "La numere negative este mai sigur să construiești mai întâi încadrarea.",
      ],

      exemplu: {
        titlu:
          "Trei aproximări ale aceluiași număr",

        enunt:
          "Pentru x = 12,746, determină aproximarea prin lipsă, prin adaos și rotunjirea la sutimi.",

        rezolvareScurta: [
          "La sutimi, 12,74 < 12,746 < 12,75.",
          "Prin lipsă: 12,74.",
          "Prin adaos: 12,75.",
          "La rotunjire, cifra miimilor este 6, deci rotunjim la 12,75.",
        ],

        raspuns:
          "Prin lipsă: 12,74; prin adaos: 12,75; rotunjit: 12,75.",
      },

      verificareRapida: {
        intrebare:
          "Care este aproximarea prin lipsă la zecimi a numărului -3,24?",

        variante: [
          "-3,2",
          "-3,3",
          "-3",
          "-4",
        ],

        raspunsCorect: 1,

        explicatie:
          "Avem -3,3 < -3,24 < -3,2. Valoarea prin lipsă trebuie să fie mai mică decât numărul, deci -3,3.",
      },
    },

    {
      id: "estimari-aproximari-video-3",

      numar: 3,

      titlu:
        "Exemplu complet: aproximarea unui rezultat",

      durataMinute: 5,

      descriere:
        "Rezolvăm complet un exemplu în care estimăm, calculăm, aproximăm și verificăm eroarea.",

      scenariu: [
        `Rezolvăm acum un exemplu complet. Considerăm expresia A egal cu 17,83 înmulțit cu 4,12. Vrem mai întâi o estimare, apoi valoarea exactă a produsului, iar la final o aproximare la unități și una la sutimi. Ideea este să folosim estimarea înainte de calcul, nu după, pentru ca ea să funcționeze ca instrument de control.`,

        `Pentru estimare putem înlocui 17,83 cu 18 și 4,12 cu 4. Atunci produsul estimat este 18 ori 4, adică 72. Nu susținem că rezultatul exact este 72. Spunem doar că ar trebui să fie în apropierea acestei valori. Dacă în calculul exact ne-ar ieși 7,2 sau 720, am ști imediat că trebuie să verificăm operația.`,

        `Calculăm acum produsul. 17,83 ori 4,12 este egal cu 73,4596. Rezultatul este într-adevăr apropiat de estimarea 72. Prima verificare de plauzibilitate a trecut.`,

        `Vrem aproximarea prin lipsă și prin adaos la unități. Numărul 73,4596 se află între 73 și 74. Prin lipsă la unități obținem 73. Prin adaos la unități obținem 74. Pentru rotunjire la unități privim cifra zecimilor, care este 4. Fiind mai mică decât 5, rotunjim la 73.`,

        `Trecem la sutimi. Numărul 73,4596 se află între 73,45 și 73,46. Prin lipsă la sutimi avem 73,45, iar prin adaos la sutimi avem 73,46. Pentru rotunjire păstrăm până la cifra sutimilor, adică până la 5, și privim cifra miimilor, care este 9. Fiind cel puțin 5, mărim sutimea cu o unitate. Obținem 73,46.`,

        `Putem măsura cât de mult ne-am îndepărtat de valoarea exactă. Dacă folosim aproximarea 73,46, diferența în valoare absolută este modul din 73,4596 minus 73,46. Obținem 0,0004. Aceasta este eroarea absolută a aproximației respective. Cu cât eroarea absolută este mai mică, cu atât aproximația este mai apropiată de valoarea exactă.`,

        `Observă că precizia și eroarea sunt legate, dar nu sunt același lucru. Spunem că rotunjim la sutimi pentru a descrie ordinul la care păstrăm cifrele. Apoi putem calcula eroarea concretă produsă în cazul respectiv. Pentru 73,4596 aproximat cu 73,46, eroarea este doar 0,0004.`,

        `Într-o problemă de Bac nu este suficient să scrii numai răspunsul dacă cerința solicită justificare. O redactare bună arată încadrarea și apoi concluzia. De exemplu: 73,45 mai mic decât 73,4596 mai mic decât 73,46, deci aproximarea prin lipsă la sutimi este 73,45, iar aproximarea prin adaos este 73,46.`,

        `Metoda completă este deci aceasta: întâi estimezi ordinul rezultatului, apoi faci calculul exact atunci când este posibil, stabilești precizia cerută, construiești valorile vecine de acel ordin și abia apoi alegi prin lipsă, prin adaos sau prin rotunjire. La final verifici dacă răspunsul este compatibil cu estimarea inițială.`,

        `Mai există un caz simplu, dar important. Dacă valoarea exactă are deja precizia cerută, nu este nevoie să o modificăm. De exemplu, la sutimi, numărul 7,25 are atât aproximarea prin lipsă, cât și aproximarea prin adaos egale cu 7,25.`,
      ],

      ideiDeRetinut: [
        "Estimarea făcută înainte de calcul este un instrument bun de verificare.",
        "Pentru aproximarea prin lipsă și adaos este utilă încadrarea între două valori consecutive.",
        "Dacă numărul are deja precizia cerută, aproximarea prin lipsă și cea prin adaos coincid cu numărul.",
        "Eroarea absolută este distanța dintre valoarea exactă și aproximația folosită.",
        "Redactarea trebuie să arate clar precizia și procedeul folosit.",
      ],

      exemplu: {
        titlu:
          "Produs estimat și apoi aproximat",

        enunt:
          "Pentru A = 17,83 · 4,12, estimează rezultatul și rotunjește valoarea exactă la sutimi.",

        rezolvareScurta: [
          "Estimare: 18 · 4 = 72.",
          "Calcul exact: A = 73,4596.",
          "La sutimi păstrăm 73,45 și privim cifra miimilor, 9.",
          "Rotunjirea este 73,46.",
          "Rezultatul 73,46 este compatibil cu estimarea inițială de aproximativ 72.",
        ],

        raspuns:
          "A = 73,4596, iar rotunjit la sutimi A ≈ 73,46.",
      },

      verificareRapida: {
        intrebare:
          "Dacă x = 8,274 și îl aproximăm cu 8,27, care este eroarea absolută?",

        variante: [
          "0,004",
          "0,04",
          "0,4",
          "0,006",
        ],

        raspunsCorect: 0,

        explicatie:
          "|8,274 - 8,27| = |0,004| = 0,004.",
      },
    },

    {
      id: "estimari-aproximari-video-4",

      numar: 4,

      titlu:
        "Tip Bac: strategie și greșeli frecvente",

      durataMinute: 5,

      descriere:
        "Consolidăm metoda de lucru și eliminăm greșelile care apar cel mai des în exercițiile cu aproximații.",

      scenariu: [
        `În exercițiile de Bac, aproximările pot apărea direct sau pot fi folosite în interiorul altor capitole. Poți avea de comparat numere reale, de interpretat un rezultat numeric, de citit informații dintr-un grafic sau pur și simplu de verificat dacă rezultatul unui calcul este rezonabil. De aceea această lecție nu trebuie tratată ca o listă de reguli izolate.`,

        `Prima întrebare pe care trebuie să ți-o pui este: ce cere exact enunțul? Aproximare prin lipsă, aproximare prin adaos sau rotunjire? Aceste cuvinte nu sunt sinonime. Dacă enunțul cere prin lipsă, nu ai voie să alegi automat valoarea obținută prin rotunjire. Trebuie să alegi valoarea de precizia cerută care nu depășește numărul.`,

        `A doua întrebare este: la ce ordin lucrăm? La unități, la zecimi, la sutimi sau la alt ordin? De exemplu, pentru 5,678, aproximarea prin lipsă la zecimi este 5,6, dar la sutimi este 5,67. Fără precizie, un răspuns de forma „aproximarea este 5,7” nu spune suficient despre procedeul folosit.`,

        `A treia verificare este semnul numărului. Pentru numere pozitive, ștergerea cifrelor poate părea că funcționează pentru aproximarea prin lipsă. Pentru numere negative această scurtătură devine periculoasă. De exemplu, la zecimi, minus 4,26 este între minus 4,3 și minus 4,2. Prin lipsă avem minus 4,3, nu minus 4,2.`,

        `A patra greșeală este folosirea semnului egal între valoarea exactă și aproximație. Radical din 3 nu este egal cu 1,73. Putem spune radical din 3 aproximativ egal cu 1,73. Egalitatea afirmă identitate exactă, iar aici valorile sunt doar apropiate.`,

        `A cincea greșeală este rotunjirea prea devreme într-un calcul cu mai multe etape. Să presupunem că ai o expresie și trebuie să dai rezultatul final la sutimi. Dacă rotunjești fiecare rezultat intermediar la sutimi, erorile se pot acumula. Este mai sigur să păstrezi cât mai mult din valoarea exactă sau mai multe zecimale și să faci rotunjirea cerută la final.`,

        `Să rezolvăm un exercițiu scurt. Numărul x este egal cu minus 6,347. Cerem aproximarea prin lipsă și prin adaos la sutimi. Construim mai întâi încadrarea: minus 6,35 este mai mic decât minus 6,347, iar minus 6,347 este mai mic decât minus 6,34. Prin lipsă alegem minus 6,35. Prin adaos alegem minus 6,34. Pentru rotunjire, cifra miimilor este 7, deci valoarea la sutimi devine minus 6,35.`,

        `Pentru verificare poți folosi mereu axa numerelor în minte. „Prin lipsă” înseamnă că aproximația se află în stânga sau chiar pe numărul exact. „Prin adaos” înseamnă că se află în dreapta sau chiar pe numărul exact. Această interpretare funcționează atât pentru numere pozitive, cât și pentru numere negative.`,

        `Strategia finală este simplă. Citește procedeul cerut. Identifică ordinul. Construiește cele două valori vecine. Verifică semnul numărului. Alege prin lipsă sau prin adaos ori aplică regula de rotunjire. La final, întreabă-te dacă rezultatul are sens și dacă ai folosit corect semnul aproximativ atunci când valoarea nu este exactă.`,

        `Dacă stăpânești acești pași, exercițiile cu estimări și aproximări devin exerciții de logică și atenție, nu de memorare. Iar beneficiul este mai mare decât această lecție: aceeași abilitate te ajută să verifici rezultate în algebră, funcții, geometrie analitică, probabilități și analiză matematică.`,
      ],

      ideiDeRetinut: [
        "Citește exact dacă se cere lipsă, adaos sau rotunjire.",
        "Identifică întotdeauna ordinul de aproximare.",
        "Pentru numere negative folosește încadrarea, nu o scurtătură mecanică.",
        "Nu rotunji inutil rezultatele intermediare.",
        "Folosește estimarea pentru controlul plauzibilității.",
      ],

      exemplu: {
        titlu:
          "Aproximarea unui număr negativ",

        enunt:
          "Fie x = -6,347. Determină aproximările prin lipsă și prin adaos la sutimi și rotunjirea la sutimi.",

        rezolvareScurta: [
          "-6,35 < -6,347 < -6,34.",
          "Prin lipsă: -6,35.",
          "Prin adaos: -6,34.",
          "Cifra miimilor este 7, deci prin rotunjire obținem -6,35.",
        ],

        raspuns:
          "Lipsă: -6,35; adaos: -6,34; rotunjire: -6,35.",
      },

      verificareRapida: {
        intrebare:
          "Ce trebuie făcut, de regulă, dacă rezultatul final este cerut la sutimi?",

        variante: [
          "Rotunjim fiecare număr la sutimi înainte de orice calcul.",
          "Păstrăm precizia în calculele intermediare și rotunjim rezultatul final la sutimi.",
          "Eliminăm toate zecimalele.",
          "Folosim întotdeauna aproximarea prin lipsă.",
        ],

        raspunsCorect: 1,

        explicatie:
          "Rotunjirea prea devreme poate acumula erori. Este mai sigur să păstrezi precizia și să rotunjești la ordinul cerut la final.",
      },
    },
  ],

  definitii: [
    {
      termen:
        "Estimare",

      definitie:
        "Determinarea rapidă a unei valori apropiate de un rezultat, suficient de precisă pentru scopul urmărit.",

      observatie:
        "Estimarea este utilă mai ales pentru anticiparea ordinului de mărime și pentru verificarea plauzibilității unui rezultat.",
    },

    {
      termen:
        "Aproximare",

      definitie:
        "Înlocuirea unei valori cu o altă valoare apropiată de aceasta, respectând o precizie stabilită.",

      observatie:
        "Valoarea aproximativă nu este, în general, egală cu valoarea exactă.",
    },

    {
      termen:
        "Aproximare prin lipsă",

      definitie:
        "La un ordin dat, aproximarea prin lipsă a unui număr real x este cea mai mare valoare de acel ordin care este mai mică sau egală cu x.",

      observatie:
        "Dacă numărul are deja exact precizia cerută, aproximarea prin lipsă este chiar numărul. Pentru numere negative trebuie respectată ordinea reală a numerelor pe axă.",
    },

    {
      termen:
        "Aproximare prin adaos",

      definitie:
        "La un ordin dat, aproximarea prin adaos a unui număr real x este cea mai mică valoare de acel ordin care este mai mare sau egală cu x.",

      observatie:
        "Dacă numărul are deja exact precizia cerută, aproximarea prin adaos este chiar numărul.",
    },

    {
      termen:
        "Rotunjire",

      definitie:
        "Procedeu de alegere a unei valori apropiate la ordinul cerut, folosind prima cifră care urmează după ultima cifră păstrată.",
    },

    {
      termen:
        "Ordin de aproximare",

      definitie:
        "Poziția până la care păstrăm cifrele unui număr atunci când îl aproximăm: unități, zecimi, sutimi, miimi etc.",
    },

    {
      termen:
        "Valoare exactă",

      definitie:
        "Valoarea matematică neînlocuită printr-o aproximație.",

      observatie:
        "De exemplu, √2 este o valoare exactă, în timp ce 1,41 este o aproximație a sa.",
    },

    {
      termen:
        "Eroare absolută",

      definitie:
        "Distanța dintre valoarea exactă x și valoarea aproximativă a, calculată prin |x - a|.",

      observatie:
        "Eroarea absolută este întotdeauna nenegativă.",
    },
  ],

  teorie: [
    {
      id: "estimari-aproximari-teorie-1",

      titlu:
        "Estimarea și controlul rezultatului",

      explicatie:
        "Estimarea simplifică valorile dintr-un calcul pentru a obține rapid ordinul de mărime al rezultatului. Ea este foarte utilă înaintea calculului exact, deoarece permite depistarea unor rezultate evident imposibile.",

      ideiCheie: [
        "Alege numere apropiate și ușor de calculat.",
        "Estimarea nu înlocuiește întotdeauna calculul exact.",
        "Compară rezultatul exact cu estimarea pentru a verifica plauzibilitatea.",
      ],
    },

    {
      id: "estimari-aproximari-teorie-2",

      titlu:
        "Aproximarea prin lipsă și prin adaos",

      explicatie:
        "Pentru un număr real x și un ordin stabilit, căutăm cea mai mare valoare de ordinul respectiv care este mai mică sau egală cu x și cea mai mică valoare de același ordin care este mai mare sau egală cu x. Prima este aproximarea prin lipsă, iar a doua este aproximarea prin adaos.",

      ideiCheie: [
        "Prin lipsă: valoarea nu depășește numărul.",
        "Prin adaos: valoarea nu este mai mică decât numărul.",
        "Dacă x are deja precizia cerută, cele două aproximări sunt egale cu x.",
        "Încadrarea funcționează fără ambiguități și pentru numere negative.",
      ],
    },

    {
      id: "estimari-aproximari-teorie-3",

      titlu:
        "Rotunjirea",

      explicatie:
        "Pentru rotunjire păstrăm cifrele până la ordinul cerut și analizăm prima cifră eliminată. Dacă aceasta este mai mică decât 5, ultima cifră păstrată rămâne neschimbată. Dacă este cel puțin 5, ultima cifră păstrată se mărește cu o unitate.",

      ideiCheie: [
        "Identifică mai întâi ordinul cerut.",
        "Privește prima cifră eliminată.",
        "0–4: păstrăm ultima cifră reținută.",
        "5–9: mărim ultima cifră reținută cu o unitate.",
      ],
    },

    {
      id: "estimari-aproximari-teorie-4",

      titlu:
        "Numere negative",

      explicatie:
        "La numere negative, apropierea de zero nu înseamnă aproximare prin lipsă. Trebuie folosită ordinea de pe axa numerelor. De exemplu, -2,8 < -2,73 < -2,7, deci la zecimi aproximarea prin lipsă este -2,8, iar cea prin adaos este -2,7.",

      ideiCheie: [
        "Compară numerele, nu doar cifrele lor.",
        "Scrie încadrarea înainte de a decide.",
        "Pe axă, prin lipsă este valoarea din stânga.",
        "Pe axă, prin adaos este valoarea din dreapta.",
      ],
    },

    {
      id: "estimari-aproximari-teorie-5",

      titlu:
        "Eroarea unei aproximări",

      explicatie:
        "O aproximație diferă de obicei de valoarea exactă. Diferența poate fi măsurată prin eroarea absolută |x-a|, unde x este valoarea exactă, iar a este aproximația utilizată.",

      ideiCheie: [
        "Eroarea absolută este nenegativă.",
        "O eroare absolută mai mică înseamnă o aproximație mai apropiată.",
        "Nu confunda ordinul de aproximare cu eroarea efectivă obținută.",
      ],
    },
  ],

  formule: [
    {
      id: "estimari-aproximari-formula-1",

      nume:
        "Încadrarea pentru aproximări",

      formula:
        "a ≤ x ≤ b",

      explicatie:
        "La precizia stabilită, a este cea mai mare valoare care satisface a ≤ x, iar b este cea mai mică valoare care satisface x ≤ b. Astfel, a este aproximarea prin lipsă, iar b este aproximarea prin adaos.",

      conditii: [
        "a și b trebuie să aibă precizia cerută.",
        "a trebuie să fie mai mic sau egal cu x.",
        "b trebuie să fie mai mare sau egal cu x.",
        "Dacă x nu are deja exact precizia cerută, a și b sunt două valori consecutive de acel ordin.",
        "Dacă x are deja exact precizia cerută, atunci a = x = b.",
      ],

      exempluScurt:
        "Pentru x = 3,14159 la sutimi: 3,14 < x < 3,15, deci lipsă 3,14 și adaos 3,15. Pentru x = 3,20 la sutimi: lipsă = adaos = 3,20.",
    },

    {
      id: "estimari-aproximari-formula-2",

      nume:
        "Eroarea absolută",

      formula:
        "E_a = |x - a|",

      explicatie:
        "Eroarea absolută reprezintă distanța dintre valoarea exactă x și aproximația a.",

      conditii: [
        "x este valoarea exactă.",
        "a este valoarea aproximativă.",
      ],

      exempluScurt:
        "Pentru x = 5,238 și a = 5,24, eroarea este |5,238 - 5,24| = 0,002.",
    },

    {
      id: "estimari-aproximari-formula-3",

      nume:
        "Pasul dintre aproximări consecutive",

      formula:
        "10^(-n)",

      explicatie:
        "La n zecimale, două valori consecutive de acea precizie diferă cu 10 la puterea -n.",

      conditii: [
        "n este un număr natural.",
        "Pentru zecimi n = 1.",
        "Pentru sutimi n = 2.",
        "Pentru miimi n = 3.",
      ],

      exempluScurt:
        "La sutimi pasul este 10^(-2) = 0,01.",
    },
  ],

  exempleRezolvate: [
    {
      id: "estimari-aproximari-exemplu-1",

      titlu:
        "Aproximarea unui număr pozitiv",

      enunt:
        "Pentru x = 8,376, determină aproximarea prin lipsă și prin adaos la sutimi, apoi rotunjește x la sutimi.",

      nivel: "fundament",

      pasi: [
        {
          numar: 1,
          titlu:
            "Identificăm ordinul",

          continut:
            "Lucrăm la sutimi, deci folosim numere cu două cifre după virgulă.",
        },

        {
          numar: 2,
          titlu:
            "Construim încadrarea",

          continut:
            "Avem 8,37 < 8,376 < 8,38.",
        },

        {
          numar: 3,
          titlu:
            "Citim aproximările",

          continut:
            "Prin lipsă obținem 8,37, iar prin adaos 8,38.",
        },

        {
          numar: 4,
          titlu:
            "Rotunjim",

          continut:
            "Cifra miimilor este 6. Fiind cel puțin 5, rotunjim la 8,38.",
        },
      ],

      raspunsFinal:
        "Prin lipsă: 8,37; prin adaos: 8,38; rotunjit la sutimi: 8,38.",

      verificare:
        "Rezultatele respectă încadrarea 8,37 < 8,376 < 8,38.",
    },

    {
      id: "estimari-aproximari-exemplu-2",

      titlu:
        "Aproximarea unui număr negativ",

      enunt:
        "Pentru x = -5,274, determină aproximarea prin lipsă și prin adaos la zecimi.",

      nivel: "standard-bac",

      pasi: [
        {
          numar: 1,
          titlu:
            "Evităm trunchierea mecanică",

          continut:
            "Fiind un număr negativ, lucrăm folosind ordinea de pe axa numerelor.",
        },

        {
          numar: 2,
          titlu:
            "Construim încadrarea",

          continut:
            "Avem -5,3 < -5,274 < -5,2.",
        },

        {
          numar: 3,
          titlu:
            "Alegem prin lipsă",

          continut:
            "Valoarea mai mică este -5,3, deci aceasta este aproximarea prin lipsă la zecimi.",
        },

        {
          numar: 4,
          titlu:
            "Alegem prin adaos",

          continut:
            "Valoarea mai mare este -5,2, deci aceasta este aproximarea prin adaos la zecimi.",
        },
      ],

      raspunsFinal:
        "Prin lipsă: -5,3; prin adaos: -5,2.",

      verificare:
        "-5,3 este mai mic decât x, iar -5,2 este mai mare decât x.",
    },

    {
      id: "estimari-aproximari-exemplu-3",

      titlu:
        "Estimarea unui calcul",

      enunt:
        "Estimează valoarea expresiei 39,8 · 5,1 și compară estimarea cu rezultatul exact.",

      nivel: "standard-bac",

      pasi: [
        {
          numar: 1,
          titlu:
            "Alegem valori apropiate",

          continut:
            "39,8 este apropiat de 40, iar 5,1 este apropiat de 5.",
        },

        {
          numar: 2,
          titlu:
            "Calculăm estimarea",

          continut:
            "40 · 5 = 200.",
        },

        {
          numar: 3,
          titlu:
            "Calculăm exact",

          continut:
            "39,8 · 5,1 = 202,98.",
        },

        {
          numar: 4,
          titlu:
            "Comparăm",

          continut:
            "202,98 este apropiat de 200, deci estimarea confirmă ordinul de mărime al rezultatului.",
        },
      ],

      raspunsFinal:
        "Estimarea este aproximativ 200, iar valoarea exactă este 202,98.",

      verificare:
        "Diferența dintre estimare și valoarea exactă este 2,98.",
    },

    {
      id: "estimari-aproximari-exemplu-4",

      titlu:
        "Eroarea absolută",

      enunt:
        "Numărul x = 12,483 este aproximat cu a = 12,48. Calculează eroarea absolută.",

      nivel: "avansat",

      pasi: [
        {
          numar: 1,
          titlu:
            "Scriem formula",

          continut:
            "E_a = |x - a|.",
        },

        {
          numar: 2,
          titlu:
            "Înlocuim valorile",

          continut:
            "E_a = |12,483 - 12,48|.",
        },

        {
          numar: 3,
          titlu:
            "Calculăm diferența",

          continut:
            "12,483 - 12,480 = 0,003.",
        },

        {
          numar: 4,
          titlu:
            "Aplicăm modulul",

          continut:
            "E_a = |0,003| = 0,003.",
        },
      ],

      raspunsFinal:
        "Eroarea absolută este 0,003.",

      verificare:
        "Eroarea este pozitivă și mai mică decât 0,01, ceea ce este compatibil cu o aproximație foarte apropiată.",
    },
  ],

  greseliFrecvente: [
    {
      greseala:
        "Confundarea aproximării prin lipsă cu rotunjirea.",

      deCeEsteGresit:
        "Prin lipsă trebuie aleasă cea mai mare valoare de precizia cerută care nu depășește numărul, indiferent care dintre valorile vecine este mai apropiată.",

      cumOEviti:
        "Scrie încadrarea și alege valoarea din stânga pentru aproximarea prin lipsă.",
    },

    {
      greseala:
        "Pentru -2,73 la zecimi se consideră că aproximarea prin lipsă este -2,7.",

      deCeEsteGresit:
        "-2,7 este mai mare decât -2,73, deci nu poate fi aproximare prin lipsă.",

      cumOEviti:
        "Scrie -2,8 < -2,73 < -2,7. Rezultă imediat că prin lipsă este -2,8.",
    },

    {
      greseala:
        "Folosirea semnului egal între o valoare exactă și o aproximație.",

      deCeEsteGresit:
        "De exemplu √2 și 1,41 nu reprezintă exact același număr.",

      cumOEviti:
        "Folosește formularea „aproximativ egal cu” atunci când valoarea a fost aproximată.",
    },

    {
      greseala:
        "Rotunjirea tuturor rezultatelor intermediare.",

      deCeEsteGresit:
        "Erorile produse la fiecare pas se pot acumula și pot modifica rezultatul final.",

      cumOEviti:
        "Păstrează valoarea exactă sau suficiente zecimale și rotunjește, de regulă, la final.",
    },

    {
      greseala:
        "Ignorarea ordinului cerut.",

      deCeEsteGresit:
        "Aproximarea la zecimi și aproximarea la sutimi produc rezultate diferite.",

      cumOEviti:
        "Identifică înainte de orice calcul ultima poziție zecimală care trebuie păstrată.",
    },
  ],

  exercitii: [
    {
      id: "estimari-aproximari-exercitiu-1",

      nivel: "fundament",

      tip: "alegere-multipla",

      enunt:
        "Care este aproximarea prin lipsă la sutimi a numărului 4,278?",

      variante: [
        "4,27",
        "4,28",
        "4,2",
        "4,30",
      ],

      raspunsCorect:
        "4,27",

      rezolvare: [
        {
          numar: 1,
          titlu:
            "Construim încadrarea",

          continut:
            "4,27 < 4,278 < 4,28.",
        },

        {
          numar: 2,
          titlu:
            "Alegem valoarea prin lipsă",

          continut:
            "Valoarea de la stânga este 4,27.",
        },
      ],

      explicatieFinala:
        "Aproximarea prin lipsă la sutimi este 4,27.",

      punctaj: 5,

      competenta:
        "Determinarea aproximării prin lipsă a unui număr real.",

      gresealaFrecventa:
        "Alegerea automată a valorii rotunjite în locul valorii prin lipsă.",
    },

    {
      id: "estimari-aproximari-exercitiu-2",

      nivel: "fundament",

      tip: "alegere-multipla",

      enunt:
        "Care este aproximarea prin adaos la zecimi a numărului 6,21?",

      variante: [
        "6,1",
        "6,2",
        "6,3",
        "7",
      ],

      raspunsCorect:
        "6,3",

      rezolvare: [
        {
          numar: 1,
          titlu:
            "Încadrăm numărul",

          continut:
            "6,2 < 6,21 < 6,3.",
        },

        {
          numar: 2,
          titlu:
            "Alegem valoarea mai mare",

          continut:
            "Prin adaos la zecimi obținem 6,3.",
        },
      ],

      explicatieFinala:
        "Prin adaos alegem cea mai mică valoare de precizia cerută care este mai mare sau egală cu numărul.",

      punctaj: 5,

      competenta:
        "Determinarea aproximării prin adaos.",
    },

    {
      id: "estimari-aproximari-exercitiu-3",

      nivel: "fundament",

      tip: "raspuns-scurt",

      enunt:
        "Rotunjește numărul 15,684 la sutimi.",

      raspunsCorect:
        "15,68",

      rezolvare: [
        {
          numar: 1,
          titlu:
            "Păstrăm sutimile",

          continut:
            "Până la sutimi avem 15,68.",
        },

        {
          numar: 2,
          titlu:
            "Privim cifra următoare",

          continut:
            "Cifra miimilor este 4, mai mică decât 5.",
        },

        {
          numar: 3,
          titlu:
            "Concluzionăm",

          continut:
            "Cifra sutimilor rămâne neschimbată.",
        },
      ],

      explicatieFinala:
        "Rotunjirea la sutimi este 15,68.",

      punctaj: 5,

      competenta:
        "Rotunjirea unui număr real la ordinul cerut.",
    },

    {
      id: "estimari-aproximari-exercitiu-4",

      nivel: "standard-bac",

      tip: "raspuns-scurt",

      enunt:
        "Determină aproximarea prin lipsă la zecimi a numărului -7,24.",

      raspunsCorect:
        "-7,3",

      rezolvare: [
        {
          numar: 1,
          titlu:
            "Construim încadrarea",

          continut:
            "-7,3 < -7,24 < -7,2.",
        },

        {
          numar: 2,
          titlu:
            "Alegem valoarea mai mică",

          continut:
            "Valoarea prin lipsă este -7,3.",
        },
      ],

      explicatieFinala:
        "Pentru numere negative folosim ordinea numerică; -7,3 este mai mic decât -7,24.",

      punctaj: 10,

      competenta:
        "Aproximarea numerelor negative.",

      gresealaFrecventa:
        "Considerarea lui -7,2 drept aproximare prin lipsă deoarece are aceleași prime cifre.",
    },

    {
      id: "estimari-aproximari-exercitiu-5",

      nivel: "standard-bac",

      tip: "rezolvare-completa",

      enunt:
        "Pentru x = 23,476, determină aproximarea prin lipsă și prin adaos la sutimi, apoi rotunjește numărul la sutimi.",

      raspunsCorect:
        "Prin lipsă: 23,47; prin adaos: 23,48; rotunjire: 23,48.",

      rezolvare: [
        {
          numar: 1,
          titlu:
            "Identificăm valorile consecutive",

          continut:
            "La sutimi avem valorile 23,47 și 23,48.",
        },

        {
          numar: 2,
          titlu:
            "Scriem încadrarea",

          continut:
            "23,47 < 23,476 < 23,48.",
        },

        {
          numar: 3,
          titlu:
            "Citim lipsa și adaosul",

          continut:
            "Prin lipsă este 23,47; prin adaos este 23,48.",
        },

        {
          numar: 4,
          titlu:
            "Rotunjim",

          continut:
            "Cifra miimilor este 6, deci rotunjirea la sutimi este 23,48.",
        },
      ],

      explicatieFinala:
        "Încadrarea permite determinarea directă a aproximărilor, iar cifra miimilor stabilește rotunjirea.",

      punctaj: 10,

      competenta:
        "Aplicarea comparativă a celor trei procedee de aproximare.",
    },

    {
      id: "estimari-aproximari-exercitiu-6",

      nivel: "standard-bac",

      tip: "rezolvare-completa",

      enunt:
        "Estimează produsul 29,8 · 6,1 folosind numere întregi apropiate și apoi calculează valoarea exactă.",

      raspunsCorect:
        "Estimare: aproximativ 180; valoare exactă: 181,78.",

      rezolvare: [
        {
          numar: 1,
          titlu:
            "Alegem valori simple",

          continut:
            "29,8 ≈ 30 și 6,1 ≈ 6.",
        },

        {
          numar: 2,
          titlu:
            "Estimăm",

          continut:
            "30 · 6 = 180.",
        },

        {
          numar: 3,
          titlu:
            "Calculăm exact",

          continut:
            "29,8 · 6,1 = 181,78.",
        },

        {
          numar: 4,
          titlu:
            "Verificăm plauzibilitatea",

          continut:
            "181,78 este apropiat de 180, deci estimarea este compatibilă cu rezultatul exact.",
        },
      ],

      explicatieFinala:
        "Estimarea nu trebuie să coincidă cu valoarea exactă; rolul ei este să ofere rapid ordinul corect de mărime.",

      punctaj: 10,

      competenta:
        "Utilizarea estimării pentru verificarea unui calcul.",
    },

    {
      id: "estimari-aproximari-exercitiu-7",

      nivel: "avansat",

      tip: "rezolvare-completa",

      enunt:
        "Numărul x = 9,736 este aproximat cu a = 9,74. Calculează eroarea absolută.",

      raspunsCorect:
        "0,004",

      rezolvare: [
        {
          numar: 1,
          titlu:
            "Aplicăm formula",

          continut:
            "E_a = |x - a|.",
        },

        {
          numar: 2,
          titlu:
            "Înlocuim",

          continut:
            "E_a = |9,736 - 9,74|.",
        },

        {
          numar: 3,
          titlu:
            "Calculăm",

          continut:
            "9,736 - 9,740 = -0,004.",
        },

        {
          numar: 4,
          titlu:
            "Aplicăm modulul",

          continut:
            "|-0,004| = 0,004.",
        },
      ],

      explicatieFinala:
        "Distanța dintre valoarea exactă și aproximație este 0,004.",

      punctaj: 10,

      competenta:
        "Evaluarea erorii unei aproximații.",
    },

    {
      id: "estimari-aproximari-exercitiu-8",

      nivel: "avansat",

      tip: "rezolvare-completa",

      enunt:
        "Fie x = -3,486. Determină aproximarea prin lipsă și prin adaos la sutimi, rotunjirea la sutimi și verifică poziția tuturor valorilor pe axa numerelor.",

      raspunsCorect:
        "Prin lipsă: -3,49; prin adaos: -3,48; rotunjire: -3,49.",

      rezolvare: [
        {
          numar: 1,
          titlu:
            "Construim valorile vecine",

          continut:
            "La sutimi, valorile consecutive relevante sunt -3,49 și -3,48.",
        },

        {
          numar: 2,
          titlu:
            "Scriem ordinea",

          continut:
            "-3,49 < -3,486 < -3,48.",
        },

        {
          numar: 3,
          titlu:
            "Determinăm aproximările",

          continut:
            "Prin lipsă obținem -3,49; prin adaos obținem -3,48.",
        },

        {
          numar: 4,
          titlu:
            "Rotunjim",

          continut:
            "Cifra miimilor este 6, deci valoarea rotunjită la sutimi este -3,49.",
        },

        {
          numar: 5,
          titlu:
            "Verificăm",

          continut:
            "Pe axa numerelor -3,49 este în stânga lui -3,486, iar -3,48 este în dreapta lui.",
        },
      ],

      explicatieFinala:
        "Încadrarea pe axa numerelor elimină ambiguitatea produsă de semnul minus.",

      punctaj: 15,

      competenta:
        "Aplicarea riguroasă a aproximărilor pentru numere negative.",

      gresealaFrecventa:
        "Inversarea aproximării prin lipsă și prin adaos la numere negative.",
    },
  ],

  rezumat: {
    ideiDeRetinut: [
      "Estimarea oferă rapid o valoare apropiată și este utilă pentru verificarea rezultatelor.",
      "Aproximarea prin lipsă este cea mai mare valoare de precizia cerută care este mai mică sau egală cu valoarea exactă.",
      "Aproximarea prin adaos este cea mai mică valoare de precizia cerută care este mai mare sau egală cu valoarea exactă.",
      "Dacă numărul are deja precizia cerută, aproximarea prin lipsă și cea prin adaos sunt egale cu numărul.",
      "Rotunjirea și aproximarea prin lipsă sau prin adaos sunt procedee diferite.",
      "La numere negative este recomandată încadrarea pe axa numerelor.",
      "Rotunjirea se face de regulă la finalul unui calcul, nu inutil la fiecare pas.",
      "Eroarea absolută măsoară distanța dintre valoarea exactă și aproximația folosită.",
    ],

    formuleDeRetinut: [
      "a ≤ x ≤ b — a este aproximarea prin lipsă, iar b aproximarea prin adaos, la precizia stabilită",
      "Dacă x are deja precizia cerută, atunci a = x = b",
      "E_a = |x - a|",
      "La n zecimale, pasul dintre două valori consecutive este 10^(-n)",
    ],

    checklistElev: [
      "Am identificat dacă se cere estimare, lipsă, adaos sau rotunjire?",
      "Am identificat ordinul: unități, zecimi, sutimi etc.?",
      "Am construit corect încadrarea?",
      "Am verificat dacă numărul are deja precizia cerută?",
      "Dacă numărul este negativ, am verificat ordinea pe axă?",
      "La rotunjire, am analizat prima cifră eliminată?",
      "Am evitat să folosesc egalitatea pentru două valori care sunt doar aproximativ egale?",
      "Rezultatul meu este plauzibil?",
    ],
  },

  legaturaCuBac: {
    importanta:
      "Programa de examen M_mate-info include explicit, în conținuturile de clasa a IX-a referitoare la mulțimea numerelor reale, aproximările prin lipsă sau prin adaos. Competențele asociate includ și utilizarea estimărilor și aproximărilor în contexte variate. Rotunjirea și controlul erorii sunt folosite în această lecție ca instrumente pedagogice de sprijin și nu sunt prezentate aici ca tipuri distincte de cerințe garantate la examen.",

    tipuriCerinte: [
      "Lucrul cu aproximări prin lipsă sau prin adaos pentru numere reale.",
      "Utilizarea estimărilor și aproximărilor în contexte matematice.",
      "Compararea și ordonarea numerelor reale atunci când acestea intervin în aproximări.",
      "Folosirea aproximărilor ca instrument de calcul sau verificare în probleme cu numere reale.",
    ],

    strategie: [
      "Citește exact dacă enunțul cere aproximare prin lipsă sau prin adaos.",
      "Identifică ordinul la care trebuie realizată aproximarea.",
      "Construiește valorile de precizia cerută care încadrează numărul.",
      "Verifică dacă numărul este deja reprezentabil exact la ordinul cerut.",
      "Folosește ordinea numerică, mai ales pentru numere negative.",
      "Dacă într-un calcul este necesară o rotunjire, păstrează suficientă precizie până la rezultatul final.",
      "Folosește estimarea pentru a verifica plauzibilitatea rezultatului.",
    ],
  },

  surse: [
    {
      tip:
        "programa-oficiala",

      titlu:
        "Programa de examen pentru disciplina Matematică — M_mate-info",

      observatie:
        "Pentru clasa a IX-a, programa include competența de utilizare a proprietăților operațiilor algebrice ale numerelor, a estimărilor și aproximărilor în contexte variate. În conținuturile referitoare la mulțimea numerelor reale sunt menționate explicit aproximările prin lipsă sau prin adaos.",
    },

    {
      tip:
        "verificare-interna",

      titlu:
        "BAC MATE — Content Engine V1 — audit matematic al lecției Estimări și aproximări",

      observatie:
        "Au fost reverificate definițiile, exemplele, calculele, răspunsurile celor 8 exerciții, cele 4 verificări rapide și cazurile cu numere negative.",
    },

    {
      tip:
        "verificare-interna",

      titlu:
        "BAC MATE — Content Engine V1 — audit editorial și curricular",

      observatie:
        "Conținuturile explicit susținute de programa de examen au fost separate de elementele pedagogice suplimentare, precum rotunjirea și eroarea absolută.",
    },
  ],

  verificare: {
    status:
      "verificat",

    verificatMatematic:
      true,

    verificatPrograma:
      true,

    verificatExercitii:
      true,

    verificatLimbaRomana:
      true,

    ultimaVerificare:
      "2026-09-13",

    observatii: [
      "Structura lecției a trecut BAC MATE Content Validator V1 fără erori critice.",
      "Toate cele 4 scenarii video au trecut pragul orientativ de durată.",
      "Definițiile pentru aproximarea prin lipsă și prin adaos au fost verificate inclusiv pentru numere negative și pentru cazul în care valoarea este deja exact reprezentabilă la ordinul cerut.",
      "Au fost verificate matematic toate cele 4 exemple rezolvate.",
      "Au fost verificate enunțurile, rezolvările și răspunsurile celor 8 exerciții.",
      "Au fost verificate răspunsurile celor 4 verificări rapide din video-uri.",
      "Alinierea curriculară a fost verificată pentru conținuturile M_mate-info de clasa a IX-a.",
      "Rotunjirea și eroarea absolută sunt păstrate ca instrumente pedagogice de sprijin și nu sunt prezentate ca tipuri distincte de cerințe garantate la examen.",
      "Lecția este verificată, dar nu este încă publicabilă.",
      "Publicarea rămâne un gate separat după integrarea în aplicație, build și testul funcțional.",
    ],
  },
};