import type {
  BancaSimulare,
  ExercitiuSimulareCuBarem,
  SubiectSimulare,
} from "./engine";

/*
 * BAC MATE — Variant Engine V2
 *
 * Rol:
 * - primește banca verificată de exerciții;
 * - construiește o variantă stabilă pe baza unui seed;
 * - același seed + același istoric => aceeași variantă;
 * - preferă exercițiile nevăzute recent;
 * - dacă banca este prea mică, reutilizează controlat;
 * - NU generează matematică;
 * - NU modifică exercițiile;
 * - NU inventează bareme;
 * - selectează numai din banca primită.
 */

export const SIMULATION_VARIANT_VERSION = 3;

export type SnapshotExercise = {
  id: string;
  sourceExerciseId: string;
  sourceReleaseId?: string;
  contentFingerprint?: string;
  lessonSlug: string;
  lessonTitle: string;

  subjectNumber: SubiectSimulare;
  exerciseOrder: number;
  slotId?: string;

  nivel:
    ExercitiuSimulareCuBarem["nivel"];

  tip:
    ExercitiuSimulareCuBarem["tip"];

  enunt: string;
  variante?: string[];

  maxPoints: number;
  competenta?: string;
};

export type SnapshotSubject = {
  subjectNumber: SubiectSimulare;
  title: string;
  targetPoints: number;
  availablePoints: number;
  exercises: SnapshotExercise[];
};

export type SimulationVariantSnapshot = {
  version: number;
  seed: string;
  profileCode: string;
  generatedAt: string;

  lessonsAvailable: number;
  exercisesAvailable: number;

  totalSelectedPoints: number;

  canBuildFullSimulation: boolean;

  subjects: SnapshotSubject[];
};

/*
 * Un item recent poate apărea de mai multe ori
 * în istoric.
 *
 * Cu cât este mai sus în listă, cu atât îl
 * considerăm mai recent.
 */
export type SimulationVariantHistory = {
  recentExerciseIds?: readonly string[];
  recentSourceExerciseIds?: readonly string[];
};

export type BuildSimulationVariantOptions = {
  history?: SimulationVariantHistory;
};

type RandomGenerator =
  () => number;

type ExerciseHistoryInfo = {
  recentlyUsed: boolean;
  recencyRank: number;
};

/*
 * Transformăm seed-ul într-un număr stabil
 * pe 32 de biți.
 *
 * Nu este criptografie.
 * Avem nevoie doar de determinism.
 */
function hashSeed(
  value: string
): number {
  let hash =
    2166136261;

  for (
    let index = 0;
    index < value.length;
    index += 1
  ) {
    hash ^=
      value.charCodeAt(
        index
      );

    hash = Math.imul(
      hash,
      16777619
    );
  }

  return hash >>> 0;
}

/*
 * PRNG determinist.
 */
function createSeededRandom(
  seed: string
): RandomGenerator {
  let state =
    hashSeed(seed) ||
    0x6d2b79f5;

  return () => {
    state +=
      0x6d2b79f5;

    let value =
      state;

    value = Math.imul(
      value ^
        (value >>> 15),
      value | 1
    );

    value ^=
      value +
      Math.imul(
        value ^
          (value >>> 7),
        value | 61
      );

    return (
      (
        (
          value ^
          (value >>> 14)
        ) >>>
        0
      ) /
      4294967296
    );
  };
}

function shuffleDeterministic<T>(
  items: readonly T[],
  random: RandomGenerator
): T[] {
  const result =
    [...items];

  for (
    let index =
      result.length - 1;
    index > 0;
    index -= 1
  ) {
    const randomIndex =
      Math.floor(
        random() *
          (index + 1)
      );

    const current =
      result[index];

    result[index] =
      result[randomIndex];

    result[randomIndex] =
      current;
  }

  return result;
}

function validPoints(
  value: number
): number {
  if (
    !Number.isFinite(
      value
    ) ||
    value <= 0
  ) {
    return 0;
  }

  return value;
}

