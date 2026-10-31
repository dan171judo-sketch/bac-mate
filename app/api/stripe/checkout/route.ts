import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST() {
  return NextResponse.json(
    {
      error: "BAC MATE este gratuit in versiunea BETA. Platile sunt dezactivate temporar.",
      beta: true,
      paymentsEnabled: false,
    },
    { status: 403 }
  );
}
