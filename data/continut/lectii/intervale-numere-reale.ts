import type { ContinutLectie } from "../tipuri";

/*
 * Draft generat de BAC MATE Generator Local V6.0.
 *
 * IMPORTANT:
 * - AI local = redactor, NU sursa de adevar matematic.
 * - Continutul necesita verificare umana.
 * - Nu publica automat acest fisier.
 */

export const continutLectie: ContinutLectie = {
  "id": "intervale-numere-reale",
  "slug": "intervale-numere-reale",
  "modul": 1,
  "numarLectie": 4,
  "clasa": "Clasa a IX-a",
  "profil": "M_mate-info",
  "titlu": "Intervale de numere reale",
  "subtitlu": "Definirea și clasificarea intervalelor de numere reale",
  "descriere": "Lectia introduce conceptul de interval de numere reale si il clasifica in functie de extrema sau extremele sale.",
  "nivelPrincipal": "fundament",
  "durataEstimataMinute": 25,
  "prerechizite": [
    "Cunoștințe despre mulțimea numerelor reale"
  ],
  "obiective": [
    "Definirea conceptului de interval de numere reale",
    "Clasificarea intervalelor în funcție de extrema sau extremele lor",
    "Identificarea apartenenței unui element la un interval dat",
    "Reprezentarea grafică a diferitelor tipuri de intervale"
  ],
  "termeniCheie": [
    "interval deschis",
    "interval închis",
    "extremă",
    "apartenență"
  ],
  "videoLectii": [
    {
      "id": "intervale-numere-reale-video-1",
      "numar": 1,
      "titlu": "Introducere în conceptul de interval de numere reale",
      "durataMinute": 4,
      "descriere": "În această lecție, vom explora noțiunea de interval de numere reale. Vom vedea de ce este importantă această concept și cum se definește în matematică. În plus, vom învăța să clasificăm diferite tipuri de intervale și să le reprezentăm corect pe axa numerelor.",
      "scenariu": [
        "În matematică, noțiunea de interval este una dintre cele mai utile și frecvent folosite. Deși pare simplă la prima vedere, ea are un rol esențial în rezolvarea problemelor legate de numere reale. Un interval este o mulțime de numere care se află între două valori, dar nu toate intervalele sunt identice.",
        "Să începem cu definiția unui interval. Un interval este format din două numere reale, pe care le numim extremități. Acestea pot fi incluse sau excluse în interval, în funcție de tipul acestuia. De exemplu, dacă avem intervalul [2, 5], atunci ambele capete sunt incluse, iar orice număr între 2 și 5 aparține intervalului.",
        "Există mai multe tipuri de intervale: închis, deschis sau semi-deschis. Intervalul închis include ambele extremități, iar cel deschis nu include niciuna. Un interval semi-deschis include doar una dintre capete. De exemplu, (2, 5] este un interval care include numărul 5, dar nu pe cel cu valoarea 2.",
        "De ce este important să înțelegem aceste tipuri de intervale? Pentru că ele sunt folosite frecvent în problemele de matematică, mai ales în studiul funcțiilor și al ecuațiilor. De exemplu, atunci când rezolvăm o inecuație, soluția este adesea un interval de numere reale.",
        "Pentru a verifica dacă un anumit număr aparține unui interval, trebuie să comparăm valoarea acestuia cu cele două extremități. Dacă numărul este mai mare decât cea mai mică extremă și mai mic decât cea mai mare extremă, atunci aparține intervalului. Totuși, dacă intervalul este deschis, capetele nu sunt incluse.",
        "Să luăm un exemplu concret: să verificăm dacă numărul 3 aparține intervalului [2, 5]. În acest caz, 3 este mai mare decât 2 și mai mic decât 5, iar intervalul este închis, deci 3 aparține intervalului. Dacă ar fi fost intervalul (2, 5), atunci 3 ar fi tot apărut, dar dacă ar fi fost [2, 4], atunci 3 ar fi aparținut.",
        "Reprezentarea grafică a intervalelor este o altă parte importantă. Pentru a reprezenta un interval pe axa numerelor, trebuie să desenăm o linie dreaptă și să marcam capetele intervalului cu semnul corespunzător: paranteze rotunde pentru excludere și paranteze drepte pentru includere.",
        "Este important să reținem că fiecare tip de interval are o notare specifică. De exemplu, [a, b] este un interval închis, (a, b) este deschis, iar [a, b) sau (a, b] sunt semi-deschise. Aceste notări sunt esențiale pentru a evita confuziile și erorile comune.",
        "O greșeală frecventă este confundarea notării intervalului deschis cu cea a intervalului închis. Parantezele rotunde indică excluderea capetelor, iar parantezele drepte indică incluziunea lor. Este important să reținem această diferență pentru a evita erorile.",
        "În concluzie, intervalul de numere reale este o noțiune fundamentală în matematică. El apare în multe contexte și este esențial pentru înțelegerea altor concepte. Prin înțelegerea corectă a tipurilor de intervale și a modului lor de reprezentare, putem rezolva mai ușor problemele legate de numere reale."
      ],
      "ideiDeRetinut": [
        "Intervalul este format din două extremități care pot fi incluse sau excluse.",
        "Tipurile de intervale sunt: închis, deschis și semi-deschis.",
        "Aparența unui element într-un interval se verifică prin compararea cu cele două extremități."
      ],
      "exemplu": {
        "titlu": "Verificare apartenență la un interval închis",
        "enunt": "Verificați dacă numărul 3 aparține intervalului [2, 5].",
        "rezolvareScurta": [
          "Identificăm extremitățile intervalului: 2 și 5.",
          "Comparam numărul 3 cu cele două extremități: 3 este mai mare decât 2 și mai mic decât 5.",
          "Intervalul [2, 5] este închis, deci capetele sunt incluse."
        ],
        "raspuns": "Da, numărul 3 aparține intervalului [2, 5]."
      },
      "verificareRapida": {
        "intrebare": "Verificați dacă numărul 4 aparține intervalului (1, 5].",
        "variante": [
          "Da",
          "Nu",
          "Depinde de tipul intervalului",
          "Nu se poate determina"
        ],
        "raspunsCorect": 0,
        "explicatie": "Numărul 4 este mai mare decât 1 și mai mic decât 5, iar intervalul (1, 5] include capătul 5, dar nu pe cel cu valoarea 1. Deci, 4 aparține intervalului."
      }
    },
    {
      "id": "intervale-numere-reale-video-2",
      "numar": 2,
      "titlu": "Reguli si metoda pentru lucrul cu intervale de numere reale",
      "durataMinute": 5,
      "descriere": "În această lecție, vom explora regulile și metodele de lucru pentru a defini, clasifica și reprezenta corect intervalele de numere reale. Vom învăța cum să identificăm apartenența unui element la un interval dat și cum să evităm greșelile frecvente în acest proces.",
      "scenariu": [
        "În matematică, intervalele de numere reale sunt o parte esențială a teoriei mulțimilor. Ele reprezintă un set de valori care se înscriu între două numere, denumite extremă sau extreme. În funcție de modul în care includ sau exclud aceste capete, intervalele pot fi clasificate în diferite tipuri.",
        "Primul pas este să definim corect conceptul de interval. Un interval este format din două numere reale, notate a și b, unde a < b. Acestea sunt extremele intervalului. În funcție de modul în care includ sau exclud aceste valori, intervalele pot fi deschise, închise sau semi-deschise.",
        "Intervalul închis [a, b] include ambele capete, adică a și b. Acest tip de interval este folosit frecvent în probleme de matematică, deoarece oferă o reprezentare completă a valorilor dintr-un anumit domeniu.",
        "Intervalul deschis (a, b) nu include niciun capăt. Acest tip de interval este util atunci când dorim să excluzem valorile extreme dintr-o mulțime. De exemplu, dacă avem un interval (1, 4), valoarea 1 nu aparține acestui interval.",
        "Un alt tip de interval este cel semi-deschis, care include doar unul dintre capete. Acesta poate fi [a, b) sau (a, b], în funcție de extremă care este inclusă. De exemplu, intervalul [1, 4) include valoarea 1, dar nu include valoarea 4.",
        "Pentru a identifica apartenența unui element la un interval dat, trebuie să comparăm valoarea respectivă cu capetele intervalului. Dacă valoarea este mai mare decât a și mai mică decât b, atunci aparține intervalului închis [a, b].",
        "Dacă valoarea este egală cu a sau cu b, trebuie să verificăm dacă aceste capete sunt incluse în interval. De exemplu, în intervalul [1, 4], valoarea 1 aparține intervalului, dar în intervalul (1, 4), valoarea 1 nu aparține.",
        "Reprezentarea grafică a intervalelor este esențială pentru înțelegerea corectă a acestor concepte. Pe axa numerelor reale, un interval închis se reprezintă cu linii drepte la capete, iar un interval deschis se reprezintă cu cercuri desenate la capete.",
        "Este important să evităm greșelile frecvente care apar în lucrul cu intervale. Una dintre cele mai comune greșeli este confundarea notatiei intervalului deschis cu cea a intervalului închis. Parantezele rotunde indică excluderea capetelor, iar parantezele drepte indică incluziunea lor.",
        "Alta greșeală frecventă este includerea unui capăt într-un interval deschis. De exemplu, dacă avem intervalul (1, 4), valoarea 1 nu aparține acestui interval, deoarece parantezele sunt rotunde. Este esențial să verificăm apartenența fiecărui element înainte de a da un răspuns.",
        "Pentru a reprezenta corect un interval pe axa numerelor, este necesar să folosim axa numerelor ca suport. Fără aceasta, reprezentarea grafică poate fi incorectă și poate duce la erori în rezolvarea problemelor.",
        "În concluzie, lucrul cu intervale de numere reale implică cunoașterea corectă a definiției, clasificarea lor în funcție de extremele lor, identificarea apartenenței unui element și reprezentarea grafică pe axa numerelor. Este important să evităm greșelile frecvente și să aplicăm regulile corect.",
        "Pentru a consolida cunoștințele, este recomandat să exersăm cu exemple concrete, cum ar fi reprezentarea grafică a intervalului (1, 4), care se face prin desenarea unui segment între 1 și 4, fără a include capetele."
      ],
      "ideiDeRetinut": [
        "Intervalul este format din două extremități.",
        "Extremele pot fi incluse sau excluse în funcție de tipul intervalului.",
        "Aparența unui element la un interval se verifică prin compararea cu capetele.",
        "Parantezele rotunde indică excluderea capetelor, iar parantezele drepte indică incluziunea lor."
      ],
      "exemplu": {
        "titlu": "Reprezentarea grafică a unui interval deschis",
        "enunt": "Reprezentați grafic intervalul (1, 4).",
        "rezolvareScurta": [
          "Identificăm extremele intervalului: 1 și 4.",
          "Pe axa numerelor reale, desenăm un segment între 1 și 4.",
          "Capetele nu sunt incluse, deci le marcam cu cercuri."
        ],
        "raspuns": "Intervalul (1, 4) este reprezentat grafic ca un segment deschis între 1 și 4."
      },
      "verificareRapida": {
        "intrebare": "Care dintre următoarele intervale include valoarea 3?",
        "variante": [
          "[1, 5]",
          "(2, 6)",
          "[0, 4)",
          "(1, 7]"
        ],
        "raspunsCorect": 0,
        "explicatie": "Intervalul [1, 5] include valoarea 3 deoarece este un interval închis."
      }
    },
    {
      "id": "intervale-numere-reale-video-3",
      "numar": 3,
      "titlu": "Verificarea apartenenței unui element la un interval de numere reale",
      "durataMinute": 5,
      "descriere": "În această lecție, vom învăța cum să verificăm dacă un anumit număr aparține sau nu unui interval dat. Vom analiza diferite tipuri de intervale și vom vedea cum se aplică notarea corectă pentru fiecare caz. În plus, vom rezolva un exemplu pas cu pas pentru a înțelege mai bine conceptul.",
      "scenariu": [
        "În matematică, intervalul de numere reale este o mulțime formată din toate valorile dintre două numere. Acestea pot fi incluse sau excluse în funcție de tipul intervalului. De exemplu, dacă avem un interval deschis între 2 și 5, atunci nu includem capetele, iar dacă este închis, le includem.",
        "Pentru a verifica dacă un număr aparține unui interval, trebuie să comparăm valoarea acestuia cu cele două extremități. Dacă numărul este mai mare decât cea mai mică extremă și mai mic decât cea mai mare extremă, atunci aparține intervalului. Totuși, dacă intervalul este deschis la un capăt, acel capăt nu se include.",
        "Un exemplu clar este intervalul [2, 5). Acesta include numărul 2, dar nu include numărul 5. Dacă vrem să verificăm dacă 5 aparține acestui interval, trebuie să ne amintim că paranteza din dreapta indică excluderea capetelor. Deci, 5 nu este inclus în interval.",
        "Este important să reținem diferența dintre parantezele rotunde și cele drepte. Parantezele rotunde indică excluderea unui capăt, iar parantezele drepte indică incluziunea acestuia. Acest lucru este esențial pentru a nu confunda intervalul deschis cu cel închis.",
        "O altă greșeală comună este să includem un capăt într-un interval deschis. De exemplu, dacă avem intervalul (3, 7), atunci numărul 3 nu aparține acestui interval. Acest lucru se întâmplă adesea datorită unei neînțelegeri a semnificației parantezelor.",
        "Pentru a evita astfel de greșeli, este recomandat să verificăm fiecare capăt al intervalului înainte de a da un răspuns. De exemplu, dacă vrem să vedem dacă 4 aparține intervalului (2, 6), trebuie să ne asigurăm că 4 este mai mare decât 2 și mai mic decât 6. În acest caz, 4 aparține intervalului.",
        "Reprezentarea grafică a intervalelor pe axa numerelor este o metodă eficientă de a înțelege relațiile dintre ele. Prin desenarea unui segment între cele două extremități, putem vedea imediat dacă un număr se află în interiorul intervalului sau nu.",
        "În plus, este util să exersăm identificarea apartenenței unui element la un interval prin exerciții simple. De exemplu, verificăm dacă 0 aparține intervalului (-1, 1), sau dacă 3 aparține intervalului [2, 5]. Acest lucru ne ajută să consolidăm cunoștințele și să evităm greșelile comune.",
        "În concluzie, verificarea apartenenței unui element la un interval de numere reale implică înțelegerea notării corecte a fiecărui tip de interval. Este esențial să ne amintim că parantezele rotunde indică excluderea capetelor, iar cele drepte indică incluziunea lor. Prin exerciții și reprezentări grafice, putem înțelege mai bine această concept.",
        "Pentru a recapitula, vom analiza încă o dată: dacă un interval este deschis la un capăt, acel capăt nu se include. Dacă este închis, se include. Verificarea apartenenței se face prin compararea valorii cu cele două extremități și respectarea notării corecte a intervalului."
      ],
      "ideiDeRetinut": [
        "Intervalul este format din două extremități, care pot fi incluse sau excluse.",
        "Parantezele rotunde indică excluderea unui capăt, iar parntelezele drepte indică incluziunea acestuia.",
        "Verificarea apartenenței se face prin compararea valorii cu cele două extremități."
      ],
      "exemplu": {
        "titlu": "Verificare apartenență la un interval semi-deschis",
        "enunt": "Verificați dacă numărul 5 aparține intervalului [2, 5).",
        "rezolvareScurta": [
          "Identificăm extremitățile intervalului: 2 și 5.",
          "Paranteza din dreapta este rotundă, deci 5 nu este inclus în interval.",
          "Numărul 5 nu aparține intervalului."
        ],
        "raspuns": "Nu, numărul 5 nu aparține intervalului [2, 5)."
      },
      "verificareRapida": {
        "intrebare": "Verificați dacă numărul 3 aparține intervalului (1, 4].",
        "variante": [
          "Da, 3 aparține intervalului.",
          "Nu, 3 nu aparține intervalului.",
          "Da, 3 este inclus în interval.",
          "Nu, 3 este excludut din interval."
        ],
        "raspunsCorect": 0,
        "explicatie": "Intervalul (1, 4] include numărul 4, dar nu include numărul 1. Deoarece paranteza din stânga este rotundă, 1 nu se include, iar paranteza din dreapta este dreaptă, deci 4 este inclus. Numărul 3 este între 1 și 4, deci aparține intervalului."
      }
    },
    {
      "id": "intervale-numere-reale-video-4",
      "numar": 4,
      "titlu": "Aplicare tip Bac: Intervale de numere reale",
      "durataMinute": 5,
      "descriere": "În această lecție, vom analiza modul în care se aplică noțiunea de interval de numere reale în problemele de matematică, mai ales cele din cadrul examenului de Bacalaureat. Vom discuta despre tipurile de intervale, cum se verifică apartenența unui element la un interval și cum se reprezintă grafic acestea. De asemenea, vom analiza greșelile frecvente pe care le fac elevii în această temă și cum să le evităm.",
      "scenariu": [
        "În cadrul examenului de Bacalaureat, intervalele de numere reale sunt o temă frecvent întâlnită, mai ales în problemele de algebră. Pentru a rezolva corect aceste tipuri de exerciții, este esențial să cunoaștem bine definiția și clasificarea intervalelor.",
        "Un interval este o mulțime de numere reale cuprinse între două valori, denumite extremități. Acestea pot fi incluse sau excluse în funcție de tipul intervalului. De exemplu, un interval închis include ambele extremități, iar un interval deschis nu include niciuna dintre ele.",
        "În practică, este important să reținem notarea corectă a fiecărui tip de interval. Parantezele rotunde indică excluderea capetelor, în timp ce parantezele drepte indică includerea lor. De exemplu, intervalul (-2, 3] include numărul 3, dar nu include numărul -2.",
        "O greșeală frecventă este confundarea notatiei intervalului deschis cu cea a intervalului închis. Acest lucru poate duce la răspunsuri incorecte, mai ales în problemele de identificare a apartenenței unui element la un interval.",
        "Pentru a evita această greșeală, este recomandat să repetăm notarea fiecărui tip de interval și să verificăm atent semnificația fiecărei paranteze. De exemplu, în intervalul (1, 5), numerele 1 și 5 nu aparțin intervalului, în timp ce în intervalul [1, 5], ambele capete sunt incluse.",
        "Alta greșeală comună este inclusia unui capăt într-un interval deschis. Deși pare logic, acest lucru este incorect, deoarece intervalul deschis nu include niciunul dintre capetele sale. Acest tip de eroare poate apărea în problemele de verificare a apartenenței unui element la un interval.",
        "Pentru a evita această greșeală, este important să verificăm fiecare element prin compararea cu capetele intervalului. De exemplu, dacă avem intervalul (-3, 2], numărul -3 nu aparține intervalului, în timp ce numărul 2 este inclus.",
        "În plus, reprezentarea grafică a intervalelor este esențială pentru înțelegerea corectă a acestor concepte. Axa numerelor este un instrument important care ne ajută să vizualizăm intervalele și relațiile dintre ele.",
        "O greșeală frecventă este neglijarea reprezentării grafice pe axa numerelor, ceea ce poate duce la confuzii în problemele de tipul „reprezentați grafic un interval dat”. Pentru a evita această greșeală, este recomandat să exersăm reprezentarea grafică pe axa numerelor înainte de a rezolva probleme complexe.",
        "În concluzie, pentru a obține punctaj maxim la exercițiile din Bacalaureat legate de intervalele de numere reale, este esențial să cunoaștem bine definiția și clasificarea acestora, să verificăm atent apartenența unui element la un interval și să reprezentăm corect grafic fiecare tip de interval. Evitarea greșelilor frecvente este cheia succesului în această temă.",
        "Pentru a consolida cunoștințele, vom analiza un exemplu practic: reprezentarea grafică a intervalului (-3, 2]. Acest interval include numărul 2, dar nu include numărul -3. Pe axa numerelor, acest lucru se reflectă prin desenarea unui segment între -3 și 2, fără a include punctul corespunzător lui -3, dar cu punctul corespunzător lui 2."
      ],
      "ideiDeRetinut": [
        "Intervalul este format din două extremități care pot fi incluse sau excluse.",
        "Parantezele rotunde indică excluderea capetelor, iar parantezele drepte indică includerea lor.",
        "Verificarea apartenenței unui element la un interval se face prin comparare cu capetele."
      ],
      "exemplu": {
        "titlu": "Reprezentarea grafică a intervalului (-3, 2]",
        "enunt": "Reprezentați grafic intervalul (-3, 2].",
        "rezolvareScurta": [
          "Identificăm extremitățile intervalului: -3 și 2.",
          "Pe axa numerelor, desenăm un segment între -3 și 2.",
          "Paranteza rotundă la stânga indică excluderea lui -3, iar paranteza dreaptă indică includerea lui 2."
        ],
        "raspuns": "Intervalul (-3, 2] este reprezentat grafic ca un segment semi-deschis între -3 și 2."
      },
      "verificareRapida": {
        "intrebare": "Care dintre următoarele afirmații este corectă pentru intervalul (-5, 1]?",
        "variante": [
          "Numărul -5 aparține intervalului.",
          "Numărul 1 nu aparține intervalului.",
          "Intervalul include numerele -5 și 1.",
          "Intervalul este deschis la stânga și închis la dreapta."
        ],
        "raspunsCorect": 3,
        "explicatie": "Intervalul (-5, 1] este deschis la stânga (nu include -5) și închis la dreapta (include 1)."
      }
    }
  ],
  "definitii": [
    {
      "termen": "interval deschis",
      "definitie": "Este mulțimea numerelor reale aflate între două numere reale date, excluzând capetele.",
      "observatie": "Notat cu paranteze rotunde."
    },
    {
      "termen": "interval închis",
      "definitie": "Este mulțimea numerelor reale aflate între două numere reale date, inclusiv capetele.",
      "observatie": "Notat cu paranteze drepte."
    }
  ],
  "teorie": [
    {
      "id": "intervale-numere-reale-teorie-1",
      "titlu": "Definirea intervalelor de numere reale",
      "explicatie": "Un interval este o mulțime de numere reale cuprinse între două valori, inclusiv sau excluzând aceste valori. Cele două valori se numesc extremități ale intervalului.",
      "ideiCheie": [
        "Intervalul este format din două extremități",
        "Extremele pot fi incluse sau excluse"
      ]
    },
    {
      "id": "intervale-numere-reale-teorie-2",
      "titlu": "Clasificarea intervalelor",
      "explicatie": "Intervalul poate fi închis, deschis sau semi-deschis, în funcție de includerea sau excluderea extremelor. Fiecare tip are o notare specifică.",
      "ideiCheie": [
        "Intervalul poate fi închis, deschis sau semi-deschis",
        "Notarea intervalului depinde de includerea extremelor"
      ]
    },
    {
      "id": "intervale-numere-reale-teorie-3",
      "titlu": "Aparența unui element într-un interval",
      "explicatie": "Un număr real aparține unui interval dacă se află între cele două extremități, inclusiv sau excluzând acestea, în funcție de tipul intervalului.",
      "ideiCheie": [
        "Aparența este verificată prin compararea cu extremele",
        "Tipul intervalului influențează apartenența"
      ]
    }
  ],
  "formule": [],
  "exempleRezolvate": [
    {
      "id": "intervale-numere-reale-exemplu-1",
      "titlu": "Verificare apartenență la un interval închis",
      "enunt": "Verificați dacă numărul 3 aparține intervalului [2, 5].",
      "nivel": "fundament",
      "pasi": [
        {
          "numar": 1,
          "titlu": "Identificarea extremelor intervalului",
          "continut": "Intervalul [2, 5] are extremitățile 2 și 5."
        },
        {
          "numar": 2,
          "titlu": "Verificarea apartenenței numărului 3",
          "continut": "Numărul 3 este mai mare decât 2 și mai mic decât 5, deci aparține intervalului."
        }
      ],
      "raspunsFinal": "Da, numărul 3 aparține intervalului [2, 5].",
      "verificare": "Numărul 3 este între 2 și 5 inclusiv, conform definiției intervalului închis."
    },
    {
      "id": "intervale-numere-reale-exemplu-2",
      "titlu": "Reprezentarea grafică a unui interval deschis",
      "enunt": "Reprezentați grafic intervalul (1, 4).",
      "nivel": "standard-bac",
      "pasi": [
        {
          "numar": 1,
          "titlu": "Identificarea extremelor intervalului",
          "continut": "Intervalul (1, 4) are extremitățile 1 și 4."
        },
        {
          "numar": 2,
          "titlu": "Reprezentarea grafică cu paranteze rotunde",
          "continut": "Pe axa numerelor reale, se desenează un segment între 1 și 4, fără a include capetele."
        }
      ],
      "raspunsFinal": "Intervalul (1, 4) este reprezentat grafic ca un segment deschis între 1 și 4.",
      "verificare": "Parantezele rotunde indică faptul că capetele nu sunt incluse."
    },
    {
      "id": "intervale-numere-reale-exemplu-3",
      "titlu": "Verificare apartenență la un interval semi-deschis",
      "enunt": "Verificați dacă numărul 5 aparține intervalului [2, 5).",
      "nivel": "standard-bac",
      "pasi": [
        {
          "numar": 1,
          "titlu": "Identificarea extremelor intervalului",
          "continut": "Intervalul [2, 5) are extremitățile 2 și 5."
        },
        {
          "numar": 2,
          "titlu": "Verificarea apartenenței numărului 5",
          "continut": "Numărul 5 nu este inclus în interval deoarece paranteza din dreapta este rotundă."
        }
      ],
      "raspunsFinal": "Nu, numărul 5 nu aparține intervalului [2, 5).",
      "verificare": "Paranteza rotundă la dreapta indică faptul că 5 nu este inclus în interval."
    },
    {
      "id": "intervale-numere-reale-exemplu-4",
      "titlu": "Reprezentarea grafică a unui interval semi-deschis",
      "enunt": "Reprezentați grafic intervalul (-3, 2].",
      "nivel": "standard-bac",
      "pasi": [
        {
          "numar": 1,
          "titlu": "Identificarea extremelor intervalului",
          "continut": "Intervalul (-3, 2] are extremitățile -3 și 2."
        },
        {
          "numar": 2,
          "titlu": "Reprezentarea grafică cu paranteze rotunde la stânga și drepte la dreapta",
          "continut": "Pe axa numerelor reale, se desenează un segment între -3 și 2, fără a include -3, dar cu 2 inclus."
        }
      ],
      "raspunsFinal": "Intervalul (-3, 2] este reprezentat grafic ca un segment semi-deschis între -3 și 2.",
      "verificare": "Paranteza rotundă la stânga indică faptul că -3 nu este inclus în interval, iar paranteza dreptă indică faptul că 2 este inclus."
    }
  ],
  "greseliFrecvente": [
    {
      "greseala": "Confunderea notatiei intervalului deschis cu cea a intervalului închis.",
      "deCeEsteGresit": "Parantezele rotunde indică excluderea capetelor, iar parantezele drepte indică incluziunea lor.",
      "cumOEviti": "Repetarea notatiei și a semnificației fiecărui tip de interval."
    },
    {
      "greseala": "Inclusia unui capat într-un interval deschis.",
      "deCeEsteGresit": "Intervalul deschis nu include capetele, deci orice număr egal cu un capăt nu aparține intervalului.",
      "cumOEviti": "Verificarea apartenenței unui element la un interval prin comparare cu capetele."
    },
    {
      "greseala": "Reprezentarea grafică a intervalelor fără a folosi axa numerelor.",
      "deCeEsteGresit": "Axa numerelor este esențială pentru reprezentarea corectă a intervalelor și a relațiilor dintre ele.",
      "cumOEviti": "Exersarea reprezentării grafice pe axa numerelor înainte de a rezolva probleme complexe."
    },
    {
      "greseala": "Neglijarea semnificației simbolurilor în cerințele de identificare a apartenenței.",
      "deCeEsteGresit": "Simbolurile precizează dacă un element aparține sau nu intervalului, iar neglijarea lor duce la răspunsuri incorecte.",
      "cumOEviti": "Analiza atentă a cerinței și verificarea fiecărui simbol înainte de a da răspuns."
    }
  ],
  "exercitii": [
    {
      "id": "intervale-numere-reale-exercitiu-1",
      "nivel": "fundament",
      "tip": "alegere-multipla",
      "enunt": "Care dintre următoarele intervale este intervalul deschis cu extremitățile 2 și 5?",
      "variante": [
        "(2, 5)",
        "[2, 5]",
        "[2, 5)",
        "(2, 5]"
      ],
      "raspunsCorect": "(2, 5)",
      "rezolvare": [
        {
          "numar": 1,
          "titlu": "Definirea intervalului deschis",
          "continut": "Intervalul deschis este format din toate numerele reale aflate între două valori, excluzând capetele."
        },
        {
          "numar": 2,
          "titlu": "Semnificația parantezelor",
          "continut": "Parantezele rotunde indică excluderea valorilor 2 și 5 din interval."
        }
      ],
      "explicatieFinala": "Intervalul deschis (2, 5) include toate numerele reale mai mari decât 2 și mai mici decât 5.",
      "punctaj": 1,
      "competenta": "Clasificarea intervalelor în funcție de extrema sau extremele lor"
    },
    {
      "id": "intervale-numere-reale-exercitiu-2",
      "nivel": "fundament",
      "tip": "raspuns-scurt",
      "enunt": "Scrie intervalul închis cu extremitățile -3 și 4.",
      "raspunsCorect": "[-3, 4]",
      "rezolvare": [
        {
          "numar": 1,
          "titlu": "Definirea intervalului închis",
          "continut": "Intervalul închis este format din toate numerele reale aflate între două valori, inclusiv capetele."
        },
        {
          "numar": 2,
          "titlu": "Semnificația parantezelor",
          "continut": "Parantezele drepte indică incluziunea valorilor -3 și 4 în interval."
        }
      ],
      "explicatieFinala": "Intervalul [-3, 4] include toate numerele reale mai mari sau egale cu -3 și mai mici sau egale cu 4.",
      "punctaj": 1,
      "competenta": "Clasificarea intervalelor în funcție de extrema sau extremele lor"
    },
    {
      "id": "intervale-numere-reale-exercitiu-3",
      "nivel": "standard-bac",
      "tip": "alegere-multipla",
      "enunt": "Care dintre următoarele afirmații este adevărată pentru intervalul [1, 5)?",
      "variante": [
        "Numărul 1 aparține intervalului.",
        "Numărul 5 aparține intervalului.",
        "Intervalul include toate numerele reale mai mari decât 1 și mai mici decât 5.",
        "Intervalul este format dintr-un singur element."
      ],
      "raspunsCorect": "Numărul 1 aparține intervalului.",
      "rezolvare": [
        {
          "numar": 1,
          "titlu": "Definirea intervalului închis la stânga și deschis la dreapta",
          "continut": "Intervalul [1, 5) include numărul 1, dar nu include numărul 5."
        },
        {
          "numar": 2,
          "titlu": "Verificarea apartenenței unui element la interval",
          "continut": "Pentru a verifica dacă un element aparține intervalului, se compară cu capetele."
        }
      ],
      "explicatieFinala": "Intervalul [1, 5) include numărul 1, dar nu include numărul 5.",
      "punctaj": 1,
      "competenta": "Identificarea apartenenței unui element la un interval dat"
    },
    {
      "id": "intervale-numere-reale-exercitiu-4",
      "nivel": "standard-bac",
      "tip": "raspuns-scurt",
      "enunt": "Scrie simbolul care indică excluderea unui capăt dintr-un interval.",
      "raspunsCorect": "(",
      "rezolvare": [
        {
          "numar": 1,
          "titlu": "Semnificația parantezelor în notarea intervalelor",
          "continut": "Paranteza rotundă indică excluderea unui capăt din interval."
        },
        {
          "numar": 2,
          "titlu": "Exemplu de utilizare",
          "continut": "În intervalul (a, b), valorile a și b nu aparțin intervalului."
        }
      ],
      "explicatieFinala": "Paranteza rotundă '(' indică excluderea unui capăt dintr-un interval.",
      "punctaj": 1,
      "competenta": "Reprezentarea grafică a diferitelor tipuri de intervale"
    },
    {
      "id": "intervale-numere-reale-exercitiu-5",
      "nivel": "standard-bac",
      "tip": "alegere-multipla",
      "enunt": "Care dintre următoarele intervale include numărul 3?",
      "variante": [
        "(−∞, 3]",
        "[2, ∞)",
        "(1, 5)",
        "(−∞, 4)"
      ],
      "raspunsCorect": "[2, ∞)",
      "rezolvare": [
        {
          "numar": 1,
          "titlu": "Analiza intervalului [2, ∞)",
          "continut": "Intervalul [2, ∞) include numărul 2 și toate numerele mai mari decât 2. Deoarece 3 > 2, numărul 3 aparține acestui interval."
        },
        {
          "numar": 2,
          "titlu": "Verificarea altor variante",
          "continut": "Intervalul (−∞, 3] include 3, dar nu include numerele mai mari decât 3. Intervalul (1, 5) exclude capetele, deci 3 aparține intervalului, dar este inclus în [2, ∞), care este varianta corectă."
        }
      ],
      "explicatieFinala": "Intervalul [2, ∞) este cel mai potrivit răspuns deoarece include numărul 3.",
      "punctaj": 1,
      "competenta": "Identificarea apartenenței unui element la un interval dat."
    },
    {
      "id": "intervale-numere-reale-exercitiu-6",
      "nivel": "standard-bac",
      "tip": "raspuns-scurt",
      "enunt": "Scrieți simbolul care indică excluderea unui capăt într-un interval.",
      "raspunsCorect": "(",
      "rezolvare": [
        {
          "numar": 1,
          "titlu": "Definiția notatiei intervalelor",
          "continut": "Simbolul paranteză rotundă '(' indică excluderea unui capăt din interval."
        },
        {
          "numar": 2,
          "titlu": "Exemplu de utilizare",
          "continut": "În intervalul (a, b), numărul a nu aparține intervalului, iar numărul b nu aparține intervalului."
        }
      ],
      "explicatieFinala": "Simbolul '(' este folosit pentru excluderea unui capăt într-un interval.",
      "punctaj": 1,
      "competenta": "Reprezentarea grafică și notarea corectă a intervalelor."
    },
    {
      "id": "intervale-numere-reale-exercitiu-7",
      "nivel": "avansat",
      "tip": "rezolvare-completa",
      "enunt": "Determinați apartenența numerelor 2, 5 și -1 la intervalul [−1, 5).",
      "raspunsCorect": "2 ∈ [−1, 5), 5 ∉ [−1, 5), -1 ∈ [−1, 5)",
      "rezolvare": [
        {
          "numar": 1,
          "titlu": "Verificarea apartenenței numărului 2",
          "continut": "Numărul 2 este mai mare decât -1 și mai mic decât 5, deci aparține intervalului [−1, 5)."
        },
        {
          "numar": 2,
          "titlu": "Verificarea apartenenței numărului 5",
          "continut": "Intervalul [−1, 5) este deschis la capătul 5, deci numărul 5 nu aparține intervalului."
        },
        {
          "numar": 3,
          "titlu": "Verificarea apartenenței numărului -1",
          "continut": "Intervalul [−1, 5) este închis la capătul -1, deci numărul -1 aparține intervalului."
        }
      ],
      "explicatieFinala": "Numerele 2 și -1 aparțin intervalului [−1, 5), iar numărul 5 nu aparține acestuia.",
      "punctaj": 1,
      "competenta": "Identificarea apartenenței unui element la un interval dat."
    },
    {
      "id": "intervale-numere-reale-exercitiu-8",
      "nivel": "avansat",
      "tip": "alegere-multipla",
      "enunt": "Care dintre următoarele intervale este reprezentat corect pe axa numerelor?",
      "variante": [
        "[1, 3]",
        "(−∞, 2)",
        "(0, ∞)",
        "[−2, 4)"
      ],
      "raspunsCorect": "[−2, 4)",
      "rezolvare": [
        {
          "numar": 1,
          "titlu": "Analiza intervalului [−2, 4)",
          "continut": "Intervalul [−2, 4) este închis la -2 și deschis la 4. Pe axa numerelor, acest interval se reprezintă cu un punct închis la -2 și un punct deschis la 4."
        },
        {
          "numar": 2,
          "titlu": "Verificarea altor variante",
          "continut": "Intervalul [1, 3] este închis la ambele capete. Intervalul (−∞, 2) este deschis la 2. Intervalul (0, ∞) este deschis la 0 și include toate numerele mai mari decât 0."
        }
      ],
      "explicatieFinala": "Intervalul [−2, 4) este reprezentat corect pe axa numerelor cu un punct închis la -2 și un punct deschis la 4.",
      "punctaj": 1,
      "competenta": "Reprezentarea grafică a intervalelor."
    }
  ],
  "rezumat": {
    "ideiDeRetinut": [
      "Intervalul deschis exclude capetele, iar intervalul închis le include.",
      "Notatiile parantezelor indică natura intervalului (deschis sau închis).",
      "Reprezentarea grafică este esențială pentru înțelegerea și compararea intervalelor.",
      "Identificarea apartenenței unui element la un interval se face prin comparare cu capetele."
    ],
    "formuleDeRetinut": [
      "Interval deschis: (a, b) = {x ∈ ℝ | a < x < b}",
      "Interval închis: [a, b] = {x ∈ ℝ | a ≤ x ≤ b}"
    ],
    "checklistElev": [
      "Verifică dacă capetele sunt incluse sau excluse în interval.",
      "Reprezintă grafic fiecare tip de interval pe axa numerelor.",
      "Identifică apartenența unui element la un interval dat.",
      "Repeta notatiile și semnificațiile simbolurilor folosite."
    ]
  },
  "legaturaCuBac": {
    "importanta": "Intervalele de numere reale sunt concepte fundamentale în matematică, utilizate frecvent în rezolvarea problemelor de algebră și analiză.",
    "tipuriCerinte": [
      "Identificarea apartenenței unui element la un interval dat.",
      "Reprezentarea grafică a intervalelor pe axa numerelor.",
      "Compararea intervalelor în funcție de poziția lor pe axa numerelor.",
      "Determinarea intersecției sau reuniunii dintre două intervale."
    ],
    "strategie": [
      "Înțelegerea clară a fiecărui tip de interval și a notatiei corespunzătoare.",
      "Exersarea reprezentării grafice pe axa numerelor pentru a evita greșelile comune.",
      "Verificarea atentă a cerinței înainte de a da răspunsul final.",
      "Repetarea periodică a conceptelor pentru consolidarea cunoștințelor."
    ]
  },
  "surse": [
    {
      "tip": "verificare-interna",
      "titlu": "BAC MATE — draft generat local",
      "observatie": "Continut generat local cu Ollama. Necesita verificare matematica, curriculara, lingvistica si a exercitiilor inainte de publicare."
    }
  ],
  "verificare": {
    "status": "draft",
    "verificatMatematic": false,
    "verificatPrograma": false,
    "verificatExercitii": false,
    "verificatLimbaRomana": false,
    "observatii": [
      "Draft generat de BAC MATE Generator Local V6.0.",
      "Modelul local este utilizat ca redactor pedagogic, nu ca sursa de adevar matematic.",
      "Publicarea este interzisa pana la trecerea verificarilor obligatorii."
    ]
  }
};

export default continutLectie;
