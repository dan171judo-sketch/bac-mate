"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "../../lib/supabase/client";

import {
  createWeeklyAssessment,
  completeWeeklyAssessment,
  type StudentMasterySnapshot,
} from "../../lib/weekly-assessment/service";

import {
  lectii,
  type Lectie,
} from "../../data/lectii/index";

import {
  getQuestionsForLesson,
} from "../../data/evaluari/question-bank";

import {
  buildAdaptiveAssessment,
} from "../../data/evaluari/adaptive-generator";

import type {
  AdaptiveDifficulty,
  AdaptiveQuestion,
} from "../../data/evaluari/types";

type ProfileRow = {
  nume: string | null;
  profil_bac: string | null;
};

type ProgressRow = {
  lesson_id: string;
  completed: boolean | null;
};

type EvaluationQuestion = AdaptiveQuestion;

type AnswerRecord = {
  questionId: string;
  questionFamily: string;
  difficulty: AdaptiveDifficulty;

  lessonId: string;
  lessonSlug: string;
  lessonTitle: string;

  selectedIndex: number;
  correctIndex: number;

  isCorrect: boolean;
};

type LessonResult = {
  lessonId: string;
  lessonSlug: string;
  lessonTitle: string;

  total: number;
  correct: number;
  percentage: number;
};

type FinalResult = {
  totalQuestions: number;
  correctAnswers: number;
  score: number;

  strongestSkillId: string | null;
  weakestSkillId: string | null;

  lessons: LessonResult[];
};

const MAX_QUESTIONS = 10;

function buildLessonResults(
  answers: AnswerRecord[]
): LessonResult[] {
  const map = new Map<string, LessonResult>();

  for (const answer of answers) {
    const current =
      map.get(answer.lessonId) ?? {
        lessonId: answer.lessonId,
        lessonSlug: answer.lessonSlug,
        lessonTitle: answer.lessonTitle,
        total: 0,
        correct: 0,
        percentage: 0,
      };

    current.total += 1;

    if (answer.isCorrect) {
      current.correct += 1;
    }

    current.percentage =
      current.total > 0
        ? Math.round(
            (current.correct / current.total) * 100
          )
        : 0;

    map.set(answer.lessonId, current);
  }

  return Array.from(map.values()).sort((a, b) => {
    if (a.percentage !== b.percentage) {
      return a.percentage - b.percentage;
    }

    return b.total - a.total;
  });
}

function getDatabaseErrorMessage(
  databaseError: unknown
) {
  if (
    databaseError &&
    typeof databaseError === "object"
  ) {
    const error = databaseError as {
      message?: string;
      details?: string;
      hint?: string;
      code?: string;
    };

    const parts = [
      error.message,
      error.details,
      error.hint,
      error.code
        ? `Cod: ${error.code}`
        : null,
    ].filter(
      (value): value is string =>
        Boolean(value)
    );

    if (parts.length > 0) {
      return parts.join(" | ");
    }
  }

  if (typeof databaseError === "string") {
    return databaseError;
  }

  if (databaseError instanceof Error) {
    return databaseError.message;
  }

  return "Eroare necunoscută la salvarea evaluării.";
}

