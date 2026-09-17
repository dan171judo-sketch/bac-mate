"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import type { Lectie } from "../data/lectii";
import { createClient } from "../lib/supabase/client";

import { continutVectoriInPlan } from "../data/continut/lectii/m5-vectori-in-plan";

type Props = {
  lectie: Lectie;
};

export default function LectieUniversala({
  lectie,
}: Props) {
  const router = useRouter();

  const [supabase] = useState(() =>
    createClient()
  );

  const [
    accesVerificat,
    setAccesVerificat,
  ] = useState(false);

  const [
    exercitiuCurent,
    setExercitiuCurent,
  ] = useState(0);

  const [raspuns, setRaspuns] = useState<
    number | null
  >(null);

  const [verificat, setVerificat] =
    useState(false);

  const [xpLectie, setXpLectie] =
    useState(0);

  const [
    xpAcordatLaUltimaVerificare,
    setXpAcordatLaUltimaVerificare,
  ] = useState(false);

  const [
    lectieFinalizata,
    setLectieFinalizata,
  ] = useState(false);

  const [
    videoDeschis,
    setVideoDeschis,
  ] = useState<number | null>(null);

  const [
    raspunsVideo,
    setRaspunsVideo,
  ] = useState<number | null>(null);

  const [
    videoVerificat,
    setVideoVerificat,
  ] = useState(false);

  const [
    teorieCompletaDeschisa,
    setTeorieCompletaDeschisa,
  ] = useState(false);

  const [
    exempluDeschis,
    setExempluDeschis,
  ] = useState<string | null>(null);

  const [
    salvareCloud,
    setSalvareCloud,
  ] = useState<
    "nimic" | "salvare" | "salvat" | "eroare"
  >("nimic");

  const continutDetaliat =
    lectie.slug ===
    continutVectoriInPlan.slug
      ? continutVectoriInPlan
      : null;

  useEffect(() => {
    let activ = true;

    async function verificaAccesulSiIncarcaProgresul() {
      const {
        data: { user },
        error: userError,
      } =
        await supabase.auth.getUser();

      if (!activ) {
        return;
      }

      if (userError || !user) {
        router.replace("/cont");
        return;
      }

      const {
        data: profil,
        error: profilError,
      } = await supabase
        .from("profiles")
        .select(
          "nume, profil_bac, evaluare_initiala_finalizata"
        )
        .eq("id", user.id)
        .maybeSingle();

      if (!activ) {
        return;
      }

      if (profilError) {
        router.replace("/cont");
        return;
      }

      if (!profil?.nume) {
        router.replace(
          "/date-personale"
        );
        return;
      }

      if (!profil.profil_bac) {
        router.replace("/profil");
        return;
      }

      if (
        !profil.evaluare_initiala_finalizata
      ) {
        router.replace("/evaluare");
        return;
      }

      localStorage.setItem(
        "bac-mate-nume",
        profil.nume
      );

      localStorage.setItem(
        "bac-mate-profil-cod",
        profil.profil_bac
      );

      localStorage.setItem(
        "bac-mate-evaluare-initiala-finalizata",
        "da"
      );

      const finalizataLocal =
        localStorage.getItem(
          lectie.storageKeyFinalizata
        ) === "da";

      const xpLocal = Number(
        localStorage.getItem(
          lectie.storageKeyXp
        ) || "0"
      );

      if (activ) {
        setLectieFinalizata(
          finalizataLocal
        );

        setXpLectie(
          Number.isNaN(xpLocal)
            ? 0
            : xpLocal
        );
      }

      const { data, error } =
        await supabase
          .from("student_progress")
          .select("completed, xp")
          .eq("user_id", user.id)
          .eq(
            "lesson_id",
            lectie.id
          )
          .maybeSingle();

      if (!activ) {
        return;
      }

      if (!error && data) {
        const xpSupabase =
          typeof data.xp === "number"
            ? data.xp
            : 0;

        const finalizataSupabase =
          data.completed === true;

        setXpLectie(xpSupabase);

        setLectieFinalizata(
          finalizataSupabase
        );

        localStorage.setItem(
          lectie.storageKeyXp,
          String(xpSupabase)
        );

        if (finalizataSupabase) {
          localStorage.setItem(
            lectie.storageKeyFinalizata,
            "da"
          );
        } else {
          localStorage.removeItem(
            lectie.storageKeyFinalizata
          );
        }
      }

      if (activ) {
        setAccesVerificat(true);
      }
    }

    verificaAccesulSiIncarcaProgresul();

    return () => {
      activ = false;
    };
  }, [
    lectie.id,
    lectie.storageKeyFinalizata,
    lectie.storageKeyXp,
    router,
    supabase,
  ]);

  const exercitiu =
    lectie.exercitii[
      exercitiuCurent
    ];

  const esteUltimul =
    exercitiuCurent ===
    lectie.exercitii.length - 1;

  const corect =
    raspuns ===
    exercitiu?.corect;

  const xpMaxim =
    lectie.exercitii.length * 10;

  /*
    XP determinist pe exercițiu.

    Exercițiul 0 -> țintă 10 XP
    Exercițiul 1 -> țintă 20 XP
    Exercițiul 2 -> țintă 30 XP

    Dacă elevul repetă un exercițiu deja creditat,
    XP-ul nu mai crește.
  */
  const xpTintaExercitiu =
    Math.min(
      (exercitiuCurent + 1) * 10,
      xpMaxim
    );

  async function salveazaProgresulInSupabase(
    xp: number,
    finalizata: boolean
  ) {
    setSalvareCloud("salvare");

    const {
      data: { user },
      error: userError,
    } =
      await supabase.auth.getUser();

    if (userError || !user) {
      setSalvareCloud("eroare");
      router.replace("/cont");
      return;
    }

    const { error } =
      await supabase
        .from("student_progress")
        .upsert(
          {
            user_id: user.id,
            lesson_id: lectie.id,
            xp,
            completed:
              finalizata,
            updated_at:
              new Date().toISOString(),
          },
          {
            onConflict:
              "user_id,lesson_id",
          }
        );

    if (error) {
      console.error(
        "Eroare la salvarea progresului:",
        error
      );

      setSalvareCloud("eroare");
      return;
    }

    setSalvareCloud("salvat");
  }

  async function verificaRaspunsul() {
    if (
      raspuns === null ||
      !exercitiu ||
      verificat
    ) {
      return;
    }

    setVerificat(true);

    setXpAcordatLaUltimaVerificare(
      false
    );

    if (
      raspuns ===
      exercitiu.corect
    ) {
      const acordaXpNou =
        xpLectie <
        xpTintaExercitiu;

      const xpNou =
        Math.max(
          xpLectie,
          xpTintaExercitiu
        );

      setXpAcordatLaUltimaVerificare(
        acordaXpNou
      );

      const finalizataAcum =
        esteUltimul;

      setXpLectie(xpNou);

      localStorage.setItem(
        lectie.storageKeyXp,
        String(xpNou)
      );

      if (finalizataAcum) {
        setLectieFinalizata(true);

        localStorage.setItem(
          lectie.storageKeyFinalizata,
          "da"
        );
      }

      await salveazaProgresulInSupabase(
        xpNou,
        finalizataAcum ||
          lectieFinalizata
      );
    }
  }

  function urmatorulExercitiu() {
    if (
      exercitiuCurent >=
      lectie.exercitii.length - 1
    ) {
      return;
    }

    setExercitiuCurent(
      (valoare) =>
        valoare + 1
    );

    setRaspuns(null);
    setVerificat(false);

    setXpAcordatLaUltimaVerificare(
      false
    );
    setSalvareCloud("nimic");
  }

  function incearcaDinNou() {
    setRaspuns(null);
    setVerificat(false);

    setXpAcordatLaUltimaVerificare(
      false
    );
    setSalvareCloud("nimic");
  }

  function comutaVideo(
    numar: number
  ) {
    if (videoDeschis === numar) {
      setVideoDeschis(null);
    } else {
      setVideoDeschis(numar);
    }

    setRaspunsVideo(null);
    setVideoVerificat(false);
  }

  if (!accesVerificat) {
    return (
      <main className="min-h-screen bg-slate-950 text-white">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <p className="text-slate-400">
            Se verifică autentificarea și
            se încarcă lecția...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a
            href="/programa"
            className="font-bold text-slate-300 transition hover:text-white"
          >
            ← Programa mea
          </a>

          <a
            href="/"
            className="text-xl font-black"
          >
            BAC{" "}
            <span className="text-blue-500">
              MATE
            </span>
          </a>

          <div className="rounded-xl bg-blue-500/10 px-4 py-2 text-sm font-bold text-blue-400">
            {lectie.profil}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-10">

        {/* INTRODUCERE */}

        <section>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm font-bold text-blue-400">
              MODUL {lectie.modul}
            </span>

            <span className="rounded-full bg-slate-900 px-3 py-1 text-sm font-bold text-slate-400">
              Lecția{" "}
              {lectie.numarLectie}
            </span>

            <span className="rounded-full bg-slate-900 px-3 py-1 text-sm font-bold text-slate-400">
              {lectie.clasa}
            </span>

            {continutDetaliat && (
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-bold text-emerald-400">
                ✓ Lecție BAC MATE
              </span>
            )}
          </div>

          <h1 className="mt-5 text-4xl font-black leading-tight md:text-5xl">
            {continutDetaliat
              ? continutDetaliat.titlu
              : lectie.titlu}
          </h1>

          {continutDetaliat && (
            <p className="mt-4 max-w-3xl text-xl font-semibold leading-8 text-blue-300">
              {
                continutDetaliat.subtitlu
              }
            </p>
          )}

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            {continutDetaliat
              ? continutDetaliat.descriere
              : lectie.descriere}
          </p>

          {continutDetaliat && (
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-slate-300">
                ⏱{" "}
                {
                  continutDetaliat.durataEstimataMinute
                }{" "}
                minute
              </span>

              <span className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-slate-300">
                🎬{" "}
                {
                  continutDetaliat.videoLectii
                    .length
                }{" "}
                mini-video
              </span>
            </div>
          )}

          <div className="mt-8 h-3 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-blue-500"
              style={{
                width: `${
                  (lectie.numarLectie /
                    lectie.totalLectiiModul) *
                  100
                }%`,
              }}
            />
          </div>

          <p className="mt-2 text-sm text-slate-500">
            Modul {lectie.modul} • Lecția{" "}
            {lectie.numarLectie} din{" "}
            {
              lectie.totalLectiiModul
            }
          </p>
        </section>

        {continutDetaliat ? (
          <>
            {/* OBIECTIVE SCURTE */}

            <section className="mt-10 rounded-3xl border border-blue-500/20 bg-blue-500/5 p-7">
              <p className="text-sm font-black uppercase tracking-wider text-blue-400">
                🎯 La finalul lecției
              </p>

              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {continutDetaliat.obiective.map(
                  (
                    obiectiv,
                    index
                  ) => (
                    <div
                      key={`${obiectiv}-${index}`}
                      className="flex gap-3 rounded-2xl bg-slate-950 p-4"
                    >
                      <span className="font-black text-blue-400">
                        ✓
                      </span>

                      <p className="leading-7 text-slate-200">
                        {obiectiv}
                      </p>
                    </div>
                  )
                )}
              </div>
            </section>

            {/* VIDEO PRINCIPAL */}

            <section className="mt-12">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-black uppercase tracking-wider text-blue-400">
                    🎬 Lecția video
                  </p>

                  <h2 className="mt-2 text-3xl font-black md:text-4xl">
                    Învață în bucăți scurte
                  </h2>

                  <p className="mt-3 max-w-2xl leading-7 text-slate-400">
                    Urmărește câte o explicație,
                    apoi verifică imediat dacă ai
                    înțeles.
                  </p>
                </div>

                <div className="rounded-xl bg-blue-500/10 px-4 py-3 text-sm font-black text-blue-300">
                  {
                    continutDetaliat.videoLectii
                      .length
                  }{" "}
                  părți
                </div>
              </div>

              <div className="mt-7 space-y-6">
                {continutDetaliat.videoLectii.map(
                  (video) => {
                    const deschis =
                      videoDeschis ===
                      video.numar;

                    const intrebare =
                      video.verificareRapida;

                    const raspunsVideoCorect =
                      intrebare &&
                      raspunsVideo ===
                        intrebare.raspunsCorect;

                    return (
                      <article
                        key={video.id}
                        className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900"
                      >
                        {/* PLAYER */}

                        <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden bg-slate-950 px-6 py-12">
                          <div className="absolute left-5 top-5 rounded-full bg-blue-600 px-4 py-2 text-sm font-black">
                            PARTEA{" "}
                            {video.numar}
                          </div>

                          <div className="absolute right-5 top-5 rounded-full bg-slate-900 px-4 py-2 text-sm font-bold text-slate-300">
                            ⏱{" "}
                            {
                              video.durataMinute
                            }{" "}
                            min
                          </div>

                          <div className="max-w-2xl text-center">
                            {video.videoUrl ? (
                              <video
                                controls
                                className="mx-auto w-full rounded-2xl"
                                src={
                                  video.videoUrl
                                }
                              />
                            ) : (
                              <>
                                <button
                                  type="button"
                                  onClick={() =>
                                    comutaVideo(
                                      video.numar
                                    )
                                  }
                                  className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 text-4xl shadow-2xl transition hover:scale-105 hover:bg-blue-500"
                                >
                                  {deschis
                                    ? "✓"
                                    : "▶"}
                                </button>

                                <h3 className="mt-7 text-2xl font-black md:text-3xl">
                                  {
                                    video.titlu
                                  }
                                </h3>

                                <p className="mt-4 leading-7 text-slate-400">
                                  {
                                    video.descriere
                                  }
                                </p>

                                <p className="mt-5 text-sm font-bold text-slate-600">
                                  Videoclipul BAC MATE
                                  va fi integrat aici.
                                </p>
                              </>
                            )}
                          </div>
                        </div>

                        {/* BUTON CONȚINUT */}

                        <button
                          type="button"
                          onClick={() =>
                            comutaVideo(
                              video.numar
                            )
                          }
                          className="flex w-full items-center justify-between gap-4 border-t border-slate-800 p-6 text-left"
                        >
                          <div>
                            <p className="text-sm font-black uppercase tracking-wider text-emerald-400">
                              După video
                            </p>

                            <p className="mt-1 text-xl font-black">
                              Verifică ce ai
                              înțeles
                            </p>
                          </div>

                          <span className="text-2xl text-slate-400">
                            {deschis
                              ? "−"
                              : "+"}
                          </span>
                        </button>

                        {deschis && (
                          <div className="border-t border-slate-800 p-6 md:p-7">

                            {/* IDEI CHEIE */}

                            <div>
                              <p className="text-sm font-black uppercase tracking-wider text-emerald-400">
                                🧠 3 lucruri de
                                reținut
                              </p>

                              <div className="mt-4 grid gap-3 md:grid-cols-3">
                                {video.ideiDeRetinut.map(
                                  (
                                    idee,
                                    index
                                  ) => (
                                    <div
                                      key={`${idee}-${index}`}
                                      className="rounded-2xl bg-slate-950 p-5"
                                    >
                                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 font-black text-emerald-400">
                                        ✓
                                      </div>

                                      <p className="mt-3 leading-7 text-slate-200">
                                        {
                                          idee
                                        }
                                      </p>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>

                            {/* EXEMPLU */}

                            <div className="mt-7 rounded-3xl border border-blue-500/20 bg-blue-500/5 p-6">
                              <p className="text-sm font-black uppercase tracking-wider text-blue-400">
                                ✏️{" "}
                                {
                                  video
                                    .exemplu
                                    .titlu
                                }
                              </p>

                              <p className="mt-4 text-lg font-black leading-8">
                                {
                                  video
                                    .exemplu
                                    .enunt
                                }
                              </p>

                              <div className="mt-5 space-y-3">
                                {video.exemplu.rezolvareScurta.map(
                                  (
                                    pas,
                                    index
                                  ) => (
                                    <div
                                      key={`${pas}-${index}`}
                                      className="flex gap-3 rounded-2xl bg-slate-950 p-4"
                                    >
                                      <span className="font-black text-blue-400">
                                        {index +
                                          1}
                                        .
                                      </span>

                                      <p className="leading-7 text-slate-300">
                                        {
                                          pas
                                        }
                                      </p>
                                    </div>
                                  )
                                )}
                              </div>

                              <div className="mt-5 rounded-2xl bg-emerald-500/10 p-4">
                                <span className="font-black text-emerald-400">
                                  Răspuns:{" "}
                                </span>

                                <span className="font-bold">
                                  {
                                    video
                                      .exemplu
                                      .raspuns
                                  }
                                </span>
                              </div>
                            </div>

                            {/* VERIFICARE VIDEO */}

                            {intrebare && (
                              <div className="mt-7 rounded-3xl border border-violet-500/20 bg-violet-500/5 p-6">
                                <p className="text-sm font-black uppercase tracking-wider text-violet-400">
                                  ⚡ Verificare
                                  rapidă
                                </p>

                                <h4 className="mt-4 text-xl font-black leading-8">
                                  {
                                    intrebare.intrebare
                                  }
                                </h4>

                                <div className="mt-5 grid gap-3">
                                  {intrebare.variante.map(
                                    (
                                      varianta,
                                      index
                                    ) => {
                                      let stil =
                                        "border-slate-700 bg-slate-950 hover:border-slate-500";

                                      if (
                                        raspunsVideo ===
                                        index
                                      ) {
                                        stil =
                                          "border-violet-500 bg-violet-500/10";
                                      }

                                      if (
                                        videoVerificat &&
                                        index ===
                                          intrebare.raspunsCorect
                                      ) {
                                        stil =
                                          "border-emerald-500 bg-emerald-500/10";
                                      }

                                      if (
                                        videoVerificat &&
                                        raspunsVideo ===
                                          index &&
                                        index !==
                                          intrebare.raspunsCorect
                                      ) {
                                        stil =
                                          "border-red-500 bg-red-500/10";
                                      }

                                      return (
                                        <button
                                          key={`${varianta}-${index}`}
                                          type="button"
                                          disabled={
                                            videoVerificat
                                          }
                                          onClick={() =>
                                            setRaspunsVideo(
                                              index
                                            )
                                          }
                                          className={`rounded-2xl border px-5 py-4 text-left font-semibold transition ${stil}`}
                                        >
                                          <span className="mr-3 text-slate-500">
                                            {String.fromCharCode(
                                              65 +
                                                index
                                            )}
                                            .
                                          </span>

                                          {
                                            varianta
                                          }
                                        </button>
                                      );
                                    }
                                  )}
                                </div>

                                {!videoVerificat && (
                                  <button
                                    type="button"
                                    disabled={
                                      raspunsVideo ===
                                      null
                                    }
                                    onClick={() =>
                                      setVideoVerificat(
                                        true
                                      )
                                    }
                                    className={`mt-5 rounded-xl px-5 py-3 font-black transition ${
                                      raspunsVideo !==
                                      null
                                        ? "bg-violet-600 hover:bg-violet-500"
                                        : "cursor-not-allowed bg-slate-800 text-slate-500"
                                    }`}
                                  >
                                    Verifică
                                  </button>
                                )}

                                {videoVerificat && (
                                  <div
                                    className={`mt-5 rounded-2xl p-5 ${
                                      raspunsVideoCorect
                                        ? "bg-emerald-500/10"
                                        : "bg-red-500/10"
                                    }`}
                                  >
                                    <p
                                      className={`font-black ${
                                        raspunsVideoCorect
                                          ? "text-emerald-400"
                                          : "text-red-400"
                                      }`}
                                    >
                                      {raspunsVideoCorect
                                        ? "✓ Corect!"
                                        : "Nu încă. Uită-te la explicație."}
                                    </p>

                                    <p className="mt-2 leading-7 text-slate-300">
                                      {
                                        intrebare.explicatie
                                      }
                                    </p>

                                    {!raspunsVideoCorect && (
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setRaspunsVideo(
                                            null
                                          );

                                          setVideoVerificat(
                                            false
                                          );
                                        }}
                                        className="mt-4 rounded-xl border border-slate-700 px-4 py-2 font-bold"
                                      >
                                        Încearcă din
                                        nou
                                      </button>
                                    )}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </article>
                    );
                  }
                )}
              </div>
            </section>

            {/* PROFESOR AI */}

            <section className="mt-10 rounded-3xl border border-violet-500/30 bg-violet-500/10 p-7">
              <p className="text-sm font-black uppercase tracking-wider text-violet-400">
                🤖 Profesorul BAC MATE
              </p>

              <h2 className="mt-3 text-2xl font-black">
                Nu ai înțeles ceva?
              </h2>

              <p className="mt-3 max-w-3xl leading-7 text-slate-300">
                Profesorul AI va putea
                să îți explice exact
                partea la care te-ai
                blocat, fără să fie
                nevoie să recitești
                toată lecția.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  className="rounded-xl bg-violet-600 px-4 py-3 font-bold transition hover:bg-violet-500"
                >
                  💡 Explică-mi mai
                  simplu
                </button>

                <button
                  type="button"
                  className="rounded-xl border border-violet-500/30 px-4 py-3 font-bold"
                >
                  🧩 Dă-mi alt
                  exemplu
                </button>

                <button
                  type="button"
                  className="rounded-xl border border-violet-500/30 px-4 py-3 font-bold"
                >
                  🎯 Testează-mă
                </button>
              </div>

              <p className="mt-4 text-xs text-violet-300/60">
                Profesorul AI va fi
                conectat într-o etapă
                ulterioară.
              </p>
            </section>

            {/* TEORIA COMPLETĂ ASCUNSĂ */}

            <section className="mt-10 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
              <button
                type="button"
                onClick={() =>
                  setTeorieCompletaDeschisa(
                    (valoare) =>
                      !valoare
                  )
                }
                className="flex w-full items-center justify-between gap-5 p-7 text-left"
              >
                <div>
                  <p className="text-sm font-black uppercase tracking-wider text-slate-500">
                    📚 Material de
                    aprofundare
                  </p>

                  <h2 className="mt-2 text-2xl font-black">
                    Vrei explicația
                    completă?
                  </h2>

                  <p className="mt-2 text-slate-400">
                    Definiții, teorie,
                    formule, exemple
                    rezolvate și
                    greșeli frecvente.
                  </p>
                </div>

                <span className="text-3xl text-slate-400">
                  {teorieCompletaDeschisa
                    ? "−"
                    : "+"}
                </span>
              </button>

              {teorieCompletaDeschisa && (
                <div className="border-t border-slate-800 p-7">

                  {/* TERMENI */}

                  <div>
                    <p className="text-sm font-black uppercase tracking-wider text-violet-400">
                      Termeni cheie
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {continutDetaliat.termeniCheie.map(
                        (termen) => (
                          <span
                            key={termen}
                            className="rounded-full bg-violet-500/10 px-4 py-2 text-sm font-bold text-violet-300"
                          >
                            {termen}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  {/* DEFINIȚII */}

                  <div className="mt-10">
                    <h3 className="text-2xl font-black">
                      Definiții
                    </h3>

                    <div className="mt-5 space-y-4">
                      {continutDetaliat.definitii.map(
                        (
                          definitie,
                          index
                        ) => (
                          <div
                            key={`${definitie.termen}-${index}`}
                            className="rounded-2xl bg-slate-950 p-5"
                          >
                            <p className="font-black text-blue-300">
                              {
                                definitie.termen
                              }
                            </p>

                            <p className="mt-3 leading-7 text-slate-300">
                              {
                                definitie.definitie
                              }
                            </p>

                            {definitie.observatie && (
                              <p className="mt-3 text-sm leading-6 text-blue-200">
                                💡{" "}
                                {
                                  definitie.observatie
                                }
                              </p>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* TEORIE */}

                  <div className="mt-10">
                    <h3 className="text-2xl font-black">
                      Teorie
                    </h3>

                    <div className="mt-5 space-y-5">
                      {continutDetaliat.teorie.map(
                        (sectiune) => (
                          <div
                            key={
                              sectiune.id
                            }
                            className="rounded-2xl bg-slate-950 p-6"
                          >
                            <h4 className="text-xl font-black">
                              {
                                sectiune.titlu
                              }
                            </h4>

                            <p className="mt-3 leading-7 text-slate-300">
                              {
                                sectiune.explicatie
                              }
                            </p>

                            <div className="mt-4 space-y-2">
                              {sectiune.ideiCheie.map(
                                (
                                  idee,
                                  index
                                ) => (
                                  <p
                                    key={`${idee}-${index}`}
                                    className="leading-7 text-slate-400"
                                  >
                                    ✓{" "}
                                    {
                                      idee
                                    }
                                  </p>
                                )
                              )}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* FORMULE */}

                  <div className="mt-10">
                    <h3 className="text-2xl font-black">
                      Relații importante
                    </h3>

                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                      {continutDetaliat.formule.map(
                        (formula) => (
                          <div
                            key={
                              formula.id
                            }
                            className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5"
                          >
                            <p className="font-black text-amber-300">
                              {
                                formula.nume
                              }
                            </p>

                            <div className="mt-4 rounded-xl bg-slate-950 p-4 text-center text-xl font-black">
                              {
                                formula.formula
                              }
                            </div>

                            <p className="mt-4 leading-7 text-slate-300">
                              {
                                formula.explicatie
                              }
                            </p>

                            {formula.exempluScurt && (
                              <p className="mt-3 text-sm leading-6 text-slate-400">
                                Exemplu:{" "}
                                {
                                  formula.exempluScurt
                                }
                              </p>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* EXEMPLE COMPLETE */}

                  <div className="mt-10">
                    <h3 className="text-2xl font-black">
                      Exemple rezolvate
                    </h3>

                    <div className="mt-5 space-y-4">
                      {continutDetaliat.exempleRezolvate.map(
                        (exemplu) => {
                          const deschis =
                            exempluDeschis ===
                            exemplu.id;

                          return (
                            <div
                              key={
                                exemplu.id
                              }
                              className="overflow-hidden rounded-2xl bg-slate-950"
                            >
                              <button
                                type="button"
                                onClick={() =>
                                  setExempluDeschis(
                                    deschis
                                      ? null
                                      : exemplu.id
                                  )
                                }
                                className="flex w-full items-center justify-between gap-4 p-5 text-left"
                              >
                                <div>
                                  <p className="font-black">
                                    {
                                      exemplu.titlu
                                    }
                                  </p>

                                  <p className="mt-2 text-sm leading-6 text-slate-400">
                                    {
                                      exemplu.enunt
                                    }
                                  </p>
                                </div>

                                <span className="text-xl text-slate-400">
                                  {deschis
                                    ? "−"
                                    : "+"}
                                </span>
                              </button>

                              {deschis && (
                                <div className="border-t border-slate-800 p-5">
                                  <div className="space-y-3">
                                    {exemplu.pasi.map(
                                      (
                                        pas
                                      ) => (
                                        <div
                                          key={
                                            pas.numar
                                          }
                                          className="flex gap-3 rounded-xl bg-slate-900 p-4"
                                        >
                                          <span className="font-black text-blue-400">
                                            {
                                              pas.numar
                                            }
                                            .
                                          </span>

                                          <div>
                                            <p className="font-black">
                                              {
                                                pas.titlu
                                              }
                                            </p>

                                            <p className="mt-2 leading-7 text-slate-300">
                                              {
                                                pas.continut
                                              }
                                            </p>
                                          </div>
                                        </div>
                                      )
                                    )}
                                  </div>

                                  <div className="mt-4 rounded-xl bg-emerald-500/10 p-4">
                                    <span className="font-black text-emerald-400">
                                      Răspuns:{" "}
                                    </span>

                                    {
                                      exemplu.raspunsFinal
                                    }
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>

                  {/* GREȘELI */}

                  <div className="mt-10">
                    <h3 className="text-2xl font-black text-red-300">
                      ⚠ Greșeli frecvente
                    </h3>

                    <div className="mt-5 space-y-4">
                      {continutDetaliat.greseliFrecvente.map(
                        (
                          greseala,
                          index
                        ) => (
                          <div
                            key={
                              index
                            }
                            className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5"
                          >
                            <p className="font-black text-red-300">
                              ❌{" "}
                              {
                                greseala.greseala
                              }
                            </p>

                            <p className="mt-3 leading-7 text-slate-400">
                              <strong className="text-slate-200">
                                De ce:
                              </strong>{" "}
                              {
                                greseala.deCeEsteGresit
                              }
                            </p>

                            <p className="mt-3 leading-7 text-emerald-300">
                              <strong>
                                Cum o eviți:
                              </strong>{" "}
                              {
                                greseala.cumOEviti
                              }
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* REZUMAT */}

            <section className="mt-10 rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-7">
              <p className="text-sm font-black uppercase tracking-wider text-emerald-400">
                🧠 Fișa de 30 de
                secunde
              </p>

              <h2 className="mt-3 text-2xl font-black">
                Ce trebuie să reții
              </h2>

              <div className="mt-5 space-y-3">
                {continutDetaliat.rezumat.ideiDeRetinut.map(
                  (
                    idee,
                    index
                  ) => (
                    <div
                      key={`${idee}-${index}`}
                      className="flex gap-3 rounded-2xl bg-slate-950 p-4"
                    >
                      <span className="text-emerald-400">
                        ✓
                      </span>

                      <p className="leading-7 text-slate-300">
                        {idee}
                      </p>
                    </div>
                  )
                )}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {continutDetaliat.rezumat.formuleDeRetinut.map(
                  (formula) => (
                    <span
                      key={
                        formula
                      }
                      className="rounded-xl bg-slate-950 px-4 py-3 font-black"
                    >
                      {formula}
                    </span>
                  )
                )}
              </div>
            </section>
          </>
        ) : (
          <>
            {/* SISTEM VECHI PENTRU RESTUL LECȚIILOR */}

            <section className="mt-10 rounded-3xl border border-blue-500/20 bg-blue-500/5 p-7">
              <p className="text-sm font-black uppercase tracking-wider text-blue-400">
                🎯 Obiective
              </p>

              <h2 className="mt-3 text-2xl font-black">
                Ce vei ști să faci
              </h2>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {lectie.obiective.map(
                  (
                    obiectiv,
                    index
                  ) => (
                    <div
                      key={`${obiectiv.titlu}-${index}`}
                      className="rounded-2xl bg-slate-950 p-5"
                    >
                      <p className="text-3xl">
                        {
                          obiectiv.icon
                        }
                      </p>

                      <p className="mt-3 font-black">
                        {
                          obiectiv.titlu
                        }
                      </p>

                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        {
                          obiectiv.descriere
                        }
                      </p>
                    </div>
                  )
                )}
              </div>
            </section>

            <section className="mt-10">
              <p className="text-sm font-black uppercase tracking-wider text-blue-400">
                Lecția video
              </p>

              <h2 className="mt-2 text-3xl font-black">
                Învață pas cu pas
              </h2>

              <div className="mt-7 space-y-6">
                {lectie.videoLectii.map(
                  (video) => {
                    const deschis =
                      videoDeschis ===
                      video.numar;

                    return (
                      <article
                        key={
                          video.numar
                        }
                        className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900"
                      >
                        <div className="relative flex min-h-[300px] items-center justify-center bg-slate-950 px-6 py-10">
                          <div className="absolute left-5 top-5 rounded-full bg-blue-600 px-4 py-2 text-sm font-black">
                            VIDEO{" "}
                            {
                              video.numar
                            }
                          </div>

                          <div className="absolute right-5 top-5 rounded-full bg-slate-900 px-4 py-2 text-sm text-slate-300">
                            ⏱{" "}
                            {
                              video.durata
                            }
                          </div>

                          <div className="max-w-xl text-center">
                            <button
                              type="button"
                              onClick={() =>
                                setVideoDeschis(
                                  deschis
                                    ? null
                                    : video.numar
                                )
                              }
                              className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-3xl"
                            >
                              ▶
                            </button>

                            <h3 className="mt-6 text-2xl font-black">
                              {
                                video.titlu
                              }
                            </h3>

                            <p className="mt-3 leading-7 text-slate-400">
                              {
                                video.descriere
                              }
                            </p>
                          </div>
                        </div>

                        {deschis && (
                          <div className="p-6">
                            <div className="grid gap-3 md:grid-cols-2">
                              {video.idei.map(
                                (
                                  idee,
                                  index
                                ) => (
                                  <div
                                    key={`${idee}-${index}`}
                                    className="flex gap-3 rounded-2xl bg-slate-950 p-4"
                                  >
                                    <span className="text-emerald-400">
                                      ✓
                                    </span>

                                    <p>
                                      {
                                        idee
                                      }
                                    </p>
                                  </div>
                                )
                              )}
                            </div>

                            <div className="mt-5 rounded-2xl bg-blue-500/5 p-5">
                              <p className="font-black text-blue-400">
                                {
                                  video.exempluTitlu
                                }
                              </p>

                              <p className="mt-3 leading-7 text-slate-300">
                                {
                                  video.exemplu
                                }
                              </p>
                            </div>
                          </div>
                        )}
                      </article>
                    );
                  }
                )}
              </div>
            </section>

            <section className="mt-10 rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-7">
              <p className="text-sm font-black uppercase tracking-wider text-emerald-400">
                🧠 Fișa rapidă
              </p>

              <h2 className="mt-3 text-2xl font-black">
                {
                  lectie.fisaRapida
                    .titlu
                }
              </h2>

              <div className="mt-5 space-y-3">
                {lectie.fisaRapida.continut.map(
                  (
                    rand,
                    index
                  ) => (
                    <div
                      key={`${rand}-${index}`}
                      className="flex gap-3 rounded-2xl bg-slate-950 p-4"
                    >
                      <span className="text-emerald-400">
                        ✓
                      </span>

                      <p className="leading-7 text-slate-300">
                        {rand}
                      </p>
                    </div>
                  )
                )}
              </div>
            </section>
          </>
        )}

        {/* MINI TEST */}

        {exercitiu && (
          <section className="mt-10 rounded-3xl border border-slate-800 bg-slate-900 p-7 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-wider text-blue-400">
                  📝 Mini-test
                </p>

                <h2 className="mt-2 text-3xl font-black">
                  Verifică dacă ai
                  înțeles
                </h2>

                <p className="mt-2 text-slate-400">
                  {
                    lectie.exercitii
                      .length
                  }{" "}
                  întrebări • maximum{" "}
                  {xpMaxim} XP
                </p>
              </div>

              <div className="rounded-xl bg-slate-950 px-4 py-3 font-black">
                {exercitiuCurent +
                  1}
                /
                {
                  lectie.exercitii
                    .length
                }
              </div>
            </div>

            <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-blue-500"
                style={{
                  width: `${
                    ((exercitiuCurent +
                      1) /
                      lectie.exercitii
                        .length) *
                    100
                  }%`,
                }}
              />
            </div>

            <h3 className="mt-8 text-xl font-black md:text-2xl">
              {
                exercitiu.intrebare
              }
            </h3>

            <div className="mt-6 grid gap-3">
              {exercitiu.variante.map(
                (
                  varianta,
                  index
                ) => {
                  let stil =
                    "border-slate-700 bg-slate-950 hover:border-slate-500";

                  if (
                    raspuns ===
                    index
                  ) {
                    stil =
                      "border-blue-500 bg-blue-500/10";
                  }

                  if (
                    verificat &&
                    index ===
                      exercitiu.corect
                  ) {
                    stil =
                      "border-emerald-500 bg-emerald-500/10";
                  }

                  if (
                    verificat &&
                    raspuns ===
                      index &&
                    index !==
                      exercitiu.corect
                  ) {
                    stil =
                      "border-red-500 bg-red-500/10";
                  }

                  return (
                    <button
                      key={`${varianta}-${index}`}
                      type="button"
                      disabled={
                        verificat
                      }
                      onClick={() =>
                        setRaspuns(
                          index
                        )
                      }
                      className={`rounded-2xl border px-5 py-4 text-left font-semibold transition ${stil}`}
                    >
                      <span className="mr-3 text-slate-500">
                        {String.fromCharCode(
                          65 +
                            index
                        )}
                        .
                      </span>

                      {varianta}
                    </button>
                  );
                }
              )}
            </div>

            {!verificat && (
              <button
                type="button"
                onClick={
                  verificaRaspunsul
                }
                disabled={
                  raspuns === null
                }
                className={`mt-6 rounded-xl px-6 py-3 font-black ${
                  raspuns !==
                  null
                    ? "bg-blue-600 hover:bg-blue-500"
                    : "cursor-not-allowed bg-slate-800 text-slate-500"
                }`}
              >
                Verifică răspunsul
              </button>
            )}

            {verificat && (
              <div
                className={`mt-6 rounded-2xl p-6 ${
                  corect
                    ? "bg-emerald-500/10"
                    : "bg-red-500/10"
                }`}
              >
                <p
                  className={`text-lg font-black ${
                    corect
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  {corect
                    ? xpAcordatLaUltimaVerificare
                      ? "✓ Corect! Ai câștigat 10 XP."
                      : "✓ Corect! Exercițiul era deja creditat."
                    : "Nu este răspunsul corect."}
                </p>

                <p className="mt-3 leading-7 text-slate-300">
                  {
                    exercitiu.explicatie
                  }
                </p>

                {corect &&
                  salvareCloud ===
                    "salvare" && (
                    <p className="mt-3 text-sm font-bold text-blue-400">
                      ☁️ Se salvează
                      progresul...
                    </p>
                  )}

                {corect &&
                  salvareCloud ===
                    "salvat" && (
                    <p className="mt-3 text-sm font-bold text-emerald-400">
                      ✓ Progres salvat
                      în cont
                    </p>
                  )}

                {corect &&
                  salvareCloud ===
                    "eroare" && (
                    <p className="mt-3 text-sm font-bold text-amber-400">
                      ⚠️ Progresul nu a
                      putut fi salvat
                      momentan în cont.
                    </p>
                  )}

                {corect &&
                  !esteUltimul && (
                    <button
                      type="button"
                      onClick={
                        urmatorulExercitiu
                      }
                      className="mt-5 rounded-xl bg-blue-600 px-5 py-3 font-black"
                    >
                      Următorul
                      exercițiu →
                    </button>
                  )}

                {!corect && (
                  <button
                    type="button"
                    onClick={
                      incearcaDinNou
                    }
                    className="mt-5 rounded-xl border border-slate-700 px-5 py-3 font-black"
                  >
                    Încearcă din nou
                  </button>
                )}

                {corect &&
                  esteUltimul &&
                  lectieFinalizata && (
                    <div className="mt-6 rounded-2xl bg-slate-950 p-6">
                      <p className="text-2xl font-black">
                        🎉 Lecție
                        finalizată
                      </p>

                      <p className="mt-3 text-slate-300">
                        Ai acumulat{" "}
                        <strong>
                          {
                            xpLectie
                          }{" "}
                          XP
                        </strong>
                        .
                      </p>

                      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                        <a
                          href="/programa"
                          className="rounded-xl bg-blue-600 px-5 py-3 text-center font-black"
                        >
                          Continuă
                          traseul →
                        </a>

                        <a
                          href="/dashboard"
                          className="rounded-xl border border-slate-700 px-5 py-3 text-center font-black"
                        >
                          Dashboard
                        </a>
                      </div>
                    </div>
                  )}
              </div>
            )}

            <div className="mt-6 flex items-center justify-between border-t border-slate-800 pt-5">
              <span className="text-sm text-slate-500">
                XP în această lecție
              </span>

              <span className="font-black text-amber-400">
                ⭐ {xpLectie} XP
              </span>
            </div>
          </section>
        )}

        {/* URMATOAREA */}

        {lectie.urmatoareaLectie && (
          <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-7">
            <p className="text-sm font-black uppercase tracking-wider text-slate-500">
              Următoarea lecție
            </p>

            <h2 className="mt-2 text-xl font-black">
              {
                lectie
                  .urmatoareaLectie
                  .titlu
              }
            </h2>

            {lectie
              .urmatoareaLectie
              .href &&
            lectieFinalizata ? (
              <a
                href={
                  lectie
                    .urmatoareaLectie
                    .href
                }
                className="mt-5 inline-block rounded-xl bg-blue-600 px-5 py-3 font-black"
              >
                Continuă →
              </a>
            ) : (
              <p className="mt-4 text-sm font-bold text-slate-600">
                🔒 Finalizează
                această lecție pentru
                a continua
              </p>
            )}
          </section>
        )}
      </div>
    </main>
  );
}