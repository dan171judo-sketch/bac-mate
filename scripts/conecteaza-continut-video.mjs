import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

const fisierComponenta = path.join(
  ROOT,
  "components",
  "LectieUniversala.tsx"
);

const fisierBackup = path.join(
  ROOT,
  "components",
  "LectieUniversala.tsx.backup-video-auto"
);

function opreste(mesaj) {
  console.error("");
  console.error("❌ " + mesaj);
  console.error("");
  process.exit(1);
}

if (!fs.existsSync(fisierComponenta)) {
  opreste(
    "Nu găsesc components\\LectieUniversala.tsx"
  );
}

let cod = fs.readFileSync(
  fisierComponenta,
  "utf8"
);

console.log("");
console.log("========================================");
console.log("🎓 BAC MATE - CONECTARE CONȚINUT VIDEO");
console.log("========================================");
console.log("");

if (!fs.existsSync(fisierBackup)) {
  fs.copyFileSync(
    fisierComponenta,
    fisierBackup
  );

  console.log(
    "✅ Backup creat:"
  );
  console.log(
    "components\\LectieUniversala.tsx.backup-video-auto"
  );
} else {
  console.log(
    "ℹ️ Backup-ul există deja. Nu îl suprascriu."
  );
}

/* =========================================================
   1. IMPORT
========================================================= */

const importNou =
  'import { obtineContinutVideo } from "../data/continut-video";';

if (!cod.includes(importNou)) {
  const importLectieDetaliata =
    'import { continutVectoriInPlan } from "../data/continut/lectii/m5-vectori-in-plan";';

  if (!cod.includes(importLectieDetaliata)) {
    opreste(
      "Nu găsesc importul pentru continutVectoriInPlan. Nu modific nimic."
    );
  }

  cod = cod.replace(
    importLectieDetaliata,
    `${importLectieDetaliata}\n${importNou}`
  );

  console.log(
    "✅ Importul registrului video a fost adăugat."
  );
} else {
  console.log(
    "ℹ️ Importul registrului video există deja."
  );
}

/* =========================================================
   2. CONȚINUTUL VIDEO AL LECȚIEI CURENTE
========================================================= */

const markerContinutu =
  "const continutVideoGenerat = obtineContinutVideo(";

if (!cod.includes(markerContinutu)) {
  const cauta =
    /const\s+continutDetaliat\s*=\s*[\s\S]*?;\s*/;

  const gasit = cod.match(cauta);

  if (!gasit) {
    opreste(
      "Nu găsesc declarația continutDetaliat. Nu modific nimic."
    );
  }

  const blocNou = `${gasit[0]}
  const continutVideoGenerat = obtineContinutVideo(
    lectie.modul,
    lectie.numarLectie
  );

  const videoLectiiGenerate =
    continutVideoGenerat?.videoLectii?.length === 4
      ? continutVideoGenerat.videoLectii
      : [];

  const areVideoGenerat =
    videoLectiiGenerate.length === 4;
`;

  cod = cod.replace(
    gasit[0],
    blocNou
  );

  console.log(
    "✅ Lecția este acum legată automat de registrul video."
  );
} else {
  console.log(
    "ℹ️ Legătura cu registrul video există deja."
  );
}

/* =========================================================
   3. COMPONENTĂ PENTRU VIDEO-URILE GENERATE
========================================================= */

const markerComponenta =
  "function VideoGeneratAutomat(";

