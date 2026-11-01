"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { lectii } from "../../data/lectii/index";
import { createClient } from "../../lib/supabase/client";

const MODULE_BETA = 5;
const TOTAL_MODULE = 17;

type ProgresSupabase = {
  lesson_id: string;
  completed: boolean;
  xp: number | null;
};

type ProgresLectie = {
  id: string;
  titlu: string;
  slug: string;
  modul: number;
  numarLectie: number;
  finalizata: boolean;
  xp: number;
  xpMaxim: number;
};

type AvatarGender = "male" | "female" | "standard";

const MODULE_TITLES: Record<number, string> = {
  1: "Numere reale, logică și mulțimi",
  2: "Șiruri și funcții",
  3: "Funcția și ecuațiile de gradul I",
  4: "Funcția și ecuația de gradul al II-lea",
  5: "Vectori, trigonometrie și geometrie",
  6: "Puteri, radicali și logaritmi",
  7: "Funcții speciale",
};

const MENU = [
  { href: "/dashboard", label: "Acasă", icon: "⌂" },
  { href: "/lectii", label: "Lecții", icon: "▣" },
  { href: "/evaluari", label: "Evaluări", icon: "✓" },
  { href: "/progres", label: "Progres", icon: "▥" },
  { href: "/mate", label: "MATE AI", icon: "✦" },
  { href: "/programa", label: "Programă", icon: "▤" },
  { href: "/abonamente", label: "Abonamente", icon: "◆" },
  { href: "/profil", label: "Profil", icon: "♙" },
];

