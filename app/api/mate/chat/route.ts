import {
  NextRequest,
  NextResponse,
} from "next/server";

import { createClient } from "../../../../lib/supabase/server";

import {
  getMateGemini,
  getMateGeminiModels,
  getGeminiErrorStatus,
  isRetryableGeminiError,
} from "../../../../lib/mate/gemini.server";

import {
  getMateStudentContext,
} from "../../../../lib/mate/context.server";

import {
  buildMateSystemPrompt,
} from "../../../../lib/mate/prompt.server";

import type {
  MateChatRequest,
  MateTutorMode,
} from "../../../../lib/mate/types";

export const runtime = "nodejs";

const MAX_HISTORY_MESSAGES = 24;

type HistoryRow = {
  role: "user" | "assistant";
  content: string | null;
  created_at: string;
};

type GeminiRole =
  | "user"
  | "model";

type GeminiPart =
  | {
      text: string;
    }
  | {
      inlineData: {
        mimeType: string;
        data: string;
      };
    };

type GeminiContent = {
  role: GeminiRole;
  parts: GeminiPart[];
};

function isTutorMode(
  value: unknown
): value is MateTutorMode {
  return (
    value === "general" ||
    value === "hint" ||
    value === "explain" ||
    value === "check" ||
    value === "solve" ||
    value === "similar" ||
    value === "quiz"
  );
}

function createConversationTitle(
  message: string
) {
  const clean = message
    .replace(/\s+/g, " ")
    .trim();

  if (!clean) {
    return "Problemă din imagine";
  }

  if (clean.length <= 55) {
    return clean;
  }

  return `${clean.slice(0, 52)}...`;
}

function normalizeMimeType(
  value: string | null
) {
  if (
    value === "image/jpeg" ||
    value === "image/png" ||
    value === "image/webp"
  ) {
    return value;
  }

  return "image/jpeg";
}

async function imageUrlToInlineData(
  imageUrl: string,
  mimeType: string
) {
  const response =
    await fetch(imageUrl, {
      cache: "no-store",
    });

  if (!response.ok) {
    throw new Error(
      `Imaginea nu a putut fi descărcată (${response.status}).`
    );
  }

  const arrayBuffer =
    await response.arrayBuffer();

  const buffer =
    Buffer.from(arrayBuffer);

  return {
    inlineData: {
      mimeType,
      data:
        buffer.toString("base64"),
    },
  } satisfies GeminiPart;
}

function getFriendlyGeminiError(
  error: unknown
) {
  const status =
    getGeminiErrorStatus(error);

  const raw =
    error instanceof Error
      ? error.message
      : String(error);

  const lower =
    raw.toLowerCase();

  if (
    status === 401 ||
    status === 403 ||
    lower.includes("api key") ||
    lower.includes("api_key") ||
    lower.includes(
      "permission_denied"
    ) ||
    lower.includes(
      "unauthenticated"
    )
  ) {
    return (
      "MATE nu se poate autentifica momentan la serviciul AI. " +
      "Verifică configurarea Gemini."
    );
  }

  if (status === 429) {
    return (
      "Serviciul AI este foarte solicitat momentan. " +
      "Încearcă din nou peste puțin timp."
    );
  }

  if (status === 503) {
    return (
      "Serviciul AI este foarte solicitat momentan. " +
      "MATE a încercat și modelul de rezervă, " +
      "dar Google nu a putut procesa cererea. " +
      "Încearcă din nou peste puțin timp."
    );
  }

  if (
    status === 404 ||
    lower.includes("not found")
  ) {
    return (
      "Modelele configurate pentru MATE " +
      "nu sunt disponibile momentan."
    );
  }

  return (
    "MATE nu poate răspunde momentan. " +
    "Încearcă din nou."
  );
}

/*
 * Pornește Gemini folosind strategia:
 *
 * 1. model principal
 * 2. fallback imediat dacă modelul principal
 *    este indisponibil temporar
 *
 * Nu repetăm același model de trei ori.
 * Astfel evităm ca elevul să rămână mult timp
 * la „MATE gândește...”.
 *
 * Modelele sunt definite în:
 * lib/mate/gemini.server.ts
 */
