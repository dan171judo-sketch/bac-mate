export type DailyPlanAction =
  | "continue"
  | "review"
  | "retest"
  | "consolidate";

export type DailyPlanPriority =
  | "critical"
  | "high"
  | "normal"
  | "maintenance";

export type MasteryInput = {
  skillId: string;
  masteryScore: number;
  totalAttempts: number;
  correctAttempts: number;
  consecutiveCorrect: number;
  nextReviewAt: string | Date | null;
};

export type MistakeInput = {
  skillId: string;
  lessonId?: string | null;
  exerciseId?: string | null;
  resolved?: boolean;
  createdAt?: string | Date | null;
  updatedAt?: string | Date | null;
};

export type WeeklyAssessmentInput = {
  score: number;
  strongestSkillId?: string | null;
  weakestSkillId?: string | null;
  completedAt?: string | Date | null;
};

export type ProgressInput = {
  lessonId: string;
  completed: boolean;
  xp?: number;
};

export type DailyPlanItem = {
  skillId: string;
  action: DailyPlanAction;
  priority: DailyPlanPriority;
  priorityScore: number;

  masteryScore: number;
  totalAttempts: number;
  unresolvedMistakes: number;

  reviewDue: boolean;
  weeklyWeakness: boolean;

  reason: string;
};

export type DailyPlan = {
  generatedAt: Date;

  primaryAction: DailyPlanItem | null;
  secondaryActions: DailyPlanItem[];

  completedLessons: number;
  totalTrackedLessons: number;

  averageMastery: number;
  unresolvedMistakes: number;

  message: string;
};

