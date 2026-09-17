import type { SupabaseClient } from "@supabase/supabase-js";

import {
  buildWeeklyAssessmentPlan,
  calculateWeeklyResult,
  type WeeklyAssessmentPlan,
  type WeeklyMasteryInput,
  type WeeklyQuestionResult,
} from "./engine";

type MasteryRow = {
  skill_id: string;
  mastery_score: number;
  total_attempts: number;
  correct_attempts: number;
  consecutive_correct: number;
  next_review_at: string | null;
};

export type WeeklyAssessmentSession = {
  assessmentId: string;
  plan: WeeklyAssessmentPlan;
};

export type CompleteWeeklyAssessmentResult = {
  assessmentId: string;
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  strongestSkillId: string | null;
  weakestSkillId: string | null;
};

/*
 * Citește Mastery-ul elevului și îl
 * transformă în formatul folosit de
 * Weekly Assessment Engine.
 */
async function getStudentMastery(
  supabase: SupabaseClient,
  userId: string
): Promise<WeeklyMasteryInput[]> {
  const {
    data,
    error,
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
    .eq("user_id", userId);

  if (error) {
    throw error;
  }

 const rows =
    (data ?? []) as unknown as MasteryRow[];

  return rows.map((row) => ({
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
  }));
}

/*
 * Creează o evaluare săptămânală nouă.
 *
 * Motorul citește student_mastery,
 * selectează competențele prioritare și
 * creează sesiunea în weekly_assessments.
 */
export async function createWeeklyAssessment(
  supabase: SupabaseClient,
  maxQuestions = 5
): Promise<WeeklyAssessmentSession> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error(
      "Utilizatorul nu este autentificat."
    );
  }

  const mastery =
    await getStudentMastery(
      supabase,
      user.id
    );

  const plan =
    buildWeeklyAssessmentPlan(
      mastery,
      maxQuestions
    );

  if (plan.totalQuestions === 0) {
    throw new Error(
      "Nu există încă suficiente date Mastery pentru evaluarea săptămânală."
    );
  }

  const now =
    new Date().toISOString();

  const {
    data: assessment,
    error: assessmentError,
  } = await supabase
    .from("weekly_assessments")
    .insert({
      user_id: user.id,

      status: "in_progress",

      total_questions:
        plan.totalQuestions,

      correct_answers: 0,

      score: 0,

      strongest_skill_id: null,

      weakest_skill_id: null,

      started_at: now,

      completed_at: null,
    })
    .select("id")
    .single();

  if (assessmentError) {
    throw assessmentError;
  }

  return {
    assessmentId: assessment.id,
    plan,
  };
}

/*
 * Finalizează evaluarea săptămânală.
 *
 * Rezultatul este calculat determinist
 * de engine.ts și apoi persistat în
 * weekly_assessments.
 */
export async function completeWeeklyAssessment(
  supabase: SupabaseClient,
  assessmentId: string,
  results: WeeklyQuestionResult[]
): Promise<CompleteWeeklyAssessmentResult> {
  if (!assessmentId) {
    throw new Error(
      "Lipsește ID-ul evaluării."
    );
  }

  if (results.length === 0) {
    throw new Error(
      "Evaluarea nu conține rezultate."
    );
  }

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
   * Confirmăm că evaluarea aparține
   * utilizatorului autentificat.
   */
  const {
    data: assessment,
    error: readError,
  } = await supabase
    .from("weekly_assessments")
    .select("id, status")
    .eq("id", assessmentId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (readError) {
    throw readError;
  }

  if (!assessment) {
    throw new Error(
      "Evaluarea săptămânală nu a fost găsită."
    );
  }

  if (assessment.status === "completed") {
    throw new Error(
      "Evaluarea săptămânală este deja finalizată."
    );
  }

  const result =
    calculateWeeklyResult(results);

  const completedAt =
    new Date().toISOString();

  const {
    error: updateError,
  } = await supabase
    .from("weekly_assessments")
    .update({
      status: "completed",

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
        completedAt,
    })
    .eq("id", assessmentId)
    .eq("user_id", user.id);

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

/*
 * Returnează ultima evaluare
 * săptămânală finalizată.
 *
 * Va fi utilă pentru Dashboard și
 * pentru dialogul mascotei.
 */
export async function getLatestWeeklyAssessment(
  supabase: SupabaseClient
) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return null;
  }

  const {
    data,
    error,
  } = await supabase
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
        "started_at",
        "completed_at",
        "created_at",
      ].join(",")
    )
    .eq("user_id", user.id)
    .eq("status", "completed")
    .order("completed_at", {
      ascending: false,
    })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}