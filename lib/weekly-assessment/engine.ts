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

function isReviewDue(
  nextReviewAt: Date | string | null,
  now: Date
) {
  if (!nextReviewAt) {
    return false;
  }

  const reviewDate =
    nextReviewAt instanceof Date
      ? nextReviewAt
      : new Date(nextReviewAt);

  if (
    Number.isNaN(reviewDate.getTime())
  ) {
    return false;
  }

  return (
    reviewDate.getTime() <=
    now.getTime()
  );
}

function getPriority(
  mastery: WeeklyMasteryInput,
  now: Date
): WeeklySkillPriority {
  const masteryScore = clamp(
    mastery.masteryScore,
    0,
    100
  );

  /*
   * Cu cât priorityScore este mai mare,
   * cu atât competența trebuie verificată
   * mai repede.
   */

  let priorityScore =
    100 - masteryScore;

  let reason:
    WeeklySkillPriority["reason"];

  /*
   * Competență încă netestată.
   */
  if (mastery.totalAttempts === 0) {
    priorityScore += 35;
    reason = "new";
  }

  /*
   * Competență foarte slabă.
   */
  else if (masteryScore < 25) {
    priorityScore += 45;
    reason = "weak";
  }

  /*
   * A venit momentul pentru
   * spaced repetition.
   */
  else if (
    isReviewDue(
      mastery.nextReviewAt,
      now
    )
  ) {
    priorityScore += 30;
    reason = "review_due";
  }

  /*
   * Competență aflată încă
   * în dezvoltare.
   */
  else if (masteryScore < 75) {
    priorityScore += 15;
    reason = "developing";
  }

  /*
   * Competență bună.
   * O păstrăm în sistem pentru
   * verificări periodice.
   */
  else {
    reason = "maintenance";
  }

  /*
   * Dacă elevul a avut foarte puține
   * încercări, avem mai puțină
   * încredere în scor.
   */
  if (
    mastery.totalAttempts > 0 &&
    mastery.totalAttempts < 3
  ) {
    priorityScore += 10;
  }

  return {
    skillId: mastery.skillId,
    masteryScore,
    priorityScore,
    reason,
  };
}

/*
 * Construiește planul evaluării
 * săptămânale.
 *
 * V1 folosește maximum 5 competențe.
 * Fiecare competență selectată primește
 * inițial o întrebare.
 *
 * Mai târziu putem aloca mai multe
 * întrebări competențelor slabe.
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

  const priorities = masteryRows
    .map((mastery) =>
      getPriority(mastery, now)
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

      /*
       * La egalitate verificăm întâi
       * scorul Mastery mai mic.
       */
      if (
        a.masteryScore !==
        b.masteryScore
      ) {
        return (
          a.masteryScore -
          b.masteryScore
        );
      }

      /*
       * Sortare stabilă/deterministă.
       */
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
 * Calculează rezultatul final al
 * evaluării săptămânale.
 *
 * Strongest / weakest se bazează pe
 * performanța DIN ACEASTĂ evaluare,
 * nu direct pe scorul Mastery istoric.
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
      (result) => result.isCorrect
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
      skillStats.get(result.skillId) ??
      {
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

  const rankedSkills = Array.from(
    skillStats.entries()
  ).map(([skillId, stats]) => ({
    skillId,

    percentage:
      stats.total > 0
        ? stats.correct /
          stats.total
        : 0,

    total: stats.total,
  }));

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

    /*
     * Dacă procentul este egal,
     * avem mai multă încredere în
     * competența verificată de mai
     * multe ori.
     */
    if (b.total !== a.total) {
      return b.total - a.total;
    }

    return a.skillId.localeCompare(
      b.skillId
    );
  });

  const strongestSkillId =
    rankedSkills[0]?.skillId ??
    null;

  const weakestSkillId =
    rankedSkills[
      rankedSkills.length - 1
    ]?.skillId ?? null;

  return {
    totalQuestions: results.length,
    correctAnswers,
    score,
    strongestSkillId,
    weakestSkillId,
  };
}

/*
 * Folosit de interfață și mascotă
 * pentru o clasificare simplă.
 */
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