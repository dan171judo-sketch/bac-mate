"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "../../lib/supabase/client";

type ModCont = "login" | "register";

export default function ContPage() {
  const router = useRouter();

  const [supabase] = useState(() => createClient());

  const [mod, setMod] = useState<ModCont>("login");

  const [email, setEmail] = useState("");
  const [parola, setParola] = useState("");
  const [confirmaParola, setConfirmaParola] = useState("");

  const [mesaj, setMesaj] = useState("");
  const [eroare, setEroare] = useState("");
  const [loading, setLoading] = useState(false);

  const [verificareSesiune, setVerificareSesiune] =
    useState(true);

  const [arataParola, setArataParola] =
    useState(false);


  useEffect(() => {
    let activ = true;

    async function verificaSesiunea() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!activ) return;

        if (user) { setVerificareSesiune(false); return; }
      } catch {
      } finally {
        if (activ) {
          setVerificareSesiune(false);
        }
      }
    }

    verificaSesiunea();

    return () => {
      activ = false;
    };
  }, [router, supabase]);


  function schimbaMod(noulMod: ModCont) {
    setMod(noulMod);
    setMesaj("");
    setEroare("");
    setParola("");
    setConfirmaParola("");
  }


  function mesajEroareSupabase(
    mesajOriginal: string
  ) {
    const text = mesajOriginal.toLowerCase();

    if (
      text.includes("invalid login credentials") ||
      text.includes("invalid credentials")
    ) {
      return "Emailul sau parola nu sunt corecte.";
    }

    if (text.includes("email not confirmed")) {
      return "Confirmă mai întâi adresa de email.";
    }

    if (
      text.includes("user already registered") ||
      text.includes("already been registered")
    ) {
      return "Există deja un cont pentru această adresă.";
    }

    if (
      text.includes("password should be at least")
    ) {
      return "Parola trebuie să aibă minim 6 caractere.";
    }

    if (
      text.includes("unable to validate email")
    ) {
      return "Email invalid.";
    }

    if (
      text.includes("rate limit")
    ) {
      return "Prea multe încercări. Încearcă mai târziu.";
    }

    return "A apărut o problemă. Încearcă din nou.";
  }


  async function autentificare() {
    const emailCurat =
      email.trim().toLowerCase();


    if (!emailCurat || !parola) {
      setEroare(
        "Completează emailul și parola."
      );
      return;
    }


    setLoading(true);
    setEroare("");
    setMesaj("");


    try {
      const { error } =
        await supabase.auth.signInWithPassword({
          email: emailCurat,
          password: parola,
        });


      if (error) {
        setEroare(
          mesajEroareSupabase(
            error.message
          )
        );
        return;
      }

      // BETA: autentificarea nu necesita abonament.


      router.replace("/dashboard");
      router.refresh();

    } catch {
      setEroare(
        "Nu ne-am putut conecta."
      );
    } finally {
      setLoading(false);
    }
  }


  async function creareCont() {
    const emailCurat =
      email.trim().toLowerCase();


    if (
      !emailCurat ||
      !parola ||
      !confirmaParola
    ) {
      setEroare(
        "Completează toate câmpurile."
      );
      return;
    }


    if (parola.length < 6) {
      setEroare(
        "Parola trebuie să aibă minim 6 caractere."
      );
      return;
    }


    if (parola !== confirmaParola) {
      setEroare(
        "Parolele nu coincid."
      );
      return;
    }


    setLoading(true);
    setEroare("");
    setMesaj("");


    try {
      const redirectTo =
        typeof window !== "undefined"
          ? `${window.location.origin}/auth/confirm`
          : undefined;


      const { data, error } =
        await supabase.auth.signUp({
          email: emailCurat,
          password: parola,
          options: {
            emailRedirectTo: redirectTo,
          },
        });


      if (error) {
        setEroare(
          mesajEroareSupabase(
            error.message
          )
        );
        return;
      }


      if (data.session) {
        router.replace("/profil");
        router.refresh();
        return;
      }


      setMesaj(
        "Cont creat. Verifică emailul pentru confirmare."
      );

    } catch {
      setEroare(
        "Nu am putut crea contul."
      );
    } finally {
      setLoading(false);
    }
  }


  async function trimiteFormular(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (loading) return;


    if (mod === "login") {
      await autentificare();
      return;
    }


    await creareCont();
  }


  if (verificareSesiune) {
    return (
      <main className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-[#06110e]
        text-white
      ">
        <div className="
          h-10
          w-10
          rounded-full
          border-2
          border-emerald-400
          border-t-transparent
          animate-spin
        "/>
      </main>
    );
  }
    return (
    <main className="relative min-h-screen overflow-hidden bg-[#06110e] text-white">
      {/* =========================================================
          FUNDAL
      ========================================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-[260px] top-[40px] h-[650px] w-[650px] rounded-full bg-emerald-500/[0.11] blur-[160px]" />

        <div className="absolute -right-[260px] top-[80px] h-[620px] w-[620px] rounded-full bg-orange-500/[0.08] blur-[170px]" />

        <div className="absolute bottom-[-280px] left-1/2 h-[550px] w-[850px] -translate-x-1/2 rounded-full bg-lime-400/[0.05] blur-[180px]" />

        <div
          className="absolute inset-0 opacity-[0.028]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/25 to-transparent" />

        <div className="absolute left-[8%] top-[27%] hidden rotate-[-8deg] text-xl font-black text-emerald-200/[0.08] lg:block">
          f(x) = x²
        </div>

        <div className="absolute bottom-[18%] left-[42%] hidden rotate-[5deg] text-lg font-black text-lime-200/[0.06] lg:block">
          √x
        </div>

        <div className="absolute right-[6%] top-[24%] hidden rotate-[7deg] text-xl font-black text-amber-200/[0.07] lg:block">
          x → ∞
        </div>
      </div>

      {/* =========================================================
          HEADER
      ========================================================= */}

      <header className="relative z-30 border-b border-white/[0.06]">
        <nav className="mx-auto flex h-[78px] max-w-[1180px] items-center justify-between px-5 sm:px-7 lg:px-8">
          <Link
            href="/"
            className="group flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-[15px] border border-lime-200/40 bg-gradient-to-br from-emerald-400 via-lime-300 to-yellow-300 text-lg font-black text-[#07110d] shadow-[0_0_30px_rgba(132,204,22,0.18)] transition group-hover:scale-105">
              M
            </div>

            <div>
              <p className="text-[18px] font-black tracking-[-0.02em] text-white">
                BAC MATE
              </p>

              <p className="mt-0.5 text-[10px] font-bold text-emerald-100/55">
                Matematica explicată simplu.
              </p>
            </div>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-4 py-2.5 text-sm font-black text-white/70 transition hover:border-emerald-300/20 hover:bg-white/[0.06] hover:text-white"
          >
            <span>←</span>
            <span>Înapoi</span>
          </Link>
        </nav>
      </header>

      {/* =========================================================
          CONTENT
      ========================================================= */}

      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-78px)] max-w-[1180px] items-center gap-12 px-5 pb-14 pt-10 sm:px-7 lg:grid-cols-[1fr_0.86fr] lg:gap-16 lg:px-8 lg:pb-16 lg:pt-8">
        {/* =======================================================
            STÂNGA
        ======================================================= */}

        <div className="hidden lg:block">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-400/[0.08] px-4 py-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-300 text-[10px] font-black text-[#06110e]">
              ✦
            </span>

            <span className="text-[13px] font-black text-emerald-100">
              Pregătirea ta începe aici
            </span>
          </div>

          <h1 className="mt-7 max-w-[660px] text-[50px] font-black leading-[0.98] tracking-[-0.05em] text-[#fff8e8] xl:text-[58px]">
            Construiește-ți drumul spre{" "}
            <span className="bg-gradient-to-r from-emerald-300 via-lime-200 to-yellow-200 bg-clip-text text-transparent">
              nota pe care ți-o dorești.
            </span>
          </h1>

          <p className="mt-6 max-w-[570px] text-[17px] font-medium leading-8 text-white/58">
            Contul BAC MATE îți păstrează progresul,
            greșelile, evaluările și planul personalizat de
            pregătire.
          </p>

          {/* BENEFICII */}

          <div className="mt-9 grid max-w-[570px] gap-3">
            <Benefit
              number="01"
              title="Progres salvat"
              text="Continui exact de unde ai rămas, pe orice dispozitiv."
              accent="emerald"
            />

            <Benefit
              number="02"
              title="Plan personalizat"
              text="Primești următorii pași în funcție de evoluția ta."
              accent="amber"
            />

            <Benefit
              number="03"
              title="MATE alături de tine"
              text="Profesorul tău AI te ajută atunci când te blochezi."
              accent="lime"
            />
          </div>

          {/* MINI MATE */}

          <div className="mt-6 flex max-w-[570px] items-center gap-4 rounded-[22px] border border-emerald-300/15 bg-gradient-to-r from-emerald-400/[0.07] to-orange-400/[0.04] p-4">
            <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-emerald-300/20 bg-[#0b2119]">
              <div className="absolute inset-0 bg-emerald-400/10 blur-xl" />

              <img
                src="/mate/mate-tutor-boy.png"
                alt="MATE AI"
                className="relative h-full w-full object-cover object-top"
              />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-xs font-black uppercase tracking-[0.12em] text-emerald-300">
                  MATE AI
                </p>

                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.8)]" />
              </div>

              <p className="mt-1 text-sm font-bold leading-5 text-white/75">
                „Când te blochezi, rezolvăm împreună.”
              </p>
            </div>
          </div>
        </div>

        {/* =======================================================
            CARD AUTENTIFICARE
        ======================================================= */}

        <div className="mx-auto w-full max-w-[500px]">
          <div className="relative overflow-hidden rounded-[32px] border border-emerald-200/[0.14] bg-[#0a1914]/95 p-6 shadow-[0_35px_100px_rgba(0,0,0,0.36)] backdrop-blur-xl sm:p-8">
            {/* CARD GLOWS */}

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-emerald-400/[0.08] blur-[80px]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-28 -left-24 h-64 w-64 rounded-full bg-orange-400/[0.06] blur-[90px]"
            />

            <div className="relative z-10">
              {/* MOBILE BRAND */}

              <div className="mb-5 lg:hidden">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/[0.07] px-3 py-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-300" />

                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-emerald-200">
                    BAC MATE
                  </p>
                </div>
              </div>

              {/* TITLU */}

              <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-300">
                {mod === "login"
                  ? "Continuă pregătirea"
                  : "Începe pregătirea"}
              </p>

              <h2 className="mt-2 text-[30px] font-black tracking-[-0.035em] text-[#fff8e8] sm:text-[34px]">
                {mod === "login"
                  ? "Bine ai revenit."
                  : "Creează-ți contul."}
              </h2>

              <p className="mt-3 text-[15px] font-medium leading-6 text-white/52">
                {mod === "login"
                  ? "Intră în cont și continuă exact de unde ai rămas."
                  : "Creează un cont gratuit și începe pregătirea pentru Bac."}
              </p>

              {/* =================================================
                  TABS
              ================================================= */}

              <div className="mt-7 grid grid-cols-2 rounded-[17px] border border-white/[0.06] bg-black/20 p-1">
                <button
                  type="button"
                  onClick={() => schimbaMod("login")}
                  disabled={loading}
                  className={`rounded-[13px] px-4 py-3 text-sm font-black transition ${
                    mod === "login"
                      ? "border border-lime-200/30 bg-gradient-to-r from-emerald-400 via-lime-300 to-yellow-300 text-[#06110e] shadow-[0_8px_25px_rgba(132,204,22,0.13)]"
                      : "border border-transparent text-white/45 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  Autentificare
                </button>

                <button
                  type="button"
                  onClick={() => schimbaMod("register")}
                  disabled={loading}
                  className={`rounded-[13px] px-4 py-3 text-sm font-black transition ${
                    mod === "register"
                      ? "border border-lime-200/30 bg-gradient-to-r from-emerald-400 via-lime-300 to-yellow-300 text-[#06110e] shadow-[0_8px_25px_rgba(132,204,22,0.13)]"
                      : "border border-transparent text-white/45 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  Cont nou
                </button>
              </div>

              {/* =================================================
                  FORMULAR
              ================================================= */}

              <form
                onSubmit={trimiteFormular}
                className="mt-7 space-y-5"
              >
                {/* EMAIL */}

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-black text-white/75"
                  >
                    Email
                  </label>

                  <div className="relative">
                    <div className="pointer-events-none absolute left-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg bg-emerald-400/[0.08] text-sm text-emerald-300">
                      @
                    </div>

                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                        setEroare("");
                        setMesaj("");
                      }}
                      placeholder="numele.tau@email.com"
                      disabled={loading}
                      className="w-full rounded-2xl border border-white/10 bg-[#07130f]/80 py-3.5 pl-14 pr-4 text-[15px] font-medium text-white outline-none transition placeholder:text-white/22 focus:border-emerald-300/45 focus:bg-[#091a14] focus:ring-4 focus:ring-emerald-400/[0.07] disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </div>
                </div>

                {/* PAROLA */}

                <div>
                  <label
                    htmlFor="parola"
                    className="mb-2 block text-sm font-black text-white/75"
                  >
                    Parolă
                  </label>

                  <div className="relative">
                    <div className="pointer-events-none absolute left-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg bg-emerald-400/[0.08] text-xs text-emerald-300">
                      ●
                    </div>

                    <input
                      id="parola"
                      type={
                        arataParola
                          ? "text"
                          : "password"
                      }
                      autoComplete={
                        mod === "login"
                          ? "current-password"
                          : "new-password"
                      }
                      value={parola}
                      onChange={(event) => {
                        setParola(
                          event.target.value
                        );
                        setEroare("");
                        setMesaj("");
                      }}
                      placeholder={
                        mod === "register"
                          ? "Minimum 6 caractere"
                          : "Parola ta"
                      }
                      disabled={loading}
                      className="w-full rounded-2xl border border-white/10 bg-[#07130f]/80 py-3.5 pl-14 pr-24 text-[15px] font-medium text-white outline-none transition placeholder:text-white/22 focus:border-emerald-300/45 focus:bg-[#091a14] focus:ring-4 focus:ring-emerald-400/[0.07] disabled:cursor-not-allowed disabled:opacity-60"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setArataParola(
                          (valoare) => !valoare
                        )
                      }
                      disabled={loading}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1.5 text-[11px] font-black text-white/40 transition hover:bg-white/[0.04] hover:text-emerald-200 disabled:opacity-50"
                    >
                      {arataParola
                        ? "Ascunde"
                        : "Arată"}
                    </button>
                  </div>
                </div>

                {/* CONFIRMA PAROLA */}

                {mod === "register" && (
                  <div>
                    <label
                      htmlFor="confirma-parola"
                      className="mb-2 block text-sm font-black text-white/75"
                    >
                      Confirmă parola
                    </label>

                    <div className="relative">
                      <div className="pointer-events-none absolute left-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg bg-lime-400/[0.08] text-xs text-lime-300">
                        ✓
                      </div>

                      <input
                        id="confirma-parola"
                        type={
                          arataParola
                            ? "text"
                            : "password"
                        }
                        autoComplete="new-password"
                        value={confirmaParola}
                        onChange={(event) => {
                          setConfirmaParola(
                            event.target.value
                          );
                          setEroare("");
                          setMesaj("");
                        }}
                        placeholder="Scrie parola din nou"
                        disabled={loading}
                        className="w-full rounded-2xl border border-white/10 bg-[#07130f]/80 py-3.5 pl-14 pr-4 text-[15px] font-medium text-white outline-none transition placeholder:text-white/22 focus:border-emerald-300/45 focus:bg-[#091a14] focus:ring-4 focus:ring-emerald-400/[0.07] disabled:cursor-not-allowed disabled:opacity-60"
                      />
                    </div>
                  </div>
                )}

                {/* EROARE */}

                {eroare && (
                  <div
                    role="alert"
                    className="flex items-start gap-3 rounded-2xl border border-red-400/20 bg-red-500/[0.08] px-4 py-3 text-sm font-medium leading-6 text-red-200"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-400/10 text-[10px] font-black">
                      !
                    </span>

                    <span>{eroare}</span>
                  </div>
                )}

                {/* SUCCES */}

                {mesaj && (
                  <div
                    role="status"
                    className="flex items-start gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-500/[0.08] px-4 py-3 text-sm font-medium leading-6 text-emerald-200"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-400/10 text-[10px] font-black">
                      ✓
                    </span>

                    <span>{mesaj}</span>
                  </div>
                )}

                {/* SUBMIT */}

                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-3 rounded-2xl border border-lime-200/50 bg-gradient-to-r from-emerald-400 via-lime-300 to-yellow-300 px-5 py-4 text-[15px] font-black text-[#06110e] shadow-[0_15px_40px_rgba(132,204,22,0.15)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(132,204,22,0.22)] disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#06110e]/30 border-t-[#06110e]" />

                      <span>
                        Se procesează...
                      </span>
                    </>
                  ) : (
                    <>
                      <span>
                        {mod === "login"
                          ? "Intră în cont"
                          : "Creează contul gratuit"}
                      </span>

                      <span className="text-lg transition group-hover:translate-x-1">
                        →
                      </span>
                    </>
                  )}
                </button>
              </form>

              {/* FOOTNOTE */}

              <div className="mt-6 border-t border-white/[0.06] pt-5">
                <div className="flex items-start justify-center gap-2">
                  <span className="mt-0.5 text-[11px] text-emerald-300">
                    ✓
                  </span>

                  <p className="max-w-[360px] text-center text-[11px] font-medium leading-5 text-white/30">
                    Progresul tău educațional este salvat în
                    cont pentru personalizarea experienței
                    BAC MATE.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-5 text-center text-[11px] font-bold text-white/22">
            BAC MATE • Pregătire inteligentă pentru Bacalaureat
          </p>
        </div>
      </section>
          </main>
  );
}

