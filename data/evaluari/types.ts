export type AdaptiveDifficulty = 1 | 2 | 3;

export type AdaptiveMasterySnapshot = {
  skillId: string;
  masteryScore: number;
  totalAttempts: number;
  correctAttempts: number;
  consecutiveCorrect: number;
  nextReviewAt: string | null;
};

export type AdaptiveAttemptHistory = {
  questionId: string;
  lessonId: string;
  questionFamily: string;
  difficulty: AdaptiveDifficulty;
  isCorrect: boolean;
  answeredAt: string;
};

export type AdaptiveQuestion = {
  id: string;

  lessonId: string;
  lessonSlug: string;
  lessonTitle: string;

  questionFamily: string;
  difficulty: AdaptiveDifficulty;

  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;

  masteryScore: number | null;
};

export type AdaptiveLessonPriorityReason =
  | "new"
  | "weak"
  | "review_due"
  | "developing"
  | "maintenance";

export type AdaptiveLessonPriority = {
  lessonId: string;
  masteryScore: number;
  priorityScore: number;
  reason: AdaptiveLessonPriorityReason;
};

export type AdaptiveAssessmentInput = {
  completedLessonIds: string[];

  mastery: AdaptiveMasterySnapshot[];

  recentAttempts?: AdaptiveAttemptHistory[];

  maxQuestions?: number;

  now?: Date;
};

export type AdaptiveAssessmentResult = {
  questions: AdaptiveQuestion[];

  eligibleLessonIds: string[];

  assessmentReadyLessonIds: string[];

  skippedLessonIds: string[];
};

export type AssessmentQuestionRecord = {
  questionId: string;
  lessonId: string;
  questionFamily: string;
  difficulty: AdaptiveDifficulty;
  isCorrect: boolean;
};

export type AssessmentLessonResult = {
  lessonId: string;
  lessonSlug: string;
  lessonTitle: string;

  total: number;
  correct: number;
  percentage: number;
};