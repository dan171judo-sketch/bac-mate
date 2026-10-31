import type {
  SupabaseClient,
  User,
} from "@supabase/supabase-js";

import {
  calculateMasteryUpdates,
  calculateWeeklyResult,
  type WeeklyMasteryInput,
  type WeeklyQuestionResult,
} from "./engine";

import type {
  AdaptiveAttemptHistory,
  AdaptiveDifficulty,
} from "../../data/evaluari/types";

const ENGINE_VERSION = 2;

const MAX_QUESTIONS = 10;

const ATTEMPT_HISTORY_LIMIT = 500;

type MasteryRow = {
  skill_id: string;
  mastery_score: number | null;
  total_attempts: number | null;
  correct_attempts: number | null;
  consecutive_correct: number | null;
  next_review_at: string | null;
};

type AttemptRow = {
  question_id: string;
  lesson_id: string;
  question_family: string;
  difficulty: number;
  is_correct: boolean;
  answered_at: string;
};

export type StudentMasterySnapshot = {
  skillId: string;
  masteryScore: number;
  totalAttempts: number;
  correctAttempts: number;
  consecutiveCorrect: number;
  nextReviewAt: string | null;
};

export type WeeklyAssessmentSession = {
  assessmentId: string;

  mastery:
    StudentMasterySnapshot[];

  recentAttempts:
    AdaptiveAttemptHistory[];
};

export type WeeklyAssessmentAnswer = {
  questionId: string;
  skillId: string;

  questionFamily: string;

  difficulty:
    AdaptiveDifficulty;

  isCorrect: boolean;
};

export type CompleteWeeklyAssessmentResult = {
  assessmentId: string;
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  strongestSkillId: string | null;
  weakestSkillId: string | null;
};

function clamp(
  value: number,
  min: number,
  max: number
) {
  return Math.max(
    min,
    Math.min(max, value)
  );
}

function toSafeCounter(
  value: number | null
) {
  if (
    value === null ||
    !Number.isFinite(value)
  ) {
    return 0;
  }

  return Math.max(
    0,
    Math.floor(value)
  );
}

function toSafeMasteryScore(
  value: number | null
) {
  if (
    value === null ||
    !Number.isFinite(value)
  ) {
    return 0;
  }

  return Math.round(
    clamp(value, 0, 100)
  );
}

function toDifficulty(
  value: number
): AdaptiveDifficulty {
  if (value === 3) {
    return 3;
  }

  if (value === 2) {
    return 2;
  }

  return 1;
}

async function requireUser(
  supabase: SupabaseClient
): Promise<User> {
  const {
    data: { user },
    error,
  } =
    await supabase.auth.getUser();

  if (error || !user) {
    throw new Error(
      "Utilizatorul nu este autentificat."
    );
  }

  return user;
}

export async function getStudentMastery(
  supabase: SupabaseClient,
  userId: string
): Promise<
  StudentMasterySnapshot[]
> {
  const { data, error } =
    await supabase
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
      .eq(
        "user_id",
        userId
      );

  if (error) {
    throw error;
  }

  const rows =
    (data ?? []) as unknown as
      MasteryRow[];

  return rows.map((row) => {
    const totalAttempts =
      toSafeCounter(
        row.total_attempts
      );

    const correctAttempts =
      Math.min(
        totalAttempts,
        toSafeCounter(
          row.correct_attempts
        )
      );

    return {
      skillId:
        row.skill_id,

      masteryScore:
        toSafeMasteryScore(
          row.mastery_score
        ),

      totalAttempts,

      correctAttempts,

      consecutiveCorrect:
        toSafeCounter(
          row.consecutive_correct
        ),

      nextReviewAt:
        row.next_review_at,
    };
  });
}

export async function getRecentAssessmentAttempts(
  supabase: SupabaseClient,
  userId: string,
  limit =
    ATTEMPT_HISTORY_LIMIT
): Promise<
  AdaptiveAttemptHistory[]
> {
  const safeLimit =
    Math.max(
      1,
      Math.min(
        ATTEMPT_HISTORY_LIMIT,
        Math.floor(limit)
      )
    );

  const { data, error } =
    await supabase
      .from(
        "assessment_attempts"
      )
      .select(
        [
          "question_id",
          "lesson_id",
          "question_family",
          "difficulty",
          "is_correct",
          "answered_at",
        ].join(",")
      )
      .eq(
        "user_id",
        userId
      )
      .order(
        "answered_at",
        {
          ascending: false,
        }
      )
      .limit(
        safeLimit
      );

  if (error) {
    throw error;
  }

  const rows =
    (data ?? []) as unknown as
      AttemptRow[];

  return rows.map((row) => ({
    questionId:
      row.question_id,

    lessonId:
      row.lesson_id,

    questionFamily:
      row.question_family,

    difficulty:
      toDifficulty(
        row.difficulty
      ),

    isCorrect:
      row.is_correct,

    answeredAt:
      row.answered_at,
  }));
}

