import { NextResponse } from "next/server";

import { createClient } from "../../../../../lib/supabase/server";

import {
  calculeazaNotaFinala,
  obtineExercitiuDinBanca,
} from "../../../../../lib/simulari/engine";

import {
  isSimulationVariantSnapshot,
  type SimulationVariantSnapshot,
} from "../../../../../lib/simulari/variant-engine";

import {
  saveStudentAttempt,
} from "../../../../../lib/mastery/service";

import { getGradingState } from "../../../../../lib/simulari/grading-state";
import { gradeSimulationAgainstOfficialRubricPdf, gradeOfficialRubricSubsetPdf } from "../../../../../lib/bac/mate-official-pdf-grader.server";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

type SimulationStatus =
  | "in_progress"
  | "completed"
  | "abandoned";

type SimulationRow = {
  id: string;
  user_id: string;
  profile_code: string;
  status: SimulationStatus;
  duration_minutes: number;
  started_at: string;
  official_points: number;

  variant_snapshot: unknown | null;
};

type AnswerScoreRow = {
  exercise_id: string;
  skill_id: string | null;
  subject_number: number;
  awarded_points: number;
  max_points: number;
  answer_text: string | null;
  is_correct: boolean | null;
};

type ExistingAttemptRow = {
  id: string;
};

function elapsedSeconds(
  simulation: SimulationRow
): number {
  const started = new Date(
    simulation.started_at
  ).getTime();

  if (!Number.isFinite(started)) {
    return 0;
  }

  return Math.min(
    simulation.duration_minutes * 60,
    Math.max(
      0,
      Math.floor(
        (Date.now() - started) / 1000
      )
    )
  );
}

function scoreSubject(
  answers: AnswerScoreRow[],
  subjectNumber: 1 | 2 | 3
): number {
  const score = answers
    .filter(
      (answer) =>
        answer.subject_number ===
        subjectNumber
    )
    .reduce(
      (sum, answer) =>
        sum +
        Number(
          answer.awarded_points ?? 0
        ),
      0
    );

  return Math.min(
    30,
    Math.max(0, score)
  );
}

function isDuplicateKeyError(
  error: unknown
): boolean {
  if (
    typeof error !== "object" ||
    error === null
  ) {
    return false;
  }

  const possibleError = error as {
    code?: unknown;
    message?: unknown;
  };

  if (
    possibleError.code === "23505"
  ) {
    return true;
  }

  if (
    typeof possibleError.message ===
      "string" &&
    possibleError.message
      .toLowerCase()
      .includes("duplicate")
  ) {
    return true;
  }

  return false;
}

function asSimulationRow(
  value: unknown
): SimulationRow {
  return value as SimulationRow;
}

function asAnswerScoreRows(
  value: unknown
): AnswerScoreRow[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value as AnswerScoreRow[];
}

/*
 * Găsește exercițiul exact în snapshot-ul
 * persistent al acestei simulări.
 *
 * Snapshot-ul este autoritatea pentru:
 * - apartenența exercițiului la examen;
 * - subiect;
 * - ordine;
 * - punctaj;
 * - competență.
 */
function findSnapshotExercise(
  snapshot: SimulationVariantSnapshot,
  exerciseId: string
) {
  return snapshot.subjects
    .flatMap(
      (subject) =>
        subject.exercises
    )
    .find(
      (exercise) =>
        exercise.id === exerciseId
    );
}

/*
 * Verificăm că răspunsurile salvate aparțin
 * efectiv variantei persistente.
 *
 * Nu acceptăm ca un rând din answers să poată
 * influența punctajul dacă nu există în snapshot.
 */
function validateAnswersAgainstSnapshot(
  answers: AnswerScoreRow[],
  snapshot: SimulationVariantSnapshot
): {
  validAnswers: AnswerScoreRow[];
  rejectedAnswers: number;
} {
  const validAnswers: AnswerScoreRow[] =
    [];

  let rejectedAnswers = 0;

  for (const answer of answers) {
    const snapshotExercise =
      findSnapshotExercise(
        snapshot,
        answer.exercise_id
      );

    if (!snapshotExercise) {
      rejectedAnswers += 1;
      continue;
    }

    /*
     * Verificăm și metadatele care influențează
     * punctajul. Nu avem încredere oarbă în
     * bac_simulation_answers.
     */
    if (
      answer.subject_number !==
        snapshotExercise.subjectNumber ||
      Number(answer.max_points) !==
        Number(
          snapshotExercise.maxPoints
        )
    ) {
      rejectedAnswers += 1;
      continue;
    }

    const safeAwardedPoints =
      Math.min(
        snapshotExercise.maxPoints,
        Math.max(
          0,
          Number(
            answer.awarded_points ?? 0
          )
        )
      );

    validAnswers.push({
      ...answer,

      subject_number:
        snapshotExercise.subjectNumber,

      max_points:
        snapshotExercise.maxPoints,

      awarded_points:
        safeAwardedPoints,

      skill_id:
        snapshotExercise.competenta ??
        answer.skill_id ??
        null,
    });
  }

  return {
    validAnswers,
    rejectedAnswers,
  };
}

