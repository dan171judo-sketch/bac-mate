import { getPrivateRubricForSlot } from "@/lib/bac/private-rubric-registry.server";

export type MateGradingEvidence = {
  rubricStep: number;
  awardedPoints: number;
  maxPoints: number;
  explanation: string;
};

export type MateGradingResult =
  | {
      state: "graded";
      awardedPoints: number;
      maxPoints: 5;
      confidence: number;
      evidence: MateGradingEvidence[];
      reason: "mate-evaluated-against-private-rubric";
    }
  | {
      state: "pending";
      awardedPoints: null;
      maxPoints: 5;
      confidence: null;
      evidence: [];
      reason:
        | "blank-answer"
        | "private-rubric-unavailable"
        | "mate-provider-not-configured"
        | "mate-provider-error"
        | "mate-invalid-output"
        | "mate-low-confidence";
    };

export type MateGradingInput = {
  releaseId: string;
  slotId: string;
  answerText: string;
};

type ProviderStep = {
  rubricStep: number;
  awardedPoints: number;
  explanation: string;
};

type ProviderOutput = {
  confidence: number;
  steps: ProviderStep[];
};

const MIN_CONFIDENCE = 0.90;

function pending(reason: Extract<MateGradingResult, { state: "pending" }>["reason"]): MateGradingResult {
  return { state: "pending", awardedPoints: null, maxPoints: 5, confidence: null, evidence: [], reason };
}

function extractOutputText(value: unknown): string | null {
  if (!value || typeof value !== "object") return null;
  const response = value as { output_text?: unknown; output?: unknown };
  if (typeof response.output_text === "string" && response.output_text.trim()) return response.output_text;
  if (!Array.isArray(response.output)) return null;
  for (const item of response.output) {
    if (!item || typeof item !== "object") continue;
    const content = (item as { content?: unknown }).content;
    if (!Array.isArray(content)) continue;
    for (const part of content) {
      if (!part || typeof part !== "object") continue;
      const text = (part as { text?: unknown }).text;
      if (typeof text === "string" && text.trim()) return text;
    }
  }
  return null;
}

export async function gradeWithMate(input: MateGradingInput): Promise<MateGradingResult> {
  if (!input.answerText.trim()) return pending("blank-answer");

  const rubric = getPrivateRubricForSlot(input.releaseId, input.slotId);
  if (!rubric) return pending("private-rubric-unavailable");

  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) return pending("mate-provider-not-configured");

  const model = process.env.BAC_MATE_GRADER_MODEL?.trim() || "gpt-5.6";

  const schema = {
    type: "object",
    properties: {
      confidence: { type: "number", minimum: 0, maximum: 1 },
      steps: {
        type: "array",
        items: {
          type: "object",
          properties: {
            rubricStep: { type: "integer", minimum: 1 },
            awardedPoints: { type: "integer", minimum: 0 },
            explanation: { type: "string" },
          },
          required: ["rubricStep", "awardedPoints", "explanation"],
          additionalProperties: false,
        },
      },
    },
    required: ["confidence", "steps"],
    additionalProperties: false,
  };

  const privateRubric = rubric.steps
    .map((step, index) => `${index + 1}. [max ${step.points}p] ${step.criterion}`)
    .join("\n");

  let response: Response;
  try {
    response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        store: false,
        reasoning: { effort: "high" },
        input: [
          {
            role: "system",
            content:
              "Ești evaluator BAC la matematică. Evaluezi EXCLUSIV după baremul privat furnizat. " +
              "Nu inventezi criterii, nu transferi puncte între pași și nu acorzi mai mult decât maximul fiecărui pas. " +
              "Accepți soluții matematic echivalente corecte. Dacă răspunsul nu demonstrează un pas, acel pas primește 0. " +
              "Explicațiile trebuie să indice doar ce este demonstrat în răspunsul elevului.",
          },
          {
            role: "user",
            content:
              `CERINȚĂ OFICIALĂ:\n${rubric.statement}\n\n` +
              `BAREM PRIVAT:\n${privateRubric}\n\n` +
              `RĂSPUNS ELEV:\n${input.answerText}`,
          },
        ],
        text: {
          format: {
            type: "json_schema",
            name: "bac_math_grading",
            strict: true,
            schema,
          },
        },
      }),
      signal: AbortSignal.timeout(45000),
    });
  } catch {
    return pending("mate-provider-error");
  }

  if (!response.ok) return pending("mate-provider-error");

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    return pending("mate-invalid-output");
  }

  const outputText = extractOutputText(payload);
  if (!outputText) return pending("mate-invalid-output");

  let parsed: ProviderOutput;
  try {
    parsed = JSON.parse(outputText) as ProviderOutput;
  } catch {
    return pending("mate-invalid-output");
  }

  if (
    !parsed || !Number.isFinite(parsed.confidence) ||
    parsed.confidence < 0 || parsed.confidence > 1 ||
    !Array.isArray(parsed.steps) ||
    parsed.steps.length !== rubric.steps.length
  ) return pending("mate-invalid-output");

  const seen = new Set<number>();
  const evidence: MateGradingEvidence[] = [];

  for (const step of parsed.steps) {
    const index = Number(step.rubricStep);
    const awarded = Number(step.awardedPoints);
    const rubricStep = rubric.steps[index - 1];

    if (
      !Number.isInteger(index) || !rubricStep || seen.has(index) ||
      !Number.isInteger(awarded) || awarded < 0 || awarded > rubricStep.points ||
      typeof step.explanation !== "string" || !step.explanation.trim()
    ) return pending("mate-invalid-output");

    seen.add(index);
    evidence.push({
      rubricStep: index,
      awardedPoints: awarded,
      maxPoints: rubricStep.points,
      explanation: step.explanation.trim().slice(0, 500),
    });
  }

  if (parsed.confidence < MIN_CONFIDENCE) return pending("mate-low-confidence");

  const awardedPoints = evidence.reduce((sum, item) => sum + item.awardedPoints, 0);
  if (!Number.isInteger(awardedPoints) || awardedPoints < 0 || awardedPoints > 5) {
    return pending("mate-invalid-output");
  }

  return {
    state: "graded",
    awardedPoints,
    maxPoints: 5,
    confidence: parsed.confidence,
    evidence,
    reason: "mate-evaluated-against-private-rubric",
  };
}
