/* =========================================================
   BAC MATE — REVIEW / RETEST ENGINE V1
   ---------------------------------------------------------
   Rol:
   - decide ce competență trebuie repetată
   - decide tipul sesiunii
   - prioritizează greșelile active
   - stabilește dificultatea
   - stabilește numărul de întrebări
   - evaluează rezultatul unei sesiuni

   IMPORTANT:
   Acest motor NU generează matematică și NU decide dacă
   un răspuns matematic este corect.

   Corectitudinea vine din exercițiile verificate BAC MATE
   și din motoarele deterministe existente.
========================================================= */

/* =========================================================
   TIPURI
========================================================= */

export type ReviewSessionType =
  | "review"
  | "retest"
  | "consolidate";

export type ReviewDifficulty =
  | "easy"
  | "medium"
  | "hard";

export type ReviewPriority =
  | "critical"
  | "high"
  | "normal"
  | "maintenance";

export type ReviewReason =
  | "active_mistakes"
  | "weekly_weakness"
  | "review_due"
  | "low_mastery"
  | "consolidation"
  | "maintenance";

export type ReviewMasteryInput = {
  skillId: string;
  masteryScore: number;
  totalAttempts: number;
  correctAttempts: number;
  consecutiveCorrect: number;
  nextReviewAt: string | Date | null;
};

export type ReviewMistakeInput = {
  skillId: string;
  lessonId?: string | null;
  exerciseId?: string | null;
  mistakeType?: string | null;
  resolved?: boolean;
  firstSeenAt?: string | Date | null;
  lastSeenAt?: string | Date | null;
  timesMissed?: number;
};

export type ReviewWeeklyAssessmentInput = {
  score: number;
  strongestSkillId?: string | null;
  weakestSkillId?: string | null;
  completedAt?: string | Date | null;
};

export type ReviewCandidate = {
  skillId: string;

  sessionType: ReviewSessionType;
  difficulty: ReviewDifficulty;
  priority: ReviewPriority;
  reason: ReviewReason;

  priorityScore: number;
  masteryScore: number;

  totalAttempts: number;
  correctAttempts: number;
  consecutiveCorrect: number;

  unresolvedMistakes: number;
  repeatedMistakes: number;

  reviewDue: boolean;
  weeklyWeakness: boolean;

  recommendedQuestions: number;

  explanation: string;
};

export type ReviewPlan = {
  generatedAt: Date;

  primary: ReviewCandidate | null;
  secondary: ReviewCandidate[];

  totalSkillsTracked: number;
  totalUnresolvedMistakes: number;
  dueForReview: number;

  message: string;
};

export type ReviewQuestionResult = {
  skillId: string;
  exerciseId?: string | null;

  isCorrect: boolean;
  usedHint?: boolean;
};

export type ReviewSessionResult = {
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  hintedAnswers: number;

  score: number;

  passed: boolean;
  masterySignal:
    | "strong_improvement"
    | "improvement"
    | "needs_more_review";

  shouldResolveMistakes: boolean;
  shouldScheduleSoon: boolean;

  message: string;
};

/* =========================================================
   HELPERS
========================================================= */

function clamp(
  value: number,
  min: number,
  max: number
) {
  return Math.min(
    max,
    Math.max(min, value)
  );
}

function safeNumber(
  value: unknown,
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

function normalizeSkillId(
  value: string | null | undefined
) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
}

function toDate(
  value: string | Date | null | undefined
): Date | null {
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
  nextReviewAt: string | Date | null,
  now: Date
) {
  const reviewDate =
    toDate(nextReviewAt);

  if (!reviewDate) {
    return false;
  }

  return (
    reviewDate.getTime() <= now.getTime()
  );
}

function sameSkill(
  a: string | null | undefined,
  b: string | null | undefined
) {
  const first = normalizeSkillId(a);
  const second = normalizeSkillId(b);

  return (
    first.length > 0 &&
    second.length > 0 &&
    first === second
  );
}

/* =========================================================
   GREȘELI
========================================================= */

function getUnresolvedMistakesForSkill(
  skillId: string,
  mistakes: ReviewMistakeInput[]
) {
  return mistakes.filter(
    (mistake) =>
      sameSkill(
        mistake.skillId,
        skillId
      ) &&
      mistake.resolved !== true
  );
}