export default function DashboardPage() {
  const router = useRouter();

  const [supabase] = useState(() => createClient());

  const [loading, setLoading] = useState(true);
  const [eroare, setEroare] = useState("");

  const [nume, setNume] = useState("");
  const [profil, setProfil] = useState("");
  const [avatarGender, setAvatarGender] =
    useState<AvatarGender>("standard");

  const [progres, setProgres] = useState<ProgresLectie[]>([]);

  const [menuOpen, setMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

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

        const { data: profilData, error: profilError } =
          await supabase
            .from("profiles")
            .select("nume, profil_bac, avatar_gender")
            .eq("id", user.id)
            .maybeSingle();

        if (!activ) return;

        if (profilError) {
          throw new Error(
            "Nu am putut încărca profilul elevului."
          );
        }

        if (!profilData?.nume) {
          router.replace("/date-personale");
          return;
        }

        if (!profilData.profil_bac) {
          router.replace("/profil");
          return;
        }

        setNume(profilData.nume);
        setProfil(profilData.profil_bac);

        const gender = profilData.avatar_gender;

        if (gender === "male" || gender === "female") {
          setAvatarGender(gender);
        } else {
          setAvatarGender("standard");
        }

        localStorage.setItem(
          "bac-mate-nume",
          profilData.nume
        );

        localStorage.setItem(
          "bac-mate-profil-cod",
          profilData.profil_bac
        );

        const { data: progresData, error: progresError } =
          await supabase
            .from("student_progress")
            .select("lesson_id, completed, xp")
            .eq("user_id", user.id);

        if (!activ) return;

        if (progresError) {
          throw new Error(
            "Nu am putut sincroniza progresul elevului."
          );
        }

        const progresCloud =
          (progresData ?? []) as ProgresSupabase[];

        const progresMap = new Map(
          progresCloud.map((item) => [
            item.lesson_id,
            item,
          ])
        );

        const lectiiBeta = lectii.filter(
          (lectie) =>
            lectie.modul >= 1 &&
            lectie.modul <= MODULE_BETA
        );

        const rezultat: ProgresLectie[] =
          lectiiBeta.map((lectie) => {
            const salvat = progresMap.get(lectie.id);

            const xpMaxim = lectie.exercitii.length * 10;

            const xpSalvat =
              typeof salvat?.xp === "number" &&
              Number.isFinite(salvat.xp)
                ? salvat.xp
                : 0;

            const xp = Math.max(
              0,
              Math.min(xpSalvat, xpMaxim)
            );

            const finalizata =
              salvat?.completed === true;

            localStorage.setItem(
              lectie.storageKeyXp,
              String(xp)
            );

            if (finalizata) {
              localStorage.setItem(
                lectie.storageKeyFinalizata,
                "da"
              );
            } else {
              localStorage.removeItem(
                lectie.storageKeyFinalizata
              );
            }

            return {
              id: lectie.id,
              titlu: lectie.titlu,
              slug: lectie.slug,
              modul: lectie.modul,
              numarLectie: lectie.numarLectie,
              finalizata,
              xp,
              xpMaxim,
            };
          });

        if (!activ) return;

        setProgres(rezultat);
        setLoading(false);
      } catch (error) {
        console.error("Eroare Dashboard:", error);

        if (activ) {
          setEroare(
            error instanceof Error
              ? error.message
              : "A apărut o eroare neașteptată."
          );

          setLoading(false);
        }
      }
    }

    incarcaDate();

    return () => {
      activ = false;
    };
  }, [router, supabase]);

  const statistici = useMemo(() => {
    const total = progres.length;

    const finalizate = progres.filter(
      (lectie) => lectie.finalizata
    ).length;

    const xp = progres.reduce(
      (suma, lectie) => suma + lectie.xp,
      0
    );

    const xpMaxim = progres.reduce(
      (suma, lectie) => suma + lectie.xpMaxim,
      0
    );

    const procent =
      total > 0
        ? Math.round((finalizate / total) * 100)
        : 0;

    return {
      total,
      finalizate,
      xp,
      xpMaxim,
      procent,
    };
  }, [progres]);

  const urmatoareaLectie = useMemo(() => {
    return (
      progres.find((lectie) => !lectie.finalizata) ??
      null
    );
  }, [progres]);

  const progresModule = useMemo(() => {
    return Array.from(
      { length: MODULE_BETA },
      (_, index) => {
        const modul = index + 1;

        const lectiiModul = progres.filter(
          (lectie) => lectie.modul === modul
        );

        const finalizate = lectiiModul.filter(
          (lectie) => lectie.finalizata
        ).length;

        const total = lectiiModul.length;

        return {
          modul,
          total,
          finalizate,
          procent:
            total > 0
              ? Math.round((finalizate / total) * 100)
              : 0,
        };
      }
    );
  }, [progres]);

  async function deconectare() {
    setLoggingOut(true);

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(error);
      setLoggingOut(false);
      return;
    }

    localStorage.removeItem("bac-mate-nume");
    localStorage.removeItem("bac-mate-profil-cod");
    localStorage.removeItem("bac-mate-profil-nume");
    localStorage.removeItem(
      "bac-mate-evaluare-initiala-finalizata"
    );

    router.replace("/cont");
    router.refresh();
  }

  const initiala =
    nume.trim().charAt(0).toUpperCase() || "M";

  const avatarSrc =
    avatarGender === "female"
      ? "/avatars/mate-girl.png"
      : "/avatars/mate-boy.png";

  const urmatoareaLectieHref = urmatoareaLectie
    ? `/lectii/${urmatoareaLectie.slug}`
    : "/lectii";

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#06110e] text-white">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-emerald-400/20 border-t-lime-300" />

          <p className="mt-5 text-sm font-semibold text-slate-300">
            MATE îți pregătește platforma...
          </p>
        </div>
      </main>
    );
  }

  if (eroare) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#06110e] p-5 text-white">
        <div className="w-full max-w-lg rounded-3xl border border-red-400/20 bg-red-500/10 p-7">
          <h1 className="text-2xl font-black">
            Nu am putut încărca Dashboard-ul
          </h1>

          <p className="mt-4 text-sm text-slate-300">
            {eroare}
          </p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 rounded-xl bg-emerald-400 px-5 py-3 font-bold text-slate-950"
          >
            Încearcă din nou
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#06110e] text-white">
      <div className="min-h-screen lg:flex">

        {/* SIDEBAR DESKTOP */}
        <aside className="hidden w-[240px] shrink-0 border-r border-white/10 bg-[#081813] lg:fixed lg:inset-y-0 lg:flex lg:flex-col">
          <div className="border-b border-white/10 px-7 py-8">
            <a
              href="/dashboard"
              className="text-2xl font-black"
            >
              BAC{" "}
              <span className="text-lime-300">
                MATE
              </span>
            </a>

            <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
              Matematică. Pas cu pas.
            </p>
          </div>

          <nav className="flex-1 space-y-2 p-4">
            {MENU.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition ${
                  item.href === "/dashboard"
                    ? "bg-emerald-400/15 text-emerald-200"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="w-6 text-center text-lg">
                  {item.icon}
                </span>

                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="p-5">
            <div className="rounded-2xl border border-emerald-300/10 bg-emerald-400/5 p-4">
              <p className="text-sm italic leading-6 text-slate-300">
                Nu trebuie să fii perfect.
                Trebuie doar să fii consecvent.
              </p>

              <p className="mt-3 text-xs font-black text-lime-300">
                — MATE
              </p>
            </div>
          </div>
        </aside>

        {/* CONTINUT */}
        <div className="min-w-0 flex-1 lg:ml-[240px]">

          {/* HEADER MOBILE + DESKTOP */}
          <header className="sticky top-0 z-40 border-b border-white/10 bg-[#071511]/95 backdrop-blur-xl">
            <div className="flex min-h-[64px] items-center justify-between gap-2 px-3 py-2 sm:h-[68px] sm:gap-3 sm:px-7">

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setMenuOpen(!menuOpen)}
                  aria-label="Deschide meniul"
                  aria-expanded={menuOpen}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xl lg:hidden"
                >
                  {menuOpen ? "✕" : "☰"}
                </button>

                <a
                  href="/dashboard"
                  className="text-lg font-black lg:hidden"
                >
                  BAC{" "}
                  <span className="text-lime-300">
                    MATE
                  </span>
                </a>

                <span className="hidden text-xs font-bold text-slate-400 lg:block">
                  Centrul tău de pregătire
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-black">
                    {nume}
                  </p>

                  <p className="text-xs text-slate-400">
                    {profil}
                  </p>
                </div>

                <a
                  href="/profil"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-lime-300 text-sm font-black text-slate-950"
                >
                  {initiala}
                </a>

                <button
                  type="button"
                  onClick={deconectare}
                  disabled={loggingOut}
                  className="rounded-xl border border-white/10 px-3 py-2 text-xs font-bold text-slate-300 disabled:opacity-50"
                >
                  {loggingOut ? "..." : "Ieșire"}
                </button>
              </div>
            </div>

            {/* MENIU MOBILE */}
            {menuOpen && (
              <nav className="grid grid-cols-2 gap-2 border-t border-white/10 bg-[#081813] p-3 sm:p-4 lg:hidden">
                {MENU.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex min-w-0 items-center gap-2 rounded-xl px-2.5 py-3 text-xs font-bold sm:gap-3 sm:px-3 sm:text-sm ${
                      item.href === "/dashboard"
                        ? "bg-emerald-400/15 text-emerald-200"
                        : "bg-white/5 text-slate-300"
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </a>
                ))}
              </nav>
            )}
          </header>

          <div className="mx-auto w-full max-w-[1250px] px-3 py-5 sm:px-7 sm:py-9 lg:px-10">

            {/* SALUT */}
            <section>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-300">
                    Bine ai revenit!
                  </p>

                  <h1 className="mt-2 break-words text-[clamp(1.65rem,7vw,2rem)] font-black leading-tight tracking-tight sm:text-5xl">
                    Salut,{" "}
                    <span className="bg-gradient-to-r from-emerald-300 to-lime-300 bg-clip-text text-transparent">
                      {nume}!
                    </span>{" "}
                    👋
                  </h1>

                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    Pregătirea ta pentru BAC începe aici.
                    Învață în ritmul tău, pas cu pas.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-2 text-xs font-bold text-emerald-200">
                    ● Progres sincronizat
                  </span>

                  <span className="rounded-full border border-lime-300/20 bg-lime-400/10 px-3 py-2 text-xs font-bold text-lime-200">
                    BETA • 5 module
                  </span>
                </div>
              </div>
            </section>

            {/* CARD MATE */}
            <section className="relative mt-7 overflow-hidden rounded-[28px] border border-emerald-300/15 bg-gradient-to-br from-[#104632] via-[#0a3025] to-[#342511] p-5 shadow-2xl sm:p-8">

              <div className="absolute right-4 top-4 rounded-full border border-emerald-300/20 bg-black/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-200">
                AI TUTOR
              </div>

              <div className="relative flex flex-col items-center gap-5 md:flex-row md:gap-9">

                {/* AVATAR */}
                <div className="relative flex h-[195px] w-full shrink-0 items-center justify-center sm:h-[270px] md:w-[270px]">
                  <div className="absolute h-[190px] w-[190px] rounded-full border-2 border-emerald-300 shadow-[0_0_55px_rgba(52,211,153,0.35)] sm:h-[220px] sm:w-[220px]" />

                  <div className="absolute h-[170px] w-[170px] rounded-full bg-emerald-400/20 blur-3xl" />


