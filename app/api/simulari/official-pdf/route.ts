import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

import { createClient } from "../../../../lib/supabase/server";
import { getOfficialVariantById, getOfficialVariants, variantIdFromReleaseId } from "../../../../lib/bac/official-variant-catalog";
import { isSimulationVariantSnapshot } from "../../../../lib/simulari/variant-engine";

export const dynamic = "force-dynamic";

function releaseIdFromSnapshot(snapshot: unknown): string | null {
  if (!isSimulationVariantSnapshot(snapshot)) return null;
  for (const subject of snapshot.subjects) {
    for (const exercise of subject.exercises) {
      if (exercise.sourceReleaseId?.startsWith("official-pdf:")) return exercise.sourceReleaseId;
    }
  }
  return null;
}

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError || !authData.user) return NextResponse.json({ error: "Neautorizat." }, { status: 401 });

    const url = new URL(request.url);
    const simulationId = url.searchParams.get("simulationId")?.trim();
    if (!simulationId) return NextResponse.json({ error: "ID-ul simulării lipsește." }, { status: 400 });

    const { data, error } = await supabase
      .from("bac_simulations")
      .select("id,profile_code,variant_snapshot")
      .eq("id", simulationId)
      .eq("user_id", authData.user.id)
      .maybeSingle();
    if (error) throw error;
    if (!data) return NextResponse.json({ error: "Simularea nu există." }, { status: 404 });

    const requestedReleaseId = url.searchParams.get("releaseId")?.trim() || null;
    let releaseId = releaseIdFromSnapshot(data.variant_snapshot);
    if (requestedReleaseId) {
      if (!isSimulationVariantSnapshot(data.variant_snapshot)) {
        return NextResponse.json({ error: "Snapshot invalid." }, { status: 409 });
      }
      const allowed = data.variant_snapshot.subjects.some((subject) =>
        subject.exercises.some((exercise) => exercise.sourceReleaseId === requestedReleaseId)
      );
      if (!allowed) return NextResponse.json({ error: "Sursa nu aparține simulării." }, { status: 403 });
      releaseId = requestedReleaseId;
    }
    const variantId = variantIdFromReleaseId(releaseId ?? undefined);
    const variant = variantId
      ? getOfficialVariantById(variantId)
      : getOfficialVariants(String(data.profile_code))[0] ?? null; // compatibilitate sesiuni vechi
    if (!variant) return NextResponse.json({ error: "Varianta oficială nu a fost găsită." }, { status: 404 });

    const relativeSubjectPath = variant.subjectPath.replace(/^data[\\/]bac[\\/]sources[\\/]/, "");
    const sourceRoot = path.join(process.cwd(), "data", "bac", "sources");
    const absolutePath = path.join(sourceRoot, relativeSubjectPath);
    const normalizedSourceRoot = path.resolve(sourceRoot) + path.sep;
    const normalizedAbsolutePath = path.resolve(absolutePath);
    if (!normalizedAbsolutePath.startsWith(normalizedSourceRoot) || !fs.existsSync(normalizedAbsolutePath)) {
      return NextResponse.json({ error: "Subiectul oficial nu există pe server." }, { status: 404 });
    }

    const bytes = fs.readFileSync(normalizedAbsolutePath);
    if (bytes.length < 5 || bytes.subarray(0, 5).toString("ascii") !== "%PDF-") {
      return NextResponse.json({ error: "Fișierul oficial nu este un PDF valid." }, { status: 500 });
    }
    const actualSha = crypto.createHash("sha256").update(bytes).digest("hex");
    if (actualSha !== variant.subjectSha256) {
      return NextResponse.json({ error: "Integritatea subiectului oficial nu a putut fi confirmată." }, { status: 500 });
    }

    /*
     * Transport dedicat viewer-ului intern.
     *
     * Nu răspundem cu application/pdf și nu expunem un filename .pdf.
     * Browserul primește JSON, apoi PDF.js decodează documentul în memorie.
     * Asta evită interceptarea request-ului de către manager-ele externe
     * de download, păstrând în același timp autentificarea, snapshot-ul și
     * verificarea SHA de mai sus.
     */
    if (url.searchParams.get("transport") === "viewer-json") {
      return NextResponse.json(
        {
          encoding: "base64",
          data: bytes.toString("base64"),
          sha256: actualSha,
        },
        {
          status: 200,
          headers: {
            "Cache-Control": "private, no-store, max-age=0",
            "X-Content-Type-Options": "nosniff",
          },
        }
      );
    }

    return new NextResponse(new Uint8Array(bytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="BAC-2026-${variant.profileCode}-${variant.variantToken}.pdf"`,
        "Cache-Control": "private, no-store, max-age=0",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("GET /api/simulari/official-pdf:", error);
    return NextResponse.json({ error: "Subiectul oficial nu a putut fi încărcat." }, { status: 500 });
  }
}
