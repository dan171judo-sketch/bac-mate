import { lectii } from "../lectii";

import {
  getQuestionsForLesson,
  isAssessmentReadyLesson,
} from "./question-bank";

import type {
  AdaptiveAssessmentInput,
  AdaptiveAssessmentResult,
  AdaptiveAttemptHistory,
  AdaptiveDifficulty,
  AdaptiveLessonPriority,
  AdaptiveMasterySnapshot,
  AdaptiveQuestion,
} from "./types";

const DEFAULT_MAX_QUESTIONS = 10;

const RECENT_QUESTION_WINDOW_DAYS = 14;

const VERY_RECENT_QUESTION_WINDOW_DAYS = 3;

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

function shuffle<T>(
  items: T[]
): T[] {
  const result = [...items];

  for (
    let index = result.length - 1;
    index > 0;
    index -= 1
  ) {
    const randomIndex = Math.floor(
      Math.random() * (index + 1)
    );

    [result[index], result[randomIndex]] = [
      result[randomIndex],
      result[index],
    ];
  }

  return result;
}

function parseDate(
  value: string | null | undefined
): Date | null {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

function differenceInDays(
  newerDate: Date,
  olderDate: Date
) {
  const milliseconds =
    newerDate.getTime() -
    olderDate.getTime();

  return milliseconds / 86_400_000;
}

function isReviewDue(
  mastery: AdaptiveMasterySnapshot,
  now: Date
) {
  const reviewDate = parseDate(
    mastery.nextReviewAt
  );

  if (!reviewDate) {
    return false;
  }

  return (
    reviewDate.getTime() <=
    now.getTime()
  );
}

function getMasteryForLesson(
  lessonId: string,
  masteryMap: Map<
    string,
    AdaptiveMasterySnapshot
  >
): AdaptiveMasterySnapshot {
  return (
    masteryMap.get(lessonId) ?? {
      skillId: lessonId,
      masteryScore: 0,
      totalAttempts: 0,
      correctAttempts: 0,
      consecutiveCorrect: 0,
      nextReviewAt: null,
    }
  );
}

function calculateLessonPriority(
  mastery: AdaptiveMasterySnapshot,
  now: Date
): AdaptiveLessonPriority {
  const masteryScore = clamp(
    mastery.masteryScore,
    0,
    100
  );

  let priorityScore =
    100 - masteryScore;

  let reason:
    AdaptiveLessonPriority["reason"];

  if (mastery.totalAttempts === 0) {
    priorityScore += 40;
    reason = "new";
  } else if (masteryScore < 40) {
    priorityScore += 45;
    reason = "weak";
  } else if (
    isReviewDue(mastery, now)
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
    mastery.totalAttempts > 0 &&
    mastery.totalAttempts < 3
  ) {
    priorityScore += 10;
  }

  if (
    mastery.totalAttempts > 0 &&
    mastery.correctAttempts === 0
  ) {
    priorityScore += 15;
  }

  return {
    lessonId: mastery.skillId,
    masteryScore,
    priorityScore,
    reason,
  };
}

function getTargetDifficulty(
  masteryScore: number
): AdaptiveDifficulty {
  if (masteryScore < 40) {
    return 1;
  }

  if (masteryScore < 75) {
    return 2;
  }

  return 3;
}

function getDifficultyDistance(
  questionDifficulty: AdaptiveDifficulty,
  targetDifficulty: AdaptiveDifficulty
) {
  return Math.abs(
    questionDifficulty -
      targetDifficulty
  );
}

function getLatestAttemptForQuestion(
  questionId: string,
  attempts: AdaptiveAttemptHistory[]
): AdaptiveAttemptHistory | null {
  let latest:
    | AdaptiveAttemptHistory
    | null = null;

  for (const attempt of attempts) {
    if (
      attempt.questionId !== questionId
    ) {
      continue;
    }

    if (!latest) {
      latest = attempt;
      continue;
    }

    const currentDate = parseDate(
      attempt.answeredAt
    );

    const latestDate = parseDate(
      latest.answeredAt
    );

    if (!currentDate) {
      continue;
    }

    if (
      !latestDate ||
      currentDate.getTime() >
        latestDate.getTime()
    ) {
      latest = attempt;
    }
  }

  return latest;
}

function getQuestionHistoryPenalty(
  question: AdaptiveQuestion,
  attempts: AdaptiveAttemptHistory[],
  now: Date
) {
  const latestAttempt =
    getLatestAttemptForQuestion(
      question.id,
      attempts
    );

  if (!latestAttempt) {
    return 0;
  }

  const answeredAt = parseDate(
    latestAttempt.answeredAt
  );

  if (!answeredAt) {
    return 0;
  }

  const ageInDays =
    differenceInDays(
      now,
      answeredAt
    );

  if (ageInDays < 0) {
    return 0;
  }

  if (
    ageInDays <
    VERY_RECENT_QUESTION_WINDOW_DAYS
  ) {
    return 1000;
  }

  if (
    ageInDays <
    RECENT_QUESTION_WINDOW_DAYS
  ) {
    return 250;
  }

  return 0;
}

function countQuestionAttempts(
  questionId: string,
  attempts: AdaptiveAttemptHistory[]
) {
  return attempts.filter(
    (attempt) =>
      attempt.questionId === questionId
  ).length;
}

function scoreQuestion(
  question: AdaptiveQuestion,
  masteryScore: number,
  attempts: AdaptiveAttemptHistory[],
  now: Date
) {
  const targetDifficulty =
    getTargetDifficulty(masteryScore);

  const difficultyPenalty =
    getDifficultyDistance(
      question.difficulty,
      targetDifficulty
    ) * 20;

  const historyPenalty =
    getQuestionHistoryPenalty(
      question,
      attempts,
      now
    );

  const lifetimeAttempts =
    countQuestionAttempts(
      question.id,
      attempts
    );

  const repetitionPenalty =
    lifetimeAttempts * 5;

  return (
    100 -
    difficultyPenalty -
    historyPenalty -
    repetitionPenalty
  );
}

function rankQuestionsForLesson(
  questions: AdaptiveQuestion[],
  masteryScore: number,
  attempts: AdaptiveAttemptHistory[],
  now: Date
) {
  const randomized =
    shuffle(questions);

  return randomized.sort(
    (questionA, questionB) => {
      const scoreA = scoreQuestion(
        questionA,
        masteryScore,
        attempts,
        now
      );

      const scoreB = scoreQuestion(
        questionB,
        masteryScore,
        attempts,
        now
      );

      return scoreB - scoreA;
    }
  );
}

function attachMasteryScore(
  question: AdaptiveQuestion,
  masteryScore: number
): AdaptiveQuestion {
  return {
    ...question,
    options: [...question.options],
    masteryScore,
  };
}

function selectQuestions(
  lessonPriorities: AdaptiveLessonPriority[],
  masteryMap: Map<
    string,
    AdaptiveMasterySnapshot
  >,
  attempts: AdaptiveAttemptHistory[],
  maxQuestions: number,
  now: Date
): AdaptiveQuestion[] {
  const lessonPools = new Map<
    string,
    AdaptiveQuestion[]
  >();

  for (
    const priority of lessonPriorities
  ) {
    const lesson = lectii.find(
      (item) =>
        item.id === priority.lessonId
    );

    if (!lesson) {
      continue;
    }

    const mastery =
      getMasteryForLesson(
        lesson.id,
        masteryMap
      );

    const questions =
      getQuestionsForLesson(lesson);

    const rankedQuestions =
      rankQuestionsForLesson(
        questions,
        mastery.masteryScore,
        attempts,
        now
      ).map((question) =>
        attachMasteryScore(
          question,
          mastery.masteryScore
        )
      );

    lessonPools.set(
      lesson.id,
      rankedQuestions
    );
  }

  const selected:
    AdaptiveQuestion[] = [];

  const selectedIds =
    new Set<string>();

  /*
   * PASUL 1
   *
   * Încercăm să verificăm cât mai multe
   * lecții diferite înainte să repetăm
   * aceeași lecție.
   */
  for (
    const priority of lessonPriorities
  ) {
    if (
      selected.length >= maxQuestions
    ) {
      break;
    }

    const pool =
      lessonPools.get(
        priority.lessonId
      ) ?? [];

    const question = pool.find(
      (item) =>
        !selectedIds.has(item.id)
    );

    if (!question) {
      continue;
    }

    selected.push(question);
    selectedIds.add(question.id);
  }

  /*
   * PASUL 2
   *
   * Locurile rămase merg din nou către
   * lecțiile cu prioritatea cea mai mare.
   *
   * Astfel o lecție slabă poate primi
   * mai mult de o întrebare.
   */
  let madeProgress = true;

  while (
    selected.length < maxQuestions &&
    madeProgress
  ) {
    madeProgress = false;

    for (
      const priority of lessonPriorities
    ) {
      if (
        selected.length >= maxQuestions
      ) {
        break;
      }

      const pool =
        lessonPools.get(
          priority.lessonId
        ) ?? [];

      const question = pool.find(
        (item) =>
          !selectedIds.has(item.id)
      );

      if (!question) {
        continue;
      }

      selected.push(question);
      selectedIds.add(question.id);

      madeProgress = true;
    }
  }

  return selected;
}

export function buildAdaptiveAssessment(
  input: AdaptiveAssessmentInput
): AdaptiveAssessmentResult {
  const now =
    input.now ?? new Date();

  const maxQuestions = clamp(
    Math.floor(
      input.maxQuestions ??
        DEFAULT_MAX_QUESTIONS
    ),
    1,
    10
  );

  const completedIds =
    new Set(
      input.completedLessonIds
        .filter(Boolean)
        .map((id) => id.trim())
        .filter(Boolean)
    );

  const masteryMap = new Map<
    string,
    AdaptiveMasterySnapshot
  >();

  for (const mastery of input.mastery) {
    masteryMap.set(
      mastery.skillId,
      mastery
    );
  }

  const attempts =
    input.recentAttempts ?? [];

  /*
   * REGULA DE SIGURANȚĂ PRINCIPALĂ:
   *
   * Numai lecțiile finalizate de elev
   * pot deveni eligibile.
   */
  const eligibleLessons =
    lectii.filter((lesson) =>
      completedIds.has(lesson.id)
    );

  /*
   * Din lecțiile finalizate păstrăm
   * numai lecțiile care au exerciții
   * matematice reale și valide.
   *
   * Placeholder-ele modulelor încă
   * necompletate sunt eliminate aici.
   */
  const assessmentReadyLessons =
    eligibleLessons.filter(
      isAssessmentReadyLesson
    );

  const assessmentReadyIds =
    new Set(
      assessmentReadyLessons.map(
        (lesson) => lesson.id
      )
    );

  const skippedLessonIds =
    eligibleLessons
      .filter(
        (lesson) =>
          !assessmentReadyIds.has(
            lesson.id
          )
      )
      .map((lesson) => lesson.id);

  const priorities =
    assessmentReadyLessons
      .map((lesson) => {
        const mastery =
          getMasteryForLesson(
            lesson.id,
            masteryMap
          );

        return calculateLessonPriority(
          mastery,
          now
        );
      })
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

        return a.lessonId.localeCompare(
          b.lessonId
        );
      });

  const questions =
    selectQuestions(
      priorities,
      masteryMap,
      attempts,
      maxQuestions,
      now
    );

  return {
    questions,

    eligibleLessonIds:
      eligibleLessons.map(
        (lesson) => lesson.id
      ),

    assessmentReadyLessonIds:
      assessmentReadyLessons.map(
        (lesson) => lesson.id
      ),

    skippedLessonIds,
  };
}