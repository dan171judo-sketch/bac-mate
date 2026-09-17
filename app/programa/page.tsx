"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { lectii as lectiiConstruite } from "../../data/lectii/index";
import { createClient } from "../../lib/supabase/client";

type Modul = {
  id: string;
  clasa: string;
  icon: string;
  titlu: string;
  descriere: string;
  lectii: string[];
};

type ProgresSupabase = {
  lesson_id: string;
  completed: boolean;
};

type Filtru = "toate" | "disponibile" | "finalizate";

type ConfigurareLectie = {
  href: string;
  storageKey: string;
};

const moduleMateInfo: Modul[] = [
  {
    id: "numere-logica",
    clasa: "Clasa a IX-a",
    icon: "🔢",
    titlu: "Numere reale, logică și mulțimi",
    descriere:
      "Fundamentele algebrice și logice necesare pentru rezolvarea problemelor de Bac.",
    lectii: [
      "Mulțimi de numere și operații cu numere reale",
      "Estimări și aproximări",
      "Modulul unui număr real",
      "Intervale de numere reale",
      "Propoziții și predicate",
      "Cuantificatori",
      "Negație, conjuncție, disjuncție și implicație",
      "Operații cu mulțimi",
      "Inducția matematică",
      "Demonstrații și raționamente logice",
    ],
  },

  {
    id: "siruri-functii",
    clasa: "Clasa a IX-a",
    icon: "📈",
    titlu: "Șiruri și funcții",
    descriere:
      "De la citirea unui grafic până la proprietățile fundamentale ale funcțiilor.",
    lectii: [
      "Reper cartezian și produs cartezian",
      "Noțiunea de funcție",
      "Domeniu, codomeniu și imagine",
      "Graficul unei funcții",
      "Lecturi grafice",
      "Egalitatea a două funcții",
      "Restricția unei funcții",
      "Monotonie și mărginire",
      "Paritate și imparitate",
      "Periodicitate",
      "Compunerea funcțiilor",
      "Șiruri de numere reale",
      "Progresii aritmetice",
      "Progresii geometrice",
    ],
  },

  {
    id: "gradul-intai",
    clasa: "Clasa a IX-a",
    icon: "📏",
    titlu: "Funcția și ecuațiile de gradul I",
    descriere:
      "Modele liniare, ecuații, inecuații și interpretarea lor grafică.",
    lectii: [
      "Funcția f(x) = ax + b",
      "Graficul funcției de gradul I",
      "Monotonia funcției de gradul I",
      "Semnul funcției de gradul I",
      "Ecuații de gradul I",
      "Inecuații de gradul I",
      "Sisteme de ecuații liniare",
      "Interpretarea geometrică a sistemelor",
      "Probleme modelate prin funcții liniare",
    ],
  },

  {
    id: "gradul-doi",
    clasa: "Clasa a IX-a",
    icon: "〽️",
    titlu: "Funcția și ecuația de gradul al II-lea",
    descriere:
      "Ecuații de gradul II, parabole, semn și probleme clasice de Bac.",
    lectii: [
      "Ecuația de gradul al II-lea",
      "Discriminantul și numărul de soluții",
      "Formulele rădăcinilor",
      "Relațiile lui Viète",
      "Funcția de gradul al II-lea",
      "Graficul parabolei",
      "Vârful parabolei",
      "Axa de simetrie",
      "Intersecția parabolei cu axele",
      "Semnul funcției de gradul al II-lea",
      "Inecuații de gradul al II-lea",
      "Poziția relativă dreaptă-parabolă",
      "Probleme cu parametru",
    ],
  },

  {
    id: "vectori-trigonometrie",
    clasa: "Clasa a IX-a",
    icon: "📐",
    titlu: "Vectori, trigonometrie și geometrie",
    descriere:
      "Instrumentele geometrice cerute în programa M_mate-info.",
    lectii: [
      "Vectori în plan",
      "Adunarea și scăderea vectorilor",
      "Înmulțirea unui vector cu un scalar",
      "Coliniaritatea vectorilor",
      "Descompunerea vectorilor",
      "Coordonate și vectori",
      "Sinus, cosinus, tangentă și cotangentă",
      "Valori trigonometrice uzuale",
      "Reducerea la primul cadran",
      "Formule trigonometrice",
      "Formule de adunare și scădere",
      "Formule pentru unghi dublu",
      "Transformarea sumei în produs",
      "Teorema sinusurilor",
      "Teorema cosinusului",
      "Lungimi și unghiuri în triunghi",
      "Aria triunghiului",
      "Cercul înscris și cercul circumscris",
    ],
  },

  {
    id: "puteri-radicali-log",
    clasa: "Clasa a X-a",
    icon: "√",
    titlu: "Puteri, radicali și logaritmi",
    descriere:
      "Calcul algebric avansat folosit în multe exerciții de Bac.",
    lectii: [
      "Puteri cu exponent întreg",
      "Puteri cu exponent rațional",
      "Puteri cu exponent real",
      "Radical de ordin n",
      "Proprietățile radicalilor",
      "Operații cu radicali",
      "Logaritmul unui număr pozitiv",
      "Proprietățile logaritmilor",
      "Schimbarea bazei unui logaritm",
      "Calcule cu puteri, radicali și logaritmi",
    ],
  },

  {
    id: "functii-speciale",
    clasa: "Clasa a X-a",
    icon: "📊",
    titlu:
      "Funcții exponențiale, logaritmice și trigonometrice",
    descriere:
      "Funcții speciale, proprietăți și ecuații specifice.",
    lectii: [
      "Funcția putere",
      "Funcția radical",
      "Funcția exponențială",
      "Funcția logaritmică",
      "Funcții trigonometrice",
      "Funcții trigonometrice inverse",
      "Injectivitate",
      "Surjectivitate",
      "Bijectivitate",
      "Funcție inversabilă",
      "Funcția inversă",
      "Ecuații cu radicali",
      "Ecuații exponențiale",
      "Ecuații logaritmice",
      "Ecuații trigonometrice",
    ],
  },

  {
    id: "complexe",
    clasa: "Clasa a X-a",
    icon: "ℂ",
    titlu: "Numere complexe",
    descriere:
      "Calcule și ecuații în mulțimea numerelor complexe.",
    lectii: [
      "Forma algebrică a unui număr complex",
      "Partea reală și partea imaginară",
      "Egalitatea numerelor complexe",
      "Adunarea și scăderea numerelor complexe",
      "Înmulțirea numerelor complexe",
      "Conjugatul unui număr complex",
      "Împărțirea numerelor complexe",
      "Ecuații de gradul al II-lea în numere complexe",
      "Ecuații bipătrate",
    ],
  },

  {
    id: "combinatorica-probabilitati",
    clasa: "Clasa a X-a",
    icon: "🎲",
    titlu: "Combinatorică și probabilități",
    descriere:
      "Tehnici de numărare și calculul probabilităților.",
    lectii: [
      "Principiul multiplicării",
      "Permutări",
      "Aranjamente",
      "Combinări",
      "Probleme de numărare",
      "Evenimente aleatoare",
      "Operații cu evenimente",
      "Evenimente egal probabile",
      "Probabilitatea unui eveniment",
      "Probabilitatea evenimentelor compuse",
      "Aplicații financiare",
    ],
  },

  {
    id: "geometrie-analitica",
    clasa: "Clasa a X-a",
    icon: "📍",
    titlu: "Geometrie analitică",
    descriere:
      "Drepte, coordonate, distanțe și arii în plan.",
    lectii: [
      "Coordonate în plan",
      "Vectori prin coordonate",
      "Ecuația unei drepte",
      "Dreapta determinată de un punct și o direcție",
      "Dreapta determinată de două puncte",
      "Condiții de paralelism",
      "Condiții de perpendicularitate",
      "Distanța dintre două puncte",
      "Distanța de la un punct la o dreaptă",
      "Calculul ariilor în coordonate",
    ],
  },
    {
    id: "matrice",
    clasa: "Clasa a XI-a",
    icon: "▦",
    titlu: "Matrice și determinanți",
    descriere:
      "Calcul matriceal și determinanți, esențiali pentru Subiectul al II-lea.",
    lectii: [
      "Noțiunea de matrice",
      "Tipuri de matrice",
      "Egalitatea matricelor",
      "Adunarea matricelor",
      "Înmulțirea unei matrice cu un scalar",
      "Înmulțirea matricelor",
      "Puteri de matrice",
      "Determinant de ordinul 2",
      "Determinant de ordinul 3",
      "Proprietățile determinanților",
      "Matrice inversabilă",
      "Inversa unei matrice",
      "Ecuații matriceale",
    ],
  },

  {
    id: "sisteme",
    clasa: "Clasa a XI-a",
    icon: "🧮",
    titlu: "Sisteme de ecuații liniare",
    descriere:
      "Metodele din programă pentru rezolvarea și analiza sistemelor liniare.",
    lectii: [
      "Forma matriceală a unui sistem",
      "Sisteme compatibile și incompatibile",
      "Regula lui Cramer",
      "Rangul unei matrice",
      "Teorema Kronecker-Capelli",
      "Teorema Rouché",
      "Metoda Gauss",
      "Sisteme cu parametru",
    ],
  },

  {
    id: "limite",
    clasa: "Clasa a XI-a",
    icon: "∞",
    titlu: "Șiruri, limite și continuitate",
    descriere:
      "Fundamentul analizei matematice necesare pentru Subiectul al III-lea.",
    lectii: [
      "Vecinătăți",
      "Șir convergent",
      "Limita unui șir",
      "Operații cu limite de șiruri",
      "Limite uzuale",
      "Numărul e",
      "Limita unei funcții într-un punct",
      "Limite laterale",
      "Limite la infinit",
      "Operații cu limite de funcții",
      "Forme nedeterminate",
      "Asimptote verticale",
      "Asimptote orizontale",
      "Asimptote oblice",
      "Continuitatea într-un punct",
      "Continuitatea pe un interval",
      "Proprietatea lui Darboux",
    ],
  },

  {
    id: "derivate",
    clasa: "Clasa a XI-a",
    icon: "f′",
    titlu: "Derivate și studiul funcțiilor",
    descriere:
      "Derivare, monotonie, extreme și reprezentări grafice.",
    lectii: [
      "Derivata unei funcții într-un punct",
      "Interpretarea geometrică a derivatei",
      "Derivatele funcțiilor elementare",
      "Reguli de derivare",
      "Derivata funcției compuse",
      "Teorema lui Fermat",
      "Teorema lui Rolle",
      "Teorema lui Lagrange",
      "Regulile lui l'Hospital",
      "Monotonia cu ajutorul derivatei",
      "Puncte de maxim și minim",
      "Concavitate și convexitate",
      "Derivata de ordinul al II-lea",
      "Puncte de inflexiune",
      "Tabel de variație",
      "Reprezentarea grafică a funcțiilor",
      "Determinarea numărului de soluții ale unei ecuații",
    ],
  },

  {
    id: "structuri",
    clasa: "Clasa a XII-a",
    icon: "⚙️",
    titlu: "Structuri algebrice",
    descriere:
      "Legi de compoziție, grupuri, inele și corpuri.",
    lectii: [
      "Legi de compoziție",
      "Parte stabilă",
      "Proprietățile unei legi de compoziție",
      "Element neutru",
      "Elemente simetrizabile",
      "Grup",
      "Subgrup",
      "Grup finit",
      "Ordinul unui element",
      "Morfism de grupuri",
      "Izomorfism de grupuri",
      "Inel",
      "Subinel",
      "Corp",
      "Morfisme de inele și corpuri",
    ],
  },

  {
    id: "polinoame",
    clasa: "Clasa a XII-a",
    icon: "P(x)",
    titlu: "Polinoame",
    descriere:
      "Operații, divizibilitate, rădăcini și ecuații algebrice.",
    lectii: [
      "Polinoame cu coeficienți într-un corp",
      "Gradul unui polinom",
      "Adunarea și înmulțirea polinoamelor",
      "Împărțirea polinoamelor",
      "Teorema împărțirii cu rest",
      "Schema lui Horner",
      "Teorema lui Bézout",
      "Divizibilitatea polinoamelor",
      "Rădăcinile unui polinom",
      "Factorizarea polinoamelor",
      "Relațiile lui Viète pentru polinoame",
      "Ecuații algebrice",
      "Ecuații binome",
      "Ecuații bipătrate",
      "Ecuații reciproce",
    ],
  },

  {
    id: "integrale",
    clasa: "Clasa a XII-a",
    icon: "∫",
    titlu: "Primitive și integrale",
    descriere:
      "Ultima mare zonă a analizei matematice din programa M_mate-info.",
    lectii: [
      "Primitiva unei funcții",
      "Integrala nedefinită",
      "Primitive uzuale",
      "Proprietățile primitivelor",
      "Integrala definită",
      "Proprietățile integralei definite",
      "Formula Leibniz-Newton",
      "Integrabilitatea funcțiilor continue",
      "Teorema de medie",
      "Integrarea prin părți",
      "Integrarea prin schimbare de variabilă",
      "Integrarea funcțiilor raționale simple",
      "Calculul ariilor",
      "Volumul corpurilor de rotație",
      "Limite de șiruri folosind integrale",
    ],
  },
];

