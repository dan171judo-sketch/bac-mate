"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";

type ProfileRow = {
  nume: string | null;
  profil_bac: string | null;
};

type AssessmentRow = {
  id: string;
  score: number | null;
  total_questions: number | null;
  correct_answers: number | null;
  strongest_skill_id: string | null;
  weakest_skill_id: string | null;
  completed_at: string | null;
  created_at: string | null;
};

function formatSkill(skillId: string | null) {
  if (!skillId) {
    return "—";
  }

  return skillId
    .replaceAll("-", " ")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) =>
      letter.toLocaleUpperCase("ro-RO")
    );
}

function formatDate(value: string | null) {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("ro-RO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function scoreTone(score: number | null) {
  const value = score ?? 0;

  if (value >= 80) {
    return {
      text: "text-emerald-300",
      bg: "bg-emerald-400/10",
      border: "border-emerald-300/20",
      bar: "from-emerald-300 to-teal-400",
    };
  }

  if (value >= 60) {
    return {
      text: "text-lime-300",
      bg: "bg-lime-400/10",
      border: "border-lime-300/20",
      bar: "from-lime-300 to-emerald-400",
    };
  }

  return {
    text: "text-orange-300",
    bg: "bg-orange-400/10",
    border: "border-orange-300/20",
    bar: "from-orange-300 to-amber-400",
  };
}

export default function EvaluariPage() {
  const router = useRouter();
  const [supabase] = useState(() => createClient());

  const [gata, setGata] = useState(false);
  const [seDeconecteaza, setSeDeconecteaza] =
    useState(false);

  const [nume, setNume] = useState("");
  const [profil, setProfil] = useState("");

  const [evaluari, setEvaluari] = useState<
    AssessmentRow[]
  >([]);

  const [eroare, setEroare] = useState("");

  useEffect(() => {
    let activ = true;

    async function incarcaPagina() {
      setGata(false);
      setEroare("");

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

      const {
        data: profileData,
        error: profileError,
      } = await supabase
        .from("profiles")
        .select("nume, profil_bac")
        .eq("id", user.id)
        .maybeSingle();

      if (!activ) {
        return;
      }

      if (profileError || !profileData) {
        console.error(
          "Eroare la încărcarea profilului:",
          profileError
        );

        setEroare(
          "Profilul nu a putut fi încărcat."
        );

        setGata(true);
        return;
      }

      const profilSupabase =
        profileData as ProfileRow;

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

      localStorage.setItem(
        "bac-mate-nume",
        profilSupabase.nume
      );

      localStorage.setItem(
        "bac-mate-profil-cod",
        profilSupabase.profil_bac
      );

      const {
        data: assessmentData,
        error: assessmentError,
      } = await supabase
        .from("weekly_assessments")
        .select(
          "id, score, total_questions, correct_answers, strongest_skill_id, weakest_skill_id, completed_at, created_at"
        )
        .eq("user_id", user.id)
        .order("created_at", {
          ascending: false,
        });

      if (!activ) {
        return;
      }

      if (assessmentError) {
        console.error(
          "Eroare la încărcarea evaluărilor:",
          assessmentError
        );

        setEvaluari([]);
      } else {
        setEvaluari(
          (assessmentData ??
            []) as unknown as AssessmentRow[]
        );
      }

      setGata(true);
    }

    void incarcaPagina();

    return () => {
      activ = false;
    };
  }, [router, supabase]);

  const evaluariFinalizate = useMemo(
    () =>
      evaluari.filter(
        (evaluare) =>
          evaluare.score !== null ||
          evaluare.completed_at !== null
      ),
    [evaluari]
  );

  const ultimaEvaluare =
    evaluariFinalizate[0] ?? null;

  const mediaScorurilor = useMemo(() => {
    const scoruri = evaluariFinalizate
      .map((evaluare) => evaluare.score)
      .filter(
        (score): score is number =>
          typeof score === "number"
      );

    if (scoruri.length === 0) {
      return 0;
    }

    const total = scoruri.reduce(
      (suma, scor) => suma + scor,
      0
    );

    return Math.round(total / scoruri.length);
  }, [evaluariFinalizate]);

  const celMaiBunScor = useMemo(() => {
    const scoruri = evaluariFinalizate
      .map((evaluare) => evaluare.score)
      .filter(
        (score): score is number =>
          typeof score === "number"
      );

    if (scoruri.length === 0) {
      return 0;
    }

    return Math.max(...scoruri);
  }, [evaluariFinalizate]);

  const ultimaNota =
    ultimaEvaluare?.score !== null &&
    ultimaEvaluare?.score !== undefined
      ? ultimaEvaluare.score
      : null;

  const raspunsuriCorecteTotal = useMemo(() => {
    return evaluariFinalizate.reduce(
      (total, evaluare) =>
        total + (evaluare.correct_answers ?? 0),
      0
    );
  }, [evaluariFinalizate]);

  const intrebariTotal = useMemo(() => {
    return evaluariFinalizate.reduce(
      (total, evaluare) =>
        total + (evaluare.total_questions ?? 0),
      0
    );
  }, [evaluariFinalizate]);

  const rataCorectitudine =
    intrebariTotal > 0
      ? Math.round(
          (raspunsuriCorecteTotal /
            intrebariTotal) *
            100
        )
      : 0;

  const initiala =
    nume.trim().charAt(0).toUpperCase() || "M";

  async function deconectare() {
    setSeDeconecteaza(true);

    const { error } =
      await supabase.auth.signOut();

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
      "bac-mate-profil-nume"
    );
    localStorage.removeItem(
      "bac-mate-evaluare-initiala-finalizata"
    );

    router.replace("/cont");
    router.refresh();
  }

  if (!gata) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#07130f] text-white">
        <div className="text-center">
          <div className="relative mx-auto h-16 w-16">
            <div className="absolute inset-0 rounded-full bg-emerald-400/20 blur-2xl" />

            <div className="relative h-16 w-16 animate-spin rounded-full border-[5px] border-white/10 border-t-emerald-300" />
          </div>

          <p className="mt-6 text-sm font-black text-slate-300">
            Îți pregătim evaluările...
          </p>

          <p className="mt-1 text-xs text-slate-600">
            Analizăm progresul tău.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#07130f] text-white">
      {/* AMBIENT BACKGROUND */}

      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -left-[180px] top-[100px] h-[430px] w-[430px] rounded-full bg-emerald-500/[0.07] blur-[120px]" />

        <div className="absolute right-[-180px] top-[340px] h-[430px] w-[430px] rounded-full bg-orange-500/[0.06] blur-[120px]" />

        <div className="absolute bottom-[-200px] left-[35%] h-[450px] w-[450px] rounded-full bg-teal-500/[0.05] blur-[130px]" />
      </div>

      <div className="relative min-h-screen lg:flex">
        {/* SIDEBAR */}

        <aside className="border-b border-white/[0.07] bg-[#091711]/95 backdrop-blur-2xl lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-[230px] lg:border-b-0 lg:border-r">
          <div className="flex h-full flex-col">
            <div className="border-b border-white/[0.07] px-7 py-7">
              <a
                href="/dashboard"
                className="inline-flex items-center gap-2 text-[21px] font-black tracking-tight"
              >
                <span>BAC</span>

                <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-orange-300 bg-clip-text text-transparent">
                  MATE
                </span>
              </a>

              <p className="mt-2 text-[9px] font-black uppercase tracking-[0.28em] text-slate-500">
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
                active
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
              />

              <NavItem
                href="/profil"
                icon="♙"
                text="Profil"
              />
            </nav>

            <div className="hidden p-5 lg:block">
              <div className="relative overflow-hidden rounded-[22px] border border-emerald-300/15 bg-gradient-to-br from-emerald-400/[0.09] via-transparent to-orange-400/[0.06] p-4">
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-emerald-400/10 blur-2xl" />

                <p className="relative text-sm italic leading-6 text-slate-300">
                  „O evaluare bună nu îți spune doar
                  cât știi. Îți arată ce merită să
                  lucrezi în continuare.”
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
          {/* TOPBAR */}

          <header className="sticky top-0 z-30 border-b border-white/[0.07] bg-[#07130f]/90 backdrop-blur-2xl">
            <div className="flex min-h-[72px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-500">
                  BAC MATE
                </p>

                <p className="mt-1 text-sm font-black text-slate-200">
                  Evaluări
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
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-300/30 bg-gradient-to-br from-emerald-400 via-teal-500 to-orange-400 text-sm font-black text-[#06130e] shadow-lg shadow-emerald-500/20"
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
            {eroare && (
              <div className="mb-6 rounded-2xl border border-red-400/20 bg-red-400/10 px-5 py-4 text-sm text-red-200">
                {eroare}
              </div>
            )}

            {/* HERO */}

            <section className="relative overflow-hidden rounded-[34px] border border-emerald-300/20 bg-gradient-to-br from-[#0d3b2d] via-[#12382f] to-[#4b2c19] p-6 shadow-[0_35px_100px_rgba(0,0,0,0.38)] sm:p-8 lg:p-10">
              <div className="pointer-events-none absolute -left-24 -top-28 h-96 w-96 rounded-full bg-emerald-300/20 blur-[100px]" />

              <div className="pointer-events-none absolute left-[40%] top-[-180px] h-96 w-96 rounded-full bg-teal-400/10 blur-[110px]" />

              <div className="pointer-events-none absolute -bottom-36 -right-20 h-[420px] w-[420px] rounded-full bg-orange-400/20 blur-[100px]" />

              <div className="pointer-events-none absolute right-[18%] top-[15%] h-40 w-40 rounded-full border border-orange-300/[0.08]" />

              <div className="relative grid gap-9 xl:grid-cols-[1fr_420px] xl:items-center">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/20 bg-emerald-300/10 px-3 py-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
                    </span>

                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-100">
                      Evaluare adaptivă
                    </span>
                  </div>

                  <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[0.98] tracking-[-0.045em] sm:text-5xl lg:text-[58px]">
                    Vezi exact
                    <span className="block bg-gradient-to-r from-emerald-200 via-lime-200 to-orange-200 bg-clip-text text-transparent">
                      unde te afli.
                    </span>
                  </h1>

                  <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-200/80 sm:text-base">
                    Evaluarea folosește progresul tău
                    pentru a prioritiza competențele care
                    merită reverificate. Primești un
                    rezultat clar și o direcție concretă
                    pentru următorul pas.
                  </p>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <a
                      href="/evaluare-saptamanala"
                      className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-orange-300 via-amber-300 to-orange-400 px-6 py-3.5 text-sm font-black text-[#241306] shadow-[0_16px_40px_rgba(251,146,60,0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(251,146,60,0.25)]"
                    >
                      Începe evaluarea

                      <span className="transition group-hover:translate-x-1">
                        →
                      </span>
                    </a>

                    <a
                      href="/progres"
                      className="inline-flex items-center gap-2 rounded-2xl border border-emerald-200/15 bg-emerald-300/[0.07] px-5 py-3.5 text-sm font-black backdrop-blur-xl transition hover:bg-emerald-300/[0.12]"
                    >
                      <span className="text-emerald-300">
                        ↗
                      </span>
                      Vezi progresul
                    </a>
                  </div>
                </div>

                {/* HERO STATS */}

                <div className="grid grid-cols-2 gap-3">
                  <HeroStat
                    value={String(
                      evaluariFinalizate.length
                    )}
                    label="Evaluări"
                    detail="finalizate"
                    color="emerald"
                  />

                  <HeroStat
                    value={`${mediaScorurilor}%`}
                    label="Medie"
                    detail="scor general"
                    color="orange"
                  />

                  <HeroStat
                    value={`${celMaiBunScor}%`}
                    label="Record"
                    detail="cel mai bun scor"
                    color="lime"
                  />

                  <HeroStat
                    value={
                      ultimaNota !== null
                        ? `${ultimaNota}%`
                        : "—"
                    }
                    label="Ultimul"
                    detail="scor obținut"
                    color="amber"
                  />
                </div>
              </div>
            </section>

            {/* QUICK OVERVIEW */}

            <section className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <MetricCard
                icon="✓"
                label="Evaluări finalizate"
                value={String(
                  evaluariFinalizate.length
                )}
                detail="sesiuni salvate"
                color="emerald"
              />

              <MetricCard
                icon="◎"
                label="Rată corectitudine"
                value={`${rataCorectitudine}%`}
                detail={
                  intrebariTotal > 0
                    ? `${raspunsuriCorecteTotal}/${intrebariTotal} răspunsuri`
                    : "după prima evaluare"
                }
                color="lime"
              />

              <MetricCard
                icon="↗"
                label="Cel mai bun scor"
                value={`${celMaiBunScor}%`}
                detail="record personal"
                color="orange"
              />

              <MetricCard
                icon="✦"
                label="Focus curent"
                value={
                  ultimaEvaluare
                    ? formatSkill(
                        ultimaEvaluare.weakest_skill_id
                      )
                    : "—"
                }
                detail="de consolidat"
                color="amber"
                compact
              />
            </section>

            {/* MAIN NEXT STEP */}

            <section className="mt-5 grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
              <div className="group relative overflow-hidden rounded-[30px] border border-emerald-300/20 bg-gradient-to-br from-emerald-400/[0.13] via-teal-500/[0.07] to-[#0c1a14] p-6 shadow-[0_22px_60px_rgba(0,0,0,0.18)] sm:p-7">
                <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-emerald-400/12 blur-[80px]" />

                <div className="pointer-events-none absolute bottom-[-120px] left-[35%] h-64 w-64 rounded-full bg-orange-400/[0.07] blur-[80px]" />

                <div className="relative flex h-full flex-col">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] border border-emerald-200/20 bg-emerald-300/10 text-xl font-black text-emerald-300 shadow-[0_0_30px_rgba(52,211,153,0.08)]">
                      ✓
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-emerald-300">
                          Următorul pas
                        </p>

                        <span className="rounded-full border border-orange-300/15 bg-orange-400/10 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-orange-300">
                          Recomandat
                        </span>
                      </div>

                      <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
                        Evaluare adaptivă
                      </h2>
                    </div>
                  </div>

                  <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400">
                    Întrebările sunt alese în funcție de
                    datele disponibile despre
                    competențele tale. Răspunsurile sunt
                    verificate, iar rezultatul este salvat
                    pentru recomandările următoare.
                  </p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    <MiniFeature
                      icon="1"
                      title="Focus"
                      text="pe zonele relevante"
                    />

                    <MiniFeature
                      icon="2"
                      title="Rezolvare"
                      text="întrebări adaptate"
                    />

                    <MiniFeature
                      icon="3"
                      title="Rezultat"
                      text="salvat în progres"
                    />
                  </div>

                  <div className="mt-7">
                    <a
                      href="/evaluare-saptamanala"
                      className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-300 to-lime-300 px-6 py-3.5 text-sm font-black text-[#07150e] shadow-[0_14px_35px_rgba(52,211,153,0.15)] transition hover:-translate-y-0.5"
                    >
                      Începe acum
                      <span>→</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* HOW IT WORKS */}

              <div className="relative overflow-hidden rounded-[30px] border border-orange-300/15 bg-gradient-to-br from-orange-400/[0.1] via-[#1b1b14] to-[#0c1712] p-6 sm:p-7">
                <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-orange-400/10 blur-[70px]" />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.22em] text-orange-300">
                        Proces inteligent
                      </p>

                      <h2 className="mt-2 text-2xl font-black">
                        Cum funcționează
                      </h2>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-orange-300/15 bg-orange-400/10 text-lg text-orange-300">
                      ⚡
                    </div>
                  </div>

                  <div className="mt-6 space-y-5">
                    <Step
                      number="01"
                      title="MATE alege focusul"
                      text="Sunt prioritizate competențele care merită verificate."
                    />

                    <Step
                      number="02"
                      title="Tu răspunzi"
                      text="Rezolvi întrebările și verifici ce ai înțeles."
                    />

                    <Step
                      number="03"
                      title="Progresul se actualizează"
                      text="Rezultatul intră în istoricul și progresul tău."
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* LAST ASSESSMENT */}

            {ultimaEvaluare ? (
              <section className="relative mt-5 overflow-hidden rounded-[30px] border border-white/[0.08] bg-[#0d1c16] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.15)] sm:p-7">
                <div className="pointer-events-none absolute right-[-80px] top-[-100px] h-72 w-72 rounded-full bg-emerald-400/[0.08] blur-[80px]" />

                <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-[10px] font-black uppercase tracking-[0.22em] text-emerald-300">
                        Ultima evaluare
                      </p>

                      <span className="rounded-full bg-white/[0.04] px-2.5 py-1 text-[9px] font-bold text-slate-500">
                        {formatDate(
                          ultimaEvaluare.completed_at ??
                            ultimaEvaluare.created_at
                        )}
                      </span>
                    </div>

                    <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
                      Rezultatul ultimei sesiuni
                    </h2>

                    <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                      Folosește rezultatul ca reper pentru
                      următoarea etapă de pregătire.
                    </p>
                  </div>

                  <ScoreRing
                    score={ultimaEvaluare.score ?? 0}
                  />
                </div>

                <div className="relative mt-7 grid gap-4 md:grid-cols-3">
                  <ResultCard
                    icon="✓"
                    label="Răspunsuri corecte"
                    value={
                      ultimaEvaluare.correct_answers !==
                        null &&
                      ultimaEvaluare.total_questions !==
                        null
                        ? `${ultimaEvaluare.correct_answers}/${ultimaEvaluare.total_questions}`
                        : "—"
                    }
                    tone="emerald"
                  />

                  <ResultCard
                    icon="↗"
                    label="Punct forte"
                    value={formatSkill(
                      ultimaEvaluare.strongest_skill_id
                    )}
                    tone="lime"
                  />

                  <ResultCard
                    icon="!"
                    label="De consolidat"
                    value={formatSkill(
                      ultimaEvaluare.weakest_skill_id
                    )}
                    tone="orange"
                  />
                </div>

                <div className="relative mt-6 flex flex-wrap gap-3">
                  <a
                    href="/evaluare-saptamanala"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-300 to-amber-300 px-5 py-3 text-sm font-black text-[#211307] transition hover:-translate-y-0.5"
                  >
                    Evaluare nouă
                    <span>→</span>
                  </a>

                  <a
                    href="/mate"
                    className="inline-flex items-center gap-2 rounded-xl border border-emerald-300/15 bg-emerald-400/[0.07] px-5 py-3 text-sm font-black text-emerald-100 transition hover:bg-emerald-400/[0.12]"
                  >
                    <span className="text-emerald-300">
                      ✦
                    </span>
                    Lucrează cu MATE
                  </a>
                </div>
              </section>
            ) : (
              <section className="relative mt-5 overflow-hidden rounded-[30px] border border-dashed border-emerald-300/20 bg-gradient-to-br from-emerald-400/[0.08] to-orange-400/[0.04] p-9 text-center">
                <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/[0.07] blur-[70px]" />

                <div className="relative">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[20px] border border-emerald-300/20 bg-emerald-400/10 text-2xl font-black text-emerald-300">
                    ✓
                  </div>

                  <h2 className="mt-5 text-2xl font-black">
                    Prima ta evaluare te așteaptă.
                  </h2>

                  <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-400">
                    După prima sesiune vei vedea aici
                    scorul, punctele forte și zona pe care
                    merită să o consolidezi.
                  </p>

                  <a
                    href="/evaluare-saptamanala"
                    className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-300 to-lime-300 px-6 py-3.5 text-sm font-black text-[#07150e]"
                  >
                    Începe evaluarea
                    <span>→</span>
                  </a>
                </div>
              </section>
            )}

            {/* HISTORY */}

            <section className="mt-10">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-orange-300">
                    Istoric
                  </p>

                  <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                    Evaluările tale
                  </h2>

                  <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                    Urmărește evoluția scorurilor și
                    observă ce zone apar repetat în
                    recomandările de consolidare.
                  </p>
                </div>

                <div className="rounded-full border border-emerald-300/10 bg-emerald-400/[0.05] px-4 py-2 text-xs font-bold text-emerald-200">
                  {evaluariFinalizate.length} sesiuni
                </div>
              </div>

              {evaluariFinalizate.length === 0 ? (
                <div className="mt-6 rounded-[28px] border border-white/[0.08] bg-[#0d1c16] p-8">
                  <p className="font-black">
                    Nu ai încă evaluări finalizate.
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    Istoricul va fi completat automat
                    după prima evaluare.
                  </p>
                </div>
              ) : (
                <div className="mt-6 overflow-hidden rounded-[30px] border border-white/[0.08] bg-[#0d1c16] shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
                  <div className="hidden grid-cols-[1.2fr_0.7fr_0.8fr_1fr] gap-4 border-b border-white/[0.07] bg-white/[0.025] px-6 py-4 text-[10px] font-black uppercase tracking-[0.15em] text-slate-600 md:grid">
                    <span>Evaluare</span>
                    <span>Scor</span>
                    <span>Corecte</span>
                    <span>De consolidat</span>
                  </div>

                  <div className="divide-y divide-white/[0.06]">
                    {evaluariFinalizate
                      .slice(0, 8)
                      .map((evaluare, index) => {
                        const tone = scoreTone(
                          evaluare.score
                        );

                        return (
                          <div
                            key={evaluare.id}
                            className="group grid gap-4 px-5 py-5 transition hover:bg-white/[0.025] sm:px-6 md:grid-cols-[1.2fr_0.7fr_0.8fr_1fr] md:items-center"
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-300/10 bg-emerald-400/[0.06] text-xs font-black text-emerald-300 transition group-hover:scale-105">
                                {evaluariFinalizate.length -
                                  index}
                              </div>

                              <div>
                                <p className="font-black">
                                  Evaluare{" "}
                                  {evaluariFinalizate.length -
                                    index}
                                </p>

                                <p className="mt-1 text-xs text-slate-600">
                                  {formatDate(
                                    evaluare.completed_at ??
                                      evaluare.created_at
                                  )}
                                </p>
                              </div>
                            </div>

                            <div>
                              <div
                                className={`inline-flex rounded-xl border px-3 py-2 ${tone.bg} ${tone.border}`}
                              >
                                <p
                                  className={`text-lg font-black ${tone.text}`}
                                >
                                  {evaluare.score ?? 0}%
                                </p>
                              </div>
                            </div>

                            <div>
                              <p className="text-sm font-black text-slate-300">
                                {evaluare.correct_answers !==
                                  null &&
                                evaluare.total_questions !==
                                  null
                                  ? `${evaluare.correct_answers}/${evaluare.total_questions}`
                                  : "—"}
                              </p>

                              <p className="mt-1 text-[9px] font-black uppercase tracking-[0.14em] text-slate-700 md:hidden">
                                răspunsuri corecte
                              </p>
                            </div>

                            <div>
                              <p className="text-sm font-black text-orange-300">
                                {formatSkill(
                                  evaluare.weakest_skill_id
                                )}
                              </p>

                              <p className="mt-1 text-[9px] font-black uppercase tracking-[0.14em] text-slate-700 md:hidden">
                                de consolidat
                              </p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
            </section>

            {/* BOTTOM */}

            <section className="mt-8 grid gap-5 pb-12 lg:grid-cols-2">
              <div className="relative overflow-hidden rounded-[30px] border border-emerald-300/15 bg-gradient-to-br from-emerald-400/[0.12] via-teal-500/[0.06] to-transparent p-6 sm:p-7">
                <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-emerald-400/10 blur-3xl" />

                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-300/20 bg-emerald-300/10 text-xl text-emerald-300">
                    ✦
                  </div>

                  <p className="mt-5 text-[10px] font-black uppercase tracking-[0.22em] text-emerald-300">
                    MATE AI
                  </p>

                  <h3 className="mt-2 text-2xl font-black">
                    Transformă rezultatul în progres.
                  </h3>

                  <p className="mt-3 max-w-lg text-sm leading-6 text-slate-400">
                    După evaluare, MATE te poate ajuta
                    să înțelegi greșelile și să lucrezi
                    exact pe conceptele care au nevoie de
                    consolidare.
                  </p>

                  <a
                    href="/mate"
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-300 to-teal-300 px-5 py-3 text-sm font-black text-[#07150e] transition hover:-translate-y-0.5"
                  >
                    Vorbește cu MATE
                    <span>→</span>
                  </a>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[30px] border border-orange-300/15 bg-gradient-to-br from-orange-400/[0.11] via-amber-400/[0.05] to-transparent p-6 sm:p-7">
                <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-orange-400/10 blur-3xl" />

                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-orange-300/20 bg-orange-300/10 text-xl text-orange-300">
                    ▣
                  </div>

                  <p className="mt-5 text-[10px] font-black uppercase tracking-[0.22em] text-orange-300">
                    Lecții
                  </p>

                  <h3 className="mt-2 text-2xl font-black">
                    Consolidează prin practică.
                  </h3>

                  <p className="mt-3 max-w-lg text-sm leading-6 text-slate-400">
                    Revino la lecții pentru a continua
                    materia sau pentru a repeta conceptele
                    care încă au nevoie de lucru.
                  </p>

                  <a
                    href="/lectii"
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-300 to-amber-300 px-5 py-3 text-sm font-black text-[#211307] transition hover:-translate-y-0.5"
                  >
                    Mergi la lecții
                    <span>→</span>
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
          ? "border border-emerald-300/15 bg-gradient-to-r from-emerald-400/10 via-teal-400/[0.07] to-orange-400/[0.05] text-white"
          : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
      }`}
    >
      {active && (
        <span className="absolute -left-4 h-7 w-1 rounded-r-full bg-gradient-to-b from-emerald-300 via-teal-300 to-orange-300 shadow-[0_0_12px_rgba(52,211,153,0.45)]" />
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
        <span className="ml-auto rounded-full border border-orange-300/15 bg-orange-400/10 px-2 py-0.5 text-[8px] font-black uppercase tracking-wider text-orange-300">
          {badge}
        </span>
      )}
    </a>
  );
}

function HeroStat({
  value,
  label,
  detail,
  color,
}: {
  value: string;
  label: string;
  detail: string;
  color:
    | "emerald"
    | "orange"
    | "lime"
    | "amber";
}) {
  const styles = {
    emerald: {
      value: "text-emerald-200",
      bg: "from-emerald-400/15",
      border: "border-emerald-200/15",
    },
    orange: {
      value: "text-orange-200",
      bg: "from-orange-400/15",
      border: "border-orange-200/15",
    },
    lime: {
      value: "text-lime-200",
      bg: "from-lime-400/15",
      border: "border-lime-200/15",
    },
    amber: {
      value: "text-amber-200",
      bg: "from-amber-400/15",
      border: "border-amber-200/15",
    },
  };

  const style = styles[color];

  return (
    <div
      className={`rounded-[22px] border ${style.border} bg-gradient-to-br ${style.bg} to-black/10 p-4 backdrop-blur-xl transition hover:-translate-y-0.5 sm:p-5`}
    >
      <p
        className={`text-2xl font-black tracking-tight sm:text-3xl ${style.value}`}
      >
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

function MetricCard({
  icon,
  label,
  value,
  detail,
  color,
  compact = false,
}: {
  icon: string;
  label: string;
  value: string;
  detail: string;
  color:
    | "emerald"
    | "lime"
    | "orange"
    | "amber";
  compact?: boolean;
}) {
  const styles = {
    emerald: {
      text: "text-emerald-300",
      bg: "bg-emerald-400/10",
      border: "border-emerald-300/15",
    },
    lime: {
      text: "text-lime-300",
      bg: "bg-lime-400/10",
      border: "border-lime-300/15",
    },
    orange: {
      text: "text-orange-300",
      bg: "bg-orange-400/10",
      border: "border-orange-300/15",
    },
    amber: {
      text: "text-amber-300",
      bg: "bg-amber-400/10",
      border: "border-amber-300/15",
    },
  };

  const style = styles[color];

  return (
    <div className="group rounded-[24px] border border-white/[0.07] bg-[#0d1c16] p-5 transition duration-200 hover:-translate-y-1 hover:border-white/[0.12] hover:bg-[#102219]">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl border ${style.border} ${style.bg} text-sm font-black ${style.text}`}
      >
        {icon}
      </div>

      <p className="mt-4 text-[9px] font-black uppercase tracking-[0.17em] text-slate-600">
        {label}
      </p>

      <p
        className={`mt-2 font-black ${style.text} ${
          compact
            ? "line-clamp-2 text-base"
            : "text-2xl"
        }`}
      >
        {value}
      </p>

      <p className="mt-1 text-[10px] text-slate-600">
        {detail}
      </p>
    </div>
  );
}

function MiniFeature({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-black/10 p-4">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400/10 text-[10px] font-black text-emerald-300">
        {icon}
      </div>

      <p className="mt-3 text-xs font-black">
        {title}
      </p>

      <p className="mt-1 text-[10px] leading-4 text-slate-500">
        {text}
      </p>
    </div>
  );
}

function Step({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="group flex gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-orange-300/15 bg-orange-400/10 text-[10px] font-black text-orange-300 transition group-hover:bg-orange-400/15">
        {number}
      </div>

      <div>
        <p className="text-sm font-black">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          {text}
        </p>
      </div>
    </div>
  );
}

function ScoreRing({
  score,
}: {
  score: number;
}) {
  const safeScore = Math.max(
    0,
    Math.min(score, 100)
  );

  const tone = scoreTone(score);

  return (
    <div className="flex shrink-0 items-center gap-4 rounded-[22px] border border-white/[0.07] bg-black/10 p-4">
      <div
        className={`flex h-20 w-20 items-center justify-center rounded-full border-[7px] ${tone.border} ${tone.bg}`}
      >
        <span
          className={`text-xl font-black ${tone.text}`}
        >
          {safeScore}%
        </span>
      </div>

      <div className="hidden sm:block">
        <p className="text-[9px] font-black uppercase tracking-[0.16em] text-slate-600">
          Ultimul scor
        </p>

        <p
          className={`mt-1 text-sm font-black ${tone.text}`}
        >
          {safeScore >= 80
            ? "Foarte bine"
            : safeScore >= 60
              ? "În progres"
              : "De consolidat"}
        </p>
      </div>
    </div>
  );
}

function ResultCard({
  icon,
  label,
  value,
  tone,
}: {
  icon: string;
  label: string;
  value: string;
  tone: "emerald" | "lime" | "orange";
}) {
  const styles = {
    emerald: {
      text: "text-emerald-300",
      bg: "bg-emerald-400/[0.08]",
      border: "border-emerald-300/15",
    },
    lime: {
      text: "text-lime-300",
      bg: "bg-lime-400/[0.08]",
      border: "border-lime-300/15",
    },
    orange: {
      text: "text-orange-300",
      bg: "bg-orange-400/[0.08]",
      border: "border-orange-300/15",
    },
  };

  const style = styles[tone];

  return (
    <div
      className={`rounded-[22px] border ${style.border} ${style.bg} p-5`}
    >
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-xl border ${style.border} bg-black/10 text-xs font-black ${style.text}`}
      >
        {icon}
      </div>

      <p className="mt-4 text-[9px] font-black uppercase tracking-[0.16em] text-slate-600">
        {label}
      </p>

      <p
        className={`mt-2 break-words font-black ${style.text}`}
      >
        {value}
      </p>
    </div>
  );
}