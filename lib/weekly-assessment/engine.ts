export type WeeklyMasteryInput = {
  skillId: string;
  masteryScore: number;
  totalAttempts: number;
  correctAttempts: number;
  consecutiveCorrect: number;
  nextReviewAt: Date | string | null;
};

export type WeeklySkillPriority = {
  skillId: string;
  masteryScore: number;
  priorityScore: number;
  reason:
    | "new"
    | "weak"
    | "review_due"
    | "developing"
    | "maintenance";
};

export type WeeklyAssessmentPlan = {
  totalQuestions: number;
  skills: WeeklySkillPriority[];
};

export type WeeklyQuestionResult = {
  skillId: string;
  isCorrect: boolean;
};

export type WeeklyAssessmentResult = {
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  strongestSkillId: string | null;
  weakestSkillId: string | null;
};

export type MasteryUpdate = {
  skillId: string;

  masteryScore: number;
  totalAttempts: number;
  correctAttempts: number;
  consecutiveCorrect: number;

  lastResult: boolean;
  lastPracticedAt: string;
  nextReviewAt: string;
  updatedAt: string;
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

function normalizeMasteryScore(
  value: number
) {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.round(
    clamp(value, 0, 100)
  );
}

function normalizeCounter(
  value: number
) {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.max(
    0,
    Math.floor(value)
  );
}

function parseDate(
  value: Date | string | null
): Date | null {
  if (!value) {
    return null;
  }

  const date =
    value instanceof Date
      ? value
      : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

function isReviewDue(
  nextReviewAt: Date | string | null,
  now: Date
) {
  const reviewDate =
    parseDate(nextReviewAt);

  if (!reviewDate) {
    return false;
  }

  return (
    reviewDate.getTime() <=
    now.getTime()
  );
}

function addDays(
  date: Date,
  days: number
) {
  const result =
    new Date(date.getTime());

  result.setUTCDate(
    result.getUTCDate() + days
  );

  return result;
}

function getPriority(
  mastery: WeeklyMasteryInput,
  now: Date
): WeeklySkillPriority {
  const masteryScore =
    normalizeMasteryScore(
      mastery.masteryScore
    );

  const totalAttempts =
    normalizeCounter(
      mastery.totalAttempts
    );

  const correctAttempts =
    Math.min(
      totalAttempts,
      normalizeCounter(
        mastery.correctAttempts
      )
    );

  let priorityScore =
    100 - masteryScore;

  let reason:
    WeeklySkillPriority["reason"];

  if (totalAttempts === 0) {
    priorityScore += 40;
    reason = "new";
  } else if (masteryScore < 40) {
    priorityScore += 45;
    reason = "weak";
  } else if (
    isReviewDue(
      mastery.nextReviewAt,
      now
    )
  ) {
    priorityScore += 35;
    reason = "review_due";
  } else if (masteryScore < 75) {
    priorityScore += 20;
    reason = "developing";
  } else {
    reason = "maintenance";
  }

  if (
    totalAttempts > 0 &&
    totalAttempts < 3
  ) {
    priorityScore += 10;
  }

  if (
    totalAttempts > 0 &&
    correctAttempts === 0
  ) {
    priorityScore += 15;
  }

  return {
    skillId: mastery.skillId,
    masteryScore,
    priorityScore,
    reason,
  };
}

/*
 * Planificatorul vechi rămâne exportat
 * pentru compatibilitate cu orice cod
 * existent care îl poate importa.
 *
 * Motorul adaptiv nou folosește
 * data/evaluari/adaptive-generator.ts.
 */
export function buildWeeklyAssessmentPlan(
  masteryRows: WeeklyMasteryInput[],
  maxQuestions = 5,
  now = new Date()
): WeeklyAssessmentPlan {
  const safeMaxQuestions = clamp(
    Math.floor(maxQuestions),
    1,
    10
  );

  if (masteryRows.length === 0) {
    return {
      totalQuestions: 0,
      skills: [],
    };
  }

  const priorities =
    masteryRows
      .map((mastery) =>
        getPriority(
          mastery,
          now
        )
      )
      .sort((a, b) => {
        if (
          b.priorityScore !==
          a.priorityScore
        ) {
          return (
            b.priorityScore -
            a.priorityScore
          );
        }

        if (
          a.masteryScore !==
          b.masteryScore
        ) {
          return (
            a.masteryScore -
            b.masteryScore
          );
        }

        return a.skillId.localeCompare(
          b.skillId
        );
      });

  const selectedSkills =
    priorities.slice(
      0,
      safeMaxQuestions
    );

  return {
    totalQuestions:
      selectedSkills.length,

    skills: selectedSkills,
  };
}

/*
 * Calculează rezultatul evaluării curente.
 *
 * Strongest / weakest descriu strict
 * performanța din această evaluare.
 */
export function calculateWeeklyResult(
  results: WeeklyQuestionResult[]
): WeeklyAssessmentResult {
  if (results.length === 0) {
    return {
      totalQuestions: 0,
      correctAnswers: 0,
      score: 0,
      strongestSkillId: null,
      weakestSkillId: null,
    };
  }

  const correctAnswers =
    results.filter(
      (result) =>
        result.isCorrect
    ).length;

  const score = Math.round(
    (correctAnswers /
      results.length) *
      100
  );

  const skillStats = new Map<
    string,
    {
      total: number;
      correct: number;
    }
  >();

  for (const result of results) {
    const current =
      skillStats.get(
        result.skillId
      ) ?? {
        total: 0,
        correct: 0,
      };

    current.total += 1;

    if (result.isCorrect) {
      current.correct += 1;
    }

    skillStats.set(
      result.skillId,
      current
    );
  }

  const rankedSkills =
    Array.from(
      skillStats.entries()
    ).map(
      ([skillId, stats]) => ({
        skillId,

        percentage:
          stats.total > 0
            ? stats.correct /
              stats.total
            : 0,

        total: stats.total,
      })
    );

  rankedSkills.sort((a, b) => {
    if (
      b.percentage !==
      a.percentage
    ) {
      return (
        b.percentage -
        a.percentage
      );
    }

    if (b.total !== a.total) {
      return (
        b.total -
        a.total
      );
    }

    return a.skillId.localeCompare(
      b.skillId
    );
  });

  return {
    totalQuestions:
      results.length,

    correctAnswers,

    score,

    strongestSkillId:
      rankedSkills[0]
        ?.skillId ?? null,

    weakestSkillId:
      rankedSkills[
        rankedSkills.length - 1
      ]?.skillId ?? null,
  };
}

function getReviewIntervalDays(
  masteryScore: number
) {
  if (masteryScore < 40) {
    return 1;
  }

  if (masteryScore < 60) {
    return 3;
  }

  if (masteryScore < 75) {
    return 7;
  }

  if (masteryScore < 90) {
    return 14;
  }

  return 30;
}

function calculateQuestionDelta(
  currentMasteryScore: number,
  isCorrect: boolean,
  consecutiveCorrect: number
) {
  if (isCorrect) {
    /*
     * La scor mic permitem recuperare
     * ceva mai rapidă.
     *
     * La scor mare progresul devine
     * intenționat mai lent.
     */
    let delta: number;

    if (currentMasteryScore < 40) {
      delta = 12;
    } else if (
      currentMasteryScore < 75
    ) {
      delta = 9;
    } else if (
      currentMasteryScore < 90
    ) {
      delta = 6;
    } else {
      delta = 3;
    }

    /*
     * Seria de răspunsuri corecte
     * oferă un bonus mic, controlat.
     */
    if (consecutiveCorrect >= 2) {
      delta += 2;
    }

    if (consecutiveCorrect >= 4) {
      delta += 1;
    }

    return delta;
  }

  /*
   * O greșeală trebuie să conteze,
   * dar nu ștergem brutal istoricul.
   */
  if (currentMasteryScore >= 90) {
    return -12;
  }

  if (currentMasteryScore >= 75) {
    return -11;
  }

  if (currentMasteryScore >= 40) {
    return -10;
  }

  return -8;
}

/*
 * Calculează noul Mastery pentru
 * o singură lecție/competență.
 *
 * Funcția este pură:
 * nu comunică deloc cu Supabase.
 */
export function calculateMasteryUpdate(
  current:
    | WeeklyMasteryInput
    | null,
  skillId: string,
  results: boolean[],
  now = new Date()
): MasteryUpdate {
  if (!skillId) {
    throw new Error(
      "Lipsește skillId pentru actualizarea Mastery."
    );
  }

  if (results.length === 0) {
    throw new Error(
      "Nu există rezultate pentru actualizarea Mastery."
    );
  }

  let masteryScore =
    normalizeMasteryScore(
      current?.masteryScore ?? 0
    );

  let totalAttempts =
    normalizeCounter(
      current?.totalAttempts ?? 0
    );

  let correctAttempts =
    Math.min(
      totalAttempts,
      normalizeCounter(
        current?.correctAttempts ??
          0
      )
    );

  let consecutiveCorrect =
    normalizeCounter(
      current?.consecutiveCorrect ??
        0
    );

  for (const isCorrect of results) {
    totalAttempts += 1;

    if (isCorrect) {
      correctAttempts += 1;
      consecutiveCorrect += 1;
    } else {
      consecutiveCorrect = 0;
    }

    const delta =
      calculateQuestionDelta(
        masteryScore,
        isCorrect,
        consecutiveCorrect
      );

    masteryScore =
      normalizeMasteryScore(
        masteryScore + delta
      );
  }

  const lastResult =
    results[
      results.length - 1
    ];

  /*
   * Dacă ultimul răspuns este greșit,
   * vrem o revenire rapidă indiferent
   * de scorul istoric.
   */
  const reviewDays =
    lastResult
      ? getReviewIntervalDays(
          masteryScore
        )
      : 1;

  const timestamp =
    now.toISOString();

  return {
    skillId,

    masteryScore,

    totalAttempts,

    correctAttempts,

    consecutiveCorrect,

    lastResult,

    lastPracticedAt:
      timestamp,

    nextReviewAt:
      addDays(
        now,
        reviewDays
      ).toISOString(),

    updatedAt:
      timestamp,
  };
}

/*
 * Calculează Mastery pentru toate
 * lecțiile verificate în evaluare.
 *
 * Rezultatele sunt grupate pe skillId,
 * iar fiecare skill este actualizat
 * o singură dată.
 */
export function calculateMasteryUpdates(
  currentMastery:
    WeeklyMasteryInput[],
  results:
    WeeklyQuestionResult[],
  now = new Date()
): MasteryUpdate[] {
  if (results.length === 0) {
    return [];
  }

  const currentMap =
    new Map<
      string,
      WeeklyMasteryInput
    >();

  for (
    const mastery of currentMastery
  ) {
    currentMap.set(
      mastery.skillId,
      mastery
    );
  }

  const groupedResults =
    new Map<
      string,
      boolean[]
    >();

  for (const result of results) {
    const current =
      groupedResults.get(
        result.skillId
      ) ?? [];

    current.push(
      result.isCorrect
    );

    groupedResults.set(
      result.skillId,
      current
    );
  }

  const updates:
    MasteryUpdate[] = [];

  for (
    const [
      skillId,
      skillResults,
    ] of groupedResults.entries()
  ) {
    updates.push(
      calculateMasteryUpdate(
        currentMap.get(
          skillId
        ) ?? null,
        skillId,
        skillResults,
        now
      )
    );
  }

  return updates;
}

export function getWeeklyPerformanceLevel(
  score: number
) {
  const safeScore = clamp(
    score,
    0,
    100
  );

  if (safeScore >= 90) {
    return "excellent";
  }

  if (safeScore >= 75) {
    return "strong";
  }

  if (safeScore >= 50) {
    return "developing";
  }

  return "needs_review";
}