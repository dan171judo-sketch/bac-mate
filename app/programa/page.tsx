"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";

type ModulPrograma = {
  id: string;
  clasa: string;
  icon: string;
  titlu: string;
  descriere: string;
  numarLectii: number;
};

type ProgresSupabase = {
  lesson_id: string;
  completed: boolean;
};

const modulePrograma: ModulPrograma[] = [
  {
    id: "numere-logica",
    clasa: "Clasa a IX-a",
    icon: "∑",
    titlu: "Numere reale, logică și mulțimi",
    descriere:
      "Fundamentele algebrice și logice necesare pentru rezolvarea problemelor de Bac.",
    numarLectii: 10,
  },
  {
    id: "siruri-functii",
    clasa: "Clasa a IX-a",
    icon: "↗",
    titlu: "Șiruri și funcții",
    descriere:
      "Funcții, grafice, proprietăți și șiruri de numere reale.",
    numarLectii: 14,
  },
  {
    id: "gradul-intai",
    clasa: "Clasa a IX-a",
    icon: "ƒ",
    titlu: "Funcția și ecuațiile de gradul I",
    descriere:
      "Modele liniare, ecuații, inecuații și interpretarea lor grafică.",
    numarLectii: 9,
  },
  {
    id: "gradul-doi",
    clasa: "Clasa a IX-a",
    icon: "∩",
    titlu: "Funcția și ecuația de gradul al II-lea",
    descriere:
      "Ecuații de gradul II, parabole, semn și probleme clasice de Bac.",
    numarLectii: 13,
  },
  {
    id: "vectori-trigonometrie",
    clasa: "Clasa a IX-a",
    icon: "△",
    titlu: "Vectori, trigonometrie și geometrie",
    descriere:
      "Vectori, trigonometrie și instrumentele geometrice necesare pentru Bac.",
    numarLectii: 18,
  },
  {
    id: "puteri-radicali-log",
    clasa: "Clasa a X-a",
    icon: "√",
    titlu: "Puteri, radicali și logaritmi",
    descriere:
      "Calcul algebric cu puteri, radicali și logaritmi.",
    numarLectii: 10,
  },
  {
    id: "functii-speciale",
    clasa: "Clasa a X-a",
    icon: "𝑓",
    titlu: "Funcții exponențiale, logaritmice și trigonometrice",
    descriere:
      "Funcții speciale, proprietăți, inversabilitate și ecuații.",
    numarLectii: 15,
  },
  {
    id: "complexe",
    clasa: "Clasa a X-a",
    icon: "ℂ",
    titlu: "Numere complexe",
    descriere:
      "Calcule și ecuații în mulțimea numerelor complexe.",
    numarLectii: 9,
  },
  {
    id: "combinatorica-probabilitati",
    clasa: "Clasa a X-a",
    icon: "P",
    titlu: "Combinatorică și probabilități",
    descriere:
      "Tehnici de numărare, probabilități și aplicații.",
    numarLectii: 11,
  },
  {
    id: "geometrie-analitica",
    clasa: "Clasa a X-a",
    icon: "⌖",
    titlu: "Geometrie analitică",
    descriere:
      "Drepte, coordonate, distanțe și arii în plan.",
    numarLectii: 10,
  },
  {
    id: "matrice",
    clasa: "Clasa a XI-a",
    icon: "▦",
    titlu: "Matrice și determinanți",
    descriere:
      "Calcul matriceal, determinanți și matrice inversabile.",
    numarLectii: 13,
  },
  {
    id: "sisteme",
    clasa: "Clasa a XI-a",
    icon: "≡",
    titlu: "Sisteme de ecuații liniare",
    descriere:
      "Metode pentru rezolvarea și analiza sistemelor liniare.",
    numarLectii: 8,
  },
  {
    id: "limite",
    clasa: "Clasa a XI-a",
    icon: "∞",
    titlu: "Șiruri, limite și continuitate",
    descriere:
      "Fundamentele analizei matematice: limite, asimptote și continuitate.",
    numarLectii: 17,
  },
  {
    id: "derivate",
    clasa: "Clasa a XI-a",
    icon: "f′",
    titlu: "Derivate și studiul funcțiilor",
    descriere:
      "Derivare, monotonie, extreme și reprezentarea grafică a funcțiilor.",
    numarLectii: 17,
  },
  {
    id: "structuri",
    clasa: "Clasa a XII-a",
    icon: "◇",
    titlu: "Structuri algebrice",
    descriere:
      "Legi de compoziție, grupuri, inele și corpuri.",
    numarLectii: 15,
  },
  {
    id: "polinoame",
    clasa: "Clasa a XII-a",
    icon: "Pₙ",
    titlu: "Polinoame",
    descriere:
      "Operații, divizibilitate, rădăcini și ecuații algebrice.",
    numarLectii: 15,
  },
  {
    id: "integrale",
    clasa: "Clasa a XII-a",
    icon: "∫",
    titlu: "Primitive și integrale",
    descriere:
      "Primitive, integrale, arii și aplicațiile calculului integral.",
    numarLectii: 15,
  },
];