/*
 * Creează sesiunea și returnează
 * exact contextul de care motorul
 * adaptiv are nevoie:
 *
 * - Mastery
 * - istoricul întrebărilor
 *
 * Service-ul NU decide ce lecții
 * sunt eligibile.
 *
 * Regula completed=true rămâne
 * în fluxul evaluării.
 */
export async function createWeeklyAssessment(
  supabase: SupabaseClient,
  totalQuestions: number
): Promise<
  WeeklyAssessmentSession
> {
  const user =
    await requireUser(
      supabase
    );

  const safeTotalQuestions =
    Math.max(
      1,
      Math.min(
        MAX_QUESTIONS,
        Math.floor(
          totalQuestions
        )
      )
    );

  const [
    mastery,
    recentAttempts,
  ] = await Promise.all([
    getStudentMastery(
      supabase,
      user.id
    ),

    getRecentAssessmentAttempts(
      supabase,
      user.id
    ),
  ]);

  const now =
    new Date().toISOString();

  const {
    data: assessment,
    error: assessmentError,
  } =
    await supabase
      .from(
        "weekly_assessments"
      )
      .insert({
        user_id:
          user.id,

        status:
          "started",

        total_questions:
          safeTotalQuestions,

        correct_answers:
          0,

        score:
          0,

        strongest_skill_id:
          null,

        weakest_skill_id:
          null,

        started_at:
          now,

        completed_at:
          null,

        engine_version:
          ENGINE_VERSION,
      })
      .select("id")
      .single();

  if (assessmentError) {
    throw assessmentError;
  }

  return {
    assessmentId:
      assessment.id,

    mastery,

    recentAttempts,
  };
}

function validateAnswers(
  answers:
    WeeklyAssessmentAnswer[]
) {
  if (answers.length === 0) {
    throw new Error(
      "Evaluarea nu conține rezultate."
    );
  }

  if (
    answers.length >
    MAX_QUESTIONS
  ) {
    throw new Error(
      "Evaluarea conține prea multe rezultate."
    );
  }

  const questionIds =
    new Set<string>();

  for (
    const answer of answers
  ) {
    if (
      !answer.questionId ||
      !answer.questionId.trim()
    ) {
      throw new Error(
        "Există un răspuns fără questionId."
      );
    }

    if (
      !answer.skillId ||
      !answer.skillId.trim()
    ) {
      throw new Error(
        "Există un răspuns fără skillId."
      );
    }

    if (
      !answer.questionFamily ||
      !answer.questionFamily.trim()
    ) {
      throw new Error(
        "Există un răspuns fără questionFamily."
      );
    }

    if (
      answer.difficulty !== 1 &&
      answer.difficulty !== 2 &&
      answer.difficulty !== 3
    ) {
      throw new Error(
        "Există un răspuns cu dificultate invalidă."
      );
    }

    if (
      questionIds.has(
        answer.questionId
      )
    ) {
      throw new Error(
        "Aceeași întrebare apare de mai multe ori în evaluare."
      );
    }

    questionIds.add(
      answer.questionId
    );
  }
}

function toWeeklyResults(
  answers:
    WeeklyAssessmentAnswer[]
): WeeklyQuestionResult[] {
  return answers.map(
    (answer) => ({
      skillId:
        answer.skillId,

      isCorrect:
        answer.isCorrect,
    })
  );
}

function toMasteryInput(
  mastery:
    StudentMasterySnapshot[]
): WeeklyMasteryInput[] {
  return mastery.map(
    (item) => ({
      skillId:
        item.skillId,

      masteryScore:
        item.masteryScore,

      totalAttempts:
        item.totalAttempts,

      correctAttempts:
        item.correctAttempts,

      consecutiveCorrect:
        item.consecutiveCorrect,

      nextReviewAt:
        item.nextReviewAt,
    })
  );
}

export async function completeWeeklyAssessment(
  supabase: SupabaseClient,
  assessmentId: string,
  answers:
    WeeklyAssessmentAnswer[]
): Promise<
  CompleteWeeklyAssessmentResult