type SkillCandidate = {
  skillId: string;

  masteryScore: number;
  totalAttempts: number;
  correctAttempts: number;
  consecutiveCorrect: number;

  reviewDue: boolean;
  unresolvedMistakes: number;
  weeklyWeakness: boolean;

  priorityScore: number;
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

function safeNumber(
  value: number | null | undefined
) {
  if (
    typeof value !== "number" ||
    Number.isNaN(value)
  ) {
    return 0;
  }

  return value;
}

function normaliseSkillId(
  value: string | null | undefined
) {
  return (value ?? "")
    .trim()
    .toLocaleLowerCase("ro-RO")
    .replaceAll("_", "-")
    .replace(/\s+/g, "-");
}

function parseDate(
  value: string | Date | null | undefined
) {
  if (!value) {
    return null;
  }

  const date =
    value instanceof Date
      ? value
      : new Date(value);

  if (
    Number.isNaN(date.getTime())
  ) {
    return null;
  }

  return date;
}

function isReviewDue(
  value: string | Date | null,
  now: Date
) {
  const date = parseDate(value);

  if (!date) {
    return false;
  }

  return (
    date.getTime() <= now.getTime()
  );
}

function countUnresolvedMistakes(
  skillId: string,
  mistakes: MistakeInput[]
) {
  const normalised =
    normaliseSkillId(skillId);

  return mistakes.filter(
    (mistake) =>
      normaliseSkillId(
        mistake.skillId
      ) === normalised &&
      mistake.resolved !== true
  ).length;
}

function isWeeklyWeakness(
  skillId: string,
  weeklyAssessment:
    | WeeklyAssessmentInput
    | null
) {
  if (
    !weeklyAssessment?.weakestSkillId
  ) {
    return false;
  }

  return (
    normaliseSkillId(skillId) ===
    normaliseSkillId(
      weeklyAssessment.weakestSkillId
    )
  );
}

function calculatePriorityScore(
  candidate: Omit<
    SkillCandidate,
    "priorityScore"
  >
) {
  let score =
    100 - candidate.masteryScore;

  /*
    Greșelile nerezolvate sunt unul dintre
    cele mai puternice semnale.
  */
  score += Math.min(
    candidate.unresolvedMistakes * 18,
    54
  );

  /*
    Dacă a venit momentul pentru spaced
    repetition, competența urcă în plan.
  */
  if (candidate.reviewDue) {
    score += 30;
  }

  /*
    Rezultatul evaluării săptămânale
    influențează planul, dar nu îl controlează
    singur.
  */
  if (candidate.weeklyWeakness) {
    score += 35;
  }

  /*
    Competențele foarte slabe au nevoie
    de intervenție rapidă.
  */
  if (candidate.masteryScore < 25) {
    score += 30;
  } else if (
    candidate.masteryScore < 50
  ) {
    score += 20;
  } else if (
    candidate.masteryScore < 75
  ) {
    score += 10;
  }

  /*
    Dacă avem foarte puține încercări,
    avem încredere redusă în scor.
  */
  if (
    candidate.totalAttempts < 3
  ) {
    score += 8;
  }

  /*
    O serie bună de răspunsuri corecte
    reduce puțin urgența.
  */
  if (
    candidate.consecutiveCorrect >= 3
  ) {
    score -= 8;
  }

  return Math.round(
    clamp(score, 0, 250)
  );
}

function determineAction(
  candidate: SkillCandidate
): DailyPlanAction {
  if (
    candidate.weeklyWeakness ||
    candidate.unresolvedMistakes >= 2
  ) {
    return "retest";
  }

  if (
    candidate.reviewDue
  ) {
    return "review";
  }

  if (
    candidate.masteryScore < 50
  ) {
    return "review";
  }

  if (
    candidate.masteryScore < 90
  ) {
    return "consolidate";
  }

  return "continue";
}

function determinePriority(
  score: number
): DailyPlanPriority {
  if (score >= 145) {
    return "critical";
  }

  if (score >= 110) {
    return "high";
  }

  if (score >= 70) {
    return "normal";
  }

  return "maintenance";
}

function buildReason(
  candidate: SkillCandidate,
  action: DailyPlanAction
) {
  const reasons: string[] = [];

  if (
    candidate.weeklyWeakness
  ) {
    reasons.push(
      "a fost punctul cel mai slab la ultima evaluare săptămânală"
    );
  }

  if (
    candidate.unresolvedMistakes > 0
  ) {
    const count =
      candidate.unresolvedMistakes;

    reasons.push(
      count === 1
        ? "are o greșeală nerezolvată"
        : `are ${count} greșeli nerezolvate`
    );
  }

  if (candidate.reviewDue) {
    reasons.push(
      "a ajuns la termenul de recapitulare"
    );
  }

  if (
    candidate.masteryScore < 25
  ) {
    reasons.push(
      "nivelul de stăpânire este încă foarte scăzut"
    );
  } else if (
    candidate.masteryScore < 50
  ) {
    reasons.push(
      "nivelul de stăpânire trebuie consolidat"
    );
  } else if (
    candidate.masteryScore < 75
  ) {
    reasons.push(
      "competența este în dezvoltare"
    );
  }

  if (
    candidate.totalAttempts < 3
  ) {
    reasons.push(
      "avem încă puține răspunsuri pentru o estimare stabilă"
    );
  }

  if (
    reasons.length > 0
  ) {
    return (
      reasons
        .slice(0, 3)
        .join(", ") + "."
    );
  }

  if (action === "continue") {
    return "Competența este stabilă; poți continua materia.";
  }

  if (
    action === "consolidate"
  ) {
    return "Competența este bună, dar mai merită puțină consolidare.";
  }

  return "Este o zonă potrivită pentru recapitularea de azi.";
}

function candidateToPlanItem(
  candidate: SkillCandidate
): DailyPlanItem {
  const action =
    determineAction(candidate);

  return {
    skillId: candidate.skillId,

    action,

    priority:
      determinePriority(
        candidate.priorityScore
      ),

    priorityScore:
      candidate.priorityScore,

    masteryScore:
      candidate.masteryScore,

    totalAttempts:
      candidate.totalAttempts,

    unresolvedMistakes:
      candidate.unresolvedMistakes,

    reviewDue:
      candidate.reviewDue,

    weeklyWeakness:
      candidate.weeklyWeakness,

    reason: buildReason(
      candidate,
      action
    ),
  };
}

function calculateAverageMastery(
  mastery: MasteryInput[]
) {
  if (
    mastery.length === 0
  ) {
    return 0;
  }

  const total =
    mastery.reduce(
      (sum, item) =>
        sum +
        clamp(
          safeNumber(
            item.masteryScore
          ),
          0,
          100
        ),
      0
    );

  return Math.round(
    total / mastery.length
  );
}

function buildDailyMessage(
  primaryAction: DailyPlanItem | null,
  averageMastery: number,
  unresolvedMistakes: number
) {
  if (!primaryAction) {
    return "Nu am încă suficiente date pentru un plan adaptiv. Continuă cu următoarea lecție, iar MATE va învăța din răspunsurile tale.";
  }

  if (
    primaryAction.action === "retest"
  ) {
    return `Astăzi merită să verificăm din nou ${primaryAction.skillId}. Este cea mai importantă zonă pe baza progresului tău actual.`;
  }

  if (
    primaryAction.action === "review"
  ) {
    return `Începem cu o recapitulare la ${primaryAction.skillId}, apoi putem continua materia.`;
  }

  if (
    primaryAction.action ===
    "consolidate"
  ) {
    return `Ai o bază bună. Astăzi consolidăm ${primaryAction.skillId} și continuăm progresul.`;
  }

  if (
    unresolvedMistakes === 0 &&
    averageMastery >= 75
  ) {
    return "Progresul este stabil și nu ai greșeli restante prioritare. Putem continua cu materia nouă.";
  }

  return "Planul de azi este pregătit pe baza progresului tău.";
}

export function buildDailyPlan(
  mastery: MasteryInput[],
  mistakes: MistakeInput[],
  weeklyAssessment:
    | WeeklyAssessmentInput
    | null,
  progress: ProgressInput[] = [],
  now = new Date(),
  maxActions = 3
): DailyPlan {
  const safeMaxActions =
    clamp(
      Math.floor(maxActions),
      1,
      5
    );

  const candidates: SkillCandidate[] =
    mastery
      .filter(
        (item) =>
          normaliseSkillId(
            item.skillId
          ).length > 0
      )
      .map((item) => {
        const masteryScore =
          clamp(
            safeNumber(
              item.masteryScore
            ),
            0,
            100
          );

        const baseCandidate = {
          skillId: item.skillId,

          masteryScore,

          totalAttempts:
            Math.max(
              0,
              safeNumber(
                item.totalAttempts
              )
            ),

          correctAttempts:
            Math.max(
              0,
              safeNumber(
                item.correctAttempts
              )
            ),

          consecutiveCorrect:
            Math.max(
              0,
              safeNumber(
                item.consecutiveCorrect
              )
            ),

          reviewDue:
            isReviewDue(
              item.nextReviewAt,
              now
            ),

          unresolvedMistakes:
            countUnresolvedMistakes(
              item.skillId,
              mistakes
            ),

          weeklyWeakness:
            isWeeklyWeakness(
              item.skillId,
              weeklyAssessment
            ),
        };

        return {
          ...baseCandidate,

          priorityScore:
            calculatePriorityScore(
              baseCandidate
            ),
        };
      });

  /*
    Ordinea este complet deterministă:
    prioritate mai mare -> mastery mai mic ->
    mai multe greșeli -> skillId.
  */
  candidates.sort(
    (a, b) => {
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

      if (
        b.unresolvedMistakes !==
        a.unresolvedMistakes
      ) {
        return (
          b.unresolvedMistakes -
          a.unresolvedMistakes
        );
      }

      return a.skillId.localeCompare(
        b.skillId,
        "ro"
      );
    }
  );

  const actions =
    candidates
      .slice(
        0,
        safeMaxActions
      )
      .map(
        candidateToPlanItem
      );

  const primaryAction =
    actions[0] ?? null;

  const secondaryActions =
    actions.slice(1);

  const completedLessons =
    progress.filter(
      (item) =>
        item.completed === true
    ).length;

  const totalTrackedLessons =
    progress.length;

  const averageMastery =
    calculateAverageMastery(
      mastery
    );

  const unresolvedMistakes =
    mistakes.filter(
      (mistake) =>
        mistake.resolved !== true
    ).length;

  return {
    generatedAt:
      new Date(
        now.getTime()
      ),

    primaryAction,

    secondaryActions,

    completedLessons,
    totalTrackedLessons,

    averageMastery,
    unresolvedMistakes,

    message:
      buildDailyMessage(
        primaryAction,
        averageMastery,
        unresolvedMistakes
      ),
  };
}

export function getActionLabel(
  action: DailyPlanAction
) {
  switch (action) {
    case "retest":
      return "Retestare";

    case "review":
      return "Recapitulare";

    case "consolidate":
      return "Consolidare";

    case "continue":
      return "Continuă materia";
  }
}

export function getPriorityLabel(
  priority: DailyPlanPriority
) {
  switch (priority) {
    case "critical":
      return "Prioritate maximă";

    case "high":
      return "Prioritate ridicată";

    case "normal":
      return "Prioritate normală";

    case "maintenance":
      return "Menținere";
  }
}