/*
 * Trimitem în Mastery Engine numai răspunsurile
 * care:
 *
 * 1. aparțin snapshot-ului acestei simulări;
 * 2. au putut fi evaluate determinist;
 * 3. mai au o sursă verificată disponibilă.
 *
 * Snapshot-ul stabilește identitatea exercițiului.
 * Content Engine-ul furnizează baremul privat.
 */
async function sincronizeazaCuMastery({
  supabase,
  simulation,
  answers,
  snapshot,
}: {
  supabase: Awaited<
    ReturnType<typeof createClient>
  >;

  simulation: SimulationRow;

  answers: AnswerScoreRow[];

  snapshot: SimulationVariantSnapshot;
}) {
  let imported = 0;
  let alreadyImported = 0;
  let skippedUnevaluated = 0;
  let skippedMissingExercise = 0;
  let skippedMissingSkill = 0;
  let skippedOutsideSnapshot = 0;
  let skippedSnapshotMismatch = 0;

  for (const answer of answers) {
    /*
     * Nu importăm în Mastery un exercițiu
     * care nu aparține variantei elevului.
     */
    const snapshotExercise =
      findSnapshotExercise(
        snapshot,
        answer.exercise_id
      );

    if (!snapshotExercise) {
      skippedOutsideSnapshot += 1;
      continue;
    }

    /*
     * Nu trimitem în Mastery răspunsurile
     * care nu au evaluare deterministă.
     */
    if (
      answer.is_correct !== true &&
      answer.is_correct !== false
    ) {
      skippedUnevaluated += 1;
      continue;
    }

    /*
     * Baremul rămâne privat în banca
     * verificată BAC MATE.
     */
    const exercise =
      obtineExercitiuDinBanca(
        snapshotExercise.id,
        simulation.profile_code
      );

    if (!exercise) {
      skippedMissingExercise += 1;
      continue;
    }

    /*
     * Protecție împotriva schimbării identității
     * exercițiului între snapshot și banca live.
     */
    if (
      exercise.id !==
        snapshotExercise.id ||
      exercise.sourceExerciseId !==
        snapshotExercise.sourceExerciseId ||
      exercise.subjectNumber !==
        snapshotExercise.subjectNumber
    ) {
      skippedSnapshotMismatch += 1;
      continue;
    }

    /*
     * Preferăm competența înghețată în snapshot.
     * Dacă lipsește, folosim competența sursei
     * verificate.
     */
    const skillId =
      typeof snapshotExercise.competenta ===
        "string" &&
      snapshotExercise.competenta.trim()
        ? snapshotExercise.competenta.trim()
        : typeof exercise.competenta ===
              "string"
          ? exercise.competenta.trim()
          : "";

    if (!skillId) {
      skippedMissingSkill += 1;
      continue;
    }

    /*
     * În student_attempts folosim ID-ul
     * exercițiului original din lecție.
     *
     * ID-ul simulării rămâne separat în
     * source_session_id.
     */
    const masteryExerciseId =
      snapshotExercise.sourceExerciseId;

    /*
     * Prima protecție împotriva importului
     * dublu.
     */
    const {
      data: existingAttemptData,
      error: existingAttemptError,
    } = await supabase
      .from("student_attempts")
      .select("id")
      .eq(
        "user_id",
        simulation.user_id
      )
      .eq(
        "source",
        "bac_simulation"
      )
      .eq(
        "source_session_id",
        simulation.id
      )
      .eq(
        "exercise_id",
        masteryExerciseId
      )
      .limit(1);

    if (existingAttemptError) {
      throw existingAttemptError;
    }

    const existingAttempt =
      (
        existingAttemptData?.[0] ??
        null
      ) as unknown as
        | ExistingAttemptRow
        | null;

    if (existingAttempt) {
      alreadyImported += 1;
      continue;
    }

    try {
      await saveStudentAttempt(
        supabase,
        {
          lessonId:
            snapshotExercise.lessonSlug,

          exerciseId:
            masteryExerciseId,

          skillId,

          answerGiven:
            answer.answer_text ?? null,

          correctAnswer:
            exercise.raspunsCorect,

          isCorrect:
            answer.is_correct,

          usedHint:
            false,

          responseTimeSeconds:
            null,

          source:
            "bac_simulation",

          sourceSessionId:
            simulation.id,
        }
      );

      imported += 1;
    } catch (error) {
      /*
       * A doua protecție împotriva dublării
       * este indexul UNIQUE din Supabase.
       */
      if (
        isDuplicateKeyError(error)
      ) {
        alreadyImported += 1;
        continue;
      }

      throw error;
    }
  }

  return {
    imported,
    alreadyImported,
    skippedUnevaluated,
    skippedMissingExercise,
    skippedMissingSkill,
    skippedOutsideSnapshot,
    skippedSnapshotMismatch,
  };
}