function getRepeatedMistakeCount(
  skillId: string,
  mistakes: ReviewMistakeInput[]
) {
  const unresolved =
    getUnresolvedMistakesForSkill(
      skillId,
      mistakes
    );

  return unresolved.filter(
    (mistake) =>
      safeNumber(
        mistake.timesMissed,
        1
      ) >= 2
  ).length;
}

/* =========================================================
   WEEKLY ASSESSMENT
========================================================= */

function isWeeklyWeakness(
  skillId: string,
  weekly:
    | ReviewWeeklyAssessmentInput
    | null
    | undefined
) {
  if (!weekly?.weakestSkillId) {
    return false;
  }

  return sameSkill(
    skillId,
    weekly.weakestSkillId
  );
}

/* =========================================================
   TIP SESIUNE
========================================================= */

function determineSessionType({
  unresolvedMistakes,
  repeatedMistakes,
  weeklyWeakness,
  reviewDue,
  masteryScore,
}: {
  unresolvedMistakes: number;
  repeatedMistakes: number;
  weeklyWeakness: boolean;
  reviewDue: boolean;
  masteryScore: number;
}): ReviewSessionType {
  /*
   * RETEST:
   * avem dovezi clare că elevul trebuie verificat din nou.
   */
  if (
    repeatedMistakes > 0 ||
    unresolvedMistakes >= 2 ||
    weeklyWeakness
  ) {
    return "retest";
  }

  /*
   * REVIEW:
   * există o greșeală, recapitularea este scadentă
   * sau mastery-ul este încă slab.
   */
  if (
    unresolvedMistakes > 0 ||
    reviewDue ||
    masteryScore < 50
  ) {
    return "review";
  }

  /*
   * CONSOLIDATE:
   * elevul știe parțial competența, dar încă nu este
   * suficient de stabilă.
   */
  return "consolidate";
}

/* =========================================================
   MOTIV PRINCIPAL
========================================================= */

function determineReason({
  unresolvedMistakes,
  weeklyWeakness,
  reviewDue,
  masteryScore,
}: {
  unresolvedMistakes: number;
  weeklyWeakness: boolean;
  reviewDue: boolean;
  masteryScore: number;
}): ReviewReason {
  if (unresolvedMistakes > 0) {
    return "active_mistakes";
  }

  if (weeklyWeakness) {
    return "weekly_weakness";
  }

  if (reviewDue) {
    return "review_due";
  }

  if (masteryScore < 50) {
    return "low_mastery";
  }

  if (masteryScore < 90) {
    return "consolidation";
  }

  return "maintenance";
}

/* =========================================================
   DIFICULTATE
========================================================= */

function determineDifficulty({
  masteryScore,
  unresolvedMistakes,
  sessionType,
}: {
  masteryScore: number;
  unresolvedMistakes: number;
  sessionType: ReviewSessionType;
}): ReviewDifficulty {
  /*
   * La mastery foarte mic nu începem cu exerciții grele.
   * Mai întâi reconstruim baza.
   */
  if (
    masteryScore < 35 ||
    unresolvedMistakes >= 3
  ) {
    return "easy";
  }

  /*
   * Pentru consolidare cu mastery bun putem urca
   * dificultatea.
   */
  if (
    sessionType === "consolidate" &&
    masteryScore >= 75
  ) {
    return "hard";
  }

  return "medium";
}

/* =========================================================
   NUMĂR ÎNTREBĂRI
========================================================= */

function determineQuestionCount({
  sessionType,
  unresolvedMistakes,
  masteryScore,
}: {
  sessionType: ReviewSessionType;
  unresolvedMistakes: number;
  masteryScore: number;
}) {
  let questions = 4;

  if (sessionType === "retest") {
    questions = 5;
  }

  if (unresolvedMistakes >= 3) {
    questions += 1;
  }

  if (masteryScore < 25) {
    questions += 1;
  }

  /*
   * Sesiunile zilnice trebuie să rămână scurte.
   */
  return clamp(
    questions,
    3,
    7
  );
}

/* =========================================================
   PRIORITY SCORE
========================================================= */

