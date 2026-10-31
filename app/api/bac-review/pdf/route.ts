import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

import { isBacReviewAuthorized } from "@/lib/bac-review-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (!(await isBacReviewAuthorized())) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const file =
    request.nextUrl.searchParams.get("file");

  if (!file) {
    return NextResponse.json(
      { error: "Missing file" },
      { status: 400 }
    );
  }

  const sourcesRoot = path.resolve(
    process.cwd(),
    "data",
    "bac",
    "sources"
  );

  const absolutePath = path.resolve(
    sourcesRoot,
    file
  );

  const insideSources =
    absolutePath === sourcesRoot ||
    absolutePath.startsWith(
      sourcesRoot + path.sep
    );

  if (!insideSources) {
    return NextResponse.json(
      { error: "Invalid path" },
      { status: 400 }
    );
  }

  if (
    path.extname(absolutePath).toLowerCase() !==
    ".pdf"
  ) {
    return NextResponse.json(
      { error: "Only PDF files are allowed" },
      { status: 400 }
    );
  }

  try {
    const data =
      await fs.readFile(absolutePath);

    /*
     * IMPORTANT:
     *
     * Acest endpoint este consumat prin fetch()
     * de PDF.js.
     *
     * Nu trimitem application/pdf și nici
     * Content-Disposition, deoarece extensii precum
     * Internet Download Manager pot intercepta
     * request-ul înainte ca PDF.js să primească bytes.
     *
     * PDF.js primește ArrayBuffer-ul și interpretează
     * conținutul PDF local.
     */
    return new NextResponse(data, {
      status: 200,
      headers: {
        "Content-Type":
          "application/octet-stream",

        "Cache-Control":
          "private, no-store, max-age=0",

        "X-Content-Type-Options":
          "nosniff",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "PDF not found" },
      { status: 404 }
    );
  }
}
