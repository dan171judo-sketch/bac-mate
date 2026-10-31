import { GoogleGenAI } from "@google/genai";

let client: GoogleGenAI | null = null;

/*
 * Clientul Gemini există numai pe server.
 * GEMINI_API_KEY nu este trimis niciodată în browser.
 */
export function getMateGemini() {
  const apiKey =
    process.env.GEMINI_API_KEY?.trim();

  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY lipsește din .env.local."
    );
  }

  if (!client) {
    client = new GoogleGenAI({
      apiKey,
    });
  }

  return client;
}

/*
 * Modelele MATE verificate direct cu cheia proiectului.
 *
 * Principal:
 *   gemini-3.6-flash
 *
 * Fallback:
 *   gemini-3.5-flash-lite
 *
 * BAC_MATE_GEMINI_MODEL poate suprascrie modelul
 * principal fără să fie nevoie să modificăm codul.
 */
export function getMateGeminiModels() {
  const configured =
    process.env.BAC_MATE_GEMINI_MODEL?.trim();

  const models = [
    configured || "gemini-3.6-flash",
    "gemini-3.5-flash-lite",
  ];

  return [...new Set(models)];
}

/*
 * Extrage statusul HTTP din erorile Gemini.
 */
export function getGeminiErrorStatus(
  error: unknown
): number | null {
  if (
    typeof error === "object" &&
    error !== null
  ) {
    if ("status" in error) {
      const status = (
        error as {
          status?: unknown;
        }
      ).status;

      if (typeof status === "number") {
        return status;
      }
    }

    if ("code" in error) {
      const code = (
        error as {
          code?: unknown;
        }
      ).code;

      if (typeof code === "number") {
        return code;
      }
    }
  }

  const message =
    error instanceof Error
      ? error.message
      : String(error);

  const match = message.match(
    /\b(400|401|403|404|408|429|500|502|503|504)\b/
  );

  if (!match) {
    return null;
  }

  return Number(match[1]);
}

/*
 * Aceste erori pot justifica trecerea rapidă
 * la modelul fallback.
 */
export function isRetryableGeminiError(
  error: unknown
) {
  const status =
    getGeminiErrorStatus(error);

  return (
    status === 408 ||
    status === 429 ||
    status === 500 ||
    status === 502 ||
    status === 503 ||
    status === 504
  );
}