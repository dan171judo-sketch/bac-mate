export type GradingState = {
  complete: boolean;
  expectedExercises: number;
  evaluatedExercises: number;
  pendingExercises: number;
};

type AnswerLike = {
  exercise_id: string;
  is_correct: boolean | null;
};

type SnapshotLike = {
  subjects: { exercises: { id: string }[] }[];
};

export function getGradingState(
  snapshot: SnapshotLike,
  answers: AnswerLike[]
): GradingState {
  const expectedIds = new Set(
    snapshot.subjects.flatMap((subject) =>
      subject.exercises.map((exercise) => exercise.id)
    )
  );

  const evaluatedIds = new Set(
    answers
      .filter(
        (answer) =>
          expectedIds.has(answer.exercise_id) &&
          (answer.is_correct === true || answer.is_correct === false)
      )
      .map((answer) => answer.exercise_id)
  );

  const expectedExercises = expectedIds.size;
  const evaluatedExercises = evaluatedIds.size;
  const pendingExercises = Math.max(0, expectedExercises - evaluatedExercises);

  return {
    complete: expectedExercises > 0 && pendingExercises === 0,
    expectedExercises,
    evaluatedExercises,
    pendingExercises,
  };
}
