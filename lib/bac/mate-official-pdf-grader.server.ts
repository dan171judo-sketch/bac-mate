import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import { createCanvas } from "@napi-rs/canvas";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

import {
  getOfficialVariantById,
  variantIdFromReleaseId,
} from "@/lib/bac/official-variant-catalog";

export type OfficialPdfGradeInput = {
  releaseId: string;
  answers: Array<{ slotId: string; answerText: string }>;
};

export type OfficialPdfGradeItem = {
  slotId: string;
  awardedPoints: number;
  confidence: number;
  rubricPage: number;
  evidence: string;
};

export type OfficialPdfGradeResult =
  | { state: "graded"; items: OfficialPdfGradeItem[]; reason: "official-rubric-pdf-evaluated" }
  | { state: "pending"; items: []; reason: "invalid-release" | "subject-file-unavailable" | "subject-sha-mismatch" | "rubric-file-unavailable" | "rubric-sha-mismatch" | "provider-not-configured" | "provider-error" | "invalid-output" | "low-confidence" };

const MIN_CONFIDENCE = 0.90;
const EXPECTED_SLOTS = [
  "S1-1", "S1-2", "S1-3", "S1-4", "S1-5", "S1-6",
  "S2-1-a", "S2-1-b", "S2-1-c", "S2-2-a", "S2-2-b", "S2-2-c",
  "S3-1-a", "S3-1-b", "S3-1-c", "S3-2-a", "S3-2-b", "S3-2-c",
] as const;

function pending(reason: Extract<OfficialPdfGradeResult, { state: "pending" }>["reason"]): OfficialPdfGradeResult {
  return { state: "pending", items: [], reason };
}

function sha256(bytes: Buffer): string {
  return crypto.createHash("sha256").update(bytes).digest("hex");
}

const OFFICIAL_SOURCES_ROOT = path.join(process.cwd(), "data", "bac", "sources");

