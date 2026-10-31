import { NextResponse } from "next/server";

import { createClient } from "../../../../../lib/supabase/server";

import {
  obtineExercitiuDinBanca,
  verificaRaspunsObiectiv,
} from "../../../../../lib/simulari/engine";

import {
  isSimulationVariantSnapshot,
} from "../../../../../lib/simulari/variant-engine";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

type AnswerRequest = {
  exerciseId?: unknown;
  answerText?: unknown;
};

type SimulationRow = {
  id: string;
  user_id: string;
  profile_code: string;

  status:
    | "in_progress"
    | "completed"
    | "abandoned";

  duration_minutes: number;
  started_at: string;

  variant_snapshot:
    unknown | null;
};

function remainingSeconds(
  simulation: SimulationRow
) {
  const started =
    new Date(
      simulation.started_at
    ).getTime();

  if (!Number.isFinite(started)) {
    return 0;
  }

  const elapsed =
    Math.max(
      0,
      Math.floor(
        (Date.now() - started) /
          1000
      )
    );

  return Math.max(
    0,
    simulation.duration_minutes *
      60 -
      elapsed
  );
}

export async function POST(
  request: Request,
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

    let body: AnswerRequest;

    try {
      body =
        (await request.json()) as
          AnswerRequest;
    } catch {
      return NextResponse.json(
        {
          error:
            "Datele trimise nu sunt valide.",
        },
        {
          status: 400,
        }
      );
    }

    const exerciseId =
      typeof body.exerciseId ===
      "string"
        ? body.exerciseId.trim()
        : "";

    const answerText =
      typeof body.answerText ===
      "string"
        ? body.answerText
        : "";

    if (!exerciseId) {
      return NextResponse.json(
        {
          error:
            "Exercițiul lipsește.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      answerText.length > 10000
    ) {
      return NextResponse.json(
        {
          error:
            "Răspunsul este prea lung.",
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
     * Citim inclusiv snapshot-ul persistent.
     */
    const {
      data: simulationData,
      error: simulationError,
    } =
      await supabase
        .from(
          "bac_simulations"
        )
        .select(
          "id,user_id,profile_code,status,duration_minutes,started_at,variant_snapshot"
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

    /*
     * Păstrăm aici aceeași strategie care
     * funcționa deja în ruta originală.
     *
     * unknown intermediar evită problemele
     * de tip GenericStringError produse de
     * tipurile Supabase.
     */
    const simulation =
      simulationData as unknown as
        SimulationRow;

    if (
      simulation.status !==
      "in_progress"
    ) {
      return NextResponse.json(
        {
          error:
            "Această simulare nu mai este activă.",
        },
        {
          status: 409,
        }
      );
    }

    if (
      remainingSeconds(
        simulation
      ) <= 0
    ) {
      return NextResponse.json(
        {
          error:
            "Timpul simulării a expirat.",

          expired:
            true,
        },
        {
          status: 409,
        }
      );
    }

    /*
     * SNAPSHOT GATE
     *
     * Pentru simulările noi, snapshot-ul
     * persistent este contractul variantei.
     *
     * Nu permitem salvarea unui exercițiu
     * care nu există în varianta exactă
     * atribuită elevului.
     */
    if (
      !isSimulationVariantSnapshot(
        simulation.variant_snapshot
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Varianta persistentă a simulării nu este disponibilă. Reîncarcă pagina simulării.",
        },
        {
          status: 409,
        }
      );
    }

    const snapshot =
      simulation.variant_snapshot;

    const snapshotExercise =
      snapshot.subjects
        .flatMap(
          (subject) =>
            subject.exercises
        )
        .find(
          (exercise) =>
            exercise.id ===
            exerciseId
        );

    if (!snapshotExercise) {
      return NextResponse.json(
        {
          error:
            "Exercițiul nu aparține variantei acestei simulări.",
        },
        {
          status: 404,
        }
      );
    }

    /*
     * BAREM VERIFICAT
     *
     * Snapshot-ul nu conține intenționat
     * răspunsul corect.
     *
     * După ce am demonstrat că exercițiul
     * aparține variantei elevului, putem
     * lua baremul din Content Engine.
     */
    const exercise =
      obtineExercitiuDinBanca(
        snapshotExercise.id,
        simulation.profile_code
      );

    if (!exercise) {
      return NextResponse.json(
        {
          error:
            "Sursa verificată a exercițiului nu mai este disponibilă.",
        },
        {
          status: 409,
        }
      );
    }

    /*
     * Verificare suplimentară:
     * exercițiul din banca verificată trebuie
     * să fie aceeași sursă salvată în snapshot.
     */
    if (
      exercise.sourceExerciseId !==
      snapshotExercise.sourceExerciseId
    ) {
      return NextResponse.json(
        {
          error:
            "Exercițiul verificat nu mai corespunde variantei salvate.",
        },
        {
          status: 409,
        }
      );
    }

    /*
     * Numai exercițiile care pot fi evaluate
     * determinist primesc punctaj automat.
     *
     * Pentru rezolvare-completă păstrăm
     * răspunsul, dar NU pretindem că putem
     * evalua sigur o demonstrație liberă
     * prin simplă comparație de text.
     */
    const evaluation =
      answerText.trim().length > 0
        ? verificaRaspunsObiectiv(
            exercise,
            answerText
          )
        : null;

    const isCorrect =
      evaluation === null
        ? null
        : evaluation.corect;

    const awardedPoints =
      evaluation === null
        ? 0
        : evaluation.awardedPoints;

    const now =
      new Date().toISOString();

    /*
     * Metadatele structurale vin din snapshot,
     * nu din ordinea actuală a băncii.
     *
     * Asta păstrează sesiunea stabilă.
     */
    const {
      data: savedData,
      error: saveError,
    } =
      await supabase
        .from(
          "bac_simulation_answers"
        )
        .upsert(
          {
            simulation_id:
              simulation.id,

            user_id:
              user.id,

            exercise_id:
              snapshotExercise.id,

            skill_id:
              snapshotExercise
                .competenta ??
              null,

            subject_number:
              snapshotExercise
                .subjectNumber,

            exercise_order:
              snapshotExercise
                .exerciseOrder,

            max_points:
              snapshotExercise
                .maxPoints,

            awarded_points:
              awardedPoints,

            answer_text:
              answerText,

            is_correct:
              isCorrect,

            answered_at:
              answerText.trim()
                ? now
                : null,

            updated_at:
              now,
          },
          {
            onConflict:
              "simulation_id,exercise_id",
          }
        )
        .select("*")
        .single();

    if (saveError) {
      throw saveError;
    }

    /*
     * Nu trimitem:
     *
     * - raspunsCorect
     * - rezolvare
     * - explicatieFinala
     * - is_correct
     * - awarded_points
     *
     * În timpul examenului elevul nu află
     * dacă răspunsul este corect.
     */
    return NextResponse.json(
      {
        ok: true,

        answer: {
          id:
            savedData.id,

          simulation_id:
            savedData.simulation_id,

          exercise_id:
            savedData.exercise_id,

          skill_id:
            savedData.skill_id,

          subject_number:
            savedData.subject_number,

          exercise_order:
            savedData.exercise_order,

          max_points:
            savedData.max_points,

          answer_text:
            savedData.answer_text,

          answered_at:
            savedData.answered_at,

          updated_at:
            savedData.updated_at,
        },
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
      "POST /api/simulari/[id]/raspuns:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Răspunsul nu a putut fi salvat.",
      },
      {
        status: 500,

        headers: {
          "Cache-Control":
            "no-store, max-age=0",
        },
      }
    );
  }
}