export default function AdaptiveAssessmentPage() {
  const router = useRouter();

  const [supabase] = useState(
    () => createClient()
  );

  const [loading, setLoading] =
    useState(true);

  const [starting, setStarting] =
    useState(false);

  const [finishing, setFinishing] =
    useState(false);

  const [signingOut, setSigningOut] =
    useState(false);

  const [error, setError] =
    useState("");

  const [studentName, setStudentName] =
    useState("");

  const [profileName, setProfileName] =
    useState("");

  const [
    completedLessons,
    setCompletedLessons,
  ] = useState<Lectie[]>([]);

  const [mastery, setMastery] =
    useState<StudentMasterySnapshot[]>([]);

  const [
    assessmentId,
    setAssessmentId,
  ] = useState<string | null>(null);

  const [questions, setQuestions] =
    useState<EvaluationQuestion[]>([]);

  const [
    currentIndex,
    setCurrentIndex,
  ] = useState(0);

  const [
    selectedIndex,
    setSelectedIndex,
  ] = useState<number | null>(null);

  const [
    answerChecked,
    setAnswerChecked,
  ] = useState(false);

  const [answers, setAnswers] =
    useState<AnswerRecord[]>([]);

  const [result, setResult] =
    useState<FinalResult | null>(null);

  useEffect(() => {
    let active = true;

    async function loadPage() {
      setLoading(true);
      setError("");

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (!active) {
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

      if (!active) {
        return;
      }

      if (
        profileError ||
        !profileData
      ) {
        console.error(
          "Eroare profil:",
          profileError
        );

        setError(
          "Profilul nu a putut fi încărcat."
        );

        setLoading(false);
        return;
      }

      const profile =
        profileData as ProfileRow;

      if (!profile.nume) {
        router.replace(
          "/date-personale"
        );
        return;
      }

      if (!profile.profil_bac) {
        router.replace("/profil");
        return;
      }

      setStudentName(profile.nume);
      setProfileName(profile.profil_bac);

      const {
        data: progressData,
        error: progressError,
      } = await supabase
        .from("student_progress")
        .select(
          "lesson_id, completed"
        )
        .eq("user_id", user.id)
        .eq("completed", true);

      if (!active) {
        return;
      }

      if (progressError) {
        console.error(
          "Eroare progres:",
          progressError
        );

        setError(
          "Lecțiile parcurse nu au putut fi încărcate."
        );

        setLoading(false);
        return;
      }

      const progressRows =
        (progressData ??
          []) as unknown as ProgressRow[];

      const completedIds =
        new Set(
          progressRows
            .filter(
              (row) =>
                row.completed === true
            )
            .map(
              (row) =>
                row.lesson_id
            )
        );

      const eligibleLessons =
        lectii.filter(
          (lesson) =>
            completedIds.has(
              lesson.id
            )
        );

      setCompletedLessons(
        eligibleLessons
      );

      const {
        data: masteryData,
        error: masteryError,
      } = await supabase
        .from("student_mastery")
        .select(
          [
            "skill_id",
            "mastery_score",
            "total_attempts",
            "correct_attempts",
            "consecutive_correct",
            "next_review_at",
          ].join(",")
        )
        .eq("user_id", user.id);

      if (!active) {
        return;
      }

      if (masteryError) {
        console.error(
          "Eroare Mastery:",
          masteryError
        );

        setMastery([]);
      } else {
        const rows =
          (masteryData ??
            []) as unknown as Array<{
            skill_id: string;
            mastery_score: number;
            total_attempts: number;
            correct_attempts: number;
            consecutive_correct: number;
            next_review_at:
              | string
              | null;
          }>;

        setMastery(
          rows.map((row) => ({
            skillId: row.skill_id,

            masteryScore:
              row.mastery_score ?? 0,

            totalAttempts:
              row.total_attempts ?? 0,

            correctAttempts:
              row.correct_attempts ?? 0,

            consecutiveCorrect:
              row.consecutive_correct ?? 0,

            nextReviewAt:
              row.next_review_at,
          }))
        );
      }

      setLoading(false);
    }

    void loadPage();

    return () => {
      active = false;
    };
  }, [router, supabase]);

  const availableQuestions =
    useMemo(
      () =>
        completedLessons.reduce(
          (total, lesson) =>
            total +
            getQuestionsForLesson(
              lesson
            ).length,
          0
        ),
      [completedLessons]
    );

  const sessionQuestionCount =
    Math.min(
      MAX_QUESTIONS,
      availableQuestions
    );

  const currentQuestion =
    questions[currentIndex] ?? null;

  const sessionProgress =
    questions.length > 0
      ? Math.round(
          (answers.length /
            questions.length) *
            100
        )
      : 0;

  const initial =
    studentName
      .trim()
      .charAt(0)
      .toUpperCase() || "M";

  const weakLessons =
    result
      ? result.lessons.filter(
          (lesson) =>
            lesson.percentage < 70
        )
      : [];

  const strongLessons =
    result
      ? result.lessons.filter(
          (lesson) =>
            lesson.percentage >= 70
        )
      : [];

  async function signOut() {
    setSigningOut(true);

    const {
      error: signOutError,
    } =
      await supabase.auth.signOut();

    if (signOutError) {
      console.error(
        "Eroare deconectare:",
        signOutError
      );

      setSigningOut(false);
      return;
    }

    localStorage.removeItem(
      "bac-mate-nume"
    );

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

  async function startAssessment() {
    if (starting) {
      return;
    }

    setError("");

    if (
      completedLessons.length === 0
    ) {
      setError(
        "Nu există încă lecții finalizate. Finalizează mai întâi o lecție."
      );
      return;
    }

    if (
      sessionQuestionCount === 0
    ) {
      setError(
        "Lecțiile finalizate nu au încă exerciții matematice verificate pentru evaluare."
      );
      return;
    }

    setStarting(true);

    try {
      const session =
        await createWeeklyAssessment(
          supabase,
          sessionQuestionCount
        );

      const adaptive =
        buildAdaptiveAssessment({
          completedLessonIds:
            completedLessons.map(
              (lesson) =>
                lesson.id
            ),

          mastery:
            session.mastery,

          recentAttempts:
            session.recentAttempts,

          maxQuestions:
            MAX_QUESTIONS,
        });

      if (
        adaptive.questions.length ===
        0
      ) {
        setError(
          "Nu există încă exerciții matematice verificate din lecțiile finalizate."
        );

        return;
      }

      setMastery(
        session.mastery
      );

      setAssessmentId(
        session.assessmentId
      );

      setQuestions(
        adaptive.questions
      );

      setCurrentIndex(0);
      setSelectedIndex(null);
      setAnswerChecked(false);
      setAnswers([]);
      setResult(null);
    } catch (databaseError) {
      const databaseMessage =
        getDatabaseErrorMessage(
          databaseError
        );

      console.error(
        "Sesiunea nu a putut fi salvată:",
        databaseError
      );

      console.error(
        "DEBUG SUPABASE:",
        databaseMessage
      );

      const adaptive =
        buildAdaptiveAssessment({
          completedLessonIds:
            completedLessons.map(
              (lesson) =>
                lesson.id
            ),

          mastery,

          recentAttempts: [],

          maxQuestions:
            MAX_QUESTIONS,
        });

      if (
        adaptive.questions.length ===
        0
      ) {
        setError(
          "Evaluarea nu a putut fi pregătită."
        );

        return;
      }

      setAssessmentId(
        `local-${Date.now()}`
      );

      setQuestions(
        adaptive.questions
      );

      setCurrentIndex(0);
      setSelectedIndex(null);
      setAnswerChecked(false);
      setAnswers([]);
      setResult(null);

      setError(
        "Evaluarea poate continua, dar această sesiune nu va fi salvată în cloud."
      );
    } finally {
      setStarting(false);
    }
  }

  function checkAnswer() {
    if (
      !currentQuestion ||
      selectedIndex === null ||
      answerChecked
    ) {
      return;
    }

    const record: AnswerRecord = {
      questionId:
        currentQuestion.id,

      questionFamily:
        currentQuestion.questionFamily,

      difficulty:
        currentQuestion.difficulty,

      lessonId:
        currentQuestion.lessonId,

      lessonSlug:
        currentQuestion.lessonSlug,

      lessonTitle:
        currentQuestion.lessonTitle,

      selectedIndex,

      correctIndex:
        currentQuestion.correctIndex,

      isCorrect:
        selectedIndex ===
        currentQuestion.correctIndex,
    };

    setAnswers(
      (current) => [
        ...current.filter(
          (answer) =>
            answer.questionId !==
            record.questionId
        ),
        record,
      ]
    );

    setAnswerChecked(true);
  }

  async function finishAssessment(
    finalAnswers: AnswerRecord[]
  ) {
    if (
      !assessmentId ||
      finishing
    ) {
      return;
    }

    setFinishing(true);
    setError("");

    try {
      const totalQuestions =
        finalAnswers.length;

      const correctAnswers =
        finalAnswers.filter(
          (answer) =>
            answer.isCorrect
        ).length;

      const score =
        totalQuestions > 0
          ? Math.round(
              (correctAnswers /
                totalQuestions) *
                100
            )
          : 0;

      const lessons =
        buildLessonResults(
          finalAnswers
        );

      const strongestLesson =
        [...lessons].sort(
          (a, b) => {
            if (
              b.percentage !==
              a.percentage
            ) {
              return (
                b.percentage -
                a.percentage
              );
            }

            return (
              b.total -
              a.total
            );
          }
        )[0];

      const weakestLesson =
        [...lessons].sort(
          (a, b) => {
            if (
              a.percentage !==
              b.percentage
            ) {
              return (
                a.percentage -
                b.percentage
              );
            }

            return (
              b.total -
              a.total
            );
          }
        )[0];

      if (
        !assessmentId.startsWith(
          "local-"
        )
      ) {
        try {
          await completeWeeklyAssessment(
            supabase,
            assessmentId,

            finalAnswers.map(
              (answer) => ({
                questionId:
                  answer.questionId,

                skillId:
                  answer.lessonId,

                questionFamily:
                  answer.questionFamily,

                difficulty:
                  answer.difficulty,

                isCorrect:
                  answer.isCorrect,
              })
            )
          );
        } catch (databaseError) {
          const databaseMessage =
            getDatabaseErrorMessage(
              databaseError
            );

          console.error(
            "Rezultatul nu a putut fi salvat:",
            databaseError
          );

          console.error(
            "DEBUG SUPABASE FINALIZARE:",
            databaseMessage
          );

          setError(
            `Rezultatul este afișat, dar salvarea în cloud nu a reușit: ${databaseMessage}`
          );
        }
      }

      setResult({
        totalQuestions,
        correctAnswers,
        score,

        strongestSkillId:
          strongestLesson?.lessonId ??
          null,

        weakestSkillId:
          weakestLesson?.lessonId ??
          null,

        lessons,
      });
    } catch (finishError) {
      console.error(
        "Eroare finalizare:",
        finishError
      );

      setError(
        "Rezultatul evaluării nu a putut fi calculat."
      );
    } finally {
      setFinishing(false);
    }
  }

  async function nextQuestion() {
    if (
      !currentQuestion ||
      selectedIndex === null ||
      !answerChecked
    ) {
      return;
    }

    if (
      currentIndex <
      questions.length - 1
    ) {
      setCurrentIndex(
        (current) =>
          current + 1
      );

      setSelectedIndex(null);
      setAnswerChecked(false);
      return;
    }

    const finalRecord: AnswerRecord = {
      questionId:
        currentQuestion.id,

      questionFamily:
        currentQuestion.questionFamily,

      difficulty:
        currentQuestion.difficulty,

      lessonId:
        currentQuestion.lessonId,

      lessonSlug:
        currentQuestion.lessonSlug,

      lessonTitle:
        currentQuestion.lessonTitle,

      selectedIndex,

      correctIndex:
        currentQuestion.correctIndex,

      isCorrect:
        selectedIndex ===
        currentQuestion.correctIndex,
    };

    const finalAnswers = [
      ...answers.filter(
        (answer) =>
          answer.questionId !==
          finalRecord.questionId
      ),
      finalRecord,
    ];

    await finishAssessment(
      finalAnswers
    );
  }

  function resetAssessment() {
    setAssessmentId(null);
    setQuestions([]);
    setCurrentIndex(0);
    setSelectedIndex(null);
    setAnswerChecked(false);
    setAnswers([]);
    setResult(null);
    setError("");
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#06120d] text-white">
        <div className="text-center">
          <div className="relative mx-auto h-16 w-16">
            <div className="absolute inset-0 rounded-full bg-emerald-400/20 blur-2xl" />

            <div className="relative h-16 w-16 animate-spin rounded-full border-[5px] border-white/10 border-t-emerald-300" />
          </div>

          <p className="mt-6 text-sm font-black text-slate-300">
            Pregătim materia parcursă...
          </p>

          <p className="mt-1 text-xs text-slate-600">
            MATE construiește evaluarea.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#06120d] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -left-52 top-20 h-[500px] w-[500px] rounded-full bg-emerald-500/[0.07] blur-[130px]" />

        <div className="absolute right-[-180px] top-[280px] h-[450px] w-[450px] rounded-full bg-orange-500/[0.06] blur-[120px]" />

        <div className="absolute bottom-[-240px] left-[30%] h-[500px] w-[500px] rounded-full bg-teal-500/[0.05] blur-[140px]" />
      </div>

      <div className="relative min-h-screen lg:flex">
        <aside className="border-b border-white/[0.07] bg-[#081710]/95 backdrop-blur-2xl lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-[230px] lg:border-b-0 lg:border-r">
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
              <div className="relative overflow-hidden rounded-[22px] border border-emerald-300/15 bg-gradient-to-br from-emerald-400/[0.1] via-transparent to-orange-400/[0.06] p-4">
                <div className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-emerald-400/10 blur-2xl" />

                <p className="relative text-sm italic leading-6 text-slate-300">
                  „Evaluarea verifică doar materia pe care ai parcurs-o.”
                </p>

                <p className="relative mt-3 text-xs font-black text-emerald-300">
                  — MATE
                </p>
              </div>
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1 lg:ml-[230px]">
          <header className="sticky top-0 z-30 border-b border-white/[0.07] bg-[#06120d]/90 backdrop-blur-2xl">
            <div className="flex min-h-[72px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-emerald-400/70">
                  BAC MATE
                </p>

                <p className="mt-1 text-sm font-black text-slate-200">
                  Evaluare adaptivă
                </p>
              </div>

              <div className="ml-auto flex items-center gap-3">
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-black">
                    {studentName}
                  </p>

                  <p className="mt-0.5 text-[10px] font-bold text-emerald-300">
                    {profileName}
                  </p>
                </div>

                <a
                  href="/profil"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-300/30 bg-gradient-to-br from-emerald-400 via-teal-500 to-orange-400 text-sm font-black text-[#06130e] shadow-lg shadow-emerald-500/20"
                >
                  {initial}
                </a>

                <button
                  type="button"
                  onClick={signOut}
                  disabled={signingOut}
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-bold text-slate-400 transition hover:border-red-400/30 hover:bg-red-400/[0.06] hover:text-red-300 disabled:opacity-50"
                >
                  {signingOut
                    ? "..."
                    : "Ieșire"}
                </button>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-[1240px] px-5 py-7 pb-20 sm:px-8 lg:px-10 lg:py-9">
            {error && (
              <div className="mb-6 rounded-2xl border border-red-400/25 bg-red-400/10 px-5 py-4 text-sm leading-6 text-red-200">
                {error}
              </div>
            )}

            {!assessmentId &&
              !result && (
                <>
                  <section className="relative overflow-hidden rounded-[34px] border border-emerald-300/20 bg-gradient-to-br from-[#0d3c2c] via-[#103329] to-[#4b2c17] p-7 shadow-[0_35px_100px_rgba(0,0,0,0.4)] sm:p-9 lg:p-10">
                    <div className="pointer-events-none absolute -left-24 -top-28 h-96 w-96 rounded-full bg-emerald-300/20 blur-[100px]" />

                    <div className="pointer-events-none absolute left-[45%] top-[-200px] h-96 w-96 rounded-full bg-teal-300/10 blur-[110px]" />

                    <div className="pointer-events-none absolute -bottom-40 -right-20 h-[430px] w-[430px] rounded-full bg-orange-400/20 blur-[100px]" />

                    <div className="relative grid gap-10 lg:grid-cols-[1fr_320px] lg:items-center">
                      <div>
                        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/20 bg-emerald-300/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-emerald-100">
                          <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.7)]" />
                          Doar din materia parcursă
                        </span>

                        <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[1] tracking-[-0.04em] sm:text-5xl lg:text-[56px]">
                          Verifică ce
                          <span className="block bg-gradient-to-r from-emerald-200 via-lime-200 to-orange-200 bg-clip-text text-transparent">
                            ai înțeles.
                          </span>
                        </h1>

                        <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-200/80 sm:text-base">
                          Evaluarea conține maximum 10 întrebări și folosește exclusiv exerciții verificate din lecțiile pe care le-ai finalizat.
                        </p>

                        <div className="mt-7 flex flex-wrap gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              void startAssessment()
                            }
                            disabled={
                              starting ||
                              sessionQuestionCount === 0
                            }
                            className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-orange-300 via-amber-300 to-orange-400 px-6 py-3.5 text-sm font-black text-[#251406] shadow-[0_16px_40px_rgba(251,146,60,0.2)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(251,146,60,0.28)] disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {starting
                              ? "Pregătesc evaluarea..."
                              : sessionQuestionCount > 0
                                ? `Începe ${sessionQuestionCount} întrebări`
                                : "Nu există încă exerciții"}

                            {!starting &&
                              sessionQuestionCount >
                                0 && (
                                <span className="transition group-hover:translate-x-1">
                                  →
                                </span>
                              )}
                          </button>

                          <a
                            href="/lectii"
                            className="inline-flex items-center rounded-2xl border border-emerald-200/15 bg-emerald-300/[0.07] px-6 py-3.5 text-sm font-black backdrop-blur-xl transition hover:bg-emerald-300/[0.12]"
                          >
                            Vezi lecțiile
                          </a>
                        </div>
                      </div>

                      <div className="relative mx-auto flex h-[240px] w-full max-w-[280px] items-center justify-center">
                        <div className="absolute h-52 w-52 rounded-full border border-emerald-200/10" />
                        <div className="absolute h-40 w-40 rounded-full border border-orange-200/10" />
                        <div className="absolute h-28 w-28 rounded-full bg-emerald-300/10 blur-xl" />

                        <div className="relative flex h-28 w-28 items-center justify-center rounded-[32px] border border-emerald-200/20 bg-gradient-to-br from-emerald-300 via-teal-400 to-emerald-500 text-5xl font-black text-[#062016] shadow-[0_25px_60px_rgba(52,211,153,0.25)]">
                          ✓
                        </div>

                        <div className="absolute bottom-2 right-0 rounded-2xl border border-orange-300/20 bg-[#1e2115]/90 px-4 py-3 shadow-xl backdrop-blur-xl">
                          <p className="text-[9px] font-black uppercase tracking-[0.16em] text-orange-300">
                            Maximum
                          </p>

                          <p className="mt-1 text-2xl font-black">
                            {sessionQuestionCount}
                            <span className="ml-1 text-xs text-slate-500">
                              întrebări
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="mt-5 grid gap-4 sm:grid-cols-3">
                    <InfoCard
                      icon="▣"
                      label="Lecții parcurse"
                      value={String(
                        completedLessons.length
                      )}
                      helper="lecții finalizate"
                      tone="emerald"
                    />

                    <InfoCard
                      icon="✦"
                      label="Exerciții disponibile"
                      value={String(
                        availableQuestions
                      )}
                      helper="exerciții verificate"
                      tone="lime"
                    />

                    <InfoCard
                      icon="✓"
                      label="Evaluare"
                      value={String(
                        sessionQuestionCount
                      )}
                      helper="maximum 10 întrebări"
                      tone="orange"
                    />
                  </section>

                  <section className="relative mt-5 overflow-hidden rounded-[30px] border border-white/[0.08] bg-[#0c1c14] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.16)] sm:p-7">
                    <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-400/[0.08] blur-[80px]" />

                    <div className="relative">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-emerald-300">
                            Proces inteligent
                          </p>

                          <h2 className="mt-2 text-2xl font-black">
                            Cum funcționează evaluarea
                          </h2>
                        </div>

                        <div className="hidden h-12 w-12 items-center justify-center rounded-2xl border border-orange-300/15 bg-orange-400/10 text-xl text-orange-300 sm:flex">
                          ⚡
                        </div>
                      </div>

                      <div className="mt-6 grid gap-4 md:grid-cols-3">
                        <HowCard
                          number="01"
                          title="Doar ce ai parcurs"
                          text="Nicio întrebare nu poate veni dintr-o lecție pe care nu ai finalizat-o."
                        />

                        <HowCard
                          number="02"
                          title="Prioritate inteligentă"
                          text="Mastery, greșelile și repetările programate stabilesc ce merită verificat."
                        />

                        <HowCard
                          number="03"
                          title="Înapoi la lecție"
                          text="Dacă greșești, poți reveni direct la lecția exactă pentru consolidare."
                        />
                      </div>
                    </div>
                  </section>
                </>
              )}

            {assessmentId &&
              !result &&
              currentQuestion && (
                <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_310px]">
                  <section className="overflow-hidden rounded-[30px] border border-emerald-300/15 bg-[#0c1c14] shadow-[0_30px_80px_rgba(0,0,0,0.3)]">
                    <div className="relative border-b border-white/[0.07] bg-gradient-to-r from-emerald-400/[0.08] via-transparent to-orange-400/[0.05] px-6 py-5 sm:px-8">
                      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-300">
                            Întrebarea{" "}
                            {currentIndex + 1}{" "}
                            din{" "}
                            {questions.length}
                          </p>

                          <p className="mt-2 text-sm font-bold text-slate-400">
                            {
                              currentQuestion.lessonTitle
                            }
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {questions.map(
                            (
                              question,
                              index
                            ) => {
                              const answer =
                                answers.find(
                                  (item) =>
                                    item.questionId ===
                                    question.id
                                );

                              let dotClass =
                                "border-white/[0.08] bg-black/15 text-slate-600";

                              if (
                                answer?.isCorrect
                              ) {
                                dotClass =
                                  "border-emerald-300/30 bg-emerald-400/15 text-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.08)]";
                              } else if (
                                answer
                              ) {
                                dotClass =
                                  "border-red-400/30 bg-red-400/10 text-red-300";
                              } else if (
                                index ===
                                currentIndex
                              ) {
                                dotClass =
                                  "border-orange-300/40 bg-orange-400/15 text-orange-200 shadow-[0_0_18px_rgba(251,146,60,0.12)]";
                              }

                              return (
                                <div
                                  key={
                                    question.id
                                  }
                                  className={`flex h-9 w-9 items-center justify-center rounded-full border text-[11px] font-black transition ${dotClass}`}
                                >
                                  {index + 1}
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>

                      <div className="mt-5 h-2 overflow-hidden rounded-full bg-black/25">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-lime-300 to-orange-300 shadow-[0_0_18px_rgba(52,211,153,0.25)] transition-all duration-500"
                          style={{
                            width: `${sessionProgress}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div className="p-6 sm:p-8">
                      <div className="mb-5 flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-emerald-300/15 bg-emerald-400/[0.08] px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.14em] text-emerald-300">
                          {
                            currentQuestion.lessonTitle
                          }
                        </span>

                        {currentQuestion.masteryScore !==
                          null && (
                          <span className="rounded-full border border-orange-300/15 bg-orange-400/[0.08] px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.14em] text-orange-300">
                            Mastery{" "}
                            {
                              currentQuestion.masteryScore
                            }
                            %
                          </span>
                        )}
                      </div>

                      <h1 className="max-w-3xl text-2xl font-black leading-9 tracking-tight sm:text-3xl">
                        {
                          currentQuestion.question
                        }
                      </h1>

                      <p className="mt-3 text-sm text-slate-500">
                        Alege varianta corectă.
                      </p>

                      <div className="mt-7 grid gap-3">
                        {currentQuestion.options.map(
                          (
                            option,
                            index
                          ) => {
                            const selected =
                              selectedIndex ===
                              index;

                            const correct =
                              index ===
                              currentQuestion.correctIndex;

                            let style =
                              "border-white/[0.08] bg-[#08150f] text-slate-300 hover:-translate-y-0.5 hover:border-emerald-300/25 hover:bg-emerald-400/[0.05]";

                            let letterStyle =
                              "border-white/10 bg-white/[0.04] text-slate-400";

                            if (
                              answerChecked &&
                              correct
                            ) {
                              style =
                                "border-emerald-300/40 bg-emerald-400/[0.11] text-emerald-50 shadow-[0_12px_35px_rgba(52,211,153,0.07)]";

                              letterStyle =
                                "border-emerald-300/30 bg-emerald-400/15 text-emerald-300";
                            } else if (
                              answerChecked &&
                              selected &&
                              !correct
                            ) {
                              style =
                                "border-red-400/40 bg-red-400/[0.08] text-red-100";

                              letterStyle =
                                "border-red-400/30 bg-red-400/10 text-red-300";
                            } else if (
                              selected
                            ) {
                              style =
                                "border-orange-300/45 bg-orange-400/[0.1] text-white shadow-[0_12px_35px_rgba(251,146,60,0.07)]";

                              letterStyle =
                                "border-orange-300/30 bg-orange-400/15 text-orange-200";
                            }

                            return (
                              <button
                                key={`${currentQuestion.id}-${index}`}
                                type="button"
                                disabled={
                                  answerChecked
                                }
                                onClick={() =>
                                  setSelectedIndex(
                                    index
                                  )
                                }
                                className={`group flex items-center gap-4 rounded-2xl border p-4 text-left transition duration-200 ${style}`}
                              >
                                <span
                                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border text-sm font-black transition ${letterStyle}`}
                                >
                                  {String.fromCharCode(
                                    65 + index
                                  )}
                                </span>

                                <span className="flex-1 font-semibold">
                                  {option}
                                </span>

                                {answerChecked &&
                                  correct && (
                                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-400/15 text-lg font-black text-emerald-300">
                                      ✓
                                    </span>
                                  )}

                                {answerChecked &&
                                  selected &&
                                  !correct && (
                                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-400/10 text-lg font-black text-red-300">
                                      ✕
                                    </span>
                                  )}
                              </button>
                            );
                          }
                        )}
                      </div>

                      {answerChecked && (
                        <div
                          className={`relative mt-6 overflow-hidden rounded-[22px] border p-5 ${
                            selectedIndex ===
                            currentQuestion.correctIndex
                              ? "border-emerald-300/20 bg-emerald-400/[0.07]"
                              : "border-orange-300/20 bg-orange-400/[0.07]"
                          }`}
                        >
                          <div
                            className={`absolute left-0 top-0 h-full w-1 ${
                              selectedIndex ===
                              currentQuestion.correctIndex
                                ? "bg-emerald-300"
                                : "bg-orange-300"
                            }`}
                          />

                          <p
                            className={`font-black ${
                              selectedIndex ===
                              currentQuestion.correctIndex
                                ? "text-emerald-300"
                                : "text-orange-300"
                            }`}
                          >
                            {selectedIndex ===
                            currentQuestion.correctIndex
                              ? "Corect. Foarte bine ✓"
                              : "Aici merită să consolidăm."}
                          </p>

                          <p className="mt-3 text-sm leading-7 text-slate-300">
                            {
                              currentQuestion.explanation
                            }
                          </p>

                          {selectedIndex !==
                            currentQuestion.correctIndex && (
                            <a
                              href={`/lectii/${currentQuestion.lessonSlug}`}
                              className="mt-4 inline-flex items-center gap-2 text-xs font-black text-orange-300 transition hover:text-orange-200"
                            >
                              Revizuiește{" "}
                              {
                                currentQuestion.lessonTitle
                              }
                              <span>→</span>
                            </a>
                          )}
                        </div>
                      )}

                      <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.06] pt-6">
                        <p className="text-xs leading-5 text-slate-600">
                          Exercițiu verificat din materia parcursă.
                        </p>

                        {!answerChecked ? (
                          <button
                            type="button"
                            disabled={
                              selectedIndex ===
                              null
                            }
                            onClick={
                              checkAnswer
                            }
                            className="rounded-2xl bg-gradient-to-r from-emerald-300 to-lime-300 px-6 py-3 text-sm font-black text-[#06150d] shadow-[0_12px_30px_rgba(52,211,153,0.13)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            Verifică răspunsul
                          </button>
                        ) : (
                          <button
                            type="button"
                            disabled={
                              finishing
                            }
                            onClick={() =>
                              void nextQuestion()
                            }
                            className="group rounded-2xl bg-gradient-to-r from-orange-300 via-amber-300 to-orange-400 px-6 py-3 text-sm font-black text-[#241306] shadow-[0_12px_30px_rgba(251,146,60,0.13)] transition hover:-translate-y-0.5 disabled:opacity-50"
                          >
                            {finishing
                              ? "Salvez rezultatul..."
                              : currentIndex ===
                                  questions.length -
                                    1
                                ? "Vezi rezultatul →"
                                : "Următoarea întrebare →"}
                          </button>
                        )}
                      </div>
                    </div>
                  </section>

                  <aside className="space-y-5">
                    <section className="relative overflow-hidden rounded-[28px] border border-emerald-300/20 bg-gradient-to-br from-emerald-400/[0.13] via-teal-400/[0.07] to-orange-400/[0.06] p-6">
                      <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-emerald-400/10 blur-[60px]" />

                      <div className="relative">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[20px] border border-emerald-200/20 bg-gradient-to-br from-emerald-300 via-teal-400 to-emerald-500 text-2xl font-black text-[#062016] shadow-[0_15px_35px_rgba(52,211,153,0.2)]">
                          M
                        </div>

                        <p className="mt-5 text-center text-[10px] font-black uppercase tracking-[0.2em] text-emerald-300">
                          MATE
                        </p>

                        <h3 className="mt-2 text-center text-lg font-black">
                          Verificăm ce ai înțeles.
                        </h3>

                        <p className="mt-3 text-center text-sm leading-6 text-slate-400">
                          Dacă greșești, primești explicația și poți reveni direct la lecția potrivită.
                        </p>
                      </div>
                    </section>

                    <section className="rounded-[26px] border border-orange-300/12 bg-[#0c1c14] p-5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-orange-300/15 bg-orange-400/10 text-sm text-orange-300">
                        ▣
                      </div>

                      <p className="mt-4 text-[9px] font-black uppercase tracking-[0.17em] text-slate-600">
                        Lecția verificată
                      </p>

                      <p className="mt-2 font-black leading-6">
                        {
                          currentQuestion.lessonTitle
                        }
                      </p>

                      <a
                        href={`/lectii/${currentQuestion.lessonSlug}`}
                        className="mt-4 inline-flex items-center gap-2 text-xs font-black text-orange-300 transition hover:text-orange-200"
                      >
                        Deschide lecția
                        <span>→</span>
                      </a>
                    </section>

                    <section className="rounded-[26px] border border-emerald-300/12 bg-[#0c1c14] p-5">
                      <p className="text-[9px] font-black uppercase tracking-[0.17em] text-slate-600">
                        Progres sesiune
                      </p>

                      <div className="mt-4 flex items-end justify-between gap-3">
                        <p className="text-4xl font-black text-emerald-300">
                          {sessionProgress}%
                        </p>

                        <p className="pb-1 text-xs font-bold text-slate-500">
                          {answers.length}/
                          {questions.length}
                        </p>
                      </div>

                      <div className="mt-4 h-2 overflow-hidden rounded-full bg-black/25">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-lime-300 transition-all duration-500"
                          style={{
                            width: `${sessionProgress}%`,
                          }}
                        />
                      </div>

                      <p className="mt-3 text-xs text-slate-600">
                        întrebări verificate
                      </p>
                    </section>
                  </aside>
                </div>
              )}

            {result && (
              <section className="space-y-5">
                <div className="relative overflow-hidden rounded-[34px] border border-emerald-300/20 bg-gradient-to-br from-[#0d3c2c] via-[#103329] to-[#4b2c17] p-7 shadow-[0_35px_100px_rgba(0,0,0,0.35)] sm:p-9">
                  <div className="pointer-events-none absolute -left-20 -top-28 h-80 w-80 rounded-full bg-emerald-300/20 blur-[100px]" />

                  <div className="pointer-events-none absolute -bottom-32 -right-16 h-80 w-80 rounded-full bg-orange-400/20 blur-[90px]" />

                  <div className="relative">
                    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/20 bg-emerald-300/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-emerald-100">
                      <span className="h-2 w-2 rounded-full bg-emerald-300" />
                      Evaluare finalizată
                    </span>

                    <h1 className="mt-5 max-w-4xl text-3xl font-black tracking-[-0.035em] sm:text-5xl">
                      Acum știm unde merită
                      <span className="block bg-gradient-to-r from-emerald-200 via-lime-200 to-orange-200 bg-clip-text text-transparent">
                        să consolidezi.
                      </span>
                    </h1>

                    <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-200/80">
                      Rezultatul este calculat exclusiv din întrebările acestei evaluări.
                    </p>

                    <div className="mt-8 grid gap-4 sm:grid-cols-3">
                      <ResultStat
                        label="Scor"
                        value={`${result.score}%`}
                        tone="emerald"
                      />

                      <ResultStat
                        label="Corecte"
                        value={`${result.correctAnswers}/${result.totalQuestions}`}
                        tone="lime"
                      />

                      <ResultStat
                        label="Lecții verificate"
                        value={String(
                          result.lessons.length
                        )}
                        tone="orange"
                      />
                    </div>
                  </div>
                </div>

                {weakLessons.length >
                  0 && (
                  <section className="relative overflow-hidden rounded-[30px] border border-orange-300/18 bg-[#0c1c14] p-6 sm:p-7">
                    <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-orange-400/[0.08] blur-[80px]" />

                    <div className="relative">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-300">
                        De consolidat
                      </p>

                      <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                        Revino exact unde ai nevoie.
                      </h2>

                      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                        Nu trebuie să reiei toată materia. Deschide direct lecțiile unde au apărut dificultăți.
                      </p>

                      <div className="mt-6 grid gap-4 lg:grid-cols-2">
                        {weakLessons.map(
                          (lesson) => (
                            <LessonResultCard
                              key={
                                lesson.lessonId
                              }
                              lesson={
                                lesson
                              }
                              weak
                            />
                          )
                        )}
                      </div>
                    </div>
                  </section>
                )}

                {strongLessons.length >
                  0 && (
                  <section className="relative overflow-hidden rounded-[30px] border border-emerald-300/15 bg-[#0c1c14] p-6 sm:p-7">
                    <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-emerald-400/[0.07] blur-[80px]" />

                    <div className="relative">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-300">
                        Consolidat
                      </p>

                      <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                        Zone care au mers bine.
                      </h2>

                      <p className="mt-3 text-sm leading-6 text-slate-500">
                        Aceste lecții au avut rezultate bune în sesiunea curentă.
                      </p>

                      <div className="mt-6 grid gap-4 lg:grid-cols-2">
                        {strongLessons.map(
                          (lesson) => (
                            <LessonResultCard
                              key={
                                lesson.lessonId
                              }
                              lesson={
                                lesson
                              }
                              weak={
                                false
                              }
                            />
                          )
                        )}
                      </div>
                    </div>
                  </section>
                )}

                <div className="flex flex-wrap gap-3 pb-8">
                  <a
                    href="/evaluari"
                    className="rounded-2xl bg-gradient-to-r from-emerald-300 to-lime-300 px-6 py-3 text-sm font-black text-[#06150d] shadow-[0_12px_30px_rgba(52,211,153,0.13)] transition hover:-translate-y-0.5"
                  >
                    Înapoi la Evaluări
                  </a>

                  <a
                    href="/progres"
                    className="rounded-2xl border border-orange-300/15 bg-orange-400/[0.07] px-6 py-3 text-sm font-black text-orange-200 transition hover:bg-orange-400/[0.11]"
                  >
                    Vezi Progres
                  </a>

                  <a
                    href="/mate"
                    className="rounded-2xl border border-emerald-300/15 bg-emerald-400/[0.07] px-6 py-3 text-sm font-black text-emerald-200 transition hover:bg-emerald-400/[0.11]"
                  >
                    Discută cu MATE
                  </a>

                  <button
                    type="button"
                    onClick={
                      resetAssessment
                    }
                    className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-black text-slate-400 transition hover:bg-white/[0.06] hover:text-white"
                  >
                    Evaluare nouă
                  </button>
                </div>
              </section>
            )}
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

function InfoCard({
  icon,
  label,
  value,
  helper,
  tone,
}: {
  icon: string;
  label: string;
  value: string;
  helper: string;
  tone:
    | "emerald"
    | "lime"
    | "orange";
}) {
  const styles = {
    emerald: {
      text: "text-emerald-300",
      border: "border-emerald-300/15",
      bg: "bg-emerald-400/10",
    },

    lime: {
      text: "text-lime-300",
      border: "border-lime-300/15",
      bg: "bg-lime-400/10",
    },

    orange: {
      text: "text-orange-300",
      border: "border-orange-300/15",
      bg: "bg-orange-400/10",
    },
  };

  const style = styles[tone];

  return (
    <div className="group rounded-[24px] border border-white/[0.07] bg-[#0c1c14] p-5 transition hover:-translate-y-1 hover:border-white/[0.12] hover:bg-[#102219]">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl border ${style.border} ${style.bg} text-sm font-black ${style.text}`}
      >
        {icon}
      </div>

      <p className="mt-4 text-[9px] font-black uppercase tracking-[0.17em] text-slate-600">
        {label}
      </p>

      <p
        className={`mt-2 text-3xl font-black ${style.text}`}
      >
        {value}
      </p>

      <p className="mt-2 text-xs leading-5 text-slate-600">
        {helper}
      </p>
    </div>
  );
}

function HowCard({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="group rounded-[22px] border border-white/[0.06] bg-[#08150f] p-5 transition hover:-translate-y-1 hover:border-emerald-300/15 hover:bg-[#0b1a12]">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-300/15 bg-emerald-400/10 text-[10px] font-black text-emerald-300 transition group-hover:border-orange-300/20 group-hover:bg-orange-400/10 group-hover:text-orange-300">
        {number}
      </div>

      <h3 className="mt-4 font-black">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {text}
      </p>
    </div>
  );
}

function ResultStat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone:
    | "emerald"
    | "lime"
    | "orange";
}) {
  const styles = {
    emerald: "text-emerald-200",
    lime: "text-lime-200",
    orange: "text-orange-200",
  };

  return (
    <div className="rounded-[22px] border border-white/10 bg-black/15 p-5 backdrop-blur-xl">
      <p className="text-[9px] font-black uppercase tracking-[0.17em] text-slate-400">
        {label}
      </p>

      <p
        className={`mt-3 text-3xl font-black ${styles[tone]}`}
      >
        {value}
      </p>
    </div>
  );
}

function LessonResultCard({
  lesson,
  weak,
}: {
  lesson: LessonResult;
  weak: boolean;
}) {
  return (
    <div
      className={`group rounded-[22px] border p-5 transition hover:-translate-y-0.5 ${
        weak
          ? "border-orange-300/15 bg-orange-400/[0.05] hover:border-orange-300/25"
          : "border-emerald-300/15 bg-emerald-400/[0.05] hover:border-emerald-300/25"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p
            className={`text-[9px] font-black uppercase tracking-[0.16em] ${
              weak
                ? "text-orange-300"
                : "text-emerald-300"
            }`}
          >
            {weak
              ? "Necesită consolidare"
              : "Bine consolidat"}
          </p>

          <h3 className="mt-2 text-lg font-black leading-6">
            {lesson.lessonTitle}
          </h3>
        </div>

        <div
          className={`shrink-0 rounded-xl border px-3 py-2 text-sm font-black ${
            weak
              ? "border-orange-300/15 bg-orange-400/10 text-orange-300"
              : "border-emerald-300/15 bg-emerald-400/10 text-emerald-300"
          }`}
        >
          {lesson.percentage}%
        </div>
      </div>

      <p className="mt-3 text-sm text-slate-500">
        {lesson.correct} din{" "}
        {lesson.total} răspunsuri corecte
      </p>

      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-black/25">
        <div
          className={`h-full rounded-full ${
            weak
              ? "bg-gradient-to-r from-orange-400 to-amber-300"
              : "bg-gradient-to-r from-emerald-400 to-lime-300"
          }`}
          style={{
            width: `${lesson.percentage}%`,
          }}
        />
      </div>

      {weak && (
        <a
          href={`/lectii/${lesson.lessonSlug}`}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-300 to-amber-300 px-4 py-2.5 text-xs font-black text-[#251406] transition hover:-translate-y-0.5"
        >
          Revizuiește lecția
          <span>→</span>
        </a>
      )}
    </div>
  );
}