import {
  lectii,
  type ExercitiuLectie,
  type Lectie,
} from "../lectii";

import type {
  AdaptiveDifficulty,
  AdaptiveQuestion,
} from "./types";

const PLACEHOLDER_QUESTION =
  "Care este tema acestei lecții?";

const DEFAULT_DIFFICULTY: AdaptiveDifficulty = 2;

function normalizeText(value: string) {
  return value.trim().toLocaleLowerCase("ro-RO");
}

function isValidExercise(
  exercise: ExercitiuLectie
): boolean {
  if (!exercise) {
    return false;
  }

  if (
    typeof exercise.intrebare !== "string" ||
    exercise.intrebare.trim().length === 0
  ) {
    return false;
  }

  if (
    !Array.isArray(exercise.variante) ||
    exercise.variante.length < 2
  ) {
    return false;
  }

  if (
    exercise.variante.some(
      (option) =>
        typeof option !== "string" ||
        option.trim().length === 0
    )
  ) {
    return false;
  }

  if (
    !Number.isInteger(exercise.corect) ||
    exercise.corect < 0 ||
    exercise.corect >= exercise.variante.length
  ) {
    return false;
  }

  if (
    typeof exercise.explicatie !== "string" ||
    exercise.explicatie.trim().length === 0
  ) {
    return false;
  }

  return true;
}

function isPlaceholderExercise(
  exercise: ExercitiuLectie
): boolean {
  return (
    normalizeText(exercise.intrebare) ===
    normalizeText(PLACEHOLDER_QUESTION)
  );
}

export function isAssessmentReadyLesson(
  lesson: Lectie
): boolean {
  if (
    !Array.isArray(lesson.exercitii) ||
    lesson.exercitii.length === 0
  ) {
    return false;
  }

  const validExercises =
    lesson.exercitii.filter(isValidExercise);

  if (validExercises.length === 0) {
    return false;
  }

  const realExercises = validExercises.filter(
    (exercise) =>
      !isPlaceholderExercise(exercise)
  );

  return realExercises.length > 0;
}

export function getAssessmentReadyLessons(): Lectie[] {
  return lectii.filter(isAssessmentReadyLesson);
}

export function getAssessmentReadyLessonIds(): string[] {
  return getAssessmentReadyLessons().map(
    (lesson) => lesson.id
  );
}

function buildStableQuestionId(
  lesson: Lectie,
  exerciseIndex: number
) {
  return `${lesson.id}:lesson:${exerciseIndex + 1}`;
}

function buildQuestionFamily(
  lesson: Lectie
) {
  return `${lesson.id}:core`;
}

export function getQuestionsForLesson(
  lesson: Lectie
): AdaptiveQuestion[] {
  if (!isAssessmentReadyLesson(lesson)) {
    return [];
  }

  const questions: AdaptiveQuestion[] = [];

  lesson.exercitii.forEach(
    (exercise, exerciseIndex) => {
      if (!isValidExercise(exercise)) {
        return;
      }

      if (isPlaceholderExercise(exercise)) {
        return;
      }

      questions.push({
        id: buildStableQuestionId(
          lesson,
          exerciseIndex
        ),

        lessonId: lesson.id,
        lessonSlug: lesson.slug,
        lessonTitle: lesson.titlu,

        questionFamily:
          buildQuestionFamily(lesson),

        difficulty: DEFAULT_DIFFICULTY,

        question: exercise.intrebare,
        options: [...exercise.variante],
        correctIndex: exercise.corect,
        explanation: exercise.explicatie,

        masteryScore: null,
      });
    }
  );

  return questions;
}

export function getQuestionBank(): AdaptiveQuestion[] {
  return lectii.flatMap((lesson) =>
    getQuestionsForLesson(lesson)
  );
}

export function getQuestionById(
  questionId: string
): AdaptiveQuestion | null {
  for (const lesson of lectii) {
    const questions =
      getQuestionsForLesson(lesson);

    const question = questions.find(
      (item) => item.id === questionId
    );

    if (question) {
      return question;
    }
  }

  return null;
}

export function getLessonByAssessmentId(
  lessonId: string
): Lectie | null {
  return (
    lectii.find(
      (lesson) => lesson.id === lessonId
    ) ?? null
  );
}