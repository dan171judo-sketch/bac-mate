
"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { lectii } from "../../data/lectii/index";
import { createClient } from "../../lib/supabase/client";

const ULTIMUL_MODUL_BETA = 5;

type Filtru =
  | "toate"
  | "disponibile"
  | "finalizate";

type Progres = Record<string, boolean>;

const TITLURI_MODULE: Record<number, string> = {
  1: "Numere reale, logică și mulțimi",
  2: "Șiruri și funcții",
  3: "Funcția și ecuațiile de gradul I",
  4: "Funcția și ecuația de gradul al II-lea",
  5: "Vectori, trigonometrie și geometrie",
  6: "Puteri, radicali și logaritmi",
  7: "Funcții speciale",
  8: "Numere complexe",
  9: "Combinatorică și probabilități",
  10: "Geometrie analitică",
  11: "Matrice",
  12: "Determinanți",
  13: "Sisteme de ecuații",
  14: "Structuri algebrice",
  15: "Limite și continuitate",
  16: "Derivate",
  17: "Primitive și integrale",
};

export default function LectiiPage() {
  const router = useRouter();

  const [supabase] = useState(() => createClient());

  const [incarcare, setIncarcare] = useState(true);
  const [nume, setNume] = useState("");
  const [progres, setProgres] = useState<Progres>({});
  const [cautare, setCautare] = useState("");
  const [filtru, setFiltru] = useState<Filtru>("toate");

  const module = useMemo(() => {
    return Array.from({ length: 17 }, (_, index) => {
      const numar = index + 1;

      const lectiiModul = lectii
        .filter((lectie) => lectie.modul === numar)
        .sort(
          (a, b) => a.numarLectie - b.numarLectie
        );

      return {
        numar,
        titlu:
          TITLURI_MODULE[numar] ??
          `Modulul ${numar}`,
        disponibil: numar <= ULTIMUL_MODUL_BETA,
        lectii: lectiiModul,
      };
    });
  }, []);

  useEffect(() => {
    let activ = true;

    async function incarcaDate() {
      try {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (!activ) return;

        if (authError || !user) {
          router.replace("/cont");
          return;
        }

        const { data: profil, error: profilError } =
          await supabase
            .from("profiles")
            .select("nume, profil_bac")
            .eq("id", user.id)
            .maybeSingle();

        if (!activ) return;

        if (profilError || !profil) {
          router.replace("/cont");
          return;
        }

        if (!profil.nume) {
          router.replace("/date-personale");
          return;
        }

        if (!profil.profil_bac) {
          router.replace("/profil");
          return;
        }

        setNume(profil.nume);

        const progresLocal: Progres = {};

        for (const lectie of lectii) {
          progresLocal[lectie.id] =
            localStorage.getItem(
              lectie.storageKeyFinalizata
            ) === "da";
        }

        const { data: progresCloud, error } =
          await supabase
            .from("student_progress")
            .select("lesson_id, completed")
            .eq("user_id", user.id);

        if (!activ) return;

        if (!error && progresCloud) {
          for (const rand of progresCloud) {
            progresLocal[rand.lesson_id] =
              rand.completed === true;
          }
        }

        setProgres(progresLocal);
      } catch (error) {
        console.error(
          "Eroare la încărcarea lecțiilor:",
          error
        );
      } finally {
        if (activ) {
          setIncarcare(false);
        }
      }
    }

    void incarcaDate();

    return () => {
      activ = false;
    };
  }, [router, supabase]);

  const lectiiBeta = useMemo(
    () =>
      lectii.filter(
        (lectie) =>
          lectie.modul <= ULTIMUL_MODUL_BETA
      ),
    []
  );

  const totalLectii = lectiiBeta.length;

  const lectiiFinalizate = lectiiBeta.filter(
    (lectie) => progres[lectie.id] === true
  ).length;

  const procentGeneral =
    totalLectii > 0
      ? Math.round(
          (lectiiFinalizate / totalLectii) * 100
        )
      : 0;

  const urmatoareaLectie = lectiiBeta
    .slice()
    .sort(
      (a, b) =>
        a.modul - b.modul ||
        a.numarLectie - b.numarLectie
    )
    .find(
      (lectie) => progres[lectie.id] !== true
    );

  const moduleFiltrate = module
    .map((modul) => {
      const lectiiFiltrate = modul.lectii.filter(
        (lectie) => {
          const termen = cautare
            .trim()
            .toLocaleLowerCase("ro-RO");

          const corespundeCautarii =
            termen.length === 0 ||
            lectie.titlu
              .toLocaleLowerCase("ro-RO")
              .includes(termen) ||
            modul.titlu
              .toLocaleLowerCase("ro-RO")
              .includes(termen);

          if (!corespundeCautarii) {
            return false;
          }

          const finalizata =
            progres[lectie.id] === true;

          if (filtru === "finalizate") {
            return modul.disponibil && finalizata;
          }

          if (filtru === "disponibile") {
            return modul.disponibil && !finalizata;
          }

          return true;
        }
      );

      return {
        ...modul,
        lectiiFiltrate,
      };
    })
    .filter((modul) => {
      if (filtru !== "toate") {
        return modul.lectiiFiltrate.length > 0;
      }

      if (!cautare.trim()) {
        return true;
      }

      return (
        modul.lectiiFiltrate.length > 0 ||
        modul.titlu
          .toLocaleLowerCase("ro-RO")
          .includes(
            cautare.trim().toLocaleLowerCase("ro-RO")
          )
      );
    });

  if (incarcare) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#06110d] text-white">
        <div className="text-center">
          <h1 className="text-3xl font-black text-emerald-400">
            BAC MATE
          </h1>
          <p className="mt-3 text-sm text-gray-400">
            Se încarcă lecțiile...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#06110d] text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* HEADER */}

        <header className="mb-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/dashboard"
              className="text-sm text-emerald-300 hover:text-emerald-200"
            >
              ← Înapoi la dashboard
            </Link>

            <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-xs font-bold text-emerald-300">
              BAC MATE BETA
            </span>
          </div>

          <h1 className="mt-8 text-4xl font-black tracking-tight sm:text-5xl">
            Lecțiile tale
          </h1>

          <p className="mt-3 max-w-2xl text-gray-400">
            Învață matematica pas cu pas, cu explicații
            clare, videoclipuri și exerciții.
          </p>

          {nume && (
            <p className="mt-4 text-emerald-300">
              Bine ai revenit, {nume}!
            </p>
          )}
        </header>

        {/* STATISTICI */}

        <section className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-[#0c2018] p-6">
            <p className="text-sm text-gray-400">
              Module disponibile
            </p>

            <p className="mt-2 text-4xl font-black text-emerald-300">
              5
              <span className="text-xl text-gray-500">
                /17
              </span>
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0c2018] p-6">
            <p className="text-sm text-gray-400">
              Lecții finalizate
            </p>

            <p className="mt-2 text-4xl font-black text-white">
              {lectiiFinalizate}
              <span className="text-xl text-gray-500">
                /{totalLectii}
              </span>
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0c2018] p-6">
            <p className="text-sm text-gray-400">
              Progres BETA
            </p>

            <p className="mt-2 text-4xl font-black text-lime-300">
              {procentGeneral}%
            </p>
          </div>
        </section>

        {/* PROGRES */}

        <section className="mb-8 rounded-3xl border border-emerald-400/20 bg-[#0b2017] p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-bold">
              Progresul tău
            </h2>

            <span className="text-sm text-emerald-300">
              {procentGeneral}% completat
            </span>
          </div>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-black/40">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-lime-300 transition-all"
              style={{
                width: `${procentGeneral}%`,
              }}
            />
          </div>

          {urmatoareaLectie ? (
            <Link
              href={`/lectii/${urmatoareaLectie.slug}`}
              className="mt-6 inline-flex rounded-xl bg-emerald-400 px-6 py-3 font-bold text-[#06110d] transition hover:bg-emerald-300"
            >
              Continuă învățarea →
            </Link>
          ) : (
            <p className="mt-5 text-emerald-300">
              Ai finalizat toate lecțiile disponibile!
            </p>
          )}
        </section>

        {/* CAUTARE SI FILTRE */}

        <section className="mb-8 rounded-2xl border border-white/10 bg-[#0b1b15] p-5">
          <input
            type="search"
            value={cautare}
            onChange={(event) =>
              setCautare(event.target.value)
            }
            placeholder="Caută o lecție sau un modul..."
            className="w-full rounded-xl border border-white/10 bg-[#06110d] px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-emerald-400"
          />

          <div className="mt-4 flex flex-wrap gap-2">
            {(
              [
                ["toate", "Toate"],
                ["disponibile", "Disponibile"],
                ["finalizate", "Finalizate"],
              ] as const
            ).map(([valoare, eticheta]) => (
              <button
                key={valoare}
                type="button"
                onClick={() => setFiltru(valoare)}
                className={`rounded-xl px-5 py-2 text-sm font-semibold transition ${
                  filtru === valoare
                    ? "bg-emerald-400 text-[#06110d]"
                    : "border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10"
                }`}
              >
                {eticheta}
              </button>
            ))}
          </div>
        </section>

        {/* MODULE */}

        <section className="space-y-5">
          {moduleFiltrate.map((modul) => {
            const totalModul = modul.lectii.length;

            const finalizateModul = modul.disponibil
              ? modul.lectii.filter(
                  (lectie) =>
                    progres[lectie.id] === true
                ).length
              : 0;

            const procentModul =
              totalModul > 0 && modul.disponibil
                ? Math.round(
                    (finalizateModul / totalModul) *
                      100
                  )
                : 0;

            return (
              <article
                key={modul.numar}
                className={`overflow-hidden rounded-3xl border ${
                  modul.disponibil
                    ? "border-emerald-400/20 bg-[#0b1d16]"
                    : "border-white/10 bg-[#101713]"
                }`}
              >
                <div className="p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-xl font-black ${
                          modul.disponibil
                            ? "bg-emerald-400/15 text-emerald-300"
                            : "bg-white/5 text-gray-500"
                        }`}
                      >
                        {modul.numar}
                      </div>

                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                          Modulul {modul.numar}
                        </p>

                        <h2 className="mt-1 text-xl font-bold sm:text-2xl">
                          {modul.titlu}
                        </h2>
                      </div>
                    </div>

                    {modul.disponibil ? (
                      <span className="rounded-full bg-emerald-400/10 px-4 py-2 text-xs font-bold text-emerald-300">
                        Disponibil
                      </span>
                    ) : (
                      <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-gray-400">
                        🔒 În curând
                      </span>
                    )}
                  </div>

                  {modul.disponibil ? (
                    <div className="mt-6">
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>
                          {finalizateModul} din{" "}
                          {totalModul} lecții finalizate
                        </span>

                        <span>{procentModul}%</span>
                      </div>

                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-black/40">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-lime-300"
                          style={{
                            width: `${procentModul}%`,
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <p className="mt-5 text-sm text-gray-400">
                      Acest modul va fi disponibil
                      într-o actualizare viitoare
                      BAC MATE.
                    </p>
                  )}
                </div>

                {/* LISTA LECTIILOR */}

                {modul.disponibil && (
                  <div className="space-y-2 border-t border-white/10 p-4">
                    {modul.lectiiFiltrate.map(
                      (lectie) => {
                        const finalizata =
                          progres[lectie.id] === true;

                        return (
                          <Link
                            key={lectie.id}
                            href={`/lectii/${lectie.slug}`}
                            className="flex items-center justify-between gap-4 rounded-2xl border border-transparent bg-[#06130f] p-4 transition hover:border-emerald-400/20 hover:bg-[#10251b]"
                          >
                            <div className="flex items-center gap-4">
                              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 font-bold text-emerald-300">
                                {lectie.numarLectie}
                              </div>

                              <div>
                                <h3 className="font-semibold text-white">
                                  {lectie.titlu}
                                </h3>

                                <p className="mt-1 text-xs text-gray-500">
                                  {lectie.clasa}
                                </p>
                              </div>
                            </div>

                            <span
                              className={`shrink-0 text-sm font-semibold ${
                                finalizata
                                  ? "text-emerald-300"
                                  : "text-gray-400"
                              }`}
                            >
                              {finalizata
                                ? "✓ Finalizată"
                                : "Deschide →"}
                            </span>
                          </Link>
                        );
                      }
                    )}

                    {modul.lectiiFiltrate.length ===
                      0 && (
                      <p className="py-5 text-center text-sm text-gray-500">
                        Nu există lecții pentru
                        filtrul selectat.
                      </p>
                    )}
                  </div>
                )}
              </article>
            );
          })}

          {moduleFiltrate.length === 0 && (
            <div className="rounded-2xl border border-white/10 p-8 text-center text-gray-400">
              Nu am găsit lecții care să
              corespundă căutării.
            </div>
          )}
        </section>

        {/* BETA INFO */}

        <section className="mt-10 rounded-3xl border border-emerald-400/20 bg-gradient-to-r from-[#103123] to-[#071810] p-8">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">
            BAC MATE BETA
          </span>

          <h2 className="mt-3 text-2xl font-black">
            Continuăm să construim împreună!
          </h2>

          <p className="mt-4 max-w-3xl leading-relaxed text-gray-300">
            Primele cinci module sunt disponibile
            în această versiune. Pregătim
            următoarele module, lecții și
            funcționalități pentru actualizările
            viitoare.
          </p>

          <p className="mt-4 text-sm text-emerald-300">
            Progresul tău în lecțiile disponibile
            este păstrat.
          </p>
        </section>

        <footer className="mt-12 border-t border-white/10 py-6 text-center text-sm text-gray-500">
          BAC MATE © 2026 — Învață cu încredere.
        </footer>
      </div>
    </main>
  );
}
