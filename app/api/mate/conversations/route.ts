import {
  NextRequest,
  NextResponse,
} from "next/server";

import { createClient } from "../../../../lib/supabase/server";

export async function GET() {
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
    data,
    error,
  } = await supabase
    .from("mate_conversations")
    .select(
      "id, user_id, title, mode, archived, created_at, updated_at, last_message_at"
    )
    .eq("user_id", user.id)
    .eq("archived", false)
    .order("last_message_at", {
      ascending: false,
    })
    .limit(50);

  if (error) {
    console.error(
      "MATE conversations GET:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Conversațiile nu au putut fi încărcate.",
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json({
    conversations: data ?? [],
  });
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
    mode?: unknown;
  };

  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const title =
    typeof body.title === "string" &&
    body.title.trim()
      ? body.title.trim().slice(0, 80)
      : "Conversație nouă";

  const mode =
    body.mode === "voice" ||
    body.mode === "mixed"
      ? body.mode
      : "text";

  const {
    data,
    error,
  } = await supabase
    .from("mate_conversations")
    .insert({
      user_id: user.id,
      title,
      mode,
    })
    .select(
      "id, user_id, title, mode, archived, created_at, updated_at, last_message_at"
    )
    .single();

  if (error || !data) {
    console.error(
      "MATE conversations POST:",
      error
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

  return NextResponse.json(
    {
      conversation: data,
    },
    {
      status: 201,
    }
  );
}