if (!cod.includes(markerComponenta)) {
  const pozitieComponenta =
    cod.indexOf("export default function");

  if (pozitieComponenta === -1) {
    opreste(
      "Nu găsesc componenta principală LectieUniversala."
    );
  }

  const componentaVideo = `
function VideoGeneratAutomat({
  video,
  index,
}: {
  video: any;
  index: number;
}) {
  const [variantaAleasa, setVariantaAleasa] =
    useState<number | null>(null);

  const [verificat, setVerificat] =
    useState(false);

  const verificare =
    video?.verificareRapida ?? null;

  const exemplu =
    video?.exemplu ?? null;

  const scenariu =
    Array.isArray(video?.scenariu)
      ? video.scenariu
      : [];

  const idei =
    Array.isArray(video?.ideiDeRetinut)
      ? video.ideiDeRetinut
      : [];

  const formule =
    Array.isArray(video?.formule)
      ? video.formule
      : [];

  const raspunsCorect =
    typeof verificare?.raspunsCorect === "number"
      ? verificare.raspunsCorect
      : null;

  const esteCorect =
    verificat &&
    variantaAleasa !== null &&
    raspunsCorect !== null &&
    variantaAleasa === raspunsCorect;

  return (
    <section
      style={{
        marginTop: 22,
        padding: 22,
        borderRadius: 22,
        border: "1px solid #dbeafe",
        background: "#ffffff",
        boxShadow:
          "0 10px 30px rgba(15, 23, 42, 0.06)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 14,
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 800,
              color: "#2563eb",
              marginBottom: 7,
            }}
          >
            MINI-VIDEO {index + 1}
          </div>

          <h3
            style={{
              margin: 0,
              fontSize: 22,
              color: "#0f172a",
            }}
          >
            {video?.titlu ??
              \`Video \${index + 1}\`}
          </h3>
        </div>

        <div
          style={{
            padding: "7px 11px",
            borderRadius: 999,
            background: "#eff6ff",
            color: "#1d4ed8",
            fontSize: 13,
            fontWeight: 800,
          }}
        >
          ~{video?.durataTintaMinute ?? 5} min
        </div>
      </div>

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

      {scenariu.length > 0 && (
        <details
          style={{
            marginTop: 18,
            borderRadius: 15,
            background: "#f8fafc",
            padding: 15,
          }}
        >
          <summary
            style={{
              cursor: "pointer",
              fontWeight: 800,
              color: "#334155",
            }}
          >
            Vezi explicația acestui mini-video
          </summary>

          <div
            style={{
              marginTop: 13,
              lineHeight: 1.7,
              color: "#334155",
            }}
          >
            {scenariu.map(
              (linie: string, i: number) => (
                <p
                  key={i}
                  style={{
                    margin:
                      i === 0
                        ? "0 0 10px"
                        : "10px 0",
                  }}
                >
                  {linie}
                </p>
              )
            )}
          </div>
        </details>
      )}

      {idei.length > 0 && (
        <div
          style={{
            marginTop: 18,
            padding: 17,
            borderRadius: 16,
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
          }}
        >
          <strong
            style={{
              color: "#166534",
            }}
          >
            🧠 Idei de reținut
          </strong>

          <ul
            style={{
              marginBottom: 0,
              lineHeight: 1.7,
            }}
          >
            {idei.map(
              (idee: string, i: number) => (
                <li key={i}>{idee}</li>
              )
            )}
          </ul>
        </div>
      )}

      {formule.length > 0 && (
        <div
          style={{
            marginTop: 18,
            padding: 17,
            borderRadius: 16,
            background: "#fffbeb",
            border: "1px solid #fde68a",
          }}
        >
          <strong
            style={{
              color: "#92400e",
            }}
          >
            📐 Formule
          </strong>

          <div
            style={{
              marginTop: 10,
              display: "grid",
              gap: 8,
            }}
          >
            {formule.map(
              (formula: any, i: number) => (
                <div key={i}>
                  {typeof formula === "string"
                    ? formula
                    : formula?.formula ??
                      formula?.continut ??
                      formula?.text ??
                      JSON.stringify(formula)}
                </div>
              )
            )}
          </div>
        </div>
      )}

      {exemplu && (
        <div
          style={{
            marginTop: 18,
            padding: 17,
            borderRadius: 16,
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
          }}
        >
          <strong>
            ✏️ Exemplu rapid
          </strong>

          {exemplu.enunt && (
            <p
              style={{
                marginBottom: 10,
                lineHeight: 1.6,
              }}
            >
              {exemplu.enunt}
            </p>
          )}

          {Array.isArray(exemplu.rezolvare) &&
            exemplu.rezolvare.length > 0 && (
              <ol
                style={{
                  lineHeight: 1.7,
                }}
              >
                {exemplu.rezolvare.map(
                  (
                    pas: string,
                    i: number
                  ) => (
                    <li key={i}>{pas}</li>
                  )
                )}
              </ol>
            )}

          {exemplu.raspuns && (
            <div
              style={{
                marginTop: 10,
                fontWeight: 800,
              }}
            >
              Răspuns: {exemplu.raspuns}
            </div>
          )}
        </div>
      )}

      {verificare &&
        Array.isArray(verificare.variante) &&
        verificare.variante.length > 0 && (
          <div
            style={{
              marginTop: 18,
              padding: 17,
              borderRadius: 16,
              background: "#eff6ff",
              border: "1px solid #bfdbfe",
            }}
          >
            <strong>
              ⚡ Verificare rapidă
            </strong>

            <p
              style={{
                lineHeight: 1.6,
              }}
            >
              {verificare.intrebare}
            </p>

            <div
              style={{
                display: "grid",
                gap: 9,
              }}
            >
              {verificare.variante.map(
                (
                  varianta: string,
                  i: number
                ) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setVariantaAleasa(i);
                      setVerificat(false);
                    }}
                    style={{
                      textAlign: "left",
                      padding: "11px 13px",
                      borderRadius: 12,
                      cursor: "pointer",
                      border:
                        variantaAleasa === i
                          ? "2px solid #2563eb"
                          : "1px solid #cbd5e1",
                      background:
                        variantaAleasa === i
                          ? "#dbeafe"
                          : "white",
                    }}
                  >
                    {varianta}
                  </button>
                )
              )}
            </div>

            <button
              type="button"
              disabled={
                variantaAleasa === null
              }
              onClick={() =>
                setVerificat(true)
              }
              style={{
                marginTop: 12,
                padding: "10px 16px",
                border: 0,
                borderRadius: 12,
                background:
                  variantaAleasa === null
                    ? "#94a3b8"
                    : "#2563eb",
                color: "white",
                fontWeight: 800,
                cursor:
                  variantaAleasa === null
                    ? "default"
                    : "pointer",
              }}
            >
              Verifică
            </button>

            {verificat && (
              <div
                style={{
                  marginTop: 13,
                  padding: 12,
                  borderRadius: 12,
                  background: esteCorect
                    ? "#dcfce7"
                    : "#fee2e2",
                  color: esteCorect
                    ? "#166534"
                    : "#991b1b",
                  lineHeight: 1.6,
                }}
              >
                <strong>
                  {esteCorect
                    ? "Corect! ✅"
                    : "Mai încearcă. ❌"}
                </strong>

                {verificare.explicatie && (
                  <div
                    style={{
                      marginTop: 6,
                    }}
                  >
                    {
                      verificare.explicatie
                    }
                  </div>
                )}
              </div>
            )}
          </div>
        )}
    </section>
  );
}

`;

  cod =
    cod.slice(0, pozitieComponenta) +
    componentaVideo +
    cod.slice(pozitieComponenta);

  console.log(
    "✅ Componenta pentru mini-video-uri generate a fost adăugată."
  );
} else {
  console.log(
    "ℹ️ Componenta video automată există deja."
  );
}