<img
  src={`${avatarSrc}?v=241de6e`}
  alt="MATE - Asistentul tău de matematică"
  loading="eager"
  decoding="async"
  onLoad={() => console.log("Avatar MATE incarcat:", avatarSrc)}
  onError={(event) => {
    console.error("Eroare avatar MATE:", event.currentTarget.src);
  }}
  className="relative z-10 block h-[195px] w-auto max-w-full object-contain sm:h-[260px]"
/>

                </div>

                {/* TEXT MATE */}
                <div className="min-w-0 flex-1 text-center md:text-left">

                  <span className="inline-flex rounded-full border border-lime-300/20 bg-lime-300/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-lime-200">
                    MATE • ONLINE
                  </span>

                  <h2 className="mt-3 text-xl font-black leading-tight sm:mt-4 sm:text-4xl">
                    Partenerul tău personal de{" "}
                    <span className="text-lime-300">
                      matematică
                    </span>
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-emerald-50/80">
                    Salut, {nume}! Sunt MATE și te voi
                    ajuta să te pregătești pentru BAC.
                    Îți urmăresc progresul și te încurajez
                    să continui.
                  </p>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <a
                      href={urmatoareaLectieHref}
                      className="rounded-xl bg-gradient-to-r from-emerald-300 via-lime-300 to-amber-300 px-5 py-3.5 text-center text-sm font-black text-slate-950 transition hover:brightness-110"
                    >
                      Continuă pregătirea →
                    </a>

                    <a
                      href="/mate"
                      className="rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-center text-sm font-bold text-white transition hover:bg-white/15"
                    >
                      Vorbește cu MATE
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* STATISTICI */}
            <section className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">

              <StatCard
                icon="↗"
                label="Progres BETA"
                value={`${statistici.procent}%`}
                detail="din lecțiile disponibile"
              />

              <StatCard
                icon="✓"
                label="Lecții finalizate"
                value={`${statistici.finalizate}`}
                detail={`din ${statistici.total} lecții`}
              />

              <StatCard
                icon="⚡"
                label="XP acumulat"
                value={`${statistici.xp}`}
                detail={`din ${statistici.xpMaxim} XP`}
              />

              <StatCard
                icon="◆"
                label="Module BETA"
                value="5"
                detail={`din ${TOTAL_MODULE} planificate`}
              />
            </section>

            {/* PROGRES GENERAL */}
            <section className="mt-6 rounded-[26px] border border-white/10 bg-[#0b1d17] p-5 sm:p-7">

              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-emerald-300">
                    Progres general
                  </p>

                  <h2 className="mt-2 text-xl font-black sm:text-2xl">
                    {statistici.finalizate}/
                    {statistici.total} lecții
                  </h2>
                </div>

                <span className="text-3xl font-black text-lime-300">
                  {statistici.procent}%
                </span>
              </div>

              <div className="mt-5 h-3 overflow-hidden rounded-full bg-black/40">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-lime-300 to-amber-300 transition-all duration-500"
                  style={{
                    width: `${statistici.procent}%`,
                  }}
                />
              </div>

              <p className="mt-3 text-xs text-slate-400">
                Progresul este calculat pentru modulele 1–5,
                disponibile în versiunea BETA.
              </p>
            </section>

            {/* CONTINUA LECTIA */}
            {urmatoareaLectie ? (
              <section className="mt-6 rounded-[26px] border border-orange-300/15 bg-gradient-to-br from-[#153a2b] to-[#241d12] p-5 sm:p-7">

                <p className="text-xs font-black uppercase tracking-widest text-orange-300">
                  Continuă de aici
                </p>

                <h2 className="mt-3 text-xl font-black sm:text-2xl">
                  {urmatoareaLectie.titlu}
                </h2>

                <p className="mt-2 text-sm text-slate-300">
                  Modul {urmatoareaLectie.modul}
                  {" • "}
                  Lecția {urmatoareaLectie.numarLectie}
                </p>

                <a
                  href={urmatoareaLectieHref}
                  className="mt-5 inline-flex w-full justify-center rounded-xl bg-gradient-to-r from-orange-400 to-amber-300 px-6 py-3.5 text-sm font-black text-slate-950 sm:w-auto"
                >
                  Deschide lecția →
                </a>
              </section>
            ) : (
              <section className="mt-6 rounded-[26px] border border-emerald-300/20 bg-emerald-400/10 p-6">
                <h2 className="text-xl font-black">
                  Felicitări! 🎉
                </h2>

                <p className="mt-2 text-sm text-slate-300">
                  Ai parcurs toate lecțiile disponibile
                  în versiunea BETA.
                </p>

                <a
                  href="/evaluari"
                  className="mt-4 inline-flex rounded-xl bg-lime-300 px-5 py-3 text-sm font-black text-slate-950"
                >
                  Continuă cu evaluările →
                </a>
              </section>
            )}

            {/* MODULE DISPONIBILE */}
            <section className="mt-10">

              <div>
                <p className="text-xs font-black uppercase tracking-widest text-emerald-300">
                  Programa BAC MATE
                </p>

                <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                  Module disponibile
                </h2>

                <p className="mt-3 text-sm text-slate-400">
                  Primele 5 module sunt incluse în
                  versiunea BETA.
                </p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {progresModule.map((modul) => (
                  <a
                    key={modul.modul}
                    href="/lectii"
                    className="group rounded-[24px] border border-emerald-300/10 bg-[#0b1d17] p-5 transition hover:-translate-y-1 hover:border-emerald-300/30"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="rounded-lg bg-emerald-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-300">
                          Modul {modul.modul}
                        </span>

                        <h3 className="mt-4 text-lg font-black">
                          {MODULE_TITLES[modul.modul] ??
                            `Modul ${modul.modul}`}
                        </h3>
                      </div>

                      <span className="shrink-0 text-xl font-black text-lime-300">
                        {modul.procent}%
                      </span>
                    </div>

                    <p className="mt-4 text-sm text-slate-400">
                      {modul.finalizate}/{modul.total} lecții
                    </p>

                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-black/40">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-lime-300"
                        style={{
                          width: `${modul.procent}%`,
                        }}
                      />
                    </div>

                    <p className="mt-5 text-xs font-black text-emerald-300">
                      Vezi lecțiile →
                    </p>
                  </a>
                ))}
              </div>
            </section>

            {/* MODULE VIITOARE */}
            <section className="mt-10 rounded-[26px] border border-amber-300/15 bg-gradient-to-br from-[#1a2016] to-[#101711] p-5 sm:p-7">

              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-amber-200">
                  Următorul update
                </span>

                <span className="text-xs text-slate-400">
                  Modulele 6–17
                </span>
              </div>

              <h2 className="mt-4 text-2xl font-black">
                Mai multă matematică.
                În curând.
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
                Pregătim următoarele 12 module pentru
                extinderea platformei BAC MATE.
                Până atunci, te poți concentra pe
                primele 5 module disponibile.
              </p>

              <div className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
                {Array.from(
                  { length: TOTAL_MODULE - MODULE_BETA },
                  (_, index) => index + MODULE_BETA + 1
                ).map((modul) => (
                  <div
                    key={modul}
                    className="rounded-xl border border-white/10 bg-white/[0.03] px-2 py-4 text-center"
                  >
                    <p className="text-xs font-black text-slate-300">
                      Modul {modul}
                    </p>

                    <p className="mt-2 text-[10px] font-bold text-amber-300">
                      🔒 În curând
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* ISTORIC LECTII */}
            <section className="mt-10">

              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-emerald-300">
                    Activitatea ta
                  </p>

                  <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                    Istoric și progres
                  </h2>
                </div>

                <a
                  href="/lectii"
                  className="text-sm font-black text-lime-300"
                >
                  Toate lecțiile →
                </a>
              </div>

              <div className="mt-6 space-y-3">
                {progres.slice(0, 12).map((lectie) => (
                  <a
                    key={lectie.id}
                    href={`/lectii/${lectie.slug}`}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0b1d17] p-4 transition hover:border-emerald-300/20"
                  >
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-black ${
                        lectie.finalizata
                          ? "bg-emerald-400/15 text-emerald-300"
                          : "bg-white/5 text-slate-300"
                      }`}
                    >
                      {lectie.finalizata
                        ? "✓"
                        : lectie.numarLectie}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-white">
                        {lectie.titlu}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Modul {lectie.modul}
                        {" • "}
                        {lectie.xp}/{lectie.xpMaxim} XP
                      </p>
                    </div>

                    <span
                      className={`hidden text-xs font-bold sm:block ${
                        lectie.finalizata
                          ? "text-emerald-300"
                          : "text-slate-500"
                      }`}
                    >
                      {lectie.finalizata
                        ? "Finalizată"
                        : "De parcurs"}
                    </span>

                    <span className="text-emerald-300">
                      →
                    </span>
                  </a>
                ))}
              </div>
            </section>

            {/* FOOTER */}
            <footer className="mt-12 border-t border-white/10 py-7 text-center">
              <p className="text-xs font-bold text-slate-500">
                BAC MATE • BETA
              </p>

              <p className="mt-2 text-xs text-slate-600">
                Matematică. Pas cu pas.
              </p>
            </footer>

          </div>
        </div>
      </div>
    </main>
  );
}

function StatCard({
  icon,
  label,
  value,
  detail,
}: {
  icon: string;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="min-w-0 rounded-[22px] border border-emerald-300/10 bg-[#0b1d17] p-4 sm:p-5">

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-xl font-black text-emerald-300">
        {icon}
      </div>

      <p className="mt-4 text-[10px] font-black uppercase tracking-wider text-slate-400 sm:text-xs">
        {label}
      </p>

      <p className="mt-2 break-words text-2xl font-black text-lime-200 sm:text-3xl">
        {value}
      </p>

      <p className="mt-2 text-xs leading-5 text-slate-500">
        {detail}
      </p>
    </div>
  );
}