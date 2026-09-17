import {
  buildDailyPlan,
  type DailyPlan,
  type MasteryInput,
  type MistakeInput,
  type ProgressInput,
  type WeeklyAssessmentInput,
} from "./engine";

type SupabaseLike = {
  auth: {
    getUser: () => Promise<{
      data: {
        user: {
          id: string;
        } | null;
      };
      error: unknown;
    }>;
  };

  from: (table: string) => any;
};

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
  resolved: boolean | null;
  first_seen_at: string | null;
  last_seen_at: string | null;
};

type ProgressRow = {
  lesson_id: string;
  completed: boolean | null;
  xp: number | null;
};

type WeeklyAssessmentRow = {
  status: string | null;
  score: number | null;
  strongest_skill_id: string | null;
  weakest_skill_id: string | null;
  completed_at: string | null;
};

export type DailyPlanData = {
  plan: DailyPlan;

  source: {
    masteryCount: number;
    unresolvedMistakesCount: number;
    progressCount: number;
    hasWeeklyAssessment: boolean;
  };
};

function requireUserId(
  user: {
    id: string;
  } | null,
  error: unknown
) {
  if (error || !user) {
    throw new Error(
      "Trebuie să fii autentificat pentru a genera planul zilnic."
    );
  }

  return user.id;
}

function mapMasteryRows(
  rows: MasteryRow[]
): MasteryInput[] {
  return rows
    .filter(
      (row) =>
        typeof row.skill_id ===
          "string" &&
        row.skill_id.trim().length > 0
    )
    .map((row) => ({
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

function mapMistakeRows(
  rows: MistakeRow[]
): MistakeInput[] {
  return rows
    .filter(
      (row) =>
        typeof row.skill_id ===
          "string" &&
        row.skill_id.trim().length > 0
    )
    .map((row) => ({
      skillId: row.skill_id,

      lessonId:
        row.lesson_id,

      exerciseId:
        row.exercise_id,

      resolved:
        row.resolved === true,

      createdAt:
        row.first_seen_at,

      updatedAt:
        row.last_seen_at,
    }));
}

function mapProgressRows(
  rows: ProgressRow[]
): ProgressInput[] {
  return rows
    .filter(
      (row) =>
        typeof row.lesson_id ===
          "string" &&
        row.lesson_id.trim().length > 0
    )
    .map((row) => ({
      lessonId: row.lesson_id,

      completed:
        row.completed === true,

      xp:
        row.xp ?? 0,
    }));
}

function mapWeeklyAssessment(
  row: WeeklyAssessmentRow | null
): WeeklyAssessmentInput | null {
  if (!row) {
    return null;
  }

  if (
    row.status !== "completed" ||
    !row.completed_at
  ) {
    return null;
  }

  return {
    score: row.score ?? 0,

    strongestSkillId:
      row.strongest_skill_id,

    weakestSkillId:
      row.weakest_skill_id,

    completedAt:
      row.completed_at,
  };
}

export async function getDailyPlan(
  supabase: SupabaseLike,
  options?: {
    maxActions?: number;
    now?: Date;
  }
): Promise<DailyPlanData> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  const userId =
    requireUserId(
      user,
      userError
    );

  /*
    Citim sursele independent.

    Dacă una dintre sursele secundare nu
    există încă pentru elev, planul poate
    continua cu celelalte date.

    Dacă interogarea însă produce o eroare
    reală, nu ascundem problema.
  */
  const [
    masteryResponse,
    mistakesResponse,
    progressResponse,
    weeklyResponse,
  ] = await Promise.all([
    supabase
      .from("student_mastery")
      .select(
        [
          "skill_id",
          "mastery_score",
          "total_attempts",
          "correct_attempts",
          "consecutive_correct",
          "next_review_at",
        ].join(", ")
      )
      .eq("user_id", userId),

    supabase
      .from("student_mistakes")
      .select(
        [
          "skill_id",
          "lesson_id",
          "exercise_id",
          "resolved",
          "first_seen_at",
          "last_seen_at",
        ].join(", ")
      )
      .eq("user_id", userId),

    supabase
      .from("student_progress")
      .select(
        [
          "lesson_id",
          "completed",
          "xp",
        ].join(", ")
      )
      .eq("user_id", userId),

    supabase
      .from("weekly_assessments")
      .select(
        [
          "status",
          "score",
          "strongest_skill_id",
          "weakest_skill_id",
          "completed_at",
        ].join(", ")
      )
      .eq("user_id", userId)
      .eq("status", "completed")
      .order(
        "completed_at",
        {
          ascending: false,
        }
      )
      .limit(1)
      .maybeSingle(),
  ]);

  if (masteryResponse.error) {
    console.error(
      "Daily Plan - student_mastery:",
      masteryResponse.error
    );

    throw new Error(
      "Mastery Engine nu a putut fi citit."
    );
  }

  if (mistakesResponse.error) {
    console.error(
      "Daily Plan - student_mistakes:",
      mistakesResponse.error
    );

    throw new Error(
      "Mistake Engine nu a putut fi citit."
    );
  }

  if (progressResponse.error) {
    console.error(
      "Daily Plan - student_progress:",
      progressResponse.error
    );

    throw new Error(
      "Progresul elevului nu a putut fi citit."
    );
  }

  if (weeklyResponse.error) {
    console.error(
      "Daily Plan - weekly_assessments:",
      weeklyResponse.error
    );

    throw new Error(
      "Ultima evaluare săptămânală nu a putut fi citită."
    );
  }

  const masteryRows =
    (masteryResponse.data ??
      []) as unknown as MasteryRow[];

  const mistakeRows =
    (mistakesResponse.data ??
      []) as unknown as MistakeRow[];

  const progressRows =
    (progressResponse.data ??
      []) as unknown as ProgressRow[];

  const weeklyRow =
    (weeklyResponse.data ??
      null) as unknown as WeeklyAssessmentRow | null;

  const mastery =
    mapMasteryRows(
      masteryRows
    );

  const mistakes =
    mapMistakeRows(
      mistakeRows
    );

  const progress =
    mapProgressRows(
      progressRows
    );

  const weeklyAssessment =
    mapWeeklyAssessment(
      weeklyRow
    );

  const plan =
    buildDailyPlan(
      mastery,
      mistakes,
      weeklyAssessment,
      progress,
      options?.now ??
        new Date(),
      options?.maxActions ?? 3
    );

  return {
    plan,

    source: {
      masteryCount:
        mastery.length,

      unresolvedMistakesCount:
        mistakes.filter(
          (mistake) =>
            mistake.resolved !== true
        ).length,

      progressCount:
        progress.length,

      hasWeeklyAssessment:
        weeklyAssessment !== null,
    },
  };
}

export async function getDailyPlanPrimaryAction(
  supabase: SupabaseLike
) {
  const { plan } =
    await getDailyPlan(
      supabase,
      {
        maxActions: 3,
      }
    );

  return plan.primaryAction;
}

export async function getDailyPlanSummary(
  supabase: SupabaseLike
) {
  const data =
    await getDailyPlan(
      supabase
    );

  return {
    message:
      data.plan.message,

    primaryAction:
      data.plan.primaryAction,

    secondaryActions:
      data.plan.secondaryActions,

    averageMastery:
      data.plan.averageMastery,

    unresolvedMistakes:
      data.plan.unresolvedMistakes,

    completedLessons:
      data.plan.completedLessons,

    totalTrackedLessons:
      data.plan.totalTrackedLessons,

    hasWeeklyAssessment:
      data.source
        .hasWeeklyAssessment,
  };
}