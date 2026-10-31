import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";

import { createClient } from "../../../lib/supabase/server";

import {
  construiesteBancaSimulare,
} from "../../../lib/simulari/engine";

import {
  buildSimulationVariant,
  buildTrainingMixedVariant,
  isSimulationVariantSnapshot,
  SIMULATION_VARIANT_VERSION,
  type SimulationVariantHistory,
} from "../../../lib/simulari/variant-engine";

import {
  assertValidBacBlueprint,
  getBacBlueprint,
  isKnownBacProfile,
  normalizeBacProfile,
} from "../../../lib/simulari/blueprint";

/* =========================================================
   TIPURI LOCALE
========================================================= */

type CreateSimulationBody = {
  profileCode?: unknown;
};

type ExistingSimulationRow = {
  id: string;
  variant_seed: string | null;
  variant_snapshot: unknown | null;
};

type HistoricalSimulationRow = {
  id: string;
  profile_code: string;
  status:
    | "in_progress"
    | "completed"
    | "abandoned";
  variant_snapshot: unknown | null;
  created_at: string;
};

type CreatedSimulationRow = {
  id: string;
};

/* =========================================================
   CONSTANTE
========================================================= */

/*
 * Folosim ultimele 20 de simulÄƒri pentru anti-repeat.
 *
 * Ordinea venitÄƒ din Supabase este:
 * cea mai recentÄƒ -> cea mai veche.
 */
const HISTORY_SIMULATION_LIMIT = 20;

/* =========================================================
   VALIDATOARE DATE SUPABASE
========================================================= */

