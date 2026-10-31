import { NextResponse } from "next/server";

import { createClient } from "../../../../lib/supabase/server";

import {
  construiesteBancaSimulare,
} from "../../../../lib/simulari/engine";

import {
  buildSimulationVariant,
  isSimulationVariantSnapshot,
  SIMULATION_VARIANT_VERSION,
  type SimulationVariantSnapshot,
} from "../../../../lib/simulari/variant-engine";

import { getGradingState } from "../../../../lib/simulari/grading-state";

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
  simulation_number: number;
  status: SimulationStatus;
  duration_minutes: number;
  started_at: string;
  completed_at: string | null;
  time_spent_seconds: number;
  subject_1_score: number;
  subject_2_score: number;
  subject_3_score: number;
  official_points: number;
  total_score: number;
  final_grade: number | null;
  strongest_skill_id: string | null;
  weakest_skill_id: string | null;
  created_at: string;
  updated_at: string;

  variant_seed: string | null;
  variant_snapshot: unknown | null;
  variant_version: number;
};

type SimulationAnswerRow = {
  id: string;
  simulation_id: string;
  user_id: string;
  exercise_id: string;
  skill_id: string | null;
  subject_number: number;
  exercise_order: number;
  max_points: number;
  awarded_points: number;
  answer_text: string | null;
  is_correct: boolean | null;
  answered_at: string | null;
  created_at: string;
  updated_at: string;
};

function calculateRemainingSeconds(
  simulation: SimulationRow
) {
  const startedAt = new Date(
    simulation.started_at
  ).getTime();

  if (!Number.isFinite(startedAt)) {
    return simulation.duration_minutes * 60;
  }

  const elapsedSeconds = Math.max(
    0,
    Math.floor(
      (Date.now() - startedAt) / 1000
    )
  );

  return Math.max(
    0,
    simulation.duration_minutes * 60 -
      elapsedSeconds
  );
}

function simulationForClient(
  simulation: SimulationRow
) {
  return {
    id: simulation.id,

    profileCode:
      simulation.profile_code,

    simulationNumber:
      simulation.simulation_number,

    status:
      simulation.status,

    durationMinutes:
      simulation.duration_minutes,

    startedAt:
      simulation.started_at,

    completedAt:
      simulation.completed_at,

    timeSpentSeconds:
      simulation.time_spent_seconds,

    subject1Score:
      simulation.subject_1_score,

    subject2Score:
      simulation.subject_2_score,

    subject3Score:
      simulation.subject_3_score,

    officialPoints:
      simulation.official_points,

    totalScore:
      simulation.total_score,

    finalGrade:
      simulation.final_grade,
  };
}

function snapshotToClientBank(
  snapshot: SimulationVariantSnapshot
) {
  return {
    profileCode:
      snapshot.profileCode,

    lessonsAvailable:
      snapshot.lessonsAvailable,

    exercisesAvailable:
      snapshot.exercisesAvailable,

    totalAvailablePoints:
      snapshot.totalSelectedPoints,

    canBuildFullSimulation:
      snapshot.canBuildFullSimulation,

    subjects:
      snapshot.subjects.map(
        (subject) => ({
          subjectNumber:
            subject.subjectNumber,

          title:
            subject.title,

          targetPoints:
            subject.targetPoints,

          availablePoints:
            subject.availablePoints,

          exercises:
            subject.exercises.map(
              (exercise) => ({
                id:
                  exercise.id,

                sourceExerciseId:
                  exercise.sourceExerciseId,

                lessonSlug:
                  exercise.lessonSlug,

                lessonTitle:
                  exercise.lessonTitle,

                subjectNumber:
                  exercise.subjectNumber,

                exerciseOrder:
                  exercise.exerciseOrder,

                slotId:
                  exercise.slotId,

                nivel:
                  exercise.nivel,

                tip:
                  exercise.tip,

                enunt:
                  exercise.enunt,

                variante:
                  exercise.variante
                    ? [...exercise.variante]
                    : undefined,

                maxPoints:
                  exercise.maxPoints,

                competenta:
                  exercise.competenta,
              })
            ),
        })
      ),
  };
}

