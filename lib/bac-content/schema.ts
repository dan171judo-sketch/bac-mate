import type {
  BacProfileCode,
  BacSubjectNumber,
} from "../simulari/blueprint";

export type BacOfficialDocumentType =
  | "model"
  | "exam"
  | "simulation";

export type BacVerificationStatus =
  | "draft"
  | "extracted"
  | "matched"
  | "review"
  | "verified"
  | "rejected";

export type BacVerification = {
  sourceVerified: boolean;
  extractionVerified: boolean;
  structureVerified: boolean;
  answerKeyVerified: boolean;
  pointsVerified: boolean;
  mathVerified: boolean;
  curriculumVerified: boolean;
  humanVerified: boolean;

  status: BacVerificationStatus;
};

export type BacOfficialSource = {
  authority:
    | "Ministerul Educatiei si Cercetarii"
    | "CNCE";

  exam: "bacalaureat";

  year: number;

  documentType: BacOfficialDocumentType;

  session: string;

  profileCode: BacProfileCode;

  /*
   * Identificator intern al documentului.
   *
   * Exemplu:
   * bac-2026-model-mate-info-subiect
   */
  documentId: string;

  /*
   * Fișierul original trebuie păstrat.
   * Nu tratăm textul extras ca înlocuitor
   * al PDF-ului oficial.
   */
  originalFileName: string;

  /*
   * Poate fi completat ulterior cu URL-ul
   * oficial exact de unde a provenit PDF-ul.
   */
  officialUrl: string | null;
};

export type BacAnswerType =
  | "short-answer"
  | "multiple-choice"
  | "full-solution";

export type BacOfficialExercise = {
  /*
   * ID unic BAC MATE.
   *
   * Nu depindem de enunț pentru identitate.
   */
  id: string;

  source: BacOfficialSource;

  profileCode: BacProfileCode;

  subjectNumber: BacSubjectNumber;

  /*
   * ID-ul slotului din Blueprint V2:
   *
   * S1-1
   * S2-1-a
   * S3-2-c
   */
  slotId: string;

  problemNumber: number;

  subitem:
    | "a"
    | "b"
    | "c"
    | null;

  points: number;

  answerType: BacAnswerType;

  /*
   * IMPORTANT:
   *
   * statementRaw păstrează rezultatul
   * importului/extragerii.
   *
   * statementVerified este textul care a
   * fost comparat cu documentul oficial.
   *
   * Simulatorul NU va consuma statementRaw.
   */
  statementRaw: string;

  statementVerified: string | null;

  /*
   * Baremul nu trebuie trimis în snapshot-ul
   * vizibil elevului.
   */
  answerKeyRaw: string;

  answerKeyVerified: string | null;

  solutionVerified: string | null;

  /*
   * Clasificarea curriculară vine după
   * verificarea conținutului.
   *
   * Nu deducem automat că poziția unui
   * exercițiu în model definește permanent
   * capitolul acelui slot.
   */
  skillId: string | null;

  lessonSlug: string | null;

  verification: BacVerification;
};

export type BacOfficialPaper = {
  id: string;

  source: BacOfficialSource;

  profileCode: BacProfileCode;

  year: number;

  durationMinutes: number;

  officialPoints: number;

  subjectPoints: number;

  totalPoints: number;

  exercises: BacOfficialExercise[];

  verification: BacVerification;
};

export function createDraftVerification():
  BacVerification {
  return {
    sourceVerified: false,
    extractionVerified: false,
    structureVerified: false,
    answerKeyVerified: false,
    pointsVerified: false,
    mathVerified: false,
    curriculumVerified: false,
    humanVerified: false,

    status: "draft",
  };
}

export function isFullyVerified(
  verification: BacVerification
): boolean {
  return (
    verification.sourceVerified === true &&
    verification.extractionVerified === true &&
    verification.structureVerified === true &&
    verification.answerKeyVerified === true &&
    verification.pointsVerified === true &&
    verification.mathVerified === true &&
    verification.curriculumVerified === true &&
    verification.humanVerified === true &&
    verification.status === "verified"
  );
}

export function isExercisePublishable(
  exercise: BacOfficialExercise
): boolean {
  return (
    exercise.statementVerified !== null &&
    exercise.statementVerified.trim().length > 0 &&
    exercise.answerKeyVerified !== null &&
    exercise.answerKeyVerified.trim().length > 0 &&
    exercise.points === 5 &&
    isFullyVerified(exercise.verification)
  );
}