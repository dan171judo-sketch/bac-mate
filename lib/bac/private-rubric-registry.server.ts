import path from "node:path";
import rubric2026MateInfo from "@/data/bac/private-rubrics-bac-2026-model-M_mate-info.json";
import bank2026MateInfo from "@/data/bac/banks/bac-2026-model-M_mate-info.json";
import {
  getOfficialVariantById,
  getOfficialVariants,
  variantIdFromReleaseId,
} from "@/lib/bac/official-variant-catalog";

export type PrivateRubricStep = { points: number; criterion: string };

export type PrivateExerciseRubric = {
  slotId: string;
  statement: string;
  maxPoints: 5;
  sourcePage: number;
  steps: PrivateRubricStep[];
};

export type PrivateRubricRelease = {
  releaseId: string;
  variantId: string;
  profileCode: string;
  rubricSha256: string;
  verification: "structured-verified";
  rubrics: PrivateExerciseRubric[];
};

function benchmarkVariantId(): string | null {
  const variant = getOfficialVariants("M_mate-info").find(
    (item) => item.session === "model" && item.variantToken === "model",
  );
  return variant?.id ?? null;
}

function buildBenchmarkRelease(releaseId: string): PrivateRubricRelease | null {
  const variantId = variantIdFromReleaseId(releaseId);
  const expectedVariantId = benchmarkVariantId();
  if (!variantId || !expectedVariantId || variantId !== expectedVariantId) return null;

  const variant = getOfficialVariantById(variantId);
  if (!variant) return null;

  const declaredRubricFile = path.basename(String(rubric2026MateInfo.source?.file ?? ""));
  const catalogRubricFile = path.basename(variant.rubricPath);
  if (!declaredRubricFile || declaredRubricFile !== catalogRubricFile) return null;

  const statements = new Map(
    (bank2026MateInfo.exercises as Array<{ slotId: string; statement: string }>).map(
      (item) => [String(item.slotId).trim(), String(item.statement).trim()],
    ),
  );

  const raw = rubric2026MateInfo.rubrics as Array<{
    slotId: string;
    maxPoints: number;
    sourcePage: number;
    steps: Array<{ points: number; criterion: string }>;
  }>;

  if (raw.length !== 18 || statements.size !== 18) return null;

  const seen = new Set<string>();
  const rubrics: PrivateExerciseRubric[] = [];

  for (const item of raw) {
    const slotId = String(item.slotId ?? "").trim();
    const statement = statements.get(slotId) ?? "";
    const steps = Array.isArray(item.steps)
      ? item.steps.map((step) => ({
          points: Number(step.points),
          criterion: String(step.criterion ?? "").trim(),
        }))
      : [];
    const total = steps.reduce((sum, step) => sum + step.points, 0);

    if (
      !slotId || !statement || seen.has(slotId) ||
      Number(item.maxPoints) !== 5 || total !== 5 || steps.length === 0 ||
      steps.some((step) => !step.criterion || !Number.isInteger(step.points) || step.points <= 0)
    ) return null;

    seen.add(slotId);
    rubrics.push({
      slotId,
      statement,
      maxPoints: 5,
      sourcePage: Number(item.sourcePage) || 1,
      steps,
    });
  }

  return {
    releaseId,
    variantId,
    profileCode: variant.profileCode,
    rubricSha256: variant.rubricSha256,
    verification: "structured-verified",
    rubrics,
  };
}

export function getPrivateRubricRelease(releaseId: string): PrivateRubricRelease | null {
  return buildBenchmarkRelease(releaseId);
}

export function getPrivateRubricForSlot(
  releaseId: string,
  slotId: string,
): PrivateExerciseRubric | null {
  const release = getPrivateRubricRelease(releaseId);
  if (!release) return null;
  const rubric = release.rubrics.find((item) => item.slotId === slotId);
  return rubric
    ? { ...rubric, steps: rubric.steps.map((step) => ({ ...step })) }
    : null;
}