function legacyBankForClient(
  profileCode: string
) {
  const bank =
    construiesteBancaSimulare(
      profileCode
    );

  return {
    profileCode:
      bank.profileCode,

    lessonsAvailable:
      bank.lessonsAvailable,

    exercisesAvailable:
      bank.exercisesAvailable,

    totalAvailablePoints:
      bank.totalAvailablePoints,

    canBuildFullSimulation:
      bank.canBuildFullSimulation,

    subjects:
      bank.subjects.map(
        (subject) => ({
          subjectNumber:
            subject.subjectNumber,

          title:
            subject.title,

          targetPoints:
            subject.targetPoints,

          availablePoints:
            subject.availablePoints,

          exercises:
            subject.exercises.map(
              (exercise) => ({
                id:
                  exercise.id,

                sourceExerciseId:
                  exercise.sourceExerciseId,

                lessonSlug:
                  exercise.lessonSlug,

                lessonTitle:
                  exercise.lessonTitle,

                subjectNumber:
                  exercise.subjectNumber,

                exerciseOrder:
                  exercise.exerciseOrder,

                slotId:
                  exercise.slotId,

                nivel:
                  exercise.nivel,

                tip:
                  exercise.tip,

                enunt:
                  exercise.enunt,

                variante:
                  exercise.variante
                    ? [...exercise.variante]
                    : undefined,

                maxPoints:
                  exercise.maxPoints,

                competenta:
                  exercise.competenta,
              })
            ),
        })
      ),
  };
}

export async function GET(
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

    const {
      data: { user },
      error: userError,
    } =
      await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        {
          error:
            "Trebuie să fii autentificat pentru a deschide simularea.",
        },
        {
          status: 401,
        }
      );
    }

    const {
      data: simulationData,
      error: simulationError,
    } = await supabase
      .from("bac_simulations")
      .select("*")
      .eq("id", id)
      .eq("user_id", user.id)
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
      simulationData as SimulationRow;

    const {
      data: answersData,
      error: answersError,
    } = await supabase
      .from(
        "bac_simulation_answers"
      )
      .select("*")
      .eq(
        "simulation_id",
        id
      )
      .eq(
        "user_id",
        user.id
      )
      .order(
        "subject_number",
        {
          ascending: true,
        }
      )
      .order(
        "exercise_order",
        {
          ascending: true,
        }
      );

    if (answersError) {
      throw answersError;
    }

    const answers =
      (answersData ??
        []) as SimulationAnswerRow[];

    /*
     * Snapshot-ul este sursa de adevăr
     * pentru varianta elevului.
     */
    let snapshot:
      | SimulationVariantSnapshot
      | null = null;

    if (
      isSimulationVariantSnapshot(
        simulation.variant_snapshot
      )
    ) {
      snapshot =
        simulation.variant_snapshot;
    }

    /*
     * Compatibilitate pentru sesiunile
     * active create înainte de introducerea
     * variant_snapshot.
     *
     * Generăm o singură dată și persistăm.
     */
    if (
      !snapshot &&
      simulation.status ===
        "in_progress"
    ) {
      const bank =
        construiesteBancaSimulare(
          simulation.profile_code
        );

      const seed =
        simulation.variant_seed?.trim() ||
        [
          "bac-mate",
          "legacy",
          simulation.id,
        ].join(":");

      snapshot =
        buildSimulationVariant(
          bank,
          seed
        );

      const {
        error: updateError,
      } = await supabase
        .from(
          "bac_simulations"
        )
        .update({
          variant_seed:
            seed,

          variant_snapshot:
            snapshot,

          variant_version:
            SIMULATION_VARIANT_VERSION,

          updated_at:
            new Date().toISOString(),
        })
        .eq(
          "id",
          simulation.id
        )
        .eq(
          "user_id",
          user.id
        );

      if (updateError) {
        throw updateError;
      }
    }

    /*
     * Simulările istorice finalizate înainte
     * de snapshot rămân compatibile.
     *
     * Nu le rescriem retrospectiv.
     */
    if (!snapshot) {
      return NextResponse.json(
        {
          simulation:
            simulationForClient(
              simulation
            ),

          answers,

          bank:
            legacyBankForClient(
              simulation.profile_code
            ),

          variant: {
            persistent: false,
            legacy: true,
          },

          grading: {
            complete: false,
            expectedExercises: 0,
            evaluatedExercises: 0,
            pendingExercises: 0,
          },

          remainingSeconds:
            calculateRemainingSeconds(
              simulation
            ),
        },
        {
          status: 200,

          headers: {
            "Cache-Control":
              "no-store, max-age=0",
          },
        }
      );
    }

    /*
     * Pentru simulările noi browserul primește
     * exclusiv varianta persistentă.
     *
     * Snapshot-ul public NU conține:
     * - raspunsCorect
     * - rezolvare
     * - explicatieFinala
     */
    return NextResponse.json(
      {
        simulation:
          simulationForClient(
            simulation
          ),

        answers,

        bank:
          snapshotToClientBank(
            snapshot
          ),

        variant: {
          version:
            snapshot.version,

          persistent:
            true,
        },

        grading: getGradingState(snapshot, answers),

        remainingSeconds:
          calculateRemainingSeconds(
            simulation
          ),
      },
      {
        status: 200,

        headers: {
          "Cache-Control":
            "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    console.error(
      "GET /api/simulari/[id]:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Simularea nu a putut fi încărcată.",
      },
      {
        status: 500,
      }
    );
  }
}