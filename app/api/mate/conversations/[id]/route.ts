import {
  NextRequest,
  NextResponse,
} from "next/server";

import { createClient } from "../../../../../lib/supabase/server";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  _request: NextRequest,
  context: RouteContext
) {
  const { id } =
    await context.params;

  const supabase =
    await createClient();

  const {
    data: { user },
    error: userError,
  } =
    await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json(
      {
        error:
          "Trebuie să fii autentificat.",
      },
      {
        status: 401,
      }
    );
  }

  const {
    data: conversation,
    error: conversationError,
  } = await supabase
    .from("mate_conversations")
    .select(
      "id, user_id, title, mode, archived, created_at, updated_at, last_message_at"
    )
    .eq("id", id)
    .eq("user_id", user.id)
    .maybeSingle();

  if (
    conversationError ||
    !conversation
  ) {
    return NextResponse.json(
      {
        error:
          "Conversația nu există.",
      },
      {
        status: 404,
      }
    );
  }

  const {
    data: messages,
    error: messagesError,
  } = await supabase
    .from("mate_messages")
    .select(
      "id, conversation_id, user_id, role, content, content_type, attachment_path, attachment_mime_type, transcript, tutor_mode, metadata, provider, model, input_tokens, output_tokens, created_at"
    )
    .eq(
      "conversation_id",
      conversation.id
    )
    .eq("user_id", user.id)
    .order("created_at", {
      ascending: true,
    })
    .limit(200);

  if (messagesError) {
    console.error(
      "MATE messages GET:",
      messagesError
    );

    return NextResponse.json(
      {
        error:
          "Mesajele nu au putut fi încărcate.",
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json({
    conversation,
    messages: messages ?? [],
  });
}

export async function PATCH(
  request: NextRequest,
  context: RouteContext
) {
  const { id } =
    await context.params;

  const supabase =
    await createClient();

  const {
    data: { user },
    error: userError,
  } =
    await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json(
      {
        error:
          "Trebuie să fii autentificat.",
      },
      {
        status: 401,
      }
    );
  }

  let body: {
    title?: unknown;
    archived?: unknown;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        error:
          "Datele trimise nu sunt valide.",
      },
      {
        status: 400,
      }
    );
  }

  const updates: {
    title?: string;
    archived?: boolean;
  } = {};

  if (
    typeof body.title === "string"
  ) {
    const title =
      body.title.trim();

    if (title) {
      updates.title =
        title.slice(0, 80);
    }
  }

  if (
    typeof body.archived ===
    "boolean"
  ) {
    updates.archived =
      body.archived;
  }

  if (
    Object.keys(updates).length === 0
  ) {
    return NextResponse.json(
      {
        error:
          "Nu există nimic de actualizat.",
      },
      {
        status: 400,
      }
    );
  }

  const {
    data,
    error,
  } = await supabase
    .from("mate_conversations")
    .update(updates)
    .eq("id", id)
    .eq("user_id", user.id)
    .select(
      "id, user_id, title, mode, archived, created_at, updated_at, last_message_at"
    )
    .maybeSingle();

  if (error || !data) {
    console.error(
      "MATE conversation PATCH:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Conversația nu a putut fi actualizată.",
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json({
    conversation: data,
  });
}

export async function DELETE(
  _request: NextRequest,
  context: RouteContext
) {
  const { id } =
    await context.params;

  const supabase =
    await createClient();

  const {
    data: { user },
    error: userError,
  } =
    await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json(
      {
        error:
          "Trebuie să fii autentificat.",
      },
      {
        status: 401,
      }
    );
  }

  /*
   * Nu ștergem istoricul imediat.
   * Îl arhivăm.
   */
  const {
    error,
  } = await supabase
    .from("mate_conversations")
    .update({
      archived: true,
    })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    console.error(
      "MATE conversation DELETE:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Conversația nu a putut fi arhivată.",
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json({
    success: true,
  });
}