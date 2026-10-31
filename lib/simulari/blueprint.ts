export type BacProfileCode =
  | "M_mate-info"
  | "M_st-nat"
  | "M_tehnologic"
  | "M_pedagogic";

export type BacSubjectNumber = 1 | 2 | 3;

export type BacSlotKind =
  | "standalone"
  | "problem-subitem";

export type BacSlotBlueprint = {
  /*
   * ID intern stabil.
   *
   * Exemple:
   * S1-1
   * S2-1-a
   * S3-2-c
   *
   * ProfileCode-ul nu este inclus aici deoarece
   * blueprint-ul părinte identifică deja profilul.
   */
  id: string;

  subjectNumber: BacSubjectNumber;

  /*
   * Poziția problemei principale în subiect.
   *
   * Pentru Subiectul I:
   * 1, 2, 3, 4, 5, 6
   *
   * Pentru structurile de tip 1.a / 1.b / 1.c:
   * problemNumber este 1 sau 2.
   */
  problemNumber: number;

  /*
   * null pentru o cerință independentă.
   * "a", "b", "c" pentru subpuncte.
   */
  subitem: "a" | "b" | "c" | null;

  kind: BacSlotKind;

  points: number;
};

export type BacSubjectBlueprint = {
  subjectNumber: BacSubjectNumber;
  title: string;
  targetPoints: number;

  /*
   * Structura formală observată în modelul oficial
   * BAC 2026 pentru profilul respectiv.
   *
   * Aceste sloturi NU afirmă încă faptul că un anumit
   * capitol matematic trebuie să apară obligatoriu
   * într-o anumită poziție.
   */
  slots: BacSlotBlueprint[];
};

export type BacBlueprint = {
  id: string;
  version: number;

  profileCode: BacProfileCode;

  examYear: number;
  sourceType: "official-model";

  durationMinutes: number;
  officialPoints: number;
  subjectPoints: number;
  totalPoints: number;

  subjects: BacSubjectBlueprint[];
};

/*
 * BAC MATE — BAC Blueprint Engine V2
 *
 * PRINCIPII:
 *
 * 1. Blueprint-ul descrie structura examenului.
 * 2. Nu generează matematică.
 * 3. Nu inventează exerciții.
 * 4. Nu conține răspunsuri sau bareme.
 * 5. Nu publică automat conținut.
 * 6. Taxonomia matematică a sloturilor va fi stabilită
 *    separat, după analiza mai multor subiecte oficiale.
 * 7. Variant Engine trebuie să consume numai exerciții
 *    verificate compatibile cu blueprint-ul.
 */

const EXAM_YEAR = 2026;
const BLUEPRINT_VERSION = 2;

const DURATION_MINUTES = 180;
const OFFICIAL_POINTS = 10;
const SUBJECT_POINTS = 90;
const TOTAL_POINTS = 100;

function standaloneSlot(
  subjectNumber: BacSubjectNumber,
  problemNumber: number
): BacSlotBlueprint {
  return {
    id: `S${subjectNumber}-${problemNumber}`,
    subjectNumber,
    problemNumber,
    subitem: null,
    kind: "standalone",
    points: 5,
  };
}

function subitemSlot(
  subjectNumber: BacSubjectNumber,
  problemNumber: number,
  subitem: "a" | "b" | "c"
): BacSlotBlueprint {
  return {
    id: `S${subjectNumber}-${problemNumber}-${subitem}`,
    subjectNumber,
    problemNumber,
    subitem,
    kind: "problem-subitem",
    points: 5,
  };
}

function sixStandaloneSlots(
  subjectNumber: BacSubjectNumber
): BacSlotBlueprint[] {
  return [
    standaloneSlot(subjectNumber, 1),
    standaloneSlot(subjectNumber, 2),
    standaloneSlot(subjectNumber, 3),
    standaloneSlot(subjectNumber, 4),
    standaloneSlot(subjectNumber, 5),
    standaloneSlot(subjectNumber, 6),
  ];
}

function twoProblemsABC(
  subjectNumber: BacSubjectNumber
): BacSlotBlueprint[] {
  return [
    subitemSlot(subjectNumber, 1, "a"),
    subitemSlot(subjectNumber, 1, "b"),
    subitemSlot(subjectNumber, 1, "c"),

    subitemSlot(subjectNumber, 2, "a"),
    subitemSlot(subjectNumber, 2, "b"),
    subitemSlot(subjectNumber, 2, "c"),
  ];
}

