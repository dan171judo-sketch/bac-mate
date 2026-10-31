"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "../../lib/supabase/client";
import { lectii, type Lectie } from "../../data/lectii";

type AvatarGender = "male" | "female" | "standard";

type ProfileRow = {
  nume?: string | null;
  full_name?: string | null;
  avatar_gender?: AvatarGender | null;
  profil_bac?: string | null;
};

type ProgressRow = {
  lesson_id: string;
  completed: boolean | null;
  xp: number | null;
};

type MasteryRow = {
  skill_id: string;
  mastery_score: number | null;
  total_attempts: number | null;
  correct_attempts: number | null;
  consecutive_correct: number | null;
  last_result: boolean | null;
  last_practiced_at: string | null;
  next_review_at: string | null;
};

type MistakeRow = {
  id: string;
  lesson_id: string | null;
  exercise_id: string | null;
  skill_id: string | null;
  times_missed: number | null;
  resolved: boolean | null;
  last_seen_at: string | null;
};

type AssessmentRow = {
  id: string;
  status: string;
  total_questions: number;
  correct_answers: number;
  score: number | null;
  strongest_skill_id: string | null;
  weakest_skill_id: string | null;
  engine_version: number | null;
  started_at: string | null;
  completed_at: string | null;
  created_at: string | null;
};

type AssessmentAttemptRow = {
  assessment_id: string;
  question_id: string;
  lesson_id: string;
  question_family: string;
  difficulty: number;
  is_correct: boolean;
  answered_at: string;
};

type ModuleProgress = {
  modul: number;
  clasa: string;
  total: number;
  completed: number;
  percentage: number;
};

type LessonMastery = MasteryRow & {
  lesson: Lectie;
};

const clamp = (value: number, min = 0, max = 100) =>
  Math.min(max, Math.max(min, value));

function safeNumber(value: number | null | undefined) {
  return typeof value === "number" && Number.isFinite(value)
    ? value
    : 0;
}