function cleanHistoryIds(
  values:
    | readonly string[]
    | undefined
): string[] {
  if (!values) {
    return [];
  }

  return values
    .map(
      (value) =>
        typeof value ===
        "string"
          ? value.trim()
          : ""
    )
    .filter(Boolean);
}

/*
 * Construim rank-ul de recență.
 *
 * Convenție:
 * index 0 = cel mai recent.
 *
 * Un rank mai mic înseamnă
 * "folosit mai recent".
 */
function buildRecencyMap(
  values:
    | readonly string[]
    | undefined
): Map<string, number> {
  const clean =
    cleanHistoryIds(
      values
    );

  const result =
    new Map<
      string,
      number
    >();

  for (
    let index = 0;
    index <
    clean.length;
    index += 1
  ) {
    const value =
      clean[index];

    /*
     * Păstrăm prima apariție,
     * adică apariția cea mai recentă.
     */
    if (
      !result.has(
        value
      )
    ) {
      result.set(
        value,
        index
      );
    }
  }

  return result;
}

function getHistoryInfo(
  exercise:
    ExercitiuSimulareCuBarem,
  exerciseRecency:
    Map<string, number>,
  sourceRecency:
    Map<string, number>
): ExerciseHistoryInfo {
  const exerciseRank =
    exerciseRecency.get(
      exercise.id
    );

  const sourceRank =
    sourceRecency.get(
      exercise.sourceExerciseId
    );

  const ranks =
    [
      exerciseRank,
      sourceRank,
    ].filter(
      (
        value
      ): value is number =>
        typeof value ===
        "number"
    );

  if (
    ranks.length === 0
  ) {
    return {
      recentlyUsed:
        false,

      recencyRank:
        Number.POSITIVE_INFINITY,
    };
  }

  return {
    recentlyUsed:
      true,

    recencyRank:
      Math.min(
        ...ranks
      ),
  };
}

/*
 * Ordonare anti-repeat:
 *
 * 1. itemii nevăzuți recent vin primii;
 * 2. itemii recenți vin după ei;
 * 3. dintre itemii recenți preferăm
 *    itemul folosit mai demult;
 * 4. seed-ul păstrează diversitatea
 *    în interiorul aceleiași priorități.
 */
function orderExercisesWithHistory(
  source:
    readonly ExercitiuSimulareCuBarem[],
  random: RandomGenerator,
  history:
    SimulationVariantHistory
): ExercitiuSimulareCuBarem[] {
  const exerciseRecency =
    buildRecencyMap(
      history.recentExerciseIds
    );

  const sourceRecency =
    buildRecencyMap(
      history.recentSourceExerciseIds
    );

  /*
   * Shuffle-ul se face înainte de sortarea
   * stabilă, astfel încât seed-ul decide
   * ordinea itemilor cu aceeași prioritate.
   */
  const shuffled =
    shuffleDeterministic(
      source,
      random
    );

  return shuffled.sort(
    (left, right) => {
      const leftInfo =
        getHistoryInfo(
          left,
          exerciseRecency,
          sourceRecency
        );

      const rightInfo =
        getHistoryInfo(
          right,
          exerciseRecency,
          sourceRecency
        );

      if (
        leftInfo.recentlyUsed !==
        rightInfo.recentlyUsed
      ) {
        return leftInfo.recentlyUsed
          ? 1
          : -1;
      }

      /*
       * Ambele sunt nevăzute recent.
       * Păstrăm ordinea dată de seed.
       */
      if (
        !leftInfo.recentlyUsed &&
        !rightInfo.recentlyUsed
      ) {
        return 0;
      }

      /*
       * Ambele au fost văzute.
       *
       * Rank mai mare =
       * mai puțin recent =
       * preferat.
       */
      if (
        leftInfo.recencyRank !==
        rightInfo.recencyRank
      ) {
        return (
          rightInfo.recencyRank -
          leftInfo.recencyRank
        );
      }

      return 0;
    }
  );
}