function subject(
  subjectNumber: BacSubjectNumber,
  slots: BacSlotBlueprint[]
): BacSubjectBlueprint {
  return {
    subjectNumber,
    title:
      subjectNumber === 1
        ? "Subiectul I"
        : subjectNumber === 2
          ? "Subiectul al II-lea"
          : "Subiectul al III-lea",

    targetPoints: 30,

    slots: slots.map((slot) => ({
      ...slot,
    })),
  };
}

/*
 * M_mate-info
 *
 * Model oficial BAC 2026:
 *
 * S I   = 6 cerințe independente × 5p
 * S II  = 2 probleme × (a, b, c) × 5p
 * S III = 2 probleme × (a, b, c) × 5p
 */
function createMateInfoSubjects(): BacSubjectBlueprint[] {
  return [
    subject(1, sixStandaloneSlots(1)),
    subject(2, twoProblemsABC(2)),
    subject(3, twoProblemsABC(3)),
  ];
}

/*
 * M_st-nat
 *
 * Model oficial BAC 2026:
 *
 * S I   = 6 cerințe independente × 5p
 * S II  = 2 probleme × (a, b, c) × 5p
 * S III = 2 probleme × (a, b, c) × 5p
 */
function createStNatSubjects(): BacSubjectBlueprint[] {
  return [
    subject(1, sixStandaloneSlots(1)),
    subject(2, twoProblemsABC(2)),
    subject(3, twoProblemsABC(3)),
  ];
}

/*
 * M_tehnologic
 *
 * Model oficial BAC 2026:
 *
 * S I   = 6 cerințe independente × 5p
 * S II  = 2 probleme × (a, b, c) × 5p
 * S III = 2 probleme × (a, b, c) × 5p
 */
function createTehnologicSubjects(): BacSubjectBlueprint[] {
  return [
    subject(1, sixStandaloneSlots(1)),
    subject(2, twoProblemsABC(2)),
    subject(3, twoProblemsABC(3)),
  ];
}

/*
 * M_pedagogic
 *
 * Model oficial BAC 2026:
 *
 * S I   = 6 cerințe independente × 5p
 * S II  = 6 cerințe independente × 5p
 * S III = 6 cerințe independente × 5p
 *
 * Nu forțăm artificial structura 1.a/1.b/1.c
 * folosită de celelalte trei profiluri.
 */
function createPedagogicSubjects(): BacSubjectBlueprint[] {
  return [
    subject(1, sixStandaloneSlots(1)),
    subject(2, sixStandaloneSlots(2)),
    subject(3, sixStandaloneSlots(3)),
  ];
}

function createBlueprint(
  profileCode: BacProfileCode,
  subjects: BacSubjectBlueprint[]
): BacBlueprint {
  return {
    id: `bac-${EXAM_YEAR}-${profileCode}`,

    version: BLUEPRINT_VERSION,

    profileCode,

    examYear: EXAM_YEAR,

    sourceType: "official-model",

    durationMinutes: DURATION_MINUTES,

    officialPoints: OFFICIAL_POINTS,

    subjectPoints: SUBJECT_POINTS,

    totalPoints: TOTAL_POINTS,

    subjects: subjects.map((item) => ({
      ...item,

      slots: item.slots.map((slot) => ({
        ...slot,
      })),
    })),
  };
}

const BLUEPRINTS: Record<
  BacProfileCode,
  BacBlueprint
> = {
  "M_mate-info": createBlueprint(
    "M_mate-info",
    createMateInfoSubjects()
  ),

  "M_st-nat": createBlueprint(
    "M_st-nat",
    createStNatSubjects()
  ),

  M_tehnologic: createBlueprint(
    "M_tehnologic",
    createTehnologicSubjects()
  ),

  M_pedagogic: createBlueprint(
    "M_pedagogic",
    createPedagogicSubjects()
  ),
};

/*
 * Alias-uri istorice / de encoding.
 *
 * Datele noi trebuie să folosească exclusiv:
 * M_st-nat
 *
 * Păstrăm însă compatibilitatea cu date deja salvate
 * sub formele vechi.
 */
const LEGACY_PROFILE_ALIASES: Record<
  string,
  BacProfileCode
> = {
  "M_șt-nat": "M_st-nat",

  "M_È™t-nat": "M_st-nat",

  "M_st-nat": "M_st-nat",
};

