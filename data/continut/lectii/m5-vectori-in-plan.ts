import type { ContinutLectie } from "../tipuri";

export const continutVectoriInPlan: ContinutLectie = {
  id: "m5-vectori-in-plan",
  slug: "m5-vectori-in-plan",
  modul: 5,
  numarLectie: 1,
  clasa: "Clasa a IX-a",
  profil: "M_mate-info",

  titlu: "Vectori în plan",

  subtitlu:
    "Înțelege ce este un vector și cum descriem direcția, sensul și lungimea lui.",

  descriere:
    "Lecția introduce noțiunea de vector în plan, originea și extremitatea unui vector, direcția, sensul și modulul, precum și noțiunile de vectori egali, vectori opuși și vector nul. Aceste idei reprezintă baza pentru operațiile cu vectori și pentru aplicațiile geometrice care urmează.",

  nivelPrincipal: "fundament",

  durataEstimataMinute: 25,

  prerechizite: [
    "Puncte și segmente în plan",
    "Lungimea unui segment",
    "Noțiunile intuitive de direcție și sens",
  ],

  obiective: [
    "Să recunoști un vector și notația lui.",
    "Să identifici originea și extremitatea unui vector.",
    "Să diferențiezi direcția, sensul și modulul unui vector.",
    "Să stabilești când doi vectori sunt egali.",
    "Să recunoști doi vectori opuși.",
    "Să identifici vectorul nul și modulul său.",
  ],

  termeniCheie: [
    "vector",
    "segment orientat",
    "origine",
    "extremitate",
    "direcție",
    "sens",
    "modul",
    "vector nul",
    "vector opus",
    "vectori egali",
  ],

  videoLectii: [
    {
      id: "m5-vp-video-1",
      numar: 1,
      titlu: "Ce este un vector?",
      durataMinute: 4,

      descriere:
        "Pornim de la un segment obișnuit și vedem cum apare ideea de vector atunci când alegem o orientare de la un punct spre altul.",

      scenariu: [
        "Începem cu o idee foarte simplă. Imaginează-ți două puncte distincte din plan, pe care le numim A și B.",
        "Dacă unim punctele A și B, obținem segmentul AB. Un segment obișnuit ne spune unde sunt cele două capete și ce lungime există între ele, dar nu ne spune că trebuie să mergem într-un anumit sens.",
        "Acum adăugăm o săgeată care pornește din A și ajunge în B. În acest moment nu mai avem doar un segment, ci un segment orientat.",
        "Segmentul orientat de la A la B reprezintă vectorul AB.",
        "În notația vectorului AB, punctul A este originea vectorului. Cu alte cuvinte, A este punctul din care pornește săgeata.",
        "Punctul B este extremitatea vectorului. Este punctul spre care arată săgeata.",
        "Ordinea literelor este foarte importantă. Prima literă indică originea, iar a doua literă indică extremitatea.",
        "Dacă scriem vectorul BA în loc de vectorul AB, nu mai vorbim despre aceeași orientare.",
        "Vectorul AB merge de la A spre B, în timp ce vectorul BA merge de la B spre A.",
        "Cele două segmente folosesc aceleași puncte, dar săgețile lor sunt orientate în sensuri opuse.",
        "Poți să îți imaginezi vectorul ca pe o instrucțiune de deplasare. Nu este suficient să știi între ce puncte te afli; contează și de unde pornești și spre ce punct te îndrepți.",
        "De exemplu, dacă A reprezintă casa ta și B reprezintă școala, deplasarea de la casă spre școală nu este aceeași cu deplasarea de la școală spre casă.",
        "Drumul poate avea aceeași lungime, dar orientarea este inversată.",
        "Această idee ne ajută să înțelegem de ce vectorii conțin mai multă informație decât un simplu segment.",
        "În desene, vectorul este reprezentat de obicei printr-o săgeată.",
        "În scriere matematică, putem nota vectorul determinat de A și B printr-o săgeată deasupra literelor AB.",
        "Când citești un exercițiu, primul lucru pe care trebuie să îl verifici este ordinea literelor.",
        "Dacă vezi vectorul MN, M este originea și N este extremitatea.",
        "Dacă vezi vectorul NM, N este originea și M este extremitatea.",
        "Nu trebuie să faci niciun calcul pentru această identificare. Este suficient să citești corect notația.",
        "Reține regula simplă: prima literă este punctul de plecare, iar a doua literă este punctul de sosire.",
        "Aceasta este prima idee fundamentală a lecției și o vom folosi în toate definițiile care urmează.",
      ],

      ideiDeRetinut: [
        "Un vector poate fi reprezentat printr-un segment orientat.",
        "Prima literă din notație reprezintă originea vectorului.",
        "A doua literă din notație reprezintă extremitatea vectorului.",
      ],

      exemplu: {
        titlu: "Exemplu rapid",
        enunt:
          "În vectorul →MN, care este originea și care este extremitatea?",

        rezolvareScurta: [
          "Citirea se face în ordinea literelor.",
          "Prima literă este M, deci M este originea.",
          "A doua literă este N, deci N este extremitatea.",
        ],

        raspuns: "Originea este M, iar extremitatea este N.",
      },

      verificareRapida: {
        intrebare: "În vectorul →AB, punctul A reprezintă:",

        variante: [
          "extremitatea",
          "originea",
          "modulul",
          "direcția",
        ],

        raspunsCorect: 1,

        explicatie:
          "Prima literă din notația unui vector indică originea, iar a doua literă indică extremitatea.",
      },
    },

    {
      id: "m5-vp-video-2",
      numar: 2,
      titlu: "Direcție, sens și modul",
      durataMinute: 5,

      descriere:
        "Înțelegem cele trei caracteristici esențiale ale unui vector: direcția, sensul și modulul.",

      scenariu: [
        "Acum știm că un vector poate fi reprezentat printr-un segment orientat. Următorul pas este să înțelegem ce informații sunt necesare pentru a descrie un vector.",
        "Pentru un vector nenul ne interesează trei caracteristici principale: direcția, sensul și modulul.",
        "Aceste trei noțiuni sunt diferite și este important să nu le confundăm.",
        "Începem cu direcția.",
        "Direcția unui vector este dată de dreapta pe care se află segmentul orientat sau de orice dreaptă paralelă cu aceasta.",
        "De exemplu, doi vectori desenați pe două drepte orizontale paralele au aceeași direcție.",
        "Ei nu trebuie să fie desenați pe exact aceeași dreaptă pentru a avea aceeași direcție.",
        "Acest lucru va deveni foarte important atunci când vom discuta despre vectori egali.",
        "A doua caracteristică este sensul.",
        "Sensul ne spune spre ce parte a direcției este orientată săgeata.",
        "Dacă avem o direcție orizontală, un vector poate avea sens spre dreapta sau sens spre stânga.",
        "Dacă avem o direcție verticală, putem avea, de exemplu, sens în sus sau sens în jos.",
        "Prin urmare, doi vectori pot avea aceeași direcție, dar sensuri diferite.",
        "Exact acest lucru se întâmplă pentru vectorii AB și BA atunci când A și B sunt puncte distincte.",
        "Ei se află pe aceeași dreaptă, deci au aceeași direcție.",
        "Dar AB este orientat de la A spre B, iar BA de la B spre A, deci sensurile sunt opuse.",
        "A treia caracteristică este modulul.",
        "Modulul unui vector reprezintă lungimea segmentului orientat care îl reprezintă.",
        "Pentru vectorul AB, modulul este egal cu lungimea segmentului AB.",
        "Dacă segmentul AB are lungimea 6 centimetri, atunci modulul vectorului AB este 6 centimetri.",
        "Modulul este o mărime numerică nenegativă.",
        "Asta înseamnă că modulul nu poate fi negativ.",
        "Un vector poate avea orientări diferite, dar lungimea sa este exprimată printr-un număr mai mare sau egal cu zero.",
        "Este foarte important să nu confundăm vectorul cu modulul său.",
        "Vectorul conține informații despre direcție, sens și modul.",
        "Modulul conține doar informația despre lungime.",
        "De aceea, notația vectorului și notația modulului sunt diferite.",
        "Când vezi săgeata deasupra literelor AB, este vorba despre vector.",
        "Când vezi vectorul între bare de modul, este vorba despre lungimea lui.",
        "Hai să folosim un exemplu simplu.",
        "Presupunem că AB are lungimea 6.",
        "Atunci modulul vectorului AB este tot 6.",
        "Dacă inversăm orientarea și analizăm vectorul BA, lungimea segmentului nu se schimbă.",
        "Prin urmare, și modulul vectorului BA este 6.",
        "Observăm însă că vectorii AB și BA nu sunt identici, pentru că sensul lor este diferit.",
        "Aceasta este diferența esențială dintre vector și modul.",
        "Când rezolvi un exercițiu, întreabă-te mereu separat: care este direcția, care este sensul și care este modulul?",
        "Dacă verifici aceste trei caracteristici în această ordine, vei evita majoritatea confuziilor de început.",
      ],

      ideiDeRetinut: [
        "Direcția este legată de dreapta suport sau de o dreaptă paralelă cu aceasta.",
        "Sensul arată orientarea săgeții pe direcția respectivă.",
        "Modulul reprezintă lungimea vectorului și este un număr nenegativ.",
      ],

      exemplu: {
        titlu: "Exemplu rapid",
        enunt:
          "Dacă segmentul AB are lungimea 6 cm, cât este |→AB|?",

        rezolvareScurta: [
          "Modulul vectorului este lungimea segmentului care îl reprezintă.",
          "AB = 6 cm.",
          "Prin urmare, |→AB| = 6 cm.",
        ],

        raspuns: "|→AB| = 6 cm.",
      },

      verificareRapida: {
        intrebare: "Ce reprezintă modulul unui vector?",

        variante: [
          "sensul vectorului",
          "lungimea vectorului",
          "originea vectorului",
          "poziția vectorului în plan",
        ],

        raspunsCorect: 1,

        explicatie:
          "Modulul unui vector reprezintă lungimea segmentului orientat care îl reprezintă.",
      },
    },

    {
      id: "m5-vp-video-3",
      numar: 3,
      titlu: "Vectori egali și vectori opuși",
      durataMinute: 5,

      descriere:
        "Învățăm criteriile după care recunoaștem vectorii egali și vectorii opuși.",

      scenariu: [
        "Avem acum toate elementele necesare pentru a compara doi vectori.",
        "Știm că pentru fiecare vector nenul analizăm direcția, sensul și modulul.",
        "Aceste trei caracteristici ne permit să stabilim dacă doi vectori sunt egali sau dacă sunt opuși.",
        "Începem cu vectorii egali.",
        "Doi vectori nenuli sunt egali dacă au aceeași direcție, același sens și același modul.",
        "Toate cele trei condiții trebuie să fie îndeplinite simultan.",
        "Dacă lipsește chiar și una dintre ele, vectorii nu mai sunt egali.",
        "Un lucru foarte important este că vectorii egali nu trebuie să fie desenați în același loc.",
        "De exemplu, putem avea un vector desenat în partea stângă a foii și alt vector desenat în partea dreaptă.",
        "Dacă au aceeași direcție, același sens și aceeași lungime, cei doi vectori sunt egali.",
        "Poziția lor efectivă în plan nu schimbă această concluzie.",
        "Imaginează-ți două săgeți orizontale, ambele orientate spre dreapta și ambele având lungimea 4 centimetri.",
        "Chiar dacă una este desenată mai sus și cealaltă mai jos, ele reprezintă vectori egali.",
        "Acum să vedem vectorii opuși.",
        "Doi vectori nenuli sunt opuși dacă au aceeași direcție, același modul, dar sensuri opuse.",
        "Așadar, față de cazul vectorilor egali se schimbă o singură caracteristică: sensul.",
        "Un exemplu fundamental este format de vectorii AB și BA, atunci când A și B sunt distincte.",
        "Ei se află pe aceeași dreaptă, deci au aceeași direcție.",
        "Lungimea segmentului AB este egală cu lungimea segmentului BA, deci au același modul.",
        "Dar AB este orientat de la A spre B, iar BA de la B spre A.",
        "Prin urmare, sensurile sunt opuse.",
        "Concluzia este că vectorul BA este opusul vectorului AB.",
        "În notație matematică putem scrie →BA = −→AB.",
        "Acest minus nu înseamnă că lungimea vectorului a devenit negativă.",
        "Modulul rămâne un număr nenegativ.",
        "Semnul minus indică vectorul opus.",
        "Este o distincție foarte importantă.",
        "Când compari doi vectori într-un exercițiu, folosește o metodă fixă.",
        "Pasul unu: compară direcțiile.",
        "Pasul doi: compară sensurile.",
        "Pasul trei: compară modulele.",
        "Dacă toate trei coincid, vectorii nenuli sunt egali.",
        "Dacă direcția și modulul coincid, dar sensurile sunt opuse, vectorii nenuli sunt opuși.",
        "Dacă direcțiile sunt diferite, vectorii nu pot fi egali și nici opuși în sensul acestor definiții.",
        "Această metodă te ajută să nu te bazezi doar pe aspectul desenului.",
        "Într-o problemă de geometrie, desenul poate să nu fie realizat la scară.",
        "Definițiile sunt cele care decid relația dintre vectori.",
        "Să verificăm metoda pe un caz scurt. Presupunem că vectorii u și v au aceeași direcție și același sens, dar modulul lui u este 4, iar modulul lui v este 6.",
        "Chiar dacă săgețile sunt orientate la fel, vectorii nu sunt egali, deoarece modulele lor sunt diferite.",
        "Acum schimbăm situația: u și v au aceeași direcție, module egale, dar sensuri opuse.",
        "În acest caz vectorii sunt opuși, iar relația se poate scrie v = −u.",
        "Observă din nou că semnul minus schimbă vectorul în opusul său, nu transformă modulul într-un număr negativ.",
        "La exerciții, evită concluziile rapide de tipul «arată la fel» sau «au aceeași lungime». Verifică întotdeauna toate informațiile cerute de definiție.",
        "Dacă ai aceeași direcție, același sens și același modul, poți concluziona egalitatea pentru vectorii nenuli.",
        "Dacă ai aceeași direcție, module egale și sensuri opuse, poți concluziona că vectorii nenuli sunt opuși.",
        "Vectorul nul este cazul special și îl analizăm separat în următorul video.",
        "Reține propoziția-cheie: pentru vectorii nenuli, egal înseamnă aceeași direcție, același sens și același modul; opus înseamnă aceeași direcție, modul egal și sens opus.",
      ],

      ideiDeRetinut: [
        "Vectori nenuli egali: aceeași direcție, același sens și același modul.",
        "Vectori nenuli opuși: aceeași direcție, același modul și sensuri opuse.",
        "Poziția în plan nu este un criteriu pentru egalitatea vectorilor.",
      ],

      exemplu: {
        titlu: "Exemplu rapid",
        enunt:
          "Vectorii nenuli u și v au aceeași direcție, același sens și module egale. Ce putem spune?",

        rezolvareScurta: [
          "Direcțiile sunt aceleași.",
          "Sensurile sunt aceleași.",
          "Modulele sunt egale.",
          "Sunt îndeplinite toate condițiile pentru egalitatea vectorilor.",
        ],

        raspuns: "u = v.",
      },

      verificareRapida: {
        intrebare:
          "Doi vectori nenuli au aceeași direcție și același modul, dar sensuri opuse. Ei sunt:",

        variante: [
          "egali",
          "opuși",
          "vectori nuli",
          "perpendiculari",
        ],

        raspunsCorect: 1,

        explicatie:
          "Doi vectori nenuli cu aceeași direcție și același modul, dar cu sensuri opuse, sunt vectori opuși.",
      },
    },

    {
      id: "m5-vp-video-4",
      numar: 4,
      titlu: "Vectorul nul și capcanele frecvente",
      durataMinute: 5,

      descriere:
        "Încheiem lecția cu vectorul nul, recapitulăm ideile esențiale și eliminăm cele mai frecvente confuzii.",

      scenariu: [
        "Mai avem o situație specială foarte importantă: vectorul nul.",
        "Până acum am discutat în principal despre vectori determinați de două puncte distincte.",
        "Dar ce se întâmplă dacă originea și extremitatea sunt același punct?",
        "Să luăm, de exemplu, vectorul AA.",
        "Originea este A, iar extremitatea este tot A.",
        "Segmentul AA are lungimea zero.",
        "Prin urmare, modulul vectorului AA este zero.",
        "Un astfel de vector se numește vector nul.",
        "Vectorul nul se notează de obicei cu zero vectorial, adică →0.",
        "Orice segment orientat care are aceeași origine și aceeași extremitate reprezintă vectorul nul.",
        "De exemplu, →AA, →BB, →MM sau →PP reprezintă același vector nul.",
        "Toate aceste reprezentări au modulul zero.",
        "Vectorul nul este un caz special și apare frecvent în calculele vectoriale pe care le vei învăța mai târziu.",
        "Pentru el nu folosim mecanic descrierea prin direcție și sens ca pentru un vector nenul. Ceea ce trebuie să recunoști acum este faptul esențial că modulul său este zero.",
        "Acum recapitulăm și cele mai frecvente greșeli.",
        "Prima greșeală este să considerăm că vectorul AB este egal cu vectorul BA.",
        "Dacă A și B sunt distincte, această afirmație este falsă.",
        "Vectorii au aceeași direcție și același modul, dar sensuri opuse.",
        "Așadar, →BA este opusul lui →AB.",
        "A doua greșeală este să confundăm vectorul cu modulul său.",
        "Vectorul →AB nu este același obiect matematic cu modulul |→AB|.",
        "Vectorul este un obiect vectorial, în timp ce modulul său este o lungime exprimată printr-un număr nenegativ.",
        "De aceea nu trebuie să tratăm notațiile →AB și |→AB| ca și cum ar reprezenta același lucru.",
        "A treia greșeală este să credem că doi vectori pot fi egali doar dacă pornesc din același punct.",
        "Aceasta este fals.",
        "Poziția geometrică exactă în desen nu este criteriul pentru egalitatea vectorilor.",
        "Pentru vectorii nenuli contează direcția, sensul și modulul.",
        "A patra greșeală este să confundăm direcția cu sensul.",
        "Două săgeți orientate una spre dreapta și una spre stânga pe două drepte orizontale au aceeași direcție, dar sensuri opuse.",
        "Direcția descrie dreapta suport sau o dreaptă paralelă cu aceasta.",
        "Sensul descrie una dintre cele două orientări posibile pe acea direcție.",
        "Mai există o verificare simplă care merită memorată: dacă modulul unui vector este zero, atunci vectorul este vectorul nul.",
        "Reciproc, vectorul nul are întotdeauna modulul zero.",
        "Această legătură te ajută să recunoști imediat situațiile în care originea și extremitatea coincid.",
        "De exemplu, dacă într-un exercițiu apare vectorul →MM, nu trebuie să cauți o lungime ascunsă.",
        "Punctul de plecare și punctul de sosire sunt același, deci |→MM| = 0 și →MM = →0.",
        "Dacă apare vectorul →AB cu A și B distincte, atunci segmentul AB are lungime strict pozitivă, deci →AB nu este vectorul nul.",
        "Un alt control util este să verifici notațiile înainte de calcule.",
        "→AB este un vector, iar |→AB| este un număr.",
        "Cele două simboluri nu pot fi înlocuite unul cu celălalt într-o egalitate fără să ții cont de tipul obiectului matematic.",
        "În problemele mai lungi, această atenție la notație previne erori care se propagă în pașii următori.",
        "Hai să facem o recapitulare completă.",
        "Un vector poate fi reprezentat printr-un segment orientat.",
        "În notația →AB, prima literă este originea, iar a doua este extremitatea.",
        "Pentru un vector nenul analizăm direcția, sensul și modulul.",
        "Doi vectori nenuli egali au aceeași direcție, același sens și același modul.",
        "Doi vectori nenuli opuși au aceeași direcție și același modul, dar sensuri opuse.",
        "Vectorul nul are modulul egal cu zero.",
        "Dacă reții aceste reguli și le verifici sistematic, ai baza necesară pentru lecțiile următoare despre operații cu vectori.",
      ],

      ideiDeRetinut: [
        "Dacă originea și extremitatea coincid, obținem vectorul nul.",
        "Modulul vectorului nul este 0.",
        "Vectorul și modulul său sunt obiecte matematice diferite.",
      ],

      exemplu: {
        titlu: "Exemplu rapid",
        enunt: "Ce este vectorul →PP?",

        rezolvareScurta: [
          "Originea este P.",
          "Extremitatea este tot P.",
          "Originea și extremitatea coincid.",
          "Prin urmare, vectorul este vectorul nul.",
        ],

        raspuns: "→PP = →0.",
      },

      verificareRapida: {
        intrebare: "Care este modulul vectorului →MM?",

        variante: [
          "1",
          "−1",
          "0",
          "nu se poate determina",
        ],

        raspunsCorect: 2,

        explicatie:
          "Vectorul →MM este vectorul nul, deoarece originea și extremitatea coincid. Modulul său este 0.",
      },
    },
  ],

  definitii: [
    {
      termen: "Vector",
      definitie:
        "Un vector poate fi reprezentat printr-un segment orientat. Dacă A este originea și B este extremitatea, vectorul se notează →AB.",
      observatie:
        "Ordinea literelor este importantă: pentru A și B distincte, →AB și →BA au sensuri opuse.",
    },

    {
      termen: "Originea vectorului",
      definitie:
        "Originea este punctul din care pornește segmentul orientat.",
    },

    {
      termen: "Extremitatea vectorului",
      definitie:
        "Extremitatea este punctul spre care este orientat vectorul.",
    },

    {
      termen: "Direcția vectorului",
      definitie:
        "Pentru un vector nenul, direcția este dată de dreapta suport a segmentului orientat sau de orice dreaptă paralelă cu aceasta.",
    },

    {
      termen: "Sensul vectorului",
      definitie:
        "Pentru un vector nenul, sensul indică una dintre cele două orientări posibile pe direcția vectorului.",
    },

    {
      termen: "Modulul vectorului",
      definitie:
        "Modulul unui vector este lungimea segmentului orientat care îl reprezintă.",
      observatie:
        "Pentru vectorul →AB, modulul se notează |→AB| și este egal cu lungimea segmentului AB.",
    },

    {
      termen: "Vectori egali",
      definitie:
        "Doi vectori nenuli sunt egali dacă au aceeași direcție, același sens și același modul. Vectorul nul este tratat separat ca un caz special.",
    },

    {
      termen: "Vectorul nul",
      definitie:
        "Vectorul nul este reprezentat de un segment orientat cu originea și extremitatea în același punct și are modulul egal cu 0.",
    },

    {
      termen: "Vectorul opus",
      definitie:
        "Pentru un vector nenul, vectorul opus are aceeași direcție și același modul, dar sens opus.",
      observatie:
        "Vectorul nul este propriul său opus.",
    },
  ],

  teorie: [
    {
      id: "m5-vp-teorie-1",
      titlu: "Segment orientat și notația vectorului",
      explicatie:
        "Un vector poate fi reprezentat printr-un segment orientat. În notația →AB, A reprezintă originea, iar B reprezintă extremitatea. Ordinea punctelor este esențială deoarece schimbarea lor inversează sensul atunci când A și B sunt distincte.",

      ideiCheie: [
        "→AB pornește din A și ajunge în B.",
        "→BA pornește din B și ajunge în A.",
        "Pentru A și B distincte, →AB și →BA au sensuri opuse.",
      ],
    },

    {
      id: "m5-vp-teorie-2",
      titlu: "Direcție, sens și modul",
      explicatie:
        "Pentru caracterizarea unui vector nenul analizăm direcția, sensul și modulul. Aceste noțiuni trebuie tratate separat. Vectorul nul este cazul special cu modulul 0 și este tratat separat în această lecție.",

      ideiCheie: [
        "Direcția este dată de dreapta suport sau de o dreaptă paralelă cu aceasta.",
        "Sensul arată orientarea pe direcția respectivă.",
        "Modulul reprezintă lungimea vectorului și este nenegativ.",
      ],
    },

    {
      id: "m5-vp-teorie-3",
      titlu: "Vectori egali",
      explicatie:
        "Doi vectori nenuli sunt egali atunci când au aceeași direcție, același sens și același modul.",

      ideiCheie: [
        "Cele trei condiții trebuie verificate simultan.",
        "Vectorii pot avea origini diferite și totuși pot fi egali.",
        "Poziția lor în desen nu determină egalitatea.",
      ],
    },

    {
      id: "m5-vp-teorie-4",
      titlu: "Vectori opuși",
      explicatie:
        "Doi vectori nenuli sunt opuși dacă au aceeași direcție și același modul, dar sensuri opuse.",

      ideiCheie: [
        "Pentru A și B distincte, →AB și →BA sunt vectori opuși.",
        "Opusul vectorului v se notează −v.",
        "Semnul minus indică vectorul opus, nu un modul negativ.",
      ],
    },

    {
      id: "m5-vp-teorie-5",
      titlu: "Vectorul nul",
      explicatie:
        "Dacă originea și extremitatea coincid, obținem vectorul nul. Modulul acestuia este egal cu 0.",

      ideiCheie: [
        "→AA este vector nul.",
        "|→AA| = 0.",
        "Vectorul nul se notează de obicei cu →0.",
      ],
    },
  ],

  formule: [
    {
      id: "m5-vp-formula-1",
      nume: "Modulul vectorului determinat de două puncte",
      formula: "|→AB| = AB",
      explicatie:
        "Modulul vectorului →AB este egal cu lungimea segmentului AB.",
      conditii: [
        "A și B sunt puncte din plan.",
      ],
      exempluScurt:
        "Dacă AB = 5, atunci |→AB| = 5.",
    },

    {
      id: "m5-vp-formula-2",
      nume: "Vectori determinați de aceleași două puncte în ordine inversă",
      formula: "→BA = −→AB",
      explicatie:
        "Pentru două puncte distincte A și B, inversarea originii și extremității păstrează direcția și modulul, dar inversează sensul.",
      conditii: [
        "A și B sunt puncte distincte.",
      ],
      exempluScurt:
        "Opusul vectorului →AB este vectorul →BA.",
    },

    {
      id: "m5-vp-formula-3",
      nume: "Modulul vectorului nul",
      formula: "|→0| = 0",
      explicatie:
        "Vectorul nul are modulul egal cu zero.",
      conditii: [
        "Originea și extremitatea vectorului coincid.",
      ],
      exempluScurt:
        "|→MM| = 0.",
    },
  ],

  exempleRezolvate: [
    {
      id: "m5-vp-exemplu-1",
      titlu: "Vector și vector opus",
      enunt:
        "Fie două puncte distincte A și B. Compară vectorii →AB și →BA.",
      nivel: "fundament",

      pasi: [
        {
          numar: 1,
          titlu: "Comparăm direcția",
          continut:
            "Ambii vectori sunt determinați de dreapta AB, deci au aceeași direcție.",
        },

        {
          numar: 2,
          titlu: "Comparăm modulele",
          continut:
            "|→AB| = AB și |→BA| = BA. Deoarece AB = BA ca lungimi, modulele sunt egale.",
        },

        {
          numar: 3,
          titlu: "Comparăm sensurile",
          continut:
            "→AB este orientat de la A spre B, iar →BA este orientat de la B spre A. Sensurile sunt opuse.",
        },

        {
          numar: 4,
          titlu: "Formulăm concluzia",
          continut:
            "Vectorii au aceeași direcție și același modul, dar sensuri opuse, deci sunt vectori opuși.",
        },
      ],

      raspunsFinal:
        "Vectorii →AB și →BA sunt opuși: →BA = −→AB.",

      verificare:
        "Aceeași direcție + module egale + sensuri opuse = vectori opuși.",
    },

    {
      id: "m5-vp-exemplu-2",
      titlu: "Recunoașterea vectorului nul",
      enunt:
        "Punctul M este fix. Ce putem spune despre vectorul →MM?",
      nivel: "fundament",

      pasi: [
        {
          numar: 1,
          titlu: "Identificăm originea și extremitatea",
          continut:
            "Originea și extremitatea vectorului sunt același punct M.",
        },

        {
          numar: 2,
          titlu: "Determinăm modulul",
          continut:
            "Segmentul MM are lungimea 0, deci |→MM| = 0.",
        },

        {
          numar: 3,
          titlu: "Identificăm tipul vectorului",
          continut:
            "Un vector cu originea egală cu extremitatea este vectorul nul.",
        },
      ],

      raspunsFinal:
        "→MM = →0.",

      verificare:
        "|→MM| = 0.",
    },

    {
      id: "m5-vp-exemplu-3",
      titlu: "Când sunt doi vectori egali?",
      enunt:
        "Vectorii nenuli u și v au aceeași direcție, același sens și modulele |u| = 7 și |v| = 7. Ce relație există între ei?",
      nivel: "standard-bac",

      pasi: [
        {
          numar: 1,
          titlu: "Verificăm direcția",
          continut:
            "Direcția celor doi vectori este aceeași.",
        },

        {
          numar: 2,
          titlu: "Verificăm sensul",
          continut:
            "Sensul celor doi vectori este același.",
        },

        {
          numar: 3,
          titlu: "Verificăm modulul",
          continut:
            "Avem |u| = |v| = 7, deci modulele sunt egale.",
        },

        {
          numar: 4,
          titlu: "Aplicăm definiția",
          continut:
            "Sunt îndeplinite simultan toate cele trei condiții pentru egalitatea vectorilor nenuli.",
        },
      ],

      raspunsFinal:
        "u = v.",

      verificare:
        "Aceeași direcție + același sens + același modul = vectori egali.",
    },

    {
      id: "m5-vp-exemplu-4",
      titlu: "Aceeași direcție nu înseamnă automat vectori egali",
      enunt:
        "Vectorii nenuli u și v au aceeași direcție și același sens, dar |u| = 4 și |v| = 6. Sunt vectorii egali?",
      nivel: "standard-bac",

      pasi: [
        {
          numar: 1,
          titlu: "Verificăm direcția",
          continut:
            "Vectorii au aceeași direcție.",
        },

        {
          numar: 2,
          titlu: "Verificăm sensul",
          continut:
            "Vectorii au același sens.",
        },

        {
          numar: 3,
          titlu: "Verificăm modulele",
          continut:
            "|u| = 4 și |v| = 6, deci modulele nu sunt egale.",
        },

        {
          numar: 4,
          titlu: "Formulăm concluzia",
          continut:
            "Pentru egalitatea vectorilor trebuie îndeplinite toate cele trei condiții. Deoarece modulele sunt diferite, vectorii nu sunt egali.",
        },
      ],

      raspunsFinal:
        "Nu. Vectorii u și v nu sunt egali.",

      verificare:
        "Egalitatea vectorilor cere și egalitatea modulelor.",
    },
  ],

  greseliFrecvente: [
    {
      greseala:
        "Elevul consideră că →AB = →BA.",

      deCeEsteGresit:
        "Pentru A și B distincte, cei doi vectori au aceeași direcție și același modul, dar sensuri opuse.",

      cumOEviti:
        "Privește întotdeauna ordinea literelor: prima literă este originea, iar a doua este extremitatea.",
    },

    {
      greseala:
        "Elevul confundă vectorul cu modulul său.",

      deCeEsteGresit:
        "Vectorul și modulul său sunt obiecte matematice diferite. Modulul este lungimea vectorului și este un număr nenegativ.",

      cumOEviti:
        "Separă notațiile: →AB reprezintă vectorul, iar |→AB| reprezintă modulul său.",
    },

    {
      greseala:
        "Elevul confundă direcția cu sensul.",

      deCeEsteGresit:
        "Doi vectori nenuli pot avea aceeași direcție și totuși să aibă sensuri opuse.",

      cumOEviti:
        "Gândește direcția ca pe dreapta suport sau o dreaptă paralelă cu aceasta, iar sensul ca pe orientarea săgeții.",
    },

    {
      greseala:
        "Elevul crede că doi vectori trebuie să aibă aceeași origine pentru a fi egali.",

      deCeEsteGresit:
        "Egalitatea vectorilor nenuli depinde de direcție, sens și modul, nu de poziția lor în desen.",

      cumOEviti:
        "Verifică cele trei caracteristici ale vectorilor și nu locul în care sunt reprezentați.",
    },

    {
      greseala:
        "Elevul consideră că un vector poate avea modul negativ.",

      deCeEsteGresit:
        "Modulul reprezintă o lungime, iar lungimile sunt numere nenegative.",

      cumOEviti:
        "Reține că |v| ≥ 0 pentru orice vector v.",
    },
  ],

  exercitii: [
    {
      id: "m5-vp-ex-1",
      nivel: "fundament",
      tip: "alegere-multipla",

      enunt:
        "Care este opusul vectorului →AB, dacă A și B sunt puncte distincte?",

      variante: [
        "→BA",
        "→AA",
        "→BB",
        "→AB",
      ],

      raspunsCorect:
        "→BA",

      rezolvare: [
        {
          numar: 1,
          titlu: "Observăm orientarea",
          continut:
            "Vectorul →AB este orientat de la A spre B.",
        },

        {
          numar: 2,
          titlu: "Inversăm sensul",
          continut:
            "Vectorul cu aceeași direcție și același modul, dar cu sens opus, este →BA.",
        },
      ],

      explicatieFinala:
        "Pentru A și B distincte, →BA = −→AB.",

      punctaj: 1,

      competenta:
        "Identificarea vectorului opus.",

      gresealaFrecventa:
        "Confundarea vectorului opus cu vectorul inițial.",
    },

    {
      id: "m5-vp-ex-2",
      nivel: "fundament",
      tip: "raspuns-scurt",

      enunt:
        "Dacă AB = 8 cm, determină |→AB|.",

      raspunsCorect:
        "8 cm",

      rezolvare: [
        {
          numar: 1,
          titlu: "Folosim definiția modulului",
          continut:
            "Modulul vectorului →AB este lungimea segmentului AB.",
        },

        {
          numar: 2,
          titlu: "Înlocuim valoarea",
          continut:
            "|→AB| = AB = 8 cm.",
        },
      ],

      explicatieFinala:
        "Modulul vectorului este 8 cm.",

      punctaj: 1,

      competenta:
        "Determinarea modulului unui vector.",
    },

    {
      id: "m5-vp-ex-3",
      nivel: "fundament",
      tip: "alegere-multipla",

      enunt:
        "În vectorul →PQ, punctul Q este:",

      variante: [
        "originea",
        "extremitatea",
        "modulul",
        "direcția",
      ],

      raspunsCorect:
        "extremitatea",

      rezolvare: [
        {
          numar: 1,
          titlu: "Citirea notației",
          continut:
            "Prima literă indică originea, iar a doua indică extremitatea.",
        },

        {
          numar: 2,
          titlu: "Aplicăm regula",
          continut:
            "În →PQ, P este originea și Q este extremitatea.",
        },
      ],

      explicatieFinala:
        "Q este extremitatea vectorului →PQ.",

      punctaj: 1,

      competenta:
        "Identificarea originii și extremității unui vector.",
    },

    {
      id: "m5-vp-ex-4",
      nivel: "standard-bac",
      tip: "alegere-multipla",

      enunt:
        "Doi vectori nenuli au aceeași direcție și același modul, dar sensuri opuse. Ei sunt:",

      variante: [
        "egali",
        "opuși",
        "vectori nuli",
        "perpendiculari",
      ],

      raspunsCorect:
        "opuși",

      rezolvare: [
        {
          numar: 1,
          titlu: "Identificăm caracteristicile",
          continut:
            "Direcția este aceeași, modulele sunt egale, iar sensurile sunt opuse.",
        },

        {
          numar: 2,
          titlu: "Aplicăm definiția",
          continut:
            "Acestea sunt exact condițiile pentru doi vectori nenuli opuși.",
        },
      ],

      explicatieFinala:
        "Cei doi vectori sunt opuși.",

      punctaj: 1,

      competenta:
        "Recunoașterea relației dintre doi vectori.",
    },

    {
      id: "m5-vp-ex-5",
      nivel: "standard-bac",
      tip: "raspuns-scurt",

      enunt:
        "Determină modulul vectorului →PP.",

      raspunsCorect:
        "0",

      rezolvare: [
        {
          numar: 1,
          titlu: "Observăm originea și extremitatea",
          continut:
            "Originea și extremitatea coincid în punctul P.",
        },

        {
          numar: 2,
          titlu: "Identificăm vectorul",
          continut:
            "→PP este vectorul nul.",
        },

        {
          numar: 3,
          titlu: "Determinăm modulul",
          continut:
            "Vectorul nul are modulul 0, deci |→PP| = 0.",
        },
      ],

      explicatieFinala:
        "Vectorul nul are modulul egal cu 0.",

      punctaj: 1,

      competenta:
        "Recunoașterea vectorului nul.",
    },

    {
      id: "m5-vp-ex-6",
      nivel: "standard-bac",
      tip: "alegere-multipla",

      enunt:
        "Vectorii nenuli u și v au aceeași direcție, același sens, |u| = 5 și |v| = 7. Care afirmație este corectă?",

      variante: [
        "u = v",
        "u = −v",
        "u și v nu sunt egali",
        "u și v sunt vectori nuli",
      ],

      raspunsCorect:
        "u și v nu sunt egali",

      rezolvare: [
        {
          numar: 1,
          titlu: "Verificăm direcția",
          continut:
            "Direcția este aceeași.",
        },

        {
          numar: 2,
          titlu: "Verificăm sensul",
          continut:
            "Sensul este același.",
        },

        {
          numar: 3,
          titlu: "Verificăm modulele",
          continut:
            "|u| = 5 și |v| = 7, deci modulele sunt diferite.",
        },

        {
          numar: 4,
          titlu: "Aplicăm definiția",
          continut:
            "Vectorii egali trebuie să aibă și module egale. Condiția nu este îndeplinită.",
        },
      ],

      explicatieFinala:
        "u și v nu sunt egali deoarece modulele lor sunt diferite.",

      punctaj: 1,

      competenta:
        "Aplicarea criteriilor de egalitate a vectorilor.",
    },

    {
      id: "m5-vp-ex-7",
      nivel: "avansat",
      tip: "rezolvare-completa",

      enunt:
        "Vectorii nenuli u și v au aceeași direcție și module egale. Precizează ce informație suplimentară este necesară pentru a decide dacă u = v sau u = −v.",

      raspunsCorect:
        "Trebuie comparate sensurile celor doi vectori.",

      rezolvare: [
        {
          numar: 1,
          titlu: "Folosim informațiile cunoscute",
          continut:
            "Știm deja că vectorii au aceeași direcție și module egale.",
        },

        {
          numar: 2,
          titlu: "Identificăm informația lipsă",
          continut:
            "Pentru a diferenția egalitatea de opoziție trebuie să comparăm sensurile.",
        },

        {
          numar: 3,
          titlu: "Stabilim primul caz",
          continut:
            "Dacă sensurile sunt aceleași, atunci u = v.",
        },

        {
          numar: 4,
          titlu: "Stabilim al doilea caz",
          continut:
            "Dacă sensurile sunt opuse, atunci u = −v.",
        },
      ],

      explicatieFinala:
        "Sensul este informația suplimentară necesară pentru a diferenția cele două situații.",

      punctaj: 2,

      competenta:
        "Compararea și caracterizarea vectorilor.",
    },

    {
      id: "m5-vp-ex-8",
      nivel: "avansat",
      tip: "rezolvare-completa",

      enunt:
        "Fie punctele distincte A și B. Arată că vectorii →AB și →BA au module egale, dar nu sunt egali.",

      raspunsCorect:
        "Au module egale și sensuri opuse, deci sunt vectori opuși, nu egali.",

      rezolvare: [
        {
          numar: 1,
          titlu: "Comparăm modulele",
          continut:
            "|→AB| = AB și |→BA| = BA. Lungimea segmentului AB este aceeași indiferent de ordinea capetelor, deci modulele sunt egale.",
        },

        {
          numar: 2,
          titlu: "Comparăm direcția",
          continut:
            "Ambii vectori sunt determinați de aceeași dreaptă AB, deci au aceeași direcție.",
        },

        {
          numar: 3,
          titlu: "Comparăm sensurile",
          continut:
            "→AB este orientat de la A spre B, iar →BA de la B spre A, deci sensurile sunt opuse.",
        },

        {
          numar: 4,
          titlu: "Concluzionăm",
          continut:
            "Deoarece sensurile sunt diferite, vectorii nu sunt egali. Ei sunt vectori opuși.",
        },
      ],

      explicatieFinala:
        "Egalitatea modulelor nu este suficientă pentru egalitatea vectorilor.",

      punctaj: 2,

      competenta:
        "Justificarea relației dintre vectori folosind definițiile.",
    },
  ],

  rezumat: {
    ideiDeRetinut: [
      "Un vector poate fi reprezentat printr-un segment orientat.",
      "În →AB, A este originea și B este extremitatea.",
      "Un vector nenul este caracterizat prin direcție, sens și modul; vectorul nul este cazul special cu modulul 0.",
      "Modulul unui vector reprezintă lungimea sa și este nenegativ.",
      "Doi vectori nenuli egali au aceeași direcție, același sens și același modul.",
      "Doi vectori nenuli opuși au aceeași direcție și același modul, dar sensuri opuse.",
      "Vectorul nul are originea și extremitatea în același punct și modulul 0.",
    ],

    formuleDeRetinut: [
      "|→AB| = AB",
      "→BA = −→AB",
      "|→0| = 0",
    ],

    checklistElev: [
      "Pot identifica originea și extremitatea unui vector.",
      "Pot explica diferența dintre direcție și sens pentru un vector nenul.",
      "Pot explica diferența dintre vector și modulul său.",
      "Pot determina modulul unui vector atunci când cunosc lungimea segmentului.",
      "Pot recunoaște vectori egali.",
      "Pot recunoaște vectori opuși.",
      "Pot identifica vectorul nul.",
      "Pot explica de ce →AB și →BA nu sunt egali atunci când A și B sunt distincte.",
    ],
  },

  legaturaCuBac: {
    importanta:
      "Noțiunile elementare despre vectori constituie baza pentru operațiile cu vectori și pentru utilizarea metodelor vectoriale în geometrie. Stăpânirea definițiilor reduce erorile în exercițiile ulterioare în care apar egalități, sume, diferențe și relații între vectori.",

    tipuriCerinte: [
      "Identificarea originii și extremității unui vector.",
      "Compararea direcției, sensului și modulului unor vectori nenuli.",
      "Recunoașterea vectorilor egali sau opuși.",
      "Determinarea modulului unui vector.",
      "Identificarea vectorului nul.",
      "Justificarea unor relații vectoriale elementare.",
    ],

    strategie: [
      "Identifică originea și extremitatea din ordinea literelor.",
      "Verifică mai întâi dacă ai un vector nul sau un vector nenul.",
      "Pentru vectorii nenuli, compară separat direcția.",
      "Compară separat sensul.",
      "Compară modulele.",
      "Aplică definiția corespunzătoare numai după ce ai verificat toate caracteristicile necesare.",
    ],
  },

  surse: [
    {
      tip: "programa-oficiala",
      titlu:
        "Programa de examen pentru disciplina Matematică — Bacalaureat, profil M_mate-info",
      observatie:
        "Lecția acoperă partea introductivă a temei oficiale „Vectori în plan”: segment orientat și noțiunile fundamentale despre vectori. Operațiile cu vectori, înmulțirea cu scalar, coliniaritatea și descompunerea sunt tratate separat în lecțiile următoare ale modulului BAC MATE.",
    },

    {
      tip: "verificare-interna",
      titlu:
        "BAC MATE — audit matematic, pedagogic și lingvistic",
      observatie:
        "Au fost verificate definițiile, exemplele, formulele, cele 8 exerciții, răspunsurile, explicațiile și scenariile video.",
    },
  ],

 verificare: {
 status: "publicabil",

  verificatMatematic: true,
  verificatPrograma: true,
  verificatExercitii: true,
  verificatLimbaRomana: true,

  ultimaVerificare: "2026-09-13",

  observatii: [
    "Prima lecție-etalon verificată pentru BAC MATE Content Engine V1.",
    "Conținutul matematic a fost verificat separat de validarea structurală automată.",
    "Încadrarea curriculară a fost verificată pentru profilul M_mate-info.",
    "Cele 8 exerciții și răspunsurile lor au fost verificate.",
    "Formulările în limba română și explicațiile pedagogice au fost revizuite.",
    "Cele patru scenarii video respectă structura pedagogică stabilită pentru BAC MATE.",
    "Integrarea exercițiilor Content Engine în mini-test a fost verificată funcțional.",
    "Lecția nu este încă publicabilă. Publicarea rămâne un gate separat.",
  ],
  },
};