> {
  if (
    !assessmentId ||
    !assessmentId.trim()
  ) {
    throw new Error(
      "Lipsește ID-ul evaluării."
    );
  }

  validateAnswers(
    answers
  );

  const user =
    await requireUser(
      supabase
    );

  const {
    data: assessment,
    error: readError,
  } =
    await supabase
      .from(
        "weekly_assessments"
      )
      .select(
        "id, status"
      )
      .eq(
        "id",
        assessmentId
      )
      .eq(
        "user_id",
        user.id
      )
      .maybeSingle();

  if (readError) {
    throw readError;
  }

  if (!assessment) {
    throw new Error(
      "Evaluarea nu a fost găsită."
    );
  }

  if (
    assessment.status ===
    "completed"
  ) {
    throw new Error(
      "Evaluarea este deja finalizată."
    );
  }

  if (
    assessment.status !==
    "started"
  ) {
    throw new Error(
      "Evaluarea nu are o stare validă pentru finalizare."
    );
  }

  const weeklyResults =
    toWeeklyResults(
      answers
    );

  const result =
    calculateWeeklyResult(
      weeklyResults
    );

  /*
   * Citim Mastery chiar înainte
   * de finalizare.
   *
   * Nu folosim un snapshot vechi
   * din momentul pornirii evaluării.
   */
  const currentMastery =
    await getStudentMastery(
      supabase,
      user.id
    );

  const completedAt =
    new Date();

  const masteryUpdates =
    calculateMasteryUpdates(
      toMasteryInput(
        currentMastery
      ),
      weeklyResults,
      completedAt
    );

  /*
   * 1. Salvăm istoricul exact al
   * întrebărilor.
   *
   * Constraint-ul unic:
   * assessment_id + question_id
   * protejează împotriva duplicatelor.
   */
  const {
    error: attemptsError,
  } =
    await supabase
      .from(
        "assessment_attempts"
      )
      .insert(
        answers.map(
          (answer) => ({
            user_id:
              user.id,

            assessment_id:
              assessmentId,

            question_id:
              answer.questionId,

            lesson_id:
              answer.skillId,

            question_family:
              answer.questionFamily,

            difficulty:
              answer.difficulty,

            is_correct:
              answer.isCorrect,

            answered_at:
              completedAt.toISOString(),
          })
        )
      );

  if (attemptsError) {
    throw attemptsError;
  }

  /*
   * 2. Actualizăm Mastery.
   *
   * Folosim upsert pentru că o lecție
   * nou finalizată poate să nu aibă
   * încă rând în student_mastery.
   *
   * Pentru aceasta baza trebuie să
   * aibă unicitate pe:
   *
   * user_id + skill_id
   */
  if (
    masteryUpdates.length > 0
  ) {
    const {
      error: masteryError,
    } =
      await supabase
        .from(
          "student_mastery"
        )
        .upsert(
          masteryUpdates.map(
            (update) => ({
              user_id:
                user.id,

              skill_id:
                update.skillId,

              mastery_score:
                update.masteryScore,

              total_attempts:
                update.totalAttempts,

              correct_attempts:
                update.correctAttempts,

              consecutive_correct:
                update.consecutiveCorrect,

              last_result:
                update.lastResult,

              last_practiced_at:
                update.lastPracticedAt,

              next_review_at:
                update.nextReviewAt,

              updated_at:
                update.updatedAt,
            })
          ),
          {
            onConflict:
              "user_id,skill_id",
          }
        );

    if (masteryError) {
      throw masteryError;
    }
  }

  /*
   * 3. Finalizăm sesiunea numai după
   * ce attempts și Mastery au fost
   * salvate cu succes.
   */
  const {
    error: updateError,
  } =
    await supabase
      .from(
        "weekly_assessments"
      )
      .update({
        status:
          "completed",

        total_questions:
          result.totalQuestions,

        correct_answers:
          result.correctAnswers,

        score:
          result.score,

        strongest_skill_id:
          result.strongestSkillId,

        weakest_skill_id:
          result.weakestSkillId,

        completed_at:
          completedAt.toISOString(),

        engine_version:
          ENGINE_VERSION,
      })
      .eq(
        "id",
        assessmentId
      )
      .eq(
        "user_id",
        user.id
      );

  if (updateError) {
    throw updateError;
  }

  return {
    assessmentId,

    totalQuestions:
      result.totalQuestions,

    correctAnswers:
      result.correctAnswers,

    score:
      result.score,

    strongestSkillId:
      result.strongestSkillId,

    weakestSkillId:
      result.weakestSkillId,
  };
}

export async function getLatestWeeklyAssessment(
  supabase: SupabaseClient
) {
  const {
    data: { user },
    error: userError,
  } =
    await supabase.auth.getUser();

  if (
    userError ||
    !user
  ) {
    return null;
  }

  const {
    data,
    error,
  } =
    await supabase
      .from(
        "weekly_assessments"
      )
      .select(
        [
          "id",
          "status",
          "total_questions",
          "correct_answers",
          "score",
          "strongest_skill_id",
          "weakest_skill_id",
          "started_at",
          "completed_at",
          "created_at",
          "engine_version",
        ].join(",")
      )
      .eq(
        "user_id",
        user.id
      )
      .eq(
        "status",
        "completed"
      )
      .order(
        "completed_at",
        {
          ascending: false,
        }
      )
      .limit(1)
      .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}