async function startGeminiStream(
  contents: GeminiContent[],
  systemPrompt: string
) {
  const gemini =
    getMateGemini();

  const models =
    getMateGeminiModels();

  let lastError: unknown = null;

  for (const model of models) {
    try {
      console.log(
        `MATE Gemini: încerc ${model}`
      );

      const stream =
        await gemini.models
          .generateContentStream({
            model,

            contents:
              contents as any,

            config: {
              systemInstruction:
                systemPrompt,
            },
          });

      console.log(
        `MATE Gemini conectat: ${model}`
      );

      return {
        stream,
        model,
      };
    } catch (error) {
      lastError = error;

      const status =
        getGeminiErrorStatus(
          error
        );

      console.error(
        `MATE Gemini ${model}:`,
        status,
        error
      );

      /*
       * 404:
       * modelul nu este disponibil.
       * Trecem direct la următorul.
       */
      if (status === 404) {
        continue;
      }

      /*
       * 408 / 429 / 5xx:
       * eroare temporară.
       *
       * Nu repetăm același model.
       * Trecem imediat la fallback.
       */
      if (
        isRetryableGeminiError(
          error
        )
      ) {
        continue;
      }

      /*
       * 400 / 401 / 403 etc.
       * indică o problemă reală de request
       * sau autentificare.
       *
       * Nu o ascundem încercând alte modele.
       */
      throw error;
    }
  }

  throw (
    lastError ??
    new Error(
      "Niciun model Gemini nu a putut fi pornit."
    )
  );
}