/*
 * Alegem exerciții până ajungem cât mai
 * aproape de punctajul țintă.
 *
 * Priorități:
 * 1. nu depășim punctajul;
 * 2. preferăm itemi nevăzuți recent;
 * 3. diversificăm lecțiile;
 * 4. seed-ul decide între candidați
 *    cu aceeași prioritate;
 * 5. dacă banca este mică, permitem
 *    reutilizare controlată.
 */
function expectedSlots(subjectNumber:SubiectSimulare):string[]{return subjectNumber===1?["S1-1","S1-2","S1-3","S1-4","S1-5","S1-6"]:[`S${subjectNumber}-1-a`,`S${subjectNumber}-1-b`,`S${subjectNumber}-1-c`,`S${subjectNumber}-2-a`,`S${subjectNumber}-2-b`,`S${subjectNumber}-2-c`]}
function selectExercisesForSubject(source:readonly ExercitiuSimulareCuBarem[],targetPoints:number,random:RandomGenerator,history:SimulationVariantHistory):ExercitiuSimulareCuBarem[]{if(targetPoints!==30)return[];const subjectNumber=source[0]?.subjectNumber;if(subjectNumber!==1&&subjectNumber!==2&&subjectNumber!==3)return[];const selected:ExercitiuSimulareCuBarem[]=[];const fingerprints=new Set<string>();for(const slot of expectedSlots(subjectNumber)){const candidates=source.filter(x=>x.slotId===slot&&!fingerprints.has(x.contentFingerprint??`${x.slotId}:${x.enunt}`));const ordered=orderExercisesWithHistory(candidates,random,history);const chosen=ordered[0];if(!chosen)return[];selected.push(chosen);fingerprints.add(chosen.contentFingerprint??`${chosen.slotId}:${chosen.enunt}`)}return selected}

function toSnapshotExercise(
  exercise:
    ExercitiuSimulareCuBarem,
  exerciseOrder: number
): SnapshotExercise {
  return {
    id:
      exercise.id,

    sourceExerciseId:
      exercise.sourceExerciseId,

    sourceReleaseId:
      exercise.sourceReleaseId,

    contentFingerprint:
      exercise.contentFingerprint,

    lessonSlug:
      exercise.lessonSlug,

    lessonTitle:
      exercise.lessonTitle,

    subjectNumber:
      exercise.subjectNumber,

    exerciseOrder,

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
        ? [
            ...exercise.variante,
          ]
        : undefined,

    maxPoints:
      exercise.maxPoints,

    competenta:
      exercise.competenta,
  };
}

function selectedPoints(
  exercises:
    readonly SnapshotExercise[]
): number {
  return exercises.reduce(
    (
      total,
      exercise
    ) =>
      total +
      validPoints(
        exercise.maxPoints
      ),
    0
  );
}

function buildSubjectSnapshot(
  subject:
    BancaSimulare["subjects"][number],
  seed: string,
  history:
    SimulationVariantHistory
): SnapshotSubject {
  /*
   * Seed separat pe subiect.
   */
  const subjectSeed =
    `${seed}:subject:${subject.subjectNumber}`;

  const random =
    createSeededRandom(
      subjectSeed
    );

  const selected =
    selectExercisesForSubject(
      subject.exercises,
      subject.targetPoints,
      random,
      history
    );

  const exercises =
    selected.map(
      (
        exercise,
        index
      ) =>
        toSnapshotExercise(
          exercise,
          index + 1
        )
    );

  return {
    subjectNumber:
      subject.subjectNumber,

    title:
      subject.title,

    targetPoints:
      subject.targetPoints,

    availablePoints:
      selectedPoints(
        exercises
      ),

    exercises,
  };
}

/*
 * API V2.
 *
 * Compatibilitate:
 *
 * buildSimulationVariant(
 *   bank,
 *   seed
 * )
 *
 * continuă să funcționeze.
 *
 * Anti-repeat:
 *
 * buildSimulationVariant(
 *   bank,
 *   seed,
 *   {
 *     history: {
 *       recentExerciseIds: [...],
 *       recentSourceExerciseIds: [...]
 *     }
 *   }
 * )
 */