function calculatePriorityScore({
  masteryScore,
  totalAttempts,
  consecutiveCorrect,
  unresolvedMistakes,
  repeatedMistakes,
  reviewDue,
  weeklyWeakness,
}: {
  masteryScore: number;
  totalAttempts: number;
  consecutiveCorrect: number;
  unresolvedMistakes: number;
  repeatedMistakes: number;
  reviewDue: boolean;
  weeklyWeakness: boolean;
}) {
  /*
   * Cu cât mastery-ul este mai mic,
   * cu atât prioritatea de review este mai mare.
   */
  let score =
    100 - masteryScore;

  /*
   * Greșelile active sunt semnal puternic.
   */
  score += Math.min(
    unresolvedMistakes * 20,
    60
  );

  /*
   * Greșelile repetate primesc bonus separat.
   */
  score += Math.min(
    repeatedMistakes * 15,
    30
  );

  if (reviewDue) {
    score += 30;
  }

  if (weeklyWeakness) {
    score += 35;
  }

  if (masteryScore < 25) {
    score += 30;
  } else if (masteryScore < 50) {
    score += 20;
  } else if (masteryScore < 75) {
    score += 10;
  }

  /*
   * Puține date = avem nevoie de verificare,
   * dar bonusul rămâne moderat.
   */
  if (totalAttempts < 3) {
    score += 8;
  }

  /*
   * O serie stabilă de răspunsuri corecte reduce
   * urgența review-ului.
   */
  if (consecutiveCorrect >= 3) {
    score -= 10;
  }

  return clamp(
    Math.round(score),
    0,
    300
  );
}

/* =========================================================
   PRIORITATE
========================================================= */

function determinePriority(
  score: number
): ReviewPriority {
  if (score >= 150) {
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

/* =========================================================
   EXPLICAȚIE
========================================================= */

function buildExplanation({
  masteryScore,
  unresolvedMistakes,
  repeatedMistakes,
  reviewDue,
  weeklyWeakness,
  totalAttempts,
}: {
  masteryScore: number;
  unresolvedMistakes: number;
  repeatedMistakes: number;
  reviewDue: boolean;
  weeklyWeakness: boolean;
  totalAttempts: number;
}) {
  const reasons: string[] = [];

  if (unresolvedMistakes === 1) {
    reasons.push(
      "există o greșeală activă"
    );
  }

  if (unresolvedMistakes > 1) {
    reasons.push(
      `există ${unresolvedMistakes} greșeli active`
    );
  }

  if (repeatedMistakes === 1) {
    reasons.push(
      "una dintre greșeli s-a repetat"
    );
  }

  if (repeatedMistakes > 1) {
    reasons.push(
      `${repeatedMistakes} greșeli s-au repetat`
    );
  }

  if (weeklyWeakness) {
    reasons.push(
      "competența a fost cea mai slabă zonă la evaluarea săptămânală"
    );
  }

  if (reviewDue) {
    reasons.push(
      "recapitularea este scadentă"
    );
  }

  if (masteryScore < 25) {
    reasons.push(
      "nivelul de stăpânire este încă foarte scăzut"
    );
  } else if (masteryScore < 50) {
    reasons.push(
      "nivelul de stăpânire este încă scăzut"
    );
  } else if (masteryScore < 75) {
    reasons.push(
      "competența are nevoie de consolidare"
    );
  }

  if (totalAttempts < 3) {
    reasons.push(
      "avem încă puține răspunsuri pentru o estimare stabilă"
    );
  }

  if (reasons.length === 0) {
    return "Competența este relativ stabilă, dar o verificare scurtă ajută la menținerea ei.";
  }

  return `${reasons.join(
    ", "
  )}.`;
}

/* =========================================================
   CONSTRUIRE CANDIDAT
========================================================= */

function buildCandidate(
  mastery: ReviewMasteryInput,
  mistakes: ReviewMistakeInput[],
  weekly:
    | ReviewWeeklyAssessmentInput
    | null
    | undefined,
  now: Date
): ReviewCandidate | null {
  const skillId =
    normalizeSkillId(
      mastery.skillId
    );

  if (!skillId) {
    return null;
  }

  const masteryScore =
    clamp(
      safeNumber(
        mastery.masteryScore
      ),
      0,
      100
    );

  const totalAttempts =
    Math.max(
      0,
      safeNumber(
        mastery.totalAttempts
      )
    );

  const correctAttempts =
    Math.max(
      0,
      safeNumber(
        mastery.correctAttempts
      )
    );

  const consecutiveCorrect =
    Math.max(
      0,
      safeNumber(
        mastery.consecutiveCorrect
      )
    );

  const unresolvedMistakes =
    getUnresolvedMistakesForSkill(
      skillId,
      mistakes
    ).length;

  const repeatedMistakes =
    getRepeatedMistakeCount(
      skillId,
      mistakes
    );

  const reviewDue =
    isReviewDue(
      mastery.nextReviewAt,
      now
    );

  const weeklyWeakness =
    isWeeklyWeakness(
      skillId,
      weekly
    );

  const sessionType =
    determineSessionType({
      unresolvedMistakes,
      repeatedMistakes,
      weeklyWeakness,
      reviewDue,
      masteryScore,
    });

  const reason =
    determineReason({
      unresolvedMistakes,
      weeklyWeakness,
      reviewDue,
      masteryScore,
    });

  const difficulty =
    determineDifficulty({
      masteryScore,
      unresolvedMistakes,
      sessionType,
    });

  const priorityScore =
    calculatePriorityScore({
      masteryScore,
      totalAttempts,
      consecutiveCorrect,
      unresolvedMistakes,
      repeatedMistakes,
      reviewDue,
      weeklyWeakness,
    });

  const priority =
    determinePriority(
      priorityScore
    );

  const recommendedQuestions =
    determineQuestionCount({
      sessionType,
      unresolvedMistakes,
      masteryScore,
    });

  const explanation =
    buildExplanation({
      masteryScore,
      unresolvedMistakes,
      repeatedMistakes,
      reviewDue,
      weeklyWeakness,
      totalAttempts,
    });

  return {
    skillId,

    sessionType,
    difficulty,
    priority,
    reason,

    priorityScore,
    masteryScore,

    totalAttempts,
    correctAttempts,
    consecutiveCorrect,

    unresolvedMistakes,
    repeatedMistakes,

    reviewDue,
    weeklyWeakness,

    recommendedQuestions,

    explanation,
  };
}

/* =========================================================
   SORTARE DETERMINISTĂ
========================================================= */

function sortCandidates(
  candidates: ReviewCandidate[]
) {
  return [...candidates].sort(
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
        b.skillId
      );
    }
  );
}

