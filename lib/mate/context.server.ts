import type {
  MateAssessmentContext,
  MateMasteryContext,
  MateMistakeContext,
  MateProgressContext,
  MateStudentContext,
} from "./types";

type SupabaseLike = {
  from: (table: string) => any;
};

type ProfileRow = {
  nume: string | null;
  profil_bac: string | null;
  avatar_gender: string | null;
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
  skill_id: string | null;
  lesson_id: string | null;
  exercise_id: string | null;
  mistake_type: string | null;
  last_seen_at: string | null;
};

type ProgressRow = {
  lesson_id: string;
  completed: boolean | null;
  xp: number | null;
};

type AssessmentRow = {
  score: number | null;
  strongest_skill_id: string | null;
  weakest_skill_id: string | null;
  completed_at: string | null;
};

function safeNumber(
  value: number | null | undefined
) {
  return typeof value === "number" &&
    Number.isFinite(value)
    ? value
    : 0;
}

export async function getMateStudentContext(
  supabase: SupabaseLike,
  userId: string
): Promise<MateStudentContext> {
  const [
    profileResult,
    masteryResult,
    mistakesResult,
    progressResult,
    assessmentsResult,
  ] = await Promise.all([
    supabase
      .from("profiles")
      .select(
        "nume, profil_bac, avatar_gender"
      )
      .eq("id", userId)
      .maybeSingle(),

    supabase
      .from("student_mastery")
      .select(
        "skill_id, mastery_score, total_attempts, correct_attempts, consecutive_correct, next_review_at"
      )
      .eq("user_id", userId),

    supabase
      .from("student_mistakes")
      .select(
        "skill_id, lesson_id, exercise_id, mistake_type, last_seen_at"
      )
      .eq("user_id", userId)
      .eq("resolved", false)
      .order("last_seen_at", {
        ascending: false,
      })
      .limit(20),

    supabase
      .from("student_progress")
      .select(
        "lesson_id, completed, xp"
      )
      .eq("user_id", userId),

    supabase
      .from("weekly_assessments")
      .select(
        "score, strongest_skill_id, weakest_skill_id, completed_at"
      )
      .eq("user_id", userId)
      .eq("status", "completed")
      .order("completed_at", {
        ascending: false,
      })
      .limit(5),
  ]);

  if (profileResult.error) {
    throw new Error(
      `Profilul elevului nu poate fi citit: ${profileResult.error.message}`
    );
  }

  if (!profileResult.data) {
    throw new Error(
      "Profilul elevului nu există."
    );
  }

  if (masteryResult.error) {
    console.error(
      "MATE student_mastery:",
      masteryResult.error
    );
  }

  if (mistakesResult.error) {
    console.error(
      "MATE student_mistakes:",
      mistakesResult.error
    );
  }

  if (progressResult.error) {
    console.error(
      "MATE student_progress:",
      progressResult.error
    );
  }

  if (assessmentsResult.error) {
    console.error(
      "MATE weekly_assessments:",
      assessmentsResult.error
    );
  }

  const profile =
    profileResult.data as ProfileRow;

  const mastery: MateMasteryContext[] =
    (
      (masteryResult.data ??
        []) as MasteryRow[]
    )
      .filter(
        (row) =>
          typeof row.skill_id ===
            "string" &&
          row.skill_id.length > 0
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

  const activeMistakes: MateMistakeContext[] =
    (
      (mistakesResult.data ??
        []) as MistakeRow[]
    ).map((row) => ({
      skillId: row.skill_id,
      lessonId: row.lesson_id,
      exerciseId: row.exercise_id,
      mistakeType: row.mistake_type,

      // Tipul existent MateMistakeContext
      // se numește updatedAt.
      // În baza de date sursa reală este last_seen_at.
      updatedAt: row.last_seen_at,
    }));

  const completedLessons: MateProgressContext[] =
    (
      (progressResult.data ??
        []) as ProgressRow[]
    )
      .filter(
        (row) =>
          row.completed === true &&
          typeof row.lesson_id ===
            "string" &&
          row.lesson_id.length > 0
      )
      .map((row) => ({
        lessonId: row.lesson_id,
        completed: true,
        xp: safeNumber(row.xp),
      }));

  const recentAssessments: MateAssessmentContext[] =
    (
      (assessmentsResult.data ??
        []) as AssessmentRow[]
    ).map((row) => ({
      score: safeNumber(row.score),
      strongestSkillId:
        row.strongest_skill_id,
      weakestSkillId:
        row.weakest_skill_id,
      completedAt:
        row.completed_at,
    }));

  const masterySorted =
    [...mastery].sort(
      (a, b) =>
        a.masteryScore -
        b.masteryScore
    );

  const masteryWithActivity =
    mastery.filter(
      (item) =>
        item.totalAttempts > 0
    );

  const averageMastery =
    masteryWithActivity.length > 0
      ? Math.round(
          masteryWithActivity.reduce(
            (sum, item) =>
              sum +
              item.masteryScore,
            0
          ) /
            masteryWithActivity.length
        )
      : null;

  const weakestSkill =
    masterySorted.find(
      (item) =>
        item.totalAttempts > 0
    ) ?? null;

  const strongestSkill =
    [...masteryWithActivity].sort(
      (a, b) =>
        b.masteryScore -
        a.masteryScore
    )[0] ?? null;

  return {
    profile: {
      name:
        profile.nume?.trim() ||
        "Elev",
      bacProfile:
        profile.profil_bac?.trim() ||
        "Necunoscut",
      avatarGender:
        profile.avatar_gender,
    },

    mastery,
    activeMistakes,
    completedLessons,
    recentAssessments,

    summary: {
      completedLessonCount:
        completedLessons.length,

      totalXp:
        completedLessons.reduce(
          (sum, lesson) =>
            sum + lesson.xp,
          0
        ),

      activeMistakeCount:
        activeMistakes.length,

      averageMastery,

      weakestSkillId:
        weakestSkill?.skillId ??
        null,

      strongestSkillId:
        strongestSkill?.skillId ??
        null,

      latestAssessmentScore:
        recentAssessments[0]
          ?.score ?? null,
    },
  };
}