function chooseOfficialReleaseId(
  bank: BancaSimulare,
  seed: string,
  history: SimulationVariantHistory
): string | null {
  const releases = Array.from(new Set(
    bank.subjects.flatMap((subject) => subject.exercises.map((exercise) => exercise.sourceReleaseId).filter((value): value is string => Boolean(value?.startsWith("official-pdf:"))))
  ));
  if (!releases.length) return null;
  const recent = cleanHistoryIds(history.recentSourceExerciseIds);
  const rank = (releaseId: string) => {
    const index = recent.findIndex((id) => id.startsWith(`${releaseId}::`));
    return index < 0 ? Number.MAX_SAFE_INTEGER : index;
  };
  const random = createSeededRandom(`${seed}:official-release`);
  return shuffleDeterministic(releases, random).sort((a, b) => rank(b) - rank(a))[0] ?? null;
}

function filterBankToRelease(bank: BancaSimulare, releaseId: string | null): BancaSimulare {
  if (!releaseId) return bank;
  return {
    ...bank,
    exercisesAvailable: 18,
    totalAvailablePoints: 90,
    subjects: bank.subjects.map((subject) => ({
      ...subject,
      exercises: subject.exercises.filter((exercise) => exercise.sourceReleaseId === releaseId),
      availablePoints: 30,
    })),
  };
}

export function buildSimulationVariant(
  bank: BancaSimulare,
  seed: string,
  options:
    BuildSimulationVariantOptions =
      {}
): SimulationVariantSnapshot {
  const cleanSeed =
    seed.trim();

  if (!cleanSeed) {
    throw new Error(
      "Seed-ul variantei de simulare lipsește."
    );
  }

  const history =
    options.history ?? {};

  const selectedBank = filterBankToRelease(
    bank,
    chooseOfficialReleaseId(bank, cleanSeed, history)
  );

  const subjects =
    selectedBank.subjects.map(
      (subject) =>
        buildSubjectSnapshot(
          subject,
          cleanSeed,
          history
        )
    );

  const totalSelectedPoints =
    subjects.reduce(
      (
        total,
        subject
      ) =>
        total +
        subject.availablePoints,
      0
    );

  const canBuildFullSimulation =
    subjects.every(
      (subject) =>
        subject.availablePoints ===
        subject.targetPoints
    );

  return {
    version:
      SIMULATION_VARIANT_VERSION,

    seed:
      cleanSeed,

    profileCode:
      selectedBank.profileCode,

    generatedAt:
      new Date().toISOString(),

    lessonsAvailable:
      selectedBank.lessonsAvailable,

    exercisesAvailable:
      subjects.reduce(
        (
          total,
          subject
        ) =>
          total +
          subject.exercises.length,
        0
      ),

    totalSelectedPoints,

    canBuildFullSimulation,

    subjects,
  };
}

/*
 * Verificare defensivă pentru snapshot-ul
 * citit ulterior din Supabase.
 *
 * Acceptăm snapshot V1 și V2.
 *
 * Motiv:
 * simulările deja începute/finalizate cu
 * versiunea anterioară trebuie să rămână
 * lizibile după upgrade.
 */
