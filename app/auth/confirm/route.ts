import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(
      `${origin}/cont?eroare=confirmare`
    );
  }

  const supabase = await createClient();

  const { error: confirmareError } =
    await supabase.auth.exchangeCodeForSession(code);

  if (confirmareError) {
    return NextResponse.redirect(
      `${origin}/cont?eroare=confirmare`
    );
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.redirect(
      `${origin}/cont?eroare=confirmare`
    );
  }

  // BETA: acces gratuit, fara activarea unui abonament.

  const { data: profil, error: profilError } = await supabase
    .from("profiles")
    .select(
      "nume, profil_bac, evaluare_initiala_finalizata"
    )
    .eq("id", user.id)
    .maybeSingle();

  if (profilError) {
    return NextResponse.redirect(
      `${origin}/cont?eroare=profil`
    );
  }

  if (!profil?.nume) {
    return NextResponse.redirect(
      `${origin}/date-personale`
    );
  }

  if (!profil?.profil_bac) {
    return NextResponse.redirect(
      `${origin}/profil`
    );
  }

  if (!profil.evaluare_initiala_finalizata) {
    return NextResponse.redirect(
      `${origin}/evaluare`
    );
  }

  return NextResponse.redirect(
    `${origin}/dashboard`
  );
}