export function normalizeBacProfile(
  profileCode: string
): BacProfileCode {
  const value = profileCode.trim();

  const legacy =
    LEGACY_PROFILE_ALIASES[value];

  if (legacy) {
    return legacy;
  }

  if (
    value === "M_mate-info" ||
    value === "M_tehnologic" ||
    value === "M_pedagogic"
  ) {
    return value;
  }

  /*
   * Compatibilitate cu aplicația existentă.
   *
   * Nu folosim această conversie pentru importul
   * documentelor oficiale. Importerul va valida strict
   * profilul și va respinge valorile necunoscute.
   */
  return "M_mate-info";
}

export function isKnownBacProfile(
  profileCode: string
): boolean {
  const value = profileCode.trim();

  return (
    value === "M_mate-info" ||
    value === "M_st-nat" ||
    value === "M_șt-nat" ||
    value === "M_È™t-nat" ||
    value === "M_tehnologic" ||
    value === "M_pedagogic"
  );
}

export function getBacBlueprint(
  profileCode: string
): BacBlueprint {
  const normalized =
    normalizeBacProfile(profileCode);

  return BLUEPRINTS[normalized];
}

export function getAllBacBlueprints():
  BacBlueprint[] {
  return (
    Object.values(BLUEPRINTS) as BacBlueprint[]
  ).map((blueprint) => ({
    ...blueprint,

    subjects: blueprint.subjects.map(
      (subjectItem) => ({
        ...subjectItem,

        slots: subjectItem.slots.map(
          (slot) => ({
            ...slot,
          })
        ),
      })
    ),
  }));
}

export function getBacSlot(
  profileCode: string,
  slotId: string
): BacSlotBlueprint | null {
  const blueprint =
    getBacBlueprint(profileCode);

  for (const subjectItem of blueprint.subjects) {
    const slot =
      subjectItem.slots.find(
        (item) => item.id === slotId
      );

    if (slot) {
      return {
        ...slot,
      };
    }
  }

  return null;
}