export async function POST(
  _request: Request,
  context: RouteContext
) {
  try {
    const { id } =
      await context.params;

    if (!id) {
      return NextResponse.json(
        {
          error:
            "ID-ul simulării lipsește.",
        },
        {
          status: 400,
        }
      );
    }

    const supabase =
      await createClient();

    /*
     * 1. Utilizator autentificat.
     */
    const {
      data: { user },
      error: userError,
    } =
      await supabase.auth.getUser();

    if (
      userError ||
      !user
    ) {
      return NextResponse.json(
        {
          error:
            "Trebuie să fii autentificat.",
        },
        {
          status: 401,
        }
      );
    }

    /*
     * 2. Citim simularea împreună cu
     * snapshot-ul persistent.
     */
    const {
      data: simulationData,
      error: simulationError,
    } = await supabase
      .from("bac_simulations")
      .select(
        [
          "id",
          "user_id",
          "profile_code",
          "status",
          "duration_minutes",
          "started_at",
          "official_points",
          "variant_snapshot",
        ].join(",")
      )
      .eq(
        "id",
        id
      )
      .eq(
        "user_id",
        user.id
      )
      .maybeSingle();

    if (simulationError) {
      throw simulationError;
    }

    if (!simulationData) {
      return NextResponse.json(
        {
          error:
            "Simularea nu există sau nu îți aparține.",
        },
        {
          status: 404,
        }
      );
    }

    const simulation =
      asSimulationRow(
        simulationData
      );

    /*
     * O simulare abandonată nu poate fi
     * finalizată ulterior.
     */
    if (
      simulation.status ===
      "abandoned"
    ) {
      return NextResponse.json(
        {
          error:
            "Simularea a fost abandonată și nu mai poate fi finalizată.",
        },
        {
          status: 409,
        }
      );
    }

    /*
     * De acum o simulare nouă trebuie să aibă
     * snapshot valid.
     *
     * GET /api/simulari/[id] face migrarea
     * automată pentru sesiunile active vechi.
     */
    if (
      !isSimulationVariantSnapshot(
        simulation.variant_snapshot
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Varianta persistentă a simulării nu este disponibilă. Deschide simularea înainte de finalizare.",
        },
        {
          status: 409,
        }
      );
    }

    const snapshot =
      simulation.variant_snapshot;

    /*
     * 3. Citim răspunsurile salvate.
     */
    const {
      data: answersData,
      error: answersError,
    } = await supabase
      .from(
        "bac_simulation_answers"
      )
      .select(
        [
          "exercise_id",
          "skill_id",
          "subject_number",
          "awarded_points",
          "max_points",
          "answer_text",
          "is_correct",
        ].join(",")
      )
      .eq(
        "simulation_id",
        id
      )
      .eq(
        "user_id",
        user.id
      );

    if (answersError) {
      throw answersError;
    }

    const rawAnswers =
      asAnswerScoreRows(
        answersData ?? []
      );

    /*
     * 4. Validăm toate răspunsurile față de
     * varianta persistentă.
     */
    const validated = validateAnswersAgainstSnapshot(rawAnswers, snapshot);
    let answers = validated.validAnswers;
    const rejectedAnswers = validated.rejectedAnswers;

    /*
     * MATE Grader V2 — Official Rubric PDF.
     *
     * Pentru variantele official-pdf, snapshot-ul îngheață release-ul exact.
     * Baremul rămâne server-only, este verificat SHA-256 față de catalog și
     * este trimis evaluatorului ca PDF vizual. Dacă orice gate eșuează, nu
     * fabricăm punctaj: răspunsurile rămân pending.
     */
    const snapshotExercises = snapshot.subjects.flatMap((subject) => subject.exercises);
    const releaseIds = [...new Set(
      snapshotExercises.map((exercise) => exercise.sourceReleaseId).filter((value): value is string => Boolean(value?.startsWith("official-pdf:")))
    )];

    let matePdfGrading: Awaited<ReturnType<typeof gradeSimulationAgainstOfficialRubricPdf>> | null = null;

    if (simulation.status === "in_progress" && releaseIds.length >= 1) {
      const answerTextByExercise = new Map(rawAnswers.map((answer) => [answer.exercise_id, answer.answer_text ?? ""]));
      const scoreByExercise = new Map<string, { awardedPoints: number }>();
      let pendingResult: Awaited<ReturnType<typeof gradeSimulationAgainstOfficialRubricPdf>> | null = null;

      for (const releaseId of releaseIds) {
        const groupExercises = snapshotExercises.filter((exercise) => exercise.sourceReleaseId === releaseId);
        const gradingInput = groupExercises.map((exercise) => ({ slotId: exercise.slotId ?? "", answerText: answerTextByExercise.get(exercise.id) ?? "" }));
        if (!gradingInput.length || gradingInput.some((item) => !item.slotId)) continue;

        const result = releaseIds.length === 1 && gradingInput.length === 18
          ? await gradeSimulationAgainstOfficialRubricPdf({ releaseId, answers: gradingInput })
          : await gradeOfficialRubricSubsetPdf({ releaseId, answers: gradingInput });

        if (result.state !== "graded") { pendingResult = result; break; }
        const bySlot = new Map(result.items.map((item) => [item.slotId, item]));
        for (const exercise of groupExercises) {
          const score = bySlot.get(exercise.slotId ?? "");
          if (!score) { pendingResult = { state: "pending", items: [], reason: "invalid-output" }; break; }
          scoreByExercise.set(exercise.id, { awardedPoints: score.awardedPoints });
        }
        if (pendingResult) break;
      }

      if (!pendingResult && scoreByExercise.size === snapshotExercises.length) {
        matePdfGrading = { state: "graded", items: [], reason: "official-rubric-pdf-evaluated" };
        const nowForGrading = new Date().toISOString();
        const rows = snapshotExercises.map((exercise) => {
          const score = scoreByExercise.get(exercise.id);
          if (!score) throw new Error(`Lipsește evaluarea MATE pentru ${exercise.id}.`);
          return {
            simulation_id: simulation.id, user_id: simulation.user_id, exercise_id: exercise.id,
            skill_id: exercise.competenta ?? null, subject_number: exercise.subjectNumber,
            exercise_order: exercise.exerciseOrder, max_points: exercise.maxPoints,
            awarded_points: score.awardedPoints, answer_text: answerTextByExercise.get(exercise.id) ?? "",
            is_correct: score.awardedPoints === exercise.maxPoints,
            answered_at: (answerTextByExercise.get(exercise.id) ?? "").trim() ? nowForGrading : null,
            updated_at: nowForGrading,
          };
        });
        const { data: gradedRows, error: gradedSaveError } = await supabase.from("bac_simulation_answers")
          .upsert(rows, { onConflict: "simulation_id,exercise_id" })
          .select(["exercise_id", "skill_id", "subject_number", "awarded_points", "max_points", "answer_text", "is_correct"].join(","));
        if (gradedSaveError) throw gradedSaveError;
        answers = validateAnswersAgainstSnapshot(asAnswerScoreRows(gradedRows ?? []), snapshot).validAnswers;
      } else if (pendingResult) {
        matePdfGrading = pendingResult;
      }
    }

    const gradingState = getGradingState(snapshot, answers);

    /*
     * 5. Sincronizăm cu Mastery.
     *
     * Funcția rămâne idempotentă.
     */
    const masterySync =
      await sincronizeazaCuMastery({
        supabase,
        simulation,
        answers,
        snapshot,
      });

    /*
     * Dacă simularea este deja finalizată,
     * nu recalculăm examenul.
     *
     * Permitem însă retry pentru sincronizarea
     * Mastery, exact ca înainte.
     */
    if (
      simulation.status ===
      "completed"
    ) {
      const {
        data: completedSimulation,
        error: completedError,
      } = await supabase
        .from("bac_simulations")
        .select("*")
        .eq(
          "id",
          id
        )
        .eq(
          "user_id",
          user.id
        )
        .single();

      if (completedError) {
        throw completedError;
      }

      return NextResponse.json(
        {
          ok: true,

          simulation:
            completedSimulation,

          masterySync,

          integrity: {
            rejectedAnswers,
          },

          mateGrading: matePdfGrading
            ? { state: matePdfGrading.state, reason: matePdfGrading.reason }
            : null,
        },
        {
          status: 200,

          headers: {
            "Cache-Control":
              "no-store",
          },
        }
      );
    }

    if (
      simulation.status !==
      "in_progress"
    ) {
      return NextResponse.json(
        {
          error:
            "Simularea nu mai poate fi finalizată.",
        },
        {
          status: 409,
        }
      );
    }

    /*
     * 6. Calculăm punctajele numai din
     * răspunsurile validate față de snapshot.
     */
    const subject1 =
      scoreSubject(
        answers,
        1
      );

    const subject2 =
      scoreSubject(
        answers,
        2
      );

    const subject3 =
      scoreSubject(
        answers,
        3
      );

    /*
     * 7. Punctele din oficiu.
     */
    const officialPoints =
      Math.min(
        10,
        Math.max(
          0,
          Number(
            simulation.official_points ??
              10
          )
        )
      );

    /*
     * 8. Punctaj total.
     */
    const totalScore = gradingState.complete
      ? Math.min(100, Math.max(0, subject1 + subject2 + subject3 + officialPoints))
      : null;

    /*
     * 9. Nota finală.
     */
    const finalGrade = gradingState.complete
      ? calculeazaNotaFinala(subject1 + subject2 + subject3, officialPoints)
      : null;

    const now =
      new Date().toISOString();

    /*
     * 10. Finalizare atomică logic prin
     * condiția status=in_progress.
     */
    const {
      data: updatedSimulation,
      error: updateError,
    } = await supabase
      .from("bac_simulations")
      .update({
        status:
          "completed",

        completed_at:
          now,

        time_spent_seconds:
          elapsedSeconds(
            simulation
          ),

        subject_1_score: gradingState.complete ? subject1 : null,

        subject_2_score: gradingState.complete ? subject2 : null,

        subject_3_score: gradingState.complete ? subject3 : null,

        official_points:
          officialPoints,

        total_score:
          totalScore,

        final_grade:
          finalGrade,

        updated_at:
          now,
      })
      .eq(
        "id",
        id
      )
      .eq(
        "user_id",
        user.id
      )
      .eq(
        "status",
        "in_progress"
      )
      .select("*")
      .maybeSingle();

    if (updateError) {
      throw updateError;
    }

    /*
     * 11. Protecție pentru două cereri de
     * finalizare aproape simultane.
     */
    if (!updatedSimulation) {
      const {
        data: latest,
        error: latestError,
      } = await supabase
        .from("bac_simulations")
        .select("*")
        .eq(
          "id",
          id
        )
        .eq(
          "user_id",
          user.id
        )
        .single();

      if (latestError) {
        throw latestError;
      }

      return NextResponse.json(
        {
          ok: true,

          simulation:
            latest,

          masterySync,

          integrity: {
            rejectedAnswers,
          },

          mateGrading: matePdfGrading
            ? { state: matePdfGrading.state, reason: matePdfGrading.reason }
            : null,
        },
        {
          status: 200,

          headers: {
            "Cache-Control":
              "no-store",
          },
        }
      );
    }

    /*
     * 12. Finalizare completă.
     */
    return NextResponse.json(
      {
        ok: true,

        simulation:
          updatedSimulation,

        masterySync,

        integrity: {
          rejectedAnswers,
        },

        mateGrading: matePdfGrading
          ? { state: matePdfGrading.state, reason: matePdfGrading.reason }
          : null,
      },
      {
        status: 200,

        headers: {
          "Cache-Control":
            "no-store",
        },
      }
    );
  } catch (error) {
    console.error(
      "POST /api/simulari/[id]/finalizare:",
      JSON.stringify(error, null, 2)
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Simularea nu a putut fi finalizată.",
      },
      {
        status: 500,
      }
    );
  }
}