function resolveOfficialPdf(relativePath: string): string | null {
  const normalized = relativePath.replace(/\\/g, "/").replace(/^\.\//, "");
  const prefix = "data/bac/sources/";
  if (!normalized.startsWith(prefix) || !normalized.toLowerCase().endsWith(".pdf")) return null;
  const tail = normalized.slice(prefix.length);
  if (!tail || tail.split("/").some((part) => part === ".." || part === "." || !part)) return null;
  return path.join(OFFICIAL_SOURCES_ROOT, ...tail.split("/"));
}

function readOfficialPdf(relativePath: string): Buffer | null {
  const normalized = relativePath.replace(/\\/g, "/").replace(/^\.\//, "");
  const prefix = "data/bac/sources/";
  if (!normalized.startsWith(prefix) || !normalized.toLowerCase().endsWith(".pdf")) return null;
  const tail = normalized.slice(prefix.length);
  const parts = tail.split("/");
  if (!tail || parts.some((part) => part === ".." || part === "." || !part)) return null;
  try {
    return fs.readFileSync(path.join(process.cwd(), "data", "bac", "sources", ...parts));
  } catch {
    return null;
  }
}

async function renderPdfToPngBase64(bytes: Buffer): Promise<string[]> {
  const pdf = await getDocument({
    data: new Uint8Array(bytes),
    useSystemFonts: true,
  }).promise;
  const images: string[] = [];
  try {
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
      const page = await pdf.getPage(pageNumber);
      const viewport = page.getViewport({ scale: 1.6 });
      const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
      const canvasContext = canvas.getContext("2d");
      await page.render({ canvas: canvas as never, canvasContext: canvasContext as never, viewport }).promise;
      images.push(canvas.toBuffer("image/png").toString("base64"));
      page.cleanup();
    }
  } finally {
    // pdfjs-dist 6 can expose different document-proxy cleanup APIs in Node.
    // Page resources are already cleaned above; call document cleanup only when available.
    const disposable = pdf as unknown as { cleanup?: () => void; destroy?: () => Promise<void> | void };
    disposable.cleanup?.();
    if (typeof disposable.destroy === "function") await disposable.destroy();
  }
  return images;
}

function outputSchema() {
  return {
    type: "object",
    properties: {
      items: {
        type: "array",
        minItems: 18,
        maxItems: 18,
        items: {
          type: "object",
          properties: {
            slotId: { type: "string", enum: [...EXPECTED_SLOTS] },
            awardedPoints: { type: "integer", minimum: 0, maximum: 5 },
            confidence: { type: "number", minimum: 0, maximum: 1 },
            rubricPage: { type: "integer", minimum: 1 },
            evidence: { type: "string" },
          },
          required: ["slotId", "awardedPoints", "confidence", "rubricPage", "evidence"],
          additionalProperties: false,
        },
      },
    },
    required: ["items"],
    additionalProperties: false,
  };
}

export async function qaRenderOfficialVariant(releaseId: string): Promise<{ subjectPages: number; rubricPages: number }> {
  const variantId = variantIdFromReleaseId(releaseId);
  const variant = variantId ? getOfficialVariantById(variantId) : null;
  if (!variant) throw new Error("invalid-release");
  const subjectPath = resolveOfficialPdf(variant.subjectPath);
  const rubricPath = resolveOfficialPdf(variant.rubricPath);
  if (!subjectPath || !rubricPath) throw new Error("invalid-path");
  const subjectBytes = readOfficialPdf(variant.subjectPath);
  const rubricBytes = readOfficialPdf(variant.rubricPath);
  if (!subjectBytes || !rubricBytes) throw new Error("file-unavailable");
  if (sha256(subjectBytes) !== variant.subjectSha256 || sha256(rubricBytes) !== variant.rubricSha256) throw new Error("sha-mismatch");
  const subjectImages = await renderPdfToPngBase64(subjectBytes);
  const rubricImages = await renderPdfToPngBase64(rubricBytes);
  return { subjectPages: subjectImages.length, rubricPages: rubricImages.length };
}

export async function gradeSimulationAgainstOfficialRubricPdf(input: OfficialPdfGradeInput): Promise<OfficialPdfGradeResult> {
  const variantId = variantIdFromReleaseId(input.releaseId);
  const variant = variantId ? getOfficialVariantById(variantId) : null;
  if (!variant) return pending("invalid-release");

  const subjectPath = resolveOfficialPdf(variant.subjectPath);
  if (!subjectPath) return pending("subject-file-unavailable");
  const subjectBytes = readOfficialPdf(variant.subjectPath);
  if (!subjectBytes) return pending("subject-file-unavailable");
  if (sha256(subjectBytes) !== variant.subjectSha256) return pending("subject-sha-mismatch");

  const rubricPath = resolveOfficialPdf(variant.rubricPath);
  if (!rubricPath) return pending("rubric-file-unavailable");
  const rubricBytes = readOfficialPdf(variant.rubricPath);
  if (!rubricBytes) return pending("rubric-file-unavailable");
  if (sha256(rubricBytes) !== variant.rubricSha256) return pending("rubric-sha-mismatch");

  const bySlot = new Map(input.answers.map((item) => [item.slotId, item.answerText ?? ""]));
  if (bySlot.size !== EXPECTED_SLOTS.length || EXPECTED_SLOTS.some((slot) => !bySlot.has(slot))) {
    return pending("invalid-output");
  }

  const ollamaUrl = (process.env.BAC_MATE_OLLAMA_URL?.trim() || "http://127.0.0.1:11434").replace(/\/+$/, "");
  const model = process.env.BAC_MATE_OLLAMA_VISION_MODEL?.trim() || "qwen3-vl:4b";
  if (!ollamaUrl || !model) return pending("provider-not-configured");

  let subjectImages: string[];
  let rubricImages: string[];
  try {
    // Sequential rendering is intentional: lower native-memory pressure and avoids
    // concurrent PDF.js/native-canvas work in the finalization request.
    subjectImages = await renderPdfToPngBase64(subjectBytes);
    rubricImages = await renderPdfToPngBase64(rubricBytes);
  } catch {
    return pending("provider-error");
  }
  if (!subjectImages.length || !rubricImages.length) return pending("provider-error");

  const answersText = EXPECTED_SLOTS.map((slot) => {
    const answer = (bySlot.get(slot) ?? "").trim();
    return `### ${slot}\n${answer || "[NECOMPLETAT]"}`;
  }).join("\n\n");

  const prompt = [
    "Ești evaluator BAC la matematică.",
    `Primele ${subjectImages.length} imagini sunt paginile SUBIECTULUI OFICIAL, în ordine.`,
    `Următoarele ${rubricImages.length} imagini sunt paginile BAREMULUI OFICIAL, în ordine.`,
    "Baremul oficial vizual este singura autoritate de punctaj.",
    "Evaluează exact cele 18 răspunsuri și păstrează exact slotId-urile primite.",
    "Fiecare slot valorează maximum 5 puncte. Acordă punctaj parțial numai dacă baremul oficial îl justifică.",
    "Nu inventa formule, rezultate, criterii sau pași și nu transfera puncte între sloturi.",
    "Pentru [NECOMPLETAT] acordă 0 puncte.",
    "rubricPage este numărul paginii din BAREM, unde prima imagine a baremului este pagina 1.",
    "evidence descrie foarte scurt criteriul vizibil din barem și ce a demonstrat elevul.",
    "Dacă formula, criteriul, asocierea slotului sau soluția nu poate fi citită/evaluată sigur, confidence trebuie să fie sub 0.90.",
    "Nu ridica artificial confidence. Returnează numai JSON conform schemei.",
    "", "RĂSPUNSURILE ELEVULUI:", "", answersText,
  ].join("\n");

  let response: Response;
  try {
    response = await fetch(`${ollamaUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        stream: false,
        format: outputSchema(),
        options: { temperature: 0 },
        messages: [{
          role: "user",
          content: prompt,
          images: [...subjectImages, ...rubricImages],
        }],
      }),
      signal: AbortSignal.timeout(300000),
    });
  } catch {
    return pending("provider-error");
  }

  if (!response.ok) return pending("provider-error");
  let payload: unknown;
  try { payload = await response.json(); } catch { return pending("invalid-output"); }
  const content = (payload as { message?: { content?: unknown } })?.message?.content;
  if (typeof content !== "string" || !content.trim()) return pending("invalid-output");

  let parsed: { items?: unknown };
  try { parsed = JSON.parse(content) as { items?: unknown }; } catch { return pending("invalid-output"); }
  if (!Array.isArray(parsed.items) || parsed.items.length !== 18) return pending("invalid-output");

  const seen = new Set<string>();
  const items: OfficialPdfGradeItem[] = [];
  for (const raw of parsed.items) {
    if (!raw || typeof raw !== "object") return pending("invalid-output");
    const item = raw as Record<string, unknown>;
    const slotId = String(item.slotId ?? "");
    const awardedPoints = Number(item.awardedPoints);
    const confidence = Number(item.confidence);
    const rubricPage = Number(item.rubricPage);
    const evidence = String(item.evidence ?? "").trim();
    if (
      !EXPECTED_SLOTS.includes(slotId as (typeof EXPECTED_SLOTS)[number]) || seen.has(slotId) ||
      !Number.isInteger(awardedPoints) || awardedPoints < 0 || awardedPoints > 5 ||
      !Number.isFinite(confidence) || confidence < 0 || confidence > 1 ||
      !Number.isInteger(rubricPage) || rubricPage < 1 || rubricPage > rubricImages.length || !evidence
    ) return pending("invalid-output");
    seen.add(slotId);
    items.push({ slotId, awardedPoints, confidence, rubricPage, evidence: evidence.slice(0, 500) });
  }
  if (EXPECTED_SLOTS.some((slot) => !seen.has(slot))) return pending("invalid-output");
  if (items.some((item) => item.confidence < MIN_CONFIDENCE)) return pending("low-confidence");

  return { state: "graded", items, reason: "official-rubric-pdf-evaluated" };
}


export async function gradeOfficialRubricSubsetPdf(input: OfficialPdfGradeInput): Promise<OfficialPdfGradeResult> {
  const variantId = variantIdFromReleaseId(input.releaseId);
  const variant = variantId ? getOfficialVariantById(variantId) : null;
  if (!variant) return pending("invalid-release");
  const requestedSlots = [...new Set(input.answers.map((item) => item.slotId))];
  if (!requestedSlots.length || requestedSlots.length > 18 || requestedSlots.some((slot) => !EXPECTED_SLOTS.includes(slot as (typeof EXPECTED_SLOTS)[number]))) return pending("invalid-output");
  const subjectPath = resolveOfficialPdf(variant.subjectPath);
  const rubricPath = resolveOfficialPdf(variant.rubricPath);
  if (!subjectPath) return pending("subject-file-unavailable");
  if (!rubricPath) return pending("rubric-file-unavailable");
  const subjectBytes = readOfficialPdf(variant.subjectPath);
  const rubricBytes = readOfficialPdf(variant.rubricPath);
  if (!subjectBytes) return pending("subject-file-unavailable");
  if (!rubricBytes) return pending("rubric-file-unavailable");
  if (sha256(subjectBytes) !== variant.subjectSha256) return pending("subject-sha-mismatch");
  if (sha256(rubricBytes) !== variant.rubricSha256) return pending("rubric-sha-mismatch");
  const ollamaUrl = (process.env.BAC_MATE_OLLAMA_URL?.trim() || "http://127.0.0.1:11434").replace(/\/+$/, "");
  const model = process.env.BAC_MATE_OLLAMA_VISION_MODEL?.trim() || "qwen3-vl:4b";
  if (!ollamaUrl || !model) return pending("provider-not-configured");
  let subjectImages: string[]; let rubricImages: string[];
  try { subjectImages = await renderPdfToPngBase64(subjectBytes); rubricImages = await renderPdfToPngBase64(rubricBytes); } catch { return pending("provider-error"); }
  const bySlot = new Map(input.answers.map((item) => [item.slotId, item.answerText ?? ""]));
  const answersText = requestedSlots.map((slot) => `### ${slot}\n${(bySlot.get(slot) ?? "").trim() || "[NECOMPLETAT]"}`).join("\n\n");
  const schema = { type:"object", properties:{ items:{ type:"array", minItems:requestedSlots.length, maxItems:requestedSlots.length, items:{ type:"object", properties:{ slotId:{type:"string",enum:requestedSlots}, awardedPoints:{type:"integer",minimum:0,maximum:5}, confidence:{type:"number",minimum:0,maximum:1}, rubricPage:{type:"integer",minimum:1}, evidence:{type:"string"}}, required:["slotId","awardedPoints","confidence","rubricPage","evidence"], additionalProperties:false }}}, required:["items"], additionalProperties:false };
  const prompt = ["Ești evaluator BAC la matematică.", `Primele ${subjectImages.length} imagini sunt SUBIECTUL OFICIAL.`, `Următoarele ${rubricImages.length} imagini sunt BAREMUL OFICIAL.`, "Evaluează NUMAI sloturile enumerate mai jos, exclusiv după baremul oficial. Nu evalua celelalte exerciții.", "Fiecare slot are maximum 5 puncte. Pentru [NECOMPLETAT] acordă 0. Dacă nu poți evalua sigur, confidence sub 0.90.", "Returnează numai JSON conform schemei.", "", answersText].join("\n");
  let response: Response;
  try { response = await fetch(`${ollamaUrl}/api/chat`, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({model,stream:false,format:schema,options:{temperature:0},messages:[{role:"user",content:prompt,images:[...subjectImages,...rubricImages]}]}), signal:AbortSignal.timeout(300000) }); } catch { return pending("provider-error"); }
  if (!response.ok) return pending("provider-error");
  let payload: unknown; try { payload = await response.json(); } catch { return pending("invalid-output"); }
  const content=(payload as {message?:{content?:unknown}})?.message?.content; if(typeof content!=="string") return pending("invalid-output");
  let parsed:{items?:unknown}; try{parsed=JSON.parse(content) as {items?:unknown};}catch{return pending("invalid-output");}
  if(!Array.isArray(parsed.items)||parsed.items.length!==requestedSlots.length)return pending("invalid-output");
  const seen=new Set<string>(); const items:OfficialPdfGradeItem[]=[];
  for(const raw of parsed.items){ if(!raw||typeof raw!=="object")return pending("invalid-output"); const item=raw as Record<string,unknown>; const slotId=String(item.slotId??""); const awardedPoints=Number(item.awardedPoints), confidence=Number(item.confidence), rubricPage=Number(item.rubricPage); const evidence=String(item.evidence??"").trim(); if(!requestedSlots.includes(slotId)||seen.has(slotId)||!Number.isInteger(awardedPoints)||awardedPoints<0||awardedPoints>5||!Number.isFinite(confidence)||confidence<0||confidence>1||!Number.isInteger(rubricPage)||rubricPage<1||rubricPage>rubricImages.length||!evidence)return pending("invalid-output"); seen.add(slotId); items.push({slotId,awardedPoints,confidence,rubricPage,evidence:evidence.slice(0,500)}); }
  if(requestedSlots.some((slot)=>!seen.has(slot)))return pending("invalid-output");
  if(items.some((item)=>item.confidence<MIN_CONFIDENCE))return pending("low-confidence");
  return {state:"graded",items,reason:"official-rubric-pdf-evaluated"};
}
