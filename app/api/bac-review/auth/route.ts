import { NextResponse } from "next/server";
import { BAC_REVIEW_COOKIE, configuredReviewSecret, reviewTokenForConfiguredSecret } from "@/lib/bac-review-auth";

export async function POST(req: Request) {
  const configured = configuredReviewSecret();
  if (!configured) return NextResponse.json({ error: "BAC_REVIEW_ADMIN_SECRET nu este configurat." }, { status: 503 });
  const body = await req.json().catch(() => ({}));
  if (typeof body.secret !== "string" || body.secret !== configured) return NextResponse.json({ error: "Secret incorect." }, { status: 403 });
  const token = reviewTokenForConfiguredSecret();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(BAC_REVIEW_COOKIE, token!, { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 8 });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(BAC_REVIEW_COOKIE, "", { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 0 });
  return res;
}