export function isSimulationVariantSnapshot(
  value: unknown
): value is SimulationVariantSnapshot {
  if (
    typeof value !==
      "object" ||
    value === null
  ) {
    return false;
  }

  const candidate =
    value as Partial<
      SimulationVariantSnapshot
    >;

  if (
    (candidate.version !== 1 && candidate.version !== 2 && candidate.version !== SIMULATION_VARIANT_VERSION) ||
    typeof candidate.seed !==
      "string" ||
    !candidate.seed ||
    typeof candidate.profileCode !==
      "string" ||
    !candidate.profileCode ||
    !Array.isArray(
      candidate.subjects
    ) ||
    candidate.subjects.length !==
      3
  ) {
    return false;
  }

  const subjectNumbers =
    new Set<number>();

  const exerciseIds =
    new Set<string>();

  for (
    const subject
    of candidate.subjects
  ) {
    if (
      typeof subject !==
        "object" ||
      subject === null
    ) {
      return false;
    }

    if (
      subject.subjectNumber !==
        1 &&
      subject.subjectNumber !==
        2 &&
      subject.subjectNumber !==
        3
    ) {
      return false;
    }

    if (
      subjectNumbers.has(
        subject.subjectNumber
      )
    ) {
      return false;
    }

    subjectNumbers.add(
      subject.subjectNumber
    );

    if (
      typeof subject.targetPoints !==
        "number" ||
      !Number.isFinite(
        subject.targetPoints
      ) ||
      subject.targetPoints <= 0 ||
      typeof subject.availablePoints !==
        "number" ||
      !Number.isFinite(
        subject.availablePoints
      ) ||
      subject.availablePoints < 0 ||
      subject.availablePoints >
        subject.targetPoints ||
      !Array.isArray(
        subject.exercises
      )
    ) {
      return false;
    }

    let calculatedPoints =
      0;

    for (
      let index = 0;
      index <
      subject.exercises.length;
      index += 1
    ) {
      const exercise =
        subject.exercises[
          index
        ];

      if (
        typeof exercise !==
          "object" ||
        exercise === null ||
        typeof exercise.id !==
          "string" ||
        !exercise.id ||
        typeof exercise.sourceExerciseId !==
          "string" ||
        !exercise.sourceExerciseId ||
        typeof exercise.lessonSlug !==
          "string" ||
        !exercise.lessonSlug ||
        typeof exercise.enunt !==
          "string" ||
        typeof exercise.maxPoints !==
          "number" ||
        !Number.isFinite(
          exercise.maxPoints
        ) ||
        exercise.maxPoints <=
          0
      ) {
        return false;
      }

      if (
        exercise.subjectNumber !==
        subject.subjectNumber
      ) {
        return false;
      }

      if (
        exercise.exerciseOrder !==
        index + 1
      ) {
        return false;
      }

      /*
       * Un exercițiu nu poate apărea
       * de două ori în același snapshot.
       */
      if (
        exerciseIds.has(
          exercise.id
        )
      ) {
        return false;
      }

      exerciseIds.add(
        exercise.id
      );

      calculatedPoints +=
        exercise.maxPoints;
    }

    if (
      calculatedPoints !==
      subject.availablePoints
    ) {
      return false;
    }
  }

  if (candidate.version === SIMULATION_VARIANT_VERSION) {
    for (const subject of candidate.subjects) {
      const required = expectedSlots(subject.subjectNumber);
      const actual = subject.exercises.map((exercise) => exercise.slotId);
      if (subject.targetPoints !== 30 || subject.availablePoints !== 30 || actual.length !== 6) return false;
      if (!required.every((slot, index) => actual[index] === slot)) return false;
    }
    if (candidate.totalSelectedPoints !== 90 || candidate.canBuildFullSimulation !== true) return false;
  }

  return (
    subjectNumbers.has(1) &&
    subjectNumbers.has(2) &&
    subjectNumbers.has(3)
  );
}
export function buildTrainingMixedVariant(
  bank: BancaSimulare,
  seed: string,
  options: BuildSimulationVariantOptions = {}
): SimulationVariantSnapshot {
  const cleanSeed = seed.trim();
  if (!cleanSeed) throw new Error("Seed-ul variantei de antrenament lipsește.");
  const history = options.history ?? {};
  const subjects = bank.subjects.map((subject) =>
    buildSubjectSnapshot(subject, `${cleanSeed}:training-mixed`, history)
  );
  const totalSelectedPoints = subjects.reduce((total, subject) => total + subject.availablePoints, 0);
  const canBuildFullSimulation = subjects.every((subject) => subject.availablePoints === subject.targetPoints);
  return {
    version: SIMULATION_VARIANT_VERSION, seed: cleanSeed, profileCode: bank.profileCode,
    generatedAt: new Date().toISOString(), lessonsAvailable: bank.lessonsAvailable,
    exercisesAvailable: subjects.reduce((total, subject) => total + subject.exercises.length, 0),
    totalSelectedPoints, canBuildFullSimulation, subjects,
  };
}
