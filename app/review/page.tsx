"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import BacMateShell from "../../components/BacMateShell";

import { createClient } from "../../lib/supabase/client";

import {
  getReviewPlan,
  getReviewSessionResult,
  type ReviewPlanData,
} from "../../lib/review/service";

import {
  getReviewDifficultyLabel,
  getReviewPriorityLabel,
  getReviewSessionLabel,
  type ReviewQuestionResult,
} from "../../lib/review/engine";

import {
  getLessonHrefForSkill,
} from "../../lib/daily-plan/lesson-resolver";

import {
  saveStudentAttempt,
} from "../../lib/mastery/service";

import {
  obtineContinutLectie,
} from "../../data/continut";

/* =========================================================
   BAC MATE — REVIEW / RETEST PAGE V1

   Flux:
   Review Engine
      ↓
   Content Engine publication gate
      ↓
   exerciții verificate
      ↓
   răspuns elev
      ↓
   saveStudentAttempt(source: "review")
      ↓
   Attempts + Mastery + Mistakes
      ↓
   rezultat sesiune
========================================================= */

type ProfileRow = {
  nume: string | null;
  profil_bac: string | null;
  evaluare_initiala_finalizata:
    | boolean
    | null;
};

type ReviewExercise = {
  id: string;
  enunt: string;
  raspunsCorect: string;

  variante: string[];

  nivel: string;
  competenta: string;

  rezolvare: string[];
  explicatieFinala: string;
};

type ExerciseAnswer = {
  answer: string;
  checked: boolean;
  correct: boolean;
  usedHint: boolean;
  saving: boolean;
  saved: boolean;
  saveError: string | null;
};

/* =========================================================
   HELPERS
========================================================= */

function formatSkill(
  skillId: string
) {
  return skillId
    .replaceAll("-", " ")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
}

function normalizeAnswer(
  value: string
) {
  return String(value ?? "")
    .trim()
    .toLocaleLowerCase("ro-RO")
    .replace(/\s+/g, " ");
}

function getSlugFromLessonHref(
  href: string
) {
  const prefix = "/lectii/";

  if (!href.startsWith(prefix)) {
    return null;
  }

  const slug = href
    .slice(prefix.length)
    .split("?")[0]
    .split("#")[0]
    .trim();

  return slug || null;
}

function safeString(
  value: unknown
) {
  if (
    typeof value === "string"
  ) {
    return value;
  }

  if (
    typeof value === "number"
  ) {
    return String(value);
  }

  return "";
}

function extractVariants(
  value: unknown
): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) =>
      safeString(item).trim()
    )
    .filter(Boolean);
}

function extractResolution(
  value: unknown
): string[] {
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (
          typeof item === "string"
        ) {
          return item.trim();
        }

        if (
          item &&
          typeof item === "object"
        ) {
          const row =
            item as Record<
              string,
              unknown
            >;

          const candidates = [
            row.text,
            row.continut,
            row.explicatie,
            row.pas,
            row.descriere,
          ];

          for (
            const candidate of
            candidates
          ) {
            const text =
              safeString(
                candidate
              ).trim();

            if (text) {
              return text;
            }
          }
        }

        return "";
      })
      .filter(Boolean);
  }

  const single =
    safeString(value).trim();

  return single
    ? [single]
    : [];
}

/* =========================================================
   PAGE
========================================================= */

