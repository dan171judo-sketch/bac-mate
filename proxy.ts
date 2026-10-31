import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const protectedPaths = [
    "/dashboard",
    "/lectii",
    "/evaluare",
    "/evaluari",
    "/evaluare-saptamanala",
    "/simulari",
    "/progres",
    "/mate",
    "/programa",
  ];

  const isProtected = protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          response = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.redirect(
      new URL("/cont", request.url)
    );
  }

  // BAC MATE BETA:
  // Utilizatorii autentificati au acces gratuit.
  // Nu verificam abonamentul in perioada BETA.
  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/lectii/:path*",
    "/evaluare/:path*",
    "/evaluari/:path*",
    "/evaluare-saptamanala/:path*",
    "/simulari/:path*",
    "/progres/:path*",
    "/mate/:path*",
    "/programa/:path*",
  ],
};