function Benefit({
  number,
  title,
  text,
  accent = "emerald",
}: {
  number: string;
  title: string;
  text: string;
  accent?: "emerald" | "amber" | "lime";
}) {
  const accentClasses = {
    emerald: {
      box: "border-emerald-300/15 bg-emerald-400/[0.07] text-emerald-200",
      glow: "bg-emerald-400/[0.08]",
      dot: "bg-emerald-300",
    },

    amber: {
      box: "border-amber-300/15 bg-amber-400/[0.07] text-amber-200",
      glow: "bg-amber-400/[0.07]",
      dot: "bg-amber-300",
    },

    lime: {
      box: "border-lime-300/15 bg-lime-400/[0.07] text-lime-200",
      glow: "bg-lime-400/[0.07]",
      dot: "bg-lime-300",
    },
  };

  const selectedAccent = accentClasses[accent];

  return (
    <div className="group relative overflow-hidden rounded-[20px] border border-white/[0.07] bg-white/[0.025] p-4 transition duration-300 hover:-translate-y-0.5 hover:border-white/[0.12] hover:bg-white/[0.04]">
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full blur-[55px] ${selectedAccent.glow}`}
      />

      <div className="relative flex items-start gap-4">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] border text-[11px] font-black ${selectedAccent.box}`}
        >
          {number}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span
              className={`h-1.5 w-1.5 shrink-0 rounded-full ${selectedAccent.dot}`}
            />

            <p className="font-black tracking-[-0.01em] text-white">
              {title}
            </p>
          </div>

          <p className="mt-1.5 text-sm font-medium leading-6 text-white/42">
            {text}
          </p>
        </div>

        <span className="mt-1 text-sm text-white/15 transition duration-300 group-hover:translate-x-0.5 group-hover:text-white/35">
          →
        </span>
      </div>
    </div>
  );
}

