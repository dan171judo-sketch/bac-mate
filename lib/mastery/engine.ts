export type MasteryState = {
  masteryScore: number;
  totalAttempts: number;
  correctAttempts: number;
  consecutiveCorrect: number;
};

export type AttemptResult = {
  isCorrect: boolean;
  usedHint?: boolean;
};

export type MasteryUpdate = MasteryState & {
  nextReviewAt: Date;
};

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function calculateReviewDate(
  masteryScore: number,
  isCorrect: boolean
) {
  const now = new Date();

  let daysUntilReview = 1;

  if (!isCorrect) {
    daysUntilReview = 1;
  } else if (masteryScore >= 90) {
    daysUntilReview = 14;
  } else if (masteryScore >= 75) {
    daysUntilReview = 7;
  } else if (masteryScore >= 50) {
    daysUntilReview = 3;
  } else {
    daysUntilReview = 1;
  }

  const reviewDate = new Date(now);

  reviewDate.setDate(
    reviewDate.getDate() + daysUntilReview
  );

  return reviewDate;
}

export function updateMastery(
  current: MasteryState,
  attempt: AttemptResult
): MasteryUpdate {
  const totalAttempts =
    current.totalAttempts + 1;

  const correctAttempts =
    current.correctAttempts +
    (attempt.isCorrect ? 1 : 0);

  const consecutiveCorrect =
    attempt.isCorrect
      ? current.consecutiveCorrect + 1
      : 0;

  let change = 0;

  if (attempt.isCorrect) {
    change = attempt.usedHint ? 5 : 10;

    if (
      consecutiveCorrect >= 3 &&
      !attempt.usedHint
    ) {
      change += 3;
    }
  } else {
    change = -8;
  }

  const masteryScore = clamp(
    current.masteryScore + change,
    0,
    100
  );

  return {
    masteryScore,
    totalAttempts,
    correctAttempts,
    consecutiveCorrect,
    nextReviewAt: calculateReviewDate(
      masteryScore,
      attempt.isCorrect
    ),
  };
}

export function getMasteryLevel(
  masteryScore: number
) {
  if (masteryScore >= 90) {
    return "mastered";
  }

  if (masteryScore >= 75) {
    return "strong";
  }

  if (masteryScore >= 50) {
    return "developing";
  }

  if (masteryScore >= 25) {
    return "weak";
  }

  return "new";
}

export function needsReview(
  nextReviewAt: Date | string | null
) {
  if (!nextReviewAt) {
    return false;
  }

  const reviewDate =
    typeof nextReviewAt === "string"
      ? new Date(nextReviewAt)
      : nextReviewAt;

  if (
    Number.isNaN(reviewDate.getTime())
  ) {
    return false;
  }

  return reviewDate.getTime() <= Date.now();
}

export function createEmptyMastery(): MasteryState {
  return {
    masteryScore: 0,
    totalAttempts: 0,
    correctAttempts: 0,
    consecutiveCorrect: 0,
  };
}