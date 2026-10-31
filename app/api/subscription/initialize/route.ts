import { NextResponse } from "next/server";
import { createClient } from "../../../../lib/supabase/server";

export async function POST() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json(
      {
        success: false,
        message: "Autentificare necesara.",
      },
      { status: 401 }
    );
  }

  return NextResponse.json({
    success: true,
    initialized: false,
    beta: true,
    subscriptionRequired: false,
    message: "Acces gratuit BAC MATE BETA.",
  });
}
