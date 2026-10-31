import bank2026MateInfo from "@/data/bac/banks/bac-2026-model-M_mate-info.json";
import rubric2026MateInfo from "@/data/bac/private-rubrics-bac-2026-model-M_mate-info.json";

export type OfficialBacExercise = {
  id: string;
  sourceExerciseId: string;
  slotId: string;
  subjectNumber: 1 | 2 | 3;
  problemNumber: number;
  subitem: "a" | "b" | "c" | null;
  points: number;
  answerType: "full-solution";
  statement: string;
  sourcePage: number;
  lessonSlug: string;
  skillId: string;
};

export type OfficialRubricStep = {
  points: number;
  criterion: string;
};

export type OfficialRubric = {
  exerciseId: string;
  slotId: string;
  maxPoints: number;
  sourcePage: number;
  steps: OfficialRubricStep[];
};

function assertMateInfoBenchmark() {
  const exercises = bank2026MateInfo.exercises as OfficialBacExercise[];
  const rubrics = rubric2026MateInfo.rubrics as OfficialRubric[];

  if (exercises.length !== 18) {
    throw new Error(`Banca BAC 2026 M_mate-info trebuie să aibă 18 cerințe, nu ${exercises.length}.`);
  }

  const ids = new Set<string>();
  const slots = new Set<string>();
  let totalPoints = 0;

  for (const exercise of exercises) {
    if (ids.has(exercise.id)) throw new Error(`ID BAC duplicat: ${exercise.id}`);
    if (slots.has(exercise.slotId)) throw new Error(`Slot BAC duplicat: ${exercise.slotId}`);
    if (exercise.points !== 5) throw new Error(`Slotul ${exercise.slotId} trebuie să aibă 5p.`);
    if (!exercise.statement.trim()) throw new Error(`Enunț lipsă pentru ${exercise.slotId}.`);
    ids.add(exercise.id);
    slots.add(exercise.slotId);
    totalPoints += exercise.points;
  }

  if (totalPoints !== 90) {
    throw new Error(`Banca BAC trebuie să însumeze 90p, nu ${totalPoints}.`);
  }

  const rubricByExercise = new Map(rubrics.map((rubric) => [rubric.exerciseId, rubric]));

  for (const exercise of exercises) {
    const rubric = rubricByExercise.get(exercise.id);
    if (!rubric) throw new Error(`Barem lipsă pentru ${exercise.slotId}.`);
    const rubricPoints = rubric.steps.reduce((sum, step) => sum + step.points, 0);
    if (rubric.maxPoints !== exercise.points || rubricPoints !== exercise.points) {
      throw new Error(`Barem invalid pentru ${exercise.slotId}: ${rubricPoints}/${exercise.points}p.`);
    }
  }
}

assertMateInfoBenchmark();

export function getOfficialMateInfoExercises(): OfficialBacExercise[] {
  return (bank2026MateInfo.exercises as OfficialBacExercise[]).map((exercise) => ({ ...exercise }));
}

export function getOfficialMateInfoRubric(exerciseId: string): OfficialRubric | null {
  const rubric = (rubric2026MateInfo.rubrics as OfficialRubric[]).find((item) => item.exerciseId === exerciseId);
  return rubric
    ? { ...rubric, steps: rubric.steps.map((step) => ({ ...step })) }
    : null;
}
