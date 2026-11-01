"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";

import type { Lectie } from "../data/lectii";
import { obtineContinutLectie } from "../data/continut";
import { createClient } from "../lib/supabase/client";
import { getLessonVideoMedia, formatVideoDuration } from "../lib/lesson-media";
import BacMateVideoPlayer from "./BacMateVideoPlayer";

type Props = {
  lectie: Lectie;
};

type SaveState =
  | "nimic"
  | "salvare"
  | "salvat"
  | "eroare";

type LegacyExercise = {
  intrebare: string;
  variante: string[];
  corect: number;
  explicatie: string;
};

type LectieCuExercitiiLegacy = Lectie & {
  exercitii?: LegacyExercise[];
};

function literaVarianta(index: number) {
  return String.fromCharCode(65 + index);
}

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

  const [
    raspuns,
    setRaspuns,
  ] = useState<number | null>(null);

  const [
    verificat,
    setVerificat,
  ] = useState(false);

  const [
    xpLectie,
    setXpLectie,
  ] = useState(0);

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
    salvareCloud,
    setSalvareCloud,
  ] = useState<SaveState>("nimic");

  /*
   * ============================================================
   * CONȚINUT
   * ============================================================
   */

  const rezultatContentEngine =
    obtineContinutLectie(
      lectie.slug,
      lectie.modul,
      lectie.numarLectie
    );

  const continutDetaliat =
    rezultatContentEngine.continut;

  const lectieLegacy =
    lectie as LectieCuExercitiiLegacy;

  const exercitii =
    lectieLegacy.exercitii ?? [];

  const exercitiu =
    exercitii[exercitiuCurent];

  /*
   * Modulele 1 și 2 sunt modulele pentru care avem acum
   * producția video completă.
   *
   * Când terminăm Modulul 3, adăugăm pur și simplu:
   *
   * lectie.modul === 3
   *
   * fără să schimbăm arhitectura playerului.
   */
  const modulCuVideoProdus =
  lectie.modul >= 1 &&
    lectie.modul <= 5;

  const progresModul = Math.min(
    100,
    Math.max(
      0,
      (lectie.numarLectie /
        Math.max(
          lectie.totalLectiiModul,
          1
        )) *
        100
    )
  );

  const esteUltimul =
    exercitii.length > 0 &&
    exercitiuCurent ===
      exercitii.length - 1;

  const raspunsCorect =
    Boolean(
      exercitiu &&
        raspuns === exercitiu.corect
    );

  const xpMaxim =
    exercitii.length * 10;

  const xpTintaExercitiu =
    Math.min(
      (exercitiuCurent + 1) * 10,
      xpMaxim
    );

  /*
   * ============================================================
   * ACCES + PROGRES
   * ============================================================
   *
   * IMPORTANT:
   * evaluarea inițială NU mai este verificată aici.
   *
   * Utilizatorul trebuie doar:
   * - să fie autentificat;
   * - să aibă numele completat;
   * - să aibă profil BAC ales.
   */

  useEffect(() => {
    let activ = true;

    async function initializeazaLectia() {
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
        .select("nume, profil_bac")
        .eq("id", user.id)
        .maybeSingle();

      if (!activ) {
        return;
      }

      if (profilError) {
        console.error(
          "Eroare profil:",
          profilError
        );

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

      localStorage.setItem(
        "bac-mate-nume",
        profil.nume
      );

      localStorage.setItem(
        "bac-mate-profil-cod",
        profil.profil_bac
      );

      /*
       * Încărcăm întâi fallback-ul local.
       */

      const finalizataLocal =
        localStorage.getItem(
          lectie.storageKeyFinalizata
        ) === "da";

      const xpLocalBrut =
        Number(
          localStorage.getItem(
            lectie.storageKeyXp
          ) ?? "0"
        );

      const xpLocal =
        Number.isFinite(xpLocalBrut)
          ? xpLocalBrut
          : 0;

      if (activ) {
        setLectieFinalizata(
          finalizataLocal
        );

        setXpLectie(xpLocal);
      }

      /*
       * Apoi sincronizăm cu Supabase.
       */

      const {
        data: progres,
        error: progresError,
      } = await supabase
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

      if (
        !progresError &&
        progres
      ) {
        const xpCloud =
          typeof progres.xp === "number"
            ? progres.xp
            : 0;

        const finalizataCloud =
          progres.completed === true;

        setXpLectie(xpCloud);

        setLectieFinalizata(
          finalizataCloud
        );

        localStorage.setItem(
          lectie.storageKeyXp,
          String(xpCloud)
        );

        if (finalizataCloud) {
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

    initializeazaLectia();

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

  /*
   * ============================================================
   * SALVARE PROGRES
   * ============================================================
   */

  async function salveazaProgresul(
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
            completed: finalizata,
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
        "Eroare salvare progres:",
        error
      );

      setSalvareCloud("eroare");
      return;
    }

    setSalvareCloud("salvat");
  }

  /*
   * ============================================================
   * EXERCIȚII
   * ============================================================
   */

  async function verificaRaspunsul() {
    if (
      !exercitiu ||
      raspuns === null ||
      verificat
    ) {
      return;
    }

    setVerificat(true);

    setXpAcordatLaUltimaVerificare(
      false
    );

    if (
      raspuns !== exercitiu.corect
    ) {
      return;
    }

    const acordaXp =
      xpLectie <
      xpTintaExercitiu;

    const xpNou =
      Math.max(
        xpLectie,
        xpTintaExercitiu
      );

    const finalizataAcum =
      esteUltimul;

    setXpAcordatLaUltimaVerificare(
      acordaXp
    );

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

    await salveazaProgresul(
      xpNou,
      finalizataAcum ||
        lectieFinalizata
    );
  }

  function urmatorulExercitiu() {
    if (
      exercitiuCurent >=
      exercitii.length - 1
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

  /*
   * ============================================================
   * VIDEO
   * ============================================================
   */

  function comutaVideo(
    numar: number
  ) {
    setVideoDeschis(
      (curent) =>
        curent === numar
          ? null
          : numar
    );

    setRaspunsVideo(null);
    setVideoVerificat(false);
  }

  /*
   * ============================================================
   * LOADING
   * ============================================================
   */

  if (!accesVerificat) {
    return (
      <main className="min-h-screen bg-[#06110e] text-white">
        <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-emerald-500/20 border-t-emerald-400" />

            <p className="mt-5 font-semibold text-emerald-50/60">
              Se încarcă lecția...
            </p>
          </div>
        </div>
      </main>
    );
  }

  /*
   * ============================================================
   * UI
   * ============================================================
   */

  return (
    <main className="min-h-screen overflow-hidden bg-[#06110e] text-white">
      {/* FUNDAL DECORATIV */}

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0"
      >
        <div className="absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-emerald-500/10 blur-[130px]" />

        <div className="absolute right-[-180px] top-[360px] h-[420px] w-[420px] rounded-full bg-orange-500/10 blur-[140px]" />

        <div className="absolute bottom-[-220px] left-1/3 h-[500px] w-[500px] rounded-full bg-lime-400/5 blur-[150px]" />
      </div>

      {/* HEADER */}

      <header className="relative z-10 border-b border-emerald-400/10 bg-[#071511]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-3 py-3 sm:gap-4 sm:px-5 sm:py-5 md:px-8">
          <a
            href="/programa"
            className="group flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-emerald-50/65 transition hover:bg-emerald-400/5 hover:text-white"
          >
            <span className="transition group-hover:-translate-x-1">
              ←
            </span>

            Programa mea
          </a>

          <a
            href="/dashboard"
            className="text-lg font-black tracking-tight md:text-xl"
          >
            BAC{" "}
            <span className="bg-gradient-to-r from-emerald-300 via-lime-300 to-orange-300 bg-clip-text text-transparent">
              MATE
            </span>
          </a>

          <div className="rounded-xl border border-emerald-400/15 bg-emerald-400/5 px-3 py-2 text-xs font-black text-emerald-300 md:px-4 md:text-sm">
            {lectie.profil}
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-6 sm:px-5 sm:py-10 md:px-8 md:py-14">
        {/* HERO */}

        <section className="relative overflow-hidden rounded-[24px] border border-emerald-400/15 bg-gradient-to-br from-[#0b241b] via-[#0a1b16] to-[#24170f] p-4 shadow-2xl shadow-black/20 sm:rounded-[32px] sm:p-6 md:p-9">
          <div
            aria-hidden="true"
            className="absolute right-[-90px] top-[-90px] h-64 w-64 rounded-full bg-orange-400/10 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="absolute bottom-[-100px] left-[-80px] h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl"
          />

          <div className="relative">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-black uppercase tracking-wider text-emerald-300">
                Modul {lectie.modul}
              </span>

              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-bold text-white/65">
                Lecția{" "}
                {lectie.numarLectie}
              </span>

              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-bold text-white/65">
                {lectie.clasa}
              </span>

              {modulCuVideoProdus && (
                <span className="rounded-full border border-orange-400/20 bg-orange-400/10 px-3 py-1.5 text-xs font-black text-orange-300">
                  ● VIDEO DISPONIBIL
                </span>
              )}
            </div>

            <h1 className="mt-5 max-w-4xl text-[30px] font-black leading-[1.12] tracking-tight sm:mt-6 sm:text-4xl md:text-5xl lg:text-6xl">
              {continutDetaliat?.titlu ??
                lectie.titlu}
            </h1>

            {continutDetaliat?.subtitlu && (
              <p className="mt-4 max-w-3xl text-lg font-bold leading-8 text-emerald-200 md:text-xl">
                {
                  continutDetaliat.subtitlu
                }
              </p>
            )}

            <p className="mt-5 max-w-3xl text-base leading-8 text-emerald-50/65 md:text-lg">
              {continutDetaliat?.descriere ??
                lectie.descriere}
            </p>

            <div className="mt-8">
              <div className="flex items-center justify-between gap-4 text-xs font-bold text-emerald-50/45">
                <span>
                  Modul {lectie.modul}
                </span>

                <span>
                  Lecția{" "}
                  {lectie.numarLectie} /{" "}
                  {
                    lectie.totalLectiiModul
                  }
                </span>
              </div>

              <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-black/30">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-lime-300 to-orange-400 shadow-[0_0_20px_rgba(52,211,153,0.35)]"
                  style={{
                    width: `${progresModul}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* OBIECTIVE */}

        <section className="mt-6 rounded-[24px] border border-emerald-400/15 bg-[#0b1c17]/95 p-4 shadow-xl shadow-black/10 sm:mt-8 sm:rounded-[28px] sm:p-6 md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-400">
            🎯 Obiective
          </p>

          <h2 className="mt-2 text-2xl font-black md:text-3xl">
            Ce vei ști să faci
          </h2>

          {continutDetaliat ? (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {continutDetaliat.obiective.map(
                (obiectiv, index) => (
                  <div
                    key={`${obiectiv}-${index}`}
                    className="group rounded-2xl border border-emerald-400/10 bg-[#07130f] p-5 transition hover:-translate-y-0.5 hover:border-emerald-400/25"
                  >
                    <div className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 font-black text-emerald-300">
                        ✓
                      </div>

                      <p className="leading-7 text-emerald-50/80">
                        {obiectiv}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          ) : (
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {lectie.obiective.map(
                (obiectiv, index) => (
                  <div
                    key={`${obiectiv.titlu}-${index}`}
                    className="rounded-2xl border border-emerald-400/10 bg-[#07130f] p-5 transition hover:-translate-y-0.5 hover:border-emerald-400/25"
                  >
                    <div className="text-3xl">
                      {obiectiv.icon}
                    </div>

                    <h3 className="mt-4 font-black text-emerald-50">
                      {
                        obiectiv.titlu
                      }
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-emerald-50/50">
                      {
                        obiectiv.descriere
                      }
                    </p>
                  </div>
                )
              )}
            </div>
          )}
        </section>

        {/* VIDEO */}

        <section className="mt-12">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-orange-300">
                🎬 Lecția video
              </p>

              <h2 className="mt-2 text-3xl font-black md:text-4xl">
                Învață pas cu pas
              </h2>

              <p className="mt-3 max-w-2xl leading-7 text-emerald-50/50">
                Explicații scurte,
                clare și legate direct
                de lecția pe care o
                studiezi.
              </p>
            </div>

            {modulCuVideoProdus && (
              <div className="rounded-xl border border-emerald-400/15 bg-emerald-400/5 px-4 py-3 text-sm font-black text-emerald-300">
                Video BAC MATE
              </div>
            )}
          </div>

          <div className="mt-7 space-y-5">
            {continutDetaliat
              ? continutDetaliat.videoLectii.map(
                  (video) => {
                    const media =
                      modulCuVideoProdus
                        ? getLessonVideoMedia(
                            lectie.modul,
                            lectie.numarLectie,
                            video.numar
                          )
                        : null;
const supabaseVideoUrl =
  lectie.modul >= 1 && lectie.modul <= 5
    ? `https://ujkqlrgbpfihubbusttq.supabase.co/storage/v1/object/public/bac-mate-videos/module-${lectie.modul}/lesson-${String(lectie.numarLectie).padStart(2, "0")}/video-${video.numar}.mp4`
    : null;

const videoUrl =
  supabaseVideoUrl ??
  video.videoUrl ??
  media?.videoUrl;
                    const deschis =
                      videoDeschis ===
                      video.numar;

                    const intrebare =
                      video.verificareRapida;

                    const raspunsVideoCorect =
                      Boolean(
                        intrebare &&
                          raspunsVideo ===
                            intrebare.raspunsCorect
                      );

                    return (
                      <article
                        key={video.id}
                        className="overflow-hidden rounded-[28px] border border-emerald-400/15 bg-[#0b1c17] shadow-xl shadow-black/10"
                      >
                        <div className="relative overflow-hidden bg-[#030907]">
                          <div className="absolute left-4 top-4 z-10 rounded-full border border-emerald-300/20 bg-[#07130f]/90 px-4 py-2 text-xs font-black text-emerald-300 backdrop-blur">
                            VIDEO{" "}
                            {video.numar}
                          </div>

                          <div className="absolute right-4 top-4 z-10 rounded-full border border-orange-300/20 bg-[#07130f]/90 px-4 py-2 text-xs font-black text-orange-300 backdrop-blur">
                            ⏱{" "}
                            {formatVideoDuration(media?.durationSeconds) ?? "—"}
                          </div>

                          {videoUrl ? (
                            <BacMateVideoPlayer
  videoUrl={videoUrl}
  durationSeconds={media?.durationSeconds}
  subtitleUrl={media?.subtitleUrl}
  thumbnailUrl={media?.thumbnailUrl}
  title={video.titlu}
/>
                          ) : (
                            <div className="flex min-h-[320px] items-center justify-center px-6 py-16">
                              <div className="max-w-xl text-center">
                                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-emerald-300/20 bg-emerald-400/10 text-3xl text-emerald-300">
                                  ▶
                                </div>

                                <h3 className="mt-6 text-2xl font-black">
                                  {
                                    video.titlu
                                  }
                                </h3>

                                <p className="mt-3 leading-7 text-emerald-50/50">
                                  {
                                    video.descriere
                                  }
                                </p>

                                <p className="mt-5 text-sm font-bold text-orange-200/60">
                                  Video în curs de
                                  producție.
                                </p>
                              </div>
                            </div>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            comutaVideo(
                              video.numar
                            )
                          }
                          className="flex w-full items-center justify-between gap-5 border-t border-emerald-400/10 p-6 text-left transition hover:bg-emerald-400/[0.03]"
                        >
                          <div>
                            <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-400">
                              După video
                            </p>

                            <p className="mt-1 text-lg font-black">
                              Recapitulează
                              partea{" "}
                              {video.numar}
                            </p>
                          </div>

                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-xl font-black text-emerald-300">
                            {deschis
                              ? "−"
                              : "+"}
                          </div>
                        </button>

                        {deschis && (
                          <div className="border-t border-emerald-400/10 p-6 md:p-7">
                            <div className="grid gap-3 md:grid-cols-3">
                              {video.ideiDeRetinut.map(
                                (
                                  idee,
                                  index
                                ) => (
                                  <div
                                    key={`${idee}-${index}`}
                                    className="rounded-2xl border border-emerald-400/10 bg-[#07130f] p-5"
                                  >
                                    <span className="font-black text-emerald-400">
                                      ✓
                                    </span>

                                    <p className="mt-3 leading-7 text-emerald-50/70">
                                      {
                                        idee
                                      }
                                    </p>
                                  </div>
                                )
                              )}
                            </div>

                            <div className="mt-5 rounded-2xl border border-orange-400/15 bg-orange-400/[0.05] p-5">
                              <p className="text-xs font-black uppercase tracking-wider text-orange-300">
                                Exemplu
                              </p>

                              <h4 className="mt-2 text-lg font-black">
                                {
                                  video
                                    .exemplu
                                    .titlu
                                }
                              </h4>

                              <p className="mt-3 leading-7 text-emerald-50/65">
                                {
                                  video
                                    .exemplu
                                    .enunt
                                }
                              </p>

                              <div className="mt-4 space-y-2">
                                {video.exemplu.rezolvareScurta.map(
                                  (
                                    pas,
                                    index
                                  ) => (
                                    <div
                                      key={`${pas}-${index}`}
                                      className="flex gap-3 rounded-xl bg-black/20 p-3"
                                    >
                                      <span className="font-black text-orange-300">
                                        {index +
                                          1}
                                        .
                                      </span>

                                      <span className="text-emerald-50/70">
                                        {
                                          pas
                                        }
                                      </span>
                                    </div>
                                  )
                                )}
                              </div>

                              <div className="mt-4 rounded-xl bg-emerald-400/10 p-4">
                                <span className="font-black text-emerald-300">
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

                            {intrebare && (
                              <div className="mt-6 rounded-2xl border border-emerald-400/15 bg-[#07130f] p-5">
                                <p className="text-xs font-black uppercase tracking-wider text-lime-300">
                                  ⚡ Verificare
                                  rapidă
                                </p>

                                <h4 className="mt-3 text-lg font-black leading-7">
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
                                        "border-white/10 bg-white/[0.025] hover:border-emerald-400/30 hover:bg-emerald-400/[0.04]";

                                      if (
                                        raspunsVideo ===
                                        index
                                      ) {
                                        stil =
                                          "border-orange-400/60 bg-orange-400/10";
                                      }

                                      if (
                                        videoVerificat &&
                                        index ===
                                          intrebare.raspunsCorect
                                      ) {
                                        stil =
                                          "border-emerald-400/70 bg-emerald-400/10";
                                      }

                                      if (
                                        videoVerificat &&
                                        raspunsVideo ===
                                          index &&
                                        index !==
                                          intrebare.raspunsCorect
                                      ) {
                                        stil =
                                          "border-red-400/70 bg-red-500/10";
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
                                          className={`rounded-2xl border p-4 text-left font-semibold transition ${stil}`}
                                        >
                                          <span className="mr-3 font-black text-emerald-300">
                                            {literaVarianta(
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

                                {!videoVerificat ? (
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
                                        ? "bg-gradient-to-r from-emerald-500 to-lime-500 text-[#04100c] hover:brightness-110"
                                        : "cursor-not-allowed bg-white/5 text-white/25"
                                    }`}
                                  >
                                    Verifică
                                  </button>
                                ) : (
                                  <div
                                    className={`mt-5 rounded-2xl border p-5 ${
                                      raspunsVideoCorect
                                        ? "border-emerald-400/20 bg-emerald-400/10"
                                        : "border-red-400/20 bg-red-500/10"
                                    }`}
                                  >
                                    <p
                                      className={`font-black ${
                                        raspunsVideoCorect
                                          ? "text-emerald-300"
                                          : "text-red-300"
                                      }`}
                                    >
                                      {raspunsVideoCorect
                                        ? "✓ Corect!"
                                        : "Răspunsul nu este corect."}
                                    </p>

                                    <p className="mt-2 leading-7 text-emerald-50/65">
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
                                        className="mt-4 rounded-xl border border-white/10 px-4 py-2 font-bold transition hover:border-emerald-400/30"
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
                )
              : lectie.videoLectii.map(
                  (video) => {
                    const media =
                      modulCuVideoProdus
                        ? getLessonVideoMedia(
                            lectie.modul,
                            lectie.numarLectie,
                            video.numar
                          )
                        : null;

                    const deschis =
                      videoDeschis ===
                      video.numar;

                    return (
                      <article
                        key={video.numar}
                        className="overflow-hidden rounded-[28px] border border-emerald-400/15 bg-[#0b1c17] shadow-xl shadow-black/10"
                      >
                        <div className="relative overflow-hidden bg-[#030907]">
                          <div className="absolute left-4 top-4 z-10 rounded-full border border-emerald-300/20 bg-[#07130f]/90 px-4 py-2 text-xs font-black text-emerald-300 backdrop-blur">
                            VIDEO{" "}
                            {video.numar}
                          </div>

                          <div className="absolute right-4 top-4 z-10 rounded-full border border-orange-300/20 bg-[#07130f]/90 px-4 py-2 text-xs font-black text-orange-300 backdrop-blur">
                            ⏱{" "}
                            {formatVideoDuration(media?.durationSeconds) ?? "—"}
                          </div>

                          {media ? (
                            <BacMateVideoPlayer
  videoUrl={media.videoUrl}
  durationSeconds={media.durationSeconds}
  subtitleUrl={media.subtitleUrl}
  thumbnailUrl={media.thumbnailUrl}
  title={video.titlu}
/>
                          ) : (
                            <div className="flex min-h-[300px] items-center justify-center px-6 py-14">
                              <div className="max-w-xl text-center">
                                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-emerald-300/20 bg-emerald-400/10 text-3xl text-emerald-300">
                                  ▶
                                </div>

                                <h3 className="mt-6 text-2xl font-black">
                                  {
                                    video.titlu
                                  }
                                </h3>

                                <p className="mt-3 leading-7 text-emerald-50/50">
                                  {
                                    video.descriere
                                  }
                                </p>

                                <p className="mt-5 text-sm font-bold text-orange-200/60">
                                  Video în curs de
                                  producție.
                                </p>
                              </div>
                            </div>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            comutaVideo(
                              video.numar
                            )
                          }
                          className="flex w-full items-center justify-between border-t border-emerald-400/10 p-6 text-left transition hover:bg-emerald-400/[0.03]"
                        >
                          <div>
                            <p className="text-xs font-black uppercase tracking-wider text-emerald-400">
                              Recapitulare
                            </p>

                            <p className="mt-1 text-lg font-black">
                              {
                                video.titlu
                              }
                            </p>
                          </div>

                          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-xl font-black text-emerald-300">
                            {deschis
                              ? "−"
                              : "+"}
                          </span>
                        </button>

                        {deschis && (
                          <div className="border-t border-emerald-400/10 p-6">
                            <div className="grid gap-3 md:grid-cols-2">
                              {video.idei.map(
                                (
                                  idee,
                                  index
                                ) => (
                                  <div
                                    key={`${idee}-${index}`}
                                    className="flex gap-3 rounded-2xl border border-emerald-400/10 bg-[#07130f] p-4"
                                  >
                                    <span className="font-black text-emerald-400">
                                      ✓
                                    </span>

                                    <p className="leading-7 text-emerald-50/70">
                                      {
                                        idee
                                      }
                                    </p>
                                  </div>
                                )
                              )}
                            </div>

                            <div className="mt-5 rounded-2xl border border-orange-400/15 bg-orange-400/[0.05] p-5">
                              <p className="font-black text-orange-300">
                                {
                                  video.exempluTitlu
                                }
                              </p>

                              <p className="mt-3 leading-7 text-emerald-50/70">
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

        {/* FIȘA RAPIDĂ */}

        {!continutDetaliat && (
          <section className="mt-10 rounded-[28px] border border-emerald-400/15 bg-gradient-to-br from-emerald-400/[0.07] to-lime-400/[0.03] p-6 md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-400">
              🧠 Fișa rapidă
            </p>

            <h2 className="mt-3 text-2xl font-black">
              {lectie.fisaRapida.titlu}
            </h2>

            <div className="mt-6 grid gap-3">
              {lectie.fisaRapida.continut.map(
                (rand, index) => (
                  <div
                    key={`${rand}-${index}`}
                    className="flex gap-4 rounded-2xl border border-emerald-400/10 bg-[#07130f] p-4"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-400/10 text-sm font-black text-emerald-300">
                      ✓
                    </div>

                    <p className="leading-7 text-emerald-50/70">
                      {rand}
                    </p>
                  </div>
                )
              )}
            </div>
          </section>
        )}

        {/* MINI TEST */}

        {exercitiu && (
          <section className="mt-10 overflow-hidden rounded-[30px] border border-emerald-400/20 bg-[#0b1c17] shadow-2xl shadow-black/20">
            <div className="border-b border-emerald-400/10 bg-gradient-to-r from-emerald-400/[0.08] via-transparent to-orange-400/[0.07] p-6 md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-lime-300">
                    📝 Mini-test
                  </p>

                  <h2 className="mt-2 text-3xl font-black md:text-4xl">
                    Verifică dacă ai
                    înțeles
                  </h2>

                  <p className="mt-3 text-emerald-50/50">
                    {exercitii.length}{" "}
                    întrebări • maximum{" "}
                    {xpMaxim} XP
                  </p>
                </div>

                <div className="rounded-2xl border border-orange-400/20 bg-orange-400/10 px-5 py-3 font-black text-orange-300">
                  {exercitiuCurent + 1}
                  /{exercitii.length}
                </div>
              </div>

              <div className="mt-6 h-2 overflow-hidden rounded-full bg-black/30">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-lime-300 to-orange-400"
                  style={{
                    width: `${
                      ((exercitiuCurent +
                        1) /
                        exercitii.length) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>

            <div className="p-6 md:p-8">
              <h3 className="text-xl font-black leading-8 md:text-2xl">
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
                      "border-white/10 bg-[#07130f] hover:border-emerald-400/30 hover:bg-emerald-400/[0.04]";

                    if (
                      raspuns === index
                    ) {
                      stil =
                        "border-orange-400/60 bg-orange-400/10 shadow-[0_0_24px_rgba(251,146,60,0.08)]";
                    }

                    if (
                      verificat &&
                      index ===
                        exercitiu.corect
                    ) {
                      stil =
                        "border-emerald-400/70 bg-emerald-400/10 shadow-[0_0_24px_rgba(52,211,153,0.08)]";
                    }

                    if (
                      verificat &&
                      raspuns === index &&
                      index !==
                        exercitiu.corect
                    ) {
                      stil =
                        "border-red-400/70 bg-red-500/10";
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
                        className={`group flex items-center gap-4 rounded-2xl border p-4 text-left font-semibold transition md:p-5 ${stil}`}
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-black/20 font-black text-emerald-300">
                          {literaVarianta(
                            index
                          )}
                        </span>

                        <span className="leading-7 text-emerald-50/85">
                          {varianta}
                        </span>
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
                  className={`mt-6 rounded-xl px-6 py-3.5 font-black transition ${
                    raspuns !== null
                      ? "bg-gradient-to-r from-emerald-500 via-lime-400 to-lime-500 text-[#04100c] shadow-lg shadow-emerald-950/40 hover:-translate-y-0.5 hover:brightness-110"
                      : "cursor-not-allowed bg-white/5 text-white/25"
                  }`}
                >
                  Verifică răspunsul
                </button>
              )}

              {verificat && (
                <div
                  className={`mt-6 rounded-2xl border p-6 ${
                    raspunsCorect
                      ? "border-emerald-400/20 bg-emerald-400/[0.08]"
                      : "border-red-400/20 bg-red-500/[0.08]"
                  }`}
                >
                  <p
                    className={`text-lg font-black ${
                      raspunsCorect
                        ? "text-emerald-300"
                        : "text-red-300"
                    }`}
                  >
                    {raspunsCorect
                      ? xpAcordatLaUltimaVerificare
                        ? "✓ Corect! Ai câștigat 10 XP."
                        : "✓ Corect! Exercițiul era deja creditat."
                      : "Răspunsul nu este corect."}
                  </p>

                  <p className="mt-3 leading-7 text-emerald-50/65">
                    {
                      exercitiu.explicatie
                    }
                  </p>

                  {raspunsCorect &&
                    salvareCloud ===
                      "salvare" && (
                      <p className="mt-4 text-sm font-bold text-orange-300">
                        ☁️ Se salvează
                        progresul...
                      </p>
                    )}

                  {raspunsCorect &&
                    salvareCloud ===
                      "salvat" && (
                      <p className="mt-4 text-sm font-bold text-emerald-300">
                        ✓ Progres salvat
                        în cont
                      </p>
                    )}

                  {raspunsCorect &&
                    salvareCloud ===
                      "eroare" && (
                      <p className="mt-4 text-sm font-bold text-orange-300">
                        ⚠ Progresul nu a
                        putut fi salvat
                        momentan.
                      </p>
                    )}

                  {raspunsCorect &&
                    !esteUltimul && (
                      <button
                        type="button"
                        onClick={
                          urmatorulExercitiu
                        }
                        className="mt-5 rounded-xl bg-gradient-to-r from-emerald-500 to-lime-400 px-5 py-3 font-black text-[#04100c] transition hover:brightness-110"
                      >
                        Următorul
                        exercițiu →
                      </button>
                    )}

                  {!raspunsCorect && (
                    <button
                      type="button"
                      onClick={
                        incearcaDinNou
                      }
                      className="mt-5 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 font-black transition hover:border-emerald-400/30"
                    >
                      Încearcă din nou
                    </button>
                  )}

                  {raspunsCorect &&
                    esteUltimul &&
                    lectieFinalizata && (
                      <div className="mt-6 rounded-2xl border border-orange-400/15 bg-[#07130f] p-6">
                        <p className="text-2xl font-black">
                          🎉 Lecție
                          finalizată
                        </p>

                        <p className="mt-3 text-emerald-50/60">
                          Ai acumulat{" "}
                          <strong className="text-orange-300">
                            {xpLectie} XP
                          </strong>
                          .
                        </p>

                        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                          <a
                            href="/programa"
                            className="rounded-xl bg-gradient-to-r from-emerald-500 to-lime-400 px-5 py-3 text-center font-black text-[#04100c]"
                          >
                            Continuă
                            traseul →
                          </a>

                          <a
                            href="/dashboard"
                            className="rounded-xl border border-emerald-400/15 px-5 py-3 text-center font-black text-emerald-100"
                          >
                            Dashboard
                          </a>
                        </div>
                      </div>
                    )}
                </div>
              )}

              <div className="mt-7 flex items-center justify-between border-t border-emerald-400/10 pt-5">
                <span className="text-sm font-semibold text-emerald-50/40">
                  XP în această lecție
                </span>

                <span className="rounded-xl border border-orange-400/15 bg-orange-400/[0.07] px-4 py-2 font-black text-orange-300">
                  ⭐ {xpLectie} XP
                </span>
              </div>
            </div>
          </section>
        )}

        {/* URMĂTOAREA LECȚIE */}

        {lectie.urmatoareaLectie && (
          <section className="mt-8 rounded-[28px] border border-emerald-400/15 bg-[#0b1c17] p-6 md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-400">
              Următoarea lecție
            </p>

            <h2 className="mt-3 text-2xl font-black">
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
                className="mt-5 inline-flex rounded-xl bg-gradient-to-r from-emerald-500 to-lime-400 px-5 py-3 font-black text-[#04100c] transition hover:-translate-y-0.5 hover:brightness-110"
              >
                Continuă →
              </a>
            ) : (
              <div className="mt-5 flex items-center gap-3 rounded-xl border border-orange-400/10 bg-orange-400/[0.04] p-4 text-sm font-bold text-orange-200/65">
                <span>🔒</span>

                <span>
                  Finalizează această
                  lecție pentru a
                  continua.
                </span>
              </div>
            )}
          </section>
        )}

        {/* FOOTER MIC */}

        <div className="py-10 text-center">
          <p className="text-xs font-semibold text-emerald-50/25">
            BAC MATE • Învață.
            Exersează. Progresează.
          </p>
        </div>
      </div>
    </main>
  );
}