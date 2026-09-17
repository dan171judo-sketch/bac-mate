import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

const componenta = path.join(
  ROOT,
  "components",
  "LectieUniversala.tsx"
);

const backup = path.join(
  ROOT,
  "components",
  "LectieUniversala.tsx.backup-video-real"
);

function opreste(mesaj) {
  console.error("");
  console.error("❌ " + mesaj);
  console.error("");
  process.exit(1);
}

if (!fs.existsSync(componenta)) {
  opreste(
    "Nu găsesc components\\LectieUniversala.tsx"
  );
}

let cod = fs.readFileSync(componenta, "utf8");

console.log("");
console.log("========================================");
console.log("🎬 BAC MATE - CONECTARE VIDEO REAL");
console.log("========================================");
console.log("");

if (!fs.existsSync(backup)) {
  fs.copyFileSync(componenta, backup);

  console.log(
    "✅ Backup creat:"
  );
  console.log(
    "components\\LectieUniversala.tsx.backup-video-real"
  );
} else {
  console.log(
    "ℹ️ Backup-ul există deja."
  );
}

const marker = "BAC_MATE_VIDEO_REAL_V1";

if (cod.includes(marker)) {
  console.log("");
  console.log(
    "ℹ️ Video-ul real este deja conectat."
  );
  console.log("");
  process.exit(0);
}

/*
  Găsim zona placeholderului din componenta
  VideoGeneratAutomat.
*/

const textCautat = `
      <div
        style={{
          marginTop: 18,
          minHeight: 230,
          borderRadius: 18,
          background:
            "linear-gradient(135deg, #0f172a, #1e3a8a)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: 24,
          textAlign: "center",
          color: "white",
        }}
      >
        <div
          style={{
            width: 70,
            height: 70,
            borderRadius: "50%",
            background: "white",
            color: "#2563eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 30,
            marginBottom: 15,
          }}
        >
          ▶
        </div>

        <strong>
          Video în pregătire
        </strong>

        <div
          style={{
            marginTop: 7,
            opacity: 0.8,
            maxWidth: 520,
            lineHeight: 1.5,
          }}
        >
          Scenariul educațional este deja generat.
          MP4-ul va fi conectat automat în etapa
          de producție media.
        </div>
      </div>
`;

if (!cod.includes(textCautat)) {
  opreste(
    "Nu găsesc placeholderul video în forma așteptată. Nu modific nimic."
  );
}

const textNou = `
      {/* BAC_MATE_VIDEO_REAL_V1 */}
      {video?.id === "m1-l01-v1" ? (
        <div
          style={{
            marginTop: 18,
          }}
        >
          <video
            controls
            preload="metadata"
            src="/media/lectii/m1-l01/m1-l01-v1/video.mp4"
            style={{
              width: "100%",
              borderRadius: 18,
              background: "#000000",
              display: "block",
              maxHeight: 520,
            }}
          >
            Browserul tău nu poate reda acest video.
          </video>
        </div>
      ) : (
        <div
          style={{
            marginTop: 18,
            minHeight: 230,
            borderRadius: 18,
            background:
              "linear-gradient(135deg, #0f172a, #1e3a8a)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            padding: 24,
            textAlign: "center",
            color: "white",
          }}
        >
          <div
            style={{
              width: 70,
              height: 70,
              borderRadius: "50%",
              background: "white",
              color: "#2563eb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              marginBottom: 15,
            }}
          >
            ▶
          </div>

          <strong>
            Video în pregătire
          </strong>

          <div
            style={{
              marginTop: 7,
              opacity: 0.8,
              maxWidth: 520,
              lineHeight: 1.5,
            }}
          >
            Scenariul educațional este deja generat.
            MP4-ul va fi conectat automat în etapa
            de producție media.
          </div>
        </div>
      )}
`;

cod = cod.replace(
  textCautat,
  textNou
);

fs.writeFileSync(
  componenta,
  cod,
  "utf8"
);

console.log("");
console.log("========================================");
console.log("✅ VIDEO REAL CONECTAT");
console.log("========================================");
console.log("");
console.log(
  "Primul mini-video folosește acum:"
);
console.log(
  "/media/lectii/m1-l01/m1-l01-v1/video.mp4"
);
console.log("");
console.log(
  "Celelalte video-uri rămân pe placeholder."
);
console.log("");