/* =========================================================
   MESAJ PLAN
========================================================= */

function buildPlanMessage(
  primary: ReviewCandidate | null
) {
  if (!primary) {
    return "Nu avem încă suficiente date pentru a construi o sesiune de recapitulare.";
  }

  if (
    primary.sessionType ===
    "retest"
  ) {
    return `Începem cu o retestare scurtă pentru „${primary.skillId}”, deoarece aici avem cele mai puternice semnale că trebuie verificată din nou competența.`;
  }

  if (
    primary.sessionType ===
    "review"
  ) {
    return `Începem cu o recapitulare pentru „${primary.skillId}”, apoi verificăm dacă informația s-a stabilizat.`;
  }

  return `Începem cu o sesiune scurtă de consolidare pentru „${primary.skillId}”.`;
}

/* =========================================================
   API PRINCIPAL — BUILD REVIEW PLAN
========================================================= */

export function buildReviewPlan(
  masteryRows: ReviewMasteryInput[],
  mistakes: ReviewMistakeInput[] = [],
  weekly:
    | ReviewWeeklyAssessmentInput
    | null = null,
  options?: {
    now?: Date;
    maxSkills?: number;
  }
): ReviewPlan {
  const now =
    options?.now ?? new Date();

  const maxSkills =
    clamp(
      Math.round(
        options?.maxSkills ?? 3
      ),
      1,
      5
    );

  const candidates =
    masteryRows
      .map((mastery) =>
        buildCandidate(
          mastery,
          mistakes,
          weekly,
          now
        )
      )
      .filter(
        (
          candidate
        ): candidate is ReviewCandidate =>
          candidate !== null
      );

  const sorted =
    sortCandidates(candidates);

  const selected =
    sorted.slice(0, maxSkills);

  const primary =
    selected[0] ?? null;

  const secondary =
    selected.slice(1);

  const totalUnresolvedMistakes =
    mistakes.filter(
      (mistake) =>
        mistake.resolved !== true
    ).length;

  const dueForReview =
    candidates.filter(
      (candidate) =>
        candidate.reviewDue
    ).length;

  return {
    generatedAt: now,

    primary,
    secondary,

    totalSkillsTracked:
      candidates.length,

    totalUnresolvedMistakes,
    dueForReview,

    message:
      buildPlanMessage(primary),
  };
}

