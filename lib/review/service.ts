import type { SupabaseClient } from "@supabase/supabase-js";

import {
  buildReviewPlan,
  calculateReviewSessionResult,
  type ReviewMasteryInput,
  type ReviewMistakeInput,
  type ReviewPlan,
  type ReviewQuestionResult,
  type ReviewSessionResult,
  type ReviewWeeklyAssessmentInput,
} from "./engine";

/* =========================================================
   BAC MATE — REVIEW SERVICE V1

   Rol:
   Supabase
      ↓
   date reale elev
      ↓
   Review Engine
      ↓
   Review Plan

   IMPORTANT:
   Service-ul NU generează exerciții și NU decide
   corectitudinea matematică.
========================================================= */

/* =========================================================
   DATABASE ROW TYPES
========================================================= */

type MasteryRow = {
  skill_id: string;
  mastery_score: number | null;
  total_attempts: number | null;
  correct_attempts: number | null;
  consecutive_correct: number | null;
  next_review_at: string | null;
};

type MistakeRow = {
  skill_id: string;
  lesson_id: string | null;
  exercise_id: string | null;
  mistake_type: string | null;
  resolved: boolean | null;
  times_missed: number | null;
  first_seen_at: string | null;
  last_seen_at: string | null;
};

type WeeklyAssessmentRow = {
  score: number | null;
  strongest_skill_id: string | null;
  weakest_skill_id: string | null;
  completed_at: string | null;
};

export type ReviewPlanData = {
  plan: ReviewPlan;
  userId: string;
};

/* =========================================================
   HELPERS
========================================================= */

function safeNumber(
  value: number | null | undefined,
  fallback = 0
) {
  if (
    typeof value !== "number" ||
    !Number.isFinite(value)
  ) {
    return fallback;
  }

  return value;
}

/* =========================================================
   AUTH
========================================================= */

async function getAuthenticatedUser(
  supabase: SupabaseClient
) {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw new Error(
      `Nu am putut verifica utilizatorul: ${error.message}`
    );
  }

  if (!user) {
    throw new Error(
      "Utilizatorul nu este autentificat."
    );
  }

  return user;
}

/* =========================================================
   MASTERY
========================================================= */

async function getMasteryRows(
  supabase: SupabaseClient,
  userId: string
): Promise<MasteryRow[]> {
  const { data, error } = await supabase
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
    throw new Error(
      `Nu am putut încărca Mastery: ${error.message}`
    );
  }

  return (data ?? []) as unknown as MasteryRow[];
}

/* =========================================================
   MISTAKES
========================================================= */

async function getMistakeRows(
  supabase: SupabaseClient,
  userId: string
): Promise<MistakeRow[]> {
  const { data, error } = await supabase
    .from("student_mistakes")
    .select(
      [
        "skill_id",
        "lesson_id",
        "exercise_id",
        "mistake_type",
        "resolved",
        "times_missed",
        "first_seen_at",
        "last_seen_at",
      ].join(",")
    )
    .eq("user_id", userId)
    .eq("resolved", false)
    .order("last_seen_at", {
      ascending: false,
    });

  if (error) {
    throw new Error(
      `Nu am putut încărca greșelile: ${error.message}`
    );
  }

  return (data ?? []) as unknown as MistakeRow[];
}

/* =========================================================
   WEEKLY ASSESSMENT
========================================================= */

async function getLatestWeeklyAssessment(
  supabase: SupabaseClient,
  userId: string
): Promise<WeeklyAssessmentRow | null> {
  const { data, error } = await supabase
    .from("weekly_assessments")
    .select(
      [
        "score",
        "strongest_skill_id",
        "weakest_skill_id",
        "completed_at",
      ].join(",")
    )
    .eq("user_id", userId)
    .eq("status", "completed")
    .order("completed_at", {
      ascending: false,
    })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(
      `Nu am putut încărca evaluarea săptămânală: ${error.message}`
    );
  }

  return data as unknown as WeeklyAssessmentRow | null;
}

/* =========================================================
   DATABASE → ENGINE
========================================================= */

function mapMasteryRows(
  rows: MasteryRow[]
): ReviewMasteryInput[] {
  return rows
    .filter(
      (row) =>
        typeof row.skill_id === "string" &&
        row.skill_id.trim().length > 0
    )
    .map((row) => ({
      skillId: row.skill_id,

      masteryScore: safeNumber(
        row.mastery_score
      ),

      totalAttempts: safeNumber(
        row.total_attempts
      ),

      correctAttempts: safeNumber(
        row.correct_attempts
      ),

      consecutiveCorrect: safeNumber(
        row.consecutive_correct
      ),

      nextReviewAt:
        row.next_review_at,
    }));
}

function mapMistakeRows(
  rows: MistakeRow[]
): ReviewMistakeInput[] {
  return rows
    .filter(
      (row) =>
        typeof row.skill_id === "string" &&
        row.skill_id.trim().length > 0
    )
    .map((row) => ({
      skillId: row.skill_id,
      lessonId: row.lesson_id,
      exerciseId: row.exercise_id,
      mistakeType: row.mistake_type,

      resolved:
        row.resolved === true,

      timesMissed: Math.max(
        1,
        safeNumber(
          row.times_missed,
          1
        )
      ),

      firstSeenAt:
        row.first_seen_at,

      lastSeenAt:
        row.last_seen_at,
    }));
}

function mapWeeklyAssessment(
  row: WeeklyAssessmentRow | null
): ReviewWeeklyAssessmentInput | null {
  if (!row) {
    return null;
  }

  return {
    score: safeNumber(row.score),

    strongestSkillId:
      row.strongest_skill_id,

    weakestSkillId:
      row.weakest_skill_id,

    completedAt:
      row.completed_at,
  };
}

/* =========================================================
   GET REVIEW PLAN
========================================================= */

export async function getReviewPlan(
  supabase: SupabaseClient,
  options?: {
    now?: Date;
    maxSkills?: number;
  }
): Promise<ReviewPlanData> {
  const user =
    await getAuthenticatedUser(
      supabase
    );

  /*
   * Citim sursele independent.
   */
  const [
    masteryRows,
    mistakeRows,
    weeklyAssessment,
  ] = await Promise.all([
    getMasteryRows(
      supabase,
      user.id
    ),

    getMistakeRows(
      supabase,
      user.id
    ),

    getLatestWeeklyAssessment(
      supabase,
      user.id
    ),
  ]);

  const mastery =
    mapMasteryRows(
      masteryRows
    );

  const mistakes =
    mapMistakeRows(
      mistakeRows
    );

  const weekly =
    mapWeeklyAssessment(
      weeklyAssessment
    );

  const plan =
    buildReviewPlan(
      mastery,
      mistakes,
      weekly,
      {
        now:
          options?.now ??
          new Date(),

        maxSkills:
          options?.maxSkills ??
          3,
      }
    );

  return {
    plan,
    userId: user.id,
  };
}

/* =========================================================
   CALCULATE SESSION RESULT

   Folosit după ce pagina de Review are rezultate reale
   provenite din exerciții verificate.
========================================================= */

export function getReviewSessionResult(
  results: ReviewQuestionResult[]
): ReviewSessionResult {
  return calculateReviewSessionResult(
    results
  );
}