const clase = [
  "Clasa a IX-a",
  "Clasa a X-a",
  "Clasa a XI-a",
  "Clasa a XII-a",
];

const clasaAccent = [
  {
    text: "text-emerald-300",
    border: "border-emerald-300/15",
    soft: "bg-emerald-400/10",
    glow: "bg-emerald-400/10",
  },
  {
    text: "text-lime-300",
    border: "border-lime-300/15",
    soft: "bg-lime-400/10",
    glow: "bg-lime-400/10",
  },
  {
    text: "text-amber-300",
    border: "border-amber-300/15",
    soft: "bg-amber-400/10",
    glow: "bg-amber-400/10",
  },
  {
    text: "text-orange-300",
    border: "border-orange-300/15",
    soft: "bg-orange-400/10",
    glow: "bg-orange-400/10",
  },
];

export default function ProgramaPage() {
  const router = useRouter();
  const [supabase] = useState(() => createClient());

  const [gata, setGata] = useState(false);
  const [nume, setNume] = useState("");
  const [profil, setProfil] = useState("");
  const [numarFinalizate, setNumarFinalizate] = useState(0);
  const [seDeconecteaza, setSeDeconecteaza] = useState(false);

  const totalLectii = useMemo(
    () =>
      modulePrograma.reduce(
        (total, modul) => total + modul.numarLectii,
        0
      ),
    []
  );

  const procentGeneral =
    totalLectii === 0
      ? 0
      : Math.round(
          (numarFinalizate / totalLectii) * 1000
        ) / 10;

  const initiala =
    nume.trim().charAt(0).toUpperCase() || "M";

  useEffect(() => {
    let activ = true;

    async function incarcaPrograma() {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (!activ) return;

      if (userError || !user) {
        router.replace("/cont");
        return;
      }

      const {
        data: profilSupabase,
        error: profilError,
      } = await supabase
        .from("profiles")
        .select("nume, profil_bac")
        .eq("id", user.id)
        .maybeSingle();

      if (!activ) return;

      if (profilError || !profilSupabase) {
        console.error(
          "Eroare la încărcarea profilului:",
          profilError
        );
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

      setNume(profilSupabase.nume);
      setProfil(profilSupabase.profil_bac);

      const {
        data: progres,
        error: progresError,
      } = await supabase
        .from("student_progress")
        .select("lesson_id, completed")
        .eq("user_id", user.id);

      if (!activ) return;

      if (progresError) {
        console.error(
          "Eroare la încărcarea progresului:",
          progresError
        );
      }

      if (!progresError && progres) {
        const randuri =
          progres as unknown as ProgresSupabase[];

        const lectiiFinalizate = randuri.filter(
          (rand) => rand.completed === true
        ).length;

        setNumarFinalizate(lectiiFinalizate);
      }

      setGata(true);
    }

    incarcaPrograma();

    return () => {
      activ = false;
    };
  }, [router, supabase]);

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
    localStorage.removeItem(
      "bac-mate-profil-cod"
    );
    localStorage.removeItem(
      "bac-mate-evaluare-initiala-finalizata"
    );

    router.replace("/cont");
    router.refresh();
  }

  if (!gata) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#06110e] text-white">
        <div className="text-center">
          <div className="relative mx-auto h-16 w-16">
            <div className="absolute inset-0 rounded-full bg-emerald-400/20 blur-xl" />
            <div className="relative h-16 w-16 animate-spin rounded-full border-[5px] border-white/10 border-t-emerald-300" />
          </div>

          <p className="mt-6 text-sm font-black text-slate-300">
            Îți pregătim programa...
          </p>

          <p className="mt-1 text-xs text-slate-600">
            Construim harta completă a materiei.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#06110e] text-white">
      {/* AMBIENT BACKGROUND */}

      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-emerald-500/[0.08] blur-[120px]" />
        <div className="absolute right-[-180px] top-[20%] h-[500px] w-[500px] rounded-full bg-lime-400/[0.045] blur-[130px]" />
        <div className="absolute bottom-[-220px] left-[38%] h-[520px] w-[520px] rounded-full bg-orange-500/[0.05] blur-[140px]" />
      </div>

      <div className="relative min-h-screen lg:flex">
        {/* SIDEBAR */}

        <aside className="border-b border-white/[0.07] bg-[#071511]/95 backdrop-blur-2xl lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-[230px] lg:border-b-0 lg:border-r">
          <div className="flex h-full flex-col">
            <div className="border-b border-white/[0.07] px-7 py-7">
              <a
                href="/dashboard"
                className="inline-flex items-center gap-2 text-[21px] font-black tracking-tight"
              >
                <span>BAC</span>

                <span className="bg-gradient-to-r from-emerald-300 via-lime-300 to-amber-300 bg-clip-text text-transparent">
                  MATE
                </span>
              </a>

              <p className="mt-2 text-[9px] font-black uppercase tracking-[0.28em] text-slate-600">
                Matematică. Pas cu pas.
              </p>
            </div>

            <nav className="flex gap-2 overflow-x-auto p-4 lg:flex-1 lg:flex-col lg:overflow-visible">
              <NavItem
                href="/dashboard"
                icon="⌂"
                text="Acasă"
              />

              <NavItem
                href="/lectii"
                icon="▣"
                text="Lecții"
              />

              <NavItem
                href="/evaluari"
                icon="✓"
                text="Evaluări"
              />

              <NavItem
                href="/progres"
                icon="▥"
                text="Progres"
              />

              <NavItem
                href="/mate"
                icon="✦"
                text="MATE"
                badge="NOU"
              />

              <NavItem
                href="/programa"
                icon="▤"
                text="Programă"
                active
              />

              <NavItem
                href="/profil"
                icon="♙"
                text="Profil"
              />
            </nav>

            <div className="hidden p-5 lg:block">
              <div className="relative overflow-hidden rounded-[22px] border border-emerald-300/15 bg-gradient-to-br from-emerald-400/[0.09] via-lime-400/[0.03] to-orange-400/[0.05] p-4">
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-lime-400/10 blur-2xl" />

                <p className="relative text-sm italic leading-6 text-slate-300">
                  „Vezi imaginea de ansamblu. Apoi
                  lucrează pas cu pas.”
                </p>

                <p className="relative mt-3 text-xs font-black text-emerald-300">
                  — MATE
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* CONTENT */}

        <div className="min-w-0 flex-1 lg:ml-[230px]">
          {/* HEADER */}

          <header className="sticky top-0 z-30 border-b border-white/[0.07] bg-[#06110e]/90 backdrop-blur-2xl">
            <div className="flex min-h-[72px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-emerald-400/70">
                  BAC MATE
                </p>

                <p className="mt-1 text-sm font-black text-slate-200">
                  Programă
                </p>
              </div>

              <div className="ml-auto flex items-center gap-3">
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-black">
                    {nume}
                  </p>

                  <p className="mt-0.5 text-[10px] font-bold text-emerald-300">
                    {profil}
                  </p>
                </div>

                <a
                  href="/profil"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-300/30 bg-gradient-to-br from-emerald-400 via-green-500 to-lime-500 text-sm font-black text-[#04110c] shadow-lg shadow-emerald-500/20"
                >
                  {initiala}
                </a>

                <button
                  type="button"
                  onClick={deconectare}
                  disabled={seDeconecteaza}
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-bold text-slate-400 transition hover:border-red-400/30 hover:bg-red-400/[0.06] hover:text-red-300 disabled:opacity-50"
                >
                  {seDeconecteaza
                    ? "..."
                    : "Ieșire"}
                </button>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-[1280px] px-5 py-7 sm:px-8 lg:px-10 lg:py-9">
            {/* HERO */}

            <section className="relative overflow-hidden rounded-[34px] border border-emerald-300/15 bg-gradient-to-br from-[#0b3a2b] via-[#0a2b24] to-[#321f12] p-6 shadow-[0_35px_100px_rgba(0,0,0,0.4)] sm:p-8 lg:p-10">
              <div className="pointer-events-none absolute -left-24 -top-28 h-80 w-80 rounded-full bg-emerald-400/25 blur-[90px]" />
              <div className="pointer-events-none absolute right-[12%] top-[-100px] h-80 w-80 rounded-full bg-lime-400/10 blur-[100px]" />
              <div className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-orange-500/20 blur-[100px]" />

              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:42px_42px]" />

              <div className="relative grid gap-8 xl:grid-cols-[1fr_390px] xl:items-center">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/20 bg-emerald-300/10 px-3 py-1.5 backdrop-blur-xl">
                    <span className="h-2 w-2 rounded-full bg-lime-300 shadow-[0_0_14px_rgba(190,242,100,0.9)]" />

                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-100">
                      Programa ta BAC
                    </span>
                  </div>

                  <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[0.98] tracking-[-0.04em] sm:text-5xl lg:text-[58px]">
                    Tot ce trebuie

                    <span className="block bg-gradient-to-r from-emerald-200 via-lime-200 to-orange-200 bg-clip-text text-transparent">
                      să parcurgi.
                    </span>
                  </h1>

                  <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-200/80 sm:text-base">
                    Vezi materia organizată pe clase și
                    module pentru profilul tău. Programa
                    îți arată imaginea de ansamblu, iar în
                    Lecții continui studiul pas cu pas.
                  </p>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <a
                      href="/lectii"
                      className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-300 via-lime-300 to-amber-300 px-5 py-3.5 text-sm font-black text-[#07110c] shadow-[0_15px_40px_rgba(52,211,153,0.22)] transition duration-300 hover:-translate-y-0.5"
                    >
                      Mergi la Lecții

                      <span className="transition group-hover:translate-x-1">
                        →
                      </span>
                    </a>

                    <a
                      href="/progres"
                      className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/[0.07] px-5 py-3.5 text-sm font-black backdrop-blur-xl transition hover:border-emerald-300/20 hover:bg-emerald-300/[0.08]"
                    >
                      <span className="text-emerald-300">
                        ↗
                      </span>
                      Vezi progresul
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <StatCard
                    value={String(totalLectii)}
                    label="Lecții"
                    detail="programă completă"
                    tone="emerald"
                  />

                  <StatCard
                    value={String(modulePrograma.length)}
                    label="Module"
                    detail="4 ani de studiu"
                    tone="lime"
                  />

                  <StatCard
                    value={String(numarFinalizate)}
                    label="Finalizate"
                    detail="lecții parcurse"
                    tone="amber"
                  />

                  <StatCard
                    value={`${procentGeneral}%`}
                    label="Progres"
                    detail="programă parcursă"
                    tone="orange"
                  />
                </div>
              </div>
            </section>

            {/* PROFILE + PROGRESS */}

            <section className="mt-5 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="relative overflow-hidden rounded-[26px] border border-emerald-300/[0.12] bg-[#0a1814] p-6">
                <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-emerald-400/[0.08] blur-3xl" />

                <div className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.22em] text-emerald-300">
                        Profilul tău
                      </p>

                      <h2 className="mt-2 text-2xl font-black">
                        {profil}
                      </h2>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-300/15 bg-emerald-400/[0.08] text-lg text-emerald-300">
                      ♙
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-slate-500">
                    Programa este organizată pentru
                    traseul BAC selectat în profilul tău.
                  </p>

                  <a
                    href="/profil"
                    className="mt-5 inline-flex items-center gap-2 text-xs font-black text-emerald-300 transition hover:text-lime-300"
                  >
                    Setări profil
                    <span>→</span>
                  </a>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[26px] border border-lime-300/[0.1] bg-gradient-to-r from-[#0b1c17] via-[#0b1916] to-[#17170f] p-6">
                <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-lime-400/[0.04] to-transparent" />

                <div className="relative">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.22em] text-lime-300">
                        Parcurs general
                      </p>

                      <p className="mt-2 text-xl font-black">
                        {numarFinalizate}

                        <span className="text-slate-500">
                          {" "}
                          din {totalLectii} lecții
                        </span>
                      </p>
                    </div>

                    <div className="sm:text-right">
                      <p className="text-4xl font-black text-lime-200">
                        {procentGeneral}%
                      </p>

                      <p className="mt-1 text-[9px] font-black uppercase tracking-[0.16em] text-slate-600">
                        complet
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 h-3 overflow-hidden rounded-full bg-[#04100c] p-[2px]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-lime-300 to-amber-300 shadow-[0_0_18px_rgba(52,211,153,0.35)] transition-all duration-700"
                      style={{
                        width: `${Math.min(
                          procentGeneral,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* MAP HEADER */}

            <section className="mt-12">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-emerald-300">
                    Harta materiei
                  </p>

                  <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                    4 ani.{" "}

                    <span className="bg-gradient-to-r from-lime-200 to-orange-200 bg-clip-text text-transparent">
                      17 module.
                    </span>
                  </h2>

                  <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                    Structura completă a materiei BAC.
                    Fiecare clasă construiește baza pentru
                    următorul nivel.
                  </p>
                </div>

                <div className="flex gap-2">
                  <div className="rounded-full border border-emerald-300/[0.1] bg-emerald-400/[0.04] px-4 py-2 text-xs font-bold text-slate-400">
                    {modulePrograma.length} module
                  </div>

                  <div className="rounded-full border border-orange-300/[0.1] bg-orange-400/[0.04] px-4 py-2 text-xs font-bold text-slate-400">
                    {totalLectii} lecții
                  </div>
                </div>
              </div>

              {/* CLASSES */}

              <div className="mt-8 space-y-9">
                {clase.map((clasa, clasaIndex) => {
                  const moduleClasa =
                    modulePrograma.filter(
                      (modul) =>
                        modul.clasa === clasa
                    );

                  const lectiiClasa =
                    moduleClasa.reduce(
                      (total, modul) =>
                        total + modul.numarLectii,
                      0
                    );

                  const accent =
                    clasaAccent[clasaIndex];

                  return (
                    <article
                      key={clasa}
                      className="relative overflow-hidden rounded-[30px] border border-white/[0.075] bg-[#081612]/90"
                    >
                      <div
                        className={`pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full ${accent.glow} blur-[100px]`}
                      />

                      {/* CLASS HEADER */}

                      <div className="relative border-b border-white/[0.07] p-5 sm:p-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-center gap-4">
                            <div
                              className={`flex h-14 w-14 items-center justify-center rounded-[18px] border ${accent.border} ${accent.soft} text-xl font-black ${accent.text}`}
                            >
                              {clasaIndex + 9}
                            </div>

                            <div>
                              <p
                                className={`text-[9px] font-black uppercase tracking-[0.2em] ${accent.text}`}
                              >
                                Parcurs BAC
                              </p>

                              <h3 className="mt-1 text-2xl font-black">
                                {clasa}
                              </h3>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <MiniInfo
                              value={String(
                                moduleClasa.length
                              )}
                              label="module"
                            />

                            <MiniInfo
                              value={String(
                                lectiiClasa
                              )}
                              label="lecții"
                            />
                          </div>
                        </div>
                      </div>

                      {/* MODULES */}

                      <div className="relative grid gap-3 p-4 sm:p-5 lg:grid-cols-2">
                        {moduleClasa.map(
                          (modul) => {
                            const indexGlobal =
                              modulePrograma.findIndex(
                                (item) =>
                                  item.id === modul.id
                              ) + 1;

                            return (
                              <div
                                key={modul.id}
                                className="group relative overflow-hidden rounded-[22px] border border-white/[0.07] bg-[#06130f] p-5 transition duration-300 hover:-translate-y-1 hover:border-emerald-300/[0.16] hover:bg-[#0a1b15]"
                              >
                                <div className="flex items-start gap-4">
                                  <div
                                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border ${accent.border} ${accent.soft} text-lg font-black ${accent.text} transition duration-300 group-hover:scale-105`}
                                  >
                                    {modul.icon}
                                  </div>

                                  <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                      <span
                                        className={`rounded-full ${accent.soft} px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.16em] ${accent.text}`}
                                      >
                                        Modul {indexGlobal}
                                      </span>

                                      <span className="rounded-full bg-white/[0.035] px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-slate-500">
                                        {modul.numarLectii} lecții
                                      </span>
                                    </div>

                                    <h4 className="mt-3 text-lg font-black leading-snug sm:text-xl">
                                      {modul.titlu}
                                    </h4>

                                    <p className="mt-2 text-sm leading-6 text-slate-500">
                                      {modul.descriere}
                                    </p>
                                  </div>
                                </div>

                                <div className="mt-5 flex items-center justify-between border-t border-white/[0.05] pt-4">
                                  <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-600">
                                    {clasa}
                                  </span>

                                  <span
                                    className={`text-xs font-black ${accent.text}`}
                                  >
                                    {modul.numarLectii} lecții
                                  </span>
                                </div>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>

            {/* NEXT STEP */}

            <section className="pb-12 pt-9">
              <div className="relative overflow-hidden rounded-[30px] border border-emerald-300/15 bg-gradient-to-br from-emerald-400/[0.12] via-lime-400/[0.05] to-orange-400/[0.08] p-6 sm:p-8">
                <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-orange-400/10 blur-[90px]" />
                <div className="absolute -bottom-28 left-[20%] h-64 w-64 rounded-full bg-emerald-400/10 blur-[90px]" />

                <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-emerald-300/20 bg-emerald-300/10 text-xl text-emerald-300">
                      →
                    </div>

                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.22em] text-emerald-300">
                        Următorul pas
                      </p>

                      <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                        Programa îți arată harta.
                      </h2>

                      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                        Intră în Lecții pentru a continua
                        de unde ai rămas și pentru a
                        transforma fiecare modul în progres
                        real.
                      </p>
                    </div>
                  </div>

                  <a
                    href="/lectii"
                    className="group inline-flex shrink-0 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-300 via-lime-300 to-amber-300 px-6 py-3.5 text-sm font-black text-[#05110d] shadow-lg shadow-emerald-500/15 transition hover:-translate-y-0.5"
                  >
                    Continuă în Lecții

                    <span className="transition group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                </div>
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
          ? "border border-emerald-300/15 bg-gradient-to-r from-emerald-400/10 via-lime-400/[0.04] to-transparent text-white"
          : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
      }`}
    >
      {active && (
        <span className="absolute -left-4 h-7 w-1 rounded-r-full bg-gradient-to-b from-emerald-300 to-lime-400 shadow-[0_0_14px_rgba(52,211,153,0.65)]" />
      )}

      <span
        className={`flex w-5 justify-center text-base ${
          active
            ? "text-emerald-300"
            : "text-slate-500"
        }`}
      >
        {icon}
      </span>

      <span>{text}</span>

      {badge && (
        <span className="ml-auto rounded-full border border-lime-300/15 bg-lime-400/10 px-2 py-0.5 text-[8px] font-black uppercase tracking-wider text-lime-300">
          {badge}
        </span>
      )}
    </a>
  );
}

function StatCard({
  value,
  label,
  detail,
  tone,
}: {
  value: string;
  label: string;
  detail: string;
  tone:
    | "emerald"
    | "lime"
    | "amber"
    | "orange";
}) {
  const styles = {
    emerald:
      "border-emerald-300/15 from-emerald-400/12 text-emerald-200",
    lime:
      "border-lime-300/15 from-lime-400/10 text-lime-200",
    amber:
      "border-amber-300/15 from-amber-400/10 text-amber-200",
    orange:
      "border-orange-300/15 from-orange-400/12 text-orange-200",
  };

  return (
    <div
      className={`rounded-[22px] border bg-gradient-to-br ${styles[tone]} to-black/10 p-4 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/[0.07] sm:p-5`}
    >
      <p className="text-2xl font-black tracking-tight sm:text-3xl">
        {value}
      </p>

      <p className="mt-1 text-[10px] font-black uppercase tracking-[0.16em] text-white">
        {label}
      </p>

      <p className="mt-1 text-[10px] text-slate-400">
        {detail}
      </p>
    </div>
  );
}

function MiniInfo({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-3.5 py-2 text-center">
      <p className="text-sm font-black text-slate-200">
        {value}
      </p>

      <p className="mt-0.5 text-[8px] font-black uppercase tracking-[0.14em] text-slate-600">
        {label}
      </p>
    </div>
  );
}