/* =========================================================
   REZULTAT SESIUNE
========================================================= */

export function calculateReviewSessionResult(
  results: ReviewQuestionResult[]
): ReviewSessionResult {
  const totalQuestions =
    results.length;

  if (totalQuestions === 0) {
    return {
      totalQuestions: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      hintedAnswers: 0,

      score: 0,

      passed: false,
      masterySignal:
        "needs_more_review",

      shouldResolveMistakes: false,
      shouldScheduleSoon: true,

      message:
        "Sesiunea nu conține încă rezultate suficiente pentru evaluare.",
    };
  }

  const correctAnswers =
    results.filter(
      (result) =>
        result.isCorrect
    ).length;

  const wrongAnswers =
    totalQuestions -
    correctAnswers;

  const hintedAnswers =
    results.filter(
      (result) =>
        result.usedHint === true
    ).length;

  const score =
    Math.round(
      (correctAnswers /
        totalQuestions) *
        100
    );

  /*
   * Pentru a considera review-ul stabil:
   * - minimum 80% corect
   * - fără mai mult de o eroare
   *
   * Hint-urile nu anulează rezultatul, dar sunt folosite
   * pentru semnalul de independență/mastery.
   */
  const passed =
    score >= 80 &&
    wrongAnswers <= 1;

  let masterySignal:
    ReviewSessionResult["masterySignal"];

  if (
    score >= 90 &&
    hintedAnswers === 0
  ) {
    masterySignal =
      "strong_improvement";
  } else if (passed) {
    masterySignal =
      "improvement";
  } else {
    masterySignal =
      "needs_more_review";
  }

  /*
   * O greșeală veche poate fi considerată rezolvată
   * numai după o sesiune suficient de bună.
   */
  const shouldResolveMistakes =
    passed &&
    score >= 80;

  const shouldScheduleSoon =
    !passed ||
    score < 80;

  let message: string;

  if (
    masterySignal ===
    "strong_improvement"
  ) {
    message =
      "Foarte bine. Ai rezolvat sesiunea aproape fără sprijin, iar competența arată un progres puternic.";
  } else if (
    masterySignal ===
    "improvement"
  ) {
    message =
      "Sesiunea este trecută. Competența arată progres, dar o vom verifica din nou la momentul potrivit.";
  } else {
    message =
      "Competența mai are nevoie de lucru. O păstrăm în planul de recapitulare și revenim cu exerciții verificate.";
  }

  return {
    totalQuestions,
    correctAnswers,
    wrongAnswers,
    hintedAnswers,

    score,

    passed,
    masterySignal,

    shouldResolveMistakes,
    shouldScheduleSoon,

    message,
  };
}

/* =========================================================
   LABELS PENTRU UI
========================================================= */

export function getReviewSessionLabel(
  type: ReviewSessionType
) {
  switch (type) {
    case "retest":
      return "Retestare";

    case "review":
      return "Recapitulare";

    case "consolidate":
      return "Consolidare";

    default:
      return "Recapitulare";
  }
}

export function getReviewDifficultyLabel(
  difficulty: ReviewDifficulty
) {
  switch (difficulty) {
    case "easy":
      return "Bază";

    case "medium":
      return "Mediu";

    case "hard":
      return "Avansat";

    default:
      return "Mediu";
  }
}

export function getReviewPriorityLabel(
  priority: ReviewPriority
) {
  switch (priority) {
    case "critical":
      return "Prioritate critică";

    case "high":
      return "Prioritate mare";

    case "normal":
      return "Prioritate normală";

    case "maintenance":
      return "Menținere";

    default:
      return "Prioritate normală";
  }
}