export default function ReviewPage() {
  const router = useRouter();

  const [supabase] = useState(
    () => createClient()
  );

  const [
    studentName,
    setStudentName,
  ] = useState("");

  const [
    profileName,
    setProfileName,
  ] = useState("");

  const [
    reviewData,
    setReviewData,
  ] =
    useState<ReviewPlanData | null>(
      null
    );

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  const [
    signingOut,
    setSigningOut,
  ] = useState(false);

  const [
    currentIndex,
    setCurrentIndex,
  ] = useState(0);

  const [
    answers,
    setAnswers,
  ] = useState<
    Record<
      string,
      ExerciseAnswer
    >
  >({});

  const [
    finished,
    setFinished,
  ] = useState(false);

  /* =======================================================
     LOAD
  ======================================================= */

  useEffect(() => {
    let active = true;

    async function loadReview() {
      setLoading(true);
      setError("");

      try {
        const {
          data: { user },
          error: userError,
        } =
          await supabase.auth.getUser();

        if (
          userError ||
          !user
        ) {
          router.replace("/cont");
          return;
        }

        const {
          data: profileData,
          error: profileError,
        } = await supabase
          .from("profiles")
          .select(
            [
              "nume",
              "profil_bac",
              "evaluare_initiala_finalizata",
            ].join(",")
          )
          .eq("id", user.id)
          .maybeSingle();

        if (!active) {
          return;
        }

        if (profileError) {
          throw new Error(
            profileError.message
          );
        }

        const profile =
          profileData as
            | ProfileRow
            | null;

        if (!profile?.nume) {
          router.replace(
            "/date-personale"
          );
          return;
        }

        if (!profile.profil_bac) {
          router.replace(
            "/profil"
          );
          return;
        }

        if (
          !profile
            .evaluare_initiala_finalizata
        ) {
          router.replace(
            "/evaluare"
          );
          return;
        }

        setStudentName(
          profile.nume
        );

        setProfileName(
          profile.profil_bac
        );

        const data =
          await getReviewPlan(
            supabase,
            {
              maxSkills: 3,
            }
          );

        if (!active) {
          return;
        }

        setReviewData(data);
      } catch (loadError) {
        console.error(
          "Eroare Review:",
          loadError
        );

        if (active) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Nu am putut încărca sesiunea de recapitulare."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadReview();

    return () => {
      active = false;
    };
  }, [router, supabase]);

  /* =======================================================
     SIGN OUT
  ======================================================= */

  async function signOut() {
    if (signingOut) {
      return;
    }

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

  /* =======================================================
     PLAN
  ======================================================= */

  const primary =
    reviewData?.plan.primary ??
    null;

  const secondary =
    reviewData?.plan.secondary ??
    [];

  const lessonHref =
    primary
      ? getLessonHrefForSkill(
          primary.skillId
        )
      : "/programa";

  const lessonSlug =
    getSlugFromLessonHref(
      lessonHref
    );

  const contentResult =
    useMemo(() => {
      if (!lessonSlug) {
        return {
          continut: null,
          publicabil: false,
        };
      }

      return obtineContinutLectie(
        lessonSlug
      );
    }, [lessonSlug]);

  const hasPublishableContent =
    contentResult.publicabil ===
      true &&
    contentResult.continut !==
      null;

  /* =======================================================
     EXERCISES

     IMPORTANT:
     Intră aici numai dacă Content Engine
     spune explicit că lecția este publicabilă.
  ======================================================= */

  const exercises =
    useMemo<ReviewExercise[]>(
      () => {
        if (
          !primary ||
          !hasPublishableContent ||
          !contentResult.continut
        ) {
          return [];
        }

        const rawExercises =
          Array.isArray(
            contentResult.continut
              .exercitii
          )
            ? contentResult.continut
                .exercitii
            : [];

        const mapped =
          rawExercises
            .map((exercise) => {
              const raw =
                exercise as unknown as Record<
                  string,
                  unknown
                >;

              const id =
                safeString(
                  raw.id
                ).trim();

              const enunt =
                safeString(
                  raw.enunt
                ).trim();

              const raspunsCorect =
                safeString(
                  raw.raspunsCorect
                ).trim();

              if (
                !id ||
                !enunt ||
                !raspunsCorect
              ) {
                return null;
              }

              return {
                id,
                enunt,
                raspunsCorect,

                variante:
                  extractVariants(
                    raw.variante
                  ),

                nivel:
                  safeString(
                    raw.nivel
                  ),

                competenta:
                  safeString(
                    raw.competenta
                  ) ||
                  primary.skillId,

                rezolvare:
                  extractResolution(
                    raw.rezolvare
                  ),

                explicatieFinala:
                  safeString(
                    raw.explicatieFinala
                  ),
              };
            })
            .filter(
              (
                exercise
              ): exercise is ReviewExercise =>
                exercise !== null
            );

        return mapped.slice(
          0,
          primary.recommendedQuestions
        );
      },
      [
        primary,
        hasPublishableContent,
        contentResult,
      ]
    );

  const currentExercise =
    exercises[currentIndex] ??
    null;

  const currentAnswer =
    currentExercise
      ? answers[
          currentExercise.id
        ] ?? null
      : null;

  /* =======================================================
     SESSION RESULT
  ======================================================= */

  const questionResults =
    useMemo<
      ReviewQuestionResult[]
    >(
      () =>
        exercises
          .filter((exercise) => {
            const answer =
              answers[exercise.id];

            return (
              answer?.checked ===
                true &&
              answer?.saved === true
            );
          })
          .map((exercise) => {
            const answer =
              answers[
                exercise.id
              ];

            return {
              skillId:
                primary?.skillId ??
                exercise.competenta,

              exerciseId:
                exercise.id,

              isCorrect:
                answer.correct,

              usedHint:
                answer.usedHint,
            };
          }),
      [
        exercises,
        answers,
        primary,
      ]
    );

  const sessionResult =
    finished
      ? getReviewSessionResult(
          questionResults
        )
      : null;

  /* =======================================================
     ANSWER
  ======================================================= */

  function setAnswer(
    value: string
  ) {
    if (
      !currentExercise ||
      currentAnswer?.checked ||
      currentAnswer?.saving
    ) {
      return;
    }

    setAnswers(
      (previous) => ({
        ...previous,

        [currentExercise.id]: {
          answer: value,

          checked:
            previous[
              currentExercise.id
            ]?.checked ??
            false,

          correct:
            previous[
              currentExercise.id
            ]?.correct ??
            false,

          usedHint:
            previous[
              currentExercise.id
            ]?.usedHint ??
            false,

          saving:
            previous[
              currentExercise.id
            ]?.saving ??
            false,

          saved:
            previous[
              currentExercise.id
            ]?.saved ??
            false,

          saveError:
            previous[
              currentExercise.id
            ]?.saveError ??
            null,
        },
      })
    );
  }

  function useHint() {
    if (
      !currentExercise ||
      currentAnswer?.checked ||
      currentAnswer?.saving
    ) {
      return;
    }

    setAnswers(
      (previous) => ({
        ...previous,

        [currentExercise.id]: {
          answer:
            previous[
              currentExercise.id
            ]?.answer ??
            "",

          checked: false,
          correct: false,

          usedHint: true,

          saving: false,
          saved: false,
          saveError: null,
        },
      })
    );
  }

  async function checkAnswer() {
    if (
      !currentExercise ||
      !primary ||
      !lessonSlug
    ) {
      return;
    }

    const answer =
      currentAnswer?.answer
        ?.trim() ?? "";

    if (
      !answer ||
      currentAnswer?.saving ||
      currentAnswer?.checked
    ) {
      return;
    }

    const isCorrect =
      normalizeAnswer(answer) ===
      normalizeAnswer(
        currentExercise
          .raspunsCorect
      );

    /*
     * Blocăm interfața înainte de
     * request, ca elevul să nu poată
     * trimite aceeași încercare de
     * două ori.
     */
    setAnswers(
      (previous) => ({
        ...previous,

        [currentExercise.id]: {
          answer,

          checked: false,

          correct:
            isCorrect,

          usedHint:
            previous[
              currentExercise.id
            ]?.usedHint ??
            false,

          saving: true,
          saved: false,
          saveError: null,
        },
      })
    );

    try {
      await saveStudentAttempt(
        supabase,
        {
          lessonId:
            lessonSlug,

          exerciseId:
            currentExercise.id,

          skillId:
            primary.skillId,

          answerGiven:
            answer,

          correctAnswer:
            currentExercise
              .raspunsCorect,

          isCorrect,

          usedHint:
            currentAnswer
              ?.usedHint ??
            false,

          source: "review",
        }
      );

      setAnswers(
        (previous) => ({
          ...previous,

          [currentExercise.id]: {
            answer,

            checked: true,

            correct:
              isCorrect,

            usedHint:
              previous[
                currentExercise.id
              ]?.usedHint ??
              false,

            saving: false,
            saved: true,
            saveError: null,
          },
        })
      );
    } catch (saveError) {
      console.error(
        "Eroare salvare Review:",
        saveError
      );

      setAnswers(
        (previous) => ({
          ...previous,

          [currentExercise.id]: {
            answer,

            checked: false,

            correct:
              isCorrect,

            usedHint:
              previous[
                currentExercise.id
              ]?.usedHint ??
              false,

            saving: false,
            saved: false,

            saveError:
              saveError instanceof Error
                ? saveError.message
                : "Răspunsul nu a putut fi salvat.",
          },
        })
      );
    }
  }

  function nextQuestion() {
    if (
      !currentExercise ||
      !currentAnswer?.checked ||
      !currentAnswer?.saved
    ) {
      return;
    }

    if (
      currentIndex <
      exercises.length - 1
    ) {
      setCurrentIndex(
        (value) =>
          value + 1
      );

      return;
    }

    setFinished(true);
  }

  function restartSession() {
    setAnswers({});
    setCurrentIndex(0);
    setFinished(false);
  }

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#07101f] px-6 text-white">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-800 border-t-cyan-400" />

          <p className="mt-5 text-sm font-bold text-slate-400">
            MATE pregătește
            recapitularea...
          </p>
        </div>
      </main>
    );
  }

  /* =======================================================
     ERROR
  ======================================================= */

  if (error) {
    return (
      <BacMateShell
        studentName={
          studentName
        }
        profileName={
          profileName
        }
        onSignOut={
          signOut
        }
        signingOut={
          signingOut
        }
      >
        <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
          <div className="rounded-[28px] border border-red-500/20 bg-red-500/10 p-7">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-red-300">
              Review indisponibil
            </p>

            <h1 className="mt-3 text-3xl font-black">
              Nu am putut pregăti
              recapitularea.
            </h1>

            <p className="mt-4 leading-7 text-slate-300">
              {error}
            </p>

            <button
              type="button"
              onClick={() =>
                window.location.reload()
              }
              className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-sm font-black transition hover:bg-blue-500"
            >
              Încearcă din nou
            </button>
          </div>
        </div>
      </BacMateShell>
    );
  }

  /* =======================================================
     NO PLAN
  ======================================================= */

  if (!primary) {
    return (
      <BacMateShell
        studentName={
          studentName
        }
        profileName={
          profileName
        }
        onSignOut={
          signOut
        }
        signingOut={
          signingOut
        }
      >
        <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-300">
            MATE • Review adaptiv
          </p>

          <h1 className="mt-3 text-4xl font-black">
            Ce trebuie să repet?
          </h1>

          <div className="mt-7 rounded-[28px] border border-white/10 bg-[#0b1628] p-7">
            <h2 className="text-2xl font-black">
              Mai am nevoie de câteva
              răspunsuri.
            </h2>

            <p className="mt-3 max-w-2xl leading-7 text-slate-400">
              Lucrează câteva exerciții,
              iar MATE va identifica
              automat competențele care
              trebuie recapitulate.
            </p>

            <a
              href="/programa"
              className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-black transition hover:bg-blue-500"
            >
              Mergi la lecții →
            </a>
          </div>
        </div>
      </BacMateShell>
    );
  }

  /* =======================================================
     CONTENT NOT PUBLISHABLE
  ======================================================= */

  if (!hasPublishableContent) {
    return (
      <BacMateShell
        studentName={
          studentName
        }
        profileName={
          profileName
        }
        onSignOut={
          signOut
        }
        signingOut={
          signingOut
        }
      >
        <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-300">
            MATE • Review adaptiv
          </p>

          <h1 className="mt-3 text-4xl font-black">
            Ce trebuie să repet?
          </h1>

          <section className="mt-7 rounded-[30px] border border-amber-400/20 bg-[#111b2d] p-7 sm:p-8">
            <div className="flex flex-wrap gap-2">
              <Badge>
                {getReviewPriorityLabel(
                  primary.priority
                )}
              </Badge>

              <Badge>
                {getReviewSessionLabel(
                  primary.sessionType
                )}
              </Badge>

              <Badge>
                {getReviewDifficultyLabel(
                  primary.difficulty
                )}
              </Badge>
            </div>

            <h2 className="mt-6 text-3xl font-black">
              {formatSkill(
                primary.skillId
              )}
            </h2>

            <p className="mt-4 max-w-3xl leading-7 text-slate-300">
              {primary.explanation}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <Metric
                label="Mastery"
                value={`${primary.masteryScore}/100`}
              />

              <Metric
                label="Greșeli active"
                value={String(
                  primary.unresolvedMistakes
                )}
              />

              <Metric
                label="Întrebări recomandate"
                value={String(
                  primary.recommendedQuestions
                )}
              />
            </div>

            <div className="mt-7 rounded-2xl border border-amber-400/20 bg-amber-400/[0.07] p-5">
              <p className="font-black text-amber-200">
                Exercițiile sunt blocate
                momentan.
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                MATE a identificat zona
                corect, dar lecția
                asociată nu a trecut încă
                toate verificările BAC
                MATE. Nu folosim exerciții
                neverificate doar pentru
                a umple sesiunea.
              </p>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={lessonHref}
                className="rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-black transition hover:bg-blue-500"
              >
                Deschide lecția →
              </a>

              <a
                href="/mate"
                className="rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-black transition hover:bg-white/10"
              >
                Înapoi la MATE
              </a>
            </div>
          </section>
        </div>
      </BacMateShell>
    );
  }

  /* =======================================================
     NO ELIGIBLE EXERCISES
  ======================================================= */

  if (exercises.length === 0) {
    return (
      <BacMateShell
        studentName={
          studentName
        }
        profileName={
          profileName
        }
        onSignOut={
          signOut
        }
        signingOut={
          signingOut
        }
      >
        <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8">
          <div className="rounded-[28px] border border-amber-400/20 bg-amber-400/[0.07] p-7">
            <h1 className="text-3xl font-black">
              Nu există încă exerciții
              eligibile.
            </h1>

            <p className="mt-4 leading-7 text-slate-300">
              Lecția este publicabilă,
              dar Review nu a găsit
              exerciții complete pentru
              această sesiune.
            </p>

            <a
              href="/mate"
              className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-black"
            >
              Înapoi la MATE
            </a>
          </div>
        </div>
      </BacMateShell>
    );
  }

  /* =======================================================
     RESULT
  ======================================================= */

  if (
    finished &&
    sessionResult
  ) {
    return (
      <BacMateShell
        studentName={
          studentName
        }
        profileName={
          profileName
        }
        onSignOut={
          signOut
        }
        signingOut={
          signingOut
        }
      >
        <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-300">
            MATE • Review finalizat
          </p>

          <h1 className="mt-3 text-4xl font-black">
            Rezultatul sesiunii
          </h1>

          <section className="mt-7 rounded-[30px] border border-white/10 bg-[#0b1628] p-7 sm:p-8">
            <div className="grid gap-3 sm:grid-cols-4">
              <Metric
                label="Scor"
                value={`${sessionResult.score}%`}
              />

              <Metric
                label="Corecte"
                value={String(
                  sessionResult.correctAnswers
                )}
              />

              <Metric
                label="Greșite"
                value={String(
                  sessionResult.wrongAnswers
                )}
              />

              <Metric
                label="Cu indiciu"
                value={String(
                  sessionResult.hintedAnswers
                )}
              />
            </div>

            <div
              className={`mt-7 rounded-2xl border p-5 ${
                sessionResult.passed
                  ? "border-emerald-400/20 bg-emerald-400/[0.07]"
                  : "border-amber-400/20 bg-amber-400/[0.07]"
              }`}
            >
              <p
                className={`font-black ${
                  sessionResult.passed
                    ? "text-emerald-300"
                    : "text-amber-200"
                }`}
              >
                {sessionResult.passed
                  ? "Sesiune trecută ✓"
                  : "Mai avem de consolidat"}
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                {
                  sessionResult.message
                }
              </p>
            </div>

            <p className="mt-6 text-sm leading-6 text-slate-400">
              Răspunsurile acestei
              sesiuni au fost salvate cu
              sursa{" "}
              <strong className="text-white">
                review
              </strong>
              . Mastery și caietul de
              greșeli au fost actualizate
              de motorul BAC MATE.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={
                  restartSession
                }
                className="rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-black transition hover:bg-blue-500"
              >
                Repetă sesiunea
              </button>

              <a
                href="/mate"
                className="rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-black transition hover:bg-white/10"
              >
                Înapoi la MATE
              </a>
            </div>
          </section>
        </div>
      </BacMateShell>
    );
  }

  /* =======================================================
     ACTIVE SESSION
  ======================================================= */

  return (
    <BacMateShell
      studentName={
        studentName
      }
      profileName={
        profileName
      }
      onSignOut={
        signOut
      }
      signingOut={
        signingOut
      }
    >
      <div className="mx-auto max-w-6xl px-5 py-8 pb-24 sm:px-8 lg:px-10">

        {/* HEADER */}

        <section className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-300">
              MATE • Review adaptiv
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-tight">
              {formatSkill(
                primary.skillId
              )}
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
              {primary.explanation}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge>
              {getReviewSessionLabel(
                primary.sessionType
              )}
            </Badge>

            <Badge>
              {getReviewDifficultyLabel(
                primary.difficulty
              )}
            </Badge>

            <Badge>
              {getReviewPriorityLabel(
                primary.priority
              )}
            </Badge>
          </div>
        </section>

        {/* QUESTION */}

        <section className="mt-7 rounded-[30px] border border-white/10 bg-[#0b1628] p-6 shadow-2xl shadow-black/20 sm:p-8">

          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                Exercițiu verificat
              </p>

              <p className="mt-1 text-sm font-black text-cyan-300">
                Întrebarea{" "}
                {currentIndex + 1} din{" "}
                {exercises.length}
              </p>
            </div>

            <div className="rounded-xl bg-white/5 px-4 py-2 text-sm font-black text-white">
              Mastery{" "}
              {primary.masteryScore}
              /100
            </div>
          </div>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-300"
              style={{
                width: `${
                  ((currentIndex + 1) /
                    exercises.length) *
                  100
                }%`,
              }}
            />
          </div>

          {currentExercise && (
            <>
              <h2 className="mt-8 max-w-4xl text-xl font-black leading-8 text-white sm:text-2xl">
                {
                  currentExercise.enunt
                }
              </h2>

              {/* MULTIPLE CHOICE */}

              {currentExercise.variante
                .length > 0 ? (
                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {currentExercise.variante.map(
                    (variant) => {
                      const selected =
                        currentAnswer
                          ?.answer ===
                        variant;

                      return (
                        <button
                          key={variant}
                          type="button"
                          disabled={
                            currentAnswer
                              ?.checked ||
                            currentAnswer
                              ?.saving
                          }
                          onClick={() =>
                            setAnswer(
                              variant
                            )
                          }
                          className={`rounded-2xl border p-4 text-left text-sm font-bold transition ${
                            selected
                              ? "border-cyan-300/40 bg-cyan-400/10 text-white"
                              : "border-white/10 bg-[#101b2d] text-slate-300 hover:border-cyan-300/20 hover:bg-white/[0.04]"
                          } disabled:cursor-default`}
                        >
                          {variant}
                        </button>
                      );
                    }
                  )}
                </div>
              ) : (
                <div className="mt-7">
                  <input
                    type="text"
                    value={
                      currentAnswer
                        ?.answer ??
                      ""
                    }
                    disabled={
                      currentAnswer
                        ?.checked ||
                      currentAnswer
                        ?.saving
                    }
                    onChange={(event) =>
                      setAnswer(
                        event.target.value
                      )
                    }
                    onKeyDown={(event) => {
                      if (
                        event.key ===
                        "Enter"
                      ) {
                        void checkAnswer();
                      }
                    }}
                    placeholder="Scrie răspunsul..."
                    className="w-full rounded-2xl border border-white/10 bg-[#101b2d] px-5 py-4 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/30 disabled:opacity-70"
                  />
                </div>
              )}

              {/* ACTIONS */}

              {!currentAnswer?.checked && (
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    disabled={
                      !currentAnswer
                        ?.answer
                        ?.trim() ||
                      currentAnswer
                        ?.saving
                    }
                    onClick={() =>
                      void checkAnswer()
                    }
                    className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-blue-950/30 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
                  >
                    {currentAnswer
                      ?.saving
                      ? "Se salvează..."
                      : "Verifică răspunsul"}
                  </button>

                  <button
                    type="button"
                    disabled={
                      currentAnswer
                        ?.saving
                    }
                    onClick={useHint}
                    className="rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-black text-slate-200 transition hover:bg-white/10 disabled:opacity-40"
                  >
                    Am nevoie de un indiciu
                  </button>
                </div>
              )}

              {/* HINT */}

              {currentAnswer
                ?.usedHint &&
                !currentAnswer
                  ?.checked && (
                  <div className="mt-5 rounded-2xl border border-violet-400/20 bg-violet-400/[0.07] p-5">
                    <p className="text-xs font-black uppercase tracking-[0.15em] text-violet-300">
                      Indiciu MATE
                    </p>

                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      Identifică mai întâi
                      regula, definiția sau
                      relația matematică de
                      care ai nevoie.
                      Încearcă apoi să
                      rezolvi singur.
                    </p>
                  </div>
                )}

              {/* SAVE ERROR */}

              {currentAnswer
                ?.saveError && (
                <div className="mt-5 rounded-2xl border border-red-400/20 bg-red-400/[0.07] p-5">
                  <p className="font-black text-red-300">
                    Răspunsul nu a fost
                    salvat.
                  </p>

                  <p className="mt-2 text-sm text-slate-300">
                    {
                      currentAnswer
                        .saveError
                    }
                  </p>

                  <p className="mt-2 text-xs text-slate-500">
                    Poți apăsa din nou
                    „Verifică răspunsul”.
                  </p>
                </div>
              )}

              {/* RESULT */}

              {currentAnswer?.checked &&
                currentAnswer.saved && (
                  <div
                    className={`mt-6 rounded-2xl border p-5 ${
                      currentAnswer.correct
                        ? "border-emerald-400/20 bg-emerald-400/[0.07]"
                        : "border-red-400/20 bg-red-400/[0.07]"
                    }`}
                  >
                    <p
                      className={`text-lg font-black ${
                        currentAnswer.correct
                          ? "text-emerald-300"
                          : "text-red-300"
                      }`}
                    >
                      {currentAnswer.correct
                        ? "Corect ✓"
                        : "Nu încă"}
                    </p>

                    {!currentAnswer.correct && (
                      <p className="mt-3 text-sm leading-6 text-slate-300">
                        Răspunsul corect:{" "}
                        <strong className="text-white">
                          {
                            currentExercise
                              .raspunsCorect
                          }
                        </strong>
                      </p>
                    )}

                    {currentExercise
                      .rezolvare.length >
                      0 && (
                      <div className="mt-5 rounded-xl bg-black/15 p-4">
                        <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                          Rezolvare
                        </p>

                        <div className="mt-3 space-y-2">
                          {currentExercise.rezolvare.map(
                            (
                              step,
                              index
                            ) => (
                              <div
                                key={`${currentExercise.id}-step-${index}`}
                                className="flex gap-3 text-sm leading-6 text-slate-300"
                              >
                                <span className="font-black text-cyan-300">
                                  {index +
                                    1}
                                  .
                                </span>

                                <span>
                                  {step}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    {currentExercise
                      .explicatieFinala && (
                      <p className="mt-4 text-sm leading-6 text-slate-300">
                        {
                          currentExercise
                            .explicatieFinala
                        }
                      </p>
                    )}

                    <button
                      type="button"
                      onClick={
                        nextQuestion
                      }
                      className="mt-6 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-black transition hover:bg-blue-500"
                    >
                      {currentIndex ===
                      exercises.length - 1
                        ? "Vezi rezultatul →"
                        : "Următoarea întrebare →"}
                    </button>
                  </div>
                )}
            </>
          )}
        </section>

        {/* SESSION INFO */}

        <section className="mt-5 grid gap-3 sm:grid-cols-3">
          <Metric
            label="Întrebări"
            value={String(
              exercises.length
            )}
          />

          <Metric
            label="Greșeli active înainte"
            value={String(
              primary.unresolvedMistakes
            )}
          />

          <Metric
            label="Tip sesiune"
            value={getReviewSessionLabel(
              primary.sessionType
            )}
          />
        </section>

        {/* SECONDARY */}

        {secondary.length > 0 && (
          <section className="mt-8 rounded-[26px] border border-white/10 bg-[#0b1628] p-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
              După această sesiune
            </p>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {secondary.map(
                (item) => (
                  <div
                    key={
                      item.skillId
                    }
                    className="rounded-2xl border border-white/[0.06] bg-black/10 p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-black text-white">
                        {formatSkill(
                          item.skillId
                        )}
                      </p>

                      <span className="text-sm font-black text-cyan-300">
                        {
                          item.masteryScore
                        }
                        /100
                      </span>
                    </div>

                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      {
                        item.explanation
                      }
                    </p>
                  </div>
                )
              )}
            </div>
          </section>
        )}

        <p className="mt-6 text-center text-xs leading-5 text-slate-600">
          MATE organizează sesiunea.
          Corectitudinea matematică vine
          din conținutul care a trecut
          gate-ul BAC MATE, iar fiecare
          răspuns este trimis către
          Mastery Engine.
        </p>
      </div>
    </BacMateShell>
  );
}

/* =========================================================
   SMALL UI
========================================================= */

function Badge({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.08em] text-slate-200">
      {children}
    </span>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#0b1628] p-4">
      <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-xl font-black text-white">
        {value}
      </p>
    </div>
  );
}