function isRecord(
  value: unknown
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function asNullableString(
  value: unknown
): string | null {
  return typeof value === "string"
    ? value
    : null;
}

function parseExistingSimulationRow(
  value: unknown
): ExistingSimulationRow | null {
  if (!isRecord(value)) {
    return null;
  }

  if (
    typeof value.id !== "string" ||
    !value.id
  ) {
    return null;
  }

  return {
    id: value.id,

    variant_seed:
      asNullableString(
        value.variant_seed
      ),

    variant_snapshot:
      value.variant_snapshot ?? null,
  };
}

function parseHistoricalSimulationRow(
  value: unknown
): HistoricalSimulationRow | null {
  if (!isRecord(value)) {
    return null;
  }

  if (
    typeof value.id !== "string" ||
    typeof value.profile_code !== "string" ||
    typeof value.status !== "string" ||
    typeof value.created_at !== "string"
  ) {
    return null;
  }

  if (
    value.status !== "in_progress" &&
    value.status !== "completed" &&
    value.status !== "abandoned"
  ) {
    return null;
  }

  return {
    id:
      value.id,

    profile_code:
      value.profile_code,

    status:
      value.status,

    variant_snapshot:
      value.variant_snapshot ?? null,

    created_at:
      value.created_at,
  };
}

function parseHistoricalSimulationRows(
  value: unknown
): HistoricalSimulationRow[] {
  if (!Array.isArray(value)) {
    return [];
  }

  const result:
    HistoricalSimulationRow[] = [];

  for (const item of value) {
    const parsed =
      parseHistoricalSimulationRow(
        item
      );

    if (parsed) {
      result.push(parsed);
    }
  }

  return result;
}

function parseCreatedSimulationRow(
  value: unknown
): CreatedSimulationRow | null {
  if (!isRecord(value)) {
    return null;
  }

  if (
    typeof value.id !== "string" ||
    !value.id
  ) {
    return null;
  }

  return {
    id: value.id,
  };
}

/* =========================================================
   BODY REQUEST
========================================================= */

function parseCreateSimulationBody(
  value: unknown
): string | null {
  if (!isRecord(value)) {
    return null;
  }

  const profileCode =
    value.profileCode;

  if (
    typeof profileCode !== "string"
  ) {
    return null;
  }

  const normalized = profileCode.trim();
  if (!normalized || !isKnownBacProfile(normalized)) return null;
  return normalizeBacProfile(normalized);
}

/* =========================================================
   ISTORIC ANTI-REPEAT
========================================================= */

function buildVariantHistory(
  simulations:
    readonly HistoricalSimulationRow[]
): SimulationVariantHistory {
  const recentExerciseIds:
    string[] = [];

  const recentSourceExerciseIds:
    string[] = [];

  for (
    const simulation
    of simulations
  ) {
    /*
     * IgnorÄƒm snapshot-urile vechi sau invalide.
     */
    if (
      !isSimulationVariantSnapshot(
        simulation.variant_snapshot
      )
    ) {
      continue;
    }

    /*
     * Snapshot-ul a trecut validatorul motorului,
     * deci putem parcurge subiectele È™i exerciÈ›iile.
     */
    for (
      const subject
      of simulation.variant_snapshot.subjects
    ) {
      for (
        const exercise
        of subject.exercises
      ) {
        recentExerciseIds.push(
          exercise.id
        );

        recentSourceExerciseIds.push(
          exercise.sourceExerciseId
        );
      }
    }
  }

  return {
    recentExerciseIds,
    recentSourceExerciseIds,
  };
}

/* =========================================================
   CACHE
========================================================= */

const NO_STORE_HEADERS = {
  "Cache-Control":
    "no-store, max-age=0",
};

/* =========================================================
   POST /api/simulari
========================================================= */

export async function POST(
  request: Request
) {
  try {
    const supabase =
      await createClient();

    /* =====================================================
       1. AUTENTIFICARE
    ===================================================== */

    const {
      data: authData,
      error: userError,
    } =
      await supabase.auth.getUser();

    const user =
      authData.user;

    if (
      userError ||
      !user
    ) {
      return NextResponse.json(
        {
          error:
            "Trebuie sÄƒ fii autentificat pentru a Ã®ncepe simularea.",
        },
        {
          status: 401,
          headers:
            NO_STORE_HEADERS,
        }
      );
    }

    /* =====================================================
       2. REQUEST BODY
    ===================================================== */

    let rawBody: unknown;

    try {
      rawBody =
        await request.json();
    } catch {
      return NextResponse.json(
        {
          error:
            "Datele trimise pentru simulare sunt invalide.",
        },
        {
          status: 400,
          headers:
            NO_STORE_HEADERS,
        }
      );
    }

    const profileCode =
      parseCreateSimulationBody(
        rawBody
      );

    if (!profileCode) {
      return NextResponse.json(
        {
          error:
            "Profilul BAC lipseÈ™te.",
        },
        {
          status: 400,
          headers:
            NO_STORE_HEADERS,
        }
      );
    }

    /* =====================================================
       3. BLUEPRINT
    ===================================================== */

    const blueprint =
      getBacBlueprint(
        profileCode
      );

    /*
     * DacÄƒ profilul nu are blueprint valid,
     * nu creÄƒm o simulare defectÄƒ.
     */
    assertValidBacBlueprint(
      blueprint
    );

    /* =====================================================
       4. VERIFICÄ‚M O SESIUNE DEJA ACTIVÄ‚
    ===================================================== */

    const {
      data: existingData,
      error: existingError,
    } =
      await supabase
        .from(
          "bac_simulations"
        )
        .select(
          [
            "id",
            "variant_seed",
            "variant_snapshot",
          ].join(",")
        )
        .eq(
          "user_id",
          user.id
        )
        .eq(
          "profile_code",
          profileCode
        )
        .eq(
          "status",
          "in_progress"
        )
        .order(
          "created_at",
          {
            ascending: false,
          }
        )
        .limit(1)
        .maybeSingle();

    if (existingError) {
      throw existingError;
    }

    const existing =
      parseExistingSimulationRow(
        existingData
      );

    /*
     * DacÄƒ existÄƒ deja o simulare activÄƒ,
     * nu generÄƒm alta.
     *
     * Elevul continuÄƒ aceeaÈ™i sesiune.
     */
    if (existing) {
      return NextResponse.json(
        {
          simulationId:
            existing.id,

          resumed:
            true,

          hasVariant:
            Boolean(
              existing.variant_seed &&
              existing.variant_snapshot
            ),
        },
        {
          status: 200,
          headers:
            NO_STORE_HEADERS,
        }
      );
    }

    /* =====================================================
       5. NUMÄ‚RUL SIMULÄ‚RII
    ===================================================== */

    const {
      count,
      error: countError,
    } =
      await supabase
        .from(
          "bac_simulations"
        )
        .select(
          "id",
          {
            count: "exact",
            head: true,
          }
        )
        .eq(
          "user_id",
          user.id
        );

    if (countError) {
      throw countError;
    }

    const simulationNumber =
      (count ?? 0) + 1;

    /* =====================================================
       6. BANCA DE EXERCIÈšII
    ===================================================== */

    /*
     * AceastÄƒ funcÈ›ie construieÈ™te banca din
     * Content Engine.
     *
     * Motorul existent filtreazÄƒ conÈ›inutul
     * publicabil/verificat.
     *
     * AI-ul nu inventeazÄƒ exerciÈ›ii aici.
     */
    const bank =
      construiesteBancaSimulare(
        profileCode
      );
/* Patch 09: fail closed. Nu pornim examen oficial din pool incomplet/nevalidat. */
    if (!bank.canBuildFullSimulation) {
      return NextResponse.json({ error: "Nu existÄƒ Ã®ncÄƒ o bancÄƒ oficialÄƒ verificatÄƒ complet pentru acest profil." }, { status: 409, headers: NO_STORE_HEADERS });
    }

    /* =====================================================
       7. ISTORICUL PENTRU ANTI-REPEAT
    ===================================================== */

    const {
      data: historyData,
      error: historyError,
    } =
      await supabase
        .from(
          "bac_simulations"
        )
        .select(
          [
            "id",
            "profile_code",
            "status",
            "variant_snapshot",
            "created_at",
          ].join(",")
        )
        .eq(
          "user_id",
          user.id
        )
        .eq(
          "profile_code",
          profileCode
        )
        .in(
          "status",
          [
            "completed",
            "abandoned",
          ]
        )
        .not(
          "variant_snapshot",
          "is",
          null
        )
        .order(
          "created_at",
          {
            ascending: false,
          }
        )
        .limit(
          HISTORY_SIMULATION_LIMIT
        );

    if (historyError) {
      throw historyError;
    }

    /*
     * IMPORTANT:
     *
     * Nu facem:
     *
     * historyData as HistoricalSimulationRow[]
     *
     * Supabase poate produce GenericStringError
     * la tipurile generate.
     *
     * ValidÄƒm runtime fiecare rÃ¢nd.
     */
    const historicalSimulations =
      parseHistoricalSimulationRows(
        historyData
      );

    const history =
      buildVariantHistory(
        historicalSimulations
      );

    /* =====================================================
       8. SEED UNIC
    ===================================================== */

    /*
     * Seed-ul este unic pentru sesiune.
     *
     * Variant Engine rÄƒmÃ¢ne determinist:
     *
     * aceeaÈ™i bancÄƒ
     * + acelaÈ™i seed
     * + acelaÈ™i istoric
     * = aceeaÈ™i variantÄƒ.
     */
    const seed =
      [
        "bac-mate",
        `v${SIMULATION_VARIANT_VERSION}`,
        user.id,
        String(
          simulationNumber
        ),
        randomUUID(),
      ].join(":");

    /* =====================================================
       9. GENERAREA VARIANTEI
    ===================================================== */

    const snapshot =
      buildTrainingMixedVariant(
        bank,
        seed,
        { history }
      );

    /* =====================================================
       10. GATE PROFIL
    ===================================================== */

    if (
      snapshot.profileCode !==
      bank.profileCode
    ) {
      throw new Error(
        "Generatorul variantei a returnat un profil incompatibil."
      );
    }

    /* =====================================================
       11. GATE STRUCTURAL
    ===================================================== */

    if (
      !isSimulationVariantSnapshot(
        snapshot
      )
    ) {
      throw new Error(
        "Generatorul variantei a produs un snapshot invalid."
      );
    }

    /* =====================================================
       12. PERSISTENÈšÄ‚
    ===================================================== */

    /*
     * Snapshot-ul este salvat o singurÄƒ datÄƒ,
     * la crearea simulÄƒrii.
     *
     * Astfel refresh / relogin nu trebuie sÄƒ
     * genereze altÄƒ variantÄƒ.
     *
     * Snapshot-ul studentului nu trebuie sÄƒ
     * conÈ›inÄƒ baremul privat:
     *
     * - raspunsCorect
     * - rezolvare
     * - explicatieFinala
     */
    const {
      data: simulationData,
      error: insertError,
    } =
      await supabase
        .from(
          "bac_simulations"
        )
        .insert({
          user_id:
            user.id,

          profile_code:
            profileCode,

          simulation_number:
            simulationNumber,

          status:
            "in_progress",

          duration_minutes:
            blueprint.durationMinutes,

          time_spent_seconds:
            0,

          subject_1_score:
            null,

          subject_2_score:
            null,

          subject_3_score:
            null,

          official_points:
            blueprint.officialPoints,

          total_score:
            null,

          variant_seed:
            seed,

          variant_snapshot:
            snapshot,

          variant_version:
            SIMULATION_VARIANT_VERSION,
        })
        .select(
          "id"
        )
        .single();

    if (insertError) {
      throw insertError;
    }

    const createdSimulation =
      parseCreatedSimulationRow(
        simulationData
      );

    if (!createdSimulation) {
      throw new Error(
        "Sesiunea de simulare nu a putut fi creatÄƒ."
      );
    }

    /* =====================================================
       13. RÄ‚SPUNS CÄ‚TRE CLIENT
    ===================================================== */

    /*
     * Nu trimitem browserului:
     *
     * - seed-ul
     * - istoricul intern
     * - baremul
     */
    return NextResponse.json(
      {
        simulationId:
          createdSimulation.id,

        resumed:
          false,

        hasVariant:
          true,

        variantVersion:
          SIMULATION_VARIANT_VERSION,

        antiRepeat: {
          enabled:
            true,

          historicalSimulationsUsed:
            historicalSimulations.length,

          recentExercisesConsidered:
            history
              .recentExerciseIds
              ?.length ?? 0,
        },
      },
      {
        status: 201,
        headers:
          NO_STORE_HEADERS,
      }
    );
  } catch (error) {
    console.error(
      "POST /api/simulari:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Simularea nu a putut fi creatÄƒ.",
      },
      {
        status: 500,
        headers:
          NO_STORE_HEADERS,
      }
    );
  }
}