export function validateBacBlueprint(
  blueprint: BacBlueprint
): string[] {
  const errors: string[] = [];

  if (blueprint.version < 1) {
    errors.push(
      "Versiunea blueprint-ului trebuie să fie pozitivă."
    );
  }

  if (blueprint.examYear !== 2026) {
    errors.push(
      `Anul blueprint-ului trebuie să fie 2026, nu ${blueprint.examYear}.`
    );
  }

  if (
    blueprint.sourceType !==
    "official-model"
  ) {
    errors.push(
      `Sursa blueprint-ului este invalidă: ${blueprint.sourceType}.`
    );
  }

  if (
    blueprint.durationMinutes !==
    DURATION_MINUTES
  ) {
    errors.push(
      `Durata trebuie să fie ${DURATION_MINUTES} minute, nu ${blueprint.durationMinutes}.`
    );
  }

  if (
    blueprint.officialPoints !==
    OFFICIAL_POINTS
  ) {
    errors.push(
      `Punctajul din oficiu trebuie să fie ${OFFICIAL_POINTS}, nu ${blueprint.officialPoints}.`
    );
  }

  if (
    blueprint.subjectPoints !==
    SUBJECT_POINTS
  ) {
    errors.push(
      `Subiectele trebuie să însumeze ${SUBJECT_POINTS}p, nu ${blueprint.subjectPoints}p.`
    );
  }

  if (
    blueprint.totalPoints !==
    TOTAL_POINTS
  ) {
    errors.push(
      `Punctajul total trebuie să fie ${TOTAL_POINTS}p, nu ${blueprint.totalPoints}p.`
    );
  }

  if (blueprint.subjects.length !== 3) {
    errors.push(
      `Trebuie să existe exact 3 subiecte, nu ${blueprint.subjects.length}.`
    );
  }

  const subjectNumbers =
    blueprint.subjects.map(
      (item) => item.subjectNumber
    );

  const uniqueSubjectNumbers =
    new Set(subjectNumbers);

  if (
    uniqueSubjectNumbers.size !==
    subjectNumbers.length
  ) {
    errors.push(
      "Există numere de subiect duplicate."
    );
  }

  for (
    const expectedNumber of [1, 2, 3] as const
  ) {
    const subjectItem =
      blueprint.subjects.find(
        (item) =>
          item.subjectNumber ===
          expectedNumber
      );

    if (!subjectItem) {
      errors.push(
        `Lipsește Subiectul ${expectedNumber}.`
      );

      continue;
    }

    if (
      subjectItem.targetPoints !== 30
    ) {
      errors.push(
        `${subjectItem.title} trebuie să aibă 30p, nu ${subjectItem.targetPoints}p.`
      );
    }

    if (
      subjectItem.slots.length !== 6
    ) {
      errors.push(
        `${subjectItem.title} trebuie să aibă 6 sloturi de câte 5p, nu ${subjectItem.slots.length}.`
      );
    }

    const slotIds = new Set<string>();

    let calculatedSlotPoints = 0;

    for (const slot of subjectItem.slots) {
      if (!slot.id.trim()) {
        errors.push(
          `${subjectItem.title} conține un slot fără ID.`
        );
      }

      if (slotIds.has(slot.id)) {
        errors.push(
          `${subjectItem.title} conține slotul duplicat ${slot.id}.`
        );
      }

      slotIds.add(slot.id);

      if (
        slot.subjectNumber !==
        subjectItem.subjectNumber
      ) {
        errors.push(
          `Slotul ${slot.id} aparține Subiectului ${slot.subjectNumber}, dar este declarat în Subiectul ${subjectItem.subjectNumber}.`
        );
      }

      if (
        !Number.isInteger(
          slot.problemNumber
        ) ||
        slot.problemNumber <= 0
      ) {
        errors.push(
          `Slotul ${slot.id} are problemNumber invalid.`
        );
      }

      if (slot.points !== 5) {
        errors.push(
          `Slotul ${slot.id} trebuie să valoreze 5p, nu ${slot.points}p.`
        );
      }

      if (
        slot.kind === "standalone" &&
        slot.subitem !== null
      ) {
        errors.push(
          `Slotul independent ${slot.id} nu poate avea subitem.`
        );
      }

      if (
        slot.kind ===
          "problem-subitem" &&
        slot.subitem === null
      ) {
        errors.push(
          `Slotul ${slot.id} trebuie să aibă subitem a, b sau c.`
        );
      }

      calculatedSlotPoints +=
        slot.points;
    }

    if (
      calculatedSlotPoints !==
      subjectItem.targetPoints
    ) {
      errors.push(
        `${subjectItem.title} are ${calculatedSlotPoints}p în sloturi, dar declară ${subjectItem.targetPoints}p.`
      );
    }
  }

  const calculatedSubjectPoints =
    blueprint.subjects.reduce(
      (total, subjectItem) =>
        total +
        subjectItem.targetPoints,
      0
    );

  if (
    calculatedSubjectPoints !==
    blueprint.subjectPoints
  ) {
    errors.push(
      `Suma subiectelor este ${calculatedSubjectPoints}p, dar blueprint-ul declară ${blueprint.subjectPoints}p.`
    );
  }

  if (
    calculatedSubjectPoints +
      blueprint.officialPoints !==
    blueprint.totalPoints
  ) {
    errors.push(
      "Punctajul subiectelor + punctele din oficiu nu este egal cu punctajul total."
    );
  }

  /*
   * Verificare globală pentru ID-urile sloturilor.
   */
  const globalSlotIds = new Set<string>();

  for (const subjectItem of blueprint.subjects) {
    for (const slot of subjectItem.slots) {
      if (globalSlotIds.has(slot.id)) {
        errors.push(
          `ID-ul de slot ${slot.id} este duplicat în blueprint.`
        );
      }

      globalSlotIds.add(slot.id);
    }
  }

  if (globalSlotIds.size !== 18) {
    errors.push(
      `Blueprint-ul trebuie să conțină exact 18 sloturi evaluate, nu ${globalSlotIds.size}.`
    );
  }

  return errors;
}

export function assertValidBacBlueprint(
  blueprint: BacBlueprint
): void {
  const errors =
    validateBacBlueprint(blueprint);

  if (errors.length === 0) {
    return;
  }

  throw new Error(
    [
      `Blueprint BAC invalid: ${blueprint.id}`,

      ...errors.map(
        (error, index) =>
          `${index + 1}. ${error}`
      ),
    ].join("\n")
  );
}

export function assertAllBacBlueprintsValid():
  void {
  const blueprints =
    getAllBacBlueprints();

  const errors: string[] = [];

  for (const blueprint of blueprints) {
    const blueprintErrors =
      validateBacBlueprint(blueprint);

    for (const error of blueprintErrors) {
      errors.push(
        `${blueprint.profileCode}: ${error}`
      );
    }
  }

  if (errors.length === 0) {
    return;
  }

  throw new Error(
    [
      "Blueprint-urile BAC sunt invalide:",

      ...errors.map(
        (error, index) =>
          `${index + 1}. ${error}`
      ),
    ].join("\n")
  );
}