const lectiiVechi: Record<string, ConfigurareLectie> = {
  "Mulțimi de numere și operații cu numere reale": {
    href: "/lectii/numere-reale",
    storageKey: "lectie-numere-reale-finalizata",
  },

  "Estimări și aproximări": {
    href: "/lectii/estimari-aproximari",
    storageKey: "lectie-estimari-aproximari-finalizata",
  },

  "Modulul unui număr real": {
    href: "/lectii/modul-numar-real",
    storageKey: "lectie-modul-numar-real-finalizata",
  },

  "Intervale de numere reale": {
    href: "/lectii/intervale-numere-reale",
    storageKey: "lectie-intervale-numere-reale-finalizata",
  },

  "Propoziții și predicate": {
    href: "/lectii/propozitii-predicate",
    storageKey: "lectie-propozitii-predicate-finalizata",
  },
};

export default function ProgramaPage() {
  const router = useRouter();
  const [supabase] = useState(() => createClient());

  const [nume, setNume] = useState("");
  const [profil, setProfil] = useState("");
  const [gata, setGata] = useState(false);
  const [seDeconecteaza, setSeDeconecteaza] = useState(false);

  const [cautare, setCautare] = useState("");
  const [filtru, setFiltru] = useState<Filtru>("toate");

  const [lectiiFinalizate, setLectiiFinalizate] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    let activ = true;

    async function incarcaPrograma() {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (!activ) {
        return;
      }

      if (userError || !user) {
        router.replace("/cont");
        return;
      }

      const { data: profilSupabase, error: profilError } =
        await supabase
          .from("profiles")
          .select(
            "nume, profil_bac, evaluare_initiala_finalizata"
          )
          .eq("id", user.id)
          .maybeSingle();

      if (!activ) {
        return;
      }

      if (profilError || !profilSupabase) {
        console.error("Eroare profil:", profilError);
        router.replace("/cont");
        return;
      }

      if (!profilSupabase.nume) {
        router.replace("/date-personale");
        return;
      }

      if (!profilSupabase.profil_bac) {
        router.replace("/profil");
        return;
      }

      if (!profilSupabase.evaluare_initiala_finalizata) {
        router.replace("/evaluare");
        return;
      }

      setNume(profilSupabase.nume);
      setProfil(profilSupabase.profil_bac);

      localStorage.setItem(
        "bac-mate-nume",
        profilSupabase.nume
      );

      localStorage.setItem(
        "bac-mate-profil-cod",
        profilSupabase.profil_bac
      );

      localStorage.setItem(
        "bac-mate-evaluare-initiala-finalizata",
        "da"
      );

      const progres: Record<string, boolean> = {};

      Object.entries(lectiiVechi).forEach(
        ([numeLectie, configurare]) => {
          progres[numeLectie] =
            localStorage.getItem(configurare.storageKey) ===
            "da";
        }
      );

      lectiiConstruite.forEach((lectie) => {
        progres[lectie.titlu] =
          localStorage.getItem(
            lectie.storageKeyFinalizata
          ) === "da";
      });

      const { data, error } = await supabase
        .from("student_progress")
        .select("lesson_id, completed")
        .eq("user_id", user.id);

      if (!activ) {
        return;
      }

      if (error) {
        console.error(
          "Eroare la încărcarea progresului:",
          error
        );
      }

      if (!error && data) {
        const progresCloud =
          data as unknown as ProgresSupabase[];

        lectiiConstruite.forEach((lectie) => {
          const randCloud = progresCloud.find(
            (rand) => rand.lesson_id === lectie.id
          );

          if (!randCloud) {
            return;
          }

          progres[lectie.titlu] =
            randCloud.completed === true;

          if (randCloud.completed) {
            localStorage.setItem(
              lectie.storageKeyFinalizata,
              "da"
            );
          } else {
            localStorage.removeItem(
              lectie.storageKeyFinalizata
            );
          }
        });
      }

      if (!activ) {
        return;
      }

      setLectiiFinalizate({ ...progres });
      setGata(true);
    }

    incarcaPrograma();

    return () => {
      activ = false;
    };
  }, [router, supabase]);

  const totalLectii = moduleMateInfo.reduce(
    (total, modul) => total + modul.lectii.length,
    0
  );

  const totalModule = moduleMateInfo.length;

  const numarLectiiFinalizate = moduleMateInfo.reduce(
    (total, modul) =>
      total +
      modul.lectii.filter(
        (lectie) => lectiiFinalizate[lectie] === true
      ).length,
    0
  );

  const procentGeneral =
    totalLectii === 0
      ? 0
      : Math.round(
          (numarLectiiFinalizate / totalLectii) * 1000
        ) / 10;

  const initiala =
    nume.trim().charAt(0).toUpperCase() || "M";

  function gasesteConfigurareLectie(
    numeLectie: string
  ): ConfigurareLectie | null {
    const lectieVeche = lectiiVechi[numeLectie];

    if (lectieVeche) {
      return lectieVeche;
    }

    const lectieNoua = lectiiConstruite.find(
      (lectie) => lectie.titlu === numeLectie
    );

    if (!lectieNoua) {
      return null;
    }

    return {
      href: `/lectii/${lectieNoua.slug}`,
      storageKey: lectieNoua.storageKeyFinalizata,
    };
  }

  function esteLectiaDeblocata(
    modul: Modul,
    lectieIndex: number
  ) {
    const lectieCurenta = modul.lectii[lectieIndex];

    if (!gasesteConfigurareLectie(lectieCurenta)) {
      return false;
    }

    if (lectiiFinalizate[lectieCurenta] === true) {
      return true;
    }

    const modulIndex = moduleMateInfo.findIndex(
      (modulDinLista) => modulDinLista.id === modul.id
    );

    if (modulIndex === 0 && lectieIndex === 0) {
      return true;
    }

    if (lectieIndex > 0) {
      const lectieAnterioara =
        modul.lectii[lectieIndex - 1];

      return (
        lectiiFinalizate[lectieAnterioara] === true
      );
    }

    if (lectieIndex === 0 && modulIndex > 0) {
      const modulAnterior =
        moduleMateInfo[modulIndex - 1];

      const ultimaLectieModulAnterior =
        modulAnterior.lectii[
          modulAnterior.lectii.length - 1
        ];

      return (
        lectiiFinalizate[ultimaLectieModulAnterior] === true
      );
    }

    return false;
  }

  function progresModul(modul: Modul) {
    const finalizate = modul.lectii.filter(
      (lectie) => lectiiFinalizate[lectie] === true
    ).length;

    const total = modul.lectii.length;

    const procent =
      total === 0
        ? 0
        : Math.round((finalizate / total) * 100);

    return {
      finalizate,
      total,
      procent,
    };
  }

  function treceFiltrul(
    modul: Modul,
    titluLectie: string,
    indexLectie: number
  ) {
    const textCautat = cautare.trim().toLocaleLowerCase("ro");

    const sePotrivesteCautarii =
      textCautat.length === 0 ||
      titluLectie
        .toLocaleLowerCase("ro")
        .includes(textCautat) ||
      modul.titlu
        .toLocaleLowerCase("ro")
        .includes(textCautat) ||
      modul.clasa
        .toLocaleLowerCase("ro")
        .includes(textCautat);

    if (!sePotrivesteCautarii) {
      return false;
    }

    const finalizata =
      lectiiFinalizate[titluLectie] === true;

    const disponibila =
      esteLectiaDeblocata(modul, indexLectie);

    if (filtru === "finalizate") {
      return finalizata;
    }

    if (filtru === "disponibile") {
      return disponibila && !finalizata;
    }

    return true;
  }

  const moduleAfisate = moduleMateInfo.filter((modul) =>
    modul.lectii.some((lectie, index) =>
      treceFiltrul(modul, lectie, index)
    )
  );

  let urmatoareaLectie:
    | {
        titlu: string;
        href: string;
        modul: string;
        numarLectie: number;
        totalLectiiModul: number;
      }
    | null = null;

  for (const modul of moduleMateInfo) {
    if (urmatoareaLectie) {
      break;
    }

    for (
      let index = 0;
      index < modul.lectii.length;
      index++
    ) {
      const titluLectie = modul.lectii[index];

      const finalizata =
        lectiiFinalizate[titluLectie] === true;

      const disponibila =
        esteLectiaDeblocata(modul, index);

      const configurare =
        gasesteConfigurareLectie(titluLectie);

      if (
        !finalizata &&
        disponibila &&
        configurare
      ) {
        urmatoareaLectie = {
          titlu: titluLectie,
          href: configurare.href,
          modul: modul.titlu,
          numarLectie: index + 1,
          totalLectiiModul: modul.lectii.length,
        };

        break;
      }
    }
  }

  async function deconectare() {
    setSeDeconecteaza(true);

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(
        "Eroare la deconectare:",
        error
      );

      setSeDeconecteaza(false);
      return;
    }

    localStorage.removeItem("bac-mate-nume");
    localStorage.removeItem("bac-mate-profil-cod");
    localStorage.removeItem(
      "bac-mate-evaluare-initiala-finalizata"
    );

    router.replace("/cont");
    router.refresh();
  }
    if (!gata) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#101827] text-white">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-cyan-400" />

          <p className="mt-5 text-sm font-bold text-slate-400">
            Îți pregătim programa...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#101827] text-white">
      <div className="min-h-screen lg:flex">
        <aside className="border-b border-white/10 bg-[#172238] lg:fixed lg:inset-y-0 lg:left-0 lg:w-[220px] lg:border-b-0 lg:border-r">
          <div className="flex h-full flex-col">
            <div className="border-b border-white/10 px-7 py-7">
              <a
                href="/dashboard"
                className="text-[22px] font-black tracking-tight"
              >
                BAC{" "}
                <span className="text-cyan-400">
                  MATE
                </span>
              </a>

              <p className="mt-2 text-[9px] font-black uppercase tracking-[0.28em] text-slate-400">
                Matematică. Pas cu pas.
              </p>
            </div>

            <nav className="flex gap-2 overflow-x-auto p-4 lg:flex-1 lg:flex-col lg:overflow-visible">
              <NavItem
                href="/dashboard"
                icon="⌂"
                text="Dashboard"
              />

              <NavItem
                href="/programa"
                icon="▣"
                text="Lecții"
                active
              />

              <NavItem
                href="/evaluare"
                icon="✓"
                text="Evaluări"
              />

              <NavItem
                href="/dashboard#progres"
                icon="▥"
                text="Progres"
              />

              <NavItem
                href="/mate"
                icon="✧"
                text="MATE"
                badge="NOU"
              />

              <NavItem
                href="/programa"
                icon="▤"
                text="Programă"
              />

              <NavItem
                href="/simulari"
                icon="▧"
                text="Simulări BAC"
              />

              <NavItem
                href="/profil"
                icon="♙"
                text="Profil"
              />
            </nav>

            <div className="hidden p-5 lg:block">
              <div className="rounded-2xl border border-blue-300/15 bg-blue-400/5 p-4">
                <p className="text-sm italic leading-6 text-slate-200">
                  „Nu trebuie să înveți totul într-o zi.
                  Trebuie doar să continui.”
                </p>

                <p className="mt-3 text-xs font-black text-cyan-300">
                  — MATE
                </p>
              </div>
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1 lg:ml-[220px]">
          <header className="sticky top-0 z-30 border-b border-white/10 bg-[#101827]/95 backdrop-blur-xl">
            <div className="flex min-h-[76px] items-center justify-between gap-4 px-5 sm:px-8">
              <div className="hidden lg:block">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                  Programa BAC
                </p>
              </div>

              <div className="ml-auto flex items-center gap-3">
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-black">
                    {nume}
                  </p>

                  <p className="text-[11px] text-slate-400">
                    {profil}
                  </p>
                </div>

                <a
                  href="/profil"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-300/30 bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-black shadow-lg shadow-blue-500/20"
                >
                  {initiala}
                </a>

                <button
                  type="button"
                  onClick={deconectare}
                  disabled={seDeconecteaza}
                  className="rounded-xl border border-white/10 px-3 py-2 text-xs font-bold text-slate-400 transition hover:border-red-400/30 hover:text-red-300 disabled:opacity-50"
                >
                  {seDeconecteaza
                    ? "..."
                    : "Ieșire"}
                </button>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-[1220px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
            <section className="relative overflow-hidden rounded-[30px] border border-blue-300/20 bg-gradient-to-br from-[#263b5b] via-[#283854] to-[#34314f] p-6 shadow-2xl shadow-black/20 sm:p-8">
              <div className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
              <div className="pointer-events-none absolute -right-24 bottom-[-100px] h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />

              <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-300">
                    Traseul tău complet
                  </p>

                  <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
                    Programa BAC la matematică
                  </h1>

                  <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
                    Toată materia organizată în ordine,
                    de la bază până la capitolele
                    avansate. BAC MATE urmărește
                    progresul tău și păstrează traseul
                    clar.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    {urmatoareaLectie && (
                      <a
                        href={urmatoareaLectie.href}
                        className="rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-5 py-3 text-sm font-black shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5"
                      >
                        Continuă cu următoarea lecție →
                      </a>
                    )}

                    <a
                      href="/mate"
                      className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-black transition hover:bg-white/10"
                    >
                      Întreabă-l pe MATE
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
                  <HeroStat
                    value={String(totalLectii)}
                    label="lecții"
                  />

                  <HeroStat
                    value={String(totalModule)}
                    label="module"
                  />

                  <HeroStat
                    value={String(
                      numarLectiiFinalizate
                    )}
                    label="finalizate"
                  />

                  <HeroStat
                    value={`${procentGeneral}%`}
                    label="progres"
                  />
                </div>
              </div>
            </section>

            <section className="mt-6 rounded-[24px] border border-white/10 bg-[#182338] p-5 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">
                    Progres în programă
                  </p>

                  <p className="mt-2 text-xl font-black">
                    {numarLectiiFinalizate} din{" "}
                    {totalLectii} lecții
                  </p>
                </div>

                <p className="text-3xl font-black">
                  {procentGeneral}%
                </p>
              </div>

              <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-700/70">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-300 transition-all duration-700"
                  style={{
                    width: `${Math.min(
                      procentGeneral,
                      100
                    )}%`,
                  }}
                />
              </div>
            </section>

            <section className="mt-6 rounded-[24px] border border-white/10 bg-[#182338] p-5">
              <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                    ⌕
                  </span>

                  <input
                    value={cautare}
                    onChange={(event) =>
                      setCautare(event.target.value)
                    }
                    placeholder="Caută o lecție sau un capitol..."
                    className="w-full rounded-xl border border-white/10 bg-[#111a2a] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/30"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  <FilterButton
                    active={filtru === "toate"}
                    onClick={() =>
                      setFiltru("toate")
                    }
                  >
                    Toate
                  </FilterButton>

                  <FilterButton
                    active={
                      filtru === "disponibile"
                    }
                    onClick={() =>
                      setFiltru("disponibile")
                    }
                  >
                    Disponibile
                  </FilterButton>

                  <FilterButton
                    active={
                      filtru === "finalizate"
                    }
                    onClick={() =>
                      setFiltru("finalizate")
                    }
                  >
                    Finalizate
                  </FilterButton>
                </div>
              </div>
            </section>

            {urmatoareaLectie && (
              <section className="relative mt-6 overflow-hidden rounded-[26px] border border-cyan-300/20 bg-gradient-to-br from-cyan-400/10 via-blue-500/5 to-transparent p-6">
                <div className="pointer-events-none absolute right-[-50px] top-[-60px] h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" />

                <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">
                      Continuă de aici
                    </p>

                    <h2 className="mt-2 text-2xl font-black">
                      {urmatoareaLectie.titlu}
                    </h2>

                    <p className="mt-2 text-sm text-slate-400">
                      {urmatoareaLectie.modul} • Lecția{" "}
                      {urmatoareaLectie.numarLectie} din{" "}
                      {
                        urmatoareaLectie.totalLectiiModul
                      }
                    </p>
                  </div>

                  <a
                    href={urmatoareaLectie.href}
                    className="shrink-0 rounded-xl bg-cyan-400 px-5 py-3 text-center text-sm font-black text-slate-950 transition hover:bg-cyan-300"
                  >
                    Începe lecția →
                  </a>
                </div>
              </section>
            )}

            <section className="mt-10">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">
                  Harta materiei
                </p>

                <h2 className="mt-2 text-3xl font-black">
                  Module și lecții
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                  Cele 219 de lecții sunt organizate
                  în 17 module. Lecțiile se deblochează
                  în ordine, iar progresul rămâne
                  sincronizat cu contul tău.
                </p>
              </div>

              {moduleAfisate.length === 0 ? (
                <div className="mt-6 rounded-[24px] border border-dashed border-white/10 bg-[#182338] p-10 text-center">
                  <p className="text-lg font-black">
                    Nu am găsit rezultate.
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    Încearcă alt text de căutare sau
                    schimbă filtrul.
                  </p>
                </div>
              ) : (
                <div className="mt-6 space-y-5">
                  {moduleAfisate.map((modul) => {
                    const progres =
                      progresModul(modul);

                    return (
                      <article
                        key={modul.id}
                        className="overflow-hidden rounded-[26px] border border-white/10 bg-[#182338] shadow-lg shadow-black/10"
                      >
                        <div className="border-b border-white/10 bg-gradient-to-r from-white/[0.035] to-transparent p-5 sm:p-6">
                          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex min-w-0 items-center gap-4">
                              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-2xl">
                                {modul.icon}
                              </div>

                              <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="rounded-full bg-cyan-400/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-cyan-300">
                                    {modul.clasa}
                                  </span>

                                  <span className="text-xs font-bold text-slate-500">
                                    {progres.finalizate}/
                                    {progres.total} finalizate
                                  </span>
                                </div>

                                <h3 className="mt-2 text-xl font-black sm:text-2xl">
                                  {modul.titlu}
                                </h3>

                                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
                                  {modul.descriere}
                                </p>
                              </div>
                            </div>

                            <div className="shrink-0 sm:text-right">
                              <p className="text-2xl font-black text-cyan-300">
                                {progres.procent}%
                              </p>

                              <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                progres modul
                              </p>
                            </div>
                          </div>

                          <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-700">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-300 transition-all"
                              style={{
                                width: `${progres.procent}%`,
                              }}
                            />
                          </div>
                        </div>

                        <div className="p-3 sm:p-4">
                          <div className="grid gap-2">
                            {modul.lectii.map(
                              (titluLectie, index) => {
                                if (
                                  !treceFiltrul(
                                    modul,
                                    titluLectie,
                                    index
                                  )
                                ) {
                                  return null;
                                }

                                const configurare =
                                  gasesteConfigurareLectie(
                                    titluLectie
                                  );

                                const finalizata =
                                  lectiiFinalizate[
                                    titluLectie
                                  ] === true;

                                const disponibila =
                                  esteLectiaDeblocata(
                                    modul,
                                    index
                                  );

                                const poateIntra =
                                  disponibila &&
                                  configurare !== null;

                                const continut = (
                                  <>
                                    <div
                                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-black ${
                                        finalizata
                                          ? "bg-emerald-400/10 text-emerald-300"
                                          : poateIntra
                                            ? "bg-cyan-400/10 text-cyan-300"
                                            : "bg-white/5 text-slate-600"
                                      }`}
                                    >
                                      {finalizata
                                        ? "✓"
                                        : index + 1}
                                    </div>

                                    <div className="min-w-0 flex-1">
                                      <p
                                        className={`font-bold ${
                                          poateIntra
                                            ? "text-slate-100"
                                            : "text-slate-500"
                                        }`}
                                      >
                                        {titluLectie}
                                      </p>

                                      <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] font-bold">
                                        {finalizata ? (
                                          <span className="text-emerald-300">
                                            Finalizată
                                          </span>
                                        ) : poateIntra ? (
                                          <span className="text-cyan-300">
                                            Disponibilă
                                          </span>
                                        ) : configurare ? (
                                          <span className="text-slate-600">
                                            Blocată
                                          </span>
                                        ) : (
                                          <span className="text-slate-600">
                                            În pregătire
                                          </span>
                                        )}

                                        <span className="text-slate-700">
                                          •
                                        </span>

                                        <span className="text-slate-500">
                                          Lecția {index + 1} din{" "}
                                          {modul.lectii.length}
                                        </span>
                                      </div>
                                    </div>

                                    <div
                                      className={`shrink-0 text-lg ${
                                        finalizata
                                          ? "text-emerald-300"
                                          : poateIntra
                                            ? "text-cyan-300"
                                            : "text-slate-700"
                                      }`}
                                    >
                                      {poateIntra
                                        ? "→"
                                        : "🔒"}
                                    </div>
                                  </>
                                );

                                if (
                                  poateIntra &&
                                  configurare
                                ) {
                                  return (
                                    <a
                                      key={`${modul.id}-${titluLectie}`}
                                      href={
                                        configurare.href
                                      }
                                      className="flex items-center gap-4 rounded-2xl border border-transparent bg-[#111a2a] p-4 transition hover:border-cyan-300/15 hover:bg-[#142033]"
                                    >
                                      {continut}
                                    </a>
                                  );
                                }

                                return (
                                  <div
                                    key={`${modul.id}-${titluLectie}`}
                                    className="flex cursor-not-allowed items-center gap-4 rounded-2xl border border-transparent bg-[#111a2a]/60 p-4 opacity-75"
                                  >
                                    {continut}
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </section>

            <section className="mt-10 grid gap-5 pb-10 lg:grid-cols-2">
              <div className="rounded-[26px] border border-cyan-300/15 bg-gradient-to-br from-cyan-400/10 to-blue-500/5 p-6">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">
                  MATE
                </p>

                <h3 className="mt-2 text-2xl font-black">
                  Nu știi de unde să continui?
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  MATE poate folosi progresul tău
                  pentru a-ți arăta ce merită să
                  lucrezi în continuare.
                </p>

                <a
                  href="/mate"
                  className="mt-5 inline-flex rounded-xl bg-cyan-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-300"
                >
                  Vorbește cu MATE →
                </a>
              </div>

              <div className="rounded-[26px] border border-white/10 bg-[#182338] p-6">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-300">
                  Progres
                </p>

                <h3 className="mt-2 text-2xl font-black">
                  {numarLectiiFinalizate} lecții
                  finalizate
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Progresul este salvat în contul tău
                  și rămâne sincronizat între sesiuni.
                </p>

                <a
                  href="/dashboard#progres"
                  className="mt-5 inline-flex rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-black transition hover:bg-white/10"
                >
                  Vezi progresul →
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

function NavItem({
  href,
  icon,
  text,
  active = false,
  badge,
}: {
  href: string;
  icon: string;
  text: string;
  active?: boolean;
  badge?: string;
}) {
  return (
    <a
      href={href}
      className={`relative flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition ${
        active
          ? "border border-cyan-300/15 bg-blue-400/10 text-white"
          : "text-slate-300 hover:bg-white/5 hover:text-white"
      }`}
    >
      {active && (
        <span className="absolute -left-4 h-7 w-1 rounded-r-full bg-cyan-300" />
      )}

      <span className="flex w-5 justify-center text-base text-slate-300">
        {icon}
      </span>

      <span>{text}</span>

      {badge && (
        <span className="ml-auto rounded-full bg-cyan-400/15 px-2 py-0.5 text-[9px] font-black text-cyan-200">
          {badge}
        </span>
      )}
    </a>
  );
}

function HeroStat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="min-w-[110px] rounded-2xl border border-white/10 bg-black/15 px-5 py-4 text-center backdrop-blur-sm">
      <p className="text-2xl font-black text-white">
        {value}
      </p>

      <p className="mt-1 text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
        {label}
      </p>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl px-4 py-2.5 text-xs font-black transition ${
        active
          ? "bg-cyan-400 text-slate-950"
          : "border border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}