function formatProfile(value: string) {
  return value
    .replaceAll("_", " ")
    .replaceAll("-", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatDate(value: string | null) {
  if (!value) return "—";

  const date = new Date(value);

  if (!Number.isFinite(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("ro-RO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function masteryLabel(score: number) {
  if (score >= 90) return "Stăpânit";
  if (score >= 75) return "Puternic";
  if (score >= 50) return "În dezvoltare";
  if (score >= 25) return "Necesită lucru";
  return "De consolidat";
}

function masteryTextClass(score: number) {
  if (score >= 90) return "text-lime-300";
  if (score >= 75) return "text-emerald-300";
  if (score >= 50) return "text-amber-300";
  return "text-orange-300";
}

function masteryBarClass(score: number) {
  if (score >= 90) {
    return "from-lime-300 to-emerald-400";
  }

  if (score >= 75) {
    return "from-emerald-400 to-teal-300";
  }

  if (score >= 50) {
    return "from-amber-300 to-orange-400";
  }

  return "from-orange-500 to-amber-400";
}

export default function ProgresPage() {
  const router = useRouter();
  const [supabase] = useState(() => createClient());

  const [loading, setLoading] = useState(true);
  const [eroare, setEroare] = useState("");

  const [nume, setNume] = useState("Elev");
  const [profil, setProfil] = useState("M_mate-info");

  const [avatarGender, setAvatarGender] =
    useState<AvatarGender>("standard");

  const [progressRows, setProgressRows] = useState<ProgressRow[]>([]);
  const [masteryRows, setMasteryRows] = useState<MasteryRow[]>([]);
  const [mistakeRows, setMistakeRows] = useState<MistakeRow[]>([]);
  const [assessmentRows, setAssessmentRows] = useState<AssessmentRow[]>(
    []
  );
  const [attemptRows, setAttemptRows] = useState<
    AssessmentAttemptRow[]
  >([]);

  useEffect(() => {
    let active = true;

    async function loadPage() {
      try {
        setLoading(true);
        setEroare("");

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (!active) return;

        if (userError || !user) {
          router.replace("/cont");
          return;
        }

        const [
          profileResult,
          progressResult,
          masteryResult,
          mistakesResult,
          assessmentsResult,
          attemptsResult,
        ] = await Promise.all([
          supabase
            .from("profiles")
            .select("nume, full_name, avatar_gender, profil_bac")
            .eq("id", user.id)
            .maybeSingle(),

          supabase
            .from("student_progress")
            .select("lesson_id, completed, xp")
            .eq("user_id", user.id),

          supabase
            .from("student_mastery")
            .select(
              [
                "skill_id",
                "mastery_score",
                "total_attempts",
                "correct_attempts",
                "consecutive_correct",
                "last_result",
                "last_practiced_at",
                "next_review_at",
              ].join(",")
            )
            .eq("user_id", user.id),

          supabase
            .from("student_mistakes")
            .select(
              [
                "id",
                "lesson_id",
                "exercise_id",
                "skill_id",
                "times_missed",
                "resolved",
                "last_seen_at",
              ].join(",")
            )
            .eq("user_id", user.id),

          supabase
            .from("weekly_assessments")
            .select(
              [
                "id",
                "status",
                "total_questions",
                "correct_answers",
                "score",
                "strongest_skill_id",
                "weakest_skill_id",
                "engine_version",
                "started_at",
                "completed_at",
                "created_at",
              ].join(",")
            )
            .eq("user_id", user.id)
            .eq("status", "completed")
            .order("completed_at", {
              ascending: false,
              nullsFirst: false,
            })
            .limit(20),

          supabase
            .from("assessment_attempts")
            .select(
              [
                "assessment_id",
                "question_id",
                "lesson_id",
                "question_family",
                "difficulty",
                "is_correct",
                "answered_at",
              ].join(",")
            )
            .eq("user_id", user.id)
            .order("answered_at", { ascending: false })
            .limit(500),
        ]);

        if (!active) return;

        if (progressResult.error) {
          throw progressResult.error;
        }

        if (masteryResult.error) {
          throw masteryResult.error;
        }

        if (mistakesResult.error) {
          throw mistakesResult.error;
        }

        if (assessmentsResult.error) {
          throw assessmentsResult.error;
        }

        if (attemptsResult.error) {
          throw attemptsResult.error;
        }

        const profile =
          (profileResult.data ?? null) as ProfileRow | null;

        if (profile) {
          const profileName = profile.nume || profile.full_name;

          if (profileName) {
            setNume(profileName);
          }

          if (profile.profil_bac) {
            setProfil(profile.profil_bac);
          }

          if (
            profile.avatar_gender === "male" ||
            profile.avatar_gender === "female" ||
            profile.avatar_gender === "standard"
          ) {
            setAvatarGender(profile.avatar_gender);
          }
        }

        setProgressRows(
          (progressResult.data ?? []) as unknown as ProgressRow[]
        );

        setMasteryRows(
          (masteryResult.data ?? []) as unknown as MasteryRow[]
        );

        setMistakeRows(
          (mistakesResult.data ?? []) as unknown as MistakeRow[]
        );

        setAssessmentRows(
          (assessmentsResult.data ?? []) as unknown as AssessmentRow[]
        );

        setAttemptRows(
          (attemptsResult.data ??
            []) as unknown as AssessmentAttemptRow[]
        );
      } catch (error) {
        console.error("Eroare pagina progres:", error);

        if (active) {
          setEroare(
            error instanceof Error
              ? error.message
              : "Progresul nu a putut fi încărcat."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadPage();

    return () => {
      active = false;
    };
  }, [router, supabase]);

  const lessonById = useMemo(
    () => new Map(lectii.map((lesson) => [lesson.id, lesson])),
    []
  );

  const validLessonIds = useMemo(
    () => new Set(lectii.map((lesson) => lesson.id)),
    []
  );

  const totalLectii = lectii.length;

  const validProgressRows = useMemo(
    () =>
      progressRows.filter((row) =>
        validLessonIds.has(row.lesson_id)
      ),
    [progressRows, validLessonIds]
  );

  const completedLessonIds = useMemo(
    () =>
      new Set(
        validProgressRows
          .filter((row) => row.completed === true)
          .map((row) => row.lesson_id)
      ),
    [validProgressRows]
  );

  const lectiiFinalizate = completedLessonIds.size;

  const procentGeneral =
    totalLectii > 0
      ? Math.round((lectiiFinalizate / totalLectii) * 1000) / 10
      : 0;

  const xpTotal = useMemo(
    () =>
      validProgressRows.reduce(
        (sum, row) => sum + safeNumber(row.xp),
        0
      ),
    [validProgressRows]
  );

  const lessonMasteryRows = useMemo<LessonMastery[]>(
    () =>
      masteryRows
        .filter(
          (row) =>
            validLessonIds.has(row.skill_id) &&
            safeNumber(row.total_attempts) > 0
        )
        .map((row) => ({
          ...row,
          lesson: lessonById.get(row.skill_id)!,
        })),
    [masteryRows, validLessonIds, lessonById]
  );

  const masteryGeneral = useMemo(() => {
    if (lessonMasteryRows.length === 0) {
      return 0;
    }

    const total = lessonMasteryRows.reduce(
      (sum, row) =>
        sum + clamp(safeNumber(row.mastery_score)),
      0
    );

    return Math.round(total / lessonMasteryRows.length);
  }, [lessonMasteryRows]);

  const reviewDue = useMemo(() => {
    const now = Date.now();

    return lessonMasteryRows
      .filter((row) => {
        if (!row.next_review_at) return false;

        const timestamp = new Date(
          row.next_review_at
        ).getTime();

        return Number.isFinite(timestamp) && timestamp <= now;
      })
      .sort((a, b) => {
        const scoreDifference =
          safeNumber(a.mastery_score) -
          safeNumber(b.mastery_score);

        if (scoreDifference !== 0) {
          return scoreDifference;
        }

        const aDate = a.next_review_at
          ? new Date(a.next_review_at).getTime()
          : Number.MAX_SAFE_INTEGER;

        const bDate = b.next_review_at
          ? new Date(b.next_review_at).getTime()
          : Number.MAX_SAFE_INTEGER;

        return aDate - bDate;
      });
  }, [lessonMasteryRows]);

  const strongLessons = useMemo(
    () =>
      [...lessonMasteryRows]
        .filter(
          (row) =>
            safeNumber(row.mastery_score) >= 75
        )
        .sort(
          (a, b) =>
            safeNumber(b.mastery_score) -
            safeNumber(a.mastery_score)
        )
        .slice(0, 5),
    [lessonMasteryRows]
  );

  const weakLessons = useMemo(
    () =>
      [...lessonMasteryRows]
        .sort((a, b) => {
          const scoreDifference =
            safeNumber(a.mastery_score) -
            safeNumber(b.mastery_score);

          if (scoreDifference !== 0) {
            return scoreDifference;
          }

          return (
            safeNumber(b.total_attempts) -
            safeNumber(a.total_attempts)
          );
        })
        .slice(0, 5),
    [lessonMasteryRows]
  );

  const validMistakes = useMemo(
    () =>
      mistakeRows.filter(
        (row) =>
          row.lesson_id !== null &&
          validLessonIds.has(row.lesson_id)
      ),
    [mistakeRows, validLessonIds]
  );

  const activeMistakes = useMemo(
    () =>
      validMistakes.filter(
        (row) => row.resolved !== true
      ),
    [validMistakes]
  );

  const resolvedMistakes = useMemo(
    () =>
      validMistakes.filter(
        (row) => row.resolved === true
      ),
    [validMistakes]
  );

  const mistakeRepeats = useMemo(
    () =>
      activeMistakes.reduce(
        (sum, row) =>
          sum + safeNumber(row.times_missed),
        0
      ),
    [activeMistakes]
  );

  const validAssessmentAttempts = useMemo(
    () =>
      attemptRows.filter((row) =>
        validLessonIds.has(row.lesson_id)
      ),
    [attemptRows, validLessonIds]
  );

  const evaluationAnswers =
    validAssessmentAttempts.length;

  const evaluationCorrect = useMemo(
    () =>
      validAssessmentAttempts.filter(
        (row) => row.is_correct
      ).length,
    [validAssessmentAttempts]
  );

  const evaluationAccuracy =
    evaluationAnswers > 0
      ? Math.round(
          (evaluationCorrect / evaluationAnswers) * 100
        )
      : 0;

  const completedAssessments = assessmentRows.length;

  const latestAssessment =
    assessmentRows.length > 0
      ? assessmentRows[0]
      : null;

  const latestScore =
    latestAssessment?.score ??
    (latestAssessment &&
    latestAssessment.total_questions > 0
      ? Math.round(
          (latestAssessment.correct_answers /
            latestAssessment.total_questions) *
            100
        )
      : null);

  const moduleProgress = useMemo<ModuleProgress[]>(() => {
    const map = new Map<number, ModuleProgress>();

    for (const lesson of lectii) {
      const current = map.get(lesson.modul) ?? {
        modul: lesson.modul,
        clasa: lesson.clasa,
        total: 0,
        completed: 0,
        percentage: 0,
      };

      current.total += 1;

      if (completedLessonIds.has(lesson.id)) {
        current.completed += 1;
      }

      current.percentage =
        current.total > 0
          ? Math.round(
              (current.completed / current.total) * 100
            )
          : 0;

      map.set(lesson.modul, current);
    }

    return Array.from(map.values()).sort(
      (a, b) => a.modul - b.modul
    );
  }, [completedLessonIds]);

  const nextRecommended =
    reviewDue[0] ?? weakLessons[0] ?? null;

  const nextRecommendedHref = nextRecommended
    ? `/lectii/${nextRecommended.lesson.slug}`
    : "/lectii";

  const avatarSrc =
    avatarGender === "female"
      ? "/avatars/mate-girl.png"
      : "/avatars/mate-boy.png";

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#06110e] text-white">
        <div className="text-center">
          <div className="relative mx-auto h-16 w-16">
            <div className="absolute inset-0 rounded-full bg-emerald-400/20 blur-xl" />
            <div className="relative h-16 w-16 animate-spin rounded-full border-[5px] border-white/10 border-t-emerald-300" />
          </div>

          <p className="mt-6 text-sm font-black text-slate-300">
            Încărcăm progresul tău...
          </p>

          <p className="mt-1 text-xs text-slate-600">
            Adunăm datele din activitatea ta.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#06110e] text-white">
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
              <button
                type="button"
                onClick={() =>
                  router.push("/dashboard")
                }
                className="text-left"
              >
                <p className="text-[21px] font-black tracking-tight">
                  BAC{" "}
                  <span className="bg-gradient-to-r from-emerald-300 via-lime-300 to-amber-300 bg-clip-text text-transparent">
                    MATE
                  </span>
                </p>

                <p className="mt-2 text-[9px] font-black uppercase tracking-[0.28em] text-slate-600">
                  Matematică. Pas cu pas.
                </p>
              </button>
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
                active
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
              <div className="relative overflow-hidden rounded-[22px] border border-emerald-300/15 bg-gradient-to-br from-emerald-400/[0.09] via-lime-400/[0.03] to-orange-400/[0.05] p-4">
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-lime-400/10 blur-2xl" />

                <p className="relative text-[10px] font-black uppercase tracking-[0.17em] text-emerald-300">
                  Progres real
                </p>

                <p className="relative mt-2 text-xs leading-5 text-slate-400">
                  Datele vin din lecțiile,
                  evaluările și recapitulările tale.
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* CONTENT */}

        <div className="min-w-0 flex-1 lg:ml-[230px]">
          <header className="sticky top-0 z-30 border-b border-white/[0.07] bg-[#06110e]/90 backdrop-blur-2xl">
            <div className="flex min-h-[72px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-emerald-400/70">
                  BAC MATE
                </p>

                <p className="mt-1 text-sm font-black text-slate-200">
                  Progres
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  router.push("/profil")
                }
                className="flex items-center gap-3"
              >
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-black">
                    {nume}
                  </p>

                  <p className="mt-0.5 text-[10px] font-bold text-emerald-300">
                    {formatProfile(profil)}
                  </p>
                </div>

                <div className="h-10 w-10 overflow-hidden rounded-full border border-emerald-300/25 bg-gradient-to-br from-emerald-400/20 to-lime-400/10 shadow-lg shadow-emerald-500/10">
                  <img
                    src={avatarSrc}
                    alt="MATE"
                    className="h-full w-full object-cover"
                  />
                </div>
              </button>
            </div>
          </header>

          <div className="mx-auto max-w-[1400px] px-5 pb-16 pt-7 sm:px-8 lg:px-10 lg:pt-9">
            {/* HERO */}

            <section className="relative overflow-hidden rounded-[34px] border border-emerald-300/15 bg-gradient-to-br from-[#0b3a2b] via-[#0a2b24] to-[#321f12] p-6 shadow-[0_35px_100px_rgba(0,0,0,0.4)] sm:p-8 lg:p-10">
              <div className="pointer-events-none absolute -left-24 -top-28 h-80 w-80 rounded-full bg-emerald-400/25 blur-[90px]" />
              <div className="pointer-events-none absolute right-[12%] top-[-100px] h-80 w-80 rounded-full bg-lime-400/10 blur-[100px]" />
              <div className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-orange-500/20 blur-[100px]" />

              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:42px_42px]" />

              <div className="relative flex flex-col gap-7 xl:flex-row xl:items-end xl:justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/20 bg-emerald-300/10 px-3 py-1.5">
                    <span className="h-2 w-2 rounded-full bg-lime-300 shadow-[0_0_14px_rgba(190,242,100,0.9)]" />

                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-100">
                      Evoluția ta BAC
                    </span>
                  </div>

                  <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[0.98] tracking-[-0.04em] sm:text-5xl lg:text-[58px]">
                    Vezi clar

                    <span className="block bg-gradient-to-r from-emerald-200 via-lime-200 to-orange-200 bg-clip-text text-transparent">
                      ce ai construit.
                    </span>
                  </h1>

                  <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-200/80 sm:text-base">
                    Progresul este calculat din
                    activitatea ta reală: lecții
                    finalizate, evaluări, mastery și
                    recapitulări.
                  </p>
                </div>

                <div className="rounded-[22px] border border-emerald-200/15 bg-black/15 px-5 py-4 backdrop-blur-xl">
                  <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">
                    Profil BAC
                  </p>

                  <p className="mt-1 text-lg font-black text-emerald-200">
                    {formatProfile(profil)}
                  </p>
                </div>
              </div>
            </section>

            {eroare ? (
              <div className="mt-5 rounded-2xl border border-red-400/20 bg-red-500/10 px-5 py-4 text-sm font-semibold text-red-200">
                {eroare}
              </div>
            ) : null}

            {/* METRICS */}

            <section className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <MetricCard
                label="Programa parcursă"
                value={`${procentGeneral}%`}
                detail={`${lectiiFinalizate} din ${totalLectii} lecții finalizate`}
                accent="emerald"
              />

              <MetricCard
                label="Mastery"
                value={
                  lessonMasteryRows.length > 0
                    ? `${masteryGeneral}%`
                    : "—"
                }
                detail={
                  lessonMasteryRows.length > 0
                    ? `${lessonMasteryRows.length} lecții cu date reale`
                    : "Încă nu există date suficiente"
                }
                accent="lime"
              />

              <MetricCard
                label="Evaluări"
                value={String(completedAssessments)}
                detail={
                  latestScore !== null
                    ? `Ultimul scor: ${latestScore}%`
                    : "Nicio evaluare finalizată"
                }
                accent="orange"
              />

              <MetricCard
                label="XP total"
                value={String(xpTotal)}
                detail="din lecțiile existente în programă"
                accent="amber"
              />
            </section>

            {/* MODULES + REVIEW */}

            <section className="mt-5 grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
              <div className="relative overflow-hidden rounded-[28px] border border-emerald-300/[0.1] bg-[#0a1814] p-6 sm:p-7">
                <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-400/[0.06] blur-[100px]" />

                <div className="relative">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.22em] text-emerald-300">
                        Programa BAC
                      </p>

                      <h2 className="mt-2 text-2xl font-black">
                        Progres pe module
                      </h2>

                      <p className="mt-2 text-sm text-slate-500">
                        Fiecare procent vine din
                        lecțiile finalizate.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        router.push("/lectii")
                      }
                      className="text-left text-sm font-black text-emerald-300 transition hover:text-lime-300"
                    >
                      Continuă lecțiile →
                    </button>
                  </div>

                  <div className="mt-6 max-h-[500px] space-y-3 overflow-y-auto pr-2">
                    {moduleProgress.map((module) => (
                      <div
                        key={module.modul}
                        className="group rounded-[20px] border border-white/[0.065] bg-[#06130f] p-4 transition hover:border-emerald-300/[0.14] hover:bg-[#0b1d17]"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-300/10 bg-emerald-400/[0.06] text-xs font-black text-emerald-300">
                              {module.modul}
                            </div>

                            <div>
                              <p className="text-sm font-black">
                                Modul {module.modul}
                              </p>

                              <p className="mt-1 text-[10px] font-bold text-slate-600">
                                {module.clasa}
                              </p>
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="text-sm font-black text-lime-300">
                              {module.percentage}%
                            </p>

                            <p className="mt-1 text-[9px] text-slate-600">
                              {module.completed}/
                              {module.total}
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#03100b]">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-lime-300 to-amber-300 transition-all duration-700"
                            style={{
                              width: `${clamp(
                                module.percentage
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <InfoCard
                  eyebrow="Recapitulare"
                  value={String(reviewDue.length)}
                  title="lecții de revăzut acum"
                  text="Bazat pe next_review_at din mastery-ul lecțiilor reale."
                  tone="emerald"
                  button="Vezi ce trebuie consolidat →"
                  onClick={() =>
                    router.push("/evaluari")
                  }
                />

                <InfoCard
                  eyebrow="Caietul de greșeli"
                  value={String(activeMistakes.length)}
                  title="greșeli active"
                  text={`${resolvedMistakes.length} rezolvate • ${mistakeRepeats} repetări în greșelile active`}
                  tone="orange"
                  button="Deschide recapitularea →"
                  onClick={() =>
                    router.push("/review")
                  }
                />
              </div>
            </section>

            {/* ASSESSMENTS */}

            <section className="relative mt-5 overflow-hidden rounded-[28px] border border-emerald-300/[0.1] bg-[#0a1814] p-6 sm:p-7">
              <div className="absolute -right-24 top-0 h-64 w-64 rounded-full bg-orange-400/[0.055] blur-[90px]" />

              <div className="relative">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-emerald-300">
                      Evaluări adaptive
                    </p>

                    <h2 className="mt-2 text-2xl font-black">
                      Rezultatele tale reale
                    </h2>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                      Acuratețea este calculată numai din
                      răspunsurile salvate de sistemul de
                      evaluare.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      router.push("/evaluari")
                    }
                    className="text-left text-sm font-black text-emerald-300 transition hover:text-lime-300"
                  >
                    Deschide Evaluări →
                  </button>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  <ActivityCard
                    label="Evaluări finalizate"
                    value={String(completedAssessments)}
                    text="sesiuni salvate"
                    tone="emerald"
                  />

                  <ActivityCard
                    label="Răspunsuri urmărite"
                    value={String(evaluationAnswers)}
                    text="în assessment_attempts"
                    tone="lime"
                  />

                  <ActivityCard
                    label="Corecte"
                    value={String(evaluationCorrect)}
                    text={
                      evaluationAnswers > 0
                        ? `${evaluationAccuracy}% acuratețe`
                        : "fără răspunsuri salvate"
                    }
                    tone="amber"
                  />

                  <ActivityCard
                    label="Ultimul scor"
                    value={
                      latestScore !== null
                        ? `${latestScore}%`
                        : "—"
                    }
                    text={
                      latestAssessment
                        ? formatDate(
                            latestAssessment.completed_at
                          )
                        : "nicio evaluare"
                    }
                    tone="orange"
                  />
                </div>

                {assessmentRows.length > 0 ? (
                  <div className="mt-6 overflow-hidden rounded-[20px] border border-white/[0.07] bg-[#06130f]">
                    <div className="grid grid-cols-[1fr_auto_auto] gap-4 border-b border-white/[0.06] bg-white/[0.025] px-4 py-3 text-[9px] font-black uppercase tracking-[0.14em] text-slate-600">
                      <span>Evaluare</span>
                      <span>Corecte</span>
                      <span>Scor</span>
                    </div>

                    {assessmentRows
                      .slice(0, 5)
                      .map((assessment, index) => {
                        const score =
                          assessment.score ??
                          (assessment.total_questions > 0
                            ? Math.round(
                                (assessment.correct_answers /
                                  assessment.total_questions) *
                                  100
                              )
                            : 0);

                        return (
                          <div
                            key={assessment.id}
                            className={[
                              "grid grid-cols-[1fr_auto_auto] items-center gap-4 px-4 py-4 transition hover:bg-white/[0.025]",
                              index > 0
                                ? "border-t border-white/[0.05]"
                                : "",
                            ].join(" ")}
                          >
                            <div>
                              <p className="text-sm font-black">
                                Evaluare adaptivă
                              </p>

                              <p className="mt-1 text-[10px] text-slate-600">
                                {formatDate(
                                  assessment.completed_at
                                )}
                              </p>
                            </div>

                            <p className="text-sm font-bold text-slate-400">
                              {
                                assessment.correct_answers
                              }
                              /
                              {
                                assessment.total_questions
                              }
                            </p>

                            <p
                              className={`text-sm font-black ${masteryTextClass(
                                score
                              )}`}
                            >
                              {score}%
                            </p>
                          </div>
                        );
                      })}
                  </div>
                ) : (
                  <EmptyState
                    title="Nu există încă evaluări finalizate."
                    text="După prima evaluare adaptivă, istoricul scorurilor va apărea aici."
                  />
                )}
              </div>
            </section>

            {/* MASTERY */}

            <section className="mt-5 grid gap-5 xl:grid-cols-2">
              <LessonMasteryColumn
                title="De consolidat"
                subtitle="Lecțiile cu mastery-ul cel mai mic"
                rows={weakLessons}
                emptyText="Nu există încă suficiente date de mastery pe lecții."
                router={router}
                tone="orange"
              />

              <LessonMasteryColumn
                title="Puncte puternice"
                subtitle="Lecții cu mastery de cel puțin 75%"
                rows={strongLessons}
                emptyText="Încă nu există lecții peste pragul de 75%."
                router={router}
                tone="emerald"
              />
            </section>

            {/* NEXT ACTION */}

            <section className="relative mt-5 overflow-hidden rounded-[30px] border border-emerald-300/15 bg-gradient-to-br from-emerald-400/[0.12] via-lime-400/[0.05] to-orange-400/[0.09] p-6 sm:p-8">
              <div className="pointer-events-none absolute -left-20 top-[-100px] h-72 w-72 rounded-full bg-emerald-400/12 blur-[90px]" />

              <div className="pointer-events-none absolute -right-20 bottom-[-120px] h-72 w-72 rounded-full bg-orange-400/10 blur-[90px]" />

              <div className="relative flex flex-col gap-7 md:flex-row md:items-center">
                <div className="relative flex h-[150px] w-[150px] shrink-0 items-end justify-center overflow-hidden">
                  <div className="absolute h-[130px] w-[130px] rounded-full border-2 border-emerald-300/50 shadow-[0_0_45px_rgba(52,211,153,0.25)]" />

                  <div className="absolute h-[105px] w-[105px] rounded-full bg-lime-400/10 blur-xl" />

                  <img
                    src={avatarSrc}
                    alt="MATE"
                    className="relative z-10 h-[145px] w-auto object-contain object-bottom"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-emerald-300">
                    Următorul pas
                  </p>

                  {nextRecommended ? (
                    <>
                      <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                        {
                          nextRecommended.lesson
                            .titlu
                        }
                      </h2>

                      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                        Mastery actual:{" "}
                        <strong className="text-lime-200">
                          {safeNumber(
                            nextRecommended.mastery_score
                          )}
                          %
                        </strong>
                        .{" "}
                        {reviewDue.some(
                          (row) =>
                            row.skill_id ===
                            nextRecommended.skill_id
                        )
                          ? "Această lecție este scadentă pentru recapitulare."
                          : "Este una dintre lecțiile unde poți câștiga cel mai mult acum."}
                      </p>
                    </>
                  ) : (
                    <>
                      <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                        Continuă lecțiile.
                      </h2>

                      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                        După ce avem mai multe
                        răspunsuri pe lecții, aici apare
                        automat următoarea zonă
                        recomandată.
                      </p>
                    </>
                  )}

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        router.push(
                          nextRecommendedHref
                        )
                      }
                      className="group rounded-2xl bg-gradient-to-r from-emerald-300 via-lime-300 to-amber-300 px-5 py-3 text-sm font-black text-[#05110d] shadow-lg shadow-emerald-500/15 transition hover:-translate-y-0.5"
                    >
                      {nextRecommended
                        ? "Revizuiește lecția →"
                        : "Continuă lecțiile →"}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        router.push("/evaluari")
                      }
                      className="rounded-2xl border border-orange-300/15 bg-orange-400/[0.07] px-5 py-3 text-sm font-black text-orange-100 transition hover:bg-orange-400/[0.13]"
                    >
                      Evaluare adaptivă
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        router.push("/mate")
                      }
                      className="rounded-2xl border border-white/[0.1] bg-white/[0.04] px-5 py-3 text-sm font-black transition hover:border-emerald-300/15 hover:bg-emerald-400/[0.06]"
                    >
                      ✦ Întreabă MATE
                    </button>
                  </div>
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

function MetricCard({
  label,
  value,
  detail,
  accent,
}: {
  label: string;
  value: string;
  detail: string;
  accent: "emerald" | "lime" | "orange" | "amber";
}) {
  const styles = {
    emerald: {
      border: "border-emerald-300/15",
      background:
        "from-emerald-400/[0.11]",
      text: "text-emerald-200",
    },
    lime: {
      border: "border-lime-300/15",
      background:
        "from-lime-400/[0.09]",
      text: "text-lime-200",
    },
    orange: {
      border: "border-orange-300/15",
      background:
        "from-orange-400/[0.1]",
      text: "text-orange-200",
    },
    amber: {
      border: "border-amber-300/15",
      background:
        "from-amber-400/[0.1]",
      text: "text-amber-200",
    },
  };

  const style = styles[accent];

  return (
    <div
      className={`group rounded-[24px] border ${style.border} bg-gradient-to-br ${style.background} to-[#091712] p-5 shadow-[0_16px_50px_rgba(0,0,0,0.15)] transition duration-300 hover:-translate-y-1`}
    >
      <p className="text-[9px] font-black uppercase tracking-[0.16em] text-slate-600">
        {label}
      </p>

      <p
        className={`mt-3 text-3xl font-black ${style.text}`}
      >
        {value}
      </p>

      <p className="mt-2 text-xs leading-5 text-slate-500">
        {detail}
      </p>
    </div>
  );
}

function ActivityCard({
  label,
  value,
  text,
  tone,
}: {
  label: string;
  value: string;
  text: string;
  tone: "emerald" | "lime" | "amber" | "orange";
}) {
  const colors = {
    emerald: "text-emerald-300",
    lime: "text-lime-300",
    amber: "text-amber-300",
    orange: "text-orange-300",
  };

  return (
    <div className="rounded-[20px] border border-white/[0.065] bg-[#06130f] p-5 transition hover:border-emerald-300/[0.12]">
      <p className="text-[9px] font-black uppercase tracking-[0.14em] text-slate-600">
        {label}
      </p>

      <p
        className={`mt-2 text-3xl font-black ${colors[tone]}`}
      >
        {value}
      </p>

      <p className="mt-2 text-xs text-slate-500">
        {text}
      </p>
    </div>
  );
}

function InfoCard({
  eyebrow,
  value,
  title,
  text,
  tone,
  button,
  onClick,
}: {
  eyebrow: string;
  value: string;
  title: string;
  text: string;
  tone: "emerald" | "orange";
  button: string;
  onClick: () => void;
}) {
  const styles =
    tone === "emerald"
      ? {
          border: "border-emerald-300/15",
          background:
            "from-emerald-400/[0.11] via-lime-400/[0.035]",
          eyebrow: "text-emerald-300",
          value: "text-lime-200",
          button:
            "border-emerald-300/15 bg-emerald-400/[0.08] text-emerald-100 hover:bg-emerald-400/[0.14]",
        }
      : {
          border: "border-orange-300/15",
          background:
            "from-orange-400/[0.11] via-amber-400/[0.035]",
          eyebrow: "text-orange-300",
          value: "text-amber-200",
          button:
            "border-orange-300/15 bg-orange-400/[0.08] text-orange-100 hover:bg-orange-400/[0.14]",
        };

  return (
    <div
      className={`relative overflow-hidden rounded-[28px] border ${styles.border} bg-gradient-to-br ${styles.background} to-[#091712] p-6`}
    >
      <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-white/[0.025] blur-3xl" />

      <div className="relative">
        <p
          className={`text-[10px] font-black uppercase tracking-[0.2em] ${styles.eyebrow}`}
        >
          {eyebrow}
        </p>

        <p
          className={`mt-3 text-4xl font-black ${styles.value}`}
        >
          {value}
        </p>

        <p className="mt-1 text-sm font-black text-white">
          {title}
        </p>

        <p className="mt-3 text-xs leading-5 text-slate-500">
          {text}
        </p>

        <button
          type="button"
          onClick={onClick}
          className={`mt-5 w-full rounded-xl border px-5 py-3 text-sm font-black transition ${styles.button}`}
        >
          {button}
        </button>
      </div>
    </div>
  );
}

function EmptyState({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="mt-6 rounded-[20px] border border-dashed border-emerald-300/10 bg-[#06130f] p-5">
      <p className="font-black">{title}</p>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {text}
      </p>
    </div>
  );
}

function LessonMasteryColumn({
  title,
  subtitle,
  rows,
  emptyText,
  router,
  tone,
}: {
  title: string;
  subtitle: string;
  rows: LessonMastery[];
  emptyText: string;
  router: ReturnType<typeof useRouter>;
  tone: "emerald" | "orange";
}) {
  const accent =
    tone === "emerald"
      ? {
          border: "border-emerald-300/[0.1]",
          eyebrow: "text-emerald-300",
          icon: "bg-emerald-400/[0.08] text-emerald-300",
          hover: "hover:border-emerald-300/[0.15]",
        }
      : {
          border: "border-orange-300/[0.1]",
          eyebrow: "text-orange-300",
          icon: "bg-orange-400/[0.08] text-orange-300",
          hover: "hover:border-orange-300/[0.15]",
        };

  return (
    <div
      className={`rounded-[28px] border ${accent.border} bg-[#0a1814] p-6`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${accent.icon}`}
        >
          {tone === "emerald" ? "✓" : "↗"}
        </div>

        <div>
          <h2 className="text-xl font-black">
            {title}
          </h2>

          <p className="mt-1 text-xs text-slate-600">
            {subtitle}
          </p>
        </div>
      </div>

      {rows.length === 0 ? (
        <p className="mt-6 text-sm text-slate-500">
          {emptyText}
        </p>
      ) : (
        <div className="mt-6 space-y-3">
          {rows.map((row) => {
            const score = clamp(
              safeNumber(row.mastery_score)
            );

            return (
              <button
                key={row.skill_id}
                type="button"
                onClick={() =>
                  router.push(
                    `/lectii/${row.lesson.slug}`
                  )
                }
                className={`block w-full rounded-[18px] border border-white/[0.065] bg-[#06130f] p-4 text-left transition ${accent.hover} hover:-translate-y-[1px] hover:bg-[#0b1d17]`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-black text-slate-100">
                      {row.lesson.titlu}
                    </p>

                    <p className="mt-1 text-[10px] font-bold text-slate-600">
                      Modul {row.lesson.modul} •{" "}
                      {safeNumber(
                        row.total_attempts
                      )}{" "}
                      încercări
                    </p>
                  </div>

                  <div className="shrink-0 text-right">
                    <p
                      className={`text-sm font-black ${masteryTextClass(
                        score
                      )}`}
                    >
                      {score}%
                    </p>

                    <p className="mt-1 text-[9px] font-bold text-slate-600">
                      {masteryLabel(score)}
                    </p>
                  </div>
                </div>

                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#03100b]">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${masteryBarClass(
                      score
                    )}`}
                    style={{
                      width: `${score}%`,
                    }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}