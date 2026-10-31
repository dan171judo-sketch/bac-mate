import OpenAI from "openai";

let client: OpenAI | null = null;

export function getMateOpenAI() {
  const apiKey =
    process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "OPENAI_API_KEY lipsește din .env.local."
    );
  }

  if (!client) {
    client = new OpenAI({
      apiKey,
    });
  }

  return client;
}

/*
 * Putem schimba modelul din .env.local
 * fără să modificăm codul.
 *
 * Dacă BAC_MATE_CHAT_MODEL nu există,
 * folosim un model actual multimodal,
 * potrivit pentru trafic mai mare.
 */
export function getMateChatModel() {
  return (
    process.env.BAC_MATE_CHAT_MODEL?.trim() ||
    "gpt-5.6-luna"
  );
}