export async function POST(
  request: NextRequest
) {
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
          "Trebuie să fii autentificat pentru a vorbi cu MATE.",
      },
      {
        status: 401,
      }
    );
  }

  // BETA: MATE AI Text este gratuit pentru utilizatorii autentificati.

  // MATE_QUOTA_CHECK
  const { data: quotaData, error: quotaError } =
    await supabase.rpc("consume_mate_quota", {
      p_feature: "text",
    });

  if (quotaError) {
    console.error("MATE quota:", quotaError);
    return NextResponse.json(
      { error: "Nu am putut verifica limita MATE." },
      { status: 503 }
    );
  }

  const quota = Array.isArray(quotaData)
    ? quotaData[0]
    : quotaData;

  if (!quota?.allowed) {
    return NextResponse.json(
      { error: quota?.message || "Limita MATE a fost atinsa." },
      { status: 429 }
    );
  }

  let body: MateChatRequest;

  try {
    body =
      (await request.json()) as MateChatRequest;
  } catch {
    return NextResponse.json(
      {
        error:
          "Mesajul trimis nu este valid.",
      },
      {
        status: 400,
      }
    );
  }

  const message =
    typeof body.message ===
      "string"
      ? body.message.trim()
      : "";

  const attachmentPath =
    typeof body.attachmentPath ===
      "string" &&
    body.attachmentPath.trim()
      ? body.attachmentPath.trim()
      : null;

  const attachmentMimeType =
    typeof body.attachmentMimeType ===
      "string" &&
    body.attachmentMimeType.trim()
      ? body.attachmentMimeType.trim()
      : null;

  const tutorMode =
    isTutorMode(
      body.tutorMode
    )
      ? body.tutorMode
      : "general";

  if (
    !message &&
    !attachmentPath
  ) {
    return NextResponse.json(
      {
        error:
          "Scrie un mesaj sau atașează o imagine.",
      },
      {
        status: 400,
      }
    );
  }

  if (
    message.length > 12000
  ) {
    return NextResponse.json(
      {
        error:
          "Mesajul este prea lung.",
      },
      {
        status: 400,
      }
    );
  }

  let conversationId =
    typeof body.conversationId ===
      "string" &&
    body.conversationId.trim()
      ? body.conversationId.trim()
      : null;

  /*
   * Verificăm conversația existentă.
   */
  if (conversationId) {
    const {
      data:
        existingConversation,
      error:
        existingError,
    } = await supabase
      .from(
        "mate_conversations"
      )
      .select("id")
      .eq(
        "id",
        conversationId
      )
      .eq(
        "user_id",
        user.id
      )
      .eq(
        "archived",
        false
      )
      .maybeSingle();

    if (
      existingError ||
      !existingConversation
    ) {
      return NextResponse.json(
        {
          error:
            "Conversația nu există sau nu îți aparține.",
        },
        {
          status: 404,
        }
      );
    }
  } else {
    const {
      data:
        createdConversation,
      error:
        createError,
    } = await supabase
      .from(
        "mate_conversations"
      )
      .insert({
        user_id:
          user.id,

        title:
          createConversationTitle(
            message
          ),

        mode:
          attachmentPath
            ? "mixed"
            : "text",
      })
      .select("id")
      .single();

    if (
      createError ||
      !createdConversation
    ) {
      console.error(
        "MATE create conversation:",
        createError
      );

      return NextResponse.json(
        {
          error:
            "Conversația nu a putut fi creată.",
        },
        {
          status: 500,
        }
      );
    }

    conversationId =
      createdConversation.id;
  }

  if (!conversationId) {
    return NextResponse.json(
      {
        error:
          "Conversația nu a putut fi inițializată.",
      },
      {
        status: 500,
      }
    );
  }

  /*
   * Protejăm fișierele private.
   */
  if (
    attachmentPath &&
    !attachmentPath.startsWith(
      `${user.id}/`
    )
  ) {
    return NextResponse.json(
      {
        error:
          "Imaginea nu este validă.",
      },
      {
        status: 403,
      }
    );
  }

  let imageUrl:
    | string
    | null = null;

  if (attachmentPath) {
    const {
      data: signedData,
      error: signedError,
    } =
      await supabase.storage
        .from("mate-media")
        .createSignedUrl(
          attachmentPath,
          60 * 10
        );

    if (
      signedError ||
      !signedData?.signedUrl
    ) {
      console.error(
        "MATE signed image:",
        signedError
      );

      return NextResponse.json(
        {
          error:
            "Imaginea nu a putut fi citită.",
        },
        {
          status: 400,
        }
      );
    }

    imageUrl =
      signedData.signedUrl;
  }

  const contentType =
    attachmentPath &&
    message
      ? "mixed"
      : attachmentPath
        ? "image"
        : "text";

  /*
   * Salvăm mesajul elevului.
   */
  const {
    error:
      insertUserError,
  } = await supabase
    .from("mate_messages")
    .insert({
      conversation_id:
        conversationId,

      user_id:
        user.id,

      role:
        "user",

      content:
        message,

      content_type:
        contentType,

      attachment_path:
        attachmentPath,

      attachment_mime_type:
        attachmentMimeType,

      tutor_mode:
        tutorMode,

      metadata: {},
    });

  if (insertUserError) {
    console.error(
      "MATE insert user message:",
      insertUserError
    );

    return NextResponse.json(
      {
        error:
          "Mesajul nu a putut fi salvat.",
      },
      {
        status: 500,
      }
    );
  }

  /*
   * Citim istoricul conversației.
   */
  const {
    data: historyData,
    error: historyError,
  } = await supabase
    .from("mate_messages")
    .select(
      "role, content, created_at"
    )
    .eq(
      "conversation_id",
      conversationId
    )
    .eq(
      "user_id",
      user.id
    )
    .order(
      "created_at",
      {
        ascending: false,
      }
    )
    .limit(
      MAX_HISTORY_MESSAGES
    );

  if (historyError) {
    console.error(
      "MATE history:",
      historyError
    );

    return NextResponse.json(
      {
        error:
          "Istoricul conversației nu a putut fi citit.",
      },
      {
        status: 500,
      }
    );
  }

  /*
   * Construim contextul real al elevului.
   */
  let studentContext;

  try {
    studentContext =
      await getMateStudentContext(
        supabase,
        user.id
      );
  } catch (error) {
    console.error(
      "MATE context:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Contextul elevului nu a putut fi pregătit.",
      },
      {
        status: 500,
      }
    );
  }

  const systemPrompt =
    buildMateSystemPrompt(
      studentContext,
      tutorMode
    );

  const chronologicalHistory =
    [
      ...((historyData ??
        []) as HistoryRow[]),
    ].reverse();

  /*
   * Ultimul mesaj este mesajul pe care
   * tocmai l-am salvat.
   *
   * Îl scoatem din history pentru că îl
   * adăugăm separat mai jos împreună
   * cu imaginea, dacă există.
   */
  const previousHistory =
    chronologicalHistory.slice(
      0,
      -1
    );

  const contents:
    GeminiContent[] =
      previousHistory
        .filter(
          (item) =>
            item.role ===
              "user" ||
            item.role ===
              "assistant"
        )
        .filter(
          (item) =>
            Boolean(
              item.content?.trim()
            )
        )
        .map(
          (item) => ({
            role:
              item.role ===
              "assistant"
                ? "model"
                : "user",

            parts: [
              {
                text:
                  item.content?.trim() ??
                  "",
              },
            ],
          })
        );

  const currentParts:
    GeminiPart[] = [];

  if (message) {
    currentParts.push({
      text: message,
    });
  } else if (imageUrl) {
    currentParts.push({
      text:
        "Analizează imaginea trimisă și ajută-mă cu problema de matematică din ea.",
    });
  }

  /*
   * Pregătim imaginea pentru Gemini.
   */
  if (imageUrl) {
    try {
      const imagePart =
        await imageUrlToInlineData(
          imageUrl,
          normalizeMimeType(
            attachmentMimeType
          )
        );

      currentParts.push(
        imagePart
      );
    } catch (error) {
      console.error(
        "MATE prepare image:",
        error
      );

      return NextResponse.json(
        {
          error:
            "Imaginea nu a putut fi pregătită pentru MATE.",
        },
        {
          status: 400,
        }
      );
    }
  }

  contents.push({
    role: "user",
    parts: currentParts,
  });

  /*
   * Pornim Gemini.
   *
   * Model principal + fallback sunt
   * gestionate înainte să răspundem
   * browserului.
   */
  let started;

  try {
    started =
      await startGeminiStream(
        contents,
        systemPrompt
      );
  } catch (error) {
    console.error(
      "MATE Gemini final:",
      error
    );

    return NextResponse.json(
      {
        error:
          getFriendlyGeminiError(
            error
          ),
      },
      {
        status: 502,
      }
    );
  }

  const {
    stream,
    model,
  } = started;

  const encoder =
    new TextEncoder();

  /*
   * Trimitem răspunsul progresiv
   * către interfața MATE.
   */
  const responseStream =
    new ReadableStream<Uint8Array>({
      async start(
        controller
      ) {
        let fullText = "";

        let inputTokens:
          | number
          | null = null;

        let outputTokens:
          | number
          | null = null;

        try {
          for await (
            const chunk of stream
          ) {
            const delta =
              typeof chunk.text ===
                "string"
                ? chunk.text
                : "";

            if (delta) {
              fullText +=
                delta;

              controller.enqueue(
                encoder.encode(
                  delta
                )
              );
            }

            const usage =
              chunk.usageMetadata;

            if (usage) {
              inputTokens =
                typeof usage
                  .promptTokenCount ===
                  "number"
                  ? usage
                      .promptTokenCount
                  : inputTokens;

              outputTokens =
                typeof usage
                  .candidatesTokenCount ===
                  "number"
                  ? usage
                      .candidatesTokenCount
                  : outputTokens;
            }
          }

          const finalText =
            fullText.trim();

          /*
           * Salvăm răspunsul și modelul
           * care a funcționat.
           */
          if (finalText) {
            const {
              error:
                assistantInsertError,
            } = await supabase
              .from(
                "mate_messages"
              )
              .insert({
                conversation_id:
                  conversationId,

                user_id:
                  user.id,

                role:
                  "assistant",

                content:
                  finalText,

                content_type:
                  "text",

                tutor_mode:
                  tutorMode,

                metadata: {
                  fallbackEnabled:
                    true,
                },

                provider:
                  "google",

                model,

                input_tokens:
                  inputTokens,

                output_tokens:
                  outputTokens,
              });

            if (
              assistantInsertError
            ) {
              console.error(
                "MATE save assistant:",
                assistantInsertError
              );
            }
          }

          controller.close();
        } catch (error) {
          console.error(
            "MATE Gemini stream:",
            error
          );

          /*
           * Dacă stream-ul s-a întrerupt
           * după ce HTTP 200 a plecat deja,
           * nu rupem conexiunea brutal.
           */
          if (
            !fullText.trim()
          ) {
            controller.enqueue(
              encoder.encode(
                getFriendlyGeminiError(
                  error
                )
              )
            );
          }

          controller.close();
        }
      },
    });

  return new Response(
    responseStream,
    {
      status: 200,

      headers: {
        "Content-Type":
          "text/plain; charset=utf-8",

        "Cache-Control":
          "no-cache, no-transform",

        "X-Accel-Buffering":
          "no",

        "X-Mate-Conversation-Id":
          conversationId,

        "X-Mate-Model":
          model,
      },
    }
  );
}
