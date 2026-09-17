"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { lectii } from "../../data/lectii/index";
import { createClient } from "../../lib/supabase/client";
import {
  getDailyPlan,
  type DailyPlanData,
} from "../../lib/daily-plan/service";
import {
  getLessonHrefForSkill,
} from "../../lib/daily-plan/lesson-resolver";

type ProgresLectie = {
  id: string;
  titlu: string;
  finalizata: boolean;
  xp: number;
  xpMaxim: number;
  modul: number;
  numarLectie: number;
  totalLectiiModul: number;
  href: string;
};

type ProgresSupabase = {
  lesson_id: string;
  completed: boolean;
  xp: number | null;
};

type AvatarGender = "male" | "female" | "standard";

export default function DashboardPage() {
  const router = useRouter();
  const [supabase] = useState(() => createClient());

  const [nume, setNume] = useState("");
  const [profil, setProfil] = useState("M_mate-info");
  const [avatarGender, setAvatarGender] =
    useState<AvatarGender>("standard");

  const [progres, setProgres] = useState<ProgresLectie[]>([]);
  const [dailyPlanData, setDailyPlanData] =
    useState<DailyPlanData | null>(null);

  const [gata, setGata] = useState(false);
  const [eroareProgres, setEroareProgres] = useState("");
  const [seDeconecteaza, setSeDeconecteaza] =
    useState(false);

  async function deconectare() {
    setSeDeconecteaza(true);

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Eroare la deconectare:", error);
      setSeDeconecteaza(false);
      return;
    }

    localStorage.removeItem("bac-mate-nume");
    localStorage.removeItem("bac-mate-profil-cod");
    localStorage.removeItem("bac-mate-profil-nume");
    localStorage.removeItem(
      "bac-mate-evaluare-initiala-finalizata"
    );

    router.replace("/cont");
    router.refresh();
  }

  useEffect(() => {
    let activ = true;

    async function incarcaDashboard() {
      setGata(false);
      setEroareProgres("");

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
        .select(
          "nume, profil_bac, evaluare_initiala_finalizata, avatar_gender"
        )
        .eq("id", user.id)
        .maybeSingle();

      if (!activ) return;

      if (profilError) {
        console.error(
          "Eroare la încărcarea profilului:",
          profilError
        );

        router.replace("/cont");
        return;
      }

      if (!profilSupabase?.nume) {
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

      const gender = profilSupabase.avatar_gender;

      if (gender === "male" || gender === "female") {
        setAvatarGender(gender);
      } else {
        setAvatarGender("standard");
      }

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

      // Daily Plan nu blochează Dashboard-ul dacă apare o eroare.
      try {
        const dailyPlan = await getDailyPlan(supabase);

        if (activ) {
          setDailyPlanData(dailyPlan);
        }
      } catch (error) {
        console.error(
          "Eroare Daily Plan Dashboard:",
          error
        );

        if (activ) {
          setDailyPlanData(null);
        }
      }

      const {
        data: progresSalvat,
        error: progresError,
      } = await supabase
        .from("student_progress")
        .select("lesson_id, completed, xp")
        .eq("user_id", user.id);

      if (!activ) return;

      if (progresError) {
        console.error(
          "Eroare la încărcarea progresului:",
          progresError
        );

        setEroareProgres(
          "Progresul contului nu a putut fi încărcat momentan."
        );

        setGata(true);
        return;
      }

      const progresCloud =
        (progresSalvat ?? []) as ProgresSupabase[];

      const idsLectiiValide = new Set(
        lectii.map((lectie) => lectie.id)
      );

      const progresValid = progresCloud.filter((item) =>
        idsLectiiValide.has(item.lesson_id)
      );

      const progresDupaLectie = new Map<
        string,
        ProgresSupabase
      >();

      progresValid.forEach((item) => {
        progresDupaLectie.set(item.lesson_id, item);
      });

      const progresLectii: ProgresLectie[] =
        lectii.map((lectie) => {
          const progresCloudLectie =
            progresDupaLectie.get(lectie.id);

          const finalizata =
            progresCloudLectie?.completed === true;

          const xpSalvat =
            typeof progresCloudLectie?.xp === "number" &&
            Number.isFinite(progresCloudLectie.xp)
              ? progresCloudLectie.xp
              : 0;

          const xpMaxim = lectie.exercitii.length * 10;

          const xpCorect = Math.max(
            0,
            Math.min(xpSalvat, xpMaxim)
          );

          localStorage.setItem(
            lectie.storageKeyXp,
            String(xpCorect)
          );

          if (finalizata) {
            localStorage.setItem(
              lectie.storageKeyFinalizata,
              "da"
            );
          } else {
            localStorage.removeItem(
              lectie.storageKeyFinalizata
            );
          }

          return {
            id: lectie.id,
            titlu: lectie.titlu,
            finalizata,
            xp: xpCorect,
            xpMaxim,
            modul: lectie.modul,
            numarLectie: lectie.numarLectie,
            totalLectiiModul:
              lectie.totalLectiiModul,
            href: `/lectii/${lectie.slug}`,
          };
        });

      if (!activ) return;

      setProgres(progresLectii);
      setGata(true);
    }

    incarcaDashboard();

    return () => {
      activ = false;
    };
  }, [router, supabase]);

  const totalLectii = lectii.length;

  const lectiiFinalizate = useMemo(
    () =>
      progres.filter((lectie) => lectie.finalizata)
        .length,
    [progres]
  );

  const xpTotal = useMemo(
    () =>
      progres.reduce(
        (total, lectie) => total + lectie.xp,
        0
      ),
    [progres]
  );

  const xpMaximTotal = useMemo(
    () =>
      progres.reduce(
        (total, lectie) =>
          total + lectie.xpMaxim,
        0
      ),
    [progres]
  );

  const procentExact =
    totalLectii === 0
      ? 0
      : (lectiiFinalizate / totalLectii) * 100;

  const procentGeneral =
    Math.round(procentExact * 10) / 10;

  const numarModule = useMemo(
    () =>
      new Set(
        lectii.map((lectie) => lectie.modul)
      ).size,
    []
  );

  const urmatoareaLectie = useMemo(() => {
    if (progres.length === 0) return null;

    return (
      progres.find(
        (lectie) => !lectie.finalizata
      ) ?? null
    );
  }, [progres]);

  const existaProgresSarindLectii =
    useMemo(() => {
      if (!urmatoareaLectie) return false;

      const indexUrmatoare =
        progres.findIndex(
          (lectie) =>
            lectie.id === urmatoareaLectie.id
        );

      if (indexUrmatoare < 0) return false;

      return progres
        .slice(indexUrmatoare + 1)
        .some(
          (lectie) =>
            lectie.finalizata || lectie.xp > 0
        );
    }, [progres, urmatoareaLectie]);

  const toateFinalizate =
    totalLectii > 0 &&
    lectiiFinalizate === totalLectii;

  const progresPeModule = useMemo(() => {
    const module = new Map<
      number,
      {
        total: number;
        finalizate: number;
        xp: number;
        xpMaxim: number;
      }
    >();

    progres.forEach((lectie) => {
      const existent =
        module.get(lectie.modul) ?? {
          total: 0,
          finalizate: 0,
          xp: 0,
          xpMaxim: 0,
        };

      existent.total += 1;
      existent.xp += lectie.xp;
      existent.xpMaxim += lectie.xpMaxim;

      if (lectie.finalizata) {
        existent.finalizate += 1;
      }

      module.set(lectie.modul, existent);
    });

    return Array.from(module.entries())
      .sort(([a], [b]) => a - b)
      .map(([modul, valori]) => ({
        modul,
        ...valori,
        procent:
          valori.total === 0
            ? 0
            : Math.round(
                (valori.finalizate /
                  valori.total) *
                  100
              ),
      }));
  }, [progres]);

  const initiala =
    nume.trim().charAt(0).toUpperCase() || "M";

  const primaryDailyAction =
    dailyPlanData?.plan.primaryAction ?? null;

  const dailyPlanHref = primaryDailyAction
    ? getLessonHrefForSkill(
        primaryDailyAction.skillId
      )
    : urmatoareaLectie?.href ?? "/programa";

  const dailyPlanSkillName = primaryDailyAction
    ? primaryDailyAction.skillId
        .replaceAll("-", " ")
        .replace(/\b\w/g, (letter) =>
          letter.toUpperCase()
        )
    : null;

  const dailyPlanActionLabel = primaryDailyAction
    ? primaryDailyAction.action === "retest"
      ? "Retestare recomandată"
      : primaryDailyAction.action === "review"
        ? "Recapitulare recomandată"
        : primaryDailyAction.action === "consolidate"
          ? "Consolidare recomandată"
          : "Continuă materia"
    : null;

  const dailyPlanPriorityLabel = primaryDailyAction
    ? primaryDailyAction.priority === "critical"
      ? "Prioritate critică"
      : primaryDailyAction.priority === "high"
        ? "Prioritate mare"
        : primaryDailyAction.priority === "normal"
          ? "Prioritate normală"
          : "Menținere"
    : null;

  const mesajMate = primaryDailyAction
    ? `Am analizat progresul, Mastery-ul și greșelile disponibile. Pentru azi, focusul principal este „${dailyPlanSkillName}”.`
    : toateFinalizate
      ? "Ai parcurs toate lecțiile. De aici ne concentrăm pe recapitulare, consolidare și menținerea materiei proaspete până la BAC."
      : urmatoareaLectie
        ? `Am verificat progresul tău. Următorul pas recomandat este „${urmatoareaLectie.titlu}”. Continuăm de acolo și construim pas cu pas.`
        : "Sunt aici să îți organizez pregătirea pentru BAC, pas cu pas.";

  if (!gata) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#111827] text-white">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-cyan-400" />
          <p className="mt-5 text-sm font-bold text-slate-400">
            MATE îți pregătește dashboard-ul...
          </p>
        </div>
      </main>
    );
  }

  if (eroareProgres) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#111827] px-6 text-white">
        <div className="max-w-xl rounded-3xl border border-red-400/20 bg-red-500/10 p-8">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-red-300">
            Progres indisponibil
          </p>

          <h1 className="mt-3 text-3xl font-black">
            Nu putem afișa statisticile corect.
          </h1>

          <p className="mt-4 text-slate-300">
            {eroareProgres}
          </p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 rounded-xl bg-blue-600 px-5 py-3 font-black transition hover:bg-blue-500"
          >
            Încearcă din nou
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#101827] text-white">
      <div className="min-h-screen lg:flex">

        {/* SIDEBAR */}

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
                active
              />

              <NavItem
                href="/programa"
                icon="▣"
                text="Lecții"
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
                  „Nu trebuie să fii perfect.
                  Trebuie doar să fii consecvent.”
                </p>

                <p className="mt-3 text-xs font-black text-cyan-300">
                  — MATE
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* CONTENT */}

        <div className="min-w-0 flex-1 lg:ml-[220px]">

          {/* TOP BAR */}

          <header className="sticky top-0 z-30 border-b border-white/10 bg-[#101827]/95 backdrop-blur-xl">
            <div className="flex h-[76px] items-center justify-end px-5 sm:px-8">
              <div className="flex items-center gap-3">
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
                  title="Deconectare"
                  className="rounded-xl border border-white/10 px-3 py-2 text-xs font-bold text-slate-400 transition hover:border-red-400/30 hover:text-red-300 disabled:opacity-50"
                >
                  {seDeconecteaza ? "..." : "Ieșire"}
                </button>
              </div>
            </div>
          </header>

          {/* DASHBOARD */}

          <div className="mx-auto max-w-[1180px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">

            {/* INTRO */}

            <section className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-300">
                  Centrul tău de pregătire
                </p>

                <h1 className="mt-2 text-4xl font-black tracking-tight md:text-5xl">
                  Salut, {nume}!{" "}
                  <span aria-hidden>👋</span>
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
                  Aici vezi progresul tău real și
                  următorul pas recomandat pentru
                  pregătirea la BAC.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-black text-emerald-300">
                  ● progres sincronizat
                </span>

                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-black text-slate-300">
                  {lectiiFinalizate}/{totalLectii} lecții
                </span>
              </div>
            </section>

            {/* MATE HERO */}

            <section className="relative mt-8 overflow-hidden rounded-[30px] border border-blue-300/20 bg-gradient-to-br from-[#263b5b] via-[#283854] to-[#34314f] p-6 shadow-2xl shadow-black/20 sm:p-8">
              <div className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
              <div className="pointer-events-none absolute -right-24 bottom-[-100px] h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />

              <div className="relative flex flex-col gap-7 md:flex-row md:items-center">

                <MateAvatar gender={avatarGender} />

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-cyan-200">
                      MATE
                    </span>

                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-300">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      online
                    </span>
                  </div>

                  <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
                    Partenerul tău personal de matematică
                  </h2>

                  <div className="mt-4 rounded-2xl border border-white/10 bg-black/15 p-4">
                    <p className="text-sm font-semibold leading-6 text-slate-200">
                      Salut, {nume}! {mesajMate}
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <a
                      href={dailyPlanHref}
                      className="rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-5 py-3 text-sm font-black shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5"
                    >
                      {primaryDailyAction
                        ? "Începe planul de azi →"
                        : "Continuă pregătirea →"}
                    </a>

                    <a
                      href="/mate"
                      className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-black transition hover:bg-white/10"
                    >
                      Vorbește cu MATE
                    </a>
                  </div>
                </div>
              </div>
            </section>
                        {/* DAILY PLAN */}

            {primaryDailyAction && (
              <section className="relative mt-6 overflow-hidden rounded-[28px] border border-cyan-300/15 bg-gradient-to-br from-cyan-400/[0.08] via-[#182338] to-blue-500/[0.08] p-6 sm:p-7">
                <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />

                <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-cyan-200">
                        Planul tău de azi
                      </span>

                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-black text-slate-300">
                        {dailyPlanPriorityLabel}
                      </span>

                      {primaryDailyAction.reviewDue && (
                        <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-[10px] font-black text-amber-200">
                          Recapitulare scadentă
                        </span>
                      )}

                      {primaryDailyAction.weeklyWeakness && (
                        <span className="rounded-full border border-violet-300/20 bg-violet-300/10 px-3 py-1 text-[10px] font-black text-violet-200">
                          Detectat la evaluarea săptămânală
                        </span>
                      )}
                    </div>

                    <h2 className="mt-4 text-2xl font-black tracking-tight sm:text-3xl">
                      {dailyPlanSkillName}
                    </h2>

                    <p className="mt-2 text-sm font-black text-cyan-300">
                      {dailyPlanActionLabel}
                    </p>

                    <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
                      {primaryDailyAction.reason}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      <span className="rounded-xl border border-white/5 bg-black/20 px-3 py-2 text-xs font-bold text-slate-300">
                        Mastery{" "}
                        {primaryDailyAction.masteryScore}/100
                      </span>

                      <span className="rounded-xl border border-white/5 bg-black/20 px-3 py-2 text-xs font-bold text-slate-300">
                        {primaryDailyAction.totalAttempts}{" "}
                        încercări
                      </span>

                      {primaryDailyAction.unresolvedMistakes >
                        0 && (
                        <span className="rounded-xl border border-red-300/10 bg-red-400/10 px-3 py-2 text-xs font-bold text-red-300">
                          {
                            primaryDailyAction.unresolvedMistakes
                          }{" "}
                          greșeli active
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0">
                    <a
                      href={dailyPlanHref}
                      className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3.5 text-sm font-black shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 md:w-auto"
                    >
                      Începe acum →
                    </a>

                    <a
                      href="/mate"
                      className="mt-2 block text-center text-xs font-bold text-slate-400 transition hover:text-cyan-300"
                    >
                      Vezi planul complet în MATE
                    </a>
                  </div>
                </div>
              </section>
            )}

            {/* STATS */}

            <section
              id="progres"
              className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
            >
              <StatCard
                label="Progres general"
                value={`${procentGeneral}%`}
                detail={`${lectiiFinalizate} din ${totalLectii} lecții`}
                accent="cyan"
              />

              <StatCard
                label="Lecții finalizate"
                value={String(lectiiFinalizate)}
                detail="salvate în contul tău"
                accent="green"
              />

              <StatCard
                label="XP total"
                value={String(xpTotal)}
                detail={`din maximum ${xpMaximTotal} XP`}
                accent="yellow"
              />

              <StatCard
                label="Programa BAC"
                value={String(totalLectii)}
                detail={`${numarModule} module disponibile`}
                accent="pink"
              />
            </section>

            {/* MAIN GRID */}

            <section className="mt-6 grid gap-5 xl:grid-cols-[1.55fr_0.85fr]">

              {/* LEFT */}

              <div className="space-y-5">

                {/* PROGRESS */}

                <div className="rounded-[26px] border border-white/10 bg-[#182338] p-6">
                  <div className="flex items-end justify-between gap-5">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">
                        Progres total
                      </p>

                      <h2 className="mt-2 text-2xl font-black">
                        {lectiiFinalizate}/{totalLectii} lecții
                      </h2>
                    </div>

                    <p className="text-3xl font-black text-white">
                      {procentGeneral}%
                    </p>
                  </div>

                  <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-700/70">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-300 transition-all duration-700"
                      style={{
                        width: `${Math.min(
                          100,
                          procentExact
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                {/* NEXT LESSON */}

                {urmatoareaLectie && (
                  <div className="relative overflow-hidden rounded-[26px] border border-blue-400/20 bg-gradient-to-br from-blue-500/10 to-cyan-400/5 p-6">
                    <div className="absolute right-[-40px] top-[-50px] h-40 w-40 rounded-full bg-blue-400/10 blur-3xl" />

                    <div className="relative">
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">
                        {existaProgresSarindLectii
                          ? "Traseul programei"
                          : "Continuă de aici"}
                      </p>

                      <h2 className="mt-3 text-2xl font-black">
                        {urmatoareaLectie.titlu}
                      </h2>

                      <p className="mt-2 text-sm text-slate-400">
                        Modul {urmatoareaLectie.modul} •
                        Lecția{" "}
                        {urmatoareaLectie.numarLectie} din{" "}
                        {
                          urmatoareaLectie.totalLectiiModul
                        }
                      </p>

                      {existaProgresSarindLectii && (
                        <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">
                          Ai lucrat și la lecții aflate mai
                          târziu în programă. Aceasta rămâne
                          prima lecție nefinalizată din traseul
                          curricular.
                        </p>
                      )}

                      <a
                        href={urmatoareaLectie.href}
                        className="mt-5 inline-flex rounded-xl bg-blue-500 px-5 py-3 text-sm font-black transition hover:bg-blue-400"
                      >
                        Deschide lecția →
                      </a>
                    </div>
                  </div>
                )}

                {toateFinalizate && (
                  <div className="rounded-[26px] border border-emerald-400/20 bg-emerald-400/10 p-6">
                    <p className="text-2xl font-black">
                      Ai parcurs toate lecțiile. 🎉
                    </p>

                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      Următoarea etapă este consolidarea și
                      recapitularea inteligentă.
                    </p>
                  </div>
                )}
              </div>

              {/* RIGHT */}

              <div className="space-y-5">

                <div className="rounded-[26px] border border-violet-300/15 bg-gradient-to-br from-[#273657] to-[#373250] p-6">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">
                    Focus curent
                  </p>

                  <h3 className="mt-3 text-xl font-black">
                    {dailyPlanSkillName ??
                      urmatoareaLectie?.titlu ??
                      "Recapitulare"}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    {primaryDailyAction
                      ? primaryDailyAction.reason
                      : urmatoareaLectie
                        ? "Aceasta este următoarea zonă recomandată pe baza progresului disponibil."
                        : "Ai ajuns la etapa de consolidare a materiei."}
                  </p>

                  {primaryDailyAction ? (
                    <>
                      <div className="mt-5 flex items-center justify-between text-xs font-bold">
                        <span className="text-slate-400">
                          Mastery
                        </span>

                        <span>
                          {primaryDailyAction.masteryScore}%
                        </span>
                      </div>

                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-black/25">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-400 to-cyan-300"
                          style={{
                            width: `${Math.min(
                              100,
                              Math.max(
                                0,
                                primaryDailyAction.masteryScore
                              )
                            )}%`,
                          }}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="mt-5 flex items-center justify-between text-xs font-bold">
                        <span className="text-slate-400">
                          Progres general
                        </span>

                        <span>
                          {procentGeneral}%
                        </span>
                      </div>

                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-black/25">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-400 to-cyan-300"
                          style={{
                            width: `${Math.min(
                              100,
                              procentExact
                            )}%`,
                          }}
                        />
                      </div>
                    </>
                  )}
                </div>

                <div className="rounded-[26px] border border-white/10 bg-[#182338] p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/10 text-xl">
                      ⚡
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        XP acumulat
                      </p>

                      <p className="text-2xl font-black text-amber-300">
                        {xpTotal} XP
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-slate-400">
                    XP-ul este sincronizat cu exercițiile
                    lucrate în contul tău.
                  </p>
                </div>
              </div>
            </section>

            {/* MODULE */}

            <section className="mt-10">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">
                  Programa ta
                </p>

                <h2 className="mt-2 text-3xl font-black">
                  Progres pe module
                </h2>

                <p className="mt-2 text-sm text-slate-400">
                  Vezi rapid unde ai avansat și ce mai ai
                  de parcurs.
                </p>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {progresPeModule.map((modul) => (
                  <div
                    key={modul.modul}
                    className="group rounded-[24px] border border-white/10 bg-[#182338] p-5 transition hover:-translate-y-1 hover:border-cyan-300/20"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[11px] font-black uppercase tracking-[0.16em] text-cyan-300">
                          Modul {modul.modul}
                        </p>

                        <p className="mt-2 text-lg font-black">
                          {modul.finalizate}/
                          {modul.total} lecții
                        </p>

                        <p className="mt-1 text-xs text-amber-300">
                          {modul.xp} XP
                        </p>
                      </div>

                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-sm font-black">
                        {modul.procent}%
                      </div>
                    </div>

                    <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-700">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-300"
                        style={{
                          width: `${modul.procent}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
                        {/* RECENT / HISTORY */}

            <section className="mt-10 rounded-[28px] border border-white/10 bg-[#182338] p-6 sm:p-7">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">
                    Lecțiile tale
                  </p>

                  <h2 className="mt-2 text-3xl font-black">
                    Istoric și progres
                  </h2>
                </div>

                <a
                  href="/programa"
                  className="text-sm font-black text-cyan-300 hover:text-cyan-200"
                >
                  Vezi programa →
                </a>
              </div>

              <div className="mt-6 space-y-3">
                {progres.map((lectie) => (
                  <a
                    key={lectie.id}
                    href={lectie.href}
                    className="flex items-center gap-4 rounded-2xl border border-white/5 bg-[#111a2a] p-4 transition hover:border-cyan-300/15 hover:bg-[#142033]"
                  >
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-black ${
                        lectie.finalizata
                          ? "bg-emerald-400/10 text-emerald-300"
                          : lectie.xp > 0
                            ? "bg-amber-400/10 text-amber-300"
                            : "bg-white/5 text-slate-500"
                      }`}
                    >
                      {lectie.finalizata
                        ? "✓"
                        : lectie.numarLectie}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate font-bold text-slate-100">
                        {lectie.titlu}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Modul {lectie.modul} •{" "}
                        {lectie.xp}/{lectie.xpMaxim} XP
                      </p>
                    </div>

                    <div
                      className={`hidden text-xs font-black sm:block ${
                        lectie.finalizata
                          ? "text-emerald-300"
                          : lectie.xp > 0
                            ? "text-amber-300"
                            : "text-slate-500"
                      }`}
                    >
                      {lectie.finalizata
                        ? "Finalizată"
                        : lectie.xp > 0
                          ? "În progres"
                          : "De parcurs"}
                    </div>

                    <span className="text-slate-600">
                      →
                    </span>
                  </a>
                ))}
              </div>
            </section>

            {/* FOOTER ACTIONS */}

            <section className="mt-8 flex flex-col gap-3 pb-10 sm:flex-row">
              <a
                href={dailyPlanHref}
                className="rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-4 text-center text-sm font-black shadow-lg shadow-blue-500/10"
              >
                {primaryDailyAction
                  ? "Continuă planul de azi →"
                  : "Continuă programa →"}
              </a>

              <a
                href="/mate"
                className="rounded-xl border border-white/10 bg-white/5 px-6 py-4 text-center text-sm font-black transition hover:bg-white/10"
              >
                Deschide MATE
              </a>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   COMPONENTE VIZUALE LOCALE
========================================================= */

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
        <span className="absolute -left-4 h-7 w-1 rounded-r-full bg-cyan-300 lg:-left-4" />
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

function StatCard({
  label,
  value,
  detail,
  accent,
}: {
  label: string;
  value: string;
  detail: string;
  accent: "cyan" | "green" | "yellow" | "pink";
}) {
  const accentClass = {
    cyan: "text-cyan-300",
    green: "text-emerald-300",
    yellow: "text-amber-300",
    pink: "text-pink-300",
  }[accent];

  return (
    <div className="rounded-[22px] border border-white/10 bg-[#182338] p-5 shadow-lg shadow-black/10">
      <p className="text-[11px] font-black uppercase tracking-[0.12em] text-slate-400">
        {label}
      </p>

      <p
        className={`mt-3 text-3xl font-black ${accentClass}`}
      >
        {value}
      </p>

      <p className="mt-2 text-xs leading-5 text-slate-500">
        {detail}
      </p>
    </div>
  );
}

function MateAvatar({
  gender,
}: {
  gender: AvatarGender;
}) {
  const female = gender === "female";

  return (
    <div className="mx-auto shrink-0 md:mx-0">
      <div className="relative">
        <div className="absolute inset-[-14px] rounded-full border border-cyan-300/10" />
        <div className="absolute inset-[-28px] rounded-full border border-blue-300/5" />

        <div className="relative flex h-[150px] w-[150px] items-center justify-center overflow-hidden rounded-full border border-blue-300/20 bg-gradient-to-b from-[#314a74] to-[#17243c] shadow-2xl shadow-blue-500/20">
          <div className="absolute inset-0 bg-blue-400/5" />

          {/* corp */}
          <div
            className={`absolute bottom-[-28px] h-[92px] w-[126px] rounded-[50%_50%_18%_18%] ${
              female
                ? "bg-gradient-to-b from-fuchsia-500 to-violet-600"
                : "bg-gradient-to-b from-blue-500 to-indigo-600"
            }`}
          />

          {/* gât */}
          <div className="absolute bottom-[55px] h-7 w-8 rounded-lg bg-[#ffd58d]" />

          {/* față */}
          <div className="absolute bottom-[66px] h-[68px] w-[67px] rounded-[42%_42%_48%_48%] bg-[#ffd58d]">
            <div className="absolute left-[16px] top-[33px] h-[3px] w-[3px] rounded-full bg-slate-800" />
            <div className="absolute right-[16px] top-[33px] h-[3px] w-[3px] rounded-full bg-slate-800" />
            <div className="absolute bottom-[14px] left-1/2 h-[2px] w-[14px] -translate-x-1/2 rounded-full bg-[#a86d57]" />
          </div>

          {female ? (
            <>
              {/* păr fată */}
              <div className="absolute bottom-[93px] h-[56px] w-[78px] rounded-t-[45px] bg-[#222b42]" />
              <div className="absolute bottom-[58px] left-[38px] h-[74px] w-[17px] rounded-b-xl bg-[#222b42]" />
              <div className="absolute bottom-[58px] right-[38px] h-[74px] w-[17px] rounded-b-xl bg-[#222b42]" />
            </>
          ) : (
            <>
              {/* păr băiat */}
              <div className="absolute bottom-[116px] h-[35px] w-[70px] rounded-[35px_35px_12px_12px] bg-[#263047]" />
              <div className="absolute bottom-[108px] left-[42px] h-[24px] w-[13px] rounded-bl-xl bg-[#263047]" />
            </>
          )}

          {/* logo pe tricou */}
          <div className="absolute bottom-[21px] h-[6px] w-[50px] rounded-full bg-cyan-300/70" />
        </div>

        {/* ONLINE */}
        <div className="absolute bottom-1 right-1 flex h-7 w-7 items-center justify-center rounded-full border-[3px] border-[#243653] bg-emerald-400 shadow-lg shadow-emerald-400/30">
          <div className="h-2 w-2 rounded-full bg-white" />
        </div>
      </div>
    </div>
  );
}