/* =========================================================
   4. INTRODUCEM VIDEO-URILE GENERATE ÎN PAGINĂ
========================================================= */

const markerAfisare =
  "{/* BAC_MATE_VIDEO_GENERAT_AUTOMAT */}";

if (!cod.includes(markerAfisare)) {
  /*
    Introducem blocul înainte de primul mini-test.
    Căutăm un marker stabil din interfața existentă.
  */

  const candidati = [
    "Mini-test",
    "MINI-TEST",
    "Exerciții",
    "Exercitii",
  ];

  let pozitie = -1;

  for (const candidat of candidati) {
    const p = cod.indexOf(candidat);

    if (p !== -1) {
      const inceputJSX =
        cod.lastIndexOf("{", p);

      if (inceputJSX !== -1) {
        pozitie = inceputJSX;
        break;
      }
    }
  }

  /*
    Dacă nu găsim markerul mini-testului,
    încercăm înainte de return-ul final al
    secțiunii următoarei lecții.
  */

  if (pozitie === -1) {
    const p = cod.lastIndexOf(
      "lectie.urmatoareaLectie"
    );

    if (p !== -1) {
      pozitie = cod.lastIndexOf(
        "{",
        p
      );
    }
  }

  if (pozitie === -1) {
    opreste(
      "Nu găsesc un loc sigur unde să afișez video-urile. Backup-ul este păstrat și fișierul original nu va fi suprascris."
    );
  }

  const blocAfisare = `
      {/* BAC_MATE_VIDEO_GENERAT_AUTOMAT */}
      {!continutDetaliat &&
        areVideoGenerat && (
          <section
            style={{
              marginTop: 30,
            }}
          >
            <div
              style={{
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  flexWrap: "wrap",
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    color: "#0f172a",
                  }}
                >
                  🎬 Învață prin video
                </h2>

                {process.env.NODE_ENV ===
                  "development" && (
                  <span
                    style={{
                      padding:
                        "5px 9px",
                      borderRadius: 999,
                      background:
                        "#fff7ed",
                      color: "#9a3412",
                      fontSize: 12,
                      fontWeight: 800,
                    }}
                  >
                    conținut generat • verificare automată
                  </span>
                )}
              </div>

              <p
                style={{
                  color: "#64748b",
                  lineHeight: 1.6,
                  marginBottom: 0,
                }}
              >
                Lecția este împărțită în
                4 explicații scurte, urmate
                de exemple și verificări rapide.
              </p>
            </div>

            {videoLectiiGenerate.map(
              (video, index) => (
                <VideoGeneratAutomat
                  key={
                    video.id ??
                    \`\${lectie.id}-video-\${index}\`
                  }
                  video={video}
                  index={index}
                />
              )
            )}
          </section>
        )}

`;

  cod =
    cod.slice(0, pozitie) +
    blocAfisare +
    cod.slice(pozitie);

  console.log(
    "✅ Afișarea automată a video-urilor a fost conectată."
  );
} else {
  console.log(
    "ℹ️ Afișarea automată există deja."
  );
}

/* =========================================================
   5. SALVARE
========================================================= */

fs.writeFileSync(
  fisierComponenta,
  cod,
  "utf8"
);

console.log("");
console.log("========================================");
console.log("✅ CONECTARE TERMINATĂ");
console.log("========================================");
console.log("");
console.log(
  "Lecțiile pot găsi acum automat conținutul"
);
console.log(
  "din data\\continut-video după modul + număr lecție."
);
console.log("");
console.log(
  "Lecția-etalon Vectori în plan rămâne neschimbată."
);
console.log("");
console.log(
  "Backup:"
);
console.log(
  "components\\LectieUniversala.tsx.backup-video-auto"
);
console.log("");