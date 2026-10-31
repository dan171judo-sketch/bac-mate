import fs from "node:fs";
import path from "node:path";
import Editor from "./Editor";

export const dynamic = "force-dynamic";

type BacManifest = {
  id?: string;
  documents?: {
    subject?: {
      relativePath?: string;
    };
    markingScheme?: {
      relativePath?: string;
    };
  };
  verification?: {
    pairVerifiedByPipeline?: boolean;
    sourceVerified?: boolean;
  };
};

function getPdfPairFromManifest(workspace: string) {
  const safeWorkspace = path.basename(workspace);

  if (safeWorkspace !== workspace) {
    return {
      subjectPdf: null,
      rubricPdf: null,
    };
  }

  const manifestFile = path.join(
    process.cwd(),
    "data",
    "bac",
    "manifests",
    `${safeWorkspace}.json`
  );

  if (!fs.existsSync(manifestFile)) {
    return {
      subjectPdf: null,
      rubricPdf: null,
    };
  }

  try {
    const manifest = JSON.parse(
      fs.readFileSync(manifestFile, "utf8")
    ) as BacManifest;

    if (manifest.id !== safeWorkspace) {
      return {
        subjectPdf: null,
        rubricPdf: null,
      };
    }

    if (
      manifest.verification?.pairVerifiedByPipeline !== true ||
      manifest.verification?.sourceVerified !== true
    ) {
      return {
        subjectPdf: null,
        rubricPdf: null,
      };
    }

    const subjectRelativePath =
      manifest.documents?.subject?.relativePath;

    const rubricRelativePath =
      manifest.documents?.markingScheme?.relativePath;

    if (!subjectRelativePath || !rubricRelativePath) {
      return {
        subjectPdf: null,
        rubricPdf: null,
      };
    }

    const prefix = "data/bac/sources/";

    if (
      !subjectRelativePath.startsWith(prefix) ||
      !rubricRelativePath.startsWith(prefix)
    ) {
      return {
        subjectPdf: null,
        rubricPdf: null,
      };
    }

    const subjectPdf =
      subjectRelativePath.slice(prefix.length);

    const rubricPdf =
      rubricRelativePath.slice(prefix.length);

    const sourcesRoot = path.resolve(
      process.cwd(),
      "data",
      "bac",
      "sources"
    );

    const subjectAbsolute = path.resolve(
      sourcesRoot,
      subjectPdf
    );

    const rubricAbsolute = path.resolve(
      sourcesRoot,
      rubricPdf
    );

    const isInsideSources = (absolutePath: string) =>
      absolutePath.startsWith(
        sourcesRoot + path.sep
      );

    if (
      !isInsideSources(subjectAbsolute) ||
      !isInsideSources(rubricAbsolute)
    ) {
      return {
        subjectPdf: null,
        rubricPdf: null,
      };
    }

    if (
      path.extname(subjectAbsolute).toLowerCase() !== ".pdf" ||
      path.extname(rubricAbsolute).toLowerCase() !== ".pdf"
    ) {
      return {
        subjectPdf: null,
        rubricPdf: null,
      };
    }

    if (
      !fs.existsSync(subjectAbsolute) ||
      !fs.existsSync(rubricAbsolute)
    ) {
      return {
        subjectPdf: null,
        rubricPdf: null,
      };
    }

    return {
      subjectPdf: subjectPdf
        .split(path.sep)
        .join("/"),
      rubricPdf: rubricPdf
        .split(path.sep)
        .join("/"),
    };
  } catch {
    return {
      subjectPdf: null,
      rubricPdf: null,
    };
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{
    workspace: string;
    slot: string;
  }>;
}) {
  const q = await params;

  const safeWorkspace = path.basename(q.workspace);

  if (safeWorkspace !== q.workspace) {
    return (
      <main className="p-8">
        Workspace invalid.
      </main>
    );
  }

  const workspaceFile = path.join(
    process.cwd(),
    "data",
    "bac",
    "verification-workspaces",
    `${safeWorkspace}.json`
  );

  if (!fs.existsSync(workspaceFile)) {
    return (
      <main className="p-8">
        Workspace inexistent.
      </main>
    );
  }

  let workspaceData: {
    id?: string;
    slots?: Array<{
  slot: string;
  [key: string]: unknown;
}>;
  };

  try {
    workspaceData = JSON.parse(
      fs.readFileSync(workspaceFile, "utf8")
    );
  } catch {
    return (
      <main className="p-8">
        Workspace invalid.
      </main>
    );
  }

  if (workspaceData.id !== safeWorkspace) {
    return (
      <main className="p-8">
        Workspace invalid.
      </main>
    );
  }

  const slots = workspaceData.slots ?? [];

  const index = slots.findIndex(
    (item) => item.slot === q.slot
  );

  if (index < 0) {
    return (
      <main className="p-8">
        Slot inexistent.
      </main>
    );
  }

  const {
    subjectPdf,
    rubricPdf,
  } = getPdfPairFromManifest(
    safeWorkspace
  );

  if (!subjectPdf || !rubricPdf) {
    return (
      <main className="p-8">
        <h1 className="text-xl font-bold">
          Sursa PDF nu poate fi validată.
        </h1>

        <p className="mt-2">
          Manifestul lipsește, sursa nu este
          verificată sau fișierele PDF nu există.
        </p>
      </main>
    );
  }

  return (
    <Editor
      workspace={safeWorkspace}
      slot={slots[index]}
      index={index}
      total={slots.length}
      prevSlot={
        index > 0
          ? slots[index - 1].slot ?? null
          : null
      }
      nextSlot={
        index < slots.length - 1
          ? slots[index + 1].slot ?? null
          : null
      }
      subjectPdf={subjectPdf}
      rubricPdf={rubricPdf}
    />
  );
}