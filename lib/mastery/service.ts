import type { SupabaseClient } from "@supabase/supabase-js";

import {
  createEmptyMastery,
  updateMastery,
} from "./engine";

export type SaveAttemptInput = {
  lessonId: string;
  exerciseId: string;
  skillId: string;

  answerGiven?: string | null;
  correctAnswer?: string | null;

  isCorrect: boolean;
  usedHint?: boolean;

  responseTimeSeconds?: number | null;

  source?:
    | "lesson"
    | "weekly_assessment"
    | "review"
    | "mascot"
    | "bac_simulation";

  /*
   * Identifică sesiunea care a produs încercarea.
   *
   * Pentru simulările BAC va conține ID-ul
   * din bac_simulations.
   *
   * Pentru lecțiile și funcțiile vechi rămâne null,
   * deci comportamentul existent nu este afectat.
   */
  sourceSessionId?: string | null;
};

type MasteryRow = {
  mastery_score: number;
  total_attempts: number;
  correct_attempts: number;
  consecutive_correct: number;
};

type PreviousAttemptRow = {
  attempt_number: number;
};

type ExistingMistakeRow = {
  id: string;
  times_missed: number;
};

export async function saveStudentAttempt(
  supabase: SupabaseClient,
  input: SaveAttemptInput
) {
  /*
   * 1. Identificăm utilizatorul.
   */

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error(
      "Utilizatorul nu este autentificat."
    );
  }

  /*
   * 2. Aflăm numărul încercării pentru
   * exercițiul curent.
   */

  const {
    data: previousAttempts,
    error: previousAttemptsError,
  } = await supabase
    .from("student_attempts")
    .select("attempt_number")
    .eq("user_id", user.id)
    .eq("lesson_id", input.lessonId)
    .eq("exercise_id", input.exerciseId)
    .order("attempt_number", {
      ascending: false,
    })
    .limit(1);

  if (previousAttemptsError) {
    throw previousAttemptsError;
  }

  const lastAttempt =
    (previousAttempts?.[0] ??
      null) as PreviousAttemptRow | null;

  const attemptNumber =
    (lastAttempt?.attempt_number ?? 0) + 1;

  /*
   * 3. Salvăm încercarea.
   *
   * source_session_id este opțional.
   * Pentru o simulare BAC primește ID-ul
   * sesiunii din bac_simulations.
   */

  const {
    data: savedAttempt,
    error: attemptError,
  } = await supabase
    .from("student_attempts")
    .insert({
      user_id: user.id,

      lesson_id: input.lessonId,
      exercise_id: input.exerciseId,
      skill_id: input.skillId,

      answer_given:
        input.answerGiven ?? null,

      correct_answer:
        input.correctAnswer ?? null,

      is_correct: input.isCorrect,

      attempt_number: attemptNumber,

      used_hint:
        input.usedHint ?? false,

      response_time_seconds:
        input.responseTimeSeconds ?? null,

      source:
        input.source ?? "lesson",

      source_session_id:
        input.sourceSessionId ?? null,
    })
    .select("id")
    .single();

  if (attemptError) {
    throw attemptError;
  }

  /*
   * 4. Citim mastery-ul actual.
   */

  const {
    data: masteryData,
    error: masteryReadError,
  } = await supabase
    .from("student_mastery")
    .select(
      [
        "mastery_score",
        "total_attempts",
        "correct_attempts",
        "consecutive_correct",
      ].join(",")
    )
    .eq("user_id", user.id)
    .eq("skill_id", input.skillId)
    .maybeSingle();

  if (masteryReadError) {
    throw masteryReadError;
  }

  const masteryRow =
    masteryData as MasteryRow | null;

  const currentMastery = masteryRow
    ? {
        masteryScore:
          masteryRow.mastery_score,

        totalAttempts:
          masteryRow.total_attempts,

        correctAttempts:
          masteryRow.correct_attempts,

        consecutiveCorrect:
          masteryRow.consecutive_correct,
      }
    : createEmptyMastery();

  /*
   * 5. Calcul determinist al noului mastery.
   */

  const updatedMastery = updateMastery(
    currentMastery,
    {
      isCorrect: input.isCorrect,
      usedHint:
        input.usedHint ?? false,
    }
  );

  /*
   * 6. Salvăm mastery-ul.
   */

  const {
    error: masteryWriteError,
  } = await supabase
    .from("student_mastery")
    .upsert(
      {
        user_id: user.id,
        skill_id: input.skillId,

        mastery_score:
          updatedMastery.masteryScore,

        total_attempts:
          updatedMastery.totalAttempts,

        correct_attempts:
          updatedMastery.correctAttempts,

        consecutive_correct:
          updatedMastery.consecutiveCorrect,

        last_result:
          input.isCorrect,

        last_practiced_at:
          new Date().toISOString(),

        next_review_at:
          updatedMastery.nextReviewAt.toISOString(),

        updated_at:
          new Date().toISOString(),
      },
      {
        onConflict:
          "user_id,skill_id",
      }
    );

  if (masteryWriteError) {
    throw masteryWriteError;
  }

  /*
   * 7. Dacă răspunsul este greșit,
   * îl adăugăm în caietul de greșeli.
   */

  if (!input.isCorrect) {
    const {
      data: existingMistake,
      error: mistakeReadError,
    } = await supabase
      .from("student_mistakes")
      .select("id, times_missed")
      .eq("user_id", user.id)
      .eq("lesson_id", input.lessonId)
      .eq(
        "exercise_id",
        input.exerciseId
      )
      .maybeSingle();

    if (mistakeReadError) {
      throw mistakeReadError;
    }

    const mistake =
      existingMistake as
        | ExistingMistakeRow
        | null;

    if (mistake) {
      const {
        error: mistakeUpdateError,
      } = await supabase
        .from("student_mistakes")
        .update({
          skill_id: input.skillId,

          wrong_answer:
            input.answerGiven ?? null,

          correct_answer:
            input.correctAnswer ?? null,

          times_missed:
            mistake.times_missed + 1,

          resolved: false,

          resolved_at: null,

          last_seen_at:
            new Date().toISOString(),
        })
        .eq("id", mistake.id);

      if (mistakeUpdateError) {
        throw mistakeUpdateError;
      }
    } else {
      const {
        error: mistakeInsertError,
      } = await supabase
        .from("student_mistakes")
        .insert({
          user_id: user.id,

          lesson_id:
            input.lessonId,

          exercise_id:
            input.exerciseId,

          skill_id:
            input.skillId,

          mistake_type: "unknown",

          wrong_answer:
            input.answerGiven ?? null,

          correct_answer:
            input.correctAnswer ?? null,

          times_missed: 1,

          resolved: false,
        });

      if (mistakeInsertError) {
        throw mistakeInsertError;
      }
    }
  }

  /*
   * 8. Dacă răspunsul este corect după
   * o greșeală anterioară, marcăm problema
   * ca rezolvată.
   */

  if (input.isCorrect) {
    const now =
      new Date().toISOString();

    const {
      error: resolveError,
    } = await supabase
      .from("student_mistakes")
      .update({
        resolved: true,
        resolved_at: now,
      })
      .eq("user_id", user.id)
      .eq("lesson_id", input.lessonId)
      .eq(
        "exercise_id",
        input.exerciseId
      )
      .eq("resolved", false);

    if (resolveError) {
      throw resolveError;
    }
  }

  /*
   * 9. Returnăm rezultatul pentru interfață,
   * mascotă și celelalte motoare BAC MATE.
   */

  return {
    attemptId: savedAttempt.id,

    attemptNumber,

    mastery: updatedMastery,
  };
}